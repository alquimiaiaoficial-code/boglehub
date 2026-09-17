import { Position } from '@/types/portfolio'
import { Region } from '@/types/etf'
import { getEtfByTicker } from './etf-database'
import { resolverFondo } from './fondos-analizables'
import { tipoDePar, type TipoDePar } from './traspaso-fiscal'

export interface OverlapPair {
  tickerA: string
  tickerB: string
  /** 0-1: exposición geográfica compartida entre los dos productos. */
  overlapPct: number
  /** Nombre legible. Para un ETF es su ticker; para un fondo, su nombre. */
  etiquetaA: string
  etiquetaB: string
  /**
   * De qué está hecho el par. Es lo que decide qué cuesta deshacer el solapamiento en
   * España, y por tanto la mitad de la respuesta útil. Ver `traspaso-fiscal.ts`.
   */
  tipo: TipoDePar
}

/** Lo que hace falta de cada posición para compararla con otra. */
interface Comparable {
  clave: string
  etiqueta: string
  esFondo: boolean
  regionAllocation: Partial<Record<Region, number>>
}

/**
 * Convierte posiciones en comparables, resolviendo TAMBIÉN los fondos indexados.
 *
 * Aquí estaba el agujero del 17-sep-2026. Ese día el analizador empezó a leer fondos, pero
 * esta función seguía filtrando con `getEtfByTicker`, que para un fondo devuelve `null`. O
 * sea que los fondos entraban en el reparto por región y en el TER, **y quedaban fuera del
 * solapamiento**, que es la función por la que existe la herramienta.
 *
 * El caso que lo vuelve grave: quien pegara el Vanguard Global Stock y el Fidelity MSCI
 * World —dos fondos que replican el MISMO índice, o sea solapamiento del 100 %— no veía
 * ningún aviso. El componente se oculta cuando no hay pares, así que no salía ni un mensaje
 * de error: salía nada, y de nada se concluye que no hay problema.
 *
 * Es el mismo patrón que el análisis a cero de esa misma noche: **cuando se añade un tipo de
 * producto hay que recorrer todos los consumidores, no solo el principal.**
 */
function comparables(positions: Position[]): Comparable[] {
  const salida: Comparable[] = []
  for (const p of positions) {
    const etf = getEtfByTicker(p.ticker)
    if (etf) {
      salida.push({
        clave: etf.ticker,
        etiqueta: etf.ticker,
        esFondo: false,
        regionAllocation: etf.regionAllocation,
      })
      continue
    }
    const fondo = resolverFondo(p.ticker)
    // Un fondo que a propósito no se analiza tampoco entra en el solapamiento: no tenemos
    // exposición fiable con la que compararlo, y meterlo con datos flojos sería peor que
    // dejarlo fuera. El aviso de que se queda fuera lo da `api/analyze`.
    if (fondo && 'analizable' in fondo) {
      salida.push({
        clave: fondo.analizable.fondo.isin,
        etiqueta: fondo.analizable.fondo.name,
        esFondo: true,
        regionAllocation: fondo.analizable.etfExposicion.regionAllocation,
      })
    }
  }
  return salida
}

/**
 * Calcula el solapamiento geográfico entre cada par de productos de la cartera.
 *
 * Solapamiento = Σ min(peso_región_A, peso_región_B) sobre todas las regiones. Dos productos
 * mundiales casi idénticos dan ~1,0; renta variable mundial frente a renta fija, casi 0. Es
 * un indicio de «estoy comprando dos veces lo mismo», NO una medida de empresas repetidas:
 * para eso harían falta datos de participaciones que esta herramienta no tiene.
 */
export function computeOverlaps(positions: Position[]): OverlapPair[] {
  const items = comparables(positions)
  const pairs: OverlapPair[] = []

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i]
      const b = items[j]
      let overlap = 0
      const regiones = new Set<Region>([
        ...(Object.keys(a.regionAllocation) as Region[]),
        ...(Object.keys(b.regionAllocation) as Region[]),
      ])
      for (const region of regiones) {
        overlap += Math.min(a.regionAllocation[region] ?? 0, b.regionAllocation[region] ?? 0)
      }
      pairs.push({
        tickerA: a.clave,
        tickerB: b.clave,
        overlapPct: overlap,
        etiquetaA: a.etiqueta,
        etiquetaB: b.etiqueta,
        tipo: tipoDePar(a.esFondo, b.esFondo),
      })
    }
  }

  return pairs.sort((x, y) => y.overlapPct - x.overlapPct)
}
