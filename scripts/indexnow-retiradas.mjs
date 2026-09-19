/**
 * Avisa a IndexNow de URLs RETIRADAS, para que las recorran y las suelten.
 *
 * `indexnow.mjs` manda el sitemap, y una URL retirada ya no está en el sitemap: por
 * definición no se puede avisar de ella por esa vía. IndexNow admite avisar de una URL que
 * devuelve 404 o 410 — es el modo previsto de decir «esto ya no está», y sale mucho más
 * rápido del índice que esperando a que el crawler vuelva por su cuenta.
 *
 * Se usó el 18-sep-2026 al retirar páginas que publicaban datos falsos: dos ETFs cuyas
 * fichas fusionaban dos productos distintos y un fondo cuyo ISIN no existía. Mientras esas
 * URLs sigan en el índice de Bing, el dato equivocado sigue sirviéndose desde la caché del
 * buscador aunque en el sitio ya no esté.
 *
 * ANTES DE ENVIAR comprueba que cada URL devuelve de verdad 404 o 410. Avisar de una que
 * responde 200 la reindexaría, que es lo contrario de lo que se busca.
 *
 * Uso:  node scripts/indexnow-retiradas.mjs [--dry]
 */

import { readFileSync } from 'node:fs'

const HOST = 'boglehub.com'
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const dry = process.argv.includes('--dry')

/** Lo retirado, con el motivo al lado: es lo que cuesta reconstruir luego. */
const RETIRADAS = [
  // 19-sep-2026, segunda tanda: once fichas de ETF cuyo TICKER pertenecia a otro producto
  // y que no se podian arreglar sin inventar los repartos por region y sector.
  '/etf/imid', '/etf/eqds', '/etf/ceug', '/etf/sega', '/etf/ispa', '/etf/fgeq',
  '/etf/exsg', '/etf/xgig', '/etf/flxe', '/etf/eunh', '/etf/wtef',
  // Y las comparativas que las emparejaban.
  '/comparar/vhyl-vs-fgeq', '/comparar/tdiv-vs-ispa',
  '/comparar/sgln-vs-exsg', '/comparar/eunh-vs-aggh',
]

function leerClave() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim()
  return readFileSync(new URL('../.indexnow-key.local', import.meta.url), 'utf8').trim()
}

const clave = leerClave()
const urls = RETIRADAS.map((r) => `https://${HOST}${r}`)

// Comprobación previa: solo se avisa de lo que de verdad ya no está.
const vivas = []
for (const url of urls) {
  const res = await fetch(url, { method: 'HEAD', redirect: 'manual' })
  if (res.status !== 404 && res.status !== 410) vivas.push(`${url} -> ${res.status}`)
}
if (vivas.length > 0) {
  console.error('ABORTADO: estas no estan retiradas, avisar de ellas las reindexaria:')
  for (const v of vivas) console.error('  ' + v)
  process.exit(1)
}
console.log(`${urls.length} URLs comprobadas: todas 404 o 410.`)

if (dry) {
  console.log('--dry: no se envia nada.')
  for (const u of urls) console.log('  ' + u)
  process.exit(0)
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: clave, keyLocation: `https://${HOST}/${clave}.txt`, urlList: urls }),
})
console.log(`HTTP ${res.status} ${res.statusText}`)
if (res.status !== 200 && res.status !== 202) {
  console.error('No aceptado. Si es 403 SiteVerificationNotCompleted, la clave aun no se sirve;')
  console.error('si es 422, alguna URL no pertenece al host.')
  process.exit(1)
}
console.log('Avisado. Bing recorrera esas URLs y las sacara del indice al ver el 404.')
