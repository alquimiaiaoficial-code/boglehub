'use client'

import { useMemo } from 'react'
import { Layers } from 'lucide-react'
import { usePortfolio } from '@/lib/store'
import { computeOverlaps } from '@/lib/overlap'
import { Card, CardTitle } from '@/components/ui/Card'

export function OverlapAnalysis() {
  const positions = usePortfolio((s) => s.positions)
  const overlaps = useMemo(() => computeOverlaps(positions), [positions])

  if (positions.length < 2 || overlaps.length === 0) return null

  const highOverlap = overlaps.filter((o) => o.overlapPct >= 0.6)
  const top = overlaps.slice(0, 6)

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Layers className="h-5 w-5 text-brand-400" />
        <CardTitle>Solapamiento entre tus ETFs</CardTitle>
      </div>
      <p className="mt-2 text-sm text-fg-muted">
        Cuánta exposición geográfica comparten tus ETFs. Un solapamiento alto significa que
        probablemente estás comprando lo mismo dos veces — pagando dos comisiones por una sola
        diversificación.
      </p>

      {highOverlap.length > 0 && (
        <div className="mt-4 rounded-lg bg-warn/10 border border-warn/30 px-4 py-3 text-sm text-warn">
          Detectamos {highOverlap.length}{' '}
          {highOverlap.length === 1 ? 'par de ETFs muy solapados' : 'pares de ETFs muy solapados'}.
          Plantéate si necesitas ambos o si uno solo cubre esa exposición.
        </div>
      )}

      <ul className="mt-4 space-y-2.5">
        {top.map((o) => {
          const pct = Math.round(o.overlapPct * 100)
          const color = pct >= 60 ? 'text-warn' : pct >= 30 ? 'text-fg' : 'text-accent'
          return (
            <li key={`${o.tickerA}-${o.tickerB}`} className="flex items-center gap-3 text-sm">
              <span className="font-mono text-fg w-28 shrink-0">
                {o.tickerA} · {o.tickerB}
              </span>
              <div className="flex-1 h-2 rounded-full bg-surface-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className={`font-mono font-semibold ${color} w-12 text-right shrink-0`}>
                {pct}%
              </span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
