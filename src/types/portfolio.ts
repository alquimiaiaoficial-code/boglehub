import { z } from 'zod'

export const PositionSchema = z.object({
  id: z.string(),
  ticker: z.string().min(1).max(10),
  shares: z.number().positive(),
  avgPrice: z.number().nonnegative(),
  currency: z.enum(['EUR', 'USD', 'GBP']),
  addedAt: z.string().datetime(),
})

export type Position = z.infer<typeof PositionSchema>

export const PortfolioSchema = z.object({
  positions: z.array(PositionSchema),
  monthlyContribution: z.number().nonnegative().optional(),
  targetAmount: z.number().positive().optional(),
})

export type Portfolio = z.infer<typeof PortfolioSchema>
