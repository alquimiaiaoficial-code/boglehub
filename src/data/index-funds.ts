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
  faq: IndexFundFaq[]
}

export const INDEX_FUNDS: IndexFund[] = [
  {
    slug: 'amundi-prime-global',
    name: 'Amundi Prime Global',
    manager: 'Amundi',
    isin: 'LU1931974692',
    index: 'Solactive GBS Global Markets Large & Mid Cap',
    ter: 0.05,
    assetClass: 'Renta variable',
    region: 'Global desarrollados',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor'],
    minimum: '1€',
    tagline: 'El fondo indexado global más barato disponible en España (TER 0,05%)',
    description:
      'El Amundi Prime Global es el fondo indexado con el TER más bajo accesible al inversor particular en España: 0,05% anual. Replica el índice Solactive GBS Global Markets, equivalente funcional al MSCI World (mercados desarrollados, ~1.500-2.000 grandes y medianas empresas). Disponible en MyInvestor desde 1€, con traspaso fiscal libre entre fondos. Para inversores que priorizan el coste mínimo y la eficiencia fiscal española, es difícilmente superable.',
    etfEquivalent: 'SWRD',
    faq: [
      { q: '¿Qué índice replica el Amundi Prime Global?', a: 'Replica el Solactive GBS Global Markets Large & Mid Cap, que cubre aproximadamente 1.500-2.000 grandes y medianas empresas de mercados desarrollados. Es equivalente funcional al MSCI World (no incluye emergentes). La correlación con el MSCI World supera el 99,9%.' },
      { q: '¿Por qué el Amundi Prime Global es tan barato (TER 0,05%)?', a: 'Amundi usa el índice Solactive (propiedad de la alemana Solactive AG) en lugar del MSCI World porque la licencia es más barata. Ese ahorro se traslada al inversor en forma de TER mínimo. La cobertura es prácticamente idéntica a un fondo MSCI World tradicional.' },
      { q: '¿Dónde puedo comprar el Amundi Prime Global?', a: 'Está disponible principalmente en MyInvestor desde 1€ de inversión mínima, sin comisión de compra ni custodia, con traspaso fiscal libre. Es uno de los fondos estrella de la plataforma para inversores indexados.' },
      { q: '¿Amundi Prime Global o el ETF SWRD?', a: 'Ambos cubren mercados desarrollados globales a coste bajísimo. El fondo Amundi Prime Global (TER 0,05%) permite traspaso fiscal libre entre fondos en España, ventaja exclusiva de los fondos. El ETF SWRD (TER 0,12%) es ligeramente más caro pero cotiza en bolsa en tiempo real. Para inversor a muy largo plazo en España que valore la fiscalidad: el fondo.' },
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
    slug: 'fidelity-msci-world',
    name: 'Fidelity MSCI World Index Fund',
    manager: 'Fidelity',
    isin: 'IE00BYX5MX67',
    index: 'MSCI World',
    ter: 0.12,
    assetClass: 'Renta variable',
    region: 'Global desarrollados',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor'],
    minimum: '1€',
    tagline: 'MSCI World de Fidelity con TER 0,12%, punto medio entre Amundi y Vanguard',
    description:
      'El Fidelity MSCI World Index Fund replica el MSCI World original con un TER del 0,12%, situándose entre el Amundi Prime Global (0,05%, índice Solactive) y el Vanguard Global Stock (0,18%, MSCI World). Para el inversor que quiere el índice MSCI World oficial al menor coste posible, es una opción muy competitiva. Disponible en MyInvestor con traspaso fiscal libre.',
    etfEquivalent: 'IWDA',
    faq: [
      { q: '¿Fidelity MSCI World es mejor que Vanguard Global Stock?', a: 'El Fidelity MSCI World (TER 0,12%) es más barato que el Vanguard Global Stock (TER 0,18%) y ambos replican el MSCI World original. Para coste mínimo manteniendo el índice MSCI World, Fidelity gana. La diferencia con Vanguard es la marca y el historial.' },
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
    name: 'Amundi Index MSCI Emerging Markets',
    manager: 'Amundi',
    isin: 'LU0996177134',
    index: 'MSCI Emerging Markets',
    ter: 0.20,
    assetClass: 'Renta variable',
    region: 'Emergentes',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor'],
    minimum: '1€',
    tagline: 'Exposición a mercados emergentes en formato fondo con traspaso libre',
    description:
      'El Amundi Index MSCI Emerging Markets replica el índice MSCI Emerging Markets (China, India, Taiwán, Corea, Brasil y otros) con TER 0,20%. Complemento natural de un fondo de mercados desarrollados (Amundi Prime Global) para construir una cartera global completa en formato fondo, con traspaso fiscal libre entre ambos.',
    etfEquivalent: 'EIMI',
    faq: [
      { q: '¿Cuánto peso dar a emergentes con el Amundi Index MSCI EM?', a: 'El peso "neutral" por capitalización global es ~12%. En una cartera de fondos con Amundi Prime Global (desarrollados) + Amundi Index MSCI EM (emergentes), una proporción 85/15 o 88/12 replica aproximadamente un MSCI ACWI. Más del 20% en emergentes es una apuesta activa.' },
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
    etfEquivalent: 'VFEM',
    faq: [
      { q: '¿Vanguard o Amundi para emergentes en fondo?', a: 'El Amundi Index MSCI EM (TER 0,20%) es algo más barato que el Vanguard Emerging Markets (TER 0,23%). Ambos cubren emergentes globalmente. Para coste mínimo: Amundi. Para marca Vanguard: Vanguard. La diferencia de coste es pequeña en términos absolutos.' },
    ],
  },
  {
    slug: 'vanguard-global-bond-eur-hedged',
    name: 'Vanguard Global Bond Index Fund EUR Hedged',
    manager: 'Vanguard',
    isin: 'IE00B18GC888',
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
    name: 'Vanguard Eurozone Stock Index Fund',
    manager: 'Vanguard',
    isin: 'IE0007987690',
    index: 'MSCI EMU (eurozona)',
    ter: 0.16,
    assetClass: 'Renta variable',
    region: 'Eurozona',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor', 'Renta 4'],
    minimum: '1€ (MyInvestor)',
    tagline: 'Bolsa de la eurozona en formato fondo, sin riesgo divisa',
    description:
      'El Vanguard Eurozone Stock Index Fund replica el MSCI EMU (grandes empresas de la eurozona), TER 0,16%. Para inversores que quieren sobreponderar Europa o reducir el riesgo divisa de su cartera (todo en euros). Traspaso fiscal libre. Complemento de una cartera global, no sustituto.',
    etfEquivalent: 'MEUD',
    faq: [
      { q: '¿Tiene sentido sobreponderar eurozona si vivo en España?', a: 'Es un debate. La ponderación por capitalización (MSCI World) ya incluye Europa en su peso natural (~16%). Sobreponderar la eurozona reduce el riesgo divisa pero es una apuesta activa. Un sesgo moderado del 10-15% extra puede tener sentido si reduces tu ansiedad por la divisa, pero la filosofía Boglehead pura recomienda el peso de mercado.' },
    ],
  },
  {
    slug: 'amundi-prime-usa',
    name: 'Amundi Prime USA',
    manager: 'Amundi',
    isin: 'LU2050633988',
    index: 'Solactive GBS United States',
    ter: 0.05,
    assetClass: 'Renta variable',
    region: 'Estados Unidos',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor'],
    minimum: '1€',
    tagline: 'Exposición a EE.UU. con el TER más bajo (0,05%) en formato fondo',
    description:
      'El Amundi Prime USA replica el mercado americano (Solactive GBS United States, equivalente al S&P 500 ampliado) con TER 0,05%, el más bajo para exposición USA en formato fondo en España. Alternativa ultra-económica al Vanguard US 500. Disponible en MyInvestor con traspaso fiscal libre.',
    etfEquivalent: 'CSPX',
    faq: [
      { q: '¿Amundi Prime USA o Vanguard US 500?', a: 'Amundi Prime USA (TER 0,05%) es más barato que el Vanguard US 500 (TER 0,10%). Amundi replica el índice Solactive GBS United States; Vanguard el S&P 500. La cobertura es prácticamente idéntica (mercado americano). Para coste mínimo: Amundi Prime USA.' },
    ],
  },
  {
    slug: 'fidelity-emerging-markets-index',
    name: 'Fidelity Emerging Markets Index Fund',
    manager: 'Fidelity',
    isin: 'IE00BYX5L514',
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
  {
    slug: 'amundi-prime-japan',
    name: 'Amundi Prime Japan',
    manager: 'Amundi',
    isin: 'LU2089238385',
    index: 'Solactive GBS Japan',
    ter: 0.05,
    assetClass: 'Renta variable',
    region: 'Japón',
    accumulating: true,
    currency: 'EUR',
    availableAt: ['MyInvestor'],
    minimum: '1€',
    tagline: 'Bolsa japonesa con TER mínimo (0,05%) en formato fondo',
    description:
      'El Amundi Prime Japan replica el mercado japonés (Solactive GBS Japan) con TER 0,05%. Para inversores que quieren sobreponderar Japón o construir una cartera por regiones. Disponible en MyInvestor con traspaso fiscal libre. Japón representa ~6% del MSCI World.',
    etfEquivalent: 'SJPA',
    faq: [
      { q: '¿Tiene sentido un fondo solo de Japón?', a: 'Para la mayoría de inversores indexados, no como posición principal — Japón ya está en su peso natural (~6%) dentro de un fondo global. Un fondo de Japón tiene sentido como sesgo táctico moderado o para construir una cartera por regiones con control fino de pesos.' },
    ],
  },
]

export function getIndexFundBySlug(slug: string): IndexFund | undefined {
  return INDEX_FUNDS.find((f) => f.slug === slug)
}
