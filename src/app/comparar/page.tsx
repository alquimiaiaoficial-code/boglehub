import type { Metadata } from 'next'
import { EtfComparator } from './EtfComparator'

export const metadata: Metadata = {
  title: 'Comparar ETFs España 2026 | BogleHub',
  description:
    'Compara dos ETFs UCITS en detalle: TER, clase de activo, divisa, solapamiento y asignación geográfica. Elige el ETF que mejor se adapte a tu cartera indexada.',
  openGraph: {
    title: 'Comparar ETFs España 2026 | BogleHub',
    description: 'Compara TER, regiones, sectores y solapamiento entre dos ETFs UCITS.',
    locale: 'es_ES',
  },
}

export default function CompararPage() {
  return <EtfComparator />
}
