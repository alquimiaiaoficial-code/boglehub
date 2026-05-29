'use client'

import { track } from '@vercel/analytics'
import { useCallback, useRef } from 'react'

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
 * Fire a typed analytics event. Best-effort and never throws — analytics must
 * never break the UX, so any failure is swallowed silently.
 */
export function trackEvent(event: BogleEvent, props?: EventProps): void {
  try {
    track(event, props)
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
  propsRef.current = props
  return useCallback(() => {
    if (fired.current) return
    fired.current = true
    trackEvent(event, propsRef.current)
  }, [event])
}
