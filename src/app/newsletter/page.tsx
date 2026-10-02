import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { NUMEROS_NEWSLETTER } from '@/data/newsletter'
import { horaMadrid } from '@/lib/newsletter-email'
import { numerosPublicados, fechaLarga } from '@/lib/newsletter-web'

const BASE_URL = 'https://boglehub.com'

// Un número aparece aquí el día después de enviarse; con esto la página se rehace sola cada hora.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Newsletter de BogleHub: un correo corto cada martes',
  description:
    'Un correo corto los martes sobre inversión indexada en España: cambios en la fiscalidad, en los fondos y en los brókers, con la fuente de cada dato. Gratis y sin publicidad.',
  alternates: { canonical: '/newsletter' },
}

export default function NewsletterPage() {
  const publicados = numerosPublicados(NUMEROS_NEWSLETTER, horaMadrid(new Date()).fecha)
  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Newsletter', url: `${BASE_URL}/newsletter` },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Newsletter</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Un correo corto cada martes
            </h1>
            <p className="mt-4 text-fg-muted leading-relaxed">
              Lo que cambia para quien invierte en fondos indexados desde España: una ley nueva, un
              fondo que baja comisiones, un bróker que cambia sus tarifas. Cada dato lleva al lado de
              dónde sale, igual que en la web. Si una semana no hay nada que valga la pena, no se
              manda nada.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Es gratis, sin publicidad, y te das de baja con un clic desde cualquier correo. Solo
              guardamos tu email. Información educativa, no asesoramiento financiero.
            </p>
          </header>

          <div className="mb-12">
            <NewsletterSignup />
          </div>

          <section>
            <h2 className="text-2xl font-bold text-fg mb-4">Números anteriores</h2>
            {publicados.length === 0 ? (
              <p className="text-fg-muted leading-relaxed">
                El primero sale el martes 6 de octubre de 2026 y aparecerá aquí al día siguiente.
              </p>
            ) : (
              <ul className="space-y-4">
                {publicados.map((n) => (
                  <li key={n.numero}>
                    <Link href={`/newsletter/${n.numero}`} className="font-semibold text-fg hover:underline">
                      N.º {n.numero}: {n.asunto}
                    </Link>
                    <p className="text-sm text-fg-subtle">
                      {fechaLarga(n.fecha)} · {n.preencabezado}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
