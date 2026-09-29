'use client'

import { useState } from 'react'
import { usePortfolio } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardTitle } from '@/components/ui/Card'
import { SelectorProducto } from '@/components/SelectorProducto'
import { esFondoIndexado } from '@/lib/fondos-analizables'

/**
 * Desde el 17-sep-2026 este formulario acepta FONDOS INDEXADOS, no solo ETFs.
 *
 * Y cambia lo que pide según lo que escribas, porque no es lo mismo:
 *  · un ETF cotiza, así que se puede dar en PARTICIPACIONES (y el precio lo buscamos
 *    nosotros) o, desde el 28-sep-2026 y por defecto, en EUROS, que el servidor pasa a
 *    participaciones con el precio del día;
 *  · un fondo no cotiza, así que se pide el IMPORTE EN EUROS, que es el número que el
 *    inversor tiene delante en MyInvestor y el único que no le obliga a calcular nada.
 *
 * Pedir «participaciones» de un fondo obligaría a mirar el valor liquidativo del día y
 * multiplicar, y cualquier error ahí falsea los pesos de toda la cartera en silencio.
 *
 * Desde el 28-sep-2026 el campo es un desplegable con el catálogo entero (ver
 * `selector-productos.ts`): al pincharlo salen todos, y cada palabra escrita estrecha la
 * lista. Se puede seguir escribiendo un ticker o un ISIN que no esté en ella. Desde el
 * 29-sep vive en `SelectorProducto`, el mismo componente que usa el comparador.
 */

/**
 * Cartera de ejemplo para quien llega sin la suya a mano (28-sep-2026). Está elegida para que
 * el análisis enseñe algo: VWCE y un fondo del MSCI World se solapan casi entero, y CSPX suma
 * más Estados Unidos encima. Es un ejemplo de cómo se lee el informe, no una propuesta.
 */
const EJEMPLO: { ticker: string; euros: number }[] = [
  { ticker: 'VWCE', euros: 6000 },
  { ticker: 'CSPX', euros: 3000 },
  { ticker: 'IE00B03HCZ61', euros: 4000 },
]

export function PortfolioInput() {
  const addPosition = usePortfolio((s) => s.addPosition)
  const setPositions = usePortfolio((s) => s.setPositions)
  const hayPosiciones = usePortfolio((s) => s.positions.length > 0)
  const [ticker, setTicker] = useState('')
  // Euros por defecto (28-sep-2026): casi nadie sabe cuántas participaciones tiene y todo el
  // mundo ve en su bróker cuántos euros. Participaciones sigue ahí para quien quiera ver
  // ganancias y pérdidas con su precio de compra.
  const [unidadEtf, setUnidadEtf] = useState<'euros' | 'participaciones'>('euros')
  const [shares, setShares] = useState('')
  const [avgPrice, setAvgPrice] = useState('')

  const esFondo = esFondoIndexado(ticker)
  const enEuros = esFondo || unidadEtf === 'euros'

  const cargarEjemplo = () => {
    const ahora = new Date().toISOString()
    setPositions(
      EJEMPLO.map((e) => ({
        id: crypto.randomUUID(),
        ticker: e.ticker,
        shares: e.euros,
        avgPrice: 0,
        currency: 'EUR' as const,
        addedAt: ahora,
        ...(esFondoIndexado(e.ticker) ? {} : { unidad: 'euros' as const }),
      })),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const valor = ticker.trim().toUpperCase()
    const sharesNum = parseFloat(shares)
    const priceNum = enEuros || avgPrice.trim() === '' ? 0 : parseFloat(avgPrice)
    if (!valor || isNaN(sharesNum) || sharesNum <= 0 || isNaN(priceNum) || priceNum < 0) return
    addPosition({
      ticker: valor,
      shares: sharesNum,
      avgPrice: priceNum,
      currency: 'EUR',
      // Un fondo va siempre en euros y no necesita la marca; un ETF la lleva si se metió así.
      ...(!esFondo && unidadEtf === 'euros' ? { unidad: 'euros' as const } : {}),
    })
    setTicker(''); setShares(''); setAvgPrice('')
  }

  return (
    <Card>
      <CardTitle>Añadir posición</CardTitle>
      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        <SelectorProducto
          etiqueta="ETF o fondo indexado"
          valor={ticker}
          onCambio={setTicker}
          onElegir={(o) => setTicker(o.valor.toUpperCase())}
        />

        {!esFondo && (
          <div role="radiogroup" aria-label="Cómo quieres indicar lo que tienes" className="grid grid-cols-2 gap-1 rounded-lg bg-surface-2 p-1 text-xs">
            {(['euros', 'participaciones'] as const).map((u) => (
              <button
                key={u}
                type="button"
                role="radio"
                aria-checked={unidadEtf === u}
                onClick={() => setUnidadEtf(u)}
                className={`rounded-md px-2 py-1.5 font-medium transition-colors ${unidadEtf === u ? 'bg-surface-3 text-fg' : 'text-fg-muted hover:text-fg'}`}
              >
                {u === 'euros' ? 'En euros' : 'En participaciones'}
              </button>
            ))}
          </div>
        )}

        <div className={enEuros ? '' : 'grid grid-cols-2 gap-3'}>
          <div>
            <label className="block text-xs font-medium text-fg-muted mb-1.5">
              {enEuros ? 'Importe que tienes, en euros' : 'Participaciones'}
            </label>
            <Input
              type="number"
              step={enEuros ? '0.01' : '0.0001'}
              placeholder={enEuros ? '5.000' : '100'}
              value={shares}
              onChange={(e) => setShares(e.target.value)}
            />
          </div>
          {!enEuros && (
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
          ) : enEuros ? (
            <>
              Pon los euros que ves en tu bróker. Los pasamos a participaciones con el precio del
              día, que cogemos de Yahoo Finance, para calcular el peso de cada posición.
            </>
          ) : (
            <>
              El precio actual lo cogemos de Yahoo Finance automáticamente. Solo necesitas
              decirnos lo que pagaste si quieres ver ganancias/pérdidas. Si no, déjalo vacío.
            </>
          )}
        </p>

        <Button type="submit" className="w-full">Añadir posición</Button>

        {!hayPosiciones && (
          <button
            type="button"
            onClick={cargarEjemplo}
            className="w-full text-xs text-fg-muted hover:text-fg underline underline-offset-4"
          >
            ¿Sin tu cartera a mano? Carga un ejemplo con solapamiento (VWCE, CSPX y un fondo del MSCI World)
          </button>
        )}
      </form>
    </Card>
  )
}
