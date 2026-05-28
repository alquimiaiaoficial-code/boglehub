import type { EtfMetadata } from '@/types/etf'

/**
 * Artículos del blog relacionados con cada ETF, para internal linking
 * desde las fichas /etf/[ticker] hacia el contenido editorial.
 *
 * La selección es DETERMINISTA a partir de las propiedades del ETF
 * (clase de activo, región, ticker), reutilizando los mismos criterios
 * que las categorías (/etfs/[tema]). Siempre se añaden artículos
 * fundacionales como red de seguridad para que ninguna ficha quede sin
 * enlaces salientes hacia el blog.
 *
 * Importante: estos slugs se filtran contra BLOG_ARTICLES en la página,
 * así que un slug que ya no exista simplemente no se renderiza (sin enlaces
 * rotos). Si se añade/renombra un artículo, revisar este mapeo.
 */

// Artículos base que aplican a (casi) cualquier ETF UCITS.
const FOUNDATIONAL = [
  'como-elegir-tu-primer-etf-espana-2026',
  'fiscalidad-etfs-espana-guia-completa',
  'fondos-indexados-vs-etfs-espana',
]

// Conjuntos de tickers (en sincronía con etfs/[tema] y etf/[ticker]).
const SP500_TICKERS = new Set(['CSPX', 'SXR8', 'VUSA', 'IUSA', 'VUAA', 'SPXS'])
const NASDAQ_TICKERS = new Set(['EQQQ', 'SXRV', 'CNDX'])
const DIVIDEND_TICKERS = new Set(['VHYL', 'VWRL', 'TDIV', 'ISPA', 'FGEQ'])

/**
 * Devuelve hasta `limit` slugs de artículos relevantes para un ETF,
 * ordenados de más a menos específico, con fundacionales al final.
 */
export function getRelatedArticleSlugs(etf: EtfMetadata, limit = 4): string[] {
  const out: string[] = []
  const r = etf.regionAllocation
  const em = (r.EM ?? 0) + (r.CHINA ?? 0)
  const us = r.US ?? 0

  if (etf.assetClass === 'COMMODITY') {
    out.push(
      'oro-etf-fisico-vs-mineria-espana',
      'cartera-permanente-harry-browne-espana',
    )
  } else if (etf.assetClass === 'BOND') {
    out.push(
      'mejores-etfs-renta-fija-2026',
      'riesgo-divisa-etf-hedged-espana',
      'cartera-boglehead-3-fondos-espana',
    )
  } else if (etf.assetClass === 'EQUITY') {
    if (NASDAQ_TICKERS.has(etf.ticker)) {
      out.push('mejores-etfs-nasdaq-100-espana')
    }
    if (DIVIDEND_TICKERS.has(etf.ticker)) {
      out.push('etfs-dividendos-vivir-rentas-espana')
    }
    if (SP500_TICKERS.has(etf.ticker)) {
      out.push('vwce-vs-cspx-vs-iwda')
    }
    // All-World (global con emergentes, tipo VWCE)
    if (em > 0.05 && us >= 0.4 && us < 0.8) {
      out.push('vwce-analisis-completo', 'msci-world-vs-msci-acwi-diferencias')
    }
    // MSCI World (mercados desarrollados, sin emergentes)
    if ((r.EM ?? 0) < 0.01 && (r.JAPAN ?? 0) > 0.02 && us >= 0.55 && us < 0.85) {
      out.push('que-es-el-msci-world', 'swrd-vs-iwda')
    }
    // Mercados emergentes
    if (em > 0.5) {
      out.push('mejores-etfs-espana-2026', 'que-es-el-msci-world')
    }
    // Fallback de renta variable
    out.push('mejores-etfs-espana-2026')
  }

  out.push(...FOUNDATIONAL)

  // Dedup conservando orden + tope.
  return [...new Set(out)].slice(0, limit)
}
