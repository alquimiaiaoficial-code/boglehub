import { Position } from '@/types/portfolio'
import { Region } from '@/types/etf'
import { getEtfByTicker } from './etf-database'

export interface OverlapPair {
  tickerA: string
  tickerB: string
  /** 0-1: shared geographic exposure between the two ETFs. */
  overlapPct: number
}

/**
 * Computes the geographic overlap between every pair of ETFs in the portfolio.
 *
 * Overlap = Σ min(regionWeight_A, regionWeight_B) across all regions. Two
 * near-identical world ETFs score ~1.0; a world equity ETF paired with a bond
 * ETF scores near 0. It is a proxy for "am I buying the same thing twice?".
 */
export function computeOverlaps(positions: Position[]): OverlapPair[] {
  const etfs = positions
    .map((p) => getEtfByTicker(p.ticker))
    .filter((e): e is NonNullable<ReturnType<typeof getEtfByTicker>> => e !== null)

  const pairs: OverlapPair[] = []

  for (let i = 0; i < etfs.length; i++) {
    for (let j = i + 1; j < etfs.length; j++) {
      const a = etfs[i]
      const b = etfs[j]
      let overlap = 0
      const regions = Object.keys(a.regionAllocation) as Region[]
      for (const region of regions) {
        overlap += Math.min(a.regionAllocation[region] ?? 0, b.regionAllocation[region] ?? 0)
      }
      pairs.push({ tickerA: a.ticker, tickerB: b.ticker, overlapPct: overlap })
    }
  }

  return pairs.sort((x, y) => y.overlapPct - x.overlapPct)
}
