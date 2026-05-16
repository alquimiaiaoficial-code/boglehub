import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { decodePortfolio } from '@/lib/share'
import { ImportSharedPortfolio } from '@/components/ImportSharedPortfolio'
import { formatEUR } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Cartera compartida',
  description: 'Una cartera de fondos indexados compartida en BogleHub.',
  robots: { index: false, follow: true },
}

export default async function CarteraPage({
  searchParams,
}: {
  searchParams: Promise<{ d?: string }>
}) {
  const { d } = await searchParams
  const positions = d ? decodePortfolio(d) : null

  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          {!positions ? (
            <Card className="text-center py-12">
              <CardTitle>Enlace no válido</CardTitle>
              <p className="mt-2 text-fg-muted">
                Este enlace de cartera no es válido o ha caducado.
              </p>
              <Link
                href="/analyzer"
                className="mt-4 inline-block text-brand-400 hover:text-brand-300"
              >
                Crear mi propia cartera →
              </Link>
            </Card>
          ) : (
            <>
              <header className="mb-6">
                <h1 className="text-3xl font-bold text-fg tracking-tight">Cartera compartida</h1>
                <p className="mt-2 text-fg-muted">
                  Alguien ha compartido esta cartera de {positions.length} posiciones contigo.
                </p>
              </header>

              <Card>
                <CardTitle>Posiciones</CardTitle>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-fg-muted text-xs uppercase tracking-wide">
                        <th className="pb-2">Ticker</th>
                        <th className="pb-2 text-right">Participaciones</th>
                        <th className="pb-2 text-right">Precio medio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((p) => (
                        <tr key={p.id} className="border-b border-border/50 last:border-0">
                          <td className="py-2 font-mono font-medium text-fg">{p.ticker}</td>
                          <td className="py-2 text-right font-mono text-fg-muted">{p.shares}</td>
                          <td className="py-2 text-right font-mono text-fg-muted">
                            {p.avgPrice > 0 ? formatEUR(p.avgPrice) : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <ImportSharedPortfolio positions={positions} />
                <p className="text-sm text-fg-subtle">
                  Cópiala a tu analizador para verla en detalle con IA — gratis y sin registro.
                </p>
              </div>

              <p className="mt-8 text-xs text-fg-subtle">
                Información educativa, no asesoramiento financiero.
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
