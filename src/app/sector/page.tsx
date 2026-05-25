import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { SECTORS } from '@/data/sectors'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Invertir por sectores económicos desde España (2026)',
  description: `Análisis de los ${SECTORS.length} sectores económicos principales: tecnología, salud, financiero, consumo, industrial, energía, utilities y más. ETFs UCITS disponibles para cada sector.`,
  alternates: { canonical: '/sector' },
}

export default function SectorIndexPage() {
  return (
    <>
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Sectores', url: `${BASE_URL}/sector` }] }} />
      <JsonLd schema={{ type: 'CollectionPage', name: 'Sectores económicos', description: 'Análisis sectorial para inversores indexados.', url: `${BASE_URL}/sector`, hasPart: SECTORS.map(s => ({ name: s.name, url: `${BASE_URL}/sector/${s.slug}` })) }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><span className="text-fg">Sectores</span></nav>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Sectores económicos</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">Análisis de los {SECTORS.length} sectores principales del MSCI World con ETFs UCITS y consideraciones para inversor español.</p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SECTORS.map((s) => (
              <Link key={s.slug} href={`/sector/${s.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <h2 className="text-lg font-semibold text-fg">{s.name}</h2>
                  <p className="text-xs text-fg-muted mt-1 line-clamp-2">{s.tagline}</p>
                  <p className="text-xs text-brand-400 mt-2">Peso MSCI World: {s.msciWorldWeight}</p>
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
