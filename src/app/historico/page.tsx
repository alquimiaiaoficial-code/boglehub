import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { YEAR_EVENTS, HISTORICAL_YEAR_TICKERS } from '@/data/historical-years'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Histórico de ETFs por año: rendimientos y eventos (2020-2024)',
  description: 'Rendimientos históricos de los ETFs más populares en España año por año, con análisis del contexto de mercado y eventos clave de cada ejercicio.',
  alternates: { canonical: '/historico' },
}

export default function HistoricoIndexPage() {
  return (
    <>
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Histórico', url: `${BASE_URL}/historico` }] }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><span className="text-fg">Histórico</span></nav>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Histórico de ETFs por año</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">Rendimientos año a año de los ETFs más populares, con contexto de mercado y eventos clave.</p>
          </header>

          {YEAR_EVENTS.slice().reverse().map((event) => (
            <section key={event.year} className="mb-8">
              <h2 className="text-2xl font-bold text-fg mb-3">{event.year} <span className="text-sm font-normal text-fg-muted capitalize">— Mercado {event.marketType}</span></h2>
              <p className="text-sm text-fg-muted mb-4">{event.summary}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HISTORICAL_YEAR_TICKERS.map((t) => {
                  const r = event.returns[t]
                  if (r == null) return null
                  return (
                    <Link key={t} href={`/historico/${event.year}/${t.toLowerCase()}`}>
                      <Card className="text-center hover:border-border-strong transition-colors">
                        <div className="font-mono text-sm font-semibold text-fg">{t}</div>
                        <p className={`text-xs mt-1 font-semibold ${r >= 0 ? 'text-accent' : 'text-danger'}`}>{r >= 0 ? '+' : ''}{(r * 100).toFixed(1)}%</p>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
