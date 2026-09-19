import { describe, it, expect } from 'vitest'
import { GLOSSARY_TERMS } from '@/data/glossary'

/**
 * El título que sale en el buscador es la única parte del sitio que lee TODO el mundo que
 * nos ve, incluida la gente que nunca entra. Medido el 19-sep-2026, el glosario hacía 230
 * impresiones y 4 clics (1,7 %), y sus tres páginas con más volumen sumaban 145 impresiones
 * y UN clic. Se titulaban «X: qué es y cómo funciona», que promete justo lo que Bing ya
 * enseña debajo.
 *
 * Estas comprobaciones existen para que el remedio no traiga su propio problema.
 */

/**
 * Bing corta alrededor de los 65 caracteres y el layout añade « | BogleHub» (11). Con 55 de
 * margen, el título entero se ve y la marca también.
 *
 * Importa más de lo que parece: un título cortado a media frase promete algo y no se sabe
 * qué, que es peor que un título aburrido pero entero.
 */
const LARGO_MAXIMO = 55
const SUFIJO_MARCA = ' | BogleHub'

describe('títulos de búsqueda del glosario', () => {
  const conTitulo = GLOSSARY_TERMS.filter((t) => t.tituloSerp != null)

  it('hay títulos propios donde se decidió ponerlos', () => {
    // Si alguien los borra, que el test lo diga en vez de volver en silencio al genérico.
    expect(conTitulo.length).toBeGreaterThanOrEqual(6)
  })

  it('caben enteros en el resultado de búsqueda, con la marca', () => {
    const largos = conTitulo
      .filter((t) => t.tituloSerp!.length > LARGO_MAXIMO)
      .map((t) => `${t.slug}: ${t.tituloSerp!.length} caracteres (máx ${LARGO_MAXIMO})`)
    expect(largos, `se cortarían en el SERP: ${largos.join(', ')}`).toEqual([])
    for (const t of conTitulo) {
      expect((t.tituloSerp + SUFIJO_MARCA).length).toBeLessThanOrEqual(66)
    }
  })

  it('no repiten la plantilla genérica que veníamos a sustituir', () => {
    const genericos = conTitulo
      .filter((t) => /qu[ée] es y c[óo]mo funciona|definici[óo]n y ejemplos/i.test(t.tituloSerp!))
      .map((t) => t.slug)
    expect(genericos, `siguen prometiendo solo la definición: ${genericos.join(', ')}`).toEqual([])
  })

  it('ninguno está vacío ni lleva la marca dentro', () => {
    for (const t of conTitulo) {
      expect(t.tituloSerp!.trim().length, `${t.slug} vacío`).toBeGreaterThan(10)
      // El layout ya añade « | BogleHub»; ponerlo aquí lo duplicaría.
      expect(t.tituloSerp, `${t.slug} duplica la marca`).not.toMatch(/BogleHub/)
    }
  })

  /**
   * La regla que de verdad protege al lector: un título promete y la página cumple.
   *
   * No se puede comprobar el sentido por código, pero sí que la página tenga con qué
   * cumplirlo. Todos los que hay hoy salieron de una pregunta de la FAQ de su propia
   * página, así que exigir FAQ es la aproximación honesta a esa regla.
   *
   * Subir el clic con un título que la página no cumple funciona una vez y quema la página
   * para siempre.
   */
  it('cada título propio está en una página con FAQ que lo respalde', () => {
    const sinRespaldo = conTitulo
      .filter((t) => !t.faq || t.faq.length === 0)
      .map((t) => t.slug)
    expect(sinRespaldo, `prometen sin tener FAQ detrás: ${sinRespaldo.join(', ')}`).toEqual([])
  })
})
