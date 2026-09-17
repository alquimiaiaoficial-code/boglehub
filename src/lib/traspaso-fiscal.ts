/**
 * Lo que la ley española permite hacer con un solapamiento, según de qué productos sea.
 *
 * ES LA RAZÓN POR LA QUE ESTA HERRAMIENTA TIENE SENTIDO EN ESPAÑA. Detectar que dos
 * productos se solapan sirve de poco si no se dice qué cuesta deshacerlo, y en España eso
 * depende por completo del tipo de producto: entre fondos hay diferimiento, con ETF no.
 * Nadie más lo dice, y es la mitad del valor de la respuesta.
 *
 * FUENTE, VERIFICADA EN EL BOE EL 18-sep-2026 y no de memoria: artículo 94.1.a) de la
 * Ley 35/2006 del IRPF, texto consolidado, **versión vigente desde el 1 de enero de 2022**
 * (la redactó el art. 3.5 de la Ley 11/2021, de 9 de julio, BOE-A-2021-11473, con efectos
 * desde esa fecha según su disposición final 7.c).
 *
 * ⚠️ La API del BOE devuelve CINCO versiones de este artículo —2007, 2011, 2010, 2015 y
 * 2022— y hay que tomar la última. Quedarse con la primera que sale es la trampa que ya nos
 * costó una vez.
 *
 * LO QUE DICE, LITERAL:
 *   «Cuando el importe obtenido como consecuencia del reembolso o transmisión de
 *   participaciones o acciones en instituciones de inversión colectiva se destine [...] a la
 *   adquisición o suscripción de otras acciones o participaciones en instituciones de
 *   inversión colectiva, no procederá computar la ganancia o pérdida patrimonial, y las
 *   nuevas acciones o participaciones suscritas conservarán el valor y la fecha de
 *   adquisición de las acciones o participaciones transmitidas o reembolsadas».
 *
 * Y NO ES INCONDICIONAL. El propio artículo pone dos límites que no se pueden callar:
 *
 *  1. **El dinero no puede pasar por las manos del inversor.** «El régimen de diferimiento
 *     [...] no resultará de aplicación cuando, por cualquier medio, se ponga a disposición
 *     del contribuyente el importe derivado del reembolso o transmisión». O sea: traspaso
 *     tramitado entre entidades, no vender y volver a comprar.
 *
 *  2. **Los ETF están excluidos expresamente**, y con una amplitud que no deja resquicio:
 *     el punto 3.º exige que la operación «no tenga por objeto participaciones o acciones en
 *     instituciones de inversión colectiva análogas a los fondos de inversión cotizados o
 *     sociedades del mismo tipo previstos en el artículo 79 del Reglamento de desarrollo de
 *     la Ley 35/2003, **cualquiera que sea el mercado regulado o el sistema multilateral de
 *     negociación en el que coticen y la composición del índice que reproduzcan**».
 *
 * LÍMITE DE LO QUE ESTO PUEDE DECIR. Describe qué permite la norma; no recomienda a nadie
 * hacer ni deshacer nada, y no puede. BogleHub no está registrada en la CNMV y no presta
 * asesoramiento: la diferencia práctica es que aquí se explica el mecanismo y quien decide
 * es el lector. Por eso los textos de abajo están redactados en indicativo sobre la ley
 * («la ley permite», «no se computa») y nunca en imperativo sobre la persona
 * («traspasa», «deberías»). `lenguaje-prescriptivo.test.ts` lo vigila.
 */

/** De qué está hecho un par que se solapa. Determina qué se puede decir sobre deshacerlo. */
export type TipoDePar =
  /** Los dos son fondos de inversión: cabe el diferimiento del art. 94. */
  | 'ambos-fondos'
  /** Los dos son ETF: excluidos del diferimiento, deshacerlo pasa por vender. */
  | 'ambos-etf'
  /** Uno de cada. El diferimiento no cubre el paso de ETF a fondo ni al revés. */
  | 'mixto'

export interface ConsecuenciaFiscal {
  tipo: TipoDePar
  /** Frase corta para la tarjeta del par. */
  titular: string
  /** La explicación, con su condición. Se enseña entera: la condición es parte del hecho. */
  detalle: string
  /** `true` solo cuando la ley permite deshacerlo sin computar la ganancia. */
  admiteDiferimiento: boolean
}

const CITA_LEGAL =
  'Artículo 94.1.a) de la Ley 35/2006 del IRPF, en su versión vigente desde el 1 de enero de 2022.'

export function consecuenciaFiscal(tipo: TipoDePar): ConsecuenciaFiscal {
  switch (tipo) {
    case 'ambos-fondos':
      return {
        tipo,
        admiteDiferimiento: true,
        titular: 'Entre fondos, la ley permite mover el dinero sin pagar impuestos por el camino',
        detalle:
          'Cuando el reembolso de un fondo se destina a suscribir otro fondo, la ley dice que ' +
          '«no procederá computar la ganancia o pérdida patrimonial», y las nuevas ' +
          'participaciones conservan el valor y la fecha de adquisición de las antiguas: el ' +
          'impuesto no desaparece, se aplaza hasta que se venda de verdad. La condición es que ' +
          'el importe no llegue a estar a disposición del inversor, es decir, que sea un ' +
          'traspaso tramitado entre entidades y no una venta seguida de una compra. ' +
          CITA_LEGAL,
      }
    case 'ambos-etf':
      return {
        tipo,
        admiteDiferimiento: false,
        titular: 'Entre ETF no hay traspaso: deshacer este solapamiento pasa por vender',
        detalle:
          'El diferimiento del artículo 94 excluye expresamente a los fondos cotizados, ' +
          '«cualquiera que sea el mercado regulado o el sistema multilateral de negociación en ' +
          'el que coticen y la composición del índice que reproduzcan». Así que reducir la ' +
          'parte repetida de dos ETF implica una venta, y la ganancia acumulada tributa ese ' +
          'año en la base del ahorro. ' + CITA_LEGAL,
      }
    case 'mixto':
      return {
        tipo,
        admiteDiferimiento: false,
        titular: 'Un fondo y un ETF: entre ellos no hay traspaso posible',
        detalle:
          'El diferimiento solo funciona de fondo a fondo. Pasar de un ETF a un fondo exige ' +
          'vender el ETF, y esa venta tributa; y un fondo traspasado a un ETF tampoco conserva ' +
          'el diferimiento, porque los cotizados están excluidos del régimen. ' + CITA_LEGAL,
      }
  }
}

/** Clasifica un par a partir de si cada lado es un fondo indexado. */
export function tipoDePar(aEsFondo: boolean, bEsFondo: boolean): TipoDePar {
  if (aEsFondo && bEsFondo) return 'ambos-fondos'
  if (!aEsFondo && !bEsFondo) return 'ambos-etf'
  return 'mixto'
}
