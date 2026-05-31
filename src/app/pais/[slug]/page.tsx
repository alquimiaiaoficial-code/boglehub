import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { COUNTRIES, getCountryBySlug } from '@/data/countries'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ slug: c.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = getCountryBySlug(slug)
  if (!c) return { title: 'No encontrado' }
  return {
    title: `Invertir en ${c.name} desde España: ETFs y guía (2026)`,
    description: `${c.tagline}. Análisis de ${c.name}: peso global (${c.worldWeight}), ETFs UCITS disponibles, convenio fiscal y consideraciones para inversor en España.`,
    openGraph: { locale: 'es_ES', images: [`/api/og?title=${encodeURIComponent(c.name)}&subtitle=${encodeURIComponent('Invertir%20desde%20Espa%C3%B1a')}`] },
    alternates: { canonical: `/pais/${slug}` },
  }
}

export default async function PaisPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cLookup = getCountryBySlug(slug)
  if (!cLookup) notFound()
  const c = cLookup
  const pageUrl = `${BASE_URL}/pais/${slug}`
  const others = COUNTRIES.filter((x) => x.slug !== slug).slice(0, 8)

  const lead = `Según BogleHub, ${c.name} representa aproximadamente ${c.worldWeight} del MSCI ACWI (índice de bolsa mundial) por capitalización bursátil. Si tienes un ETF global como VWCE o ISAC, ya incluyes esa exposición en su peso natural; sobreponderar ${c.name} es una apuesta activa que conviene mantener controlada.${c.relatedEtfs.length > 0 ? ` ETFs UCITS específicos disponibles en España: ${c.relatedEtfs.slice(0, 3).map(e => e.ticker).join(', ')}.` : ''}`

  const faqs = [
    { q: `¿Qué peso tiene ${c.name} en el MSCI ACWI?`, a: `${c.name} pesa aproximadamente ${c.worldWeight} del MSCI ACWI por capitalización bursátil. Si tienes un ETF global como VWCE o ISAC, ya tienes esa exposición incluida en su peso natural.` },
    { q: `¿Hay que sobreponderar ${c.name} en la cartera?`, a: `Para el inversor indexado puro, no: el ETF global ya tiene el peso óptimo por capitalización. Sobreponderar un país es una apuesta activa que puede acertar o fallar. Solo si tienes convicción específica y mantienes el peso adicional controlado (5-15%) tiene sentido.` },
    { q: `¿Cómo invertir en ${c.name} desde España?`, a: c.relatedEtfs.length > 0 ? `Hay ETFs UCITS específicos disponibles: ${c.relatedEtfs.slice(0, 3).map(e => e.ticker).join(', ')}. Se compran desde Trade Republic, DEGIRO o MyInvestor con comisiones bajas.` : `No hay ETFs UCITS muy populares dedicados exclusivamente a ${c.name}. La exposición se consigue a través de ETFs regionales (emergentes globales para emergentes, MSCI World para desarrollados).` },
    { q: `¿Cuál es el convenio fiscal entre España y ${c.name}?`, a: c.taxTreaty },
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Países', url: `${BASE_URL}/pais` }, { name: c.name, url: pageUrl }] }} />
      <JsonLd schema={{ type: 'Article', headline: `Invertir en ${c.name} desde España`, description: lead, url: pageUrl, datePublished: '2026-05-24', dateModified: '2026-05-30', articleSection: 'Análisis por país' }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><Link href="/pais" className="hover:text-fg">Países</Link><span className="mx-2">/</span><span className="text-fg">{c.name}</span></nav>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Invertir en {c.name} desde España (2026)</h1>
            <p className="mt-3 text-fg leading-relaxed">{lead}</p>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">{c.tagline}.</p>
          </header>
          <Card className="mb-8">
            <CardTitle className="mb-3">Ficha del país</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><dt className="text-xs uppercase text-fg-muted">Peso global</dt><dd className="font-medium text-fg">{c.worldWeight}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Tipo de mercado</dt><dd className="font-medium text-fg capitalize">{c.marketType}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs uppercase text-fg-muted">Convenio fiscal</dt><dd className="text-fg text-xs">{c.taxTreaty}</dd></div>
            </dl>
          </Card>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-3">Sobre {c.name}</h2>
            <p className="text-fg-muted leading-relaxed">{c.description}</p>
          </section>
          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardTitle className="mb-3"><span className="text-accent">✓</span> Pros</CardTitle>
              <ul className="space-y-2 text-sm text-fg-muted">{c.pros.map((p) => (<li key={p} className="flex gap-2"><span className="text-accent shrink-0">•</span><span>{p}</span></li>))}</ul>
            </Card>
            <Card>
              <CardTitle className="mb-3"><span className="text-danger/70">✗</span> Contras</CardTitle>
              <ul className="space-y-2 text-sm text-fg-muted">{c.cons.map((p) => (<li key={p} className="flex gap-2"><span className="text-danger/70 shrink-0">•</span><span>{p}</span></li>))}</ul>
            </Card>
          </section>
          {c.relatedEtfs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-fg mb-4">ETFs UCITS para {c.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.relatedEtfs.map((etf) => (
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
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">{q}<span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">▾</span></summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-3">Otros países / regiones</h2>
            <div className="flex flex-wrap gap-2">
              {others.map((x) => (
                <Link key={x.slug} href={`/pais/${x.slug}`} className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors">{x.name}</Link>
              ))}
            </div>
          </section>
          <p className="mt-8 text-xs text-fg-subtle text-center">Información educativa, no asesoramiento. Última revisión: mayo 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
