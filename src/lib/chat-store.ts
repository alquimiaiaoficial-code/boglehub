import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

interface ChatState {
  messages: ChatMessage[]
  addMessage: (msg: Omit<ChatMessage, 'id' | 'createdAt'>) => string
  appendToLast: (delta: string) => void
  clear: () => void
}

const MAX_MESSAGES = 50

export const useChat = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (msg) => {
        const id = crypto.randomUUID()
        set((state) => {
          const next = [...state.messages, { ...msg, id, createdAt: new Date().toISOString() }]
          // Keep only the latest MAX_MESSAGES
          return { messages: next.slice(-MAX_MESSAGES) }
        })
        return id
      },
      appendToLast: (delta) =>
        set((state) => {
          if (state.messages.length === 0) return state
          const last = state.messages[state.messages.length - 1]
          const updated: ChatMessage = { ...last, content: last.content + delta }
          return { messages: [...state.messages.slice(0, -1), updated] }
        }),
      clear: () => set({ messages: [] }),
    }),
    { name: 'boglehub-chat' }
  )
)
