import { describe, it, expect } from 'vitest'
import { getAllEtfs, otrasCotizaciones } from './etf-database'
import { esIsinValido } from './isin'

/**
 * Dos ETFs PUEDEN compartir ISIN: es el mismo fondo UCITS cotizado en dos bolsas. CSPX y SXR8
 * son iShares Core S&P 500; IWDA y EUNL son iShares Core MSCI World. El cargador de
 * `etf-database.ts` lo dice desde hace tiempo: «ISIN is therefore NOT a unique key».
 *
 * Lo que NO puede pasar es que dos productos DISTINTOS compartan ISIN. Y pasaba.
 *
 * El 19-sep-2026, listando los ISINs compartidos, salieron seis grupos imposibles:
 *
 *   IE00B3VTML14  iShares MSCI Europe Small Cap (renta variable)  +  Vanguard EUR Govt Bond
 *   IE00B3YLTY66  iShares MSCI EM (renta variable)  +  SPDR Euro Govt Bond
 *   IE00B3VVMM84  Vanguard FTSE EM  +  SPDR MSCI Europe Small Cap Value
 *   IE00B53SZB19  iShares Nasdaq 100  +  iShares MSCI World Quality Dividend ESG
 *   IE00BJ0KDQ92  Xtrackers MSCI World  +  Xtrackers MSCI World Value Factor
 *   IE00B5BMR087  el mismo fondo con DOS TER distintos (0,07 y 0,10)
 *
 * Verificado en fuente: en dos de esos grupos el ISIN no era de NINGUNO de los dos; alguien
 * copió identificadores entre fichas. Los siete ISINs equivocados se retiraron en vez de
 * adivinarse.
 *
 * POR QUÉ IMPORTA MÁS QUE UN DATO FLOJO. El ISIN se publica en la ficha del ETF, en
 * `schema.org`, en `llms-full.txt` y dentro de la instrucción «usa el buscador con el ISIN»
 * de las páginas de compra, junto a «verifica que el ISIN coincide exactamente para evitar
 * comprar un ETF equivocado». Un ISIN de otro producto ahí no es una errata: es la
 * instrucción de comprar otra cosa.
 *
 * Esto complementa a `isin.test.ts`, que comprueba el dígito de control. Aquel detecta lo
 * IMPOSIBLE; este detecta una parte de lo FALSO: un ISIN perfectamente válido colocado en la
 * ficha equivocada. Ninguno de los dos prueba que un ISIN único sea el correcto — eso sigue
 * necesitando fuente externa, y por eso esa misma noche se verificaron los 45 restantes y se
 * retiraron los 29 que no se pudieron confirmar. Hoy solo se publican 30, todos comprobados.
 */
describe('ISINs compartidos entre ETFs', () => {
  const porIsin = new Map<string, ReturnType<typeof getAllEtfs>>()
  for (const etf of getAllEtfs()) {
    if (!etf.isin) continue
    const grupo = porIsin.get(etf.isin) ?? []
    grupo.push(etf)
    porIsin.set(etf.isin, grupo)
  }
  const compartidos = [...porIsin.entries()].filter(([, g]) => g.length > 1)

  it('sigue habiendo cotizaciones dobles reconocidas', () => {
    // Si esto baja a cero, o se ha vaciado el catálogo o alguien ha «arreglado» las
    // duplicidades legítimas, que no son un error.
    expect(compartidos.length).toBeGreaterThan(0)
  })

  it('un ISIN compartido implica la MISMA clase de activo', () => {
    const malos = compartidos
      .filter(([, g]) => new Set(g.map((e) => e.assetClass)).size > 1)
      .map(([isin, g]) => `${isin}: ${g.map((e) => `${e.ticker}(${e.assetClass})`).join(' + ')}`)
    expect(malos, `mismo ISIN, distinta clase de activo: ${malos.join(' | ')}`).toEqual([])
  })

  it('un ISIN compartido implica el MISMO TER', () => {
    // El TER es del fondo, no de la cotización. Dos cifras distintas significan que una
    // de las dos fichas está mal, aunque las dos describan el mismo producto.
    const malos = compartidos
      .filter(([, g]) => new Set(g.map((e) => e.ter)).size > 1)
      .map(([isin, g]) => `${isin}: ${g.map((e) => `${e.ticker} ${e.ter}%`).join(' vs ')}`)
    expect(malos, `mismo ISIN, distinto TER: ${malos.join(' | ')}`).toEqual([])
  })

  it('un ISIN compartido implica la misma política de reparto', () => {
    const malos = compartidos
      .filter(([, g]) => new Set(g.map((e) => e.accumulating)).size > 1)
      .map(([isin, g]) => `${isin}: ${g.map((e) => `${e.ticker} ${e.accumulating ? 'acc' : 'dist'}`).join(' vs ')}`)
    expect(malos, `mismo ISIN, distinto reparto: ${malos.join(' | ')}`).toEqual([])
  })

  it('todo ISIN que se publique sigue siendo aritméticamente posible', () => {
    const malos = getAllEtfs()
      .filter((e) => e.isin && !esIsinValido(e.isin))
      .map((e) => `${e.ticker} -> ${e.isin}`)
    expect(malos).toEqual([])
  })

  /**
   * El catálogo pasó de 66 ETFs a 55, y ahora TODOS llevan ISIN verificado en fuente.
   *
   * La historia, por si vuelve a pasar: la noche del 19-sep-2026 se verificaron 45 ISINs
   * con búsquedas POR LOTES y se retiraron 29. Ese método daba falsos positivos —VUKE,
   * WSML e IQQH tenían el ISIN correcto—. Rehecha la verificación PRODUCTO A PRODUCTO
   * («nombre + ticker + ISIN»), aparecieron dos grupos distintos:
   *
   *  · 11 fichas donde el ticker era real y su producto relevante, con un gemelo en el
   *    catálogo del que copiar los repartos verificados: mismo fondo en otra bolsa
   *    (EMIM=EIMI, EUNA=AGGH, XDWL=XDWD, VETY=VGEA; SMEA=IMEU también estaba aquí y era
   *    falso: comparten fondo pero no clase, ver el test de IMEU más abajo) o mismo índice (ZPRS e
   *    IUSN sobre el MSCI World Small Cap, LCUW e IWDA sobre el MSCI World). Arregladas.
   *
   *  · 11 fichas sin gemelo del que copiar. `IMID` decía «iShares MSCI World Mid Cap» y es
   *    el SPDR MSCI ACWI IMI; `EXSG` decía «DivDAX» y es el EURO STOXX Select Dividend 30;
   *    `XGIG` decía «EUR Corporate Bond» y es un inflación-ligada con cobertura en LIBRAS.
   *    Poner sus repartos a ojo habría sido inventar el dato que sostiene el analizador.
   *    Retiradas. Sumaban UNA impresión en Bing en 28 días.
   *
   * La regla que queda: **una ficha de producto no se publica sin identidad comprobada**,
   * y los repartos se copian de un gemelo verificado o no se ponen.
   */
  it('todas las fichas publican un ISIN verificado en fuente', () => {
    const sinIsin = getAllEtfs().filter((e) => !e.isin).map((e) => e.ticker)
    expect(sinIsin, `fichas sin ISIN: ${sinIsin.join(', ')}`).toEqual([])
    expect(getAllEtfs().length).toBe(52)
  })

  it('los ISINs que sí están verificados siguen puestos', () => {
    // Una muestra de los que más se ven: si desaparecen, algo los ha barrido de más.
    const porTicker = new Map(getAllEtfs().map((e) => [e.ticker, e.isin]))
    expect(porTicker.get('VWCE')).toBe('IE00BK5BQT80')
    expect(porTicker.get('CSPX')).toBe('IE00B5BMR087')
    expect(porTicker.get('IWDA')).toBe('IE00B4L5Y983')
    expect(porTicker.get('VUAA')).toBe('IE00BFMXXD54')
    expect(porTicker.get('EQQQ')).toBe('IE0032077012')
  })

  /**
   * Esta comprobación decía lo contrario hace unas horas, y estaba mal.
   *
   * Al ver `IE00BF4RFH31` compartido entre WSML e IUSN supuse que WSML era el SPDR MSCI
   * World Small Cap, que es otro producto. **No lo es**: WSML es el ticker de LSE del
   * iShares, el mismo fondo que IUSN cotiza en Xetra. El SPDR tiene sus propios tickers
   * (ZPRS, WDSD). Comprobado producto a producto.
   *
   * Vale como recordatorio de que «dos tickers comparten ISIN» es normal, y que el reflejo
   * de sospechar tiene que terminar en una comprobación, no en una conclusión.
   */
  it('WSML e IUSN son el mismo fondo en dos bolsas, y eso es correcto', () => {
    const porTicker = new Map(getAllEtfs().map((e) => [e.ticker, e.isin]))
    expect(porTicker.get('IUSN')).toBe('IE00BF4RFH31')
    expect(porTicker.get('WSML')).toBe('IE00BF4RFH31')
  })

  /**
   * El helper que alimenta la línea «es el mismo fondo que X» de la ficha.
   *
   * Existe porque la gente lo pregunta: «cuál es el etf de irlanda de vuaa», «diferencia
   * entre fondos eunl iwda», «qué diferencia puntual hay entre el etf sgln y el igln». El
   * dato estaba en el catálogo desde siempre y no se enseñaba.
   */
  it('otrasCotizaciones encuentra los hermanos y nunca se devuelve a sí mismo', () => {
    expect(otrasCotizaciones('CSPX').map((e) => e.ticker)).toEqual(['SXR8'])
    expect(otrasCotizaciones('IWDA').map((e) => e.ticker)).toEqual(['EUNL'])
    // EIMI tiene DOS hermanos, así que la frase de la ficha tiene que saber enumerar.
    expect(otrasCotizaciones('EIMI').map((e) => e.ticker).sort()).toEqual(['EMIM', 'IS3N'])
    // Un ETF sin hermanos no debe inventarse ninguno.
    expect(otrasCotizaciones('EQQQ')).toEqual([])
    // Y jamás incluirse a sí mismo, que es el fallo fácil de este tipo de función.
    for (const etf of getAllEtfs()) {
      expect(otrasCotizaciones(etf.ticker).map((e) => e.ticker)).not.toContain(etf.ticker)
    }
  })
})

/**
 * Política de reparto comprobada en la gestora el 29-sep-2026, clase a clase.
 *
 * El 19-sep se dio por hecho que IMEU y SMEA eran «el mismo fondo en otra bolsa» y se le
 * copió a IMEU el ISIN y la acumulación de SMEA. Son el mismo fondo, pero no la misma
 * clase: una reparte y la otra acumula, y para un residente en España eso cambia cuándo se
 * paga el IRPF. En la ficha salía «de acumulación» y grado fiscal A.
 *
 * - IMEU: BlackRock España, ficha 251860: «ISIN IE00B1YZSC51 · Uso de los ingresos
 *   Distribución · Frecuencia de Distribución Trimestral · Comisión de gestión (TER) 0,12%
 *   · Benchmark Index MSCI Europe Index». La de acumulación (IE00B4K48X80) es SMEA, ficha
 *   251861.
 * - VGOV: Vanguard España, ficha 9501: «U.K. Gilt UCITS ETF (GBP) Distributing · ISIN:
 *   IE00B42WWV65 · Frecuencia de distribución Mensual». Lo publicábamos como «(Acc)».
 *
 * Todos los demás iShares del catálogo se cruzaron con el buscador de BlackRock ese día y
 * cuadran, salvo el oro físico (ver PENDIENTES: un ETC no reparte ni acumula dividendos).
 */
describe('política de reparto verificada en la gestora', () => {
  const porTicker = new Map(getAllEtfs().map((e) => [e.ticker, e]))

  it('IMEU es la clase de distribución, con su propio ISIN', () => {
    const imeu = porTicker.get('IMEU')!
    expect(imeu.isin).toBe('IE00B1YZSC51')
    expect(imeu.accumulating).toBe(false)
    expect(porTicker.get('SMEA')!.isin).toBe('IE00B4K48X80')
    expect(porTicker.get('SMEA')!.accumulating).toBe(true)
  })

  it('VGOV reparte', () => {
    expect(porTicker.get('VGOV')!.accumulating).toBe(false)
    expect(porTicker.get('VGOV')!.name).toMatch(/Distributing/)
  })
})

/**
 * SPXS → SPYL (29-sep-2026). La ficha decía «SPDR S&P 500 UCITS ETF (Acc)» con el ISIN
 * IE00B6YX5C33, que según State Street es la clase de DISTRIBUCIÓN (SPY5), y un ticker que
 * State Street no usa. Y en /datos-clave y en la API de tablas llevaba el ISIN del SPDR MSCI
 * World. Factsheet de State Street (factsheet-emea-en_gb-spyl-gy.pdf): «ISIN IE000XZSV718 ·
 * Index Name S&P 500 Index · TER 0.03% · Income Treatment Accumulation · Domicile Ireland».
 */
describe('SPDR S&P 500 (Acc)', () => {
  it('se publica como SPYL, con el ISIN de la clase de acumulación', () => {
    const e = getAllEtfs().find((x) => x.ticker === 'SPYL')!
    expect(e.isin).toBe('IE000XZSV718')
    expect(e.accumulating).toBe(true)
    expect(e.ter).toBe(0.03)
    expect(getAllEtfs().some((x) => x.ticker === 'SPXS')).toBe(false)
  })
})

/**
 * El oro (29-sep-2026). Los tres ETC del catálogo salían «de distribución (reparte
 * dividendos)», con un grado fiscal que hablaba de dividendos cobrados cada año. El oro no
 * paga dividendos. BlackRock da el iShares Physical Gold (IE00B4ND3602) como «Acumulativo»,
 * que en un ETC solo quiere decir que no reparte nada. La ficha ya no dice ni una cosa ni la
 * otra: dice que no reparte, y el grado fiscal lleva su propia explicación.
 */
describe('ETC de oro', () => {
  it('no se presentan como productos de distribución', async () => {
    const { computeFiscalGradeEtf, politicaDeReparto } = await import('./fiscal')
    for (const t of ['SGLN', 'IGLN']) {
      const e = getAllEtfs().find((x) => x.ticker === t)!
      expect(e.assetClass).toBe('COMMODITY')
      expect(e.name).not.toMatch(/\(Dist\)/)
      expect(politicaDeReparto(e).largo).toBe('No reparte (ETC)')
      const f = computeFiscalGradeEtf(e)
      expect(f.reason).not.toMatch(/dividendos te llegan|reinvierten/)
      expect(f.reason).toMatch(/base del ahorro/)
    }
  })

  it('un ETF normal sigue con su explicación de siempre', async () => {
    const { computeFiscalGradeEtf, computeFiscalGrade } = await import('./fiscal')
    const vwce = getAllEtfs().find((x) => x.ticker === 'VWCE')!
    expect(computeFiscalGradeEtf(vwce)).toEqual(computeFiscalGrade(vwce.isin, vwce.accumulating))
  })
})
