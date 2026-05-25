import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { FIRE_AGES, getFireAgeBySlug } from '@/data/fire-ages'

const BASE_URL = 'https://boglehub.com'

function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function generateStaticParams() {
  return FIRE_AGES.map((f) => ({ slug: f.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const f = getFireAgeBySlug(slug)
  if (!f) return { title: 'No encontrado' }
  return {
    title: `Cómo jubilarse a los ${f.targetAge} años en España: plan FIRE 2026`,
    description: `${f.description} Plan paso a paso: capital necesario, aportación mensual, cartera recomendada y consideraciones específicas para retirada a los ${f.targetAge}.`,
    openGraph: { locale: 'es_ES', images: [`/api/og?title=${encodeURIComponent(`Jubilarse a los ${f.targetAge}`)}&subtitle=${encodeURIComponent('Plan FIRE Espa%C3%B1a')}`] },
    alternates: { canonical: `/jubilacion/${slug}` },
  }
}

export default async function JubilacionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fLookup = getFireAgeBySlug(slug)
  if (!fLookup) notFound()
  const f = fLookup
  const pageUrl = `${BASE_URL}/jubilacion/${slug}`

  // Capital necesario aproximado usando regla del 4% para distintos gastos
  const gastosEjemplo = [18000, 24000, 30000, 36000, 48000]
  const capitalNeeded = (gasto: number) => gasto * 25

  // PMT necesaria desde 25/30/35 años para llegar al objetivo (gasto 24k → 600k)
  function pmt(target: number, years: number, rate = 0.07): number {
    const r = rate / 12
    const n = years * 12
    return Math.round((target * r) / (Math.pow(1 + r, n) - 1))
  }

  const targetCapital = 600000 // Para gasto 24k/año
  const aportFrom25 = f.targetAge - 25
  const aportFrom30 = f.targetAge - 30
  const aportFrom35 = f.targetAge - 35

  const faqs = [
    {
      q: `¿Cuánto necesito para jubilarme a los ${f.targetAge} años en España?`,
      a: `Aplicando la regla del 4% (capital = 25 × gasto anual), si quieres gastar 24.000€/año (2.000€/mes) necesitas 600.000€. Para 30.000€/año (2.500€/mes), 750.000€. Para 36.000€/año (3.000€/mes), 900.000€. La pensión pública española posterior reduce el capital efectivamente necesario.`,
    },
    {
      q: `¿Es realista jubilarse a los ${f.targetAge}?`,
      a: f.difficulty === 'extremo' || f.difficulty === 'muy difícil'
        ? `${f.description} Es alcanzable pero requiere ingresos muy altos o un compromiso muy estricto con la frugalidad durante 15-25 años. La mayoría de las personas que llegan a este FIRE tienen ingresos profesionales altos y comienzan muy jóvenes.`
        : `Sí, es alcanzable para muchos profesionales con disciplina de ahorro. ${f.description} Combinar con plan de pensiones individual (límite 1.500€/año deducibles) acelera el camino por la deducción IRPF.`,
    },
    {
      q: `¿Cuánto tengo que ahorrar al mes para jubilarme a los ${f.targetAge}?`,
      a: `Asumiendo objetivo de 600.000€ y rentabilidad anual del 7%, las aportaciones necesarias son aproximadamente: empezando a los 25 (${aportFrom25} años por delante) → ${formatEUR(pmt(targetCapital, aportFrom25))}/mes. Empezando a los 30 (${aportFrom30} años) → ${aportFrom30 > 0 ? formatEUR(pmt(targetCapital, aportFrom30)) : 'no alcanzable'}. Empezando a los 35 (${aportFrom35} años) → ${aportFrom35 > 0 ? formatEUR(pmt(targetCapital, aportFrom35)) : 'no alcanzable'}.`,
    },
    {
      q: `¿Cómo debe ser mi cartera para jubilarme a los ${f.targetAge}?`,
      a: `Durante la fase de acumulación, 80-90% renta variable global (VWCE o IWDA + EIMI). Conforme te acerques al FIRE, transición progresiva a ${f.equityInRetirement} en renta variable para reducir riesgo de secuencia. En la fase de retirada con ${f.withdrawalYears} años por delante, mantener una buena parte en renta variable es necesario para no quedarte sin capital por la inflación.`,
    },
    {
      q: `¿La pensión pública influye en mi plan FIRE a los ${f.targetAge}?`,
      a: f.targetAge < 65
        ? `Sí, masivamente. Si te jubilas a los ${f.targetAge} y la pensión pública empieza a los 65, tienes que cubrir ${65 - f.targetAge} años solo con tu cartera. Después, la pensión reduce la presión sobre el capital. Para FIRE realista en España, suele ser óptimo planificar tu cartera para cubrir el "gap" hasta la pensión y reducir la regla del 4% al 3-3,5% para esa fase específica.`
        : `Sí. A los 65 ya cobras pensión completa si has cotizado los años requeridos. Tu cartera solo necesita complementar el gap entre pensión y gasto deseado.`,
    },
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [
        { name: 'Inicio', url: BASE_URL },
        { name: 'Jubilación', url: `${BASE_URL}/jubilacion` },
        { name: `${f.targetAge} años`, url: pageUrl },
      ]}} />
      <JsonLd schema={{ type: 'Article', headline: `Cómo jubilarse a los ${f.targetAge} en España`, description: f.description, url: pageUrl, datePublished: '2026-05-24', articleSection: 'Jubilación anticipada' }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/jubilacion" className="hover:text-fg">Jubilación</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{f.targetAge} años</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Cómo jubilarse a los {f.targetAge} años en España
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">{f.description}</p>
          </header>

          <Card className="mb-8">
            <CardTitle className="mb-4">Datos clave del plan</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><dt className="text-xs uppercase text-fg-muted">Dificultad</dt><dd className="font-medium text-fg capitalize">{f.difficulty}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Años en retirada (hasta 90)</dt><dd className="font-medium text-fg">{f.withdrawalYears}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Renta variable en retirada</dt><dd className="font-medium text-fg">{f.equityInRetirement}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Gap hasta pensión pública</dt><dd className="font-medium text-fg">{Math.max(0, 65 - f.targetAge)} años</dd></div>
            </dl>
          </Card>

          {/* Tabla capital necesario */}
          <Card className="mb-8">
            <CardTitle className="mb-4">Capital necesario según gasto anual (regla del 4%)</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-fg-muted">
                    <th className="pb-2">Gasto anual</th>
                    <th className="pb-2 text-right">Capital al 4% (sin pensión)</th>
                    <th className="pb-2 text-right">Aportación 200€/mes</th>
                  </tr>
                </thead>
                <tbody>
                  {gastosEjemplo.map((g) => (
                    <tr key={g} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5">{formatEUR(g)}/año</td>
                      <td className="py-2.5 text-right font-semibold text-fg">{formatEUR(capitalNeeded(g))}</td>
                      <td className="py-2.5 text-right text-accent">{aportFrom25 > 0 ? `${Math.round(pmt(capitalNeeded(g), aportFrom25) / 100) * 100}€/mes desde 25a` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Pasos */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-4">Plan paso a paso</h2>
            <ol className="space-y-3 text-sm text-fg-muted">
              <li className="flex gap-3"><span className="text-accent">1.</span><span><strong className="text-fg">Define tu gasto FIRE anual</strong> — sé honesto, no idealices a la baja. Multiplica por 25 para el capital objetivo.</span></li>
              <li className="flex gap-3"><span className="text-accent">2.</span><span><strong className="text-fg">Calcula tu tasa de ahorro</strong> — la cifra que más impacta. Tasa del 50% reduce años a FIRE más que cualquier rentabilidad extra.</span></li>
              <li className="flex gap-3"><span className="text-accent">3.</span><span><strong className="text-fg">Construye cartera 90/10</strong> en fase acumulación (VWCE + AGGH) en Trade Republic con plan de ahorro automático.</span></li>
              <li className="flex gap-3"><span className="text-accent">4.</span><span><strong className="text-fg">Plan de pensiones individual</strong> hasta el límite de 1.500€/año para aprovechar deducción IRPF.</span></li>
              <li className="flex gap-3"><span className="text-accent">5.</span><span><strong className="text-fg">Glide path los últimos 5-10 años</strong> antes del FIRE: transición progresiva a {f.equityInRetirement} renta variable.</span></li>
              <li className="flex gap-3"><span className="text-accent">6.</span><span><strong className="text-fg">Construye colchón de 2-3 años</strong> en liquidez antes de empezar a vivir de la cartera.</span></li>
              <li className="flex gap-3"><span className="text-accent">7.</span><span><strong className="text-fg">Simula Monte Carlo</strong> para validar la probabilidad real de que tu plan resista la volatilidad.</span></li>
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

          {/* Otras edades */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-3">Otros planes de jubilación</h2>
            <div className="flex flex-wrap gap-2">
              {FIRE_AGES.filter(x => x.slug !== slug).map((x) => (
                <Link key={x.slug} href={`/jubilacion/${x.slug}`} className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-brand-400 hover:text-brand-300">
                  A los {x.targetAge}
                </Link>
              ))}
            </div>
          </section>

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">Simula tu plan FIRE personalizado con Monte Carlo</p>
            <Link href="/calculadora/fire-monte-carlo" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Calculadora FIRE Monte Carlo
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">Información educativa, no asesoramiento. Última revisión: mayo 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
