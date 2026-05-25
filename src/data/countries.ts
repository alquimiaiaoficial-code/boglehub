/**
 * Países / regiones para páginas /pais/[slug].
 * Cada uno con ETFs específicos y datos clave para inversor español.
 */

export interface Country {
  slug: string
  name: string
  tagline: string
  description: string
  /** Peso en el MSCI ACWI (mercados desarrollados + emergentes) */
  worldWeight: string
  /** ETFs UCITS relacionados disponibles en España */
  relatedEtfs: { ticker: string; name: string }[]
  /** Tipo: desarrollado o emergente */
  marketType: 'desarrollado' | 'emergente'
  /** Convenio doble imposición con España */
  taxTreaty: string
  /** Pros */
  pros: string[]
  /** Contras */
  cons: string[]
}

export const COUNTRIES: Country[] = [
  {
    slug: 'estados-unidos',
    name: 'Estados Unidos',
    tagline: 'El mercado más grande y líquido del mundo',
    description: 'Estados Unidos representa aproximadamente el 60-65% del MSCI ACWI por capitalización bursátil. El mercado americano alberga las mayores empresas tecnológicas del mundo (Apple, Microsoft, Nvidia, Google, Meta) y las multinacionales más establecidas. Para inversores indexados, EE.UU. es la exposición principal en cualquier cartera global.',
    worldWeight: '~62%',
    relatedEtfs: [
      { ticker: 'CSPX', name: 'iShares Core S&P 500 UCITS ETF' },
      { ticker: 'VUAA', name: 'Vanguard S&P 500 UCITS ETF (Acc)' },
      { ticker: 'SPXS', name: 'SPDR S&P 500 UCITS ETF' },
      { ticker: 'EQQQ', name: 'Invesco EQQQ Nasdaq 100 UCITS ETF' },
    ],
    marketType: 'desarrollado',
    taxTreaty: 'Convenio España-EE.UU. (retención 15% dividendos para personas físicas; 30% para fondos no-UCITS irlandeses; 15% para UCITS irlandeses)',
    pros: ['Mercado más líquido y profundo del mundo', 'Empresas innovadoras líderes globales', 'Regulación SEC robusta'],
    cons: ['Concentración alta en pocas empresas (top 10 pesa 30%+)', 'Valoraciones elevadas histórico', 'Riesgo divisa USD para inversor español'],
  },
  {
    slug: 'europa',
    name: 'Europa',
    tagline: 'Mercado desarrollado con sesgo industrial y dividendos',
    description: 'Europa (Reino Unido + eurozona + países nórdicos + Suiza) pesa ~14% del MSCI ACWI. Mercado maduro con empresas industriales, farmacéuticas, lujo y energía. Históricamente con dividend yield más alto que EE.UU. y valoraciones más bajas. Para inversores españoles, parte de la exposición es en su propia divisa (EUR) lo que reduce el riesgo divisa.',
    worldWeight: '~14%',
    relatedEtfs: [
      { ticker: 'VEUR', name: 'Vanguard FTSE Developed Europe UCITS ETF' },
      { ticker: 'IMEU', name: 'iShares Core MSCI Europe UCITS ETF' },
      { ticker: 'SMEA', name: 'iShares Core MSCI EMU UCITS ETF (eurozona)' },
      { ticker: 'MEUD', name: 'Amundi Stoxx Europe 600 UCITS ETF' },
    ],
    marketType: 'desarrollado',
    taxTreaty: 'Sin retención adicional para ETFs UCITS irlandeses con activos europeos',
    pros: ['Sin riesgo divisa para inversor español en empresas eurozona', 'Dividend yield más alto que EE.UU.', 'Valoraciones más bajas que mercado americano'],
    cons: ['Crecimiento histórico inferior a EE.UU.', 'Menos exposición a tecnología puntera', 'Fragmentación regulatoria y económica'],
  },
  {
    slug: 'japon',
    name: 'Japón',
    tagline: 'Tercera economía mundial con foso de valoración bajo',
    description: 'Japón pesa ~6% del MSCI World. Mercado desarrollado tradicional con empresas industriales líderes (Toyota, Sony, Mitsubishi), sector financiero amplio y dividendos crecientes desde las reformas de Abenomics. Históricamente con valoraciones más bajas que EE.UU.',
    worldWeight: '~6%',
    relatedEtfs: [
      { ticker: 'SJPA', name: 'iShares Core MSCI Japan IMI UCITS ETF' },
    ],
    marketType: 'desarrollado',
    taxTreaty: 'Convenio España-Japón (retención 15% dividendos)',
    pros: ['Valoraciones históricamente bajas (PE bajo)', 'Empresas líderes globales (Toyota, Sony)', 'Diversificación geográfica fuera de EE.UU.'],
    cons: ['Crecimiento poblacional negativo', 'Mercado lateral durante décadas (1990-2010)', 'Riesgo divisa JPY'],
  },
  {
    slug: 'china',
    name: 'China',
    tagline: 'Mayor mercado emergente con potencial y riesgo',
    description: 'China pesa ~3% del MSCI ACWI globalmente, aunque dentro del subíndice de mercados emergentes representa ~25-30%. Mercado con potencial enorme pero también con riesgos políticos, regulatorios y de transparencia. Sector tecnológico con líderes globales (Alibaba, Tencent, BYD) pero historial reciente de intervención gubernamental.',
    worldWeight: '~3%',
    relatedEtfs: [],
    marketType: 'emergente',
    taxTreaty: 'Convenio España-China (retención 10% dividendos)',
    pros: ['Mayor mercado emergente con potencial demográfico y económico', 'Empresas tecnológicas líderes en sus categorías', 'Valoraciones más bajas que EE.UU.'],
    cons: ['Riesgo político y regulatorio (caso Alibaba 2020)', 'Transparencia contable cuestionable', 'Tensiones geopolíticas con EE.UU.'],
  },
  {
    slug: 'india',
    name: 'India',
    tagline: 'El mercado emergente con mayor crecimiento futuro esperado',
    description: 'India pesa ~2% del MSCI ACWI globalmente y ~15-20% dentro de los emergentes. Con la mayor población del mundo y crecimiento económico del 6-7% anual, India es considerado por muchos el mercado emergente con mayor potencial estructural para las próximas décadas. Pero con valoraciones ya altas y mercado relativamente joven.',
    worldWeight: '~2%',
    relatedEtfs: [],
    marketType: 'emergente',
    taxTreaty: 'Convenio España-India (retención 15% dividendos)',
    pros: ['Mayor crecimiento económico esperado de los grandes mercados', 'Demografía favorable', 'Mercado interno enorme'],
    cons: ['Valoraciones elevadas (PE más alto que China o Brasil)', 'Burocracia y corrupción', 'Riesgo divisa INR'],
  },
  {
    slug: 'reino-unido',
    name: 'Reino Unido',
    tagline: 'Mercado desarrollado con sesgo energético y financiero',
    description: 'Reino Unido pesa ~3,5% del MSCI World. FTSE 100 está dominado por empresas energéticas (Shell, BP), financieras (HSBC, Lloyds) y farmacéuticas (AstraZeneca, GSK). Históricamente con dividend yield alto. Post-Brexit ha tenido descuento de valoración frente a otros desarrollados.',
    worldWeight: '~3,5%',
    relatedEtfs: [
      { ticker: 'VUKE', name: 'Vanguard FTSE 100 UCITS ETF' },
    ],
    marketType: 'desarrollado',
    taxTreaty: 'Convenio España-Reino Unido (retención 10-15% dividendos)',
    pros: ['Dividend yield muy alto (5-6% medio)', 'Valoraciones bajas tras Brexit', 'Empresas globales (Shell, AstraZeneca, Unilever)'],
    cons: ['Concentración en sectores tradicionales (energía, financiero)', 'Riesgo divisa GBP', 'Crecimiento económico bajo'],
  },
  {
    slug: 'emergentes-globales',
    name: 'Mercados Emergentes (global)',
    tagline: 'Diversificación a economías en desarrollo',
    description: 'Los mercados emergentes (China, India, Taiwán, Corea del Sur, Brasil, México, Sudáfrica y otros) pesan en conjunto ~10-12% del MSCI ACWI. Mayor crecimiento esperado a costa de mayor volatilidad y riesgo político. Para inversores indexados, una exposición del 10-20% del componente renta variable es habitual.',
    worldWeight: '~10-12%',
    relatedEtfs: [
      { ticker: 'EIMI', name: 'iShares Core MSCI EM IMI UCITS ETF' },
      { ticker: 'VFEM', name: 'Vanguard FTSE Emerging Markets UCITS ETF' },
      { ticker: 'EMIM', name: 'iShares Core MSCI EM IMI (Dist)' },
    ],
    marketType: 'emergente',
    taxTreaty: 'Varía por país; los ETFs UCITS aplican retenciones según convenios',
    pros: ['Mayor crecimiento económico esperado', 'Diversificación frente a desarrollados', 'Valoraciones más bajas que EE.UU.'],
    cons: ['Volatilidad alta', 'Riesgo divisa y geopolítico', 'Liquidez menor que mercados desarrollados'],
  },
  {
    slug: 'corea-del-sur',
    name: 'Corea del Sur',
    tagline: 'Tecnología, automoción y K-economy',
    description: 'Corea del Sur pesa ~1,5% del MSCI ACWI y ~13% dentro de emergentes (clasificación MSCI; FTSE la clasifica como desarrollada). Mercado con empresas tecnológicas líderes globales (Samsung, SK Hynix, LG) y exposición fuerte a semiconductores.',
    worldWeight: '~1,5%',
    relatedEtfs: [],
    marketType: 'emergente',
    taxTreaty: 'Convenio España-Corea (retención 10% dividendos)',
    pros: ['Líderes globales en semiconductores y memoria', 'Valoraciones razonables', 'Mercado relativamente desarrollado'],
    cons: ['Concentración en pocas empresas (Samsung pesa mucho)', 'Riesgo geopolítico Corea del Norte', 'Demografía negativa'],
  },
  {
    slug: 'pacifico-ex-japon',
    name: 'Pacífico (ex-Japón)',
    tagline: 'Australia, Hong Kong, Singapur, Nueva Zelanda',
    description: 'El índice "Pacífico ex-Japón" agrupa Australia (mayoritariamente, con sector minero y financiero importante), Hong Kong, Singapur y Nueva Zelanda. Pesa ~3% del MSCI World. Dividend yield generalmente alto.',
    worldWeight: '~3%',
    relatedEtfs: [
      { ticker: 'CPXJ', name: 'iShares Core MSCI Pacific ex-Japan UCITS ETF' },
    ],
    marketType: 'desarrollado',
    taxTreaty: 'Varía por país',
    pros: ['Dividend yield alto (Australia muy generosa)', 'Diversificación geográfica fuera de EE.UU./Europa', 'Exposición a Asia-Pacífico desarrollada'],
    cons: ['Concentración en sectores materias primas y financiero', 'Volumen de mercado limitado', 'Riesgo divisa AUD/HKD/SGD'],
  },
]

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug)
}
