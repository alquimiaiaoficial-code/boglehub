import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getIndexFundBySlug } from '@/data/index-funds'
import { FUND_PAIRS, fundPairToSlug, slugToFundPair } from '@/data/fund-pairs'

const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return FUND_PAIRS.map(([a, b]) => ({ pair: fundPairToSlug(a, b) }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const { pair } = await params
  const parts = slugToFundPair(pair)
  if (!parts) return { title: 'No encontrado' }
  const [a, b] = parts
  const fA = getIndexFundBySlug(a)
  const fB = getIndexFundBySlug(b)
  if (!fA || !fB) return { title: 'No encontrado' }

  return {
    title: `${fA.name} vs ${fB.name}: comparativa de fondos (2026)`,
    description: `Comparativa entre ${fA.name} (TER ${fA.ter}%) y ${fB.name} (TER ${fB.ter}%): índice, coste, gestora y cuál elegir para tu cartera indexada en España.`,
    openGraph: { locale: 'es_ES', images: [`/api/og?title=${encodeURIComponent(`${fA.manager} vs ${fB.manager}`)}&subtitle=${encodeURIComponent('Comparativa%20fondos%20indexados')}`] },
    alternates: { canonical: `/comparar-fondo/${pair}` },
  }
}

export default async function CompararFondoPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params
  const parts = slugToFundPair(pair)
  if (!parts) notFound()
  const [a, b] = parts
  const fA = getIndexFundBySlug(a)
  const fB = getIndexFundBySlug(b)
  if (!fA || !fB) notFound()

  const pageUrl = `${BASE_URL}/comparar-fondo/${pair}`
  const cheaper = fA.ter <= fB.ter ? fA : fB
  const terDiff = Math.abs(fA.ter - fB.ter)

  const faqs = [
    {
      q: `¿${fA.name} o ${fB.name}: cuál es más barato?`,
      a: terDiff < 0.01
        ? `Ambos tienen TER prácticamente idéntico (${fA.ter}% vs ${fB.ter}%). El coste no es el criterio diferenciador; elige por gestora preferida o índice replicado.`
        : `${cheaper.name} es más barato con TER ${cheaper.ter}% frente al ${(cheaper === fA ? fB : fA).ter}% del otro. La diferencia de ${terDiff.toFixed(2)}% anual se acumula a largo plazo, especialmente en carteras grandes.`,
    },
    {
      q: `¿Qué índice replica cada uno?`,
      a: `${fA.name} replica el ${fA.index}. ${fB.name} replica el ${fB.index}. ${fA.index === fB.index ? 'Replican el mismo índice, por lo que la diferencia es solo de gestora y coste.' : 'Son índices distintos pero con cobertura comparable; los resultados históricos suelen ser muy similares.'}`,
    },
    {
      q: `¿Puedo traspasar de ${fA.name} a ${fB.name} sin tributar?`,
      a: `Sí. Ambos son fondos de inversión, por lo que el traspaso entre ellos no genera evento fiscal en España. Puedes cambiar de uno a otro difiriendo el IRPF hasta el reembolso final. Esta es la gran ventaja de los fondos sobre los ETFs.`,
    },
    {
      q: `¿Cuál elijo para mi cartera?`,
      a: `Si ambos replican exposiciones equivalentes, elige el más barato (${cheaper.name}, TER ${cheaper.ter}%) salvo que prefieras una gestora concreta. Lo importante es mantener el fondo a largo plazo; gracias al traspaso libre puedes cambiar más adelante sin coste fiscal si aparece una opción mejor.`,
    },
  ]

  const rows: [string, string, string][] = [
    ['Gestora', fA.manager, fB.manager],
    ['ISIN', fA.isin, fB.isin],
    ['TER anual', `${fA.ter}%`, `${fB.ter}%`],
    ['Índice', fA.index, fB.index],
    ['Región', fA.region, fB.region],
    ['Clase de activo', fA.assetClass, fB.assetClass],
    ['Reparto', fA.accumulating ? 'Acumulación' : 'Distribución', fB.accumulating ? 'Acumulación' : 'Distribución'],
    ['Mínimo', fA.minimum, fB.minimum],
    ['Traspaso fiscal libre', 'Sí', 'Sí'],
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd schema={{ type: 'BreadcrumbList', items: [
        { name: 'Inicio', url: BASE_URL },
        { name: 'Fondos', url: `${BASE_URL}/fondo` },
        { name: `${fA.name} vs ${fB.name}`, url: pageUrl },
      ]}} />
      <JsonLd schema={{ type: 'Article', headline: `${fA.name} vs ${fB.name}`, description: `Comparativa de fondos indexados.`, url: pageUrl, datePublished: '2026-05-24', articleSection: 'Comparativas de fondos' }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/fondo" className="hover:text-fg">Fondos</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{fA.name} vs {fB.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">{fA.name} vs {fB.name}</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">Comparativa entre dos fondos indexados disponibles en España: índice, coste, gestora y cuál encaja mejor en tu cartera.</p>
          </header>

          <Card className="mb-8 p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wide text-fg-muted"></th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-brand-400">{fA.manager}</th>
                    <th className="text-center px-4 py-3 text-sm font-bold text-accent">{fB.manager}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map(([label, valA, valB], i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 font-medium text-fg-muted">{label}</td>
                      <td className="px-4 py-3 text-center text-fg text-xs">{valA}</td>
                      <td className="px-4 py-3 text-center text-fg text-xs">{valB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href={`/fondo/${fA.slug}`} className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors">
              <div className="text-sm font-semibold text-fg">{fA.name}</div>
              <p className="text-xs text-fg-muted mt-1">{fA.tagline}</p>
            </Link>
            <Link href={`/fondo/${fB.slug}`} className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors">
              <div className="text-sm font-semibold text-fg">{fB.name}</div>
              <p className="text-xs text-fg-muted mt-1">{fB.tagline}</p>
            </Link>
          </section>

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

          <Card className="text-center">
            <Link href="/fondo" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white inline-block">Todos los fondos indexados</Link>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">Información educativa, no asesoramiento. Última revisión: mayo 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
