import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

/**
 * Dónde están de verdad los datos de la cartera, y por qué esto tiene test.
 *
 * El sitio afirmó durante meses, en nueve sitios distintos y en el correo de
 * bienvenida, que los datos «nunca salen de tu navegador» y que «nunca van a
 * nuestros servidores». Es falso, y lo desmiente nuestro propio código:
 *
 *   src/app/analyzer/AnalyzerClient.tsx  ->  POST /api/analyze  con `positions`
 *   src/app/api/analyze/route.ts         ->  generateAiNarrative(...)  ->  Groq (EE. UU.)
 *
 * Lo que sí es cierto, y es lo que la política de privacidad ya apuntaba —aunque, se vio
 * esa misma tarde, describiendo de menos—: la cartera se GUARDA solo en el navegador (localStorage); al pulsar
 * «Analizar», las posiciones VIAJAN al servidor y al proveedor de IA, y se DESCARTAN
 * al terminar sin almacenarse.
 *
 * O sea, el fallo no era una fuga de datos: era el marketing contradiciendo a la
 * política de privacidad de la propia casa. Detectado el 7-sep-2026 al preparar un
 * mensaje para el foro Bogleheads España, donde la frase habría durado lo que tarda
 * un lector en abrir la pestaña de red.
 *
 * Estos tests prohíben que la frase vuelva. Vuelve sola: es más corta, más vendible
 * y suena mejor.
 */

const FICHEROS = [
  'src/app/page.tsx',
  'src/app/analyzer/page.tsx',
  'src/app/analyzer/AnalyzerClient.tsx',
  'src/app/faq/page.tsx',
  'src/app/empezar/page.tsx',
  'src/app/manifest.ts',
  'src/app/llms.txt/route.ts',
  'src/app/llms-full.txt/route.ts',
  'src/app/calculadora/comparar-brokers/page.tsx',
  'src/lib/welcome-email.ts',
]

/** Formulaciones que afirman que la cartera no sale del navegador. Todas son falsas. */
const PROHIBIDAS = [
  /nunca salen (?:de tu|del) navegador/i,
  /no salen del navegador/i,
  /nunca se envían/i,
  /nunca en nuestros servidores/i,
  /no (?:se )?(?:los|las) tenemos/i,
  /todos los cálculos ocurren en tu navegador/i,
]

describe('lo que el sitio afirma sobre dónde van los datos de la cartera', () => {
  it.each(FICHEROS)('%s no afirma que la cartera no sale del navegador', (rel) => {
    const texto = readFileSync(rel, 'utf8')
    for (const prohibida of PROHIBIDAS) {
      expect(
        texto,
        `${rel} contiene «${prohibida}», que contradice a POST /api/analyze y a la política de privacidad`,
      ).not.toMatch(prohibida)
    }
  })

  it('el analizador sigue enviando las posiciones al servidor (si esto cambia, el texto también)', () => {
    // Test invertido a propósito: el día que el análisis pase a ser 100 % cliente,
    // este test falla y obliga a revisar los textos, que entonces sí podrán decir
    // que nada sale del navegador. Un test que protege la verdad en las dos direcciones.
    const cliente = readFileSync('src/app/analyzer/AnalyzerClient.tsx', 'utf8')
    expect(cliente).toMatch(/fetch\('\/api\/analyze'/)
    expect(cliente).toMatch(/positions/)
  })

  it('la página del analizador nombra a Groq y dice que las posiciones viajan', () => {
    const pagina = readFileSync('src/app/analyzer/page.tsx', 'utf8')
    expect(pagina).toMatch(/viajan/)
    expect(pagina).toMatch(/Groq/)
    expect(pagina).toMatch(/no se almacenan|sin almacenarse|se descartan/)
  })

  /**
   * Ampliación del 7-sep-2026, misma tarde. Lo encontró GEO tirando del hallazgo de
   * Verificación sobre `CUMPLIMIENTO-LEGAL.md` §1.
   *
   * La corrección de esa mañana decía «las POSICIONES viajan al servidor». No era falsa:
   * era **incompleta**. `src/lib/fire.ts` devuelve `{ ...input, yearsToFire }` en sus tres
   * salidas —no resume la entrada, la devuelve entera— y `ai.ts` hacía
   * `JSON.stringify(input)` del objeto completo. Así que a Groq viajaban también
   * **aportación mensual y objetivo de patrimonio**.
   *
   * ⚠️ **Actualizado el 8-sep-2026: eso ya NO ocurre.** El fundador aprobó recortar el
   * payload y el endpoint pasa ahora solo `{ yearsToFire }`. Esos datos siguen llegando a
   * nuestro servidor —hacen falta para el cálculo— pero **no salen hacia el proveedor de
   * IA**. Quien vigila esa frontera es `ai-payload.test.ts`; este test solo comprueba que
   * los textos siguen nombrando esos datos y diciendo hasta dónde llegan.
   *
   * Y lo peor: estos mismos tests **consagraban la redacción incompleta como la correcta**.
   * Un verificador puede nacer describiendo de menos, no solo caducar.
   *
   * En RGPD el ALCANCE de una transferencia internacional no es un detalle de redacción:
   * es lo que la persona lee para decidir si pulsa el botón.
   */
  it('los textos declaran también los datos de la proyección FIRE, no solo las posiciones', () => {
    for (const fichero of ['src/app/privacidad/page.tsx', 'src/app/analyzer/page.tsx']) {
      const texto = readFileSync(fichero, 'utf8')
      expect(texto, `${fichero} describe menos de lo que se envía`).toMatch(/aportación mensual/)
      expect(texto).toMatch(/objetivo/)
    }
  })

  it('si cambia la forma del payload de IA, hay que revisar estos textos', () => {
    // Test invertido. Ojo al matiz, corregido el 8-sep: `projectFire` SIGUE devolviendo
    // `{ ...input }`, pero eso ya no llega al modelo — el endpoint recorta a `yearsToFire`.
    // Lo que se vigila aquí es que `ai.ts` siga serializando su entrada entera, porque
    // ese es el mecanismo por el que cualquier campo que se añada al tipo saldría hacia
    // fuera sin que nadie lo decidiera. Fue exactamente así como se coló la aportación.
    const ai = readFileSync('src/lib/ai.ts', 'utf8')
    expect(ai).toContain('JSON.stringify(input')
  })

  it('la política de privacidad sigue declarando el viaje al servidor y a Groq', () => {
    // Matiz añadido el mismo día: este comentario decía que la política «estaba bien
    // desde el principio». No del todo. Acertaba en lo esencial —que las posiciones
    // viajan— pero describía MENOS de lo que se envía: faltaban los datos de la
    // proyección FIRE. Corregido arriba. Se deja escrito porque una afirmación falsa
    // dentro de un verificador es justo lo que llevamos todo el día persiguiendo.
    // El riesgo que este test cubre sigue siendo el mismo: que alguien lo «simplifique»
    // para que cuadre con un eslogan.
    const politica = readFileSync('src/app/privacidad/page.tsx', 'utf8')
    // Aserción por INTENCIÓN, no por redacción literal: el texto se reescribió el 8-sep
    // («al servidor» → «a nuestro servidor») y este test cayó por una preposición, no por
    // un problema real. Un test pegado a la prosa exacta convierte cada mejora de redacción
    // en un fallo, y empuja a tocar el texto publicado para que el test pase.
    expect(politica).toMatch(/viajan a (nuestro )?servidor/)
    expect(politica).toMatch(/Groq/)
    expect(politica).toMatch(/Estados Unidos/)
  })

  it('el correo de bienvenida no promete que los datos no salen', () => {
    const correo = readFileSync('src/lib/welcome-email.ts', 'utf8')
    expect(correo).not.toMatch(/nunca salen/i)
    expect(correo).toMatch(/se guarda solo en tu navegador/)
  })
})
