import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analizador de cartera',
  description: 'Analiza tu cartera de ETFs con IA. Asignación, diversificación geográfica, sectorial, divisas y costes. Gratis.',
  openGraph: {
    images: [`/api/og?title=${encodeURIComponent('Analizador de cartera')}&subtitle=${encodeURIComponent('Análisis con IA en segundos')}`],
  },
}

export default function AnalyzerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
