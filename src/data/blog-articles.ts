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
]
