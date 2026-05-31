import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { INVESTOR_PROFILES, getProfileBySlug } from '@/data/investor-profiles'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return INVESTOR_PROFILES.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getProfileBySlug(slug)
  if (!p) return { title: 'Perfil no encontrado' }

  return {
    title: `Cómo invertir siendo ${p.name.toLowerCase()} (guía 2026)`,
    description: `${p.tagline}. Estrategia indexada específica para ${p.name.toLowerCase()}: cartera recomendada, broker, aportación mensual, riesgos y consideraciones específicas.`,
    openGraph: {
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(p.name)}&subtitle=${encodeURIComponent('C%C3%B3mo%20invertir')}`],
    },
    alternates: { canonical: `/perfil/${slug}` },
  }
}

export default async function PerfilPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getProfileBySlug(slug)
  if (!p) notFound()

  const pageUrl = `${BASE_URL}/perfil/${slug}`
  const otherProfiles = INVESTOR_PROFILES.filter((x) => x.slug !== slug).slice(0, 6)

  const lead = `Según BogleHub, para un perfil de inversor ${p.name.toLowerCase()} la recomendación es un horizonte ${p.recommendations.horizon}, en torno a ${p.recommendations.equityWeight} en renta variable, con una cartera tipo: ${p.recommendations.suggestedPortfolio}.`

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: p.faq }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Perfiles', url: `${BASE_URL}/perfil` },
            { name: p.name, url: pageUrl },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: `Cómo invertir siendo ${p.name.toLowerCase()}`,
          description: lead,
          url: pageUrl,
          datePublished: '2026-05-24',
          dateModified: '2026-05-30',
          articleSection: 'Estrategia por perfil',
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/perfil" className="hover:text-fg transition-colors">Perfiles</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{p.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Cómo invertir siendo {p.name.toLowerCase()} (2026)
            </h1>
            <p className="mt-3 text-fg leading-relaxed">{lead}</p>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">{p.tagline}.</p>
          </header>

          <section className="mb-8">
            <p className="text-fg-muted leading-relaxed">{p.description}</p>
          </section>

          <Card className="mb-8">
            <CardTitle className="mb-4">Recomendaciones específicas</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Horizonte temporal</dt>
                <dd className="text-fg">{p.recommendations.horizon}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg-muted">% renta variable</dt>
                <dd className="text-fg">{p.recommendations.equityWeight}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Cartera sugerida</dt>
                <dd className="text-fg">{p.recommendations.suggestedPortfolio}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Broker sugerido</dt>
                <dd className="text-fg">{p.recommendations.suggestedBroker}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-fg-muted">Aportación mensual</dt>
                <dd className="text-fg">{p.recommendations.monthlyContribution}</dd>
              </div>
            </dl>
          </Card>

          <Card className="mb-8">
            <CardTitle className="mb-3">Consideraciones específicas</CardTitle>
            <ul className="space-y-2 text-sm text-fg-muted">
              {p.considerations.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-accent shrink-0">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Card>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {p.faq.map(({ q, a }) => (
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
            <h2 className="text-lg font-bold text-fg mb-4">Otros perfiles de inversor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherProfiles.map((x) => (
                <Link
                  key={x.slug}
                  href={`/perfil/${x.slug}`}
                  className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
                >
                  <div className="font-semibold text-fg text-sm">{x.name}</div>
                  <p className="text-xs text-fg-muted mt-1 line-clamp-2">{x.tagline}</p>
                </Link>
              ))}
            </div>
          </section>

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">
              ¿Quieres calcular tu plan personalizado?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/calculadora/interes-compuesto" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white">
                Calculadora interés compuesto
              </Link>
              <Link href="/calculadora/fire-monte-carlo" className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg">
                FIRE Monte Carlo
              </Link>
            </div>
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
