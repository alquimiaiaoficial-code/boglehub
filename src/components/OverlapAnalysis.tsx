'use client'

import { useMemo } from 'react'
import { Layers } from 'lucide-react'
import { usePortfolio } from '@/lib/store'
import { computeOverlaps } from '@/lib/overlap'
import { consecuenciaFiscal, type TipoDePar } from '@/lib/traspaso-fiscal'
import { Card, CardTitle } from '@/components/ui/Card'

const UMBRAL_ALTO = 0.6

export function OverlapAnalysis() {
  const positions = usePortfolio((s) => s.positions)
  const overlaps = useMemo(() => computeOverlaps(positions), [positions])

  const highOverlap = useMemo(
    () => overlaps.filter((o) => o.overlapPct >= UMBRAL_ALTO),
    [overlaps],
  )

  /**
   * Se agrupa por tipo de par para decir cada consecuencia UNA vez.
   *
   * Sin esto, una cartera con cuatro fondos parecidos repetiría el mismo párrafo legal seis
   * veces y nadie leería ninguno. El orden es deliberado: primero lo que sí se puede hacer
   * sin coste fiscal.
   *
   * Va ANTES del `return null`, junto a los demás hooks. En la primera versión estaba
   * después y eslint lo cazó: un hook tras una salida temprana cambia el número de hooks
   * entre renders y React empieza a emparejar estados equivocados. No es un aviso de estilo.
   */
  const tiposPresentes = useMemo(() => {
    const orden: TipoDePar[] = ['ambos-fondos', 'mixto', 'ambos-etf']
    const vistos = new Set(highOverlap.map((o) => o.tipo))
    return orden.filter((t) => vistos.has(t))
  }, [highOverlap])

  if (positions.length < 2 || overlaps.length === 0) return null

  const top = overlaps.slice(0, 6)

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Layers className="h-5 w-5 text-brand-400" />
        <CardTitle>Solapamiento geográfico en tu cartera</CardTitle>
      </div>
      {/* El nombre lleva "geográfico" a propósito, y la explicación va delante del número.
          Antes el título decía solo "Solapamiento" y el matiz quedaba en el subtítulo: José
          Antonio Rodríguez (Guía Fondos Indexados) avisó de que así el porcentaje se puede
          leer como "empresas realmente repetidas", que es algo que esta herramienta NO mide.
          Su consejo, literal: nombrarlo solapamiento geográfico y explicar brevemente qué
          mide el porcentaje.

          Y ya no dice «entre tus ETFs»: desde el 18-sep-2026 esta tarjeta también compara
          fondos indexados, así que ese título habría pasado a ser falso. */}
      <p className="mt-2 text-sm text-fg-muted">
        Este porcentaje mide <strong className="text-fg">cuánta exposición por región
        comparten dos productos</strong>, no cuántas empresas concretas se repiten entre
        ellos: para eso harían falta datos de participaciones que esta herramienta no usa.
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
            ? 'par con exposición geográfica muy parecida'
            : 'pares con exposición geográfica muy parecida'}.
          Merece la pena mirar si uno solo ya cubre esa exposición.
        </div>
      )}

      <ul className="mt-4 space-y-2.5">
        {top.map((o) => {
          const pct = Math.round(o.overlapPct * 100)
          const color = pct >= 60 ? 'text-warn' : pct >= 30 ? 'text-fg' : 'text-accent'
          return (
            <li key={`${o.tickerA}-${o.tickerB}`} className="flex items-center gap-3 text-sm">
              <span className="text-fg w-52 shrink-0 truncate" title={`${o.etiquetaA} · ${o.etiquetaB}`}>
                {o.etiquetaA} · {o.etiquetaB}
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

      {/*
        Qué cuesta deshacerlo. Añadido el 18-sep-2026 y es la mitad que faltaba.

        Detectar un solapamiento sin decir qué cuesta deshacerlo deja el trabajo a medias, y
        en España la respuesta depende por completo del tipo de producto: entre fondos la ley
        permite el traspaso sin computar la ganancia, y los ETF están excluidos del régimen.
        No lo dice ninguna otra herramienta española, y es lo que de verdad cambia una
        decisión aquí.

        Describe la norma; no recomienda a nadie hacer nada. Todo el texto está en indicativo
        sobre la ley y jamás en imperativo sobre el lector. Artículo y condiciones verificados
        en el BOE, en `traspaso-fiscal.ts`.
      */}
      {tiposPresentes.length > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-sm font-medium text-fg">Qué cuesta deshacer un solapamiento</p>
          <div className="mt-3 space-y-3">
            {tiposPresentes.map((tipo) => {
              const c = consecuenciaFiscal(tipo)
              return (
                <div
                  key={tipo}
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    c.admiteDiferimiento
                      ? 'border-accent/40 bg-accent/10'
                      : 'border-border bg-surface-2'
                  }`}
                >
                  <p className="font-medium text-fg">{c.titular}</p>
                  <p className="mt-1.5 text-fg-muted leading-relaxed">{c.detalle}</p>
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-xs text-fg-subtle">
            Esto describe qué permite la norma, no qué hacer con tu dinero. BogleHub no está
            registrada en la CNMV y no presta asesoramiento.
          </p>
        </div>
      )}
    </Card>
  )
}
