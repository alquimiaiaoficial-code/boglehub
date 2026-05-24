import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getEtfByTicker } from '@/lib/etf-database'
import { computeFiscalGrade, GRADE_STYLES } from '@/lib/fiscal'
import { formatPct } from '@/lib/utils'
import { ETF_PAIRS, slugToPair, pairToSlug } from '@/data/etf-pairs'
import type { EtfMetadata, Region } from '@/types/etf'

const BASE_URL = 'https://boglehub.com'
const CURRENT_YEAR = 2026

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return ETF_PAIRS.map(([a, b]) => ({ pair: pairToSlug(a, b) }))
}

// No generar páginas para pares no curados
export const dynamicParams = false

// ─── Helpers ──────────────────────────────────────────────────────────────────

const REGION_LABEL: Record<Region, string> = {
  US: 'EE. UU.',
  EUROPE: 'Europa',
  EM: 'Emergentes',
  JAPAN: 'Japón',
  UK: 'Reino Unido',
  PACIFIC_EX_JAPAN: 'Pacífico',
  CHINA: 'China',
  GLOBAL: 'Global',
  OTHER: 'Otros',
}

const ASSET_CLASS_LABEL: Record<string, string> = {
  EQUITY: 'Renta variable',
  BOND: 'Renta fija',
  COMMODITY: 'Materias primas',
  REIT: 'Inmobiliario',
  CASH: 'Liquidez',
  MIXED: 'Mixto',
}

/** Solapamiento geográfico entre dos ETFs (0–1) */
function computeOverlap(a: EtfMetadata, b: EtfMetadata): number {
  const regions = Object.keys(a.regionAllocation) as Region[]
  return regions.reduce(
    (sum, r) => sum + Math.min(a.regionAllocation[r] ?? 0, b.regionAllocation[r] ?? 0),
    0,
  )
}

/** Etiqueta de solapamiento para el usuario */
function overlapLabel(pct: number): { text: string; color: string } {
  if (pct >= 0.85) return { text: 'Muy alto', color: 'text-danger' }
  if (pct >= 0.65) return { text: 'Alto', color: 'text-warn' }
  if (pct >= 0.40) return { text: 'Moderado', color: 'text-brand-400' }
  return { text: 'Bajo', color: 'text-accent' }
}

/** ¿Son el mismo fondo? (mismo ISIN o solapamiento >95 %) */
function isSameFund(a: EtfMetadata, b: EtfMetadata, overlap: number): boolean {
  return (!!a.isin && a.isin === b.isin) || overlap >= 0.95
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>
}): Promise<Metadata> {
  const { pair } = await params
  const tickers = slugToPair(pair)
  if (!tickers) return { title: 'Comparativa ETF no encontrada' }

  const [tickerA, tickerB] = tickers
  const etfA = getEtfByTicker(tickerA)
  const etfB = getEtfByTicker(tickerB)
  if (!etfA || !etfB) return { title: 'ETF no encontrado' }

  const title = `${tickerA} vs ${tickerB}: comparativa ${CURRENT_YEAR}`
  const description = `Comparativa completa ${tickerA} vs ${tickerB}: TER (${formatPct(etfA.ter / 100, 2)} vs ${formatPct(etfB.ter / 100, 2)}), domicilio fiscal, asignación geográfica y sectorial. Cuál elegir para tu cartera indexada en España.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | BogleHub`,
      description,
      locale: 'es_ES',
      images: [
        `/api/og?title=${encodeURIComponent(`${tickerA} vs ${tickerB}`)}&subtitle=${encodeURIComponent('Comparativa ETF · BogleHub')}`,
      ],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ComparisonRow({
  label,
  valueA,
  valueB,
  highlight,
}: {
  label: string
  valueA: React.ReactNode
  valueB: React.ReactNode
  highlight?: 'a' | 'b' | null
}) {
  return (
    <tr className="border-t border-border">
      <td className="py-3 px-4 text-sm text-fg-muted font-medium">{label}</td>
      <td className={`py-3 px-4 text-sm text-center font-mono ${highlight === 'a' ? 'text-accent font-bold' : 'text-fg'}`}>
        {valueA}
      </td>
      <td className={`py-3 px-4 text-sm text-center font-mono ${highlight === 'b' ? 'text-accent font-bold' : 'text-fg'}`}>
        {valueB}
      </td>
    </tr>
  )
}

function RegionBar({ label, pctA, pctB }: { label: string; pctA: number; pctB: number }) {
  if (pctA < 0.005 && pctB < 0.005) return null
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-fg-muted mb-1">
        <span>{label}</span>
        <span className="font-mono">
          <span className="text-brand-400">{formatPct(pctA, 0)}</span>
          {' / '}
          <span className="text-accent">{formatPct(pctB, 0)}</span>
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-surface-2 overflow-hidden">
        <div
          className="absolute left-0 h-full rounded-full bg-brand-500/60"
          style={{ width: `${Math.min(100, pctA * 100)}%` }}
        />
      </div>
      <div className="relative h-1 rounded-full bg-surface-2 overflow-hidden mt-0.5">
        <div
          className="absolute left-0 h-full rounded-full bg-accent/60"
          style={{ width: `${Math.min(100, pctB * 100)}%` }}
        />
      </div>
    </div>
  )
}

export default async function EtfPairPage({
  params,
}: {
  params: Promise<{ pair: string }>
}) {
  const { pair } = await params
  const tickers = slugToPair(pair)
  if (!tickers) notFound()

  const [tickerA, tickerB] = tickers
  const etfA = getEtfByTicker(tickerA)
  const etfB = getEtfByTicker(tickerB)
  if (!etfA || !etfB) notFound()

  const fiscalA = computeFiscalGrade(etfA.isin, etfA.accumulating)
  const fiscalB = computeFiscalGrade(etfB.isin, etfB.accumulating)
  const overlap = computeOverlap(etfA, etfB)
  const overlapInfo = overlapLabel(overlap)
  const sameFund = isSameFund(etfA, etfB, overlap)

  const terDiff = Math.abs(etfA.ter - etfB.ter)
  const cheaperTicker = etfA.ter <= etfB.ter ? tickerA : tickerB

  const pageUrl = `${BASE_URL}/comparar/${pair}`

  // FAQ dinámica basada en los datos reales
  const faqItems = [
    {
      q: `¿Cuál tiene menor coste, ${tickerA} o ${tickerB}?`,
      a: terDiff < 0.01
        ? `Ambos tienen un TER prácticamente idéntico (${formatPct(etfA.ter / 100, 2)} vs ${formatPct(etfB.ter / 100, 2)}). El coste no es un criterio diferenciador entre ellos.`
        : `${cheaperTicker} es el más barato con un TER del ${formatPct((cheaperTicker === tickerA ? etfA.ter : etfB.ter) / 100, 2)} frente al ${formatPct((cheaperTicker === tickerA ? etfB.ter : etfA.ter) / 100, 2)} del otro. La diferencia de ${formatPct(terDiff / 100, 2)} puede suponer miles de euros a largo plazo en carteras grandes.`,
    },
    {
      q: `¿Son ${tickerA} y ${tickerB} el mismo ETF?`,
      a: sameFund
        ? `Sí, son esencialmente el mismo fondo. Comparten el mismo ISIN o tienen una composición geográfica casi idéntica (solapamiento del ${formatPct(overlap, 0)}). Las diferencias son de moneda de cotización o bolsa donde se negocia, no de activos subyacentes.`
        : `No son el mismo ETF, aunque pueden tener partes en común. El solapamiento geográfico entre ambos es del ${formatPct(overlap, 0)}, lo que significa que tener los dos en cartera implica ${overlap > 0.6 ? 'considerable concentración' : 'diversificación real'} en las regiones compartidas.`,
    },
    {
      q: `¿Cuál es más eficiente fiscalmente para un residente en España?`,
      a: fiscalA.grade === fiscalB.grade
        ? `Ambos tienen la misma eficiencia fiscal (grado ${fiscalA.grade}): los dos están domiciliados en ${fiscalA.domicileLabel} y tienen la misma política de distribución.`
        : `${fiscalA.grade < fiscalB.grade ? tickerA : tickerB} es más eficiente fiscalmente (grado ${fiscalA.grade < fiscalB.grade ? fiscalA.grade : fiscalB.grade} vs ${fiscalA.grade < fiscalB.grade ? fiscalB.grade : fiscalA.grade}). ${fiscalA.grade < fiscalB.grade ? fiscalA.reason : fiscalB.reason}`,
    },
    {
      q: `¿Tiene sentido tener ${tickerA} y ${tickerB} a la vez en la cartera?`,
      a: sameFund
        ? `No. Al ser esencialmente el mismo fondo (solapamiento del ${formatPct(overlap, 0)}), tener ambos no aporta diversificación. Sería mejor consolidar en uno solo para simplificar la cartera y reducir la fricción operativa de gestionar dos posiciones idénticas.`
        : overlap > 0.6
          ? `En general no. Tienen un solapamiento del ${formatPct(overlap, 0)}, lo que significa que la mayor parte de su exposición regional es compartida. Sumarlos no añade diversificación real, solo complejidad. Elige uno y mantén la posición consolidada — el rebalanceo será más sencillo.`
          : etfA.assetClass !== etfB.assetClass
            ? `Sí. ${tickerA} y ${tickerB} pertenecen a clases de activo diferentes (${ASSET_CLASS_LABEL[etfA.assetClass] ?? etfA.assetClass} y ${ASSET_CLASS_LABEL[etfB.assetClass] ?? etfB.assetClass}), por lo que son complementarios, no alternativos. Pueden formar parte de una cartera diversificada juntos.`
            : `Puede tener sentido. El solapamiento es solo del ${formatPct(overlap, 0)}, lo que indica que aportan exposición a regiones o estrategias diferenciadas dentro de la misma clase de activo. Si tu objetivo es diversificación real, combinarlos puede ser razonable; si buscas simplicidad, elige uno solo.`,
    },
    {
      q: `¿Dónde puedo comprar ${tickerA} y ${tickerB} en España?`,
      a: `${tickerA} y ${tickerB} cotizan en bolsas europeas y pueden comprarse en los principales brokers usados por inversores indexados españoles: Trade Republic (0€ por orden, planes de ahorro automáticos desde 1€), DEGIRO (0,50€ + 0,004% por operación, acceso amplio a bolsas) y MyInvestor (0,20€ + 0,03%, único broker español del listado que también ofrece fondos indexados con traspaso fiscal libre). Verifica siempre el spread efectivo y la liquidez en el momento de la operación.`,
    },
  ]

  return (
    <>
      {/* Structured data */}
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Comparar ETFs', url: `${BASE_URL}/comparar` },
            { name: `${tickerA} vs ${tickerB}`, url: pageUrl },
          ],
        }}
      />
      <JsonLd schema={{ type: 'FAQPage', questions: faqItems.map(f => ({ q: f.q, a: f.a })) }} />

      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/comparar" className="hover:text-fg transition-colors">Comparar ETFs</Link>
            <span>/</span>
            <span className="text-fg">{tickerA} vs {tickerB}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              {tickerA} vs {tickerB}: comparativa completa {CURRENT_YEAR}
            </h1>
            <p className="mt-3 text-fg-muted max-w-2xl">
              {sameFund
                ? `${tickerA} y ${tickerB} son versiones del mismo fondo listadas en distintas bolsas o monedas. Te explicamos las diferencias prácticas para el inversor español.`
                : `Comparativa en profundidad entre ${etfA.name} y ${etfB.name}. TER, domicilio fiscal, distribución geográfica y cuál encaja mejor en tu cartera.`}
            </p>
          </header>

          {/* Alerta "mismo fondo" */}
          {sameFund && (
            <div className="rounded-lg bg-warn/10 border border-warn/30 px-4 py-3 text-sm text-warn mb-6">
              <strong>Aviso:</strong> {tickerA} y {tickerB} son el mismo fondo con un solapamiento del{' '}
              {formatPct(overlap, 0)}. Tenerlos juntos en cartera <strong>no añade diversificación</strong>.
            </div>
          )}

          {/* Tabla resumen */}
          <Card className="mb-6 overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface">
                    <th className="py-3 px-4 text-left text-xs uppercase tracking-wide text-fg-subtle font-medium w-1/3" />
                    <th className="py-3 px-4 text-center text-sm font-bold text-brand-400">{tickerA}</th>
                    <th className="py-3 px-4 text-center text-sm font-bold text-accent">{tickerB}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 text-sm text-fg-muted font-medium">Nombre</td>
                    <td className="py-3 px-4 text-xs text-center text-fg">{etfA.name}</td>
                    <td className="py-3 px-4 text-xs text-center text-fg">{etfB.name}</td>
                  </tr>
                  <ComparisonRow
                    label="ISIN"
                    valueA={etfA.isin ?? '—'}
                    valueB={etfB.isin ?? '—'}
                  />
                  <ComparisonRow
                    label="TER anual"
                    valueA={formatPct(etfA.ter / 100, 2)}
                    valueB={formatPct(etfB.ter / 100, 2)}
                    highlight={etfA.ter < etfB.ter ? 'a' : etfB.ter < etfA.ter ? 'b' : null}
                  />
                  <ComparisonRow
                    label="Clase de activo"
                    valueA={ASSET_CLASS_LABEL[etfA.assetClass] ?? etfA.assetClass}
                    valueB={ASSET_CLASS_LABEL[etfB.assetClass] ?? etfB.assetClass}
                  />
                  <ComparisonRow
                    label="Divisa base"
                    valueA={etfA.baseCurrency}
                    valueB={etfB.baseCurrency}
                  />
                  <ComparisonRow
                    label="Distribución"
                    valueA={etfA.accumulating ? 'Acumulación' : 'Distribución'}
                    valueB={etfB.accumulating ? 'Acumulación' : 'Distribución'}
                  />
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 text-sm text-fg-muted font-medium">Grado fiscal (España)</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center justify-center h-7 w-7 rounded-lg text-sm font-bold ${GRADE_STYLES[fiscalA.grade].bg} ${GRADE_STYLES[fiscalA.grade].color}`}>
                        {fiscalA.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center justify-center h-7 w-7 rounded-lg text-sm font-bold ${GRADE_STYLES[fiscalB.grade].bg} ${GRADE_STYLES[fiscalB.grade].color}`}>
                        {fiscalB.grade}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 text-sm text-fg-muted font-medium">Solapamiento</td>
                    <td colSpan={2} className={`py-3 px-4 text-sm text-center font-semibold ${overlapInfo.color}`}>
                      {formatPct(overlap, 0)} — {overlapInfo.text}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Distribución geográfica comparada */}
          <Card className="mb-6">
            <CardTitle className="mb-1">Distribución geográfica</CardTitle>
            <p className="text-xs text-fg-subtle mb-4">
              <span className="inline-block w-3 h-2 rounded bg-brand-500/60 mr-1 align-middle" />{tickerA}
              {'  '}
              <span className="inline-block w-3 h-2 rounded bg-accent/60 mr-1 align-middle ml-3" />{tickerB}
            </p>
            {(Object.keys(etfA.regionAllocation) as Region[]).map(region => (
              <RegionBar
                key={region}
                label={REGION_LABEL[region] ?? region}
                pctA={etfA.regionAllocation[region] ?? 0}
                pctB={etfB.regionAllocation[region] ?? 0}
              />
            ))}
          </Card>

          {/* ¿Cuál elegir? */}
          <Card className="mb-6">
            <CardTitle className="mb-4">¿Cuál elegir?</CardTitle>
            {sameFund ? (
              <div className="space-y-3 text-sm text-fg-muted leading-relaxed">
                <p>
                  Al ser el mismo fondo, la elección depende exclusivamente de dónde y cómo lo compras:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Si tu broker opera principalmente en <strong>Xetra</strong> (DEGIRO, Trade Republic),
                    elige el ticker que cotice en euros en Xetra para evitar conversión de divisa.
                  </li>
                  <li>
                    Si operas en <strong>LSE</strong> (Interactive Brokers, etc.), el ticker en GBP o USD
                    puede tener mayor liquidez y spread más estrecho.
                  </li>
                  <li>
                    Comprueba el <strong>spread de mercado</strong> en el momento de la compra — en ETFs muy
                    líquidos suele ser irrelevante ({`<`}0,05 %).
                  </li>
                </ul>
              </div>
            ) : (
              <div className="space-y-4 text-sm text-fg-muted leading-relaxed">
                {etfA.assetClass !== etfB.assetClass && (
                  <p>
                    <strong className="text-fg">Clases de activo distintas.</strong>{' '}
                    {tickerA} ({ASSET_CLASS_LABEL[etfA.assetClass]}) y {tickerB} ({ASSET_CLASS_LABEL[etfB.assetClass]})
                    son complementarios, no alternativos. Puedes tener ambos en una cartera diversificada.
                  </p>
                )}
                {terDiff >= 0.05 && (
                  <p>
                    <strong className="text-fg">El coste importa: elige {cheaperTicker}.</strong>{' '}
                    Una diferencia de {formatPct(terDiff / 100, 2)} anual parece pequeña, pero sobre 50.000 €
                    a 20 años con un 7 % de retorno supone aproximadamente{' '}
                    {Math.round(50000 * ((1.07 - terDiff / 100 / 2) ** 20 - 1.07 ** 20) * -1).toLocaleString('es-ES')} €
                    {' '}menos en cartera. Si el universo de inversión es similar, el más barato gana.
                  </p>
                )}
                {fiscalA.grade !== fiscalB.grade && (
                  <p>
                    <strong className="text-fg">Fiscalidad: ventaja para {fiscalA.grade < fiscalB.grade ? tickerA : tickerB}.</strong>{' '}
                    {fiscalA.grade < fiscalB.grade ? fiscalA.reason : fiscalB.reason}
                  </p>
                )}
                {overlap > 0.6 && etfA.assetClass === etfB.assetClass && (
                  <p>
                    <strong className="text-fg">Solapamiento alto ({formatPct(overlap, 0)}).</strong>{' '}
                    Tener ambos no añade diversificación real. Elige uno y mantente con él. La decisión
                    depende de si prefieres el índice de {tickerA} o el de {tickerB}.
                  </p>
                )}
                {overlap < 0.4 && etfA.assetClass === etfB.assetClass && (
                  <p>
                    <strong className="text-fg">Solapamiento bajo ({formatPct(overlap, 0)}).</strong>{' '}
                    Son complementarios dentro de la misma clase de activo. Combinarlos puede tener sentido
                    para una exposición más equilibrada.
                  </p>
                )}
              </div>
            )}
          </Card>

          {/* FAQ */}
          <Card className="mb-6">
            <CardTitle className="mb-4">Preguntas frecuentes</CardTitle>
            <div className="space-y-2">
              {faqItems.map((item, i) => (
                <details key={i} className="group rounded-lg border border-border bg-surface p-4">
                  <summary className="flex justify-between items-center cursor-pointer text-fg font-medium text-sm list-none">
                    {item.q}
                    <span className="text-fg-subtle group-open:rotate-45 transition-transform text-xl leading-none ml-4 flex-shrink-0">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </Card>

          {/* Links a ETF individuales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { etf: etfA, ticker: tickerA, fiscal: fiscalA },
              { etf: etfB, ticker: tickerB, fiscal: fiscalB },
            ].map(({ etf, ticker, fiscal }) => (
              <Link
                key={ticker}
                href={`/etf/${ticker.toLowerCase()}`}
                className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-brand-400">{ticker}</span>
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${GRADE_STYLES[fiscal.grade].bg} ${GRADE_STYLES[fiscal.grade].color}`}>
                    {fiscal.grade}
                  </span>
                </div>
                <p className="text-xs text-fg-muted line-clamp-2">{etf.name}</p>
                <p className="text-xs text-fg-subtle mt-1">TER {formatPct(etf.ter / 100, 2)} · Ver análisis completo →</p>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Tienes {tickerA} o {tickerB} en tu cartera? Analiza cómo afectan a tu diversificación real.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/analyzer"
                className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-500 transition-colors"
              >
                Analiza tu cartera gratis
              </Link>
              <Link
                href="/comparar"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Comparador interactivo
              </Link>
            </div>
          </Card>

          <p className="mt-6 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Los datos de composición son
            orientativos y pueden variar respecto a los publicados por el emisor.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
