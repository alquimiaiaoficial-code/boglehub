'use client'

import { getBrokerBySlug } from '@/data/brokers'
import { getBrokerLink, AFFILIATE_LABEL } from '@/lib/monetization'
import { trackEvent } from '@/lib/analytics'

/**
 * CTA de salida reutilizable hacia un bróker, para insertar en reviews y
 * comparativas del blog sin hardcodear URLs (lee de `src/data/brokers.ts`).
 *
 * Monetización pre-cableada y APAGADA por defecto: hoy enlaza a la web OFICIAL
 * del bróker, con `rel="noopener noreferrer"` y sin etiqueta. El día que se
 * active el flag (`NEXT_PUBLIC_MONETIZATION_ENABLED`) y exista URL de afiliado
 * para ese bróker, el MISMO componente pasa a `rel="sponsored"` y muestra
 * "(enlace de afiliado)" (requisito LSSI). Nada que cambiar en el contenido.
 * Ver `src/lib/monetization.ts`.
 *
 * Uso: `<BrokerCTA broker="trade-republic" />`
 */
export function BrokerCTA({
  broker,
  label,
  className,
}: {
  /** Slug del bróker en `src/data/brokers.ts` (p. ej. "trade-republic"). */
  broker: string
  /** Texto del botón. Por defecto: "Abrir cuenta en {nombre}". */
  label?: string
  /** Clases extra para el contenedor. */
  className?: string
}) {
  const data = getBrokerBySlug(broker)
  // Defensivo: si el slug no existe, no renderizamos nada (no rompe el artículo).
  if (!data) return null

  const link = getBrokerLink(data.slug, data.officialUrl)
  const text = label ?? `Abrir cuenta en ${data.name}`

  return (
    <span className={className}>
      <a
        href={link.url}
        target="_blank"
        rel={link.rel}
        onClick={() =>
          trackEvent('broker_link_clicked', {
            broker: data.slug,
            affiliate: link.isAffiliate,
            surface: 'broker_cta',
          })
        }
        className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-500 transition-colors no-underline"
      >
        {text}
        <span aria-hidden="true">→</span>
      </a>
      {link.isAffiliate && (
        <span className="ml-2 text-xs text-fg-subtle">({AFFILIATE_LABEL})</span>
      )}
    </span>
  )
}
