import { describe, it, expect } from 'vitest'
import { BROKERS, getBrokerBySlug } from './brokers'

/**
 * Guarda la precisión YMYL del binomio fondos / traspaso fiscal libre.
 * El traspaso fiscal libre es un régimen español: un bróker puede ofrecer fondos
 * (supportsFunds) sin acogerse al traspaso (supportsFundTransfers). Lo contrario
 * no tiene sentido: no se puede traspasar lo que no se ofrece.
 */
describe('datos de brókers — invariantes YMYL', () => {
  it('supportsFundTransfers solo puede ser true si supportsFunds es true', () => {
    const incoherentes = BROKERS.filter(
      (b) => b.supportsFundTransfers && !b.supportsFunds,
    ).map((b) => b.slug)
    expect(incoherentes).toEqual([])
  })

  it('Interactive Brokers ofrece fondos pero NO traspaso fiscal libre (es extranjero)', () => {
    const ibkr = getBrokerBySlug('interactive-brokers')
    expect(ibkr).toBeDefined()
    expect(ibkr?.supportsFunds).toBe(true)
    expect(ibkr?.supportsFundTransfers).toBeFalsy()
  })
})
