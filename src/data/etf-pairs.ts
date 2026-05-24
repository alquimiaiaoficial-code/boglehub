/**
 * Pares de ETFs curados para las páginas /comparar/[pair].
 *
 * Criterio de selección: búsquedas reales en la comunidad española
 * (forobogleheads.es, r/SpainFIRE, X). Se incluyen también pares
 * "mismo fondo, distinto ticker" porque generan búsquedas reales y
 * confusión frecuente (CSPX vs SXR8, IWDA vs EUNL).
 *
 * Formato del slug: {tickerA}-vs-{tickerB} (siempre lowercase).
 * El orden dentro del par es siempre [más popular / más conocido] primero.
 */
export const ETF_PAIRS: [string, string][] = [
  // Comparativas más buscadas — renta variable global
  ['VWCE', 'CSPX'],
  ['VWCE', 'IWDA'],
  ['CSPX', 'IWDA'],
  ['VWCE', 'SWRD'],
  ['IWDA', 'SWRD'],
  ['VWCE', 'ISAC'],
  ['VWCE', 'VUAA'],
  ['CSPX', 'VUAA'],
  ['IWDA', 'VUSA'],
  ['VWCE', 'VWRP'],   // mismo fondo, distinta bolsa/moneda
  // Mismo fondo, distinto ticker (muy confusos para principiantes)
  ['CSPX', 'SXR8'],   // iShares S&P 500 — LSE vs Xetra
  ['IWDA', 'EUNL'],   // iShares MSCI World — USD vs EUR
  ['EIMI', 'EMIM'],   // iShares EM IMI — mismas participaciones
  // Alternativas MSCI World
  ['SWRD', 'XDWD'],
  ['IWDA', 'XDWD'],
  ['VUSA', 'VUAA'],
  ['CSPX', 'XDWD'],
  // Mercados emergentes
  ['EIMI', 'VFEM'],
  ['EMIM', 'VFEM'],
  // Europa
  ['VEUR', 'SMEA'],
  ['VEUR', 'MEUD'],
  ['SMEA', 'IMEU'],
  // Renta fija / bonos
  ['AGGH', 'VAGF'],
  ['AGGH', 'VETY'],
  ['VAGF', 'VGEA'],
  // Dividendo / distribución
  ['VHYL', 'TDIV'],
  ['VWRL', 'VHYL'],   // VWRL = VWCE distribución
  // Growth / temáticos vs global
  ['VWCE', 'EQQQ'],
  ['CSPX', 'EQQQ'],
  // Small caps
  ['WSML', 'IUSN'],
  ['WSML', 'ZPRV'],
  ['IUSN', 'ZPRS'],
  // Oro
  ['SGLN', 'IGLN'],
  ['SGLN', '4GLD'],
  ['IGLN', '4GLD'],
  // Nasdaq 100
  ['EQQQ', 'SXRV'],
  ['EQQQ', 'CNDX'],
  ['SXRV', 'CNDX'],
  ['EQQQ', 'CSPX'],   // Nasdaq vs S&P 500
  ['EQQQ', 'IWDA'],   // Nasdaq vs MSCI World
  // Factor: calidad y momentum
  ['IWQU', 'IWMO'],
  ['IWQU', 'IWDA'],   // quality vs MSCI World plain
  ['IWMO', 'IWDA'],   // momentum vs MSCI World plain
  ['XDEQ', 'IWQU'],
  ['XDWL', 'IWDA'],
  // Acumulación vs distribución (mismo fondo, distinta política)
  ['VWCE', 'VHYL'],   // acumulación global vs dividendos
  ['CSPX', 'VUSA'],   // S&P 500 acc vs dist
  ['IWDA', 'VWRL'],   // MSCI World acc vs All-World dist
  // EE.UU. value y growth
  ['ZPRV', 'CSPX'],   // small value vs S&P 500
  // Dividendos
  ['VHYL', 'FGEQ'],   // dividendos altos vs calidad
  ['TDIV', 'ISPA'],   // dividendos lideres vs aristócratas
  // Materias primas más allá de oro
  ['SGLN', 'EXSG'],   // oro vs commodities amplias
  // Renta fija extra
  ['VGOV', 'VGEA'],   // bonos gov UK vs eurozona
  ['IGLH', 'AGGH'],   // global hedged variantes
  ['EUNH', 'AGGH'],   // high yield hedged vs agregado
  // Robotic / temáticos
  ['RBOT', 'IQQH'],   // robotica vs hidrogeno (temáticos)
  ['EQQQ', 'RBOT'],   // Nasdaq tradicional vs robotica tematica
  // Japón
  ['SJPA', 'CPXJ'],   // Japón core vs Pacífico ex-Japón
]

/** Convierte un par a slug URL */
export function pairToSlug(a: string, b: string): string {
  return `${a.toLowerCase()}-vs-${b.toLowerCase()}`
}

/** Parsea un slug y devuelve los dos tickers en mayúsculas, o null si inválido */
export function slugToPair(slug: string): [string, string] | null {
  const parts = slug.split('-vs-')
  if (parts.length !== 2) return null
  const [a, b] = parts.map(s => s.toUpperCase())
  if (!a || !b || a === b) return null
  return [a, b]
}
