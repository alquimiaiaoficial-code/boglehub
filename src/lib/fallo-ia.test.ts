import { describe, it, expect } from 'vitest'
import { clasificarFalloDeIa } from './fallo-ia'

/**
 * El 8-sep-2026 el chat devolvía 502 y el analizador el texto de reserva, y desde fuera
 * era imposible saber por qué. Descartar causas costó media hora: hubo que comprobar la
 * página de estado de Groq, la lista de deprecaciones y el código de estado del endpoint
 * para deducir —por eliminación— que la clave estaba siendo rechazada.
 *
 * Estos tests fijan esa deducción para que la próxima vez la haga el servidor.
 */
describe('clasificación de fallos del proveedor de IA', () => {
  it('reconoce un modelo retirado', () => {
    expect(clasificarFalloDeIa('404 model_not_found: llama-3.3-70b-versatile')).toBe('modelo-retirado')
    expect(clasificarFalloDeIa('The model `x` does not exist')).toBe('modelo-retirado')
    expect(clasificarFalloDeIa('model has been decommissioned')).toBe('modelo-retirado')
  })

  it('reconoce un problema de credenciales', () => {
    expect(clasificarFalloDeIa('401 Invalid API Key')).toBe('credenciales')
    expect(clasificarFalloDeIa('Error code: 401 - authentication_error')).toBe('credenciales')
    expect(clasificarFalloDeIa('Unauthorized')).toBe('credenciales')
  })

  it('reconoce falta de cuota o exceso de peticiones', () => {
    expect(clasificarFalloDeIa('429 Too Many Requests: rate limit exceeded')).toBe('cuota')
    expect(clasificarFalloDeIa('insufficient_quota')).toBe('cuota')
  })

  it('lo desconocido se marca transitorio, no se inventa una causa', () => {
    // Importa que el caso por defecto sea el que se resuelve solo: llamar «credenciales»
    // a un corte de red mandaría a alguien a rotar una clave que estaba bien.
    expect(clasificarFalloDeIa('socket hang up')).toBe('transitorio')
    expect(clasificarFalloDeIa('')).toBe('transitorio')
  })

  it('el modelo retirado gana sobre el resto aunque el texto mencione otras cosas', () => {
    // Un error real puede llevar varias palabras clave; el orden de comprobación importa
    // porque «modelo retirado» es el único que exige desplegar código.
    expect(clasificarFalloDeIa('401 model_not_found rate limit')).toBe('modelo-retirado')
  })
})
