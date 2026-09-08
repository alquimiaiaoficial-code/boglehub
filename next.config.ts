import type { NextConfig } from "next";

/**
 * Link header values que anunciamos en cada respuesta HTML.
 * Usa el formato RFC 8288 (Web Linking) para que crawlers y agentes
 * descubran recursos relacionados sin parsear HTML.
 *
 * Algunos LLM crawlers en 2026 ya leen estos headers preferentemente
 * antes de fetchear el HTML completo.
 */
const LINK_HEADER = [
  '<https://boglehub.com/llms.txt>; rel="describedby"; type="text/markdown"; title="LLMs index"',
  '<https://boglehub.com/llms-full.txt>; rel="alternate"; type="text/markdown"; title="LLMs full knowledge"',
  '<https://boglehub.com/api/index>; rel="alternate"; type="application/ld+json"; title="API discovery (JSON-LD)"',
  '<https://boglehub.com/.well-known/openapi.json>; rel="service-desc"; type="application/json"; title="OpenAPI 3.1 spec"',
  '<https://boglehub.com/.well-known/ai-plugin.json>; rel="service-meta"; type="application/json"; title="AI plugin manifest"',
  '<https://boglehub.com/sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(', ')

const nextConfig: NextConfig = {
  /**
   * Sin source maps en producción.
   *
   * Añadido el 8-sep-2026, cuando Vercel avisó de que el plan gratuito estaba al 100 % de
   * sus 10 GB de almacenamiento de despliegues. Al medir el build salieron **430 ficheros
   * .map ocupando 49 MB** de los ~356 MB de cada despliegue: source maps del servidor, que
   * solo sirven para depurar y que en producción no lee nadie.
   *
   * El fundador es menor y no puede contratar el plan Pro, así que reducir no es una
   * preferencia: es la única salida disponible.
   *
   * Documentado en `node_modules/next/dist/docs/01-app/02-guides/memory-usage.md`.
   * Si algún día hace falta depurar un error de servidor en producción, se vuelven a
   * activar temporalmente y se desactivan después.
   */
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },

  async redirects() {
    return [
      {
        // 301 permanente de boglehub.vercel.app → boglehub.com
        // Requerido para Google Search Console Change of Address
        source: '/:path*',
        has: [{ type: 'host', value: 'boglehub.vercel.app' }],
        destination: 'https://boglehub.com/:path*',
        statusCode: 301,
      },
    ]
  },

  async headers() {
    return [
      // GEO: anunciar recursos para LLMs en cada respuesta del sitio
      {
        source: '/(.*)',
        headers: [
          { key: 'Link', value: LINK_HEADER },
          // Permitir indexación explícita y referencias por AI Overview / SGE
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        ],
      },

      // CORS y cache agresivo para APIs JSON-LD
      {
        source: '/api/(etfs|glossary|articles|index|data-tables|faq)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },

      // CORS abierto y cache largo para llms.txt y llms-full.txt
      {
        source: '/(llms.txt|llms-full.txt|ai.txt)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' },
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        ],
      },

      // CORS abierto para .well-known
      {
        source: '/.well-known/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ]
  },
}

export default nextConfig;
