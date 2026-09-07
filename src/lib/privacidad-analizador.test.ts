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
 * Lo que sí es cierto, y es lo que la política de privacidad ya decía bien desde el
 * principio: la cartera se GUARDA solo en el navegador (localStorage); al pulsar
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

  it('la política de privacidad sigue declarando el viaje al servidor y a Groq', () => {
    // Es el documento que estaba bien desde el principio; el riesgo aquí es que
    // alguien lo «simplifique» para que cuadre con un eslogan.
    const politica = readFileSync('src/app/privacidad/page.tsx', 'utf8')
    expect(politica).toMatch(/viajan al servidor/)
    expect(politica).toMatch(/Groq/)
    expect(politica).toMatch(/Estados Unidos/)
  })

  it('el correo de bienvenida no promete que los datos no salen', () => {
    const correo = readFileSync('src/lib/welcome-email.ts', 'utf8')
    expect(correo).not.toMatch(/nunca salen/i)
    expect(correo).toMatch(/se guarda solo en tu navegador/)
  })
})
