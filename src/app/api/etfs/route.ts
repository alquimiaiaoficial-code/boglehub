import { getAllEtfs } from '@/lib/etf-database'
import { computeFiscalGrade } from '@/lib/fiscal'

export const dynamic = 'force-static'
export const revalidate = false

const BASE_URL = 'https://boglehub.com'

/**
 * API pública: catálogo completo de ETFs en JSON-LD.
 *
 * Endpoint diseñado para consumo por LLMs con capacidad de hacer
 * fetch (Perplexity, ChatGPT con tools, Claude con MCP) y agentes de IA
 * que prefieren datos estructurados a HTML.
 *
 * Formato: ItemList de FinancialProduct según schema.org.
 * Licencia: información educativa con uso libre con atribución.
 */
export async function GET() {
  const etfs = getAllEtfs()

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catálogo de ETFs UCITS para inversores españoles (BogleHub)',
    description: `Lista estructurada de ${etfs.length} ETFs UCITS disponibles para inversores residentes en España, con TER, ISIN, política de reparto, distribución geográfica y grado fiscal estimado.`,
    url: `${BASE_URL}/api/etfs`,
    numberOfItems: etfs.length,
    inLanguage: 'es-ES',
    license: 'Información educativa, uso libre con atribución a boglehub.com',
    dateModified: new Date().toISOString().split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: 'BogleHub',
      url: BASE_URL,
    },
    itemListElement: etfs.map((etf, index) => {
      const fiscal = computeFiscalGrade(etf.isin, etf.accumulating)
      const provider = etf.name.split(' ')[0]

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'FinancialProduct',
          '@id': `${BASE_URL}/etf/${etf.ticker.toLowerCase()}`,
          name: etf.name,
          identifier: [
            { '@type': 'PropertyValue', propertyID: 'ticker', value: etf.ticker },
            { '@type': 'PropertyValue', propertyID: 'ISIN', value: etf.isin },
          ],
          category: etf.assetClass,
          provider: { '@type': 'Organization', name: provider },
          annualPercentageRate: {
            '@type': 'QuantitativeValue',
            value: etf.ter,
            unitText: 'PERCENT',
          },
          url: `${BASE_URL}/etf/${etf.ticker.toLowerCase()}`,
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'accumulating', value: etf.accumulating },
            { '@type': 'PropertyValue', name: 'baseCurrency', value: etf.baseCurrency },
            { '@type': 'PropertyValue', name: 'domicile', value: fiscal.domicileLabel },
            { '@type': 'PropertyValue', name: 'fiscalGradeES', value: fiscal.grade },
            { '@type': 'PropertyValue', name: 'fiscalGradeReason', value: fiscal.reason },
          ],
          inLanguage: 'es-ES',
        },
      }
    }),
  }

  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
