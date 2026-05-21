import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Metodología: cómo calculamos tu cartera indexada',
  description:
    'Cómo calcula BogleHub cada métrica: valor de cartera en EUR, TER ponderado, asignación de activos, proyección FIRE y simulación Monte Carlo. Fórmulas exactas, total transparencia.',
  openGraph: {
    title: 'Metodología | BogleHub',
    description: 'Las fórmulas exactas detrás de cada métrica de BogleHub.',
    locale: 'es_ES',
    images: [
      `/api/og?title=${encodeURIComponent('Metodología')}&subtitle=${encodeURIComponent('Cómo calculamos cada métrica')}`,
    ],
  },
}

export default function MetodologiaPage() {
  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 prose prose-invert prose-zinc max-w-none prose-headings:text-fg prose-strong:text-fg prose-a:text-brand-400 prose-code:text-brand-300">
          <h1>Metodología</h1>
          <p className="lead text-fg-muted">
            Cómo calcula BogleHub cada métrica que ves en tu análisis.
          </p>

          <h2>Filosofía de transparencia</h2>
          <p>
            A diferencia de robo-advisors o brokers, BogleHub no tiene ningún incentivo en ocultar
            cómo calcula sus métricas. Publicamos las fórmulas exactas para que puedas
            verificarlas — o cuestionarlas.
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
            materias primas, inmobiliario, liquidez o mixto. Cada posición contribuye con su peso
            relativo (valor de la posición ÷ valor total).
          </p>

          <h2>3. Diversificación geográfica</h2>
          <p>
            Cada ETF tiene un mapa de regiones con porcentajes publicados por el emisor del fondo
            (EE. UU., Europa, emergentes, Japón, Reino Unido, Pacífico, China, global). Cada
            posición aporta su peso × peso regional.
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
            comisiones de tu broker.
          </p>

          <h2>7. Proyección FIRE</h2>
          <p>Simulación mes a mes:</p>
          <pre>
            <code>balance(mes_n) = balance(mes_n-1) × (1 + r_mensual) + aporte_mensual</code>
          </pre>
          <p>
            donde <code>r_mensual = rentabilidad_anual / 12</code>. Alcanzas FIRE cuando el balance
            iguala o supera tu objetivo. Usamos un 7 % anual real por defecto (media histórica del
            mercado mundial ajustada por inflación).
          </p>

          <h2>8. Simulación Monte Carlo</h2>
          <p>
            En la <a href="/calculadora/fire-monte-carlo">calculadora Monte Carlo</a>, a diferencia
            de la proyección lineal, simulamos 1.000 escenarios con rentabilidades aleatorias
            distribuidas normalmente:
          </p>
          <ul>
            <li>Media: 7 % anual</li>
            <li>Desviación estándar: 15 %</li>
          </ul>
          <p>
            Esto refleja la volatilidad real del mercado. Reportamos la tasa de éxito (porcentaje
            de escenarios donde la cartera no se agota) y los percentiles 10, 50 y 90.
          </p>

          <h2>9. Análisis con IA</h2>
          <p>
            Cuando pulsas &quot;Analizar con IA&quot;, enviamos un resumen estructurado de tu
            cartera (asignación, regiones, sectores, TER) al modelo Llama 3.3 70B de Groq, con un
            system prompt en español que le instruye a:
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

          <h2>Verificable</h2>
          <p>
            Todas estas fórmulas están implementadas en código TypeScript. Si detectas un error o
            crees que algo se puede mejorar, escríbenos a{' '}
            <a href="mailto:alquimiaia.oficial@gmail.com">alquimiaia.oficial@gmail.com</a>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
