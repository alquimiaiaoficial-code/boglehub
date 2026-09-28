import { INDEX_FUNDS, type IndexFund } from '@/data/index-funds'
import { getFundClassByIsin } from '@/data/fund-classes'
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
   * iShares Developed World Index Fund (IE), CLASE S - MSCI World.
   * Verificado el 24-sep-2026 en la ficha de BlackRock: «Clase S (EUR) Acumulación |
   * Índice de referencia: MSCI World Index Net (EUR) | Porcentaje de gastos: 0,04 %».
   * Mismo índice que IWDA, así que la exposición es la misma y la calidad es exacta.
   */
  IE000ZYRH0Q7: { ticker: 'IWDA', calidad: 'exacta' },

  /**
   * iShares Emerging Markets Index Fund (IE), CLASE S - MSCI Emerging Markets.
   * Verificado el 24-sep-2026 en la ficha de BlackRock: «Clase S | Índice de referencia:
   * MSCI Emerging Markets, Net Returns (EUR) | Porcentaje de gastos: 0,08 por ciento».
   * Mismo índice que EIMI.
   */
  IE000QAZP7L2: { ticker: 'EIMI', calidad: 'exacta' },

  // iShares North America Index Fund (clase D) - MSCI North America. Verificado el 25-sep-2026 en la ficha de BlackRock.
  IE00BD575G75: {
    ticker: 'CSPX',
    calidad: 'aproximada',
    nota: 'El fondo replica el MSCI North America y la exposición se toma de un ETF sobre el S&P 500. El MSCI North America añade Canadá, en torno a un 3 %, y algo más de empresas medianas; el resto son las mismas grandes compañías de Estados Unidos.',
  },

  // iShares Japan Index Fund (clase D) - MSCI Japan. Verificado el 25-sep-2026 en la ficha de BlackRock.
  IE00BDRK7T12: {
    ticker: 'SJPA',
    calidad: 'aproximada',
    nota: 'El fondo replica el MSCI Japan y la exposición se toma de un ETF sobre el MSCI Japan IMI, que añade pequeña capitalización. Mismo mercado, universo algo más amplio.',
  },

  // iShares Pacific Index Fund (clase D) - MSCI Pacific ex Japan. Verificado el 25-sep-2026 en la ficha de BlackRock. Mismo índice que CPXJ.
  IE00BDRK7R97: { ticker: 'CPXJ', calidad: 'exacta' },

  // iShares Global Aggregate 1-5 Year Bond Index Fund (clase D Hedged) - Bloomberg Global Aggregate 1-5 Year. Verificado el 25-sep-2026 en la ficha de BlackRock.
  IE00BMZ3NN11: {
    ticker: 'AGGH',
    calidad: 'aproximada',
    nota: 'El fondo replica el Global Aggregate con vencimientos de 1 a 5 años y la exposición se toma del Global Aggregate completo. Mismos emisores y países; la diferencia es el plazo, y un plazo más corto hace que el precio se mueva bastante menos cuando cambian los tipos.',
  },

  // iShares Ultra High Quality Euro Government Bond Index Fund (clase Inst) - iBoxx Eurozone AAA. Verificado el 25-sep-2026 en la ficha de BlackRock.
  IE00B4XCK338: {
    ticker: 'VGEA',
    calidad: 'aproximada',
    nota: 'El fondo solo compra deuda de estados de la eurozona con calificación AAA y la exposición se toma de un ETF de toda la deuda pública de la eurozona. Misma región y mismo tipo de emisor; los países cambian mucho, porque Italia o España no son AAA y aquí no están.',
  },

  /**
   * iShares Europe Index Fund (IE), clase D - MSCI Europe.
   * Verificado el 25-sep-2026 en la ficha de BlackRock: «Clase D | Índice de referencia:
   * MSCI Europe Index | Porcentaje de gastos: 0,30 por ciento». Mismo índice que IMEU.
   */
  IE00BDRK7L36: { ticker: 'IMEU', calidad: 'exacta' },

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

  /**
   * Seis fondos añadidos el 19-sep-2026 al ampliar el catálogo, que es lo que se le prometió
   * por escrito a Luis Ángel Hernández (Salud Financiera) el 17-sep: «ampliar el catálogo de
   * fondos, doce son pocos». Los seis salen del registro español con nombre, índice y
   * comisión citados; ninguno se escribió de memoria.
   */
  IE00BD0NCM55: { ticker: 'IWDA', calidad: 'exacta' },   // iShares Developed World — MSCI World
  LU0996182563: { ticker: 'IWDA', calidad: 'exacta' },   // Amundi Index MSCI World — MSCI World
  IE00BYX5MD61: { ticker: 'IMEU', calidad: 'exacta' },   // Fidelity MSCI Europe — MSCI Europe
  IE00B42W4L06: { ticker: 'IUSN', calidad: 'exacta' },   // Vanguard Global Small-Cap — MSCI World Small Cap

  /**
   * MSCI Japan contra un ETF que replica el MSCI Japan IMI: mismo mercado, pero el IMI
   * incluye también pequeña capitalización. El reparto por región y sector sale casi igual y
   * aún así es aproximada, porque en esta tabla «exacta» significa EL MISMO índice.
   */
  IE0007286036: {
    ticker: 'SJPA',
    calidad: 'aproximada',
    nota: 'El fondo replica el MSCI Japan y la exposición se toma de un ETF sobre el MSCI Japan IMI, que añade pequeña capitalización. Mismo mercado, universo algo más amplio.',
  },

  /**
   * Bloomberg Euro Government Float Adjusted contra el Euro Aggregate Treasury del ETF: los
   * dos son deuda pública de la eurozona, pero el primero pondera por deuda negociable.
   */
  IE0007472115: {
    ticker: 'VGEA',
    calidad: 'aproximada',
    nota: 'El fondo replica el Bloomberg Euro Government Float Adjusted y la exposición se toma de un ETF sobre el Euro Aggregate Treasury. Es la misma deuda pública de la eurozona; el ajuste por capital flotante cambia algo los pesos por país.',
  },

  /**
   * FTSE EMU Government Bond contra el Euro Aggregate Treasury del ETF. Mismo universo
   * —deuda pública de los estados de la eurozona— y distinto proveedor de índice, así que
   * aproximada. Verificado el 25-sep-2026 en la ficha de BlackRock.
   */
  IE00BD0NC037: {
    ticker: 'VGEA',
    calidad: 'aproximada',
    nota: 'El fondo replica el FTSE EMU Government Bond y la exposición se toma de un ETF sobre el Euro Aggregate Treasury de Bloomberg. Es la misma deuda pública de la eurozona, con dos proveedores de índice distintos: los criterios de inclusión y los pesos por país no son idénticos.',
  },

  IE00B18GC888: {
    ticker: 'AGGH',
    calidad: 'aproximada',
    nota: 'El fondo replica el Bloomberg Global Aggregate Float Adjusted and Scaled y la exposición se toma del Global Aggregate sin ese ajuste. Es el mismo universo de renta fija global cubierta a euros, pero el ajuste por capital flotante cambia algo los pesos.',
  },

  // L&G MSCI ACWI IMI Equity Index Fund (clase I EUR Acc) - MSCI ACWI IMI. Verificado el 28-sep-2026 en la gestora.
  IE0003PI5332: {
    ticker: 'ISAC',
    calidad: 'aproximada',
    nota: 'El fondo replica el MSCI ACWI IMI y la exposición se toma de un ETF sobre el MSCI ACWI. Mismos países, desarrollados y emergentes; el IMI añade pequeñas empresas, que en un índice ponderado por capitalización pesan poco, así que el reparto por regiones y sectores sale muy parecido.',
  },

  /**
   * Lote del 28-sep-2026: 19 fondos nuevos con equivalencia, todos verificados ese día en la
   * web o en los documentos legales de la gestora. «Exacta» solo cuando es el MISMO índice;
   * el resto lleva nota que dice en qué se aparta.
   */
  // Vanguard Pacific ex-Japan Stock Index Fund (clase EUR Acc) - MSCI Pacific ex Japan. Verificado el 28-sep-2026 en la gestora.
  IE0007201266: { ticker: 'CPXJ', calidad: 'exacta' },
  // Vanguard 20+ Year Euro Treasury Index Fund (clase Euro Shares) - Bloomberg Euro Treasury 20+ Year. Verificado el 28-sep-2026 en la gestora.
  IE00B246KL88: {
    ticker: 'VGEA',
    calidad: 'aproximada',
    nota: 'El fondo solo compra deuda pública de la eurozona con más de 20 años de vida y la exposición se toma de un ETF de toda la deuda pública de la eurozona. Misma región y mismo tipo de emisor; el plazo es mucho más largo, así que el precio se mueve bastante más cuando cambian los tipos.',
  },
  // Vanguard ESG Developed Europe Index Fund (clase EUR Acc) - FTSE Developed Europe Choice. Verificado el 28-sep-2026 en la gestora.
  IE00B526YN16: {
    ticker: 'VEUR',
    calidad: 'aproximada',
    nota: 'El fondo replica el FTSE Developed Europe Choice y la exposición se toma de un ETF sobre el FTSE Developed Europe sin filtro. Mismos países; el índice «Choice» excluye empresas por su actividad, sobre todo de energía, así que el reparto por sectores se aparta algo.',
  },
  // Vanguard ESG Developed World All Cap Equity Index Fund (clase EUR Acc) - FTSE Developed All Cap Choice. Verificado el 28-sep-2026 en la gestora.
  IE00B5456744: {
    ticker: 'IWDA',
    calidad: 'aproximada',
    nota: 'El fondo replica el FTSE Developed All Cap Choice y la exposición se toma de un ETF sobre el MSCI World. Mismos mercados desarrollados, con tres diferencias: el índice del fondo incluye pequeñas empresas, excluye algunas por criterios ESG y cuenta Corea del Sur como desarrollado.',
  },
  // Vanguard Global Short-Term Bond Index Fund (clase EUR Hedged Acc) - Bloomberg Global Aggregate ex US MBS 1-5 Year (cubierto a EUR). Verificado el 28-sep-2026 en la gestora.
  IE00BH65QP47: {
    ticker: 'AGGH',
    calidad: 'aproximada',
    nota: 'El fondo replica el Global Aggregate con vencimientos de 1 a 5 años y sin titulizaciones hipotecarias de Estados Unidos, y la exposición se toma del Global Aggregate completo. Mismo tipo de emisores y países; el plazo es más corto y faltan esas titulizaciones, así que los pesos por país cambian algo.',
  },
  // Vanguard ESG Emerging Markets All Cap Equity Index Fund (clase EUR Acc) - FTSE Emerging All Cap Choice. Verificado el 28-sep-2026 en la gestora.
  IE00BKV0W243: {
    ticker: 'VFEM',
    calidad: 'aproximada',
    nota: 'El fondo replica el FTSE Emerging All Cap Choice y la exposición se toma de un ETF sobre el FTSE Emerging sin filtro. Mismos países, sin Corea del Sur en ninguno de los dos; el índice del fondo añade pequeñas empresas y excluye algunas por criterios ESG.',
  },
  // Vanguard U.K. Government Bond Index Fund (clase EUR Hedged Acc) - Bloomberg U.K. Government Float Adjusted (cubierto a EUR). Verificado el 28-sep-2026 en la gestora.
  IE00BLPJRG31: {
    ticker: 'VGOV',
    calidad: 'aproximada',
    nota: 'El fondo replica la deuda pública británica cubierta a euros y la exposición se toma de un ETF de gilts sin cubrir. Mismo emisor y mismo país; la diferencia es la divisa, que en el ETF sí mueve el valor y en esta clase casi no.',
  },
  // Amundi Core MSCI Europe (clase AE) - MSCI Europe. Verificado el 28-sep-2026 en la gestora.
  LU0389811885: { ticker: 'IMEU', calidad: 'exacta' },
  // Amundi MSCI North America ESG Broad Transition (clase AE) - MSCI North America ESG Broad CTB Select. Verificado el 28-sep-2026 en la gestora.
  LU0389812347: {
    ticker: 'CSPX',
    calidad: 'aproximada',
    nota: 'El fondo replica una versión ESG y de transición climática del MSCI North America y la exposición se toma de un ETF sobre el S&P 500. Mismo mercado; el índice del fondo añade Canadá y cambia los pesos para rebajar las empresas más emisoras, así que el reparto por sectores se aparta algo.',
  },
  // Amundi Core Euro Government Bond (clase AE) - Bloomberg Euro Treasury 50bn. Verificado el 28-sep-2026 en la gestora.
  LU1050470373: {
    ticker: 'VGEA',
    calidad: 'aproximada',
    nota: 'El fondo replica el Bloomberg Euro Treasury 50bn, que solo incluye los emisores grandes de la eurozona, y la exposición se toma de un ETF de toda la deuda pública de la eurozona. Misma región y mismo tipo de emisor; los pesos por país cambian algo.',
  },
  // Pictet-USA Index (clase P EUR) - S&P 500. Verificado el 28-sep-2026 en la gestora.
  LU0474966164: { ticker: 'CSPX', calidad: 'exacta' },
  // Pictet-Europe Index (clase P EUR) - MSCI Europe. Verificado el 28-sep-2026 en la gestora.
  LU0130731390: { ticker: 'IMEU', calidad: 'exacta' },
  // Pictet-Japan Index (clase P EUR) - MSCI Japan. Verificado el 28-sep-2026 en la gestora.
  LU0474966750: {
    ticker: 'SJPA',
    calidad: 'aproximada',
    nota: 'El fondo replica el MSCI Japan y la exposición se toma de un ETF sobre el MSCI Japan IMI, que añade pequeña capitalización. Mismo mercado, universo algo más amplio.',
  },
  // Pictet-Pacific Ex Japan Index (clase P EUR) - MSCI Pacific ex Japan. Verificado el 28-sep-2026 en la gestora.
  LU0474967055: { ticker: 'CPXJ', calidad: 'exacta' },
  // Pictet-Emerging Markets Index (clase P EUR) - MSCI Emerging Markets. Verificado el 28-sep-2026 en la gestora.
  LU0474967998: { ticker: 'AEEM', calidad: 'exacta' },
  // Fidelity MSCI World Index Fund (clase P Acc EUR) - MSCI World. Verificado el 28-sep-2026 en la gestora.
  IE00BYX5NX33: { ticker: 'IWDA', calidad: 'exacta' },
  // Fidelity MSCI Japan Index Fund (clase P Acc EUR) - MSCI Japan. Verificado el 28-sep-2026 en la gestora.
  IE00BYX5N771: {
    ticker: 'SJPA',
    calidad: 'aproximada',
    nota: 'El fondo replica el MSCI Japan y la exposición se toma de un ETF sobre el MSCI Japan IMI, que añade pequeña capitalización. Mismo mercado, universo algo más amplio.',
  },
  // State Street EMU Government Bond Index Fund (clase P) - FTSE EMU Government Bond. Verificado el 28-sep-2026 en la gestora.
  LU0438093006: {
    ticker: 'VGEA',
    calidad: 'aproximada',
    nota: 'El fondo replica el FTSE EMU Government Bond y la exposición se toma de un ETF sobre el Euro Aggregate Treasury de Bloomberg. Es la misma deuda pública de la eurozona, con dos proveedores de índice distintos: los criterios de inclusión y los pesos por país no son idénticos.',
  },
  // State Street Euro Core Treasury Bond Index Fund (clase P) - Bloomberg Global Treasury Euro Core (40 % Alemania, 40 % Francia, 20 % Países Bajos). Verificado el 28-sep-2026 en la gestora.
  LU0570151448: {
    ticker: 'VGEA',
    calidad: 'aproximada',
    nota: 'El fondo solo tiene deuda pública de Alemania, Francia y Países Bajos, en pesos fijos, y la exposición se toma de un ETF de toda la deuda pública de la eurozona. Misma región y mismo tipo de emisor; los países cambian mucho, porque Italia o España no están.',
  },
}

/**
 * Fondos que NO se analizan, con el motivo. Preferimos negarnos a dar un número que darlo
 * mal: quien pega una cartera no puede saber que la equivalencia era floja.
 */
/**
 * Productos que ya NO están en el catálogo de fondos y que aun así hay que saber explicar.
 *
 * Los dos salieron el 19-sep-2026 porque no son fondos, son ETFs. Pero `LU1931974692` es
 * el identificador por el que más nos buscan —«que tal el fondo lu1931974692…», posición 3
 * en Bing— y quien lo pega en el analizador merece la respuesta útil, no un error de precio.
 */
const PRODUCTOS_RETIRADOS: Record<string, { nombre: string; indice: string; motivo: string }> = {
  LU1931974692: {
    nombre: 'Amundi Prime Global',
    indice: 'Solactive GBS Developed Markets Large & Mid Cap',
    motivo:
      'No se analiza porque no es un fondo indexado: es el «Amundi Prime Global UCITS ETF DR (D)», un ETF de distribución. La diferencia no es de etiqueta: un ETF no se traspasa a otro producto sin tributar. Ese ISIN figura además como liquidado o fusionado, y la gama viva es irlandesa (IE000QIF5N15 de reparto e IE0009DRDY20 de acumulación).',
  },
  LU2089238385: {
    nombre: 'Amundi Prime Japan',
    indice: 'Solactive GBS Japan',
    motivo:
      'No se analiza porque no es un fondo indexado sino un ETF de la gama Prime de Amundi, igual que su hermano global. Un ETF no tiene el traspaso sin tributación que su antigua ficha daba por hecho.',
  },
}

const SIN_EQUIVALENCIA_FIABLE: Record<string, string> = {
  // iShares Developed Real Estate Index Fund (clase Inst). Verificado el 25-sep-2026 en blackrock.com/es/profesionales/productos/249682: «Inst | Índice de referencia: FTSE EPRA Nareit Developed Net Index EUR | Porcentaje de gastos: 0,20 por ciento | Inversión inicial mínima: 1.000.000 | Acumulación».
  IE00B83YJG36: 'No tenemos en el catálogo un ETF que replique el FTSE EPRA Nareit Developed, que es inmobiliario cotizado. Usar la exposición de un índice de acciones general daría un reparto por sectores falso, así que preferimos no dar número.',
  // iShares EMU Index Fund (clase Inst). Verificado el 25-sep-2026 en blackrock.com/es/profesionales/productos/228478: «Inst | Índice de referencia: MSCI EMU Net TR Index (EUR) | Porcentaje de gastos: 0,15 por ciento | Inversión inicial mínima: 1.000.000 | Acumulación».
  IE00B3B2KS38: 'No tenemos en el catálogo un ETF sobre el MSCI EMU. El único europeo que hay replica el MSCI Europe, que incluye Reino Unido, Suiza y los nórdicos, alrededor de un tercio del índice fuera de la eurozona. Usarlo daría una exposición por países falsa, así que preferimos no dar número.',
  // iShares Euro Investment Grade Corporate Bond Index Fund (clase Inst). Verificado el 25-sep-2026 en blackrock.com/es/profesionales/productos/228525: «Inst | Índice de referencia: BBG Euro Corporate Index (EUR) | Porcentaje de gastos: 0,12 por ciento | Inversión inicial mínima: EUR 500.000 | Acumulación».
  IE00B67T5G21: 'No tenemos en el catálogo un ETF de deuda corporativa en euros. Tomar la exposición de uno de deuda pública pondría este fondo como 100 % bonos del Estado cuando son bonos de empresas, así que preferimos no dar número.',
  // iShares World ex-Euro Government Bond Index Fund (clase Inst Hedged). Verificado el 25-sep-2026 en blackrock.com/es/profesionales/productos/306040: «Inst Hedged Acc | Índice de referencia: FTSE Non-EUR World Government Bond Index | Porcentaje de gastos: 0,14 por ciento | Inversión inicial mínima: GBP 500.000 | Acumulación».
  IE00BGR7K831: 'No tenemos en el catálogo un ETF de deuda pública mundial sin la eurozona. El global agregado que hay incluye deuda corporativa y deuda en euros, así que el reparto saldría falso; preferimos no dar número.',
  // iShares Euro Aggregate Bond Index Fund (clase A2). Verificado el 25-sep-2026 en blackrock.com/es/profesionales/productos/254304: «A2 | Índice de referencia: BBG Euro Aggregate Index (EUR) | Porcentaje de gastos: 0,45 por ciento | Inversión inicial mínima: EUR 5.000 | Acumulación».
  LU0836513423: 'No tenemos en el catálogo un ETF sobre el Euro Aggregate, que mezcla deuda pública y de empresas. El de deuda pública en euros lo pondría todo como bonos del Estado, y alrededor de una cuarta parte son corporativos; preferimos no dar número.',
  // iShares Euro Government Inflation-Linked Bond Index Fund (clase Inst). Verificado el 25-sep-2026 en blackrock.com/es/profesionales/productos/228466: «Inst | Índice de referencia: BBG Euro Government Inflation-Linked Bond Index (EUR) | Porcentaje de gastos: 0,10 por ciento | Inversión inicial mínima: EUR 500.000 | Acumulación».
  IE00B4WXT857: 'No tenemos en el catálogo un ETF de bonos ligados a la inflación. El de deuda pública en euros tiene la misma región y el mismo emisor, pero se comporta distinto cuando cambia la inflación, que es justo para lo que existe este fondo; preferimos no dar número.',

  /*
   * Los tres de aquí abajo NO son fondos: son ETFs que el catálogo publicaba como fondos.
   * Tenían el mensaje genérico de «todavía no hemos comprobado sus datos», que había dejado
   * de ser cierto: sí los hemos comprobado, y lo que sabemos es justo lo que más le importa
   * a quien pregunta. Decirle «no lo hemos mirado» cuando lo hemos mirado y el producto no
   * es lo que él cree es peor que no decir nada.
   */

  // «Amundi Index Eurozone Government Bond»
  // Vanguard Eurozone Stock Index Fund (clase EUR Acc). 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9927/eurozone-stock-index-fund-eur-acc): «Eurozone Stock Index Fund - EUR Acc (VANESII) | Índice de referencia: MSCI EMU Index | Comisión: 0,12 %»
  IE0008248803: 'No tenemos en el catálogo un ETF sobre el MSCI EMU. El único europeo que hay replica el MSCI Europe, que incluye Reino Unido, Suiza y los nórdicos, alrededor de un tercio del índice fuera de la eurozona. Usarlo daría una exposición por países falsa, así que preferimos no dar número.',
  // Vanguard U.S. Government Bond Index Fund (clase EUR Hedged Acc). 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9284/us-government-bond-index-fund-eur-hedged-acc): «U.S. Government Bond Index Fund - EUR Hedged Acc (VGUGBSE) | Índice de referencia: Bloomberg U.S. Government Float Adjusted Bond Index in EUR | Comisión: 0,12 %»
  IE0007471471: 'No tenemos en el catálogo un ETF de deuda pública de Estados Unidos. El de renta fija global que hay mezcla bonos de muchos países y de empresas, así que la exposición saldría falsa; preferimos no dar número.',
  // Vanguard Euro Investment Grade Bond Index Fund (clase EUR Acc). 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9991/euro-investment-grade-bond-index-fund-eur-acc): «Euro Investment Grade Bond Index Fund - EUR Acc (VANEIGB) | Índice de referencia: Bloomberg EUR Non-Government Float Adjusted Bond Index | Comisión: 0,12 %»
  IE00B04FFJ44: 'No tenemos en el catálogo un ETF de deuda en euros que no sea pública. Tomar la exposición de uno de deuda del Estado pondría este fondo como 100 % bonos soberanos cuando no lo es; preferimos no dar número.',
  // Vanguard Eurozone Inflation-Linked Bond Index Fund (clase EUR Acc). 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9104/eurozone-inflation-linked-bond-index-fund-eur-acc): «Eurozone Inflation-Linked Bond Index Fund - EUR Acc (VANEZON) | Índice de referencia: Bloomberg Global Inflation-Linked: Eurozone - Euro CPI Index | Comisión: 0,12 %»
  IE00B04GQR24: 'No tenemos en el catálogo un ETF de bonos ligados a la inflación. El de deuda pública en euros tiene la misma región y el mismo emisor, pero se comporta distinto cuando cambia la inflación, que es justo para lo que existe este fondo; preferimos no dar número.',
  // Vanguard Global Corporate Bond Index Fund (clase EUR Hedged Acc). 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9459/global-corporate-bond-index-fund-eur-hedged-acc): «Global Corporate Bond Index Fund - EUR Hedged Acc (VAIHAHE) | Índice de referencia: Bloomberg Global Aggregate Float Adjusted Corporate Index in EUR | Comisión: 0,18 %»
  IE00BDFB5N63: 'No tenemos en el catálogo un ETF de bonos de empresas. El de renta fija global agregada mezcla deuda pública y corporativa, y usarlo daría a este fondo un peso de deuda pública que no tiene; preferimos no dar número.',
  // Vanguard Global Short-Term Corporate Bond Index Fund (clase EUR Hedged Acc). 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9544/global-short-term-corporate-bond-index-fund-eur-hedged-acc): «Global Short-Term Corporate Bond Index Fund - EUR Hedged Acc (VACBIEH) | Índice de referencia: Bloomberg Global Aggregate Corporate 1-5 Year Float Adjusted Index in EUR | Comisión: 0,18 %»
  IE00BDFB7290: 'No tenemos en el catálogo un ETF de bonos de empresas. El de renta fija global agregada mezcla deuda pública y corporativa de todos los plazos, así que la exposición saldría falsa; preferimos no dar número.',
  // Vanguard Japan Government Bond Index Fund (clase EUR Hedged Acc). 28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9463/japan-government-bond-index-fund-eur-hedged-acc): «Japan Government Bond Index Fund - EUR Hedged Acc (VAIHAHA) | Índice de referencia: Bloomberg Japan Government Float Adjusted Bond Index in EUR | Comisión: 0,12 %»
  IE00BLPJRH48: 'No tenemos en el catálogo un ETF de deuda pública japonesa. Tomar la exposición de uno de renta fija global pondría a este fondo en Estados Unidos y Europa, donde no invierte; preferimos no dar número.',
  // Amundi FTSE EPRA NAREIT Global (clase AE). 28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU1328852659/SPA/ESP, publicado el 05/06/2026): «Amundi FTSE EPRA NAREIT Global AE | objetivo: replicar la rentabilidad del FTSE EPRA/NAREIT Developed Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,34 % del valor de su inversión al año»
  LU1328852659: 'No tenemos en el catálogo un ETF que replique el FTSE EPRA Nareit Developed, que es inmobiliario cotizado. Usar la exposición de un índice de acciones general daría un reparto por sectores falso, así que preferimos no dar número.',
  // Amundi Core Global Government Bond (clase AHE). 28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0389812933/SPA/ESP, publicado el 28/04/2026): «Amundi Core Global Government Bond AHE | objetivo: replicar la rentabilidad del J.P. Morgan Government Bond Index Global (GBI Global) | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,35 % del valor de su inversión al año»
  LU0389812933: 'No tenemos en el catálogo un ETF de deuda pública mundial. El de renta fija global agregada mezcla deuda pública y de empresas, así que el reparto saldría falso; preferimos no dar número.',
  // Pictet-Euroland Index (clase P EUR). 28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-euroland-index/LU0255980913): «Índice de referencia: MSCI EMU Index» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.46% detraído de esta Clase de participaciones»
  LU0255980913: 'No tenemos en el catálogo un ETF sobre el MSCI EMU. El único europeo que hay replica el MSCI Europe, que incluye Reino Unido, Suiza y los nórdicos, alrededor de un tercio del índice fuera de la eurozona. Usarlo daría una exposición por países falsa, así que preferimos no dar número.',

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

/**
 * Algo que reconocemos y que, a propósito, no entra en el análisis.
 *
 * Llevaba dentro el `IndexFund` entero, y eso daba por hecho que todo lo no analizable
 * es una ficha del catálogo de fondos. Dejó de ser cierto el 19-sep-2026, al retirar del
 * catálogo los dos Amundi Prime que son ETFs: sus ISINs seguían llegando al analizador
 * —son de lo más buscado que tenemos— y de golpe el usuario pasó a recibir «no se pudo
 * obtener precio para LU1931974692» en vez de «esto es un ETF, no un fondo».
 *
 * Retirar una ficha no borra la pregunta de la gente. Por eso el tipo lleva ahora lo que
 * hace falta para explicarse, venga de una ficha o no.
 */
export interface FondoNoAnalizable {
  isin: string
  /** Para una ficha, su slug. Para un producto retirado, cadena vacía. */
  slug: string
  nombre: string
  indice: string
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
  // Primero lo retirado. Va antes que el catálogo a propósito: si algún día vuelve a haber
  // una ficha con uno de estos ISINs, queremos enterarnos por aquí y no que se analice
  // calladamente un producto que sabemos que no es un fondo.
  const retirado = PRODUCTOS_RETIRADOS[normalizar(entrada)]
  if (retirado) {
    return {
      noAnalizable: {
        isin: normalizar(entrada),
        slug: '',
        nombre: retirado.nombre,
        indice: retirado.indice,
        motivo: retirado.motivo,
      },
    }
  }

  const fondo = buscarFondo(entrada)
  if (!fondo) return resolverClase(entrada)

  const isin = normalizar(fondo.isin)
  const base = { isin: fondo.isin, slug: fondo.slug, nombre: fondo.name, indice: fondo.index }

  const motivo = SIN_EQUIVALENCIA_FIABLE[isin]
  if (motivo) return { noAnalizable: { ...base, motivo } }

  const eq = EQUIVALENCIAS[isin]
  if (!eq) return { noAnalizable: { ...base, motivo: PENDIENTE_DE_VERIFICAR } }

  const etf = getEtfByTicker(eq.ticker)
  if (!etf) {
    // Defensa real, no teórica: si alguien retira ese ETF del catálogo, esto evita que el
    // fondo se analice con una exposición vacía y el resultado salga en silencio a cero.
    return {
      noAnalizable: {
        ...base,
        motivo: `La exposición de este fondo se calculaba a partir del ETF ${eq.ticker}, que ya no está en el catálogo.`,
      },
    }
  }

  return { analizable: { fondo, etfExposicion: etf, calidad: eq.calidad, nota: eq.nota } }
}

/**
 * Resuelve una CLASE de un fondo que ya está en el catálogo (ver `src/data/fund-classes.ts`).
 *
 * Exposición: la del fondo padre, porque es el mismo fondo legal y el mismo índice.
 * Comisión, mínimo, divisa y reparto de rendimientos: los de la clase.
 *
 * Por qué la comisión de la clase y no la del padre, que parece un detalle y no lo es: la
 * clase Inst del iShares Developed World cuesta 0,15 %, la D 0,30 % y la S 0,04 %. Si el
 * analizador usara la del padre, a quien tiene la clase barata le calcularía un TER
 * ponderado siete veces más alto del que paga, y a quien tiene la cara uno más bajo. El
 * número que más se mira de todo el análisis saldría mal justo en las carteras más cuidadas.
 */
function resolverClase(entrada: string): ResolucionFondo | null {
  const clase = getFundClassByIsin(normalizar(entrada))
  if (!clase) return null
  const padre = INDEX_FUNDS.find((f) => f.slug === clase.parentSlug)
  if (!padre) return null
  const r = resolverFondo(padre.isin)
  if (!r) return null

  const nombreBase = padre.name.replace(/\s*\(clase [^)]*\)\s*$/i, '')
  const comoFondo: IndexFund = {
    ...padre,
    isin: clase.isin,
    name: `${nombreBase} (clase ${clase.className})`,
    ter: clase.ter,
    accumulating: clase.accumulating,
    currency: clase.currency,
    minimum: clase.minimum,
  }
  if ('analizable' in r) return { analizable: { ...r.analizable, fondo: comoFondo } }
  return { noAnalizable: { ...r.noAnalizable, isin: clase.isin, nombre: comoFondo.name } }
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

/**
 * Nombre para enseñar de un fondo o de una CLASE del catálogo. Null si no es un fondo.
 *
 * Existe porque `buscarFondo` solo mira las fichas, y desde el 25-sep hay clases sin ficha
 * propia. El 28-sep se vio el efecto: el ISIN de una clase que el servidor analizaba bien
 * hacía que el formulario pidiera «participaciones» y precio en vez de euros, y que la tabla
 * lo enseñara como un ISIN suelto con «precio medio 0 €». El cálculo estaba bien; la
 * pantalla invitaba a meter un dato equivocado.
 */
export function nombreDeFondo(entrada: string): string | null {
  const fondo = buscarFondo(entrada)
  if (fondo) return fondo.name
  const clase = resolverClase(entrada)
  if (!clase) return null
  return 'analizable' in clase ? clase.analizable.fondo.name : clase.noAnalizable.nombre
}

/** ¿Lo que ha escrito el usuario es un fondo o una clase? Lo usa el formulario para pedir euros. */
export function esFondoIndexado(entrada: string): boolean {
  return nombreDeFondo(entrada) != null
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
  IE00B03HCZ61: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9932/global-stock-index-fund-eur): «Global Stock Index Fund - Investor EUR Acc (VANGLVI) | Índice de referencia: MSCI World Index | Comisión: 0,18 %». Confirma lo que ya decía la verificación anterior: 18-sep-2026, registro de fondos: «VANGUARD GLOBAL STOCK INDEX INVESTOR EUR CAP | MSCI World Index | 0,18 %»',
  IE0032126645: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9834/us-500-stock-index-fund-eur-acc): «U.S. 500 Stock Index Fund - EUR Acc (VANUIEI) | Índice de referencia: Standard and Poor’s 500 Index | Comisión: 0,10 %». Confirma lo que ya decía la verificación anterior: 18-sep-2026, registro de fondos: «VANGUARD U.S. 500 STOCK INDEX GENERAL EUR CAP | S&P 500 Index | 0,10 %»',
  IE0031786142: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9115/emerging-markets-stock-index-fund-eur): «Emerging Markets Stock Index Fund - Investor EUR Acc (VANEMSI) | Índice de referencia: MSCI Emerging Markets Index | Comisión: 0,23 %». Confirma lo que ya decía la verificación anterior: 18-sep-2026, factsheet de Vanguard de 31-ago-2026 con este ISIN: «MSCI Emerging Markets Index […] large and mid-sized company stocks», ticker MSDEEEMN, OCF 0,23 %',
  IE00BYX5MX67: '28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.fidelityinternational.com/FILPS/Documents/en/current/ret.en.xx.IE00BYX5MX67.pdf): «Fidelity S&P 500 Index Fund P-ACC-Euro | Index Name: S&P 500 Index (Net) | ISIN: IE00BYX5MX67 | Share Class Ongoing Charges: 0.06% | Distribution type: Accumulating». Confirma lo que ya decía la verificación anterior: 18-sep-2026, registro de fondos: «FIDELITY S&P 500 INDEX FUND P-ACC-EUR | S&P 500 Index | 0,06 %». La ficha decía MSCI World y 0,12 %: los tres datos estaban mal',
  IE0007987690: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9923/european-stock-index-fund-eur): «European Stock Index Fund - Investor EUR Acc (VANEIEI) | Índice de referencia: MSCI Europe Index | Comisión: 0,12 %». Confirma lo que ya decía la verificación anterior: 18-sep-2026, registro de fondos: «VANGUARD EUROPEAN STOCK INDEX INVESTOR EUR CAP | MSCI Europe Index | 0,12 %». La ficha decía «Eurozone Stock», MSCI EMU y 0,16 %: los tres estaban mal, y de ese error salió su exclusión del 17-sep',
  LU0996177134: '28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0996177134/SPA/ESP, publicado el 28/04/2026): «Amundi Core MSCI Emerging Markets AE | objetivo: replicar la rentabilidad del MSCI Emerging Markets Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,45 % del valor de su inversión al año». Historia: la ficha decía «Amundi Index» y 0,20 %; el registro de fondos del 18-sep decía 0,30 %. Ninguna de las dos cifras salía de la gestora',
  IE00BYX5M476: '28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.fidelityinternational.com/FILPS/Documents/en/current/ret.en.xx.IE00BYX5M476.pdf): «Fidelity MSCI Emerging Markets Index Fund P-ACC-Euro | Index Name: MSCI Emerging Markets Index (Net) | ISIN: IE00BYX5M476 | Share Class Ongoing Charges: 0.20% | Distribution type: Accumulating». Confirma lo que ya decía la verificación anterior: 18-sep-2026, registro de fondos: «FIDELITY MSCI EMERGING MARKETS INDEX FUND P-ACC-EUR | FIL INVESTMENTS INTERNATIONAL | MSCI Emerging Markets Index | 0,20 %». Índice y TER coincidían; el ISIN del catálogo (`IE00BYX5L514`) era imposible y al nombre le faltaba «MSCI»',
  IE00BD0NCM55: '28-sep-2026, ficha de la GESTORA (https://www.blackrock.com/es/profesionales/productos/287649): «Ongoing Charge Fee 0,12% | ISIN IE00BD0NCM55 | Inversión inicial mínima EUR 100.000,00 | Uso de los ingresos Acumulación | Índice de referencia MSCI World Index Net (EUR) | Porcentaje de gastos 0,10%». Sustituye al registro de fondos del 19-sep, que decía 0,30 %',
  IE000ZYRH0Q7: '24-sep-2026, ficha de la GESTORA (blackrock.com/es/profesionales/productos/345277): «Clase S (EUR) Acumulación | Índice de referencia: MSCI World Index Net (EUR) | Porcentaje de gastos: 0,04 % | Domicilio: Irlanda | Gestora: BlackRock Asset Management Ireland Limited | Lanzamiento de la serie: 21 ago 2025». Misma cartera que la clase D de arriba y siete veces y media más barata',
  IE000QAZP7L2: '24-sep-2026, ficha de la GESTORA (blackrock.com/es/profesionales/productos/345276): «Clase S | Índice: MSCI Emerging Markets, Net Returns (EUR) | Porcentaje de gastos: 0,08 por ciento | Domicilio: Irlanda | Inversión inicial mínima: EUR 200.000.000»',
  IE00BD0NC037: '25-sep-2026, ficha de la GESTORA (blackrock.com/es/profesionales/productos/287637): «Clase D | Índice de referencia: FTSE EMU Government Bond Index (EUR) | Porcentaje de gastos: 0,07 por ciento | Acumulación | Domicilio: Irlanda | Inversión inicial mínima: EUR 100.000». Citado por la comparativa de comisiones de bogleheads.es como uno de los dos ISIN de referencia de MyInvestor',
  IE00BDRK7L36: '25-sep-2026, ficha de la GESTORA (blackrock.com/es/profesionales/productos/287906): «Clase D | Índice de referencia: MSCI Europe Index | Porcentaje de gastos: 0,30 por ciento | Acumulación | Inversión inicial mínima: EUR 100.000». Es el más caro de los tres que tenemos sobre este índice y entra igual, porque el catálogo reconoce lo que la gente tiene',
  IE00BD575G75: '25-sep-2026, ficha de la GESTORA (blackrock.com/es/profesionales/productos/284072): «Clase D | Índice de referencia: MSCI Daily Net TR North America (EUR) | Porcentaje de gastos: 0,08 por ciento | Inversión inicial mínima: 100.000 | Acumulación»',
  IE00BDRK7T12: '25-sep-2026, ficha de la GESTORA (blackrock.com/es/profesionales/productos/287903): «Clase D | Índice de referencia: MSCI Developed - Japan Net EUR Index | Porcentaje de gastos: 0,30 por ciento | Inversión inicial mínima: EUR 100.000 | Acumulación»',
  IE00BDRK7R97: '25-sep-2026, ficha de la GESTORA (blackrock.com/es/profesionales/productos/287905): «Clase D | Índice de referencia: MSCI Developed Pacific Ex Japan in EUR Net TR Index | Porcentaje de gastos: 0,30 por ciento | Inversión inicial mínima: EUR 100.000 | Acumulación»',
  IE00BMZ3NN11: '25-sep-2026, ficha de la GESTORA (blackrock.com/es/profesionales/productos/318356): «Class D Hedged | Índice de referencia: BBG Global Aggregate 1-5 Year Index | Porcentaje de gastos: 0,14 por ciento | Inversión inicial mínima: EUR 100.000 | Acumulación»',
  IE00B4XCK338: '25-sep-2026, ficha de la GESTORA (blackrock.com/es/profesionales/productos/229107): «Inst | Índice de referencia: iBoxx Eurozone AAA Index (EUR) | Porcentaje de gastos: 0,10 por ciento | Inversión inicial mínima: EUR 250.000 | Acumulación»',
  LU0996182563: '28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0996182563/SPA/ESP, publicado el 28/04/2026): «Amundi Index MSCI World AE | objetivo: replicar la rentabilidad del MSCI World Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,30 % del valor de su inversión al año». Sustituye al registro de fondos del 19-sep, que decía 0,15 %: la mitad de lo real',
  IE00BYX5MD61: '28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.fidelityinternational.com/FILPS/Documents/en/current/ret.en.xx.IE00BYX5MD61.pdf): «Fidelity MSCI Europe Index Fund P-ACC-Euro | Index Name: MSCI Europe Index (Net) | ISIN: IE00BYX5MD61 | Share Class Ongoing Charges: 0.10% | Distribution type: Accumulating». Confirma lo que ya decía la verificación anterior: 19-sep-2026, registro de fondos: «FIDELITY MSCI EUROPE INDEX FUND P-ACC-EUR | FIL INVESTMENTS INTERNATIONAL | MSCI Europe Index | 0,10 %»',
  IE00B42W4L06: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9159/global-small-cap-index-fund-eur-acc): «Global Small-Cap Index Fund - EUR Acc (VANIEUI) | Índice de referencia: MSCI World Small Cap Index | Comisión: 0,29 %». Confirma lo que ya decía la verificación anterior: 19-sep-2026, registro de fondos: «VANGUARD GLOBAL SMALL-CAP INDEX GENERAL EUR CAP | VANGUARD ASSET MANAGEMENT | MSCI World Small Cap Index | 0,29 %»',
  IE0007286036: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9113/japan-stock-index-fund-eur-acc): «Japan Stock Index Fund - EUR Acc (VANSTKE) | Índice de referencia: MSCI Japan Index | Comisión: 0,16 %». Confirma lo que ya decía la verificación anterior: 19-sep-2026, registro de fondos: «VANGUARD JAPAN STOCK INDEX GENERAL EUR CAP | VANGUARD ASSET MANAGEMENT | MSCI Japan Index | 0,16 %»',
  IE0007472115: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9970/euro-government-bond-index-fund-eur): «Euro Government Bond Index Fund - Investor EUR Acc (VANEGBX) | Índice de referencia: Bloomberg Euro Government Float Adjusted Bond Index | Comisión: 0,12 %». Confirma lo que ya decía la verificación anterior: 19-sep-2026, registro de fondos: «VANGUARD EURO GOVERNMENT BOND INDEX INVESTOR EUR CAP | VANGUARD ASSET MANAGEMENT | Bloomberg Euro Government Float Adjusted Bond Index | 0,12 %»',
  IE00B18GC888: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9197/global-bond-index-fund-eur-hedged-acc): «Global Bond Index Fund - EUR Hedged Acc (VANGEHI) | Índice de referencia: Bloomberg Global Aggregate Float Adjusted and Scaled Index in EUR | Comisión: 0,15 %». Confirma lo que ya decía la verificación anterior: 18-sep-2026, registro de fondos: «VANGUARD GLOBAL BOND INDEX GENERAL EUR HEDGED CAP | Bloomberg Global Aggregate Float Adjusted and Scaled | 0,15 %». Nombre y TER coincidían; el índice es una variante del Global Aggregate y por eso la equivalencia es aproximada',
  // Lote del 28-sep-2026, todos en la gestora.
  IE0003PI5332: '28-sep-2026, ficha de la GESTORA (https://fundcentres.landg.com/en/ie/adviser-wealth/fund-centre/ICAV/MSCI-ACWI-IMI-Equity-Index-Fund/IE0003PI5332/): «L&G MSCI ACWI IMI Equity Index Fund | I-Class EUR Accumulation | ISIN IE0003PI5332 | Benchmark MSCI ACWI IMI | Fund launch date 7 Jan 2025 | Domicile Ireland»; ficha mensual a 31-ago-2026: «Ongoing charge 0.16%»; documento de datos fundamentales de 15-jun-2026: «Management fees and other administrative or operating costs 0.16%». Para leerla hubo que aceptar el aviso legal de L&G, con permiso expreso del fundador',
  IE0007201266: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9211/pacific-ex-japan-stock-index-fund-eur-acc): «Pacific ex-Japan Stock Index Fund - EUR Acc (VAPEJEI) | Índice de referencia: MSCI Pacific ex Japan Index | Comisión: 0,16 %»',
  IE00B246KL88: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9132/20-year-euro-treasury-index-fund-eur-acc): «20+ Year Euro Treasury Index Fund - Euro Shares (VGYETII) | Índice de referencia: Bloomberg Euro Treasury 20+ Year Bond Index | Comisión: 0,16 %»',
  IE00B526YN16: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9163/esg-developed-europe-index-fund-eur-acc): «ESG Developed Europe Index Fund - EUR Acc (VGSESIE) | Índice de referencia: FTSE Developed Europe Choice Index | Comisión: 0,14 %»',
  IE00B5456744: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9164/esg-developed-world-all-cap-equity-index-fund-eur-acc): «ESG Developed World All Cap Equity Index Fund - EUR Acc (VGSGSIE) | Índice de referencia: FTSE Developed All Cap Choice Index | Comisión: 0,20 %»',
  IE00BH65QP47: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9110/global-short-term-bond-index-fund-eur-hedged-acc): «Global Short-Term Bond Index Fund - EUR Hedged Acc (VGSTIEH) | Índice de referencia: Bloomberg Global Aggregate Ex US MBS 1-5 Year Float Adjusted and Scaled Index in EUR | Comisión: 0,15 %»',
  IE00BKV0W243: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-variable/9684/esg-emerging-markets-all-cap-equity-index-fund-eur-acc): «ESG Emerging Markets All Cap Equity Index Fund - EUR Acc (VAEAIIE) | Índice de referencia: FTSE Emerging All Cap Choice Index | Comisión: 0,25 %»',
  IE00BLPJRG31: '28-sep-2026, ficha de la GESTORA (https://www.es.vanguard/profesionales/producto/fondo/renta-fija/9462/uk-government-bond-index-fund-eur-hedged-acc): «U.K. Government Bond Index Fund - EUR Hedged Acc (VAUKGEH) | Índice de referencia: Bloomberg U.K. Government Float Adjusted Bond Index Hedged in EUR | Comisión: 0,12 %»',
  LU0389811885: '28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0389811885/SPA/ESP, publicado el 05/06/2026): «Amundi Core MSCI Europe AE | objetivo: replicar la rentabilidad del MSCI Europe Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,30 % del valor de su inversión al año»',
  LU0389812347: '28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU0389812347/SPA/ESP, publicado el 15/06/2026): «Amundi MSCI North America ESG Broad Transition AE | objetivo: replicar la rentabilidad del MSCI North America ESG Broad CTB Select Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,30 % del valor de su inversión al año»',
  LU1050470373: '28-sep-2026, Documento de Datos Fundamentales de la GESTORA (https://www.amundi.es/retail/dl/doc/kid-priips/LU1050470373/SPA/ESP, publicado el 28/04/2026): «Amundi Core Euro Government Bond AE | objetivo: replicar la rentabilidad del Bloomberg Euro Treasury 50bn Bond Index | Comisiones de gestión y otros costes administrativos o de funcionamiento: el 0,35 % del valor de su inversión al año»',
  LU0474966164: '28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-usa-index/LU0474966164): «Índice de referencia: S&P 500 Composite Index» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.44% detraído de esta Clase de participaciones»',
  LU0130731390: '28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-europe-index/LU0130731390): «Índice de referencia: MSCI Europe (EUR)» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.45% detraído de esta Clase de participaciones»',
  LU0474966750: '28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-japan-index/LU0474966750): «Índice de referencia: MSCI Japan Index» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.45% detraído de esta Clase de participaciones»',
  LU0474967055: '28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-pacific-ex-japan-index/LU0474967055): «Índice de referencia: MSCI Pacific ex-Japan (USD)» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.45% detraído de esta Clase de participaciones»',
  LU0474967998: '28-sep-2026, ficha de la GESTORA (https://am.pictet.com/es/es/individuals/funds/pictet-emerging-markets-index/LU0474967998): «Índice de referencia: MSCI Emerging Markets Index» y su Documento de Datos Fundamentales de 19/06/2026: «Comisiones de gestión y otros costes administrativos o de funcionamiento: 0.58% detraído de esta Clase de participaciones»',
  IE00BYX5NX33: '28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.fidelityinternational.com/FILPS/Documents/en/current/ret.en.xx.IE00BYX5NX33.pdf): «Fidelity MSCI World Index Fund P-ACC-Euro | Index Name: MSCI World Index (Net) | ISIN: IE00BYX5NX33 | Share Class Ongoing Charges: 0.12% | Distribution type: Accumulating»',
  IE00BYX5N771: '28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.fidelityinternational.com/FILPS/Documents/en/current/ret.en.xx.IE00BYX5N771.pdf): «Fidelity MSCI Japan Index Fund P-ACC-Euro | Index Name: MSCI Japan Index (Net) | ISIN: IE00BYX5N771 | Share Class Ongoing Charges: 0.10% | Distribution type: Accumulating»',
  LU0438093006: '28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.ssga.com/uk/en_gb/institutional/library-content/products/factsheets/mf/emea/factsheet-emea-en_gb-lu0438093006.pdf): «Share Class [P] All Investors | Benchmark FTSE EMU Government Bond Index | ISIN LU0438093006 | Minimum Initial Investment EUR 50.00 | Actual TER 0.36%»',
  LU0570151448: '28-sep-2026, ficha mensual de la GESTORA a 31-ago-2026 (https://www.ssga.com/uk/en_gb/institutional/library-content/products/factsheets/mf/emea/factsheet-emea-en_gb-lu0570151448.pdf): «Share Class [P] All Investors | Benchmark Bloomberg Global Treasury 40% Germany 40% France 20% Netherlands Custom Index | ISIN LU0570151448 | Minimum Initial Investment EUR 50.00 | Actual TER 0.38%»',
}
