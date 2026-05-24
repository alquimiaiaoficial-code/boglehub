import { GLOSSARY_TERMS, CATEGORY_LABELS } from '@/data/glossary'

export const dynamic = 'force-static'
export const revalidate = false

const BASE_URL = 'https://boglehub.com'

/**
 * API pública: glosario completo en JSON-LD.
 * Formato: DefinedTermSet con todos los términos como DefinedTerm.
 */
export async function GET() {
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${BASE_URL}/api/glossary`,
    name: 'Glosario de inversión indexada y ETFs para España',
    description: `Glosario completo con ${GLOSSARY_TERMS.length} términos esenciales para inversión indexada en España: definiciones, ejemplos prácticos y URLs.`,
    url: `${BASE_URL}/glosario`,
    inLanguage: 'es-ES',
    dateModified: new Date().toISOString().split('T')[0],
    license: 'Información educativa, uso libre con atribución a boglehub.com',
    publisher: {
      '@type': 'Organization',
      name: 'BogleHub',
      url: BASE_URL,
    },
    numberOfItems: GLOSSARY_TERMS.length,
    hasDefinedTerm: GLOSSARY_TERMS.map((term) => ({
      '@type': 'DefinedTerm',
      '@id': `${BASE_URL}/glosario/${term.slug}`,
      name: term.term,
      alternateName: term.fullForm,
      description: term.shortDefinition,
      url: `${BASE_URL}/glosario/${term.slug}`,
      inLanguage: 'es-ES',
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'category',
          value: term.category,
        },
        {
          '@type': 'PropertyValue',
          name: 'categoryLabel',
          value: CATEGORY_LABELS[term.category],
        },
        {
          '@type': 'PropertyValue',
          name: 'longDefinition',
          value: term.longDefinition,
        },
        ...(term.example
          ? [{ '@type': 'PropertyValue', name: 'example', value: term.example }]
          : []),
      ],
    })),
  }

  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
