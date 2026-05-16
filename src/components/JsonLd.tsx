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

type Schema = OrganizationSchema | WebApplicationSchema | FAQSchema

export function JsonLd({ schema }: { schema: Schema }) {
  let data: Record<string, unknown>

  if (schema.type === 'Organization') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BogleHub',
      url: 'https://boglehub.vercel.app',
      logo: 'https://boglehub.vercel.app/api/og?title=BogleHub',
      description: 'Análisis de cartera con IA para inversores indexados hispanos',
      inLanguage: 'es-ES',
    }
  } else if (schema.type === 'WebApplication') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'BogleHub',
      url: 'https://boglehub.vercel.app',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      description: 'Análisis de cartera de fondos indexados con IA en español',
      inLanguage: 'es-ES',
    }
  } else {
    data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: schema.questions.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    }
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
