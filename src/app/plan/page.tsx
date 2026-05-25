import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { AGES } from '@/data/ages'
import { OBJECTIVES } from '@/data/objectives'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Plan personalizado de inversión por edad y objetivo (2026)',
  description: `Selecciona tu edad y objetivo patrimonial para ver el plan personalizado: aportación mensual necesaria, cartera recomendada y broker. ${AGES.length}×${OBJECTIVES.length} combinaciones.`,
  alternates: { canonical: '/plan' },
}

export default function PlanIndexPage() {
  return (
    <>
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Plan', url: `${BASE_URL}/plan` }] }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><span className="text-fg">Plan</span></nav>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Plan personalizado por edad y objetivo</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">Selecciona tu edad actual y el objetivo patrimonial para ver cuánto necesitas invertir al mes, qué cartera usar y dónde implementarla. {AGES.length}×{OBJECTIVES.length} = {AGES.length * OBJECTIVES.length} planes personalizados.</p>
          </header>

          <section className="mb-10">
            <h2 className="text-lg font-bold text-fg mb-3">Por edad</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AGES.map((a) => (
                <Link key={a.slug} href={`/plan/${a.slug}/1-millon-euros`}>
                  <Card className="text-center hover:border-border-strong transition-colors">
                    <div className="text-2xl font-bold text-brand-400">{a.age}<span className="text-xs text-fg-muted">a</span></div>
                    <p className="text-xs text-fg-muted mt-1">{a.recommendedEquity}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-fg mb-3">Por objetivo</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {OBJECTIVES.map((o) => (
                <Link key={o.slug} href={`/plan/35-anios/${o.slug}`}>
                  <Card className="text-center hover:border-border-strong transition-colors">
                    <div className="text-lg font-bold text-accent">{o.label}</div>
                    <p className="text-xs text-fg-muted mt-1 capitalize">{o.type}</p>
                  </Card>
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
