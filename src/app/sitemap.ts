import { MetadataRoute } from 'next'
import { getAllEtfs } from '@/lib/etf-database'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { ETF_PAIRS, pairToSlug } from '@/data/etf-pairs'
import { ETF_THEMES } from '@/data/etf-themes'
import { GLOSSARY_TERMS } from '@/data/glossary'
import { BROKERS } from '@/data/brokers'
import { ROBOADVISORS } from '@/data/roboadvisors'
import { GESTORAS } from '@/data/gestoras'
import {
  POPULAR_ETF_TICKERS,
  COVERED_BROKER_SLUGS,
  getAvailability,
} from '@/data/etf-broker-availability'
import { INVESTOR_PROFILES } from '@/data/investor-profiles'
import { MONTHLY_AMOUNTS } from '@/data/monthly-amounts'
import { BROKER_PAIRS, brokerPairToSlug } from '@/data/broker-pairs'
import { OBJECTIVES } from '@/data/objectives'
import { ETF_ASPECTS } from '@/data/etf-aspects'
import { SECTORS } from '@/data/sectors'
import { COUNTRIES } from '@/data/countries'
import { AGES } from '@/data/ages'
import { getAllHistoricalCombos } from '@/data/historical-returns'
import { MODEL_PORTFOLIOS } from '@/data/model-portfolios'

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
    { path: '/broker',                       priority: 0.8, freq: 'monthly' },
    { path: '/roboadvisor',                  priority: 0.8, freq: 'monthly' },
    { path: '/gestora',                      priority: 0.7, freq: 'monthly' },
    { path: '/perfil',                       priority: 0.8, freq: 'monthly' },
    { path: '/invertir',                     priority: 0.8, freq: 'monthly' },
    { path: '/sector',                       priority: 0.7, freq: 'monthly' },
    { path: '/pais',                         priority: 0.7, freq: 'monthly' },
    { path: '/plan',                         priority: 0.8, freq: 'monthly' },
    { path: '/simulacion',                   priority: 0.7, freq: 'monthly' },
    { path: '/cartera',                      priority: 0.8, freq: 'monthly' },
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

  // Broker individual pages
  const brokerRoutes = BROKERS.map((b) => ({
    url: `${BASE_URL}/broker/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // Roboadvisor individual pages
  const roboadvisorRoutes = ROBOADVISORS.map((r) => ({
    url: `${BASE_URL}/roboadvisor/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // Gestora individual pages
  const gestoraRoutes = GESTORAS.map((g) => ({
    url: `${BASE_URL}/gestora/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Profile pages (perfiles de inversor)
  const profileRoutes = INVESTOR_PROFILES.map((p) => ({
    url: `${BASE_URL}/perfil/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Monthly amount pages (/invertir/[slug])
  const invertirRoutes = MONTHLY_AMOUNTS.map((m) => ({
    url: `${BASE_URL}/invertir/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Broker vs Broker comparison pages
  const vsBrokerRoutes = BROKER_PAIRS.map(([a, b]) => ({
    url: `${BASE_URL}/vs-broker/${brokerPairToSlug(a, b)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Objective pages /cuanto-necesito/[slug]
  const objectiveRoutes = OBJECTIVES.map((o) => ({
    url: `${BASE_URL}/cuanto-necesito/${o.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // Programmatic: comprar [ETF] en [broker] — high commercial intent
  const comprarRoutes: typeof staticRoutes = []
  for (const ticker of POPULAR_ETF_TICKERS) {
    for (const broker of COVERED_BROKER_SLUGS) {
      if (getAvailability(ticker, broker).available) {
        comprarRoutes.push({
          url: `${BASE_URL}/comprar/${ticker.toLowerCase()}/${broker}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })
      }
    }
  }

  // Programmatic: /analiza/[ticker]/[aspecto] (20 ETFs × 4 aspects = 80 pages)
  const analizaRoutes: typeof staticRoutes = []
  for (const ticker of POPULAR_ETF_TICKERS) {
    for (const aspect of ETF_ASPECTS) {
      analizaRoutes.push({
        url: `${BASE_URL}/analiza/${ticker.toLowerCase()}/${aspect.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.65,
      })
    }
  }

  // Sector individual pages
  const sectorRoutes = SECTORS.map((s) => ({
    url: `${BASE_URL}/sector/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  // Country individual pages
  const countryRoutes = COUNTRIES.map((c) => ({
    url: `${BASE_URL}/pais/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Programmatic: /plan/[edad]/[objetivo] — 8 ages × 10 objectives = 80 pages
  const planRoutes: typeof staticRoutes = []
  for (const age of AGES) {
    for (const obj of OBJECTIVES) {
      planRoutes.push({
        url: `${BASE_URL}/plan/${age.slug}/${obj.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    }
  }

  // Programmatic: /simulacion/[cantidad]/[ticker]/[ano] — 7×6×5 = up to 210 pages
  const simulacionRoutes = getAllHistoricalCombos().map(({ amount, ticker, year }) => ({
    url: `${BASE_URL}/simulacion/${amount}/${ticker.toLowerCase()}/${year}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  // Model portfolio pages
  const carteraRoutes = MODEL_PORTFOLIOS.map((p) => ({
    url: `${BASE_URL}/cartera/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [
    ...staticRoutes,
    ...etfRoutes,
    ...blogRoutes,
    ...pairRoutes,
    etfsIndexRoute,
    ...themeRoutes,
    ...glossaryRoutes,
    ...brokerRoutes,
    ...roboadvisorRoutes,
    ...gestoraRoutes,
    ...profileRoutes,
    ...invertirRoutes,
    ...vsBrokerRoutes,
    ...objectiveRoutes,
    ...comprarRoutes,
    ...analizaRoutes,
    ...sectorRoutes,
    ...countryRoutes,
    ...planRoutes,
    ...simulacionRoutes,
    ...carteraRoutes,
  ]
}
