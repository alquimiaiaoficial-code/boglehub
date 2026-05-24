import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'

const BASE_URL = 'https://boglehub.com'

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '¿Cuánto dinero necesito para empezar a invertir en España?',
    a: 'Puedes empezar desde 1€. MyInvestor permite aportaciones a fondos indexados desde un euro, y Trade Republic permite planes de ahorro automáticos en ETFs desde 1€/mes. No hay barrera mínima real. Lo importante no es la cantidad inicial sino la regularidad de las aportaciones y el tiempo durante el que mantengas la inversión. Una aportación de 100€/mes durante 30 años a un 7% anual se convierte en aproximadamente 122.000€ gracias al interés compuesto.',
  },
  {
    q: '¿Qué broker es mejor para empezar a invertir en España?',
    a: 'Para la mayoría de inversores que empiezan, Trade Republic es la opción más sencilla: 0€ por operación, planes de ahorro automáticos desde 1€, app móvil clara y cuenta remunerada al 2-2,5%. Si quieres combinar ETFs con fondos indexados (con traspaso fiscal libre), MyInvestor es la única opción que ofrece ambos en una sola plataforma. DEGIRO es preferible para órdenes muy grandes o acceso a más bolsas internacionales.',
  },
  {
    q: '¿Es mejor un ETF, un fondo indexado o un roboadvisor para empezar?',
    a: 'Depende de tu estilo: si quieres delegar completamente la gestión y no tomar ninguna decisión, un roboadvisor como Indexa Capital es la opción más simple (a cambio de ~0,40-0,50% anual). Si valoras la fiscalidad española (traspaso libre entre fondos sin tributar), un fondo indexado en MyInvestor es lo más eficiente. Si prefieres flexibilidad y mínimo coste, un ETF como VWCE en Trade Republic. Las tres opciones son válidas — la peor opción es no empezar.',
  },
  {
    q: '¿Es seguro invertir en fondos indexados y ETFs en España?',
    a: 'Sí, con las cautelas habituales. Los fondos indexados UCITS y ETFs UCITS están regulados a nivel europeo con reglas estrictas de diversificación, transparencia y liquidez. Tu dinero se custodia separado del patrimonio del broker, por lo que en caso de quiebra del broker tus participaciones siguen siendo tuyas. Además, los principales brokers están adheridos a fondos de garantía de inversiones (100.000€ en España y Alemania, 20.000€ en Países Bajos). El riesgo real no es el broker — es la volatilidad del mercado, que puede hacer que tu cartera caiga 30-50% temporalmente.',
  },
  {
    q: '¿Cuánto debo aportar al mes para llegar a la jubilación con un buen capital?',
    a: 'Depende de tu edad y objetivo. Para llegar a 500.000€ a los 65 años con rentabilidad anual del 7%, necesitas aportar ~190€/mes si empiezas a los 25, ~420€/mes si empiezas a los 35, o ~1.000€/mes si empiezas a los 45. Para llegar a 1 millón, dobla esas cifras. El tiempo importa más que la cantidad: empezar 10 años antes equivale a duplicar la aportación mensual. Usa la calculadora de interés compuesto para tu caso concreto.',
  },
]

export const metadata: Metadata = {
  title: 'Cómo empezar a invertir en España: guía paso a paso 2026',
  description:
    'Guía completa para empezar a invertir en fondos indexados y ETFs en España en 2026: conceptos básicos, estrategia, broker, ETFs y aportaciones. Sin registro, gratis, en español.',
  openGraph: {
    title: 'Cómo empezar a invertir en España (guía 2026) | BogleHub',
    description:
      'Guía paso a paso para empezar a invertir en fondos indexados y ETFs siendo principiante en España. Aprende los conceptos, elige el broker, selecciona tus ETFs y planifica tus aportaciones.',
    locale: 'es_ES',
    images: [
      '/api/og?title=C%C3%B3mo%20empezar%20a%20invertir&subtitle=Gu%C3%ADa%20paso%20a%20paso%20Bogleheads%20Espa%C3%B1a',
    ],
  },
  alternates: { canonical: '/empezar' },
}

export default function EmpezarPage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Cómo empezar a invertir', url: `${BASE_URL}/empezar` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'HowTo',
          name: 'Cómo empezar a invertir en España (guía paso a paso)',
          description:
            'Guía completa para empezar a invertir en fondos indexados y ETFs en España en 2026 desde cero, en 6 pasos concretos.',
          url: `${BASE_URL}/empezar`,
          totalTime: 'PT1H',
          estimatedCost: { currency: 'EUR', value: '0' },
          steps: [
            {
              name: 'Aprende los conceptos básicos',
              text: 'Estudia los términos clave: ETF, fondo indexado, TER, UCITS, ISIN, acumulación vs distribución, IRPF del ahorro, asset allocation, interés compuesto y filosofía Boglehead. Dedica 1-2 horas antes de poner el primer euro.',
              url: `${BASE_URL}/empezar#paso-1`,
            },
            {
              name: 'Decide tu estrategia',
              text: 'Elige entre tres caminos: cartera DIY (tú gestionas, coste ~0,15% anual), roboadvisor (Indexa, Finizens, MyInvestor gestionan, coste ~0,40-0,50%), o plan de pensiones indexado (hasta 1.500€/año con deducción IRPF).',
              url: `${BASE_URL}/empezar#paso-2`,
            },
            {
              name: 'Elige tu broker',
              text: 'Trade Republic (0€ por operación, planes ahorro automáticos), DEGIRO (0,50€ + 0,004%, acceso amplio a bolsas) o MyInvestor (0,20€ + 0,03%, único con fondos indexados y traspaso fiscal libre).',
              url: `${BASE_URL}/empezar#paso-3`,
            },
            {
              name: 'Selecciona tus ETFs o fondos',
              text: 'Cartera mínima recomendada: 80% VWCE (Vanguard FTSE All-World, TER 0,22%, ISIN IE00B3RBWM25) + 20% AGGH (renta fija global hedged EUR, TER 0,10%). Coste total ponderado ~0,20% anual.',
              url: `${BASE_URL}/empezar#paso-4`,
            },
            {
              name: 'Planifica tus aportaciones',
              text: 'Usa la calculadora de interés compuesto para ver tu proyección. Empezar 10 años antes equivale a duplicar la aportación mensual. Configura aportaciones automáticas para no depender de tu fuerza de voluntad.',
              url: `${BASE_URL}/empezar#paso-5`,
            },
            {
              name: 'Mantén la disciplina a largo plazo',
              text: 'El mercado va a caer un 20-40% varias veces. La diferencia entre buenos y malos inversores no es predecir las caídas: es no vender durante ellas. Rebalancea una vez al año y mantén el plan.',
              url: `${BASE_URL}/empezar#paso-6`,
            },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Cómo empezar a invertir</span>
          </nav>

          {/* Hero */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Cómo empezar a invertir en España: guía paso a paso (2026)
            </h1>
            <p className="mt-4 text-fg-muted leading-relaxed max-w-3xl">
              Si nunca has invertido antes, esta guía te lleva en 6 pasos desde "no sé por dónde
              empezar" hasta tener tu primera cartera funcionando. Sin jerga innecesaria, con
              recursos prácticos y todas las opciones reales que tienes en España en 2026. Sin
              registro, sin venderte productos: información educativa pura.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#paso-1"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Empezar la guía →
              </Link>
              <Link
                href="/analyzer"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Ya tengo cartera: analizarla
              </Link>
            </div>
          </header>

          {/* Quick TOC */}
          <nav aria-label="Pasos de la guía" className="mb-10 rounded-xl border border-border bg-surface p-5">
            <h2 className="text-xs font-semibold text-fg-muted uppercase tracking-wide mb-3">
              Los 6 pasos de esta guía
            </h2>
            <ol className="space-y-2 text-sm">
              <li><a href="#paso-1" className="text-brand-400 hover:text-brand-300">1. Aprende los conceptos básicos</a></li>
              <li><a href="#paso-2" className="text-brand-400 hover:text-brand-300">2. Decide tu estrategia</a></li>
              <li><a href="#paso-3" className="text-brand-400 hover:text-brand-300">3. Elige tu broker</a></li>
              <li><a href="#paso-4" className="text-brand-400 hover:text-brand-300">4. Selecciona tus ETFs o fondos</a></li>
              <li><a href="#paso-5" className="text-brand-400 hover:text-brand-300">5. Planifica tus aportaciones</a></li>
              <li><a href="#paso-6" className="text-brand-400 hover:text-brand-300">6. Mantén la disciplina a largo plazo</a></li>
            </ol>
          </nav>

          {/* PASO 1: Conceptos */}
          <section id="paso-1" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-bold text-fg mb-3">
              Paso 1: Aprende los conceptos básicos
            </h2>
            <p className="text-fg-muted leading-relaxed mb-4">
              Antes de poner un solo euro, dedica 1-2 horas a entender qué estás comprando. No es
              opcional: invertir sin entender lo que haces es la receta para vender en el peor
              momento. Los conceptos clave para una cartera indexada son apenas una decena.
            </p>

            <Card className="mb-4">
              <CardTitle className="mb-3">Conceptos imprescindibles</CardTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: 'ETF', href: '/glosario/etf' },
                  { label: 'Fondo indexado', href: '/glosario/fondo-indexado' },
                  { label: 'TER (coste anual)', href: '/glosario/ter' },
                  { label: 'UCITS', href: '/glosario/ucits' },
                  { label: 'ISIN', href: '/glosario/isin' },
                  { label: 'Acumulación vs distribución', href: '/glosario/acumulacion-vs-distribucion' },
                  { label: 'Domicilio fiscal', href: '/glosario/domicilio-fiscal' },
                  { label: 'IRPF del ahorro', href: '/glosario/irpf-ahorro' },
                  { label: 'Interés compuesto', href: '/glosario/interes-compuesto' },
                  { label: 'Asset allocation', href: '/glosario/asset-allocation' },
                  { label: 'DCA (aportaciones periódicas)', href: '/glosario/dca' },
                  { label: 'Boglehead', href: '/glosario/boglehead' },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm text-brand-400 hover:text-brand-300 hover:underline underline-offset-2"
                  >
                    → {label}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-xs text-fg-subtle">
                ¿Quieres más? El{' '}
                <Link href="/glosario" className="text-brand-400 hover:text-brand-300 underline underline-offset-2">
                  glosario completo
                </Link>{' '}
                tiene 48 términos explicados con ejemplos.
              </p>
            </Card>

            <Card>
              <CardTitle className="mb-3">Lecturas fundamentales</CardTitle>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog/bogleheads-espana-guia-completa" className="text-brand-400 hover:text-brand-300 hover:underline">
                    → La filosofía Boglehead explicada para inversores en España
                  </Link>
                </li>
                <li>
                  <Link href="/blog/interes-compuesto-inversion" className="text-brand-400 hover:text-brand-300 hover:underline">
                    → Por qué el interés compuesto es el motor de tu cartera
                  </Link>
                </li>
                <li>
                  <Link href="/blog/que-es-el-msci-world" className="text-brand-400 hover:text-brand-300 hover:underline">
                    → Qué es el MSCI World y por qué lo cita todo el mundo
                  </Link>
                </li>
                <li>
                  <Link href="/blog/fondos-indexados-vs-etfs-espana" className="text-brand-400 hover:text-brand-300 hover:underline">
                    → Fondos indexados vs ETFs en España (la diferencia fiscal clave)
                  </Link>
                </li>
              </ul>
            </Card>
          </section>

          {/* PASO 2: Estrategia */}
          <section id="paso-2" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-bold text-fg mb-3">
              Paso 2: Decide tu estrategia
            </h2>
            <p className="text-fg-muted leading-relaxed mb-4">
              Tienes tres caminos para invertir de forma indexada en España. No hay uno objetivamente
              mejor: depende de cuánta autonomía quieres y cuánto valoras la simplicidad sobre el
              coste.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <Card className="flex flex-col">
                <CardTitle className="mb-2">Cartera DIY</CardTitle>
                <p className="text-xs text-fg-muted flex-1 leading-relaxed">
                  Tú eliges los ETFs o fondos, tú rebalanceas. Coste mínimo (~0,10-0,15% anual)
                  pero requiere disciplina propia.
                </p>
                <Link href="/blog/cartera-boglehead-3-fondos-espana" className="mt-3 text-xs text-brand-400 hover:text-brand-300">
                  → Cartera Boglehead de 3 fondos
                </Link>
              </Card>
              <Card className="flex flex-col">
                <CardTitle className="mb-2">Roboadvisor</CardTitle>
                <p className="text-xs text-fg-muted flex-1 leading-relaxed">
                  Indexa, Finizens o MyInvestor gestionan la cartera por ti. Coste ~0,40-0,50%
                  anual pero automatización completa.
                </p>
                <Link href="/blog/indexa-capital-opinion-2026" className="mt-3 text-xs text-brand-400 hover:text-brand-300">
                  → Indexa Capital analizado
                </Link>
              </Card>
              <Card className="flex flex-col">
                <CardTitle className="mb-2">Plan de pensiones</CardTitle>
                <p className="text-xs text-fg-muted flex-1 leading-relaxed">
                  Aporta hasta 1.500€/año con deducción IRPF. Indexa Pensiones y MyInvestor
                  ofrecen planes indexados.
                </p>
                <Link href="/blog/plan-pensiones-indexado-espana-2026" className="mt-3 text-xs text-brand-400 hover:text-brand-300">
                  → Planes de pensiones indexados
                </Link>
              </Card>
            </div>

            <Card>
              <CardTitle className="mb-3">¿Cuánto cuesta cada estrategia? Compáralo en euros</CardTitle>
              <p className="text-sm text-fg-muted leading-relaxed mb-3">
                La diferencia entre 0,15% (DIY) y 0,50% (roboadvisor) suena pequeña. Sobre 100.000€
                durante 30 años con interés compuesto al 7%, son ~30.000€ de diferencia. La
                calculadora te lo enseña en tu caso concreto.
              </p>
              <Link
                href="/calculadora/roboadvisor-vs-diy"
                className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 transition-colors"
              >
                Comparador roboadvisor vs DIY →
              </Link>
            </Card>
          </section>

          {/* PASO 3: Broker */}
          <section id="paso-3" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-bold text-fg mb-3">
              Paso 3: Elige tu broker
            </h2>
            <p className="text-fg-muted leading-relaxed mb-4">
              Si has elegido cartera DIY, necesitas un broker. Los tres más usados por inversores
              indexados españoles en 2026 son Trade Republic, DEGIRO y MyInvestor. La diferencia
              clave: solo MyInvestor ofrece fondos indexados con traspaso fiscal libre.
            </p>

            <div className="overflow-x-auto rounded-xl border border-border mb-4">
              <table className="w-full text-sm">
                <thead className="bg-surface">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wide text-fg-muted">Broker</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wide text-fg-muted">Comisión ETF</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wide text-fg-muted">Fondos</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-wide text-fg-muted">Ideal para</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-fg">Trade Republic</td>
                    <td className="px-4 py-3 text-fg-muted">0€</td>
                    <td className="px-4 py-3 text-fg-muted">✗</td>
                    <td className="px-4 py-3 text-xs text-fg-muted">Aportaciones pequeñas, automatización</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-fg">DEGIRO</td>
                    <td className="px-4 py-3 text-fg-muted">0,50€ + 0,004%</td>
                    <td className="px-4 py-3 text-fg-muted">✗</td>
                    <td className="px-4 py-3 text-xs text-fg-muted">Carteras grandes, mercados internacionales</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-fg">MyInvestor</td>
                    <td className="px-4 py-3 text-fg-muted">0,20€ + 0,03%</td>
                    <td className="px-4 py-3 text-fg-muted">✓</td>
                    <td className="px-4 py-3 text-xs text-fg-muted">Fondos indexados, traspaso fiscal libre</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/blog/trade-republic-opinion-2026" className="text-sm text-brand-400 hover:text-brand-300 hover:underline">
                → Análisis Trade Republic
              </Link>
              <span className="text-fg-subtle">·</span>
              <Link href="/blog/myinvestor-opinion-2026" className="text-sm text-brand-400 hover:text-brand-300 hover:underline">
                → Análisis MyInvestor
              </Link>
              <span className="text-fg-subtle">·</span>
              <Link href="/blog/degiro-vs-trade-republic-vs-myinvestor-2026" className="text-sm text-brand-400 hover:text-brand-300 hover:underline">
                → Comparativa completa
              </Link>
            </div>
          </section>

          {/* PASO 4: ETFs */}
          <section id="paso-4" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-bold text-fg mb-3">
              Paso 4: Selecciona tus ETFs o fondos
            </h2>
            <p className="text-fg-muted leading-relaxed mb-4">
              La elección depende de tu broker y tu estrategia. Para máxima simplicidad: un único
              ETF global como VWCE cubre todo el mercado de renta variable. Para diversificación
              completa: añade un ETF de renta fija como AGGH.
            </p>

            <Card className="mb-4">
              <CardTitle className="mb-3">Cartera mínima recomendada para empezar</CardTitle>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="rounded-full bg-brand-500/10 text-brand-400 text-xs font-mono font-bold px-2 py-0.5 mt-0.5">80%</span>
                  <div>
                    <Link href="/etf/vwce" className="font-semibold text-fg hover:text-brand-400">
                      VWCE (Vanguard FTSE All-World)
                    </Link>
                    <p className="text-xs text-fg-muted mt-0.5">
                      Renta variable global, ~3.700 empresas, TER 0,22%, acumulación
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="rounded-full bg-accent/10 text-accent text-xs font-mono font-bold px-2 py-0.5 mt-0.5">20%</span>
                  <div>
                    <Link href="/etf/aggh" className="font-semibold text-fg hover:text-brand-400">
                      AGGH (iShares Global Aggregate Bond EUR Hedged)
                    </Link>
                    <p className="text-xs text-fg-muted mt-0.5">
                      Renta fija global con cobertura EUR, TER 0,10%, amortigua las caídas
                    </p>
                  </div>
                </li>
              </ul>
              <p className="mt-4 text-xs text-fg-subtle">
                Coste total ponderado: ~0,20% anual. Sin más decisiones que rebalancear una vez al año.
              </p>
            </Card>

            <Card>
              <CardTitle className="mb-3">Explora más opciones</CardTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <Link href="/etfs/msci-world" className="text-brand-400 hover:text-brand-300 hover:underline">→ ETFs MSCI World</Link>
                <Link href="/etfs/sp500" className="text-brand-400 hover:text-brand-300 hover:underline">→ ETFs S&P 500</Link>
                <Link href="/etfs/todo-mundo" className="text-brand-400 hover:text-brand-300 hover:underline">→ ETFs All-World</Link>
                <Link href="/etfs/acumulacion" className="text-brand-400 hover:text-brand-300 hover:underline">→ ETFs acumulación</Link>
                <Link href="/etfs/renta-fija" className="text-brand-400 hover:text-brand-300 hover:underline">→ ETFs renta fija</Link>
                <Link href="/etfs/emergentes" className="text-brand-400 hover:text-brand-300 hover:underline">→ ETFs emergentes</Link>
                <Link href="/etf" className="text-brand-400 hover:text-brand-300 hover:underline">→ Catálogo completo (68 ETFs)</Link>
                <Link href="/comparar" className="text-brand-400 hover:text-brand-300 hover:underline">→ Comparador interactivo</Link>
              </div>
            </Card>
          </section>

          {/* PASO 5: Aportaciones */}
          <section id="paso-5" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-bold text-fg mb-3">
              Paso 5: Planifica tus aportaciones
            </h2>
            <p className="text-fg-muted leading-relaxed mb-4">
              No basta con elegir bien una vez: la verdadera magia del interés compuesto requiere
              aportar de forma constante durante años. Cuanto antes empieces y más regular seas,
              menos cantidad necesitas para llegar a tu objetivo.
            </p>

            <Card className="mb-4">
              <CardTitle className="mb-3">Calculadoras para tu plan</CardTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/calculadora/interes-compuesto"
                  className="rounded-lg border border-border bg-surface-2 p-4 hover:border-border-strong transition-colors"
                >
                  <div className="text-sm font-semibold text-fg">Interés compuesto</div>
                  <p className="text-xs text-fg-muted mt-1">
                    Proyecta tu cartera año a año según aportación y rentabilidad esperada
                  </p>
                </Link>
                <Link
                  href="/calculadora/fire-monte-carlo"
                  className="rounded-lg border border-border bg-surface-2 p-4 hover:border-border-strong transition-colors"
                >
                  <div className="text-sm font-semibold text-fg">FIRE Monte Carlo</div>
                  <p className="text-xs text-fg-muted mt-1">
                    Probabilidad real de jubilación anticipada con 1.000 escenarios simulados
                  </p>
                </Link>
                <Link
                  href="/calculadora/roboadvisor-vs-diy"
                  className="rounded-lg border border-border bg-surface-2 p-4 hover:border-border-strong transition-colors"
                >
                  <div className="text-sm font-semibold text-fg">Roboadvisor vs DIY</div>
                  <p className="text-xs text-fg-muted mt-1">
                    Cuánto te cuesta delegar la gestión frente a hacerlo tú
                  </p>
                </Link>
                <Link
                  href="/calculadora/irpf-venta-fondos"
                  className="rounded-lg border border-border bg-surface-2 p-4 hover:border-border-strong transition-colors"
                >
                  <div className="text-sm font-semibold text-fg">IRPF al vender</div>
                  <p className="text-xs text-fg-muted mt-1">
                    Lo que paga Hacienda al vender fondos o ETF con desglose por tramos
                  </p>
                </Link>
              </div>
            </Card>

            <Card>
              <CardTitle className="mb-3">Lecturas para optimizar las aportaciones</CardTitle>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog/cuanto-invertir-al-mes-jubilarse-millonario" className="text-brand-400 hover:text-brand-300 hover:underline">
                    → Cuánto invertir al mes para llegar al millón
                  </Link>
                </li>
                <li>
                  <Link href="/blog/dca-vs-lump-sum-aportar-mensual" className="text-brand-400 hover:text-brand-300 hover:underline">
                    → DCA vs lump sum: ¿aportar mensual o de golpe?
                  </Link>
                </li>
                <li>
                  <Link href="/blog/como-empezar-a-invertir-poco-dinero" className="text-brand-400 hover:text-brand-300 hover:underline">
                    → Cómo empezar a invertir con poco dinero
                  </Link>
                </li>
              </ul>
            </Card>
          </section>

          {/* PASO 6: Disciplina */}
          <section id="paso-6" className="mb-12 scroll-mt-20">
            <h2 className="text-2xl font-bold text-fg mb-3">
              Paso 6: Mantén la disciplina a largo plazo
            </h2>
            <p className="text-fg-muted leading-relaxed mb-4">
              Esta es la parte más difícil. El mercado va a caer un 20-40% varias veces durante tu
              vida inversora. Si vendes en pánico, destruyes lo que llevas construido. La cartera
              correcta no es la que da más rentabilidad — es la que puedes mantener cuando todo
              parece ir mal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <Card>
                <CardTitle className="mb-2">Cuando el mercado cae</CardTitle>
                <p className="text-xs text-fg-muted leading-relaxed mb-3">
                  Las caídas del 30-50% son históricamente normales. La diferencia entre buenos y
                  malos inversores no es predecir las caídas: es no vender durante ellas.
                </p>
                <Link href="/blog/que-hacer-cuando-el-mercado-cae" className="text-xs text-brand-400 hover:text-brand-300">
                  → Cómo afrontar las caídas
                </Link>
              </Card>
              <Card>
                <CardTitle className="mb-2">Rebalanceo periódico</CardTitle>
                <p className="text-xs text-fg-muted leading-relaxed mb-3">
                  Una vez al año: si la renta variable ha subido y representa más del peso objetivo,
                  vende un poco y compra renta fija. Vender alto, comprar bajo, sistemáticamente.
                </p>
                <Link href="/blog/como-rebalancear-cartera-indexada" className="text-xs text-brand-400 hover:text-brand-300">
                  → Cómo rebalancear
                </Link>
              </Card>
            </div>

            <Card>
              <CardTitle className="mb-2">El analizador de BogleHub</CardTitle>
              <p className="text-sm text-fg-muted leading-relaxed mb-3">
                Una vez tengas cartera (o si ya la tienes), pásala por el analizador para ver TER
                ponderado, solapamiento entre fondos, distribución real y proyección FIRE. Gratis,
                sin registro, los datos viven en tu navegador.
              </p>
              <Link
                href="/analyzer"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Analizar mi cartera gratis →
              </Link>
            </Card>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-fg mb-5">
              Preguntas frecuentes al empezar a invertir
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-xl border border-border bg-surface px-5 py-4"
                >
                  <summary className="flex items-center justify-between gap-3 font-medium text-fg list-none cursor-pointer select-none">
                    {q}
                    <span className="shrink-0 text-fg-muted transition-transform group-open:rotate-180">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <Card className="text-center">
            <h2 className="text-lg font-bold text-fg mb-2">
              El mejor momento para empezar fue hace 10 años. El segundo mejor es hoy.
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              Tienes todas las herramientas: el conocimiento, las calculadoras, el catálogo de ETFs,
              el comparador y los analizadores. Lo único que separa a quien acumula patrimonio de
              quien no lo hace es la primera aportación.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/calculadora/interes-compuesto"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Calcula tu plan
              </Link>
              <Link
                href="/etf"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Ver catálogo ETF
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Pregúntale al Chat IA
              </Link>
            </div>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Todas las decisiones de inversión
            son tu responsabilidad. Rentabilidades pasadas no garantizan rentabilidades futuras.
            Para tu caso personal, consulta con un asesor financiero o fiscal cualificado.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
