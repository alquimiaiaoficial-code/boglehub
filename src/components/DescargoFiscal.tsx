/**
 * Descargo para páginas con contenido fiscal o de inversión.
 *
 * Por qué existe: `CUMPLIMIENTO-LEGAL.md` §5 pide descargo **visible** en toda página
 * con contenido fiscal, y un barrido de producción encontró 153 URLs que no lo tenían.
 * La línea del pie («Información educativa, no asesoramiento financiero») va junto al
 * copyright, en letra pequeña y fuera del contenido: es chrome del sitio, no un descargo
 * asociado a lo que se acaba de leer.
 *
 * También cubre dos requisitos del régimen de recomendaciones de inversión (MAR):
 * identificar al autor y separar el dato de la opinión. Ver §1 bis del mismo documento.
 *
 * `variant="fiscal"` añade la advertencia de que la normativa cambia; se usa donde hay
 * tramos, plazos o cifras tributarias, que es lo que caduca.
 */
export function DescargoFiscal({
  variant = 'general',
  lang = 'es',
}: {
  variant?: 'general' | 'fiscal'
  lang?: 'es' | 'en'
}) {
  if (lang === 'en') {
    return (
      <aside
        role="note"
        aria-label="Notice about this content"
        className="mt-10 rounded-xl border border-border bg-surface-2 p-5 text-sm text-fg-muted leading-relaxed"
      >
        <p>
          <strong className="text-fg">Educational content by BogleHub.</strong> This is not
          financial, tax or investment advice, nor a recommendation to buy or sell. We do not
          know your personal circumstances, so nothing here is meant to be suitable for your
          particular case.
        </p>
        {variant === 'fiscal' && (
          <p className="mt-2">
            Tax rules change, and the figures shown correspond to the tax year stated in the
            text. Before making any decision with tax consequences, consult a professional and
            check with the Spanish tax authority (Agencia Tributaria).
          </p>
        )}
        <p className="mt-2">
          Past performance does not guarantee future results, and every projection rests on
          assumptions that are stated case by case.
        </p>
      </aside>
    )
  }

  return (
    <aside
      role="note"
      aria-label="Aviso sobre el contenido"
      className="mt-10 rounded-xl border border-border bg-surface-2 p-5 text-sm text-fg-muted leading-relaxed"
    >
      <p>
        <strong className="text-fg">Contenido educativo de BogleHub.</strong> No constituye
        asesoramiento financiero, fiscal ni de inversión, ni una recomendación de compra o
        venta. No conocemos tus circunstancias personales, así que nada de lo que leas aquí
        está pensado como adecuado para tu caso concreto.
      </p>
      {variant === 'fiscal' && (
        <p className="mt-2">
          La normativa fiscal cambia y las cifras que aparecen corresponden al ejercicio
          indicado en el texto. Antes de tomar cualquier decisión con consecuencias
          tributarias, consulta con un asesor y contrasta con la Agencia Tributaria.
        </p>
      )}
      <p className="mt-2">
        Las rentabilidades pasadas no garantizan resultados futuros, y toda proyección parte
        de supuestos que se indican en cada caso.
      </p>
    </aside>
  )
}
