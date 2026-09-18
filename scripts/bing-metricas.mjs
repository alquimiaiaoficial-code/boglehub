/**
 * Lee las métricas de Bing Webmaster Tools por API, sin exportar CSVs a mano.
 *
 * POR QUÉ. Bing es el canal que rinde: medido el 18-sep-2026, 1.994 impresiones frente a 37
 * de Google en 28 días. Hasta hoy esos números dependían de que el fundador abriera la
 * herramienta y exportara a mano, porque el navegador de agente pierde la sesión. Con la
 * clave se leen solos.
 *
 * LA CLAVE NUNCA SE IMPRIME. Se lee de .env.local (ignorado por git) o de la variable de
 * entorno, y no aparece en la salida ni en los mensajes de error.
 *
 * Uso:
 *   node scripts/bing-metricas.mjs              resumen + top de consultas
 *   node scripts/bing-metricas.mjs --consulta boglehub    filtra por texto
 *   node scripts/bing-metricas.mjs --paginas    estadísticas por página
 *   node scripts/bing-metricas.mjs --json       vuelca el crudo para analizarlo aparte
 */

import { readFileSync } from 'node:fs'

const SITIO = 'https://boglehub.com/'
const BASE = 'https://ssl.bing.com/webmaster/api.svc/json'

function leerClave() {
  if (process.env.BING_WEBMASTER_API_KEY) return process.env.BING_WEBMASTER_API_KEY.trim()
  const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  const m = env.match(/^BING_WEBMASTER_API_KEY=(.*)$/m)
  if (!m || !m[1].trim()) {
    console.error('No hay BING_WEBMASTER_API_KEY en .env.local ni en el entorno.')
    console.error('Se genera en Bing Webmaster Tools > Settings > API access > API key.')
    process.exit(1)
  }
  return m[1].trim()
}

const clave = leerClave()

async function pedir(metodo, extra = {}) {
  const p = new URLSearchParams({ apikey: clave, siteUrl: SITIO, ...extra })
  const r = await fetch(`${BASE}/${metodo}?${p}`)
  const texto = await r.text()
  if (!r.ok) {
    // Sin la clave en el mensaje: un error no es motivo para filtrarla a un log.
    throw new Error(`${metodo}: HTTP ${r.status} ${texto.slice(0, 200).replaceAll(clave, '[CLAVE]')}`)
  }
  return JSON.parse(texto).d
}

/** Las fechas de esta API llegan como /Date(1758153600000)/ */
function fecha(v) {
  const m = String(v ?? '').match(/\/Date\((\d+)/)
  return m ? new Date(Number(m[1])).toISOString().slice(0, 10) : '?'
}

const args = process.argv.slice(2)
const filtro = args.includes('--consulta') ? args[args.indexOf('--consulta') + 1] : null

if (args.includes('--paginas')) {
  // La API devuelve una fila por página Y fecha, así que hay que sumar por URL. Leer el
  // listado en crudo hace creer que una misma página aparece muchas veces con pocas
  // impresiones cada una, cuando es una sola repartida en días.
  const filas = await pedir('GetPageStats')
  const porUrl = new Map()
  for (const f of filas) {
    const url = f.Query ?? f.Url ?? ''
    const acc = porUrl.get(url) ?? { impresiones: 0, clics: 0 }
    acc.impresiones += f.Impressions || 0
    acc.clics += f.Clicks || 0
    porUrl.set(url, acc)
  }
  const paginas = [...porUrl.entries()].sort((a, b) => b[1].impresiones - a[1].impresiones)
  const totalImp = paginas.reduce((a, [, v]) => a + v.impresiones, 0)
  const totalCli = paginas.reduce((a, [, v]) => a + v.clics, 0)
  console.log(`${paginas.length} páginas distintas · ${totalImp} impresiones · ${totalCli} clics`)
  console.log('')
  console.log('impr.  clics  CTR     página')
  for (const [url, v] of paginas.slice(0, 30)) {
    const ctr = v.impresiones ? ((v.clics / v.impresiones) * 100).toFixed(1) + '%' : '—'
    const corta = url.replace('https://boglehub.com', '')
    console.log(`${String(v.impresiones).padStart(5)}  ${String(v.clics).padStart(5)}  ${ctr.padStart(6)}  ${corta}`)
  }
  process.exit(0)
}

// ── Tráfico agregado ────────────────────────────────────────────────────────
const trafico = await pedir('GetRankAndTrafficStats')
if (trafico?.length) {
  const ultimos = trafico.slice(-28)
  const imp = ultimos.reduce((a, d) => a + (d.Impressions || 0), 0)
  const cli = ultimos.reduce((a, d) => a + (d.Clicks || 0), 0)
  console.log(`=== Bing, ${ultimos.length} días (${fecha(ultimos[0]?.Date)} a ${fecha(ultimos.at(-1)?.Date)}) ===`)
  console.log(`impresiones: ${imp}   clics: ${cli}   CTR: ${imp ? ((cli / imp) * 100).toFixed(2) + '%' : '—'}`)
  console.log('')
}

// ── Consultas ───────────────────────────────────────────────────────────────
const consultas = await pedir('GetQueryStats')
const lista = filtro
  ? consultas.filter((q) => (q.Query || '').toLowerCase().includes(filtro.toLowerCase()))
  : consultas

lista.sort((a, b) => b.Impressions - a.Impressions)

if (args.includes('--json')) {
  console.log(JSON.stringify(lista, null, 1))
  process.exit(0)
}

console.log(`=== ${lista.length} consultas${filtro ? ` que contienen "${filtro}"` : ''} ===`)
console.log('impr.  clics  CTR     pos.  consulta')
for (const q of lista.slice(0, filtro ? 100 : 40)) {
  const ctr = q.Impressions ? ((q.Clicks / q.Impressions) * 100).toFixed(1) + '%' : '—'
  const pos = q.AvgImpressionPosition ?? q.AvgClickPosition ?? '—'
  console.log(
    `${String(q.Impressions).padStart(5)}  ${String(q.Clicks).padStart(5)}  ${ctr.padStart(6)}  ${String(pos).padStart(4)}  ${q.Query}`,
  )
}
