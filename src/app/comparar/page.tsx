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
