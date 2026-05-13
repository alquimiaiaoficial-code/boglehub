import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Position } from '@/types/portfolio'

interface PortfolioState {
  positions: Position[]
  monthlyContribution: number
  targetAmount: number
  addPosition: (pos: Omit<Position, 'id' | 'addedAt'>) => void
  removePosition: (id: string) => void
  updatePosition: (id: string, updates: Partial<Position>) => void
  setMonthlyContribution: (amount: number) => void
  setTargetAmount: (amount: number) => void
  clearPortfolio: () => void
}

export const usePortfolio = create<PortfolioState>()(
  persist(
    (set) => ({
      positions: [],
      monthlyContribution: 0,
      targetAmount: 0,
      addPosition: (pos) =>
        set((state) => ({
          positions: [...state.positions, { ...pos, id: crypto.randomUUID(), addedAt: new Date().toISOString() }],
        })),
      removePosition: (id) =>
        set((state) => ({ positions: state.positions.filter((p) => p.id !== id) })),
      updatePosition: (id, updates) =>
        set((state) => ({
          positions: state.positions.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
      setMonthlyContribution: (amount) => set({ monthlyContribution: amount }),
      setTargetAmount: (amount) => set({ targetAmount: amount }),
      clearPortfolio: () => set({ positions: [], monthlyContribution: 0, targetAmount: 0 }),
    }),
    { name: 'boglehub-portfolio' }
  )
)
