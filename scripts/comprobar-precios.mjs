/**
 * Comprueba el precio que da producción para cada ETF del catálogo contra Yahoo, leyendo la
 * divisa que Yahoo declara para cada cotización. No usa ninguna clave.
 *
 * Existe desde el 29-sep-2026: ese día 9 de los 55 daban un precio falso (divisa mal en
 * QUOTE_CURRENCY) y 24 ninguno (se buscaban donde no cotizan). Nada de eso se veía roto.
 *
 * Uso:  node scripts/comprobar-precios.mjs      ('!!' = diferencia > 3 %, '??' = sin precio)
 * Hace 2 peticiones a boglehub.com y una a Yahoo por ETF. No meter en un bucle: el filtro
 * anti-bots de Vercel ya saltó una vez por verificar en bucle (19-sep-2026).
 */
import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(path.join(RAIZ, 'package.json'))
const YahooFinance = require('yahoo-finance2').default
const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

const etfs = JSON.parse(fs.readFileSync(path.join(RAIZ, 'src/data/etfs.json'), 'utf8'))
const lista = Array.isArray(etfs) ? etfs : etfs.etfs ?? Object.values(etfs)
const tickers = [...new Set(lista.map((e) => String(e.ticker).toUpperCase()))]

const src = fs.readFileSync(path.join(RAIZ, 'src/lib/prices.ts'), 'utf8')
const bloque = src.match(/SUFFIX_MAP[^{]*{([^}]*)}/)[1]
const SUFFIX = Object.fromEntries([...bloque.matchAll(/([A-Z0-9]+):\s*'([^']+)'/g)].map((m) => [m[1], m[2]]))
const ba = src.match(/SYMBOL_ALIAS[^=]*=\s*{([^}]*)}/)
const ALIAS = ba ? Object.fromEntries([...ba[1].matchAll(/([A-Z0-9]+):\s*'([^']+)'/g)].map((m) => [m[1], m[2]])) : {}
const bq = src.match(/QUOTE_CURRENCY[^{]*{([^}]*)}/)[1]
const CUR = Object.fromEntries([...bq.matchAll(/([A-Z0-9]+):\s*'([^']+)'/g)].map((m) => [m[1], m[2]]))

async function prod(ts) {
  const out = {}
  for (let i = 0; i < ts.length; i += 50) {
    const r = await fetch('https://boglehub.com/api/prices', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
      body: JSON.stringify({ tickers: ts.slice(i, i + 50) }),
    })
    const j = await r.json()
    Object.assign(out, j.data ?? {})
  }
  return out
}

const [fxu, fxg] = await Promise.all([yf.quote('EURUSD=X'), yf.quote('EURGBP=X')])
const FX = { USD: fxu.regularMarketPrice, GBP: fxg.regularMarketPrice }
const aEur = (p, c) => (c === 'EUR' ? p : c === 'USD' ? p / FX.USD : c === 'GBP' ? p / FX.GBP : c === 'GBp' || c === 'GBX' ? p / 100 / FX.GBP : NaN)

const p = await prod(tickers)
const filas = []
for (const t of tickers) {
  const sym = (ALIAS[t] ?? t) + (SUFFIX[t] ?? '.DE')
  let q = null
  try { q = await yf.quote(sym) } catch {}
  const yEur = q?.regularMarketPrice != null ? aEur(q.regularMarketPrice, q.currency) : null
  const pr = p[t]
  const dif = pr && yEur ? ((pr / yEur - 1) * 100) : null
  filas.push({ t, sym, tabla: CUR[t] ?? '(EUR por defecto)', yahoo: q?.currency ?? 'sin dato', crudo: q?.regularMarketPrice ?? null, yEur: yEur && +yEur.toFixed(2), prod: pr && +pr.toFixed(2), dif: dif == null ? null : +dif.toFixed(1) })
}
console.log('FX', FX, 'tickers', tickers.length)
for (const f of filas) {
  const marca = f.dif == null ? '??' : Math.abs(f.dif) > 3 ? '!!' : 'ok'
  console.log(marca, f.t.padEnd(6), f.sym.padEnd(9), 'tabla=' + f.tabla.padEnd(18), 'yahoo=' + String(f.yahoo).padEnd(8), 'crudo=' + f.crudo, 'yahooEUR=' + f.yEur, 'prod=' + f.prod, 'dif%=' + f.dif)
}
