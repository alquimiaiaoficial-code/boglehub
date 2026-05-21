'use client'

import { useEffect } from 'react'

/**
 * Registra el service worker solo en producción. Silencioso si falla:
 * el SW es mejora progresiva, no requisito.
 */
export function PWAInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return
    if (process.env.NODE_ENV !== 'production') return

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // silent — service worker is progressive enhancement
      })
    }

    if (document.readyState === 'complete') {
      register()
    } else {
      window.addEventListener('load', register, { once: true })
    }
  }, [])

  return null
}
