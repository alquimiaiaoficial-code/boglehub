import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { GLOSSARY_TERMS } from '@/data/glossary'

const BASE_URL = 'https://boglehub.com'

interface FaqCategory {
  slug: string
  label: string
  questions: { q: string; a: string }[]
}

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    slug: 'empezar',
    label: 'Empezar a invertir en España',
    questions: [
      {
        q: '¿Cuánto dinero necesito para empezar a invertir en España?',
        a: 'Puedes empezar desde 1€. MyInvestor permite aportaciones a fondos indexados desde un euro, y Trade Republic permite planes de ahorro automáticos en ETFs desde 1€/mes. Lo importante no es la cantidad inicial sino la regularidad de las aportaciones y el tiempo durante el que mantengas la inversión.',
      },
      {
        q: '¿Qué es un ETF y cómo se diferencia de un fondo de inversión?',
        a: 'Un ETF (Exchange Traded Fund) es un fondo cotizado en bolsa que replica un índice y se compra y vende como una acción a precio de mercado en tiempo real. Un fondo de inversión tradicional se compra y vende a precio de cierre del día. En España, la diferencia clave es fiscal: los fondos permiten traspaso libre entre ellos sin tributar, los ETFs no.',
      },
      {
        q: '¿Qué broker es mejor para empezar a invertir en España en 2026?',
        a: 'Para la mayoría de inversores que empiezan, Trade Republic es la opción más sencilla: 0€ por operación, planes de ahorro automáticos desde 1€, app móvil clara, cuenta remunerada al 2-2,5%. Si quieres combinar ETFs con fondos indexados con traspaso fiscal libre, MyInvestor es la única opción que ofrece ambos. DEGIRO es preferible para órdenes muy grandes o acceso a más bolsas internacionales.',
      },
      {
        q: '¿Qué es la filosofía Boglehead?',
        a: 'La filosofía Boglehead, basada en las ideas de John Bogle (fundador de Vanguard), se basa en tres principios: (1) invertir en fondos indexados de bajo coste que repliquen mercados amplios, (2) diversificar globalmente entre clases de activos y regiones, (3) mantener la disciplina a largo plazo sin intentar predecir el mercado. La evidencia académica muestra que la gestión activa, en promedio, no supera al mercado después de comisiones.',
      },
      {
        q: '¿Qué es el TER de un ETF?',
        a: 'El TER (Total Expense Ratio) es el coste anual total de un ETF expresado como porcentaje del patrimonio. Incluye comisión de gestión, custodia, auditoría y otros gastos operativos. Se descuenta automáticamente del valor liquidativo cada día. Un TER del 0,20% sobre 10.000€ supone 20€/año de coste. Para ETFs indexados globales, un TER por debajo de 0,20% se considera bueno; por debajo de 0,10% es excelente.',
      },
      {
        q: '¿Qué significa UCITS en un ETF?',
        a: 'UCITS (Undertakings for Collective Investment in Transferable Securities) es el marco regulatorio europeo que estandariza los fondos de inversión y ETFs para que puedan venderse en toda la UE con garantías al inversor particular. Establece reglas estrictas sobre diversificación, liquidez y transparencia. Los inversores europeos compran principalmente ETFs UCITS porque los ETFs americanos (como VTI o SPY) no son comprables directamente por normativa MiFID II.',
      },
    ],
  },
  {
    slug: 'fiscalidad',
    label: 'Fiscalidad española de ETFs y fondos',
    questions: [
      {
        q: '¿Cuáles son los tramos del IRPF del ahorro en España en 2026?',
        a: 'En 2026, las ganancias por venta de fondos, ETFs y acciones tributan en la base del ahorro con esta escala progresiva: 19% hasta 6.000€, 21% entre 6.000€ y 50.000€, 23% entre 50.000€ y 200.000€, 27% entre 200.000€ y 300.000€, 28% por encima de 300.000€. La escala es progresiva: cada tramo grava solo la porción de ganancia que cae dentro de él.',
      },
      {
        q: '¿Tributan los ETFs de acumulación si no los vendo?',
        a: 'No. Los ETFs de acumulación reinvierten los dividendos dentro del fondo sin generar evento fiscal para el inversor. Solo tributas cuando vendes participaciones, declarando la ganancia o pérdida patrimonial (precio de venta menos precio de compra) en el IRPF del año de la venta.',
      },
      {
        q: '¿Puedo traspasar fondos indexados sin pagar impuestos en España?',
        a: 'Sí. En España, los fondos de inversión gozan del régimen de traspaso fiscal diferido: puedes mover dinero entre fondos sin que el cambio genere un evento fiscal. El IRPF se difiere hasta que rescates definitivamente. Esta ventaja NO existe para los ETFs: cada venta de ETF tributa por la ganancia. Por eso muchos inversores españoles prefieren fondos indexados de MyInvestor frente a ETFs.',
      },
      {
        q: '¿Qué es el criterio FIFO al vender ETFs?',
        a: 'FIFO (First In, First Out) es el criterio fiscal obligatorio en España cuando vendes solo una parte de un ETF que has comprado en distintas fechas. Hacienda asume que vendes primero las participaciones más antiguas. Esto afecta directamente al precio de adquisición que se usa para calcular la ganancia: si tus primeras compras fueron a precios bajos, la ganancia calculada para una venta parcial será mayor.',
      },
      {
        q: '¿Qué es la regla de los dos meses en la venta de ETFs?',
        a: 'La regla de los dos meses (wash sale) impide computar fiscalmente una pérdida si vendes un ETF o acción con minusvalía y recompras el mismo valor en los dos meses anteriores o posteriores. Hacienda lo considera una venta puramente fiscal y rechaza la pérdida. Si quieres realizar una pérdida real, espera más de dos meses para recomprar el mismo ticker.',
      },
      {
        q: '¿Cuándo hay que presentar el Modelo 720?',
        a: 'El Modelo 720 es obligatorio para residentes fiscales en España con bienes en el extranjero por más de 50.000€ por categoría: cuentas bancarias, valores (incluyendo ETFs en DEGIRO o Trade Republic), o inmuebles. Se presenta entre enero y marzo del año siguiente. Es una declaración informativa, no tributaria. Las sanciones desproporcionadas fueron anuladas por el Tribunal Constitucional en 2022, pero la obligación de declarar persiste.',
      },
      {
        q: '¿Por qué los ETFs domiciliados en Irlanda son más eficientes fiscalmente?',
        a: 'Los ETFs domiciliados en Irlanda (ISIN empieza por IE) aprovechan el convenio fiscal Irlanda-EE.UU. que reduce la retención sobre dividendos americanos del 30% al 15%. Como el ~63% del MSCI World son empresas americanas, este ahorro tiene impacto real en la rentabilidad neta. Por eso ETFs como VWCE (IE00BK5BQT80), IWDA (IE00B4L5Y983) o CSPX (IE00B5BMR087) son más eficientes que sus equivalentes domiciliados en Luxemburgo.',
      },
    ],
  },
  {
    slug: 'etfs-concretos',
    label: 'ETFs concretos populares',
    questions: [
      {
        q: '¿Qué es el ETF VWCE y por qué es tan popular?',
        a: 'VWCE es el ticker del Vanguard FTSE All-World UCITS ETF (Acc), ISIN IE00BK5BQT80. Replica el índice FTSE All-World con más de 3.700 empresas de mercados desarrollados y emergentes. TER 0,19%, domiciliado en Irlanda, política de acumulación. Es el ETF de referencia para inversores españoles porque ofrece diversificación global máxima en un solo producto con eficiencia fiscal.',
      },
      {
        q: '¿Cuál es la diferencia entre VWCE y IWDA?',
        a: 'VWCE (Vanguard FTSE All-World, TER 0,19%) incluye mercados emergentes (~12%) en un solo ETF. IWDA (iShares Core MSCI World, TER 0,20%) solo cubre 23 países desarrollados, sin emergentes. Para tener exposición global con IWDA necesitas combinarlo con un ETF de emergentes como EIMI en proporción ~88/12. VWCE hace eso automáticamente.',
      },
      {
        q: '¿Cuál es el ETF MSCI World más barato disponible en España?',
        a: 'SWRD (SPDR MSCI World UCITS ETF) y MWRD (Lyxor Core MSCI World) tienen TER del 0,12%, los más bajos entre los ETFs MSCI World UCITS disponibles para inversores españoles. IWDA tiene TER del 0,20% pero es más líquido (>75.000M USD AUM). Para carteras grandes y horizonte muy largo, SWRD ahorra ~0,08% anual frente a IWDA.',
      },
      {
        q: '¿Qué es el ETF CSPX?',
        a: 'CSPX (iShares Core S&P 500 UCITS ETF, ISIN IE00B5BMR087) replica el índice S&P 500 con 500 empresas grandes americanas. TER 0,07%, uno de los más baratos del mercado. Acumulación, domiciliado en Irlanda, cotiza en LSE (versión SXR8 cotiza en Xetra). Funcionalmente idéntico a SXR8 — mismo ISIN, distinta bolsa de cotización.',
      },
      {
        q: '¿Qué ETF cubre el Nasdaq 100 en España?',
        a: 'Los principales ETFs Nasdaq 100 UCITS disponibles en España son: EQQQ (Invesco, TER 0,30%, el más popular), SXRV (iShares, TER 0,33%, acumulación) y CNDX (iShares, TER 0,33%, en LSE). Replican las 100 empresas no financieras más grandes del Nasdaq, con peso muy alto de tecnología (~50%). Más caros que los ETFs S&P 500 por la licencia del índice.',
      },
      {
        q: '¿Cuál es el fondo indexado más barato disponible en España?',
        a: 'El Amundi Prime Global (ISIN LU1931974692) tiene TER 0,05%, el más bajo entre los fondos indexados globales disponibles al inversor particular en España. Disponible en MyInvestor desde 1€, permite traspaso fiscal libre. Replica el índice Solactive GBS Global Markets, equivalente al MSCI World.',
      },
    ],
  },
  {
    slug: 'roboadvisors',
    label: 'Roboadvisors y brokers en España',
    questions: [
      {
        q: '¿Es Indexa Capital una buena opción para invertir en 2026?',
        a: 'Indexa Capital es el roboadvisor con más patrimonio gestionado de España (>2.000M€). Registrado en CNMV nº 257. Cobra entre 0,40% y 0,50% anual total (gestión + custodia + TER de fondos). Es buena opción para quien valora la automatización completa (rebalanceo, aportaciones programadas) sin querer gestionar la cartera. Es más caro que una cartera DIY (~0,15%) pero significativamente más barato que cualquier fondo activo bancario (~1,5%).',
      },
      {
        q: '¿Qué diferencia hay entre Indexa Capital y Finizens?',
        a: 'Ambos son roboadvisors registrados en CNMV. Indexa tiene 10 niveles de perfil de riesgo y mayor patrimonio gestionado. Finizens tiene 5 niveles, mínimo de apertura más bajo (1.000€ vs 3.000€) y carteras que incluyen oro. Comisiones similares (~0,40% total). Para la mayoría de inversores, ambos son válidos; la decisión depende más de preferencias de interfaz que de diferencias estructurales.',
      },
      {
        q: '¿Es seguro Trade Republic para inversores españoles?',
        a: 'Sí. Trade Republic es un banco alemán con licencia bancaria completa supervisado por BaFin y Bundesbank desde 2023. Los depósitos en euros hasta 100.000€ están cubiertos por el Fondo de Garantía de Depósitos alemán. Las acciones y ETFs se custodian como patrimonio segregado del banco. Adicionalmente cubiertos hasta 20.000€ por el Fondo Europeo de Garantía de Inversiones.',
      },
      {
        q: '¿Por qué MyInvestor es el único broker con fondos indexados Vanguard en España?',
        a: 'MyInvestor es el neobanco del grupo Andbank, regulado por CNMV y Banco de España. Es uno de los pocos brokers españoles que ofrece la gama institucional de fondos Vanguard, Amundi y Fidelity directamente al inversor particular. Esta combinación —ETFs + fondos con traspaso fiscal libre + plan de pensiones indexado— lo hace único en el mercado español. Sin comisión de custodia ni de compra en fondos.',
      },
      {
        q: '¿Cuál es el plan de pensiones indexado más barato en España?',
        a: 'Los planes de pensiones indexados más competitivos en 2026 son: MyInvestor Indexado Global (~0,30% comisión total), Indexa Pensiones (~0,40-0,50% total) y Finizens Pensiones (~0,40% total). Todos están por debajo del 1% que cobran los planes tradicionales de la banca. El límite anual de aportación deducible en planes individuales es 1.500€.',
      },
    ],
  },
  {
    slug: 'estrategias',
    label: 'Estrategias y carteras',
    questions: [
      {
        q: '¿Qué es la cartera Boglehead de 3 fondos?',
        a: 'La cartera Boglehead de 3 fondos es la asignación clásica para inversores indexados: (1) renta variable nacional/EE.UU., (2) renta variable internacional/desarrollados ex-EE.UU., (3) renta fija. Para un inversor español, una versión común es: 50% MSCI World, 30% MSCI Emerging Markets o ACWI, 20% bonos globales hedged EUR. Diversificación máxima, coste mínimo y rebalanceo simple anual.',
      },
      {
        q: '¿Es mejor DCA o lump sum al invertir?',
        a: 'Si tienes el dinero hoy, lump sum (invertir todo de golpe) supera al DCA en 2/3 de los periodos históricos: el mercado tiende a subir más que a bajar, por lo que el tiempo en el mercado supera al market timing. Pero si no tienes el dinero todavía y lo ahorras de la nómina, las aportaciones periódicas (DCA) son la única opción práctica y aprovechan plenamente el interés compuesto.',
      },
      {
        q: '¿Cuánto debo invertir al mes para llegar al millón de euros?',
        a: 'Asumiendo rentabilidad anual del 7% (histórica del MSCI World): a los 25 años necesitas aportar ~380€/mes para llegar al millón a los 65. A los 35 años, ~850€/mes. A los 45 años, ~1.940€/mes. A los 55 años, ~5.800€/mes. El tiempo importa más que la cantidad: empezar 10 años antes equivale a duplicar la aportación mensual.',
      },
      {
        q: '¿Cuánto necesito para alcanzar el FIRE en España?',
        a: 'Con la regla del 4%, el capital necesario es 25 veces el gasto anual. Para 30.000€/año de gasto, necesitas 750.000€. Para 50.000€/año, 1.250.000€. Pero si en España cuentas con pensión pública (~18.000€/año media), la cartera solo necesita cubrir la diferencia: para 30.000€/año con pensión de 18.000€/año, la cartera solo necesita generar 12.000€/año = 300.000€ de capital.',
      },
      {
        q: '¿Qué hago si el mercado cae un 30-50%?',
        a: 'Nada. Las caídas del 30-50% son históricamente normales (han ocurrido en 2000-2002, 2008, 2020 brevemente, 2022 parcialmente). El error que destruye carteras es vender en pánico. Las decisiones sobre qué hacer en caídas deben tomarse antes (asset allocation correcto). Durante la caída: mantener aportaciones, rebalancear si toca, no tocar el plan. Las caídas son ofertas, no emergencias — siempre que tu horizonte siga siendo largo.',
      },
    ],
  },
  {
    slug: 'tools',
    label: 'Herramientas de BogleHub',
    questions: [
      {
        q: '¿Cómo funciona el analizador de cartera con IA de BogleHub?',
        a: 'Subes tus posiciones manualmente o el PDF de tu broker (Trade Republic, DEGIRO, MyInvestor, ING). El analizador detecta los ETFs, los convierte a euros con tipo de cambio actual, calcula asignación por clase de activo, distribución geográfica y sectorial, TER ponderado y proyección FIRE. Después, opcionalmente, Llama 3.3 70B genera un análisis educativo en español identificando riesgos y áreas de mejora. Tus datos viven en tu navegador, nunca se guardan en servidores.',
      },
      {
        q: '¿Es gratis BogleHub?',
        a: 'Sí, completamente gratis. No vendemos tus datos (no los tenemos: viven en tu navegador). No cobramos por análisis, comparativas ni calculadoras. No tenemos comisiones por dirigir tráfico a brokers o roboadvisors. Es un proyecto educativo independiente sostenible mediante futuras funciones Pro opcionales para usuarios que las elijan voluntariamente.',
      },
      {
        q: '¿Qué calculadoras gratuitas ofrece BogleHub?',
        a: 'BogleHub ofrece 4 calculadoras gratuitas: (1) Interés compuesto con aportaciones mensuales y proyección año a año, (2) FIRE con simulación Monte Carlo de 1.000 escenarios, (3) Roboadvisor vs cartera DIY que compara costes a 10/20/30 años, (4) IRPF venta de fondos y ETFs con tramos del ahorro 2026 y compensación de pérdidas. Todas en /calculadora.',
      },
    ],
  },
]

const ALL_QUESTIONS = FAQ_CATEGORIES.flatMap((cat) => cat.questions)
const QUESTION_COUNT = ALL_QUESTIONS.length

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre inversión indexada en España (2026)',
  description: `Respuestas claras a las ${QUESTION_COUNT} preguntas más frecuentes sobre inversión indexada, ETFs UCITS, fiscalidad española, planes de pensiones, roboadvisors, brokers, FIRE y carteras Boglehead. Actualizado mayo 2026.`,
  openGraph: {
    title: 'Preguntas frecuentes sobre inversión indexada en España | BogleHub',
    description: `Respuestas directas a las ${QUESTION_COUNT} preguntas más frecuentes sobre ETFs, fiscalidad, brokers, roboadvisors y estrategias indexadas en España.`,
    locale: 'es_ES',
    images: [
      '/api/og?title=Preguntas%20frecuentes&subtitle=Inversi%C3%B3n%20indexada%20en%20Espa%C3%B1a',
    ],
  },
  alternates: { canonical: '/faq' },
}

export default function FaqPage() {
  // Aplanamos todas las preguntas para el FAQPage schema (Google permite 200+)
  const allQuestions = ALL_QUESTIONS

  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: allQuestions }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Preguntas frecuentes', url: `${BASE_URL}/faq` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Speakable',
          url: `${BASE_URL}/faq`,
          cssSelectors: ['h1', 'article h3', 'article p'],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Preguntas frecuentes</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Preguntas frecuentes sobre inversión indexada en España
            </h1>
            <p className="mt-4 text-fg-muted leading-relaxed">
              Respuestas directas a las {allQuestions.length} preguntas más buscadas sobre
              inversión indexada, ETFs UCITS, fiscalidad española, roboadvisors, brokers y
              estrategias. Información educativa, actualizada a mayo 2026. Para cada respuesta
              hay artículos del blog y herramientas con análisis más profundo.
            </p>
          </header>

          {/* Navegación por categoría */}
          <nav aria-label="Categorías" className="mb-10 flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
              >
                {cat.label} ({cat.questions.length})
              </a>
            ))}
          </nav>

          {/* Preguntas por categoría */}
          {FAQ_CATEGORIES.map((cat) => (
            <section
              key={cat.slug}
              id={cat.slug}
              className="mb-12 scroll-mt-20"
              aria-labelledby={`heading-${cat.slug}`}
            >
              <h2
                id={`heading-${cat.slug}`}
                className="text-xl sm:text-2xl font-bold text-fg mb-4 border-b border-border pb-2"
              >
                {cat.label}
              </h2>
              <div className="space-y-4">
                {cat.questions.map(({ q, a }) => (
                  <article key={q} className="rounded-xl border border-border bg-surface p-5">
                    <h3 className="text-base font-semibold text-fg mb-2 leading-snug">{q}</h3>
                    <p className="text-sm text-fg-muted leading-relaxed">{a}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {/* CTA final */}
          <div className="mt-12 rounded-xl border border-accent/30 bg-accent-dim p-6 text-center">
            <h2 className="text-lg font-bold text-fg mb-2">
              ¿No encuentras tu respuesta?
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              Explora el blog con {BLOG_ARTICLES.length} artículos detallados, consulta el glosario
              con {GLOSSARY_TERMS.length} términos explicados, o usa el chat IA para preguntas
              libres sobre inversión indexada.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Ver el blog
              </Link>
              <Link
                href="/glosario"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Glosario
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Chat IA
              </Link>
            </div>
          </div>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero. Para decisiones personales,
            consulta con un asesor cualificado. Última revisión: mayo 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
