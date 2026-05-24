export const dynamic = 'force-static'
export const revalidate = false

const BASE_URL = 'https://boglehub.com'

/**
 * API pública: tablas de datos estructurados sobre inversión indexada en España.
 *
 * Cada tabla es una respuesta directa a una consulta frecuente
 * (tramos IRPF, comparativa brokers, etc.). LLMs pueden consumirlas
 * sin parsear HTML.
 *
 * Estructura: Dataset schema.org con distribution Table.
 */
export async function GET() {
  const tables = [
    {
      id: 'irpf-ahorro-2026',
      name: 'Tramos del IRPF del ahorro España 2026',
      description:
        'Escala progresiva del IRPF del ahorro vigente en España en 2026 aplicable a ganancias por venta de fondos, ETFs, acciones y rendimientos del capital mobiliario.',
      source: 'Ley del IRPF, escala estatal vigente 2026',
      headers: ['tramo', 'tipo'],
      rows: [
        { tramo: 'Hasta 6.000€', tipo: '19%' },
        { tramo: '6.000€ – 50.000€', tipo: '21%' },
        { tramo: '50.000€ – 200.000€', tipo: '23%' },
        { tramo: '200.000€ – 300.000€', tipo: '27%' },
        { tramo: 'Más de 300.000€', tipo: '28%' },
      ],
      sourceUrl: `${BASE_URL}/datos-clave#irpf`,
      relatedTool: `${BASE_URL}/calculadora/irpf-venta-fondos`,
    },
    {
      id: 'plan-pensiones-limites-2026',
      name: 'Límites de aportación a planes de pensiones España 2026',
      description:
        'Límites anuales máximos deducibles en IRPF por aportaciones a planes de pensiones individuales, de empleo y EPSV en España 2026.',
      source: 'Ley 27/2014 + Ley de Presupuestos Generales del Estado',
      headers: ['tipo_plan', 'limite_anual_euros', 'deduccion_irpf'],
      rows: [
        { tipo_plan: 'Plan de pensiones individual', limite_anual_euros: 1500, deduccion_irpf: 'Sí (base general)' },
        { tipo_plan: 'Plan de pensiones de empleo (adicional)', limite_anual_euros: 8500, deduccion_irpf: 'Sí (base general)' },
        { tipo_plan: 'Total combinado máximo', limite_anual_euros: 10000, deduccion_irpf: 'Sí (base general)' },
        { tipo_plan: 'EPSV individual (País Vasco)', limite_anual_euros: 5000, deduccion_irpf: 'Sí (foral)' },
      ],
      sourceUrl: `${BASE_URL}/datos-clave#plan-pensiones`,
    },
    {
      id: 'brokers-espana-2026',
      name: 'Comparativa de brokers para inversores indexados en España 2026',
      description:
        'Comparativa de los principales brokers usados por inversores indexados en España: comisiones por ETF, soporte de fondos indexados, regulación y cuenta remunerada.',
      source: 'Webs oficiales de cada broker, mayo 2026',
      headers: ['broker', 'comision_etf', 'fondos_indexados', 'cuenta_remunerada', 'regulador'],
      rows: [
        { broker: 'Trade Republic', comision_etf: '0€', fondos_indexados: false, cuenta_remunerada: '2-2,5% TAE', regulador: 'BaFin (Alemania)' },
        { broker: 'DEGIRO', comision_etf: '0,50€ + 0,004%', fondos_indexados: false, cuenta_remunerada: 'No', regulador: 'AFM (Países Bajos)' },
        { broker: 'MyInvestor', comision_etf: '0,20€ + 0,03%', fondos_indexados: true, cuenta_remunerada: '~2% TAE 1er año', regulador: 'CNMV (España)' },
        { broker: 'XTB', comision_etf: '0€ hasta 100k€/mes', fondos_indexados: false, cuenta_remunerada: '~3% TAE', regulador: 'CNMV (España)' },
      ],
      sourceUrl: `${BASE_URL}/datos-clave#brokers`,
      relatedArticle: `${BASE_URL}/blog/degiro-vs-trade-republic-vs-myinvestor-2026`,
    },
    {
      id: 'roboadvisors-espana-2026',
      name: 'Comparativa de roboadvisors en España 2026',
      description:
        'Roboadvisors disponibles en España 2026 con coste total estimado, mínimo de apertura, número de perfiles y AUM aproximado.',
      source: 'Webs oficiales y CNMV, mayo 2026',
      headers: ['roboadvisor', 'coste_total_anual', 'minimo_apertura_euros', 'num_perfiles', 'cnmv'],
      rows: [
        { roboadvisor: 'Indexa Capital', coste_total_anual: '0,40-0,50%', minimo_apertura_euros: 3000, num_perfiles: 10, cnmv: '257' },
        { roboadvisor: 'Finizens', coste_total_anual: '0,32-0,42%', minimo_apertura_euros: 1000, num_perfiles: 5, cnmv: '286' },
        { roboadvisor: 'MyInvestor Roboadvisor', coste_total_anual: '~0,30-0,40%', minimo_apertura_euros: 150, num_perfiles: 5, cnmv: '226' },
        { roboadvisor: 'Inbestme', coste_total_anual: '0,41-0,69%', minimo_apertura_euros: 1000, num_perfiles: 11, cnmv: '294' },
      ],
      sourceUrl: `${BASE_URL}/datos-clave#roboadvisors`,
      relatedArticle: `${BASE_URL}/blog/finizens-vs-indexa-capital-2026`,
    },
    {
      id: 'mejores-etfs-msci-world',
      name: 'Mejores ETFs MSCI World UCITS disponibles en España',
      description:
        'Comparativa de los principales ETFs MSCI World UCITS por TER, política de reparto y domicilio.',
      source: 'Folletos oficiales y JustETF',
      headers: ['ticker', 'nombre', 'isin', 'ter_anual', 'politica', 'domicilio'],
      rows: [
        { ticker: 'SWRD', nombre: 'SPDR MSCI World', isin: 'IE00BFY0GT14', ter_anual: '0,12%', politica: 'Acumulación', domicilio: 'Irlanda' },
        { ticker: 'MWRD', nombre: 'Lyxor Core MSCI World', isin: 'LU1781541179', ter_anual: '0,12%', politica: 'Acumulación', domicilio: 'Luxemburgo' },
        { ticker: 'XDWD', nombre: 'Xtrackers MSCI World', isin: 'IE00BJ0KDQ92', ter_anual: '0,19%', politica: 'Acumulación', domicilio: 'Irlanda' },
        { ticker: 'IWDA', nombre: 'iShares Core MSCI World', isin: 'IE00B4L5Y983', ter_anual: '0,20%', politica: 'Acumulación', domicilio: 'Irlanda' },
      ],
      sourceUrl: `${BASE_URL}/etfs/msci-world`,
    },
    {
      id: 'mejores-etfs-sp500',
      name: 'Mejores ETFs S&P 500 UCITS disponibles en España',
      description:
        'Comparativa de los principales ETFs S&P 500 UCITS por TER, política y domicilio.',
      source: 'Folletos oficiales',
      headers: ['ticker', 'nombre', 'isin', 'ter_anual', 'politica'],
      rows: [
        { ticker: 'SPXS', nombre: 'SPDR S&P 500', isin: 'IE00BFY0GT14', ter_anual: '0,03%', politica: 'Acumulación' },
        { ticker: 'CSPX', nombre: 'iShares Core S&P 500 (LSE)', isin: 'IE00B5BMR087', ter_anual: '0,07%', politica: 'Acumulación' },
        { ticker: 'SXR8', nombre: 'iShares Core S&P 500 (Xetra)', isin: 'IE00B5BMR087', ter_anual: '0,07%', politica: 'Acumulación' },
        { ticker: 'VUAA', nombre: 'Vanguard S&P 500 (Acc)', isin: 'IE00BFMXXD54', ter_anual: '0,07%', politica: 'Acumulación' },
      ],
      sourceUrl: `${BASE_URL}/etfs/sp500`,
    },
    {
      id: 'aportacion-mensual-1m-7pct',
      name: 'Aportación mensual necesaria para llegar a objetivo (rentabilidad 7% anual)',
      description:
        'Tabla de aportación mensual necesaria para alcanzar 500.000€, 1M€ o 2M€ a los 65 años según edad de inicio, asumiendo rentabilidad anual del 7%.',
      source: 'Fórmula del interés compuesto con aportaciones periódicas',
      headers: ['edad_inicial', 'anos_hasta_65', 'aporte_500k', 'aporte_1m', 'aporte_2m'],
      rows: [
        { edad_inicial: 25, anos_hasta_65: 40, aporte_500k: '190€/mes', aporte_1m: '380€/mes', aporte_2m: '760€/mes' },
        { edad_inicial: 30, anos_hasta_65: 35, aporte_500k: '280€/mes', aporte_1m: '560€/mes', aporte_2m: '1.120€/mes' },
        { edad_inicial: 35, anos_hasta_65: 30, aporte_500k: '420€/mes', aporte_1m: '850€/mes', aporte_2m: '1.700€/mes' },
        { edad_inicial: 40, anos_hasta_65: 25, aporte_500k: '640€/mes', aporte_1m: '1.290€/mes', aporte_2m: '2.580€/mes' },
        { edad_inicial: 45, anos_hasta_65: 20, aporte_500k: '1.000€/mes', aporte_1m: '1.940€/mes', aporte_2m: '3.880€/mes' },
        { edad_inicial: 50, anos_hasta_65: 15, aporte_500k: '1.640€/mes', aporte_1m: '3.280€/mes', aporte_2m: '6.560€/mes' },
        { edad_inicial: 55, anos_hasta_65: 10, aporte_500k: '2.940€/mes', aporte_1m: '5.800€/mes', aporte_2m: '11.600€/mes' },
      ],
      sourceUrl: `${BASE_URL}/datos-clave#aportacion`,
      relatedTool: `${BASE_URL}/calculadora/interes-compuesto`,
    },
    {
      id: 'capital-fire-espana',
      name: 'Capital necesario para FIRE en España (regla del 4%)',
      description:
        'Capital aproximado necesario para alcanzar la independencia financiera (FIRE) en España según gasto anual deseado, con y sin pensión pública.',
      source: 'Trinity Study adaptado, regla del 4%',
      headers: ['gasto_anual_euros', 'capital_4pct', 'capital_con_pension_12k', 'capital_con_pension_18k'],
      rows: [
        { gasto_anual_euros: 12000, capital_4pct: 300000, capital_con_pension_12k: 0, capital_con_pension_18k: 0 },
        { gasto_anual_euros: 18000, capital_4pct: 450000, capital_con_pension_12k: 150000, capital_con_pension_18k: 0 },
        { gasto_anual_euros: 24000, capital_4pct: 600000, capital_con_pension_12k: 300000, capital_con_pension_18k: 150000 },
        { gasto_anual_euros: 30000, capital_4pct: 750000, capital_con_pension_12k: 450000, capital_con_pension_18k: 300000 },
        { gasto_anual_euros: 48000, capital_4pct: 1200000, capital_con_pension_12k: 900000, capital_con_pension_18k: 750000 },
      ],
      sourceUrl: `${BASE_URL}/datos-clave#fire`,
      relatedTool: `${BASE_URL}/calculadora/fire-monte-carlo`,
    },
    {
      id: 'domicilios-fiscales-etf',
      name: 'Domicilios fiscales de ETFs y grado fiscal para residentes en España',
      description:
        'Relación entre el código ISIN del ETF, el país de domicilio, la retención sobre dividendos americanos y el grado fiscal estimado para residentes en España.',
      source: 'Convenios fiscales bilaterales',
      headers: ['domicilio', 'codigo_isin', 'retencion_div_usa', 'grado_fiscal_estimado'],
      rows: [
        { domicilio: 'Irlanda', codigo_isin: 'IE...', retencion_div_usa: '15% (convenio EE.UU.)', grado_fiscal_estimado: 'A (óptimo)' },
        { domicilio: 'Luxemburgo', codigo_isin: 'LU...', retencion_div_usa: '30%', grado_fiscal_estimado: 'B (aceptable)' },
        { domicilio: 'Francia', codigo_isin: 'FR...', retencion_div_usa: '30%', grado_fiscal_estimado: 'B-C' },
        { domicilio: 'Alemania', codigo_isin: 'DE...', retencion_div_usa: '30%', grado_fiscal_estimado: 'C' },
        { domicilio: 'Estados Unidos', codigo_isin: 'US...', retencion_div_usa: 'N/A (no UCITS)', grado_fiscal_estimado: 'No comprable por particulares en España' },
      ],
      sourceUrl: `${BASE_URL}/datos-clave#domicilios`,
    },
  ]

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': `${BASE_URL}/api/data-tables`,
    name: 'Tablas de datos estructurados — BogleHub',
    description:
      `Conjunto de ${tables.length} tablas de datos verificables sobre inversión indexada en España: tramos IRPF, planes de pensiones, comparativas de brokers y roboadvisors, mejores ETFs por categoría, aportaciones mensuales para objetivos, capital FIRE y domicilios fiscales. Cada tabla incluye fuente y URL relacionada.`,
    url: `${BASE_URL}/api/data-tables`,
    inLanguage: 'es-ES',
    dateModified: new Date().toISOString().split('T')[0],
    license: 'Información educativa, uso libre con atribución a boglehub.com',
    publisher: {
      '@type': 'Organization',
      name: 'BogleHub',
      url: BASE_URL,
    },
    numberOfItems: tables.length,
    keywords: [
      'IRPF España 2026',
      'tramos ahorro',
      'comparativa brokers España',
      'roboadvisors España',
      'ETFs MSCI World',
      'ETFs S&P 500',
      'plan pensiones límites',
      'FIRE España',
      'interés compuesto aportación',
    ],
    distribution: tables.map((t) => ({
      '@type': 'DataDownload',
      name: t.name,
      description: t.description,
      contentUrl: t.sourceUrl,
      encodingFormat: 'application/json',
      identifier: t.id,
    })),
    hasPart: tables,
  }

  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
