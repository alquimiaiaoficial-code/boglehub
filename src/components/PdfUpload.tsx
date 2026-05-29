'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, Check, X } from 'lucide-react'
import { usePortfolio } from '@/lib/store'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ParseResult } from '@/lib/pdf-parser/types'
import { trackEvent } from '@/lib/analytics'

export function PdfUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const addPosition = usePortfolio((s) => s.addPosition)
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ParseResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setError(null); setResult(null); setLoading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/parse-pdf', { method: 'POST', body: fd })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      setResult(json.data)
      trackEvent('pdf_uploaded', {
        broker: json.data?.broker ?? 'desconocido',
        positions: json.data?.positions?.length ?? 0,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al procesar')
    } finally { setLoading(false) }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const importAll = () => {
    if (!result) return
    for (const p of result.positions) {
      if (p.shares > 0 && p.avgPrice > 0) {
        addPosition({ ticker: p.ticker, shares: p.shares, avgPrice: p.avgPrice, currency: 'EUR' })
      }
    }
    setResult(null)
  }

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-fg">Importar desde PDF</h3>
        <p className="text-xs text-fg-muted mt-1">Trade Republic · DEGIRO · MyInvestor · ING</p>
      </div>

      {!result && !loading && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-brand-500 bg-brand-500/5' : 'border-border hover:border-border-strong'
          }`}
        >
          <Upload className="h-8 w-8 mx-auto text-fg-muted mb-3" />
          <p className="text-sm text-fg">Arrastra tu PDF o haz clic para subir</p>
          <p className="text-xs text-fg-subtle mt-1">Máx. 5MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
          />
        </div>
      )}

      {loading && (
        <div className="text-center py-6 text-sm text-fg-muted">
          <FileText className="h-6 w-6 mx-auto mb-2 animate-pulse" />
          Procesando PDF...
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-danger-dim border border-danger/30 px-3 py-2 text-sm text-danger">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-fg">
              <span className="font-semibold">{result.positions.length}</span> posiciones detectadas
              <span className="text-fg-subtle ml-2">({result.broker})</span>
            </p>
            <Button variant="ghost" size="sm" onClick={() => setResult(null)} aria-label="Cancelar">
              <X className="h-4 w-4" />
            </Button>
          </div>
          {result.warnings.length > 0 && (
            <div className="rounded-lg bg-warn/10 border border-warn/30 px-3 py-2 text-xs text-warn">
              {result.warnings.join(' · ')}
            </div>
          )}
          {result.positions.length > 0 && (
            <>
              <ul className="space-y-1 max-h-48 overflow-y-auto text-sm font-mono">
                {result.positions.map((p, i) => (
                  <li key={i} className="flex justify-between border-b border-border py-1">
                    <span className="text-fg">{p.ticker}</span>
                    <span className="text-fg-muted">{p.shares} × {p.avgPrice.toFixed(2)}€</span>
                  </li>
                ))}
              </ul>
              <Button variant="accent" onClick={importAll} className="w-full">
                <Check className="h-4 w-4" />
                Importar {result.positions.length} posiciones
              </Button>
            </>
          )}
        </div>
      )}
    </Card>
  )
}
