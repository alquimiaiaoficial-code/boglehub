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

      {/*
        Avisos de posiciones que no han entrado en el análisis.
        Añadido el 11-sep-2026. `route.ts` llevaba produciendo estos `warnings` desde
        siempre, el tipo los declaraba y el cliente los guardaba en estado... y no se
        pintaban en ningún sitio. O sea que a quien mezclaba ETFs del catálogo con fondos
        indexados se le enseñaba un reparto que suma 100 % **sin decirle que ese 100 %
        describe solo una parte de su cartera**.
        No era una dilución de porcentajes —la posición sin precio queda fuera del total y
        el resto suma bien— y por eso no lo cazó ninguna revisión de números: el dato era
        correcto y lo que faltaba era el contexto que lo hace legible.
        Va ARRIBA y no al pie a propósito: un aviso que explica que faltan posiciones no
        sirve después de que alguien haya leído los porcentajes.
      */}
      {analysis.warnings?.length > 0 && (
        <div
          role="status"
          className="mt-3 rounded-lg border border-warn/40 bg-warn/10 p-4 text-sm text-fg"
        >
          <p className="font-medium">Este análisis no incluye toda tu cartera</p>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-fg-muted">
            {analysis.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <p className="mt-2 text-fg-muted">
            Los porcentajes de abajo se calculan solo con las posiciones que sí hemos podido
            valorar.
          </p>
        </div>
      )}

      {/*
        De dónde sale la exposición de cada fondo.

        Esto no es letra pequeña: el reparto por región y sector de un fondo se calcula con
        los datos del ETF que replica su mismo índice, y eso hay que decirlo donde se ven los
        números, no en una página de metodología que nadie abre.

        Y va justo aquí, entre los avisos y las pestañas, por lo mismo que los avisos van
        arriba: una explicación de cómo se ha calculado algo llega tarde después de que la
        persona ya haya leído el porcentaje y se lo haya creído.
      */}
      {analysis.fuentesDeExposicion != null && analysis.fuentesDeExposicion.length > 0 && (
        <div className="mt-3 rounded-lg border border-border bg-surface-2 p-4 text-sm">
          <p className="font-medium text-fg">Cómo hemos calculado tus fondos</p>
          <p className="mt-1 text-fg-muted">
            Un fondo indexado no publica su reparto por región y sector, pero sí el índice que
            replica. Tomamos la exposición del ETF que sigue ese mismo índice. La comisión que
            usamos es siempre la del fondo, no la del ETF.
          </p>
          <ul className="mt-3 space-y-2">
            {analysis.fuentesDeExposicion.map((f) => (
              <li key={f.isin} className="text-fg-muted">
                <span className="text-fg">{f.fondo}</span>{' '}
                <span className="text-fg-subtle">({f.isin})</span>
                <br />
                Índice: {f.indiceDelFondo} · exposición tomada de {f.exposicionTomadaDe} · TER{' '}
                {f.ter} %
                {f.calidad === 'aproximada' && (
                  <span className="mt-1 block text-amber-500">Es una aproximación. {f.nota}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

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
        <div>
          <p className="mb-3 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-fg-muted">
            Texto generado por una inteligencia artificial a partir de los datos que has
            introducido. Puede contener errores: contrástalo antes de tomar ninguna decisión.
          </p>
          <div className="prose prose-sm prose-invert max-w-none prose-headings:text-fg prose-strong:text-fg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis.aiNarrative}</ReactMarkdown>
          </div>
        </div>
      )}

      {analysis.fire && (
        <div className="mt-6 rounded-lg bg-accent/10 border border-accent/30 p-4 text-sm text-accent">
          <strong>Proyección FIRE:</strong> con {formatEUR(analysis.fire.monthlyContribution)}/mes y un 7 % de rentabilidad,
          alcanzas {formatEUR(analysis.fire.targetAmount)} en{' '}
          {analysis.fire.yearsToFire === Infinity ? 'más de 50 años' : `${analysis.fire.yearsToFire} años`}.
          <span className="mt-2 block text-xs opacity-80">
            Es un supuesto fijo del 7 % anual, no una previsión: la rentabilidad real es
            desconocida y puede ser negativa.
          </span>
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
