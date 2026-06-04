import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { BROKERS, getBrokerBySlug } from '@/data/brokers'

const BASE_URL = 'https://boglehub.com'

/**
 * Mapa de bróker slug → slug del artículo de análisis completo.
 * Los brókers que tienen su propia review en el blog aparecen con enlace directo.
 */
const BROKER_REVIEW_ARTICLES: Record<string, { slug: string; label: string }> = {
  'trade-republic': { slug: 'trade-republic-opinion-2026', label: 'Trade Republic: análisis completo 2026' },
  'myinvestor':     { slug: 'myinvestor-opinion-2026',     label: 'MyInvestor: análisis completo 2026' },
  'degiro':         { slug: 'degiro-opinion-2026',          label: 'DEGIRO: análisis completo 2026' },
  'xtb':            { slug: 'xtb-opinion-2026',             label: 'XTB: análisis completo 2026' },
  'scalable-capital': { slug: 'scalable-capital-opinion-2026', label: 'Scalable Capital: análisis completo 2026' },
  'interactive-brokers': { slug: 'interactive-brokers-opinion-2026', label: 'Interactive Brokers: análisis completo 2026' },
  'ing': { slug: 'ing-opinion-2026', label: 'ING (Naranja Broker): análisis completo 2026' },
  'renta-4': { slug: 'renta-4-opinion-2026', label: 'Renta 4 Banco: análisis completo 2026' },
  'openbank': { slug: 'openbank-opinion-2026', label: 'Openbank: análisis completo 2026' },
}

export function generateStaticParams() {
  return BROKERS.map((b) => ({ slug: b.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const broker = getBrokerBySlug(slug)
  if (!broker) return { title: 'Broker no encontrado' }

  const title = `${broker.name}: opinión, comisiones y guía completa 2026`
  const description = `${broker.tagline}. Análisis completo de ${broker.name}: comisiones (${broker.etfCommission}), seguridad, regulación ${broker.regulator}, para quién es ideal y comparativa con otros brokers para invertir en ETFs desde España.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | BogleHub`,
      description,
      locale: 'es_ES',
      images: [
        `/api/og?title=${encodeURIComponent(broker.name)}&subtitle=${encodeURIComponent('An%C3%A1lisis%20completo%202026')}`,
      ],
    },
    alternates: { canonical: `/broker/${slug}` },
  }
}

export default async function BrokerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const broker = getBrokerBySlug(slug)
  if (!broker) notFound()

  const pageUrl = `${BASE_URL}/broker/${slug}`
  const otherBrokers = BROKERS.filter((b) => b.slug !== slug).slice(0, 5)

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: broker.faq }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Brokers', url: `${BASE_URL}/broker` },
            { name: broker.name, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: `${broker.name}: opinión, comisiones y guía completa 2026`,
          description: broker.description,
          url: pageUrl,
          datePublished: '2026-05-24',
          dateModified: '2026-05-30',
          articleSection: 'Análisis de brokers',
          keywords: [broker.name, `${broker.name} opinión`, `${broker.name} comisiones`, `${broker.name} España`, 'broker España'],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">

          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/broker" className="hover:text-fg transition-colors">Brokers</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{broker.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              {broker.name}: opinión y análisis completo (2026)
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">{broker.tagline}.</p>
          </header>

          {/* Datos clave */}
          <Card className="mb-8">
            <CardTitle className="mb-4">Ficha rápida</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Comisión ETF</dt>
                <dd className="text-fg font-medium">{broker.etfCommission}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Fondos indexados</dt>
                <dd className="text-fg font-medium">{broker.supportsFunds ? 'Sí (con traspaso fiscal libre)' : 'No (solo ETFs)'}</dd>
              </div>
              {broker.remuneratedAccount && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-fg-muted">Cuenta remunerada</dt>
                  <dd className="text-fg font-medium">{broker.remuneratedAccount}</dd>
                </div>
              )}
              {broker.minimumOpening && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-fg-muted">Mínimo apertura</dt>
                  <dd className="text-fg font-medium">{broker.minimumOpening}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Regulador</dt>
                <dd className="text-fg font-medium">{broker.regulator} ({broker.regulatorCountry})</dd>
              </div>
              {broker.founded && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-fg-muted">Fundado</dt>
                  <dd className="text-fg font-medium">{broker.founded}</dd>
                </div>
              )}
              {broker.depositGuarantee && (
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-fg-muted">Garantía de depósito</dt>
                  <dd className="text-fg text-sm">{broker.depositGuarantee}</dd>
                </div>
              )}
              {broker.investmentGuarantee && (
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-fg-muted">Garantía de inversión</dt>
                  <dd className="text-fg text-sm">{broker.investmentGuarantee}</dd>
                </div>
              )}
            </dl>
          </Card>

          {/* Descripción */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-3">¿Qué es {broker.name}?</h2>
            <p className="text-fg-muted leading-relaxed">{broker.description}</p>
          </section>

          {/* Para quién */}
          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardTitle className="mb-3">
                <span className="text-accent">✓</span> Ideal para
              </CardTitle>
              <ul className="space-y-2 text-sm text-fg-muted">
                {broker.idealFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <CardTitle className="mb-3">
                <span className="text-danger/70">✗</span> No ideal si
              </CardTitle>
              <ul className="space-y-2 text-sm text-fg-muted">
                {broker.notIdealFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-danger/70 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">Preguntas frecuentes sobre {broker.name}</h2>
            <div className="space-y-3">
              {broker.faq.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-xl border border-border bg-surface px-5 py-4"
                >
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">
                    {q}
                    <span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Otros brokers */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-fg mb-4">Compara con otros brokers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherBrokers.map((b) => (
                <Link
                  key={b.slug}
                  href={`/broker/${b.slug}`}
                  className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
                >
                  <div className="font-semibold text-fg">{b.name}</div>
                  <p className="text-xs text-fg-muted mt-1 line-clamp-2">{b.tagline}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Enlace al artículo de análisis completo si existe */}
          {BROKER_REVIEW_ARTICLES[slug] && (
            <div className="mb-6 rounded-xl border border-brand-500/30 bg-brand-500/5 p-5">
              <p className="text-sm font-semibold text-fg mb-1">
                Análisis completo en el blog
              </p>
              <p className="text-xs text-fg-muted mb-3">
                Guía detallada de comisiones, seguridad, plataforma y para quién tiene sentido {broker.name}.
              </p>
              <Link
                href={`/blog/${BROKER_REVIEW_ARTICLES[slug].slug}`}
                className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 transition-colors"
              >
                {BROKER_REVIEW_ARTICLES[slug].label} →
              </Link>
            </div>
          )}

          {/* CTA */}
          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Quieres ver una comparativa completa de todos los brokers populares en España?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog/degiro-vs-trade-republic-vs-myinvestor-2026"
                className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-500 transition-colors"
              >
                Comparativa completa
              </Link>
              <Link
                href="/datos-clave#brokers"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Tabla resumen
              </Link>
            </div>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Verifica siempre las comisiones
            y condiciones actualizadas en la web oficial del broker antes de operar. Última
            revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
