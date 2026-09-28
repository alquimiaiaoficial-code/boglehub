/**
 * Clases de participación de fondos que YA están en el catálogo.
 *
 * Por qué existe este fichero y no se meten como fondos normales (25-sep-2026).
 *
 * Una misma gestora vende el mismo fondo en varias clases: D, Inst, S, A2... El índice y la
 * cartera son idénticos; cambian la comisión y el mínimo de entrada. Si cada clase tuviera su
 * propia ficha en /fondo/, saldrían páginas casi iguales —mismo nombre, mismo índice, misma
 * descripción, otra cifra—, y eso es exactamente el contenido a escala por el que Google dejó
 * de indexar este sitio en agosto de 2026 (1.404 URLs generadas por combinatoria).
 *
 * Así que una clase:
 *   · NO tiene página propia;
 *   · SÍ la reconoce el analizador: si alguien pega su ISIN, se analiza con la exposición del
 *     fondo padre (es el mismo índice) y con la COMISIÓN DE LA CLASE, no la del padre;
 *   · SÍ aparece en la ficha del padre, en un cuadro con todas sus clases. Ese cuadro —mismo
 *     fondo, cuatro comisiones distintas— no lo publica nadie más en español.
 *
 * ⚠️ Reglas que no se saltan, todas aprendidas pagando:
 *   1. Cada dato sale de la ficha de la GESTORA, nunca de una lista ajena. `verified` lleva la
 *      URL y la cita. El test lo exige.
 *   2. `minimum` es el mínimo INICIAL, no el posterior. Hay dos campos en la ficha y se
 *      parecen; publicar el posterior fue un error real del 24-sep.
 *   3. Si la clase es institucional, se dice. El particular solo entra a través de una
 *      comercializadora que agrupe en cuenta ómnibus, y entonces el mínimo lo pone ella.
 */

export interface FundClass {
  isin: string
  /** Slug del fondo padre en `INDEX_FUNDS`. Mismo fondo legal, mismo índice. */
  parentSlug: string
  /** Nombre de la clase tal como lo publica la gestora: «Inst», «D», «S»... */
  className: string
  /** Gastos corrientes de ESTA clase, en %. */
  ter: number
  accumulating: boolean
  currency: string
  /** Mínimo de entrada INICIAL que publica la gestora, dicho en claro. */
  minimum: string
  /** Pensada para institucionales: el particular solo accede vía comercializadora. */
  institutional: boolean
  /** Fecha, URL de la ficha de la gestora y cita literal de los datos. */
  verified: string
}

const INST = (importe: string) =>
  `Clase institucional: BlackRock exige ${importe} de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus`

export const FUND_CLASSES: FundClass[] = [
  {
    isin: 'IE00B62WCL09',
    parentSlug: 'ishares-developed-world-index',
    className: 'Inst',
    ter: 0.15,
    accumulating: true,
    currency: 'EUR',
    minimum: INST('1.000.000 €'),
    institutional: true,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/228472): «iShares Developed World Index Fund (IE) | Inst | Índice de referencia: MSCI World Index Net (EUR) | Porcentaje de gastos: 0,15 por ciento | Inversión inicial mínima: EUR 1.000.000 | Acumulación»',
  },
  {
    isin: 'IE00B4K9F548',
    parentSlug: 'ishares-europe-index',
    className: 'Inst',
    ter: 0.15,
    accumulating: true,
    currency: 'EUR',
    minimum: INST('1.000.000 €'),
    institutional: true,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/228690): «iShares Europe Index Fund (IE) | Inst | Índice de referencia: MSCI Europe Index | Porcentaje de gastos: 0,15 por ciento | Inversión inicial mínima: EUR 1.000.000 | Acumulación»',
  },
  {
    isin: 'IE00B3D07F16',
    parentSlug: 'ishares-emerging-markets-index-clase-s',
    className: 'Inst',
    ter: 0.25,
    accumulating: true,
    currency: 'EUR',
    minimum: INST('1.000.000 €'),
    institutional: true,
    // El índice de esta clase no se pudo extraer limpio de su ficha (la primera ocurrencia
    // de «Índice de referencia» es un aviso legal). Es el MISMO fondo legal que la clase S,
    // cuyo índice sí está verificado: MSCI Emerging Markets. La comisión sí salió limpia.
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/228628): «iShares Emerging Markets Index Fund (IE) | Inst | Porcentaje de gastos: 0,25 por ciento | Inversión inicial mínima: EUR 1.000.000 | Acumulación». Índice: el del mismo fondo, verificado en su clase S (MSCI Emerging Markets, Net Returns EUR)',
  },
  {
    isin: 'IE0031080868',
    parentSlug: 'ishares-euro-government-bond-index',
    className: 'Inst',
    ter: 0.10,
    accumulating: true,
    currency: 'EUR',
    minimum: INST('250.000 €'),
    institutional: true,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/229063): «iShares Euro Government Bond Index Fund (IE) | Inst | Índice de referencia: FTSE EMU Government Bond Index (EUR) | Porcentaje de gastos: 0,10 por ciento | Inversión inicial mínima: EUR 250.000 | Acumulación»',
  },
  {
    isin: 'IE00B6RVWW34',
    parentSlug: 'ishares-japan-index',
    className: 'Inst',
    ter: 0.15,
    accumulating: true,
    currency: 'EUR',
    minimum: 'Clase institucional: BlackRock exige 1.000.000 € de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    institutional: true,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/228488): «Inst | Índice de referencia: MSCI Developed - Japan Net Total Return Index in EUR | Porcentaje de gastos: 0,15 por ciento | Inversión inicial mínima: EUR 1.000.000»',
  },
  {
    isin: 'IE00B56H2V49',
    parentSlug: 'ishares-pacific-index',
    className: 'Inst',
    ter: 0.15,
    accumulating: true,
    currency: 'EUR',
    minimum: 'Clase institucional: BlackRock exige 1.000.000 € de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    institutional: true,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/228486): «Inst | Índice de referencia: MSCI Developed Pacific Ex Japan in EUR Net TR Index | Porcentaje de gastos: 0,15 por ciento | Inversión inicial mínima: EUR 1.000.000»',
  },
  {
    isin: 'IE0004ZP1ND3',
    parentSlug: 'ishares-global-aggregate-1-5-year-bond-index',
    className: 'S Hedged',
    ter: 0.07,
    accumulating: true,
    currency: 'EUR',
    minimum: 'Clase institucional: BlackRock exige 200.000.000 € de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    institutional: true,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/345260): «Class S Hedged | Índice de referencia: BBG Global Aggregate 1-5 Year Index | Porcentaje de gastos: 0,07 por ciento | Inversión inicial mínima: EUR 200.000.000»',
  },
  {
    isin: 'LU1811363917',
    parentSlug: 'ishares-north-america-index',
    className: 'D2 (versión luxemburguesa)',
    ter: 0.15,
    accumulating: true,
    currency: 'EUR',
    minimum: 'BlackRock exige 100.000 $ de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    institutional: false,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/297054): «iShares North America Equity Index Fund (LU) | D2 | Índice de referencia: MSCI North America Net EUR | Porcentaje de gastos: 0,15 por ciento | Inversión inicial mínima: USD 100.000»',
  },
  {
    isin: 'LU2504564761',
    parentSlug: 'ishares-developed-world-index',
    className: 'A2 (versión luxemburguesa)',
    ter: 0.45,
    accumulating: true,
    currency: 'EUR',
    minimum: 'BlackRock exige 5.000 $ de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    institutional: false,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/329350): «iShares World Equity Index Fund (LU) | A2 | Índice de referencia: MSCI WORLD Net EUR | Porcentaje de gastos: 0,45 por ciento | Inversión inicial mínima: USD 5.000»',
  },
  {
    isin: 'LU0836514744',
    parentSlug: 'ishares-europe-index',
    className: 'D2 (versión luxemburguesa)',
    ter: 0.15,
    accumulating: true,
    currency: 'EUR',
    minimum: 'BlackRock exige 100.000 $ de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    institutional: false,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/246687): «iShares Europe Equity Index Fund (LU) | D2 | Índice de referencia: MSCI Europe Index | Porcentaje de gastos: 0,15 por ciento | Inversión inicial mínima: USD 100.000»',
  },
  {
    isin: 'LU0836512706',
    parentSlug: 'ishares-europe-index',
    className: 'A2 (versión luxemburguesa)',
    ter: 0.45,
    accumulating: true,
    currency: 'EUR',
    minimum: 'BlackRock exige 5.000 $ de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    institutional: false,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/243969): «iShares Europe Equity Index Fund (LU) | A2 | Índice de referencia: MSCI Europe Index | Porcentaje de gastos: 0,45 por ciento | Inversión inicial mínima: USD 5.000»',
  },
  {
    isin: 'LU0836513266',
    parentSlug: 'ishares-euro-government-bond-index',
    className: 'A2 (versión luxemburguesa)',
    ter: 0.45,
    accumulating: true,
    currency: 'EUR',
    minimum: 'BlackRock exige 5.000 $ de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    institutional: false,
    verified:
      '25-sep-2026, ficha de BlackRock (blackrock.com/es/profesionales/productos/243976): «iShares Euro Government Bond Index Fund (LU) | A2 | Índice de referencia: FTSE EMU Government Bond Index (EUR) | Porcentaje de gastos: 0,45 por ciento | Inversión inicial mínima: USD 5.000»',
  },
  // Lote del 28-sep-2026 (Vanguard y Amundi). Ninguna se marca institucional: ni Vanguard ni
  // Amundi lo dicen en la documentación leída, y el mínimo de Vanguard no distingue clases.
  {
    isin: 'IE00B03HD191',
    parentSlug: 'vanguard-global-stock',
    className: 'EUR Acc',
    ter: 0.18,
    accumulating: true,
    currency: 'EUR',
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    institutional: false,
    verified:
      '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9837/global-stock-index-fund-eur-acc): «Global Stock Index Fund - EUR Acc (VANGEIS) | Índice de referencia: MSCI World Index | Comisión: 0,18 %». Misma comisión que la clase Investor de la ficha',
  },
  {
    isin: 'IE0007987708',
    parentSlug: 'vanguard-eurozone-stock',
    className: 'EUR Acc',
    ter: 0.12,
    accumulating: true,
    currency: 'EUR',
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    institutional: false,
    verified:
      '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9922/european-stock-index-fund-eur-acc): «European Stock Index Fund - EUR Acc (VANEINI) | Índice de referencia: MSCI Europe Index | Comisión: 0,12 %»',
  },
  {
    isin: 'IE0031786696',
    parentSlug: 'vanguard-emerging-markets-stock',
    className: 'EUR Acc',
    ter: 0.23,
    accumulating: true,
    currency: 'EUR',
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    institutional: false,
    verified:
      '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9229/emerging-markets-stock-index-fund-eur-acc): «Emerging Markets Stock Index Fund - EUR Acc (VANEMEI) | Índice de referencia: MSCI Emerging Markets Index | Comisión: 0,23 %»',
  },
  {
    isin: 'IE0007472990',
    parentSlug: 'vanguard-euro-government-bond-index',
    className: 'EUR Acc',
    ter: 0.12,
    accumulating: true,
    currency: 'EUR',
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    institutional: false,
    verified:
      '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9971/euro-government-bond-index-fund-eur-acc): «Euro Government Bond Index Fund - EUR Acc (VANEUGB) | Índice de referencia: Bloomberg Euro Government Float Adjusted Bond Index | Comisión: 0,12 %»',
  },
  {
    isin: 'LU0996181599',
    parentSlug: 'amundi-index-msci-world',
    className: 'IE',
    ter: 0.20,
    accumulating: true,
    currency: 'EUR',
    minimum: 'No verificado: la documentación de Amundi que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    institutional: false,
    verified:
      '28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0996181599/SPA/ESP, publicado el 28/04/2026): «Amundi Index MSCI World IE | objetivo: replicar la rentabilidad del MSCI World Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,20 % del valor de su inversión al año»',
  },
  {
    isin: 'LU0996175948',
    parentSlug: 'amundi-index-msci-emerging-markets',
    className: 'IE',
    ter: 0.20,
    accumulating: true,
    currency: 'EUR',
    minimum: 'No verificado: la documentación de Amundi que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    institutional: false,
    verified:
      '28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0996175948/SPA/ESP, publicado el 28/04/2026): «Amundi Core MSCI Emerging Markets IE | objetivo: replicar la rentabilidad del MSCI Emerging Markets Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,20 % del valor de su inversión al año»',
  },
  {
    isin: 'LU0389811539',
    parentSlug: 'amundi-core-msci-europe',
    className: 'IE',
    ter: 0.15,
    accumulating: true,
    currency: 'EUR',
    minimum: 'No verificado: la documentación de Amundi que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    institutional: false,
    verified:
      '28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0389811539/SPA/ESP, publicado el 05/06/2026): «Amundi Core MSCI Europe IE | objetivo: replicar la rentabilidad del MSCI Europe Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,15 % del valor de su inversión al año»',
  },
  {
    isin: 'LU1050469870',
    parentSlug: 'amundi-core-euro-government-bond',
    className: 'IE',
    ter: 0.15,
    accumulating: true,
    currency: 'EUR',
    minimum: 'No verificado: la documentación de Amundi que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    institutional: false,
    verified:
      '28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU1050469870/SPA/ESP, publicado el 28/04/2026): «Amundi Core Euro Government Bond IE | objetivo: replicar la rentabilidad del Bloomberg Euro Treasury 50bn Bond Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,15 % del valor de su inversión al año»',
  },
  {
    isin: 'LU0389812693',
    parentSlug: 'amundi-core-global-government-bond',
    className: 'IHE',
    ter: 0.20,
    accumulating: true,
    currency: 'EUR',
    minimum: 'No verificado: la documentación de Amundi que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    institutional: false,
    verified:
      '28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0389812693/SPA/ESP, publicado el 28/04/2026): «Amundi Core Global Government Bond IHE | objetivo: replicar la rentabilidad del J.P. Morgan Government Bond Index Global (GBI Global) | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,20 % del valor de su inversión al año»',
  },
]

export function getFundClassByIsin(isin: string): FundClass | undefined {
  const clave = isin.trim().toUpperCase()
  return FUND_CLASSES.find((c) => c.isin === clave)
}

export function getClassesOfFund(parentSlug: string): FundClass[] {
  return FUND_CLASSES.filter((c) => c.parentSlug === parentSlug)
}
