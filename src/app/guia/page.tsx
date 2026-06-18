import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { Check } from 'lucide-react'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Guía gratis: tu primera cartera indexada en España | BogleHub',
  description:
    'Descarga gratis la guía en PDF «Tu primera cartera indexada en España, paso a paso»: cartera, bróker, fiscalidad 2026 y checklist. Solo tu email.',
  alternates: { canonical: '/guia' },
  openGraph: {
    title: 'Guía gratis: tu primera cartera indexada en España',
    description:
      'De cero a tu primera aportación automática: cartera, bróker, fiscalidad 2026 y checklist final. Gratis en PDF.',
    type: 'website',
    locale: 'es_ES',
    images: [
      `/api/og?title=${encodeURIComponent('Tu primera cartera indexada')}&subtitle=${encodeURIComponent('Guía gratis en PDF · BogleHub')}`,
    ],
  },
}

// Landing de conversión pensada para el tráfico de vídeo (link in bio de
// YouTube/TikTok/Reels). Un solo objetivo: captar el email a cambio de la guía.
// Sin nav que distraiga; los UTM del enlace los registra NewsletterSignup.
const INSIDE = [
  'Cómo montar una cartera indexada sencilla (1-3 fondos) y por qué funciona.',
  'Qué bróker elegir en España según tu caso, sin marketing.',
  'Fiscalidad 2026 explicada claro: IRPF del ahorro y traspaso de fondos.',
  'Los 7 errores que arruinan al inversor novato (y cómo evitarlos).',
  'Checklist final para hacer tu primera aportación automática hoy.',
]

export default function GuiaLandingPage() {
  return (
    <div className="bg-bg min-h-screen flex flex-col">
      {/* Cabecera mínima: solo el logo, sin nav, para no distraer del objetivo */}
      <header className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-6">
        <Link href="/" aria-label="BogleHub — inicio">
          <Logo size="md" />
        </Link>
      </header>

      <main className="mx-auto w-full max-w-2xl px-4 sm:px-6 flex-1">
        <section className="pt-4 pb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-wide">
            Guía gratis en PDF
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-fg tracking-tight">
            Tu primera cartera indexada en España, paso a paso
          </h1>
          <p className="mt-4 text-lg text-fg-muted leading-relaxed">
            De cero a tu primera aportación automática. Sin tecnicismos, sin humo y
            con la fiscalidad española al día. Te la enviamos al correo, gratis.
          </p>

          {/* CTA principal arriba del todo (above the fold en móvil) */}
          <div className="mt-6">
            <NewsletterSignup variant="card" />
          </div>

          {/* Qué te llevas */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-fg">Qué hay dentro</h2>
            <ul className="mt-4 space-y-3">
              {INSIDE.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-fg-muted">
                  <Check className="h-5 w-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA secundaria: el producto gratis */}
          <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold text-fg">
              ¿Ya tienes cartera? Analízala gratis
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              Sube tu cartera y BogleHub te dice si está bien diversificada, qué
              comisiones pagas y dónde se solapan tus fondos. Sin registro y tus
              datos no salen de tu navegador.
            </p>
            <Link
              href="/analyzer"
              className="mt-4 inline-flex items-center gap-1 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-500 transition-colors"
            >
              Analizar mi cartera
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className="mt-8 text-xs text-fg-subtle italic">
            Información educativa, no asesoramiento financiero. Sin spam; te das de
            baja con un clic.
          </p>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8 border-t border-border">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-fg-subtle">
          <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
          <Link href="/blog" className="hover:text-fg transition-colors">Blog</Link>
          <Link href="/sobre" className="hover:text-fg transition-colors">Sobre BogleHub</Link>
          <Link href="/privacidad" className="hover:text-fg transition-colors">Privacidad</Link>
          <span className="ml-auto">© 2026 BogleHub</span>
        </div>
      </footer>
    </div>
  )
}
