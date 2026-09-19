import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { FAMILIAS_RETIRADAS, estaRetirada, shouldIndex } from './seo-index-policy'
import sitemap from '../app/sitemap'

/**
 * Las cinco familias borradas el 19-sep-2026 tienen que seguir borradas, y seguir dando 410.
 *
 * Por qué hace falta un test para algo que ya está hecho. Un borrado no se queda hecho solo:
 * basta con que alguien recree una carpeta, o que el `matcher` del proxy se quede corto, para
 * que la mitad del trabajo se deshaga en silencio. Y el modo de fallo silencioso es el peor
 * de los dos posibles:
 *
 *   · Si vuelve el `page.tsx` y NO el matcher -> la URL revive en 200 y vuelve al índice.
 *   · Si se quita del matcher sin más         -> pasa de 410 a 404, que es una señal más
 *                                                débil: el buscador la reintenta meses.
 *
 * El `matcher` del proxy no puede derivarse de `FAMILIAS_RETIRADAS` porque Next lo lee en el
 * build, antes de ejecutar nada, y tiene que ser un literal. Esa duplicación es obligada, así
 * que lo que se puede hacer es que rompa el test en cuanto las dos listas se separen.
 */
describe('las familias retiradas siguen retiradas', () => {
  const NOMBRES = FAMILIAS_RETIRADAS.map((f) => f.replace(/\//g, ''))

  it('hay algo que comprobar (si esto falla, el resto del fichero no mira nada)', () => {
    expect(FAMILIAS_RETIRADAS.length).toBe(5)
  })

  it('ninguna tiene ya carpeta en src/app: están borradas de verdad, no escondidas', () => {
    const vivas = NOMBRES.filter((n) => existsSync(`src/app/${n}`))
    expect(
      vivas,
      `estas carpetas volvieron a aparecer y sus URLs responderían 200 otra vez: ${vivas.join(', ')}`,
    ).toEqual([])
  })

  it('el matcher del proxy cubre exactamente las cinco, ni una más ni una menos', () => {
    const proxy = readFileSync('src/proxy.ts', 'utf8')
    const enElMatcher = [...proxy.matchAll(/'(\/[a-z-]+)\/:path\*'/g)].map((m) => m[1] + '/')

    expect(
      [...enElMatcher].sort(),
      'el matcher del proxy y FAMILIAS_RETIRADAS se han separado: una de las dos miente',
    ).toEqual([...FAMILIAS_RETIRADAS].sort())
  })

  it('estaRetirada acierta con la URL real y con el prefijo pelado', () => {
    expect(estaRetirada('/dca/vwce/20-anios')).toBe(true)
    expect(estaRetirada('/comprar/vwce/degiro')).toBe(true)
    expect(estaRetirada('/ahorrar/100-euros-al-mes/para/1-millon-euros')).toBe(true)
    expect(estaRetirada('/analiza/vwce/donde-comprar')).toBe(true)
    expect(estaRetirada('/comparar-cartera/boglehead-3-vs-all-weather')).toBe(true)
    // El hub pelado tampoco existía, pero si alguien lo pide que reciba la misma respuesta.
    expect(estaRetirada('/dca')).toBe(true)
  })

  it('no se lleva por delante rutas vivas que empiezan parecido', () => {
    // El que más miedo da: `/analiza` y `/analyzer` comparten seis letras, y `/analyzer` es
    // la página del producto. Que un prefijo mal escrito la tumbara sería el peor resultado
    // posible de este borrado.
    for (const viva of ['/analyzer', '/comparar/vwce-vs-cndx', '/comparar-fondo/algo', '/cartera/boglehead-3']) {
      expect(estaRetirada(viva), `${viva} está viva y el 410 se la estaba comiendo`).toBe(false)
    }
  })

  it('el sitemap no anuncia ni una sola URL retirada', () => {
    const anunciadas = sitemap()
      .map((r) => r.url.replace('https://boglehub.com', ''))
      .filter((p) => estaRetirada(p))
    expect(anunciadas.slice(0, 5), 'el sitemap manda a los buscadores a páginas que dan 410').toEqual([])
  })

  it('nada del sitio enlaza a una familia retirada', () => {
    // Un enlace interno a un 410 es peor que uno a un 404: le dice al rastreador que la
    // página importa lo bastante para enlazarla y a la vez que no existe.
    const rotos: string[] = []
    const recorrer = (dir: string) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        const ruta = `${dir}/${e.name}`
        if (e.isDirectory()) recorrer(ruta)
        else if (/\.(tsx?|json)$/.test(e.name) && !e.name.includes('.test.')) {
          for (const m of readFileSync(ruta, 'utf8').matchAll(/href=["'{`]+(\/[a-z0-9-/[\]${}.]+)/gi)) {
            if (estaRetirada(m[1])) rotos.push(`${ruta} -> ${m[1]}`)
          }
        }
      }
    }
    recorrer('src')
    expect(rotos.slice(0, 10), `enlaces internos a páginas borradas:\n  ${rotos.join('\n  ')}`).toEqual([])
  })

  it('shouldIndex ya no las trata como noindex, porque no son una política sino un borrado', () => {
    // Sutil y a propósito. Dejarlas en NOINDEX_PREFIXES habría sido configuración muerta que
    // el siguiente lector interpretaría como «existen pero no las indexamos». No existen.
    // Quien decide su respuesta es el proxy, no la política de indexación.
    expect(shouldIndex('/dca/vwce/20-anios')).toBe(true)
    expect(estaRetirada('/dca/vwce/20-anios')).toBe(true)
  })
})
