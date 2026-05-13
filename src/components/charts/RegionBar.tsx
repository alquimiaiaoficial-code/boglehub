'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'
import { AllocationBreakdown } from '@/types/analysis'
import { ChartTooltip } from './ChartTooltip'

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
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#262626" horizontal={false} />
          <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fill: '#71717a', fontSize: 11 }} axisLine={{ stroke: '#262626' }} tickLine={false} />
          <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} />
          <ChartTooltip />
          <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
