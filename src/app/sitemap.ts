import { MetadataRoute } from 'next'
import { getAllEtfs } from '@/lib/etf-database'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { ETF_PAIRS, pairToSlug } from '@/data/etf-pairs'
import { ETF_THEMES } from '@/data/etf-themes'
import { GLOSSARY_TERMS } from '@/data/glossary'

const BASE_URL = 'https://boglehub.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Prioridades por tipo de contenido:
  // 1.0 = home | 0.9 = herramientas core | 0.8 = blog hub + calculadoras | 0.5 = metodología | 0.3 = legales
  const staticRoutes: Array<{ url: string; lastModified: Date; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }> = [
    { path: '',                              priority: 1.0, freq: 'weekly'  },
    { path: '/empezar',                      priority: 0.9, freq: 'monthly' },
    { path: '/analyzer',                     priority: 0.9, freq: 'weekly'  },
    { path: '/etf',                            priority: 0.8, freq: 'monthly' },
    { path: '/comparar',                     priority: 0.9, freq: 'weekly'  },
    { path: '/chat',                         priority: 0.9, freq: 'weekly'  },
    { path: '/blog',                         priority: 0.8, freq: 'weekly'  },
    { path: '/glosario',                     priority: 0.7, freq: 'monthly' },
    { path: '/faq',                          priority: 0.8, freq: 'monthly' },
    { path: '/datos-clave',                  priority: 0.8, freq: 'monthly' },
    { path: '/llms',                         priority: 0.5, freq: 'monthly' },
    { path: '/calculadora',                  priority: 0.8, freq: 'monthly' },
    { path: '/calculadora/interes-compuesto',priority: 0.8, freq: 'monthly' },
    { path: '/calculadora/fire-monte-carlo', priority: 0.8, freq: 'monthly' },
    { path: '/calculadora/roboadvisor-vs-diy', priority: 0.8, freq: 'monthly' },
    { path: '/calculadora/irpf-venta-fondos', priority: 0.8, freq: 'monthly' },
    { path: '/calculadora/comparar-brokers', priority: 0.8, freq: 'monthly' },
    { path: '/score',                        priority: 0.6, freq: 'monthly' },
    { path: '/sobre',                        priority: 0.7, freq: 'monthly' },
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

  // ETF category/theme pages (/etfs/[tema]) — high-value keyword landing pages
  const etfsIndexRoute = {
    url: `${BASE_URL}/etfs`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }
  const themeRoutes = ETF_THEMES.map((theme) => ({
    url: `${BASE_URL}/etfs/${theme.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Glossary term pages — informational queries ("qué es X")
  const glossaryRoutes = GLOSSARY_TERMS.map((term) => ({
    url: `${BASE_URL}/glosario/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...etfRoutes,
    ...blogRoutes,
    ...pairRoutes,
    etfsIndexRoute,
    ...themeRoutes,
    ...glossaryRoutes,
  ]
}
