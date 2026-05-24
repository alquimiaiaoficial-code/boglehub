/**
 * Gestoras de fondos / ETFs UCITS más relevantes para inversores en España.
 * Cada una genera /gestora/[slug].
 */

export interface Gestora {
  slug: string
  name: string
  /** País de origen */
  origin: string
  /** Año de fundación */
  founded: number
  /** AUM global aproximado */
  aum: string
  /** Tipo de productos disponibles */
  products: string[]
  /** Marca de los ETFs */
  etfBrand?: string
  tagline: string
  description: string
  /** ETFs más populares en España */
  popularEtfs: { ticker: string; name: string }[]
  /** Disponibilidad de fondos en MyInvestor */
  availableInMyInvestor: boolean
  /** Sitio oficial */
  officialUrl: string
  faq: { q: string; a: string }[]
}

export const GESTORAS: Gestora[] = [
  {
    slug: 'vanguard',
    name: 'Vanguard',
    origin: 'Estados Unidos (Pensilvania)',
    founded: 1975,
    aum: '+9 billones $ globalmente',
    products: ['ETFs UCITS', 'Fondos indexados', 'Planes de pensiones'],
    tagline: 'La gestora fundada por John Bogle, padre de la inversión indexada',
    description:
      'Vanguard fue fundada en 1975 por John C. Bogle, considerado el padre de la inversión indexada moderna. Su estructura es única en el sector: es propiedad de los partícipes de sus propios fondos, lo que elimina conflicto de interés entre accionistas y clientes. Esta estructura permite mantener TER extremadamente bajos. Para inversores españoles, Vanguard ofrece ETFs UCITS (VWCE, VWRL, VUAA, VUSA, VEUR) accesibles vía Trade Republic/DEGIRO/MyInvestor, y fondos indexados institucionales accesibles vía MyInvestor con traspaso fiscal libre.',
    popularEtfs: [
      { ticker: 'VWCE', name: 'Vanguard FTSE All-World UCITS ETF (Acc)' },
      { ticker: 'VWRL', name: 'Vanguard FTSE All-World UCITS ETF (Dist)' },
      { ticker: 'VUAA', name: 'Vanguard S&P 500 UCITS ETF (Acc)' },
      { ticker: 'VUSA', name: 'Vanguard S&P 500 UCITS ETF (Dist)' },
      { ticker: 'VEUR', name: 'Vanguard FTSE Developed Europe UCITS ETF' },
      { ticker: 'VFEM', name: 'Vanguard FTSE Emerging Markets UCITS ETF' },
    ],
    availableInMyInvestor: true,
    officialUrl: 'https://www.vanguard.com',
    faq: [
      {
        q: '¿Por qué Vanguard es tan especial?',
        a: 'Vanguard es la única gestora grande del mundo cuya estructura es de propiedad mutua: los partícipes de sus fondos son los dueños de la gestora. No hay accionistas externos a los que pagar dividendos, así que todos los beneficios se reinvierten en bajar comisiones. El resultado: TER consistentemente más bajos que la competencia y un alineamiento de incentivos único en la industria.',
      },
      {
        q: '¿Cuál es el ETF más popular de Vanguard en España?',
        a: 'VWCE (Vanguard FTSE All-World UCITS ETF Acc, ISIN IE00B3RBWM25) es el ETF más popular entre inversores indexados españoles. Incluye más de 3.700 empresas de mercados desarrollados y emergentes en un solo producto, con TER 0,22% y política de acumulación. Disponible en Trade Republic, DEGIRO y la mayoría de brokers europeos.',
      },
      {
        q: '¿Vanguard tiene fondos indexados disponibles en España?',
        a: 'Sí, la gama Vanguard Institucional está disponible en MyInvestor desde 1€ de aportación. Los fondos más populares: Vanguard Global Stock Index, Emerging Markets, Eurozone Stock Index y Global Bond Index Hedged EUR. La ventaja sobre los ETFs Vanguard: permiten traspaso fiscal libre entre fondos sin tributar (régimen exclusivo de fondos en España).',
      },
    ],
  },
  {
    slug: 'ishares-blackrock',
    name: 'iShares (BlackRock)',
    origin: 'Estados Unidos (Nueva York)',
    founded: 2000,
    aum: '+3 billones $ en ETFs globalmente',
    products: ['ETFs UCITS', 'ETC físicos'],
    etfBrand: 'iShares',
    tagline: 'La marca de ETFs de BlackRock, líder mundial en gestión de activos',
    description:
      'iShares es la marca de ETFs de BlackRock, la mayor gestora de activos del mundo (+10 billones $ AUM). Lanzada en 2000, hoy tiene más de 1.300 ETFs disponibles globalmente. Para inversores europeos, la familia iShares UCITS incluye los productos más líquidos y populares: IWDA, EIMI, AGGH, CSPX, EUNL. Los ETFs iShares Core suelen ser los más establecidos y con mayor patrimonio gestionado, lo que se traduce en spreads más estrechos.',
    popularEtfs: [
      { ticker: 'IWDA', name: 'iShares Core MSCI World UCITS ETF' },
      { ticker: 'CSPX', name: 'iShares Core S&P 500 UCITS ETF' },
      { ticker: 'EIMI', name: 'iShares Core MSCI EM IMI UCITS ETF' },
      { ticker: 'AGGH', name: 'iShares Core Global Aggregate Bond UCITS ETF EUR Hedged' },
      { ticker: 'EUNL', name: 'iShares Core MSCI World UCITS ETF (Xetra)' },
      { ticker: 'SGLN', name: 'iShares Physical Gold ETC' },
    ],
    availableInMyInvestor: false,
    officialUrl: 'https://www.ishares.com/es',
    faq: [
      {
        q: '¿Vanguard o iShares para inversor español?',
        a: 'Ambas son excelentes, pero con perfiles distintos. iShares (IWDA, CSPX) tiene mayor liquidez y patrimonio en sus ETFs, lo que se traduce en spreads más estrechos. Vanguard tiene la estructura única de propiedad mutua que históricamente garantiza TER muy bajos. Para máxima simplicidad global, VWCE (Vanguard). Para Core MSCI World con TER 0,20%, IWDA (iShares). Ambos son válidos.',
      },
      {
        q: '¿Qué significa Core en los ETFs iShares?',
        a: 'iShares Core son los ETFs más establecidos y populares de la marca, con menor TER y mayor liquidez que los productos no-Core. Diseñados como base de cartera para inversores a largo plazo: IWDA (Core MSCI World), CSPX (Core S&P 500), EIMI (Core MSCI EM IMI), AGGH (Core Global Aggregate Bond). Son la apuesta segura para construir cartera Boglehead.',
      },
    ],
  },
  {
    slug: 'spdr-state-street',
    name: 'SPDR (State Street)',
    origin: 'Estados Unidos (Boston)',
    founded: 1993,
    aum: '+1 billón $ en ETFs',
    products: ['ETFs UCITS', 'ETC'],
    etfBrand: 'SPDR',
    tagline: 'Pionero de los ETFs: lanzaron el primer ETF en 1993 (SPY)',
    description:
      'State Street Global Advisors lanzó el primer ETF de la historia en 1993: el SPDR S&P 500 (SPY), aún hoy uno de los más grandes del mundo. La familia SPDR UCITS es popular en Europa por TER muy competitivos en algunos productos clave: SWRD (MSCI World, TER 0,12%) es el ETF MSCI World UCITS más barato del mercado, SPXS (S&P 500, TER 0,03%) compite con CSPX/VUAA.',
    popularEtfs: [
      { ticker: 'SWRD', name: 'SPDR MSCI World UCITS ETF' },
      { ticker: 'SPXS', name: 'SPDR S&P 500 UCITS ETF' },
      { ticker: 'SSAC', name: 'SPDR MSCI ACWI IMI UCITS ETF' },
      { ticker: 'ZPRV', name: 'SPDR S&P 600 US Small Cap Value UCITS ETF' },
      { ticker: 'ZPRG', name: 'SPDR S&P Global Dividend Aristocrats UCITS ETF' },
    ],
    availableInMyInvestor: false,
    officialUrl: 'https://www.ssga.com',
    faq: [
      {
        q: '¿Por qué SWRD tiene TER del 0,12% si IWDA tiene 0,20%?',
        a: 'SPDR (State Street) decidió competir agresivamente en precio con sus ETFs MSCI World UCITS más recientes (SWRD lanzado en 2019). iShares mantiene el TER 0,20% en IWDA porque su volumen le permite tener tracking difference cercano a cero, lo que en la práctica compensa parte de la diferencia. Ambos son válidos: SWRD es más barato; IWDA es más líquido.',
      },
    ],
  },
  {
    slug: 'amundi',
    name: 'Amundi',
    origin: 'Francia',
    founded: 2010,
    aum: '+2 billones € globalmente',
    products: ['ETFs UCITS', 'Fondos indexados', 'Planes de pensiones'],
    etfBrand: 'Amundi ETF (antes Lyxor)',
    tagline: 'Mayor gestora europea, fusionada con Lyxor en 2022',
    description:
      'Amundi es la mayor gestora de activos europea, con sede en París. En 2022 adquirió Lyxor, integrando dos familias de ETFs UCITS en una sola. Para inversores españoles, Amundi destaca especialmente por el Amundi Prime Global (TER 0,05%), el fondo indexado global más barato disponible al inversor particular en España vía MyInvestor, con traspaso fiscal libre.',
    popularEtfs: [
      { ticker: 'MWRD', name: 'Amundi Core MSCI World UCITS ETF' },
      { ticker: 'AEEM', name: 'Amundi MSCI Emerging Markets UCITS ETF' },
      { ticker: 'MEUD', name: 'Amundi Stoxx Europe 600 UCITS ETF' },
    ],
    availableInMyInvestor: true,
    officialUrl: 'https://www.amundi.es',
    faq: [
      {
        q: '¿Qué es el Amundi Prime Global y por qué destaca?',
        a: 'El Amundi Prime Global (ISIN LU1931974692) es un fondo indexado con TER 0,05%, el más bajo disponible al inversor particular en España. Replica el índice Solactive GBS Global Markets (equivalente al MSCI World). Solo disponible en MyInvestor desde 1€ con traspaso fiscal libre. Es la opción más eficiente en coste para la exposición global a mercados desarrollados.',
      },
      {
        q: '¿Qué pasó con Lyxor después de la fusión con Amundi?',
        a: 'Amundi compró Lyxor en 2022. Algunos ETFs Lyxor mantuvieron sus tickers; otros se renombraron a Amundi. El cambio fue transparente para inversores. La fusión consolidó a Amundi como mayor proveedor europeo de ETFs.',
      },
    ],
  },
  {
    slug: 'invesco',
    name: 'Invesco',
    origin: 'Estados Unidos (Georgia)',
    founded: 1935,
    aum: '+1,5 billones $ globalmente',
    products: ['ETFs UCITS', 'ETC físicos'],
    etfBrand: 'Invesco / PowerShares',
    tagline: 'Gestora con productos especializados, incluyendo Nasdaq 100 (EQQQ)',
    description:
      'Invesco es una gestora americana presente en Europa con productos UCITS. Su ETF más popular en España es EQQQ (Invesco EQQQ Nasdaq 100 UCITS ETF, ISIN IE0032077012), el ETF Nasdaq 100 más popular y líquido del mercado europeo. También tiene productos en oro, materias primas y ETFs sectoriales.',
    popularEtfs: [
      { ticker: 'EQQQ', name: 'Invesco EQQQ Nasdaq 100 UCITS ETF' },
      { ticker: 'EGLN', name: 'Invesco Physical Gold ETC' },
    ],
    availableInMyInvestor: false,
    officialUrl: 'https://www.invesco.com',
    faq: [
      {
        q: '¿Por qué EQQQ es tan popular?',
        a: 'EQQQ fue uno de los primeros ETFs UCITS de Nasdaq 100 lanzado en Europa (2002), lo que le ha dado tiempo para acumular liquidez y patrimonio (+7.000M USD). TER 0,30%. Para inversores europeos que quieren exposición específica al Nasdaq 100, EQQQ es la opción de referencia por liquidez y reputación.',
      },
    ],
  },
  {
    slug: 'xtrackers-dws',
    name: 'Xtrackers (DWS)',
    origin: 'Alemania',
    founded: 2007,
    aum: '+250 mil millones €',
    products: ['ETFs UCITS', 'ETC físicos'],
    etfBrand: 'Xtrackers',
    tagline: 'ETFs alemanes de DWS (grupo Deutsche Bank)',
    description:
      'Xtrackers es la marca de ETFs de DWS, gestora alemana del grupo Deutsche Bank. Productos UCITS competitivos en MSCI World, MSCI ACWI, eurozona y materias primas. El 4GLD (Xtrackers IE Physical Gold EUR) es un ETC de oro físico que cotiza directamente en euros, útil para inversores que quieren evitar el riesgo divisa en su exposición al oro.',
    popularEtfs: [
      { ticker: 'XDWD', name: 'Xtrackers MSCI World UCITS ETF' },
      { ticker: 'XDEM', name: 'Xtrackers MSCI Emerging Markets UCITS ETF' },
      { ticker: '4GLD', name: 'Xtrackers IE Physical Gold EUR ETC' },
    ],
    availableInMyInvestor: false,
    officialUrl: 'https://etf.dws.com',
    faq: [
      {
        q: '¿Por qué elegir Xtrackers sobre iShares o Vanguard?',
        a: 'Para la mayoría de inversores, iShares y Vanguard son opciones más populares y líquidas. Xtrackers tiene productos competitivos en algunos nichos: el 4GLD cotiza directamente en euros (útil para evitar conversión), y algunos productos europeos tienen TER más bajo. Para cartera estándar, iShares/Vanguard son más establecidos.',
      },
    ],
  },
  {
    slug: 'fidelity',
    name: 'Fidelity International',
    origin: 'Estados Unidos / Bermudas',
    founded: 1946,
    aum: '+700 mil millones $',
    products: ['Fondos indexados', 'ETFs'],
    tagline: 'Gestora americana con fondos indexados de bajo coste en España',
    description:
      'Fidelity Investments es una gestora americana fundada en 1946. La rama internacional ofrece fondos indexados disponibles en España con TER competitivos: Fidelity MSCI World Index Fund tiene TER del 0,12%, una alternativa al Vanguard Global Stock Index Fund. Disponible en MyInvestor con traspaso fiscal libre.',
    popularEtfs: [],
    availableInMyInvestor: true,
    officialUrl: 'https://www.fidelityinternational.com',
    faq: [
      {
        q: '¿Cuál es la diferencia entre Fidelity y Vanguard?',
        a: 'Ambas ofrecen fondos indexados de bajo coste. Fidelity MSCI World tiene TER 0,12% (vs Vanguard Global Stock 0,18%). Fidelity es propiedad de la familia Johnson; Vanguard es propiedad mutua. En términos prácticos para el inversor en MyInvestor, ambos son válidos: elegir el TER más bajo (Fidelity en este caso) tiene sentido si no hay otras diferencias relevantes.',
      },
    ],
  },
  {
    slug: 'lyxor',
    name: 'Lyxor (ahora Amundi)',
    origin: 'Francia',
    founded: 1998,
    aum: 'Fusionada con Amundi en 2022',
    products: ['ETFs UCITS (renombrados a Amundi)'],
    tagline: 'Gestora francesa pionera en ETFs, ahora parte de Amundi',
    description:
      'Lyxor fue una de las pioneras europeas en ETFs UCITS. Adquirida por Amundi en 2022, sus productos fueron integrados o renombrados. Algunos ETFs mantienen el ticker Lyxor original (MWRD por ejemplo) mientras otros han migrado a la marca Amundi. Para inversores españoles, la oferta actual debe consultarse bajo el catálogo Amundi.',
    popularEtfs: [
      { ticker: 'MWRD', name: 'Lyxor Core MSCI World UCITS ETF (ahora bajo Amundi)' },
    ],
    availableInMyInvestor: false,
    officialUrl: 'https://www.amundi.es',
    faq: [
      {
        q: '¿Lyxor todavía existe en 2026?',
        a: 'Como entidad independiente, no. Lyxor fue adquirida por Amundi en 2022 y sus productos se integraron en la gama Amundi ETF. Algunos tickers Lyxor históricos (como MWRD) se mantienen por continuidad operativa pero la gestora real es Amundi.',
      },
    ],
  },
]

export function getGestoraBySlug(slug: string): Gestora | undefined {
  return GESTORAS.find((g) => g.slug === slug)
}
