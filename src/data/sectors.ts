/**
 * Sectores económicos para páginas /sector/[slug] con ETFs sectoriales.
 */

export interface Sector {
  slug: string
  name: string
  tagline: string
  description: string
  /** Pesos típicos en el MSCI World (orientativo) */
  msciWorldWeight: string
  /** ETFs sectoriales relacionados (UCITS) */
  relatedEtfs: { ticker: string; name: string }[]
  /** Empresas representativas (las top 5 del sector globalmente) */
  topCompanies: string[]
  /** Pros para incluir en cartera */
  pros: string[]
  /** Contras */
  cons: string[]
}

export const SECTORS: Sector[] = [
  {
    slug: 'tecnologia',
    name: 'Tecnología',
    tagline: 'El sector dominante de las últimas dos décadas',
    description: 'El sector tecnológico engloba empresas de software, hardware, semiconductores y servicios digitales. Es el mayor sector del MSCI World con ~24% de peso, dominado por las grandes tecnológicas americanas (Apple, Microsoft, Nvidia, Google, Meta).',
    msciWorldWeight: '~24%',
    relatedEtfs: [
      { ticker: 'EQQQ', name: 'Invesco EQQQ Nasdaq 100 UCITS ETF' },
      { ticker: 'SXRV', name: 'iShares NASDAQ 100 UCITS ETF' },
      { ticker: 'CNDX', name: 'iShares NASDAQ 100 UCITS ETF (LSE)' },
    ],
    topCompanies: ['Apple', 'Microsoft', 'Nvidia', 'Alphabet (Google)', 'Meta'],
    pros: ['Mayor crecimiento histórico en las últimas dos décadas', 'Empresas con márgenes muy altos y economías de escala', 'Innovación constante (IA, cloud, semiconductores)'],
    cons: ['Concentración geográfica (mayoría empresas americanas)', 'Valoraciones elevadas (PE alto)', 'Mayor volatilidad en correcciones'],
  },
  {
    slug: 'salud',
    name: 'Salud (Healthcare)',
    tagline: 'Sector defensivo con crecimiento estructural',
    description: 'El sector salud incluye farmacéuticas, biotecnología, equipos médicos y aseguradoras de salud. Pesa ~13% del MSCI World. Es considerado defensivo porque la demanda es relativamente independiente del ciclo económico, pero con potencial de crecimiento por el envejecimiento poblacional y la innovación biotecnológica.',
    msciWorldWeight: '~13%',
    relatedEtfs: [],
    topCompanies: ['Eli Lilly', 'UnitedHealth', 'Johnson & Johnson', 'Novo Nordisk', 'AbbVie'],
    pros: ['Sector defensivo, menos sensible al ciclo económico', 'Demanda estructural por envejecimiento poblacional', 'Márgenes altos en farmacéuticas innovadoras'],
    cons: ['Riesgo regulatorio (precios de medicamentos)', 'Caducidad de patentes', 'Innovación cara con resultados inciertos'],
  },
  {
    slug: 'financiero',
    name: 'Financiero',
    tagline: 'Bancos, aseguradoras y servicios financieros',
    description: 'El sector financiero engloba bancos comerciales, bancos de inversión, aseguradoras, gestoras de activos y servicios financieros. Pesa ~14% del MSCI World. Su rendimiento está altamente correlacionado con los tipos de interés y el ciclo económico.',
    msciWorldWeight: '~14%',
    relatedEtfs: [],
    topCompanies: ['JP Morgan', 'Berkshire Hathaway', 'Bank of America', 'Visa', 'Mastercard'],
    pros: ['Beneficiado por subidas de tipos de interés', 'Dividend yield generalmente alto', 'Sector cíclico con potencial alcista en expansión económica'],
    cons: ['Muy sensible al ciclo económico', 'Riesgo de crisis bancarias (2008, 2023)', 'Regulación creciente'],
  },
  {
    slug: 'consumo-discrecional',
    name: 'Consumo Discrecional',
    tagline: 'Productos y servicios no esenciales',
    description: 'El sector de consumo discrecional incluye automóviles, retail, hostelería, moda y entretenimiento. Pesa ~11% del MSCI World. Es altamente cíclico: en expansión económica vuela, en recesión sufre por reducción del gasto discrecional.',
    msciWorldWeight: '~11%',
    relatedEtfs: [],
    topCompanies: ['Amazon', 'Tesla', 'Home Depot', 'McDonald\'s', 'Nike'],
    pros: ['Beneficios altos en fases expansivas', 'Marcas con poder de pricing', 'Globales: capturan crecimiento de clase media emergente'],
    cons: ['Muy sensible a recesiones', 'Volatilidad alta', 'Cambios rápidos de tendencias de consumo'],
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    tagline: 'Maquinaria, transporte e infraestructura',
    description: 'El sector industrial incluye fabricantes de maquinaria, aeroespacial, defensa, transporte, construcción e ingeniería. Pesa ~10% del MSCI World. Cíclico, sensible a la inversión empresarial y al gasto público en infraestructura.',
    msciWorldWeight: '~10%',
    relatedEtfs: [],
    topCompanies: ['Siemens', 'Caterpillar', 'Boeing', 'Honeywell', 'GE Aerospace'],
    pros: ['Beneficiado por gasto en infraestructura y defensa', 'Empresas con foso económico (Siemens, ABB)', 'Dividend yield decente'],
    cons: ['Muy cíclico', 'Capital intensivo', 'Globalización y riesgos geopolíticos'],
  },
  {
    slug: 'energia',
    name: 'Energía',
    tagline: 'Petróleo, gas y energías renovables',
    description: 'El sector energético tradicional (petróleo y gas) pesa ~4% del MSCI World, una caída significativa desde décadas pasadas. Las energías renovables están dentro de "Utilities" o sectores específicos. Sector muy cíclico, dependiente del precio del petróleo y de transiciones energéticas regulatorias.',
    msciWorldWeight: '~4%',
    relatedEtfs: [],
    topCompanies: ['Exxon Mobil', 'Chevron', 'Shell', 'TotalEnergies', 'Saudi Aramco'],
    pros: ['Dividend yield históricamente alto', 'Cobertura natural contra inflación', 'Beneficio en momentos de tensión geopolítica'],
    cons: ['Transición energética crea riesgo estructural', 'Volatilidad del precio del petróleo', 'Presión regulatoria ESG'],
  },
  {
    slug: 'consumo-basico',
    name: 'Consumo Básico (Staples)',
    tagline: 'Productos de primera necesidad',
    description: 'El sector de consumo básico incluye alimentación, bebidas, productos de higiene y tabaco. Pesa ~7% del MSCI World. Es el más defensivo de todos: la demanda es prácticamente independiente del ciclo económico. Empresas como Nestlé, Coca-Cola, Procter & Gamble.',
    msciWorldWeight: '~7%',
    relatedEtfs: [],
    topCompanies: ['Procter & Gamble', 'Costco', 'Nestlé', 'Coca-Cola', 'PepsiCo'],
    pros: ['Sector más defensivo del mercado', 'Dividend yield generalmente alto y estable', 'Marcas globales con foso económico'],
    cons: ['Crecimiento limitado', 'Presión sobre márgenes por inflación', 'Cambios de hábitos de consumo'],
  },
  {
    slug: 'utilities',
    name: 'Utilities (Servicios Públicos)',
    tagline: 'Electricidad, agua y gas regulados',
    description: 'El sector utilities incluye empresas de electricidad, gas, agua y residuos. Pesa ~3% del MSCI World. Sector defensivo y regulado, con flujos de caja estables y dividend yield alto. Sensible a tipos de interés (sustituto parcial de los bonos).',
    msciWorldWeight: '~3%',
    relatedEtfs: [],
    topCompanies: ['NextEra Energy', 'Iberdrola', 'Enel', 'Duke Energy', 'Southern Company'],
    pros: ['Dividend yield estable y alto', 'Flujos de caja muy predecibles', 'Sector defensivo en recesiones'],
    cons: ['Crecimiento limitado', 'Sensible a tipos de interés', 'Capital intensivo, deuda elevada'],
  },
  {
    slug: 'inmobiliario-reits',
    name: 'Inmobiliario (REITs)',
    tagline: 'Real Estate Investment Trusts',
    description: 'Los REITs (Real Estate Investment Trusts) son empresas que poseen y gestionan inmuebles cotizados en bolsa. Pesan ~2-3% del MSCI World. Distribuyen al menos el 90% de sus beneficios como dividendos por obligación legal en EE.UU. Sensibles a tipos de interés.',
    msciWorldWeight: '~3%',
    relatedEtfs: [],
    topCompanies: ['Prologis', 'American Tower', 'Welltower', 'Equinix', 'Public Storage'],
    pros: ['Exposición a inmobiliario sin comprar inmuebles', 'Dividend yield alto por obligación legal', 'Diversificación frente a renta variable tradicional'],
    cons: ['Muy sensibles a tipos de interés', 'Alta volatilidad', 'Riesgo de oficinas y retail tradicional por cambio post-COVID'],
  },
  {
    slug: 'comunicaciones',
    name: 'Comunicaciones',
    tagline: 'Telecom, medios e internet',
    description: 'El sector comunicaciones engloba telecomunicaciones tradicionales (Telefónica, AT&T) y servicios de internet/medios (Alphabet, Meta, Netflix). Pesa ~7% del MSCI World, dominado por las grandes tecnológicas reclasificadas en 2018.',
    msciWorldWeight: '~7%',
    relatedEtfs: [],
    topCompanies: ['Alphabet (Google)', 'Meta', 'Netflix', 'T-Mobile', 'Comcast'],
    pros: ['Dominado por gigantes con efecto de red', 'Crecimiento estructural en digitalización', 'Márgenes altos en software/internet'],
    cons: ['Telecom tradicional sin crecimiento', 'Concentración en pocas empresas', 'Riesgo regulatorio (Big Tech)'],
  },
]

export function getSectorBySlug(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug)
}
