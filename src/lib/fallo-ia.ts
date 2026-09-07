/**
 * Por qué ha fallado la llamada al proveedor de IA.
 *
 * Nació el 8-sep-2026, después de una caída que costó media hora diagnosticar a ciegas.
 * El chat devolvía un `502` genérico para todo lo que no fuera «modelo retirado», así que
 * desde fuera —y desde el informe semanal— era imposible distinguir tres cosas muy
 * distintas: que la clave estuviera rechazada, que se hubiera agotado la cuota, o que Groq
 * tuviera un corte. Las tres se arreglan de forma diferente y solo una se arregla sola.
 *
 * ⚠️ Esto NO cambia lo que ve el usuario en ningún caso donde antes viera algo distinto:
 * el mensaje sigue siendo amable y sin detalle técnico. Lo que se gana es el registro del
 * servidor y un código de estado que significa algo.
 *
 * Contexto de por qué importa tanto aquí: entre el 16 y el 31 de agosto de 2026 el chat y
 * el analizador estuvieron caídos en producción quince días **sin que nadie se enterara**,
 * porque el análisis numérico se sigue entregando y el sitio parece sano.
 */
export type CausaFalloIa =
  /** La clave no vale: revocada, mal copiada o de otra cuenta. Requiere intervención. */
  | 'credenciales'
  /** Sin cuota o demasiadas peticiones. Puede resolverse solo al pasar la ventana. */
  | 'cuota'
  /** El modelo ya no existe: hay que actualizar `GROQ_MODEL`. Requiere despliegue. */
  | 'modelo-retirado'
  /** Corte, timeout o error inesperado del proveedor. Suele resolverse solo. */
  | 'transitorio'

/**
 * Clasifica a partir del mensaje de error del SDK. Se mira el texto porque el SDK no
 * expone un código estable entre versiones; si algún día lo expone, esto se sustituye.
 */
export function clasificarFalloDeIa(detalle: string): CausaFalloIa {
  const d = detalle.toLowerCase()

  if (d.includes('model_not_found') || d.includes('does not exist') || d.includes('decommissioned')) {
    return 'modelo-retirado'
  }
  if (
    d.includes('401') ||
    d.includes('invalid api key') ||
    d.includes('invalid_api_key') ||
    d.includes('authentication') ||
    d.includes('unauthorized')
  ) {
    return 'credenciales'
  }
  if (
    d.includes('429') ||
    d.includes('rate limit') ||
    d.includes('rate_limit') ||
    d.includes('quota') ||
    d.includes('insufficient')
  ) {
    return 'cuota'
  }
  return 'transitorio'
}
