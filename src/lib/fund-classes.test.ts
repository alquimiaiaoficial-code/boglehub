import { describe, it, expect } from 'vitest'
import { FUND_CLASSES, getClassesOfFund } from '@/data/fund-classes'
import { INDEX_FUNDS } from '@/data/index-funds'
import { resolverFondo } from './fondos-analizables'
import { esIsinValido } from './isin'

/**
 * Las clases de participación (25-sep-2026).
 *
 * Una clase no tiene ficha propia —serían páginas casi idénticas— pero el analizador tiene
 * que reconocerla y calcular con SU comisión. Estos tests existen porque los dos fallos que
 * pueden ocurrir son silenciosos: una clase que apunta a un padre que ya no existe deja de
 * reconocerse sin avisar, y una clase que hereda la comisión del padre da un TER ponderado
 * que parece correcto y no lo es.
 */
describe('clases de participación', () => {
  it('hay clases que comprobar (si esto falla, el resto no mira nada)', () => {
    expect(FUND_CLASSES.length).toBeGreaterThan(0)
  })

  it('todo ISIN de clase pasa el dígito de control', () => {
    const malos = FUND_CLASSES.filter((c) => !esIsinValido(c.isin)).map((c) => c.isin)
    expect(malos, `ISIN imposibles en fund-classes.ts: ${malos.join(', ')}`).toEqual([])
  })

  it('ninguna clase repite un ISIN que ya es un fondo con ficha', () => {
    const conFicha = new Set(INDEX_FUNDS.map((f) => f.isin))
    const repetidos = FUND_CLASSES.filter((c) => conFicha.has(c.isin)).map((c) => c.isin)
    expect(repetidos, `estas clases ya tienen ficha propia: ${repetidos.join(', ')}`).toEqual([])
  })

  it('ningún ISIN de clase aparece dos veces', () => {
    const vistos = FUND_CLASSES.map((c) => c.isin)
    expect(new Set(vistos).size).toBe(vistos.length)
  })

  it('toda clase apunta a un fondo padre que existe', () => {
    const slugs = new Set(INDEX_FUNDS.map((f) => f.slug))
    const huerfanas = FUND_CLASSES.filter((c) => !slugs.has(c.parentSlug)).map((c) => `${c.isin} -> ${c.parentSlug}`)
    expect(huerfanas, `clases cuyo padre no existe: ${huerfanas.join(', ')}`).toEqual([])
  })

  it('toda clase declara de dónde sale el dato, con la URL de la gestora', () => {
    const sinFuente = FUND_CLASSES.filter((c) => !/https?:\/\/|\w+\.com\//.test(c.verified)).map((c) => c.isin)
    expect(sinFuente, 'añadir una clase exige citar la ficha de la gestora').toEqual([])
  })

  it('el analizador reconoce cada clase y calcula con SU comisión, no con la del padre', () => {
    for (const c of FUND_CLASSES) {
      const r = resolverFondo(c.isin)
      expect(r, `${c.isin} no se reconoce`).not.toBeNull()
      if (r && 'analizable' in r) {
        expect(r.analizable.fondo.ter, `${c.isin} hereda la comisión del padre`).toBe(c.ter)
        expect(r.analizable.fondo.isin).toBe(c.isin)
      }
    }
  })

  it('la ficha del padre lista sus clases', () => {
    for (const c of FUND_CLASSES) {
      expect(getClassesOfFund(c.parentSlug).map((x) => x.isin)).toContain(c.isin)
    }
  })

  it('el mínimo publicado de una clase institucional dice que lo es', () => {
    // El 24-sep se publicó «10.000 €» como mínimo de una clase que exige 200 millones de
    // entrada: se leyó el campo del mínimo POSTERIOR. Esto obliga a que una clase
    // institucional lo diga en el propio mínimo, que es lo que lee quien la mira.
    const mal = FUND_CLASSES.filter((c) => c.institutional && !/institucional/i.test(c.minimum)).map((c) => c.isin)
    expect(mal).toEqual([])
  })
})
