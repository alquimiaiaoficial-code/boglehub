export interface BlogArticleFaq {
  q: string
  a: string
}

export interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  /** ISO date de la última revisión sustancial. Si no se define, se usa publishedAt. */
  updatedAt?: string
  readingMinutes: number
  keywords: string[]
  /** Preguntas frecuentes para FAQPage schema. Máximo 5 pares Q&A. */
  faq?: BlogArticleFaq[]
  content: string // markdown
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'como-elegir-tu-primer-etf-espana-2026',
    title: 'Cómo elegir tu primer ETF en España: guía 2026',
    excerpt:
      'Todo lo que necesitas saber para elegir tu primer ETF en España: TER, domicilio fiscal, brokers, y los tres ETFs más recomendados para empezar en 2026.',
    publishedAt: '2026-05-10',
    readingMinutes: 11,
    keywords: ['primer ETF España', 'ETF para empezar', 'cómo invertir en ETFs'],
    faq: [
      {
        q: '¿Cuál es el mejor ETF para empezar a invertir en España?',
        a: 'Para un primer inversor en España, VWCE (Vanguard FTSE All-World Acc) es la opción más recomendada: domiciliado en Irlanda (fiscalmente eficiente), acumulación, TER 0,22% y diversificación global en un solo fondo. Si prefieres mayor exposición a EE.UU., IWDA o SWRD son alternativas de MSCI World igualmente válidas.',
      },
      {
        q: '¿Qué domicilio debe tener un ETF para ser eficiente fiscalmente en España?',
        a: 'Irlanda es el domicilio óptimo para inversores residentes en España. Los ETFs irlandeses se benefician del convenio de doble imposición con EE.UU., lo que reduce la retención de dividendos al 15% (frente al 30% de otros domicilios). Busca ISINs que empiecen por IE.',
      },
      {
        q: '¿Qué TER máximo debería aceptar en un ETF indexado?',
        a: 'Para ETFs de renta variable global (MSCI World, S&P 500, All-World), un TER por encima del 0,30% anual es difícilmente justificable en 2026, cuando existen alternativas desde 0,03% (SPXS) hasta 0,22% (VWCE). Para renta fija o emergentes, un TER hasta 0,25% es razonable.',
      },
      {
        q: '¿Es mejor un ETF de acumulación o de distribución para empezar?',
        a: 'Para la mayoría de inversores en fase de ahorro, acumulación es más eficiente fiscalmente: los dividendos se reinvierten automáticamente sin tributar. Solo conviene distribución si necesitas ingresos periódicos sin vender participaciones (fase de retiro o FIRE).',
      },
    ],
    content: `# Cómo elegir tu primer ETF en España: guía 2026

Empezar a invertir en ETFs puede parecer sencillo: abres un broker, buscas un ticker y pulsas comprar. Pero si te sales del camino correcto desde el principio — por elegir el domicilio fiscal equivocado, un TER demasiado alto o un broker con comisiones ocultas —, el coste compuesto de ese error te perseguirá décadas.

Esta guía te lleva paso a paso por los cuatro criterios que importan, los tres brokers más usados en España y los tres ETFs más recomendados para comenzar. Al final, sabrás exactamente qué comprar y dónde.

---

## ¿Por qué ETFs y no fondos indexados?

La pregunta más frecuente entre nuevos inversores es si conviene un ETF o un fondo indexado tipo Amundi Prime Global o Vanguard Global Stock. Ambos son vehículos válidos dentro de la filosofía Boglehead, pero tienen diferencias prácticas relevantes para el inversor español:

**Fondos indexados**
- Traspaso entre fondos sin tributar (ventaja fiscal clave en España)
- Suscripción a precio de cierre del día (sin spread de mercado)
- Mínimos bajos o nulos (MyInvestor permite desde 1 €)
- No se pueden comprar en brokers como DEGIRO

**ETFs**
- Compra y venta en bolsa como una acción (precio en tiempo real)
- Mayor liquidez y transparencia de precio
- Disponibles en cualquier broker con acceso a bolsa europea
- Las plusvalías tributan al vender (no hay traspaso fiscal libre)
- Suelen tener TER igual o inferior al fondo equivalente

Para un primer inversor sin cartera consolidada, la diferencia principal es **la fiscalidad en el traspaso**. Si planeas no tocar el dinero durante décadas y solo usas un broker como Trade Republic o DEGIRO, el ETF es perfectamente válido. Si usas MyInvestor y quieres reasignar sin tributar, un fondo indexado Vanguard puede ser más eficiente.

En esta guía nos centramos en ETFs porque son universales, baratos y los encontrarás en cualquier broker europeo.

---

## Los 4 criterios clave para elegir un ETF

### 1. TER (Total Expense Ratio)

El TER es el coste anual del fondo expresado como porcentaje del patrimonio. Un TER del 0,20 % sobre 10 000 € cuesta 20 € al año. Pequeño, pero el efecto compuesto importa:

| TER | Coste en 30 años sobre 100 000 € |
|-----|----------------------------------|
| 0,07 % | ~2 100 € |
| 0,20 % | ~6 000 € |
| 0,75 % | ~22 000 € |
| 1,50 % | ~43 000 € |

Para ETFs de renta variable global, busca **TER ≤ 0,20 %**. Para renta fija, ≤ 0,10 % es razonable. Los ETFs de mercados emergentes suelen costar algo más (0,14–0,22 %).

### 2. Domicilio fiscal (Irlanda vs Luxemburgo)

El domicilio del ETF determina la retención en origen sobre dividendos. La diferencia es técnica pero el impacto económico es real:

- **ETFs domiciliados en Irlanda** (UCITS IE): El convenio fiscal Irlanda–EE. UU. reduce la retención sobre dividendos de acciones estadounidenses del 30 % al 15 %. Para un ETF global donde el 60–65 % son empresas americanas, esto es significativo.
- **ETFs domiciliados en Luxemburgo** (UCITS LU): Retención en origen del 30 % sobre dividendos de acciones americanas. Fiscalmente menos eficiente.

**Conclusión práctica**: cuando exista la opción, elige ETFs domiciliados en Irlanda. El ISIN de los ETFs irlandeses empieza por "IE". Por ejemplo, el VWCE (Vanguard FTSE All-World) tiene ISIN IE00B3RBWM25.

### 3. Método de replicación

Los ETFs replican su índice de tres formas:

- **Replicación física total**: el fondo compra literalmente todas las acciones del índice. Alta transparencia. Ejemplo: VWCE (más de 3 500 valores).
- **Replicación física por muestreo**: compra una muestra representativa. Útil para índices con miles de valores pequeños e ilíquidos. Ejemplo: IWDA (MSCI World).
- **Replicación sintética (swap)**: usa derivados para replicar el retorno. Puede ser más eficiente en ciertos mercados pero introduce riesgo de contraparte.

Para un inversor Boglehead que empieza, **replicación física** (total o por muestreo) es la opción más sencilla y transparente.

### 4. Política de distribución: acumulación vs distribución

- **ETFs de acumulación (Acc)**: reinvierten automáticamente los dividendos. No hay evento fiscal hasta que vendas. Ideales para crecimiento a largo plazo.
- **ETFs de distribución (Dist)**: reparten dividendos periódicamente. Cada pago tributa como rendimiento del capital mobiliario en tu IRPF del año.

**Recomendación**: para un inversor largo-placista en España, los ETFs de **acumulación** son más eficientes fiscalmente. Solo considera distribución si necesitas flujo de caja (por ejemplo, en la fase de retiro).

---

## Brokers más usados en España

### Trade Republic

El broker alemán ha conquistado el mercado español con una propuesta clara: **0 € de comisión por orden** y una interfaz mobile-first impecable. Funciona con el sistema de ahorro automático (planes de ahorro mensuales desde 1 €). Custodia segregada. Está regulado por BaFin.

- Ideal para: principiantes, automatización del ahorro
- ETFs disponibles: +2 000, incluyendo VWCE, IWDA, CSPX
- Limitaciones: sin acceso a ciertos ETFs pequeños; interfaz solo web/móvil

### DEGIRO

Broker holandés con mucha historia en Europa. Tarifas muy bajas (0,50–2 € por orden en bolsas principales). Acceso a más de 50 bolsas mundiales. Tiene un programa de ETFs sin comisión (lista cambia mensualmente).

- Ideal para: inversores con carteras más elaboradas, acceso a más productos
- ETFs disponibles: +5 000
- Limitaciones: interfaz más técnica; custodia no siempre segregada (revisa "Custody account")

### MyInvestor

El neobanco español del grupo Andbank es el único que ofrece tanto ETFs como fondos indexados Vanguard, Amundi y otros. Si quieres diversidad de vehículos de inversión bajo un mismo techo, es la mejor opción en España.

- Ideal para: quien mezcle fondos y ETFs; quiera traspaso fiscal entre fondos
- ETFs disponibles: selección de los más populares
- Limitaciones: interfaz menos ágil que Trade Republic; comisiones de ETF ligeras (0,20 € + 0,03 %)

---

## 3 ETFs recomendados para empezar

### 1. VWCE — Vanguard FTSE All-World UCITS ETF (Acc)

| Dato | Valor |
|------|-------|
| ISIN | IE00B3RBWM25 |
| Ticker | VWCE |
| TER | 0,22 % |
| Holdings | ~3 600 |
| Índice | FTSE All-World |
| Domicilio | Irlanda |
| Distribución | Acumulación |

**Por qué es el favorito para empezar**: el VWCE incluye tanto países desarrollados como emergentes en una sola posición. Con un TER de 0,22 % y más de 3 600 empresas de 50 países, es la definición de diversificación global. Si solo puedes tener un ETF en tu vida, este es el candidato.

La exposición aproximada es: 60 % EE. UU., 15 % Europa desarrollada, 12 % Asia-Pacífico, 12 % mercados emergentes. El peso de EE. UU. refleja la capitalización real de mercado global.

**Disponible en**: Trade Republic, DEGIRO, MyInvestor.

### 2. IWDA — iShares Core MSCI World UCITS ETF (Acc)

| Dato | Valor |
|------|-------|
| ISIN | IE00B4L5Y983 |
| Ticker | IWDA |
| TER | 0,20 % |
| Holdings | ~1 400 |
| Índice | MSCI World |
| Domicilio | Irlanda |
| Distribución | Acumulación |

**Por qué es una gran alternativa**: el IWDA sigue el MSCI World, que cubre solo países desarrollados (~23 países). No incluye mercados emergentes. TER ligeramente inferior al VWCE (0,20 % vs 0,22 %). Es ideal si prefieres limitarte a mercados más maduros o si ya tienes exposición a emergentes por otro vehículo.

Nota: muchos inversores combinan IWDA + EMIM (iShares Core MSCI Emerging Markets, TER 0,18 %) para replicar el VWCE con mayor control de pesos.

**Disponible en**: Trade Republic, DEGIRO, MyInvestor.

### 3. AGGH — iShares Core Global Aggregate Bond UCITS ETF (Acc, EUR Hedged)

| Dato | Valor |
|------|-------|
| ISIN | IE00BDBRDM35 |
| Ticker | AGGH |
| TER | 0,10 % |
| Holdings | ~9 800 |
| Índice | Bloomberg Global Agg (EUR hedged) |
| Domicilio | Irlanda |
| Distribución | Acumulación |

**Por qué lo incluimos**: un inversor Boglehead no es solo renta variable. El AGGH te da exposición a ~9 800 bonos globales (gobierno y corporativos, investment grade) con cobertura de divisa a euros. TER muy bajo, 0,10 %. Es el complemento natural de VWCE o IWDA para construir una cartera 80/20 o 70/30 que reduzca volatilidad conforme te acercas a tus objetivos.

**Disponible en**: DEGIRO, Trade Republic.

---

## Errores comunes al elegir el primer ETF

1. **Elegir ETF domiciliado en EE. UU.**: Los ETFs de Vanguard o iShares negociados en NYSE o NASDAQ no son aptos para inversores europeos (restricciones regulatorias MiFID II). Siempre busca UCITS europeos. Recuerda: ISIN que empiece por IE (Irlanda) o LU (Luxemburgo).

2. **Confundir ticker con ISIN**: el mismo ETF puede tener múltiples tickers en distintas bolsas (VWCE en Xetra, VWRP en LSE). Usa el ISIN para identificar unívocamente un fondo.

3. **No fijarse en el spread**: en ETFs poco líquidos, la diferencia entre precio de compra y venta (spread) puede ser de 0,10–0,30 %. Para los ETFs más populares como VWCE e IWDA, el spread en Xetra suele ser < 0,05 %.

4. **Comprar en moneda equivocada**: CSPX cotiza en USD en la LSE y en EUR en Xetra. Si tu broker convierte divisas automáticamente, revisa el coste de conversión. Muchos brokers aplican hasta 0,25–1 % de cambio. Compra siempre en la divisa de tu cuenta cuando sea posible.

5. **Hacer market orders en apertura**: en los primeros y últimos 5 minutos de sesión los spreads se amplían. Usa órdenes límite o espera a que el mercado lleve 15 minutos abierto.

6. **Diversificar demasiado desde el principio**: un inversor con 5 000 € en cartera que compra 8 ETFs distintos no está mejor diversificado que quien tiene uno solo (VWCE ya tiene 3 600 empresas). Más posiciones añaden complejidad sin beneficio real hasta que la cartera sea mayor.

---

## Próximos pasos

Ya tienes los criterios, los brokers y los ETFs. El siguiente paso lógico es construir tu cartera completa y analizarla. ¿Cómo encajan estos ETFs con tu objetivo de libertad financiera? ¿Cuánto tiempo tardarás en alcanzar tu número FIRE?

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).

---

## Fuentes y lecturas complementarias

- [JustETF — Buscador de ETFs UCITS para Europa](https://www.justetf.com/es/) — Compara TER, domicilio y tracking difference de cualquier ETF disponible en bolsas europeas.
- [Vanguard — Página oficial VWCE (IE00BK5BQT80)](https://www.vanguard.co.uk/professional/product/etf/equity/9679/ftse-all-world-ucits-etf-usd-accumulating) — Folleto, costes y composición oficiales del Vanguard FTSE All-World.
- [iShares — Página oficial IWDA](https://www.ishares.com/uk/individual/en/products/251882/ISHARES-MSCI-WORLD-UCITS-ETF) — Datos oficiales del iShares Core MSCI World.
`,
  },
  {
    slug: 'vwce-vs-cspx-vs-iwda',
    title: 'VWCE vs CSPX vs IWDA: comparativa exhaustiva 2026',
    excerpt:
      'Comparativa en profundidad de los tres ETFs más usados por los Bogleheads españoles: VWCE, CSPX e IWDA. TER, holdings, fiscalidad y cuál elegir según tu situación.',
    publishedAt: '2026-05-11',
    readingMinutes: 13,
    keywords: ['VWCE vs CSPX', 'CSPX vs IWDA', 'mejor ETF mundial'],
    faq: [
      {
        q: '¿Cuál es mejor: VWCE, CSPX o IWDA?',
        a: 'Depende de tu estrategia. VWCE es la opción más diversificada (4.000+ empresas, incluye emergentes), ideal para una cartera en un solo ETF. IWDA cubre solo países desarrollados (sin emergentes, TER 0,20%) y CSPX se centra en las 500 mayores empresas de EE.UU. (TER 0,07%). Para un inversor español en fase de acumulación sin posiciones adicionales, VWCE o IWDA+EIMI son los puntos de partida más recomendados.',
      },
      {
        q: '¿Cuánto solapamiento hay entre VWCE, CSPX e IWDA?',
        a: 'CSPX e IWDA tienen un solapamiento muy alto (~85-90%) ya que ambos incluyen las mismas empresas americanas de gran capitalización. VWCE incluye todo lo de IWDA más los mercados emergentes, por lo que el solapamiento entre VWCE e IWDA es también alto (~75-80%). Si tienes tanto CSPX como IWDA en cartera, estás duplicando exposición sin añadir diversificación real.',
      },
      {
        q: '¿Por qué CSPX tiene un TER más bajo que VWCE?',
        a: 'El TER refleja el coste de gestionar el fondo. CSPX cubre solo 500 empresas americanas (simple de replicar), mientras que VWCE cubre más de 4.000 empresas en 50 países (más complejo). VWCE cobra 0,22% frente al 0,07% de CSPX. La diferencia de coste real anual sobre 10.000€ es de apenas 15€ — significativa a largo plazo pero no determinante si VWCE es la opción que mejor encaja en tu estrategia.',
      },
      {
        q: '¿Puedo combinar VWCE y CSPX en la misma cartera?',
        a: 'Técnicamente sí, pero no tiene mucho sentido. Si tienes VWCE, ya incluyes exposición a S&P 500 (EE.UU. representa ~63% del FTSE All-World). Añadir CSPX encima simplemente sobreponderaría EE.UU., que ya es el mayor componente. Si quieres más exposición a EE.UU. que la del mercado global, la forma correcta es usar VWCE + CSPX a porcentajes definidos intencionalmente.',
      },
    ],
    content: `# VWCE vs CSPX vs IWDA: comparativa exhaustiva 2026

Si llevas un tiempo en comunidades de inversores indexados españoles (forobogleheads.es, r/SpainFIRE), te habrás topado con este debate decenas de veces. Tres tickers, tres filosofías ligeramente distintas, y ninguna respuesta universal correcta.

Esta guía desgrana cada ETF en detalle y te da un marco claro para elegir según tu situación concreta.

---

## Resumen ejecutivo

| | VWCE | CSPX | IWDA |
|---|---|---|---|
| Índice | FTSE All-World | S&P 500 | MSCI World |
| TER | 0,22 % | 0,07 % | 0,20 % |
| Holdings | ~3 600 | 503 | ~1 400 |
| Emergentes | Sí (12 %) | No | No |
| Domicilio | Irlanda | Irlanda | Irlanda |
| Divisa base | USD | USD | USD |
| Bolsa principal | Xetra | LSE / Xetra | Xetra |
| Distribución | Acumulación | Acumulación | Acumulación |
| AUM | ~60 000 M€ | ~80 000 M€ | ~95 000 M€ |

Los tres son UCITS domiciliados en Irlanda. Los tres son de acumulación. Los tres están disponibles en Trade Republic, DEGIRO y la mayoría de brokers europeos.

Las diferencias son de **universo de inversión** y **coste**, no de estructura ni fiabilidad.

---

## VWCE: análisis completo

### Ficha técnica

- **Nombre completo**: Vanguard FTSE All-World UCITS ETF (USD) Accumulating
- **ISIN**: IE00B3RBWM25
- **Ticker**: VWCE (Xetra), VWRP (LSE en GBP)
- **TER**: 0,22 %
- **Índice replicado**: FTSE All-World
- **Método de replicación**: Física por muestreo
- **Gestora**: Vanguard
- **AUM**: ~60 000 millones de euros
- **Año de lanzamiento**: 2019 (versión Acc)

### Composición geográfica aproximada (mayo 2026)

| Región | Peso |
|--------|------|
| EE. UU. | 62,5 % |
| Europa desarrollada | 14,0 % |
| Japón | 5,5 % |
| Reino Unido | 3,5 % |
| Asia-Pacífico (ex Japón) | 4,0 % |
| Mercados emergentes | 12,0 % |
| Resto | 1,5 % |

### Lo que lo hace único: los mercados emergentes

El VWCE incluye acciones de China, India, Brasil, Taiwán, Corea del Sur y otros emergentes. Eso supone aproximadamente 400 valores adicionales respecto al IWDA. La tesis: a muy largo plazo, los mercados emergentes deberían capturar una mayor parte del PIB mundial, y no tener esa exposición es una apuesta activa en contra.

**Argumentos a favor de los emergentes en cartera**:
- Mayor potencial de crecimiento a largo plazo (India: +6 % PIB/año proyectado)
- Diversificación real fuera del mundo anglosajón
- A 30 años, la diferencia de valoración (PER más bajo) puede traducirse en mayor retorno

**Argumentos en contra**:
- Mayor volatilidad en periodos de risk-off
- Riesgo regulatorio y político (ejemplo: la intervención china sobre el sector tech en 2021)
- En los últimos 15 años, los emergentes han rendido significativamente por debajo del mundo desarrollado

El VWCE te da ambas caras automáticamente, ponderadas por capitalización. No tienes que decidir: el mercado elige los pesos.

### TER: el único punto débil

El TER del 0,22 % es el más alto de los tres comparados. En una cartera de 100 000 € durante 30 años, ese 0,02 % adicional respecto al IWDA supone aproximadamente 2 000 € de diferencia acumulada (asumiendo 7 % de retorno anual). Significativo pero no decisivo.

---

## CSPX: análisis completo

### Ficha técnica

- **Nombre completo**: iShares Core S&P 500 UCITS ETF (Acc)
- **ISIN**: IE00B5BMR087
- **Ticker**: CSPX (LSE en USD), SXR8 (Xetra en EUR)
- **TER**: 0,07 %
- **Índice replicado**: S&P 500
- **Método de replicación**: Física total
- **Gestora**: BlackRock (iShares)
- **AUM**: ~80 000 millones de euros
- **Año de lanzamiento**: 2010

### Composición geográfica

El S&P 500 es 100 % EE. UU. Las 503 mayores empresas por capitalización cotizadas en bolsas americanas. Los 10 primeros valores (Apple, Microsoft, Nvidia, Amazon, Alphabet, Meta, Berkshire, Tesla, Eli Lilly, JPMorgan) representan aproximadamente el 35 % del índice.

### TER: la gran ventaja

El 0,07 % del CSPX es el TER más bajo que encontrarás en un ETF de esta categoría. Comparado con el VWCE (0,22 %), en 30 años sobre 100 000 € esa diferencia de 0,15 % supone aproximadamente 15 000 € adicionales en cartera (con un retorno del 7 % anual).

### El riesgo de concentración

El S&P 500 es el índice más estudiado del mundo y su historial a largo plazo es impresionante: +10,6 % anual de media desde 1957. Pero hay matices importantes:

1. **Concentración en tecnología**: el sector tecnológico representa ~30 % del S&P 500. Cualquier corrección del sector impacta desproporcionadamente.
2. **Sesgo en EE. UU.**: apostar solo por el S&P 500 es una apuesta activa por la supremacía continuada de la economía americana. ¿Y si en 2040 India o Europa dominan más?
3. **Sesgo de supervivencia en el argumento histórico**: el S&P 500 ha funcionado brillantemente en parte porque EE. UU. ganó el siglo XX. La historia puede no repetirse exactamente.

### ¿Por qué tanta gente lo elige igualmente?

Porque los números son difíciles de ignorar. EE. UU. representa el ~60 % del VWCE y del IWDA de todas formas. El S&P 500 a 10 años ha batido a casi todos los índices globales. Y 0,07 % de TER es simplemente imbatible.

Si eres consciente de la concentración y la aceptas, el CSPX es una opción perfectamente racional.

---

## IWDA: análisis completo

### Ficha técnica

- **Nombre completo**: iShares Core MSCI World UCITS ETF (Acc)
- **ISIN**: IE00B4L5Y983
- **Ticker**: IWDA (Xetra)
- **TER**: 0,20 %
- **Índice replicado**: MSCI World
- **Método de replicación**: Física por muestreo
- **Gestora**: BlackRock (iShares)
- **AUM**: ~95 000 millones de euros (uno de los mayores ETFs del mundo)
- **Año de lanzamiento**: 2009

### Composición geográfica aproximada (mayo 2026)

| Región | Peso |
|--------|------|
| EE. UU. | 70,5 % |
| Japón | 6,5 % |
| Reino Unido | 4,5 % |
| Francia | 3,5 % |
| Canadá | 3,0 % |
| Alemania | 2,5 % |
| Suiza | 2,5 % |
| Otros desarrollados | 7,0 % |

### Sin emergentes: ¿ventaja o limitación?

El [MSCI World](/blog/que-es-el-msci-world) cubre 23 países desarrollados y aproximadamente 1 400 empresas. Al excluir emergentes, elimina el riesgo político y regulatorio de China, la volatilidad de Brasil o la opacidad contable de ciertas empresas rusas (ya excluidas del índice desde 2022, de todas formas).

La contraparte: si India o Indonesia se convierten en las grandes economías del siglo XXI, el IWDA no las capturará hasta que pasen a "desarrollado" según criterios MSCI.

### El combo IWDA + EMIM

Una estrategia popular entre inversores avanzados es [construir el equivalente al VWCE manualmente](/blog/solapamiento-etfs-error-silencioso): 88 % IWDA + 12 % EMIM (iShares Core MSCI Emerging Markets, ISIN IE00BKM4GZ66, TER 0,18 %). El resultado es exposición similar al FTSE All-World con TER ponderado de ~0,20 % (vs 0,22 % del VWCE). La ventaja: control preciso del peso a emergentes.

---

## Tabla comparativa completa

| Criterio | VWCE | CSPX | IWDA |
|----------|------|------|------|
| TER | 0,22 % | 0,07 % | 0,20 % |
| Número de holdings | ~3 600 | ~503 | ~1 400 |
| Geografía | Global total | Solo EE. UU. | Mundo desarrollado |
| Emergentes incluidos | Sí | No | No |
| Domicilio | Irlanda | Irlanda | Irlanda |
| Divisa de cotización | USD/EUR | USD/EUR | EUR |
| AUM | ~60 000 M€ | ~80 000 M€ | ~95 000 M€ |
| Simplicidad | Máxima | Alta | Alta |
| Riesgo de concentración | Bajo | Alto (EE. UU. + tech) | Medio |
| Disponible en TR | Sí | Sí | Sí |
| Disponible en DEGIRO | Sí | Sí | Sí |
| Opción "set and forget" | Ideal | Aceptable | Bueno |

---

## ¿Cuál elegir según tu situación?

### Elige VWCE si...
- Quieres una sola posición que lo cubra todo, incluyendo emergentes
- Valoras la simplicidad por encima del TER óptimo
- Crees que los mercados emergentes tienen potencial a largo plazo
- Eres nuevo inversor y prefieres no pensar en rebalanceos

### Elige CSPX si...
- Priorizas el menor coste posible (0,07 % es difícil de batir)
- Crees que EE. UU. seguirá dominando los mercados mundiales
- Ya tienes exposición a Europa o emergentes por otro vehículo
- No te importa la concentración geográfica y tecnológica

### Elige IWDA si...
- Quieres exposición global desarrollada sin emergentes
- Prefieres el mayor fondo (mayor liquidez, spreads más ajustados)
- Planeas complementarlo luego con EMIM para tener control manual de pesos
- Tu broker tiene IWDA en su lista de ETFs sin comisión (Trade Republic lo tiene periódicamente)

### El debate del que nadie habla: la diferencia real en euros

Muchos debates sobre estos tres ETFs se vuelven abstractos. Pongámoslo en números concretos.

Asumamos: inversión inicial de 10 000 €, aportación mensual de 300 €, horizonte 25 años, retorno nominal anual del 7 %.

| ETF | Patrimonio estimado a 25 años | Coste total del TER |
|-----|-------------------------------|---------------------|
| CSPX (0,07 %) | ~278 000 € | ~5 600 € |
| IWDA (0,20 %) | ~272 000 € | ~16 000 € |
| VWCE (0,22 %) | ~271 000 € | ~17 600 € |

La diferencia entre CSPX y VWCE es ~7 000 € a 25 años. Relevante, pero no dramática. Lo que más importa es **empezar**, **mantener el plan** y **no vender en los crashes**.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'fiscalidad-etfs-espana-guia-completa',
    title: 'Fiscalidad de ETFs en España: la guía que tu broker no te da',
    excerpt:
      'Guía completa sobre fiscalidad de ETFs en España: IRPF, modelo 720/721, ETFs de acumulación vs distribución, domicilio fiscal y casos prácticos con Trade Republic, DEGIRO y MyInvestor.',
    publishedAt: '2026-05-12',
    readingMinutes: 15,
    keywords: ['fiscalidad ETF España', 'declarar ETFs IRPF', 'impuestos ETFs'],
    faq: [
      {
        q: '¿Cómo tributan los ETFs en España en el IRPF?',
        a: 'Los ETFs tributan como fondos de inversión en cuanto a ganancia/pérdida patrimonial: cuando vendes, la diferencia entre precio de venta y coste de compra tributa entre el 19% y el 28% según el importe. Los dividendos de ETFs de distribución tributan como rendimientos del capital mobiliario (mismos tipos). A diferencia de los fondos de inversión, los ETFs no permiten traspasos sin tributar.',
      },
      {
        q: '¿Tengo que declarar ETFs en España aunque no los haya vendido?',
        a: 'Si no has vendido y el ETF es de acumulación, no debes declarar nada por IRPF ese año (no hay hecho imponible). Si el ETF es de distribución y pagó dividendos, sí debes declararlos aunque no hayas vendido. Para el modelo 720/721 (bienes en el extranjero), debes declarar si el valor conjunto supera los 50.000€.',
      },
      {
        q: '¿Qué es la doble imposición de dividendos en ETFs y cómo recuperarla?',
        a: 'Cuando un ETF recibe dividendos de empresas estadounidenses, el país de origen retiene un porcentaje (15% si el ETF está domiciliado en Irlanda, 30% en otros casos). En un ETF de acumulación esto ocurre internamente y el fondo lo gestiona. En un ETF de distribución domiciliado en Luxemburgo u otro país sin convenio, puedes recuperar la diferencia vía "deducción por doble imposición internacional" en tu declaración de la renta.',
      },
      {
        q: '¿Los ETFs de acumulación son más eficientes fiscalmente que los de distribución?',
        a: 'Para inversores en fase de ahorro: sí. Los ETFs de acumulación reinvierten los dividendos internamente sin que tributen en tu declaración. En un ETF de distribución, esos dividendos tributan cada año como rendimientos del capital mobiliario (19%-28%), reduciendo el capital disponible para el interés compuesto.',
      },
    ],
    content: `# Fiscalidad de ETFs en España: la guía que tu broker no te da

La fiscalidad es el aspecto más ignorado por los nuevos inversores y el más costoso si se gestiona mal. Un error en la declaración de la renta puede costarte multas, recargos e intereses. Un ETF mal elegido puede hacerte tributar dividendos que podrías haber diferido décadas.

Esta guía no es asesoramiento fiscal. Es educación para que entiendas el terreno antes de hablar con un profesional — o para que hagas tú mismo tu declaración de forma informada.

---

## ETFs de acumulación vs distribución: el impacto fiscal

Esta es la primera decisión con mayor impacto fiscal.

### ETFs de distribución (Dist)

Cada vez que el ETF reparte un dividendo, recibes un pago en tu cuenta. Ese pago tributa **en el ejercicio en que lo recibes**, como rendimiento del capital mobiliario en la base del ahorro de tu IRPF.

**Ejemplo práctico**: tienes 50 000 € en el ETF VWRD (versión distribución del All-World) con una rentabilidad por dividendo del 1,4 %. Recibes 700 € en dividendos en 2026. Esos 700 € tributan ese año aunque no hayas vendido nada.

Escala de la base del ahorro 2026:
| Ganancia | Tipo |
|----------|------|
| 0 – 6 000 € | 19 % |
| 6 001 – 50 000 € | 21 % |
| 50 001 – 200 000 € | 23 % |
| 200 001 – 300 000 € | 27 % |
| > 300 000 € | 28 % |

Sobre 700 € de dividendo: 700 × 19 % = 133 € de impuestos ese año.

### ETFs de acumulación (Acc)

Los dividendos se reinvierten automáticamente dentro del fondo. No hay ningún evento fiscal hasta que **vendes** participaciones. El valor liquidativo del ETF sube reflejando los dividendos reinvertidos, pero no pagas IRPF hasta la venta.

**El efecto en 30 años es enorme**. Con 50 000 € al 7 % anual (incluyendo dividendos reinvertidos):
- **ETF distribución**: tributas ~133 € cada año por dividendos + al vender final
- **[ETF de acumulación](/blog/fondos-indexados-vs-etfs-espana)**: solo tributas al vender. El capital que habrías pagado en impuestos anuales sigue compuesto en el fondo durante décadas

La diferencia puede superar los 20 000–30 000 € en una cartera grande a largo plazo. **Salvo que necesites flujo de caja, usa siempre ETFs de acumulación.**

---

## Cómo tributan las ganancias: escala del IRPF ahorro 2026

Cuando vendes un ETF con plusvalía (o con minusvalía), el resultado va a la **base imponible del ahorro**.

### Plusvalías (ganancias patrimoniales)

Ganancia = Precio de venta − Precio de compra − Comisiones

Se aplica la escala progresiva del ahorro del IRPF:

| Ganancia acumulada | Tipo marginal |
|--------------------|---------------|
| 0 – 6 000 € | 19 % |
| 6 001 – 50 000 € | 21 % |
| 50 001 – 200 000 € | 23 % |
| 200 001 – 300 000 € | 27 % |
| > 300 000 € | 28 % |

**Ejemplo**: vendes participaciones por 20 000 € que compraste por 12 000 €. Ganancia = 8 000 €.
- Primeros 6 000 €: 6 000 × 19 % = 1 140 €
- Restantes 2 000 €: 2 000 × 21 % = 420 €
- **Total a pagar: 1 560 €**

### Minusvalías y compensación

Si vendes con pérdidas, puedes compensar:
- Primero, con otras ganancias patrimoniales del mismo año
- Si sobra, con hasta el 25 % de los rendimientos de capital mobiliario positivos del año
- Si sigue sobrando, arrastras las pérdidas hasta 4 años siguientes

**Importante — la regla de los 2 meses**: si vendes un ETF con pérdida para aflorarla fiscalmente y luego recompras el **mismo** ETF o uno "homogéneo" dentro de los 2 meses anteriores o posteriores, Hacienda no reconoce la pérdida hasta que no vendes definitivamente. Esta regla se llama "de los valores homogéneos" (artículo 33.5 de la LIRPF).

---

## Modelo 720 y 721: cuándo declarar

### Modelo 720 — Bienes y derechos en el extranjero

El modelo 720 es obligatorio si tienes activos en el extranjero **valorados en más de 50 000 € por categoría**. Para ETFs, la categoría relevante es "valores cotizados en mercados extranjeros".

**¿Cuándo afecta al inversor ETF?**
- DEGIRO está registrado en Países Bajos. Técnicamente, tus ETFs están custodiados en el extranjero.
- Trade Republic está en Alemania.
- Si el valor de tus ETFs supera los 50 000 €, es obligatorio declararlo.

**Penalizaciones**: el régimen sancionador del 720 es de los más duros del sistema tributario español. La Agencia Tributaria revisó el régimen tras sentencia del TJUE de 2022, pero la obligación de declaración sigue vigente. Multa mínima por no presentarlo: 10 000 €.

**Plazo**: del 1 de enero al 31 de marzo del año siguiente.

### Modelo 721 — Criptomonedas en el extranjero

No aplica directamente a ETFs. Cubre activos virtuales (criptomonedas) custodiados en exchanges extranjeros.

### ¿MyInvestor obliga al 720?

No. MyInvestor es una entidad española regulada por el Banco de España. Los activos custodiados en MyInvestor no están "en el extranjero" a efectos del 720.

**Conclusión práctica**: si usas Trade Republic o DEGIRO y tu cartera supera 50 000 €, consulta con un asesor fiscal la obligación del 720. No es algo para improvisar.

---

## ETFs UCITS vs no-UCITS: diferencia fiscal clave

### ¿Qué es un ETF UCITS?

UCITS (Undertakings for Collective Investment in Transferable Securities) es el marco regulatorio europeo para fondos de inversión. Un ETF UCITS está domiciliado en Europa (Irlanda, Luxemburgo, etc.) y cumple los requisitos de la directiva europea.

### ETFs no-UCITS (americanos)

Los ETFs de Vanguard, iShares o SPDR que cotizan en NYSE o NASDAQ son **no-UCITS**. Están sujetos a normativa americana (IRS, SEC). Un inversor europeo **no puede comprar ETFs americanos** por restricciones MiFID II (no tienen KID en idioma europeo).

Pero hay más: si un inversor europeo pudiera comprar ETFs americanos, existiría el riesgo de **withholding tax en herencia** (impuesto sucesorio americano del 40 % sobre activos con situs en EE. UU.). Los ETFs UCITS domiciliados en Irlanda eliminan este riesgo.

**Regla de oro**: solo compra ETFs UCITS europeos. ISIN empieza por IE o LU. Punto.

---

## Domicilio fiscal: Irlanda vs Luxemburgo

### Irlanda (IE)

El convenio fiscal entre Irlanda y EE. UU. establece una retención reducida del 15 % sobre dividendos de acciones americanas pagados al ETF. Como el S&P 500 y el [MSCI World](/blog/que-es-el-msci-world) son principalmente empresas americanas, esto es muy relevante.

Un ETF domiciliado en Irlanda pagará el 15 % de retención a la fuente sobre dividendos de sus acciones americanas. Ese coste ya está descontado del NAV del ETF antes de que te llegue a ti.

### Luxemburgo (LU)

Sin convenio comparable. La retención sobre dividendos americanos puede ser del 30 %. Para un inversor en un ETF de renta variable global con 60 % en EE. UU., la diferencia es del 15 % adicional sobre el 60 % de los dividendos. Con una rentabilidad por dividendo del 1,5 %, eso es ~0,135 % de coste oculto adicional cada año.

**Conclusión**: para ETFs de renta variable global, prefiere siempre domicilio en Irlanda.

**Importante**: para ETFs de bonos (renta fija), la diferencia es menor porque los bonos no pagan "dividendos" en el mismo sentido. El cupón tributa diferente.

---

## Casos prácticos por broker

### Trade Republic

Trade Republic opera como custodio alemán. Emite un informe fiscal anual que puedes descargar desde la app. El formato es adaptable al sistema alemán (Abgeltungssteuer), no al español.

**Lo que te da**: resumen de operaciones, plusvalías/minusvalías, dividendos (si los hubiera).

**Lo que debes hacer tú**:
1. Descargar el informe de operaciones del año
2. Calcular manualmente tus ganancias/pérdidas con precio de compra y venta
3. Introducirlo en Renta Web (modelo D-6 para dividendos y ganancias)

**Retención en origen**: Trade Republic no retiene IRPF español automáticamente. Serás tú quien declare en la renta anual. Esto significa que no hay retención "preventiva" — necesitas reservar tú el dinero para Hacienda cuando vendas con ganancias.

### DEGIRO

DEGIRO ofrece un informe fiscal anual más detallado. Tienen también un servicio de "informe para España" que formatea los datos en un CSV compatible con Renta Web.

Funciona igual que TR en lo esencial: sin retención automática de IRPF. Descarga el informe y completa la declaración.

### MyInvestor

Al ser entidad española, **retiene a cuenta** el 19 % sobre dividendos abonados y sobre las ganancias en reembolsos de fondos. Al hacer la declaración, puedes compensar esa retención (si has retenido de más, te devuelven; si de menos, pagas la diferencia según tu tipo real).

---

## Errores comunes en la declaración

1. **No declarar dividendos pequeños**: aunque sean 20 €, los dividendos de ETFs son rendimientos del capital mobiliario y deben declararse. La AEAT cruza datos con los custodios europeos.

2. **Confundir acumulación con distribución en la declaración**: si tienes un ETF de acumulación, NO hay rendimiento a declarar cada año. Solo declares al vender.

3. **No llevar registro del precio de compra**: cuando vendes, necesitas el precio exacto de adquisición (incluidas comisiones). Si has comprado en varias tandas, aplica el método FIFO (primero en entrar, primero en salir) según la legislación española.

4. **Ignorar el modelo 720 por desconocimiento**: la ignorancia no exime de la multa. Si tu cartera en broker extranjero supera 50 000 €, infórmate antes del 31 de marzo.

5. **Compensar pérdidas de ETFs con plusvalías de criptomonedas**: desde 2023, las criptomonedas tributan como "otras ganancias patrimoniales", no en la base del ahorro. Las pérdidas de ETFs no se pueden compensar con ganancias de cripto y viceversa si son de distinta naturaleza.

6. **Olvidar los gastos deducibles**: las comisiones de compra y venta son deducibles del precio. Reduce el precio de venta por la comisión de venta y suma la comisión de compra al precio de adquisición.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).

---

## Fuentes y lecturas complementarias

- [AEAT — IRPF: Rendimientos del capital mobiliario](https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/irpf-2023.html) — Manual oficial de la Agencia Tributaria sobre tributación de dividendos e inversiones.
- [JustETF — Comparativa domicilio fiscal de ETFs](https://www.justetf.com/es/) — Filtra por país de domicilio (Irlanda, Luxemburgo) para evaluar la eficiencia fiscal de cada ETF.
- [MSCI — Metodología de índices y withholding tax](https://www.msci.com/real-time-index-data-search) — Datos oficiales sobre composición de índices MSCI World y ACWI.
`,
  },
  {
    slug: 'fire-espana-cuanto-necesitas',
    title: 'FIRE en España: cuánto necesitas realmente y cómo llegar',
    excerpt:
      'Guía completa sobre FIRE en España: la regla del 4 %, por qué usar el 3,5 % en España, coste de vida real en Madrid, Bilbao y pueblo, y planes a 15, 20 y 25 años con cifras concretas.',
    publishedAt: '2026-05-13',
    readingMinutes: 14,
    keywords: ['FIRE España', 'libertad financiera España', 'jubilarte joven'],
    faq: [
      {
        q: '¿Cuánto dinero necesito para FIRE en España?',
        a: 'Depende de tus gastos anuales. Aplicando la regla del 4%, necesitas 25 veces tus gastos anuales (o 28-33 veces si usas el 3,5%-3% para mayor seguridad en España). Con gastos de 18.000€/año en un pueblo, necesitarías ~450.000-500.000€. En Madrid o Barcelona con 30.000€/año, serían ~750.000-850.000€.',
      },
      {
        q: '¿Qué es la regla del 4% y funciona en España?',
        a: 'La regla del 4% (estudio Trinity) dice que puedes retirar el 4% de tu cartera el primer año y ajustar por inflación cada año, con probabilidad >95% de no quedarte sin dinero en 30 años. En España se recomienda usar el 3,5% por mayor longevidad, menor rentabilidad histórica bursátil europea y riesgo de inflación. Usa nuestra calculadora FIRE Monte Carlo para simular tu caso concreto.',
      },
      {
        q: '¿Cómo funciona el movimiento FIRE en España?',
        a: 'FIRE (Financial Independence, Retire Early) es alcanzar independencia financiera mediante ahorro e inversión indexada de alta tasa de ahorro (40-70% de los ingresos). En España la comunidad FIRE se reúne en foros como Bogleheads.es, r/SpainFIRE y grupos de Telegram. La filosofía combina reducción de gastos, inversión en ETFs indexados y planificación fiscal.',
      },
      {
        q: '¿Cuánto tiempo tarda en conseguirse el FIRE en España?',
        a: 'Depende de tu tasa de ahorro. Con ingresos de 35.000€ netos y gastos de 18.000€, ahorras ~49%. Con esa tasa de ahorro, desde cero tardarías aproximadamente 17-20 años en alcanzar FIRE (según las simulaciones Monte Carlo con rentabilidad real del 5-6% y aportaciones constantes). Tasas de ahorro superiores al 60% pueden reducirlo a 10-12 años.',
      },
    ],
    content: `# FIRE en España: cuánto necesitas realmente y cómo llegar

FIRE (Financial Independence, Retire Early) es el movimiento que más ha cambiado la forma de pensar sobre el dinero en la última década. Pero la mayoría de la información disponible está diseñada para americanos con 401(k), Roth IRA y Medicaid. Los números no se trasladan directamente a España.

Esta guía recalcula el FIRE para la realidad española: sin ventajas fiscales de cuentas de jubilación, con Seguridad Social, con un coste de vida muy diferente al de San Francisco, y con una esperanza de vida entre las más altas del mundo.

---

## ¿Qué es FIRE realmente?

FIRE no es "no trabajar". Es tener suficiente patrimonio para que tu dinero trabaje por ti y puedas elegir en qué empleas tu tiempo. Hay varios subtipos:

- **Lean FIRE**: libertad financiera con un estilo de vida austero. Presupuesto < 18 000 €/año
- **Regular FIRE**: presupuesto de clase media (~24 000–36 000 €/año en España)
- **Fat FIRE**: libertad financiera sin renunciar a nada. Presupuesto > 50 000 €/año
- **Barista FIRE**: alcanzas suficiente patrimonio para trabajar a tiempo parcial y cubrir la diferencia con ingresos pequeños

El objetivo cuantificable es el **número FIRE**: el patrimonio que necesitas invertido para que genere suficiente retorno que cubra tus gastos anuales de forma indefinida (o durante 30–40 años).

---

## La regla del 4 % y sus límites

La regla del 4 % viene del **Trinity Study** (1998, revisado en 2025). El estudio analizó carteras históricas de acciones y bonos americanos y concluyó que una retirada del 4 % anual (ajustada a inflación) tenía una tasa de éxito del 95 % a 30 años.

**Número FIRE según la regla del 4 %**:
Gastos anuales × 25 = Patrimonio necesario

Ejemplo: si gastas 24 000 €/año, necesitas 600 000 € invertidos.

### Por qué el 4 % es optimista para España

Hay cuatro factores que hacen que la regla del 4 % sea más arriesgada para un español que para un americano:

1. **Mayor esperanza de vida**: La esperanza de vida en España es de 84 años (mujeres: 87, hombres: 81). Si te retiras a los 45, necesitas que el dinero dure 40+ años, no 30. Los estudios originales de Trinity se basaban en retiros a los 65.

2. **Sin cuentas con ventaja fiscal**: En EE. UU., el 401(k) y la Roth IRA permiten diferir o eliminar impuestos sobre décadas de crecimiento. En España, el plan de pensiones tiene limitaciones serias (máximo 1 500 €/año de aportación desde 2021, penalización por rescate anticipado). Un inversor americano FIRE paga muchos menos impuestos sobre su crecimiento que uno español.

3. **Inflación y el contexto europeo**: La inflación en la eurozona en 2022–2023 fue significativa (10–12 %). Una cartera que no ajusta a inflación pierde poder adquisitivo rápidamente.

4. **Secuencia de retornos**: El mayor riesgo del FIRE no es el retorno medio, sino la secuencia. Si el mercado cae un 40 % el primer año de tu retiro y sigues retirando el 4 %, destruyes el capital base. La recuperación posterior no importa: ya vendiste barato.

---

## La regla del 3,5 %: el estándar Boglehead español

Para España, la comunidad Boglehead hispana ha adoptado como referencia más conservadora la **retirada del 3,5 %**. Esto equivale a un multiplicador de 28,5× los gastos anuales.

Gastos anuales × 28,5 = Número FIRE conservador para España

¿Por qué 3,5 %?
- Cubre horizontes de 40+ años con mayor margen
- Más resistente a secuencias de retornos adversas
- Compensa la ausencia de ventajas fiscales de cuentas de jubilación
- Da margen para el impacto del IRPF sobre las retiradas

**Comparativa de números FIRE**:

| Gasto anual | Regla 4 % (×25) | Regla 3,5 % (×28,5) |
|-------------|-----------------|----------------------|
| 18 000 € | 450 000 € | 513 000 € |
| 24 000 € | 600 000 € | 684 000 € |
| 36 000 € | 900 000 € | 1 026 000 € |
| 48 000 € | 1 200 000 € | 1 368 000 € |
| 60 000 € | 1 500 000 € | 1 710 000 € |

---

## Coste de vida medio en España: cifras reales (2026)

El coste de vida varía enormemente dentro de España. Aquí tienes estimaciones reales mensuales para tres perfiles:

### Madrid (pareja sin hijos, alquiler incluido)

| Concepto | Coste mensual |
|----------|---------------|
| Alquiler (2 hab, zona media) | 1 800 € |
| Alimentación | 600 € |
| Transporte (metro + esporádico) | 120 € |
| Suministros (luz, gas, agua) | 150 € |
| Ocio, restaurantes, viajes | 500 € |
| Seguros (salud privada + hogar) | 180 € |
| Otros (ropa, peluquería, etc.) | 200 € |
| **Total** | **3 550 € / mes = 42 600 €/año** |

### Bilbao (pareja sin hijos, alquiler incluido)

| Concepto | Coste mensual |
|----------|---------------|
| Alquiler (2 hab, zona media) | 1 400 € |
| Alimentación | 550 € |
| Transporte | 100 € |
| Suministros | 140 € |
| Ocio, restaurantes | 400 € |
| Seguros | 160 € |
| Otros | 150 € |
| **Total** | **2 900 € / mes = 34 800 €/año** |

### Pueblo de Castilla (propiedad en propiedad, sin alquiler)

| Concepto | Coste mensual |
|----------|---------------|
| Hipoteca / sin alquiler | 0 € |
| Gastos casa (IBI, comunidad, mantenimiento) | 200 € |
| Alimentación | 400 € |
| Transporte (coche) | 250 € |
| Suministros | 100 € |
| Ocio, salidas | 200 € |
| Seguros | 120 € |
| Viajes (reserva anual) | 150 € |
| **Total** | **1 420 € / mes = 17 040 €/año** |

---

## Cuánto necesitas según tu estilo de vida

Con la regla del 3,5 % (multiplicador 28,5):

| Perfil | Gasto anual | Número FIRE |
|--------|-------------|-------------|
| Lean FIRE (pueblo) | 17 000 € | 485 000 € |
| Regular FIRE (ciudad media) | 28 000 € | 798 000 € |
| Regular FIRE (Madrid/Barcelona) | 42 000 € | 1 197 000 € |
| Fat FIRE (ciudad) | 60 000 € | 1 710 000 € |

---

## Plan a 15, 20 y 25 años con cifras reales

Vamos a calcular tres escenarios concretos. Asumimos:
- Aportación mensual fija
- Retorno real anual del 6 % (nominal ~8 %, menos ~2 % inflación)
- [ETF de acumulación](/blog/fondos-indexados-vs-etfs-espana) (sin fricción fiscal anual)
- Sin rendimientos adicionales salvo el crecimiento de cartera

### Objetivo: 700 000 € (Regular FIRE ciudad media)

| Horizonte | Capital inicial | Aportación mensual necesaria |
|-----------|----------------|------------------------------|
| 15 años | 0 € | 2 540 € |
| 15 años | 50 000 € | 2 080 € |
| 20 años | 0 € | 1 540 € |
| 20 años | 50 000 € | 1 150 € |
| 25 años | 0 € | 1 000 € |
| 25 años | 50 000 € | 670 € |

### Objetivo: 500 000 € (Lean FIRE pueblo o ciudad pequeña)

| Horizonte | Capital inicial | Aportación mensual necesaria |
|-----------|----------------|------------------------------|
| 15 años | 0 € | 1 815 € |
| 20 años | 0 € | 1 100 € |
| 25 años | 0 € | 715 € |

**Dato importante**: una pareja donde cada uno aporta 350 €/mes puede alcanzar 700 000 € en 25 años partiendo de cero (asumiendo 6 % real). Son 700 €/mes combinados. Perfectamente alcanzable con dos salarios medios españoles (~1 800–2 200 €/mes netos cada uno).

---

## Mitos sobre FIRE en España

### Mito 1: "Necesito ganar 100 000 € para hacer FIRE"
Falso. La tasa de ahorro importa más que el sueldo absoluto. Una persona que gana 35 000 € y ahorra el 40 % (14 000 €/año) llega antes a FIRE que alguien que gana 70 000 € y ahorra el 10 % (7 000 €/año).

### Mito 2: "La Seguridad Social me cubrirá"
No cuentes con ello para FIRE antes de los 60. La pensión contributiva española solo se genera tras cotizar 15+ años, y para la pensión máxima necesitas cotizar 37+ años con bases máximas. Si te retiras a los 45, tendrás 20 años de brecha antes de cualquier pensión y la cuantía será muy baja.

### Mito 3: "Con el mercado tan alto, ahora no es buen momento"
El timing del mercado no funciona. Los estudios muestran que ["lump sum"](/blog/dca-vs-lump-sum-aportar-mensual) (invertir todo de una vez) bate al "dollar cost averaging" el ~66 % del tiempo. Y ambos baten a esperar.

### Mito 4: "FIRE significa aburrirse"
El movimiento FIRE en su versión madura trata sobre libertad, no inactividad. La mayoría de personas que alcanzan FIRE trabajan en algo diferente: proyectos propios, trabajo parcial elegido, voluntariado. La diferencia es que ya no **necesitan** el dinero de ese trabajo.

### Mito 5: "Los impuestos destruirán mi retiro"
Con una retirada de 28 000 €/año en base del ahorro y bien planificada, el IRPF efectivo es manejable. Los primeros 6 000 € tributan al 19 %, el resto al 21–23 %. La planificación de cuando realizas plusvalías importa mucho.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).

---

## Fuentes y lecturas complementarias

- [Trinity Study (Cooley, Hubbard, Walz, 1998)](https://www.financialplanningassociation.org/article/journal/JAN98-retirement-savings-choosing-withdrawal-rate-sustainable) — El estudio original que fundamenta la regla del 4% y las tasas de retirada seguras.
- [Early Retirement Now — Safe Withdrawal Rate Series](https://earlyretirementnow.com/safe-withdrawal-rate-series/) — La serie más completa de análisis sobre la regla del 4% para FIRE con horizontes de 40-60 años.
- [Calculadora FIRE de BogleHub con simulación Monte Carlo](/calculadora/fire-monte-carlo) — Simula tu caso concreto con datos históricos y diferentes tasas de retirada.
`,
  },
  {
    slug: 'bogleheads-espana-guia-completa',
    title: 'Bogleheads España: la guía completa para empezar',
    excerpt:
      'Todo sobre la filosofía Boglehead adaptada a España: los principios de John Bogle, la cartera de tres fondos, ETFs compatibles y los primeros pasos concretos para empezar esta semana.',
    publishedAt: '2026-05-14',
    readingMinutes: 12,
    keywords: ['bogleheads España', 'inversión pasiva España', 'cartera bogle'],
    faq: [
      {
        q: '¿Qué es un Boglehead y cómo se aplica en España?',
        a: 'Un Boglehead es un inversor que sigue la filosofía de John Bogle (fundador de Vanguard): invertir a largo plazo en fondos indexados de bajo coste, diversificados globalmente, con mínima intervención activa. En España se aplica mediante ETFs UCITS domiciliados en Irlanda (eficientes fiscalmente), con carteras simples de 2-3 ETFs y aportaciones periódicas automáticas.',
      },
      {
        q: '¿Cuáles son los principios básicos de la inversión Boglehead?',
        a: 'Los cinco principios Boglehead son: (1) Empieza a invertir pronto y mantén el rumbo. (2) Diversifica ampliamente (acciones + bonos, varios países y sectores). (3) Minimiza los costes (busca TER bajos, evita comisiones innecesarias). (4) Mantén los impuestos al mínimo (ETFs de acumulación, domicilio en Irlanda). (5) Nunca trates de cronometrar el mercado (DCA mensual, ignora la volatilidad).',
      },
      {
        q: '¿Cuál es la diferencia entre inversión activa e indexada?',
        a: 'La inversión activa busca superar al mercado eligiendo acciones o timing: históricamente, más del 90% de los fondos activos no superan a su índice de referencia a 10+ años. La inversión indexada simplemente replica el mercado entero a coste mínimo, capturando toda la rentabilidad disponible sin fricción. Evidencia empírica amplia (Sharpe, French, Malkiel) respalda la superioridad de la indexación a largo plazo.',
      },
    ],
    content: `# Bogleheads España: la guía completa para empezar

La inversión pasiva lleva décadas siendo la estrategia con mejor relación rentabilidad-esfuerzo que existe para el inversor no profesional. No hace falta analizar balances, leer informes de resultados ni predecir el ciclo económico. Solo hace falta entender tres principios, elegir los vehículos adecuados y no hacer nada (casi literalmente).

Esta guía explica la filosofía Boglehead desde sus raíces, la adapta a la realidad fiscal y de mercado española, y te da un plan de acción concreto para esta semana.

---

## ¿Quién fue John Bogle?

John Clifton Bogle (1929–2019) fue el fundador de Vanguard, la gestora de fondos más grande del mundo por activos. En 1974, cuando dirigía la filial de Wellington Management, tomó una decisión radical: crear el primer fondo de inversión indexado al alcance del inversor particular.

El Vanguard 500 Index Fund, lanzado en 1976, fue ridiculizado por Wall Street como "la locura de Bogle". La idea era absurda para la industria: ¿por qué conformarse con el retorno del mercado cuando puedes contratar gestores que lo batan?

Cuatro décadas después, los datos son aplastantes:

- **El 92 % de los fondos de gestión activa no baten a su índice de referencia** a 15 años (datos SPIVA, 2025)
- Vanguard gestiona más de 9 billones de dólares en activos
- Los ETFs indexados de bajo coste son el vehículo de inversión dominante en EE. UU. y Europa

John Bogle murió en enero de 2019, pero el movimiento que creó sigue creciendo. Sus libros, especialmente "The Little Book of Common Sense Investing", son la biblia del inversor pasivo.

---

## Los 3 principios Boglehead

### 1. Simplicidad

La cartera perfecta no existe, pero la cartera suficientemente buena y simple que realmente se mantiene durante décadas bate a la cartera teóricamente óptima que se abandona en el primer crash.

La complejidad es el enemigo del inversor individual. Cada ETF adicional, cada estrategia de factor investing, cada rebalanceo activo añade coste mental y oportunidades de cometer errores. La simplicidad es una ventaja competitiva.

La cartera Boglehead clásica puede ser de uno, dos o tres fondos. Eso es todo.

### 2. Diversificación amplia

"No pongas todos los huevos en una cesta" es un cliché porque es verdad. Pero la diversificación tiene dimensiones que muchos inversores ignoran:

- **Diversificación geográfica**: no solo EE. UU., no solo Europa
- **Diversificación temporal**: invertir regularmente (DCA) en lugar de en un solo momento
- **Diversificación de activos**: renta variable + renta fija según tu horizonte temporal
- **Diversificación de divisas**: exposición natural a varias monedas

Un ETF como el VWCE ya resuelve la mayoría de estas dimensiones en una sola posición.

### 3. Bajo coste

"En inversión, obtienes lo que no pagas. La industria cobra por gestión, distribución y marketing. Tú pagas esos costes. La matemática es implacable." — John Bogle

Los costes se restan del retorno directamente. Un fondo con TER del 1,5 % que rinde igual que el mercado (7 % anual) te entrega el 5,5 %. En 30 años sobre 100 000 € la diferencia con un ETF al 0,20 % supera los 200 000 €.

El principio no es solo evitar los fondos caros: es ser consciente de cada coste en la cadena (TER del fondo, comisiones del broker, coste de conversión de divisas, impacto fiscal de las decisiones).

---

## Cartera Boglehead clásica vs adaptada a España

### La cartera de tres fondos (EE. UU.)

La cartera clásica americana usa tres fondos Vanguard:
1. Vanguard Total Stock Market (renta variable EE. UU.)
2. Vanguard Total International Stock Market (renta variable internacional)
3. Vanguard Total Bond Market (renta fija EE. UU.)

Proporciones típicas según edad: porcentaje en bonos = tu edad. A los 35: 65/35 % o más agresivo.

### La cartera adaptada a España

El inversor español no tiene acceso a los fondos Vanguard americanos. Pero puede construir una cartera equivalente o mejor con ETFs UCITS europeos:

**Cartera de 1 fondo (máxima simplicidad)**:
- 100 % VWCE (Vanguard FTSE All-World)

**Cartera de 2 fondos (añadir renta fija)**:
- 80 % VWCE + 20 % AGGH (bonos globales EUR-hedged)

**Cartera de 3 fondos (más control)**:
- 72 % IWDA (mundo desarrollado)
- 8 % EMIM (mercados emergentes)
- 20 % AGGH (renta fija global)

**Variante con sesgo europeo** (común entre Bogleheads españoles que quieren reducir el 70 % de EE. UU.):
- 50 % VWCE
- 30 % IMEU (MSCI Europe, TER 0,12 %)
- 20 % AGGH

### ¿Cuánta renta fija necesito?

Guías generales según horizonte temporal:

| Horizonte | Renta variable | Renta fija |
|-----------|---------------|------------|
| > 20 años | 90–100 % | 0–10 % |
| 10–20 años | 70–90 % | 10–30 % |
| 5–10 años | 50–70 % | 30–50 % |
| < 5 años | 30–50 % | 50–70 % |

Estas son orientaciones, no reglas. Tu tolerancia real al riesgo (no la teórica) es el factor determinante.

---

## Por qué la cartera de 3 fondos funciona

### Argumento 1: La hipótesis del mercado eficiente

Los mercados financieros incorporan rápidamente toda la información pública disponible en los precios. Es imposible batir sistemáticamente al mercado usando información que ya es pública.

Esto no significa que los mercados sean perfectos (hay anomalías de corto plazo). Significa que para el inversor individual sin ventaja informacional, el precio actual ya refleja el consenso de todos los participantes.

La gestión activa no bate al índice de forma consistente porque los gestores activos compiten entre ellos. Por cada gestor que bate al mercado, hay otro que pierde por la misma cantidad. Pero todos cobran comisiones. Net fees, la gestión activa pierde.

### Argumento 2: El tiempo es el activo más valioso

El S&P 500 ha subido en el 73 % de los años desde 1926. En periodos de 10 años, ha subido en el 94 % de los casos. En periodos de 20 años, prácticamente siempre.

El riesgo principal de la inversión no es invertir y perder a largo plazo — el mercado global se ha recuperado de todas las crisis históricas. El riesgo principal es **no invertir** o **salir en los crashes por miedo**.

Una cartera simple que se mantiene durante 30 años sin tocarla bate a estrategias sofisticadas que se gestionan emocionalmente.

### Argumento 3: El rebalanceo como disciplina

Una cartera de 3 fondos se rebalancea periódicamente (una o dos veces al año) para mantener los pesos objetivo. Esto impone una disciplina contraria a la intuición: vendes lo que ha subido y compras lo que ha bajado.

En términos conductuales, esto es lo opuesto al comportamiento natural del inversor emocional (compra lo que sube, vende lo que baja). El rebalanceo sistemático es una forma de "comprar barato, vender caro" sin intentar predecir el mercado.

---

## ETFs Boglehead-friendly en España

| ETF | TER | Índice | Uso en cartera |
|-----|-----|--------|----------------|
| VWCE | 0,22 % | FTSE All-World | Renta variable global total |
| IWDA | 0,20 % | MSCI World | Renta variable desarrollada |
| EMIM | 0,18 % | MSCI EM IMI | Mercados emergentes |
| IMEU | 0,12 % | MSCI Europe | Europa desarrollada |
| AGGH | 0,10 % | Bloomberg Global Agg (hedged EUR) | Renta fija global |
| IEAG | 0,10 % | Bloomberg Euro Agg | Renta fija eurozona |
| IBTE | 0,07 % | FTSE German Government Bond 0-1Y | Liquidez / casi-efectivo |

---

## Comunidades activas en España

### forobogleheads.es

El foro español de referencia para la inversión pasiva. Fundado en 2014, tiene decenas de miles de usuarios y miles de hilos sobre ETFs, fiscalidad, FIRE, brokers y filosofía de inversión.

Especialmente útil para: dudas fiscales específicas de España, debates sobre carteras concretas, experiencias reales con brokers.

### r/SpainFIRE (Reddit)

El subreddit español de FIRE. Más orientado a la libertad financiera y el retiro anticipado que al debate técnico de inversión. Gran comunidad para seguimiento de progreso personal, cálculos FIRE y motivación.

### r/Bogleheads (Reddit, en inglés)

La comunidad original en inglés. Millones de miembros. Útil para preguntas técnicas avanzadas sobre ETFs y filosofía de inversión, aunque el contexto fiscal es americano.

---

## Recursos recomendados

### Libros

**"El pequeño libro para invertir con sentido común"** (John Bogle, traducción española) — La fuente primaria. Corto, denso y suficiente.

**"Un paseo aleatorio por Wall Street"** (Burton Malkiel) — La explicación más clara de por qué el mercado eficiente hace imposible batir al índice de forma consistente.

**"El inversor inteligente"** (Benjamin Graham) — El libro que formó a Warren Buffett. Más orientado a value investing, pero el capítulo sobre "Mr. Market" es imprescindible para entender la psicología del inversor.

**"Psicología del dinero"** (Morgan Housel) — El libro de finanzas personales más vendido en los últimos cinco años. Explica por qué el comportamiento importa más que la fórmula.

### Podcasts (en español)

- **Inversión para todos** — Episodios sobre ETFs, fondos indexados y filosofía Boglehead adaptada a España
- **Noticias de Podcast** — Sección de finanzas personales con enfoque en inversión pasiva

### Webs de referencia

- **justetf.com** — El comparador de ETFs más completo. Imprescindible para filtrar por UCITS, domicilio, TER y distribución
- **portfoliovisualizer.com** — Backtesting de carteras históricas (datos americanos pero útil para comparar estrategias)
- **extraETF.com** — Alternativa a JustETF, con buen análisis de dividendos y retornos

---

## Tu plan de acción esta semana

La diferencia entre saber y actuar es donde la mayoría de los inversores se quedan. Aquí tienes cinco pasos concretos para esta semana:

**Día 1**: Abre una cuenta en Trade Republic o MyInvestor. Es gratuito y no te compromete a nada.

**Día 2**: Calcula tu tasa de ahorro actual: (Ingresos − Gastos) / Ingresos × 100. Si no sabes cuánto gastas, revisa los últimos 3 meses en tu banco.

**Día 3**: Define tu objetivo: ¿cuánto necesitas para tu [número FIRE](/blog/fire-espana-cuanto-necesitas)? Usa la regla del 3,5 % y las tablas de esta guía.

**Día 4**: [Elige tu cartera](/blog/como-elegir-tu-primer-etf-espana-2026). Para la mayoría: 100 % VWCE si eres joven y agresivo; 80/20 VWCE/AGGH si quieres algo de estabilidad. Una posición, un ETF.

**Día 5**: Configura una aportación mensual automática (Trade Republic lo llama "plan de ahorro"). Aunque sea 50 € al mes. El hábito importa más que el importe inicial.

Y luego: no hagas nada. No mires los precios todos los días. No vendas en el próximo crash (habrá uno). Revisa y rebalancea una vez al año.

Eso es todo el Boglehead.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'solapamiento-etfs-error-silencioso',
    title: 'Solapamiento de ETFs: el error silencioso que infla tu cartera',
    excerpt:
      'Tener cinco ETFs no significa estar diversificado. Qué es el solapamiento entre ETFs, por qué juntar VWCE y CSPX concentra tu cartera sin que lo notes y cómo corregirlo sin disparar la factura fiscal.',
    publishedAt: '2026-05-15',
    readingMinutes: 9,
    keywords: ['solapamiento ETFs', 'VWCE y CSPX juntos', 'diversificar cartera ETF'],
    content: `# Solapamiento de ETFs: el error silencioso que infla tu cartera

Pregunta a un inversor novato si su cartera está diversificada y te dirá que sí: "tengo cinco ETFs distintos". Pero el número de ETFs no mide la diversificación. Mide cuántas posiciones tienes que vigilar. Y muchas veces, tener cinco ETFs significa estar menos diversificado de lo que crees, no más.

El culpable es el solapamiento: distintos ETFs que, por debajo, sostienen las mismas empresas. Es un error silencioso porque no aparece en ninguna pantalla de tu broker — tienes que ir a buscarlo. Esta guía te explica qué es, cuándo ocurre, por qué importa y cómo corregirlo sin disparar la factura fiscal.

---

## Qué es exactamente el solapamiento

Un ETF no es "una cosa": es una cesta. Cuando compras VWCE no compras un fondo, compras un trozo proporcional de más de 3 600 empresas. Cuando compras CSPX compras un trozo de las 500 mayores empresas de Estados Unidos.

El solapamiento aparece cuando dos de tus ETFs contienen las mismas empresas. Si Apple pesa un 4 % dentro de un ETF y un 7 % dentro de otro, y tienes los dos, tu exposición real a Apple es la suma ponderada de ambas. No lo ves en ningún sitio: tu broker te muestra "ETF A" y "ETF B" como dos líneas separadas, como si fueran independientes. No lo son.

La pregunta correcta no es "cuántos ETFs tengo" sino "a cuántas empresas distintas, y con qué peso, estoy expuesto de verdad".

---

## El caso clásico: VWCE + CSPX

Es, con diferencia, el solapamiento más común en las carteras de los inversores indexados españoles. Y casi siempre es involuntario.

VWCE (Vanguard FTSE All-World) tiene en torno al 60-62 % invertido en Estados Unidos. Dentro de ese bloque americano, sus mayores posiciones son exactamente las mismas megaempresas que forman la cabeza del S&P 500: Apple, Microsoft, Nvidia, Amazon, Alphabet, Meta.

CSPX es el S&P 500. Es decir: prácticamente todo CSPX ya está contenido dentro de VWCE.

Cuando alguien compra VWCE y CSPX a partes iguales pensando que así "diversifica más", lo que ocurre en realidad es esto (cifras aproximadas):

| Métrica | Solo VWCE | 50 % VWCE + 50 % CSPX |
|---------|-----------|------------------------|
| Exposición a EE. UU. | ~61 % | ~80 % |
| Exposición a emergentes | ~12 % | ~6 % |
| Peso de las 10 mayores tecnológicas | ~18 % | ~26 % |

No has diversificado nada. Has hecho una apuesta concentrada por las grandes tecnológicas estadounidenses — solo que sin decidirlo de forma consciente. Si tu intención era precisamente sobreponderar EE. UU., perfecto: pero entonces que sea una decisión, no un accidente.

---

## Por qué el solapamiento es un problema

**1. Falsa sensación de seguridad.** Crees que estás repartido y no lo estás. El día que las grandes tecnológicas corrijan, descubrirás que tu cartera "diversificada" se mueve como un solo valor.

**2. Concentración no elegida.** Acabas con un peso enorme en un puñado de empresas, un sector (tecnología) y una divisa (el dólar) sin haberlo decidido. Concentrar no es malo en sí — pero debe ser una elección, no un efecto colateral.

**3. Complejidad sin recompensa.** Dos ETFs que se solapan al 80 % te dan el doble de trabajo (dos órdenes, dos seguimientos, dos líneas en la declaración) y casi ningún beneficio de diversificación.

**4. Rebalanceo imposible de razonar.** Si no sabes qué exposición real tienes, no puedes rebalancear con criterio. Mueves piezas a ciegas.

---

## Combinaciones que se solapan mucho

| Combinación | Solapamiento | Por qué |
|-------------|--------------|---------|
| VWCE + CSPX | Muy alto | CSPX está casi entero dentro de VWCE |
| VWCE + IWDA | Muy alto | IWDA es casi un subconjunto de VWCE |
| IWDA + CSPX | Alto | CSPX es la parte estadounidense de IWDA |
| S&P 500 + Nasdaq 100 | Alto | El Nasdaq 100 son las tecnológicas del propio S&P 500 |
| MSCI World + MSCI USA | Muy alto | EE. UU. ya es ~70 % del MSCI World |

Regla mental: si dos ETFs comparten el mismo universo (global con global, EE. UU. con EE. UU.), se solapan. Casi seguro.

---

## Combinaciones que sí se complementan

Estas parejas añaden algo nuevo en lugar de duplicar:

- **IWDA + EMIM**: mundo desarrollado + mercados emergentes. Juntos reconstruyen el VWCE con control de pesos.
- **VWCE + AGGH**: renta variable global + renta fija global. Distinta clase de activo: cero solapamiento.
- **Global + small caps**: un ETF global de gran capitalización apenas incluye empresas pequeñas; uno de small caps llena ese hueco real.
- **Global + sesgo regional consciente**: VWCE más un ETF de Europa, si quieres reducir deliberadamente el peso de EE. UU. Aquí hay algo de solapamiento, pero es intencionado.

La prueba del algodón: el segundo ETF, ¿mete en cartera empresas o clases de activo que el primero no tenía? Si la respuesta es no, te estás solapando.

---

## Cómo medir tu solapamiento real

La técnica se llama análisis de transparencia o radiografía (look-through): descompones cada ETF en sus empresas, las sumas una a una y obtienes el peso consolidado real de tu cartera.

Hacerlo a mano en Excel es brutal: estás cruzando miles de posiciones. Por eso casi nadie lo hace, y por eso el solapamiento pasa desapercibido durante años.

El analizador de BogleHub hace exactamente esto de forma automática: detecta qué ETFs de tu cartera se pisan y cuánto. Si tienes VWCE y CSPX juntos, te dice en cifras concretas cuánto EE. UU. estás duplicando. Es justo el tipo de problema que no ves hasta que alguien te lo pone delante.

---

## Qué hacer si ya tienes solapamiento

Lo primero: **no vendas a lo loco**. Vender un ETF con plusvalías genera un coste fiscal inmediato en tu IRPF (lo explicamos en la [guía de fiscalidad de ETFs](/blog/fiscalidad-etfs-espana-guia-completa)). Deshacer el solapamiento de golpe puede salirte más caro que el propio solapamiento.

El enfoque sensato:

1. **Decide tu núcleo.** Elige cuál de los ETFs solapados es tu posición principal de aquí en adelante.
2. **Corta las aportaciones al redundante.** Deja de meter dinero nuevo en el ETF que sobra. No hace falta venderlo: simplemente, que deje de crecer.
3. **Redirige el dinero nuevo a los huecos reales.** Te falta renta fija, emergentes, small caps... ahí va tu próxima aportación.
4. **Deja que el tiempo rebalancee.** Con aportaciones suficientes, el peso del ETF redundante se diluye solo, sin vender y sin tributar.

---

## La regla práctica: un núcleo, no cinco satélites

La mayoría de inversores particulares no necesitan más de uno o dos ETFs. Un fondo global de renta variable (VWCE o IWDA) ya contiene entre 1 400 y 3 600 empresas de decenas de países. Eso ya es diversificación de verdad.

Añadir un tercer y un cuarto ETF solo tiene sentido si cada uno aporta algo que los anteriores no tenían: una clase de activo distinta, una región ausente, un tamaño de empresa no cubierto. Si no superan esa prueba, no son diversificación: son ruido.

Menos posiciones, bien elegidas, baten a cinco ETFs que en el fondo son el mismo.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres ver el solapamiento real de tu cartera?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'fondos-indexados-vs-etfs-espana',
    title: 'Fondos indexados o ETFs: la comparación definitiva para España',
    excerpt:
      'Fondos indexados o ETFs: la comparación definitiva para el inversor español. Traspaso fiscal sin tributar, mínimos, brokers, costes y cuándo conviene cada vehículo.',
    publishedAt: '2026-05-15',
    readingMinutes: 10,
    keywords: ['fondos indexados o ETF', 'fondo indexado vs ETF', 'traspaso fondos indexados'],
    content: `# Fondos indexados o ETFs: la comparación definitiva para España

Si has decidido invertir de forma indexada, ya has tomado la decisión que más importa. Lo demás son detalles. Pero hay un detalle que en España no es menor: elegir entre un fondo indexado y un ETF. Los dos replican índices, los dos son baratos, los dos son válidos dentro de la filosofía Boglehead. La diferencia está en la fiscalidad, en cómo se compran y en dónde.

Esta guía compara ambos vehículos punto por punto, con la realidad fiscal española por delante — porque es justo ahí donde la decisión deja de ser indiferente.

---

## Qué tienen en común

Antes de las diferencias, conviene recordar que en lo esencial son lo mismo:

- Replican un índice (MSCI World, FTSE All-World, S&P 500) en lugar de intentar batirlo.
- Tienen costes bajos comparados con la gestión activa.
- Diversifican entre cientos o miles de empresas en una sola compra.
- A largo plazo, su rentabilidad depende del índice, no del vehículo.

Un fondo indexado al MSCI World y un ETF al MSCI World te darán, antes de fiscalidad y de pequeñas diferencias de coste, prácticamente el mismo resultado. La elección no va de rentabilidad. Va de fontanería: impuestos, mecánica y comodidad.

---

## Diferencia 1: el traspaso fiscal (la que de verdad importa)

Esta es la diferencia decisiva en España, y la razón por la que el debate existe.

**Fondos indexados**: la legislación española permite traspasar tu dinero de un fondo de inversión a otro **sin tributar**. Vendes el fondo A, compras el fondo B, y la plusvalía acumulada no pasa por Hacienda en ese momento. El impuesto se difiere hasta que finalmente reembolsas, es decir, sacas el dinero del todo.

**ETFs**: no se benefician de ese régimen de traspaso. Cada vez que vendes un ETF con ganancia, tributas por esa plusvalía en tu IRPF de ese año, aunque sea para comprar otro ETF acto seguido.

¿Por qué importa tanto? Porque el diferimiento fiscal es interés compuesto a tu favor. El dinero que no pagas hoy en impuestos sigue invertido y generando rentabilidad durante años. Si prevés cambiar de fondo alguna vez — por rebalanceo, por cambiar de estrategia, por encontrar uno más barato — el fondo indexado te deja hacerlo sin fricción fiscal. El ETF, no.

(Lo desarrollamos en la [guía de fiscalidad de ETFs en España](/blog/fiscalidad-etfs-espana-guia-completa).)

---

## Diferencia 2: cómo se compran

**Fondo indexado**: se suscribe y se reembolsa al valor liquidativo (NAV) del cierre del día. No hay precio "en directo". Das la orden y se ejecuta al valor que resulte ese día. No hay spread (diferencia entre precio de compra y de venta).

**ETF**: cotiza en bolsa como una acción. Compras y vendes a precio de mercado, en tiempo real, durante el horario de la bolsa. Eso te da control sobre el precio, pero introduce el spread y la posibilidad de equivocarte con el tipo de orden.

Para un inversor a largo plazo que aporta y se olvida, la compra a NAV del fondo es en realidad más cómoda y elimina un puñado de errores de principiante.

---

## Diferencia 3: mínimos y automatización

**Fondos indexados**: mínimos muy bajos. En MyInvestor puedes empezar desde 1 €. Y permiten aportaciones periódicas automáticas por el importe exacto que quieras (150 €, 200 €), comprando fracciones de participación.

**ETFs**: tradicionalmente compras participaciones enteras. Si un ETF vale 110 € y quieres invertir 150 €, compras una y te sobran 40 €. Algunos brokers (Trade Republic) permiten ETFs fraccionados en sus planes de ahorro, lo que elimina este problema.

Para automatizar el ahorro mensual con cantidades redondas, los fondos indexados encajan de forma natural.

---

## Diferencia 4: dónde se compran

**Fondos indexados**: necesitas una plataforma que los comercialice. En España, MyInvestor es la opción más conocida, con acceso a fondos indexados de Vanguard, Amundi, Fidelity y otros. Brokers como DEGIRO no ofrecen fondos indexados.

**ETFs**: los compras en casi cualquier broker con acceso a bolsa europea: Trade Republic, DEGIRO, Interactive Brokers, MyInvestor. Son universales.

---

## Diferencia 5: coste

Durante años, los fondos indexados eran algo más caros que los ETFs equivalentes. Hoy esa brecha casi ha desaparecido: los fondos indexados de Vanguard y Amundi tienen TER muy competitivos, comparables a los de muchos ETFs.

A efectos prácticos, el coste ya no es un criterio que decante la balanza de forma clara. Compara el TER del producto concreto que te interese, pero no esperes diferencias dramáticas entre un buen fondo indexado y un buen ETF sobre el mismo índice.

---

## Tabla comparativa

| Criterio | Fondo indexado | ETF |
|----------|----------------|-----|
| Traspaso sin tributar | Sí | No |
| Precio de compra | NAV de cierre | Mercado en tiempo real |
| Spread | No | Sí (pequeño en los líquidos) |
| Mínimo de inversión | Muy bajo (desde 1 € en MyInvestor) | Una participación (o fraccionado) |
| Aportación automática por importe exacto | Sí | Según broker |
| Disponibilidad de brokers | Limitada (MyInvestor y similares) | Universal |
| Coste (TER) | Bajo | Bajo |
| Fiscalidad de la plusvalía | Al reembolsar | Al vender |

---

## Cuándo elegir cada uno

**Elige fondos indexados si...**
- Valoras poder traspasar entre fondos sin tributar (rebalanceos, cambios de estrategia).
- Quieres automatizar aportaciones por un importe exacto y olvidarte.
- Te basta con MyInvestor como plataforma.
- Prefieres no pensar en precios, spreads ni tipos de orden.

**Elige ETFs si...**
- Tu broker (Trade Republic, DEGIRO) trabaja sobre todo con ETFs.
- Quieres acceso a una variedad de índices más amplia.
- Te interesa la flexibilidad de comprar y vender en tiempo real.
- No prevés traspasar: tu plan es comprar y mantener durante décadas.

Para mucha gente, la respuesta más cómoda es: **fondos indexados como vehículo principal** por la ventaja del traspaso, y ETFs si su broker o su índice preferido lo exige.

---

## El mito: "los ETFs perdieron la ventaja fiscal"

Circula la idea de que "antes los ETFs sí permitían traspaso y lo perdieron". La realidad práctica para el inversor de a pie es más simple: hoy, los ETFs no se benefician del régimen de traspaso entre instituciones de inversión colectiva del que sí gozan los fondos. No lo des por hecho ni planifiques tu cartera asumiendo lo contrario.

Esto no convierte al ETF en mala opción. Si tu plan es comprar un ETF global y mantenerlo 30 años sin tocarlo, nunca activarás un traspaso y la diferencia es irrelevante. El traspaso solo importa si prevés moverte. Conócete a ti mismo y elige en consecuencia.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'interes-compuesto-inversion',
    title: 'Interés compuesto: la única fuerza que necesitas entender',
    excerpt:
      'El interés compuesto explicado con números, no con metáforas: la regla del 72, el ejemplo de los dos hermanos y por qué empezar pronto pesa más que aportar mucho.',
    publishedAt: '2026-05-16',
    readingMinutes: 8,
    keywords: ['interés compuesto', 'interés compuesto inversión', 'regla del 72'],
    content: `# Interés compuesto: la única fuerza que necesitas entender

Hay una frase atribuida a Albert Einstein que dice que el interés compuesto es "la octava maravilla del mundo". Probablemente Einstein nunca la dijo. Pero da igual quién la dijera: la idea que hay detrás es la más importante de toda la inversión, y la que menos gente interioriza de verdad.

Si entiendes el interés compuesto — no la definición, sino lo que implica — habrás entendido el 80 % de por qué invertir pronto y de forma constante funciona. Esta guía lo explica con números, no con metáforas.

---

## Qué es el interés compuesto

Interés simple: ganas un porcentaje sobre tu capital inicial, siempre sobre la misma base.

Interés compuesto: ganas un porcentaje sobre tu capital inicial **y sobre los intereses que ya has generado**. Tus ganancias generan ganancias. Y esas, a su vez, generan más.

Parece un matiz pequeño. No lo es. Es la diferencia entre una línea recta y una curva que se dispara.

---

## Simple vs compuesto: la diferencia en números

Imagina 10 000 € invertidos al 7 % anual, sin aportar nada más.

| Años | Interés simple | Interés compuesto |
|------|----------------|-------------------|
| 10 | 17 000 € | 19 672 € |
| 20 | 24 000 € | 38 697 € |
| 30 | 31 000 € | 76 123 € |
| 40 | 38 000 € | 149 745 € |

Con interés simple, a 40 años habrías ganado 28 000 €. Con interés compuesto, casi 140 000 €. Mismo capital, mismo tipo, mismo tiempo. La única diferencia es que en el segundo caso los intereses se reinvierten.

Esto, en la práctica, es lo que hace un ETF de acumulación: reinvierte automáticamente los dividendos para que el compuesto trabaje sin fricción.

---

## La regla del 72

Un truco mental para estimar el compuesto sin calculadora: divide 72 entre la rentabilidad anual y obtendrás, aproximadamente, los años que tarda tu dinero en duplicarse.

| Rentabilidad anual | Años en duplicar (72 entre el tipo) |
|--------------------|--------------------------------------|
| 4 % | 18 años |
| 6 % | 12 años |
| 7 % | ~10 años |
| 10 % | ~7 años |

A un 7 % anual, 10 000 € se convierten en 20 000 € en una década, en 40 000 € en dos, en 80 000 € en tres. Cada duplicación es mayor que todas las anteriores juntas. Por eso las últimas décadas de tu vida inversora pesan tanto más que las primeras.

---

## El factor que más importa: el tiempo

La intuición dice que para tener más dinero hay que aportar más. Es verdad, pero el tiempo pesa todavía más que la aportación.

Tres personas invierten 200 € al mes al 7 % anual. La única diferencia es cuándo empiezan:

| Empieza a los... | Años aportando | Total aportado | Patrimonio a los 65 |
|------------------|----------------|----------------|---------------------|
| 20 años | 45 | 108 000 € | ~760 000 € |
| 30 años | 35 | 84 000 € | ~360 000 € |
| 40 años | 25 | 60 000 € | ~162 000 € |

Quien empieza a los 20 aporta solo 48 000 € más que quien empieza a los 40, pero termina con casi cinco veces más patrimonio. Los diez o veinte años de ventaja al principio valen más que cualquier esfuerzo de aportación posterior. El tiempo no se puede recuperar.

---

## El ejemplo de los dos hermanos

Es el ejemplo clásico, y sigue siendo el más demoledor.

Dos hermanos. El primero invierte 2 000 € al año desde los 25 hasta los 34 — diez años — y después no aporta ni un euro más. El segundo no hace nada hasta los 35, y entonces invierte 2 000 € al año durante 30 años, hasta los 64.

Los dos obtienen un 7 % anual. ¿Quién tiene más a los 65?

| Hermano | Años aportando | Total aportado | Patrimonio a los 65 |
|---------|----------------|----------------|---------------------|
| El madrugador | 10 (de 25 a 34) | 20 000 € | ~210 000 € |
| El tardío | 30 (de 35 a 64) | 60 000 € | ~189 000 € |

El hermano que aportó la tercera parte del dinero termina con más. No porque hiciera nada especial, sino porque sus aportaciones tuvieron más años para componerse. Empezar diez años antes le ganó a aportar el triple.

---

## Por qué cuesta tanto verlo

El cerebro humano piensa en líneas rectas. El interés compuesto es una curva exponencial, y las curvas exponenciales engañan: durante mucho tiempo parecen casi planas, y de repente se disparan.

Si miras tu cartera a los 3 años de empezar, los números te decepcionarán. La mayor parte de lo que tienes será dinero que tú aportaste; el efecto del compuesto aún es pequeño. Es normal. La parte espectacular de la curva llega en las dos últimas décadas. El error es juzgar la estrategia por los primeros años, aburrirse y abandonar justo antes de que empiece lo bueno.

---

## El compuesto también juega en tu contra: los costes

La misma fuerza que multiplica tu dinero multiplica lo que pagas. Una comisión del 1,5 % anual no te cuesta "un 1,5 %": te cuesta ese porcentaje compuesto durante toda tu vida inversora.

Sobre una cartera mantenida 30 años, la diferencia entre pagar un 1,5 % y un 0,2 % anual puede superar fácilmente los 100 000 € de patrimonio final. El coste no es lineal: es exponencial, igual que la rentabilidad. Por eso los Bogleheads son tan obsesivos con los costes bajos.

---

## Cómo poner el compuesto de tu lado

- **Empieza ya.** El mejor momento fue hace diez años; el segundo mejor es hoy. Cada año que esperas es una duplicación final que pierdes.
- **Automatiza.** Una aportación mensual automática hace que el compuesto trabaje sin depender de tu disciplina.
- **No lo interrumpas.** Sacar dinero, vender en una caída o "parar un tiempo" rompe la cadena. El compuesto necesita continuidad.
- **Reduce las fugas.** Costes altos e impuestos innecesarios cada año son compuesto perdido. Usa vehículos baratos y eficientes; los ETFs de acumulación difieren la fiscalidad.
- **Dale tiempo.** No es una estrategia para tres años. Es para tres décadas.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres ver cuánto puede crecer tu dinero?** Prueba la [calculadora de interés compuesto](/calculadora/interes-compuesto).
**¿Quieres analizar tu cartera con IA?** Usa el [analizador gratis](/analyzer).
`,
  },
  {
    slug: 'dca-vs-lump-sum-aportar-mensual',
    title: 'Aportar cada mes o invertir de golpe: qué dice la evidencia',
    excerpt:
      'Te ha llegado dinero de golpe: invertirlo todo ya o promediar mes a mes. Qué dice la evidencia, por qué gana invertir de golpe y la distinción clave que casi nadie hace.',
    publishedAt: '2026-05-16',
    readingMinutes: 9,
    keywords: ['DCA o lump sum', 'dollar cost averaging', 'invertir de golpe o poco a poco'],
    content: `# Aportar cada mes o invertir de golpe: qué dice la evidencia

Te ha llegado dinero de una vez: una herencia, un finiquito, la venta de un coche, unos ahorros que tenías parados. Y aparece la duda: ¿lo invierto todo ahora o lo voy metiendo poco a poco para "promediar"?

Es una de las preguntas más repetidas entre inversores indexados, y una de las peor entendidas, porque casi nadie distingue dos situaciones que parecen iguales y no lo son. Esta guía aclara qué dice la evidencia y, sobre todo, cuándo aplica.

---

## Las dos estrategias

**Invertir de golpe (lump sum)**: tienes una cantidad disponible y la inviertes entera, de una vez, en cuanto la tienes.

**Promediar (DCA, dollar-cost averaging)**: coges esa misma cantidad y la divides en partes que inviertes a lo largo de varios meses (por ejemplo, una sexta parte cada mes durante seis meses), dejando el resto en efectivo mientras tanto.

Ojo: DCA aquí significa repartir en el tiempo **una suma que ya tienes entera**. No es lo mismo que aportar tu ahorro mensual — volveremos a esto, porque es la confusión clave.

---

## Qué dice la evidencia

Los estudios que han comparado ambas estrategias sobre datos históricos llegan todos a la misma conclusión: **invertir de golpe bate a promediar aproximadamente dos de cada tres veces**.

La razón es simple y poco emocionante: los mercados suben más años de los que bajan. El índice global ha cerrado en positivo en torno al 70-75 % de los años. Si las bolsas tienden a subir, cada mes que tu dinero está en efectivo "esperando su turno" es un mes en el que, de media, te pierdes rentabilidad.

Promediar no es una estrategia mala. Simplemente, de media, cuesta un poco de rentabilidad esperada a cambio de otra cosa.

---

## Por qué gana invertir de golpe

- **El mercado sube más de lo que baja.** El tiempo dentro del mercado, no el momento de entrada, es lo que construye el patrimonio.
- **El efectivo parado tiene un coste de oportunidad.** Mientras una parte de tu dinero espera, no compone. Y el [interés compuesto](/blog/interes-compuesto-inversion) premia cada mes que estás dentro.
- **Esperar un mejor momento casi nunca funciona.** El "mejor momento" solo se conoce a posteriori. Quien espera una caída suele ver cómo el mercado sube sin él.

---

## Entonces, ¿por qué tanta gente promedia?

Porque las personas no somos hojas de cálculo. Promediar no gana en rentabilidad esperada, pero gana en otra cosa: **reduce el peor escenario y el arrepentimiento**.

Si inviertes 60 000 € de golpe el lunes y el mercado cae un 25 % el mes siguiente, el golpe psicológico es brutal — y el riesgo real no es la caída, es que te asustes, vendas y abandones el plan. Promediar suaviza esa posibilidad: si el mercado cae justo después, solo habías metido una fracción, y las siguientes aportaciones compran más barato.

Dicho de otra forma: promediar es un seguro emocional. Pagas una pequeña prima (algo de rentabilidad esperada) a cambio de dormir mejor y de no tomar una decisión catastrófica en el peor momento.

---

## La distinción que lo cambia todo

Aquí está la confusión más extendida. Hay que separar dos situaciones:

**Caso A — Tienes una suma grande disponible hoy.** Aquí sí hay una decisión real: ¿de golpe o promediando? La evidencia dice: de golpe, salvo que el riesgo emocional sea alto (lo vemos abajo).

**Caso B — Inviertes tu ahorro mensual según lo generas.** Ganas 300 € cada mes y los inviertes cada mes. Esto **no es DCA**: es, simplemente, invertir el dinero en cuanto existe. No tienes una suma parada en efectivo esperando. Estás invirtiendo de golpe... cada mes, con lo que tienes. Y es exactamente lo óptimo.

La gran mayoría de inversores indexados están en el caso B y se hacen preguntas del caso A sin necesidad. Si aportas tu nómina mes a mes, no estás "promediando" ni tienes que sentirte mal por ello: estás haciendo lo correcto.

---

## Cuándo promediar sí tiene sentido

Promediar una suma grande es razonable cuando:

- La cantidad es muy grande **en relación con tu patrimonio actual** (te llega una herencia que multiplica por cinco lo que tenías invertido).
- Sabes, siendo honesto contigo mismo, que una caída del 20 % justo después te haría entrar en pánico y vender.
- El seguro emocional vale, para ti, más que la pequeña pérdida de rentabilidad esperada.

En ese caso, promedia — pero hazlo rápido y con fecha de fin. Repartir en 3 a 6 meses es razonable. Estirarlo dos años es, en la práctica, market timing disfrazado.

---

## Lo que nunca es buena idea: esperar

Hay una tercera opción que no es ni invertir de golpe ni promediar: **no invertir y esperar**. Esperar a que el mercado caiga. Esperar a que "se aclare la situación". Esperar a tenerlo más claro.

Esa es, de lejos, la peor estrategia. No tiene una tasa de éxito conocida porque depende de adivinar el futuro, y nadie lo hace de forma consistente. Cada mes en efectivo "hasta que las cosas se calmen" es rentabilidad que no vuelve.

La decisión real nunca es "invertir o esperar". Es "de golpe o promediando". Y las dos te tienen dentro del mercado, que es donde se gana.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'roboadvisors-espana-merecen-comision',
    title: 'Roboadvisors en España: ¿merecen lo que cobran?',
    excerpt:
      'Roboadvisors en España como Indexa, Finizens o las carteras de MyInvestor: qué hacen bien, cuánto cuestan de verdad en 30 años y cómo saber si te compensan frente a hacerlo tú mismo.',
    publishedAt: '2026-05-17',
    readingMinutes: 10,
    keywords: ['roboadvisor España', 'Indexa Capital opiniones', 'roboadvisor o hacerlo tú mismo'],
    content: `# Roboadvisors en España: ¿merecen lo que cobran?

Los roboadvisors hicieron algo importante: convirtieron la inversión indexada en algo accesible para gente que jamás habría abierto un broker. Antes de ellos, invertir en España significaba o bien pasar por la oficina del banco y sus fondos caros, o bien aprender por tu cuenta. Los roboadvisors ofrecieron una tercera vía: indexación, automática, sin saber nada.

Pero esa comodidad tiene un precio. Y la pregunta honesta es si ese precio te compensa a ti. Esta guía la responde sin vender nada — porque la respuesta depende de quién seas.

---

## Qué es un roboadvisor

Un roboadvisor es un servicio que invierte tu dinero por ti en una cartera de fondos indexados. El proceso es siempre parecido: respondes un cuestionario sobre tu situación y tu tolerancia al riesgo, te asignan una cartera (más o menos renta variable según tu perfil) y, a partir de ahí, ellos se encargan de todo: aportaciones, rebalanceos, papeleo.

En España los más conocidos son Indexa Capital, las carteras gestionadas de MyInvestor, Finizens e inbestMe, entre otros.

---

## Qué hacen bien (y es mucho)

Conviene ser justo: los roboadvisors hacen varias cosas realmente bien.

- **Bajan la barrera de entrada.** Para quien nunca habría empezado, un roboadvisor es la diferencia entre invertir y no invertir. Y no invertir es siempre el peor resultado.
- **Eliminan las decisiones emocionales.** No hay un botón fácil para vender en pánico. La cartera sigue su curso.
- **Rebalancean por ti.** Mantienen los pesos objetivo sin que tengas que tocar nada.
- **Usan fondos indexados con traspaso.** Suelen montar la cartera con fondos, no con ETFs, lo que permite eficiencia fiscal en los rebalanceos internos.
- **Automatizan el papeleo.** Informes fiscales listos, aportaciones periódicas, cero fricción.

Para mucha gente, todo esto junto vale su precio. No lo dudes.

---

## El coste real: lo que cobran de verdad

Aquí está el matiz. Un roboadvisor cobra una **comisión de gestión por encima del coste de los fondos que hay dentro de tu cartera**. Tu coste total tiene varias capas:

- La comisión de gestión del roboadvisor.
- La comisión de custodia (del depositario).
- El TER de los fondos indexados subyacentes.

Sumando todo, el coste total suele moverse, de forma aproximada, **entre el 0,40 % y el 0,70 % anual**, según el roboadvisor y el tamaño de tu cartera (las cifras exactas cambian: confírmalas siempre en su web). No es caro comparado con un fondo de banco al 1,5-2 %. Pero sí es más caro que hacerlo tú.

---

## Cuánto cuesta esa comodidad en 30 años

Un 0,5 % anual suena a nada. El problema es que, igual que la rentabilidad, los costes se componen.

Comparemos dos formas de invertir 100 000 € durante 30 años, asumiendo un 7 % de rentabilidad bruta anual:

| Vía | Coste anual aproximado | Patrimonio a 30 años |
|-----|------------------------|----------------------|
| Hazlo tú mismo (un ETF global) | ~0,15 % | ~730 000 € |
| Roboadvisor | ~0,60 % | ~645 000 € |

La diferencia ronda los **85 000 €**, por menos de medio punto porcentual de coste anual. Eso es lo que pagas, en dinero real, por la comodidad — y es una cifra que conviene mirar de frente antes de decidir. Es el mismo mecanismo que explicamos en la guía del [interés compuesto](/blog/interes-compuesto-inversion): el coste también se compone.

(Cálculo ilustrativo con cifras redondas; tu caso variará.)

---

## Cuándo SÍ vale la pena un roboadvisor

Sé honesto contigo mismo al responder esto. Un roboadvisor te compensa si:

- La alternativa real, para ti, es **no invertir**. Una cartera con un 0,6 % de coste siempre gana a un 0 % invertido.
- Sabes que, por tu cuenta, acabarías **escogiendo acciones sueltas, persiguiendo modas o vendiendo en la próxima caída**. El roboadvisor te protege de ti mismo, y eso vale dinero.
- De verdad **no vas a dedicar** los veinte minutos al año que pide una cartera indexada propia. No el "no quiero", sino el "me conozco y no lo voy a hacer".

Un roboadvisor que te mantiene invertido y disciplinado bate a una cartera "perfecta" que montas tú y abandonas a los dos años. La mejor estrategia es la que de verdad sigues.

---

## Cuándo no lo necesitas

Si has llegado hasta aquí leyendo sobre TER, traspasos y rebalanceo, probablemente no eres el cliente para quien el roboadvisor es imprescindible.

Hacerlo tú mismo, hoy, es muy sencillo:

- Abres un broker (Trade Republic, MyInvestor).
- Compras **un** fondo o ETF global de renta variable.
- Configuras una aportación mensual automática.
- No tocas nada y rebalanceas una vez al año si tienes más de un activo.

Eso es, en esencia, lo mismo que hace un roboadvisor — por una fracción del coste. La parte "robo" no es magia: es una cartera indexada con un cuestionario delante.

---

## Roboadvisor vs hacerlo tú: tabla

| Criterio | Roboadvisor | Hazlo tú mismo |
|----------|-------------|----------------|
| Esfuerzo inicial | Mínimo | Una tarde de aprender |
| Esfuerzo anual | Cero | ~20 minutos |
| Coste total anual | ~0,40-0,70 % | ~0,10-0,20 % |
| Rebalanceo | Automático | Manual (o con aportaciones) |
| Riesgo de error de principiante | Bajo | Medio (se aprende rápido) |
| Protección frente a tus emociones | Alta | Depende de ti |

---

## Conclusión

Un roboadvisor no es una estafa ni un atajo: es un servicio de comodidad y disciplina. Para quien no invertiría de otra forma, es una de las mejores cosas que le pueden pasar a su dinero. Para quien está dispuesto a dedicar una tarde a aprender y veinte minutos al año a mantener, es una comisión evitable que, compuesta durante décadas, cuesta una cifra de cinco dígitos.

La pregunta no es "son buenos los roboadvisors". Es "cuál de los dos tipos de inversor soy yo". Respóndela con honestidad y la decisión se vuelve obvia.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres ver cuánto pagas de comisiones?** Analiza tu cartera con el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'que-hacer-cuando-el-mercado-cae',
    title: 'El mercado cae un 30 %: qué hacer (y qué no)',
    excerpt:
      'Tarde o temprano verás tu cartera caer un 30 %. Qué hacer y qué no durante un crash de bolsa, por qué vender es el único error grave y cómo prepararte antes de que llegue.',
    publishedAt: '2026-05-17',
    readingMinutes: 9,
    keywords: ['qué hacer cuando cae la bolsa', 'crash bolsa', 'caída del mercado inversión'],
    content: `# El mercado cae un 30 %: qué hacer (y qué no)

En algún momento de tu vida como inversor, abrirás la aplicación del broker y verás tu cartera un 20, un 30 o un 40 % por debajo de donde estaba. No es una posibilidad remota. Es una certeza. Pasará varias veces.

La buena noticia es que la caída, en sí, no es el verdadero riesgo. El verdadero riesgo es lo que hagas durante ella. Esta guía es para que, cuando llegue, ya sepas qué hacer — porque decidirlo en mitad del pánico es decidirlo mal.

---

## Las caídas son normales, no excepcionales

El mercado no sube en línea recta. Caer es parte de cómo funciona. De forma aproximada:

- Una corrección del 10 % ocurre, de media, casi cada año.
- Un mercado bajista (caída del 20 % o más) aparece cada pocos años.
- Una caída severa (30 % o más) la vivirás varias veces a lo largo de tu vida inversora.

No hace falta irse lejos para verlo: el pinchazo de las puntocom en 2000, la crisis financiera de 2008, el desplome del COVID en 2020, el año duro de 2022. Cada una de esas caídas parecía, en su momento, el fin de algo. Y de cada una de ellas el mercado global terminó recuperándose y marcando nuevos máximos.

Una caída no es una anomalía que rompe el plan. Es un evento previsto que el plan ya tenía en cuenta.

---

## Por qué duele tanto

Si las caídas son normales y el mercado se recupera, ¿por qué cuesta tanto soportarlas? Por cómo está cableado el cerebro humano.

- **La aversión a la pérdida.** Perder duele, en términos psicológicos, alrededor del doble de lo que agrada ganar la misma cantidad. Un -30 % no se siente como un +30 %: se siente mucho peor.
- **El ruido lo amplifica.** En una caída, los titulares, las redes y las conversaciones hablan de lo mismo, en tono catastrófico, todo el día. Tu cabeza interpreta esa repetición como peligro real.
- **Ver el número.** Mirar la cartera en rojo cada hora convierte una pérdida sobre el papel en una experiencia emocional constante.

Saber que es el cerebro, y no la realidad, quien grita "vende" ya te da una ventaja sobre el inversor medio.

---

## El error que destruye carteras: vender

Solo hay una forma fiable de que una caída del mercado te haga daño permanente: vender mientras dura.

Mientras no vendes, la pérdida es sobre el papel. La cartera ha bajado, pero sigues teniendo el mismo número de participaciones, de las mismas empresas. Si vendes, conviertes esa pérdida en definitiva y, además, te quedas fuera.

Y quedarte fuera es carísimo, porque las recuperaciones son **rápidas y concentradas**. Los mejores días de bolsa suelen estar agrupados muy cerca de los peores, a menudo en plena crisis. Si te pierdes solo un puñado de las mejores jornadas de una década por haber salido "hasta que se calme", tu rentabilidad final se desploma. El que vende en el pánico casi nunca acierta a volver a tiempo.

---

## Qué hacer, en orden

1. **Nada.** Literalmente. Cierra la aplicación. No mires la cartera cada día. La inacción es una decisión activa y, casi siempre, la correcta.
2. **Mantén tus aportaciones automáticas.** Si aportabas cada mes, sigue. Ahora estás comprando las mismas empresas más baratas. Una caída es una rebaja para quien está acumulando.
3. **Si tienes liquidez y convicción, podrías incluso aportar más** — pero solo con dinero que no necesites y sin intentar adivinar el suelo. Nadie toca fondo a propósito.
4. **Rebalancea si tu plan lo pide.** Rebalancear tras una caída de la renta variable te lleva, de forma mecánica, a comprar lo que ha bajado. Disciplina, no intuición.
5. **Aprende para la próxima.** Si esta caída te ha hecho perder el sueño, tu cartera tenía más riesgo del que de verdad toleras. Eso se corrige ajustando la proporción de renta variable y fija — pero después, en calma, no ahora.

---

## La caída es una buena noticia si estás acumulando

Esto es contraintuitivo, pero es matemática pura. Si te quedan años o décadas de aportaciones por delante, las caídas te benefician: compras más participaciones por el mismo dinero.

El inversor que debería preocuparse por una caída no es el joven que aporta cada mes — para él es una oferta. Es el que está a punto de empezar a vivir de su cartera. Y eso nos lleva al único caso que de verdad importa.

---

## Cuándo una caída sí debe preocuparte

Si estás cerca de la jubilación, o ya retirando dinero de tu cartera, una caída severa al principio de esa etapa es un riesgo real: es el llamado riesgo de secuencia de retornos. Vender participaciones baratas para vivir, en mitad de una caída, sí puede dañar el capital de forma duradera.

Pero — y esto es clave — ese riesgo se gestiona **antes**, no durante. Se gestiona con la asignación de activos: más renta fija y liquidez a medida que te acercas a necesitar el dinero, un colchón que te permita no vender renta variable en el peor momento. Si llegas a la caída con el reparto adecuado, no es una emergencia. Es un martes cualquiera.

---

## Prepárate ahora, no entonces

La decisión de cómo reaccionar a una caída no se toma durante la caída. Se toma hoy, en frío:

- Escribe, en una nota, qué harás cuando el mercado caiga un 30 %: "No vender. Mantener aportaciones. Rebalancear." Léela cuando llegue el momento.
- Elige una proporción de renta variable y fija que puedas soportar viendo números rojos, no solo en una hoja de cálculo.
- Automatiza las aportaciones para que no dependan de cómo te sientas ese mes.

El mercado va a caer. Tu plan ya lo sabe. Tú también, ahora.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'como-rebalancear-cartera-indexada',
    title: 'Cómo y cuándo rebalancear tu cartera indexada',
    excerpt:
      'Cómo y cuándo rebalancear tu cartera indexada: rebalanceo por calendario, por bandas y con aportaciones, y cómo hacerlo en España sin pagar IRPF de más.',
    publishedAt: '2026-05-18',
    readingMinutes: 8,
    keywords: ['rebalancear cartera', 'rebalanceo ETF', 'cómo rebalancear cartera indexada'],
    content: `# Cómo y cuándo rebalancear tu cartera indexada

Defines tu cartera: 80 % renta variable, 20 % renta fija. Pasa un año bueno de bolsa y, sin que hayas tocado nada, te encuentras con un 87 / 13. Tu cartera ha cambiado de perfil de riesgo sola. Rebalancear es la operación que la devuelve a donde tú decidiste que debía estar.

Es una de las pocas tareas de mantenimiento que pide una cartera indexada. Esta guía explica por qué importa, los métodos para hacerlo y — sobre todo — cómo hacerlo en España sin regalarle dinero a Hacienda.

---

## Qué es rebalancear

Rebalancear es devolver tu cartera a sus pesos objetivo. Si decidiste 80/20 y la deriva del mercado te ha llevado a 87/13, rebalancear significa volver al 80/20: reduciendo lo que pesa de más, reforzando lo que pesa de menos, o ambas cosas.

---

## Por qué se desajusta una cartera

No hace falta hacer nada para que una cartera se desequilibre. Sus componentes crecen a ritmos distintos. En un año alcista, la renta variable sube mucho más que la renta fija, así que su peso relativo aumenta. En una caída, ocurre lo contrario. La cartera "deriva" sola, alejándose del reparto que elegiste.

---

## Por qué rebalancear importa

**Control del riesgo (la razón principal).** Si dejas correr la deriva, después de unos años de bolsa alcista tendrás mucho más riesgo del que decidiste asumir — justo a tiempo para la siguiente caída. Rebalancear mantiene tu cartera en el nivel de riesgo que tú escogiste, no en el que el mercado te ha empujado.

**Disciplina de comprar barato.** Rebalancear te obliga, de forma mecánica, a recortar lo que ha subido y reforzar lo que ha bajado. Es lo contrario de lo que pide el instinto. No lo haces porque adivines nada: lo haces porque toca.

---

## Los dos métodos clásicos

**Por calendario.** Rebalanceas en una fecha fija, una o dos veces al año. Sencillo, predecible, fácil de recordar. Para la mayoría de inversores, una vez al año es más que suficiente.

**Por bandas.** Rebalanceas solo cuando un activo se desvía de su objetivo más de un umbral que tú fijas (por ejemplo, 5 puntos porcentuales). Mientras la desviación sea menor, no tocas nada. Es algo más eficiente, pero exige vigilar la cartera.

¿Cuál es mejor? Para casi todo el mundo, da bastante igual. El error grave es no rebalancear nunca, no elegir mal el método. Una revisión anual por calendario es simple y suficiente.

---

## El método que casi nadie menciona: rebalancear con aportaciones

Si todavía estás en fase de acumulación — es decir, sigues metiendo dinero cada mes — tienes a tu disposición el mejor método de todos, y es el que menos se explica.

En lugar de vender el activo que pesa de más, **dirige tus nuevas aportaciones al activo que pesa de menos** hasta que los pesos vuelvan a su sitio.

Las ventajas son enormes:

- **No vendes nada**, así que no generas ningún coste fiscal.
- **No pagas comisiones** de venta.
- Rebalanceas y aportas en el mismo gesto.

Para un inversor joven que aporta con regularidad, rebalancear con aportaciones resuelve el desajuste casi siempre sin necesidad de vender una sola participación. Es la opción por defecto.

---

## El coste fiscal de rebalancear en España

Aquí está la trampa que mucha gente pasa por alto. Rebalancear vendiendo tiene consecuencias fiscales.

Si rebalanceas **vendiendo un ETF** con plusvalía, esa ganancia tributa en tu IRPF de ese año, aunque el dinero se quede dentro de tu cartera. Rebalancear a base de ventas, año tras año, va dejando un reguero de impuestos que frena el interés compuesto.

Dos formas de evitarlo:

- **Rebalancea con aportaciones** siempre que puedas (el método de arriba). Sin venta, sin impuesto.
- Si inviertes mediante **fondos indexados**, el traspaso entre fondos no tributa: puedes rebalancear moviendo dinero de un fondo a otro sin pasar por Hacienda. Es una de las grandes ventajas del fondo frente al ETF, como vimos en la [comparativa de fondos indexados y ETFs](/blog/fondos-indexados-vs-etfs-espana) y en la [guía de fiscalidad](/blog/fiscalidad-etfs-espana-guia-completa).

---

## Cuándo no hace falta rebalancear

No te obsesiones. Rebalancear aplica **entre clases de activo o entre regiones que tú has separado a propósito**: renta variable contra renta fija, o un ETF de Europa contra uno de EE. UU. que hayas decidido llevar por separado.

Si toda tu cartera es **un único ETF global** (por ejemplo, 100 % VWCE), no tienes nada que rebalancear: el propio índice se reajusta por dentro según la capitalización de cada empresa. No hay tarea de mantenimiento. Esa es, de hecho, una de las bellezas de la cartera de un solo fondo.

---

## Guía práctica paso a paso

1. **Ten claros tus pesos objetivo.** No puedes rebalancear hacia un destino que no has definido.
2. **Elige una fecha fija al año** para revisar. El cumpleaños, enero, lo que recuerdes.
3. **Mira la desviación real.** ¿Cuánto se ha alejado cada activo de su objetivo?
4. **Corrige primero con aportaciones.** Dirige el dinero nuevo al activo rezagado.
5. **Vende solo como último recurso**, consciente del coste fiscal, y prioriza vehículos con traspaso si los tienes.
6. **Apúntalo y olvídate** hasta el año que viene.

Rebalancear bien es aburrido, rápido y poco frecuente. Así debe ser.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres ver cómo está repartida tu cartera?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'plan-de-pensiones-vs-fondo-indexado',
    title: 'Plan de pensiones o fondo indexado: qué te conviene en España',
    excerpt:
      'Plan de pensiones o fondo indexado: la desgravación frente a la liquidez. Cómo tributan, las tres trampas del plan de pensiones y a quién le conviene cada uno en España.',
    publishedAt: '2026-05-18',
    readingMinutes: 10,
    keywords: ['plan de pensiones vs fondo indexado', 'plan de pensiones merece la pena', 'plan de pensiones o fondo indexado'],
    content: `# Plan de pensiones o fondo indexado: qué te conviene en España

El plan de pensiones se vende, desde hace décadas, como EL producto para la jubilación. Tu banco te lo ofrece cada diciembre, con la promesa de desgravar en la declaración. Y desgravar suena bien. Pero la pregunta no es si desgrava: es si, sumando todo, te conviene a ti frente a la alternativa de un fondo indexado o un ETF.

La respuesta no es un sí ni un no. Depende de tu situación. Esta guía te da el marco para decidir.

---

## Cómo funciona un plan de pensiones

Un plan de pensiones tiene tres rasgos que lo definen:

- **Desgrava a la entrada.** Lo que aportas reduce tu base imponible general en el IRPF. Es decir, te ahorras hoy tu tipo marginal sobre lo aportado.
- **Tributa a la salida.** Cuando lo rescatas, todo lo que sacas (lo aportado y lo ganado) tributa como **rendimiento del trabajo**, a tu tipo marginal de ese momento.
- **Es ilíquido.** En general no puedes recuperar el dinero hasta la jubilación, salvo contingencias concretas (desempleo de larga duración, enfermedad grave) y, desde 2025, las aportaciones con más de diez años de antigüedad.

Además, hay un límite: puedes aportar como máximo **1 500 € al año** a planes individuales (los planes de empleo de la empresa permiten sumar más).

---

## La ventaja real: el diferimiento fiscal

La gracia del plan de pensiones es que inviertes dinero **antes de impuestos**. Si tu tipo marginal es del 37 % y aportas 1 500 €, Hacienda te devuelve 555 € en la declaración. En la práctica, has invertido 1 500 € habiendo "puesto" tú solo 945 €.

Ese dinero extra trabajando desde el principio es una ventaja real. El truco está en que no es dinero regalado: es un impuesto **aplazado**, no perdonado. Lo pagarás al rescatar.

---

## Las tres trampas que el banco no subraya

**1. El límite de 1 500 € al año es minúsculo.** No puedes construir tu independencia financiera solo con un plan de pensiones individual. Da para un complemento, no para el plato principal.

**2. Tributa a la salida como rendimiento del trabajo.** Esta es la más importante y la peor entendida. Las plusvalías de un fondo indexado o un ETF tributan en la base del ahorro (del 19 % al 28 %). El rescate de un plan de pensiones tributa en la base general, junto a tu sueldo o tu pensión, a tipos marginales que pueden ser bastante más altos. Y si rescatas mucho de golpe, tú mismo te empujas a los tramos altos. Mal planificado, el rescate puede comerse buena parte de la desgravación que tanto te vendieron.

**3. No puedes tocarlo.** El fondo indexado es líquido: si lo necesitas, lo vendes. El plan de pensiones está bloqueado hasta la jubilación. Para quien busca libertad financiera antes de la edad legal de jubilación, esto lo descarta como vehículo principal.

A esto se añade, en muchos planes de banco, un cuarto problema: **comisiones altísimas**. Planes de pensiones con costes del 1,5 % anual o más siguen siendo habituales, y eso, compuesto durante décadas, destruye buena parte del beneficio fiscal.

---

## El plan de pensiones indexado: la versión moderna

Si decides usar un plan de pensiones, que sea uno **indexado y de bajo coste**. Hoy existen planes de pensiones que replican índices globales con comisiones razonables, muy lejos de los planes tradicionales de banco. Un plan de pensiones caro es de las peores decisiones financieras posibles; uno indexado y barato es una herramienta defendible.

La regla es la misma de siempre: el coste manda. Un plan de pensiones con un 1,5 % de comisión anual rara vez compensa, por mucho que desgrave.

---

## La alternativa: fondo indexado o ETF

Frente al plan de pensiones, un fondo indexado o un ETF global ofrece:

- **Sin límite de aportación.** Inviertes lo que quieras y puedas.
- **Liquidez total.** El dinero es tuyo y disponible cuando lo necesites.
- **Las ganancias tributan en la base del ahorro** (19-28 %), normalmente más favorable que la base general.
- Si usas fondos indexados, **traspaso entre fondos sin tributar**.

¿Qué pierdes? La desgravación a la entrada. No es poco — pero hay que ponerlo en la balanza con todo lo demás.

---

## Comparativa

| Criterio | Plan de pensiones | Fondo indexado / ETF |
|----------|-------------------|----------------------|
| Desgrava al aportar | Sí (base general) | No |
| Límite de aportación | 1 500 €/año (individual) | Sin límite |
| Liquidez | Bloqueado hasta la jubilación | Total |
| Fiscalidad al recuperar | Base general (trabajo) | Base del ahorro (19-28 %) |
| Útil para FIRE antes de los 60 | No | Sí |
| Riesgo de comisiones altas | Alto (elige indexado) | Bajo |

---

## La comparación honesta: ¿a quién le conviene cada uno?

Todo se reduce a comparar dos tipos marginales: el que te ahorras **hoy** al aportar y el que pagarás **al rescatar**.

- La desgravación es más valiosa cuanto **más alto sea tu tipo marginal actual**. Si ganas un buen sueldo y aportas en el tramo alto, el ahorro fiscal inmediato es jugoso.
- La desgravación es menos atractiva si tu tipo marginal hoy es bajo. Para alguien joven, al principio de su carrera y con un salario modesto, te ahorras poco al aportar y, encima, encadenas el dinero hasta la jubilación. En ese perfil, el fondo indexado — líquido y con fiscalidad de ahorro — suele ganar.

Regla práctica: el plan de pensiones indexado tiene sentido sobre todo para quien tributa hoy a un tipo marginal alto y espera tener un tipo más bajo en la jubilación. Para el resto, conviene como mucho como complemento pequeño.

---

## Una estrategia mixta

No es obligatorio elegir bando. Una combinación habitual y razonable:

- Aportar los **1 500 € al año** al plan de pensiones **indexado**, si tu tipo marginal hace que la desgravación valga la pena.
- Invertir **el grueso de tu ahorro** en fondos indexados o ETFs, que no tienen límite y son líquidos.

Así aprovechas la desgravación dentro de su pequeño límite sin renunciar a la liquidez y la flexibilidad del resto.

---

## Si tu objetivo es el FIRE

Un apunte final importante para quien persigue la independencia financiera y el retiro anticipado. El plan de pensiones está bloqueado hasta la edad legal de jubilación. Por tanto, **no puede financiar la parte de tu vida entre el momento en que dejas de trabajar y esa edad legal**.

El dinero con el que pienses vivir un retiro anticipado tiene que estar en vehículos líquidos: fondos indexados y ETFs. El plan de pensiones, en su caso, es un complemento para la etapa posterior. Lo desarrollamos en la [guía de FIRE en España](/blog/fire-espana-cuanto-necesitas).

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'que-es-el-msci-world',
    title: 'Qué es el MSCI World y por qué tanta gente invierte en él',
    excerpt:
      'Qué es el índice MSCI World, qué empresas y países incluye, en qué se diferencia del FTSE All-World y del S&P 500, y qué ETFs lo replican para un inversor español.',
    publishedAt: '2026-05-18',
    readingMinutes: 8,
    keywords: ['qué es el MSCI World', 'índice MSCI World', 'MSCI World ETF'],
    content: `# Qué es el MSCI World y por qué tanta gente invierte en él

Si has empezado a informarte sobre inversión indexada, te habrás topado con tres letras y una palabra por todas partes: MSCI World. Está detrás de algunos de los ETFs más populares de Europa y es, para muchísimos inversores, el único índice que necesitan conocer.

Pero "MSCI World" se nombra mucho más de lo que se explica. Esta guía aclara qué es exactamente, qué contiene, qué deja fuera y en qué se diferencia de sus alternativas.

---

## Qué es un índice (en 30 segundos)

Un índice es una lista de empresas construida según unas reglas, que sirve para medir cómo se comporta un trozo del mercado. El IBEX 35 mide las 35 mayores empresas españolas. El S&P 500, las 500 mayores de Estados Unidos.

Un índice, por sí solo, no se puede comprar: es una medida, no un producto. Lo que compras es un fondo o un ETF que **replica** ese índice, intentando contener las mismas empresas en las mismas proporciones.

---

## Qué es el MSCI World

El MSCI World es un índice elaborado por MSCI (Morgan Stanley Capital International) que reúne las empresas grandes y medianas de los **países desarrollados** del mundo.

En cifras aproximadas:

- Alrededor de 1 400 empresas.
- 23 países desarrollados.
- Cubre en torno al 85 % de la capitalización bursátil de cada uno de esos mercados.

Cuando compras un ETF sobre el MSCI World, en una sola operación posees un trocito de unas 1 400 de las mayores empresas del mundo desarrollado: Apple, Microsoft, Nestlé, ASML, Toyota, LVMH y mil cuatrocientas más.

---

## Qué países incluye (y cuáles no)

El MSCI World cubre 23 mercados clasificados como "desarrollados" por MSCI: Estados Unidos, Japón, Reino Unido, Canadá, Francia, Alemania, Suiza, Australia, Países Bajos, España, Italia y otros.

Lo que **no** incluye es igual de importante: el MSCI World **no contiene mercados emergentes**. Nada de China, India, Brasil, Taiwán o Corea del Sur. Para esos países, MSCI tiene un índice aparte, el MSCI Emerging Markets.

Un detalle que sorprende a muchos: pese a llamarse "World" (mundo), el MSCI World deja fuera a buena parte de la población mundial. Es "el mundo desarrollado", no el mundo entero.

---

## El peso de Estados Unidos

Si miras la composición del MSCI World, lo primero que llama la atención es cuánto pesa Estados Unidos: alrededor del **70 %** del índice.

No es un error ni un sesgo del diseño. El índice pondera las empresas por capitalización bursátil (cuánto valen en bolsa), y las empresas estadounidenses son, hoy, las más grandes del mundo. El MSCI World simplemente refleja esa realidad.

Consecuencia práctica: invertir en el MSCI World es, en gran medida, invertir en Estados Unidos, con Europa y Japón como acompañantes. Que eso te parezca bien o no es una decisión tuya — pero conviene saberlo antes, no después.

---

## MSCI World vs FTSE All-World vs S&P 500

Estos tres índices se confunden constantemente. La diferencia esencial:

| Índice | Qué cubre | Emergentes | Nº de empresas |
|--------|-----------|------------|----------------|
| S&P 500 | Solo EE. UU. (grandes) | No | ~500 |
| MSCI World | Mundo desarrollado | No | ~1 400 |
| FTSE All-World | Desarrollado + emergente | Sí | ~3 600 |

- El **S&P 500** es el más estrecho: solo grandes empresas de Estados Unidos.
- El **MSCI World** añade Europa, Japón y el resto del mundo desarrollado.
- El **FTSE All-World** va un paso más allá e incluye también los mercados emergentes.

Ninguno es "el correcto". Son tres niveles distintos de amplitud. Lo comparamos en detalle en la guía de [VWCE vs CSPX vs IWDA](/blog/vwce-vs-cspx-vs-iwda).

---

## Qué ETFs replican el MSCI World

Para un inversor español, el MSCI World se compra a través de ETFs UCITS domiciliados en Europa. El más conocido es el IWDA (iShares Core MSCI World), uno de los ETFs más grandes de Europa, con un TER del 0,20 %. Existen alternativas equivalentes de otras gestoras.

Una estrategia habitual entre inversores que quieren cubrir también los emergentes es combinar un ETF de MSCI World con uno de MSCI Emerging Markets, en una proporción aproximada de 88/12, reconstruyendo así algo parecido al FTSE All-World con control de pesos.

---

## ¿Es suficiente el MSCI World para una cartera?

Para muchísimos inversores, sí. Un único ETF sobre el MSCI World ya es una cartera enormemente diversificada: 1 400 empresas, 23 países, todos los sectores.

Sus dos "peros" conocidos:

1. **No incluye emergentes.** Si crees que China, India y compañía deben estar en tu cartera, necesitas añadirlos aparte (o usar directamente un FTSE All-World).
2. **Concentra mucho en EE. UU.** El ~70 % en un solo país es una característica, no un fallo — pero debes estar de acuerdo con ella.

Si esas dos cosas te encajan, el MSCI World cumple de sobra como núcleo de una cartera indexada. Y si no, ya sabes qué alternativas mirar.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'como-empezar-a-invertir-poco-dinero',
    title: 'Cómo empezar a invertir con poco dinero (50 € al mes)',
    excerpt:
      'No necesitas un capital grande para empezar a invertir. Cómo empezar con 50 € al mes, por qué la constancia importa más que la cantidad y los pasos concretos para tu primera aportación.',
    publishedAt: '2026-05-18',
    readingMinutes: 8,
    keywords: ['empezar a invertir poco dinero', 'invertir 50 euros al mes', 'cómo empezar a invertir'],
    content: `# Cómo empezar a invertir con poco dinero (50 € al mes)

"Empezaré a invertir cuando tenga más dinero." Es una de las frases que más caro le sale a la gente, y casi siempre es una excusa disfrazada de prudencia. La verdad incómoda es que, para empezar a invertir bien, no necesitas un capital grande. Necesitas empezar.

Esta guía es para quien puede apartar poco — 50 €, 100 € al mes — y cree que eso es "demasiado poco para que merezca la pena". No lo es. Y aquí están los números y los pasos para demostrarlo.

---

## Por qué la cantidad importa menos de lo que crees

La intuición dice que invertir 50 € al mes es casi inútil. Los números dicen otra cosa.

50 € al mes, a un 7 % de rentabilidad media anual:

| Años | Total aportado | Valor estimado |
|------|----------------|----------------|
| 10 | 6 000 € | ~8 700 € |
| 20 | 12 000 € | ~26 000 € |
| 30 | 18 000 € | ~61 000 € |
| 40 | 24 000 € | ~131 000 € |

Apartar 50 € al mes durante 40 años — algo al alcance de casi cualquiera — puede convertirse en más de 130 000 €, habiendo aportado 24 000 € de tu bolsillo. El resto, más de 100 000 €, lo pone el [interés compuesto](/blog/interes-compuesto-inversion).

---

## Lo que de verdad importa al principio: el hábito

Cuando empiezas con poco, el rendimiento de los primeros años es casi irrelevante en términos absolutos. Un 10 % sobre 600 € son 60 €. No te va a cambiar la vida.

Lo que sí te cambia la vida es **instalar el hábito**. Los primeros meses de invertir no van de ganar dinero: van de demostrarte que puedes apartar una cantidad cada mes, automatizarla y no tocarla. Esa rutina es el activo más valioso que construyes al principio — más que el dinero en sí.

Por eso empezar con 50 € siendo constante es infinitamente mejor que esperar a "poder" empezar con 500 € algún día.

---

## El coste de esperar

Cada año que retrasas el comienzo no es un año "neutro": es una de las duplicaciones finales que pierdes, y es la más grande, porque es la última.

Una persona que invierte 50 € al mes desde los 20 años llega a los 60 con bastante más del doble que otra que invierte exactamente lo mismo desde los 30. Misma aportación mensual, misma rentabilidad. La única diferencia son diez años. "Empezar tarde con más" casi nunca alcanza a "empezar pronto con poco".

---

## Los pasos concretos para empezar

**1. Asegura lo básico primero.** Antes de invertir, ten un pequeño colchón de emergencia (unos meses de gastos) en una cuenta accesible, y no arrastres deudas caras (tarjetas, créditos al consumo). Invertir al 7 % mientras pagas un 20 % de intereses no tiene sentido.

**2. Decide cuánto puedes apartar.** No el máximo heroico que aguantarás dos meses: una cantidad cómoda que puedas mantener pase lo que pase. 50 € está bien. 30 € está bien. Lo importante es que sea sostenible.

**3. Abre un broker.** En España, opciones habituales para empezar con poco son Trade Republic o MyInvestor. Abrir cuenta es gratis. Tienes los criterios para elegir en la guía de [cómo elegir tu primer ETF](/blog/como-elegir-tu-primer-etf-espana-2026).

**4. Elige UN producto global.** Para la inmensa mayoría, un único fondo o ETF de renta variable global es más que suficiente para empezar. No necesitas cinco. Uno, global y barato.

**5. Automatiza la aportación.** Configura una orden periódica (Trade Republic la llama "plan de ahorro") para que cada mes se invierta tu cantidad sin que tengas que hacer ni decidir nada.

**6. No mires y no toques.** Una vez automatizado, tu trabajo es no estorbar. No mires la cartera cada semana. No la pares en la primera caída. Déjala trabajar.

---

## Errores típicos de quien empieza con poco

- **Esperar a tener más.** El error original. El momento es ahora, con lo que haya.
- **Querer "recuperar el tiempo" con riesgo.** Empezar tarde no se arregla comprando cosas más arriesgadas. Se arregla aportando y esperando.
- **Parar a la primera caída.** Si el mercado cae y tú dejas de aportar, te pierdes justo las compras más baratas.
- **Cambiar de estrategia cada mes.** Elegir un producto global y mantenerlo bate a saltar de idea en idea.
- **Pagar comisiones altas.** Con poco capital, una comisión fija por operación se come un porcentaje enorme. Usa brokers sin comisión de compra.

Empezar con poco no es empezar en desventaja. Es, simplemente, empezar. Y empezar es, con diferencia, la parte más difícil y la más importante.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
`,
  },
  {
    slug: 'mejores-etfs-espana-2026',
    title: 'Mejores ETFs para invertir en España 2026: la lista definitiva',
    excerpt:
      'Los 10 ETFs UCITS más recomendados para el inversor residente en España en 2026: criterios de selección, TER real, domicilio fiscal y para qué perfil encaja cada uno.',
    publishedAt: '2026-05-21',
    readingMinutes: 12,
    keywords: ['mejores ETFs España 2026', 'qué ETF comprar España', 'ETF recomendado inversor español'],
    faq: [
      {
        q: '¿Cuál es el mejor ETF para un inversor español en 2026?',
        a: 'No existe un único "mejor" ETF universal, pero para simplificar: VWCE (Vanguard FTSE All-World, acumulación, IE, TER 0,22%) es la opción todo-en-uno más recomendada por su diversificación global, domicilio irlandés y acumulación. Para quienes prefieren solo EE.UU., CSPX o SPXS son las opciones más eficientes en TER.',
      },
      {
        q: '¿Qué criterios son más importantes para elegir un ETF en España?',
        a: 'Los cuatro criterios clave son: (1) Domicilio en Irlanda (ISIN IE...) para máxima eficiencia fiscal; (2) Clase acumulación para diferir la tributación de dividendos; (3) TER bajo, idealmente inferior al 0,25% para renta variable global; (4) Réplica física (no sintética) para mayor seguridad del patrimonio.',
      },
      {
        q: '¿Dónde puedo comprar ETFs UCITS en España?',
        a: 'Los principales brokers para ETFs UCITS en España en 2026 son: Trade Republic (sin comisión de compra, ideal para aportaciones periódicas), DEGIRO (comisiones bajas, amplio catálogo), MyInvestor (permite también fondos indexados con traspaso libre) e Interactive Brokers (para patrimonios mayores). Todos permiten comprar ETFs domiciliados en Irlanda.',
      },
    ],
    content: `# Mejores ETFs para invertir en España 2026: la lista definitiva

No existe un único "mejor ETF". Existe el mejor ETF para tu objetivo, tu horizonte temporal y tu situación fiscal. Esta guía selecciona los 10 ETFs que más aparecen en las carteras de los inversores indexados españoles, explica por qué y te ayuda a elegir entre ellos.

**Criterios de selección**: TER bajo, UCITS domiciliado en Irlanda (eficiencia fiscal óptima para residente en España), alta liquidez (AUM >1.000 M€), disponibilidad en los brokers más usados en España y acumulación (por eficiencia fiscal a largo plazo).

---

## Los 10 ETFs más recomendados para España en 2026

### 1. VWCE — Vanguard FTSE All-World Acc (IE00B3RBWM25)

| Dato | Valor |
|------|-------|
| TER | 0,22 % |
| AUM | ~60.000 M€ |
| Holdings | ~3.600 empresas |
| Índice | FTSE All-World |
| Grado fiscal (España) | A |

**Para quién**: el inversor que quiere una sola posición que lo cubra todo — desarrollados y emergentes — sin pensar más. Es la navaja suiza de los Bogleheads españoles. Más de la mitad de las carteras analizadas en BogleHub lo incluyen.

**Dónde comprarlo**: Trade Republic (0 €/orden), DEGIRO, MyInvestor.

---

### 2. IWDA — iShares Core MSCI World Acc (IE00B4L5Y983)

| Dato | Valor |
|------|-------|
| TER | 0,20 % |
| AUM | ~95.000 M€ |
| Holdings | ~1.400 empresas |
| Índice | MSCI World |
| Grado fiscal (España) | A |

**Para quién**: quien prefiere limitarse a mercados desarrollados (23 países) sin la volatilidad adicional de emergentes. Es el ETF de mayor AUM de Europa. Ligeramente más barato que VWCE. Si quieres añadir emergentes manualmente, combínalo con [EMIM](/etf/emim).

---

### 3. CSPX — iShares Core S&P 500 Acc (IE00B5BMR087)

| Dato | Valor |
|------|-------|
| TER | 0,07 % |
| AUM | ~80.000 M€ |
| Holdings | ~503 empresas |
| Índice | S&P 500 |
| Grado fiscal (España) | A |

**Para quién**: quien prioriza el menor coste posible y acepta concentración en EE.UU. El TER de 0,07 % es uno de los más bajos del mercado UCITS. Ideal para quienes creen que EE.UU. seguirá siendo el mercado dominante. Su gemelo en Xetra en euros es [SXR8](/etf/sxr8).

---

### 4. SWRD — SPDR MSCI World Acc (IE00BFY0GT14)

| Dato | Valor |
|------|-------|
| TER | 0,12 % |
| AUM | >10.000 M€ |
| Holdings | ~1.600 empresas |
| Índice | MSCI World |
| Grado fiscal (España) | A |

**Para quién**: alternativa más barata al IWDA con el mismo índice (MSCI World). La diferencia de 0,08 % anual en TER puede suponer miles de euros a décadas vista en carteras grandes. Buena liquidez y creciendo rápido en AUM. [Compara IWDA vs SWRD](/comparar/iwda-vs-swrd).

---

### 5. AGGH — iShares Core Global Agg Bond Acc EUR Hedged (IE00BDBRDM35)

| Dato | Valor |
|------|-------|
| TER | 0,10 % |
| AUM | >15.000 M€ |
| Holdings | ~9.800 bonos |
| Índice | Bloomberg Global Agg |
| Grado fiscal (España) | A |

**Para quién**: el componente de renta fija de una cartera 80/20 o 70/30. Cobertura a euros (hedged) elimina el riesgo divisa en la parte de bonos. TER muy bajo para un ETF de renta fija diversificada. Ideal para inversores que se acercan a la fase de retiro o que buscan reducir la volatilidad de la cartera.

---

### 6. EMIM — iShares Core MSCI EM IMI Acc (IE00BKM4GZ66)

| Dato | Valor |
|------|-------|
| TER | 0,18 % |
| AUM | >20.000 M€ |
| Holdings | ~3.200 empresas |
| Índice | MSCI EM IMI |
| Grado fiscal (España) | A |

**Para quién**: el complemento de IWDA o SWRD para quien quiere replicar el FTSE All-World manualmente. La combinación 88 % IWDA + 12 % EMIM replica el universo del VWCE con un TER ponderado de ~0,20 % (frente al 0,22 % del VWCE). Más complejo pero ligeramente más barato.

---

### 7. VEUR — Vanguard FTSE Developed Europe Acc (IE00B945VV12)

| Dato | Valor |
|------|-------|
| TER | 0,10 % |
| AUM | >5.000 M€ |
| Holdings | ~490 empresas |
| Índice | FTSE Developed Europe |
| Grado fiscal (España) | A |

**Para quién**: quien quiere sobreponderar Europa respecto al peso que le asigna el MSCI World (~16 %). Habitual en carteras que combinan un ETF global + un ETF europeo para reducir el sesgo en EE.UU. TER muy competitivo para Europa.

---

### 8. VHYL — Vanguard FTSE All-World High Div Yield Dist (IE00B8GKDB10)

| Dato | Valor |
|------|-------|
| TER | 0,29 % |
| AUM | >5.000 M€ |
| Índice | FTSE All-World High Dividend Yield |
| Grado fiscal (España) | B |

**Para quién**: inversores en fase de retiro que necesitan flujo de caja sin vender posiciones. El dividendo anual ronda el 3-4 %. El grado fiscal B (distribución + Irlanda) es inferior al A de los de acumulación, pero es la opción de distribución más eficiente para España. No combinar con ETFs de acumulación si se busca eficiencia fiscal pura.

---

### 9. EQQQ — Invesco NASDAQ-100 Acc (IE0032077012)

| Dato | Valor |
|------|-------|
| TER | 0,30 % |
| AUM | >10.000 M€ |
| Holdings | ~100 empresas |
| Índice | NASDAQ-100 |
| Grado fiscal (España) | A |

**Para quién**: inversor con convicción en tecnología y tolerancia alta a la volatilidad. No es una alternativa al MSCI World — es una posición de alta concentración. Si no entiendes por qué quieres el NASDAQ-100 en lugar de un índice global, no lo compres. TER más alto y concentración sectorial en tecnología (~50 %).

---

### 10. SGLN — iShares Physical Gold ETC (IE00B4ND3602)

| Dato | Valor |
|------|-------|
| TER | 0,12 % |
| AUM | >15.000 M€ |
| Activo subyacente | Oro físico |
| Grado fiscal (España) | A |

**Para quién**: cobertura frente a escenarios de alta inflación o crisis del sistema financiero. No es un ETF en sentido estricto (es un ETC respaldado por oro físico), pero funciona de forma similar. Una asignación del 5-10 % en carteras de inversores conservadores con horizonte largo. La filosofía Boglehead clásica no lo incluye, pero hay inversores que lo usan como cobertura.

---

## Tabla resumen

| Ticker | Índice | TER | Perfil |
|--------|--------|-----|--------|
| VWCE | FTSE All-World | 0,22 % | Todo-en-uno global |
| IWDA | MSCI World | 0,20 % | Desarrollados sin emergentes |
| CSPX | S&P 500 | 0,07 % | Solo EE.UU., máximo ahorro en TER |
| SWRD | MSCI World | 0,12 % | MSCI World más barato que IWDA |
| AGGH | Bloomberg Global Agg | 0,10 % | Renta fija global EUR-hedged |
| EMIM | MSCI EM IMI | 0,18 % | Emergentes para combinar con IWDA |
| VEUR | FTSE Dev. Europe | 0,10 % | Sobreponderar Europa |
| VHYL | FTSE All-World HiDiv | 0,29 % | Dividendo para fase retiro |
| EQQQ | NASDAQ-100 | 0,30 % | Alta concentración tech |
| SGLN | Oro físico | 0,12 % | Cobertura inflación |

---

## ¿Cómo elegir?

1. **Si empiezas y quieres simplicidad máxima**: VWCE. Un ETF, todo el mundo, done.
2. **Si quieres reducir el TER 0,02 %**: IWDA (pero añade EMIM si quieres emergentes).
3. **Si solo quieres EE.UU. y el TER más bajo posible**: CSPX o SXR8 en Xetra.
4. **Si buscas renta fija para tu cartera**: AGGH como complemento al ETF de renta variable.
5. **Si necesitas ingresos regulares**: VHYL, asumiendo la menor eficiencia fiscal.

Antes de decidir, analiza cómo encaja cada ETF en tu cartera completa. El [analizador de BogleHub](/analyzer) te muestra la asignación real, el TER ponderado y el solapamiento entre posiciones.

---

*Información educativa, no asesoramiento financiero. Los datos de TER y AUM son aproximados a mayo 2026 y pueden variar. Verifica siempre con el emisor del fondo y tu asesor fiscal antes de invertir.*

---

## Fuentes y verificación de datos

- [JustETF — Búsqueda avanzada de ETFs UCITS](https://www.justetf.com/es/) — Verifica TER, domicilio, tracking difference y rentabilidad histórica de cada ETF listado.
- [iShares by BlackRock — Productos UCITS](https://www.ishares.com/uk/) — Folletos y datos oficiales de CSPX, IWDA, EIMI y el resto de ETFs iShares.
- [Vanguard Europa — ETFs UCITS](https://www.vanguard.co.uk/professional/products/ucits-etfs) — Información oficial de VWCE, VUAA, VGEA y otros fondos Vanguard domiciliados en Irlanda.
`,
  },
  {
    slug: 'cartera-boglehead-3-fondos-espana',
    title: 'La cartera Boglehead de 3 fondos para España: guía práctica 2026',
    excerpt:
      'Cómo construir la cartera lazy de 3 fondos adaptada al inversor español: qué ETFs elegir, en qué proporciones, qué broker usar y cómo rebalancear. Con datos reales y sin rodeos.',
    publishedAt: '2026-05-21',
    readingMinutes: 10,
    keywords: ['cartera boglehead 3 fondos', 'cartera lazy españa', 'cartera indexada 3 ETFs'],
    faq: [
      {
        q: '¿Qué ETFs forman la cartera Boglehead de 3 fondos para España?',
        a: 'La cartera de 3 fondos para España combina: (1) ETF MSCI World o All-World (IWDA, SWRD o VWCE) para renta variable desarrollada o global; (2) ETF de mercados emergentes (EIMI o VFEM) si usas MSCI World en el fondo principal; (3) ETF de bonos globales o europeos (AGGH o VGEA). La proporción renta variable/bonos depende del horizonte y tolerancia al riesgo.',
      },
      {
        q: '¿Cuánto debería aportar mensualmente a una cartera indexada?',
        a: 'No hay una cantidad mínima: con Trade Republic puedes comprar fracciones de ETFs desde 1€. Lo más importante es la consistencia (Dollar Cost Averaging, DCA mensual) y la tasa de ahorro. Una aportación de 200-500€/mes durante 20-30 años genera un patrimonio significativo gracias al interés compuesto, incluso con rentabilidades moderadas del 5-7% real anual.',
      },
      {
        q: '¿Con qué frecuencia hay que rebalancear una cartera de 3 fondos?',
        a: 'La mayoría de inversores Boglehead rebalancean anualmente (una vez al año) o cuando alguna clase de activo se desvía más de un 5-10% de su peso objetivo. El rebalanceo aprovecha las aportaciones periódicas (comprando el activo que más ha caído) para minimizar eventos de venta y su impacto fiscal. No es necesario ni conveniente rebalancear con más frecuencia.',
      },
      {
        q: '¿Es mejor una cartera de 3 fondos o un único ETF All-World?',
        a: 'Depende de la simplicidad que busques. Un único ETF All-World (como VWCE) ya diversifica en más de 3.700 empresas de 50 países y ajusta automáticamente los pesos. La cartera de 3 fondos permite personalizar el peso de emergentes y bonos, pero requiere más gestión. Para la mayoría de inversores que empiezan, un único ETF global es suficiente.',
      },
    ],
    content: `# La cartera Boglehead de 3 fondos para España: guía práctica 2026

La cartera de 3 fondos es la implementación más sencilla y eficaz de la [filosofía Boglehead](/blog/bogleheads-espana-guia-completa). Tres posiciones, una revisión anual, décadas de retornos ajustados a coste mínimo. No es la única forma correcta de invertir, pero es la que más inversores han llevado a la práctica con éxito sostenido.

Esta guía te muestra cómo construirla en España con ETFs UCITS reales, qué brokers usarla y cuándo y cómo rebalancear.

---

## Por qué 3 fondos y no 1 ni 10

**1 fondo (VWCE)**: máxima simplicidad. Funciona. Si solo puedes o quieres tener uno, este es el camino.

**3 fondos**: más control sobre las proporciones de renta variable/fija y emergentes/desarrollados. Permite ajustar el nivel de riesgo con más precisión a medida que cambian tus circunstancias.

**10 fondos**: falsa diversificación. Si ya tienes VWCE, añadir IWDA o CSPX no te diversifica — te concentra en las mismas posiciones con más fricción administrativa.

La cartera de 3 fondos es el punto óptimo entre simplicidad y control.

---

## Los 3 componentes y su función

### Fondo 1: Renta variable mundial desarrollada

**Objetivo**: capturar el crecimiento de los mercados globales desarrollados.

| ETF | TER | Índice |
|-----|-----|--------|
| [IWDA](/etf/iwda) | 0,20 % | MSCI World (23 países desarrollados) |
| [SWRD](/etf/swrd) | 0,12 % | MSCI World (alternativa más barata) |
| [VWCE](/etf/vwce) | 0,22 % | FTSE All-World (incluye emergentes) |

Si usas VWCE aquí, el fondo 2 (emergentes) ya está incluido — tendrías una cartera de 2 fondos, no 3.

**Recomendación para empezar**: IWDA o SWRD (si quieres control sobre el peso a emergentes) o VWCE (si quieres simplicidad total).

---

### Fondo 2: Renta variable mercados emergentes

**Objetivo**: exposición a las economías de mayor crecimiento — India, China, Brasil, Taiwán, Corea del Sur.

| ETF | TER | Índice |
|-----|-----|--------|
| [EMIM](/etf/emim) | 0,18 % | MSCI EM IMI (~3.200 empresas) |
| [EIMI](/etf/eimi) | 0,18 % | MSCI EM IMI (mismo fondo, distinto ticker) |
| [VFEM](/etf/vfem) | 0,22 % | FTSE Emerging Markets |

**Peso recomendado**: 10-15 % del total de renta variable. El FTSE All-World le asigna ~12 %.

---

### Fondo 3: Renta fija global

**Objetivo**: reducir la volatilidad de la cartera y actuar como amortiguador en caídas de bolsa.

| ETF | TER | Índice |
|-----|-----|--------|
| [AGGH](/etf/aggh) | 0,10 % | Bloomberg Global Agg EUR-hedged |
| [VAGF](/etf/vagf) | 0,10 % | Bloomberg Global Agg EUR-hedged |
| [VGEA](/etf/vgea) | 0,09 % | Bloomberg Global Agg EUR-hedged |

Los tres son equivalentes en exposición. AGGH tiene mayor AUM y liquidez.

---

## Proporciones según tu perfil

La división renta variable / renta fija depende de tu horizonte temporal y tolerancia al riesgo:

| Perfil | RV / RF | Lógica |
|--------|---------|--------|
| Joven (20-35 años, horizonte >20 años) | 90 / 10 | Tiempo para recuperar caídas. La RF solo amortigua. |
| Intermedio (35-50 años) | 80 / 20 | Equilibrio clásico Boglehead |
| Conservador o cerca de retiro | 60 / 40 | Más estabilidad, menos crecimiento |

Dentro del 80-90 % de renta variable, la división entre desarrollados y emergentes suele seguir la capitalización de mercado: ~88 % desarrollados, ~12 % emergentes.

**Ejemplo cartera 80/20**:
- 70 % IWDA (renta variable desarrollados)
- 10 % EMIM (renta variable emergentes)
- 20 % AGGH (renta fija)

**TER ponderado**: 0,70×0,20 + 0,10×0,18 + 0,20×0,10 = 0,176 % — excelente.

---

## Qué broker usar

### Trade Republic
- 0 € por orden. Planes de ahorro automáticos desde 1 €/mes.
- Disponibles: IWDA, SWRD, EMIM, EIMI, AGGH, VWCE y la mayoría de los ETFs de la lista.
- Ideal para: importes pequeños o medianos, automatización total.

### DEGIRO
- 0,50-2 € por orden en bolsas principales. Acceso a más de 50 bolsas.
- Lista mensual de ETFs sin comisión (rota).
- Ideal para: importes más grandes donde la comisión fija importa menos.

### MyInvestor
- Permite mezclar ETFs con fondos indexados Vanguard/Amundi (ventaja si quieres el traspaso fiscal).
- 0,20 € + 0,03 % por orden de ETF.
- Ideal para: quienes mezclan fondos y ETFs, o quieren operar en euros en Xetra directamente.

---

## Cuándo y cómo rebalancear

El rebalanceo es el único mantenimiento que requiere esta cartera.

**Cuándo**: una vez al año, en una fecha fija que recuerdes (el 1 de enero, tu cumpleaños). No rebalancees cuando el mercado cae — eso es market timing.

**Cómo**: compara los pesos actuales con los objetivos. Si alguna posición se desvía más de 5 puntos porcentuales de su objetivo, compra el activo infraponderado con tu siguiente aportación en lugar de vender el sobreponderado (así evitas el evento fiscal de la venta).

**Ejemplo**:
- Objetivo: 70 % IWDA / 10 % EMIM / 20 % AGGH
- Situación actual tras un año bueno en bolsa: 76 % / 11 % / 13 %
- La renta fija está infraponderada. Próximas aportaciones → íntegramente a AGGH hasta volver al 20 %.

Si la desviación es grande y no hay suficiente aportación para corregirla, solo entonces vende una parte de la posición sobreponderada (y asume el evento fiscal).

---

## La pregunta que siempre surge: ¿fondos o ETFs?

Si usas MyInvestor, tienes acceso a los mismos índices en formato fondo indexado (Vanguard Global Stock, Amundi Prime Global, etc.). La ventaja: el traspaso entre fondos no tributa en España. La desventaja: sin comisión, sin horario de mercado, sin precio en tiempo real.

Para esta cartera de 3 fondos, si operas en MyInvestor y tu horizonte es >10 años, los fondos indexados pueden tener ventaja fiscal sobre los ETFs. [Lee el artículo completo sobre fondos vs ETFs](/blog/fondos-indexados-vs-etfs-espana).

---

## Errores frecuentes al construir esta cartera

1. **Añadir un cuarto o quinto ETF "por si acaso"**: no mejora la diversificación, añade complejidad.
2. **Rebalancear con cada caída**: el mercado cae para recuperarse. Rebalancear en pánico es vender barato.
3. **Mezclar ETFs de distribución y acumulación sin criterio**: mejor unificar en acumulación para diferir el IRPF.
4. **Ignorar el TER ponderado de la cartera**: el coste total importa. Un TER ponderado por encima de 0,25 % merece revisión.
5. **No aportar con regularidad**: el interés compuesto necesita tiempo y aportaciones regulares. [Calcula el impacto](/calculadora/interes-compuesto).

---

*Información educativa, no asesoramiento financiero. Los pesos y ETFs sugeridos son orientativos — tu situación personal, tolerancia al riesgo y horizonte temporal determinan la cartera óptima para ti.*

**¿Ya tienes esta cartera? Analízala gratis** en el [analizador de BogleHub](/analyzer): TER ponderado, solapamiento, diversificación y proyección FIRE.
`,
  },
  {
    slug: 'degiro-vs-trade-republic-vs-myinvestor-2026',
    title: 'DEGIRO vs Trade Republic vs MyInvestor: qué broker elegir en España (2026)',
    excerpt:
      'Comparativa honesta de los tres brokers más usados por inversores indexados en España en 2026: comisiones reales, ETFs disponibles, seguridad y para qué perfil encaja cada uno.',
    publishedAt: '2026-05-21',
    readingMinutes: 11,
    keywords: ['mejor broker ETF España 2026', 'DEGIRO vs Trade Republic', 'MyInvestor opiniones', 'broker inversión indexada España'],
    faq: [
      {
        q: '¿Cuál es el mejor broker para comprar ETFs en España en 2026?',
        a: 'Para aportaciones periódicas pequeñas (DCA mensual): Trade Republic (sin comisión, fracciones, app muy sencilla). Para más variedad de ETFs y volumen mayor: DEGIRO (0,50-1€ por operación en la mayoría de ETFs europeos). Para combinar ETFs y fondos indexados con traspaso libre: MyInvestor. Todos son seguros y están regulados.',
      },
      {
        q: '¿Es seguro DEGIRO para invertir en España?',
        a: 'Sí. DEGIRO está regulado por la AFM holandesa y es subsidiaria de flatexDEGIRO Bank AG, supervisado por el BaFin alemán. El Fondo de Garantía de Inversores cubre hasta 20.000€ en caso de insolvencia del broker (no cubre pérdidas de mercado). Desde 2021 es parte de un banco regulado, lo que añade solidez al grupo.',
      },
      {
        q: '¿Trade Republic es seguro para invertir en España?',
        a: 'Sí. Trade Republic es un banco alemán regulado por el BaFin con licencia bancaria completa desde 2023. Los depósitos en euros hasta 100.000€ están cubiertos por el Fondo de Garantía de Depósitos alemán. Los ETFs y acciones se custodian como patrimonio segregado (no del banco), cubiertos por el Fondo de Garantía de Inversores hasta 20.000€.',
      },
      {
        q: '¿Puedo traspasar ETFs entre brokers sin tributar en España?',
        a: 'No. A diferencia de los fondos de inversión, los ETFs no permiten traspaso libre entre brokers sin tributar. Si transfieres ETFs de DEGIRO a Trade Republic, se considera una transmisión y debes declarar la ganancia o pérdida patrimonial en el IRPF. Para evitar este coste, decide bien el broker antes de empezar a invertir.',
      },
    ],
    content: `# DEGIRO vs Trade Republic vs MyInvestor: qué broker elegir en España (2026)

Elegir broker es la segunda decisión más importante después de elegir tus ETFs. Una mala elección te cuesta en comisiones, spreads y fricciones que se acumulan durante décadas. Esta comparativa se centra en los tres brokers más usados por la comunidad de inversores indexados en España.

Spoiler: no hay un broker "mejor" para todos. Hay uno que encaja con tu volumen de inversión, tu frecuencia de compra y si mezclas ETFs con fondos indexados.

---

## Comparativa rápida

| | Trade Republic | DEGIRO | MyInvestor |
|---|---|---|---|
| Comisión por orden ETF | **0 €** | 0,50-2 € | 0,20 € + 0,03 % |
| Planes de ahorro automáticos | ✓ (desde 1 €/mes) | ✗ | ✗ |
| Fondos indexados | ✗ | ✗ | ✓ Vanguard, Amundi |
| Cuenta remunerada | ✓ (~2-3 % TAE) | ✗ | ✓ (~2 % TAE) |
| Regulación | BaFin (Alemania) | AFM (Holanda) | CNMV (España) |
| Custodia segregada | ✓ | Parcial (Custody account) | ✓ |
| Compensación (Fondo garantía) | 100.000 € (ESIF) | 20.000 € (IFD) | 100.000 € (FGD) |
| ETFs disponibles | +2.000 | +5.000 | Selección popular |
| Interfaz | Mobile-first, sencilla | Web completa, técnica | Web bancaria |

---

## Trade Republic: el broker sin fricciones

Trade Republic ha conquistado el mercado español por una razón simple: **0 € de comisión por operación**. No hay asteriscos. No hay lista mensual que cambia. No hay spread oculto disfrazado de "cambio de divisa favorable".

**Cómo gana dinero**: order flow (cobra a los creadores de mercado por enrutar órdenes a través de ellos) y la cuenta remunerada. Es un modelo legítimo y habitual en brokers neobancarios europeos.

**Planes de ahorro automáticos**: la función que lo diferencia de todo lo demás. Puedes programar compras mensuales desde 1 € en cualquiera de sus 2.000+ ETFs. La automatización elimina la tentación de hacer market timing.

**Seguridad**: regulado por BaFin, el regulador alemán más exigente de Europa. Activos custodiados en Citibank. Hasta 100.000 € cubiertos por el Fondo Europeo de Garantía de Inversiones (ESIF).

**Limitaciones**:
- No ofrece fondos indexados (solo ETFs)
- En algunos ETFs menos líquidos el spread puede ser mayor que en Xetra directo
- La interfaz no permite órdenes límite complejas ni stop-loss
- No hay acceso a acciones fuera de los mercados más populares

**Ideal para**: inversores que empiezan, importes bajos-medios (<50.000-100.000 €), inversores que quieren automatizar al máximo.

---

## DEGIRO: el broker para el inversor más exigente

DEGIRO lleva más tiempo en el mercado y ofrece acceso a más de 50 bolsas mundiales con tarifas muy bajas (0,50 € + 0,004 % en Xetra, mínimo 0,90 €). Para importes grandes, esos 0,90 € fijos son irrelevantes.

**ETFs sin comisión mensual**: DEGIRO publica una lista de ETFs seleccionados por los que no cobra comisión de compra — pero la lista cambia mensualmente y tiene restricciones (solo una operación gratuita por ETF al mes, comisión de gestión si no operas suficiente en un periodo).

**Custodia no completamente segregada**: este es el punto que más debate genera. En la cuenta estándar ("Custody" en el selector), los activos sí están segregados. En la cuenta básica, tus activos pueden ser prestados a terceros (préstamo de valores). Asegúrate de abrir una cuenta "Custody" si la segregación te preocupa.

**Compensación**: hasta 20.000 € cubiertos por el Fondo de Garantía de Inversiones holandés (IFD). Es más bajo que los 100.000 € de Trade Republic y MyInvestor — relevante si tienes más de ese importe en el broker.

**Ideal para**: inversores con carteras más grandes (>100.000 €), acceso a ETFs y activos específicos no disponibles en Trade Republic, inversores técnicos que necesitan tipos de órdenes avanzadas.

---

## MyInvestor: el único que combina ETFs y fondos indexados

MyInvestor es el neobanco del grupo Andbank y el único de los tres que ofrece fondos indexados Vanguard y Amundi directamente. Esto lo convierte en la única opción si quieres aprovechar el **traspaso fiscal entre fondos** (la gran ventaja de los fondos sobre los ETFs en España: puedes mover dinero entre fondos sin tributar).

**Comisiones ETF**: 0,20 € fijo + 0,03 % del importe. Para órdenes pequeñas (<667 €) la comisión mínima de 0,20 € es inferior a la de DEGIRO. Para órdenes grandes, el 0,03 % variable puede ser significativo.

**Fondos indexados**: Vanguard Global Stock Index, Amundi Prime Global, Amundi Index MSCI Emerging Markets. Misma exposición que los ETFs equivalentes, sin comisión de compra, traspaso sin tributar.

**Regulación española**: el único de los tres regulado por la CNMV. Para muchos inversores, tener su dinero en una entidad supervisada en España da tranquilidad adicional.

**Limitaciones**:
- Interfaz menos ágil que Trade Republic
- Selección de ETFs más limitada
- Sin planes de ahorro automáticos en ETFs (sí en fondos)

**Ideal para**: inversores que mezclan ETFs con fondos indexados, quien quiere aprovechar el traspaso fiscal, quien prefiere regulación española directa.

---

## ¿Y la seguridad? ¿Qué pasa si quiebra el broker?

Los tres están regulados bajo normativa UCITS/MiFID II. En caso de quiebra de un broker europeo, tus activos (las acciones y participaciones de ETF) **no forman parte de la masa concursal** del broker — están custodiados en nombre de los clientes.

Lo que cubre el fondo de garantía es el riesgo de que el broker haya cometido fraude o mala gestión con esos activos. No cubre pérdidas de inversión.

| Broker | Fondo garantía | Límite |
|--------|---------------|--------|
| Trade Republic | ESIF (EU) | 100.000 € |
| DEGIRO (cuenta Custody) | IFD (Holanda) | 20.000 € |
| MyInvestor | FGD (España) | 100.000 € |

Para carteras superiores a 20.000 €, la diferencia de cobertura entre DEGIRO y los otros dos es relevante. Para carteras grandes, diversificar entre dos brokers es una estrategia razonable.

---

## La recomendación práctica

**Si empiezas con menos de 500 €/mes y quieres automatizar**: Trade Republic. Sin dudarlo.

**Si ya tienes una cartera consolidada (>100.000 €) y quieres máximo control**: DEGIRO o diversifica entre Trade Republic + DEGIRO.

**Si quieres mezclar ETFs con fondos indexados y aprovechar el traspaso fiscal**: MyInvestor para los fondos, Trade Republic o DEGIRO para los ETFs.

**Si tu cartera ya es de ETFs en Trade Republic y funciona**: no cambies de broker por cambiar. Los costes de fricción de mover una cartera rara vez compensan las diferencias en comisiones.

---

*Información educativa, no asesoramiento financiero. Las comisiones y condiciones pueden cambiar. Verifica siempre con el broker antes de operar.*

**¿Ya tienes cuenta en alguno de estos brokers?** [Analiza tu cartera gratis](/analyzer) e identifica si tu TER y diversificación están optimizados.

---

## Fuentes y lecturas complementarias

- [DEGIRO — Tarifas oficiales 2026](https://www.degiro.es/tarifas) — Verifica las comisiones actuales antes de abrir cuenta.
- [Trade Republic — Información sobre la cuenta de inversión](https://traderepublic.com/es-es) — Condiciones actualizadas y ETFs disponibles en la plataforma.
- [Banco de España — Registro de Entidades](https://www.bde.es/bde/es/secciones/servicios/Particulares_y_e/Registros_de_En/) — Comprueba que el broker está registrado y supervisado en España.
`,
  },
  {
    slug: 'indexa-capital-opinion-2026',
    title: 'Indexa Capital: opinión y análisis completo 2026',
    excerpt:
      'Análisis honesto de Indexa Capital en 2026: carteras, comisiones reales, rentabilidad histórica y para quién tiene sentido el roboadvisor líder de España.',
    publishedAt: '2026-05-24',
    readingMinutes: 10,
    keywords: ['Indexa Capital opinión', 'Indexa Capital comisiones', 'Indexa Capital rentabilidad', 'mejor roboadvisor España 2026'],
    faq: [
      {
        q: '¿Es seguro Indexa Capital?',
        a: 'Sí. Indexa Capital está registrado en la CNMV como empresa de servicios de inversión (ESI) con número de registro 257. Tu dinero no está en Indexa sino en una cuenta de valores a tu nombre en el banco custodio (actualmente Inversis). En caso de insolvencia de Indexa, tu cartera de fondos quedaría intacta porque es tuya, no de ellos. Los fondos en sí están cubiertos por el Fondo de Garantía de Inversores hasta 100.000 €.',
      },
      {
        q: '¿Cuánto cobra Indexa Capital de verdad?',
        a: 'El coste total tiene tres capas: la comisión de gestión de Indexa (0,15% hasta 10.000€, bajando hasta 0,10% para patrimonios grandes), la comisión de custodia del banco depositario (~0,12%), y el TER de los fondos indexados en los que invierte (0,07%-0,22% según el activo). En total, la mayoría de clientes pagan entre 0,40% y 0,60% anual sobre el patrimonio, incluyendo todos los costes.',
      },
      {
        q: '¿Es mejor Indexa Capital que gestionar yo mi propia cartera?',
        a: 'Las matemáticas favorecen al inversor DIY: una cartera de fondos indexados propia puede costar 0,10%-0,20% anual frente al 0,40%-0,60% de Indexa. En 30 años sobre 100.000€, esa diferencia puede superar 30.000€. Sin embargo, Indexa aporta algo que las matemáticas no capturan: rebalanceo automático, aportaciones periódicas automatizadas y una barrera psicológica que evita vender en las caídas. Si esa automatización te hace mantener el plan donde tú no lo harías, la comisión sale rentable.',
      },
      {
        q: '¿Qué rentabilidad ha tenido Indexa Capital históricamente?',
        a: 'Indexa publica datos históricos auditados desde 2015 en su web. Las carteras 6/10 (moderada) y 10/10 (máxima renta variable) han batido consistentemente a sus benchmarks netos de comisiones, principalmente gracias al rebalanceo sistemático. Para los datos actualizados, consulta directamente indexacapital.com/es/rentabilidad, que publica los rendimientos reales de cada cartera.',
      },
      {
        q: '¿Cuánto dinero necesito para abrir una cuenta en Indexa Capital?',
        a: 'El mínimo de apertura es 3.000€ para la cuenta de fondos. Para el plan de pensiones indexado de Indexa no hay mínimo. Indexa también ofrece una cuenta de acciones (carteras de ETFs individuales) desde 10.000€. Con el enlace de referido de un amigo, los primeros 10.000€ se gestionan gratis durante un año.',
      },
    ],
    content: `# Indexa Capital: opinión y análisis completo 2026

Indexa Capital es el roboadvisor con más patrimonio gestionado de España. En 2026 supera los 2.000 millones de euros en activos bajo gestión y gestiona las carteras de más de 70.000 clientes. Es la opción que primero sale en Google cuando alguien busca "invertir sin complicaciones" en España, y con razón: fue pionero en el modelo de gestión automatizada de fondos indexados en el mercado español.

Esta opinión no es un artículo patrocinado. Analizamos los datos reales: comisiones, rentabilidad histórica, regulación y en qué casos concretos Indexa tiene sentido y en cuáles no.

---

## Qué es Indexa Capital y cómo funciona

Indexa Capital es una empresa de asesoramiento y gestión automatizada de inversiones (roboadvisor). Su modelo es sencillo: completas un cuestionario de perfil inversor, Indexa te asigna una cartera entre 1/10 (máximo conservador) y 10/10 (máximo riesgo), y a partir de ahí gestiona automáticamente:

- Invierte tu dinero en fondos indexados de Vanguard, iShares y Amundi
- Rebalancea la cartera cuando se aleja del peso objetivo
- Reinvierte los dividendos automáticamente
- Gestiona las aportaciones periódicas que programes

Lo que no hace Indexa: asesoramiento fiscal personalizado, planificación financiera integral ni selección de activos fuera del universo indexado.

---

## La cartera de fondos que usa Indexa

Las carteras de Indexa están compuestas exclusivamente por fondos indexados UCITS de bajo coste. Una cartera moderada típica (perfil 6/10) incluye aproximadamente:

| Activo | Peso aproximado |
|---|---|
| Renta variable mundial (MSCI World / FTSE All-World) | 50-55% |
| Renta variable emergentes | 10-15% |
| Renta fija corporativa Europa | 10-15% |
| Renta fija gobierno eurozona | 10-15% |
| Renta variable pequeñas empresas | 5-10% |

Los pesos exactos varían según el perfil y se rebalancean automáticamente cuando la desviación supera los umbrales definidos. Esta es una ventaja real sobre el inversor DIY que necesita acordarse de rebalancear.

---

## Comisiones reales: el desglose completo

El error más común es pensar que Indexa solo cobra lo que anuncia como "comisión de gestión". El coste real tiene tres capas:

**1. Comisión de Indexa** (por gestión y asesoramiento):
- 0,15% anual para los primeros 10.000€
- 0,14% para 10.000–100.000€
- Baja progresivamente hasta 0,10% para patrimonios grandes

**2. Comisión del banco custodio** (Inversis o similar):
- ~0,12% anual sobre el patrimonio

**3. TER de los fondos indexados**:
- Los fondos institucionales que usa Indexa tienen TER entre 0,07% y 0,25%
- La media ponderada de una cartera Indexa suele rondar el 0,12%

**Coste total estimado para un cliente típico**: 0,39% a 0,50% anual, según el patrimonio y la cartera asignada.

Comparado con un fondo de gestión activa en España (1,5–2% anual), Indexa es notablemente más barato. Comparado con una cartera DIY de fondos indexados propia (0,10–0,20% total), Indexa cuesta aproximadamente el doble.

---

## Rentabilidad histórica: datos reales

Indexa publica en su web la rentabilidad histórica auditada de cada cartera desde 2015. Los datos muestran que las carteras de Indexa han batido sistemáticamente a sus benchmarks de fondos de gestión activa equivalentes, y han estado cerca del retorno bruto del índice menos comisiones.

Para comparar con alternativas DIY: una cartera de fondos indexados con un 80% en MSCI World y 20% en renta fija global habría tenido un comportamiento muy similar al de la cartera 7/10 de Indexa, con algo menos de coste total.

Los datos históricos no predicen rentabilidades futuras, pero sí confirman que el modelo funciona: baja rotación, sin apostas activas, rebalanceo sistemático.

---

## Para quién tiene sentido Indexa Capital

Indexa es la opción correcta si:

- **No tienes tiempo o interés** en gestionar tu propia cartera pero quieres invertir mejor que con un banco tradicional
- **Valoras la automatización**: el rebalanceo y las aportaciones periódicas funcionan solas, sin que dependan de tu fuerza de voluntad
- **Estás empezando** y no sabes qué fondos elegir ni en qué proporción
- **Tienes un historial de vender en caídas**: la interfaz limpia de Indexa, sin cotizaciones en tiempo real, ayuda a no sobre-reaccionar
- **Quieres un plan de pensiones indexado**: Indexa ofrece también plan de pensiones con la misma filosofía, sin mínimo de apertura

---

## Para quién NO tiene sentido Indexa Capital

Indexa puede no ser la mejor opción si:

- **Tienes disciplina para gestionar tu propia cartera**: el ahorro de 0,25–0,30% anual en comisiones se acumula de forma significativa en 20-30 años. Usa la [calculadora de interés compuesto](/calculadora/interes-compuesto) para ver exactamente cuánto.
- **Tu patrimonio es pequeño**: para carteras por debajo de 5.000–10.000€, las comisiones de custodia mínimas hacen que el porcentaje real sea más alto
- **Usas MyInvestor y fondos Vanguard**: si ya tienes una cartera de fondos indexados en MyInvestor con un TER ponderado de 0,15%, cambiar a Indexa supondría triplicar el coste sin mejorar la diversificación

---

## Alternativa: gestionar tú mismo con fondos indexados

Una cartera DIY básica para el inversor español puede ser tan sencilla como dos fondos en MyInvestor:

- 80% Vanguard Global Stock Index (o Amundi Prime Global)
- 20% Amundi Prime Euro Investment Grade Corporate Bond

Coste total: ~0,12–0,18% anual. Rebalanceo manual una vez al año. Traspaso entre fondos sin tributar. Es la [cartera de 3 fondos Boglehead](/blog/cartera-boglehead-3-fondos-espana) en su versión mínima.

El [comparador de costes roboadvisor vs DIY](/calculadora/roboadvisor-vs-diy) te muestra exactamente en euros la diferencia a 10, 20 y 30 años según tu capital.

---

## Veredicto

Indexa Capital es un producto bien construido, con comisiones justas para ser un servicio gestionado, regulado por la CNMV y con historial auditado. Es la mejor opción dentro de los roboadvisors españoles para el inversor que quiere despreocuparse por completo de la gestión.

Si tienes la disciplina para construir y mantener una cartera de fondos indexados propia, el DIY es más barato. Si no la tienes — y seamos honestos con nosotros mismos — Indexa puede ser el mejor seguro contra los errores de comportamiento que destruyen rentabilidades.

---

## Fuentes y lecturas complementarias

- [Indexa Capital — Rentabilidad histórica auditada](https://indexacapital.com/es/rentabilidad) — Datos oficiales verificados por auditor externo.
- [CNMV — Registro de ESIs](https://www.cnmv.es/Portal/Consultas/BusquedaEntidades.aspx) — Verifica el registro de Indexa como entidad supervisada.
- [Comparador roboadvisor vs DIY — BogleHub](/calculadora/roboadvisor-vs-diy) — Calcula el coste real de Indexa frente a tu propia cartera.
`,
  },
  {
    slug: 'vwce-analisis-completo',
    title: 'VWCE: análisis completo del ETF All-World de Vanguard para España (2026)',
    excerpt:
      'Todo sobre el VWCE en 2026: composición, TER, fiscalidad para inversores españoles, diferencias con VWRA e IWDA, y dónde comprarlo al menor coste.',
    publishedAt: '2026-05-24',
    readingMinutes: 9,
    keywords: ['VWCE análisis', 'VWCE ETF España', 'Vanguard FTSE All-World acumulación', 'VWCE vs IWDA', 'VWCE ISIN'],
    faq: [
      {
        q: '¿Qué es el VWCE y qué índice replica?',
        a: 'VWCE es el ticker del Vanguard FTSE All-World UCITS ETF (Accumulating), un ETF domiciliado en Irlanda (ISIN IE00B3RBWM25) que replica el índice FTSE All-World. Este índice incluye más de 3.700 empresas de mercados desarrollados y emergentes de todo el mundo, cubriendo aproximadamente el 90-95% de la capitalización bursátil global. Es el ETF de referencia para inversores españoles que buscan máxima diversificación en un solo producto.',
      },
      {
        q: '¿Cuál es el TER del VWCE?',
        a: 'El TER del VWCE es del 0,22% anual. Es algo más caro que sus alternativas de MSCI World (IWDA: 0,20%, SWRD: 0,12%) pero incluye emergentes dentro del mismo fondo, lo que elimina la necesidad de un segundo ETF. Si consideramos una cartera MSCI World + Emergentes por separado con pesos equivalentes, el TER combinado suele ser similar o ligeramente inferior al del VWCE.',
      },
      {
        q: '¿VWCE o IWDA? ¿Cuál es mejor para un inversor en España?',
        a: 'VWCE incluye emergentes (~12%) y IWDA solo tiene mercados desarrollados. Si quieres exposición global sin gestionar dos ETFs, VWCE es más sencillo. Si quieres control sobre la proporción de emergentes o prefieres el TER más bajo de IWDA, la combinación IWDA + EIMI (emergentes por separado) tiene más flexibilidad. Para la mayoría de inversores que empiezan, VWCE es la opción más simple y suficiente.',
      },
      {
        q: '¿Es VWCE fiscalmente eficiente para inversores en España?',
        a: 'Sí. VWCE está domiciliado en Irlanda (ISIN empieza por IE), lo que le da acceso al convenio fiscal Irlanda-EE.UU. que reduce la retención en origen sobre dividendos de empresas americanas del 30% al 15%. Al ser de acumulación, los dividendos se reinvierten sin generar evento fiscal inmediato. Esta combinación lo convierte en uno de los ETFs fiscalmente más eficientes para un inversor residente en España.',
      },
      {
        q: '¿Cuál es la diferencia entre VWCE y VWRA?',
        a: 'VWCE y VWRA replican exactamente el mismo índice (FTSE All-World) con la misma política de acumulación. La diferencia es la bolsa donde cotizan y la divisa de cotización: VWCE cotiza en Xetra (EUR), Euronext Ámsterdam (EUR) y otras bolsas europeas; VWRA cotiza principalmente en la Bolsa de Londres (USD). Para un inversor español que usa un broker europeo como Trade Republic o DEGIRO, VWCE es el ticker correcto. El ISIN es el mismo: IE00B3RBWM25.',
      },
    ],
    content: `# VWCE: análisis completo del ETF All-World de Vanguard para España (2026)

VWCE es el ticker más buscado en los foros de inversión españoles. El Vanguard FTSE All-World UCITS ETF (Accumulating) se ha convertido en el ETF de referencia para inversores particulares en España que quieren diversificación global máxima en un solo producto, con eficiencia fiscal, bajo coste y sin complicaciones.

Este análisis cubre todo lo que necesitas saber: qué hay dentro, cuánto cuesta, si es el más adecuado para un inversor español y cómo compararlo con sus principales alternativas.

---

## Ficha técnica del VWCE

| Dato | Valor |
|---|---|
| Nombre completo | Vanguard FTSE All-World UCITS ETF (Acc) |
| Ticker más común | VWCE (Xetra), VWRA (LSE) |
| ISIN | IE00B3RBWM25 |
| Domicilio | Irlanda |
| Gestora | Vanguard |
| Índice replicado | FTSE All-World |
| TER | 0,22% anual |
| Política de dividendos | Acumulación |
| Replicación | Física por muestreo |
| Nº de valores aproximado | ~3.700 empresas |
| Patrimonio bajo gestión | >15.000 millones USD |

---

## Qué hay dentro del VWCE: composición por país y sector

El FTSE All-World cubre mercados desarrollados y emergentes. La composición aproximada en 2026:

**Por región:**
- Estados Unidos: ~63%
- Europa desarrollada: ~14%
- Japón: ~6%
- Reino Unido: ~4%
- Mercados emergentes (China, India, Taiwán, Corea, Brasil, etc.): ~12%

**Por sector:**
- Tecnología: ~25%
- Financiero: ~15%
- Salud: ~12%
- Consumo discrecional: ~11%
- Industriales: ~10%
- Resto: ~27%

Esta distribución refleja el peso real de cada empresa y región en la economía mundial, sin apostar por ningún sector ni región concreta. Es la definición práctica de "invertir en el mundo entero".

---

## Por qué VWCE es tan popular entre inversores españoles

**1. Un solo ETF, diversificación global completa**

La alternativa a VWCE para obtener cobertura similar sería combinar un ETF de MSCI World (desarrollados) con uno de mercados emergentes en proporción ~88/12. VWCE hace eso automáticamente y rebalancea el peso de emergentes según su capitalización de mercado. Menos decisiones, menos operaciones, menos fricción.

**2. Domicilio en Irlanda: máxima eficiencia fiscal**

El ISIN IE00B3RBWM25 confirma que el fondo está domiciliado en Irlanda. Esto tiene consecuencias fiscales concretas para inversores españoles:

- El convenio Irlanda–EE.UU. reduce la retención sobre dividendos americanos del 30% al 15%
- Como el ~63% del fondo son empresas americanas, esto supone un ahorro real en la "fuga fiscal" de dividendos
- La retención efectiva sobre el dividendo total del fondo se estima en torno al 10-15%, frente al 20-30% de ETFs domiciliados en Luxemburgo

**3. Acumulación: el dividendo se reinvierte sin tributar**

Cada dividendo que las empresas del fondo reparten se reinvierte automáticamente sin generar un evento fiscal para el inversor. Tributarás cuando vendas — y solo por la ganancia real. Para un inversor en fase de acumulación con horizonte de 20-30 años, este diferimiento fiscal es equivalente a tener un porcentaje de rentabilidad extra compuesta cada año.

---

## VWCE vs IWDA: ¿cuál elegir?

Esta es la comparativa que más se repite en los foros de inversión españoles:

| | VWCE | IWDA |
|---|---|---|
| Índice | FTSE All-World | MSCI World |
| Emergentes incluidos | ✓ (~12%) | ✗ |
| TER | 0,22% | 0,20% |
| Domicilio | Irlanda | Irlanda |
| Acumulación | ✓ | ✓ |
| Patrimonio gestionado | >15.000 M USD | >75.000 M USD |

La diferencia clave: IWDA solo incluye países desarrollados (no emergentes). Para tener exposición global completa con IWDA necesitas añadir un segundo ETF de emergentes (como EIMI) en proporción ~88/12. VWCE ya lo hace internamente.

**Cuándo elegir VWCE**: quieres simplicidad máxima, un solo ETF que lo cubra todo, y no quieres decidir cuánto poner en emergentes.

**Cuándo elegir IWDA**: quieres más control sobre el peso de emergentes, o buscas el TER más bajo, o ya tienes exposición a emergentes por otro lado.

Para la mayoría de inversores que empiezan: **VWCE es la respuesta más sencilla y correcta**.

---

## VWCE vs SWRD: la comparativa de MSCI World barato

SWRD (SPDR MSCI World UCITS ETF) tiene un TER de 0,12%, el más barato entre los ETFs de MSCI World disponibles en España. Pero SWRD no incluye emergentes. Si añades EIMI (emergentes, TER 0,18%) en un 12%, el TER ponderado de la combinación es aproximadamente:

0,88 × 0,12% + 0,12 × 0,18% ≈ 0,128%

Frente al 0,22% del VWCE. El ahorro es de ~0,09% anual: sobre 100.000€, son ~90€ al año.

A largo plazo eso importa, pero la complejidad añadida (dos ETFs, dos órdenes, rebalanceo manual de la proporción) puede no merecer la pena para carteras pequeñas o inversores que empiezan. Con carteras grandes (>100.000–200.000€), la combinación SWRD+EIMI es más eficiente en costes.

---

## Dónde comprar VWCE en España

| Broker | Comisión por orden |
|---|---|
| Trade Republic | 0 € (planes de ahorro automáticos desde 1 €/mes) |
| DEGIRO | 0,50 € + 0,004% (mín. 0,90 €) |
| MyInvestor | 0,20 € + 0,03% |
| XTB | 0 € hasta 100.000 €/mes en ETFs |

Para aportaciones mensuales pequeñas, Trade Republic es la opción más eficiente. Para órdenes más grandes y control técnico, DEGIRO. El VWCE no está disponible en MyInvestor como ETF, pero sí su equivalente en fondo indexado (Vanguard Global Stock Index, que replica MSCI World, no FTSE All-World — índice diferente).

---

## ¿Es VWCE la opción definitiva para un inversor indexado en España?

Para muchos sí. Es diversificado globalmente, domiciliado en Irlanda, de acumulación, con un TER aceptable y gestionado por Vanguard, una gestora fundada por John Bogle —el padre de la inversión indexada.

Sus únicas limitaciones son el TER algo superior a las alternativas más baratas, y que no está disponible como fondo de inversión (lo que significaría traspaso fiscal libre en España).

Si usas Trade Republic o DEGIRO y buscas la solución más simple para largo plazo: **VWCE es probablemente la mejor opción disponible en España para un ETF todo-en-uno**.

---

## Fuentes y lecturas complementarias

- [Vanguard — Ficha técnica VWCE](https://www.vanguard.co.uk/professional/en/etf/equity/9505/ftse-all-world-ucits-etf-usd-accumulating) — Datos oficiales, composición y metodología del fondo.
- [JustETF — VWCE](https://www.justetf.com/es/etf-profile.html?isin=IE00B3RBWM25) — Histórico de precios, patrimonio gestionado y datos de distribución.
- [Comparador VWCE vs CSPX vs IWDA — BogleHub](/blog/vwce-vs-cspx-vs-iwda) — Comparativa detallada de los tres ETFs más populares en España.
`,
  },
  {
    slug: 'amundi-prime-global-analisis',
    title: 'Amundi Prime Global: análisis del fondo indexado más barato de España (2026)',
    excerpt:
      'Análisis completo del Amundi Prime Global en 2026: TER 0,05%, disponible en MyInvestor con traspaso fiscal libre, comparativa con IWDA y Vanguard Global Stock.',
    publishedAt: '2026-05-24',
    readingMinutes: 8,
    keywords: ['Amundi Prime Global análisis', 'Amundi Prime Global MyInvestor', 'fondo indexado más barato España', 'Amundi Prime Global TER'],
    faq: [
      {
        q: '¿Qué es el Amundi Prime Global y qué índice replica?',
        a: 'El Amundi Prime Global es un fondo indexado UCITS que replica el índice Solactive GBS Global Markets Large & Mid Cap Index, que incluye aproximadamente 1.500-2.000 grandes y medianas empresas de mercados desarrollados de todo el mundo. Es equivalente funcional al MSCI World — no incluye mercados emergentes. Está disponible en MyInvestor desde 1 € de inversión mínima y permite traspaso fiscal entre fondos sin tributar.',
      },
      {
        q: '¿Cuánto cobra el Amundi Prime Global?',
        a: 'El TER del Amundi Prime Global es del 0,05% anual, el más bajo entre los fondos indexados globales disponibles en España para el inversor particular. Es notablemente más barato que el Vanguard Global Stock Index (0,18%) o el MSCI World de Fidelity (0,12%). Sobre 10.000€, la diferencia de coste entre Amundi Prime Global y Vanguard Global Stock es de ~13€ al año — pequeña, pero se acumula.',
      },
      {
        q: '¿Es mejor el Amundi Prime Global que el Vanguard Global Stock Index?',
        a: 'Depende de lo que valores. El Amundi Prime Global es más barato (TER 0,05% vs 0,18%) pero replica un índice diferente (Solactive en vez de MSCI). Los dos tienen rendimientos muy similares históricamente porque cubren el mismo universo de mercados desarrollados. Vanguard tiene más historial y es una gestora más conocida. En la práctica, para el inversor de largo plazo en España, ambos son excelentes opciones y la diferencia de 0,13% en TER es el único criterio objetivo de peso.',
      },
      {
        q: '¿El Amundi Prime Global incluye emergentes?',
        a: 'No. El índice Solactive GBS Global Markets Large & Mid Cap que replica cubre solo mercados desarrollados. Es equivalente funcional al MSCI World, no al FTSE All-World (que sí incluye emergentes). Si quieres exposición a emergentes junto con Amundi Prime Global, necesitas añadir un fondo de emergentes por separado. MyInvestor ofrece el Amundi Index MSCI Emerging Markets para completar la cobertura global.',
      },
      {
        q: '¿Cómo comprar el Amundi Prime Global en España?',
        a: 'El Amundi Prime Global está disponible principalmente en MyInvestor (desde 1 €, sin comisión de compra, con traspaso fiscal libre). También está disponible en otros brokers como Selfbank o a través de algunas gestoras, pero MyInvestor ofrece las mejores condiciones para el inversor particular. No está disponible en DEGIRO ni en Trade Republic porque es un fondo de inversión, no un ETF.',
      },
    ],
    content: `# Amundi Prime Global: análisis del fondo indexado más barato de España (2026)

El Amundi Prime Global es el fondo indexado con el TER más bajo disponible para inversores particulares en España: 0,05% anual. Combina ese coste mínimo con disponibilidad en MyInvestor sin mínimo significativo, acceso desde 1 €, y la ventaja fiscal del traspaso entre fondos sin tributar.

Para un inversor en España que quiere una exposición global a mercados desarrollados al menor coste posible y aprovechar la fiscalidad de los fondos de inversión, el Amundi Prime Global es difícilmente superable.

---

## Ficha técnica

| Dato | Valor |
|---|---|
| Nombre completo | Amundi Index Solutions - Amundi Prime Global |
| ISIN | LU1931974692 |
| Índice replicado | Solactive GBS Global Markets Large & Mid Cap |
| TER | 0,05% anual |
| Tipo de producto | Fondo de inversión UCITS |
| Política de dividendos | Acumulación |
| Mínimo de inversión (MyInvestor) | 1 € |
| Disponible para traspaso fiscal | ✓ (como fondo de inversión en España) |
| Domicilio | Luxemburgo |

---

## El índice Solactive: ¿es lo mismo que el MSCI World?

El Amundi Prime Global no replica el MSCI World sino el **Solactive GBS Global Markets Large & Mid Cap Index**, un índice propiedad de la empresa alemana Solactive AG. La razón es económica: los derechos de licencia del MSCI World son caros para la gestora; Solactive ofrece un índice alternativo más barato con la misma cobertura.

En la práctica, ambos índices cubren el mismo universo:
- Grandes y medianas empresas de mercados desarrollados
- Aproximadamente 23 países incluidos
- ~1.500-2.000 valores (frente a ~1.400 en el MSCI World)
- Ponderación por capitalización de mercado

La correlación histórica entre ambos índices supera el 99,9%. Para el inversor de largo plazo, la diferencia es estadísticamente irrelevante. Lo que sí importa es el TER: 0,05% frente al 0,20% del IWDA (MSCI World) o el 0,18% del Vanguard Global Stock Index.

---

## La ventaja fiscal clave: traspaso entre fondos

Aquí está la diferencia fundamental entre este fondo y un ETF equivalente como IWDA o SWRD.

En España, los fondos de inversión gozan del régimen de **traspaso fiscal diferido**: puedes mover dinero de un fondo a otro sin que el cambio genere un evento fiscal. El IRPF se difiere hasta el momento en que realmente retiras el dinero de los fondos y lo llevas a tu cuenta corriente.

Esto tiene implicaciones prácticas enormes:
- Puedes rebalancear tu cartera (de más renta variable a más renta fija a medida que te acercas a la jubilación) sin tributar por las plusvalías acumuladas
- Puedes cambiar de fondo si aparece uno mejor o más barato, sin coste fiscal
- Los dividendos ya se acumulan dentro del fondo sin tributar

Un ETF como IWDA no tiene este régimen: cada venta de ETF realiza la ganancia y tributa en el IRPF del año.

---

## Comparativa de costes: Amundi Prime Global vs alternativas

| Fondo/ETF | TER | Índice | Traspaso fiscal | Dónde |
|---|---|---|---|---|
| Amundi Prime Global | **0,05%** | Solactive GBS | ✓ | MyInvestor |
| Fidelity MSCI World | 0,12% | MSCI World | ✓ | MyInvestor, Fidelity |
| Vanguard Global Stock Index | 0,18% | MSCI World | ✓ | MyInvestor |
| SWRD (ETF) | 0,12% | MSCI World | ✗ | DEGIRO, Trade Republic |
| IWDA (ETF) | 0,20% | MSCI World | ✗ | DEGIRO, Trade Republic |

El Amundi Prime Global es el más barato de todos. La única razón para elegir Vanguard Global Stock Index sobre él es la preferencia por la marca Vanguard o la confianza en el índice MSCI frente al Solactive.

---

## El domicilio en Luxemburgo: ¿afecta a la fiscalidad?

A diferencia de los ETFs irlandeses (que aprovechan el convenio Irlanda-EE.UU. para pagar solo 15% de retención sobre dividendos americanos), el Amundi Prime Global está domiciliado en Luxemburgo. Luxemburgo tiene un convenio menos favorable con EE.UU. (retención del 30% en origen sobre dividendos americanos).

En la práctica, como el fondo es de **acumulación**, los dividendos se reinvierten internamente y el inversor no los declara hasta vender. La "pérdida" por la mayor retención en origen ya está reflejada en el precio de la participación — no se puede recuperar, pero tampoco genera un evento fiscal para el partícipe.

Para un fondo de acumulación a largo plazo, el impacto del domicilio es real pero difícil de cuantificar con precisión. La ventaja del menor TER (0,05% vs 0,20% del IWDA) suele compensar la menor eficiencia del domicilio luxemburgués.

---

## Para quién es el Amundi Prime Global

Es la opción ideal si:
- **Usas MyInvestor** como plataforma principal
- **Quieres el coste mínimo posible** en un fondo de mercados desarrollados
- **Valoras el traspaso fiscal libre** entre fondos
- **No necesitas emergentes** en ese fondo (los añadirías por separado)
- **Aportas cantidades pequeñas**: desde 1 €, sin comisión de compra

Para un inversor que ya usa Trade Republic o DEGIRO y no tiene intención de cambiar, los ETFs SWRD o IWDA son alternativas igualmente válidas y con el mismo nivel de calidad.

---

## La cartera mínima con Amundi Prime Global en MyInvestor

La cartera más sencilla que puedes construir con Amundi Prime Global:

- **80-90% Amundi Prime Global** (desarrollados globales)
- **10-20% Amundi Index MSCI Emerging Markets** (emergentes, TER 0,20%)

El resultado es una cartera global similar al FTSE All-World del VWCE, con traspaso fiscal libre, desde 1 € de aportación mínima y un coste total ponderado inferior al 0,10% anual. Para muchos inversores en España, esto es la cartera óptima.

---

## Fuentes y lecturas complementarias

- [Amundi — Ficha del fondo Amundi Prime Global](https://www.amundi.es) — Documentos oficiales, cartera y metodología del índice.
- [MyInvestor — Fondos indexados disponibles](https://myinvestor.es) — Plataforma donde encontrar el fondo con las mejores condiciones para el inversor particular en España.
- [Fondos indexados vs ETFs en España — BogleHub](/blog/fondos-indexados-vs-etfs-espana) — Guía completa sobre cuándo elegir cada vehículo.
`,
  },
  {
    slug: 'finizens-vs-indexa-capital-2026',
    title: 'Finizens vs Indexa Capital: qué roboadvisor elegir en España (2026)',
    excerpt:
      'Comparativa honesta entre Finizens e Indexa Capital en 2026: carteras, comisiones reales, rentabilidad y para qué perfil encaja mejor cada roboadvisor.',
    publishedAt: '2026-05-24',
    readingMinutes: 9,
    keywords: ['Finizens vs Indexa Capital', 'mejor roboadvisor España 2026', 'Finizens opinión', 'Finizens comisiones', 'comparativa roboadvisors España'],
    faq: [
      {
        q: '¿Cuál es más barato, Finizens o Indexa Capital?',
        a: 'Depende del patrimonio. Para patrimonios pequeños (<30.000€), Indexa suele ser ligeramente más barato en comisión de gestión. Para patrimonios medianos-grandes (>50.000€), Finizens aplica descuentos progresivos más agresivos y puede resultar más económico. En cualquier caso, la diferencia total entre ambos raramente supera el 0,10-0,15% anual. Ambos son significativamente más baratos que los fondos de gestión activa de los bancos tradicionales.',
      },
      {
        q: '¿Cuál tiene mejor rentabilidad histórica, Finizens o Indexa?',
        a: 'Ambos publican rentabilidades históricas auditadas en sus webs, pero la comparación directa es complicada porque sus perfiles de riesgo y los índices que usan son diferentes. Las diferencias de rentabilidad entre carteras equivalentes son mínimas a largo plazo (décimas de punto), ya que ambos invierten en fondos indexados de bajo coste con filosofía similar. Lo que más influye en la rentabilidad final es el perfil de riesgo que eliges y cuánto tiempo dejas crecer la inversión.',
      },
      {
        q: '¿Es seguro Finizens?',
        a: 'Sí. Finizens está registrado en la CNMV como agencia de valores (número de registro 286). El dinero se custodia en entidades bancarias reguladas separadas de Finizens. En caso de insolvencia de Finizens, los fondos en los que invierte son de tu propiedad y estarían cubiertos por el Fondo de Garantía de Inversores hasta 100.000€. Finizens tiene respaldo del grupo Global Savings Group y de varios fondos de inversión europeos.',
      },
      {
        q: '¿Puedo cambiar de Finizens a Indexa Capital sin tributar?',
        a: 'Sí, con matices. Tanto Finizens como Indexa invierten a través de fondos de inversión UCITS. El traspaso entre fondos de inversión en España no genera evento fiscal — el IRPF se difiere. Sin embargo, el proceso de traspasar de un roboadvisor a otro requiere coordinación entre ambas entidades y puede tardar semanas. Consulta con ambas antes de iniciar el proceso.',
      },
      {
        q: '¿Finizens tiene plan de pensiones indexado?',
        a: 'Sí. Finizens ofrece también plan de pensiones indexado (Finizens Pensiones), con la misma filosofía de carteras diversificadas en fondos de bajo coste. Es el equivalente al plan de pensiones de Indexa. Ambos son buenas opciones para el ahorro para la jubilación con ventaja fiscal en el IRPF (deducibles en la base imponible general hasta los límites legales).',
      },
    ],
    content: `# Finizens vs Indexa Capital: qué roboadvisor elegir en España (2026)

Indexa Capital e Finizens son los dos roboadvisors más utilizados entre los inversores indexados en España. Ambos invierten en fondos indexados de bajo coste, ambos rebalancean automáticamente y ambos son alternativas sólidas a la gestión activa de la banca tradicional. La pregunta es cuál encaja mejor con tu situación concreta.

Esta comparativa usa datos actualizados a 2026 y no recibe compensación de ninguna de las dos entidades.

---

## Comparativa rápida

| | Finizens | Indexa Capital |
|---|---|---|
| Tipo de entidad | Agencia de valores (CNMV 286) | ESI (CNMV 257) |
| Fondos usados | iShares, Vanguard, Amundi | Vanguard, iShares, Amundi |
| Nº de carteras | 5 (1-5) | 10 (1-10) |
| Mínimo apertura | 1.000 € | 3.000 € (fondos) |
| Plan de pensiones | ✓ | ✓ |
| Cuenta sin comisión | 0-10.000€ primer año (referido) | Primeros 10.000€ gratis (referido) |
| App móvil | ✓ | ✓ |
| Rebalanceo automático | ✓ | ✓ |
| Informe fiscal | ✓ | ✓ |

---

## Las carteras de Finizens

Finizens ofrece 5 carteras numeradas del 1 al 5, del más conservador al más arriesgado. La cartera 5 (máximo riesgo) tiene aproximadamente:

- ~80-85% renta variable global (vía ETFs de iShares y Vanguard)
- ~15-20% renta fija diversificada global

Los fondos que usa Finizens son en su mayoría de iShares (BlackRock) y Vanguard, todos UCITS con TER muy bajo. La composición incluye exposición a mercados desarrollados, emergentes, renta fija soberana y corporativa.

Una característica de Finizens es que también incluye oro en su cartera (a través de un ETC físico) para las carteras más conservadoras. Esto no es común en Indexa, que no incluye materias primas.

---

## Las carteras de Indexa Capital

Indexa ofrece una escala del 1 al 10, con más granularidad que Finizens. La cartera 10/10 (máximo riesgo) tiene aproximadamente:

- ~80% renta variable (global, emergentes, pequeñas empresas)
- ~20% renta fija (bonos gubernamentales y corporativos Europa)

Indexa usa fondos de Vanguard, iShares y Amundi. Una particularidad es su exposición explícita a **pequeñas empresas** (small caps) en las carteras con más riesgo, que históricamente han dado prima de rentabilidad adicional. Este factor pequeñas empresas no está presente en Finizens.

---

## Comisiones reales: quién cobra menos

Ambas entidades tienen estructura similar de tres capas de coste:

**Finizens** (coste total estimado):
- Comisión de gestión: 0,12% para los primeros 10.000€, hasta 0,099% para >100.000€
- Comisión custodia: ~0,10%
- TER de fondos: ~0,10-0,15%
- **Total aproximado: 0,32-0,37% para patrimonio pequeño**

**Indexa Capital** (coste total estimado):
- Comisión de gestión: 0,15% hasta 10.000€, bajando a 0,10% para >100.000€
- Comisión custodia: ~0,12%
- TER de fondos: ~0,10-0,15%
- **Total aproximado: 0,37-0,42% para patrimonio pequeño**

**Conclusión**: Finizens es marginalmente más barato en comisiones de gestión. La diferencia es pequeña (0-0,10% anual) y puede variar según el patrimonio.

---

## Rentabilidad histórica: un empate técnico

Ambos publican rentabilidades históricas en sus webs. La comparación directa es compleja porque sus perfiles de riesgo no son equivalentes (el perfil 3/5 de Finizens no tiene exactamente el mismo riesgo que el 6/10 de Indexa).

Lo que sí se puede afirmar con datos: ambos han sido consistentemente más rentables que los fondos de gestión activa equivalentes de la banca española, con diferencias inferiores al 1% anual entre carteras de riesgo similar. A largo plazo, las diferencias entre los dos roboadvisors son menores que las diferencias entre cualquiera de ellos y la gestión activa de banco.

---

## Diferencias que importan en la práctica

**Mínimo de apertura**: Finizens permite empezar desde 1.000 €; Indexa exige 3.000 € para la cuenta de fondos. Si tienes menos de 3.000 €, Finizens es la única opción de las dos.

**Granularidad del perfil de riesgo**: Indexa tiene 10 niveles frente a 5 de Finizens. Para quien quiere afinar más su asignación de activos, Indexa ofrece más precisión.

**Oro en cartera**: Finizens incluye ETC de oro en carteras conservadoras. Indexa no incluye materias primas.

**Small caps**: Indexa incluye factor pequeñas empresas en carteras de riesgo alto. Finizens no.

**Experiencia de usuario**: la app de Trade Republic tiene más usuarios satisfechos según valoraciones en tiendas de aplicaciones. Ambas son funcionales pero con diseños diferentes.

---

## ¿Cuál elegir?

**Elige Finizens si**:
- Tu patrimonio inicial es inferior a 3.000 €
- Prefieres carteras con más activos (oro incluido)
- Valoras la interfaz visual más sencilla
- Quieres el roboadvisor ligeramente más barato en comisiones de gestión

**Elige Indexa Capital si**:
- Quieres más granularidad en el perfil de riesgo (10 niveles)
- Prefieres exposición explícita a small caps
- Tienes más de 3.000 € para empezar
- Buscas la entidad con más historial y más patrimonio gestionado en España

En cualquier caso: **ambas son infinitamente mejores que un fondo de gestión activa bancario**. Si tienes que decidir en 10 minutos, elige cualquiera de las dos y empieza. La diferencia entre Finizens e Indexa es mucho menor que la diferencia entre cualquiera de los dos y no hacer nada.

Para cuantificar exactamente el coste de un roboadvisor frente a gestionar tu propia cartera, usa el [comparador de costes roboadvisor vs DIY](/calculadora/roboadvisor-vs-diy).

---

## Fuentes y lecturas complementarias

- [Finizens — Rentabilidad histórica oficial](https://finizens.com/rentabilidades) — Datos auditados de las carteras desde la apertura.
- [Indexa Capital — Rentabilidad histórica oficial](https://indexacapital.com/es/rentabilidad) — Datos auditados por tercero desde 2015.
- [CNMV — Registros de empresas de servicios de inversión](https://www.cnmv.es) — Verifica el registro de ambas entidades.
`,
  },
  {
    slug: 'como-declarar-etfs-hacienda',
    title: 'Cómo declarar ETFs en la declaración de la renta en España (2026)',
    excerpt:
      'Guía paso a paso para declarar la venta de ETFs en el IRPF 2026: cómo calcular la ganancia, el criterio FIFO, la retención a cuenta y cómo compensar pérdidas.',
    publishedAt: '2026-05-24',
    readingMinutes: 11,
    keywords: ['declarar ETFs renta España', 'ETFs IRPF 2026', 'como tributar ETFs España', 'ganancia patrimonial ETF IRPF', 'declaración renta ETFs'],
    faq: [
      {
        q: '¿Hay que declarar los ETFs en la declaración de la renta aunque no los haya vendido?',
        a: 'No, si solo los tienes y no los has vendido. Los ETFs de acumulación no generan ningún evento fiscal mientras los mantienes: los dividendos se reinvierten dentro del fondo y no se declaran. Solo tienes que incluir una operación con ETFs en la renta cuando la hayas vendido (reembolsado) y hayas obtenido una ganancia o pérdida patrimonial. Si el año pasado no vendiste nada, no hay nada que declarar por tus ETFs.',
      },
      {
        q: '¿Cuánto se paga de IRPF por vender un ETF con beneficio?',
        a: 'La ganancia tributa en la base del ahorro del IRPF con la escala progresiva 2026: 19% para los primeros 6.000€ de ganancia, 21% de 6.000€ a 50.000€, 23% de 50.000€ a 200.000€, 27% de 200.000€ a 300.000€ y 28% por encima de 300.000€. La mayoría de inversores particulares se quedan en el tramo del 19% o del 21%. Solo tributas por la ganancia (diferencia entre precio de venta y precio de compra), no por el total del dinero recibido.',
      },
      {
        q: '¿Qué es el criterio FIFO y cómo me afecta?',
        a: 'FIFO (First In, First Out) es el criterio que aplica Hacienda cuando has comprado el mismo ETF en varias ocasiones a precios distintos y luego vendes solo una parte. Hacienda considera que vendes primero las participaciones que compraste antes. Esto afecta al precio de compra que se usa para calcular la ganancia: si tus primeras compras fueron más baratas, la ganancia calculada puede ser mayor que si se usaran las más recientes.',
      },
      {
        q: '¿Tengo que incluir en la renta los ETFs de distribución aunque no haya vendido?',
        a: 'Sí, si el ETF reparte dividendos. Los dividendos de un ETF de distribución tributan como rendimientos del capital mobiliario en el año en que se cobran, aunque no vendas ninguna participación. Tu broker te enviará un certificado fiscal con los importes. Los dividendos ya llevan retención a cuenta del 19% aplicada en origen (en el caso de brokers españoles), que luego se descuenta del IRPF a pagar.',
      },
      {
        q: '¿Puedo compensar las pérdidas de ETFs con ganancias de otros ETFs o acciones?',
        a: 'Sí. Las pérdidas y ganancias patrimoniales derivadas de la venta de ETFs, acciones y fondos de inversión pueden compensarse entre sí dentro del mismo ejercicio. Si el saldo final es negativo, puedes arrastrarlo a los cuatro ejercicios siguientes. También puedes compensar (con límites) las pérdidas patrimoniales con los rendimientos del capital mobiliario (dividendos, intereses). La calculadora de IRPF de BogleHub te ayuda a estimar el impuesto antes de vender.',
      },
    ],
    content: `# Cómo declarar ETFs en la declaración de la renta en España (2026)

Declarar correctamente la venta de ETFs en el IRPF es más sencillo de lo que parece, pero hay detalles que conviene tener claros antes de rellenar el borrador: el criterio FIFO, la distinción entre ETFs de distribución y acumulación, la retención a cuenta y cómo compensar pérdidas.

Esta guía cubre el proceso completo para la declaración de la renta del ejercicio 2025 (campaña 2026), con los tipos del IRPF del ahorro vigentes.

---

## Cuándo tienes que declarar algo por tus ETFs

**Debes declarar si**:
- Has vendido (reembolsado) participaciones de un ETF y has obtenido ganancia o pérdida
- Has cobrado dividendos de un ETF de distribución
- Tienes cuentas en el extranjero con saldo superior a 50.000€ (Modelo 720, aunque solo para información — sin efecto en cuota)

**No debes declarar si**:
- Tienes ETFs de acumulación que no has vendido (no hay evento fiscal)
- Has traspasado fondos de inversión entre sí (no aplica a ETFs — los ETFs no tienen régimen de traspaso)
- Tienes ETFs con pérdidas que no has vendido

---

## Paso 1: Calcular la ganancia o pérdida patrimonial

La ganancia es la diferencia entre:
- **Valor de transmisión**: lo que recibiste por vender, menos comisiones de venta
- **Valor de adquisición**: lo que pagaste al comprar, más comisiones de compra

\`\`\`
Ganancia = (Precio venta × nº participaciones − comisiones venta)
         − (Precio compra × nº participaciones + comisiones compra)
\`\`\`

**Ejemplo práctico**:
- Compraste 100 participaciones de VWCE a 90€ + 1€ de comisión = 9.001€
- Vendiste 100 participaciones a 115€ − 1€ de comisión = 11.499€
- Ganancia = 11.499 − 9.001 = **2.498€**
- Impuesto al 19% = 474,62€

La [calculadora de IRPF de BogleHub](/calculadora/irpf-venta-fondos) te hace este cálculo automáticamente con desglose por tramos.

---

## Paso 2: El criterio FIFO — qué pasa si compraste en varias veces

Si has comprado el mismo ETF en distintas fechas a precios diferentes y luego vendes solo una parte, Hacienda aplica el **criterio FIFO** (First In, First Out): se consideran vendidas primero las participaciones más antiguas.

**Ejemplo**:
- Enero 2023: 50 participaciones a 80€ = 4.000€
- Enero 2024: 50 participaciones a 100€ = 5.000€
- Julio 2025: vendes 50 participaciones a 120€

FIFO considera que vendiste las 50 de enero 2023:
- Ganancia = (50 × 120) − 4.000 = 6.000 − 4.000 = **2.000€**

Si en cambio usáramos LIFO (últimas en entrar, primeras en salir):
- Ganancia = 6.000 − 5.000 = 1.000€ (menos impuesto, pero no es lo que aplica Hacienda)

Tu broker debería informarte del precio medio de adquisición y la ganancia calculada en el certificado fiscal anual.

---

## Paso 3: Dónde se declara en el borrador de la renta

Las ganancias y pérdidas por venta de ETFs van en la **base del ahorro**, sección de ganancias y pérdidas patrimoniales derivadas de la transmisión de elementos patrimoniales:

1. Accede a la Renta Web de la AEAT (renta.agenciatributaria.gob.es)
2. Importa el borrador con los datos fiscales de tu broker (muchos brokers envían los datos a la AEAT directamente)
3. Revisa el apartado "Ganancias y pérdidas patrimoniales — transmisiones"
4. Cada operación de venta aparece con: fecha de compra, fecha de venta, valor de adquisición, valor de transmisión y ganancia/pérdida

Si el broker no ha enviado los datos (frecuente con brokers extranjeros como DEGIRO o Trade Republic), tendrás que introducirlos manualmente con el certificado fiscal que te enviaron.

---

## Paso 4: Los tipos del IRPF del ahorro en 2026

La ganancia patrimonial tributa en la base del ahorro con esta escala progresiva:

| Base del ahorro | Tipo |
|---|---|
| Hasta 6.000€ | 19% |
| 6.000€ – 50.000€ | 21% |
| 50.000€ – 200.000€ | 23% |
| 200.000€ – 300.000€ | 27% |
| Más de 300.000€ | 28% |

El impuesto es progresivo: si ganas 10.000€, pagas el 19% de los primeros 6.000€ (1.140€) y el 21% de los 4.000€ restantes (840€). Total: 1.980€, no 10.000 × 21% = 2.100€.

---

## Paso 5: Compensar pérdidas con ganancias

Las pérdidas patrimoniales del año (incluidas las de ETFs, acciones y fondos) compensan las ganancias del mismo tipo. El proceso:

1. Suma todas las ganancias del año: +5.000€
2. Suma todas las pérdidas del año: −2.000€
3. Base imponible neta: +3.000€
4. Impuesto: 19% de 3.000€ = 570€

Si el saldo es negativo (más pérdidas que ganancias), puedes arrastrarlo a los **4 ejercicios siguientes** para compensar futuras ganancias.

**Regla de los dos meses**: si vendes un ETF o acción con pérdidas y recompras el mismo valor cotizado en los dos meses anteriores o posteriores, Hacienda rechaza la pérdida (anti-lavado de pérdidas fiscales). Espera más de dos meses antes de recomprar, o compra un ETF diferente que siga el mismo índice.

---

## ETFs de distribución: los dividendos sí tributan cada año

Si tienes ETFs que reparten dividendos (distribución), cada pago tributa como rendimiento del capital mobiliario al 19-28% según importe. No importa que no hayas vendido ninguna participación.

Los brokers con sede en España aplican una **retención a cuenta del 19%** en el momento del cobro. Esa retención se resta del impuesto final a pagar en la declaración. Si la retención fue suficiente, puede que te devuelvan parte.

Los brokers extranjeros (DEGIRO, Trade Republic) normalmente no aplican retención española — eres tú quien debe declarar y pagar directamente. El certificado fiscal del broker desglosará todos los dividendos del año.

---

## ETFs de acumulación: sin eventos fiscales hasta que vendas

Los ETFs de acumulación (Acc) reinvierten los dividendos dentro del fondo. Desde la perspectiva del IRPF español, **no hay evento fiscal** por los dividendos reinvertidos. Solo tributas cuando vendes participaciones, por la diferencia entre precio de venta y precio de compra.

Este es uno de los principales motivos por los que los ETFs de acumulación son más eficientes para inversores en España en fase de crecimiento.

---

## Errores frecuentes al declarar ETFs

1. **Declarar el importe total de la venta como ganancia**: solo tributa la ganancia (venta menos compra), no el total recibido
2. **Olvidar las comisiones**: tanto las de compra como las de venta reducen la ganancia declarable
3. **No aplicar el FIFO correctamente**: puede calcular una ganancia diferente a la real
4. **Confundir el traspaso de fondos con la venta de ETFs**: el traspaso entre fondos no tributa; vender un ETF sí lo hace siempre
5. **No declarar dividendos de ETFs de distribución en brokers extranjeros**: son rendimientos del capital mobiliario aunque no hayas vendido nada

---

## Fuentes y lecturas complementarias

- [AEAT — Renta Web 2026](https://sede.agenciatributaria.gob.es) — Plataforma oficial para presentar la declaración de la renta.
- [AEAT — Manual IRPF 2025](https://www.agenciatributaria.es/AEAT.internet/Inicio/Ayuda/Manuales__Folletos_y_Videos/Manuales_de_ayuda_en_la_presentacion_de_declaraciones/Ejercicio_2025/) — Manual oficial con los criterios aplicables a ganancias patrimoniales.
- [Calculadora IRPF venta de fondos y ETFs — BogleHub](/calculadora/irpf-venta-fondos) — Calcula el impuesto antes de vender con desglose por tramos.
`,
  },
  {
    slug: 'riesgo-divisa-etf-hedged-espana',
    title: 'Riesgo divisa en ETFs: ¿cubrir o no cubrir siendo inversor en euros? (2026)',
    excerpt:
      'Qué es el riesgo de tipo de cambio en ETFs globales, por qué los ETFs en USD no implican riesgo USD real, y cuándo tiene sentido un ETF hedged para inversores en España.',
    publishedAt: '2026-05-24',
    readingMinutes: 8,
    keywords: ['riesgo divisa ETF España', 'ETF hedged vs no hedged', 'ETF cubierto divisa euros', 'riesgo tipo cambio inversión indexada', 'IWDA hedged EUR'],
    faq: [
      {
        q: '¿Un ETF que cotiza en USD me expone al riesgo del dólar?',
        a: 'No directamente. La divisa en la que cotiza el ETF (USD, EUR, GBP) es solo la divisa de negociación, no la divisa de los activos subyacentes. Un ETF de MSCI World que cotiza en USD invierte en acciones de empresas de todo el mundo en sus divisas locales: Microsoft en USD, ASML en EUR, Toyota en JPY. Tu exposición real es a esa cesta de divisas, no al USD. Si el euro se aprecia frente a esa cesta de divisas, tu retorno en euros será inferior al retorno en USD; si se deprecia, será superior.',
      },
      {
        q: '¿Qué es un ETF hedged (cubierto de divisa)?',
        a: 'Un ETF hedged utiliza contratos de divisa a plazo (forwards) para neutralizar el efecto del tipo de cambio entre la divisa de los activos y el euro. Por ejemplo, IWDA (MSCI World sin cobertura) y IWDE o equivalentes (MSCI World con cobertura EUR) invierten en los mismos activos, pero el hedged elimina la variación del tipo de cambio. A cambio, la cobertura tiene un coste: el "coste de cobertura" o roll yield, que puede ser positivo o negativo según el diferencial de tipos de interés entre divisas.',
      },
      {
        q: '¿Conviene usar ETFs hedged en euros para renta variable?',
        a: 'Para renta variable a largo plazo, generalmente NO merece la pena. El coste de cobertura puede oscilar entre el 0,5% y el 2% anual según el diferencial de tipos de interés. A largo plazo (10-30 años), las divisas tienden a revertir a la media y los efectos cambiarios se diluyen. La volatilidad divisa añade un 2-4% de volatilidad anual a una cartera global, que ya tiene un 15-20% de volatilidad intrínseca — no cambia significativamente el riesgo. El coste de la cobertura, en cambio, sí es permanente.',
      },
      {
        q: '¿Y para renta fija? ¿Tienen sentido los ETFs de bonos hedged?',
        a: 'Para renta fija, la cobertura de divisa tiene mucho más sentido. Los bonos tienen una volatilidad baja (2-5% anual), por lo que el riesgo divisa (que añade otro 5-10% de volatilidad) puede dominar completamente el retorno. Un ETF de bonos gubernamentales globales sin cobertura se comporta más como un ETF de divisas que como un inversor en renta fija. Por eso, para la parte de renta fija de una cartera indexada en España, los ETFs con cobertura EUR son generalmente preferibles.',
      },
      {
        q: '¿Qué ETFs hedged en EUR están disponibles en España?',
        a: 'Algunos de los más usados: HEDJ (WisdomTree Europe Hedged Equity, aunque más específico), EUNL o equivalentes en versión hedged de iShares para MSCI World EUR hedged, y para renta fija: AGGH (iShares Core Global Aggregate Bond UCITS ETF EUR Hedged, TER 0,10%) que cubre bonos globales en euros. La versión EUR Hedged suele llevar "EUR Hedged" o "EUNL" en el nombre. Verifica siempre en JustETF el TER y la liquidez antes de comprar.',
      },
    ],
    content: `# Riesgo divisa en ETFs: ¿cubrir o no cubrir siendo inversor en euros? (2026)

Una de las preguntas más frecuentes entre inversores indexados españoles: "Si compro un ETF que cotiza en dólares, ¿estoy expuesto al riesgo del dólar?". La respuesta no es obvia y hay una confusión muy extendida entre la divisa de cotización y la divisa de los activos subyacentes.

Esta guía aclara qué riesgo divisa real tiene un ETF global, cuándo tiene sentido cubrirlo y cuándo no.

---

## La confusión fundamental: divisa de cotización vs divisa de activos

Cuando compras VWCE en Xetra, el ETF cotiza en euros y pagas en euros. Si compras VWRA en la Bolsa de Londres, cotiza en dólares y necesitas dólares. Pero **el valor del fondo en ambos casos depende exactamente de las mismas acciones subyacentes**: Microsoft, Apple, Samsung, Nestlé, Toyota y otras 3.700 empresas en sus respectivas divisas locales.

La divisa de cotización solo afecta a la divisa en que ves el precio en pantalla y en la que tu broker liquida la operación. No cambia el riesgo real de la cartera.

---

## El riesgo divisa real de un ETF de renta variable global

Cuando inviertes en un ETF global como VWCE o IWDA, tienes exposición a una cesta de divisas ponderada por capitalización de mercado aproximadamente así:

| Divisa | Peso aproximado |
|---|---|
| Dólar estadounidense (USD) | ~63% |
| Euro (EUR) | ~11% |
| Yen japonés (JPY) | ~6% |
| Libra esterlina (GBP) | ~4% |
| Otras divisas desarrolladas | ~5% |
| Divisas emergentes | ~11% |

Esto significa que si el euro se aprecia un 10% frente a todas esas divisas, tu cartera global valdrá aproximadamente un 10% menos en euros (a igual precio de las acciones en sus divisas locales). Y si el euro se deprecia un 10%, tu cartera valdría ~10% más en euros.

Esto es el riesgo divisa real: la variación del euro frente a la cesta de divisas del fondo.

---

## ¿Por qué no cubrir la divisa en renta variable?

Para inversores a largo plazo en renta variable, hay tres razones principales para no cubrir:

**1. El coste de la cobertura es permanente; el efecto divisa, no**

Cubrir la divisa tiene un coste: el diferencial de tipos de interés entre el euro y las divisas cubiertas (principalmente el USD). Cuando los tipos en EE.UU. son más altos que en la eurozona, cubrir el USD cuesta dinero (puedes pagar 0,5-2% anual adicional). Ese coste es seguro y se paga todos los años.

El efecto del tipo de cambio, en cambio, es volátil: a veces beneficia al inversor en euros y a veces perjudica. A largo plazo (10-30 años), las divisas tienden a revertir hacia valores de equilibrio. El coste de cobertura acumulado puede superar fácilmente el efecto divisa neto.

**2. La volatilidad que añade el riesgo divisa es relativamente pequeña**

La renta variable global ya tiene una volatilidad intrínseca de ~15-20% anual. El riesgo divisa añade aproximadamente 2-4% adicional de volatilidad. Para el inversor de largo plazo, esa diferencia tiene poco impacto en el resultado final: la prima de riesgo de la renta variable compensa con creces la volatilidad adicional.

**3. Diversificación de divisas como protección**

Tener activos en múltiples divisas es en sí mismo una forma de diversificación. Si la economía española o la eurozona atraviesa una crisis con depreciación del euro, tener inversiones en USD, JPY y otras divisas puede amortiguar el impacto en tu patrimonio real.

---

## Cuándo sí tiene sentido cubrir la divisa: renta fija

Aquí la respuesta cambia radicalmente. Los bonos tienen una volatilidad intrínseca baja: los bonos gubernamentales de alta calidad oscilan entre el 2% y el 7% anual de volatilidad. Si añades el riesgo divisa (5-10% adicional de volatilidad), el comportamiento de la renta fija pasa a estar dominado por el tipo de cambio, no por el riesgo de crédito o de tipos de interés.

Un ejemplo: el índice Bloomberg Global Aggregate Bond (bonos globales sin cubrir) tuvo en 2022 una caída del ~16% en USD. Desde la perspectiva de un inversor en euros, la caída fue diferente según la evolución del EUR/USD. La renta fija dejó de actuar como amortiguador de la cartera porque el movimiento de divisas dominó el resultado.

**Regla práctica**: para la parte de renta fija de una cartera indexada en España, usa ETFs con cobertura EUR. El ETF más popular para esto es **AGGH** (iShares Core Global Aggregate Bond UCITS ETF EUR Hedged, TER 0,10%), que cubre bonos gubernamentales y corporativos globales en euros.

---

## ETFs hedged vs no hedged: el coste real

La versión hedged de cualquier ETF suele tener:
- Un TER algo más alto (0,05-0,15% adicional)
- Un "coste de roll" de la cobertura que varía con los tipos de interés

En 2022-2024, con tipos americanos más altos que europeos, cubrir el USD costaba aproximadamente 1,5-2% anual adicional. En entornos de tipos similares entre zonas, el coste puede ser casi nulo o incluso ligeramente positivo.

Este coste no aparece siempre visible en el TER del fondo: queda implícito en el "tracking difference" respecto al índice no cubierto.

---

## Conclusión práctica para un inversor en España

| Activo | ¿Cubrir divisa? | Razón |
|---|---|---|
| Renta variable global | **No** | Coste > beneficio a largo plazo |
| Renta variable mercados emergentes | **No** | Coste de cobertura muy alto; divisas EM ya son volátiles |
| Renta fija global | **Sí** | Volatilidad baja → divisa domina; cobertura tiene sentido |
| Renta fija corporativa high yield | **Opcional** | Más volatilidad que IG; el argumento de cobertura es más débil |

La cartera indexada estándar para un inversor español: renta variable sin cubrir (VWCE o IWDA+EIMI) + renta fija con cobertura EUR (AGGH o equivalente). Este esquema da la exposición global que buscamos sin pagar el coste innecesario de cubrir la divisa en la parte de mayor retorno esperado.

Para comparar ETFs con y sin cobertura divisa disponibles en España, usa el [comparador de ETFs de BogleHub](/comparar).

---

## Fuentes y lecturas complementarias

- [JustETF — Comparador de ETFs con cobertura EUR](https://www.justetf.com/es/) — Filtra por "EUR Hedged" para ver las opciones disponibles en España con datos de TER y tracking difference.
- [iShares — Ficha AGGH](https://www.ishares.com/es/inversores-particulares/es/productos/291768/ishares-core-global-aggregate-bond-ucits-etf) — ETF de renta fija global con cobertura EUR, el más popular para la parte de bonos de una cartera indexada.
- [Guía de ETFs MSCI World para España — BogleHub](/etfs/msci-world) — Comparativa de todos los ETFs de MSCI World disponibles en España con datos de TER y domicilio.
`,
  },
]
