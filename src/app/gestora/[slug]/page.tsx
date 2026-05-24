import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { GESTORAS, getGestoraBySlug } from '@/data/gestoras'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return GESTORAS.map((g) => ({ slug: g.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const g = getGestoraBySlug(slug)
  if (!g) return { title: 'Gestora no encontrada' }

  return {
    title: `${g.name}: análisis de la gestora y sus ETFs/fondos en España 2026`,
    description: `${g.tagline}. Análisis de ${g.name}: origen ${g.origin}, fundada en ${g.founded}, AUM ${g.aum}, productos disponibles para inversores en España y sus ETFs/fondos más populares.`,
    openGraph: {
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(g.name)}&subtitle=${encodeURIComponent('Gestora%20de%20fondos%20indexados')}`],
    },
    alternates: { canonical: `/gestora/${slug}` },
  }
}

export default async function GestoraPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const g = getGestoraBySlug(slug)
  if (!g) notFound()

  const pageUrl = `${BASE_URL}/gestora/${slug}`

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: g.faq }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Gestoras', url: `${BASE_URL}/gestora` },
            { name: g.name, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: `${g.name}: análisis de la gestora y sus ETFs/fondos para España`,
          description: g.description,
          url: pageUrl,
          datePublished: '2026-05-24',
          articleSection: 'Análisis de gestoras',
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/gestora" className="hover:text-fg transition-colors">Gestoras</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{g.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              {g.name}: gestora y productos en España (2026)
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">{g.tagline}.</p>
          </header>

          <Card className="mb-8">
            <CardTitle className="mb-4">Ficha de la gestora</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Origen</dt>
                <dd className="text-fg font-medium">{g.origin}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Fundada</dt>
                <dd className="text-fg font-medium">{g.founded}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">AUM</dt>
                <dd className="text-fg font-medium">{g.aum}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Disponible en MyInvestor</dt>
                <dd className="text-fg font-medium">{g.availableInMyInvestor ? 'Sí (fondos)' : 'No'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Productos</dt>
                <dd className="text-fg text-sm">{g.products.join(', ')}</dd>
              </div>
            </dl>
          </Card>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-3">Sobre {g.name}</h2>
            <p className="text-fg-muted leading-relaxed">{g.description}</p>
          </section>

          {g.popularEtfs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-fg mb-4">ETFs populares de {g.name} en España</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {g.popularEtfs.map((etf) => (
                  <Link
                    key={etf.ticker}
                    href={`/etf/${etf.ticker.toLowerCase()}`}
                    className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
                  >
                    <div className="font-mono font-bold text-brand-400">{etf.ticker}</div>
                    <p className="text-xs text-fg-muted mt-1 line-clamp-2">{etf.name}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">Preguntas frecuentes sobre {g.name}</h2>
            <div className="space-y-3">
              {g.faq.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-border bg-surface px-5 py-4">
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">
                    {q}
                    <span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Última revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
