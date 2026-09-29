import { describe, it, expect } from 'vitest'
import { formatPct } from './utils'

// 29-sep-2026: devolvía «0.06%» en una web en español. Ahora «0,06 %», con espacio no
// separable (U+00A0) para que el número y el signo no se partan de línea.
describe('formatPct', () => {
  it('coma decimal y espacio no separable', () => {
    expect(formatPct(0.0006, 2)).toBe('0,06\u00a0%')
    expect(formatPct(0.07, 0)).toBe('7\u00a0%')
    expect(formatPct(0.1234)).toBe('12,3\u00a0%')
  })

  it('nunca punto decimal', () => {
    expect(formatPct(0.0012, 2)).not.toContain('.')
  })
})
