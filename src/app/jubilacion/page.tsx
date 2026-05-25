import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { FIRE_AGES } from '@/data/fire-ages'

const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Jubilación anticipada en España: planes por edad objetivo (2026)',
  description: `Planes FIRE para jubilarse a los 35, 40, 45, 50, 55, 60 o 65 años en España. Capital necesario, aportación mensual, cartera y consideraciones específicas para cada edad.`,
  alternates: { canonical: '/jubilacion' },
}

export default function JubilacionIndexPage() {
  return (
    <>
      <JsonLd schema={{ type: 'BreadcrumbList', items: [{ name: 'Inicio', url: BASE_URL }, { name: 'Jubilación', url: `${BASE_URL}/jubilacion` }] }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
          <nav className="text-sm text-fg-subtle mb-6"><Link href="/" className="hover:text-fg">Inicio</Link><span className="mx-2">/</span><span className="text-fg">Jubilación</span></nav>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Jubilación anticipada en España</h1>
            <p className="mt-3 text-fg-muted leading-relaxed">Planes FIRE concretos según la edad objetivo de jubilación. Cada uno incluye capital necesario, aportación mensual, cartera recomendada y consideraciones específicas.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FIRE_AGES.map((f) => (
              <Link key={f.slug} href={`/jubilacion/${f.slug}`}>
                <Card className="h-full hover:border-border-strong transition-colors">
                  <h2 className="text-2xl font-bold text-brand-400">A los {f.targetAge}</h2>
                  <p className="text-xs text-fg-muted mt-2">{f.description}</p>
                  <p className="text-xs text-accent mt-3 capitalize">Dificultad: {f.difficulty}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
