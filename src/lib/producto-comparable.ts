import { getAllEtfs, getEtfByTicker } from './etf-database'
import { resolverFondo } from './fondos-analizables'
import { esEtc, politicaDeReparto } from './fiscal'
import type { AssetClass, EtfMetadata, Region } from '@/types/etf'

/**
 * Lo que el comparador necesita saber de un producto, venga de donde venga (29-sep-2026).
 *
 * El comparador solo conocía ETFs. Desde que usa el mismo desplegable que el analizador
 * (`SelectorProducto`), también se pueden elegir fondos indexados y sus clases, y para
 * compararlos hace falta lo mismo que en el analizador:
 *
 *  · la COMISIÓN, la política de reparto y la divisa son las del fondo o de la clase,
 *    nunca las del ETF del que se toma la exposición;
 *  · la EXPOSICIÓN por región es la del ETF de su catálogo que replica el mismo índice, y
 *    cuando el índice es solo parecido se dice («aproximada»), igual que en el analizador;
 *  · un fondo que reconocemos pero no analizamos no se compara: se dice por qué.
 *
 * Y la fila que más pesa en España: un fondo se puede traspasar a otro sin tributar (art.
 * 94.1.a de la Ley del IRPF) y un ETF no.
 */

export type TipoProducto = 'ETF' | 'ETC' | 'Fondo indexado'

export interface ProductoComparable {
  estado: 'ok'
  /** Lo que se ve en cabeceras: el ticker de un ETF o el ISIN de un fondo. */
  clave: string
  nombre: string
  isin?: string
  tipo: TipoProducto
  ter: number
  claseActivo: AssetClass
  divisa: string
  reparto: string
  traspasoSinTributar: boolean
  regiones: Partial<Record<Region, number>>
  /** De dónde sale la exposición, cuando no es la del propio producto. */
  notaExposicion?: string
}

export interface ProductoNoComparable {
  estado: 'noAnalizable'
  clave: string
  nombre: string
  motivo: string
}

function desdeEtf(e: EtfMetadata): ProductoComparable {
  return {
    estado: 'ok',
    clave: e.ticker,
    nombre: e.name,
    isin: e.isin,
    tipo: esEtc(e) ? 'ETC' : 'ETF',
    ter: e.ter,
    claseActivo: e.assetClass,
    divisa: e.baseCurrency,
    reparto: politicaDeReparto(e).largo,
    traspasoSinTributar: false,
    regiones: e.regionAllocation,
  }
}

/**
 * Convierte lo escrito o elegido (ticker o ISIN) en un producto comparable. `null` si no lo
 * reconocemos.
 */
export function resolverProducto(entrada: string): ProductoComparable | ProductoNoComparable | null {
  const valor = entrada.trim().toUpperCase()
  if (!valor) return null

  const fondo = resolverFondo(valor)
  if (fondo) {
    if ('noAnalizable' in fondo) {
      const n = fondo.noAnalizable
      return { estado: 'noAnalizable', clave: n.isin, nombre: n.nombre, motivo: n.motivo }
    }
    const { fondo: f, etfExposicion: etf, calidad, nota } = fondo.analizable
    return {
      estado: 'ok',
      clave: f.isin,
      nombre: f.name,
      isin: f.isin,
      tipo: 'Fondo indexado',
      ter: f.ter,
      claseActivo: etf.assetClass,
      divisa: f.currency,
      reparto: f.accumulating ? 'Acumulación' : 'Distribución',
      traspasoSinTributar: true,
      regiones: etf.regionAllocation,
      notaExposicion:
        calidad === 'exacta'
          ? `El reparto por región es el de ${etf.ticker}, que replica el mismo índice.`
          : `El reparto por región es aproximado: se toma de ${etf.ticker}, que replica un índice parecido pero no el mismo.${nota ? ` ${nota}` : ''}`,
    }
  }

  const etf = getEtfByTicker(valor) ?? getAllEtfs().find((e) => e.isin?.toUpperCase() === valor) ?? null
  return etf ? desdeEtf(etf) : null
}

/**
 * Solapamiento por región: Σ min(peso A, peso B). Mide si se compra dos veces la misma
 * exposición geográfica, no empresas en común (no tenemos las carteras internas).
 */
export function solapamientoPorRegion(a: ProductoComparable, b: ProductoComparable): number {
  let total = 0
  const regiones = new Set([...Object.keys(a.regiones), ...Object.keys(b.regiones)]) as Set<Region>
  for (const r of regiones) total += Math.min(a.regiones[r] ?? 0, b.regiones[r] ?? 0)
  return Math.round(total * 100)
}
