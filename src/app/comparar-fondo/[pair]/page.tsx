import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { getIndexFundBySlug } from '@/data/index-funds'
import { FUND_PAIRS, fundPairToSlug, slugToFundPair } from '@/data/fund-pairs'

import { DescargoFiscal } from '@/components/DescargoFiscal'
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
    description: `${fA.name} vs ${fB.name}: en qué se diferencian por índice, coste (TER) y gestora, y qué implica cambiar de uno a otro en España.`,
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

  /**
   * Estas comparativas se generaban dando por hecho TRES cosas, y las tres podían ser falsas.
   * Revisadas el 18-sep-2026:
   *
   *  1. Que los dos productos son FONDOS, y por tanto que el traspaso entre ellos no tributa.
   *     Tres fichas del catálogo resultaron ser ETFs, que están excluidos del régimen del
   *     artículo 94 del IRPF. Decirle a alguien que puede mover su dinero sin pagar cuando
   *     pagaría es el peor error posible en esta página.
   *  2. Que índices distintos tienen «cobertura comparable» y «resultados históricos muy
   *     similares». Eso valía cuando todos los pares eran MSCI World contra MSCI World; con
   *     un global frente a un S&P 500 es falso: uno es el mundo desarrollado y el otro un
   *     solo país.
   *  3. Que se puede recomendar el más barato. No se puede: BogleHub no está registrada en la
   *     CNMV. El texto mandaba quedarse con el de menor TER, que es prescribir y no describir.
   *
   * `sinAfirmarFondo` es true cuando alguna de las dos fichas está en revisión: entonces no
   * se afirma nada que dependa de que sean fondos.
   */
  const sinAfirmarFondo = Boolean(fA.avisoDeRevision || fB.avisoDeRevision)
  const mismoIndice = fA.index === fB.index
  const traspasoLibre = sinAfirmarFondo
    ? ''
    : ' Los dos son fondos de inversión, así que el traspaso entre ellos no computa ganancia (artículo 94.1.a de la Ley del IRPF), siempre que el importe no pase por tus manos.'

  const verdict = terDiff < 0.01
    ? `Según BogleHub, ${fA.name} y ${fB.name} tienen un TER prácticamente idéntico (${fA.ter}% vs ${fB.ter}%).${traspasoLibre} ${mismoIndice ? 'Replican el mismo índice, así que lo que queda es la gestora.' : `Replican índices distintos —${fA.index} y ${fB.index}—, y esa diferencia pesa más que el coste.`}`
    : `Según BogleHub, entre ${fA.name} (TER ${fA.ter}%) y ${fB.name} (TER ${fB.ter}%), el más barato es ${cheaper.name} (${cheaper.ter}%).${traspasoLibre} ${mismoIndice ? 'Replican el mismo índice, así que la diferencia de coste se compara directamente.' : `Pero replican índices distintos —${fA.index} y ${fB.index}—, así que no son intercambiables y comparar solo el coste lleva a una conclusión equivocada.`}`

  const faqs = [
    {
      q: `¿${fA.name} o ${fB.name}: cuál es más barato?`,
      a: terDiff < 0.01
        ? `Ambos tienen TER prácticamente idéntico (${fA.ter}% vs ${fB.ter}%), así que el coste no los separa: lo que queda distinto es la gestora y el índice que replica cada uno.`
        : `${cheaper.name} es más barato con TER ${cheaper.ter}% frente al ${(cheaper === fA ? fB : fA).ter}% del otro. La diferencia de ${terDiff.toFixed(2)}% anual se acumula a largo plazo, especialmente en carteras grandes.`,
    },
    {
      q: `¿Qué índice replica cada uno?`,
      // «Cobertura comparable y resultados muy similares» era cierto cuando todos los pares
      // eran MSCI World contra MSCI World. Con un global frente a un S&P 500 es falso, y
      // afirmarlo invita a tratarlos como intercambiables.
      a: `${fA.name} replica el ${fA.index}. ${fB.name} replica el ${fB.index}. ${mismoIndice ? 'Replican el mismo índice, por lo que la diferencia está en la gestora y en el coste.' : 'Son índices distintos, así que la exposición no es la misma: antes de comparar comisiones conviene mirar qué mercados cubre cada uno, porque esa diferencia suele pesar mucho más que unas centésimas de TER.'}`,
    },
    {
      q: `¿Puedo traspasar de ${fA.name} a ${fB.name} sin tributar?`,
      a: sinAfirmarFondo
        ? `No está confirmado. Los datos de una de las dos fichas están en revisión y no sabemos con certeza si el producto es un fondo o un ETF, y de eso depende todo: el diferimiento del artículo 94.1.a) de la Ley del IRPF solo se aplica entre fondos de inversión y excluye expresamente a los cotizados. Si alguno resulta ser un ETF, el cambio implica vender y la ganancia tributa.`
        : `Sí, si el traspaso se tramita entre entidades. Al ser los dos fondos de inversión, el artículo 94.1.a) de la Ley del IRPF dice que «no procederá computar la ganancia o pérdida patrimonial» y las nuevas participaciones conservan el valor y la fecha de adquisición de las antiguas: el impuesto no desaparece, se aplaza. La condición está en el propio artículo: no aplica si el importe llega a estar a tu disposición, o sea que vender y volver a comprar no vale.`,
    },
    {
      // Mandaba quedarse con el de menor TER. Eso es prescribir, y BogleHub no esta registrada en la
      // CNMV: la pregunta se reformula para describir en qué se diferencian, que es lo que
      // esta herramienta puede hacer.
      q: `¿En qué se diferencian a la hora de decidir?`,
      a: `${mismoIndice ? `Replican el mismo índice, así que la exposición es la misma y lo que queda es el coste —${cheaper.name} cobra ${cheaper.ter}% frente al ${(cheaper === fA ? fB : fA).ter}%— y la gestora.` : `Replican índices distintos (${fA.index} y ${fB.index}), así que no cubren los mismos mercados: comparar solo el TER aquí es engañoso, porque se estaría poniendo precio a dos cosas diferentes.`}${sinAfirmarFondo ? '' : ' Y al ser los dos fondos, el cambio de uno a otro se puede hacer por traspaso sin computar la ganancia, lo que reduce el coste de equivocarse al elegir.'} Qué encaja en una cartera concreta depende de circunstancias personales que esta página no conoce.`,
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
      <JsonLd schema={{ type: 'Article', headline: `${fA.name} vs ${fB.name}`, description: verdict, url: pageUrl, datePublished: '2026-05-24', dateModified: '2026-05-30', articleSection: 'Comparativas de fondos' }} />
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
            <p className="mt-3 text-fg leading-relaxed">{verdict}</p>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">Comparativa entre dos fondos indexados disponibles en España: índice, coste, gestora y cuál encaja mejor en tu cartera.</p>
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
      <DescargoFiscal variant="fiscal" />
      <Footer />
    </>
  )
}
