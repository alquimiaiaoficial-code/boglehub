/**
 * Aspectos analizables por ETF para páginas /analiza/[ticker]/[aspecto].
 * Combinados con POPULAR_ETF_TICKERS (20) generan 80 páginas long-tail.
 */

export interface EtfAspect {
  slug: string
  label: string
  /** Pregunta H1 dinámica */
  questionTemplate: (ticker: string) => string
  /** Meta description template */
  descriptionTemplate: (ticker: string, name?: string) => string
}

export const ETF_ASPECTS: EtfAspect[] = [
  {
    slug: 'fiscalidad',
    label: 'Fiscalidad',
    questionTemplate: (t) => `Fiscalidad de ${t} para residentes en España`,
    descriptionTemplate: (t) =>
      `Fiscalidad de ${t} para residentes en España: retención de dividendos, IRPF al vender, grado de eficiencia fiscal y comparativa con alternativas.`,
  },
  {
    slug: 'alternativas',
    label: 'Alternativas',
    questionTemplate: (t) => `Alternativas a ${t}: qué otros ETFs son comparables`,
    descriptionTemplate: (t) =>
      `ETFs alternativos a ${t} con exposición similar pero distinto coste, gestora o política de reparto. Comparativa para elegir el mejor.`,
  },
  {
    slug: 'para-fire',
    label: 'Para FIRE',
    questionTemplate: (t) => `${t} para FIRE: ¿es buena opción para tu cartera de independencia financiera?`,
    descriptionTemplate: (t) =>
      `Análisis de ${t} para una cartera FIRE: ventajas, riesgos y peso recomendado según la fase (acumulación o retirada). Para independencia financiera.`,
  },
  {
    slug: 'donde-comprar',
    label: 'Dónde comprar',
    questionTemplate: (t) => `Dónde comprar ${t} en España (mejor broker 2026)`,
    descriptionTemplate: (t) =>
      `Los mejores brokers para comprar ${t} desde España: comisiones, mercados disponibles y para qué perfil de inversor encaja cada uno.`,
  },
]

export function getAspectBySlug(slug: string): EtfAspect | undefined {
  return ETF_ASPECTS.find((a) => a.slug === slug)
}
