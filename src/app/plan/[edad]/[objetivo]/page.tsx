import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { AGES, getAgeBySlug } from '@/data/ages'
import { OBJECTIVES, getObjectiveBySlug, monthlyToReach } from '@/data/objectives'

const BASE_URL = 'https://boglehub.com'

function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function generateStaticParams() {
  const params: { edad: string; objetivo: string }[] = []
  for (const age of AGES) {
    for (const obj of OBJECTIVES) {
      params.push({ edad: age.slug, objetivo: obj.slug })
    }
  }
  return params
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ edad: string; objetivo: string }> }): Promise<Metadata> {
  const { edad, objetivo } = await params
  const age = getAgeBySlug(edad)
  const obj = getObjectiveBySlug(objetivo)
  if (!age || !obj) return { title: 'No encontrado' }
  return {
    title: `Plan inversión con ${age.age} años para llegar a ${obj.label} (2026)`,
    description: `Cuánto invertir al mes desde los ${age.age} años para llegar a ${obj.label}: aportación necesaria con rentabilidad del 7%, cartera recomendada y broker.`,
    openGraph: { locale: 'es_ES', images: [`/api/og?title=${encodeURIComponent(`${age.age} años → ${obj.label}`)}&subtitle=${encodeURIComponent('Plan%20personalizado')}`] },
    alternates: { canonical: `/plan/${edad}/${objetivo}` },
  }
}

export default async function PlanPage({ params }: { params: Promise<{ edad: string; objetivo: string }> }) {
  const { edad, objetivo } = await params
  const ageLookup = getAgeBySlug(edad)
  const objLookup = getObjectiveBySlug(objetivo)
  if (!ageLookup || !objLookup) notFound()
  const age = ageLookup
  const obj = objLookup
  const pageUrl = `${BASE_URL}/plan/${edad}/${objetivo}`

  const RATE = 0.07
  const monthlyNeeded = monthlyToReach(obj.targetAmount, age.yearsToRetirement, RATE)
  const totalAportado = monthlyNeeded * 12 * age.yearsToRetirement
  const compoundGain = obj.targetAmount - totalAportado

  // Frase citable autocontenida (misma cifra que el H1 y el Dataset JSON-LD).
  const citableClaim = `Para alcanzar ${obj.label} (${formatEUR(obj.targetAmount)}) a los 65 años partiendo de los ${age.age} años (${age.yearsToRetirement} años de horizonte) hay que aportar aproximadamente ${formatEUR(monthlyNeeded)} al mes, asumiendo una rentabilidad anual del 7% (histórica del MSCI World). Total aportado: ${formatEUR(totalAportado)}; el interés compuesto añade ${formatEUR(compoundGain)}. Cálculo de BogleHub (proyección educativa, no garantizada).`

  // Tabla de alternativas con menos años
  const horizons = [10, 15, 20, 25, 30, age.yearsToRetirement]
    .filter((v, i, a) => a.indexOf(v) === i && v <= age.yearsToRetirement)
    .sort((a, b) => a - b)

  const faqs = [
    {
      q: `¿Cuánto tengo que invertir al mes con ${age.age} años para llegar a ${obj.label}?`,
      a: `Para alcanzar ${obj.label} a los 65 años desde tu edad actual (${age.age}), tendrías ${age.yearsToRetirement} años por delante. Asumiendo rentabilidad anual del 7% (histórica del MSCI World), necesitas aportar aproximadamente ${formatEUR(monthlyNeeded)}/mes durante todo el periodo. En total aportarás ${formatEUR(totalAportado)} y el interés compuesto añadirá ${formatEUR(compoundGain)} extra.`,
    },
    {
      q: `¿Es realista llegar a ${obj.label} con ${age.age} años?`,
      a: age.age <= 35
        ? `Sí, perfectamente realista con disciplina. Tienes ${age.yearsToRetirement} años por delante y el interés compuesto es brutal a este horizonte. Solo necesitas aportar consistentemente y no tocar la cartera durante caídas del mercado.`
        : age.age <= 50
          ? `Es exigente pero alcanzable. Necesitas aportar ${formatEUR(monthlyNeeded)}/mes durante ${age.yearsToRetirement} años, lo que requiere disciplina y posiblemente reducir gastos. Si ya tienes capital inicial ahorrado, la aportación necesaria baja significativamente.`
          : `Es muy ambicioso a esta edad. Con solo ${age.yearsToRetirement} años hasta la jubilación, la aportación mensual necesaria es alta (${formatEUR(monthlyNeeded)}/mes). Considera objetivos más realistas o ampliar el horizonte trabajando hasta después de los 65.`,
    },
    {
      q: `¿Qué cartera me recomiendan para este plan?`,
      a: `Para tu edad (${age.age}), la asignación recomendada es ${age.recommendedEquity} en renta variable: ${age.recommendedPortfolio}. Esto equilibra crecimiento esperado con tolerancia a caídas. VWCE da diversificación global (incluye emergentes). AGGH es renta fija global con cobertura EUR, amortigua las caídas bursátiles.`,
    },
    {
      q: `¿Qué broker uso para este plan?`,
      a: `Para una aportación de ${formatEUR(monthlyNeeded)}/mes la opción más eficiente es Trade Republic: 0€ por operación, planes de ahorro automáticos desde 1€. Si prefieres fondos indexados con traspaso fiscal libre, MyInvestor desde 1€ con TER del 0,05% (Amundi Prime Global).`,
    },
    {
      q: `¿Y si no puedo aportar tanto?`,
      a: `Tienes tres opciones: (1) reducir el objetivo de ${obj.label} a una cantidad alcanzable, (2) ampliar el horizonte trabajando hasta después de los 65, (3) aportar lo máximo posible aceptando que el capital final será menor. Lo importante es empezar — algo es infinitamente mejor que nada. Aportar 100€/mes desde los ${age.age} es mejor que aportar 1000€/mes empezando 10 años más tarde.`,
    },
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Plan', url: `${BASE_URL}/plan` }, { name: `${age.age}a → ${obj.label}`, url: pageUrl }] }} />
      <JsonLd schema={{ type: 'Article', headline: `Plan inversión con ${age.age} años para ${obj.label}`, description: citableClaim, url: pageUrl, datePublished: '2026-05-24', dateModified: '2026-05-30', articleSection: 'Plan personalizado' }} />
      <JsonLd schema={{
        type: 'Dataset',
        name: `Plan de inversión: ${formatEUR(obj.targetAmount)} a los 65 desde los ${age.age} años`,
        description: citableClaim,
        url: pageUrl,
        keywords: [obj.label, `${age.age} años`, 'aportación mensual', 'interés compuesto', 'plan de inversión', 'FIRE España'],
        variableMeasured: [
          `Objetivo: ${formatEUR(obj.targetAmount)} (${obj.label})`,
          `Edad inicial: ${age.age} años`,
          `Horizonte: ${age.yearsToRetirement} años`,
          `Rentabilidad anual asumida: 7%`,
          `Aportación mensual necesaria: ${formatEUR(monthlyNeeded)}`,
          `Total aportado: ${formatEUR(totalAportado)}`,
          `Ganancia por interés compuesto: ${formatEUR(compoundGain)}`,
        ],
        license: `${BASE_URL}/sobre`,
      }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Plan {age.age}a → {obj.label}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Plan inversión a los {age.age} años para llegar a {obj.label}
            </h1>
            <p className="mt-4 text-fg leading-relaxed">
              Según el cálculo de BogleHub, para alcanzar {obj.label} ({formatEUR(obj.targetAmount)}) a los 65 años partiendo de los {age.age} años hay que aportar aproximadamente {formatEUR(monthlyNeeded)} al mes durante {age.yearsToRetirement} años, asumiendo una rentabilidad anual del 7% (histórica del MSCI World). Total aportado: {formatEUR(totalAportado)}; el interés compuesto añade {formatEUR(compoundGain)} extra hasta el objetivo.
            </p>
          </header>

          {/* Resultado destacado */}
          <Card className="mb-8 bg-accent-dim border-accent/30">
            <CardTitle className="mb-3">Tu plan en una frase</CardTitle>
            <p className="text-lg text-fg leading-relaxed">
              Para llegar a <strong className="text-accent">{obj.label}</strong> a los 65 años partiendo de los {age.age} años, necesitas aportar{' '}
              <strong className="text-accent">{formatEUR(monthlyNeeded)}/mes</strong> durante{' '}
              <strong className="text-accent">{age.yearsToRetirement} años</strong> con una cartera{' '}
              <strong>{age.recommendedPortfolio}</strong>.
            </p>
            <p className="mt-4 border-t border-accent/20 pt-3 text-xs text-fg-subtle leading-relaxed">
              Cómo se calcula: aportación periódica necesaria para alcanzar el capital objetivo con interés compuesto al 7% anual durante {age.yearsToRetirement} años. Método y supuestos en{' '}
              <Link href="/metodologia" className="text-brand-400 hover:text-brand-300 underline underline-offset-2">/metodologia</Link>; ajústalo a tu caso en la{' '}
              <Link href="/calculadora/interes-compuesto" className="text-brand-400 hover:text-brand-300 underline underline-offset-2">calculadora de interés compuesto</Link>.
            </p>
          </Card>

          {/* Desglose */}
          <Card className="mb-8">
            <CardTitle className="mb-4">Desglose financiero</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><dt className="text-xs uppercase text-fg-muted">Objetivo</dt><dd className="font-medium text-fg">{obj.label} ({formatEUR(obj.targetAmount)})</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Edad inicial</dt><dd className="font-medium text-fg">{age.age} años</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Horizonte</dt><dd className="font-medium text-fg">{age.yearsToRetirement} años</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Rentabilidad asumida</dt><dd className="font-medium text-fg">7% anual</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Aportación mensual</dt><dd className="font-medium text-accent">{formatEUR(monthlyNeeded)}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Total aportado</dt><dd className="font-medium text-fg">{formatEUR(totalAportado)}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs uppercase text-fg-muted">Ganancia por interés compuesto</dt><dd className="font-medium text-accent">{formatEUR(compoundGain)} ({((compoundGain / obj.targetAmount) * 100).toFixed(0)}% del total final)</dd></div>
            </dl>
          </Card>

          {/* Tabla alternativa horizontes */}
          <Card className="mb-8">
            <CardTitle className="mb-4">¿Y si quiero llegar antes?</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-fg-muted">
                    <th className="pb-2">Años</th>
                    <th className="pb-2 text-right">Aportación mensual</th>
                    <th className="pb-2 text-right">Edad alcanzada</th>
                  </tr>
                </thead>
                <tbody>
                  {horizons.map((h) => {
                    const monthly = monthlyToReach(obj.targetAmount, h, RATE)
                    return (
                      <tr key={h} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5">{h} años</td>
                        <td className="py-2.5 text-right font-semibold text-fg">{formatEUR(monthly)}/mes</td>
                        <td className="py-2.5 text-right text-fg-muted">{age.age + h} años</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Implementación */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-4">Cómo implementar este plan</h2>
            <ol className="space-y-3 text-sm text-fg-muted">
              <li className="flex gap-3"><span className="text-accent">1.</span><span><strong className="text-fg">Construye fondo emergencia</strong> de 3-6 meses de gastos antes de empezar.</span></li>
              <li className="flex gap-3"><span className="text-accent">2.</span><span><strong className="text-fg">Abre Trade Republic</strong> (gratis, 10 min). Regulado por BaFin alemán.</span></li>
              <li className="flex gap-3"><span className="text-accent">3.</span><span><strong className="text-fg">Configura plan de ahorro automático</strong> en VWCE por {formatEUR(monthlyNeeded * (parseInt(age.recommendedEquity) / 100))}/mes (parte renta variable).</span></li>
              <li className="flex gap-3"><span className="text-accent">4.</span><span><strong className="text-fg">Si quieres renta fija</strong>, añade segundo plan automático en AGGH por {formatEUR(monthlyNeeded * (1 - parseInt(age.recommendedEquity) / 100))}/mes.</span></li>
              <li className="flex gap-3"><span className="text-accent">5.</span><span><strong className="text-fg">Olvídate durante años</strong>. Rebalancea solo una vez al año si la desviación supera el 5%.</span></li>
              <li className="flex gap-3"><span className="text-accent">6.</span><span><strong className="text-fg">Aumenta aportación</strong> cada vez que suba tu sueldo (mantén el % de ahorro constante).</span></li>
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

          {/* Variantes */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-3">Otros planes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {AGES.filter(a => a.slug !== edad).slice(0, 4).map((a) => (
                <Link key={a.slug} href={`/plan/${a.slug}/${objetivo}`} className="text-brand-400 hover:text-brand-300">
                  → Plan a los {a.age} años para {obj.label}
                </Link>
              ))}
              {OBJECTIVES.filter(o => o.slug !== objetivo).slice(0, 4).map((o) => (
                <Link key={o.slug} href={`/plan/${edad}/${o.slug}`} className="text-brand-400 hover:text-brand-300">
                  → Plan a los {age.age} años para {o.label}
                </Link>
              ))}
            </div>
          </section>

          <Card className="text-center">
            <Link href="/calculadora/interes-compuesto" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Personalizar el plan en la calculadora
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Rentabilidades históricas no garantizan futuras. Última revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
