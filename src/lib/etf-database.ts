import { EtfMetadata, EtfMetadataSchema } from '@/types/etf'
import rawData from '@/data/etfs.json'

// Note: Some ETFs share ISINs (e.g., SXR8/CSPX, EUNL/IWDA) because they are the same UCITS fund
// listed on different exchanges. ISIN is therefore NOT a unique key — use ticker.
const ETF_DB: EtfMetadata[] = (rawData as unknown[]).map(item => EtfMetadataSchema.parse(item))
const ETF_BY_TICKER = new Map(ETF_DB.map(etf => [etf.ticker.toUpperCase(), etf]))

/**
 * Cuándo se tocó por última vez el catálogo del que salen los repartos por región y sector
 * (`etfs.json`, último commit que lo cambia). Existe para poder FECHAR las cifras calculadas.
 *
 * Por qué (28-sep-2026): el 19-sep ChatGPT, preguntado por el solapamiento de VWCE y CSPX,
 * citó a una herramienta inglesa que daba la cifra con fecha y procedencia; nosotros dábamos
 * «60 %» a secas. Lo que un motor cita es el número con su fecha, no el número. Al cambiar
 * `etfs.json`, actualizar esta fecha: una cifra fechada mal es peor que una sin fecha.
 */
export const CATALOGO_ACTUALIZADO = { iso: '2026-09-19', texto: '19 de septiembre de 2026' } as const

export function getEtfByTicker(ticker: string): EtfMetadata | null {
  return ETF_BY_TICKER.get(ticker.toUpperCase()) ?? null
}

export function searchEtfs(query: string): EtfMetadata[] {
  const q = query.toLowerCase()
  return ETF_DB.filter(etf =>
    etf.ticker.toLowerCase().includes(q) ||
    etf.name.toLowerCase().includes(q)
  ).slice(0, 10)
}

/**
 * Otras cotizaciones del MISMO fondo, por ISIN.
 *
 * Nace de mirar qué nos pregunta la gente: «cuál es el etf de irlanda de vuaa», «diferencia
 * entre fondos eunl iwda», «qué diferencia puntual hay entre el etf sgln y el igln», «vuaa
 * de irlanda cómo se llama en interactive brokers». Son todas la misma confusión, y es
 * razonable: un mismo fondo UCITS cotiza en varias bolsas con ticker distinto y parecen
 * productos diferentes.
 *
 * Nueve fondos del catálogo están en ese caso. El dato ya lo teníamos y no lo enseñábamos.
 */
export function otrasCotizaciones(ticker: string): EtfMetadata[] {
  const etf = getEtfByTicker(ticker)
  if (!etf?.isin) return []
  return ETF_DB.filter((e) => e.isin === etf.isin && e.ticker !== etf.ticker)
}

export function getAllEtfs(): EtfMetadata[] {
  return [...ETF_DB]
}
