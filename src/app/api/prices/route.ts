import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { fetchPrices } from '@/lib/prices'
import { rateLimit } from '@/lib/rate-limit'

const BodySchema = z.object({
  // Tickers de verdad: letras, números, punto y guion, hasta 20 caracteres.
  tickers: z.array(z.string().regex(/^[A-Za-z0-9.\-]{1,20}$/)).min(1).max(50),
})

/**
 * Con límite desde el 28-sep-2026. Sin él, cualquiera podía usar esta ruta como intermediario
 * gratuito contra Yahoo Finance, 50 tickers por llamada y sin tope, y acabar con nuestros
 * servidores bloqueados por Yahoo: el analizador se habría quedado sin precios para todos.
 */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 'prices', 30)
  if (limited) return limited
  try {
    const body = BodySchema.parse(await req.json())
    const result = await fetchPrices(body.tickers)
    if (!result.ok) {
      return NextResponse.json({ success: false, error: result.error.message }, { status: 502 })
    }
    return NextResponse.json({ success: true, data: result.value })
  } catch (err) {
    console.error('[prices] petición no válida:', err)
    return NextResponse.json({ success: false, error: 'Petición no válida' }, { status: 400 })
  }
}
