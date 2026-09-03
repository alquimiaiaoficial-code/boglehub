import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { GLOSSARY_TERMS } from '@/data/glossary'
import { BLOG_ARTICLES } from '@/data/blog-articles'

/**
 * La regla de recompra de valores homogéneos (art. 33.5 LIRPF) tiene DOS plazos,
 * y el sitio llegó a publicar solo uno con una justificación que era falsa:
 *
 *   «Hacienda considera que las participaciones de un fondo son valores admitidos
 *    a cotización, así que el plazo de dos meses les aplica igual.»
 *
 * Eso es lo contrario de lo que define a un fondo no cotizado: no se negocia en un
 * mercado secundario, se suscribe y se reembolsa con la gestora a valor liquidativo.
 *
 * Lo que dice cada fuente (verificado el 3-sep-2026):
 *  - Ley: dos meses para valores admitidos a negociación, un año para los no admitidos.
 *  - Ayuda del modelo 100 de la AEAT: remite las participaciones de fondos NO admitidas
 *    a negociación al art. 33.5 g), que es el del año.
 *  - Consulta vinculante DGT V2067-06, de 20-oct-2006: trató las participaciones de
 *    fondos como valores admitidos, o sea dos meses. Es anterior a la Ley 35/2006.
 *
 * O sea: criterio no cerrado. Y la dirección del error importa. Publicar «dos meses»
 * a secas no protege al lector, lo expone: quien reembolse con pérdidas y recompre a
 * los tres meses se creería a salvo y seguiría dentro de la ventana del año.
 *
 * Por eso estos tests exigen que allí donde se explica el plazo aparezcan los dos, y
 * prohíben que vuelva la justificación retirada.
 */
describe('regla de recompra de valores homogéneos', () => {
  const FICHEROS = [
    'src/app/calculadora/irpf-venta-fondos/page.tsx',
    'src/app/calculadora/irpf-venta-fondos/IrpfCalculator.tsx',
    'src/app/llms-full.txt/route.ts',
    'src/app/metodologia/page.tsx',
    'src/data/glossary.ts',
    'src/data/blog-articles.ts',
  ]

  it('no se vuelve a afirmar que las participaciones de un fondo cotizan', () => {
    // "Admitidos a cotización" ni siquiera es la expresión de la ley, que dice
    // "admitidos a negociación". Aparecía solo en la frase retirada.
    for (const fichero of FICHEROS) {
      const contenido = readFileSync(fichero, 'utf8')
      expect(
        contenido,
        `${fichero} recupera la justificación retirada: los fondos no cotizados no son valores admitidos a negociación`
      ).not.toMatch(/admitid[oa]s a cotización/)
    }
  })

  it('la página que explica el plazo cita los dos, no solo el de dos meses', () => {
    const pagina = readFileSync('src/app/calculadora/irpf-venta-fondos/page.tsx', 'utf8')
    expect(pagina, 'falta el plazo de los valores no admitidos a negociación').toContain('un año')
    expect(pagina, 'falta decir que el criterio para fondos no está cerrado').toMatch(
      /no está cerrado|cuestión no cerrada/
    )
    expect(pagina, 'falta el plazo compatible con las dos lecturas').toContain('doce meses')
  })

  it('el aviso del calculador al vender en pérdidas no promete dos meses a secas', () => {
    const calc = readFileSync('src/app/calculadora/irpf-venta-fondos/IrpfCalculator.tsx', 'utf8')
    expect(calc, 'el aviso cita el plazo pero no el del año').toContain('un año')
  })

  it('el glosario avisa de que dos meses no es el plazo de los fondos no cotizados', () => {
    const termino = GLOSSARY_TERMS.find((t) => t.slug === 'regla-dos-meses')
    expect(termino, 'debe existir la entrada regla-dos-meses').toBeDefined()

    // Es la definición canónica: a ella llegan los autoenlaces desde todo el blog,
    // así que un lector puede aterrizar aquí sin pasar por la calculadora.
    expect(termino!.longDefinition, 'el glosario no menciona el plazo de un año').toContain('un año')
    expect(
      termino!.longDefinition,
      'el glosario no menciona a los fondos no cotizados'
    ).toMatch(/fondos? de inversión no cotizados|fondo indexado/)
  })

  it('la definición CORTA del glosario también lleva el matiz, no solo la larga', () => {
    // Esta comprobación va aparte por un fallo real de este mismo test.
    //
    // La primera versión concatenaba `shortDefinition` y `longDefinition` y buscaba
    // el matiz en la suma. Pasaba en verde con la corta diciendo solo "dos meses",
    // porque la larga ya lo tenía. Lo cazó GEO, no el test.
    //
    // Y la corta es justamente el campo que más se lee de los dos:
    //  - es la meta description de /glosario/regla-dos-meses,
    //  - es la `description` del schema DefinedTerm,
    //  - y es la línea "**Definición**" que `llms-full.txt` entrega a los asistentes
    //    (`src/app/llms-full.txt/route.ts`, que sirve `term.shortDefinition`).
    //
    // O sea: el dato incompleto estaba en el canal más citado y el corregido en el
    // menos leído. Verificar la suma de dos campos no vale cuando cada uno viaja solo.
    const termino = GLOSSARY_TERMS.find((t) => t.slug === 'regla-dos-meses')
    const corta = termino!.shortDefinition

    expect(corta, 'la definición corta se queda en los dos meses').toMatch(/doce|12 meses|un año/)
    expect(corta, 'la definición corta no dice a qué producto aplica cada plazo').toMatch(
      /no cotiza|fondo/
    )
  })

  it('llms-full.txt entrega los dos plazos a los asistentes que lo ingieren', () => {
    const ruta = readFileSync('src/app/llms-full.txt/route.ts', 'utf8')
    expect(ruta, 'el dato servido a los LLM se queda en los 2 meses').toContain('1 año')
    expect(ruta).toContain('no admitidos')
  })

  it('el blog no dice que la recompra anule la pérdida sin matizar el plazo', () => {
    // "Hacienda anula la pérdida" era doblemente incorrecto: no la anula, la aplaza,
    // y el plazo citado era el que no toca.
    const traspaso = JSON.stringify(
      BLOG_ARTICLES.filter((a) => JSON.stringify(a).includes('recompra de valores homogéneos'))
    )
    if (traspaso.includes('recompra de valores homogéneos')) {
      expect(traspaso, 'el blog cita la regla sin el plazo de un año').toContain('un año')
    }
  })
})
