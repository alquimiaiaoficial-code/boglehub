import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { AnalyzerClient } from './AnalyzerClient'

const BASE_URL = 'https://boglehub.com'
const PAGE_URL = `${BASE_URL}/analyzer`

/** Preguntas frecuentes de la herramienta — alimentan FAQPage + sección visible. */
const ANALYZER_FAQ: { q: string; a: string }[] = [
  {
    q: '¿Es gratis el analizador de cartera de BogleHub?',
    a: 'Sí, es completamente gratuito y sin registro. No hay versión de pago para el análisis: subes tus posiciones o el PDF de tu bróker y obtienes el resultado al instante.',
  },
  {
    q: '¿Se guardan mis datos de inversión en algún servidor?',
    a: 'No. Tus datos viven solo en tu navegador (localStorage) y nunca se envían ni se almacenan en servidores de BogleHub. Puedes borrarlos cuando quieras.',
  },
  {
    q: '¿Qué brókers reconoce automáticamente desde el PDF?',
    a: 'Detecta las posiciones desde el PDF de Trade Republic, DEGIRO, MyInvestor e ING. También puedes introducir las posiciones manualmente.',
  },
  {
    q: '¿Qué analiza exactamente de mi cartera?',
    a: 'Asignación por clase de activo, diversificación geográfica y sectorial, TER ponderado de la cartera, solapamiento entre ETFs, grado fiscal por ETF para un residente en España y una proyección FIRE. El análisis en lenguaje natural lo genera Llama 3.3 70B en español.',
  },
]

/** Slug estable por pregunta para anclas profundas (/analyzer#pregunta) citables por IA. */
function questionSlug(q: string): string {
  return q
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/**
 * Server Component wrapper.
 *
 * Renderiza en servidor: schema (SoftwareApplication + FAQPage), frase
 * respuesta-primero citable, H1, descripción y FAQ visible. La herramienta
 * interactiva vive en AnalyzerClient (Client Component).
 */
export default function AnalyzerPage() {
  return (
    <>
      <JsonLd
        schema={{
          type: 'SoftwareApplication',
          name: 'Analizador de cartera de BogleHub',
          description:
            'Herramienta gratuita en español que analiza tu cartera de fondos indexados y ETFs con IA: asignación de activos, diversificación geográfica y sectorial, TER ponderado, solapamiento entre ETFs, grado fiscal para residentes en España y proyección FIRE. Sin registro; los datos viven en el navegador del usuario.',
          url: PAGE_URL,
          applicationCategory: 'FinanceApplication',
        }}
      />
      <JsonLd
        schema={{
          type: 'FAQPage',
          questions: ANALYZER_FAQ.map(({ q, a }) => ({
            q,
            a,
            url: `${PAGE_URL}#${questionSlug(q)}`,
          })),
        }}
      />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Analizador de cartera', url: PAGE_URL },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        {/* ── Sección SEO/GEO — visible para crawlers y motores de IA ───── */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-4">
          <header className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Analizador de cartera de ETFs con IA
            </h1>
            {/* Respuesta-primero citable, con la entidad atada al dato */}
            <p className="mt-3 text-fg-muted max-w-2xl leading-relaxed">
              <span className="font-semibold text-fg">El analizador de cartera de BogleHub</span>{' '}
              es una herramienta gratuita en español que analiza tu cartera de fondos indexados y
              ETFs con inteligencia artificial (Llama 3.3 70B): asignación por clase de activo,
              diversificación geográfica y sectorial, TER ponderado, solapamiento entre ETFs, grado
              fiscal por ETF para residentes en España y proyección FIRE. Sin registro y con tus
              datos siempre en tu navegador — nunca salen a ningún servidor.
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

        {/* ── FAQ visible (server-rendered) con anclas por pregunta ──── */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-12">
          <section aria-labelledby="analyzer-faq-heading">
            <h2 id="analyzer-faq-heading" className="text-lg font-semibold text-fg mb-4">
              Preguntas frecuentes sobre el analizador
            </h2>
            <div className="space-y-3">
              {ANALYZER_FAQ.map(({ q, a }) => {
                const qSlug = questionSlug(q)
                return (
                  <details
                    key={q}
                    id={qSlug}
                    className="group scroll-mt-24 rounded-xl border border-border bg-surface px-5 py-4"
                  >
                    <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">
                      <span>
                        {q}{' '}
                        <a
                          href={`#${qSlug}`}
                          aria-label={`Enlace directo a: ${q}`}
                          className="font-normal text-fg-subtle no-underline hover:text-brand-400"
                        >
                          #
                        </a>
                      </span>
                      <span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">
                        ▾
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                  </details>
                )
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
