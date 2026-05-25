import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { MONTHLY_AMOUNTS, getMonthlyAmountBySlug } from '@/data/monthly-amounts'
import { OBJECTIVES, getObjectiveBySlug } from '@/data/objectives'

const BASE_URL = 'https://boglehub.com'

function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

/** Años necesarios para alcanzar el objetivo con la aportación mensual */
function yearsToReachTarget(monthly: number, target: number, annualRate: number): number {
  const r = annualRate / 12
  for (let y = 1; y <= 70; y++) {
    const n = y * 12
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r)
    if (fv >= target) return y
  }
  return 99 // No alcanzable en plazo razonable
}

export function generateStaticParams() {
  const params: { cantidad: string; objetivo: string }[] = []
  for (const m of MONTHLY_AMOUNTS) {
    for (const o of OBJECTIVES) {
      params.push({ cantidad: m.slug, objetivo: o.slug })
    }
  }
  return params
}
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cantidad: string; objetivo: string }>
}): Promise<Metadata> {
  const { cantidad, objetivo } = await params
  const m = getMonthlyAmountBySlug(cantidad)
  const o = getObjectiveBySlug(objetivo)
  if (!m || !o) return { title: 'No encontrado' }

  const years = yearsToReachTarget(m.amount, o.targetAmount, 0.07)
  return {
    title: `Ahorrar ${m.amount}€ al mes para llegar a ${o.label}: ¿cuántos años? (2026)`,
    description: `Cálculo exacto: invirtiendo ${m.amount}€/mes en fondos indexados al 7% anual histórico, alcanzas ${o.label} en ${years === 99 ? 'más de 60' : years} años. Plan, cartera y broker recomendados.`,
    openGraph: {
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(`${m.amount}€/mes -> ${o.label}`)}&subtitle=${encodeURIComponent(`${years} años`)}`],
    },
    alternates: { canonical: `/ahorrar/${cantidad}/para/${objetivo}` },
  }
}

export default async function AhorrarPage({
  params,
}: {
  params: Promise<{ cantidad: string; objetivo: string }>
}) {
  const { cantidad, objetivo } = await params
  const mLookup = getMonthlyAmountBySlug(cantidad)
  const oLookup = getObjectiveBySlug(objetivo)
  if (!mLookup || !oLookup) notFound()
  const m = mLookup
  const o = oLookup

  const pageUrl = `${BASE_URL}/ahorrar/${cantidad}/para/${objetivo}`
  const RATE = 0.07
  const years = yearsToReachTarget(m.amount, o.targetAmount, RATE)
  const isAchievable = years < 99
  const totalAportado = m.amount * 12 * years
  const compoundGain = o.targetAmount - totalAportado

  // Tabla con escenarios de rentabilidad
  const scenarios = [
    { rate: 0.05, label: 'Conservador (5%)' },
    { rate: 0.07, label: 'Histórico MSCI World (7%)' },
    { rate: 0.09, label: 'Optimista (9%)' },
  ]

  const faqs = [
    {
      q: `¿En cuántos años llego a ${o.label} ahorrando ${m.amount}€ al mes?`,
      a: isAchievable
        ? `Invirtiendo ${m.amount}€ al mes en fondos indexados con rentabilidad anual del 7% (histórica del MSCI World), alcanzas ${o.label} en aproximadamente ${years} años. Habrás aportado ${formatEUR(totalAportado)} de tu bolsillo y el interés compuesto añadirá ${formatEUR(compoundGain)} extra.`
        : `Con ${m.amount}€/mes y rentabilidad anual del 7%, alcanzar ${o.label} requiere más de 60 años, lo que generalmente excede el horizonte realista. Tienes que aumentar la aportación o reducir el objetivo. Con ${m.amount * 2}€/mes el tiempo se reduciría aproximadamente a la mitad.`,
    },
    {
      q: `¿Qué cartera me recomiendan para este plan?`,
      a: years <= 10
        ? `Para horizonte de ${years} años (corto-medio), una cartera 50/50 (renta variable / renta fija) es prudente. La volatilidad de la renta variable puede dominar resultados en este plazo. Cartera ejemplo: 50% VWCE + 50% AGGH.`
        : years <= 25
          ? `Para horizonte de ${years} años (medio-largo), una cartera 70-80% renta variable es óptima. Cartera ejemplo: 75% VWCE + 25% AGGH (renta fija). Rebalancea anualmente.`
          : `Para horizonte largo de ${years} años, máxima exposición a renta variable. Cartera ejemplo: 90% VWCE + 10% AGGH. El interés compuesto a este plazo es brutal — solo necesitas no vender en caídas.`,
    },
    {
      q: `¿Es realista una rentabilidad del 7% anual?`,
      a: `Es la rentabilidad histórica del MSCI World (índice de mercados desarrollados) a muy largo plazo (>30 años). Descontando inflación (~2-3%), la rentabilidad real ha sido del 5-7%. En periodos cortos puede ser muy distinto: hay años de +30% y años de -40%. Para planificación a 15-20 años, el 7% nominal es asunción razonable.`,
    },
    {
      q: `¿Qué pasa si dejo de aportar antes de llegar a ${o.label}?`,
      a: `El capital acumulado seguiría creciendo con el interés compuesto pero más lentamente. Por ejemplo, si después de 10 años dejas de aportar, lo acumulado en esos 10 años seguiría capitalizando, pero el resultado final sería notablemente menor. Lo ideal es no parar las aportaciones, especialmente en caídas del mercado (entonces se compra más barato).`,
    },
    {
      q: `¿En qué broker implemento este plan?`,
      a: `Para aportaciones automáticas de ${m.amount}€/mes la opción óptima es Trade Republic: 0€ por operación, planes de ahorro automáticos. Configuras una vez y se ejecuta solo cada mes. Si prefieres fondos indexados con traspaso fiscal libre, MyInvestor (Amundi Prime Global TER 0,05%).`,
    },
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [
        { name: 'Inicio', url: BASE_URL },
        { name: 'Ahorrar', url: `${BASE_URL}/invertir` },
        { name: `${m.amount}€/mes`, url: `${BASE_URL}/invertir/${cantidad}` },
        { name: o.label, url: pageUrl },
      ]}} />
      <JsonLd schema={{ type: 'Article', headline: `Ahorrar ${m.amount}€ al mes para llegar a ${o.label}`, description: `Plan personalizado.`, url: pageUrl, datePublished: '2026-05-24', articleSection: 'Plan personalizado' }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href={`/invertir/${cantidad}`} className="hover:text-fg">{m.amount}€/mes</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{o.label}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Ahorrar {m.amount}€ al mes para llegar a {o.label}
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Plan paso a paso: cuánto tiempo necesitas, qué cartera usar y cómo automatizar el plan. Cálculos a rentabilidad anual del 7% (histórica del MSCI World).
            </p>
          </header>

          {isAchievable ? (
            <Card className="mb-8 bg-accent-dim border-accent/30">
              <p className="text-xs uppercase tracking-wide text-fg-muted mb-2">Tiempo estimado</p>
              <div className="text-4xl sm:text-5xl font-bold text-accent">{years} años</div>
              <p className="mt-3 text-sm text-fg leading-relaxed">
                Total aportado: <strong className="text-accent">{formatEUR(totalAportado)}</strong><br />
                Interés compuesto añade: <strong className="text-accent">{formatEUR(compoundGain)}</strong> ({((compoundGain / o.targetAmount) * 100).toFixed(0)}%)<br />
                Capital final: <strong>{formatEUR(o.targetAmount)}</strong>
              </p>
            </Card>
          ) : (
            <Card className="mb-8 border-warn/30">
              <CardTitle className="mb-3 text-warn">No alcanzable en plazo razonable</CardTitle>
              <p className="text-sm text-fg-muted leading-relaxed">
                Con {m.amount}€/mes y rentabilidad del 7%, alcanzar {o.label} requiere más de 60 años. Considera aumentar la aportación a {formatEUR(m.amount * 3)} o reducir el objetivo.
              </p>
            </Card>
          )}

          {/* Tabla escenarios */}
          {isAchievable && (
            <Card className="mb-8">
              <CardTitle className="mb-4">Tiempo según escenario de rentabilidad</CardTitle>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-fg-muted">
                      <th className="pb-2">Escenario</th>
                      <th className="pb-2 text-right">Años</th>
                      <th className="pb-2 text-right">Total aportado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((s) => {
                      const y = yearsToReachTarget(m.amount, o.targetAmount, s.rate)
                      const aport = y < 99 ? m.amount * 12 * y : 0
                      return (
                        <tr key={s.rate} className="border-b border-border/50 last:border-0">
                          <td className="py-2.5">{s.label}</td>
                          <td className="py-2.5 text-right font-semibold text-fg">{y < 99 ? `${y} años` : '60+'}</td>
                          <td className="py-2.5 text-right text-fg-muted">{y < 99 ? formatEUR(aport) : '—'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Pasos */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-4">Cómo implementar el plan</h2>
            <ol className="space-y-3 text-sm text-fg-muted">
              <li className="flex gap-3"><span className="text-accent">1.</span><span><strong className="text-fg">Construye fondo emergencia</strong> de 3-6 meses de gastos ANTES de invertir.</span></li>
              <li className="flex gap-3"><span className="text-accent">2.</span><span><strong className="text-fg">Abre Trade Republic</strong> (gratis, 10 min). Regulado por BaFin alemán.</span></li>
              <li className="flex gap-3"><span className="text-accent">3.</span><span><strong className="text-fg">Configura plan de ahorro automático</strong> en VWCE por {formatEUR(m.amount)}/mes. 0€ de comisión.</span></li>
              <li className="flex gap-3"><span className="text-accent">4.</span><span><strong className="text-fg">No toques nada durante años</strong>. Especialmente en caídas del 30-40% que ocurrirán varias veces.</span></li>
              <li className="flex gap-3"><span className="text-accent">5.</span><span><strong className="text-fg">Aumenta la aportación</strong> cada vez que suba tu sueldo (mantén % constante).</span></li>
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

          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-3">Combinaciones relacionadas</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs uppercase text-fg-muted mb-2">Mismo objetivo, otras cantidades</p>
                <div className="flex flex-wrap gap-2">
                  {MONTHLY_AMOUNTS.filter(x => x.slug !== cantidad).slice(0, 5).map((x) => (
                    <Link key={x.slug} href={`/ahorrar/${x.slug}/para/${objetivo}`} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-brand-400 hover:text-brand-300">
                      {x.amount}€/mes
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase text-fg-muted mb-2">Misma cantidad, otros objetivos</p>
                <div className="flex flex-wrap gap-2">
                  {OBJECTIVES.filter(x => x.slug !== objetivo).slice(0, 5).map((x) => (
                    <Link key={x.slug} href={`/ahorrar/${cantidad}/para/${x.slug}`} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-brand-400 hover:text-brand-300">
                      {x.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">Personaliza el cálculo en la calculadora</p>
            <Link href="/calculadora/interes-compuesto" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Calculadora interés compuesto
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">Información educativa, no asesoramiento. Última revisión: mayo 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
