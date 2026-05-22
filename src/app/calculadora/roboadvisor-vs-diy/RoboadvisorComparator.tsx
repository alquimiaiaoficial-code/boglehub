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
import { Card, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { cn, formatEUR } from '@/lib/utils'

interface RoboPreset {
  id: string
  name: string
  /** Coste total anual orientativo: gestión + custodia + TER de los fondos. */
  cost: number
}

/**
 * Costes totales orientativos para cuentas pequeñas (patrimonio bajo el primer
 * tramo). Las comisiones bajan a medida que crece el patrimonio, así que el
 * campo es editable: cada quien debe verificar la cifra actual en la web del
 * roboadvisor antes de fiarse del resultado.
 */
const ROBO_PRESETS: RoboPreset[] = [
  { id: 'indexa', name: 'Indexa Capital', cost: 0.6 },
  { id: 'finizens', name: 'Finizens', cost: 0.55 },
  { id: 'myinvestor', name: 'MyInvestor', cost: 0.57 },
  { id: 'inbestme', name: 'InbestMe', cost: 0.7 },
]

interface ScenarioRow {
  year: number
  diy: number
  robo: number
  gap: number
}

/**
 * Proyecta dos carteras idénticas en rentabilidad bruta pero con distinto
 * coste anual. La rentabilidad neta se aproxima como bruta − coste, que es la
 * convención del sector y suficiente para una herramienta educativa.
 */
function project(
  initialCapital: number,
  monthlyContribution: number,
  years: number,
  grossReturn: number,
  roboCost: number,
  diyCost: number
): ScenarioRow[] {
  const roboMonthly = (grossReturn - roboCost) / 100 / 12
  const diyMonthly = (grossReturn - diyCost) / 100 / 12
  const rows: ScenarioRow[] = []
  let robo = initialCapital
  let diy = initialCapital

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      robo = robo * (1 + roboMonthly) + monthlyContribution
      diy = diy * (1 + diyMonthly) + monthlyContribution
    }
    rows.push({
      year: y,
      robo: Math.round(robo),
      diy: Math.round(diy),
      gap: Math.round(diy - robo),
    })
  }
  return rows
}

export function RoboadvisorComparator() {
  const [initialCapital, setInitialCapital] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(300)
  const [years, setYears] = useState(25)
  const [grossReturn, setGrossReturn] = useState(7)
  const [roboId, setRoboId] = useState('indexa')
  const [roboCost, setRoboCost] = useState(0.6)
  const [diyCost, setDiyCost] = useState(0.15)

  const rows = useMemo(
    () => project(initialCapital, monthlyContribution, years, grossReturn, roboCost, diyCost),
    [initialCapital, monthlyContribution, years, grossReturn, roboCost, diyCost]
  )

  const last = rows[rows.length - 1]
  const diyFinal = last?.diy ?? 0
  const roboFinal = last?.robo ?? 0
  const gap = last?.gap ?? 0
  const diyWins = gap >= 0
  const gapPct = roboFinal > 0 ? Math.abs(gap / roboFinal) * 100 : 0
  const roboLabel = ROBO_PRESETS.find((p) => p.id === roboId)?.name ?? 'Roboadvisor'

  const chartData = rows.map((r) => ({
    año: `Año ${r.year}`,
    diy: r.diy,
    robo: r.robo,
  }))

  function selectRobo(preset: RoboPreset) {
    setRoboId(preset.id)
    setRoboCost(preset.cost)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Selección de roboadvisor */}
      <Card className="mb-6">
        <CardTitle className="mb-1">¿Con qué roboadvisor te comparas?</CardTitle>
        <p className="text-xs text-fg-subtle mb-4">
          Costes totales orientativos (gestión + custodia + comisiones de los fondos) para
          cuentas pequeñas. Bajan al crecer el patrimonio: ajusta la cifra con el dato real.
        </p>
        <div className="flex flex-wrap gap-2">
          {ROBO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => selectRobo(preset)}
              className={cn(
                'rounded-lg border px-3 py-2 text-sm transition-colors',
                roboId === preset.id
                  ? 'border-brand-500 bg-brand-500/10 text-fg'
                  : 'border-border bg-surface-2 text-fg-muted hover:text-fg'
              )}
            >
              {preset.name}
              <span className="ml-1.5 text-xs text-fg-subtle">{preset.cost}%</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Parámetros */}
      <Card className="mb-6">
        <CardTitle className="mb-4">Tus parámetros</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <label className="block text-xs text-fg-muted mb-1">Años</label>
            <Input
              type="number"
              min={1}
              max={50}
              value={years}
              onChange={(e) =>
                setYears(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))
              }
            />
          </div>
          <div>
            <label className="block text-xs text-fg-muted mb-1">
              Rentabilidad anual bruta (%)
            </label>
            <Input
              type="number"
              min={0}
              max={30}
              step={0.1}
              value={grossReturn}
              onChange={(e) => setGrossReturn(Math.max(0, parseFloat(e.target.value) || 0))}
            />
            <p className="mt-1 text-[11px] text-fg-subtle">
              Antes de costes. Misma cifra para ambas carteras.
            </p>
          </div>
          <div>
            <label className="block text-xs text-fg-muted mb-1">
              Coste total roboadvisor (%)
            </label>
            <Input
              type="number"
              min={0}
              max={3}
              step={0.01}
              value={roboCost}
              onChange={(e) => {
                setRoboCost(Math.max(0, parseFloat(e.target.value) || 0))
                setRoboId('custom')
              }}
            />
            <p className="mt-1 text-[11px] text-fg-subtle">Gestión + custodia + fondos.</p>
          </div>
          <div>
            <label className="block text-xs text-fg-muted mb-1">
              Coste total cartera DIY (%)
            </label>
            <Input
              type="number"
              min={0}
              max={3}
              step={0.01}
              value={diyCost}
              onChange={(e) => setDiyCost(Math.max(0, parseFloat(e.target.value) || 0))}
            />
            <p className="mt-1 text-[11px] text-fg-subtle">
              TER de tus fondos o ETF, más custodia del bróker si la hay.
            </p>
          </div>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="text-center">
          <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">Cartera DIY</p>
          <p className="text-2xl font-bold text-accent">{formatEUR(diyFinal)}</p>
          <p className="text-xs text-fg-subtle mt-1">gestionada por ti</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
            Con {roboLabel}
          </p>
          <p className="text-2xl font-bold text-fg">{formatEUR(roboFinal)}</p>
          <p className="text-xs text-fg-subtle mt-1">cartera con roboadvisor</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
            Diferencia a {years} años
          </p>
          <p className="text-2xl font-bold text-warn">{formatEUR(Math.abs(gap))}</p>
          <p className="text-xs text-fg-subtle mt-1">{gapPct.toFixed(1)}% de la cartera</p>
        </Card>
      </div>

      {/* Lectura del resultado */}
      <div className="mb-6 rounded-xl border border-warn/30 bg-warn-dim p-5">
        {diyWins ? (
          <p className="text-sm text-fg leading-relaxed">
            Con estos datos, montar tú la cartera deja{' '}
            <strong className="text-warn">{formatEUR(gap)}</strong> más en tu bolsillo tras{' '}
            {years} años. Es lo que cuesta delegar la gestión en {roboLabel}. No es dinero
            perdido sin más: a cambio el roboadvisor rebalancea solo, automatiza las
            aportaciones y te quita la cartera de las manos en una caída. Si eso evita que
            vendas en pánico una sola vez, puede salir a cuenta. La pregunta no es cuál es
            más barato, sino cuál vas a mantener 25 años.
          </p>
        ) : (
          <p className="text-sm text-fg leading-relaxed">
            Con los costes que has introducido, {roboLabel} acabaría{' '}
            <strong className="text-warn">{formatEUR(Math.abs(gap))}</strong> por delante.
            Revisa las cifras: lo habitual es que un roboadvisor cueste más que una cartera
            DIY bien montada. Comprueba que el coste DIY incluye el TER real de tus fondos.
          </p>
        )}
      </div>

      {/* Gráfica */}
      <Card className="mb-6">
        <CardTitle className="mb-4">Evolución de las dos carteras</CardTitle>
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
                formatter={(value, name) => [formatEUR(Number(value)), name as string]}
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
                dataKey="diy"
                name="Cartera DIY"
                stroke="#10b981"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="robo"
                name={`Con ${roboLabel}`}
                stroke="#f59e0b"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-xs text-fg-subtle">
          El hueco entre las dos líneas es el coste acumulado de la comisión. Empieza casi
          invisible y se ensancha cada año porque el dinero que pagas en comisiones también
          dejaría de componer.
        </p>
      </Card>

      {/* Tabla */}
      <Card>
        <CardTitle className="mb-4">Detalle por año</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-fg-muted text-xs uppercase tracking-wide">
                <th className="pb-3 pr-4">Año</th>
                <th className="pb-3 pr-4 text-right">Cartera DIY</th>
                <th className="pb-3 pr-4 text-right">Con roboadvisor</th>
                <th className="pb-3 text-right">Diferencia</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.year}
                  className="border-b border-border/50 hover:bg-surface-2/30 transition-colors"
                >
                  <td className="py-2 pr-4 text-fg-muted font-mono">{row.year}</td>
                  <td className="py-2 pr-4 text-right font-mono text-accent">
                    {formatEUR(row.diy)}
                  </td>
                  <td className="py-2 pr-4 text-right font-mono text-fg-muted">
                    {formatEUR(row.robo)}
                  </td>
                  <td className="py-2 text-right font-mono font-semibold text-warn">
                    {formatEUR(row.gap)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
