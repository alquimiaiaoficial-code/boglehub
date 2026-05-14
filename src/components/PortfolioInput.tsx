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
    const priceNum = avgPrice.trim() === '' ? 0 : parseFloat(avgPrice)
    if (!ticker || isNaN(sharesNum) || sharesNum <= 0 || isNaN(priceNum) || priceNum < 0) return
    addPosition({ ticker, shares: sharesNum, avgPrice: priceNum, currency: 'EUR' })
    setTicker(''); setShares(''); setAvgPrice(''); setSuggestions([])
  }

  return (
    <Card>
      <CardTitle>Añadir posición</CardTitle>
      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        <div className="relative">
          <label className="block text-xs font-medium text-fg-muted mb-1.5">Ticker del ETF</label>
          <Input placeholder="VWCE, CSPX, IWDA..." value={ticker} onChange={(e) => handleTickerChange(e.target.value)} />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-surface-2 shadow-xl">
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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-fg-muted mb-1.5">Participaciones</label>
            <Input type="number" step="0.0001" placeholder="100" value={shares} onChange={(e) => setShares(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-fg-muted mb-1.5">
              Precio que pagaste <span className="text-fg-subtle font-normal">(opcional)</span>
            </label>
            <Input type="number" step="0.01" placeholder="0,00 €" value={avgPrice} onChange={(e) => setAvgPrice(e.target.value)} />
          </div>
        </div>

        <p className="text-xs text-fg-subtle leading-relaxed">
          El precio actual lo cogemos de Yahoo Finance automáticamente. Solo necesitas decirnos lo que pagaste si quieres ver ganancias/pérdidas. Si no, déjalo vacío.
        </p>

        <Button type="submit" className="w-full">Añadir posición</Button>
      </form>
    </Card>
  )
}
