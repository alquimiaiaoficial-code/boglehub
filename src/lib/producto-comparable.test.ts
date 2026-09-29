import { describe, it, expect } from 'vitest'
import { resolverProducto, solapamientoPorRegion, type ProductoComparable } from './producto-comparable'
import { fondosAnalizables } from './fondos-analizables'
import { getEtfByTicker } from './etf-database'

/**
 * El comparador acepta fondos desde el 29-sep-2026. Lo que no puede pasar: que un fondo
 * salga con la comisión del ETF del que toma la exposición, o que uno que no analizamos se
 * compare como si nada.
 */
describe('resolverProducto', () => {
  it('un ETF por ticker y por ISIN', () => {
    const porTicker = resolverProducto('vwce')
    const porIsin = resolverProducto('IE00BK5BQT80')
    expect(porTicker?.estado).toBe('ok')
    expect(porIsin?.estado).toBe('ok')
    const p = porTicker as ProductoComparable
    expect(p.tipo).toBe('ETF')
    expect(p.traspasoSinTributar).toBe(false)
  })

  it('un fondo usa SU comisión y la exposición del ETF de su índice', () => {
    const f = fondosAnalizables()[0]!
    const p = resolverProducto(f.fondo.isin) as ProductoComparable
    expect(p.estado).toBe('ok')
    expect(p.tipo).toBe('Fondo indexado')
    expect(p.ter).toBe(f.fondo.ter)
    expect(p.traspasoSinTributar).toBe(true)
    expect(p.regiones).toEqual(f.etfExposicion.regionAllocation)
    expect(p.notaExposicion).toContain(f.etfExposicion.ticker)
  })

  it('una aproximación se dice como aproximación', () => {
    const aprox = fondosAnalizables().find((f) => f.calidad === 'aproximada')
    if (!aprox) return
    const p = resolverProducto(aprox.fondo.isin) as ProductoComparable
    expect(p.notaExposicion).toMatch(/aproximado/)
  })

  it('un fondo que no analizamos no se compara: trae su motivo', () => {
    const p = resolverProducto('IE00B83YJG36') // inmobiliario sin ETF equivalente
    expect(p?.estado).toBe('noAnalizable')
    expect(p && 'motivo' in p ? p.motivo : '').toMatch(/preferimos no dar número/)
  })

  it('el oro sale como ETC, no como ETF', () => {
    const p = resolverProducto('SGLN') as ProductoComparable
    expect(p.tipo).toBe('ETC')
    expect(p.reparto).toBe('No reparte (ETC)')
  })

  it('lo que no conocemos devuelve null', () => {
    expect(resolverProducto('ZZZZ')).toBeNull()
    expect(resolverProducto('')).toBeNull()
  })
})

describe('solapamientoPorRegion', () => {
  it('el mismo fondo en dos bolsas se solapa al 100 %', () => {
    const a = resolverProducto('IWDA') as ProductoComparable
    const b = resolverProducto('EUNL') as ProductoComparable
    expect(solapamientoPorRegion(a, b)).toBe(100)
  })

  it('coincide con el cálculo que hacía el comparador para dos ETFs', () => {
    const a = getEtfByTicker('VWCE')!
    const b = getEtfByTicker('CSPX')!
    let esperado = 0
    for (const r of Object.keys(a.regionAllocation) as (keyof typeof a.regionAllocation)[]) {
      esperado += Math.min(a.regionAllocation[r] ?? 0, b.regionAllocation[r] ?? 0)
    }
    expect(solapamientoPorRegion(resolverProducto('VWCE') as ProductoComparable, resolverProducto('CSPX') as ProductoComparable)).toBe(Math.round(esperado * 100))
  })
})
