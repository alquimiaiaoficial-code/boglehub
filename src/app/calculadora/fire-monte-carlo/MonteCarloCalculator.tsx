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
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { formatEUR, formatPct } from '@/lib/utils'
import { runMonteCarlo } from '@/lib/monte-carlo'

const SIMULATIONS = 1000
const MEAN_RETURN = 0.07
const STD_RETURN = 0.15

export function MonteCarloCalculator() {
  const [initialCapital, setInitialCapital] = useState(50_000)
  const [monthlyContribution, setMonthlyContribution] = useState(800)
  const [yearsToRetire, setYearsToRetire] = useState(20)
  const [annualSpending, setAnnualSpending] = useState(24_000)
  const [yearsInRetirement, setYearsInRetirement] = useState(35)

  const result = useMemo(
    () =>
      runMonteCarlo({
        initialCapital,
        monthlyContribution,
        yearsToRetire,
        annualSpendingInRetirement: annualSpending,
        yearsInRetirement,
        meanReturn: MEAN_RETURN,
        stdReturn: STD_RETURN,
        simulations: SIMULATIONS,
      }),
    [initialCapital, monthlyContribution, yearsToRetire, annualSpending, yearsInRetirement]
  )

  const chartData = useMemo(
    () =>
      result.percentiles.p50.map((_, year) => ({
        año: year,
        'Escenario malo (p10)': Math.round(result.percentiles.p10[year]),
        'Escenario medio (p50)': Math.round(result.percentiles.p50[year]),
        'Escenario bueno (p90)': Math.round(result.percentiles.p90[year]),
        'Proyección lineal': Math.round(result.linearProjection[year]),
      })),
    [result]
  )

  const successPct = result.successRate
  const successColor =
    successPct >= 0.85 ? 'text-accent' : successPct >= 0.6 ? 'text-warn' : 'text-danger'
  const successLabel =
    successPct >= 0.85
      ? 'Plan sólido'
      : successPct >= 0.6
        ? 'Plan ajustado'
        : 'Plan en riesgo'

  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Calculadora Monte Carlo para tu jubilación
            </h1>
            <p className="mt-2 text-fg-muted">
              Simulamos {SIMULATIONS.toLocaleString('es-ES')} escenarios de mercado con volatilidad
              real para estimar si tu cartera aguanta toda tu jubilación.
            </p>
          </header>

          {/* Inputs */}
          <Card className="mb-6">
            <CardTitle className="mb-4">Tu plan</CardTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                  onChange={(e) =>
                    setMonthlyContribution(Math.max(0, parseFloat(e.target.value) || 0))
                  }
                />
              </div>
              <div>
                <label className="block text-xs text-fg-muted mb-1">Años hasta jubilarte</label>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={yearsToRetire}
                  onChange={(e) =>
                    setYearsToRetire(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))
                  }
                />
              </div>
              <div>
                <label className="block text-xs text-fg-muted mb-1">Gasto anual jubilado (€)</label>
                <Input
                  type="number"
                  min={0}
                  value={annualSpending}
                  onChange={(e) => setAnnualSpending(Math.max(0, parseFloat(e.target.value) || 0))}
                />
              </div>
              <div>
                <label className="block text-xs text-fg-muted mb-1">Años de jubilación</label>
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={yearsInRetirement}
                  onChange={(e) =>
                    setYearsInRetirement(Math.min(60, Math.max(1, parseInt(e.target.value) || 1)))
                  }
                />
              </div>
            </div>
          </Card>

          {/* Success rate hero */}
          <Card className="mb-6 text-center">
            <p className="text-xs text-fg-subtle uppercase tracking-wide mb-2">
              Probabilidad de éxito
            </p>
            <p className={`text-6xl font-bold ${successColor}`}>{formatPct(successPct, 0)}</p>
            <p className={`mt-2 text-sm font-medium ${successColor}`}>{successLabel}</p>
            <p className="mt-3 text-sm text-fg-muted max-w-lg mx-auto">
              En {formatPct(successPct, 0)} de los {SIMULATIONS.toLocaleString('es-ES')} escenarios
              simulados, tu cartera <strong>no se agota</strong> antes del final de tu jubilación.
            </p>
          </Card>

          {/* Percentile KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
                Escenario malo (p10)
              </p>
              <p className="text-xl font-bold text-danger">
                {formatEUR(result.percentiles.p10[result.totalYears])}
              </p>
              <p className="text-xs text-fg-subtle mt-1">balance final</p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
                Escenario medio (p50)
              </p>
              <p className="text-xl font-bold text-fg">{formatEUR(result.medianFinalBalance)}</p>
              <p className="text-xs text-fg-subtle mt-1">balance final</p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
                Escenario bueno (p90)
              </p>
              <p className="text-xl font-bold text-accent">
                {formatEUR(result.percentiles.p90[result.totalYears])}
              </p>
              <p className="text-xs text-fg-subtle mt-1">balance final</p>
            </Card>
          </div>

          {/* Chart */}
          <Card className="mb-6">
            <CardTitle className="mb-4">Evolución de tu cartera</CardTitle>
            <div className="h-96 w-full">
              <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="año"
                    tick={{ fontSize: 11, fill: '#a1a1aa' }}
                    tickFormatter={(v: number) => `Año ${v}`}
                    interval={Math.floor(result.totalYears / 6)}
                  />
                  <YAxis
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 11, fill: '#a1a1aa' }}
                  />
                  <Tooltip
                    formatter={(value) => [formatEUR(Number(value)), '']}
                    labelFormatter={(label) => `Año ${label}`}
                    contentStyle={{
                      background: '#141414',
                      border: '1px solid #262626',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: '#a1a1aa' }}
                  />
                  <Legend wrapperStyle={{ color: '#a1a1aa', fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="Escenario bueno (p90)"
                    stroke="#34d399"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Escenario medio (p50)"
                    stroke="#60a5fa"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Escenario malo (p10)"
                    stroke="#f87171"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Proyección lineal"
                    stroke="#71717a"
                    dot={false}
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Educational copy */}
          <Card className="mb-6">
            <CardTitle className="mb-3">¿Qué es una simulación Monte Carlo?</CardTitle>
            <div className="space-y-3 text-sm text-fg-muted leading-relaxed">
              <p>
                Una proyección lineal asume que el mercado sube exactamente un 7 % cada año. La
                realidad es muy distinta: un año sube un 25 %, al siguiente baja un 18 %. Esa
                volatilidad importa — y mucho — porque sufrir una caída justo al empezar a retirar
                dinero puede arruinar un plan que sobre el papel parecía sólido.
              </p>
              <p>
                El método Monte Carlo simula {SIMULATIONS.toLocaleString('es-ES')} vidas
                financieras posibles, cada una con rentabilidades aleatorias basadas en la
                volatilidad histórica real del mercado mundial (media {formatPct(MEAN_RETURN, 0)},
                desviación estándar {formatPct(STD_RETURN, 0)}). El resultado no es un número
                único, sino una <strong>probabilidad</strong>: en cuántos de esos escenarios tu
                plan funciona.
              </p>
              <p>
                La línea gris discontinua es la proyección lineal tradicional. Fíjate cómo casi
                siempre es más optimista que el escenario medio real: por eso las proyecciones
                lineales engañan.
              </p>
            </div>
          </Card>

          {/* CTA */}
          <Card className="text-center">
            <p className="text-fg-muted text-sm">
              ¿Tienes dudas sobre tu plan de jubilación?{' '}
              <Link
                href="/chat"
                className="text-brand-400 hover:text-brand-300 underline-offset-4 hover:underline"
              >
                Pregúntale al Chat IA
              </Link>{' '}
              o{' '}
              <Link
                href="/analyzer"
                className="text-brand-400 hover:text-brand-300 underline-offset-4 hover:underline"
              >
                analiza tu cartera
              </Link>
              .
            </p>
          </Card>

          <p className="mt-6 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Las simulaciones se basan en datos
            históricos y no garantizan resultados futuros.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
