import { ParseResult } from './types'

export function parseDegiroPdf(text: string): ParseResult {
  const ISIN_PATTERN = /\b([A-Z]{2}[A-Z0-9]{9}[0-9])\b/g
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const positions: ParseResult['positions'] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isinMatches = [...line.matchAll(ISIN_PATTERN)]
    for (const m of isinMatches) {
      const isin = m[1]
      const context = lines.slice(i, i + 2).join(' ')
      const nums = [...context.matchAll(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)/g)]
        .map(x => parseFloat(x[1].replace(/\./g, '').replace(',', '.')))
        .filter(n => !isNaN(n) && n > 0)

      if (nums.length >= 2) {
        positions.push({
          ticker: isin.slice(0, 5).toUpperCase(),
          isin,
          shares: nums[0] ?? 0,
          avgPrice: nums[1] ?? 0,
          confidence: 'low',
        })
      }
    }
  }

  return {
    positions,
    broker: 'DEGIRO',
    warnings: positions.length === 0
      ? ['No se detectaron posiciones automáticamente. Recomendamos descargar el CSV de DEGIRO.']
      : ['Detección DEGIRO en beta. Revisa las posiciones antes de importar.'],
  }
}
