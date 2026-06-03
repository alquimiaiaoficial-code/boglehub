import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { INVESTOR_PROFILES } from '@/data/investor-profiles'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Cómo invertir según tu perfil: guía por edad y situación 2026',
  description: `Estrategias de inversión indexada para ${INVESTOR_PROFILES.length} perfiles: jóvenes, cerca de la jubilación, autónomos, expatriados, FIRE y más. Cartera y broker para cada uno.`,
  alternates: { canonical: '/perfil' },
}

export default function PerfilIndexPage() {
  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Perfiles de inversor', url: `${BASE_URL}/perfil` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'CollectionPage',
          name: 'Perfiles de inversor — estrategias específicas',
          description: `Guías de inversión indexada adaptadas a ${INVESTOR_PROFILES.length} perfiles personales.`,
          url: `${BASE_URL}/perfil`,
          hasPart: INVESTOR_PROFILES.map(p => ({ name: p.name, url: `${BASE_URL}/perfil/${p.slug}` })),
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Perfiles de inversor</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Cómo invertir según tu perfil
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Estrategias específicas de inversión indexada adaptadas a {INVESTOR_PROFILES.length}
              {' '}perfiles concretos. Encuentra el tuyo y descubre la cartera, broker y aportación
              recomendadas para tu situación.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INVESTOR_PROFILES.map((p) => (
              <Link key={p.slug} href={`/perfil/${p.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <h2 className="text-lg font-semibold text-fg">{p.name}</h2>
                  <p className="text-sm text-fg-muted mt-1">{p.tagline}</p>
                  <p className="text-xs text-brand-400 mt-3">{p.recommendations.horizon} · {p.recommendations.equityWeight}</p>
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
