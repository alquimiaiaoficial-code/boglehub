import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { COUNTRIES } from '@/data/countries'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Invertir por país o región desde España (2026)',
  description: `Análisis de los ${COUNTRIES.length} países / regiones principales para invertir desde España: EE.UU., Europa, Japón, China, India, emergentes y más. ETFs UCITS específicos.`,
  alternates: { canonical: '/pais' },
}

export default function PaisIndexPage() {
  return (
    <>
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Países', url: `${BASE_URL}/pais` }] }} />
      <JsonLd schema={{ type: 'CollectionPage', name: 'Países y regiones', description: 'Análisis por geografía para inversores indexados.', url: `${BASE_URL}/pais`, hasPart: COUNTRIES.map(c => ({ name: c.name, url: `${BASE_URL}/pais/${c.slug}` })) }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><span className="text-fg">Países</span></nav>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Invertir por país o región</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">Análisis de {COUNTRIES.length} países y regiones principales con ETFs UCITS y consideraciones fiscales para inversor español.</p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COUNTRIES.map((c) => (
              <Link key={c.slug} href={`/pais/${c.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <h2 className="text-lg font-semibold text-fg">{c.name}</h2>
                  <p className="text-xs text-fg-muted mt-1 line-clamp-2">{c.tagline}</p>
                  <div className="mt-3 flex gap-2 text-xs">
                    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-fg-muted">{c.worldWeight}</span>
                    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-fg-muted capitalize">{c.marketType}</span>
                  </div>
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
