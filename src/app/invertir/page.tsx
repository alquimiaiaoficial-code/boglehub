import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { MONTHLY_AMOUNTS } from '@/data/monthly-amounts'

const BASE_URL = 'https://boglehub.com'

function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export const metadata: Metadata = {
  title: 'Cuánto invertir al mes en España: guías por cantidad (2026)',
  description: `Guías específicas para invertir desde 50€ hasta 2.000€ al mes en fondos indexados en España. Proyección 10/20/30 años con interés compuesto al 7%.`,
  alternates: { canonical: '/invertir' },
}

export default function InvertirIndexPage() {
  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Invertir al mes', url: `${BASE_URL}/invertir` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'CollectionPage',
          name: 'Guías por cantidad mensual',
          description: 'Estrategias y proyecciones para invertir mensualmente cantidades concretas.',
          url: `${BASE_URL}/invertir`,
          hasPart: MONTHLY_AMOUNTS.map(m => ({ name: `${m.amount}€/mes`, url: `${BASE_URL}/invertir/${m.slug}` })),
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Invertir al mes</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Cuánto invertir al mes en fondos indexados
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Guías específicas por cantidad mensual con proyecciones de cuánto acumulas a 10, 20
              y 30 años invirtiendo en fondos indexados con rentabilidad histórica del 7%.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MONTHLY_AMOUNTS.map((m) => (
              <Link key={m.slug} href={`/invertir/${m.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <h2 className="text-2xl font-bold text-brand-400">{m.amount}€<span className="text-sm text-fg-muted">/mes</span></h2>
                  <p className="text-xs text-fg-muted mt-2">{m.scope}</p>
                  <p className="text-xs text-fg-subtle mt-2">A 30 años: {formatEUR(m.thirtyYearResult)}</p>
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
