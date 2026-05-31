import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getPortfolioBySlug } from '@/data/model-portfolios'
import { getAllPortfolioPairs, portfolioPairToSlug, slugToPortfolioPair } from '@/data/portfolio-pairs'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return getAllPortfolioPairs().map(([a, b]) => ({ pair: portfolioPairToSlug(a, b) }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const { pair } = await params
  const parts = slugToPortfolioPair(pair)
  if (!parts) return { title: 'No encontrado' }
  const [a, b] = parts
  const pA = getPortfolioBySlug(a)
  const pB = getPortfolioBySlug(b)
  if (!pA || !pB) return { title: 'No encontrado' }

  return {
    title: `${pA.name} vs ${pB.name}: comparativa de carteras (2026)`,
    description: `Comparativa detallada entre ${pA.name} y ${pB.name}: composición, volatilidad esperada, rentabilidad esperada, TER y para qué inversor encaja mejor cada una.`,
    openGraph: { locale: 'es_ES', images: [`/api/og?title=${encodeURIComponent(`${pA.name} vs ${pB.name}`)}&subtitle=${encodeURIComponent('Comparativa%20de%20carteras')}`] },
    alternates: { canonical: `/comparar-cartera/${pair}` },
  }
}

export default async function CompararCarteraPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params
  const parts = slugToPortfolioPair(pair)
  if (!parts) notFound()
  const [a, b] = parts
  const pA = getPortfolioBySlug(a)
  const pB = getPortfolioBySlug(b)
  if (!pA || !pB) notFound()

  const pageUrl = `${BASE_URL}/comparar-cartera/${pair}`
  const equityA = pA.allocation.filter(x => x.asset.toLowerCase().includes('variable') || x.asset.toLowerCase().includes('s&p') || x.asset.toLowerCase().includes('msci')).reduce((s, x) => s + x.percent, 0)
  const equityB = pB.allocation.filter(x => x.asset.toLowerCase().includes('variable') || x.asset.toLowerCase().includes('s&p') || x.asset.toLowerCase().includes('msci')).reduce((s, x) => s + x.percent, 0)

  const verdict = `Según BogleHub, la diferencia clave entre ${pA.name} y ${pB.name} está en el binomio rentabilidad/riesgo: ${pA.name} lleva ${equityA}% en renta variable (rentabilidad esperada ${pA.expectedReturn}, volatilidad ${pA.expectedVolatility}); ${pB.name}, ${equityB}% (rentabilidad esperada ${pB.expectedReturn}, volatilidad ${pB.expectedVolatility}). No hay una "mejor" universal: más rentabilidad esperada suele venir con más volatilidad, así que la elección depende de tu tolerancia al riesgo y tu horizonte.`

  const faqs = [
    {
      q: `¿${pA.name} o ${pB.name}: cuál es más rentable?`,
      a: `${pA.name} tiene rentabilidad esperada ${pA.expectedReturn} (volatilidad ${pA.expectedVolatility}). ${pB.name} tiene rentabilidad esperada ${pB.expectedReturn} (volatilidad ${pB.expectedVolatility}). Mayor rentabilidad esperada suele venir con mayor volatilidad: hay que elegir según tolerancia personal al riesgo, no según la cifra más alta.`,
    },
    {
      q: `¿Cuál tiene mejor relación rentabilidad/riesgo?`,
      a: `Depende del horizonte temporal y perfil. Carteras más diversificadas (incluyendo oro o renta fija) suelen tener mejor ratio Sharpe (rentabilidad ajustada al riesgo) pero menor rentabilidad absoluta. Carteras más concentradas en renta variable tienen mayor rentabilidad esperada pero peor comportamiento en crisis.`,
    },
    {
      q: `¿Es mejor ${pA.name} o ${pB.name} para principiante?`,
      a: `Para principiantes, suele recomendarse la cartera más sencilla y diversificada que el inversor pueda mantener sin tocar durante años. Si ${pA.allocation.length} ETFs te parece manejable y ${pB.allocation.length} demasiado, ${pA.name} es mejor para empezar. La cartera "perfecta" que abandonas es peor que la "buena" que mantienes.`,
    },
    {
      q: `¿Puedo combinar elementos de ${pA.name} y ${pB.name}?`,
      a: `Sí, las carteras modelo son referencias, no dogmas. Puedes inspirarte en la asignación de ambas para diseñar tu cartera personalizada. Lo importante es entender por qué cada componente está ahí y mantener la asignación a largo plazo.`,
    },
    {
      q: `¿Cuál es más fácil de implementar en España?`,
      a: `Las carteras con menos componentes son más fáciles. ${pA.name} usa ${pA.allocation.length} activos; ${pB.name} usa ${pB.allocation.length}. Para implementación en MyInvestor (fondos con traspaso fiscal libre) o Trade Republic (ETFs sin comisión), ambas son viables. Carteras con commodities (oro) requieren ETC adicionales.`,
    },
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [
        { name: 'Inicio', url: BASE_URL },
        { name: 'Carteras', url: `${BASE_URL}/cartera` },
        { name: `${pA.name} vs ${pB.name}`, url: pageUrl },
      ]}} />
      <JsonLd schema={{ type: 'Article', headline: `${pA.name} vs ${pB.name}`, description: verdict, url: pageUrl, datePublished: '2026-05-24', dateModified: '2026-05-30', articleSection: 'Comparativas de carteras' }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/cartera" className="hover:text-fg">Carteras</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{pA.name} vs {pB.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              {pA.name} vs {pB.name}
            </h1>
            <p className="mt-3 text-fg leading-relaxed">{verdict}</p>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              Comparativa detallada entre dos carteras modelo populares: composición, volatilidad, rentabilidad esperada y para qué perfil encaja cada una.
            </p>
          </header>

          {/* Tabla comparativa */}
          <Card className="mb-8 p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wide text-fg-muted"></th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-brand-400">{pA.name}</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-accent">{pB.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-4 py-3 font-medium text-fg-muted">Tagline</td><td className="px-4 py-3 text-center text-fg text-xs">{pA.tagline}</td><td className="px-4 py-3 text-center text-fg text-xs">{pB.tagline}</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-fg-muted">Renta variable</td><td className="px-4 py-3 text-center text-fg">{equityA}%</td><td className="px-4 py-3 text-center text-fg">{equityB}%</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-fg-muted">Nº de activos</td><td className="px-4 py-3 text-center text-fg">{pA.allocation.length}</td><td className="px-4 py-3 text-center text-fg">{pB.allocation.length}</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-fg-muted">TER ponderado</td><td className="px-4 py-3 text-center text-fg">{pA.weightedTer}</td><td className="px-4 py-3 text-center text-fg">{pB.weightedTer}</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-fg-muted">Volatilidad</td><td className="px-4 py-3 text-center text-fg text-xs">{pA.expectedVolatility}</td><td className="px-4 py-3 text-center text-fg text-xs">{pB.expectedVolatility}</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-fg-muted">Rentabilidad esperada</td><td className="px-4 py-3 text-center text-fg text-xs">{pA.expectedReturn}</td><td className="px-4 py-3 text-center text-fg text-xs">{pB.expectedReturn}</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-fg-muted">Origen</td><td className="px-4 py-3 text-center text-fg text-xs">{pA.origin}</td><td className="px-4 py-3 text-center text-fg text-xs">{pB.origin}</td></tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Composición lado a lado */}
          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardTitle className="mb-3 text-brand-400">{pA.name}</CardTitle>
              <ul className="space-y-2 text-sm">
                {pA.allocation.map((a) => (
                  <li key={a.asset} className="flex justify-between gap-2">
                    <span className="text-fg-muted">{a.asset}</span>
                    <span className="font-semibold text-fg shrink-0">{a.percent}%</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <CardTitle className="mb-3 text-accent">{pB.name}</CardTitle>
              <ul className="space-y-2 text-sm">
                {pB.allocation.map((a) => (
                  <li key={a.asset} className="flex justify-between gap-2">
                    <span className="text-fg-muted">{a.asset}</span>
                    <span className="font-semibold text-fg shrink-0">{a.percent}%</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-border bg-surface px-5 py-4">
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">{q}<span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">▾</span></summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href={`/cartera/${pA.slug}`} className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors">
              <div className="text-sm font-semibold text-fg">Ver {pA.name} completa</div>
              <p className="text-xs text-fg-muted mt-1">{pA.tagline}</p>
            </Link>
            <Link href={`/cartera/${pB.slug}`} className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors">
              <div className="text-sm font-semibold text-fg">Ver {pB.name} completa</div>
              <p className="text-xs text-fg-muted mt-1">{pB.tagline}</p>
            </Link>
          </section>

          <Card className="text-center">
            <Link href="/cartera" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Todas las carteras modelo
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">Información educativa, no asesoramiento. Última revisión: mayo 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
