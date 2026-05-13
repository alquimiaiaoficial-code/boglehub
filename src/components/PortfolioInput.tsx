'use client'

import { useState } from 'react'
import { usePortfolio } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardTitle } from '@/components/ui/Card'
import { searchEtfs } from '@/lib/etf-database'

export function PortfolioInput() {
  const addPosition = usePortfolio((s) => s.addPosition)
  const [ticker, setTicker] = useState('')
  const [shares, setShares] = useState('')
  const [avgPrice, setAvgPrice] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleTickerChange = (val: string) => {
    setTicker(val.toUpperCase())
    if (val.length >= 2) {
      setSuggestions(searchEtfs(val).map((e) => `${e.ticker} — ${e.name}`))
    } else {
      setSuggestions([])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sharesNum = parseFloat(shares)
    const priceNum = parseFloat(avgPrice)
    if (!ticker || isNaN(sharesNum) || sharesNum <= 0 || isNaN(priceNum) || priceNum < 0) return
    addPosition({ ticker, shares: sharesNum, avgPrice: priceNum, currency: 'EUR' })
    setTicker('')
    setShares('')
    setAvgPrice('')
    setSuggestions([])
  }

  return (
    <Card>
      <CardTitle>Añadir posición</CardTitle>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4">
        <div className="relative sm:col-span-2">
          <Input placeholder="Ticker (ej. VWCE)" value={ticker} onChange={(e) => handleTickerChange(e.target.value)} />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-surface-2 shadow-lg">
              {suggestions.map((s) => {
                const t = s.split(' — ')[0]
                return (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => { setTicker(t); setSuggestions([]) }}
                      className="block w-full px-3 py-2 text-left text-sm text-fg hover:bg-surface-3"
                    >
                      {s}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <Input type="number" step="0.0001" placeholder="Participaciones" value={shares} onChange={(e) => setShares(e.target.value)} />
        <Input type="number" step="0.01" placeholder="Precio medio €" value={avgPrice} onChange={(e) => setAvgPrice(e.target.value)} />
        <Button type="submit" className="sm:col-span-4">Añadir</Button>
      </form>
    </Card>
  )
}
