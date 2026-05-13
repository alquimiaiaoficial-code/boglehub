'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'
import { AllocationBreakdown } from '@/types/analysis'
import { ChartTooltip } from './ChartTooltip'

const LABEL_MAP: Record<string, string> = {
  TECHNOLOGY: 'Tecnología',
  FINANCIAL: 'Financiero',
  HEALTHCARE: 'Salud',
  CONSUMER_DISC: 'Consumo discrecional',
  CONSUMER_STAPLES: 'Consumo básico',
  INDUSTRIAL: 'Industrial',
  ENERGY: 'Energía',
  UTILITIES: 'Utilities',
  MATERIALS: 'Materiales',
  COMMUNICATION: 'Comunicación',
  REAL_ESTATE: 'Inmobiliario',
  DIVERSIFIED: 'Diversificado',
}

export function SectorBar({ breakdown }: { breakdown: AllocationBreakdown }) {
  const data = Object.entries(breakdown.bySector)
    .filter(([, val]) => (val ?? 0) > 0)
    .map(([key, value]) => ({ name: LABEL_MAP[key] ?? key, value: (value ?? 0) * 100 }))
    .sort((a, b) => b.value - a.value)

  if (data.length === 0) {
    return <div className="text-sm text-fg-muted py-12 text-center">No hay datos de sectores disponibles para esta cartera.</div>
  }

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 120, right: 20 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#262626" horizontal={false} />
          <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fill: '#71717a', fontSize: 11 }} axisLine={{ stroke: '#262626' }} tickLine={false} />
          <YAxis type="category" dataKey="name" width={120} tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} />
          <ChartTooltip />
          <Bar dataKey="value" fill="#10b981" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
