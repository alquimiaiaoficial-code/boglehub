/**
 * Edades para páginas /plan/[edad]/[objetivo].
 * Combinadas con OBJECTIVES (10) generan 80 páginas únicas.
 */

export interface AgeProfile {
  slug: string
  age: number
  yearsToRetirement: number
  recommendedEquity: string
  recommendedPortfolio: string
}

export const AGES: AgeProfile[] = [
  { slug: '20-anios', age: 20, yearsToRetirement: 45, recommendedEquity: '100%', recommendedPortfolio: '100% VWCE' },
  { slug: '25-anios', age: 25, yearsToRetirement: 40, recommendedEquity: '90-100%', recommendedPortfolio: '90% VWCE + 10% AGGH' },
  { slug: '30-anios', age: 30, yearsToRetirement: 35, recommendedEquity: '85-90%', recommendedPortfolio: '85% VWCE + 15% AGGH' },
  { slug: '35-anios', age: 35, yearsToRetirement: 30, recommendedEquity: '80%', recommendedPortfolio: '80% VWCE + 20% AGGH' },
  { slug: '40-anios', age: 40, yearsToRetirement: 25, recommendedEquity: '75%', recommendedPortfolio: '75% VWCE + 25% AGGH' },
  { slug: '45-anios', age: 45, yearsToRetirement: 20, recommendedEquity: '70%', recommendedPortfolio: '70% VWCE + 30% AGGH' },
  { slug: '50-anios', age: 50, yearsToRetirement: 15, recommendedEquity: '60%', recommendedPortfolio: '60% VWCE + 40% AGGH' },
  { slug: '55-anios', age: 55, yearsToRetirement: 10, recommendedEquity: '50%', recommendedPortfolio: '50% VWCE + 50% AGGH' },
]

export function getAgeBySlug(slug: string): AgeProfile | undefined {
  return AGES.find((a) => a.slug === slug)
}
