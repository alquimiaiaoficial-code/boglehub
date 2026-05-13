import { describe, it, expect } from 'vitest'
import { getEtfByTicker, searchEtfs } from './etf-database'

describe('ETF database', () => {
  it('returns metadata for known ticker VWCE', () => {
    const etf = getEtfByTicker('VWCE')
    expect(etf).toBeDefined()
    expect(etf?.assetClass).toBe('EQUITY')
    expect(etf?.ter).toBeLessThan(0.5)
  })

  it('returns null for unknown ticker', () => {
    expect(getEtfByTicker('ZZZZ')).toBeNull()
  })

  it('searches case-insensitively', () => {
    expect(getEtfByTicker('vwce')).not.toBeNull()
  })

  it('searchEtfs returns matches by name', () => {
    const results = searchEtfs('world')
    expect(results.length).toBeGreaterThan(0)
  })
})
