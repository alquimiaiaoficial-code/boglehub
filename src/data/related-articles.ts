/**
 * Mapa de artículos relacionados para internal linking.
 * Clave: slug del artículo. Valor: slugs relacionados (máx. 4).
 *
 * Criterios de selección: mismo cluster temático + intención complementaria.
 * El orden importa: el primero es el más relevante.
 *
 * Mantenimiento: cuando se añada un nuevo artículo, añadir su mapping aquí
 * y considerar si conviene actualizar mappings existentes para apuntar al nuevo.
 */
export const RELATED_ARTICLES: Record<string, string[]> = {
  // ---------------------------------------------------------------------------
  // Bloque original (revisado para incluir referencias a artículos nuevos)
  // ---------------------------------------------------------------------------
  'como-elegir-tu-primer-etf-espana-2026': [
    'vwce-vs-cspx-vs-iwda',
    'vwce-analisis-completo',
    'fiscalidad-etfs-espana-guia-completa',
    'mejores-etfs-espana-2026',
  ],
  'vwce-vs-cspx-vs-iwda': [
    'vwce-analisis-completo',
    'swrd-vs-iwda',
    'solapamiento-etfs-error-silencioso',
    'que-es-el-msci-world',
  ],
  'fiscalidad-etfs-espana-guia-completa': [
    'como-declarar-etfs-hacienda',
    'plan-pensiones-indexado-espana-2026',
    'fondos-indexados-vs-etfs-espana',
    'plan-de-pensiones-vs-fondo-indexado',
  ],
  'fire-espana-cuanto-necesitas': [
    'cuanto-invertir-al-mes-jubilarse-millonario',
    'interes-compuesto-inversion',
    'etfs-dividendos-vivir-rentas-espana',
    'que-hacer-cuando-el-mercado-cae',
  ],
  'bogleheads-espana-guia-completa': [
    'cartera-boglehead-3-fondos-espana',
    'como-elegir-tu-primer-etf-espana-2026',
    'cartera-permanente-harry-browne-espana',
    'fire-espana-cuanto-necesitas',
  ],
  'solapamiento-etfs-error-silencioso': [
    'vwce-analisis-completo',
    'vwce-vs-cspx-vs-iwda',
    'como-rebalancear-cartera-indexada',
    'mejores-etfs-espana-2026',
  ],
  'fondos-indexados-vs-etfs-espana': [
    'amundi-prime-global-analisis',
    'myinvestor-opinion-2026',
    'fiscalidad-etfs-espana-guia-completa',
    'como-elegir-tu-primer-etf-espana-2026',
  ],
  'interes-compuesto-inversion': [
    'cuanto-invertir-al-mes-jubilarse-millonario',
    'fire-espana-cuanto-necesitas',
    'dca-vs-lump-sum-aportar-mensual',
    'como-empezar-a-invertir-poco-dinero',
  ],
  'dca-vs-lump-sum-aportar-mensual': [
    'interes-compuesto-inversion',
    'trade-republic-opinion-2026',
    'como-empezar-a-invertir-poco-dinero',
    'que-hacer-cuando-el-mercado-cae',
  ],
  'roboadvisors-espana-merecen-comision': [
    'indexa-capital-opinion-2026',
    'finizens-vs-indexa-capital-2026',
    'fondos-indexados-vs-etfs-espana',
    'plan-pensiones-indexado-espana-2026',
  ],
  'que-hacer-cuando-el-mercado-cae': [
    'dca-vs-lump-sum-aportar-mensual',
    'como-rebalancear-cartera-indexada',
    'cartera-permanente-harry-browne-espana',
    'bogleheads-espana-guia-completa',
  ],
  'como-rebalancear-cartera-indexada': [
    'cartera-boglehead-3-fondos-espana',
    'solapamiento-etfs-error-silencioso',
    'cartera-permanente-harry-browne-espana',
    'que-hacer-cuando-el-mercado-cae',
  ],
  'plan-de-pensiones-vs-fondo-indexado': [
    'plan-pensiones-indexado-espana-2026',
    'fiscalidad-etfs-espana-guia-completa',
    'fondos-indexados-vs-etfs-espana',
    'fire-espana-cuanto-necesitas',
  ],
  'que-es-el-msci-world': [
    'vwce-analisis-completo',
    'swrd-vs-iwda',
    'vwce-vs-cspx-vs-iwda',
    'como-elegir-tu-primer-etf-espana-2026',
  ],
  'como-empezar-a-invertir-poco-dinero': [
    'trade-republic-opinion-2026',
    'como-elegir-tu-primer-etf-espana-2026',
    'dca-vs-lump-sum-aportar-mensual',
    'interes-compuesto-inversion',
  ],
  'mejores-etfs-espana-2026': [
    'vwce-analisis-completo',
    'swrd-vs-iwda',
    'como-elegir-tu-primer-etf-espana-2026',
    'mejores-etfs-renta-fija-2026',
  ],
  'cartera-boglehead-3-fondos-espana': [
    'bogleheads-espana-guia-completa',
    'mejores-etfs-renta-fija-2026',
    'como-rebalancear-cartera-indexada',
    'cartera-permanente-harry-browne-espana',
  ],
  'degiro-vs-trade-republic-vs-myinvestor-2026': [
    'trade-republic-opinion-2026',
    'myinvestor-opinion-2026',
    'como-elegir-tu-primer-etf-espana-2026',
    'dca-vs-lump-sum-aportar-mensual',
  ],

  // ---------------------------------------------------------------------------
  // Nuevos artículos (sesión 2026-05-24): mappings completos
  // ---------------------------------------------------------------------------
  'indexa-capital-opinion-2026': [
    'finizens-vs-indexa-capital-2026',
    'roboadvisors-espana-merecen-comision',
    'plan-pensiones-indexado-espana-2026',
    'fondos-indexados-vs-etfs-espana',
  ],
  'vwce-analisis-completo': [
    'vwce-vs-cspx-vs-iwda',
    'swrd-vs-iwda',
    'como-elegir-tu-primer-etf-espana-2026',
    'que-es-el-msci-world',
  ],
  'amundi-prime-global-analisis': [
    'myinvestor-opinion-2026',
    'fondos-indexados-vs-etfs-espana',
    'vwce-analisis-completo',
    'mejores-etfs-espana-2026',
  ],
  'finizens-vs-indexa-capital-2026': [
    'indexa-capital-opinion-2026',
    'roboadvisors-espana-merecen-comision',
    'plan-pensiones-indexado-espana-2026',
    'fondos-indexados-vs-etfs-espana',
  ],
  'como-declarar-etfs-hacienda': [
    'fiscalidad-etfs-espana-guia-completa',
    'plan-pensiones-indexado-espana-2026',
    'como-elegir-tu-primer-etf-espana-2026',
    'fondos-indexados-vs-etfs-espana',
  ],
  'riesgo-divisa-etf-hedged-espana': [
    'mejores-etfs-renta-fija-2026',
    'cartera-boglehead-3-fondos-espana',
    'vwce-analisis-completo',
    'fondos-indexados-vs-etfs-espana',
  ],
  'plan-pensiones-indexado-espana-2026': [
    'plan-de-pensiones-vs-fondo-indexado',
    'indexa-capital-opinion-2026',
    'fiscalidad-etfs-espana-guia-completa',
    'fire-espana-cuanto-necesitas',
  ],
  'mejores-etfs-renta-fija-2026': [
    'riesgo-divisa-etf-hedged-espana',
    'cartera-boglehead-3-fondos-espana',
    'cartera-permanente-harry-browne-espana',
    'mejores-etfs-espana-2026',
  ],
  'myinvestor-opinion-2026': [
    'amundi-prime-global-analisis',
    'degiro-vs-trade-republic-vs-myinvestor-2026',
    'fondos-indexados-vs-etfs-espana',
    'renta-4-opinion-2026',
  ],
  'trade-republic-opinion-2026': [
    'degiro-vs-trade-republic-vs-myinvestor-2026',
    'myinvestor-opinion-2026',
    'dca-vs-lump-sum-aportar-mensual',
    'como-elegir-tu-primer-etf-espana-2026',
  ],
  'etfs-dividendos-vivir-rentas-espana': [
    'fire-espana-cuanto-necesitas',
    'cuanto-invertir-al-mes-jubilarse-millonario',
    'fiscalidad-etfs-espana-guia-completa',
    'vwce-analisis-completo',
  ],
  'swrd-vs-iwda': [
    'vwce-analisis-completo',
    'vwce-vs-cspx-vs-iwda',
    'que-es-el-msci-world',
    'mejores-etfs-espana-2026',
  ],
  'cartera-permanente-harry-browne-espana': [
    'cartera-boglehead-3-fondos-espana',
    'bogleheads-espana-guia-completa',
    'mejores-etfs-renta-fija-2026',
    'riesgo-divisa-etf-hedged-espana',
  ],
  'cuanto-invertir-al-mes-jubilarse-millonario': [
    'interes-compuesto-inversion',
    'fire-espana-cuanto-necesitas',
    'dca-vs-lump-sum-aportar-mensual',
    'como-empezar-a-invertir-poco-dinero',
  ],

  // Batch 3 (sesión 2026-05-24)
  'mejores-etfs-nasdaq-100-espana': [
    'mejores-etfs-espana-2026',
    'vwce-vs-cspx-vs-iwda',
    'que-es-el-msci-world',
    'msci-world-vs-msci-acwi-diferencias',
  ],
  'oro-etf-fisico-vs-mineria-espana': [
    'cartera-permanente-harry-browne-espana',
    'mejores-etfs-renta-fija-2026',
    'mejores-etfs-espana-2026',
    'cartera-boglehead-3-fondos-espana',
  ],
  'msci-world-vs-msci-acwi-diferencias': [
    'vwce-analisis-completo',
    'swrd-vs-iwda',
    'vwce-vs-cspx-vs-iwda',
    'que-es-el-msci-world',
  ],
  'como-hacer-traspaso-fondos-espana': [
    'fondos-indexados-vs-etfs-espana',
    'fiscalidad-etfs-espana-guia-completa',
    'como-declarar-etfs-hacienda',
    'plan-de-pensiones-vs-fondo-indexado',
  ],
  'degiro-opinion-2026': [
    'degiro-vs-trade-republic-vs-myinvestor-2026',
    'trade-republic-opinion-2026',
    'interactive-brokers-opinion-2026',
    'como-elegir-tu-primer-etf-espana-2026',
  ],
  'xtb-opinion-2026': [
    'degiro-vs-trade-republic-vs-myinvestor-2026',
    'trade-republic-opinion-2026',
    'degiro-opinion-2026',
    'como-elegir-tu-primer-etf-espana-2026',
  ],
  'scalable-capital-opinion-2026': [
    'degiro-vs-trade-republic-vs-myinvestor-2026',
    'trade-republic-opinion-2026',
    'degiro-opinion-2026',
    'xtb-opinion-2026',
  ],
  'mejor-broker-etfs-espana-2026': [
    'degiro-vs-trade-republic-vs-myinvestor-2026',
    'trade-republic-opinion-2026',
    'myinvestor-opinion-2026',
    'interactive-brokers-opinion-2026',
  ],
  'modelo-d6-etf-espana': [
    'como-declarar-etfs-hacienda',
    'fiscalidad-etfs-espana-guia-completa',
    'como-hacer-traspaso-fondos-espana',
    'fondos-indexados-vs-etfs-espana',
  ],
  'mejores-fondos-indexados-espana-2026': [
    'fondos-indexados-vs-etfs-espana',
    'amundi-prime-global-analisis',
    'como-hacer-traspaso-fondos-espana',
    'cartera-boglehead-3-fondos-espana',
  ],
  'como-invertir-sp500-espana': [
    'vwce-vs-cspx-vs-iwda',
    'mejores-etfs-espana-2026',
    'como-elegir-tu-primer-etf-espana-2026',
    'mejores-fondos-indexados-espana-2026',
  ],
  'como-invertir-msci-world-espana': [
    'que-es-el-msci-world',
    'msci-world-vs-msci-acwi-diferencias',
    'swrd-vs-iwda',
    'como-invertir-sp500-espana',
  ],
  'interactive-brokers-opinion-2026': [
    'mejor-broker-etfs-espana-2026',
    'degiro-opinion-2026',
    'degiro-vs-trade-republic-vs-myinvestor-2026',
    'como-elegir-tu-primer-etf-espana-2026',
  ],
  'ing-opinion-2026': [
    'mejor-broker-etfs-espana-2026',
    'openbank-opinion-2026',
    'trade-republic-opinion-2026',
    'myinvestor-opinion-2026',
  ],
  'renta-4-opinion-2026': [
    'myinvestor-opinion-2026',
    'mejor-broker-etfs-espana-2026',
    'mejores-fondos-indexados-espana-2026',
    'como-elegir-tu-primer-etf-espana-2026',
  ],
  'openbank-opinion-2026': [
    'ing-opinion-2026',
    'mejor-broker-etfs-espana-2026',
    'trade-republic-opinion-2026',
    'finizens-vs-indexa-capital-2026',
  ],
  'etoro-opinion-2026': [
    'trade-republic-opinion-2026',
    'mejor-broker-etfs-espana-2026',
    'como-elegir-tu-primer-etf-espana-2026',
    'fondos-indexados-vs-etfs-espana',
  ],
}
