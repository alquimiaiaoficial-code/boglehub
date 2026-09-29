import YahooFinance from 'yahoo-finance2'
import { Result } from '@/types/analysis'

const yf = new YahooFinance()

// Yahoo Finance suffix map for European ETF tickers
const SUFFIX_MAP: Record<string, string> = {
  VWCE: '.DE', CSPX: '.L', IWDA: '.AS', EIMI: '.L', AGGH: '.DE',
  VEUR: '.L', VFEM: '.L', IMEU: '.L', SEMB: '.L', VAGF: '.MI',
  SXR8: '.DE', EUNL: '.DE', VUSA: '.L', VUKE: '.L',
  IUSA: '.L', XDWD: '.DE', VWRL: '.L', LCUW: '.PA',
  // Añadidos el 29-sep-2026: los que se buscaban donde no cotizan (ver SYMBOL_ALIAS).
  VWRP: '.DE', EMIM: '.DE', WSML: '.DE', CNDX: '.DE', SMEA: '.AS',
  SGLN: '.L', IGLN: '.L', SWRD: '.L', ISAC: '.L', MEUD: '.PA', AEEM: '.PA',
  IBGX: '.AS', VETY: '.AS', TDIV: '.AS', VHYL: '.L', SJPA: '.L', CPXJ: '.SW',
  IWQU: '.L', IWMO: '.L', RBOT: '.L', SPYL: '.DE',
}

/**
 * Ticker del catálogo → símbolo con el que ese MISMO producto cotiza en la bolsa de
 * SUFFIX_MAP, cuando no se llama igual.
 *
 * Por qué existe (29-sep-2026): 24 de los 55 ETFs del catálogo no tenían precio porque se
 * buscaban con su ticker en una bolsa donde ese ticker no existe (VWRP en Xetra, SGLN en
 * Xetra…). Cada alias sale de buscar el ISIN del catálogo en Yahoo y quedarse con una
 * cotización de ESE ISIN; cuando otro ticker del catálogo comparte ISIN y ya tenía buen
 * precio en euros, se usa ese. Nunca un producto «parecido»: un precio de otro producto es
 * peor que no tener precio, porque no avisa.
 *
 *   VWRP → VWCE (IE00BK5BQT80)   EMIM → IS3N (IE00BKM4GZ66)   AGGH → EUNA (IE00BDBRDM35)
 *   WSML → IUSN (IE00BF4RFH31)   CNDX → SXRV (IE00B53SZB19)   SMEA → IMAE (IE00B4K48X80)
 *   SGLN → IGLN (IE00B4ND3602)   MEUD → MEU  (FR0010261198)   VHYL → VHYD (IE00B8GKDB10)
 *   SJPA → IJPA (IE00B4L5YX21)   CPXJ → CSPXJ (IE00B52MJY50)
 *
 * Sin alias: LCUW (Yahoo no devuelve ninguna cotización para su ISIN). SPXS era una ficha
 * que mezclaba dos productos; desde el 29-sep-2026 es SPYL y cotiza con su propio ticker.
 */
const SYMBOL_ALIAS: Record<string, string> = {
  VWRP: 'VWCE', EMIM: 'IS3N', AGGH: 'EUNA', WSML: 'IUSN', CNDX: 'SXRV', SMEA: 'IMAE',
  SGLN: 'IGLN', MEUD: 'MEU', VHYL: 'VHYD', SJPA: 'IJPA', CPXJ: 'CSPXJ',
}

// Currency each ticker is quoted in on its reference exchange (GBp = pence)
//
// Revisada el 29-sep-2026 contra la divisa que declara cada cotización en Yahoo, y con un
// control independiente donde lo había. Ocho estaban mal y el analizador daba precios
// falsos en modo participaciones:
//   IWDA  USD → EUR  en Ámsterdam cotiza en euros: salía a 113,51 € y EUNL, el mismo
//                    fondo en Xetra, a 128,71 €. La diferencia era justo el cambio EUR/USD.
//   VUSA, VUKE, VWRL  GBp → GBP  en Londres cotizan en libras, no en peniques: salían
//                    100 veces por debajo (VWRL a 1,64 €; convertido bien, 163,6 € frente a
//                    169,4 € de VWCE, que es el mismo índice en acumulación).
//   IMEU, SEMB  → GBp  cotizan en peniques y se leían como euros o dólares: IMEU salía a
//                    3.410 € en vez de ~40 €.
//   VEUR, VFEM  → GBP  la línea de Londres que se consulta es la de libras.
// Nota: MWRD (sin sufijo, Xetra) Yahoo lo declara en GBP, cosa rara en Xetra. Sin
// comprobar; se deja como estaba hasta verlo en la gestora o en la bolsa.
const QUOTE_CURRENCY: Record<string, 'USD' | 'EUR' | 'GBp' | 'GBP'> = {
  VWCE: 'EUR', CSPX: 'USD', IWDA: 'EUR', EIMI: 'USD', AGGH: 'EUR',
  VEUR: 'GBP', VFEM: 'GBP', IMEU: 'GBp', SEMB: 'GBp', VAGF: 'EUR',
  SXR8: 'EUR', EUNL: 'EUR', VUSA: 'GBP', VUKE: 'GBP',
  IUSA: 'GBp', XDWD: 'EUR', VWRL: 'GBP', LCUW: 'EUR',
  // 29-sep-2026, divisa que declara Yahoo para cada cotización de SUFFIX_MAP/SYMBOL_ALIAS.
  // MWRD: Yahoo lo da en GBP en Xetra; parece raro pero cuadra con su línea en euros de
  // Stuttgart (138,64 GBP = 161,6 € frente a 161,54 €). Leído como euros salía un 14 % bajo.
  MWRD: 'GBP',
  VWRP: 'EUR', EMIM: 'EUR', WSML: 'EUR', CNDX: 'EUR', SMEA: 'EUR',
  SGLN: 'USD', IGLN: 'USD', SWRD: 'USD', ISAC: 'USD', MEUD: 'EUR', AEEM: 'EUR',
  IBGX: 'EUR', VETY: 'EUR', TDIV: 'EUR', VHYL: 'USD', SJPA: 'USD', CPXJ: 'USD',
  IWQU: 'USD', IWMO: 'USD', RBOT: 'USD', SPYL: 'EUR',
}

// Yahoo suffix -> MIC code, so Twelve Data consulta el MISMO mercado que
// asume QUOTE_CURRENCY (si no, la conversión a EUR saldría mal).
const SUFFIX_TO_MIC: Record<string, string> = {
  '.DE': 'XETR', '.L': 'XLON', '.AS': 'XAMS', '.PA': 'XPAR', '.MI': 'XMIL', '.SW': 'XSWX',
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

function symbolFor(ticker: string): string {
  return SYMBOL_ALIAS[ticker] ?? ticker
}

function toYahooSymbol(ticker: string): string {
  return `${symbolFor(ticker)}${suffixFor(ticker)}`
}

/**
 * Reparte un precio recibido por símbolo entre los tickers del catálogo que lo usan. Dos
 * tickers pueden compartir símbolo (SGLN e IGLN son el mismo ETC), así que no es 1 a 1.
 * Acepta el símbolo con sufijo de bolsa («VWCE.DE») o sin él («VWCE», como en Twelve Data).
 */
function asignar(out: PriceMap, tickers: string[], simbolo: string, precio: number, fx: Fx): void {
  const s = simbolo.toUpperCase()
  for (const t of tickers) {
    if (toYahooSymbol(t).toUpperCase() === s || symbolFor(t) === s) out[t] = convertToEur(precio, t, fx)
  }
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
      const simbolos = [...new Set(group.map(symbolFor))]
      const url = `https://api.twelvedata.com/price?symbol=${simbolos.join(',')}&mic_code=${mic}&apikey=${apiKey}`
      const res = await fetch(url, { signal: AbortSignal.timeout(HTTP_TIMEOUT_MS) })
      if (!res.ok) continue
      const data = await res.json()
      if (simbolos.length === 1) {
        const price = parsePrice(data?.price)
        if (price != null) asignar(out, group, simbolos[0]!, price, fx)
      } else {
        for (const s of simbolos) {
          const price = parsePrice(data?.[s]?.price)
          if (price != null) asignar(out, group, s, price, fx)
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
    const symbols = [...new Set(tickers.map(toYahooSymbol))].join(',') // VWCE.DE,CSPX.L
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${apiKey}`
    const res = await fetch(url, { signal: AbortSignal.timeout(HTTP_TIMEOUT_MS) })
    if (!res.ok) return out
    const data = await res.json()
    if (!Array.isArray(data)) return out
    for (const item of data) {
      const simbolo = String(item?.symbol ?? '')
      const price = parsePrice(item?.price)
      if (simbolo && price != null) asignar(out, tickers, simbolo, price, fx)
    }
  } catch {
    // ignorado -> caen a Yahoo
  }
  return out
}

// ─── Proveedor 3: Yahoo Finance (ilimitado pero frágil, salvavidas) ──────────
async function fromYahoo(tickers: string[], fx: Fx): Promise<PriceMap> {
  try {
    const symbols = [...new Set(tickers.map(toYahooSymbol))]
    const quotes = await yf.quote(symbols)
    const arr = Array.isArray(quotes) ? quotes : [quotes]
    const out: PriceMap = {}
    for (const item of arr) {
      const raw = item.regularMarketPrice
      if (item.symbol && raw != null) asignar(out, tickers, item.symbol, raw, fx)
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
