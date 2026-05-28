import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { getEtfByTicker, getAllEtfs } from '@/lib/etf-database'
import { computeFiscalGrade, GRADE_STYLES } from '@/lib/fiscal'
import { formatPct } from '@/lib/utils'
import { generateEtfDescription, generateEtfFaqs } from '@/lib/etf-faqs'
import { ETF_PAIRS, pairToSlug } from '@/data/etf-pairs'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { getRelatedArticleSlugs } from '@/data/etf-related-articles'
import type { EtfMetadata } from '@/types/etf'

const BASE_URL = 'https://boglehub.com'

// ---------------------------------------------------------------------------
// Theme cross-links: map an ETF to its relevant category page(s)
// ---------------------------------------------------------------------------
const SP500_TICKERS = new Set(['CSPX', 'SXR8', 'VUSA', 'IUSA', 'VUAA', 'SPXS'])

function getRelevantThemes(etf: EtfMetadata): { slug: string; label: string }[] {
  const themes: { slug: string; label: string }[] = []

  if (etf.assetClass === 'COMMODITY') {
    themes.push({ slug: 'materias-primas', label: 'Materias primas y oro' })
    return themes
  }
  if (etf.assetClass === 'BOND') {
    themes.push({ slug: 'renta-fija', label: 'Renta fija' })
    return themes
  }
  if (etf.assetClass !== 'EQUITY') return themes

  // EM
  if (((etf.regionAllocation.EM ?? 0) + (etf.regionAllocation.CHINA ?? 0)) > 0.5) {
    themes.push({ slug: 'emergentes', label: 'Mercados emergentes' })
  }
  // Europe-focused
  if ((etf.regionAllocation.EUROPE ?? 0) >= 0.5) {
    themes.push({ slug: 'europa', label: 'Bolsa europea' })
  }
  // S&P 500
  if (SP500_TICKERS.has(etf.ticker)) {
    themes.push({ slug: 'sp500', label: 'S&P 500' })
  }
  // All-World (includes EM)
  if (
    (etf.regionAllocation.EM ?? 0) > 0.05 &&
    (etf.regionAllocation.US ?? 0) >= 0.40 &&
    (etf.regionAllocation.US ?? 0) < 0.80 &&
    (etf.regionAllocation.EUROPE ?? 0) > 0.05
  ) {
    themes.push({ slug: 'todo-mundo', label: 'All-World / global' })
  }
  // MSCI World (developed, no EM)
  if (
    (etf.regionAllocation.EM ?? 0) < 0.01 &&
    (etf.regionAllocation.JAPAN ?? 0) > 0.02 &&
    (etf.regionAllocation.US ?? 0) >= 0.55 &&
    (etf.regionAllocation.US ?? 0) < 0.85
  ) {
    themes.push({ slug: 'msci-world', label: 'MSCI World / mercados desarrollados' })
  }

  // Acumulación / Distribución
  if (etf.accumulating) {
    themes.push({ slug: 'acumulacion', label: 'ETFs de acumulación' })
  } else {
    themes.push({ slug: 'distribucion', label: 'ETFs de distribución' })
  }

  return themes
}

const ASSET_CLASS_LABEL: Record<string, string> = {
  EQUITY: 'Renta variable',
  BOND: 'Renta fija',
  COMMODITY: 'Materias primas',
  REIT: 'Inmobiliario',
  CASH: 'Liquidez',
  MIXED: 'Mixto',
}

const REGION_LABEL: Record<string, string> = {
  US: 'Estados Unidos',
  EUROPE: 'Europa',
  EM: 'Mercados emergentes',
  JAPAN: 'Japón',
  GLOBAL: 'Global',
  UK: 'Reino Unido',
  PACIFIC_EX_JAPAN: 'Pacífico (ex-Japón)',
  CHINA: 'China',
  OTHER: 'Otros',
}

const SECTOR_LABEL: Record<string, string> = {
  TECHNOLOGY: 'Tecnología',
  FINANCIAL: 'Financiero',
  HEALTHCARE: 'Salud',
  CONSUMER_DISC: 'Consumo discrecional',
  CONSUMER_STAPLES: 'Consumo básico',
  INDUSTRIAL: 'Industrial',
  ENERGY: 'Energía',
  UTILITIES: 'Utilities',
  MATERIALS: 'Materiales',
  COMMUNICATION: 'Comunicación',
  REAL_ESTATE: 'Inmobiliario',
  DIVERSIFIED: 'Diversificado',
}

export function generateStaticParams() {
  return getAllEtfs().map((etf) => ({ ticker: etf.ticker.toLowerCase() }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>
}): Promise<Metadata> {
  const { ticker } = await params
  const etf = getEtfByTicker(ticker)
  if (!etf) {
    return { title: 'ETF no encontrado' }
  }
  const fiscal = computeFiscalGrade(etf.isin, etf.accumulating)
  const title = `${etf.name} (${etf.ticker})`
  const description = `Análisis de ${etf.name}: TER ${formatPct(etf.ter / 100, 2)}, ${ASSET_CLASS_LABEL[etf.assetClass] ?? etf.assetClass}, domicilio ${fiscal.domicileLabel} (eficiencia fiscal ${fiscal.grade}), distribución geográfica y sectorial. Datos para inversores indexados.`
  return {
    title,
    description,
    alternates: { canonical: `/etf/${etf.ticker.toLowerCase()}` },
    openGraph: {
      title: `${title} | BogleHub`,
      description,
      locale: 'es_ES',
      images: [
        `/api/og?title=${encodeURIComponent(etf.ticker)}&subtitle=${encodeURIComponent(etf.name)}`,
      ],
    },
  }
}

function AllocationBars({
  data,
  labelMap,
}: {
  data: Record<string, number>
  labelMap: Record<string, string>
}) {
  const entries = Object.entries(data)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])

  if (entries.length === 0) {
    return <p className="text-sm text-fg-subtle">Datos no disponibles para este ETF.</p>
  }

  return (
    <div className="space-y-3">
      {entries.map(([key, value]) => (
        <div key={key}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-fg">{labelMap[key] ?? key}</span>
            <span className="text-fg-muted font-mono">{formatPct(value, 1)}</span>
          </div>
          <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent"
              style={{ width: `${Math.min(100, value * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-2 p-3">
      <div className="text-xs uppercase tracking-wide text-fg-muted">{label}</div>
      <div className="mt-1 text-lg font-semibold text-fg">{value}</div>
    </div>
  )
}

export default async function EtfPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params
  const etf = getEtfByTicker(ticker)

  if (!etf) {
    notFound()
  }

  const fiscal = computeFiscalGrade(etf.isin, etf.accumulating)
  const fiscalStyle = GRADE_STYLES[fiscal.grade]

  const similar: EtfMetadata[] = getAllEtfs()
    .filter((e) => e.assetClass === etf.assetClass && e.ticker !== etf.ticker)
    .slice(0, 3)

  // Categorías relevantes para este ETF
  const relevantThemes = getRelevantThemes(etf)

  // Comparativas curadas disponibles para este ticker
  const availablePairs = ETF_PAIRS
    .filter(([a, b]) => a === etf.ticker || b === etf.ticker)
    .slice(0, 4)
    .map(([a, b]) => ({
      slug: pairToSlug(a, b),
      other: a === etf.ticker ? b : a,
    }))

  // FAQs autogeneradas y descripción textual indexable
  const etfDescription = generateEtfDescription(etf)
  const etfFaqs = generateEtfFaqs(etf)

  // Artículos del blog relacionados (internal linking ficha -> contenido editorial)
  const relatedArticles = getRelatedArticleSlugs(etf)
    .map((slug) => BLOG_ARTICLES.find((a) => a.slug === slug))
    .filter(Boolean)
    .slice(0, 4) as typeof BLOG_ARTICLES

  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'ETF', url: `${BASE_URL}/etf` },
            { name: etf.ticker, url: `${BASE_URL}/etf/${etf.ticker.toLowerCase()}` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'FAQPage',
          questions: etfFaqs.map(({ q, a }) => ({ q, a })),
        }}
      />
      <JsonLd
        schema={{
          type: 'FinancialProduct',
          name: etf.name,
          description: etfDescription,
          url: `${BASE_URL}/etf/${etf.ticker.toLowerCase()}`,
          category: `${ASSET_CLASS_LABEL[etf.assetClass] ?? etf.assetClass} — ETF UCITS`,
          annualFee: `${etf.ter.toFixed(2)}%`,
          provider: etf.name.split(' ')[0],
          isin: etf.isin,
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-fg-muted">ETF</span>
            <span className="mx-2">/</span>
            <span className="text-fg">{etf.ticker}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-2xl font-bold text-brand-400">{etf.ticker}</span>
              <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs text-brand-400">
                {ASSET_CLASS_LABEL[etf.assetClass] ?? etf.assetClass}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">{etf.name}</h1>
            {etf.isin && (
              <p className="mt-1 text-sm text-fg-subtle font-mono">ISIN: {etf.isin}</p>
            )}
            <p className="mt-4 text-fg-muted leading-relaxed">{etfDescription}</p>
          </header>

          {/* Key stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <Stat label="TER anual" value={formatPct(etf.ter / 100, 2)} />
            <Stat label="Clase de activo" value={ASSET_CLASS_LABEL[etf.assetClass] ?? etf.assetClass} />
            <Stat label="Divisa base" value={etf.baseCurrency} />
            <Stat
              label="Reparto"
              value={etf.accumulating ? 'Acumulación' : 'Distribución'}
            />
          </div>

          {/* Fiscal grade (residente España) */}
          <Card className="mb-6">
            <CardTitle className="mb-3">Eficiencia fiscal (residente en España)</CardTitle>
            <div className="flex items-center gap-4">
              <div
                className={`inline-flex items-center justify-center h-16 w-16 rounded-xl text-3xl font-bold ${fiscalStyle.bg} ${fiscalStyle.color} flex-shrink-0`}
              >
                {fiscal.grade}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-fg">
                  Domicilio: {fiscal.domicileLabel} · {etf.accumulating ? 'Acumulación' : 'Distribución'}
                </div>
                <p className="text-xs text-fg-muted mt-1 leading-relaxed">{fiscal.reason}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-fg-subtle">
              El grado refleja la eficiencia fiscal estimada para un inversor residente en España,
              en base a domicilio del ETF y política de reparto. Información educativa, no
              asesoramiento — confirma con tu asesor fiscal.
            </p>
          </Card>

          {/* Region allocation */}
          <Card className="mb-6">
            <CardTitle className="mb-4">Distribución geográfica</CardTitle>
            <AllocationBars data={etf.regionAllocation} labelMap={REGION_LABEL} />
          </Card>

          {/* Sector allocation */}
          {etf.sectorAllocation && (
            <Card className="mb-6">
              <CardTitle className="mb-4">Distribución sectorial</CardTitle>
              <AllocationBars data={etf.sectorAllocation} labelMap={SECTOR_LABEL} />
            </Card>
          )}

          {/* Similar ETFs */}
          {similar.length > 0 && (
            <Card className="mb-6">
              <CardTitle className="mb-4">ETFs similares</CardTitle>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {similar.map((s) => (
                  <Link
                    key={s.ticker}
                    href={`/etf/${s.ticker.toLowerCase()}`}
                    className="rounded-lg border border-border bg-surface-2 p-3 hover:border-border-strong transition-colors"
                  >
                    <div className="font-mono font-semibold text-brand-400">{s.ticker}</div>
                    <div className="text-xs text-fg-muted mt-1 line-clamp-2">{s.name}</div>
                    <div className="text-xs text-fg-subtle mt-2">
                      TER {formatPct(s.ter / 100, 2)}
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          )}

          {/* Categorías relevantes */}
          {relevantThemes.length > 0 && (
            <Card className="mb-6">
              <CardTitle className="mb-3">Categorías de {etf.ticker}</CardTitle>
              <div className="flex flex-wrap gap-2">
                {relevantThemes.map(({ slug, label }) => (
                  <Link
                    key={slug}
                    href={`/etfs/${slug}`}
                    className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
                  >
                    Ver todos los ETFs de {label} →
                  </Link>
                ))}
              </div>
            </Card>
          )}

          {/* Comparativas disponibles */}
          {availablePairs.length > 0 && (
            <Card className="mb-6">
              <CardTitle className="mb-3">Comparativas con {etf.ticker}</CardTitle>
              <div className="flex flex-wrap gap-2">
                {availablePairs.map(({ slug, other }) => (
                  <Link
                    key={slug}
                    href={`/comparar/${slug}`}
                    className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm text-brand-400 hover:border-border-strong hover:text-brand-300 transition-colors font-mono"
                  >
                    {etf.ticker} vs {other}
                  </Link>
                ))}
              </div>
            </Card>
          )}

          {/* Artículos relacionados — internal linking ficha -> blog */}
          {relatedArticles.length > 0 && (
            <Card className="mb-6">
              <CardTitle className="mb-3">Para profundizar sobre {etf.ticker}</CardTitle>
              <ul className="space-y-2">
                {relatedArticles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="group flex flex-col gap-0.5 rounded-lg border border-border bg-surface-2 p-3 hover:border-border-strong transition-colors"
                    >
                      <span className="text-sm font-medium text-fg group-hover:text-brand-400 transition-colors">
                        {article.title}
                      </span>
                      <span className="text-xs text-fg-subtle line-clamp-1">
                        {article.excerpt}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* FAQs autogeneradas */}
          <section className="mb-6" aria-labelledby="etf-faq-heading">
            <h2 id="etf-faq-heading" className="text-lg font-semibold text-fg mb-4">
              Preguntas frecuentes sobre {etf.ticker}
            </h2>
            <div className="space-y-3">
              {etfFaqs.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-xl border border-border bg-surface px-5 py-4"
                >
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">
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

          {/* Newsletter */}
          <aside className="mb-6 rounded-xl border border-border bg-surface p-6">
            <h2 className="text-base font-semibold text-fg">
              ¿Te ha sido útil esta ficha?
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              Análisis quincenal de ETFs, fiscalidad y novedades de BogleHub. Sin spam, te
              das de baja con un clic.
            </p>
            <div className="mt-4">
              <NewsletterSignup variant="inline" />
            </div>
          </aside>

          {/* CTA */}
          <Card className="text-center">
            <p className="text-fg-muted text-sm">
              ¿Quieres comparar {etf.ticker} con otro ETF?{' '}
              <Link
                href="/comparar"
                className="text-brand-400 hover:text-brand-300 underline-offset-4 hover:underline"
              >
                Usa el comparador
              </Link>
              {' '}o{' '}
              <Link
                href="/chat"
                className="text-brand-400 hover:text-brand-300 underline-offset-4 hover:underline"
              >
                pregúntale al Chat IA
              </Link>
              .
            </p>
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
