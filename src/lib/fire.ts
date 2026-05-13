import { FireProjection } from '@/types/analysis'

interface FireInputs {
  currentValue: number
  monthlyContribution: number
  targetAmount: number
  expectedAnnualReturn: number
}

const MAX_MONTHS = 600 // 50 years cap

export function projectFire(input: FireInputs): FireProjection {
  const { currentValue, monthlyContribution, targetAmount, expectedAnnualReturn } = input

  if (currentValue >= targetAmount) {
    return { ...input, yearsToFire: 0 }
  }

  const monthlyReturn = expectedAnnualReturn / 12
  let balance = currentValue

  for (let month = 1; month <= MAX_MONTHS; month++) {
    balance = balance * (1 + monthlyReturn) + monthlyContribution
    if (balance >= targetAmount) {
      return { ...input, yearsToFire: Math.round((month / 12) * 10) / 10 }
    }
  }

  return { ...input, yearsToFire: Infinity }
}
