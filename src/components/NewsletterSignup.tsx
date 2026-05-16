'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Check } from 'lucide-react'

export function NewsletterSignup({ variant = 'card' }: { variant?: 'card' | 'inline' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md w-full">
        <Input
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          className="flex-1"
        />
        <Button
          type="submit"
          variant="accent"
          loading={status === 'loading'}
          disabled={status === 'success'}
        >
          {status === 'success' ? <><Check className="h-4 w-4" /> Suscrito</> : 'Suscribir'}
        </Button>
      </form>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 max-w-md">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="h-5 w-5 text-brand-400" />
        <h3 className="font-semibold text-fg">Newsletter quincenal</h3>
      </div>
      <p className="text-sm text-fg-muted mb-4">
        Análisis de ETFs, noticias del mercado y novedades de BogleHub. Sin spam. Cancelas con un click.
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
        />
        <Button
          type="submit"
          variant="accent"
          loading={status === 'loading'}
          disabled={status === 'success'}
          className="w-full"
        >
          {status === 'success' ? <><Check className="h-4 w-4" /> Te hemos suscrito</> : 'Suscribir'}
        </Button>
        {status === 'error' && (
          <p className="text-xs text-danger">Hubo un error. Inténtalo de nuevo.</p>
        )}
      </form>
    </div>
  )
}
