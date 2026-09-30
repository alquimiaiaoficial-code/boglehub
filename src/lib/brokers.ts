/**
 * Base de datos de brókers populares para inversores indexados en España.
 *
 * Las comisiones se leyeron en la web de cada bróker el 30-sep-2026 (fuente y detalle en
 * `src/data/comisiones-brokers.ts`). Hasta ese día eran «aproximadas» y varias estaban mal:
 * MyInvestor figuraba a 0 € en ETF (cobra el 0,12 %, mínimo 1 €), DEGIRO a 2 € más 10 € de
 * custodia (no cobra custodia; 1 € en su Selección Principal), y la fórmula sumaba el mínimo
 * al porcentaje y aplicaba el porcentaje a la aportación del mes en vez de a cada orden.
 */

export interface BrokerFees {
  /** € fijos por operación de ETF. */
  etfTradeFee: number
  /** % sobre el importe de cada orden (se suma al fijo). */
  etfTradeFeePct?: number
  /** Mínimo por operación de ETF. */
  minPerEtfTrade?: number
  /** Máximo por operación de ETF. */
  maxPerEtfTrade?: number
  /** Desde este importe por orden, la compra de ETF sale gratis (Scalable: 250 €). */
  etfGratisDesdeImporte?: number
  /** € por operación de fondo indexado. null si no ofrece fondos indexados. */
  fondoIndexadoFee: number | null
  /** € fijos por año (custodia, conectividad y similares). */
  custodiaAnual: number
  /** % anual sobre el patrimonio (custodia variable). */
  custodiaPctAnual?: number
}

export interface BrokerFeatures {
  /** ¿Ofrece fondos indexados (no ETFs) con régimen español? */
  fondosIndexadosNacionales: boolean
  /** ¿Permite traspasos entre fondos sin tributar? */
  traspasosFondos: boolean
  /** ¿Anuncia planes de inversión periódicos en ETF sin comisión? */
  planesAhorroEtfGratis: boolean
  /** ¿La cuenta de efectivo paga intereses? */
  cuentaRemunerada: boolean
}

export interface Broker {
  id: string
  name: string
  type: 'neobroker' | 'tradicional' | 'extranjero'
  country: string
  url: string
  shortDescription: string
  fees: BrokerFees
  features: BrokerFeatures
  pros: string[]
  cons: string[]
  bestFor: string
}

export const BROKERS: Broker[] = [
  {
    id: 'myinvestor',
    name: 'MyInvestor',
    type: 'neobroker',
    country: 'España',
    url: 'https://myinvestor.es',
    shortDescription:
      'Banco español con fondos indexados sin comisión de compra y ETF al 0,12 % por operación (mínimo 1 €, máximo 25 €).',
    fees: {
      etfTradeFee: 0,
      etfTradeFeePct: 0.0012,
      minPerEtfTrade: 1,
      maxPerEtfTrade: 25,
      fondoIndexadoFee: 0,
      custodiaAnual: 0,
    },
    features: {
      fondosIndexadosNacionales: true,
      traspasosFondos: true,
      planesAhorroEtfGratis: false,
      cuentaRemunerada: true,
    },
    pros: [
      'Fondos indexados sin comisión de compra, y sin custodia.',
      'Permite traspasos entre fondos sin tributar, ventaja fiscal importante en España.',
      'Regulado en España, la declaración fiscal es directa.',
    ],
    cons: [
      'En ETF cada orden paga al menos 1 € (0,12 % del importe); el cambio de divisa, un 0,30 %.',
      'El catálogo de ETFs es más limitado que en brókers extranjeros.',
      'La app y la web son funcionales pero menos cuidadas que la competencia.',
    ],
    bestFor:
      'Inversor indexado en España que usa fondos indexados y quiere poder traspasarlos sin tributar.',
  },
  {
    id: 'trade-republic',
    name: 'Trade Republic',
    type: 'extranjero',
    country: 'Alemania',
    url: 'https://traderepublic.com',
    shortDescription:
      'Banco alemán con sucursal en España: 1 € por operación y planes de inversión sin comisión.',
    fees: {
      etfTradeFee: 1,
      fondoIndexadoFee: null,
      custodiaAnual: 0,
    },
    features: {
      fondosIndexadosNacionales: false,
      traspasosFondos: false,
      planesAhorroEtfGratis: true,
      cuentaRemunerada: true,
    },
    pros: [
      'Comisión plana de 1 € por operación, fácil de entender.',
      'Planes de ahorro periódicos en ETF totalmente gratuitos.',
      'Cuenta de efectivo remunerada (tipo variable).',
      'Una de las mejores apps de inversión en Europa.',
      /**
       * Añadido el 18-sep-2026 a raíz de una respuesta pública de Trade Republic en X, y
       * comprobado después: la sucursal española se confirmó en el BOE el 24 de abril de
       * 2025 y la migración de clientes a IBAN español empezó en junio de 2025. Desde
       * entonces la sucursal retiene IRPF sobre dividendos e intereses e informa a la AEAT,
       * así que los datos llegan precargados al borrador de la renta.
       *
       * Faltaba en la ficha, que solo decía «Alemania», y es justo el dato que a un inversor
       * español le cambia el trabajo de declarar.
       */
      'Tiene sucursal en España desde 2025: retiene IRPF e informa a la AEAT, así que los datos van precargados al borrador de la renta.',
    ],
    cons: [
      'No ofrece fondos indexados con el régimen español de traspasos.',
      'Catálogo más reducido que DEGIRO o IBKR.',
      // El matiz que acompaña al dato de arriba y que conviene no perder: el reporte a la
      // AEAT cubre desde la migración de cada cliente, no antes. Quien operase en 2024 o
      // antes de migrar su cuenta sigue teniendo que reconstruir esas operaciones a mano.
      'El reporte a la AEAT cubre desde que tu cuenta migró a IBAN español (2025); las operaciones anteriores hay que declararlas a mano.',
    ],
    bestFor:
      'Inversor que aporta de forma periódica a uno o dos ETFs concretos y valora simplicidad por encima de todo.',
  },
  {
    id: 'degiro',
    name: 'DEGIRO',
    type: 'extranjero',
    country: 'Países Bajos',
    url: 'https://degiro.es',
    shortDescription:
      'Bróker europeo con acceso a muchas bolsas: 1 € por operación en los ETF de su Selección Principal y 3 € en el resto.',
    // Se calcula con la Selección Principal (todos los ETF de Tradegate, entre ellos VWCE,
    // IWDA y CSPX) y la conectividad de una bolsa extranjera: 2,50 € al año.
    fees: {
      etfTradeFee: 1,
      fondoIndexadoFee: null,
      custodiaAnual: 2.5,
    },
    features: {
      fondosIndexadosNacionales: false,
      traspasosFondos: false,
      planesAhorroEtfGratis: false,
      cuentaRemunerada: false,
    },
    pros: [
      'Catálogo enorme de ETFs en bolsas internacionales.',
      'Bróker establecido y muy usado en Europa.',
      '1 € por operación en su Selección Principal, que incluye VWCE, IWDA o CSPX; sin custodia.',
    ],
    cons: [
      'No ofrece fondos indexados con el régimen español de traspasos.',
      'Fuera de la Selección Principal, 3 € por operación (2 € + 1 € de tramitación).',
      'Cobra hasta 2,50 € al año por cada bolsa extranjera en la que operes (conectividad).',
      'La declaración fiscal en España requiere algún trámite extra.',
    ],
    bestFor:
      'Inversor que quiere acceso a un catálogo amplio de ETFs y no necesita el régimen de traspasos.',
  },
  {
    id: 'scalable',
    name: 'Scalable Capital',
    type: 'extranjero',
    country: 'Alemania',
    url: 'https://scalable.capital',
    shortDescription:
      'Bróker alemán: 0,99 € por orden, 0 € en ETF de las grandes gestoras desde 250 € y planes de inversión sin comisión. PRIME+, 4,99 €/mes.',
    // Se calcula con el plan FREE.
    fees: {
      etfTradeFee: 0.99,
      etfGratisDesdeImporte: 250,
      fondoIndexadoFee: null,
      custodiaAnual: 0,
    },
    features: {
      fondosIndexadosNacionales: false,
      traspasosFondos: false,
      planesAhorroEtfGratis: true,
      cuentaRemunerada: true,
    },
    pros: [
      'Plan FREE sin cuota: 0 € al comprar ETF de Amundi, iShares, Vanguard o Xtrackers desde 250 €.',
      'Planes de inversión sin comisión.',
      'Plan PRIME+ (4,99 €/mes): 0 € en cualquier orden desde 250 €.',
    ],
    cons: [
      'Sin fondos indexados con el régimen español de traspasos.',
      'Las órdenes de menos de 250 € pagan 0,99 € en los dos planes.',
    ],
    bestFor:
      'Inversor con planes de ahorro periódicos o que combina varios ETFs cada mes.',
  },
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    type: 'extranjero',
    country: 'EE.UU. / Irlanda',
    url: 'https://interactivebrokers.com',
    shortDescription:
      'El bróker profesional global, ahora accesible también para inversores particulares.',
    fees: {
      // Tarifa por niveles en la bolsa alemana, sin las tasas de la bolsa.
      etfTradeFee: 0,
      etfTradeFeePct: 0.0005,
      minPerEtfTrade: 1.25,
      maxPerEtfTrade: 29,
      fondoIndexadoFee: null,
      custodiaAnual: 0,
    },
    features: {
      fondosIndexadosNacionales: false,
      traspasosFondos: false,
      planesAhorroEtfGratis: false,
      cuentaRemunerada: true,
    },
    pros: [
      '0,05 % por orden con un mínimo de 1,25 € (tarifa por niveles, más tasas de la bolsa).',
      'Acceso prácticamente a cualquier mercado del mundo.',
      'Cuenta remunerada en varias divisas.',
    ],
    cons: [
      'Plataforma compleja, pensada para profesionales.',
      'Registro y verificación KYC más exigentes.',
      'La declaración fiscal recae en el inversor: autoliquidación de plusvalías en el IRPF y modelo 720 si el patrimonio en el extranjero supera 50.000€.',
    ],
    bestFor:
      'Inversor con cartera mediana o grande que quiere acceso global y no le importa una interfaz técnica.',
  },
  {
    id: 'xtb',
    name: 'XTB',
    type: 'extranjero',
    country: 'Polonia',
    url: 'https://xtb.com',
    shortDescription:
      'Bróker polaco con 0 comisiones en ETFs y acciones hasta 100.000 € de volumen mensual.',
    fees: {
      etfTradeFee: 0,
      fondoIndexadoFee: null,
      custodiaAnual: 0,
    },
    features: {
      fondosIndexadosNacionales: false,
      traspasosFondos: false,
      planesAhorroEtfGratis: true,
      cuentaRemunerada: true,
    },
    pros: [
      '0 € comisiones en ETFs y acciones (hasta 100.000 €/mes de volumen).',
      'Planes de inversión sin comisión.',
      'App moderna y bien valorada.',
      'Cuenta de efectivo remunerada.',
    ],
    cons: [
      'Históricamente asociado a CFDs y forex: asegúrate de usar la cuenta de inversión, no la de CFDs.',
      'Catálogo de ETFs más limitado que DEGIRO o IBKR.',
      'No permite traspasos de fondos.',
      'Cambio de divisa al 0,5 %.',
    ],
    bestFor:
      'Inversor que opera con menos de 100.000 € al mes y quiere 0 € de comisión por orden.',
  },
]

export type InstrumentType = 'etf' | 'fondo'

export interface BrokerCostBreakdown {
  broker: Broker
  available: boolean
  annualCost: number
  totalCost: number
  reason?: string
}

/**
 * Calcula el coste anual y a N años para un bróker dado un patrón de inversión.
 * Si el bróker no soporta el tipo de instrumento elegido, devuelve available=false.
 */
export function computeBrokerCost(
  broker: Broker,
  params: {
    initialCapital: number
    monthlyContribution: number
    tradesPerMonth: number
    years: number
    instrumentType: InstrumentType
    /** Aporta con planes de inversión automáticos en vez de órdenes sueltas. */
    usaPlanes?: boolean
  }
): BrokerCostBreakdown {
  const { initialCapital, monthlyContribution, tradesPerMonth, years, instrumentType } =
    params

  // Disponibilidad según tipo de instrumento.
  if (instrumentType === 'fondo' && broker.fees.fondoIndexadoFee === null) {
    return {
      broker,
      available: false,
      annualCost: 0,
      totalCost: 0,
      reason: 'No ofrece fondos indexados.',
    }
  }

  const tradesAnnual = tradesPerMonth * 12

  let perTradeFee: number
  if (instrumentType === 'fondo') {
    perTradeFee = broker.fees.fondoIndexadoFee ?? 0
  } else if (params.usaPlanes && broker.features.planesAhorroEtfGratis) {
    perTradeFee = 0
  } else {
    perTradeFee = comisionPorOrdenEtf(
      broker.fees,
      tradesPerMonth > 0 ? monthlyContribution / tradesPerMonth : 0
    )
  }

  const tradesCost = perTradeFee * tradesAnnual
  const fixedAnnual = broker.fees.custodiaAnual
  const pctAnnual = broker.fees.custodiaPctAnual
    ? broker.fees.custodiaPctAnual * initialCapital
    : 0

  const annualCost = Math.round((tradesCost + fixedAnnual + pctAnnual) * 100) / 100
  const totalCost = Math.round(annualCost * years * 100) / 100

  return {
    broker,
    available: true,
    annualCost,
    totalCost,
  }
}

/**
 * Comisión de UNA orden de compra de ETF por `importe` euros: fijo + porcentaje, acotado por
 * el mínimo y el máximo del bróker. El porcentaje va sobre cada orden, no sobre lo aportado
 * en el mes (con 300 € en 3 órdenes, cada una es de 100 €).
 */
export function comisionPorOrdenEtf(fees: BrokerFees, importe: number): number {
  if (fees.etfGratisDesdeImporte != null && importe >= fees.etfGratisDesdeImporte) return 0
  let c = fees.etfTradeFee + (fees.etfTradeFeePct ?? 0) * importe
  if (fees.minPerEtfTrade != null) c = Math.max(c, fees.minPerEtfTrade)
  if (fees.maxPerEtfTrade != null) c = Math.min(c, fees.maxPerEtfTrade)
  return c
}

export function rankBrokers(
  params: {
    initialCapital: number
    monthlyContribution: number
    tradesPerMonth: number
    years: number
    instrumentType: InstrumentType
    usaPlanes?: boolean
  }
): BrokerCostBreakdown[] {
  return BROKERS.map((b) => computeBrokerCost(b, params)).sort((a, b) => {
    if (!a.available && !b.available) return 0
    if (!a.available) return 1
    if (!b.available) return -1
    return a.annualCost - b.annualCost
  })
}
