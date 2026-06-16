import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { GLOSSARY_TERMS } from '@/data/glossary'

const BASE_URL = 'https://boglehub.com'

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'How much money do I need to start investing in Spain?',
    a: 'You can start with €1. MyInvestor lets you invest in index funds from €1, and Trade Republic allows automatic monthly savings plans in ETFs from €1/month. What matters is regularity and time invested, not the initial amount.',
  },
  {
    q: 'What is the best broker to start investing in Spain in 2026?',
    a: 'For most beginners, Trade Republic is the simplest option: €0 per trade, automatic monthly savings plans from €1, clean mobile app, 2-2.5% remunerated cash account. If you want to combine ETFs with index funds (tax-free fund-to-fund transfers in Spain), MyInvestor is the only platform offering both.',
  },
  {
    q: 'Is BogleHub for English speakers or only Spanish?',
    a: `BogleHub is primarily a Spanish-language platform for Boglehead investors residing in Spain. We offer an English summary section for international readers, but full content (35+ articles, ${GLOSSARY_TERMS.length}-term glossary, 68 ETF profiles, calculators) is in Spanish.`,
  },
  {
    q: 'What ETF should I buy as a beginner?',
    a: 'For most beginners, VWCE (Vanguard FTSE All-World UCITS ETF Acc, ISIN IE00BK5BQT80) is the simplest choice. It includes 3,700+ companies globally (developed + emerging markets), TER 0.19%, accumulation policy, domiciled in Ireland for tax efficiency. Available in Trade Republic with automatic savings plans from €1/month.',
  },
]

export const metadata: Metadata = {
  title: 'How to start investing in Spain as an English speaker (2026)',
  description: 'English guide to start investing in index funds and ETFs as a Spain resident. Brokers, taxation, recommended ETFs and step-by-step plan.',
  openGraph: {
    title: 'How to start investing in Spain | BogleHub',
    description: 'English guide for index investing in Spain: brokers, taxation, ETFs and step-by-step plan.',
    locale: 'en_US',
    images: ['/api/og?title=How%20to%20start%20investing&subtitle=Spain%20resident%20guide'],
  },
  alternates: {
    canonical: '/en/start',
    languages: {
      'es-ES': '/empezar',
      'en-US': '/en/start',
    },
  },
}

export default function EnStartPage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Home', url: BASE_URL }, { name: 'English', url: `${BASE_URL}/en` }, { name: 'Start investing', url: `${BASE_URL}/en/start` }] }} />
      <JsonLd schema={{ type: 'Article', headline: 'How to start investing in Spain (English guide)', description: 'Step-by-step English guide for index investing as a Spain resident.', url: `${BASE_URL}/en/start`, datePublished: '2026-05-24', articleSection: 'English guides' }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">English: How to start</span>
          </nav>

          <div className="mb-6 rounded-lg bg-surface-2 border border-border p-3 text-xs text-fg-muted">
            🇪🇸 Para la versión completa en español: <Link href="/empezar" className="text-brand-400 hover:text-brand-300 underline">Cómo empezar a invertir</Link>
          </div>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              How to start investing in Spain (2026 English guide)
            </h1>
            <p className="mt-4 text-fg-muted leading-relaxed">
              English-language guide for index investing as a resident in Spain. BogleHub is primarily a Spanish-language platform for the Boglehead community in Spain. This page provides an essential English summary for international readers who live in Spain or are planning to move.
            </p>
          </header>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-3">Why invest from Spain matters</h2>
            <p className="text-fg-muted leading-relaxed mb-3">
              Spain has specific tax rules for ETF and index fund investors that differ significantly from the UK or US. Key points:
            </p>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li className="flex gap-2"><span className="text-accent shrink-0">•</span><span><strong className="text-fg">UCITS only:</strong> US ETFs (VTI, SPY, VOO) are NOT available for retail purchase in Europe due to MiFID II. Use UCITS equivalents (VWCE, IWDA, CSPX).</span></li>
              <li className="flex gap-2"><span className="text-accent shrink-0">•</span><span><strong className="text-fg">Irish domicile preferred:</strong> Irish-domiciled ETFs (ISIN starting with IE) benefit from the Ireland-US tax treaty, reducing US dividend withholding from 30% to 15%.</span></li>
              <li className="flex gap-2"><span className="text-accent shrink-0">•</span><span><strong className="text-fg">Spanish savings tax (IRPF):</strong> 19% up to €6,000, 21% up to €50,000, 23% up to €200,000, 27% up to €300,000, 30% above. Applied on realized capital gains.</span></li>
              <li className="flex gap-2"><span className="text-accent shrink-0">•</span><span><strong className="text-fg">Fund-to-fund transfer:</strong> Unique Spanish advantage. Transfers between investment funds (not ETFs) are tax-deferred. Major reason to consider index funds over ETFs if you plan to rebalance.</span></li>
              <li className="flex gap-2"><span className="text-accent shrink-0">•</span><span><strong className="text-fg">Modelo 720:</strong> Mandatory annual declaration if you have more than €50,000 abroad (foreign brokers, real estate, accounts). Informative only, no tax due.</span></li>
            </ul>
          </section>

          <Card className="mb-8">
            <CardTitle className="mb-3">6-step plan for English speakers in Spain</CardTitle>
            <ol className="space-y-3 text-sm text-fg-muted">
              <li className="flex gap-3"><span className="text-accent">1.</span><span><strong className="text-fg">Build emergency fund:</strong> 3-6 months of expenses in a remunerated account before investing.</span></li>
              <li className="flex gap-3"><span className="text-accent">2.</span><span><strong className="text-fg">Choose broker:</strong> Trade Republic (€0/trade, German bank, BaFin-regulated) for beginners. MyInvestor (Spanish bank, CNMV-regulated) if you want index funds with tax-free transfers.</span></li>
              <li className="flex gap-3"><span className="text-accent">3.</span><span><strong className="text-fg">Pick portfolio:</strong> 80% VWCE (global stocks, ISIN IE00BK5BQT80, TER 0.19%) + 20% AGGH (global bonds EUR-hedged, ISIN IE00BDBRDM35, TER 0.10%).</span></li>
              <li className="flex gap-3"><span className="text-accent">4.</span><span><strong className="text-fg">Automate contributions:</strong> Configure monthly savings plan in Trade Republic. Set and forget.</span></li>
              <li className="flex gap-3"><span className="text-accent">5.</span><span><strong className="text-fg">Don't touch:</strong> Markets will fall 20-40% multiple times in your investing life. Don't sell. The cost of selling in panic is higher than any TER.</span></li>
              <li className="flex gap-3"><span className="text-accent">6.</span><span><strong className="text-fg">File Modelo 720 if applicable:</strong> If holdings abroad exceed €50,000 by Dec 31, file between Jan-Mar of next year.</span></li>
            </ol>
          </Card>

          <Card className="mb-8">
            <CardTitle className="mb-3">Spanish tax brackets for capital gains (2026)</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase text-fg-muted">
                    <th className="pb-2">Gain bracket</th>
                    <th className="pb-2 text-right">Tax rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="py-2 text-fg-muted">Up to €6,000</td><td className="py-2 text-right text-fg">19%</td></tr>
                  <tr><td className="py-2 text-fg-muted">€6,000 - €50,000</td><td className="py-2 text-right text-fg">21%</td></tr>
                  <tr><td className="py-2 text-fg-muted">€50,000 - €200,000</td><td className="py-2 text-right text-fg">23%</td></tr>
                  <tr><td className="py-2 text-fg-muted">€200,000 - €300,000</td><td className="py-2 text-right text-fg">27%</td></tr>
                  <tr><td className="py-2 text-fg-muted">Above €300,000</td><td className="py-2 text-right text-fg">28%</td></tr>
                </tbody>
              </table>
            </div>
          </Card>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">FAQ</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-border bg-surface px-5 py-4">
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">{q}<span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">▾</span></summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">For full Spanish content (35+ articles, {GLOSSARY_TERMS.length}-term glossary, 68 ETF profiles, calculators):</p>
            <Link href="/empezar" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Spanish version (full content)
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">Educational content, not financial advice. Last reviewed: May 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
