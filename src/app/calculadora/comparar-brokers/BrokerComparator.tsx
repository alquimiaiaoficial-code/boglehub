'use client'

import { useMemo, useState } from 'react'
import { Card, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { cn, formatEUR } from '@/lib/utils'
import { BROKERS, rankBrokers, type InstrumentType } from '@/lib/brokers'
import { trackEvent, useFireOnce } from '@/lib/analytics'
import { getBrokerLink, AFFILIATE_LABEL } from '@/lib/monetization'

export function BrokerComparator() {
  const [initialCapital, setInitialCapital] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(300)
  const [tradesPerMonth, setTradesPerMonth] = useState(1)
  const [years, setYears] = useState(10)
  const [instrumentType, setInstrumentType] = useState<InstrumentType>('etf')

  const ranking = useMemo(
    () =>
      rankBrokers({
        initialCapital,
        monthlyContribution,
        tradesPerMonth,
        years,
        instrumentType,
      }),
    [initialCapital, monthlyContribution, tradesPerMonth, years, instrumentType]
  )

  const availableRanking = ranking.filter((r) => r.available)
  const cheapest = availableRanking[0]
  const mostExpensive = availableRanking[availableRanking.length - 1]
  const spread =
    cheapest && mostExpensive ? mostExpensive.totalCost - cheapest.totalCost : 0

  const markUsed = useFireOnce('calculator_used', { calculator: 'comparar-brokers' })

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6" onChange={markUsed}>
      {/* Parámetros */}
      <Card className="mb-6">
        <CardTitle className="mb-4">Tu patrón de inversión</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-fg-muted mb-1">Capital inicial (€)</label>
            <Input
              type="number"
              min={0}
              value={initialCapital}
              onChange={(e) => setInitialCapital(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </div>
          <div>
            <label className="block text-xs text-fg-muted mb-1">Aporte mensual (€)</label>
            <Input
              type="number"
              min={0}
              value={monthlyContribution}
              onChange={(e) =>
                setMonthlyContribution(Math.max(0, parseFloat(e.target.value) || 0))
              }
            />
          </div>
          <div>
            <label className="block text-xs text-fg-muted mb-1">
              Operaciones al mes
            </label>
            <Input
              type="number"
              min={0}
              max={50}
              value={tradesPerMonth}
              onChange={(e) =>
                setTradesPerMonth(Math.min(50, Math.max(0, parseInt(e.target.value) || 0)))
              }
            />
            <p className="mt-1 text-[11px] text-fg-subtle">
              1 si haces DCA mensual con un solo ETF.
            </p>
          </div>
          <div>
            <label className="block text-xs text-fg-muted mb-1">Horizonte (años)</label>
            <Input
              type="number"
              min={1}
              max={50}
              value={years}
              onChange={(e) =>
                setYears(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-fg-muted mb-1">Tipo de instrumento</label>
            <div className="flex gap-2">
              <button
                onClick={() => setInstrumentType('etf')}
                className={cn(
                  'flex-1 rounded-lg border px-3 py-2 text-sm transition-colors',
                  instrumentType === 'etf'
                    ? 'border-brand-500 bg-brand-500/10 text-fg'
                    : 'border-border bg-surface-2 text-fg-muted hover:text-fg'
                )}
              >
                ETFs
              </button>
              <button
                onClick={() => setInstrumentType('fondo')}
                className={cn(
                  'flex-1 rounded-lg border px-3 py-2 text-sm transition-colors',
                  instrumentType === 'fondo'
                    ? 'border-brand-500 bg-brand-500/10 text-fg'
                    : 'border-border bg-surface-2 text-fg-muted hover:text-fg'
                )}
              >
                Fondos indexados
              </button>
            </div>
            <p className="mt-1 text-[11px] text-fg-subtle">
              Los fondos indexados permiten traspasos sin tributar, los ETF no. No todos los
              brókers ofrecen ambos.
            </p>
          </div>
        </div>
      </Card>

      {/* KPIs */}
      {cheapest && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="text-center">
            <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
              Bróker más barato
            </p>
            <p className="text-2xl font-bold text-accent">{cheapest.broker.name}</p>
            <p className="text-xs text-fg-subtle mt-1">
              {formatEUR(cheapest.annualCost)} al año
            </p>
          </Card>
          <Card className="text-center">
            <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
              Coste a {years} años
            </p>
            <p className="text-2xl font-bold text-fg">{formatEUR(cheapest.totalCost)}</p>
            <p className="text-xs text-fg-subtle mt-1">con {cheapest.broker.name}</p>
          </Card>
          <Card className="text-center">
            <p className="text-xs text-fg-subtle uppercase tracking-wide mb-1">
              Diferencia con el más caro
            </p>
            <p className="text-2xl font-bold text-warn">{formatEUR(spread)}</p>
            <p className="text-xs text-fg-subtle mt-1">
              elegir bien {years} años seguidos
            </p>
          </Card>
        </div>
      )}

      {/* Ranking */}
      <Card className="mb-6">
        <CardTitle className="mb-1">Ranking de brókers para tu escenario</CardTitle>
        <p className="text-xs text-fg-subtle mb-4">
          Coste anual estimado para {formatEUR(monthlyContribution)} al mes,{' '}
          {tradesPerMonth} {tradesPerMonth === 1 ? 'operación' : 'operaciones'}/mes durante{' '}
          {years} años.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-fg-muted text-xs uppercase tracking-wide">
                <th className="pb-3 pr-4">#</th>
                <th className="pb-3 pr-4">Bróker</th>
                <th className="pb-3 pr-4 text-right">Coste anual</th>
                <th className="pb-3 pr-4 text-right">Coste a {years} años</th>
                <th className="pb-3">Notas</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((r, idx) => (
                <tr
                  key={r.broker.id}
                  className={cn(
                    'border-b border-border/50',
                    r.available && idx === 0 && 'bg-accent-dim/50'
                  )}
                >
                  <td className="py-2 pr-4 text-fg-muted font-mono">
                    {r.available ? idx + 1 : '—'}
                  </td>
                  <td className="py-2 pr-4 font-semibold text-fg">{r.broker.name}</td>
                  <td className="py-2 pr-4 text-right font-mono text-fg">
                    {r.available ? formatEUR(r.annualCost) : '—'}
                  </td>
                  <td
                    className={cn(
                      'py-2 pr-4 text-right font-mono',
                      r.available && idx === 0
                        ? 'text-accent font-semibold'
                        : r.available
                          ? 'text-fg-muted'
                          : 'text-fg-subtle'
                    )}
                  >
                    {r.available ? formatEUR(r.totalCost) : '—'}
                  </td>
                  <td className="py-2 text-xs text-fg-subtle">
                    {r.available ? r.broker.shortDescription : r.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
          Cifras orientativas, basadas en las tarifas publicadas por cada bróker. Verifica
          siempre las comisiones actuales en la web del bróker antes de decidir. Los costes
          ignoran el spread del mercado y la conversión de divisas, que pueden ser
          relevantes para ETFs cotizados fuera del euro.
        </p>
      </Card>

      {/* Detalle por bróker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
        {BROKERS.map((broker) => (
          <Card key={broker.id} className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-fg">{broker.name}</h3>
              <span className="text-[10px] uppercase tracking-wide text-fg-subtle">
                {broker.country}
              </span>
            </div>
            <p className="text-xs text-fg-muted mb-4 leading-relaxed">
              {broker.shortDescription}
            </p>
            <div className="mb-3">
              <p className="text-[11px] uppercase tracking-wide text-accent mb-1">A favor</p>
              <ul className="space-y-1 text-xs text-fg-muted">
                {broker.pros.map((p, i) => (
                  <li key={i} className="flex gap-1.5">
                    <span className="text-accent">+</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-3">
              <p className="text-[11px] uppercase tracking-wide text-warn mb-1">En contra</p>
              <ul className="space-y-1 text-xs text-fg-muted">
                {broker.cons.map((c, i) => (
                  <li key={i} className="flex gap-1.5">
                    <span className="text-warn">−</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto pt-3 border-t border-border">
              <p className="text-xs text-fg-muted">
                <span className="text-fg-subtle">Ideal para: </span>
                {broker.bestFor}
              </p>
              {(() => {
                const link = getBrokerLink(broker.id, broker.url)
                return (
                  <a
                    href={link.url}
                    target="_blank"
                    rel={link.rel}
                    onClick={() =>
                      trackEvent('broker_link_clicked', {
                        broker: broker.id,
                        affiliate: link.isAffiliate,
                      })
                    }
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Visitar web de {broker.name}
                    <span aria-hidden="true">→</span>
                    {link.isAffiliate && (
                      <span className="ml-1 text-[10px] text-fg-subtle">({AFFILIATE_LABEL})</span>
                    )}
                  </a>
                )
              })()}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
