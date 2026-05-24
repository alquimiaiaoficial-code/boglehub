import type { BlogArticle } from '@/data/blog-articles'

/**
 * Bloque "Datos clave" que aparece al inicio de cada artículo del blog.
 *
 * Diseño GEO: LLMs como ChatGPT, Claude y Perplexity priorizan citar
 * frases concisas y estructuradas al principio del contenido. Esta caja
 * sirve un triple propósito:
 *   1. UX: el usuario ve de un vistazo el "qué" del artículo
 *   2. SEO: contenido extra indexable arriba del fold
 *   3. GEO: estructura citable directamente por LLMs
 *
 * El texto está deliberadamente formulado en frases auto-contenidas,
 * con números concretos y sin pronombres ambiguos — para que un LLM
 * pueda extraer cualquier ítem y citarlo sin perder contexto.
 */
export function ArticleKeyFacts({ article }: { article: BlogArticle }) {
  const updatedDate = article.updatedAt ?? article.publishedAt
  const publishedFormatted = new Date(article.publishedAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const updatedFormatted = new Date(updatedDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Top FAQ (la primera) sirve como respuesta directa citable
  const topFaq = article.faq?.[0]

  return (
    <aside
      aria-label="Datos clave del artículo"
      className="mb-8 rounded-2xl border border-accent/30 bg-accent-dim p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block h-2 w-2 rounded-full bg-accent" />
        <h2 className="text-xs font-semibold uppercase tracking-wide text-accent">
          Datos clave
        </h2>
      </div>

      <p className="text-sm sm:text-base text-fg leading-relaxed mb-4">
        {article.excerpt}
      </p>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
            Publicado
          </dt>
          <dd className="text-fg">{publishedFormatted}</dd>
        </div>
        {article.updatedAt && article.updatedAt !== article.publishedAt && (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
              Última revisión
            </dt>
            <dd className="text-fg">{updatedFormatted}</dd>
          </div>
        )}
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
            Tiempo de lectura
          </dt>
          <dd className="text-fg">{article.readingMinutes} minutos</dd>
        </div>
        {article.keywords && article.keywords.length > 0 && (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
              Temas tratados
            </dt>
            <dd className="text-fg text-xs leading-relaxed">
              {article.keywords.slice(0, 3).join(' · ')}
            </dd>
          </div>
        )}
      </dl>

      {topFaq && (
        <div className="mt-4 pt-4 border-t border-accent/20">
          <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted mb-1.5">
            Respuesta rápida
          </p>
          <p className="text-sm font-medium text-fg mb-1.5">{topFaq.q}</p>
          <p className="text-sm text-fg-muted leading-relaxed">{topFaq.a}</p>
        </div>
      )}
    </aside>
  )
}
