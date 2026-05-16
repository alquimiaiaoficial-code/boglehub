import { describe, it, expect } from 'vitest'
import { runMonteCarlo, MonteCarloInputs } from './monte-carlo'

const baseInput: MonteCarloInputs = {
  initialCapital: 100_000,
  monthlyContribution: 1_000,
  yearsToRetire: 20,
  annualSpendingInRetirement: 30_000,
  yearsInRetirement: 30,
  meanReturn: 0.07,
  stdReturn: 0.15,
  simulations: 500,
}

describe('runMonteCarlo', () => {
  it('returns a success rate between 0 and 1', () => {
    const result = runMonteCarlo(baseInput)
    expect(result.successRate).toBeGreaterThanOrEqual(0)
    expect(result.successRate).toBeLessThanOrEqual(1)
  })

  it('produces percentile arrays covering the full timeline', () => {
    const result = runMonteCarlo(baseInput)
    const expectedLength = baseInput.yearsToRetire + baseInput.yearsInRetirement + 1
    expect(result.percentiles.p10).toHaveLength(expectedLength)
    expect(result.percentiles.p50).toHaveLength(expectedLength)
    expect(result.percentiles.p90).toHaveLength(expectedLength)
    expect(result.totalYears).toBe(expectedLength - 1)
  })

  it('p90 is always >= p50 >= p10 at every year', () => {
    const result = runMonteCarlo(baseInput)
    for (let i = 0; i < result.percentiles.p50.length; i++) {
      expect(result.percentiles.p90[i]).toBeGreaterThanOrEqual(result.percentiles.p50[i])
      expect(result.percentiles.p50[i]).toBeGreaterThanOrEqual(result.percentiles.p10[i])
    }
  })

  it('all percentile trajectories start at the initial capital', () => {
    const result = runMonteCarlo(baseInput)
    expect(result.percentiles.p10[0]).toBe(baseInput.initialCapital)
    expect(result.percentiles.p50[0]).toBe(baseInput.initialCapital)
    expect(result.percentiles.p90[0]).toBe(baseInput.initialCapital)
  })

  it('reaches ~100% success when retirement spending is trivially low', () => {
    const result = runMonteCarlo({ ...baseInput, annualSpendingInRetirement: 1, simulations: 300 })
    expect(result.successRate).toBeGreaterThan(0.95)
  })

  it('reaches very low success when spending vastly exceeds capital', () => {
    const result = runMonteCarlo({
      ...baseInput,
      initialCapital: 1_000,
      monthlyContribution: 0,
      annualSpendingInRetirement: 500_000,
      simulations: 300,
    })
    expect(result.successRate).toBeLessThan(0.1)
  })

  it('linear projection has one entry per year plus the starting point', () => {
    const result = runMonteCarlo(baseInput)
    expect(result.linearProjection).toHaveLength(result.totalYears + 1)
    expect(result.linearProjection[0]).toBe(baseInput.initialCapital)
  })
})
