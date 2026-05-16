import { describe, it, expect } from 'vitest'
import { computeOverlaps } from './overlap'
import { Position } from '@/types/portfolio'

function pos(ticker: string): Position {
  return {
    id: ticker,
    ticker,
    shares: 10,
    avgPrice: 100,
    currency: 'EUR',
    addedAt: '2024-01-01T00:00:00Z',
  }
}

describe('computeOverlaps', () => {
  it('returns no pairs for fewer than two known ETFs', () => {
    expect(computeOverlaps([pos('VWCE')])).toHaveLength(0)
    expect(computeOverlaps([])).toHaveLength(0)
  })

  it('returns one pair for two ETFs', () => {
    const result = computeOverlaps([pos('VWCE'), pos('CSPX')])
    expect(result).toHaveLength(1)
    expect(result[0].overlapPct).toBeGreaterThanOrEqual(0)
    expect(result[0].overlapPct).toBeLessThanOrEqual(1)
  })

  it('two world-equity ETFs overlap more than an equity + bond pair', () => {
    const equityPair = computeOverlaps([pos('VWCE'), pos('IWDA')])
    const equityBond = computeOverlaps([pos('VWCE'), pos('AGGH')])
    expect(equityPair[0].overlapPct).toBeGreaterThan(equityBond[0].overlapPct)
  })

  it('ignores unknown tickers gracefully', () => {
    const result = computeOverlaps([pos('VWCE'), pos('NOTREAL')])
    expect(result).toHaveLength(0)
  })

  it('sorts pairs by descending overlap', () => {
    const result = computeOverlaps([pos('VWCE'), pos('CSPX'), pos('AGGH')])
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].overlapPct).toBeGreaterThanOrEqual(result[i].overlapPct)
    }
  })
})
