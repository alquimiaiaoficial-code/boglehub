import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { CompoundInterestCalculator } from './CompoundInterestCalculator'

const BASE_URL = 'https://boglehub.com'

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '¿Qué rentabilidad anual debo introducir?',
    a: 'Para una cartera de renta variable global (MSCI World, S&P 500), la rentabilidad histórica ha sido de entre el 7% y el 10% anual nominal. Descontando una inflación media del 2–3%, la rentabilidad real se sitúa entre el 5% y el 7%. Usa 5% para el escenario conservador, 7% para el moderado y 9–10% para el optimista. Nadie puede garantizar esos números: sirven para calibrar cuánto necesitas ahorrar, no para prometerte un resultado.',
  },
  {
    q: '¿En qué se diferencia el interés compuesto del interés simple?',
    a: 'Con el interés simple, cada año ganas el mismo porcentaje sobre tu capital inicial: el 7% de 10.000 € son siempre 700 €. Con el compuesto, los intereses generados se reinvierten y a su vez generan más intereses el año siguiente. El segundo año ya no ganas el 7% de 10.000 €, sino el 7% de 10.700 €. A 30 años, esa diferencia acumulada puede superar el triple del capital inicial aportado.',
  },
  {
    q: '¿Por qué las aportaciones periódicas multiplican tanto el efecto?',
    a: 'Cada euro que aportas empieza a generar interés compuesto desde el momento en que entra. Una aportación de 200 € al mes puede parecer pequeña, pero en 25 años a un 7% anual transforma 60.000 € de aportaciones en más de 160.000 € de cartera. El efecto se multiplica porque cuanto antes entra cada euro, más tiempo tiene para crecer.',
  },
  {
    q: '¿Qué pasa si el mercado baja durante algunos años?',
    a: 'Esta calculadora usa una rentabilidad anual constante, que es una simplificación. Los mercados reales suben y bajan cada año. Una caída fuerte en los primeros años del horizonte es más dañina que al final (efecto secuencia de retornos). Para ver cómo afecta la volatilidad real a tu plan, usa la calculadora FIRE con Monte Carlo, que simula 1.000 escenarios con rentabilidades variables.',
  },
  {
    q: '¿Esta calculadora tiene en cuenta la inflación?',
    a: 'No directamente. La rentabilidad que introduces es nominal. Si quieres ver el resultado en poder adquisitivo de hoy, introduce una rentabilidad real: si esperas un 7% nominal y una inflación del 2,5%, introduce un 4,5%. El resultado te mostrará cuánto valdrá tu cartera en euros de hoy.',
  },
]

export const metadata: Metadata = {
  title: 'Calculadora de interés compuesto 2026 gratis',
  description:
    'Calcula el crecimiento de tu inversión con interés compuesto: capital inicial, aportaciones mensuales y rentabilidad anual. Ve la proyección año a año. Gratis, en español, sin registro.',
  openGraph: {
    title: 'Calculadora de interés compuesto 2026 | BogleHub',
    description:
      'Visualiza cómo crece tu inversión con aportaciones mensuales e interés compuesto. Proyección año a año, gratis y sin registro.',
    locale: 'es_ES',
    images: [
      '/api/og?title=Calculadora%20inter%C3%A9s%20compuesto&subtitle=Proyecci%C3%B3n%20a%C3%B1o%20a%20a%C3%B1o%20gratis',
    ],
  },
  alternates: { canonical: '/calculadora/interes-compuesto' },
}

export default function CompoundInterestPage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Calculadoras', url: `${BASE_URL}/calculadora` },
            { name: 'Interés compuesto', url: `${BASE_URL}/calculadora/interes-compuesto` },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-2">
          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/calculadora" className="hover:text-fg transition-colors">Calculadoras</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Interés compuesto</span>
          </nav>
          <header className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Calculadora de interés compuesto
            </h1>
            <p className="mt-2 text-fg-muted leading-relaxed">
              Introduce tu capital inicial, aportación mensual, rentabilidad anual esperada y
              horizonte temporal para ver la proyección completa año a año. El interés
              compuesto reinvierte cada euro ganado para que a su vez genere más rendimiento.
              Sin registro y sin que tus datos salgan del navegador.
            </p>
          </header>
        </div>

        <CompoundInterestCalculator />

        {/* Contenido educativo */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 space-y-12">

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Qué es el interés compuesto y por qué importa tanto
            </h2>
            <p className="text-fg-muted leading-relaxed">
              El interés compuesto es el mecanismo por el que los rendimientos que genera tu
              inversión se reinvierten automáticamente y pasan a generar más rendimientos. El
              resultado no crece de forma lineal sino exponencial: los primeros años el avance
              parece lento, pero con el tiempo la curva se acelera de forma dramática.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Un fondo indexado que reinvierte dividendos —los llamados fondos de
              acumulación— aplica automáticamente este principio. Cada dividendo o cupón que
              genera el fondo no se paga al partícipe: se reinvierte en más participaciones.
              Con el tiempo, una parte cada vez mayor de la cartera son los rendimientos de
              los rendimientos, no el capital que tú pusiste.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              El tiempo es el ingrediente que más importa
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Empezar 10 años antes puede valer más que doblar la aportación mensual. Alguien
              que invierte 200 € al mes durante 30 años a un 7% anual acumula aproximadamente
              226.000 €, habiendo aportado de su bolsillo 72.000 €. Si espera 10 años antes de
              empezar y mantiene el plan durante 20 años, llega a unos 104.000 €, habiendo
              aportado 48.000 €. La diferencia no está en el esfuerzo: está en el tiempo que
              el dinero lleva trabajando.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Por eso la filosofía Boglehead insiste tanto en empezar pronto, aportar de
              forma consistente y no interrumpir el proceso. Los errores más caros no son
              elegir el fondo equivocado: son dejar de aportar en una caída del mercado o
              retrasar el inicio varios años esperando el momento perfecto.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Qué rentabilidad anual es realista en 2026
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Para una cartera de renta variable global (MSCI World, S&P 500), la rentabilidad
              histórica a largo plazo ha sido de entre el 7% y el 10% anual nominal. Descontando
              una inflación media del 2–3%, la rentabilidad real se sitúa entre el 5% y el 7%.
              Para una cartera mixta con renta fija, el rendimiento esperado es algo menor.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Usa estas cifras como escenarios, no como promesas. Para saber qué ETFs concretos
              dan esa exposición y a qué coste para un inversor en España, consulta los{' '}
              <Link
                href="/etfs/msci-world"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                ETFs de MSCI World
              </Link>{' '}
              o los de{' '}
              <Link
                href="/etfs/sp500"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                S&P 500
              </Link>{' '}
              disponibles en España.
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

          {/* CTAs */}
          <section className="rounded-xl border border-accent/30 bg-accent-dim p-6">
            <h2 className="text-lg font-bold text-fg mb-2">
              ¿Quieres ver cómo aguanta tu plan ante la volatilidad real?
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4">
              Esta calculadora usa una rentabilidad constante. La calculadora FIRE con Monte
              Carlo simula 1.000 escenarios con rentabilidades variables y te da la probabilidad
              real de que tu cartera sobreviva a toda la jubilación.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/calculadora/fire-monte-carlo"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Calculadora FIRE Monte Carlo
              </Link>
              <Link
                href="/calculadora/roboadvisor-vs-diy"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:bg-surface-3 transition-colors"
              >
                Comparar costes roboadvisor vs DIY
              </Link>
            </div>
          </section>

          <p className="text-xs text-fg-subtle leading-relaxed border-t border-border pt-6">
            Información educativa, no asesoramiento financiero. La calculadora usa una
            rentabilidad anual constante como simplificación. Las rentabilidades históricas
            no garantizan rentabilidades futuras. Para una planificación personalizada,
            consulta con un asesor financiero o fiscal.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
