/**
 * Edades objetivo de FIRE (jubilación anticipada) para /jubilacion/[slug].
 */
export interface FireAge {
  slug: string
  targetAge: number
  /** Años aproximados de retirada (esperanza hasta 90) */
  withdrawalYears: number
  /** Recomendación renta variable en fase retirada */
  equityInRetirement: string
  /** Difficulty level */
  difficulty: 'extremo' | 'muy difícil' | 'difícil' | 'moderado' | 'estándar'
  description: string
}

export const FIRE_AGES: FireAge[] = [
  { slug: 'jubilarse-a-los-35', targetAge: 35, withdrawalYears: 55, equityInRetirement: '70-80%', difficulty: 'extremo', description: 'Lean FIRE extremo: requiere tasas de ahorro del 70%+ desde joven o ingresos muy altos.' },
  { slug: 'jubilarse-a-los-40', targetAge: 40, withdrawalYears: 50, equityInRetirement: '65-75%', difficulty: 'muy difícil', description: 'FIRE temprano: requiere ahorrar 50-70% de los ingresos desde los 25 años.' },
  { slug: 'jubilarse-a-los-45', targetAge: 45, withdrawalYears: 45, equityInRetirement: '60-70%', difficulty: 'muy difícil', description: 'FIRE objetivo común para alta-renta. Requiere disciplina extrema y horizonte 20+ años de acumulación.' },
  { slug: 'jubilarse-a-los-50', targetAge: 50, withdrawalYears: 40, equityInRetirement: '55-65%', difficulty: 'difícil', description: 'FIRE realista para profesionales con altos ingresos. Combina con pensión pública parcial.' },
  { slug: 'jubilarse-a-los-55', targetAge: 55, withdrawalYears: 35, equityInRetirement: '50-60%', difficulty: 'moderado', description: 'Jubilación anticipada moderada. 10 años antes de la edad ordinaria, alcanzable con ahorro disciplinado.' },
  { slug: 'jubilarse-a-los-60', targetAge: 60, withdrawalYears: 30, equityInRetirement: '45-55%', difficulty: 'moderado', description: 'Jubilación anticipada 5 años antes. Necesitas cubrir solo el periodo previo a la pensión pública.' },
  { slug: 'jubilarse-a-los-65', targetAge: 65, withdrawalYears: 25, equityInRetirement: '40-50%', difficulty: 'estándar', description: 'Jubilación estándar española. Combinación de pensión pública + cartera complementaria.' },
]

export function getFireAgeBySlug(slug: string): FireAge | undefined {
  return FIRE_AGES.find((f) => f.slug === slug)
}
