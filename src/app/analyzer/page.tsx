import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnalyzerClient } from './AnalyzerClient'

/**
 * Server Component wrapper.
 *
 * Renderiza en servidor:
 * - Header + Footer (navegación)
 * - Sección SEO con H1 y descripción visible para Googlebot
 * - Lista de funciones (contenido indexable)
 *
 * La herramienta interactiva vive en AnalyzerClient (Client Component).
 */
export default function AnalyzerPage() {
  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        {/* ── Sección SEO — visible para Googlebot ────────────────────────
            H1, descripción y lista de características se renderizan en el
            servidor. AnalyzerClient es Client Component y se hidrata en el
            cliente sin afectar al crawl del contenido estático.
        ─────────────────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-4">
          <header className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Analizador de cartera de ETFs con IA
            </h1>
            <p className="mt-2 text-fg-muted max-w-2xl">
              Analiza tu cartera de fondos indexados en segundos: asignación por
              clase de activo, diversificación geográfica y sectorial, TER ponderado,
              solapamiento entre ETFs y proyección FIRE personalizada. Gratis, sin
              registro. Tus datos nunca salen de tu navegador.
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-fg-subtle">
              <li>✓ Trade Republic, DEGIRO, MyInvestor, ING — detección por PDF</li>
              <li>✓ Precios en tiempo real y conversión a EUR automática</li>
              <li>✓ Análisis con Llama 3.3 70B en español</li>
              <li>✓ Grado fiscal A–F por ETF (residente en España)</li>
            </ul>
          </header>
        </div>

        {/* ── Herramienta interactiva (Client Component) ─────────────── */}
        <AnalyzerClient />
      </main>
      <Footer />
    </>
  )
}
