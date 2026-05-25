import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getEtfByTicker } from '@/lib/etf-database'
import {
  YEAR_EVENTS,
  HISTORICAL_YEAR_TICKERS,
  getYearEvent,
  getReturn,
} from '@/data/historical-years'

const BASE_URL = 'https://boglehub.com'

function formatPct(n: number): string {
  return `${n >= 0 ? '+' : ''}${(n * 100).toFixed(1)}%`
}

export function generateStaticParams() {
  const params: { ano: string; ticker: string }[] = []
  for (const event of YEAR_EVENTS) {
    for (const ticker of HISTORICAL_YEAR_TICKERS) {
      if (getReturn(event.year, ticker) !== null) {
        params.push({ ano: event.year.toString(), ticker: ticker.toLowerCase() })
      }
    }
  }
  return params
}
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ano: string; ticker: string }>
}): Promise<Metadata> {
  const { ano, ticker } = await params
  const year = parseInt(ano)
  const etf = getEtfByTicker(ticker)
  const event = getYearEvent(year)
  const ret = getReturn(year, etf?.ticker ?? '')
  if (!etf || !event || ret == null) return { title: 'No encontrado' }

  return {
    title: `${etf.ticker} en ${year}: rendimiento ${formatPct(ret)} y qué pasó`,
    description: `${etf.name} (${etf.ticker}) rindió ${formatPct(ret)} en ${year}. Análisis del año: ${event.summary.substring(0, 150)}...`,
    openGraph: { locale: 'es_ES', images: [`/api/og?title=${encodeURIComponent(`${etf.ticker} en ${year}`)}&subtitle=${encodeURIComponent(formatPct(ret))}`] },
    alternates: { canonical: `/historico/${ano}/${ticker}` },
  }
}

export default async function HistoricoPage({
  params,
}: {
  params: Promise<{ ano: string; ticker: string }>
}) {
  const { ano, ticker } = await params
  const year = parseInt(ano)
  const etf = getEtfByTicker(ticker)
  const event = getYearEvent(year)
  const ret = getReturn(year, etf?.ticker ?? '')
  if (!etf || !event || ret == null) notFound()

  const pageUrl = `${BASE_URL}/historico/${ano}/${ticker}`
  const colorByType: Record<string, string> = {
    alcista: 'text-accent',
    bajista: 'text-danger',
    lateral: 'text-fg-muted',
    crisis: 'text-warn',
  }

  const faqs = [
    {
      q: `¿Cuánto rindió ${etf.ticker} en ${year}?`,
      a: `${etf.ticker} (${etf.name}) tuvo un rendimiento aproximado del ${formatPct(ret)} en ${year}. ${event.summary}`,
    },
    {
      q: `¿Qué pasó en los mercados en ${year}?`,
      a: `${year} fue un año ${event.marketType} en los mercados. ${event.summary} Eventos principales: ${event.keyEvents.slice(0, 2).join('; ')}.`,
    },
    {
      q: `¿Si hubiera invertido en ${etf.ticker} a principio de ${year}, cuánto habría ganado?`,
      a: `Invirtiendo 10.000€ en ${etf.ticker} a principios de ${year} habrías terminado el año con aproximadamente ${formatPct(ret)} más/menos: ${ret >= 0 ? `${(10000 * (1 + ret)).toFixed(0)}€ aproximadamente, ganancia de ${(10000 * ret).toFixed(0)}€` : `${(10000 * (1 + ret)).toFixed(0)}€ aproximadamente, pérdida de ${Math.abs(10000 * ret).toFixed(0)}€`}.`,
    },
    {
      q: `¿Fue ${year} un buen año para ${etf.ticker}?`,
      a: ret >= 0.10 ? `Sí, ${year} fue un excelente año para ${etf.ticker} con rendimiento del ${formatPct(ret)}, claramente por encima de la media histórica del 7-10%.` :
         ret >= 0.05 ? `Sí, ${year} fue un buen año para ${etf.ticker} con rendimiento positivo del ${formatPct(ret)}.` :
         ret >= 0 ? `${year} fue un año modesto para ${etf.ticker}, con rendimiento positivo pero por debajo de la media histórica del 7-10%.` :
         ret >= -0.10 ? `${year} fue un año negativo para ${etf.ticker}, con caída del ${formatPct(ret)}. Caídas similares han sido históricamente normales y se han recuperado en 1-3 años.` :
         `${year} fue un año muy difícil para ${etf.ticker}, con caída del ${formatPct(ret)}. ${event.summary}`,
    },
  ]

  // Otros años y tickers
  const otherYears = YEAR_EVENTS.filter((y) => y.year !== year).slice(0, 4)
  const otherTickers = HISTORICAL_YEAR_TICKERS.filter((t) => t !== etf.ticker).slice(0, 6)

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [
        { name: 'Inicio', url: BASE_URL },
        { name: 'Histórico', url: `${BASE_URL}/historico` },
        { name: `${etf.ticker} ${year}`, url: pageUrl },
      ]}} />
      <JsonLd schema={{ type: 'Article', headline: `${etf.ticker} en ${year}`, description: event.summary, url: pageUrl, datePublished: `${year + 1}-01-01`, dateModified: '2026-05-24', articleSection: 'Histórico mercado' }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/historico" className="hover:text-fg">Histórico</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{etf.ticker} en {year}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              {etf.ticker} en {year}: rendimiento y análisis
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Análisis detallado del rendimiento de {etf.name} en {year}, contexto de mercado y eventos principales.
            </p>
          </header>

          {/* Resultado */}
          <Card className="mb-8 bg-accent-dim border-accent/30">
            <p className="text-xs uppercase tracking-wide text-fg-muted mb-2">Rendimiento {year}</p>
            <div className={`text-5xl font-bold ${ret >= 0 ? 'text-accent' : 'text-danger'}`}>{formatPct(ret)}</div>
            <p className="mt-3 text-sm text-fg leading-relaxed">
              Mercado <span className={`font-semibold ${colorByType[event.marketType]}`}>{event.marketType}</span>. {event.summary}
            </p>
          </Card>

          {/* Eventos clave */}
          <Card className="mb-8">
            <CardTitle className="mb-4">Eventos principales de {year}</CardTitle>
            <ul className="space-y-2 text-sm text-fg-muted">
              {event.keyEvents.map((e) => (
                <li key={e} className="flex gap-2">
                  <span className="text-accent shrink-0">•</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Tabla comparativa ETFs en mismo año */}
          <Card className="mb-8">
            <CardTitle className="mb-4">Otros ETFs en {year}</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-fg-muted">
                    <th className="pb-2">ETF</th>
                    <th className="pb-2 text-right">Rendimiento {year}</th>
                  </tr>
                </thead>
                <tbody>
                  {HISTORICAL_YEAR_TICKERS.map((t) => {
                    const r = getReturn(year, t)
                    if (r == null) return null
                    return (
                      <tr key={t} className={`border-b border-border/50 last:border-0 ${t === etf.ticker ? 'bg-surface-2' : ''}`}>
                        <td className="py-2.5 font-mono font-medium text-fg">{t}</td>
                        <td className={`py-2.5 text-right font-semibold ${r >= 0 ? 'text-accent' : 'text-danger'}`}>{formatPct(r)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

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

          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardTitle className="mb-3">Otros años de {etf.ticker}</CardTitle>
              <div className="flex flex-wrap gap-2">
                {otherYears.map((y) => (
                  <Link key={y.year} href={`/historico/${y.year}/${ticker}`} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-brand-400 hover:text-brand-300">
                    {y.year}
                  </Link>
                ))}
              </div>
            </Card>
            <Card>
              <CardTitle className="mb-3">Otros ETFs en {year}</CardTitle>
              <div className="flex flex-wrap gap-2">
                {otherTickers.map((t) => getReturn(year, t) != null && (
                  <Link key={t} href={`/historico/${ano}/${t.toLowerCase()}`} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-brand-400 hover:text-brand-300">
                    {t}
                  </Link>
                ))}
              </div>
            </Card>
          </section>

          <Card className="text-center">
            <Link href={`/etf/${etf.ticker.toLowerCase()}`} className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">
              Ficha completa {etf.ticker}
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">Rendimientos aproximados basados en datos públicos. Información educativa.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
