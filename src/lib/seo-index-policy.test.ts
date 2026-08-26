import { describe, it, expect } from 'vitest'
import { shouldIndex, robotsFor } from './seo-index-policy'
import sitemap from '@/app/sitemap'
import { ETF_PAIRS, pairToSlug } from '@/data/etf-pairs'
import { shouldIndex as policy } from './seo-index-policy'

const BASE_URL = 'https://boglehub.com'

describe('política de indexación', () => {
  it('indexa el núcleo editorial y las herramientas', () => {
    for (const path of [
      '/',
      '/analyzer',
      '/guia',
      '/datos-clave',
      '/blog/vwce-vs-cspx-vs-iwda',
      '/etfs/renta-fija',
      '/fondo/fidelity-emerging-markets-index',
      '/etfs',
      '/glosario/ter',
      '/calculadora/irpf-venta-fondos',
    ]) {
      expect(shouldIndex(path), path).toBe(true)
    }
  })

  it('excluye las familias sin demanda demostrada del segundo recorte', () => {
    for (const path of [
      '/etf/vwce',
      '/vs-broker/trade-republic-vs-degiro',
      '/invertir/100-euros-al-mes',
      '/cuanto-necesito/jubilacion',
    ]) {
      expect(shouldIndex(path), path).toBe(false)
    }
  })

  it('no confunde /etf/ (excluida) con /etfs/ (indexada)', () => {
    expect(shouldIndex('/etf/vwce')).toBe(false)
    expect(shouldIndex('/etfs/renta-fija')).toBe(true)
    expect(shouldIndex('/etf')).toBe(true)
    expect(shouldIndex('/etfs')).toBe(true)
  })

  it('excluye las páginas de detalle generadas por combinatoria', () => {
    for (const path of [
      '/simulacion/1000/vwce/2020',
      '/dca/vwce/20-anios',
      '/comprar/vwce/degiro',
      '/ahorrar/100-euros-al-mes/para/1-millon-euros',
      '/plan/30-anos/jubilacion',
      '/analiza/vwce/donde-comprar',
      '/comparar-cartera/boglehead-3-vs-all-weather',
      '/historico/2008/vwce',
    ]) {
      expect(shouldIndex(path), path).toBe(false)
    }
  })

  it('mantiene indexados los hubs de esas mismas secciones', () => {
    for (const path of ['/simulacion', '/plan', '/historico', '/comparar']) {
      expect(shouldIndex(path), path).toBe(true)
    }
  })

  it('de las comparativas solo indexa los pares con demanda demostrada, en cualquier orden', () => {
    // par con impresiones reales y posición de página 1
    expect(shouldIndex('/comparar/vwce-vs-cndx')).toBe(true)
    expect(shouldIndex('/comparar/cndx-vs-vwce')).toBe(true)
    // curado a mano pero sin una sola impresión en toda su vida
    expect(shouldIndex('/comparar/vwce-vs-cspx')).toBe(false)
    // generado por combinatoria
    expect(shouldIndex('/comparar/iusa-vs-euna')).toBe(false)
  })

  it('la lista editorial ETF_PAIRS y la de indexación son independientes', () => {
    // ETF_PAIRS alimenta la interfaz y llms.txt; no debe encoger por el recorte SEO
    expect(ETF_PAIRS.length).toBeGreaterThan(40)
    const indexados = ETF_PAIRS.filter(([a, b]) => policy(`/comparar/${pairToSlug(a, b)}`))
    expect(indexados.length).toBeLessThan(ETF_PAIRS.length)
  })

  it('robotsFor solo devuelve bloque en las rutas excluidas', () => {
    expect(robotsFor('/analyzer')).toBeUndefined()
    expect(robotsFor('/dca/vwce/20-anios')).toMatchObject({ index: false, follow: true })
  })
})

describe('coherencia entre sitemap y política', () => {
  const urls = sitemap().map((r) => r.url.replace(BASE_URL, '') || '/')

  it('el sitemap no anuncia ninguna URL marcada como noindex', () => {
    const contradictorias = urls.filter((path) => !shouldIndex(path))
    expect(contradictorias).toEqual([])
  })

  it('el recorte deja el sitemap muy por debajo de las 1.404 URLs previas', () => {
    expect(urls.length).toBeGreaterThan(150)
    expect(urls.length).toBeLessThan(400)
  })

  it('la landing de conversión sigue en el sitemap', () => {
    expect(urls).toContain('/guia')
  })
})
