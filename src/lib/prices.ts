import YahooFinance from 'yahoo-finance2'
import { Result } from '@/types/analysis'

const yf = new YahooFinance()

// Yahoo Finance suffix map for European ETF tickers
const SUFFIX_MAP: Record<string, string> = {
  VWCE: '.DE', CSPX: '.L', IWDA: '.AS', EIMI: '.L', AGGH: '.L',
  VEUR: '.L', VFEM: '.L', IMEU: '.L', SEMB: '.L', VAGF: '.L',
  SXR8: '.DE', EUNL: '.DE', VUSA: '.L', VUKE: '.L', IMID: '.L',
  IUSA: '.L', EQDS: '.L', XDWD: '.DE', VWRL: '.L', LCUW: '.PA',
}

// Currency each ticker is quoted in on Yahoo (GBp = pence sterling)
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

async function fetchFxRates(): Promise<{ USD: number; GBP: number }> {
  try {
    const [usdResult, gbpResult] = await Promise.all([
      yf.quote('EURUSD=X').catch(() => null),
      yf.quote('EURGBP=X').catch(() => null),
    ])
    return {
      USD: usdResult?.regularMarketPrice ?? 1.08,
      GBP: gbpResult?.regularMarketPrice ?? 0.85,
    }
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
    case 'GBp': return (price / 100) / fx.GBP
  }
}

export async function fetchPrices(tickers: string[]): Promise<Result<Record<string, number>>> {
  if (tickers.length === 0) return { ok: true, value: {} }

  try {
    const symbols = tickers.map(toYahooSymbol)

    const [quotes, fx] = await Promise.all([
      yf.quote(symbols),
      fetchFxRates(),
    ])

    const quotesArray = Array.isArray(quotes) ? quotes : [quotes]
    const priceMap: Record<string, number> = {}

    for (const item of quotesArray) {
      const baseTicker = item.symbol.split('.')[0]
      const rawPrice = item.regularMarketPrice
      if (rawPrice != null) {
        priceMap[baseTicker] = convertToEur(rawPrice, baseTicker, fx)
      }
    }

    return { ok: true, value: priceMap }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err : new Error('Price fetch failed') }
  }
}
