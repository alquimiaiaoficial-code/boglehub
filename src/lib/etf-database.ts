import { EtfMetadata, EtfMetadataSchema } from '@/types/etf'
import rawData from '@/data/etfs.json'

// Note: Some ETFs share ISINs (e.g., SXR8/CSPX, EUNL/IWDA) because they are the same UCITS fund
// listed on different exchanges. ISIN is therefore NOT a unique key — use ticker.
const ETF_DB: EtfMetadata[] = (rawData as unknown[]).map(item => EtfMetadataSchema.parse(item))
const ETF_BY_TICKER = new Map(ETF_DB.map(etf => [etf.ticker.toUpperCase(), etf]))

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

export function getAllEtfs(): EtfMetadata[] {
  return [...ETF_DB]
}
