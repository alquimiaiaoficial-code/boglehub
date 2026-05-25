import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { SECTORS, getSectorBySlug } from '@/data/sectors'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = getSectorBySlug(slug)
  if (!s) return { title: 'No encontrado' }
  return {
    title: `Invertir en sector ${s.name}: ETFs y análisis (2026)`,
    description: `${s.tagline}. Análisis del sector ${s.name}: peso en MSCI World (${s.msciWorldWeight}), ETFs UCITS disponibles, empresas líderes y pros/contras para inversor en España.`,
    openGraph: {
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(s.name)}&subtitle=${encodeURIComponent('Sector%20bolsa')}`],
    },
    alternates: { canonical: `/sector/${slug}` },
  }
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sLookup = getSectorBySlug(slug)
  if (!sLookup) notFound()
  const s = sLookup
  const pageUrl = `${BASE_URL}/sector/${slug}`
  const otherSectors = SECTORS.filter((x) => x.slug !== slug).slice(0, 6)

  const faqs = [
    {
      q: `¿Qué peso tiene el sector ${s.name} en el MSCI World?`,
      a: `El sector ${s.name} representa aproximadamente ${s.msciWorldWeight} del MSCI World. Esto significa que si inviertes en un ETF global como VWCE o IWDA, ya tienes esa exposición incluida de forma automática.`,
    },
    {
      q: `¿Vale la pena sobreponderar el sector ${s.name}?`,
      a: `Para un inversor indexado puro siguiendo filosofía Boglehead, la respuesta es no: la cartera por capitalización ya tiene el peso óptimo. Sobreponderar un sector es una apuesta activa que puede acertar o fallar. Si decides hacerlo, mantén el peso adicional limitado (5-15% del total) y conviértelo en parte de tu estrategia consciente, no un capricho.`,
    },
    {
      q: `¿Cómo invertir en el sector ${s.name} desde España?`,
      a: s.relatedEtfs.length > 0
        ? `Hay ETFs UCITS específicos disponibles en España como ${s.relatedEtfs.slice(0, 3).map(e => e.ticker).join(', ')}. Se compran desde brokers como Trade Republic, DEGIRO o MyInvestor con comisiones bajas. Verifica TER y composición antes de comprar.`
        : `Para exposición específica al sector ${s.name} no hay ETFs UCITS muy populares dedicados. Puedes obtener exposición indirecta a través de ETFs globales (VWCE, IWDA) o ETFs sectoriales temáticos. Para exposiciones puras, los ETFs americanos son los más diversos pero no son comprables directamente por inversores particulares europeos por normativa MiFID II.`,
    },
    {
      q: `¿Cuáles son las empresas líderes del sector ${s.name}?`,
      a: `Las mayores empresas globales del sector ${s.name} por capitalización son: ${s.topCompanies.join(', ')}. Todas están incluidas automáticamente en cualquier ETF global como VWCE o IWDA según su peso en el índice MSCI World.`,
    },
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Sectores', url: `${BASE_URL}/sector` },
            { name: s.name, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: `Invertir en sector ${s.name}: ETFs y análisis`,
          description: s.description,
          url: pageUrl,
          datePublished: '2026-05-24',
          articleSection: 'Análisis sectorial',
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/sector" className="hover:text-fg transition-colors">Sectores</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{s.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Sector {s.name}: invertir desde España (2026)
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">{s.tagline}.</p>
          </header>

          <Card className="mb-8">
            <CardTitle className="mb-3">Ficha del sector</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase text-fg-muted">Peso en MSCI World</dt>
                <dd className="font-medium text-fg">{s.msciWorldWeight}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase text-fg-muted">Empresas líderes</dt>
                <dd className="text-fg">{s.topCompanies.join(', ')}</dd>
              </div>
            </dl>
          </Card>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-3">Sobre el sector {s.name}</h2>
            <p className="text-fg-muted leading-relaxed">{s.description}</p>
          </section>

          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardTitle className="mb-3"><span className="text-accent">✓</span> Pros</CardTitle>
              <ul className="space-y-2 text-sm text-fg-muted">
                {s.pros.map((p) => (<li key={p} className="flex gap-2"><span className="text-accent shrink-0">•</span><span>{p}</span></li>))}
              </ul>
            </Card>
            <Card>
              <CardTitle className="mb-3"><span className="text-danger/70">✗</span> Contras</CardTitle>
              <ul className="space-y-2 text-sm text-fg-muted">
                {s.cons.map((c) => (<li key={c} className="flex gap-2"><span className="text-danger/70 shrink-0">•</span><span>{c}</span></li>))}
              </ul>
            </Card>
          </section>

          {s.relatedEtfs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-fg mb-4">ETFs UCITS para sector {s.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {s.relatedEtfs.map((etf) => (
                  <Link key={etf.ticker} href={`/etf/${etf.ticker.toLowerCase()}`} className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors">
                    <div className="font-mono font-bold text-brand-400">{etf.ticker}</div>
                    <p className="text-xs text-fg-muted mt-1 line-clamp-2">{etf.name}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {faqs.map(({ q, a }) => (
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

          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-4">Otros sectores</h2>
            <div className="flex flex-wrap gap-2">
              {otherSectors.map((x) => (
                <Link key={x.slug} href={`/sector/${x.slug}`} className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors">
                  {x.name}
                </Link>
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
