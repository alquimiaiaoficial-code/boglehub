import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchPrices } from './prices'

global.fetch = vi.fn() as unknown as typeof fetch

const mockFetch = () => global.fetch as unknown as ReturnType<typeof vi.fn>

// Helper: mock the FX rate response
const fxMockResponse = {
  ok: true,
  json: async () => ({
    quoteResponse: {
      result: [
        { symbol: 'EURUSD=X', regularMarketPrice: 1.10 },
        { symbol: 'EURGBP=X', regularMarketPrice: 0.86 },
      ],
    },
  }),
}

beforeEach(() => {
  vi.resetAllMocks()
})

describe('fetchPrices', () => {
  it('returns empty map for empty ticker list', async () => {
    const result = await fetchPrices([])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value).toEqual({})
  })

  it('returns EUR price unchanged for EUR-quoted ticker (VWCE)', async () => {
    // fetchPrices runs Promise.all([priceFetch, fxFetch]) — both resolve in parallel
    mockFetch()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          quoteResponse: { result: [{ symbol: 'VWCE.DE', regularMarketPrice: 110.5 }] },
        }),
      })
      .mockResolvedValueOnce(fxMockResponse)
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.VWCE).toBeCloseTo(110.5) // EUR → no conversion
  })

  it('converts GBp-quoted ticker to EUR (VUSA)', async () => {
    // VUSA is quoted in GBp (pence); with GBP/EUR rate of 0.86, 820 GBp = (8.20 GBP) / 0.86 ≈ 9.535 EUR
    mockFetch()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          quoteResponse: { result: [{ symbol: 'VUSA.L', regularMarketPrice: 820 }] },
        }),
      })
      .mockResolvedValueOnce(fxMockResponse)
    const result = await fetchPrices(['VUSA'])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.VUSA).toBeCloseTo((820 / 100) / 0.86, 4)
  })

  it('returns error result on fetch failure', async () => {
    mockFetch().mockRejectedValueOnce(new Error('Network'))
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(false)
  })

  it('returns error on non-ok price response', async () => {
    mockFetch()
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce(fxMockResponse)
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(false)
  })
})
