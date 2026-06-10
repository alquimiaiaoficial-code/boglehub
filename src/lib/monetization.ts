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
 * URLs de afiliado por id de bróker (ids de src/lib/brokers.ts).
 * Vacío hasta el día de la activación. Solo brókers que recomendaríamos gratis.
 */
const AFFILIATE_URLS: Record<string, string> = {
  // myinvestor: '',
  // traderepublic: '',
  // degiro: '',
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
  const affiliateUrl = enabled ? affiliateUrls[brokerId] : undefined
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
