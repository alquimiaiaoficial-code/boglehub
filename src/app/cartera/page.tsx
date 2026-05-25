import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { MODEL_PORTFOLIOS } from '@/data/model-portfolios'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Carteras modelo de inversión indexada (2026)',
  description: `Análisis de ${MODEL_PORTFOLIOS.length} carteras modelo populares: Boglehead 3 fondos, Cartera Permanente Harry Browne, All-Weather Ray Dalio, 60/40, 80/20, FIRE y más. Composición, ETFs y para qué perfil es cada una.`,
  alternates: { canonical: '/cartera' },
}

export default function CarteraIndexPage() {
  return (
    <>
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Carteras', url: `${BASE_URL}/cartera` }] }} />
      <JsonLd schema={{ type: 'CollectionPage', name: 'Carteras modelo de inversión indexada', description: `${MODEL_PORTFOLIOS.length} carteras analizadas`, url: `${BASE_URL}/cartera`, hasPart: MODEL_PORTFOLIOS.map(p => ({ name: p.name, url: `${BASE_URL}/cartera/${p.slug}` })) }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><span className="text-fg">Carteras modelo</span></nav>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Carteras modelo de inversión indexada</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">Análisis detallado de las {MODEL_PORTFOLIOS.length} carteras modelo más populares para inversores indexados en España, con composición exacta, ETFs sugeridos y para qué perfil encaja cada una.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MODEL_PORTFOLIOS.map((p) => (
              <Link key={p.slug} href={`/cartera/${p.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <h2 className="text-lg font-semibold text-fg">{p.name}</h2>
                  <p className="text-xs text-fg-muted mt-1 line-clamp-2">{p.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-1 text-xs">
                    {p.allocation.slice(0, 3).map((a) => (
                      <span key={a.asset} className="rounded-full bg-surface-2 px-2 py-0.5 text-fg-muted">{a.percent}% {a.suggestedTicker ?? a.asset.split(' ').slice(0, 2).join(' ')}</span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-brand-400">TER {p.weightedTer} · Vol {p.expectedVolatility}</p>
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
