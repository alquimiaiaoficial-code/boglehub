import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { ArrowRight, BarChart3, Globe2, PiggyBank, Sparkles, ShieldCheck, FileText, Check, X } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-bg">
        {/* HERO */}
        <section className="relative overflow-hidden">
          {/* gradient backdrop */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[1200px] rounded-full bg-gradient-to-b from-brand-600/20 via-accent/10 to-transparent blur-3xl" />
          </div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-32 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 backdrop-blur px-3 py-1 text-xs text-fg-muted mb-6">
              <Sparkles className="h-3 w-3 text-accent" />
              <span>Análisis con IA · 100% gratis · Privado</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-fg leading-[1.05]">
              Tu cartera de fondos indexados,<br/>
              <span className="bg-gradient-to-r from-brand-400 via-accent to-brand-500 bg-clip-text text-transparent">analizada con IA en segundos.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-fg-muted max-w-2xl mx-auto leading-relaxed">
              Indexa Capital te <em>gestiona</em> el dinero. BogleHub te da <em>las herramientas</em> con IA para que lo gestiones tú: asignación, diversificación, costes y FIRE.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/analyzer">
                <Button variant="accent" size="lg">
                  Empezar gratis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#como-funciona">
                <Button variant="secondary" size="lg">Cómo funciona</Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-fg-subtle">Sin registro · Tus datos viven en tu navegador</p>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-y border-border bg-surface/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Hecho para', value: 'Bogleheads' },
              { label: 'Coste', value: '100% gratis' },
              { label: 'Datos', value: 'En tu navegador' },
              { label: 'Privacidad', value: 'En tu navegador' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xs uppercase tracking-wide text-fg-subtle">{item.label}</div>
                <div className="mt-1 text-sm font-semibold text-fg">{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="como-funciona" className="mx-auto max-w-5xl px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-fg">Tres pasos. Cero fricción.</h2>
            <p className="mt-3 text-fg-muted">De extracto a insight en menos de un minuto.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Introduce tu cartera', desc: 'Sube el PDF de tu broker (Trade Republic, DEGIRO, MyInvestor) o escribe posiciones manualmente. Funciona con cualquier ETF UCITS.' },
              { num: '02', title: 'La IA analiza', desc: 'Llama 3.3 70B examina tu asignación, diversificación geográfica, sectorial, divisas y costes. Compara con benchmarks Boglehead.' },
              { num: '03', title: 'Recibe insights', desc: 'Gráficos interactivos, métricas clave, narrativa educativa en español y proyección FIRE personalizada. Todo en una pantalla.' },
            ].map((step) => (
              <div key={step.num} className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-3xl font-bold font-mono text-brand-500/80 mb-3">{step.num}</div>
                <h3 className="text-lg font-semibold text-fg mb-2">{step.title}</h3>
                <p className="text-sm text-fg-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="bg-surface/30 border-y border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-fg">Todo lo que un Boglehead necesita.</h2>
              <p className="mt-3 text-fg-muted">Funciones que las robo-advisors no te dan porque su modelo es esconder, no educar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: BarChart3, title: 'Asignación detallada', desc: 'Renta variable vs fija, geografía, sectores, divisas. Visualizado para entender de un vistazo.' },
                { icon: Globe2, title: 'Conversión EUR automática', desc: 'Tickers en USD, GBp o EUR — todos convertidos a euros con tipo de cambio en tiempo real.' },
                { icon: PiggyBank, title: 'Calculadora FIRE', desc: 'Introduce aporte mensual y objetivo. Te decimos cuándo alcanzas la libertad financiera.' },
                { icon: Sparkles, title: 'Análisis IA en español', desc: 'Llama 3.3 70B genera un análisis educativo personalizado: riesgos, áreas de mejora, comparativas.' },
                { icon: ShieldCheck, title: 'Privado por diseño', desc: 'Tus posiciones viven en tu navegador, nunca en nuestros servidores. GDPR-friendly.' },
                { icon: FileText, title: 'Multi-broker', desc: 'Trade Republic, DEGIRO, MyInvestor, ING. Sube el PDF y detectamos las posiciones automáticamente.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-border bg-surface p-6 hover:border-border-strong transition-colors">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-fg mb-1">{title}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-fg">¿Qué cambia con BogleHub?</h2>
            <p className="mt-3 text-fg-muted">Comparativa honesta con las alternativas habituales.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left p-4 text-fg-muted font-medium"></th>
                  <th className="text-center p-4 text-fg font-bold">BogleHub</th>
                  <th className="text-center p-4 text-fg-muted font-medium">Indexa / Finizens</th>
                  <th className="text-center p-4 text-fg-muted font-medium">Excel manual</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Coste anual', '0€', '0,5–1% AUM', '0€'],
                  ['Tu eliges los ETFs', 'sí', 'no', 'sí'],
                  ['Análisis con IA', 'sí', 'no', 'no'],
                  ['Tiempo para empezar', '30 seg', '1 día', 'horas'],
                  ['Datos en tu navegador', 'sí', 'no', 'sí'],
                  ['Multi-broker', 'sí', 'no', 'manual'],
                ].map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-4 text-fg-muted">{row[0]}</td>
                    {row.slice(1).map((cell, j) => {
                      const isYes = cell === 'sí'
                      const isNo = cell === 'no'
                      return (
                        <td key={j} className="p-4 text-center">
                          {isYes ? (
                            <Check className="h-5 w-5 text-accent inline" />
                          ) : isNo ? (
                            <X className="h-5 w-5 text-danger/60 inline" />
                          ) : (
                            <span className={`font-mono ${j === 0 ? 'text-fg font-bold' : 'text-fg-muted'}`}>{cell}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface/30 border-y border-border">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-fg">Preguntas frecuentes</h2>
            </div>
            <div className="space-y-3">
              {[
                { q: '¿Es de verdad gratis? ¿Cuál es el truco?', a: 'Sí, totalmente gratis. No vendemos tus datos (no los tenemos — viven en tu navegador). Es un proyecto educativo personal hecho para la comunidad de inversores indexados hispanos. En el futuro habrá funciones Pro opcionales, pero el análisis básico será siempre gratuito.' },
                { q: '¿Esto es asesoramiento financiero?', a: 'No. Es información educativa. BogleHub no recomienda comprar o vender activos específicos. Es una herramienta para que entiendas tu cartera, no para sustituir a un asesor regulado.' },
                { q: '¿Qué brokers están soportados?', a: 'Manualmente puedes introducir cualquier ETF UCITS. Con detección automática por PDF: Trade Republic, DEGIRO, MyInvestor, ING. Más brokers se añaden a demanda.' },
                { q: '¿Qué modelo de IA usáis?', a: 'Llama 3.3 70B Versatile a través de Groq. Es uno de los modelos open-weight más potentes del mundo, en infraestructura ultrarrápida. Coste para nosotros: ~14.400 análisis/día gratis.' },
                { q: '¿Mis datos son privados?', a: 'Sí. Tus posiciones se guardan en localStorage de tu navegador, no en nuestros servidores. Solo viajan al servidor durante el análisis y se descartan inmediatamente.' },
              ].map((item, i) => (
                <details key={i} className="group rounded-xl border border-border bg-surface p-5">
                  <summary className="flex justify-between items-center cursor-pointer text-fg font-medium list-none">
                    {item.q}
                    <span className="text-fg-subtle group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-fg tracking-tight">
            Analiza tu cartera ahora.
          </h2>
          <p className="mt-4 text-lg text-fg-muted">Sin registro. En 30 segundos.</p>
          <Link href="/analyzer" className="mt-8 inline-block">
            <Button variant="accent" size="lg">
              Empezar gratis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
