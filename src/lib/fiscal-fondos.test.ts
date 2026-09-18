import { describe, it, expect } from 'vitest'
import { computeFiscalGrade, computeFiscalGradeFondo } from './fiscal'

/**
 * El grado fiscal de los fondos, añadido el 18-sep-2026.
 *
 * Las 68 fichas de ETF mostraban grado fiscal y las de fondos no, y la asimetría estaba justo
 * al revés de como suena: en España **un fondo es fiscalmente mejor que un ETF equivalente**,
 * porque se traspasa a otro fondo sin computar la ganancia. Faltaba el grado en el lado que
 * gana.
 */
describe('grado fiscal de un fondo indexado', () => {
  it('un fondo irlandés de acumulación saca A, igual que el ETF equivalente', () => {
    // El convenio Irlanda-EE. UU. y la acumulación funcionan igual en los dos vehículos, así
    // que la letra no tiene por qué cambiar.
    const fondo = computeFiscalGradeFondo('IE00B03HCZ61', true)
    const etf = computeFiscalGrade('IE00B4L5Y983', true)
    expect(fondo.grade).toBe('A')
    expect(fondo.grade).toBe(etf.grade)
  })

  it('la letra NO sube por ser fondo, y eso es deliberado', () => {
    /**
     * La tentación era dar una «A+» o subir un escalón por el traspaso. Sería inventarse una
     * escala: la A ya significa máxima eficiencia, y un fondo luxemburgués de acumulación no
     * deja de arrastrar la retención del 30 % por poder traspasarse. Si la letra subiera,
     * dejaría de ser comparable con la de los ETFs, que es para lo que sirve.
     */
    for (const [isin, acc] of [
      ['IE00B03HCZ61', true],
      ['LU0996177134', true],
      ['LU1437015735', false],
    ] as const) {
      expect(computeFiscalGradeFondo(isin, acc).grade).toBe(computeFiscalGrade(isin, acc).grade)
    }
  })

  it('lo que cambia es la explicación: menciona el traspaso y su condición', () => {
    const r = computeFiscalGradeFondo('IE00B03HCZ61', true)
    expect(r.reason).toMatch(/traspaso/)
    expect(r.reason).toMatch(/94\.1\.a\)/)
    // La condición es la mitad del hecho: sin ella, «no tributa» es falso para quien vende,
    // cobra y vuelve a comprar.
    expect(r.reason).toMatch(/no llegue a estar a tu disposición/)
    // Y dice qué pasa con un ETF, que es la comparación que da sentido al dato.
    expect(r.reason).toMatch(/Con un ETF ese cambio exige vender/)
  })

  it('un fondo luxemburgués de acumulación saca B: el traspaso no tapa la retención del 30 %', () => {
    const r = computeFiscalGradeFondo('LU0996177134', true)
    expect(r.grade).toBe('B')
    expect(r.reason).toMatch(/30 %/)
    expect(r.reason).toMatch(/traspaso/)
  })

  it('sin ISIN no se inventa nada: F y sin la nota del traspaso', () => {
    const r = computeFiscalGradeFondo(undefined, true)
    expect(r.grade).toBe('F')
    expect(r.reason).not.toMatch(/traspaso/)
  })
})
