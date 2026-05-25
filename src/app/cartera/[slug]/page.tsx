import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { MODEL_PORTFOLIOS, getPortfolioBySlug } from '@/data/model-portfolios'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return MODEL_PORTFOLIOS.map((p) => ({ slug: p.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = getPortfolioBySlug(slug)
  if (!p) return { title: 'No encontrado' }
  return {
    title: `${p.name}: composición, ETFs y guía completa (2026)`,
    description: `${p.tagline}. Composición detallada de ${p.name}: ${p.allocation.map(a => `${a.percent}% ${a.asset}`).join(' + ')}. TER ponderado ${p.weightedTer}.`,
    openGraph: { locale: 'es_ES', images: [`/api/og?title=${encodeURIComponent(p.name)}&subtitle=${encodeURIComponent('Cartera%20modelo')}`] },
    alternates: { canonical: `/cartera/${slug}` },
  }
}

export default async function CarteraPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pLookup = getPortfolioBySlug(slug)
  if (!pLookup) notFound()
  const p = pLookup
  const pageUrl = `${BASE_URL}/cartera/${slug}`

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: p.faq }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Carteras', url: `${BASE_URL}/cartera` }, { name: p.name, url: pageUrl }] }} />
      <JsonLd schema={{ type: 'Article', headline: p.name, description: p.description, url: pageUrl, datePublished: '2026-05-24', articleSection: 'Carteras modelo' }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><Link href="/cartera" className="hover:text-fg">Carteras</Link><span className="mx-2">/</span><span className="text-fg">{p.name}</span></nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">{p.name}</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">{p.tagline}. {p.description}</p>
          </header>

          <Card className="mb-8">
            <CardTitle className="mb-4">Composición</CardTitle>
            <div className="space-y-3">
              {p.allocation.map((a) => (
                <div key={a.asset} className="flex items-center gap-3">
                  <div className="shrink-0 w-14 text-right">
                    <span className="text-lg font-bold text-accent">{a.percent}%</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-fg">{a.asset}</p>
                    {a.suggestedTicker && (
                      <Link href={`/etf/${a.suggestedTicker.toLowerCase()}`} className="text-xs text-brand-400 hover:text-brand-300 font-mono">
                        → {a.suggestedTicker}
                      </Link>
                    )}
                  </div>
                  <div className="shrink-0 w-32">
                    <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-500 to-accent" style={{ width: `${a.percent}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mb-8">
            <CardTitle className="mb-4">Datos clave</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><dt className="text-xs uppercase text-fg-muted">TER ponderado</dt><dd className="font-medium text-fg">{p.weightedTer}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Volatilidad esperada</dt><dd className="font-medium text-fg">{p.expectedVolatility}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Rentabilidad esperada</dt><dd className="font-medium text-fg">{p.expectedReturn}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Origen</dt><dd className="font-medium text-fg">{p.origin}</dd></div>
            </dl>
          </Card>

          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardTitle className="mb-3"><span className="text-accent">✓</span> Ideal para</CardTitle>
              <ul className="space-y-2 text-sm text-fg-muted">
                {p.idealFor.map((x) => (<li key={x} className="flex gap-2"><span className="text-accent shrink-0">•</span><span>{x}</span></li>))}
              </ul>
            </Card>
            <Card>
              <CardTitle className="mb-3"><span className="text-danger/70">✗</span> Evitar si</CardTitle>
              <ul className="space-y-2 text-sm text-fg-muted">
                {p.avoidWhen.map((x) => (<li key={x} className="flex gap-2"><span className="text-danger/70 shrink-0">•</span><span>{x}</span></li>))}
              </ul>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {p.faq.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-border bg-surface px-5 py-4">
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">{q}<span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">▾</span></summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-4">Otras carteras modelo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MODEL_PORTFOLIOS.filter(x => x.slug !== slug).slice(0, 6).map((x) => (
                <Link key={x.slug} href={`/cartera/${x.slug}`} className="rounded-xl border border-border bg-surface p-3 hover:border-border-strong transition-colors">
                  <div className="text-sm font-semibold text-fg">{x.name}</div>
                  <p className="text-xs text-fg-muted mt-1 line-clamp-1">{x.tagline}</p>
                </Link>
              ))}
            </div>
          </section>

          <Card className="text-center">
            <Link href="/analyzer" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Analizar mi cartera actual
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">Información educativa, no asesoramiento. Última revisión: mayo 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
