'use client'

import { useState } from 'react'
import { usePortfolio } from '@/lib/store'
import { PortfolioInput } from '@/components/PortfolioInput'
import { PortfolioTable } from '@/components/PortfolioTable'
import { AnalysisResults } from '@/components/AnalysisResults'
import { Button } from '@/components/ui/Button'
import { Card, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Analysis } from '@/types/analysis'

export default function AnalyzerPage() {
  const { positions, monthlyContribution, targetAmount, setMonthlyContribution, setTargetAmount } = usePortfolio()
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
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Analizador de cartera</h1>
        <p className="mt-2 text-zinc-600">Introduce tus posiciones y la IA te da un análisis en español.</p>
      </header>

      <PortfolioInput />
      <PortfolioTable />

      {positions.length > 0 && (
        <Card>
          <CardTitle>Plan FIRE (opcional)</CardTitle>
          <div className="grid grid-cols-2 gap-3 mt-4">
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
      )}

      {error && (
        <Card className="border-red-200 bg-red-50 text-red-800">{error}</Card>
      )}

      <Button onClick={handleAnalyze} disabled={positions.length === 0} loading={loading} size="lg" className="w-full">
        {loading ? 'Analizando...' : 'Analizar cartera con IA'}
      </Button>

      {analysis && <AnalysisResults analysis={analysis} />}
    </main>
  )
}
