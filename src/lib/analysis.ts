import { Position } from '@/types/portfolio'
import { AllocationBreakdown } from '@/types/analysis'
import { Region, AssetClass, Sector, Currency } from '@/types/etf'
import { getEtfByTicker } from './etf-database'
import type { FondoAnalizable } from './fondos-analizables'

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

/**
 * Calcula el reparto de la cartera.
 *
 * `fondos` mapea el identificador tal como lo escribió el usuario —en mayúsculas— al fondo
 * indexado resuelto. Es lo que permite analizar fondos, que hasta el 17-sep-2026 no se
 * leían, y lo hace tomando prestado el reparto por región y sector del ETF que replica el
 * mismo índice. Ver `fondos-analizables.ts` para por qué eso es legítimo y cuándo no lo es.
 *
 * Dos cosas del fondo NO se toman del ETF, y son justo las que importan:
 *  · el **TER**, que es el del fondo. IWDA cuesta 0,20 % y el Vanguard Global Stock que usa
 *    su misma exposición cuesta 0,18 %: colar el del ETF encarecería la cartera en pantalla.
 *  · el `assetClass` sí se toma del ETF, a propósito: el del fondo es otra enumeración y
 *    mezclarlas rompería el desglose. Para renta variable y renta fija coinciden.
 *
 * Sobre el precio de un fondo: no cotiza, así que no hay precio de mercado. Quien llama
 * pasa el importe en euros como `shares` y un precio de 1, que es lo único honesto — un
 * euro vale un euro— y es además el dato que el inversor tiene delante en su plataforma.
 */
export function calculateAllocation(
  positions: Position[],
  prices: Record<string, number>,
  fondos?: ReadonlyMap<string, FondoAnalizable>,
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
    const fondo = fondos?.get(pos.ticker.toUpperCase())
    // Para un fondo, el reparto sale del ETF que replica su mismo índice; el TER, del fondo.
    const etf = fondo ? fondo.etfExposicion : getEtfByTicker(pos.ticker)
    const ter = fondo ? fondo.fondo.ter : etf?.ter

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

    weightedTerSum += weight * (ter ?? etf.ter)
  }

  result.weightedTER = weightedTerSum
  return result
}
