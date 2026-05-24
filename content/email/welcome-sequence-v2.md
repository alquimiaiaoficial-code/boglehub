# Secuencia de bienvenida (emails 2-4)

El email #1 (bienvenida instantánea) lo envía automáticamente la ruta
`/api/newsletter` cuando alguien se suscribe. Está en `src/lib/welcome-email.ts`.

Estos tres se pegan en Resend → Broadcasts cuando quieras lanzarlos. El
calendario recomendado es relativo a la fecha de suscripción, pero Resend
Broadcasts no tiene aún drip por defecto: lo más práctico es agruparlos por
ventanas (los suscritos en la última semana, los del último mes, etc.) y enviar
manualmente cada 3-7 días.

Voz: natural, directa, español de España, sin sonar a IA, sin viñetas de
marketing. Las URLs se autocompletan a `boglehub.com`.

---

## Email 2 — Día 3

**Asunto**: Cómo usar el analizador en 2 minutos

**Pre-header**: La parte difícil no es montar la cartera, es entender la tuya.

### HTML (pegar en Resend → Body → HTML mode)

```html
<p>Hola,</p>

<p>Hace tres días te suscribiste a BogleHub. Si todavía no has probado el analizador, este es el correo en el que te explico cómo se usa, porque es lo más útil del sitio y mucha gente no lo descubre.</p>

<p>Va así:</p>

<p>1. Entras en <a href="https://boglehub.com/analyzer">boglehub.com/analyzer</a>.<br>
2. Añades cada uno de tus fondos o ETFs con su ticker o ISIN y el porcentaje que ocupa en tu cartera. Si tienes el extracto en PDF, lo subes y BogleHub intenta leerlo (de momento funciona bien con MyInvestor; otros brokers están en camino).<br>
3. Pulsas Analizar. La IA te devuelve un informe con tu diversificación geográfica, el coste real anual que pagas, posibles solapamientos entre fondos y un grado fiscal A-F para cada uno.</p>

<p>El paso que más sorprende a la gente es el del coste. Cuando ves cuánto pagas <em>en euros</em>, no en porcentaje pequeño, se entiende mejor por qué media docena de fondos caros se comen una porción importante a 20 años.</p>

<p>Tus datos no salen del navegador en ningún momento. No hay registro, no hay servidor que los guarde. Si cierras la pestaña, se borran.</p>

<p>Pruébalo y, si algo no se entiende, responde a este correo. Lo leo.</p>

<p>—<br>
BogleHub</p>
```

### Texto plano (Resend lo deriva automáticamente del HTML, pero por si acaso)

```
Hola,

Hace tres días te suscribiste a BogleHub. Si todavía no has probado el analizador, este es el correo en el que te explico cómo se usa, porque es lo más útil del sitio y mucha gente no lo descubre.

Va así:

1. Entras en https://boglehub.com/analyzer.
2. Añades cada uno de tus fondos o ETFs con su ticker o ISIN y el porcentaje que ocupa en tu cartera. Si tienes el extracto en PDF, lo subes y BogleHub intenta leerlo.
3. Pulsas Analizar. La IA te devuelve un informe con tu diversificación geográfica, el coste real anual que pagas, posibles solapamientos entre fondos y un grado fiscal A-F para cada uno.

El paso que más sorprende a la gente es el del coste. Cuando ves cuánto pagas en euros, no en porcentaje pequeño, se entiende mejor por qué media docena de fondos caros se comen una porción importante a 20 años.

Tus datos no salen del navegador en ningún momento. No hay registro, no hay servidor que los guarde.

Pruébalo y, si algo no se entiende, responde a este correo. Lo leo.

—
BogleHub
```

---

## Email 3 — Día 7

**Asunto**: El error más caro que comete el inversor indexado típico

**Pre-header**: No, no es elegir el ETF equivocado. Es comprar dos que hacen lo mismo.

### HTML

```html
<p>Hola otra vez,</p>

<p>Quería contarte el error más común que aparece cuando analizo carteras en BogleHub: el solapamiento.</p>

<p>Funciona así. Lees por internet que MSCI World es una buena base. Lo compras. Luego ves en otro sitio que el S&P 500 ha rendido genial los últimos años. Lo añades. Después oyes hablar del Nasdaq-100 y te llama. Lo añades también. Tres ETFs distintos en la cartera, sensación de estar diversificado.</p>

<p>Pero el MSCI World tiene aproximadamente un 70% de empresas estadounidenses. Y dentro de ese 70%, las grandes tecnológicas (Apple, Microsoft, Nvidia, Alphabet, Amazon, Meta) son aproximadamente un cuarto del índice. El S&P 500 es 100% USA y esas mismas tecnológicas son un peso enorme. El Nasdaq-100 es básicamente esas mismas tecnológicas concentradas.</p>

<p>El resultado: la cartera está sobreexpuesta a 6-7 acciones gigantes, sin que el inversor lo sepa. Cuando esas empresas vayan bien, lo notarás (bien). Cuando vayan mal, también lo notarás (mal). Y todo eso lo decidiste sin querer.</p>

<p>Si quieres profundizar, lo desarrollé en este artículo:</p>

<p><a href="https://boglehub.com/blog/solapamiento-etfs-error-silencioso">Solapamiento de ETFs: el error silencioso que comete medio Twitter financiero</a></p>

<p>Y si quieres ver si tu cartera lo tiene, el analizador te lo dice directamente:</p>

<p><a href="https://boglehub.com/analyzer">Analizar mi cartera</a></p>

<p>—<br>
BogleHub</p>
```

### Texto plano

```
Hola otra vez,

Quería contarte el error más común que aparece cuando analizo carteras en BogleHub: el solapamiento.

Funciona así. Lees por internet que MSCI World es una buena base. Lo compras. Luego ves en otro sitio que el S&P 500 ha rendido genial los últimos años. Lo añades. Después oyes hablar del Nasdaq-100 y te llama. Lo añades también. Tres ETFs distintos en la cartera, sensación de estar diversificado.

Pero el MSCI World tiene aproximadamente un 70% de empresas estadounidenses. Y dentro de ese 70%, las grandes tecnológicas (Apple, Microsoft, Nvidia, Alphabet, Amazon, Meta) son aproximadamente un cuarto del índice. El S&P 500 es 100% USA y esas mismas tecnológicas son un peso enorme. El Nasdaq-100 es básicamente esas mismas tecnológicas concentradas.

El resultado: la cartera está sobreexpuesta a 6-7 acciones gigantes, sin que el inversor lo sepa. Cuando esas empresas vayan bien, lo notarás (bien). Cuando vayan mal, también lo notarás (mal). Y todo eso lo decidiste sin querer.

Si quieres profundizar:
https://boglehub.com/blog/solapamiento-etfs-error-silencioso

Y si quieres ver si tu cartera lo tiene, el analizador te lo dice:
https://boglehub.com/analyzer

—
BogleHub
```

---

## Email 4 — Día 14

**Asunto**: Una pregunta rápida

**Pre-header**: Te leo si me cuentas.

### HTML

```html
<p>Hola,</p>

<p>Llevas un par de semanas en BogleHub. Antes de que esto se convierta en otra newsletter más a la que dejas de hacer caso, una pregunta rápida.</p>

<p>¿Qué te falta?</p>

<p>Una herramienta concreta que echas en falta, un tema del que no encuentras nada bueno en español, una duda que ningún sitio te resuelve. Lo que sea.</p>

<p>Responde a este correo en una línea, dos como mucho. Las respuestas las miro yo, no es un buzón automatizado. Y lo que me pidan varias personas, lo intento construir.</p>

<p>Eso es todo.</p>

<p>—<br>
BogleHub</p>

<p style="font-size:12px;color:#71717a;margin-top:24px;">PD: si no se te ocurre nada concreto, también vale "ninguno". Saber que la herramienta encaja también es información útil.</p>
```

### Texto plano

```
Hola,

Llevas un par de semanas en BogleHub. Antes de que esto se convierta en otra newsletter más a la que dejas de hacer caso, una pregunta rápida.

¿Qué te falta?

Una herramienta concreta que echas en falta, un tema del que no encuentras nada bueno en español, una duda que ningún sitio te resuelve. Lo que sea.

Responde a este correo en una línea, dos como mucho. Las respuestas las miro yo, no es un buzón automatizado. Y lo que me pidan varias personas, lo intento construir.

Eso es todo.

—
BogleHub

PD: si no se te ocurre nada concreto, también vale "ninguno". Saber que la herramienta encaja también es información útil.
```

---

## Notas operativas

- **Cuándo enviar**: Resend Broadcasts no tiene drip automático todavía. Lo más práctico es enviar el #2 a la gente que se suscribió hace ~3 días, el #3 a la que se suscribió hace ~7, el #4 a la que se suscribió hace ~14. Resend te deja filtrar la audiencia por fecha de alta.
- **A/B**: cuando tengas 50-100 suscriptores, prueba variantes de asunto. El #4 es el que más se beneficia (es el menos esperado).
- **Métricas**: con click tracking desactivado, mira solo `delivered` y respuestas directas. Las respuestas al #4 son la métrica que importa.
- **Si alguien responde**, contesta tú directamente desde Gmail. Las respuestas van a `RESEND_REPLY_TO` (tu Gmail).
- **Si alguien escribe BAJA**, bórralo manualmente de la audiencia en Resend hasta que añadamos one-click unsubscribe.
