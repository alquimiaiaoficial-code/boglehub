import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PositionSchema } from '@/types/portfolio'
import { calculateAllocation } from '@/lib/analysis'
import { projectFire } from '@/lib/fire'
import { fetchPrices } from '@/lib/prices'
import { generateAiNarrative } from '@/lib/ai'

const BodySchema = z.object({
  positions: z.array(PositionSchema).min(1).max(50),
  monthlyContribution: z.number().nonnegative().optional(),
  targetAmount: z.number().positive().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = BodySchema.parse(await req.json())

    const tickers = [...new Set(body.positions.map(p => p.ticker.toUpperCase()))]
    const pricesResult = await fetchPrices(tickers)
    if (!pricesResult.ok) {
      return NextResponse.json({ success: false, error: 'No se pudieron obtener precios actualizados' }, { status: 502 })
    }

    const allocation = calculateAllocation(body.positions, pricesResult.value)

    let fire: ReturnType<typeof projectFire> | undefined
    if (body.monthlyContribution != null && body.targetAmount != null) {
      fire = projectFire({
        currentValue: allocation.totalValueEUR,
        monthlyContribution: body.monthlyContribution,
        targetAmount: body.targetAmount,
        expectedAnnualReturn: 0.07,
      })
    }

    const warnings: string[] = []

    const positionSummary = body.positions.map(p => {
      const ticker = p.ticker.toUpperCase()
      if (pricesResult.value[ticker] == null) {
        warnings.push(`No se pudo obtener precio para ${ticker}`)
      }
      const value = p.shares * (pricesResult.value[ticker] ?? 0)
      return {
        ticker,
        valueEUR: value,
        weight: allocation.totalValueEUR > 0 ? value / allocation.totalValueEUR : 0,
      }
    })

    const aiResult = await generateAiNarrative({ allocation, fire, positions: positionSummary })
    const aiNarrative = aiResult.ok ? aiResult.value : 'No se pudo generar el análisis IA en este momento.'

    return NextResponse.json({
      success: true,
      data: {
        allocation,
        fire,
        aiNarrative,
        warnings,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 400 })
  }
}
