/**
 * Mercados hispanohablantes con normativa fiscal y broker locales.
 * Para páginas /mercado/[pais].
 */

export interface HispanoMarket {
  slug: string
  countryName: string
  flag: string
  /** Tagline */
  tagline: string
  /** Moneda */
  currency: string
  /** Capital gains tax rate */
  capitalGainsTax: string
  /** Dividend tax */
  dividendTax: string
  /** Broker locales populares */
  localBrokers: string[]
  /** Foreign brokers usados */
  foreignBrokers: string[]
  /** Recomendaciones ETF (UCITS o US) */
  etfRecommendation: string
  /** Consideraciones específicas */
  considerations: string[]
  /** Descripción larga */
  description: string
  faq: { q: string; a: string }[]
}

export const HISPANO_MARKETS: HispanoMarket[] = [
  {
    slug: 'mexico',
    countryName: 'México',
    flag: '🇲🇽',
    tagline: 'Inversión indexada para residentes en México',
    currency: 'MXN',
    capitalGainsTax: '10% sobre ganancia (bolsa mexicana) o 35% (extranjeros si no hay convenio)',
    dividendTax: '10% retención (general)',
    localBrokers: ['GBM+', 'Bursanet', 'Banorte Brokerage', 'Kuspit'],
    foreignBrokers: ['Interactive Brokers México', 'Charles Schwab International'],
    etfRecommendation: 'Para mexicanos: SPMX (S&P/BMV IPC ETF) o NAFTRAC para mercado nacional. Para exposición internacional vía SIC: VTI o SPY (US ETFs accesibles desde México vía SIC). Alternativa: cuenta en IBKR para acceder a UCITS irlandeses con mayor eficiencia fiscal.',
    considerations: [
      'México tiene Sistema Internacional de Cotización (SIC) que da acceso a ETFs americanos directamente',
      'Convenio de doble imposición México-EE.UU. reduce retención dividendos al 10-15%',
      'AFORE: sistema de pensiones obligatorio, pero también puedes complementar con inversión personal',
      'Si abres cuenta en broker extranjero, declarar en SAT según volumen',
    ],
    description: 'México ofrece ventajas únicas al inversor indexado vs otros mercados hispanohablantes: acceso directo a ETFs americanos vía SIC (Sistema Internacional de Cotización), convenio fiscal con EE.UU. y brokers locales con costes razonables. Para inversión patrimonial seria, muchos mexicanos combinan cuenta local (GBM, Bursanet) con cuenta en Interactive Brokers para acceso a UCITS irlandeses.',
    faq: [
      { q: '¿Puedo comprar ETFs americanos desde México?', a: 'Sí, directamente. México tiene el SIC (Sistema Internacional de Cotización) que permite a residentes mexicanos comprar ETFs americanos como VTI, SPY, VOO sin restricciones MiFID II (no aplica en México). Esto es una ventaja sobre Europa donde estos ETFs están bloqueados para retail.' },
      { q: '¿Cuál es la mejor cuenta para inversión indexada en México?', a: 'Para inversión local: GBM+ (sin comisiones), Bursanet, Kuspit. Para acceso internacional avanzado: Interactive Brokers México (acceso a +150 mercados, comisiones muy bajas). Combinación común: GBM para SIC + IBKR para UCITS irlandeses si tu patrimonio justifica diversificar.' },
      { q: '¿Cómo tributa la venta de ETFs en México?', a: 'Las ganancias por venta de ETFs en bolsa mexicana tributan al 10% (ISR sobre ganancia real). Las ganancias en ETFs extranjeros (vía broker no mexicano) se acumulan a tus ingresos personales y tributan al ISR personal (escala progresiva hasta 35%). Consulta con asesor fiscal mexicano para tu situación.' },
    ],
  },
  {
    slug: 'argentina',
    countryName: 'Argentina',
    flag: '🇦🇷',
    tagline: 'Inversión indexada en pesos argentinos y dólares',
    currency: 'ARS / USD',
    capitalGainsTax: '15% sobre ganancia en USD (con plazo mín. tenencia)',
    dividendTax: '7% retención (general)',
    localBrokers: ['IOL (InvertirOnline)', 'Balanz', 'Bull Market Brokers', 'Cocos Capital'],
    foreignBrokers: ['Interactive Brokers Argentina', 'eToro'],
    etfRecommendation: 'Para argentinos: CEDEARs son la opción más popular — son representaciones locales de acciones y ETFs internacionales (incluyendo SPY, QQQ, IWDA) cotizando en BYMA en pesos. Permiten exposición a mercado internacional sin sacar dinero del país. Para inversores con cuenta en USD afuera, Interactive Brokers da acceso a ETFs UCITS o US directamente.',
    considerations: [
      'CEDEARs son la mejor opción para argentinos que no pueden o no quieren sacar dinero del país',
      'Restricciones cambiarias (cepo) limitan acceso a USD oficial y a brokers extranjeros',
      'Alta inflación: invertir en activos en USD es prácticamente obligatorio para preservar valor',
      'Impuesto a las ganancias sobre venta de acciones extranjeras: 15%',
      'Bienes Personales: si tu patrimonio supera el mínimo, declararlo',
    ],
    description: 'Argentina presenta un escenario único: inflación crónica que erosiona el peso obliga a invertir en activos en USD para preservar poder adquisitivo. CEDEARs (Certificados de Depósito Argentinos) son la solución más popular: representaciones locales de acciones y ETFs internacionales que cotizan en pesos en BYMA pero replican el activo extranjero, permitiendo exposición global sin necesidad de cuenta en el exterior.',
    faq: [
      { q: '¿Qué son los CEDEARs?', a: 'CEDEARs (Certificados de Depósito Argentinos) son instrumentos negociados en BYMA (Bolsas y Mercados Argentinos) que representan acciones o ETFs cotizados en mercados internacionales. Por ejemplo, el CEDEAR SPY replica el ETF S&P 500 SPDR. Permiten invertir en activos extranjeros sin sacar dinero de Argentina y pagando en pesos argentinos.' },
      { q: '¿Cuál es el mejor broker en Argentina para CEDEARs?', a: 'IOL (InvertirOnline), Balanz y Cocos Capital son los más populares por su interfaz, costes razonables y oferta amplia de CEDEARs (>200). Para inversor avanzado con cuenta en USD afuera, Interactive Brokers da acceso a ETFs UCITS y US directos.' },
      { q: '¿Cómo se protege un argentino de la inflación con inversión indexada?', a: 'La estrategia más común: 70-100% en CEDEARs de ETFs amplios (SPY, QQQ, IWDA en CEDEAR) para exposición a economías estables. Algunos añaden oro físico o CEDEAR de GLD. Evitar activos en pesos a largo plazo por la pérdida de poder adquisitivo. Para FIRE en Argentina, el cálculo debe ser en USD reales, no pesos.' },
    ],
  },
  {
    slug: 'colombia',
    countryName: 'Colombia',
    flag: '🇨🇴',
    tagline: 'Inversión indexada para residentes en Colombia',
    currency: 'COP',
    capitalGainsTax: '10% sobre ganancias ocasionales (>2 años) o renta líquida (escala progresiva)',
    dividendTax: '7,5-20% según residencia y tipo',
    localBrokers: ['Trii', 'Tyba', 'BTG Pactual Colombia', 'Casa de Bolsa'],
    foreignBrokers: ['Interactive Brokers', 'eToro'],
    etfRecommendation: 'Para colombianos: Trii ofrece acceso a ETFs americanos populares (VTI, SPY, QQQ) con interfaz simple y costes bajos. Para inversores avanzados, Interactive Brokers da acceso completo a UCITS irlandeses (mayor eficiencia fiscal) y mercados internacionales. La BVC (Bolsa de Valores de Colombia) tiene oferta local más limitada.',
    considerations: [
      'Trii es la opción retail más popular para inversión internacional desde Colombia',
      'Convenio doble imposición Colombia-EE.UU. no existe (a 2024). Hay que verificar retenciones.',
      'Ganancias por venta de acciones extranjeras tributan en el IRPF colombiano',
      'Declarar inversiones en el exterior si superan los umbrales DIAN',
    ],
    description: 'Colombia ha visto crecer su comunidad de inversores indexados gracias a apps como Trii que democratizaron el acceso a ETFs americanos con costes mínimos. Los inversores colombianos más sofisticados combinan cuenta local con Interactive Brokers para acceder a UCITS irlandeses, que son más eficientes fiscalmente que ETFs domiciliados en USA (retención dividendos 15% vs 30%).',
    faq: [
      { q: '¿Cuál es el mejor broker en Colombia para invertir en ETFs?', a: 'Trii es el más popular para inversores retail: comisiones bajas, acceso a ETFs americanos (VTI, SPY, QQQ), interfaz mobile-first. Para inversores con patrimonio mayor, Interactive Brokers da acceso global completo con comisiones por orden muy bajas y soporte a UCITS irlandeses.' },
      { q: '¿Cómo tributan los ETFs en Colombia?', a: 'Las ganancias por venta de ETFs tributan en renta. Si la tenencia es >2 años, califica como ganancia ocasional (10%). Si es <2 años, ingreso líquido sujeto a escala progresiva del IRPF colombiano (0-39%). Dividendos extranjeros: tributan como rentas pasivas según convenio (en general 10-20%).' },
    ],
  },
  {
    slug: 'chile',
    countryName: 'Chile',
    flag: '🇨🇱',
    tagline: 'Inversión indexada para residentes en Chile',
    currency: 'CLP',
    capitalGainsTax: 'Exento si tenencia >1 año en bolsa chilena, 35% escala general extranjeros',
    dividendTax: '0-35% (escala progresiva personal)',
    localBrokers: ['Fintual', 'Capitaria', 'BTG Pactual Chile', 'LarrainVial'],
    foreignBrokers: ['Interactive Brokers Chile', 'Schwab International'],
    etfRecommendation: 'Para chilenos: Fintual es la app más popular (roboadvisor con fondos mutuos indexados, equivalente a Indexa Capital de España). Para acceso directo a ETFs internacionales, Interactive Brokers Chile. La Bolsa de Santiago tiene oferta limitada de ETFs (algunos iShares Chile).',
    considerations: [
      'Fintual (CMF) es el roboadvisor referente en Chile, similar a Indexa',
      'AFP: sistema de pensiones obligatorio, pero también puedes complementar (APV)',
      'APV (Ahorro Previsional Voluntario): beneficio tributario hasta cierto monto anual',
      'Ganancias en bolsa chilena con tenencia >1 año están exentas — gran ventaja vs renta variable extranjera',
    ],
    description: 'Chile cuenta con uno de los ecosistemas fintech más desarrollados de América Latina. Fintual lidera como roboadvisor (~250.000+ clientes) ofreciendo fondos mutuos indexados de bajo coste similar al modelo Indexa Capital en España. El sistema previsional AFP+APV permite ventajas fiscales adicionales para complementar la jubilación.',
    faq: [
      { q: '¿Qué es Fintual?', a: 'Fintual es el roboadvisor más popular de Chile (también disponible en México). Ofrece fondos mutuos indexados con perfiles de riesgo del 1 al 10, similar a Indexa Capital en España. Coste total estimado: 1.1% anual aproximadamente. Para inversores chilenos que quieren delegar la gestión, es la opción más accesible.' },
      { q: '¿Cómo invertir en S&P 500 desde Chile?', a: 'Tres formas: (1) Fintual con perfil 9 o 10 (cartera global con peso alto en S&P 500), (2) Interactive Brokers Chile comprando CSPX o SPY directamente, (3) Algunos brokers locales ofrecen acceso al ETF iShares Chile o a fondos mutuos que replican S&P 500. La opción 2 es la más eficiente en costes.' },
    ],
  },
  {
    slug: 'peru',
    countryName: 'Perú',
    flag: '🇵🇪',
    tagline: 'Inversión indexada para residentes en Perú',
    currency: 'PEN',
    capitalGainsTax: '5% sobre ganancias en bolsa peruana, 30% domiciliados extranjeros',
    dividendTax: '5% (ganancias en bolsa nacional)',
    localBrokers: ['Renta4 SAB', 'Inteligo SAB', 'BBVA Bolsa Perú'],
    foreignBrokers: ['Interactive Brokers', 'TD Ameritrade'],
    etfRecommendation: 'La oferta local de ETFs en Perú es limitada (algunos ETFs en BVL). Para inversión indexada seria, la mayoría de peruanos usa Interactive Brokers para acceder a ETFs americanos (VTI, SPY, VOO) o UCITS irlandeses (VWCE, IWDA) con comisiones muy bajas y diversificación máxima.',
    considerations: [
      'AFP: sistema de pensiones obligatorio, pero permite aportes voluntarios con ventaja fiscal',
      'CIC (Cuenta Individual de Capitalización): permite aportar a fondo elegido del AFP',
      'Convenio doble imposición Perú-EE.UU. no existe — la retención dividendos USA es 30%',
      'Si usas broker extranjero, declarar ganancias en renta personal',
    ],
    description: 'Perú tiene un mercado bursátil local limitado, lo que empuja a la mayoría de inversores indexados serios a usar Interactive Brokers para acceso global. La ausencia de convenio fiscal con EE.UU. (retención dividendos 30%) hace que los UCITS irlandeses sean más eficientes que los ETFs americanos para inversores peruanos a largo plazo.',
    faq: [
      { q: '¿Cuál es el mejor broker en Perú para inversión indexada?', a: 'Para acceso global con costes mínimos: Interactive Brokers Perú. Da acceso a +150 mercados, ETFs americanos y UCITS irlandeses, comisiones muy bajas. Los brokers locales (Renta4, Inteligo) son útiles para acceder a la Bolsa de Valores de Lima pero tienen oferta internacional limitada.' },
      { q: '¿UCITS irlandés o ETF americano para peruano?', a: 'Para inversores peruanos, los UCITS irlandeses (CSPX, VWCE, IWDA) son más eficientes que los ETFs americanos (SPY, VTI). Razón: Perú no tiene convenio fiscal con EE.UU., por lo que retención dividendos USA es 30%. UCITS irlandeses internamente pagan solo 15% gracias al convenio Irlanda-USA, lo que mejora el rendimiento neto.' },
    ],
  },
]

export function getHispanoMarketBySlug(slug: string): HispanoMarket | undefined {
  return HISPANO_MARKETS.find((m) => m.slug === slug)
}
