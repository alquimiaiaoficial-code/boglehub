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
      'Los mejores ETFs MSCI World UCITS para España: IWDA, SWRD, MWRD y más, con TER desde 0,12%. Acumulación, domicilio fiscal y cuál elegir para tu cartera.',
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
      'Los mejores ETFs S&P 500 UCITS para España: CSPX, VUAA, SPXS y más, con TER desde 0,03%. Acumulación vs distribución y cuál elegir según tu broker.',
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
    metaTitle: 'ETFs All-World UCITS para España 2026 | BogleHub',
    metaDescription:
      'Los mejores ETFs All-World (globales) para España: VWCE, VWRP, ISAC y más. Diversificación mundial en un solo fondo, acumulación y cuál elegir.',
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
        a: 'VWCE sigue el índice FTSE All-World (más de 4.000 posiciones) e ISAC sigue el MSCI ACWI IMI (aproximadamente 9.000 posiciones). En la práctica ambos ofrecen diversificación global muy similar y los resultados históricos son prácticamente idénticos. ISAC de iShares tiene un TER ligeramente superior (0,20% vs 0,19% de VWCE).',
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
      'Los mejores ETFs de acumulación UCITS para España: reinvierten los dividendos sin tributar hasta que vendes. Por qué ganan en la fase de ahorro.',
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
    metaTitle: 'ETFs de distribución UCITS en España 2026 | BogleHub',
    metaDescription:
      'Los mejores ETFs de distribución UCITS para España: reparten dividendos periódicos. Cuándo elegirlos, cómo tributan y cuáles convienen en la fase de retiro.',
    intro:
      'Un ETF de distribución paga periódicamente los dividendos generados por las empresas de la cartera. Mientras que para inversores en fase de acumulación esto supone una menor eficiencia fiscal (se tributa por los dividendos recibidos al 19%-28%), para quienes ya están retirados o en fase FIRE pueden ser una fuente de ingresos pasivos sin necesidad de vender participaciones. En España, los dividendos de ETFs tributan como rendimientos del capital mobiliario.',
    listH2: 'ETFs de distribución disponibles en España (todas las clases de activo)',
    faq: [
      {
        q: '¿Cómo tributan los dividendos de ETFs en España?',
        a: 'Los dividendos tributan como rendimientos del capital mobiliario en la base del ahorro: 19% hasta 6.000€, 21% entre 6.000€ y 50.000€, 23% entre 50.000€ y 200.000€, 27% entre 200.000€ y 300.000€ y 28% por encima de 300.000€. Además, si el ETF aplica retención en origen (por ejemplo, ETFs domiciliados en Luxemburgo), puedes recuperarla mediante la deducción por doble imposición internacional en la declaración de la renta.',
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
      'Los mejores ETFs de mercados emergentes para España: EIMI, VFEM, EMIM y más. TER, qué cubren y cuánto peso darles en tu cartera indexada.',
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
      'Los mejores ETFs de bolsa europea para España: VEUR, IMEU, SMEA y más. TER, qué incluyen y cuándo tiene sentido sobreponderar Europa en tu cartera.',
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
      'Los mejores ETFs de renta fija UCITS para España: AGGH, VGEA, EUNA y más. Duración, cobertura de divisa y cómo elegir la parte conservadora de tu cartera.',
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
    metaTitle: 'ETFs de materias primas y oro para España 2026 | BogleHub',
    metaDescription:
      'Los mejores ETFs y ETC de materias primas y oro para España: SGLN, IGLN y más. Qué papel juegan como diversificador y cómo tributan en España.',
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
  {
    slug: 'nasdaq-100',
    h1: 'Los mejores ETFs Nasdaq 100 UCITS disponibles en España (2026)',
    metaTitle: 'Mejores ETFs Nasdaq 100 para España 2026 | BogleHub',
    metaDescription:
      'Los mejores ETFs Nasdaq 100 UCITS para España: EQQQ, SXRV, CNDX. TER, concentración tecnológica y cuándo tiene sentido frente al S&P 500.',
    intro:
      'El Nasdaq 100 agrupa las 100 mayores empresas no financieras cotizadas en el Nasdaq estadounidense, con un peso muy elevado del sector tecnológico (~50%). Es el índice más popular entre inversores particulares que quieren concentrar exposición en gigantes como Apple, Microsoft, Nvidia, Google, Meta o Amazon. Los ETFs UCITS Nasdaq 100 disponibles en España son una alternativa al S&P 500 con mayor concentración tecnológica, mayor volatilidad histórica y mayor rentabilidad esperada — y también mayor riesgo de concentración sectorial.',
    listH2: 'ETFs Nasdaq 100 disponibles en España',
    faq: [
      {
        q: '¿Es buena idea invertir en un ETF Nasdaq 100 en lugar del S&P 500?',
        a: 'Depende de tu apetito por concentración sectorial. El Nasdaq 100 tiene ~50% en tecnología frente al ~30% del S&P 500. Esto ha dado mejores rentabilidades en la última década, pero con mayor volatilidad y caídas más profundas en correcciones tecnológicas (caída del 35% en 2022). Para una cartera Boglehead diversificada, el Nasdaq 100 puede ser un complemento (10-20% del total) pero raramente debería ser el núcleo.',
      },
      {
        q: '¿Cuál es la diferencia entre EQQQ, SXRV y CNDX?',
        a: 'Los tres son ETFs Nasdaq 100 UCITS, todos domiciliados en Irlanda. EQQQ (Invesco, TER 0,30%) es el más popular y cotiza en múltiples bolsas europeas. SXRV (iShares NASDAQ 100, TER 0,33%) es la versión de BlackRock. CNDX (iShares, TER 0,33%) es funcionalmente equivalente a SXRV pero cotiza en LSE. Para el inversor español, EQQQ suele ser la opción más eficiente por su menor TER y mayor liquidez en bolsas europeas.',
      },
      {
        q: '¿Qué riesgos tiene concentrar la cartera en Nasdaq 100?',
        a: 'Tres riesgos principales: (1) concentración sectorial — si la tecnología sufre una corrección importante, el Nasdaq cae más que un índice diversificado; (2) concentración geográfica — 100% en EE.UU., sin exposición a Europa o emergentes; (3) concentración en pocas empresas — las 10 mayores empresas suelen pesar más del 50% del índice. Para un inversor de largo plazo, estos riesgos son tolerables si forman parte de una cartera más amplia.',
      },
      {
        q: '¿El Nasdaq 100 es lo mismo que el Nasdaq Composite?',
        a: 'No. El Nasdaq Composite incluye más de 3.000 empresas cotizadas en el Nasdaq (también pequeñas). El Nasdaq 100 selecciona las 100 mayores no financieras. La mayoría de ETFs UCITS replican el Nasdaq 100, que es el índice más usado como referencia. Los ETFs del Nasdaq Composite son poco comunes en formato UCITS para inversores europeos.',
      },
    ],
    note:
      'El Nasdaq 100 excluye empresas del sector financiero. Para exposición diversificada al mercado americano completo, considera ETFs S&P 500 (que sí incluyen bancos y financieras).',
  },
  {
    slug: 'small-caps',
    h1: 'ETFs de pequeñas empresas (small caps) UCITS para España (2026)',
    metaTitle: 'Mejores ETFs small caps UCITS para España 2026 | BogleHub',
    metaDescription:
      'Los mejores ETFs de small caps (pequeñas empresas) para España: WSML, IUSN, ZPRV y más. La prima de tamaño, TER y cuánto peso darles en tu cartera.',
    intro:
      'Los ETFs de pequeñas empresas (small caps) replican índices de compañías de menor capitalización bursátil, históricamente asociados a una prima de rentabilidad sobre las grandes empresas (el llamado size factor). En una cartera Boglehead, un peso del 5-15% en small caps puede aportar diversificación y rentabilidad esperada algo superior, con mayor volatilidad. Los ETFs UCITS disponibles en España cubren small caps globales (WSML, IUSN) y específicas de EE.UU. (ZPRV).',
    listH2: 'ETFs small caps disponibles en España',
    faq: [
      {
        q: '¿Las pequeñas empresas dan más rentabilidad que las grandes?',
        a: 'Históricamente sí, según los estudios de Fama y French (1992): las small caps han ofrecido una prima de aproximadamente 2-3% anual sobre las grandes empresas en periodos largos. Sin embargo, esta prima no es constante: hay décadas enteras donde las grandes empresas superan a las pequeñas (como 2010-2020). La prima es estadísticamente significativa a muy largo plazo (30+ años) pero puede no aparecer en horizontes más cortos.',
      },
      {
        q: '¿Cuánto peso debo dar a small caps en mi cartera?',
        a: 'En carteras Boglehead que incluyen factor size, lo habitual es entre el 5% y el 15% del total de renta variable. Más allá del 15% se considera una apuesta activa significativa. Si usas un ETF MSCI World (que solo incluye grandes y medianas), añadir un 10% en small caps globales (WSML) completa la exposición a todas las capitalizaciones. ETFs como MSCI ACWI IMI ya incluyen small caps en su proporción natural.',
      },
      {
        q: '¿Qué diferencia hay entre WSML e IUSN?',
        a: 'WSML (SPDR MSCI World Small Cap UCITS ETF) y IUSN (iShares MSCI World Small Cap UCITS ETF) replican ambos el índice MSCI World Small Cap. WSML tiene TER de 0,45% y IUSN de 0,35%. Ambos son de acumulación, domiciliados en Irlanda y cotizan en bolsas europeas. IUSN es ligeramente más barato; ambos cumplen la misma función en la cartera.',
      },
      {
        q: '¿ZPRV es lo mismo que las small caps globales?',
        a: 'No. ZPRV (SPDR S&P 600 US Small Cap Value UCITS ETF) se centra exclusivamente en small caps americanas con sesgo "value" (empresas baratas según métricas fundamentales). Es una apuesta más concentrada y específica: doble factor (size + value) en un solo mercado. Para diversificación global de small caps, WSML o IUSN son más adecuados. ZPRV tiene sentido como complemento factorial para inversores más sofisticados.',
      },
    ],
  },
  {
    slug: 'oro',
    h1: 'Los mejores ETC de oro físico UCITS para inversores en España (2026)',
    metaTitle: 'Mejores ETC de oro físico para España 2026 | BogleHub',
    metaDescription:
      'Los mejores ETC de oro físico para España: SGLN, IGLN, 4GLD, con TER desde 0,12%. Custodia, fiscalidad y cuándo añadir oro como cobertura a tu cartera.',
    intro:
      'Los ETC (Exchange Traded Commodities) de oro físico están respaldados por lingotes de oro custodiados en bóvedas seguras (principalmente Londres y Zúrich). Replican el precio del oro spot con baja fricción y son la forma más eficiente de tener exposición al oro sin comprar lingotes físicos. Para un inversor en España, el oro puede actuar como cobertura frente a la inflación, diversificador descorrelacionado de acciones y bonos, y componente clave de carteras como la cartera permanente de Harry Browne. Su rentabilidad histórica a largo plazo ha sido inferior a la renta variable pero con comportamiento diferenciador en crisis.',
    listH2: 'ETC de oro físico disponibles en España',
    faq: [
      {
        q: '¿Es seguro un ETC de oro físico?',
        a: 'Sí, en términos operativos. Los principales ETC (SGLN de iShares, IGLN de iShares, 4GLD de Xtrackers) están respaldados por oro físico custodiado en bóvedas auditadas regularmente. El oro está segregado del emisor y permanece como propiedad del fondo. El riesgo principal no es operativo sino de mercado: el precio del oro es volátil (puede caer 20-30% en un año) y no genera ingresos como acciones o bonos.',
      },
      {
        q: '¿Cómo tributa la venta de un ETC de oro en España?',
        a: 'Igual que cualquier ETF: la ganancia o pérdida al vender se declara como ganancia o pérdida patrimonial en el IRPF, en la base del ahorro con tipos del 19% al 28% según el importe. No hay tratamiento fiscal especial por ser materias primas. Las plusvalías pueden compensarse con minusvalías de otros activos del mismo año.',
      },
      {
        q: '¿Cuánto oro debería tener en mi cartera?',
        a: 'No hay una respuesta única. La filosofía Boglehead pura no incluye oro. La cartera permanente de Harry Browne sugiere 25%. Para una cartera indexada estándar, los inversores que añaden oro suelen ubicarlo en el 5-10% del total. Más del 15% supone una apuesta concentrada en un activo que no genera rendimientos internos.',
      },
      {
        q: '¿Cuál es la diferencia entre SGLN, IGLN y 4GLD?',
        a: 'SGLN (iShares Physical Gold ETC, TER 0,12%) e IGLN (iShares Physical Gold ETC, TER 0,12%) son productos muy similares de iShares, con respaldo físico en JP Morgan London. 4GLD (Xtrackers Physical Gold ETC EUR, TER 0,15%) tiene la particularidad de cotizar en euros y estar pensado específicamente para inversores europeos. La elección entre ellos depende más de la disponibilidad y comisión en tu broker que de diferencias estructurales relevantes.',
      },
    ],
    note:
      'Los ETC de oro están respaldados al 100% por oro físico custodiado en bóvedas (no son derivados ni futuros). La rentabilidad replica el precio spot del oro menos el TER anual.',
  },
  {
    slug: 'factor-calidad-momentum',
    h1: 'ETFs factor calidad y momentum UCITS para España (2026)',
    metaTitle: 'Mejores ETFs factor calidad y momentum 2026 | BogleHub',
    metaDescription:
      'Los mejores ETFs de factor calidad y momentum para España: IWQU, IWMO, XDEQ y más. Cómo funcionan los factor ETFs y cuándo añadirlos a tu cartera.',
    intro:
      'Los ETFs de factor (smart beta) seleccionan empresas según métricas específicas en lugar de capitalización bursátil. Los factores más estudiados académicamente son: calidad (empresas con balance sólido), momentum (empresas en tendencia alcista), valor (empresas baratas según ratios) y baja volatilidad. Para inversores Boglehead más sofisticados, una pequeña asignación (5-15%) a factor ETFs puede añadir diversificación de fuentes de rentabilidad sin abandonar la filosofía indexada. Esta sección cubre ETFs de calidad y momentum disponibles en España.',
    listH2: 'ETFs factor calidad y momentum disponibles en España',
    faq: [
      {
        q: '¿Qué es exactamente el factor calidad?',
        a: 'El factor calidad selecciona empresas con balance financiero sólido: alta rentabilidad sobre fondos propios (ROE), bajo nivel de deuda, crecimiento estable de beneficios. Empresas como Microsoft, Apple, Visa o Mastercard suelen aparecer en índices de calidad. La premisa: empresas de calidad son más resilientes en recesiones y han ofrecido rentabilidad ajustada al riesgo superior al mercado en periodos largos. IWQU (iShares Edge MSCI World Quality Factor UCITS ETF, TER 0,30%) es el más popular en formato UCITS.',
      },
      {
        q: '¿Qué es el factor momentum y cómo funciona?',
        a: 'El factor momentum selecciona empresas que han subido más en los últimos 6-12 meses, bajo la premisa de que las tendencias del mercado tienden a continuar a corto plazo. Es un factor con base académica sólida (Jegadeesh y Titman, 1993) pero con alta rotación interna del índice (las empresas entran y salen frecuentemente). IWMO (iShares Edge MSCI World Momentum Factor, TER 0,30%) y XDEQ son las opciones principales en España.',
      },
      {
        q: '¿Merece la pena invertir en factor ETFs frente a un MSCI World normal?',
        a: 'Es un debate abierto. Los factores han ofrecido prima histórica a largo plazo, pero pueden tener periodos largos (5-10 años) de bajo rendimiento frente al mercado. Para un inversor disciplinado que va a mantener la apuesta factorial durante décadas sin desviarse, pueden aportar valor. Para quien va a abandonar el ETF cuando no rinda, es mejor un ETF de capitalización tradicional (MSCI World). El sesgo de comportamiento es el mayor riesgo del factor investing.',
      },
      {
        q: '¿Puedo combinar varios factor ETFs en mi cartera?',
        a: 'Sí, y muchas estrategias avanzadas combinan calidad + momentum + valor + baja volatilidad en proporciones iguales. La idea: cada factor tiene periodos buenos y malos, pero su combinación tiene rentabilidad ajustada al riesgo superior. Sin embargo, el TER ponderado aumenta y la complejidad de gestión también. Para la mayoría de inversores, un único ETF MSCI World es más sencillo y suficiente.',
      },
    ],
    note:
      'Los factor ETFs requieren disciplina psicológica: pueden tener periodos largos de bajo rendimiento frente a ETFs de capitalización clásica. No abandones la estrategia en mitad del ciclo si has elegido factor investing.',
  },
]

/** Devuelve un tema por su slug, o undefined si no existe */
export function getThemeBySlug(slug: string): EtfTheme | undefined {
  return ETF_THEMES.find((t) => t.slug === slug)
}
