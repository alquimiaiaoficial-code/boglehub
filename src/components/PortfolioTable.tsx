'use client'

import { usePortfolio } from '@/lib/store'
import { Card, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatEUR } from '@/lib/utils'
import { Trash2 } from 'lucide-react'

export function PortfolioTable() {
  const positions = usePortfolio((s) => s.positions)
  const removePosition = usePortfolio((s) => s.removePosition)

  if (positions.length === 0) {
    return (
      <Card className="text-center text-zinc-500">
        <p>Añade tu primera posición para empezar.</p>
      </Card>
    )
  }

  return (
    <Card>
      <CardTitle>Tus posiciones ({positions.length})</CardTitle>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-zinc-500">
              <th className="py-2">Ticker</th>
              <th className="py-2">Participaciones</th>
              <th className="py-2">Precio medio</th>
              <th className="py-2">Coste total</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {positions.map((p) => (
              <tr key={p.id} className="border-b border-zinc-100">
                <td className="py-3 font-medium">{p.ticker}</td>
                <td className="py-3">{p.shares}</td>
                <td className="py-3">{formatEUR(p.avgPrice)}</td>
                <td className="py-3">{formatEUR(p.shares * p.avgPrice)}</td>
                <td className="py-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => removePosition(p.id)} aria-label="Eliminar">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
