/**
 * Las comisiones de los brókers salen de una sola fuente (`src/data/comisiones-brokers.ts`),
 * leída en la web de cada uno el 30-sep-2026. Hasta ese día la web decía «Trade Republic 0 €
 * por operación» (cobra 1 €), «DEGIRO 0,50 € + 0,004 %» (tarifa retirada), «MyInvestor
 * 0,20 € + 0,03 %» (cobra el 0,12 %, mínimo 1 €), «Openbank ~8 €» (1 €) e «ING ~9-22 €»
 * (3 € + 0,10 %), y la calculadora sumaba el mínimo al porcentaje.
 */
import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { BROKERS, comisionPorOrdenEtf, computeBrokerCost } from './brokers'
import { COMISIONES, TRES_BROKERS } from '@/data/comisiones-brokers'
import { BROKERS as FICHAS } from '@/data/brokers'

const broker = (id: string) => {
  const b = BROKERS.find((x) => x.id === id)
  if (!b) throw new Error(id)
  return b
}

describe('comisión de una orden de ETF', () => {
  it('MyInvestor: 0,12 % con mínimo de 1 € y máximo de 25 €', () => {
    const f = broker('myinvestor').fees
    expect(comisionPorOrdenEtf(f, 300)).toBe(1)
    expect(comisionPorOrdenEtf(f, 2000)).toBeCloseTo(2.4, 6)
    expect(comisionPorOrdenEtf(f, 30000)).toBe(25)
  })

  it('Interactive Brokers: el 0,05 % o el mínimo de 1,25 €, el mayor, nunca la suma', () => {
    const f = broker('ibkr').fees
    expect(comisionPorOrdenEtf(f, 1000)).toBe(1.25)
    expect(comisionPorOrdenEtf(f, 10000)).toBeCloseTo(5, 6)
    expect(comisionPorOrdenEtf(f, 100000)).toBe(29)
  })

  it('Scalable (plan FREE): 0,99 € por debajo de 250 €, gratis desde 250 €', () => {
    const f = broker('scalable').fees
    expect(comisionPorOrdenEtf(f, 100)).toBe(0.99)
    expect(comisionPorOrdenEtf(f, 250)).toBe(0)
  })

  it('el porcentaje va sobre cada orden, no sobre lo aportado en el mes', () => {
    // 3.000 € al mes en 3 órdenes: cada una de 1.000 €, 1,20 € en MyInvestor.
    const r = computeBrokerCost(broker('myinvestor'), {
      initialCapital: 0,
      monthlyContribution: 3000,
      tradesPerMonth: 3,
      years: 1,
      instrumentType: 'etf',
    })
    expect(r.annualCost).toBeCloseTo(1.2 * 36, 2)
  })

  it('con plan de inversión, Trade Republic, XTB y Scalable no cobran; DEGIRO sí', () => {
    const p = { initialCapital: 0, monthlyContribution: 100, tradesPerMonth: 1, years: 1, instrumentType: 'etf' as const, usaPlanes: true }
    expect(computeBrokerCost(broker('trade-republic'), p).annualCost).toBe(0)
    expect(computeBrokerCost(broker('xtb'), p).annualCost).toBe(0)
    expect(computeBrokerCost(broker('scalable'), p).annualCost).toBe(0)
    // DEGIRO: 12 órdenes de su Selección Principal (1 €) + 2,50 € de conectividad.
    expect(computeBrokerCost(broker('degiro'), p).annualCost).toBe(14.5)
  })
})

describe('una sola fuente de comisiones', () => {
  it('cada ficha de bróker toma su comisión de comisiones-brokers.ts', () => {
    for (const f of FICHAS) expect(f.etfCommission, f.slug).toBe(COMISIONES[f.slug]?.etf)
  })

  it('la frase de los tres brókers no parte «0,12 %, mínimo 1 €» por la coma', () => {
    expect(TRES_BROKERS).toBe(
      'Trade Republic (1 € por operación; planes de inversión sin comisión), DEGIRO (1 € por operación en su Selección Principal, 3 € en el resto) y MyInvestor (0,12 % por operación, mínimo 1 €)'
    )
  })

  const RAIZ = path.resolve(__dirname, '..')
  const ficheros: string[] = []
  const recorrer = (d: string) => {
    for (const n of fs.readdirSync(d)) {
      const p = path.join(d, n)
      if (fs.statSync(p).isDirectory()) recorrer(p)
      else if (/\.(ts|tsx)$/.test(n) && !/\.test\./.test(n)) ficheros.push(p)
    }
  }
  recorrer(RAIZ)

  // comisiones-brokers.ts cuenta en su comentario la historia de estas cifras.
  // blog-articles.ts: se corrige en el commit siguiente (artículo por artículo) y se quita de aquí.
  const EXCLUIDOS = ['comisiones-brokers.ts', 'blog-articles.ts']
  const VIEJAS: [string, RegExp][] = [
    ['DEGIRO 0,50 € + 0,004 %', /0,50 ?€ ?\+ ?0,004/],
    ['DEGIRO mínimo 0,90 €', /mín(imo|\.) 0,90/],
    ['MyInvestor 0,20 € + 0,03 %', /0,20 ?€( fijos)? ?\+ ?0,03/],
    ['Trade Republic a 0 € por operación', /Trade Republic[^.|]{0,60}?\b0 ?€ (de comisión )?por (operación|orden)/],
    ['Openbank ~8 €', /~8 ?€/],
    ['ING 9-22 €', /9-22 ?€/],
    ['Renta 4 ~7-10 €', /~7-10 ?€/],
  ]

  it('ningún texto de la web vuelve a citar las tarifas viejas', () => {
    const fallos: string[] = []
    for (const p of ficheros) {
      if (EXCLUIDOS.some((e) => p.endsWith(e))) continue
      const lineas = fs.readFileSync(p, 'utf8').split('\n')
      lineas.forEach((l, i) => {
        for (const [nombre, re] of VIEJAS) {
          if (re.test(l)) fallos.push(`${path.relative(RAIZ, p)}:${i + 1}  ${nombre}`)
        }
      })
    }
    expect(fallos).toEqual([])
  })
})
