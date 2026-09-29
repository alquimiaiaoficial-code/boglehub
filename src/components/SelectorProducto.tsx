'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { catalogoSelector, filtrarCatalogo, type OpcionProducto } from '@/lib/selector-productos'

/**
 * El desplegable de fondos y ETFs, el mismo en toda la web (29-sep-2026).
 *
 * Nació el 28-sep dentro del formulario del analizador (ver `selector-productos.ts`): al
 * pinchar el campo sale el catálogo entero —fondos, clases y ETFs—, cada palabra escrita
 * estrecha la lista en cualquier orden y sin tildes, y se elige con el ratón o con flechas e
 * Intro. Se sacó aquí para que el comparador use exactamente el mismo, no una copia: el
 * comparador tenía su propio buscador, que no enseñaba nada hasta la primera letra, cortaba
 * en diez y no conocía ni un solo fondo.
 *
 * Se puede seguir escribiendo algo que no esté en la lista (un ticker o un ISIN): quien usa
 * el campo decide qué hacer con un texto que no reconocemos.
 */

// Se calcula una vez: son datos estáticos del catálogo.
const CATALOGO = catalogoSelector()

interface Props {
  /** Texto de la etiqueta que va encima del campo. */
  etiqueta: string
  /** Lo que hay escrito en el campo. */
  valor: string
  /** Cada vez que cambia lo escrito. */
  onCambio: (texto: string) => void
  /** Cuando se elige una opción de la lista. */
  onElegir: (opcion: OpcionProducto) => void
  placeholder?: string
}

export function SelectorProducto({
  etiqueta,
  valor,
  onCambio,
  onElegir,
  placeholder = 'Elige de la lista o escribe nombre, ticker o ISIN',
}: Props) {
  const [abierto, setAbierto] = useState(false)
  const [activo, setActivo] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listaId = useId()

  const opciones = useMemo(() => filtrarCatalogo(CATALOGO, valor), [valor])
  const nFondos = opciones.filter((o) => o.tipo === 'fondo').length
  const nEtfs = opciones.length - nFondos
  const idOpcion = (i: number) => `${listaId}-op-${i}`

  // Que la opción marcada con las flechas se vea siempre, aunque la lista tenga scroll.
  useEffect(() => {
    if (activo >= 0) document.getElementById(idOpcion(activo))?.scrollIntoView({ block: 'nearest' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo])

  const elegir = (o: OpcionProducto) => {
    onElegir(o)
    setAbierto(false)
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
    <div className="relative">
      <label htmlFor={`${listaId}-campo`} className="block text-xs font-medium text-fg-muted mb-1.5">
        {etiqueta}
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
          placeholder={placeholder}
          value={valor}
          onChange={(e) => { onCambio(e.target.value); setAbierto(true); setActivo(-1) }}
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
              Ninguno de la lista coincide. Puedes escribir igualmente su ticker o su ISIN: si no
              lo reconocemos, te lo diremos.
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
  )
}
