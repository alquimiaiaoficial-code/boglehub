import { Result } from '@/types/analysis'

// Yahoo Finance suffix map for European ETF tickers
const SUFFIX_MAP: Record<string, string> = {
  VWCE: '.DE', CSPX: '.L', IWDA: '.AS', EIMI: '.L', AGGH: '.L',
  VEUR: '.L', VFEM: '.L', IMEU: '.L', SEMB: '.L', VAGF: '.L',
  SXR8: '.DE', EUNL: '.DE', VUSA: '.L', VUKE: '.L', IMID: '.L',
  IUSA: '.L', EQDS: '.L', XDWD: '.DE', VWRL: '.L', LCUW: '.PA',
}

function toYahooSymbol(ticker: string): string {
  const suffix = SUFFIX_MAP[ticker.toUpperCase()] ?? '.DE'
  return `${ticker.toUpperCase()}${suffix}`
}

interface YahooQuoteResponse {
  quoteResponse: { result: Array<{ symbol: string; regularMarketPrice?: number }> }
}

export async function fetchPrices(tickers: string[]): Promise<Result<Record<string, number>>> {
  if (tickers.length === 0) return { ok: true, value: {} }

  try {
    const symbols = tickers.map(toYahooSymbol).join(',')
    const url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 BogleHub/1.0' },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return { ok: false, error: new Error(`Yahoo Finance returned ${res.status}`) }
    }

    const data = (await res.json()) as YahooQuoteResponse
    const priceMap: Record<string, number> = {}

    for (const item of data.quoteResponse?.result ?? []) {
      const baseTicker = item.symbol.split('.')[0]
      if (item.regularMarketPrice != null) {
        priceMap[baseTicker] = item.regularMarketPrice
      }
    }

    return { ok: true, value: priceMap }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err : new Error('Unknown error') }
  }
}
