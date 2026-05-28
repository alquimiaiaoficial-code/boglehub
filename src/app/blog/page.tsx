import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { BLOG_ARTICLES, type BlogArticle } from '@/data/blog-articles'
import {
  BLOG_CATEGORIES,
  getArticleCategory,
} from '@/data/blog-categories'
import { GLOSSARY_TERMS } from '@/data/glossary'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Blog de inversión indexada: ETFs, FIRE y fiscalidad en España',
  description:
    `Guías prácticas sobre inversión indexada, ETFs UCITS, fiscalidad en España y FIRE. ${BLOG_ARTICLES.length} artículos para inversores Boglehead organizados por categoría.`,
  openGraph: {
    title: 'Blog de inversión indexada | BogleHub',
    description:
      'Guías sobre ETFs, fondos indexados, fiscalidad española y FIRE. Contenido educativo organizado por tema.',
    locale: 'es_ES',
    images: [
      `/api/og?title=${encodeURIComponent('Blog')}&subtitle=${encodeURIComponent('Guías de inversión indexada')}`,
    ],
  },
  alternates: { canonical: '/blog' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function BlogIndexPage() {
  // Ordenar todos por fecha desc para el bloque "Más recientes"
  const sorted = [...BLOG_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  // Los 3 más recientes destacados arriba
  const featured = sorted.slice(0, 3)

  // Agrupar por categoría editorial
  const byCategory = BLOG_CATEGORIES.map((cat) => ({
    ...cat,
    articles: sorted.filter((a) => getArticleCategory(a.slug) === cat.slug),
  })).filter((cat) => cat.articles.length > 0)

  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Blog', url: `${BASE_URL}/blog` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'CollectionPage',
          name: 'Blog de inversión indexada para España',
          description: `${BLOG_ARTICLES.length} artículos sobre inversión indexada, ETFs UCITS, fiscalidad española y FIRE. Contenido educativo organizado en ${BLOG_CATEGORIES.length} categorías editoriales.`,
          url: `${BASE_URL}/blog`,
          hasPart: sorted.slice(0, 20).map(a => ({
            name: a.title,
            url: `${BASE_URL}/blog/${a.slug}`,
          })),
        }}
      />
      <JsonLd
        schema={{
          type: 'ItemList',
          name: 'Artículos del blog de BogleHub',
          url: `${BASE_URL}/blog`,
          items: sorted.map((a) => ({
            name: a.title,
            url: `${BASE_URL}/blog/${a.slug}`,
          })),
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Blog</span>
          </nav>

          {/* Header */}
          <header className="mb-10 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Blog</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              {BLOG_ARTICLES.length} artículos sobre inversión indexada, ETFs UCITS, fiscalidad
              española y FIRE. Organizados por temática para que encuentres lo que necesitas según
              el momento en el que estés. Todo gratis y sin registro.
            </p>
          </header>

          {/* Navegación por categorías */}
          <nav aria-label="Categorías del blog" className="mb-10 flex flex-wrap gap-2">
            {byCategory.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
              >
                {cat.label} ({cat.articles.length})
              </a>
            ))}
          </nav>

          {/* Más recientes (destacados) */}
          <section className="mb-12" aria-labelledby="latest-heading">
            <h2
              id="latest-heading"
              className="text-xl sm:text-2xl font-bold text-fg mb-4 border-b border-border pb-2"
            >
              Más recientes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featured.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="h-full hover:border-border-strong transition-colors">
                    <div className="text-xs text-fg-subtle mb-2 flex items-center gap-2">
                      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                      <span>·</span>
                      <span>{article.readingMinutes} min</span>
                    </div>
                    <h3 className="text-base font-semibold text-fg leading-snug">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs text-fg-muted leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <span className="mt-3 inline-block text-xs text-brand-400">
                      Leer artículo →
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Categorías con artículos */}
          {byCategory.map((cat) => (
            <section
              key={cat.slug}
              id={cat.slug}
              className="mb-12 scroll-mt-20"
              aria-labelledby={`heading-${cat.slug}`}
            >
              <header className="mb-4 border-b border-border pb-2">
                <h2
                  id={`heading-${cat.slug}`}
                  className="text-xl sm:text-2xl font-bold text-fg"
                >
                  {cat.label}{' '}
                  <span className="text-sm font-normal text-fg-subtle">
                    ({cat.articles.length})
                  </span>
                </h2>
                <p className="mt-1 text-sm text-fg-muted">{cat.description}</p>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.articles.map((article: BlogArticle) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`}>
                    <Card className="h-full hover:border-border-strong transition-colors">
                      <div className="text-xs text-fg-subtle mb-2 flex items-center gap-2">
                        <time dateTime={article.publishedAt}>
                          {formatDate(article.publishedAt)}
                        </time>
                        <span>·</span>
                        <span>{article.readingMinutes} min</span>
                      </div>
                      <h3 className="text-base font-semibold text-fg leading-snug">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-xs text-fg-muted leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* CTA */}
          <section className="rounded-xl border border-accent/30 bg-accent-dim p-6 text-center mt-10">
            <h2 className="text-lg font-bold text-fg mb-2">
              ¿Te falta contexto antes de empezar?
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              La guía paso a paso te lleva en 6 pasos de cero a tener tu primera cartera. El
              glosario explica los {GLOSSARY_TERMS.length} términos imprescindibles. Y las
              calculadoras te ayudan a planificar el plan que mejor encaja contigo.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/empezar"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Guía para empezar
              </Link>
              <Link
                href="/glosario"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Glosario completo
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
            Información educativa, no asesoramiento financiero. Verifica siempre con tu asesor
            fiscal antes de tomar decisiones de inversión.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
