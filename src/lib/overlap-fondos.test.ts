import { describe, it, expect } from 'vitest'
import type { Position } from '@/types/portfolio'
import { computeOverlaps } from './overlap'
import { consecuenciaFiscal, tipoDePar } from './traspaso-fiscal'

/**
 * El test que habría cazado el agujero del 17-sep-2026.
 *
 * Ese día el analizador empezó a leer fondos indexados, pero `computeOverlaps` seguía
 * filtrando con `getEtfByTicker`, que para un fondo devuelve `null`. Resultado: los fondos
 * entraban en el reparto por región y en el TER, y **quedaban fuera del solapamiento**, que
 * es la función por la que existe la herramienta.
 *
 * Lo que lo hacía peligroso no es que fallara, es que **callaba**. `OverlapAnalysis` se
 * oculta cuando no hay pares, así que una cartera de dos fondos que replican el mismo índice
 * —solapamiento del 100 %— no mostraba ni un aviso ni un error: mostraba nada. Y de nada se
 * concluye que no hay problema.
 *
 * Los 243 tests de entonces pasaban. Ninguno metía un fondo en `computeOverlaps`.
 */

function pos(ticker: string, shares = 1000): Position {
  return {
    id: ticker,
    ticker,
    shares,
    avgPrice: 0,
    currency: 'EUR',
    addedAt: '2026-09-18T00:00:00.000Z',
  }
}

describe('el solapamiento ve los fondos indexados', () => {
  /**
   * ⚠️ ESTE TEST AFIRMABA ALGO FALSO HASTA EL 18-sep-2026, y conviene que quede escrito.
   *
   * La versión de ayer emparejaba IE00B03HCZ61 con IE00BYX5MX67 diciendo que «replican los
   * dos el MSCI World» y exigía un solapamiento del 100 %. Y pasaba. Pasaba porque el
   * catálogo tenía mal la ficha de IE00BYX5MX67: dice ser un MSCI World y es un S&P 500.
   *
   * O sea que el test no comprobaba la realidad, comprobaba que el código repitiera el mismo
   * error que los datos. Al corregir la ficha, el test falló — y ese fallo fue la
   * confirmación de que el error era real.
   *
   * Ahora usa dos fondos que SÍ comparten índice y que además son un caso más típico: dos
   * S&P 500 de gestoras distintas, Vanguard y Fidelity.
   */
  it('dos fondos que replican el MISMO índice se solapan al 100 %', () => {
    const pares = computeOverlaps([pos('IE0032126645'), pos('IE00BYX5MX67')])
    expect(pares.length, 'un par de fondos debe producir un par').toBe(1)
    expect(pares[0].overlapPct).toBeGreaterThan(0.99)
  })

  it('dos fondos de índices DISTINTOS no se solapan del todo, aunque los dos sean globales', () => {
    // Un MSCI World y un S&P 500 comparten mucho —Estados Unidos pesa ~70 % del MSCI World—
    // pero no son lo mismo, y decir 100 % ahí sería el error que este fichero vino a cazar.
    const [par] = computeOverlaps([pos('IE00B03HCZ61'), pos('IE0032126645')])
    expect(par.overlapPct).toBeGreaterThan(0.5)
    expect(par.overlapPct).toBeLessThan(0.95)
  })

  it('los identifica por su nombre, no por un ISIN que nadie reconoce', () => {
    const [par] = computeOverlaps([pos('IE0032126645'), pos('IE00BYX5MX67')])
    expect(par.etiquetaA).toMatch(/Vanguard U\.S\. 500|Fidelity S&P 500/)
    expect(par.etiquetaB).toMatch(/Vanguard U\.S\. 500|Fidelity S&P 500/)
    expect(par.etiquetaA).not.toBe(par.etiquetaB)
  })

  it('una cartera mixta de fondo y ETF también produce pares', () => {
    const pares = computeOverlaps([pos('IE00B03HCZ61'), pos('VWCE')])
    expect(pares.length).toBe(1)
    expect(pares[0].tipo).toBe('mixto')
    expect(pares[0].overlapPct).toBeGreaterThan(0.5)
  })

  it('un ETF sigue usando su ticker como etiqueta, que es como lo conoce su dueño', () => {
    const [par] = computeOverlaps([pos('VWCE'), pos('IWDA')])
    expect([par.etiquetaA, par.etiquetaB].sort()).toEqual(['IWDA', 'VWCE'])
    expect(par.tipo).toBe('ambos-etf')
  })

  it('un fondo que NO analizamos se queda fuera en vez de entrar con datos flojos', () => {
    // IE0007987690 es el Vanguard Eurozone: replica MSCI EMU y no hay ETF de ese índice.
    // Meterlo con la exposición de un MSCI Europe daría un número plausible y falso.
    const pares = computeOverlaps([pos('IE0007987690'), pos('VWCE')])
    expect(pares.length, 'no debe emparejarse un fondo sin exposición fiable').toBe(0)
  })

  it('las tres combinaciones se clasifican bien', () => {
    expect(tipoDePar(true, true)).toBe('ambos-fondos')
    expect(tipoDePar(false, false)).toBe('ambos-etf')
    expect(tipoDePar(true, false)).toBe('mixto')
    expect(tipoDePar(false, true)).toBe('mixto')
  })
})

describe('lo que se dice sobre deshacer el solapamiento', () => {
  it('solo el par de fondos admite diferimiento', () => {
    expect(consecuenciaFiscal('ambos-fondos').admiteDiferimiento).toBe(true)
    expect(consecuenciaFiscal('ambos-etf').admiteDiferimiento).toBe(false)
    expect(consecuenciaFiscal('mixto').admiteDiferimiento).toBe(false)
  })

  it('cita el artículo y su versión, porque una afirmación legal sin versión no dice nada', () => {
    for (const tipo of ['ambos-fondos', 'ambos-etf', 'mixto'] as const) {
      const c = consecuenciaFiscal(tipo)
      expect(c.detalle, `${tipo} debe citar el artículo`).toMatch(/94\.1\.a\)/)
      expect(c.detalle, `${tipo} debe fechar la versión`).toMatch(/1 de enero de 2022/)
    }
  })

  it('el caso de los fondos NO omite la condición de que el dinero no pase por el inversor', () => {
    // Es la mitad del hecho. «Entre fondos no tributa» a secas es falso si alguien vende,
    // cobra y vuelve a comprar: ahí sí tributa, y es un error que cuesta dinero de verdad.
    const c = consecuenciaFiscal('ambos-fondos')
    expect(c.detalle).toMatch(/no llegue a estar a disposición del inversor/)
    expect(c.detalle).toMatch(/traspaso tramitado entre entidades/)
  })

  it('el caso de los fondos dice que el impuesto se aplaza, no que desaparezca', () => {
    const c = consecuenciaFiscal('ambos-fondos')
    expect(c.detalle).toMatch(/no desaparece/)
    expect(c.detalle).toMatch(/conservan el valor y la fecha de adquisición/)
  })

  it('el caso de los ETF explica que la exclusión es del régimen, no una carencia nuestra', () => {
    const c = consecuenciaFiscal('ambos-etf')
    expect(c.detalle).toMatch(/excluye expresamente/)
    expect(c.detalle).toMatch(/cualquiera que sea el mercado regulado/)
  })

  it('ninguno le dice al lector qué hacer con su dinero', () => {
    // La línea de la CNMV: se describe el mecanismo, no se prescribe la acción.
    const prohibidas = [
      /\bdeber[íi]as\b/i,
      /\bte conviene\b/i,
      /\bte recomend/i,
      /\btraspasa\b/i,
      /\bvende\b/i,
      /\blo mejor (?:es|para ti)\b/i,
    ]
    for (const tipo of ['ambos-fondos', 'ambos-etf', 'mixto'] as const) {
      const c = consecuenciaFiscal(tipo)
      const texto = `${c.titular} ${c.detalle}`
      for (const patron of prohibidas) {
        expect(texto, `${tipo} contiene lenguaje prescriptivo: ${patron}`).not.toMatch(patron)
      }
    }
  })
})
