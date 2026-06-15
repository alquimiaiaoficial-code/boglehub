/**
 * Remark plugin: auto-link the first mention of each known glossary term in
 * article markdown. Each term becomes a link to /glosario/[slug] only once
 * per document. Skips existing links, inline code, code blocks and headings.
 *
 * Designed to dramatically increase internal linking from blog articles to
 * the glossary, improving SEO link equity flow toward informational pages.
 *
 * The matching is intentionally restrictive: only exact, case-sensitive
 * matches of phrases that uniquely identify the term, to avoid false
 * positives (e.g. linking "tasa" inside a sentence about TAE).
 */
import { findAndReplace } from 'mdast-util-find-and-replace'
import type { Root } from 'mdast'
import { GLOSSARY_TERMS } from '@/data/glossary'

/**
 * Map of term variants (case-sensitive) → glossary slug.
 *
 * Variants are intentionally curated — only patterns that almost certainly
 * refer to the glossary concept. Patterns that would create false positives
 * (e.g. "broker" inside "stockbroker", "TER" inside "interés") are avoided.
 *
 * Generic words (renta variable, asset allocation) are matched only with
 * word boundaries via the regex below.
 */
const TERM_VARIANTS: Array<{ pattern: string; slug: string }> = [
  // Acronyms (exact case-sensitive uppercase)
  { pattern: 'TER', slug: 'ter' },
  { pattern: 'UCITS', slug: 'ucits' },
  { pattern: 'ISIN', slug: 'isin' },
  { pattern: 'ETC', slug: 'etc' },
  { pattern: 'NAV', slug: 'nav' },
  { pattern: 'AUM', slug: 'aum' },
  { pattern: 'IRPF', slug: 'irpf-ahorro' },
  { pattern: 'FIFO', slug: 'fifo' },
  { pattern: 'DCA', slug: 'dca' },
  { pattern: 'FIRE', slug: 'fire' },
  { pattern: 'YTM', slug: 'yield-to-maturity' },
  { pattern: 'ESG', slug: 'esg-sri' },
  { pattern: 'Modelo 720', slug: 'modelo-720' },
  { pattern: 'MSCI World', slug: 'msci-world' },
  { pattern: 'S&P 500', slug: 'sp500' },
  // Concepts (Title Case typical in text)
  { pattern: 'Boglehead', slug: 'boglehead' },
  { pattern: 'Sharpe ratio', slug: 'sharpe-ratio' },
  { pattern: 'tracking difference', slug: 'tracking-difference' },
  { pattern: 'tracking error', slug: 'tracking-error' },
  { pattern: 'drawdown', slug: 'drawdown' },
  { pattern: 'volatilidad', slug: 'volatilidad' },
  { pattern: 'rebalanceo', slug: 'rebalanceo' },
  { pattern: 'interés compuesto', slug: 'interes-compuesto' },
  { pattern: 'glide path', slug: 'glide-path' },
  { pattern: 'home bias', slug: 'home-bias' },
  { pattern: 'lump sum', slug: 'lump-sum' },
  { pattern: 'investment grade', slug: 'investment-grade' },
  { pattern: 'high yield', slug: 'investment-grade' },
  { pattern: 'roboadvisor', slug: 'roboadvisor' },
  { pattern: 'fondo indexado', slug: 'fondo-indexado' },
  { pattern: 'fondos indexados', slug: 'fondo-indexado' },
  { pattern: 'asset allocation', slug: 'asset-allocation' },
  { pattern: 'diversificación', slug: 'diversificacion' },
  { pattern: 'plan de pensiones', slug: 'plan-pensiones' },
  { pattern: 'plan de pensiones indexado', slug: 'plan-pensiones' },
  { pattern: 'convenio de doble imposición', slug: 'convenio-doble-imposicion' },
  { pattern: 'doble imposición', slug: 'convenio-doble-imposicion' },
  { pattern: 'regla de los dos meses', slug: 'regla-dos-meses' },
  { pattern: 'replicación física', slug: 'replicacion-fisica-sintetica' },
  { pattern: 'replicación sintética', slug: 'replicacion-fisica-sintetica' },
  { pattern: 'value investing', slug: 'value-vs-growth' },
  { pattern: 'growth investing', slug: 'value-vs-growth' },
  { pattern: 'hedged', slug: 'hedged' },
  { pattern: 'comisión de gestión', slug: 'comision-gestion' },
  { pattern: 'custodia', slug: 'custodia' },
  { pattern: 'domicilio fiscal', slug: 'domicilio-fiscal' },
  { pattern: 'acumulación', slug: 'acumulacion-vs-distribucion' },
  { pattern: 'distribución', slug: 'acumulacion-vs-distribucion' },
  { pattern: 'renta variable', slug: 'renta-variable' },
  { pattern: 'renta fija', slug: 'renta-fija' },
  // --- Nuevos términos de glosario (61→72) + huecos previos (alpha-beta, spread) ---
  { pattern: 'traspaso', slug: 'traspaso' },
  { pattern: 'tasa de retirada segura', slug: 'tasa-retirada-segura' },
  { pattern: 'regla del 4', slug: 'tasa-retirada-segura' }, // sin '%' a propósito: \b casa con "4%" y "4 %"
  { pattern: 'ganancias patrimoniales', slug: 'ganancia-patrimonial' },
  { pattern: 'ganancia patrimonial', slug: 'ganancia-patrimonial' },
  { pattern: 'rentabilidad anualizada', slug: 'rentabilidad-anualizada' },
  { pattern: 'CAGR', slug: 'rentabilidad-anualizada' },
  { pattern: 'duración', slug: 'duracion' }, // genérico: solo enlaza 1ª ocurrencia/doc
  { pattern: 'dividendos', slug: 'dividendo' },
  { pattern: 'dividendo', slug: 'dividendo' },
  { pattern: 'dividend yield', slug: 'dividend-yield' },
  { pattern: 'rentabilidad por dividendo', slug: 'dividend-yield' },
  { pattern: 'gestión pasiva', slug: 'gestion-pasiva' },
  { pattern: 'gestión activa', slug: 'gestion-activa' },
  { pattern: 'capitalización bursátil', slug: 'capitalizacion-bursatil' },
  { pattern: 'inflación', slug: 'inflacion' }, // genérico
  { pattern: 'REITs', slug: 'reit' },
  { pattern: 'REIT', slug: 'reit' },
  { pattern: 'prima de riesgo', slug: 'prima-riesgo' },
  { pattern: 'fondos monetarios', slug: 'fondo-monetario' },
  { pattern: 'fondo monetario', slug: 'fondo-monetario' },
  { pattern: 'Letras del Tesoro', slug: 'letras-del-tesoro' },
  { pattern: 'letras del Tesoro', slug: 'letras-del-tesoro' },
  { pattern: 'benchmark', slug: 'benchmark' },
  { pattern: 'mercado bajista', slug: 'mercado-bajista' },
  { pattern: 'liquidez', slug: 'liquidez' }, // genérico
  { pattern: 'correlación', slug: 'correlacion' },
  { pattern: 'coste de oportunidad', slug: 'coste-oportunidad' },
  { pattern: 'horizonte temporal', slug: 'horizonte-temporal' },
  { pattern: 'horizonte de inversión', slug: 'horizonte-temporal' },
  { pattern: 'perfil de riesgo', slug: 'perfil-riesgo' },
  { pattern: 'valor liquidativo', slug: 'valor-liquidativo' },
  { pattern: 'apalancamiento', slug: 'apalancamiento' },
  { pattern: 'bid-ask', slug: 'spread' },
  { pattern: 'Alpha y Beta', slug: 'alpha-beta' },
]

// Verify all referenced slugs exist in the glossary at module load time
// (helps catch typos early during build)
const VALID_SLUGS = new Set(GLOSSARY_TERMS.map((t) => t.slug))
const VALIDATED_VARIANTS = TERM_VARIANTS.filter(({ slug }) => VALID_SLUGS.has(slug))

/**
 * Build a single regex that matches any of the term variants, using
 * word boundaries where appropriate. Order longest-first so that
 * "plan de pensiones indexado" matches before "plan de pensiones".
 */
const SORTED_VARIANTS = [...VALIDATED_VARIANTS].sort(
  (a, b) => b.pattern.length - a.pattern.length,
)

// Escape regex special chars in patterns
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Build alternation with word boundary on both sides to avoid mid-word matches.
const COMBINED_PATTERN = new RegExp(
  `\\b(${SORTED_VARIANTS.map((v) => escapeRegex(v.pattern)).join('|')})\\b`,
  'g',
)

// Lookup map: pattern string → slug (case-sensitive)
const PATTERN_TO_SLUG = new Map<string, string>()
SORTED_VARIANTS.forEach(({ pattern, slug }) => {
  PATTERN_TO_SLUG.set(pattern, slug)
})

/**
 * Plugin factory — returns a unified/remark plugin function.
 */
export function remarkAutolinkGlossary() {
  return (tree: Root) => {
    // Track which slugs have already been linked in this document so each
    // term is linked only on first occurrence (no link spam)
    const seenSlugs = new Set<string>()

    findAndReplace(
      tree,
      [
        [
          COMBINED_PATTERN,
          (_fullMatch: string, matchedPattern: string) => {
            const slug = PATTERN_TO_SLUG.get(matchedPattern)
            if (!slug || seenSlugs.has(slug)) {
              return false // no replacement
            }
            seenSlugs.add(slug)
            return {
              type: 'link' as const,
              url: `/glosario/${slug}`,
              title: `Definición de ${matchedPattern} en el glosario`,
              children: [{ type: 'text' as const, value: matchedPattern }],
            }
          },
        ],
      ],
      { ignore: ['link', 'linkReference', 'inlineCode', 'code', 'heading'] },
    )
  }
}
