import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BLOG_ARTICLES } from '@/data/blog-articles'

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

  return (
    <>
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
            <time>
              {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{article.readingMinutes} min de lectura</span>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-fg prose-strong:text-fg prose-a:text-brand-400 prose-code:text-brand-300">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          </div>

          {/* Footer disclaimer + CTA */}
          <div className="mt-12 pt-6 border-t border-border">
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
