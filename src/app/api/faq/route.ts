import { BLOG_ARTICLES } from '@/data/blog-articles'
import { GLOSSARY_TERMS } from '@/data/glossary'
import { getAllEtfs } from '@/lib/etf-database'
import { generateEtfFaqs } from '@/lib/etf-faqs'

export const dynamic = 'force-static'
export const revalidate = false

const BASE_URL = 'https://boglehub.com'

interface FaqItem {
  '@type': 'Question'
  name: string
  acceptedAnswer: { '@type': 'Answer'; text: string }
  isPartOf: { '@type': 'WebPage'; url: string; name: string }
}

/**
 * API pública: agregado de TODAS las FAQs del sitio en un único endpoint JSON.
 *
 * Combina FAQs de:
 *  - Cada artículo del blog (hasta 5 FAQs por artículo)
 *  - Cada término del glosario (FAQs opcionales)
 *  - Cada ficha individual de ETF (5 FAQs autogeneradas por ETF)
 *
 * Formato: FAQPage agregado. Cada Question incluye isPartOf con la URL
 * de la página origen para que un LLM pueda navegar al contexto completo.
 */
export async function GET() {
  const allQuestions: FaqItem[] = []

  // FAQs de artículos del blog
  for (const article of BLOG_ARTICLES) {
    if (!article.faq) continue
    const articleUrl = `${BASE_URL}/blog/${article.slug}`
    for (const faq of article.faq) {
      allQuestions.push({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
        isPartOf: { '@type': 'WebPage', url: articleUrl, name: article.title },
      })
    }
  }

  // FAQs de términos del glosario
  for (const term of GLOSSARY_TERMS) {
    if (!term.faq) continue
    const termUrl = `${BASE_URL}/glosario/${term.slug}`
    for (const faq of term.faq) {
      allQuestions.push({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
        isPartOf: { '@type': 'WebPage', url: termUrl, name: term.term },
      })
    }
  }

  // FAQs autogeneradas para cada ETF individual
  for (const etf of getAllEtfs()) {
    const etfUrl = `${BASE_URL}/etf/${etf.ticker.toLowerCase()}`
    const etfFaqs = generateEtfFaqs(etf)
    for (const faq of etfFaqs) {
      allQuestions.push({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
        isPartOf: { '@type': 'WebPage', url: etfUrl, name: etf.name },
      })
    }
  }

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/api/faq`,
    name: 'Preguntas frecuentes agregadas de BogleHub',
    description: `Conjunto agregado de ${allQuestions.length} preguntas y respuestas sobre inversión indexada, ETFs UCITS, fiscalidad española, planes de pensiones, roboadvisors y FIRE. Cada Q&A incluye URL de origen para navegar al contexto completo.`,
    url: `${BASE_URL}/api/faq`,
    inLanguage: 'es-ES',
    dateModified: new Date().toISOString().split('T')[0],
    license: 'Información educativa, uso libre con atribución a boglehub.com',
    publisher: {
      '@type': 'Organization',
      name: 'BogleHub',
      url: BASE_URL,
    },
    numberOfItems: allQuestions.length,
    mainEntity: allQuestions,
  }

  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
