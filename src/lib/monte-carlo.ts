// Monte Carlo simulation for FIRE / retirement projections.
// Pure functions — fully testable, no side effects.

export interface MonteCarloInputs {
  initialCapital: number
  monthlyContribution: number
  yearsToRetire: number
  annualSpendingInRetirement: number
  yearsInRetirement: number
  meanReturn: number // annual, e.g. 0.07
  stdReturn: number // annual stddev, e.g. 0.15
  simulations: number // e.g. 1000
}

export interface MonteCarloResult {
  successRate: number // 0-1: fraction of runs that didn't deplete the portfolio
  /** Percentile balance trajectories across the full timeline (accumulation + retirement). */
  percentiles: { p10: number[]; p50: number[]; p90: number[] }
  medianFinalBalance: number
  /** Simple deterministic linear projection of the median path, for comparison. */
  linearProjection: number[]
  totalYears: number
}

/**
 * Box-Muller transform: returns a standard normally distributed value (mean 0, stddev 1).
 */
function gaussianRandom(): number {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/**
 * Computes a percentile from a sorted (or unsorted) array of numbers.
 */
function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor((p / 100) * sorted.length)))
  return sorted[idx]
}

/**
 * Runs a Monte Carlo retirement simulation.
 *
 * Each simulation models two phases year by year:
 *  1. Accumulation: balance grows with a random annual return and yearly contributions.
 *  2. Retirement: balance grows with a random annual return minus annual spending.
 *
 * A run "succeeds" if the balance never hits zero during retirement.
 */
export function runMonteCarlo(input: MonteCarloInputs): MonteCarloResult {
  const {
    initialCapital,
    monthlyContribution,
    yearsToRetire,
    annualSpendingInRetirement,
    yearsInRetirement,
    meanReturn,
    stdReturn,
    simulations,
  } = input

  const totalYears = yearsToRetire + yearsInRetirement
  const annualContribution = monthlyContribution * 12

  // balancesByYear[year] = array of balances across all simulations at that year
  const balancesByYear: number[][] = Array.from({ length: totalYears + 1 }, () => [])
  let successes = 0

  for (let sim = 0; sim < simulations; sim++) {
    let balance = initialCapital
    let depleted = false
    balancesByYear[0].push(balance)

    for (let year = 1; year <= totalYears; year++) {
      const annualReturn = meanReturn + stdReturn * gaussianRandom()

      if (year <= yearsToRetire) {
        // Accumulation phase
        balance = balance * (1 + annualReturn) + annualContribution
      } else {
        // Retirement phase
        balance = balance * (1 + annualReturn) - annualSpendingInRetirement
        if (balance <= 0) {
          balance = 0
          depleted = true
        }
      }

      balancesByYear[year].push(balance)
    }

    if (!depleted) successes++
  }

  const p10: number[] = []
  const p50: number[] = []
  const p90: number[] = []

  for (let year = 0; year <= totalYears; year++) {
    p10.push(percentile(balancesByYear[year], 10))
    p50.push(percentile(balancesByYear[year], 50))
    p90.push(percentile(balancesByYear[year], 90))
  }

  // Deterministic linear projection using the mean return (no volatility)
  const linearProjection: number[] = []
  let linearBalance = initialCapital
  linearProjection.push(linearBalance)
  for (let year = 1; year <= totalYears; year++) {
    if (year <= yearsToRetire) {
      linearBalance = linearBalance * (1 + meanReturn) + annualContribution
    } else {
      linearBalance = linearBalance * (1 + meanReturn) - annualSpendingInRetirement
    }
    linearProjection.push(Math.max(0, linearBalance))
  }

  return {
    successRate: simulations > 0 ? successes / simulations : 0,
    percentiles: { p10, p50, p90 },
    medianFinalBalance: p50[totalYears] ?? 0,
    linearProjection,
    totalYears,
  }
}
