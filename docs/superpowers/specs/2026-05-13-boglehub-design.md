# BogleHub — Design Specification

**Date:** 2026-05-13
**Status:** Approved (brainstorming complete)
**Author:** Solo founder (17 yo, Spain)

---

## 1. Vision

**BogleHub** is the definitive **free** tool for Spanish-speaking passive investors (Bogleheads, ETF investors, index fund enthusiasts). It analyzes their portfolio with AI and gives them actionable insights — without managing their money (unlike robo-advisors Indexa/Finizens).

**One-liner:** *"Indexa Capital al revés — no gestionamos tu dinero, te damos las herramientas con IA para que TÚ lo hagas mejor."*

---

## 2. Strategic Context

### 2.1 Constraints
- Founder is a **minor** until ~2027 → cannot accept payments yet
- Faceless marketing only (no on-camera content)
- Solo builder, AI-augmented workflow
- Spanish-speaking → leverage geographic + linguistic moat

### 2.2 Strategy (1-year horizon)
- **Year 1 (until 18):** 100% free product, build audience + brand recognition
- **Year 2+ (post-18):** Launch Pro tier on top of engaged free user base
- Mirror trajectory of Anki, Obsidian, Linear, Notion (free-first, cult-following → monetize)

### 2.3 KPIs Year 1
- 5.000-15.000 registered users
- 1.000-3.000 portfolios analyzed
- 5-15k X followers + 10-30k TikTok followers
- 3-5k email list

---

## 3. Target Audience

### 3.1 Primary segment: **Spanish-speaking passive investor (Boglehead profile)**
- Invests in 1-5 indexed ETFs (VWCE, CSPX, IMIE, AGGH, etc.)
- Monthly DCA (Dollar Cost Averaging)
- Long-term horizon (10-30 years)
- Uses brokers: Trade Republic, DEGIRO, MyInvestor, ING, BBVA
- Active in communities: r/SpainFIRE, Bogleheads.es, FOROCOCHES Inversión

### 3.2 Why this segment wins
- **TAM:** 2-3M Spain + millions LATAM
- **Low churn:** passive investors hold for years → high LTV
- **Lower regulatory friction:** education ≠ advisory
- **Content-hungry:** consume hours of YouTube/blogs about indexing
- **Underserved by AI tools:** all serious tools (Simply Wall St, Morningstar) are English

---

## 4. Product — MVP

### 4.1 Killer feature: **Portfolio Analyzer**

User enters/uploads portfolio → receives in <30 seconds:

1. **Asset allocation breakdown** — % equity / bonds / cash / commodities
2. **Geographic diversification** — exposure to US/EU/EM/Japan
3. **Sector concentration** — tech overweight vs benchmarks
4. **Currency exposure** — USD vs EUR risk
5. **Rebalancing suggestion** — "sell 3% VWCE, buy IMIE for less US concentration"
6. **TER analysis** — annual fee weight
7. **IRPF Spain tax analysis** — "if you sell X, you'll pay Y in taxes"
8. **FIRE calculator** — "with your contribution rate, FIRE in 23 years"
9. **AI chat** about the portfolio (RAG over user data)

### 4.2 Data acquisition strategy
- **Phase 1 (MVP):** Manual entry (ticker, qty, avg price, currency)
- **Phase 2 (M2-3):** PDF parser for Trade Republic, DEGIRO, MyInvestor
- **Phase 3 (M6+):** Generic OCR for screenshots
- **Phase 4 (post-monetization):** Consider AISP partner if it covers brokers

### 4.3 Out of scope for MVP
- Authentication (use localStorage initially)
- Multi-broker aggregation
- PDF parsing
- Email digests
- Discord community
- All "Pro tier" features (saved for post-18 launch)

---

## 5. Technical Architecture

### 5.1 Stack
- **Framework:** Next.js 15 + App Router + TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **AI:** Groq (Llama 3.3 70B Versatile) for analysis text
- **Market data:** Yahoo Finance via direct fetch (free tier)
- **ETF metadata:** Static JSON in repo (TER, region, sector for top 100 ETFs)
- **Charts:** Recharts (lightweight, React-native)
- **State:** Zustand for client state, localStorage for persistence (MVP)
- **Validation:** Zod for all API boundaries
- **Tests:** Vitest + React Testing Library
- **Hosting:** Vercel (free tier sufficient for MVP)

### 5.2 Why this stack
- Reuses EstudiaAI learnings (Groq integration, Next.js patterns)
- Zero infrastructure cost during free phase
- Stack ready to scale (add Supabase auth + DB when needed in Phase 2)

### 5.3 Module breakdown

```
src/
├── app/
│   ├── page.tsx                    # Landing + hero
│   ├── analyzer/page.tsx           # Main analyzer tool
│   ├── etf/[ticker]/page.tsx       # ETF detail pages (SEO)
│   ├── api/
│   │   ├── prices/route.ts         # Fetch live prices
│   │   ├── analyze/route.ts        # AI analysis
│   │   └── etf-search/route.ts     # ETF ticker search
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── PortfolioInput/             # Add/edit positions
│   ├── PortfolioTable/             # Current positions display
│   ├── AnalysisResults/            # Tabs: allocation, geo, sector, fiscal
│   ├── charts/                     # AllocationPie, GeoMap, SectorBar
│   └── ui/                         # Button, Card, Input, Badge
├── lib/
│   ├── ai.ts                       # Groq client + prompts
│   ├── prices.ts                   # Yahoo Finance integration
│   ├── analysis.ts                 # Portfolio calc logic (pure functions)
│   ├── etf-database.ts             # ETF metadata accessor
│   ├── irpf.ts                     # Spain tax calc
│   ├── fire.ts                     # FIRE calculator
│   └── store.ts                    # Zustand store
├── data/
│   └── etfs.json                   # Static ETF metadata (top 100)
└── types/
    ├── portfolio.ts
    ├── etf.ts
    └── analysis.ts
```

### 5.4 Data flow

```
User enters positions
      ↓
[Zustand store] → persisted in localStorage
      ↓
User clicks "Analyze"
      ↓
[fetchPrices(tickers)] → /api/prices → Yahoo Finance
      ↓
[Local: calculateAllocations(positions, prices, etfDb)] → pure JS
      ↓
[/api/analyze (POST)] → Groq Llama 3.3 70B → AI narrative
      ↓
[AnalysisResults] renders tabs with charts + AI text
```

### 5.5 Error handling
- Result<T, E> pattern for all API calls (no try/catch sprawl)
- Zod validation at every boundary
- User-facing errors in Spanish, actionable
- Sentry deferred until traffic justifies it

---

## 6. Design Principles

### 6.1 Visual language
- **Calma editorial.** No partículas, no neones, no "AI gradients". Linear/Notion vibe.
- **Tipografía protagonista:** Inter para UI + Source Serif para landing copy
- **Paleta:** neutros + 1 accent (azul Vanguard-style)
- **Espaciado generoso.** Datos densos pero respirando.
- **Mobile-first.** Bogleheads consultan en móvil entre clases/trabajo.

### 6.2 Tone of voice
- Español de España, técnico pero claro
- "Tú" siempre, nunca "usted"
- Sin jerga financiera sin explicación
- Honesto sobre limitaciones (no asesoramos, informamos)

### 6.3 Faceless content alignment
- Tool screenshots are share-worthy (designed for X virality)
- Each analysis page has an "Export image" button
- Open Graph cards auto-generated per ETF page (SEO + social)

---

## 7. Distribution Strategy

### 7.1 Year 1 channels
1. **SEO programático** — 1 página por ETF popular (50+ páginas), comparativas ("VWCE vs CSPX")
2. **Twitter/X bilingüe** — análisis diario, build-in-public, hilos comparativos
3. **TikTok/Reels faceless** — análisis ETFs, errores comunes, "1-minute insights"
4. **Comunidad Reddit/Bogleheads.es** — value-first contributions (90/10 rule)
5. **Podcast circuit** — pitch a Itnig, Roberto Vivancos, Café del Becario (mes 4+)
6. **Product Hunt + IndieHackers** launch combinado mes 5

### 7.2 Faceless content angles
- "Analicé 1000 carteras de Bogleheads y este es el error #1"
- "Comparativa de costes: VWCE vs CSPX vs IWDA"
- "Cómo optimizar tu IRPF si tienes ETFs de acumulación vs distribución"

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **Regulatory:** confused as financial advisor | Clear disclaimer everywhere: "Información, no asesoramiento". CNMV doesn't regulate education |
| **Yahoo Finance API changes** | Wrap in single module, ready to swap for Alpha Vantage / Finnhub / Polygon |
| **AI hallucination on tax math** | Tax math is deterministic (lib/irpf.ts), AI only narrates. Never let AI compute |
| **NotebookLM as competitor** | Differentiated by Spanish-specific tax, FIRE calc, broker-specific UX, community |
| **No audience = no users** | Audience-building is core to roadmap, NOT afterthought |
| **Burnout** | Faceless content batched, AI-assisted dev. Sustainable cadence |

---

## 9. Success Metrics

### MVP Launch (target: 2 weeks build)
- Tool deployed and functional
- Can analyze a portfolio with 5 positions in <30s
- All key analyses (allocation, geo, sector, FIRE) working
- Mobile-responsive
- Lighthouse score >90

### Month 1 Post-Launch
- 100+ portfolios analyzed
- 50+ X followers
- Listed on Indiehackers + 1 Reddit post valued

### Month 6
- 2000+ active users
- 5k X followers
- Featured in 1 Spanish tech podcast
- Pro features built (kept free until 18)

### Month 12 (cumpleaños 18)
- 5-15k users
- Email list 3-5k
- Pro launch with 3-5% conversion target

---

## 10. Decision Log

| Decision | Resolved |
|----------|----------|
| Domain | Passive investing (Bogleheads) — chosen over stock picking, crypto, etc. |
| Geography | Spain primary, LATAM expansion in year 2 |
| Monetization Y1 | NONE — 100% free until 18th birthday |
| Tech stack | Reuse EstudiaAI patterns (Next.js + Groq + Vercel) |
| Data input | Manual entry MVP, PDF parser phase 2 |
| Branding name | BogleHub (provisional, can change) |
| State persistence | localStorage MVP, Supabase from phase 2 |
| Auth | None in MVP, magic link via Supabase later |

---

**End of design spec.**

Next step: writing-plans skill to create the MVP implementation plan.
