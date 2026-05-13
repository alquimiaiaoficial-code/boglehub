// Import from internal lib path to avoid pdf-parse/index.js running test code at module evaluation
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse/lib/pdf-parse.js') as (buffer: Buffer) => Promise<{ text: string }>
import { ParseResult, Broker } from './types'
import { parseTradeRepublic } from './trade-republic'
import { parseDegiroPdf } from './degiro'
import { parseMyInvestor } from './myinvestor'
import { parseGeneric } from './generic'

function detectBroker(text: string): Broker {
  const lower = text.toLowerCase()
  if (lower.includes('trade republic')) return 'TRADE_REPUBLIC'
  if (lower.includes('degiro')) return 'DEGIRO'
  if (lower.includes('myinvestor')) return 'MYINVESTOR'
  if (lower.includes('ing direct') || lower.includes('ing broker')) return 'ING'
  return 'UNKNOWN'
}

export async function parsePdf(buffer: Buffer): Promise<ParseResult> {
  try {
    const data = await pdfParse(buffer)
    const text = data.text
    const broker = detectBroker(text)

    switch (broker) {
      case 'TRADE_REPUBLIC': return parseTradeRepublic(text)
      case 'DEGIRO': return parseDegiroPdf(text)
      case 'MYINVESTOR': return parseMyInvestor(text)
      default: return parseGeneric(text)
    }
  } catch (err) {
    return {
      positions: [],
      broker: 'UNKNOWN',
      warnings: [`Error al leer el PDF: ${err instanceof Error ? err.message : 'desconocido'}`],
    }
  }
}

export type { ParseResult, ParsedPosition, Broker } from './types'
