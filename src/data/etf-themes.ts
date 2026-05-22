/**
 * Definiciones de las páginas de categoría de ETFs (/etfs/[tema]).
 *
 * Cada entrada contiene el copy SEO (H1, meta, intro, FAQ) para una
 * familia de ETFs. Los filtros reales están en el page.tsx para poder
 * trabajar con el tipo EtfMetadata sin complicar este módulo.
 */

export interface EtfThemeFaq {
  q: string
  a: string
}

export interface EtfTheme {
  slug: string
  h1: string
  metaTitle: string
  metaDescription: string
  intro: string
  listH2: string
  faq: EtfThemeFaq[]
  note?: string
}

export const ETF_THEMES: EtfTheme[] = [
  {
    slug: 'msci-world',
    h1: 'Los mejores ETFs MSCI World UCITS para inversores españoles (2026)',
    metaTitle: 'Mejores ETFs MSCI World para España 2026 | BogleHub',
    metaDescription:
      'Comparativa de ETFs MSCI World disponibles en España: IWDA, SWRD, XDWD, MWRD y más. TER, domicilio fiscal, acumulación y eficiencia para residentes españoles.',
    intro:
      'El índice MSCI World engloba más de 1.400 empresas de 23 países desarrollados, cubriendo el 85% de la capitalización bursátil entre economías avanzadas. Para un inversor residente en España, un ETF MSCI World domiciliado en Irlanda y de clase acumulación es habitualmente el punto de partida de la cartera indexada: evita retenciones en origen innecesarias y difiere la tributación hasta la venta. Los ETFs de esta lista replican el mismo índice o uno equivalente (FTSE Developed World), con diferencias mínimas de TER y variantes de factor (calidad, momento, valor mínima volatilidad).',
    listH2: 'ETFs MSCI World y mercados desarrollados disponibles en España',
    faq: [
      {
        q: '¿Qué diferencia hay entre MSCI World y MSCI All Country World (ACWI)?',
        a: 'MSCI World cubre solo países desarrollados (sin emergentes), mientras que ACWI incluye además 24 mercados emergentes como China, India o Brasil. ETFs como VWCE replican el índice ACWI, añadiendo diversificación a costa de algo más de TER. Si ya tienes un ETF MSCI World y quieres exposición a emergentes, puedes complementarlo con un ETF como EIMI o VFEM.',
      },
      {
        q: '¿Es mejor IWDA, SWRD o XDWD para un inversor español?',
        a: 'Los tres son ETFs MSCI World domiciliados en Irlanda y de acumulación, por lo que tienen la misma eficiencia fiscal (grado A). La diferencia clave es el TER: SWRD y MWRD cobran 0,12%, XDWD 0,19% e IWDA 0,20%. SWRD y MWRD suelen ser las opciones más económicas. La elección final depende de qué tickers admite tu broker con menores comisiones de compra.',
      },
      {
        q: '¿El MSCI World incluye mercados emergentes?',
        a: 'No. El índice MSCI World cubre exclusivamente países desarrollados. Para incluir emergentes necesitas un ETF separado (como EIMI o VFEM) o directamente un ETF All-World (como VWCE), que ya los incorpora en su proporción natural (~12%).',
      },
      {
        q: '¿Qué porcentaje de mi cartera debería destinarse a un ETF MSCI World?',
        a: 'En carteras Boglehead simplificadas de 2-3 fondos, el MSCI World suele ocupar entre el 70% y el 90% de la renta variable, completando con emergentes (10-30%). Si prefieres máxima simplicidad, un ETF All-World como VWCE cubre ambas exposiciones en un único fondo.',
      },
    ],
    note:
      'Se incluyen variantes de factor (calidad, momento, valor, mínima volatilidad) basadas en el universo MSCI World. ETFs ordenados por TER de menor a mayor.',
  },
  {
    slug: 'sp500',
    h1: 'Los mejores ETFs S&P 500 UCITS disponibles en España (2026)',
    metaTitle: 'Mejores ETFs S&P 500 para España 2026 | BogleHub',
    metaDescription:
      'Comparativa de ETFs S&P 500 UCITS para inversores españoles: CSPX, SXR8, VUAA, VUSA, SPXS... Cuál elegir según tu broker, TER y fiscalidad.',
    intro:
      'El S&P 500 agrupa las 500 mayores empresas cotizadas de Estados Unidos y es el índice bursátil más seguido del mundo. Invertir en él mediante un ETF UCITS ofrece acceso a gigantes como Apple, Microsoft o Nvidia junto con empresas de consumo, salud e industria. Para inversores españoles, la clave está en elegir un ETF domiciliado en Irlanda (grado fiscal A) y de clase acumulación para maximizar el efecto del interés compuesto. La diferencia entre tickers como CSPX y SXR8 es mínima: replican el mismo fondo, simplemente cotizan en bolsas distintas.',
    listH2: 'ETFs S&P 500 disponibles en España',
    faq: [
      {
        q: '¿Cuál es la diferencia entre CSPX y SXR8?',
        a: 'Ambos son exactamente el mismo fondo iShares Core S&P 500 (ISIN IE00B5BMR087), gestionado por BlackRock. La diferencia es la bolsa de cotización: CSPX cotiza en la Bolsa de Londres (LSE) en dólares, mientras que SXR8 cotiza en Xetra (Frankfurt) en euros. Para un inversor español el resultado final es idéntico; elige el ticker que tenga menor comisión de compra en tu broker.',
      },
      {
        q: '¿Es mejor un ETF S&P 500 o un ETF MSCI World?',
        a: 'Un ETF S&P 500 concentra el 100% en EE.UU., mientras que MSCI World diversifica entre 23 países desarrollados (aunque EE.UU. supone ~71%). A largo plazo el S&P 500 ha superado al MSCI World en muchos periodos, pero con mayor concentración geográfica. Si quieres simplicidad y convicción en el mercado americano, el S&P 500 es sólido. Si prefieres diversificación global, el MSCI World o un All-World es preferible.',
      },
      {
        q: '¿Por qué hay ETFs S&P 500 con TER diferente que tienen el mismo rendimiento?',
        a: 'El TER publicado es el coste nominal, pero el coste neto real (tracking difference) puede ser incluso mejor en algunos fondos que prestan acciones a terceros y recuperan una renta. SPXS de SPDR tiene el TER más bajo (0,03%), aunque CSPX y VUAA (0,07%) tienen históricos de tracking difference igualmente excelentes. En la práctica, las diferencias son mínimas para el inversor a largo plazo.',
      },
      {
        q: '¿Un ETF S&P 500 es compatible con la cartera Boglehead?',
        a: 'Sí, aunque la cartera Boglehead clásica incluye también mercados internacionales y bonos. Muchos inversores españoles usan un ETF S&P 500 como núcleo de la renta variable y lo complementan con un ETF de mercados desarrollados ex-EE.UU. o con emergentes para mayor diversificación global.',
      },
    ],
  },
  {
    slug: 'todo-mundo',
    h1: 'ETFs All-World UCITS: diversificación global en un solo fondo (2026)',
    metaTitle: 'ETFs All-World UCITS para España 2026: VWCE, ISAC y alternativas | BogleHub',
    metaDescription:
      'Comparativa de ETFs globales (All-World) disponibles en España: VWCE, VWRP, ISAC, WEBN. Acumulación, TER y fiscalidad para inversores españoles.',
    intro:
      'Los ETFs "All-World" o "total world" replican índices que cubren tanto mercados desarrollados como emergentes en un único fondo. Siguen índices como el FTSE All-World o el MSCI ACWI IMI, que juntan más de 3.000 empresas de 50 países. Para un inversor español que quiere la cartera más sencilla posible, un único ETF All-World de acumulación domiciliado en Irlanda como VWCE ofrece diversificación global total con un solo producto.',
    listH2: 'ETFs All-World y globales disponibles en España',
    faq: [
      {
        q: '¿Qué diferencia hay entre VWCE y VWRL?',
        a: 'VWCE (Vanguard FTSE All-World Accumulating) y VWRL (Vanguard FTSE All-World Distributing) replican exactamente el mismo índice FTSE All-World. La diferencia es la política de dividendos: VWCE los reinvierte automáticamente (acumulación), mientras que VWRL los distribuye trimestralmente. Para inversores en fase de acumulación que no necesitan las rentas, VWCE es generalmente más eficiente fiscalmente.',
      },
      {
        q: '¿Cuál es la diferencia entre VWCE e ISAC?',
        a: 'VWCE sigue el índice FTSE All-World (más de 4.000 posiciones) e ISAC sigue el MSCI ACWI IMI (aproximadamente 9.000 posiciones). En la práctica ambos ofrecen diversificación global muy similar y los resultados históricos son prácticamente idénticos. ISAC de iShares tiene un TER ligeramente superior (0,20% vs 0,22% de VWCE).',
      },
      {
        q: '¿Un ETF All-World es suficiente para toda la cartera de renta variable?',
        a: 'Sí, para la parte de renta variable. Un ETF All-World cubre desarrollados y emergentes en su proporción natural según capitalización bursátil, que es exactamente el enfoque de la filosofía Boglehead: no elegir, simplemente replicar el mercado global. Si además añades un ETF de renta fija, tendrás una cartera de 2 fondos completa.',
      },
    ],
  },
  {
    slug: 'acumulacion',
    h1: 'ETFs de acumulación UCITS: ventaja fiscal para inversores en España (2026)',
    metaTitle: 'ETFs de acumulación UCITS en España 2026 | BogleHub',
    metaDescription:
      'Guía completa de ETFs de acumulación disponibles en España. Qué son, cómo tributan y por qué son más eficientes que los de distribución para inversores en fase de ahorro.',
    intro:
      'Un ETF de acumulación reinvierte automáticamente los dividendos generados por las empresas de la cartera dentro del propio fondo, sin distribuirlos al inversor. Para residentes en España en fase de construcción de patrimonio, esto supone una ventaja fiscal significativa: los dividendos no tributan al recibirlos (19%-28% en IRPF), por lo que el dinero sigue generando rendimiento gracias al interés compuesto. La tributación se difiere hasta el momento de la venta del ETF. Esta lista incluye ETFs de acumulación de todas las clases de activos disponibles para inversores españoles.',
    listH2: 'ETFs de acumulación disponibles en España (todas las clases de activo)',
    faq: [
      {
        q: '¿Cuándo conviene un ETF de acumulación frente a uno de distribución?',
        a: 'Si estás en fase de construcción de patrimonio y no necesitas las rentas para vivir, la acumulación es más eficiente: los dividendos se reinvierten sin pasar por Hacienda. Si ya estás en fase de retiro (FIRE, jubilación) y necesitas ingresos periódicos sin vender participaciones, un ETF de distribución puede simplificar la gestión, aunque fiscalmente el tratamiento es equivalente a una venta.',
      },
      {
        q: '¿Los ETFs de acumulación tributan en España aunque no vendas?',
        a: 'No. Mientras no vendas las participaciones, no tributas por IRPF. Solo al vender declaras la ganancia o pérdida patrimonial (precio de venta menos precio de compra). Esto es diferente a los fondos de inversión tradicionales, que también permiten traspasos sin tributar, algo que los ETFs no permiten.',
      },
      {
        q: '¿La acumulación mejora la eficiencia fiscal del domicilio del ETF?',
        a: 'La acumulación y el domicilio son dos factores independientes que se combinan. Un ETF de acumulación domiciliado en Irlanda aprovecha el convenio de doble imposición con EE.UU. (retención de dividendos al 15% en lugar del 30%), lo que mejora la rentabilidad neta interna del fondo sin que el inversor tenga que hacer ningún trámite adicional.',
      },
    ],
  },
  {
    slug: 'distribucion',
    h1: 'ETFs de distribución UCITS en España: cuándo tienen sentido (2026)',
    metaTitle: 'ETFs de distribución (reparto) UCITS en España 2026 | BogleHub',
    metaDescription:
      'Comparativa de ETFs de distribución disponibles en España. Cuándo elegirlos, cómo tributan los dividendos y cuáles son los mejores para inversores en fase de retiro.',
    intro:
      'Un ETF de distribución paga periódicamente los dividendos generados por las empresas de la cartera. Mientras que para inversores en fase de acumulación esto supone una menor eficiencia fiscal (se tributa por los dividendos recibidos al 19%-28%), para quienes ya están retirados o en fase FIRE pueden ser una fuente de ingresos pasivos sin necesidad de vender participaciones. En España, los dividendos de ETFs tributan como rendimientos del capital mobiliario.',
    listH2: 'ETFs de distribución disponibles en España (todas las clases de activo)',
    faq: [
      {
        q: '¿Cómo tributan los dividendos de ETFs en España?',
        a: 'Los dividendos tributan como rendimientos del capital mobiliario: 19% hasta 6.000€, 21% entre 6.000€ y 50.000€, 23% entre 50.000€ y 200.000€ y 28% a partir de ahí. Además, si el ETF aplica retención en origen (por ejemplo, ETFs domiciliados en Luxemburgo), puedes recuperarla mediante la deducción por doble imposición internacional en la declaración de la renta.',
      },
      {
        q: '¿Es posible vivir de los dividendos de ETFs en España?',
        a: 'Sí, aunque requiere un patrimonio considerable. Por ejemplo, si tu cartera de ETFs de distribución renta un 2% anual en dividendos y tienes 600.000€ invertidos, recibirías 12.000€ brutos anuales. Muchos inversores FIRE combinan ETFs de distribución con ventas periódicas de ETFs de acumulación para optimizar la carga fiscal anual de sus retiradas.',
      },
      {
        q: '¿Los ETFs de distribución domiciliados en Irlanda tienen ventajas fiscales en España?',
        a: 'Sí. Irlanda tiene convenio de doble imposición con EE.UU. que reduce la retención de dividendos americanos al 15% (frente al 30% para ETFs domiciliados en otros países sin convenio). Esta ventaja aplica tanto a ETFs de acumulación como de distribución. El inversor español no tiene que gestionar esta retención; el fondo ya la aplica internamente.',
      },
    ],
  },
  {
    slug: 'emergentes',
    h1: 'ETFs de mercados emergentes UCITS para España (2026)',
    metaTitle: 'Mejores ETFs mercados emergentes para España 2026 | BogleHub',
    metaDescription:
      'Comparativa de ETFs de emergentes disponibles en España: EIMI, VFEM, EMIM, IS3N... TER, cobertura y cómo integrarlos en tu cartera indexada Boglehead.',
    intro:
      'Los mercados emergentes (China, India, Brasil, Taiwán, Corea del Sur y otros) representan cerca del 12% de la capitalización bursátil global según el índice FTSE All-World y ofrecen diversificación con respecto a los mercados desarrollados. En una cartera Boglehead de dos o tres fondos suelen ocupar entre el 10% y el 20% de la renta variable. Los ETFs de emergentes UCITS disponibles en España siguen mayoritariamente el índice MSCI Emerging Markets IMI o el FTSE Emerging Markets, con China como principal componente (25-30% del índice).',
    listH2: 'ETFs de mercados emergentes disponibles en España',
    faq: [
      {
        q: '¿Cuánto peso debo dar a los mercados emergentes en mi cartera?',
        a: 'El peso "neutral" según la capitalización global es de aproximadamente el 12-15%. En carteras Boglehead de 3 fondos, lo habitual es entre el 10% y el 20% de la renta variable. Más del 20% implica una apuesta activa. Si usas un ETF All-World como VWCE, los emergentes ya están incluidos en su proporción natural sin que tengas que gestionarlo.',
      },
      {
        q: '¿Cuál es la diferencia entre EIMI y EMIM?',
        a: 'Ambos son el mismo fondo iShares Core MSCI Emerging Markets IMI (IE00BKM4GZ66). EIMI cotiza en la Bolsa de Londres (USD) y es de acumulación; EMIM cotiza en Euronext Amsterdam (EUR) y es de distribución. Elige el ticker con menor comisión de compra en tu broker. Si quieres acumulación, EIMI o IS3N son las opciones.',
      },
      {
        q: '¿Los ETFs de emergentes tienen más riesgo que los de países desarrollados?',
        a: 'Sí. Presentan mayor volatilidad, riesgo político, menor liquidez y mayor concentración en China (25-30% del índice). Sin embargo, históricamente han ofrecido también periodos de fuerte rentabilidad. En carteras a muy largo plazo (>15 años), una exposición moderada a emergentes puede contribuir a la diversificación sin dominar el riesgo total.',
      },
      {
        q: '¿Por qué EIMI incluye China si se llama "Emerging Markets"?',
        a: 'China es el mayor mercado emergente y representa el mayor componente de los índices MSCI y FTSE de emergentes (en torno al 25-30% según la metodología). Algunos inversores optan por ETFs de emergentes "ex-China" si quieren reducir su exposición específica al país, aunque esos productos son menos comunes en bolsas europeas.',
      },
    ],
  },
  {
    slug: 'europa',
    h1: 'ETFs de bolsa europea UCITS para inversores españoles (2026)',
    metaTitle: 'Mejores ETFs bolsa europea para España 2026 | BogleHub',
    metaDescription:
      'Comparativa de ETFs europeos UCITS disponibles en España: VEUR, IMEU, SMEA, MEUD y más. TER, cobertura y cuándo sobreponderar Europa en tu cartera indexada.',
    intro:
      'Los ETFs de renta variable europea replican índices como el MSCI Europe o el FTSE Developed Europe, que incluyen desde las grandes empresas del IBEX 35 y el DAX hasta líderes farmacéuticos suizos e industriales franceses. Para un inversor español, estos ETFs añaden diversificación sectorial (mayor peso en industriales, materiales y consumo que en tecnología) y pueden cotizar en euros, reduciendo el riesgo de divisa frente a ETFs denominados en dólares. Normalmente se usan como complemento de una cartera global para sobreponderar Europa.',
    listH2: 'ETFs de bolsa europea disponibles en España',
    faq: [
      {
        q: '¿Tiene sentido sobreponderar Europa en mi cartera si vivo en España?',
        a: 'Hay un debate entre la "ponderación por capitalización" (Europa ya representa ~16% en el MSCI World) y el "home bias" (sobreponderación de la zona euro para reducir riesgo de divisa). Para carteras indexadas puras la filosofía Boglehead recomienda el market-cap weighting. Sin embargo, algunos inversores añaden un 10-15% extra de Europa, lo que implica una apuesta activa implícita frente al mercado global.',
      },
      {
        q: '¿El MSCI Europe incluye al Reino Unido?',
        a: 'Sí. El MSCI Europe y el FTSE Developed Europe incluyen a Reino Unido como uno de sus mayores componentes (en torno al 20-25% del índice). Si quieres exposición exclusivamente a la eurozona, busca ETFs con "Eurozone" o "EMU" en el nombre, aunque son menos comunes y suelen tener mayor TER.',
      },
      {
        q: '¿Qué diferencia hay entre VEUR e IMEU?',
        a: 'VEUR (Vanguard FTSE Developed Europe) e IMEU (iShares Core MSCI Europe) replican índices muy similares con cobertura equivalente. IMEU tiene un TER de 0,12% y VEUR de 0,10%. Ambos son de acumulación y domiciliados en Irlanda. La diferencia práctica es mínima; elige el que tenga mejor acceso y menor comisión en tu broker.',
      },
    ],
  },
  {
    slug: 'renta-fija',
    h1: 'ETFs de renta fija UCITS para carteras indexadas en España (2026)',
    metaTitle: 'Mejores ETFs de bonos UCITS para España 2026 | BogleHub',
    metaDescription:
      'Comparativa de ETFs de renta fija disponibles en España: AGGH, VGEA, VETY, EUNA y más. Para carteras conservadoras y Boglehead, con análisis de duración y riesgo.',
    intro:
      'La renta fija es el contrapeso a la renta variable en una cartera Boglehead: aporta estabilidad, reduce la volatilidad global y actúa como amortiguador en mercados bajistas. Los ETFs de bonos UCITS disponibles en España cubren desde bonos gubernamentales de la eurozona hasta deuda corporativa global con cobertura en euros. La proporción de bonos depende del perfil de riesgo: desde el 10-20% para inversores jóvenes hasta el 40-60% para quienes se aproximan a la jubilación.',
    listH2: 'ETFs de renta fija disponibles en España',
    faq: [
      {
        q: '¿Debo incluir bonos en mi cartera si soy joven con horizonte largo?',
        a: 'Depende de tu tolerancia al riesgo y capacidad de aguantar caídas sin vender en el peor momento. Muchos inversores jóvenes con horizonte >20 años optan por carteras 100% renta variable. Sin embargo, incluso un 10-20% de bonos puede reducir la volatilidad notablemente sin sacrificar demasiada rentabilidad a largo plazo, y facilita mantener el rumbo en mercados muy volátiles.',
      },
      {
        q: '¿Qué es un ETF de bonos con cobertura EUR (hedged)?',
        a: 'Es un ETF que invierte en bonos denominados en otras divisas (principalmente dólares) pero aplica una cobertura de tipo de cambio para eliminar el riesgo divisa. Esto hace que su rendimiento dependa solo de los tipos de interés de los bonos subyacentes, no de la evolución EUR/USD. La cobertura tiene un coste (suele ser 0,5-1% anual), pero para renta fija se considera generalmente recomendable.',
      },
      {
        q: '¿Los ETFs de bonos pueden perder dinero?',
        a: 'Sí. Los bonos bajan de precio cuando los tipos de interés suben. En 2022, muchos ETFs de bonos perdieron entre un 10% y un 20% de su valor. El riesgo es mayor cuanto mayor sea la duración media del ETF. Para minimizar este riesgo puedes optar por ETFs de bonos a corto plazo (duración 1-3 años) o fondos de mercado monetario, aunque su rentabilidad esperada también es menor.',
      },
      {
        q: '¿Cuál es la diferencia entre bonos gubernamentales y corporativos?',
        a: 'Los bonos gubernamentales son deuda emitida por estados (Alemania, EE.UU., etc.) y suelen considerarse el activo libre de riesgo de referencia. Los bonos corporativos son deuda de empresas y ofrecen un mayor rendimiento a cambio de mayor riesgo de crédito (posibilidad de impago). Para una cartera Boglehead conservadora, los bonos gubernamentales de calidad (investment grade) son el punto de partida.',
      },
    ],
  },
  {
    slug: 'materias-primas',
    h1: 'ETFs de materias primas y oro UCITS en España (2026)',
    metaTitle: 'ETFs materias primas y oro para España 2026: SGLN, IGLN, 4GLD | BogleHub',
    metaDescription:
      'Comparativa de ETFs y ETPs de materias primas y oro disponibles en España en 2026. Qué papel juegan en una cartera indexada y cómo tributan para residentes españoles.',
    intro:
      'Los ETFs y ETPs de materias primas son activos alternativos que algunos inversores añaden a sus carteras como cobertura frente a la inflación y como diversificador descorrelacionado de la renta variable y la renta fija. El oro es el más popular: con alta volatilidad pero correlación históricamente negativa con acciones en momentos de crisis. Los ETPs de oro respaldados físicamente (ETC) replican el precio del lingote de oro y están disponibles en las principales bolsas europeas.',
    listH2: 'ETPs de oro y materias primas disponibles en España',
    faq: [
      {
        q: '¿Debo incluir oro en mi cartera Boglehead?',
        a: 'La filosofía Boglehead pura no incluye materias primas; se centra en acciones y bonos diversificados. Sin embargo, algunos inversores añaden un 5-10% en oro como cobertura frente a escenarios extremos (inflación alta, crisis sistémica). No es necesario, pero tampoco irracional si se hace con perspectiva de largo plazo y sin especular. Muchos inversores indexados prescinden de él y mantienen carteras sencillas de 2-3 fondos.',
      },
      {
        q: '¿Cómo tributan los ETPs de oro en España?',
        a: 'Tributan igual que cualquier ETF: la ganancia o pérdida al vender se declara como ganancia o pérdida patrimonial en el IRPF (tipo entre 19% y 28%). No hay un tratamiento fiscal especial por ser materias primas. La base imponible es la diferencia entre el precio de venta y el precio de compra.',
      },
      {
        q: '¿Qué diferencia hay entre un ETC de oro y un ETF de mineras de oro?',
        a: 'Un ETC de oro (como SGLN o IGLN) replica directamente el precio del oro físico almacenado en bóvedas. Un ETF de mineras invierte en acciones de empresas extractoras de oro, cuyo precio depende no solo del metal sino también de los costes de producción, la gestión empresarial y el ciclo del sector. Para exposición directa al precio del oro, los ETCs son la opción más pura y directa.',
      },
    ],
    note:
      'Los productos listados son ETCs (Exchange Traded Commodities) respaldados físicamente, no ETFs tradicionales. Su tratamiento fiscal en España es equivalente al de un ETF.',
  },
]

/** Devuelve un tema por su slug, o undefined si no existe */
export function getThemeBySlug(slug: string): EtfTheme | undefined {
  return ETF_THEMES.find((t) => t.slug === slug)
}
