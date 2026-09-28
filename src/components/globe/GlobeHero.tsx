'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useSyncExternalStore } from 'react'

// The 3D globe is heavy (three.js). Lazy-load it client-side only so it never
// blocks the Largest Contentful Paint or server-side rendering / SEO.
const Globe3D = dynamic(() => import('./Globe3D'), {
  ssr: false,
  loading: () => null,
})

const ESCRITORIO = '(min-width: 768px)'

/**
 * El globo solo en escritorio y cuando el navegador ya está libre (28-sep-2026).
 *
 * Aunque se cargaba en diferido, en móvil se descargaba igual: three.js son más de 150 KiB
 * y en un móvil medio competían con el contenido principal. Lighthouse en móvil daba a la
 * portada 5,2 s de LCP y 1,4 s de arranque de JavaScript. En una pantalla pequeña el globo
 * además se ve poco. Así que en móvil no se pide, y en escritorio se pide cuando el
 * navegador ha terminado lo importante.
 */
export function GlobeHero() {
  const escritorio = useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(ESCRITORIO)
      mq.addEventListener('change', avisar)
      return () => mq.removeEventListener('change', avisar)
    },
    () => window.matchMedia(ESCRITORIO).matches,
    () => false,
  )
  const [libre, setLibre] = useState(false)
  useEffect(() => {
    if (!escritorio) return
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number; cancelIdleCallback?: (id: number) => void }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setLibre(true))
      return () => w.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(() => setLibre(true), 1500)
    return () => window.clearTimeout(t)
  }, [escritorio])

  if (!escritorio || !libre) return null
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="h-[560px] w-[560px] max-w-[95vw] opacity-80 sm:h-[720px] sm:w-[720px]">
        <Globe3D />
      </div>
    </div>
  )
}
