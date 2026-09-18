import { describe, it, expect } from 'vitest'
import { digitoDeControlIsin, esIsinValido } from './isin'
import { getAllEtfs } from './etf-database'
import { INDEX_FUNDS } from '@/data/index-funds'

describe('digito de control del ISIN', () => {
  it('acepta ISINs reales verificados en fuente', () => {
    // Los seis del catálogo de fondos comprobados el 18-sep-2026 contra el registro,
    // más dos ETFs muy conocidos.
    for (const isin of [
      'IE00B03HCZ61', // Vanguard Global Stock Index
      'IE0032126645', // Vanguard U.S. 500 Stock Index
      'IE0031786142', // Vanguard Emerging Markets Stock Index
      'IE00BYX5MX67', // Fidelity S&P 500 Index
      'IE0007987690', // Vanguard European Stock Index
      'IE00B18GC888', // Vanguard Global Bond Index EUR Hedged
      'IE00BK5BQT80', // VWCE
      'IE00BF4RFH31', // IUSN
    ]) {
      expect(esIsinValido(isin), `${isin} deberia ser valido`).toBe(true)
    }
  })

  it('rechaza los ISINs inventados que llegaron a producción', () => {
    // Los siete que encontró el barrido del 18-sep-2026. Se dejan escritos aquí a
    // propósito: si alguno vuelve al repositorio, este test dice de dónde salía.
    const inventados: [string, string][] = [
      ['IE00BYX5L514', 'ficha «Fidelity Emerging Markets Index»'],
      ['LU2050633988', 'ficha «Amundi Prime USA»'],
      ['IE00B3X0HQ01', 'IUSN en etfs.json'],
      ['IE00B7J9BP19', 'SEMB en etfs.json'],
      ['IE00BD45HH93', 'IWQU en etfs.json'],
      ['IE00BGQYYS21', 'IGLH en etfs.json'],
      ['IE00BJ0KDW41', 'XMWO en etfs.json'],
    ]
    for (const [isin, donde] of inventados) {
      expect(esIsinValido(isin), `${isin} (${donde}) no puede ser valido`).toBe(false)
    }
  })

  it('rechaza lo que ni siquiera tiene forma de ISIN', () => {
    for (const basura of ['', 'IE00B03HCZ6', 'IE00B03HCZ611', '0E00B03HCZ61', 'IE00B03HCZ6X']) {
      expect(esIsinValido(basura)).toBe(false)
      expect(digitoDeControlIsin(basura)).toBe(null)
    }
  })

  it('el dígito calculado es el que dice la norma', () => {
    expect(digitoDeControlIsin('IE00B03HCZ61')).toBe(1)
    expect(digitoDeControlIsin('IE00BYX5L514')).toBe(0) // el nuestro acababa en 4
    expect(digitoDeControlIsin('LU2050633988')).toBe(6) // el nuestro acababa en 8
  })
})

/**
 * Este es el test que de verdad importa. Los otros comprueban la función; este comprueba
 * los DATOS, que es donde estaba el fallo.
 *
 * Ojo con lo que NO prueba: que un ISIN sea aritméticamente posible no significa que sea el
 * del producto que decimos. `LU1437015735` pasa esta comprobación y es un ETF de bolsa
 * europea que figuraba en el catálogo como fondo de renta fija. Esto cierra una puerta, no
 * todas.
 */
describe('ningún catálogo publica un ISIN imposible', () => {
  it('todos los ETFs de etfs.json', () => {
    const malos = getAllEtfs()
      .filter(etf => etf.isin && !esIsinValido(etf.isin))
      .map(etf => `${etf.ticker} -> ${etf.isin}`)
    expect(malos, `ISINs con dígito de control inválido: ${malos.join(', ')}`).toEqual([])
  })

  it('todos los fondos de index-funds.ts', () => {
    const malos = INDEX_FUNDS
      .filter(fondo => !esIsinValido(fondo.isin))
      .map(fondo => `${fondo.slug} -> ${fondo.isin}`)
    expect(malos, `ISINs con dígito de control inválido: ${malos.join(', ')}`).toEqual([])
  })
})
