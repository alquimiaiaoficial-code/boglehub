import { describe, it, expect } from 'vitest'
import { NUMEROS_NEWSLETTER } from '@/data/newsletter'
import {
  MARCA_BAJA,
  horaMadrid,
  nombreBroadcast,
  numeroDeLaFecha,
  renderNumero,
  tocaEnviar,
} from './newsletter-email'

describe('calendario de la newsletter', () => {
  it('en verano la entrada de las 06 UTC cae a las 8 de Madrid y toca', () => {
    const h = horaMadrid(new Date('2026-10-06T06:17:00Z'))
    expect(h).toEqual({ fecha: '2026-10-06', diaSemana: 2, hora: 8 })
    expect(tocaEnviar(h)).toBe(true)
  })

  it('tras el cambio de hora del 25-oct la de las 06 UTC son las 7 y no toca; la de las 07 UTC sí', () => {
    expect(tocaEnviar(horaMadrid(new Date('2026-10-27T06:40:00Z')))).toBe(false)
    expect(tocaEnviar(horaMadrid(new Date('2026-10-27T07:05:00Z')))).toBe(true)
  })

  it('fuera del martes o fuera de las 8-9 no toca', () => {
    expect(tocaEnviar(horaMadrid(new Date('2026-10-07T06:30:00Z')))).toBe(false) // miércoles
    expect(tocaEnviar(horaMadrid(new Date('2026-10-06T08:10:00Z')))).toBe(false) // 10:10 Madrid
  })

  it('solo devuelve el número de esa fecha exacta', () => {
    expect(numeroDeLaFecha(NUMEROS_NEWSLETTER, '2026-10-06')?.numero).toBe(1)
    expect(numeroDeLaFecha(NUMEROS_NEWSLETTER, '2026-10-13')).toBeUndefined()
  })
})

describe('los números del repo', () => {
  it('tienen número único, fecha única y cada fecha es un martes', () => {
    const numeros = NUMEROS_NEWSLETTER.map((n) => n.numero)
    const fechas = NUMEROS_NEWSLETTER.map((n) => n.fecha)
    expect(new Set(numeros).size).toBe(numeros.length)
    expect(new Set(fechas).size).toBe(fechas.length)
    for (const f of fechas) expect(new Date(`${f}T12:00:00Z`).getUTCDay()).toBe(2)
  })

  it('cada número enlaza al menos una página de boglehub.com y no enlaza fuera', () => {
    for (const n of NUMEROS_NEWSLETTER) {
      const { html } = renderNumero(n)
      const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1])
      const internos = hrefs.filter((h) => h.startsWith('https://boglehub.com/'))
      expect(internos.length).toBeGreaterThan(0)
      expect(hrefs.every((h) => h.startsWith('https://boglehub.com/') || h === MARCA_BAJA)).toBe(true)
    }
  })

  it('no llevan rayas largas ni comillas angulares (voz de los correos)', () => {
    for (const n of NUMEROS_NEWSLETTER) {
      const todo = [n.asunto, n.preencabezado, ...n.parrafos].join(' ')
      expect(todo).not.toMatch(/[—«»]/)
    }
  })

  it('se quedan entre 120 y 320 palabras', () => {
    for (const n of NUMEROS_NEWSLETTER) {
      const palabras = n.parrafos.join(' ').split(/\s+/).length
      expect(palabras).toBeGreaterThanOrEqual(120)
      expect(palabras).toBeLessThanOrEqual(320)
    }
  })
})

describe('render', () => {
  const n = NUMEROS_NEWSLETTER[0]

  it('lleva el enlace de baja de Resend en HTML y en texto', () => {
    const mail = renderNumero(n)
    expect(mail.html).toContain(`href="${MARCA_BAJA}"`)
    expect(mail.text).toContain(MARCA_BAJA)
  })

  it('escapa el HTML y solo convierte en enlace las URLs de boglehub.com', () => {
    const mail = renderNumero({
      ...n,
      parrafos: ['<script>x</script> [malo](https://evil.example) [bueno](https://boglehub.com/broker)'],
    })
    expect(mail.html).toContain('&lt;script&gt;')
    expect(mail.html).not.toContain('evil.example"')
    expect(mail.html).toContain('<a href="https://boglehub.com/broker"')
    expect(mail.text).toContain('bueno (https://boglehub.com/broker)')
  })

  it('el nombre del broadcast depende solo del número', () => {
    expect(nombreBroadcast(n)).toBe('boglehub-n1')
  })
})
