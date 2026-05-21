import type { Metadata } from 'next'
import { EtfComparator } from './EtfComparator'

export const metadata: Metadata = {
  title: 'Comparar ETFs España 2026',
  description:
    'Compara dos ETFs UCITS en detalle: TER, clase de activo, divisa, solapamiento y asignación geográfica. Elige el ETF que mejor se adapte a tu cartera indexada.',
  openGraph: {
    title: 'Comparar ETFs España 2026 | BogleHub',
    description: 'Compara TER, regiones, sectores y solapamiento entre dos ETFs UCITS.',
    locale: 'es_ES',
  },
}

export default function CompararPage() {
  return (
    <>
      {/* Contenido estático indexable por Googlebot */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 pb-4">
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
            Comparar ETFs UCITS en España
          </h1>
          <p className="mt-2 text-fg-muted max-w-2xl">
            Compara dos ETFs lado a lado: TER, domicilio fiscal, clase de activo, divisa,
            asignación geográfica y sectorial, solapamiento y eficiencia fiscal para el
            inversor residente en España. Gratis, sin registro.
          </p>
        </header>
      </div>
      {/* Herramienta interactiva */}
      <EtfComparator />
    </>
  )
}
