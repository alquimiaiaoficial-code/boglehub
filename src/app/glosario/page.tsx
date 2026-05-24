import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { GLOSSARY_TERMS, CATEGORY_LABELS, type GlossaryTerm } from '@/data/glossary'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Glosario de inversión indexada y ETFs para España (2026)',
  description:
    'Glosario completo de términos financieros para inversores indexados en España: TER, UCITS, ISIN, FIFO, IRPF del ahorro, FIRE, DCA, rebalanceo y mucho más. Definiciones claras con ejemplos prácticos.',
  openGraph: {
    title: 'Glosario de inversión indexada y ETFs para España | BogleHub',
    description:
      'Definiciones claras de los términos que todo inversor indexado en España debería conocer: ETF, TER, UCITS, FIFO, FIRE, DCA, asset allocation y muchos más.',
    locale: 'es_ES',
    images: [
      '/api/og?title=Glosario%20de%20inversi%C3%B3n&subtitle=T%C3%A9rminos%20esenciales%20para%20Bogleheads',
    ],
  },
  alternates: { canonical: '/glosario' },
}

export default function GlossaryIndexPage() {
  // Agrupar términos por categoría
  const byCategory = (Object.keys(CATEGORY_LABELS) as Array<GlossaryTerm['category']>)
    .map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      terms: GLOSSARY_TERMS.filter((t) => t.category === category).sort((a, b) =>
        a.term.localeCompare(b.term, 'es'),
      ),
    }))
    .filter((g) => g.terms.length > 0)

  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Glosario', url: `${BASE_URL}/glosario` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'DefinedTermSet',
          name: 'Glosario de inversión indexada y ETFs para España',
          description: `Glosario completo con ${GLOSSARY_TERMS.length} términos esenciales para invertir de forma indexada en España: definiciones, ejemplos prácticos y enlaces a artículos relacionados.`,
          url: `${BASE_URL}/glosario`,
          hasDefinedTerm: GLOSSARY_TERMS.map(t => ({
            name: t.term,
            url: `${BASE_URL}/glosario/${t.slug}`,
            description: t.shortDefinition,
          })),
        }}
      />
      <JsonLd
        schema={{
          type: 'CollectionPage',
          name: 'Glosario de inversión indexada para España',
          description: `${GLOSSARY_TERMS.length} términos financieros definidos para inversores indexados hispanohablantes.`,
          url: `${BASE_URL}/glosario`,
          hasPart: GLOSSARY_TERMS.map(t => ({
            name: t.term,
            url: `${BASE_URL}/glosario/${t.slug}`,
          })),
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Glosario</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Glosario de inversión indexada y ETFs
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed max-w-2xl">
              Definiciones claras y prácticas de los {GLOSSARY_TERMS.length} términos
              imprescindibles para invertir de forma indexada en España: desde conceptos
              técnicos como TER, ISIN o tracking error, hasta estrategias como FIRE, DCA o el
              rebalanceo. Cada entrada incluye ejemplo práctico y enlaces a artículos y
              herramientas relacionadas.
            </p>
          </header>

          {/* Navegación por categorías */}
          <nav className="mb-10 flex flex-wrap gap-2" aria-label="Categorías del glosario">
            {byCategory.map(({ category, label, terms }) => (
              <a
                key={category}
                href={`#${category}`}
                className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
              >
                {label} ({terms.length})
              </a>
            ))}
          </nav>

          {/* Categorías con listado de términos */}
          {byCategory.map(({ category, label, terms }) => (
            <section
              key={category}
              id={category}
              className="mb-12 scroll-mt-20"
              aria-labelledby={`heading-${category}`}
            >
              <h2
                id={`heading-${category}`}
                className="text-xl sm:text-2xl font-bold text-fg mb-4 border-b border-border pb-2"
              >
                {label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {terms.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glosario/${term.slug}`}
                    className="group flex flex-col rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
                  >
                    <h3 className="text-base font-semibold text-fg group-hover:text-brand-400 transition-colors">
                      {term.term}
                    </h3>
                    {term.fullForm && (
                      <span className="mt-0.5 text-xs text-fg-subtle">{term.fullForm}</span>
                    )}
                    <p className="mt-2 text-xs text-fg-muted line-clamp-3 leading-relaxed">
                      {term.shortDefinition}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* CTA */}
          <section className="rounded-xl border border-accent/30 bg-accent-dim p-6 text-center">
            <h2 className="text-lg font-bold text-fg mb-2">
              ¿Te faltan conceptos para empezar?
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              El glosario es el punto de partida. Cuando tengas claros los conceptos, prueba el
              comparador de ETFs, el analizador de cartera o las calculadoras de inversión.
              Todas las herramientas son gratis y sin registro.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Leer el blog
              </Link>
              <Link
                href="/etf"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Catálogo de ETFs
              </Link>
              <Link
                href="/calculadora"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Calculadoras
              </Link>
            </div>
          </section>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Las definiciones son
            orientativas. Para términos legales o fiscales precisos, consulta la normativa
            vigente o un profesional cualificado.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
