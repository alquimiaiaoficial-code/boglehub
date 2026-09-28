/**
 * Tope de caracteres que se mandan al modelo del chat por petición (28-sep-2026).
 *
 * El esquema admite 40 mensajes de 8.000 caracteres: 320.000 por llamada. Con unas pocas
 * peticiones así se agotaba la cuota de la IA para todo el sitio. Se conservan los mensajes
 * más recientes, que son los que dan contexto a la respuesta, y si el último por sí solo ya
 * pasa del tope se recorta por el principio.
 */
export const MAX_CARACTERES_CHAT = 24_000

export function recortarConversacion<T extends { content: string }>(mensajes: T[], max = MAX_CARACTERES_CHAT): T[] {
  const salida: T[] = []
  let total = 0
  for (let i = mensajes.length - 1; i >= 0; i--) {
    const m = mensajes[i]
    if (total + m.content.length > max) {
      if (salida.length === 0) salida.unshift({ ...m, content: m.content.slice(-max) })
      break
    }
    salida.unshift(m)
    total += m.content.length
  }
  return salida
}
