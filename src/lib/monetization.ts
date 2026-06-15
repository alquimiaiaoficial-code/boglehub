/**
 * Arquitectura de monetización pre-cableada (apagada por defecto).
 *
 * El fundador es menor de edad: NADA de esto se activa hasta que cumpla 18 y lo
 * decida. Hasta entonces `NEXT_PUBLIC_MONETIZATION_ENABLED` no existe (o es
 * "false") y todos los enlaces salen como enlaces normales a la web oficial de
 * cada bróker.
 *
 * El día de la activación, el proceso es SOLO configuración (cero código):
 *   1. Rellenar AFFILIATE_URLS con las URLs de afiliado aprobadas.
 *   2. Poner NEXT_PUBLIC_MONETIZATION_ENABLED=true en Vercel y redeploy.
 * Con el flag activo, los enlaces con URL de afiliado pasan a rel="sponsored"
 * (requisito de Google) y muestran la etiqueta "enlace de afiliado" (requisito
 * LSSI de identificar comunicaciones comerciales). Los brókers sin URL de
 * afiliado siguen saliendo como enlaces normales: jamás se etiqueta como
 * afiliado lo que no lo es, ni se esconde que lo es.
 */

const MONETIZATION_ENABLED =
  process.env.NEXT_PUBLIC_MONETIZATION_ENABLED === 'true'

/**
 * Algunos brókers conviven con dos identificadores en el código: el catálogo de
 * fichas (`src/data/brokers.ts`, usado por `/broker/[slug]`, `/vs-broker` y el
 * componente `BrokerCTA`) los identifica por SLUG; el comparador
 * (`src/lib/brokers.ts`) usa un `id` abreviado. Para que un único mapa de
 * afiliado sirva a TODOS los puntos de salida sin duplicar entradas,
 * normalizamos cualquier id de entrada al slug canónico antes de buscar.
 *
 * Solo difieren estos dos; el resto (myinvestor, trade-republic, degiro, xtb)
 * coinciden en ambos esquemas.
 */
const BROKER_ID_ALIASES: Record<string, string> = {
  ibkr: 'interactive-brokers',
  scalable: 'scalable-capital',
}

/** Devuelve el slug canónico de un bróker (resuelve alias del comparador). */
export function canonicalBrokerId(id: string): string {
  return BROKER_ID_ALIASES[id] ?? id
}

/**
 * URLs de afiliado por SLUG canónico de bróker (los de src/data/brokers.ts).
 * Vacío hasta el día de la activación. Solo brókers que recomendaríamos gratis.
 */
const AFFILIATE_URLS: Record<string, string> = {
  // myinvestor: '',
  // 'trade-republic': '',
  // degiro: '',
  // 'interactive-brokers': '',
}

export interface OutboundBrokerLink {
  /** URL final a la que enlazar (afiliado si procede, oficial si no). */
  url: string
  /** true solo si el enlace que sale es realmente de afiliado. */
  isAffiliate: boolean
  /** Valor para el atributo rel del <a>. */
  rel: string
}

/**
 * Núcleo puro (testeable sin tocar el entorno): decide qué enlace sale para un
 * bróker dado el estado del flag y el mapa de URLs de afiliado.
 */
export function resolveBrokerLink(
  brokerId: string,
  officialUrl: string,
  enabled: boolean,
  affiliateUrls: Record<string, string>,
): OutboundBrokerLink {
  const affiliateUrl = enabled
    ? affiliateUrls[canonicalBrokerId(brokerId)]
    : undefined
  if (affiliateUrl) {
    return { url: affiliateUrl, isAffiliate: true, rel: 'sponsored noopener noreferrer' }
  }
  return { url: officialUrl, isAffiliate: false, rel: 'noopener noreferrer' }
}

/** Enlace de salida para un bróker, según el flag global. Úsese en los CTAs. */
export function getBrokerLink(brokerId: string, officialUrl: string): OutboundBrokerLink {
  return resolveBrokerLink(brokerId, officialUrl, MONETIZATION_ENABLED, AFFILIATE_URLS)
}

/** Texto legal corto que acompaña a un enlace de afiliado (LSSI). */
export const AFFILIATE_LABEL = 'enlace de afiliado'
