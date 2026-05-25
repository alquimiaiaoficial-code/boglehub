/**
 * Carteras modelo populares para /cartera/[slug].
 */

export interface PortfolioAllocation {
  asset: string
  percent: number
  suggestedTicker?: string
}

export interface ModelPortfolio {
  slug: string
  name: string
  tagline: string
  description: string
  /** Composición */
  allocation: PortfolioAllocation[]
  /** TER ponderado estimado */
  weightedTer: string
  /** Para qué perfil */
  idealFor: string[]
  /** Volatilidad esperada */
  expectedVolatility: string
  /** Rentabilidad esperada */
  expectedReturn: string
  /** Cuándo NO usar */
  avoidWhen: string[]
  /** Autor / origen */
  origin: string
  /** FAQ */
  faq: { q: string; a: string }[]
}

export const MODEL_PORTFOLIOS: ModelPortfolio[] = [
  {
    slug: 'boglehead-3-fondos',
    name: 'Boglehead 3 fondos',
    tagline: 'La cartera clásica de John Bogle, adaptada al inversor español',
    description: 'La cartera Boglehead clásica de 3 fondos divide entre renta variable nacional, renta variable internacional y renta fija. Adaptada al inversor español: usamos MSCI World (desarrollados) + Emerging Markets + bonos globales hedged EUR.',
    allocation: [
      { asset: 'Renta variable desarrollados (MSCI World)', percent: 60, suggestedTicker: 'IWDA' },
      { asset: 'Renta variable emergentes', percent: 20, suggestedTicker: 'EIMI' },
      { asset: 'Renta fija global hedged EUR', percent: 20, suggestedTicker: 'AGGH' },
    ],
    weightedTer: '0,17%',
    idealFor: ['Inversor 30-50 años', 'Quien valora diversificación global completa', 'Perfil moderado a moderado-agresivo'],
    avoidWhen: ['Cerca de jubilación (subir renta fija)', 'Aversión muy alta al riesgo'],
    expectedVolatility: '12-15% anual',
    expectedReturn: '6-8% anual nominal',
    origin: 'John Bogle / Bogleheads community',
    faq: [
      { q: '¿Por qué 3 fondos?', a: 'Simplicidad máxima sin perder diversificación esencial. Más fondos añaden complejidad sin mejorar significativamente la diversificación.' },
      { q: '¿Es mejor 60/20/20 o 70/15/15?', a: 'Depende de tu perfil. 60/20/20 es más conservador (más renta fija); 70/15/15 sobrepondera renta variable. Sin diferencias significativas a largo plazo.' },
    ],
  },
  {
    slug: 'cartera-permanente-harry-browne',
    name: 'Cartera Permanente (Harry Browne)',
    tagline: '25/25/25/25 diseñada para sobrevivir cualquier escenario económico',
    description: 'La cartera permanente de Harry Browne asigna exactamente el 25% a cada activo: renta variable, bonos largo plazo, oro y liquidez. Diseñada para amortiguar cualquier escenario macroeconómico (inflación, deflación, crecimiento, recesión).',
    allocation: [
      { asset: 'Renta variable global', percent: 25, suggestedTicker: 'VWCE' },
      { asset: 'Bonos eurozona largo plazo', percent: 25, suggestedTicker: 'IBGL' },
      { asset: 'Oro físico (ETC)', percent: 25, suggestedTicker: 'SGLN' },
      { asset: 'Liquidez / bonos corto plazo', percent: 25, suggestedTicker: 'IBGS' },
    ],
    weightedTer: '0,15%',
    idealFor: ['Inversor conservador', 'Quien busca robustez sobre rentabilidad máxima', 'Mercados muy inciertos'],
    avoidWhen: ['Horizonte muy largo y perfil agresivo (renta variable pura sería más rentable)'],
    expectedVolatility: '6-9% anual',
    expectedReturn: '4-6% anual real',
    origin: 'Harry Browne (1980s)',
    faq: [
      { q: '¿Por qué incluye oro?', a: 'El oro tiene baja correlación con acciones y bonos. En crisis inflacionistas (años 70) protege poder adquisitivo. En crisis de confianza (2008) sube cuando todo cae.' },
    ],
  },
  {
    slug: 'all-weather-ray-dalio',
    name: 'All-Weather (Ray Dalio)',
    tagline: 'Cartera diseñada por Bridgewater para cualquier régimen económico',
    description: 'La cartera All-Weather de Ray Dalio (Bridgewater Associates) pondera por riesgo (no por capital) para equilibrar exposición a los cuatro regímenes económicos: crecimiento, recesión, inflación, deflación.',
    allocation: [
      { asset: 'Renta variable global', percent: 30, suggestedTicker: 'VWCE' },
      { asset: 'Bonos largo plazo (>20 años)', percent: 40, suggestedTicker: 'IBGL' },
      { asset: 'Bonos medio plazo (7-10 años)', percent: 15, suggestedTicker: 'IBGM' },
      { asset: 'Materias primas', percent: 7.5, suggestedTicker: 'CMOD' },
      { asset: 'Oro', percent: 7.5, suggestedTicker: 'SGLN' },
    ],
    weightedTer: '0,20%',
    idealFor: ['Inversor conservador-moderado', 'Quien valora paridad de riesgo (risk parity)', 'Perfil que valora estabilidad'],
    avoidWhen: ['Horizonte muy largo (renta variable pura supera)'],
    expectedVolatility: '7-10% anual',
    expectedReturn: '5-7% anual nominal',
    origin: 'Ray Dalio / Bridgewater Associates',
    faq: [
      { q: '¿Es mejor que 60/40?', a: 'En periodos de inflación o estanflación, históricamente sí. En mercados alcistas largos de renta variable (2010s), 60/40 ha sido más rentable. La elección depende de qué tipo de mercado esperas.' },
    ],
  },
  {
    slug: '60-40-clasica',
    name: 'Cartera 60/40 clásica',
    tagline: 'El estándar de los planes de pensiones americanos',
    description: 'La cartera 60/40 (60% renta variable, 40% renta fija) ha sido el estándar institucional durante décadas. Equilibra crecimiento con estabilidad. Adaptada al inversor europeo: MSCI World + bonos globales hedged EUR.',
    allocation: [
      { asset: 'Renta variable global', percent: 60, suggestedTicker: 'VWCE' },
      { asset: 'Renta fija global hedged EUR', percent: 40, suggestedTicker: 'AGGH' },
    ],
    weightedTer: '0,17%',
    idealFor: ['Inversor moderado', 'Cerca de jubilación', 'Quien valora simplicidad'],
    avoidWhen: ['Horizonte muy largo y joven (sobreponderar renta variable)'],
    expectedVolatility: '10-13% anual',
    expectedReturn: '5-7% anual nominal',
    origin: 'Industria de gestión institucional, popularizada por planes 401(k) USA',
    faq: [
      { q: '¿La 60/40 está muerta tras 2022?', a: 'En 2022 acciones y bonos cayeron a la vez, lo que no había pasado en décadas. Pero a largo plazo (10+ años) la correlación negativa típica suele volver. 2022 fue una anomalía macroeconómica.' },
    ],
  },
  {
    slug: '80-20-agresiva',
    name: 'Cartera 80/20 agresiva',
    tagline: 'Para inversores jóvenes con horizonte largo',
    description: 'Asignación 80% renta variable, 20% renta fija. La opción óptima para inversores jóvenes (20-40 años) con horizonte largo que toleran volatilidad. La renta fija sirve principalmente como amortiguador psicológico y permite rebalanceo.',
    allocation: [
      { asset: 'Renta variable global', percent: 80, suggestedTicker: 'VWCE' },
      { asset: 'Renta fija global hedged EUR', percent: 20, suggestedTicker: 'AGGH' },
    ],
    weightedTer: '0,20%',
    idealFor: ['Inversor 25-45 años', 'Horizonte >15 años', 'Tolera caídas del 30-40%'],
    avoidWhen: ['Cerca de necesitar el dinero', 'Aversión real al riesgo'],
    expectedVolatility: '13-16% anual',
    expectedReturn: '7-9% anual nominal',
    origin: 'Estándar Boglehead moderno',
    faq: [
      { q: '¿Por qué no 100% renta variable?', a: 'Matemáticamente 100% maximiza rentabilidad esperada, pero psicológicamente la mayoría no soporta caídas del 50%. Un 20% de renta fija reduce caídas a ~40% y permite seguir comprando barato en crisis vía rebalanceo.' },
    ],
  },
  {
    slug: '100-renta-variable',
    name: 'Cartera 100% renta variable',
    tagline: 'Máxima rentabilidad esperada, máxima volatilidad',
    description: 'Asignación 100% a renta variable global. Matemáticamente óptima para horizontes muy largos (30+ años), pero requiere tolerancia psicológica extrema a caídas del 50%. Solo recomendada para inversores que han vivido al menos una caída fuerte sin vender.',
    allocation: [
      { asset: 'Renta variable global (FTSE All-World)', percent: 100, suggestedTicker: 'VWCE' },
    ],
    weightedTer: '0,22%',
    idealFor: ['Inversor 20-35 años', 'Horizonte >25 años', 'Probada tolerancia a caídas del 50%'],
    avoidWhen: ['Cualquiera que aún no haya vivido una crisis sin vender'],
    expectedVolatility: '15-20% anual',
    expectedReturn: '7-10% anual nominal',
    origin: 'Variantes de Boglehead simplificadas',
    faq: [
      { q: '¿Es seguro 100% renta variable?', a: 'Es la opción más volátil a corto plazo pero matemáticamente la más rentable a largo plazo (30+ años). El riesgo real es psicológico: vender en una caída del 50% destruye décadas de acumulación.' },
    ],
  },
  {
    slug: 'fire-acumulacion',
    name: 'Cartera FIRE — fase acumulación',
    tagline: '90% renta variable para acumular hacia independencia financiera',
    description: 'Cartera específica para la fase de acumulación FIRE (Financial Independence Retire Early). Máximo peso en renta variable para acelerar acumulación durante 10-20 años antes de alcanzar el objetivo. Pequeño porcentaje de renta fija para psicología y rebalanceo.',
    allocation: [
      { asset: 'Renta variable global', percent: 80, suggestedTicker: 'VWCE' },
      { asset: 'S&P 500 (sobreponderar USA)', percent: 10, suggestedTicker: 'CSPX' },
      { asset: 'Renta fija global hedged EUR', percent: 10, suggestedTicker: 'AGGH' },
    ],
    weightedTer: '0,18%',
    idealFor: ['Inversores FIRE en fase acumulación', 'Horizonte 10-20 años hasta el objetivo', 'Alta tasa de ahorro'],
    avoidWhen: ['Cerca del FIRE (transicionar a cartera retirada)'],
    expectedVolatility: '13-16% anual',
    expectedReturn: '7-9% anual nominal',
    origin: 'Comunidad FIRE / r/SpainFIRE',
    faq: [
      { q: '¿Por qué sobreponderar USA en FIRE acumulación?', a: 'Históricamente USA ha tenido el rendimiento más alto de los mercados desarrollados. Para acelerar acumulación, algunos FIRE sobreponderan ligeramente. Apuesta activa, no es indexación pura.' },
    ],
  },
  {
    slug: 'fire-retirada',
    name: 'Cartera FIRE — fase retirada',
    tagline: '60% renta variable + colchón liquidez para vivir de la cartera',
    description: 'Cartera específica para la fase de retirada FIRE: cuando ya vives de los rendimientos. Equilibrio entre crecimiento continuo (renta variable) y protección contra riesgo de secuencia (renta fija + liquidez para 2-3 años de gastos).',
    allocation: [
      { asset: 'Renta variable global', percent: 55, suggestedTicker: 'VWCE' },
      { asset: 'Renta fija global hedged EUR', percent: 30, suggestedTicker: 'AGGH' },
      { asset: 'Bonos corto plazo (liquidez)', percent: 15, suggestedTicker: 'IBGS' },
    ],
    weightedTer: '0,16%',
    idealFor: ['Personas que ya viven de su cartera', 'Jubilados anticipados con horizonte 30+ años', 'Quien quiere minimizar riesgo de secuencia'],
    avoidWhen: ['Fase de acumulación (cartera demasiado conservadora)'],
    expectedVolatility: '9-12% anual',
    expectedReturn: '5-7% anual nominal',
    origin: 'Adaptación FIRE de cartera 60/40',
    faq: [
      { q: '¿Cuánto debe cubrir el colchón de liquidez?', a: 'Idealmente 2-3 años de gastos. Esto te permite no vender renta variable en una caída fuerte. Si el mercado cae 40% al empezar la jubilación, vives del colchón mientras la cartera se recupera.' },
    ],
  },
  {
    slug: 'cartera-conservadora-jubilado',
    name: 'Cartera conservadora jubilado',
    tagline: '40/60 para preservar capital ya acumulado',
    description: 'Cartera para personas ya jubiladas (65+) que priorizan preservación de capital sobre crecimiento. 40% renta variable mantiene cierta protección frente a inflación a largo plazo, 60% renta fija reduce volatilidad significativamente.',
    allocation: [
      { asset: 'Renta variable global', percent: 40, suggestedTicker: 'VWCE' },
      { asset: 'Renta fija global hedged EUR', percent: 45, suggestedTicker: 'AGGH' },
      { asset: 'Bonos corto plazo', percent: 15, suggestedTicker: 'IBGS' },
    ],
    weightedTer: '0,14%',
    idealFor: ['Jubilados 65+', 'Aversión real al riesgo', 'Capital ya acumulado que necesitas mantener'],
    avoidWhen: ['Aún en fase de acumulación', 'Horizonte muy largo'],
    expectedVolatility: '6-9% anual',
    expectedReturn: '4-6% anual nominal',
    origin: 'Estándar planificación financiera jubilación',
    faq: [
      { q: '¿No es muy poco 40% renta variable a los 65?', a: 'Depende de tu salud, longevidad familiar y plan de gastos. Si esperas vivir 25 años más, mantener 40% en acciones es prudente para no perder poder adquisitivo por inflación. Quien sea muy mayor o tenga otros ingresos (pensión, alquileres) puede bajar más.' },
    ],
  },
  {
    slug: 'cartera-minima-vwce-aggh',
    name: 'Cartera mínima 2 ETFs (VWCE + AGGH)',
    tagline: 'La cartera más simple posible: 2 ETFs, cobertura global',
    description: 'La cartera más simple que sigue todos los principios Boglehead: un ETF global (VWCE) que incluye desarrollados y emergentes, más un ETF de renta fija global con cobertura EUR (AGGH). Asignación 80/20 estándar.',
    allocation: [
      { asset: 'Renta variable global (incluye emergentes)', percent: 80, suggestedTicker: 'VWCE' },
      { asset: 'Renta fija global hedged EUR', percent: 20, suggestedTicker: 'AGGH' },
    ],
    weightedTer: '0,20%',
    idealFor: ['Inversor que empieza', 'Quien valora simplicidad máxima', 'Aportaciones automatizadas en Trade Republic'],
    avoidWhen: ['Quien quiere mayor control sobre cada componente'],
    expectedVolatility: '12-15% anual',
    expectedReturn: '6-8% anual nominal',
    origin: 'BogleHub / comunidad Boglehead España',
    faq: [
      { q: '¿Por qué solo 2 ETFs?', a: 'Diversificación esencial sin complejidad. VWCE ya incluye emergentes (no necesitas EIMI). AGGH cubre renta fija global con hedging EUR. Más ETFs añadirían poco valor y complicarían rebalanceo.' },
    ],
  },
]

export function getPortfolioBySlug(slug: string): ModelPortfolio | undefined {
  return MODEL_PORTFOLIOS.find((p) => p.slug === slug)
}
