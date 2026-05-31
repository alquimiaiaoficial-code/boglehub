import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'

const BASE_URL = 'https://boglehub.com'

const FAQ = [
  { q: 'Why can\'t I buy VTI or VOO in Spain?', a: 'US-domiciled ETFs (VTI, VOO, SPY) are blocked for European retail investors under MiFID II PRIIPs regulation. Issuers do not provide KID (Key Information Document) in EU languages. Solution: use UCITS equivalents — CSPX, VUAA or SPXS replicate the S&P 500; VWCE replicates FTSE All-World; IWDA replicates MSCI World.' },
  { q: 'What is the best UCITS ETF for the S&P 500?', a: 'CSPX (iShares Core S&P 500, ISIN IE00B5BMR087, TER 0.07%) and VUAA (Vanguard S&P 500 Acc, ISIN IE00BFMXXD54, TER 0.07%) are the most popular and tied for the lowest TER. SPXS (SPDR S&P 500, TER 0.03%) is the cheapest. All are Irish-domiciled (15% US dividend withholding instead of 30%).' },
  { q: 'VWCE or IWDA for a global portfolio?', a: 'VWCE (FTSE All-World, TER 0.22%) includes emerging markets (~12%) in one ETF. IWDA (MSCI World, TER 0.20%) covers only developed markets — you would need to add EIMI (~12%) for full global exposure. VWCE is simpler; IWDA + EIMI gives more control over emerging market weight.' },
  { q: 'Why does Irish domicile matter?', a: 'Ireland has a tax treaty with the US reducing dividend withholding from 30% to 15%. Since ~63% of MSCI World is US-listed companies, this saves about 0.2% annually on dividend yield. Look for ISINs starting with IE.' },
]

export const metadata: Metadata = {
  title: 'UCITS ETF guide for Spain residents (English, 2026)',
  description: 'English guide to UCITS ETFs available in Spain: why UCITS, Irish vs Luxembourg domicile, top picks for MSCI World, S&P 500, All-World, emerging markets and bonds.',
  alternates: { canonical: '/en/etf-guide', languages: { 'es-ES': '/etfs', 'en-US': '/en/etf-guide' } },
}

export default function EtfGuideEn() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Home', url: BASE_URL }, { name: 'English', url: `${BASE_URL}/en` }, { name: 'ETF guide', url: `${BASE_URL}/en/etf-guide` }] }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Home</Link><span className="mx-2">/</span><Link href="/en" className="hover:text-fg">English</Link><span className="mx-2">/</span><span className="text-fg">ETF guide</span></nav>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">UCITS ETF guide for Spain residents</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">English guide to the UCITS ETFs available for investors residing in Spain: why UCITS only, why Irish domicile matters, and the most popular ETFs by category.</p>
          </header>

          <Card className="mb-6">
            <CardTitle className="mb-3">Top UCITS ETFs by category</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border text-left text-xs uppercase text-fg-muted"><th className="pb-2">Category</th><th className="pb-2">Ticker</th><th className="pb-2">ISIN</th><th className="pb-2 text-right">TER</th></tr></thead>
                <tbody>
                  <tr><td className="py-2 text-fg-muted">Global (with EM)</td><td className="py-2 font-mono text-fg">VWCE</td><td className="py-2 font-mono text-fg-muted text-xs">IE00BK5BQT80</td><td className="py-2 text-right text-fg">0.19%</td></tr>
                  <tr><td className="py-2 text-fg-muted">MSCI World</td><td className="py-2 font-mono text-fg">IWDA</td><td className="py-2 font-mono text-fg-muted text-xs">IE00B4L5Y983</td><td className="py-2 text-right text-fg">0.20%</td></tr>
                  <tr><td className="py-2 text-fg-muted">MSCI World (cheapest)</td><td className="py-2 font-mono text-fg">SWRD</td><td className="py-2 font-mono text-fg-muted text-xs">IE00BFY0GT14</td><td className="py-2 text-right text-fg">0.12%</td></tr>
                  <tr><td className="py-2 text-fg-muted">S&P 500</td><td className="py-2 font-mono text-fg">CSPX</td><td className="py-2 font-mono text-fg-muted text-xs">IE00B5BMR087</td><td className="py-2 text-right text-fg">0.07%</td></tr>
                  <tr><td className="py-2 text-fg-muted">Emerging Markets</td><td className="py-2 font-mono text-fg">EIMI</td><td className="py-2 font-mono text-fg-muted text-xs">IE00BKM4GZ66</td><td className="py-2 text-right text-fg">0.18%</td></tr>
                  <tr><td className="py-2 text-fg-muted">Global Bonds EUR-hedged</td><td className="py-2 font-mono text-fg">AGGH</td><td className="py-2 font-mono text-fg-muted text-xs">IE00BDBRDM35</td><td className="py-2 text-right text-fg">0.10%</td></tr>
                  <tr><td className="py-2 text-fg-muted">Nasdaq 100</td><td className="py-2 font-mono text-fg">EQQQ</td><td className="py-2 font-mono text-fg-muted text-xs">IE0032077012</td><td className="py-2 text-right text-fg">0.30%</td></tr>
                  <tr><td className="py-2 text-fg-muted">Physical Gold ETC</td><td className="py-2 font-mono text-fg">SGLN</td><td className="py-2 font-mono text-fg-muted text-xs">IE00B4ND3602</td><td className="py-2 text-right text-fg">0.12%</td></tr>
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
            <Link href="/etfs" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">Full Spanish ETF catalog (68 ETFs)</Link>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
