import { describe, it, expect } from 'vitest'
import { MODEL_PORTFOLIOS } from './model-portfolios'
import { getAllEtfs } from '@/lib/etf-database'

/**
 * El coste ponderado de cada cartera modelo sale de sus pesos y de los TER verificados
 * (30-sep-2026). Hasta ese día 8 de las 10 publicaban uno escrito a mano y siempre inflado
 * —0,20 % donde sale 0,13 %—, que es la cifra que más mira quien compara carteras.
 */
const FUERA_DEL_CATALOGO: Record<string, number> = {
  IBGS: 0.1, // BlackRock, IE00B14X4Q57
  IBGL: 0.15, // BlackRock, IE00B1FZS913
  IBGM: 0.15, // BlackRock, IE00B1FZS806
  CMOD: 0.19, // Invesco, IE00BD6FTQ80
}

describe('carteras modelo', () => {
  const ter = new Map<string, number>(getAllEtfs().map((e) => [e.ticker, e.ter]))
  for (const [t, v] of Object.entries(FUERA_DEL_CATALOGO)) ter.set(t, v)

  for (const p of MODEL_PORTFOLIOS) {
    it(`${p.slug}: los pesos suman 100 y el coste publicado es el calculado`, () => {
      const suma = p.allocation.reduce((s, a) => s + a.percent, 0)
      expect(suma).toBeCloseTo(100, 5)
      const faltan = p.allocation.filter((a) => !a.suggestedTicker || !ter.has(a.suggestedTicker)).map((a) => a.suggestedTicker ?? a.asset)
      expect(faltan, `sin TER verificado: ${faltan.join(', ')}`).toEqual([])
      const calculado = p.allocation.reduce((s, a) => s + (a.percent / 100) * (ter.get(a.suggestedTicker ?? '') ?? 0), 0)
      expect(p.weightedTer).toBe(`${calculado.toFixed(2).replace('.', ',')}%`)
    })
  }
})
