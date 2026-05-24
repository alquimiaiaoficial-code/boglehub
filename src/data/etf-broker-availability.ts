/**
 * Mapeo de qué ETFs están disponibles en qué brokers,
 * con detalles operativos específicos (comisión, mercado de cotización, etc.).
 *
 * Usado para generar páginas /comprar/[ticker]/[broker] con guías
 * paso a paso de "cómo comprar X ETF en Y broker".
 */

export interface AvailabilityNote {
  available: boolean
  /** Comentario sobre disponibilidad o restricción */
  note?: string
  /** Mercado donde se opera más común */
  market?: string
  /** Comisión específica si difiere */
  customCommission?: string
}

/**
 * Tickers de ETFs que cubrimos con páginas programáticas
 * (los más buscados por inversores indexados españoles).
 */
export const POPULAR_ETF_TICKERS: string[] = [
  'VWCE', 'IWDA', 'CSPX', 'SWRD', 'EIMI', 'AGGH',
  'VUAA', 'EQQQ', 'SGLN', 'VHYL', 'ISAC', 'XDWD',
  'VEUR', 'VFEM', 'SXR8', 'VWRL', 'MWRD', 'CNDX',
  'IUSA', 'EUNA',
]

/**
 * Brokers que cubrimos con páginas de "dónde comprar".
 * Solo incluimos los que realmente soportan ETFs UCITS habituales.
 */
export const COVERED_BROKER_SLUGS: string[] = [
  'trade-republic',
  'degiro',
  'myinvestor',
  'xtb',
  'interactive-brokers',
]

/**
 * Para cada par (ticker, broker) podemos sobrescribir el comportamiento
 * por defecto si hay restricciones específicas. La mayoría de ETFs UCITS
 * populares están disponibles en todos los brokers cubiertos.
 */
export const ETF_BROKER_OVERRIDES: Record<string, Record<string, AvailabilityNote>> = {
  // Ejemplo: si algún ETF no está en algún broker concreto.
  // Por defecto asumimos available: true para todas las combinaciones.
}

export function getAvailability(ticker: string, brokerSlug: string): AvailabilityNote {
  const override = ETF_BROKER_OVERRIDES[ticker]?.[brokerSlug]
  if (override) return override
  return { available: true }
}
