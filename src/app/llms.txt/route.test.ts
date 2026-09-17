import { describe, it, expect } from 'vitest'
import { GET } from './route'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { GLOSSARY_TERMS } from '@/data/glossary'
import { ETF_THEMES } from '@/data/etf-themes'
import { ETF_PAIRS } from '@/data/etf-pairs'
import { getAllEtfs } from '@/lib/etf-database'

/**
 * Guarda contra la regresión que motivó esta ruta: los conteos de llms.txt
 * solían estar hardcodeados y se desfasaban (p.ej. "48 términos" cuando ya
 * había 52). Estos tests fallan si la interpolación dinámica se rompe o si
 * alguien vuelve a meter un número fijo que no cuadre con los datos.
 */
describe('llms.txt route', () => {
  it('sirve text/plain y empieza con la cabecera de BogleHub', async () => {
    const res = await GET()
    expect(res.headers.get('Content-Type')).toContain('text/plain')
    const body = await res.text()
    expect(body.startsWith('# BogleHub')).toBe(true)
  })

  it('incrusta los conteos reales de los datos (nunca obsoletos)', async () => {
    const body = await (await GET()).text()
    expect(body).toContain(GLOSSARY_TERMS.length + ' términos de glosario')
    expect(body).toContain('Glosario de ' + GLOSSARY_TERMS.length + ' términos')
    expect(body).toContain('El glosario contiene ' + GLOSSARY_TERMS.length + ' términos')
    expect(body).toContain(BLOG_ARTICLES.length + ' artículos de blog')
    expect(body).toContain('BogleHub analiza ' + getAllEtfs().length + ' ETFs UCITS')
    expect(body).toContain(ETF_PAIRS.length + ' comparativas de ETFs precurados')
    expect(body).toContain(ETF_THEMES.length + ' hubs de categoría de ETFs')
  })

  it('no conserva el viejo "48 términos" hardcodeado una vez crecido el glosario', async () => {
    const body = await (await GET()).text()
    if (GLOSSARY_TERMS.length !== 48) {
      expect(body).not.toContain('48 términos')
    }
  })

  /**
   * El bloque «qué hace y qué no hace el analizador» (7-sep-2026) nació con el catálogo
   * escrito a mano —«catálogo de 68 ETFs UCITS»— en el mismo fichero cuyo comentario cita
   * «68 ETFs» como ejemplo de lo que el refactor vino a eliminar. Lo cazó Verificación.
   *
   * El número era correcto ese día. El problema no era la cifra: era que dejaba de serlo
   * sola, en el fichero que leen los motores, donde un dato viejo se convierte en un hecho
   * que las IAs repiten durante meses.
   */
  it('el catálogo del bloque del analizador sale de los datos, no escrito a mano', async () => {
    const body = await (await GET()).text()
    expect(body).toContain('catálogo de ' + getAllEtfs().length + ' ETFs UCITS')
  })

  it('el bloque del analizador declara sus límites y no promete lo que no hace', async () => {
    const body = await (await GET()).text()
    // Los motores rellenan los huecos: un límite no dicho se lo inventan. Gemini nos
    // atribuyó «rebalanceo» el 7-sep porque no decíamos qué hacía la herramienta.
    expect(body).toContain('el solapamiento es de exposición, no de valores concretos')
    expect(body).toMatch(/reglas explícitas del system prompt/)
  })

  /**
   * Hasta el 17-sep-2026 este test exigía la frase «NO admite fondos indexados», y era
   * correcta. Dejó de serlo ese día, cuando el analizador empezó a leer fondos.
   *
   * Se conserva la intención del test —que los límites estén DICHOS— y cambian los límites,
   * porque ahora son otros y más finos. Borrar la comprobación sin poner la nueva habría
   * dejado el hueco que este fichero existe para tapar: lo que no decimos, los motores se
   * lo inventan.
   *
   * Es además el caso de manual de la «decimocuarta fuente que miente»: una afirmación
   * verdadera que caduca. Aquí caducó por un cambio NUESTRO, que es la variante fácil de
   * pasar por alto porque nadie sospecha de su propio despliegue.
   */
  it('lo que declara sobre fondos es lo que el analizador hace de verdad', async () => {
    const body = await (await GET()).text()
    expect(body).not.toContain('NO admite fondos indexados')
    expect(body).toContain('fondos indexados identificados por su ISIN')
    // Los tres límites que hacen honesta la función, y que un motor no puede deducir:
    expect(body, 'debe decir de dónde saca la exposición de un fondo').toMatch(
      /toma la exposición del ETF de su catálogo que replica ese mismo índice/,
    )
    expect(body, 'debe decir que hay casos aproximados').toMatch(/aproximación/)
    expect(body, 'debe decir que el TER es el del fondo').toMatch(
      /TER que se aplica es SIEMPRE el del fondo/,
    )
    // Singular o plural: el numero de fondos fuera se calcula, asi que la frase cambia
    // sola cuando cambia la tabla. Fijar el plural haria fallar el test por gramatica.
    expect(body, 'debe decir que hay fondos que no analiza').toMatch(
      /NO se analiza[n]? a propósito/,
    )
  })
})
