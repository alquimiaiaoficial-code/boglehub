import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Position } from '@/types/portfolio'

/** A timestamped snapshot of the portfolio — the basis of the value-over-time history. */
export interface PortfolioSnapshot {
  id: string
  createdAt: string
  positions: Position[]
  totalValueEUR: number
}

const MAX_SNAPSHOTS = 60

function isSameCalendarDay(a: string, b: string): boolean {
  return new Date(a).toDateString() === new Date(b).toDateString()
}

interface PortfolioState {
  positions: Position[]
  monthlyContribution: number
  targetAmount: number
  snapshots: PortfolioSnapshot[]
  addPosition: (pos: Omit<Position, 'id' | 'addedAt'>) => void
  removePosition: (id: string) => void
  updatePosition: (id: string, updates: Partial<Position>) => void
  setMonthlyContribution: (amount: number) => void
  setTargetAmount: (amount: number) => void
  setPositions: (positions: Position[]) => void
  clearPortfolio: () => void
  saveSnapshot: (totalValueEUR: number) => void
  deleteSnapshot: (id: string) => void
  restoreSnapshot: (id: string) => void
}

export const usePortfolio = create<PortfolioState>()(
  persist(
    (set) => ({
      positions: [],
      monthlyContribution: 0,
      targetAmount: 0,
      snapshots: [],
      addPosition: (pos) =>
        set((state) => ({
          positions: [
            ...state.positions,
            { ...pos, id: crypto.randomUUID(), addedAt: new Date().toISOString() },
          ],
        })),
      removePosition: (id) =>
        set((state) => ({ positions: state.positions.filter((p) => p.id !== id) })),
      updatePosition: (id, updates) =>
        set((state) => ({
          positions: state.positions.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
      setMonthlyContribution: (amount) => set({ monthlyContribution: amount }),
      setTargetAmount: (amount) => set({ targetAmount: amount }),
      setPositions: (positions) => set({ positions }),
      clearPortfolio: () => set({ positions: [], monthlyContribution: 0, targetAmount: 0 }),

      // Saves a snapshot of the current portfolio. Replaces any snapshot taken
      // earlier the same day so the history stays at most one entry per day.
      saveSnapshot: (totalValueEUR) =>
        set((state) => {
          if (state.positions.length === 0) return state
          const now = new Date().toISOString()
          const snapshot: PortfolioSnapshot = {
            id: crypto.randomUUID(),
            createdAt: now,
            positions: state.positions.map((p) => ({ ...p })),
            totalValueEUR,
          }
          const withoutToday = state.snapshots.filter(
            (s) => !isSameCalendarDay(s.createdAt, now)
          )
          const next = [...withoutToday, snapshot]
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .slice(-MAX_SNAPSHOTS)
          return { snapshots: next }
        }),

      deleteSnapshot: (id) =>
        set((state) => ({ snapshots: state.snapshots.filter((s) => s.id !== id) })),

      restoreSnapshot: (id) =>
        set((state) => {
          const snapshot = state.snapshots.find((s) => s.id === id)
          if (!snapshot) return state
          return { positions: snapshot.positions.map((p) => ({ ...p })) }
        }),
    }),
    { name: 'boglehub-portfolio' }
  )
)
