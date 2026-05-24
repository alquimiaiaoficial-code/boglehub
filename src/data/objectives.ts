/**
 * Objetivos patrimoniales y FIRE para /cuanto-necesito/[slug]
 */

export interface Objective {
  slug: string
  /** Etiqueta legible */
  label: string
  /** Capital objetivo en € */
  targetAmount: number
  /** Tipo de objetivo */
  type: 'patrimonio' | 'fire' | 'jubilacion'
  /** Frase descriptiva */
  description: string
}

export const OBJECTIVES: Objective[] = [
  { slug: '100000-euros', label: '100.000€', targetAmount: 100_000, type: 'patrimonio',
    description: 'Primer hito patrimonial: empezar a sentir el efecto del interés compuesto.' },
  { slug: '250000-euros', label: '250.000€', targetAmount: 250_000, type: 'patrimonio',
    description: 'Patrimonio que comienza a generar rendimientos significativos: ~10.000€/año al 4%.' },
  { slug: '500000-euros', label: '500.000€', targetAmount: 500_000, type: 'patrimonio',
    description: 'Medio millón: con la regla del 4%, ingresos pasivos de ~20.000€/año.' },
  { slug: '1-millon-euros', label: '1 millón €', targetAmount: 1_000_000, type: 'patrimonio',
    description: 'El millón clásico: ~40.000€/año con la regla del 4%. FIRE para muchas familias.' },
  { slug: '2-millones-euros', label: '2 millones €', targetAmount: 2_000_000, type: 'patrimonio',
    description: 'FIRE cómodo: ~80.000€/año al 4%. Independencia financiera con margen amplio.' },
  { slug: 'fire-modesto', label: 'FIRE modesto (300k)', targetAmount: 300_000, type: 'fire',
    description: 'FIRE modesto: 12.000€/año con regla del 4%. Suficiente para vida frugal o complemento a pensión.' },
  { slug: 'fire-comodo', label: 'FIRE cómodo (1M)', targetAmount: 1_000_000, type: 'fire',
    description: 'FIRE cómodo: 40.000€/año con regla del 4%. Vida sin restricciones para una persona en España.' },
  { slug: 'fire-de-lujo', label: 'FIRE de lujo (2M)', targetAmount: 2_000_000, type: 'fire',
    description: 'FIRE de lujo: 80.000€/año al 4%. Cubre familia, viajes y casa principal sin restricciones.' },
  { slug: 'complementar-pension', label: 'Complementar pensión', targetAmount: 200_000, type: 'jubilacion',
    description: 'Complemento a la pensión pública: 200.000€ generan ~8.000€/año extra (~670€/mes).' },
  { slug: 'jubilacion-tradicional', label: 'Jubilación tradicional', targetAmount: 500_000, type: 'jubilacion',
    description: 'Capital para complementar la pensión pública y mantener calidad de vida.' },
]

export function getObjectiveBySlug(slug: string): Objective | undefined {
  return OBJECTIVES.find((o) => o.slug === slug)
}

/**
 * Aportación mensual necesaria para alcanzar el objetivo en N años a tasa dada.
 * PMT = FV × r / ((1+r)^n - 1)
 */
export function monthlyToReach(target: number, years: number, annualRate: number): number {
  const r = annualRate / 12
  const n = years * 12
  return Math.round((target * r) / (Math.pow(1 + r, n) - 1))
}
