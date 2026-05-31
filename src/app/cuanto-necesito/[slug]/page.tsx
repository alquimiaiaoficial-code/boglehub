import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { OBJECTIVES, getObjectiveBySlug, monthlyToReach } from '@/data/objectives'

const BASE_URL = 'https://boglehub.com'

function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function generateStaticParams() {
  return OBJECTIVES.map((o) => ({ slug: o.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const o = getObjectiveBySlug(slug)
  if (!o) return { title: 'Objetivo no encontrado' }

  return {
    title: `Invertir al mes para ${o.label}: cuánto necesito (2026)`,
    description: `Tabla con la aportación mensual necesaria para alcanzar ${o.label} en 10, 15, 20, 25, 30 y 40 años con rentabilidad histórica del 7% anual. Estrategia indexada en España.`,
    openGraph: {
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(`${o.label}`)}&subtitle=${encodeURIComponent('Cu%C3%A1nto%20invertir%20al%20mes')}`],
    },
    alternates: { canonical: `/cuanto-necesito/${slug}` },
  }
}

export default async function CuantoNecesitoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const oLookup = getObjectiveBySlug(slug)
  if (!oLookup) notFound()
  const o = oLookup

  const pageUrl = `${BASE_URL}/cuanto-necesito/${slug}`
  const RATE = 0.07
  const horizons = [10, 15, 20, 25, 30, 35, 40]

  const citableClaim = `Según el cálculo de BogleHub, para alcanzar ${o.label} (${formatEUR(o.targetAmount)}) invirtiendo de forma indexada hay que aportar aproximadamente ${formatEUR(monthlyToReach(o.targetAmount, 20, RATE))} al mes durante 20 años, ${formatEUR(monthlyToReach(o.targetAmount, 30, RATE))} al mes en 30 años o ${formatEUR(monthlyToReach(o.targetAmount, 40, RATE))} al mes en 40 años, asumiendo una rentabilidad anual del 7% (histórica del MSCI World). Cuanto antes empieces, menor es la cuota mensual.`

  const faqs = [
    {
      q: `¿Cuánto necesito invertir al mes para llegar a ${o.label}?`,
      a: `Asumiendo rentabilidad anual del 7% (histórica del MSCI World), necesitas aportar: ${horizons.map(h => `${h} años → ${formatEUR(monthlyToReach(o.targetAmount, h, RATE))}/mes`).join('; ')}.`,
    },
    {
      q: `¿Es realista una rentabilidad del 7% anual?`,
      a: `Sí, es la rentabilidad histórica del MSCI World a muy largo plazo (descontando inflación, el rendimiento real ha sido del 5-7%). En periodos cortos puede ser muy distinto: hay años de +30% y años de -40%. Para planificación a 20+ años, el 7% nominal es una asunción razonable.`,
    },
    {
      q: `¿Qué pasa si el mercado cae justo al alcanzar ${o.label}?`,
      a: `Es el riesgo de secuencia: una caída fuerte cerca del objetivo puede retrasar el plan. Por eso a medida que te acercas se reduce el peso de renta variable (glide path) y se construye colchón de liquidez. Para escenarios reales con volatilidad, usa la calculadora FIRE Monte Carlo.`,
    },
    {
      q: `¿Qué cartera me lleva a ${o.label}?`,
      a: `La cartera Boglehead estándar funciona: 80% renta variable global (VWCE o IWDA+EIMI) + 20% renta fija global hedged EUR (AGGH). Mantén la asignación durante años, rebalancea anualmente y no toques en caídas. Es la fórmula de millones de inversores indexados.`,
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
            { name: 'Cuánto necesito', url: `${BASE_URL}/cuanto-necesito` },
            { name: o.label, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: `Cuánto necesito invertir al mes para llegar a ${o.label}`,
          description: citableClaim,
          url: pageUrl,
          datePublished: '2026-05-24',
          dateModified: '2026-05-30',
          articleSection: 'Objetivos patrimoniales',
        }}
      />
      <JsonLd
        schema={{
          type: 'Dataset',
          name: `Aportación mensual para alcanzar ${o.label}`,
          description: citableClaim,
          url: pageUrl,
          keywords: [o.label, 'aportación mensual', 'interés compuesto', 'objetivo patrimonial', 'inversión indexada España', 'FIRE'],
          variableMeasured: [
            `Objetivo: ${formatEUR(o.targetAmount)} (${o.label})`,
            `Rentabilidad anual asumida: 7%`,
            ...horizons.map((h) => `${h} años → ${formatEUR(monthlyToReach(o.targetAmount, h, RATE))}/mes`),
          ],
          license: `${BASE_URL}/sobre`,
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/cuanto-necesito" className="hover:text-fg transition-colors">Cuánto necesito</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{o.label}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Cuánto invertir al mes para llegar a {o.label}
            </h1>
            <p className="mt-3 text-fg leading-relaxed">{citableClaim}</p>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">{o.description}</p>
          </header>

          <Card className="mb-8">
            <CardTitle className="mb-4">Aportación mensual necesaria (rentabilidad 7% anual)</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-fg-muted">
                    <th className="pb-2">Horizonte</th>
                    <th className="pb-2 text-right">Aportación mensual</th>
                    <th className="pb-2 text-right">Total aportado</th>
                    <th className="pb-2 text-right">Ganancia compuesta</th>
                  </tr>
                </thead>
                <tbody>
                  {horizons.map((h) => {
                    const monthly = monthlyToReach(o.targetAmount, h, RATE)
                    const totalAport = monthly * 12 * h
                    const gain = o.targetAmount - totalAport
                    return (
                      <tr key={h} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5">{h} años</td>
                        <td className="py-2.5 text-right font-semibold text-fg">{formatEUR(monthly)}</td>
                        <td className="py-2.5 text-right text-fg-muted">{formatEUR(totalAport)}</td>
                        <td className="py-2.5 text-right text-accent">{formatEUR(gain)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-fg-subtle">
              Cálculo: rentabilidad constante del 7% anual sobre aportaciones mensuales
              capitalizadas. La realidad varía año a año con volatilidad del mercado. Método y
              supuestos en{' '}
              <Link href="/metodologia" className="text-brand-400 hover:text-brand-300 underline underline-offset-2">/metodologia</Link>.
            </p>
          </Card>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-3">Cómo llegar a {o.label} en la práctica</h2>
            <ol className="space-y-3 text-sm text-fg-muted">
              <li className="flex gap-3"><span className="text-accent">1.</span><span><strong className="text-fg">Define tu horizonte</strong>: cuántos años tienes hasta el objetivo. Determina la aportación mensual necesaria de la tabla anterior.</span></li>
              <li className="flex gap-3"><span className="text-accent">2.</span><span><strong className="text-fg">Elige broker</strong>: Trade Republic (sin comisión, planes de ahorro automáticos) o MyInvestor (fondos con traspaso fiscal libre).</span></li>
              <li className="flex gap-3"><span className="text-accent">3.</span><span><strong className="text-fg">Construye cartera</strong>: cartera Boglehead 80/20 (VWCE + AGGH) si tienes más de 10 años de horizonte. Más conservadora si es menos.</span></li>
              <li className="flex gap-3"><span className="text-accent">4.</span><span><strong className="text-fg">Automatiza</strong>: aportación mensual automática el día 1 de cada mes. Elimina la decisión.</span></li>
              <li className="flex gap-3"><span className="text-accent">5.</span><span><strong className="text-fg">No toques</strong>: durante caídas, mantén el plan. El interés compuesto necesita tiempo, no genialidad.</span></li>
            </ol>
          </section>

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

          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-4">Otros objetivos</h2>
            <div className="flex flex-wrap gap-2">
              {OBJECTIVES.filter((x) => x.slug !== slug).map((x) => (
                <Link
                  key={x.slug}
                  href={`/cuanto-necesito/${x.slug}`}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
                >
                  {x.label}
                </Link>
              ))}
            </div>
          </section>

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Quieres simular tu plan con tu rentabilidad esperada?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/calculadora/interes-compuesto" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white">
                Interés compuesto
              </Link>
              <Link href="/calculadora/fire-monte-carlo" className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg">
                FIRE Monte Carlo
              </Link>
            </div>
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
