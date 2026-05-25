import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getEtfByTicker } from '@/lib/etf-database'
import {
  HISTORICAL_AMOUNTS,
  HISTORICAL_TICKERS,
  HISTORICAL_START_YEARS,
  getHistoricalCAGR,
  calculateFinalValue,
  getAllHistoricalCombos,
} from '@/data/historical-returns'

const BASE_URL = 'https://boglehub.com'
const REFERENCE_YEAR = 2024

function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function generateStaticParams() {
  return getAllHistoricalCombos().map(({ amount, ticker, year }) => ({
    cantidad: amount.toString(),
    ticker: ticker.toLowerCase(),
    ano: year.toString(),
  }))
}
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cantidad: string; ticker: string; ano: string }>
}): Promise<Metadata> {
  const { cantidad, ticker, ano } = await params
  const amount = parseInt(cantidad)
  const year = parseInt(ano)
  const etf = getEtfByTicker(ticker)
  const cagr = getHistoricalCAGR(etf?.ticker ?? '', year)
  if (!etf || cagr == null) return { title: 'No encontrado' }

  const years = REFERENCE_YEAR - year
  const final = calculateFinalValue(amount, cagr, years)

  return {
    title: `Si hubiera invertido ${formatEUR(amount)} en ${etf.ticker} en ${year}: ${formatEUR(final)} en 2024`,
    description: `Análisis histórico: invertir ${formatEUR(amount)} en ${etf.name} (${etf.ticker}) en ${year} habría dado ${formatEUR(final)} a finales de 2024 (CAGR ${(cagr * 100).toFixed(1)}% anual).`,
    openGraph: {
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(`${formatEUR(amount)} en ${etf.ticker}`)}&subtitle=${encodeURIComponent(`Desde ${year}`)}`],
    },
    alternates: { canonical: `/simulacion/${cantidad}/${ticker}/${ano}` },
  }
}

export default async function SimulacionPage({
  params,
}: {
  params: Promise<{ cantidad: string; ticker: string; ano: string }>
}) {
  const { cantidad, ticker, ano } = await params
  const amount = parseInt(cantidad)
  const year = parseInt(ano)
  const etf = getEtfByTicker(ticker)
  const cagr = getHistoricalCAGR(etf?.ticker ?? '', year)
  if (!etf || cagr == null) notFound()

  const years = REFERENCE_YEAR - year
  const final = calculateFinalValue(amount, cagr, years)
  const gain = final - amount
  const multiplier = final / amount

  const pageUrl = `${BASE_URL}/simulacion/${cantidad}/${ticker}/${ano}`

  const faqs = [
    {
      q: `¿Cuánto habría ganado invirtiendo ${formatEUR(amount)} en ${etf.ticker} en ${year}?`,
      a: `Si hubieras invertido ${formatEUR(amount)} en ${etf.name} (${etf.ticker}) en ${year} y mantenido la posición hasta diciembre de 2024 (${years} años), habrías acumulado aproximadamente ${formatEUR(final)}. La ganancia neta sería de ${formatEUR(gain)}, equivalente a un CAGR (tasa de crecimiento anual compuesto) del ${(cagr * 100).toFixed(1)}%.`,
    },
    {
      q: `¿Es ${(cagr * 100).toFixed(1)}% anual realista a futuro?`,
      a: `No necesariamente. ${(cagr * 100).toFixed(1)}% es el CAGR histórico desde ${year} hasta 2024, que incluye el extraordinario mercado alcista post-COVID. Para planificación a futuro, usar 7% nominal anual es más prudente (rentabilidad histórica del MSCI World a 100 años). Las rentabilidades pasadas no garantizan rentabilidades futuras.`,
    },
    {
      q: `¿Habría sido mejor DCA mensual en lugar de lump sum?`,
      a: `Esta simulación asume inversión única (lump sum) en ${year} y mantener hasta hoy. Una estrategia DCA mensual desde ${year} con la misma cantidad total habría dado un resultado ligeramente inferior porque no todo el capital habría estado invertido desde el principio. Estadísticamente, lump sum supera a DCA en 2/3 de los periodos históricos.`,
    },
    {
      q: `¿Cómo invierto hoy en ${etf.ticker}?`,
      a: `${etf.ticker} (ISIN ${etf.isin}) se compra desde Trade Republic (0€ por operación), DEGIRO (~0,50€) o MyInvestor (0,20€ + 0,03%). Para nuevas aportaciones, considera planes de ahorro automáticos en Trade Republic desde 1€/mes.`,
    },
    {
      q: `¿Qué pasó con ${etf.ticker} entre ${year} y 2024?`,
      a: `El periodo ${year}-2024 incluye eventos importantes: ${year <= 2018 ? 'mercado alcista 2010s, ' : ''}${year <= 2020 ? 'caída COVID marzo 2020 (-30%) y recuperación rápida en V, ' : ''}corrección 2022 (-15-20%), recuperación 2023-2024. ${etf.ticker} habría capturado todos estos movimientos. El CAGR final del ${(cagr * 100).toFixed(1)}% es el resultado neto.`,
    },
  ]

  // Otras combinaciones relacionadas
  const otherYears = HISTORICAL_START_YEARS.filter((y) => y !== year).slice(0, 4)
  const otherAmounts = HISTORICAL_AMOUNTS.filter((a) => a !== amount).slice(0, 4)
  const otherTickers = HISTORICAL_TICKERS.filter((t) => t !== etf.ticker).slice(0, 4)

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [
        { name: 'Inicio', url: BASE_URL },
        { name: 'Simulaciones', url: `${BASE_URL}/simulacion` },
        { name: `${formatEUR(amount)} en ${etf.ticker} (${year})`, url: pageUrl },
      ]}} />
      <JsonLd schema={{ type: 'Article', headline: `${formatEUR(amount)} invertidos en ${etf.ticker} en ${year}`, description: `Simulación histórica de inversión.`, url: pageUrl, datePublished: '2026-05-24', articleSection: 'Simulaciones históricas' }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/simulacion" className="hover:text-fg">Simulaciones</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{etf.ticker} {year}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Si hubiera invertido {formatEUR(amount)} en {etf.ticker} en {year}…
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Simulación histórica: cuánto habrías acumulado invirtiendo {formatEUR(amount)} en {etf.name} en {year} y manteniéndolo hasta diciembre 2024 (${years} años).
            </p>
          </header>

          {/* Resultado destacado */}
          <Card className="mb-8 bg-accent-dim border-accent/30">
            <p className="text-xs uppercase tracking-wide text-fg-muted mb-2">Resultado a 31 dic 2024</p>
            <div className="text-4xl sm:text-5xl font-bold text-accent">{formatEUR(final)}</div>
            <p className="mt-3 text-sm text-fg leading-relaxed">
              Ganancia neta: <strong className="text-accent">{formatEUR(gain)}</strong> ({((gain / amount) * 100).toFixed(0)}%)<br />
              Multiplicador: <strong>×{multiplier.toFixed(2)}</strong> en {years} años<br />
              CAGR: <strong>{(cagr * 100).toFixed(1)}%</strong> anual compuesto
            </p>
          </Card>

          {/* Tabla evolución */}
          <Card className="mb-8">
            <CardTitle className="mb-4">Evolución teórica año a año</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-fg-muted">
                    <th className="pb-2">Año</th>
                    <th className="pb-2 text-right">Capital teórico</th>
                    <th className="pb-2 text-right">Ganancia acumulada</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: years + 1 }, (_, i) => {
                    const y = year + i
                    const val = calculateFinalValue(amount, cagr, i)
                    return (
                      <tr key={y} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5">{y}</td>
                        <td className="py-2.5 text-right font-semibold text-fg">{formatEUR(val)}</td>
                        <td className="py-2.5 text-right text-accent">{formatEUR(val - amount)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-fg-subtle">
              Proyección lineal usando CAGR histórico. La evolución real fue volátil (años buenos y malos), no monotónica.
            </p>
          </Card>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-border bg-surface px-5 py-4">
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">
                    {q}
                    <span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Combinaciones relacionadas */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-3">Otros escenarios</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs uppercase text-fg-muted mb-2">Otros años de inicio</p>
                <div className="flex flex-wrap gap-2">
                  {otherYears.map((y) => getHistoricalCAGR(etf.ticker, y) && (
                    <Link key={y} href={`/simulacion/${cantidad}/${ticker}/${y}`} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-brand-400 hover:text-brand-300">
                      Desde {y}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase text-fg-muted mb-2">Otras cantidades</p>
                <div className="flex flex-wrap gap-2">
                  {otherAmounts.map((a) => (
                    <Link key={a} href={`/simulacion/${a}/${ticker}/${ano}`} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-brand-400 hover:text-brand-300">
                      {formatEUR(a)}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase text-fg-muted mb-2">Otros ETFs</p>
                <div className="flex flex-wrap gap-2">
                  {otherTickers.map((t) => getHistoricalCAGR(t, year) && (
                    <Link key={t} href={`/simulacion/${cantidad}/${t.toLowerCase()}/${ano}`} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-brand-400 hover:text-brand-300">
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">Simula con tu cantidad personalizada</p>
            <Link href="/calculadora/interes-compuesto" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Calculadora interés compuesto
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento. CAGR históricos basados en datos públicos hasta dic 2024. Rentabilidades pasadas no garantizan futuras. Última revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
