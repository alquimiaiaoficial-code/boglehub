import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { JsonLd } from '@/components/JsonLd'
import { DescargoFiscal } from '@/components/DescargoFiscal'
import { getIndexFundBySlug } from '@/data/index-funds'
import { FUND_PAIRS, fundPairToSlug } from '@/data/fund-pairs'

const BASE_URL = 'https://boglehub.com'

/**
 * Índice de las comparativas entre fondos indexados.
 *
 * Por qué existe (14-sep-2026). Las 11 páginas `/comparar-fondo/[pair]` estaban en el
 * sitemap, devolvían 200 y **no tenían ni un solo enlace desde ninguna parte del sitio**:
 * `/comparar-fondo` daba 404 y ningún otro fichero las enlazaba. Un rastreo desde la home
 * las encontró huérfanas, las once.
 *
 * No es contenido nuevo ni una página generada por combinatoria: es la puerta que faltaba
 * para un contenido que ya existía. Ese matiz importa en un sitio que perdió el índice por
 * escalar páginas sin autoridad — aquí no se añaden URLs, se conecta lo que había.
 */
export const metadata: Metadata = {
  title: 'Comparar fondos indexados disponibles en España (2026)',
  description:
    'Comparativas entre los fondos indexados que se pueden contratar en España: TER, índice que replican, gestora y qué cambia entre uno y otro para un inversor español.',
  alternates: { canonical: '/comparar-fondo' },
}

export default function CompararFondoIndex() {
  const pares = FUND_PAIRS.map(([a, b]) => ({
    slug: fundPairToSlug(a, b),
    a: getIndexFundBySlug(a),
    b: getIndexFundBySlug(b),
  })).filter((p) => p.a && p.b)

  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Comparar fondos indexados', url: `${BASE_URL}/comparar-fondo` },
          ],
        }}
      />
      <Header />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
          Comparar fondos indexados en España
        </h1>
        <p className="mt-4 text-fg-muted leading-relaxed max-w-3xl">
          Los fondos indexados se traspasan entre sí sin tributar, cosa que los ETF no
          permiten en España. Eso hace que la comparación relevante aquí no sea solo el coste,
          sino qué índice replica cada uno y dónde se puede contratar. Cada página compara dos
          fondos con su TER, su índice y sus diferencias prácticas.
        </p>

        <Card className="mt-8">
          <CardTitle>Comparativas disponibles</CardTitle>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {pares.map(({ slug, a, b }) => (
              <li key={slug}>
                <Link
                  href={`/comparar-fondo/${slug}`}
                  className="block rounded-lg border border-border bg-surface-2 p-3 hover:border-border-strong transition-colors"
                >
                  <span className="text-sm font-medium text-fg">
                    {a!.name} <span className="text-fg-subtle">frente a</span> {b!.name}
                  </span>
                  <span className="mt-1 block text-xs text-fg-subtle">
                    TER {a!.ter.toFixed(2).replace('.', ',')} % · {b!.ter.toFixed(2).replace('.', ',')} %
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <p className="mt-8 text-sm text-fg-muted">
          Si lo que buscas son ETF cotizados en vez de fondos, están en{' '}
          <Link href="/comparar" className="text-brand-400 hover:underline">
            comparar ETFs
          </Link>
          . Y el catálogo completo de fondos, con la ficha de cada uno, en{' '}
          <Link href="/fondo" className="text-brand-400 hover:underline">
            fondos indexados
          </Link>
          .
        </p>

        <DescargoFiscal variant="fiscal" />
      </main>
      <Footer />
    </>
  )
}
