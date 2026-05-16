'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { getEtfByTicker, searchEtfs } from '@/lib/etf-database'
import type { EtfMetadata, Region } from '@/types/etf'
import { MessageSquare } from 'lucide-react'

const REGION_LABELS: Record<Region, string> = {
  US: 'EE.UU.',
  EUROPE: 'Europa',
  EM: 'Emergentes',
  JAPAN: 'Japón',
  GLOBAL: 'Global',
  UK: 'Reino Unido',
  PACIFIC_EX_JAPAN: 'Pacífico ex-Japón',
  CHINA: 'China',
  OTHER: 'Otros',
}

const REGION_COLORS = [
  '#3b82f6',
  '#10b981',
  '#60a5fa',
  '#34d399',
  '#fbbf24',
  '#f87171',
  '#a78bfa',
  '#fb923c',
  '#94a3b8',
]

function calcOverlap(a: EtfMetadata, b: EtfMetadata): number {
  let overlap = 0
  const regionsA = a.regionAllocation
  const regionsB = b.regionAllocation
  for (const region of Object.keys(regionsA) as Region[]) {
    overlap += Math.min(regionsA[region] ?? 0, regionsB[region] ?? 0)
  }
  return Math.round(overlap * 100)
}

function regionPieData(etf: EtfMetadata) {
  return Object.entries(etf.regionAllocation)
    .filter(([, v]) => v > 0)
    .map(([key, value]) => ({
      name: REGION_LABELS[key as Region] ?? key,
      value: Math.round(value * 100),
    }))
}

interface AutocompleteProps {
  label: string
  value: string
  onChange: (val: string) => void
  onSelect: (ticker: string) => void
}

function EtfAutocomplete({ label, value, onChange, onSelect }: AutocompleteProps) {
  const [open, setOpen] = useState(false)
  const suggestions = useMemo(() => (value.length >= 1 ? searchEtfs(value) : []), [value])

  return (
    <div className="relative">
      <label className="block text-xs text-fg-muted mb-1">{label}</label>
      <Input
        value={value}
        onChange={(e) => { onChange(e.target.value.toUpperCase()); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Ej: VWCE"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-surface shadow-xl">
          {suggestions.map((etf) => (
            <li
              key={etf.ticker}
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-surface-2 text-sm"
              onMouseDown={() => { onSelect(etf.ticker); setOpen(false) }}
            >
              <span className="font-mono font-semibold text-fg">{etf.ticker}</span>
              <span className="text-fg-muted truncate ml-2">{etf.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function EtfInfoRow({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <tr className="border-b border-border/50">
      <td className="py-2 text-fg-muted text-sm">{label}</td>
      <td className="py-2 text-center font-mono text-sm text-fg">{a}</td>
      <td className="py-2 text-center font-mono text-sm text-fg">{b}</td>
    </tr>
  )
}

export function EtfComparator() {
  const [tickerA, setTickerA] = useState('')
  const [tickerB, setTickerB] = useState('')
  const [inputA, setInputA] = useState('')
  const [inputB, setInputB] = useState('')

  const etfA = useMemo(() => (tickerA ? getEtfByTicker(tickerA) : null), [tickerA])
  const etfB = useMemo(() => (tickerB ? getEtfByTicker(tickerB) : null), [tickerB])

  const overlap = useMemo(() => {
    if (!etfA || !etfB) return null
    return calcOverlap(etfA, etfB)
  }, [etfA, etfB])

  const pieA = useMemo(() => (etfA ? regionPieData(etfA) : []), [etfA])
  const pieB = useMemo(() => (etfB ? regionPieData(etfB) : []), [etfB])

  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Comparar ETFs
            </h1>
            <p className="mt-2 text-fg-muted">
              Elige dos ETFs para ver sus diferencias en detalle: costes, geografía y solapamiento.
            </p>
          </header>

          {/* Ticker inputs */}
          <Card className="mb-6">
            <CardTitle className="mb-4">Selecciona dos ETFs</CardTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <EtfAutocomplete
                label="ETF A"
                value={inputA}
                onChange={(v) => { setInputA(v); setTickerA(v) }}
                onSelect={(t) => { setInputA(t); setTickerA(t) }}
              />
              <EtfAutocomplete
                label="ETF B"
                value={inputB}
                onChange={(v) => { setInputB(v); setTickerB(v) }}
                onSelect={(t) => { setInputB(t); setTickerB(t) }}
              />
            </div>

            {/* Not-found warnings */}
            {tickerA.length >= 2 && !etfA && (
              <p className="mt-2 text-xs text-warn">ETF A no encontrado en la base de datos.</p>
            )}
            {tickerB.length >= 2 && !etfB && (
              <p className="mt-2 text-xs text-warn">ETF B no encontrado en la base de datos.</p>
            )}
          </Card>

          {etfA && etfB && (
            <>
              {/* Overlap badge */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`rounded-xl border px-5 py-3 text-center ${
                    (overlap ?? 0) > 70
                      ? 'border-danger/30 bg-danger-dim text-danger'
                      : (overlap ?? 0) > 40
                      ? 'border-warn/30 bg-warn/10 text-warn'
                      : 'border-accent/30 bg-accent/10 text-accent'
                  }`}
                >
                  <p className="text-3xl font-bold font-mono">{overlap}%</p>
                  <p className="text-xs mt-1">Solapamiento estimado por región</p>
                </div>
                <p className="text-sm text-fg-muted max-w-sm">
                  {(overlap ?? 0) > 70
                    ? 'Alto solapamiento: ambos ETFs invierten en regiones muy similares.'
                    : (overlap ?? 0) > 40
                    ? 'Solapamiento moderado: comparten algunas regiones pero ofrecen diversificación.'
                    : 'Bajo solapamiento: buena complementariedad para una cartera diversificada.'}
                </p>
              </div>

              {/* Comparison table */}
              <Card className="mb-6">
                <CardTitle className="mb-4">Ficha comparativa</CardTitle>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-xs uppercase tracking-wide text-fg-muted">
                        <th className="pb-3 text-left pr-4">Campo</th>
                        <th className="pb-3 text-center pr-4">{etfA.ticker}</th>
                        <th className="pb-3 text-center">{etfB.ticker}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <EtfInfoRow label="Nombre" a={etfA.name} b={etfB.name} />
                      <EtfInfoRow label="ISIN" a={etfA.isin ?? '—'} b={etfB.isin ?? '—'} />
                      <EtfInfoRow label="TER" a={`${etfA.ter.toFixed(2)}%`} b={`${etfB.ter.toFixed(2)}%`} />
                      <EtfInfoRow label="Clase de activo" a={etfA.assetClass} b={etfB.assetClass} />
                      <EtfInfoRow label="Divisa base" a={etfA.baseCurrency} b={etfB.baseCurrency} />
                      <EtfInfoRow
                        label="Acumulativo"
                        a={etfA.accumulating ? 'Sí' : 'No'}
                        b={etfB.accumulating ? 'Sí' : 'No'}
                      />
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Side-by-side pies */}
              <Card className="mb-6">
                <CardTitle className="mb-4">Distribución geográfica</CardTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { etf: etfA, data: pieA },
                    { etf: etfB, data: pieB },
                  ].map(({ etf, data }) => (
                    <div key={etf.ticker}>
                      <p className="text-center text-sm font-semibold text-fg mb-2">{etf.ticker}</p>
                      <div className="h-64">
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie
                              data={data}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              paddingAngle={2}
                              stroke="#0a0a0a"
                              strokeWidth={2}
                            >
                              {data.map((_, i) => (
                                <Cell key={i} fill={REGION_COLORS[i % REGION_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(v) => [`${Number(v)}%`, '']}
                              contentStyle={{
                                background: '#1a1a2e',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 8,
                                fontSize: 12,
                              }}
                            />
                            <Legend
                              wrapperStyle={{ color: '#a1a1aa', fontSize: '11px' }}
                              iconType="circle"
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* CTA */}
              <Card className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-fg">¿No estás seguro cuál elegir?</p>
                  <p className="text-sm text-fg-muted">Pregúntale al Chat IA y recibe una recomendación personalizada.</p>
                </div>
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 text-sm font-medium transition-colors shrink-0"
                >
                  <MessageSquare className="h-4 w-4" />
                  Pregúntale al Chat IA
                </Link>
              </Card>
            </>
          )}

          {(!etfA || !etfB) && (
            <Card className="text-center py-16">
              <p className="text-fg-muted">Introduce dos tickers para empezar la comparativa.</p>
              <p className="text-xs text-fg-subtle mt-1">Prueba: VWCE vs IWDA, o CSPX vs SXR8</p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
