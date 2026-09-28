import { describe, it, expect } from 'vitest'
import { calcularConcentracion } from './concentracion'

describe('concentración', () => {
  it('un solo fondo global da HHI máximo por posiciones, pero no por regiones', () => {
    // Es la razón de medir por regiones: 100 % VWCE no es una apuesta concentrada.
    const c = calcularConcentracion(
      { US: 0.63, EUROPE: 0.15, EM: 0.1, JAPAN: 0.06, PACIFIC_EX_JAPAN: 0.03, OTHER: 0.03 },
      [{ ticker: 'VWCE', valueEUR: 10_000, weight: 1 }],
    )
    expect(c.hhiPosiciones).toBe(10_000)
    expect(c.hhiRegiones).toBeLessThan(5_000)
    expect(c.mayorRegion?.nombre).toBe('Estados Unidos')
    expect(c.mayorRegion?.peso).toBeCloseTo(0.63, 5)
  })

  it('todo en una región da HHI de 10.000 por regiones', () => {
    expect(calcularConcentracion({ US: 1 }).hhiRegiones).toBe(10_000)
  })

  it('normaliza aunque los pesos no sumen exactamente 1', () => {
    const c = calcularConcentracion({ US: 0.5, EUROPE: 0.49 })
    expect(c.mayorRegion?.peso).toBeCloseTo(0.5 / 0.99, 5)
  })

  it('la mayor posición es la de más peso, y sin posiciones no se inventa', () => {
    const c = calcularConcentracion({ US: 1 }, [
      { ticker: 'CSPX', valueEUR: 3000, weight: 0.3 },
      { ticker: 'VWCE', valueEUR: 7000, weight: 0.7 },
    ])
    expect(c.mayorPosicion).toEqual({ ticker: 'VWCE', peso: 0.7 })
    expect(calcularConcentracion({ US: 1 }).mayorPosicion).toBeNull()
    expect(calcularConcentracion({ US: 1 }).hhiPosiciones).toBeNull()
  })
})
