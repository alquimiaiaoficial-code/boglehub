import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de BogleHub: qué datos se tratan, privacidad por diseño (tu cartera vive en tu navegador), newsletter y cumplimiento del RGPD.',
  robots: { index: true, follow: false },
  alternates: { canonical: '/privacidad' },
  openGraph: {
    images: [`/api/og?title=${encodeURIComponent('Política de Privacidad')}&subtitle=${encodeURIComponent('BogleHub')}`],
  },
}

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 prose prose-invert prose-zinc">
          <h1>Política de Privacidad</h1>
          <p className="text-fg-muted">Última actualización: mayo de 2026</p>

          <h2>1. Responsable del tratamiento</h2>
          <p>El responsable del tratamiento de los datos es el titular de BogleHub (proyecto educativo personal).</p>
          <p><strong>Contacto:</strong> alquimiaia.oficial@gmail.com</p>

          <h2>2. Datos que tratamos</h2>
          <p>BogleHub está diseñado para minimizar al máximo la recogida de datos personales:</p>
          <ul>
            <li><strong>Datos de tu cartera (ETFs, participaciones, precios):</strong> se almacenan exclusivamente en el <code>localStorage</code> de tu navegador. <strong>Nunca se guardan en nuestros servidores.</strong></li>
            <li><strong>Datos técnicos durante el análisis:</strong> al pulsar &quot;Analizar&quot;, tus posiciones viajan al servidor para procesar la respuesta IA. Una vez generada la respuesta, se descartan inmediatamente.</li>
            <li><strong>Datos de navegación anónimos:</strong> Vercel registra direcciones IP, navegador y rendimiento por seguridad y operación del servicio. No se asocian a tu cartera.</li>
          </ul>

          <h2>3. Finalidad del tratamiento</h2>
          <ul>
            <li>Generar el análisis de tu cartera con IA</li>
            <li>Garantizar la seguridad y disponibilidad del servicio</li>
          </ul>

          <h2>4. Base legal</h2>
          <p>La base legal del tratamiento es tu consentimiento (Art. 6.1.a RGPD), que prestas al usar el servicio.</p>

          <h2>5. Plazo de conservación</h2>
          <ul>
            <li>Datos de tu cartera: mientras los mantengas en tu navegador (puedes borrarlos en cualquier momento)</li>
            <li>Datos de análisis en servidor: descartados inmediatamente tras procesar la respuesta</li>
            <li>Logs de servidor: máximo 30 días (gestionados por Vercel)</li>
          </ul>

          <h2>6. Destinatarios</h2>
          <p>Los datos son procesados por los siguientes encargados:</p>
          <ul>
            <li><strong>Vercel Inc.</strong> (alojamiento) — servidores en EU</li>
            <li><strong>Groq Inc.</strong> (modelo de IA Llama 3.3) — procesa el contenido del análisis</li>
            <li><strong>Yahoo Finance</strong> (precios de mercado) — solo recibe tickers, no datos personales</li>
          </ul>

          <h2>7. Tus derechos (RGPD)</h2>
          <p>Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición. Al no almacenar datos en servidor, la mayoría de derechos se ejercen directamente desde tu navegador (borrando el <code>localStorage</code>).</p>
          <p>Para consultas sobre privacidad: alquimiaia.oficial@gmail.com</p>

          <h2>8. Reclamaciones</h2>
          <p>Tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener" className="text-brand-400 hover:text-brand-300">www.aepd.es</a>).</p>
        </article>
      </main>
      <Footer />
    </>
  )
}
