'use client'

import { useMemo, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { formatEUR } from '@/lib/utils'

interface YearRow {
  year: number
  balance: number
  totalContributed: number
  totalInterest: number
}

function calcCompound(
  initialCapital: number,
  monthlyContribution: number,
  years: number,
  annualReturnPct: number
): YearRow[] {
  const monthlyReturn = annualReturnPct / 100 / 12
  const rows: YearRow[] = []
  let balance = initialCapital

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyReturn) + monthlyContribution
    }
    const totalContributed = initialCapital + monthlyContribution * 12 * y
    rows.push({
      year: y,
      balance: Math.round(balance),
      totalContributed: Math.round(totalContributed),
      totalInterest: Math.round(balance - totalContributed),
    })
  }
  return rows
}

export function CompoundInterestCalculator() {
  const [initialCapital, setInitialCapital] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(300)
  const [years, setYears] = useState(20)
  const [annualReturn, setAnnualReturn] = useState(7)

  const rows = useMemo(
    () => calcCompound(initialCapital, monthlyContribution, years, annualReturn),
    [initialCapital, monthlyContribution, years, annualReturn]
  )

  const last = rows[rows.length - 1]
  const totalAccumulated = last?.balance ?? 0
  const totalInterest = last?.totalInterest ?? 0
  const totalContributed = last?.totalContributed ?? 0

  const chartData = rows.map((r) => ({
    año: `Año ${r.year}`,
    'Capital + aportaciones': r.totalContributed,
    'Intereses generados': r.totalInterest,
    'Balance total': r.balance,
  }))

  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Calculadora de interés compuesto
            </h1>
            <p className="mt-2 text-fg-muted">
              Descubre cómo tu inversión crece exponencialmente con el paso del tiempo.
            </p>
          </header>

          {/* Inputs */}
          <Card className="mb-6">
            <CardTitle className="mb-4">Parámetros</CardTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-fg-muted mb-1">Capital inicial (€)</label>
                <Input
                  type="number"
                  min={0}
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Math.max(0, parseFloat(e.target.value) || 0))}
                />
              </div>
              <div>
                <label className="block text-xs text-fg-muted mb-1">Aporte mensual (€)</label>
                <Input
                  type="number"
                  min={0}
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Math.max(0, parseFloat(e.target.value) || 0))}
                />
              </div>
              <div>
                <label className="block text-xs text-fg-muted mb-1">Años</label>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={years}
                  onChange={(e) => setYears(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                />
              </div>
              <div>
                <label className="block text-xs text-fg-muted mb-1">Rentabilidad anual (%)</label>
                <Input
                  type="number"
                  min={0}
                  max={30}
                  step={0.1}
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Math.max(0, parseFloat(e.target.value) || 0))}
                />
              </div>
            </div>
          </Card>

          {/* Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">Total acumulado</p>
              <p className="text-2xl font-bold text-accent">{formatEUR(totalAccumulated)}</p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">Total aportado</p>
              <p className="text-2xl font-bold text-fg">{formatEUR(totalContributed)}</p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">Total intereses</p>
              <p className="text-2xl font-bold text-brand-400">{formatEUR(totalInterest)}</p>
            </Card>
          </div>

          {/* Chart */}
          <Card className="mb-6">
            <CardTitle className="mb-4">Evolución del capital</CardTitle>
            <div className="h-80 w-full">
              <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="año"
                    tick={{ fontSize: 11, fill: '#a1a1aa' }}
                    interval={Math.floor(years / 5)}
                  />
                  <YAxis
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 11, fill: '#a1a1aa' }}
                  />
                  <Tooltip
                    formatter={(value) => [formatEUR(Number(value)), '']}
                    contentStyle={{
                      background: '#1a1a2e',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: '#a1a1aa' }}
                  />
                  <Legend wrapperStyle={{ color: '#a1a1aa', fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="Capital + aportaciones"
                    stroke="#60a5fa"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Intereses generados"
                    stroke="#34d399"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Balance total"
                    stroke="#fbbf24"
                    dot={false}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Table */}
          <Card>
            <CardTitle className="mb-4">Detalle por año</CardTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-fg-muted text-xs uppercase tracking-wide">
                    <th className="pb-3 pr-4">Año</th>
                    <th className="pb-3 pr-4 text-right">Aportado</th>
                    <th className="pb-3 pr-4 text-right">Intereses</th>
                    <th className="pb-3 text-right">Balance total</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.year}
                      className="border-b border-border/50 hover:bg-surface-2/30 transition-colors"
                    >
                      <td className="py-2 pr-4 text-fg-muted font-mono">{row.year}</td>
                      <td className="py-2 pr-4 text-right font-mono text-fg-muted">
                        {formatEUR(row.totalContributed)}
                      </td>
                      <td className="py-2 pr-4 text-right font-mono text-brand-400">
                        {formatEUR(row.totalInterest)}
                      </td>
                      <td className="py-2 text-right font-mono font-semibold text-fg">
                        {formatEUR(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
