import { describe, it, expect } from 'vitest'
import { getAllEtfs } from './etf-database'

/**
 * Otra comprobación que es pura aritmética y no se estaba haciendo.
 *
 * El 18-sep-2026, buscar ISINs imposibles con su dígito de control encontró siete errores que
 * llevaban meses publicados. La lección no era sobre ISINs: era que verificábamos contra
 * fuentes externas —lento, caro— y no hacíamos las comprobaciones que no requieren salir de
 * casa. Un reparto por regiones o por sectores tiene que sumar 100 %. Si no suma, hay un dato
 * mal, y eso se sabe sin consultar a nadie.
 *
 * Los repartos por región salen todos correctos. Los sectoriales, seis: los seis ETFs del
 * S&P 500, que comparten una misma tabla copiada y suman 103 %.
 *
 * NO se corrigen inventando el 3 % que sobra. Un reparto sectorial sale de la cartera real del
 * fondo y hay que sacarlo de su factsheet; repartir el exceso «a ojo» sería exactamente el
 * error que este proyecto lleva dos días desmontando: un número plausible y falso. Así que se
 * dejan listados aquí con su valor de hoy, para que se vean y para que no empeoren.
 */
const CONOCIDOS_QUE_NO_SUMAN: Record<string, number> = {
  // Los seis del S&P 500 comparten tabla. Pendiente de sacar el reparto real del factsheet.
  CSPX: 1.03,
  SXR8: 1.03,
  VUSA: 1.03,
  IUSA: 1.03,
  VUAA: 1.03,
  SPXS: 1.03,
}

const TOLERANCIA = 0.01

function suma(reparto: Record<string, number> | undefined): number | null {
  if (!reparto) return null
  return Object.values(reparto).reduce((a, b) => a + b, 0)
}

describe('los repartos suman el 100 %', () => {
  it('por región, todos', () => {
    const malos = getAllEtfs()
      .map(etf => ({ t: etf.ticker, s: suma(etf.regionAllocation as Record<string, number>) }))
      .filter(x => x.s !== null && Math.abs(x.s - 1) > TOLERANCIA)
      .map(x => `${x.t} suma ${x.s!.toFixed(3)}`)
    expect(malos, `repartos por región que no cuadran: ${malos.join(', ')}`).toEqual([])
  })

  it('por sector, salvo los seis que ya están medidos', () => {
    const malos = getAllEtfs()
      .map(etf => ({ t: etf.ticker, s: suma(etf.sectorAllocation as Record<string, number>) }))
      .filter(x => x.s !== null && Math.abs(x.s - 1) > TOLERANCIA)
      .filter(x => {
        const conocido = CONOCIDOS_QUE_NO_SUMAN[x.t]
        // Uno conocido solo se perdona si sigue exactamente como estaba: si empeora, salta.
        return conocido === undefined || Math.abs(x.s! - conocido) > 0.0001
      })
      .map(x => `${x.t} suma ${x.s!.toFixed(3)}`)
    expect(malos, `repartos por sector nuevos o empeorados: ${malos.join(', ')}`).toEqual([])
  })

  it('la lista de conocidos no se queda con nombres que ya no existen', () => {
    // Si alguien arregla uno y no lo borra de arriba, la excepción quedaría tapando nada y
    // el día que ese ticker vuelva a descuadrar, nadie se enteraría.
    const tickers = new Set(getAllEtfs().map(e => e.ticker))
    const fantasmas = Object.keys(CONOCIDOS_QUE_NO_SUMAN).filter(t => !tickers.has(t))
    expect(fantasmas, `tickers que ya no están en el catálogo: ${fantasmas.join(', ')}`).toEqual([])

    const yaArreglados = Object.keys(CONOCIDOS_QUE_NO_SUMAN).filter(t => {
      const etf = getAllEtfs().find(e => e.ticker === t)
      const s = suma(etf?.sectorAllocation as Record<string, number>)
      return s !== null && Math.abs(s - 1) <= TOLERANCIA
    })
    expect(yaArreglados, `ya cuadran, quítalos de la lista: ${yaArreglados.join(', ')}`).toEqual([])
  })
})
