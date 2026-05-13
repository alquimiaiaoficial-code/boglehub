export interface ParsedPosition {
  ticker: string
  shares: number
  avgPrice: number
  isin?: string
  confidence: 'high' | 'medium' | 'low'
}

export type Broker = 'TRADE_REPUBLIC' | 'DEGIRO' | 'MYINVESTOR' | 'ING' | 'UNKNOWN'

export interface ParseResult {
  positions: ParsedPosition[]
  broker: Broker
  warnings: string[]
}
