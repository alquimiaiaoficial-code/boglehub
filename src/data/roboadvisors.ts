/**
 * Roboadvisors disponibles en España.
 * Cada uno genera /roboadvisor/[slug] con análisis completo.
 */

export interface RoboadvisorFaq {
  q: string
  a: string
}

export interface Roboadvisor {
  slug: string
  name: string
  /** Tipo de entidad */
  entityType: string
  regulator: string
  regulatorId?: string
  founded?: number
  /** Comisión de gestión */
  managementFee: string
  /** Coste total estimado */
  totalCost: string
  /** Mínimo apertura */
  minimumOpening: string
  /** Nº de carteras / perfiles */
  numProfiles: number
  /** AUM aproximado */
  aum?: string
  /** Activos en cartera */
  underlyingFunds: string[]
  /** Plan de pensiones */
  hasPensionPlan: boolean
  /** Tagline */
  tagline: string
  /** Descripción extensa */
  description: string
  /** Para quién */
  idealFor: string[]
  notIdealFor: string[]
  officialUrl: string
  faq: RoboadvisorFaq[]
}

export const ROBOADVISORS: Roboadvisor[] = [
  {
    slug: 'indexa-capital',
    name: 'Indexa Capital',
    entityType: 'Empresa de Servicios de Inversión (ESI)',
    regulator: 'CNMV',
    regulatorId: '257',
    founded: 2015,
    managementFee: '0,15% (hasta 10.000€), baja hasta 0,10% (>100.000€)',
    totalCost: '0,40-0,50% anual (gestión + custodia + TER de fondos)',
    minimumOpening: '3.000€ (fondos), sin mínimo (pensiones)',
    numProfiles: 10,
    aum: '+2.000 millones €',
    underlyingFunds: ['Vanguard', 'iShares', 'Amundi'],
    hasPensionPlan: true,
    tagline: 'El roboadvisor con más patrimonio gestionado de España',
    description:
      'Indexa Capital es el roboadvisor líder en España por patrimonio gestionado. Fundado en 2015 por François Derbaix, registrado en CNMV como ESI nº 257. Invierte exclusivamente en fondos indexados de Vanguard, iShares y Amundi con metodología 100% pasiva. Sus carteras van del perfil 1/10 (máximo conservador) al 10/10 (máximo riesgo), con rebalanceo automático cuando se desvían del peso objetivo. Es la opción más establecida y con más historial auditado del mercado español.',
    idealFor: [
      'Inversores que quieren delegar completamente la gestión',
      'Quien valora rebalanceo y aportaciones automatizadas',
      'Quien necesita granularidad de 10 perfiles de riesgo',
      'Quien busca plan de pensiones indexado con historial sólido',
    ],
    notIdealFor: [
      'Quien tiene disciplina para gestionar cartera DIY',
      'Patrimonio muy pequeño (mínimo 3.000€)',
      'Quien quiere control total sobre cada decisión',
    ],
    officialUrl: 'https://indexacapital.com/es',
    faq: [
      {
        q: '¿Es seguro Indexa Capital?',
        a: 'Sí. Indexa está registrado en CNMV como ESI nº 257. Tu dinero no está en Indexa sino en una cuenta de valores a tu nombre en el banco custodio (Inversis). En caso de insolvencia de Indexa, tu cartera de fondos quedaría intacta porque es legalmente tuya. Los fondos están además cubiertos por el Fondo de Garantía de Inversores hasta 100.000€.',
      },
      {
        q: '¿Cuánto cobra Indexa Capital realmente?',
        a: 'El coste total se compone de: (1) comisión Indexa 0,15% hasta 10.000€ bajando a 0,10% para >100.000€, (2) custodia ~0,12% del banco depositario, (3) TER de los fondos subyacentes ~0,07-0,22%. En total, la mayoría de clientes pagan 0,40-0,50% anual sobre patrimonio.',
      },
      {
        q: '¿Indexa o Finizens?',
        a: 'Indexa tiene 10 niveles de perfil (vs 5 de Finizens), más patrimonio gestionado, y comisiones similares (~0,40-0,50%). Finizens tiene mínimo de apertura más bajo (1.000€ vs 3.000€) y carteras que incluyen oro. Para la mayoría son intercambiables; elige según interfaz preferida.',
      },
      {
        q: '¿Cómo es la rentabilidad histórica de Indexa Capital?',
        a: 'Indexa publica rentabilidades auditadas desde 2015 en su web. Sus carteras han batido consistentemente a fondos activos comparables tras comisiones. Para datos actualizados, consulta indexacapital.com/es/rentabilidad. Recuerda que rentabilidades pasadas no garantizan futuras.',
      },
    ],
  },
  {
    slug: 'finizens',
    name: 'Finizens',
    entityType: 'Agencia de valores',
    regulator: 'CNMV',
    regulatorId: '286',
    founded: 2016,
    managementFee: '0,12% (hasta 10.000€), baja hasta 0,099% (>100.000€)',
    totalCost: '0,32-0,42% anual total',
    minimumOpening: '1.000€',
    numProfiles: 5,
    aum: '~400 millones €',
    underlyingFunds: ['iShares', 'Vanguard', 'Amundi'],
    hasPensionPlan: true,
    tagline: 'Roboadvisor con carteras que incluyen oro y mínimo bajo',
    description:
      'Finizens es una agencia de valores registrada en CNMV nº 286, fundada en 2016. Ofrece 5 carteras numeradas del 1 al 5 con asignaciones de activos que incluyen oro físico (vía ETC) en perfiles más conservadores, algo poco común entre roboadvisors. Mínimo de apertura más bajo que Indexa Capital (1.000€ vs 3.000€). Plan de pensiones indexado también disponible.',
    idealFor: [
      'Patrimonio inicial menor a 3.000€',
      'Quien valora incluir oro como diversificador',
      'Quien prefiere interfaz visual sencilla',
    ],
    notIdealFor: [
      'Quien quiere granularidad mayor de perfiles (Indexa tiene 10)',
    ],
    officialUrl: 'https://finizens.com',
    faq: [
      {
        q: '¿Es seguro Finizens?',
        a: 'Sí. Finizens está registrado en CNMV como agencia de valores nº 286. El dinero se custodia en entidades bancarias separadas de Finizens. En caso de insolvencia, los fondos son del cliente y están cubiertos por el Fondo de Garantía de Inversores hasta 100.000€. Tiene respaldo del grupo Global Savings Group.',
      },
      {
        q: '¿Por qué Finizens incluye oro en sus carteras?',
        a: 'Finizens incluye un porcentaje pequeño de oro físico (vía ETC) en sus carteras conservadoras como diversificador descorrelacionado con renta variable. La premisa es que el oro suele subir cuando la bolsa baja, amortiguando caídas. Es una decisión de diseño distinta a Indexa, que no incluye materias primas.',
      },
    ],
  },
  {
    slug: 'myinvestor-roboadvisor',
    name: 'MyInvestor Roboadvisor',
    entityType: 'Servicio de gestión de carteras de banco español',
    regulator: 'CNMV',
    regulatorId: '226 (Andbank)',
    founded: 2020,
    managementFee: '~0,15%',
    totalCost: '~0,30-0,40% anual total',
    minimumOpening: '150€',
    numProfiles: 5,
    underlyingFunds: ['Vanguard', 'Amundi', 'Fidelity'],
    hasPensionPlan: true,
    tagline: 'Roboadvisor con mínimo de apertura más bajo de España',
    description:
      'MyInvestor Roboadvisor es el servicio de gestión automatizada del neobanco MyInvestor (grupo Andbank). Su gran ventaja es el mínimo de apertura de solo 150€, el más bajo entre los roboadvisors españoles. Invierte en fondos institucionales de Vanguard, Amundi y Fidelity. El coste total estimado es de los más bajos del mercado (~0,30-0,40%). Ideal para quien empieza con poco capital o quiere probar el modelo roboadvisor sin compromiso.',
    idealFor: [
      'Empezar con muy poco capital (150€)',
      'Clientes existentes de MyInvestor que quieren unificar',
      'Quien busca el coste total más bajo',
    ],
    notIdealFor: [
      'Quien quiere granularidad de 10 perfiles',
    ],
    officialUrl: 'https://myinvestor.es/inversion/gestion-de-carteras/',
    faq: [
      {
        q: '¿Es seguro MyInvestor Roboadvisor?',
        a: 'Sí. MyInvestor es el neobanco del grupo Andbank, regulado por CNMV y Banco de España. El servicio de gestión de carteras opera bajo la licencia bancaria de Andbank. Los fondos son del cliente, custodiados de forma segregada y cubiertos por el Fondo de Garantía de Inversores hasta 100.000€.',
      },
    ],
  },
  {
    slug: 'inbestme',
    name: 'inbestMe',
    entityType: 'Agencia de valores',
    regulator: 'CNMV',
    regulatorId: '294',
    founded: 2017,
    managementFee: 'Variable según patrimonio',
    totalCost: '0,41-0,69% anual',
    minimumOpening: '1.000€',
    numProfiles: 11,
    aum: '~150 millones €',
    underlyingFunds: ['Vanguard', 'iShares', 'SPDR'],
    hasPensionPlan: true,
    tagline: 'Roboadvisor con 11 perfiles y carteras temáticas (ESG, dividendos)',
    description:
      'inbestMe es una agencia de valores registrada en CNMV nº 294. Ofrece 11 perfiles de riesgo (más granularidad que Indexa) y, además de carteras estándar de fondos indexados, carteras temáticas: ESG (sostenibilidad), dividendos y crecimiento. Mínimo de apertura 1.000€. Comisiones algo superiores al promedio (0,41-0,69% total).',
    idealFor: [
      'Quien quiere cartera ESG o temática',
      'Quien valora máxima granularidad de perfiles (11)',
    ],
    notIdealFor: [
      'Sensibilidad alta a comisiones (algo más caro que Indexa)',
    ],
    officialUrl: 'https://www.inbestme.com',
    faq: [
      {
        q: '¿Vale la pena inbestMe sobre Indexa por las carteras ESG?',
        a: 'Si la inversión socialmente responsable (ESG) es importante para ti, inbestMe ofrece carteras 100% sostenibles, algo que Indexa no tiene por defecto. La diferencia de comisiones (0,1-0,2% más cara que Indexa) es el coste de esa especialización. Si ESG no es tu prioridad, Indexa es más económico.',
      },
    ],
  },
  {
    slug: 'openbank-roboadvisor',
    name: 'Openbank Roboadvisor',
    entityType: 'Servicio de banco',
    regulator: 'Banco de España + CNMV',
    regulatorId: '0086',
    founded: 2019,
    managementFee: '~0,53%',
    totalCost: '~0,70-0,90% anual',
    minimumOpening: '500€',
    numProfiles: 4,
    underlyingFunds: ['Fondos Santander Asset Management'],
    hasPensionPlan: false,
    tagline: 'Roboadvisor de Santander Openbank, comisiones más altas',
    description:
      'Openbank Roboadvisor es el servicio de gestión automatizada del banco online de Santander. Solo 4 perfiles de riesgo. Las comisiones totales (~0,70-0,90%) son significativamente más altas que Indexa, Finizens o MyInvestor. Para inversores que ya son clientes Openbank/Santander y valoran unificación con su banco, puede tener sentido por comodidad; para quien prioriza coste, hay alternativas mejores.',
    idealFor: [
      'Clientes Openbank/Santander que quieren unificar',
    ],
    notIdealFor: [
      'Inversor sensible a coste (Indexa o MyInvestor más baratos)',
    ],
    officialUrl: 'https://www.openbank.es/inversion-y-ahorro/robo-advisor',
    faq: [
      {
        q: '¿Por qué Openbank Roboadvisor es más caro?',
        a: 'Los roboadvisors de banca tradicional suelen invertir en fondos propios del grupo (Santander Asset Management en este caso) que tienen TER más alto que la gama institucional Vanguard/Amundi/iShares que usan Indexa o MyInvestor. La gestora del grupo cobra TER + el banco cobra comisión, doble margen.',
      },
    ],
  },
]

export function getRoboadvisorBySlug(slug: string): Roboadvisor | undefined {
  return ROBOADVISORS.find((r) => r.slug === slug)
}
