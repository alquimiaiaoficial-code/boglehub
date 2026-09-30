import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { BROKERS } from '@/data/brokers'
import { COMISIONES } from '@/data/comisiones-brokers'

const BASE_URL = 'https://boglehub.com'

/**
 * Desde el 30-sep-2026 esta página es la tabla de referencia de comisiones de brókers: cada
 * cifra sale de `comisiones-brokers.ts`, leída en la web del propio bróker, con el enlace y la
 * fecha. Es lo que un blog, un foro o un asistente de IA puede citar sin tener que fiarse de
 * nosotros: el enlace a la fuente está al lado de cada número.
 *
 * Por qué aquí y no en una URL nueva: el 30-sep Google tenía indexada UNA de las 359 URLs del
 * sitemap (la portada) y no había rastreado nunca el 54 %. `/broker` al menos está rastreada.
 */
const FECHA = '30 de septiembre de 2026'
const FECHA_ISO = '2026-09-30'

/** Enlace a la fuente: la primera URL que aparezca en el texto `fuente`. */
function urlFuente(fuente: string): string | null {
  const m = fuente.match(/https?:\/\/[^\s)]+/)
  return m ? m[0] : null
}

export const metadata: Metadata = {
  title: 'Comisiones de los brókers en España, comprobadas en su web (2026)',
  description: `Comisión por orden de ETF, planes de inversión y otros costes de ${BROKERS.length} brókers usados en España, cada cifra con el enlace a la web del bróker y la fecha en que se leyó (${FECHA}).`,
  alternates: {
    canonical: '/broker',
    languages: { 'es-ES': '/broker', 'en-US': '/en/brokers' },
  },
}

export default function BrokerIndexPage() {
  const filas = BROKERS.filter((b) => COMISIONES[b.slug])
  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Brokers', url: `${BASE_URL}/broker` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'CollectionPage',
          name: 'Comisiones de los brókers en España, comprobadas en su web',
          description: `Comisiones de ${filas.length} brókers leídas en la web de cada uno el ${FECHA}, con el enlace a la fuente de cada cifra.`,
          url: `${BASE_URL}/broker`,
          dateModified: FECHA_ISO,
          hasPart: BROKERS.map((b) => ({ name: b.name, url: `${BASE_URL}/broker/${b.slug}` })),
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Brokers</span>
          </nav>

          <header className="mb-8 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Comisiones de los brókers en España, comprobadas en la web de cada uno
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Cada cifra de esta tabla está leída en la web del propio bróker, y al lado tienes
              el enlace a la página de donde sale. Última comprobación: <strong className="text-fg">{FECHA}</strong>.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              La hicimos porque las cifras que circulan están viejas, empezando por las que
              publicábamos nosotros: decíamos que Trade Republic cobraba 0 € por operación
              (cobra 1 €; sus planes de inversión sí son gratis), que Openbank cobraba unos 8 €
              (cobra 1 €) o que ING cobraba entre 9 y 22 € (cobra 3 € + 0,10 %). Abajo está
              todo lo que cambió.
            </p>
          </header>

          <section className="mb-10" aria-labelledby="tabla">
            <h2 id="tabla" className="sr-only">Tabla de comisiones</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface">
                  <tr className="text-left text-xs uppercase tracking-wide text-fg-muted">
                    <th className="px-4 py-3">Bróker</th>
                    <th className="px-4 py-3">Orden suelta de ETF</th>
                    <th className="px-4 py-3">Planes de inversión</th>
                    <th className="px-4 py-3">Otros costes</th>
                    <th className="px-4 py-3">Fuente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filas.map((b) => {
                    const c = COMISIONES[b.slug]
                    const url = urlFuente(c.fuente)
                    return (
                      <tr key={b.slug} id={b.slug} className="align-top scroll-mt-20">
                        <td className="px-4 py-3 font-semibold text-fg">
                          <Link href={`/broker/${b.slug}`} className="hover:text-brand-400">{b.name}</Link>
                        </td>
                        <td className="px-4 py-3 text-fg">{c.etf}</td>
                        <td className="px-4 py-3 text-fg-muted">{c.planes ? 'Sin comisión' : 'No los anuncia'}</td>
                        <td className="px-4 py-3 text-xs text-fg-muted leading-relaxed">{c.otros ?? '—'}</td>
                        <td className="px-4 py-3 text-xs">
                          {url ? (
                            <a href={url} rel="nofollow noopener" target="_blank" className="text-brand-400 hover:text-brand-300 hover:underline break-all">
                              {new URL(url).hostname.replace(/^www\./, '')}
                            </a>
                          ) : (
                            <span className="text-fg-muted">{c.fuente}</span>
                          )}
                          <span className="block text-fg-subtle mt-1">leído el {c.leido.split('-').reverse().join('-')}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-fg-subtle leading-relaxed">
              «Orden suelta» es comprar un ETF con una orden normal; los planes de inversión son
              compras periódicas programadas. No incluye el diferencial de compra y venta ni la
              comisión de gestión de cada ETF, que cobra la gestora y es la misma en cualquier
              bróker. Para ver lo que te costaría cada uno al año con tus cifras, está el{' '}
              <Link href="/calculadora/comparar-brokers" className="text-brand-400 hover:underline">
                comparador de brókers
              </Link>
              , que usa estos mismos datos.
            </p>
          </section>

          <section className="mb-10 max-w-3xl" aria-labelledby="cambios">
            <h2 id="cambios" className="text-xl font-semibold text-fg mb-3">
              Qué cambió el {FECHA}
            </h2>
            <p className="text-fg-muted leading-relaxed mb-3">
              Esto es lo que publicábamos antes de comprobarlo en cada bróker, y lo que dice su web:
            </p>
            <ul className="space-y-2 text-sm text-fg-muted leading-relaxed list-disc pl-5">
              <li><strong className="text-fg">Trade Republic</strong>: decíamos 0 € por operación. Cobra 1 € de «comisión de liquidación» por orden suelta; los planes de inversión no tienen comisión.</li>
              <li><strong className="text-fg">DEGIRO</strong>: decíamos 0,50 € + 0,004 % (mínimo 0,90 €), que es una tarifa retirada. Hoy son 1 € en los ETF de su Selección Principal y 3 € en el resto, sin custodia.</li>
              <li><strong className="text-fg">MyInvestor</strong>: decíamos 0,20 € + 0,03 %. Cobra el 0,12 %, con un mínimo de 1 € y un máximo de 25 €.</li>
              <li><strong className="text-fg">Openbank</strong>: decíamos unos 8 € por orden. Cobra 1 €, en cualquier mercado, y deja de cobrar custodia el 1 de octubre de 2026.</li>
              <li><strong className="text-fg">ING</strong>: decíamos entre 9 y 22 €. Cobra 3 € + 0,10 % (1,5 € + 0,05 % desde 15 operaciones al trimestre).</li>
              <li><strong className="text-fg">Renta 4</strong>: decíamos unos 7-10 €. Por internet, 15 € por orden en bolsas europeas y 4 € en la española, más custodia.</li>
              <li><strong className="text-fg">Scalable Capital</strong>: decíamos que su cuenta pagaba «hasta el 4 %». Su web da un 2,63 % TAE, igual en los dos planes.</li>
            </ul>
          </section>

          <section className="mb-10 max-w-3xl" aria-labelledby="metodo">
            <h2 id="metodo" className="text-xl font-semibold text-fg mb-3">Cómo lo comprobamos</h2>
            <p className="text-fg-muted leading-relaxed">
              Solo vale la web del propio bróker: su página de tarifas, su centro de ayuda o su
              documento de tarifas. No usamos comparadores ni artículos de terceros. Las
              comisiones cambian, así que cada fila lleva la fecha en que se leyó, y volvemos a
              comprobarlas cuando acaba una promoción o cambia una tarifa. Si ves una cifra que ya
              no es la vigente, escríbenos a{' '}
              <a href="mailto:boglehub@gmail.com" className="text-brand-400 hover:underline">boglehub@gmail.com</a>{' '}
              con el enlace y la corregimos con fecha.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              BogleHub no tiene acuerdos de afiliación con ningún bróker de esta tabla y no
              recomienda ninguno: la tabla describe lo que cobra cada uno, y cuál encaja depende
              de cómo invierta cada persona.
            </p>
          </section>

          <h2 className="text-xl font-semibold text-fg mb-4">Ficha de cada bróker</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BROKERS.map((b) => (
              <Link key={b.slug} href={`/broker/${b.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-fg">{b.name}</h3>
                    <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-xs text-fg-muted">
                      {b.regulatorCountry}
                    </span>
                  </div>
                  <p className="text-xs text-fg-muted line-clamp-2">{b.tagline}</p>
                  <p className="mt-3 text-xs text-brand-400 font-medium">
                    ETF: {b.etfCommission}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
