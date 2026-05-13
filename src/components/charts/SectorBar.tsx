'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { AllocationBreakdown } from '@/types/analysis'

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
    return <div className="text-sm text-zinc-500 py-8 text-center">No hay datos de sectores disponibles para esta cartera.</div>
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 120 }}>
          <XAxis type="number" tickFormatter={(v) => `${v}%`} />
          <YAxis type="category" dataKey="name" width={120} />
          <Tooltip formatter={(v: any) => `${Number(v).toFixed(1)}%`} />
          <Bar dataKey="value" fill="#36aaf5" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
