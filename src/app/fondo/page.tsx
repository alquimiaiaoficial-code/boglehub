import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { INDEX_FUNDS } from '@/data/index-funds'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Mejores fondos indexados disponibles en España (2026)',
  description: `Los ${INDEX_FUNDS.length} mejores fondos indexados para España: Amundi Prime Global, Vanguard Global Stock, Fidelity MSCI World y más. TER, ISIN y traspaso fiscal libre.`,
  alternates: { canonical: '/fondo' },
}

export default function FondoIndexPage() {
  const byClass = ['Renta variable', 'Renta fija', 'Mixto'].map((cls) => ({
    cls,
    funds: INDEX_FUNDS.filter((f) => f.assetClass === cls).sort((a, b) => a.ter - b.ter),
  })).filter((g) => g.funds.length > 0)

  return (
    <>
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Fondos indexados', url: `${BASE_URL}/fondo` }] }} />
      <JsonLd schema={{
        type: 'CollectionPage',
        name: 'Mejores fondos indexados en España',
        description: `${INDEX_FUNDS.length} fondos indexados con traspaso fiscal libre disponibles para inversores en España.`,
        url: `${BASE_URL}/fondo`,
        hasPart: INDEX_FUNDS.map(f => ({ name: f.name, url: `${BASE_URL}/fondo/${f.slug}` })),
      }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><span className="text-fg">Fondos indexados</span></nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Mejores fondos indexados en España</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Análisis de los {INDEX_FUNDS.length} fondos indexados más populares disponibles en España (principalmente vía MyInvestor). A diferencia de los ETFs, los fondos permiten <strong className="text-fg">traspaso fiscal libre</strong> entre ellos — la mayor ventaja fiscal del régimen español de fondos.
            </p>
          </header>

          {byClass.map(({ cls, funds }) => (
            <section key={cls} className="mb-10">
              <h2 className="text-lg font-bold text-fg mb-4">{cls} <span className="text-sm font-normal text-fg-subtle">({funds.length})</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {funds.map((f) => (
                  <Link key={f.slug} href={`/fondo/${f.slug}`}>
                    <Card className="h-full hover:border-border-strong transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-semibold text-fg">{f.name}</h3>
                        <span className="shrink-0 rounded-full bg-brand-500/10 px-2 py-0.5 text-xs font-mono text-brand-400">{f.ter}%</span>
                      </div>
                      <p className="text-xs text-fg-muted mt-1">{f.region} · {f.manager}</p>
                      <p className="text-xs text-fg-subtle mt-2 font-mono">{f.isin}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <Card className="text-center mt-4">
            <p className="text-fg-muted text-sm mb-3">¿No sabes si elegir fondos o ETFs?</p>
            <Link href="/blog/fondos-indexados-vs-etfs-espana" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">Guía: fondos vs ETFs en España</Link>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
