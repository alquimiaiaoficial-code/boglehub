import type { Metadata } from 'next'
import { CompoundInterestCalculator } from './CompoundInterestCalculator'

export const metadata: Metadata = {
  title: 'Calculadora de interés compuesto España 2026',
  description:
    'Calcula el crecimiento de tu inversión con interés compuesto. Visualiza cómo tu capital inicial y aportaciones mensuales crecen con el tiempo gracias al efecto del interés compuesto.',
  openGraph: {
    title: 'Calculadora de interés compuesto España 2026 | BogleHub',  // OG title sin template
    description: 'Visualiza cómo crece tu inversión con el interés compuesto.',
    locale: 'es_ES',
  },
}

export default function CompoundInterestPage() {
  return (
    <>
      {/* Contenido estático indexable por Googlebot */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-2">
        <header className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
            Calculadora de interés compuesto
          </h1>
          <p className="mt-2 text-fg-muted">
            Visualiza cómo crece tu inversión a largo plazo gracias al efecto del interés
            compuesto. Introduce tu capital inicial, aportación mensual, rentabilidad anual y
            horizonte temporal para ver la proyección completa.
          </p>
        </header>
      </div>
      <CompoundInterestCalculator />
    </>
  )
}
