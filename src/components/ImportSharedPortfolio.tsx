'use client'

import { useRouter } from 'next/navigation'
import { Copy } from 'lucide-react'
import { usePortfolio } from '@/lib/store'
import { Position } from '@/types/portfolio'
import { Button } from '@/components/ui/Button'

export function ImportSharedPortfolio({ positions }: { positions: Position[] }) {
  const router = useRouter()
  const setPositions = usePortfolio((s) => s.setPositions)

  const handleImport = () => {
    setPositions(positions)
    router.push('/analyzer')
  }

  return (
    <Button variant="accent" size="lg" onClick={handleImport}>
      <Copy className="h-4 w-4" />
      Copiar a mi analizador
    </Button>
  )
}
