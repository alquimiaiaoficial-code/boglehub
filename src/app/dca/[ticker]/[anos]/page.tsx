import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getEtfByTicker } from '@/lib/etf-database'
import { POPULAR_ETF_TICKERS } from '@/data/etf-broker-availability'

const BASE_URL = 'https://boglehub.com'
const HORIZONS = [5, 10, 15, 20, 25, 30]
const ASSUMED_RATE = 0.07

function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

/** Valor futuro con aportaciones mensuales */
function fv(monthly: number, years: number, annualRate: number): number {
  const r = annualRate / 12
  const n = years * 12
  return Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r))
}

export function generateStaticParams() {
  const params: { ticker: string; anos: string }[] = []
  for (const ticker of POPULAR_ETF_TICKERS) {
    for (const years of HORIZONS) {
      params.push({ ticker: ticker.toLowerCase(), anos: `${years}-anios` })
    }
  }
  return params
}
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string; anos: string }>
}): Promise<Metadata> {
  const { ticker, anos } = await params
  const etf = getEtfByTicker(ticker)
  const years = parseInt(anos.replace('-anios', ''))
  if (!etf || !HORIZONS.includes(years)) return { title: 'No encontrado' }

  return {
    title: `DCA en ${etf.ticker} a ${years} años: tabla y plan paso a paso (2026)`,
    description: `Estrategia DCA (Dollar Cost Averaging) en ${etf.name} (${etf.ticker}) a ${years} años: proyección con aportaciones mensuales desde 50€ hasta 2000€, cómo automatizar y broker recomendado.`,
    openGraph: { locale: 'es_ES', images: [`/api/og?title=${encodeURIComponent(`DCA ${etf.ticker} (${years}a)`)}&subtitle=${encodeURIComponent('Aportaciones%20mensuales')}`] },
    alternates: { canonical: `/dca/${ticker}/${anos}` },
  }
}

export default async function DcaPage({
  params,
}: {
  params: Promise<{ ticker: string; anos: string }>
}) {
  const { ticker, anos } = await params
  const etf = getEtfByTicker(ticker)
  const years = parseInt(anos.replace('-anios', ''))
  if (!etf || !HORIZONS.includes(years)) notFound()

  const pageUrl = `${BASE_URL}/dca/${ticker}/${anos}`
  const monthlyAmounts = [50, 100, 200, 300, 500, 1000, 2000]

  // Ancla citable: 200€/mes (mismo número que la FAQ y el Dataset JSON-LD).
  const anchorMonthly = 200
  const anchorFinal = fv(anchorMonthly, years, ASSUMED_RATE)
  const anchorAport = anchorMonthly * 12 * years
  const anchorGain = anchorFinal - anchorAport
  const citableClaim = `Según el cálculo de BogleHub, aportar ${formatEUR(anchorMonthly)}/mes a ${etf.name} (${etf.ticker}) mediante DCA durante ${years} años, asumiendo una rentabilidad anual del 7% (histórica del MSCI World), acumularía aproximadamente ${formatEUR(anchorFinal)}: ${formatEUR(anchorAport)} aportados y ${formatEUR(anchorGain)} de interés compuesto. Proyección educativa, no garantizada.`

  const faqs = [
    {
      q: `¿Cuánto acumularía haciendo DCA en ${etf.ticker} durante ${years} años con 200€/mes?`,
      a: `Asumiendo rentabilidad anual del 7% (histórica del MSCI World), aportando 200€/mes durante ${years} años en ${etf.ticker} (${etf.name}) acumularías aproximadamente ${formatEUR(fv(200, years, ASSUMED_RATE))}. De esa cantidad, ${formatEUR(200 * 12 * years)} son tus aportaciones y el resto (${formatEUR(fv(200, years, ASSUMED_RATE) - 200 * 12 * years)}) son rendimientos generados por el interés compuesto.`,
    },
    {
      q: `¿Es ${etf.ticker} adecuado para una estrategia DCA?`,
      a: `Sí. ${etf.ticker} es un ETF ${etf.accumulating ? 'de acumulación' : 'de distribución'} apto para DCA: composición estable a largo plazo, TER del ${(etf.ter * 100).toFixed(2)}% bajo y disponible en planes de ahorro automáticos de Trade Republic desde 1€/mes. Esto permite automatizar completamente la estrategia.`,
    },
    {
      q: `¿En qué broker hacer DCA en ${etf.ticker}?`,
      a: `Para DCA, el broker óptimo es Trade Republic: 0€ por operación, planes de ahorro automáticos desde 1€/mes, ejecución mensual automatizada. Configuras una vez y se ejecuta solo durante años. Alternativa: MyInvestor para fondos indexados equivalentes con traspaso fiscal libre.`,
    },
    {
      q: `¿DCA o lump sum en ${etf.ticker}?`,
      a: `Si ya tienes el dinero ahorrado, lump sum (invertir todo de golpe) supera al DCA en 2/3 de los periodos históricos. Si no tienes el dinero todavía y aportas del salario mensual, DCA es la única opción práctica y aprovecha plenamente el interés compuesto.`,
    },
    {
      q: `¿Qué pasa si el mercado cae durante mis ${years} años de DCA?`,
      a: `Las caídas son buenas noticias para el inversor que aporta mensualmente: estás comprando más participaciones al mismo precio. Si ${etf.ticker} cae un 30%, tu aportación mensual de 200€ compra ~40% más participaciones. El error que destruye el plan es vender en pánico o dejar de aportar durante caídas.`,
    },
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [
        { name: 'Inicio', url: BASE_URL },
        { name: 'DCA', url: `${BASE_URL}/dca` },
        { name: etf.ticker, url: `${BASE_URL}/etf/${etf.ticker.toLowerCase()}` },
        { name: `${years} años`, url: pageUrl },
      ]}} />
      <JsonLd schema={{ type: 'Article', headline: `DCA en ${etf.ticker} a ${years} años`, description: citableClaim, url: pageUrl, datePublished: '2026-05-24', dateModified: '2026-05-30', articleSection: 'Estrategias DCA' }} />
      <JsonLd schema={{
        type: 'Dataset',
        name: `Proyección DCA en ${etf.ticker} a ${years} años (7% anual)`,
        description: citableClaim,
        url: pageUrl,
        keywords: [etf.ticker, etf.name, 'DCA', 'dollar cost averaging', 'aportaciones mensuales', `${years} años`, 'interés compuesto'],
        variableMeasured: [
          `Aportación de referencia: ${formatEUR(anchorMonthly)}/mes`,
          `Horizonte: ${years} años`,
          `Rentabilidad anual asumida: 7%`,
          `Total aportado (${formatEUR(anchorMonthly)}/mes): ${formatEUR(anchorAport)}`,
          `Capital final (${formatEUR(anchorMonthly)}/mes): ${formatEUR(anchorFinal)}`,
          `Ganancia por interés compuesto: ${formatEUR(anchorGain)}`,
          `Capital final con 500 €/mes: ${formatEUR(fv(500, years, ASSUMED_RATE))}`,
          `Capital final con 1.000 €/mes: ${formatEUR(fv(1000, years, ASSUMED_RATE))}`,
        ],
        license: `${BASE_URL}/sobre`,
      }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href={`/etf/${etf.ticker.toLowerCase()}`} className="hover:text-fg">{etf.ticker}</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">DCA {years} años</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              DCA en {etf.ticker} durante {years} años: tabla y plan (2026)
            </h1>
            <p className="mt-3 text-fg leading-relaxed">
              {citableClaim}
            </p>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              Estrategia Dollar Cost Averaging (DCA) en {etf.name}: cuánto acumulas con aportaciones mensuales fijas durante {years} años. La tabla de abajo cubre desde 50 € hasta 2.000 €/mes.
            </p>
          </header>

          {/* Tabla principal */}
          <Card className="mb-8">
            <CardTitle className="mb-4">Proyección DCA en {etf.ticker} a {years} años (rentabilidad 7%)</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-fg-muted">
                    <th className="pb-2">Aportación mensual</th>
                    <th className="pb-2 text-right">Total aportado</th>
                    <th className="pb-2 text-right">Capital final</th>
                    <th className="pb-2 text-right">Ganancia interés compuesto</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyAmounts.map((m) => {
                    const final = fv(m, years, ASSUMED_RATE)
                    const aport = m * 12 * years
                    return (
                      <tr key={m} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5">{formatEUR(m)}/mes</td>
                        <td className="py-2.5 text-right text-fg-muted">{formatEUR(aport)}</td>
                        <td className="py-2.5 text-right font-semibold text-fg">{formatEUR(final)}</td>
                        <td className="py-2.5 text-right text-accent">{formatEUR(final - aport)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-fg-subtle">
              Proyección con rentabilidad anual constante del 7% y aportaciones mensuales (fórmula del valor futuro de una renta). La realidad será volátil (años buenos y malos), pero la media a {years} años suele acercarse a esta cifra. Método en{' '}
              <Link href="/metodologia" className="text-brand-400 hover:text-brand-300 underline underline-offset-2">/metodologia</Link>; ajústalo en la{' '}
              <Link href="/calculadora/interes-compuesto" className="text-brand-400 hover:text-brand-300 underline underline-offset-2">calculadora de interés compuesto</Link>.
            </p>
          </Card>

          {/* Plan de acción */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-4">Plan paso a paso para hacer DCA en {etf.ticker}</h2>
            <ol className="space-y-3 text-sm text-fg-muted">
              <li className="flex gap-3"><span className="text-accent">1.</span><span><strong className="text-fg">Construye fondo emergencia</strong> 3-6 meses gastos antes de empezar.</span></li>
              <li className="flex gap-3"><span className="text-accent">2.</span><span><strong className="text-fg">Abre Trade Republic</strong> (gratis, 10 min). Banco alemán regulado por BaFin.</span></li>
              <li className="flex gap-3"><span className="text-accent">3.</span><span><strong className="text-fg">Configura plan de ahorro automático</strong> en {etf.ticker} con el importe mensual que decidas. 0€ comisión.</span></li>
              <li className="flex gap-3"><span className="text-accent">4.</span><span><strong className="text-fg">Elige día fijo</strong> del mes para la ejecución (1, 15 o el que prefieras). Lo importante es ser constante.</span></li>
              <li className="flex gap-3"><span className="text-accent">5.</span><span><strong className="text-fg">No toques nada durante {years} años</strong>. Especialmente en caídas — entonces compras más participaciones por tu dinero.</span></li>
              <li className="flex gap-3"><span className="text-accent">6.</span><span><strong className="text-fg">Aumenta la aportación</strong> cada vez que suba tu sueldo (mantén % de ahorro constante).</span></li>
            </ol>
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

          {/* Otros horizontes */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-3">DCA en {etf.ticker} a otros horizontes</h2>
            <div className="flex flex-wrap gap-2">
              {HORIZONS.filter(y => y !== years).map((y) => (
                <Link key={y} href={`/dca/${ticker}/${y}-anios`} className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-brand-400 hover:text-brand-300">
                  {y} años
                </Link>
              ))}
            </div>
          </section>

          <Card className="text-center">
            <Link href={`/etf/${etf.ticker.toLowerCase()}`} className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Ficha completa {etf.ticker}
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">Información educativa, no asesoramiento. Última revisión: mayo 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
