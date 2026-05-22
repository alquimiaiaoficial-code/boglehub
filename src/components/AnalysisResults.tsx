'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Analysis } from '@/types/analysis'
import { Card, CardTitle } from '@/components/ui/Card'
import { AllocationPie } from '@/components/charts/AllocationPie'
import { RegionBar } from '@/components/charts/RegionBar'
import { SectorBar } from '@/components/charts/SectorBar'
import { formatEUR, cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Sparkles, ArrowRight, Share2 } from 'lucide-react'

type Tab = 'overview' | 'geo' | 'sector' | 'ai'

export function AnalysisResults({ analysis }: { analysis: Analysis }) {
  const [tab, setTab] = useState<Tab>('overview')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Resumen' },
    { id: 'geo', label: 'Geografía' },
    { id: 'sector', label: 'Sectores' },
    { id: 'ai', label: 'Análisis IA' },
  ]

  return (
    <Card>
      <CardTitle>Análisis de tu cartera</CardTitle>
      <div className="mt-2 mb-6 flex gap-2 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'px-3 py-2 text-sm font-medium border-b-2 transition-colors',
              tab === t.id ? 'border-brand-500 text-brand-400' : 'border-transparent text-fg-muted hover:text-fg'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat label="Valor total" value={formatEUR(analysis.allocation.totalValueEUR)} />
            <Stat label="TER ponderado" value={`${analysis.allocation.weightedTER.toFixed(2)}%`} />
            <Stat label="Coste anual" value={formatEUR((analysis.allocation.totalValueEUR * analysis.allocation.weightedTER) / 100)} />
            <Stat label="Clases de activo" value={`${Object.keys(analysis.allocation.byAssetClass).length}`} />
          </div>
          <AllocationPie breakdown={analysis.allocation} />
        </div>
      )}

      {tab === 'geo' && <RegionBar breakdown={analysis.allocation} />}
      {tab === 'sector' && <SectorBar breakdown={analysis.allocation} />}

      {tab === 'ai' && (
        <div className="prose prose-sm prose-invert max-w-none prose-headings:text-fg prose-strong:text-fg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis.aiNarrative}</ReactMarkdown>
        </div>
      )}

      {analysis.fire && (
        <div className="mt-6 rounded-lg bg-accent/10 border border-accent/30 p-4 text-sm text-accent">
          <strong>Proyección FIRE:</strong> con {formatEUR(analysis.fire.monthlyContribution)}/mes y un 7 % de rentabilidad,
          alcanzas {formatEUR(analysis.fire.targetAmount)} en{' '}
          {analysis.fire.yearsToFire === Infinity ? 'más de 50 años' : `${analysis.fire.yearsToFire} años`}.
        </div>
      )}

      <ShareSection analysis={analysis} />

      <div className="mt-6 rounded-xl border border-border bg-gradient-to-br from-brand-500/10 via-surface to-accent/10 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-fg">¿Tienes dudas sobre este análisis?</h4>
            <p className="text-xs text-fg-muted mt-0.5">
              Habla con el chat IA: te explica cualquier concepto, compara ETFs o resuelve dudas de fiscalidad. Gratis.
            </p>
          </div>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-colors whitespace-nowrap"
          >
            Abrir chat IA
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-2 p-3">
      <div className="text-xs uppercase tracking-wide text-fg-muted">{label}</div>
      <div className="mt-1 text-lg font-semibold text-fg">{value}</div>
    </div>
  )
}

function ShareSection({ analysis }: { analysis: Analysis }) {
  function computeScore(): number {
    const ter = analysis.allocation.weightedTER
    const classes = Object.keys(analysis.allocation.byAssetClass).length
    let score = 100
    if (ter > 0.5) score -= 25
    else if (ter > 0.3) score -= 15
    else if (ter > 0.2) score -= 8
    if (classes < 2) score -= 20
    return Math.max(0, Math.min(100, Math.round(score)))
  }

  function handleShare() {
    const score = computeScore()
    const ter = analysis.allocation.weightedTER
    const classes = Object.keys(analysis.allocation.byAssetClass).length
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://boglehub.com'
    const url = `${base}/score?score=${score}&ter=${ter.toFixed(2)}&etfs=${classes}`
    const text = `Mi nota Boglehead: ${score}/100 — cartera analizada gratis en BogleHub.`
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(intent, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="mt-6 rounded-xl border border-border bg-surface-2 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent text-white">
          <Share2 className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-fg">Comparte tu nota</h4>
          <p className="text-xs text-fg-muted mt-0.5">
            Una imagen con tu puntuación Boglehead — sin datos personales, lista para pegar en X.
          </p>
        </div>
        <button
          onClick={handleShare}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-colors whitespace-nowrap"
        >
          Compartir en X
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
