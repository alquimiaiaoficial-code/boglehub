import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchPrices } from './prices'

global.fetch = vi.fn() as unknown as typeof fetch

beforeEach(() => {
  vi.resetAllMocks()
})

describe('fetchPrices', () => {
  it('returns empty map for empty ticker list', async () => {
    const result = await fetchPrices([])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value).toEqual({})
  })

  it('returns price map for valid tickers', async () => {
    ;(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        quoteResponse: { result: [{ symbol: 'VWCE.DE', regularMarketPrice: 110.5 }] },
      }),
    })
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.VWCE).toBeCloseTo(110.5)
  })

  it('returns error result on fetch failure', async () => {
    ;(global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network'))
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(false)
  })

  it('returns error on non-ok response', async () => {
    ;(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false, status: 503,
    })
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(false)
  })
})
