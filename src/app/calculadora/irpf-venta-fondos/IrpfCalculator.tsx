'use client'

import { useMemo, useState } from 'react'
import { Card, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { formatEUR, formatPct } from '@/lib/utils'
import { computeMarginalSavingsTax, type BracketShare } from '@/lib/fiscal'
import { useFireOnce } from '@/lib/analytics'

/** Color por tipo marginal, de menor a mayor carga fiscal. */
const BRACKET_COLOR: Record<string, string> = {
  '0.19': '#10b981',
  '0.21': '#3b82f6',
  '0.23': '#f59e0b',
  '0.27': '#f97316',
  '0.3': '#ef4444',
}

function bracketLabel(b: Pick<BracketShare, 'from' | 'to'>): string {
  if (b.from === 0 && b.to != null) return `Hasta ${formatEUR(b.to)}`
  if (b.to == null) return `Más de ${formatEUR(b.from)}`
  return `${formatEUR(b.from)} – ${formatEUR(b.to)}`
}

export function IrpfCalculator() {
  const [valorCompra, setValorCompra] = useState(15000)
  const [valorVenta, setValorVenta] = useState(25000)
  const [otrasGanancias, setOtrasGanancias] = useState(0)
  const [perdidas, setPerdidas] = useState(0)

  const r = useMemo(() => {
    const ganancia = valorVenta - valorCompra
    const esPerdida = ganancia <= 0
    const perdidaUsada = esPerdida ? 0 : Math.min(perdidas, ganancia)
    const gananciaImponible = esPerdida ? 0 : Math.max(0, ganancia - perdidas)
    const tax = computeMarginalSavingsTax(otrasGanancias, gananciaImponible)
    const impuesto = tax.totalTax
    const gananciaNeta = ganancia - impuesto
    const perdidaSobrante = Math.max(0, perdidas - (esPerdida ? 0 : ganancia))
    const totalmenteCompensada = !esPerdida && ganancia > 0 && gananciaImponible === 0
    return {
      ganancia,
      esPerdida,
      perdidaUsada,
      gananciaImponible,
      impuesto,
      gananciaNeta,
      perdidaSobrante,
      totalmenteCompensada,
      tipoEfectivo: tax.effectiveRate,
      brackets: tax.brackets.filter((b) => b.amount > 0),
    }
  }, [valorCompra, valorVenta, otrasGanancias, perdidas])

  const markUsed = useFireOnce('calculator_used', { calculator: 'irpf-venta-fondos' })

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6" onChange={markUsed}>
      {/* Parámetros */}
      <Card className="mb-6">
        <CardTitle className="mb-4">Datos de tu venta</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-fg-muted mb-1">Valor de compra (€)</label>
            <Input
              type="number"
              min={0}
              value={valorCompra}
              onChange={(e) => setValorCompra(Math.max(0, parseFloat(e.target.value) || 0))}
            />
            <p className="mt-1 text-[11px] text-fg-subtle">
              Lo que pagaste por las participaciones que vendes.
            </p>
          </div>
          <div>
            <label className="block text-xs text-fg-muted mb-1">Valor de venta (€)</label>
            <Input
              type="number"
              min={0}
              value={valorVenta}
              onChange={(e) => setValorVenta(Math.max(0, parseFloat(e.target.value) || 0))}
            />
            <p className="mt-1 text-[11px] text-fg-subtle">Lo que recibes al venderlas.</p>
          </div>
          <div>
            <label className="block text-xs text-fg-muted mb-1">
              Otras ganancias del ahorro (€)
            </label>
            <Input
              type="number"
              min={0}
              value={otrasGanancias}
              onChange={(e) =>
                setOtrasGanancias(Math.max(0, parseFloat(e.target.value) || 0))
              }
            />
            <p className="mt-1 text-[11px] text-fg-subtle">
              Dividendos, intereses u otras ventas con beneficio de este año.
            </p>
          </div>
          <div>
            <label className="block text-xs text-fg-muted mb-1">
              Pérdidas a compensar (€)
            </label>
            <Input
              type="number"
              min={0}
              value={perdidas}
              onChange={(e) => setPerdidas(Math.max(0, parseFloat(e.target.value) || 0))}
            />
            <p className="mt-1 text-[11px] text-fg-subtle">
              Minusvalías de este año o de los 4 anteriores.
            </p>
          </div>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {r.esPerdida ? (
          <>
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
                Resultado de la venta
              </p>
              <p className="text-2xl font-bold text-danger">{formatEUR(r.ganancia)}</p>
              <p className="text-xs text-fg-subtle mt-1">cierras en pérdidas</p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
                Impuesto IRPF
              </p>
              <p className="text-2xl font-bold text-accent">{formatEUR(0)}</p>
              <p className="text-xs text-fg-subtle mt-1">una pérdida no tributa</p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
                Minusvalía a compensar
              </p>
              <p className="text-2xl font-bold text-brand-400">
                {formatEUR(Math.abs(r.ganancia))}
              </p>
              <p className="text-xs text-fg-subtle mt-1">úsala contra otras ganancias</p>
            </Card>
          </>
        ) : (
          <>
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
                Ganancia patrimonial
              </p>
              <p className="text-2xl font-bold text-fg">{formatEUR(r.ganancia)}</p>
              <p className="text-xs text-fg-subtle mt-1">venta menos compra</p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
                Impuesto IRPF
              </p>
              <p className="text-2xl font-bold text-warn">{formatEUR(r.impuesto)}</p>
              <p className="text-xs text-fg-subtle mt-1">
                {r.gananciaImponible > 0
                  ? `tipo efectivo ${formatPct(r.tipoEfectivo, 1)}`
                  : 'nada que tributar'}
              </p>
            </Card>
            <Card className="text-center">
              <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
                Ganancia tras impuestos
              </p>
              <p className="text-2xl font-bold text-accent">{formatEUR(r.gananciaNeta)}</p>
              <p className="text-xs text-fg-subtle mt-1">lo que te queda limpio</p>
            </Card>
          </>
        )}
      </div>

      {/* Lectura del resultado */}
      <div
        className={
          r.esPerdida
            ? 'mb-6 rounded-xl border border-brand-500/30 bg-brand-500/10 p-5'
            : 'mb-6 rounded-xl border border-warn/30 bg-warn-dim p-5'
        }
      >
        {r.esPerdida ? (
          <p className="text-sm text-fg leading-relaxed">
            Esta venta cierra en pérdidas por{' '}
            <strong className="text-brand-400">{formatEUR(Math.abs(r.ganancia))}</strong>, así
            que no pagas IRPF por ella. Esa minusvalía puede compensar ganancias de fondos,
            ETF o acciones de este mismo año; lo que no uses se arrastra a los 4 ejercicios
            siguientes. Cuidado con la regla de los dos meses: si recompras el mismo ETF o
            acción dentro de los dos meses anteriores o posteriores a la venta, Hacienda no
            te deja computar la pérdida.
          </p>
        ) : r.totalmenteCompensada ? (
          <p className="text-sm text-fg leading-relaxed">
            Tu ganancia de <strong>{formatEUR(r.ganancia)}</strong> queda totalmente
            compensada con las pérdidas que has indicado. No pagas IRPF por esta venta
            {r.perdidaSobrante > 0 && (
              <>
                {' '}
                y aún te sobran{' '}
                <strong className="text-brand-400">{formatEUR(r.perdidaSobrante)}</strong> de
                pérdidas para futuras ganancias
              </>
            )}
            .
          </p>
        ) : (
          <p className="text-sm text-fg leading-relaxed">
            Vendes con una ganancia de <strong>{formatEUR(r.ganancia)}</strong>. Hacienda se
            lleva <strong className="text-warn">{formatEUR(r.impuesto)}</strong> y te quedan{' '}
            <strong className="text-accent">{formatEUR(r.gananciaNeta)}</strong> limpios, un
            tipo efectivo del {formatPct(r.tipoEfectivo, 1)}.{' '}
            {r.perdidaUsada > 0 && (
              <>
                Has restado {formatEUR(r.perdidaUsada)} de pérdidas, que rebajan la ganancia
                que tributa.{' '}
              </>
            )}
            {otrasGanancias > 0 && (
              <>
                Tu ganancia se apila sobre los {formatEUR(otrasGanancias)} de otras rentas
                del ahorro de este año, por eso entra en tramos más altos.{' '}
              </>
            )}
            Recuerda que el IRPF es progresivo: solo la parte que supera cada límite paga el
            tipo más alto.
          </p>
        )}
      </div>

      {/* Desglose por tramos */}
      {r.brackets.length > 0 && (
        <Card>
          <CardTitle className="mb-1">Cómo se reparte tu ganancia por tramos</CardTitle>
          <p className="text-xs text-fg-subtle mb-4">
            La ganancia que tributa, {formatEUR(r.gananciaImponible)}, partida por el tipo
            que paga cada tramo.
          </p>

          {/* Barra apilada */}
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-2 mb-3">
            {r.brackets.map((b) => (
              <div
                key={b.from}
                style={{
                  width: `${(b.amount / r.gananciaImponible) * 100}%`,
                  background: BRACKET_COLOR[String(b.rate)],
                }}
                title={`${formatPct(b.rate, 0)}: ${formatEUR(b.amount)}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
            {r.brackets.map((b) => (
              <span key={b.from} className="inline-flex items-center gap-1.5 text-xs">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ background: BRACKET_COLOR[String(b.rate)] }}
                />
                <span className="text-fg-muted">
                  {formatPct(b.rate, 0)} · {formatEUR(b.amount)}
                </span>
              </span>
            ))}
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-fg-muted text-xs uppercase tracking-wide">
                  <th className="pb-3 pr-4">Tramo</th>
                  <th className="pb-3 pr-4 text-right">Tipo</th>
                  <th className="pb-3 pr-4 text-right">Tu ganancia aquí</th>
                  <th className="pb-3 text-right">Cuota</th>
                </tr>
              </thead>
              <tbody>
                {r.brackets.map((b) => (
                  <tr key={b.from} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-fg-muted">{bracketLabel(b)}</td>
                    <td className="py-2 pr-4 text-right font-mono text-fg-muted">
                      {formatPct(b.rate, 0)}
                    </td>
                    <td className="py-2 pr-4 text-right font-mono text-fg">
                      {formatEUR(b.amount)}
                    </td>
                    <td className="py-2 text-right font-mono font-semibold text-warn">
                      {formatEUR(b.tax)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="pt-3 pr-4 font-semibold text-fg" colSpan={3}>
                    Total a pagar
                  </td>
                  <td className="pt-3 text-right font-mono font-bold text-warn">
                    {formatEUR(r.impuesto)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
