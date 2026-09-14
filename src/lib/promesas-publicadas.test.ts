import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

/**
 * Promesas que hacemos en público y que dependen de nuestro propio código.
 *
 * Contexto (14-sep-2026). Lo planteó GEO y es la categoría que faltaba: **los datos propios
 * también caducan, y ese caso es peor que el de los datos ajenos.**
 *
 * El TER de VWCE caducó porque Vanguard lo cambió — y Vanguard publica un PDF que nos
 * desmiente, así que había alguien enfrente. **Con nuestras propias afirmaciones no hay
 * nadie.** Caducan cuando cambiamos el código nosotros, en silencio y sin contradictor.
 *
 * Ya pasó esta semana: `llms.txt` decía que al modelo le llegan patrimonio, aportación y
 * objetivo. **Era cierto el 7-sep y falso el 8**, porque el payload se recortó en medio.
 * Estuvo mal seis días y se encontró por casualidad, mirando otra cosa.
 *
 * De ahí el barrido que produjo este fichero: se listaron las quince afirmaciones del bloque
 * del analizador en `llms.txt` y se miró cuáles tenían algo que las rompiera. **Tres no lo
 * tenían.** Son estas.
 *
 * ⚠️ Lo que se vigila NO es que el código haga lo correcto — para eso están sus propios
 * tests. Es que **lo publicado y el código digan lo mismo**. Cuando uno de los dos cambie,
 * esto falla y obliga a mover el otro.
 */

const llms = () => readFileSync('src/app/llms.txt/route.ts', 'utf8')

describe('lo que prometemos en público sigue siendo lo que hace el código', () => {
  it('el límite de posiciones publicado es el que aplica el endpoint', () => {
    const route = readFileSync('src/app/api/analyze/route.ts', 'utf8')
    const m = route.match(/z\.array\(PositionSchema\)\.min\(1\)\.max\((\d+)\)/)
    expect(m, 'no encuentro el límite de posiciones en la ruta').not.toBeNull()
    const limite = m![1]
    expect(
      llms(),
      `llms.txt anuncia un máximo de posiciones distinto del que aplica el código (${limite})`,
    ).toContain(`admite hasta ${limite} posiciones`)
  })

  /**
   * La más importante de las tres, y la que más caro costaría perder en silencio.
   *
   * `llms.txt` promete: «si el proveedor de IA falla, el análisis numérico se entrega igual».
   * Eso es una promesa de resiliencia, y es cierta porque `route.ts` calcula la asignación
   * ANTES de llamar al modelo y devuelve el análisis aunque la narrativa falle.
   *
   * El día que alguien reordene eso —o haga que un fallo del modelo aborte la petición— la
   * promesa se rompe **sin que nadie lo note**, porque el síntoma solo aparece cuando el
   * proveedor está caído. Es exactamente la forma de la avería que tuvo el sitio quince días
   * en agosto sin que se enterara nadie: lo que no rompe nada visible no se detecta solo.
   */
  it('el análisis numérico no depende del modelo: un fallo de IA no aborta la respuesta', () => {
    const route = readFileSync('src/app/api/analyze/route.ts', 'utf8')

    // 1. La asignación se calcula ANTES de llamar al modelo.
    const iAlloc = route.indexOf('calculateAllocation(')
    const iAi = route.indexOf('generateAiNarrative(')
    expect(iAlloc, 'no encuentro el cálculo de la asignación').toBeGreaterThan(-1)
    expect(iAi, 'no encuentro la llamada al modelo').toBeGreaterThan(-1)
    expect(iAlloc, 'la asignación debe calcularse antes de llamar al modelo').toBeLessThan(iAi)

    // 2. Y lo que de verdad sostiene la promesa: la rama del fallo NO devuelve error.
    //    Esto es lo que hay que vigilar. La primera versión de este test solo comparaba el
    //    orden de las dos llamadas, y eso es un proxy débil: alguien puede dejarlas en orden
    //    y aun así hacer que un fallo del modelo aborte la petición. Un test que parece
    //    fuerte y no lo es resulta peor que no tenerlo, porque nadie vuelve a mirar.
    const iFallo = route.indexOf('if (!aiResult.ok)')
    expect(iFallo, 'no encuentro la rama que trata el fallo del modelo').toBeGreaterThan(-1)
    const tras = route.slice(iFallo)
    const iExito = tras.indexOf('success: true')
    const iError = tras.indexOf('success: false')
    expect(iExito, 'tras el fallo del modelo debe devolverse igualmente el análisis').toBeGreaterThan(-1)
    expect(
      iError === -1 || iError > iExito,
      'hay un return de error entre el fallo del modelo y la respuesta: la promesa de llms.txt sería falsa',
    ).toBe(true)

    expect(llms()).toMatch(/si el proveedor de IA falla, el análisis numérico se entrega igual/)
  })

  it('los campos que se publican del payload son los que se envían', () => {
    // llms.txt enumera «ticker, importe en euros y peso de cada una». Si el endpoint añade
    // un campo por posición, esa enumeración pasa a describir de menos — que es justo el
    // fallo del 7-sep con los datos de la proyección FIRE.
    const route = readFileSync('src/app/api/analyze/route.ts', 'utf8')
    const bloque = route.slice(route.indexOf('const positionSummary'), route.indexOf('generateAiNarrative('))
    const campos = [...bloque.matchAll(/^\s{6,}(\w+)[,:]/gm)].map((m) => m[1])
    expect(
      new Set(campos),
      `el payload por posición cambió: ${campos.join(', ')}. Actualiza la enumeración de llms.txt`,
    ).toEqual(new Set(['ticker', 'valueEUR', 'weight']))
    expect(llms()).toContain('ticker, importe en euros y peso de cada una')
  })
})
