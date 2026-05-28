import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { getAllEtfs } from '@/lib/etf-database'
import { computeFiscalGrade, GRADE_STYLES } from '@/lib/fiscal'
import { formatPct } from '@/lib/utils'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Catálogo de ETFs UCITS en España (2026)',
  description:
    'Catálogo completo de ETFs UCITS disponibles en España: renta variable global, S&P 500, MSCI World, emergentes, renta fija y materias primas. TER, domicilio fiscal y eficiencia para residentes en España.',
  alternates: { canonical: '/etf' },
  openGraph: {
    title: 'Catálogo de ETFs UCITS en España (2026) | BogleHub',
    description:
      'Catálogo completo de ETFs UCITS disponibles en España con TER, grado fiscal y distribución geográfica. Datos para inversores indexados residentes en España.',
    locale: 'es_ES',
  },
}

const ASSET_CLASS_LABEL: Record<string, string> = {
  EQUITY: 'Renta variable',
  BOND: 'Renta fija',
  COMMODITY: 'Materias primas',
  REIT: 'Inmobiliario',
  CASH: 'Liquidez',
  MIXED: 'Mixto',
}

const ASSET_CLASS_ORDER = ['EQUITY', 'BOND', 'COMMODITY', 'REIT', 'MIXED', 'CASH']

export default function EtfIndexPage() {
  const allEtfs = getAllEtfs()

  // Group by asset class, sorted by TER within each group
  const byClass = ASSET_CLASS_ORDER.map((cls) => ({
    cls,
    label: ASSET_CLASS_LABEL[cls] ?? cls,
    etfs: allEtfs
      .filter((e) => e.assetClass === cls)
      .sort((a, b) => a.ter - b.ter),
  })).filter((g) => g.etfs.length > 0)

  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Catálogo ETF', url: `${BASE_URL}/etf` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Dataset',
          name: 'Catálogo de ETFs UCITS para inversores españoles (BogleHub)',
          description: `Conjunto de datos de ${allEtfs.length} ETFs UCITS disponibles para inversores residentes en España, incluyendo ticker, ISIN, TER, clase de activo, política de reparto (acumulación / distribución), distribución geográfica, distribución sectorial y grado fiscal estimado para residentes en España.`,
          url: `${BASE_URL}/etf`,
          keywords: [
            'ETFs UCITS',
            'inversores españoles',
            'TER',
            'ISIN',
            'distribución geográfica',
            'grado fiscal',
            'fondos indexados',
          ],
          variableMeasured: [
            'TER (Total Expense Ratio) anual',
            'Domicilio fiscal',
            'Política de reparto (acumulación / distribución)',
            'Distribución geográfica',
            'Distribución sectorial',
            'Grado fiscal estimado (A/B/C/D) para residentes en España',
            'Divisa base',
            'Clase de activo (renta variable, renta fija, materias primas, REIT)',
          ],
          license: 'Información educativa con uso libre con atribución',
        }}
      />
      <JsonLd
        schema={{
          type: 'CollectionPage',
          name: 'Catálogo de ETFs UCITS para inversores españoles',
          description: `${allEtfs.length} ETFs UCITS analizados con TER, domicilio fiscal, distribución geográfica y grado de eficiencia fiscal para residentes en España.`,
          url: `${BASE_URL}/etf`,
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Catálogo ETF</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">
              Catálogo de ETFs UCITS para inversores españoles (2026)
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed max-w-2xl">
              {allEtfs.length} ETFs UCITS ordenados por clase de activo y TER. Cada ficha incluye
              domicilio fiscal, grado de eficiencia para residentes en España, distribución
              geográfica y sectorial. Haz clic en cualquier ticker para ver el análisis completo.
            </p>
            {/* Quick links to categories */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: 'MSCI World', href: '/etfs/msci-world' },
                { label: 'S&P 500', href: '/etfs/sp500' },
                { label: 'All-World', href: '/etfs/todo-mundo' },
                { label: 'Emergentes', href: '/etfs/emergentes' },
                { label: 'Europa', href: '/etfs/europa' },
                { label: 'Renta fija', href: '/etfs/renta-fija' },
                { label: 'Acumulación', href: '/etfs/acumulacion' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </header>

          {/* ETF groups */}
          {byClass.map(({ cls, label, etfs }) => (
            <section key={cls} className="mb-10" aria-labelledby={`group-${cls}`}>
              <h2
                id={`group-${cls}`}
                className="text-lg font-semibold text-fg mb-4 flex items-center gap-2"
              >
                {label}
                <span className="text-sm font-normal text-fg-subtle">({etfs.length})</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs text-fg-muted uppercase tracking-wide">
                      <th className="pb-2 text-left font-medium">Ticker</th>
                      <th className="pb-2 text-left font-medium hidden sm:table-cell">Nombre</th>
                      <th className="pb-2 text-right font-medium">TER</th>
                      <th className="pb-2 text-center font-medium">Fiscal</th>
                      <th className="pb-2 text-center font-medium hidden sm:table-cell">Tipo</th>
                      <th className="pb-2 text-center font-medium">Divisa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {etfs.map((etf) => {
                      const fiscal = computeFiscalGrade(etf.isin, etf.accumulating)
                      const fStyle = GRADE_STYLES[fiscal.grade]
                      return (
                        <tr key={etf.ticker} className="group hover:bg-surface-2 transition-colors">
                          <td className="py-2.5 pr-3">
                            <Link
                              href={`/etf/${etf.ticker.toLowerCase()}`}
                              className="font-mono font-bold text-brand-400 hover:text-brand-300 transition-colors"
                            >
                              {etf.ticker}
                            </Link>
                          </td>
                          <td className="py-2.5 pr-3 hidden sm:table-cell text-fg-muted">
                            <Link
                              href={`/etf/${etf.ticker.toLowerCase()}`}
                              className="hover:text-fg transition-colors line-clamp-1"
                            >
                              {etf.name}
                            </Link>
                          </td>
                          <td className="py-2.5 pr-3 text-right font-mono text-fg">
                            {formatPct(etf.ter / 100, 2)}
                          </td>
                          <td className="py-2.5 pr-3 text-center">
                            <span
                              className={`inline-flex items-center justify-center h-6 w-6 rounded text-xs font-bold ${fStyle.bg} ${fStyle.color}`}
                              title={`${fiscal.domicileLabel} · ${fiscal.reason}`}
                            >
                              {fiscal.grade}
                            </span>
                          </td>
                          <td className="py-2.5 pr-3 text-center hidden sm:table-cell">
                            <span className="text-xs text-fg-subtle">
                              {etf.accumulating ? 'Acc' : 'Dist'}
                            </span>
                          </td>
                          <td className="py-2.5 text-center">
                            <span className="text-xs text-fg-subtle">{etf.baseCurrency}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          {/* CTA */}
          <div className="rounded-xl border border-border bg-surface p-6 text-center mt-4">
            <p className="text-fg-muted text-sm mb-4">
              ¿Buscas comparar dos ETFs o analizar tu cartera?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/comparar"
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 transition-colors"
              >
                Comparar ETFs
              </Link>
              <Link
                href="/etfs"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                ETFs por categoría
              </Link>
              <Link
                href="/analyzer"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Analizar mi cartera
              </Link>
            </div>
          </div>

          <p className="mt-6 text-xs text-fg-subtle text-center">
            Información educativa. El grado fiscal refleja la eficiencia estimada para residentes en
            España según domicilio y política de reparto. Verifica TER y detalles en el folleto del
            fondo o en JustETF antes de invertir.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
