import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { MonteCarloCalculator } from './MonteCarloCalculator'

const BASE_URL = 'https://boglehub.com'

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '¿Qué probabilidad de éxito es suficiente para el FIRE?',
    a: 'No hay una respuesta universal. Los estudios de planificación de la jubilación, como el Trinity Study, suelen usar el 95% como referencia para una retirada que se considera segura. Pero un 90% sigue siendo razonable si tienes flexibilidad para ajustar gastos en años malos o si cuentas con una pensión pública que cubra parte del gasto. Por debajo del 80%, el plan tiene un margen estrecho y conviene revisar la tasa de retirada o el capital objetivo.',
  },
  {
    q: '¿Es la regla del 4% válida en España?',
    a: 'La regla del 4% proviene de estudios con datos de la bolsa estadounidense y una cartera 50/50 entre acciones y bonos americanos a 30 años. Para un inversor en España, con exposición a la inflación en euros, pensión pública de referencia y horizonte de 40+ años, muchos planificadores trabajan con una tasa del 3–3,5%. La calculadora te permite probar distintas tasas para ver el efecto en la probabilidad de éxito.',
  },
  {
    q: '¿Cómo afecta la pensión pública al cálculo FIRE?',
    a: 'La pensión pública actúa como un ingreso garantizado que reduce la cantidad que tienes que retirar de tu cartera. Si gastas 2.000 € al mes y tu pensión estimada es de 800 €, solo necesitas cubrir 1.200 € de tu cartera. Eso baja radicalmente el capital objetivo y sube la probabilidad de éxito. Incluye la pensión como ingreso adicional a partir de la edad prevista de cobro.',
  },
  {
    q: '¿Qué significa que la simulación usa 1.000 escenarios?',
    a: 'La simulación genera 1.000 series de rentabilidades anuales aleatorias con la misma media y volatilidad histórica del mercado. Para cada serie comprueba si la cartera sobrevive hasta el final del horizonte de retirada. La probabilidad de éxito es el porcentaje de escenarios en los que la cartera llega a cero o más al final del período. Así capturas tanto los mejores ciclos históricos como los peores.',
  },
  {
    q: '¿Cuánto capital necesito para el FIRE en España?',
    a: 'Con la regla del 4%, el capital necesario es el gasto anual multiplicado por 25. Si gastas 20.000 € al año, necesitas 500.000 € de cartera. Con una tasa del 3,5%, la cifra sube a 571.000 €. Si cuentas con pensión pública que cubra parte del gasto, el capital necesario baja proporcionalmente. La calculadora te permite ver el efecto de cada variable de forma individual.',
  },
]

export const metadata: Metadata = {
  title: 'Calculadora FIRE Monte Carlo: probabilidad de jubilación anticipada',
  description:
    'Simula 1.000 escenarios de mercado para tu plan FIRE. Calcula la probabilidad de que tu cartera aguante toda la jubilación con datos históricos de volatilidad del MSCI World. Gratis, en español.',
  openGraph: {
    title: 'Calculadora FIRE Monte Carlo | BogleHub',
    description:
      'Simula 1.000 escenarios de mercado para saber si tu plan de independencia financiera aguanta la volatilidad real.',
    locale: 'es_ES',
    images: [
      `/api/og?title=${encodeURIComponent('Calculadora FIRE Monte Carlo')}&subtitle=${encodeURIComponent('Simula 1.000 escenarios de mercado')}`,
    ],
  },
  alternates: { canonical: '/calculadora/fire-monte-carlo' },
}

export default function MonteCarloPage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Calculadoras', url: `${BASE_URL}/calculadora` },
            { name: 'FIRE Monte Carlo', url: `${BASE_URL}/calculadora/fire-monte-carlo` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'SoftwareApplication',
          name: 'Calculadora FIRE con simulación Monte Carlo',
          description:
            'Calculadora gratuita en español que simula 1.000 escenarios de mercado para tu plan de independencia financiera. Calcula la probabilidad de que tu cartera sobreviva a la jubilación con datos históricos de volatilidad del MSCI World.',
          url: `${BASE_URL}/calculadora/fire-monte-carlo`,
          applicationCategory: 'FinanceApplication',
        }}
      />
      <JsonLd
        schema={{
          type: 'HowTo',
          name: 'Cómo calcular cuándo puedes jubilarte con simulación Monte Carlo',
          description:
            'Calcula la probabilidad de alcanzar la independencia financiera con la calculadora FIRE de BogleHub: simula 1.000 escenarios de mercado y obtén tu tasa de éxito.',
          url: `${BASE_URL}/calculadora/fire-monte-carlo`,
          totalTime: 'PT5M',
          estimatedCost: { currency: 'EUR', value: 0 },
          steps: [
            {
              name: 'Introduce tu cartera actual',
              text: 'Escribe el valor actual de tu cartera de inversión en euros. Es el punto de partida de la simulación.',
              url: `${BASE_URL}/calculadora/fire-monte-carlo`,
            },
            {
              name: 'Indica tu aportación mensual',
              text: 'Cuánto añades a tu cartera cada mes. La calculadora proyecta la fase de acumulación hasta alcanzar tu objetivo.',
              url: `${BASE_URL}/calculadora/fire-monte-carlo`,
            },
            {
              name: 'Define tu gasto anual en la jubilación',
              text: 'Cuánto necesitas gastar al año para vivir sin trabajar. La regla del 4% sugiere que tu cartera objetivo es 25 veces ese importe.',
              url: `${BASE_URL}/calculadora/fire-monte-carlo`,
            },
            {
              name: 'Ajusta los parámetros de mercado',
              text: 'La calculadora usa por defecto 7% de rentabilidad esperada y 15% de desviación típica (volatilidad histórica del MSCI World). Puedes ajustarlos.',
              url: `${BASE_URL}/calculadora/fire-monte-carlo`,
            },
            {
              name: 'Interpreta la tasa de éxito',
              text: 'El resultado muestra el porcentaje de los 1.000 escenarios en que tu cartera sobrevive hasta el final. Una tasa de éxito del 90-95% suele considerarse robusta.',
              url: `${BASE_URL}/calculadora/fire-monte-carlo`,
            },
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
            <span className="text-fg">FIRE Monte Carlo</span>
          </nav>
          <header className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Calculadora FIRE con simulación Monte Carlo
            </h1>
            <p className="mt-2 text-fg-muted leading-relaxed">
              Simula 1.000 escenarios de mercado para tu plan de independencia financiera.
              Descubre la probabilidad real de que tu cartera sobreviva a toda tu jubilación,
              considerando la volatilidad real de los mercados. Basado en datos históricos del
              MSCI World. Sin registro y sin que tus datos salgan del navegador.
            </p>
          </header>
        </div>

        <MonteCarloCalculator />

        {/* Contenido educativo */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 space-y-12">

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Por qué Monte Carlo y no la regla del 4%
            </h2>
            <p className="text-fg-muted leading-relaxed">
              La regla del 4% dice que puedes retirar ese porcentaje de tu cartera cada año
              ajustado por inflación y, históricamente, la cartera ha aguantado al menos 30
              años. Es un atajo útil, pero tiene un límite: asume un comportamiento promedio del
              mercado y no captura el efecto de la secuencia de rentabilidades.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Una caída fuerte en los primeros años de la retirada puede destruir un plan que en
              papel era sólido, aunque el promedio histórico de retornos fuera correcto. La
              simulación de Monte Carlo resuelve esto: genera 1.000 secuencias de rentabilidades
              diferentes —algunas excelentes, algunas catastróficas— y comprueba en cuántas de
              ellas tu cartera llega al final sin agotarse.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Cómo interpretar la probabilidad de éxito
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Un 95% de probabilidad de éxito no significa que haya un 5% de posibilidades de
              quedarte sin nada. Significa que en 50 de los 1.000 escenarios simulados la
              cartera se agota antes del final del período. En la práctica, un inversor que llega
              a ese escenario tiene opciones: reducir gastos, volver a trabajar temporalmente,
              anticipar el cobro de la pensión pública o ajustar la tasa de retirada.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Por eso muchos planificadores no buscan un 100%: buscan un margen cómodo del
              90–95% y mantienen flexibilidad en el gasto. Un plan FIRE rígido que depende de
              un escenario exacto es más frágil que uno con palancas de ajuste. Más detalles
              en la{' '}
              <Link
                href="/blog/fire-espana-cuanto-necesitas"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                guía FIRE en España: cuánto necesitas para retirarte
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              La pensión pública como colchón en el plan FIRE
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Para un inversor en España, la pensión pública es una variable que puede cambiar
              radicalmente el cálculo. Si logras la independencia financiera a los 45 y esperas
              cobrar una pensión de 1.000 € al mes a los 65, esos 20 años de "agujero" son los
              críticos: la cartera solo tiene que aguantar hasta que empiece la pensión, y a
              partir de ahí la presión sobre la cartera baja considerablemente.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Incluye esa pensión estimada en la calculadora como ingreso adicional a partir de
              la fecha prevista. El efecto sobre la probabilidad de éxito suele ser muy notable.
              Para acumular ese capital con los ETFs de menor coste disponibles en España, mira
              los{' '}
              <Link
                href="/etfs/acumulacion"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                ETFs de acumulación para inversores españoles
              </Link>.
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
              Construye la cartera para llegar al FIRE
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4">
              Ver la probabilidad de éxito es el primer paso. El siguiente es acumular ese
              capital con la cartera más eficiente posible: saber qué aportar cada mes, a qué
              coste y cómo analizar lo que ya tienes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/calculadora/interes-compuesto"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Calculadora interés compuesto
              </Link>
              <Link
                href="/analyzer"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:bg-surface-3 transition-colors"
              >
                Analizar mi cartera
              </Link>
              <Link
                href="/etfs/acumulacion"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:bg-surface-3 transition-colors"
              >
                ETFs de acumulación
              </Link>
            </div>
          </section>

          <p className="text-xs text-fg-subtle leading-relaxed border-t border-border pt-6">
            Información educativa, no asesoramiento financiero. La simulación Monte Carlo usa
            parámetros históricos de rentabilidad y volatilidad del mercado global y no
            garantiza resultados futuros. La regla del 4% y las tasas de retirada son
            referencias históricas, no certezas. Para tu planificación de jubilación concreta,
            consulta con un asesor financiero o de pensiones.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
