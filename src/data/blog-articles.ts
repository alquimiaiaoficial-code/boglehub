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
    slug: 'renta-4-opinion-2026',
    title: 'Renta 4 Banco: opinión y análisis para invertir en ETFs (2026)',
    excerpt:
      'Renta 4 es un banco de inversión español veterano con oficinas, pero sus comisiones de ETF y custodia lo hacen caro frente a MyInvestor. Para quién encaja.',
    publishedAt: '2026-06-04',
    readingMinutes: 8,
    keywords: ['Renta 4 opinión', 'Renta 4 Banco ETFs', 'Renta 4 comisiones', 'Renta 4 custodia', 'invertir Renta 4 2026'],
    faq: [
      {
        q: '¿Renta 4 es una buena opción para invertir en ETFs en 2026?',
        a: 'Para la mayoría de inversores indexados particulares, opciones como MyInvestor son bastante más económicas con productos equivalentes. Renta 4 tiene sentido si valoras el servicio en oficina o ya eres cliente histórico. Sus comisiones de ~7-10€ por orden de ETF, más la custodia anual, hacen que para aportaciones pequeñas el coste sea significativo.',
      },
      {
        q: '¿Renta 4 cobra comisión de custodia?',
        a: 'Sí. Renta 4 aplica una comisión de custodia anual sobre los valores, un coste recurrente que la mayoría de brokers digitales (Trade Republic, MyInvestor, DEGIRO) no cobran. Junto con la comisión por operación, es el principal motivo por el que resulta caro para el inversor indexado. Consulta las tarifas vigentes en su web, porque varían según el saldo y el tipo de cuenta.',
      },
      {
        q: '¿Ofrece Renta 4 los mismos fondos indexados baratos que MyInvestor?',
        a: 'Renta 4 dispone de fondos indexados, pero su acceso a las clases más baratas de Vanguard, Amundi o iShares es más limitado que el de MyInvestor, especializado en ofrecer el TER más bajo. Para una cartera indexada de bajo coste con traspaso fiscal, MyInvestor suele ser mejor opción.',
      },
      {
        q: '¿Es seguro Renta 4?',
        a: 'Sí. Renta 4 es un banco español fundado en 1986, regulado por la CNMV y el Banco de España, con cobertura del Fondo de Garantía de Depósitos y del Fondo de Garantía de Inversiones hasta 100.000€. Tus valores se custodian separados del balance del banco. Su solidez es alta; su desventaja es el coste, no la seguridad.',
      },
      {
        q: '¿Merece la pena Renta 4 frente a MyInvestor?',
        a: 'En coste, MyInvestor gana con claridad: 0,20€ + 0,03% por ETF y sin custodia, frente a los ~7-10€ por orden más custodia de Renta 4, con un catálogo de fondos indexados baratos más amplio. Renta 4 compensa si valoras el servicio en oficina, el asesoramiento personal o ya eres cliente y prefieres no cambiar.',
      },
    ],
    content: `# Renta 4 Banco: opinión y análisis para invertir en ETFs (2026)

Renta 4 es uno de los nombres más veteranos de la inversión en España: un banco especializado, con oficinas físicas y décadas de historia, que durante mucho tiempo fue la opción natural para quien quería tener fondos, ETFs y planes de pensiones bajo el mismo techo y con trato personal. La pregunta en 2026, con brokers digitales a 0€, es si ese servicio sigue compensando su coste. Este análisis, sin afiliación, lo aclara.

La conclusión por adelantado: Renta 4 es un banco solvente y completo, pero caro para el inversor indexado. Tiene sentido si valoras el servicio en oficina o ya eres cliente; si solo buscas comprar ETFs o fondos indexados al menor coste, hay opciones bastante más baratas.

---

## Quién es Renta 4

Renta 4 Banco es una entidad española fundada en **1986**, regulada por la **CNMV** y el **Banco de España**, y miembro del mercado bursátil español. A diferencia de los neobrokers, es un banco de inversión de pleno derecho: ofrece cuenta de valores, fondos, planes de pensiones, ETFs, renta fija y asesoramiento, con red de oficinas y gestores. Su cobertura es la máxima: **Fondo de Garantía de Depósitos y de Inversiones hasta 100.000€**.

Esa amplitud y ese trato personal son su propuesta de valor. El coste es la contrapartida.

---

## Comisiones: el punto débil para el inversor indexado

Renta 4 cobra del orden de **7-10€ por orden de ETF**, además de **comisiones de custodia** y otras posibles según el producto. Frente a la generación digital, la diferencia es notable:

| Bróker | Comisión por orden de ETF | Custodia |
|---|---|---|
| Trade Republic | 0€ | No |
| MyInvestor | 0,20€ + 0,03% | No |
| DEGIRO | 0,50€ + 0,004% (mín. 0,90€) | No (cuenta Custody) |
| **Renta 4** | **~7-10€** | **Sí (anual)** |

Hay dos costes que conviene mirar con lupa en Renta 4: la **comisión por operación** y, sobre todo, la **comisión de custodia anual** sobre los valores, que la mayoría de brokers digitales no cobran. Para un inversor indexado que aporta poco y a menudo, esa combinación encarece mucho la entrada y el mantenimiento.

---

## El coste real para el ahorrador mensual

Sobre una aportación de 200€, una comisión de 7-10€ supone un **3,5%-5% solo por entrar**, a lo que se suma la custodia recurrente. En inversión indexada, donde el coste es el factor que mejor predice el resultado a largo plazo, ese peaje continuado es difícil de justificar cuando existen alternativas a 0€ o céntimos.

Renta 4 se diluye mejor en patrimonios altos y operativa poco frecuente, donde la comisión fija pesa poco en términos relativos y el servicio personalizado aporta valor.

---

## ¿Y los fondos indexados?

Renta 4 ofrece una selección de fondos indexados, con la ventaja del **traspaso fiscal libre** que comparten todos los fondos en España. El matiz es el catálogo: el acceso a las clases más baratas de Vanguard, Amundi o iShares es **más limitado** que en [MyInvestor](/blog/myinvestor-opinion-2026), que se ha especializado precisamente en ofrecer los fondos indexados con el TER más bajo del mercado. Para construir una cartera indexada barata con traspaso, MyInvestor sigue siendo la referencia; la [guía de mejores fondos indexados](/blog/mejores-fondos-indexados-espana-2026) detalla las opciones.

---

## Seguridad

En solidez, Renta 4 está al máximo nivel: banco español regulado por CNMV y Banco de España, con casi cuatro décadas de historia y cobertura de 100.000€ por los fondos de garantía de depósitos e inversiones. Como en el resto de casos, sus valores se custodian segregados de su balance. La seguridad no es el problema de Renta 4; el coste, sí.

---

## Para quién tiene sentido Renta 4 (y para quién no)

**Tiene sentido si:**
- Valoras el servicio en oficina y el trato con un gestor de carne y hueso.
- Tienes un patrimonio alto y operas poco, de modo que las comisiones fijas se diluyen.
- Ya eres cliente histórico y prefieres no fragmentar tus inversiones.

**No tiene sentido si:**
- Aportas cantidades pequeñas o medianas de forma regular.
- Buscas el coste mínimo en ETFs o el TER más bajo en fondos indexados.
- No necesitas oficinas ni asesoramiento y te basta una app.

---

## Conclusión práctica

Renta 4 es un banco de inversión serio y completo, con la ventaja del trato personal y la tranquilidad de una entidad veterana. Pero para el inversor indexado que prioriza el coste —que debería ser casi todos—, sus comisiones de operación y custodia lo dejan por detrás de las opciones digitales. Si valoras el servicio y puedes asumir el coste, es una opción legítima; si no, [MyInvestor](/blog/myinvestor-opinion-2026) ofrece productos equivalentes mucho más baratos.

Para comparar Renta 4 con el resto según tu patrón real de aportación, usa el [comparador de brókers de BogleHub](/calculadora/comparar-brokers) o lee la [comparativa del mejor broker para ETFs](/blog/mejor-broker-etfs-espana-2026).

---

## Fuentes y lecturas complementarias

- [Renta 4 Banco — Web oficial](https://www.r4.com) — Tarifas de corretaje, comisiones de custodia y catálogo de fondos.
- [MyInvestor opinión 2026 — BogleHub](/blog/myinvestor-opinion-2026) — La alternativa española barata para ETFs y fondos indexados con traspaso fiscal.
- [Mejores fondos indexados en España 2026 — BogleHub](/blog/mejores-fondos-indexados-espana-2026) — Los fondos con el TER más bajo y dónde contratarlos.
- [Cómo elegir tu primer ETF en España — BogleHub](/blog/como-elegir-tu-primer-etf-espana-2026) — Guía para empezar con buen pie.
`,
  },
  {
    slug: 'ing-opinion-2026',
    title: 'ING y el Naranja Broker: opinión para invertir en ETFs (2026)',
    excerpt:
      'ING tiene la mejor cuenta sin comisiones, pero su Naranja Broker es de los más caros (9-22€ por orden). Cuándo compensa y cuándo invertir desde otro bróker.',
    publishedAt: '2026-06-04',
    readingMinutes: 8,
    keywords: ['ING opinión', 'Naranja Broker ING', 'ING ETFs', 'ING broker comisiones', 'invertir con ING 2026'],
    faq: [
      {
        q: '¿ING es una buena opción para invertir en ETFs en 2026?',
        a: 'Para el inversor indexado puro, las comisiones del Naranja Broker (~9-22€ por orden) son altas frente a brokers especializados como Trade Republic (0€), MyInvestor o DEGIRO. La Cuenta Sin Nómina de ING es excelente, pero para invertir de forma regular compensa operar en otra entidad. Puedes mantener la nómina en ING y el broker fuera sin ninguna penalización.',
      },
      {
        q: '¿Cuánto cobra el Naranja Broker de ING por comprar ETFs?',
        a: 'Aproximadamente 9-22€ por orden de compra o venta, según el importe y el mercado. Es de las comisiones más altas entre las opciones habituales en España. Sobre una aportación de 200€, una comisión de 10€ supone un 5% de coste solo por entrar; por eso el Naranja Broker solo se diluye en órdenes grandes y poco frecuentes. Verifica las tarifas vigentes en la web oficial de ING.',
      },
      {
        q: '¿Merece la pena tener la nómina en ING y el broker en otra entidad?',
        a: 'Sí, es una estrategia habitual y sin penalización. Aprovechas la Cuenta Sin Nómina sin comisiones de ING para el día a día y compras tus ETFs en un broker barato (Trade Republic, MyInvestor o DEGIRO). No hay ninguna obligación de invertir en el mismo banco donde tienes la cuenta.',
      },
      {
        q: '¿Los Fondos Naranja de ING son una buena forma de invertir indexado?',
        a: 'Son fondos indexados con la ventaja del traspaso fiscal libre, pero su TER es más alto que el de los fondos indexados más baratos (Vanguard, Amundi, iShares) que comercializa MyInvestor. En inversión indexada el coste es determinante a largo plazo, así que para fondos con traspaso y TER mínimo hay opciones mejores que los Fondos Naranja.',
      },
      {
        q: '¿Es seguro invertir con ING en España?',
        a: 'Sí. ING está regulado por el Banco de España y la CNMV. El efectivo está cubierto por el Fondo de Garantía de Depósitos hasta 100.000€ y los valores por el Fondo de Garantía de Inversiones (FOGAIN) hasta 100.000€. La solidez regulatoria de ING es máxima; su punto débil es el coste de invertir, no la seguridad.',
      },
    ],
    content: `# ING y el Naranja Broker: opinión para invertir en ETFs (2026)

ING es, probablemente, el banco online con mejor reputación de España: la Cuenta Sin Nómina sin comisiones convenció a millones de personas de que la banca podía ser gratis y sencilla. Pero cuando esos mismos clientes deciden invertir en ETFs a través del Naranja Broker, se topan con una realidad incómoda: es uno de los brokers más caros del mercado. Este análisis, sin afiliación, separa lo que ING hace muy bien (la cuenta) de lo que hace caro (invertir), para que sepas exactamente cómo usarlo.

La conclusión por adelantado: ING es un banco excelente para tu día a día y una opción cara para invertir de forma regular. La buena noticia es que no tienes que elegir: puedes quedarte con la cuenta de ING y comprar tus ETFs en otro sitio.

---

## Quién es ING en España

ING Bank N.V., Sucursal en España, opera desde 1999 y está supervisado por el **Banco de España** y la **CNMV**. Es un banco de pleno derecho —no un broker ni un neobanco— con cobertura del **Fondo de Garantía de Depósitos español hasta 100.000€**. Su producto estrella es la Cuenta Sin Nómina, una cuenta corriente sin comisiones de mantenimiento ni condiciones de domiciliación.

Para invertir, ING ofrece el **Naranja Broker** (acciones y ETFs) y sus propios **Fondos Naranja** (fondos indexados de gestión propia). La calidad del banco es indiscutible; la cuestión es si su oferta de inversión es competitiva. En coste, no lo es.

---

## La Cuenta Sin Nómina: lo mejor de ING

Aquí ING brilla. La Cuenta Sin Nómina no cobra comisiones de administración ni mantenimiento, no exige domiciliar nómina y viene con tarjetas sin coste. Para la operativa diaria —cobrar, pagar, domiciliar recibos— es de las mejores cuentas de España, y de vez en cuando ING lanza remuneraciones promocionales para nuevos clientes (verifica las condiciones vigentes, porque cambian).

Si ya eres cliente de ING por la cuenta, tiene todo el sentido seguir usándola. El problema aparece solo cuando intentas invertir desde ahí.

---

## El Naranja Broker: cómodo, pero caro

El Naranja Broker cobra aproximadamente **9-22€ por orden** de compra o venta de ETFs, según el importe y el mercado. Comparado con la generación de brokers digitales, la diferencia es enorme:

| Bróker | Comisión por orden de ETF |
|---|---|
| Trade Republic | 0€ |
| MyInvestor | 0,20€ + 0,03% |
| DEGIRO | 0,50€ + 0,004% (mín. 0,90€) |
| **ING (Naranja Broker)** | **~9-22€** |

No es un matiz: es la diferencia entre pagar 0€ y pagar el equivalente a una comida por cada compra. Y, como verás abajo, sobre aportaciones pequeñas ese coste se come una parte enorme de tu inversión.

---

## El coste real de una comisión alta

El problema de una comisión fija alta es que destroza las aportaciones pequeñas y regulares, que son precisamente la base de la inversión indexada sana (el famoso DCA).

Si aportas **200€ al mes** y pagas **10€ de comisión** por cada compra, estás perdiendo un **5% de cada aportación solo en entrar** —antes de que el mercado se mueva—. En Trade Republic o MyInvestor ese mismo movimiento cuesta 0€ o céntimos. A lo largo de los años, ese 5% recurrente es una sangría que el interés compuesto convierte en miles de euros.

La comisión de ING solo se diluye en órdenes grandes y poco frecuentes: si inviertes 10.000€ de golpe, 15€ es un 0,15%, asumible. Por eso el Naranja Broker tiene sentido únicamente para quien aporta sumas grandes muy de vez en cuando, no para el ahorrador mensual.

---

## ¿Y los Fondos Naranja?

ING comercializa sus propios fondos indexados, los **Fondos Naranja**, que replican índices como el IBEX 35, el Euro Stoxx 50, el S&P 500 o un índice mundial. Tienen dos ventajas reales: se contratan sin comisión de suscripción y, al ser fondos, disfrutan del **traspaso fiscal libre** (puedes cambiar de fondo sin tributar la plusvalía).

El pero es el coste: el TER de los Fondos Naranja es **más alto que el de los fondos indexados más baratos** disponibles en España (los de Vanguard, Amundi o iShares que comercializa MyInvestor). En inversión indexada, donde el coste es el factor que mejor predice el resultado a largo plazo, esa diferencia importa. Si quieres fondos indexados con traspaso fiscal y el TER más bajo posible, [MyInvestor](/blog/myinvestor-opinion-2026) sigue siendo la referencia; la [guía del traspaso de fondos](/blog/como-hacer-traspaso-fondos-espana) explica cómo mover tu dinero sin coste fiscal.

---

## Seguridad

ING es un banco regulado por el Banco de España y la CNMV. El efectivo está cubierto por el **Fondo de Garantía de Depósitos hasta 100.000€**, y los valores por el **Fondo de Garantía de Inversiones (FOGAIN) hasta 100.000€**. En solidez y respaldo regulatorio, ING está al máximo nivel: el problema de su oferta de inversión es el coste, no la seguridad.

---

## Para quién tiene sentido ING (y para quién no)

**Tiene sentido si:**
- Ya eres cliente de ING y valoras tenerlo todo en el mismo banco.
- Inviertes sumas grandes y muy poco frecuentes, donde la comisión fija se diluye.
- Priorizas la comodidad y la marca por encima de optimizar cada euro de coste.

**No tiene sentido si:**
- Aportas cantidades pequeñas o medianas de forma regular (la comisión te penaliza muchísimo).
- Buscas el coste mínimo en ETFs o en fondos indexados.
- Quieres automatizar aportaciones periódicas (ING no tiene planes de ahorro a 0€).

---

## La estrategia inteligente: nómina en ING, inversión fuera

No tienes que renunciar a ING. La jugada que mejor combina lo bueno de cada entidad es sencilla:

- **Tu cuenta del día a día en ING**: cuenta sin comisiones, tarjetas, recibos.
- **Tus inversiones en un bróker especializado**: [Trade Republic](/blog/trade-republic-opinion-2026) para ETFs a 0€ con planes de ahorro automáticos, o [MyInvestor](/blog/myinvestor-opinion-2026) si quieres combinar ETFs con fondos indexados de traspaso fiscal.

Mantener la nómina en un banco y la inversión en otro es perfectamente normal y no tiene ninguna penalización. Es, de hecho, lo que hacen muchos inversores indexados que valoran la cuenta de ING pero no quieren pagar sus comisiones de broker.

---

## Conclusión práctica

ING es un gran banco con una oferta de inversión cara. Su Cuenta Sin Nómina merece la pena por sí sola, pero el Naranja Broker y los Fondos Naranja son difíciles de justificar para un inversor indexado sensible al coste cuando existen alternativas a 0€ o casi. Úsalo como banco, no como broker.

Para comparar ING con el resto de opciones según tu patrón real de aportación, usa el [comparador de brókers de BogleHub](/calculadora/comparar-brokers) o lee la [comparativa del mejor broker para ETFs en España](/blog/mejor-broker-etfs-espana-2026).

---

## Fuentes y lecturas complementarias

- [ING España — Web oficial](https://www.ing.es) — Condiciones de la Cuenta Sin Nómina, tarifas del Naranja Broker y Fondos Naranja.
- [Mejor broker para ETFs en España 2026 — BogleHub](/blog/mejor-broker-etfs-espana-2026) — Comparativa de los cinco brokers más usados por inversores indexados, ING incluido.
- [MyInvestor opinión 2026 — BogleHub](/blog/myinvestor-opinion-2026) — La alternativa española para combinar ETFs y fondos indexados con traspaso fiscal.
- [Cómo elegir tu primer ETF en España — BogleHub](/blog/como-elegir-tu-primer-etf-espana-2026) — Guía para empezar con buen pie si ING no te encaja.
`,
  },
  {
    slug: 'interactive-brokers-opinion-2026',
    title: 'Interactive Brokers (IBKR): opinión y análisis completo en España (2026)',
    excerpt:
      'Interactive Brokers (IBKR): comisiones mínimas y acceso a 150 mercados, pero interfaz técnica y fiscalidad por tu cuenta. Para quién encaja en España.',
    publishedAt: '2026-06-04',
    readingMinutes: 9,
    keywords: ['Interactive Brokers opinión', 'IBKR España', 'Interactive Brokers comisiones', 'IBKR ETFs 2026', 'Interactive Brokers fiscalidad España'],
    faq: [
      {
        q: '¿Es Interactive Brokers seguro para invertir desde España?',
        a: 'Sí. La sucursal europea, Interactive Brokers Ireland Limited, está regulada por el Central Bank of Ireland, y tus valores se custodian segregados del balance del broker. El Investor Compensation Scheme irlandés cubre hasta 20.000€ si el broker quiebra (no las pérdidas de mercado). Eso sí: IBKR no es un banco, así que no hay garantía de depósitos de 100.000€ sobre el efectivo, solo la de inversiones.',
      },
      {
        q: '¿Tengo que presentar el modelo 720 o el modelo D6 por mi cuenta de IBKR?',
        a: 'El modelo 720 (bienes en el extranjero) hay que presentarlo si el conjunto de tus valores y cuentas fuera de España supera los 50.000€, y IBKR cuenta como entidad extranjera. El modelo D6, en cambio, dejó de ser exigible para la cartera minorista tras la Orden ECM/57/2024: la mayoría de inversores particulares ya no lo presentan. En todo caso, plusvalías y dividendos tributan en el IRPF igual que con un broker español, pero la declaración recae enteramente en ti.',
      },
      {
        q: '¿IBKR Lite o IBKR Pro?',
        a: 'IBKR Lite ofrece 0€ de comisión en acciones de EE.UU. pero opera con order flow (vende las órdenes a creadores de mercado). IBKR Pro cobra comisiones escalonadas muy bajas y no hace order flow. Para el inversor europeo que compra ETFs UCITS, las diferencias prácticas son menores; ambos son válidos.',
      },
      {
        q: '¿Tiene Interactive Brokers cuenta remunerada en euros?',
        a: 'Sí. IBKR remunera el saldo en euros no invertido por encima de cierto umbral (en torno a 1.000-10.000€) con una tasa cercana al tipo de depósito del BCE menos un pequeño margen. Es competitiva, pero las condiciones son específicas y cambian con la política monetaria: verifica siempre la tasa vigente en la web oficial.',
      },
      {
        q: '¿Para quién merece la pena IBKR frente a Trade Republic?',
        a: 'IBKR tiene ventaja cuando tienes una cartera grande, necesitas acceso a muchos mercados o divisas, o quieres conversión de divisa barata al comprar en dólares. Para empezar con aportaciones pequeñas y automatizadas, Trade Republic es más sencillo, igual de barato (0€) y suficiente. La interfaz de IBKR es técnica y tiene curva de aprendizaje.',
      },
    ],
    content: `# Interactive Brokers (IBKR): opinión y análisis completo en España (2026)

Interactive Brokers es el broker que casi todos los inversores avanzados acaban mirando tarde o temprano: comisiones de las más bajas del mundo, acceso a 150 mercados y la solidez de una empresa fundada en 1978. Pero también es el broker con la interfaz más técnica y el que más responsabilidad fiscal deja en tus manos. Este análisis explica, sin afiliación ni comisiones por recomendarte nada, cuándo IBKR tiene sentido para un inversor indexado en España y cuándo es más herramienta de la que necesitas.

La conclusión por adelantado: IBKR brilla en carteras grandes y perfiles que valoran el coste mínimo y el alcance global. Para quien empieza con aportaciones pequeñas y automatizadas, hay opciones más sencillas e igual de baratas.

---

## Quién es Interactive Brokers

Interactive Brokers (IBKR) es uno de los brokers más antiguos y respetados del mundo. Fundado en 1978 en Estados Unidos, cotiza en bolsa (Nasdaq) y da servicio tanto a instituciones como a particulares. Para los residentes en España, lo relevante es su sucursal europea: **Interactive Brokers Ireland Limited**, regulada por el **Central Bank of Ireland (CBI)**.

Su escala es difícil de igualar: acceso a más de **150 mercados en 33 países y 27 divisas**, con ETFs, fondos, acciones, bonos, futuros, opciones y divisas en una sola cuenta. Para el inversor indexado esto es, en realidad, más de lo que necesita; pero explica por qué IBKR es la herramienta de referencia para carteras grandes o internacionales.

---

## Comisiones para ETFs

La propuesta de IBKR no es el "0€ comercial" de Trade Republic o XTB, sino un coste **variable muy bajo que se vuelve casi insignificante en volumen**. IBKR ofrece dos esquemas:

- **IBKR Lite**: comisiones fijas y 0€ en acciones de EE.UU. A cambio, opera con order flow (vende las órdenes a creadores de mercado).
- **IBKR Pro**: comisiones escalonadas muy bajas (un porcentaje pequeño del importe con un mínimo reducido por operación) y sin order flow.

Para ETFs europeos UCITS, la comisión escalonada de IBKR Pro es muy competitiva, sobre todo a partir de órdenes de unos pocos miles de euros. En importes pequeños, el mínimo por operación pesa más en términos relativos: ahí un broker de 0€ puro como Trade Republic sale mejor para aportaciones de 100-200€.

Donde IBKR marca diferencia es en el **cambio de divisa**. Si compras ETFs cotizados en dólares o libras, su conversión es de las más baratas del mercado (un margen mínimo sobre el tipo interbancario), frente a los márgenes opacos que aplican muchos brokers. Para carteras grandes con exposición en varias divisas, ese detalle ahorra más que la propia comisión de compra.

**Nota**: las comisiones exactas cambian con el tiempo y el plan elegido. Verifica siempre las tarifas vigentes en la web oficial antes de operar.

---

## IBKR Lite vs IBKR Pro: cuál elegir

Para un inversor indexado europeo que compra ETFs UCITS de acumulación, las diferencias prácticas entre Lite y Pro son menores. La distinción de fondo es el **order flow**: IBKR Lite financia su 0€ vendiendo el flujo de órdenes, mientras que IBKR Pro cobra una comisión transparente y ejecuta buscando el mejor precio. Si te incomoda el order flow o quieres la ejecución más limpia, Pro es la opción coherente; si priorizas el coste fijo y operas donde Lite es gratis, Lite cumple.

---

## Fiscalidad en España: lo que cambia con un broker extranjero

Esta es la parte que más confusión genera y donde IBKR exige más de ti. Un broker español (MyInvestor, Renta 4) practica retenciones y reporta a Hacienda; un broker extranjero como IBKR **no lo hace por ti**. Las consecuencias prácticas:

- **Plusvalías y dividendos tributan igual** que con cualquier broker: en la base del ahorro del IRPF (tramos del 19% al 28% en 2026). Lo que cambia no es el impuesto, sino quién rellena la declaración: tú.
- **Modelo 720**: si el conjunto de tus cuentas y valores en el extranjero supera los **50.000€**, debes declararlo. Tu cartera en IBKR cuenta como bienes en el extranjero. Tras la sentencia europea que tumbó el régimen sancionador desproporcionado, las multas se han suavizado, pero **la obligación de informar sigue vigente**.
- **Modelo D6**: durante años se creyó obligatorio para inversiones en el extranjero. Desde la **Orden ECM/57/2024 dejó de ser exigible para la cartera minorista**: la inmensa mayoría de inversores particulares ya no tienen que presentarlo. Lo explicamos en [¿hay que presentar el modelo D6 por tus ETFs?](/blog/modelo-d6-etf-espana).

Ninguna de estas obligaciones es insalvable —miles de inversores españoles usan IBKR sin incidencias—, pero conviene asumirlas con los ojos abiertos. Si la idea de autoliquidar plusvalías y vigilar el 720 te agota, un broker o banco español te quita ese trabajo. Para el detalle de cómo declarar tus ETFs, consulta la [guía de fiscalidad de ETFs en España](/blog/fiscalidad-etfs-espana-guia-completa).

---

## Seguridad y regulación

**Regulación**: la sucursal europea Interactive Brokers Ireland Limited está supervisada por el Central Bank of Ireland. La matriz estadounidense es una entidad cotizada en Nasdaq, con las obligaciones de transparencia y auditoría que eso conlleva.

**Segregación de activos**: tus valores se mantienen separados del patrimonio del broker. En caso de insolvencia de IBKR, no forman parte de la masa concursal.

**Garantía de inversión**: el Investor Compensation Scheme irlandés cubre hasta **20.000€** por cliente. Es el mismo nivel que DEGIRO y la mitad que el de un banco español (que llega a 100.000€). Importante: esta garantía cubre el fallo del broker, no las pérdidas de mercado de tus inversiones.

**No es un banco**: IBKR no ofrece garantía de depósitos de 100.000€ sobre el efectivo. El dinero no invertido se gestiona como saldo de broker, no como depósito bancario.

---

## La cuenta remunerada

IBKR remunera el **saldo en euros no invertido** por encima de cierto umbral (en torno a 1.000-10.000€, según condiciones) a una tasa cercana al tipo de depósito del BCE menos un pequeño margen. Es competitiva, especialmente para saldos altos, aunque no es el reclamo comercial de su negocio. Como toda remuneración ligada a tipos, fluctúa con la política del BCE: verifica la tasa vigente antes de contar con ella.

---

## ¿Permite fondos indexados con traspaso fiscal?

Conviene ser preciso aquí, porque es una fuente habitual de malentendidos. IBKR da acceso a **fondos de inversión** de múltiples gestoras internacionales. Lo que **no** ofrece es el régimen español de **traspaso fiscal libre** entre fondos —cambiar de fondo sin tributar la plusvalía—, que es una ventaja ligada a la comercialización en España.

Si tu estrategia se apoya en traspasar entre fondos indexados sin pasar por Hacienda (una de las grandes ventajas fiscales del inversor español), IBKR no es la herramienta: para eso necesitas un comercializador español como **MyInvestor**. Lo vemos en la [opinión de MyInvestor 2026](/blog/myinvestor-opinion-2026) y en la [guía del traspaso de fondos](/blog/como-hacer-traspaso-fondos-espana). IBKR es un broker de ETFs y valores, no un supermercado de fondos con traspaso.

---

## Para quién tiene sentido IBKR (y para quién no)

**Ideal para:**
- Carteras grandes (a partir de varias decenas de miles de euros), donde la comisión escalonada y el cambio de divisa barato pesan de verdad.
- Inversores que necesitan acceso a muchos mercados internacionales o varias divisas.
- Perfiles avanzados o semiprofesionales que quieren ETFs, acciones, futuros, opciones o divisas en una sola cuenta.

**No ideal si:**
- Empiezas con aportaciones pequeñas (100-300€/mes): la interfaz es técnica y un broker de 0€ puro es más simple y barato para ese caso.
- Solo quieres comprar 1 o 2 ETFs al mes y automatizar: es matar moscas a cañonazos.
- No quieres encargarte tú de toda la declaración fiscal.

---

## IBKR frente a Trade Republic y DEGIRO

| Característica | Interactive Brokers | Trade Republic | DEGIRO |
|---|---|---|---|
| Comisión ETFs | Variable, muy baja en volumen | 0€ | 0,50€ + 0,004% (mín. 0,90€) |
| Cambio de divisa | De los más baratos | Estándar | Con margen |
| Planes de ahorro automáticos | No (operativa manual) | Sí (desde 1€) | No |
| Cuenta remunerada | Sobre saldo no invertido | ~2-2,5% TAE | No |
| Regulador | CBI (Irlanda) | BaFin (Alemania) | AFM (Países Bajos) |
| Garantía de inversión | 20.000€ | 100.000€ (depósitos) | 20.000€ |
| Mercados | 150 mercados | Europa + EE.UU. | 50+ bolsas |
| Interfaz | Profesional, compleja | Móvil, muy simple | Web técnica |

Frente a **Trade Republic**, IBKR gana en alcance y en coste a gran escala, pero pierde en sencillez y automatización. Frente a **DEGIRO**, ambos apuntan al inversor exigente: DEGIRO es algo más accesible; IBKR, más potente y global. Si dudas entre los dos, el [análisis de DEGIRO 2026](/blog/degiro-opinion-2026) ayuda a decidir.

---

## Conclusión práctica

Interactive Brokers es, objetivamente, uno de los mejores brokers del mundo por coste y alcance. Pero "el mejor del mundo" no significa "el mejor para ti": su interfaz técnica y la carga fiscal que deja en tus manos lo hacen poco recomendable como primer broker para quien empieza con poco. Donde IBKR no tiene rival es en carteras grandes, exposición multidivisa y perfiles que saben lo que hacen.

Si tu caso es ese, IBKR te dará el coste más bajo durante décadas. Si estás empezando, probablemente te convenga más [Trade Republic](/blog/trade-republic-opinion-2026) para los ETFs o [MyInvestor](/blog/myinvestor-opinion-2026) para combinarlos con fondos indexados, y dejar IBKR para cuando tu cartera y tu soltura lo justifiquen. Para comparar las cinco opciones según tu patrón real, usa el [comparador de brókers de BogleHub](/calculadora/comparar-brokers) o lee la [comparativa del mejor broker para ETFs](/blog/mejor-broker-etfs-espana-2026).

---

## Fuentes y lecturas complementarias

- [Interactive Brokers — Web oficial](https://www.interactivebrokers.com) — Tarifas vigentes, planes Lite/Pro y condiciones de la cuenta remunerada.
- [Central Bank of Ireland](https://www.centralbank.ie) — Regulador de Interactive Brokers Ireland Limited; verifica el registro de la entidad.
- [Mejor broker para ETFs en España 2026 — BogleHub](/blog/mejor-broker-etfs-espana-2026) — Comparativa de los cinco brokers más usados por inversores indexados.
- [DEGIRO opinión 2026 — BogleHub](/blog/degiro-opinion-2026) — El otro broker para carteras grandes, con acceso a 50+ bolsas.
- [¿Hay que presentar el modelo D6 por tus ETFs? — BogleHub](/blog/modelo-d6-etf-espana) — Qué cambió con la Orden ECM/57/2024.
`,
  },
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
        a: 'Para un primer inversor en España, VWCE (Vanguard FTSE All-World Acc) es la opción más recomendada: domiciliado en Irlanda (fiscalmente eficiente), acumulación, TER 0,19% y diversificación global en un solo fondo. Si prefieres mayor exposición a EE.UU., IWDA o SWRD son alternativas de MSCI World igualmente válidas.',
      },
      {
        q: '¿Qué domicilio debe tener un ETF para ser eficiente fiscalmente en España?',
        a: 'Irlanda es el domicilio óptimo para inversores residentes en España. Los ETFs irlandeses se benefician del convenio de doble imposición con EE.UU., lo que reduce la retención de dividendos al 15% (frente al 30% de otros domicilios). Busca ISINs que empiecen por IE.',
      },
      {
        q: '¿Qué TER máximo debería aceptar en un ETF indexado?',
        a: 'Para ETFs de renta variable global (MSCI World, S&P 500, All-World), un TER por encima del 0,30% anual es difícilmente justificable en 2026, cuando existen alternativas desde 0,03% (SPXS) hasta 0,19% (VWCE). Para renta fija o emergentes, un TER hasta 0,25% es razonable.',
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

**Conclusión práctica**: cuando exista la opción, elige ETFs domiciliados en Irlanda. El ISIN de los ETFs irlandeses empieza por "IE". Por ejemplo, el VWCE (Vanguard FTSE All-World) tiene ISIN IE00BK5BQT80.

### 3. Método de replicación

Los ETFs replican su índice de tres formas:

- **Replicación física total**: el fondo compra literalmente todas las acciones del índice. Alta transparencia. Ejemplo: VWCE (más de 3 500 valores).
- **Replicación física por muestreo**: compra una muestra representativa. Útil para índices con miles de valores pequeños e ilíquidos. Ejemplo: IWDA (MSCI World).
- **Replicación sintética (swap)**: usa derivados para replicar el retorno. Puede ser más eficiente en ciertos mercados pero introduce riesgo de contraparte.

Para un inversor Boglehead que empieza, **replicación física** (total o por muestreo) es la opción más sencilla y transparente.

### 4. Política de distribución: acumulación vs distribución

- **ETFs de acumulación (Acc)**: reinvierten automáticamente los dividendos. No hay evento fiscal hasta que vendas. Ideales para crecimiento a largo plazo.
- **ETFs de distribución (Dist)**: reparten dividendos periódicamente. Cada pago tributa como rendimiento del capital mobiliario en tu IRPF del año.

**Recomendación**: para un inversor largo-placista en España, los ETFs de **acumulación** son más eficientes fiscalmente. Solo considera distribución si necesitas flujo de caja (por ejemplo, en la fase de retiro). Puedes ver todos los [ETFs de acumulación disponibles en España](/etfs/acumulacion) y compararlos por TER y grado fiscal.

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
| ISIN | IE00BK5BQT80 |
| Ticker | VWCE |
| TER | 0,19 % |
| Holdings | ~3 600 |
| Índice | FTSE All-World |
| Domicilio | Irlanda |
| Distribución | Acumulación |

**Por qué es el favorito para empezar**: el VWCE incluye tanto países desarrollados como emergentes en una sola posición. Con un TER de 0,19 % y más de 3 600 empresas de 50 países, es la definición de diversificación global. Si solo puedes tener un ETF en tu vida, este es el candidato.

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

**Por qué es una gran alternativa**: el IWDA sigue el MSCI World, que cubre solo países desarrollados (~23 países). No incluye mercados emergentes. TER prácticamente idéntico al del VWCE (0,20 % vs 0,19 % tras la rebaja del VWCE a 0,19 % en 2025). Es ideal si prefieres limitarte a mercados más maduros o si ya tienes exposición a emergentes por otro vehículo.

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
- [Cómo invertir en el S&P 500 desde España — BogleHub](/blog/como-invertir-sp500-espana) — Guía centrada solo en el S&P 500 (CSPX): ETFs, fondos y por qué no puedes comprar el SPY americano.
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
        a: 'El TER refleja el coste de gestionar el fondo. CSPX cubre solo 500 empresas americanas (simple de replicar), mientras que VWCE cubre más de 4.000 empresas en 50 países (más complejo). VWCE cobra 0,19% frente al 0,07% de CSPX. La diferencia de coste real anual sobre 10.000€ es de apenas 12€ — significativa a largo plazo pero no determinante si VWCE es la opción que mejor encaja en tu estrategia.',
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
| TER | 0,19 % | 0,07 % | 0,20 % |
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
- **ISIN**: IE00BK5BQT80
- **Ticker**: VWCE (Xetra), VWRP (LSE en GBP)
- **TER**: 0,19 %
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

### TER: 0,19 %, competitivo tras la rebaja de 2025

El TER del 0,19 % (Vanguard lo rebajó desde el 0,22 % en 2025) es competitivo: más caro que el del CSPX (0,07 %, que solo cubre el S&P 500) pero ligeramente por debajo del IWDA (0,20 %). Frente al CSPX, esa diferencia de 0,12 % sobre una cartera de 100 000 € durante 30 años supone aproximadamente 12 000 € acumulados (asumiendo 7 % de retorno anual). Significativo pero no decisivo: a cambio, el VWCE incluye los mercados emergentes que el CSPX y el IWDA no cubren.

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

El 0,07 % del CSPX es el TER más bajo que encontrarás en un ETF de esta categoría. Comparado con el VWCE (0,19 %), en 30 años sobre 100 000 € esa diferencia de 0,12 % supone aproximadamente 12 000 € adicionales en cartera (con un retorno del 7 % anual).

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

Una estrategia popular entre inversores avanzados es [construir el equivalente al VWCE manualmente](/blog/solapamiento-etfs-error-silencioso): 88 % IWDA + 12 % EMIM (iShares Core MSCI Emerging Markets, ISIN IE00BKM4GZ66, TER 0,18 %). El resultado es exposición similar al FTSE All-World con TER ponderado de ~0,20 % (frente al 0,19 % del VWCE, prácticamente igual). La ventaja no es el coste sino el control preciso del peso a emergentes.

---

## Tabla comparativa completa

| Criterio | VWCE | CSPX | IWDA |
|----------|------|------|------|
| TER | 0,19 % | 0,07 % | 0,20 % |
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
| VWCE (0,19 %) | ~272 000 € | ~15 200 € |
| IWDA (0,20 %) | ~272 000 € | ~16 000 € |

La diferencia entre CSPX y VWCE es ~6 000 € a 25 años. Relevante, pero no dramática. Lo que más importa es **empezar**, **mantener el plan** y **no vender en los crashes**.

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
      'Guía completa de fiscalidad de ETFs en España: IRPF, modelo 720, acumulación vs distribución, domicilio fiscal y casos prácticos con Trade Republic y DEGIRO.',
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

**¿Y el modelo D6?** Mucha gente confunde el 720 con el modelo D6 (declaración de inversiones en el exterior). Son trámites distintos, y el D6 ya **no obliga al inversor particular con ETFs** tras la reforma de 2021-2024. Lo aclaramos en detalle en [Modelo D6 y ETFs: ¿tienes que presentarlo en 2026?](/blog/modelo-d6-etf-espana).

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
- [Cómo hacer un traspaso de fondos en España — BogleHub](/blog/como-hacer-traspaso-fondos-espana) — Guía paso a paso para ejecutar traspasos entre fondos sin tributar.
`,
  },
  {
    slug: 'fire-espana-cuanto-necesitas',
    title: 'FIRE en España: cuánto necesitas realmente y cómo llegar',
    excerpt:
      'Guía de FIRE en España: la regla del 4%, por qué usar el 3,5% aquí, coste de vida real en varias ciudades y planes a 15, 20 y 25 años con cifras concretas.',
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
      'La filosofía Boglehead adaptada a España: los principios de John Bogle, la cartera de tres fondos, ETFs compatibles y los primeros pasos para empezar ya.',
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
| VWCE | 0,19 % | FTSE All-World | Renta variable global total |
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
      'Tener cinco ETFs no es estar diversificado. Qué es el solapamiento, por qué juntar VWCE y CSPX concentra tu cartera y cómo corregirlo sin coste fiscal.',
    publishedAt: '2026-05-15',
    readingMinutes: 9,
    keywords: ['solapamiento ETFs', 'VWCE y CSPX juntos', 'diversificar cartera ETF'],
    updatedAt: '2026-05-30',
    faq: [
      {
        q: '¿Qué es el solapamiento entre ETFs?',
        a: 'El solapamiento entre ETFs ocurre cuando dos o más ETFs de tu cartera contienen las mismas empresas por debajo. Como el broker los muestra como líneas separadas, no ves que tu exposición real a esas empresas es la suma de ambos. El resultado es menos diversificación de la que crees: más concentración en unas pocas megaempresas, un sector y una divisa.',
      },
      {
        q: '¿Se solapan VWCE y CSPX?',
        a: 'Sí, mucho. CSPX (el S&P 500) está prácticamente contenido dentro de VWCE (FTSE All-World), porque las mayores posiciones estadounidenses de VWCE son las mismas que encabezan el S&P 500. Juntar 50 % VWCE + 50 % CSPX eleva tu exposición a EE. UU. de ~61 % a ~80 % y el peso de las 10 mayores tecnológicas de ~18 % a ~26 %. No diversificas: concentras en grandes tecnológicas estadounidenses.',
      },
      {
        q: '¿Por qué es un problema el solapamiento entre ETFs?',
        a: 'Porque crea una concentración que no has elegido: crees estar repartido y no lo estás. El día que corrijan las grandes tecnológicas, tu cartera "diversificada" se moverá como un solo valor. Además añade complejidad (más órdenes, más seguimiento, más líneas en la declaración) sin apenas beneficio de diversificación, y hace imposible rebalancear con criterio.',
      },
      {
        q: '¿Cómo corrijo el solapamiento sin pagar impuestos?',
        a: 'No vendas a lo loco: vender un ETF con plusvalías genera IRPF inmediato. El enfoque eficiente es (1) elegir tu ETF núcleo, (2) cortar las aportaciones al ETF redundante sin venderlo, (3) redirigir el dinero nuevo a los huecos reales de tu cartera (renta fija, emergentes, small caps) y (4) dejar que el tiempo diluya el peso del redundante. Así deshaces el solapamiento sin tributar.',
      },
    ],
    content: `# Solapamiento de ETFs: el error silencioso que infla tu cartera

**El solapamiento entre ETFs ocurre cuando dos o más ETFs de tu cartera contienen por debajo las mismas empresas, de modo que tu exposición real a ellas es mucho mayor de la que crees.** Importa porque crea una concentración que no has elegido —en unas pocas megaempresas, un sector y una divisa— y destruye la diversificación que dabas por hecha. El caso más común en España es juntar VWCE y CSPX, que eleva tu peso en EE. UU. de ~61 % a ~80 % sin que lo decidas.

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
    updatedAt: '2026-05-30',
    faq: [
      {
        q: '¿Qué es mejor en España, un fondo indexado o un ETF?',
        a: 'Ambos replican índices con costes bajos y dan resultados casi idénticos antes de fiscalidad. La diferencia decisiva en España es el traspaso: los fondos indexados permiten mover dinero de un fondo a otro sin tributar, los ETFs no. Para quien prevé rebalancear o cambiar de fondo, el fondo indexado suele ser el vehículo principal; el ETF encaja si tu broker o tu índice preferido solo está disponible como ETF.',
      },
      {
        q: '¿Se pueden traspasar fondos indexados sin pagar impuestos en España?',
        a: 'Sí. La legislación española permite traspasar tu dinero de un fondo de inversión a otro sin tributar: vendes el fondo A y compras el B, y la plusvalía acumulada no pasa por Hacienda en ese momento. El IRPF se difiere hasta que reembolsas definitivamente. Los ETFs no tienen este régimen: cada venta con ganancia tributa, aunque sea para comprar otro ETF acto seguido.',
      },
      {
        q: '¿Dónde puedo comprar fondos indexados en España?',
        a: 'Necesitas una plataforma que los comercialice. MyInvestor es la opción más conocida, con acceso a fondos indexados de Vanguard, Amundi y Fidelity desde 1 €. Brokers como DEGIRO o Trade Republic trabajan sobre todo con ETFs y no ofrecen fondos indexados. Los ETFs, en cambio, se compran en casi cualquier broker con acceso a bolsa europea.',
      },
      {
        q: '¿Cuál es más barato, el fondo indexado o el ETF?',
        a: 'Hoy la diferencia de coste es marginal. Durante años los fondos indexados eran algo más caros, pero los de Vanguard y Amundi tienen ahora TER muy competitivos, comparables a los de muchos ETFs. El coste ya no decanta la balanza: compara el TER del producto concreto, pero la decisión real se juega en el traspaso fiscal y en la comodidad de compra.',
      },
    ],
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

**Fondos indexados**: necesitas una plataforma que los comercialice. En España, MyInvestor es la opción más conocida, con acceso a fondos indexados de Vanguard, Amundi, Fidelity y otros. Brokers como DEGIRO no ofrecen fondos indexados. Si te decantas por fondos, mira la guía de los [mejores fondos indexados en España por categoría](/blog/mejores-fondos-indexados-espana-2026), con TER e ISIN de cada uno.

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

Si te decides por los fondos, la guía [Cómo hacer un traspaso de fondos en España](/blog/como-hacer-traspaso-fondos-espana) explica paso a paso cómo se ejecuta en cada plataforma, cuánto tarda y los errores más comunes.

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
    updatedAt: '2026-05-30',
    faq: [
      {
        q: '¿Qué es el interés compuesto?',
        a: 'El interés compuesto consiste en ganar rentabilidad sobre tu capital inicial y también sobre los intereses que ya has generado: tus ganancias generan ganancias, y esas a su vez generan más. Frente al interés simple (que siempre rinde sobre la misma base), el compuesto convierte una línea recta en una curva que se dispara con el tiempo. Un ETF de acumulación lo aprovecha al reinvertir automáticamente los dividendos.',
      },
      {
        q: '¿Qué es la regla del 72?',
        a: 'Es un truco para estimar el interés compuesto sin calculadora: divide 72 entre la rentabilidad anual y obtienes, aproximadamente, los años que tarda tu dinero en duplicarse. Al 7 % anual tarda ~10 años; al 6 %, 12 años; al 4 %, 18 años. A un 7 %, 10.000 € se convierten en 20.000 € en una década, 40.000 € en dos y 80.000 € en tres.',
      },
      {
        q: '¿Cuánto crecen 10.000 € al 7 % anual con interés compuesto?',
        a: 'Invirtiendo 10.000 € al 7 % anual sin aportar nada más: unos 19.672 € a 10 años, 38.697 € a 20 años, 76.123 € a 30 años y 149.745 € a 40 años. Con interés simple a 40 años solo tendrías ~38.000 €: la diferencia (más de 110.000 €) es lo que aporta reinvertir los intereses.',
      },
      {
        q: '¿Qué importa más para el interés compuesto, el tiempo o la cantidad?',
        a: 'El tiempo pesa más que la cantidad aportada. Cada duplicación es mayor que todas las anteriores juntas, así que las últimas décadas de tu vida inversora pesan mucho más que las primeras. Por eso empezar pronto, aunque sea con poco, suele superar a empezar tarde con mucho más.',
      },
    ],
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
    updatedAt: '2026-05-30',
    faq: [
      {
        q: '¿Es mejor invertir de golpe o poco a poco (DCA)?',
        a: 'Si ya tienes la suma disponible, invertir de golpe (lump sum) bate a promediar (DCA) aproximadamente dos de cada tres veces, porque los mercados suben más años de los que bajan (~70-75 % de los años en positivo). Promediar no es malo: cuesta algo de rentabilidad esperada a cambio de reducir el peor escenario y el arrepentimiento si el mercado cae justo después de entrar.',
      },
      {
        q: '¿Por qué gana invertir de golpe frente a promediar?',
        a: 'Porque el mercado sube más de lo que baja y el tiempo dentro del mercado construye el patrimonio. Cada mes que una parte de tu dinero está en efectivo esperando su turno tiene coste de oportunidad: no compone. Y esperar un "mejor momento" casi nunca funciona, porque solo se conoce a posteriori.',
      },
      {
        q: '¿Aportar mi ahorro mensual cada mes es hacer DCA?',
        a: 'No. DCA significa repartir en el tiempo una suma que ya tienes entera. Si inviertes tu ahorro de 300 €/mes según lo generas, no tienes dinero parado esperando: estás invirtiendo de golpe cada mes con lo que tienes, y eso es exactamente lo óptimo. La duda DCA vs lump sum solo aplica cuando te llega una cantidad grande de una vez.',
      },
      {
        q: '¿Cuándo conviene promediar (DCA) una suma grande?',
        a: 'Cuando el riesgo emocional es alto. Promediar es un seguro emocional: pagas una pequeña prima (algo de rentabilidad esperada) a cambio de reducir el golpe si el mercado cae justo después de invertir y de evitar vender en pánico. Si meterías 60.000 € de golpe y una caída del 25 % te haría abandonar el plan, promediar en unos meses es razonable.',
      },
    ],
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

**¿Dónde aparcar el dinero que aún no has invertido?** Mientras promedias, el efectivo que espera su turno no tiene por qué estar a 0% en la cuenta corriente. Un [fondo monetario](/glosario/fondo-monetario) o las [Letras del Tesoro](/glosario/letras-del-tesoro) rinden el tipo de interés a corto plazo del BCE con riesgo muy bajo. El fondo monetario tiene además la ventaja del traspaso fiscal libre: cuando toque invertir, lo mueves a tu fondo indexado sin tributar.

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
      'Roboadvisors en España como Indexa o Finizens: qué hacen bien, cuánto cuestan de verdad a 30 años y cómo saber si te compensan frente a hacerlo tú mismo.',
    publishedAt: '2026-05-17',
    readingMinutes: 10,
    keywords: ['roboadvisor España', 'Indexa Capital opiniones', 'roboadvisor o hacerlo tú mismo'],
    updatedAt: '2026-05-30',
    faq: [
      {
        q: '¿Merece la pena un roboadvisor en España?',
        a: 'Depende de quién seas. Para quien nunca habría empezado a invertir por su cuenta, un roboadvisor es la diferencia entre invertir y no invertir, y eso vale su precio: automatiza aportaciones, rebalanceos y papeleo, y elimina las decisiones emocionales. Para quien está dispuesto a gestionar una cartera indexada sencilla, hacerlo uno mismo es más barato. No es caro frente a un fondo de banco al 1,5-2 %, pero sí más caro que el hazlo-tú-mismo.',
      },
      {
        q: '¿Cuánto cobra un roboadvisor?',
        a: 'El coste total tiene varias capas: la comisión de gestión del roboadvisor, la de custodia del depositario y el TER de los fondos indexados subyacentes. Sumando todo, suele moverse aproximadamente entre el 0,40 % y el 0,70 % anual según el roboadvisor y el tamaño de la cartera (confírmalo siempre en su web). Frente al ~0,15 % de una cartera DIY con un ETF global, la diferencia la marca la comodidad.',
      },
      {
        q: '¿Cuánto cuesta la comodidad del roboadvisor a 30 años?',
        a: 'Los costes se componen igual que la rentabilidad. Sobre 100.000 € a 30 años con un 7 % bruto anual: hacerlo tú mismo con un ETF global (~0,15 %) deja en torno a 730.000 €, mientras que un roboadvisor (~0,60 %) deja unos 645.000 €. La comodidad cuesta aproximadamente 85.000 € en ese escenario: relevante, pero puede valer la pena si la alternativa era no invertir o vender en pánico.',
      },
      {
        q: '¿Qué hacen bien los roboadvisors?',
        a: 'Bajan la barrera de entrada, eliminan las decisiones emocionales (no hay botón fácil para vender en pánico), rebalancean por ti manteniendo los pesos objetivo, suelen usar fondos indexados con traspaso fiscal (eficiencia en rebalanceos internos) y automatizan el papeleo fiscal. En España los más conocidos son Indexa Capital, MyInvestor, Finizens e inbestMe.',
      },
    ],
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
    updatedAt: '2026-05-30',
    faq: [
      {
        q: '¿Qué debo hacer si el mercado cae un 30 %?',
        a: 'Nada: cierra la aplicación y no mires la cartera cada día. Mantén tus aportaciones automáticas (estás comprando las mismas empresas más baratas) y no vendas. La caída en sí no es el verdadero riesgo; el riesgo es lo que hagas durante ella. La inacción es una decisión activa y casi siempre la correcta.',
      },
      {
        q: '¿Son normales las caídas fuertes de la bolsa?',
        a: 'Sí, son parte de cómo funciona el mercado. De media, una corrección del 10 % ocurre casi cada año, un mercado bajista (-20 % o más) aparece cada pocos años, y una caída severa (-30 % o más) la vivirás varias veces a lo largo de tu vida inversora (puntocom 2000, 2008, COVID 2020, 2022). De todas ellas el mercado global terminó recuperándose y marcando nuevos máximos.',
      },
      {
        q: '¿Por qué es un error vender durante una caída?',
        a: 'Mientras no vendes, la pérdida es solo sobre el papel: sigues teniendo las mismas participaciones. Si vendes, la conviertes en definitiva y te quedas fuera. Y quedarse fuera es carísimo porque las recuperaciones son rápidas y concentradas: los mejores días de bolsa suelen estar agrupados junto a los peores, en plena crisis. Perderte solo un puñado por haber salido "hasta que se calme" hunde tu rentabilidad final.',
      },
      {
        q: '¿Cómo me preparo para la próxima caída del mercado?',
        a: 'Decide qué harás antes de que llegue, porque decidirlo en mitad del pánico es decidirlo mal. Ten el asset allocation correcto para tu tolerancia (si un -30 % te haría vender, llevas demasiada renta variable), un colchón de liquidez y la costumbre de no mirar la cartera a diario. Saber que es tu cerebro —y no la realidad— quien grita "vende" ya te da ventaja.',
      },
    ],
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
    updatedAt: '2026-05-30',
    faq: [
      {
        q: '¿Qué es rebalancear una cartera indexada?',
        a: 'Rebalancear es devolver tu cartera a sus pesos objetivo. Si decidiste 80 % renta variable / 20 % renta fija y un año alcista te ha llevado a 87/13, rebalancear significa volver al 80/20 reduciendo lo que pesa de más y reforzando lo que pesa de menos. Corrige la deriva que el mercado provoca solo, sin que toques nada.',
      },
      {
        q: '¿Cada cuánto hay que rebalancear la cartera?',
        a: 'Para la mayoría, una vez al año por calendario es más que suficiente. La alternativa es rebalancear por bandas (solo cuando un activo se desvía más de un umbral, p. ej. 5 puntos porcentuales), algo más eficiente pero exige vigilar la cartera. El error grave no es elegir mal el método, sino no rebalancear nunca.',
      },
      {
        q: '¿Cómo rebalancear sin pagar IRPF de más en España?',
        a: 'Dos formas: (1) si sigues aportando, dirige tus nuevas aportaciones al activo que pesa de menos en lugar de vender el que pesa de más —rebalanceas sin vender, sin coste fiscal ni comisiones—; es la opción por defecto en fase de acumulación. (2) Si inviertes mediante fondos indexados, el traspaso entre fondos no tributa. Rebalancear vendiendo un ETF con plusvalía sí tributa ese año, aunque el dinero se quede en la cartera.',
      },
      {
        q: '¿Por qué es importante rebalancear?',
        a: 'Por dos razones. Control del riesgo (la principal): si dejas correr la deriva, tras unos años alcistas tendrás mucho más riesgo del que decidiste, justo antes de la siguiente caída. Y disciplina de comprar barato: rebalancear te obliga de forma mecánica a recortar lo que ha subido y reforzar lo que ha bajado, lo contrario de lo que pide el instinto.',
      },
    ],
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
    updatedAt: '2026-05-30',
    faq: [
      {
        q: '¿Qué conviene más en España, un plan de pensiones o un fondo indexado?',
        a: 'Depende de tu situación. El plan de pensiones desgrava a la entrada (reduces tu base general por lo aportado) pero tributa al rescate como rendimiento del trabajo y es ilíquido hasta la jubilación. El fondo indexado no desgrava, pero es líquido, sin límite de aportación y sus plusvalías tributan en la base del ahorro (19-28 %). Para la mayoría, el fondo indexado es el vehículo principal y el plan de pensiones —si acaso— un complemento, siempre que sea indexado y de bajo coste.',
      },
      {
        q: '¿Cómo tributa el rescate de un plan de pensiones?',
        a: 'Todo lo que rescatas (lo aportado y lo ganado) tributa como rendimiento del trabajo en la base general del IRPF, junto a tu sueldo o pensión, a tu tipo marginal de ese momento. No tributa en la base del ahorro como los fondos y ETFs. Si rescatas mucho de golpe, te empujas a tramos altos: mal planificado, el rescate puede comerse buena parte de la desgravación inicial.',
      },
      {
        q: '¿Cuánto se puede aportar a un plan de pensiones individual en España?',
        a: 'El límite es 1.500 € al año en planes individuales (los planes de empleo de la empresa permiten sumar más). Es un límite pequeño para construir la independencia financiera: da para un complemento, no para el plato principal.',
      },
      {
        q: '¿Merece la pena un plan de pensiones?',
        a: 'Solo si es indexado y de bajo coste. Un plan de banco con comisión del 1,5 % anual o más rara vez compensa: compuesto durante décadas, destruye buena parte del beneficio fiscal, por mucho que desgrave. La ventaja real del plan es el diferimiento fiscal (inviertes antes de impuestos), pero es un impuesto aplazado, no perdonado: lo pagas al rescatar.',
      },
    ],
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
    updatedAt: '2026-05-30',
    faq: [
      {
        q: '¿Qué es el MSCI World?',
        a: 'El MSCI World es un índice elaborado por MSCI que reúne las empresas grandes y medianas de los países desarrollados: alrededor de 1.400 empresas de 23 países, cubriendo en torno al 85 % de la capitalización bursátil de cada uno de esos mercados. Comprando un ETF que lo replica posees en una sola operación un trocito de unas 1.400 de las mayores empresas del mundo desarrollado.',
      },
      {
        q: '¿Qué países incluye el MSCI World y cuáles no?',
        a: 'Incluye 23 mercados desarrollados (Estados Unidos, Japón, Reino Unido, Canadá, Francia, Alemania, Suiza, Australia, Países Bajos, España, Italia y otros). No incluye mercados emergentes: nada de China, India, Brasil, Taiwán o Corea del Sur (para eso está el índice MSCI Emerging Markets). Pese a llamarse "World", es el mundo desarrollado, no el mundo entero.',
      },
      {
        q: '¿En qué se diferencia el MSCI World del FTSE All-World y del S&P 500?',
        a: 'El MSCI World cubre solo países desarrollados (~1.400 empresas, sin emergentes). El FTSE All-World (el de VWCE) añade los mercados emergentes, así que es más global. El S&P 500 es solo Estados Unidos (las 500 mayores empresas americanas). De más a menos diversificación geográfica: All-World > MSCI World > S&P 500.',
      },
      {
        q: '¿Qué ETFs replican el MSCI World para un inversor español?',
        a: 'Los más usados en España son IWDA (iShares Core MSCI World) y SWRD (SPDR MSCI World), ambos de acumulación y domiciliados en Irlanda. SWRD es el más barato (TER 0,12 %); IWDA es más caro (0,20 %) pero el más líquido. Para exposición global con emergentes incluidos en un solo ETF, muchos inversores eligen en cambio VWCE (FTSE All-World).',
      },
    ],
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
      'No necesitas mucho capital para empezar a invertir. Cómo hacerlo con 50 € al mes, por qué la constancia gana a la cantidad y los pasos para tu primera aportación.',
    publishedAt: '2026-05-18',
    readingMinutes: 8,
    keywords: ['empezar a invertir poco dinero', 'invertir 50 euros al mes', 'cómo empezar a invertir'],
    updatedAt: '2026-05-30',
    faq: [
      {
        q: '¿Cuánto dinero necesito para empezar a invertir?',
        a: 'No necesitas un capital grande: puedes empezar con 50 € o 100 € al mes. De hecho, en MyInvestor (fondos indexados) o en planes de ahorro de Trade Republic se puede aportar desde 1 €. Lo que importa no es la cantidad inicial, sino empezar y ser constante. "Empezaré cuando tenga más dinero" suele ser la excusa más cara.',
      },
      {
        q: '¿Merece la pena invertir solo 50 € al mes?',
        a: 'Sí. Aportar 50 €/mes a un 7 % anual de media se convierte, aproximadamente, en ~8.700 € a 10 años, ~26.000 € a 20, ~61.000 € a 30 y más de 131.000 € a 40 años. De esos 131.000 €, solo 24.000 € salen de tu bolsillo; el resto (más de 100.000 €) lo pone el interés compuesto.',
      },
      {
        q: '¿Qué importa más al empezar a invertir, la cantidad o el hábito?',
        a: 'El hábito. Al principio el rendimiento en términos absolutos es casi irrelevante (un 10 % sobre 600 € son 60 €). Lo que de verdad construyes los primeros meses es la rutina de apartar una cantidad cada mes, automatizarla y no tocarla. Esa disciplina es el activo más valioso al principio, más que el dinero en sí.',
      },
      {
        q: '¿Cuánto cuesta esperar para empezar a invertir?',
        a: 'Mucho, porque cada año que retrasas el comienzo pierdes una de las duplicaciones finales, que es la más grande. Quien invierte 50 €/mes desde los 20 años llega a los 60 con bastante más del doble que quien invierte lo mismo desde los 30: misma aportación y rentabilidad, solo diez años de diferencia. Empezar tarde con más casi nunca alcanza a empezar pronto con poco.',
      },
    ],
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
        a: 'No existe un único "mejor" ETF universal, pero para simplificar: VWCE (Vanguard FTSE All-World, acumulación, IE, TER 0,19%) es la opción todo-en-uno más recomendada por su diversificación global, domicilio irlandés y acumulación. Para quienes prefieren solo EE.UU., CSPX o SPXS son las opciones más eficientes en TER.',
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

### 1. VWCE — Vanguard FTSE All-World Acc (IE00BK5BQT80)

| Dato | Valor |
|------|-------|
| TER | 0,19 % |
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

**Para quién**: quien prefiere limitarse a mercados desarrollados (23 países) sin la volatilidad adicional de emergentes. Es el ETF de mayor AUM de Europa, con un TER (0,20%) muy similar al del VWCE (0,19% tras la rebaja de 2025). Si quieres añadir emergentes manualmente, combínalo con [EMIM](/etf/emim).

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

**Para quién**: el complemento de IWDA o SWRD para quien quiere replicar el FTSE All-World manualmente. La combinación 88 % IWDA + 12 % EMIM replica el universo del VWCE con un TER ponderado de ~0,20 % (frente al 0,19 % del VWCE). Más complejo y sin ahorro de coste relevante; su ventaja es el control del peso a emergentes, no el precio.

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

**Para quién**: inversor con convicción en tecnología y tolerancia alta a la volatilidad. No es una alternativa al MSCI World — es una posición de alta concentración. Si no entiendes por qué quieres el NASDAQ-100 en lugar de un índice global, no lo compres. TER más alto y concentración sectorial en tecnología (~50 %). Comparamos EQQQ con sus alternativas (SXRV, CNDX) en la guía de [mejores ETFs Nasdaq 100 para España](/blog/mejores-etfs-nasdaq-100-espana).

---

### 10. SGLN — iShares Physical Gold ETC (IE00B4ND3602)

| Dato | Valor |
|------|-------|
| TER | 0,12 % |
| AUM | >15.000 M€ |
| Activo subyacente | Oro físico |
| Grado fiscal (España) | A |

**Para quién**: cobertura frente a escenarios de alta inflación o crisis del sistema financiero. No es un ETF en sentido estricto (es un ETC respaldado por oro físico), pero funciona de forma similar. Una asignación del 5-10 % en carteras de inversores conservadores con horizonte largo. La filosofía Boglehead clásica no lo incluye, pero hay inversores que lo usan como cobertura. Si te planteas el oro, compara las opciones (ETC físico vs mineras) en [oro físico vs ETC vs ETF de mineras](/blog/oro-etf-fisico-vs-mineria-espana).

---

## Tabla resumen

| Ticker | Índice | TER | Perfil |
|--------|--------|-----|--------|
| VWCE | FTSE All-World | 0,19 % | Todo-en-uno global |
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
| [VWCE](/etf/vwce) | 0,19 % | FTSE All-World (incluye emergentes) |

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
- Lee el [análisis completo de DEGIRO 2026](/blog/degiro-opinion-2026) para ver la diferencia entre cuenta básica y Custody.

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
    updatedAt: '2026-05-30',
    readingMinutes: 12,
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

Esta tabla compara funciones, pero el coste real depende de cuánto y con qué frecuencia inviertes. El [comparador de brókers de BogleHub](/calculadora/comparar-brokers) calcula en euros lo que pagarías al año en cada uno según tu patrón de inversión.

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

## El coste real: más allá de la comisión de compra

La comisión por operación es lo más visible, pero el coste total de usar un broker para ETFs tiene cuatro componentes, y solo uno aparece en la portada del anuncio:

**1. Comisión de compraventa.** Trade Republic cobra 0 €; MyInvestor 0,20 € + 0,03 %; DEGIRO 0,50 € + 0,004 % (mínimo 0,90 €). Para una aportación mensual de 200 €, eso es 0 €, unos 0,26 € y 0,90 € respectivamente.

**2. El TER del ETF — y aquí está la clave: no depende del broker.** El TER (coste anual del fondo) lo cobra la gestora del ETF, no el broker. Un VWCE tiene un TER del 0,22 % lo compres donde lo compres. Por tanto, el TER no debe influir en qué broker eliges: es idéntico en los tres. Lo que cambia de un broker a otro es todo lo demás.

**3. Conversión de divisa.** Si compras un ETF que cotiza en dólares o libras (por ejemplo, en la Bolsa de Londres), el broker convierte tus euros aplicando un margen que muchas veces no se ve. Se evita comprando la línea de cotización en euros del mismo ETF en Xetra (Frankfurt) o BME. MyInvestor opera en euros; en Trade Republic y DEGIRO conviene elegir la cotización en euros para no pagar conversión.

**4. Custodia y conectividad.** Ninguno de los tres cobra comisión de custodia sobre ETFs. DEGIRO aplica una pequeña comisión de conectividad anual por cada bolsa extranjera en la que operas, que se evita concentrando las compras en una sola bolsa. Verifica las tarifas vigentes antes de operar.

**El resumen del coste real**: para un inversor que compra ETFs en euros (Xetra) con aportaciones mensuales, Trade Republic sale gratis de principio a fin; MyInvestor cuesta unos céntimos por orden pero añade el traspaso fiscal de sus fondos; DEGIRO es muy barato pero exige cuidar la bolsa de cotización para no pagar ni conexión ni divisa. La diferencia entre ellos en comisiones puras es pequeña; la diferencia que de verdad importa a largo plazo es si quieres fondos indexados con traspaso fiscal (solo MyInvestor) o solo ETFs.

---

## El ganador por perfil

**Principiante** — empiezas, aportas poco y a menudo, quieres simplicidad: **Trade Republic**. 0 €, planes de ahorro automáticos desde 1 € y una app a prueba de errores. Si prefieres arrancar con fondos indexados en vez de ETFs, MyInvestor desde 1 €.

**Avanzado** — cartera consolidada, quieres control, varios mercados o tipos de órdenes: **DEGIRO**, o diversifica entre Trade Republic (ETFs core) y DEGIRO (acceso y control). El coste por orden es irrelevante en importes grandes; lo que pesa es el acceso y la flexibilidad.

**FIRE / largo plazo con optimización fiscal** — rebalanceas, cambias de estrategia y piensas en décadas: **MyInvestor**. El traspaso fiscal libre entre fondos indexados te permite rebalancear y cambiar de fondo sin tributar, algo imposible con ETFs. En la fase de retirada, combinar fondos (con traspaso) y algún ETF de distribución es una estrategia habitual. Lee cómo funciona en la [guía de traspaso de fondos](/blog/como-hacer-traspaso-fondos-espana).

**Si ya tienes cartera de ETFs en Trade Republic y funciona**: no cambies de broker por cambiar. Los costes de fricción de mover una cartera rara vez compensan las diferencias en comisiones.

Para ver el coste anual exacto de cada broker según tu patrón real de inversión, usa el [comparador de brókers de BogleHub](/calculadora/comparar-brokers). Y si quieres una comparativa más amplia que incluya ING e Interactive Brokers, lee [mejor broker para ETFs en España 2026](/blog/mejor-broker-etfs-espana-2026).

---

*Información educativa, no asesoramiento financiero. Las comisiones y condiciones pueden cambiar. Verifica siempre con el broker antes de operar.*

**¿Ya tienes cuenta en alguno de estos brokers?** [Analiza tu cartera gratis](/analyzer) e identifica si tu TER y diversificación están optimizados.

---

## Fuentes y lecturas complementarias

- [DEGIRO — Tarifas oficiales 2026](https://www.degiro.es/tarifas) — Verifica las comisiones actuales antes de abrir cuenta.
- [Trade Republic — Información sobre la cuenta de inversión](https://traderepublic.com/es-es) — Condiciones actualizadas y ETFs disponibles en la plataforma.
- [Banco de España — Registro de Entidades](https://www.bde.es/bde/es/secciones/servicios/Particulares_y_e/Registros_de_En/) — Comprueba que el broker está registrado y supervisado en España.
- [Cómo invertir en el MSCI World desde España — BogleHub](/blog/como-invertir-msci-world-espana) — Guía práctica: los mejores ETFs y fondos para replicar este índice y dónde comprarlos.
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
        a: 'VWCE es el ticker del Vanguard FTSE All-World UCITS ETF (Accumulating), un ETF domiciliado en Irlanda (ISIN IE00BK5BQT80) que replica el índice FTSE All-World. Este índice incluye más de 3.700 empresas de mercados desarrollados y emergentes de todo el mundo, cubriendo aproximadamente el 90-95% de la capitalización bursátil global. Es el ETF de referencia para inversores españoles que buscan máxima diversificación en un solo producto.',
      },
      {
        q: '¿Cuál es el TER del VWCE?',
        a: 'El TER del VWCE es del 0,19% anual (Vanguard lo rebajó desde el 0,22% en 2025). Es muy competitivo: queda por debajo del IWDA (0,20%) aunque por encima del SWRD (0,12%, que solo cubre MSCI World), e incluye emergentes dentro del mismo fondo, lo que elimina la necesidad de un segundo ETF. Si consideramos una cartera MSCI World + Emergentes por separado con pesos equivalentes, el TER combinado suele ser similar al del VWCE.',
      },
      {
        q: '¿VWCE o IWDA? ¿Cuál es mejor para un inversor en España?',
        a: 'VWCE incluye emergentes (~12%) y IWDA solo tiene mercados desarrollados. Si quieres exposición global sin gestionar dos ETFs, VWCE es más sencillo. Si quieres control sobre la proporción de emergentes, la combinación IWDA + EIMI (emergentes por separado) tiene más flexibilidad. Para la mayoría de inversores que empiezan, VWCE es la opción más simple y suficiente.',
      },
      {
        q: '¿Es VWCE fiscalmente eficiente para inversores en España?',
        a: 'Sí. VWCE está domiciliado en Irlanda (ISIN empieza por IE), lo que le da acceso al convenio fiscal Irlanda-EE.UU. que reduce la retención en origen sobre dividendos de empresas americanas del 30% al 15%. Al ser de acumulación, los dividendos se reinvierten sin generar evento fiscal inmediato. Esta combinación lo convierte en uno de los ETFs fiscalmente más eficientes para un inversor residente en España.',
      },
      {
        q: '¿Cuál es la diferencia entre VWCE y VWRA?',
        a: 'VWCE y VWRA replican exactamente el mismo índice (FTSE All-World) con la misma política de acumulación. La diferencia es la bolsa donde cotizan y la divisa de cotización: VWCE cotiza en Xetra (EUR), Euronext Ámsterdam (EUR) y otras bolsas europeas; VWRA cotiza principalmente en la Bolsa de Londres (USD). Para un inversor español que usa un broker europeo como Trade Republic o DEGIRO, VWCE es el ticker correcto. El ISIN es el mismo: IE00BK5BQT80.',
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
| ISIN | IE00BK5BQT80 |
| Domicilio | Irlanda |
| Gestora | Vanguard |
| Índice replicado | FTSE All-World |
| TER | 0,19% anual |
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

El ISIN IE00BK5BQT80 confirma que el fondo está domiciliado en Irlanda. Esto tiene consecuencias fiscales concretas para inversores españoles:

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
| TER | 0,19% | 0,20% |
| Domicilio | Irlanda | Irlanda |
| Acumulación | ✓ | ✓ |
| Patrimonio gestionado | >15.000 M USD | >75.000 M USD |

La diferencia clave: IWDA solo incluye países desarrollados (no emergentes). Para tener exposición global completa con IWDA necesitas añadir un segundo ETF de emergentes (como EIMI) en proporción ~88/12. VWCE ya lo hace internamente.

**Cuándo elegir VWCE**: quieres simplicidad máxima, un solo ETF que lo cubra todo, y no quieres decidir cuánto poner en emergentes.

**Cuándo elegir IWDA**: quieres más control sobre el peso de emergentes (añadiéndolos por separado), o ya tienes exposición a emergentes por otro lado.

Para la mayoría de inversores que empiezan: **VWCE es la respuesta más sencilla y correcta**.

---

## VWCE vs SWRD: la comparativa de MSCI World barato

SWRD (SPDR MSCI World UCITS ETF) tiene un TER de 0,12%, el más barato entre los ETFs de MSCI World disponibles en España. Pero SWRD no incluye emergentes. Si añades EIMI (emergentes, TER 0,18%) en un 12%, el TER ponderado de la combinación es aproximadamente:

0,88 × 0,12% + 0,12 × 0,18% ≈ 0,128%

Frente al 0,19% del VWCE. El ahorro es de ~0,06% anual: sobre 100.000€, son ~60€ al año.

A largo plazo eso importa, pero la complejidad añadida (dos ETFs, dos órdenes, rebalanceo manual de la proporción) puede no merecer la pena para carteras pequeñas o inversores que empiezan. Con carteras grandes (>100.000–200.000€), la combinación SWRD+EIMI es más eficiente en costes.

---

## Dónde comprar VWCE en España

| Broker | Comisión por orden |
|---|---|
| Trade Republic | 0 € (planes de ahorro automáticos desde 1 €/mes) |
| [DEGIRO](/blog/degiro-opinion-2026) | 0,50 € + 0,004% (mín. 0,90 €) |
| MyInvestor | 0,20 € + 0,03% |
| [XTB](/blog/xtb-opinion-2026) | 0 € hasta 100.000 €/mes en ETFs |

Para aportaciones mensuales pequeñas, Trade Republic es la opción más eficiente. Para órdenes más grandes y control técnico, DEGIRO. El VWCE no está disponible en MyInvestor como ETF, pero sí su equivalente en fondo indexado (Vanguard Global Stock Index, que replica MSCI World, no FTSE All-World — índice diferente).

---

## ¿Es VWCE la opción definitiva para un inversor indexado en España?

Para muchos sí. Es diversificado globalmente, domiciliado en Irlanda, de acumulación, con un TER aceptable y gestionado por Vanguard, una gestora fundada por John Bogle —el padre de la inversión indexada.

Sus únicas limitaciones son el TER algo superior a las alternativas más baratas, y que no está disponible como fondo de inversión (lo que significaría traspaso fiscal libre en España).

Si usas Trade Republic o DEGIRO y buscas la solución más simple para largo plazo: **VWCE es probablemente la mejor opción disponible en España para un ETF todo-en-uno**.

---

## Fuentes y lecturas complementarias

- [Vanguard — Ficha técnica VWCE](https://www.vanguard.co.uk/professional/en/etf/equity/9505/ftse-all-world-ucits-etf-usd-accumulating) — Datos oficiales, composición y metodología del fondo.
- [JustETF — VWCE](https://www.justetf.com/es/etf-profile.html?isin=IE00BK5BQT80) — Histórico de precios, patrimonio gestionado y datos de distribución.
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

Si quieres comparar el Amundi Prime Global con el resto de opciones, mira la guía de los [mejores fondos indexados en España por categoría](/blog/mejores-fondos-indexados-espana-2026).

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

Y un mito que conviene despejar: el **modelo D6** (declaración de inversiones en el exterior) ya **no obliga al inversor particular con ETFs** tras la reforma de 2021-2024. Lo explicamos en [Modelo D6 y ETFs: ¿tienes que presentarlo en 2026?](/blog/modelo-d6-etf-espana).

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
  {
    slug: 'plan-pensiones-indexado-espana-2026',
    title: 'Plan de pensiones indexado en España: guía completa 2026',
    excerpt:
      'Todo sobre los planes de pensiones indexados en España en 2026: ventajas fiscales, comisiones, mejores opciones (Indexa, Finizens, MyInvestor) y comparativa con fondos indexados.',
    publishedAt: '2026-05-24',
    readingMinutes: 11,
    keywords: ['plan de pensiones indexado España', 'mejor plan de pensiones 2026', 'Indexa Pensiones opinión', 'MyInvestor plan de pensiones', 'plan pensiones vs fondo indexado'],
    faq: [
      {
        q: '¿Cuál es la principal ventaja fiscal de un plan de pensiones en España?',
        a: 'Las aportaciones a un plan de pensiones reducen tu base imponible general del IRPF en el año en que se realizan. El límite máximo es 1.500€ anuales en planes individuales (la cifra ha bajado desde los 8.000€ que se permitían antes de 2021). Esta deducción supone un ahorro inmediato del 19-47% según tu marginal del IRPF: para un contribuyente al 37%, aportar 1.500€ supone pagar 555€ menos de impuestos ese año. Sin embargo, al rescatar el plan, todo el dinero (aportaciones + ganancias) tributa como rendimientos del trabajo, no como rentas del ahorro.',
      },
      {
        q: '¿Qué plan de pensiones indexado tiene la comisión más baja en España?',
        a: 'En 2026, los planes de pensiones indexados más competitivos son los de MyInvestor (gestionados por Indexa o por el propio MyInvestor desde 0,30% de comisión total), Indexa Pensiones (~0,40-0,50% total) y Finizens Pensiones (~0,40% total). Todos ellos están por debajo del 1% que cobran los planes de pensiones tradicionales de la banca, lo que se traduce en decenas de miles de euros más en la jubilación.',
      },
      {
        q: '¿Es mejor un plan de pensiones o un fondo indexado para la jubilación?',
        a: 'Depende de tu situación fiscal actual y futura. Si pagas IRPF al 37% o más actualmente y esperas tributar al 19-24% en la jubilación, el plan de pensiones es muy ventajoso por la deducción inmediata. Si pagas al 19-24% actualmente y esperas tributar igual o más en la jubilación, el fondo indexado es generalmente mejor: tributa al tipo del ahorro (19-28%) y no como rendimiento del trabajo. La combinación inteligente es usar el plan hasta el límite de 1.500€/año y el resto en fondos indexados.',
      },
      {
        q: '¿Cuándo puedo rescatar un plan de pensiones?',
        a: 'Las contingencias clásicas son: jubilación, incapacidad permanente, dependencia severa, fallecimiento (los beneficiarios) y enfermedad grave. Además, desde 2025 puedes rescatar libremente las aportaciones con más de 10 años de antigüedad (la primera ventana se abrió en 2025). También se permite el rescate por desempleo de larga duración o por emergencia financiera con limitaciones. Verifica las condiciones específicas con tu gestora antes de hacer cuentas con ese dinero.',
      },
      {
        q: '¿Puedo traspasar mi plan de pensiones de banco a un plan indexado sin coste?',
        a: 'Sí. El traspaso entre planes de pensiones está exento de tributación y de comisiones de salida en España (la mayoría de gestoras no las aplican). Es uno de los movimientos más rentables que puedes hacer si tienes un plan de pensiones en un banco con comisión del 1,5% y lo traspasas a un plan indexado con comisión del 0,40%. El traspaso tarda 5-15 días hábiles y no requiere vender ni rescatar nada.',
      },
    ],
    content: `# Plan de pensiones indexado en España: guía completa 2026

Los planes de pensiones indexados son la versión moderna y barata del producto que durante décadas ha sido el rey del ahorro para la jubilación en España. La diferencia con los planes tradicionales de banco no es estética: es estructural. Comisiones cinco veces más bajas, gestión pasiva en lugar de activa, y transparencia total en lo que compras.

Esta guía cubre cómo funcionan, las ventajas fiscales reales, las mejores opciones disponibles en 2026 y cuándo tienen sentido frente a fondos indexados normales.

---

## La ventaja fiscal del plan de pensiones

Las aportaciones a un plan de pensiones individual reducen la base imponible general del IRPF en el año de la aportación. El límite máximo es 1.500€ anuales (planes individuales) o hasta 8.500€ adicionales si tu empresa tiene plan de pensiones de empleo y tú aportas.

**Ejemplo numérico**: si tu marginal del IRPF es del 37% y aportas 1.500€ al plan de pensiones, tu factura fiscal baja en 555€ ese año. El coste real de tu aportación es 945€, no 1.500€.

Esta ventaja se conoce como **deducción a la aportación**. Es lo que hace que los planes de pensiones tengan sentido para contribuyentes con marginales altos del IRPF.

**El trade-off**: al rescatar el plan, todo el dinero (aportaciones más rendimientos acumulados) tributa como **rendimientos del trabajo**, no como rentas del ahorro. Esto puede penalizar si el rescate se hace en un único año, ya que llevarás tu tipo marginal al máximo.

---

## La estrategia óptima de rescate

Para minimizar el impacto fiscal al rescatar:

**1. Rescate en forma de renta periódica**: cobrar el plan como una pensión mensual durante varios años distribuye el impacto fiscal en lugar de concentrarlo. Cada año tributas como un trabajador con un salario adicional reducido.

**2. Coordinación con la pensión pública**: si vas a cobrar pensión pública de 1.500€/mes, no rescates el plan en el mismo año en grandes cantidades — saturarías tu tipo marginal.

**3. Aprovechar la reducción del 40%**: si tu plan tiene aportaciones anteriores a 2007, esas aportaciones específicas se benefician de una reducción del 40% si las rescatas en forma de capital en el año de la jubilación o en los dos siguientes.

---

## Mejores planes de pensiones indexados en 2026

### 1. Plan de pensiones de Indexa Capital

Indexa Pensiones aplica la misma filosofía que su roboadvisor de fondos: carteras indexadas de bajo coste con rebalanceo automático. Comisión total estimada: 0,40-0,50% anual.

**Ventajas**:
- Sin mínimo de aportación
- Bonificación del 0,10% sobre las aportaciones nuevas en el primer año (suele renovarse)
- Carteras según perfil de riesgo (1/10 al 10/10)
- Misma metodología que su fondo, fácil de combinar

**Limitaciones**: comisión total ligeramente superior a las opciones más baratas (~0,10% más que MyInvestor).

### 2. Plan de pensiones de MyInvestor

MyInvestor tiene varios planes de pensiones indexados, algunos gestionados por su equipo y otros como white-label de Indexa. El más barato actualmente: el **MyInvestor Indexado Global** con comisión total ~0,30%.

**Ventajas**:
- La comisión total más baja del mercado español
- Aportación mínima 1€
- Integración con el resto de productos de MyInvestor

**Limitaciones**: cartera menos personalizada que Indexa (suele ser un único producto global, no una cartera ajustada a tu perfil).

### 3. Finizens Pensiones

Mismo enfoque que el roboadvisor de Finizens: carteras de 1/5 a 5/5 con rebalanceo automático. Comisión total ~0,40%.

**Ventajas**:
- Carteras incluyen oro (a través de ETC)
- App muy intuitiva
- Mínimo bajo

**Limitaciones**: solo 5 perfiles de riesgo (menos granularidad que Indexa).

---

## El traspaso de plan de pensiones: el movimiento más rentable

Si tienes un plan de pensiones en un banco con comisión del 1,5-1,75%, el traspaso a uno indexado al 0,40% es probablemente el movimiento financiero más rentable que puedes hacer este año. La diferencia anual del 1% sobre el saldo se acumula durante décadas hasta convertirse en una proporción significativa del plan al rescatar.

**El proceso**:
1. Solicita el traspaso desde la web del nuevo gestor (Indexa, MyInvestor, Finizens)
2. Aportas los datos del plan actual (entidad, número de cuenta del plan)
3. El nuevo gestor inicia el traspaso, sin coste para ti
4. En 5-15 días hábiles el dinero aparece en el nuevo plan
5. **No hay evento fiscal**: el traspaso entre planes de pensiones no tributa

Para calcular el impacto exacto del cambio, usa la [calculadora de interés compuesto](/calculadora/interes-compuesto) introduciendo tu saldo actual, los años hasta la jubilación y la diferencia de comisiones (~1%).

---

## Plan de pensiones vs fondo indexado: cuál elegir

| | Plan de pensiones indexado | Fondo indexado |
|---|---|---|
| Deducción IRPF aportación | ✓ (hasta 1.500€/año) | ✗ |
| Comisiones | 0,30-0,50% | 0,05-0,20% |
| Liquidez | Limitada (jubilación, 10 años...) | Total |
| Tributación rescate | Rendimientos del trabajo | Base del ahorro |
| Mínimos | Sin mínimo o muy bajos | Desde 1€ (MyInvestor) |
| Traspaso libre | ✓ (entre planes pensiones) | ✓ (entre fondos) |

**Regla práctica**:
- **Hasta 1.500€/año** → plan de pensiones indexado (aprovechas la deducción)
- **Más allá de 1.500€/año** → fondos indexados (mayor liquidez y menores comisiones)

Esta estrategia combinada es lo que recomienda la mayoría de planificadores financieros indexados en España. Para profundizar en la diferencia fiscal entre ambos productos, lee la [comparativa entre plan de pensiones y fondo indexado](/blog/plan-de-pensiones-vs-fondo-indexado).

---

## Errores frecuentes al elegir plan de pensiones

1. **Aportar al plan más caro de tu banco** "porque ya lo tienes ahí": la comisión del 1,5% se come la deducción fiscal en pocos años.
2. **Aportar más de 1.500€/año en un plan individual**: el exceso no es deducible y queda atrapado en el plan con la fiscalidad menos ventajosa que el fondo indexado.
3. **Rescatar todo el plan en un único año al jubilarse**: dispara el tipo marginal del IRPF. Mejor en forma de renta o en varios ejercicios.
4. **Olvidar la opción de traspaso**: si llevas años en un plan caro, el traspaso a un plan indexado puede salvar decenas de miles de euros del rescate final.

---

## Fuentes y lecturas complementarias

- [Indexa Pensiones — Información y rentabilidad](https://indexacapital.com/es/pensiones) — Datos oficiales del plan de pensiones indexado más popular en España.
- [MyInvestor — Planes de pensiones indexados](https://myinvestor.es/planes-de-pensiones/) — Comparativa de los planes indexados de MyInvestor con comisiones actualizadas.
- [AEAT — Aportaciones a planes de pensiones](https://sede.agenciatributaria.gob.es) — Información oficial sobre límites y deducciones aplicables.
`,
  },
  {
    slug: 'mejores-etfs-renta-fija-2026',
    title: 'Mejores ETFs de renta fija para inversores en España (2026)',
    excerpt:
      'Los mejores ETFs de renta fija UCITS para España en 2026: bonos globales, eurozona, corporativos y high yield. TER, cobertura EUR y cuál encaja en tu cartera.',
    publishedAt: '2026-05-24',
    readingMinutes: 10,
    keywords: ['mejores ETF renta fija España 2026', 'ETF bonos España', 'AGGH análisis', 'ETF renta fija EUR hedged', 'ETF deuda soberana eurozona'],
    faq: [
      {
        q: '¿Por qué incluir renta fija en una cartera indexada?',
        a: 'La renta fija actúa como amortiguador de la cartera durante caídas bursátiles. Cuando la renta variable cae un 30-40%, la renta fija de calidad (bonos gubernamentales de la eurozona y bonos corporativos de grado de inversión) suele caer poco o incluso subir, lo que reduce la volatilidad total de la cartera. Esto es especialmente importante para inversores cerca de la jubilación o con baja tolerancia psicológica al riesgo. Para inversores jóvenes con horizonte largo, una asignación pequeña (10-20%) de renta fija puede tener sentido como ejercicio de rebalanceo.',
      },
      {
        q: '¿Qué ETF de renta fija es el más recomendado para inversores en España?',
        a: 'El más popular es AGGH (iShares Core Global Aggregate Bond UCITS ETF EUR Hedged, ISIN IE00BDBRDM35), con TER 0,10%, cobertura EUR y exposición global a bonos gubernamentales y corporativos de grado de inversión. Es el ETF que más usan las carteras Boglehead españolas para la parte de renta fija. Alternativas: EUNA (eurozona soberana), VGEA (gobiernos globales) o IEAG (corporativos eurozona).',
      },
      {
        q: '¿Por qué es importante la cobertura EUR en ETFs de renta fija?',
        a: 'La renta fija tiene volatilidad baja (2-7% anual). Sin cobertura EUR, el riesgo divisa puede añadir 5-10% adicional de volatilidad, dominando completamente el comportamiento del ETF. Un bono americano puede caer un 5% en USD, pero si el dólar cae un 10% frente al euro, el inversor en euros pierde el 15%. La cobertura EUR elimina este efecto y mantiene la renta fija como amortiguador real de la cartera.',
      },
      {
        q: '¿Cuál es la diferencia entre bonos gubernamentales y bonos corporativos?',
        a: 'Los bonos gubernamentales están emitidos por estados (Alemania, Francia, España, EE.UU...) y son los más seguros: el riesgo de impago es muy bajo en economías desarrolladas. A cambio, ofrecen rentabilidad más baja. Los bonos corporativos los emiten empresas (Microsoft, Apple, Telefónica...) y pagan más rentabilidad para compensar el mayor riesgo de impago. Dentro de corporativos, los de "grado de inversión" (AAA-BBB) son más seguros que los "high yield" (BB-CCC). Para la parte conservadora de una cartera indexada, lo más común es gubernamentales o agregado (mezcla de ambos).',
      },
      {
        q: '¿Tiene sentido invertir en ETFs de renta fija high yield?',
        a: 'Los ETFs de high yield (bonos basura, con rating inferior a BBB-) tienen rendimientos esperados más altos pero también mayor correlación con la renta variable en momentos de estrés. Tienden a caer cuando la bolsa cae, lo que reduce su utilidad como amortiguador. Para la mayoría de inversores indexados, no aportan diversificación real: si vas a asumir riesgo, mejor renta variable; si quieres seguridad, mejor grado de inversión. El high yield tiene sentido para inversores más sofisticados que buscan un componente específico de "carry trade".',
      },
    ],
    content: `# Mejores ETFs de renta fija para inversores en España (2026)

La renta fija es la gran olvidada en muchas carteras indexadas españolas. La rentabilidad bursátil del 2024-2025 ha hecho que muchos inversores la consideren "innecesaria". Es un error: la renta fija no está ahí para hacer dinero, está ahí para que la cartera siga siendo manejable cuando la renta variable caiga un 40%.

Esta guía revisa los mejores ETFs de renta fija UCITS disponibles en España en 2026, organizados por tipo de activo y con criterios objetivos: TER, cobertura EUR, dominio fiscal y liquidez.

---

## Por qué la renta fija sigue importando

Una cartera 100% renta variable tiene rentabilidad esperada superior a una cartera 60/40 (60% acciones, 40% bonos). Pero también tiene volatilidad mucho mayor: caídas del 50% son históricamente posibles. Esa volatilidad es el principal motivo por el que los inversores particulares abandonan sus carteras en los peores momentos.

La renta fija de calidad cumple tres funciones:
1. **Reducir la volatilidad total** de la cartera
2. **Proporcionar liquidez** sin tener que vender renta variable en momentos malos
3. **Permitir el rebalanceo**: comprar renta variable barata cuando cae, vendiendo renta fija que ha aguantado

No tener nada de renta fija no es ni mejor ni peor: es una decisión de riesgo. Lo importante es ser consciente.

---

## Los mejores ETFs de renta fija disponibles en España

### 1. AGGH — iShares Core Global Aggregate Bond UCITS ETF EUR Hedged

| Dato | Valor |
|---|---|
| ISIN | IE00BDBRDM35 |
| TER | 0,10% |
| Cobertura | EUR Hedged |
| Tipo | Renta fija global (soberana + corporativa) |
| Domicilio | Irlanda |

El ETF de renta fija más popular entre Bogleheads españoles. Replica el índice Bloomberg Global Aggregate Bond, que incluye más de 7.000 bonos de gobiernos y empresas de grado de inversión de todo el mundo. La cobertura EUR es esencial.

**Para qué cartera**: la elección por defecto para la parte de renta fija de cualquier cartera Boglehead estándar. Diversificación máxima, coste mínimo, cobertura adecuada.

### 2. EUNA — iShares Core Euro Government Bond UCITS ETF

| Dato | Valor |
|---|---|
| ISIN | IE00B4WXJJ64 |
| TER | 0,07% |
| Cobertura | EUR (activos en EUR) |
| Tipo | Renta fija soberana eurozona |
| Domicilio | Irlanda |

Si quieres exposición exclusiva a bonos gubernamentales de países de la eurozona (Alemania, Francia, Italia, España, Países Bajos...). No hay riesgo divisa porque todos los activos son en euros.

**Para qué cartera**: inversores que prefieren máxima seguridad y simplicidad, sin exposición a high yield ni divisas extranjeras. Idóneo para perfiles muy conservadores.

### 3. IBCS — iShares € Corp Bond UCITS ETF

| Dato | Valor |
|---|---|
| ISIN | IE00B3F81R35 |
| TER | 0,20% |
| Cobertura | EUR (activos en EUR) |
| Tipo | Renta fija corporativa eurozona, grado de inversión |
| Domicilio | Irlanda |

Bonos emitidos por empresas grandes de la eurozona con rating de grado de inversión. Rentabilidad esperada algo superior a los soberanos a cambio de mayor riesgo de crédito.

**Para qué cartera**: complemento de bonos soberanos en cartera diversificada, o sustituto si quieres más rentabilidad sin salir del grado de inversión.

### 4. VGEA — Vanguard Global Aggregate Bond UCITS ETF EUR Hedged

| Dato | Valor |
|---|---|
| ISIN | IE00BG47KH54 |
| TER | 0,10% |
| Cobertura | EUR Hedged |
| Tipo | Renta fija global (soberana + corporativa) |
| Domicilio | Irlanda |

Alternativa de Vanguard al AGGH. Misma filosofía (renta fija global cubierta en euros), TER similar. Diferencia menor en el índice replicado, pero el comportamiento es prácticamente equivalente.

**Para qué cartera**: alternativa a AGGH si prefieres la marca Vanguard o si tu broker tiene mejor spread en este ETF.

### 5. IBGS — iShares € Govt Bond 1-3yr UCITS ETF

| Dato | Valor |
|---|---|
| ISIN | IE00B14X4Q57 |
| TER | 0,15% |
| Cobertura | EUR |
| Tipo | Bonos soberanos eurozona corto plazo |
| Domicilio | Irlanda |

Renta fija de corto plazo (1-3 años de duración). Muy poca sensibilidad a los cambios de tipos de interés, baja volatilidad. Útil como alternativa a la liquidez.

**Para qué cartera**: para el fondo de emergencia o como sustituto de la cuenta corriente cuando los tipos remunerados son bajos. No es para "invertir" en el sentido tradicional.

---

## Composición de la parte renta fija según perfil

**Perfil conservador (60% renta fija)**:
- 70% AGGH (global, agregado)
- 20% EUNA (eurozona soberana)
- 10% IBCS (corporativos eurozona)

**Perfil moderado (20-30% renta fija)**:
- 100% AGGH (simplicidad máxima)

**Perfil agresivo (10% renta fija)**:
- 100% AGGH (función amortiguadora, no rentabilidad)

**Cerca de jubilación o ya retirado**:
- 50% IBGS (corto plazo, liquidez)
- 50% AGGH (global, agregado)

---

## Errores frecuentes con renta fija

**1. Comprar bonos sin cobertura EUR**
El riesgo divisa puede dominar completamente la rentabilidad de un ETF de renta fija. Sin cobertura, no estás invirtiendo en bonos: estás invirtiendo en divisas con bonos como vehículo. Para entender mejor por qué, lee [riesgo divisa en ETFs](/blog/riesgo-divisa-etf-hedged-espana).

**2. Buscar la rentabilidad alta con high yield**
Los bonos high yield (rating BB o inferior) tienen mayor correlación con la renta variable en crisis. Cuando más amortiguador necesitas, peor cumplen su función.

**3. Querer "tradear" la renta fija con cambios de tipos**
Predecir los movimientos de los bancos centrales es imposible. Mantener una asignación de renta fija constante y rebalancear es más rentable que intentar entrar y salir según tu pronóstico macroeconómico.

**4. Asignar 0% renta fija "porque soy joven y mi horizonte es largo"**
Esa lógica es matemáticamente correcta pero psicológicamente peligrosa: la primera caída del 50% te enseñará si tu tolerancia al riesgo real coincide con tu tolerancia teórica. Mejor empezar con un 10-20% de renta fija y subir el peso de renta variable cuando hayas vivido al menos una caída fuerte.

---

## Fuentes y lecturas complementarias

- [Categoría: ETFs de renta fija — BogleHub](/etfs/renta-fija) — El catálogo completo de ETFs de renta fija UCITS disponibles en España, con TER y grado fiscal.
- [iShares — Ficha técnica AGGH](https://www.ishares.com/es/inversores-particulares/es/productos/291768/ishares-core-global-aggregate-bond-ucits-etf) — Composición, rentabilidad y datos de TER actualizados.
- [Vanguard — VGEA](https://www.vanguard.co.uk/) — Alternativa a AGGH con datos de cartera y duración.
- [JustETF — Comparador de ETFs de renta fija](https://www.justetf.com/es/find-etf.html) — Filtra por tipo, TER y cobertura para encontrar el ETF que encaje con tu cartera.
`,
  },
  {
    slug: 'myinvestor-opinion-2026',
    title: 'MyInvestor: opinión y análisis completo 2026',
    excerpt:
      'Análisis honesto de MyInvestor en 2026: cuenta remunerada, fondos indexados Vanguard y Amundi, comisiones reales, seguridad y para quién encaja este neobanco español.',
    publishedAt: '2026-05-24',
    readingMinutes: 9,
    keywords: ['MyInvestor opinión', 'MyInvestor cuenta remunerada', 'MyInvestor fondos indexados', 'MyInvestor seguridad', 'MyInvestor vs Indexa'],
    faq: [
      {
        q: '¿Es seguro MyInvestor?',
        a: 'Sí. MyInvestor es el neobanco del grupo Andbank España, una entidad regulada por el Banco de España y la CNMV. Los depósitos en euros hasta 100.000€ están cubiertos por el Fondo de Garantía de Depósitos español. Los fondos de inversión y ETFs se custodian como patrimonio separado del banco — en caso de insolvencia, son tuyos y están cubiertos adicionalmente por el Fondo de Garantía de Inversiones hasta 100.000€. La cuenta es 100% online sin oficinas físicas.',
      },
      {
        q: '¿Qué fondos indexados ofrece MyInvestor?',
        a: 'MyInvestor ofrece la mayor selección de fondos indexados de bajo coste disponible al inversor particular en España. Incluye gama Vanguard (Global Stock, Emerging Markets, EUR Investment Grade Bond), Amundi (Prime Global con TER 0,05%, Prime Eurozone, Index Emerging Markets), Fidelity (MSCI World, Index Emerging Markets) y otras gestoras. Todos permiten traspaso fiscal libre entre fondos, lo que es la mayor ventaja fiscal de los fondos sobre los ETFs en España.',
      },
      {
        q: '¿Cuál es el TAE de la cuenta remunerada de MyInvestor en 2026?',
        a: 'La cuenta remunerada de MyInvestor paga el 2% TAE el primer año hasta 70.000€ (con condiciones: aportación periódica desde nómina, recibos domiciliados, etc.). Después del primer año baja al 1% TAE. La cuenta es gratis sin comisiones de mantenimiento. Esta remuneración es competitiva con las mejores cuentas del mercado español, aunque no es la más alta. Verifica las condiciones actuales en la web ya que pueden cambiar.',
      },
      {
        q: '¿MyInvestor cobra comisión por comprar ETFs?',
        a: 'Sí, pero bajas. La comisión por orden de ETF es 0,20€ fijos + 0,03% del importe. Para órdenes pequeñas (<667€), la comisión mínima de 0,20€ es muy competitiva. Para órdenes grandes, el componente variable del 0,03% puede sumar más que en Trade Republic (0€) o DEGIRO (0,50€ + 0,004%). Para el inversor que quiere combinar ETFs y fondos indexados en una sola plataforma, MyInvestor es la mejor opción.',
      },
      {
        q: '¿Puedo abrir una cuenta de pensiones indexada en MyInvestor?',
        a: 'Sí. MyInvestor ofrece varios planes de pensiones indexados, algunos gestionados internamente y otros como white-label de Indexa Capital. Las comisiones totales rondan el 0,30-0,50% anual, entre las más bajas del mercado español. El mínimo de aportación es de 1€ y permite traspaso libre desde otros planes de pensiones sin coste fiscal ni operativo.',
      },
    ],
    content: `# MyInvestor: opinión y análisis completo 2026

MyInvestor es el neobanco del grupo Andbank España y se ha convertido en una de las plataformas más populares entre inversores indexados en España. Su propuesta combina cuenta corriente remunerada, broker para ETFs y, sobre todo, el acceso al mayor catálogo de fondos indexados de bajo coste disponible al inversor particular español.

Este análisis cubre qué hace bien, qué hace mal y para qué tipo de inversor tiene más sentido.

---

## Qué es MyInvestor

MyInvestor es la marca digital de Andbank España, un banco con licencia de la CNMV y supervisión del Banco de España desde 2010. La diferencia con un banco tradicional: 100% online, sin oficinas físicas, sin comisiones de mantenimiento en la mayoría de productos.

Lo que ofrece:
- Cuenta corriente y de ahorro remuneradas
- Broker para acciones, ETFs y fondos
- Fondos indexados Vanguard, Amundi, Fidelity (entre otros)
- Planes de pensiones indexados
- Hipotecas
- Tarjetas
- Carteras gestionadas (roboadvisor propio)

---

## La gran fortaleza: fondos indexados al menor coste

Aquí MyInvestor no tiene competencia real en España. Es el único banco que ofrece a la vez:

- **Fondos Vanguard institucionales** (no las clases minoristas más caras)
- **Amundi Prime Global** con TER del 0,05% (el fondo indexado global más barato disponible al inversor español)
- **Sin comisión de compra ni custodia**
- **Mínimo de aportación 1€** (aportaciones recurrentes desde el primer euro)
- **Traspaso fiscal libre** entre fondos (la mayor ventaja fiscal de los fondos sobre los ETFs en España)

Para inversores que quieren una cartera de fondos indexados con la máxima eficiencia fiscal y el mínimo coste, MyInvestor es la opción objetivamente mejor en España.

Las alternativas (Renta 4, Selfbank) ofrecen menos fondos o con comisiones de custodia. Los brokers extranjeros como DEGIRO o Trade Republic solo ofrecen ETFs, no fondos.

---

## La cuenta remunerada de MyInvestor

MyInvestor remunera la cuenta corriente al 2% TAE el primer año (hasta 70.000€) con condiciones razonables: aportación mensual de al menos 50€ desde una nómina o ingreso periódico, o domiciliación de algunos recibos. Sin esas condiciones, baja al 1% TAE el primer año.

Después del primer año, la remuneración baja: actualmente al 1% TAE. Es competitiva pero no la mejor del mercado.

Una característica interesante: el dinero remunerado está en una cuenta corriente regular (no en un depósito ni un fondo monetario). Tiene disponibilidad inmediata y está cubierta por el Fondo de Garantía de Depósitos hasta 100.000€.

---

## Comisiones por operar en bolsa

**Acciones y ETFs**:
- 0,20€ fijos + 0,03% del importe (compra y venta)
- Mínimo 1€, máximo 200€

**Fondos de inversión**:
- 0€ de comisión de compra
- 0€ de comisión de custodia
- 0€ de comisión de traspaso

**Planes de pensiones**:
- 0€ de comisión de apertura/aportación
- 0€ de comisión de traspaso

Para ETFs, la comisión de MyInvestor es más alta que Trade Republic (0€) y más alta que DEGIRO en órdenes grandes. Para fondos indexados, es la mejor del mercado. Para ver el coste anual exacto en euros frente a otros brokers según tu volumen y frecuencia de compra, usa el [comparador de brókers de BogleHub](/calculadora/comparar-brokers).

---

## Roboadvisor de MyInvestor

MyInvestor ofrece un servicio de gestión automatizada de carteras similar a Indexa o Finizens, con comisiones del 0,30-0,40% total. Es competitivo pero no ofrece una diferencia significativa con los competidores especializados (Indexa, Finizens).

Si ya tienes cuenta en MyInvestor por otros motivos y quieres delegar la gestión sin abrir una segunda entidad, tiene sentido. Si vas a empezar desde cero buscando el mejor roboadvisor, Indexa o Finizens están más enfocados al producto.

---

## Para quién tiene sentido MyInvestor

MyInvestor es la opción correcta si:

- **Quieres una cartera de fondos indexados** con traspaso fiscal libre
- **Valoras tener todo en una sola plataforma**: cuenta, fondos, ETFs, pensiones, hipoteca
- **Aportas cantidades pequeñas regulares**: 1€ de mínimo, sin comisión de compra
- **Prefieres un banco regulado en España** sobre brokers extranjeros
- **Quieres el plan de pensiones indexado más barato del mercado**

---

## Para quién NO tiene sentido MyInvestor

MyInvestor no es la mejor opción si:

- **Solo invertirás en ETFs sin fondos**: Trade Republic o DEGIRO son más baratos para órdenes grandes
- **Tu cartera tiene poco patrimonio y valoras mucho la cuenta remunerada**: hay cuentas con TAE más alta en otros neobancos
- **Quieres acceso a mercados internacionales avanzados**: MyInvestor cubre bien Europa y EEUU pero no es tan extensivo como brokers especializados

---

## Cartera mínima recomendada en MyInvestor

Para un inversor en fase de acumulación que quiera la máxima eficiencia fiscal y mínimo coste:

- **80% Amundi Prime Global** (TER 0,05%, equivalente a MSCI World)
- **10% Amundi Index MSCI Emerging Markets** (TER 0,20%, emergentes)
- **10% Amundi Index Eurozone Government Bond** (TER 0,15%, renta fija eurozona)

Coste total ponderado: ~0,08-0,10% anual. Mínimo de aportación: 1€ por fondo. Traspaso libre entre los tres. Para muchos inversores en España, esta es la cartera óptima.

---

## Fuentes y lecturas complementarias

- [MyInvestor — Catálogo de fondos indexados](https://myinvestor.es/fondos-de-inversion/) — Lista completa de fondos disponibles con datos de TER actualizados.
- [Banco de España — Registro de entidades](https://www.bde.es/) — Verifica el registro de Andbank España (matriz de MyInvestor).
- [Análisis Amundi Prime Global — BogleHub](/blog/amundi-prime-global-analisis) — Por qué este fondo de MyInvestor es el más eficiente del mercado español.
`,
  },
  {
    slug: 'trade-republic-opinion-2026',
    title: 'Trade Republic: opinión y análisis completo 2026',
    excerpt:
      'Análisis de Trade Republic en 2026: 0€ por operar ETFs, planes de ahorro automáticos, cuenta remunerada al 3% TAE y por qué se ha hecho tan popular en España.',
    publishedAt: '2026-05-24',
    readingMinutes: 9,
    keywords: ['Trade Republic opinión', 'Trade Republic España', 'Trade Republic seguridad', 'Trade Republic comisiones', 'Trade Republic cuenta remunerada'],
    faq: [
      {
        q: '¿Es seguro Trade Republic para invertir desde España?',
        a: 'Sí. Trade Republic es un banco alemán con licencia bancaria completa supervisado por el BaFin (regulador alemán) y el Bundesbank desde 2023. Los depósitos en euros hasta 100.000€ están cubiertos por el Fondo de Garantía de Depósitos alemán (Entschädigungseinrichtung deutscher Banken). Las acciones y ETFs se custodian como patrimonio separado del banco — son de tu propiedad legalmente, independiente del banco. Adicionalmente cubiertos hasta 20.000€ por el Fondo Europeo de Garantía de Inversiones (ESIF).',
      },
      {
        q: '¿Cuánto cobra Trade Republic por operar ETFs?',
        a: '0€ por operación, en cualquier ETF disponible en la plataforma (más de 2.000 ETFs). No hay comisión mínima, no hay comisión de custodia, no hay comisión de mantenimiento. Trade Republic gana dinero principalmente por order flow (cobra a los creadores de mercado por enrutar órdenes) y por el margen de la cuenta remunerada. Es un modelo legítimo y común en brokers neobancarios europeos.',
      },
      {
        q: '¿Qué son los planes de ahorro automáticos de Trade Republic?',
        a: 'Una funcionalidad única que permite programar compras periódicas (semanal, mensual o trimestral) de cualquier ETF desde 1€. La automatización es total: indicas qué ETF, cuánto invertir, con qué frecuencia y el día del mes, y Trade Republic ejecuta la compra automáticamente. Sin comisión, fracciones de participación admitidas. Es la mejor herramienta del mercado para implementar dollar cost averaging (DCA) sin esfuerzo.',
      },
      {
        q: '¿Cuál es el TAE de la cuenta remunerada de Trade Republic en 2026?',
        a: 'Trade Republic remunera el saldo en cuenta en euros con el tipo de depósito del BCE menos un margen. En 2026, con tipos del BCE alrededor del 2,5-3%, la cuenta paga aproximadamente 2-2,5% TAE sin condiciones. La remuneración se paga mensualmente. No hay límites en el saldo remunerado (a diferencia de otras cuentas que limitan a 30.000-100.000€). La cuenta es 100% gratuita.',
      },
      {
        q: '¿Trade Republic ofrece fondos indexados o solo ETFs?',
        a: 'Solo ETFs. Trade Republic no ofrece fondos de inversión tradicionales. Esto significa que no puedes aprovechar el traspaso fiscal libre entre fondos que sí existe en MyInvestor con Vanguard o Amundi. Para inversores que quieren combinar la ventaja del 0% en ETFs con el traspaso fiscal de los fondos, la estrategia óptima es tener cuenta en Trade Republic (ETFs) y MyInvestor (fondos indexados).',
      },
    ],
    content: `# Trade Republic: opinión y análisis completo 2026

Trade Republic ha sido el broker que más ha cambiado la inversión particular en España en los últimos cinco años. Antes, comprar un ETF costaba 5-15€ por orden en cualquier broker español. Trade Republic llegó con 0€ por operación, planes de ahorro automáticos desde 1€ y una app diseñada para que el inversor no se complique.

Este análisis cubre cómo funciona, dónde está la trampa (porque siempre hay una), y para qué inversor encaja realmente.

---

## Qué es Trade Republic

Trade Republic es un neobanco alemán fundado en Berlín en 2015. Tiene licencia bancaria completa desde 2023, supervisado por el BaFin (regulador alemán de mercados financieros) y el Bundesbank. En 2024 superó los 5 millones de clientes en Europa y los 1.000 millones de euros en cuentas remuneradas.

Su propuesta es deliberadamente simple:
- 0€ por comprar o vender ETFs y acciones
- Cuenta remunerada al 2-3% TAE sin condiciones
- App móvil sencilla, diseñada para no equivocarse
- Planes de ahorro automáticos en ETFs desde 1€

---

## La pregunta inevitable: ¿cómo gana dinero?

Si cobra 0€ por operar, ¿cómo es viable? Trade Republic gana dinero principalmente por:

**1. Payment for Order Flow (PFOF)**
Cobra a los creadores de mercado (market makers) por enrutar las órdenes de los clientes hacia ellos. Los market makers obtienen un margen entre el precio de compra y venta (spread), y comparten parte de ese margen con Trade Republic. La práctica está regulada en Europa.

**Implicación para el usuario**: el spread en algunas operaciones puede ser ligeramente mayor que si compraras directamente en Xetra. Para ETFs muy líquidos como VWCE o IWDA, la diferencia es marginal (céntimos por operación). Para ETFs menos líquidos puede ser más notable.

**2. La cuenta remunerada**
Trade Republic recibe el tipo de depósito del BCE por el dinero en cuenta de sus clientes. Paga al cliente un poco menos que ese tipo (por ejemplo, BCE al 3% y cliente recibe 2,5%) y se queda con la diferencia.

**3. Tarjetas, cripto y otros productos**
Cobra comisiones en otros productos que no son ETFs ni acciones (criptomonedas, tarjetas, etc.).

Es un modelo de negocio legítimo y común en bancos de inversión digital europeos. No es "demasiado bueno para ser verdad": es simplemente más eficiente que los bancos tradicionales.

---

## La verdadera ventaja: planes de ahorro automáticos

Esta es la funcionalidad que más impacta al inversor indexado de largo plazo. Permite programar compras periódicas de ETFs con automatización total:

- Eliges el ETF (cualquiera de los 2.000+ disponibles)
- Indicas el importe (desde 1€)
- Eliges la frecuencia (semanal, mensual o trimestral)
- Indicas el día del mes
- Trade Republic compra automáticamente, sin comisión, en fracciones si es necesario

¿Por qué importa tanto? Porque elimina la fricción y la tentación de hacer market timing. Un inversor que quiere aportar 200€ al mes a VWCE programa el plan una vez y se olvida durante años. Sin decisiones que tomar, sin recordatorios, sin tentación de esperar "a que baje".

Es objetivamente la mejor herramienta del mercado español para implementar [Dollar Cost Averaging](/blog/dca-vs-lump-sum-aportar-mensual) sin esfuerzo.

---

## La cuenta remunerada de Trade Republic

Sin condiciones (no requiere nómina, ni recibos domiciliados, ni aportación mínima), Trade Republic remunera el saldo en cuenta al tipo de depósito del BCE menos un pequeño margen. En 2026, con tipos del BCE en el 2,5-3%, la cuenta paga aproximadamente 2-2,5% TAE.

**Sin límite de saldo remunerado**: a diferencia de cuentas como las de MyInvestor (limitada a 70.000€) o N26 (limitada a 100.000€), Trade Republic remunera todo el saldo independientemente del importe. Útil para inversores con liquidez alta esperando ser invertida.

**Pago mensual**: los intereses se acreditan cada mes en la cuenta. Visibilidad clara, sin sorpresas.

---

## Limitaciones de Trade Republic

**1. Solo ETFs, no fondos de inversión**
No puedes comprar fondos Vanguard, Amundi o Fidelity. Si quieres aprovechar el traspaso fiscal libre entre fondos en España, necesitas un segundo broker (MyInvestor).

**2. Mercados limitados**
Trade Republic da acceso a bolsas europeas principales y a EEUU (NYSE, NASDAQ). No tiene acceso a mercados asiáticos directos ni a ETFs menos comunes.

**3. Pocas opciones avanzadas**
No hay órdenes stop-loss complejas, no hay análisis técnico avanzado, no hay derivados. Es deliberadamente simple, lo que para el inversor indexado es una virtud pero para el trader técnico es una limitación.

**4. Spread en ETFs menos líquidos**
El order flow puede generar spreads ligeramente mayores que en compra directa en Xetra. Para ETFs como CSPX, VWCE o IWDA, la diferencia es despreciable. Para ETFs nicho, puede ser relevante.

---

## Trade Republic vs DEGIRO vs MyInvestor

| | Trade Republic | DEGIRO | MyInvestor |
|---|---|---|---|
| Comisión ETF | 0€ | 0,50€ + 0,004% | 0,20€ + 0,03% |
| Planes ahorro automáticos | ✓ | ✗ | ✗ |
| Fondos indexados | ✗ | ✗ | ✓ |
| Cuenta remunerada | ✓ (2-2,5%) | ✗ | ✓ (1-2%) |
| Mercados | Europa + EEUU | 50+ bolsas mundiales | Principalmente Europa |
| Tipo de entidad | Banco alemán (BaFin) | Broker holandés (AFM) | Banco español (BdE+CNMV) |

**Si solo vas a invertir en ETFs**: Trade Republic gana en sencillez y coste.
**Si quieres acceso a más mercados**: DEGIRO.
**Si quieres fondos indexados o todo en una entidad española**: MyInvestor.
**La cartera óptima**: Trade Republic para ETFs + MyInvestor para fondos.

Si tu prioridad es la cuenta remunerada más alta, también merece la pena mirar [Scalable Capital](/blog/scalable-capital-opinion-2026): otro banco alemán regulado por BaFin que con su plan Prime ofrece hasta el 4% TAE y operaciones ilimitadas a 0€.

La tabla compara comisiones, pero lo que pagas de verdad depende de tu volumen y frecuencia de compra: el [comparador de brókers de BogleHub](/calculadora/comparar-brokers) lo calcula en euros al año para cada uno. Y para profundizar en la comparativa, lee el [análisis completo de DEGIRO vs Trade Republic vs MyInvestor](/blog/degiro-vs-trade-republic-vs-myinvestor-2026).

---

## Para quién es Trade Republic

Es la opción ideal si:
- Quieres invertir en ETFs sin complicaciones
- Aportas pequeñas cantidades de forma regular (DCA)
- Valoras la simplicidad sobre las funciones avanzadas
- Buscas la cuenta remunerada sin condiciones
- Eres un inversor que tiende a sobrepensar las decisiones: la app te ayuda a aportar y olvidar

No es ideal si:
- Quieres fondos indexados con traspaso fiscal
- Necesitas acceso a mercados asiáticos o ETFs nicho
- Tu cartera es muy grande y quieres negociar con órdenes técnicas avanzadas

---

## Fuentes y lecturas complementarias

- [Trade Republic — Cuenta de inversión](https://traderepublic.com/es-es) — Información oficial sobre comisiones, cuenta remunerada y catálogo de productos.
- [BaFin — Registro de entidades reguladas](https://www.bafin.de) — Verifica el registro de Trade Republic como banco supervisado en Alemania.
- [DEGIRO vs Trade Republic vs MyInvestor — BogleHub](/blog/degiro-vs-trade-republic-vs-myinvestor-2026) — Comparativa detallada de los tres brokers más usados por inversores indexados en España.
`,
  },
  {
    slug: 'etfs-dividendos-vivir-rentas-espana',
    title: 'ETFs de dividendos para vivir de las rentas en España (2026)',
    excerpt:
      'Estrategia de inversión en ETFs de dividendos para inversores españoles: mejores ETFs, fiscalidad, comparativa con acumulación y cuánto capital necesitas para vivir de las rentas.',
    publishedAt: '2026-05-24',
    readingMinutes: 10,
    keywords: ['ETF dividendos España', 'vivir de los dividendos España', 'mejores ETF dividendos crecientes', 'ETF distribución alta rentabilidad', 'cuánto capital para vivir de rentas'],
    faq: [
      {
        q: '¿Cuánto capital necesito para vivir de los dividendos en España?',
        a: 'Depende del estilo de vida y de la rentabilidad por dividendo de tu cartera. Una cartera de ETFs de dividendos crecientes (como SCHD o VHYL) reparte aproximadamente un 3-4% anual de dividend yield. Para vivir con 1.500€/mes (18.000€ anuales) necesitarías una cartera de 450.000-600.000€. Para 2.500€/mes, entre 750.000€ y 1.000.000€. La pensión pública reduce significativamente este capital necesario: si tu pensión cubre 1.000€, solo necesitas dividendos para los 500-1.500€ restantes.',
      },
      {
        q: '¿Cuál es el mejor ETF de dividendos disponible en España?',
        a: 'Para inversores españoles, los más populares son: VHYL (Vanguard FTSE All-World High Dividend Yield UCITS ETF, TER 0,29%, dividend yield ~3,5%), TDIV (VanEck Morningstar Developed Markets Dividend Leaders, TER 0,38%, yield ~4%) y FUSD (Fidelity US Quality Income UCITS ETF, TER 0,25%, foco en EEUU). Todos son de distribución y domiciliados en Irlanda. SCHD es muy popular pero no está disponible directamente en España (es un ETF americano).',
      },
      {
        q: '¿Tributan más los ETFs de distribución que los de acumulación en España?',
        a: 'Sí, en la fase de acumulación. Los dividendos repartidos tributan inmediatamente como rendimientos del capital mobiliario (19-28% según importe). Un ETF de acumulación reinvierte esos dividendos sin generar evento fiscal, difiriendo el impuesto hasta la venta. Para un inversor en fase de crecimiento del patrimonio, la acumulación es más eficiente. Para un inversor que quiere vivir de las rentas, la distribución es funcionalmente necesaria.',
      },
      {
        q: '¿Es mejor invertir en ETFs de alto dividendo o de dividendos crecientes?',
        a: 'Los ETFs de alto dividendo (high yield) buscan empresas con dividend yield alto en el momento actual. Suelen tener exposición concentrada a sectores maduros (utilities, telecomunicaciones, bancos) que pueden recortar dividendos en crisis. Los ETFs de dividendos crecientes (dividend growth) buscan empresas con historial de aumentar el dividendo cada año, lo que indica calidad financiera. Para una estrategia de "vivir de las rentas" a largo plazo, dividend growth tiende a ser más estable que high yield.',
      },
      {
        q: '¿Es mejor estrategia vivir de dividendos o vender un 4% anual?',
        a: 'Matemáticamente, son equivalentes a largo plazo si la rentabilidad total (precio + dividendos) es la misma. La diferencia es psicológica y operativa: vivir de dividendos no requiere "decidir cuándo vender", lo que reduce el riesgo de errores de timing. Pero limita la cartera a ETFs de dividendos, generalmente más caros y menos diversificados que la renta variable global. La estrategia más eficiente para la mayoría: cartera diversificada (VWCE/IWDA) y vender un porcentaje anual o un import necesario. Lee la guía de [retirada FIRE](/blog/fire-espana-cuanto-necesitas).',
      },
    ],
    content: `# ETFs de dividendos para vivir de las rentas en España (2026)

"Vivir de los dividendos" es una de las grandes aspiraciones del inversor particular. La promesa: una cartera que genere ingresos pasivos sin necesidad de vender participaciones, financiando tu estilo de vida indefinidamente. La realidad en España tiene matices importantes — fiscales, de selección de ETFs y de tamaño de cartera necesaria.

Esta guía cubre cómo funciona, qué ETFs disponibles en España tienen sentido y cuándo conviene la estrategia frente a alternativas como la regla del 4%.

---

## Dividend yield vs dividend growth: dos filosofías diferentes

**ETFs de alto dividendo (High Yield)**
Buscan empresas con dividend yield alto en el momento actual (4-6%+). El criterio de selección es el porcentaje de dividendo sobre el precio. Resultado: exposición concentrada a sectores maduros como utilities, telecomunicaciones, bancos y energía. Históricamente más volátiles en términos de dividendo: las empresas pueden recortarlo en crisis.

Ejemplos: VHYL (Vanguard FTSE All-World High Dividend Yield), TDIV (VanEck Dividend Leaders).

**ETFs de dividendos crecientes (Dividend Growth)**
Buscan empresas con historial de aumentar el dividendo año tras año, generalmente 10+ años consecutivos. El criterio implica calidad financiera: solo empresas con balances sólidos y crecimiento estable pueden mantener subidas sistemáticas del dividendo.

Ejemplos: SCHD (no disponible directamente en España como UCITS), VIG (Vanguard Dividend Appreciation, no disponible en versión UCITS para España).

**Para inversores en España con productos UCITS**: la mayoría de opciones son de alto dividendo. La estrategia de dividend growth pura es más difícil de implementar con ETFs UCITS.

---

## Los mejores ETFs de dividendos disponibles en España

### 1. VHYL — Vanguard FTSE All-World High Dividend Yield UCITS ETF

| Dato | Valor |
|---|---|
| ISIN | IE00B8GKDB10 |
| TER | 0,29% |
| Distribución | Trimestral |
| Dividend yield aprox | 3,5% |
| Domicilio | Irlanda |

El ETF más popular para una estrategia de dividendos diversificada globalmente. Replica el índice FTSE All-World High Dividend Yield, que selecciona empresas globales con dividend yield por encima de la media. Diversificación amplia (más de 1.700 valores) y peso razonable a EEUU (~45%) y Europa (~25%).

### 2. TDIV — VanEck Morningstar Developed Markets Dividend Leaders UCITS ETF

| Dato | Valor |
|---|---|
| ISIN | NL0011683594 |
| TER | 0,38% |
| Distribución | Trimestral |
| Dividend yield aprox | 4% |
| Domicilio | Países Bajos |

Selecciona 100 empresas con mayor dividend yield de mercados desarrollados. Concentración mayor que VHYL pero yields más altos. Domicilio en Países Bajos (menos eficiente fiscalmente que Irlanda para dividendos USA).

### 3. FUSD — Fidelity US Quality Income UCITS ETF

| Dato | Valor |
|---|---|
| ISIN | IE00BYXVGZ48 |
| TER | 0,25% |
| Distribución | Trimestral |
| Dividend yield aprox | 2,5-3% |
| Domicilio | Irlanda |

Foco exclusivo en EEUU, con criterio de calidad. No es estrictamente "alto dividendo" sino "calidad con dividendo decente". Buena complementariedad si quieres exposición específica al mercado americano.

### 4. ZPRG — SPDR S&P Global Dividend Aristocrats UCITS ETF

| Dato | Valor |
|---|---|
| ISIN | IE00B9CQXS71 |
| TER | 0,45% |
| Distribución | Trimestral |
| Dividend yield aprox | 4% |
| Domicilio | Irlanda |

Empresas que han mantenido o aumentado el dividendo durante al menos 10 años consecutivos. Es lo más parecido a una estrategia "dividend growth" disponible en versión UCITS.

---

## La fiscalidad de los ETFs de dividendos en España

Los dividendos de ETFs UCITS tributan como **rendimientos del capital mobiliario** en el IRPF español:

| Tramo | Tipo |
|---|---|
| Hasta 6.000€ | 19% |
| 6.000-50.000€ | 21% |
| 50.000-200.000€ | 23% |
| 200.000-300.000€ | 27% |
| Más de 300.000€ | 28% |

**El cobro funciona así**:
1. La empresa paga dividendo
2. El país de origen aplica retención (15% si el ETF es irlandés y la empresa es americana; 21% para empresas españolas)
3. El ETF cobra el dividendo neto y lo reparte al partícipe
4. Si el broker es español, aplica retención adicional del 19%
5. En la declaración de la renta, el partícipe ajusta el impuesto final

**Doble imposición**: parte de la retención en origen puede recuperarse en la declaración como deducción por doble imposición internacional, hasta el límite del impuesto español.

---

## Cuánto capital necesitas para vivir de los dividendos

Con un dividend yield medio del 3-4% en una cartera diversificada:

| Gasto mensual | Capital necesario (yield 3%) | Capital necesario (yield 4%) |
|---|---|---|
| 1.000€ | 400.000€ | 300.000€ |
| 1.500€ | 600.000€ | 450.000€ |
| 2.000€ | 800.000€ | 600.000€ |
| 3.000€ | 1.200.000€ | 900.000€ |

**Restando pensión pública**: si esperas cobrar 1.000€/mes de pensión, solo necesitas dividendos para cubrir lo restante. Para 1.500€/mes con 1.000€ de pensión: solo necesitas 500€/mes en dividendos = capital de 150.000-200.000€.

**Crítica honesta**: el dividend yield del 4% es difícil de mantener sin asumir riesgo concentrado. Una cartera diversificada estilo VWCE tiene yield de ~1,5-2%. Para lograr 4% sostenible necesitas concentrar en sectores específicos o aceptar menor crecimiento.

---

## ¿Dividendos o retirada al 4%?

**Estrategia dividendos**:
- ✓ No requiere decidir cuándo vender
- ✓ Ingresos relativamente estables
- ✗ Concentra en ciertos sectores
- ✗ Menor diversificación
- ✗ Yield difícil de mantener sin riesgo
- ✗ Tributación inmediata cada año

**Estrategia retirada al 4%**:
- ✓ Cartera totalmente diversificada (VWCE/IWDA)
- ✓ Mejor rentabilidad total esperada
- ✓ Diferimiento fiscal hasta vender
- ✗ Requiere disciplina para vender en mal momento
- ✗ Necesita planificación más activa

Para la mayoría de inversores, la estrategia 60/40 (cartera diversificada con retirada al 4%) supera a la estrategia pura de dividendos en términos de rentabilidad total y diversificación. Para más detalles sobre cuánto capital necesitas según estrategia, lee la [guía FIRE en España](/blog/fire-espana-cuanto-necesitas) y prueba la [calculadora FIRE con Monte Carlo](/calculadora/fire-monte-carlo).

---

## Estrategia híbrida: lo mejor de ambos mundos

Una opción muy razonable para inversores que quieren la psicología de los dividendos sin renunciar a la diversificación:

- **60-70% en cartera global de acumulación** (VWCE o IWDA): crecimiento del patrimonio
- **20-30% en ETFs de dividendos** (VHYL): ingresos parcialmente pasivos
- **10% renta fija** (AGGH): estabilidad

En la fase de retirada, los dividendos del 20-30% en VHYL cubren parte de las necesidades sin tener que vender. La parte de acumulación se vende según necesidades. Esta combinación equilibra los pros y contras de cada estrategia.

---

## Fuentes y lecturas complementarias

- [Vanguard — VHYL](https://www.vanguard.co.uk/) — Ficha técnica del ETF de dividendos más popular para inversores españoles.
- [JustETF — Filtro de ETFs de dividendos](https://www.justetf.com/es/) — Comparador con dividend yield, frecuencia y domicilio.
- [Calculadora FIRE Monte Carlo — BogleHub](/calculadora/fire-monte-carlo) — Simula la probabilidad de que tu cartera de dividendos aguante toda la jubilación.
- [Categoría: ETFs de distribución — BogleHub](/etfs/distribucion) — Todos los ETFs UCITS de reparto disponibles en España, con TER y grado fiscal.
`,
  },
  {
    slug: 'swrd-vs-iwda',
    title: 'SWRD vs IWDA: comparativa de los dos ETFs MSCI World más populares (2026)',
    excerpt:
      'Comparativa detallada entre SWRD (SPDR MSCI World) e IWDA (iShares Core MSCI World) en 2026: TER, liquidez, tracking difference y cuál es mejor para el inversor español.',
    publishedAt: '2026-05-24',
    readingMinutes: 8,
    keywords: ['SWRD vs IWDA', 'mejor ETF MSCI World España', 'SPDR MSCI World análisis', 'iShares Core MSCI World', 'SWRD análisis', 'IWDA análisis'],
    faq: [
      {
        q: '¿Cuál tiene el TER más bajo, SWRD o IWDA?',
        a: 'SWRD tiene el TER más bajo: 0,12% anual frente al 0,20% de IWDA. La diferencia de 0,08% anual puede parecer pequeña, pero sobre una cartera de 100.000€ son 80€ al año, y sobre 30 años con interés compuesto puede superar los 5.000€ de diferencia acumulada. Para carteras grandes, la ventaja de SWRD es significativa.',
      },
      {
        q: '¿IWDA es más líquido que SWRD?',
        a: 'Sí, considerablemente. IWDA tiene un patrimonio gestionado superior a 75.000 millones de USD, mientras que SWRD ronda los 10.000 millones. Esta diferencia de tamaño se refleja en spreads más estrechos en IWDA (más fácil comprar y vender al mejor precio). Para órdenes pequeñas la diferencia es marginal, pero para órdenes grandes o si operas en horarios de baja liquidez, IWDA tiene ventaja operativa.',
      },
      {
        q: '¿Ambos están domiciliados en Irlanda?',
        a: 'Sí. Tanto SWRD (ISIN IE00BFY0GT14) como IWDA (ISIN IE00B4L5Y983) están domiciliados en Irlanda y aprovechan el convenio fiscal Irlanda-EE.UU. que reduce la retención sobre dividendos americanos del 30% al 15%. Ambos son de acumulación: reinvierten los dividendos automáticamente sin generar evento fiscal hasta la venta. La fiscalidad es prácticamente idéntica.',
      },
      {
        q: '¿Cuál replica mejor el MSCI World, SWRD o IWDA?',
        a: 'Ambos hacen un trabajo excelente. La métrica clave es el tracking difference (la diferencia entre el retorno del ETF y el retorno del índice). En los últimos años, IWDA ha tenido un tracking difference ligeramente mejor que SWRD, lo que parcialmente compensa su TER más alto. La diferencia neta entre ambos suele ser inferior a 0,05% anual una vez consideradas todas las variables. En la práctica, para el inversor de largo plazo, el comportamiento es casi idéntico.',
      },
      {
        q: '¿Cuál debo elegir para mi cartera, SWRD o IWDA?',
        a: 'Para la mayoría de inversores, ambos son válidos y la diferencia es marginal. Si priorizas TER más bajo: SWRD. Si priorizas liquidez y patrimonio gestionado más alto: IWDA. Para carteras grandes (>200.000€) o con horizonte muy largo (30+ años), el ahorro de TER en SWRD se acumula. Para carteras pequeñas o si tu broker tiene mejor spread en IWDA, la diferencia operativa es despreciable.',
      },
    ],
    content: `# SWRD vs IWDA: comparativa de los dos ETFs MSCI World más populares (2026)

SWRD (SPDR MSCI World UCITS ETF Acc) e IWDA (iShares Core MSCI World UCITS ETF) son los dos ETFs de MSCI World más utilizados por inversores indexados españoles. Ambos replican el mismo índice. Ambos están domiciliados en Irlanda. Ambos son de acumulación. La pregunta es cuál elegir cuando la diferencia parece tan pequeña.

Esta comparativa cubre los criterios objetivos: TER, liquidez, tracking difference y los matices que importan para una decisión informada.

---

## Ficha técnica comparada

| Dato | SWRD | IWDA |
|---|---|---|
| Nombre | SPDR MSCI World UCITS ETF | iShares Core MSCI World UCITS ETF |
| ISIN | IE00BFY0GT14 | IE00B4L5Y983 |
| Gestora | State Street (SPDR) | BlackRock (iShares) |
| Índice | MSCI World | MSCI World |
| TER | 0,12% | 0,20% |
| Política | Acumulación | Acumulación |
| Domicilio | Irlanda | Irlanda |
| Patrimonio | ~10.000 M USD | ~75.000 M USD |
| Replicación | Física por muestreo | Física por muestreo |
| Lanzamiento | 2019 | 2009 |

---

## Ventaja de SWRD: TER más bajo

SWRD es el ETF de MSCI World más barato disponible en España. Su TER del 0,12% anual es un 40% inferior al de IWDA (0,20%). Sobre una cartera de 50.000€, esto significa:

- SWRD: 60€/año en comisiones
- IWDA: 100€/año en comisiones
- Diferencia: 40€/año

A 30 años con interés compuesto, los 40€ anuales se convierten en aproximadamente 4.000€ de diferencia acumulada. Para carteras de 200.000€, la diferencia se cuadruplica a ~16.000€.

Esta diferencia es real y significativa para carteras grandes. Para carteras pequeñas en términos absolutos es menor, pero el porcentaje es el mismo.

---

## Ventaja de IWDA: liquidez y tamaño

IWDA gestiona aproximadamente 75.000 millones de USD frente a los 10.000 millones de SWRD. Esta diferencia tiene implicaciones prácticas:

**1. Spreads más estrechos**
En un ETF con más volumen de negociación, la diferencia entre el precio de compra y el precio de venta (bid-ask spread) es típicamente menor. Para órdenes grandes esto significa un coste implícito menor que no aparece en el TER pero sí en el resultado real.

**2. Menor riesgo de cierre del fondo**
Los ETFs con muy poco patrimonio (<100 M USD) corren riesgo de ser cerrados por la gestora si no son rentables. Tanto SWRD como IWDA están muy por encima de ese umbral, pero IWDA tiene un colchón mayor.

**3. Disponibilidad en más brokers**
IWDA está disponible en casi cualquier broker europeo. SWRD también está bien distribuido pero en algunos brokers menores puede no aparecer.

---

## Tracking difference: el coste real

El TER es solo una parte del coste real de un ETF. El **tracking difference** mide cuánto se desvía el ETF del índice subyacente. Un ETF con TER del 0,20% pero tracking difference de -0,10% (el ETF supera al índice neto de costes en 0,10%) es en realidad más barato que un ETF con TER del 0,12% y tracking difference de -0,01%.

**Datos históricos aproximados** (verificar siempre con JustETF):
- IWDA: tracking difference cercano a 0 o ligeramente positivo gracias a optimización de retención en origen de dividendos
- SWRD: tracking difference ligeramente negativo, en línea con su TER

La gestora con más experiencia y patrimonio (BlackRock con iShares) suele tener mejor eficiencia operativa, lo que se traduce en mejor tracking difference. Esta ventaja parcialmente compensa el TER más alto de IWDA.

---

## Composición y exposición regional

Ambos replican el MSCI World, que incluye aproximadamente 1.500 grandes y medianas empresas de 23 países desarrollados. La composición es prácticamente idéntica:

**Por país** (aproximado):
- EEUU: ~70%
- Japón: ~6%
- Reino Unido: ~4%
- Canadá: ~3%
- Francia, Suiza, Alemania: ~3% cada uno
- Otros desarrollados: ~10%

**Por sector** (aproximado):
- Tecnología: ~24%
- Financiero: ~14%
- Salud: ~13%
- Consumo discrecional: ~11%
- Industrial: ~10%
- Otros: ~28%

**Importante**: ninguno de los dos incluye mercados emergentes. Para tener exposición global completa, necesitas añadir un ETF de emergentes como EIMI (~12% del peso global) o usar VWCE que ya incluye emergentes internamente.

---

## Dónde comprar cada uno en España

| Broker | SWRD | IWDA |
|---|---|---|
| Trade Republic | ✓ (planes de ahorro) | ✓ (planes de ahorro) |
| DEGIRO | ✓ | ✓ |
| MyInvestor | ✓ | ✓ |
| XTB | ✓ | ✓ |

Ambos están disponibles en todos los brokers principales del mercado español. La comisión por orden y los spreads pueden variar entre brokers, así que verifica las condiciones antes de elegir.

---

## La decisión práctica

**Elige SWRD si**:
- Tu prioridad es el TER mínimo
- Tu cartera es grande (>100.000€) y el ahorro acumulado importa
- Te quedas con un ETF durante décadas sin operar
- Tu broker tiene buen spread en SWRD

**Elige IWDA si**:
- Valoras la liquidez y el patrimonio gestionado
- Haces órdenes grandes y quieres spreads más estrechos
- Prefieres la gestora más establecida (BlackRock)
- El tracking difference compensa el mayor TER en tu broker

**La verdad incómoda**: para la mayoría de inversores particulares con carteras de 5.000-50.000€, la diferencia práctica entre SWRD e IWDA es despreciable. Ambos son excelentes ETFs y la decisión correcta es elegir uno y mantenerlo, no cambiar de ETF buscando el "óptimo perfecto".

Para una comparativa más amplia que incluya VWCE (FTSE All-World que sí incluye emergentes), lee el [análisis VWCE vs CSPX vs IWDA](/blog/vwce-vs-cspx-vs-iwda).

---

## Fuentes y lecturas complementarias

- [SPDR — Ficha SWRD](https://www.ssga.com/) — Datos oficiales del ETF de SPDR, incluyendo composición y tracking difference.
- [iShares — Ficha IWDA](https://www.ishares.com/es/inversores-particulares/es/productos/251882/) — Datos oficiales de BlackRock con historial completo.
- [Análisis VWCE — BogleHub](/blog/vwce-analisis-completo) — La alternativa que incluye emergentes en un solo ETF.
`,
  },
  {
    slug: 'cartera-permanente-harry-browne-espana',
    title: 'La cartera permanente de Harry Browne adaptada al inversor español (2026)',
    excerpt:
      'Guía completa de la cartera permanente de Harry Browne para inversores en España: composición 25/25/25/25, ETFs disponibles UCITS, rentabilidad histórica y para qué perfil encaja.',
    publishedAt: '2026-05-24',
    readingMinutes: 10,
    keywords: ['cartera permanente España', 'cartera permanente Harry Browne', 'cartera permanente ETF UCITS', 'cartera permanente rentabilidad', 'oro en cartera inversión'],
    faq: [
      {
        q: '¿Qué es la cartera permanente de Harry Browne?',
        a: 'Es una asignación de activos diseñada por el economista americano Harry Browne en los años 80 con cuatro componentes a partes iguales: 25% renta variable, 25% bonos de largo plazo, 25% oro y 25% liquidez (efectivo o bonos de corto plazo). La filosofía es que cada activo se comporta bien en uno de los cuatro escenarios económicos posibles: prosperidad, deflación, inflación o recesión. La cartera está pensada para no perder valor real significativamente en ningún escenario, sacrificando rentabilidad máxima a cambio de robustez.',
      },
      {
        q: '¿Funciona la cartera permanente para inversores españoles en 2026?',
        a: 'Sí, con adaptaciones. La cartera permanente original usa activos americanos (bonos del Tesoro USA, oro físico, S&P 500). Para un inversor español, hay que adaptar los componentes a productos UCITS disponibles: ETFs de renta variable global o eurozona, bonos europeos a largo plazo (15-30 años), ETC de oro físico domiciliado en Europa y ETFs de bonos a corto plazo o cuenta remunerada. La rentabilidad histórica real de la cartera permanente en versión española ha sido del 4-6% anual con volatilidad mucho más baja que una cartera 100% acciones.',
      },
      {
        q: '¿Cómo incluyo oro en una cartera permanente desde España?',
        a: 'La forma más eficiente es a través de un ETC físico de oro como SGLN (iShares Physical Gold ETC) o EGLN (Invesco Physical Gold ETC), ambos respaldados por oro físico custodiado en Londres. Tienen TER del 0,12-0,20% y se compran como cualquier ETF en bolsa. Alternativas: oro físico (monedas o lingotes), pero implica costes de custodia y problemas de liquidez. Los fondos de minería de oro no son sustitutos: tienen correlación con renta variable y no replican el comportamiento del metal.',
      },
      {
        q: '¿Cuál es la rentabilidad histórica de la cartera permanente?',
        a: 'La cartera permanente ha rendido históricamente entre el 4% y el 7% anual real (descontando inflación) desde los años 80, con volatilidad muy baja comparada con carteras de renta variable pura. En periodos de gran caída bursátil (2000-2002, 2008, 2022), la cartera permanente ha caído mucho menos que el MSCI World gracias al equilibrio entre los cuatro activos. En periodos alcistas largos (2010-2020), ha sido superada significativamente por carteras 100% renta variable.',
      },
      {
        q: '¿Para quién es buena la cartera permanente?',
        a: 'Es ideal para inversores que priorizan la estabilidad sobre el crecimiento máximo: jubilados o cerca de jubilación, inversores con baja tolerancia psicológica a las caídas, personas que necesitan poder retirar dinero en cualquier momento sin riesgo de vender en mal momento. No es ideal para inversores jóvenes con horizonte largo (40+ años) y alta tolerancia al riesgo: una cartera más concentrada en renta variable tendrá mayor rentabilidad esperada a costa de mayor volatilidad.',
      },
    ],
    content: `# La cartera permanente de Harry Browne adaptada al inversor español (2026)

La cartera permanente es una de las estrategias de inversión más comentadas en la comunidad de inversión particular. Diseñada por Harry Browne en los años 80, propone una asignación deliberadamente equilibrada entre cuatro activos para sobrevivir a cualquier escenario económico posible.

Esta guía cubre cómo funciona, cómo adaptarla a productos UCITS disponibles en España y para qué tipo de inversor tiene sentido frente a alternativas más concentradas en renta variable.

---

## La filosofía: cuatro activos para cuatro escenarios

Harry Browne identificó cuatro escenarios económicos posibles:

| Escenario | Activo que mejor se comporta |
|---|---|
| **Prosperidad** (crecimiento económico) | Renta variable |
| **Deflación** (caída de precios) | Bonos de largo plazo |
| **Inflación** (subida de precios) | Oro |
| **Recesión / Crisis** | Liquidez (efectivo) |

La cartera permanente asigna el 25% a cada uno. La idea: independientemente de qué escenario se materialice, al menos un componente importante de la cartera estará subiendo, compensando las pérdidas de los demás.

Es una filosofía de **diversificación entre regímenes económicos**, no solo entre activos. Esto la diferencia de una cartera 60/40 tradicional (acciones + bonos), que está optimizada para entornos de prosperidad-deflación pero sufre en estanflación.

---

## La cartera permanente original (versión americana)

| Activo | Peso | Implementación clásica |
|---|---|---|
| Renta variable | 25% | S&P 500 |
| Bonos largo plazo | 25% | Bonos del Tesoro USA 20-30 años |
| Oro | 25% | Oro físico o ETF de oro |
| Liquidez | 25% | Bonos del Tesoro USA corto plazo |

Esta versión funciona excelentemente para inversores americanos. Para un inversor español que reside en la eurozona, requiere adaptaciones.

---

## La cartera permanente para inversores españoles (UCITS)

| Activo | Peso | Implementación recomendada en España |
|---|---|---|
| Renta variable | 25% | VWCE (FTSE All-World) o IWDA (MSCI World) |
| Bonos largo plazo | 25% | IBGL (iShares Euro Govt Bond 15-30y) o equivalente |
| Oro | 25% | SGLN (iShares Physical Gold ETC) o EGLN (Invesco Physical Gold) |
| Liquidez / corto plazo | 25% | IBGS (iShares Euro Govt Bond 1-3y), cuenta remunerada o IB01 (Treasury 0-1y EUR Hedged) |

**Ventajas de esta versión española**:
- Sin riesgo divisa significativo (todos los componentes son en euros o cubiertos)
- Productos UCITS disponibles en cualquier broker europeo
- Fiscalmente eficientes para residentes en España

---

## ETFs concretos para cada componente

### Componente 1: Renta variable (25%)

**Opción A — VWCE** (Vanguard FTSE All-World UCITS ETF Acc)
- ISIN: IE00BK5BQT80
- TER: 0,19%
- Diversificación máxima global, incluye emergentes
- Acumulación

**Opción B — IWDA** (iShares Core MSCI World UCITS ETF)
- ISIN: IE00B4L5Y983
- TER: 0,20%
- Solo mercados desarrollados
- Acumulación

### Componente 2: Bonos de largo plazo (25%)

**IBGL — iShares Euro Government Bond 15-30yr UCITS ETF**
- ISIN: IE00B1FZS913
- TER: 0,20%
- Bonos gubernamentales eurozona 15-30 años
- Alta sensibilidad a tipos de interés (deseable: amplifica el efecto en deflación)

### Componente 3: Oro (25%)

**SGLN — iShares Physical Gold ETC**
- ISIN: IE00B4ND3602
- TER: 0,12%
- Respaldado por oro físico custodiado en Londres
- Sin riesgo de derivados, oro real

**Alternativa: EGLN — Invesco Physical Gold ETC**
- ISIN: IE00B579F325
- TER: 0,12%
- Mismo concepto, gestora diferente

### Componente 4: Liquidez / Bonos corto plazo (25%)

**IBGS — iShares Euro Govt Bond 1-3yr UCITS ETF**
- ISIN: IE00B14X4Q57
- TER: 0,15%
- Bonos soberanos eurozona corto plazo
- Volatilidad mínima

**Alternativa**: cuenta remunerada al 2-2,5% en Trade Republic o MyInvestor.

---

## Rentabilidad histórica de la cartera permanente

Datos aproximados de la cartera permanente (versión americana, 1972-2024):

- **Rentabilidad anual media**: 8% nominal, ~4-5% real (descontando inflación)
- **Peor año**: aproximadamente -12% (2022, año difícil para casi todos los activos)
- **Volatilidad anual**: ~8% (frente al 15-20% de una cartera 100% acciones)
- **Caída máxima histórica**: ~20% (frente al 50% del S&P 500 en 2008)

**Para la versión española**: rendimientos similares en términos de relación rentabilidad/riesgo. La menor exposición a renta variable americana ha penalizado en algunos periodos (2010-2020) pero ha favorecido en otros (años 70).

---

## Cuándo la cartera permanente brilla y cuándo no

**Periodos en los que ha funcionado excepcionalmente bien**:
- 1973-1980 (estanflación con oro disparado)
- 2000-2002 (burbuja .com, bonos y oro suben mientras renta variable cae)
- 2008-2009 (crisis financiera, bonos suben mientras renta variable cae)
- 2020 (COVID, oro y bonos amortiguan caída bursátil de marzo)

**Periodos en los que ha quedado por detrás de renta variable pura**:
- 1980-1999 (mercado alcista secular en acciones, oro lateral)
- 2010-2020 (mercado alcista en acciones, oro lateral)
- 2024-2025 (renta variable americana en máximos)

A largo plazo, una cartera 100% renta variable supera a la cartera permanente en rentabilidad, pero a costa de mayor volatilidad y caídas mucho más profundas.

---

## Rebalanceo: pieza clave de la cartera permanente

Browne recomendaba rebalancear cuando algún componente se desvía más del 35% o menos del 15% (en lugar de cada uno de los 25% objetivo). Esto permite que los movimientos pequeños del mercado no generen operaciones constantes.

**Ejemplo**: si la renta variable sube mucho y pasa del 25% al 35% del total, vendes el exceso y compras los componentes que han caído (probablemente oro o bonos). Es el rebalanceo clásico: vender alto, comprar bajo.

Para más detalles sobre cómo rebalancear de forma eficiente, lee [cómo rebalancear cartera indexada](/blog/como-rebalancear-cartera-indexada).

---

## Para quién es la cartera permanente

**Es ideal si**:
- Estás cerca de la jubilación o ya retirado
- Tu tolerancia psicológica a caídas es baja
- Necesitas poder rescatar dinero en cualquier momento sin gran impacto
- Valoras la robustez sobre la rentabilidad máxima
- Has vivido al menos una caída del 50% en bolsa y sabes que no lo soportarías de nuevo

**No es ideal si**:
- Eres joven con horizonte de 40+ años
- Tu prioridad es maximizar rentabilidad esperada
- Toleras bien la volatilidad
- Tu ahorro mensual es alto y vas a aportar durante décadas

---

## Variantes y carteras parecidas

**Cartera Golden Butterfly** (Tyler de Portfolio Charts):
- 20% renta variable total mercado
- 20% renta variable small caps value
- 20% bonos largo plazo
- 20% bonos corto plazo
- 20% oro

Es una variación que añade exposición a small caps value, históricamente con prima de rentabilidad.

**Cartera All-Weather** (Ray Dalio):
- 30% renta variable
- 40% bonos largo plazo
- 15% bonos intermedios
- 7,5% oro
- 7,5% materias primas

Otra cartera "todo terreno" con mayor peso en bonos. Útil para perfiles más conservadores que la permanente original.

---

## Fuentes y lecturas complementarias

- ["Fail-Safe Investing" — Harry Browne](https://www.amazon.com/Fail-Safe-Investing-Lifelong-Financial-Security/dp/0312263216) — Libro original donde Harry Browne expone la filosofía completa.
- [Portfolio Charts — Permanent Portfolio](https://portfoliocharts.com/portfolio/permanent-portfolio/) — Análisis histórico con datos y simulaciones de la cartera permanente.
- [iShares — SGLN](https://www.ishares.com/es/inversores-particulares/es/productos/258728/) — ETC de oro físico para implementar el componente oro de la cartera.
`,
  },
  {
    slug: 'cuanto-invertir-al-mes-jubilarse-millonario',
    title: '¿Cuánto invertir al mes para llegar al millón con interés compuesto? (2026)',
    excerpt:
      'Calcula exactamente cuánto necesitas aportar cada mes para acumular 500.000€, 1 millón o 2 millones en función de la edad a la que empiezas. Tablas, ejemplos y plan de acción.',
    publishedAt: '2026-05-24',
    readingMinutes: 9,
    keywords: ['cuanto invertir al mes', 'cuanto invertir para jubilarse', 'aportacion mensual para 1 millon', 'cuanto ahorrar al mes inversion', 'cuanto necesito invertir cada mes'],
    faq: [
      {
        q: '¿Cuánto debo invertir al mes para llegar a 1 millón de euros?',
        a: 'Depende de los años que tengas por delante y la rentabilidad anual esperada. Asumiendo un 7% anual (rentabilidad histórica del MSCI World): si tienes 25 años (40 años hasta los 65), necesitas aportar ~400€/mes. Si tienes 35 años (30 años), unos 850€/mes. Si tienes 45 años (20 años), unos 1.900€/mes. Si tienes 55 años (10 años), unos 5.800€/mes. La diferencia muestra el poder brutal del tiempo en el interés compuesto: empezar 10 años antes equivale a duplicar (o más) la aportación.',
      },
      {
        q: '¿Qué rentabilidad anual es realista para planificar?',
        a: 'Para una cartera de renta variable global indexada (MSCI World o FTSE All-World), la rentabilidad histórica nominal a largo plazo ha sido del 7-10% anual. Descontando inflación (2-3%), la rentabilidad real ha estado en el 5-7%. Para planificación realista, usa el 7% nominal como escenario base, el 5% como escenario conservador y el 10% como escenario optimista. Carteras con renta fija (60/40 o cartera permanente) tienen rentabilidades esperadas más bajas: 5-6% nominal.',
      },
      {
        q: '¿Es mejor aportar todos los meses o de golpe cuando tenga el dinero?',
        a: 'Si tienes el dinero hoy, invertirlo de golpe (lump sum) es estadísticamente superior al DCA mensual en aproximadamente 2/3 de los periodos históricos. La razón: el tiempo en el mercado supera al market timing. Sin embargo, si no tienes el dinero todavía y lo ahorras del salario, las aportaciones periódicas (DCA) son la única opción práctica y aprovechan plenamente el interés compuesto. Para más detalles, lee [DCA vs lump sum](/blog/dca-vs-lump-sum-aportar-mensual).',
      },
      {
        q: '¿Cuánto necesito acumular para vivir de mi cartera?',
        a: 'La regla del 4% sugiere que necesitas 25 veces tu gasto anual para vivir indefinidamente de la cartera. Si gastas 30.000€/año (2.500€/mes), necesitas 750.000€. Si gastas 50.000€/año, necesitas 1.250.000€. Si en España cuentas con pensión pública (digamos 1.500€/mes = 18.000€/año), tu cartera solo necesita cubrir 12.000€/año = 300.000€. La pensión pública reduce dramáticamente el capital necesario para el FIRE. Usa la [calculadora FIRE con Monte Carlo](/calculadora/fire-monte-carlo) para tu caso específico.',
      },
      {
        q: '¿Qué pasa si el mercado cae justo cuando voy a jubilarme?',
        a: 'Este es el riesgo de secuencia de retornos, uno de los más importantes en planificación. Una caída del 30-40% en los primeros años de la jubilación puede destruir un plan que en papel parecía sólido. Las defensas: aumentar progresivamente la renta fija a medida que te acercas a la jubilación (regla glide path), mantener un colchón de liquidez para 2-3 años de gastos, considerar el "bond tent" (subir bonos al máximo justo antes y después de jubilarse). La cartera permanente y la cartera 60/40 son menos vulnerables a este riesgo que una cartera 100% acciones.',
      },
    ],
    content: `# ¿Cuánto invertir al mes para llegar al millón con interés compuesto? (2026)

La pregunta más frecuente entre inversores que empiezan: "¿Cuánto necesito ahorrar cada mes para tener X dinero cuando me jubile?". La respuesta exacta depende de cuatro variables: cuánto tiempo tienes, qué rentabilidad esperas, cuánto puedes aportar y cuánto quieres acumular.

Esta guía te da tablas concretas, ejemplos numéricos y un plan de acción según tu edad y objetivo. Para cálculos personalizados, usa la [calculadora de interés compuesto](/calculadora/interes-compuesto).

---

## El motor del cálculo: interés compuesto

Antes de las tablas, recuerda la fórmula básica. Si aportas A euros al mes durante N años a una rentabilidad anual r, el patrimonio final será:

**Patrimonio final = A × ((1 + r/12)^(N × 12) − 1) / (r/12)**

Tres variables que cambian el resultado de forma exponencial:
- **Tiempo (N)**: cada año adicional añade aportaciones + crecimiento compuesto
- **Rentabilidad (r)**: pequeñas diferencias se amplifican con el tiempo
- **Aportación (A)**: lineal, pero importa cuando se combina con el tiempo

---

## Cuánto necesitas invertir al mes para llegar a 500.000€

Asumiendo rentabilidad anual del 7% (histórica del MSCI World):

| Edad inicial | Años hasta 65 | Aportación mensual necesaria |
|---|---|---|
| 25 años | 40 años | ~190€/mes |
| 30 años | 35 años | ~280€/mes |
| 35 años | 30 años | ~420€/mes |
| 40 años | 25 años | ~640€/mes |
| 45 años | 20 años | ~1.000€/mes |
| 50 años | 15 años | ~1.640€/mes |
| 55 años | 10 años | ~2.940€/mes |

---

## Cuánto necesitas invertir al mes para llegar a 1 millón de euros

Asumiendo rentabilidad anual del 7%:

| Edad inicial | Años hasta 65 | Aportación mensual necesaria |
|---|---|---|
| 25 años | 40 años | ~380€/mes |
| 30 años | 35 años | ~560€/mes |
| 35 años | 30 años | ~850€/mes |
| 40 años | 25 años | ~1.290€/mes |
| 45 años | 20 años | ~1.940€/mes |
| 50 años | 15 años | ~3.280€/mes |
| 55 años | 10 años | ~5.800€/mes |

---

## Cuánto necesitas invertir al mes para llegar a 2 millones de euros

Asumiendo rentabilidad anual del 7%:

| Edad inicial | Años hasta 65 | Aportación mensual necesaria |
|---|---|---|
| 25 años | 40 años | ~760€/mes |
| 30 años | 35 años | ~1.120€/mes |
| 35 años | 30 años | ~1.700€/mes |
| 40 años | 25 años | ~2.580€/mes |
| 45 años | 20 años | ~3.880€/mes |
| 50 años | 15 años | ~6.560€/mes |
| 55 años | 10 años | ~11.600€/mes |

---

## El impacto brutal del tiempo

Mira de cerca las tablas anteriores. Las cifras gritan una sola cosa: **el tiempo importa más que la cantidad**.

- Alguien que empieza a los 25 con 380€/mes llega al millón a los 65.
- Alguien que empieza a los 35 necesita 850€/mes — más del doble.
- Alguien que empieza a los 45 necesita 1.940€/mes — más de 5 veces.

**El coste de procrastinar 10 años**: si decides empezar con 25 años a 380€/mes y procrastinas hasta los 35, ya no llegas con 380€. Necesitas 850€ — habrás "pagado" 470€/mes extras durante 30 años, equivalente a 169.200€ de aportaciones adicionales solo por haber empezado 10 años después.

Este es el motivo por el que cualquier guía Boglehead insiste: **el peor momento para empezar es ayer; el segundo peor momento es esperar más**.

---

## ¿Y si solo puedo aportar 100€/mes? ¿Vale la pena?

Sí, absolutamente. Veamos qué consigues con 100€/mes a un 7% anual:

| Años aportando | Capital acumulado |
|---|---|
| 10 años | ~17.300€ |
| 20 años | ~52.000€ |
| 30 años | ~122.000€ |
| 40 años | ~262.000€ |
| 45 años | ~380.000€ |

Empezar a los 20 años con 100€/mes y mantener ese ritmo durante 45 años te lleva a casi 400.000€ — más que la mayoría de pensiones de la Seguridad Social capitalizadas. Y eso solo con 100€/mes.

**El mensaje**: nunca te detengas por pensar que "es poco". Lo importante es empezar y mantener.

---

## Cómo aumentar las aportaciones de forma sostenible

**1. Aumentar con la inflación / con el sueldo**
Cada vez que tu sueldo sube, aumenta proporcionalmente la aportación. Si subes 5% de sueldo, sube 5% la aportación mensual. Mantiene el porcentaje de ahorro constante y aprovecha el aumento sin notarlo.

**2. Dirigir bonos / extras automáticamente**
La paga extra, el bonus anual, el reembolso de Hacienda, los regalos de cumpleaños. Programar que una parte fija (50-100%) vaya directamente a la inversión evita la tentación de "gastármelo este año".

**3. Optimizar gastos fijos una vez al año**
Cancelar suscripciones que no usas, renegociar tarifas de telefonía y energía, comparar seguros. Cada euro ahorrado en gastos fijos se convierte en euros adicionales en aportaciones sin cambiar tu estilo de vida.

---

## El plan de acción según tu edad

**Si tienes 20-30 años**:
- Aporta entre el 15-20% de tus ingresos a inversión indexada
- Usa el plan de pensiones indexado hasta el límite de 1.500€/año por la deducción
- El resto en fondos indexados (MyInvestor) o ETFs (Trade Republic)
- Cartera: 90% renta variable global (VWCE o IWDA) + 10% renta fija

**Si tienes 30-40 años**:
- Aporta entre el 20-25% de tus ingresos
- Plan de pensiones indexado al máximo
- Fondos indexados / ETFs con cartera 80/20 (renta variable / renta fija)
- Considera abrir plan de pensiones de empleo si tu empresa lo ofrece

**Si tienes 40-50 años**:
- Aporta el 25-30% si puedes
- Optimiza fiscalidad al máximo
- Cartera 70/30 (más renta fija para reducir volatilidad)
- Empieza a planificar el rescate progresivo

**Si tienes 50+ años**:
- Aporta todo lo posible
- Cartera 60/40 o más conservadora
- Construye colchón de liquidez para los primeros años de jubilación (2-3 años de gastos)
- Planifica el rescate del plan de pensiones para minimizar IRPF

---

## La rentabilidad del 7% no es garantía

Todas las tablas asumen un 7% anual constante. La realidad: el mercado no da rentabilidades constantes. Puede dar 30% un año, -15% al siguiente, 8% el siguiente. La media a largo plazo es 7-9% nominal, pero los caminos individuales varían enormemente.

**Implicación práctica**: tu cartera podría llegar a los 65 con 500.000€ o con 1.500.000€ habiendo hecho exactamente las mismas aportaciones, dependiendo de cómo se comporten los mercados.

Para entender este riesgo y planificar con la incertidumbre real del mercado, usa la [calculadora FIRE con simulación Monte Carlo](/calculadora/fire-monte-carlo), que prueba miles de escenarios de rentabilidad variable y te da la probabilidad real de alcanzar tu objetivo.

---

## Fuentes y lecturas complementarias

- [Calculadora de interés compuesto — BogleHub](/calculadora/interes-compuesto) — Calcula tu plan personalizado con tus números reales.
- [Calculadora FIRE Monte Carlo — BogleHub](/calculadora/fire-monte-carlo) — Simula la probabilidad de alcanzar tu objetivo con volatilidad real del mercado.
- [Guía FIRE en España — BogleHub](/blog/fire-espana-cuanto-necesitas) — Cuánto capital necesitas realmente para vivir de tu cartera en España.
`,
  },
  {
    slug: 'mejores-etfs-nasdaq-100-espana',
    title: 'Mejores ETFs Nasdaq 100 UCITS para inversores en España (2026)',
    excerpt:
      'Comparativa de los mejores ETFs Nasdaq 100 disponibles en España: EQQQ, SXRV, CNDX. TER, fiscalidad, concentración tecnológica y cuándo tiene sentido incluir Nasdaq en tu cartera.',
    publishedAt: '2026-05-24',
    readingMinutes: 9,
    keywords: ['mejor ETF Nasdaq 100 España', 'EQQQ análisis', 'SXRV CNDX comparativa', 'Nasdaq 100 vs S&P 500', 'ETF tecnología España'],
    faq: [
      {
        q: '¿Cuál es el mejor ETF Nasdaq 100 para inversores en España?',
        a: 'Para la mayoría de inversores en España, EQQQ (Invesco EQQQ Nasdaq 100 UCITS ETF, ISIN IE0032077012) es la opción más popular: TER 0,30%, domiciliado en Irlanda, cotiza en múltiples bolsas europeas con buen volumen. Alternativas válidas: SXRV (iShares NASDAQ 100, TER 0,33%, acumulación) y CNDX (iShares NASDAQ 100 en LSE). EQQQ suele ser ligeramente más eficiente por su menor TER y mayor liquidez en Xetra.',
      },
      {
        q: '¿Cuál es la diferencia entre Nasdaq 100 y S&P 500?',
        a: 'El Nasdaq 100 incluye solo 100 empresas no financieras cotizadas en el Nasdaq, con peso muy alto del sector tecnológico (~50%). El S&P 500 incluye 500 empresas de cualquier sector cotizadas en NYSE o Nasdaq, con tecnología pesando ~30%. Históricamente el Nasdaq ha rendido más en mercados alcistas tecnológicos pero también ha caído más en correcciones (2000-2002 perdió ~80%, 2022 perdió ~33%). Para diversificación menos volátil, el S&P 500 es más equilibrado.',
      },
      {
        q: '¿Tiene sentido invertir en Nasdaq 100 como cartera principal?',
        a: 'Como cartera única, generalmente no. El Nasdaq 100 concentra demasiado en un solo sector (tecnología) y un solo país (EEUU), lo que va contra los principios de diversificación de la filosofía Boglehead. Como complemento a una cartera diversificada (10-20% del total), puede aportar exposición temática a empresas de mayor crecimiento. La decisión depende de tu tolerancia a la volatilidad y de tu convicción en el liderazgo tecnológico americano.',
      },
      {
        q: '¿Por qué EQQQ tiene TER del 0,30%, más alto que otros ETFs indexados?',
        a: 'El TER del 0,30% es elevado comparado con un ETF MSCI World (0,12-0,20%) o S&P 500 (0,03-0,07%). La razón principal: el índice Nasdaq 100 es propiedad de Nasdaq Inc. y la licencia que pagan las gestoras es más cara. SPDR no ofrece ETFs Nasdaq 100 UCITS por ese coste. Para reducir TER, algunos inversores combinan S&P 500 (cubre la mayoría de las grandes tecnológicas americanas a TER 0,07%) con un sesgo a tecnología vía ETFs sectoriales.',
      },
      {
        q: '¿Es Nasdaq 100 fiscalmente eficiente para inversores en España?',
        a: 'Sí. Los principales ETFs Nasdaq 100 UCITS están domiciliados en Irlanda (EQQQ: ISIN IE0032077012; SXRV: ISIN IE00B53SZB19), lo que les da acceso al convenio fiscal Irlanda-EEUU y reduce la retención sobre dividendos americanos del 30% al 15%. EQQQ es de acumulación, lo que difiere el evento fiscal hasta la venta. Es una de las opciones más eficientes fiscalmente para exposición concentrada al mercado tecnológico americano.',
      },
    ],
    content: `# Mejores ETFs Nasdaq 100 UCITS para inversores en España (2026)

El Nasdaq 100 es uno de los índices más buscados por inversores particulares en España. Concentra las 100 empresas no financieras más grandes del Nasdaq estadounidense, con un peso enorme de tecnología (~50%) y compañías como Apple, Microsoft, Nvidia, Google, Meta, Amazon, Tesla y Netflix. Esta guía analiza los mejores ETFs UCITS disponibles en España para exponerse al índice, sus costes reales y cuándo tiene sentido incluirlo en una cartera Boglehead.

---

## El Nasdaq 100 en una frase

El Nasdaq 100 es un índice de las **100 empresas no financieras más grandes cotizadas en el Nasdaq**, ponderado por capitalización ajustada (con tope para evitar concentración extrema en un solo valor). Es el índice de referencia para invertir en el sector tecnológico americano y empresas de crecimiento.

**Composición sectorial aproximada en 2026:**
- Tecnología: ~50%
- Consumo discrecional: ~15%
- Comunicación: ~15%
- Salud: ~7%
- Otros: ~13%

Las 10 mayores empresas suelen pesar 45-55% del índice: Apple, Microsoft, Nvidia, Amazon, Alphabet (Google), Meta, Tesla, Broadcom, Costco, Netflix.

---

## Los 3 mejores ETFs Nasdaq 100 disponibles en España

### 1. EQQQ — Invesco EQQQ Nasdaq 100 UCITS ETF

| Dato | Valor |
|---|---|
| ISIN | IE0032077012 |
| TER | 0,30% |
| Domicilio | Irlanda |
| Política | Distribución (hay versión Acc: EQAC) |
| Patrimonio | >7.000 M USD |

El más popular y antiguo. Cotiza en Xetra (EUR), LSE (USD) y otras bolsas europeas con buena liquidez. La versión EQQQ es de distribución; si prefieres acumulación, busca **EQAC** (mismo fondo, política de acumulación).

### 2. SXRV — iShares NASDAQ 100 UCITS ETF (Acc)

| Dato | Valor |
|---|---|
| ISIN | IE00B53SZB19 |
| TER | 0,33% |
| Domicilio | Irlanda |
| Política | Acumulación |
| Patrimonio | >4.000 M USD |

La alternativa de BlackRock. TER ligeramente superior pero misma exposición exacta. Para inversores que prefieren la marca iShares o que ya tienen el resto de la cartera con esta gestora.

### 3. CNDX — iShares NASDAQ 100 UCITS ETF (LSE)

| Dato | Valor |
|---|---|
| ISIN | IE00B53SZB19 |
| TER | 0,33% |
| Domicilio | Irlanda |
| Política | Acumulación |

Funcionalmente equivalente a SXRV (mismo ISIN), pero cotiza en la Bolsa de Londres en USD. Útil para inversores que operan principalmente en LSE.

---

## Nasdaq 100 vs S&P 500: la comparativa que importa

| | Nasdaq 100 | S&P 500 |
|---|---|---|
| Nº empresas | 100 | 500 |
| Sectores | Sin financieras | Todos |
| Peso tecnología | ~50% | ~30% |
| TER ETF UCITS | 0,30% (EQQQ) | 0,03-0,07% (SPXS, CSPX) |
| Volatilidad histórica | Alta | Moderada |
| Caída max histórica | ~80% (2000-2002) | ~50% (2008) |
| Mejor periodo reciente | 2010-2020 (gran ciclo tech) | Más estable |

**Para la mayoría de inversores indexados**, el S&P 500 es preferible como exposición americana principal por:
1. Mayor diversificación (500 vs 100 empresas)
2. TER muy inferior (0,07% vs 0,30%)
3. Menor concentración sectorial
4. Caídas históricas menos profundas

El Nasdaq 100 tiene sentido como **complemento estratégico** (10-20% del total) si quieres sobreponderar tecnología, no como cartera principal.

---

## Cuándo tiene sentido invertir en Nasdaq 100

**Sí, tiene sentido si:**
- Ya tienes una cartera global diversificada (MSCI World o FTSE All-World) y quieres añadir 10-20% de sesgo tecnológico
- Tienes alta tolerancia a la volatilidad y horizonte muy largo (20+ años)
- Quieres exposición específica a las megacompañías tecnológicas americanas
- Entiendes que el rendimiento histórico no garantiza el futuro y que el sector tech puede sufrir correcciones del 50-70%

**No, no tiene sentido si:**
- Es tu única posición de renta variable (concentración geográfica y sectorial extrema)
- No toleras psicológicamente caídas de >50%
- Estás cerca de la jubilación o necesitas el dinero en menos de 10 años
- Tu broker cobra comisiones altas en Nasdaq 100 frente a alternativas

---

## La trampa de la rentabilidad histórica reciente

Entre 2010 y 2024, el Nasdaq 100 ha superado al S&P 500 con rentabilidad anualizada del ~17% vs ~13%. Esto ha creado una narrativa de "el Nasdaq siempre gana" que no se sostiene en periodos más largos.

**Datos clave:**
- 2000-2010: el Nasdaq 100 perdió dinero acumulado en términos reales. El S&P 500 también, pero menos.
- 2000-2002 (burbuja .com): el Nasdaq 100 cayó ~80% desde el pico. Tardó 15 años en recuperar el nivel.
- 2022: el Nasdaq 100 cayó ~33%, el S&P 500 ~18%.

**Lección**: la concentración sectorial amplifica tanto las subidas como las bajadas. La rentabilidad histórica reciente no es indicativa del futuro, especialmente con valoraciones tecnológicas elevadas.

---

## Cómo construir una posición Nasdaq 100 prudente

Si decides incluir Nasdaq 100 en tu cartera, una asignación razonable:

| Activo | Peso |
|---|---|
| Renta variable global diversificada (VWCE o IWDA) | 60-70% |
| Nasdaq 100 (EQQQ o SXRV) como sesgo táctico | 10-15% |
| Renta fija global hedged EUR (AGGH) | 15-25% |

Esta cartera mantiene la diversificación como base y añade un sesgo controlado a tecnología sin convertirla en una apuesta dominante.

Para el rebalanceo: si el Nasdaq supera mucho al resto y pasa del 15% al 25% de la cartera, vende el exceso y compra los otros activos. Aprovechas las subidas exponenciales sin convertirte en hostage de la posición.

---

## Dónde comprar EQQQ en España

| Broker | Comisión por orden |
|---|---|
| Trade Republic | 0€ (planes ahorro automáticos disponibles) |
| [DEGIRO](/blog/degiro-opinion-2026) | 0,50€ + 0,004% |
| MyInvestor | 0,20€ + 0,03% |
| [XTB](/blog/xtb-opinion-2026) | 0€ hasta 100.000€/mes |

Para aportaciones recurrentes pequeñas: Trade Republic. Para órdenes grandes: cualquiera, la comisión es marginal frente al TER anual.

---

## Fuentes y lecturas complementarias

- [Invesco — Ficha técnica EQQQ](https://www.invesco.com/uk/en/etf/EQQQ.html) — Datos oficiales, composición y rentabilidad histórica del ETF.
- [Nasdaq — Composición Nasdaq 100](https://www.nasdaq.com/market-activity/quotes/nasdaq-ndx-index) — Lista completa de empresas y pesos actuales.
- [Mejores ETFs S&P 500 — BogleHub](/etfs/sp500) — Alternativas de exposición americana con menor TER y diversificación más amplia.
- [Categoría: ETFs Nasdaq 100 — BogleHub](/etfs/nasdaq-100) — El catálogo completo de ETFs Nasdaq 100 UCITS disponibles en España, con TER y grado fiscal.
`,
  },
  {
    slug: 'oro-etf-fisico-vs-mineria-espana',
    title: 'Oro físico vs ETC de oro vs ETF de mineras: cuál elegir en España (2026)',
    excerpt:
      'Las tres formas de invertir en oro desde España: oro físico, ETC de oro (SGLN, IGLN) y ETF de mineras. Fiscalidad, costes y cuál encaja en tu cartera.',
    publishedAt: '2026-05-24',
    readingMinutes: 9,
    keywords: ['oro ETC España', 'SGLN análisis', 'invertir en oro España', 'ETF oro vs físico', 'oro mineria vs ETC'],
    faq: [
      {
        q: '¿Cuál es la mejor forma de invertir en oro desde España?',
        a: 'Para la mayoría de inversores indexados, los ETC de oro físico (SGLN de iShares, IGLN o 4GLD de Xtrackers) son la opción más eficiente: replican el precio del oro spot con TER bajo (0,12-0,20%), están respaldados por lingotes custodiados en bóvedas auditadas y se compran como cualquier ETF. Más eficientes que comprar oro físico (que tiene costes de custodia, seguro y spread alto) y mejor diversificación que invertir en mineras (que tienen riesgos empresariales adicionales).',
      },
      {
        q: '¿Cómo tributa la venta de oro en España?',
        a: 'Depende del formato. Los ETC de oro (SGLN, IGLN, 4GLD) tributan igual que cualquier ETF: la ganancia patrimonial se declara en la base del ahorro del IRPF (19-28%). El oro físico también tributa como ganancia patrimonial al venderlo, sumando todas las ventas del año por encima de los 1.000€. Los ETFs de mineras también tributan como ganancias patrimoniales. En todos los casos, no hay régimen especial por ser oro.',
      },
      {
        q: '¿Es mejor invertir en oro físico o en ETC de oro?',
        a: 'Para la mayoría de inversores, el ETC es más eficiente. Ventajas del ETC: bajo coste (TER 0,12-0,20%), liquidez inmediata, sin costes de custodia ni seguro, fracciones admitidas (puedes comprar 100€ de oro). Ventajas del oro físico: posesión real (útil en escenarios catastróficos), no hay riesgo de contraparte. La elección depende de por qué quieres oro: para diversificación de cartera, ETC; para "seguro contra el colapso del sistema", oro físico.',
      },
      {
        q: '¿Qué pesa el oro en la cartera permanente de Harry Browne?',
        a: 'En la cartera permanente clásica, el oro pesa el 25% del total: 25% renta variable, 25% bonos largo plazo, 25% oro y 25% liquidez. Esta asignación está diseñada para sobrevivir a cualquier escenario económico (prosperidad, deflación, inflación, recesión). En carteras Boglehead más típicas, el oro pesa 0-10% como diversificador opcional. La filosofía Boglehead pura no incluye oro porque no genera rendimientos internos (dividendos, cupones).',
      },
      {
        q: '¿Por qué los ETFs de mineras de oro tienen comportamiento diferente al oro físico?',
        a: 'Los ETFs de mineras (como GDX o GDXJ, aunque no UCITS) invierten en acciones de empresas extractoras de oro. Su precio depende no solo del precio del oro sino también de costes de producción, gestión empresarial, geopolítica de los países donde extraen, y de los riesgos generales del mercado de renta variable. Históricamente tienen mayor volatilidad que el oro físico y mayor correlación con la renta variable global, lo que reduce su utilidad como diversificador. Si buscas exposición al precio del oro, los ETC físicos son más puros.',
      },
    ],
    content: `# Oro físico vs ETC de oro vs ETF de mineras: cuál elegir en España (2026)

El oro tiene una historia particular en la cartera de cualquier inversor. No genera dividendos ni cupones, no tiene flujo de caja interno, no "produce" nada. Y aun así, durante siglos ha sido el refugio favorito en momentos de incertidumbre y la cobertura clásica frente a la inflación. Para un inversor en España en 2026, hay tres formas principales de exponerse al oro: el metal físico, los ETC de oro físico y los ETFs de mineras. Cada uno con sus pros y contras concretos.

---

## Las tres formas de invertir en oro desde España

### 1. Oro físico (monedas y lingotes)

Compras oro real (Krugerrand, Vienna Philharmonic, Maple Leaf, lingotes de 1g a 1kg) en una tienda especializada o broker de metales preciosos. Posees el oro físicamente, lo guardas en casa o en una caja de seguridad bancaria.

**Costes típicos en España:**
- Spread compra-venta: 4-8% del precio spot
- Custodia (caja de seguridad bancaria): 50-200€/año según tamaño
- Seguro doméstico (si lo guardas en casa): coste opcional
- Pruebas de autenticidad al revender: pueden requerir ensayo

**Ventajas:**
- Posesión física real, sin riesgo de contraparte
- Privacidad (compras de menos de 1.000€ son anónimas en España)
- Liquidez universal — siempre habrá quien lo compre

**Desventajas:**
- Spread elevado en compras pequeñas
- Costes recurrentes de custodia
- Riesgo de robo o pérdida
- Difícil de fraccionar (no puedes vender 200€ de un lingote de 1kg)

### 2. ETC de oro físico (la opción más popular)

Los Exchange Traded Commodities (ETC) de oro físico están respaldados al 100% por lingotes custodiados en bóvedas auditadas regularmente. Replican el precio del oro spot con baja fricción. Para el inversor particular, su comportamiento es prácticamente idéntico al de un ETF.

**Los más populares disponibles en España:**

| ETC | ISIN | TER | Custodio |
|---|---|---|---|
| SGLN — iShares Physical Gold | IE00B4ND3602 | 0,12% | JP Morgan London |
| IGLN — iShares Physical Gold | IE00B4ND3602 | 0,12% | JP Morgan London |
| 4GLD — Xtrackers Physical Gold | DE000A1E0HR8 | 0,15% | Deutsche Bank |
| EGLN — Invesco Physical Gold | IE00B579F325 | 0,12% | JP Morgan London |

**Ventajas:**
- TER muy bajo (0,12-0,20%)
- Liquidez total (compras y vendes como cualquier ETF)
- Sin costes de custodia ni seguro
- Fracciones admitidas (puedes invertir 50€)
- Respaldo físico verificable

**Desventajas:**
- No tienes el metal físico en tu poder
- Pequeño riesgo de contraparte (custodio, emisor)
- Spread de mercado al operar

### 3. ETF de mineras de oro

Invierten en acciones de empresas extractoras de oro (Barrick Gold, Newmont, Agnico Eagle, Franco-Nevada). Su precio depende no solo del oro sino también de costes de producción, gestión empresarial y geopolítica.

**Disponibles en versión UCITS:**
- iShares Gold Producers UCITS ETF (IS0E): TER 0,55%
- VanEck Gold Miners UCITS ETF: TER 0,53%

**Ventajas:**
- Apalancamiento natural al precio del oro (suben/bajan más que el spot)
- Pueden pagar dividendos
- Sensibles a la innovación operativa de las empresas

**Desventajas:**
- Mayor volatilidad que el oro físico
- Mayor correlación con renta variable general en momentos de estrés
- Riesgos empresariales adicionales (deuda, geopolítica, costes)
- TER significativamente mayor (0,50%+)

---

## Para el inversor indexado en España: ETC de oro

Para la mayoría de inversores que siguen la filosofía Boglehead y quieren añadir oro a una cartera diversificada, los ETC de oro físico son la opción más eficiente:

- **Coste mínimo**: TER 0,12% vs 4-8% de spread del oro físico
- **Liquidez total**: compras y vendes en segundos
- **Sin costes de custodia**: el TER ya lo incluye
- **Fracciones**: puedes empezar con 50€
- **Eficiencia fiscal**: tributa como cualquier ETF, sin tratamiento especial

**Recomendación práctica**: SGLN o IGLN de iShares. Ambos respaldados por oro físico custodiado en Londres por JP Morgan, con auditorías regulares. Coste anual del 0,12%, liquidez excelente en Xetra y LSE.

---

## ¿Cuánto oro en cartera?

**Filosofía Boglehead pura**: 0%. La cartera Boglehead clásica se centra en acciones y bonos diversificados, sin commodities.

**Cartera permanente de Harry Browne**: 25%. Diseñada para sobrevivir a cualquier escenario económico, con oro como cobertura específica contra inflación y crisis sistémica.

**Cartera moderada con oro**: 5-10%. Punto intermedio para inversores que quieren la diversificación del oro sin renunciar al peso de renta variable.

| Cartera | Renta variable | Renta fija | Oro |
|---|---|---|---|
| Boglehead estándar | 80% | 20% | 0% |
| Boglehead con sesgo de oro | 75% | 18% | 7% |
| Conservadora con oro | 50% | 35% | 15% |
| Cartera permanente | 25% | 25% (largo) + 25% (corto) | 25% |

Para más detalles sobre la cartera permanente, lee la [guía completa adaptada a inversores en España](/blog/cartera-permanente-harry-browne-espana).

---

## El comportamiento histórico del oro

**Datos clave del oro 1971-2024:**
- Rentabilidad anual media: ~7-8% en USD (similar a la renta variable global pero con perfil distinto)
- Volatilidad anual: ~15-18%
- Peor año: -30% (1981)
- Mejor año: +127% (1979, en plena estanflación)

**Periodos en los que el oro brilló:**
- 1973-1980 (estanflación): +1.500% acumulado
- 2000-2011 (crisis tecnológica y financiera): +600% acumulado
- 2020 (COVID): +25% en un año

**Periodos en los que el oro fue mediocre:**
- 1981-2000 (mercado alcista bursátil): -50% acumulado en términos reales
- 2013-2018: lateral, sin progreso significativo

El oro no es un activo de rentabilidad sostenida — es un activo descorrelacionado con comportamiento diferenciado, útil para amortiguar caídas bursátiles pero con largos periodos de bajo rendimiento absoluto.

---

## Fiscalidad del oro en España

Independientemente del formato (físico, ETC, mineras), las ganancias por venta de oro tributan en la **base del ahorro del IRPF**:

| Tramo de ganancia | Tipo |
|---|---|
| Hasta 6.000€ | 19% |
| 6.000-50.000€ | 21% |
| 50.000-200.000€ | 23% |
| 200.000-300.000€ | 27% |
| Más de 300.000€ | 28% |

No hay tratamiento fiscal especial por ser oro. Las pérdidas pueden compensar ganancias del mismo año.

**Caso particular del oro físico**: ventas inferiores a 1.000€ no requieren identificación del comprador en España, pero la ganancia sigue siendo declarable. No es "oro negro" ni una forma de ocultar patrimonio: el IRPF aplica igual.

---

## Conclusión práctica

Si quieres añadir oro a tu cartera indexada como diversificador (5-15% del total), los **ETC de oro físico como SGLN o IGLN** son la mejor opción para el inversor en España: bajo coste, liquidez total, respaldo físico verificable y sin costes de custodia adicionales. Para descubrir más sobre ETFs de oro y materias primas, mira la [categoría completa de ETFs de oro](/etfs/oro).

Para profundizar en cómo integrar oro en una cartera con filosofía robust, lee la [guía de la cartera permanente adaptada a España](/blog/cartera-permanente-harry-browne-espana).

---

## Fuentes y lecturas complementarias

- [iShares — Ficha SGLN](https://www.ishares.com/es/inversores-particulares/es/productos/258728/) — Información oficial sobre el ETC de oro más popular, custodia y auditorías.
- [World Gold Council](https://www.gold.org/) — Datos oficiales sobre el mercado del oro a nivel mundial, oferta y demanda.
- [Categoría ETFs de oro — BogleHub](/etfs/oro) — Comparativa de los principales ETC de oro físico disponibles para inversores en España.
- [Categoría: ETFs de materias primas — BogleHub](/etfs/materias-primas) — Oro, materias primas amplias y otros ETC para diversificar tu cartera.
`,
  },
  {
    slug: 'msci-world-vs-msci-acwi-diferencias',
    title: 'MSCI World vs MSCI ACWI: diferencias clave para tu cartera indexada (2026)',
    excerpt:
      'MSCI World (solo desarrollados) vs MSCI ACWI (con emergentes): diferencias en composición, rentabilidad, riesgo y qué índice replicar según tu estrategia.',
    publishedAt: '2026-05-24',
    readingMinutes: 8,
    keywords: ['MSCI World vs MSCI ACWI', 'MSCI ACWI análisis', 'diferencia ACWI All-World', 'mejor índice global', 'incluir emergentes cartera'],
    faq: [
      {
        q: '¿Cuál es la diferencia entre MSCI World y MSCI ACWI?',
        a: 'MSCI World incluye unas 1.500 empresas grandes y medianas de 23 países desarrollados (EEUU, Japón, Reino Unido, Canadá, Suiza, Alemania, Francia, etc.). MSCI ACWI (All Country World Index) añade además unos 24 países emergentes (China, India, Taiwán, Corea del Sur, Brasil, México...), llegando a aproximadamente 3.000 empresas en total. ACWI es por tanto más diversificado: cubre alrededor del 85% de la capitalización bursátil mundial real, mientras que MSCI World cubre solo los desarrollados.',
      },
      {
        q: '¿Es mejor MSCI World o MSCI ACWI para una cartera indexada?',
        a: 'Para diversificación máxima global en un solo ETF, MSCI ACWI (o su equivalente FTSE All-World) es preferible: refleja el mercado real sin excluir economías importantes como China o India. Para quien quiera mayor control sobre el peso de emergentes o prefiera TER más bajo, combinar MSCI World + un ETF de emergentes por separado puede ser igual de bueno con mayor flexibilidad. Para la mayoría de inversores que empiezan, ACWI o All-World es la opción más sencilla.',
      },
      {
        q: '¿Qué peso tienen los emergentes en MSCI ACWI?',
        a: 'Los mercados emergentes pesan aproximadamente el 10-12% en MSCI ACWI (a nivel grandes y medianas empresas). En el MSCI ACWI IMI (que incluye también pequeñas) el peso es similar. China suele ser el mayor componente individual de emergentes con un 25-30% dentro del subíndice de emergentes, seguido de Taiwán, India, Corea del Sur y Brasil. Esto significa que China pesa alrededor del 3% en el índice global ACWI completo.',
      },
      {
        q: '¿Hay ETFs UCITS que repliquen MSCI ACWI disponibles en España?',
        a: 'Sí. ISAC (iShares MSCI ACWI UCITS ETF, ISIN IE00B6R52259) es el ETF UCITS más popular para replicar ACWI: TER 0,20%, acumulación, domiciliado en Irlanda. Otra alternativa es SSAC (SPDR MSCI ACWI IMI UCITS ETF, TER 0,17%) que añade también small caps. Para el inversor español, ambos son válidos. La alternativa más popular es VWCE (FTSE All-World de Vanguard), que es un índice diferente pero cubre el mismo universo con metodología similar.',
      },
      {
        q: '¿Cuál es la diferencia entre MSCI ACWI y FTSE All-World?',
        a: 'Ambos son índices "global incluyendo emergentes" muy similares en composición y rendimiento. Diferencias técnicas: MSCI ACWI excluye micro caps; FTSE All-World incluye también algunas micro caps. MSCI clasifica a Corea del Sur como emergente; FTSE la clasifica como desarrollada. Esto cambia el peso de Corea (~2% del índice global). En la práctica, los rendimientos históricos de ambos índices son prácticamente idénticos (>99% de correlación) y la elección depende más de TER y disponibilidad que del índice en sí.',
      },
    ],
    content: `# MSCI World vs MSCI ACWI: diferencias clave para tu cartera indexada (2026)

Si estás eligiendo un ETF "global" para tu cartera indexada, te habrás topado con dos índices que se mencionan constantemente: MSCI World y MSCI ACWI. Suenan parecidos, pero la diferencia es importante: incluyen o no incluyen los mercados emergentes, y eso afecta directamente a la diversificación de tu cartera.

Esta guía explica las diferencias, cuándo elegir cada uno y los ETFs disponibles para inversores en España.

---

## La diferencia fundamental en una frase

- **MSCI World** = grandes y medianas empresas de **23 países desarrollados** (EEUU, Japón, UK, Canadá, Alemania, Francia...)
- **MSCI ACWI** = MSCI World + **24 mercados emergentes** (China, India, Taiwán, Corea, Brasil...)

En cifras: MSCI World cubre ~1.500 empresas; MSCI ACWI cubre ~3.000 empresas. MSCI ACWI representa aproximadamente el 85% de la capitalización bursátil mundial real, MSCI World solo el ~70%.

---

## Composición geográfica comparada

| País / Región | MSCI World | MSCI ACWI |
|---|---|---|
| Estados Unidos | 70% | 62% |
| Japón | 6% | 5% |
| Reino Unido | 4% | 3,5% |
| Canadá | 3% | 2,7% |
| Francia / Suiza / Alemania | 3% cada uno | 2,5% cada uno |
| Otros desarrollados | 8% | 7% |
| **Emergentes (China, India, Taiwán, Corea...)** | **0%** | **~12%** |

El MSCI World concentra más en EEUU porque, al excluir emergentes, los pesos de los desarrollados se redistribuyen proporcionalmente al alza. El MSCI ACWI tiene EEUU menos peso (~62%) pero más diversificación geográfica.

---

## Composición sectorial

Ambos índices tienen pesos sectoriales muy similares porque los emergentes no cambian dramáticamente el perfil sectorial global:

| Sector | MSCI World | MSCI ACWI |
|---|---|---|
| Tecnología | ~24% | ~23% |
| Financiero | ~14% | ~15% (algo más por bancos chinos) |
| Salud | ~13% | ~12% |
| Consumo discrecional | ~11% | ~11% |
| Industrial | ~10% | ~10% |
| Otros | ~28% | ~29% |

Diferencia clave: el sector financiero pesa algo más en ACWI por el peso de bancos chinos y emergentes. La tecnología pesa ligeramente menos por el efecto de dilución.

---

## ETFs UCITS disponibles para inversores en España

### ETFs MSCI World (sin emergentes)

| Ticker | Nombre | TER | Política |
|---|---|---|---|
| IWDA | iShares Core MSCI World | 0,20% | Acumulación |
| SWRD | SPDR MSCI World | 0,12% | Acumulación |
| XDWD | Xtrackers MSCI World | 0,19% | Acumulación |
| MWRD | Lyxor Core MSCI World | 0,12% | Acumulación |

### ETFs MSCI ACWI (con emergentes)

| Ticker | Nombre | TER | Política |
|---|---|---|---|
| ISAC | iShares MSCI ACWI | 0,20% | Acumulación |
| SSAC | SPDR MSCI ACWI IMI | 0,17% | Acumulación |
| IUSQ | iShares MSCI ACWI (USD) | 0,40% | Distribución |

### Alternativa: FTSE All-World (índice equivalente)

| Ticker | Nombre | TER | Política |
|---|---|---|---|
| VWCE | Vanguard FTSE All-World | 0,19% | Acumulación |
| VWRL | Vanguard FTSE All-World | 0,19% | Distribución |

VWCE es funcionalmente equivalente a ISAC: cubre desarrollados + emergentes en un solo ETF. La diferencia es solo de metodología del índice (FTSE vs MSCI). Para más detalles sobre VWCE, lee el [análisis completo del ETF](/blog/vwce-analisis-completo).

---

## Rentabilidad histórica: ¿qué índice ha rendido más?

En los últimos 10 años (2014-2024), MSCI World ha superado a MSCI ACWI por aproximadamente 1-2% anual. La razón: los mercados emergentes han rendido por debajo de los desarrollados durante este periodo, especialmente China.

Pero los rendimientos relativos cambian por ciclos:
- **2003-2007**: emergentes rentaron muchísimo más que desarrollados → ACWI batió a World
- **2010-2024**: desarrollados (sobre todo EEUU) dominaron → World batió a ACWI
- **Próximo ciclo**: imposible de predecir

A muy largo plazo (>30 años), MSCI ACWI ha rendido similar al MSCI World, con menor concentración geográfica y mayor diversificación.

---

## Cuándo elegir MSCI World y cuándo MSCI ACWI

**Elige MSCI World (IWDA, SWRD) si:**
- Quieres TER más bajo (SWRD 0,12% vs ISAC 0,20%)
- Quieres control sobre el peso de emergentes en tu cartera (los añades por separado)
- Estás de acuerdo en sobreponderar EEUU vs el resto del mundo
- Tu cartera ya tiene exposición específica a emergentes por otro lado

**Elige MSCI ACWI (ISAC, SSAC) o FTSE All-World (VWCE) si:**
- Quieres la solución más simple: un solo ETF que cubra "todo"
- Quieres replicar fielmente el mercado global por capitalización
- No quieres preocuparte por gestionar el peso de emergentes manualmente
- Empiezas y prefieres minimizar el número de decisiones

---

## La cartera mínima con cualquiera de las dos opciones

**Con MSCI World (necesitas dos ETFs para cubrir global):**
- 88% IWDA o SWRD (MSCI World, desarrollados)
- 12% EIMI o EMIM (MSCI Emerging Markets)
- Resultado: exposición global con mayor control y TER ponderado del ~0,14%

**Con MSCI ACWI o FTSE All-World (un solo ETF):**
- 100% ISAC, SSAC o VWCE
- Resultado: exposición global automática, menos decisiones, TER 0,17-0,20%

Para la mayoría de inversores que empiezan, **la segunda opción (ACWI o All-World) es más sencilla y suficiente**. La diferencia de TER es marginal en términos absolutos.

---

## Errores frecuentes al elegir

1. **Asumir que MSCI World incluye "el mundo entero"** — solo cubre desarrollados, falta ~30% del PIB mundial
2. **Combinar MSCI World con MSCI ACWI** — solapamiento del 88%, no añade nada
3. **Combinar MSCI World con FTSE All-World** — el FTSE All-World ya incluye desarrollados, doble exposición innecesaria
4. **Excluir emergentes "porque son arriesgados"** — los emergentes ya pesan solo ~12% en ACWI, no dominan el riesgo
5. **Sobreponderar emergentes >25%** — apuesta activa significativa contra la capitalización de mercado real

---

## Conclusión práctica

Para la mayoría de inversores que empiezan en España, **un ETF MSCI ACWI o FTSE All-World** es la opción más sencilla y completa. Cubre desarrollados y emergentes en su peso natural, sin decisiones adicionales que tomar. Para más alternativas sobre ETFs globales, mira el [hub de ETFs All-World](/etfs/todo-mundo).

Si prefieres MSCI World por su TER ligeramente inferior, combínalo con un ETF de emergentes (12% del total) para tener exposición global comparable. Mira el [hub de ETFs MSCI World](/etfs/msci-world) y el [hub de ETFs emergentes](/etfs/emergentes) para los productos concretos disponibles.

---

## Fuentes y lecturas complementarias

- [MSCI — Metodología MSCI ACWI](https://www.msci.com/acwi) — Documentación oficial sobre la composición y metodología del índice.
- [MSCI — Metodología MSCI World](https://www.msci.com/world) — Documentación oficial sobre el índice de mercados desarrollados.
- [Análisis VWCE — BogleHub](/blog/vwce-analisis-completo) — El ETF FTSE All-World más popular para inversores españoles, alternativa a MSCI ACWI.
`,
  },
  {
    slug: 'como-hacer-traspaso-fondos-espana',
    title: 'Cómo hacer un traspaso de fondos en España (paso a paso)',
    excerpt:
      'El traspaso entre fondos permite cambiar de estrategia o gestora sin pagar impuestos. Guía paso a paso: qué es, cómo se hace, cuánto tarda y qué fondos lo permiten.',
    publishedAt: '2026-05-30',
    readingMinutes: 9,
    keywords: ['traspaso fondos inversión España', 'traspasar fondo sin tributar', 'traspaso fondos indexados', 'régimen diferimiento fiscal fondos', 'cómo traspasar fondos MyInvestor'],
    faq: [
      {
        q: '¿Se puede traspasar un fondo de inversión sin pagar impuestos en España?',
        a: 'Sí. Los fondos de inversión registrados en España con más de 500 partícipes disfrutan del régimen de diferimiento fiscal: al hacer un traspaso, el dinero pasa íntegro al fondo de destino y no tributas hasta el reembolso definitivo. Esta ventaja NO existe para los ETFs ni para fondos extranjeros no acogidos al régimen.',
      },
      {
        q: '¿Cuánto tarda un traspaso de fondos?',
        a: 'El plazo legal máximo es de 8 días hábiles desde que la gestora de destino acepta el traspaso. En la práctica, los traspasos entre fondos de las principales plataformas españolas (MyInvestor, Renta 4, Selfbank) suelen completarse en 3-5 días hábiles. Durante el traspaso tu dinero no está invertido en ningún fondo.',
      },
      {
        q: '¿Pueden traspasar fondos los ETFs?',
        a: 'No. Los ETFs no tienen régimen de traspaso fiscal libre en España. Vender un ETF para comprar otro siempre genera una ganancia o pérdida patrimonial que tributa ese año en la base del ahorro (19-28%). Esta es la principal diferencia fiscal entre ETFs y fondos de inversión indexados.',
      },
      {
        q: '¿Qué pasa con las pérdidas acumuladas en el fondo origen al hacer un traspaso?',
        a: 'En un traspaso, ni las ganancias ni las pérdidas acumuladas se realizan: el coste fiscal se "traslada" al fondo de destino. Cuando finalmente reembolses, la base de cálculo para el IRPF será el precio al que compraste las participaciones del fondo origen original, no el precio del fondo destino. El historial fiscal viaja contigo.',
      },
      {
        q: '¿Se puede traspasar desde un fondo con pérdidas a otro para "resetear" el coste?',
        a: 'No, el traspaso no realiza la pérdida: el precio de adquisición original se mantiene. Para materializar una pérdida fiscal hay que hacer un reembolso real (venta), no un traspaso. Ojo con la regla de los dos meses: si reembolsas con pérdida y recompras el mismo fondo en ese plazo, Hacienda anula la pérdida.',
      },
    ],
    content: `# Cómo hacer un traspaso de fondos en España (paso a paso)

El traspaso entre fondos de inversión es una de las ventajas fiscales más importantes disponibles para el inversor particular en España, y una de las más desconocidas. Permite cambiar de fondo, de estrategia o de gestora sin que la ganancia acumulada tribute ese año. El IRPF se difiere hasta que hagas el reembolso definitivo.

Esta guía explica qué es exactamente un traspaso, cómo funciona el régimen fiscal, cómo se ejecuta en las principales plataformas y qué errores evitar.

---

## Qué es un traspaso de fondos y por qué existe

Cuando vendes un ETF para comprar otro, Hacienda considera que has realizado una ganancia patrimonial y debes declararla en el IRPF del año de la venta. Con los fondos de inversión tradicionales, el legislador español estableció un régimen diferente: puedes mover el dinero de un fondo a otro sin que el cambio genere un evento fiscal.

El mecanismo legal es el **diferimiento fiscal por traspaso** (artículo 94 de la Ley del IRPF). Las condiciones:

- El fondo origen debe estar registrado en la CNMV o pertenecer a un Estado Miembro de la UE con presencia en España.
- Tanto el fondo origen como el de destino deben tener **más de 500 partícipes** (excluye fondos muy pequeños).
- El traspaso es entre el mismo tipo de vehículo: fondo a fondo. No aplica a ETFs, ni a acciones, ni a planes de pensiones (estos últimos tienen su propio régimen separado).

**Qué ocurre fiscalmente**: el precio de coste del fondo origen se "hereda" en el fondo destino. Cuando un día reembolses de verdad, la ganancia calculada será precio de venta menos precio de compra original, independientemente de cuántos traspasos hayas hecho entre medias.

---

## Cuánto tarda un traspaso

El plazo máximo legal es **8 días hábiles** contados desde que la sociedad gestora del fondo destino tramita la solicitud. En la práctica:

| Tipo de traspaso | Plazo habitual |
|---|---|
| Entre fondos de la misma gestora | 1-3 días hábiles |
| Entre fondos de distintas gestoras (misma plataforma) | 3-5 días hábiles |
| Entre plataformas distintas | 5-8 días hábiles |

**Importante**: durante el traspaso el dinero no está invertido. Si el mercado sube durante esos días, no participas. Si baja, tampoco. Para carteras grandes, considera hacer el traspaso en varias veces para no depender de un único día de precios.

---

## Cómo hacer el traspaso en las principales plataformas

### MyInvestor (la más usada para fondos indexados)

1. Accede a tu cuenta → sección **Fondos de inversión**
2. Selecciona el fondo origen → **Traspasar**
3. Elige si traspasas el importe total o parcial
4. Busca el fondo destino por ISIN o nombre
5. Confirma la operación

MyInvestor no cobra comisión de traspaso en ninguno de sus fondos. El proceso es 100% online y el estado del traspaso es visible en tiempo real.

### Renta 4

1. Área privada → Cartera → fondo origen → **Traspaso externo/interno**
2. Introduce ISIN del fondo destino
3. Especifica importe (total o parcial)
4. Confirma con coordenadas o SMS

### Selfbank / OpenBank

Proceso similar: desde la ficha del fondo, opción "Traspasar a otro fondo". Si el fondo destino no está comercializado en la plataforma, la plataforma lo gestiona igualmente si el fondo está registrado en CNMV.

---

## Traspasos entre plataformas distintas

Puedes traspasar un fondo que tienes en una plataforma (por ejemplo, Renta 4) a otra (por ejemplo, MyInvestor). El proceso lo inicia **siempre la plataforma de destino**:

1. Da de alta en la plataforma destino con los datos del fondo que quieres recibir
2. La plataforma destino contacta a la plataforma origen para solicitar el traspaso
3. La plataforma origen tiene 3 días hábiles para tramitarlo
4. El dinero llega al fondo destino sin que tú hagas nada más

**Comisión de traspaso**: algunas plataformas cobran comisión por traspasos salientes (normalmente 0-0,5% del importe). MyInvestor no cobra; otras plataformas más antiguas a veces sí. Compruébalo antes de iniciar el traspaso.

---

## El precio de adquisición "viaja" contigo

Este es el punto más importante y más confuso del régimen de traspasos.

Ejemplo: compraste participaciones de un fondo A por **10.000€** en 2019. Hoy valen **18.000€** (ganancia latente de 8.000€). Haces un traspaso al fondo B.

**Qué ocurre**: el fondo B se "activa" en tu cartera con un coste fiscal de **10.000€**, no de 18.000€. Cuando vendas el fondo B en el futuro, la ganancia que declararás será (precio de venta - 10.000€).

Esto significa que el traspaso **no resetea el reloj fiscal**. No puedes hacer un traspaso para "borrar" plusvalías latentes y empezar de cero. Las plusvalías se difieren, no desaparecen.

**Ventaja real**: las plusvalías no tributan mientras no vendas. Ese dinero que "le deberías a Hacienda" sigue generando rentabilidad dentro del fondo. A 20-30 años, el impacto compuesto es significativo.

---

## Traspaso parcial o total: cuándo elegir cada uno

**Traspaso total**: mueves toda la posición del fondo origen al destino. Recomendable cuando quieres cerrar completamente una posición y abrirla en otro fondo.

**Traspaso parcial**: mueves solo una parte (por importe o por número de participaciones). Útil para:
- Rebalancear la cartera sin vender (traspasar excedente del fondo más rentable al que ha quedado rezagado)
- Cambiar gradualmente de fondo para reducir el riesgo de coincidir con un mal día de mercado

Con el criterio FIFO, si haces traspasos parciales de un fondo que compraste en varias fechas distintas, Hacienda asumirá que traspasas las participaciones más antiguas primero.

---

## Qué fondos permiten el traspaso (y cuáles no)

**Sí permiten traspaso fiscal libre**:
- Fondos de inversión españoles registrados en CNMV con más de 500 partícipes
- Fondos domiciliados en la UE comercializados en España con más de 500 partícipes
- Fondos de Vanguard, iShares, Amundi, Fidelity disponibles en MyInvestor o Renta 4
- El Amundi Prime Global y equivalentes indexados disponibles en plataformas españolas

**NO permiten traspaso fiscal libre**:
- ETFs (aunque coticen en bolsas europeas y sean UCITS)
- Fondos con menos de 500 partícipes
- Acciones o derivados de ningún tipo
- Planes de pensiones (tienen su propio régimen, no de traspaso sino de "movilización")

---

## Cómo afecta el traspaso a la declaración de la renta

Un traspaso **no genera ninguna obligación fiscal en el año en que se hace**. No tienes que declararlo en el IRPF de ese año. Solo debes declarar cuando hagas un reembolso real con ganancia o pérdida.

Algunos brokers incluyen los traspasos en el informe fiscal anual a título informativo, pero esas operaciones tienen importación fiscal cero. El dato relevante para cuando vendas es el precio de coste original, que tu plataforma debe mantener actualizado a lo largo de todos los traspasos.

---

## Errores frecuentes

**1. Confundir traspaso con reembolso + suscripción**. Si en lugar de hacer un traspaso haces "reembolso del fondo A + suscripción al fondo B", la ganancia tributa ese año. El traspaso debe tramitarse como operación vinculada, no como dos operaciones separadas.

**2. Olvidar el plazo de los 8 días hábiles**. Si necesitas el dinero en una fecha concreta, calcula con margen. Los traspasos entre plataformas distintas pueden tardar hasta 8 días hábiles.

**3. Asumir que todos los fondos lo permiten**. Si el fondo origen tiene menos de 500 partícipes, el régimen no aplica. Algunos fondos pequeños o temáticos no cumplen este requisito.

**4. Traspasar a un ETF**. No es posible "traspasar" desde un fondo a un ETF con diferimiento fiscal. Para pasar de fondos a ETFs siempre hay que hacer reembolso (con tributación) y luego compra del ETF.

---

## El traspaso en una estrategia Boglehead

Para un inversor que construye una cartera de fondos indexados a largo plazo, el régimen de traspasos es una herramienta de gestión de cartera sin coste fiscal:

- **Rebalanceo sin tributar**: cuando la renta variable sobrepasa tu asignación objetivo, traspasas parte al fondo de renta fija sin tributar por la plusvalía.
- **Cambio de estrategia sin coste**: si decides pasar de un fondo MSCI World a un All-World (que incluye emergentes), lo haces con traspaso sin consecuencias fiscales.
- **Consolidación de carteras**: si tienes fondos en varias plataformas, puedes consolidarlos en una sola plataforma con traspasos entre plataformas.

La comparación con los ETFs en términos de flexibilidad fiscal es clara: para una cartera de fondos indexados que vayas a mantener y rebalancear durante décadas, el régimen de traspasos puede valer varios miles de euros en impuestos diferidos. La calculadora de [interés compuesto](/calculadora/interes-compuesto) te puede ayudar a cuantificar el impacto de diferir impuestos sobre la rentabilidad total.

---

## Fuentes y lecturas complementarias

- [AEAT — Art. 94 LIRPF: traspaso de fondos](https://www.agenciatributaria.es) — Base legal del régimen de diferimiento fiscal para fondos de inversión en España.
- [CNMV — Registro de fondos](https://www.cnmv.es) — Comprueba si un fondo está registrado en España y puede beneficiarse del régimen de traspaso.
- [Fondos indexados vs ETFs en España — BogleHub](/blog/fondos-indexados-vs-etfs-espana) — Comparativa completa entre fondos y ETFs, incluyendo el impacto fiscal del régimen de traspasos.
- [Glosario: traspaso de fondos — BogleHub](/glosario/traspaso) — Definición y ejemplo numérico del régimen de diferimiento fiscal.
`,
  },
  {
    slug: 'degiro-opinion-2026',
    title: 'DEGIRO: opinión y análisis completo 2026',
    excerpt:
      'Análisis honesto de DEGIRO en 2026: comisiones reales, acceso a 50+ bolsas, cuenta Custody vs básica, seguridad y para qué tipo de inversor tiene más sentido este broker holandés.',
    publishedAt: '2026-05-30',
    readingMinutes: 9,
    keywords: ['DEGIRO opinión', 'DEGIRO seguridad', 'DEGIRO comisiones 2026', 'DEGIRO ETFs España', 'DEGIRO vs Trade Republic'],
    faq: [
      {
        q: '¿Es seguro DEGIRO para invertir en España?',
        a: 'Sí. DEGIRO está regulado por la AFM holandesa y desde 2021 es subsidiaria de flatexDEGIRO Bank AG, supervisado por el BaFin alemán. Los activos se custodian separados del balance del broker. El Fondo de Garantía de Inversiones holandés (IFD) cubre hasta 20.000€ en caso de insolvencia del broker. Para máxima segregación, elige la cuenta Custody en lugar de la cuenta básica.',
      },
      {
        q: '¿Qué comisiones cobra DEGIRO por comprar ETFs en España?',
        a: 'La comisión estándar en bolsas europeas (Euronext, Xetra) es 0,50€ + 0,004% del importe, con un mínimo de 0,90€. Para ETFs de la lista gratuita mensual, DEGIRO permite una operación al mes sin comisión de compra (con restricciones). Por encima de importes de unos 12.500€ por orden, la comisión variable supera a la de otros brokers, así que para órdenes grandes conviene calcular primero.',
      },
      {
        q: '¿Cuál es la diferencia entre la cuenta básica y la Custody en DEGIRO?',
        a: 'En la cuenta básica, DEGIRO puede prestar tus valores a terceros a cambio de una pequeña compensación (préstamo de valores). En la cuenta Custody, los valores están en cuentas segregadas y no se prestan. La cuenta Custody tiene comisiones algo más altas pero para inversores indexados a largo plazo la diferencia es marginal. Si te preocupa la segregación de activos, elige Custody.',
      },
      {
        q: '¿DEGIRO tiene cuenta remunerada?',
        a: 'No. DEGIRO no remunera el saldo en euros en cuenta. Si tienes liquidez esperando ser invertida, considera moverla a una cuenta corriente remunerada (Trade Republic, MyInvestor) mientras decides qué comprar.',
      },
      {
        q: '¿Para quién es mejor DEGIRO que Trade Republic?',
        a: 'DEGIRO tiene ventaja cuando: necesitas acceso a mercados que Trade Republic no cubre (bolsas asiáticas, mercados emergentes locales), quieres tipos de órdenes avanzadas (stop-loss, órdenes límite complejas), o tu cartera supera los 100.000€ y quieres más control. Para la mayoría de inversores Boglehead con aportaciones mensuales regulares, Trade Republic (0€ y planes de ahorro automáticos) es más cómodo.',
      },
    ],
    content: `# DEGIRO: opinión y análisis completo 2026

DEGIRO fue el broker que rompió las comisiones altas en Europa. Cuando llegó en 2008 desde Países Bajos, comprar acciones o ETFs en España costaba 10-25€ por operación en los bancos tradicionales. DEGIRO ofreció 0,50€. Cambió el mercado.

Hoy, con Trade Republic en 0€ y XTB también sin comisión hasta cierto umbral, DEGIRO ya no es el más barato para todos los perfiles. Pero sigue siendo el mejor en algo concreto: acceso a mercados internacionales y a activos específicos no disponibles en brokers más sencillos. Esta guía explica qué hace bien, dónde se queda corto y para quién sigue siendo la mejor opción.

---

## Quién es DEGIRO

DEGIRO fue fundado en 2008 en Ámsterdam por ex-empleados del banco holandés Binck. En 2021, fue adquirido por flatexDEGIRO Bank AG, un banco alemán regulado por el BaFin y el Deutsche Bundesbank. Esta integración convirtió a DEGIRO en parte de un banco real, añadiendo una capa de robustez regulatoria adicional a la supervisión original de la AFM (Autoriteit Financiële Markten, el regulador de mercados holandés).

**La propuesta de valor de DEGIRO es distinta a la de Trade Republic**:

- Trade Republic es para el inversor que quiere simplicidad: un solo broker, DCA automático, sin complicaciones.
- DEGIRO es para quien necesita amplitud: más mercados, más instrumentos, más tipos de órdenes.

---

## Comisiones: lo que pagas de verdad

**Compra y venta de ETFs (bolsas europeas principales)**:
- 0,50€ + 0,004% del importe
- Mínimo 0,90€ por operación

Para una orden de 500€, pagas 0,52€. Para 5.000€, pagas 0,70€. Para 50.000€, pagas 2,50€.

**Comparación directa con competidores**:

| Importe de orden | DEGIRO | Trade Republic | MyInvestor |
|---|---|---|---|
| 100€ | 0,90€ | 0€ | 0,23€ |
| 500€ | 0,52€ | 0€ | 0,35€ |
| 2.000€ | 0,58€ | 0€ | 1,00€ |
| 10.000€ | 0,90€ | 0€ | 3,20€ |

Trade Republic gana en comisiones puras para cualquier importe. ¿Por qué alguien elegiría DEGIRO? Por lo que ofrece que Trade Republic no tiene.

**ETFs con 0€ de comisión**: DEGIRO mantiene una lista mensual de ETFs por los que no cobra comisión de compra (una operación gratuita al mes por ETF). La lista cambia cada mes y tiene restricciones, así que no te fíes de ella como fuente principal de ahorro. Verifica siempre en la web oficial antes de operar.

---

## Los 50+ bolsas: la gran ventaja

DEGIRO conecta a 50+ bolsas mundiales. La lista incluye:

- Euronext (Ámsterdam, Bruselas, París, Lisboa)
- Xetra (Alemania)
- LSE (Londres)
- NYSE y NASDAQ (EE.UU.)
- Tokyo Stock Exchange (Japón)
- Hong Kong Exchange
- Australian Securities Exchange
- Bolsas de Singapur, Corea, India y muchas más

Para el inversor indexado con una cartera de VWCE y AGGH, esto es irrelevante: esos ETFs están en Euronext y Xetra. Pero si quieres acceder a ETFs concretos no disponibles en Trade Republic, DEGIRO abre puertas.

---

## Seguridad: cuenta básica vs cuenta Custody

Este es el punto que más debate genera sobre DEGIRO y merece explicación clara.

**Cuenta básica**: DEGIRO puede prestar tus valores a terceros (préstamo de valores). A cambio, recibes una pequeña compensación. El riesgo teórico: si el prestatario quiebra, podría haber demora en devolver tus activos. En la práctica, DEGIRO cubre este riesgo con colateral, pero introduce una capa de complejidad que muchos inversores prefieren evitar.

**Cuenta Custody**: los valores están en cuentas segregadas y NO se prestan. Es el equivalente a "tus activos son exactamente tuyos, sin préstamos terceros". Las comisiones de custodia son algo más altas, pero para carteras a largo plazo la diferencia es pequeña.

**Recomendación**: si abres DEGIRO, elige Custody. La diferencia de coste es marginal para el inversor indexado a largo plazo, y la segregación es más limpia.

**¿Es seguro DEGIRO?** Sí. La combinación de regulación AFM (Países Bajos) + BaFin (Alemania, vía flatexDEGIRO Bank AG) + segregación de activos + Fondo de Garantía de Inversiones holandés (20.000€) crea una protección sólida. La cobertura de 20.000€ es inferior a la de Trade Republic (100.000€ vía ESIF) o MyInvestor (100.000€ vía FGD), pero para la mayoría de inversores particulares con carteras en fase de construcción, el riesgo práctico es muy bajo.

---

## Sin planes de ahorro automáticos

Esta es la limitación más importante para el inversor Boglehead que quiere automatizar el DCA mensual. **DEGIRO no tiene planes de ahorro automáticos**: no puedes programar una compra mensual de VWCE el día 1 de cada mes. Cada compra requiere que entres manualmente, pongas la orden y la ejecutes.

Para quien lleva una cartera grande con aportaciones esporádicas, esto es irrelevante. Para quien quiere aportar 200€ al mes sin pensar, Trade Republic es claramente superior en este aspecto.

---

## Sin cuenta remunerada

DEGIRO no remunera el saldo en euros en cuenta corriente. Si tienes 5.000€ en liquidez esperando invertir, no genera nada en DEGIRO. Trade Republic remunera al ~2-2,5% TAE sin condiciones; MyInvestor al 2% TAE el primer año.

---

## Tipos de órdenes avanzadas

Para el inversor técnico, DEGIRO ofrece:
- Órdenes límite (comprar/vender a un precio máximo/mínimo)
- Órdenes stop (se activan al alcanzar un precio)
- Órdenes stop-limit
- Órdenes GTC (Good Till Cancelled)
- Órdenes IOC (Immediate or Cancel)

Trade Republic solo permite órdenes de mercado y stop básicas. Para quien gestiona una cartera compleja con varios activos, DEGIRO es más profesional.

---

## Para quién es DEGIRO la mejor opción

**Elige DEGIRO si:**
- Tu cartera supera los 100.000€ y quieres diversificación de broker (no tenerlo todo en Trade Republic)
- Necesitas acceso a ETFs o acciones de mercados no disponibles en Trade Republic (Japón, Corea, ETFs nicho)
- Quieres tipos de órdenes avanzadas (stop-loss, órdenes límite para entradas específicas)
- Ya tienes una cartera grande y las comisiones fijas de 0,90€ te importan menos

**No elijas DEGIRO si:**
- Quieres aportaciones automáticas mensuales sin intervención
- Empiezas con menos de 200€/mes (la comisión de 0,90€ es más cara relativamente)
- Quieres fondos indexados con traspaso fiscal (DEGIRO no los ofrece)
- Buscas la cuenta remunerada más alta del mercado

---

## DEGIRO en una estrategia Boglehead combinada

Muchos inversores españoles con carteras ya consolidadas optan por dividir entre dos brokers:

- **Trade Republic**: para las aportaciones mensuales automáticas de DCA (0€, automático, simple)
- **DEGIRO**: para operaciones puntuales en activos específicos o cuando quieren diversificar el riesgo de contrapartida

El truco es que DEGIRO, al cobrar 0,90€ mínimo, solo merece la pena para órdenes de más de 1.000€ (donde la comisión relativa cae por debajo del 0,1%). Para aportaciones pequeñas, Trade Republic gana sin discusión.

Para una comparativa numérica detallada del coste anual de cada broker según tu patrón de inversión, usa el [comparador de brókers de BogleHub](/calculadora/comparar-brokers).

---

## Fuentes y lecturas complementarias

- [DEGIRO — Tarifas oficiales 2026](https://www.degiro.es/tarifas) — Verifica las comisiones actuales antes de operar, pueden cambiar.
- [AFM — Registro de entidades](https://www.afm.nl) — Verifica el registro de DEGIRO como empresa de inversión supervisada en Países Bajos.
- [BaFin — Registro de flatexDEGIRO Bank AG](https://www.bafin.de) — Supervisión bancaria de la matriz de DEGIRO.
- [DEGIRO vs Trade Republic vs MyInvestor — BogleHub](/blog/degiro-vs-trade-republic-vs-myinvestor-2026) — Comparativa detallada de los tres brokers más usados por inversores indexados en España.
`,
  },
  {
    slug: 'xtb-opinion-2026',
    title: 'XTB: opinión y análisis completo para inversores en España (2026)',
    excerpt:
      'XTB cobra 0€ en ETFs hasta 100.000€/mes, regulado por la CNMV y con una cuenta remunerada de las más altas. Comisiones, seguridad y para quién encaja.',
    publishedAt: '2026-05-30',
    readingMinutes: 8,
    keywords: ['XTB opinión', 'XTB seguridad', 'XTB ETFs España 2026', 'XTB cuenta remunerada', 'XTB vs Trade Republic'],
    faq: [
      {
        q: '¿Es seguro XTB para invertir en España?',
        a: 'Sí. XTB tiene sucursal regulada por la CNMV en España, cotiza en la Bolsa de Varsovia (empresa pública) y los activos de clientes están segregados del balance del broker. El Fondo de Garantía de Inversiones polaco cubre hasta 20.000€. La supervisión directa de la CNMV es una ventaja importante para inversores que prefieren regulador español.',
      },
      {
        q: '¿XTB cobra comisión por comprar ETFs?',
        a: '0€ hasta 100.000€ de volumen mensual en ETFs. Por encima de ese umbral, cobra 0,2% del importe con un mínimo de 10€ por operación. Para el inversor particular que aporta mensualmente unos cientos o pocos miles de euros, XTB equivale en la práctica a 0€ de comisión.',
      },
      {
        q: '¿Cuál es la cuenta remunerada de XTB en 2026?',
        a: 'La cuenta remunerada de XTB en euros suele estar en torno al 3% TAE en 2026, una de las más altas del mercado europeo de brokers. Las condiciones específicas (saldo máximo, requisitos) cambian periódicamente; verifica siempre las condiciones actuales en la web oficial antes de abrir cuenta.',
      },
      {
        q: '¿XTB ofrece planes de ahorro automáticos como Trade Republic?',
        a: 'Sí. XTB tiene planes de inversión automáticos (denominados "planes de inversión") desde 15€ al mes. Permiten programar compras periódicas en ETFs. La automatización es similar a Trade Republic, aunque la plataforma es algo más técnica.',
      },
      {
        q: '¿Para quién es mejor XTB que Trade Republic?',
        a: 'XTB puede tener ventaja cuando: quieres regulación directa de la CNMV española, buscas la cuenta remunerada más alta del mercado, ya usas o necesitas CFDs o forex y quieres tenerlo todo en una plataforma, o prefieres una plataforma más completa (xStation) con más herramientas de análisis. Para inversión indexada pura con aportaciones pequeñas, Trade Republic es más sencillo.',
      },
    ],
    content: `# XTB: opinión y análisis completo para inversores en España (2026)

XTB es uno de los brokers con mayor crecimiento en España en los últimos años. Fundado en Polonia en 2002, cotiza en la Bolsa de Varsovia (empresa pública, con obligación de transparencia financiera) y tiene sucursal directamente supervisada por la CNMV en España. Su propuesta para el inversor indexado: 0€ de comisión en ETFs hasta 100.000€ de volumen mensual y una de las cuentas remuneradas más altas del mercado europeo.

---

## Quién es XTB

XTB S.A. tiene su sede en Varsovia, cotiza en la Bolsa de Varsovia desde 2016 y está regulado por la Comisión de Valores Mobiliarios de Polonia (KNF). En España, la sucursal XTB S.A. sucursal en España está supervisada directamente por la **CNMV**, lo que significa que el regulador español tiene jurisdicción directa sobre la operativa en España.

Esto es diferente a DEGIRO (regulación holandesa) o Trade Republic (regulación alemana). Para inversores que prefieren tener a la CNMV como regulador de referencia, XTB es una de las pocas opciones con 0€ en ETFs.

XTB ofrece acceso a:
- ETFs (más de 350 ETFs UCITS disponibles)
- Acciones de más de 3.000 empresas
- CFDs sobre índices, materias primas, forex y criptomonedas
- Cuenta de inversión tradicional

**Importante**: los CFDs son productos de alto riesgo, sin nada que ver con la inversión indexada. Este análisis se centra en el uso de XTB para ETFs e inversión a largo plazo.

---

## Comisiones para ETFs

**0€ hasta 100.000€ de volumen mensual.**

Esta es la propuesta principal: si tus compras de ETFs en un mes no superan los 100.000€, no pagas comisión de compra. Para el inversor particular que aporta 200, 500 o 2.000€ al mes, esto equivale en la práctica a 0€ todo el año.

Por encima de 100.000€ de volumen mensual, la comisión es del 0,2% del importe (mínimo 10€ por operación).

**Comparación práctica:**

| Importe de orden | XTB | Trade Republic | DEGIRO |
|---|---|---|---|
| 200€ | 0€ | 0€ | 0,90€ |
| 1.000€ | 0€ | 0€ | 0,54€ |
| 5.000€ | 0€ | 0€ | 0,70€ |
| 50.000€ | 0€ | 0€ | 2,50€ |

Para la mayoría de inversores particulares, XTB y Trade Republic empatan en comisiones a 0€.

---

## La cuenta remunerada: una de las más altas del mercado

En 2026, XTB ofrece una cuenta de ahorro en euros con **~3% TAE**, sin condiciones de nómina ni domiciliación. Las condiciones específicas cambian con la política del BCE, así que verifica siempre la tasa vigente en la web oficial antes de tomar decisiones.

Esta tasa supera generalmente a la de Trade Republic (~2-2,5% TAE) y a la de MyInvestor (~2% TAE el primer año con condiciones). Para quien tiene liquidez que no quiere invertir aún, esta diferencia puede ser relevante.

---

## Planes de inversión automáticos

XTB tiene **planes de inversión periódicos** desde 15€ al mes en ETFs. Puedes programar compras automáticas con la frecuencia que elijas, similar a los planes de ahorro de Trade Republic.

La automatización cubre la mayoría de ETFs UCITS disponibles en la plataforma. Para el inversor Boglehead que quiere implementar DCA mensual sin intervenir, XTB permite hacerlo.

---

## La plataforma xStation

XTB usa xStation como plataforma propia, disponible en web y en app. Es más completa que la app de Trade Republic (que es deliberadamente simple), con:
- Pantallas personalizables
- Indicadores técnicos (más relevantes para traders que para inversores indexados)
- Noticias financieras integradas
- Calendario económico

Para el inversor indexado puro que busca simplicidad, xStation tiene más funciones de las que necesita. Para quien combina ETFs con otros productos (acciones directas, análisis), es más versátil.

---

## Seguridad

**Regulación**: sucursal española supervisada por CNMV. La empresa matriz XTB S.A. está regulada por KNF en Polonia.

**Cotización bursátil**: XTB cotiza en la Bolsa de Varsovia, lo que implica obligaciones de transparencia y auditoría propias de una empresa pública.

**Segregación de activos**: los activos de clientes están separados del balance de XTB. En caso de insolvencia del broker, los activos no forman parte de la masa concursal.

**Fondo de Garantía**: el Fondo de Garantía de Inversiones polaco cubre hasta 20.000€ por cliente (mismo nivel que DEGIRO, inferior a Trade Republic con 100.000€ y MyInvestor con 100.000€).

---

## XTB vs Trade Republic: cómo elegir

| Característica | XTB | Trade Republic |
|---|---|---|
| Comisión ETFs | 0€ (hasta 100k€/mes) | 0€ (sin límite) |
| Planes de ahorro automáticos | ✓ (desde 15€) | ✓ (desde 1€) |
| Cuenta remunerada | ~3% TAE | ~2-2,5% TAE |
| Regulador en España | CNMV (directo) | BaFin Alemania |
| Fondo de garantía | 20.000€ (KNF Polonia) | 100.000€ (ESIF EU) |
| Fondos indexados | ✗ | ✗ |
| Plataforma | xStation (más completa) | App simple (más fácil) |
| Acceso a mercados | Amplio (acciones, ETFs, CFDs) | ETFs y acciones europeas/US |

**Elige XTB si:**
- La regulación directa de CNMV en España es importante para ti
- Quieres la cuenta remunerada más alta del mercado
- Ya usas o te interesan CFDs/forex y quieres una sola plataforma
- Prefieres una plataforma con más herramientas de análisis

**Elige Trade Republic si:**
- Quieres la máxima simplicidad y la app más intuitiva
- Priorizas la mayor cobertura del fondo de garantía (100.000€)
- Quieres planes de ahorro desde 1€ (XTB requiere mínimo 15€)

---

## Limitaciones de XTB para el inversor indexado

**No ofrece fondos indexados**: igual que Trade Republic, XTB solo tiene ETFs. Si quieres aprovechar el [traspaso fiscal entre fondos](/blog/como-hacer-traspaso-fondos-espana), necesitas MyInvestor.

**La plataforma puede ser confusa para principiantes**: los CFDs y los derivados aparecen en la misma interfaz que los ETFs. Es fácil confundirse y comprar el CFD de un índice en lugar del ETF equivalente. Asegúrate de comprar siempre en la sección ETFs, no CFDs.

**El límite de 100.000€/mes**: para la mayoría de inversores es irrelevante. Pero si inviertes grandes sumas esporádicas (herencia, bonus), las operaciones que superen ese umbral mensual ya tienen comisión.

---

## Conclusión práctica

XTB es una opción sólida para el inversor indexado en España, especialmente si valoras la supervisión directa de la CNMV, la cuenta remunerada alta o la plataforma más completa. La propuesta de 0€ en ETFs hasta 100.000€/mes y los planes de inversión automáticos cubren las necesidades del inversor Boglehead de largo plazo.

Para comparar XTB con los otros brokers populares según tu patrón real de inversión, usa el [comparador de brókers de BogleHub](/calculadora/comparar-brokers).

---

## Fuentes y lecturas complementarias

- [XTB — Web oficial para España](https://www.xtb.com/es) — Comisiones actualizadas, plataforma y condiciones de la cuenta remunerada.
- [CNMV — Registro de XTB en España](https://www.cnmv.es) — Verifica el registro de la sucursal española de XTB como empresa de servicios de inversión supervisada por la CNMV.
- [DEGIRO opinión 2026 — BogleHub](/blog/degiro-opinion-2026) — Análisis de DEGIRO, el broker técnico con acceso a 50+ bolsas y su diferencia con XTB.
- [DEGIRO vs Trade Republic vs MyInvestor — BogleHub](/blog/degiro-vs-trade-republic-vs-myinvestor-2026) — Comparativa completa de los tres brokers más usados por inversores indexados.
`,
  },
  {
    slug: 'scalable-capital-opinion-2026',
    title: 'Scalable Capital: opinión y análisis para inversores en España (2026)',
    excerpt:
      'Scalable Capital ofrece 0€ en ETFs con el plan Prime, cuenta remunerada hasta el 4% TAE y regulación BaFin. Cuándo compensa frente a Trade Republic o DEGIRO.',
    publishedAt: '2026-05-30',
    readingMinutes: 7,
    keywords: ['Scalable Capital opinión', 'Scalable Capital España', 'Scalable Capital Prime', 'Scalable Capital ETFs 2026', 'Scalable Capital vs Trade Republic'],
    faq: [
      {
        q: '¿Vale la pena el plan Prime de Scalable Capital?',
        a: 'Depende del volumen de operaciones y del saldo en cuenta. Si haces varias operaciones al mes y tienes más de 10.000-20.000€ en cuenta remunerada al 4%, el ahorro en comisiones y los intereses pueden compensar la suscripción mensual (~4,99€). Para una única aportación mensual de unos cientos de euros, Trade Republic sin suscripción es más sencillo y barato.',
      },
      {
        q: '¿Es seguro Scalable Capital?',
        a: 'Sí. Scalable Capital es un neobanco alemán con licencia bancaria completa, regulado por el BaFin (el regulador alemán de mercados financieros). Los depósitos en euros hasta 100.000€ están cubiertos por el Fondo de Garantía de Depósitos alemán. Las inversiones (ETFs, acciones) están custodiadas como patrimonio separado del broker hasta 20.000€ adicionales por el Fondo de Garantía de Inversiones alemán.',
      },
      {
        q: '¿Cuánto rinde la cuenta remunerada de Scalable Capital?',
        a: 'Con el plan Prime, Scalable Capital ofrecía hasta el 4% TAE en 2026, una de las tasas más altas del mercado europeo. Sin plan Prime, la tasa es inferior. Las condiciones varían con la política del BCE; verifica la tasa vigente en la web oficial antes de abrir cuenta.',
      },
      {
        q: '¿Scalable Capital tiene planes de ahorro automáticos?',
        a: 'Sí, Scalable Capital tiene planes de inversión periódicos (Sparplan) en ETFs disponibles en España. Con el plan Prime, los planes de ahorro no tienen comisión adicional. Sin Prime, puede haber comisión de 0,99€ por ejecución del plan.',
      },
      {
        q: '¿Scalable Capital vs Trade Republic: cuál elegir?',
        a: 'Trade Republic: más simple, 0€ sin suscripción, ideal para aportación mensual única pequeña. Scalable Capital Prime: tiene sentido si combinas operaciones frecuentes (más de 5 al mes) con saldo alto en cuenta remunerada (>15.000€). Ambos son seguros, alemanes y regulados por BaFin.',
      },
    ],
    content: `# Scalable Capital: opinión y análisis para inversores en España (2026)

Scalable Capital es quizás el broker europeo menos conocido entre los inversores indexados españoles, pero merece atención: es el único con un modelo de suscripción mensual que puede hacer que las comisiones por ETFs desaparezcan por completo, y ofrece una de las cuentas remuneradas más altas del mercado. Fundado en Múnich en 2014, tiene licencia bancaria alemana completa y está disponible en España.

---

## Quién es Scalable Capital

Scalable Capital nació como roboadvisor antes de evolucionar a broker. Hoy ofrece ambos servicios. La empresa está regulada por el BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht), el regulador financiero alemán, y tiene licencia bancaria completa — igual que Trade Republic. Está disponible en Alemania, Austria, Francia, Italia, España y otros países de la UE.

Su diferencia más notable frente a Trade Republic o DEGIRO es el modelo de precios: en lugar de cobrar por operación, ofrece **planes de suscripción mensual** que dan acceso a operaciones ilimitadas.

---

## El modelo de suscripción: plan gratuito vs plan Prime

**Plan gratuito (Free)**:
- Compra y venta de ETFs: **0,99€ por operación**
- Cuenta remunerada: tipo más bajo
- Planes de ahorro en ETFs: 0,99€ por ejecución

**Plan Prime** (~4,99€/mes, verificar precio vigente en web):
- Compra y venta de ETFs: **0€** (ilimitadas)
- Cuenta remunerada: hasta el 4% TAE
- Planes de ahorro en ETFs: 0€

### ¿Cuándo compensa el plan Prime?

El break-even del plan Prime depende de cuántas operaciones hagas y cuánto tengas en cuenta remunerada.

**Por operaciones**: si haces más de 5 compras al mes, el plan Prime ya ahorra dinero: 5 × 0,99€ = 4,95€ de comisiones frente a 4,99€ de suscripción.

**Por cuenta remunerada**: si tienes 15.000€ en cuenta al 4% TAE frente al 2% de Trade Republic, la diferencia de intereses es 300€/año (25€/mes) — muy por encima del coste de la suscripción. Para saldos grandes, el Prime se amortiza solo.

**Conclusión práctica**:

| Perfil | Veredicto |
|---|---|
| Aportación mensual única pequeña (<500€) | Trade Republic más sencillo |
| 5+ operaciones al mes | Prime puede compensar |
| >15.000€ en cuenta remunerada | Prime compensa por intereses |
| Aportación mensual + saldo alto | Prime claramente ganador |

---

## Cuenta remunerada: la más alta del mercado

Con el plan Prime, Scalable Capital ofrece hasta el **4% TAE** sobre el saldo en cuenta en euros (tipo variable, ligado a la política del BCE). Esta tasa supera a Trade Republic (~2-2,5%) y a MyInvestor (~2% TAE el primer año con condiciones).

La cuenta remunerada de Scalable Capital no tiene límite de saldo remunerado, lo que la hace especialmente interesante para inversores con liquidez alta entre operaciones.

Verificar siempre la tasa vigente en la web oficial — cambia con las decisiones del BCE.

---

## Planes de ahorro automáticos

Scalable Capital tiene **Sparplans** (planes de ahorro periódicos) disponibles en España sobre más de 2.500 ETFs. Con el plan Prime, la ejecución de estos planes no tiene comisión adicional. Sin Prime, cada ejecución cuesta 0,99€.

Para el inversor indexado que quiere DCA mensual automático con plan Prime, Scalable Capital es una alternativa sólida a Trade Republic.

---

## Seguridad

**Regulación**: BaFin alemán — mismo regulador que Trade Republic, uno de los más exigentes de Europa.

**Licencia bancaria completa**: Scalable Capital obtuvo licencia bancaria en 2021. Los depósitos están cubiertos por el Fondo de Garantía de Depósitos alemán hasta **100.000€** (igual que Trade Republic, más que DEGIRO con 20.000€ y mejor que la media).

**Inversiones**: custodiadas como patrimonio separado del banco, cubierto por el Fondo de Garantía de Inversiones hasta 20.000€ adicionales.

---

## Limitaciones

**Sin fondos indexados**: igual que Trade Republic y DEGIRO, Scalable Capital solo ofrece ETFs. No puedes comprar fondos con [traspaso fiscal libre entre fondos](/blog/como-hacer-traspaso-fondos-espana) como en MyInvestor.

**El coste del plan Prime hay que ganarlo**: si no operas con frecuencia ni tienes saldo alto, el plan Free con 0,99€ por operación no es competitivo con Trade Republic (0€ siempre).

**Menos conocido en España**: la comunidad Boglehead española habla más de Trade Republic, MyInvestor y DEGIRO. El soporte y la documentación en español son más limitados.

---

## Scalable Capital vs Trade Republic: la decisión práctica

Si tienes que elegir entre los dos brokers alemanes regulados por BaFin:

- **Trade Republic**: elige si quieres simplicidad máxima, operaciones siempre a 0€ sin suscripción y cuenta remunerada sin condiciones. Ideal para aportaciones pequeñas y periódicas sin más.
- **Scalable Prime**: elige si haces varias operaciones al mes, tienes saldo considerable en cuenta remunerada o quieres la tasa de interés más alta del mercado.

Para ver el coste real de cada broker con tus datos concretos, usa el [comparador de brókers de BogleHub](/calculadora/comparar-brokers).

---

## Fuentes y lecturas complementarias

- [Scalable Capital — Web oficial España](https://es.scalable.capital) — Planes, comisiones y tasa vigente de la cuenta remunerada.
- [BaFin — Registro de entidades reguladas](https://www.bafin.de) — Verifica el registro de Scalable Capital como entidad supervisada en Alemania.
- [DEGIRO opinión 2026 — BogleHub](/blog/degiro-opinion-2026) — Análisis del broker técnico con mayor acceso a mercados.
- [Trade Republic opinión 2026 — BogleHub](/blog/trade-republic-opinion-2026) — El principal competidor de Scalable para el inversor indexado en España.
`,
  },
  {
    slug: 'mejor-broker-etfs-espana-2026',
    title: 'Mejor broker para ETFs en España 2026: comparativa honesta',
    excerpt:
      'Trade Republic, DEGIRO, MyInvestor, ING e Interactive Brokers comparados para ETFs: comisiones reales, seguridad y cuál elegir según tu perfil inversor.',
    publishedAt: '2026-05-30',
    readingMinutes: 11,
    keywords: ['mejor broker ETF España', 'mejor broker para ETFs', 'broker ETF España 2026', 'comparativa brokers ETF', 'qué broker elegir ETF'],
    faq: [
      {
        q: '¿Cuál es el mejor broker para invertir en ETFs en España en 2026?',
        a: 'No hay un único "mejor" para todos. Para aportaciones periódicas pequeñas y automatizadas, Trade Republic (0€ por operación, planes de ahorro desde 1€) es la opción más sencilla. Para combinar ETFs con fondos indexados de traspaso fiscal, MyInvestor. Para carteras grandes o acceso a muchos mercados, DEGIRO o Interactive Brokers. ING solo compensa si ya eres cliente, porque su broker es caro (9-22€ por orden).',
      },
      {
        q: '¿Qué broker tiene las comisiones más bajas para ETFs?',
        a: 'En comisión pura de compraventa, Trade Republic (0€ por operación) es el más barato para cualquier importe, seguido de DEGIRO (0,50€ + 0,004%, mínimo 0,90€) y MyInvestor (0,20€ + 0,03%). Interactive Brokers es muy competitivo en volúmenes altos. ING es el más caro con diferencia (9-22€ por orden). Pero el coste real incluye también cambio de divisa y, en algunos casos, custodia.',
      },
      {
        q: '¿Es seguro invertir en ETFs a través de estos brokers?',
        a: 'Sí, todos están regulados en la UE. Trade Republic (BaFin alemán) y MyInvestor e ING (CNMV/Banco de España) cubren hasta 100.000€ de depósitos por el fondo de garantía correspondiente. DEGIRO e Interactive Brokers cubren 20.000€ por el fondo de garantía de inversiones de su país. En todos los casos, tus ETFs se custodian como patrimonio separado del broker.',
      },
      {
        q: '¿Puedo comprar fondos indexados además de ETFs en estos brokers?',
        a: 'Solo algunos. MyInvestor, Interactive Brokers e ING permiten fondos indexados además de ETFs. Trade Republic y DEGIRO solo ofrecen ETFs. La diferencia es relevante porque los fondos indexados disfrutan del traspaso fiscal libre en España (cambiar de fondo sin tributar), una ventaja que los ETFs no tienen.',
      },
      {
        q: '¿Qué broker es mejor para un principiante que empieza con poco dinero?',
        a: 'Trade Republic es la opción más recomendada para empezar: 0€ por operación, planes de ahorro automáticos desde 1€/mes, app muy sencilla y cuenta remunerada. MyInvestor es la alternativa si quieres empezar con fondos indexados desde 1€ y aprovechar el traspaso fiscal. Ambos están regulados con cobertura de 100.000€.',
      },
    ],
    content: `# Mejor broker para ETFs en España 2026: comparativa honesta

Elegir broker es la segunda decisión más importante después de elegir tus ETFs, y la que más fricción y comisiones te ahorra (o te cuesta) durante décadas. Esta comparativa analiza los cinco brokers más usados por inversores indexados en España en 2026 — Trade Republic, DEGIRO, MyInvestor, ING e Interactive Brokers — sin afiliación ni comisiones por recomendarte ninguno.

La conclusión por adelantado: no existe un "mejor broker" universal. Existe el mejor broker para tu volumen de inversión, tu frecuencia de aportación y según si quieres combinar ETFs con fondos indexados. Vamos a verlo.

---

## Comparativa rápida

| | Trade Republic | DEGIRO | MyInvestor | ING | Interactive Brokers |
|---|---|---|---|---|---|
| Comisión ETF | **0 €** | 0,50 € + 0,004 % (mín. 0,90 €) | 0,20 € + 0,03 % | 9-22 € | Variable, muy baja |
| Planes de ahorro automáticos | ✓ (desde 1 €) | ✗ | Solo en fondos | ✗ | ✗ |
| Fondos indexados | ✗ | ✗ | ✓ (traspaso fiscal) | ✓ | ✓ |
| Cuenta remunerada | ✓ (~2-2,5 %) | ✗ | ✓ (~2 %) | ✓ | Sobre saldo no invertido |
| Regulación | BaFin (Alemania) | AFM (Países Bajos) | CNMV (España) | CNMV (España) | CBI (Irlanda) |
| Garantía de inversión | 100.000 € | 20.000 € | 100.000 € | 100.000 € | 20.000 € |
| Mercados | Europa + EE.UU. | 50+ bolsas | Principalmente Europa | Limitados | 150 mercados |
| Interfaz | Mobile, muy simple | Web técnica | Web bancaria | Web bancaria | Profesional, compleja |

---

## El coste real: no solo la comisión de compra

La comisión por operación es lo primero que mira todo el mundo, pero el coste total de usar un broker incluye más factores:

- **Comisión de compraventa**: lo que pagas cada vez que compras o vendes un ETF.
- **Cambio de divisa**: si compras un ETF en dólares o libras con euros, el broker aplica un margen en la conversión. Algunos lo incluyen en el spread sin que lo veas.
- **Comisión de custodia**: cuota por mantener los valores. La mayoría de brokers digitales no la cobran, pero conviene verificarlo.
- **Comisiones de cobro de dividendos**: algunos brokers cobran por procesar los dividendos de ETFs de distribución.

Para un inversor indexado que compra ETFs en euros domiciliados en Irlanda (lo habitual y recomendable), el cambio de divisa se minimiza eligiendo la cotización en euros (Xetra) en lugar de en dólares (LSE). Sobre esto profundizamos en la [guía para elegir tu primer ETF](/blog/como-elegir-tu-primer-etf-espana-2026).

---

## Trade Republic: el más sencillo y barato para empezar

**Comisión**: 0 € por operación, sin asteriscos. Gana dinero por order flow y por la cuenta remunerada.

**Lo mejor**: planes de ahorro automáticos desde 1 €/mes en más de 2.000 ETFs, app diseñada para no equivocarse, cuenta remunerada al ~2-2,5 % sin condiciones. Regulado por el BaFin alemán con cobertura de 100.000 € en depósitos.

**Lo peor**: solo ETFs (no fondos indexados con traspaso fiscal), mercados limitados a Europa y EE.UU., sin órdenes avanzadas.

**Ideal para**: quien empieza, aporta cantidades pequeñas-medianas de forma regular y quiere automatizar al máximo. Es el broker que más recomendamos para un primer inversor indexado. Análisis completo en la [opinión de Trade Republic 2026](/blog/trade-republic-opinion-2026).

---

## DEGIRO: acceso a más mercados para el inversor exigente

**Comisión**: 0,50 € + 0,004 % por operación en bolsas principales (mínimo 0,90 €). Lista mensual rotatoria de ETFs sin comisión de compra.

**Lo mejor**: acceso a más de 50 bolsas mundiales, tipos de órdenes avanzadas, comisiones que para órdenes grandes son irrelevantes en términos relativos.

**Lo peor**: cobertura de garantía de 20.000 € (inferior a la de los bancos), sin planes de ahorro automáticos, sin cuenta remunerada, y la cuenta básica permite préstamo de valores (para evitarlo, abre cuenta Custody).

**Ideal para**: carteras grandes (>100.000 €), acceso a mercados específicos o tipos de órdenes técnicas. Detalle en la [opinión de DEGIRO 2026](/blog/degiro-opinion-2026).

---

## MyInvestor: el único que combina ETFs y fondos indexados

**Comisión**: 0,20 € + 0,03 % del importe por orden de ETF. Para órdenes pequeñas (<667 €), la comisión mínima de 0,20 € es muy competitiva.

**Lo mejor**: el único de los cinco que ofrece fondos indexados de Vanguard, Amundi y Fidelity con **traspaso fiscal libre** (cambiar de fondo sin tributar, la gran ventaja fiscal en España). Regulado por la CNMV con cobertura de 100.000 €. Aportaciones desde 1 €.

**Lo peor**: comisión de ETF algo superior a Trade Republic, sin planes de ahorro automáticos en ETFs (sí en fondos), selección de ETFs más limitada.

**Ideal para**: quien quiere combinar ETFs con fondos indexados y aprovechar el traspaso fiscal, o prefiere un banco regulado en España. Más en la [opinión de MyInvestor 2026](/blog/myinvestor-opinion-2026).

---

## Interactive Brokers: potencia para el inversor avanzado

**Comisión**: variable, muy competitiva en volumen. Plataformas IBKR Lite (comisiones fijas) o IBKR Pro (escalonadas).

**Lo mejor**: acceso a más de 150 mercados en 33 países y 27 divisas. Permite ETFs, fondos, acciones, futuros, opciones y divisas. Es uno de los brokers más antiguos (1978) y respetados, regulado en Europa por el Central Bank of Ireland.

**Lo peor**: interfaz técnica y con curva de aprendizaje, cobertura de garantía de inversiones de 20.000 €, y no es banco (no hay garantía de depósito sobre el efectivo más allá de la de inversiones).

**Ideal para**: inversores con cartera grande, perfil avanzado o necesidad de acceso global a mercados. Excesivo para quien solo quiere comprar 1-2 ETFs al mes. Análisis completo en la [opinión de Interactive Brokers 2026](/blog/interactive-brokers-opinion-2026).

---

## ING: cómodo solo si ya eres cliente

**Comisión**: 9-22 € por orden a través del Naranja Broker. Es, con diferencia, el más caro de los cinco.

**Lo mejor**: la comodidad de tenerlo todo en el mismo banco si ya usas la Cuenta Sin Nómina de ING. Regulado por el Banco de España y la CNMV con cobertura de 100.000 €. Permite también fondos indexados.

**Lo peor**: el coste por operación es prohibitivo para aportaciones pequeñas regulares. Una aportación mensual de 200 € con una comisión de 10 € supone un 5 % de coste de entrada — inaceptable frente a los 0 € de Trade Republic.

**Ideal para**: clientes de ING que valoran la comodidad bancaria por encima del coste y hacen aportaciones grandes y poco frecuentes. Para el inversor indexado sensible al coste, hay opciones mucho mejores. Análisis completo en la [opinión de ING 2026](/blog/ing-opinion-2026).

---

## El ganador según tu perfil

**Si empiezas con poco y quieres automatizar**: **Trade Republic**. Sin discusión: 0 €, planes de ahorro desde 1 €, app sencilla.

**Si quieres fondos indexados con traspaso fiscal**: **MyInvestor**. El único que combina ambos vehículos con la ventaja fiscal española.

**Si tu cartera es grande o necesitas muchos mercados**: **DEGIRO** o **Interactive Brokers**, según si priorizas sencillez relativa (DEGIRO) o potencia y alcance global (IBKR).

**Si ya eres cliente de ING y aportas grandes sumas esporádicas**: **ING** puede ser cómodo, aunque casi siempre saldrás ganando con otro broker.

**La cartera óptima para muchos inversores**: Trade Republic para los ETFs con DCA automático + MyInvestor para los fondos indexados con traspaso fiscal. Dos brokers, lo mejor de cada uno.

---

## Cómo decidir en 3 preguntas

1. **¿Vas a aportar poco y a menudo?** → Trade Republic (0 € y automático).
2. **¿Quieres fondos indexados con traspaso fiscal?** → MyInvestor.
3. **¿Tienes una cartera grande o necesitas mercados internacionales?** → DEGIRO o Interactive Brokers.

Una vez tengas tu cartera montada en el broker que elijas, puedes [analizarla gratis con la herramienta de BogleHub](/analyzer): te dice tu asignación real por región y sector, el TER ponderado que pagas y si tienes solapamiento entre ETFs. Sin registro y sin que tus datos salgan de tu navegador.

ETFs habituales para empezar en cualquiera de estos brokers: [VWCE](/etf/vwce) (global All-World), [IWDA](/etf/iwda) (MSCI World), [CSPX](/etf/cspx) (S&P 500), [SWRD](/etf/swrd) (MSCI World barato) y [AGGH](/etf/aggh) (renta fija global) para la parte conservadora.

---

## Fuentes y lecturas complementarias

- [DEGIRO vs Trade Republic vs MyInvestor — BogleHub](/blog/degiro-vs-trade-republic-vs-myinvestor-2026) — Comparativa en profundidad de los tres brokers más populares.
- [Comparador de brókers — BogleHub](/calculadora/comparar-brokers) — Calcula el coste anual exacto en euros de cada broker según tu patrón de inversión.
- [Cómo elegir tu primer ETF en España — BogleHub](/blog/como-elegir-tu-primer-etf-espana-2026) — Guía de los criterios que importan antes de elegir broker.
`,
  },
  {
    slug: 'modelo-d6-etf-espana',
    title: 'Modelo D6 y ETFs: ¿tienes que presentarlo en 2026?',
    excerpt:
      '¿Tienes que presentar el modelo D6 por tus ETFs? Ya no: la reforma de 2021-2024 lo suprimió para particulares. Qué cambió y cómo se declaran de verdad.',
    publishedAt: '2026-05-30',
    readingMinutes: 8,
    keywords: ['modelo D6 ETF', 'modelo D6 2026', 'declarar ETF extranjero', 'modelo D6 obligatorio particulares', 'modelo D6 broker extranjero'],
    faq: [
      {
        q: '¿Tengo que presentar el modelo D6 si invierto en ETFs?',
        a: 'En la práctica, no. Tras la reforma de 2021-2024 (Orden ICT/1408/2021, Real Decreto 571/2023 y Orden ECM/57/2024), la obligación de declarar inversiones exteriores solo aplica a participaciones significativas (igual o superior al 10% del capital o los derechos de voto de una empresa). Un inversor particular con ETFs diversificados nunca alcanza ese umbral, así que no tiene que presentar el D6 ni los nuevos modelos de inversión directa.',
      },
      {
        q: '¿El modelo D6 es lo mismo que declarar los ETFs en el IRPF?',
        a: 'No, son cosas completamente distintas. El D6 era una declaración de inversiones españolas en el exterior, gestionada por el Registro de Inversiones Exteriores del Ministerio de Economía, no por la Agencia Tributaria. La tributación de tus ETFs (ganancias al vender y dividendos) va por el IRPF, en la declaración de la renta. Son dos administraciones y dos trámites diferentes.',
      },
      {
        q: '¿Sigue existiendo el modelo D6 en 2026?',
        a: 'El esquema clásico del D6 fue derogado por la Orden ECM/57/2024 e integrado en un conjunto de modelos nuevos (D-1A, D-1B, D-2A, D-2B, D-4, DP-1, DP-2) que cubren la inversión directa significativa. Para el inversor de cartera minorista (ETFs, acciones sueltas sin control de la empresa) ya no hay obligación de declaración ante el Registro de Inversiones Exteriores.',
      },
      {
        q: 'Entonces, ¿qué tengo que declarar por mis ETFs?',
        a: 'Dos cosas, ambas ante la Agencia Tributaria (no el Registro de Inversiones Exteriores): (1) en el IRPF, las ganancias o pérdidas patrimoniales cuando vendes y los dividendos si tienes ETFs de distribución; (2) el modelo 720, declaración informativa de bienes en el extranjero, solo si el conjunto de tus valores fuera de España supera los 50.000€. El modelo 720 es informativo y no implica pagar impuestos.',
      },
      {
        q: '¿Cambia algo si uso un broker extranjero como DEGIRO o Trade Republic?',
        a: 'Para el modelo D6, no: la supresión de la obligación para inversiones de cartera aplica con independencia del broker. Para el modelo 720, sí puede importar: si tus ETFs custodiados fuera de España superan los 50.000€, tendrías que presentarlo. Trade Republic (Alemania) y DEGIRO (Países Bajos) custodian en el extranjero; verifica con tu situación concreta y, si hay dudas, consulta con un asesor fiscal.',
      },
    ],
    content: `# Modelo D6 y ETFs: ¿tienes que presentarlo en 2026?

Si has buscado información sobre cómo declarar tus ETFs, es probable que te hayas topado con el "modelo D6" y con artículos antiguos que dan a entender que cualquiera con un broker extranjero tiene que presentarlo. La buena noticia: **para el inversor particular con ETFs, el modelo D6 ya no es una obligación en 2026.** La reforma de 2021-2024 lo suprimió para la cartera minorista.

Esta guía aclara qué era el D6, qué cambió y, sobre todo, qué tienes que declarar de verdad por tus ETFs (que no tiene nada que ver con el D6).

> **Respuesta rápida**: un inversor particular con una cartera diversificada de ETFs **no** tiene que presentar el modelo D6 ni los nuevos modelos de inversión exterior. Esa obligación solo aplica a participaciones iguales o superiores al 10% del capital de una empresa, algo imposible con un ETF. Lo que sí declaras es el IRPF (al vender o cobrar dividendos) y, si tienes más de 50.000€ en el extranjero, el modelo 720.

---

## Qué es (o era) el modelo D6 — y qué NO es

El modelo D6 era la **declaración de titulares de inversiones españolas en el exterior en valores negociables**. Lo gestionaba el **Registro de Inversiones Exteriores del Ministerio de Economía, Comercio y Empresa** — un organismo que no tiene nada que ver con la Agencia Tributaria.

Aquí está la confusión más extendida: **el D6 no es un impuesto ni forma parte del IRPF.** Era una declaración estadística/administrativa de inversiones en el exterior, no un trámite de la declaración de la renta. Muchos inversores mezclaban ambos conceptos y acababan pensando que "declarar ETFs" significaba presentar el D6. No es así.

Los ETFs, las acciones y los fondos cuentan como valores negociables a efectos de esta normativa. Por eso, durante años circuló la idea de que cualquiera con valores en una entidad depositaria extranjera (un broker como DEGIRO o Trade Republic) debía presentar el D6. Esa interpretación era discutible incluso entonces, y hoy ha quedado superada.

---

## Qué cambió: la reforma de 2021-2024

Tres normas sucesivas desmontaron la obligación del D6 para el inversor minorista:

1. **Orden ICT/1408/2021, de 14 de diciembre.** Limitó la obligación de declarar a las **participaciones significativas**: en general, a partir del 10% del capital o de los derechos de voto de la empresa extranjera.

2. **Real Decreto 571/2023, de 4 de julio**, sobre inversiones exteriores. Reordenó el marco general de las declaraciones de inversión.

3. **Orden ECM/57/2024, de 29 de enero** (BOE-A-2024-1774). Estableció los procedimientos actuales, **derogó el esquema clásico del D6** y lo integró en un conjunto de modelos nuevos (D-1A, D-1B, D-2A, D-2B, D-4, DP-1, DP-2) pensados para la **inversión directa significativa**, no para la cartera diversificada de un particular.

El resultado práctico: la obligación de declaración ante el Registro de Inversiones Exteriores quedó reservada a quien mantiene una participación relevante en una empresa concreta (control o influencia significativa, normalmente ≥10%). **Un ETF diversificado reparte tu dinero entre cientos o miles de empresas; tu participación en cualquiera de ellas es minúscula.** Por tanto, nunca activas esa obligación.

---

## Entonces, ¿qué tengo que declarar de verdad por mis ETFs?

Lo relevante para el inversor de ETFs son dos trámites, ambos ante la **Agencia Tributaria** (no ante el Registro de Inversiones Exteriores):

### 1. El IRPF (declaración de la renta)

Es donde tributan tus ETFs de verdad:

- **Ganancias o pérdidas patrimoniales**: cuando **vendes** un ETF con beneficio, la ganancia tributa en la base del ahorro del IRPF (19% hasta 6.000€, 21% de 6.000€ a 50.000€, 23% de 50.000€ a 200.000€, 27% de 200.000€ a 300.000€ y 28% por encima). Si no vendes, no hay nada que declarar.
- **Dividendos**: si tienes ETFs de **distribución**, los dividendos tributan cada año como rendimientos del capital mobiliario, con los mismos tipos. Los ETFs de **acumulación** no generan evento fiscal hasta que vendes.

El paso a paso completo está en la guía [Cómo declarar ETFs en la declaración de la renta](/blog/como-declarar-etfs-hacienda). Y puedes estimar cuánto pagarás antes de vender con la [calculadora de IRPF de BogleHub](/calculadora/irpf-venta-fondos).

### 2. El modelo 720 (solo si superas 50.000€ en el extranjero)

El **modelo 720** es una declaración **informativa** de bienes y derechos situados en el extranjero. Solo estás obligado a presentarlo si el conjunto de tus valores fuera de España (por ejemplo, ETFs custodiados en un broker como Trade Republic o DEGIRO) supera los **50.000€** en alguna de las categorías. Es informativo: presentarlo no implica pagar impuestos, solo comunicar la tenencia.

Ojo: este umbral sí depende de dónde estén custodiados tus valores. Un broker español como MyInvestor no computa para el 720; uno extranjero, sí.

---

## ¿Hay algún caso en que un inversor particular sí declare inversión exterior?

Sí, pero son situaciones que no se dan con ETFs:

- Si **compras directamente más del 10%** del capital de una empresa extranjera no cotizada (inversión directa, no cartera).
- Si participas en la **constitución o adquisición** de una sociedad extranjera con influencia en su gestión.

Comprar participaciones de un ETF —que es un fondo que invierte en muchas empresas— nunca te convierte en titular del 10% de ninguna de ellas. Por eso el inversor indexado queda fuera de esta obligación.

---

## Resumen para el inversor de ETFs

- **Modelo D6**: ya **no** lo presentas. Suprimido para la cartera minorista por la reforma de 2021-2024.
- **IRPF**: declaras ganancias al vender y dividendos si los cobras. Es tu trámite fiscal real.
- **Modelo 720**: solo si tienes más de 50.000€ en valores custodiados en el extranjero. Informativo.
- **Regla práctica**: invertir en ETFs diversificados no te genera ninguna obligación ante el Registro de Inversiones Exteriores. Tu única gestión fiscal habitual es el IRPF.

Las obligaciones de declaración pueden cambiar y tu caso puede tener particularidades (residencia fiscal, importes elevados, normativa foral del País Vasco y Navarra). Esta guía es educativa y no sustituye el asesoramiento de un profesional. Ante la duda, consulta con un asesor fiscal.

---

## Fuentes y lecturas complementarias

- [BOE — Orden ECM/57/2024, de 29 de enero (procedimientos de inversiones exteriores)](https://www.boe.es/buscar/doc.php?id=BOE-A-2024-1774) — Norma que deroga el esquema D6 e introduce los nuevos modelos de inversión directa.
- [Ministerio de Economía, Comercio y Empresa — Declaraciones de inversiones exteriores](https://comercio.gob.es/es-es/inversiones_exteriores/declaraciones_inversion) — Información oficial sobre qué inversiones hay que declarar y cómo.
- [Cómo declarar ETFs en la declaración de la renta — BogleHub](/blog/como-declarar-etfs-hacienda) — El trámite fiscal que sí afecta a tus ETFs, paso a paso.
- [Fiscalidad de ETFs en España: guía completa — BogleHub](/blog/fiscalidad-etfs-espana-guia-completa) — Tributación de ganancias, dividendos, domicilio fiscal y modelo 720.
- [Glosario: modelo 720 — BogleHub](/glosario/modelo-720) — Qué es la declaración informativa de bienes en el extranjero.
`,
  },
  {
    slug: 'mejores-fondos-indexados-espana-2026',
    title: 'Mejores fondos indexados en España 2026: la lista por categoría',
    excerpt:
      'Mejores fondos indexados en España por categoría: global, S&P 500, emergentes y bonos. TER, ISIN y la ventaja del traspaso fiscal sin tributar.',
    publishedAt: '2026-05-31',
    readingMinutes: 10,
    keywords: ['mejores fondos indexados España', 'mejores fondos indexados 2026', 'fondos indexados MyInvestor', 'fondo indexado MSCI World', 'Amundi Prime Global'],
    faq: [
      {
        q: '¿Cuáles son los mejores fondos indexados disponibles en España en 2026?',
        a: 'Por coste, los más eficientes por categoría son: para renta variable global, el Amundi Prime Global (TER 0,05%); para S&P 500, el Amundi Prime USA (0,05%) o el Vanguard U.S. 500 Stock Index (0,10%); para emergentes, el Amundi Index MSCI Emerging Markets (0,20%); para renta fija global, el Vanguard Global Bond Index EUR Hedged (0,15%). Todos disponibles en MyInvestor desde 1€ con traspaso fiscal libre.',
      },
      {
        q: '¿Por qué elegir fondos indexados en lugar de ETFs en España?',
        a: 'La razón principal es el traspaso fiscal: los fondos de inversión permiten mover dinero de un fondo a otro sin tributar, mientras que vender un ETF para comprar otro realiza la ganancia y tributa ese año. Para quien prevé rebalancear o cambiar de estrategia a lo largo de los años, los fondos indexados son fiscalmente más eficientes. Además, permiten aportaciones automáticas desde 1€ y compra a valor liquidativo sin spread.',
      },
      {
        q: '¿Dónde se compran los fondos indexados en España?',
        a: 'La plataforma más popular para fondos indexados de bajo coste en España es MyInvestor, que ofrece la gama de Vanguard, Amundi y Fidelity sin comisión de compra ni custodia y con traspaso libre. Otras opciones son Renta 4, Selfbank/Singular Bank y algunos roboadvisors que usan estos fondos por dentro. Los brokers de solo ETFs como Trade Republic o DEGIRO no ofrecen fondos indexados.',
      },
      {
        q: '¿Qué TER es razonable para un fondo indexado global?',
        a: 'En 2026, un fondo indexado global de bajo coste debería tener un TER por debajo del 0,20% anual. El más barato disponible en España es el Amundi Prime Global con un 0,05%. Por encima del 0,30% para un índice global estándar es difícil de justificar habiendo alternativas tan baratas. Recuerda que el TER se descuenta automáticamente del valor liquidativo cada día.',
      },
      {
        q: '¿Un solo fondo indexado global es suficiente para mi cartera?',
        a: 'Para la parte de renta variable, sí: un fondo indexado global como el Amundi Prime Global o el Vanguard Global Stock cubre los mercados desarrollados mundiales en un solo producto. Si quieres añadir emergentes y renta fija, una cartera de 2-3 fondos (global + emergentes + bonos) es la versión clásica Boglehead. La ventaja es que puedes rebalancear entre ellos con traspaso fiscal, sin tributar.',
      },
    ],
    content: `# Mejores fondos indexados en España 2026: la lista por categoría

Los fondos indexados son, para muchos inversores españoles, la mejor forma de construir una cartera a largo plazo — incluso por delante de los ETFs. La razón no es el coste (hoy es similar), sino el **traspaso fiscal**: puedes mover dinero de un fondo a otro sin tributar, algo que los ETFs no permiten. Esta guía recoge los mejores fondos indexados disponibles en España en 2026, organizados por categoría, con su TER e ISIN.

Todos los datos de TER e ISIN de esta guía son los publicados por las gestoras; verifícalos siempre en la ficha oficial antes de invertir, ya que pueden cambiar.

> **En resumen**: para renta variable global, el Amundi Prime Global (TER 0,05%) es el más barato. Para S&P 500, el Amundi Prime USA (0,05%). Para emergentes, el Amundi Index MSCI Emerging Markets (0,20%). Para renta fija global, el Vanguard Global Bond EUR Hedged (0,15%). Casi todos disponibles en MyInvestor desde 1€ con traspaso fiscal libre.

---

## Por qué fondos indexados (y no ETFs) en España

La diferencia decisiva entre un fondo indexado y un ETF en España no es el coste ni la rentabilidad —que son prácticamente idénticos para el mismo índice—, sino la fiscalidad:

- **Traspaso fiscal libre**: puedes mover dinero entre fondos sin tributar. Rebalanceas, cambias de gestora o de estrategia sin que Hacienda toque tu ganancia hasta que reembolses de verdad. Con ETFs, cada venta realiza la plusvalía y tributa ese año.
- **Aportaciones desde 1€**: la mayoría permite aportaciones automáticas de cualquier importe.
- **Compra a valor liquidativo**: sin spread de mercado ni precio en tiempo real que vigilar.

La contrapartida: los fondos indexados se compran en plataformas concretas (sobre todo MyInvestor), no en cualquier broker. Si quieres entender la decisión a fondo, lee [fondos indexados o ETFs: la comparación definitiva](/blog/fondos-indexados-vs-etfs-espana).

---

## Renta variable global (mercados desarrollados)

La base de casi cualquier cartera. Replican el MSCI World o un índice equivalente de grandes y medianas empresas de países desarrollados.

| Fondo | Índice | TER | ISIN |
|---|---|---|---|
| **Amundi Prime Global** | Solactive GBS Global Markets | **0,05 %** | LU1931974692 |
| Fidelity MSCI World Index | MSCI World | 0,12 % | IE00BYX5MX67 |
| Vanguard Global Stock Index | MSCI World | 0,18 % | IE00B03HCZ61 |

El **Amundi Prime Global** es el fondo indexado global más barato disponible al inversor particular en España. Su índice (Solactive GBS) es funcionalmente equivalente al MSCI World. Lo analizamos en detalle en [Amundi Prime Global: análisis completo](/blog/amundi-prime-global-analisis) y tiene su [ficha técnica aquí](/fondo/amundi-prime-global).

---

## S&P 500 y EE.UU.

Para quien quiere concentrar en el mercado estadounidense.

| Fondo | Índice | TER | ISIN |
|---|---|---|---|
| **Amundi Prime USA** | Solactive GBS United States | **0,05 %** | LU2050633988 |
| Vanguard U.S. 500 Stock Index | S&P 500 | 0,10 % | IE0032126645 |

El **Amundi Prime USA** replica el mercado estadounidense por solo un 0,05%. El Vanguard U.S. 500 sigue el S&P 500 clásico con un 0,10%. Ficha del [Vanguard U.S. 500 Stock Index](/fondo/vanguard-us-500-stock).

---

## Mercados emergentes

El complemento habitual del fondo global para cubrir China, India, Taiwán, Brasil y otros emergentes.

| Fondo | Índice | TER | ISIN |
|---|---|---|---|
| **Amundi Index MSCI Emerging Markets** | MSCI Emerging Markets | **0,20 %** | LU0996177134 |
| Fidelity Emerging Markets Index | MSCI Emerging Markets | 0,20 % | IE00BYX5L514 |
| Vanguard Emerging Markets Stock Index | MSCI Emerging Markets | 0,23 % | IE0031786142 |

Los tres replican el mismo índice MSCI Emerging Markets. En una cartera Boglehead de 3 fondos, los emergentes suelen ocupar entre el 10% y el 20% de la renta variable.

---

## Renta fija

El contrapeso de la renta variable: estabilidad y menor volatilidad.

| Fondo | Índice | TER | ISIN |
|---|---|---|---|
| **Vanguard Global Bond Index EUR Hedged** | Bloomberg Global Aggregate (EUR Hedged) | 0,15 % | IE00B18GC888 |
| Amundi Index Eurozone Government Bond | Bonos gobierno eurozona | 0,15 % | LU1437015735 |

El **Vanguard Global Bond EUR Hedged** es la opción global para la parte conservadora, con cobertura de divisa a euros (recomendable en renta fija). El de Amundi se centra en deuda pública de la eurozona. Para entender por qué la cobertura de divisa importa en bonos pero no en acciones, lee [riesgo divisa en ETFs](/blog/riesgo-divisa-etf-hedged-espana).

---

## Otras regiones: eurozona y Japón

Para quien quiera sobreponderar regiones concretas.

| Fondo | Índice | TER | ISIN |
|---|---|---|---|
| Vanguard Eurozone Stock Index | MSCI EMU | 0,16 % | IE0007987690 |
| **Amundi Prime Japan** | Solactive GBS Japan | **0,05 %** | LU2089238385 |

---

## Cómo elegir tus fondos indexados

1. **Empieza por la base global.** Para la mayoría, un solo fondo global de bajo coste (Amundi Prime Global o Vanguard Global Stock) cubre la renta variable de mercados desarrollados.
2. **Añade emergentes si quieres exposición completa al mundo** (10-20% de la renta variable).
3. **Añade renta fija según tu perfil de riesgo** (desde 0% para horizontes muy largos hasta 40-60% cerca de la jubilación).
4. **Fíjate en el TER, no en rentabilidades pasadas.** Para el mismo índice, el fondo más barato gana a largo plazo: el coste es lo único que conoces con certeza.

La gran ventaja: como todos permiten traspaso fiscal, puedes empezar simple (un fondo global) e ir añadiendo o rebalanceando con el tiempo sin coste fiscal. Cómo se hace, paso a paso, en la [guía de traspaso de fondos](/blog/como-hacer-traspaso-fondos-espana).

---

## La cartera mínima de fondos indexados

La versión más sencilla de una cartera Boglehead con fondos:

- **80 % Amundi Prime Global** (renta variable global, TER 0,05%)
- **20 % Vanguard Global Bond EUR Hedged** (renta fija global, TER 0,15%)

TER ponderado: aproximadamente 0,07% anual. Difícil de batir en coste. Para una versión de tres fondos, añade un fondo de emergentes (por ejemplo, 70% global / 10% emergentes / 20% bonos). Más sobre carteras en la [cartera Boglehead de 3 fondos](/blog/cartera-boglehead-3-fondos-espana).

Una vez tengas tu cartera, puedes [analizarla gratis](/analyzer) para ver tu diversificación real, el TER ponderado y posibles solapamientos. Sin registro y con los datos solo en tu navegador.

---

## Fuentes y lecturas complementarias

- [Catálogo de fondos indexados — BogleHub](/fondo) — Fichas individuales con TER, ISIN, índice y plataformas de cada fondo.
- [Fondos indexados o ETFs en España — BogleHub](/blog/fondos-indexados-vs-etfs-espana) — La comparación completa para decidir el vehículo.
- [Cómo hacer un traspaso de fondos — BogleHub](/blog/como-hacer-traspaso-fondos-espana) — La ventaja fiscal clave de los fondos, paso a paso.
- [MyInvestor — Fondos indexados](https://myinvestor.es) — Plataforma con la mayor selección de fondos indexados de bajo coste en España (verifica TER y condiciones actuales).
`,
  },
  {
    slug: 'como-invertir-sp500-espana',
    title: 'Cómo invertir en el S&P 500 desde España (2026)',
    excerpt:
      'Cómo invertir en el S&P 500 desde España: por qué no puedes comprar el SPY americano, los mejores ETFs y fondos UCITS y dónde comprarlos.',
    publishedAt: '2026-05-31',
    readingMinutes: 9,
    keywords: ['cómo invertir en el S&P 500 desde España', 'invertir S&P 500 España', 'ETF S&P 500 España', 'mejor fondo S&P 500', 'comprar S&P 500'],
    faq: [
      {
        q: '¿Cómo se invierte en el S&P 500 desde España?',
        a: 'A través de un ETF o un fondo indexado UCITS que replique el índice S&P 500, domiciliado en Irlanda para máxima eficiencia fiscal. No puedes comprar el SPY americano (la normativa europea MiFID II lo impide al inversor particular), pero sí sus equivalentes UCITS: ETFs como CSPX, VUAA o SPXS, o fondos como el Amundi Prime USA y el Vanguard U.S. 500. Se compran en un broker (Trade Republic, DEGIRO) o, en el caso de los fondos, en MyInvestor.',
      },
      {
        q: '¿Por qué no puedo comprar el ETF SPY o VOO americano desde España?',
        a: 'Porque la normativa europea (MiFID II) exige que los productos comercializados al inversor particular tengan un documento de datos fundamentales (KID) en formato europeo, y los ETFs americanos como SPY o VOO no lo tienen. La solución son los ETFs UCITS, que replican exactamente el mismo índice S&P 500 y están diseñados para el inversor europeo, con la ventaja añadida del domicilio en Irlanda.',
      },
      {
        q: '¿Cuál es el ETF de S&P 500 más barato disponible en España?',
        a: 'Por TER, el SPDR S&P 500 (SPXS) es el más barato con un 0,03% anual. Otros muy populares y eficientes son el iShares Core S&P 500 (CSPX) y el Vanguard S&P 500 (VUAA en acumulación, VUSA en distribución), ambos con un TER del 0,07%. Todos están domiciliados en Irlanda. La diferencia entre 0,03% y 0,07% es mínima en euros; pesa más elegir bien acumulación vs distribución y el broker.',
      },
      {
        q: '¿Mejor un ETF o un fondo indexado para el S&P 500?',
        a: 'Depende de si valoras el traspaso fiscal. Los fondos indexados como el Amundi Prime USA (TER 0,05%) o el Vanguard U.S. 500 (0,10%) permiten traspasar a otro fondo sin tributar, ventaja exclusiva de los fondos en España. Los ETFs (CSPX, VUAA) suelen tener costes de compra menores en algunos brokers pero no tienen traspaso fiscal. Para una cartera que vas a rebalancear, el fondo; para comprar y mantener sin tocar, el ETF también vale.',
      },
      {
        q: '¿Es buena idea invertir solo en el S&P 500?',
        a: 'El S&P 500 concentra el 100% en grandes empresas de EE.UU. Ha tenido una rentabilidad histórica excelente, pero es una apuesta por un solo país. La filosofía Boglehead más ortodoxa prefiere un índice global (MSCI World o FTSE All-World) que diversifica entre países desarrollados y, opcionalmente, emergentes. El S&P 500 es una opción válida si entiendes y aceptas esa concentración geográfica; si prefieres diversificar, un fondo global cubre EE.UU. y el resto del mundo.',
      },
    ],
    content: `# Cómo invertir en el S&P 500 desde España (2026)

El S&P 500 es el índice más seguido del mundo: las 500 mayores empresas cotizadas de Estados Unidos, desde Apple y Microsoft hasta Coca-Cola o JP Morgan. Invertir en él desde España es sencillo, pero hay un par de cosas que conviene saber antes — sobre todo por qué no puedes comprar el famoso "SPY" americano y cuál es la mejor alternativa. Esta guía te lo explica paso a paso, con las opciones concretas disponibles en 2026.

Los TER e ISIN de esta guía son los publicados por las gestoras; verifícalos en la ficha oficial antes de invertir, ya que pueden cambiar.

> **En resumen**: inviertes en el S&P 500 a través de un ETF o fondo indexado UCITS domiciliado en Irlanda. Los ETFs más eficientes son SPXS (TER 0,03%), CSPX y VUAA (0,07%). Como fondo indexado, el Amundi Prime USA (0,05%) o el Vanguard U.S. 500 (0,10%), con la ventaja del traspaso fiscal. Los compras en un broker (Trade Republic, DEGIRO) o, los fondos, en MyInvestor.

---

## Qué es el S&P 500

El S&P 500 agrupa las 500 mayores empresas cotizadas de Estados Unidos por capitalización bursátil. Cubre aproximadamente el 80% del valor del mercado estadounidense e incluye gigantes tecnológicos (Apple, Microsoft, Nvidia, Alphabet, Amazon, Meta), pero también consumo, salud, finanzas e industria. Es el termómetro de la bolsa estadounidense y uno de los índices con mejor historial a largo plazo.

Su característica —y su riesgo— es la concentración: el 100% en un solo país, y con un peso muy alto de unas pocas megaempresas tecnológicas. Lo abordamos al final de la guía.

---

## Por qué no puedes comprar el SPY o el VOO americano

Si has leído sobre el S&P 500 en webs estadounidenses, habrás visto los ETFs SPY (de State Street) o VOO (de Vanguard). **Desde España no puedes comprarlos** como inversor particular.

El motivo es la normativa europea MiFID II: exige que los productos vendidos al inversor minorista europeo tengan un documento de datos fundamentales (KID) en formato europeo. Los ETFs domiciliados en EE.UU. no lo tienen, así que los brokers europeos no te dejan comprarlos.

La solución no es un problema: los **ETFs UCITS**. Replican exactamente el mismo índice S&P 500, están diseñados para el inversor europeo y, además, los domiciliados en Irlanda son más eficientes fiscalmente (el convenio Irlanda-EE.UU. reduce la retención sobre dividendos del 30% al 15%).

---

## Los mejores ETFs de S&P 500 para España

Todos replican el mismo índice S&P 500 y están domiciliados en Irlanda (grado fiscal óptimo). La diferencia está en el TER y en si son de acumulación o distribución.

| ETF | Gestora | TER | Reparto | ISIN |
|---|---|---|---|---|
| **SPXS** | SPDR | **0,03 %** | Acumulación | IE00B6YX5C33 |
| **CSPX** | iShares | 0,07 % | Acumulación | IE00B5BMR087 |
| **VUAA** | Vanguard | 0,07 % | Acumulación | IE00BFMXXD54 |
| VUSA | Vanguard | 0,07 % | Distribución | IE00B3XXRP09 |
| IUSA | iShares | 0,07 % | Distribución | IE0031442068 |

El **SPXS** de SPDR es el más barato (0,03%). El **CSPX** de iShares es el más popular y con mayor patrimonio. **VUAA** (acumulación) y **VUSA** (distribución) son las versiones de Vanguard. La diferencia de TER entre 0,03% y 0,07% es de céntimos al año por cada 1.000€; pesa más elegir bien entre acumulación y distribución. Puedes comparar dos cualquiera en el [comparador de ETFs](/comparar) o ver la [categoría completa de ETFs S&P 500](/etfs/sp500).

---

## Los fondos indexados de S&P 500 (con traspaso fiscal)

Si prefieres un fondo indexado en lugar de un ETF —para aprovechar el traspaso fiscal libre—, tienes dos opciones excelentes:

| Fondo | Gestora | TER | ISIN |
|---|---|---|---|
| **Amundi Prime USA** | Amundi | **0,05 %** | LU2050633988 |
| Vanguard U.S. 500 Stock Index | Vanguard | 0,10 % | IE0032126645 |

El **Amundi Prime USA** replica el mercado estadounidense por un 0,05%, disponible en MyInvestor desde 1€. El **Vanguard U.S. 500** sigue el S&P 500 clásico. Sus fichas: [Amundi Prime USA](/fondo/amundi-prime-usa) y [Vanguard U.S. 500 Stock](/fondo/vanguard-us-500-stock). Ambos en la [guía de mejores fondos indexados](/blog/mejores-fondos-indexados-espana-2026).

---

## ETF o fondo: cuál elegir para el S&P 500

- **Fondo indexado** (Amundi Prime USA, Vanguard U.S. 500): permite **traspaso fiscal libre** —cambiar a otro fondo sin tributar—, aportaciones desde 1€ y compra a valor liquidativo. Ideal si vas a rebalancear o prevés cambiar de estrategia.
- **ETF** (SPXS, CSPX, VUAA): comisiones de compra muy bajas en brokers como Trade Republic (0€), precio en tiempo real, y planes de ahorro automáticos. Ideal para comprar y mantener.

La diferencia de coste anual es mínima; la decisión real es la del [traspaso fiscal](/blog/como-hacer-traspaso-fondos-espana) frente a la comodidad del ETF. Lo desarrollamos en [fondos indexados o ETFs](/blog/fondos-indexados-vs-etfs-espana).

---

## Acumulación o distribución

- **Acumulación** (SPXS, CSPX, VUAA, Amundi Prime USA): reinvierte los dividendos dentro del fondo, sin que tributes por ellos hasta que vendas. Más eficiente en la fase de ahorro.
- **Distribución** (VUSA, IUSA): te paga los dividendos en cuenta, que tributan cada año. Útil si quieres rentas periódicas.

Para la mayoría de inversores en fase de acumulación, la versión de acumulación es la opción más eficiente fiscalmente.

---

## Dónde comprarlo

- **ETFs** (CSPX, VUAA, SPXS): cualquier broker con acceso a bolsa europea. Trade Republic (0€ y planes de ahorro), DEGIRO, MyInvestor. Compara opciones en [mejor broker para ETFs en España](/blog/mejor-broker-etfs-espana-2026).
- **Fondos** (Amundi Prime USA, Vanguard U.S. 500): MyInvestor es la plataforma más usada, con traspaso fiscal y aportaciones desde 1€.

---

## ¿Solo S&P 500 o mejor un índice global?

Aquí va la parte honesta. El S&P 500 ha tenido un historial excelente, pero invertir solo en él es **concentrar el 100% de tu renta variable en un país** (EE.UU.) y, dentro de él, con un peso enorme de media docena de tecnológicas.

La filosofía Boglehead más ortodoxa prefiere un **índice global** (MSCI World o FTSE All-World), que incluye EE.UU. en su peso natural (~65-70%) más el resto de países desarrollados y, opcionalmente, emergentes. Así no apuestas por un solo país: replicas el mercado mundial.

¿Significa que el S&P 500 es mala idea? No. Es una opción válida si **entiendes y aceptas** esa concentración geográfica. Pero si dudas, un fondo global te da exposición a EE.UU. y al resto del mundo en un solo producto, con la misma simplicidad. Lo comparamos en [VWCE vs CSPX vs IWDA](/blog/vwce-vs-cspx-vs-iwda) y en [MSCI World vs MSCI ACWI](/blog/msci-world-vs-msci-acwi-diferencias).

Una vez decidas, puedes [analizar tu cartera gratis](/analyzer) para ver tu exposición real por región y comprobar que encaja con lo que quieres.

---

## Fuentes y lecturas complementarias

- [Categoría: ETFs S&P 500 — BogleHub](/etfs/sp500) — Listado completo de ETFs S&P 500 disponibles en España con TER y grado fiscal.
- [VWCE vs CSPX vs IWDA — BogleHub](/blog/vwce-vs-cspx-vs-iwda) — Comparativa entre el S&P 500 y los índices globales.
- [Mejores fondos indexados en España — BogleHub](/blog/mejores-fondos-indexados-espana-2026) — Incluye las opciones de fondos para el S&P 500.
- [Cómo elegir tu primer ETF en España — BogleHub](/blog/como-elegir-tu-primer-etf-espana-2026) — Los criterios que importan: domicilio, TER, acumulación.
`,
  },
  {
    slug: 'como-invertir-msci-world-espana',
    title: 'Cómo invertir en el MSCI World desde España (2026)',
    excerpt:
      'Cómo invertir en el MSCI World desde España: los mejores ETFs (IWDA, SWRD) y fondos indexados UCITS, dónde comprarlos y si conviene añadir emergentes.',
    publishedAt: '2026-05-31',
    readingMinutes: 9,
    keywords: ['cómo invertir en el MSCI World desde España', 'invertir MSCI World España', 'ETF MSCI World', 'mejor fondo MSCI World', 'IWDA vs SWRD'],
    faq: [
      {
        q: '¿Cómo se invierte en el MSCI World desde España?',
        a: 'A través de un ETF o un fondo indexado UCITS que replique el índice MSCI World, domiciliado en Irlanda para máxima eficiencia fiscal. Los ETFs más populares son IWDA (iShares, TER 0,20%) y SWRD (SPDR, 0,12%); como fondos indexados, el Vanguard Global Stock (0,18%), el Fidelity MSCI World (0,12%) o el Amundi Prime Global (0,05%, índice equivalente). Los ETFs se compran en cualquier broker (Trade Republic, DEGIRO) y los fondos en MyInvestor.',
      },
      {
        q: '¿Cuál es el mejor ETF de MSCI World para inversores en España?',
        a: 'No hay un único "mejor". Los más usados son IWDA (iShares Core MSCI World, TER 0,20%, el más popular y con mayor patrimonio) y SWRD (SPDR MSCI World, TER 0,12%, más barato). MWRD (Amundi, 0,12%) es otra opción económica. Todos son de acumulación y están domiciliados en Irlanda (grado fiscal A). La diferencia de TER es de céntimos al año; elige según disponibilidad y comisiones en tu broker.',
      },
      {
        q: '¿IWDA o SWRD: cuál elijo?',
        a: 'Ambos replican el MSCI World, son de acumulación y están domiciliados en Irlanda. La diferencia principal es el TER: SWRD (0,12%) es más barato que IWDA (0,20%). IWDA tiene mayor patrimonio y liquidez, lo que se traduce en spreads ligeramente más ajustados. Para la mayoría de inversores la diferencia es mínima; SWRD gana en coste puro, IWDA en liquidez y trayectoria.',
      },
      {
        q: '¿El MSCI World incluye mercados emergentes?',
        a: 'No. El MSCI World cubre solo 23 países desarrollados (EE.UU., Japón, Reino Unido, Europa, Canadá, Australia...), sin emergentes como China, India o Brasil. Si quieres incluirlos, puedes añadir un ETF de emergentes (EIMI, VFEM) en un 10-20%, o usar directamente un ETF All-World como VWCE, que ya incorpora emergentes en su proporción natural.',
      },
      {
        q: '¿Mejor un ETF o un fondo indexado para el MSCI World?',
        a: 'Depende de si valoras el traspaso fiscal. Los fondos indexados (Vanguard Global Stock, Fidelity MSCI World, Amundi Prime Global) permiten traspasar a otro fondo sin tributar, ventaja exclusiva de los fondos en España. Los ETFs (IWDA, SWRD) suelen tener comisiones de compra más bajas en algunos brokers y planes de ahorro automáticos. Para rebalancear sin coste fiscal, el fondo; para comprar y mantener, el ETF también vale.',
      },
    ],
    content: `# Cómo invertir en el MSCI World desde España (2026)

El MSCI World es el índice de referencia del inversor indexado en España: más de 1.400 empresas grandes y medianas de 23 países desarrollados, en un solo producto. Es, para mucha gente, la base de toda la cartera. Esta guía explica cómo invertir en él paso a paso, con las mejores opciones concretas —ETFs y fondos— disponibles en 2026.

Los TER e ISIN de esta guía son los publicados por las gestoras; verifícalos en la ficha oficial antes de invertir, ya que pueden cambiar.

> **En resumen**: inviertes en el MSCI World con un ETF o fondo indexado UCITS domiciliado en Irlanda. Los ETFs más usados son IWDA (TER 0,20%) y SWRD (0,12%). Como fondo indexado, el Vanguard Global Stock (0,18%), el Fidelity MSCI World (0,12%) o el Amundi Prime Global (0,05%, índice equivalente). Los ETFs en cualquier broker; los fondos, en MyInvestor con traspaso fiscal.

---

## Qué es el MSCI World y por qué es la base por defecto

El MSCI World agrupa más de 1.400 empresas grandes y medianas de 23 países desarrollados, cubriendo alrededor del 85% de la capitalización bursátil de esos mercados. EE.UU. pesa en torno al 70%, seguido de Japón, Reino Unido y el resto de Europa.

Su atractivo para el inversor indexado es la diversificación en un solo producto: en lugar de apostar por un país (como el S&P 500, 100% EE.UU.), replicas la economía desarrollada mundial. Por eso es la posición central de la mayoría de carteras Boglehead españolas. Si quieres entender el índice a fondo, lee [qué es el MSCI World](/blog/que-es-el-msci-world).

Su única "carencia": no incluye mercados emergentes. Lo abordamos al final.

---

## Los mejores ETFs de MSCI World para España

Todos replican el MSCI World, son de acumulación y están domiciliados en Irlanda (grado fiscal óptimo). La diferencia está en el TER y el método de réplica.

| ETF | Gestora | TER | Réplica | ISIN |
|---|---|---|---|---|
| **SWRD** | SPDR | **0,12 %** | Física | IE00BFY0GT14 |
| **MWRD** | Amundi | 0,12 % | Física | IE00BK1PV551 |
| XDWD | Xtrackers | 0,19 % | Sintética (swap) | IE00BJ0KDQ92 |
| **IWDA** | iShares | 0,20 % | Física | IE00B4L5Y983 |

El **SWRD** de SPDR y el **MWRD** de Amundi son los más baratos (0,12%). El **IWDA** de iShares es el más popular y con mayor patrimonio, lo que le da máxima liquidez. XDWD usa réplica sintética (swap), que puede mejorar el tracking pero añade una capa de riesgo de contraparte; los demás son de réplica física. Puedes comparar dos cualquiera en el [comparador de ETFs](/comparar) o ver la [categoría completa de ETFs MSCI World](/etfs/msci-world).

---

## Los fondos indexados de MSCI World (con traspaso fiscal)

Si prefieres un fondo indexado —para aprovechar el traspaso fiscal libre—, tienes tres opciones excelentes:

| Fondo | Gestora | TER | ISIN |
|---|---|---|---|
| **Amundi Prime Global** | Amundi | **0,05 %** | LU1931974692 |
| **Fidelity MSCI World Index** | Fidelity | 0,12 % | IE00BYX5MX67 |
| Vanguard Global Stock Index | Vanguard | 0,18 % | IE00B03HCZ61 |

El **Amundi Prime Global** es el más barato (0,05%); replica el índice Solactive GBS, funcionalmente equivalente al MSCI World. El **Fidelity MSCI World** y el **Vanguard Global Stock** replican el MSCI World clásico. Fichas: [Amundi Prime Global](/fondo/amundi-prime-global), [Fidelity MSCI World](/fondo/fidelity-msci-world) y [Vanguard Global Stock](/fondo/vanguard-global-stock). Más en la [guía de mejores fondos indexados](/blog/mejores-fondos-indexados-espana-2026).

---

## ETF o fondo: cuál elegir para el MSCI World

- **Fondo indexado** (Amundi Prime Global, Fidelity, Vanguard): permite **traspaso fiscal libre** —cambiar a otro fondo sin tributar—, aportaciones desde 1€ y compra a valor liquidativo. Ideal si vas a rebalancear o prevés cambiar de estrategia.
- **ETF** (SWRD, IWDA): comisiones de compra muy bajas en brokers como Trade Republic (0€), precio en tiempo real y planes de ahorro automáticos. Ideal para comprar y mantener.

La diferencia de coste anual es mínima; la decisión real es la del [traspaso fiscal](/blog/como-hacer-traspaso-fondos-espana) frente a la comodidad del ETF. Lo desarrollamos en [fondos indexados o ETFs](/blog/fondos-indexados-vs-etfs-espana).

---

## ¿MSCI World o All-World (con emergentes)?

Aquí va el matiz importante. El MSCI World cubre solo países desarrollados. Hay dos formas de completar la foto global:

- **MSCI World + un ETF de emergentes** (EIMI, VFEM) en un 10-20%: control total sobre la proporción, pero requiere rebalancear dos posiciones.
- **Un ETF All-World** como VWCE (FTSE All-World) o ISAC (MSCI ACWI): incluye desarrollados y emergentes en su proporción natural (~88/12) en un solo producto. Más simple.

Ninguna es "mejor" en abstracto: el MSCI World a secas es perfectamente válido (los emergentes son solo ~12% del mercado global y su aportación histórica es discutible), y el All-World es la opción más completa y cómoda. Lo comparamos en [MSCI World vs MSCI ACWI](/blog/msci-world-vs-msci-acwi-diferencias) y en [VWCE vs CSPX vs IWDA](/blog/vwce-vs-cspx-vs-iwda).

Si lo que buscas es exposición solo a EE.UU., mira la guía paralela: [cómo invertir en el S&P 500 desde España](/blog/como-invertir-sp500-espana).

---

## Dónde comprarlo

- **ETFs** (SWRD, IWDA): cualquier broker con acceso a bolsa europea. Trade Republic (0€ y planes de ahorro), DEGIRO, MyInvestor. Compara opciones en [mejor broker para ETFs en España](/blog/mejor-broker-etfs-espana-2026).
- **Fondos** (Amundi Prime Global, Fidelity, Vanguard): MyInvestor es la plataforma más usada, con traspaso fiscal y aportaciones desde 1€.

Una vez montada tu cartera, puedes [analizarla gratis](/analyzer) para ver tu exposición real por región y comprobar que encaja con lo que quieres. Sin registro y con los datos solo en tu navegador.

---

## Fuentes y lecturas complementarias

- [Qué es el MSCI World — BogleHub](/blog/que-es-el-msci-world) — El índice explicado a fondo: composición, países y por qué es tan popular.
- [Categoría: ETFs MSCI World — BogleHub](/etfs/msci-world) — Listado completo con TER y grado fiscal.
- [Mejores fondos indexados en España — BogleHub](/blog/mejores-fondos-indexados-espana-2026) — Incluye las opciones de fondos para el MSCI World.
- [Cómo invertir en el S&P 500 desde España — BogleHub](/blog/como-invertir-sp500-espana) — La guía paralela para quien prefiere concentrarse en EE.UU.
`,
  },
]
