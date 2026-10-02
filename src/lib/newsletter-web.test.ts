import { describe, it, expect } from 'vitest'
import { numerosPublicados, parrafosWeb, trozos, fechaLarga } from './newsletter-web'
import { NUMEROS_NEWSLETTER, type NumeroNewsletter } from '@/data/newsletter'

const n = (numero: number, fecha: string): NumeroNewsletter => ({
  numero, fecha, asunto: 'a', preencabezado: 'p', parrafos: ['Hola,', 'Texto.', 'Un saludo,'],
})

describe('numerosPublicados', () => {
  it('no enseña un número el mismo martes que sale ni antes', () => {
    expect(numerosPublicados([n(1, '2026-10-06')], '2026-10-06')).toEqual([])
    expect(numerosPublicados([n(1, '2026-10-06')], '2026-10-02')).toEqual([])
  })
  it('lo enseña desde el día siguiente, el más reciente primero', () => {
    const r = numerosPublicados([n(1, '2026-10-06'), n(2, '2026-10-13')], '2026-10-20')
    expect(r.map((x) => x.numero)).toEqual([2, 1])
  })
})

describe('parrafosWeb', () => {
  it('quita saludo y despedida', () => {
    expect(parrafosWeb(n(1, '2026-10-06'))).toEqual(['Texto.'])
  })
  it('en los números reales deja al menos un párrafo de contenido', () => {
    for (const x of NUMEROS_NEWSLETTER) expect(parrafosWeb(x).length).toBeGreaterThan(0)
  })
})

describe('trozos', () => {
  it('convierte los enlaces de boglehub.com en rutas internas', () => {
    expect(trozos('Mira [la página](https://boglehub.com/cuenta-europea-de-inversion) ya.')).toEqual([
      { texto: 'Mira ' },
      { texto: 'la página', href: '/cuenta-europea-de-inversion' },
      { texto: ' ya.' },
    ])
  })
  it('no convierte enlaces a otros dominios', () => {
    expect(trozos('[x](https://ejemplo.com)')).toEqual([{ texto: '[x](https://ejemplo.com)' }])
  })
})

it('fechaLarga', () => {
  expect(fechaLarga('2026-10-06')).toBe('6 de octubre de 2026')
})
