import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Términos de uso',
  robots: { index: true, follow: false },
  alternates: { canonical: '/terminos' },
}

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 prose prose-invert prose-zinc">
          <h1>Términos de Uso</h1>
          <p className="text-fg-muted">Última actualización: mayo de 2026</p>

          <h2>1. Aceptación</h2>
          <p>Al usar BogleHub aceptas estos términos. Si no estás de acuerdo, no uses el servicio.</p>

          <h2>2. Descripción del servicio</h2>
          <p>BogleHub es una herramienta gratuita de análisis educativo de carteras de fondos indexados (ETFs). Genera estadísticas y narrativas con IA sobre la composición de la cartera que introduce el usuario.</p>

          <h2>3. No es asesoramiento financiero</h2>
          <p><strong>BogleHub no proporciona asesoramiento financiero, fiscal ni de inversión.</strong> Toda la información mostrada tiene carácter exclusivamente educativo. Las decisiones de inversión que tomes son tu responsabilidad exclusiva.</p>
          <p>Para asesoramiento personalizado consulta a un asesor financiero registrado en la CNMV.</p>

          <h2>4. Uso aceptable</h2>
          <p>El usuario se compromete a:</p>
          <ul>
            <li>Usar el servicio con fines legítimos</li>
            <li>No intentar saturar o atacar el servicio</li>
            <li>No usar la información para inducir a otros a tomar decisiones financieras</li>
            <li>Tener la edad legal exigida en su jurisdicción para tomar decisiones financieras</li>
          </ul>

          <h2>5. Limitación de responsabilidad</h2>
          <p>El servicio se proporciona &quot;tal cual&quot;, sin garantías de ningún tipo. BogleHub no garantiza:</p>
          <ul>
            <li>La exactitud de los precios obtenidos de fuentes externas (Yahoo Finance)</li>
            <li>La exactitud o veracidad del análisis generado por IA (los modelos pueden contener errores o alucinaciones)</li>
            <li>La disponibilidad ininterrumpida del servicio</li>
          </ul>
          <p>BogleHub no será responsable de daños directos, indirectos, lucro cesante o pérdidas patrimoniales derivadas del uso del servicio.</p>

          <h2>6. Privacidad</h2>
          <p>El tratamiento de datos se rige por nuestra <a href="/privacidad" className="text-brand-400 hover:text-brand-300">Política de Privacidad</a>.</p>

          <h2>7. Modificaciones</h2>
          <p>BogleHub puede modificar estos términos en cualquier momento. La fecha de última actualización se indica al inicio del documento.</p>

          <h2>8. Suspensión y terminación</h2>
          <p>BogleHub puede suspender o terminar el acceso al servicio a cualquier usuario que viole estos términos o cause daño al servicio.</p>

          <h2>9. Legislación y jurisdicción</h2>
          <p>Estos términos se rigen por la ley española. Para cualquier disputa, las partes se someten a los juzgados de España.</p>
        </article>
      </main>
      <Footer />
    </>
  )
}
