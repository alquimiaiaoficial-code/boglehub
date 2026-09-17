'use client'

import { usePortfolio } from '@/lib/store'
import { Card, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatEUR } from '@/lib/utils'
import { buscarFondo } from '@/lib/fondos-analizables'
import { Trash2 } from 'lucide-react'

export function PortfolioTable() {
  const positions = usePortfolio((s) => s.positions)
  const removePosition = usePortfolio((s) => s.removePosition)

  if (positions.length === 0) {
    return (
      <Card className="text-center text-fg-muted">
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
            <tr className="border-b border-border text-left text-fg-muted">
              <th className="py-2">Producto</th>
              <th className="py-2">Cantidad</th>
              <th className="py-2">Precio medio</th>
              <th className="py-2">Coste total</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {/*
              Un fondo y un ETF NO se cuentan igual, y esta tabla los mezclaba.

              Visto probando en producción el 18-sep-2026: una posición de 10.000 € en el
              Vanguard Global Stock aparecía como «IE00B03HCZ61 · Participaciones: 10000 ·
              Precio medio 0 € · Coste total 0 €». Las cuatro celdas engañaban a la vez —el
              ISIN no dice qué producto es, «10000 participaciones» son euros, y los dos ceros
              parecen un error de la herramienta— y el cálculo por detrás era correcto.

              Un dato bien calculado y mal etiquetado se lee mal igual.
            */}
            {positions.map((p) => {
              const fondo = buscarFondo(p.ticker)
              return (
              <tr key={p.id} className="border-b border-border">
                <td className="py-3 font-medium">
                  {fondo ? (
                    <>
                      <span className="block">{fondo.name}</span>
                      <span className="block text-xs font-normal text-fg-subtle">
                        Fondo · {p.ticker}
                      </span>
                    </>
                  ) : (
                    p.ticker
                  )}
                </td>
                {/* Para un fondo la cantidad ES el importe: se enseña en euros y no como un
                    número suelto que se lee como participaciones. */}
                <td className="py-3">{fondo ? formatEUR(p.shares) : p.shares}</td>
                <td className="py-3">
                  {fondo ? <span className="text-fg-subtle">no aplica</span> : formatEUR(p.avgPrice)}
                </td>
                <td className="py-3">
                  {fondo ? formatEUR(p.shares) : formatEUR(p.shares * p.avgPrice)}
                </td>
                <td className="py-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => removePosition(p.id)} aria-label="Eliminar">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
