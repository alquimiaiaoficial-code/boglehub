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

  // Este test decía que VUSA cotiza en peniques y lo daba por bueno. No es así: en Londres
  // cotiza en libras (109,94 el 29-sep-2026), y el analizador lo dejaba 100 veces por debajo.
  // El caso de peniques se prueba con IUSA, que sí cotiza en peniques (5.776,25).
  it('converts GBp prices to EUR', async () => {
    mockQuote.mockImplementation(async (sym: string | string[]) => {
      if (Array.isArray(sym)) {
        return [{ symbol: 'IUSA.L', regularMarketPrice: 10000 }] // 100 GBP in pence
      }
      if (sym === 'EURUSD=X') return { regularMarketPrice: 1.08 }
      if (sym === 'EURGBP=X') return { regularMarketPrice: 0.85 }
      return null
    })
    const result = await fetchPrices(['IUSA'])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.IUSA).toBeCloseTo(100 / 0.85)
  })

  it('VUSA, VUKE y VWRL cotizan en libras, no en peniques', async () => {
    mockQuote.mockImplementation(async (sym: string | string[]) => {
      if (Array.isArray(sym)) {
        return [
          { symbol: 'VUSA.L', regularMarketPrice: 110 },
          { symbol: 'VUKE.L', regularMarketPrice: 46 },
          { symbol: 'VWRL.L', regularMarketPrice: 140 },
        ]
      }
      if (sym === 'EURUSD=X') return { regularMarketPrice: 1.08 }
      if (sym === 'EURGBP=X') return { regularMarketPrice: 0.85 }
      return null
    })
    const result = await fetchPrices(['VUSA', 'VUKE', 'VWRL'])
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.VUSA).toBeCloseTo(110 / 0.85)
      expect(result.value.VUKE).toBeCloseTo(46 / 0.85)
      expect(result.value.VWRL).toBeCloseTo(140 / 0.85)
    }
  })

  it('IWDA en Ámsterdam cotiza en euros: vale lo mismo que EUNL, que es el mismo fondo', async () => {
    mockQuote.mockImplementation(async (sym: string | string[]) => {
      if (Array.isArray(sym)) {
        return [
          { symbol: 'IWDA.AS', regularMarketPrice: 128.7 },
          { symbol: 'EUNL.DE', regularMarketPrice: 128.705 },
        ]
      }
      if (sym === 'EURUSD=X') return { regularMarketPrice: 1.13 }
      if (sym === 'EURGBP=X') return { regularMarketPrice: 0.85 }
      return null
    })
    const result = await fetchPrices(['IWDA', 'EUNL'])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.IWDA).toBeCloseTo(result.value.EUNL, 1)
  })

  it('IMEU cotiza en peniques: 3.410 peniques no son 3.410 euros', async () => {
    mockQuote.mockImplementation(async (sym: string | string[]) => {
      if (Array.isArray(sym)) return [{ symbol: 'IMEU.L', regularMarketPrice: 3410 }]
      if (sym === 'EURUSD=X') return { regularMarketPrice: 1.08 }
      if (sym === 'EURGBP=X') return { regularMarketPrice: 0.85 }
      return null
    })
    const result = await fetchPrices(['IMEU'])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.IMEU).toBeCloseTo(34.1 / 0.85)
  })

  it('returns error on fetch failure', async () => {
    mockQuote.mockRejectedValueOnce(new Error('Network'))
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(false)
  })
})
