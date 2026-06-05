/**
 * Categorización editorial de los artículos del blog.
 *
 * Cada artículo está asignado a una sola categoría — la que mejor refleja
 * su tema principal. Las categorías sirven para:
 *  - Organizar /blog/page.tsx en secciones temáticas navegables
 *  - Mostrar al usuario un mapa claro del contenido disponible
 *  - Reforzar clusters semánticos para Google
 */

export type BlogCategory =
  | 'empezar'
  | 'etfs-especificos'
  | 'carteras'
  | 'fiscalidad'
  | 'roboadvisors-brokers'
  | 'estrategias'
  | 'psicologia-mercado'
  | 'planificacion-fire'

export interface BlogCategoryMeta {
  slug: BlogCategory
  label: string
  description: string
  /** Emoji decorativo opcional */
  icon?: string
}

export const BLOG_CATEGORIES: BlogCategoryMeta[] = [
  {
    slug: 'empezar',
    label: 'Empezar a invertir',
    description: 'Conceptos básicos, primer ETF y guías para principiantes',
  },
  {
    slug: 'etfs-especificos',
    label: 'Análisis de ETFs y fondos',
    description: 'Reviews detallados de los ETFs y fondos más usados en España',
  },
  {
    slug: 'carteras',
    label: 'Carteras y asignación de activos',
    description: 'Estrategias de cartera Boglehead, 3 fondos, cartera permanente',
  },
  {
    slug: 'fiscalidad',
    label: 'Fiscalidad y declaración',
    description: 'IRPF, ETFs, traspaso de fondos, plan de pensiones y declaración',
  },
  {
    slug: 'roboadvisors-brokers',
    label: 'Roboadvisors y brokers',
    description: 'Reviews y comparativas de Indexa, Finizens, MyInvestor, Trade Republic, DEGIRO',
  },
  {
    slug: 'estrategias',
    label: 'Estrategias de inversión',
    description: 'DCA, rebalanceo, interés compuesto, dividendos',
  },
  {
    slug: 'psicologia-mercado',
    label: 'Psicología y crisis',
    description: 'Qué hacer en caídas, errores comunes, mantener la disciplina',
  },
  {
    slug: 'planificacion-fire',
    label: 'Planificación y FIRE',
    description: 'Jubilación anticipada, cuánto necesitas, planificación a largo plazo',
  },
]

/**
 * Asignación de artículo → categoría.
 * Cada artículo debe estar exactamente en una categoría.
 */
export const ARTICLE_CATEGORY: Record<string, BlogCategory> = {
  // Empezar a invertir
  'como-elegir-tu-primer-etf-espana-2026': 'empezar',
  'como-empezar-a-invertir-poco-dinero': 'empezar',
  'bogleheads-espana-guia-completa': 'empezar',
  'que-es-el-msci-world': 'empezar',
  'fondo-de-emergencia-cuanto-necesitas': 'empezar',

  // Análisis de ETFs y fondos
  'vwce-vs-cspx-vs-iwda': 'etfs-especificos',
  'vwce-analisis-completo': 'etfs-especificos',
  'swrd-vs-iwda': 'etfs-especificos',
  'amundi-prime-global-analisis': 'etfs-especificos',
  'mejores-etfs-espana-2026': 'etfs-especificos',
  'mejores-etfs-renta-fija-2026': 'etfs-especificos',
  'etfs-dividendos-vivir-rentas-espana': 'etfs-especificos',
  'fondos-indexados-vs-etfs-espana': 'etfs-especificos',
  'riesgo-divisa-etf-hedged-espana': 'etfs-especificos',
  'solapamiento-etfs-error-silencioso': 'etfs-especificos',

  // Carteras y asignación
  'mejores-fondos-indexados-espana-2026': 'etfs-especificos',
  'como-invertir-sp500-espana': 'etfs-especificos',
  'como-invertir-msci-world-espana': 'etfs-especificos',
  'cartera-boglehead-3-fondos-espana': 'carteras',
  'cartera-permanente-harry-browne-espana': 'carteras',
  'como-rebalancear-cartera-indexada': 'carteras',
  'renta-variable-vs-renta-fija-cartera': 'carteras',

  // Fiscalidad
  'fiscalidad-etfs-espana-guia-completa': 'fiscalidad',
  'como-declarar-etfs-hacienda': 'fiscalidad',
  'plan-pensiones-indexado-espana-2026': 'fiscalidad',
  'plan-de-pensiones-vs-fondo-indexado': 'fiscalidad',
  'como-hacer-traspaso-fondos-espana': 'fiscalidad',
  'modelo-d6-etf-espana': 'fiscalidad',

  // Roboadvisors y brokers
  'indexa-capital-opinion-2026': 'roboadvisors-brokers',
  'finizens-vs-indexa-capital-2026': 'roboadvisors-brokers',
  'roboadvisors-espana-merecen-comision': 'roboadvisors-brokers',
  'myinvestor-opinion-2026': 'roboadvisors-brokers',
  'trade-republic-opinion-2026': 'roboadvisors-brokers',
  'degiro-vs-trade-republic-vs-myinvestor-2026': 'roboadvisors-brokers',
  'degiro-opinion-2026': 'roboadvisors-brokers',
  'xtb-opinion-2026': 'roboadvisors-brokers',
  'scalable-capital-opinion-2026': 'roboadvisors-brokers',
  'mejor-broker-etfs-espana-2026': 'roboadvisors-brokers',

  // Estrategias
  'interes-compuesto-inversion': 'estrategias',
  'dca-vs-lump-sum-aportar-mensual': 'estrategias',
  'pisos-vs-fondos-indexados-espana': 'estrategias',
  'fondos-indexados-vs-gestion-activa': 'estrategias',
  'proteger-ahorros-inflacion': 'estrategias',

  // Psicología y crisis
  'que-hacer-cuando-el-mercado-cae': 'psicologia-mercado',
  'es-buen-momento-para-invertir': 'psicologia-mercado',
  'errores-comunes-al-invertir': 'psicologia-mercado',

  // Planificación y FIRE
  'fire-espana-cuanto-necesitas': 'planificacion-fire',
  'cuanto-invertir-al-mes-jubilarse-millonario': 'planificacion-fire',
  'invertir-para-hijos-espana': 'planificacion-fire',
  'regla-del-4-por-ciento': 'planificacion-fire',

  // Nuevos (sesión 2026-05-24, batch 3)
  'mejores-etfs-nasdaq-100-espana': 'etfs-especificos',
  'oro-etf-fisico-vs-mineria-espana': 'etfs-especificos',
  'msci-world-vs-msci-acwi-diferencias': 'etfs-especificos',

  // Reviews de bróker + pilar de seguridad (sesión 2026-06-04)
  'interactive-brokers-opinion-2026': 'roboadvisors-brokers',
  'ing-opinion-2026': 'roboadvisors-brokers',
  'renta-4-opinion-2026': 'roboadvisors-brokers',
  'openbank-opinion-2026': 'roboadvisors-brokers',
  'etoro-opinion-2026': 'roboadvisors-brokers',
  'que-pasa-si-quiebra-tu-broker': 'roboadvisors-brokers',
  'mejor-roboadvisor-espana-2026': 'roboadvisors-brokers',
  'inbestme-opinion-2026': 'roboadvisors-brokers',
}

/**
 * Devuelve la categoría asignada a un artículo, o un fallback si no existe.
 * El fallback permite que el sistema funcione si se añade un nuevo artículo
 * antes de mapearlo aquí explícitamente.
 */
export function getArticleCategory(slug: string): BlogCategory {
  return ARTICLE_CATEGORY[slug] ?? 'empezar'
}
