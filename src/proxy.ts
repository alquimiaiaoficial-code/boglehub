import { estaRetirada } from '@/lib/seo-index-policy'

/**
 * Sirve 410 Gone en las familias de páginas que se borraron el 19-sep-2026.
 *
 * Por qué existe un proxy para esto. Sin él, borrar las carpetas deja las URLs en 404, y
 * 404 y 410 no dicen lo mismo a un buscador: 404 es «ahora mismo no la encuentro», que se
 * reintenta durante meses; 410 es «existió y ya no existe», que es literalmente el caso.
 * Con 410 salen antes del índice y dejan de gastar rastreo, que es el recurso que a este
 * dominio le falta (el 43 % del sitemap no se ha rastreado NUNCA).
 *
 * Qué se borró y por qué está en `FAMILIAS_RETIRADAS`, con los números de las dos
 * mediciones que lo justifican. Aquí solo se sirve la respuesta.
 *
 * ⚠️ `config.matcher` tiene que ser un literal: Next lo lee en el build, antes de ejecutar
 * nada, así que no se puede derivar de la constante importada por mucho que apetezca. Los
 * dos sitios se mantienen a mano y hay un test que salta si dejan de coincidir
 * (`familias-retiradas.test.ts`), que es lo más cerca de una fuente única que se puede
 * estar sin romper el build.
 *
 * En Next 16 el middleware pasó a llamarse Proxy. La función es la misma.
 */
export function proxy(request: Request): Response | undefined {
  const { pathname } = new URL(request.url)
  if (!estaRetirada(pathname)) return undefined
  return new Response(paginaIda(pathname), {
    status: 410,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      // Por si acaso alguna quedara en algún índice: que no vuelva a entrar.
      'x-robots-tag': 'noindex',
      // Sin caché: si mañana se revive una familia, no queremos 410 pegados en el CDN.
      'cache-control': 'no-store',
    },
  })
}

/** Para quien llegue de verdad: decirle qué pasó y a dónde ir. Sin adornos. */
function paginaIda(pathname: string): string {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Esta página ya no existe · BogleHub</title>
<style>
  :root { color-scheme: light dark }
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; padding: 3rem 1.25rem; max-width: 38rem; margin-inline: auto }
  h1 { font-size: 1.5rem; margin: 0 0 1rem }
  code { background: rgba(127,127,127,.18); padding: .1em .35em; border-radius: 3px; word-break: break-all }
  a { color: inherit }
  ul { padding-left: 1.2rem }
</style>
</head>
<body>
<h1>Esta página ya no existe</h1>
<p><code>${pathname.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)}</code> era una de un grupo de páginas que se generaban automáticamente combinando cifras, tickers y plazos. Las retiramos porque repetían lo mismo con los números cambiados y no aportaban nada que no estuviera mejor explicado en otro sitio.</p>
<p>Lo que probablemente buscabas:</p>
<ul>
  <li><a href="/analyzer">Analizador de cartera</a>, que lee fondos indexados y ETFs y dice de dónde sale cada número.</li>
  <li><a href="/calculadora/interes-compuesto">Calculadoras</a>, si venías por una proyección.</li>
  <li><a href="/blog">Artículos</a> y <a href="/glosario">glosario</a>.</li>
</ul>
<p><a href="/">Volver a la portada</a></p>
</body>
</html>`
}

export const config = {
  // Debe coincidir con FAMILIAS_RETIRADAS. Lo comprueba familias-retiradas.test.ts.
  matcher: [
    '/dca/:path*',
    '/comprar/:path*',
    '/ahorrar/:path*',
    '/analiza/:path*',
    '/comparar-cartera/:path*',
  ],
}
