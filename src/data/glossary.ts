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
      'VWCE (Vanguard FTSE All-World) es un ETF que invierte en más de 3.700 empresas globales. Si compras 100 participaciones a 100€, posees una fracción microscópica de cada una de esas empresas, con un coste anual de gestión del 0,19% (TER).',
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
    faq: [
      {
        q: '¿Qué significa que un ETF sea UCITS?',
        a: 'Significa que cumple la directiva europea UCITS, que regula los fondos y ETFs vendidos al inversor particular con reglas estrictas de diversificación (ningún activo pesa más del 10% del fondo), liquidez, gestión de riesgos y transparencia. Un ETF UCITS puede venderse en cualquier país de la UE con un nivel de protección uniforme.',
      },
      {
        q: '¿Por qué no puedo comprar ETFs americanos como VTI o SPY desde España?',
        a: 'Porque no son UCITS. La normativa europea MiFID II impide a los inversores particulares europeos comprar ETFs que no cumplan UCITS ni publiquen el documento de datos fundamentales en formato europeo. Por eso se usan equivalentes UCITS domiciliados en Irlanda o Luxemburgo (por ejemplo CSPX en lugar de SPY).',
      },
      {
        q: '¿Los ETFs UCITS son más seguros?',
        a: 'Ofrecen un marco de protección regulatoria uniforme y estricto (diversificación, liquidez, depositario independiente, transparencia), por lo que para el inversor particular europeo son la opción habitual y recomendada. No eliminan el riesgo de mercado —el valor puede subir o bajar—, pero sí estandarizan las garantías del vehículo.',
      },
    ],
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
      'El ETF Vanguard FTSE All-World Acc tiene ISIN IE00BK5BQT80. La "IE" inicial indica que está domiciliado en Irlanda. Este mismo ETF cotiza como VWCE en Xetra, VWRA en LSE y VWRP en otras bolsas — todos comparten el ISIN.',
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
    faq: [
      {
        q: '¿Cuánto se paga de IRPF al vender fondos o ETFs en España en 2026?',
        a: 'Se aplica la escala del ahorro: 19% hasta 6.000€, 21% de 6.000€ a 50.000€, 23% de 50.000€ a 200.000€, 27% de 200.000€ a 300.000€ y 28% por encima. Por una ganancia de 10.000€ pagarías 1.980€ (1.140€ al 19% sobre los primeros 6.000€ y 840€ al 21% sobre los 4.000€ restantes).',
      },
      {
        q: '¿La escala del IRPF del ahorro es progresiva por tramos?',
        a: 'Sí. Cada tramo grava solo la parte de la ganancia que cae en él, no toda la ganancia al tipo más alto. Por eso una ganancia de 10.000€ no tributa al 21% entero (2.100€), sino 1.980€.',
      },
      {
        q: '¿Los dividendos tributan igual que las ganancias por vender?',
        a: 'Sí. Dividendos, intereses y ganancias patrimoniales por venta de fondos, ETFs o acciones se integran todos en la base imponible del ahorro y siguen la misma escala (del 19% al 28% en 2026).',
      },
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
    faq: [
      {
        q: '¿Qué participaciones se consideran vendidas primero en una venta parcial?',
        a: 'Las más antiguas. Hacienda obliga a aplicar el criterio FIFO (First In, First Out): se venden primero las participaciones que compraste antes, y su precio de adquisición es el que se usa para calcular la ganancia o pérdida.',
      },
      {
        q: '¿Puedo elegir vender las participaciones más caras para pagar menos impuestos?',
        a: 'No. En España FIFO es obligatorio para fondos, ETFs y acciones: no se permite elegir lotes ni aplicar LIFO o precio medio. Siempre salen primero las más antiguas.',
      },
      {
        q: '¿Cómo afecta FIFO a una estrategia DCA a largo plazo?',
        a: 'Si tus primeras aportaciones fueron a precios más bajos (lo habitual en un mercado alcista), la ganancia calculada en una venta parcial será mayor, porque FIFO usa esos precios de compra antiguos. Conviene tenerlo en cuenta al planificar ventas.',
      },
    ],
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
      'VWCE (ISIN IE00BK5BQT80) está domiciliado en Irlanda. iShares MSCI World (CWLD, ISIN LU0392494562) está en Luxemburgo. Para el inversor español, VWCE es fiscalmente más eficiente gracias a su domicilio irlandés.',
    relatedArticles: ['como-elegir-tu-primer-etf-espana-2026', 'fiscalidad-etfs-espana-guia-completa'],
    faq: [
      {
        q: '¿Por qué un ETF domiciliado en Irlanda es más eficiente que uno en Luxemburgo?',
        a: 'Porque Irlanda tiene un convenio fiscal con EE.UU. que reduce la retención sobre dividendos americanos del 30% al 15%. Un ETF luxemburgués soporta el 30%, así que el irlandés pierde menos por el camino y su patrimonio crece más.',
      },
      {
        q: '¿Cómo sé dónde está domiciliado un ETF?',
        a: 'Por las dos primeras letras del ISIN: IE indica Irlanda y LU indica Luxemburgo. Por ejemplo, VWCE (IE00BK5BQT80) está domiciliado en Irlanda.',
      },
      {
        q: '¿Cuánto se ahorra eligiendo el domicilio fiscal adecuado?',
        a: 'En una cartera con un 60-65% de empresas estadounidenses (lo típico de un MSCI World o un FTSE All-World), un ETF irlandés frente a uno luxemburgués puede ahorrar entre un 0,15% y un 0,25% anual en retenciones, que se acumula con los años.',
      },
    ],
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
    faq: [
      {
        q: '¿Cuánto se puede aportar a un plan de pensiones individual en 2026?',
        a: 'El límite es 1.500€ anuales, reducido desde los 8.000€ que se permitían antes de 2021. Esa cantidad se resta directamente de la base imponible general del IRPF.',
      },
      {
        q: '¿Cuánto se ahorra en impuestos aportando a un plan de pensiones?',
        a: 'Depende de tu tipo marginal (entre el 19% y el 47%). Si tu marginal es del 37% y aportas 1.500€, tu factura fiscal baja 555€ ese año, así que el coste real de la aportación es 945€.',
      },
      {
        q: '¿Cómo tributa el plan de pensiones cuando se rescata?',
        a: 'Todo el dinero rescatado —aportaciones más ganancias— tributa como rendimiento del trabajo, no como renta del ahorro. Rescatarlo de golpe puede disparar tu tipo marginal; lo eficiente es repartir el rescate en varios años.',
      },
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
    faq: [
      {
        q: '¿En qué consiste la filosofía Boglehead?',
        a: 'En tres pilares: invertir en fondos indexados de bajo coste que repliquen mercados amplios, diversificar globalmente entre renta variable y renta fija, y mantener la disciplina a largo plazo sin intentar predecir el mercado ni reaccionar a las caídas. Toma su nombre de John Bogle, fundador de Vanguard.',
      },
      {
        q: '¿Por qué un Boglehead no intenta batir al mercado?',
        a: 'Porque décadas de evidencia muestran que la gestión activa, de media, no supera al mercado después de comisiones. Para el inversor particular lo más rentable es replicar el mercado al menor coste posible en lugar de seleccionar valores o cronometrar entradas.',
      },
      {
        q: '¿Cómo es una cartera Boglehead sencilla para un inversor español?',
        a: 'Un ejemplo típico es 80% en renta variable global (VWCE) y 20% en renta fija global cubierta a euros (AGGH), con un coste anual total en torno al 0,15% y sin más operaciones que el rebalanceo anual.',
      },
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
    faq: [
      {
        q: '¿Qué es mejor, DCA o invertir todo de golpe (lump sum)?',
        a: 'Matemáticamente, invertir todo de golpe (lump sum) supera al DCA en unos 2 de cada 3 periodos históricos, porque el mercado tiende a subir más que a bajar. El DCA tiene sentido cuando inviertes el ahorro mensual de la nómina (no tienes el dinero hoy) o cuando reduce tu ansiedad y te ayuda a no vender en pánico.',
      },
      {
        q: '¿Cómo funciona el DCA en la práctica?',
        a: 'Inviertes una cantidad fija de forma periódica (por ejemplo 1.000€ al mes) en lugar de una sola vez. Cuando el mercado cae compras más participaciones y cuando sube compras menos, de modo que tu precio de entrada es la media de los precios de cada aportación.',
      },
      {
        q: '¿El DCA elimina el riesgo de pérdidas?',
        a: 'No. Suaviza el efecto de la volatilidad sobre el precio medio de entrada, pero no protege frente a caídas prolongadas del mercado. Es una estrategia de disciplina y gestión emocional, no una garantía de rentabilidad.',
      },
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
    faq: [
      {
        q: '¿Cada cuánto hay que rebalancear la cartera?',
        a: 'Las dos estrategias habituales son por calendario (una o dos veces al año) o por umbral (cuando un activo se desvía más de un 5-10% de su peso objetivo). Lo importante es hacerlo de forma sistemática y sin emoción, no improvisar según el momento de mercado.',
      },
      {
        q: '¿El rebalanceo mejora la rentabilidad?',
        a: 'Su efecto principal es controlar el riesgo: mantiene el perfil de la cartera en su objetivo. Además, al obligar a vender lo que ha subido y comprar lo que ha bajado, históricamente aporta entre un 0,2% y un 0,8% anual frente a no rebalancear.',
      },
      {
        q: '¿Cómo se rebalancea sin pagar impuestos?',
        a: 'La forma más eficiente es rebalancear con las aportaciones nuevas, comprando el activo infraponderado en lugar de vender. Si usas fondos indexados, el traspaso entre fondos no tributa en España; vender ETFs para rebalancear sí realiza ganancias y tributa.',
      },
    ],
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
    faq: [
      {
        q: '¿Qué es más importante, el asset allocation o elegir buenos fondos?',
        a: 'El asset allocation. La distribución entre clases de activo (renta variable, renta fija, oro…) explica aproximadamente el 90% de la variabilidad de la rentabilidad a largo plazo, mucho más que la selección de productos concretos dentro de cada clase.',
      },
      {
        q: '¿Qué asset allocation me conviene según mi edad?',
        a: 'Cuanto más largo es tu horizonte, más renta variable puedes asumir. Perfiles habituales: 100/0 para inversores jóvenes con horizonte muy largo, 80/20 como estándar moderado y 60/40 como clásico equilibrado. Lo razonable es reducir renta variable a medida que se acerca el momento de necesitar el dinero.',
      },
      {
        q: '¿Qué es la cartera permanente?',
        a: 'Es un asset allocation 25/25/25/25 entre renta variable, bonos de largo plazo, oro y liquidez, diseñado por Harry Browne para ser robusto en cualquier escenario económico. Prioriza la estabilidad sobre la rentabilidad máxima.',
      },
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
    faq: [
      {
        q: '¿Por qué es importante diversificar?',
        a: 'Porque combinar activos cuyas rentabilidades no están perfectamente correlacionadas reduce el riesgo total de la cartera sin reducir proporcionalmente la rentabilidad esperada. Es uno de los pocos "almuerzos gratis" de la inversión, formulado por Harry Markowitz en 1952.',
      },
      {
        q: '¿Cómo se diversifica con un solo ETF?',
        a: 'Un ETF amplio ya diversifica por ti: un MSCI World da exposición a unas 1.500 empresas de 23 países, y un FTSE All-World (VWCE) supera las 3.700 añadiendo emergentes. Con una sola posición evitas el riesgo de concentrarte en pocas empresas.',
      },
      {
        q: '¿Tener muchos ETFs distintos diversifica más?',
        a: 'No necesariamente. Varios ETFs globales suelen solaparse en las mismas grandes empresas, así que apilar fondos no añade diversificación real y sí complejidad. Lo que importa es la exposición subyacente (regiones, sectores, clases de activo), no el número de productos.',
      },
    ],
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
    faq: [
      {
        q: '¿Cuándo hay que presentar el Modelo 720?',
        a: 'Cuando eres residente fiscal en España y tienes en el extranjero más de 50.000€ en alguna de estas categorías: cuentas bancarias, valores/fondos/ETFs/acciones, o inmuebles. Se presenta entre enero y marzo del año siguiente. Por ejemplo, con 60.000€ en ETFs en DEGIRO a 31 de diciembre, lo presentas en el primer trimestre del año siguiente.',
      },
      {
        q: '¿El Modelo 720 hace que pague más impuestos?',
        a: 'No. Es una declaración informativa, no tributaria: solo informa a Hacienda de tus bienes en el extranjero, no genera ningún impuesto por sí misma. Las ganancias de tus ETFs tributan aparte, en el IRPF del ahorro, y solo cuando las vendes.',
      },
      {
        q: '¿Hay que volver a presentar el Modelo 720 todos los años?',
        a: 'Solo si el valor de algún grupo de bienes sube más de 20.000€ respecto a la última declaración, o si dejas de ser titular de algo ya declarado. Si nada cambia significativamente, no hay que repetirlo cada año. Las sanciones desproporcionadas fueron anuladas por el Tribunal Constitucional en 2022, pero la obligación de declarar persiste.',
      },
    ],
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
    faq: [
      {
        q: '¿Qué convenio de doble imposición es más relevante para el inversor en ETFs?',
        a: 'El convenio Irlanda-EE.UU., que reduce la retención sobre dividendos estadounidenses del 30% al 15%. Por eso un ETF irlandés como VWCE es más eficiente que su equivalente luxemburgués.',
      },
      {
        q: '¿Cómo recupero las retenciones extranjeras sobre dividendos en la declaración?',
        a: 'Los dividendos que cobras directamente como persona física con retención en el extranjero se corrigen mediante la deducción por doble imposición internacional en la declaración de la renta. Dentro de un ETF, esa optimización la hace el propio fondo según su domicilio.',
      },
      {
        q: '¿Cuánto mejora la rentabilidad el convenio en un ETF irlandés?',
        a: 'Sobre un yield del 2% del fondo, la diferencia entre el 15% y el 30% de retención equivale a alrededor de un 0,3% anual a favor del ETF irlandés.',
      },
    ],
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
    faq: [
      {
        q: '¿Puedo vender un ETF con pérdidas y recomprarlo para ahorrar impuestos?',
        a: 'No si recompras el mismo ETF (u otro equivalente) dentro de los dos meses anteriores o posteriores a la venta: la regla de los dos meses impide computar esa pérdida. Es el mecanismo anti-lavado fiscal español, equivalente al wash sale americano.',
      },
      {
        q: '¿Cómo aprovechar una pérdida fiscal sin incumplir la regla de los dos meses?',
        a: 'Vendiendo el ETF en pérdidas y comprando otro de índice distinto pero exposición similar (por ejemplo, vender VWCE y comprar IWDA). Al no ser técnicamente el mismo valor, la AEAT acepta la pérdida.',
      },
      {
        q: '¿Cuánto dura la ventana de la regla de los dos meses en ETFs?',
        a: 'Dos meses antes y dos meses después de la venta, porque los ETFs son valores cotizados en mercados secundarios. Si recompras dentro de esa ventana, la pérdida queda bloqueada hasta que vendas definitivamente la nueva posición.',
      },
    ],
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
    faq: [
      {
        q: '¿Es mejor invertir una herencia de golpe o poco a poco?',
        a: 'Estadísticamente, invertir de golpe (lump sum) supera al reparto en cuotas (DCA) en torno al 66-75% de los periodos históricos, porque cuanto antes está el dinero invertido más tiempo crece. El reparto reduce la varianza del resultado pero también la rentabilidad esperada.',
      },
      {
        q: '¿Cuándo tiene sentido elegir DCA en lugar de lump sum?',
        a: 'Cuando invertir todo de golpe te generaría tanta ansiedad que venderías en pánico ante la primera caída. En ese caso, repartir la inversión en 12-24 meses es matemáticamente inferior pero puede ayudarte a mantener el plan.',
      },
    ],
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
  {
    slug: 'traspaso',
    term: 'Traspaso de fondos',
    category: 'fiscalidad',
    shortDefinition:
      'Un traspaso es mover dinero de un fondo de inversión a otro sin pasar por Hacienda: la ganancia acumulada no tributa hasta el reembolso final. Es la gran ventaja fiscal de los fondos frente a los ETFs en España.',
    longDefinition:
      'En España, los fondos de inversión (y los planes de pensiones) permiten traspasar el capital de un fondo a otro sin realizar la ganancia patrimonial: el dinero pasa íntegro de un producto a otro y la tributación se difiere hasta el reembolso definitivo. Esto permite cambiar de estrategia, gestora o nivel de riesgo a lo largo de los años sin que cada cambio genere una factura fiscal, dejando que el interés compuesto trabaje sobre el total.\n\nLa diferencia clave con los ETFs es precisamente esta: los ETFs **no** disfrutan del régimen de traspasos en España. Vender un ETF para comprar otro realiza la ganancia o pérdida y tributa ese año en la base del ahorro (19%-28%). Por eso muchos inversores que valoran la flexibilidad fiscal a largo plazo construyen el núcleo de su cartera con fondos indexados en lugar de ETFs.\n\nEl traspaso lo gestiona la comercializadora y es automático para los fondos que cumplen los requisitos legales (entre ellos, superar los 500 partícipes): tú solo ordenas el traspaso y el dinero llega al fondo de destino sin tocar tu cuenta ni tu declaración.',
    example:
      'Tienes 50.000€ en un fondo con 10.000€ de ganancia acumulada y quieres cambiar a otro fondo más barato. Si fuera un ETF, vender realizaría esos 10.000€ y pagarías unos 1.980€ de IRPF. Con un fondo, traspasas los 50.000€ completos al nuevo fondo y no pagas nada hasta que un día reembolses de verdad.',
    relatedArticles: [
      'fondos-indexados-vs-etfs-espana',
      'fiscalidad-etfs-espana-guia-completa',
      'plan-de-pensiones-vs-fondo-indexado',
    ],
    relatedLinks: [
      { label: 'Fondos indexados en España', href: '/fondo' },
      { label: 'Calculadora de IRPF al vender', href: '/calculadora/irpf-venta-fondos' },
    ],
    faq: [
      {
        q: '¿Se puede traspasar un ETF sin tributar como un fondo?',
        a: 'No. El régimen de traspasos solo aplica a fondos de inversión y planes de pensiones. Vender un ETF para comprar otro siempre realiza la ganancia o pérdida y tributa ese año en la base del ahorro del IRPF.',
      },
      {
        q: '¿Cuesta algo traspasar entre fondos?',
        a: 'Fiscalmente no: la ganancia no tributa en el traspaso. Operativamente, las comercializadoras de fondos indexados como MyInvestor no cobran comisión por traspaso. El impuesto solo llega cuando reembolsas definitivamente a tu cuenta.',
      },
    ],
  },
  {
    slug: 'tasa-retirada-segura',
    term: 'Tasa de retirada segura',
    category: 'estrategias',
    shortDefinition:
      'Es el porcentaje de tu cartera que puedes retirar cada año en la jubilación sin agotarla. La referencia clásica es la regla del 4%, que equivale a acumular unas 25 veces tu gasto anual.',
    longDefinition:
      'La tasa de retirada segura (Safe Withdrawal Rate, SWR) responde a la pregunta central del movimiento FIRE: cuánto puedo gastar cada año sin quedarme sin dinero. La cifra más conocida es el 4%, popularizada por el Trinity Study (1998), que analizó carteras mixtas de acciones y bonos en horizontes de 30 años de jubilación.\n\nLa regla del 4% se aplica así: el primer año retiras el 4% de tu cartera y los años siguientes ajustas esa cantidad por la inflación, independientemente de cómo se comporte el mercado. Como 4% equivale a 1/25, el objetivo de capital para ser financieramente independiente es aproximadamente 25 veces tu gasto anual.\n\nEs una guía, no una garantía. La tasa segura real depende del horizonte (más de 30 años exige ser más conservador, en torno a 3,25%-3,5%), de la secuencia de rentabilidades de los primeros años (el riesgo de secuencia) y de tu flexibilidad para recortar gasto en mercados bajistas. Por eso conviene simular el plan con escenarios variables en lugar de fiarse de una sola cifra.',
    example:
      'Si gastas 24.000€ al año, la regla del 4% sugiere un objetivo de 600.000€ (24.000 × 25). Con esa cartera retirarías 24.000€ el primer año y los irías ajustando por inflación cada año siguiente.',
    relatedArticles: [
      'fire-espana-cuanto-necesitas',
      'cuanto-invertir-al-mes-jubilarse-millonario',
      'etfs-dividendos-vivir-rentas-espana',
    ],
    relatedLinks: [
      { label: 'Calculadora FIRE con Monte Carlo', href: '/calculadora/fire-monte-carlo' },
      { label: 'Calculadora de interés compuesto', href: '/calculadora/interes-compuesto' },
    ],
    faq: [
      {
        q: '¿La regla del 4% funciona en España?',
        a: 'Es una referencia útil, pero nació con datos de EE.UU. y un horizonte de 30 años. Para jubilaciones más largas (FIRE temprano) muchos usan tasas más conservadoras (3,25%-3,5%) y conviene contar con la pensión pública y con flexibilidad de gasto. Simula tu caso con escenarios variables antes de fiarte de una sola cifra.',
      },
      {
        q: '¿Cómo se relaciona la tasa de retirada con el número FIRE?',
        a: 'Son las dos caras de lo mismo: una tasa del 4% implica acumular 25 veces tu gasto anual; una del 3,33%, 30 veces. Cuanto más baja es la tasa segura que eliges, más capital necesitas pero menor es el riesgo de agotar la cartera.',
      },
    ],
  },
  {
    slug: 'ganancia-patrimonial',
    term: 'Ganancia patrimonial',
    category: 'fiscalidad',
    shortDefinition:
      'Es el beneficio que obtienes al vender un activo (ETF, fondo, acción) por más de lo que pagaste. En España tributa en la base del ahorro del IRPF, con tipos del 19% al 28% según el importe.',
    longDefinition:
      'La ganancia patrimonial es la diferencia positiva entre el precio de venta de un activo y su precio de adquisición (incluidas las comisiones). Cuando la diferencia es negativa se llama pérdida patrimonial. En la venta de ETFs, fondos, acciones u oro, esa ganancia o pérdida se integra en la base imponible del ahorro del IRPF.\n\nLa escala del ahorro en 2026 es progresiva: 19% hasta 6.000€, 21% de 6.000€ a 50.000€, 23% de 50.000€ a 200.000€, 27% de 200.000€ a 300.000€ y 28% por encima de 300.000€. Solo tributa la ganancia, no el total reembolsado, y cada tramo grava únicamente la parte que cae dentro de él.\n\nUn punto clave de optimización: las pérdidas patrimoniales se compensan con las ganancias del mismo ejercicio y, si el saldo es negativo, se arrastra a los cuatro años siguientes. Esto permite estrategias como aflorar pérdidas para reducir la factura fiscal de un año con muchas plusvalías.',
    example:
      'Compraste participaciones de un ETF por 8.000€ y las vendes por 11.000€: tu ganancia patrimonial es de 3.000€ y tributa al 19% (570€). Si además ese año tuviste 1.000€ de pérdidas en otro fondo, solo tributarías por 2.000€.',
    relatedArticles: [
      'fiscalidad-etfs-espana-guia-completa',
      'como-declarar-etfs-hacienda',
    ],
    relatedLinks: [
      { label: 'Calculadora de IRPF al vender fondos y ETF', href: '/calculadora/irpf-venta-fondos' },
    ],
    faq: [
      {
        q: '¿Cuándo se genera una ganancia patrimonial?',
        a: 'En el momento de la venta o reembolso del activo, no antes. Mientras mantienes un ETF de acumulación sin vender, no hay ganancia patrimonial que declarar aunque su valor haya subido.',
      },
      {
        q: '¿Se pueden compensar las pérdidas con las ganancias?',
        a: 'Sí. Las pérdidas patrimoniales se compensan con ganancias patrimoniales del mismo año; si queda saldo negativo, se arrastra a los cuatro ejercicios siguientes. También hay compensación parcial con rendimientos del capital mobiliario dentro de los límites legales.',
      },
    ],
  },
  {
    slug: 'duracion',
    term: 'Duración',
    category: 'metricas',
    shortDefinition:
      'La duración mide la sensibilidad del precio de un bono (o de un ETF de renta fija) a los cambios en los tipos de interés. Cuanto mayor es la duración, más sube o baja el precio cuando los tipos se mueven.',
    longDefinition:
      'La duración se expresa en años y aproxima cuánto varía el precio de un bono ante un cambio de un punto porcentual en los tipos de interés. La regla práctica: una duración de 7 implica que, si los tipos suben un 1%, el precio cae aproximadamente un 7%; y si bajan un 1%, sube alrededor de un 7%. Es la principal medida del riesgo de tipos de un activo de renta fija.\n\nEn los ETFs de renta fija, la ficha del fondo publica la duración media de la cartera. Un ETF de bonos a corto plazo (duración 1-3 años) apenas se mueve cuando cambian los tipos, mientras que uno de bonos a largo plazo (duración 8-15 años) puede tener oscilaciones fuertes. La caída de muchos ETFs de bonos en 2022 se explica precisamente por la combinación de duraciones altas y una subida rápida de tipos.\n\nElegir la duración es elegir cuánto riesgo de tipos quieres: más duración suele venir con algo más de rentabilidad esperada (TIR), pero también con más volatilidad.',
    example:
      'Un ETF de bonos con duración media de 6,5 años: si el BCE sube los tipos un 1%, cabe esperar una caída de precio cercana al 6,5%. Si los baja un 1%, una subida similar. Por eso, para perfiles conservadores o a corto plazo, suelen preferirse duraciones bajas.',
    relatedArticles: [
      'mejores-etfs-renta-fija-2026',
      'riesgo-divisa-etf-hedged-espana',
      'cartera-boglehead-3-fondos-espana',
    ],
    relatedLinks: [
      { label: 'Mejores ETFs de renta fija', href: '/etfs/renta-fija' },
    ],
    faq: [
      {
        q: '¿Una duración alta es buena o mala?',
        a: 'Ni una cosa ni otra: depende de tu horizonte y tolerancia al riesgo. Una duración alta amplifica las ganancias si los tipos bajan, pero también las pérdidas si suben. Para estabilidad y horizonte corto, duraciones bajas; para apostar por bajadas de tipos a largo plazo, duraciones altas.',
      },
      {
        q: '¿Dónde veo la duración de un ETF de bonos?',
        a: 'En la ficha oficial del ETF en la web de la gestora o en JustETF, normalmente como "duración media" o "modified duration" de la cartera. Es uno de los datos clave a comparar entre ETFs de renta fija.',
      },
    ],
  },
  {
    slug: 'rentabilidad-anualizada',
    term: 'Rentabilidad anualizada',
    category: 'metricas',
    shortDefinition:
      'La rentabilidad anualizada (o CAGR) es la tasa de crecimiento constante por año que llevaría tu inversión desde su valor inicial hasta el final del periodo. Permite comparar inversiones de distinta duración en igualdad de condiciones.',
    longDefinition:
      'La rentabilidad anualizada, conocida en inglés como CAGR (Compound Annual Growth Rate), responde a la pregunta: si mi inversión hubiera crecido al mismo ritmo cada año, ¿cuál habría sido ese ritmo? Se calcula como (valor final / valor inicial) elevado a (1 / número de años) menos 1.\n\nEs más honesta que la media simple de los rendimientos anuales, porque tiene en cuenta el efecto del interés compuesto y no se deja engañar por la volatilidad. Por ejemplo, un año +50% seguido de otro −50% no deja tu dinero igual: lo deja en −25% (la media simple diría 0%). La rentabilidad anualizada refleja ese resultado real.\n\nPara comparar fondos o ETFs, fíjate siempre en la rentabilidad anualizada del mismo periodo y, a ser posible, en términos reales (descontando la inflación). Recuerda que las rentabilidades pasadas no garantizan las futuras: la cifra anualizada describe el pasado, no predice el porvenir.',
    example:
      'Si inviertes 10.000€ y siete años después tienes 16.000€, tu rentabilidad total es del 60%, pero la anualizada es de aproximadamente 6,9% ((16.000/10.000)^(1/7) − 1). Esa es la cifra comparable con otras inversiones.',
    relatedArticles: [
      'interes-compuesto-inversion',
      'mejores-etfs-espana-2026',
      'fire-espana-cuanto-necesitas',
    ],
    relatedLinks: [
      { label: 'Calculadora de interés compuesto', href: '/calculadora/interes-compuesto' },
    ],
    faq: [
      {
        q: '¿Qué diferencia hay entre rentabilidad media y anualizada?',
        a: 'La media simple suma los rendimientos anuales y los divide entre el número de años, ignorando el efecto compuesto. La anualizada (CAGR) parte del valor inicial y final reales, así que refleja lo que de verdad creció tu dinero. Con volatilidad, la anualizada siempre es menor o igual que la media simple.',
      },
      {
        q: '¿La rentabilidad anualizada incluye la inflación?',
        a: 'Por defecto no: la cifra habitual es nominal. Para saber cuánto poder adquisitivo has ganado de verdad, resta la inflación del periodo y obtendrás la rentabilidad real anualizada, que es la que importa a largo plazo.',
      },
    ],
  },
  {
    slug: 'dividendo',
    term: 'Dividendo',
    category: 'productos',
    shortDefinition:
      'Un dividendo es el reparto periódico de beneficios que hace una empresa a sus accionistas. En los ETFs, los dividendos pueden distribuirse al inversor (distribución) o reinvertirse automáticamente dentro del fondo (acumulación).',
    longDefinition:
      'Cuando una empresa obtiene beneficios, puede repartirlos entre sus accionistas en forma de dividendos (pago en efectivo) o retenerlos para reinvertirlos en el negocio. Los dividendos se expresan como un importe por acción (por ejemplo, 0,50€ por acción) y se pagan con la frecuencia establecida por cada empresa: trimestral (habitual en empresas americanas), semestral o anual.\n\nEn los ETFs, el tratamiento de los dividendos depende de la clase del fondo:\n- **ETFs de distribución**: el ETF paga periódicamente los dividendos recibidos de las empresas de la cartera. El inversor recibe dinero en cuenta y tributa ese año como rendimiento del capital mobiliario (19-28%).\n- **ETFs de acumulación**: el ETF reinvierte automáticamente los dividendos comprando más participaciones del propio fondo. El inversor no recibe dinero ni tributa hasta que vende. El efecto del interés compuesto es mayor a largo plazo.\n\nEl rendimiento por dividendo (dividend yield) es el porcentaje que representan los dividendos anuales sobre el precio de la acción o del ETF. Un yield del 3% en un ETF global significa que distribuye aproximadamente un 3% de su valor en dividendos al año.',
    example:
      'Tienes 10.000€ en un ETF de distribución con un yield del 2%. Recibirás aproximadamente 200€ en dividendos al año, sujetos al 19% de IRPF (38€). Con un ETF de acumulación equivalente, esos 200€ se reinvertirían automáticamente sin tributar, generando más participaciones y mayor efecto compuesto.',
    relatedArticles: [
      'etfs-dividendos-vivir-rentas-espana',
      'fiscalidad-etfs-espana-guia-completa',
    ],
    relatedLinks: [
      { label: 'ETFs de distribución', href: '/etfs/distribucion' },
      { label: 'ETFs de acumulación', href: '/etfs/acumulacion' },
    ],
    faq: [
      {
        q: '¿Es mejor un ETF que paga dividendos o uno de acumulación?',
        a: 'Para inversores en fase de acumulación que no necesitan ingresos periódicos, la acumulación suele ser más eficiente: los dividendos se reinvierten sin pasar por Hacienda. Si estás en fase de retiro y quieres rentas periódicas sin vender participaciones, la distribución puede simplificar la gestión.',
      },
      {
        q: '¿Cómo tributan los dividendos de ETFs en España?',
        a: 'Los dividendos de ETFs tributan como rendimientos del capital mobiliario en la base del ahorro del IRPF: 19% hasta 6.000€, 21% de 6.000€ a 50.000€, 23% de 50.000€ a 200.000€, 27% de 200.000€ a 300.000€ y 28% por encima de 300.000€. El broker retiene automáticamente un 19% a cuenta.',
      },
    ],
  },
  {
    slug: 'gestion-pasiva',
    term: 'Gestión pasiva',
    category: 'estrategias',
    shortDefinition:
      'La gestión pasiva consiste en replicar un índice de mercado en lugar de intentar superarlo. Fondos indexados y ETFs son sus principales vehículos: mínima intervención, bajos costes y sin intentar "batir al mercado".',
    longDefinition:
      'La gestión pasiva parte de la evidencia empírica: la mayoría de gestores activos no supera consistentemente al mercado después de comisiones y durante periodos largos. En lugar de contratar analistas para elegir acciones ganadoras, un fondo pasivo simplemente replica la composición de un índice (MSCI World, S&P 500, FTSE All-World) comprando las mismas empresas en las mismas proporciones.\n\nEl resultado: el inversor obtiene exactamente la rentabilidad del mercado menos un TER muy bajo (0,05%-0,30%), frente al 1-2% anual de los fondos activos. A 20-30 años, esa diferencia de coste acumulada puede suponer decenas de miles de euros.\n\n**Gestión activa vs pasiva**: la gestión activa contrata gestores que intentan superar al índice mediante selección de acciones y timing de mercado. Los datos de Standard & Poor\'s SPIVA muestran que en periodos de 10-15 años, más del 85% de los fondos activos en Europa no superan a su índice de referencia después de comisiones. La gestión pasiva no promete rentabilidades superiores, pero sí evitar que las comisiones erosionen tu rentabilidad.',
    example:
      'Un inversor con 50.000€ en un fondo activo con TER del 1,5% paga 750€ al año en comisiones. Con un fondo indexado con TER del 0,10%, pagaría 50€. A 30 años con interés compuesto del 7%, esa diferencia representa aproximadamente 90.000€ en tu cartera final.',
    relatedArticles: [
      'bogleheads-espana-guia-completa',
      'fondos-indexados-vs-etfs-espana',
      'roboadvisors-espana-merecen-comision',
    ],
    relatedLinks: [
      { label: 'Analizador de cartera con IA', href: '/analyzer' },
      { label: 'Catálogo de ETFs UCITS', href: '/etf' },
    ],
    faq: [
      {
        q: '¿La gestión pasiva siempre bate a la activa?',
        a: 'No siempre en el corto plazo: hay gestores activos que superan al mercado en periodos concretos. Pero los datos SPIVA muestran que en periodos de 10-15 años, más del 85% de los fondos activos en Europa no supera a su índice de referencia. La probabilidad de elegir uno de los pocos que sí lo hacen de forma consistente, antes de saberlo, es muy baja.',
      },
      {
        q: '¿Es la gestión pasiva adecuada para todos los inversores?',
        a: 'Para la gran mayoría de inversores particulares a largo plazo, sí. Requiere disciplina para no vender en momentos de pánico y aceptar que tendrás exactamente la rentabilidad del mercado, ni más ni menos. Si no puedes soportar ver tu cartera caer un 30% sin hacer nada, necesitas una asignación más conservadora, no un gestor activo.',
      },
    ],
  },
  {
    slug: 'capitalizacion-bursatil',
    term: 'Capitalización bursátil',
    category: 'metricas',
    shortDefinition:
      'La capitalización bursátil es el valor total en bolsa de una empresa: precio de la acción multiplicado por el número de acciones en circulación. Los índices como el MSCI World ponderan cada empresa según su capitalización.',
    longDefinition:
      'La capitalización bursátil (market cap) se calcula multiplicando el precio actual de cada acción por el número total de acciones en circulación. Si Apple tiene 15.000 millones de acciones a 180€ cada una, su capitalización es 2,7 billones de euros. Es la medida más usada para clasificar el tamaño de una empresa: large cap (grandes), mid cap (medianas), small cap (pequeñas).\n\nLos índices más populares — MSCI World, S&P 500, FTSE All-World — ponderan a cada empresa según su capitalización. Esto significa que si Apple pesa el 5% del S&P 500, invertir 10.000€ en un ETF S&P 500 equivale a poner 500€ en Apple. Si el precio de Apple sube un 10%, el índice (y por tanto tu ETF) sube un 0,5%.\n\nEsta ponderación por capitalización tiene una consecuencia importante: cuando una empresa sube mucho, pesa más en el índice; cuando baja, pesa menos. El índice se "autoajusta" al mercado sin que nadie tenga que decidir cuánto dedicar a cada empresa. Es el fundamento de la filosofía de inversión pasiva.',
    example:
      'En el MSCI World, EE.UU. pesa ~71% porque las empresas americanas son las de mayor capitalización bursátil mundial. Si prefieres una distribución más igualitaria por países (equal weight), no reflejaría el mercado real y requeriría rebalanceos frecuentes.',
    relatedArticles: [
      'que-es-el-msci-world',
      'vwce-analisis-completo',
      'msci-world-vs-msci-acwi-diferencias',
    ],
    relatedLinks: [
      { label: 'Catálogo de ETFs UCITS', href: '/etf' },
      { label: 'ETFs MSCI World', href: '/etfs/msci-world' },
    ],
    faq: [
      {
        q: '¿Por qué los índices pesan tanto en EE.UU.?',
        a: 'Porque las empresas americanas tienen la mayor capitalización bursátil del mundo. Apple, Microsoft, Nvidia, Amazon y Google juntas valen más que toda la bolsa europea combinada. La ponderación por capitalización refleja ese hecho; no es un sesgo artificial sino la distribución real del mercado global.',
      },
      {
        q: '¿Qué diferencia hay entre large cap, mid cap y small cap?',
        a: 'Son clasificaciones por tamaño de empresa. Aunque no hay una cifra universal, se suele considerar large cap a empresas con más de 10.000 millones de dólares de capitalización, mid cap entre 2.000 y 10.000 millones, y small cap por debajo de 2.000 millones. Los índices MSCI World y S&P 500 cubren large y mid cap; para small cap necesitas ETFs específicos como WSML o IUSN.',
      },
    ],
  },
  {
    slug: 'inflacion',
    term: 'Inflación',
    category: 'conceptos',
    shortDefinition:
      'La inflación es el aumento generalizado del nivel de precios a lo largo del tiempo. Erosiona el poder adquisitivo del dinero y es uno de los principales argumentos para invertir en lugar de mantener el ahorro en cuenta corriente.',
    longDefinition:
      'La inflación mide cuánto sube el nivel general de precios en un periodo. Si la inflación es del 3% anual, lo que hoy cuesta 100€ costará 103€ dentro de un año. El poder adquisitivo del dinero en efectivo se reduce en esa proporción: 100€ guardados en un cajón valen 97€ de hoy al cabo de un año.\n\nEn la planificación financiera, la inflación tiene tres implicaciones clave:\n1. **El ahorro sin invertir pierde valor**: una cuenta corriente al 0-1% con inflación al 3% implica una rentabilidad real negativa.\n2. **Las proyecciones FIRE y de jubilación deben estar en términos reales**: lo que hoy cuesta 30.000€ al año costará más en el futuro. Las calculadoras serias distinguen entre rentabilidad nominal y rentabilidad real (nominal menos inflación).\n3. **Los activos reales como la renta variable tienden a preservar el poder adquisitivo a largo plazo**: las empresas ajustan sus precios con la inflación y, en períodos suficientemente largos, sus acciones han superado a la inflación de forma sistemática.\n\nLa inflación en España la mide el INE mediante el IPC (Índice de Precios al Consumo). El BCE tiene como objetivo una inflación cercana al 2% en la eurozona a medio plazo.',
    example:
      'Si tienes 100.000€ en cuenta corriente al 0% durante 10 años con una inflación media del 2,5%, al final tendrás los mismos 100.000€ nominales pero su poder adquisitivo real habrá caído a unos 78.000€. Una cartera de fondos indexados que rente un 7% nominal daría una rentabilidad real de ~4,5% y multiplicaría tu patrimonio real en ese periodo.',
    relatedArticles: [
      'interes-compuesto-inversion',
      'fire-espana-cuanto-necesitas',
      'bogleheads-espana-guia-completa',
    ],
    relatedLinks: [
      { label: 'Calculadora de interés compuesto', href: '/calculadora/interes-compuesto' },
      { label: 'Calculadora FIRE con Monte Carlo', href: '/calculadora/fire-monte-carlo' },
    ],
    faq: [
      {
        q: '¿Cómo afecta la inflación a los ETFs?',
        a: 'La inflación erosiona el poder adquisitivo de todos los activos nominales (efectivo, bonos a tipo fijo). Las acciones, al representar participaciones en empresas reales que pueden subir precios, tienden a proteger el poder adquisitivo a largo plazo. Por eso, una cartera diversificada de renta variable global como el MSCI World ha superado históricamente a la inflación en periodos de 10+ años.',
      },
      {
        q: '¿Debo incluir la inflación en mis proyecciones de inversión?',
        a: 'Sí, especialmente para planificación FIRE o de jubilación. Para ser prudente, trabaja en términos reales: si esperas un 7% nominal y 2,5% de inflación, usa 4,5% como rentabilidad real en tus cálculos. La calculadora de interés compuesto de BogleHub te permite introducir la rentabilidad que quieras; si introduces la real, el resultado estará en euros de hoy.',
      },
    ],
  },
  {
    slug: 'gestion-activa',
    term: 'Gestión activa',
    category: 'estrategias',
    shortDefinition:
      'La gestión activa consiste en que un gestor profesional selecciona activos intentando superar a un índice de referencia (benchmark). En contraposición a la gestión pasiva (indexada), implica mayor coste y, según los datos, peores resultados a largo plazo para la mayoría de fondos.',
    longDefinition:
      'Un fondo de gestión activa emplea analistas y gestores que seleccionan activos, hacen rotaciones de cartera y ajustan posiciones intentando superar la rentabilidad de su benchmark. Este proceso tiene un coste: las comisiones de gestión activa en España oscilan entre el 1% y el 2,5% anual, frente al 0,05%-0,30% de los fondos indexados.\n\nEl problema de la gestión activa es estadístico: Standard & Poor\'s publica anualmente el informe SPIVA que mide qué porcentaje de fondos activos supera a su índice. Los datos son consistentes: en periodos de 10-15 años, entre el 80% y el 95% de los fondos activos europeos no supera al índice de referencia después de comisiones.\n\nEsto no significa que la gestión activa sea siempre inferior. Existen gestores que superan al mercado consistentemente durante décadas (Warren Buffett es el más conocido). El problema es identificarlos de antemano y que la minoría que lo logra no compensa estadísticamente para quien tiene que elegir entre cientos de fondos.\n\n**La trampa de la comisión**: un fondo que bate al índice un 1% pero cobra un 2% extra tiene rendimiento neto negativo frente a indexarse. La gestión activa parte con una desventaja estructural igual a la diferencia de comisiones.',
    example:
      'Un fondo activo de renta variable española cobra 1,8% de comisión y su índice de referencia (IBEX 35) sube un 8%. Para que el fondo sea mejor que indexarse al IBEX con un ETF al 0,20%, el gestor necesita generar al menos un 1,6% de alfa (rendimiento adicional) cada año. Según SPIVA, la mayoría no lo consigue de forma consistente.',
    relatedArticles: [
      'bogleheads-espana-guia-completa',
      'fondos-indexados-vs-etfs-espana',
      'roboadvisors-espana-merecen-comision',
    ],
    relatedLinks: [
      { label: 'Glosario: gestión pasiva', href: '/glosario/gestion-pasiva' },
      { label: 'Catálogo de ETFs UCITS', href: '/etf' },
    ],
    faq: [
      {
        q: '¿Por qué los fondos de mi banco son de gestión activa?',
        a: 'Porque la gestión activa es más rentable para el banco que para el cliente. Un fondo con comisión del 1,8% da al banco mucho más ingreso que un fondo indexado al 0,20%. Los bancos tienen un claro incentivo económico para comercializar sus fondos activos propios, aunque la evidencia muestre que la mayoría de ellos no supera al mercado.',
      },
      {
        q: '¿Hay casos en que la gestión activa tenga sentido?',
        a: 'En mercados poco eficientes (small caps emergentes, bonos high yield poco líquidos) hay más oportunidades de generar alfa. También para carteras con objetivos muy específicos (renta fija a plazo definido, estrategias de cobertura). Para el inversor particular a largo plazo con una cartera estándar de renta variable global, la gestión pasiva tiene ventaja estructural por coste.',
      },
    ],
  },
  {
    slug: 'reit',
    term: 'REIT',
    fullForm: 'REIT (Real Estate Investment Trust)',
    category: 'productos',
    shortDefinition:
      'Un REIT es una empresa cotizada que posee y gestiona inmuebles que generan rentas (oficinas, centros comerciales, viviendas, logística). Permite invertir en inmobiliario a través de bolsa, sin comprar propiedades directamente.',
    longDefinition:
      'Un REIT (Real Estate Investment Trust) es una sociedad cotizada en bolsa cuyo negocio es poseer, gestionar o financiar inmuebles que producen ingresos por alquiler. En España, la figura equivalente es la SOCIMI (Sociedad Cotizada de Inversión en el Mercado Inmobiliario). Los REITs están obligados por ley a distribuir la mayor parte de sus beneficios como dividendos, lo que los convierte en una fuente de rentas relativamente alta.\n\nPara el inversor indexado, la forma más sencilla de tener exposición a REITs es a través de un ETF de REITs (como los que replican el índice FTSE EPRA Nareit), que diversifica entre cientos de sociedades inmobiliarias globales en un solo producto. Esto da exposición al sector inmobiliario sin el capital, la iliquidez ni la gestión que exige comprar un piso para alquilar.\n\n**¿Hace falta un REIT en una cartera Boglehead?** No necesariamente. Los índices globales como el MSCI World o el FTSE All-World ya incluyen REITs en su proporción de mercado (alrededor del 3%). Sobreponderar inmobiliario con un ETF específico de REITs es una apuesta sectorial activa, no una necesidad de diversificación.',
    example:
      'Un ETF de REITs globales puede tener un dividend yield del 3-4% anual, superior al de un ETF de renta variable general (~2%). A cambio, el sector inmobiliario es más sensible a los tipos de interés: cuando los tipos suben, los REITs suelen caer porque su deuda se encarece y sus dividendos compiten con los bonos.',
    relatedArticles: [
      'etfs-dividendos-vivir-rentas-espana',
      'cartera-boglehead-3-fondos-espana',
    ],
    relatedLinks: [
      { label: 'ETFs de dividendos y distribución', href: '/etfs/distribucion' },
      { label: 'Catálogo de ETFs UCITS', href: '/etf' },
    ],
    faq: [
      {
        q: '¿Cómo tributan los dividendos de un ETF de REITs en España?',
        a: 'Igual que cualquier dividendo de ETF: como rendimiento del capital mobiliario en la base del ahorro del IRPF (19% hasta 6.000€, 21% de 6.000€ a 50.000€, etc.). Si el ETF es de acumulación, no hay tributación hasta la venta. Si es de distribución, tributas cada año por los dividendos recibidos.',
      },
      {
        q: '¿Es mejor invertir en un REIT o comprar un piso para alquilar?',
        a: 'Son cosas distintas. Un ETF de REITs ofrece diversificación entre cientos de inmuebles globales, liquidez total (vendes cuando quieras) y cero gestión, pero menos control. Comprar un piso da control directo y posible apalancamiento con hipoteca, pero concentra todo el riesgo en un activo, exige gestión activa y tiene altos costes de entrada y salida. Para diversificar, el ETF de REITs es más eficiente.',
      },
    ],
  },
  {
    slug: 'prima-riesgo',
    term: 'Prima de riesgo',
    category: 'conceptos',
    shortDefinition:
      'La prima de riesgo es la rentabilidad adicional que un inversor exige por asumir un activo más arriesgado frente a uno seguro. En bolsa, es el extra que se espera de las acciones sobre los bonos del Estado.',
    longDefinition:
      'La prima de riesgo (risk premium) es el concepto que explica por qué las acciones rinden más que los bonos a largo plazo: los inversores no asumirían la mayor volatilidad de la renta variable sin esperar a cambio una rentabilidad superior. Esa diferencia esperada es la prima de riesgo de las acciones (equity risk premium), históricamente situada en torno al 4-6% anual sobre los bonos del Estado.\n\nEl término tiene dos usos habituales:\n1. **Prima de riesgo de las acciones**: el exceso de rentabilidad esperado de la bolsa sobre el activo libre de riesgo. Es la razón fundamental por la que invertir en renta variable a largo plazo tiene sentido.\n2. **Prima de riesgo país**: en el contexto de deuda soberana, el diferencial entre el bono de un país y el bono alemán (el "bund", considerado el más seguro de la eurozona). La prima de riesgo española es el sobreprecio que paga España frente a Alemania por financiarse.\n\nPara el inversor indexado, la idea clave es que la prima de riesgo no está garantizada: es una expectativa basada en datos históricos. Hay periodos largos (una década o más) en que las acciones no superan a los bonos. Por eso el horizonte temporal largo es esencial: cuanto más tiempo, mayor probabilidad de capturar la prima de riesgo.',
    example:
      'Si los bonos del Estado alemán rinden un 2,5% y esperas que la bolsa global rinda un 7%, la prima de riesgo de las acciones que estás asumiendo es de aproximadamente 4,5 puntos porcentuales. Ese 4,5% es tu compensación esperada por aguantar la volatilidad de la renta variable.',
    relatedArticles: [
      'que-hacer-cuando-el-mercado-cae',
      'bogleheads-espana-guia-completa',
      'mejores-etfs-renta-fija-2026',
    ],
    relatedLinks: [
      { label: 'Calculadora FIRE con Monte Carlo', href: '/calculadora/fire-monte-carlo' },
    ],
    faq: [
      {
        q: '¿La prima de riesgo de las acciones está garantizada?',
        a: 'No. Es una expectativa basada en datos históricos de más de un siglo, pero no una garantía. Hay periodos de 10-15 años en que las acciones no superan a los bonos. Por eso la inversión en renta variable requiere horizontes largos: cuanto más tiempo mantienes la inversión, mayor es la probabilidad histórica de capturar la prima de riesgo.',
      },
      {
        q: '¿Qué es la prima de riesgo de un país como España?',
        a: 'Es el diferencial de tipos de interés entre el bono a 10 años de España y el bono alemán (bund), considerado el más seguro de la eurozona. Si el bono español rinde 3,3% y el alemán 2,5%, la prima de riesgo española es de 80 puntos básicos (0,8%). Refleja cuánto más caro le resulta a España financiarse por su mayor percepción de riesgo.',
      },
    ],
  },
  {
    slug: 'fondo-monetario',
    term: 'Fondo monetario',
    category: 'productos',
    shortDefinition:
      'Un fondo monetario invierte en deuda a muy corto plazo (letras del Tesoro, depósitos, papel comercial) y es una alternativa de bajo riesgo a la cuenta corriente para aparcar liquidez con una rentabilidad ligada a los tipos del BCE.',
    longDefinition:
      'Un fondo monetario (money market fund) invierte en activos de deuda de muy corto plazo y alta calidad crediticia: letras del Tesoro, depósitos bancarios, repos y papel comercial con vencimientos de días o pocos meses. Su objetivo no es batir al mercado sino preservar el capital y ofrecer una rentabilidad cercana al tipo de interés a corto plazo del BCE, con volatilidad mínima.\n\nPara el inversor en España, los fondos monetarios cobraron protagonismo con la subida de tipos de 2023-2024: cuando el BCE subió los tipos, estos fondos pasaron a rentar en torno al 3% anual con riesgo muy bajo. Tienen dos ventajas sobre una cuenta remunerada: rinden el tipo de mercado sin condiciones de nómina ni límites de saldo, y al ser fondos de inversión disfrutan del **traspaso fiscal libre** — puedes mover el dinero a un fondo de renta variable sin tributar cuando decidas invertir.\n\n**Cuándo usar un fondo monetario**: para liquidez que quieres tener disponible a corto plazo (fondo de emergencia, dinero esperando ser invertido, ahorro para un objetivo cercano). No es un sustituto de la renta variable a largo plazo: su rentabilidad real (descontada la inflación) es cercana a cero en el largo plazo.',
    example:
      'Con los tipos del BCE al 3%, un fondo monetario en euros puede rentar alrededor del 2,7-2,9% anual con riesgo muy bajo. Si tienes 20.000€ esperando para invertir en bolsa pero quieres entrar de forma escalonada, un fondo monetario te da ~550€/año mientras decides, y puedes traspasarlo a tu fondo indexado sin tributar.',
    relatedArticles: [
      'dca-vs-lump-sum-aportar-mensual',
      'mejores-etfs-renta-fija-2026',
      'como-hacer-traspaso-fondos-espana',
    ],
    relatedLinks: [
      { label: 'Glosario: traspaso de fondos', href: '/glosario/traspaso' },
      { label: 'Glosario: renta fija', href: '/glosario/renta-fija' },
    ],
    faq: [
      {
        q: '¿Es seguro un fondo monetario?',
        a: 'Es de los productos de inversión de menor riesgo, pero no está garantizado como un depósito. Invierte en deuda a muy corto plazo de alta calidad, por lo que su volatilidad es mínima y las pérdidas son muy improbables en condiciones normales. No está cubierto por el Fondo de Garantía de Depósitos (no es un depósito), sino que su seguridad viene de la calidad y diversificación de los activos subyacentes.',
      },
      {
        q: '¿Fondo monetario o cuenta remunerada?',
        a: 'El fondo monetario rinde el tipo de mercado sin condiciones de nómina ni límite de saldo, y permite traspaso fiscal libre a otros fondos. La cuenta remunerada está cubierta por el Fondo de Garantía de Depósitos (hasta 100.000€) y suele dar disponibilidad inmediata. Para liquidez grande sin condiciones, el fondo monetario; para máxima seguridad y disponibilidad, la cuenta remunerada.',
      },
    ],
  },
  {
    slug: 'letras-del-tesoro',
    term: 'Letras del Tesoro',
    category: 'productos',
    shortDefinition:
      'Las Letras del Tesoro son deuda pública española a corto plazo (3 a 12 meses) emitida por el Estado. Son uno de los activos de menor riesgo disponibles y ganaron mucha popularidad con la subida de tipos de 2023-2024.',
    longDefinition:
      'Las Letras del Tesoro son títulos de deuda pública emitidos por el Tesoro Público español con vencimientos a 3, 6, 9 y 12 meses. Se emiten al descuento: compras la letra por debajo de su valor nominal y al vencimiento recibes el nominal completo; la diferencia es tu rentabilidad. Están respaldadas por el Estado español, lo que las convierte en uno de los activos de menor riesgo disponibles para el inversor particular.\n\nEntre 2023 y 2024, con la subida de tipos del BCE, las Letras del Tesoro pasaron de rentar casi nada a ofrecer rentabilidades en torno al 3% anual, lo que provocó colas en el Banco de España de pequeños ahorradores comprándolas directamente. Se pueden adquirir en las subastas del Tesoro (a través de su web o del Banco de España) o en el mercado secundario a través de un broker.\n\n**Diferencia clave con los fondos monetarios o ETFs de renta fija a corto plazo**: comprar Letras directamente significa mantenerlas hasta vencimiento y gestionar tú la reinversión. Un fondo monetario o un ETF de letras hace esa gestión por ti de forma diversificada y con liquidez diaria, a cambio de un pequeño TER. Para importes pequeños y comodidad, el fondo suele ser más práctico; para importes grandes y mantener hasta vencimiento, la compra directa evita comisiones.',
    example:
      'Una Letra del Tesoro a 12 meses con rentabilidad del 2,8% comprada por 9.728€ te devuelve 10.000€ al cabo de un año. La diferencia (272€) es tu rendimiento, que tributa como rendimiento del capital mobiliario en la base del ahorro del IRPF.',
    relatedArticles: [
      'mejores-etfs-renta-fija-2026',
      'que-hacer-cuando-el-mercado-cae',
    ],
    relatedLinks: [
      { label: 'Glosario: fondo monetario', href: '/glosario/fondo-monetario' },
      { label: 'Glosario: renta fija', href: '/glosario/renta-fija' },
    ],
    faq: [
      {
        q: '¿Cómo se compran Letras del Tesoro en España?',
        a: 'Hay dos vías: (1) directamente en las subastas del Tesoro Público a través de su web con certificado digital, o presencialmente en el Banco de España; (2) en el mercado secundario a través de un broker. La compra directa en el Tesoro no tiene comisiones. Para importes pequeños y gestión automática de la reinversión, un fondo monetario o un ETF de letras puede ser más cómodo.',
      },
      {
        q: '¿Cómo tributan las Letras del Tesoro?',
        a: 'El rendimiento de las Letras del Tesoro (diferencia entre precio de compra y valor de reembolso) tributa como rendimiento del capital mobiliario en la base del ahorro del IRPF: 19% hasta 6.000€, 21% de 6.000€ a 50.000€, y tramos superiores. A diferencia de los fondos, las Letras no permiten traspaso fiscal: cada vencimiento realiza el rendimiento y tributa.',
      },
    ],
  },
  {
    slug: 'dividend-yield',
    term: 'Dividend yield',
    fullForm: 'Dividend yield (rendimiento por dividendo)',
    category: 'metricas',
    shortDefinition:
      'El dividend yield es el porcentaje que representan los dividendos anuales sobre el precio de una acción o un ETF. Mide cuánta renta genera la inversión por dividendos, sin contar la revalorización del precio.',
    longDefinition:
      'El dividend yield (rendimiento por dividendo) se calcula dividiendo los dividendos pagados en un año entre el precio actual de la acción o del ETF, expresado en porcentaje. Si un ETF cotiza a 100€ y reparte 3€ de dividendos al año, su dividend yield es del 3%.\n\nEs una métrica clave para inversores que buscan rentas periódicas (estrategia de dividendos, fase FIRE de retirada). Un ETF de renta variable global tiene un yield típico del 1,5-2,5%; los ETFs específicos de dividendos altos pueden llegar al 3-5%, y los REITs o sectores como utilities suelen ofrecer yields superiores.\n\nDos avisos importantes: (1) un yield muy alto no siempre es bueno — puede reflejar que el precio ha caído mucho (la empresa está en problemas) más que un dividendo generoso; (2) el yield solo mide la renta por dividendos, no la rentabilidad total. Un ETF de acumulación con yield "0%" reinvierte sus dividendos internamente y puede tener una rentabilidad total mayor que uno de distribución con yield alto. Lo que importa a largo plazo es la rentabilidad total (precio + dividendos), no solo el yield.',
    example:
      'Un ETF de dividendos como el VHYL con un dividend yield del 3,5% sobre una inversión de 50.000€ generaría unos 1.750€ brutos al año en dividendos. En España, esos dividendos tributan en la base del ahorro del IRPF (19% el primer tramo), así que netos serían algo menos.',
    relatedArticles: [
      'etfs-dividendos-vivir-rentas-espana',
      'fiscalidad-etfs-espana-guia-completa',
    ],
    relatedLinks: [
      { label: 'Glosario: dividendo', href: '/glosario/dividendo' },
      { label: 'ETFs de distribución', href: '/etfs/distribucion' },
    ],
    faq: [
      {
        q: '¿Un dividend yield alto es mejor?',
        a: 'No necesariamente. Un yield muy alto a veces refleja que el precio de la acción ha caído (señal de problemas), no un dividendo especialmente generoso. Además, el yield solo mide la renta por dividendos, no la rentabilidad total. Para acumular patrimonio a largo plazo, un ETF de acumulación suele ser más eficiente que perseguir yields altos.',
      },
      {
        q: '¿Qué dividend yield tiene un ETF global típico?',
        a: 'Un ETF de renta variable global (MSCI World, FTSE All-World) suele tener un dividend yield de entre el 1,5% y el 2,5% anual. Los ETFs específicos de dividendos altos pueden alcanzar el 3-5%, a costa de menos diversificación o sesgos sectoriales. Recuerda que en los ETFs de acumulación no recibes esos dividendos: se reinvierten dentro del fondo.',
      },
    ],
  },
  {
    slug: 'benchmark',
    term: 'Benchmark',
    fullForm: 'Benchmark (índice de referencia)',
    category: 'metricas',
    shortDefinition:
      'Un benchmark es el índice de referencia con el que se compara la rentabilidad de un fondo o una cartera. Sirve para saber si una inversión lo ha hecho mejor o peor que su mercado.',
    longDefinition:
      'Un benchmark (índice de referencia) es la vara de medir de cualquier inversión. Es un índice de mercado representativo — el MSCI World, el S&P 500, el FTSE All-World, un índice de bonos — que se usa para juzgar si un fondo o una cartera ha tenido un buen o mal comportamiento en relación con su mercado.\n\nPara la inversión indexada, el benchmark es el centro de la filosofía: un fondo indexado no intenta superar a su benchmark, sino replicarlo lo más fielmente posible al menor coste. Por eso la métrica clave de un fondo indexado no es cuánto sube, sino su tracking difference (cuánto se desvía de su índice). Un buen fondo indexado replica su benchmark casi exactamente menos un TER mínimo.\n\nPara la gestión activa, en cambio, el benchmark es el rival a batir: un fondo activo de renta variable europea se compara con un índice europeo, y su gestor cobra por intentar superarlo. Los datos (informes SPIVA) muestran que la mayoría de fondos activos no supera a su benchmark de forma consistente después de comisiones. Elegir bien el benchmark adecuado es importante: comparar un fondo de small caps con el S&P 500 no tiene sentido; cada estrategia tiene su índice de referencia apropiado.',
    example:
      'Si tu cartera de renta variable global sube un 8% en un año y su benchmark (el MSCI ACWI) sube un 9%, has quedado un punto por debajo del mercado. Para un inversor indexado, ese 1% de diferencia debería ser solo el TER y pequeñas desviaciones; si es mayor, conviene revisar qué fondo tienes.',
    relatedArticles: [
      'que-es-el-msci-world',
      'bogleheads-espana-guia-completa',
      'mejores-etfs-espana-2026',
    ],
    relatedLinks: [
      { label: 'Glosario: tracking difference', href: '/glosario/tracking-difference' },
      { label: 'Glosario: gestión pasiva', href: '/glosario/gestion-pasiva' },
    ],
    faq: [
      {
        q: '¿Qué benchmark debo usar para mi cartera?',
        a: 'Depende de su composición. Para una cartera de renta variable global, el benchmark natural es un índice global como el MSCI ACWI o el FTSE All-World. Si tu cartera es 100% S&P 500, compárala con el S&P 500. Lo importante es comparar con un índice que refleje el mismo tipo de activos y regiones que tienes, no con uno arbitrario.',
      },
      {
        q: '¿Por qué un fondo indexado no intenta superar a su benchmark?',
        a: 'Porque la filosofía indexada parte de que batir al mercado de forma consistente es muy difícil y caro. En vez de intentarlo, el fondo indexado replica el benchmark al menor coste posible, garantizando la rentabilidad del mercado menos un TER mínimo. La evidencia muestra que esto supera a la mayoría de fondos activos a largo plazo.',
      },
    ],
  },
  {
    slug: 'mercado-bajista',
    term: 'Mercado bajista',
    fullForm: 'Mercado bajista (bear market)',
    category: 'conceptos',
    shortDefinition:
      'Un mercado bajista (bear market) es una caída sostenida de las bolsas, habitualmente del 20% o más desde su máximo reciente. Su opuesto es el mercado alcista (bull market), de subidas prolongadas.',
    longDefinition:
      'Se considera mercado bajista (bear market) cuando un índice bursátil cae un 20% o más desde su máximo reciente y la caída se prolonga en el tiempo. El término opuesto es el mercado alcista (bull market), un periodo sostenido de subidas. Son parte normal del ciclo: históricamente, las bolsas globales han tenido un mercado bajista cada pocos años, y siempre se han recuperado superando máximos anteriores, aunque nadie sabe cuándo.\n\nPara el inversor indexado a largo plazo, el mercado bajista es la prueba psicológica más dura y, a la vez, la oportunidad que construye la rentabilidad futura. Las aportaciones que haces durante una caída compran participaciones más baratas, que se revalorizan cuando el mercado se recupera. El error clásico no es sufrir un mercado bajista, sino vender en pánico durante uno y perderse la recuperación.\n\nLa estrategia Boglehead frente a un mercado bajista es deliberadamente aburrida: seguir aportando según el plan, no mirar la cartera todos los días y no intentar adivinar el suelo. El riesgo real de una caída no es la caída en sí, sino la decisión emocional de abandonar el plan en el peor momento.',
    example:
      'En 2022, el MSCI World cayó más de un 20% en euros: fue un mercado bajista. Quien siguió aportando mensualmente compró a precios bajos durante meses; quien vendió en el mínimo realizó la pérdida y se perdió la recuperación posterior. La diferencia entre ambos no fue la cartera, sino el comportamiento.',
    relatedArticles: [
      'que-hacer-cuando-el-mercado-cae',
      'dca-vs-lump-sum-aportar-mensual',
      'bogleheads-espana-guia-completa',
    ],
    relatedLinks: [
      { label: 'Glosario: volatilidad', href: '/glosario/volatilidad' },
      { label: 'Glosario: drawdown', href: '/glosario/drawdown' },
    ],
    faq: [
      {
        q: '¿Qué hago con mi cartera indexada en un mercado bajista?',
        a: 'La respuesta Boglehead es: seguir el plan. Si estás en fase de acumulación, sigue aportando (compras más barato); no vendas en pánico, porque realizarías la pérdida y te perderías la recuperación. Si la caída te quita el sueño, probablemente tu asignación a renta variable es demasiado alta para tu tolerancia al riesgo: ajústala cuando el mercado se recupere, no en el mínimo.',
      },
      {
        q: '¿Cuánto dura un mercado bajista?',
        a: 'Varía mucho: algunos duran pocos meses y otros más de un año. Históricamente, los mercados bajistas han sido más cortos que los alcistas, y las bolsas globales siempre han acabado superando sus máximos anteriores, aunque nadie puede predecir cuándo. Por eso la estrategia indexada se basa en el tiempo dentro del mercado, no en intentar adivinar el momento.',
      },
    ],
  },
  {
    slug: 'liquidez',
    term: 'Liquidez',
    category: 'conceptos',
    shortDefinition:
      'La liquidez es la facilidad con la que un activo se puede convertir en dinero sin perder valor. Un ETF muy negociado es muy líquido; un inmueble o un fondo poco común, mucho menos.',
    longDefinition:
      'La liquidez mide lo fácil y rápido que es vender un activo y recibir su dinero a un precio justo. El efectivo es el activo más líquido por definición. Las acciones y ETFs de grandes índices (S&P 500, MSCI World) son muy líquidos: hay tantos compradores y vendedores que puedes vender al instante con un spread mínimo. En el otro extremo, un inmueble puede tardar meses en venderse y un ETF muy nicho puede tener poca negociación y spreads amplios.\n\nLa liquidez tiene dos implicaciones prácticas para el inversor indexado:\n1. **Coste de entrada y salida**: un ETF poco líquido tiene mayor spread (diferencia entre precio de compra y venta), lo que encarece cada operación. Por eso conviene elegir ETFs grandes y muy negociados como los que replican índices globales.\n2. **Fondo de emergencia**: la parte de tu dinero que puedas necesitar pronto debe estar en activos líquidos y estables (cuenta remunerada, fondo monetario), no en renta variable, que es líquida pero volátil — puedes venderla rápido, pero quizá en pérdidas si el mercado ha caído.\n\nNo hay que confundir liquidez con estabilidad: un ETF de bolsa es muy líquido (se vende al instante) pero volátil (su precio sube y baja). El efectivo es líquido y estable; las acciones, líquidas pero no estables.',
    example:
      'VWCE o IWDA son ETFs con altísima liquidez: mueven millones al día, así que puedes comprar o vender al instante con un spread de céntimos. Un ETF temático muy pequeño puede tener tan poca negociación que vender una posición grande mueva el precio en tu contra.',
    relatedArticles: [
      'como-elegir-tu-primer-etf-espana-2026',
      'fire-espana-cuanto-necesitas',
    ],
    relatedLinks: [
      { label: 'Glosario: spread', href: '/glosario/spread' },
      { label: 'Glosario: fondo monetario', href: '/glosario/fondo-monetario' },
    ],
    faq: [
      {
        q: '¿Por qué importa la liquidez al elegir un ETF?',
        a: 'Porque un ETF con poca liquidez tiene un spread más amplio (mayor diferencia entre el precio al que compras y al que vendes), lo que encarece cada operación. Los ETFs que replican índices globales grandes (MSCI World, S&P 500, FTSE All-World) tienen muchísima liquidez y spreads mínimos, así que para el inversor indexado son la opción más eficiente también por este motivo.',
      },
      {
        q: '¿La renta variable es líquida?',
        a: 'Sí, pero líquida no es lo mismo que estable. Un ETF de bolsa lo vendes al instante (es líquido), pero su precio es volátil: puede que tengas que venderlo en pérdidas si el mercado ha caído. Por eso el dinero que puedas necesitar a corto plazo conviene tenerlo en activos líquidos Y estables (cuenta remunerada, fondo monetario), no en renta variable.',
      },
    ],
  },
  {
    slug: 'correlacion',
    term: 'Correlación',
    category: 'metricas',
    shortDefinition:
      'La correlación mide cómo se mueven dos activos entre sí: si suben y bajan a la vez (correlación alta) o de forma independiente o contraria (correlación baja o negativa). Es la base de la diversificación.',
    longDefinition:
      'La correlación es una medida estadística entre -1 y +1 que indica cómo se relacionan los movimientos de dos activos. Una correlación de +1 significa que se mueven exactamente igual; de -1, que se mueven justo al contrario; y de 0, que son independientes.\n\nEs el concepto que da sentido a la diversificación. Combinar activos poco o negativamente correlacionados reduce la volatilidad de la cartera sin sacrificar necesariamente rentabilidad, porque cuando uno baja, el otro tiende a aguantar o subir. El ejemplo clásico es la renta variable y los bonos de gobierno de calidad: en muchas crisis bursátiles, los bonos han subido mientras las acciones caían, amortiguando el golpe.\n\nDos advertencias prácticas: (1) las correlaciones no son fijas — pueden cambiar, y en crisis severas muchos activos caen a la vez (la correlación se dispara justo cuando más necesitarías diversificación); (2) diversificar entre activos muy correlacionados (por ejemplo, un ETF del S&P 500 y otro del Nasdaq 100) aporta poco, porque se mueven casi igual. La verdadera diversificación viene de combinar clases de activos distintas, no de acumular productos parecidos.',
    example:
      'Un ETF de renta variable global y un ETF de bonos de gobierno de la eurozona tienen correlación baja o negativa en muchos periodos: cuando las bolsas caen con fuerza, los bonos de calidad suelen subir, suavizando la caída de la cartera. En cambio, un ETF del S&P 500 y uno del Nasdaq 100 tienen correlación altísima: diversificas poco combinándolos.',
    relatedArticles: [
      'cartera-boglehead-3-fondos-espana',
      'mejores-etfs-renta-fija-2026',
      'solapamiento-etfs-error-silencioso',
    ],
    relatedLinks: [
      { label: 'Glosario: diversificación', href: '/glosario/diversificacion' },
      { label: 'Glosario: asset allocation', href: '/glosario/asset-allocation' },
    ],
    faq: [
      {
        q: '¿Por qué importa la correlación en una cartera?',
        a: 'Porque combinar activos poco correlacionados reduce la volatilidad de la cartera: cuando uno baja, el otro tiende a aguantar. Esa es la esencia de la diversificación. Acumular activos muy correlacionados (como varios ETFs de tecnología estadounidense) no diversifica de verdad, porque se mueven casi igual. La diversificación útil viene de mezclar clases de activos distintas.',
      },
      {
        q: '¿La diversificación falla en las crisis?',
        a: 'En crisis severas, muchas clases de activos de riesgo (acciones de distintas regiones, bonos corporativos, materias primas) tienden a caer a la vez: la correlación se dispara justo cuando más necesitarías protección. Los activos que mejor han descorrelacionado en crisis han sido los bonos de gobierno de máxima calidad y, en algunos casos, el oro. Aun así, ninguna diversificación elimina por completo el riesgo de mercado.',
      },
    ],
  },
  {
    slug: 'coste-oportunidad',
    term: 'Coste de oportunidad',
    category: 'conceptos',
    shortDefinition:
      'El coste de oportunidad es lo que dejas de ganar por elegir una opción en lugar de otra. En inversión, tener dinero parado en efectivo tiene el coste de oportunidad de la rentabilidad que habría dado invertido.',
    longDefinition:
      'El coste de oportunidad es uno de los conceptos más útiles para tomar decisiones financieras: cada euro que destinas a una cosa es un euro que no puedes destinar a otra, y el "coste" de tu elección es el beneficio de la mejor alternativa que descartas.\n\nEn inversión aparece constantemente:\n- **Dinero en efectivo sin invertir**: si tienes 20.000€ parados en una cuenta al 0% mientras "esperas el momento", el coste de oportunidad es la rentabilidad que esos 20.000€ habrían generado invertidos. Como el mercado sube más años de los que baja, esperar suele tener un coste de oportunidad alto.\n- **Amortizar hipoteca vs invertir**: el coste de oportunidad de amortizar es la rentabilidad que habrías obtenido invirtiendo ese dinero; el de invertir es el interés que te ahorrarías amortizando. Se comparan ambos.\n- **Elegir un fondo caro**: el coste de oportunidad de pagar un 1,5% extra de comisiones es todo lo que ese dinero habría compuesto a lo largo de décadas.\n\nPensar en términos de coste de oportunidad ayuda a no fijarse solo en lo que una decisión te da, sino también en lo que te quita respecto a la mejor alternativa. Es la razón por la que "no hacer nada" con el dinero rara vez es gratis.',
    example:
      'Mantener 10.000€ en una cuenta al 0% durante 10 años, cuando una cartera indexada diversificada podría haber rentado de media en torno al 7% anual, tiene un coste de oportunidad de aproximadamente 9.700€ (lo que habrían crecido esos 10.000€ con interés compuesto). El dinero "seguro" parado no es gratis: renuncia a esa rentabilidad.',
    relatedArticles: [
      'dca-vs-lump-sum-aportar-mensual',
      'interes-compuesto-inversion',
      'como-empezar-a-invertir-poco-dinero',
    ],
    relatedLinks: [
      { label: 'Calculadora de interés compuesto', href: '/calculadora/interes-compuesto' },
      { label: 'Glosario: inflación', href: '/glosario/inflacion' },
    ],
    faq: [
      {
        q: '¿Tener el dinero en efectivo tiene coste de oportunidad?',
        a: 'Sí. El dinero parado en una cuenta sin remunerar (o por debajo de la inflación) tiene un doble coste: el coste de oportunidad de la rentabilidad que habría dado invertido, y la pérdida de poder adquisitivo por la inflación. Esto no significa invertirlo todo: el fondo de emergencia debe estar líquido y estable. Pero el dinero que no vas a necesitar a corto plazo tiene un coste real por estar parado.',
      },
      {
        q: '¿Cómo uso el coste de oportunidad para decidir entre amortizar hipoteca o invertir?',
        a: 'Compara las dos alternativas: amortizar te "ahorra" el tipo de interés de tu hipoteca; invertir te puede dar la rentabilidad esperada de tu cartera. Si tu hipoteca está a un tipo bajo y esperas que tu cartera rente más a largo plazo, invertir tiene menor coste de oportunidad. Si tu hipoteca tiene un tipo alto, amortizar puede ganar. Influyen también el plazo, tu tolerancia al riesgo y la tranquilidad psicológica de deber menos.',
      },
    ],
  },
  {
    slug: 'horizonte-temporal',
    term: 'Horizonte temporal',
    category: 'estrategias',
    shortDefinition:
      'El horizonte temporal es el tiempo que prevés mantener una inversión antes de necesitar el dinero. Es el factor que más debe condicionar cuánto riesgo (renta variable) puedes asumir.',
    longDefinition:
      'El horizonte temporal de una inversión es el plazo que va desde hoy hasta el momento en que necesitarás disponer del dinero. Es, junto con la tolerancia psicológica al riesgo, el factor que más debe determinar la composición de tu cartera, porque cambia por completo cuánto riesgo es razonable asumir.\n\nLa lógica: la renta variable es volátil a corto plazo pero, históricamente, sus probabilidades de dar rentabilidad positiva aumentan cuanto mayor es el periodo. En horizontes de 1-3 años, una cartera de acciones puede estar en pérdidas; en horizontes de 15-20 años o más, la probabilidad histórica de pérdida real se reduce drásticamente. Por eso:\n- **Horizonte corto (0-3 años)**: dinero que vas a necesitar pronto no debería estar en bolsa. Cuenta remunerada, fondo monetario o renta fija a corto plazo.\n- **Horizonte medio (3-10 años)**: mezcla de renta variable y renta fija según tu tolerancia.\n- **Horizonte largo (10+ años)**: la renta variable global tiene todo el sentido; el tiempo es tu mayor aliado para capturar la prima de riesgo y el interés compuesto.\n\nUn error común es invertir en bolsa dinero con horizonte corto (la entrada de un piso el año que viene) y verse forzado a vender en pérdidas si el mercado cae. El horizonte manda sobre el riesgo, no al revés.',
    example:
      'Si ahorras para la jubilación a 30 años, tu horizonte es largo y una cartera mayoritariamente de renta variable global es razonable. Si ahorras para la entrada de una casa a 2 años, ese dinero no debería estar en bolsa: una caída del 30% justo antes de comprar arruinaría el plan.',
    relatedArticles: [
      'fire-espana-cuanto-necesitas',
      'bogleheads-espana-guia-completa',
      'que-hacer-cuando-el-mercado-cae',
    ],
    relatedLinks: [
      { label: 'Glosario: asset allocation', href: '/glosario/asset-allocation' },
      { label: 'Glosario: perfil de riesgo', href: '/glosario/perfil-riesgo' },
    ],
    faq: [
      {
        q: '¿Cuánto tiempo necesito para invertir en bolsa con seguridad?',
        a: 'No hay un número mágico, pero históricamente los horizontes de 15-20 años o más reducen mucho la probabilidad de pérdida real en una cartera de renta variable global diversificada. Cuanto más corto es el horizonte, más conservadora debería ser la cartera. Para dinero que vas a necesitar en menos de 3 años, la bolsa no es el lugar adecuado.',
      },
      {
        q: '¿El horizonte temporal cambia con la edad?',
        a: 'Sí. A medida que te acercas al objetivo (jubilación, compra), tu horizonte se acorta y suele convenir reducir gradualmente el peso de la renta variable para proteger lo acumulado. Esta transición planificada se llama glide path. Pero ojo: si tu jubilación dura décadas, parte de tu dinero sigue teniendo horizonte largo incluso ya jubilado.',
      },
    ],
  },
  {
    slug: 'perfil-riesgo',
    term: 'Perfil de riesgo',
    category: 'estrategias',
    shortDefinition:
      'El perfil de riesgo es la combinación de tu capacidad y tu tolerancia para asumir pérdidas. Determina qué proporción de renta variable y renta fija encaja contigo.',
    longDefinition:
      'El perfil de riesgo de un inversor resume cuánto riesgo es adecuado para él, y se compone de dos cosas distintas que conviene no confundir:\n\n1. **Capacidad de asumir riesgo** (objetiva): depende de tu horizonte temporal, tu estabilidad de ingresos, tu fondo de emergencia y tu patrimonio. Alguien joven con ingresos estables y horizonte de 30 años tiene alta capacidad de riesgo, le guste o no.\n2. **Tolerancia al riesgo** (psicológica): cuánta volatilidad puedes soportar sin perder el sueño ni vender en pánico. Es subjetiva y solo la conoces de verdad cuando vives una caída fuerte.\n\nTu perfil real es el menor de los dos: de nada sirve tener capacidad para asumir riesgo si una caída del 30% te haría vender en el peor momento. El perfil de riesgo se traduce en la asignación de activos: un perfil agresivo puede ir 90-100% en renta variable; uno conservador, 30-40%; uno moderado, en torno al 60/40.\n\nLos roboadvisors te asignan un perfil mediante un cuestionario y construyen la cartera en consecuencia. Si inviertes por tu cuenta, definir tu perfil con honestidad —especialmente la parte psicológica— es uno de los pasos más importantes, porque la mejor cartera es la que eres capaz de mantener en una crisis.',
    example:
      'Dos personas de 35 años pueden tener perfiles de riesgo distintos: una con ingresos estables y nervios de acero puede ir 90% renta variable; otra que entraría en pánico con una caída del 20% necesita una cartera más equilibrada (por ejemplo 60/40), aunque su capacidad objetiva sea alta. La cartera que puedes mantener gana a la "óptima" que abandonarías.',
    relatedArticles: [
      'bogleheads-espana-guia-completa',
      'cartera-boglehead-3-fondos-espana',
      'que-hacer-cuando-el-mercado-cae',
    ],
    relatedLinks: [
      { label: 'Perfiles de inversor', href: '/perfil' },
      { label: 'Glosario: asset allocation', href: '/glosario/asset-allocation' },
    ],
    faq: [
      {
        q: '¿Cómo sé cuál es mi perfil de riesgo?',
        a: 'Combina tu capacidad objetiva (horizonte, estabilidad de ingresos, fondo de emergencia) con tu tolerancia psicológica (cuánta caída soportas sin vender). Una buena prueba: imagina que tu cartera cae un 30% en unos meses. Si seguirías el plan tranquilo, tu tolerancia es alta; si venderías, necesitas una cartera más conservadora. Tu perfil real es el menor de los dos factores.',
      },
      {
        q: '¿Mi perfil de riesgo debe cambiar con el tiempo?',
        a: 'Suele hacerlo. A medida que se acorta tu horizonte (te acercas a la jubilación o a tu objetivo), conviene reducir gradualmente el riesgo para proteger lo acumulado. También puede cambiar tu tolerancia con la experiencia: muchos inversores descubren su verdadera tolerancia solo tras vivir su primer mercado bajista.',
      },
    ],
  },
  {
    slug: 'indice-bursatil',
    term: 'Índice bursátil',
    category: 'conceptos',
    shortDefinition:
      'Un índice bursátil mide la evolución de un conjunto de empresas cotizadas y sirve de referencia del mercado. El IBEX 35, el S&P 500 o el MSCI World son índices que los fondos indexados replican.',
    longDefinition:
      'Un índice bursátil es un indicador que agrupa un conjunto de valores cotizados (acciones, bonos) y mide su evolución conjunta a lo largo del tiempo. Funciona como el "termómetro" de un mercado: cuando se dice que "la bolsa subió un 1%", normalmente se refiere a que subió su índice de referencia.\n\nCada índice tiene una metodología que define qué incluye y con qué peso. Los más relevantes para el inversor indexado:\n- **IBEX 35**: las 35 mayores empresas españolas.\n- **S&P 500**: las 500 mayores de EE.UU.\n- **MSCI World**: ~1.400 empresas de 23 países desarrollados.\n- **FTSE All-World / MSCI ACWI**: desarrollados + emergentes, el mercado global.\n\nLa mayoría de índices ponderan a cada empresa según su capitalización bursátil: las más grandes pesan más. Esto hace que el índice se autoajuste al mercado sin intervención.\n\nLos índices no se pueden comprar directamente: son cálculos. Para "invertir en un índice" usas un fondo indexado o un ETF que lo replica comprando las mismas empresas en las mismas proporciones. Esa es la esencia de la inversión indexada: en vez de elegir acciones, replicas un índice entero al menor coste.',
    example:
      'No puedes "comprar el MSCI World" directamente, pero sí un ETF como IWDA o un fondo como el Amundi Prime Global que lo replican. Si el índice sube un 8% en el año, tu fondo subirá aproximadamente ese 8% menos un TER mínimo.',
    relatedArticles: [
      'que-es-el-msci-world',
      'bogleheads-espana-guia-completa',
      'como-elegir-tu-primer-etf-espana-2026',
    ],
    relatedLinks: [
      { label: 'Glosario: capitalización bursátil', href: '/glosario/capitalizacion-bursatil' },
      { label: 'Glosario: benchmark', href: '/glosario/benchmark' },
    ],
    faq: [
      {
        q: '¿Se puede comprar un índice directamente?',
        a: 'No. Un índice es un cálculo, no un producto. Para invertir en él compras un fondo indexado o un ETF que lo replica adquiriendo las mismas empresas en las mismas proporciones. Por eso a estos productos se les llama "indexados": siguen un índice.',
      },
      {
        q: '¿Qué índice debería replicar como inversor indexado?',
        a: 'Para la mayoría, un índice global como el MSCI World (desarrollados) o el FTSE All-World / MSCI ACWI (desarrollados + emergentes) es la base más diversificada. El S&P 500 concentra en EE.UU. y el IBEX 35 solo en España (poco diversificado). Cuanto más amplio el índice, más diversificada tu cartera.',
      },
    ],
  },
  {
    slug: 'valor-liquidativo',
    term: 'Valor liquidativo',
    fullForm: 'Valor liquidativo (NAV)',
    category: 'metricas',
    shortDefinition:
      'El valor liquidativo (NAV) es el precio de una participación de un fondo de inversión, calculado dividiendo el patrimonio total del fondo entre el número de participaciones. Se actualiza una vez al día.',
    longDefinition:
      'El valor liquidativo (en inglés NAV, Net Asset Value) es el precio de una participación de un fondo de inversión. Se calcula dividiendo el valor total de los activos del fondo (menos comisiones y gastos) entre el número de participaciones en circulación. Es el precio al que compras y vendes participaciones del fondo.\n\nA diferencia de un ETF —que cotiza en bolsa con precio en tiempo real durante toda la sesión—, el valor liquidativo de un fondo de inversión tradicional se calcula **una vez al día**, tras el cierre de los mercados. Por eso, cuando das una orden de compra o reembolso de un fondo, se ejecuta al valor liquidativo del cierre de ese día (o del siguiente, según la hora de corte de la gestora), no a un precio instantáneo.\n\nEsto tiene una ventaja para el inversor a largo plazo: no hay spread de mercado ni precio que vigilar, y no puedes hacer "trading" intradía (lo que es bueno, porque evita decisiones impulsivas). El valor liquidativo refleja simplemente cuánto valen los activos del fondo ese día.',
    example:
      'Si un fondo indexado tiene un patrimonio de 100 millones de euros y 1 millón de participaciones, su valor liquidativo es de 100€ por participación. Si aportas 1.000€, recibes 10 participaciones al valor liquidativo del cierre del día en que se procesa tu orden.',
    relatedArticles: [
      'fondos-indexados-vs-etfs-espana',
      'como-hacer-traspaso-fondos-espana',
    ],
    relatedLinks: [
      { label: 'Glosario: NAV', href: '/glosario/nav' },
      { label: 'Fondos indexados en España', href: '/fondo' },
    ],
    faq: [
      {
        q: '¿A qué precio compro un fondo de inversión?',
        a: 'Al valor liquidativo del día en que se procesa tu orden, que se calcula una vez tras el cierre de los mercados. No hay precio en tiempo real como en un ETF: si das la orden por la mañana, se ejecuta al valor liquidativo del cierre de ese día o del siguiente, según la hora de corte de la gestora.',
      },
      {
        q: '¿Es lo mismo el valor liquidativo que el precio de un ETF?',
        a: 'Conceptualmente miden lo mismo (el valor de los activos por participación), pero el ETF cotiza en bolsa con precio en tiempo real durante toda la sesión, mientras que el valor liquidativo de un fondo se fija una vez al día. El precio de mercado de un ETF puede desviarse ligeramente de su valor liquidativo real; en un fondo no hay esa diferencia.',
      },
    ],
  },
  {
    slug: 'apalancamiento',
    term: 'Apalancamiento',
    category: 'conceptos',
    shortDefinition:
      'El apalancamiento es invertir con dinero prestado o con productos que multiplican la exposición (ETFs apalancados x2, x3). Amplifica tanto las ganancias como las pérdidas y NO es adecuado para el inversor indexado a largo plazo.',
    longDefinition:
      'El apalancamiento consiste en aumentar la exposición al mercado por encima del capital que tienes, ya sea pidiendo dinero prestado para invertir o usando productos diseñados para multiplicar los movimientos del mercado (ETFs apalancados x2 o x3, CFDs, derivados).\n\nLa idea es tentadora: si el mercado sube un 10% y vas apalancado x2, ganas un 20%. El problema es que funciona igual a la baja: si cae un 10%, pierdes un 20%. Y aquí está la trampa que muchos no ven: los **ETFs apalancados se reajustan a diario**, lo que provoca el "decaimiento por volatilidad" (volatility decay). En mercados laterales o volátiles, un ETF x2 puede perder valor aunque el índice subyacente acabe plano. Por eso están pensados para operativa de muy corto plazo (días), no para mantener.\n\n**Para el inversor indexado a largo plazo, el apalancamiento es un error.** La filosofía Boglehead se basa en capturar la rentabilidad del mercado de forma diversificada y barata, manteniendo la inversión durante décadas. El apalancamiento añade un riesgo de ruina (puedes perder más de lo que esperabas, o todo) que no compensa. Si ves ETFs con "2x", "3x", "Leveraged", "Daily" o "Short" en el nombre, no son para una cartera de largo plazo.',
    example:
      'Un ETF apalancado x3 sobre el Nasdaq parece atractivo en un año alcista, pero en 2022 muchos de estos productos perdieron más del 70% por la combinación de caída + decaimiento por volatilidad, mientras el índice subyacente cayó mucho menos. La asimetría juega en tu contra a largo plazo.',
    relatedArticles: [
      'que-hacer-cuando-el-mercado-cae',
      'bogleheads-espana-guia-completa',
      'mejores-etfs-espana-2026',
    ],
    relatedLinks: [
      { label: 'Glosario: volatilidad', href: '/glosario/volatilidad' },
      { label: 'Glosario: gestión pasiva', href: '/glosario/gestion-pasiva' },
    ],
    faq: [
      {
        q: '¿Son buena idea los ETFs apalancados para el largo plazo?',
        a: 'No. Los ETFs apalancados (x2, x3) se reajustan a diario y sufren decaimiento por volatilidad: en mercados laterales o volátiles pueden perder valor aunque el índice acabe plano. Están diseñados para operativa de días, no para mantener. Para una cartera indexada a largo plazo son un error que añade riesgo de ruina.',
      },
      {
        q: '¿Cómo reconozco un producto apalancado?',
        a: 'Busca en el nombre del ETF palabras como "2x", "3x", "Leveraged", "Daily", "Ultra" o "Short". También lo son los CFDs y muchos derivados. Si un producto promete multiplicar los movimientos del mercado, está apalancado y no es adecuado para una cartera Boglehead de largo plazo.',
      },
    ],
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
