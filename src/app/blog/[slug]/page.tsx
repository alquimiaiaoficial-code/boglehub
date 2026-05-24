import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { remarkAutolinkTickers } from '@/lib/remark-autolink-tickers'
import { remarkAutolinkGlossary } from '@/lib/remark-autolink-glossary'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { RELATED_ARTICLES } from '@/data/related-articles'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = BLOG_ARTICLES.find((a) => a.slug === slug)
  if (!article) {
    return { title: 'Artículo no encontrado' }
  }
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords,
    openGraph: {
      title: `${article.title} | BogleHub`,
      description: article.excerpt,
      type: 'article',
      locale: 'es_ES',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      images: [
        `/api/og?title=${encodeURIComponent(article.title)}&subtitle=${encodeURIComponent('Blog BogleHub')}`,
      ],
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = BLOG_ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const articleUrl = `${BASE_URL}/blog/${article.slug}`

  // Artículos relacionados: hasta 3, filtrados para que existan en BLOG_ARTICLES
  const relatedSlugs = RELATED_ARTICLES[article.slug] ?? []
  const relatedArticles = relatedSlugs
    .map(slug => BLOG_ARTICLES.find(a => a.slug === slug))
    .filter(Boolean)
    .slice(0, 3) as typeof BLOG_ARTICLES

  return (
    <>
      {/* Structured data */}
      <JsonLd
        schema={{
          type: 'Article',
          headline: article.title,
          description: article.excerpt,
          url: articleUrl,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt ?? article.publishedAt,
        }}
      />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Blog', url: `${BASE_URL}/blog` },
            { name: article.title, url: articleUrl },
          ],
        }}
      />
      {article.faq && article.faq.length > 0 && (
        <JsonLd
          schema={{
            type: 'FAQPage',
            questions: article.faq.map(({ q, a }) => ({ q, a })),
          }}
        />
      )}
      <Header />
      <main className="bg-bg min-h-screen">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/blog" className="hover:text-fg transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-fg-muted">{article.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-fg-subtle mb-6">
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <>
                <span>·</span>
                <span>
                  Actualizado{' '}
                  <time dateTime={article.updatedAt}>
                    {new Date(article.updatedAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </span>
              </>
            )}
            <span>·</span>
            <span>{article.readingMinutes} min de lectura</span>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-fg prose-strong:text-fg prose-a:text-brand-400 prose-code:text-brand-300">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkAutolinkTickers, remarkAutolinkGlossary]}>{article.content}</ReactMarkdown>
          </div>

          {/* Newsletter */}
          <aside className="mt-12 rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-fg">¿Te ha servido este artículo?</h2>
            <p className="mt-1 text-sm text-fg-muted">
              Recibe el análisis quincenal de BogleHub: ETFs, fiscalidad y novedades. Sin
              spam, te das de baja con un clic.
            </p>
            <div className="mt-4">
              <NewsletterSignup variant="inline" />
            </div>
          </aside>

          {/* Artículos relacionados */}
          {relatedArticles.length > 0 && (
            <nav aria-label="Artículos relacionados" className="mt-12 pt-6 border-t border-border">
              <h2 className="text-lg font-semibold text-fg mb-4">También te puede interesar</h2>
              <ul className="space-y-3">
                {relatedArticles.map(related => (
                  <li key={related.slug}>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="group flex flex-col gap-0.5 rounded-lg border border-border bg-surface p-3 hover:border-border-strong transition-colors"
                    >
                      <span className="text-sm font-medium text-fg group-hover:text-brand-400 transition-colors">
                        {related.title}
                      </span>
                      <span className="text-xs text-fg-subtle line-clamp-1">
                        {related.excerpt}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Footer disclaimer + CTA */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-fg-muted italic">
              Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal
              antes de tomar decisiones.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/analyzer"
                className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-500 transition-colors text-center"
              >
                Analiza tu cartera gratis
              </Link>
              <Link
                href="/chat"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg hover:border-border-strong transition-colors text-center"
              >
                Pregúntale al Chat IA
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
