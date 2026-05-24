import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'

const BASE_URL = 'https://boglehub.com'

interface CalculatorCard {
  slug: string
  name: string
  tag: string
  pitch: string
}

const CALCULATORS: CalculatorCard[] = [
  {
    slug: 'interes-compuesto',
    name: 'Interés compuesto',
    tag: 'Planificación',
    pitch:
      'Cuánto puede crecer tu inversión a 10, 20 o 30 años. Mete capital, aportes y rentabilidad y ve la proyección año a año.',
  },
  {
    slug: 'fire-monte-carlo',
    name: 'FIRE Monte Carlo',
    tag: 'Independencia financiera',
    pitch:
      'Cuándo puedes retirarte y con qué probabilidad. Simula miles de escenarios de mercado y calcula tu tasa de retirada segura.',
  },
  {
    slug: 'roboadvisor-vs-diy',
    name: 'Roboadvisor vs cartera DIY',
    tag: 'Costes',
    pitch:
      'Lo que te cuesta delegar la gestión a un roboadvisor frente a hacerlo tú con una cartera de fondos o ETF indexados.',
  },
  {
    slug: 'irpf-venta-fondos',
    name: 'IRPF al vender fondos y ETF',
    tag: 'Fiscalidad',
    pitch:
      'Cuánto paga Hacienda al vender, con desglose por tramos del IRPF del ahorro 2026 y compensación de pérdidas.',
  },
  {
    slug: 'comparar-brokers',
    name: 'Comparador de brókers',
    tag: 'Brókers',
    pitch:
      'MyInvestor, Trade Republic, DEGIRO, Scalable, IBKR y XTB. Cuánto te cuesta cada uno al año según cómo inviertes.',
  },
]

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '¿Son fiables estas calculadoras?',
    a: 'Son herramientas educativas y orientativas, no asesoramiento financiero. Implementan fórmulas estándar (interés compuesto, simulación de Monte Carlo, escala progresiva del IRPF del ahorro 2026, costes anuales) y muestran los cálculos año a año para que puedas verificarlos. No sustituyen al criterio de un asesor para tu caso concreto.',
  },
  {
    q: '¿Tengo que registrarme para usarlas?',
    a: 'No. Ninguna calculadora pide registro, email ni datos personales. Solo los números que tú introduces, y se quedan en tu navegador.',
  },
  {
    q: '¿Para qué tipo de inversor están pensadas?',
    a: 'Para inversores particulares en España que invierten a largo plazo en fondos indexados, ETF o roboadvisors siguiendo una filosofía estilo Boglehead: cartera sencilla, diversificada, barata y mantenida en el tiempo. Las cifras y supuestos están adaptados a la fiscalidad y al contexto español.',
  },
  {
    q: '¿Puedo usarlas en el móvil?',
    a: 'Sí, están pensadas para funcionar bien en móvil. Y puedes instalar BogleHub como app desde el navegador (pantalla de inicio en iOS y Android) para entrar más rápido.',
  },
]

export const metadata: Metadata = {
  title: 'Calculadoras de inversión gratis 2026',
  description:
    'Calculadoras gratis para inversores en España: interés compuesto, FIRE Monte Carlo, coste real de roboadvisors e IRPF al vender fondos y ETF. Sin registro.',
  openGraph: {
    title: 'Calculadoras de inversión gratis 2026 | BogleHub',
    description:
      'Cuatro herramientas gratis para tomar decisiones con números: interés compuesto, FIRE, coste de roboadvisors e IRPF al vender.',
    locale: 'es_ES',
    images: [
      '/api/og?title=Calculadoras%20de%20inversi%C3%B3n&subtitle=Gratis%2C%20en%20espa%C3%B1ol%2C%20sin%20registro',
    ],
  },
  alternates: { canonical: '/calculadora' },
}

export default function CalculadoraHubPage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Calculadoras', url: `${BASE_URL}/calculadora` },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-8">
          <header className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Calculadoras de inversión para inversores en España
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Cuatro herramientas gratis para tomar decisiones con números concretos en lugar
              de con opiniones. Cuánto crece tu cartera, cuándo puedes retirarte, lo que
              cuesta un roboadvisor y lo que paga Hacienda al vender. Sin registro y sin que
              tus datos salgan de tu navegador.
            </p>
          </header>
        </div>

        {/* Grid de calculadoras */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CALCULATORS.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculadora/${calc.slug}`}
                className="group rounded-xl border border-border bg-surface p-6 hover:border-border-strong transition-colors"
              >
                <span className="inline-block rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-400">
                  {calc.tag}
                </span>
                <h2 className="mt-3 text-lg font-bold text-fg group-hover:text-brand-400 transition-colors">
                  {calc.name}
                </h2>
                <p className="mt-2 text-sm text-fg-muted leading-relaxed">{calc.pitch}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-400">
                  Abrir calculadora
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Contenido educativo */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 space-y-12">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Cómo están pensadas
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Las cuatro calculadoras están hechas para inversores particulares en España que
              invierten a largo plazo en fondos indexados, ETF o a través de roboadvisors. Las
              cifras y supuestos están adaptados al contexto y a la fiscalidad española: la
              escala del ahorro del IRPF para 2026, el régimen de traspasos entre fondos, los
              costes habituales de roboadvisors como Indexa Capital o Finizens, o la
              integración de la pensión pública en el cálculo FIRE.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Todos los cálculos ocurren en tu navegador. No hay registro, no se envía nada a
              ningún servidor y puedes usarlas tantas veces como quieras. La idea es que el
              número sirva de punto de partida, no de respuesta final.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Por dónde empezar según en qué andes
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Si estás empezando y quieres ver el poder real del interés compuesto, abre la{' '}
              <Link
                href="/calculadora/interes-compuesto"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                calculadora de interés compuesto
              </Link>
              . Si te planteas si pagar a un roboadvisor merece la pena frente a montar tu
              propia cartera, ve al{' '}
              <Link
                href="/calculadora/roboadvisor-vs-diy"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                comparador roboadvisor vs DIY
              </Link>
              . Si vas a vender y quieres saber lo que te llevará Hacienda antes de dar al
              botón, la{' '}
              <Link
                href="/calculadora/irpf-venta-fondos"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                calculadora de IRPF
              </Link>{' '}
              te lo cuenta con desglose por tramos. Y si la pregunta es "cuándo puedo dejar
              de trabajar", la{' '}
              <Link
                href="/calculadora/fire-monte-carlo"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                calculadora FIRE con Monte Carlo
              </Link>{' '}
              te da una probabilidad, no una falsa certeza.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-5">
              Preguntas frecuentes
            </h2>
            <div className="space-y-5">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q}>
                  <h3 className="text-base font-semibold text-fg mb-1.5">{item.q}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA al analizador */}
          <section className="rounded-xl border border-accent/30 bg-accent-dim p-6">
            <h2 className="text-lg font-bold text-fg mb-2">
              Para ver tu cartera entera, no un escenario
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4">
              Las calculadoras simulan escenarios. El analizador hace lo contrario: coge tu
              cartera real, te dice si está bien diversificada, qué comisiones pagas de verdad
              y dónde se solapan tus fondos. Sin registro, y los datos se quedan en tu
              navegador.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/analyzer"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Analizar mi cartera
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:bg-surface-3 transition-colors"
              >
                Pregúntale al Chat IA
              </Link>
            </div>
          </section>

          <p className="text-xs text-fg-subtle leading-relaxed border-t border-border pt-6">
            Información educativa, no asesoramiento financiero ni recomendación de productos.
            Rentabilidades pasadas no garantizan rentabilidades futuras. Para tu caso
            personal, consulta con un asesor.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
