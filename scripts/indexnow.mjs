/**
 * Envía las URLs del sitemap a IndexNow.
 *
 * IndexNow es el protocolo de aviso instantáneo que usan Bing, Yandex, Seznam
 * y Naver: en vez de esperar a que el crawler pase, le dices tú que una URL
 * existe o ha cambiado. Un solo POST admite hasta 10.000 URLs.
 *
 * POR QUÉ ESTO Y NO MÁS SOLICITUDES MANUALES EN GOOGLE.
 * Medido el 17-sep-2026 sobre 30 días de Vercel Analytics: el índice de Bing
 * —Bing, DuckDuckGo, Yahoo, Ecosia y Copilot, que todos lo comparten— nos trajo
 * 75 visitantes; el de Google, 34. Más del doble, y sin haber hecho nunca nada
 * para Bing. Google además solo admite 10-12 solicitudes manuales al día y las
 * pide una a una a mano; esto son 316 en una llamada y sin cuota.
 *
 * Uso:  node scripts/indexnow.mjs [--dry]
 * La clave se lee de .indexnow-key.local (no versionado) o de INDEXNOW_KEY.
 */

import { readFileSync } from 'node:fs'

const HOST = 'boglehub.com'
const SITEMAP = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const dry = process.argv.includes('--dry')

function leerClave() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim()
  try {
    return readFileSync(new URL('../.indexnow-key.local', import.meta.url), 'utf8').trim()
  } catch {
    console.error('No hay clave. Ponla en .indexnow-key.local o en INDEXNOW_KEY.')
    process.exit(1)
  }
}

async function urlsDelSitemap() {
  const res = await fetch(SITEMAP)
  if (!res.ok) throw new Error(`El sitemap respondió ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
}

/**
 * La clave tiene que estar SERVIDA antes de avisar, o IndexNow devuelve 403.
 * Comprobarlo aquí evita el fallo más habitual: enviar antes de que Vercel
 * haya desplegado el fichero.
 */
async function claveDesplegada(clave) {
  const url = `https://${HOST}/${clave}.txt`
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return { ok: false, motivo: `HTTP ${res.status}` }
    const cuerpo = (await res.text()).trim()
    if (cuerpo !== clave) return { ok: false, motivo: 'el fichero no contiene la clave' }
    return { ok: true }
  } catch (e) {
    return { ok: false, motivo: e.message }
  }
}

const clave = leerClave()
const urls = await urlsDelSitemap()
console.log(`Sitemap: ${urls.length} URLs`)

const estado = await claveDesplegada(clave)
if (!estado.ok) {
  console.error(`La clave NO está servida en https://${HOST}/<clave>.txt — ${estado.motivo}`)
  console.error('Despliega primero (push a main) y vuelve a ejecutar.')
  process.exit(1)
}
console.log('Clave verificada en producción.')

if (dry) {
  console.log('--dry: no se envía nada. Primeras 5 URLs:')
  urls.slice(0, 5).forEach((u) => console.log('  ' + u))
  process.exit(0)
}

for (let i = 0; i < urls.length; i += 10000) {
  const lote = urls.slice(i, i + 10000)
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: clave,
      keyLocation: `https://${HOST}/${clave}.txt`,
      urlList: lote,
    }),
  })
  const cuerpo = await res.text()
  console.log(`Lote de ${lote.length}: HTTP ${res.status} ${res.statusText}${cuerpo ? ' — ' + cuerpo.slice(0, 200) : ''}`)
  if (res.status !== 200 && res.status !== 202) {
    console.error('Respuesta no esperada.')
    console.error('  403 SiteVerificationNotCompleted -> la clave esta servida pero Bing aun no la ha')
    console.error('      validado. Pasa en el PRIMER envio de un dominio: espera y reintenta, no toques nada.')
    console.error('  403 (otro motivo) -> la clave no coincide con el fichero servido.')
    console.error('  422 -> hay URLs que no son de este host. 429 -> demasiados envios.')
    process.exit(1)
  }
}
console.log('Enviado. Bing suele reflejarlo en Webmaster Tools en horas, no semanas.')
