import { describe, it, expect } from 'vitest'
import { shouldIndex, robotsFor } from './seo-index-policy'
import sitemap from '@/app/sitemap'
import { ETF_PAIRS, pairToSlug } from '@/data/etf-pairs'

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
      '/glosario/ter',
      '/calculadora/irpf-venta-fondos',
    ]) {
      expect(shouldIndex(path), path).toBe(true)
    }
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

  it('de las comparativas ETF solo indexa los pares curados, en cualquier orden', () => {
    const [a, b] = ETF_PAIRS[0]
    expect(shouldIndex(`/comparar/${pairToSlug(a, b)}`)).toBe(true)
    expect(shouldIndex(`/comparar/${pairToSlug(b, a)}`)).toBe(true)
    // par generado por combinatoria que no está en la lista curada
    expect(shouldIndex('/comparar/iusa-vs-euna')).toBe(false)
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
    expect(urls.length).toBeGreaterThan(200)
    expect(urls.length).toBeLessThan(600)
  })

  it('la landing de conversión sigue en el sitemap', () => {
    expect(urls).toContain('/guia')
  })
})
