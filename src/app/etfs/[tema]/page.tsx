import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getAllEtfs } from '@/lib/etf-database'
import { computeFiscalGrade, GRADE_STYLES } from '@/lib/fiscal'
import { formatPct } from '@/lib/utils'
import { ETF_THEMES, getThemeBySlug } from '@/data/etf-themes'
import type { EtfMetadata } from '@/types/etf'

const BASE_URL = 'https://boglehub.vercel.app'

// ---------------------------------------------------------------------------
// Filter functions keyed by slug — keep in sync with ETF_THEMES slugs
// ---------------------------------------------------------------------------
const MSCI_WORLD_FILTER = (etf: EtfMetadata) =>
  etf.assetClass === 'EQUITY' &&
  (etf.regionAllocation.EM ?? 0) < 0.01 &&
  (etf.regionAllocation.JAPAN ?? 0) > 0.02 &&
  (etf.regionAllocation.US ?? 0) >= 0.55 &&
  (etf.regionAllocation.US ?? 0) < 0.85

const SP500_TICKERS = new Set(['CSPX', 'SXR8', 'VUSA', 'IUSA', 'VUAA', 'SPXS'])

// All-World: global equity including EM (VWCE-like: US ~60-65%, EM ~12%)
const ALL_WORLD_FILTER = (etf: EtfMetadata) =>
  etf.assetClass === 'EQUITY' &&
  (etf.regionAllocation.EM ?? 0) > 0.05 &&
  (etf.regionAllocation.US ?? 0) >= 0.40 &&
  (etf.regionAllocation.US ?? 0) < 0.80 &&
  (etf.regionAllocation.EUROPE ?? 0) > 0.05

const THEME_FILTERS: Record<string, (etf: EtfMetadata) => boolean> = {
  'msci-world': MSCI_WORLD_FILTER,
  'sp500': (etf) => SP500_TICKERS.has(etf.ticker),
  'todo-mundo': ALL_WORLD_FILTER,
  'acumulacion': (etf) => etf.accumulating,
  'distribucion': (etf) => !etf.accumulating,
  'emergentes': (etf) =>
    etf.assetClass === 'EQUITY' &&
    ((etf.regionAllocation.EM ?? 0) + (etf.regionAllocation.CHINA ?? 0)) > 0.5,
  'europa': (etf) =>
    etf.assetClass === 'EQUITY' && (etf.regionAllocation.EUROPE ?? 0) >= 0.5,
  'renta-fija': (etf) => etf.assetClass === 'BOND',
  'materias-primas': (etf) => etf.assetClass === 'COMMODITY',
}

// ---------------------------------------------------------------------------
// Static params + metadata
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return ETF_THEMES.map((t) => ({ tema: t.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tema: string }>
}): Promise<Metadata> {
  const { tema } = await params
  const theme = getThemeBySlug(tema)
  if (!theme) return { title: 'Categoría no encontrada' }

  return {
    title: theme.metaTitle,
    description: theme.metaDescription,
    openGraph: {
      title: theme.metaTitle,
      description: theme.metaDescription,
      locale: 'es_ES',
      images: [
        `/api/og?title=${encodeURIComponent(tema)}&subtitle=${encodeURIComponent('ETFs por categoría')}`,
      ],
    },
  }
}

// ---------------------------------------------------------------------------
// ETF card component
// ---------------------------------------------------------------------------
function EtfCard({ etf }: { etf: EtfMetadata }) {
  const fiscal = computeFiscalGrade(etf.isin, etf.accumulating)
  const fiscalStyle = GRADE_STYLES[fiscal.grade]

  return (
    <Link
      href={`/etf/${etf.ticker.toLowerCase()}`}
      className="flex flex-col rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors gap-2"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="font-mono font-bold text-brand-400 text-lg">{etf.ticker}</span>
          <p className="text-xs text-fg-muted mt-0.5 line-clamp-2 leading-snug">{etf.name}</p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-lg text-sm font-bold ${fiscalStyle.bg} ${fiscalStyle.color}`}
          title={`Grado fiscal: ${fiscal.grade} — ${fiscal.domicileLabel}`}
        >
          {fiscal.grade}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-fg-muted font-mono">
          TER {formatPct(etf.ter / 100, 2)}
        </span>
        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-fg-muted">
          {etf.accumulating ? 'Acumulación' : 'Distribución'}
        </span>
        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-fg-muted">
          {etf.baseCurrency}
        </span>
      </div>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function EtfThemePage({
  params,
}: {
  params: Promise<{ tema: string }>
}) {
  const { tema } = await params
  const theme = getThemeBySlug(tema)
  if (!theme) notFound()

  const filterFn = THEME_FILTERS[tema]
  if (!filterFn) notFound()

  const etfs = getAllEtfs()
    .filter(filterFn)
    .sort((a, b) => a.ter - b.ter)

  const pageUrl = `${BASE_URL}/etfs/${tema}`

  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'ETFs por categoría', url: `${BASE_URL}/etfs` },
            { name: theme.h1, url: pageUrl },
          ],
        }}
      />
      {theme.faq.length > 0 && (
        <JsonLd
          schema={{
            type: 'FAQPage',
            questions: theme.faq.map(({ q, a }) => ({ q, a })),
          }}
        />
      )}

      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/etfs" className="hover:text-fg transition-colors">ETFs</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{theme.h1}</span>
          </nav>

          {/* Header */}
          <header className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight leading-tight">
              {theme.h1}
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed max-w-2xl">
              {theme.intro}
            </p>
          </header>

          {/* ETF list */}
          <section aria-labelledby="etf-list-heading" className="mb-10">
            <h2 id="etf-list-heading" className="text-lg font-semibold text-fg mb-4">
              {theme.listH2}
              <span className="ml-2 text-sm font-normal text-fg-subtle">
                ({etfs.length} ETFs, ordenados por TER)
              </span>
            </h2>
            {etfs.length === 0 ? (
              <p className="text-fg-subtle text-sm">
                No se encontraron ETFs en esta categoría. Prueba el{' '}
                <Link href="/comparar" className="text-brand-400 hover:text-brand-300 underline-offset-4 hover:underline">
                  comparador
                </Link>
                .
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {etfs.map((etf) => (
                  <EtfCard key={etf.ticker} etf={etf} />
                ))}
              </div>
            )}
          </section>

          {/* Nota aclaratoria */}
          {theme.note && (
            <p className="mb-8 text-xs text-fg-subtle bg-surface-2 rounded-lg px-4 py-3 border border-border">
              ℹ️ {theme.note}
            </p>
          )}

          {/* FAQ */}
          {theme.faq.length > 0 && (
            <section aria-labelledby="faq-heading" className="mb-10">
              <h2 id="faq-heading" className="text-lg font-semibold text-fg mb-4">
                Preguntas frecuentes
              </h2>
              <div className="space-y-3">
                {theme.faq.map(({ q, a }) => (
                  <details
                    key={q}
                    className="group rounded-xl border border-border bg-surface px-5 py-4 cursor-pointer"
                  >
                    <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none select-none">
                      {q}
                      <span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">
                        ▾
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTAs */}
          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Quieres comparar ETFs de esta categoría en detalle?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/comparar"
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 transition-colors"
              >
                Comparador de ETFs
              </Link>
              <Link
                href="/analyzer"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Analizador de cartera
              </Link>
              <Link
                href="/chat"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Chat IA
              </Link>
            </div>
          </Card>

          {/* Otras categorías */}
          <section className="mt-8" aria-labelledby="other-themes-heading">
            <h2 id="other-themes-heading" className="text-sm font-semibold text-fg-muted uppercase tracking-wide mb-3">
              Otras categorías de ETFs
            </h2>
            <div className="flex flex-wrap gap-2">
              {ETF_THEMES.filter((t) => t.slug !== tema).map((t) => (
                <Link
                  key={t.slug}
                  href={`/etfs/${t.slug}`}
                  className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
                >
                  {t.h1.replace(/\s*\(2026\)\s*$/, '').split(':')[0].replace(/^Los mejores\s+/i, '').replace(/^Mejores\s+/i, '')}
                </Link>
              ))}
            </div>
          </section>

          <p className="mt-6 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. El grado fiscal refleja la
            eficiencia estimada para un inversor residente en España según el domicilio del ETF y
            su política de reparto. Los datos de TER son orientativos; verifica siempre con el
            folleto del fondo o en JustETF.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
