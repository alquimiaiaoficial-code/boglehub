import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { ROBOADVISORS, getRoboadvisorBySlug } from '@/data/roboadvisors'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return ROBOADVISORS.map((r) => ({ slug: r.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const r = getRoboadvisorBySlug(slug)
  if (!r) return { title: 'Roboadvisor no encontrado' }

  const title = `${r.name}: opinión, comisiones y análisis 2026`
  const description = `${r.tagline}. Análisis de ${r.name}: comisión total ${r.totalCost}, mínimo apertura ${r.minimumOpening}, ${r.numProfiles} perfiles de riesgo. Regulado por ${r.regulator}${r.regulatorId ? ` (nº ${r.regulatorId})` : ''}.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | BogleHub`,
      description,
      locale: 'es_ES',
      images: [
        `/api/og?title=${encodeURIComponent(r.name)}&subtitle=${encodeURIComponent('An%C3%A1lisis%20roboadvisor%202026')}`,
      ],
    },
    alternates: { canonical: `/roboadvisor/${slug}` },
  }
}

export default async function RoboadvisorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const r = getRoboadvisorBySlug(slug)
  if (!r) notFound()

  const pageUrl = `${BASE_URL}/roboadvisor/${slug}`
  const otherRoboadvisors = ROBOADVISORS.filter((x) => x.slug !== slug)

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: r.faq }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Roboadvisors', url: `${BASE_URL}/roboadvisor` },
            { name: r.name, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: `${r.name}: opinión y análisis 2026`,
          description: r.description,
          url: pageUrl,
          datePublished: '2026-05-24',
          dateModified: '2026-05-24',
          articleSection: 'Análisis de roboadvisors',
          keywords: [r.name, `${r.name} opinión`, `${r.name} comisiones`, 'roboadvisor España'],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">

          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/roboadvisor" className="hover:text-fg transition-colors">Roboadvisors</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{r.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              {r.name}: opinión y análisis (2026)
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">{r.tagline}.</p>
          </header>

          <Card className="mb-8">
            <CardTitle className="mb-4">Ficha rápida</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Coste total estimado</dt>
                <dd className="text-fg font-medium">{r.totalCost}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Mínimo apertura</dt>
                <dd className="text-fg font-medium">{r.minimumOpening}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Nº de perfiles</dt>
                <dd className="text-fg font-medium">{r.numProfiles}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Plan de pensiones</dt>
                <dd className="text-fg font-medium">{r.hasPensionPlan ? 'Sí' : 'No'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Regulador</dt>
                <dd className="text-fg font-medium">{r.regulator}{r.regulatorId ? ` (nº ${r.regulatorId})` : ''}</dd>
              </div>
              {r.aum && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-fg-muted">AUM aprox.</dt>
                  <dd className="text-fg font-medium">{r.aum}</dd>
                </div>
              )}
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Fondos subyacentes</dt>
                <dd className="text-fg text-sm">{r.underlyingFunds.join(', ')}</dd>
              </div>
            </dl>
          </Card>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-3">¿Qué es {r.name}?</h2>
            <p className="text-fg-muted leading-relaxed">{r.description}</p>
          </section>

          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardTitle className="mb-3">
                <span className="text-accent">✓</span> Ideal para
              </CardTitle>
              <ul className="space-y-2 text-sm text-fg-muted">
                {r.idealFor.map((item) => (
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
                {r.notIdealFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-danger/70 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">Preguntas frecuentes sobre {r.name}</h2>
            <div className="space-y-3">
              {r.faq.map(({ q, a }) => (
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

          {otherRoboadvisors.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-fg mb-4">Compara con otros roboadvisors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {otherRoboadvisors.map((x) => (
                  <Link
                    key={x.slug}
                    href={`/roboadvisor/${x.slug}`}
                    className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
                  >
                    <div className="font-semibold text-fg">{x.name}</div>
                    <p className="text-xs text-fg-muted mt-1 line-clamp-2">{x.tagline}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Quieres saber si te sale rentable un roboadvisor frente a gestionar tu propia cartera?
            </p>
            <Link
              href="/calculadora/roboadvisor-vs-diy"
              className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-500 transition-colors inline-block"
            >
              Calculadora roboadvisor vs DIY
            </Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Verifica comisiones actualizadas
            en la web oficial del roboadvisor. Última revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
