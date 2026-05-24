/**
 * Pares de brokers para comparativas head-to-head /vs-broker/[a]/[b].
 * Solo los pares con búsqueda real en español.
 */

export const BROKER_PAIRS: [string, string][] = [
  ['trade-republic', 'degiro'],
  ['trade-republic', 'myinvestor'],
  ['trade-republic', 'xtb'],
  ['trade-republic', 'interactive-brokers'],
  ['trade-republic', 'scalable-capital'],
  ['degiro', 'myinvestor'],
  ['degiro', 'xtb'],
  ['degiro', 'interactive-brokers'],
  ['myinvestor', 'xtb'],
  ['myinvestor', 'renta-4'],
  ['myinvestor', 'openbank'],
  ['myinvestor', 'ing'],
  ['trade-republic', 'etoro'],
  ['xtb', 'etoro'],
  ['myinvestor', 'interactive-brokers'],
]

export function brokerPairToSlug(a: string, b: string): string {
  return `${a}-vs-${b}`
}

export function slugToBrokerPair(slug: string): [string, string] | null {
  const parts = slug.split('-vs-')
  if (parts.length !== 2) return null
  return [parts[0], parts[1]]
}
