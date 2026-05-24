import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { IRPF_SAVINGS_BRACKETS } from '@/lib/fiscal'
import { formatEUR, formatPct } from '@/lib/utils'
import { IrpfCalculator } from './IrpfCalculator'

const BASE_URL = 'https://boglehub.com'

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '¿Cuánto se paga a Hacienda por vender fondos indexados o ETF?',
    a: 'Tributas solo por la ganancia, que es la diferencia entre el valor de venta y el de compra, no por todo el dinero que recibes. Esa ganancia entra en la base del ahorro del IRPF, con una escala progresiva que en 2026 va del 19% para los primeros 6.000 € hasta el 28% a partir de 300.000 €. La mayoría de las ventas de un inversor particular se quedan en el primer o segundo tramo, 19% y 21%.',
  },
  {
    q: '¿Cuándo se paga este impuesto?',
    a: 'En la declaración de la renta del año siguiente al de la venta. Si vendes participaciones de un fondo de inversión, la gestora aplica además una retención del 19% sobre la ganancia en el momento del reembolso: es un anticipo que luego se ajusta en la declaración. Al vender un ETF en el mercado no suele haber esa retención, pero la ganancia se declara igual.',
  },
  {
    q: '¿Tributa un traspaso entre fondos indexados?',
    a: 'No. Mover dinero de un fondo de inversión a otro mediante un traspaso no genera ganancia fiscal: el IRPF se difiere hasta que vendas de verdad y saques el dinero a tu cuenta. Esta ventaja es exclusiva de los fondos de inversión. Los ETF no tienen régimen de traspaso, así que cada venta de un ETF tributa por la ganancia.',
  },
  {
    q: '¿Puedo restar las pérdidas de las ganancias?',
    a: 'Sí. Las pérdidas patrimoniales compensan las ganancias del mismo año. Si después de compensar aún te queda saldo negativo, puedes arrastrarlo a los 4 ejercicios siguientes. Ten en cuenta la regla de los dos meses: si vendes con pérdidas y recompras el mismo valor cotizado dentro de los dos meses, no podrás computar esa pérdida.',
  },
  {
    q: '¿Esta calculadora sirve para hacer la declaración de la renta?',
    a: 'No. Es una herramienta educativa y orientativa. Calcula un escenario simplificado y no sustituye al borrador de la renta ni al criterio de un asesor fiscal. No tiene en cuenta comisiones, el orden FIFO entre varias compras ni la normativa foral de País Vasco y Navarra. Para tu caso concreto, consulta con un profesional.',
  },
]

export const metadata: Metadata = {
  title: 'Calculadora de IRPF por venta de fondos y ETF 2026',
  description:
    'Calcula cuánto pagas de IRPF al vender fondos indexados o ETF en España. Tramos del ahorro 2026, desglose por tramos y compensación de pérdidas.',
  openGraph: {
    title: 'Calculadora de IRPF por venta de fondos y ETF | BogleHub',
    description:
      'Cuánto te lleva Hacienda al vender fondos indexados, ETF o acciones, con el desglose por tramos del IRPF del ahorro.',
    locale: 'es_ES',
    images: [
      '/api/og?title=Calculadora%20de%20IRPF&subtitle=Lo%20que%20pagas%20al%20vender%20fondos%20y%20ETF',
    ],
  },
  alternates: { canonical: '/calculadora/irpf-venta-fondos' },
}

export default function IrpfVentaFondosPage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Calculadoras', url: `${BASE_URL}/calculadora` },
            { name: 'Calculadora de IRPF venta de fondos', url: `${BASE_URL}/calculadora/irpf-venta-fondos` },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-8">
          <header className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Calculadora de IRPF por la venta de fondos y ETF
            </h1>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Cuando vendes fondos indexados, ETF o acciones con beneficio, Hacienda se lleva
              una parte. Esta calculadora te dice cuánto: introduce lo que pagaste y lo que
              recibes, y verás el impuesto, el desglose por tramos y lo que te queda limpio.
            </p>
          </header>
        </div>

        <IrpfCalculator />

        {/* Contenido educativo */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 space-y-12">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Cómo tributa la venta de fondos y ETF en España
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Al vender no tributas por todo el dinero que recibes, solo por la ganancia: la
              diferencia entre el valor de venta y el valor de compra. Esa ganancia es una
              ganancia patrimonial y se integra en la base del ahorro del IRPF, junto con los
              dividendos y los intereses que hayas cobrado en el año.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              La base del ahorro tributa con una escala progresiva. Progresiva quiere decir
              que cada tramo grava solo la parte de la ganancia que cae dentro de él, no toda
              la ganancia al tipo más alto. Si ganas 10.000 €, los primeros 6.000 € pagan al
              19% y los 4.000 € restantes al 21%, no los 10.000 € al 21%.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-4">
              Tramos del IRPF del ahorro en 2026
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-fg-muted text-xs uppercase tracking-wide">
                    <th className="p-3">Base del ahorro</th>
                    <th className="p-3 text-right">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {IRPF_SAVINGS_BRACKETS.map((b) => (
                    <tr key={b.from} className="border-b border-border/50 last:border-0">
                      <td className="p-3 text-fg-muted">
                        {b.from === 0 && b.to != null
                          ? `Hasta ${formatEUR(b.to)}`
                          : b.to == null
                            ? `Más de ${formatEUR(b.from)}`
                            : `${formatEUR(b.from)} – ${formatEUR(b.to)}`}
                      </td>
                      <td className="p-3 text-right font-mono font-semibold text-fg">
                        {formatPct(b.rate, 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-fg-subtle leading-relaxed">
              Escala estatal. País Vasco y Navarra tienen normativa foral propia con tipos
              distintos.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Traspaso o venta: no es lo mismo
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Aquí está una de las grandes ventajas de los fondos de inversión en España.
              Mover el dinero de un fondo a otro mediante un traspaso no tributa: el impuesto
              se difiere hasta que de verdad vendas y saques el dinero. Puedes cambiar de
              estrategia, de gestora o rebalancear entre fondos sin pasar por Hacienda por el
              camino.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Los ETF no tienen ese régimen. Cada vez que vendes un ETF, aunque sea para
              comprar otro, realizas la ganancia y tributas. Esta calculadora calcula
              precisamente eso: una venta que realiza el beneficio. Si lo que haces es un
              traspaso entre fondos, no hay nada que declarar todavía. Lo desarrollamos en la{' '}
              <Link
                href="/blog/fiscalidad-etfs-espana-guia-completa"
                className="text-brand-400 hover:text-brand-500 underline underline-offset-2"
              >
                guía de fiscalidad de ETF en España
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              Compensar pérdidas con ganancias
            </h2>
            <p className="text-fg-muted leading-relaxed">
              No todas las ventas salen con beneficio. Cuando vendes con pérdidas generas una
              minusvalía, y esa minusvalía resta. Las pérdidas patrimoniales compensan las
              ganancias del mismo ejercicio, y si aún sobra saldo negativo se arrastra a los
              cuatro años siguientes. Por eso la calculadora tiene un campo para las pérdidas
              pendientes: rebajan la ganancia que acaba tributando.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Hay un límite importante. La regla de los dos meses impide computar una pérdida
              si recompras el mismo valor cotizado, como un ETF o una acción, dentro de los
              dos meses anteriores o posteriores a la venta. Está pensada para evitar ventas
              meramente fiscales.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-fg mb-3">
              FIFO: se venden primero las participaciones más antiguas
            </h2>
            <p className="text-fg-muted leading-relaxed">
              Si has comprado el mismo fondo o ETF en varios momentos a precios distintos y
              luego vendes solo una parte, Hacienda aplica el criterio FIFO: se consideran
              vendidas las participaciones que compraste primero. Eso afecta al valor de
              compra que se usa para calcular la ganancia. Esta herramienta asume una compra
              y una venta, así que para varias entradas a distintos precios usa el valor de
              compra de las participaciones más antiguas.
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

          {/* CTA */}
          <section className="rounded-xl border border-accent/30 bg-accent-dim p-6">
            <h2 className="text-lg font-bold text-fg mb-2">
              Antes de vender, mira la fiscalidad de tu cartera
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4">
              El analizador revisa tus fondos y ETF y te dice qué tan eficientes son
              fiscalmente, dónde se solapan y qué comisiones pagas. Y si dudas entre delegar
              o gestionar tú la cartera, el comparador de costes te lo pone en euros.
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
                Comparador roboadvisor vs DIY
              </Link>
            </div>
          </section>

          <p className="text-xs text-fg-subtle leading-relaxed border-t border-border pt-6">
            Esta herramienta es educativa y orientativa, no constituye asesoramiento fiscal.
            Aplica la escala estatal del ahorro vigente en 2026 sobre los datos que tú
            introduces y simplifica el cálculo: no contempla comisiones de compra y venta, el
            orden FIFO entre varias adquisiciones, otras rentas ni la normativa foral de País
            Vasco y Navarra. Para tu declaración o cualquier decisión concreta, consulta con
            un asesor fiscal.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
