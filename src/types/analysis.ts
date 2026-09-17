import { Region, AssetClass, Sector, Currency } from './etf'

export interface AllocationBreakdown {
  byAssetClass: Record<AssetClass, number>
  byRegion: Record<Region, number>
  bySector: Partial<Record<Sector, number>>
  byCurrency: Record<Currency, number>
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

/**
 * De dónde sale la exposición de un fondo indexado del análisis.
 *
 * Un fondo no publica aquí su reparto por región y sector, así que se toma el del ETF del
 * catálogo que replica el mismo índice. Esto se ENSEÑA siempre, fondo por fondo: el número
 * es correcto, pero se ha calculado con datos de otro producto y el usuario no puede
 * adivinarlo.
 */
export interface FuenteDeExposicion {
  fondo: string
  isin: string
  /** El TER del fondo, que NO es el del ETF del que se toma la exposición. */
  ter: number
  exposicionTomadaDe: string
  indiceDelFondo: string
  calidad: 'exacta' | 'aproximada'
  /** Obligatoria cuando la calidad es aproximada: en qué se aproxima. */
  nota?: string
}

export interface Analysis {
  allocation: AllocationBreakdown
  fire?: FireProjection
  aiNarrative: string
  warnings: string[]
  fuentesDeExposicion?: FuenteDeExposicion[]
}

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }
