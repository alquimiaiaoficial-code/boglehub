// Eficiencia fiscal de ETFs para inversor residente en España.
//
// Información educativa, no asesoramiento fiscal. La evaluación es
// orientativa y depende del caso individual de cada inversor.

export type FiscalDomicile = 'IE' | 'LU' | 'US' | 'OTHER' | 'UNKNOWN'
export type FiscalGrade = 'A' | 'B' | 'C' | 'D' | 'F'

export interface FiscalAssessment {
  grade: FiscalGrade
  domicile: FiscalDomicile
  domicileLabel: string
  reason: string
}

const DOMICILE_LABEL: Record<FiscalDomicile, string> = {
  IE: 'Irlanda',
  LU: 'Luxemburgo',
  US: 'EE. UU.',
  OTHER: 'Otro',
  UNKNOWN: 'Desconocido',
}

function inferDomicile(isin: string): FiscalDomicile {
  const cc = isin.slice(0, 2).toUpperCase()
  if (cc === 'IE') return 'IE'
  if (cc === 'LU') return 'LU'
  if (cc === 'US') return 'US'
  return 'OTHER'
}

/**
 * Calcula la eficiencia fiscal del ETF para un inversor residente en España.
 *
 * Bases:
 * - Irlanda (UCITS IE): retención del 15 % sobre dividendos de acciones de
 *   EE. UU. por convenio fiscal — la opción más eficiente para inversor
 *   europeo en ETFs con peso en EE. UU.
 * - Luxemburgo (UCITS LU): retención del 30 % (sin convenio reducido). UCITS
 *   válido pero menos eficiente en la pata de dividendos.
 * - EE. UU.: ETFs domiciliados allí no son accesibles para inversor retail
 *   europeo por MiFID II. Si se tienen (residencia previa, etc.), implican
 *   fricción fiscal alta.
 * - Acumulación vs distribución: la acumulación difiere el IRPF hasta la
 *   venta; la distribución obliga a tributar los dividendos cada año en la
 *   base del ahorro.
 */
export function computeFiscalGrade(
  isin: string | undefined,
  accumulating: boolean
): FiscalAssessment {
  if (!isin) {
    return {
      grade: 'F',
      domicile: 'UNKNOWN',
      domicileLabel: DOMICILE_LABEL.UNKNOWN,
      reason:
        'Sin ISIN registrado: no se puede evaluar la eficiencia fiscal del producto.',
    }
  }

  const domicile = inferDomicile(isin)
  const domicileLabel = DOMICILE_LABEL[domicile]

  if (domicile === 'IE') {
    return accumulating
      ? {
          grade: 'A',
          domicile,
          domicileLabel,
          reason:
            'Irlanda (15 % de retención por convenio fiscal con EE. UU.) + acumulación: máxima eficiencia fiscal para residente en España. Los dividendos se reinvierten dentro del fondo y el IRPF se difiere hasta la venta.',
        }
      : {
          grade: 'B',
          domicile,
          domicileLabel,
          reason:
            'Irlanda (15 % de retención por convenio): buena base. Pero al ser de distribución, los dividendos te llegan cada año y tributan en la base del ahorro del IRPF.',
        }
  }

  if (domicile === 'LU') {
    return accumulating
      ? {
          grade: 'B',
          domicile,
          domicileLabel,
          reason:
            'Luxemburgo (30 % de retención sin convenio reducido). La acumulación difiere el IRPF hasta la venta, lo que compensa parte de la peor retención.',
        }
      : {
          grade: 'C',
          domicile,
          domicileLabel,
          reason:
            'Luxemburgo (30 % de retención sin convenio reducido) + distribución: doble fricción fiscal frente a un equivalente irlandés de acumulación.',
        }
  }

  if (domicile === 'US') {
    return {
      grade: 'F',
      domicile,
      domicileLabel,
      reason:
        'Domicilio en EE. UU.: por norma general no accesible para inversor europeo retail (MiFID II). Si lo tienes, revisa la fiscalidad caso a caso con tu asesor.',
    }
  }

  return {
    grade: 'D',
    domicile: 'OTHER',
    domicileLabel,
    reason:
      'Domicilio fiscal fuera del eje habitual UCITS (Irlanda/Luxemburgo). Revisa caso a caso con tu asesor fiscal.',
  }
}

export const GRADE_STYLES: Record<FiscalGrade, { color: string; bg: string }> = {
  A: { color: 'text-accent', bg: 'bg-accent/20' },
  B: { color: 'text-brand-400', bg: 'bg-brand-500/20' },
  C: { color: 'text-warn', bg: 'bg-warn/20' },
  D: { color: 'text-warn', bg: 'bg-warn/30' },
  F: { color: 'text-danger', bg: 'bg-danger/20' },
}

// ─── IRPF: base imponible del ahorro ─────────────────────────────────────────
//
// Tramos estatales vigentes en 2026, aplicables a ganancias patrimoniales
// (venta de fondos, ETF y acciones), dividendos e intereses. Escala progresiva:
// cada tramo grava solo la parte de la base que cae dentro de él.
// País Vasco y Navarra tienen normativa foral propia con tipos distintos.

export interface IrpfBracket {
  /** Límite inferior del tramo, incluido. */
  from: number
  /** Límite superior del tramo. null en el último tramo. */
  to: number | null
  /** Tipo marginal del tramo. */
  rate: number
}

export const IRPF_SAVINGS_BRACKETS: IrpfBracket[] = [
  { from: 0, to: 6_000, rate: 0.19 },
  { from: 6_000, to: 50_000, rate: 0.21 },
  { from: 50_000, to: 200_000, rate: 0.23 },
  { from: 200_000, to: 300_000, rate: 0.27 },
  { from: 300_000, to: null, rate: 0.30 },
]

export interface BracketShare {
  from: number
  to: number | null
  rate: number
  /** Parte de la base que cae en este tramo. */
  amount: number
  /** Cuota del tramo: amount * rate. */
  tax: number
}

export interface SavingsTaxResult {
  /** Base sobre la que se ha calculado. */
  base: number
  /** Cuota total. */
  totalTax: number
  /** Tipo medio efectivo sobre la base (0 si la base es 0). */
  effectiveRate: number
  brackets: BracketShare[]
}

/** Impuesto de la base del ahorro para una base dada, con desglose por tramos. */
export function computeSavingsTax(base: number): SavingsTaxResult {
  const safeBase = Math.max(0, base)
  let totalTax = 0
  const brackets: BracketShare[] = IRPF_SAVINGS_BRACKETS.map((b) => {
    const upper = b.to ?? Infinity
    const amount = Math.max(0, Math.min(safeBase, upper) - b.from)
    const tax = amount * b.rate
    totalTax += tax
    return { from: b.from, to: b.to, rate: b.rate, amount, tax }
  })
  return {
    base: safeBase,
    totalTax,
    effectiveRate: safeBase > 0 ? totalTax / safeBase : 0,
    brackets,
  }
}

/**
 * Impuesto marginal de añadir `added` € a una base del ahorro que ya parte de
 * `existing` €. Devuelve el desglose por tramos de esa parte añadida, que es lo
 * que de verdad cuesta la nueva ganancia: se apila sobre lo ya acumulado y
 * puede entrar en tramos más altos.
 */
export function computeMarginalSavingsTax(
  existing: number,
  added: number
): SavingsTaxResult {
  const safeExisting = Math.max(0, existing)
  const safeAdded = Math.max(0, added)
  const low = computeSavingsTax(safeExisting)
  const high = computeSavingsTax(safeExisting + safeAdded)
  const brackets: BracketShare[] = high.brackets.map((b, i) => {
    const amount = b.amount - low.brackets[i].amount
    return { from: b.from, to: b.to, rate: b.rate, amount, tax: amount * b.rate }
  })
  return {
    base: safeAdded,
    totalTax: high.totalTax - low.totalTax,
    effectiveRate: safeAdded > 0 ? (high.totalTax - low.totalTax) / safeAdded : 0,
    brackets,
  }
}
