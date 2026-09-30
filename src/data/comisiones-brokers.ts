/**
 * Comisiones de los brókers, leídas en la web de cada uno el 30-sep-2026.
 *
 * Es la ÚNICA fuente de cifras de comisiones de la web: fichas /broker/*, calculadora
 * /calculadora/comparar-brokers, /datos-clave, /empezar, las FAQ de cada ETF y llms-full.
 * Si un texto necesita citar una comisión, la toma de aquí.
 *
 * Por qué existe: hasta ese día la web tenía dos juegos de datos que no coincidían, y
 * ninguno salía de los brókers. Los textos decían «Trade Republic 0 € por operación»,
 * «DEGIRO 0,50 € + 0,004 %» y «MyInvestor 0,20 € + 0,03 %»; la calculadora cobraba 0 € en
 * MyInvestor y 10 € de custodia en DEGIRO. En la web de cada uno: Trade Republic cobra 1 €
 * de «comisión de liquidación» por operación, DEGIRO 2 € + 1 € de tramitación (1 € en su
 * Selección Principal), MyInvestor el 0,12 % con mínimo de 1 €, y DEGIRO no cobra custodia.
 * Openbank figuraba con «~8 €» y cobra 1 €; ING con «~9-22 €» y cobra 3 € + 0,10 %.
 * El test `comisiones-brokers.test.ts` impide que vuelvan las cifras viejas.
 *
 * Las comisiones cambian: la fecha de cada fila dice cuándo se leyó.
 */

export interface ComisionBroker {
  /** Resumen para usar dentro de una frase: «Trade Republic (1 € por operación; …)». */
  corto: string
  /** Comisión por comprar un ETF con una orden normal, como la publica el bróker. */
  etf: string
  /** Planes de inversión periódicos en ETF, si el bróker los anuncia sin comisión. */
  planes?: string
  /** Otros costes fijos que publica (custodia, conectividad, cuota). */
  otros?: string
  /** Dónde se leyó. */
  fuente: string
  /** Cuándo se leyó (AAAA-MM-DD). */
  leido: string
}

export const COMISIONES: Record<string, ComisionBroker> = {
  'trade-republic': {
    corto: '1 € por operación; planes de inversión sin comisión',
    etf: '1 € por operación',
    planes: 'planes de inversión sin comisión',
    otros: 'La orden no tiene comisión; el euro es su «comisión de liquidación» (2 € si eliges la bolsa con Precio Directo). Sin custodia.',
    fuente: 'https://traderepublic.com/es-es (Fijación de precios y Ayuda: «¿Qué comisiones cobran?»)',
    leido: '2026-09-30',
  },
  degiro: {
    corto: '1 € por operación en su Selección Principal, 3 € en el resto',
    etf: '3 € por operación (2 € + 1 € de tramitación); 1 € en los ETF de su Selección Principal, que se negocian en Tradegate',
    otros: 'Sin custodia. Conectividad: 0,25 % del valor de la cuenta, con un máximo de 2,50 € al año por cada bolsa en la que operes, salvo la de Madrid. Cambio de divisa: 0,25 %.',
    fuente: 'https://www.degiro.es/tarifas y https://www.degiro.es/tarifas/etf-core-selection (tarifas del 01-10-2025)',
    leido: '2026-09-30',
  },
  myinvestor: {
    corto: '0,12 % por operación, mínimo 1 €',
    etf: '0,12 % por operación (mínimo 1 €, máximo 25 €)',
    otros: 'Sin custodia, mantenimiento ni inactividad. Cambio de divisa: 0,30 %. Fondos indexados sin comisión de compra.',
    fuente: 'https://myinvestor.es/inversion/broker',
    leido: '2026-09-30',
  },
  xtb: {
    corto: '0 € hasta 100.000 € al mes; planes de inversión sin comisión',
    etf: '0 € hasta 100.000 € al mes; por encima, 0,2 % (mínimo 10 €)',
    planes: 'planes de inversión sin comisión',
    otros: 'Cambio de divisa: 0,5 %.',
    fuente: 'https://www.xtb.com/es/cuenta-y-tarifas y https://www.xtb.com/es/planes-de-inversion',
    leido: '2026-09-30',
  },
  'interactive-brokers': {
    corto: '0,05 % por orden, mínimo 1,25 €',
    etf: '0,05 % del importe, mínimo 1,25 € (tarifa por niveles, más las tasas de la bolsa); en la tarifa fija, mínimo 3 €',
    fuente: 'https://www.interactivebrokers.ie/es/pricing/commissions-stocks-europe.php (Alemania)',
    leido: '2026-09-30',
  },
  'scalable-capital': {
    corto: '0,99 € por orden, 0 € desde 250 € en ETF de las grandes gestoras; planes de inversión sin comisión',
    etf: '0,99 € por orden; 0 € en ETF de Amundi, iShares, Vanguard y Xtrackers desde 250 €',
    planes: 'planes de inversión sin comisión',
    otros: 'Plan PRIME+: 4,99 € al mes, 0 € en órdenes desde 250 €.',
    fuente: 'https://es.scalable.capital/broker-online',
    leido: '2026-09-30',
  },
  'renta-4': {
    corto: '15 € por orden en bolsas europeas, 4 € en la española',
    etf: '4 € por operación por internet en la bolsa española (hasta 6.000 €) y 15 € en bolsas europeas como Fráncfort o Ámsterdam (hasta 30.000 €)',
    otros: 'En la bolsa española, además, 1 € de canon por orden.',
    fuente: 'https://www.r4.com/resources/pdf/tablonanuncios/hoja_tarifas.pdf (versión 1/7/26)',
    leido: '2026-09-30',
  },
  openbank: {
    corto: '1 € por operación',
    etf: '1 € por compra o venta, en cualquier mercado y por cualquier importe',
    otros: 'Sin custodia desde el 1 de octubre de 2026.',
    fuente: 'https://www.openbank.es/inversiones/invertir-bolsa-valores',
    leido: '2026-09-30',
  },
  ing: {
    corto: '3 € + 0,10 % por orden',
    etf: '3 € + 0,10 % por orden (1,5 € + 0,05 % a partir de 15 operaciones al trimestre)',
    otros: 'Cambio de divisa: 0,50 % (0,25 % en la tarifa reducida). Custodia: 0 € si operas al menos una vez en el trimestre; si no, 4,84 € por valor y trimestre. En 2026 devuelve la comisión de compra de ETF de varias gestoras (promoción hasta el 31-dic-2026).',
    fuente: 'https://www.ing.es/broker',
    leido: '2026-09-30',
  },
  etoro: {
    corto: '0 € de comisión',
    etf: '0 € de comisión, sin recargo propio sobre el diferencial de mercado',
    otros: 'Retirada gratis desde una cuenta en euros; 5 $ desde la cuenta en dólares.',
    fuente: 'https://www.etoro.com/es/trading/fees/',
    leido: '2026-09-30',
  },
}

/** Los tres brókers más citados en la web, con su comisión, para usar dentro de una frase. */
export const TRES_BROKERS = `${comisionEnLinea('trade-republic', 'Trade Republic')}, ${comisionEnLinea('degiro', 'DEGIRO')} y ${comisionEnLinea('myinvestor', 'MyInvestor')}`

/** «Trade Republic (1 € por operación; planes de inversión sin comisión)». */
export function comisionEnLinea(slug: string, nombre: string): string {
  const c = COMISIONES[slug]
  return c ? `${nombre} (${c.corto})` : nombre
}
