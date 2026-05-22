/**
 * Remark plugin: auto-link the first mention of each known ETF ticker in
 * article markdown. Each ticker becomes a link to /etf/[ticker] only once
 * per document. Skips existing links, inline code, code blocks and headings.
 *
 * Uses mdast-util-find-and-replace (already a transitive dependency of
 * remark-gfm) to safely modify the MDAST without risking traversal bugs.
 */
import { findAndReplace } from 'mdast-util-find-and-replace'
import type { Root } from 'mdast'

// All ETF tickers in the database (kept in sync with src/data/etfs.json)
const KNOWN_TICKERS = new Set([
  'VWCE', 'CSPX', 'IWDA', 'EIMI', 'AGGH', 'VEUR', 'VFEM', 'IMEU', 'SEMB',
  'VAGF', 'SXR8', 'EUNL', 'VUSA', 'VUKE', 'IMID', 'IUSA', 'EQDS', 'XDWD',
  'VWRL', 'LCUW', 'SWRD', 'WEBN', 'VWRP', 'ISAC', 'MWRD', 'VUAA', 'SPXS',
  'MEUD', 'CEUG', 'SMEA', 'IS3N', 'AEEM', 'EMIM', 'WSML', 'IUSN', 'ZPRS',
  'VGEA', 'EUNA', 'IBGX', 'VETY', 'SEGA', 'VHYL', 'ISPA', 'FGEQ', 'TDIV',
  'EXSG', 'EQQQ', 'SXRV', 'CNDX', 'SJPA', 'CPXJ', 'SGLN', 'IGLN',
  'IWQU', 'IWMO', 'ZPRV', 'XDEQ', 'XDWL', 'VGOV', 'IGLH', 'XGIG',
  'FLXE', 'XMWO', 'EUNH', 'WTEF', 'RBOT', 'IQQH',
])

// Note: 4GLD starts with a digit — handle it separately if needed.
// The regex below only matches A-Z tickers (3-5 chars at word boundaries).
const TICKER_REGEX = /\b([A-Z]{3,5})\b/g

/**
 * Plugin factory — returns a unified/remark plugin function.
 */
export function remarkAutolinkTickers() {
  return (tree: Root) => {
    // Track which tickers have already been linked in this document
    const seen = new Set<string>()

    findAndReplace(
      tree,
      [
        [
          TICKER_REGEX,
          // Replacer: receives (fullMatch, captureGroup1, matchObj)
          (_fullMatch: string, ticker: string) => {
            // Only link known tickers, first occurrence only
            if (!KNOWN_TICKERS.has(ticker) || seen.has(ticker)) {
              return false // no replacement
            }
            seen.add(ticker)
            return {
              type: 'link' as const,
              url: `/etf/${ticker.toLowerCase()}`,
              title: `Análisis de ${ticker} en BogleHub`,
              children: [{ type: 'text' as const, value: ticker }],
            }
          },
        ],
      ],
      // Skip these node types: don't link inside existing links, code or headings
      { ignore: ['link', 'linkReference', 'inlineCode', 'code', 'heading'] },
    )
  }
}
