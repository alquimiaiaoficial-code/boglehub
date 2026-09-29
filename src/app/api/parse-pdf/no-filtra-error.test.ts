import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'

/**
 * parse-pdf no filtra el error interno al cliente (29-sep-2026, checklist de seguridad).
 *
 * El mensaje de la librería de PDF puede llevar rutas del servidor o su versión. Si esto se
 * rompe y vuelve a devolver `err.message`, el cliente vería ese detalle.
 */
vi.mock('@/lib/pdf-parser', () => ({
  parsePdf: vi.fn(async () => {
    throw new Error('/var/task/node_modules/pdf-lib v1.2.3: offset 0x1F inválido')
  }),
}))

const { POST } = await import('./route')

function peticionConPdf(): NextRequest {
  const fd = new FormData()
  fd.set('file', new File([new Uint8Array([0x25, 0x50, 0x44, 0x46])], 'x.pdf', { type: 'application/pdf' }))
  const req = new Request('https://boglehub.com/api/parse-pdf', {
    method: 'POST',
    headers: { 'x-forwarded-for': '203.0.113.' + Math.floor(Math.random() * 250) },
    body: fd,
  })
  return req as unknown as NextRequest
}

describe('parse-pdf', () => {
  it('un fallo de la librería devuelve un mensaje genérico, sin la ruta ni la versión', async () => {
    const res = await POST(peticionConPdf())
    expect(res.status).toBe(500)
    const j = await res.json()
    expect(j.success).toBe(false)
    expect(j.error).not.toContain('/var/task')
    expect(j.error).not.toContain('pdf-lib')
    expect(j.error).not.toContain('0x1F')
  })
})
