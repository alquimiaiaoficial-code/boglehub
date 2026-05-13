import { Region, AssetClass, Sector } from './etf'

export interface AllocationBreakdown {
  byAssetClass: Record<AssetClass, number>
  byRegion: Record<Region, number>
  bySector: Partial<Record<Sector, number>>
  byCurrency: Record<'EUR' | 'USD' | 'GBP', number>
  weightedTER: number
  totalValueEUR: number
}

export interface FireProjection {
  currentValue: number
  monthlyContribution: number
  targetAmount: number
  yearsToFire: number
  expectedAnnualReturn: number
}

export interface Analysis {
  allocation: AllocationBreakdown
  fire?: FireProjection
  aiNarrative: string
  warnings: string[]
}

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }
