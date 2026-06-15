/**
 * Brokers populares entre inversores indexados en España.
 * Cada uno genera una página /broker/[slug] con análisis completo
 * y subpáginas /broker/[slug]/etfs, /broker/[slug]/comisiones, etc.
 */

export interface BrokerFaq {
  q: string
  a: string
}

export interface Broker {
  slug: string
  name: string
  shortName?: string
  /** País de regulación */
  regulatorCountry: string
  regulator: string
  regulatorId?: string
  /** Año de fundación o inicio en España */
  founded?: number
  /** Comisión por orden de ETF (texto) */
  etfCommission: string
  /** Soporta fondos indexados */
  supportsFunds: boolean
  /**
   * Soporta el régimen español de traspaso fiscal libre entre fondos.
   * Solo lo ofrecen las entidades que comercializan fondos en España; un
   * bróker extranjero puede dar acceso a fondos (`supportsFunds: true`) sin
   * acogerse a este régimen. Si no se indica, se asume `false`.
   */
  supportsFundTransfers?: boolean
  /** Cuenta remunerada */
  remuneratedAccount?: string
  /** Mínimo de apertura */
  minimumOpening?: string
  /** Tagline corto */
  tagline: string
  /** Descripción larga indexable */
  description: string
  /** Para qué perfil es ideal */
  idealFor: string[]
  /** Para qué perfil NO es ideal */
  notIdealFor: string[]
  /** Garantía del depósito */
  depositGuarantee?: string
  /** Garantía de inversión */
  investmentGuarantee?: string
  /** Sitio web oficial */
  officialUrl: string
  faq: BrokerFaq[]
}

export const BROKERS: Broker[] = [
  {
    slug: 'trade-republic',
    name: 'Trade Republic',
    regulatorCountry: 'Alemania',
    regulator: 'BaFin',
    founded: 2015,
    etfCommission: '0€ por operación',
    supportsFunds: false,
    remuneratedAccount: '2-2,5% TAE (sin límite ni condiciones)',
    minimumOpening: 'Sin mínimo',
    tagline: 'El broker sin comisiones que revolucionó el mercado europeo',
    description:
      'Trade Republic es un banco alemán con licencia bancaria completa desde 2023, supervisado por BaFin y el Bundesbank. Su propuesta: 0€ por operación en cualquiera de sus 2.000+ ETFs, planes de ahorro automáticos desde 1€ al mes y una cuenta remunerada al tipo de depósito del BCE menos un pequeño margen. Sin tarifas de mantenimiento ni custodia. Ideal para inversores que quieren simplicidad operativa y automatización completa.',
    idealFor: [
      'Inversores que empiezan',
      'Aportaciones periódicas pequeñas (DCA mensual)',
      'Quien prefiere app móvil clara sobre interfaz técnica',
      'Inversores que quieren automatizar al máximo',
    ],
    notIdealFor: [
      'Quien quiera fondos indexados (Trade Republic solo tiene ETFs)',
      'Quien necesite traspaso fiscal libre entre productos',
      'Quien quiera acceso a mercados asiáticos directos',
      'Trader técnico con órdenes complejas',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos alemán',
    investmentGuarantee: '20.000€ adicionales por el Fondo de Garantía de Inversiones',
    officialUrl: 'https://traderepublic.com/es-es',
    faq: [
      {
        q: '¿Es seguro Trade Republic en España?',
        a: 'Sí. Trade Republic es un banco alemán con licencia bancaria completa supervisado por BaFin (regulador alemán) y el Bundesbank desde 2023. Los depósitos en euros hasta 100.000€ están cubiertos por el Fondo de Garantía de Depósitos alemán. Las acciones y ETFs se custodian como patrimonio segregado del banco — son legalmente del cliente.',
      },
      {
        q: '¿Cómo gana dinero Trade Republic si cobra 0€?',
        a: 'Trade Republic monetiza principalmente por order flow (cobra a los creadores de mercado por enrutar órdenes a través de ellos), por el margen de la cuenta remunerada (recibe el tipo del BCE y paga al cliente un poco menos), y por productos adicionales (tarjetas, cripto). Es un modelo legítimo y común en bancos neobancarios europeos.',
      },
      {
        q: '¿Cuál es la diferencia con DEGIRO?',
        a: 'Trade Republic cobra 0€ por operación y ofrece planes de ahorro automáticos desde 1€, ideal para DCA mensual. DEGIRO cobra 0,50€ + 0,004% por orden pero da acceso a 50+ bolsas mundiales y más opciones técnicas. Para aportaciones pequeñas: Trade Republic. Para volumen alto o mercados específicos: DEGIRO.',
      },
      {
        q: '¿Tributan los ETFs comprados en Trade Republic en España?',
        a: 'Sí, igual que en cualquier broker. Al vender un ETF con beneficio, la ganancia tributa en el IRPF del ahorro (19-28% según importe). Trade Republic NO ofrece traspaso fiscal libre porque solo tiene ETFs (los ETFs no tienen ese régimen en España). Para traspaso libre necesitas fondos de inversión, disponibles en MyInvestor.',
      },
      {
        q: '¿Cuál es la rentabilidad real de la cuenta remunerada de Trade Republic?',
        a: 'En 2026 Trade Republic remunera el saldo en euros a aproximadamente el 2-2,5% TAE, sin condiciones (no requiere nómina ni recibos domiciliados) y sin límite de saldo remunerado. Los intereses se pagan mensualmente. La cifra exacta varía según el tipo de depósito del BCE.',
      },
    ],
  },
  {
    slug: 'degiro',
    name: 'DEGIRO',
    regulatorCountry: 'Países Bajos',
    regulator: 'AFM',
    founded: 2008,
    etfCommission: '0,50€ + 0,004% (mínimo 0,90€)',
    supportsFunds: false,
    minimumOpening: 'Sin mínimo',
    tagline: 'Broker técnico con acceso a 50+ bolsas mundiales',
    description:
      'DEGIRO es un broker holandés con sede en Ámsterdam, regulado por la AFM y subsidiaria de flatexDEGIRO Bank AG (regulado por BaFin desde 2021). Su propuesta histórica fue romper el oligopolio de las comisiones altas en Europa: 0,50€ + 0,004% por operación en Xetra, mínimo 0,90€. Ofrece acceso a más de 50 bolsas mundiales, lo que lo convierte en la opción favorita para inversores que necesitan productos específicos no disponibles en brokers más limitados.',
    idealFor: [
      'Inversores con cartera grande (>100.000€)',
      'Quien necesita acceso a múltiples bolsas internacionales',
      'Trader técnico con órdenes avanzadas',
      'Acceso a ETFs nicho no disponibles en otros brokers',
    ],
    notIdealFor: [
      'Aportaciones muy pequeñas (la comisión mínima pesa)',
      'Quien quiera planes de ahorro automáticos',
      'Quien busca fondos indexados con traspaso fiscal',
    ],
    depositGuarantee: 'No aplica (no es banco)',
    investmentGuarantee: '20.000€ por el Fondo de Garantía de Inversiones holandés (IFD)',
    officialUrl: 'https://www.degiro.es',
    faq: [
      {
        q: '¿Es seguro DEGIRO?',
        a: 'Sí. DEGIRO está regulado por la AFM (regulador holandés) y desde 2021 es subsidiaria de flatexDEGIRO Bank AG, supervisado por BaFin. El Fondo de Garantía de Inversiones holandés cubre hasta 20.000€ en caso de insolvencia. Los activos están segregados del broker en cuentas de custodia, con la salvedad de la cuenta básica donde pueden prestarse valores (para evitar esto, abre cuenta Custody).',
      },
      {
        q: '¿Qué diferencia hay entre la cuenta básica y la Custody de DEGIRO?',
        a: 'En la cuenta básica, DEGIRO puede prestar tus valores a terceros (préstamo de valores). En la cuenta Custody, los valores están en cuentas segregadas y no pueden prestarse — máxima seguridad. La cuenta Custody tiene comisiones algo más altas pero la diferencia es marginal para la mayoría de inversores indexados. Si te preocupa la segregación, abre Custody.',
      },
      {
        q: '¿Tiene DEGIRO cuenta remunerada como Trade Republic?',
        a: 'No. DEGIRO no remunera el saldo en euros. Si tienes liquidez esperando ser invertida, considera moverla a una cuenta corriente remunerada en Trade Republic, MyInvestor o un banco con cuenta remunerada.',
      },
      {
        q: '¿Para qué ETFs cobra 0€ DEGIRO en 2026?',
        a: 'DEGIRO mantiene una lista cambiante de ETFs por los que no cobra comisión de compra mensualmente. Hay restricciones: típicamente una operación gratuita por ETF al mes y comisión si no operas suficiente en un periodo. La lista cambia, verifica siempre en la web oficial antes de operar.',
      },
      {
        q: '¿DEGIRO o Trade Republic para empezar?',
        a: 'Para la mayoría de inversores que empiezan con aportaciones pequeñas, Trade Republic es más sencillo: 0€ por operación, planes de ahorro automáticos, app más amigable. DEGIRO tiene sentido cuando el volumen es alto, necesitas mercados específicos o quieres tipos de órdenes avanzadas.',
      },
    ],
  },
  {
    slug: 'myinvestor',
    name: 'MyInvestor',
    regulatorCountry: 'España',
    regulator: 'CNMV + Banco de España',
    founded: 2017,
    etfCommission: '0,20€ + 0,03% del importe',
    supportsFunds: true,
    supportsFundTransfers: true,
    remuneratedAccount: '2% TAE primer año (con condiciones), 1% después',
    minimumOpening: '1€ en fondos',
    tagline: 'El único banco español con Vanguard, Amundi y traspaso fiscal libre',
    description:
      'MyInvestor es la marca digital de Andbank España, un banco regulado por CNMV y Banco de España desde 2010. Es el único broker español que ofrece a la vez fondos indexados Vanguard institucionales, Amundi Prime Global (TER 0,05%) y Fidelity, junto con ETFs en bolsa europea. Su combinación única —fondos indexados + ETFs + traspaso fiscal libre + plan de pensiones indexado— lo convierte en la opción más completa para inversores residentes en España que quieren todo en una sola entidad.',
    idealFor: [
      'Quien quiera fondos indexados con traspaso fiscal libre',
      'Inversores que valoran banco regulado en España',
      'Aportaciones pequeñas regulares (desde 1€)',
      'Quien busca planes de pensiones indexados baratos',
    ],
    notIdealFor: [
      'Quien solo quiere ETFs sin pagar comisión (Trade Republic gana en eso)',
      'Quien necesita acceso a mercados internacionales avanzados',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos español',
    investmentGuarantee: '100.000€ por el Fondo de Garantía de Inversiones español',
    officialUrl: 'https://myinvestor.es',
    faq: [
      {
        q: '¿Es seguro MyInvestor?',
        a: 'Sí. MyInvestor es el neobanco del grupo Andbank España, regulado por el Banco de España y la CNMV. Los depósitos en euros hasta 100.000€ están cubiertos por el Fondo de Garantía de Depósitos español. Los fondos de inversión y ETFs se custodian como patrimonio segregado del banco — en caso de insolvencia siguen siendo del cliente y están cubiertos por el Fondo de Garantía de Inversiones hasta 100.000€.',
      },
      {
        q: '¿Qué fondos indexados de Vanguard ofrece MyInvestor?',
        a: 'MyInvestor ofrece la gama institucional de Vanguard: Global Stock Index, Emerging Markets Stock Index, Eurozone Stock Index, Global Bond Index (hedged EUR), entre otros. Todos con TER bajo y aportación mínima de 1€. La diferencia con los ETFs es que estos fondos permiten traspaso fiscal libre entre ellos, una ventaja exclusiva del régimen fiscal español de fondos.',
      },
      {
        q: '¿Qué es el Amundi Prime Global en MyInvestor?',
        a: 'El Amundi Prime Global (ISIN LU1931974692) es el fondo indexado con el TER más bajo disponible para el inversor particular en España: 0,05% anual. Replica el índice Solactive GBS Global Markets (equivalente al MSCI World) y está disponible en MyInvestor desde 1€ de aportación, sin comisión de compra y con traspaso fiscal libre.',
      },
      {
        q: '¿MyInvestor tiene plan de pensiones indexado?',
        a: 'Sí, varios. El MyInvestor Indexado Global tiene comisión total alrededor del 0,30%, uno de los más bajos del mercado español. También ofrece planes white-label de Indexa Capital. El mínimo de aportación es 1€. Acepta traspasos desde otros planes de pensiones sin coste fiscal ni operativo.',
      },
      {
        q: '¿Cuánto cobra MyInvestor por comprar un ETF?',
        a: 'MyInvestor cobra 0,20€ fijos + 0,03% del importe por operación. Para órdenes pequeñas (menos de 667€), el componente fijo de 0,20€ es muy competitivo, comparable o mejor que DEGIRO. Para órdenes muy grandes, el 0,03% variable puede sumar más que en Trade Republic (que cobra 0€).',
      },
    ],
  },
  {
    slug: 'xtb',
    name: 'XTB',
    regulatorCountry: 'España',
    regulator: 'CNMV',
    founded: 2002,
    etfCommission: '0€ hasta 100.000€/mes en ETFs',
    supportsFunds: false,
    remuneratedAccount: '~3% TAE (variable)',
    minimumOpening: 'Sin mínimo',
    tagline: 'Broker polaco con sucursal española, 0€ en ETFs hasta cierto volumen',
    description:
      'XTB es un broker polaco con sucursal regulada por CNMV en España. Su propuesta para ETFs: 0€ de comisión hasta 100.000€ de volumen mensual. Por encima de ese umbral, comisión del 0,2% (mínimo 10€). Tiene amplia oferta de instrumentos (acciones, ETFs, CFD, forex) y plataforma propia xStation. La cuenta remunerada en euros suele tener TAE competitiva.',
    idealFor: [
      'Inversores con volumen mensual <100.000€',
      'Quien busca cuenta remunerada alta',
      'Trader que ya usa CFD o forex y quiere unificar',
    ],
    notIdealFor: [
      'Quien quiera fondos indexados',
      'Inversores con muy poco volumen (otros brokers más sencillos para empezar)',
    ],
    depositGuarantee: '20.000€ por el Fondo de Garantía de Inversiones polaco',
    officialUrl: 'https://www.xtb.com/es',
    faq: [
      {
        q: '¿Es seguro XTB?',
        a: 'Sí. XTB cotiza en la Bolsa de Varsovia y la sucursal española está supervisada por CNMV. Los activos están segregados del broker. El Fondo de Garantía de Inversiones polaco cubre hasta 20.000€. Para inversores que prefieren regulación específicamente española, MyInvestor es alternativa.',
      },
      {
        q: '¿XTB cobra comisión por ETFs?',
        a: 'No, hasta 100.000€ de volumen mensual en ETFs. Por encima de ese umbral, cobra 0,2% con un mínimo de 10€. Para el inversor particular medio que aporta unos cientos o miles de euros al mes, XTB equivale a 0€ en ETFs.',
      },
      {
        q: '¿Cuál es la cuenta remunerada de XTB?',
        a: 'XTB ofrece cuenta remunerada en euros que en 2026 suele estar alrededor del 3% TAE, una de las más altas del mercado europeo. Las condiciones específicas (saldo máximo remunerado, requisitos) cambian periódicamente; verifica en la web oficial.',
      },
      {
        q: '¿Diferencia entre XTB y Trade Republic?',
        a: 'Trade Republic: 0€ por operación sin límite, app más sencilla, regulación alemana. XTB: 0€ hasta 100.000€/mes en ETFs, cuenta remunerada algo más alta, regulación española (CNMV) + plataforma xStation más completa para traders. Para inversor indexado puro, Trade Republic es más sencillo; para quien combina ETFs con otros productos, XTB puede tener sentido.',
      },
    ],
  },
  {
    slug: 'interactive-brokers',
    name: 'Interactive Brokers',
    shortName: 'IBKR',
    regulatorCountry: 'Irlanda (sucursal europea)',
    regulator: 'CBI (Central Bank of Ireland)',
    founded: 1978,
    etfCommission: 'Variable, muy bajo en volumen',
    supportsFunds: true,
    minimumOpening: 'Sin mínimo',
    tagline: 'Broker institucional para inversores avanzados con acceso a 150 mercados',
    description:
      'Interactive Brokers (IBKR) es uno de los brokers más antiguos y respetados del mundo, fundado en 1978 en EE.UU. La sucursal europea (Interactive Brokers Ireland Limited) está regulada por el Central Bank of Ireland. Da acceso a más de 150 mercados en 33 países y 27 divisas. Sus comisiones son muy competitivas para volúmenes altos. Plataformas IBKR Lite (comisiones fijas) o IBKR Pro (escalonadas).',
    idealFor: [
      'Inversores con cartera grande (>100.000€)',
      'Quien necesita acceso a mercados internacionales globales',
      'Trader profesional o semi-profesional',
      'Acceso a futuros, opciones, divisas además de ETFs',
    ],
    notIdealFor: [
      'Inversor indexado principiante (la interfaz es técnica)',
      'Quien solo quiere comprar 1-2 ETFs mensuales',
    ],
    depositGuarantee: 'No aplica (no es banco)',
    investmentGuarantee: '20.000€ por el Investor Compensation Scheme irlandés',
    officialUrl: 'https://www.interactivebrokers.com',
    faq: [
      {
        q: '¿Es Interactive Brokers adecuado para inversores indexados en España?',
        a: 'Sí, pero más para perfiles avanzados o carteras grandes. La interfaz es más técnica que Trade Republic o MyInvestor. Las comisiones son muy bajas pero requiere familiarizarse con el sistema. Para el inversor indexado que aporta cantidades pequeñas mensualmente, Trade Republic es más sencillo y suficiente.',
      },
      {
        q: '¿Tiene IBKR cuenta remunerada en euros?',
        a: 'Sí. IBKR remunera el saldo en euros por encima de cierto umbral (1.000-10.000€ aprox.) con una tasa cercana al tipo de depósito del BCE menos un pequeño margen. Es competitiva pero las condiciones son específicas; verifica en la web.',
      },
      {
        q: '¿IBKR Lite o IBKR Pro?',
        a: 'IBKR Lite tiene 0€ de comisión en acciones americanas pero hace order flow (vende las órdenes a market makers). IBKR Pro cobra comisiones escalonadas muy bajas y no hace order flow. Para inversores europeos en ETFs UCITS, las diferencias son menores; ambos son válidos.',
      },
    ],
  },
  {
    slug: 'renta-4',
    name: 'Renta 4 Banco',
    regulatorCountry: 'España',
    regulator: 'CNMV + Banco de España',
    founded: 1986,
    etfCommission: '~7-10€ + comisiones varias',
    supportsFunds: true,
    supportsFundTransfers: true,
    minimumOpening: 'Sin mínimo',
    tagline: 'Broker tradicional español, fondos indexados con comisiones más altas',
    description:
      'Renta 4 es un banco español de inversión fundado en 1986, regulado por CNMV y Banco de España. Históricamente ha sido la opción para inversores que querían unificar custodia de fondos y ETFs en una entidad española. Sus comisiones son más altas que MyInvestor (~7-10€ por orden de ETF + comisiones de custodia anuales) pero ofrece una gama amplia de productos y servicio personal en oficinas.',
    idealFor: [
      'Inversores que prefieren contacto presencial y oficinas',
      'Patrimonios altos que valoran servicio',
      'Quien ya es cliente y no quiere cambiar',
    ],
    notIdealFor: [
      'Inversor particular con sensibilidad a costes',
      'Aportaciones pequeñas regulares',
      'Comparado con MyInvestor, es notablemente más caro',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos español',
    investmentGuarantee: '100.000€ por el Fondo de Garantía de Inversiones español',
    officialUrl: 'https://www.r4.com',
    faq: [
      {
        q: '¿Renta 4 es buena opción para inversor indexado en 2026?',
        a: 'Para la mayoría de inversores indexados particulares, MyInvestor es más económico con productos equivalentes. Renta 4 tiene sentido si valoras servicio en oficinas físicas o ya eres cliente histórico. Las comisiones de ~7-10€ por orden de ETF + custodia anual hacen que para aportaciones pequeñas el coste sea significativo.',
      },
      {
        q: '¿Ofrece Renta 4 fondos Vanguard como MyInvestor?',
        a: 'Renta 4 ofrece una selección de fondos indexados, pero el catálogo de fondos baratos Vanguard/Amundi institucionales es más limitado que MyInvestor. Para fondos indexados con TER mínimo, MyInvestor sigue siendo la mejor opción en España.',
      },
    ],
  },
  {
    slug: 'openbank',
    name: 'Openbank',
    regulatorCountry: 'España',
    regulator: 'Banco de España + CNMV',
    founded: 1995,
    etfCommission: '~8€ por orden',
    supportsFunds: true,
    supportsFundTransfers: true,
    minimumOpening: 'Sin mínimo',
    tagline: 'Banco online del Santander con plataforma de inversión',
    description:
      'Openbank es el banco online del grupo Santander, regulado por Banco de España y CNMV. Ofrece cuenta corriente sin comisiones, broker para acciones, ETFs y fondos de inversión. Sus comisiones de broker son más altas que Trade Republic o MyInvestor pero menores que la banca tradicional. Tiene roboadvisor propio con comisión más alta que Indexa o Finizens.',
    idealFor: [
      'Clientes Santander que quieren unificar',
      'Quien valora tener todo en un banco grande español',
    ],
    notIdealFor: [
      'Inversor con sensibilidad a costes',
      'Quien busca el TER más bajo en fondos',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos español',
    investmentGuarantee: '100.000€ por el Fondo de Garantía de Inversiones español',
    officialUrl: 'https://www.openbank.es',
    faq: [
      {
        q: '¿Openbank es buena opción para invertir en ETFs?',
        a: 'Comparado con Trade Republic (0€) o MyInvestor (0,20€ + 0,03%), las comisiones de Openbank por orden de ETF (~8€) son notablemente más altas. Para el inversor que prioriza el coste, hay mejores opciones. Openbank tiene sentido si ya eres cliente Santander/Openbank y valoras unificación.',
      },
    ],
  },
  {
    slug: 'ing',
    name: 'ING España',
    regulatorCountry: 'España',
    regulator: 'Banco de España + CNMV',
    founded: 1999,
    etfCommission: '~9-22€ por orden',
    supportsFunds: true,
    supportsFundTransfers: true,
    minimumOpening: 'Sin mínimo',
    tagline: 'Naranja Broker de ING: cuenta sin comisiones pero broker caro',
    description:
      'ING España ofrece la Cuenta Sin Nómina sin comisiones y el Naranja Broker para invertir en acciones y ETFs. Las comisiones de broker son significativamente más altas que la nueva generación de brokers digitales (Trade Republic, MyInvestor). Para el inversor que ya es cliente ING por la cuenta sin nómina, puede ser cómodo, pero el coste por aportación regular es elevado.',
    idealFor: [
      'Clientes ING que ya tienen la cuenta sin nómina',
      'Quien valora la marca y servicio bancario tradicional',
    ],
    notIdealFor: [
      'Inversor con aportaciones pequeñas regulares',
      'Quien quiera el coste mínimo en ETFs',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos español',
    investmentGuarantee: '100.000€ por el Fondo de Garantía de Inversiones español',
    officialUrl: 'https://www.ing.es',
    faq: [
      {
        q: '¿ING es bueno para invertir en ETFs en 2026?',
        a: 'Para el inversor indexado puro, las comisiones de ING son altas comparadas con brokers especializados. La cuenta corriente sin comisiones de ING es atractiva, pero para invertir es preferible operar en Trade Republic, MyInvestor o DEGIRO. Puedes tener nómina en ING y broker en otra entidad.',
      },
    ],
  },
  {
    slug: 'etoro',
    name: 'eToro',
    regulatorCountry: 'Chipre',
    regulator: 'CySEC',
    founded: 2007,
    etfCommission: '0€ en acciones y ETFs (con spread)',
    supportsFunds: false,
    minimumOpening: '50$ aprox.',
    tagline: 'Broker social con copy trading, comisiones cero pero spread incorporado',
    description:
      'eToro es un broker israelí con sede en Chipre, regulado por CySEC. Popularizó el copy trading (copiar automáticamente las operaciones de otros inversores). Cobra 0€ en acciones y ETFs pero su modelo monetiza vía spread (diferencia bid-ask más amplia que en brokers regulares) y comisión de retirada de fondos. Para inversor indexado tradicional, los brokers europeos puros son más eficientes.',
    idealFor: [
      'Interés específico en copy trading',
      'Inversor que quiere mezclar acciones con cripto',
    ],
    notIdealFor: [
      'Inversor indexado puro Boglehead',
      'Quien valora regulación específicamente española',
    ],
    investmentGuarantee: '20.000€ por el Fondo de Garantía de Inversiones chipriota',
    officialUrl: 'https://www.etoro.com/es',
    faq: [
      {
        q: '¿eToro es buena opción para invertir en ETFs en España?',
        a: 'Para inversor indexado tradicional, brokers europeos más puros como Trade Republic o DEGIRO son más eficientes. eToro tiene sentido si quieres específicamente copy trading o mezclar acciones con criptomonedas. Las comisiones de retirada y el spread amplio penalizan al inversor de largo plazo.',
      },
    ],
  },
  {
    slug: 'scalable-capital',
    name: 'Scalable Capital',
    regulatorCountry: 'Alemania',
    regulator: 'BaFin',
    founded: 2014,
    etfCommission: '0€ con plan Prime (suscripción mensual), 0,99€ sin suscripción',
    supportsFunds: false,
    remuneratedAccount: 'Hasta 4% TAE con plan Prime',
    minimumOpening: 'Sin mínimo',
    tagline: 'Broker alemán con planes de suscripción mensual y altos intereses',
    description:
      'Scalable Capital es un neobanco alemán fundado en 2014 y regulado por BaFin. Su modelo es híbrido: plan gratuito con comisión por operación (0,99€) o plan Prime con suscripción mensual (4,99€/mes aprox.) que da operaciones ilimitadas a 0€ y mejores tasas en cuenta remunerada. Disponible en España.',
    idealFor: [
      'Inversor con alto volumen mensual de operaciones',
      'Quien aprovecha la cuenta remunerada al máximo',
    ],
    notIdealFor: [
      'Aportación esporádica o muy pequeña (plan gratuito mejor con Trade Republic 0€)',
      'Quien no quiera suscripción mensual',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos alemán',
    investmentGuarantee: '20.000€ adicionales',
    officialUrl: 'https://es.scalable.capital',
    faq: [
      {
        q: '¿Vale la pena el plan Prime de Scalable Capital?',
        a: 'Depende del volumen. Si haces 5+ operaciones al mes y tienes saldo significativo (>10.000€) en cuenta remunerada, el plan Prime puede salir rentable por los intereses y operaciones ilimitadas. Para aportación mensual única, Trade Republic gratis es más sencillo.',
      },
    ],
  },
]

export function getBrokerBySlug(slug: string): Broker | undefined {
  return BROKERS.find((b) => b.slug === slug)
}
