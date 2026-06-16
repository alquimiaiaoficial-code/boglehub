/**
 * Generación dinámica de FAQs para páginas individuales de ETF (/etf/[ticker]).
 *
 * Cada ETF genera 4-5 FAQs basadas en sus atributos reales (TER, domicilio,
 * política de reparto, clase de activo, regiones). Esto aporta contenido
 * único e indexable a las 68 páginas sin escribir manualmente cada FAQ.
 *
 * Las respuestas combinan plantillas con datos reales del ETF para que cada
 * página tenga texto original, no boilerplate idéntico.
 */
import type { EtfMetadata } from '@/types/etf'
import { computeFiscalGrade } from './fiscal'
import { formatPct } from './utils'

export interface EtfFaq {
  q: string
  a: string
}

const ASSET_CLASS_DESCRIPTION: Record<string, string> = {
  EQUITY: 'renta variable',
  BOND: 'renta fija (bonos)',
  COMMODITY: 'materias primas',
  REIT: 'inmobiliario cotizado (REITs)',
  CASH: 'liquidez / monetario',
  MIXED: 'cartera mixta',
}

/**
 * Devuelve la descripción "humana" del ETF combinando sus atributos.
 * Se usa como introducción indexable encima de las FAQs.
 */
export function generateEtfDescription(etf: EtfMetadata): string {
  const fiscal = computeFiscalGrade(etf.isin, etf.accumulating)
  const assetText = ASSET_CLASS_DESCRIPTION[etf.assetClass] ?? 'inversión'
  const policyText = etf.accumulating ? 'acumulación (reinvierte los dividendos)' : 'distribución (reparte dividendos)'
  const fiscalText =
    fiscal.grade === 'A'
      ? `fiscalmente eficiente para residentes en España (grado A: ${fiscal.domicileLabel})`
      : fiscal.grade === 'B'
        ? `con eficiencia fiscal moderada para inversores en España (grado B: ${fiscal.domicileLabel})`
        : `con eficiencia fiscal limitada para residentes en España (grado ${fiscal.grade}: ${fiscal.domicileLabel})`

  // Región principal
  const topRegion = Object.entries(etf.regionAllocation)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])[0]
  const regionLabel: Record<string, string> = {
    US: 'Estados Unidos',
    EUROPE: 'Europa',
    EM: 'mercados emergentes',
    JAPAN: 'Japón',
    GLOBAL: 'cobertura global',
    UK: 'Reino Unido',
    PACIFIC_EX_JAPAN: 'Pacífico (excluido Japón)',
    CHINA: 'China',
  }
  const regionText = topRegion
    ? `con mayor exposición a ${regionLabel[topRegion[0]] ?? topRegion[0]} (${formatPct(topRegion[1], 0)})`
    : ''

  return `${etf.name} (${etf.ticker}) es un ETF UCITS de ${assetText} ${regionText}, con TER del ${formatPct(etf.ter / 100, 2)} anual, política de ${policyText} y domicilio en ${fiscal.domicileLabel}. Por sus características, es ${fiscalText}.`
}

/**
 * Genera 4-5 FAQs dinámicas para un ETF concreto.
 * Las respuestas combinan plantillas con valores reales del ETF.
 */
export function generateEtfFaqs(etf: EtfMetadata): EtfFaq[] {
  const fiscal = computeFiscalGrade(etf.isin, etf.accumulating)
  const faqs: EtfFaq[] = []

  // FAQ 1: ¿Qué replica este ETF?
  const assetText = ASSET_CLASS_DESCRIPTION[etf.assetClass] ?? 'activos'
  faqs.push({
    q: `¿Qué tipo de activos contiene el ETF ${etf.ticker}?`,
    a: `${etf.name} es un ETF UCITS de ${assetText}. Su composición se distribuye principalmente entre las regiones y sectores indicados en las gráficas anteriores. El ETF cotiza en bolsa europea y puede comprarse desde brokers como Trade Republic, DEGIRO o MyInvestor en España. El ISIN ${etf.isin} permite identificar inequívocamente este fondo entre los distintos tickers en los que pueda cotizar.`,
  })

  // FAQ 2: Coste anual (TER)
  const terText = formatPct(etf.ter / 100, 2)
  const terComparison =
    etf.ter <= 0.10
      ? `muy bajo, entre los más competitivos del mercado europeo`
      : etf.ter <= 0.25
        ? `competitivo, dentro de la franja habitual de los ETFs indexados de bajo coste`
        : etf.ter <= 0.50
          ? `moderado, algo superior a los ETFs indexados más baratos pero razonable para su categoría`
          : `relativamente alto comparado con otros ETFs indexados generalistas; comprueba alternativas con TER inferior si existen`
  faqs.push({
    q: `¿Cuánto cuesta ${etf.ticker} al año?`,
    a: `El TER (Total Expense Ratio) de ${etf.ticker} es del ${terText} anual. Este coste se descuenta directamente del valor liquidativo del fondo de forma diaria, por lo que no aparece como una factura separada. Sobre una posición de 10.000€, el coste anual es aproximadamente ${formatPct(etf.ter / 100, 2)}, es decir ${(etf.ter * 100).toFixed(0)}€ al año. Es un TER ${terComparison}.`,
  })

  // FAQ 3: Acumulación o distribución
  const policyTitle = etf.accumulating ? 'de acumulación' : 'de distribución'
  const policyExplanation = etf.accumulating
    ? `Esto significa que reinvierte automáticamente los dividendos generados por las empresas en cartera, sin pagar al inversor. Para residentes en España, esta política es generalmente más eficiente fiscalmente en fase de acumulación porque difiere el IRPF hasta el momento de la venta.`
    : `Esto significa que reparte periódicamente los dividendos generados por las empresas en cartera al inversor. Los dividendos tributan al cobrarse como rendimientos del capital mobiliario en el IRPF español (19-30% según importe). Es la opción natural para inversores en fase de retiro que quieren cobrar rentas sin vender participaciones.`
  faqs.push({
    q: `¿${etf.ticker} es de acumulación o de distribución?`,
    a: `${etf.ticker} es un ETF ${policyTitle}. ${policyExplanation}`,
  })

  // FAQ 4: Eficiencia fiscal para España
  faqs.push({
    q: `¿Es ${etf.ticker} fiscalmente eficiente para inversores en España?`,
    a: `${etf.ticker} tiene un grado fiscal estimado ${fiscal.grade} para residentes en España. Está domiciliado en ${fiscal.domicileLabel}. ${fiscal.reason} Recuerda que las ganancias por venta tributan en la base del ahorro del IRPF (19-30% según importe) y que el grado fiscal es orientativo: verifica siempre los datos del folleto del fondo.`,
  })

  // FAQ 5: Dónde comprar (genérica pero contextualizada)
  faqs.push({
    q: `¿Dónde se puede comprar ${etf.ticker} en España?`,
    a: `${etf.ticker} cotiza en bolsas europeas y puede comprarse en los principales brokers usados por inversores españoles: Trade Republic (sin comisión por operación, planes de ahorro automáticos desde 1€), DEGIRO (0,50€ + 0,004% por operación, acceso a múltiples bolsas), MyInvestor (0,20€ + 0,03%, único broker español del listado con fondos indexados). Verifica siempre la comisión y el spread efectivo en tu broker antes de comprar.`,
  })

  return faqs
}
