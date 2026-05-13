'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { AllocationBreakdown } from '@/types/analysis'

const COLORS = ['#0e8ee6', '#36aaf5', '#7cc7fb', '#bae0fd', '#e0eefe', '#0259a0']

const LABEL_MAP: Record<string, string> = {
  EQUITY: 'Renta variable',
  BOND: 'Renta fija',
  COMMODITY: 'Materias primas',
  REIT: 'Inmobiliario',
  CASH: 'Liquidez',
  MIXED: 'Mixto',
}

export function AllocationPie({ breakdown }: { breakdown: AllocationBreakdown }) {
  const data = Object.entries(breakdown.byAssetClass)
    .filter(([, val]) => val > 0)
    .map(([key, value]) => ({ name: LABEL_MAP[key] ?? key, value: value * 100 }))

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={(d: { value: number }) => `${d.value.toFixed(1)}%`}
          >
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: any) => `${Number(v).toFixed(1)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
