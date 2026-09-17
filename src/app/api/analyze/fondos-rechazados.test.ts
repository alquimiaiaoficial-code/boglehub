import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from './route'

/**
 * El caso que se colaba: una cartera formada SOLO por fondos que reconocemos y todavía no
 * analizamos.
 *
 * Se descubrió el 17-sep-2026 probando el despliegue en producción, no aquí. Los 240 tests
 * que había pasaban, porque ninguno cubría esta combinación. Lo que ocurría:
 *
 *   · `tickersEtf` quedaba vacío, así que `fetchPrices` no se llamaba;
 *   · por tanto `pricesResult` era `{ ok: true, value: {} }`;
 *   · por tanto la rama que devuelve el 422 no se ejecutaba;
 *   · y el análisis continuaba y devolvía **`success: true` con todo a cero**.
 *
 * Un reparto vacío y un TER de 0 % no parecen un error: parecen un dato. Es la peor forma
 * de fallar que tiene esta herramienta, y la razón de que este test llame al handler de
 * verdad en vez de comprobar cadenas del fichero fuente. Un test sobre el texto del código
 * habría seguido pasando con el bug dentro.
 *
 * Esta rama devuelve antes de tocar precios o modelo, así que no hay red que simular.
 */

function peticion(tickers: { ticker: string; shares: number }[]): NextRequest {
  return new NextRequest('https://boglehub.com/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      positions: tickers.map((t, i) => ({
        id: String(i + 1),
        ticker: t.ticker,
        shares: t.shares,
        avgPrice: 0,
        currency: 'EUR',
        addedAt: '2026-09-17T20:00:00.000Z',
      })),
    }),
  })
}

describe('una cartera solo de fondos no analizables no devuelve un análisis vacío', () => {
  it('el Vanguard Eurozone solo devuelve 422, no un cero disfrazado de dato', async () => {
    // IE0007987690 replica el MSCI EMU y no hay ETF de ese índice en el catálogo.
    const res = await POST(peticion([{ ticker: 'IE0007987690', shares: 3000 }]))
    expect(res.status).toBe(422)
    const cuerpo = await res.json()
    expect(cuerpo.success).toBe(false)
    // El mensaje tiene que explicar la causa a una persona, no dar un código.
    expect(cuerpo.error).toMatch(/Vanguard Eurozone/)
    expect(cuerpo.error).toMatch(/MSCI EMU/)
  })

  it('con dos fondos no analizables, los nombra los dos', async () => {
    const res = await POST(
      peticion([
        { ticker: 'IE0007987690', shares: 3000 },
        { ticker: 'IE0031786142', shares: 2000 },
      ]),
    )
    expect(res.status).toBe(422)
    const cuerpo = await res.json()
    expect(cuerpo.error).toMatch(/Vanguard Eurozone/)
    expect(cuerpo.error).toMatch(/Emerging Markets/)
  })

  it('NUNCA devuelve success con un total de cero euros', async () => {
    // La invariante que faltaba, dicha directamente: si no hay nada valorado, no hay
    // análisis. Da igual por qué no lo haya.
    const res = await POST(peticion([{ ticker: 'IE0007987690', shares: 3000 }]))
    const cuerpo = await res.json()
    if (cuerpo.success === true) {
      expect(cuerpo.data.allocation.totalValueEUR, 'un análisis a cero no es un análisis').toBeGreaterThan(0)
    }
  })
})
