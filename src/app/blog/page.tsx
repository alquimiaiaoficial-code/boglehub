import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { BLOG_ARTICLES } from '@/data/blog-articles'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Guías sobre inversión indexada, ETFs, fiscalidad española y FIRE. Contenido educativo para inversores pasivos hispanos.',
  openGraph: {
    title: 'Blog | BogleHub',
    description: 'Guías sobre inversión indexada, ETFs, fiscalidad y FIRE.',
    locale: 'es_ES',
    images: [
      `/api/og?title=${encodeURIComponent('Blog')}&subtitle=${encodeURIComponent('Guías de inversión indexada')}`,
    ],
  },
}

export default function BlogIndexPage() {
  const articles = [...BLOG_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Blog</h1>
            <p className="mt-2 text-fg-muted">
              Guías sobre inversión indexada, ETFs, fiscalidad española y FIRE.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <div className="flex items-center gap-2 text-xs text-fg-subtle mb-3">
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
                  <h2 className="text-lg font-semibold text-fg leading-snug">{article.title}</h2>
                  <p className="mt-2 text-sm text-fg-muted leading-relaxed">{article.excerpt}</p>
                  <span className="mt-4 inline-block text-sm text-brand-400">Leer artículo →</span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
