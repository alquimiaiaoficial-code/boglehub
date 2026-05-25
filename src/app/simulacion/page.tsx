import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { HISTORICAL_AMOUNTS, HISTORICAL_TICKERS, HISTORICAL_START_YEARS } from '@/data/historical-returns'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Simulaciones históricas: cuánto habrías ganado invirtiendo en X (2026)',
  description: `Simulaciones históricas de inversión: cuánto habrías ganado invirtiendo cantidades concretas en ETFs populares desde años clave (2010, 2015, 2018, 2020, 2022) hasta 2024.`,
  alternates: { canonical: '/simulacion' },
}

export default function SimulacionIndexPage() {
  return (
    <>
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Simulaciones', url: `${BASE_URL}/simulacion` }] }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><span className="text-fg">Simulaciones</span></nav>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Si hubiera invertido…</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">Simulaciones históricas reales: cuánto habrías acumulado invirtiendo cantidades concretas en ETFs populares desde años clave hasta diciembre 2024.</p>
          </header>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-3">Por ETF</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {HISTORICAL_TICKERS.map((t) => (
                <Link key={t} href={`/simulacion/10000/${t.toLowerCase()}/2020`}>
                  <Card className="text-center hover:border-border-strong transition-colors">
                    <div className="font-mono font-bold text-brand-400">{t}</div>
                    <p className="text-xs text-fg-muted mt-1">10.000€ desde 2020</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-3">Por año de inicio</h2>
            <div className="flex flex-wrap gap-2">
              {HISTORICAL_START_YEARS.map((y) => (
                <Link key={y} href={`/simulacion/10000/vwce/${y}`} className="rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-fg-muted hover:border-border-strong hover:text-fg transition-colors">
                  Desde {y}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-fg mb-3">Por cantidad inicial</h2>
            <div className="flex flex-wrap gap-2">
              {HISTORICAL_AMOUNTS.map((a) => (
                <Link key={a} href={`/simulacion/${a}/vwce/2020`} className="rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-fg-muted hover:border-border-strong hover:text-fg transition-colors">
                  {a.toLocaleString('es-ES')}€
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
