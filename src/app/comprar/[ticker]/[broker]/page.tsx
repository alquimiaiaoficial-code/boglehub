import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getEtfByTicker } from '@/lib/etf-database'
import { getBrokerBySlug, BROKERS } from '@/data/brokers'
import { computeFiscalGrade } from '@/lib/fiscal'
import { formatPct } from '@/lib/utils'
import { POPULAR_ETF_TICKERS, COVERED_BROKER_SLUGS, getAvailability } from '@/data/etf-broker-availability'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  const params: { ticker: string; broker: string }[] = []
  for (const ticker of POPULAR_ETF_TICKERS) {
    for (const broker of COVERED_BROKER_SLUGS) {
      const availability = getAvailability(ticker, broker)
      if (availability.available) {
        params.push({ ticker: ticker.toLowerCase(), broker })
      }
    }
  }
  return params
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string; broker: string }>
}): Promise<Metadata> {
  const { ticker, broker } = await params
  const etf = getEtfByTicker(ticker)
  const brokerData = getBrokerBySlug(broker)
  if (!etf || !brokerData) return { title: 'Combinación no encontrada' }

  const title = `Cómo comprar ${etf.ticker} en ${brokerData.name} (guía paso a paso 2026)`
  const description = `Cómo comprar ${etf.ticker} en ${brokerData.name} desde España: comisiones (${brokerData.etfCommission}), pasos de la operación, fiscalidad y alternativas.`

  return {
    title,
    description,
    openGraph: {
      title: `Comprar ${etf.ticker} en ${brokerData.name} | BogleHub`,
      description,
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(`${etf.ticker} en ${brokerData.name}`)}&subtitle=${encodeURIComponent('Gu%C3%ADa%20paso%20a%20paso')}`],
    },
    alternates: { canonical: `/comprar/${ticker}/${broker}` },
  }
}

export default async function ComprarPage({
  params,
}: {
  params: Promise<{ ticker: string; broker: string }>
}) {
  const { ticker, broker } = await params
  const etf = getEtfByTicker(ticker)
  const brokerData = getBrokerBySlug(broker)
  if (!etf || !brokerData) notFound()

  const fiscal = computeFiscalGrade(etf.isin, etf.accumulating)
  const pageUrl = `${BASE_URL}/comprar/${ticker}/${broker}`
  const otherBrokers = BROKERS.filter((b) => b.slug !== broker && COVERED_BROKER_SLUGS.includes(b.slug)).slice(0, 4)

  const lead = `Según BogleHub, comprar ${etf.ticker} (${etf.name}, ISIN ${etf.isin}) en ${brokerData.name} cuesta ${brokerData.etfCommission} por operación; el ETF tiene un TER del ${formatPct(etf.ter / 100, 2)} anual y grado fiscal ${fiscal.grade} para residentes en España. Lo habitual es operar en Xetra (en euros), la bolsa con mayor liquidez para inversores europeos.`

  const faqs = [
    {
      q: `¿Cuánto cuesta comprar ${etf.ticker} en ${brokerData.name}?`,
      a: `${brokerData.name} cobra ${brokerData.etfCommission} por operación al comprar ${etf.ticker} (${etf.name}). Adicionalmente, el ETF tiene un TER del ${formatPct(etf.ter / 100, 2)} anual que se descuenta automáticamente del valor liquidativo (no es una factura separada). No hay comisión de custodia${brokerData.slug === 'degiro' ? ' en la cuenta básica' : ''} en ${brokerData.name}.`,
    },
    {
      q: `¿En qué bolsa se compra ${etf.ticker} desde ${brokerData.name}?`,
      a: `${etf.ticker} (ISIN ${etf.isin}) está domiciliado en ${fiscal.domicileLabel} y cotiza en múltiples bolsas europeas (Xetra, Euronext Ámsterdam, Borsa Italiana, LSE). Desde ${brokerData.name}, lo más habitual es operar en Xetra (Frankfurt, EUR) por ser la bolsa con mayor liquidez en euros para inversores europeos.`,
    },
    {
      q: `¿Es ${etf.ticker} comprado en ${brokerData.name} fiscalmente eficiente para España?`,
      a: `Sí. ${etf.ticker} tiene grado fiscal ${fiscal.grade} para residentes en España (${fiscal.domicileLabel}, ${etf.accumulating ? 'acumulación' : 'distribución'}). ${fiscal.reason} Recuerda que las ganancias por venta tributan en el IRPF del ahorro (19-30%) y que ${brokerData.name} ${brokerData.regulatorCountry === 'España' ? 'aplica retención fiscal automáticamente' : 'no aplica retención española — debes declararlo tú directamente en la renta'}.`,
    },
    {
      q: `¿Cuál es el mínimo para invertir en ${etf.ticker} desde ${brokerData.name}?`,
      a: brokerData.slug === 'trade-republic'
        ? `En Trade Republic puedes empezar desde 1€ usando los planes de ahorro automáticos, que admiten fracciones de participación. Para órdenes manuales, el mínimo equivale al precio de una participación del ETF (que varía con el mercado).`
        : `El mínimo equivale al precio de una participación de ${etf.ticker} (que varía con la cotización). No hay mínimo adicional impuesto por ${brokerData.name}.`,
    },
    {
      q: `¿Cuál es la alternativa a ${etf.ticker} en ${brokerData.name}?`,
      a: `Si buscas alternativas a ${etf.ticker} con exposición similar, considera los otros ETFs disponibles en la misma categoría. Para ver todas las alternativas, consulta la ficha completa del ETF o el catálogo por categoría en BogleHub.`,
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
            { name: 'Comprar', url: `${BASE_URL}/comprar` },
            { name: etf.ticker, url: `${BASE_URL}/etf/${etf.ticker.toLowerCase()}` },
            { name: brokerData.name, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'HowTo',
          name: `Cómo comprar ${etf.ticker} en ${brokerData.name}`,
          description: `Guía paso a paso para comprar el ETF ${etf.name} (${etf.ticker}) en ${brokerData.name}.`,
          url: pageUrl,
          totalTime: 'PT15M',
          estimatedCost: { currency: 'EUR', value: '0' },
          steps: [
            { name: `Abrir cuenta en ${brokerData.name}`, text: `Registrarse en ${brokerData.name} con DNI/NIE y datos bancarios. Verificación de identidad ${brokerData.slug === 'trade-republic' ? 'mediante videollamada o autoservicio' : 'según procedimiento del broker'}. Tiempo: 10-30 minutos.` },
            { name: 'Aportar fondos', text: 'Transferencia desde tu cuenta bancaria a la cuenta del broker. SEPA suele tardar 1-2 días hábiles.' },
            { name: `Buscar ${etf.ticker} en el broker`, text: `Usar el buscador con el ticker ${etf.ticker} o el ISIN ${etf.isin} para encontrar el ETF.` },
            { name: 'Verificar mercado y divisa', text: `Asegurarse de operar en Xetra (EUR) si el broker lo permite, para evitar conversiones de divisa innecesarias.` },
            { name: 'Lanzar la orden', text: `Introducir el número de participaciones (o el importe en €) y elegir orden de mercado o limitada. Confirmar la operación.` },
            { name: 'Mantener a largo plazo', text: `${etf.ticker} es un ETF de ${etf.accumulating ? 'acumulación' : 'distribución'} apto para estrategia indexada Boglehead a largo plazo. No tocar más allá del rebalanceo anual.` },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">

          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href={`/etf/${etf.ticker.toLowerCase()}`} className="hover:text-fg transition-colors">{etf.ticker}</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{brokerData.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Cómo comprar {etf.ticker} en {brokerData.name} (2026)
            </h1>
            <p className="mt-3 text-fg leading-relaxed">{lead}</p>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              Guía paso a paso para comprar el ETF {etf.name} en {brokerData.name}: comisiones,
              pasos operativos, fiscalidad para residentes en España y alternativas. Información
              actualizada a 2026.
            </p>
          </header>

          {/* Datos clave */}
          <Card className="mb-8">
            <CardTitle className="mb-4">Resumen operativo</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">ETF</dt>
                <dd className="text-fg font-medium">{etf.ticker} ({etf.name})</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">ISIN</dt>
                <dd className="text-fg font-mono">{etf.isin}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Broker</dt>
                <dd className="text-fg font-medium">{brokerData.name}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Comisión por operación</dt>
                <dd className="text-fg font-medium">{brokerData.etfCommission}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">TER anual del ETF</dt>
                <dd className="text-fg font-medium">{formatPct(etf.ter / 100, 2)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Grado fiscal (España)</dt>
                <dd className="text-fg font-medium">{fiscal.grade} — {fiscal.domicileLabel}</dd>
              </div>
            </dl>
          </Card>

          {/* Pasos */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-4">Pasos para comprar {etf.ticker} en {brokerData.name}</h2>
            <ol className="space-y-4">
              {[
                { title: `Abrir cuenta en ${brokerData.name}`, text: `Registrarse en la web o app oficial con DNI/NIE y datos bancarios. La verificación de identidad tarda entre 10 y 30 minutos según el broker.` },
                { title: 'Aportar fondos', text: 'Realizar transferencia SEPA desde tu cuenta bancaria. Suele tardar 1-2 días hábiles. En Trade Republic puedes activar también pagos instantáneos por SEPA Instant si tu banco lo soporta.' },
                { title: `Buscar el ETF`, text: `Usar el buscador con el ticker ${etf.ticker} o el ISIN ${etf.isin}. Verificar que el ISIN coincide exactamente para evitar comprar un ETF equivocado.` },
                { title: 'Verificar mercado y divisa', text: 'Si el broker te permite elegir bolsa, opta por Xetra (Frankfurt, EUR) para la mayoría de ETFs UCITS — máxima liquidez y sin conversión de divisa.' },
                { title: 'Lanzar la orden', text: 'Introducir importe (en €) o número de participaciones. Elegir entre orden de mercado (ejecución inmediata al mejor precio disponible) u orden limitada (a un precio máximo que tú indiques). Para inversor indexado de largo plazo, ambas son válidas.' },
                { title: 'Mantener', text: `${etf.ticker} es para mantener a largo plazo, no para tradear. La cartera se rebalancea una vez al año si es necesario.` },
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/10 text-brand-400 text-sm font-bold">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-fg">{step.title}</h3>
                    <p className="text-sm text-fg-muted mt-1 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              ))}
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

          {/* Otras opciones */}
          {otherBrokers.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-fg mb-3">Comprar {etf.ticker} en otros brokers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {otherBrokers.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/comprar/${etf.ticker.toLowerCase()}/${b.slug}`}
                    className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
                  >
                    <div className="font-semibold text-fg">Comprar {etf.ticker} en {b.name}</div>
                    <p className="text-xs text-fg-muted mt-1">{b.etfCommission}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Quieres ver el análisis completo de {etf.ticker} o cambiar a otro ETF?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={`/etf/${etf.ticker.toLowerCase()}`} className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-500">
                Ficha completa {etf.ticker}
              </Link>
              <Link href={`/broker/${brokerData.slug}`} className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg">
                Análisis {brokerData.name}
              </Link>
            </div>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Verifica las comisiones actuales
            en {brokerData.name} antes de operar. Última revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
