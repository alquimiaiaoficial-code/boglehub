import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * La web no puede decir lo que le prohibimos decir al modelo.
 *
 * Contexto (11-sep-2026). `src/lib/ai.ts` lleva desde el 7-sep una instrucción explícita al
 * modelo que analiza las carteras:
 *
 *   «Puedes DESCRIBIR el dato ("tu cartera tiene un 63 % en EE. UU., frente al 50 % de una
 *    cartera global") pero NO prescribir el ajuste ("deberías bajarlo al 50 %").»
 *   «NUNCA propongas una cartera concreta, ni por pesos ni por productos.»
 *
 * Y mientras tanto la web publicaba, en su propio texto:
 *
 *   «Indexa es la opción correcta si…»  ·  «MyInvestor es la opción correcta si…»
 *   «el S&P 500 es preferible»  ·  «para invertir es preferible operar en Trade Republic…»
 *   «la replicación física es preferible»  ·  «la clave está en elegir un ETF domiciliado…»
 *
 * **Le exigíamos al modelo una norma que la casa no cumplía.** Y la web pesa más que el
 * modelo: está indexada, es lo que leería un supervisor y es lo que citan los motores de IA.
 * Salió del barrido de `reportes-bogle/legal-scan.mjs`, no de buscar bugs — como las seis
 * afirmaciones falsas anteriores, apareció comparando la prosa con la norma propia.
 *
 * ## Qué separa describir de prescribir, que es de lo que va este test
 *
 * NO prohibimos opinar ni comparar: un sitio de contenido que no puede decir que un TER del
 * 0,07 % es más barato que uno del 0,35 % no sirve para nada. Lo que se prohíbe es
 * **dictaminar sobre el lector**:
 *
 *   describe  →  «la replicación física es más transparente y no tiene riesgo de contraparte»
 *   prescribe →  «la replicación física es preferible»
 *   describe  →  «Indexa encaja con este perfil: …»
 *   prescribe →  «Indexa es la opción correcta si: …»
 *
 * La diferencia importa para los cuatro requisitos acumulativos del asesoramiento (CNMV, ver
 * `CUMPLIMIENTO-LEGAL.md`): un sitio público no los cumple por sí solo —no va dirigido a una
 * persona concreta— pero «es la opción correcta si [tus circunstancias]» se acerca al de
 * presentar algo como idóneo para quien lo lee. No hace falta cruzar la línea para no querer
 * estar pegado a ella.
 *
 * ⚠️ Este test mira el TEXTO FUENTE, que es donde se escribe. `legal-scan.mjs` mira producción
 * y sirve para otra cosa: pilla lo que se colara por una vía que este test no cubra.
 */

/** Fórmulas que dictaminan sobre el lector en vez de describir el producto. */
const PRESCRIPTIVAS: readonly [RegExp, string][] = [
  [/\bes preferible\b/i, 'di en qué es mejor, no que lo sea: «es más transparente», «tiene menos TER»'],
  [/\bes la opci[óo]n correcta\b/i, 'describe el perfil al que encaja: «encaja con este perfil»'],
  [/\bla clave est[áa] en elegir\b/i, 'di qué cambia la elección, no que sea «la clave»'],
  [/\btu mejor opci[óo]n\b/i, 'no hay una «mejor opción» del lector: descríbele las opciones'],
  [/\blo mejor para ti\b/i, 'ídem'],
  [/\bla opci[óo]n ideal para ti\b/i, 'ídem'],
  [/\bdeber[íi]as\s+(?:comprar|vender|invertir|elegir|contratar|cambiar|traspasar)\b/i, 'prescripción directa: prohibida por §1'],
  [/\bte\s+conviene\b/i, 'prescripción directa: prohibida por §1'],
  [/\bte\s+recomend(?:amos|o)\b/i, 'prescripción directa: prohibida por §1'],
  [/\bc[áa]mbiate\s+a\b/i, 'prescripción directa: prohibida por §1'],
  [/\btienes\s+que\s+(?:comprar|vender|contratar)\b/i, 'prescripción directa: prohibida por §1'],
  [/\bcu[áa]nto\s+peso\s+darles?\s+en\s+tu\s+cartera\b/i, '«en una cartera indexada», no «en TU cartera»'],
  // Añadidos el 11-sep. La primera pasada quitó «es preferible» de una frase y dejó viva, en
  // el MISMO párrafo, «si quieres simplicidad y convicción en el mercado americano, el S&P
  // 500 **es sólido**». Misma estructura —condición sobre la situación del lector + veredicto
  // sobre el producto— con un adjetivo que la lista no tenía. Lo encontró Verificación
  // leyendo, no grepeando.
  [/\bes s[óo]lido\b/i, 'veredicto sobre un producto: di qué hace, no que sea «sólido»'],
  [/\bes la mejor opci[óo]n\b/i, 'ídem: no hay una «mejor» sin decir para quién ni para qué'],
  [/\bes lo ideal\b/i, 'ídem'],
  [/\bno te compliques\b/i, 'decide por el lector, en imperativo'],
]

/**
 * ⚠️ Lo que este fichero NO puede hacer, escrito aquí para que nadie lo confunda con cobertura.
 *
 * La familia «condición sobre la situación del lector + veredicto sobre el producto» **no se
 * agota con expresiones regulares**. «Si quieres X, Y es sólido» hace exactamente el trabajo de
 * «Y es la opción correcta si X», y el castellano tiene infinitos adjetivos para el hueco de
 * «sólido». Cada patrón de arriba se añadió DESPUÉS de que alguien leyera la frase.
 *
 * O sea: este test impide que vuelvan las fórmulas conocidas. **No demuestra que no haya
 * otras.** Lo que encuentra frases nuevas es leer las páginas, y eso lo hace una persona o una
 * sesión con ese encargo, no este fichero. Un barrido guiado por patrón arregla la mitad de la
 * frase que casa y deja intacta la mitad que dice lo mismo con otras palabras: pasó el 11-sep,
 * en el mismo párrafo y en la misma respuesta.
 */

/** Ficheros de contenido: lo que acaba siendo texto visible. */
function ficherosDeContenido(): string[] {
  const out: string[] = []
  const anda = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name)
      if (e.isDirectory()) anda(p)
      else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) out.push(p)
    }
  }
  anda('src/data')
  anda('src/app')
  // Añadido el 11-sep a instancia de Verificación. Aquí viven `AnalysisResults.tsx` y
  // `OverlapAnalysis.tsx`, que envuelven la salida del analizador: es la ÚNICA interfaz del
  // sitio que habla de la cartera concreta de alguien, y por tanto el sitio más probable del
  // repo para que aparezca algún día un «deberías bajarlo al 50 %». Hoy está limpio; esto
  // cierra el hueco antes de que lo haya, no después.
  anda('src/components')
  return out
}

describe('la web no prescribe: describe', () => {
  const ficheros = ficherosDeContenido()

  it('hay ficheros que revisar (si esto falla, el barrido no está mirando nada)', () => {
    // Sin esto, un fallo del recorrido dejaría todos los tests en verde por vacío.
    expect(ficheros.length).toBeGreaterThan(40)
  })

  it.each(PRESCRIPTIVAS)('ninguna página dice %s', (patron, comoArreglarlo) => {
    const culpables: string[] = []
    for (const f of ficheros) {
      const texto = readFileSync(f, 'utf8')
      // El propio prompt de `ai.ts` y este test citan las fórmulas para prohibirlas.
      if (f.endsWith('ai.ts')) continue
      const m = texto.match(patron)
      if (m) {
        const i = texto.indexOf(m[0])
        culpables.push(`${f}: …${texto.slice(Math.max(0, i - 70), i + 70).replace(/\s+/g, ' ')}…`)
      }
    }
    expect(culpables, `${comoArreglarlo}\n\n${culpables.join('\n')}`).toEqual([])
  })

  it('el prompt del modelo sigue exigiendo describir en vez de prescribir', () => {
    // Test invertido: si alguien relaja la norma del modelo, este test cae y obliga a decidir
    // a la vez qué hace la web. Las dos reglas son la misma regla; deben moverse juntas.
    const ai = readFileSync('src/lib/ai.ts', 'utf8')
    expect(ai).toMatch(/NO prescribir el ajuste/)
    expect(ai).toMatch(/NUNCA propongas una cartera concreta/)
  })
})
