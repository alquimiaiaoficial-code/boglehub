# BogleHub Pro UI + PDF Parser Implementation Plan

> **For agentic workers:** Use subagent-driven-development. Steps use checkbox syntax.

**Goal:** Transform BogleHub from MVP to premium product. Dark theme inspired by Linear/Bloomberg/Vercel. Multi-broker PDF parser. UX at world-class level.

**Architecture:**
- Pure dark theme (no light mode toggle yet). Pure black `#0a0a0a` background, Geist font.
- PDF parsing via `pdf-parse` (text PDFs) + `tesseract.js` fallback (image PDFs).
- Components rewritten for dark theme. Charts rewired to dark-aware palette.

**Tech additions:** Geist fonts, Framer Motion (subtle animations), pdf-parse, tesseract.js (optional fallback).

---

## Phase 1 — Foundation

### Task 1: Install new dependencies + Geist fonts

- [ ] Install: `npm install framer-motion pdf-parse@1.1.1`
- [ ] Install dev: `npm install --save-dev @types/pdf-parse`
- [ ] Geist comes from `next/font/google` (Geist + Geist Mono already available in Next 15)

### Task 2: Update theme tokens (globals.css)

Replace `src/app/globals.css`:
```css
@import 'tailwindcss';

@theme {
  /* Dark base */
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --color-surface-2: #1c1c1c;
  --color-border: #262626;
  --color-border-strong: #3f3f46;

  /* Text */
  --color-fg: #fafafa;
  --color-fg-muted: #a1a1aa;
  --color-fg-subtle: #71717a;

  /* Accents */
  --color-accent: #10b981;
  --color-accent-hover: #059669;
  --color-danger: #ef4444;
  --color-info: #3b82f6;
  --color-warn: #f59e0b;

  /* Brand keeps blue but darker for dark theme */
  --color-brand-400: #60a5fa;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;

  /* Fonts */
  --font-sans: 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'Fira Code', monospace;
}

@layer base {
  html { font-family: var(--font-sans); background: var(--color-bg); color: var(--color-fg); }
  body { background: var(--color-bg); color: var(--color-fg); antialiased: true; }
  *::selection { background: rgba(16, 185, 129, 0.3); }
}
```

### Task 3: Update layout.tsx with Geist fonts

```typescript
import { Geist, Geist_Mono } from 'next/font/google'
const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

// In RootLayout:
<html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
```

---

## Phase 2 — Components Redesign

### Task 4: New Button component (dark variants)

`src/components/ui/Button.tsx` rewrite:
- Primary: bg-brand-600 hover:bg-brand-500
- Secondary: bg-surface-2 border border-border hover:border-border-strong
- Ghost: text-fg-muted hover:text-fg hover:bg-surface
- Danger: bg-danger/10 text-danger border border-danger/30
- Add `accent` variant: bg-accent text-bg (green for "Analizar" CTA)
- Loading spinner refined
- All transitions smooth

### Task 5: New Card component

- Default: bg-surface border border-border
- Hover variant: hover:border-border-strong transition
- Add CardFooter component
- Padding more generous (p-6 → p-8 for hero cards)

### Task 6: New Input component

- Dark bg-surface-2 with focus ring brand-500
- Larger touch targets (h-12 on mobile)
- Placeholder fg-subtle

### Task 7: Logo component

`src/components/Logo.tsx`:
```typescript
export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  // SVG monogram BH inside circle + wordmark "BogleHub"
  // sizes: sm = h-6, md = h-8, lg = h-10
}
```

### Task 8: Header component

`src/components/Header.tsx`:
- Sticky, backdrop-blur, border-b border-border
- Logo left, nav center (Inicio · Analizador · Cómo funciona · GitHub), CTA right
- Mobile menu hamburger
- Active route highlighted

### Task 9: Footer component

`src/components/Footer.tsx`:
- Multi-column: Producto / Recursos / Legal / Social
- Disclaimer prominente: "Información educativa, no asesoramiento financiero"
- Copyright + Made with Claude footnote

---

## Phase 3 — Charts dark theme

### Task 10: Rewire charts to dark palette

In all 3 chart components (AllocationPie, RegionBar, SectorBar):
- Background: transparent
- Text color: #a1a1aa
- Axis color: #3f3f46
- Bar colors: accent gradient (`#10b981` → `#3b82f6`)
- Pie colors: brand spectrum (`#3b82f6`, `#60a5fa`, `#93c5fd`, `#10b981`, `#34d399`, `#fbbf24`)
- Tooltip: dark bg with border, sharper typography
- Add subtle glow effect via filter

---

## Phase 4 — Landing Page Redesign

### Task 11: Rebuild landing

`src/app/page.tsx` complete rewrite:

Sections:
1. **Hero** — massive headline (text-7xl), subhead in fg-muted, dual CTA (primary "Empezar gratis" + secondary "Ver demo"), gradient subtle behind
2. **Trust strip** — "Hecho para Bogleheads hispanos · 100% gratis · Sin registro · Open source"
3. **How it works** — 3 steps with icons (pega/sube → analiza → descubre), with vertical timeline
4. **Features grid** — 6 features in 2-3 cols with icon + title + description (AI analysis, FX conversion, FIRE calculator, etc.)
5. **Comparison table** — BogleHub vs Indexa vs Hacer en Excel
6. **FAQ** — accordion, 6-8 questions
7. **Final CTA** — large card "Empieza a analizar tu cartera ahora"
8. **Footer** — full

Animations: stagger fade-in on scroll for each section using Framer Motion.

---

## Phase 5 — Analyzer Dashboard Redesign

### Task 12: Rebuild analyzer page

`src/app/analyzer/page.tsx` rewrite to dashboard layout:

Layout (desktop):
- Header: Logo + breadcrumb + total value + analyze button
- Left column (1/3): Position input + positions table
- Right column (2/3): Analysis results (charts + AI)

Mobile: stacked vertically, sticky CTA at bottom.

New components:
- `src/components/PortfolioStats.tsx` — strip with total value, # positions, weighted TER (always visible)
- `src/components/PortfolioInput.tsx` redesign — drag/drop zone for PDF + manual entry
- `src/components/PortfolioTable.tsx` redesign — more dense, monospace tickers, inline edit

---

## Phase 6 — PDF Parser Core

### Task 13: Generic PDF parser with extraction

`src/lib/pdf-parser/core.ts`:
```typescript
import pdfParse from 'pdf-parse'

export interface ParsedPosition {
  ticker: string
  shares: number
  avgPrice: number
  confidence: 'high' | 'medium' | 'low'
}

export interface ParseResult {
  positions: ParsedPosition[]
  broker: 'TRADE_REPUBLIC' | 'DEGIRO' | 'MYINVESTOR' | 'UNKNOWN'
  rawText: string
  warnings: string[]
}

export async function parsePdf(buffer: Buffer): Promise<ParseResult> {
  const data = await pdfParse(buffer)
  const text = data.text

  if (text.includes('Trade Republic')) return parseTradeRepublic(text)
  if (text.includes('DEGIRO')) return parseDegiro(text)
  if (text.includes('MyInvestor')) return parseMyInvestor(text)

  return { positions: [], broker: 'UNKNOWN', rawText: text, warnings: ['Broker no reconocido'] }
}
```

### Task 14: Trade Republic parser

`src/lib/pdf-parser/trade-republic.ts`:
- Extract positions from monthly account summary
- Pattern matching for ISIN/ticker rows
- Handle multi-position pages

### Task 15: DEGIRO parser (CSV + PDF)

`src/lib/pdf-parser/degiro.ts`:
- Primary: CSV from "Account" download
- Secondary: PDF "Position Statement"

### Task 16: MyInvestor parser

`src/lib/pdf-parser/myinvestor.ts`:
- PDF "Estado de cuenta"
- Spanish patterns

### Task 17: Parser tests

For each broker, fixture PDFs in `tests/fixtures/` + parser tests.

---

## Phase 7 — Upload UI

### Task 18: PDF upload API route

`src/app/api/parse-pdf/route.ts`:
- Accept multipart/form-data
- Validate file size (<5MB), type (application/pdf)
- Run parser
- Return ParseResult JSON

### Task 19: PDF upload component

`src/components/PdfUpload.tsx`:
- Drag & drop zone (rounded-2xl, border-dashed)
- Click to browse
- Loading state during parse
- Preview detected positions with edit/confirm
- "Importar X posiciones" button → adds to store

---

## Phase 8 — Final

### Task 20: Tests + build verification

- All tests pass
- Build green
- Lighthouse score >90

### Task 21: Commit + push

- Atomic commits per phase
- Push to GitHub
- Verify Vercel auto-deploy

---

**End of plan.**
