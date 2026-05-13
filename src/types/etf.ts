import { z } from 'zod'

export const RegionSchema = z.enum([
  'US', 'EUROPE', 'EM', 'JAPAN', 'GLOBAL', 'UK', 'PACIFIC_EX_JAPAN', 'CHINA', 'OTHER',
])
export type Region = z.infer<typeof RegionSchema>

export const AssetClassSchema = z.enum([
  'EQUITY', 'BOND', 'COMMODITY', 'REIT', 'CASH', 'MIXED',
])
export type AssetClass = z.infer<typeof AssetClassSchema>

export const SectorSchema = z.enum([
  'TECHNOLOGY', 'FINANCIAL', 'HEALTHCARE', 'CONSUMER_DISC', 'CONSUMER_STAPLES',
  'INDUSTRIAL', 'ENERGY', 'UTILITIES', 'MATERIALS', 'COMMUNICATION', 'REAL_ESTATE',
  'DIVERSIFIED',
])
export type Sector = z.infer<typeof SectorSchema>

export const EtfMetadataSchema = z.object({
  ticker: z.string(),
  isin: z.string().optional(),
  name: z.string(),
  ter: z.number().min(0).max(5),
  assetClass: AssetClassSchema,
  regionAllocation: z.record(RegionSchema, z.number()),
  sectorAllocation: z.record(SectorSchema, z.number()).optional(),
  baseCurrency: z.enum(['EUR', 'USD', 'GBP']),
  accumulating: z.boolean(),
})

export type EtfMetadata = z.infer<typeof EtfMetadataSchema>
