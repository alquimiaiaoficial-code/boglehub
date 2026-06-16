import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'

const BASE_URL = 'https://boglehub.com'

const FAQ = [
  { q: 'What is IRPF del ahorro?', a: 'IRPF del ahorro is the Spanish capital gains tax bracket. In 2026: 19% up to €6,000 gain, 21% up to €50,000, 23% up to €200,000, 27% up to €300,000, 30% above. Progressive: each bracket only taxes the portion within it.' },
  { q: 'What is the Modelo 720?', a: 'Mandatory informational declaration for Spain tax residents with foreign assets exceeding €50,000 per category (foreign bank accounts, securities like ETFs at DEGIRO or Trade Republic, foreign real estate). Filed Jan-Mar of following year. No tax due, just informative. Constitutional Court annulled disproportionate penalties in 2022 but obligation persists.' },
  { q: 'What is the fund-to-fund transfer (traspaso) advantage?', a: 'Unique Spanish tax benefit: transfers between investment funds (NOT ETFs) are tax-deferred. You can move money between funds without paying capital gains tax. IRPF is only triggered on final cash withdrawal. This makes investment funds (available at MyInvestor) more tax-efficient than ETFs for Spain residents who plan to rebalance.' },
  { q: 'How are accumulating ETF dividends taxed in Spain?', a: 'Accumulating ETFs (Acc) reinvest dividends internally. No tax event for the investor while holding. Only taxed on sale, as capital gain (precio venta - precio compra) at IRPF del ahorro rates. This is the most tax-efficient policy for accumulation phase.' },
  { q: 'What is the two-month rule (regla dos meses)?', a: 'Wash sale rule in Spain: if you sell an ETF or stock at a loss and rebuy the same security within 2 months before or after, the loss is disallowed for tax purposes. To realize a tax loss, wait more than 2 months before rebuying the same ticker, or buy a different ETF with similar exposure.' },
]

export const metadata: Metadata = {
  title: 'Spanish taxation of ETFs and index funds (English, 2026)',
  description: 'English guide to Spanish taxation of ETFs and index funds: IRPF brackets, Modelo 720, fund-to-fund transfers, wash sale rule, FIFO criterion.',
  alternates: { canonical: '/en/taxation', languages: { 'es-ES': '/blog/fiscalidad-etfs-espana-guia-completa', 'en-US': '/en/taxation' } },
}

export default function TaxationEn() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Home', url: BASE_URL }, { name: 'English', url: `${BASE_URL}/en` }, { name: 'Taxation', url: `${BASE_URL}/en/taxation` }] }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Home</Link><span className="mx-2">/</span><Link href="/en" className="hover:text-fg">English</Link><span className="mx-2">/</span><span className="text-fg">Taxation</span></nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Spanish taxation of ETFs and index funds</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">Essential English guide to how Spain taxes ETFs, index funds, dividends and capital gains for residents.</p>
          </header>

          <Card className="mb-6">
            <CardTitle className="mb-3">IRPF del ahorro brackets (2026)</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left text-xs uppercase text-fg-muted"><th className="pb-2">Gain bracket</th><th className="pb-2 text-right">Rate</th></tr></thead>
                <tbody>
                  <tr><td className="py-2">Up to €6,000</td><td className="py-2 text-right font-semibold text-fg">19%</td></tr>
                  <tr><td className="py-2">€6,000 - €50,000</td><td className="py-2 text-right font-semibold text-fg">21%</td></tr>
                  <tr><td className="py-2">€50,000 - €200,000</td><td className="py-2 text-right font-semibold text-fg">23%</td></tr>
                  <tr><td className="py-2">€200,000 - €300,000</td><td className="py-2 text-right font-semibold text-fg">27%</td></tr>
                  <tr><td className="py-2">Above €300,000</td><td className="py-2 text-right font-semibold text-fg">30%</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-fg-subtle">Progressive: each bracket taxes only the portion within it. €10,000 gain pays €1,140 (19% of €6,000) + €840 (21% of €4,000) = €1,980 total.</p>
          </Card>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">FAQ</h2>
            <div className="space-y-3">
              {FAQ.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-border bg-surface px-5 py-4">
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">{q}<span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">▾</span></summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">For full Spanish content with all tax scenarios:</p>
            <Link href="/blog/fiscalidad-etfs-espana-guia-completa" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">Full Spanish ETF tax guide</Link>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
