import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { BrokerComparator } from './BrokerComparator'

const BASE_URL = 'https://boglehub.com'

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '¿Cuál es el mejor bróker para invertir en ETF o fondos indexados desde España?',
    a: 'No hay un único "mejor bróker", depende de cómo inviertas. Si prefieres fondos indexados y quieres aprovechar el régimen de traspasos sin tributar, lo más práctico es un bróker español como MyInvestor. Si vas a invertir en ETFs con aportaciones mensuales, Trade Republic, Scalable Capital o XTB ofrecen comisiones muy bajas. Si la cartera es grande o quieres acceso a mercados internacionales, Interactive Brokers gana en costes. La calculadora de arriba te ordena los brókers según tu patrón concreto.',
  },
  {
    q: '¿Es mejor un bróker español o uno extranjero?',
    a: 'Un bróker español simplifica la declaración de la renta y suele ofrecer fondos indexados con régimen de traspaso, que es una ventaja fiscal real. Un bróker extranjero suele tener comisiones más bajas, catálogo más amplio y mejor app, pero la declaración requiere algún trámite extra (modelo D-6 si el patrimonio en el extranjero supera ciertos umbrales, y el cálculo manual de plusvalías al vender). Para la mayoría de inversores particulares, MyInvestor cubre el caso típico con menos fricción.',
  },
  {
    q: '¿Qué bróker es el más barato para hacer DCA mensual?',
    a: 'Para una aportación mensual a uno o dos ETFs, Trade Republic (1 € por operación, planes de ahorro gratis) y Scalable Capital (plan FREE 0,99 €) son muy competitivos. MyInvestor es 0 € si el ETF está en su catálogo. XTB también es 0 € hasta 100.000 € de volumen mensual. Si vas a hacer 10 o más operaciones al mes, el plan PRIME de Scalable (4,99 €/mes con operaciones gratis) sale a cuenta.',
  },
  {
    q: '¿Qué pasa con la fiscalidad si uso un bróker extranjero?',
    a: 'La fiscalidad de la ganancia es la misma, tributa en el IRPF del ahorro español. Lo que cambia es la operativa: el bróker extranjero no aplica retención del 19% al vender ETFs (el español sí en fondos), y tienes que calcular tú las plusvalías al hacer la declaración. Si el valor del patrimonio depositado fuera de España supera 50.000 € a 31 de diciembre, hay que presentar el modelo D-6 en el Banco de España y, en su caso, el modelo 720.',
  },
  {
    q: '¿Las comisiones de esta calculadora son exactas?',
    a: 'Son aproximaciones para 2026. Los brókers cambian sus tarifas con frecuencia y muchas tienen letra pequeña (tasas de conexión por mercado, mínimos por operación, conversión de divisas, costes del proveedor de datos). La calculadora sirve para tener una idea del orden de magnitud y comparar entre brókers, no para predecir al céntimo lo que vas a pagar. Antes de abrir cuenta, verifica las comisiones en la web del bróker.',
  },
]

export const metadata: Metadata = {
  title: 'Comparador de brókers para ETF y fondos indexados 2026',
  description:
    'Compara DEGIRO, Trade Republic, MyInvestor, Scalable Capital, Interactive Brokers y XTB. Coste anual según tu patrón de inversión, en euros y en español.',
  openGraph: {
    title: 'Comparador de brókers: cuánto te cuesta cada uno | BogleHub',
    description:
      'Compara las comisiones reales de los brókers más usados en España con tu propio escenario.',
    locale: 'es_ES',
    images: [
      '/api/og?title=Comparador%20de%20br%C3%B3kers&subtitle=Cu%C3%A1nto%20te%20cuesta%20cada%20uno',
    ],
  },
  alternates: { canonical: '/calculadora/comparar-brokers' },
}

export default function CompararBrokersPage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Calculadoras', url: `${BASE_URL}/calculadora` },
            {
              name: 'Comparador de brókers',
              url: `${BASE_URL}/calculadora/comparar-brokers`,
            },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'HowTo',
          name: 'Cómo comparar el coste anual de los brókers de ETFs en España',
          description:
            'Calcula cuánto te cuesta al año Trade Republic, DEGIRO, MyInvestor, IBKR, Scalable o XTB según tu patrón de inversión.',
          url: `${BASE_URL}/calculadora/comparar-brokers`,
          totalTime: 'PT3M',
          estimatedCost: { currency: 'EUR', value: 0 },
          steps: [
            {
              name: 'Indica cuánto inviertes al mes',
              text: 'Escribe el importe habitual de cada orden de compra de ETFs. Esto determina el impacto de las comisiones fijas.',
              url: `${BASE_URL}/calculadora/comparar-brokers`,
            },
            {
              name: 'Indica la frecuencia de tus operaciones',
              text: 'Cuántas órdenes de compra haces al mes. Más frecuencia = más comisiones para los brókers que cobran por operación.',
              url: `${BASE_URL}/calculadora/comparar-brokers`,
            },
            {
              name: 'Introduce el valor de tu cartera',
              text: 'El total ya invertido. Algunos brókers cobran comisión de custodia anual sobre el patrimonio.',
              url: `${BASE_URL}/calculadora/comparar-brokers`,
            },
            {
              name: 'Compara el coste anual en euros',
              text: 'La calculadora muestra el coste total al año de cada bróker: comisiones de compra, custodia y cambio de divisa. Elige el más barato para tu patrón real.',
              url: `${BASE_URL}/calculadora/comparar-brokers`,
            },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-8">
          <header className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Comparador de brókers para ETF y fondos indexados
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              MyInvestor, Trade Republic, DEGIRO, Scalable Capital, Interactive Brokers y
              XTB. Mete tu patrón de inversión y verás, en euros, cuánto te cuesta cada uno
              al año y a lo largo del horizonte que elijas. Los costes acumulados sí mueven
              la aguja a largo plazo.
            </p>
          </header>
        </div>

        <BrokerComparator />

        {/* Contenido educativo */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 space-y-12">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Cómo elegir bróker si inviertes en indexados
            </h2>
            <p className="text-fg-muted leading-relaxed">
              La regla básica para una cartera indexada a largo plazo es que el bróker no
              debería ser el protagonista de tu decisión. Si los costes son bajos y razonables,
              el bróker es un proveedor más. Lo que invertirás (los índices), cómo aportas
              (regularidad) y la fiscalidad pesan mucho más en el resultado final.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Dicho eso, hay tres cosas que sí merecen atención al comparar: comisiones por
              operación, costes anuales fijos y qué instrumentos puedes comprar. Un bróker sin
              comisiones por operación, sin custodia anual y con planes de ahorro gratuitos
              gana casi siempre a uno tradicional para una cartera indexada.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Bróker español vs bróker extranjero
            </h2>
            <p className="text-fg-muted leading-relaxed">
              La gran diferencia no son las comisiones, es la fiscalidad. En España, los
              fondos de inversión permiten traspasar dinero entre fondos sin tributar:
              cambias de estrategia o de gestora y Hacienda no se entera hasta que vendas de
              verdad. Esto solo lo ofrecen los brókers regulados en España, normalmente
              porque distribuyen fondos UCITS bajo régimen nacional. MyInvestor es el caso
              típico.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Los brókers extranjeros (Trade Republic, DEGIRO, Scalable, IBKR, XTB) no
              ofrecen ese régimen, así que cada vez que vendes un ETF para comprar otro
              tributas por la ganancia. Su contrapartida es el coste, casi siempre más bajo,
              y un catálogo de ETFs mucho mayor. Si vas a comprar y mantener un ETF durante
              décadas, los traspasos no son tan relevantes y el ahorro en comisiones puede
              compensar de sobra. Si crees que vas a rebalancear o cambiar de estrategia
              varias veces, el régimen de traspaso pesa.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              También cambia la operativa fiscal. Un bróker español aplica retención del 19%
              al reembolsar un fondo. Un bróker extranjero no retiene al vender ETF: el
              cálculo de la ganancia y el pago al Tesoro lo haces tú en la declaración. Si
              tu patrimonio fuera de España supera ciertos umbrales, hay que presentar el
              modelo D-6 en el Banco de España y, en su caso, el modelo 720. No es complicado,
              pero hay que tenerlo en cuenta.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Si quieres bajar al detalle, lo desarrollamos en la{' '}
              <Link
                href="/blog/fiscalidad-etfs-espana-guia-completa"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                guía de fiscalidad de ETFs en España
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Lo que importa más allá de la comisión
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Un bróker no es solo una factura mensual. Cuando lleves años con él, vas a
              valorar otras cosas que esta calculadora no captura. Estas son las que más
              suelen pesar en la práctica:
            </p>
            <ul className="mt-3 space-y-2 text-fg-muted leading-relaxed">
              <li>
                <strong className="text-fg">Catálogo de instrumentos.</strong> Si quieres un
                ETF concreto y el bróker no lo tiene, no hay precio que compense.
              </li>
              <li>
                <strong className="text-fg">Planes de ahorro periódicos.</strong> Para hacer
                DCA mensual de verdad, que el bróker te deje programarlo gratis es decisivo.
              </li>
              <li>
                <strong className="text-fg">Conversión de divisas.</strong> Si compras ETFs
                en USD, una mala conversión puede costar más que las comisiones.
              </li>
              <li>
                <strong className="text-fg">Solidez y regulación.</strong> Mira el regulador
                del bróker (CNMV, BaFin, AFM) y el sistema de garantía de inversiones que le
                aplica.
              </li>
              <li>
                <strong className="text-fg">Reporting fiscal.</strong> Algunos brókers
                generan informes fiscales para España, otros te dejan con un CSV crudo.
              </li>
            </ul>
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

          {/* CTA */}
          <section className="rounded-xl border border-accent/30 bg-accent-dim p-6">
            <h2 className="text-lg font-bold text-fg mb-2">
              Antes de elegir bróker, mira si tu cartera tiene sentido
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4">
              Cambiar de bróker no arregla una cartera mal diversificada o cargada de
              comisiones. El analizador revisa lo que ya tienes y te dice si está bien
              montada y dónde mejorar. Gratis, sin registro, los datos no salen del navegador.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/analyzer"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Analizar mi cartera
              </Link>
              <Link
                href="/calculadora/roboadvisor-vs-diy"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:bg-surface-3 transition-colors"
              >
                Roboadvisor vs DIY
              </Link>
            </div>
          </section>

          <p className="text-xs text-fg-subtle leading-relaxed border-t border-border pt-6">
            Información educativa, no asesoramiento financiero ni recomendación de ningún
            bróker. Las comisiones son aproximaciones para 2026 y pueden cambiar sin previo
            aviso. Antes de abrir una cuenta, verifica siempre las tarifas en la web oficial
            del bróker. BogleHub no cobra ni cobrará comisiones por dirigirte a uno u otro
            bróker.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
