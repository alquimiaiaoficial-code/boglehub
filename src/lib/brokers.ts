/**
 * Base de datos de brókers populares para inversores indexados en España.
 *
 * Las comisiones son APROXIMADAS y orientativas. Los brókers cambian sus
 * tarifas con frecuencia: cualquier decisión real debe verificarse en la web
 * oficial del bróker. Aquí buscamos una aproximación buena, no exactitud al
 * céntimo. Pensado para 2026.
 */

export interface BrokerFees {
  /** € por operación de ETF. */
  etfTradeFee: number
  /** % adicional sobre el monto de la operación (opcional). */
  etfTradeFeePct?: number
  /** Mínimo por operación de ETF (anula etfTradeFee si es mayor). */
  minPerEtfTrade?: number
  /** € por operación de fondo indexado. null si no ofrece fondos indexados. */
  fondoIndexadoFee: number | null
  /** € fijos por año (custodia y similares). */
  custodiaAnual: number
  /** % anual sobre el patrimonio (custodia variable). */
  custodiaPctAnual?: number
}

export interface BrokerFeatures {
  /** ¿Ofrece fondos indexados (no ETFs) con régimen español? */
  fondosIndexadosNacionales: boolean
  /** ¿Permite traspasos entre fondos sin tributar? */
  traspasosFondos: boolean
  /** ¿Tiene planes de ahorro periódicos gratis para ETFs? */
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
      'Neobanco español con foco en inversión indexada. 0 comisiones en fondos y ETFs.',
    fees: {
      etfTradeFee: 0,
      fondoIndexadoFee: 0,
      custodiaAnual: 0,
    },
    features: {
      fondosIndexadosNacionales: true,
      traspasosFondos: true,
      planesAhorroEtfGratis: true,
      cuentaRemunerada: true,
    },
    pros: [
      '0 € comisiones en fondos indexados y ETFs.',
      'Permite traspasos entre fondos sin tributar, ventaja fiscal importante en España.',
      'Planes de ahorro periódicos gratis para ETFs y fondos.',
      'Regulado en España, la declaración fiscal es directa.',
    ],
    cons: [
      'El catálogo de ETFs es más limitado que en brókers extranjeros.',
      'La app y la web son funcionales pero menos cuidadas que la competencia.',
    ],
    bestFor:
      'Inversor indexado típico en España que prioriza simplicidad, fiscalidad nacional y operativa sin comisiones.',
  },
  {
    id: 'trade-republic',
    name: 'Trade Republic',
    type: 'extranjero',
    country: 'Alemania',
    url: 'https://traderepublic.com',
    shortDescription:
      'Neobróker alemán con app muy cuidada y comisión plana de 1 € por operación.',
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
    ],
    cons: [
      'Solo ofrece ETFs y acciones, no fondos indexados con régimen español.',
      'No permite traspasos entre fondos.',
      'Catálogo más reducido que DEGIRO o IBKR.',
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
      'Bróker europeo establecido con amplio catálogo de ETFs y costes bajos.',
    fees: {
      etfTradeFee: 2,
      fondoIndexadoFee: null,
      custodiaAnual: 10,
    },
    features: {
      fondosIndexadosNacionales: false,
      traspasosFondos: false,
      planesAhorroEtfGratis: false,
      cuentaRemunerada: true,
    },
    pros: [
      'Catálogo enorme de ETFs en bolsas internacionales.',
      'Bróker establecido y muy usado en Europa.',
      'Comisiones bajas para operaciones puntuales.',
    ],
    cons: [
      'No ofrece fondos indexados, solo ETFs.',
      'No permite traspasos entre fondos.',
      'Cobra una pequeña tasa anual por cada mercado en el que operes.',
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
      'Neobróker alemán con dos planes: FREE (0,99 € por operación) y PRIME (4,99 €/mes con operaciones gratis).',
    fees: {
      etfTradeFee: 0.99,
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
      'Plan FREE sin cuota fija, ideal para volúmenes bajos.',
      'Planes de ahorro periódicos gratis.',
      'Plan PRIME (4,99 €/mes) sale a cuenta si haces muchas operaciones.',
    ],
    cons: [
      'Solo ETFs y acciones, sin fondos indexados.',
      'No permite traspasos.',
      'PRIME solo compensa a partir de unas 6 operaciones al mes.',
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
      etfTradeFee: 1.25,
      etfTradeFeePct: 0.0005,
      minPerEtfTrade: 1.25,
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
      'Comisiones muy bajas, especialmente al crecer el patrimonio.',
      'Acceso prácticamente a cualquier mercado del mundo.',
      'Conversión de divisas muy barata (clave si compras en USD).',
      'Cuenta remunerada en varias divisas.',
    ],
    cons: [
      'Plataforma compleja, pensada para profesionales.',
      'Registro y verificación KYC más exigentes.',
      'La declaración fiscal en España requiere reporting cuidadoso (modelo D-6, etc.).',
    ],
    bestFor:
      'Inversor con cartera mediana o grande que valora costes mínimos y acceso global, y no le importa una interfaz menos amigable.',
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
      planesAhorroEtfGratis: false,
      cuentaRemunerada: true,
    },
    pros: [
      '0 € comisiones en ETFs y acciones (hasta 100.000 €/mes de volumen).',
      'App moderna y bien valorada.',
      'Cuenta de efectivo remunerada.',
    ],
    cons: [
      'Históricamente asociado a CFDs y forex: asegúrate de usar la cuenta de inversión, no la de CFDs.',
      'Catálogo de ETFs más limitado que DEGIRO o IBKR.',
      'No permite traspasos de fondos.',
    ],
    bestFor:
      'Inversor que quiere 0 € comisiones puras y opera con volúmenes razonables.',
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
  } else {
    const pctPart = broker.fees.etfTradeFeePct
      ? broker.fees.etfTradeFeePct * monthlyContribution
      : 0
    perTradeFee = broker.fees.etfTradeFee + pctPart
    if (broker.fees.minPerEtfTrade && perTradeFee < broker.fees.minPerEtfTrade) {
      perTradeFee = broker.fees.minPerEtfTrade
    }
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

export function rankBrokers(
  params: {
    initialCapital: number
    monthlyContribution: number
    tradesPerMonth: number
    years: number
    instrumentType: InstrumentType
  }
): BrokerCostBreakdown[] {
  return BROKERS.map((b) => computeBrokerCost(b, params)).sort((a, b) => {
    if (!a.available && !b.available) return 0
    if (!a.available) return 1
    if (!b.available) return -1
    return a.annualCost - b.annualCost
  })
}
