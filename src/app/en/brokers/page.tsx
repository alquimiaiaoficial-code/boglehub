import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'

import { DescargoFiscal } from '@/components/DescargoFiscal'
const BASE_URL = 'https://boglehub.com'

const FAQ = [
  { q: 'Which broker is best for beginners in Spain?', a: 'It depends on how you invest. Trade Republic (German bank, BaFin-regulated, with a Spanish branch) charges €1 per one-off trade and nothing on its automatic savings plans, which start at €1/month; it has a mobile-first app and pays variable interest on cash. XTB and Scalable Capital also offer commission-free savings plans. Fees as published on each broker website on 30 Sep 2026.' },
  { q: 'Which broker offers index funds with tax-free transfers?', a: 'Fund-to-fund tax-free transfers are a Spanish regime handled by entities that distribute funds in Spain. MyInvestor (Spanish bank, supervised by the Bank of Spain and the CNMV) offers index funds from Vanguard, iShares, Amundi and Fidelity with no purchase fee; other Spanish entities such as Openbank, ING or Renta 4 also distribute funds. MyInvestor charges 0.12% per ETF trade (minimum €1, maximum €25).' },
  { q: 'Is DEGIRO safe for Spain residents?', a: 'Yes. DEGIRO is regulated by AFM (Netherlands) and subsidiary of flatexDEGIRO Bank AG (BaFin-regulated). Dutch Investor Compensation Scheme covers up to €20,000. In the standard accounts DEGIRO may lend your securities; in the Custody account it does not.' },
  { q: 'Can I keep my US broker if I move to Spain?', a: 'Generally yes, but you become Spain tax-resident under the 183-day rule. Some US brokers (Vanguard, Fidelity) restrict EU residents and may force account closure. Schwab International and Interactive Brokers usually allow EU residents. Tax reporting: declare US income on Spanish IRPF + Modelo 720 if assets exceed €50k.' },
  { q: 'What is the cheapest broker for ETFs in Spain?', a: 'It depends on order size and whether you use a savings plan. Per one-off ETF order (each broker website, 30 Sep 2026): XTB €0 up to €100,000 a month; Trade Republic €1; DEGIRO €1 on its Core Selection (all ETFs traded on Tradegate) and €3 otherwise; MyInvestor 0.12% (minimum €1, maximum €25); Interactive Brokers 0.05% (minimum €1.25 plus exchange fees). Automatic savings plans are free at Trade Republic, XTB and Scalable Capital.' },
]

export const metadata: Metadata = {
  title: 'Best brokers in Spain for ETF investing (English, 2026)',
  description: 'English comparison of brokers for ETF and index fund investing as Spain resident: Trade Republic, DEGIRO, MyInvestor, Interactive Brokers, XTB.',
  alternates: { canonical: '/en/brokers', languages: { 'es-ES': '/broker', 'en-US': '/en/brokers' } },
}

export default function BrokersEn() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ, inLanguage: 'en' }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Home', url: BASE_URL }, { name: 'English', url: `${BASE_URL}/en` }, { name: 'Brokers', url: `${BASE_URL}/en/brokers` }] }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Home</Link><span className="mx-2">/</span><Link href="/en" className="hover:text-fg">English</Link><span className="mx-2">/</span><span className="text-fg">Brokers</span></nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Best brokers in Spain for ETF investing</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">English comparison of brokers available for Spain residents: commissions (read on each broker website on 30 Sep 2026), regulation, products and what matters for each profile.</p>
          </header>

          <Card className="mb-6">
            <CardTitle className="mb-3">Broker comparison</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left text-xs uppercase text-fg-muted"><th className="pb-2">Broker</th><th className="pb-2">ETF fee</th><th className="pb-2">Index funds</th><th className="pb-2">Regulator</th></tr></thead>
                <tbody>
                  <tr><td className="py-2 font-semibold text-fg">Trade Republic</td><td className="py-2 text-fg-muted">€1 (savings plans free)</td><td className="py-2 text-fg-muted">No</td><td className="py-2 text-fg-muted text-xs">BaFin (Germany)</td></tr>
                  <tr><td className="py-2 font-semibold text-fg">DEGIRO</td><td className="py-2 text-fg-muted">€1 (Core Selection) or €3</td><td className="py-2 text-fg-muted">No</td><td className="py-2 text-fg-muted text-xs">AFM (Netherlands)</td></tr>
                  <tr><td className="py-2 font-semibold text-fg">MyInvestor</td><td className="py-2 text-fg-muted">0.12% (min €1, max €25)</td><td className="py-2 text-fg-muted">Yes (Vanguard, Amundi)</td><td className="py-2 text-fg-muted text-xs">CNMV (Spain)</td></tr>
                  <tr><td className="py-2 font-semibold text-fg">XTB</td><td className="py-2 text-fg-muted">€0 up to €100k/mo (savings plans free)</td><td className="py-2 text-fg-muted">No</td><td className="py-2 text-fg-muted text-xs">CNMV (Spain)</td></tr>
                  <tr><td className="py-2 font-semibold text-fg">Interactive Brokers</td><td className="py-2 text-fg-muted">Very low (tiered)</td><td className="py-2 text-fg-muted">Yes</td><td className="py-2 text-fg-muted text-xs">CBI (Ireland)</td></tr>
                </tbody>
              </table>
            </div>
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
            <Link href="/broker" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">Full Spanish broker analyses (10 brokers)</Link>
          </Card>
        </div>
      </main>
      <DescargoFiscal variant="general" lang="en" />
      <Footer />
    </>
  )
}
