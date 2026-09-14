import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { EtfComparator } from './EtfComparator'
import Link from 'next/link'
import { INDEXED_PAIRS } from '@/lib/seo-index-policy'
import { pairToSlug } from '@/data/etf-pairs'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Comparador de ETFs UCITS gratis (2026)',
  description:
    'Comparador gratuito de ETFs UCITS: enfrenta dos ETFs y compara TER, solapamiento, regiones, divisa y fiscalidad antes de elegir. Sin registro.',
  alternates: { canonical: '/comparar' },
  openGraph: {
    title: 'Comparador de ETFs UCITS gratis (2026) | BogleHub',
    description: 'Compara TER, regiones, sectores y solapamiento entre dos ETFs UCITS.',
    locale: 'es_ES',
  },
}

export default function CompararPage() {
  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Comparar ETFs', url: `${BASE_URL}/comparar` },
          ],
        }}
      />
      {/* El H1 y el texto indexable viven dentro de EtfComparator, DEBAJO de <Header/>.
          Antes estaban aquí, delante del componente, y eso empujaba la cabecera del sitio
          ~200 px hacia abajo: en /comparar el menú aparecía a media página y en el resto
          del sitio arriba del todo. Lo cazó un usuario externo el 7-sep-2026 mirando la
          web con el fundador delante. De paso había DOS <h1> en la misma página. */}
      <EtfComparator />

      {/*
        Índice de las comparativas que pedimos indexar. Añadido el 14-sep-2026.

        `/comparar` es un comparador interactivo: genera las combinaciones con JavaScript y
        **no enlazaba a ninguna** de las 16 comparativas que sí pedimos indexar. Un rastreo
        del sitio desde la home lo confirmó: 14 de esas 16 eran inalcanzables. Googlebot no
        ejecuta el selector; necesita un `<a href>`.

        Es el mismo fallo que el de los hubs del pie, un nivel más abajo: la página existía,
        estaba en el sitemap y no tenía camino.
      */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <h2 className="text-xl font-semibold text-fg">Comparativas con análisis escrito</h2>
        <p className="mt-2 text-sm text-fg-muted">
          Estas parejas tienen su propia página, con el solapamiento por región, el TER de
          cada uno y qué cambia entre ellos para un inversor en España.
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {INDEXED_PAIRS.map(([a, b]) => (
            <li key={`${a}-${b}`}>
              <Link
                href={`/comparar/${pairToSlug(a, b)}`}
                className="block rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
              >
                <span className="font-mono text-fg">{a}</span> frente a{' '}
                <span className="font-mono text-fg">{b}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
