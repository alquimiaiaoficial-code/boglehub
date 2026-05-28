import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { BROKERS } from '@/data/brokers'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Mejores brokers para invertir en ETFs desde España (2026)',
  description: `Listado y comparativa de los ${BROKERS.length} mejores brokers para invertir en ETFs UCITS desde España en 2026: Trade Republic, DEGIRO, MyInvestor, XTB, Interactive Brokers, Renta 4, Openbank, ING, eToro, Scalable Capital. Comisiones, regulación y para quién es ideal cada uno.`,
  alternates: {
    canonical: '/broker',
    languages: { 'es-ES': '/broker', 'en-US': '/en/brokers' },
  },
}

export default function BrokerIndexPage() {
  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Brokers', url: `${BASE_URL}/broker` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'CollectionPage',
          name: 'Mejores brokers para invertir en ETFs desde España',
          description: `Análisis individual de ${BROKERS.length} brokers populares entre inversores indexados en España.`,
          url: `${BASE_URL}/broker`,
          hasPart: BROKERS.map(b => ({ name: b.name, url: `${BASE_URL}/broker/${b.slug}` })),
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Brokers</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Brokers para invertir en ETFs desde España
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Análisis individual de los {BROKERS.length} brokers más usados por inversores
              indexados en España. Cada ficha incluye comisiones reales, regulación, ventajas y
              limitaciones, y para qué perfil de inversor encaja mejor.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BROKERS.map((b) => (
              <Link key={b.slug} href={`/broker/${b.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="text-lg font-semibold text-fg">{b.name}</h2>
                    <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-xs text-fg-muted">
                      {b.regulatorCountry}
                    </span>
                  </div>
                  <p className="text-xs text-fg-muted line-clamp-2">{b.tagline}</p>
                  <p className="mt-3 text-xs text-brand-400 font-medium">
                    ETF: {b.etfCommission}
                  </p>
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
