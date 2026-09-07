import { describe, it, expect } from 'vitest'
import { GROQ_MODEL, MODELOS_RETIRADOS } from './groq-model'
import { readFileSync } from 'node:fs'

/**
 * El chat y el analizador estuvieron quince días caídos en producción (16 a 31 de
 * agosto de 2026) porque Groq retiró `llama-3.3-70b-versatile` y nadie lo cambió.
 * La API devolvía 404 y no había nada que lo detectara.
 *
 * Estos tests no pueden llamar a la API en el build, pero sí evitan las dos formas
 * en que el fallo se coló: apuntar a un modelo ya retirado, y que el identificador
 * viva duplicado en varios ficheros donde uno se actualiza y el otro no.
 */
describe('modelo de Groq', () => {
  it('no apunta a un modelo que Groq ya ha retirado', () => {
    expect(
      MODELOS_RETIRADOS,
      `${GROQ_MODEL} está retirado: la API devolverá 404 y la IA del sitio dejará de responder`
    ).not.toContain(GROQ_MODEL)
  })

  it('el identificador no está duplicado fuera de groq-model.ts', () => {
    // Si alguien vuelve a escribir el modelo a pelo en otro fichero, reaparece el
    // problema de que una actualización se olvide de la otra copia.
    for (const fichero of ['src/lib/ai.ts', 'src/app/api/chat/route.ts']) {
      const contenido = readFileSync(fichero, 'utf8')
      expect(
        contenido.includes(GROQ_MODEL),
        `${fichero} escribe el modelo a pelo en vez de importar GROQ_MODEL`
      ).toBe(false)
      expect(contenido).toContain('GROQ_MODEL')
    }
  })

  it('el modelo tiene un formato plausible de identificador de Groq', () => {
    expect(GROQ_MODEL.length).toBeGreaterThan(3)
    expect(GROQ_MODEL).toMatch(/^[a-z0-9][a-z0-9._/-]*$/)
  })
})

/**
 * El hueco que dejaron los tests de arriba, encontrado el 7-sep-2026 por la sesión
 * de Verificación al auditar un mensaje para el foro Bogleheads.
 *
 * Los tests anteriores vigilan el CÓDIGO: que no apunte a un modelo retirado y que
 * el identificador no esté duplicado. Ninguno miraba los TEXTOS. Resultado: el
 * código llevaba desde el 31-ago usando `openai/gpt-oss-120b` mientras **catorce
 * sitios de cara al usuario** seguían diciendo «Llama 3.3 70B» — incluidas la
 * página de metodología (la que existe para ser auditada), la política de
 * privacidad, los datos estructurados JSON-LD y `llms.txt`, o sea justo lo que
 * leen buscadores y modelos.
 *
 * Se descubrió porque el mensaje del foro citaba `analyzer/page.tsx` como fuente
 * de verificación, y esa página también estaba mal. La fuente contra la que se
 * verificaba estaba tan caducada como lo verificado.
 *
 * > Un dato repetido en catorce sitios no se actualiza catorce veces: se actualiza
 * > una y se olvidan trece.
 *
 * Donde el modelo es el tema, el texto ahora interpola `GROQ_MODEL` y no puede
 * caducar. Donde se menciona de pasada, dice «un modelo de lenguaje alojado en
 * Groq», que tampoco caduca.
 */
describe('los textos del sitio no nombran modelos retirados', () => {
  const DE_CARA_AL_USUARIO = [
    'src/app/page.tsx',
    'src/app/analyzer/page.tsx',
    'src/app/faq/page.tsx',
    'src/app/metodologia/page.tsx',
    'src/app/privacidad/page.tsx',
    'src/app/sobre/page.tsx',
    'src/app/llms.txt/route.ts',
    'src/app/llms-full.txt/route.ts',
    'src/components/Chat.tsx',
    'src/components/JsonLd.tsx',
  ]

  /** Nombres comerciales de los modelos retirados, tal y como se escriben en prosa. */
  const NOMBRES_EN_PROSA = [/Llama\s*3\.3/i, /Llama\s*4\s*Maverick/i, /Kimi\s*K2/i]

  it.each(DE_CARA_AL_USUARIO)('%s no nombra un modelo retirado', (fichero) => {
    const texto = readFileSync(fichero, 'utf8')

    for (const retirado of MODELOS_RETIRADOS) {
      expect(texto, `${fichero} nombra ${retirado}, que Groq ya retiró`).not.toContain(retirado)
    }
    for (const patron of NOMBRES_EN_PROSA) {
      expect(texto, `${fichero} nombra en prosa un modelo retirado (${patron})`).not.toMatch(patron)
    }
  })

  it('donde se nombra el modelo, se interpola la constante en vez de escribirlo a mano', () => {
    // Las dos páginas donde el modelo ES el tema y sí conviene decir cuál es.
    for (const fichero of ['src/app/page.tsx', 'src/app/metodologia/page.tsx']) {
      const texto = readFileSync(fichero, 'utf8')
      expect(texto, `${fichero} debería importar GROQ_MODEL`).toContain(
        "from '@/lib/groq-model'"
      )
      expect(texto).toContain('${GROQ_MODEL}')
    }
  })

  it('la metodología describe lo que el modelo recibe DE VERDAD', () => {
    // Decía «solo recibe datos agregados... nunca información personal identificable».
    // Falso: `ai.ts` hace JSON.stringify(input) del objeto entero, que lleva las
    // posiciones una a una con su valor en euros y la proyección FIRE con la
    // aportación mensual y el objetivo del usuario.
    const metodologia = readFileSync('src/app/metodologia/page.tsx', 'utf8')
    expect(metodologia).not.toMatch(/solo recibe datos agregados/i)
    expect(metodologia).toMatch(/posición a posición/)

    const ai = readFileSync('src/lib/ai.ts', 'utf8')
    expect(ai, 'si esto deja de mandar el objeto entero, hay que revisar la metodología')
      .toContain('JSON.stringify(input')
  })

  it('la monetización sigue apagada por defecto cuando la variable no existe', () => {
    // El mensaje del foro afirma que no hay enlaces de afiliación. La variable no
    // está puesta en ningún sitio, así que lo que protege esa frase es que el
    // valor por defecto sea "apagado", no que alguien se acuerde de ponerla a false.
    const monetizacion = readFileSync('src/lib/monetization.ts', 'utf8')
    expect(monetizacion).toContain("=== 'true'")
  })
})
