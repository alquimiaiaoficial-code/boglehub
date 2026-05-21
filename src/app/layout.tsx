import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { JsonLd } from '@/components/JsonLd'
import { PWAInit } from '@/components/PWAInit'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'

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
  appleWebApp: {
    capable: true,
    title: 'BogleHub',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-bg text-fg antialiased">
        <JsonLd schema={{ type: 'Organization' }} />
        {children}
        <PWAInit />
        <PWAInstallPrompt />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
