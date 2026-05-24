import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { MONTHLY_AMOUNTS, getMonthlyAmountBySlug } from '@/data/monthly-amounts'

const BASE_URL = 'https://boglehub.com'

function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function generateStaticParams() {
  return MONTHLY_AMOUNTS.map((m) => ({ slug: m.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const m = getMonthlyAmountBySlug(slug)
  if (!m) return { title: 'No encontrado' }

  return {
    title: `Cómo invertir ${m.amount}€ al mes en España (guía 2026)`,
    description: `Guía práctica para invertir ${m.amount}€/mes en fondos indexados desde España: dónde aportar, qué ETF elegir, fiscalidad y cuánto acumulas en 10, 20 y 30 años con rentabilidad histórica del 7% anual.`,
    openGraph: {
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(`Invertir ${m.amount}€/mes`)}&subtitle=${encodeURIComponent('Estrategia indexada en Espa%C3%B1a')}`],
    },
    alternates: { canonical: `/invertir/${slug}` },
  }
}

export default async function InvertirPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mLookup = getMonthlyAmountBySlug(slug)
  if (!mLookup) notFound()
  const m = mLookup

  const pageUrl = `${BASE_URL}/invertir/${slug}`

  // Proyecciones a 7% anual
  const rate = 0.07
  const monthlyRate = rate / 12
  const fv = (years: number): number => {
    const n = years * 12
    return Math.round(m.amount * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate))
  }

  const result10 = fv(10)
  const result20 = fv(20)
  const result30 = fv(30)
  const result40 = fv(40)

  const totalAport10 = m.amount * 12 * 10
  const totalAport20 = m.amount * 12 * 20
  const totalAport30 = m.amount * 12 * 30
  const totalAport40 = m.amount * 12 * 40

  const faqs = [
    {
      q: `¿Cuánto acumulo invirtiendo ${m.amount}€ al mes durante 30 años?`,
      a: `Asumiendo una rentabilidad anual del 7% (histórica del MSCI World), invirtiendo ${m.amount}€ al mes durante 30 años acumulas aproximadamente ${formatEUR(result30)}. De esa cantidad, ${formatEUR(totalAport30)} son tus aportaciones y el resto (${formatEUR(result30 - totalAport30)}) son rendimientos generados por el interés compuesto.`,
    },
    {
      q: `¿Cuántos años necesito para llegar a un millón invirtiendo ${m.amount}€ al mes?`,
      a: `Con rentabilidad del 7% anual, ${m.amount}€/mes acumula 1.000.000€ en aproximadamente ${m.yearsToOneMillion} años. Si quieres llegar antes, necesitas aumentar la aportación. La calculadora de interés compuesto te permite probar tu plan personalizado.`,
    },
    {
      q: `¿Qué ETF elijo para invertir ${m.amount}€ al mes?`,
      a: `Para una cartera sencilla y diversificada, la opción más popular en España es VWCE (Vanguard FTSE All-World UCITS ETF, ISIN IE00B3RBWM25): incluye 3.700+ empresas globales (desarrollados y emergentes), TER 0,22%, acumulación, domiciliado en Irlanda. Con ${m.amount}€/mes puedes empezar inmediatamente vía Trade Republic con planes de ahorro automáticos sin comisión.`,
    },
    {
      q: `¿En qué broker invierto ${m.amount}€ al mes?`,
      a: `Para aportaciones mensuales pequeñas-medianas como ${m.amount}€, Trade Republic es la opción más eficiente: 0€ por operación y planes de ahorro automáticos desde 1€. Si prefieres fondos indexados (con traspaso fiscal libre), MyInvestor desde 1€ con TER del 0,05% (Amundi Prime Global). Para mayor volumen, DEGIRO también es válido.`,
    },
    {
      q: `¿Cómo tributa lo que gano invirtiendo ${m.amount}€ al mes?`,
      a: `Mientras mantengas los ETFs sin venderlos, no tributas (los ETFs de acumulación reinvierten los dividendos sin generar evento fiscal). Solo al vender pagas IRPF del ahorro sobre la ganancia: 19% hasta 6.000€, 21% hasta 50.000€, 23% hasta 200.000€, 27% hasta 300.000€, 28% por encima. Los fondos indexados además permiten traspaso libre entre ellos sin tributar.`,
    },
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Invertir', url: `${BASE_URL}/invertir` },
            { name: `${m.amount}€/mes`, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: `Cómo invertir ${m.amount}€ al mes en España`,
          description: `Guía completa para invertir ${m.amount}€/mes en fondos indexados desde España.`,
          url: pageUrl,
          datePublished: '2026-05-24',
          articleSection: 'Estrategia por cantidad',
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/invertir" className="hover:text-fg transition-colors">Invertir</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{m.amount}€/mes</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Cómo invertir {m.amount}€ al mes en España (2026)
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Guía práctica para invertir {m.amount}€/mes en fondos indexados desde España: qué
              ETF elegir, dónde aportar, fiscalidad y proyección de cuánto acumulas a 10, 20 y
              30 años con rentabilidad histórica del 7% anual.
            </p>
          </header>

          {/* Tabla de proyección */}
          <Card className="mb-8">
            <CardTitle className="mb-4">Cuánto acumulas invirtiendo {m.amount}€/mes al 7% anual</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-fg-muted">
                    <th className="pb-2">Horizonte</th>
                    <th className="pb-2 text-right">Aportado</th>
                    <th className="pb-2 text-right">Capital final</th>
                    <th className="pb-2 text-right">Ganancia interés compuesto</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { years: 10, result: result10, aportado: totalAport10 },
                    { years: 20, result: result20, aportado: totalAport20 },
                    { years: 30, result: result30, aportado: totalAport30 },
                    { years: 40, result: result40, aportado: totalAport40 },
                  ].map((row) => (
                    <tr key={row.years} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5">{row.years} años</td>
                      <td className="py-2.5 text-right text-fg-muted">{formatEUR(row.aportado)}</td>
                      <td className="py-2.5 text-right font-semibold text-fg">{formatEUR(row.result)}</td>
                      <td className="py-2.5 text-right text-accent">{formatEUR(row.result - row.aportado)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-fg-subtle">
              Proyección con rentabilidad anual constante del 7% (histórica del MSCI World). La
              realidad varía año a año. Para escenarios reales con volatilidad, usa la calculadora
              FIRE Monte Carlo.
            </p>
          </Card>

          {/* Recomendación */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-3">Estrategia recomendada para {m.amount}€/mes</h2>
            <p className="text-fg-muted leading-relaxed mb-3">
              Con una aportación mensual de {m.amount}€, la estrategia más eficiente combina
              {' '}{m.amount >= 200 ? 'fondos indexados de bajo coste (MyInvestor) con ETFs (Trade Republic)' : 'ETFs sin comisión vía Trade Republic con planes de ahorro automáticos'}.
              Aporta el mismo día cada mes para implementar Dollar Cost Averaging (DCA) sin
              decidir nada.
            </p>
            <ol className="space-y-3 text-sm text-fg-muted">
              <li className="flex gap-3"><span className="text-accent">1.</span><span><strong className="text-fg">Abre cuenta en Trade Republic</strong> (10 minutos, gratis). Regulado por BaFin, depósitos cubiertos hasta 100.000€.</span></li>
              <li className="flex gap-3"><span className="text-accent">2.</span><span><strong className="text-fg">Configura plan de ahorro automático</strong> en VWCE (Vanguard FTSE All-World) por {m.amount}€/mes. Sin comisión.</span></li>
              <li className="flex gap-3"><span className="text-accent">3.</span><span><strong className="text-fg">No toques nada</strong> durante años. Rebalancea anualmente solo si tienes renta fija en cartera.</span></li>
              <li className="flex gap-3"><span className="text-accent">4.</span><span><strong className="text-fg">Sube la aportación</strong> cada vez que aumente tu sueldo, manteniendo el % de ahorro constante.</span></li>
            </ol>
          </section>

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

          {/* Otras cantidades */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-4">Otras cantidades mensuales</h2>
            <div className="flex flex-wrap gap-2">
              {MONTHLY_AMOUNTS.filter((x) => x.slug !== slug).map((x) => (
                <Link
                  key={x.slug}
                  href={`/invertir/${x.slug}`}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
                >
                  {x.amount}€/mes
                </Link>
              ))}
            </div>
          </section>

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Quieres simular tu plan con tu rentabilidad esperada y cantidad?
            </p>
            <Link href="/calculadora/interes-compuesto" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Calculadora interés compuesto
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Las rentabilidades históricas
            no garantizan rentabilidades futuras. Última revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
