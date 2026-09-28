'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { usePortfolio } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardTitle } from '@/components/ui/Card'
import { esFondoIndexado } from '@/lib/fondos-analizables'
import { catalogoSelector, filtrarCatalogo, type OpcionProducto } from '@/lib/selector-productos'

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
 *
 * Desde el 28-sep-2026 el campo es un desplegable con el catálogo entero (ver
 * `selector-productos.ts`): al pincharlo salen todos, y cada palabra escrita estrecha la
 * lista. Se puede seguir escribiendo un ticker o un ISIN que no esté en ella.
 */

// Se calcula una vez: son datos estáticos del catálogo.
const CATALOGO = catalogoSelector()

export function PortfolioInput() {
  const addPosition = usePortfolio((s) => s.addPosition)
  const [ticker, setTicker] = useState('')
  const [shares, setShares] = useState('')
  const [avgPrice, setAvgPrice] = useState('')
  const [abierto, setAbierto] = useState(false)
  const [activo, setActivo] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listaId = useId()

  const esFondo = esFondoIndexado(ticker)

  const opciones = useMemo(() => filtrarCatalogo(CATALOGO, ticker), [ticker])
  const nFondos = opciones.filter((o) => o.tipo === 'fondo').length
  const nEtfs = opciones.length - nFondos
  const idOpcion = (i: number) => `${listaId}-op-${i}`

  // Que la opción marcada con las flechas se vea siempre, aunque la lista tenga scroll.
  useEffect(() => {
    if (activo >= 0) document.getElementById(idOpcion(activo))?.scrollIntoView({ block: 'nearest' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo])

  const elegir = (o: OpcionProducto) => {
    setTicker(o.valor.toUpperCase())
    setAbierto(false)
    setActivo(-1)
  }

  const handleTickerChange = (val: string) => {
    setTicker(val)
    setAbierto(true)
    setActivo(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setAbierto(true)
      setActivo((i) => Math.min(i + 1, opciones.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActivo((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && abierto && activo >= 0 && opciones[activo]) {
      e.preventDefault()
      elegir(opciones[activo])
    } else if (e.key === 'Escape') {
      setAbierto(false)
      setActivo(-1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const valor = ticker.trim().toUpperCase()
    const sharesNum = parseFloat(shares)
    const priceNum = avgPrice.trim() === '' ? 0 : parseFloat(avgPrice)
    if (!valor || isNaN(sharesNum) || sharesNum <= 0 || isNaN(priceNum) || priceNum < 0) return
    addPosition({ ticker: valor, shares: sharesNum, avgPrice: priceNum, currency: 'EUR' })
    setTicker(''); setShares(''); setAvgPrice(''); setAbierto(false); setActivo(-1)
  }

  const renderOpcion = (o: OpcionProducto, i: number) => (
    <li
      key={`${o.tipo}-${o.valor}`}
      id={idOpcion(i)}
      role="option"
      aria-selected={i === activo}
      // mousedown y no click: el click llega después del blur del campo, que cierra la lista.
      onMouseDown={(e) => { e.preventDefault(); elegir(o) }}
      onMouseEnter={() => setActivo(i)}
      className={`cursor-pointer px-3 py-2 ${i === activo ? 'bg-surface-3' : ''}`}
    >
      <span className="block text-sm text-fg">{o.etiqueta}</span>
      <span className="block text-xs text-fg-subtle">{o.detalle}</span>
      {o.noAnalizable && (
        <span className="block text-xs text-amber-500">
          Lo reconocemos, pero no lo analizamos: en su ficha está el motivo
        </span>
      )}
    </li>
  )

  return (
    <Card>
      <CardTitle>Añadir posición</CardTitle>
      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        <div className="relative">
          <label htmlFor={`${listaId}-campo`} className="block text-xs font-medium text-fg-muted mb-1.5">
            ETF o fondo indexado
          </label>
          <div className="relative">
            <Input
              id={`${listaId}-campo`}
              ref={inputRef}
              role="combobox"
              aria-expanded={abierto}
              aria-controls={listaId}
              aria-autocomplete="list"
              aria-activedescendant={abierto && activo >= 0 ? idOpcion(activo) : undefined}
              autoComplete="off"
              placeholder="Elige de la lista o escribe nombre, ticker o ISIN"
              value={ticker}
              onChange={(e) => handleTickerChange(e.target.value)}
              onFocus={() => setAbierto(true)}
              onBlur={() => { setAbierto(false); setActivo(-1) }}
              onKeyDown={handleKeyDown}
              className="pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={abierto ? 'Cerrar la lista' : 'Ver toda la lista'}
              onMouseDown={(e) => {
                e.preventDefault()
                if (abierto) { setAbierto(false) } else { setAbierto(true); inputRef.current?.focus() }
              }}
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-fg-subtle hover:text-fg"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${abierto ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {abierto && (
            <ul
              id={listaId}
              role="listbox"
              aria-label="Fondos y ETFs que reconocemos"
              className="absolute z-10 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-border bg-surface-2 shadow-xl"
            >
              {opciones.length === 0 ? (
                <li role="presentation" className="px-3 py-3 text-xs text-fg-subtle leading-relaxed">
                  Ninguno de la lista coincide. Puedes añadirlo igual con su ticker o su ISIN: si
                  no lo reconocemos, el análisis te lo dirá.
                </li>
              ) : (
                <>
                  {nFondos > 0 && (
                    <li role="presentation" className="sticky top-0 bg-surface-3 px-3 py-1.5 text-xs font-medium text-fg-muted">
                      Fondos indexados · {nFondos}
                    </li>
                  )}
                  {opciones.slice(0, nFondos).map((o, i) => renderOpcion(o, i))}
                  {nEtfs > 0 && (
                    <li role="presentation" className="sticky top-0 bg-surface-3 px-3 py-1.5 text-xs font-medium text-fg-muted">
                      ETFs · {nEtfs}
                    </li>
                  )}
                  {opciones.slice(nFondos).map((o, i) => renderOpcion(o, nFondos + i))}
                </>
              )}
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
