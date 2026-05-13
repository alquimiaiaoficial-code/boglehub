'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { AllocationBreakdown } from '@/types/analysis'
import { ChartTooltip } from './ChartTooltip'

const COLORS = ['#3b82f6', '#10b981', '#60a5fa', '#34d399', '#fbbf24', '#f87171']

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
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={100}
            paddingAngle={2}
            stroke="#0a0a0a"
            strokeWidth={2}
          >
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <ChartTooltip />
          <Legend
            wrapperStyle={{ color: '#a1a1aa', fontSize: '12px' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
