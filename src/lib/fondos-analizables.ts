import { INDEX_FUNDS, type IndexFund } from '@/data/index-funds'
import { getEtfByTicker } from './etf-database'
import type { EtfMetadata } from '@/types/etf'

/**
 * Hace analizables los fondos indexados, que hasta ahora el analizador no leía.
 *
 * POR QUÉ IMPORTA MÁS QUE UN HUECO CUALQUIERA. Luis Ángel Hernández (Salud Financiera,
 * ex-Rankia, 1.000+ artículos) lo dijo el 17-sep-2026 por correo, preguntado directamente:
 * «En España la mayoría de personas invierten en fondos no en ETFs, por lo que la mayoría
 * de carteras están compuestas de fondos de inversión». El analizador leía 68 ETFs y cero
 * fondos: no le servía a la mayoría del mercado al que apunta.
 *
 * CÓMO SE CALCULA LA EXPOSICIÓN, Y POR QUÉ ES LEGÍTIMO. Un fondo indexado no publica aquí
 * su reparto por región y sector, pero sí el índice que replica. Dos productos que siguen
 * el mismo índice tienen la misma exposición, así que se toma la del ETF del catálogo que
 * replica ese índice. No es un atajo: es la definición de fondo indexado.
 *
 * LO QUE NO SE HEREDA DEL ETF:
 *  · el TER es el del fondo, siempre. Son productos distintos con comisiones distintas.
 *  · la fiscalidad: el fondo se traspasa sin tributar y el ETF no. Es la diferencia que
 *    hace que media España invierta en fondos, y sería absurdo perderla al analizarlos.
 *
 * EL `etfEquivalent` DE `index-funds.ts` NO SIRVE PARA ESTO Y NO SE USA AQUÍ.
 * Se puso para enlazar páginas entre sí, no para calcular, y al revisarlo uno por uno el
 * 17-sep tres de los doce eran malos para un cálculo de exposición. El peor: Vanguard
 * Eurozone Stock replica MSCI EMU y apuntaba a MEUD, que es MSCI Europe —con Reino Unido,
 * Suiza y Suecia dentro—. Eso no es una aproximación, es otra cosa. Esta tabla es
 * independiente y explícita, y cada fila dice de qué calidad es.
 */

/** Qué confianza merece la equivalencia de índice. Se muestra al usuario, no se esconde. */
export type CalidadEquivalencia =
  /** Mismo índice, mismo universo: la exposición es la misma por definición. */
  | 'exacta'
  /** Universo comparable pero índice de otro proveedor o de distinta amplitud. */
  | 'aproximada'

interface Equivalencia {
  /** Ticker del ETF del catálogo cuyo reparto por región y sector se toma prestado. */
  ticker: string
  calidad: CalidadEquivalencia
  /** Por qué. Se enseña al usuario cuando la calidad es aproximada. */
  nota?: string
}

/**
 * Fondo (por ISIN) -> ETF cuya exposición se usa.
 *
 * La clave es el ISIN y no el slug porque es lo que el inversor tiene delante en su
 * plataforma, y porque un slug se renombra sin que nadie lo note.
 */
const EQUIVALENCIAS: Record<string, Equivalencia> = {
  // --- Exactas: el fondo y el ETF siguen el mismo índice ---
  // Vanguard Global Stock Index Fund - MSCI World
  IE00B03HCZ61: { ticker: 'IWDA', calidad: 'exacta' },
  // Fidelity MSCI World Index Fund - MSCI World
  IE00BYX5MX67: { ticker: 'IWDA', calidad: 'exacta' },
  // Vanguard U.S. 500 Stock Index Fund - S&P 500
  IE0032126645: { ticker: 'CSPX', calidad: 'exacta' },
  // Amundi Index MSCI Emerging Markets - MSCI EM (sin small caps)
  LU0996177134: { ticker: 'AEEM', calidad: 'exacta' },
  // Fidelity Emerging Markets Index Fund - MSCI EM
  IE00BYX5L514: { ticker: 'AEEM', calidad: 'exacta' },
  // Vanguard Global Bond Index Fund EUR Hedged - Bloomberg Global Aggregate EUR H
  IE00B18GC888: { ticker: 'AGGH', calidad: 'exacta' },
  /**
   * Vanguard Emerging Markets Stock Index Fund - MSCI Emerging Markets.
   *
   * Estuvo en la lista de «no analizables» desde el 17-sep porque sospeché que replicaba un
   * índice FTSE: Vanguard usa FTSE en sus ETFs de emergentes y el `etfEquivalent` del
   * catálogo apuntaba a VFEM, que es FTSE Emerging. La sospecha era razonable y era FALSA.
   *
   * Comprobado el 18-sep-2026 en la FUENTE PRIMARIA —el factsheet de Vanguard del 31 de
   * agosto de 2026, que trae este ISIN—: «seeks to track the performance of the MSCI
   * Emerging Markets Index (the "Index"). The Index is a market-capitalisation-weighted
   * index comprised of large and mid-sized company stocks in emerging markets». Ticker del
   * índice, MSDEEEMN. Nuestra ficha estaba bien; el `etfEquivalent` estaba mal.
   *
   * «Large and mid-sized», o sea SIN small caps, que es justo lo que AEEM replica y lo que
   * EIMI (MSCI EM IMI) no: por eso la equivalencia es exacta con AEEM y habría sido
   * aproximada con el que había puesto.
   *
   * Y la lección, que vale más que el fondo: una búsqueda web devolvía «MSCI Emerging
   * Markets» pero mezclando fichas del fondo ESTADOUNIDENSE (VEMAX) con el irlandés, y
   * describía 25 países «incluida Rusia», que salió de los índices en 2022. La respuesta
   * correcta por la fuente equivocada sigue siendo una fuente equivocada.
   */
  IE0031786142: { ticker: 'AEEM', calidad: 'exacta' },

  // --- Aproximadas: universo comparable, índice distinto ---
  LU1931974692: {
    ticker: 'SWRD',
    calidad: 'aproximada',
    nota: 'El fondo replica el Solactive GBS Global Markets Large & Mid Cap y la exposición se toma del MSCI World. El universo es el mismo —grandes y medianas de mercados desarrollados— pero los índices son de proveedores distintos y no coinciden empresa por empresa.',
  },
  LU2050633988: {
    ticker: 'CSPX',
    calidad: 'aproximada',
    nota: 'El fondo replica el Solactive GBS United States y la exposición se toma del S&P 500. Ambos son grandes empresas estadounidenses, pero el S&P 500 aplica un comité de selección y el Solactive va puramente por capitalización.',
  },
  LU2089238385: {
    ticker: 'SJPA',
    calidad: 'aproximada',
    nota: 'El fondo replica el Solactive GBS Japan y la exposición se toma del MSCI Japan IMI, que además incluye pequeña capitalización. La geografía es la misma; el tamaño medio de las empresas, no exactamente.',
  },
  LU1437015735: {
    ticker: 'VGEA',
    calidad: 'aproximada',
    nota: 'Deuda pública de la eurozona en los dos casos, pero los índices no son el mismo y la composición por país y por plazo puede diferir.',
  },
}

/**
 * Fondos que NO se analizan, con el motivo. Preferimos negarnos a dar un número que darlo
 * mal: quien pega una cartera no puede saber que la equivalencia era floja.
 */
const SIN_EQUIVALENCIA_FIABLE: Record<string, string> = {
  // Vanguard Eurozone Stock Index Fund
  IE0007987690:
    'Este fondo replica el MSCI EMU, que es solo la eurozona, y en el catálogo no hay ningún ETF de ese índice: los que hay son MSCI Europe, que incluye Reino Unido, Suiza y Suecia. La diferencia es demasiado grande para llamarla aproximación.',
}

export interface FondoAnalizable {
  fondo: IndexFund
  /** ETF del catálogo cuyo reparto por región y sector se usa. */
  etfExposicion: EtfMetadata
  calidad: CalidadEquivalencia
  nota?: string
}

/** Un fondo reconocido del catálogo que, a propósito, no se analiza todavía. */
export interface FondoNoAnalizable {
  fondo: IndexFund
  motivo: string
}

function normalizar(entrada: string): string {
  return entrada.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
}

/** Busca un fondo del catálogo por ISIN o por slug. Devuelve null si no es un fondo. */
export function buscarFondo(entrada: string): IndexFund | null {
  const clave = normalizar(entrada)
  if (clave.length === 0) return null
  return (
    INDEX_FUNDS.find((f) => normalizar(f.isin) === clave) ??
    INDEX_FUNDS.find((f) => normalizar(f.slug) === clave) ??
    null
  )
}

export type ResolucionFondo =
  | { analizable: FondoAnalizable }
  | { noAnalizable: FondoNoAnalizable }

/**
 * Resuelve un fondo a lo que hace falta para analizarlo.
 *
 * Devuelve `null` si la entrada no es un fondo del catálogo (entonces es cosa del catálogo
 * de ETFs), y `noAnalizable` si es un fondo conocido que a propósito no se analiza.
 */
export function resolverFondo(entrada: string): ResolucionFondo | null {
  const fondo = buscarFondo(entrada)
  if (!fondo) return null

  const isin = normalizar(fondo.isin)

  const motivo = SIN_EQUIVALENCIA_FIABLE[isin]
  if (motivo) return { noAnalizable: { fondo, motivo } }

  const eq = EQUIVALENCIAS[isin]
  if (!eq) {
    return {
      noAnalizable: {
        fondo,
        motivo:
          'Todavía no hemos comprobado con qué ETF del catálogo comparte índice, así que no podemos calcular su exposición sin inventárnosla.',
      },
    }
  }

  const etf = getEtfByTicker(eq.ticker)
  if (!etf) {
    // Defensa real, no teórica: si alguien retira ese ETF del catálogo, esto evita que el
    // fondo se analice con una exposición vacía y el resultado salga en silencio a cero.
    return {
      noAnalizable: {
        fondo,
        motivo: `La exposición de este fondo se calculaba a partir del ETF ${eq.ticker}, que ya no está en el catálogo.`,
      },
    }
  }

  return { analizable: { fondo, etfExposicion: etf, calidad: eq.calidad, nota: eq.nota } }
}

/** Todos los fondos que hoy se pueden analizar. Para tests y para la interfaz. */
export function fondosAnalizables(): FondoAnalizable[] {
  const salida: FondoAnalizable[] = []
  for (const f of INDEX_FUNDS) {
    const r = resolverFondo(f.isin)
    if (r && 'analizable' in r) salida.push(r.analizable)
  }
  return salida
}

/**
 * ISINs cubiertos por alguna de las dos tablas. Existe para que el test pueda comprobar
 * que todos corresponden a un fondo real del catálogo.
 *
 * NO es un adorno: el 17-sep-2026, al escribir las tablas de arriba, **ocho de los doce
 * ISINs se escribieron de memoria y no existían**. La tabla habría compilado, los tipos
 * habrían pasado, y ni un solo fondo se habría analizado nunca — sin error, sin aviso, en
 * silencio. Un ISIN mal escrito no se distingue a ojo de uno bien escrito.
 */
export function isinsClasificados(): { conEquivalencia: string[]; sinEquivalencia: string[] } {
  return {
    conEquivalencia: Object.keys(EQUIVALENCIAS),
    sinEquivalencia: Object.keys(SIN_EQUIVALENCIA_FIABLE),
  }
}

/** Los tickers de ETF de los que depende esta tabla. Para el test. */
export function tickersDeExposicion(): string[] {
  return [...new Set(Object.values(EQUIVALENCIAS).map((e) => e.ticker))]
}

/**
 * Busca fondos por texto, para el autocompletado del formulario.
 *
 * Devuelve también los que hoy no se analizan: quien escribe «Vanguard Eurozone» necesita
 * enterarse de que lo conocemos y de por qué no lo analizamos. Esconderlo del buscador haría
 * pensar que no existe, y el usuario probaría otras cinco formas de escribirlo.
 */
export function buscarFondosPorTexto(query: string): ResolucionFondo[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const encontrados = INDEX_FUNDS.filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.isin.toLowerCase().includes(q) ||
      f.manager.toLowerCase().includes(q) ||
      f.index.toLowerCase().includes(q),
  ).slice(0, 8)
  return encontrados
    .map((f) => resolverFondo(f.isin))
    .filter((r): r is ResolucionFondo => r != null)
}

/** ¿Lo que ha escrito el usuario es un fondo? Lo usa el formulario para pedir euros. */
export function esFondoIndexado(entrada: string): boolean {
  return buscarFondo(entrada) != null
}
