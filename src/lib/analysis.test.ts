import { describe, it, expect } from 'vitest'
import { calculateAllocation } from './analysis'
import { Position } from '@/types/portfolio'

const VWCE_PRICE = 110
const CSPX_PRICE = 500

const positions: Position[] = [
  { id: '1', ticker: 'VWCE', shares: 100, avgPrice: 100, currency: 'EUR', addedAt: '2024-01-01T00:00:00Z' },
  { id: '2', ticker: 'CSPX', shares: 10, avgPrice: 450, currency: 'EUR', addedAt: '2024-01-01T00:00:00Z' },
]

const prices = { VWCE: VWCE_PRICE, CSPX: CSPX_PRICE }

describe('calculateAllocation', () => {
  it('computes total portfolio value in EUR', () => {
    const result = calculateAllocation(positions, prices)
    expect(result.totalValueEUR).toBeCloseTo(100 * 110 + 10 * 500, 2)
  })

  it('100% EQUITY when only equity ETFs', () => {
    const result = calculateAllocation(positions, prices)
    expect(result.byAssetClass.EQUITY).toBeCloseTo(1.0, 4)
  })

  it('weighted TER averages correctly', () => {
    const result = calculateAllocation(positions, prices)
    const vwceVal = 100 * 110
    const cspxVal = 10 * 500
    const total = vwceVal + cspxVal
    const expectedTer = (vwceVal * 0.22 + cspxVal * 0.07) / total
    expect(result.weightedTER).toBeCloseTo(expectedTer, 4)
  })

  it('region allocation reflects ETF weights', () => {
    const result = calculateAllocation(positions, prices)
    expect(result.byRegion.US).toBeGreaterThan(0.5)
  })

  it('handles unknown ticker gracefully', () => {
    const bad: Position[] = [
      { id: '1', ticker: 'UNKNOWN', shares: 1, avgPrice: 100, currency: 'EUR', addedAt: '2024-01-01T00:00:00Z' },
    ]
    const result = calculateAllocation(bad, { UNKNOWN: 100 })
    expect(result.totalValueEUR).toBe(100)
    expect(result.byAssetClass.EQUITY ?? 0).toBe(0)
  })

  it('returns empty allocation for empty positions', () => {
    const result = calculateAllocation([], {})
    expect(result.totalValueEUR).toBe(0)
  })
})
