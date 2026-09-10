import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { shouldIndex, NOINDEX_METADATA } from './seo-index-policy'

/**
 * Las cuatro condiciones del render bajo demanda, atadas a un test.
 *
 * Contexto (10-sep-2026). El recorte de agosto marcó 1.089 páginas como `noindex, follow`,
 * pero el build las seguía pre-generando todas: HTML por despliegue de páginas que le
 * pedimos a Google que NO indexe. Eso agotó la cuota de Vercel.
 *
 * Se planteó devolverlas 404. SEO lo vetó con un argumento de método: entre el 20 y el
 * 27-sep se mide el efecto del recorte, y meter 1.089 URLs a 404 en esa misma ventana
 * haría imposible separar qué causó qué. La alternativa acordada fue render bajo demanda,
 * con CUATRO condiciones que este fichero comprueba una por una:
 *
 *   1. Siguen devolviendo 200 (no 404)  ->  `dynamicParams === true`
 *   2. Misma meta robots que ahora      ->  `robotsFor()` sigue emitiendo noindex,follow
 *   3. Cacheadas tras el primer render  ->  sin `force-dynamic` ni `revalidate = 0`
 *   4. Canonical a sí mismas            ->  `alternates.canonical` presente
 *
 * Y una quinta que no pidió nadie pero es la que puede romperlo en silencio: que la ruta
 * que `soloIndexables` construye sea la ruta REAL. Si alguien escribe
 * `/simulacion/${cantidad}` olvidando dos segmentos, `shouldIndex` sigue devolviendo false
 * (el prefijo casa igual) y nadie se entera. Peor: si la escribe sin la barra inicial,
 * `shouldIndex` devuelve TRUE para todo y el build vuelve a generar las 1.089 sin avisar.
 *
 * Por eso el test NO lee la plantilla del código: la deriva del árbol de directorios, que
 * es lo que Next usa de verdad para enrutar. Comparar el código consigo mismo no prueba nada.
 */

/** Las 13 familias afectadas por la política de indexación. */
const RUTAS = [
  'simulacion/[cantidad]/[ticker]/[ano]',
  'dca/[ticker]/[anos]',
  'comprar/[ticker]/[broker]',
  'ahorrar/[cantidad]/para/[objetivo]',
  'plan/[edad]/[objetivo]',
  'analiza/[ticker]/[aspecto]',
  'comparar-cartera/[pair]',
  'historico/[ano]/[ticker]',
  'etf/[ticker]',
  'vs-broker/[pair]',
  'invertir/[slug]',
  'cuanto-necesito/[slug]',
  'comparar/[pair]',
] as const

/**
 * Construye la URL de un param igual que lo hace el enrutador: recorriendo los segmentos
 * del directorio y sustituyendo los `[dinamicos]` por su valor. Los segmentos estáticos
 * (como el `para` de `/ahorrar/500/para/casa`) se copian tal cual.
 */
function urlReal(ruta: string, param: Record<string, string>): string {
  const segmentos = ruta.split('/').map((seg) => {
    if (!seg.startsWith('[')) return seg
    const nombre = seg.slice(1, -1)
    const valor = param[nombre]
    if (valor === undefined) throw new Error(`el param no trae "${nombre}": ${JSON.stringify(param)}`)
    return valor
  })
  return '/' + segmentos.join('/')
}

const fuente = (ruta: string) => readFileSync(`src/app/${ruta}/page.tsx`, 'utf8')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cargar = (ruta: string) => import(`../app/${ruta}/page`) as Promise<any>

describe('render bajo demanda de las páginas que no pedimos indexar', () => {
  it.each(RUTAS)('%s · condición 1: dynamicParams true, para que respondan 200 y no 404', async (ruta) => {
    const mod = await cargar(ruta)
    expect(
      mod.dynamicParams,
      `${ruta} con dynamicParams=false devolvería 404 en todo lo no pre-generado, que es justo lo que SEO vetó`,
    ).toBe(true)
  })

  it.each(RUTAS)('%s · condición 2: sigue emitiendo la meta robots de la política', (ruta) => {
    expect(fuente(ruta)).toMatch(/robots: robotsFor\(/)
  })

  it.each(RUTAS)('%s · condición 3: nada impide que el primer render quede cacheado', (ruta) => {
    const texto = fuente(ruta)
    expect(texto, `${ruta} fuerza render dinámico: no se cachearía nunca`).not.toMatch(
      /export const dynamic\s*=\s*['"]force-dynamic['"]/,
    )
    expect(texto, `${ruta} revalida en cada petición: no se cachearía nunca`).not.toMatch(
      /export const revalidate\s*=\s*0\b/,
    )
  })

  it.each(RUTAS)('%s · condición 4: canonical a sí misma', (ruta) => {
    expect(fuente(ruta)).toMatch(/alternates:\s*\{\s*canonical:/)
  })

  it.each(RUTAS)('%s · el build no pre-genera ni una sola página noindex', async (ruta) => {
    const mod = await cargar(ruta)
    const params: Record<string, string>[] = await mod.generateStaticParams()
    expect(Array.isArray(params), 'debe devolver siempre un array, aunque esté vacío').toBe(true)

    const coladas = params.filter((p) => !shouldIndex(urlReal(ruta, p)))
    expect(
      coladas.slice(0, 5),
      `${ruta} pre-genera ${coladas.length} páginas que pedimos NO indexar`,
    ).toEqual([])
  })

  it('la política sigue diciendo noindex,follow y no otra cosa', () => {
    // `follow` importa menos de lo que creíamos —SEO demostró el 9-sep que en cinco de las
    // ocho familias no se dispara nunca, porque no hay enlaces que seguir hasta ellas— pero
    // cambiarlo no es gratis y no toca hacerlo dentro de la ventana de medición.
    expect(NOINDEX_METADATA).toEqual({
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    })
  })

  it('sigue habiendo páginas que SÍ se pre-generan: esto no vació el build entero', async () => {
    // Sin esta comprobación, un `shouldIndex` que devolviera siempre false pasaría todos los
    // tests de arriba con nota. Las 16 comparativas con demanda probada tienen que seguir
    // saliendo del build ya renderizadas: son las únicas de estas trece familias que
    // pedimos indexar, y Googlebot no debería esperar a un render para verlas.
    const mod = await cargar('comparar/[pair]')
    const params: Record<string, string>[] = await mod.generateStaticParams()
    expect(params.length).toBe(16)
  })
})
