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
}
