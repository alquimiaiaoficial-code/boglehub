/**
 * Brokers populares entre inversores indexados en España.
 * Cada uno genera una página /broker/[slug] con análisis completo
 * y subpáginas /broker/[slug]/etfs, /broker/[slug]/comisiones, etc.
 *
 * Las comisiones salen de `comisiones-brokers.ts`, leídas en la web de cada bróker. Hasta el
 * 30-sep-2026 estaban escritas aquí a mano y casi todas eran viejas o inventadas: Trade
 * Republic figuraba gratis (cobra 1 €), Openbank a unos 8 € (1 €), ING a entre 9 y 22 €
 * (3 € + 0,10 %).
 */
import { COMISIONES } from './comisiones-brokers'

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
    etfCommission: COMISIONES['trade-republic'].etf,
    supportsFunds: false,
    remuneratedAccount: 'Sí, a tipo variable',
    minimumOpening: 'Sin mínimo',
    tagline: 'Banco alemán con sucursal en España, 1 € por operación y planes de inversión sin comisión',
    description:
      'Trade Republic es un banco alemán supervisado por BaFin y el Bundesbank, con sucursal en España. Cobra 1 € por operación (lo llama comisión de liquidación: la orden en sí no tiene comisión) y nada en los planes de inversión, que se programan desde 1 €. No cobra custodia y remunera el efectivo a tipo variable. Su app está pensada para aportar una cantidad fija cada mes sin dar órdenes a mano.',
    idealFor: [
      'Inversores que empiezan',
      'Aportaciones periódicas pequeñas (DCA mensual)',
      'Quien prefiere app móvil clara sobre interfaz técnica',
      'Inversores que quieren automatizar al máximo',
    ],
    notIdealFor: [
      'Quien necesite traspasar entre fondos sin tributar: su ayuda describe traspasos de valores, no el régimen español entre fondos',
      'Quien dé muchas órdenes sueltas pequeñas (cada una paga 1 €)',
      'Quien quiera acceso a mercados asiáticos directos',
      'Trader técnico con órdenes complejas',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos alemán',
    investmentGuarantee: '20.000€ adicionales por el Fondo de Garantía de Inversiones',
    officialUrl: 'https://traderepublic.com/es-es',
    faq: [
      {
        q: '¿Es seguro Trade Republic en España?',
        a: 'Sí. Trade Republic es un banco alemán con licencia bancaria completa supervisado por BaFin (regulador alemán) y el Bundesbank, con sucursal en España. Los depósitos en euros hasta 100.000€ están cubiertos por el Fondo de Garantía de Depósitos alemán. Las acciones y ETFs se custodian como patrimonio segregado del banco — son legalmente del cliente.',
      },
      {
        q: '¿Qué cobra Trade Republic por operar?',
        a: 'Según su ayuda, una comisión de liquidación de 1 € por operación, salvo en los planes de inversión, más diferenciales y costes de terceros (por ejemplo, la comisión de gestión de cada ETF). Si eliges la bolsa con Precio Directo, 2 €. No cobra custodia.',
      },
      {
        q: '¿Cuál es la diferencia con DEGIRO?',
        a: 'Trade Republic cobra 1 € por operación y nada en los planes de inversión, pensados para aportar una cantidad fija cada mes. DEGIRO cobra 1 € en los ETF de su Selección Principal (los que se negocian en Tradegate) y 3 € en el resto, y añade hasta 2,50 € al año por cada bolsa extranjera en la que operes; a cambio da acceso a más bolsas y tipos de orden. Con una comisión fija, lo que pesa es el tamaño de la orden: 1 € es un 1 % de una orden de 100 € y un 0,01 % de una de 10.000 €.',
      },
      {
        q: '¿Tributan los ETFs comprados en Trade Republic en España?',
        a: 'Sí, igual que en cualquier broker. Al vender un ETF con beneficio, la ganancia tributa en el IRPF del ahorro (19-30% según importe). Los ETF no tienen el régimen de traspaso sin tributar: vender uno para comprar otro tributa. Ese régimen es de los fondos de inversión y lo tramitan las entidades que los comercializan en España, como MyInvestor.',
      },
      {
        q: '¿Cuál es la rentabilidad real de la cuenta remunerada de Trade Republic?',
        a: 'Es variable. El 30 de septiembre de 2026 su web anunciaba un 3,04 % TAE para clientes nuevos, sobre saldos de hasta 50.000 €. El tipo cambia con los del BCE, así que conviene mirarlo en su web.',
      },
    ],
  },
  {
    slug: 'degiro',
    name: 'DEGIRO',
    regulatorCountry: 'Países Bajos',
    regulator: 'AFM',
    founded: 2008,
    etfCommission: COMISIONES.degiro.etf,
    supportsFunds: false,
    minimumOpening: 'Sin mínimo',
    tagline: 'Broker técnico con acceso a 50+ bolsas mundiales',
    description:
      'DEGIRO es un bróker holandés con sede en Ámsterdam, regulado por la AFM y parte de flatexDEGIRO Bank AG, supervisado por BaFin. En ETF cobra 2 € de comisión más 1 € de tramitación por operación, salvo en su Selección Principal (todos los ETF que se negocian en Tradegate), donde solo se paga el euro de tramitación. No cobra custodia; sí una comisión de conectividad de hasta 2,50 € al año por cada bolsa extranjera en la que operes. Da acceso a muchas bolsas internacionales.',
    idealFor: [
      'Quien compra ETF de su Selección Principal (1 € por operación)',
      'Quien necesita acceso a múltiples bolsas internacionales',
      'Trader técnico con órdenes avanzadas',
      'Acceso a ETFs nicho no disponibles en otros brokers',
    ],
    notIdealFor: [
      'Aportaciones muy pequeñas (1 € pesa más cuanto menor es la orden)',
      'Quien quiera planes de inversión automáticos sin comisión (no los anuncia en su tarifa)',
      'Quien busca fondos indexados con traspaso fiscal',
    ],
    depositGuarantee: 'No aplica (no es banco)',
    investmentGuarantee: '20.000€ por el Fondo de Garantía de Inversiones holandés (IFD)',
    officialUrl: 'https://www.degiro.es',
    faq: [
      {
        q: '¿Es seguro DEGIRO?',
        a: 'Sí. DEGIRO está regulado por la AFM (regulador holandés) y forma parte de flatexDEGIRO Bank AG, supervisado por BaFin. El Fondo de Garantía de Inversiones holandés cubre hasta 20.000€ en caso de insolvencia. Los valores de los clientes están separados de los del bróker; en las cuentas estándar DEGIRO puede prestarlos, y en la cuenta Custody no.',
      },
      {
        q: '¿Qué diferencia hay entre la cuenta básica y la Custody de DEGIRO?',
        a: 'En las cuentas estándar (Basic, Active o Trader), DEGIRO puede prestar tus valores a terceros (préstamo de valores). En la cuenta Custody no los presta. Según su web, las tarifas de las dos tienen algunas diferencias y se publican en dos relaciones de tarifas distintas.',
      },
      {
        q: '¿Tiene DEGIRO cuenta remunerada como Trade Republic?',
        a: 'En su página de tarifas no aparece remuneración del saldo en efectivo. Otros brókers, como Trade Republic o MyInvestor, sí anuncian cuenta remunerada.',
      },
      {
        q: '¿Qué es la Selección Principal de DEGIRO?',
        a: 'Es su tarifa reducida para ETF: todos los ETF, ETC y ETN que se negocian en Tradegate pagan solo 1 € de tramitación por operación, sin comisión. Incluye, por ejemplo, el VWCE, el IWDA y el CSPX. El resto de ETF paga 2 € de comisión más 1 € de tramitación.',
      },
      {
        q: '¿DEGIRO o Trade Republic para empezar?',
        a: 'En una orden suelta de un ETF de la Selección Principal, los dos cobran 1 €. La diferencia está en lo demás: Trade Republic tiene planes de inversión sin comisión para aportar cada mes de forma automática y no cobra conectividad; DEGIRO da acceso a más bolsas y tipos de orden, y cobra hasta 2,50 € al año por bolsa extranjera. Cuál encaja depende de cómo vaya a invertir cada uno.',
      },
    ],
  },
  {
    slug: 'myinvestor',
    name: 'MyInvestor',
    regulatorCountry: 'España',
    regulator: 'CNMV + Banco de España',
    founded: 2017,
    etfCommission: COMISIONES.myinvestor.etf,
    supportsFunds: true,
    supportsFundTransfers: true,
    remuneratedAccount: 'Sí, a tipo variable',
    minimumOpening: '1€ en fondos',
    tagline: 'Vanguard, Amundi y traspaso fiscal libre en un banco español',
    description:
      'MyInvestor es un banco español supervisado por el Banco de España y la CNMV. Ofrece a la vez fondos indexados de Vanguard, Fidelity y otras gestoras, ETFs en bolsa europea, traspaso de fondos sin tributar y un plan de pensiones indexado, todo en una sola entidad. En ETF cobra el 0,12 % por operación, con un mínimo de 1 € y un máximo de 25 €; los fondos no tienen comisión de compra, y no cobra custodia.',
    idealFor: [
      'Quien quiera fondos indexados con traspaso fiscal libre',
      'Inversores que valoran banco regulado en España',
      'Aportaciones pequeñas regulares (desde 1€)',
      'Quien busca planes de pensiones indexados baratos',
    ],
    notIdealFor: [
      'Quien solo quiere ETFs con aportaciones pequeñas: cada orden paga al menos 1 €',
      'Quien necesita acceso a mercados internacionales avanzados',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos español',
    investmentGuarantee: '100.000€ por el Fondo de Garantía de Inversiones español',
    officialUrl: 'https://myinvestor.es',
    faq: [
      {
        q: '¿Es seguro MyInvestor?',
        a: 'Sí. MyInvestor es un banco español, supervisado por el Banco de España y la CNMV. Los depósitos en euros hasta 100.000€ están cubiertos por el Fondo de Garantía de Depósitos español. Los fondos de inversión y ETFs se custodian como patrimonio segregado del banco — en caso de insolvencia siguen siendo del cliente y están cubiertos por el Fondo de Garantía de Inversiones hasta 100.000€.',
      },
      {
        q: '¿Qué fondos indexados de Vanguard ofrece MyInvestor?',
        a: 'MyInvestor ofrece varios fondos indexados de Vanguard: Global Stock Index, Emerging Markets Stock Index, Eurozone Stock Index, Global Bond Index (hedged EUR), entre otros. Todos con TER bajo y aportación mínima de 1€. La diferencia con los ETFs es que estos fondos permiten traspaso fiscal libre entre ellos, una ventaja exclusiva del régimen fiscal español de fondos.',
      },
      {
        q: '¿Qué es el Amundi Prime Global en MyInvestor?',
        a: 'El Amundi Prime Global (ISIN LU1931974692) no es un fondo indexado: es un ETF, el «Amundi Prime Global UCITS ETF DR (D)», y como cualquier ETF no se puede traspasar a otro producto sin tributar. Ese ISIN figura además como liquidado o fusionado; la gama viva es irlandesa (IE000QIF5N15 de reparto e IE0009DRDY20 de acumulación). Se cita a menudo como «el fondo indexado más barato de España», y nosotros mismos lo publicamos así hasta septiembre de 2026.',
      },
      {
        q: '¿MyInvestor tiene plan de pensiones indexado?',
        a: 'Sí, varios. El MyInvestor Indexado Global tiene comisión total alrededor del 0,30%, uno de los más bajos del mercado español. También ofrece planes white-label de Indexa Capital. El mínimo de aportación es 1€. Acepta traspasos desde otros planes de pensiones sin coste fiscal ni operativo.',
      },
      {
        q: '¿Cuánto cobra MyInvestor por comprar un ETF?',
        a: 'El 0,12 % del importe por operación, con un mínimo de 1 € y un máximo de 25 €: hasta unos 833 € se paga el mínimo, y a partir de unos 20.833 €, el máximo. Si el ETF cotiza en otra divisa, el cambio cuesta un 0,30 %. No cobra custodia.',
      },
    ],
  },
  {
    slug: 'xtb',
    name: 'XTB',
    regulatorCountry: 'España',
    regulator: 'CNMV',
    founded: 2002,
    etfCommission: COMISIONES.xtb.etf,
    supportsFunds: false,
    remuneratedAccount: 'Sí, a tipo variable',
    minimumOpening: 'Sin mínimo',
    tagline: 'Broker polaco con sucursal española, 0€ en ETFs hasta cierto volumen',
    description:
      'XTB es un broker polaco con sucursal regulada por CNMV en España. Su propuesta para ETFs: 0€ de comisión hasta 100.000€ de volumen mensual. Por encima de ese umbral, comisión del 0,2% (mínimo 10€). Sus planes de inversión tampoco tienen comisión. El cambio de divisa cuesta un 0,5 %. Tiene amplia oferta de instrumentos (acciones, ETFs, CFD, forex) y plataforma propia xStation, y remunera el efectivo no invertido a tipo variable.',
    idealFor: [
      'Inversores con volumen mensual <100.000€',
      'Quien aporta con planes de inversión automáticos (sin comisión)',
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
        a: 'No, hasta 100.000€ de volumen mensual en ETFs. Por encima de ese umbral, cobra 0,2% con un mínimo de 10€. Sus planes de inversión tampoco tienen comisión. Si el ETF cotiza en otra divisa, el cambio cuesta un 0,5 %.',
      },
      {
        q: '¿Cuál es la cuenta remunerada de XTB?',
        a: 'XTB remunera el capital no invertido a tipo variable. El tipo y las condiciones (saldo máximo remunerado, requisitos) cambian a menudo, así que conviene mirarlos en su web.',
      },
      {
        q: '¿Diferencia entre XTB y Trade Republic?',
        a: 'Trade Republic cobra 1 € por operación y nada en sus planes de inversión; XTB cobra 0 € por operación hasta 100.000 € al mes y tampoco cobra en sus planes. Trade Republic está supervisado por BaFin; XTB tiene sucursal supervisada por la CNMV y ofrece además CFD y la plataforma xStation.',
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
    etfCommission: COMISIONES['interactive-brokers'].etf,
    supportsFunds: true,
    minimumOpening: 'Sin mínimo',
    tagline: 'Broker institucional para inversores avanzados con acceso a 150 mercados',
    description:
      'Interactive Brokers (IBKR) es uno de los brokers más antiguos y respetados del mundo, fundado en 1978 en EE.UU. La sucursal europea (Interactive Brokers Ireland Limited) está regulada por el Central Bank of Ireland. Da acceso a más de 150 mercados en 33 países y 27 divisas. En ETF de la bolsa alemana cobra el 0,05 % del importe con un mínimo de 1,25 € en la tarifa por niveles (más las tasas de la bolsa), o un mínimo de 3 € en la tarifa fija.',
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
        a: 'Se usa sobre todo en perfiles avanzados o carteras grandes. La interfaz es más técnica que la de Trade Republic o MyInvestor. En la tarifa por niveles, una orden paga el 0,05 % con un mínimo de 1,25 €: por debajo de 2.500 € se paga el mínimo.',
      },
      {
        q: '¿Tiene IBKR cuenta remunerada en euros?',
        a: 'Sí. IBKR remunera el saldo en euros por encima de cierto umbral, a un tipo ligado al del BCE. Las condiciones cambian, así que conviene mirarlas en su web.',
      },
      {
        q: '¿Tarifa fija o por niveles?',
        a: 'En la bolsa alemana, la tarifa por niveles cobra el 0,05 % del importe con un mínimo de 1,25 € por orden, más las tasas de la bolsa; la fija cobra el 0,05 % con un mínimo de 3 €. En órdenes pequeñas, la diferencia está sobre todo en el mínimo.',
      },
    ],
  },
  {
    slug: 'renta-4',
    name: 'Renta 4 Banco',
    regulatorCountry: 'España',
    regulator: 'CNMV + Banco de España',
    founded: 1986,
    etfCommission: COMISIONES['renta-4'].etf,
    supportsFunds: true,
    supportsFundTransfers: true,
    minimumOpening: 'Sin mínimo',
    tagline: 'Banco de inversión español con fondos, ETF y oficinas',
    description:
      'Renta 4 es un banco español de inversión fundado en 1986, regulado por CNMV y Banco de España. Históricamente ha sido la opción para inversores que querían unificar custodia de fondos y ETFs en una entidad española. Por internet cobra 4 € por operación en la bolsa española (hasta 6.000 €) y 15 € en bolsas europeas como Fráncfort o Ámsterdam (hasta 30.000 €), donde cotizan la mayoría de los ETF UCITS. Ofrece una gama amplia de productos y servicio personal en oficinas.',
    idealFor: [
      'Inversores que prefieren contacto presencial y oficinas',
      'Patrimonios altos que valoran servicio',
      'Quien ya es cliente y no quiere cambiar',
    ],
    notIdealFor: [
      'Aportaciones pequeñas en ETF de bolsas europeas (15 € por orden hasta 30.000 €)',
      'Quien prioriza la comisión por orden sobre el servicio en oficina',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos español',
    investmentGuarantee: '100.000€ por el Fondo de Garantía de Inversiones español',
    officialUrl: 'https://www.r4.com',
    faq: [
      {
        q: '¿Cuánto cuesta comprar ETF en Renta 4?',
        a: 'Por internet, 4 € por operación en la bolsa española hasta 6.000 € (más 1 € de canon de la bolsa) y 15 € en bolsas europeas como Fráncfort, Ámsterdam o París hasta 30.000 €. Como la mayoría de los ETF UCITS cotizan en esas bolsas, una aportación de 300 € en uno de ellos paga un 5 % de comisión; en MyInvestor, la misma orden paga 1 €.',
      },
      {
        q: '¿Ofrece Renta 4 fondos Vanguard como MyInvestor?',
        a: 'Renta 4 ofrece una selección de fondos indexados, pero el catálogo de fondos baratos Vanguard/Amundi institucionales es más limitado que el de MyInvestor.',
      },
    ],
  },
  {
    slug: 'openbank',
    name: 'Openbank',
    regulatorCountry: 'España',
    regulator: 'Banco de España + CNMV',
    founded: 1995,
    etfCommission: COMISIONES.openbank.etf,
    supportsFunds: true,
    supportsFundTransfers: true,
    minimumOpening: 'Sin mínimo',
    tagline: 'Banco online del Santander con plataforma de inversión',
    description:
      'Openbank es el banco online del grupo Santander, regulado por Banco de España y CNMV. Ofrece cuenta corriente sin comisiones, broker para acciones, ETFs y fondos de inversión. En acciones y ETF cobra 1 € por compra o venta, en cualquier mercado y por cualquier importe, y deja de cobrar custodia el 1 de octubre de 2026.',
    idealFor: [
      'Clientes Santander que quieren unificar',
      'Quien valora tener todo en un banco grande español',
    ],
    notIdealFor: [
      'Quien busca un bróker especializado solo en inversión indexada',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos español',
    investmentGuarantee: '100.000€ por el Fondo de Garantía de Inversiones español',
    officialUrl: 'https://www.openbank.es',
    faq: [
      {
        q: '¿Cuánto cuesta comprar ETF en Openbank?',
        a: 'Según su web, 1 € por compra o venta de acciones y ETF, en cualquier mercado y por cualquier importe, y sin custodia desde el 1 de octubre de 2026. Es lo mismo que cobra Trade Republic por operación.',
      },
    ],
  },
  {
    slug: 'ing',
    name: 'ING España',
    regulatorCountry: 'España',
    regulator: 'Banco de España + CNMV',
    founded: 1999,
    etfCommission: COMISIONES.ing.etf,
    supportsFunds: true,
    supportsFundTransfers: true,
    minimumOpening: 'Sin mínimo',
    tagline: 'Broker NARANJA de ING: la misma tarifa en bolsa española e internacional',
    description:
      'ING España ofrece cuentas sin comisiones y el Broker NARANJA para invertir en acciones y ETFs. Cobra 3 € + 0,10 % por orden, igual en la bolsa española que en la internacional, o 1,5 € + 0,05 % si hiciste 15 operaciones o más el trimestre anterior. No cobra custodia si operas al menos una vez en el trimestre. En 2026 devuelve la comisión de compra de los ETF de varias gestoras, en una promoción que acaba el 31 de diciembre.',
    idealFor: [
      'Clientes ING que ya tienen la cuenta sin nómina',
      'Quien valora la marca y servicio bancario tradicional',
    ],
    notIdealFor: [
      'Aportaciones pequeñas: una orden de 300 € paga 3,30 €, un 1,1 %',
    ],
    // ING opera como sucursal de ING Bank N.V.: su documentación (ing.es/sobre-ing/pdf/DGS.pdf)
    // remite al sistema de garantía de depósitos holandés. Hasta el 30-sep-2026 decía «español».
    depositGuarantee: '100.000€ por el sistema de garantía de depósitos holandés (ING es sucursal de ING Bank N.V.)',
    officialUrl: 'https://www.ing.es',
    faq: [
      {
        q: '¿Cuánto cuesta comprar ETF en ING?',
        a: 'Con la tarifa base, 3 € + 0,10 % por orden: 3,30 € en una orden de 300 €. Con 15 operaciones o más en el trimestre anterior, 1,5 € + 0,05 %. El cambio de divisa cuesta un 0,50 % (0,25 % en la tarifa reducida). En 2026, además, devuelve la comisión de compra de los ETF de varias gestoras (Xtrackers, iShares, Amundi, WisdomTree y JP Morgan, entre otras) hasta el 31 de diciembre.',
      },
    ],
  },
  {
    slug: 'etoro',
    name: 'eToro',
    regulatorCountry: 'Chipre',
    regulator: 'CySEC',
    founded: 2007,
    etfCommission: COMISIONES.etoro.etf,
    supportsFunds: false,
    minimumOpening: '50$ aprox.',
    tagline: 'Bróker social con copy trading y 0 € de comisión en ETF',
    description:
      'eToro es un bróker con sede en Chipre, regulado por CySEC, conocido por el copy trading (copiar automáticamente las operaciones de otros inversores). No cobra comisión en ETF ni recargo propio sobre el diferencial de mercado. Retirar dinero es gratis desde una cuenta en euros y cuesta 5 $ desde la cuenta en dólares; si inviertes desde una divisa distinta a la del activo, hay costes de conversión.',
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
        q: '¿Cuánto cuesta invertir en ETF en eToro?',
        a: 'Según su página de comisiones, no cobra comisión por operaciones de ETF, sea cual sea el importe, ni recargo propio sobre el diferencial de mercado. Pueden aplicarse costes de conversión si inviertes desde una cuenta en una divisa distinta a la del activo, y retirar desde la cuenta en dólares cuesta 5 $.',
      },
    ],
  },
  {
    slug: 'scalable-capital',
    name: 'Scalable Capital',
    regulatorCountry: 'Alemania',
    regulator: 'BaFin',
    founded: 2014,
    etfCommission: COMISIONES['scalable-capital'].etf,
    supportsFunds: false,
    remuneratedAccount: 'Sí, a tipo variable',
    minimumOpening: 'Sin mínimo',
    tagline: 'Bróker alemán con plan gratuito y plan de cuota mensual (PRIME+)',
    description:
      'Scalable Capital es un bróker alemán fundado en 2014 y supervisado por BaFin, disponible en España. Tiene dos planes: FREE, sin cuota, que cobra 0,99 € por orden y 0 € al comprar ETF de Amundi, iShares, Vanguard y Xtrackers desde 250 €; y PRIME+, por 4,99 € al mes, con 0 € en órdenes desde 250 €. En los dos, los planes de inversión no tienen comisión.',
    idealFor: [
      'Quien aporta con planes de inversión automáticos (sin comisión)',
      'Quien compra ETF de las grandes gestoras en órdenes de 250 € o más',
    ],
    notIdealFor: [
      'Órdenes sueltas de menos de 250 € (0,99 € cada una)',
    ],
    depositGuarantee: '100.000€ por el Fondo de Garantía de Depósitos alemán',
    investmentGuarantee: '20.000€ adicionales',
    officialUrl: 'https://es.scalable.capital',
    faq: [
      {
        q: '¿Qué cambia entre el plan FREE y el PRIME+ de Scalable Capital?',
        a: 'Los dos tienen planes de inversión sin comisión. En órdenes sueltas, FREE cobra 0,99 € salvo al comprar ETF de Amundi, iShares, Vanguard o Xtrackers desde 250 €, que es gratis; PRIME+ cuesta 4,99 € al mes y cobra 0 € en cualquier orden desde 250 €. Por debajo de 250 €, los dos cobran 0,99 €. Con PRIME+, además, el efectivo se reparte en más bancos con garantía de depósitos.',
      },
    ],
  },
]

export function getBrokerBySlug(slug: string): Broker | undefined {
  return BROKERS.find((b) => b.slug === slug)
}
