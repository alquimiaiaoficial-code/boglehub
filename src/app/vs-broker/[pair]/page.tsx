import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getBrokerBySlug } from '@/data/brokers'
import { BROKER_PAIRS, brokerPairToSlug, slugToBrokerPair } from '@/data/broker-pairs'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return BROKER_PAIRS.map(([a, b]) => ({ pair: brokerPairToSlug(a, b) }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>
}): Promise<Metadata> {
  const { pair } = await params
  const parts = slugToBrokerPair(pair)
  if (!parts) return { title: 'Comparativa no encontrada' }
  const [a, b] = parts
  const brokerA = getBrokerBySlug(a)
  const brokerB = getBrokerBySlug(b)
  if (!brokerA || !brokerB) return { title: 'Broker no encontrado' }

  const title = `${brokerA.name} vs ${brokerB.name}: comparativa 2026`
  const description = `${brokerA.name} vs ${brokerB.name} para invertir en ETFs: comisiones, regulación, ventajas y para qué inversor encaja mejor cada uno.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | BogleHub`,
      description,
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(`${brokerA.name} vs ${brokerB.name}`)}&subtitle=${encodeURIComponent('Comparativa%20brokers')}`],
    },
    alternates: { canonical: `/vs-broker/${pair}` },
  }
}

export default async function VsBrokerPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params
  const parts = slugToBrokerPair(pair)
  if (!parts) notFound()
  const [a, b] = parts
  const brokerA = getBrokerBySlug(a)
  const brokerB = getBrokerBySlug(b)
  if (!brokerA || !brokerB) notFound()

  const pageUrl = `${BASE_URL}/vs-broker/${pair}`

  // Veredicto citable, factual y equilibrado (sin "mejor" universal — YMYL).
  const verdict = `Según BogleHub, la diferencia clave entre ${brokerA.name} y ${brokerB.name} está en comisiones y producto: ${brokerA.name} cobra ${brokerA.etfCommission} por ETF y ${brokerA.supportsFunds ? 'también ofrece fondos indexados con traspaso fiscal libre' : 'solo ofrece ETFs'}; ${brokerB.name} cobra ${brokerB.etfCommission} y ${brokerB.supportsFunds ? 'también ofrece fondos indexados con traspaso fiscal libre' : 'solo ofrece ETFs'}. ${brokerA.name} está regulado por ${brokerA.regulator} (${brokerA.regulatorCountry}); ${brokerB.name}, por ${brokerB.regulator} (${brokerB.regulatorCountry}). No hay un "mejor" universal: depende de tu patrón de inversión (importe y frecuencia de aportación y si quieres fondos además de ETFs).`

  const faqs = [
    {
      q: `¿${brokerA.name} o ${brokerB.name}: cuál es más barato?`,
      a: `Comisión por operación ETF: ${brokerA.name} cobra ${brokerA.etfCommission}; ${brokerB.name} cobra ${brokerB.etfCommission}. Para órdenes pequeñas el más barato suele ser el que tenga 0€ fijo. Para órdenes grandes, considera también si hay porcentaje variable.`,
    },
    {
      q: `¿${brokerA.name} o ${brokerB.name}: cuál es más seguro?`,
      a: `${brokerA.name} está regulado por ${brokerA.regulator} (${brokerA.regulatorCountry}). ${brokerB.name} está regulado por ${brokerB.regulator} (${brokerB.regulatorCountry}). Ambos son entidades reguladas con activos segregados del cliente. Las garantías varían según el regulador: ${brokerA.depositGuarantee ?? 'según fondo de inversión'} en ${brokerA.name} y ${brokerB.depositGuarantee ?? 'según fondo de inversión'} en ${brokerB.name}.`,
    },
    {
      q: `¿Puedo tener cuenta en ${brokerA.name} y ${brokerB.name} a la vez?`,
      a: `Sí, es muy recomendable diversificar entre brokers cuando el patrimonio es alto. Tener ${brokerA.name} y ${brokerB.name} a la vez permite no superar los fondos de garantía en una sola entidad y mantener redundancia operativa en caso de problemas técnicos con uno.`,
    },
    {
      q: `¿${brokerA.name} o ${brokerB.name}: cuál es mejor para empezar?`,
      a: `Para inversores que empiezan con aportaciones pequeñas regulares: ${brokerA.etfCommission === '0€ por operación' ? brokerA.name : brokerB.etfCommission === '0€ por operación' ? brokerB.name : 'el que tenga comisión más baja'} suele ser más eficiente. Para quien quiera fondos indexados con traspaso fiscal libre: solo ${brokerA.supportsFunds ? brokerA.name : brokerB.supportsFunds ? brokerB.name : 'opciones limitadas en ambos'} los ofrece.`,
    },
    {
      q: `¿${brokerA.name} ofrece fondos indexados como ${brokerB.name}?`,
      a: `${brokerA.name}: ${brokerA.supportsFunds ? 'Sí, ofrece fondos indexados (Vanguard, Amundi, Fidelity) con traspaso fiscal libre entre fondos.' : 'No, solo ofrece ETFs.'} ${brokerB.name}: ${brokerB.supportsFunds ? 'Sí, ofrece fondos indexados con traspaso fiscal libre.' : 'No, solo ofrece ETFs.'}`,
    },
  ]

  const rows: [string, string, string][] = [
    ['Comisión por ETF', brokerA.etfCommission, brokerB.etfCommission],
    ['Fondos indexados', brokerA.supportsFunds ? 'Sí' : 'No', brokerB.supportsFunds ? 'Sí' : 'No'],
    ['Cuenta remunerada', brokerA.remuneratedAccount ?? 'No', brokerB.remuneratedAccount ?? 'No'],
    ['Mínimo apertura', brokerA.minimumOpening ?? 'Sin mínimo', brokerB.minimumOpening ?? 'Sin mínimo'],
    ['Regulador', `${brokerA.regulator} (${brokerA.regulatorCountry})`, `${brokerB.regulator} (${brokerB.regulatorCountry})`],
    ['Año fundación', brokerA.founded?.toString() ?? '—', brokerB.founded?.toString() ?? '—'],
    ['Garantía depósito', brokerA.depositGuarantee ?? '—', brokerB.depositGuarantee ?? '—'],
    ['Garantía inversión', brokerA.investmentGuarantee ?? '—', brokerB.investmentGuarantee ?? '—'],
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Brokers', url: `${BASE_URL}/broker` },
            { name: `${brokerA.name} vs ${brokerB.name}`, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: `${brokerA.name} vs ${brokerB.name}: comparativa 2026`,
          description: verdict,
          url: pageUrl,
          datePublished: '2026-05-24',
          dateModified: '2026-05-30',
          articleSection: 'Comparativas de brokers',
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/broker" className="hover:text-fg transition-colors">Brokers</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{brokerA.name} vs {brokerB.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              {brokerA.name} vs {brokerB.name} (2026)
            </h1>
            <p className="mt-3 text-fg leading-relaxed">
              {verdict}
            </p>
          </header>

          <Card className="mb-8 p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wide text-fg-muted"></th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-brand-400">{brokerA.name}</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-accent">{brokerB.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map(([label, valA, valB], i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 font-medium text-fg-muted">{label}</td>
                      <td className="px-4 py-3 text-center text-fg text-xs">{valA}</td>
                      <td className="px-4 py-3 text-center text-fg text-xs">{valB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardTitle className="mb-2">{brokerA.name}</CardTitle>
              <p className="text-xs text-fg-muted mb-3">{brokerA.tagline}</p>
              <Link href={`/broker/${brokerA.slug}`} className="text-xs text-brand-400 hover:text-brand-300">
                Ver análisis completo →
              </Link>
            </Card>
            <Card>
              <CardTitle className="mb-2">{brokerB.name}</CardTitle>
              <p className="text-xs text-fg-muted mb-3">{brokerB.tagline}</p>
              <Link href={`/broker/${brokerB.slug}`} className="text-xs text-brand-400 hover:text-brand-300">
                Ver análisis completo →
              </Link>
            </Card>
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

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Quieres ver otras comparativas de brokers?
            </p>
            <Link href="/broker" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Todos los brokers
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento. Verifica condiciones actuales en las webs
            oficiales antes de operar. Última revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
