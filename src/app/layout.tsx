import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { JsonLd } from '@/components/JsonLd'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://boglehub.vercel.app'),
  title: { default: 'BogleHub', template: '%s | BogleHub' },
  description: 'Análisis de cartera con IA para inversores indexados hispanos. Gratis.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'BogleHub',
    images: ['/api/og?title=BogleHub&subtitle=An%C3%A1lisis%20de%20cartera%20con%20IA'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BogleHub',
    description: 'Análisis de cartera con IA para inversores indexados hispanos. Gratis.',
    images: ['/api/og?title=BogleHub&subtitle=An%C3%A1lisis%20de%20cartera%20con%20IA'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-bg text-fg antialiased">
        <JsonLd schema={{ type: 'Organization' }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
