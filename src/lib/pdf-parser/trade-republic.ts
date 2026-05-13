import { ParseResult } from './types'

const ISIN_PATTERN = /\b([A-Z]{2}[A-Z0-9]{9}[0-9])\b/g

export function parseTradeRepublic(text: string): ParseResult {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const positions: ParseResult['positions'] = []
  const warnings: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isinMatches = [...line.matchAll(ISIN_PATTERN)]

    for (const m of isinMatches) {
      const isin = m[1]
      const context = lines.slice(Math.max(0, i - 1), i + 3).join(' ')
      const nums = [...context.matchAll(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)/g)]
        .map(m => parseFloat(m[1].replace(/\./g, '').replace(',', '.')))
        .filter(n => !isNaN(n) && n > 0)

      if (nums.length >= 2) {
        positions.push({
          ticker: isin.slice(0, 5).toUpperCase(),
          isin,
          shares: nums[0] ?? 0,
          avgPrice: nums[1] ?? 0,
          confidence: 'medium',
        })
      }
    }
  }

  if (positions.length === 0) {
    warnings.push('No se detectaron posiciones automáticamente. Introduce manualmente o reporta el formato.')
  }

  return { positions, broker: 'TRADE_REPUBLIC', warnings }
}
