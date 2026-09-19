import { describe, it, expect } from 'vitest'
import { getAllEtfs } from './etf-database'
import { esIsinValido } from './isin'

/**
 * Dos ETFs PUEDEN compartir ISIN: es el mismo fondo UCITS cotizado en dos bolsas. CSPX y SXR8
 * son iShares Core S&P 500; IWDA y EUNL son iShares Core MSCI World. El cargador de
 * `etf-database.ts` lo dice desde hace tiempo: «ISIN is therefore NOT a unique key».
 *
 * Lo que NO puede pasar es que dos productos DISTINTOS compartan ISIN. Y pasaba.
 *
 * El 19-sep-2026, listando los ISINs compartidos, salieron seis grupos imposibles:
 *
 *   IE00B3VTML14  iShares MSCI Europe Small Cap (renta variable)  +  Vanguard EUR Govt Bond
 *   IE00B3YLTY66  iShares MSCI EM (renta variable)  +  SPDR Euro Govt Bond
 *   IE00B3VVMM84  Vanguard FTSE EM  +  SPDR MSCI Europe Small Cap Value
 *   IE00B53SZB19  iShares Nasdaq 100  +  iShares MSCI World Quality Dividend ESG
 *   IE00BJ0KDQ92  Xtrackers MSCI World  +  Xtrackers MSCI World Value Factor
 *   IE00B5BMR087  el mismo fondo con DOS TER distintos (0,07 y 0,10)
 *
 * Verificado en fuente: en dos de esos grupos el ISIN no era de NINGUNO de los dos; alguien
 * copió identificadores entre fichas. Los siete ISINs equivocados se retiraron en vez de
 * adivinarse.
 *
 * POR QUÉ IMPORTA MÁS QUE UN DATO FLOJO. El ISIN se publica en la ficha del ETF, en
 * `schema.org`, en `llms-full.txt` y dentro de la instrucción «usa el buscador con el ISIN»
 * de las páginas de compra, junto a «verifica que el ISIN coincide exactamente para evitar
 * comprar un ETF equivocado». Un ISIN de otro producto ahí no es una errata: es la
 * instrucción de comprar otra cosa.
 *
 * Esto complementa a `isin.test.ts`, que comprueba el dígito de control. Aquel detecta lo
 * IMPOSIBLE; este detecta una parte de lo FALSO: un ISIN perfectamente válido colocado en la
 * ficha equivocada. Ninguno de los dos prueba que un ISIN único sea el correcto — eso sigue
 * necesitando fuente externa, y está pendiente para las 59 fichas que hoy llevan uno.
 */
describe('ISINs compartidos entre ETFs', () => {
  const porIsin = new Map<string, ReturnType<typeof getAllEtfs>>()
  for (const etf of getAllEtfs()) {
    if (!etf.isin) continue
    const grupo = porIsin.get(etf.isin) ?? []
    grupo.push(etf)
    porIsin.set(etf.isin, grupo)
  }
  const compartidos = [...porIsin.entries()].filter(([, g]) => g.length > 1)

  it('sigue habiendo cotizaciones dobles reconocidas', () => {
    // Si esto baja a cero, o se ha vaciado el catálogo o alguien ha «arreglado» las
    // duplicidades legítimas, que no son un error.
    expect(compartidos.length).toBeGreaterThan(0)
  })

  it('un ISIN compartido implica la MISMA clase de activo', () => {
    const malos = compartidos
      .filter(([, g]) => new Set(g.map((e) => e.assetClass)).size > 1)
      .map(([isin, g]) => `${isin}: ${g.map((e) => `${e.ticker}(${e.assetClass})`).join(' + ')}`)
    expect(malos, `mismo ISIN, distinta clase de activo: ${malos.join(' | ')}`).toEqual([])
  })

  it('un ISIN compartido implica el MISMO TER', () => {
    // El TER es del fondo, no de la cotización. Dos cifras distintas significan que una
    // de las dos fichas está mal, aunque las dos describan el mismo producto.
    const malos = compartidos
      .filter(([, g]) => new Set(g.map((e) => e.ter)).size > 1)
      .map(([isin, g]) => `${isin}: ${g.map((e) => `${e.ticker} ${e.ter}%`).join(' vs ')}`)
    expect(malos, `mismo ISIN, distinto TER: ${malos.join(' | ')}`).toEqual([])
  })

  it('un ISIN compartido implica la misma política de reparto', () => {
    const malos = compartidos
      .filter(([, g]) => new Set(g.map((e) => e.accumulating)).size > 1)
      .map(([isin, g]) => `${isin}: ${g.map((e) => `${e.ticker} ${e.accumulating ? 'acc' : 'dist'}`).join(' vs ')}`)
    expect(malos, `mismo ISIN, distinto reparto: ${malos.join(' | ')}`).toEqual([])
  })

  it('todo ISIN que se publique sigue siendo aritméticamente posible', () => {
    const malos = getAllEtfs()
      .filter((e) => e.isin && !esIsinValido(e.isin))
      .map((e) => `${e.ticker} -> ${e.isin}`)
    expect(malos).toEqual([])
  })

  /**
   * Las fichas sin ISIN son deliberadas, no un olvido: son las siete a las que se les retiró
   * porque pertenecía a otro producto. Si el número crece sin que nadie lo explique, algo se
   * está perdiendo por el camino.
   */
  it('las fichas sin ISIN son las que se saben, y no más', () => {
    const sinIsin = getAllEtfs().filter((e) => !e.isin).map((e) => e.ticker).sort()
    expect(sinIsin).toEqual(['EMIM', 'EQDS', 'SEGA', 'SMEA', 'VGEA', 'XDWL', 'ZPRS'])
  })
})
