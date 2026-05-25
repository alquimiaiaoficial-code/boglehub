/**
 * Pares de carteras modelo para /comparar-cartera/[a]-vs-[b].
 * Genera C(10,2) = 45 comparativas únicas.
 */
import { MODEL_PORTFOLIOS } from './model-portfolios'

export function portfolioPairToSlug(a: string, b: string): string {
  return `${a}-vs-${b}`
}

export function slugToPortfolioPair(slug: string): [string, string] | null {
  const parts = slug.split('-vs-')
  if (parts.length !== 2) return null
  return [parts[0], parts[1]]
}

export function getAllPortfolioPairs(): [string, string][] {
  const seen = new Set<string>()
  const result: [string, string][] = []
  const slugs = MODEL_PORTFOLIOS.map((p) => p.slug)
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      const key = [slugs[i], slugs[j]].sort().join('|')
      if (seen.has(key)) continue
      seen.add(key)
      result.push([slugs[i], slugs[j]])
    }
  }
  return result
}
