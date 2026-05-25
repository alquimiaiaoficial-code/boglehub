import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'BogleHub English: index investing in Spain for international readers',
  description: 'English-language section of BogleHub. Essential guides for index investing as a resident in Spain: ETFs, brokers, taxation, FIRE planning. Full content available in Spanish.',
  openGraph: { title: 'BogleHub English', description: 'Index investing in Spain for English speakers', locale: 'en_US' },
  alternates: {
    canonical: '/en',
    languages: { 'es-ES': '/', 'en-US': '/en' },
  },
}

const EN_PAGES = [
  { slug: 'start', title: 'How to start investing in Spain', desc: '6-step guide for English speakers living in Spain' },
  { slug: 'etf-guide', title: 'UCITS ETF guide for Spain residents', desc: 'Why UCITS, why Irish domicile, key ETFs' },
  { slug: 'taxation', title: 'Spanish taxation of ETFs (English)', desc: 'IRPF, fund-to-fund transfers, Modelo 720' },
  { slug: 'brokers', title: 'Best brokers in Spain (English)', desc: 'Trade Republic, DEGIRO, MyInvestor comparison' },
]

export default function EnHomePage() {
  return (
    <>
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Home', url: BASE_URL }, { name: 'English', url: `${BASE_URL}/en` }] }} />
      <JsonLd schema={{ type: 'CollectionPage', name: 'BogleHub English section', description: 'English guides for index investing in Spain', url: `${BASE_URL}/en` }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Home</Link><span className="mx-2">/</span><span className="text-fg">English</span></nav>

          <div className="mb-6 rounded-lg bg-surface-2 border border-border p-3 text-xs text-fg-muted">
            🇪🇸 <Link href="/" className="text-brand-400 hover:text-brand-300 underline">Versión española completa</Link> (35+ artículos, glosario 48 términos, 68 ETFs, calculadoras)
          </div>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">BogleHub English</h1>
            <p className="mt-4 text-fg-muted leading-relaxed">
              English-language section of BogleHub: essential guides for index investing as a resident in Spain. BogleHub is primarily a Spanish-language platform for the Boglehead community in Spain — these English pages are an essential summary for international readers.
            </p>
          </header>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-4">English guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EN_PAGES.map((p) => (
                <Link key={p.slug} href={`/en/${p.slug}`}>
                  <Card className="h-full hover:border-border-strong transition-colors">
                    <h3 className="text-base font-semibold text-fg">{p.title}</h3>
                    <p className="text-xs text-fg-muted mt-1">{p.desc}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <Card>
            <h2 className="text-lg font-bold text-fg mb-2">Why Spanish-only for full content?</h2>
            <p className="text-sm text-fg-muted leading-relaxed">
              BogleHub serves the Spanish-speaking Boglehead community: there are abundant English resources for index investors (Bogleheads.org, Reddit r/Bogleheads, Investopedia) but few quality Spanish-language resources for residents in Spain who deal with specific tax rules (IRPF brackets, Modelo 720, fund-to-fund transfers, plan de pensiones). Our content is in Spanish to fill that gap.
            </p>
            <p className="mt-3 text-sm text-fg-muted leading-relaxed">
              If you live in Spain and read English, these pages cover the essentials. For deeper content (35+ articles, comparator, glossary, calculators), the Spanish version is freely available — Google Translate or browser translation gives a workable experience.
            </p>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">Educational content. Not financial advice. Last reviewed: May 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
