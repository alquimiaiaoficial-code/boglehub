/* BogleHub service worker — v1.
 *
 * Minimal cache strategy:
 *   - Navigations (HTML): network-first with cache fallback.
 *   - Static assets (JS/CSS/images): stale-while-revalidate.
 *   - API routes: never cached (always fresh).
 *
 * Datos del usuario nunca se cachean en el SW; viven en localStorage del
 * navegador. Este SW solo acelera la carga del shell.
 */

const CACHE = 'boglehub-shell-v1'
const PRECACHE = ['/']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => {})
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith('/api/')) return

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const clone = res.clone()
            caches.open(CACHE).then((c) => c.put(req, clone)).catch(() => {})
          }
          return res
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match('/'))
        )
    )
    return
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetched = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const clone = res.clone()
            caches.open(CACHE).then((c) => c.put(req, clone)).catch(() => {})
          }
          return res
        })
        .catch(() => cached)
      return cached || fetched
    })
  )
})
