import { describe, it, expect } from 'vitest'
import { costeDiferenciaTer } from './coste-ter'

describe('costeDiferenciaTer', () => {
  it('sin diferencia de comisión no hay coste', () => {
    expect(costeDiferenciaTer(50000, 0.07, 0.002, 0.002, 20)).toBe(0)
  })

  it('0,12 puntos a 20 años sobre 50.000 € al 7 %: unos 4.200 €, no la mitad', () => {
    // A mano: 50.000 × (1,0688^20 − 1,0676^20) ≈ 50.000 × (3,7838 − 3,7004)
    const c = costeDiferenciaTer(50000, 0.07, 0.0012, 0.0024, 20)
    expect(c).toBeGreaterThan(4000)
    expect(c).toBeLessThan(4400)
    // La fórmula vieja, con la mitad de la diferencia, daba unos 950 € para 0,12 puntos.
  })

  it('siempre es positivo cuando el caro es más caro', () => {
    expect(costeDiferenciaTer(10000, 0.05, 0.0007, 0.003, 10)).toBeGreaterThan(0)
  })
})
