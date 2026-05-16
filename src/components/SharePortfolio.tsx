'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { usePortfolio } from '@/lib/store'
import { encodePortfolio } from '@/lib/share'
import { Button } from '@/components/ui/Button'

export function SharePortfolio() {
  const positions = usePortfolio((s) => s.positions)
  const [copied, setCopied] = useState(false)

  if (positions.length === 0) return null

  const handleShare = async () => {
    const encoded = encodePortfolio(positions)
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://boglehub.vercel.app'
    const url = `${origin}/cartera?d=${encoded}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Mi cartera en BogleHub',
          text: 'Mira el análisis de mi cartera de fondos indexados',
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch {
      // User cancelled the share dialog — no action needed.
    }
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleShare} className="w-full">
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Enlace copiado
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Compartir mi cartera
        </>
      )}
    </Button>
  )
}
