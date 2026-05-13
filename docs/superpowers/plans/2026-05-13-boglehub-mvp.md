# BogleHub MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deployed MVP that lets a Spanish passive investor enter their ETF portfolio manually, fetch live prices, and receive an AI-powered analysis (allocation, geographic, sector, FIRE projection) in Spanish.

**Architecture:** Next.js 15 App Router + TypeScript strict. Pure functions for analysis (TDD-friendly). Groq Llama 3.3 70B for AI narrative. Yahoo Finance for live prices. localStorage for persistence (no auth in MVP). Vercel deploy.

**Tech Stack:** Next.js 15, TypeScript, Tailwind v4, Groq SDK, Zod, Zustand, Recharts, Vitest.

**Spec reference:** `docs/superpowers/specs/2026-05-13-boglehub-design.md`

---

## Phase 1 — Core Library (Pure Functions, TDD)

The entire analysis engine is pure functions: portfolio + ETF metadata + prices → numbers. Test-driven, no UI dependencies.

### Task 1: Type definitions

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/types/etf.ts`
- Create: `src/types/analysis.ts`

- [ ] **Step 1.1: Create portfolio types**

`src/types/portfolio.ts`:
```typescript
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
```

- [ ] **Step 1.2: Create ETF types**

`src/types/etf.ts`:
```typescript
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
```

- [ ] **Step 1.3: Create analysis types**

`src/types/analysis.ts`:
```typescript
import { Region, AssetClass, Sector } from './etf'

export interface AllocationBreakdown {
  byAssetClass: Record<AssetClass, number>
  byRegion: Record<Region, number>
  bySector: Partial<Record<Sector, number>>
  byCurrency: Record<'EUR' | 'USD' | 'GBP', number>
  weightedTER: number
  totalValueEUR: number
}

export interface FireProjection {
  currentValue: number
  monthlyContribution: number
  targetAmount: number
  yearsToFire: number
  expectedAnnualReturn: number
}

export interface Analysis {
  allocation: AllocationBreakdown
  fire?: FireProjection
  aiNarrative: string
  warnings: string[]
}

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }
```

- [ ] **Step 1.4: Commit**

```bash
git add src/types/
git commit -m "feat(types): portfolio, ETF, and analysis type definitions with Zod"
```

---

### Task 2: Static ETF database

Initial database of 20 popular ETFs for Spanish Bogleheads.

**Files:**
- Create: `src/data/etfs.json`
- Create: `src/lib/etf-database.ts`
- Create: `src/lib/etf-database.test.ts`

- [ ] **Step 2.1: Write failing test for ETF lookup**

`src/lib/etf-database.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { getEtfByTicker, searchEtfs } from './etf-database'

describe('ETF database', () => {
  it('returns metadata for known ticker VWCE', () => {
    const etf = getEtfByTicker('VWCE')
    expect(etf).toBeDefined()
    expect(etf?.assetClass).toBe('EQUITY')
    expect(etf?.ter).toBeLessThan(0.5)
  })

  it('returns null for unknown ticker', () => {
    expect(getEtfByTicker('ZZZZ')).toBeNull()
  })

  it('searches case-insensitively', () => {
    expect(getEtfByTicker('vwce')).not.toBeNull()
  })

  it('searchEtfs returns matches by name', () => {
    const results = searchEtfs('world')
    expect(results.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2.2: Run test to verify it fails**

Run: `npx vitest run src/lib/etf-database.test.ts`
Expected: FAIL with "Cannot find module"

- [ ] **Step 2.3: Create ETF data file**

`src/data/etfs.json`:
```json
[
  {
    "ticker": "VWCE",
    "isin": "IE00BK5BQT80",
    "name": "Vanguard FTSE All-World UCITS ETF (Acc)",
    "ter": 0.22,
    "assetClass": "EQUITY",
    "regionAllocation": { "US": 0.62, "EUROPE": 0.14, "JAPAN": 0.06, "EM": 0.10, "PACIFIC_EX_JAPAN": 0.04, "UK": 0.04 },
    "sectorAllocation": { "TECHNOLOGY": 0.24, "FINANCIAL": 0.15, "HEALTHCARE": 0.12, "CONSUMER_DISC": 0.11, "INDUSTRIAL": 0.10, "COMMUNICATION": 0.08, "CONSUMER_STAPLES": 0.06, "ENERGY": 0.05, "MATERIALS": 0.04, "UTILITIES": 0.03, "REAL_ESTATE": 0.02 },
    "baseCurrency": "USD",
    "accumulating": true
  },
  {
    "ticker": "CSPX",
    "isin": "IE00B5BMR087",
    "name": "iShares Core S&P 500 UCITS ETF (Acc)",
    "ter": 0.07,
    "assetClass": "EQUITY",
    "regionAllocation": { "US": 1.0 },
    "sectorAllocation": { "TECHNOLOGY": 0.31, "FINANCIAL": 0.13, "HEALTHCARE": 0.12, "CONSUMER_DISC": 0.11, "COMMUNICATION": 0.09, "INDUSTRIAL": 0.08, "CONSUMER_STAPLES": 0.06, "ENERGY": 0.04, "UTILITIES": 0.03, "REAL_ESTATE": 0.02, "MATERIALS": 0.01 },
    "baseCurrency": "USD",
    "accumulating": true
  },
  {
    "ticker": "IWDA",
    "isin": "IE00B4L5Y983",
    "name": "iShares Core MSCI World UCITS ETF (Acc)",
    "ter": 0.20,
    "assetClass": "EQUITY",
    "regionAllocation": { "US": 0.71, "EUROPE": 0.14, "JAPAN": 0.06, "PACIFIC_EX_JAPAN": 0.04, "UK": 0.04, "OTHER": 0.01 },
    "baseCurrency": "USD",
    "accumulating": true
  },
  {
    "ticker": "EIMI",
    "isin": "IE00BKM4GZ66",
    "name": "iShares Core MSCI EM IMI UCITS ETF (Acc)",
    "ter": 0.18,
    "assetClass": "EQUITY",
    "regionAllocation": { "EM": 1.0 },
    "baseCurrency": "USD",
    "accumulating": true
  },
  {
    "ticker": "AGGH",
    "isin": "IE00BDBRDM35",
    "name": "iShares Core Global Aggregate Bond UCITS ETF EUR Hedged (Acc)",
    "ter": 0.10,
    "assetClass": "BOND",
    "regionAllocation": { "GLOBAL": 1.0 },
    "baseCurrency": "EUR",
    "accumulating": true
  }
]
```

(Plus 15 more popular ETFs — VEUR, VFEM, IMEU, SEMB, VAGF, etc. Engineer will expand this list.)

- [ ] **Step 2.4: Implement etf-database.ts**

`src/lib/etf-database.ts`:
```typescript
import { EtfMetadata, EtfMetadataSchema } from '@/types/etf'
import rawData from '@/data/etfs.json'

const ETF_DB: EtfMetadata[] = (rawData as unknown[]).map(item => EtfMetadataSchema.parse(item))
const ETF_BY_TICKER = new Map(ETF_DB.map(etf => [etf.ticker.toUpperCase(), etf]))

export function getEtfByTicker(ticker: string): EtfMetadata | null {
  return ETF_BY_TICKER.get(ticker.toUpperCase()) ?? null
}

export function searchEtfs(query: string): EtfMetadata[] {
  const q = query.toLowerCase()
  return ETF_DB.filter(etf =>
    etf.ticker.toLowerCase().includes(q) ||
    etf.name.toLowerCase().includes(q)
  ).slice(0, 10)
}

export function getAllEtfs(): EtfMetadata[] {
  return [...ETF_DB]
}
```

- [ ] **Step 2.5: Run tests to verify they pass**

Run: `npx vitest run src/lib/etf-database.test.ts`
Expected: PASS all 4 tests

- [ ] **Step 2.6: Commit**

```bash
git add src/data/etfs.json src/lib/etf-database.ts src/lib/etf-database.test.ts
git commit -m "feat(etfs): static ETF database with lookup and search"
```

---

### Task 3: Asset allocation calculation

**Files:**
- Create: `src/lib/analysis.ts`
- Create: `src/lib/analysis.test.ts`

- [ ] **Step 3.1: Write failing tests for allocation calculation**

`src/lib/analysis.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { calculateAllocation } from './analysis'
import { Position } from '@/types/portfolio'

const VWCE_PRICE = 110
const CSPX_PRICE = 500

const positions: Position[] = [
  { id: '1', ticker: 'VWCE', shares: 100, avgPrice: 100, currency: 'EUR', addedAt: '2024-01-01T00:00:00Z' },
  { id: '2', ticker: 'CSPX', shares: 10, avgPrice: 450, currency: 'EUR', addedAt: '2024-01-01T00:00:00Z' },
]

const prices = { VWCE: VWCE_PRICE, CSPX: CSPX_PRICE }

describe('calculateAllocation', () => {
  it('computes total portfolio value in EUR', () => {
    const result = calculateAllocation(positions, prices)
    expect(result.totalValueEUR).toBeCloseTo(100 * 110 + 10 * 500, 2)
  })

  it('100% EQUITY when only equity ETFs', () => {
    const result = calculateAllocation(positions, prices)
    expect(result.byAssetClass.EQUITY).toBeCloseTo(1.0, 4)
  })

  it('weighted TER averages correctly', () => {
    const result = calculateAllocation(positions, prices)
    const vwceVal = 100 * 110
    const cspxVal = 10 * 500
    const total = vwceVal + cspxVal
    const expectedTer = (vwceVal * 0.22 + cspxVal * 0.07) / total
    expect(result.weightedTER).toBeCloseTo(expectedTer, 4)
  })

  it('region allocation reflects ETF weights', () => {
    const result = calculateAllocation(positions, prices)
    expect(result.byRegion.US).toBeGreaterThan(0.5)
  })

  it('warns on unknown ticker', () => {
    const bad: Position[] = [
      { id: '1', ticker: 'UNKNOWN', shares: 1, avgPrice: 100, currency: 'EUR', addedAt: '2024-01-01T00:00:00Z' },
    ]
    const result = calculateAllocation(bad, { UNKNOWN: 100 })
    expect(result.totalValueEUR).toBe(100)
    expect(result.byAssetClass.EQUITY ?? 0).toBe(0)
  })
})
```

- [ ] **Step 3.2: Run test to verify it fails**

Run: `npx vitest run src/lib/analysis.test.ts`
Expected: FAIL with "calculateAllocation not exported"

- [ ] **Step 3.3: Implement calculateAllocation**

`src/lib/analysis.ts`:
```typescript
import { Position } from '@/types/portfolio'
import { AllocationBreakdown } from '@/types/analysis'
import { Region, AssetClass, Sector } from '@/types/etf'
import { getEtfByTicker } from './etf-database'

const EMPTY_ALLOCATION = (): AllocationBreakdown => ({
  byAssetClass: {} as Record<AssetClass, number>,
  byRegion: {} as Record<Region, number>,
  bySector: {},
  byCurrency: { EUR: 0, USD: 0, GBP: 0 },
  weightedTER: 0,
  totalValueEUR: 0,
})

export function calculateAllocation(
  positions: Position[],
  prices: Record<string, number>,
): AllocationBreakdown {
  const result = EMPTY_ALLOCATION()
  if (positions.length === 0) return result

  const positionValues = positions.map(pos => {
    const price = prices[pos.ticker.toUpperCase()] ?? 0
    return { pos, value: pos.shares * price }
  })

  const totalValue = positionValues.reduce((sum, p) => sum + p.value, 0)
  result.totalValueEUR = totalValue
  if (totalValue === 0) return result

  let weightedTerSum = 0

  for (const { pos, value } of positionValues) {
    const weight = value / totalValue
    const etf = getEtfByTicker(pos.ticker)

    result.byCurrency[pos.currency] = (result.byCurrency[pos.currency] ?? 0) + weight

    if (!etf) continue

    result.byAssetClass[etf.assetClass] = (result.byAssetClass[etf.assetClass] ?? 0) + weight

    for (const [region, regionWeight] of Object.entries(etf.regionAllocation) as [Region, number][]) {
      result.byRegion[region] = (result.byRegion[region] ?? 0) + weight * regionWeight
    }

    if (etf.sectorAllocation) {
      for (const [sector, sectorWeight] of Object.entries(etf.sectorAllocation) as [Sector, number][]) {
        result.bySector[sector] = (result.bySector[sector] ?? 0) + weight * sectorWeight
      }
    }

    weightedTerSum += weight * etf.ter
  }

  result.weightedTER = weightedTerSum
  return result
}
```

- [ ] **Step 3.4: Run tests to verify they pass**

Run: `npx vitest run src/lib/analysis.test.ts`
Expected: PASS all 5 tests

- [ ] **Step 3.5: Commit**

```bash
git add src/lib/analysis.ts src/lib/analysis.test.ts
git commit -m "feat(analysis): portfolio allocation calculator (asset class, region, sector, TER)"
```

---

### Task 4: FIRE projection calculator

**Files:**
- Create: `src/lib/fire.ts`
- Create: `src/lib/fire.test.ts`

- [ ] **Step 4.1: Write failing tests for FIRE calculator**

`src/lib/fire.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { projectFire } from './fire'

describe('projectFire', () => {
  it('returns 0 years when already at target', () => {
    const result = projectFire({
      currentValue: 100_000,
      monthlyContribution: 500,
      targetAmount: 100_000,
      expectedAnnualReturn: 0.07,
    })
    expect(result.yearsToFire).toBe(0)
  })

  it('takes ~10 years for 100k → 200k at 500/mo + 7%', () => {
    const result = projectFire({
      currentValue: 100_000,
      monthlyContribution: 500,
      targetAmount: 200_000,
      expectedAnnualReturn: 0.07,
    })
    expect(result.yearsToFire).toBeGreaterThan(6)
    expect(result.yearsToFire).toBeLessThan(10)
  })

  it('returns Infinity if target unreachable (zero contribution + zero return)', () => {
    const result = projectFire({
      currentValue: 10_000,
      monthlyContribution: 0,
      targetAmount: 1_000_000,
      expectedAnnualReturn: 0,
    })
    expect(result.yearsToFire).toBe(Infinity)
  })
})
```

- [ ] **Step 4.2: Run tests to verify they fail**

Run: `npx vitest run src/lib/fire.test.ts`
Expected: FAIL

- [ ] **Step 4.3: Implement projectFire**

`src/lib/fire.ts`:
```typescript
import { FireProjection } from '@/types/analysis'

interface FireInputs {
  currentValue: number
  monthlyContribution: number
  targetAmount: number
  expectedAnnualReturn: number
}

export function projectFire(input: FireInputs): FireProjection {
  const { currentValue, monthlyContribution, targetAmount, expectedAnnualReturn } = input

  if (currentValue >= targetAmount) {
    return { ...input, yearsToFire: 0 }
  }

  const monthlyReturn = expectedAnnualReturn / 12
  const maxMonths = 600 // 50 years cap
  let balance = currentValue

  for (let month = 1; month <= maxMonths; month++) {
    balance = balance * (1 + monthlyReturn) + monthlyContribution
    if (balance >= targetAmount) {
      return { ...input, yearsToFire: Math.round((month / 12) * 10) / 10 }
    }
  }

  return { ...input, yearsToFire: Infinity }
}
```

- [ ] **Step 4.4: Run tests to verify they pass**

Run: `npx vitest run src/lib/fire.test.ts`
Expected: PASS

- [ ] **Step 4.5: Commit**

```bash
git add src/lib/fire.ts src/lib/fire.test.ts
git commit -m "feat(fire): FIRE projection calculator"
```

---

### Task 5: Yahoo Finance price fetcher

**Files:**
- Create: `src/lib/prices.ts`
- Create: `src/lib/prices.test.ts` (mocked)
- Create: `src/app/api/prices/route.ts`

- [ ] **Step 5.1: Write failing test for fetchPrices**

`src/lib/prices.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchPrices } from './prices'

global.fetch = vi.fn()

beforeEach(() => {
  vi.resetAllMocks()
})

function mockYahooResponse(symbol: string, price: number) {
  return {
    ok: true,
    json: async () => ({
      quoteResponse: { result: [{ symbol, regularMarketPrice: price }] },
    }),
  }
}

describe('fetchPrices', () => {
  it('returns price map for valid tickers', async () => {
    ;(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockYahooResponse('VWCE.DE', 110.5)
    )
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.VWCE).toBeCloseTo(110.5)
    }
  })

  it('returns error result on fetch failure', async () => {
    ;(global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network'))
    const result = await fetchPrices(['VWCE'])
    expect(result.ok).toBe(false)
  })
})
```

- [ ] **Step 5.2: Run test to verify failure**

Run: `npx vitest run src/lib/prices.test.ts`
Expected: FAIL

- [ ] **Step 5.3: Implement fetchPrices**

`src/lib/prices.ts`:
```typescript
import { Result } from '@/types/analysis'

// Yahoo Finance suffix map for European ETF tickers (best-effort).
const SUFFIX_MAP: Record<string, string> = {
  VWCE: '.DE', CSPX: '.L', IWDA: '.AS', EIMI: '.L', AGGH: '.L',
  VEUR: '.L', VFEM: '.L', IMEU: '.L', SEMB: '.L', VAGF: '.L',
}

function toYahooSymbol(ticker: string): string {
  const suffix = SUFFIX_MAP[ticker.toUpperCase()] ?? '.DE'
  return `${ticker.toUpperCase()}${suffix}`
}

interface YahooQuoteResponse {
  quoteResponse: { result: Array<{ symbol: string; regularMarketPrice?: number }> }
}

export async function fetchPrices(tickers: string[]): Promise<Result<Record<string, number>>> {
  if (tickers.length === 0) return { ok: true, value: {} }

  try {
    const symbols = tickers.map(toYahooSymbol).join(',')
    const url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 BogleHub/1.0' },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return { ok: false, error: new Error(`Yahoo Finance returned ${res.status}`) }
    }

    const data = (await res.json()) as YahooQuoteResponse
    const priceMap: Record<string, number> = {}

    for (const item of data.quoteResponse?.result ?? []) {
      const baseTicker = item.symbol.split('.')[0]
      if (item.regularMarketPrice != null) {
        priceMap[baseTicker] = item.regularMarketPrice
      }
    }

    return { ok: true, value: priceMap }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err : new Error('Unknown error') }
  }
}
```

- [ ] **Step 5.4: Run tests to verify they pass**

Run: `npx vitest run src/lib/prices.test.ts`
Expected: PASS

- [ ] **Step 5.5: Create API route**

`src/app/api/prices/route.ts`:
```typescript
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
```

- [ ] **Step 5.6: Commit**

```bash
git add src/lib/prices.ts src/lib/prices.test.ts src/app/api/prices/route.ts
git commit -m "feat(prices): Yahoo Finance price fetcher with API route"
```

---

### Task 6: AI analysis generation (Groq)

**Files:**
- Create: `src/lib/ai.ts`
- Create: `src/app/api/analyze/route.ts`

- [ ] **Step 6.1: Implement AI client**

`src/lib/ai.ts`:
```typescript
import Groq from 'groq-sdk'
import { AllocationBreakdown, FireProjection, Result } from '@/types/analysis'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `Eres un asesor educativo (NO asesor financiero) experto en inversión pasiva e indexación. Tu trabajo es analizar la cartera de un inversor Boglehead hispano y darle insights accionables en español de España, claros y honestos.

REGLAS NO NEGOCIABLES:
- NUNCA des consejo de inversión específico ("compra X", "vende Y"). Tu rol es educativo.
- Usa siempre el disclaimer: "Esto es información educativa, no asesoramiento financiero."
- Habla en español de España, tono cercano pero técnico.
- Sé concreto: cita las posiciones reales del usuario.
- Identifica riesgos: concentración geográfica, sectorial, divisas.
- Compara con benchmarks (cartera global, 60/40).
- Sugiere áreas de mejora SIN prescribir acciones concretas.
- Máximo 400 palabras, formato Markdown con headings claros.`

interface AnalyzeInput {
  allocation: AllocationBreakdown
  fire?: FireProjection
  positions: Array<{ ticker: string; valueEUR: number; weight: number }>
}

export async function generateAiNarrative(input: AnalyzeInput): Promise<Result<string>> {
  try {
    const payload = JSON.stringify(input, null, 2)
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Analiza esta cartera y dame insights:\n\n\`\`\`json\n${payload}\n\`\`\``,
        },
      ],
      temperature: 0.5,
      max_tokens: 1500,
    })

    const text = completion.choices[0]?.message?.content
    if (!text) return { ok: false, error: new Error('Empty AI response') }
    return { ok: true, value: text }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err : new Error('AI error') }
  }
}
```

- [ ] **Step 6.2: Implement analyze API route**

`src/app/api/analyze/route.ts`:
```typescript
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

    const positionSummary = body.positions.map(p => {
      const value = p.shares * (pricesResult.value[p.ticker.toUpperCase()] ?? 0)
      return {
        ticker: p.ticker.toUpperCase(),
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
        warnings: [],
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 400 })
  }
}
```

- [ ] **Step 6.3: Commit**

```bash
git add src/lib/ai.ts src/app/api/analyze/route.ts
git commit -m "feat(ai): Groq AI narrative generation + analyze API route"
```

---

## Phase 2 — UI Components

### Task 7: Theme + Tailwind config

**Files:**
- Modify: `src/app/globals.css` (Tailwind v4 inline config)
- Create: `src/lib/utils.ts`

- [ ] **Step 7.1: Configure Tailwind v4 theme inline**

`src/app/globals.css`:
```css
@import 'tailwindcss';

@theme {
  --color-brand-50: #f0f7ff;
  --color-brand-100: #e0eefe;
  --color-brand-200: #bae0fd;
  --color-brand-300: #7cc7fb;
  --color-brand-400: #36aaf5;
  --color-brand-500: #0e8ee6;
  --color-brand-600: #0070c4;
  --color-brand-700: #0259a0;
  --color-brand-800: #064a84;
  --color-brand-900: #0b3e6e;

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Source Serif Pro', Georgia, serif;
}

@layer base {
  html { font-family: var(--font-sans); }
  body { background: #fafafa; color: #18181b; }
}
```

- [ ] **Step 7.2: Create cn utility**

`src/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function formatPct(n: number, decimals = 1): string {
  return `${(n * 100).toFixed(decimals)}%`
}
```

- [ ] **Step 7.3: Commit**

```bash
git add src/app/globals.css src/lib/utils.ts
git commit -m "feat(ui): Tailwind v4 brand theme + format utilities"
```

---

### Task 8: Base UI components (Button, Card, Input)

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Input.tsx`

- [ ] **Step 8.1: Button**

`src/components/ui/Button.tsx`:
```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    const variants = {
      primary: 'bg-brand-600 text-white hover:bg-brand-700',
      secondary: 'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50',
      ghost: 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100',
    }
    const sizes = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2',
    }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>
        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
```

- [ ] **Step 8.2: Card**

`src/components/ui/Card.tsx`:
```typescript
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-xl border border-zinc-200 bg-white p-6 shadow-sm', className)} {...props} />
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold text-zinc-900', className)} {...props} />
}
```

- [ ] **Step 8.3: Input**

`src/components/ui/Input.tsx`:
```typescript
import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn('h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100', className)}
      {...props}
    />
  )
)
Input.displayName = 'Input'
```

- [ ] **Step 8.4: Commit**

```bash
git add src/components/ui/
git commit -m "feat(ui): base components (Button, Card, Input)"
```

---

### Task 9: Zustand portfolio store

**Files:**
- Create: `src/lib/store.ts`

- [ ] **Step 9.1: Create store**

`src/lib/store.ts`:
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Position } from '@/types/portfolio'

interface PortfolioState {
  positions: Position[]
  monthlyContribution: number
  targetAmount: number
  addPosition: (pos: Omit<Position, 'id' | 'addedAt'>) => void
  removePosition: (id: string) => void
  updatePosition: (id: string, updates: Partial<Position>) => void
  setMonthlyContribution: (amount: number) => void
  setTargetAmount: (amount: number) => void
  clearPortfolio: () => void
}

export const usePortfolio = create<PortfolioState>()(
  persist(
    (set) => ({
      positions: [],
      monthlyContribution: 0,
      targetAmount: 0,
      addPosition: (pos) =>
        set((state) => ({
          positions: [...state.positions, { ...pos, id: crypto.randomUUID(), addedAt: new Date().toISOString() }],
        })),
      removePosition: (id) =>
        set((state) => ({ positions: state.positions.filter((p) => p.id !== id) })),
      updatePosition: (id, updates) =>
        set((state) => ({
          positions: state.positions.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
      setMonthlyContribution: (amount) => set({ monthlyContribution: amount }),
      setTargetAmount: (amount) => set({ targetAmount: amount }),
      clearPortfolio: () => set({ positions: [], monthlyContribution: 0, targetAmount: 0 }),
    }),
    { name: 'boglehub-portfolio' }
  )
)
```

- [ ] **Step 9.2: Commit**

```bash
git add src/lib/store.ts
git commit -m "feat(store): Zustand portfolio store with localStorage persistence"
```

---

### Task 10: Portfolio input form

**Files:**
- Create: `src/components/PortfolioInput.tsx`

- [ ] **Step 10.1: Implement input form**

`src/components/PortfolioInput.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { usePortfolio } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardTitle } from '@/components/ui/Card'
import { searchEtfs } from '@/lib/etf-database'

export function PortfolioInput() {
  const addPosition = usePortfolio((s) => s.addPosition)
  const [ticker, setTicker] = useState('')
  const [shares, setShares] = useState('')
  const [avgPrice, setAvgPrice] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleTickerChange = (val: string) => {
    setTicker(val.toUpperCase())
    if (val.length >= 2) {
      setSuggestions(searchEtfs(val).map((e) => `${e.ticker} — ${e.name}`))
    } else {
      setSuggestions([])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sharesNum = parseFloat(shares)
    const priceNum = parseFloat(avgPrice)
    if (!ticker || sharesNum <= 0 || priceNum < 0) return
    addPosition({ ticker, shares: sharesNum, avgPrice: priceNum, currency: 'EUR' })
    setTicker('')
    setShares('')
    setAvgPrice('')
    setSuggestions([])
  }

  return (
    <Card>
      <CardTitle>Añadir posición</CardTitle>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4">
        <div className="relative sm:col-span-2">
          <Input placeholder="Ticker (ej. VWCE)" value={ticker} onChange={(e) => handleTickerChange(e.target.value)} />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-lg border border-zinc-200 bg-white shadow-lg">
              {suggestions.map((s) => {
                const ticker = s.split(' — ')[0]
                return (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => { setTicker(ticker); setSuggestions([]) }}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-zinc-50"
                    >
                      {s}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <Input type="number" step="0.0001" placeholder="Participaciones" value={shares} onChange={(e) => setShares(e.target.value)} />
        <Input type="number" step="0.01" placeholder="Precio medio €" value={avgPrice} onChange={(e) => setAvgPrice(e.target.value)} />
        <Button type="submit" className="sm:col-span-4">Añadir</Button>
      </form>
    </Card>
  )
}
```

- [ ] **Step 10.2: Commit**

```bash
git add src/components/PortfolioInput.tsx
git commit -m "feat(ui): portfolio input form with ETF autocomplete"
```

---

### Task 11: Portfolio table

**Files:**
- Create: `src/components/PortfolioTable.tsx`

- [ ] **Step 11.1: Implement table**

`src/components/PortfolioTable.tsx`:
```typescript
'use client'

import { usePortfolio } from '@/lib/store'
import { Card, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatEUR } from '@/lib/utils'
import { Trash2 } from 'lucide-react'

export function PortfolioTable() {
  const positions = usePortfolio((s) => s.positions)
  const removePosition = usePortfolio((s) => s.removePosition)

  if (positions.length === 0) {
    return (
      <Card className="text-center text-zinc-500">
        <p>Añade tu primera posición para empezar.</p>
      </Card>
    )
  }

  return (
    <Card>
      <CardTitle>Tus posiciones ({positions.length})</CardTitle>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-zinc-500">
              <th className="py-2">Ticker</th>
              <th className="py-2">Participaciones</th>
              <th className="py-2">Precio medio</th>
              <th className="py-2">Coste total</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {positions.map((p) => (
              <tr key={p.id} className="border-b border-zinc-100">
                <td className="py-3 font-medium">{p.ticker}</td>
                <td className="py-3">{p.shares}</td>
                <td className="py-3">{formatEUR(p.avgPrice)}</td>
                <td className="py-3">{formatEUR(p.shares * p.avgPrice)}</td>
                <td className="py-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => removePosition(p.id)} aria-label="Eliminar">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
```

- [ ] **Step 11.2: Commit**

```bash
git add src/components/PortfolioTable.tsx
git commit -m "feat(ui): portfolio positions table with remove action"
```

---

### Task 12: Allocation charts (Recharts)

**Files:**
- Create: `src/components/charts/AllocationPie.tsx`
- Create: `src/components/charts/RegionBar.tsx`
- Create: `src/components/charts/SectorBar.tsx`

- [ ] **Step 12.1: AllocationPie**

`src/components/charts/AllocationPie.tsx`:
```typescript
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { AllocationBreakdown } from '@/types/analysis'

const COLORS = ['#0e8ee6', '#36aaf5', '#7cc7fb', '#bae0fd', '#e0eefe', '#0259a0']

const LABEL_MAP: Record<string, string> = {
  EQUITY: 'Renta variable',
  BOND: 'Renta fija',
  COMMODITY: 'Materias primas',
  REIT: 'Inmobiliario',
  CASH: 'Liquidez',
  MIXED: 'Mixto',
}

export function AllocationPie({ breakdown }: { breakdown: AllocationBreakdown }) {
  const data = Object.entries(breakdown.byAssetClass)
    .filter(([_, val]) => val > 0)
    .map(([key, value]) => ({ name: LABEL_MAP[key] ?? key, value: value * 100 }))

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(d) => `${d.value.toFixed(1)}%`}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
```

- [ ] **Step 12.2: RegionBar**

`src/components/charts/RegionBar.tsx`:
```typescript
'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { AllocationBreakdown } from '@/types/analysis'

const LABEL_MAP: Record<string, string> = {
  US: 'EE. UU.',
  EUROPE: 'Europa',
  EM: 'Emergentes',
  JAPAN: 'Japón',
  GLOBAL: 'Global',
  UK: 'Reino Unido',
  PACIFIC_EX_JAPAN: 'Pacífico ex-JP',
  CHINA: 'China',
  OTHER: 'Otros',
}

export function RegionBar({ breakdown }: { breakdown: AllocationBreakdown }) {
  const data = Object.entries(breakdown.byRegion)
    .filter(([_, val]) => val > 0)
    .map(([key, value]) => ({ name: LABEL_MAP[key] ?? key, value: value * 100 }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
          <XAxis type="number" tickFormatter={(v) => `${v}%`} />
          <YAxis type="category" dataKey="name" width={80} />
          <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
          <Bar dataKey="value" fill="#0e8ee6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
```

- [ ] **Step 12.3: SectorBar** (similar to RegionBar but using `bySector`, label map for sectors)

- [ ] **Step 12.4: Commit**

```bash
git add src/components/charts/
git commit -m "feat(charts): allocation pie + region bar + sector bar"
```

---

### Task 13: Analysis results panel

**Files:**
- Create: `src/components/AnalysisResults.tsx`

- [ ] **Step 13.1: Implement results tabs**

`src/components/AnalysisResults.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { Analysis } from '@/types/analysis'
import { Card, CardTitle } from '@/components/ui/Card'
import { AllocationPie } from '@/components/charts/AllocationPie'
import { RegionBar } from '@/components/charts/RegionBar'
import { SectorBar } from '@/components/charts/SectorBar'
import { formatEUR, formatPct, cn } from '@/lib/utils'

type Tab = 'overview' | 'geo' | 'sector' | 'ai'

export function AnalysisResults({ analysis }: { analysis: Analysis }) {
  const [tab, setTab] = useState<Tab>('overview')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Resumen' },
    { id: 'geo', label: 'Geografía' },
    { id: 'sector', label: 'Sectores' },
    { id: 'ai', label: 'Análisis IA' },
  ]

  return (
    <Card>
      <CardTitle>Análisis de tu cartera</CardTitle>
      <div className="mt-2 mb-6 flex gap-2 border-b border-zinc-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'px-3 py-2 text-sm font-medium border-b-2 transition-colors',
              tab === t.id ? 'border-brand-600 text-brand-700' : 'border-transparent text-zinc-500 hover:text-zinc-700'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat label="Valor total" value={formatEUR(analysis.allocation.totalValueEUR)} />
            <Stat label="TER ponderado" value={formatPct(analysis.allocation.weightedTER, 2)} />
            <Stat label="Coste anual" value={formatEUR(analysis.allocation.totalValueEUR * analysis.allocation.weightedTER)} />
            <Stat label="Asignaciones" value={`${Object.keys(analysis.allocation.byAssetClass).length}`} />
          </div>
          <AllocationPie breakdown={analysis.allocation} />
        </div>
      )}

      {tab === 'geo' && <RegionBar breakdown={analysis.allocation} />}
      {tab === 'sector' && <SectorBar breakdown={analysis.allocation} />}

      {tab === 'ai' && (
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-800">{analysis.aiNarrative}</pre>
        </div>
      )}

      {analysis.fire && (
        <div className="mt-6 rounded-lg bg-brand-50 p-4 text-sm text-brand-900">
          <strong>Proyección FIRE:</strong> con {formatEUR(analysis.fire.monthlyContribution)}/mes y un 7 % de rentabilidad,
          alcanzas {formatEUR(analysis.fire.targetAmount)} en{' '}
          {analysis.fire.yearsToFire === Infinity ? 'más de 50 años' : `${analysis.fire.yearsToFire} años`}.
        </div>
      )}
    </Card>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-zinc-50 p-3">
      <div className="text-xs uppercase tracking-wide text-zinc-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-zinc-900">{value}</div>
    </div>
  )
}
```

- [ ] **Step 13.2: Commit**

```bash
git add src/components/AnalysisResults.tsx
git commit -m "feat(ui): analysis results tabs (overview, geo, sector, AI)"
```

---

### Task 14: Analyzer page integration

**Files:**
- Create: `src/app/analyzer/page.tsx`

- [ ] **Step 14.1: Wire up the analyzer page**

`src/app/analyzer/page.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { usePortfolio } from '@/lib/store'
import { PortfolioInput } from '@/components/PortfolioInput'
import { PortfolioTable } from '@/components/PortfolioTable'
import { AnalysisResults } from '@/components/AnalysisResults'
import { Button } from '@/components/ui/Button'
import { Card, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Analysis } from '@/types/analysis'

export default function AnalyzerPage() {
  const { positions, monthlyContribution, targetAmount, setMonthlyContribution, setTargetAmount } = usePortfolio()
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ positions, monthlyContribution: monthlyContribution || undefined, targetAmount: targetAmount || undefined }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      setAnalysis(data.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Analizador de cartera</h1>
        <p className="mt-2 text-zinc-600">Introduce tus posiciones y la IA te da un análisis en español.</p>
      </header>

      <PortfolioInput />
      <PortfolioTable />

      {positions.length > 0 && (
        <Card>
          <CardTitle>Plan FIRE (opcional)</CardTitle>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Input type="number" placeholder="Aporte mensual €" value={monthlyContribution || ''} onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)} />
            <Input type="number" placeholder="Objetivo €" value={targetAmount || ''} onChange={(e) => setTargetAmount(parseFloat(e.target.value) || 0)} />
          </div>
        </Card>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50 text-red-800">{error}</Card>
      )}

      <Button onClick={handleAnalyze} disabled={positions.length === 0} loading={loading} size="lg" className="w-full">
        {loading ? 'Analizando...' : 'Analizar cartera con IA'}
      </Button>

      {analysis && <AnalysisResults analysis={analysis} />}
    </main>
  )
}
```

- [ ] **Step 14.2: Commit**

```bash
git add src/app/analyzer/page.tsx
git commit -m "feat(app): analyzer page wiring input + table + analysis"
```

---

### Task 15: Landing page

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 15.1: Update layout metadata**

`src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BogleHub — Tu cartera de fondos indexados optimizada con IA',
  description: 'Analiza tu cartera de ETFs con IA. Asignación de activos, diversificación geográfica, costes y proyección FIRE. Gratis para Bogleheads hispanos.',
  openGraph: { type: 'website', locale: 'es_ES' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 15.2: Build landing**

`src/app/page.tsx`:
```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <main>
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 h-16">
          <span className="text-xl font-bold">📊 BogleHub</span>
          <Link href="/analyzer">
            <Button>Analizar mi cartera</Button>
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-b from-white to-zinc-50">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Tu cartera de fondos indexados,<br />
            <span className="text-brand-600">analizada con IA en segundos.</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600">
            Indexa Capital te <em>gestiona</em> el dinero. BogleHub te da <em>las herramientas</em> para que lo gestiones tú.
            Asignación, diversificación, costes y FIRE — todo en español, gratis.
          </p>
          <Link href="/analyzer" className="mt-8 inline-block">
            <Button size="lg">Empezar gratis →</Button>
          </Link>
          <p className="mt-3 text-sm text-zinc-400">Sin registro. Tus datos viven en tu navegador.</p>
        </div>
      </section>

      <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500">
        © 2026 BogleHub · Información educativa, no asesoramiento financiero
      </footer>
    </main>
  )
}
```

- [ ] **Step 15.3: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat(app): landing page with hero + footer disclaimer"
```

---

## Phase 3 — Deploy

### Task 16: Vitest configuration

**Files:**
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Modify: `package.json` (add scripts)

- [ ] **Step 16.1: Vitest config**

`vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 16.2: Setup file**

`tests/setup.ts`:
```typescript
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 16.3: Add npm scripts**

Modify `package.json` `"scripts"`:
```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "typecheck": "tsc --noEmit"
}
```

- [ ] **Step 16.4: Verify everything passes**

Run: `npm test && npm run typecheck && npm run build`
Expected: ALL GREEN

- [ ] **Step 16.5: Commit**

```bash
git add vitest.config.ts tests/setup.ts package.json
git commit -m "chore: configure Vitest + typecheck script"
```

---

### Task 17: Environment + deployment

**Files:**
- Create: `.env.example`
- Create: `.env.local`
- Create: `vercel.json`

- [ ] **Step 17.1: Environment templates**

`.env.example`:
```
GROQ_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`.env.local` (same as `.env.example` with real Groq key filled by user).

- [ ] **Step 17.2: Vercel config**

`vercel.json`:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

- [ ] **Step 17.3: Git init + GitHub**

Commands (engineer executes locally):
```powershell
git init
git add .
git commit -m "feat: BogleHub MVP initial scaffold + core engine + UI"
# Create GitHub repo via gh CLI or web, then:
git remote add origin https://github.com/<USER>/boglehub.git
git branch -M main
git push -u origin main
```

- [ ] **Step 17.4: Deploy to Vercel**

- Import GitHub repo at vercel.com
- Add env var: `GROQ_API_KEY=<real key from console.groq.com>`
- Deploy
- Verify URL loads and analyzer works with VWCE position

- [ ] **Step 17.5: Final smoke test**

Manual smoke test:
1. Open deployed URL
2. Click "Analizar mi cartera"
3. Add position: VWCE, 10 shares, €100 avg
4. Click "Analizar cartera con IA"
5. Verify: tabs show data, charts render, AI narrative in Spanish

- [ ] **Step 17.6: Commit + tag**

```bash
git tag v0.1.0-mvp
git push origin v0.1.0-mvp
```

---

## Self-Review Checklist

After implementing all tasks, verify:

- [ ] All tests passing (`npm test`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] Production build green (`npm run build`)
- [ ] Lighthouse score >90 on landing (Performance, Accessibility, SEO)
- [ ] Mobile responsive at 375px width
- [ ] AI analysis returns valid Spanish content
- [ ] localStorage persistence works (refresh keeps positions)
- [ ] Disclaimer visible on every page

---

## Out of scope for this plan (future plans)

- PDF parser for Trade Republic/DEGIRO/MyInvestor extracts
- Authentication via Supabase magic link
- Saved portfolios in database
- IRPF Spain tax calculator (deferred — regulated territory, need legal review)
- ETF detail pages (SEO programmatic)
- Email digest subscriptions
- Discord community integration
- Pro tier features (deferred until founder turns 18)

These will be addressed in subsequent plans, one per cohesive subsystem.

---

**Plan complete.** Save reference: `docs/superpowers/specs/2026-05-13-boglehub-design.md`
