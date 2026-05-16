import { MetadataRoute } from 'next'
import { getAllEtfs } from '@/lib/etf-database'
import { BLOG_ARTICLES } from '@/data/blog-articles'

const BASE_URL = 'https://boglehub.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/analyzer',
    '/chat',
    '/blog',
    '/metodologia',
    '/aviso-legal',
    '/privacidad',
    '/terminos',
    '/calculadora/interes-compuesto',
    '/calculadora/fire-monte-carlo',
    '/comparar',
  ].map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const etfRoutes = getAllEtfs().map(etf => ({
    url: `${BASE_URL}/etf/${etf.ticker.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const blogRoutes = BLOG_ARTICLES.map(article => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...etfRoutes, ...blogRoutes]
}
