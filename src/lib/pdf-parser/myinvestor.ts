import { ParseResult } from './types'

export function parseMyInvestor(text: string): ParseResult {
  const ISIN_PATTERN = /\b([A-Z]{2}[A-Z0-9]{9}[0-9])\b/g
  const matches = [...text.matchAll(ISIN_PATTERN)]
  const positions: ParseResult['positions'] = matches.map(m => ({
    ticker: m[1].slice(0, 5).toUpperCase(),
    isin: m[1],
    shares: 0,
    avgPrice: 0,
    confidence: 'low',
  }))

  return {
    positions,
    broker: 'MYINVESTOR',
    warnings: ['Detección MyInvestor en beta. Las cantidades requieren revisión manual.'],
  }
}
