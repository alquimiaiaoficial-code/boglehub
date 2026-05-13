import { ParseResult } from './types'

export function parseGeneric(text: string): ParseResult {
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
    broker: 'UNKNOWN',
    warnings: ['Formato no reconocido. Detectamos ISINs pero las cantidades requieren revisión.'],
  }
}
