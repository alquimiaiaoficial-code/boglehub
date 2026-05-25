import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { HISPANO_MARKETS, getHispanoMarketBySlug } from '@/data/hispano-markets'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return HISPANO_MARKETS.map((m) => ({ slug: m.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const m = getHispanoMarketBySlug(slug)
  if (!m) return { title: 'No encontrado' }
  return {
    title: `Inversión indexada en ${m.countryName}: brokers, fiscalidad y ETFs (2026)`,
    description: `Guía completa de inversión indexada para residentes en ${m.countryName}: brokers locales (${m.localBrokers.slice(0, 2).join(', ')}), fiscalidad (${m.capitalGainsTax}), ETFs recomendados y estrategia.`,
    openGraph: { locale: 'es_ES', images: [`/api/og?title=${encodeURIComponent(`Invertir en ${m.countryName}`)}&subtitle=${encodeURIComponent('Gu%C3%ADa%20completa')}`] },
    alternates: { canonical: `/mercado/${slug}` },
  }
}

export default async function MercadoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mLookup = getHispanoMarketBySlug(slug)
  if (!mLookup) notFound()
  const m = mLookup
  const pageUrl = `${BASE_URL}/mercado/${slug}`

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: m.faq }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Mercados', url: `${BASE_URL}/mercado` }, { name: m.countryName, url: pageUrl }] }} />
      <JsonLd schema={{ type: 'Article', headline: `Inversión indexada en ${m.countryName}`, description: m.description, url: pageUrl, datePublished: '2026-05-24', articleSection: 'Mercados hispanos' }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><Link href="/mercado" className="hover:text-fg">Mercados</Link><span className="mx-2">/</span><span className="text-fg">{m.countryName}</span></nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              {m.flag} Inversión indexada en {m.countryName} (2026)
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">{m.tagline}.</p>
          </header>

          <section className="mb-8">
            <p className="text-fg-muted leading-relaxed">{m.description}</p>
          </section>

          <Card className="mb-8">
            <CardTitle className="mb-4">Datos clave del mercado</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><dt className="text-xs uppercase text-fg-muted">Moneda</dt><dd className="font-medium text-fg">{m.currency}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Ganancias capital</dt><dd className="font-medium text-fg text-xs">{m.capitalGainsTax}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs uppercase text-fg-muted">Dividendos</dt><dd className="font-medium text-fg text-xs">{m.dividendTax}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs uppercase text-fg-muted">Brokers locales populares</dt><dd className="text-fg text-xs">{m.localBrokers.join(', ')}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs uppercase text-fg-muted">Brokers extranjeros usados</dt><dd className="text-fg text-xs">{m.foreignBrokers.join(', ')}</dd></div>
            </dl>
          </Card>

          <Card className="mb-8">
            <CardTitle className="mb-3">ETFs recomendados</CardTitle>
            <p className="text-sm text-fg-muted leading-relaxed">{m.etfRecommendation}</p>
          </Card>

          <Card className="mb-8">
            <CardTitle className="mb-3">Consideraciones específicas</CardTitle>
            <ul className="space-y-2 text-sm text-fg-muted">
              {m.considerations.map((c) => (
                <li key={c} className="flex gap-2"><span className="text-accent shrink-0">•</span><span>{c}</span></li>
              ))}
            </ul>
          </Card>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {m.faq.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-border bg-surface px-5 py-4">
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">{q}<span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">▾</span></summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-3">Otros mercados hispanohablantes</h2>
            <div className="flex flex-wrap gap-2">
              {HISPANO_MARKETS.filter(x => x.slug !== slug).map((x) => (
                <Link key={x.slug} href={`/mercado/${x.slug}`} className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors">
                  {x.flag} {x.countryName}
                </Link>
              ))}
            </div>
          </section>

          <p className="mt-8 text-xs text-fg-subtle text-center">Información educativa, no asesoramiento fiscal ni financiero. Las normativas cambian — verifica siempre con asesor local de tu país. Última revisión: mayo 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
