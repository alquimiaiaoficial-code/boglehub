import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'BogleHub — Análisis de cartera para inversores indexados',
  description: 'Analiza tu cartera de ETFs con IA. Asignación, diversificación, costes y FIRE. Gratis para Bogleheads hispanos.',
  openGraph: { type: 'website', locale: 'es_ES' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-bg text-fg antialiased">{children}</body>
    </html>
  )
}
