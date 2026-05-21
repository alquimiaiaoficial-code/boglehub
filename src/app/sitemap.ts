import { MetadataRoute } from 'next'
import { getAllEtfs } from '@/lib/etf-database'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { ETF_PAIRS, pairToSlug } from '@/data/etf-pairs'

const BASE_URL = 'https://boglehub.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // Prioridades por tipo de contenido:
  // 1.0 = home | 0.9 = herramientas core | 0.8 = blog hub + calculadoras | 0.5 = metodología | 0.3 = legales
  const staticRoutes: Array<{ url: string; lastModified: Date; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }> = [
    { path: '',                              priority: 1.0, freq: 'weekly'  },
    { path: '/analyzer',                     priority: 0.9, freq: 'weekly'  },
    { path: '/comparar',                     priority: 0.9, freq: 'weekly'  },
    { path: '/chat',                         priority: 0.9, freq: 'weekly'  },
    { path: '/blog',                         priority: 0.8, freq: 'weekly'  },
    { path: '/calculadora/interes-compuesto',priority: 0.8, freq: 'monthly' },
    { path: '/calculadora/fire-monte-carlo', priority: 0.8, freq: 'monthly' },
    { path: '/score',                        priority: 0.6, freq: 'monthly' },
    { path: '/metodologia',                  priority: 0.5, freq: 'monthly' },
    { path: '/aviso-legal',                  priority: 0.3, freq: 'yearly'  },
    { path: '/privacidad',                   priority: 0.3, freq: 'yearly'  },
    { path: '/terminos',                     priority: 0.3, freq: 'yearly'  },
  ].map(({ path, priority, freq }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as 'weekly' | 'monthly' | 'yearly',
    priority,
  }))

  const etfRoutes = getAllEtfs().map(etf => ({
    url: `${BASE_URL}/etf/${etf.ticker.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogRoutes = BLOG_ARTICLES.map(article => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const pairRoutes = ETF_PAIRS.map(([a, b]) => ({
    url: `${BASE_URL}/comparar/${pairToSlug(a, b)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticRoutes, ...etfRoutes, ...blogRoutes, ...pairRoutes]
}
