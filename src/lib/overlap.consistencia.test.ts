import { describe, it, expect } from 'vitest'
import { getEtfByTicker } from './etf-database'
import { BLOG_ARTICLES } from '@/data/blog-articles'

/**
 * El artículo de solapamiento cita cifras de exposición a EE. UU. de la cartera
 * VWCE + CSPX. Esas cifras deben salir del mismo dataset del que calcula el
 * analizador: si divergen, un lector que ejecute la herramienta ve un número y
 * el artículo le dice otro.
 *
 * Ocurrió: el artículo decía "~61 % a ~80 %" mientras el dataset daba 63 % y
 * 81,5 %. Este test lo fija para que no vuelva a separarse en silencio.
 */
describe('coherencia entre el artículo de solapamiento y el dataset', () => {
  const vwce = getEtfByTicker('vwce')
  const cspx = getEtfByTicker('cspx')

  it('el dataset tiene el reparto por región de ambos ETFs', () => {
    expect(vwce?.regionAllocation.US).toBeDefined()
    expect(cspx?.regionAllocation.US).toBeDefined()
  })

  it('las cifras citadas en el artículo coinciden con el dataset (±1 pp)', () => {
    const soloVwce = (vwce!.regionAllocation.US ?? 0) * 100
    const mitadYMitad = soloVwce * 0.5 + (cspx!.regionAllocation.US ?? 0) * 100 * 0.5

    const articulo = BLOG_ARTICLES.find((a) => a.slug === 'solapamiento-etfs-error-silencioso')
    expect(articulo, 'el artículo de solapamiento debe existir').toBeDefined()

    const texto = JSON.stringify(articulo)
    // Se citan como "~63 %" y "~82 %": se extraen y se comparan con el cálculo real.
    const citadas = [...texto.matchAll(/~(\d{2}) ?%/g)].map((m) => Number(m[1]))

    expect(citadas, 'el artículo debe citar la exposición a EE. UU.').toContain(
      Math.round(soloVwce)
    )
    expect(
      citadas.some((n) => Math.abs(n - mitadYMitad) <= 1),
      `el artículo debe citar ~${Math.round(mitadYMitad)} % para el 50/50; cita ${citadas.join(', ')}`
    ).toBe(true)
  })
})
