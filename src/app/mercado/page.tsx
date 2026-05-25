import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { HISPANO_MARKETS } from '@/data/hispano-markets'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Inversión indexada en mercados hispanohablantes (2026)',
  description: 'Guías específicas por país hispanohablante: México, Argentina, Colombia, Chile, Perú. Brokers locales, fiscalidad, ETFs y estrategia para residentes de cada país.',
  alternates: { canonical: '/mercado' },
}

export default function MercadoIndexPage() {
  return (
    <>
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Mercados', url: `${BASE_URL}/mercado` }] }} />
      <JsonLd schema={{ type: 'CollectionPage', name: 'Mercados hispanohablantes', description: 'Inversión indexada por país hispanohablante', url: `${BASE_URL}/mercado`, hasPart: HISPANO_MARKETS.map(m => ({ name: m.countryName, url: `${BASE_URL}/mercado/${m.slug}` })) }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><span className="text-fg">Mercados</span></nav>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Inversión indexada por país hispanohablante</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">Guías específicas con brokers locales, fiscalidad y estrategia para residentes en cada país hispanohablante. BogleHub está orientado principalmente a España, pero ofrecemos guías esenciales para inversores residentes en otros países de habla hispana.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HISPANO_MARKETS.map((m) => (
              <Link key={m.slug} href={`/mercado/${m.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <h2 className="text-2xl font-bold text-fg">{m.flag} {m.countryName}</h2>
                  <p className="text-sm text-fg-muted mt-2">{m.tagline}</p>
                  <p className="text-xs text-brand-400 mt-3">Moneda: {m.currency}</p>
                </Card>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-xs text-fg-subtle text-center">Para residentes en España, el resto del sitio cubre fiscalidad española en detalle (35+ artículos, 48-term glosario, 68 ETFs).</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
