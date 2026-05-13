'use client'

import { useState } from 'react'
import { Analysis } from '@/types/analysis'
import { Card, CardTitle } from '@/components/ui/Card'
import { AllocationPie } from '@/components/charts/AllocationPie'
import { RegionBar } from '@/components/charts/RegionBar'
import { SectorBar } from '@/components/charts/SectorBar'
import { formatEUR, formatPct, cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
      <div className="mt-2 mb-6 flex gap-2 border-b border-zinc-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'px-3 py-2 text-sm font-medium border-b-2 transition-colors',
              tab === t.id ? 'border-brand-600 text-brand-700' : 'border-transparent text-zinc-500 hover:text-zinc-700'
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
            <Stat label="TER ponderado" value={formatPct(analysis.allocation.weightedTER, 2)} />
            <Stat label="Coste anual" value={formatEUR(analysis.allocation.totalValueEUR * analysis.allocation.weightedTER)} />
            <Stat label="Clases de activo" value={`${Object.keys(analysis.allocation.byAssetClass).length}`} />
          </div>
          <AllocationPie breakdown={analysis.allocation} />
        </div>
      )}

      {tab === 'geo' && <RegionBar breakdown={analysis.allocation} />}
      {tab === 'sector' && <SectorBar breakdown={analysis.allocation} />}

      {tab === 'ai' && (
        <div className="prose prose-sm max-w-none prose-headings:text-zinc-900 prose-strong:text-zinc-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis.aiNarrative}</ReactMarkdown>
        </div>
      )}

      {analysis.fire && (
        <div className="mt-6 rounded-lg bg-brand-50 p-4 text-sm text-brand-900">
          <strong>Proyección FIRE:</strong> con {formatEUR(analysis.fire.monthlyContribution)}/mes y un 7 % de rentabilidad,
          alcanzas {formatEUR(analysis.fire.targetAmount)} en{' '}
          {analysis.fire.yearsToFire === Infinity ? 'más de 50 años' : `${analysis.fire.yearsToFire} años`}.
        </div>
      )}
    </Card>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-zinc-50 p-3">
      <div className="text-xs uppercase tracking-wide text-zinc-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-zinc-900">{value}</div>
    </div>
  )
}
