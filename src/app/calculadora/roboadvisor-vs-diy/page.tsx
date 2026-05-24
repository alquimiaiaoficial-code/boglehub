import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { RoboadvisorComparator } from './RoboadvisorComparator'

const BASE_URL = 'https://boglehub.com'

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '¿Merece la pena un roboadvisor o es mejor hacerlo yo?',
    a: 'Depende de ti, no de las matemáticas. Una cartera DIY de fondos indexados casi siempre es más barata, y ese ahorro se acumula con los años. Pero un roboadvisor rebalancea solo, automatiza las aportaciones y te quita la cartera de las manos cuando el mercado cae. Si eso evita que vendas en pánico o que dejes de aportar, la comisión sale rentable. Si tienes la disciplina para hacerlo tú, te quedas con la diferencia.',
  },
  {
    q: '¿Cuánto cuesta de verdad un roboadvisor como Indexa Capital?',
    a: 'El coste total suma tres partes: la comisión de gestión del roboadvisor, la comisión de custodia del banco depositario y el TER de los fondos en los que invierte. En conjunto suele moverse entre el 0,5% y el 0,7% anual para cuentas pequeñas, y baja por tramos a medida que crece el patrimonio. Verifica siempre la cifra actual en la web de cada entidad.',
  },
  {
    q: '¿Es más barato montar una cartera de fondos o ETF indexados por mi cuenta?',
    a: 'Sí. Una cartera DIY puede tener un coste total del 0,1% al 0,2% anual: el TER de un fondo indexado global ronda el 0,07% al 0,20% y muchos brókers no cobran custodia. La contrapartida es que el rebalanceo y la disciplina corren de tu cuenta.',
  },
  {
    q: '¿Qué hace un roboadvisor que no pueda hacer yo mismo?',
    a: 'Nada imposible, pero sí cosas que mucha gente acaba sin hacer: rebalancear la cartera cuando se desvía, mantener el plan de aportaciones sin saltárselo y no tocar nada en una caída. El roboadvisor convierte todo eso en automático. Pagas por un sistema que no depende de tu fuerza de voluntad.',
  },
  {
    q: '¿Esta calculadora es asesoramiento financiero?',
    a: 'No. Es una herramienta educativa que proyecta un escenario con los datos que tú introduces. Las rentabilidades son una hipótesis, no una previsión, y los costes son orientativos. No tiene en cuenta tu situación personal ni fiscal. Para decisiones concretas, consulta con un profesional.',
  },
]

export const metadata: Metadata = {
  title: 'Roboadvisor vs cartera DIY: calcula el coste real',
  description:
    'Calcula cuánto te cuesta de verdad un roboadvisor como Indexa Capital frente a gestionar tú una cartera de fondos o ETF indexados. Comparador gratis en español.',
  openGraph: {
    title: 'Roboadvisor vs cartera DIY: el coste real | BogleHub',
    description:
      'Cuánto pagas de más por la comodidad de un roboadvisor frente a una cartera indexada gestionada por ti.',
    locale: 'es_ES',
    images: [
      '/api/og?title=Roboadvisor%20vs%20cartera%20DIY&subtitle=Calcula%20el%20coste%20real',
    ],
  },
  alternates: { canonical: '/calculadora/roboadvisor-vs-diy' },
}

export default function RoboadvisorVsDiyPage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Calculadoras', url: `${BASE_URL}/calculadora` },
            { name: 'Roboadvisor vs cartera DIY', url: `${BASE_URL}/calculadora/roboadvisor-vs-diy` },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-8">
          <header className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Roboadvisor vs cartera DIY: ¿cuánto cuesta de verdad?
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Un roboadvisor y una cartera que gestionas tú pueden invertir exactamente en
              los mismos índices. Lo que cambia es la comisión. Esta calculadora aísla esa
              diferencia y te enseña, en euros, lo que cuesta delegar la gestión a lo largo
              de los años.
            </p>
          </header>
        </div>

        <RoboadvisorComparator />

        {/* Contenido educativo */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 space-y-12">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Qué compara esta calculadora
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Las dos carteras del simulador invierten en lo mismo: índices globales
              diversificados. Parten del mismo capital, reciben las mismas aportaciones y
              obtienen la misma rentabilidad bruta. Lo único que cambia es el coste anual que
              se llevan por el camino. Por eso el resultado no dice que un roboadvisor
              invierta peor. Dice exactamente cuánto te cuesta su comisión cuando la sumas
              año tras año.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Por qué medio punto de comisión pesa tanto
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Un 0,6% frente a un 0,15% parece una diferencia mínima, y lo es el primer año.
              El problema es que esa comisión se cobra cada año, sobre un saldo que no para
              de crecer, y que el dinero que pagas en comisiones también dejaría de generar
              rentabilidad. Es{' '}
              <Link
                href="/blog/interes-compuesto-inversion"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                interés compuesto
              </Link>{' '}
              trabajando en tu contra. A 25 o 30 años, esa diferencia pequeña se convierte en
              una porción muy visible de tu cartera final.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              La comisión, además, es lo único seguro de toda la ecuación. La rentabilidad
              del mercado es una hipótesis. El coste es un hecho: lo pagas haya subido o
              bajado la bolsa.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-4">
              Lo que haces tú y lo que hace el roboadvisor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold text-accent mb-2">Cartera DIY</h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  Eliges los fondos o ETF. Rebalanceas tú cuando la cartera se desvía.
                  Mantienes el plan de aportaciones. Decides cuándo y cómo vender. A cambio
                  del esfuerzo, el coste es mínimo.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold text-warn mb-2">Con roboadvisor</h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  Asigna la cartera según tu perfil de riesgo. Rebalancea de forma
                  automática. Cobra las aportaciones periódicas sin que intervengas. Te
                  mantiene alejado de la cartera en los días malos. A cambio, una comisión.
                </p>
              </div>
            </div>
            <p className="mt-4 text-fg-muted leading-relaxed">
              Ninguna de las dos columnas es la correcta. Son dos formas de hacer lo mismo
              con un reparto distinto de esfuerzo y de coste.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Cómo decidir con el resultado en la mano
            </h2>
            <p className="text-fg-muted leading-relaxed">
              El número que te da la calculadora es el precio de la comodidad y de la
              disciplina externa. Si te conoces y sabes que mirarías la cartera cada día, que
              venderías en la primera caída fuerte o que te olvidarías de{' '}
              <Link
                href="/blog/como-rebalancear-cartera-indexada"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                rebalancear
              </Link>
              , pagar a un roboadvisor puede ser el seguro más barato contra tus propios
              errores. La peor cartera no es la más cara: es la que abandonas a medio camino.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Si en cambio tienes el temperamento para montar una cartera indexada sencilla y
              no tocarla pase lo que pase, el DIY te deja la diferencia en el bolsillo. No hay
              respuesta universal, la hay para ti.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Un matiz fiscal para España: tanto los roboadvisors como una cartera DIY hecha
              con fondos indexados permiten traspasar dinero entre fondos sin tributar por las
              plusvalías. Esa ventaja no la tienen los ETF, que sí tributan al vender. Tenlo
              en cuenta cuando pongas en la balanza el coste y la fiscalidad. Si quieres
              profundizar, lo explicamos en la guía sobre{' '}
              <Link
                href="/blog/roboadvisors-espana-merecen-comision"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                si los roboadvisors merecen su comisión
              </Link>
              .
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
              ¿Ya tienes una cartera? Analízala gratis
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4">
              Sube tu cartera al analizador y la IA te dice si está bien diversificada, qué
              comisiones estás pagando de verdad y dónde se solapan tus fondos. Sin registro y
              sin que tus datos salgan del navegador.
            </p>
            <Link
              href="/analyzer"
              className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
            >
              Analizar mi cartera
            </Link>
          </section>

          <p className="text-xs text-fg-subtle leading-relaxed border-t border-border pt-6">
            Esta herramienta es educativa y no constituye asesoramiento financiero ni
            recomendación de ningún producto ni entidad. Las rentabilidades son hipotéticas y
            los costes, orientativos: verifica siempre las comisiones actuales en la web de
            cada roboadvisor o gestora. Rentabilidades pasadas no garantizan rentabilidades
            futuras.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
