import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { ROBOADVISORS } from '@/data/roboadvisors'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Mejores roboadvisors en España (2026): comparativa completa',
  description: `Análisis individual de los ${ROBOADVISORS.length} roboadvisors más usados en España: Indexa Capital, Finizens, MyInvestor, inbestMe, Openbank. Comisiones, mínimos de apertura, perfiles de riesgo y para qué inversor es ideal cada uno.`,
  alternates: { canonical: '/roboadvisor' },
}

export default function RoboadvisorIndexPage() {
  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Roboadvisors', url: `${BASE_URL}/roboadvisor` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'CollectionPage',
          name: 'Mejores roboadvisors en España',
          description: `Análisis individual de ${ROBOADVISORS.length} roboadvisors populares en España.`,
          url: `${BASE_URL}/roboadvisor`,
          hasPart: ROBOADVISORS.map(r => ({ name: r.name, url: `${BASE_URL}/roboadvisor/${r.slug}` })),
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Roboadvisors</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Roboadvisors en España (2026)
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Análisis individual de los {ROBOADVISORS.length} roboadvisors más usados por
              inversores indexados en España. Cada ficha incluye coste total estimado, mínimo
              de apertura, número de perfiles de riesgo y para qué inversor es ideal.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROBOADVISORS.map((r) => (
              <Link key={r.slug} href={`/roboadvisor/${r.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <h2 className="text-lg font-semibold text-fg">{r.name}</h2>
                  <p className="text-xs text-fg-muted mt-1 line-clamp-2">{r.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-fg-muted">
                      {r.totalCost}
                    </span>
                    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-fg-muted">
                      Mín {r.minimumOpening}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <Card className="mt-10 text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Te merece la pena un roboadvisor frente a gestionar tu propia cartera?
            </p>
            <Link
              href="/calculadora/roboadvisor-vs-diy"
              className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-500 transition-colors inline-block"
            >
              Comparador roboadvisor vs DIY
            </Link>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
