/**
 * Glosario de términos financieros para inversores indexados en España.
 *
 * Cada entrada genera una página /glosario/[slug] con:
 *  - Definición breve (1-2 frases) usada como meta description
 *  - Definición extendida con ejemplo práctico
 *  - Enlaces a artículos y calculadoras relacionadas
 *  - FAQ opcional para enriquecer el contenido
 *
 * Criterio de selección: términos con volumen de búsqueda real en
 * español (Google Search Console y SEMrush) que aparecen en consultas
 * informativas ("qué es X", "X significado") muy difíciles de cubrir
 * desde un artículo de blog largo.
 */

export interface GlossaryFaq {
  q: string
  a: string
}

export interface GlossaryTerm {
  slug: string
  /** Término que aparecerá en el H1 y en el listado */
  term: string
  /** Sigla original si aplica, ej. "TER (Total Expense Ratio)" */
  fullForm?: string
  /** Categoría para agrupar en el índice */
  category:
    | 'productos'
    | 'fiscalidad'
    | 'metricas'
    | 'estrategias'
    | 'plataformas'
    | 'conceptos'
  /** Resumen de 1-2 frases usado como meta description */
  shortDefinition: string
  /** Definición extendida en markdown (1-3 párrafos) */
  longDefinition: string
  /** Ejemplo práctico en markdown */
  example?: string
  /** Slugs de artículos del blog relacionados (sin barra inicial) */
  relatedArticles?: string[]
  /** Rutas internas relacionadas (con barra inicial) */
  relatedLinks?: Array<{ label: string; href: string }>
  /** FAQs opcionales para emitir FAQPage schema */
  faq?: GlossaryFaq[]
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ---------------------------------------------------------------------------
  // Productos de inversión
  // ---------------------------------------------------------------------------
  {
    slug: 'etf',
    term: 'ETF',
    fullForm: 'ETF (Exchange Traded Fund)',
    category: 'productos',
    shortDefinition:
      'Un ETF es un fondo de inversión cotizado en bolsa que replica un índice y se compra y vende como una acción a precio de mercado en tiempo real.',
    longDefinition:
      'Un ETF (Exchange Traded Fund) es un instrumento de inversión que combina características de los fondos de inversión tradicionales (gestión colectiva, diversificación) y de las acciones (cotización en bolsa, liquidez intradía). La gran mayoría de ETFs replican un índice — como el MSCI World, el S&P 500 o el FTSE All-World — y son la herramienta favorita de los inversores indexados (Bogleheads) por su bajo coste, transparencia y eficiencia fiscal.\n\nA diferencia de los fondos de inversión tradicionales en España, los ETFs **no permiten traspaso fiscal libre**: cada venta realiza ganancias o pérdidas que tributan ese año. Esta diferencia es clave a la hora de elegir entre ETF y fondo indexado.',
    example:
      'VWCE (Vanguard FTSE All-World) es un ETF que invierte en más de 3.700 empresas globales. Si compras 100 participaciones a 100€, posees una fracción microscópica de cada una de esas empresas, con un coste anual de gestión del 0,22% (TER).',
    relatedArticles: [
      'fondos-indexados-vs-etfs-espana',
      'como-elegir-tu-primer-etf-espana-2026',
    ],
    relatedLinks: [
      { label: 'Catálogo de ETFs UCITS para España', href: '/etf' },
      { label: 'Mejores ETFs MSCI World', href: '/etfs/msci-world' },
    ],
    faq: [
      {
        q: '¿En qué se diferencia un ETF de un fondo de inversión tradicional?',
        a: 'Los fondos tradicionales se compran y venden a precio de cierre del día (no en tiempo real), no cotizan en bolsa, y en España permiten traspaso entre fondos sin tributar. Los ETFs cotizan en bolsa, tienen precio en tiempo real y cada venta tributa.',
      },
      {
        q: '¿Los ETFs son adecuados para inversores que empiezan?',
        a: 'Sí. Un único ETF global de bajo coste (como VWCE, IWDA o SWRD) puede ser toda la cartera de renta variable para un inversor que empieza, con diversificación máxima y coste mínimo.',
      },
    ],
  },
  {
    slug: 'ucits',
    term: 'UCITS',
    fullForm: 'UCITS (Undertakings for Collective Investment in Transferable Securities)',
    category: 'productos',
    shortDefinition:
      'UCITS es el marco regulatorio europeo que estandariza los fondos de inversión y ETFs para que puedan venderse en toda la Unión Europea con garantías al inversor particular.',
    longDefinition:
      'UCITS es una directiva europea que regula los fondos de inversión y ETFs comercializados al inversor particular. Establece reglas estrictas sobre diversificación (un solo activo no puede pesar más del 10% del fondo), liquidez, gestión de riesgos y transparencia. Un fondo o ETF "UCITS" puede venderse libremente en cualquier país de la UE.\n\nPara un inversor español, comprar productos UCITS es la opción habitual y recomendada porque garantiza un nivel de protección uniforme. Los ETFs domiciliados en Irlanda y Luxemburgo (los más populares) son UCITS, mientras que muchos ETFs americanos populares (como VTI o SPY) no lo son y, por normativa MiFID II, no son comprables por inversores particulares europeos.',
    example:
      'CSPX (iShares Core S&P 500 UCITS ETF) es un ETF UCITS domiciliado en Irlanda. SPY (SPDR S&P 500 ETF Trust) es el equivalente americano, no UCITS y no comprable directamente por inversores particulares en España.',
    relatedArticles: ['como-elegir-tu-primer-etf-espana-2026'],
  },
  {
    slug: 'isin',
    term: 'ISIN',
    fullForm: 'ISIN (International Securities Identification Number)',
    category: 'productos',
    shortDefinition:
      'El ISIN es el código internacional de 12 caracteres que identifica de forma única un instrumento financiero (acción, ETF, fondo) a nivel mundial.',
    longDefinition:
      'El ISIN (International Securities Identification Number) es un identificador único de 12 caracteres alfanuméricos asignado a cada instrumento financiero del mundo. Empieza con un código de país de dos letras (IE para Irlanda, LU para Luxemburgo, US para Estados Unidos), seguido de 9 caracteres del identificador nacional y termina con un dígito de control.\n\nPara un inversor en ETFs, el ISIN es la forma más fiable de identificar exactamente qué fondo estás comprando. El mismo ETF puede tener distintos tickers según la bolsa en la que cotice (por ejemplo CSPX en LSE y SXR8 en Xetra), pero siempre tiene el mismo ISIN. Verificar el ISIN evita confundir dos productos similares pero distintos.',
    example:
      'El ETF Vanguard FTSE All-World Acc tiene ISIN IE00B3RBWM25. La "IE" inicial indica que está domiciliado en Irlanda. Este mismo ETF cotiza como VWCE en Xetra, VWRA en LSE y VWRP en otras bolsas — todos comparten el ISIN.',
    faq: [
      {
        q: '¿Por qué el ISIN empieza con dos letras?',
        a: 'Las dos primeras letras indican el país donde está domiciliado el instrumento (no donde cotiza). Para los inversores españoles, los ISIN más relevantes son los que empiezan por IE (Irlanda) y LU (Luxemburgo), por motivos fiscales.',
      },
    ],
  },
  {
    slug: 'etc',
    term: 'ETC',
    fullForm: 'ETC (Exchange Traded Commodity)',
    category: 'productos',
    shortDefinition:
      'Un ETC es un producto cotizado en bolsa similar a un ETF pero que replica el precio de una materia prima (oro, plata, petróleo). Está respaldado físicamente o por derivados.',
    longDefinition:
      'Un ETC (Exchange Traded Commodity) es la versión para materias primas de un ETF. La diferencia técnica es legal: los ETC se estructuran como notas de deuda emitidas por una entidad, respaldadas por la materia prima subyacente. Para el inversor particular el comportamiento es prácticamente idéntico al de un ETF.\n\nLos ETC más populares en España son los de oro físico (SGLN, IGLN, 4GLD), respaldados al 100% por lingotes custodiados en bóvedas auditadas. Otros ETC siguen materias primas como plata, petróleo o cestas amplias. Fiscalmente tributan igual que un ETF: las ganancias y pérdidas patrimoniales se declaran en la base del ahorro del IRPF.',
    example:
      'SGLN (iShares Physical Gold ETC) es un ETC respaldado por oro físico custodiado en Londres. Comprar una participación equivale a poseer una fracción de un lingote real.',
    relatedLinks: [{ label: 'Mejores ETC de oro físico para España', href: '/etfs/oro' }],
  },
  {
    slug: 'fondo-indexado',
    term: 'Fondo indexado',
    category: 'productos',
    shortDefinition:
      'Un fondo indexado es un fondo de inversión que replica un índice (como el MSCI World) en lugar de seleccionar activamente las empresas. Tiene coste mucho menor que un fondo de gestión activa.',
    longDefinition:
      'Un fondo indexado es un fondo de inversión cuya estrategia es replicar la composición y rentabilidad de un índice bursátil específico, comprando las mismas acciones (o una muestra representativa) en las mismas proporciones que el índice. A diferencia de la gestión activa, no intenta "batir al mercado": busca igualarlo al menor coste posible.\n\nEn España, los fondos indexados disfrutan de una ventaja fiscal clave sobre los ETFs: **el traspaso entre fondos no tributa**. Esto significa que puedes mover dinero entre distintos fondos indexados sin pasar por Hacienda, difiriendo el IRPF hasta el momento del rescate real. Esta ventaja es especialmente valiosa para inversores de largo plazo que prevén rebalancear o cambiar de fondo varias veces.',
    example:
      'El Amundi Prime Global (TER 0,05%) replica el índice Solactive Global Markets, equivalente al MSCI World. Disponible en MyInvestor desde 1€, permite traspaso fiscal libre a otro fondo indexado sin pagar IRPF por las plusvalías acumuladas.',
    relatedArticles: [
      'amundi-prime-global-analisis',
      'fondos-indexados-vs-etfs-espana',
    ],
  },
  // ---------------------------------------------------------------------------
  // Métricas y conceptos técnicos
  // ---------------------------------------------------------------------------
  {
    slug: 'ter',
    term: 'TER',
    fullForm: 'TER (Total Expense Ratio)',
    category: 'metricas',
    shortDefinition:
      'El TER es el coste anual total de un fondo o ETF expresado como porcentaje del patrimonio. Incluye comisión de gestión, custodia, auditoría y otros gastos operativos.',
    longDefinition:
      'El TER (Total Expense Ratio) es la métrica fundamental para comparar el coste de fondos y ETFs. Se expresa como porcentaje anual sobre el patrimonio. Un TER del 0,20% sobre 10.000€ supone un coste de 20€ al año, descontado proporcionalmente del valor del fondo.\n\nPara el inversor indexado, el TER es uno de los pocos factores que se pueden controlar y predecir con certeza. La rentabilidad del mercado es incierta, pero el TER se paga sí o sí. Por eso la diferencia entre un fondo con TER del 0,07% y otro del 1,5% puede traducirse en decenas de miles de euros en una cartera mantenida durante 30 años.',
    example:
      'Comparativa de TER en ETFs MSCI World: SWRD 0,12%, MWRD 0,12%, XDWD 0,19%, IWDA 0,20%. Sobre una cartera de 100.000€ a 30 años con interés compuesto del 7%, la diferencia entre 0,12% y 0,20% supera los 8.000€ acumulados.',
    relatedArticles: ['como-elegir-tu-primer-etf-espana-2026', 'mejores-etfs-espana-2026'],
    relatedLinks: [
      { label: 'Calculadora de interés compuesto', href: '/calculadora/interes-compuesto' },
    ],
    faq: [
      {
        q: '¿Qué TER se considera bajo en un ETF?',
        a: 'Para ETFs de renta variable global, un TER por debajo del 0,20% se considera bajo. Por debajo del 0,10% es excelente. Para renta fija de gobierno, busca TER por debajo del 0,15%. Por encima del 0,50% un ETF indexado es difícilmente justificable en 2026.',
      },
      {
        q: '¿El TER incluye los costes de compra y venta del broker?',
        a: 'No. El TER cubre solo los costes internos del fondo. Las comisiones que cobra el broker por comprar o vender el ETF (entre 0€ en Trade Republic y 0,50-2€ en DEGIRO) son aparte y no aparecen en el TER.',
      },
    ],
  },
  {
    slug: 'tracking-error',
    term: 'Tracking error',
    category: 'metricas',
    shortDefinition:
      'El tracking error mide cuánto se desvía la rentabilidad de un ETF de la rentabilidad del índice que replica. Un tracking error bajo indica una replicación precisa.',
    longDefinition:
      'El tracking error es una métrica que cuantifica la calidad de replicación de un fondo indexado o ETF. Se expresa como la desviación típica de la diferencia entre la rentabilidad del fondo y la rentabilidad del índice subyacente. Un tracking error de 0,5% significa que el ETF se desvía típicamente medio punto del índice año tras año, en una dirección u otra.\n\nUn concepto relacionado pero distinto es el **tracking difference**: la diferencia acumulada entre el retorno del ETF y el retorno del índice. Si el TER de un ETF es 0,20%, idealmente su tracking difference es −0,20% (el ETF rinde 0,20 puntos menos que el índice por las comisiones). Los ETFs muy eficientes pueden tener tracking difference cercano a 0 o incluso ligeramente positivo gracias al préstamo de valores.',
    example:
      'IWDA (iShares Core MSCI World) tiene un tracking difference cercano a 0 a pesar de su TER del 0,20%, gracias a la optimización del préstamo de valores y a una gestión muy eficiente.',
  },
  {
    slug: 'nav',
    term: 'NAV',
    fullForm: 'NAV (Net Asset Value)',
    category: 'metricas',
    shortDefinition:
      'El NAV es el valor liquidativo de una participación de un fondo o ETF: el patrimonio total del fondo dividido entre el número de participaciones.',
    longDefinition:
      'El NAV (Net Asset Value) o valor liquidativo es el precio real de una participación de un fondo, calculado dividiendo el patrimonio total del fondo entre el número total de participaciones en circulación. Para los fondos de inversión tradicionales, el NAV se calcula una vez al día tras el cierre de los mercados y es el precio al que compras y vendes.\n\nPara los ETFs, el NAV se calcula también al cierre, pero durante el día de negociación los ETFs cotizan a precios de mercado que pueden estar ligeramente por encima (prima) o por debajo (descuento) del NAV teórico. Los mercados de creación y reembolso de participaciones por parte de los participantes autorizados (Authorized Participants) suelen mantener el precio de mercado muy cerca del NAV, especialmente en ETFs con alto volumen de negociación.',
  },
  {
    slug: 'aum',
    term: 'AUM',
    fullForm: 'AUM (Assets Under Management)',
    category: 'metricas',
    shortDefinition:
      'AUM significa "activos bajo gestión": el valor total del patrimonio que gestiona un fondo, ETF o entidad financiera. Es un indicador de tamaño y popularidad.',
    longDefinition:
      'AUM (Assets Under Management) es el patrimonio total que gestiona una entidad financiera o un producto específico. Para un fondo o ETF, el AUM se expresa habitualmente en millones o miles de millones de dólares o euros.\n\nUn AUM alto suele indicar un fondo establecido, con buena liquidez y menor riesgo de cierre por baja rentabilidad para la gestora. Por debajo de 100 millones de dólares, un ETF puede tener riesgo de ser liquidado por la gestora. Por encima de 1.000 millones, suele considerarse un producto consolidado con presencia segura en el mercado.',
    example:
      'IWDA (iShares Core MSCI World) tiene un AUM superior a 75.000 millones de USD, lo que lo convierte en uno de los ETFs UCITS más grandes del mundo. VWCE supera los 15.000 millones de USD.',
  },
  {
    slug: 'volatilidad',
    term: 'Volatilidad',
    category: 'metricas',
    shortDefinition:
      'La volatilidad es una medida estadística de cuánto fluctúa el precio de un activo. Mayor volatilidad indica mayor riesgo y mayor potencial de ganancia o pérdida en el corto plazo.',
    longDefinition:
      'La volatilidad se calcula como la desviación típica de los retornos del activo en un periodo determinado, normalmente anualizada. Un activo con volatilidad anual del 20% se desvía típicamente un 20% arriba o abajo de su retorno medio en un año.\n\nLa renta variable global (MSCI World) tiene volatilidad histórica anual de aproximadamente 15-20%. La renta fija de calidad ronda el 3-7%. El oro alrededor del 15-18%. La volatilidad no es estrictamente equivalente al riesgo, pero es la métrica más usada para aproximarlo, especialmente en el corto plazo.',
    example:
      'Si una cartera tiene rentabilidad esperada anual del 7% y volatilidad del 15%, en aproximadamente 2 de cada 3 años el retorno real estará entre −8% y +22% (1 desviación típica). En el peor 5% de los años, podría caer más del 23%.',
    relatedLinks: [
      { label: 'Calculadora FIRE Monte Carlo', href: '/calculadora/fire-monte-carlo' },
    ],
  },
  {
    slug: 'drawdown',
    term: 'Drawdown',
    category: 'metricas',
    shortDefinition:
      'El drawdown es la caída acumulada de una cartera desde su pico máximo hasta el siguiente mínimo, expresada en porcentaje. Mide la peor pérdida temporal experimentada.',
    longDefinition:
      'El drawdown máximo de una cartera es la mayor caída porcentual que ha sufrido desde un máximo histórico hasta un mínimo posterior antes de recuperarse. Es una métrica clave para evaluar el riesgo real que puede soportar un inversor desde el punto de vista psicológico.\n\nUna cartera 100% renta variable global (MSCI World) ha tenido drawdowns máximos históricos de aproximadamente 50-55% (2008, 2020 brevemente). Una cartera 60/40 raramente supera el 30% de drawdown. Conocer el drawdown máximo realista de tu cartera es esencial para no abandonarla en el peor momento.',
    example:
      'En la crisis financiera de 2008, el S&P 500 sufrió un drawdown máximo del 56% desde el pico de octubre 2007 hasta el mínimo de marzo 2009. Tardó 5 años en recuperar el nivel previo.',
  },
  // ---------------------------------------------------------------------------
  // Fiscalidad
  // ---------------------------------------------------------------------------
  {
    slug: 'irpf-ahorro',
    term: 'IRPF del ahorro',
    category: 'fiscalidad',
    shortDefinition:
      'El IRPF del ahorro es la base imponible que grava las rentas del capital mobiliario (dividendos, intereses) y las ganancias patrimoniales (venta de fondos, ETFs, acciones) en España.',
    longDefinition:
      'En España, las ganancias y pérdidas patrimoniales derivadas de la transmisión de fondos, ETFs o acciones, junto con los dividendos e intereses, se integran en la **base imponible del ahorro** del IRPF. A diferencia de la base general (que grava el salario), la base del ahorro tiene una escala progresiva con tipos más bajos.\n\nEscala del IRPF del ahorro en 2026: 19% hasta 6.000€, 21% entre 6.000€ y 50.000€, 23% entre 50.000€ y 200.000€, 27% entre 200.000€ y 300.000€, 28% por encima de 300.000€. Es una escala progresiva: cada tramo grava solo la parte de la ganancia que cae en él.',
    example:
      'Si vendes ETFs con una ganancia de 10.000€ en 2026, pagas el 19% sobre los primeros 6.000€ (1.140€) y el 21% sobre los 4.000€ restantes (840€). Total: 1.980€, no 10.000 × 21% = 2.100€.',
    relatedArticles: ['como-declarar-etfs-hacienda', 'fiscalidad-etfs-espana-guia-completa'],
    relatedLinks: [
      { label: 'Calculadora IRPF venta de fondos y ETFs', href: '/calculadora/irpf-venta-fondos' },
    ],
  },
  {
    slug: 'fifo',
    term: 'FIFO',
    fullForm: 'FIFO (First In, First Out)',
    category: 'fiscalidad',
    shortDefinition:
      'FIFO es el criterio fiscal que aplica Hacienda al vender solo una parte de un fondo o ETF comprado en distintas fechas: se consideran vendidas primero las participaciones más antiguas.',
    longDefinition:
      'FIFO (First In, First Out) es el criterio fiscal obligatorio en España para calcular la ganancia o pérdida patrimonial cuando vendes solo una parte de un valor adquirido en distintos momentos y precios. Hacienda asume que vendiste primero las participaciones más antiguas, lo que afecta directamente al precio de adquisición usado para calcular la ganancia.\n\nEsto tiene implicaciones prácticas: si tus primeras compras fueron a precios más bajos (típico de una estrategia DCA a largo plazo en mercado alcista), la ganancia calculada para una venta parcial puede ser mayor que si se aplicara el precio medio o el último precio de compra.',
    example:
      'Compraste 50 acciones de VWCE en 2023 a 80€ y 50 más en 2024 a 100€. Vendes 50 en 2025 a 120€. FIFO considera que vendiste las de 2023: ganancia = (50×120) − (50×80) = 2.000€. Si se aplicara LIFO sería solo 1.000€.',
    relatedArticles: ['como-declarar-etfs-hacienda'],
  },
  {
    slug: 'domicilio-fiscal',
    term: 'Domicilio fiscal de un ETF',
    category: 'fiscalidad',
    shortDefinition:
      'El domicilio fiscal de un ETF es el país donde está registrado legalmente. Determina las retenciones en origen sobre dividendos y la eficiencia fiscal para el inversor final.',
    longDefinition:
      'El domicilio fiscal de un ETF es un dato crucial pero muchas veces ignorado por inversores principiantes. Determina qué convenios fiscales aplica el fondo al cobrar dividendos de las empresas en cartera. Para inversores españoles, los dos domicilios más relevantes son:\n\n- **Irlanda (ISIN empieza por IE)**: el más eficiente. Aprovecha el convenio fiscal Irlanda-EE.UU. que reduce la retención sobre dividendos americanos del 30% al 15%.\n- **Luxemburgo (ISIN empieza por LU)**: menos eficiente para dividendos americanos. Retención del 30% en origen.\n\nPara una cartera donde el 60-65% son empresas americanas (caso típico de MSCI World o FTSE All-World), elegir un ETF irlandés en lugar de luxemburgués puede ahorrar 0,15-0,25% anual en retenciones, lo que se acumula significativamente a largo plazo.',
    example:
      'VWCE (ISIN IE00B3RBWM25) está domiciliado en Irlanda. iShares MSCI World (CWLD, ISIN LU0392494562) está en Luxemburgo. Para el inversor español, VWCE es fiscalmente más eficiente a pesar de su TER ligeramente superior.',
    relatedArticles: ['como-elegir-tu-primer-etf-espana-2026', 'fiscalidad-etfs-espana-guia-completa'],
  },
  {
    slug: 'plan-pensiones',
    term: 'Plan de pensiones',
    category: 'fiscalidad',
    shortDefinition:
      'Un plan de pensiones es un producto de ahorro a largo plazo con ventaja fiscal: las aportaciones reducen tu base imponible del IRPF. Al rescatar, tributan como rendimientos del trabajo.',
    longDefinition:
      'Los planes de pensiones individuales en España permiten aportar hasta 1.500€ anuales (límite vigente en 2026, reducido desde los 8.000€ anteriores a 2021), deduciendo directamente esa cantidad de la base imponible general del IRPF. Esto supone un ahorro fiscal inmediato del 19-47% según tu tipo marginal.\n\nLa contrapartida es que al rescatar el plan, todo el dinero (aportaciones + ganancias) tributa como **rendimientos del trabajo**, no como rentas del ahorro. Esto puede generar un impacto fiscal alto si se rescata todo de golpe. La estrategia óptima es coordinar el rescate con otros ingresos para no saturar los tipos marginales.',
    example:
      'Si tu marginal del IRPF es del 37% y aportas 1.500€ al plan de pensiones, tu factura fiscal baja en 555€ ese año. El coste real de tu aportación es 945€ en lugar de 1.500€.',
    relatedArticles: [
      'plan-pensiones-indexado-espana-2026',
      'plan-de-pensiones-vs-fondo-indexado',
    ],
  },
  // ---------------------------------------------------------------------------
  // Estrategias
  // ---------------------------------------------------------------------------
  {
    slug: 'boglehead',
    term: 'Boglehead',
    category: 'estrategias',
    shortDefinition:
      'Un Boglehead es un inversor que sigue la filosofía de John Bogle (fundador de Vanguard): invertir en fondos indexados de bajo coste a largo plazo y no intentar batir al mercado.',
    longDefinition:
      'La filosofía Boglehead se basa en tres pilares: (1) **invertir en fondos indexados** que repliquen mercados amplios al menor coste posible, (2) **diversificar globalmente** entre clases de activos (renta variable, renta fija) y regiones, (3) **mantener la disciplina** a largo plazo sin intentar predecir el mercado ni reaccionar a las caídas.\n\nLa filosofía toma su nombre de John Bogle, fundador de Vanguard y pionero de la indexación pasiva. La idea central es contraintuitiva pero está respaldada por décadas de evidencia: la gestión activa, en promedio, no supera al mercado después de comisiones. Para el inversor particular, lo más rentable es replicar al mercado a coste mínimo.',
    example:
      'Una cartera Boglehead simple para un inversor español: 80% VWCE (renta variable global) + 20% AGGH (renta fija global hedged EUR). Coste anual total ~0,15%. Sin operaciones más allá del rebalanceo anual.',
    relatedArticles: [
      'bogleheads-espana-guia-completa',
      'cartera-boglehead-3-fondos-espana',
    ],
  },
  {
    slug: 'dca',
    term: 'DCA',
    fullForm: 'DCA (Dollar Cost Averaging)',
    category: 'estrategias',
    shortDefinition:
      'DCA es la estrategia de invertir una cantidad fija periódicamente (por ejemplo, 200€ al mes) en vez de invertir todo el dinero de golpe. Suaviza el efecto de la volatilidad.',
    longDefinition:
      'El Dollar Cost Averaging (DCA), o promedio del coste en español, consiste en dividir una inversión en aportaciones periódicas iguales en lugar de invertir toda la cantidad de una vez. La premisa es psicológica y operativa: eliminas la decisión de "cuándo" entrar al mercado, y promedias el precio de entrada en distintos puntos del ciclo.\n\nDesde el punto de vista matemático, el lump sum (invertir todo de golpe) supera al DCA en aproximadamente 2/3 de los periodos históricos, simplemente porque el mercado tiende a subir más que a bajar. Sin embargo, DCA es la única estrategia práctica cuando inviertes el ahorro mensual de tu nómina: no tienes el dinero hoy para hacer lump sum.',
    example:
      'En lugar de invertir 12.000€ de golpe en enero, aportas 1.000€ cada mes durante 12 meses. Si el mercado cae en marzo, compras más participaciones; si sube en julio, compras menos. El precio medio de tus participaciones será una media de los 12 precios mensuales.',
    relatedArticles: ['dca-vs-lump-sum-aportar-mensual'],
    relatedLinks: [
      { label: 'Calculadora de interés compuesto', href: '/calculadora/interes-compuesto' },
    ],
  },
  {
    slug: 'rebalanceo',
    term: 'Rebalanceo',
    category: 'estrategias',
    shortDefinition:
      'El rebalanceo es el ajuste periódico de la cartera para devolver cada activo a su peso objetivo. Vendes lo que ha subido (caro) y compras lo que ha bajado (barato).',
    longDefinition:
      'El rebalanceo es el proceso de devolver tu cartera a la asignación de activos planificada cuando los movimientos del mercado la han desviado. Si tu cartera objetivo es 80% renta variable y 20% renta fija, y tras un año de subidas la renta variable representa el 85%, debes vender un 5% de renta variable y comprar renta fija para volver al 80/20.\n\nMatemáticamente, el rebalanceo te obliga a "vender alto y comprar bajo" de forma sistemática y sin emoción. A largo plazo aporta entre 0,2% y 0,8% de rentabilidad adicional anual frente a no rebalancear, y reduce el riesgo de cartera al mantener el perfil de riesgo planificado.\n\nLas estrategias más comunes: rebalanceo por calendario (anual o semestral) o rebalanceo por umbral (cuando un activo se desvía más del 5-10% de su objetivo).',
    example:
      'Cartera objetivo: 80% VWCE + 20% AGGH. Después de un año, VWCE pesa el 86% y AGGH el 14%. El rebalanceo vende un 6% de VWCE (vende caro) y compra un 6% de AGGH (compra barato) para volver al 80/20.',
    relatedArticles: ['como-rebalancear-cartera-indexada'],
  },
  {
    slug: 'fire',
    term: 'FIRE',
    fullForm: 'FIRE (Financial Independence, Retire Early)',
    category: 'estrategias',
    shortDefinition:
      'FIRE es el movimiento de independencia financiera y jubilación anticipada: acumular suficiente patrimonio para vivir de los rendimientos de la cartera, sin necesidad de trabajar.',
    longDefinition:
      'FIRE (Financial Independence, Retire Early) es una filosofía de vida y planificación financiera que busca alcanzar la libertad económica antes de la edad tradicional de jubilación. La idea central: ahorrar e invertir una proporción alta de los ingresos (25-50%) durante 10-20 años para acumular un patrimonio que genere rentas suficientes para vivir sin trabajar.\n\nLa "regla del 4%" es el atajo clásico para calcular el capital necesario: 25 veces tu gasto anual. Si gastas 30.000€/año, necesitas 750.000€ invertidos. En España, la pensión pública reduce dramáticamente esta cifra: si esperas cobrar 1.500€/mes de pensión a los 65, solo necesitas que la cartera cubra la diferencia hasta entonces.',
    example:
      'Un inversor español que gasta 25.000€/año y espera pensión pública de 15.000€/año a los 65, necesita una cartera de aproximadamente 250.000€ para vivir desde los 50 hasta los 65 retirando 4% anual. La pensión pública cubre el resto a partir de los 65.',
    relatedArticles: ['fire-espana-cuanto-necesitas'],
    relatedLinks: [
      { label: 'Calculadora FIRE Monte Carlo', href: '/calculadora/fire-monte-carlo' },
    ],
  },
  {
    slug: 'asset-allocation',
    term: 'Asset allocation',
    category: 'estrategias',
    shortDefinition:
      'Asset allocation es la distribución de tu cartera entre distintas clases de activos (renta variable, renta fija, oro, materias primas). Es la decisión más importante para la rentabilidad y riesgo final.',
    longDefinition:
      'El asset allocation o asignación de activos es la decisión sobre qué porcentaje de tu cartera asignas a cada clase de activo principal: renta variable (acciones), renta fija (bonos), oro, materias primas, inmobiliario, liquidez. Esta decisión determina aproximadamente el 90% de la variabilidad de tu rentabilidad a largo plazo, según estudios académicos clásicos.\n\nLos asset allocations más comunes:\n- **100/0** (100% renta variable): máxima rentabilidad esperada, máxima volatilidad. Para inversores jóvenes con horizonte muy largo.\n- **80/20**: estándar Boglehead moderado.\n- **60/40**: clásico equilibrado, popular en planes de pensiones.\n- **Cartera permanente** (25/25/25/25): renta variable, bonos largo plazo, oro y liquidez. Robustez sobre rentabilidad máxima.',
    example:
      'Un Boglehead de 35 años podría usar 80/20: 80% en VWCE (renta variable global) y 20% en AGGH (renta fija global hedged EUR). A los 55, podría ajustar a 60/40 para reducir volatilidad cerca de la jubilación.',
    relatedArticles: [
      'cartera-boglehead-3-fondos-espana',
      'cartera-permanente-harry-browne-espana',
    ],
  },
  {
    slug: 'diversificacion',
    term: 'Diversificación',
    category: 'estrategias',
    shortDefinition:
      'Diversificación es la práctica de repartir la inversión entre muchos activos (empresas, países, sectores, clases de activo) para reducir el riesgo sin sacrificar rentabilidad esperada.',
    longDefinition:
      'La diversificación es uno de los principios fundamentales de la inversión moderna, formulado matemáticamente por Harry Markowitz en 1952. La idea: combinar activos cuyas rentabilidades no estén perfectamente correlacionadas reduce el riesgo total de la cartera sin reducir la rentabilidad esperada proporcionalmente.\n\nPara el inversor indexado, la diversificación se consigue automáticamente a través de ETFs amplios. Un único ETF MSCI World te da exposición a 1.500 empresas en 23 países. Un FTSE All-World añade emergentes. Combinar renta variable con renta fija añade diversificación entre clases de activo. La diversificación geográfica (no concentrar todo en España o Europa) es crítica para evitar el sesgo doméstico.',
    example:
      'En lugar de comprar 10 acciones del IBEX 35 con 50.000€, comprar un ETF VWCE da exposición a más de 3.700 empresas globales con el mismo capital. El riesgo de que una empresa concreta quiebre es prácticamente irrelevante.',
    relatedArticles: ['solapamiento-etfs-error-silencioso'],
  },
  // ---------------------------------------------------------------------------
  // Plataformas y servicios
  // ---------------------------------------------------------------------------
  {
    slug: 'broker',
    term: 'Broker',
    category: 'plataformas',
    shortDefinition:
      'Un broker es la entidad intermediaria a través de la cual compras y vendes activos financieros (acciones, ETFs, fondos). En España, los más populares son Trade Republic, DEGIRO y MyInvestor.',
    longDefinition:
      'Un broker es una entidad financiera regulada que actúa como intermediario entre el inversor particular y los mercados financieros. Te da acceso a comprar y vender acciones, ETFs, fondos y otros activos. En España, los brokers más usados por inversores indexados en 2026 son:\n\n- **Trade Republic** (banco alemán, BaFin): 0€ por orden, planes de ahorro automáticos\n- **DEGIRO** (broker holandés, AFM): 0,50€ + 0,004% por orden\n- **MyInvestor** (banco español, CNMV): el único con fondos indexados Vanguard/Amundi y traspaso fiscal libre\n\nLa elección del broker afecta a las comisiones, la oferta de productos y la fiscalidad operativa.',
    relatedArticles: [
      'degiro-vs-trade-republic-vs-myinvestor-2026',
      'trade-republic-opinion-2026',
      'myinvestor-opinion-2026',
    ],
  },
  {
    slug: 'roboadvisor',
    term: 'Roboadvisor',
    category: 'plataformas',
    shortDefinition:
      'Un roboadvisor es un servicio de gestión automatizada de carteras que invierte tu dinero en fondos indexados según tu perfil de riesgo, rebalanceando automáticamente. En España: Indexa Capital, Finizens, MyInvestor.',
    longDefinition:
      'Un roboadvisor es una plataforma digital que ofrece gestión automatizada de carteras de inversión basada en fondos indexados de bajo coste. Completas un cuestionario de perfil inversor, el algoritmo te asigna una cartera entre el 1 (muy conservador) y el 10 (máximo riesgo), y la plataforma se encarga del resto: ejecutar compras, rebalancear, reinvertir dividendos.\n\nVentajas: simplicidad total, automatización, rebalanceo sistemático, evita errores emocionales. Desventajas: comisión anual del 0,40-0,60% que se suma al TER de los fondos subyacentes, lo que lo hace más caro que gestionar una cartera DIY (~0,15%) pero significativamente más barato que un fondo de gestión activa bancario (~1,5%).',
    example:
      'Indexa Capital, el roboadvisor más usado en España, gestiona más de 2.000 millones de euros. Cobra entre el 0,40% y el 0,60% anual (todo incluido) y rebalancea las carteras automáticamente cuando se desvían del peso objetivo.',
    relatedArticles: [
      'indexa-capital-opinion-2026',
      'finizens-vs-indexa-capital-2026',
      'roboadvisors-espana-merecen-comision',
    ],
    relatedLinks: [
      { label: 'Comparador roboadvisor vs DIY', href: '/calculadora/roboadvisor-vs-diy' },
    ],
  },
  // ---------------------------------------------------------------------------
  // Conceptos generales
  // ---------------------------------------------------------------------------
  {
    slug: 'interes-compuesto',
    term: 'Interés compuesto',
    category: 'conceptos',
    shortDefinition:
      'El interés compuesto es el mecanismo por el que los rendimientos generados por una inversión se reinvierten y a su vez generan más rendimientos. Es el motor principal del crecimiento del patrimonio a largo plazo.',
    longDefinition:
      'El interés compuesto convierte el crecimiento lineal del interés simple en crecimiento exponencial. En lugar de ganar siempre el mismo interés sobre el capital inicial, cada año los intereses generados se suman al capital y al año siguiente generan a su vez nuevos intereses.\n\nA 30 años con un 7% anual, una inversión inicial de 10.000€ se convierte en aproximadamente 76.000€. Sin interés compuesto (interés simple), serían solo 31.000€. La diferencia de 45.000€ es exclusivamente el efecto de los intereses sobre intereses. Por eso el tiempo es el ingrediente más importante de cualquier plan de inversión a largo plazo.',
    example:
      'Inviertes 10.000€ al 7% anual. Año 1: ganas 700€, saldo 10.700€. Año 2: ganas el 7% de 10.700€ = 749€, saldo 11.449€. Año 30: saldo ~76.000€. El crecimiento es exponencial, no lineal.',
    relatedArticles: ['interes-compuesto-inversion'],
    relatedLinks: [
      { label: 'Calculadora de interés compuesto', href: '/calculadora/interes-compuesto' },
    ],
  },
  {
    slug: 'msci-world',
    term: 'MSCI World',
    category: 'conceptos',
    shortDefinition:
      'El MSCI World es un índice bursátil que incluye aproximadamente 1.500 grandes y medianas empresas de 23 países desarrollados. Cubre alrededor del 85% de la capitalización bursátil de mercados desarrollados.',
    longDefinition:
      'El MSCI World es el índice de referencia más usado para invertir de forma indexada en países desarrollados. Incluye unas 1.500 empresas grandes y medianas de 23 economías avanzadas (EE.UU., Japón, Reino Unido, Canadá, Suiza, Francia, Alemania, etc.), ponderadas por capitalización bursátil.\n\nNo incluye mercados emergentes (China, India, Brasil), lo que sería el MSCI ACWI o el FTSE All-World. EE.UU. representa aproximadamente el 70% del MSCI World debido a su gran capitalización. Los sectores más representados son tecnología (~24%), financiero (~14%) y salud (~13%).',
    example:
      'ETFs MSCI World disponibles en España: IWDA (TER 0,20%), SWRD (TER 0,12%), MWRD (TER 0,12%), XDWD (TER 0,19%). Todos son irlandeses, de acumulación y replican el mismo índice.',
    relatedArticles: ['que-es-el-msci-world'],
    relatedLinks: [{ label: 'Mejores ETFs MSCI World', href: '/etfs/msci-world' }],
  },
  {
    slug: 'sp500',
    term: 'S&P 500',
    category: 'conceptos',
    shortDefinition:
      'El S&P 500 es el índice bursátil de las 500 mayores empresas cotizadas en Estados Unidos. Es el indicador más seguido del mercado americano y uno de los benchmarks más importantes del mundo.',
    longDefinition:
      'El S&P 500 (Standard & Poor\'s 500) es un índice de las 500 empresas más grandes de EE.UU. cotizadas en el NYSE o el Nasdaq, ponderado por capitalización bursátil. Es el benchmark de referencia para evaluar el mercado americano.\n\nA diferencia del Nasdaq 100 (~100 empresas, sesgo tecnológico) o el Dow Jones (~30 empresas, ponderado por precio), el S&P 500 representa una visión amplia y diversificada de la economía americana. Las 10 mayores empresas (Apple, Microsoft, Nvidia, Amazon, Google, Meta, Berkshire Hathaway, Eli Lilly, Tesla, JP Morgan) suelen pesar entre el 30-35% del índice.',
    example:
      'ETFs S&P 500 disponibles en España: CSPX/SXR8 (iShares, TER 0,07%, mismo fondo en dos bolsas), VUAA/VUSA (Vanguard, TER 0,07%, acc/dist), SPXS (SPDR, TER 0,03% — el más barato).',
    relatedLinks: [{ label: 'Mejores ETFs S&P 500', href: '/etfs/sp500' }],
  },
  {
    slug: 'renta-variable',
    term: 'Renta variable',
    category: 'conceptos',
    shortDefinition:
      'Renta variable es el conjunto de activos cuya rentabilidad no está garantizada y depende del comportamiento del mercado. El ejemplo clásico son las acciones y los ETFs de acciones.',
    longDefinition:
      'La renta variable engloba todos los activos cuya rentabilidad fluctúa según las condiciones del mercado, sin garantía de rendimiento mínimo. Las acciones (y por extensión los ETFs y fondos que invierten en ellas) son el ejemplo paradigmático. La rentabilidad histórica de la renta variable global a largo plazo ha sido del 7-10% anual nominal, con volatilidad del 15-20% anual.\n\nLa renta variable es el motor de rentabilidad de cualquier cartera a largo plazo. La contrapartida es su volatilidad: caídas del 30-50% son históricamente posibles y han ocurrido varias veces (2000-2002, 2008, 2020 brevemente, 2022). El inversor que necesita el dinero en menos de 5-10 años debería tener exposición limitada a renta variable.',
  },
  {
    slug: 'renta-fija',
    term: 'Renta fija',
    category: 'conceptos',
    shortDefinition:
      'Renta fija son los activos que ofrecen un rendimiento conocido o predecible (intereses periódicos + devolución del capital al vencimiento). Los bonos gubernamentales y corporativos son los más comunes.',
    longDefinition:
      'La renta fija incluye instrumentos donde un emisor (gobierno o empresa) recibe dinero del inversor y se compromete a devolverlo en una fecha futura con un interés pactado. Los bonos del Estado, los bonos corporativos y los depósitos bancarios son ejemplos clásicos. La rentabilidad esperada es menor que la renta variable (típicamente 2-5% anual a largo plazo) pero también la volatilidad es mucho más baja (3-7% anual).\n\nEn una cartera indexada, la renta fija actúa como amortiguador en momentos de caídas bursátiles. Para inversores españoles, los ETFs de renta fija más populares incluyen AGGH (global agregado hedged EUR), EUNA (eurozona soberana) y IBGS (eurozona corto plazo). La cobertura de divisa EUR es generalmente recomendable en renta fija.',
    relatedArticles: ['mejores-etfs-renta-fija-2026'],
    relatedLinks: [{ label: 'Mejores ETFs de renta fija', href: '/etfs/renta-fija' }],
  },
  {
    slug: 'acumulacion-vs-distribucion',
    term: 'Acumulación vs Distribución',
    category: 'conceptos',
    shortDefinition:
      'Acumulación y distribución son las dos políticas de dividendos de un ETF. En acumulación, los dividendos se reinvierten dentro del fondo. En distribución, se reparten periódicamente al inversor.',
    longDefinition:
      'Un ETF puede tener dos políticas con los dividendos que generan las empresas en cartera:\n\n- **Acumulación (Acc)**: el ETF reinvierte automáticamente los dividendos comprando más participaciones del propio fondo. No hay evento fiscal para el inversor hasta que vende. El precio del ETF crece más rápido que el de su versión distribución equivalente.\n- **Distribución (Dist)**: el ETF reparte los dividendos periódicamente (trimestral, semestral o anualmente). El inversor recibe dinero en su cuenta y tributa al 19-28% como rendimientos del capital mobiliario en el año del cobro.\n\nPara inversores en fase de acumulación de patrimonio (la mayoría), los ETFs de acumulación son más eficientes fiscalmente: el dinero sigue creciendo dentro del fondo sin pagar impuestos cada año. Para inversores en fase de retiro que quieren rentas periódicas sin vender participaciones, la distribución tiene sentido operativo.',
    example:
      'VWCE (acumulación) y VWRL (distribución) replican el mismo índice FTSE All-World. VWCE reinvierte los dividendos automáticamente; VWRL los reparte trimestralmente. A largo plazo, la diferencia fiscal es significativa para el inversor español en fase de ahorro.',
    relatedLinks: [
      { label: 'ETFs de acumulación', href: '/etfs/acumulacion' },
      { label: 'ETFs de distribución', href: '/etfs/distribucion' },
    ],
  },
  {
    slug: 'hedged',
    term: 'Hedged (cobertura de divisa)',
    category: 'conceptos',
    shortDefinition:
      'Un ETF "hedged" o cubierto de divisa neutraliza el efecto del tipo de cambio entre la divisa de los activos subyacentes y la divisa del inversor (en este caso, el euro).',
    longDefinition:
      'Un ETF hedged usa contratos de divisa a plazo (forwards) para eliminar la variación del tipo de cambio. Un ETF de bonos americanos sin cobertura te expone tanto al rendimiento de los bonos como al movimiento EUR/USD. Si el euro se aprecia un 10% frente al dólar, tu rentabilidad en euros cae un 10% aunque los bonos americanos no se hayan movido.\n\nPara renta variable global a largo plazo, la cobertura generalmente no merece la pena: el coste (típicamente 0,5-2% anual) supera el beneficio porque las divisas tienden a revertir a la media en horizontes largos. Para renta fija, la cobertura es prácticamente imprescindible: la volatilidad divisa puede dominar completamente el comportamiento de los bonos.',
    example:
      'AGGH (iShares Core Global Aggregate Bond UCITS ETF EUR Hedged) cubre la divisa para neutralizar el riesgo cambiario de los bonos globales. Es el ETF de renta fija más popular en carteras Boglehead españolas precisamente por esta cobertura.',
    relatedArticles: ['riesgo-divisa-etf-hedged-espana'],
  },
  // ---------------------------------------------------------------------------
  // Métricas avanzadas
  // ---------------------------------------------------------------------------
  {
    slug: 'sharpe-ratio',
    term: 'Sharpe ratio',
    category: 'metricas',
    shortDefinition:
      'El Sharpe ratio mide la rentabilidad ajustada al riesgo de un activo o cartera. Cuanto más alto, mejor: indica cuánta rentabilidad extra se obtiene por cada unidad de volatilidad asumida.',
    longDefinition:
      'El Sharpe ratio es una métrica diseñada por William Sharpe (Premio Nobel de Economía en 1990) para evaluar si la rentabilidad de un activo justifica el riesgo asumido. Se calcula como la rentabilidad del activo menos el activo libre de riesgo (típicamente bonos del Tesoro), dividida entre la desviación típica de los retornos del activo.\n\nUn Sharpe ratio superior a 1 se considera bueno; superior a 2, excelente; por debajo de 0, el activo ha perdido frente al activo libre de riesgo. Para comparar carteras es muy útil: una cartera con rentabilidad del 12% y volatilidad del 20% tiene peor Sharpe que otra con rentabilidad del 8% y volatilidad del 10%, aunque la primera "gane más" en términos brutos.',
    example:
      'Cartera A: rentabilidad 10%, volatilidad 15%. Cartera B: rentabilidad 7%, volatilidad 7%. Con activo libre de riesgo del 2%: Sharpe A = (10-2)/15 = 0,53. Sharpe B = (7-2)/7 = 0,71. La cartera B tiene mejor rentabilidad ajustada al riesgo a pesar de menos rentabilidad bruta.',
  },
  {
    slug: 'tracking-difference',
    term: 'Tracking difference',
    category: 'metricas',
    shortDefinition:
      'El tracking difference es la diferencia acumulada entre la rentabilidad de un ETF y la rentabilidad de su índice subyacente. Mide el coste real de la replicación, más útil que el TER aislado.',
    longDefinition:
      'El tracking difference (TD) es la métrica más precisa para evaluar la eficiencia real de un ETF indexado. Si el TER de un ETF es 0,20% pero el TD acumulado es −0,10%, significa que en realidad el ETF solo "cuesta" 0,10% al año porque la gestora compensa parte del TER con préstamo de valores, optimización de retención de dividendos en origen y otras eficiencias operativas.\n\nUn TD positivo significa que el ETF ha rendido por encima del índice (raro pero posible). Un TD negativo y similar al TER indica gestión normal. Un TD mucho más negativo que el TER apunta a problemas de replicación. Para comparar ETFs del mismo índice, el TD es más informativo que el TER.',
    example:
      'IWDA (iShares MSCI World, TER 0,20%) ha tenido un tracking difference cercano a 0 en los últimos años gracias al préstamo de valores. SWRD (SPDR MSCI World, TER 0,12%) tiene TD ligeramente negativo. La diferencia real entre ambos puede ser inferior a la sugerida por el TER aislado.',
  },
  {
    slug: 'alpha-beta',
    term: 'Alpha y Beta',
    category: 'metricas',
    shortDefinition:
      'Beta mide cuánto se mueve un activo en relación al mercado (beta de 1 = se mueve como el mercado). Alpha es la rentabilidad adicional sobre lo que se esperaría dado el riesgo asumido.',
    longDefinition:
      'Beta y alpha son métricas del Capital Asset Pricing Model (CAPM). **Beta** mide la sensibilidad de un activo a los movimientos del mercado: beta de 1,2 significa que cuando el mercado sube 10%, el activo tiende a subir 12% (y viceversa). Una beta de 0,8 indica menor sensibilidad. La beta media del mercado es 1 por definición.\n\n**Alpha** es la rentabilidad obtenida por encima de la que correspondería al riesgo asumido. Un alpha positivo indica gestión exitosa (rentabilidad superior al mercado ajustada por riesgo). Para los Bogleheads, el debate es claro: la mayoría de gestores activos no consigue alpha positivo neto de comisiones a largo plazo, por lo que la indexación pasiva (alpha = 0 por definición) acaba ganando.',
    example:
      'Las acciones tecnológicas tienden a tener beta superior a 1 (más volátiles que el mercado). Los bonos gubernamentales tienen beta cercana a 0 (poco correlacionados con renta variable). Un fondo activo con alpha de +2% neto durante 10 años sería extraordinario; la mayoría de fondos tienen alpha entre -1% y -2%.',
  },
  {
    slug: 'spread',
    term: 'Spread (bid-ask)',
    category: 'metricas',
    shortDefinition:
      'El spread es la diferencia entre el precio máximo al que un comprador está dispuesto a pagar (bid) y el precio mínimo al que un vendedor está dispuesto a vender (ask). Mide el coste implícito de operar.',
    longDefinition:
      'El bid-ask spread es un coste implícito en cada operación de bolsa que no aparece en las comisiones del broker pero sí en el resultado final. Si un ETF tiene bid 100,00€ y ask 100,10€, comprar y vender inmediatamente te cuesta 0,10€ por participación (0,1%), aparte de las comisiones.\n\nLos ETFs muy líquidos (IWDA, VWCE, CSPX) tienen spreads muy estrechos (1-3 centésimas porcentuales). ETFs poco líquidos o operados en horarios de baja actividad pueden tener spreads de 0,2-0,5% o más. Para órdenes grandes, el spread puede ser más costoso que la comisión del broker. Operar en horario de máxima liquidez (cuando la bolsa principal del fondo está abierta) reduce el spread.',
    example:
      'Si compras CSPX en Xetra a las 11:00 (mercado europeo abierto), el spread típico es 0,02-0,05%. Si lo intentas comprar a las 22:00 (mercado cerrado, solo mercados secundarios), el spread puede ser 0,2-0,5% o más.',
  },
  // ---------------------------------------------------------------------------
  // Productos y conceptos de mercado
  // ---------------------------------------------------------------------------
  {
    slug: 'replicacion-fisica-sintetica',
    term: 'Replicación física vs sintética',
    category: 'productos',
    shortDefinition:
      'Un ETF puede replicar su índice comprando físicamente las acciones (replicación física) o usando derivados con un banco contraparte (replicación sintética). La física es más transparente.',
    longDefinition:
      'Hay tres formas de replicación en un ETF:\n\n- **Replicación física total**: el ETF compra literalmente todas las acciones del índice en sus proporciones exactas. Máxima transparencia, sin riesgo de contraparte. Ejemplo: IWDA.\n- **Replicación física por muestreo (optimizada)**: el ETF compra una muestra representativa del índice (suficiente para replicar el comportamiento sin tener que mantener miles de posiciones pequeñas). Útil para índices con muchos valores ilíquidos. Mayoría de ETFs.\n- **Replicación sintética (swap)**: el ETF firma un contrato con un banco (típicamente la propia gestora o un banco asociado) por el cual el banco le paga el rendimiento del índice a cambio de una comisión. Sin acciones físicas en la cartera del ETF. Mayor eficiencia fiscal en algunos casos, pero introduce riesgo de contraparte (que el banco quiebre).\n\nPara la mayoría de inversores indexados, la replicación física (total o por muestreo) es la opción preferida por transparencia.',
    example:
      'IWDA replica físicamente comprando ~1.500 acciones. Algunos ETFs de Xtrackers (XACT) usan replicación sintética. Ambos tienen TER similar pero estructura de riesgo distinta.',
  },
  {
    slug: 'investment-grade',
    term: 'Investment grade vs high yield',
    category: 'productos',
    shortDefinition:
      'Los bonos investment grade son emisiones con rating crediticio alto (AAA a BBB-), considerados seguros. Los high yield (BB+ y por debajo) son "bonos basura" con mayor riesgo y rendimiento.',
    longDefinition:
      'Las agencias de calificación crediticia (Moody\'s, S&P, Fitch) clasifican los bonos según el riesgo de impago del emisor. La línea divisoria está entre BBB- (último escalón investment grade) y BB+ (primer high yield).\n\n**Investment grade**: bonos de empresas o gobiernos solventes. Tasa histórica de impago muy baja (<0,5% anual). Rendimientos modestos (3-5% en condiciones normales). Apropiados para la parte conservadora de una cartera. Ejemplos: bonos del Tesoro Alemán (AAA), bonos de Microsoft (AAA), bonos de Telefónica (BBB).\n\n**High yield (bonos basura)**: bonos de empresas en dificultades o de emisores con balance frágil. Tasa de impago histórica del 2-5% anual. Rendimientos altos (6-10%+) para compensar el riesgo. Mayor correlación con renta variable, lo que reduce su utilidad como diversificador.',
    example:
      'Los bonos del Tesoro español tienen rating A. Los bonos de Banco Santander, rating A-. Bonos de empresas en restructuración (como Boeing en 2024 o Casino en Francia) pueden tener rating B o CCC, considerados high yield.',
  },
  {
    slug: 'esg-sri',
    term: 'ESG / Inversión socialmente responsable',
    category: 'productos',
    shortDefinition:
      'ESG (Environmental, Social, Governance) son criterios extra-financieros usados para evaluar empresas. Los ETFs ESG/SRI excluyen sectores polémicos o seleccionan empresas mejor calificadas en estos criterios.',
    longDefinition:
      'La inversión ESG se ha convertido en una tendencia importante en los últimos años. Los criterios son:\n- **E (Environmental)**: huella de carbono, gestión de residuos, eficiencia energética\n- **S (Social)**: relaciones laborales, diversidad, derechos humanos en la cadena de suministro\n- **G (Governance)**: estructura corporativa, transparencia, ética en la gestión\n\nLos ETFs ESG/SRI aplican estos criterios de dos formas: **exclusión** (eliminan sectores como armas, tabaco, combustibles fósiles) o **best-in-class** (seleccionan dentro de cada sector las empresas con mejores ratings ESG). La rentabilidad histórica de ETFs ESG ha sido similar o ligeramente superior a sus índices estándar, aunque con sesgo hacia ciertos sectores.',
    example:
      'iShares MSCI World SRI UCITS ETF (IUSE, TER 0,20%) replica el MSCI World excluyendo empresas de armas, tabaco, combustibles fósiles y otras polémicas. Su rendimiento histórico ha sido muy similar al MSCI World tradicional.',
  },
  // ---------------------------------------------------------------------------
  // Fiscalidad española
  // ---------------------------------------------------------------------------
  {
    slug: 'modelo-720',
    term: 'Modelo 720',
    category: 'fiscalidad',
    shortDefinition:
      'El Modelo 720 es la declaración informativa anual obligatoria para residentes fiscales en España con bienes y derechos en el extranjero por más de 50.000€. No genera impuestos, solo informa.',
    longDefinition:
      'El Modelo 720 es una declaración informativa (no tributaria) que deben presentar los residentes fiscales en España cuando poseen, en el extranjero, alguno de los siguientes superando los 50.000€:\n- Cuentas bancarias\n- Valores, fondos, ETFs, acciones\n- Inmuebles\n\nSi tienes ETFs en un broker como DEGIRO (Países Bajos) o Trade Republic (Alemania) y el valor supera los 50.000€, debes presentar el Modelo 720. El plazo es entre enero y marzo del año siguiente al hecho. Hay obligación de declarar también incrementos posteriores significativos.\n\nLas sanciones por no presentar el modelo fueron históricamente desproporcionadas (incluso del 150% del valor) hasta que el Tribunal Constitucional las anuló en 2022. Hoy las sanciones son más razonables pero la obligación de declarar persiste.',
    example:
      'Si en diciembre de 2025 tienes 60.000€ en ETFs en DEGIRO, debes presentar el Modelo 720 entre enero y marzo de 2026. Si los siguientes años el valor sube significativamente (más de 20.000€), debes volver a presentarlo.',
    relatedArticles: ['fiscalidad-etfs-espana-guia-completa'],
  },
  {
    slug: 'convenio-doble-imposicion',
    term: 'Convenio doble imposición',
    category: 'fiscalidad',
    shortDefinition:
      'Los convenios de doble imposición son acuerdos bilaterales entre países que evitan que la misma renta tribute dos veces. Para inversores en ETFs determinan la retención sobre dividendos en origen.',
    longDefinition:
      'Cuando una empresa española como Telefónica paga dividendos a un fondo americano, hay dos potenciales tributaciones: en España (origen del dividendo) y en EE.UU. (residencia del fondo). Los convenios de doble imposición evitan esta doble tributación reduciendo la retención en origen.\n\nPara los inversores españoles en ETFs, el convenio más relevante es **Irlanda-EE.UU.**: reduce la retención de dividendos americanos del 30% al 15%, lo que beneficia indirectamente a los partícipes de ETFs irlandeses. Por eso un ETF como VWCE (irlandés) es más eficiente que el equivalente luxemburgués: la retención interna es menor y por tanto el patrimonio del fondo crece más.\n\nLa devolución de retenciones pagadas en el extranjero por dividendos cobrados directamente como persona física se gestiona vía la **deducción por doble imposición internacional** en la declaración de la renta.',
    example:
      'VWCE (irlandés) recibe dividendos de Apple con retención USA del 15% (convenio IE-USA). Un ETF equivalente domiciliado en Luxemburgo recibiría los mismos dividendos con retención del 30%. Sobre un yield del 2% del fondo, la diferencia es de aproximadamente 0,3% anual.',
    relatedArticles: ['fiscalidad-etfs-espana-guia-completa'],
  },
  {
    slug: 'regla-dos-meses',
    term: 'Regla de los dos meses',
    category: 'fiscalidad',
    shortDefinition:
      'En España, si vendes un valor con pérdidas y recompras el mismo (o equivalente) en los dos meses anteriores o posteriores, Hacienda no permite computar esa pérdida fiscalmente. Anti-lavado fiscal.',
    longDefinition:
      'La regla de los dos meses (también llamada "wash sale" en inglés) es un mecanismo anti-elusión que impide a los inversores generar pérdidas fiscales artificiales sin cambiar realmente su posición en el mercado. Si vendes un valor con pérdidas (para compensar ganancias y reducir IRPF) pero lo recompras dentro de los dos meses anteriores o posteriores a la venta, Hacienda no acepta esa pérdida.\n\nEsto importa para optimización fiscal de fin de año: si quieres realizar una pérdida en un ETF (por ejemplo, VWCE) para compensar ganancias, no puedes recomprar VWCE en los siguientes dos meses. Una estrategia alternativa: vender VWCE y comprar un ETF de índice diferente pero exposición similar (como IWDA), lo que técnicamente no es "el mismo valor" según la AEAT.',
    example:
      'Vendes 100 participaciones de VWCE con pérdida de 1.500€. Tres semanas después recompras 100 participaciones de VWCE. La AEAT rechaza la pérdida fiscal — no podrás usarla para compensar ganancias. Si en lugar de recomprar VWCE compras IWDA, la pérdida es aceptable.',
    relatedArticles: ['como-declarar-etfs-hacienda'],
  },
  // ---------------------------------------------------------------------------
  // Estrategias adicionales
  // ---------------------------------------------------------------------------
  {
    slug: 'lump-sum',
    term: 'Lump sum',
    category: 'estrategias',
    shortDefinition:
      'Lump sum es la estrategia de invertir una cantidad grande de dinero de una sola vez, en oposición al DCA (aportaciones periódicas). Estadísticamente supera al DCA en 2 de cada 3 periodos.',
    longDefinition:
      'Lump sum significa invertir todo el dinero disponible en una sola operación, en lugar de fraccionarlo en aportaciones periódicas (DCA). Si recibes una herencia de 50.000€ o una indemnización por despido, la decisión es: ¿lo invierto todo hoy, o lo divido en 12-24 cuotas mensuales?\n\nLos estudios académicos muestran que el lump sum supera al DCA en aproximadamente el 66-75% de los periodos históricos. La razón es matemática: el mercado tiende a subir más que a bajar, por lo que cuanto antes esté tu dinero invertido, más tiempo está creciendo. El DCA reduce la varianza del resultado pero también reduce la rentabilidad esperada.\n\nLa decisión depende también de aspectos psicológicos. Si invertir todo de golpe te genera ansiedad y te haría vender en pánico ante la primera caída, el DCA puede ser preferible aunque sea matemáticamente inferior.',
    example:
      'Si recibes 24.000€ y los inviertes en VWCE hoy (lump sum), tienes el 100% del dinero trabajando desde el día 1. Si en cambio divides en 12 cuotas mensuales de 2.000€, durante el primer mes solo 2.000€ están invertidos; el dinero restante está en cuenta corriente sin generar rentabilidad de mercado.',
    relatedArticles: ['dca-vs-lump-sum-aportar-mensual'],
  },
  {
    slug: 'glide-path',
    term: 'Glide path',
    category: 'estrategias',
    shortDefinition:
      'Glide path es la estrategia de ir reduciendo progresivamente el peso de renta variable y aumentar la renta fija a medida que el inversor se acerca a la edad de jubilación. Reduce la volatilidad cuando más importa.',
    longDefinition:
      'El glide path es una técnica de planificación financiera personal que ajusta el asset allocation a lo largo del tiempo según se acerca el objetivo (jubilación, hipoteca, hijo en universidad). La idea: cuando falta mucho tiempo, puedes tolerar alta volatilidad porque tienes tiempo de recuperarte de caídas. Cuando se acerca el momento, prefieres estabilidad sobre rentabilidad esperada.\n\nUna regla clásica es "100 menos tu edad" en renta variable: a los 30, 70% acciones; a los 60, 40% acciones. Las versiones modernas usan "120 menos tu edad" porque la esperanza de vida ha aumentado: a los 30, 90% acciones; a los 60, 60% acciones.\n\nEl glide path defiende contra el **riesgo de secuencia de retornos**: una caída del 40% justo cuando empiezas a vivir de la cartera puede destruir el plan. Reducir progresivamente la exposición a renta variable los 5-10 años antes de necesitarla mitiga este riesgo.',
    example:
      'Un inversor de 40 años con cartera 80/20. A los 50 baja a 70/30. A los 55 a 60/40. A los 60 a 50/50. A los 65 a 40/60. El glide path se ejecuta gradualmente (rebalanceando hacia más renta fija con las aportaciones nuevas) en lugar de en saltos bruscos.',
  },
  {
    slug: 'home-bias',
    term: 'Home bias',
    category: 'estrategias',
    shortDefinition:
      'El home bias es la tendencia de los inversores a sobreponderar inversiones de su propio país. Es un sesgo psicológico que reduce la diversificación pero da seguridad emocional.',
    longDefinition:
      'El home bias ("sesgo doméstico") es la tendencia de los inversores a sobreponderar empresas de su propio país más allá de lo que su peso en la economía global justificaría. Un inversor español indexado al MSCI World tiene un 1-2% de exposición a España (proporcional al peso real de la economía española). Pero muchos inversores españoles sobreponderan España al 10-15% comprando ETFs del IBEX 35 o acciones individuales.\n\nLos argumentos a favor del home bias: divisa propia, mejor conocimiento del entorno empresarial, menor riesgo cambiario. Los argumentos en contra: concentración geográfica, ignorar que muchas multinacionales españolas (Telefónica, Santander, Iberdrola) ya tienen exposición internacional, perder diversificación real.\n\nLa filosofía Boglehead pura recomienda no aplicar home bias: replicar el mercado global tal como es, según capitalización. Pero un home bias moderado del 5-10% suele considerarse aceptable si reduce la ansiedad y ayuda a mantener el plan a largo plazo.',
    example:
      'Si tu cartera es 60% VWCE + 20% IBEX 35 ETF + 20% renta fija, tienes un home bias significativo: España pasa de pesar ~1% global a ~21% en tu cartera. Esto es una apuesta activa que puede acertar o no, pero rompe con la indexación pura.',
  },
  // ---------------------------------------------------------------------------
  // Plataformas y servicios
  // ---------------------------------------------------------------------------
  {
    slug: 'custodia',
    term: 'Custodia',
    category: 'plataformas',
    shortDefinition:
      'La custodia es el servicio de un banco o broker de mantener los valores (acciones, ETFs, fondos) en nombre del inversor. Es esencial para que tus inversiones estén legalmente seguras.',
    longDefinition:
      'Cuando compras un ETF, no recibes papelitos físicos: los valores quedan registrados electrónicamente en una entidad custodia. Esta entidad mantiene los valores en cuentas segregadas del banco/broker — son tu propiedad, no del broker. Esta segregación es fundamental: en caso de quiebra del broker, tus valores siguen siendo tuyos y no forman parte de la masa concursal.\n\nLos brokers cobran (o no) por la custodia. Trade Republic: 0€ de custodia. DEGIRO: 0€ en la cuenta básica, comisión menor en la Custody account. MyInvestor: 0€ tanto en ETFs como en fondos. Los bancos tradicionales en España cobran a menudo comisiones de custodia del 0,2-0,5% anual, lo que es competitivamente inaceptable en 2026.\n\nVerifica siempre que el broker ofrece custodia segregada de tus valores. En caso de duda, mira si el broker está adherido a un fondo de garantía de inversiones (el español cubre 100.000€, el holandés 20.000€, el alemán 100.000€).',
    example:
      'Si tienes 50.000€ en VWCE en Trade Republic, esos VWCE son tu propiedad legal, custodiados por Citibank (custodio de Trade Republic). Si Trade Republic quebrara, tus VWCE seguirían siendo tuyos y los podrías transferir a otro broker.',
  },
  {
    slug: 'comision-gestion',
    term: 'Comisión de gestión',
    category: 'plataformas',
    shortDefinition:
      'La comisión de gestión es la tarifa anual que cobra la gestora de un fondo de inversión o ETF por administrar la cartera. Es el componente principal del TER.',
    longDefinition:
      'La comisión de gestión es el ingreso principal de las gestoras (Vanguard, BlackRock, Amundi, Fidelity) y la principal diferencia entre fondos baratos y caros. Se aplica como porcentaje anual sobre el patrimonio del fondo y se descuenta automáticamente del valor liquidativo, día a día.\n\nPara fondos de gestión activa, la comisión de gestión típica en España es 1,2-2% anual. Para fondos indexados, varía entre 0,05% (Amundi Prime Global) y 0,30% (algunos fondos especializados). La diferencia acumulada durante 30 años puede transformar tu cartera final entre el doble y la mitad.\n\nAdemás de la comisión de gestión, los fondos pueden tener: **comisión de éxito** (porcentaje sobre la rentabilidad obtenida), **comisión de suscripción** (al entrar), **comisión de reembolso** (al salir), **comisión de custodia** (al banco depositario). El conjunto se refleja en el TER.',
    example:
      'Un fondo activo del banco con comisión de gestión 1,75% + comisión éxito 9% sobre beneficio anual. Frente a Amundi Prime Global con comisión gestión 0,05% sin comisión éxito. Sobre 100.000€ a 30 años, la diferencia acumulada supera los 200.000€.',
  },
  // ---------------------------------------------------------------------------
  // Conceptos adicionales
  // ---------------------------------------------------------------------------
  {
    slug: 'value-vs-growth',
    term: 'Value vs Growth',
    category: 'conceptos',
    shortDefinition:
      'Value y growth son dos estilos de inversión opuestos. Value busca empresas baratas según fundamentales (P/E, P/B bajos). Growth busca empresas con alto crecimiento aunque coticen caras.',
    longDefinition:
      'Value y growth son los dos estilos de inversión más debatidos en la teoría financiera moderna.\n\n**Value investing** (Benjamin Graham, Warren Buffett): seleccionar empresas que cotizan por debajo de su valor intrínseco. Indicadores típicos: P/E bajo, P/B bajo, alto dividendo, balance sólido. La premisa: el mercado a veces sobrerreacciona a la baja con buenas empresas que están temporalmente baratas.\n\n**Growth investing**: seleccionar empresas con altos crecimientos esperados de beneficios o ventas, aunque coticen con valoraciones altas. Indicadores: P/E alto, crecimiento de ingresos >15%, márgenes en expansión. La premisa: el crecimiento se traduce en beneficios futuros que justifican pagar caro hoy.\n\nLa literatura académica ha documentado una "prima value" históricamente — value supera a growth a largo plazo. Pero en periodos largos (2010-2020) growth ha dominado. Para Bogleheads, ambos estilos son apuestas activas; un ETF de mercado total (VWCE) los combina automáticamente según capitalización.',
    example:
      'Apple es típicamente growth (P/E ~30, crecimiento alto). Berkshire Hathaway es value (P/E ~10, dividendos modestos pero balance sólido). ZPRV (S&P 600 US Small Cap Value) es un ETF que combina los factores small + value.',
  },
  {
    slug: 'yield-to-maturity',
    term: 'Yield to Maturity (YTM)',
    category: 'conceptos',
    shortDefinition:
      'YTM es la rentabilidad anualizada que obtendrá un inversor si compra un bono y lo mantiene hasta vencimiento. Es la métrica principal para comparar rentabilidades de bonos.',
    longDefinition:
      'El Yield to Maturity es la tasa de retorno interna (TIR) de un bono asumiendo que el inversor lo mantiene hasta vencimiento y reinvierte los cupones a la misma tasa. Tiene en cuenta:\n- Precio actual del bono (puede ser superior o inferior al nominal)\n- Cupones periódicos\n- Devolución del principal al vencimiento\n\nEs la métrica más útil para comparar bonos diferentes. Un bono cotizando a 95€ con cupón del 3% y vencimiento a 10 años tiene un YTM superior al 3% porque al vencimiento recibes 100€ (ganancia de capital). Inversamente, un bono cotizando a 105€ con cupón del 3% tiene YTM inferior al 3%.\n\nPara ETFs de renta fija, el YTM ponderado de la cartera es un buen indicador de la rentabilidad esperada del fondo en los próximos años, asumiendo que se mantienen las posiciones hasta vencimiento.',
    example:
      'Un ETF de bonos eurozona con YTM del 3,2% indica que, mantenido durante la duración media del fondo, debería rentar aproximadamente 3,2% anual antes de TER. Es una proyección razonable pero no garantizada — los cambios de tipos pueden afectar.',
  },
]

/** Devuelve un término por su slug, o undefined si no existe */
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug)
}

/** Etiquetas legibles por categoría */
export const CATEGORY_LABELS: Record<GlossaryTerm['category'], string> = {
  productos: 'Productos de inversión',
  fiscalidad: 'Fiscalidad',
  metricas: 'Métricas y datos técnicos',
  estrategias: 'Estrategias de inversión',
  plataformas: 'Plataformas y servicios',
  conceptos: 'Conceptos generales',
}
