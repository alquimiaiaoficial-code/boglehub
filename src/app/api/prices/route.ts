import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { fetchPrices } from '@/lib/prices'

const BodySchema = z.object({
  tickers: z.array(z.string()).min(1).max(50),
})

export async function POST(req: NextRequest) {
  try {
    const body = BodySchema.parse(await req.json())
    const result = await fetchPrices(body.tickers)
    if (!result.ok) {
      return NextResponse.json({ success: false, error: result.error.message }, { status: 502 })
    }
    return NextResponse.json({ success: true, data: result.value })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 400 })
  }
}
