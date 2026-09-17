'use client'

import { useState } from 'react'
import { usePortfolio } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardTitle } from '@/components/ui/Card'
import { searchEtfs } from '@/lib/etf-database'
import { buscarFondosPorTexto, esFondoIndexado } from '@/lib/fondos-analizables'

/**
 * Desde el 17-sep-2026 este formulario acepta FONDOS INDEXADOS, no solo ETFs.
 *
 * Y cambia lo que pide según lo que escribas, porque no es lo mismo:
 *  · un ETF cotiza, así que se pide PARTICIPACIONES y el precio lo buscamos nosotros;
 *  · un fondo no cotiza, así que se pide el IMPORTE EN EUROS, que es el número que el
 *    inversor tiene delante en MyInvestor y el único que no le obliga a calcular nada.
 *
 * Pedir «participaciones» de un fondo obligaría a mirar el valor liquidativo del día y
 * multiplicar, y cualquier error ahí falsea los pesos de toda la cartera en silencio.
 */

interface Sugerencia {
  /** Lo que se mete en el campo al pulsar: ticker para ETF, ISIN para fondo. */
  valor: string
  etiqueta: string
  detalle?: string
  tipo: 'etf' | 'fondo'
  /** Un fondo que reconocemos pero todavía no analizamos. Se muestra y se avisa. */
  noAnalizable?: string
}

export function PortfolioInput() {
  const addPosition = usePortfolio((s) => s.addPosition)
  const [ticker, setTicker] = useState('')
  const [shares, setShares] = useState('')
  const [avgPrice, setAvgPrice] = useState('')
  const [suggestions, setSuggestions] = useState<Sugerencia[]>([])

  const esFondo = esFondoIndexado(ticker)

  const handleTickerChange = (val: string) => {
    setTicker(val.toUpperCase())
    if (val.trim().length < 2) {
      setSuggestions([])
      return
    }

    const etfs: Sugerencia[] = searchEtfs(val).map((e) => ({
      valor: e.ticker,
      etiqueta: e.ticker,
      detalle: e.name,
      tipo: 'etf',
    }))

    const fondos: Sugerencia[] = buscarFondosPorTexto(val).map((r) =>
      'analizable' in r
        ? {
            valor: r.analizable.fondo.isin,
            etiqueta: r.analizable.fondo.name,
            detalle: `Fondo · ${r.analizable.fondo.index} · TER ${r.analizable.fondo.ter} %`,
            tipo: 'fondo' as const,
          }
        : {
            valor: r.noAnalizable.fondo.isin,
            etiqueta: r.noAnalizable.fondo.name,
            detalle: `Fondo · ${r.noAnalizable.fondo.index}`,
            tipo: 'fondo' as const,
            noAnalizable: r.noAnalizable.motivo,
          },
    )

    // Los fondos primero: en España son la mayoría de las carteras, así que son lo que más
    // gente viene a buscar. Que aparecieran debajo de diez ETFs los hacía invisibles.
    setSuggestions([...fondos, ...etfs].slice(0, 10))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sharesNum = parseFloat(shares)
    const priceNum = avgPrice.trim() === '' ? 0 : parseFloat(avgPrice)
    if (!ticker || isNaN(sharesNum) || sharesNum <= 0 || isNaN(priceNum) || priceNum < 0) return
    addPosition({ ticker, shares: sharesNum, avgPrice: priceNum, currency: 'EUR' })
    setTicker(''); setShares(''); setAvgPrice(''); setSuggestions([])
  }

  return (
    <Card>
      <CardTitle>Añadir posición</CardTitle>
      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        <div className="relative">
          <label className="block text-xs font-medium text-fg-muted mb-1.5">
            ETF o fondo indexado
          </label>
          <Input
            placeholder="VWCE, IWDA, Vanguard Global Stock, IE00B03HCZ61..."
            value={ticker}
            onChange={(e) => handleTickerChange(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-border bg-surface-2 shadow-xl">
              {suggestions.map((s) => (
                <li key={`${s.tipo}-${s.valor}`}>
                  <button
                    type="button"
                    onClick={() => { setTicker(s.valor.toUpperCase()); setSuggestions([]) }}
                    className="block w-full px-3 py-2 text-left hover:bg-surface-3"
                  >
                    <span className="text-sm text-fg">{s.etiqueta}</span>
                    {s.detalle && (
                      <span className="block text-xs text-fg-subtle">{s.detalle}</span>
                    )}
                    {s.noAnalizable && (
                      <span className="block text-xs text-amber-500">
                        Lo conocemos, pero todavía no lo analizamos
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={esFondo ? '' : 'grid grid-cols-2 gap-3'}>
          <div>
            <label className="block text-xs font-medium text-fg-muted mb-1.5">
              {esFondo ? 'Importe que tienes, en euros' : 'Participaciones'}
            </label>
            <Input
              type="number"
              step={esFondo ? '0.01' : '0.0001'}
              placeholder={esFondo ? '5.000' : '100'}
              value={shares}
              onChange={(e) => setShares(e.target.value)}
            />
          </div>
          {!esFondo && (
            <div>
              <label className="block text-xs font-medium text-fg-muted mb-1.5">
                Precio que pagaste <span className="text-fg-subtle font-normal">(opcional)</span>
              </label>
              <Input type="number" step="0.01" placeholder="0,00 €" value={avgPrice} onChange={(e) => setAvgPrice(e.target.value)} />
            </div>
          )}
        </div>

        <p className="text-xs text-fg-subtle leading-relaxed">
          {esFondo ? (
            <>
              Un fondo indexado no cotiza, así que no hay precio de mercado que buscar: dinos
              el importe que ves en tu plataforma y con eso calculamos su peso en la cartera.
              La exposición por región y sector la sacamos del índice que replica el fondo, y
              te decimos en el resultado de dónde sale cada número.
            </>
          ) : (
            <>
              El precio actual lo cogemos de Yahoo Finance automáticamente. Solo necesitas
              decirnos lo que pagaste si quieres ver ganancias/pérdidas. Si no, déjalo vacío.
            </>
          )}
        </p>

        <Button type="submit" className="w-full">Añadir posición</Button>
      </form>
    </Card>
  )
}
