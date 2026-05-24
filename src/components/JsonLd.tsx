const BASE_URL = 'https://boglehub.com'

/**
 * Publisher / Organization compartida en todos los schemas relevantes.
 * Mantiene consistencia en señales de E-E-A-T para Google y para LLMs.
 */
const PUBLISHER = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'BogleHub',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/api/og?title=BogleHub`,
  },
}

/**
 * Author de los artículos: equipo editorial de BogleHub.
 * Identificado como Organization (no Person) porque el contenido es
 * colectivo y revisado por la comunidad. Le damos un @id propio para
 * que los LLMs puedan referenciarlo como entidad distinta del Publisher.
 */
const AUTHOR = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#author`,
  name: 'BogleHub Editorial',
  url: `${BASE_URL}/sobre`,
  description:
    'Equipo editorial de BogleHub. Contenido educativo sobre inversión indexada en español, independiente y revisado por la comunidad Boglehead.',
  knowsAbout: [
    'inversión indexada',
    'ETFs UCITS',
    'fiscalidad española de fondos',
    'planes de pensiones',
    'roboadvisors',
    'FIRE',
    'filosofía Boglehead',
  ],
  parentOrganization: { '@id': `${BASE_URL}/#organization` },
}

// ─── Schema type definitions ───────────────────────────────────────────────

interface OrganizationSchema {
  type: 'Organization'
}

interface WebSiteSchema {
  type: 'WebSite'
}

interface WebApplicationSchema {
  type: 'WebApplication'
}

interface FAQSchema {
  type: 'FAQPage'
  questions: { q: string; a: string }[]
}

interface QAPageSchema {
  type: 'QAPage'
  question: string
  answer: string
  url: string
}

interface SpeakableSchema {
  type: 'Speakable'
  url: string
  /** CSS selectors of elements that should be readable by voice assistants */
  cssSelectors: string[]
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
  /** Words count for richer signals (optional) */
  wordCount?: number
  /** Article section / category */
  articleSection?: string
  /** Keywords list */
  keywords?: string[]
}

interface BreadcrumbSchema {
  type: 'BreadcrumbList'
  items: { name: string; url: string }[]
}

interface HowToSchema {
  type: 'HowTo'
  name: string
  description: string
  url: string
  totalTime?: string
  estimatedCost?: { currency: string; value: string | number }
  steps: { name: string; text: string; url?: string }[]
}

interface DefinedTermSchema {
  type: 'DefinedTerm'
  name: string
  description: string
  url: string
  /** Optional inDefinedTermSet URL */
  termSetUrl?: string
  /** Optional alternate name (acronym, full form) */
  alternateName?: string
}

interface DefinedTermSetSchema {
  type: 'DefinedTermSet'
  name: string
  description: string
  url: string
  hasDefinedTerm: { name: string; url: string; description?: string }[]
}

interface SoftwareAppSchema {
  type: 'SoftwareApplication'
  name: string
  description: string
  url: string
  applicationCategory?: string
  /** Aggregate rating optional */
  aggregateRating?: { ratingValue: number; ratingCount: number }
}

interface DatasetSchema {
  type: 'Dataset'
  name: string
  description: string
  url: string
  keywords?: string[]
  variableMeasured?: string[]
  license?: string
}

interface FinancialProductSchema {
  type: 'FinancialProduct'
  name: string
  description: string
  url: string
  category: string
  /** Annual cost as percent string, e.g. "0.22%" */
  annualFee?: string
  /** Provider name */
  provider?: string
  /** Optional ISIN */
  isin?: string
}

interface CollectionPageSchema {
  type: 'CollectionPage'
  name: string
  description: string
  url: string
  /** Optional list of items in the collection */
  hasPart?: { name: string; url: string }[]
}

type Schema =
  | OrganizationSchema
  | WebSiteSchema
  | WebApplicationSchema
  | FAQSchema
  | QAPageSchema
  | SpeakableSchema
  | ArticleSchema
  | BreadcrumbSchema
  | HowToSchema
  | DefinedTermSchema
  | DefinedTermSetSchema
  | SoftwareAppSchema
  | DatasetSchema
  | FinancialProductSchema
  | CollectionPageSchema

// ─── Component ─────────────────────────────────────────────────────────────

export function JsonLd({ schema }: { schema: Schema }) {
  let data: Record<string, unknown>

  if (schema.type === 'Organization') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'BogleHub',
      alternateName: ['BogleHub.com', 'Boglehub'],
      url: BASE_URL,
      logo: `${BASE_URL}/api/og?title=BogleHub`,
      description:
        'Plataforma educativa gratuita en español sobre inversión indexada para residentes en España. Análisis de carteras con IA, comparador de ETFs UCITS, calculadoras y guías Boglehead.',
      inLanguage: 'es-ES',
      foundingDate: '2025',
      areaServed: [
        { '@type': 'Country', name: 'España' },
        { '@type': 'Country', name: 'México' },
        { '@type': 'Country', name: 'Argentina' },
        { '@type': 'Country', name: 'Colombia' },
        { '@type': 'Country', name: 'Chile' },
        { '@type': 'Country', name: 'Perú' },
      ],
      knowsAbout: [
        'Inversión indexada',
        'ETFs UCITS',
        'Filosofía Boglehead',
        'Fiscalidad de ETFs en España',
        'Plan de pensiones indexado',
        'Roboadvisors',
        'FIRE (Financial Independence Retire Early)',
        'Cartera permanente Harry Browne',
        'MSCI World',
        'S&P 500',
        'FTSE All-World',
        'Interés compuesto',
        'DCA (Dollar Cost Averaging)',
        'IRPF del ahorro',
        'Análisis de cartera con IA',
      ],
      audience: {
        '@type': 'Audience',
        name: 'Inversores indexados hispanohablantes',
        geographicArea: [
          { '@type': 'Country', name: 'España' },
        ],
      },
      sameAs: [
        // Añadir perfiles sociales cuando existan, por ejemplo:
        // 'https://twitter.com/boglehub',
        // 'https://github.com/boglehub',
      ],
    }
  } else if (schema.type === 'WebSite') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'BogleHub',
      description: 'Análisis de cartera con IA para inversores indexados en España',
      inLanguage: 'es-ES',
      publisher: { '@id': `${BASE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }
  } else if (schema.type === 'WebApplication') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'BogleHub',
      url: BASE_URL,
      applicationCategory: 'FinanceApplication',
      applicationSubCategory: 'PortfolioAnalysis',
      operatingSystem: 'Web',
      browserRequirements: 'JavaScript habilitado',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
      description:
        'Análisis de cartera de fondos indexados con IA en español. Gratis, sin registro, datos en el navegador del usuario.',
      inLanguage: 'es-ES',
      featureList: [
        'Análisis automático de cartera con IA (Llama 3.3 70B)',
        'Comparador de 68 ETFs UCITS',
        'Calculadora de interés compuesto',
        'Calculadora FIRE con simulación Monte Carlo',
        'Calculadora de IRPF para venta de fondos',
        'Comparador de costes roboadvisor vs DIY',
        'Catálogo de ETFs con grado fiscal para residentes en España',
        'Detección automática de cartera desde PDF de broker',
      ],
      publisher: { '@id': `${BASE_URL}/#organization` },
    }
  } else if (schema.type === 'FAQPage') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: 'es-ES',
      mainEntity: schema.questions.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    }
  } else if (schema.type === 'QAPage') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'QAPage',
      inLanguage: 'es-ES',
      mainEntity: {
        '@type': 'Question',
        name: schema.question,
        url: schema.url,
        acceptedAnswer: {
          '@type': 'Answer',
          text: schema.answer,
          url: schema.url,
        },
      },
    }
  } else if (schema.type === 'Speakable') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: schema.url,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: schema.cssSelectors,
      },
      inLanguage: 'es-ES',
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
      author: AUTHOR,
      publisher: PUBLISHER,
      image: {
        '@type': 'ImageObject',
        url: ogImage,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': schema.url,
      },
      ...(schema.wordCount && { wordCount: schema.wordCount }),
      ...(schema.articleSection && { articleSection: schema.articleSection }),
      ...(schema.keywords && schema.keywords.length > 0 && {
        keywords: schema.keywords.join(', '),
      }),
      isAccessibleForFree: true,
    }
  } else if (schema.type === 'BreadcrumbList') {
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
  } else if (schema.type === 'HowTo') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: schema.name,
      description: schema.description,
      url: schema.url,
      inLanguage: 'es-ES',
      ...(schema.totalTime && { totalTime: schema.totalTime }),
      ...(schema.estimatedCost && {
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: schema.estimatedCost.currency,
          value: schema.estimatedCost.value,
        },
      }),
      step: schema.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
        ...(s.url && { url: s.url }),
      })),
      publisher: { '@id': `${BASE_URL}/#organization` },
    }
  } else if (schema.type === 'DefinedTerm') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      name: schema.name,
      ...(schema.alternateName && { alternateName: schema.alternateName }),
      description: schema.description,
      url: schema.url,
      inLanguage: 'es-ES',
      ...(schema.termSetUrl && {
        inDefinedTermSet: schema.termSetUrl,
      }),
    }
  } else if (schema.type === 'DefinedTermSet') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: schema.name,
      description: schema.description,
      url: schema.url,
      inLanguage: 'es-ES',
      publisher: { '@id': `${BASE_URL}/#organization` },
      hasDefinedTerm: schema.hasDefinedTerm.map(t => ({
        '@type': 'DefinedTerm',
        name: t.name,
        url: t.url,
        ...(t.description && { description: t.description }),
      })),
    }
  } else if (schema.type === 'SoftwareApplication') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: schema.name,
      description: schema.description,
      url: schema.url,
      applicationCategory: schema.applicationCategory ?? 'FinanceApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
      inLanguage: 'es-ES',
      publisher: { '@id': `${BASE_URL}/#organization` },
      ...(schema.aggregateRating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: schema.aggregateRating.ratingValue,
          ratingCount: schema.aggregateRating.ratingCount,
        },
      }),
    }
  } else if (schema.type === 'Dataset') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: schema.name,
      description: schema.description,
      url: schema.url,
      inLanguage: 'es-ES',
      publisher: { '@id': `${BASE_URL}/#organization` },
      ...(schema.keywords && {
        keywords: schema.keywords.join(', '),
      }),
      ...(schema.variableMeasured && {
        variableMeasured: schema.variableMeasured,
      }),
      ...(schema.license && { license: schema.license }),
      isAccessibleForFree: true,
    }
  } else if (schema.type === 'FinancialProduct') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'FinancialProduct',
      name: schema.name,
      description: schema.description,
      url: schema.url,
      category: schema.category,
      inLanguage: 'es-ES',
      ...(schema.annualFee && {
        annualPercentageRate: {
          '@type': 'QuantitativeValue',
          value: schema.annualFee,
        },
      }),
      ...(schema.provider && {
        provider: {
          '@type': 'Organization',
          name: schema.provider,
        },
      }),
      ...(schema.isin && {
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'ISIN',
          value: schema.isin,
        },
      }),
    }
  } else {
    // CollectionPage
    data = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: schema.name,
      description: schema.description,
      url: schema.url,
      inLanguage: 'es-ES',
      publisher: { '@id': `${BASE_URL}/#organization` },
      ...(schema.hasPart && {
        hasPart: schema.hasPart.map(p => ({
          '@type': 'WebPage',
          name: p.name,
          url: p.url,
        })),
      }),
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
