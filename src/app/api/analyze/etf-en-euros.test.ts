import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'

/**
 * Un ETF metido en euros (28-sep-2026). El servidor lo pasa a participaciones con el precio
 * del día y desde ahí lo trata igual. Si esto se rompe, quien meta «6.000 € de VWCE» vería su
 * posición valorada como 6.000 participaciones: unas setecientas mil veces lo que tiene.
 *
 * Los precios se simulan: el test no puede depender de que Yahoo responda.
 */
vi.mock('@/lib/prices', () => ({
  fetchPrices: vi.fn(async (tickers: string[]) => ({
    ok: true,
    value: Object.fromEntries(tickers.map((t) => [t.toUpperCase(), 100])),
  })),
}))
vi.mock('@/lib/ai', () => ({
  generateAiNarrative: vi.fn(async () => ({ ok: true, value: 'comentario' })),
}))

const { POST } = await import('./route')

const peticion = (positions: object[]) =>
  new NextRequest('https://boglehub.com/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.0.2.' + Math.floor(Math.random() * 250) },
    body: JSON.stringify({
      positions: positions.map((p, i) => ({ id: String(i), avgPrice: 0, currency: 'EUR', addedAt: '2026-09-28T20:00:00.000Z', ...p })),
    }),
  })

describe('ETF en euros', () => {
  it('6.000 € de VWCE valen 6.000 €, no 6.000 participaciones', async () => {
    const res = await POST(peticion([{ ticker: 'VWCE', shares: 6000, unidad: 'euros' }]))
    const j = await res.json()
    expect(j.success).toBe(true)
    expect(j.data.allocation.totalValueEUR).toBeCloseTo(6000, 2)
  })

  it('en participaciones sigue valiendo participaciones × precio', async () => {
    const res = await POST(peticion([{ ticker: 'VWCE', shares: 10 }]))
    const j = await res.json()
    expect(j.data.allocation.totalValueEUR).toBeCloseTo(1000, 2)
  })

  it('devuelve el peso de cada posición, que usa la concentración', async () => {
    const res = await POST(peticion([
      { ticker: 'VWCE', shares: 6000, unidad: 'euros' },
      { ticker: 'CSPX', shares: 3000, unidad: 'euros' },
    ]))
    const j = await res.json()
    const pesos = Object.fromEntries(j.data.posiciones.map((p: { ticker: string; weight: number }) => [p.ticker, p.weight]))
    expect(pesos.VWCE).toBeCloseTo(2 / 3, 5)
    expect(pesos.CSPX).toBeCloseTo(1 / 3, 5)
  })
})
