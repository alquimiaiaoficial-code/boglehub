import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Sparkles } from 'lucide-react'

const BASE_URL = 'https://boglehub.com'

function gradeFromScore(
  score: number
): { letter: string; colorClass: string; bgClass: string } {
  if (score >= 90)
    return { letter: 'A', colorClass: 'text-accent', bgClass: 'bg-accent/20' }
  if (score >= 75)
    return {
      letter: 'B',
      colorClass: 'text-brand-400',
      bgClass: 'bg-brand-500/20',
    }
  if (score >= 60)
    return { letter: 'C', colorClass: 'text-warn', bgClass: 'bg-warn/20' }
  if (score >= 45)
    return { letter: 'D', colorClass: 'text-warn', bgClass: 'bg-warn/30' }
  return { letter: 'F', colorClass: 'text-danger', bgClass: 'bg-danger/20' }
}

function parseParams(
  searchParams: { [key: string]: string | string[] | undefined }
) {
  const rawScore = Number(searchParams.score ?? 0)
  const score = Number.isFinite(rawScore)
    ? Math.max(0, Math.min(100, Math.round(rawScore)))
    : 0
  const ter = Number(searchParams.ter ?? 0)
  const etfs = Number(searchParams.etfs ?? 0)
  return { score, ter, etfs }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const params = await searchParams
  const { score, ter, etfs } = parseParams(params)

  const ogImage = `/api/og/scorecard?score=${score}&ter=${ter.toFixed(2)}&etfs=${etfs}`

  return {
    title: `Mi nota Boglehead: ${score}/100 | BogleHub`,
    description: `Cartera analizada con BogleHub — TER ${ter.toFixed(2)}%, ${etfs} clases de activo. Analiza la tuya gratis, sin registro.`,
    openGraph: {
      title: `Mi nota Boglehead: ${score}/100`,
      description: 'Analizada gratis en BogleHub.',
      type: 'website',
      locale: 'es_ES',
      url: `${BASE_URL}/score`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Mi nota Boglehead: ${score}/100`,
      description: 'Analizada gratis en BogleHub.',
      images: [ogImage],
    },
  }
}

export default async function ScorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const { score, ter, etfs } = parseParams(params)
  const grade = gradeFromScore(score)

  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
            <p className="text-sm text-fg-muted mb-2">Mi nota Boglehead</p>
            <div className="flex items-end gap-4 mb-8">
              <span
                className={`text-7xl sm:text-8xl font-extrabold ${grade.colorClass} leading-none`}
              >
                {score}
              </span>
              <span className="text-2xl text-fg-muted mb-2">/100</span>
              <span
                className={`ml-auto inline-flex items-center justify-center h-14 w-14 rounded-xl ${grade.bgClass} ${grade.colorClass} text-2xl font-bold`}
              >
                {grade.letter}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-lg bg-surface-2 p-4 border border-border">
                <div className="text-xs uppercase tracking-wide text-fg-muted">
                  TER ponderado
                </div>
                <div className="mt-1 text-2xl font-bold text-fg">
                  {ter.toFixed(2)}%
                </div>
              </div>
              <div className="rounded-lg bg-surface-2 p-4 border border-border">
                <div className="text-xs uppercase tracking-wide text-fg-muted">
                  Clases de activo
                </div>
                <div className="mt-1 text-2xl font-bold text-fg">{etfs}</div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-gradient-to-br from-brand-500/10 via-surface to-accent/10 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-5 w-5 text-brand-400" />
                <h2 className="text-lg font-semibold text-fg">
                  ¿Y tu cartera, qué nota tendría?
                </h2>
              </div>
              <p className="text-sm text-fg-muted mb-4">
                Analiza la tuya gratis en BogleHub: TER ponderado, solapamiento
                entre ETFs, proyección FIRE y análisis con IA en español. Tus
                datos viven en tu navegador, no se guardan en ningún servidor.
              </p>
              <Link
                href="/analyzer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition-colors"
              >
                Analiza tu cartera gratis
              </Link>
            </div>
          </div>

          <p className="mt-6 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. La nota depende
            de tus objetivos personales.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
