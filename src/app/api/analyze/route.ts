import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PositionSchema } from '@/types/portfolio'
import { calculateAllocation } from '@/lib/analysis'
import { projectFire } from '@/lib/fire'
import { fetchPrices } from '@/lib/prices'
import { getEtfByTicker } from '@/lib/etf-database'
import {
  resolverFondo,
  type FondoAnalizable,
  type FondoNoAnalizable,
} from '@/lib/fondos-analizables'
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

    const entradas = [...new Set(body.positions.map(p => p.ticker.toUpperCase()))]

    /**
     * Desde el 17-sep-2026 el analizador lee FONDOS INDEXADOS, no solo ETFs.
     *
     * El motivo, dicho por quien lo sabe: preguntado directamente por correo, Luis Ángel
     * Hernández (Salud Financiera, ex-Rankia) contestó que «en España la mayoría de
     * personas invierten en fondos no en ETFs, por lo que la mayoría de carteras están
     * compuestas de fondos de inversión». La herramienta leía 68 ETFs y cero fondos.
     *
     * Un fondo no cotiza: no hay precio de mercado por ticker, y por eso no puede pasar por
     * `fetchPrices`. Se separan aquí las dos cosas y cada una se valora como toca.
     */
    const fondos = new Map<string, FondoAnalizable>()
    const fondosRechazados: FondoNoAnalizable[] = []
    const tickersEtf: string[] = []
    for (const entrada of entradas) {
      const resuelto = resolverFondo(entrada)
      if (resuelto == null) {
        tickersEtf.push(entrada)
      } else if ('analizable' in resuelto) {
        fondos.set(entrada, resuelto.analizable)
      } else {
        fondosRechazados.push(resuelto.noAnalizable)
      }
    }

    /**
     * Si no queda NADA que valorar, se dice por qué antes de calcular.
     *
     * Bug real, cazado al probar en producción el 17-sep y que los 240 tests no vieron
     * porque ninguno cubría este caso: una cartera formada solo por fondos que reconocemos
     * y no analizamos no entraba en ninguna rama de error. `tickersEtf` estaba vacío, así
     * que `fetchPrices` no se llamaba y `pricesResult` era `ok`; el análisis seguía adelante
     * y devolvía `success: true` con todo a cero. Un reparto vacío y un TER de 0 % parecen
     * un dato, no un fallo — que es la peor forma de fallar que hay en esta herramienta.
     */
    if (tickersEtf.length === 0 && fondos.size === 0) {
      return NextResponse.json(
        {
          success: false,
          error: fondosRechazados.length > 0
            ? `${fondosRechazados.length === 1 ? 'Reconocemos ese fondo, pero todavía no lo analizamos' : 'Reconocemos esos fondos, pero todavía no los analizamos'}. ${fondosRechazados
                .map((f) => `${f.fondo.name}: ${f.motivo}`)
                .join(' ')}`
            : 'No hay nada que analizar en esa cartera.',
        },
        { status: 422 },
      )
    }

    const pricesResult = tickersEtf.length > 0
      ? await fetchPrices(tickersEtf)
      : ({ ok: true as const, value: {} as Record<string, number> })

    // Si los ETFs no dan precio pero hay fondos que sí se pueden analizar, el análisis
    // sigue con los fondos y se avisa de lo que falta. Antes, un solo ETF sin precio
    // tumbaba la cartera completa; para quien lleva mayoría de fondos eso era perderlo todo
    // por la parte pequeña.
    if (!pricesResult.ok && fondos.size === 0) {
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
      const algunoConocido = tickersEtf.some((t) => getEtfByTicker(t) != null)
      if (!algunoConocido) {
        // Si lo que entró eran fondos que conocemos pero no analizamos todavía, el mensaje
        // lo dice con nombre y motivo. Decirle «no reconocemos esos tickers» a quien pegó
        // un fondo que tenemos publicado con su ficha sería mentira.
        const error = fondosRechazados.length > 0
          ? `Reconocemos ${fondosRechazados.length === 1 ? 'ese fondo' : 'esos fondos'}, pero todavía no ${fondosRechazados.length === 1 ? 'lo analizamos' : 'los analizamos'}. ${fondosRechazados
              .map((f) => `${f.fondo.name}: ${f.motivo}`)
              .join(' ')}`
          : 'No reconocemos ninguno de esos identificadores. El analizador lee un catálogo de ETFs cotizados por ticker (VWCE, IWDA, CSPX…) y de fondos indexados por ISIN. Revísalos antes de volver a intentarlo.'
        return NextResponse.json({ success: false, error }, { status: 422 })
      }
      return NextResponse.json({ success: false, error: 'Servicio de precios temporalmente no disponible. Inténtalo de nuevo en unos minutos.' }, { status: 503 })
    }

    /**
     * Un fondo no tiene precio de mercado, así que su unidad es el euro y el precio de un
     * euro es uno. Quien llama a la API pasa el importe en `shares`, que además es el dato
     * que el inversor ve en su plataforma —MyInvestor dice «tienes 12.430,18 €», no «tienes
     * 812,4431 participaciones a 15,30»—, y por tanto el menos propenso a error.
     */
    const precios: Record<string, number> = { ...(pricesResult.ok ? pricesResult.value : {}) }
    for (const isin of fondos.keys()) precios[isin] = 1

    const allocation = calculateAllocation(body.positions, precios, fondos)

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

    // Los fondos que reconocemos pero no analizamos se dicen con nombre y motivo, aunque el
    // resto de la cartera sí se haya analizado. Quedarían fuera del reparto en silencio y el
    // usuario vería porcentajes que no suman lo que él tiene sin saber por qué.
    for (const rechazado of fondosRechazados) {
      warnings.push(`${rechazado.fondo.name} no entra en este análisis. ${rechazado.motivo}`)
    }

    if (!pricesResult.ok && fondos.size > 0) {
      warnings.push(
        'No se han podido obtener los precios de los ETFs de la cartera, así que el análisis solo incluye los fondos. Los porcentajes son los de esa parte, no los del total.',
      )
    }

    const positionSummary = body.positions.map(p => {
      const ticker = p.ticker.toUpperCase()
      const esFondoRechazado = fondosRechazados.some(
        (f) => f.fondo.isin.toUpperCase() === ticker || f.fondo.slug.toUpperCase() === ticker,
      )
      if (precios[ticker] == null && !esFondoRechazado) {
        warnings.push(`No se pudo obtener precio para ${ticker}`)
      }
      const value = p.shares * (precios[ticker] ?? 0)
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

    /**
     * Se construye AQUÍ, después de llamar al modelo, y no arriba junto al resto del
     * análisis. El motivo no es de estilo: `promesas-publicadas.test.ts` vigila el tramo
     * entre `positionSummary` y `generateAiNarrative` como «lo que se le manda al modelo»,
     * y al escribirlo ahí el test saltó. No se le mandaba —esto va al navegador—, pero el
     * sitio hacía pensar que sí, y en un fichero donde la promesa pública es qué datos
     * salen hacia un tercero, parecerlo ya es un problema.
     */
    /**
     * De dónde sale la exposición de cada fondo, dicho fondo por fondo.
     *
     * Esto NO es un detalle de implementación que se pueda callar: el reparto por región y
     * sector de un fondo se ha calculado con los datos de otro producto. Es correcto cuando
     * ambos replican el mismo índice, y es una aproximación cuando no. En los dos casos el
     * usuario tiene derecho a saberlo sin preguntar, y quien publique una captura de esto
     * tiene derecho a no quedar en evidencia.
     */
    const fuentesDeExposicion = [...fondos.values()].map((f) => ({
      fondo: f.fondo.name,
      isin: f.fondo.isin,
      ter: f.fondo.ter,
      exposicionTomadaDe: f.etfExposicion.ticker,
      indiceDelFondo: f.fondo.index,
      calidad: f.calidad,
      nota: f.nota,
    }))

    return NextResponse.json({
      success: true,
      data: {
        allocation,
        fire,
        aiNarrative,
        warnings,
        fuentesDeExposicion,
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
