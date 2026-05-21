import type { Metadata } from 'next'
import { MonteCarloCalculator } from './MonteCarloCalculator'

export const metadata: Metadata = {
  title: 'Calculadora Monte Carlo para tu jubilación FIRE',
  description:
    'Simula 1.000 escenarios de mercado para tu plan FIRE. Descubre la probabilidad real de que tu cartera dure toda tu jubilación, con datos de volatilidad reales.',
  openGraph: {
    title: 'Calculadora Monte Carlo FIRE | BogleHub',
    description:
      'Simula 1.000 escenarios de mercado para saber si tu plan de independencia financiera aguanta la volatilidad real.',
    locale: 'es_ES',
    images: [
      `/api/og?title=${encodeURIComponent('Calculadora Monte Carlo FIRE')}&subtitle=${encodeURIComponent('Simula 1.000 escenarios de mercado')}`,
    ],
  },
}

export default function MonteCarloPage() {
  return (
    <>
      {/* Contenido estático indexable por Googlebot */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-2">
        <header className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
            Calculadora FIRE con simulación Monte Carlo
          </h1>
          <p className="mt-2 text-fg-muted">
            Simula 1.000 escenarios de mercado para tu plan de independencia financiera. Descubre la
            probabilidad real de que tu cartera sobreviva a toda tu jubilación, considerando la
            volatilidad real de los mercados. Basado en datos históricos del MSCI World.
          </p>
        </header>
      </div>
      <MonteCarloCalculator />
    </>
  )
}
