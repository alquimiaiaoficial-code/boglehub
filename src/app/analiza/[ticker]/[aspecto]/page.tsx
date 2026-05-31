import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getEtfByTicker } from '@/lib/etf-database'
import { computeFiscalGrade } from '@/lib/fiscal'
import { formatPct } from '@/lib/utils'
import { POPULAR_ETF_TICKERS } from '@/data/etf-broker-availability'
import { ETF_ASPECTS, getAspectBySlug } from '@/data/etf-aspects'
import { BROKERS } from '@/data/brokers'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  const params: { ticker: string; aspecto: string }[] = []
  for (const ticker of POPULAR_ETF_TICKERS) {
    for (const aspect of ETF_ASPECTS) {
      params.push({ ticker: ticker.toLowerCase(), aspecto: aspect.slug })
    }
  }
  return params
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string; aspecto: string }>
}): Promise<Metadata> {
  const { ticker, aspecto } = await params
  const etf = getEtfByTicker(ticker)
  const aspect = getAspectBySlug(aspecto)
  if (!etf || !aspect) return { title: 'No encontrado' }

  return {
    title: `${aspect.questionTemplate(etf.ticker)} (2026)`,
    description: aspect.descriptionTemplate(etf.ticker, etf.name),
    openGraph: {
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(`${etf.ticker} - ${aspect.label}`)}&subtitle=${encodeURIComponent('An%C3%A1lisis%20detallado')}`],
    },
    alternates: { canonical: `/analiza/${ticker}/${aspecto}` },
  }
}

export default async function AnalizaPage({
  params,
}: {
  params: Promise<{ ticker: string; aspecto: string }>
}) {
  const { ticker, aspecto } = await params
  const etf = getEtfByTicker(ticker)
  const aspect = getAspectBySlug(aspecto)
  if (!etf || !aspect) notFound()

  const fiscal = computeFiscalGrade(etf.isin, etf.accumulating)
  const pageUrl = `${BASE_URL}/analiza/${ticker}/${aspecto}`
  const otherAspects = ETF_ASPECTS.filter((a) => a.slug !== aspecto)

  // Contenido específico por aspecto
  let mainContent: { heading: string; paragraphs: string[]; list?: string[] }[] = []
  let faqs: { q: string; a: string }[] = []

  if (aspecto === 'fiscalidad') {
    mainContent = [
      {
        heading: `Domicilio fiscal de ${etf.ticker}`,
        paragraphs: [
          `${etf.ticker} (${etf.name}) está domiciliado en ${fiscal.domicileLabel} (ISIN ${etf.isin}). El domicilio del ETF determina las retenciones que se aplican sobre los dividendos de las empresas en cartera.`,
          `Grado fiscal estimado para residentes en España: ${fiscal.grade}. ${fiscal.reason}`,
        ],
      },
      {
        heading: `Política de reparto de ${etf.ticker}`,
        paragraphs: [
          `${etf.ticker} es un ETF de ${etf.accumulating ? 'acumulación' : 'distribución'}. ${etf.accumulating ? 'Los dividendos se reinvierten automáticamente dentro del fondo, sin generar evento fiscal para el inversor hasta que venda participaciones.' : 'Los dividendos se reparten periódicamente al partícipe, tributando como rendimientos del capital mobiliario en el IRPF del ahorro (19-28% según importe) en el año en que se cobran.'}`,
        ],
      },
      {
        heading: `Tributación al vender ${etf.ticker} en España`,
        paragraphs: [
          `La ganancia o pérdida al vender ${etf.ticker} tributa en la base del ahorro del IRPF con escala progresiva: 19% hasta 6.000€, 21% hasta 50.000€, 23% hasta 200.000€, 27% hasta 300.000€ y 28% por encima.`,
          `Se aplica el criterio FIFO (First In, First Out) si has comprado ${etf.ticker} en varias fechas: Hacienda considera vendidas primero las participaciones más antiguas.`,
        ],
      },
    ]
    faqs = [
      {
        q: `¿Es ${etf.ticker} fiscalmente eficiente para inversores en España?`,
        a: `Sí. ${etf.ticker} tiene grado fiscal ${fiscal.grade} para residentes en España. ${fiscal.reason} El TER del 0,${(etf.ter * 100).toFixed(0)}% no incluye implicaciones fiscales, que son aparte y se aplican al vender.`,
      },
      {
        q: `¿Tributan los dividendos de ${etf.ticker}?`,
        a: etf.accumulating
          ? `${etf.ticker} es un ETF de acumulación: los dividendos NO se reparten al inversor, se reinvierten dentro del fondo. Por tanto NO tributan hasta que vendas participaciones.`
          : `${etf.ticker} es un ETF de distribución: los dividendos se reparten periódicamente y tributan como rendimientos del capital mobiliario en el IRPF del ahorro (19-28% según importe).`,
      },
    ]
  } else if (aspecto === 'alternativas') {
    mainContent = [
      {
        heading: `Por qué buscar alternativas a ${etf.ticker}`,
        paragraphs: [
          `${etf.ticker} (${etf.name}) tiene un TER del ${formatPct(etf.ter / 100, 2)} anual y está domiciliado en ${fiscal.domicileLabel}. Las alternativas pueden ser interesantes por menor TER, distinta política de reparto o mejor disponibilidad en tu broker.`,
        ],
      },
      {
        heading: `Cómo elegir entre alternativas`,
        paragraphs: [
          `Para elegir entre ETFs con exposición similar a ${etf.ticker}, los criterios principales son: (1) TER más bajo para reducir coste a largo plazo, (2) política de reparto (acumulación vs distribución) según tu fase de inversión, (3) domicilio fiscal del ETF (Irlanda > Luxemburgo para inversor español), (4) disponibilidad en tu broker, (5) liquidez y patrimonio gestionado del ETF.`,
        ],
      },
    ]
    faqs = [
      {
        q: `¿Hay alternativas más baratas a ${etf.ticker}?`,
        a: `Depende de su categoría. Para MSCI World, SWRD tiene TER 0,12% (vs 0,20% de IWDA, 0,19% de VWCE). Para S&P 500, SPXS tiene TER 0,03% (vs 0,07% de CSPX). Compara siempre TER y tracking difference real, no solo el TER nominal.`,
      },
      {
        q: `¿Vale la pena cambiar de ${etf.ticker} a una alternativa más barata?`,
        a: `Solo si la diferencia de TER justifica el coste fiscal de vender. Recuerda que vender ${etf.ticker} para comprar otro ETF realiza la ganancia y tributa en el IRPF. Para fondos indexados (no ETFs) el traspaso es libre y siempre vale la pena pasar a uno más eficiente.`,
      },
    ]
  } else if (aspecto === 'para-fire') {
    mainContent = [
      {
        heading: `${etf.ticker} en una cartera FIRE`,
        paragraphs: [
          `${etf.ticker} (${etf.name}) ${etf.accumulating ? 'es ideal para la fase de acumulación FIRE' : 'puede ser útil en la fase de retirada FIRE para generar dividendos sin vender participaciones'} por sus características: ${etf.accumulating ? 'acumulación (sin tributación intermedia de dividendos) y' : ''} domicilio en ${fiscal.domicileLabel} (grado fiscal ${fiscal.grade}).`,
          `El TER del ${formatPct(etf.ter / 100, 2)} es ${etf.ter < 0.20 ? 'muy competitivo' : etf.ter < 0.30 ? 'aceptable' : 'algo alto'} para una cartera FIRE de largo plazo donde cada décima de coste anual se acumula durante décadas.`,
        ],
      },
      {
        heading: 'Peso recomendado según fase FIRE',
        paragraphs: [],
        list: [
          'Fase acumulación (lejos del FIRE): 70-90% en ETFs como VWCE o IWDA, 10-30% renta fija',
          'Cerca del FIRE (5-10 años): glide path progresivo a 60/40 para reducir riesgo de secuencia',
          'En FIRE / retirada: 50-60% renta variable + 30-40% renta fija + colchón liquidez 2 años',
        ],
      },
    ]
    faqs = [
      {
        q: `¿Es ${etf.ticker} suficiente como única posición de renta variable en una cartera FIRE?`,
        a: `${etf.ticker} ${(etf.regionAllocation?.EM ?? 0) > 0.05 ? 'incluye mercados emergentes en su composición, por lo que sí puede funcionar como única posición de renta variable global' : 'cubre solo mercados desarrollados — para una cartera FIRE completa, complementarlo con un ETF de emergentes (EIMI, ~12%) mejora la diversificación geográfica'}.`,
      },
      {
        q: `¿Cuánto capital necesito en ${etf.ticker} para FIRE en España?`,
        a: `Con la regla del 4%, necesitas 25 veces tu gasto anual. Para 24.000€/año (2.000€/mes), 600.000€. La pensión pública española reduce el capital necesario significativamente: si esperas pensión de 1.500€/mes, necesitas que la cartera cubra solo la diferencia.`,
      },
    ]
  } else if (aspecto === 'donde-comprar') {
    mainContent = [
      {
        heading: `Brokers donde comprar ${etf.ticker} en España`,
        paragraphs: [
          `${etf.ticker} (ISIN ${etf.isin}) está disponible en los principales brokers usados por inversores indexados en España. La elección depende del coste por operación, la disponibilidad de planes de ahorro automáticos y tu volumen mensual de aportación.`,
        ],
      },
    ]
    faqs = [
      {
        q: `¿Cuál es el broker más barato para comprar ${etf.ticker}?`,
        a: `Para aportaciones mensuales pequeñas, Trade Republic (0€ por operación con planes de ahorro automáticos desde 1€) es la opción más barata. Para órdenes grandes, las diferencias entre brokers son marginales.`,
      },
      {
        q: `¿Puedo comprar ${etf.ticker} en MyInvestor?`,
        a: `Sí, MyInvestor permite comprar ${etf.ticker} con comisión de 0,20€ + 0,03% del importe. MyInvestor también ofrece fondos indexados con traspaso fiscal libre — si la versión fondo de tu índice existe, puede ser más eficiente fiscalmente que el ETF para inversor a muy largo plazo.`,
      },
    ]
  }

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Analiza', url: `${BASE_URL}/etf/${etf.ticker.toLowerCase()}` },
            { name: etf.ticker, url: `${BASE_URL}/etf/${etf.ticker.toLowerCase()}` },
            { name: aspect.label, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: aspect.questionTemplate(etf.ticker),
          description: aspect.descriptionTemplate(etf.ticker, etf.name),
          url: pageUrl,
          datePublished: '2026-05-24',
          articleSection: `Análisis ETF — ${aspect.label}`,
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
            <span className="text-fg">{aspect.label}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              {aspect.questionTemplate(etf.ticker)}
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              {aspect.descriptionTemplate(etf.ticker, etf.name)}
            </p>
          </header>

          {/* Mini ficha */}
          <Card className="mb-8">
            <CardTitle className="mb-3">{etf.ticker} en breve</CardTitle>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div><dt className="text-xs uppercase text-fg-muted">ISIN</dt><dd className="font-mono text-fg">{etf.isin}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">TER</dt><dd className="text-fg">{formatPct(etf.ter / 100, 2)}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Política</dt><dd className="text-fg">{etf.accumulating ? 'Acumulación' : 'Distribución'}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Grado fiscal</dt><dd className="text-fg">{fiscal.grade} ({fiscal.domicileLabel})</dd></div>
            </dl>
          </Card>

          {/* Contenido principal */}
          {mainContent.map((section, i) => (
            <section key={i} className="mb-8">
              <h2 className="text-xl font-bold text-fg mb-3">{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-fg-muted leading-relaxed mb-3">{p}</p>
              ))}
              {section.list && (
                <ul className="space-y-2 text-fg-muted">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-accent shrink-0">•</span><span>{item}</span></li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Brokers (solo para donde-comprar) */}
          {aspecto === 'donde-comprar' && (
            <section className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BROKERS.slice(0, 4).map((b) => (
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
            <h2 className="text-lg font-bold text-fg mb-3">Otros análisis de {etf.ticker}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherAspects.map((a) => (
                <Link
                  key={a.slug}
                  href={`/analiza/${etf.ticker.toLowerCase()}/${a.slug}`}
                  className="rounded-xl border border-border bg-surface p-3 hover:border-border-strong transition-colors"
                >
                  <div className="text-sm font-semibold text-fg">{a.label}</div>
                </Link>
              ))}
            </div>
          </section>

          <Card className="text-center">
            <Link href={`/etf/${etf.ticker.toLowerCase()}`} className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Ficha completa {etf.ticker}
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Última revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
