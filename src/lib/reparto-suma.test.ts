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
 * Cuando se escribió, seis ETFs del S&P 500 compartían una tabla copiada que sumaba 103 %.
 * Se dejaron listados como excepción, a la vista, en vez de repartir el 3 % que sobraba: un
 * número plausible inventado es peor que un número que no cuadra, porque el segundo se nota.
 *
 * El 19-sep se arreglaron de verdad, buscando los pesos reales del índice. La lista de
 * excepciones está vacía y la comprobación sigue puesta.
 */
/**
 * Vacía desde el 19-sep-2026, y conviene que siga así.
 *
 * Tenía los seis ETFs del S&P 500, que compartían una tabla sectorial copiada sumando
 * 103 %. No se arreglaron repartiendo el 3 % que sobraba —eso habría sido inventar el dato
 * que alimenta el analizador— sino buscando los pesos GICS reales del índice.
 *
 * Los que hay ahora son los del **cierre del 18-sep-2026**: Tecnología 38,9 %, Financieras
 * 11,9 %, Comunicación 9,8 %, Salud 9,1 %, Consumo discrecional 8,9 %, Industrial 8,1 %,
 * Consumo básico 4,4 %, Energía 3,5 %, Utilities 2,0 %, Materiales 1,7 % e Inmobiliario
 * 1,6 %. Suman 99,9 % por redondeo.
 *
 * ⚠️ **Son una foto, no una constante.** Los pesos sectoriales se mueven: Tecnología pasó
 * del 20 % a casi el 39 % en unos años. Si alguien los revisa dentro de seis meses y no
 * cuadran con el índice, no es un error de este fichero: es que caducaron. Lo que no puede
 * pasar es que vuelvan a sumar 103 %.
 */
const CONOCIDOS_QUE_NO_SUMAN: Record<string, number> = {}

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
