/**
 * Títulos SEO (<title>) para artículos cuyo título editorial (H1) es demasiado
 * largo y se trunca en los resultados de Google (>~60 caracteres con la marca).
 *
 * El H1/título editorial del artículo se mantiene tal cual en blog-articles.ts;
 * aquí solo se define un <title> más corto y orientado a CTR. El template de
 * layout añade " | BogleHub", así que estos NO deben incluir la marca.
 *
 * Clave: slug del artículo. Si un artículo no aparece aquí, se usa su title.
 * Mantener cada valor en ~49 caracteres o menos (49 + " | BogleHub" = 60).
 */
export const BLOG_META_TITLES: Record<string, string> = {
  'degiro-vs-trade-republic-vs-myinvestor-2026': 'DEGIRO vs Trade Republic vs MyInvestor (2026)',
  'vwce-analisis-completo': 'VWCE: análisis del ETF All-World Vanguard (2026)',
  'amundi-prime-global-analisis': 'Amundi Prime Global: el fondo más barato (2026)',
  'finizens-vs-indexa-capital-2026': 'Finizens vs Indexa Capital: cuál elegir (2026)',
  'riesgo-divisa-etf-hedged-espana': 'Riesgo divisa en ETFs: ¿cubrir o no? (2026)',
  'swrd-vs-iwda': 'SWRD vs IWDA: qué ETF MSCI World elegir (2026)',
  'cartera-permanente-harry-browne-espana': 'Cartera permanente de Harry Browne (2026)',
  'cuanto-invertir-al-mes-jubilarse-millonario': '¿Cuánto invertir al mes para el millón? (2026)',
  'oro-etf-fisico-vs-mineria-espana': 'Oro físico vs ETC vs ETF de mineras (2026)',
  'msci-world-vs-msci-acwi-diferencias': 'MSCI World vs MSCI ACWI: diferencias (2026)',
  'como-declarar-etfs-hacienda': 'Cómo declarar ETFs en la renta en España (2026)',
  'cartera-boglehead-3-fondos-espana': 'Cartera Boglehead de 3 fondos para España (2026)',
  'mejores-etfs-espana-2026': 'Mejores ETFs para invertir en España (2026)',
  'mejores-etfs-nasdaq-100-espana': 'Mejores ETFs Nasdaq 100 para España (2026)',
  // Segunda tanda — artículos sin metaTitle hasta ahora
  'fiscalidad-etfs-espana-guia-completa': 'Fiscalidad de ETFs en España: guía completa',
  'fire-espana-cuanto-necesitas': 'FIRE en España: cuánto necesitas de verdad',
  'solapamiento-etfs-error-silencioso': 'Solapamiento de ETFs: el error silencioso',
  'fondos-indexados-vs-etfs-espana': 'Fondos indexados vs ETFs en España (2026)',
  'interes-compuesto-inversion': 'Interés compuesto: la única fuerza que importa',
  'dca-vs-lump-sum-aportar-mensual': 'DCA vs lump sum: qué dice la evidencia (2026)',
  'plan-de-pensiones-vs-fondo-indexado': 'Plan de pensiones vs fondo indexado (2026)',
  'que-es-el-msci-world': 'Qué es el MSCI World y por qué invertir en él',
  'como-empezar-a-invertir-poco-dinero': 'Cómo empezar a invertir con poco dinero',
  'plan-pensiones-indexado-espana-2026': 'Plan de pensiones indexado en España (2026)',
  'mejores-etfs-renta-fija-2026': 'Mejores ETFs de renta fija para España (2026)',
  'etfs-dividendos-vivir-rentas-espana': 'ETFs de dividendos: vivir de rentas (2026)',
  'como-hacer-traspaso-fondos-espana': 'Cómo hacer un traspaso de fondos (guía 2026)',
  'degiro-opinion-2026': 'DEGIRO: opinión y análisis completo (2026)',
  'xtb-opinion-2026': 'XTB: opinión y análisis para inversores (2026)',
  'scalable-capital-opinion-2026': 'Scalable Capital: opinión completa (2026)',
  'mejor-broker-etfs-espana-2026': 'Mejor broker para ETFs en España (2026)',
  'interactive-brokers-opinion-2026': 'Interactive Brokers (IBKR): opinión (2026)',
  'ing-opinion-2026': 'ING (Naranja Broker): opinión 2026',
  'renta-4-opinion-2026': 'Renta 4 Banco: opinión y análisis (2026)',
  'modelo-d6-etf-espana': 'Modelo D6 y ETFs: ¿hay que presentarlo? (2026)',
  'mejores-fondos-indexados-espana-2026': 'Mejores fondos indexados en España (2026)',
  'como-invertir-sp500-espana': 'Cómo invertir en el S&P 500 desde España',
  'como-invertir-msci-world-espana': 'Cómo invertir en el MSCI World desde España',
}
