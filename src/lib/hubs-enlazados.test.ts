import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { shouldIndex } from './seo-index-policy'
import sitemap from '../app/sitemap'

/**
 * Ningún hub que pedimos indexar puede quedar sin camino desde la home.
 *
 * Contexto (14-sep-2026). El informe de Search Console daba esto sobre las URLs del sitemap:
 *
 *   Rastreada: actualmente sin indexar   51 %   ~161
 *   **Google no reconoce esta URL**      43 %   ~136
 *   Enviada e indexada                    7 %    ~22
 *
 * Y la lectura que importa, que estaba escrita desde agosto y nadie había conectado con su
 * causa: **«casi la mitad de lo que pedimos indexar no ha sido pedido por Google ni una sola
 * vez. No es que lo mire y lo descarte por calidad: es que no llega.»**
 *
 * Al mirar por qué no llegaba, la respuesta era trivial y llevaba meses ahí: **`/broker`,
 * `/roboadvisor`, `/gestora`, `/cartera`, `/perfil`, `/mercado`, `/pais`, `/sector` y once
 * hubs más no tenían NI UN enlace desde el menú ni desde el pie.** Googlebot entra por la
 * home, sigue enlaces, y no había camino. Las familias de más intención comercial eran
 * justamente las invisibles.
 *
 * Esto separa dos problemas que se venían tratando como uno:
 *
 * | síntoma | causa | lo arregla |
 * |---|---|---|
 * | «Google no reconoce esta URL» | no hay camino hasta ella | **enlaces internos: esto** |
 * | «Rastreada: actualmente sin indexar» | la vio y no la quiso | autoridad, contenido |
 *
 * Pedir indexación a mano ataca el primero y apenas mueve el segundo. Por eso importa saber
 * en cuál está cada URL antes de gastar cuota en ella.
 */

/** Rutas estáticas de primer nivel: `src/app/<algo>/page.tsx`, sin segmento dinámico. */
function hubsDePrimerNivel(): string[] {
  return readdirSync('src/app', { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('[') && !e.name.startsWith('(') && e.name !== 'api')
    .filter((e) => existsSync(`src/app/${e.name}/page.tsx`))
    .map((e) => `/${e.name}`)
}

describe('todo hub indexable tiene un enlace desde la navegación', () => {
  const nav =
    readFileSync('src/components/Footer.tsx', 'utf8') + readFileSync('src/components/Header.tsx', 'utf8')

  it('hay hubs que comprobar (si esto falla, el barrido no mira nada)', () => {
    expect(hubsDePrimerNivel().length).toBeGreaterThan(15)
  })

  it('ningún hub que pedimos indexar se queda huérfano', () => {
    const huerfanos = hubsDePrimerNivel()
      .filter((h) => shouldIndex(h))
      .filter((h) => !nav.includes(`href="${h}"`))

    expect(
      huerfanos,
      `estos hubs están en el sitemap y no se enlazan desde el menú ni el pie, así que ` +
        `Googlebot no tiene camino hasta ellos:\n  ${huerfanos.join('\n  ')}`,
    ).toEqual([])
  })

  it('las familias de intención comercial siguen enlazadas, que eran las invisibles', () => {
    // Explícitas y por su nombre: son las que el informe señaló como familias enteras sin
    // rastrear, y las que más caro cuesta perder. Un test genérico las taparía si alguien
    // cambia la estructura de carpetas.
    for (const h of ['/broker', '/roboadvisor', '/gestora']) {
      expect(nav, `${h} sin enlace: era una de las tres familias invisibles`).toContain(`href="${h}"`)
    }
  })

  /**
   * Un nivel más abajo, y es donde estaba el resto del agujero.
   *
   * `/comparar` es un comparador interactivo: genera las combinaciones con JavaScript y no
   * enlazaba a ninguna de las 16 comparativas que sí pedimos indexar. Googlebot no ejecuta
   * el selector. Y `/comparar-fondo` **daba 404**, así que sus 11 páginas no tenían camino
   * desde ningún sitio.
   *
   * Lo destapó un rastreo real desde la home: 25 de 316 URLs del sitemap eran inalcanzables,
   * y las 25 eran comparativas. Estar en el sitemap no es tener camino.
   */
  it('las comparativas que pedimos indexar se enlazan desde su hub', () => {
    const hub = readFileSync('src/app/comparar/page.tsx', 'utf8')
    expect(hub, '/comparar debe listar las comparativas indexadas con <a>, no solo el selector').toMatch(
      /INDEXED_PAIRS\.map/,
    )
    expect(hub).toMatch(/href=\{`\/comparar\/\$\{pairToSlug/)
  })

  /**
   * Tener camino desde el menú y estar en el sitemap son dos cosas distintas, y hacen falta
   * las dos. Lo destapó el borrado del 19-sep-2026: al contar las URLs del sitemap apareció
   * que `/comparar-fondo` era el único hub de primer nivel que no se anunciaba. Sus
   * comparativas sí estaban; la página que las lista, no. O sea que el único camino hasta
   * ella era el enlace del pie, y si alguien lo quitaba nadie se enteraba.
   */
  it('todo hub indexable se anuncia también en el sitemap', () => {
    const anunciadas = new Set(sitemap().map((r) => r.url.replace('https://boglehub.com', '')))
    const fuera = hubsDePrimerNivel()
      .filter((h) => shouldIndex(h))
      .filter((h) => !anunciadas.has(h))

    expect(
      fuera,
      `estos hubs existen y pedimos indexarlos, pero el sitemap no los menciona: ${fuera.join(', ')}`,
    ).toEqual([])
  })

  it('el hub de comparativas de fondos existe y las enlaza', () => {
    const hub = readFileSync('src/app/comparar-fondo/page.tsx', 'utf8')
    expect(hub, 'sin este hub, las comparativas de fondos quedan huérfanas').toMatch(
      /FUND_PAIRS\.map/,
    )
    expect(hub).toMatch(/href=\{`\/comparar-fondo\/\$\{slug\}`\}/)
    const nav2 = readFileSync('src/components/Footer.tsx', 'utf8')
    expect(nav2, '/comparar-fondo debe tener enlace desde el pie').toContain('href="/comparar-fondo"')
  })
})
