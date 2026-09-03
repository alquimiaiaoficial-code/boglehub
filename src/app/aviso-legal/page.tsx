import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de BogleHub: titularidad del sitio, condiciones de uso, propiedad intelectual y naturaleza educativa del contenido sobre inversión indexada.',
  robots: { index: true, follow: false },
  alternates: { canonical: '/aviso-legal' },
  openGraph: {
    images: [`/api/og?title=${encodeURIComponent('Aviso Legal')}&subtitle=${encodeURIComponent('BogleHub')}`],
  },
}

export default function AvisoLegalPage() {
  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 prose prose-invert prose-zinc">
          <h1>Aviso Legal</h1>
          <p className="text-fg-muted">Última actualización: agosto de 2026</p>

          <h2>1. Información general (LSSI-CE)</h2>
          <p>De acuerdo con la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa de los siguientes datos sobre este sitio web:</p>
          <ul>
            <li><strong>Titular del proyecto:</strong> BogleHub (proyecto educativo personal, sin ánimo de lucro)</li>
            <li><strong>Naturaleza del servicio:</strong> Herramienta web gratuita de análisis de carteras de fondos indexados con fines educativos</li>
            <li><strong>Contacto:</strong> boglehub@gmail.com</li>
          </ul>

          <h2>2. Naturaleza del servicio</h2>
          <p>BogleHub es una herramienta de información y educación financiera. <strong>No constituye asesoramiento financiero, fiscal o de inversión.</strong> Los análisis generados son orientativos y se basan en datos proporcionados por el usuario y fuentes públicas (Yahoo Finance, etc.).</p>
          <p>BogleHub no está registrado en la CNMV como empresa de servicios de inversión ni pretende actuar como tal.</p>
          <p>
            Conviene precisar qué significa eso. Según la CNMV, para que algo sea{' '}
            <strong>asesoramiento en materia de inversión</strong> tienen que darse cuatro
            requisitos a la vez: que sea una recomendación con un elemento de opinión, que se
            refiera a instrumentos financieros concretos, que se presente como idónea para esa
            persona atendiendo a sus circunstancias personales, y que no se difunda
            exclusivamente por canales dirigidos al público en general.
          </p>
          <p>
            <strong>BogleHub no reúne esos requisitos y está diseñado para no reunirlos.</strong>{' '}
            No conoce tus circunstancias —ni tu edad, ni tus ingresos, ni tu horizonte, ni tu
            tolerancia al riesgo—, no te dice qué comprar ni qué vender, y es una herramienta
            abierta a cualquiera, no un servicio prestado a una persona concreta. Lo que hace es
            calcular sobre los datos que tú introduces y explicarte qué significan.
          </p>
          <p>
            Ninguna cifra de este sitio es una previsión. Las proyecciones parten de supuestos
            fijos que se indican en cada caso, y la rentabilidad futura es desconocida y puede
            ser negativa.
          </p>

          <h2>2 bis. Uso de inteligencia artificial</h2>
          <p>
            En cumplimiento del artículo 50 del{' '}
            <strong>Reglamento (UE) 2024/1689 de Inteligencia Artificial</strong>, aplicable
            desde el 2 de agosto de 2026, se informa de que este sitio emplea sistemas de IA en
            dos lugares:
          </p>
          <ul>
            <li>
              <strong>El chat</strong> es un sistema de IA, no una persona. Está señalizado en
              la propia interfaz.
            </li>
            <li>
              <strong>La narrativa del analizador</strong> es un texto generado por IA a partir
              de los datos que introduces, y así se indica junto al propio texto.
            </li>
          </ul>
          <p>
            Los modelos de lenguaje pueden equivocarse y afirmar cosas falsas con aparente
            seguridad. Contrasta cualquier dato antes de usarlo, especialmente si es fiscal.
          </p>

          <h2>3. Limitación de responsabilidad</h2>
          <p>El usuario es el único responsable de las decisiones que tome en base a la información mostrada. BogleHub y su titular no se hacen responsables de pérdidas patrimoniales, fiscales o de cualquier otra naturaleza derivadas del uso del servicio.</p>

          <h2>4. Propiedad intelectual</h2>
          <p>Los contenidos, el diseño y el código de BogleHub están protegidos por las leyes de propiedad intelectual aplicables. Queda prohibida su reproducción total o parcial sin autorización expresa del titular.</p>

          <h2>5. Legislación aplicable</h2>
          <p>Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del titular, salvo norma imperativa en contrario.</p>
        </article>
      </main>
      <Footer />
    </>
  )
}
