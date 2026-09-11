import { z } from 'zod'
import { CurrencySchema } from './etf'

export const PositionSchema = z.object({
  id: z.string(),
  /**
   * 12, no 10, desde el 11-sep-2026.
   *
   * Un fondo indexado no tiene ticker: se identifica por **ISIN**, que son exactamente 12
   * caracteres. Con `max(10)` la petición moría en el `parse` antes de que nadie mirara
   * ningún catálogo, así que el mensaje que explica «los fondos indexados todavía no los
   * lee, aunque se busquen por ISIN» **no lo leía nunca quien buscaba por ISIN**.
   *
   * Y como Zod valida el array entero, un solo ISIN tumbaba la cartera completa: quien
   * tuviera dos ETFs y tres fondos no recibía un análisis parcial, recibía un 400.
   *
   * Ensanchar la cota no invalida nada guardado —`PortfolioSchema` usa este mismo esquema y
   * solo acepta más de lo que aceptaba—, y el único otro consumidor es el array de
   * `api/analyze`. Lo que entre y no esté en el catálogo lo resuelve `route.ts` con un 422
   * que sí dice lo que pasa.
   */
  ticker: z.string().min(1).max(12),
  shares: z.number().positive(),
  avgPrice: z.number().nonnegative(),
  currency: CurrencySchema,
  addedAt: z.string().datetime(),
})

export type Position = z.infer<typeof PositionSchema>

export const PortfolioSchema = z.object({
  positions: z.array(PositionSchema),
  monthlyContribution: z.number().nonnegative().optional(),
  targetAmount: z.number().positive().optional(),
})

export type Portfolio = z.infer<typeof PortfolioSchema>
