import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
// `sep` en vez de una expresión regular con barra invertida: en Windows las rutas llegan
// con `\` y comparar contra las excepciones exige normalizarlas. Se usa `split(sep).join`
// porque es literal y no depende de escapar la barra dentro de un regex.
import { join, sep } from 'node:path'

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
  /**
   * Imperativo desnudo, anadido el 18-sep-2026 y ACOTADO el mismo dia.
   *
   * Las comparativas de fondos decian «elige el mas barato» y «elige por gestora preferida»,
   * y ninguno de los patrones anteriores lo cazaba: todos buscaban la segunda persona con
   * «deberias», «te conviene» o «cambiate». El imperativo desnudo se les escapaba entero.
   * «Elige X» no lleva «deberias» delante y prescribe igual, o mas, porque suena a
   * instruccion y no a consejo. Y estaba en una FAQ que se sirve tambien como datos
   * estructurados, asi que un motor podia citarlo como recomendacion de BogleHub.
   *
   * ⚠️ LA PRIMERA VERSION ERA `elige\s+(el|la|un|una|...)` Y NO SERVIA. Cazaba 24 sitios, de
   * los que solo 10 eran prescripcion: el resto eran instrucciones operativas («elige la
   * cotizacion en euros», «Paso 3: Elige tu broker»), titulos de enlace y —dos veces—
   * indicativo en TERCERA persona, que en castellano se escribe igual que el imperativo
   * («que elige el inversor Boglehead», «el mercado elige los pesos»).
   *
   * Un patron que marca 14 falsos positivos no se afina con 14 excepciones: se afina
   * mirando que es lo que de verdad cruza la linea. Y lo que la cruza es recomendar un
   * PRODUCTO, una GESTORA o una ASIGNACION concreta — no explicar como se opera. «Elige la
   * cotizacion en euros» dice donde pulsar; «elige el fondo por su TER» dice que comprar.
   */
  [
    /(?:elige|opta\s+por|qu[ée]date\s+con)\s+(?:el|la|un|una)?\s*(?:fondo|etf|producto|gestora|pol[íi]tica|proporci[óo]n|m[áa]s\s+barato|cuenta\s+custody)/i,
    'imperativo sobre un producto o una asignacion: describe en que se diferencian y deja la eleccion fuera',
  ],
  // Añadidos el 11-sep. La primera pasada quitó «es preferible» de una frase y dejó viva, en
  // el MISMO párrafo, «si quieres simplicidad y convicción en el mercado americano, el S&P
  // 500 **es sólido**». Misma estructura —condición sobre la situación del lector + veredicto
  // sobre el producto— con un adjetivo que la lista no tenía. Lo encontró Verificación
  // leyendo, no grepeando.
  [/\bes s[óo]lido\b/i, 'veredicto sobre un producto: di qué hace, no que sea «sólido»'],
  [/\bes la mejor opci[óo]n\b/i, 'ídem: no hay una «mejor» sin decir para quién ni para qué'],
  [/\bes lo ideal\b/i, 'ídem'],
  [/\bno te compliques\b/i, 'decide por el lector, en imperativo'],
  // Añadidos el 11-sep, tanda 3. Verificación dejó de buscar FRASES y buscó la FORMA
  // —condición sobre el lector + predicado valorativo en la misma frase— sobre `src/data`,
  // `src/app` y `src/components`: 12 candidatos, leídos uno a uno, 6 de la familia.
  // Entre ellos el peor de todo el día, que no era estilo sino un hecho contradicho:
  // `/blog/myinvestor-opinion-2026` decía «MyInvestor es la opción OBJETIVAMENTE MEJOR en
  // España» mientras `/empezar` decía «no hay uno objetivamente mejor». El sitio afirmaba y
  // negaba la misma proposición con las mismas dos palabras. Y es la peor combinación
  // posible: superlativo que FINGE criterio, sobre un proveedor comercial con nombre,
  // condicionado al perfil del lector, en una página donde además decimos que no hay
  // afiliación — lo que la hace leer como desinteresada y por tanto más creíble.
  [/\bobjetivamente mejor\b/i, 'un superlativo no se vuelve dato por llamarse objetivo: di el criterio medible'],
  [/\bes la opci[óo]n m[áa]s\b/i, 'di el atributo («es el más simple porque…»), no el veredicto'],
  [/\bes la opci[óo]n coherente\b/i, 'ídem'],
  [/\bes ideal (?:si|para)\b/i, '«encaja con quien…», que describe el encaje en vez de dictarlo'],
  [/\bes lo m[áa]s eficiente\b/i, 'di en qué es más eficiente y cuánto'],
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

/**
 * Excepciones DECLARADAS, con fichero y motivo.
 *
 * Existe desde el 18-sep-2026, al añadir los patrones del imperativo desnudo. Cazaron ocho
 * sitios: cinco eran consejo financiero de verdad y se reescribieron, y tres no lo eran.
 *
 * **No todo imperativo es prescripción financiera.** «Elige la rentabilidad anual esperada»
 * en una calculadora es una instrucción de uso: dice qué hacer con un campo del formulario,
 * no qué hacer con el dinero. Marcar eso como infracción es un falso positivo, y un test que
 * da falsos positivos se acaba ignorando entero — que es peor que no tenerlo.
 *
 * La lista es explícita a propósito: para añadir algo aquí hay que escribir el motivo, y
 * escribirlo obliga a distinguir las dos cosas en vez de silenciar el patrón.
 */
const EXCEPCIONES: readonly { fichero: string; frase: string; motivo: string }[] = [
  // VACIA A PROPOSITO, y que siga asi es la senal de que los patrones estan bien puestos.
  //
  // El 18-sep-2026 hubo cinco excepciones durante media hora, mientras el patron del
  // imperativo era `elige\s+(el|la|un|una)`. Al acotarlo a producto, gestora o asignacion
  // dejaron de hacer falta todas: lo que se colaba no eran excepciones, era un patron mal
  // planteado. Un test que necesita muchas excepciones esta diciendo que mide lo que no es.
  //
  // El mecanismo se conserva para cuando aparezca un caso de verdad. Los dos tests de abajo
  // lo vigilan: exigen motivo escrito y que la frase siga existiendo, para que ninguna
  // excepcion sobreviva al texto que venia a permitir.
]

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
      const rutaNormalizada = f.split(sep).join('/')

      /**
       * Se descuentan las FRASES declaradas como excepción, no el patrón entero del fichero.
       *
       * La primera versión saltaba el patrón completo cuando el fichero estaba en la lista, y
       * eso silenciaba de más: en `src/data/blog-articles.ts` hay 700.000 caracteres, y
       * perdonarle «elige» por una frase legítima habría tapado las otras dos infracciones
       * reales que aparecieron justo después en ese mismo fichero.
       */
      let aRevisar = texto
      for (const e of EXCEPCIONES) {
        if (rutaNormalizada.includes(e.fichero)) aRevisar = aRevisar.split(e.frase).join('')
      }

      const m = aRevisar.match(patron)
      if (m) {
        const i = aRevisar.indexOf(m[0])
        culpables.push(`${f}: …${aRevisar.slice(Math.max(0, i - 70), i + 70).replace(/\s+/g, ' ')}…`)
      }
    }
    expect(culpables, `${comoArreglarlo}\n\n${culpables.join('\n')}`).toEqual([])
  })

  it('las excepciones son pocas y cada una explica por qué lo es', () => {
    // Una lista de excepciones que crece sin control vacía el test por dentro. Si algún día
    // hay que subir este número, que sea una decisión y no un descuido.
    expect(EXCEPCIONES.length).toBeLessThanOrEqual(6)
    for (const e of EXCEPCIONES) {
      expect(e.motivo.length, `la excepción de ${e.fichero} necesita un motivo de verdad`).toBeGreaterThan(60)
    }
  })

  it('cada excepción sigue correspondiendo a una frase que existe de verdad', () => {
    // Una excepción huérfana esconde el patrón para un fichero que ya no está, y el día que
    // alguien cree otro con ese nombre se lo encuentra silenciado sin saberlo.
    for (const e of EXCEPCIONES) {
      const candidatos = ficheros.filter((f) => f.split(sep).join('/').includes(e.fichero))
      expect(candidatos.length, `la excepción apunta a ${e.fichero}, que ya no existe`).toBeGreaterThan(0)
      // Y la frase concreta tiene que seguir ahí: una excepción cuya frase ya no aparece
      // silencia nada y ensucia la lista, o peor, tapa algo parecido que sí infringe.
      const apareceEnAlguno = candidatos.some((f) => readFileSync(f, 'utf8').includes(e.frase))
      expect(apareceEnAlguno, `la frase «${e.frase}» ya no está en ${e.fichero}: sobra la excepción`).toBe(true)
    }
  })

  it('el prompt del modelo sigue exigiendo describir en vez de prescribir', () => {
    // Test invertido: si alguien relaja la norma del modelo, este test cae y obliga a decidir
    // a la vez qué hace la web. Las dos reglas son la misma regla; deben moverse juntas.
    const ai = readFileSync('src/lib/ai.ts', 'utf8')
    expect(ai).toMatch(/NO prescribir el ajuste/)
    expect(ai).toMatch(/NUNCA propongas una cartera concreta/)
  })
})
