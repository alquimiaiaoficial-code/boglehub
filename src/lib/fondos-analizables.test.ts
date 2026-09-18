import { describe, it, expect } from 'vitest'
import { INDEX_FUNDS } from '@/data/index-funds'
import { getEtfByTicker } from './etf-database'
import {
  resolverFondo,
  fondosAnalizables,
  isinsClasificados,
  tickersDeExposicion,
  VERIFICADOS_EN_FUENTE,
  type FondoNoAnalizable,
} from './fondos-analizables'

/**
 * El test que justifica este fichero por sí solo.
 *
 * Al escribir las tablas de `fondos-analizables.ts` el 17-sep-2026, OCHO de los doce ISINs
 * se pusieron de memoria y no existían en el catálogo. TypeScript compilaba: son claves de
 * un `Record<string, …>` y cualquier cadena vale. El resultado habría sido que ningún fondo
 * se analizara nunca, sin un solo error en consola.
 *
 * Un ISIN mal escrito es indistinguible a ojo de uno bien escrito. Por eso esto es un test
 * y no una revisión.
 */
describe('las tablas apuntan a fondos que existen de verdad', () => {
  const isinsReales = new Set(INDEX_FUNDS.map((f) => f.isin.toUpperCase()))

  it('todo ISIN con equivalencia corresponde a un fondo del catálogo', () => {
    const inventados = isinsClasificados().conEquivalencia.filter((i) => !isinsReales.has(i))
    expect(inventados).toEqual([])
  })

  it('todo ISIN marcado como no analizable corresponde a un fondo del catálogo', () => {
    const inventados = isinsClasificados().sinEquivalencia.filter((i) => !isinsReales.has(i))
    expect(inventados).toEqual([])
  })

  it('ningún fondo está en las dos tablas a la vez', () => {
    const { conEquivalencia, sinEquivalencia } = isinsClasificados()
    const duplicados = conEquivalencia.filter((i) => sinEquivalencia.includes(i))
    expect(duplicados).toEqual([])
  })

  /**
   * Antes miraba las dos tablas y exigía que todo fondo estuviera en una. Desde el
   * 18-sep-2026 hay una tercera vía —el motivo genérico «pendiente de verificar»— y con la
   * versión anterior el test fallaba con el código correcto.
   *
   * Se cambia por lo que de verdad importa: que NINGÚN fondo del catálogo deje a
   * `resolverFondo` sin respuesta. Comprueba el comportamiento, no cómo está organizado por
   * dentro, y así sigue valiendo cuando la organización cambie otra vez.
   */
  it('ningún fondo del catálogo se queda sin respuesta: o se analiza, o dice por qué no', () => {
    const enElLimbo: string[] = []
    for (const f of INDEX_FUNDS) {
      const r = resolverFondo(f.isin)
      if (r == null) {
        enElLimbo.push(`${f.name}: resolverFondo devuelve null para un fondo del catálogo`)
        continue
      }
      if ('noAnalizable' in r && r.noAnalizable.motivo.trim().length < 40) {
        enElLimbo.push(`${f.name}: el motivo es demasiado corto para explicar nada`)
      }
    }
    expect(enElLimbo).toEqual([])
  })

  it('los que no se analizan lo dicen con un motivo que una persona entiende', () => {
    // El predicado usa el tipo real exportado en vez de uno inventado a mano: escribir una
    // forma aproximada del tipo aqui dejo de compilar en cuanto `IndexFund` crecio.
    const fuera = INDEX_FUNDS.map((f) => resolverFondo(f.isin)).filter(
      (r): r is { noAnalizable: FondoNoAnalizable } => r != null && 'noAnalizable' in r,
    )
    // Hoy son ocho de doce, y es deliberado: solo se analiza lo verificado en fuente.
    expect(fuera.length).toBeGreaterThan(0)
    for (const r of fuera) {
      // Ni códigos, ni «no disponible», ni promesas de futuro sin explicación.
      expect(r.noAnalizable.motivo).not.toMatch(/^(error|no disponible|n\/a)/i)
      expect(r.noAnalizable.motivo).toMatch(/[.。]$/)
    }
  })

  it('los ETFs de los que se toma prestada la exposición están en el catálogo y tienen reparto', () => {
    for (const ticker of tickersDeExposicion()) {
      const etf = getEtfByTicker(ticker)
      expect(etf, `${ticker} debería estar en el catálogo de ETFs`).toBeTruthy()
      // Sin reparto por región el fondo se analizaría a cero sin avisar, que es peor que
      // no analizarlo: un cero parece un dato.
      const suma = Object.values(etf!.regionAllocation).reduce((a, b) => a + b, 0)
      expect(suma, `${ticker} debería repartir ~100 % por región`).toBeGreaterThan(0.9)
    }
  })
})

/**
 * El test que faltaba, y el que habría evitado el peor fallo de estos dos días.
 *
 * Todos los tests anteriores comprobaban que los ISINs EXISTIERAN en nuestro catálogo y que
 * las tablas fueran coherentes entre sí. Ninguno comprobaba que los DATOS del catálogo
 * fuesen ciertos, porque el catálogo era la única fuente. Verificar la coherencia interna de
 * una fuente no dice nada sobre la fuente.
 *
 * Esto no puede salir a internet a comprobarlo, así que hace lo único que un test puede
 * hacer: **obligar a que alguien lo haya comprobado y haya escrito dónde.**
 */
describe('nada se analiza sin haber comprobado sus datos fuera de casa', () => {
  it('todo fondo analizable tiene declarada su verificación en fuente', () => {
    const sinVerificar = isinsClasificados().conEquivalencia.filter(
      (isin) => !VERIFICADOS_EN_FUENTE[isin],
    )
    expect(
      sinVerificar,
      'añadir un fondo al análisis exige declarar en VERIFICADOS_EN_FUENTE de dónde salió el dato',
    ).toEqual([])
  })

  it('cada verificación dice la fecha y la fuente, no solo «comprobado»', () => {
    for (const [isin, nota] of Object.entries(VERIFICADOS_EN_FUENTE)) {
      // Un sello sin fecha no dice nada: es justo el problema que tenía el catálogo.
      expect(nota, `${isin} debe fechar la comprobación`).toMatch(/\d{1,2}-[a-z]{3}-\d{4}/)
      expect(nota.length, `${isin} debe decir qué fuente y qué decía`).toBeGreaterThan(50)
    }
  })

  it('no hay verificaciones de fondos que ya no se analizan', () => {
    // Si un fondo sale de EQUIVALENCIAS, su verificación sobra aquí: dejarla sugiere que
    // está comprobado y en uso cuando no lo está.
    const conEq = new Set(isinsClasificados().conEquivalencia)
    const huerfanas = Object.keys(VERIFICADOS_EN_FUENTE).filter((i) => !conEq.has(i))
    expect(huerfanas).toEqual([])
  })
})

describe('resolverFondo', () => {
  it('encuentra un fondo por su ISIN', () => {
    const r = resolverFondo('IE00B03HCZ61')
    expect(r).not.toBeNull()
    expect(r && 'analizable' in r).toBe(true)
    if (r && 'analizable' in r) {
      expect(r.analizable.fondo.name).toContain('Vanguard Global Stock')
      expect(r.analizable.etfExposicion.ticker).toBe('IWDA')
      expect(r.analizable.calidad).toBe('exacta')
    }
  })

  it('encuentra el mismo fondo por su slug', () => {
    const porIsin = resolverFondo('IE00B03HCZ61')
    const porSlug = resolverFondo('vanguard-global-stock')
    expect(porSlug).not.toBeNull()
    if (porIsin && 'analizable' in porIsin && porSlug && 'analizable' in porSlug) {
      expect(porSlug.analizable.fondo.isin).toBe(porIsin.analizable.fondo.isin)
    }
  })

  it('tolera minúsculas, espacios y guiones en el ISIN', () => {
    for (const entrada of [' ie00b03hcz61 ', 'IE00-B03H-CZ61', 'ie00b03hcz61']) {
      const r = resolverFondo(entrada)
      expect(r && 'analizable' in r, `debería reconocer «${entrada}»`).toBe(true)
    }
  })

  it('devuelve null para lo que no es un fondo, para que lo resuelva el catálogo de ETFs', () => {
    expect(resolverFondo('VWCE')).toBeNull()
    expect(resolverFondo('IWDA')).toBeNull()
    expect(resolverFondo('')).toBeNull()
    expect(resolverFondo('LU0000000000')).toBeNull()
  })

  /**
   * Este test exigia que el Vanguard «Eurozone» NO se analizara, con el motivo «replica el
   * MSCI EMU y no hay ETF de ese indice». Verificado el 18-sep: el fondo se llama «European»,
   * replica MSCI Europe y tenemos tres ETFs de ese indice. El motivo salia de nuestro propio
   * dato equivocado, y el test lo daba por bueno porque leia la misma fuente que el codigo.
   */
  it('analiza el Vanguard European con IMEU, porque replica MSCI Europe y no MSCI EMU', () => {
    const r = resolverFondo('IE0007987690')
    expect(r && 'analizable' in r).toBe(true)
    if (r && 'analizable' in r) {
      expect(r.analizable.etfExposicion.ticker).toBe('IMEU')
      expect(r.analizable.fondo.index).toBe('MSCI Europe')
      expect(r.analizable.fondo.ter).toBe(0.12)
    }
  })

  /**
   * Este test decía lo contrario hasta el 18-sep-2026: exigía que el Vanguard Emerging
   * Markets NO se analizara, porque yo sospechaba que replicaba un índice FTSE.
   *
   * El factsheet de Vanguard del 31-ago-2026 dice «MSCI Emerging Markets Index […] large and
   * mid-sized company stocks». La sospecha era razonable —Vanguard usa FTSE en sus ETFs de
   * emergentes, y el `etfEquivalent` del catálogo apuntaba a VFEM, que es FTSE— y era falsa.
   *
   * Se deja el caso con la aserción invertida en vez de borrarlo, para que si alguien vuelve
   * a moverlo tenga delante por qué está donde está.
   */
  it('el Fidelity IE00BYX5MX67 se mapea a CSPX, porque es un S&P 500 y no un MSCI World', () => {
    // El fallo del 18-sep: la ficha decía MSCI World y mapeaba a IWDA. Si alguien vuelve a
    // cambiarlo, este test dice por qué está donde está.
    const r = resolverFondo('IE00BYX5MX67')
    expect(r && 'analizable' in r).toBe(true)
    if (r && 'analizable' in r) {
      expect(r.analizable.etfExposicion.ticker).toBe('CSPX')
      expect(r.analizable.fondo.index).toBe('S&P 500')
      expect(r.analizable.fondo.ter).toBe(0.06)
    }
  })

  it('analiza el Vanguard Emerging Markets con AEEM, porque replica MSCI EM y no FTSE', () => {
    const r = resolverFondo('IE0031786142')
    expect(r && 'analizable' in r).toBe(true)
    if (r && 'analizable' in r) {
      expect(r.analizable.etfExposicion.ticker).toBe('AEEM')
      expect(r.analizable.calidad).toBe('exacta')
      expect(r.analizable.fondo.index).toMatch(/MSCI Emerging Markets/)
    }
  })
})

describe('honestidad de lo que se muestra', () => {
  it('toda equivalencia aproximada lleva nota explicando en qué se aproxima', () => {
    const sinNota = fondosAnalizables()
      .filter((f) => f.calidad === 'aproximada' && !f.nota)
      .map((f) => f.fondo.name)
    expect(sinNota).toEqual([])
  })

  it('una equivalencia exacta no necesita nota, porque no hay nada que matizar', () => {
    const exactas = fondosAnalizables().filter((f) => f.calidad === 'exacta')
    expect(exactas.length).toBeGreaterThan(0)
    for (const f of exactas) expect(f.nota).toBeUndefined()
  })

  it('el TER que se usa es el del fondo, nunca el del ETF del que se copia la exposición', () => {
    // Es la trampa más fácil de este diseño y la que más dinero cuesta al usuario.
    // Vanguard Global Stock cuesta 0,18 % y IWDA 0,20 %: si se colara el del ETF, el
    // analizador diría que la cartera es más cara de lo que es.
    const r = resolverFondo('IE00B03HCZ61')
    if (r && 'analizable' in r) {
      expect(r.analizable.fondo.ter).not.toBe(r.analizable.etfExposicion.ter)
      expect(r.analizable.fondo.ter).toBe(0.18)
    }
  })
})

describe('cobertura', () => {
  it('hoy se puede analizar la mayoría de los fondos publicados', () => {
    const analizables = fondosAnalizables()
    // CUATRO de doce, y BAJÓ a propósito de once el 18-sep-2026.
    //
    // Ese día, al ir a ampliar el catálogo, aparecieron tres fichas con datos erróneos: una
    // de ellas (IE00BYX5MX67) figuraba como «Fidelity MSCI World, TER 0,12 %» y es un
    // «FIDELITY S&P 500 INDEX FUND, TER 0,06 %». El analizador le estuvo dando en producción
    // exposición MSCI World a un fondo 100 % estadounidense.
    //
    // La política se invirtió: un fondo NO se analiza hasta que sus datos están comprobados
    // en una fuente externa, en vez de analizarse mientras nadie demuestre que están mal.
    // Cuatro fondos correctos valen más que once con exposiciones plausibles y falsas.
    // Subio de 4 a 6 el mismo 18-sep, al verificar dos mas: el Vanguard European (que estaba
    // excluido por un motivo que partia de nuestro propio dato erroneo) y el Global Bond.
    expect(analizables.length).toBe(6)
    expect(analizables.length).toBeLessThan(INDEX_FUNDS.length)
  })
})
