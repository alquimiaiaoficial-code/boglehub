/**
 * Pares curados de fondos indexados para /comparar-fondo/[a]-vs-[b].
 * Solo pares con sentido (misma clase de activo o región comparable)
 * y con búsqueda real en español.
 */

export const FUND_PAIRS: [string, string][] = [
  // ⚠️ REVISAR LOS TEXTOS DE ESTOS DOS PARES (18-sep-2026). `fidelity-sp500` (antes `fidelity-msci-world`) es en
  // realidad un S&P 500 (IE00BYX5MX67), no un MSCI World. Las comparativas siguen siendo
  // utiles —global frente a solo EEUU es justo la duda que tiene la gente— pero se
  // redactaron creyendo que los dos lados replicaban el mismo indice, y eso ya no es cierto.
  ['vanguard-global-stock', 'fidelity-sp500'],
  ['amundi-index-msci-emerging-markets', 'vanguard-emerging-markets-stock'],
  ['amundi-index-msci-emerging-markets', 'fidelity-emerging-markets-index'],
  ['vanguard-emerging-markets-stock', 'fidelity-emerging-markets-index'],
  ['vanguard-global-bond-eur-hedged', 'amundi-index-eurozone-government-bond'],
  ['vanguard-global-stock', 'vanguard-us-500-stock'],
]

export function fundPairToSlug(a: string, b: string): string {
  return `${a}-vs-${b}`
}

export function slugToFundPair(slug: string): [string, string] | null {
  const parts = slug.split('-vs-')
  if (parts.length !== 2) return null
  return [parts[0], parts[1]]
}
