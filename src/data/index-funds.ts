/**
 * Fondos indexados disponibles para el inversor particular en España
 * (principalmente vía MyInvestor). A diferencia de los ETFs, los fondos
 * permiten traspaso fiscal libre entre ellos — la mayor ventaja fiscal
 * del régimen español de fondos.
 *
 * Generan páginas /fondo/[slug] de altísima intención de búsqueda:
 * "Amundi Prime Global", "Vanguard Global Stock", "Fidelity MSCI World"...
 */

export interface IndexFundFaq {
  q: string
  a: string
}

export interface IndexFund {
  slug: string
  name: string
  /** Marca corta para mostrar */
  manager: string
  isin: string
  /** Índice replicado */
  index: string
  /** TER anual % */
  ter: number
  /** Clase de activo */
  assetClass: 'Renta variable' | 'Renta fija' | 'Mixto'
  /** Región principal */
  region: string
  /** Acumulación o distribución */
  accumulating: boolean
  /** Divisa */
  currency: string
  /** Disponible en (plataformas) */
  availableAt: string[]
  /** Mínimo de inversión */
  minimum: string
  /** Tagline */
  tagline: string
  /** Descripción larga indexable */
  description: string
  /** ETF equivalente para comparar */
  etfEquivalent?: string
  /**
   * Aviso que se enseña ARRIBA DEL TODO en la ficha cuando sus datos están en revisión.
   *
   * Creado el 18-sep-2026 al descubrir que varias fichas de este catálogo tienen datos
   * equivocados, y que tres de ellas ni siquiera son fondos: son ETFs. Toda la web dice que
   * los fondos se traspasan sin tributar y los ETF no, así que presentarlos aquí les
   * atribuye una ventaja fiscal que NO tienen — justo al revés de lo cierto.
   *
   * El 18-sep se retiró la afirmación y no la página, con el argumento de que
   * `amundi-prime-global` era «la que más clics recibe de todo el sitio». El 19-sep, ya con
   * la API de Bing, eso resultó ser falso: da 3 clics y /blog/vwce-analisis-completo da 9.
   * Lo que sí es, y por goleada, es la que MEJOR CONVIERTE: 9 impresiones y 3 clics, un
   * 33 % frente al 2,6 % de media del sitio.
   *
   * Con ese dato la decisión cambia de forma: las dos fichas Prime salen del catálogo de
   * fondos —no son fondos— y sus URLs van por 301 al artículo que explica qué son. Se
   * conserva la conversión y se deja de clasificar un ETF como fondo.
   */
  avisoDeRevision?: string
  faq: IndexFundFaq[]
}

export const INDEX_FUNDS: IndexFund[] = [
  {
    slug: 'ishares-developed-world-index',
    name: 'iShares Developed World Index Fund',
    manager: 'BlackRock',
    isin: 'IE00BD0NCM55',
    // CORREGIDO el 28-sep-2026. Publicábamos 0,30 % con un dato del «registro de fondos» del
    // 19-sep. La ficha de la GESTORA (blackrock.com/es/profesionales/productos/287649) dice:
    // «Ongoing Charge Fee 0,12% | ISIN IE00BD0NCM55 | Inversión inicial mínima EUR 100.000,00 |
    // Índice de referencia MSCI World Index Net (EUR) | Porcentaje de gastos 0,10%». Se publica
    // el «Porcentaje de gastos», que es el campo que usamos en todas las fichas de BlackRock.
    index: 'MSCI World',
    ter: 0.10,
    assetClass: 'Renta variable',
    region: 'Global desarrollado',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'BlackRock exige 100.000 € de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    tagline: 'MSCI World en formato fondo, de BlackRock',
    description:
      'El iShares Developed World Index Fund replica el MSCI World con unos gastos del 0,10 % anual en su clase D, según la ficha de BlackRock de septiembre de 2026 (hasta el 28-sep publicábamos 0,30 %, un dato que no salía de la gestora). Cubre las grandes y medianas empresas de 23 mercados desarrollados, sin emergentes. Es el mismo índice que siguen ETFs como IWDA o SWRD, con la diferencia de forma jurídica que importa en España: un fondo entra en el régimen de traspasos del artículo 94.1.a) del IRPF y un ETF no.',
    etfEquivalent: 'IWDA',
    faq: [
      { q: '¿En qué se diferencia de un ETF sobre el MSCI World?', a: 'En la cartera, en nada: el índice es el mismo y las empresas también. La diferencia está en el vehiculo. Un fondo de inversión se puede traspasar a otro fondo sin que la plusvalía tribute en ese momento; un ETF queda fuera de ese régimen porque el artículo 94.1.a) excluye a los fondos cotizados. En coste, esta clase D cuesta 0,10 % según BlackRock, y el mismo fondo tiene otras clases más caras y más baratas, que están en el cuadro de esta ficha.' },
    ],
  },
  {
    slug: 'ishares-north-america-index',
    name: 'iShares North America Index Fund (clase D)',
    manager: 'BlackRock',
    isin: 'IE00BD575G75',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/284072
    // «Clase D | Índice de referencia: MSCI Daily Net TR North America (EUR) | Porcentaje de gastos: 0,08 por ciento | Inversión inicial mínima: 100.000 | Acumulación».
    index: 'MSCI North America',
    ter: 0.08,
    assetClass: 'Renta variable',
    region: 'Norteamérica',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'BlackRock exige 100.000 € de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    tagline: 'Estados Unidos y Canadá en formato fondo, al 0,08 %',
    description:
      'El iShares North America Index Fund replica el MSCI North America con unos gastos del 0,08 % anual, verificados en la ficha de BlackRock. Son las grandes y medianas empresas de Estados Unidos y Canadá: Estados Unidos pesa en torno al 97 % y Canadá el resto. Es parecido al S&P 500 pero algo más amplio, porque añade Canadá y más empresas medianas.',
    etfEquivalent: 'CSPX',
    faq: [
      { q: '¿En qué se diferencia del S&P 500?', a: 'El S&P 500 son unas 500 grandes empresas de Estados Unidos. El MSCI North America añade Canadá, que pesa en torno a un 3 %, y algo más de empresas medianas estadounidenses. En la práctica se mueven casi igual: la mayor parte del índice son las mismas grandes compañías de Estados Unidos.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-developed-real-estate-index',
    name: 'iShares Developed Real Estate Index Fund (clase Inst)',
    manager: 'BlackRock',
    isin: 'IE00B83YJG36',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/249682
    // «Inst | Índice de referencia: FTSE EPRA Nareit Developed Net Index EUR | Porcentaje de gastos: 0,20 por ciento | Inversión inicial mínima: 1.000.000 | Acumulación».
    index: 'FTSE EPRA Nareit Developed',
    ter: 0.20,
    assetClass: 'Renta variable',
    region: 'Global desarrollado',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'Clase institucional: BlackRock exige 1.000.000 € de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    tagline: 'Inmobiliario cotizado de países desarrollados, al 0,20 %',
    description:
      'El iShares Developed Real Estate Index Fund replica el FTSE EPRA Nareit Developed, un índice de empresas inmobiliarias cotizadas y SOCIMIs de países desarrollados, con unos gastos del 0,20 % anual verificados en la ficha de BlackRock. No compra inmuebles: compra acciones de empresas que los poseen y alquilan, así que se comporta como renta variable y no como un piso.',
    faq: [
      { q: '¿Invertir en este fondo es como comprar un inmueble?', a: 'No. Compra acciones de empresas inmobiliarias cotizadas, así que su precio se mueve con la bolsa y puede caer mucho en una crisis aunque los alquileres sigan cobrándose. Tiene liquidez diaria, que un piso no tiene, y a cambio no da la estabilidad de precio que la gente suele asociar al ladrillo.' },
      { q: 'Si es una clase institucional, ¿cómo la compra un particular?', a: 'El mínimo lo exige el fondo a quien suscribe, y quien suscribe no eres tú sino tu comercializadora. Una plataforma que agrupa a sus clientes en una cuenta ómnibus sí llega a ese mínimo, y luego te deja entrar con lo que ella decida. Por eso el mínimo que te aplique a ti lo pone tu plataforma, no BlackRock: compruébalo allí.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-emu-index',
    name: 'iShares EMU Index Fund (clase Inst)',
    manager: 'BlackRock',
    isin: 'IE00B3B2KS38',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/228478
    // «Inst | Índice de referencia: MSCI EMU Net TR Index (EUR) | Porcentaje de gastos: 0,15 por ciento | Inversión inicial mínima: 1.000.000 | Acumulación».
    index: 'MSCI EMU',
    ter: 0.15,
    assetClass: 'Renta variable',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'Clase institucional: BlackRock exige 1.000.000 € de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    tagline: 'Solo eurozona en formato fondo, al 0,15 %',
    description:
      'El iShares EMU Index Fund replica el MSCI EMU, las grandes y medianas empresas de los países que usan el euro, con unos gastos del 0,15 % anual verificados en la ficha de BlackRock. A diferencia del MSCI Europe, deja fuera Reino Unido, Suiza, Suecia, Dinamarca y Noruega, así que no tiene riesgo de divisa para quien invierte en euros.',
    faq: [
      { q: '¿Qué diferencia hay entre MSCI EMU y MSCI Europe?', a: 'El MSCI EMU solo tiene países del euro. El MSCI Europe añade Reino Unido, Suiza, Suecia, Dinamarca y Noruega, que tienen moneda propia y pesan en torno a un tercio del índice. Si lo que se busca es no tener riesgo de divisa, el EMU lo elimina y el Europe no.' },
      { q: 'Si es una clase institucional, ¿cómo la compra un particular?', a: 'El mínimo lo exige el fondo a quien suscribe, y quien suscribe no eres tú sino tu comercializadora. Una plataforma que agrupa a sus clientes en una cuenta ómnibus sí llega a ese mínimo, y luego te deja entrar con lo que ella decida. Por eso el mínimo que te aplique a ti lo pone tu plataforma, no BlackRock: compruébalo allí.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-japan-index',
    name: 'iShares Japan Index Fund (clase D)',
    manager: 'BlackRock',
    isin: 'IE00BDRK7T12',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/287903
    // «Clase D | Índice de referencia: MSCI Developed - Japan Net EUR Index | Porcentaje de gastos: 0,30 por ciento | Inversión inicial mínima: EUR 100.000 | Acumulación».
    index: 'MSCI Japan',
    ter: 0.30,
    assetClass: 'Renta variable',
    region: 'Japón',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'BlackRock exige 100.000 € de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    tagline: 'Japón en formato fondo, de BlackRock',
    description:
      'El iShares Japan Index Fund replica el MSCI Japan, las grandes y medianas empresas japonesas, con unos gastos del 0,30 % anual verificados en la ficha de BlackRock. Invierte en yenes, así que para quien invierte en euros hay riesgo de divisa además del de la bolsa.',
    etfEquivalent: 'SJPA',
    faq: [
      { q: '¿Por qué hay clases de este fondo con comisiones tan distintas?', a: 'Porque una clase no es un fondo distinto, es otra forma de entrar en el mismo. Esta clase D cuesta 0,30 % y la Inst del mismo fondo 0,15 %, con la misma cartera. Lo que cambia es el mínimo de entrada y a quién va dirigida.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-pacific-index',
    name: 'iShares Pacific Index Fund (clase D)',
    manager: 'BlackRock',
    isin: 'IE00BDRK7R97',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/287905
    // «Clase D | Índice de referencia: MSCI Developed Pacific Ex Japan in EUR Net TR Index | Porcentaje de gastos: 0,30 por ciento | Inversión inicial mínima: EUR 100.000 | Acumulación».
    index: 'MSCI Pacific ex Japan',
    ter: 0.30,
    assetClass: 'Renta variable',
    region: 'Pacífico ex-Japón',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'BlackRock exige 100.000 € de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    tagline: 'Australia, Hong Kong, Singapur y Nueva Zelanda en fondo',
    description:
      'El iShares Pacific Index Fund replica el MSCI Pacific ex Japan, las grandes y medianas empresas de Australia, Hong Kong, Singapur y Nueva Zelanda, con unos gastos del 0,30 % anual verificados en la ficha de BlackRock. Australia es con diferencia el mayor peso del índice.',
    etfEquivalent: 'CPXJ',
    faq: [
      { q: '¿Qué países incluye?', a: 'Australia, Hong Kong, Singapur y Nueva Zelanda. Australia pesa la mayor parte, en torno a dos tercios, así que el comportamiento del fondo depende mucho de la bolsa australiana, que tiene mucho peso de bancos y de materias primas. No incluye Japón, que tiene su propio índice.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-global-aggregate-1-5-year-bond-index',
    name: 'iShares Global Aggregate 1-5 Year Bond Index Fund (clase D Hedged)',
    manager: 'BlackRock',
    isin: 'IE00BMZ3NN11',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/318356
    // «Class D Hedged | Índice de referencia: BBG Global Aggregate 1-5 Year Index | Porcentaje de gastos: 0,14 por ciento | Inversión inicial mínima: EUR 100.000 | Acumulación».
    index: 'Bloomberg Global Aggregate 1-5 Year',
    ter: 0.14,
    assetClass: 'Renta fija',
    region: 'Global',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'BlackRock exige 100.000 € de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    tagline: 'Renta fija global a corto plazo, cubierta a euros',
    description:
      'El iShares Global Aggregate 1-5 Year Bond Index Fund replica la parte de 1 a 5 años del Bloomberg Global Aggregate, deuda pública y corporativa con grado de inversión de todo el mundo, con unos gastos del 0,14 % anual verificados en la ficha de BlackRock. Está cubierto a euros, así que el riesgo de divisa se neutraliza.',
    etfEquivalent: 'AGGH',
    faq: [
      { q: '¿Qué cambia por ser de 1 a 5 años?', a: 'La sensibilidad a los tipos de interés. Un bono a 20 años pierde mucho precio si los tipos suben; uno a 3 años, poco, porque vence pronto y se reinvierte al tipo nuevo. Por eso un fondo de plazo corto cae mucho menos en años como 2022, y a cambio suele rentar algo menos cuando los tipos bajan.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-ultra-high-quality-euro-government-bond-index',
    name: 'iShares Ultra High Quality Euro Government Bond Index Fund (clase Inst)',
    manager: 'BlackRock',
    isin: 'IE00B4XCK338',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/229107
    // «Inst | Índice de referencia: iBoxx Eurozone AAA Index (EUR) | Porcentaje de gastos: 0,10 por ciento | Inversión inicial mínima: EUR 250.000 | Acumulación».
    index: 'iBoxx Eurozone AAA',
    ter: 0.10,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'Clase institucional: BlackRock exige 250.000 € de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    tagline: 'Solo la deuda pública AAA de la eurozona',
    description:
      'El iShares Ultra High Quality Euro Government Bond Index Fund replica el iBoxx Eurozone AAA, es decir, solo la deuda de los estados de la eurozona con la máxima calificación crediticia, con unos gastos del 0,10 % anual verificados en la ficha de BlackRock. Deja fuera a países como Italia, España o Francia, que no tienen AAA.',
    etfEquivalent: 'VGEA',
    faq: [
      { q: '¿Qué países entran si solo compra AAA?', a: 'Los estados de la eurozona que en cada momento tienen la máxima calificación, como Alemania o Países Bajos. Italia, España o Francia no están, porque no son AAA. Eso lo hace más conservador en riesgo de impago, y también más concentrado en pocos emisores.' },
      { q: 'Si es una clase institucional, ¿cómo la compra un particular?', a: 'El mínimo lo exige el fondo a quien suscribe, y quien suscribe no eres tú sino tu comercializadora. Una plataforma que agrupa a sus clientes en una cuenta ómnibus sí llega a ese mínimo, y luego te deja entrar con lo que ella decida. Por eso el mínimo que te aplique a ti lo pone tu plataforma, no BlackRock: compruébalo allí.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-euro-investment-grade-corporate-bond-index',
    name: 'iShares Euro Investment Grade Corporate Bond Index Fund (clase Inst)',
    manager: 'BlackRock',
    isin: 'IE00B67T5G21',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/228525
    // «Inst | Índice de referencia: BBG Euro Corporate Index (EUR) | Porcentaje de gastos: 0,12 por ciento | Inversión inicial mínima: EUR 500.000 | Acumulación».
    index: 'Bloomberg Euro Corporate',
    ter: 0.12,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'Clase institucional: BlackRock exige 500.000 € de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    tagline: 'Bonos de empresas en euros con grado de inversión',
    description:
      'El iShares Euro Investment Grade Corporate Bond Index Fund replica el Bloomberg Euro Corporate, deuda en euros emitida por empresas con calificación de grado de inversión, con unos gastos del 0,12 % anual verificados en la ficha de BlackRock. Paga algo más que la deuda pública a cambio de un riesgo de impago algo mayor.',
    faq: [
      { q: '¿Qué diferencia hay con la deuda pública?', a: 'El emisor. Aquí son empresas, no estados. Suelen pagar algo más de interés porque el riesgo de que una empresa no pague es mayor que el de un estado europeo, y en una crisis su precio suele caer más. Grado de inversión significa que las agencias las califican como de riesgo bajo, no como sin riesgo.' },
      { q: 'Si es una clase institucional, ¿cómo la compra un particular?', a: 'El mínimo lo exige el fondo a quien suscribe, y quien suscribe no eres tú sino tu comercializadora. Una plataforma que agrupa a sus clientes en una cuenta ómnibus sí llega a ese mínimo, y luego te deja entrar con lo que ella decida. Por eso el mínimo que te aplique a ti lo pone tu plataforma, no BlackRock: compruébalo allí.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-world-ex-euro-government-bond-index',
    name: 'iShares World ex-Euro Government Bond Index Fund (clase Inst Hedged)',
    manager: 'BlackRock',
    isin: 'IE00BGR7K831',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/306040
    // «Inst Hedged Acc | Índice de referencia: FTSE Non-EUR World Government Bond Index | Porcentaje de gastos: 0,14 por ciento | Inversión inicial mínima: GBP 500.000 | Acumulación».
    index: 'FTSE Non-EUR World Government Bond',
    ter: 0.14,
    assetClass: 'Renta fija',
    region: 'Global',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'Clase institucional: BlackRock exige 500.000 £ de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    tagline: 'Deuda pública mundial fuera del euro, cubierta',
    description:
      'El iShares World ex-Euro Government Bond Index Fund replica el FTSE Non-EUR World Government Bond, deuda pública de países desarrollados que no usan el euro (Estados Unidos, Japón, Reino Unido y otros), con unos gastos del 0,14 % anual verificados en la ficha de BlackRock. Esta clase está cubierta, así que el riesgo de divisa se neutraliza.',
    faq: [
      { q: '¿Para qué sirve deuda pública fuera del euro?', a: 'Para no depender solo de los estados de la eurozona. Estados Unidos, Japón o Reino Unido tienen ciclos de tipos distintos, así que sus bonos no siempre se mueven igual que los europeos. Al estar cubierta a euros, lo que queda es el efecto de los tipos de esos países sin el vaivén de sus monedas.' },
      { q: 'Si es una clase institucional, ¿cómo la compra un particular?', a: 'El mínimo lo exige el fondo a quien suscribe, y quien suscribe no eres tú sino tu comercializadora. Una plataforma que agrupa a sus clientes en una cuenta ómnibus sí llega a ese mínimo, y luego te deja entrar con lo que ella decida. Por eso el mínimo que te aplique a ti lo pone tu plataforma, no BlackRock: compruébalo allí.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-euro-aggregate-bond-index',
    name: 'iShares Euro Aggregate Bond Index Fund (clase A2)',
    manager: 'BlackRock',
    isin: 'LU0836513423',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/254304
    // «A2 | Índice de referencia: BBG Euro Aggregate Index (EUR) | Porcentaje de gastos: 0,45 por ciento | Inversión inicial mínima: EUR 5.000 | Acumulación».
    index: 'Bloomberg Euro Aggregate',
    ter: 0.45,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'BlackRock exige 5.000 € de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    tagline: 'Toda la renta fija en euros con grado de inversión',
    description:
      'El iShares Euro Aggregate Bond Index Fund replica el Bloomberg Euro Aggregate, que reúne deuda pública y corporativa en euros con grado de inversión, con unos gastos del 0,45 % anual verificados en la ficha de BlackRock. Es un fondo luxemburgués y esta clase tiene un mínimo de entrada asequible, 5.000 €.',
    faq: [
      { q: '¿Qué significa «aggregate»?', a: 'Que junta varios tipos de deuda en un solo índice: bonos de estados, de organismos públicos y de empresas, todos en euros y con grado de inversión. Es la forma de tener la renta fija en euros entera en un solo producto, en lugar de separar pública y corporativa.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-euro-government-inflation-linked-bond-index',
    name: 'iShares Euro Government Inflation-Linked Bond Index Fund (clase Inst)',
    manager: 'BlackRock',
    isin: 'IE00B4WXT857',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/228466
    // «Inst | Índice de referencia: BBG Euro Government Inflation-Linked Bond Index (EUR) | Porcentaje de gastos: 0,10 por ciento | Inversión inicial mínima: EUR 500.000 | Acumulación».
    index: 'Bloomberg Euro Government Inflation-Linked',
    ter: 0.10,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'Clase institucional: BlackRock exige 500.000 € de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    tagline: 'Bonos de la eurozona que suben con la inflación',
    description:
      'El iShares Euro Government Inflation-Linked Bond Index Fund replica el Bloomberg Euro Government Inflation-Linked, bonos de estados de la eurozona cuyo principal se ajusta con la inflación, con unos gastos del 0,10 % anual verificados en la ficha de BlackRock.',
    faq: [
      { q: '¿Protege de la inflación sin riesgo?', a: 'Protege de la inflación, no del riesgo. El principal se ajusta con la inflación, pero el precio del bono sigue moviéndose con los tipos de interés reales, y puede caer bastante si suben, como pasó en 2022. Lo que ofrece es que la inflación no se coma el valor al vencimiento.' },
      { q: 'Si es una clase institucional, ¿cómo la compra un particular?', a: 'El mínimo lo exige el fondo a quien suscribe, y quien suscribe no eres tú sino tu comercializadora. Una plataforma que agrupa a sus clientes en una cuenta ómnibus sí llega a ese mínimo, y luego te deja entrar con lo que ella decida. Por eso el mínimo que te aplique a ti lo pone tu plataforma, no BlackRock: compruébalo allí.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-europe-index',
    name: 'iShares Europe Index Fund (clase D)',
    manager: 'BlackRock',
    isin: 'IE00BDRK7L36',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/287906/ishares-europe-index-fund-ie
    // «Clase D | Índice de referencia: MSCI Europe Index | Porcentaje de gastos: 0,30 por
    // ciento | Uso de los ingresos: Acumulación | Inversión inicial mínima: EUR 100.000».
    //
    // ⚠️ Entra sabiendo que es el más caro de los tres que tenemos sobre el MSCI Europe: el
    // Fidelity cuesta 0,10 % y el Vanguard 0,12 %, o sea un tercio. Se añade igual porque
    // este catálogo existe para RECONOCER lo que alguien tiene cuando pega su cartera, no
    // para listar lo barato. Si solo tuviéramos lo barato, al que tiene este le diríamos
    // «no lo reconozco», que es la peor respuesta posible. La ficha dice la diferencia.
    index: 'MSCI Europe',
    ter: 0.30,
    assetClass: 'Renta variable',
    region: 'Europa',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'BlackRock exige 100.000 € de inversión inicial; lo que te pida tu comercializadora puede ser muy distinto',
    tagline: 'MSCI Europe en formato fondo, de BlackRock',
    description:
      'El iShares Europe Index Fund replica el MSCI Europe con unos gastos del 0,30 % anual, verificados en la ficha de BlackRock. Cubre unas 400 empresas grandes y medianas de 15 mercados desarrollados europeos, incluidos Reino Unido, Suiza, Suecia, Dinamarca y Noruega, que no están en la eurozona y por tanto añaden riesgo de divisa para quien invierte en euros. Al ser un fondo entra en el régimen de traspasos del artículo 94.1.a) del IRPF.',
    etfEquivalent: 'IMEU',
    faq: [
      { q: '¿Hay fondos más baratos sobre el mismo índice?', a: 'Sí, y la diferencia no es pequeña. Sobre el MSCI Europe hay fondos indexados desde el 0,10 % anual; este cuesta 0,30 %. Sobre 20.000 € son unos 40 € más al año, y la comisión se cobra sobre el saldo, así que crece con la cartera. Esto es un dato, no una recomendación: puede haber motivos para tener uno u otro, como en qué plataforma está disponible cada uno o qué tienes ya contratado.' },
      { q: '¿El MSCI Europe es lo mismo que «eurozona»?', a: 'No, y es la confusión más común con este índice. El MSCI Europe incluye Reino Unido, Suiza, Suecia, Dinamarca y Noruega, que tienen su propia moneda. El índice de eurozona es el MSCI EMU, que sí se limita a países del euro. Si lo que buscabas era no tener riesgo de divisa, el Europe no lo elimina: Reino Unido y Suiza pesan una parte importante.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-euro-government-bond-index',
    name: 'iShares Euro Government Bond Index Fund (clase D)',
    manager: 'BlackRock',
    isin: 'IE00BD0NC037',
    // Verificado el 25-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/287637/ishares-euro-government-bond-index-fund-ie
    // «Clase D | Índice de referencia: FTSE EMU Government Bond Index (EUR) |
    // Porcentaje de gastos: 0,07 por ciento | Uso de los ingresos: Acumulación |
    // Domicilio: Irlanda | Inversión inicial mínima: EUR 100.000 | posterior: EUR 5.000».
    //
    // Por qué este y no otro de los 66 que quedan: la comparativa de comisiones de
    // bogleheads.es cita este ISIN junto al IE000ZYRH0Q7 como los dos de referencia de
    // MyInvestor. O sea que es de los que la gente tiene de verdad, no de los que se ven
    // bien en una lista.
    index: 'FTSE EMU Government Bond',
    ter: 0.07,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    // Ojo: 100.000 € es la entrada que pide BlackRock, no la que pide tu plataforma. Menos
    // que los 200 millones de las clases S, pero sigue estando fuera del alcance directo de
    // casi cualquier particular.
    minimum: 'BlackRock exige 100.000 € de inversión inicial y 5.000 € en las siguientes; lo que te pida tu comercializadora puede ser muy distinto',
    tagline: 'Deuda pública de la eurozona en formato fondo, al 0,07 %',
    description:
      'El iShares Euro Government Bond Index Fund replica el FTSE EMU Government Bond Index con unos gastos del 0,07 % anual, verificados en la ficha de BlackRock. Invierte en deuda pública emitida por los estados de la eurozona, así que no hay riesgo de divisa para quien invierte en euros, pero sí riesgo de tipos de interés: cuando los tipos suben, el precio de los bonos ya emitidos baja. Al ser un fondo y no un ETF, entra en el régimen de traspasos del artículo 94.1.a) del IRPF.',
    etfEquivalent: 'VGEA',
    faq: [
      { q: '¿Por qué bajó tanto la renta fija en 2022 si es lo «seguro»?', a: 'Porque «seguro» en renta fija significa que el emisor devuelve el dinero al vencimiento, no que el precio no se mueva por el camino. Un bono ya emitido paga un cupón fijo; si los tipos suben, los bonos nuevos pagan más y el viejo solo se puede vender más barato. Cuanto más lejos esté el vencimiento, mayor es esa caída: es lo que mide la duración. En 2022 los tipos subieron muy deprisa desde niveles muy bajos y los fondos de deuda con duración larga cayeron con fuerza.' },
      { q: '¿Qué países hay dentro?', a: 'Deuda pública de los estados de la eurozona, ponderada por volumen emitido. Eso significa que los países más endeudados pesan más, que es lo contrario de lo que mucha gente supone: Italia y Francia pesan bastante más que Países Bajos o Irlanda. No es un defecto del fondo, es cómo funciona un índice de renta fija ponderado por capitalización.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza, no desaparece.' },
    ],
  },
  {
    slug: 'ishares-emerging-markets-index-clase-s',
    name: 'iShares Emerging Markets Index Fund (clase S)',
    manager: 'BlackRock',
    isin: 'IE000QAZP7L2',
    // Verificado el 24-sep-2026 en la ficha de la GESTORA:
    // blackrock.com/es/profesionales/productos/345276/ishares-emerging-markets-index-fund-ie
    // «Clase S | Índice de referencia: MSCI Emerging Markets, Net Returns (EUR) |
    // Porcentaje de gastos: 0,08 por ciento | Domicilio: Irlanda | Gestora: BlackRock Asset
    // Management Ireland Limited | Lanzamiento de la serie: 21 ago 2025 |
    // Inversión inicial mínima: EUR 200.000.000,00 | mínima posterior: EUR 10.000».
    index: 'MSCI Emerging Markets',
    ter: 0.08,
    assetClass: 'Renta variable',
    region: 'Emergentes',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'Clase institucional: BlackRock exige 200.000.000 € de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    tagline: 'Emergentes en formato fondo, al 0,08 %',
    description:
      'La clase S del iShares Emerging Markets Index Fund replica el MSCI Emerging Markets con unos gastos del 0,08 % anual, verificados en la ficha de BlackRock. Es la clase barata del mismo fondo, lanzada en agosto de 2025 a la vez que la del MSCI World. Al ser un fondo y no un ETF, entra en el régimen de traspasos del artículo 94.1.a) del IRPF.',
    etfEquivalent: 'EIMI',
    faq: [
      { q: 'Si el mínimo son 200 millones, ¿cómo puede comprarla un particular?', a: 'Porque el mínimo lo exige el fondo a quien suscribe, y quien suscribe no eres tú: es tu comercializadora. BlackRock pide 200.000.000 € de inversión inicial en esta clase, una cifra pensada para institucionales. Una plataforma que junta a miles de clientes en una cuenta ómnibus sí llega, y luego te deja entrar a ti con lo que ella decida. Por eso la misma clase puede ser inalcanzable por tu cuenta y estar disponible desde pocos euros en una plataforma concreta. Y por eso el mínimo que te aplique a ti no lo decide BlackRock: lo decide dónde lo contrates.' },
      { q: '¿Qué países incluye el MSCI Emerging Markets?', a: 'Unos veinticuatro mercados clasificados como emergentes por MSCI. China, India, Taiwán, Corea del Sur y Brasil pesan la mayor parte; el resto se reparte entre Sudáfrica, México, Arabia Saudí y otros. La clasificación la revisa MSCI y cambia: Corea del Sur lleva años en el límite entre emergente y desarrollado, y FTSE la clasifica de otra forma. Por eso dos fondos «de emergentes» pueden no contener los mismos países.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí, como cualquier fondo de inversión. El artículo 94.1.a) de la Ley del IRPF establece que si el reembolso de un fondo se destina a suscribir otro «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto no desaparece: se aplaza hasta la venta definitiva.' },
    ],
  },
  {
    slug: 'ishares-developed-world-index-clase-s',
    name: 'iShares Developed World Index Fund (clase S)',
    manager: 'BlackRock',
    isin: 'IE000ZYRH0Q7',
    // Verificado el 24-sep-2026 en la web de la GESTORA, no copiado de ninguna lista:
    // blackrock.com/es/profesionales/productos/345277/ishares-developed-world-index-fund-ie
    // «Clase S (EUR) Acumulación | Índice de referencia: MSCI World Index Net (EUR) |
    // Porcentaje de gastos: 0,04 % | Domicilio: Irlanda | Gestora: BlackRock Asset
    // Management Ireland Limited | Fecha de lanzamiento de la serie: 21 ago 2025».
    //
    // Por qué entra, y por qué importa más que otro fondo cualquiera: es la MISMA cartera
    // que la clase D que ya teníamos arriba, y cuesta 0,04 % en vez de 0,30 %. Siete veces
    // y media más barato. MyInvestor la estrenó en España en septiembre de 2025 y la
    // comunidad de bogleheads.es la está contratando: la comparativa de comisiones del foro
    // bajó su estimación del 0,12 % al 0,08 % anual por este lanzamiento.
    //
    // Y la razón por la que lo encontramos: dos usuarios del hilo de la plantilla decían que
    // su hoja de cálculo NO reconocía este ISIN. La nuestra tampoco lo reconocía.
    index: 'MSCI World',
    ter: 0.04,
    assetClass: 'Renta variable',
    region: 'Global desarrollado',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    // ⚠️ CORREGIDO el 24-sep-2026, una hora después de publicarlo.
    // Aquí ponía «BlackRock publica 10.000 € de inversión mínima posterior». Era cierto y
    // engañoso a la vez, que es la peor combinación: se leía como si un particular pudiera
    // abrir posición con diez mil euros. La ficha de BlackRock dice, en el campo de al lado
    // del que yo leí, «Inversión inicial mínima: EUR 200.000.000,00». Los 10.000 € son el
    // mínimo de las aportaciones SIGUIENTES, no el de entrada.
    // Lo destapó añadir la clase S de emergentes, donde ese campo apareció primero y me hizo
    // volver. Leer un campo y no el de al lado es cómo se publican medias verdades.
    minimum: 'Clase institucional: BlackRock exige 200.000.000 € de inversión inicial. Un particular solo entra a través de una comercializadora que agrupe en cuenta ómnibus',
    tagline: 'El MSCI World más barato en formato fondo: 0,04 %',
    description:
      'La clase S del iShares Developed World Index Fund replica el MSCI World con unos gastos del 0,04 % anual, verificados en la ficha de BlackRock. Es exactamente la misma cartera que la clase D del mismo fondo —unas 1.500 empresas de 23 mercados desarrollados, sin emergentes— con la diferencia de que cuesta 0,04 % en vez de 0,10 %. Al ser un fondo y no un ETF, entra en el régimen de traspasos del artículo 94.1.a) del IRPF.',
    etfEquivalent: 'IWDA',
    faq: [
      { q: '¿En qué se diferencia de la clase D del mismo fondo?', a: 'En la cartera, en nada: es el mismo fondo y el mismo índice. Lo que cambia es la comisión: la clase S cuesta 0,04 % anual y la clase D, 0,10 %, según las fichas de BlackRock. Sobre 10.000 € son 6 € de diferencia al año, y sobre 100.000 € son 60 €. Las clases baratas suelen existir para grandes patrimonios; lo que ha cambiado es que algunas plataformas españolas las ofrecen ahora al particular.' },
      { q: '¿Por qué un mismo fondo tiene clases con comisiones tan distintas?', a: 'Porque una clase no es un fondo distinto, es una forma de entrar en el mismo. La gestora crea varias con condiciones diferentes: unas con mínimos altos y comisión baja, pensadas para institucionales, y otras sin mínimo y más caras. La cartera de acciones es la misma para todas y el valor liquidativo se calcula por separado en cada una.' },
      { q: 'Si el mínimo son 200 millones, ¿cómo puede comprarla un particular?', a: 'Porque el mínimo lo exige el fondo a quien suscribe, y quien suscribe no eres tú: es tu comercializadora. BlackRock pide 200.000.000 € de inversión inicial en esta clase, una cifra pensada para institucionales. Una plataforma que junta a miles de clientes en una cuenta ómnibus sí llega, y luego te deja entrar a ti con lo que ella decida. Por eso la misma clase puede ser inalcanzable por tu cuenta y estar disponible desde pocos euros en una plataforma concreta. Y por eso el mínimo que te aplique a ti no lo decide BlackRock: lo decide dónde lo contrates.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí, como cualquier fondo de inversión. El artículo 94.1.a) de la Ley del IRPF establece que si el reembolso de un fondo se destina a suscribir otro «no procederá computar la ganancia o pérdida patrimonial», con dos condiciones: que el importe no llegue a estar a disposición del contribuyente, o sea que sea un traspaso tramitado entre entidades y no una venta seguida de una compra. El impuesto no desaparece, se aplaza hasta la venta definitiva.' },
    ],
  },
  {
    slug: 'amundi-index-msci-world',
    name: 'Amundi Index MSCI World',
    manager: 'Amundi',
    isin: 'LU0996182563',
    // CORREGIDO el 28-sep-2026. Publicábamos 0,15 % con un dato del «registro de fondos» del
    // 19-sep. El Documento de Datos Fundamentales de la GESTORA (amundi.es, publicado el
    // 28/04/2026) dice: «Amundi Index MSCI World AE | replicar la rentabilidad del MSCI World
    // Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el
    // 0,30 %». El KIID británico de febrero de 2026 dice lo mismo. Era la MITAD de lo real.
    index: 'MSCI World',
    ter: 0.30,
    assetClass: 'Renta variable',
    region: 'Global desarrollado',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado',
    tagline: 'MSCI World de Amundi en formato fondo, con dos clases',
    description:
      'El Amundi Index MSCI World replica el MSCI World con unos gastos del 0,30 % anual en su clase AE, según el documento de datos fundamentales de Amundi de abril de 2026; su clase IE cuesta 0,20 %. Hasta el 28-sep publicábamos 0,15 %, un dato que no salía de la gestora. Cubre mercados desarrollados y deja fuera a los emergentes, que hay que añadir aparte si se quiere una cartera mundial completa. Ojo con el nombre: la gama «Index» de Amundi no es la gama «Core» ni la «Prime», y sus comisiones y formatos no coinciden.',
    etfEquivalent: 'IWDA',
    faq: [
      { q: '¿Es lo mismo que el Amundi Prime Global?', a: 'No. El Amundi Prime Global es un ETF, no un fondo, y sigue un índice de Solactive en vez del MSCI World. La confusión es fácil porque las tres gamas de Amundi —Index, Core y Prime— se parecen en el nombre y se diferencian en formato, índice y comisión. Lo que distingue a uno de otro es el ISIN, no la marca.' },
    ],
  },
  {
    slug: 'fidelity-msci-europe-index',
    name: 'Fidelity MSCI Europe Index Fund',
    manager: 'Fidelity',
    isin: 'IE00BYX5MD61',
    // Verificado el 19-sep-2026 en el registro: «FIDELITY MSCI EUROPE INDEX FUND P-ACC-EUR |
    // FIL INVESTMENTS INTERNATIONAL | MSCI Europe Index | 0,10 %».
    index: 'MSCI Europe',
    ter: 0.10,
    assetClass: 'Renta variable',
    region: 'Europa desarrollada',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado',
    tagline: 'Bolsa europea desarrollada por un 0,10 %',
    description:
      'El Fidelity MSCI Europe Index Fund replica el MSCI Europe con unos gastos del 0,10 % anual. Conviene saber qué hay dentro: el MSCI Europe NO es solo la eurozona, incluye Reino Unido, Suiza, Suecia, Dinamarca y Noruega, que tienen su propia divisa. Así que añadir Europa con este fondo reduce la exposición a divisa extranjera respecto a un fondo global, pero no la elimina.',
    etfEquivalent: 'IMEU',
    faq: [
      { q: '¿Cuánto se solapa con un fondo global?', a: 'Bastante. En un MSCI World, Europa desarrollada pesa en torno al 15-20 %, y son en gran parte las mismas empresas. Sumar un fondo europeo a uno global no añade empresas nuevas: cambia el peso que tienen las que ya están. El analizador de cartera pone número a ese solapamiento y dice qué costaría deshacerlo.' },
    ],
  },
  {
    slug: 'vanguard-global-small-cap-index',
    name: 'Vanguard Global Small-Cap Index Fund',
    manager: 'Vanguard',
    isin: 'IE00B42W4L06',
    // Verificado el 19-sep-2026 en el registro: «VANGUARD GLOBAL SMALL-CAP INDEX GENERAL EUR
    // CAP | VANGUARD ASSET MANAGEMENT | MSCI World Small Cap Index | 0,29 %».
    index: 'MSCI World Small Cap',
    ter: 0.29,
    assetClass: 'Renta variable',
    region: 'Global desarrollado (pequeña capitalización)',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado',
    tagline: 'Pequeñas empresas de mercados desarrollados, en formato fondo',
    description:
      'El Vanguard Global Small-Cap Index Fund replica el MSCI World Small Cap con unos gastos del 0,29 % anual. Cubre las compañías de menor capitalización de los mercados desarrollados, que un MSCI World deja fuera por construcción: ese índice solo llega hasta las medianas. Es un complemento de una cartera global, no un sustituto, y su comportamiento es más volátil que el del índice grande.',
    etfEquivalent: 'IUSN',
    faq: [
      { q: '¿Se solapa con un fondo que replique el MSCI World?', a: 'Casi nada, y esa es la razón de añadirlo. El MSCI World cubre grandes y medianas; el MSCI World Small Cap empieza donde el otro termina. Son índices complementarios por diseño, al contrario de lo que pasa al juntar dos fondos globales.' },
    ],
  },
  {
    slug: 'vanguard-japan-stock-index',
    name: 'Vanguard Japan Stock Index Fund',
    manager: 'Vanguard',
    isin: 'IE0007286036',
    // Verificado el 19-sep-2026 en el registro: «VANGUARD JAPAN STOCK INDEX GENERAL EUR CAP |
    // VANGUARD ASSET MANAGEMENT | MSCI Japan Index | 0,16 %».
    index: 'MSCI Japan',
    ter: 0.16,
    assetClass: 'Renta variable',
    region: 'Japón',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado',
    tagline: 'Bolsa japonesa en formato fondo',
    description:
      'El Vanguard Japan Stock Index Fund replica el MSCI Japan con unos gastos del 0,16 % anual. En un MSCI World, Japón pesa alrededor del 6 %, así que añadir este fondo a una cartera global sube ese peso en vez de añadir empresas nuevas. El fondo está denominado en euros, pero las empresas cotizan en yenes: la exposición a divisa existe aunque no se vea en el valor liquidativo.',
    etfEquivalent: 'SJPA',
    faq: [
      { q: '¿La exposición que calcula el analizador es exacta?', a: 'Es aproximada, y se dice en pantalla. La exposición se toma del ETF del catálogo que replica el índice más cercano, que en este caso sigue el MSCI Japan IMI: el mismo mercado, pero incluyendo también pequeña capitalización. El reparto por sector y por región sale casi igual; el matiz queda anotado en el resultado.' },
    ],
  },
  {
    slug: 'vanguard-euro-government-bond-index',
    name: 'Vanguard Euro Government Bond Index Fund',
    manager: 'Vanguard',
    isin: 'IE0007472115',
    // Verificado el 19-sep-2026 en el registro: «VANGUARD EURO GOVERNMENT BOND INDEX INVESTOR
    // EUR CAP | VANGUARD ASSET MANAGEMENT | Bloomberg Euro Government Float Adjusted Bond
    // Index | 0,12 %».
    index: 'Bloomberg Euro Government Float Adjusted',
    ter: 0.12,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado',
    tagline: 'Deuda pública de la eurozona, sin riesgo divisa',
    description:
      'El Vanguard Euro Government Bond Index Fund replica el Bloomberg Euro Government Float Adjusted con unos gastos del 0,12 % anual. Son bonos emitidos por estados de la eurozona y denominados en euros, así que para alguien que gasta en euros no hay riesgo de divisa. El «float adjusted» significa que pondera por la deuda realmente negociable, no por la emitida, lo que reduce algo el peso de los países cuyos bonos estan en manos del banco central.',
    etfEquivalent: 'VGEA',
    faq: [
      { q: '¿Qué hace la renta fija en una cartera indexada?', a: 'Amortiguar. La deuda pública de la eurozona se mueve mucho menos que la bolsa y suele caer menos en los años malos, de modo que su función es reducir la oscilación del conjunto, no aportar rentabilidad. Cuanto peso darle es una decisión personal que depende del plazo y de lo que cada uno aguanta ver en rojo.' },
    ],
  },
  {
    slug: 'vanguard-global-stock',
    name: 'Vanguard Global Stock Index Fund',
    manager: 'Vanguard',
    isin: 'IE00B03HCZ61',
    index: 'MSCI World',
    ter: 0.18,
    assetClass: 'Renta variable',
    region: 'Global desarrollados',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor', 'Renta 4', 'BNP Paribas'],
    minimum: '1€ (MyInvestor)',
    tagline: 'El clásico fondo indexado MSCI World de Vanguard en España',
    description:
      'El Vanguard Global Stock Index Fund replica el MSCI World con la calidad y reputación de Vanguard, la gestora fundada por John Bogle. TER 0,18%, acumulación, disponible en MyInvestor desde 1€ con traspaso fiscal libre. Tiene dos clases con la misma comisión, 0,18 % según Vanguard: la Investor de esta ficha y la EUR Acc, que están en el cuadro de abajo.',
    etfEquivalent: 'IWDA',
    faq: [
      { q: '¿Es lo mismo que el Amundi Prime Global?', a: 'No. El Amundi Prime Global es un ETF, no un fondo: sigue un índice de Solactive y no se puede traspasar a otro fondo sin tributar. El Vanguard Global Stock es un fondo que replica el MSCI World, con unos gastos del 0,18 % según la ficha de Vanguard, y sí entra en el régimen de traspasos.' },
      { q: '¿El Vanguard Global Stock permite traspaso fiscal libre?', a: 'Sí. Al ser un fondo de inversión (no un ETF), permite traspaso libre entre fondos sin tributar en España. Puedes mover dinero entre este y otros fondos indexados difiriendo el IRPF hasta el reembolso final.' },
    ],
  },
  {
    // Renombrado el 18-sep-2026 de `fidelity-msci-world` a `fidelity-sp500`, con redirect
    // 301 de la URL antigua y de las dos comparativas que la usaban (ver `next.config.ts`).
    // El slug anterior afirmaba que era un MSCI World, y una URL es una afirmacion: se lee
    // en el resultado de busqueda sin abrir la pagina.
    slug: 'fidelity-sp500',
    name: 'Fidelity S&P 500 Index Fund',
    manager: 'Fidelity',
    isin: 'IE00BYX5MX67',
    avisoDeRevision:
      'Esta ficha decía «Fidelity MSCI World Index Fund» con un TER del 0,12 % y el producto real es el «FIDELITY S&P 500 INDEX FUND P-ACC-EUR», con gastos del 0,06 %. Corregido el 18-sep-2026. La dirección de la página sigue diciendo «msci-world» porque cambiarla rompería los enlaces que ya apuntan aquí: es un S&P 500, o sea solo Estados Unidos, no renta variable mundial.',
    // Verificado el 18-sep-2026 en el registro: «FIDELITY S&P 500 INDEX FUND P-ACC-EUR»,
    // indice S&P 500, gastos corrientes 0,06 %. La ficha decia «MSCI World» con TER 0,12 %:
    // nombre, indice y comision estaban los tres mal, y durante un dia el analizador le dio
    // exposicion MSCI World a un fondo 100 % estadounidense.
    index: 'S&P 500',
    ter: 0.06,
    assetClass: 'Renta variable',
    region: 'Estados Unidos',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor'],
    minimum: '1€',
    tagline: 'S&P 500 de Fidelity al 0,06 %, uno de los indexados más baratos en España',
    description:
      'El Fidelity S&P 500 Index Fund replica el S&P 500 con unos gastos corrientes del 0,06 %, lo que lo sitúa entre los fondos indexados más baratos disponibles en España y por debajo del Vanguard U.S. 500 Stock Index (0,10 %), que sigue el mismo índice. Da exposición a las grandes empresas estadounidenses, no a renta variable mundial: quien busque global necesita otro producto. Disponible en MyInvestor, y como fondo se puede traspasar a otro fondo sin tributar.',
    etfEquivalent: 'CSPX',
    faq: [
      { q: '¿En qué se diferencia del Vanguard U.S. 500 Stock Index?', a: 'Los dos replican el S&P 500. El Fidelity cuesta un 0,06 % anual y el Vanguard un 0,10 %, así que sobre 10.000 € la diferencia es de unos 4 € al año. Ambos son fondos, no ETFs, así que se pueden traspasar entre sí sin tributar.' },
      { q: '¿Es un fondo global?', a: 'No. El S&P 500 son 500 grandes empresas de Estados Unidos, así que la exposición es de un solo país. Un fondo de renta variable mundial como el Vanguard Global Stock Index (MSCI World) incluye además Europa, Japón y el resto de mercados desarrollados.' },
    ],
  },
  {
    slug: 'vanguard-us-500-stock',
    name: 'Vanguard U.S. 500 Stock Index Fund',
    manager: 'Vanguard',
    isin: 'IE0032126645',
    index: 'S&P 500',
    ter: 0.10,
    assetClass: 'Renta variable',
    region: 'Estados Unidos',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor', 'Renta 4'],
    minimum: '1€ (MyInvestor)',
    tagline: 'El fondo indexado S&P 500 de Vanguard para España',
    description:
      'El Vanguard U.S. 500 Stock Index Fund replica el S&P 500 (500 mayores empresas de EE.UU.) con TER 0,10%. Es el equivalente en formato fondo del popular ETF CSPX/VUAA. Disponible en MyInvestor desde 1€ con traspaso fiscal libre. Da exposición a un solo país, Estados Unidos, con la fiscalidad de los fondos en España.',
    etfEquivalent: 'CSPX',
    faq: [
      { q: '¿En qué se diferencia del ETF CSPX?', a: 'Los dos replican el S&P 500. Este fondo cuesta 0,10 % según Vanguard y se puede traspasar a otro fondo sin tributar en ese momento; el ETF CSPX es algo más barato y, como cualquier ETF, tributa cada vez que se vende. Qué pesa más depende de si se va a mover el dinero entre productos o no.' },
    ],
  },
  {
    slug: 'amundi-index-msci-emerging-markets',
    name: 'Amundi Core MSCI Emerging Markets',
    manager: 'Amundi',
    isin: 'LU0996177134',
    // CORREGIDO el 28-sep-2026: 0,30 % → 0,45 %. El Documento de Datos Fundamentales de la
    // GESTORA (amundi.es, publicado el 28/04/2026) dice «Amundi Core MSCI Emerging Markets AE |
    // Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,45 %».
    // Lo que sigue es la historia anterior, que se conserva: el registro tampoco acertaba.
    // Verificado el 18-sep-2026 en el registro: «AMUNDI CORE MSCI EMERGING MARKETS AE CAP |
    // AMUNDI ASSET MANAGEMENT | MSCI Emerging Markets | 0,30 %». La ficha decía «Amundi Index»
    // y 0,20 %: el nombre era de otra gama y la comisión, la mitad de la real. El índice sí
    // era correcto, y por eso el fondo sí se puede analizar una vez corregido.
    index: 'MSCI Emerging Markets',
    ter: 0.45,
    assetClass: 'Renta variable',
    region: 'Emergentes',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor'],
    minimum: '1€',
    tagline: 'Exposición a mercados emergentes en formato fondo con traspaso libre',
    description:
      'El Amundi Core MSCI Emerging Markets replica el índice MSCI Emerging Markets (China, India, Taiwán, Corea, Brasil y otros) con unos gastos del 0,45 % en su clase AE, según el documento de datos fundamentales de Amundi de abril de 2026; su clase IE cuesta 0,20 %. Cubre la parte de emergentes de una cartera global, que por capitalización ronda el 10-12 %. Ojo al nombre: la gama «Core» de Amundi no es la gama «Index», y sus comisiones no son las mismas, así que conviene comprobar el ISIN y no el nombre al buscarlo.',
    etfEquivalent: 'EIMI',
    faq: [
      { q: '¿Cuánto peso dar a emergentes con este fondo?', a: 'El peso "neutral" por capitalización global ronda el 12 %. Combinado con un fondo de mercados desarrollados, una proporción de 85/15 o 88/12 se aproxima a un MSCI ACWI. Por encima del 20 % en emergentes ya es una apuesta activa respecto al mercado mundial.' },
    ],
  },
  {
    slug: 'vanguard-emerging-markets-stock',
    name: 'Vanguard Emerging Markets Stock Index Fund',
    manager: 'Vanguard',
    isin: 'IE0031786142',
    index: 'MSCI Emerging Markets',
    ter: 0.23,
    assetClass: 'Renta variable',
    region: 'Emergentes',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor', 'Renta 4'],
    minimum: '1€ (MyInvestor)',
    tagline: 'Emergentes de Vanguard en formato fondo',
    description:
      'El Vanguard Emerging Markets Stock Index Fund da exposición a mercados emergentes con la reputación de Vanguard, TER 0,23%. Disponible en MyInvestor con traspaso fiscal libre. Replica el MSCI Emerging Markets, grandes y medianas empresas, sin pequeñas.',
    // AEEM y no VFEM: este fondo replica el MSCI Emerging Markets (factsheet de Vanguard
    // del 31-ago-2026, ticker de indice MSDEEEMN) y VFEM es FTSE Emerging, otra familia de
    // indices que ademas clasifica Corea del Sur de otra forma. Corregido el 18-sep-2026.
    etfEquivalent: 'AEEM',
    faq: [
      { q: '¿En qué se diferencia del fondo de emergentes de Amundi?', a: 'En la comisión, no en el índice: los dos replican el MSCI Emerging Markets. Según la documentación de cada gestora de septiembre de 2026, esta clase Investor de Vanguard cuesta 0,23 %, y el Amundi Core MSCI Emerging Markets cuesta 0,45 % en su clase AE y 0,20 % en su clase IE. Cuál pagas depende de la clase que te ofrezca tu plataforma.' },
    ],
  },
  {
    slug: 'vanguard-global-bond-eur-hedged',
    name: 'Vanguard Global Bond Index Fund EUR Hedged',
    manager: 'Vanguard',
    isin: 'IE00B18GC888',
    avisoDeRevision:
      'Verificado el 18-sep-2026 en el registro: «VANGUARD GLOBAL BOND INDEX GENERAL EUR HEDGED CAP», indice Bloomberg Global Aggregate Float Adjusted and Scaled, gastos 0,15 %. El TER y el nombre coinciden con esta ficha; el indice es una variante «float adjusted and scaled» del Global Aggregate, un detalle que la ficha no precisaba.',
    index: 'Bloomberg Global Aggregate Bond (EUR Hedged)',
    ter: 0.15,
    assetClass: 'Renta fija',
    region: 'Global',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor', 'Renta 4'],
    minimum: '1€ (MyInvestor)',
    tagline: 'Renta fija global con cobertura EUR en formato fondo',
    description:
      'El Vanguard Global Bond Index Fund EUR Hedged replica el Bloomberg Global Aggregate Bond con cobertura en euros, TER 0,15%. Es el equivalente en formato fondo del ETF AGGH, ideal para la parte de renta fija de una cartera Boglehead española. La cobertura EUR es imprescindible en renta fija para que la divisa no domine el comportamiento. Traspaso fiscal libre.',
    etfEquivalent: 'AGGH',
    faq: [
      { q: '¿Por qué renta fija con cobertura EUR?', a: 'La renta fija tiene volatilidad baja (2-7% anual). Sin cobertura, el riesgo divisa (5-10% adicional) dominaría su comportamiento, anulando su función de amortiguador. La cobertura EUR mantiene la renta fija haciendo su trabajo: estabilizar la cartera.' },
    ],
  },
  {
    slug: 'amundi-index-eurozone-government-bond',
    name: 'Amundi Index Eurozone Government Bond',
    manager: 'Amundi',
    isin: 'LU1437015735',
    avisoDeRevision:
      'ATENCION: el registro de fondos consultado el 18-sep-2026 devuelve para este ISIN el «AMUNDI CORE MSCI EUROPE UCITS ETF DR CAP» —un ETF de renta VARIABLE europea con gastos del 0,05 %—, y no un fondo de renta FIJA de deuda publica de la eurozona como describe esta ficha. No reescribimos la ficha hacia ese dato porque solo tenemos una fuente y Amundi fusiono y renombro muchos productos en 2024, asi que el ISIN pudo cambiar de subyacente. Lo que si esta claro es que NO se puede usar esta ficha para decidir: si buscas renta fija, comprueba el producto en tu plataforma antes de nada.',
    index: 'Bonos gobierno eurozona',
    ter: 0.15,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor'],
    minimum: '1€',
    tagline: 'Bonos gubernamentales de la eurozona, sin riesgo divisa',
    description:
      'El Amundi Index Eurozone Government Bond replica bonos gubernamentales de países de la eurozona (Alemania, Francia, Italia, España, Países Bajos), TER 0,15%. Al ser activos en euros, no hay riesgo divisa. Opción conservadora para la parte de renta fija de una cartera, con traspaso fiscal libre.',
    etfEquivalent: 'EUNA',
    faq: [
      { q: '¿Bonos eurozona o renta fija global hedged?', a: 'Bonos eurozona (Amundi Eurozone Government) no tienen riesgo divisa porque son en euros — máxima simplicidad y seguridad. Renta fija global hedged (Vanguard Global Bond) diversifica más geográficamente con cobertura EUR. Ambos son válidos; los bonos eurozona son más sencillos de entender.' },
    ],
  },
  {
    slug: 'vanguard-eurozone-stock',
    name: 'Vanguard European Stock Index Fund',
    manager: 'Vanguard',
    isin: 'IE0007987690',
    avisoDeRevision:
      'Esta ficha decia «Vanguard Eurozone Stock Index Fund», indice «MSCI EMU» y TER 0,16 %. Verificado el 18-sep-2026 en el registro: es el «VANGUARD EUROPEAN STOCK INDEX INVESTOR EUR CAP», que replica el MSCI Europe con unos gastos del 0,12 %. Ya esta corregido arriba. La diferencia importa: el MSCI Europe incluye Reino Unido, Suiza, Suecia, Dinamarca y Noruega, que el MSCI EMU no, asi que no es un producto «solo eurozona» ni elimina el riesgo divisa.',
    // Verificado el 18-sep-2026 en el registro: «VANGUARD EUROPEAN STOCK INDEX INVESTOR EUR
    // CAP | MSCI Europe Index | 0,12 %». La ficha decia «Eurozone Stock», indice «MSCI EMU» y
    // TER 0,16: los tres datos estaban mal. Y la diferencia no es de matiz — el MSCI Europe
    // incluye Reino Unido, Suiza, Suecia, Dinamarca y Noruega, que el MSCI EMU no.
    //
    // Consecuencia: el 17-sep saque este fondo del analisis diciendo «replica el MSCI EMU y
    // no hay ETF de ese indice en el catalogo». Replica MSCI Europe, del que hay TRES. El
    // motivo de la exclusion era falso porque partia de nuestro propio dato equivocado.
    index: 'MSCI Europe',
    ter: 0.12,
    assetClass: 'Renta variable',
    region: 'Europa desarrollada',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor', 'Renta 4'],
    minimum: '1€ (MyInvestor)',
    tagline: 'Bolsa europea desarrollada en formato fondo, con traspaso fiscal libre',
    description:
      'El Vanguard European Stock Index Fund replica el MSCI Europe con unos gastos del 0,12 %. Ojo a un detalle que se confunde a menudo: el MSCI Europe NO es solo la eurozona — incluye Reino Unido, Suiza, Suecia, Dinamarca y Noruega, que tienen su propia divisa. Asi que sobreponderar Europa con este fondo no elimina el riesgo divisa, solo lo reduce. Es un complemento de una cartera global, no un sustituto.',
    etfEquivalent: 'IMEU',
    faq: [
      { q: '¿Este fondo es solo de la eurozona?', a: 'No, y es la confusión más habitual con este producto. Replica el MSCI Europe, que incluye Reino Unido, Suiza, Suecia, Dinamarca y Noruega además de los países del euro. Si lo que se busca es exclusivamente eurozona, el índice sería el MSCI EMU, que es otro.' },
      { q: '¿Elimina el riesgo divisa por estar en euros?', a: 'El fondo está denominado en euros, pero parte de las empresas que lo componen cotizan en libras, francos suizos o coronas, así que la exposición a divisa existe aunque no se vea en el valor liquidativo. Un fondo de renta variable de la eurozona sí la evitaría; este la reduce respecto a un global, no la elimina.' },
    ],
  },
  {
    slug: 'fidelity-emerging-markets-index',
    name: 'Fidelity MSCI Emerging Markets Index Fund',
    manager: 'Fidelity',
    isin: 'IE00BYX5M476',
    // El catálogo decía `IE00BYX5L514`, que NO es un ISIN: su dígito de control no cuadra
    // (debería acabar en 0 y acababa en 4), así que no podía existir ningún producto con él.
    // El 18-sep-2026 se dió por hecho que era un límite del registro consultado; era un ISIN
    // inventado. Verificado en el registro: «FIDELITY MSCI EMERGING MARKETS INDEX FUND
    // P-ACC-EUR | FIL INVESTMENTS INTERNATIONAL | MSCI Emerging Markets Index | 0,20 %».
    // Índice y TER sí eran correctos; al nombre le faltaba «MSCI».
    index: 'MSCI Emerging Markets',
    ter: 0.20,
    assetClass: 'Renta variable',
    region: 'Emergentes',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor'],
    minimum: '1€',
    tagline: 'Emergentes de Fidelity con TER competitivo',
    description:
      'El Fidelity Emerging Markets Index Fund replica el MSCI Emerging Markets con TER 0,20%. Alternativa a Amundi y Vanguard para la exposición a emergentes en formato fondo, con traspaso fiscal libre en MyInvestor.',
    etfEquivalent: 'EIMI',
    faq: [
      { q: '¿En qué se diferencian los fondos de emergentes del catálogo?', a: 'En la comisión de cada clase, porque el índice es el mismo, el MSCI Emerging Markets. Con los datos de cada gestora de septiembre de 2026: Fidelity 0,20 %, Vanguard 0,23 % en su clase Investor, Amundi 0,45 % en su clase AE y 0,20 % en la IE, y Pictet 0,58 % en su clase P. La cartera es prácticamente la misma.' },
    ],
  },
  // ---------------------------------------------------------------------------------------
  // Lote del 28-sep-2026: 29 fondos de Vanguard, Amundi, Pictet, Fidelity y State Street,
  // todos verificados en la web o en los documentos legales de la GESTORA ese mismo día.
  // Salen de la hoja comunitaria de dullinvestor (bogleheads.es, t=89), que solo dice QUÉ
  // mirar: ningún dato de aquí se ha copiado de ella. Las clases hermanas de fondos que ya
  // estaban van a fund-classes.ts, sin página propia.
  // ---------------------------------------------------------------------------------------
  {
    slug: 'vanguard-pacific-ex-japan-stock-index',
    name: 'Vanguard Pacific ex-Japan Stock Index Fund (clase EUR Acc)',
    manager: 'Vanguard',
    isin: 'IE0007201266',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9211/pacific-ex-japan-stock-index-fund-eur-acc): «Pacific ex-Japan Stock Index Fund - EUR Acc (VAPEJEI) | Índice de referencia: MSCI Pacific ex Japan Index | Comisión: 0,16 %»
    index: 'MSCI Pacific ex Japan',
    ter: 0.16,
    assetClass: 'Renta variable',
    region: 'Pacífico sin Japón',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Australia, Hong Kong, Singapur y Nueva Zelanda en formato fondo, al 0,16 %',
    description:
      'El Vanguard Pacific ex-Japan Stock Index Fund replica el MSCI Pacific ex Japan con unos gastos del 0,16 % anual, según la ficha de Vanguard. Son las grandes y medianas empresas de los cuatro mercados desarrollados de Asia-Pacífico que no son Japón: Australia, Hong Kong, Singapur y Nueva Zelanda. En un MSCI World esta región pesa poco, así que añadir este fondo a uno global sube ese peso en vez de añadir empresas nuevas.',
    etfEquivalent: 'CPXJ',
    faq: [
      { q: '¿Qué países entran en el MSCI Pacific ex Japan?', a: 'Cuatro mercados desarrollados de Asia-Pacífico: Australia, Hong Kong, Singapur y Nueva Zelanda. Japón queda fuera porque tiene su propio índice, y China también, porque MSCI la clasifica como emergente. Es la región más pequeña de las que forman el MSCI World.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-eurozone-stock-index',
    name: 'Vanguard Eurozone Stock Index Fund (clase EUR Acc)',
    manager: 'Vanguard',
    isin: 'IE0008248803',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9927/eurozone-stock-index-fund-eur-acc): «Eurozone Stock Index Fund - EUR Acc (VANESII) | Índice de referencia: MSCI EMU Index | Comisión: 0,12 %»
    index: 'MSCI EMU',
    ter: 0.12,
    assetClass: 'Renta variable',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Solo las bolsas del euro, sin Reino Unido ni Suiza, al 0,12 %',
    description:
      'El Vanguard Eurozone Stock Index Fund replica el MSCI EMU con unos gastos del 0,12 % anual, según la ficha de Vanguard. El MSCI EMU solo incluye empresas de los países que usan el euro, así que deja fuera a Reino Unido, Suiza, Suecia, Dinamarca y Noruega. No hay que confundirlo con el Vanguard European Stock Index, que replica el MSCI Europe y sí los incluye: nombres parecidos, índices distintos.',
    faq: [
      { q: '¿En qué se diferencia del Vanguard European Stock Index?', a: 'En el índice. Este replica el MSCI EMU, solo eurozona, y todas sus acciones cotizan en euros. El European Stock replica el MSCI Europe, que además incluye Reino Unido, Suiza y los nórdicos, cuyas acciones cotizan en libras, francos o coronas. Los dos cuestan 0,12 % según Vanguard.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-us-government-bond-index',
    name: 'Vanguard U.S. Government Bond Index Fund (clase EUR Hedged Acc)',
    manager: 'Vanguard',
    isin: 'IE0007471471',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9284/us-government-bond-index-fund-eur-hedged-acc): «U.S. Government Bond Index Fund - EUR Hedged Acc (VGUGBSE) | Índice de referencia: Bloomberg U.S. Government Float Adjusted Bond Index in EUR | Comisión: 0,12 %»
    index: 'Bloomberg U.S. Government Float Adjusted (cubierto a EUR)',
    ter: 0.12,
    assetClass: 'Renta fija',
    region: 'Estados Unidos',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Deuda pública de Estados Unidos con el dólar cubierto a euros',
    description:
      'El Vanguard U.S. Government Bond Index Fund replica el Bloomberg U.S. Government Float Adjusted con unos gastos del 0,12 % anual en su clase cubierta a euros, según la ficha de Vanguard. Son bonos emitidos por el Gobierno de Estados Unidos. La cobertura hace que el movimiento del dólar frente al euro apenas afecte al valor liquidativo; lo que queda es el efecto de los tipos de interés estadounidenses.',
    faq: [
      { q: '¿Qué hace la cobertura a euros?', a: 'Neutraliza casi todo el efecto del tipo de cambio dólar-euro sobre el valor del fondo. Sin cobertura, una caída del dólar restaría rentabilidad aunque los bonos subieran; con ella, lo que mueve el fondo son sobre todo los tipos de interés de Estados Unidos. La cobertura tiene un coste que depende de la diferencia de tipos entre las dos zonas y no aparece en la comisión.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-euro-investment-grade-bond-index',
    name: 'Vanguard Euro Investment Grade Bond Index Fund (clase EUR Acc)',
    manager: 'Vanguard',
    isin: 'IE00B04FFJ44',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9991/euro-investment-grade-bond-index-fund-eur-acc): «Euro Investment Grade Bond Index Fund - EUR Acc (VANEIGB) | Índice de referencia: Bloomberg EUR Non-Government Float Adjusted Bond Index | Comisión: 0,12 %»
    index: 'Bloomberg EUR Non-Government Float Adjusted',
    ter: 0.12,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Bonos en euros con grado de inversión que no emite un Estado',
    description:
      'El Vanguard Euro Investment Grade Bond Index Fund replica el Bloomberg EUR Non-Government Float Adjusted con unos gastos del 0,12 % anual, según la ficha de Vanguard. Pese al nombre, el índice no se define por ser de empresas sino por no ser deuda de un Estado: recoge los bonos en euros con grado de inversión emitidos por quien no es un gobierno central. Por eso paga algo más que la deuda pública y tiene algo más de riesgo de impago.',
    faq: [
      { q: '¿Es un fondo de bonos corporativos?', a: 'En buena parte, pero no solo. El índice es de deuda en euros «no gubernamental»: todo lo que tiene grado de inversión y no emite un Estado. Las empresas son el grueso, y el desglose exacto por tipo de emisor lo publica Vanguard en la ficha del fondo.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-eurozone-inflation-linked-bond-index',
    name: 'Vanguard Eurozone Inflation-Linked Bond Index Fund (clase EUR Acc)',
    manager: 'Vanguard',
    isin: 'IE00B04GQR24',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9104/eurozone-inflation-linked-bond-index-fund-eur-acc): «Eurozone Inflation-Linked Bond Index Fund - EUR Acc (VANEZON) | Índice de referencia: Bloomberg Global Inflation-Linked: Eurozone - Euro CPI Index | Comisión: 0,12 %»
    index: 'Bloomberg Global Inflation-Linked Eurozone (Euro CPI)',
    ter: 0.12,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Deuda pública del euro que se ajusta con la inflación',
    description:
      'El Vanguard Eurozone Inflation-Linked Bond Index Fund replica el Bloomberg Global Inflation-Linked: Eurozone - Euro CPI con unos gastos del 0,12 % anual, según la ficha de Vanguard. Son bonos de Estados de la eurozona cuyo principal se ajusta con la inflación de la zona euro. Protegen del dato de inflación, pero su precio sigue dependiendo de los tipos de interés reales.',
    faq: [
      { q: '¿Protegen de la inflación siempre?', a: 'Protegen del dato de inflación, no de todo lo demás. El principal del bono se ajusta con el IPC de la eurozona, pero su precio también depende de los tipos de interés reales: si suben, el precio baja aunque la inflación sea alta. Por eso un fondo de bonos ligados a la inflación puede perder dinero en un año de inflación alta.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-20-year-euro-treasury-index',
    name: 'Vanguard 20+ Year Euro Treasury Index Fund (clase Euro Shares)',
    manager: 'Vanguard',
    isin: 'IE00B246KL88',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9132/20-year-euro-treasury-index-fund-eur-acc): «20+ Year Euro Treasury Index Fund - Euro Shares (VGYETII) | Índice de referencia: Bloomberg Euro Treasury 20+ Year Bond Index | Comisión: 0,16 %»
    index: 'Bloomberg Euro Treasury 20+ Year',
    ter: 0.16,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Deuda pública del euro a más de 20 años: la parte más sensible a los tipos',
    description:
      'El Vanguard 20+ Year Euro Treasury Index Fund replica el Bloomberg Euro Treasury 20+ Year con unos gastos del 0,16 % anual, según la ficha de Vanguard. Solo compra bonos de Estados de la eurozona a los que les quedan más de 20 años de vida. Con un plazo tan largo, su precio reacciona mucho a los tipos de interés: sube con fuerza cuando bajan y cae con fuerza cuando suben, bastante más que un fondo de deuda pública con todos los plazos.',
    etfEquivalent: 'VGEA',
    faq: [
      { q: '¿Es igual de estable que un fondo de deuda pública normal?', a: 'No. Con el mismo emisor, cuanto más largo es el plazo, más se mueve el precio cuando cambian los tipos. Un fondo de bonos a más de 20 años puede tener caídas de doble dígito en un año de subidas de tipos, algo raro en deuda pública a plazos cortos. Es el mismo riesgo de impago con mucho más riesgo de tipos.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-esg-developed-europe-index',
    name: 'Vanguard ESG Developed Europe Index Fund (clase EUR Acc)',
    manager: 'Vanguard',
    isin: 'IE00B526YN16',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9163/esg-developed-europe-index-fund-eur-acc): «ESG Developed Europe Index Fund - EUR Acc (VGSESIE) | Índice de referencia: FTSE Developed Europe Choice Index | Comisión: 0,14 %»
    index: 'FTSE Developed Europe Choice',
    ter: 0.14,
    assetClass: 'Renta variable',
    region: 'Europa desarrollada',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Bolsa europea desarrollada con exclusiones ESG, al 0,14 %',
    description:
      'El Vanguard ESG Developed Europe Index Fund replica el FTSE Developed Europe Choice con unos gastos del 0,14 % anual, según la ficha de Vanguard. Es el índice europeo desarrollado de FTSE, con Reino Unido, Suiza y los nórdicos, al que se le quitan empresas por su actividad. Por eso no es exactamente la misma cartera que un índice europeo sin filtro: faltan algunas empresas y las que quedan pesan algo más.',
    etfEquivalent: 'VEUR',
    faq: [
      { q: '¿Qué excluye un índice «Choice»?', a: 'Empresas cuya actividad queda fuera de los criterios del índice: entre otras, energía no renovable, armas y productos como el tabaco, además de las que incumplen ciertas normas de conducta. La lista exacta está en la metodología de FTSE Russell. El efecto práctico es que el fondo pesa menos en energía que el índice sin filtro.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-esg-developed-world-all-cap-index',
    name: 'Vanguard ESG Developed World All Cap Equity Index Fund (clase EUR Acc)',
    manager: 'Vanguard',
    isin: 'IE00B5456744',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9164/esg-developed-world-all-cap-equity-index-fund-eur-acc): «ESG Developed World All Cap Equity Index Fund - EUR Acc (VGSGSIE) | Índice de referencia: FTSE Developed All Cap Choice Index | Comisión: 0,20 %»
    index: 'FTSE Developed All Cap Choice',
    ter: 0.20,
    assetClass: 'Renta variable',
    region: 'Global desarrollado',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Países desarrollados con pequeñas empresas y exclusiones ESG',
    description:
      'El Vanguard ESG Developed World All Cap Equity Index Fund replica el FTSE Developed All Cap Choice con unos gastos del 0,20 % anual, según la ficha de Vanguard. Se diferencia de un MSCI World en tres cosas: incluye pequeñas empresas, excluye algunas por su actividad, y usa la clasificación de países de FTSE, que cuenta a Corea del Sur como mercado desarrollado y MSCI no.',
    etfEquivalent: 'IWDA',
    faq: [
      { q: '¿Cubre lo mismo que un fondo del MSCI World?', a: 'Casi, con tres diferencias: añade pequeñas empresas, quita las excluidas por los criterios del índice y mete Corea del Sur, que para FTSE es desarrollado y para MSCI emergente. Juntarlo con un fondo de emergentes que siga un índice MSCI haría que Corea contara dos veces; con uno de emergentes de FTSE, no.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-global-corporate-bond-index',
    name: 'Vanguard Global Corporate Bond Index Fund (clase EUR Hedged Acc)',
    manager: 'Vanguard',
    isin: 'IE00BDFB5N63',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9459/global-corporate-bond-index-fund-eur-hedged-acc): «Global Corporate Bond Index Fund - EUR Hedged Acc (VAIHAHE) | Índice de referencia: Bloomberg Global Aggregate Float Adjusted Corporate Index in EUR | Comisión: 0,18 %»
    index: 'Bloomberg Global Aggregate Corporate (cubierto a EUR)',
    ter: 0.18,
    assetClass: 'Renta fija',
    region: 'Global',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Bonos de empresas de todo el mundo con la divisa cubierta a euros',
    description:
      'El Vanguard Global Corporate Bond Index Fund replica el Bloomberg Global Aggregate Float Adjusted Corporate con unos gastos del 0,18 % anual en su clase cubierta a euros, según la ficha de Vanguard. Son bonos de empresas con grado de inversión de muchos países, no deuda pública. Pagan algo más que los bonos del Estado a cambio de un riesgo de impago mayor, que se nota sobre todo en las crisis.',
    faq: [
      { q: '¿En qué se diferencia de un fondo de renta fija global agregada?', a: 'En el emisor. Un índice agregado mezcla deuda pública y de empresas, y la pública suele ser la mayor parte. Este índice es solo de empresas, así que tiene más riesgo de crédito: en una recesión sus precios pueden caer mientras la deuda pública sube.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-global-short-term-corporate-bond-index',
    name: 'Vanguard Global Short-Term Corporate Bond Index Fund (clase EUR Hedged Acc)',
    manager: 'Vanguard',
    isin: 'IE00BDFB7290',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9544/global-short-term-corporate-bond-index-fund-eur-hedged-acc): «Global Short-Term Corporate Bond Index Fund - EUR Hedged Acc (VACBIEH) | Índice de referencia: Bloomberg Global Aggregate Corporate 1-5 Year Float Adjusted Index in EUR | Comisión: 0,18 %»
    index: 'Bloomberg Global Aggregate Corporate 1-5 Year (cubierto a EUR)',
    ter: 0.18,
    assetClass: 'Renta fija',
    region: 'Global',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Bonos de empresas a uno-cinco años, de todo el mundo, cubiertos a euros',
    description:
      'El Vanguard Global Short-Term Corporate Bond Index Fund replica el Bloomberg Global Aggregate Corporate 1-5 Year Float Adjusted con unos gastos del 0,18 % anual en su clase cubierta a euros, según la ficha de Vanguard. Es el mismo tipo de bono que el fondo corporativo global de Vanguard, pero solo con vencimientos de uno a cinco años: el precio se mueve menos cuando cambian los tipos, y el riesgo de que la empresa no pague sigue ahí.',
    faq: [
      { q: '¿Qué aporta el plazo corto?', a: 'Menos sensibilidad a los tipos de interés. Un bono que vence en dos o tres años cambia poco de precio cuando los tipos suben un punto; uno a diez años cambia bastante más. Lo que no reduce el plazo corto es el riesgo de crédito: siguen siendo bonos de empresas.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-global-short-term-bond-index',
    name: 'Vanguard Global Short-Term Bond Index Fund (clase EUR Hedged Acc)',
    manager: 'Vanguard',
    isin: 'IE00BH65QP47',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9110/global-short-term-bond-index-fund-eur-hedged-acc): «Global Short-Term Bond Index Fund - EUR Hedged Acc (VGSTIEH) | Índice de referencia: Bloomberg Global Aggregate Ex US MBS 1-5 Year Float Adjusted and Scaled Index in EUR | Comisión: 0,15 %»
    index: 'Bloomberg Global Aggregate ex US MBS 1-5 Year (cubierto a EUR)',
    ter: 0.15,
    assetClass: 'Renta fija',
    region: 'Global',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Renta fija global a uno-cinco años, cubierta a euros',
    description:
      'El Vanguard Global Short-Term Bond Index Fund replica el Bloomberg Global Aggregate ex US MBS 1-5 Year Float Adjusted and Scaled con unos gastos del 0,15 % anual en su clase cubierta a euros, según la ficha de Vanguard. Es renta fija global agregada, deuda pública y de empresas de muchos países, con vencimientos de uno a cinco años y sin las titulizaciones hipotecarias estadounidenses. El plazo corto hace que su precio se mueva poco cuando cambian los tipos.',
    etfEquivalent: 'AGGH',
    faq: [
      { q: '¿Qué significa «ex US MBS»?', a: 'Que el índice deja fuera las titulizaciones hipotecarias de Estados Unidos, bonos respaldados por hipotecas que en el índice global completo tienen un peso importante. El resto, deuda pública, de agencias y de empresas de muchos países, se queda.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-esg-emerging-markets-all-cap-index',
    name: 'Vanguard ESG Emerging Markets All Cap Equity Index Fund (clase EUR Acc)',
    manager: 'Vanguard',
    isin: 'IE00BKV0W243',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9684/esg-emerging-markets-all-cap-equity-index-fund-eur-acc): «ESG Emerging Markets All Cap Equity Index Fund - EUR Acc (VAEAIIE) | Índice de referencia: FTSE Emerging All Cap Choice Index | Comisión: 0,25 %»
    index: 'FTSE Emerging All Cap Choice',
    ter: 0.25,
    assetClass: 'Renta variable',
    region: 'Emergentes',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Emergentes con pequeñas empresas y exclusiones ESG, sin Corea del Sur',
    description:
      'El Vanguard ESG Emerging Markets All Cap Equity Index Fund replica el FTSE Emerging All Cap Choice con unos gastos del 0,25 % anual, según la ficha de Vanguard. Es un índice de emergentes de FTSE, no de MSCI, y la diferencia importa: FTSE clasifica Corea del Sur como país desarrollado, así que aquí no está, mientras que en un MSCI Emerging Markets sí. Además incluye pequeñas empresas y excluye algunas por su actividad.',
    etfEquivalent: 'VFEM',
    faq: [
      { q: '¿Por qué no incluye Corea del Sur?', a: 'Porque es un índice de FTSE, y FTSE considera Corea del Sur mercado desarrollado. MSCI la sigue clasificando como emergente. Si se combina este fondo con uno de países desarrollados que siga un índice MSCI, Corea no aparece en ninguno de los dos.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-uk-government-bond-index',
    name: 'Vanguard U.K. Government Bond Index Fund (clase EUR Hedged Acc)',
    manager: 'Vanguard',
    isin: 'IE00BLPJRG31',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9462/uk-government-bond-index-fund-eur-hedged-acc): «U.K. Government Bond Index Fund - EUR Hedged Acc (VAUKGEH) | Índice de referencia: Bloomberg U.K. Government Float Adjusted Bond Index Hedged in EUR | Comisión: 0,12 %»
    index: 'Bloomberg U.K. Government Float Adjusted (cubierto a EUR)',
    ter: 0.12,
    assetClass: 'Renta fija',
    region: 'Reino Unido',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Deuda pública británica con la libra cubierta a euros',
    description:
      'El Vanguard U.K. Government Bond Index Fund replica el Bloomberg U.K. Government Float Adjusted con unos gastos del 0,12 % anual en su clase cubierta a euros, según la ficha de Vanguard. Son bonos del Estado británico, los gilts. La cobertura quita casi todo el efecto de la libra frente al euro, así que lo que mueve el fondo son los tipos de interés del Reino Unido.',
    etfEquivalent: 'VGOV',
    faq: [
      { q: '¿Qué diferencia hay con un ETF de gilts sin cubrir?', a: 'La divisa. Un ETF de gilts en libras sube o baja también con el tipo de cambio libra-euro, que en renta fija puede pesar más que el propio bono. Esta clase cubre ese riesgo a euros. La cobertura no es gratis: su coste depende de la diferencia de tipos entre el Reino Unido y la eurozona.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'vanguard-japan-government-bond-index',
    name: 'Vanguard Japan Government Bond Index Fund (clase EUR Hedged Acc)',
    manager: 'Vanguard',
    isin: 'IE00BLPJRH48',
    // 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9463/japan-government-bond-index-fund-eur-hedged-acc): «Japan Government Bond Index Fund - EUR Hedged Acc (VAIHAHA) | Índice de referencia: Bloomberg Japan Government Float Adjusted Bond Index in EUR | Comisión: 0,12 %»
    index: 'Bloomberg Japan Government Float Adjusted (cubierto a EUR)',
    ter: 0.12,
    assetClass: 'Renta fija',
    region: 'Japón',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la ficha española de Vanguard muestra 1.000.000 € en todas sus clases, también en las que las plataformas ofrecen a particulares, así que no distingue una de otra. Compruébalo en tu plataforma',
    tagline: 'Deuda pública japonesa con el yen cubierto a euros',
    description:
      'El Vanguard Japan Government Bond Index Fund replica el Bloomberg Japan Government Float Adjusted con unos gastos del 0,12 % anual en su clase cubierta a euros, según la ficha de Vanguard. Son bonos del Estado japonés. La cobertura neutraliza casi todo el movimiento del yen frente al euro; lo que queda es el efecto de los tipos de interés en Japón.',
    faq: [
      { q: '¿Por qué cubrir el yen en un fondo de bonos?', a: 'Porque en renta fija la divisa puede moverse más que el propio bono: un año de yen débil podría borrar varios años de intereses. Con la cobertura, el resultado depende sobre todo de los bonos. Su coste depende de la diferencia de tipos entre Japón y la eurozona y no aparece en la comisión del fondo.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'amundi-core-msci-europe',
    name: 'Amundi Core MSCI Europe (clase AE)',
    manager: 'Amundi',
    isin: 'LU0389811885',
    // 28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0389811885/SPA/ESP, publicado el 05/06/2026): «Amundi Core MSCI Europe AE | objetivo: replicar la rentabilidad del MSCI Europe Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,30 % del valor de su inversión al año»
    index: 'MSCI Europe',
    ter: 0.30,
    assetClass: 'Renta variable',
    region: 'Europa desarrollada',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Amundi que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'MSCI Europe de Amundi en formato fondo',
    description:
      'El Amundi Core MSCI Europe replica el MSCI Europe con unos gastos del 0,30 % anual en su clase AE, según el documento de datos fundamentales de Amundi publicado en junio de 2026. Tiene también una clase IE al 0,15 %. El MSCI Europe incluye Reino Unido, Suiza y los nórdicos además de la eurozona, así que no es un fondo «solo euro».',
    etfEquivalent: 'IMEU',
    faq: [
      { q: '¿Qué diferencia hay entre la clase AE y la IE?', a: 'La comisión: según los documentos de datos fundamentales de Amundi, la AE cuesta 0,30 % al año y la IE 0,15 %. La cartera es la misma. Cuál puedes contratar depende de lo que ofrezca tu plataforma, y el analizador reconoce las dos y calcula con la comisión de la que tengas.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'amundi-msci-north-america-esg-broad-transition',
    name: 'Amundi MSCI North America ESG Broad Transition (clase AE)',
    manager: 'Amundi',
    isin: 'LU0389812347',
    // 28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0389812347/SPA/ESP, publicado el 15/06/2026): «Amundi MSCI North America ESG Broad Transition AE | objetivo: replicar la rentabilidad del MSCI North America ESG Broad CTB Select Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,30 % del valor de su inversión al año»
    index: 'MSCI North America ESG Broad CTB Select',
    ter: 0.30,
    assetClass: 'Renta variable',
    region: 'Norteamérica',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Amundi que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'Estados Unidos y Canadá con criterios de transición climática',
    description:
      'El Amundi MSCI North America ESG Broad Transition replica el MSCI North America ESG Broad CTB Select con unos gastos del 0,30 % anual en su clase AE, según el documento de datos fundamentales de Amundi publicado en junio de 2026. Parte del MSCI North America, Estados Unidos y Canadá, y reajusta los pesos para cumplir los requisitos de un índice de transición climática de la UE (el «CTB» del nombre), lo que rebaja el peso de las empresas más emisoras.',
    etfEquivalent: 'CSPX',
    faq: [
      { q: '¿Es lo mismo que un fondo del S&P 500?', a: 'No del todo. Cubre el mismo mercado, grandes y medianas empresas de Estados Unidos más Canadá, pero con los pesos cambiados por criterios climáticos y ESG. Su rentabilidad puede separarse de la de un S&P 500 en los años en que la energía o la industria pesada van muy bien o muy mal.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'amundi-ftse-epra-nareit-global',
    name: 'Amundi FTSE EPRA NAREIT Global (clase AE)',
    manager: 'Amundi',
    isin: 'LU1328852659',
    // 28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU1328852659/SPA/ESP, publicado el 05/06/2026): «Amundi FTSE EPRA NAREIT Global AE | objetivo: replicar la rentabilidad del FTSE EPRA/NAREIT Developed Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,34 % del valor de su inversión al año»
    index: 'FTSE EPRA Nareit Developed',
    ter: 0.34,
    assetClass: 'Renta variable',
    region: 'Global desarrollado',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Amundi que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'Inmobiliario cotizado de países desarrollados, al 0,34 %',
    description:
      'El Amundi FTSE EPRA NAREIT Global replica el FTSE EPRA/NAREIT Developed con unos gastos del 0,34 % anual en su clase AE, según el documento de datos fundamentales de Amundi publicado en junio de 2026. Es el mismo índice que el fondo inmobiliario de iShares del catálogo: empresas inmobiliarias cotizadas y SOCIMIs de países desarrollados. Compra acciones, no inmuebles, así que se comporta como renta variable.',
    faq: [
      { q: '¿En qué se diferencia del iShares Developed Real Estate Index Fund?', a: 'En la gestora y en la clase, no en el índice: los dos replican el FTSE EPRA Nareit Developed. La clase Inst de iShares cuesta 0,20 % según BlackRock, y esta clase AE de Amundi 0,34 % según Amundi.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'amundi-core-euro-government-bond',
    name: 'Amundi Core Euro Government Bond (clase AE)',
    manager: 'Amundi',
    isin: 'LU1050470373',
    // 28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU1050470373/SPA/ESP, publicado el 28/04/2026): «Amundi Core Euro Government Bond AE | objetivo: replicar la rentabilidad del Bloomberg Euro Treasury 50bn Bond Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,35 % del valor de su inversión al año»
    index: 'Bloomberg Euro Treasury 50bn',
    ter: 0.35,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Amundi que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'Deuda pública de la eurozona, solo de los emisores grandes',
    description:
      'El Amundi Core Euro Government Bond replica el Bloomberg Euro Treasury 50bn con unos gastos del 0,35 % anual en su clase AE, según el documento de datos fundamentales de Amundi publicado en abril de 2026. Tiene también una clase IE al 0,15 %. El «50bn» del nombre es un umbral de tamaño: según la metodología de Bloomberg, solo entran los emisores con un volumen mínimo de deuda en circulación, lo que deja fuera a los más pequeños de la eurozona.',
    etfEquivalent: 'VGEA',
    faq: [
      { q: '¿Por qué la clase AE cuesta más del doble que la IE?', a: 'Porque son clases pensadas para canales distintos, no carteras distintas. Según los documentos de datos fundamentales de Amundi, la AE cuesta 0,35 % y la IE 0,15 % al año. En renta fija, donde la rentabilidad esperada es más baja, esa diferencia pesa proporcionalmente más que en un fondo de acciones.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'amundi-core-global-government-bond',
    name: 'Amundi Core Global Government Bond (clase AHE)',
    manager: 'Amundi',
    isin: 'LU0389812933',
    // 28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0389812933/SPA/ESP, publicado el 28/04/2026): «Amundi Core Global Government Bond AHE | objetivo: replicar la rentabilidad del J.P. Morgan Government Bond Index Global (GBI Global) | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,35 % del valor de su inversión al año»
    index: 'J.P. Morgan GBI Global (cubierto a EUR)',
    ter: 0.35,
    assetClass: 'Renta fija',
    region: 'Global',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Amundi que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'Deuda pública de los países desarrollados, cubierta a euros',
    description:
      'El Amundi Core Global Government Bond replica el J.P. Morgan Government Bond Index Global con unos gastos del 0,35 % anual en su clase AHE, según el documento de datos fundamentales de Amundi publicado en abril de 2026. Tiene también una clase IHE al 0,20 %. Son bonos de Estados de todo el mundo, y estas dos clases cubren la divisa a euros, así que el tipo de cambio apenas mueve su valor.',
    faq: [
      { q: '¿Qué países tiene dentro?', a: 'Los que componen el índice GBI Global de J.P. Morgan: deuda pública de mercados desarrollados, donde Estados Unidos, Japón y los grandes países de la eurozona son los mayores emisores. El peso exacto de cada país lo publica Amundi en la ficha mensual del fondo.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'pictet-usa-index',
    name: 'Pictet-USA Index (clase P EUR)',
    manager: 'Pictet',
    isin: 'LU0474966164',
    // 28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-usa-index/LU0474966164): «Índice de referencia: S&P 500 Composite Index» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.44% detraído de esta Clase de participaciones»
    index: 'S&P 500',
    ter: 0.44,
    assetClass: 'Renta variable',
    region: 'Estados Unidos',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Pictet que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'El S&P 500 de Pictet en formato fondo',
    description:
      'El Pictet-USA Index replica el S&P 500 con unos gastos del 0,44 % anual en su clase P EUR, según el documento de datos fundamentales de Pictet de junio de 2026. Es el mismo índice que el Fidelity S&P 500 Index Fund (0,06 % según la ficha de Fidelity de agosto de 2026) y el Vanguard U.S. 500 Stock Index (0,10 % según Vanguard): la misma cartera con comisiones muy distintas.',
    etfEquivalent: 'CSPX',
    faq: [
      { q: '¿Por qué cuesta más que otros fondos del S&P 500?', a: 'Porque cada gestora fija la comisión de cada clase, y la cartera es la misma porque el índice es el mismo. Con los datos de cada gestora, sobre 10.000 € la diferencia entre el 0,44 % de esta clase y el 0,10 % del Vanguard U.S. 500 son 34 € al año.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'pictet-europe-index',
    name: 'Pictet-Europe Index (clase P EUR)',
    manager: 'Pictet',
    isin: 'LU0130731390',
    // 28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-europe-index/LU0130731390): «Índice de referencia: MSCI Europe (EUR)» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.45% detraído de esta Clase de participaciones»
    index: 'MSCI Europe',
    ter: 0.45,
    assetClass: 'Renta variable',
    region: 'Europa desarrollada',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Pictet que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'El MSCI Europe de Pictet en formato fondo',
    description:
      'El Pictet-Europe Index replica el MSCI Europe con unos gastos del 0,45 % anual en su clase P EUR, según el documento de datos fundamentales de Pictet de junio de 2026. El MSCI Europe incluye Reino Unido, Suiza y los nórdicos además de la eurozona. Sobre el mismo índice el catálogo tiene fondos de Fidelity (0,10 %) y Vanguard (0,12 %), cada uno con el dato de su gestora.',
    etfEquivalent: 'IMEU',
    faq: [
      { q: '¿Es solo eurozona?', a: 'No. El MSCI Europe incluye Reino Unido, Suiza, Suecia, Dinamarca y Noruega, que tienen su propia moneda. Para solo eurozona, Pictet tiene otro fondo, el Pictet-Euroland Index, que replica el MSCI EMU.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'pictet-euroland-index',
    name: 'Pictet-Euroland Index (clase P EUR)',
    manager: 'Pictet',
    isin: 'LU0255980913',
    // 28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-euroland-index/LU0255980913): «Índice de referencia: MSCI EMU Index» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.46% detraído de esta Clase de participaciones»
    index: 'MSCI EMU',
    ter: 0.46,
    assetClass: 'Renta variable',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Pictet que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'Solo las bolsas del euro, de Pictet',
    description:
      'El Pictet-Euroland Index replica el MSCI EMU con unos gastos del 0,46 % anual en su clase P EUR, según el documento de datos fundamentales de Pictet de junio de 2026. Solo incluye empresas de los países que usan el euro: ni Reino Unido, ni Suiza, ni los nórdicos. Es el mismo índice que el Vanguard Eurozone Stock Index Fund y el iShares EMU Index Fund del catálogo.',
    faq: [
      { q: '¿Qué diferencia hay entre «Euroland» y «Europe»?', a: 'El índice. Euroland es el MSCI EMU, solo países del euro. Europe es el MSCI Europe, que añade Reino Unido, Suiza y los nórdicos. Pictet tiene un fondo de cada, con comisiones parecidas, y conviene no confundirlos porque las acciones del segundo cotizan en varias monedas.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'pictet-japan-index',
    name: 'Pictet-Japan Index (clase P EUR)',
    manager: 'Pictet',
    isin: 'LU0474966750',
    // 28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-japan-index/LU0474966750): «Índice de referencia: MSCI Japan Index» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.45% detraído de esta Clase de participaciones»
    index: 'MSCI Japan',
    ter: 0.45,
    assetClass: 'Renta variable',
    region: 'Japón',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Pictet que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'La bolsa japonesa de Pictet en formato fondo',
    description:
      'El Pictet-Japan Index replica el MSCI Japan con unos gastos del 0,45 % anual en su clase P EUR, según el documento de datos fundamentales de Pictet de junio de 2026. Son las grandes y medianas empresas japonesas. La clase está en euros, pero las acciones cotizan en yenes, así que el tipo de cambio afecta al valor aunque no se vea en la divisa del fondo.',
    etfEquivalent: 'SJPA',
    faq: [
      { q: '¿Hay otros fondos del MSCI Japan en el catálogo?', a: 'Sí: el Fidelity MSCI Japan Index Fund (0,10 % según su ficha de agosto de 2026), el Vanguard Japan Stock Index (0,16 %) y el iShares Japan Index Fund (0,30 % en su clase D). Todos replican el mismo índice; lo que cambia es la comisión.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'pictet-pacific-ex-japan-index',
    name: 'Pictet-Pacific Ex Japan Index (clase P EUR)',
    manager: 'Pictet',
    isin: 'LU0474967055',
    // 28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-pacific-ex-japan-index/LU0474967055): «Índice de referencia: MSCI Pacific ex-Japan (USD)» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.45% detraído de esta Clase de participaciones»
    index: 'MSCI Pacific ex Japan',
    ter: 0.45,
    assetClass: 'Renta variable',
    region: 'Pacífico sin Japón',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Pictet que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'Australia, Hong Kong, Singapur y Nueva Zelanda, de Pictet',
    description:
      'El Pictet-Pacific Ex Japan Index replica el MSCI Pacific ex Japan con unos gastos del 0,45 % anual en su clase P EUR, según el documento de datos fundamentales de Pictet de junio de 2026. Son las grandes y medianas empresas de Australia, Hong Kong, Singapur y Nueva Zelanda. Sobre el mismo índice el catálogo tiene el Vanguard Pacific ex-Japan Stock Index (0,16 %) y el iShares Pacific Index Fund (0,30 % en su clase D).',
    etfEquivalent: 'CPXJ',
    faq: [
      { q: '¿Por qué no está China?', a: 'Porque MSCI clasifica China como mercado emergente, y este índice es solo de desarrollados del Pacífico. China está en los índices de emergentes, y Japón tiene el suyo propio. Por eso esta región es pequeña: cuatro países.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'pictet-emerging-markets-index',
    name: 'Pictet-Emerging Markets Index (clase P EUR)',
    manager: 'Pictet',
    isin: 'LU0474967998',
    // 28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-emerging-markets-index/LU0474967998): «Índice de referencia: MSCI Emerging Markets Index» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.58% detraído de esta Clase de participaciones»
    index: 'MSCI Emerging Markets',
    ter: 0.58,
    assetClass: 'Renta variable',
    region: 'Emergentes',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Pictet que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'Emergentes de Pictet en formato fondo',
    description:
      'El Pictet-Emerging Markets Index replica el MSCI Emerging Markets con unos gastos del 0,58 % anual en su clase P EUR, según el documento de datos fundamentales de Pictet de junio de 2026. Es el mismo índice que los fondos de emergentes de Fidelity (0,20 %), Vanguard (0,23 %) y Amundi (0,45 % en su clase AE) del catálogo, y el más caro de los cuatro en las clases que tenemos verificadas.',
    etfEquivalent: 'AEEM',
    faq: [
      { q: '¿Qué países tiene dentro?', a: 'Los que MSCI clasifica como emergentes: China, India, Taiwán, Corea del Sur y Brasil entre los de más peso, junto a una veintena más. Corea está aquí porque para MSCI es emergente; en los índices de FTSE cuenta como desarrollado.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'fidelity-msci-world-index',
    name: 'Fidelity MSCI World Index Fund (clase P Acc EUR)',
    manager: 'Fidelity',
    isin: 'IE00BYX5NX33',
    // 28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.fidelityinternational.com/FILPS/Documents/en/current/ret.en.xx.IE00BYX5NX33.pdf): «Fidelity MSCI World Index Fund P-ACC-Euro | Index Name: MSCI World Index (Net) | ISIN: IE00BYX5NX33 | Share Class Ongoing Charges: 0.12% | Distribution type: Accumulating»
    index: 'MSCI World',
    ter: 0.12,
    assetClass: 'Renta variable',
    region: 'Global desarrollado',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Fidelity que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'El MSCI World de Fidelity, al 0,12 %',
    description:
      'El Fidelity MSCI World Index Fund replica el MSCI World con unos gastos corrientes del 0,12 % anual en su clase P Acc EUR, según la ficha mensual de Fidelity de agosto de 2026, en la que el fondo tenía 1.283 posiciones de 23 países desarrollados, sin emergentes. Ojo con un error que circula: el ISIN IE00BYX5MX67 no es este fondo sino el Fidelity S&P 500, y hasta el 18 de septiembre de 2026 nosotros mismos lo publicábamos mal.',
    etfEquivalent: 'IWDA',
    faq: [
      { q: '¿Es el mismo fondo que IE00BYX5MX67?', a: 'No. IE00BYX5MX67 es el Fidelity S&P 500 Index Fund, solo Estados Unidos. Este es el MSCI World, con Europa, Japón y el resto de desarrollados. El ISIN es lo que identifica el producto, no el nombre, y en este caso los dos nombres se confunden a menudo.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'fidelity-msci-japan-index',
    name: 'Fidelity MSCI Japan Index Fund (clase P Acc EUR)',
    manager: 'Fidelity',
    isin: 'IE00BYX5N771',
    // 28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.fidelityinternational.com/FILPS/Documents/en/current/ret.en.xx.IE00BYX5N771.pdf): «Fidelity MSCI Japan Index Fund P-ACC-Euro | Index Name: MSCI Japan Index (Net) | ISIN: IE00BYX5N771 | Share Class Ongoing Charges: 0.10% | Distribution type: Accumulating»
    index: 'MSCI Japan',
    ter: 0.10,
    assetClass: 'Renta variable',
    region: 'Japón',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado: la documentación de Fidelity que hemos leído no publica el mínimo de esta clase. Compruébalo en tu plataforma',
    tagline: 'La bolsa japonesa de Fidelity, al 0,10 %',
    description:
      'El Fidelity MSCI Japan Index Fund replica el MSCI Japan con unos gastos corrientes del 0,10 % anual en su clase P Acc EUR, según la ficha mensual de Fidelity de agosto de 2026. Es el más barato de los fondos del MSCI Japan que tenemos en el catálogo. La clase está en euros sin cubrir, así que el yen afecta al valor.',
    etfEquivalent: 'SJPA',
    faq: [
      { q: '¿Qué diferencia hay con un ETF del MSCI Japan IMI?', a: 'El IMI añade pequeñas empresas japonesas; el MSCI Japan se queda en grandes y medianas. El reparto por sectores es parecido. Y fiscalmente este es un fondo y se puede traspasar sin tributar; un ETF no.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'state-street-emu-government-bond-index',
    name: 'State Street EMU Government Bond Index Fund (clase P)',
    manager: 'State Street',
    isin: 'LU0438093006',
    // 28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.ssga.com/uk/en_gb/institutional/library-content/products/factsheets/mf/emea/factsheet-emea-en_gb-lu0438093006.pdf): «Share Class [P] All Investors | Benchmark FTSE EMU Government Bond Index | ISIN LU0438093006 | Minimum Initial Investment EUR 50.00 | Actual TER 0.36%»
    index: 'FTSE EMU Government Bond',
    ter: 0.36,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'State Street exige 50 € de inversión inicial en esta clase; lo que te pida tu comercializadora puede ser distinto',
    tagline: 'Deuda pública de la eurozona, de State Street',
    description:
      'El State Street EMU Government Bond Index Fund replica el FTSE EMU Government Bond con un TER del 0,36 % anual en su clase P, según la ficha mensual de State Street de agosto de 2026. Es deuda pública de los Estados de la eurozona, el mismo índice que el iShares Euro Government Bond Index Fund del catálogo, que en su clase D cuesta 0,07 % según BlackRock.',
    etfEquivalent: 'VGEA',
    faq: [
      { q: '¿Por qué cuesta cinco veces más que el de iShares si replica el mismo índice?', a: 'Porque cada gestora pone la comisión de cada clase. Según sus fichas, esta clase P de State Street tiene un TER del 0,36 % y la clase D de iShares, del 0,07 %. En renta fija esa diferencia pesa mucho: con una rentabilidad esperada baja, 0,29 puntos al año se llevan una parte grande de lo que rinden los bonos.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
  {
    slug: 'state-street-euro-core-treasury-bond-index',
    name: 'State Street Euro Core Treasury Bond Index Fund (clase P)',
    manager: 'State Street',
    isin: 'LU0570151448',
    // 28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.ssga.com/uk/en_gb/institutional/library-content/products/factsheets/mf/emea/factsheet-emea-en_gb-lu0570151448.pdf): «Share Class [P] All Investors | Benchmark Bloomberg Global Treasury 40% Germany 40% France 20% Netherlands Custom Index | ISIN LU0570151448 | Minimum Initial Investment EUR 50.00 | Actual TER 0.38%»
    index: 'Bloomberg Global Treasury Euro Core (40 % Alemania, 40 % Francia, 20 % Países Bajos)',
    ter: 0.38,
    assetClass: 'Renta fija',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'State Street exige 50 € de inversión inicial en esta clase; lo que te pida tu comercializadora puede ser distinto',
    tagline: 'Deuda pública de Alemania, Francia y Países Bajos, en pesos fijos',
    description:
      'El State Street Euro Core Treasury Bond Index Fund replica un índice a medida de Bloomberg con deuda pública de solo tres países: 40 % Alemania, 40 % Francia y 20 % Países Bajos. Su TER es del 0,38 % anual en la clase P, según la ficha mensual de State Street de agosto de 2026. Deja fuera a Italia, España y el resto de la periferia del euro.',
    etfEquivalent: 'VGEA',
    faq: [
      { q: '¿En qué se diferencia de un fondo de deuda pública de toda la eurozona?', a: 'En los países. Un índice de toda la eurozona incluye Italia, España, Bélgica y el resto, con pesos según su deuda. Este solo tiene Alemania, Francia y Países Bajos en proporciones fijas. Los bonos de esos tres suelen pagar menos interés que los de la periferia, y a cambio el fondo no tiene dentro la deuda de los países que más sufren en una crisis del euro.' },
      { q: '¿Se puede traspasar sin tributar?', a: 'Sí. Es un fondo de inversión, así que le aplica el artículo 94.1.a) de la Ley del IRPF: si el reembolso se destina a suscribir otro fondo «no procederá computar la ganancia o pérdida patrimonial», siempre que el importe no llegue a estar a disposición del contribuyente. El impuesto se aplaza hasta la venta definitiva, no desaparece.' },
    ],
  },
]

export function getIndexFundBySlug(slug: string): IndexFund | undefined {
  return INDEX_FUNDS.find((f) => f.slug === slug)
}
