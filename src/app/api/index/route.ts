import { BLOG_ARTICLES } from '@/data/blog-articles'
import { GLOSSARY_TERMS } from '@/data/glossary'
import { ETF_THEMES } from '@/data/etf-themes'
import { ETF_PAIRS, pairToSlug } from '@/data/etf-pairs'
import { getAllEtfs } from '@/lib/etf-database'

export const dynamic = 'force-static'
export const revalidate = false

const BASE_URL = 'https://boglehub.com'

/**
 * API pública: índice raíz del contenido estructurado de BogleHub.
 *
 * Discovery endpoint: lista todos los endpoints API disponibles, total
 * de contenido por tipo y URLs absolutas para que un LLM o agente pueda
 * navegar el grafo de contenido completo desde una sola petición.
 */
export async function GET() {
  const etfs = getAllEtfs()

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'DataCatalog',
    '@id': `${BASE_URL}/api`,
    name: 'BogleHub Open Data',
    description:
      'API pública de BogleHub: catálogo de ETFs UCITS, glosario de inversión, artículos del blog y datos fiscales para residentes en España. Formato JSON-LD según schema.org. Uso libre con atribución.',
    url: `${BASE_URL}/api`,
    inLanguage: 'es-ES',
    license: 'Información educativa, uso libre con atribución a boglehub.com',
    dateModified: new Date().toISOString().split('T')[0],
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'BogleHub',
      url: BASE_URL,
    },
    dataset: [
      {
        '@type': 'Dataset',
        '@id': `${BASE_URL}/api/etfs`,
        name: 'Catálogo de ETFs UCITS',
        description: `${etfs.length} ETFs UCITS disponibles para inversores españoles con TER, ISIN, política de reparto, distribución geográfica y grado fiscal.`,
        url: `${BASE_URL}/api/etfs`,
        encodingFormat: 'application/json',
        numberOfItems: etfs.length,
      },
      {
        '@type': 'Dataset',
        '@id': `${BASE_URL}/api/glossary`,
        name: 'Glosario de inversión indexada',
        description: `${GLOSSARY_TERMS.length} términos financieros definidos para inversores indexados en España.`,
        url: `${BASE_URL}/api/glossary`,
        encodingFormat: 'application/json',
        numberOfItems: GLOSSARY_TERMS.length,
      },
      {
        '@type': 'Dataset',
        '@id': `${BASE_URL}/api/articles`,
        name: 'Artículos del blog',
        description: `${BLOG_ARTICLES.length} artículos sobre ETFs, fiscalidad, brokers, roboadvisors y FIRE.`,
        url: `${BASE_URL}/api/articles`,
        encodingFormat: 'application/json',
        numberOfItems: BLOG_ARTICLES.length,
      },
    ],
    keywords: [
      'ETFs UCITS',
      'inversión indexada',
      'Boglehead',
      'fiscalidad España',
      'IRPF ahorro',
      'plan de pensiones',
      'roboadvisor',
      'FIRE',
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'totalETFs',
        value: etfs.length,
      },
      {
        '@type': 'PropertyValue',
        name: 'totalGlossaryTerms',
        value: GLOSSARY_TERMS.length,
      },
      {
        '@type': 'PropertyValue',
        name: 'totalBlogArticles',
        value: BLOG_ARTICLES.length,
      },
      {
        '@type': 'PropertyValue',
        name: 'totalETFCategories',
        value: ETF_THEMES.length,
      },
      {
        '@type': 'PropertyValue',
        name: 'totalETFComparisons',
        value: ETF_PAIRS.length,
      },
      {
        '@type': 'PropertyValue',
        name: 'llmsTxtUrl',
        value: `${BASE_URL}/llms.txt`,
      },
      {
        '@type': 'PropertyValue',
        name: 'llmsFullTxtUrl',
        value: `${BASE_URL}/llms-full.txt`,
      },
    ],
    // Cross-links útiles para LLMs navegando el catálogo
    relatedLink: [
      { '@type': 'WebPage', url: `${BASE_URL}/llms.txt`, name: 'LLMs Index (markdown)' },
      { '@type': 'WebPage', url: `${BASE_URL}/llms-full.txt`, name: 'LLMs Full Knowledge (markdown)' },
      { '@type': 'WebPage', url: `${BASE_URL}/sitemap.xml`, name: 'XML Sitemap' },
      { '@type': 'WebPage', url: `${BASE_URL}/datos-clave`, name: 'Datos clave 2026 (HTML)' },
      { '@type': 'WebPage', url: `${BASE_URL}/faq`, name: 'Preguntas frecuentes (HTML)' },
      { '@type': 'WebPage', url: `${BASE_URL}/sobre`, name: 'Sobre BogleHub (HTML)' },
      { '@type': 'WebPage', url: `${BASE_URL}/metodologia`, name: 'Metodología (HTML)' },
    ],
    // Sample comparison URLs for discovery
    exampleQuery: [
      `${BASE_URL}/comparar/${pairToSlug(ETF_PAIRS[0][0], ETF_PAIRS[0][1])}`,
      `${BASE_URL}/glosario/ter`,
      `${BASE_URL}/etf/vwce`,
      `${BASE_URL}/blog/como-elegir-tu-primer-etf-espana-2026`,
    ],
  }

  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
