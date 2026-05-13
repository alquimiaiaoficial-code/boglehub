'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { AllocationBreakdown } from '@/types/analysis'

const LABEL_MAP: Record<string, string> = {
  US: 'EE. UU.',
  EUROPE: 'Europa',
  EM: 'Emergentes',
  JAPAN: 'Japón',
  GLOBAL: 'Global',
  UK: 'Reino Unido',
  PACIFIC_EX_JAPAN: 'Pacífico ex-JP',
  CHINA: 'China',
  OTHER: 'Otros',
}

export function RegionBar({ breakdown }: { breakdown: AllocationBreakdown }) {
  const data = Object.entries(breakdown.byRegion)
    .filter(([, val]) => val > 0)
    .map(([key, value]) => ({ name: LABEL_MAP[key] ?? key, value: value * 100 }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
          <XAxis type="number" tickFormatter={(v) => `${v}%`} />
          <YAxis type="category" dataKey="name" width={80} />
          <Tooltip formatter={(v: any) => `${Number(v).toFixed(1)}%`} />
          <Bar dataKey="value" fill="#0e8ee6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
