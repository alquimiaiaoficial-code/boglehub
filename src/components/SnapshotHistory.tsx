'use client'

import { usePortfolio } from '@/lib/store'
import { Card, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatEUR } from '@/lib/utils'
import { Trash2, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react'

export function SnapshotHistory() {
  const snapshots = usePortfolio((s) => s.snapshots)
  const deleteSnapshot = usePortfolio((s) => s.deleteSnapshot)
  const restoreSnapshot = usePortfolio((s) => s.restoreSnapshot)

  if (snapshots.length < 2) {
    return (
      <Card>
        <CardTitle>Histórico de tu cartera</CardTitle>
        <p className="mt-3 text-sm text-fg-muted">
          Cada vez que analizas tu cartera guardamos una foto de su valor. Vuelve otro día y verás
          aquí su evolución en el tiempo.
        </p>
        {snapshots.length === 1 && (
          <p className="mt-2 text-xs text-fg-subtle">
            Tienes 1 registro guardado · {formatEUR(snapshots[0].totalValueEUR)}
          </p>
        )}
      </Card>
    )
  }

  // Newest first for display.
  const ordered = [...snapshots].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const latest = ordered[0]
  const oldest = ordered[ordered.length - 1]
  const totalDelta = latest.totalValueEUR - oldest.totalValueEUR
  const totalDeltaPct = oldest.totalValueEUR > 0 ? totalDelta / oldest.totalValueEUR : 0

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardTitle>Histórico de tu cartera</CardTitle>
        <span
          className={`inline-flex items-center gap-1 text-sm font-semibold ${
            totalDelta >= 0 ? 'text-accent' : 'text-danger'
          }`}
        >
          {totalDelta >= 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {totalDelta >= 0 ? '+' : ''}
          {formatEUR(totalDelta)} ({(totalDeltaPct * 100).toFixed(1)}%)
        </span>
      </div>
      <p className="mt-1 text-xs text-fg-subtle">
        Desde el {new Date(oldest.createdAt).toLocaleDateString('es-ES')} · {snapshots.length}{' '}
        registros
      </p>

      <ul className="mt-4 space-y-1">
        {ordered.map((snap, i) => {
          const prev = ordered[i + 1]
          const delta = prev ? snap.totalValueEUR - prev.totalValueEUR : 0
          return (
            <li
              key={snap.id}
              className="flex items-center justify-between border-b border-border py-2 text-sm last:border-0"
            >
              <div className="flex flex-col">
                <span className="text-fg">
                  {new Date(snap.createdAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="text-xs text-fg-subtle">{snap.positions.length} posiciones</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="font-mono font-semibold text-fg">
                    {formatEUR(snap.totalValueEUR)}
                  </span>
                  {prev && (
                    <span
                      className={`block text-xs font-mono ${
                        delta >= 0 ? 'text-accent' : 'text-danger'
                      }`}
                    >
                      {delta >= 0 ? '+' : ''}
                      {formatEUR(delta)}
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => restoreSnapshot(snap.id)}
                    aria-label="Restaurar esta versión"
                    title="Restaurar esta versión de la cartera"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSnapshot(snap.id)}
                    aria-label="Eliminar registro"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
