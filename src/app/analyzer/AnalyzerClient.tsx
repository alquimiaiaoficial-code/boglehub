'use client'

import { useState } from 'react'
import { usePortfolio } from '@/lib/store'
import { PortfolioInput } from '@/components/PortfolioInput'
import { PortfolioTable } from '@/components/PortfolioTable'
import { AnalysisResults } from '@/components/AnalysisResults'
import { PdfUpload } from '@/components/PdfUpload'
import { SnapshotHistory } from '@/components/SnapshotHistory'
import { SharePortfolio } from '@/components/SharePortfolio'
import { OverlapAnalysis } from '@/components/OverlapAnalysis'
import { Button } from '@/components/ui/Button'
import { Card, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Analysis } from '@/types/analysis'
import { Sparkles, AlertTriangle } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export function AnalyzerClient() {
  const {
    positions,
    monthlyContribution,
    targetAmount,
    setMonthlyContribution,
    setTargetAmount,
    saveSnapshot,
  } = usePortfolio()
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          positions,
          monthlyContribution: monthlyContribution || undefined,
          targetAmount: targetAmount || undefined,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      setAnalysis(data.data)
      trackEvent('analysis_completed', { positions: positions.length })
      if (data.data?.allocation?.totalValueEUR != null) {
        saveSnapshot(data.data.allocation.totalValueEUR)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
      <div className="rounded-lg bg-warn/10 border border-warn/30 px-4 py-2 text-sm text-warn mb-6 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
        <span>
          Información educativa, no asesoramiento financiero. Tus datos viven en tu navegador.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <PdfUpload />
          <PortfolioInput />
          <PortfolioTable />
          {positions.length > 0 && (
            <>
              <Card>
                <CardTitle>Plan FIRE (opcional)</CardTitle>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Input
                    type="number"
                    placeholder="Aporte mensual €"
                    value={monthlyContribution || ''}
                    onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
                  />
                  <Input
                    type="number"
                    placeholder="Objetivo €"
                    value={targetAmount || ''}
                    onChange={(e) => setTargetAmount(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </Card>
              <SharePortfolio />
            </>
          )}
          <SnapshotHistory />
        </div>

        <div className="lg:col-span-2 space-y-4">
          {error && (
            <Card className="border-danger/30 bg-danger-dim">
              <p className="text-sm text-danger">{error}</p>
            </Card>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={positions.length === 0}
            loading={loading}
            variant="accent"
            size="lg"
            className="w-full"
          >
            <Sparkles className="h-4 w-4" />
            {loading
              ? 'Analizando con IA...'
              : positions.length === 0
                ? 'Añade posiciones para analizar'
                : 'Analizar cartera con IA'}
          </Button>

          {analysis ? (
            <>
              <AnalysisResults analysis={analysis} />
              <OverlapAnalysis />
            </>
          ) : (
            <Card className="text-center py-16">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-400 mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-fg-muted">Tu análisis aparecerá aquí.</p>
              <p className="text-xs text-fg-subtle mt-1">Tarda ~10 segundos.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
