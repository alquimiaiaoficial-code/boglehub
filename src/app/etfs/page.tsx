import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getAllEtfs } from '@/lib/etf-database'
import { ETF_THEMES } from '@/data/etf-themes'
import type { EtfMetadata } from '@/types/etf'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'ETFs UCITS por categoría en España (2026)',
  description:
    'Explora los ETFs UCITS disponibles en España organizados por categoría: MSCI World, S&P 500, acumulación, emergentes, renta fija y más. TER y grado fiscal.',
  alternates: {
    canonical: '/etfs',
    languages: { 'es-ES': '/etfs', 'en-US': '/en/etf-guide' },
  },
  openGraph: {
    title: 'ETFs UCITS por categoría en España (2026) | BogleHub',
    description:
      'Explora los ETFs UCITS disponibles en España organizados por categoría: MSCI World, S&P 500, acumulación, emergentes, renta fija y más.',
    locale: 'es_ES',
  },
}

// Filters mirrored from [tema]/page.tsx to compute live count per theme
const MSCI_WORLD_FILTER = (etf: EtfMetadata) =>
  etf.assetClass === 'EQUITY' &&
  (etf.regionAllocation.EM ?? 0) < 0.01 &&
  (etf.regionAllocation.JAPAN ?? 0) > 0.02 &&
  (etf.regionAllocation.US ?? 0) >= 0.55 &&
  (etf.regionAllocation.US ?? 0) < 0.85

const SP500_TICKERS = new Set(['CSPX', 'SXR8', 'VUSA', 'IUSA', 'VUAA', 'SPXS'])

const ALL_WORLD_FILTER = (etf: EtfMetadata) =>
  etf.assetClass === 'EQUITY' &&
  (etf.regionAllocation.EM ?? 0) > 0.05 &&
  (etf.regionAllocation.US ?? 0) >= 0.40 &&
  (etf.regionAllocation.US ?? 0) < 0.80 &&
  (etf.regionAllocation.EUROPE ?? 0) > 0.05

const NASDAQ_100_TICKERS = new Set(['EQQQ', 'SXRV', 'CNDX'])
const SMALL_CAPS_TICKERS = new Set(['WSML', 'IUSN', 'ZPRS', 'ZPRV'])
const GOLD_TICKERS = new Set(['SGLN', 'IGLN', '4GLD'])
const QUALITY_MOMENTUM_TICKERS = new Set(['IWQU', 'IWMO', 'XDEQ', 'XDWL'])

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
  'nasdaq-100': (etf) => NASDAQ_100_TICKERS.has(etf.ticker),
  'small-caps': (etf) => SMALL_CAPS_TICKERS.has(etf.ticker),
  'oro': (etf) => GOLD_TICKERS.has(etf.ticker),
  'factor-calidad-momentum': (etf) => QUALITY_MOMENTUM_TICKERS.has(etf.ticker),
}

export default function EtfsIndexPage() {
  const allEtfs = getAllEtfs()

  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'ETFs por categoría', url: `${BASE_URL}/etfs` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'CollectionPage',
          name: 'ETFs UCITS por categoría para inversores españoles',
          description: `Explora ${allEtfs.length} ETFs UCITS organizados en ${ETF_THEMES.length} categorías temáticas: MSCI World, S&P 500, All-World, acumulación, distribución, emergentes, Europa, renta fija, materias primas, Nasdaq 100, small caps, oro físico y factor calidad/momentum.`,
          url: `${BASE_URL}/etfs`,
          hasPart: ETF_THEMES.map(t => ({
            name: t.h1,
            url: `${BASE_URL}/etfs/${t.slug}`,
          })),
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">ETFs por categoría</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">
              ETFs UCITS disponibles en España por categoría
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed max-w-2xl">
              Explora los {allEtfs.length} ETFs de nuestra base de datos organizados por tipo de
              activo, índice de referencia y política de dividendos. Cada categoría incluye
              comparativa de TER, domicilio fiscal y recomendaciones para inversores residentes en
              España.
            </p>
          </header>

          {/* Theme grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {ETF_THEMES.map((theme) => {
              const filterFn = THEME_FILTERS[theme.slug]
              const count = filterFn ? allEtfs.filter(filterFn).length : 0
              // Short label: strip year suffix and leading superlatives
              const shortLabel = theme.h1
                .replace(/\s*\(2026\)\s*$/, '')
                .replace(/^Los mejores\s+/i, '')
                .replace(/^Mejores\s+/i, '')
                .replace(/^ETFs de\s+/i, '')
                .replace(/^ETFs\s+/i, '')
                .split(':')[0]

              return (
                <Link
                  key={theme.slug}
                  href={`/etfs/${theme.slug}`}
                  className="flex flex-col rounded-xl border border-border bg-surface p-5 hover:border-border-strong transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="text-base font-semibold text-fg leading-snug">{shortLabel}</h2>
                    <span className="shrink-0 rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-mono text-brand-400">
                      {count} ETFs
                    </span>
                  </div>
                  <p className="text-xs text-fg-muted line-clamp-3 leading-relaxed">
                    {theme.metaDescription}
                  </p>
                  <span className="mt-3 text-xs font-medium text-brand-400 group-hover:text-brand-300">
                    Ver categoría →
                  </span>
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Buscas un ETF específico o quieres comparar dos fondos?
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
                Analizar mi cartera
              </Link>
            </div>
          </Card>

          <p className="mt-6 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Los datos son orientativos; verifica
            siempre el folleto del fondo.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
