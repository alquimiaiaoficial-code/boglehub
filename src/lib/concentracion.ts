/**
 * Concentración de una cartera indexada (28-sep-2026).
 *
 * Las herramientas de análisis de carteras suelen medir la concentración POR POSICIÓN: el peso
 * de la mayor y el índice HHI (la suma de los pesos al cuadrado). Para un inversor indexado esa
 * medida engaña: una cartera 100 % VWCE da un HHI de 10.000, el máximo posible, y dentro hay
 * miles de empresas de medio mundo. Tener un solo fondo global no es una apuesta concentrada.
 *
 * Lo que sí dice cuánto depende una cartera indexada de una sola cosa es su reparto por
 * REGIÓN, que aquí sí tenemos porque cada producto lleva su exposición. Así que se calculan
 * las dos, y se enseña la de posiciones con su contexto, no como veredicto.
 *
 * Todo es descriptivo: dice cómo está la cartera, no cómo debería estar.
 */

export const NOMBRE_REGION: Record<string, string> = {
  US: 'Estados Unidos',
  EUROPE: 'Europa',
  EM: 'Emergentes',
  JAPAN: 'Japón',
  PACIFIC_EX_JAPAN: 'Pacífico sin Japón',
  UK: 'Reino Unido',
  CHINA: 'China',
  GLOBAL: 'Global',
  OTHER: 'Otras regiones',
}

export interface PosicionValorada {
  ticker: string
  valueEUR: number
  weight: number
}

export interface Concentracion {
  /** HHI por regiones, de 0 a 10.000. */
  hhiRegiones: number
  mayorRegion: { clave: string; nombre: string; peso: number } | null
  /** HHI por posiciones, de 0 a 10.000. */
  hhiPosiciones: number | null
  mayorPosicion: { ticker: string; peso: number } | null
}

function hhi(pesos: number[]): number {
  const total = pesos.reduce((s, w) => s + w, 0)
  if (total <= 0) return 0
  return Math.round(pesos.reduce((s, w) => s + (w / total) ** 2, 0) * 10_000)
}

export function calcularConcentracion(
  porRegion: Partial<Record<string, number>>,
  posiciones?: PosicionValorada[],
): Concentracion {
  const regiones = Object.entries(porRegion).filter((e): e is [string, number] => (e[1] ?? 0) > 0)
  const totalRegiones = regiones.reduce((s, [, w]) => s + w, 0)
  const mayor = [...regiones].sort((a, b) => b[1] - a[1])[0]

  const valoradas = (posiciones ?? []).filter((p) => p.valueEUR > 0)
  const mayorPos = [...valoradas].sort((a, b) => b.weight - a.weight)[0]

  return {
    hhiRegiones: hhi(regiones.map(([, w]) => w)),
    mayorRegion: mayor
      ? { clave: mayor[0], nombre: NOMBRE_REGION[mayor[0]] ?? mayor[0], peso: mayor[1] / totalRegiones }
      : null,
    hhiPosiciones: valoradas.length > 0 ? hhi(valoradas.map((p) => p.valueEUR)) : null,
    mayorPosicion: mayorPos ? { ticker: mayorPos.ticker, peso: mayorPos.weight } : null,
  }
}
