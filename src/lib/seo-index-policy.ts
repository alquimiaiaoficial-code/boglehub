/**
 * Política de indexación del sitio.
 *
 * Contexto (agosto 2026): con 1.404 URLs en el sitemap y muy pocos enlaces
 * externos, Google dejó de indexar el sitio casi por completo. La inspección de
 * URLs devolvía "Rastreada: actualmente sin indexar" en 14 de 15 páginas clave,
 * y el rastreo se detuvo en junio. El patrón (muchísimas páginas generadas por
 * combinatoria, poca autoridad que las respalde) es el que Google trata como
 * contenido a escala de bajo valor.
 *
 * La respuesta es reducir lo que pedimos indexar a las páginas con demanda real
 * y contenido propio, y marcar el resto como noindex,follow: siguen siendo
 * útiles para quien llega a ellas y siguen repartiendo enlaces internos, pero
 * dejan de competir por el presupuesto de rastreo.
 *
 * Esta política es la ÚNICA fuente de verdad. La aplican dos sitios:
 *   1. `src/app/sitemap.ts` — filtra las URLs que se envían.
 *   2. El `generateMetadata` de cada ruta afectada — emite la meta robots.
 * Las dos deben coincidir siempre: un sitemap que anuncia una URL con noindex
 * es una señal contradictoria.
 */
import { ETF_PAIRS, pairToSlug } from '@/data/etf-pairs'

/**
 * Familias de páginas generadas por combinatoria (cantidad × ticker × año, edad ×
 * objetivo, ticker × bróker...). Se excluyen las páginas de detalle, NO los hubs:
 * `/simulacion` sigue indexado, `/simulacion/1000/vwce/2020` no.
 */
const NOINDEX_PREFIXES = [
  '/simulacion/',
  '/dca/',
  '/comprar/',
  '/ahorrar/',
  '/plan/',
  '/analiza/',
  '/comparar-cartera/',
  '/historico/',
] as const

/**
 * De las comparativas ETF vs ETF solo se indexan las curadas a mano en
 * `ETF_PAIRS` (elegidas por búsquedas reales de la comunidad española). Las ~190
 * restantes salen de combinar todos los tickers populares entre sí y casi ninguna
 * tiene demanda. Se aceptan los dos órdenes del slug.
 */
const CURATED_PAIR_SLUGS: ReadonlySet<string> = new Set(
  ETF_PAIRS.flatMap(([a, b]) => [pairToSlug(a, b), pairToSlug(b, a)])
)

/** Decide si una ruta debe pedir indexación. `path` empieza por `/` y no lleva dominio. */
export function shouldIndex(path: string): boolean {
  if (path.startsWith('/comparar/')) {
    return CURATED_PAIR_SLUGS.has(path.slice('/comparar/'.length))
  }
  return !NOINDEX_PREFIXES.some((prefix) => path.startsWith(prefix))
}

/**
 * Meta robots para las páginas excluidas. `follow` se mantiene a propósito: la
 * página no compite en el índice pero sus enlaces internos siguen contando.
 */
export const NOINDEX_METADATA = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
} as const

/** Bloque `robots` listo para insertar en un `generateMetadata`, o nada si la ruta se indexa. */
export function robotsFor(path: string) {
  return shouldIndex(path) ? undefined : NOINDEX_METADATA
}
