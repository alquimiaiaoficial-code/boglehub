import { describe, it, expect } from 'vitest'
import { INDEX_FUNDS } from '@/data/index-funds'
import { FUND_CLASSES } from '@/data/fund-classes'
import { getAllEtfs } from './etf-database'
import { catalogoSelector, filtrarCatalogo } from './selector-productos'
import { esFondoIndexado, nombreDeFondo } from './fondos-analizables'

/**
 * El desplegable del analizador (28-sep-2026). Lo que no puede pasar, y por qué existe cada
 * test: que un producto que reconocemos no salga en la lista (quien lo busca concluye que no
 * lo tenemos), y que una clase se trate como ETF (el formulario pediría participaciones en
 * vez de euros, y el peso de la cartera saldría mal sin que nadie lo note).
 */
describe('catálogo del desplegable', () => {
  const catalogo = catalogoSelector()

  it('sale todo lo que reconocemos: cada fondo, cada clase y cada ETF', () => {
    const valores = new Set(catalogo.map((o) => o.valor))
    const faltan = [
      ...INDEX_FUNDS.map((f) => f.isin),
      ...FUND_CLASSES.map((c) => c.isin),
      ...getAllEtfs().map((e) => e.ticker),
    ].filter((v) => !valores.has(v))
    expect(faltan, `no salen en el desplegable: ${faltan.join(', ')}`).toEqual([])
  })

  it('los fondos van antes que los ETFs', () => {
    const primerEtf = catalogo.findIndex((o) => o.tipo === 'etf')
    const ultimoFondo = catalogo.map((o) => o.tipo).lastIndexOf('fondo')
    expect(ultimoFondo).toBeLessThan(primerEtf)
  })

  it('sin nada escrito, están todos', () => {
    expect(filtrarCatalogo(catalogo, '')).toHaveLength(catalogo.length)
    expect(filtrarCatalogo(catalogo, '   ')).toHaveLength(catalogo.length)
  })

  it('encuentra una clase por su ISIN, que el buscador anterior no veía', () => {
    const r = filtrarCatalogo(catalogo, 'IE00B03HD191')
    expect(r[0]?.valor).toBe('IE00B03HD191')
    expect(r[0]?.etiqueta).toMatch(/clase EUR Acc/)
  })

  it('encuentra un ETF por su ISIN, no solo por el ticker', () => {
    const vwce = getAllEtfs().find((e) => e.ticker === 'VWCE')
    expect(vwce?.isin).toBeTruthy()
    expect(filtrarCatalogo(catalogo, vwce!.isin!).map((o) => o.valor)).toContain('VWCE')
  })

  it('cada palabra estrecha la lista, en cualquier orden y sin importar mayúsculas', () => {
    const vanguard = filtrarCatalogo(catalogo, 'vanguard')
    const vanguardWorld = filtrarCatalogo(catalogo, 'WORLD vanguard')
    expect(vanguardWorld.length).toBeGreaterThan(0)
    expect(vanguardWorld.length).toBeLessThan(vanguard.length)
    expect(vanguardWorld.every((o) => /vanguard/i.test(o.busqueda) && /world/i.test(o.busqueda))).toBe(true)
  })

  it('las tildes no estorban y se puede buscar en español: «japon» encuentra los fondos de Japón', () => {
    const r = filtrarCatalogo(catalogo, 'japon')
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((o) => o.tipo === 'fondo')).toBe(true)
    expect(r.map((o) => o.valor)).toContain('IE00BYX5N771') // Fidelity MSCI Japan
  })

  it('lo que coincide exactamente con el ticker sube el primero de su grupo', () => {
    const r = filtrarCatalogo(catalogo, 'iwda').filter((o) => o.tipo === 'etf')
    expect(r[0]?.valor).toBe('IWDA')
  })

  it('lo que no está en el catálogo deja la lista vacía, y no rompe nada', () => {
    expect(filtrarCatalogo(catalogo, 'zzzz producto inventado')).toEqual([])
  })
})

describe('una clase es un fondo también en el formulario y en la tabla', () => {
  it('toda clase se reconoce como fondo y tiene nombre que enseñar', () => {
    for (const c of FUND_CLASSES) {
      expect(esFondoIndexado(c.isin), `${c.isin} se trataría como ETF`).toBe(true)
      expect(nombreDeFondo(c.isin)).toMatch(new RegExp(`clase ${c.className.replace(/[()]/g, '\\$&')}`))
    }
  })

  it('un ETF no se confunde con un fondo', () => {
    expect(esFondoIndexado('VWCE')).toBe(false)
    expect(nombreDeFondo('VWCE')).toBeNull()
  })
})

describe('variantes de escritura', () => {
  it('«sp500», «sp 500» y «s&p500» encuentran lo mismo que «s&p 500»', async () => {
    const { catalogoSelector, filtrarCatalogo } = await import('./selector-productos')
    const cat = catalogoSelector()
    const base = filtrarCatalogo(cat, 's&p 500').map((o) => o.valor)
    expect(base.length).toBeGreaterThan(3)
    for (const q of ['sp500', 'sp 500', 's&p500', 'SP500']) {
      expect(filtrarCatalogo(cat, q).map((o) => o.valor)).toEqual(base)
    }
  })
})
