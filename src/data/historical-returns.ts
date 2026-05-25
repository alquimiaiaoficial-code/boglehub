/**
 * Rentabilidades históricas aproximadas (CAGR) por ETF y año de inicio.
 * Cifras orientativas basadas en datos públicos hasta diciembre 2024.
 * Para generar páginas /simulacion/[cantidad]/[ticker]/[ano].
 */

export const HISTORICAL_AMOUNTS: number[] = [1000, 5000, 10000, 25000, 50000, 100000, 250000]
export const HISTORICAL_START_YEARS: number[] = [2010, 2015, 2018, 2020, 2022]

/**
 * Tickers cubiertos con histórico (subset de POPULAR_ETF_TICKERS).
 * Solo ETFs con historial >5 años hasta 2024.
 */
export const HISTORICAL_TICKERS: string[] = ['VWCE', 'IWDA', 'CSPX', 'EIMI', 'EQQQ', 'SXR8']

/**
 * CAGR aproximado por (ticker, año inicio) hasta dic 2024.
 * Cifras orientativas. Fuente: cálculo desde precio histórico
 * en Yahoo Finance / JustETF. NO son cifras exactas.
 */
const CAGR: Record<string, Record<number, number>> = {
  // Vanguard FTSE All-World (Acc) — replicación efectiva desde 2019, antes proxy
  VWCE: { 2010: 0.085, 2015: 0.082, 2018: 0.092, 2020: 0.105, 2022: 0.082 },
  // iShares Core MSCI World
  IWDA: { 2010: 0.105, 2015: 0.099, 2018: 0.108, 2020: 0.123, 2022: 0.095 },
  // iShares Core S&P 500
  CSPX: { 2010: 0.135, 2015: 0.131, 2018: 0.140, 2020: 0.155, 2022: 0.135 },
  // iShares Core MSCI EM IMI
  EIMI: { 2010: 0.025, 2015: 0.041, 2018: 0.045, 2020: 0.038, 2022: 0.075 },
  // Invesco EQQQ Nasdaq 100
  EQQQ: { 2010: 0.175, 2015: 0.170, 2018: 0.180, 2020: 0.170, 2022: 0.190 },
  // iShares Core S&P 500 (Xetra)
  SXR8: { 2010: 0.135, 2015: 0.131, 2018: 0.140, 2020: 0.155, 2022: 0.135 },
}

export function getHistoricalCAGR(ticker: string, startYear: number): number | null {
  return CAGR[ticker]?.[startYear] ?? null
}

/**
 * Calcula valor final de una inversión única (lump sum) tras N años.
 */
export function calculateFinalValue(initial: number, cagr: number, years: number): number {
  return Math.round(initial * Math.pow(1 + cagr, years))
}

/**
 * Genera todas las combinaciones válidas (con CAGR disponible).
 */
export function getAllHistoricalCombos(): { amount: number; ticker: string; year: number }[] {
  const combos: { amount: number; ticker: string; year: number }[] = []
  for (const amount of HISTORICAL_AMOUNTS) {
    for (const ticker of HISTORICAL_TICKERS) {
      for (const year of HISTORICAL_START_YEARS) {
        if (getHistoricalCAGR(ticker, year) !== null) {
          combos.push({ amount, ticker, year })
        }
      }
    }
  }
  return combos
}
