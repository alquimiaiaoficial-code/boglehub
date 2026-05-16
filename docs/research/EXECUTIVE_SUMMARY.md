# EXECUTIVE SUMMARY — Market Domination de BogleHub

> Síntesis ejecutiva de 6 agentes de investigación. Acciones priorizadas para llevar BogleHub a #1 del mercado hispano de herramientas para inversores indexados.

**Fecha:** 14 mayo 2026
**Autoría:** Subagent-driven research (6 agentes paralelos)
**Estado:** Pre-ejecución de mejoras

---

## 1. Top 3 oportunidades accionables

### 🥇 #1 — Monte Carlo retirement + UCITS + UI español + IRPF
**Hueco azul.** No existe ninguna herramienta que combine los 4. Curvo se acerca pero está en holandés/inglés. JustETF tiene UCITS pero UI dated y sin Monte Carlo. Portfolio Visualizer tiene Monte Carlo pero datos US. Indexa lo esconde tras paywall y gestión.

**Implementación:** Calculadora Monte Carlo con `/calculadora/retiro-monte-carlo`, basada en datos de mercado UCITS, con explicación IRPF de las distintas tasas de extracción. Es nuestra **bandera diferencial #1**.

### 🥈 #2 — Páginas programáticas SEO (80.000+ impresiones/mes)
5 templates programáticas generan ~325 páginas auto-rankeables:
- `/etf/[ticker]` × 100 ETFs
- `/comparar/[a]-vs-[b]` × 50 pares
- `/calculadora/[type]` × 7 calculadoras
- `/broker/[name]` × 15 brokers
- `/glosario/[term]` × 80 términos

**Quick wins (competencia 2/10):** "Trade Republic modelo 720", "pluriempleo ETFs declaración", "domicilio fiscal ETF Irlanda". Sin contenido competidor decente en español.

### 🥉 #3 — Comunidad propia + snapshots (moat híbrido)
Compartir cartera vía URL pública + snapshots automáticos en localStorage. Crea network effect (gente comparte sus carteras anonimizadas) + switching cost (datos acumulados).

---

## 2. Top 5 features a robar de competencia

| Feature | De quién | Por qué |
|---------|----------|---------|
| **Portfolio X-Ray overlap** | Morningstar | Detectar solapamiento entre ETFs (VWCE + CSPX = 65% overlap). Killer feature ausente en español |
| **Monte Carlo retirement** | Portfolio Visualizer | Distribuciones de resultados, no proyección lineal |
| **Calendar heat map de retornos** | PortfolioCharts | Visualización superior a líneas tradicionales |
| **Natural language ETF search** | Magnifi | "ETFs con baja TER y exposición Asia" → resultados |
| **Savings plan simulator** | JustETF | Pero adaptado a brokers ES (Indexa, MyInvestor, Trade Republic) |

---

## 3. Top 3 anti-patterns a evitar

1. **Star ratings de ETFs** (estilo Morningstar) — entrena performance-chasing, antitético a la filosofía Boglehead
2. **UI tabla-densa por defecto** (estilo JustETF) — pierde a inversores nuevos
3. **Paywall en feature core** — envía usuarios a la competencia gratuita

---

## 4. Posicionamiento ganador

### Positioning statement (una frase)

> **"La única herramienta de análisis de cartera hecha PARA España: contexto fiscal IRPF, ETFs UCITS, comunidad imparcial y sin coger ni un euro de tu cartera. Gratis."**

### Mensaje en hero (refresh)

Antes: *"Tu cartera de fondos indexados, analizada con IA en segundos"*
Después: *"Análisis de cartera con contexto fiscal español. Sin gestionarte el dinero. Sin tarjeta. Sin compromiso."*

---

## 5. ICP prioritario Year 1

### Profesional joven 25-35 (ICP 9/10)

- **Quién:** español, 28 años, ingeniero/consultor/marketing, gana 30-50k bruto, primera vez con ahorros serios (10-50k), miedo a equivocarse
- **Mercado:** ~350k-500k personas en España
- **Pain:** parálisis por análisis (¿AMUNDI vs iShares?), fiscalidad confusa, no quiere asesor pero no se fía de robos
- **Where:** X tech ESP, podcasts (Itnig, Kapital, Pasivamente Hablando), Reddit r/SpainFIRE
- **JTBD:** *"Cuando tengo ahorros serios por primera vez, quiero saber si mi cartera tiene sentido, para no perder años por una decisión inicial mala"*
- **Hook content:** "Cómo elegir tu primer ETF en 2026 si trabajas por cuenta ajena"

**Secundarios Y1:**
- Universitario 18-25 (acquisition engine)
- Mujeres inversoras 25-50 (diferenciación de tono)

---

## 6. Ángulo de contenido viral master

> **"Te explico por qué tu cartera de Indexa Capital es peor de lo que crees (y cómo replicarla por 0,2% en vez de 0,65%)"**

Variantes para 30 días de contenido:
- "Costes ocultos que tu robo no te enseña"
- "Compara dos carteras de Indexa: las dos cobran 0,65% por hacer 5 ETFs"
- "Análisis cartera media de Boglehead español 2026"
- "Lo que cambia entre VWCE y CSPX en 10.000€ al año"
- Series "Tu cartera mejorada en 60 segundos"

---

## 7. Plan de ejecución inmediato (próximas horas)

### Phase 3A — Features producto

1. **Compound interest calculator** `/calculadora/interes-compuesto` (2.200 búsquedas/mes)
2. **Monte Carlo FIRE projection** `/calculadora/fire-monte-carlo` (nuestra bandera)
3. **Portfolio overlap analyzer** (X-ray entre ETFs)
4. **Comparador ETFs** `/comparar/[a]-vs-[b]` (pairwise)
5. **Página por ETF** `/etf/[ticker]` (100 ETFs base)
6. **Share portfolio** (URL pública con snapshot anonimizado)
7. **Snapshots history** (auto-save mensual)

### Phase 3B — SEO técnico

1. `app/sitemap.ts` dinámico
2. `app/robots.ts`
3. OpenGraph metadata por ruta (con `@vercel/og`)
4. Schema.org: Organization, WebApplication, FAQPage
5. Internal linking strategy

### Phase 3C — Contenido evergreen (5 artículos blog)

1. "Cómo elegir tu primer ETF en España: guía 2026"
2. "VWCE vs CSPX vs IWDA: comparativa exhaustiva"
3. "Fiscalidad de ETFs en España: la guía que tu broker no te da"
4. "FIRE en España: cuánto necesitas realmente"
5. "Bogleheads España: guía completa para empezar"

### Phase 3D — Plantillas marketing

1. 10 hilos X listos para publicar
2. 15 guiones TikTok/Reels faceless (60-90 seg)
3. 30 días de calendario editorial
4. Welcome email sequence (5 emails)

### Phase 3E — Infraestructura adquisición

1. Newsletter signup (Resend free tier + Vercel function)
2. Analytics privacy-friendly (Vercel Analytics built-in)
3. Página `/metodologia` con fórmulas transparentes

---

## 8. Métricas de éxito Mes 1 post-implementación

| Métrica | Antes | Objetivo M1 | Objetivo M6 |
|---------|-------|-------------|-------------|
| Rutas en producción | 11 | 35+ | 200+ |
| Páginas SEO indexadas | 0 | 30 | 100 |
| Quick wins ranking top-10 | 0 | 3 | 15 |
| Newsletter subs | 0 | 50 | 1.000 |
| X followers | 0 | 200 | 3.000 |
| Análisis realizados | ~5 | 200 | 5.000 |
| Carteras compartidas | 0 | 20 | 500 |

---

## 9. Riesgos identificados

| Riesgo | Mitigación |
|--------|------------|
| Indexa lanza herramienta similar gratis | Ya tenemos ventaja first-mover + nuestra UX es superior + no estamos atados a gestionar dinero |
| JustETF añade IRPF context | Su UI dated les frena. Ataque rápido con contenido vertical fiscal |
| NotebookLM mejora con datos financieros | Diferenciador: tools interactivas + comunidad + contexto local |
| Limitación legal por menor edad | Disclaimer + páginas legales ya cubren. Operativa sin contratos |

---

## 10. Decisiones tomadas

- ✅ Foco ICP: **profesional joven 25-35**
- ✅ Diferencial: **fiscalidad española + UI moderna + transparencia metodológica**
- ✅ Estrategia contenido: **SEO programático + viral faceless**
- ✅ Canales M1: **Reddit (r/SpainFIRE) + X bilingüe**
- ✅ Canales M2: **TikTok Shorts + Newsletter Beehiiv/Resend**
- ✅ Canales M3: **SEO programático ya con tráfico + pitch podcasts**
- ✅ Moat prioritario: **Switching costs (snapshots) + Content (SEO) + Trust (metodología pública)**

---

**Próxima acción:** Phase 3 ejecución — dispatch de subagentes para implementar features, contenido y SEO simultáneamente.
