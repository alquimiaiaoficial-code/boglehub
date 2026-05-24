/**
 * Cantidades mensuales para páginas /invertir/[cantidad]-al-mes
 * Cubre el long-tail "cómo invertir X euros al mes" en España.
 */

export interface MonthlyAmount {
  slug: string
  /** Cantidad en € */
  amount: number
  /** Profile descripcion (alcance) */
  scope: string
  /** Cuántos años invirtiendo a 7% → 1M */
  yearsToOneMillion: number
  /** A 30 años acumula */
  thirtyYearResult: number
}

/**
 * Calcula valor futuro con aportaciones periódicas
 * FV = PMT × (((1+r)^n - 1) / r)
 */
function fv(monthly: number, years: number, annualRate: number): number {
  const r = annualRate / 12
  const n = years * 12
  return Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r))
}

/**
 * Años necesarios para llegar a un objetivo
 * Usa búsqueda iterativa
 */
function yearsTo(monthly: number, target: number, annualRate: number): number {
  for (let y = 1; y <= 60; y++) {
    if (fv(monthly, y, annualRate) >= target) return y
  }
  return 60
}

const RATE = 0.07
const AMOUNTS = [50, 100, 150, 200, 300, 500, 750, 1000, 1500, 2000]

export const MONTHLY_AMOUNTS: MonthlyAmount[] = AMOUNTS.map((amount) => ({
  slug: `${amount}-euros-al-mes`,
  amount,
  scope:
    amount <= 100 ? 'Empezar con poco' :
    amount <= 300 ? 'Aportación media' :
    amount <= 750 ? 'Aportación alta' :
    'Aportación muy alta',
  yearsToOneMillion: yearsTo(amount, 1_000_000, RATE),
  thirtyYearResult: fv(amount, 30, RATE),
}))

export function getMonthlyAmountBySlug(slug: string): MonthlyAmount | undefined {
  return MONTHLY_AMOUNTS.find((m) => m.slug === slug)
}
