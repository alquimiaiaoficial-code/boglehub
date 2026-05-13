import { Position } from '@/types/portfolio'
import { AllocationBreakdown } from '@/types/analysis'
import { Region, AssetClass, Sector, Currency } from '@/types/etf'
import { getEtfByTicker } from './etf-database'

function emptyAllocation(): AllocationBreakdown {
  return {
    byAssetClass: {} as Record<AssetClass, number>,
    byRegion: {} as Record<Region, number>,
    bySector: {},
    byCurrency: { EUR: 0, USD: 0, GBP: 0 } as Record<Currency, number>,
    weightedTER: 0,
    totalValueEUR: 0,
  }
}

export function calculateAllocation(
  positions: Position[],
  prices: Record<string, number>,
): AllocationBreakdown {
  const result = emptyAllocation()
  if (positions.length === 0) return result

  const positionValues = positions.map(pos => {
    const price = prices[pos.ticker.toUpperCase()] ?? 0
    return { pos, value: pos.shares * price }
  })

  const totalValue = positionValues.reduce((sum, p) => sum + p.value, 0)
  result.totalValueEUR = totalValue
  if (totalValue === 0) return result

  let weightedTerSum = 0

  for (const { pos, value } of positionValues) {
    const weight = value / totalValue
    const etf = getEtfByTicker(pos.ticker)

    result.byCurrency[pos.currency] = (result.byCurrency[pos.currency] ?? 0) + weight

    if (!etf) continue

    result.byAssetClass[etf.assetClass] = (result.byAssetClass[etf.assetClass] ?? 0) + weight

    for (const [region, regionWeight] of Object.entries(etf.regionAllocation) as [Region, number][]) {
      if (regionWeight > 0) {
        result.byRegion[region] = (result.byRegion[region] ?? 0) + weight * regionWeight
      }
    }

    if (etf.sectorAllocation) {
      for (const [sector, sectorWeight] of Object.entries(etf.sectorAllocation) as [Sector, number][]) {
        if (sectorWeight > 0) {
          result.bySector[sector] = (result.bySector[sector] ?? 0) + weight * sectorWeight
        }
      }
    }

    weightedTerSum += weight * etf.ter
  }

  result.weightedTER = weightedTerSum
  return result
}
