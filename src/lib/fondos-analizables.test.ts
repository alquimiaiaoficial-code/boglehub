import { describe, it, expect } from 'vitest'
import { INDEX_FUNDS } from '@/data/index-funds'
import { getEtfByTicker } from './etf-database'
import {
  resolverFondo,
  fondosAnalizables,
  isinsClasificados,
  tickersDeExposicion,
} from './fondos-analizables'

/**
 * El test que justifica este fichero por sí solo.
 *
 * Al escribir las tablas de `fondos-analizables.ts` el 17-sep-2026, OCHO de los doce ISINs
 * se pusieron de memoria y no existían en el catálogo. TypeScript compilaba: son claves de
 * un `Record<string, …>` y cualquier cadena vale. El resultado habría sido que ningún fondo
 * se analizara nunca, sin un solo error en consola.
 *
 * Un ISIN mal escrito es indistinguible a ojo de uno bien escrito. Por eso esto es un test
 * y no una revisión.
 */
describe('las tablas apuntan a fondos que existen de verdad', () => {
  const isinsReales = new Set(INDEX_FUNDS.map((f) => f.isin.toUpperCase()))

  it('todo ISIN con equivalencia corresponde a un fondo del catálogo', () => {
    const inventados = isinsClasificados().conEquivalencia.filter((i) => !isinsReales.has(i))
    expect(inventados).toEqual([])
  })

  it('todo ISIN marcado como no analizable corresponde a un fondo del catálogo', () => {
    const inventados = isinsClasificados().sinEquivalencia.filter((i) => !isinsReales.has(i))
    expect(inventados).toEqual([])
  })

  it('ningún fondo está en las dos tablas a la vez', () => {
    const { conEquivalencia, sinEquivalencia } = isinsClasificados()
    const duplicados = conEquivalencia.filter((i) => sinEquivalencia.includes(i))
    expect(duplicados).toEqual([])
  })

  it('los doce fondos del catálogo están clasificados, para que ninguno caiga en el limbo', () => {
    const { conEquivalencia, sinEquivalencia } = isinsClasificados()
    const cubiertos = new Set([...conEquivalencia, ...sinEquivalencia])
    const huerfanos = INDEX_FUNDS.filter((f) => !cubiertos.has(f.isin.toUpperCase())).map(
      (f) => f.name,
    )
    expect(huerfanos).toEqual([])
  })

  it('los ETFs de los que se toma prestada la exposición están en el catálogo y tienen reparto', () => {
    for (const ticker of tickersDeExposicion()) {
      const etf = getEtfByTicker(ticker)
      expect(etf, `${ticker} debería estar en el catálogo de ETFs`).toBeTruthy()
      // Sin reparto por región el fondo se analizaría a cero sin avisar, que es peor que
      // no analizarlo: un cero parece un dato.
      const suma = Object.values(etf!.regionAllocation).reduce((a, b) => a + b, 0)
      expect(suma, `${ticker} debería repartir ~100 % por región`).toBeGreaterThan(0.9)
    }
  })
})

describe('resolverFondo', () => {
  it('encuentra un fondo por su ISIN', () => {
    const r = resolverFondo('IE00B03HCZ61')
    expect(r).not.toBeNull()
    expect(r && 'analizable' in r).toBe(true)
    if (r && 'analizable' in r) {
      expect(r.analizable.fondo.name).toContain('Vanguard Global Stock')
      expect(r.analizable.etfExposicion.ticker).toBe('IWDA')
      expect(r.analizable.calidad).toBe('exacta')
    }
  })

  it('encuentra el mismo fondo por su slug', () => {
    const porIsin = resolverFondo('IE00B03HCZ61')
    const porSlug = resolverFondo('vanguard-global-stock')
    expect(porSlug).not.toBeNull()
    if (porIsin && 'analizable' in porIsin && porSlug && 'analizable' in porSlug) {
      expect(porSlug.analizable.fondo.isin).toBe(porIsin.analizable.fondo.isin)
    }
  })

  it('tolera minúsculas, espacios y guiones en el ISIN', () => {
    for (const entrada of [' ie00b03hcz61 ', 'IE00-B03H-CZ61', 'ie00b03hcz61']) {
      const r = resolverFondo(entrada)
      expect(r && 'analizable' in r, `debería reconocer «${entrada}»`).toBe(true)
    }
  })

  it('devuelve null para lo que no es un fondo, para que lo resuelva el catálogo de ETFs', () => {
    expect(resolverFondo('VWCE')).toBeNull()
    expect(resolverFondo('IWDA')).toBeNull()
    expect(resolverFondo('')).toBeNull()
    expect(resolverFondo('LU0000000000')).toBeNull()
  })

  it('se niega a analizar el Vanguard Eurozone y dice por qué', () => {
    const r = resolverFondo('IE0007987690')
    expect(r && 'noAnalizable' in r).toBe(true)
    if (r && 'noAnalizable' in r) {
      // El motivo se le enseña a una persona: tiene que explicar la causa, no dar un código.
      expect(r.noAnalizable.motivo).toMatch(/MSCI EMU/)
      expect(r.noAnalizable.motivo.length).toBeGreaterThan(60)
    }
  })

  /**
   * Este test decía lo contrario hasta el 18-sep-2026: exigía que el Vanguard Emerging
   * Markets NO se analizara, porque yo sospechaba que replicaba un índice FTSE.
   *
   * El factsheet de Vanguard del 31-ago-2026 dice «MSCI Emerging Markets Index […] large and
   * mid-sized company stocks». La sospecha era razonable —Vanguard usa FTSE en sus ETFs de
   * emergentes, y el `etfEquivalent` del catálogo apuntaba a VFEM, que es FTSE— y era falsa.
   *
   * Se deja el caso con la aserción invertida en vez de borrarlo, para que si alguien vuelve
   * a moverlo tenga delante por qué está donde está.
   */
  it('analiza el Vanguard Emerging Markets con AEEM, porque replica MSCI EM y no FTSE', () => {
    const r = resolverFondo('IE0031786142')
    expect(r && 'analizable' in r).toBe(true)
    if (r && 'analizable' in r) {
      expect(r.analizable.etfExposicion.ticker).toBe('AEEM')
      expect(r.analizable.calidad).toBe('exacta')
      expect(r.analizable.fondo.index).toMatch(/MSCI Emerging Markets/)
    }
  })
})

describe('honestidad de lo que se muestra', () => {
  it('toda equivalencia aproximada lleva nota explicando en qué se aproxima', () => {
    const sinNota = fondosAnalizables()
      .filter((f) => f.calidad === 'aproximada' && !f.nota)
      .map((f) => f.fondo.name)
    expect(sinNota).toEqual([])
  })

  it('una equivalencia exacta no necesita nota, porque no hay nada que matizar', () => {
    const exactas = fondosAnalizables().filter((f) => f.calidad === 'exacta')
    expect(exactas.length).toBeGreaterThan(0)
    for (const f of exactas) expect(f.nota).toBeUndefined()
  })

  it('el TER que se usa es el del fondo, nunca el del ETF del que se copia la exposición', () => {
    // Es la trampa más fácil de este diseño y la que más dinero cuesta al usuario.
    // Vanguard Global Stock cuesta 0,18 % y IWDA 0,20 %: si se colara el del ETF, el
    // analizador diría que la cartera es más cara de lo que es.
    const r = resolverFondo('IE00B03HCZ61')
    if (r && 'analizable' in r) {
      expect(r.analizable.fondo.ter).not.toBe(r.analizable.etfExposicion.ter)
      expect(r.analizable.fondo.ter).toBe(0.18)
    }
  })
})

describe('cobertura', () => {
  it('hoy se puede analizar la mayoría de los fondos publicados', () => {
    const analizables = fondosAnalizables()
    // 11 de 12. Si baja, algo se ha roto; si sube, hay que actualizar este número a mano
    // para que nadie amplíe la tabla sin mirar la calidad de lo que añade.
    //
    // Pasó de 10 a 11 el 18-sep-2026: el Vanguard Emerging Markets estaba fuera por una
    // sospecha mía de que replicaba un índice FTSE, y el factsheet de Vanguard del 31 de
    // agosto dice MSCI Emerging Markets. La sospecha era razonable y era falsa.
    expect(analizables.length).toBe(11)
    expect(analizables.length).toBeLessThan(INDEX_FUNDS.length)
  })
})
