/**
 * Cruza lo que dicen los TEXTOS de la web con el catálogo verificado.
 *
 * Existe desde el 29-sep-2026. Ese día el catálogo quedó verificado entero en las gestoras,
 * y los errores que quedaban estaban en texto escrito a mano: el ticker 4GLD pegado al ISIN
 * y al coste de otro producto en tres páginas, un ticker de Invesco que no existía («EGLN»)
 * en seis. Ningún test lo veía porque los textos no leen el catálogo: lo copian.
 *
 * Qué mira, en src/data y src/app:
 *  1. Un ticker del catálogo con un ISIN a menos de 90 caracteres, en la misma línea: si ese
 *     ISIN no es el del ticker (ni el de otro ticker del mismo fondo), se marca.
 *  2. Un ISIN que no está en el catálogo de ETFs ni en el de fondos: no se marca como error,
 *     se lista para mirarlo a mano (puede ser un producto que no tenemos y está bien citado).
 *  3. El TER que cita el texto junto a un ticker frente al verificado (desde el 30-sep).
 *
 * Uso:  node scripts/cruce-textos-catalogo.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const etfs = JSON.parse(fs.readFileSync(path.join(RAIZ, 'src/data/etfs.json'), 'utf8'))
const lista = Array.isArray(etfs) ? etfs : etfs.etfs ?? Object.values(etfs)
const isinDe = new Map(lista.map((e) => [e.ticker.toUpperCase(), e.isin]))
const isinsEtf = new Set(lista.map((e) => e.isin))

// ISINs de fondos y clases: se leen del código fuente para no depender de TypeScript.
const isinsFondo = new Set()
for (const f of ['src/data/index-funds.ts', 'src/data/fund-classes.ts']) {
  const s = fs.readFileSync(path.join(RAIZ, f), 'utf8')
  for (const m of s.matchAll(/isin:\s*'([A-Z]{2}[A-Z0-9]{9}\d)'/g)) isinsFondo.add(m[1])
}

const ISIN = /\b([A-Z]{2}[A-Z0-9]{9}\d)\b/g
const ISIN_UNO = /\b[A-Z]{2}[A-Z0-9]{9}\d\b/
const ficheros = []
function recorrer(d) {
  for (const n of fs.readdirSync(d)) {
    const p = path.join(d, n)
    if (fs.statSync(p).isDirectory()) recorrer(p)
    else if (/\.(ts|tsx)$/.test(n) && !/\.test\./.test(n)) ficheros.push(p)
  }
}
recorrer(path.join(RAIZ, 'src/data'))
recorrer(path.join(RAIZ, 'src/app'))

const malos = []
const desconocidos = new Map()
for (const p of ficheros) {
  const rel = path.relative(RAIZ, p).split(path.sep).join('/')
  const lineas = fs.readFileSync(p, 'utf8').split('\n')
  lineas.forEach((linea, i) => {
    for (const m of linea.matchAll(ISIN)) {
      const isin = m[1]
      if (!/^(IE|LU|DE|FR|NL|GB|US|ES|JE|CH)/.test(isin)) continue
      if (!isinsEtf.has(isin) && !isinsFondo.has(isin)) {
        const k = `${isin}`
        if (!desconocidos.has(k)) desconocidos.set(k, `${rel}:${i + 1}`)
      }
      // El ticker del catálogo más cercano que va DELANTE del ISIN, en los 90 caracteres
      // previos: es como se escribe («VWCE (…, ISIN IE00BK5BQT80)»). Mirar también detrás
      // daba falsos positivos en frases con varios ETFs seguidos.
      const antes = linea.slice(Math.max(0, m.index - 90), m.index)
      let mejor = null
      for (const [t, suIsin] of isinDe) {
        const re = new RegExp(`(?<![A-Z0-9])${t}(?![A-Z0-9])`, 'g')
        for (const x of antes.matchAll(re)) if (!mejor || x.index > mejor.pos) mejor = { t, suIsin, pos: x.index }
      }
      // Si entre ese ticker y el ISIN hay otro ISIN, el ticker ya tenía el suyo. Y si hay otro
      // ticker (aunque no esté en el catálogo) seguido de paréntesis —«EQAC (IE00BFZXGZ54…»—,
      // el ISIN es de ese.
      const entre = mejor ? antes.slice(mejor.pos + mejor.t.length) : ''
      const otroDueño = /(?<![A-Z0-9])[A-Z][A-Z0-9]{2,5}(?![A-Z0-9])\s*\(/.test(entre)
      if (mejor && !otroDueño && !ISIN_UNO.test(antes.slice(mejor.pos)) && isin !== mejor.suIsin) {
        malos.push(`${rel}:${i + 1}  ${mejor.t} junto a ${isin}, pero su ISIN es ${mejor.suIsin}`)
      }
    }
  })
}

/**
 * 3. TER citado en el texto frente al verificado (añadido el 30-sep-2026). Fue el error más
 * repetido el 29-sep: XDWD a 0,19 %, IBGS a 0,15 %, IEAC a 0,20 %, IBGL a 0,20 %… Se mira en
 * las tres formas en que aparece: una tabla markdown con columna «TER», una mención «X (…,
 * TER 0,12 %)», y las filas de datos (`['X', nombre, ISIN, '0,12%'` y `ticker: 'X' … ter_anual`).
 */
const terDe = new Map(lista.map((e) => [e.ticker.toUpperCase(), e.ter]))
// Verificados en su gestora el 29/30-sep-2026 aunque no estén en el catálogo.
for (const [t, v] of Object.entries({ SGLD: 0.12, IEGA: 0.07, IEAC: 0.09, IBGS: 0.10, IBGL: 0.15, SPYI: 0.17, EQAC: 0.30, ZPRG: 0.45, FUSD: 0.25, IUSQ: 0.20 })) terDe.set(t, v)
const num = (s) => parseFloat(s.replace(',', '.'))
const terMalos = []
const apunta = (rel, i, t, citado, linea) => {
  const bueno = terDe.get(t)
  if (bueno == null || Math.abs(num(citado) - bueno) < 0.005) return
  terMalos.push(`${rel}:${i + 1}  ${t} con TER ${citado} %, pero el verificado es ${bueno.toFixed(2).replace('.', ',')} %  «${linea.trim().slice(0, 110)}»`)
}
const tickerDeCelda = (c) => {
  const m = c.replace(/\*/g, '').trim().match(/^([A-Z0-9]{3,6})(?:\s|$|—|-)/)
  return m && terDe.has(m[1]) ? m[1] : null
}
for (const p of ficheros) {
  const rel = path.relative(RAIZ, p).split(path.sep).join('/')
  const lineas = fs.readFileSync(p, 'utf8').split('\n')
  let colTer = -1
  lineas.forEach((linea, i) => {
    // a) tablas markdown: se recuerda la columna «TER» de la cabecera
    if (/^\s*\|/.test(linea)) {
      const celdas = linea.split('|').slice(1, -1)
      if (celdas.some((c) => /^\s*TER\b/i.test(c.replace(/\*/g, '')))) colTer = celdas.findIndex((c) => /^\s*TER\b/i.test(c.replace(/\*/g, '')))
      else if (colTer >= 0 && !/^\s*\|[\s:-]+\|/.test(linea)) {
        const t = celdas.map(tickerDeCelda).find(Boolean)
        const m = (celdas[colTer] || '').match(/(\d+[.,]\d+)\s*%/)
        if (t && m) apunta(rel, i, t, m[1], linea)
      }
    } else colTer = -1
    // b) «X (…, TER 0,12 %)» sin otro ticker del catálogo entre medias
    for (const m of linea.matchAll(/(?<![A-Z0-9])([A-Z0-9]{3,6})(?![A-Z0-9])((?:(?!\.\s)[^%|]){0,80}?)\bTER(?:\s+(?:de|del))?\s*(?:[:=]\s*)?(\d+[.,]\d+)\s*%/g)) {
      if (!terDe.has(m[1])) continue
      if ([...m[2].matchAll(/(?<![A-Z0-9])([A-Z0-9]{3,6})(?![A-Z0-9])/g)].some((x) => terDe.has(x[1]))) continue
      apunta(rel, i, m[1], m[3], linea)
    }
    // c) filas de datos
    for (const m of linea.matchAll(/\['([A-Z0-9]{3,6})',\s*'[^']*',\s*'[A-Z]{2}[A-Z0-9]{10}',\s*'(\d+[.,]\d+)\s*%'/g)) apunta(rel, i, m[1], m[2], linea)
    for (const m of linea.matchAll(/ticker:\s*'([A-Z0-9]{3,6})'[^}]*?ter_anual:\s*'(\d+[.,]\d+)\s*%'/g)) apunta(rel, i, m[1], m[2], linea)
  })
}

console.log(`Ficheros: ${ficheros.length}`)
console.log(`\n== TER citado distinto del verificado: ${terMalos.length}`)
for (const x of [...new Set(terMalos)]) console.log('  ' + x)
console.log(`\n== Ticker junto al ISIN de otro producto: ${malos.length}`)
for (const x of [...new Set(malos)]) console.log('  ' + x)
console.log(`\n== ISINs citados que no están en ningún catálogo: ${desconocidos.size}`)
for (const [k, v] of desconocidos) console.log(`  ${k}  (primera vez: ${v})`)
