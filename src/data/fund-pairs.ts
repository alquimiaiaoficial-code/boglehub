/**
 * Pares curados de fondos indexados para /comparar-fondo/[a]-vs-[b].
 * Solo pares con sentido (misma clase de activo o región comparable)
 * y con búsqueda real en español.
 */

export const FUND_PAIRS: [string, string][] = [
  ['amundi-prime-global', 'vanguard-global-stock'],
  // ⚠️ REVISAR LOS TEXTOS DE ESTOS DOS PARES (18-sep-2026). `fidelity-msci-world` es en
  // realidad un S&P 500 (IE00BYX5MX67), no un MSCI World. Las comparativas siguen siendo
  // utiles —global frente a solo EEUU es justo la duda que tiene la gente— pero se
  // redactaron creyendo que los dos lados replicaban el mismo indice, y eso ya no es cierto.
  ['amundi-prime-global', 'fidelity-msci-world'],
  ['vanguard-global-stock', 'fidelity-msci-world'],
  ['amundi-prime-usa', 'vanguard-us-500-stock'],
  ['amundi-index-msci-emerging-markets', 'vanguard-emerging-markets-stock'],
  ['amundi-index-msci-emerging-markets', 'fidelity-emerging-markets-index'],
  ['vanguard-emerging-markets-stock', 'fidelity-emerging-markets-index'],
  ['vanguard-global-bond-eur-hedged', 'amundi-index-eurozone-government-bond'],
  ['amundi-prime-global', 'amundi-prime-usa'],
  ['vanguard-global-stock', 'vanguard-us-500-stock'],
  ['amundi-prime-global', 'vanguard-us-500-stock'],
  ['vanguard-eurozone-stock', 'amundi-prime-global'],
]

export function fundPairToSlug(a: string, b: string): string {
  return `${a}-vs-${b}`
}

export function slugToFundPair(slug: string): [string, string] | null {
  const parts = slug.split('-vs-')
  if (parts.length !== 2) return null
  return [parts[0], parts[1]]
}
