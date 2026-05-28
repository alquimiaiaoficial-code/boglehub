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

// Currency each ticker is quoted in on its reference exchange (GBp = pence)
const QUOTE_CURRENCY: Record<string, 'USD' | 'EUR' | 'GBp' | 'GBP'> = {
  VWCE: 'EUR', CSPX: 'USD', IWDA: 'USD', EIMI: 'USD', AGGH: 'USD',
  VEUR: 'EUR', VFEM: 'USD', IMEU: 'EUR', SEMB: 'USD', VAGF: 'EUR',
  SXR8: 'EUR', EUNL: 'EUR', VUSA: 'GBp', VUKE: 'GBp', IMID: 'USD',
  IUSA: 'GBp', EQDS: 'GBp', XDWD: 'EUR', VWRL: 'GBp', LCUW: 'EUR',
}

// Yahoo suffix -> MIC code, so Twelve Data consulta el MISMO mercado que
// asume QUOTE_CURRENCY (si no, la conversión a EUR saldría mal).
const SUFFIX_TO_MIC: Record<string, string> = {
  '.DE': 'XETR', '.L': 'XLON', '.AS': 'XAMS', '.PA': 'XPAR', '.MI': 'XMIL',
}

const PRICE_TTL_MS = 1000 * 60 * 10 // 10 min, agresivo para ahorrar llamadas
const HTTP_TIMEOUT_MS = 6000

interface Fx {
  USD: number
  GBP: number
}

type PriceMap = Record<string, number> // base ticker (mayúsculas) -> precio en EUR

// ─── Caché en memoria (por instancia serverless) ────────────────────────────
const priceCache = new Map<string, { eur: number; at: number }>()
let fxCache: { fx: Fx; at: number } | null = null

/** Solo para tests: limpia la caché entre casos. */
export function resetPriceCache(): void {
  priceCache.clear()
  fxCache = null
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function sanitizeTicker(t: string): string {
  return t.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

function suffixFor(ticker: string): string {
  return SUFFIX_MAP[ticker] ?? '.DE'
}

function toYahooSymbol(ticker: string): string {
  return `${ticker}${suffixFor(ticker)}`
}

function parsePrice(v: unknown): number | null {
  if (v == null) return null
  const n = typeof v === 'number' ? v : parseFloat(String(v))
  return Number.isFinite(n) && n > 0 ? n : null
}

function convertToEur(price: number, ticker: string, fx: Fx): number {
  const currency = QUOTE_CURRENCY[ticker] ?? 'EUR'
  switch (currency) {
    case 'EUR': return price
    case 'USD': return price / fx.USD
    case 'GBP': return price / fx.GBP
    case 'GBp': return price / 100 / fx.GBP
  }
}

async function fetchFxRates(): Promise<Fx> {
  try {
    const [usd, gbp] = await Promise.all([
      yf.quote('EURUSD=X').catch(() => null),
      yf.quote('EURGBP=X').catch(() => null),
    ])
    return {
      USD: usd?.regularMarketPrice ?? 1.08,
      GBP: gbp?.regularMarketPrice ?? 0.85,
    }
  } catch {
    return { USD: 1.08, GBP: 0.85 }
  }
}

async function getFx(): Promise<Fx> {
  if (fxCache && Date.now() - fxCache.at < PRICE_TTL_MS) return fxCache.fx
  const fx = await fetchFxRates()
  fxCache = { fx, at: Date.now() }
  return fx
}

// ─── Proveedor 1: Twelve Data (800 llamadas/día gratis) ──────────────────────
// Presupuesto diario aproximado por instancia. En serverless cada instancia
// cuenta lo suyo, así que es un margen de seguridad, no un contador global real.
let tdDay = ''
let tdCalls = 0
function twelveDataHasBudget(): boolean {
  const today = new Date().toISOString().slice(0, 10)
  if (today !== tdDay) {
    tdDay = today
    tdCalls = 0
  }
  return tdCalls < 750
}

async function fromTwelveData(tickers: string[], fx: Fx): Promise<PriceMap> {
  const apiKey = process.env.TWELVE_DATA_API_KEY
  if (!apiKey || !twelveDataHasBudget()) return {}

  const out: PriceMap = {}
  // Agrupar por mercado (mic_code) porque el parámetro aplica a todo el lote.
  const groups = new Map<string, string[]>()
  for (const t of tickers) {
    const mic = SUFFIX_TO_MIC[suffixFor(t)] ?? 'XETR'
    const arr = groups.get(mic) ?? []
    arr.push(t)
    groups.set(mic, arr)
  }

  for (const [mic, group] of groups) {
    try {
      tdCalls++
      const url = `https://api.twelvedata.com/price?symbol=${group.join(',')}&mic_code=${mic}&apikey=${apiKey}`
      const res = await fetch(url, { signal: AbortSignal.timeout(HTTP_TIMEOUT_MS) })
      if (!res.ok) continue
      const data = await res.json()
      if (group.length === 1) {
        const price = parsePrice(data?.price)
        if (price != null) out[group[0]!] = convertToEur(price, group[0]!, fx)
      } else {
        for (const t of group) {
          const price = parsePrice(data?.[t]?.price)
          if (price != null) out[t] = convertToEur(price, t, fx)
        }
      }
    } catch {
      // grupo falla o timeout -> esos tickers caen al siguiente proveedor
    }
  }
  return out
}

// ─── Proveedor 2: Financial Modeling Prep (250 llamadas/día gratis) ──────────
async function fromFmp(tickers: string[], fx: Fx): Promise<PriceMap> {
  const apiKey = process.env.FMP_API_KEY
  if (!apiKey) return {}

  const out: PriceMap = {}
  try {
    const symbols = tickers.map((t) => `${t}${suffixFor(t)}`).join(',') // VWCE.DE,CSPX.L
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${apiKey}`
    const res = await fetch(url, { signal: AbortSignal.timeout(HTTP_TIMEOUT_MS) })
    if (!res.ok) return out
    const data = await res.json()
    if (!Array.isArray(data)) return out
    for (const item of data) {
      const base = String(item?.symbol ?? '').split('.')[0]?.toUpperCase()
      const price = parsePrice(item?.price)
      if (base && price != null) out[base] = convertToEur(price, base, fx)
    }
  } catch {
    // ignorado -> caen a Yahoo
  }
  return out
}

// ─── Proveedor 3: Yahoo Finance (ilimitado pero frágil, salvavidas) ──────────
async function fromYahoo(tickers: string[], fx: Fx): Promise<PriceMap> {
  try {
    const symbols = tickers.map(toYahooSymbol)
    const quotes = await yf.quote(symbols)
    const arr = Array.isArray(quotes) ? quotes : [quotes]
    const out: PriceMap = {}
    for (const item of arr) {
      const base = item.symbol.split('.')[0]
      const raw = item.regularMarketPrice
      if (base && raw != null) out[base] = convertToEur(raw, base, fx)
    }
    return out
  } catch {
    return {}
  }
}

// ─── API pública (misma firma de siempre) ────────────────────────────────────
export async function fetchPrices(
  tickers: string[]
): Promise<Result<Record<string, number>>> {
  if (tickers.length === 0) return { ok: true, value: {} }

  const upper = [...new Set(tickers.map(sanitizeTicker))].filter(Boolean)
  if (upper.length === 0) return { ok: true, value: {} }

  const now = Date.now()
  const out: Record<string, number> = {}
  const missing: string[] = []

  for (const t of upper) {
    const cached = priceCache.get(t)
    if (cached && now - cached.at < PRICE_TTL_MS) out[t] = cached.eur
    else missing.push(t)
  }

  if (missing.length > 0) {
    const fx = await getFx()
    let remaining = missing
    // Cadena con rotación reactiva: cada proveedor resuelve lo que puede; lo
    // que falte (por límite o por falta de cobertura) pasa al siguiente.
    for (const provider of [fromTwelveData, fromFmp, fromYahoo]) {
      if (remaining.length === 0) break
      const got = await provider(remaining, fx)
      for (const [t, p] of Object.entries(got)) {
        out[t] = p
        priceCache.set(t, { eur: p, at: now })
      }
      remaining = remaining.filter((t) => out[t] == null)
    }
  }

  // Si no se obtuvo NINGÚN precio para una petición no vacía, todo ha fallado.
  if (Object.keys(out).length === 0) {
    return { ok: false, error: new Error('Ningún proveedor de precios respondió') }
  }
  return { ok: true, value: out }
}
