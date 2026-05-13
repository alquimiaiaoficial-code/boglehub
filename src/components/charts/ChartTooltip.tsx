'use client'

import { Tooltip } from 'recharts'

interface TooltipPayload {
  name: string
  value: number
  payload?: { name?: string }
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload || payload.length === 0) return null
  const item = payload[0]
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 shadow-xl">
      <p className="text-xs text-fg-muted">{item.name || item.payload?.name}</p>
      <p className="text-sm font-semibold text-fg font-mono">{item.value.toFixed(2)}%</p>
    </div>
  )
}

export function ChartTooltip() {
  return <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} />
}
