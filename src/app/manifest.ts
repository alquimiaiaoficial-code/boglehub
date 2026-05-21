import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BogleHub — Análisis de carteras indexadas',
    short_name: 'BogleHub',
    description:
      'Analiza tu cartera de fondos indexados y ETFs con IA. Gratis, en español, sin registro. Tus datos viven en tu navegador.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    orientation: 'portrait',
    lang: 'es-ES',
    dir: 'ltr',
    icons: [
      {
        src: '/logo-512.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/logo-512.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    categories: ['finance', 'productivity', 'education'],
  }
}
