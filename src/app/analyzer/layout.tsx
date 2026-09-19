import type { Metadata } from 'next'

export const metadata: Metadata = {
  // El título decía solo «Analizador de cartera» y la descripción «Analiza tu cartera de
  // ETFs», que dejó de ser cierta el 17-sep-2026: lee fondos indexados por ISIN. La página
  // del producto anunciaba en el buscador justamente lo que le fallaba.
  title: 'Analizador de cartera: fondos indexados y ETFs',
  description: 'Pega tus fondos indexados por ISIN y tus ETFs por ticker: cuánto se solapan entre sí, qué costaría deshacerlo según el IRPF, tu reparto real por región y el TER del conjunto. Gratis y sin registro.',
  alternates: { canonical: '/analyzer' },
  openGraph: {
    images: [`/api/og?title=${encodeURIComponent('Analizador de cartera')}&subtitle=${encodeURIComponent('Fondos indexados y ETFs')}`],
  },
}

export default function AnalyzerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
