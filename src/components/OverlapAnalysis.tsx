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
        <CardTitle>Solapamiento geográfico entre tus ETFs</CardTitle>
      </div>
      {/* El nombre lleva "geográfico" a propósito, y la explicación va delante del número.
          Antes el título decía solo "Solapamiento" y el matiz quedaba en el subtítulo: José
          Antonio Rodríguez (Guía Fondos Indexados) avisó de que así el porcentaje se puede
          leer como "empresas realmente repetidas", que es algo que esta herramienta NO mide.
          Su consejo, literal: nombrarlo solapamiento geográfico y explicar brevemente qué
          mide el porcentaje. */}
      <p className="mt-2 text-sm text-fg-muted">
        Este porcentaje mide <strong className="text-fg">cuánta exposición por región
        comparten dos ETF</strong>, no cuántas empresas concretas se repiten entre ellos: para
        eso harían falta datos de participaciones que esta herramienta no usa.
      </p>
      <p className="mt-2 text-sm text-fg-muted">
        Aun así es buen indicio de estar comprando lo mismo dos veces —y pagando dos
        comisiones por una sola diversificación—, sobre todo en el caso típico de sumar un
        fondo global y un S&amp;P 500.
      </p>

      {highOverlap.length > 0 && (
        <div className="mt-4 rounded-lg bg-warn/10 border border-warn/30 px-4 py-3 text-sm text-warn">
          Detectamos {highOverlap.length}{' '}
          {highOverlap.length === 1
            ? 'par de ETF con exposición geográfica muy parecida'
            : 'pares de ETF con exposición geográfica muy parecida'}.
          Merece la pena mirar si uno solo ya cubre esa exposición.
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
