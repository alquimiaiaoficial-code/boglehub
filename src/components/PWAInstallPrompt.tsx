'use client'

import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const STORAGE_KEY = 'pwa-install-dismissed-at'
const RESHOW_AFTER_MS = 1000 * 60 * 60 * 24 * 14 // 14 días

/**
 * Muestra un prompt de instalación PWA cuando el navegador dispara
 * `beforeinstallprompt`. Si el usuario lo descarta, no vuelve a aparecer
 * durante 14 días.
 */
export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const dismissedAt = Number(localStorage.getItem(STORAGE_KEY) ?? 0)
    if (dismissedAt && Date.now() - dismissedAt < RESHOW_AFTER_MS) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setHidden(false)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (hidden || !deferredPrompt) return null

  function handleInstall() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(({ outcome }) => {
      if (outcome === 'dismissed') {
        localStorage.setItem(STORAGE_KEY, String(Date.now()))
      }
      setDeferredPrompt(null)
      setHidden(true)
    })
  }

  function handleDismiss() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
    setHidden(true)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm rounded-xl bg-surface border border-border p-4 shadow-2xl z-50">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent text-white">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-fg">
            Instala BogleHub en tu móvil
          </p>
          <p className="text-xs text-fg-muted mt-1 leading-relaxed">
            Acceso directo desde tu pantalla de inicio, carga instantánea y
            modo offline. Tus datos siguen viviendo solo en tu navegador.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleInstall}
              className="flex-1 rounded-lg bg-brand-600 hover:bg-brand-500 px-3 py-1.5 text-sm font-medium text-white transition-colors"
            >
              Instalar
            </button>
            <button
              onClick={handleDismiss}
              className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg-muted hover:text-fg transition-colors"
            >
              Ahora no
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Cerrar"
          className="flex-shrink-0 text-fg-muted hover:text-fg transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
