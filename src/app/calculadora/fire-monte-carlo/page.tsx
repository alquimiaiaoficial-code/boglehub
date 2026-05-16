import type { Metadata } from 'next'
import { MonteCarloCalculator } from './MonteCarloCalculator'

export const metadata: Metadata = {
  title: 'Calculadora Monte Carlo para tu jubilación FIRE | BogleHub',
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
  return <MonteCarloCalculator />
}
