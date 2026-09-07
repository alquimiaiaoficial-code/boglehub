import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { EtfComparator } from './EtfComparator'

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
    </>
  )
}
