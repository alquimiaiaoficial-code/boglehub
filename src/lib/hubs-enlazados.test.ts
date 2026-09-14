import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { shouldIndex } from './seo-index-policy'

/**
 * Ningún hub que pedimos indexar puede quedar sin camino desde la home.
 *
 * Contexto (14-sep-2026). El informe de Search Console daba esto sobre las URLs del sitemap:
 *
 *   Rastreada: actualmente sin indexar   51 %   ~161
 *   **Google no reconoce esta URL**      43 %   ~136
 *   Enviada e indexada                    7 %    ~22
 *
 * Y la lectura que importa, que estaba escrita desde agosto y nadie había conectado con su
 * causa: **«casi la mitad de lo que pedimos indexar no ha sido pedido por Google ni una sola
 * vez. No es que lo mire y lo descarte por calidad: es que no llega.»**
 *
 * Al mirar por qué no llegaba, la respuesta era trivial y llevaba meses ahí: **`/broker`,
 * `/roboadvisor`, `/gestora`, `/cartera`, `/perfil`, `/mercado`, `/pais`, `/sector` y once
 * hubs más no tenían NI UN enlace desde el menú ni desde el pie.** Googlebot entra por la
 * home, sigue enlaces, y no había camino. Las familias de más intención comercial eran
 * justamente las invisibles.
 *
 * Esto separa dos problemas que se venían tratando como uno:
 *
 * | síntoma | causa | lo arregla |
 * |---|---|---|
 * | «Google no reconoce esta URL» | no hay camino hasta ella | **enlaces internos: esto** |
 * | «Rastreada: actualmente sin indexar» | la vio y no la quiso | autoridad, contenido |
 *
 * Pedir indexación a mano ataca el primero y apenas mueve el segundo. Por eso importa saber
 * en cuál está cada URL antes de gastar cuota en ella.
 */

/** Rutas estáticas de primer nivel: `src/app/<algo>/page.tsx`, sin segmento dinámico. */
function hubsDePrimerNivel(): string[] {
  const { readdirSync, existsSync } = require('node:fs') as typeof import('node:fs')
  return readdirSync('src/app', { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('[') && !e.name.startsWith('(') && e.name !== 'api')
    .filter((e) => existsSync(`src/app/${e.name}/page.tsx`))
    .map((e) => `/${e.name}`)
}

describe('todo hub indexable tiene un enlace desde la navegación', () => {
  const nav =
    readFileSync('src/components/Footer.tsx', 'utf8') + readFileSync('src/components/Header.tsx', 'utf8')

  it('hay hubs que comprobar (si esto falla, el barrido no mira nada)', () => {
    expect(hubsDePrimerNivel().length).toBeGreaterThan(15)
  })

  it('ningún hub que pedimos indexar se queda huérfano', () => {
    const huerfanos = hubsDePrimerNivel()
      .filter((h) => shouldIndex(h))
      .filter((h) => !nav.includes(`href="${h}"`))

    expect(
      huerfanos,
      `estos hubs están en el sitemap y no se enlazan desde el menú ni el pie, así que ` +
        `Googlebot no tiene camino hasta ellos:\n  ${huerfanos.join('\n  ')}`,
    ).toEqual([])
  })

  it('las familias de intención comercial siguen enlazadas, que eran las invisibles', () => {
    // Explícitas y por su nombre: son las que el informe señaló como familias enteras sin
    // rastrear, y las que más caro cuesta perder. Un test genérico las taparía si alguien
    // cambia la estructura de carpetas.
    for (const h of ['/broker', '/roboadvisor', '/gestora']) {
      expect(nav, `${h} sin enlace: era una de las tres familias invisibles`).toContain(`href="${h}"`)
    }
  })
})
