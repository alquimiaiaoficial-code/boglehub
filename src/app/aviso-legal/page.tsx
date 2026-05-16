import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Aviso Legal',
  robots: { index: true, follow: false },
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
          <p className="text-fg-muted">Última actualización: mayo de 2026</p>

          <h2>1. Información general (LSSI-CE)</h2>
          <p>De acuerdo con la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa de los siguientes datos sobre este sitio web:</p>
          <ul>
            <li><strong>Titular del proyecto:</strong> BogleHub (proyecto educativo personal, sin ánimo de lucro)</li>
            <li><strong>Naturaleza del servicio:</strong> Herramienta web gratuita de análisis de carteras de fondos indexados con fines educativos</li>
            <li><strong>Contacto:</strong> alquimiaia.oficial@gmail.com</li>
          </ul>

          <h2>2. Naturaleza del servicio</h2>
          <p>BogleHub es una herramienta de información y educación financiera. <strong>No constituye asesoramiento financiero, fiscal o de inversión.</strong> Los análisis generados son orientativos y se basan en datos proporcionados por el usuario y fuentes públicas (Yahoo Finance, etc.).</p>
          <p>BogleHub no está registrado en la CNMV como empresa de servicios de inversión ni pretende actuar como tal.</p>

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
