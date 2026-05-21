const BASE_URL = 'https://boglehub.vercel.app'

const PUBLISHER = {
  '@type': 'Organization',
  name: 'BogleHub',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/api/og?title=BogleHub`,
  },
}

// ─── Schema type definitions ───────────────────────────────────────────────

interface OrganizationSchema {
  type: 'Organization'
}

interface WebApplicationSchema {
  type: 'WebApplication'
}

interface FAQSchema {
  type: 'FAQPage'
  questions: { q: string; a: string }[]
}

interface ArticleSchema {
  type: 'Article'
  headline: string
  description: string
  url: string
  datePublished: string
  /** Falls back to datePublished if not provided */
  dateModified?: string
  image?: string
}

interface BreadcrumbSchema {
  type: 'BreadcrumbList'
  items: { name: string; url: string }[]
}

type Schema =
  | OrganizationSchema
  | WebApplicationSchema
  | FAQSchema
  | ArticleSchema
  | BreadcrumbSchema

// ─── Component ─────────────────────────────────────────────────────────────

export function JsonLd({ schema }: { schema: Schema }) {
  let data: Record<string, unknown>

  if (schema.type === 'Organization') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BogleHub',
      url: BASE_URL,
      logo: `${BASE_URL}/api/og?title=BogleHub`,
      description: 'Análisis de cartera con IA para inversores indexados hispanos',
      inLanguage: 'es-ES',
    }
  } else if (schema.type === 'WebApplication') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'BogleHub',
      url: BASE_URL,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      description: 'Análisis de cartera de fondos indexados con IA en español',
      inLanguage: 'es-ES',
    }
  } else if (schema.type === 'FAQPage') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: schema.questions.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    }
  } else if (schema.type === 'Article') {
    const ogImage = schema.image ??
      `${BASE_URL}/api/og?title=${encodeURIComponent(schema.headline)}&subtitle=${encodeURIComponent('BogleHub')}`
    data = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: schema.headline,
      description: schema.description,
      url: schema.url,
      datePublished: schema.datePublished,
      dateModified: schema.dateModified ?? schema.datePublished,
      inLanguage: 'es-ES',
      author: PUBLISHER,
      publisher: PUBLISHER,
      image: {
        '@type': 'ImageObject',
        url: ogImage,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': schema.url,
      },
    }
  } else {
    // BreadcrumbList
    data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: schema.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
