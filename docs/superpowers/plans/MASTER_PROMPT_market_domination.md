# PROMPT MAESTRO — MARKET DOMINATION DE BOGLEHUB

> **Tipo:** Multi-agent orchestration prompt.
> **Objetivo:** Llevar BogleHub al #1 del mercado hispano de herramientas para inversores indexados mediante investigación exhaustiva del mercado y aplicación inmediata de mejoras.
> **Modo de ejecución:** Self-contained — un agente puede recoger este documento y ejecutarlo sin contexto previo.
> **Skills obligatorias a activar:**
> - `find-skills` (descubrir capacidades necesarias)
> - `brainstorming` (refinar intent)
> - `writing-plans` (estructurar el roadmap derivado)
> - `subagent-driven-development` (ejecución paralela)
> - `viral-content-predictor` (validar ángulos de contenido)
> - `ai-social-media-content` (generar plantillas faceless)
> - `test-driven-development` (cualquier código nuevo)
> - `verification-before-completion` (gate final)
> - `requesting-code-review` (calidad)
> - `dispatching-parallel-agents` (eficiencia de investigación)

---

## 0. ROL

Eres un **Chief Strategy Officer + Lead Engineer + Growth Hacker** trabajando para BogleHub, una herramienta web gratuita de análisis de carteras de fondos indexados con IA, dirigida al mercado hispano (España + LATAM). El founder es un emprendedor de 17 años que quiere construir una marca referente en su nicho durante el próximo año antes de monetizar.

Tu misión es **transformar BogleHub de MVP recién lanzado a líder reconocido del mercado** en su segmento. Combina rigor analítico (research), excelencia técnica (código) y astucia comercial (posicionamiento + audiencia).

---

## 1. MISIÓN PRINCIPAL

Investigar exhaustivamente el mercado hispano de herramientas para inversores pasivos (Bogleheads), identificar TODA la competencia directa e indirecta, mapear oportunidades, y **aplicar mejoras inmediatas al producto + plan de contenido** para que BogleHub se posicione como #1 en su segmento.

**No es una tarea de planificación, es de ejecución.** Cada hallazgo de research debe traducirse en código aplicado o contenido producido.

---

## 2. CONTEXTO ACTUAL DE BOGLEHUB

### Producto

- **URL:** https://boglehub.vercel.app
- **Stack:** Next.js 15 + TypeScript + Tailwind v4 (dark theme) + Groq Llama 3.3 70B + Yahoo Finance + Recharts
- **Repo:** github.com/alquimiaiaoficial-code/boglehub
- **Estado:** 11 rutas en producción
- **Coste operativo:** 0€/mes

### Funcionalidades actuales

1. **Analizador de cartera:** introduces posiciones (manual o PDF) → IA genera análisis de asignación, geografía, sectores, costes, FIRE
2. **Chat IA:** chat libre con streaming, system prompt en español lean a finanzas
3. **PDF parser:** detecta ISINs de extractos Trade Republic / DEGIRO / MyInvestor / ING
4. **Páginas legales:** Aviso legal, Privacidad (RGPD), Términos
5. **Dark theme premium** estilo Linear/Vercel

### Limitaciones conocidas

- **0 usuarios reales** (recién lanzado, sin marketing)
- **0 SEO** (no hay backlinks, no hay contenido evergreen)
- **0 audiencia** (cuentas sociales sin crear)
- **PDF parser básico** (solo detecta ISINs, no precios)
- **Sin auth ni cuentas** (todo en localStorage)
- **Sin monetización** (founder es menor, será post-18º)

### Constraints

- ✅ **Faceless content only** (no on-camera marketing)
- ✅ **Menor de edad:** no contratos, no Stripe directo, no facturación
- ✅ **Solo founder + IA:** no team, todo orquestado por agentes
- ✅ **Presupuesto = 0€**
- ✅ **Timeframe:** 1 año para construir tracción antes de monetizar

---

## 3. ENTREGABLES OBLIGATORIOS

Al terminar la ejecución de este prompt, debe existir:

### A. Investigación documentada
1. `docs/research/competitors-direct.md` — Análisis de competidores directos (Spanish-speaking ETF tools)
2. `docs/research/competitors-indirect.md` — Análisis de competidores indirectos (Indexa, Wuolah, etc.)
3. `docs/research/customer-segments.md` — Mapa de segmentos de usuario, dolores, jobs-to-be-done
4. `docs/research/content-gaps.md` — Keywords sin competencia, ángulos virales no explotados
5. `docs/research/feature-matrix.md` — Comparativa exhaustiva BogleHub vs cada competidor
6. `docs/research/positioning.md` — Estrategia de posicionamiento ganadora
7. `docs/research/distribution-channels.md` — Mapa de canales accesibles con presupuesto 0
8. `docs/research/EXECUTIVE_SUMMARY.md` — Síntesis ejecutiva accionable

### B. Mejoras de producto aplicadas
1. Refactor/adición de **al menos 5 features concretas** que superen a la competencia
2. Optimizaciones SEO técnicas en código (metadata, OG, sitemap, robots.txt)
3. Páginas programáticas SEO (mínimo 20 páginas comparativas/educativas)
4. Mejoras UX detectadas (microcopy, micro-interacciones, accesibilidad)

### C. Contenido producido
1. `content/social/X-thread-templates/` — 10 hilos de X listos para publicar
2. `content/social/tiktok-scripts/` — 15 guiones para TikTok/Reels faceless
3. `content/blog/` — 5 artículos largo formato SEO listos
4. `content/email/welcome-sequence.md` — Email sequence onboarding (5 emails)

### D. Infraestructura de adquisición
1. Setup `sitemap.xml` y `robots.txt` optimizados
2. Setup OpenGraph dinámico por ruta
3. Tracking analytics privacy-friendly (Plausible/Umami self-hosted o Vercel Analytics)
4. Newsletter signup form (con captura de email — backend simple)

---

## 4. FASES DE EJECUCIÓN

### FASE 1 — RECONNAISSANCE (Research masivo en paralelo)

**Dispatch 6 agentes en paralelo** con estos mandatos específicos:

#### Agente 1 — Competidores directos en español
Investiga TODAS las herramientas/apps/webs en español dirigidas a inversores indexados. Categorías:
- Tools de análisis de cartera (BogleHub clones / similares)
- Robo-advisors españoles (Indexa Capital, Finizens, MyInvestor Robo, inbestMe, Finanbest, Popcoin)
- Comunidades Boglehead hispanas (forobogleheads.es, foro Rankia, Reddit r/SpainFIRE, Reddit r/dineroespana, Telegram, Discords)
- Apps fintech con módulo de carteras (Trade Republic, etoro, Revolut)
- YouTubers/blogs prominentes en el nicho (Gregorio Hernández, Carlos Galán, ResetEconomico, Tu Dinero Nunca Duerme, El Estoico, Inversionista Inteligente)

Para cada uno: URL, modelo de negocio, audiencia estimada, fortalezas, debilidades, qué NO ofrecen.

#### Agente 2 — Competidores globales relevantes
Investiga players globales que podrían entrar al mercado hispano o que los Bogleheads usan ya en inglés:
- Simply Wall St, Morningstar, Yahoo Finance Premium, Stockanalysis.com
- Portfolio Visualizer, PortfolioCharts, Range, Origin Financial
- NotebookLM aplicado a finanzas
- AI-native tools recientes (Pomelo, Lendle, etc.)

Para cada uno: features clave, pricing, USP, qué podemos copiar/mejorar.

#### Agente 3 — Segmentación de cliente
Mapa exhaustivo de segmentos de inversor pasivo hispano:
- Bachilleratos/universitarios que empiezan
- Profesionales 25-40 con primer trabajo
- Padres planificando ahorro hijos
- Pre-jubilados optimizando
- Mujeres inversoras (segmento creciente)
- Migrantes LATAM en España

Para cada segmento: tamaño, dolor principal, donde están online, qué tipo de contenido consumen, ticket price aceptable.

#### Agente 4 — Content gaps + keywords SEO
Identifica:
- Keywords con volumen pero poca competencia ("VWCE vs CSPX", "mejor ETF mundial 2026", "FIRE España calculadora")
- Preguntas sin respuesta buena en español sobre indexación
- Topics que la competencia ignora (impuestos detallados, traspasos, fiscalidad por CCAA, fondos vs ETFs, etc.)
- Formatos virales en español que funcionan en este nicho

Salida: lista de 50+ keywords + 30+ topics + 15 ángulos virales.

#### Agente 5 — Canales de distribución sin presupuesto
Audita exhaustivamente dónde un solo fundador puede ganar audiencia gratis:
- X (Twitter) bilingüe — qué cuentas seguir, qué patrones funcionan
- TikTok/Reels finanzas en español — fórmulas faceless probadas
- YouTube Shorts vs long-form
- Newsletters (Beehiiv, Substack) — quiénes lideran y sus tácticas
- Comunidades (Rankia, Wallapop foros, Reddit, Telegram, Discord)
- Podcasts españoles de fintech para pitch
- LinkedIn (sí, también)
- Media tech española (Hipertextual, Xataka, El Referente)
- Universitarios — alcance gratis vía clubes de inversión

Para cada canal: cómo entrar, qué publicar, cadencia realista, ejemplos exitosos.

#### Agente 6 — Estrategia de moat (defensibilidad)
Analiza qué hace defensible a una herramienta financiera gratuita:
- Network effects (cómo crear comunidad)
- Datos propios (qué datos podríamos capturar éticamente)
- Marca (cómo construir reputación)
- Switching costs (cómo hacer que sea doloroso irse)
- Integración con el workflow del usuario
- Open data initiatives

**Cada agente devuelve un .md documento con sus hallazgos en `docs/research/agent-N/`.**

---

### FASE 2 — SYNTHESIS

Tras recibir los 6 reports, crea el **`EXECUTIVE_SUMMARY.md`** que responde:

1. **¿Qué dice el mercado que sea oportunidad clara?** Top 3 huecos accionables.
2. **¿Qué hace mejor cada competidor que NOSOTROS NO?** Lista priorizada por impacto.
3. **¿Qué podemos hacer MEJOR que TODOS?** Diferencial ganador.
4. **¿Cómo nos posicionamos?** Una frase de posicionamiento (positioning statement).
5. **¿Cuál es nuestro ICP (Ideal Customer Profile) prioritario?** Un perfil específico.
6. **¿Cuál es el ángulo de contenido viral más prometedor?** El que pivota todo nuestro marketing.

---

### FASE 3 — EXECUTION (Mejoras inmediatas)

Genera plan derivado en `docs/superpowers/plans/2026-05-14-market-domination-execution.md` y **ejecútalo** vía subagent-driven-development. Cubre:

#### 3.1 — Features de producto nuevas (mínimo 5)

Selecciona las 5+ features que más cierran el gap competitivo. Ejemplos posibles (a decidir según research):
- Comparador de ETFs (input 2-4 tickers → tabla diff)
- Backtest histórico de carteras (uso de datos públicos OECD/Bundesbank)
- Optimizador fiscal IRPF (qué vender antes de fin de año)
- Multi-cartera (varias carteras guardadas)
- Email digest semanal automático
- Importador de Trade Republic mejorado (con cantidad y precio reales del PDF)
- Página por ETF (`/etf/[ticker]`) con datos + IA + similares
- Calculadora de aportaciones DCA óptimas

#### 3.2 — SEO técnico

- `app/sitemap.ts` dinámico
- `app/robots.ts`
- OpenGraph metadata por ruta (imagen dinámica con `@vercel/og`)
- Schema.org markup (Organization, WebApplication, FAQPage)
- Páginas programáticas: `/etf/[ticker]`, `/comparar/[ticker1]-vs-[ticker2]`, `/calculadora/[type]`
- Internal linking strategy

#### 3.3 — Contenido evergreen

5 artículos blog largo formato (`/blog/[slug]`):
- "Cómo elegir tu primer ETF en España: guía definitiva 2026"
- "VWCE vs CSPX vs IWDA: comparativa exhaustiva"
- "Fiscalidad de ETFs en España: todo lo que tu broker no te dice"
- "FIRE en España: cuánto necesitas realmente y cómo llegar"
- "Bogleheads España: la guía completa que no encuentras en ningún sitio"

Cada artículo: 2000+ palabras, optimizado para keyword principal + 5 long-tail, con CTAs internos a `/analyzer` y `/chat`.

#### 3.4 — Plantillas de contenido social

- 10 hilos X (con hooks probados)
- 15 guiones TikTok/Reels (60-90 seg, faceless, fórmula AIDA o problema→solución)
- 30 días de calendario editorial

#### 3.5 — Sistema de captura

- Newsletter signup en footer + post-análisis
- Backend simple: Vercel function que escribe a una BD ligera (Neon free tier, Supabase free, o incluso Google Sheets API)
- Welcome email sequence (5 emails, automatizables con Resend free tier)

#### 3.6 — Analytics privacy-friendly

- Vercel Analytics (built-in, gratis) o Umami self-hosted
- Eventos custom: análisis realizado, chat usado, PDF subido, etc.
- Dashboard simple para founder

#### 3.7 — Polish UX

- Microcopy mejorada (basada en mejores prácticas de Linear/Stripe)
- Loading skeletons donde haya delay
- Empty states más cálidos
- Error states accionables
- Toast notifications (react-hot-toast o sonner)
- Atajos de teclado documentados
- Modo "compartir resultado" (open graph dinámico con imagen del análisis)

---

### FASE 4 — VALIDATION

Antes de declarar terminado:

1. **`verification-before-completion`** check completo
2. Lighthouse score > 95 en todas las rutas estáticas
3. Tests E2E para flujos críticos
4. Manual smoke test de cada nueva feature
5. SEO audit (PageSpeed Insights + manual)

---

## 5. CRITERIOS DE ÉXITO

Al terminar este prompt, la web debe haber pasado de:

| Métrica | Antes | Después (objetivo) |
|---------|-------|---------------------|
| Páginas en producción | 11 | 35+ (con programáticas) |
| Features distintivas | 4 (analyzer, chat, PDF, FIRE) | 9+ |
| Contenido evergreen | 0 | 5 artículos |
| Plantillas marketing | 0 | 25+ piezas |
| SEO infrastructure | 0 | Sitemap + robots + OG dinámico |
| Newsletter capture | No | Sí, funcional |
| Analytics | No | Sí, privacy-friendly |
| Comparativa vs competidores | Vaga | Documentada y aplicada |
| Posicionamiento | Genérico | Definido y aplicado en copy |

---

## 6. REGLAS NO NEGOCIABLES

1. **Cero placeholders.** Cualquier "TODO" o "PLACEHOLDER" en código o contenido es fracaso.
2. **Cero lorem ipsum.** Todo el contenido producido es real, útil, en español de España, listo para publicar.
3. **Faceless siempre.** Ningún elemento de marketing requiere mostrar la cara del fundador.
4. **Calidad sobre cantidad.** Mejor 3 features pulidas que 10 mediocres.
5. **Mobile-first.** Cada nueva pantalla funciona impecable en 375px.
6. **Accesibilidad AA mínimo.** Contrastes, keyboard nav, screen readers.
7. **TDD para lógica.** Funciones puras = tests primero.
8. **Atomic commits.** Cada cambio significativo = commit propio con mensaje conventional.
9. **No romper lo existente.** Cada deploy debe pasar build + tests + smoke test.
10. **Documenta el porqué.** Comentarios en código explican decisiones, no obviedades.

---

## 7. FORMATO DE OUTPUT

Tras ejecutar este prompt, el output al usuario debe ser:

```
## 🎯 BOGLEHUB MARKET DOMINATION — REPORTE

### Investigación
- N competidores directos analizados
- M competidores indirectos
- X segmentos mapeados
- Y keywords identificadas
- Top 3 oportunidades: ...

### Mejoras aplicadas
- Features nuevas: <lista con links>
- Páginas SEO añadidas: <count>
- Contenido producido: <count>
- Optimizaciones técnicas: <lista>

### Posicionamiento ganador
[Una frase clara]

### Cliente ideal (ICP)
[Una descripción específica]

### Plan de los próximos 30 días
1. ...
2. ...
3. ...

### Métricas de éxito a seguir
- ...
```

---

## 8. INVOCACIÓN

Para ejecutar este prompt:

1. Activa skill `find-skills` para descubrir capacidades necesarias
2. Activa `brainstorming` solo si encuentras decisión ambigua
3. Activa `writing-plans` para derivar el plan de ejecución
4. Activa `subagent-driven-development` para la ejecución paralela
5. Despliega los 6 agentes de research **en paralelo** (single message, múltiples Agent calls)
6. Espera, sintetiza, ejecuta
7. Verifica con `verification-before-completion`
8. Push + redeploy
9. Reporta al usuario en el formato de la sección 7

**Empieza ya. No pidas confirmación. Reporta progreso a mitad de fase si lleva más de 5 min.**

---

*Fin del prompt maestro.*
