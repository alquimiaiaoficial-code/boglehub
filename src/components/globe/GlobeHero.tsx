'use client'

import dynamic from 'next/dynamic'

// The 3D globe is heavy (three.js). Lazy-load it client-side only so it never
// blocks the Largest Contentful Paint or server-side rendering / SEO.
const Globe3D = dynamic(() => import('./Globe3D'), {
  ssr: false,
  loading: () => null,
})

export function GlobeHero() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="h-[560px] w-[560px] max-w-[90vw] opacity-60 sm:h-[680px] sm:w-[680px]">
        <Globe3D />
      </div>
    </div>
  )
}
