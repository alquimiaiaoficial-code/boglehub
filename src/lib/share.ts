import { Position } from '@/types/portfolio'

// Compact wire format for sharing a portfolio in a URL.
interface SharePosition {
  t: string // ticker
  s: number // shares
  p: number // avgPrice
  c: string // currency
}

/** Encodes a portfolio into a URL-safe base64 string. */
export function encodePortfolio(positions: Position[]): string {
  const compact: SharePosition[] = positions.map((p) => ({
    t: p.ticker,
    s: p.shares,
    p: p.avgPrice,
    c: p.currency,
  }))
  const json = JSON.stringify(compact)
  return btoa(encodeURIComponent(json))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/** Decodes a shared portfolio string back into positions. Returns null if invalid. */
export function decodePortfolio(encoded: string): Position[] | null {
  try {
    const b64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(atob(b64))
    const compact = JSON.parse(json)
    if (!Array.isArray(compact) || compact.length === 0 || compact.length > 50) return null

    const positions: Position[] = compact.map((c: SharePosition) => {
      const currency = c.c === 'USD' || c.c === 'GBP' ? c.c : 'EUR'
      return {
        id: crypto.randomUUID(),
        ticker: String(c.t).toUpperCase().slice(0, 10),
        shares: Number(c.s),
        avgPrice: Number(c.p),
        currency,
        addedAt: new Date().toISOString(),
      }
    })

    // Reject if any position has invalid numbers.
    if (positions.some((p) => !p.ticker || !Number.isFinite(p.shares) || p.shares <= 0)) {
      return null
    }

    return positions
  } catch {
    return null
  }
}
