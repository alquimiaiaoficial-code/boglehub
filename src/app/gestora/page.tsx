import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { GESTORAS } from '@/data/gestoras'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Gestoras de ETFs y fondos indexados disponibles en España (2026)',
  description: `Análisis de las ${GESTORAS.length} principales gestoras de ETFs y fondos indexados con productos disponibles para inversores en España: Vanguard, iShares (BlackRock), SPDR, Amundi, Invesco, Xtrackers, Fidelity y más.`,
  alternates: { canonical: '/gestora' },
}

export default function GestoraIndexPage() {
  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Gestoras', url: `${BASE_URL}/gestora` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'CollectionPage',
          name: 'Gestoras de ETFs y fondos indexados disponibles en España',
          description: `${GESTORAS.length} gestoras con productos UCITS para inversores españoles.`,
          url: `${BASE_URL}/gestora`,
          hasPart: GESTORAS.map(g => ({ name: g.name, url: `${BASE_URL}/gestora/${g.slug}` })),
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Gestoras</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Gestoras de ETFs y fondos indexados
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Análisis de las {GESTORAS.length} principales gestoras de fondos indexados y ETFs
              UCITS con productos disponibles para inversores residentes en España.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GESTORAS.map((g) => (
              <Link key={g.slug} href={`/gestora/${g.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <h2 className="text-lg font-semibold text-fg">{g.name}</h2>
                  <p className="text-xs text-fg-muted mt-1 line-clamp-2">{g.tagline}</p>
                  <p className="mt-2 text-xs text-brand-400">AUM: {g.aum}</p>
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
