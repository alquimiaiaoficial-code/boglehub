import { describe, it, expect } from 'vitest'
import { resolveBrokerLink } from './monetization'

const OFFICIAL = 'https://www.myinvestor.es'
const AFFIL = { myinvestor: 'https://example-affiliate.com/mi?ref=bogle' }

describe('resolveBrokerLink', () => {
  it('con el flag apagado sale SIEMPRE el enlace oficial, sin marca de afiliado', () => {
    const link = resolveBrokerLink('myinvestor', OFFICIAL, false, AFFIL)
    expect(link.url).toBe(OFFICIAL)
    expect(link.isAffiliate).toBe(false)
    expect(link.rel).toBe('noopener noreferrer')
  })

  it('con el flag encendido y URL de afiliado, sale el afiliado con rel=sponsored', () => {
    const link = resolveBrokerLink('myinvestor', OFFICIAL, true, AFFIL)
    expect(link.url).toBe(AFFIL.myinvestor)
    expect(link.isAffiliate).toBe(true)
    expect(link.rel).toContain('sponsored')
    expect(link.rel).toContain('noopener')
  })

  it('con el flag encendido pero SIN URL de afiliado para ese broker, sale el oficial sin etiquetar', () => {
    const link = resolveBrokerLink('degiro', 'https://www.degiro.es', true, AFFIL)
    expect(link.url).toBe('https://www.degiro.es')
    expect(link.isAffiliate).toBe(false)
    expect(link.rel).toBe('noopener noreferrer')
  })
})
