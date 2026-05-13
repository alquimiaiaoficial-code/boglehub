import { describe, it, expect } from 'vitest'
import { projectFire } from './fire'

describe('projectFire', () => {
  it('returns 0 years when already at target', () => {
    const result = projectFire({
      currentValue: 100_000,
      monthlyContribution: 500,
      targetAmount: 100_000,
      expectedAnnualReturn: 0.07,
    })
    expect(result.yearsToFire).toBe(0)
  })

  it('takes ~7-10 years for 100k → 200k at 500/mo + 7%', () => {
    const result = projectFire({
      currentValue: 100_000,
      monthlyContribution: 500,
      targetAmount: 200_000,
      expectedAnnualReturn: 0.07,
    })
    expect(result.yearsToFire).toBeGreaterThan(6)
    expect(result.yearsToFire).toBeLessThan(10)
  })

  it('returns Infinity if target unreachable (zero contribution + zero return)', () => {
    const result = projectFire({
      currentValue: 10_000,
      monthlyContribution: 0,
      targetAmount: 1_000_000,
      expectedAnnualReturn: 0,
    })
    expect(result.yearsToFire).toBe(Infinity)
  })

  it('preserves input values in output', () => {
    const input = {
      currentValue: 50_000,
      monthlyContribution: 800,
      targetAmount: 500_000,
      expectedAnnualReturn: 0.07,
    }
    const result = projectFire(input)
    expect(result.currentValue).toBe(50_000)
    expect(result.monthlyContribution).toBe(800)
    expect(result.targetAmount).toBe(500_000)
    expect(result.expectedAnnualReturn).toBe(0.07)
  })
})
