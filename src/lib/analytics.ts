'use client'

import { pageview, track } from '@vercel/analytics'
import { useCallback, useEffect, useRef } from 'react'

/**
 * Custom product events tracked via Vercel Analytics.
 *
 * Keep this union the single source of truth for event names so they stay
 * consistent across the codebase (no stray string typos that fragment the
 * dashboard). Add a new member here before emitting a new event.
 */
export type BogleEvent =
  | 'analysis_completed' // user ran a full AI portfolio analysis
  | 'pdf_uploaded' // a broker PDF was parsed successfully
  | 'chat_used' // a message was sent to the AI chat
  | 'calculator_used' // first interaction with any calculator
  | 'email_captured' // newsletter signup succeeded
  | 'broker_link_clicked' // outbound click to a broker's website

type EventProps = Record<string, string | number | boolean | null>

/**
 * Ruta virtual con la que cada evento aparece en el panel de páginas de Vercel.
 *
 * Por qué existe: la cuenta está en el plan Hobby, y en Hobby Vercel Web Analytics NO
 * registra eventos personalizados (tabla «Limits and pricing», fila «Custom Events: –»,
 * comprobado el 29-sep-2026). Todo lo que se mandaba con `track()` se perdía sin que nada
 * se viera roto. Las páginas vistas sí se cuentan, así que cada evento se manda además
 * como una vista de `/evento/<nombre>`. No es una URL real: nadie la visita y no está en
 * el sitemap. Los visitantes únicos no cambian, pero las páginas vistas totales y la tasa
 * de rebote incluyen estas vistas virtuales.
 */
export function eventPath(event: BogleEvent): string {
  return `/evento/${event}`
}

/**
 * Fire a typed analytics event. Best-effort and never throws — analytics must
 * never break the UX, so any failure is swallowed silently.
 */
export function trackEvent(event: BogleEvent, props?: EventProps): void {
  try {
    // Se mantiene `track()` por si algún día el plan permite eventos: no cuesta nada.
    track(event, props)
    const path = eventPath(event)
    pageview({ route: path, path })
  } catch {
    // analytics is best-effort; ignore failures
  }
}

/**
 * Returns a callback that fires `event` at most once for the lifetime of the
 * component. Useful for "first interaction" signals (e.g. the first time a user
 * edits a calculator input) so we measure engagement rather than bounces.
 */
export function useFireOnce(event: BogleEvent, props?: EventProps): () => void {
  const fired = useRef(false)
  const propsRef = useRef(props)
  // Se actualiza en un efecto y no durante el render: escribir una ref al renderizar puede
  // dar lecturas inconsistentes con el renderizado concurrente de React.
  useEffect(() => {
    propsRef.current = props
  })
  return useCallback(() => {
    if (fired.current) return
    fired.current = true
    trackEvent(event, propsRef.current)
  }, [event])
}
