import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Metodología BogleHub: cómo calculamos cada métrica (2026)',
  description:
    'Cómo calcula BogleHub cada métrica: valor de cartera, TER ponderado, asignación, grados fiscales, FIRE y Monte Carlo. Fórmulas exactas y fuentes, total transparencia.',
  openGraph: {
    title: 'Metodología | BogleHub',
    description:
      'Las fórmulas exactas y fuentes de datos detrás de cada análisis de BogleHub.',
    locale: 'es_ES',
    images: [
      `/api/og?title=${encodeURIComponent('Metodología')}&subtitle=${encodeURIComponent('Cómo calculamos cada métrica')}`,
    ],
  },
  alternates: { canonical: '/metodologia' },
}

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '¿Cómo se calculan los grados fiscales A/B/C/D para ETFs?',
    a: 'El grado fiscal combina dos factores: (1) domicilio del ETF — Irlanda es A (aprovecha el convenio EE.UU.-Irlanda y reduce retención de dividendos del 30% al 15%), Luxemburgo es B (menos eficiente para dividendos americanos), otros domicilios son C/D; (2) política de reparto — acumulación bonifica un escalón porque difiere la tributación de dividendos hasta la venta, distribución mantiene el escalón. La metodología completa está en lib/fiscal.ts del código fuente y es 100% determinística desde el ISIN del fondo.',
  },
  {
    q: '¿De dónde sale la información de TER, ISIN y composición de cada ETF?',
    a: 'Los datos básicos (TER, ISIN, política de reparto, divisa, asset class) proceden de los folletos UCITS oficiales publicados por las gestoras (BlackRock/iShares, Vanguard, SPDR/State Street, Amundi, Xtrackers, Invesco). La composición geográfica y sectorial se basa en los reports oficiales mensuales/trimestrales de cada ETF. Todos los datos son contrastables públicamente en la web de la gestora correspondiente o en JustETF.com.',
  },
  {
    q: '¿Con qué frecuencia se actualiza la información?',
    a: 'El TER y la composición se revisan cuando cambian los reports oficiales (típicamente cada 3-6 meses por ETF). La normativa fiscal (tramos del IRPF, límites del plan de pensiones, novedades del Modelo 720) se actualiza cuando aparece en el BOE. Los artículos del blog se revisan en bloque al menos una vez al año. Cada artículo y página clave muestra su fecha de última revisión visible.',
  },
  {
    q: '¿Por qué los precios y rentabilidades históricas de ETFs no aparecen en BogleHub?',
    a: 'Los precios cambian segundo a segundo y requieren feed en tiempo real con licencias específicas y SLAs garantizados. Las rentabilidades históricas dependen del periodo elegido y son sensibles a errores. Para datos en tiempo real recomendamos JustETF, Morningstar o la web del emisor. BogleHub se centra en lo estructural (composición, fiscalidad, comparativas) que cambia poco y es donde podemos aportar mayor valor educativo.',
  },
  {
    q: '¿El análisis con IA es independiente?',
    a: 'Sí. El analizador de cartera usa el modelo Llama 3.3 70B Versatile a través de Groq, ejecutado contra un system prompt diseñado para ser estrictamente educativo (sin recomendaciones de compra/venta). El modelo solo recibe datos agregados de la cartera (asignación, regiones, sectores, TER ponderado), nunca información personal identificable. El prompt completo está disponible en el código fuente para auditoría.',
  },
]

export default function MetodologiaPage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Metodología', url: `${BASE_URL}/metodologia` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: 'Metodología BogleHub: cómo calculamos cada métrica',
          description:
            'Fórmulas exactas, fuentes de datos y metodología transparente detrás de cada análisis publicado en BogleHub.',
          url: `${BASE_URL}/metodologia`,
          datePublished: '2025-12-01',
          dateModified: '2026-05-24',
          articleSection: 'Documentación técnica',
          keywords: [
            'metodología BogleHub',
            'grados fiscales ETF',
            'TER ponderado',
            'simulación Monte Carlo',
            'fuentes de datos ETF',
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 prose prose-invert prose-zinc max-w-none prose-headings:text-fg prose-strong:text-fg prose-a:text-brand-400 prose-code:text-brand-300">

          <nav className="not-prose text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Metodología</span>
          </nav>

          <h1>Metodología</h1>
          <p className="lead text-fg-muted">
            Cómo calcula BogleHub cada métrica que aparece en su contenido y en sus herramientas.
            Fórmulas exactas, fuentes de datos y proceso de actualización. Última revisión:
            mayo 2026.
          </p>

          <h2>Filosofía de transparencia</h2>
          <p>
            A diferencia de roboadvisors, brokers o gestoras, BogleHub no tiene ningún incentivo
            para ocultar cómo calcula sus métricas. Publicamos las fórmulas exactas, las fuentes
            de los datos y los criterios editoriales para que puedas verificarlos — o
            cuestionarlos. El código de cálculo es abierto en la base del proyecto.
          </p>

          <h2>Fuentes de datos (qué publica BogleHub y de dónde sale)</h2>

          <h3>Datos básicos de ETFs (TER, ISIN, política, divisa)</h3>
          <ul>
            <li>
              <strong>Folletos UCITS oficiales</strong>: documento KID (Key Information Document)
              y folleto del fondo publicados por la gestora (iShares, Vanguard, SPDR, Amundi,
              Xtrackers, Invesco, Fidelity).
            </li>
            <li>
              <strong>JustETF</strong> (justetf.com): cruzado con los datos oficiales como segunda
              fuente para detectar discrepancias.
            </li>
            <li>
              <strong>Web de la gestora</strong>: ficha oficial de cada ETF, actualizada por la
              gestora trimestralmente.
            </li>
          </ul>

          <h3>Composición geográfica y sectorial</h3>
          <p>
            Reports mensuales o trimestrales publicados por la gestora del ETF. Los porcentajes
            son los oficiales del último report disponible y pueden variar ligeramente respecto
            al cierre del día por movimientos de mercado.
          </p>

          <h3>Normativa fiscal española</h3>
          <ul>
            <li>
              <strong>BOE (Boletín Oficial del Estado)</strong>: tramos del IRPF del ahorro,
              límites de aportación a planes de pensiones, Modelo 720 y otras obligaciones.
            </li>
            <li>
              <strong>AEAT (Agencia Tributaria)</strong>: manuales oficiales de IRPF, criterios
              de aplicación, formularios y plazos.
            </li>
            <li>
              <strong>Convenios de doble imposición</strong>: textos oficiales de los tratados
              fiscales bilaterales (Irlanda-EE.UU., Luxemburgo-EE.UU., España-EE.UU., etc.).
            </li>
          </ul>

          <h2>Grados fiscales A/B/C/D para residentes en España</h2>
          <p>
            Uno de los aportes más útiles de BogleHub: cada ETF tiene un grado fiscal estimado
            para inversores residentes en España. La metodología es determinística y abierta.
          </p>

          <h3>Lógica de cálculo</h3>
          <ol>
            <li>
              <strong>Domicilio del ETF</strong> (deducido del ISIN, los dos primeros caracteres):
              <ul>
                <li>
                  <code>IE</code> = Irlanda → punto de partida <strong>A</strong>. Convenio
                  fiscal Irlanda-EE.UU. reduce la retención sobre dividendos americanos del 30%
                  al 15%.
                </li>
                <li>
                  <code>LU</code> = Luxemburgo → punto de partida <strong>B</strong>. Menos
                  eficiente para ETFs con alta exposición a empresas americanas porque la
                  retención sobre dividendos es del 30%.
                </li>
                <li>
                  <code>DE</code>, <code>FR</code>, otros UCITS → punto de partida{' '}
                  <strong>C</strong> o <strong>D</strong> según el caso.
                </li>
              </ul>
            </li>
            <li>
              <strong>Política de reparto</strong>:
              <ul>
                <li>
                  <strong>Acumulación</strong>: mantiene el grado (Irlanda + acumulación = A).
                  Difiere la tributación de dividendos hasta la venta, lo que maximiza el efecto
                  del interés compuesto.
                </li>
                <li>
                  <strong>Distribución</strong>: en algunas combinaciones puede bajar un escalón
                  porque los dividendos tributan cada año (19-28% del IRPF del ahorro).
                </li>
              </ul>
            </li>
          </ol>

          <h3>Interpretación del grado</h3>
          <ul>
            <li>
              <strong>A</strong>: óptimo fiscalmente para residentes en España. Combina domicilio
              eficiente con política de reparto que difiere o minimiza la tributación intermedia.
            </li>
            <li>
              <strong>B</strong>: aceptable. Pequeñas ineficiencias por domicilio o reparto,
              pero sin impacto significativo en carteras pequeñas-medianas.
            </li>
            <li>
              <strong>C</strong>: subóptimo. Hay alternativas claramente más eficientes con
              exposición similar.
            </li>
            <li>
              <strong>D</strong>: ineficiente para residentes en España. Buscar alternativas si
              existen.
            </li>
          </ul>

          <p className="not-prose rounded-lg bg-surface-2 p-4 text-sm text-fg-muted">
            <strong>Importante</strong>: el grado fiscal es educativo y orientativo. No
            constituye asesoramiento fiscal ni considera tu situación personal (otros ingresos,
            comunidad autónoma, edad). Para decisiones personales, consulta con un asesor
            fiscal cualificado.
          </p>

          <h2>1. Valor total de la cartera (EUR)</h2>
          <p>Para cada posición:</p>
          <ul>
            <li>
              Obtenemos el precio actual desde Yahoo Finance (ticker correspondiente a la
              cotización europea del ETF).
            </li>
            <li>
              Convertimos a euros si el ETF cotiza en otra divisa:
              <ul>
                <li>USD → EUR: dividimos por el tipo de cambio EUR/USD del momento.</li>
                <li>GBP → EUR: dividimos por el tipo de cambio EUR/GBP.</li>
                <li>
                  GBp (peniques): dividimos primero por 100 y luego por el tipo EUR/GBP.
                </li>
              </ul>
            </li>
          </ul>
          <p>
            <strong>Valor total</strong> = suma de (participaciones × precio en EUR) para cada
            posición.
          </p>

          <h2>2. Asignación por clase de activo</h2>
          <p>
            Usamos un mapa estático que clasifica cada ETF en: renta variable, renta fija,
            materias primas, inmobiliario, liquidez o mixto. Cada posición contribuye con su
            peso relativo (valor de la posición ÷ valor total).
          </p>

          <h2>3. Diversificación geográfica</h2>
          <p>
            Cada ETF tiene un mapa de regiones con porcentajes publicados por el emisor del
            fondo (EE.UU., Europa, emergentes, Japón, Reino Unido, Pacífico, China, global).
            Cada posición aporta su peso × peso regional.
          </p>

          <h2>4. Exposición sectorial</h2>
          <p>
            Mismo enfoque que las regiones, pero con sectores económicos (tecnología, financiero,
            salud, etc.).
          </p>

          <h2>5. TER ponderado</h2>
          <p>
            <code>TER ponderado = Σ (peso_i × TER_i)</code>
          </p>
          <p>
            donde <code>peso_i</code> es el porcentaje de tu cartera invertido en cada ETF y{' '}
            <code>TER_i</code> el Total Expense Ratio de ese ETF.
          </p>

          <h2>6. Coste anual</h2>
          <p>
            <code>Coste anual = Valor total × TER ponderado</code>
          </p>
          <p>
            Es lo que pagas en comisiones de gestión al año por toda tu cartera. No incluye
            comisiones de tu broker (custodia, compraventa).
          </p>

          <h2>7. Proyección FIRE (calculadora lineal)</h2>
          <p>Simulación mes a mes:</p>
          <pre>
            <code>balance(mes_n) = balance(mes_n-1) × (1 + r_mensual) + aporte_mensual</code>
          </pre>
          <p>
            donde <code>r_mensual = rentabilidad_anual / 12</code>. Alcanzas FIRE cuando el
            balance iguala o supera tu objetivo. Usamos un 7% anual real por defecto (media
            histórica del mercado mundial ajustada por inflación).
          </p>

          <h2>8. Simulación Monte Carlo</h2>
          <p>
            En la <Link href="/calculadora/fire-monte-carlo">calculadora Monte Carlo</Link>, a
            diferencia de la proyección lineal, simulamos 1.000 escenarios con rentabilidades
            aleatorias distribuidas normalmente:
          </p>
          <ul>
            <li>Media: 7% anual (nominal)</li>
            <li>Desviación estándar: 15% (volatilidad histórica del MSCI World)</li>
            <li>1.000 secuencias completas hasta el final del horizonte</li>
          </ul>
          <p>
            Reportamos la <strong>tasa de éxito</strong> (porcentaje de escenarios donde la
            cartera no se agota antes del final del horizonte) y los percentiles 10, 50 y 90 del
            balance final.
          </p>

          <h2>9. Tramos del IRPF del ahorro (2026)</h2>
          <p>Calculadora IRPF venta de fondos aplica la escala vigente en 2026:</p>
          <ul>
            <li><strong>19%</strong> hasta 6.000€ de ganancia</li>
            <li><strong>21%</strong> entre 6.000€ y 50.000€</li>
            <li><strong>23%</strong> entre 50.000€ y 200.000€</li>
            <li><strong>27%</strong> entre 200.000€ y 300.000€</li>
            <li><strong>28%</strong> por encima de 300.000€</li>
          </ul>
          <p>
            Escala progresiva: cada tramo grava solo la porción de ganancia dentro del tramo,
            no el total. Cuando cambien los tramos vigentes (por novedades en la Ley de
            Presupuestos), se actualizan inmediatamente.
          </p>

          <h2>10. Análisis con IA</h2>
          <p>
            Cuando pulsas &quot;Analizar con IA&quot;, enviamos un resumen estructurado de tu
            cartera (asignación, regiones, sectores, TER) al modelo{' '}
            <strong>Llama 3.3 70B Versatile</strong> de Groq, con un system prompt en español
            que le instruye a:
          </p>
          <ul>
            <li>No dar consejos de inversión específicos.</li>
            <li>Identificar riesgos (concentración geográfica, sectorial, divisas, costes).</li>
            <li>Comparar con benchmarks de carteras Boglehead.</li>
            <li>Sugerir áreas de mejora de forma genérica y educativa.</li>
          </ul>
          <p>
            El modelo solo recibe datos agregados de cartera, nunca información personal
            identificable.
          </p>

          <h2>Proceso editorial</h2>
          <ul>
            <li>
              <strong>Revisión técnica</strong>: cada artículo se revisa antes de publicación
              para verificar cifras, ISIN, TER y normativa fiscal aplicable.
            </li>
            <li>
              <strong>Actualización por novedades</strong>: cuando cambia la normativa fiscal
              (BOE), cuando una gestora actualiza el TER o cuando aparecen nuevos productos
              relevantes, se actualizan los artículos afectados.
            </li>
            <li>
              <strong>Revisión anual</strong>: una vez al año todo el contenido se revisa en
              bloque para refrescar fechas, comprobar datos y mejorar redacciones.
            </li>
            <li>
              <strong>Correcciones de la comunidad</strong>: las correcciones reportadas por
              usuarios se aplican lo antes posible. Contacto:{' '}
              <a href="mailto:hola@boglehub.com">hola@boglehub.com</a>.
            </li>
          </ul>

          <h2 className="mt-12">Preguntas frecuentes sobre la metodología</h2>
          {FAQ_ITEMS.map(({ q, a }) => (
            <div key={q} className="not-prose mb-4 rounded-xl border border-border bg-surface p-5">
              <p className="font-semibold text-fg mb-2">{q}</p>
              <p className="text-sm text-fg-muted leading-relaxed">{a}</p>
            </div>
          ))}

          <h2 className="mt-12">Limitaciones reconocidas</h2>
          <ul>
            <li>
              Los grados fiscales son estimaciones agregadas; no incluyen factores personales
              (otros ingresos, comunidad autónoma con normativa foral, edad, dependientes).
            </li>
            <li>
              Los datos de composición pueden diferir del cierre del día por el lag entre los
              reports de la gestora y los movimientos reales del fondo.
            </li>
            <li>
              Los precios de cotización dependen de Yahoo Finance y pueden tener un delay de
              hasta 15 minutos.
            </li>
            <li>
              No cubrimos normativa foral de País Vasco y Navarra: los inversores en esos
              territorios deberán consultar la normativa autonómica específica.
            </li>
          </ul>

          <h2>Contacto y correcciones</h2>
          <p>
            Si detectas un error o crees que algo se puede mejorar, escríbenos a{' '}
            <a href="mailto:hola@boglehub.com">hola@boglehub.com</a>. Agradecemos todas las
            correcciones — el proyecto vive de la comunidad.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
