import { INDEX_FUNDS } from '@/data/index-funds'
import { FUND_CLASSES } from '@/data/fund-classes'
import { getAllEtfs } from './etf-database'
import { resolverFondo } from './fondos-analizables'

/**
 * El catálogo entero para el desplegable del analizador (28-sep-2026).
 *
 * Por qué una lista completa y no un buscador que espera a que escribas. El buscador anterior
 * no enseñaba nada hasta la segunda letra, cortaba en ocho resultados y no conocía las clases
 * de participación ni los ISIN de los ETF. O sea que nadie podía saber qué reconocemos sin
 * adivinarlo antes, y quien pegaba el ISIN de una clase que SÍ analizamos no veía ninguna
 * sugerencia. Es el mismo dolor que contaban en el foro: «mi hoja no reconoce la clase S».
 *
 * Ahora, al pinchar el campo, sale todo: fondos, clases y ETFs. Cada palabra que se escribe
 * estrecha la lista, y se busca en el nombre, el ISIN, el ticker, la gestora, el índice y, en
 * los fondos, la región.
 */

export interface OpcionProducto {
  /** Lo que se mete en el campo al elegirla: ticker para un ETF, ISIN para un fondo o clase. */
  valor: string
  etiqueta: string
  detalle: string
  tipo: 'fondo' | 'etf'
  /** Un fondo que reconocemos pero no analizamos, con su motivo en la ficha. */
  noAnalizable?: boolean
  /** Texto donde se busca, sin tildes y en minúsculas. */
  busqueda: string
}

/** Sin tildes y en minúsculas, para que «pacifico» encuentre «Pacífico». */
export function normalizarBusqueda(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

const pct = (n: number) => `${n.toFixed(2).replace('.', ',')} %`

function opcionDeFondo(isin: string, ter: number, gestora: string, indice: string, region: string): OpcionProducto | null {
  const r = resolverFondo(isin)
  if (!r) return null
  const nombre = 'analizable' in r ? r.analizable.fondo.name : r.noAnalizable.nombre
  return {
    valor: isin,
    etiqueta: nombre,
    detalle: `Fondo · ${indice} · ${pct(ter)} · ${isin}`,
    tipo: 'fondo',
    ...('noAnalizable' in r ? { noAnalizable: true } : {}),
    // La región va en español («Japón», «Emergentes», «Pacífico sin Japón») porque los nombres de
    // los fondos están en inglés y la gente busca como habla.
    busqueda: normalizarBusqueda([nombre, isin, gestora, indice, region].join(' ')),
  }
}

export function catalogoSelector(): OpcionProducto[] {
  const fondos: OpcionProducto[] = []
  for (const f of INDEX_FUNDS) {
    const o = opcionDeFondo(f.isin, f.ter, f.manager, f.index, f.region)
    if (o) fondos.push(o)
  }
  for (const c of FUND_CLASSES) {
    const padre = INDEX_FUNDS.find((f) => f.slug === c.parentSlug)
    if (!padre) continue
    const o = opcionDeFondo(c.isin, c.ter, padre.manager, padre.index, padre.region)
    if (o) fondos.push(o)
  }
  fondos.sort((a, b) => a.etiqueta.localeCompare(b.etiqueta, 'es'))

  const etfs: OpcionProducto[] = getAllEtfs()
    .map((e) => ({
      valor: e.ticker,
      etiqueta: e.ticker,
      detalle: `ETF · ${e.name} · ${pct(e.ter)}${e.isin ? ` · ${e.isin}` : ''}`,
      tipo: 'etf' as const,
      busqueda: normalizarBusqueda([e.ticker, e.name, e.isin ?? ''].join(' ')),
    }))
    .sort((a, b) => a.etiqueta.localeCompare(b.etiqueta, 'es'))

  // Los fondos primero: en España son la mayoría de las carteras.
  return [...fondos, ...etfs]
}

/**
 * Deja las opciones que contienen TODAS las palabras escritas, en cualquier orden. Sin nada
 * escrito, las devuelve todas. Si lo escrito es exactamente un ticker o un ISIN, esa opción
 * sube la primera de su grupo, para que Intro elija lo que la persona tiene delante.
 */
export function filtrarCatalogo(opciones: OpcionProducto[], consulta: string): OpcionProducto[] {
  const q = normalizarBusqueda(consulta.trim())
  const palabras = q.split(/\s+/).filter(Boolean)
  if (palabras.length === 0) return opciones
  const quedan = opciones.filter((o) => palabras.every((p) => o.busqueda.includes(p)))
  const exacta = (o: OpcionProducto) => (normalizarBusqueda(o.valor) === q.replace(/\s+/g, '') ? 0 : 1)
  // Orden estable: primero el grupo (fondos, luego ETFs) y dentro de cada grupo la coincidencia exacta.
  const clave = (o: OpcionProducto) => (o.tipo === 'fondo' ? 0 : 2) + exacta(o)
  return [...quedan].sort((a, b) => clave(a) - clave(b))
}
