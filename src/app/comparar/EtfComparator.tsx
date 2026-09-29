'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card, CardTitle } from '@/components/ui/Card'
import { SelectorProducto } from '@/components/SelectorProducto'
import {
  resolverProducto,
  solapamientoPorRegion,
  type ProductoComparable,
} from '@/lib/producto-comparable'
import type { AssetClass, Region } from '@/types/etf'
import { MessageSquare } from 'lucide-react'
import { formatPct } from '@/lib/utils'

const REGION_LABELS: Record<Region, string> = {
  US: 'EE.UU.',
  EUROPE: 'Europa',
  EM: 'Emergentes',
  JAPAN: 'Japón',
  GLOBAL: 'Global',
  UK: 'Reino Unido',
  PACIFIC_EX_JAPAN: 'Pacífico ex-Japón',
  CHINA: 'China',
  OTHER: 'Otros',
}

const CLASE_LABELS: Record<AssetClass, string> = {
  EQUITY: 'Renta variable',
  BOND: 'Renta fija',
  COMMODITY: 'Materias primas',
  REIT: 'Inmobiliario cotizado',
  CASH: 'Liquidez',
  MIXED: 'Mixto',
}

const REGION_COLORS = [
  '#3b82f6',
  '#10b981',
  '#60a5fa',
  '#34d399',
  '#fbbf24',
  '#f87171',
  '#a78bfa',
  '#fb923c',
  '#94a3b8',
]

function regionPieData(p: ProductoComparable) {
  return Object.entries(p.regiones)
    .filter(([, v]) => (v ?? 0) > 0)
    .map(([key, value]) => ({
      name: REGION_LABELS[key as Region] ?? key,
      value: Math.round((value ?? 0) * 100),
    }))
}

function InfoRow({ label, a, b }: { label: string; a: string; b: string }) {
  return (
    <tr className="border-b border-border/50">
      <td className="py-2 text-fg-muted text-sm">{label}</td>
      <td className="py-2 text-center font-mono text-sm text-fg">{a}</td>
      <td className="py-2 text-center font-mono text-sm text-fg">{b}</td>
    </tr>
  )
}

/** Qué decir debajo de un campo según lo que haya escrito. */
function AvisoCampo({ texto, producto, letra }: { texto: string; producto: ReturnType<typeof resolverProducto>; letra: string }) {
  if (texto.trim().length < 2) return null
  if (!producto) {
    return (
      <p className="mt-2 text-xs text-warn">
        {letra}: no lo encontramos en el catálogo. Elígelo de la lista o prueba con su ticker o su ISIN.
      </p>
    )
  }
  if (producto.estado === 'noAnalizable') {
    return (
      <p className="mt-2 text-xs text-warn leading-relaxed">
        {letra}: reconocemos {producto.nombre}, pero no lo comparamos. {producto.motivo}
      </p>
    )
  }
  return null
}

export function EtfComparator() {
  const [textoA, setTextoA] = useState('')
  const [textoB, setTextoB] = useState('')

  const resueltoA = useMemo(() => resolverProducto(textoA), [textoA])
  const resueltoB = useMemo(() => resolverProducto(textoB), [textoB])
  const a = resueltoA?.estado === 'ok' ? resueltoA : null
  const b = resueltoB?.estado === 'ok' ? resueltoB : null

  const overlap = useMemo(() => (a && b ? solapamientoPorRegion(a, b) : null), [a, b])
  const pieA = useMemo(() => (a ? regionPieData(a) : []), [a])
  const pieB = useMemo(() => (b ? regionPieData(b) : []), [b])

  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Comparar ETFs y fondos indexados en España
            </h1>
            <p className="mt-2 text-fg-muted max-w-2xl">
              Compara dos productos lado a lado: ETFs UCITS, fondos indexados y sus clases. TER,
              tipo de producto, si se puede traspasar sin tributar, reparto por región y
              solapamiento para el inversor residente en España. Sin registro.
            </p>
          </header>

          <Card className="mb-6">
            <CardTitle className="mb-4">Elige dos productos</CardTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <SelectorProducto
                  etiqueta="Producto A"
                  valor={textoA}
                  onCambio={setTextoA}
                  onElegir={(o) => setTextoA(o.valor.toUpperCase())}
                />
                <AvisoCampo texto={textoA} producto={resueltoA} letra="A" />
              </div>
              <div>
                <SelectorProducto
                  etiqueta="Producto B"
                  valor={textoB}
                  onCambio={setTextoB}
                  onElegir={(o) => setTextoB(o.valor.toUpperCase())}
                />
                <AvisoCampo texto={textoB} producto={resueltoB} letra="B" />
              </div>
            </div>
          </Card>

          {a && b && (
            <>
              {/* Solapamiento */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`rounded-xl border px-5 py-3 text-center ${
                    (overlap ?? 0) > 70
                      ? 'border-danger/30 bg-danger-dim text-danger'
                      : (overlap ?? 0) > 40
                      ? 'border-warn/30 bg-warn/10 text-warn'
                      : 'border-accent/30 bg-accent/10 text-accent'
                  }`}
                >
                  <p className="text-3xl font-bold font-mono">{overlap}%</p>
                  <p className="text-xs mt-1">Solapamiento estimado por región</p>
                </div>
                <p className="text-sm text-fg-muted max-w-sm">
                  {(overlap ?? 0) > 70
                    ? 'Alto: los dos invierten en las mismas regiones y en proporciones muy parecidas.'
                    : (overlap ?? 0) > 40
                    ? 'Moderado: comparten parte de las regiones y cada uno tiene exposición que el otro no da.'
                    : 'Bajo: invierten sobre todo en regiones distintas.'}{' '}
                  Mide exposición por región, no empresas en común.
                </p>
              </div>

              {/* Tabla */}
              <Card className="mb-6">
                <CardTitle className="mb-4">Ficha comparativa</CardTitle>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-xs uppercase tracking-wide text-fg-muted">
                        <th className="pb-3 text-left pr-4">Campo</th>
                        <th className="pb-3 text-center pr-4">{a.clave}</th>
                        <th className="pb-3 text-center">{b.clave}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <InfoRow label="Nombre" a={a.nombre} b={b.nombre} />
                      <InfoRow label="Tipo" a={a.tipo} b={b.tipo} />
                      <InfoRow label="ISIN" a={a.isin ?? '—'} b={b.isin ?? '—'} />
                      <InfoRow label="TER" a={`${formatPct(a.ter / 100, 2)}`} b={`${formatPct(b.ter / 100, 2)}`} />
                      <InfoRow label="Clase de activo" a={CLASE_LABELS[a.claseActivo]} b={CLASE_LABELS[b.claseActivo]} />
                      <InfoRow label="Divisa" a={a.divisa} b={b.divisa} />
                      <InfoRow label="Reparto" a={a.reparto} b={b.reparto} />
                      <InfoRow
                        label="Traspaso sin tributar"
                        a={a.traspasoSinTributar ? 'Sí' : 'No'}
                        b={b.traspasoSinTributar ? 'Sí' : 'No'}
                      />
                    </tbody>
                  </table>
                </div>
                {(a.traspasoSinTributar || b.traspasoSinTributar) && (
                  <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
                    Traspaso: el artículo 94.1.a) de la Ley del IRPF permite pasar el dinero de un
                    fondo a otro sin tributar la ganancia en ese momento, que se aplaza hasta la venta
                    definitiva, siempre que se tramite como traspaso entre entidades. Un ETF o un ETC
                    no lo admiten: cambiar de producto exige vender, y la ganancia tributa ese año.
                    Esto describe la norma; no es una recomendación.
                  </p>
                )}
                {[a, b].filter((p) => p.notaExposicion).map((p, i) => (
                  <p key={`${i}-${p.clave}`} className="mt-2 text-xs text-fg-subtle leading-relaxed">
                    {p.nombre}: {p.notaExposicion}
                  </p>
                ))}
              </Card>

              {/* Tartas por región */}
              <Card className="mb-6">
                <CardTitle className="mb-4">Distribución geográfica</CardTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { p: a, data: pieA },
                    { p: b, data: pieB },
                  ].map(({ p, data }, i) => (
                    <div key={`${i}-${p.clave}`}>
                      <p className="text-center text-sm font-semibold text-fg mb-2 truncate" title={p.nombre}>{p.clave}</p>
                      <div className="h-64">
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie
                              data={data}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              paddingAngle={2}
                              stroke="#0a0a0a"
                              strokeWidth={2}
                            >
                              {data.map((_, j) => (
                                <Cell key={j} fill={REGION_COLORS[j % REGION_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(v) => [`${Number(v)}%`, '']}
                              contentStyle={{
                                background: '#1a1a2e',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 8,
                                fontSize: 12,
                              }}
                            />
                            <Legend
                              wrapperStyle={{ color: '#a1a1aa', fontSize: '11px' }}
                              iconType="circle"
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Chat: explica, no decide. Hasta el 29-sep-2026 aquí se prometía que el chat daba
                  una recomendación personalizada sobre cuál elegir, que es justo lo que BogleHub
                  no puede ofrecer (CUMPLIMIENTO-LEGAL.md §1). */}
              <Card className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-fg">¿Dudas sobre cómo leer esta comparativa?</p>
                  <p className="text-sm text-fg-muted">
                    El chat te explica qué mide cada dato. No recomienda productos ni decide por ti.
                  </p>
                </div>
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 text-sm font-medium transition-colors shrink-0"
                >
                  <MessageSquare className="h-4 w-4" />
                  Preguntar al chat
                </Link>
              </Card>
            </>
          )}

          {(!a || !b) && (
            <Card className="text-center py-16">
              <p className="text-fg-muted">Elige dos productos para empezar la comparativa.</p>
              <p className="text-xs text-fg-subtle mt-1">
                Prueba: VWCE frente a un fondo del MSCI World, o CSPX frente a SXR8
              </p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
