import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { INDEX_FUNDS, getIndexFundBySlug } from '@/data/index-funds'

import { DescargoFiscal } from '@/components/DescargoFiscal'
const BASE_URL = 'https://boglehub.com'

export function generateStaticParams() {
  return INDEX_FUNDS.map((f) => ({ slug: f.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const f = getIndexFundBySlug(slug)
  if (!f) return { title: 'Fondo no encontrado' }

  const title = `${f.name}: análisis del fondo indexado (ISIN ${f.isin}) 2026`
  // El nombre completo ya va en el title; no lo repetimos aquí para no truncar
  // la description en SERP (mismo criterio que las fichas de ETF).
  // Cuando la ficha está en revisión, la description NO afirma que haya traspaso libre: tres
  // de estos productos son ETFs y no lo tienen. Y es la description la que sale en el
  // buscador, así que afirmarlo ahí lo propaga a quien ni siquiera entra.
  const description = f.avisoDeRevision
    ? `Datos en revisión. TER ${f.ter}%, índice ${f.index}. Qué se sabe de ${f.name} y qué está sin confirmar.`
    : `${f.tagline}. TER ${f.ter}%, índice ${f.index}, con traspaso fiscal libre. Dónde comprarlo en España y comparativa con su ETF equivalente.`

  return {
    title,
    description,
    openGraph: {
      title: `${f.name} | BogleHub`,
      description,
      locale: 'es_ES',
      images: [`/api/og?title=${encodeURIComponent(f.name)}&subtitle=${encodeURIComponent(`Fondo indexado TER ${f.ter}%`)}`],
    },
    alternates: { canonical: `/fondo/${slug}` },
  }
}

export default async function FondoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const f = getIndexFundBySlug(slug)
  if (!f) notFound()

  const pageUrl = `${BASE_URL}/fondo/${slug}`
  const similar = INDEX_FUNDS.filter((x) => x.slug !== slug && x.assetClass === f.assetClass).slice(0, 4)

  const faqs = [
    // Las FAQ propias de la ficha se OMITEN cuando está en revisión: se escribieron dando
    // por hecho que el producto era un fondo con traspaso libre, y en tres casos es un ETF.
    // La del Amundi Prime Global decía literalmente «permite traspaso fiscal libre entre
    // fondos en España, ventaja exclusiva de los fondos» — sobre un ETF.
    ...(f.avisoDeRevision ? [] : f.faq),
    {
      q: `¿Cuál es el ISIN del ${f.name}?`,
      // La última frase decía «Es un fondo de acumulación en EUR» tomándolo del dato, y en
      // las fichas en revisión ese dato es justo el que está en duda: el Amundi Prime Global
      // figura como acumulación y el producto real es de distribución. Cuando hay aviso, esta
      // respuesta se queda en lo que no depende de esa duda.
      a: f.avisoDeRevision
        ? `El ISIN de esta ficha es ${f.isin} y figura gestionado por ${f.manager}. El índice que replica y si es de acumulación o distribución están en revisión, así que no los afirmamos aquí: lee el aviso del principio de la página.`
        : `El ISIN del ${f.name} es ${f.isin}. Está gestionado por ${f.manager}, replica el índice ${f.index} y tiene un TER del ${f.ter}% anual. Es un fondo de ${f.accumulating ? 'acumulación' : 'distribución'} en ${f.currency}.`,
    },
    {
      q: `¿El ${f.name} permite traspaso fiscal libre?`,
      // La respuesta era «Sí» para TODAS las fichas, y tres de estos productos son ETFs, que
      // están excluidos del régimen por el propio artículo 94.1.a). Responder que sí ahí no
      // es un matiz de redacción: es decirle a alguien que puede mover su dinero sin pagar
      // cuando pagaría.
      a: f.avisoDeRevision
        ? `No está confirmado, y por eso esta ficha está en revisión. El diferimiento del artículo 94.1.a) de la Ley del IRPF solo se aplica entre fondos de inversión, y excluye expresamente a los fondos cotizados «cualquiera que sea el mercado regulado en el que coticen». Si el producto resulta ser un ETF, venderlo tributa. Hasta comprobarlo no afirmamos ni una cosa ni la otra.`
        : `Sí. Al ser un fondo de inversión (no un ETF), el ${f.name} permite traspaso libre entre fondos sin tributar en España. Puedes mover dinero entre este y otros fondos indexados difiriendo el IRPF hasta el reembolso final. Esta es la mayor ventaja fiscal de los fondos sobre los ETFs en España.`,
    },
  ]

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: faqs }} />
      <JsonLd schema={{
        type: 'BreadcrumbList',
        items: [
          { name: 'Inicio', url: BASE_URL },
          { name: 'Fondos', url: `${BASE_URL}/fondo` },
          { name: f.name, url: pageUrl },
        ],
      }} />
      <JsonLd schema={{
        type: 'FinancialProduct',
        name: f.name,
        description: f.description,
        url: pageUrl,
        category: `${f.assetClass} — Fondo indexado`,
        annualFee: `${f.ter}%`,
        provider: f.manager,
        isin: f.isin,
      }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/fondo" className="hover:text-fg">Fondos</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">{f.name}</span>
          </nav>

          {/*
            El aviso va ANTES del titular, y la afirmación de abajo se calla cuando existe.

            Añadido el 18-sep-2026. La frase «es un fondo indexado […] con traspaso fiscal
            libre entre fondos» se afirmaba de TODAS las fichas, y tres de ellas resultaron
            ser ETFs: el Amundi Prime Global, el Prime Japan y probablemente el Prime USA.
            Un ETF no se traspasa sin tributar, así que a esos productos les estábamos
            atribuyendo exactamente la ventaja fiscal que NO tienen.

            No se retira la página —estas URLs están indexadas y `amundi-prime-global` es la
            que más clics recibe del sitio—: se retira la afirmación. Quien llega buscando
            ese ISIN merece leer lo que se sabe, que es más útil que una ficha bonita y falsa.
          */}
          {f.avisoDeRevision && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-warn/40 bg-warn/10 p-4 text-sm text-fg"
            >
              <p className="font-medium">Los datos de esta ficha están en revisión</p>
              <p className="mt-2 text-fg-muted leading-relaxed">{f.avisoDeRevision}</p>
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">{f.name}</h1>
            <p className="mt-1 text-sm text-fg-subtle font-mono">ISIN: {f.isin}</p>
            {!f.avisoDeRevision && (
              <p className="mt-3 text-fg leading-relaxed">
                Según BogleHub, {f.name} (ISIN {f.isin}) es un fondo indexado de {f.manager} que replica el índice {f.index}, con un TER del {f.ter}% anual, de {f.accumulating ? 'acumulación' : 'distribución'} y disponible en España con traspaso fiscal libre entre fondos.
              </p>
            )}
            {!f.avisoDeRevision && (
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">{f.tagline}.</p>
            )}
          </header>

          <Card className="mb-8">
            <CardTitle className="mb-4">Ficha del fondo</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><dt className="text-xs uppercase text-fg-muted">Gestora</dt><dd className="font-medium text-fg">{f.manager}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">TER anual</dt><dd className="font-medium text-fg">{f.ter}%</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Índice</dt><dd className="font-medium text-fg text-xs">{f.index}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Clase de activo</dt><dd className="font-medium text-fg">{f.assetClass}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Región</dt><dd className="font-medium text-fg">{f.region}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Reparto</dt><dd className="font-medium text-fg">{f.accumulating ? 'Acumulación' : 'Distribución'}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Divisa</dt><dd className="font-medium text-fg">{f.currency}</dd></div>
              <div><dt className="text-xs uppercase text-fg-muted">Mínimo inversión</dt><dd className="font-medium text-fg">{f.minimum}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs uppercase text-fg-muted">Disponible en</dt><dd className="text-fg text-sm">{f.availableAt.join(', ')}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs uppercase text-fg-muted">Traspaso fiscal libre</dt><dd className="text-accent font-medium text-sm">✓ Sí (ventaja de los fondos sobre ETFs)</dd></div>
            </dl>
          </Card>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-fg mb-3">¿Qué es el {f.name}?</h2>
            <p className="text-fg-muted leading-relaxed">{f.description}</p>
          </section>

          {f.etfEquivalent && (
            <Card className="mb-8">
              <CardTitle className="mb-2">Fondo vs ETF equivalente</CardTitle>
              <p className="text-sm text-fg-muted leading-relaxed mb-3">
                {f.avisoDeRevision ? (
                  <>
                    El producto comparable en formato ETF es{' '}
                    <strong className="text-fg">{f.etfEquivalent}</strong>. La comparación
                    «fondo frente a ETF» que había aquí daba por hecho que este producto es un
                    fondo, y eso es justo lo que está en revisión: si resulta ser un ETF, no hay
                    traspaso libre que lo distinga y la comparación no tiene sentido tal como
                    estaba planteada.
                  </>
                ) : (
                  <>
                    El equivalente en formato ETF de este fondo es{' '}
                    <strong className="text-fg">{f.etfEquivalent}</strong>. La diferencia clave:
                    el fondo permite traspaso fiscal libre entre fondos en España (puedes
                    rebalancear sin tributar), mientras que cada venta del ETF tributa. El ETF,
                    en cambio, cotiza en bolsa en tiempo real.
                  </>
                )}
              </p>
              <Link href={`/etf/${f.etfEquivalent.toLowerCase()}`} className="text-sm text-brand-400 hover:text-brand-300">
                Ver análisis del ETF {f.etfEquivalent} →
              </Link>
            </Card>
          )}

          <section className="mb-10">
            <h2 className="text-xl font-bold text-fg mb-5">Preguntas frecuentes sobre {f.name}</h2>
            <div className="space-y-3">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-border bg-surface px-5 py-4">
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">{q}<span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">▾</span></summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {similar.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-fg mb-4">Fondos indexados similares</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {similar.map((s) => (
                  <Link key={s.slug} href={`/fondo/${s.slug}`} className="rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors">
                    <div className="text-sm font-semibold text-fg">{s.name}</div>
                    <p className="text-xs text-fg-muted mt-1">TER {s.ter}% · {s.region}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <Card className="text-center">
            <p className="text-fg-muted text-sm mb-3">¿Fondos indexados o ETFs? La gran decisión fiscal en España.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/blog/fondos-indexados-vs-etfs-espana" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white">Fondos vs ETFs</Link>
              <Link href="/fondo" className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg">Todos los fondos</Link>
            </div>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">Información educativa, no asesoramiento. TER y datos orientativos; verifica en MyInvestor o folleto del fondo. Última revisión: mayo 2026.</p>
        </div>
      </main>
      <DescargoFiscal variant="fiscal" />
      <Footer />
    </>
  )
}
