import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockQuote = vi.hoisted(() => vi.fn())

vi.mock('yahoo-finance2', () => {
  class MockYahooFinance {
    quote = mockQuote
  }
  return { default: MockYahooFinance }
})

import { fetchPrices, resetPriceCache } from './prices'

beforeEach(() => {
  mockQuote.mockReset()
  resetPriceCache()
})

describe('fetchPrices', () => {
  it('returns empty map for empty ticker list', async () => {
    const result = await fetchPrices([])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value).toEqual({})
  })

  it('returns price map for valid EUR ticker', async () => {
    mockQuote.mockImplementation(async (sym: string | string[]) => {
      if (Array.isArray(sym)) {
        return [{ symbol: 'VWCE.DE', regularMarketPrice: 110.5 }]
      }
      if (sym === 'EURUSD=X') return { regularMarketPrice: 1.08 }
      if (sym === 'EURGBP=X') return { regularMarketPrice: 0.85 }
      return null
    })
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.VWCE).toBeCloseTo(110.5)
  })

  it('converts GBp prices to EUR', async () => {
    mockQuote.mockImplementation(async (sym: string | string[]) => {
      if (Array.isArray(sym)) {
        return [{ symbol: 'VUSA.L', regularMarketPrice: 10000 }] // 100 GBP in pence
      }
      if (sym === 'EURUSD=X') return { regularMarketPrice: 1.08 }
      if (sym === 'EURGBP=X') return { regularMarketPrice: 0.85 }
      return null
    })
    const result = await fetchPrices(['VUSA'])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.VUSA).toBeCloseTo(100 / 0.85)
  })

  it('returns error on fetch failure', async () => {
    mockQuote.mockRejectedValueOnce(new Error('Network'))
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(false)
  })
})
