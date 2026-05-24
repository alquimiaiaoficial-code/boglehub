/**
 * Perfiles de inversor — generan páginas /perfil/[slug] de alto volumen
 * de búsqueda con queries específicas tipo "cómo invertir siendo X".
 */

export interface ProfileFaq {
  q: string
  a: string
}

export interface InvestorProfile {
  slug: string
  /** Título corto */
  name: string
  /** Resumen del perfil */
  tagline: string
  /** Descripción larga indexable */
  description: string
  /** Recomendaciones específicas */
  recommendations: {
    horizon: string
    equityWeight: string
    suggestedPortfolio: string
    suggestedBroker: string
    monthlyContribution: string
  }
  /** Riesgos y consideraciones específicas */
  considerations: string[]
  faq: ProfileFaq[]
}

export const INVESTOR_PROFILES: InvestorProfile[] = [
  {
    slug: 'jovenes-20-30-anios',
    name: 'Jóvenes 20-30 años',
    tagline: 'Empezar a invertir con 40+ años por delante',
    description:
      'Inversores en la veintena tienen el activo más valioso para la inversión indexada: tiempo. Con 40 años por delante hasta la edad de jubilación, el interés compuesto puede transformar aportaciones modestas en patrimonios significativos. La clave es empezar pronto, aceptar la volatilidad como compañera de viaje y mantener una cartera 100% renta variable o casi (90/10). El error más caro a esta edad no es elegir el ETF equivocado: es no empezar.',
    recommendations: {
      horizon: '40 años o más',
      equityWeight: '90-100% renta variable',
      suggestedPortfolio: '80% VWCE + 10% AGGH (renta fija) + 10% liquidez para emergencias',
      suggestedBroker: 'Trade Republic (planes de ahorro automáticos desde 1€)',
      monthlyContribution: 'Idealmente 100-300€/mes; lo importante es la regularidad',
    },
    considerations: [
      'No tocar la cartera durante caídas del mercado',
      'Automatizar aportaciones para eliminar fricción y decisión',
      'Tener fondo de emergencia de 3-6 meses ANTES de invertir',
      'Aprovechar el plan de pensiones (deducción IRPF) hasta el límite 1.500€/año',
    ],
    faq: [
      {
        q: '¿Cuánto debería invertir al mes con 25 años?',
        a: 'Para llegar a 500.000€ a los 65 con rentabilidad del 7% anual, basta con aportar 190€/mes durante 40 años. Para llegar a 1 millón, 380€/mes. Empezar pronto importa más que la cantidad: alguien que aporta 100€/mes desde los 25 acumula más que alguien que aporta 200€/mes empezando a los 35, gracias al interés compuesto.',
      },
      {
        q: '¿Es buena idea invertir 100% en renta variable con 25 años?',
        a: 'Matemáticamente sí: con 40 años por delante, la prima de la renta variable supera con creces la mayor volatilidad. La pregunta real no es matemática sino psicológica: ¿soportarás ver tu cartera caer un 40% en una crisis sin vender en pánico? Si nunca has vivido una caída fuerte, mejor empezar con 90/10 y subir a 100/0 cuando hayas demostrado tolerancia real.',
      },
      {
        q: '¿VWCE o IWDA para empezar con 25 años?',
        a: 'Cualquiera de los dos es excelente. VWCE incluye emergentes (~12%) en un solo producto, IWDA solo desarrollados. VWCE es más sencillo si quieres "todo el mundo" sin gestionar. IWDA + EIMI en 88/12 es marginalmente más barato y te da control. Para empezar y mantener simple: VWCE.',
      },
    ],
  },
  {
    slug: '30-40-anios',
    name: '30-40 años',
    tagline: 'La década clave para construir patrimonio',
    description:
      'Entre los 30 y los 40 años se suelen consolidar los ingresos, formar familia y comprar vivienda. Es la década más importante para acumular patrimonio inversor: aún tienes 25-35 años hasta la jubilación, pero los ingresos suelen ser mayores que en la veintena. La estrategia óptima combina renta variable agresiva (80-90%), automatización completa y aprovechamiento máximo del plan de pensiones por la deducción fiscal.',
    recommendations: {
      horizon: '25-35 años',
      equityWeight: '80-90% renta variable',
      suggestedPortfolio: '80% VWCE + 20% AGGH (renta fija) — cartera Boglehead estándar',
      suggestedBroker: 'MyInvestor (combinar fondos indexados con traspaso fiscal libre y ETFs)',
      monthlyContribution: '15-25% de los ingresos netos mensuales',
    },
    considerations: [
      'Plan de pensiones individual hasta 1.500€/año para deducción IRPF',
      'Si la empresa tiene plan de pensiones de empleo: aprovecharlo al máximo',
      'Vivienda: priorizar inversión sobre amortización anticipada de hipoteca barata',
      'Aumentar aportación cada vez que sube el sueldo (% constante)',
    ],
    faq: [
      {
        q: '¿Cuánto necesito ahorrar al mes con 35 años para llegar al millón a los 65?',
        a: 'Asumiendo rentabilidad anual del 7%, necesitas aportar aproximadamente 850€/mes durante 30 años para llegar a 1 millón a los 65 años. Si empiezas con un capital inicial de 50.000€, la aportación necesaria baja a unos 470€/mes.',
      },
      {
        q: '¿Mejor invertir o amortizar hipoteca?',
        a: 'Depende del interés de la hipoteca. Si tu hipoteca está al 3% o menos, históricamente invertir en renta variable global (7-10% nominal histórico) ha sido más rentable a largo plazo, asumiendo la volatilidad. Si la hipoteca es al 4% o más, los números se acercan y entra en juego tu tolerancia al riesgo y necesidad de tranquilidad psicológica.',
      },
    ],
  },
  {
    slug: '40-50-anios',
    name: '40-50 años',
    tagline: 'Acelerar y empezar a planificar la jubilación',
    description:
      'La cuarentena marca un punto de inflexión: aún quedan 15-25 años hasta la jubilación pero el horizonte se acorta. La cartera debe ser ligeramente más conservadora (70-80% renta variable) y empieza a tener sentido planificar específicamente la transición a la jubilación. Las aportaciones suelen ser las más altas de la vida inversora porque coinciden con el pico de ingresos.',
    recommendations: {
      horizon: '15-25 años',
      equityWeight: '70-80% renta variable',
      suggestedPortfolio: '70% VWCE + 30% AGGH',
      suggestedBroker: 'MyInvestor + Trade Republic (combinar)',
      monthlyContribution: '20-30% de ingresos netos si es posible',
    },
    considerations: [
      'Empezar a calcular cuánto necesitarás para FIRE / jubilación',
      'Plan de pensiones al máximo si tu marginal IRPF es alto',
      'Construir colchón de liquidez de 2-3 años de gastos para el periodo de transición',
      'Revisar tu plan cada año, no cada mes',
    ],
    faq: [
      {
        q: '¿Es tarde para empezar a invertir con 45 años?',
        a: 'No. Para llegar a 500.000€ a los 65 desde cero con rentabilidad del 7%, necesitas aportar 1.000€/mes durante 20 años. Es exigente pero no imposible. Si ya tienes 50.000€ ahorrados, la aportación necesaria baja significativamente. Lo importante: empezar HOY, no procrastinar más.',
      },
    ],
  },
  {
    slug: '50-60-anios',
    name: '50-60 años',
    tagline: 'Transición progresiva hacia la cartera conservadora',
    description:
      'En los 50 toca empezar el "glide path": reducir gradualmente el peso de renta variable y aumentar la renta fija para protegerse del riesgo de secuencia de retornos (una caída fuerte justo al jubilarse). La cartera evoluciona de 70/30 a 60/40 y, cerca de los 60, hacia 50/50. Aún hay horizonte suficiente (10-15 años) para que la renta variable haga su trabajo, pero la prioridad cambia hacia protección de capital acumulado.',
    recommendations: {
      horizon: '10-15 años',
      equityWeight: '50-70% renta variable (decreciente)',
      suggestedPortfolio: '60% VWCE + 30% AGGH + 10% IBGS (corto plazo)',
      suggestedBroker: 'MyInvestor para fondos indexados con traspaso fiscal libre (clave para rebalanceo sin tributar)',
      monthlyContribution: 'Aportar todo lo posible',
    },
    considerations: [
      'Empezar a construir colchón de 2-3 años de gastos en liquidez',
      'Planificar la estrategia de rescate del plan de pensiones (renta vs capital)',
      'Considerar la pensión pública estimada en tu plan FIRE',
      'No vender aún la renta variable: aún quedan 10+ años, importante mantener crecimiento',
    ],
    faq: [
      {
        q: '¿Cómo debe ser la cartera con 55 años?',
        a: 'Una asignación típica con 55 años es 60% renta variable / 40% renta fija (60/40 clásica) o 50/50 para perfil más conservador. La cartera 70/30 puede ser razonable si tienes pensión pública alta esperada o si vas a complementar con trabajo parcial en la jubilación.',
      },
    ],
  },
  {
    slug: 'cerca-jubilacion',
    name: 'Cerca de la jubilación (60+)',
    tagline: 'Conservar el patrimonio, evitar el riesgo de secuencia',
    description:
      'En los 60s la prioridad cambia radicalmente: ya no se trata de maximizar crecimiento sino de proteger lo acumulado y planificar el rescate. El riesgo más grande es el "riesgo de secuencia de retornos": una caída del 40% justo al empezar a vivir de la cartera puede destruir el plan completo. Cartera 40-50% renta variable, colchón de 2-3 años en liquidez, planificación fiscal del rescate del plan de pensiones.',
    recommendations: {
      horizon: '5-15 años',
      equityWeight: '40-50% renta variable',
      suggestedPortfolio: '40% VWCE + 40% AGGH + 20% IBGS (corto plazo) + colchón de 2 años en liquidez',
      suggestedBroker: 'MyInvestor (clave por el traspaso fiscal libre para rebalanceos sin tributar)',
      monthlyContribution: 'Aportar lo que se pueda, ya no es el factor principal',
    },
    considerations: [
      'Riesgo de secuencia de retornos: caer un 40% justo al empezar a vivir de la cartera puede destruir el plan',
      'Colchón de 2-3 años de gastos en liquidez para no tener que vender en mal momento',
      'Planificar el rescate del plan de pensiones: forma de renta es generalmente más eficiente fiscalmente que rescate de capital',
      'Coordinar con la pensión pública: cobrar primero solo lo que falta para complementarla',
    ],
    faq: [
      {
        q: '¿Cómo rescatar el plan de pensiones de forma eficiente?',
        a: 'Rescatar el plan en forma de renta periódica (mensual o anual) distribuye el impacto fiscal porque tributa como rendimiento del trabajo. Rescatar todo de golpe en un único año dispara tu tipo marginal de IRPF y puede llevarte fácilmente al 45-47%. Si tienes aportaciones anteriores a 2007, considera rescatar esa parte como capital en el año de jubilación o los dos siguientes (reducción del 40%).',
      },
    ],
  },
  {
    slug: 'autonomos-y-freelancers',
    name: 'Autónomos y freelancers',
    tagline: 'Inversión cuando los ingresos son variables',
    description:
      'Los autónomos en España tienen el doble desafío de ingresos variables y, hasta hace poco, pensiones públicas más bajas que los asalariados (aunque la cotización mínima ha aumentado). Para este perfil, la estrategia indexada se adapta: colchón de emergencia más grande (6-12 meses), aportaciones flexibles según facturación, plan de pensiones para maximizar deducción IRPF (alta tasa marginal en muchos casos).',
    recommendations: {
      horizon: 'Depende de la edad, generalmente 20+ años',
      equityWeight: '70-80% renta variable',
      suggestedPortfolio: '70% VWCE + 20% AGGH + 10% liquidez extra',
      suggestedBroker: 'MyInvestor (cuenta + inversión todo en uno)',
      monthlyContribution: 'Mejor un porcentaje fijo de la facturación que importe fijo',
    },
    considerations: [
      'Fondo de emergencia 6-12 meses (más alto que asalariado por volatilidad de ingresos)',
      'Plan de pensiones individual al máximo (1.500€/año) por deducción IRPF en marginales altos',
      'Considerar plan de pensiones de autónomos si la facturación es regular',
      'No depender solo de la inversión: diversificar también con seguros y otros vehículos',
    ],
    faq: [
      {
        q: '¿Por qué los autónomos deben tener fondo de emergencia más grande?',
        a: 'Los ingresos del autónomo son volátiles: meses buenos y meses malos. Un asalariado puede planificar con su nómina, el autónomo no. Por eso el fondo de emergencia "estándar" de 3-6 meses se queda corto; idealmente 6-12 meses. Esto permite que un mal trimestre no obligue a vender inversiones en mal momento.',
      },
    ],
  },
  {
    slug: 'expatriados-y-nomadas',
    name: 'Expatriados y nómadas digitales',
    tagline: 'Inversión cuando cambias de país',
    description:
      'Los expatriados españoles fuera del país, o nómadas digitales que cambian de residencia fiscal con frecuencia, enfrentan complicaciones específicas: convenios de doble imposición, posibles obligaciones de declaración en varios países, restricciones MiFID II para residentes fuera de la UE. La estrategia recomendada: ETFs UCITS irlandeses que mantienen eficiencia fiscal en la mayoría de jurisdicciones europeas, broker europeo (Trade Republic, DEGIRO o Interactive Brokers) y asesor fiscal local de cada residencia.',
    recommendations: {
      horizon: 'Depende del plan personal',
      equityWeight: 'Variable según edad',
      suggestedPortfolio: 'VWCE + AGGH (productos UCITS aceptados en toda la UE)',
      suggestedBroker: 'Interactive Brokers (acceso global, mantiene cuenta en múltiples residencias)',
      monthlyContribution: 'Adaptarse a la fiscalidad del país de residencia actual',
    },
    considerations: [
      'Confirma residencia fiscal del año en curso (regla 183 días)',
      'Algunos brokers cierran cuenta si pierdes residencia UE',
      'Modelo 720 obligatorio si eres residente fiscal en España con activos extranjeros >50k€',
      'Asesor fiscal local de cada país de residencia',
    ],
    faq: [
      {
        q: '¿Pierdo eficiencia fiscal si me voy de España?',
        a: 'No necesariamente. Los ETFs UCITS irlandeses mantienen su eficiencia fiscal en la mayoría de jurisdicciones europeas. Lo que cambia es a quién declaras: pasas de tributar por mundialidad en España (residente fiscal) a tributar en tu nuevo país de residencia. Cada país tiene reglas distintas; consulta asesor local.',
      },
    ],
  },
  {
    slug: 'herederos',
    name: 'Herederos (recibir una herencia)',
    tagline: 'Cómo invertir una cantidad grande recibida de golpe',
    description:
      'Recibir una herencia o ganancia inesperada (lotería, venta de empresa, indemnización) plantea el clásico dilema: invertir todo de golpe (lump sum) o repartir en aportaciones mensuales (DCA). La evidencia histórica favorece el lump sum en 2/3 de los periodos, pero la realidad psicológica suele decantar la decisión. Para herencias grandes, lo más importante no es la estrategia óptima matemática sino tener un plan que se pueda mantener sin pánico.',
    recommendations: {
      horizon: 'Largo plazo, depende del objetivo',
      equityWeight: 'Según edad y perfil de riesgo',
      suggestedPortfolio: 'Cartera estándar Boglehead 60/40 o 70/30 según edad',
      suggestedBroker: 'MyInvestor (fondos con traspaso fiscal libre para rebalancear sin coste)',
      monthlyContribution: 'No aplica — es lump sum o DCA de la herencia',
    },
    considerations: [
      'Esperar 6-12 meses antes de decidir nada grande (período de duelo si aplica)',
      'Pagar deudas caras (>5% interés) primero',
      'Constituir fondo de emergencia',
      'Si te genera ansiedad, DCA en 12-24 meses es válido aunque matemáticamente inferior',
    ],
    faq: [
      {
        q: '¿Invierto 100.000€ de herencia todos de golpe o poco a poco?',
        a: 'Matemáticamente, invertir todo de golpe (lump sum) supera al DCA en 2/3 de los periodos históricos porque el mercado tiende a subir. Pero si invertir todo de golpe te genera ansiedad o vas a vender en pánico ante la primera caída, el DCA en 12-24 meses es preferible aunque sea matemáticamente inferior. La peor cartera es la que abandonas a medio camino.',
      },
    ],
  },
  {
    slug: 'padres-para-hijos',
    name: 'Padres que invierten para sus hijos',
    tagline: 'Construir patrimonio para hijos menores',
    description:
      'Invertir en el largo plazo para hijos menores (educación universitaria, dar empujón inicial al adulto joven) es uno de los usos más potentes del interés compuesto: tienes 15-25 años por delante y aportaciones flexibles. La complicación es legal: en España, los menores no pueden tener cuentas de valores directamente, así que los padres invierten a su nombre y los hijos heredan o reciben la cantidad cuando cumplen la mayoría de edad. Implicaciones fiscales y legales específicas.',
    recommendations: {
      horizon: '15-25 años hasta el "uso" del dinero',
      equityWeight: '90% renta variable (horizonte largo)',
      suggestedPortfolio: '100% VWCE durante los primeros 15 años, transición a 80/20 los últimos 5',
      suggestedBroker: 'MyInvestor (fondos con traspaso fiscal libre, útil al cambiar asignación)',
      monthlyContribution: '50-200€/mes desde el nacimiento del hijo',
    },
    considerations: [
      'La cuenta es de los padres (los menores no pueden tener cuenta de valores)',
      'Al alcanzar mayoría de edad: donación con impuesto de donaciones según CCAA',
      'Considerar seguros de ahorro para hijos (PIAS) si quieres garantizar el destino',
      'No confundir con plan ahorro infantil bancario (suelen ser productos pésimos)',
    ],
    faq: [
      {
        q: '¿Cuánto debería invertir al mes para que mi hijo tenga 100.000€ a los 25 años?',
        a: 'Asumiendo rentabilidad anual del 7% durante 25 años desde su nacimiento, necesitas aportar aproximadamente 130€/mes. Si empiezas más tarde, la cantidad sube: para 18 años de horizonte, ~265€/mes para 100.000€. Empezar al nacer es el momento óptimo: 25 años de interés compuesto es brutal.',
      },
    ],
  },
  {
    slug: 'jubilacion-anticipada-fire',
    name: 'FIRE: jubilación anticipada',
    tagline: 'Acumular para vivir de la cartera antes de los 60',
    description:
      'El movimiento FIRE (Financial Independence Retire Early) propone acumular suficiente patrimonio para vivir de los rendimientos antes de la edad de jubilación tradicional. Requiere tasas de ahorro altas (40-60% de los ingresos), inversión agresiva (80-100% renta variable durante la acumulación) y planificación específica del rescate considerando la regla del 4% y el riesgo de secuencia. En España, la pensión pública reduce el capital necesario significativamente al complementar el rescate a partir de la edad oficial.',
    recommendations: {
      horizon: '10-20 años hasta el FIRE',
      equityWeight: '80-100% durante acumulación, 60-70% en FIRE',
      suggestedPortfolio: '90% VWCE + 10% AGGH durante acumulación',
      suggestedBroker: 'Combinar Trade Republic (ETFs sin comisión para acumulación) + MyInvestor (fondos para rebalanceo libre)',
      monthlyContribution: '40-60% de los ingresos netos',
    },
    considerations: [
      'Regla del 4%: necesitas 25 veces tu gasto anual (sin pensión pública)',
      'Con pensión pública española estimada, el capital necesario baja significativamente',
      'Riesgo de secuencia: caída del 40% al empezar a retirar puede destruir el plan',
      'Calculadora FIRE Monte Carlo para probar resistencia de tu plan a volatilidad real',
    ],
    faq: [
      {
        q: '¿Cuánto necesito para alcanzar FIRE en España?',
        a: 'Con la regla del 4%, capital = 25 × gasto anual. Para 24.000€/año (2.000€/mes), necesitas 600.000€. Pero en España la pensión pública a los 65 reduce drásticamente esto: si tu pensión estimada es 1.500€/mes (18.000€/año), solo necesitas que la cartera cubra los 6.000€ restantes anuales = 150.000€. La pensión pública es uno de los mayores activos de un FIRE español.',
      },
    ],
  },
  {
    slug: 'principiante-absoluto',
    name: 'Principiantes absolutos',
    tagline: 'Nunca he invertido y no sé por dónde empezar',
    description:
      'Si nunca has invertido antes, todo parece complicado: ETFs, ISIN, TER, brokers, fiscalidad... La realidad es que para empezar bien solo necesitas decidir 3 cosas: (1) qué ETF comprar — VWCE es una opción excelente, (2) qué broker usar — Trade Republic es lo más sencillo, (3) cuánto aportar al mes — empieza con lo que puedas, aunque sean 50€. El resto se aprende sobre la marcha sin urgencia.',
    recommendations: {
      horizon: 'Largo plazo siempre (10+ años)',
      equityWeight: '80-90% para empezar',
      suggestedPortfolio: 'Empieza simple: 100% VWCE. Añade AGGH (renta fija) cuando tengas 5.000€+',
      suggestedBroker: 'Trade Republic (cero fricción, planes de ahorro automáticos desde 1€)',
      monthlyContribution: 'Lo que puedas, mínimo 50€/mes',
    },
    considerations: [
      'Fondo de emergencia (3-6 meses) ANTES de invertir',
      'Dedicar 1-2 horas a entender los conceptos básicos (glosario BogleHub)',
      'Empezar con una cantidad pequeña que no te duela perder',
      'No mirar la cartera cada día (genera ansiedad innecesaria)',
    ],
    faq: [
      {
        q: '¿Por dónde empezar a invertir si nunca lo he hecho?',
        a: '(1) Construir fondo de emergencia de 3-6 meses de gastos en una cuenta remunerada. (2) Abrir cuenta en Trade Republic (10 minutos, gratis). (3) Comprar VWCE con 50-100€ inicialmente para ver cómo funciona. (4) Configurar plan de ahorro automático mensual de la cantidad que decidas. (5) No tocar nada durante años. Es así de simple.',
      },
      {
        q: '¿Cuánto dinero necesito para empezar a invertir?',
        a: '1€. Literalmente. Trade Republic permite empezar con planes de ahorro automáticos desde 1€/mes en cualquier ETF. MyInvestor permite invertir en fondos indexados desde 1€. La barrera real no es económica sino mental: empezar.',
      },
    ],
  },
  {
    slug: 'patrimonio-grande-500k',
    name: 'Patrimonio grande (>500k€)',
    tagline: 'Optimización para inversores con cartera grande',
    description:
      'Cuando el patrimonio supera los 500.000€, las decisiones marginales (0,1% más caro o 0,1% más eficiente) pasan de irrelevantes a importantes. Sobre 1M€, cada décima de TER son 1.000€/año. La estrategia se enfoca en máxima eficiencia fiscal (Irlanda y acumulación), TER mínimo (SWRD vs IWDA, Amundi Prime Global vs Vanguard), diversificación entre brokers para garantías y planificación sucesoria.',
    recommendations: {
      horizon: 'Largo plazo, generalmente >15 años',
      equityWeight: 'Según edad y plan',
      suggestedPortfolio: 'Combinación de fondos (MyInvestor) para traspaso libre + ETFs (Trade Republic) para coste mínimo',
      suggestedBroker: 'Diversificar: MyInvestor + Trade Republic + DEGIRO para no superar garantías en un solo broker',
      monthlyContribution: 'Las aportaciones marginales importan menos; el patrimonio ya hace el trabajo',
    },
    considerations: [
      'Diversificar brokers: 100k€ en cada uno para no superar fondos de garantía',
      'Modelo 720 obligatorio si tienes brokers extranjeros (Trade Republic, DEGIRO) con >50k€',
      'Planificación sucesoria: testamento, donaciones planificadas, seguros',
      'Considerar asesor fiscal especializado a partir de cierto patrimonio',
    ],
    faq: [
      {
        q: '¿Debería diversificar entre brokers si tengo 1M€?',
        a: 'Sí, por dos razones. Primera: los fondos de garantía cubren hasta 100.000€ en España, 100.000€ en Alemania (Trade Republic), 20.000€ en Países Bajos (DEGIRO). Concentrar más de 100k€ en un solo broker te expone si quiebra (escenario improbable pero real). Segunda: redundancia operativa — si un broker tiene problemas técnicos, sigues teniendo acceso a tu cartera.',
      },
    ],
  },
]

export function getProfileBySlug(slug: string): InvestorProfile | undefined {
  return INVESTOR_PROFILES.find((p) => p.slug === slug)
}
