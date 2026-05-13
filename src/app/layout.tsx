import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BogleHub — Tu cartera de fondos indexados optimizada con IA',
  description: 'Analiza tu cartera de ETFs con IA. Asignación de activos, diversificación geográfica, costes y proyección FIRE. Gratis para Bogleheads hispanos.',
  openGraph: { type: 'website', locale: 'es_ES' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
