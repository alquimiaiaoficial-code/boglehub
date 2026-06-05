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
    'acumulacion-vs-distribucion-etf',
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
    'regla-del-4-por-ciento',
    'invertir-para-hijos-espana',
  ],
  'bogleheads-espana-guia-completa': [
    'cartera-boglehead-3-fondos-espana',
    'fondos-indexados-vs-gestion-activa',
    'pisos-vs-fondos-indexados-espana',
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
    'fondos-indexados-vs-gestion-activa',
    'fiscalidad-etfs-espana-guia-completa',
    'como-elegir-tu-primer-etf-espana-2026',
  ],
  'interes-compuesto-inversion': [
    'cuanto-invertir-al-mes-jubilarse-millonario',
    'fire-espana-cuanto-necesitas',
    'invertir-para-hijos-espana',
    'como-empezar-a-invertir-poco-dinero',
  ],
  'dca-vs-lump-sum-aportar-mensual': [
    'interes-compuesto-inversion',
    'es-buen-momento-para-invertir',
    'como-empezar-a-invertir-poco-dinero',
    'que-hacer-cuando-el-mercado-cae',
  ],
  'roboadvisors-espana-merecen-comision': [
    'indexa-capital-opinion-2026',
    'finizens-vs-indexa-capital-2026',
    'mejor-roboadvisor-espana-2026',
    'plan-pensiones-indexado-espana-2026',
  ],
  'que-hacer-cuando-el-mercado-cae': [
    'dca-vs-lump-sum-aportar-mensual',
    'es-buen-momento-para-invertir',
    'fondo-de-emergencia-cuanto-necesitas',
    'errores-comunes-al-invertir',
  ],
  'como-rebalancear-cartera-indexada': [
    'cartera-boglehead-3-fondos-espana',
    'renta-variable-vs-renta-fija-cartera',
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
    'fondo-de-emergencia-cuanto-necesitas',
    'como-elegir-tu-primer-etf-espana-2026',
    'dca-vs-lump-sum-aportar-mensual',
    'interes-compuesto-inversion',
  ],
  'fondo-de-emergencia-cuanto-necesitas': [
    'como-empezar-a-invertir-poco-dinero',
    'donde-aparcar-dinero-corto-plazo',
    'proteger-ahorros-inflacion',
    'dca-vs-lump-sum-aportar-mensual',
  ],
  'invertir-para-hijos-espana': [
    'interes-compuesto-inversion',
    'mejores-fondos-indexados-espana-2026',
    'como-hacer-traspaso-fondos-espana',
    'cartera-boglehead-3-fondos-espana',
  ],
  'pisos-vs-fondos-indexados-espana': [
    'cartera-boglehead-3-fondos-espana',
    'mejores-fondos-indexados-espana-2026',
    'que-es-el-msci-world',
    'proteger-ahorros-inflacion',
  ],
  'es-buen-momento-para-invertir': [
    'dca-vs-lump-sum-aportar-mensual',
    'interes-compuesto-inversion',
    'que-hacer-cuando-el-mercado-cae',
    'errores-comunes-al-invertir',
  ],
  'fondos-indexados-vs-gestion-activa': [
    'bogleheads-espana-guia-completa',
    'cartera-boglehead-3-fondos-espana',
    'mejores-fondos-indexados-espana-2026',
    'que-es-el-msci-world',
  ],
  'proteger-ahorros-inflacion': [
    'que-es-el-msci-world',
    'fondo-de-emergencia-cuanto-necesitas',
    'pisos-vs-fondos-indexados-espana',
    'donde-aparcar-dinero-corto-plazo',
  ],
  'renta-variable-vs-renta-fija-cartera': [
    'cartera-boglehead-3-fondos-espana',
    'como-rebalancear-cartera-indexada',
    'mejores-etfs-renta-fija-2026',
    'que-hacer-cuando-el-mercado-cae',
  ],
  'errores-comunes-al-invertir': [
    'es-buen-momento-para-invertir',
    'que-hacer-cuando-el-mercado-cae',
    'fondos-indexados-vs-gestion-activa',
    'bogleheads-espana-guia-completa',
  ],
  'regla-del-4-por-ciento': [
    'fire-espana-cuanto-necesitas',
    'cuanto-invertir-al-mes-jubilarse-millonario',
    'interes-compuesto-inversion',
    'renta-variable-vs-renta-fija-cartera',
  ],
  'donde-aparcar-dinero-corto-plazo': [
    'fondo-de-emergencia-cuanto-necesitas',
    'proteger-ahorros-inflacion',
    'que-pasa-si-quiebra-tu-broker',
    'como-empezar-a-invertir-poco-dinero',
  ],
  'acumulacion-vs-distribucion-etf': [
    'como-elegir-tu-primer-etf-espana-2026',
    'fiscalidad-etfs-espana-guia-completa',
    'etfs-dividendos-vivir-rentas-espana',
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
    'renta-variable-vs-renta-fija-cartera',
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
    'mejor-roboadvisor-espana-2026',
    'plan-pensiones-indexado-espana-2026',
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
    'mejor-roboadvisor-espana-2026',
    'plan-pensiones-indexado-espana-2026',
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
    'acumulacion-vs-distribucion-etf',
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
    'regla-del-4-por-ciento',
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
    'que-pasa-si-quiebra-tu-broker',
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
    'pisos-vs-fondos-indexados-espana',
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
    'que-pasa-si-quiebra-tu-broker',
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
    'que-pasa-si-quiebra-tu-broker',
    'fondos-indexados-vs-etfs-espana',
  ],
  'que-pasa-si-quiebra-tu-broker': [
    'mejor-broker-etfs-espana-2026',
    'trade-republic-opinion-2026',
    'interactive-brokers-opinion-2026',
    'como-elegir-tu-primer-etf-espana-2026',
  ],
  'mejor-roboadvisor-espana-2026': [
    'indexa-capital-opinion-2026',
    'finizens-vs-indexa-capital-2026',
    'roboadvisors-espana-merecen-comision',
    'inbestme-opinion-2026',
  ],
  'inbestme-opinion-2026': [
    'mejor-roboadvisor-espana-2026',
    'indexa-capital-opinion-2026',
    'finizens-vs-indexa-capital-2026',
    'roboadvisors-espana-merecen-comision',
  ],
}
