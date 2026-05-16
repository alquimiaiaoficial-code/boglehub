import type { Metadata } from 'next'
import { CompoundInterestCalculator } from './CompoundInterestCalculator'

export const metadata: Metadata = {
  title: 'Calculadora de interés compuesto España 2026 | BogleHub',
  description:
    'Calcula el crecimiento de tu inversión con interés compuesto. Visualiza cómo tu capital inicial y aportaciones mensuales crecen con el tiempo gracias al efecto del interés compuesto.',
  openGraph: {
    title: 'Calculadora de interés compuesto España 2026 | BogleHub',
    description: 'Visualiza cómo crece tu inversión con el interés compuesto.',
    locale: 'es_ES',
  },
}

export default function CompoundInterestPage() {
  return <CompoundInterestCalculator />
}
