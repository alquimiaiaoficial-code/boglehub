import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

/**
 * Un ETF del catálogo metido en euros no necesita precio (29-sep-2026).
 *
 * Ese día 24 de los 55 ETFs del catálogo no tenían precio, y en modo euros —el de por
 * defecto— quedaban fuera del análisis con «No se pudo obtener precio», aunque su valor es
 * justo el importe que ha escrito la persona. Los precios se simulan: aquí se decide qué
 * tickers tienen precio y cuáles no.
 */
const conPrecio = vi.hoisted(() => ({ tabla: {} as Record<string, number> }))

vi.mock('@/lib/prices', () => ({
  fetchPrices: vi.fn(async (tickers: string[]) => {
    const value = Object.fromEntries(
      tickers.map((t) => t.toUpperCase()).filter((t) => t in conPrecio.tabla).map((t) => [t, conPrecio.tabla[t]]),
    )
    return Object.keys(value).length > 0
      ? { ok: true, value }
      : { ok: false, error: new Error('sin precios') }
  }),
}))
vi.mock('@/lib/ai', () => ({
  generateAiNarrative: vi.fn(async () => ({ ok: true, value: 'comentario' })),
}))

const { POST } = await import('./route')

const peticion = (positions: object[]) =>
  new NextRequest('https://boglehub.com/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '198.51.100.' + Math.floor(Math.random() * 250) },
    body: JSON.stringify({
      positions: positions.map((p, i) => ({ id: String(i), avgPrice: 0, currency: 'EUR', addedAt: '2026-09-29T18:00:00.000Z', ...p })),
    }),
  })

beforeEach(() => {
  conPrecio.tabla = {}
})

describe('ETF del catálogo sin precio, metido en euros', () => {
  it('5.000 € de VWRP valen 5.000 € aunque ningún proveedor dé su precio', async () => {
    const res = await POST(peticion([{ ticker: 'VWRP', shares: 5000, unidad: 'euros' }]))
    const j = await res.json()
    expect(res.status).toBe(200)
    expect(j.success).toBe(true)
    expect(j.data.allocation.totalValueEUR).toBeCloseTo(5000, 2)
    expect(JSON.stringify(j.data)).not.toContain('No se pudo obtener precio para VWRP')
  })

  it('se mezcla bien con un ETF que sí tiene precio y va en participaciones', async () => {
    conPrecio.tabla = { VWCE: 100 }
    const res = await POST(peticion([
      { ticker: 'VWRP', shares: 5000, unidad: 'euros' },
      { ticker: 'VWCE', shares: 10 },
    ]))
    const j = await res.json()
    expect(j.data.allocation.totalValueEUR).toBeCloseTo(6000, 2)
  })

  it('en participaciones y sin precio NO se inventa un valor', async () => {
    const res = await POST(peticion([{ ticker: 'VWRP', shares: 10 }]))
    // Sin ningún precio y sin fondos, el servidor dice que los precios no están disponibles.
    expect(res.status).toBe(503)
  })

  it('si el mismo ticker va a la vez en euros y en participaciones, no se valora a 1 € la participación', async () => {
    conPrecio.tabla = { VWCE: 100 }
    const res = await POST(peticion([
      { ticker: 'VWCE', shares: 10 },
      { ticker: 'VWRP', shares: 5000, unidad: 'euros' },
      { ticker: 'VWRP', shares: 3 },
    ]))
    const j = await res.json()
    // VWRP queda fuera (sin precio para las 3 participaciones) y se avisa; solo cuenta VWCE.
    expect(j.data.allocation.totalValueEUR).toBeCloseTo(1000, 2)
    expect(JSON.stringify(j)).toContain('No se pudo obtener precio para VWRP')
  })

  it('un ticker que no está en el catálogo, aunque vaya en euros, no se valora a ciegas', async () => {
    const res = await POST(peticion([{ ticker: 'ZZZZ', shares: 5000, unidad: 'euros' }]))
    expect(res.status).toBe(422)
  })
})
