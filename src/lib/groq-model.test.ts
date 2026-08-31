import { describe, it, expect } from 'vitest'
import { GROQ_MODEL, MODELOS_RETIRADOS } from './groq-model'
import { readFileSync } from 'node:fs'

/**
 * El chat y el analizador estuvieron quince días caídos en producción (16 a 31 de
 * agosto de 2026) porque Groq retiró `llama-3.3-70b-versatile` y nadie lo cambió.
 * La API devolvía 404 y no había nada que lo detectara.
 *
 * Estos tests no pueden llamar a la API en el build, pero sí evitan las dos formas
 * en que el fallo se coló: apuntar a un modelo ya retirado, y que el identificador
 * viva duplicado en varios ficheros donde uno se actualiza y el otro no.
 */
describe('modelo de Groq', () => {
  it('no apunta a un modelo que Groq ya ha retirado', () => {
    expect(
      MODELOS_RETIRADOS,
      `${GROQ_MODEL} está retirado: la API devolverá 404 y la IA del sitio dejará de responder`
    ).not.toContain(GROQ_MODEL)
  })

  it('el identificador no está duplicado fuera de groq-model.ts', () => {
    // Si alguien vuelve a escribir el modelo a pelo en otro fichero, reaparece el
    // problema de que una actualización se olvide de la otra copia.
    for (const fichero of ['src/lib/ai.ts', 'src/app/api/chat/route.ts']) {
      const contenido = readFileSync(fichero, 'utf8')
      expect(
        contenido.includes(GROQ_MODEL),
        `${fichero} escribe el modelo a pelo en vez de importar GROQ_MODEL`
      ).toBe(false)
      expect(contenido).toContain('GROQ_MODEL')
    }
  })

  it('el modelo tiene un formato plausible de identificador de Groq', () => {
    expect(GROQ_MODEL.length).toBeGreaterThan(3)
    expect(GROQ_MODEL).toMatch(/^[a-z0-9][a-z0-9._/-]*$/)
  })
})
