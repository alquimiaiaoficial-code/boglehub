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
      // Si entre ese ticker y el ISIN hay otro ISIN, el ticker ya tenía el suyo.
      if (mejor && !ISIN_UNO.test(antes.slice(mejor.pos)) && isin !== mejor.suIsin) {
        malos.push(`${rel}:${i + 1}  ${mejor.t} junto a ${isin}, pero su ISIN es ${mejor.suIsin}`)
      }
    }
  })
}

console.log(`Ficheros: ${ficheros.length}`)
console.log(`\n== Ticker junto al ISIN de otro producto: ${malos.length}`)
for (const x of [...new Set(malos)]) console.log('  ' + x)
console.log(`\n== ISINs citados que no están en ningún catálogo: ${desconocidos.size}`)
for (const [k, v] of desconocidos) console.log(`  ${k}  (primera vez: ${v})`)
