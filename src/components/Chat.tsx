'use client'

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react'
import { useChat, ChatMessage } from '@/lib/chat-store'
import { Button } from '@/components/ui/Button'
import { Send, Trash2, Sparkles, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

export function Chat() {
  const { messages, addMessage, appendToLast, clear } = useChat()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || loading) return

    setError(null)
    setInput('')
    addMessage({ role: 'user', content: trimmed })
    trackEvent('chat_used')

    // Add placeholder assistant message that we'll stream into
    addMessage({ role: 'assistant', content: '' })

    setLoading(true)

    try {
      const allMessages = [...messages, { role: 'user' as const, content: trimmed }]
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok || !res.body) {
        const text = await res.text()
        throw new Error(text || 'Error del servidor')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        appendToLast(chunk)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al conectar')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-h-[900px]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface/50 backdrop-blur px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-fg">Chat IA</h2>
            <p className="text-xs text-fg-subtle">Pregunta lo que quieras · Llama 3.3 70B</p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => { clear(); setError(null) }}>
            <Trash2 className="h-4 w-4" />
            Nueva conversación
          </Button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 && (
            <EmptyState onSuggestion={(s) => setInput(s)} />
          )}
          {messages.map((m) => <MessageBubble key={m.id} message={m} />)}
          {loading && messages[messages.length - 1]?.content === '' && (
            <div className="flex gap-3">
              <Avatar role="assistant" />
              <div className="flex items-center gap-1.5 mt-2 text-fg-muted text-sm">
                <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
                <span>Pensando...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="rounded-lg bg-danger-dim border border-danger/30 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-surface/30 backdrop-blur px-4 sm:px-6 py-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Pregunta lo que quieras sobre inversión, fondos indexados, FIRE..."
              rows={2}
              disabled={loading}
              className="w-full resize-none rounded-xl border border-border bg-surface-2 px-4 py-3 pr-14 text-sm text-fg placeholder:text-fg-subtle focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors disabled:opacity-50"
            />
            <Button
              type="submit"
              variant="accent"
              size="sm"
              disabled={!input.trim() || loading}
              className="absolute right-2 bottom-2 h-9 w-9 px-0"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-fg-subtle text-center">
            Enter para enviar · Shift+Enter para nueva línea · Información educativa, no asesoramiento
          </p>
        </form>
      </div>
    </div>
  )
}

function Avatar({ role }: { role: 'user' | 'assistant' }) {
  if (role === 'user') {
    return (
      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-surface-3 flex items-center justify-center text-fg-muted">
        <User className="h-4 w-4" />
      </div>
    )
  }
  return (
    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent flex items-center justify-center text-white">
      <Sparkles className="h-4 w-4" />
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="flex gap-3">
      <Avatar role={message.role} />
      <div className={cn(
        'flex-1 min-w-0',
        message.role === 'user' ? 'text-fg' : 'text-fg'
      )}>
        <div className="text-xs font-medium text-fg-muted mb-1">
          {message.role === 'user' ? 'Tú' : 'BogleHub'}
        </div>
        {message.role === 'user' ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none prose-headings:text-fg prose-strong:text-fg prose-code:text-brand-300 prose-code:bg-surface-2 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface-2 prose-pre:border prose-pre:border-border prose-a:text-brand-400 prose-table:text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content || ' '}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

const SUGGESTIONS = [
  '¿Qué es un fondo indexado y por qué Bogleheads lo prefieren?',
  '¿VWCE o CSPX para una cartera global?',
  '¿Cómo funciona la fiscalidad de los ETFs en España?',
  '¿Cuánto necesito ahorrar al mes para alcanzar FIRE en 20 años?',
]

function EmptyState({ onSuggestion }: { onSuggestion: (s: string) => void }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent text-white mb-4">
        <Sparkles className="h-7 w-7" />
      </div>
      <h2 className="text-2xl font-bold text-fg">¿Sobre qué quieres aprender?</h2>
      <p className="mt-2 text-fg-muted">Pregúntame sobre inversión pasiva, FIRE, fiscalidad o lo que necesites.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            className="text-left text-sm text-fg-muted hover:text-fg p-3 rounded-lg border border-border bg-surface hover:bg-surface-2 hover:border-border-strong transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
