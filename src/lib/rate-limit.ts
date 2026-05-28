import { LRUCache } from 'lru-cache'

/**
 * Rate limiting por IP, en memoria (LRU).
 *
 * Limitación conocida: en serverless cada instancia tiene su propia memoria,
 * así que el contador es por instancia, no global. Frena el abuso trivial (un
 * curl en bucle desde una IP golpea instancias calientes y se corta) sin
 * necesidad de Redis ni BD. Para protección global de verdad haría falta un
 * store compartido (Upstash, Vercel KV) o el firewall de Vercel.
 *
 * Ventana fija de 15 min: el TTL se fija en la primera petición y no se
 * refresca en las siguientes (noUpdateTTL), para que un usuario legítimo que
 * reintenta no quede bloqueado indefinidamente.
 */

const WINDOW_MS = 1000 * 60 * 15

const cache = new LRUCache<string, number>({
  max: 5000,
  ttl: WINDOW_MS,
  noUpdateTTL: true,
})

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}

/**
 * Devuelve null si la petición pasa el límite, o una respuesta 429 (con
 * cabecera Retry-After) si lo supera. Llamar al principio del handler.
 *
 * @param route  identificador de la ruta, para contar cada endpoint por separado
 * @param max    peticiones permitidas por IP en la ventana de 15 min
 */
export function rateLimit(req: Request, route: string, max: number): Response | null {
  const key = `${route}:${getClientIp(req)}`
  const count = cache.get(key) ?? 0

  if (count >= max) {
    const retryAfter = Math.max(1, Math.ceil(cache.getRemainingTTL(key) / 1000))
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Demasiadas peticiones. Espera unos minutos e inténtalo de nuevo.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
        },
      }
    )
  }

  cache.set(key, count + 1)
  return null
}
