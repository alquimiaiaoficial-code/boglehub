/**
 * Mapa de artículos relacionados para internal linking.
 * Clave: slug del artículo. Valor: slugs relacionados (máx. 4).
 *
 * Criterios de selección: mismo cluster temático + intención complementaria.
 * El orden importa: el primero es el más relevante.
 */
export const RELATED_ARTICLES: Record<string, string[]> = {
  'como-elegir-tu-primer-etf-espana-2026': [
    'vwce-vs-cspx-vs-iwda',
    'fiscalidad-etfs-espana-guia-completa',
    'fondos-indexados-vs-etfs-espana',
    'bogleheads-espana-guia-completa',
  ],
  'vwce-vs-cspx-vs-iwda': [
    'solapamiento-etfs-error-silencioso',
    'que-es-el-msci-world',
    'como-elegir-tu-primer-etf-espana-2026',
    'fiscalidad-etfs-espana-guia-completa',
  ],
  'fiscalidad-etfs-espana-guia-completa': [
    'plan-de-pensiones-vs-fondo-indexado',
    'fondos-indexados-vs-etfs-espana',
    'como-elegir-tu-primer-etf-espana-2026',
    'vwce-vs-cspx-vs-iwda',
  ],
  'fire-espana-cuanto-necesitas': [
    'interes-compuesto-inversion',
    'como-rebalancear-cartera-indexada',
    'dca-vs-lump-sum-aportar-mensual',
    'que-hacer-cuando-el-mercado-cae',
  ],
  'bogleheads-espana-guia-completa': [
    'como-elegir-tu-primer-etf-espana-2026',
    'fire-espana-cuanto-necesitas',
    'fondos-indexados-vs-etfs-espana',
    'vwce-vs-cspx-vs-iwda',
  ],
  'solapamiento-etfs-error-silencioso': [
    'vwce-vs-cspx-vs-iwda',
    'como-elegir-tu-primer-etf-espana-2026',
    'como-rebalancear-cartera-indexada',
    'fondos-indexados-vs-etfs-espana',
  ],
  'fondos-indexados-vs-etfs-espana': [
    'fiscalidad-etfs-espana-guia-completa',
    'plan-de-pensiones-vs-fondo-indexado',
    'como-elegir-tu-primer-etf-espana-2026',
    'roboadvisors-espana-merecen-comision',
  ],
  'interes-compuesto-inversion': [
    'fire-espana-cuanto-necesitas',
    'dca-vs-lump-sum-aportar-mensual',
    'como-empezar-a-invertir-poco-dinero',
    'como-rebalancear-cartera-indexada',
  ],
  'dca-vs-lump-sum-aportar-mensual': [
    'interes-compuesto-inversion',
    'como-empezar-a-invertir-poco-dinero',
    'que-hacer-cuando-el-mercado-cae',
    'fire-espana-cuanto-necesitas',
  ],
  'roboadvisors-espana-merecen-comision': [
    'fondos-indexados-vs-etfs-espana',
    'bogleheads-espana-guia-completa',
    'fiscalidad-etfs-espana-guia-completa',
    'como-elegir-tu-primer-etf-espana-2026',
  ],
  'que-hacer-cuando-el-mercado-cae': [
    'dca-vs-lump-sum-aportar-mensual',
    'como-rebalancear-cartera-indexada',
    'bogleheads-espana-guia-completa',
    'interes-compuesto-inversion',
  ],
  'como-rebalancear-cartera-indexada': [
    'vwce-vs-cspx-vs-iwda',
    'solapamiento-etfs-error-silencioso',
    'fire-espana-cuanto-necesitas',
    'que-hacer-cuando-el-mercado-cae',
  ],
  'plan-de-pensiones-vs-fondo-indexado': [
    'fiscalidad-etfs-espana-guia-completa',
    'fondos-indexados-vs-etfs-espana',
    'fire-espana-cuanto-necesitas',
    'roboadvisors-espana-merecen-comision',
  ],
  'que-es-el-msci-world': [
    'vwce-vs-cspx-vs-iwda',
    'como-elegir-tu-primer-etf-espana-2026',
    'solapamiento-etfs-error-silencioso',
    'bogleheads-espana-guia-completa',
  ],
  'como-empezar-a-invertir-poco-dinero': [
    'como-elegir-tu-primer-etf-espana-2026',
    'dca-vs-lump-sum-aportar-mensual',
    'interes-compuesto-inversion',
    'bogleheads-espana-guia-completa',
  ],
}
