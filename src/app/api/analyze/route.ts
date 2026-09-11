import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PositionSchema } from '@/types/portfolio'
import { calculateAllocation } from '@/lib/analysis'
import { projectFire } from '@/lib/fire'
import { fetchPrices } from '@/lib/prices'
import { getEtfByTicker } from '@/lib/etf-database'
import { generateAiNarrative } from '@/lib/ai'
import { clasificarFalloDeIa } from '@/lib/fallo-ia'
import { rateLimit } from '@/lib/rate-limit'

const BodySchema = z.object({
  positions: z.array(PositionSchema).min(1).max(50),
  monthlyContribution: z.number().nonnegative().optional(),
  targetAmount: z.number().positive().optional(),
})

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 'analyze', 5)
  if (limited) return limited

  try {
    const body = BodySchema.parse(await req.json())

    const tickers = [...new Set(body.positions.map(p => p.ticker.toUpperCase()))]
    const pricesResult = await fetchPrices(tickers)
    if (!pricesResult.ok) {
      /**
       * `fetchPrices` falla cuando no consigue NI UN precio, y hasta el 11-sep-2026 de ahí
       * se deducía «los proveedores están caídos». La deducción es falsa y tiene otra causa
       * mucho más frecuente: **que ninguno de los tickers esté en el catálogo**.
       *
       * El caso real que lo destapó: quien tiene la cartera en fondos indexados —media
       * España, porque se traspasan sin tributar— recibía «Servicio temporalmente no
       * disponible. Inténtalo de nuevo en unos minutos». Las dos cosas eran mentira: ni era
       * temporal, ni reintentar iba a servir de nada. El analizador solo lee los ETFs del
       * catálogo, por ticker.
       *
       * Aquí se distingue por lo único que se puede saber sin adivinar: si ni un solo
       * ticker de la petición existe en el catálogo, el problema es de catálogo. Si alguno
       * existe y aun así no hubo precios, entonces sí es el proveedor.
       */
      const algunoConocido = tickers.some((t) => getEtfByTicker(t) != null)
      if (!algunoConocido) {
        return NextResponse.json(
          {
            success: false,
            error:
              'No reconocemos ninguno de esos tickers. El analizador lee un catálogo de ETFs cotizados por ticker (VWCE, IWDA, CSPX…); los fondos indexados todavía no los lee, aunque se busquen por ISIN. Revisa los tickers antes de volver a intentarlo.',
          },
          { status: 422 },
        )
      }
      return NextResponse.json({ success: false, error: 'Servicio de precios temporalmente no disponible. Inténtalo de nuevo en unos minutos.' }, { status: 503 })
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

    // A la IA se le manda SOLO el resultado de la proyección, nunca la aportación mensual
    // ni el objetivo del usuario: son circunstancias personales y el modelo no las necesita.
    // La proyección completa sí se devuelve al navegador más abajo, que es quien la enseña.
    const aiResult = await generateAiNarrative({
      allocation,
      fire: fire ? { yearsToFire: fire.yearsToFire } : undefined,
      positions: positionSummary,
    })
    // Si la IA falla, el análisis numérico se entrega igual: reparto por región y
    // sector, solapamiento, TER ponderado y proyección se calculan sin modelo. Es lo
    // que salvó la herramienta cuando Groq retiró el modelo en agosto de 2026: el
    // chat quedó inservible, pero el analizador siguió dando lo esencial.
    if (!aiResult.ok) {
      // Se clasifica igual que en el chat: sin esto, una caída del proveedor y una clave
      // revocada dejan exactamente el mismo rastro, y son problemas distintos.
      const causa = clasificarFalloDeIa(String(aiResult.error?.message ?? aiResult.error))
      console.error('[analyze] la narrativa de IA falló. Causa:', causa, '|', aiResult.error)
    }
    const aiNarrative = aiResult.ok
      ? aiResult.value
      : 'El comentario generado por IA no está disponible ahora mismo. El resto del análisis —reparto por región y sector, solapamiento, TER ponderado y proyección— está calculado con tus datos y es correcto.'

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
    // El detalle va al registro del servidor; al usuario se le da algo accionable.
    console.error('[analyze] fallo al analizar la cartera:', err)
    return NextResponse.json(
      {
        success: false,
        error:
          'No he podido analizar esa cartera. Revisa que los tickers y las cantidades sean correctos y vuelve a intentarlo.',
      },
      { status: 400 }
    )
  }
}
