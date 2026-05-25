/**
 * Datos de qué pasó en cada año del mercado.
 * Para páginas /historico/[ano]/[ticker].
 */

export interface YearEvent {
  year: number
  /** Tipo de mercado */
  marketType: 'alcista' | 'bajista' | 'lateral' | 'crisis'
  /** Resumen del año */
  summary: string
  /** Eventos principales */
  keyEvents: string[]
  /** Rendimientos aproximados por ticker */
  returns: Record<string, number>
}

export const YEAR_EVENTS: YearEvent[] = [
  {
    year: 2020,
    marketType: 'crisis',
    summary: 'Crisis COVID en marzo provocó caída del 30-35% en pocas semanas. Recuperación en V impulsada por estímulos masivos. Cierre del año en positivo para la mayoría de índices globales.',
    keyEvents: [
      'Marzo: caída del 30-35% en 4 semanas por COVID-19',
      'Abril-junio: recuperación rápida por estímulos fiscales y monetarios masivos',
      'Q4: rally post-vacunas, alcanzando nuevos máximos en S&P 500 y Nasdaq',
      'Tecnología y crecimiento dominaron el año',
    ],
    returns: {
      VWCE: 0.07,
      IWDA: 0.06,
      CSPX: 0.16,
      SWRD: 0.06,
      EIMI: 0.18,
      EQQQ: 0.48,
      SXR8: 0.16,
      AGGH: 0.04,
    },
  },
  {
    year: 2021,
    marketType: 'alcista',
    summary: 'Mercado alcista fuerte gracias a recuperación post-COVID, estímulos continuados y resultados empresariales sólidos. S&P 500 superó el 25% de rentabilidad.',
    keyEvents: [
      'Q1-Q2: continuación del rally post-vacunas',
      'Rendimiento estelar del Nasdaq y tecnología',
      'Inflación empieza a aparecer en Q4',
      'Bitcoin alcanzó máximos históricos',
    ],
    returns: {
      VWCE: 0.21,
      IWDA: 0.23,
      CSPX: 0.27,
      SWRD: 0.23,
      EIMI: -0.01,
      EQQQ: 0.27,
      SXR8: 0.27,
      AGGH: -0.04,
    },
  },
  {
    year: 2022,
    marketType: 'bajista',
    summary: 'Año excepcional: cayeron acciones Y bonos a la vez por la subida agresiva de tipos de la Fed para combatir la inflación. Nasdaq cayó ~33%, S&P 500 ~18%.',
    keyEvents: [
      'Fed sube tipos de 0% a 4,5% en un año (subida histórica)',
      'Inflación alcanzó 9% en EE.UU. y eurozona',
      'Guerra Ucrania-Rusia disparó energía y commodities',
      'Cripto colapsó (Terra, FTX). Cayeron acciones Y bonos: 60/40 perdió ~16%',
    ],
    returns: {
      VWCE: -0.12,
      IWDA: -0.13,
      CSPX: -0.13,
      SWRD: -0.13,
      EIMI: -0.16,
      EQQQ: -0.33,
      SXR8: -0.13,
      AGGH: -0.16,
    },
  },
  {
    year: 2023,
    marketType: 'alcista',
    summary: 'Recuperación liderada por las "Magnificent 7" tecnológicas. Nasdaq +43%, S&P 500 +24%. Concentración extrema en pocas empresas. ChatGPT y boom IA.',
    keyEvents: [
      'Boom de IA generativa tras lanzamiento de ChatGPT (nov 2022)',
      'Magnificent 7 (Apple, Microsoft, Google, Amazon, Meta, Nvidia, Tesla) generan el 60% del retorno del S&P 500',
      'Nvidia +240% por demanda de chips IA',
      'Bonos finalmente positivos tras subidas de tipos',
    ],
    returns: {
      VWCE: 0.18,
      IWDA: 0.20,
      CSPX: 0.24,
      SWRD: 0.20,
      EIMI: 0.06,
      EQQQ: 0.43,
      SXR8: 0.24,
      AGGH: 0.05,
    },
  },
  {
    year: 2024,
    marketType: 'alcista',
    summary: 'Continuación del rally con S&P 500 superando 6.000 puntos. Magnificent 7 vuelven a dominar pero con cierta rotación hacia value y small caps en H2.',
    keyEvents: [
      'S&P 500 supera los 6.000 puntos por primera vez',
      'Nvidia, Meta y otras megacompañías tech continúan al alza',
      'Bitcoin supera los 100.000$ a final de año',
      'Inflación se normaliza, Fed empieza recortes de tipos',
    ],
    returns: {
      VWCE: 0.21,
      IWDA: 0.23,
      CSPX: 0.25,
      SWRD: 0.23,
      EIMI: 0.09,
      EQQQ: 0.25,
      SXR8: 0.25,
      AGGH: 0.02,
    },
  },
]

export const HISTORICAL_YEAR_TICKERS = ['VWCE', 'IWDA', 'CSPX', 'SWRD', 'EIMI', 'EQQQ', 'SXR8', 'AGGH']

export function getYearEvent(year: number): YearEvent | undefined {
  return YEAR_EVENTS.find((y) => y.year === year)
}

export function getReturn(year: number, ticker: string): number | null {
  const event = getYearEvent(year)
  return event?.returns[ticker] ?? null
}
