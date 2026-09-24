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
    // Verificado el 19-sep-2026 en el registro: «ISHARES DEVELOPED WORLD INDEX FUND (IE) D
    // EUR ACC | BLACKROCK INVESTMENT MANAGEMENT | MSCI World | 0,30 %».
    index: 'MSCI World',
    ter: 0.30,
    assetClass: 'Renta variable',
    region: 'Global desarrollado',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado',
    tagline: 'MSCI World en formato fondo, de BlackRock',
    description:
      'El iShares Developed World Index Fund replica el MSCI World con unos gastos del 0,30 % anual. Cubre unas 1.500 empresas grandes y medianas de 23 mercados desarrollados, sin emergentes. Es el mismo índice que siguen ETFs como IWDA o SWRD, con la diferencia de forma jurídica que importa en España: un fondo entra en el régimen de traspasos del artículo 94.1.a) del IRPF y un ETF no.',
    etfEquivalent: 'IWDA',
    faq: [
      { q: '¿En qué se diferencia de un ETF sobre el MSCI World?', a: 'En la cartera, en nada: el índice es el mismo y las empresas también. La diferencia está en el vehiculo. Un fondo de inversión se puede traspasar a otro fondo sin que la plusvalía tribute en ese momento; un ETF queda fuera de ese régimen porque el artículo 94.1.a) excluye a los fondos cotizados. La otra diferencia es el coste: este fondo cuesta 0,30 % y hay ETFs sobre el mismo índice por 0,12-0,20 %.' },
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
      'La clase S del iShares Developed World Index Fund replica el MSCI World con unos gastos del 0,04 % anual, verificados en la ficha de BlackRock. Es exactamente la misma cartera que la clase D del mismo fondo —unas 1.500 empresas de 23 mercados desarrollados, sin emergentes— con la diferencia de que cuesta 0,04 % en vez de 0,30 %. Al ser un fondo y no un ETF, entra en el régimen de traspasos del artículo 94.1.a) del IRPF.',
    etfEquivalent: 'IWDA',
    faq: [
      { q: '¿En qué se diferencia de la clase D del mismo fondo?', a: 'En la cartera, en nada: es el mismo fondo y el mismo índice. Lo que cambia es la comisión: la clase S cuesta 0,04 % anual y la clase D, 0,30 %. Sobre 10.000 € son 26 € de diferencia al año, y sobre 100.000 € son 260 €. Las clases baratas suelen existir para grandes patrimonios; lo que ha cambiado es que algunas plataformas españolas las ofrecen ahora al particular.' },
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
    // Verificado el 19-sep-2026 en el registro: «AMUNDI INDEX MSCI WORLD AE CAP | AMUNDI
    // ASSET MANAGEMENT | MSCI World | 0,15 %».
    index: 'MSCI World',
    ter: 0.15,
    assetClass: 'Renta variable',
    region: 'Global desarrollado',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['No verificado — compruébalo en tu plataforma'],
    minimum: 'No verificado',
    tagline: 'MSCI World en formato fondo, con una comisión del 0,15 %',
    description:
      'El Amundi Index MSCI World replica el MSCI World con unos gastos del 0,15 % anual, la mitad que el fondo equivalente de BlackRock. Cubre mercados desarrollados y deja fuera a los emergentes, que hay que añadir aparte si se quiere una cartera mundial completa. Ojo con el nombre: la gama «Index» de Amundi no es la gama «Core» ni la «Prime», y sus comisiones y formatos no coinciden.',
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
      'El Vanguard Global Stock Index Fund replica el MSCI World con la calidad y reputación de Vanguard, la gestora fundada por John Bogle. TER 0,18%, acumulación, disponible en MyInvestor desde 1€ con traspaso fiscal libre. Es la opción preferida por los inversores que valoran la marca Vanguard y su estructura de propiedad mutua, aceptando un TER ligeramente superior al Amundi Prime Global a cambio del índice MSCI World original.',
    etfEquivalent: 'IWDA',
    faq: [
      { q: '¿Vanguard Global Stock o Amundi Prime Global?', a: 'Ambos cubren mercados desarrollados. Vanguard Global Stock (TER 0,18%) replica el MSCI World original con la reputación de Vanguard. Amundi Prime Global (TER 0,05%) replica el Solactive (equivalente) y es más barato. Si priorizas coste: Amundi. Si priorizas la marca Vanguard y el índice MSCI: Vanguard.' },
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
      'El Vanguard U.S. 500 Stock Index Fund replica el S&P 500 (500 mayores empresas de EE.UU.) con TER 0,10%. Es el equivalente en formato fondo del popular ETF CSPX/VUAA. Disponible en MyInvestor desde 1€ con traspaso fiscal libre. Ideal para inversores que quieren exposición concentrada al mercado americano aprovechando la fiscalidad de los fondos en España.',
    etfEquivalent: 'CSPX',
    faq: [
      { q: '¿Vanguard US 500 fondo o el ETF CSPX?', a: 'Ambos replican el S&P 500. El fondo Vanguard US 500 (TER 0,10%) permite traspaso fiscal libre entre fondos en España. El ETF CSPX (TER 0,07%) es algo más barato pero cada venta tributa. Para inversor a largo plazo en España que quiera rebalancear sin coste fiscal: el fondo.' },
    ],
  },
  {
    slug: 'amundi-index-msci-emerging-markets',
    name: 'Amundi Core MSCI Emerging Markets',
    manager: 'Amundi',
    isin: 'LU0996177134',
    // Verificado el 18-sep-2026 en el registro: «AMUNDI CORE MSCI EMERGING MARKETS AE CAP |
    // AMUNDI ASSET MANAGEMENT | MSCI Emerging Markets | 0,30 %». La ficha decía «Amundi Index»
    // y 0,20 %: el nombre era de otra gama y la comisión, la mitad de la real. El índice sí
    // era correcto, y por eso el fondo sí se puede analizar una vez corregido.
    index: 'MSCI Emerging Markets',
    ter: 0.30,
    assetClass: 'Renta variable',
    region: 'Emergentes',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor'],
    minimum: '1€',
    tagline: 'Exposición a mercados emergentes en formato fondo con traspaso libre',
    description:
      'El Amundi Core MSCI Emerging Markets replica el índice MSCI Emerging Markets (China, India, Taiwán, Corea, Brasil y otros) con unos gastos del 0,30 %. Cubre la parte de emergentes de una cartera global, que por capitalización ronda el 10-12 %. Ojo al nombre: la gama «Core» de Amundi no es la gama «Index», y sus comisiones no son las mismas, así que conviene comprobar el ISIN y no el nombre al buscarlo.',
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
      'El Vanguard Emerging Markets Stock Index Fund da exposición a mercados emergentes con la reputación de Vanguard, TER 0,23%. Disponible en MyInvestor con traspaso fiscal libre. Alternativa al Amundi Index MSCI EM para quienes prefieren la marca Vanguard.',
    // AEEM y no VFEM: este fondo replica el MSCI Emerging Markets (factsheet de Vanguard
    // del 31-ago-2026, ticker de indice MSDEEEMN) y VFEM es FTSE Emerging, otra familia de
    // indices que ademas clasifica Corea del Sur de otra forma. Corregido el 18-sep-2026.
    etfEquivalent: 'AEEM',
    faq: [
      { q: '¿Vanguard o Amundi para emergentes en fondo?', a: 'El Amundi Index MSCI EM (TER 0,20%) es algo más barato que el Vanguard Emerging Markets (TER 0,23%). Ambos cubren emergentes globalmente. Para coste mínimo: Amundi. Para marca Vanguard: Vanguard. La diferencia de coste es pequeña en términos absolutos.' },
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
      { q: '¿Qué fondo de emergentes elijo?', a: 'Amundi Index MSCI EM y Fidelity Emerging Markets tienen el mismo TER (0,20%), ambos replican MSCI Emerging Markets. Vanguard es algo más caro (0,23%). Cualquiera de los tres es válido; elige según disponibilidad y preferencia de gestora.' },
    ],
  },
]

export function getIndexFundBySlug(slug: string): IndexFund | undefined {
  return INDEX_FUNDS.find((f) => f.slug === slug)
}
