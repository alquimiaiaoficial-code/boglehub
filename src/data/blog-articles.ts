export interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  readingMinutes: number
  keywords: string[]
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

El MSCI World cubre 23 países desarrollados y aproximadamente 1 400 empresas. Al excluir emergentes, elimina el riesgo político y regulatorio de China, la volatilidad de Brasil o la opacidad contable de ciertas empresas rusas (ya excluidas del índice desde 2022, de todas formas).

La contraparte: si India o Indonesia se convierten en las grandes economías del siglo XXI, el IWDA no las capturará hasta que pasen a "desarrollado" según criterios MSCI.

### El combo IWDA + EMIM

Una estrategia popular entre inversores avanzados es construir el equivalente al VWCE manualmente: 88 % IWDA + 12 % EMIM (iShares Core MSCI Emerging Markets, ISIN IE00BKM4GZ66, TER 0,18 %). El resultado es exposición similar al FTSE All-World con TER ponderado de ~0,20 % (vs 0,22 % del VWCE). La ventaja: control preciso del peso a emergentes.

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
- **ETF acumulación**: solo tributas al vender. El capital que habrías pagado en impuestos anuales sigue compuesto en el fondo durante décadas

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

El convenio fiscal entre Irlanda y EE. UU. establece una retención reducida del 15 % sobre dividendos de acciones americanas pagados al ETF. Como el S&P 500 y el MSCI World son principalmente empresas americanas, esto es muy relevante.

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
- ETF de acumulación (sin fricción fiscal anual)
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
El timing del mercado no funciona. Los estudios muestran que "lump sum" (invertir todo de una vez) bate al "dollar cost averaging" el ~66 % del tiempo. Y ambos baten a esperar.

### Mito 4: "FIRE significa aburrirse"
El movimiento FIRE en su versión madura trata sobre libertad, no inactividad. La mayoría de personas que alcanzan FIRE trabajan en algo diferente: proyectos propios, trabajo parcial elegido, voluntariado. La diferencia es que ya no **necesitan** el dinero de ese trabajo.

### Mito 5: "Los impuestos destruirán mi retiro"
Con una retirada de 28 000 €/año en base del ahorro y bien planificada, el IRPF efectivo es manejable. Los primeros 6 000 € tributan al 19 %, el resto al 21–23 %. La planificación de cuando realizas plusvalías importa mucho.

---

*Información educativa, no asesoramiento financiero. Verifica con tu asesor fiscal antes de tomar decisiones.*

**¿Quieres analizar tu cartera con IA?** Prueba el [analizador gratis](/analyzer).
**¿Tienes preguntas?** Pregúntale al [Chat IA en español](/chat).
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

**Día 3**: Define tu objetivo: ¿cuánto necesitas para tu número FIRE? Usa la regla del 3,5 % y las tablas de esta guía.

**Día 4**: Elige tu cartera. Para la mayoría: 100 % VWCE si eres joven y agresivo; 80/20 VWCE/AGGH si quieres algo de estabilidad. Una posición, un ETF.

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
]
