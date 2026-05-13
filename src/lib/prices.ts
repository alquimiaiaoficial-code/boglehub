import { Result } from '@/types/analysis'

// Yahoo Finance suffix map for European ETF tickers
const SUFFIX_MAP: Record<string, string> = {
  VWCE: '.DE', CSPX: '.L', IWDA: '.AS', EIMI: '.L', AGGH: '.L',
  VEUR: '.L', VFEM: '.L', IMEU: '.L', SEMB: '.L', VAGF: '.L',
  SXR8: '.DE', EUNL: '.DE', VUSA: '.L', VUKE: '.L', IMID: '.L',
  IUSA: '.L', EQDS: '.L', XDWD: '.DE', VWRL: '.L', LCUW: '.PA',
}

// Map ticker → currency it's quoted in on Yahoo
const QUOTE_CURRENCY: Record<string, 'USD' | 'EUR' | 'GBp' | 'GBP'> = {
  VWCE: 'EUR', CSPX: 'USD', IWDA: 'USD', EIMI: 'USD', AGGH: 'USD',
  VEUR: 'EUR', VFEM: 'USD', IMEU: 'EUR', SEMB: 'USD', VAGF: 'EUR',
  SXR8: 'EUR', EUNL: 'EUR', VUSA: 'GBp', VUKE: 'GBp', IMID: 'USD',
  IUSA: 'GBp', EQDS: 'GBp', XDWD: 'EUR', VWRL: 'GBp', LCUW: 'EUR',
}

function toYahooSymbol(ticker: string): string {
  const suffix = SUFFIX_MAP[ticker.toUpperCase()] ?? '.DE'
  return `${ticker.toUpperCase()}${suffix}`
}

interface YahooQuoteResponse {
  quoteResponse: { result: Array<{ symbol: string; regularMarketPrice?: number }> }
}

async function fetchFxRates(): Promise<{ USD: number; GBP: number }> {
  try {
    const res = await fetch('https://query2.finance.yahoo.com/v7/finance/quote?symbols=EURUSD=X,EURGBP=X', {
      headers: { 'User-Agent': 'Mozilla/5.0 BogleHub/1.0' },
      next: { revalidate: 600 },
    })
    if (!res.ok) return { USD: 1.08, GBP: 0.85 } // sensible fallback
    const data = await res.json() as { quoteResponse: { result: Array<{ symbol: string; regularMarketPrice?: number }> } }
    const usdRate = data.quoteResponse?.result?.find(r => r.symbol === 'EURUSD=X')?.regularMarketPrice ?? 1.08
    const gbpRate = data.quoteResponse?.result?.find(r => r.symbol === 'EURGBP=X')?.regularMarketPrice ?? 0.85
    return { USD: usdRate, GBP: gbpRate }
  } catch {
    return { USD: 1.08, GBP: 0.85 }
  }
}

function convertToEur(price: number, ticker: string, fx: { USD: number; GBP: number }): number {
  const currency = QUOTE_CURRENCY[ticker.toUpperCase()] ?? 'EUR'
  switch (currency) {
    case 'EUR': return price
    case 'USD': return price / fx.USD
    case 'GBP': return price / fx.GBP
    case 'GBp': return (price / 100) / fx.GBP // GBp = pence
  }
}

export async function fetchPrices(tickers: string[]): Promise<Result<Record<string, number>>> {
  if (tickers.length === 0) return { ok: true, value: {} }

  try {
    const symbols = tickers.map(toYahooSymbol).join(',')
    const url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`

    const [res, fx] = await Promise.all([
      fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 BogleHub/1.0' },
        next: { revalidate: 300 },
      }),
      fetchFxRates(),
    ])

    if (!res.ok) {
      return { ok: false, error: new Error(`Yahoo Finance returned ${res.status}`) }
    }

    const data = (await res.json()) as YahooQuoteResponse
    const priceMap: Record<string, number> = {}

    for (const item of data.quoteResponse?.result ?? []) {
      const baseTicker = item.symbol.split('.')[0]
      if (item.regularMarketPrice != null) {
        priceMap[baseTicker] = convertToEur(item.regularMarketPrice, baseTicker, fx)
      }
    }

    return { ok: true, value: priceMap }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err : new Error('Unknown error') }
  }
}
