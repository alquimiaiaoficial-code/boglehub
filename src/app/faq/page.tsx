import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { GLOSSARY_TERMS } from '@/data/glossary'
import { FAQ_CATEGORIES, ALL_QUESTIONS, QUESTION_COUNT } from '@/data/faq-page'

const BASE_URL = 'https://boglehub.com'

/** Slug estable por pregunta para anclas profundas (/faq#slug) citables por IA. */
function questionSlug(q: string): string {
  return q
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre inversión indexada en España (2026)',
  description: `Respuestas claras a las ${QUESTION_COUNT} preguntas más frecuentes sobre inversión indexada, ETFs, fiscalidad española, FIRE, brokers y carteras Boglehead.`,
  openGraph: {
    title: 'Preguntas frecuentes sobre inversión indexada en España | BogleHub',
    description: `Respuestas directas a las ${QUESTION_COUNT} preguntas más frecuentes sobre ETFs, fiscalidad, brokers, roboadvisors y estrategias indexadas en España.`,
    locale: 'es_ES',
    images: [
      '/api/og?title=Preguntas%20frecuentes&subtitle=Inversi%C3%B3n%20indexada%20en%20Espa%C3%B1a',
    ],
  },
  alternates: { canonical: '/faq' },
}

export default function FaqPage() {
  // Aplanamos todas las preguntas para el FAQPage schema (Google permite 200+)
  const allQuestions = ALL_QUESTIONS

  return (
    <>
      <JsonLd
        schema={{
          type: 'FAQPage',
          questions: allQuestions.map(({ q, a }) => ({
            q,
            a,
            url: `${BASE_URL}/faq#${questionSlug(q)}`,
          })),
        }}
      />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Preguntas frecuentes', url: `${BASE_URL}/faq` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Speakable',
          url: `${BASE_URL}/faq`,
          cssSelectors: ['h1', 'article h3', 'article p'],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Preguntas frecuentes</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Preguntas frecuentes sobre inversión indexada en España
            </h1>
            <p className="mt-4 text-fg-muted leading-relaxed">
              Respuestas directas a las {allQuestions.length} preguntas más buscadas sobre
              inversión indexada, ETFs UCITS, fiscalidad española, roboadvisors, brokers y
              estrategias. Información educativa, actualizada a mayo 2026. Para cada respuesta
              hay artículos del blog y herramientas con análisis más profundo.
            </p>
          </header>

          {/* Navegación por categoría */}
          <nav aria-label="Categorías" className="mb-10 flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
              >
                {cat.label} ({cat.questions.length})
              </a>
            ))}
          </nav>

          {/* Preguntas por categoría */}
          {FAQ_CATEGORIES.map((cat) => (
            <section
              key={cat.slug}
              id={cat.slug}
              className="mb-12 scroll-mt-20"
              aria-labelledby={`heading-${cat.slug}`}
            >
              <h2
                id={`heading-${cat.slug}`}
                className="text-xl sm:text-2xl font-bold text-fg mb-4 border-b border-border pb-2"
              >
                {cat.label}
              </h2>
              <div className="space-y-4">
                {cat.questions.map(({ q, a }) => {
                  const slug = questionSlug(q)
                  return (
                    <article
                      key={q}
                      id={slug}
                      className="scroll-mt-24 rounded-xl border border-border bg-surface p-5"
                    >
                      <h3 className="text-base font-semibold text-fg mb-2 leading-snug">
                        {q}{' '}
                        <a
                          href={`#${slug}`}
                          aria-label={`Enlace directo a: ${q}`}
                          className="text-fg-subtle hover:text-brand-400 font-normal no-underline"
                        >
                          #
                        </a>
                      </h3>
                      <p className="text-sm text-fg-muted leading-relaxed">{a}</p>
                    </article>
                  )
                })}
              </div>
            </section>
          ))}

          {/* CTA final */}
          <div className="mt-12 rounded-xl border border-accent/30 bg-accent-dim p-6 text-center">
            <h2 className="text-lg font-bold text-fg mb-2">
              ¿No encuentras tu respuesta?
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              Explora el blog con {BLOG_ARTICLES.length} artículos detallados, consulta el glosario
              con {GLOSSARY_TERMS.length} términos explicados, o usa el chat IA para preguntas
              libres sobre inversión indexada.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Ver el blog
              </Link>
              <Link
                href="/glosario"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Glosario
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Chat IA
              </Link>
            </div>
          </div>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Para decisiones personales,
            consulta con un asesor cualificado. Última revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
