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
 * Esta política es la ÚNICA fuente de verdad. La aplican TRES sitios:
 *   1. `src/app/sitemap.ts` — filtra las URLs que se envían.
 *   2. El `generateMetadata` de cada ruta afectada — emite la meta robots.
 *   3. El `generateStaticParams` de cada ruta afectada — decide qué se pre-genera
 *      en el build y qué se renderiza bajo demanda (ver `soloIndexables`).
 * Los tres deben coincidir siempre: un sitemap que anuncia una URL con noindex
 * es una señal contradictoria, y pre-generar 1.089 páginas que pedimos NO indexar
 * es pagar el coste sin la contrapartida.
 *
 * ⚠️ Este comentario dice "TRES" desde el 10-sep-2026. Si algún día lo aplica un
 * cuarto sitio, se actualiza aquí. Un comentario que enumera lugares caduca solo.
 */
import { slugToPair } from '@/data/etf-pairs'

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
  // Segundo recorte (26-ago-2026), a partir de la auditoría de SEO que cruzó el
  // sitemap con el historial de impresiones. Estas cuatro familias llevan vivas e
  // indexables desde mayo y no han conseguido una sola impresión:
  //  · /etf/[ticker]     68 URLs, 0 impresiones. Vivas durante toda la "luna de
  //    miel" del dominio, mientras /fondo/ —creada 12 días después y con 13 URLs—
  //    se llevó 252 y alcanzó la posición 1,3. La query "VWCE" la disputan justETF,
  //    Morningstar y Vanguard; la ficha-cabecera no es nuestra pelea. El nicho es
  //    el fondo indexado traspasable.
  //  · /vs-broker/[par]  15 URLs, 0 impresiones.
  //  · /invertir/[algo]  10 URLs, 9 impresiones en una sola. El 96 % del texto es
  //    el mismo esqueleto entre hermanas: la plantilla más pura que quedaba.
  //  · /cuanto-necesito/ 10 URLs, 4 impresiones en una sola. Esqueleto al 75 %.
  // Ojo con la lectura fácil: que la ficha de un ticker no rankee no significa que
  // el sitio no pueda rankear con tickers. /comparar/ está hecha de los mismos y
  // saca posiciones 3-10. Lo que no funciona es la ficha-cabecera, no el ticker.
  '/etf/',
  '/vs-broker/',
  '/invertir/',
  '/cuanto-necesito/',
] as const

/**
 * Comparativas ETF vs ETF que pedimos indexar.
 *
 * Deliberadamente NO se deriva de `ETF_PAIRS`. Esa lista se curó a mano por
 * intuición sobre qué compara la comunidad española, y la auditoría del 26-ago
 * demostró que la intuición falló: 51 de sus 57 pares no han tenido nunca una
 * impresión, mientras que 35 de las URLs que sí las tuvieron habían quedado fuera.
 *
 * Esta es la lista *demostrada*: los pares con impresiones reales y posición de
 * página 1 en el historial de Search Console. Son 16 en vez de 57, y todos con
 * demanda probada.
 *
 * `ETF_PAIRS` sigue siendo la lista editorial (alimenta la interfaz, los enlaces
 * entre fichas, `llms.txt` y los contadores de `/sobre`) y no se toca: qué
 * mostramos y qué pedimos indexar son dos decisiones distintas.
 *
 * Al comparar se normaliza el orden del par, así que da igual cómo se escriba el slug.
 */
export const INDEXED_PAIRS: readonly (readonly [string, string])[] = [
  ['VEUR', 'MWRD'], ['VWCE', 'CNDX'], ['VWCE', 'VFEM'], ['EIMI', 'AGGH'],
  ['VWCE', 'EIMI'], ['IWDA', 'IUSA'], ['ISAC', 'SXR8'], ['IWDA', 'EUNA'],
  ['CSPX', 'CNDX'], ['EQQQ', 'VEUR'], ['ISAC', 'VFEM'], ['IWDA', 'VUAA'],
  ['IWDA', 'ISAC'], ['VUAA', 'XDWD'], ['WSML', 'ZPRV'], ['SXRV', 'CNDX'],
]

/** Clave independiente del orden de los tickers dentro del par. */
const pairKey = (a: string, b: string) => [a.toUpperCase(), b.toUpperCase()].sort().join('|')

const INDEXED_PAIR_KEYS: ReadonlySet<string> = new Set(
  INDEXED_PAIRS.map(([a, b]) => pairKey(a, b))
)

/** Decide si una ruta debe pedir indexación. `path` empieza por `/` y no lleva dominio. */
export function shouldIndex(path: string): boolean {
  if (path.startsWith('/comparar/')) {
    const pair = slugToPair(path.slice('/comparar/'.length))
    return pair !== null && INDEXED_PAIR_KEYS.has(pairKey(pair[0], pair[1]))
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

/**
 * Filtra los params de un `generateStaticParams` dejando SOLO los que pedimos indexar.
 * Los demás no se pre-generan: se renderizan la primera vez que alguien los visita y
 * quedan cacheados (ISR). Requiere `dynamicParams = true`, que es el valor por defecto.
 *
 * Por qué existe (10-sep-2026). El recorte de agosto marcó 1.089 páginas como
 * `noindex, follow`, pero el build las seguía generando TODAS: ~1.089 ficheros HTML por
 * despliegue de páginas que le pedimos a Google que no indexe. Eso costó el 100 % de la
 * cuota de almacenamiento de Vercel —y el fundador es menor, no puede contratar el plan
 * de pago—, así que reducir el build no era una optimización sino la única salida.
 *
 * Se descartó la alternativa de devolverlas 404. La razón la dio SEO y es de método, no de
 * SEO: entre el 20 y el 27-sep se mide el efecto del recorte, y meter 1.089 URLs a 404 en
 * esa misma ventana haría imposible separar qué causó qué. Bajo demanda las páginas siguen
 * devolviendo 200 con la misma meta robots, así que la única variable que cambia es dónde
 * se renderizan. El borrado de verdad —con 410, no 404— se decide después del 20-sep.
 *
 * Ojo al matiz que hace esto seguro: `shouldIndex` es la MISMA función que filtra el
 * sitemap y emite el `robots`. Si mañana una familia vuelve al índice, vuelve a
 * pre-generarse sola, sin tocar trece ficheros ni acordarse de ninguno.
 *
 * @param params  Lo que el `generateStaticParams` iba a devolver.
 * @param ruta    Cómo se construye la URL de un param. Debe coincidir EXACTAMENTE con el
 *                `canonical` de esa página, o el filtro decidirá sobre una ruta que no existe.
 */
export function soloIndexables<P>(params: readonly P[], ruta: (param: P) => string): P[] {
  return params.filter((param) => shouldIndex(ruta(param)))
}
