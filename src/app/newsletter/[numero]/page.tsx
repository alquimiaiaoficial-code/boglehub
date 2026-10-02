import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { NUMEROS_NEWSLETTER } from '@/data/newsletter'
import { horaMadrid } from '@/lib/newsletter-email'
import { numerosPublicados, parrafosWeb, trozos, fechaLarga } from '@/lib/newsletter-web'

const BASE_URL = 'https://boglehub.com'

export const revalidate = 3600

// Ninguno se genera en el build: cada número existe en la web solo después de enviarse.
export function generateStaticParams() {
  return []
}

function buscar(numero: string) {
  return numerosPublicados(NUMEROS_NEWSLETTER, horaMadrid(new Date()).fecha).find(
    (n) => String(n.numero) === numero,
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ numero: string }>
}): Promise<Metadata> {
  const n = buscar((await params).numero)
  if (!n) return {}
  return {
    title: `${n.asunto} | Newsletter de BogleHub, n.º ${n.numero}`,
    description: n.preencabezado,
    alternates: { canonical: `/newsletter/${n.numero}` },
  }
}

export default async function NumeroPage({ params }: { params: Promise<{ numero: string }> }) {
  const n = buscar((await params).numero)
  if (!n) notFound()
  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Newsletter', url: `${BASE_URL}/newsletter` },
            { name: `N.º ${n.numero}`, url: `${BASE_URL}/newsletter/${n.numero}` },
          ],
        }}
      />
      <Header />
      <main className="bg-bg min-h-screen">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/newsletter" className="hover:text-fg transition-colors">Newsletter</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">N.º {n.numero}</span>
          </nav>
          <header className="mb-8">
            <p className="text-sm text-fg-subtle">
              N.º {n.numero} · enviado el {fechaLarga(n.fecha)}
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-fg tracking-tight">{n.asunto}</h1>
          </header>
          {parrafosWeb(n).map((p, i) => (
            <p key={i} className="mb-4 text-fg-muted leading-relaxed">
              {trozos(p).map((t, j) =>
                t.href ? (
                  <Link key={j} href={t.href} className="font-semibold text-fg underline">
                    {t.texto}
                  </Link>
                ) : (
                  <span key={j}>{t.texto}</span>
                ),
              )}
            </p>
          ))}
          <p className="mt-6 mb-10 text-sm text-fg-subtle">
            Así salió por correo, con los datos de ese día. Información educativa, no asesoramiento
            financiero.
          </p>
          <NewsletterSignup />
        </article>
      </main>
      <Footer />
    </>
  )
}
