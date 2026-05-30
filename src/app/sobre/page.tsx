import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { GLOSSARY_TERMS } from '@/data/glossary'
import { ETF_THEMES } from '@/data/etf-themes'
import { ETF_PAIRS } from '@/data/etf-pairs'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Sobre BogleHub: misión, metodología y por qué confiar',
  description:
    'BogleHub es una plataforma educativa gratuita en español sobre inversión indexada para residentes en España. Conoce la misión, la metodología de análisis, las fuentes de datos y por qué la información es de confianza.',
  openGraph: {
    title: 'Sobre BogleHub | Misión, metodología y confianza',
    description:
      'Información sobre el proyecto, metodología de análisis de ETFs, fuentes de datos verificables y compromiso educativo independiente.',
    locale: 'es_ES',
  },
  alternates: { canonical: '/sobre' },
}

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '¿Qué es BogleHub?',
    a: `BogleHub es una plataforma educativa gratuita en español sobre inversión indexada (filosofía Boglehead) orientada a residentes en España. Ofrece análisis de carteras con IA, comparador de ETFs UCITS, calculadoras financieras, blog con ${BLOG_ARTICLES.length} artículos, glosario con ${GLOSSARY_TERMS.length} términos y catálogo de 68 ETFs UCITS con grado fiscal específico para España.`,
  },
  {
    q: '¿Quién está detrás del proyecto?',
    a: 'BogleHub es un proyecto educativo independiente sin ánimo de lucro creado en 2025 por miembros de la comunidad Boglehead hispanohablante. No está afiliado a ninguna gestora, broker o roboadvisor. No recibe comisiones por dirigir tráfico a entidades comerciales. La sostenibilidad económica se basa en futuras funciones Pro opcionales para usuarios que las elijan voluntariamente.',
  },
  {
    q: '¿Cómo se garantiza la calidad de la información?',
    a: 'Los datos de ETFs (TER, ISIN, composición) proceden de fuentes públicas oficiales (gestoras, JustETF, prospectos UCITS). Los grados fiscales se calculan con metodología transparente basada en domicilio del ETF y política de reparto, considerando los convenios de doble imposición aplicables. Los artículos son revisados antes de publicación y se actualizan cuando la normativa fiscal o las condiciones de mercado cambian. Última revisión global: mayo 2026.',
  },
  {
    q: '¿BogleHub ofrece asesoramiento financiero personalizado?',
    a: 'No. BogleHub es exclusivamente educativo y orientativo. No constituye asesoramiento financiero ni fiscal personalizado, ni recomendación de productos concretos. Las herramientas y análisis están diseñados para que el usuario tome sus propias decisiones informadas, no para sustituir a un asesor cualificado. Para decisiones específicas, consulta con un profesional regulado.',
  },
  {
    q: '¿Mis datos personales o de cartera están a salvo?',
    a: 'Sí. BogleHub aplica privacidad por diseño: tus posiciones de cartera viven en el localStorage de tu navegador, nunca en servidores de BogleHub. Solo viajan al servidor durante el proceso de análisis con IA y se descartan inmediatamente después. No hay registro obligatorio, no se vende información a terceros y se cumple el RGPD europeo.',
  },
  {
    q: '¿Por qué se puede confiar en los datos publicados sobre ETFs?',
    a: 'Los datos básicos de cada ETF (TER, ISIN, política de reparto, domicilio) son verificables públicamente: cualquier usuario puede contrastarlos con la web de la gestora, con JustETF o con el folleto UCITS oficial del fondo. Los grados fiscales son estimaciones educativas basadas en metodología pública (ver /metodologia), no en estimaciones cerradas. Los precios y rentabilidades históricas no se muestran porque cambian constantemente y requieren datos en tiempo real.',
  },
  {
    q: '¿BogleHub es lo mismo que Bogleheads España o Bogleheads.org?',
    a: 'No. BogleHub (boglehub.com) es una plataforma educativa independiente con herramientas, calculadoras y análisis de inversión indexada. Es una entidad distinta de la comunidad y foro Bogleheads España (bogleheads.es) y del proyecto internacional Bogleheads.org. BogleHub comparte la filosofía de inversión indexada de bajo coste de John Bogle, pero no está afiliada a esas comunidades, ni a ninguna gestora, bróker o roboadvisor. Si buscas el foro comunitario español, ese es bogleheads.es; si buscas herramientas y análisis automatizados con datos fiscales para España, ese es BogleHub.',
  },
]

export default function SobrePage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Sobre BogleHub', url: `${BASE_URL}/sobre` },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Sobre BogleHub</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Sobre BogleHub
            </h1>
            <p className="mt-4 text-fg-muted leading-relaxed">
              BogleHub es una plataforma educativa gratuita en español sobre inversión indexada
              para residentes en España. Esta página explica qué es el proyecto, cuál es la
              metodología detrás de los análisis y por qué la información publicada es de
              confianza.
            </p>
          </header>

          {/* Misión */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-fg mb-3">Misión</h2>
            <p className="text-fg-muted leading-relaxed">
              Democratizar el acceso a información práctica de calidad sobre inversión indexada
              en español. La banca tradicional española ha hecho de la opacidad y las comisiones
              altas su modelo. La filosofía Boglehead —fondos indexados de bajo coste, gestión
              pasiva, diversificación global— sigue siendo desconocida o malentendida por la mayor
              parte de inversores particulares en España.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              BogleHub existe para llenar ese hueco: explicar con honestidad cómo funcionan los
              ETFs UCITS, cómo afecta la fiscalidad española a cada producto y cómo construir y
              mantener una cartera indexada sin asesor.
            </p>
          </section>

          {/* Por qué confiar */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-fg mb-3">Por qué confiar en BogleHub</h2>
            <ul className="space-y-3 text-fg-muted">
              <li className="flex gap-3">
                <span className="shrink-0 mt-1 text-accent">✓</span>
                <span>
                  <strong className="text-fg">Independencia editorial real.</strong> Sin
                  comisiones por dirigir tráfico a entidades comerciales. Las opiniones sobre
                  brokers y roboadvisors son honestas, incluyendo críticas cuando aplican.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 mt-1 text-accent">✓</span>
                <span>
                  <strong className="text-fg">Datos verificables.</strong> TER, ISIN y composición
                  de cada ETF son contrastables públicamente con gestoras y JustETF. Los grados
                  fiscales se calculan con metodología documentada y abierta.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 mt-1 text-accent">✓</span>
                <span>
                  <strong className="text-fg">Sin venta de productos.</strong> BogleHub no vende
                  fondos, no es bróker, no es roboadvisor. No tiene incentivo para que compres
                  ningún producto específico.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 mt-1 text-accent">✓</span>
                <span>
                  <strong className="text-fg">Privacidad por diseño.</strong> Tus datos de cartera
                  viven en tu navegador (localStorage), no en servidores de BogleHub. Sin registro
                  obligatorio, sin tracking comercial.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 mt-1 text-accent">✓</span>
                <span>
                  <strong className="text-fg">Actualización continua.</strong> Los tramos del IRPF,
                  los TER de fondos y las novedades regulatorias se actualizan cuando cambian. La
                  fecha de última revisión aparece visible en cada artículo y página clave.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 mt-1 text-accent">✓</span>
                <span>
                  <strong className="text-fg">Comunidad abierta.</strong> El contenido se nutre
                  de las preguntas reales de la comunidad Boglehead española en foros, redes y
                  conversaciones. Si detectas un error, contáctanos: agradecemos las correcciones.
                </span>
              </li>
            </ul>
          </section>

          {/* Contenido publicado */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-fg mb-3">El contenido en cifras</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Card>
                <div className="text-2xl font-bold text-accent">{BLOG_ARTICLES.length}</div>
                <p className="text-xs text-fg-muted">Artículos de blog</p>
              </Card>
              <Card>
                <div className="text-2xl font-bold text-accent">{GLOSSARY_TERMS.length}</div>
                <p className="text-xs text-fg-muted">Términos en el glosario</p>
              </Card>
              <Card>
                <div className="text-2xl font-bold text-accent">68</div>
                <p className="text-xs text-fg-muted">ETFs UCITS analizados</p>
              </Card>
              <Card>
                <div className="text-2xl font-bold text-accent">{ETF_THEMES.length}</div>
                <p className="text-xs text-fg-muted">Categorías de ETF</p>
              </Card>
              <Card>
                <div className="text-2xl font-bold text-accent">{ETF_PAIRS.length}</div>
                <p className="text-xs text-fg-muted">Comparativas curadas</p>
              </Card>
              <Card>
                <div className="text-2xl font-bold text-accent">4</div>
                <p className="text-xs text-fg-muted">Calculadoras gratuitas</p>
              </Card>
            </div>
          </section>

          {/* Metodología */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-fg mb-3">Metodología</h2>
            <p className="text-fg-muted leading-relaxed mb-3">
              Las decisiones de qué publicar y cómo se documentan transparentemente. Los criterios
              principales:
            </p>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li>
                <strong className="text-fg">Datos de ETFs:</strong> obtenidos de fuentes oficiales
                (gestoras, JustETF, folletos UCITS). El TER refleja el coste publicado por la
                gestora; la composición geográfica y sectorial se basa en los reports oficiales
                del fondo.
              </li>
              <li>
                <strong className="text-fg">Grados fiscales (A/B/C/D):</strong> calculados con
                lógica documentada en{' '}
                <Link href="/metodologia" className="text-brand-400 hover:text-brand-300 underline">
                  /metodologia
                </Link>{' '}
                en función del domicilio del ETF y su política de reparto.
              </li>
              <li>
                <strong className="text-fg">Tramos del IRPF:</strong> actualizados a la escala
                vigente en el año en curso (mayo 2026). Cambios normativos se reflejan en cuanto
                se aprueban.
              </li>
              <li>
                <strong className="text-fg">Opiniones sobre productos:</strong> basadas en análisis
                objetivo de comisiones reales, regulación y características públicas. No se aceptan
                pagos ni comisiones por reseñas favorables.
              </li>
              <li>
                <strong className="text-fg">Análisis con IA:</strong> el analizador de carteras
                usa Llama 3.3 70B Versatile a través de Groq. Los prompts y la metodología están
                diseñados para ser educativos, no recomendatorios.
              </li>
            </ul>
            <p className="mt-3 text-sm text-fg-muted">
              Documentación técnica completa:{' '}
              <Link href="/metodologia" className="text-brand-400 hover:text-brand-300 underline">
                /metodologia
              </Link>
              .
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-fg mb-5">Preguntas frecuentes</h2>
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

          {/* CTA */}
          <Card className="text-center">
            <CardTitle className="mb-3">¿Tienes feedback o detectas un error?</CardTitle>
            <p className="text-sm text-fg-muted leading-relaxed mb-4">
              El proyecto vive de la comunidad. Si encuentras un dato incorrecto, una explicación
              confusa o quieres sugerir un tema, escríbenos.
            </p>
            <p className="text-sm text-fg-muted">
              Contacto:{' '}
              <a
                href="mailto:hola@boglehub.com"
                className="text-brand-400 hover:text-brand-300 underline"
              >
                hola@boglehub.com
              </a>
            </p>
          </Card>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Última actualización de esta página: mayo 2026 · Información educativa, no
            asesoramiento financiero.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
