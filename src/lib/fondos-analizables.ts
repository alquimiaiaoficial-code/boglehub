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
/**
 * ⚠️ REGLA DURA, ESCRITA EL 18-sep-2026 DESPUÉS DE UN FALLO CARO.
 *
 * Aquí solo entra un fondo cuyos datos —nombre, índice y TER— se hayan comprobado en una
 * fuente EXTERNA, con la fecha puesta. No basta con que el ISIN exista en nuestro catálogo.
 *
 * POR QUÉ. El catálogo `index-funds.ts` se escribió como CONTENIDO para posicionar —páginas
 * `/fondo/[slug]` de alta intención de búsqueda— y sus datos nunca se verificaron contra una
 * fuente. El 17-sep los convertí en la base de un CÁLCULO sin comprobarlos, y el 18-sep, al
 * ir a ampliar el catálogo, salió esto:
 *
 *  · `IE00BYX5MX67` estaba como «Fidelity MSCI World Index Fund, MSCI World, TER 0,12 %» y
 *    es «FIDELITY S&P 500 INDEX FUND P-ACC-EUR», índice S&P 500, TER 0,06 %. Durante un día
 *    el analizador le dio en producción exposición MSCI World —71 % EEUU, 16 % Europa, 7 %
 *    Japón— a un fondo que es 100 % Estados Unidos, y un TER del doble del real. Además
 *    calculó un solapamiento del 100 % con un MSCI World que es falso.
 *  · `LU0996177134` figura como «Amundi Index MSCI Emerging Markets, TER 0,20 %» y el
 *    registro dice «AMUNDI CORE MSCI Emerging Markets AE CAP», TER 0,30 %. Gamas distintas.
 *  · `IE00BYX5L514` y `LU1931974692` no aparecían en el registro español consultado. Del
 *    primero se dio por hecho que era un límite de la fuente. No lo era: su dígito de control
 *    no cuadra, así que NO ES UN ISIN y no podía existir. El fondo sí existe y es
 *    `IE00BYX5M476`. Ver `isin.ts`: un barrido encontró siete ISINs imposibles en el
 *    repositorio, cinco de ellos en el catálogo de ETFs.
 *
 * LA LECCIÓN, que vale para todo el proyecto: **usar para calcular unos datos que se
 * escribieron para posicionar.** Un dato de ficha que está mal se nota poco; el mismo dato
 * alimentando un cálculo produce números plausibles y falsos, que es mucho peor.
 *
 * Y el test que tenía no lo habría cazado nunca: comprobaba que los ISINs EXISTIERAN en
 * nuestro catálogo, no que los datos del catálogo fuesen ciertos. Verificaba la coherencia
 * interna de una fuente sin verificar la fuente.
 */
const EQUIVALENCIAS: Record<string, Equivalencia> = {
  /**
   * Vanguard Global Stock Index Fund - MSCI World.
   * Verificado el 18-sep-2026: «VANGUARD GLOBAL STOCK INDEX INVESTOR EUR CAP | MSCI World
   * Index | 0,18 %».
   */
  IE00B03HCZ61: { ticker: 'IWDA', calidad: 'exacta' },

  /**
   * Vanguard U.S. 500 Stock Index Fund - S&P 500.
   * Verificado el 18-sep-2026: «VANGUARD U.S. 500 STOCK INDEX GENERAL EUR CAP | S&P 500
   * Index | 0,10 %».
   */
  IE0032126645: { ticker: 'CSPX', calidad: 'exacta' },

  /**
   * Vanguard Emerging Markets Stock Index Fund - MSCI Emerging Markets.
   * Verificado el 18-sep-2026 en el factsheet de Vanguard del 31 de agosto de 2026, que
   * trae este ISIN: «seeks to track the performance of the MSCI Emerging Markets Index [...]
   * large and mid-sized company stocks». Ticker del índice, MSDEEEMN.
   *
   * «Large and mid-sized», sin small caps: por eso AEEM (MSCI EM) y no EIMI (MSCI EM IMI).
   */
  IE0031786142: { ticker: 'AEEM', calidad: 'exacta' },

  /**
   * FIDELITY S&P 500 INDEX FUND P-ACC-EUR - S&P 500.
   *
   * Este es el fondo que estaba mal: el catálogo lo llamaba «Fidelity MSCI World Index Fund»
   * con índice MSCI World y TER 0,12 %. Verificado el 18-sep-2026 en el registro: es un
   * S&P 500 con TER 0,06 %. Nombre, índice y comisión, los tres equivocados.
   *
   * Se corrige en vez de retirarse porque el dato verdadero SÍ se conoce, y un S&P 500 tiene
   * equivalencia exacta con CSPX. El nombre y el TER se arreglan en `index-funds.ts`.
   */
  IE00BYX5MX67: { ticker: 'CSPX', calidad: 'exacta' },

  /**
   * Vanguard European Stock Index Fund - MSCI Europe.
   *
   * ESTABA EN LA LISTA DE NO ANALIZABLES, Y EL MOTIVO ERA FALSO. El 17-sep lo excluí
   * escribiendo «replica el MSCI EMU y en el catálogo no hay ningún ETF de ese índice; los
   * que hay son MSCI Europe». Verificado el 18-sep en el registro: se llama «VANGUARD
   * EUROPEAN STOCK INDEX INVESTOR EUR CAP» y replica **MSCI Europe**, del que tenemos tres
   * ETFs. Nuestra propia ficha decía MSCI EMU, y de ahí salió la exclusión.
   *
   * O sea: excluí un fondo por una razón que solo existía en nuestro dato equivocado. La
   * decisión de no analizarlo fue prudente por casualidad; el motivo escrito era falso, y eso
   * es peor que no haberlo escrito, porque parecía resuelto.
   *
   * IMEU y no MEUD: los dos replican el MSCI Europe, pero IMEU es de acumulación como el
   * fondo y MEUD de distribución. Para el reparto por región da igual; para no confundir a
   * quien compare las dos fichas, no.
   */
  IE0007987690: { ticker: 'IMEU', calidad: 'exacta' },

  /**
   * Vanguard Global Bond Index Fund EUR Hedged - Bloomberg Global Aggregate Float Adjusted.
   *
   * APROXIMADA y no exacta, a propósito. Verificado el 18-sep: el fondo replica el «Bloomberg
   * Global Aggregate **Float Adjusted and Scaled**» y AGGH el «Global Aggregate» sin más. Son
   * variantes del mismo índice base y la exposición por región será casi idéntica, pero la
   * regla de esta tabla es que «exacta» significa el MISMO índice. Casi el mismo no es el
   * mismo, y el día que alguien pregunte por la diferencia conviene que lo pusiera aquí.
   */
  /**
   * FIDELITY MSCI EMERGING MARKETS INDEX FUND P-ACC-EUR - MSCI Emerging Markets.
   *
   * Estuvo en la lista de no analizables con un motivo equivocado: «no aparece en el registro
   * consultado, puede ser un límite de esa fuente». No era un límite de la fuente. El ISIN que
   * teníamos, `IE00BYX5L514`, no supera el dígito de control, así que no existía. El fondo sí
   * existe, es `IE00BYX5M476`, y está en ese mismo registro con el índice y el TER que
   * decíamos. Es decir: buscamos un producto real con un identificador imposible y
   * concluimos que fallaba el registro.
   *
   * AEEM y no EIMI: replica el MSCI Emerging Markets estándar (large y mid), no el IMI.
   */
  IE00BYX5M476: { ticker: 'AEEM', calidad: 'exacta' },

  /**
   * AMUNDI CORE MSCI EMERGING MARKETS AE CAP - MSCI Emerging Markets.
   *
   * También estuvo fuera, y el motivo era razonable pero incompleto: «el índice coincide, el
   * nombre y la comisión no, son gamas distintas, hasta aclararlo no se analiza». Lo que
   * faltaba por ver es que el ISIN SÍ es válido y el registro devuelve siempre el mismo
   * producto: no había ambigüedad que aclarar, había una ficha nuestra mal escrita. El ISIN
   * identifica; el nombre que le pusimos nosotros, no.
   */
  LU0996177134: { ticker: 'AEEM', calidad: 'exacta' },

  IE00B18GC888: {
    ticker: 'AGGH',
    calidad: 'aproximada',
    nota: 'El fondo replica el Bloomberg Global Aggregate Float Adjusted and Scaled y la exposición se toma del Global Aggregate sin ese ajuste. Es el mismo universo de renta fija global cubierta a euros, pero el ajuste por capital flotante cambia algo los pesos.',
  },
}

/**
 * Fondos que NO se analizan, con el motivo. Preferimos negarnos a dar un número que darlo
 * mal: quien pega una cartera no puede saber que la equivalencia era floja.
 */
const SIN_EQUIVALENCIA_FIABLE: Record<string, string> = {
  /*
   * Los tres de aquí abajo NO son fondos: son ETFs que el catálogo publicaba como fondos.
   * Tenían el mensaje genérico de «todavía no hemos comprobado sus datos», que había dejado
   * de ser cierto: sí los hemos comprobado, y lo que sabemos es justo lo que más le importa
   * a quien pregunta. Decirle «no lo hemos mirado» cuando lo hemos mirado y el producto no
   * es lo que él cree es peor que no decir nada.
   */

  // Amundi Prime Global
  LU1931974692:
    'No se analiza porque no es un fondo indexado: es el «Amundi Prime Global UCITS ETF DR (D)», un ETF de distribución sobre el Solactive GBS Developed Markets Large & Mid Cap. La diferencia no es de etiqueta: un ETF no se traspasa a otro producto sin tributar, y este además reparte dividendos en vez de reinvertirlos. Comprobado el 18-sep-2026; ese ISIN figura además como liquidado o fusionado, y la gama viva es irlandesa (IE000QIF5N15 de reparto e IE0009DRDY20 de acumulación).',

  // Amundi Prime Japan
  LU2089238385:
    'No se analiza porque no es un fondo indexado sino un ETF de la gama Prime de Amundi, igual que su hermano global. Un ETF no tiene el traspaso sin tributación que esta ficha daba por hecho.',

  // «Amundi Index Eurozone Government Bond»
  LU1437015735:
    'No se analiza porque el producto no es el que decía la ficha. Ese ISIN es el «Amundi Core MSCI Europe UCITS ETF»: un ETF de renta VARIABLE europea, no un fondo de renta FIJA de deuda pública de la eurozona. Comprobado el 18-sep-2026 en justETF, en la web de Amundi y en Euronext. Si lo que buscas es renta fija, este no es el producto.',


}

/**
 * Mensaje para un fondo del catálogo que no está en ninguna de las dos tablas de arriba.
 *
 * No es un caso residual: hoy le toca a cinco de los doce, y es deliberado. Después de
 * encontrar tres fichas con datos equivocados, la política pasó a ser la contraria de la que
 * había: **un fondo no se analiza hasta que sus datos estén comprobados en una fuente
 * externa**, en vez de analizarse mientras nadie demuestre que están mal.
 */
const PENDIENTE_DE_VERIFICAR =
  'Todavía no hemos comprobado los datos de este fondo —su índice y su comisión— contra una fuente externa, y sin eso no podemos calcular su exposición sin arriesgarnos a darla mal. Aparece en el catálogo con su ficha, pero no entra en el análisis.'

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
        motivo: PENDIENTE_DE_VERIFICAR,
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

/**
 * Cuándo se comprobó cada fondo contra una fuente EXTERNA, y cuál.
 *
 * Existe para que añadir un fondo al análisis obligue a escribir aquí de dónde salió el
 * dato. No es burocracia: el 18-sep-2026 el catálogo tenía tres fichas con datos erróneos
 * —una de ellas con el índice equivocado, sirviendo exposición falsa en producción— y ningún
 * test lo cazó, porque todos comprobaban la coherencia interna de una fuente sin comprobar
 * la fuente.
 *
 * `fondos-analizables.test.ts` exige que todo ISIN de `EQUIVALENCIAS` esté aquí. Quien
 * quiera ampliar la tabla tiene que pasar por esta línea, y escribirla obliga a haber ido a
 * mirar.
 */
export const VERIFICADOS_EN_FUENTE: Record<string, string> = {
  IE00B03HCZ61: '18-sep-2026, registro de fondos: «VANGUARD GLOBAL STOCK INDEX INVESTOR EUR CAP | MSCI World Index | 0,18 %»',
  IE0032126645: '18-sep-2026, registro de fondos: «VANGUARD U.S. 500 STOCK INDEX GENERAL EUR CAP | S&P 500 Index | 0,10 %»',
  IE0031786142: '18-sep-2026, factsheet de Vanguard de 31-ago-2026 con este ISIN: «MSCI Emerging Markets Index […] large and mid-sized company stocks», ticker MSDEEEMN, OCF 0,23 %',
  IE00BYX5MX67: '18-sep-2026, registro de fondos: «FIDELITY S&P 500 INDEX FUND P-ACC-EUR | S&P 500 Index | 0,06 %». La ficha decía MSCI World y 0,12 %: los tres datos estaban mal',
  IE0007987690: '18-sep-2026, registro de fondos: «VANGUARD EUROPEAN STOCK INDEX INVESTOR EUR CAP | MSCI Europe Index | 0,12 %». La ficha decía «Eurozone Stock», MSCI EMU y 0,16 %: los tres estaban mal, y de ese error salió su exclusión del 17-sep',
  LU0996177134: '18-sep-2026, registro de fondos: «AMUNDI CORE MSCI EMERGING MARKETS AE CAP | AMUNDI ASSET MANAGEMENT | MSCI Emerging Markets | 0,30 %». La ficha decía «Amundi Index» y 0,20 %: gama equivocada y la mitad de comisión',
  IE00BYX5M476: '18-sep-2026, registro de fondos: «FIDELITY MSCI EMERGING MARKETS INDEX FUND P-ACC-EUR | FIL INVESTMENTS INTERNATIONAL | MSCI Emerging Markets Index | 0,20 %». Índice y TER coincidían; el ISIN del catálogo (`IE00BYX5L514`) era imposible y al nombre le faltaba «MSCI»',
  IE00B18GC888: '18-sep-2026, registro de fondos: «VANGUARD GLOBAL BOND INDEX GENERAL EUR HEDGED CAP | Bloomberg Global Aggregate Float Adjusted and Scaled | 0,15 %». Nombre y TER coincidían; el índice es una variante del Global Aggregate y por eso la equivalencia es aproximada',
}
