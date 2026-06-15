import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import {
  GLOSSARY_TERMS,
  getTermBySlug,
  CATEGORY_LABELS,
} from '@/data/glossary'
import { BLOG_ARTICLES } from '@/data/blog-articles'

const BASE_URL = 'https://boglehub.com'

/** Slug estable por pregunta para anclas profundas (/glosario/term#pregunta) citables por IA. */
function questionSlug(q: string): string {
  return q
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/**
 * Artículos de respaldo por categoría del glosario. Para los términos que aún
 * no tienen `relatedArticles` curados, garantizan internal linking glosario ->
 * blog. Los slugs se filtran contra BLOG_ARTICLES (sin enlaces rotos).
 */
const CATEGORY_FALLBACK_ARTICLES: Record<string, string[]> = {
  productos: [
    'como-elegir-tu-primer-etf-espana-2026',
    'fondos-indexados-vs-etfs-espana',
    'mejores-etfs-espana-2026',
  ],
  fiscalidad: [
    'fiscalidad-etfs-espana-guia-completa',
    'como-declarar-etfs-hacienda',
    'plan-de-pensiones-vs-fondo-indexado',
  ],
  metricas: [
    'como-elegir-tu-primer-etf-espana-2026',
    'solapamiento-etfs-error-silencioso',
    'mejores-etfs-espana-2026',
  ],
  estrategias: [
    'bogleheads-espana-guia-completa',
    'cartera-boglehead-3-fondos-espana',
    'dca-vs-lump-sum-aportar-mensual',
  ],
  plataformas: [
    'degiro-vs-trade-republic-vs-myinvestor-2026',
    'myinvestor-opinion-2026',
    'roboadvisors-espana-merecen-comision',
  ],
  conceptos: [
    'bogleheads-espana-guia-completa',
    'interes-compuesto-inversion',
    'que-es-el-msci-world',
  ],
}

// ---------------------------------------------------------------------------
// Static params + metadata
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return GLOSSARY_TERMS.map((t) => ({ slug: t.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const term = getTermBySlug(slug)
  if (!term) return { title: 'Término no encontrado' }

  const title = term.fullForm
    ? `${term.fullForm}: definición y ejemplos`
    : `${term.term}: qué es y cómo funciona`

  // La definición rápida puede pasar de los ~160 chars óptimos para el meta;
  // se trunca en el último espacio (sin partir palabras) solo para la meta tag.
  // El texto completo se sigue mostrando como "Definición rápida" en la página.
  const metaDescription =
    term.shortDefinition.length > 160
      ? term.shortDefinition.slice(0, 157).replace(/\s+\S*$/, '') + '…'
      : term.shortDefinition

  return {
    // El template de layout añade "| BogleHub"; no repetir la marca aquí
    title,
    description: metaDescription,
    openGraph: {
      title,
      description: metaDescription,
      locale: 'es_ES',
      images: [
        `/api/og?title=${encodeURIComponent(term.term)}&subtitle=${encodeURIComponent('Glosario')}`,
      ],
    },
    alternates: { canonical: `/glosario/${slug}` },
  }
}

// ---------------------------------------------------------------------------
// Página individual
// ---------------------------------------------------------------------------
export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const term = getTermBySlug(slug)
  if (!term) notFound()

  // Artículos relacionados: curados si existen; si no, respaldo por categoría
  const relatedArticleSlugs =
    term.relatedArticles && term.relatedArticles.length > 0
      ? term.relatedArticles
      : CATEGORY_FALLBACK_ARTICLES[term.category] ?? []
  const relatedArticles = relatedArticleSlugs
    .map((s) => BLOG_ARTICLES.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(0, 3)

  // Otros términos de la misma categoría
  const otherTermsInCategory = GLOSSARY_TERMS.filter(
    (t) => t.category === term.category && t.slug !== slug,
  ).slice(0, 6)

  const pageUrl = `${BASE_URL}/glosario/${slug}`

  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Glosario', url: `${BASE_URL}/glosario` },
            { name: term.term, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'DefinedTerm',
          name: term.term,
          alternateName: term.fullForm,
          description: term.shortDefinition,
          url: pageUrl,
          termSetUrl: `${BASE_URL}/glosario`,
        }}
      />
      {term.faq && term.faq.length > 0 && (
        <JsonLd
          schema={{
            type: 'FAQPage',
            questions: term.faq.map(({ q, a }) => ({
              q,
              a,
              url: `${pageUrl}#${questionSlug(q)}`,
            })),
          }}
        />
      )}
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/glosario" className="hover:text-fg transition-colors">Glosario</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{term.term}</span>
          </nav>

          {/* Header */}
          <header className="mb-6">
            <span className="inline-block rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-400 mb-3">
              {CATEGORY_LABELS[term.category]}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              {term.term}
            </h1>
            {term.fullForm && term.fullForm !== term.term && (
              <p className="mt-1 text-base text-fg-subtle">{term.fullForm}</p>
            )}
          </header>

          {/* Definición corta destacada */}
          <div className="mb-8 rounded-xl border border-accent/30 bg-accent-dim p-5">
            <h2 className="text-xs font-semibold text-accent uppercase tracking-wide mb-1.5">
              Definición rápida
            </h2>
            <p className="text-fg leading-relaxed">{term.shortDefinition}</p>
          </div>

          {/* Definición extendida */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-3">Definición extendida</h2>
            <div className="text-fg-muted leading-relaxed space-y-3">
              {term.longDefinition.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Ejemplo práctico */}
          {term.example && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-fg mb-3">Ejemplo práctico</h2>
              <div className="rounded-xl border border-border bg-surface p-5">
                <p className="text-fg-muted leading-relaxed">{term.example}</p>
              </div>
            </section>
          )}

          {/* Enlaces internos relacionados */}
          {term.relatedLinks && term.relatedLinks.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-fg mb-3">Herramientas relacionadas</h2>
              <div className="flex flex-wrap gap-2">
                {term.relatedLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm font-medium text-fg hover:border-border-strong transition-colors"
                  >
                    {label} →
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Artículos del blog relacionados */}
          {relatedArticles.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-fg mb-3">Artículos relacionados</h2>
              <div className="space-y-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="flex flex-col rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
                  >
                    <h3 className="text-base font-semibold text-fg hover:text-brand-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-xs text-fg-muted line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          {term.faq && term.faq.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-fg mb-4">Preguntas frecuentes</h2>
              <div className="space-y-3">
                {term.faq.map(({ q, a }) => {
                  const qSlug = questionSlug(q)
                  return (
                    <details
                      key={q}
                      id={qSlug}
                      className="group scroll-mt-24 rounded-xl border border-border bg-surface px-5 py-4"
                    >
                      <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">
                        <span>
                          {q}{' '}
                          <a
                            href={`#${qSlug}`}
                            aria-label={`Enlace directo a: ${q}`}
                            className="font-normal text-fg-subtle no-underline hover:text-brand-400"
                          >
                            #
                          </a>
                        </span>
                        <span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">
                          ▾
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                    </details>
                  )
                })}
              </div>
            </section>
          )}

          {/* Otros términos de la categoría */}
          {otherTermsInCategory.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-semibold text-fg-muted uppercase tracking-wide mb-3">
                Otros términos de {CATEGORY_LABELS[term.category].toLowerCase()}
              </h2>
              <div className="flex flex-wrap gap-2">
                {otherTermsInCategory.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/glosario/${t.slug}`}
                    className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
                  >
                    {t.term}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <p className="mt-8 text-xs text-fg-subtle text-center border-t border-border pt-6">
            Información educativa, no asesoramiento financiero. La definición es orientativa.
            Para términos legales o fiscales precisos, consulta la normativa vigente o un
            profesional cualificado.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
