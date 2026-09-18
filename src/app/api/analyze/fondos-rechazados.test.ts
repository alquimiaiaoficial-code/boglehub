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
  it('un fondo no verificado solo devuelve 422, no un cero disfrazado de dato', async () => {
    // LU1931974692 no se analiza porque NO ES UN FONDO: es el «Amundi Prime Global UCITS
    // ETF DR (D)». El ejemplo anterior era LU0996177134 y dejó de valer al verificarlo.
    const res = await POST(peticion([{ ticker: 'LU1931974692', shares: 3000 }]))
    expect(res.status).toBe(422)
    const cuerpo = await res.json()
    expect(cuerpo.success).toBe(false)
    // El mensaje tiene que explicar la causa a una persona, no dar un código.
    expect(cuerpo.error).toMatch(/Amundi/)
    expect(cuerpo.error).toMatch(/ETF/)
  })

  /**
   * Este caso pedia dos fondos no analizables hasta el 18-sep-2026, cuando el Vanguard
   * Emerging Markets paso a analizarse —su factsheet dice MSCI EM, no FTSE como sospeche—.
   * Ya solo queda uno fuera, asi que el test pasa a cubrir algo MEJOR y mas realista: la
   * cartera MIXTA, con un fondo que se analiza y otro que no.
   *
   * Es el caso que de verdad puede enganar: el analisis sale bien, con numeros correctos, y
   * la posicion que se quedo fuera solo se nota si alguien la nombra.
   */
  it('si un fondo se analiza y otro no, devuelve el analisis Y nombra el que falta', async () => {
    const res = await POST(
      peticion([
        { ticker: 'IE0031786142', shares: 5000 }, // analizable (MSCI EM -> AEEM)
        { ticker: 'LU1931974692', shares: 3000 }, // fuera (es un ETF, no un fondo)
      ]),
    )
    expect(res.status).toBe(200)
    const cuerpo = await res.json()
    expect(cuerpo.success).toBe(true)
    // El que entra, entra con su procedencia declarada.
    expect(cuerpo.data.fuentesDeExposicion).toHaveLength(1)
    expect(cuerpo.data.fuentesDeExposicion[0].exposicionTomadaDe).toBe('AEEM')
    // Y el que se queda fuera se dice con nombre y motivo, no en silencio.
    const avisos = (cuerpo.data.warnings as string[]).join(' ')
    expect(avisos).toMatch(/Amundi/)
    expect(avisos).toMatch(/ETF/)
    // El total es solo del que si se analizo: 5.000 EUR, no 8.000.
    expect(cuerpo.data.allocation.totalValueEUR).toBe(5000)
  })

  it('NUNCA devuelve success con un total de cero euros', async () => {
    // La invariante que faltaba, dicha directamente: si no hay nada valorado, no hay
    // análisis. Da igual por qué no lo haya.
    const res = await POST(peticion([{ ticker: 'LU0996177134', shares: 3000 }]))
    const cuerpo = await res.json()
    if (cuerpo.success === true) {
      expect(cuerpo.data.allocation.totalValueEUR, 'un análisis a cero no es un análisis').toBeGreaterThan(0)
    }
  })
})
