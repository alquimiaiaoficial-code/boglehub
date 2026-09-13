import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

/**
 * Qué sale del servidor hacia el proveedor de IA, y qué no.
 *
 * Hasta el 8-sep-2026 el endpoint pasaba la `FireProjection` completa a `generateAiNarrative`.
 * Como `projectFire` devuelve `{ ...input, yearsToFire }` —no resume la entrada, la devuelve
 * entera— y `ai.ts` hace `JSON.stringify(input)`, a Groq (Estados Unidos) viajaban la
 * **aportación mensual** y el **objetivo de patrimonio** del usuario.
 *
 * Nadie decidió enviarlos: se colaban porque una función devolvía más de lo que hacía falta.
 *
 * Importaba por dos motivos distintos:
 *  1. `CUMPLIMIENTO-LEGAL.md` §1 se defendía diciendo que la herramienta «no conoce las
 *     circunstancias personales de nadie». Capacidad de ahorro y horizonte lo son.
 *  2. Es una transferencia internacional de datos financieros personales, y «650 € al mes»
 *     dice más de una persona que la lista de ETFs que tiene.
 *
 * El arreglo no le quita nada al usuario: la proyección la calcula el servidor, es
 * determinista y se sigue mostrando entera. El modelo solo necesita el resultado.
 *
 * Estos tests existen porque el tipo es fácil de ensanchar sin darse cuenta —basta volver a
 * pasar `fire` entero— y nada avisaría.
 */
describe('lo que se envía al proveedor de IA', () => {
  const ai = readFileSync('src/lib/ai.ts', 'utf8')
  const route = readFileSync('src/app/api/analyze/route.ts', 'utf8')

  it('el tipo que va al modelo NO admite la proyección completa', () => {
    expect(ai, 'AnalyzeInput no debe aceptar FireProjection: llevaría dentro los datos personales')
      .not.toMatch(/fire\?:\s*FireProjection/)
    expect(ai).toMatch(/fire\?:\s*\{\s*yearsToFire:\s*number\s*\}/)
  })

  it('ai.ts ya no importa FireProjection', () => {
    expect(ai).not.toMatch(/import .*FireProjection/)
  })

  it('el endpoint pasa solo el resultado, no el objeto entero', () => {
    expect(route, 'pasar `fire` entero devolvería la aportación y el objetivo al modelo')
      .not.toMatch(/generateAiNarrative\(\{\s*allocation,\s*fire,/)
    expect(route).toMatch(/yearsToFire:\s*fire\.yearsToFire/)
  })

  it('los textos declaran que esos datos NO llegan al proveedor de IA', () => {
    const politica = readFileSync('src/app/privacidad/page.tsx', 'utf8')
    expect(politica).toMatch(/no se envían al proveedor de IA/)
    const analizador = readFileSync('src/app/analyzer/page.tsx', 'utf8')
    expect(analizador).toMatch(/no salen de nuestro servidor|a Groq no se le envían/)
  })

  it('la proyección completa SÍ se sigue devolviendo al navegador', () => {
    // El usuario no pierde nada: lo que se recorta es lo que ve el modelo, no lo que ve él.
    expect(route).toMatch(/data:\s*\{[\s\S]*fire,/)
  })

  /**
   * Ampliación del 13-sep-2026. El payload se recortó el 8-sep y `llms.txt` **siguió
   * diciendo durante cinco días** que al modelo le llegaban «su patrimonio total, su
   * aportación mensual y su objetivo». Falso desde el recorte, y encima en la dirección
   * que nos hace parecer peores de lo que somos — por eso no saltó ninguna alarma: **una
   * afirmación falsa que nos perjudica no se siente como un error, se siente como
   * prudencia.**
   *
   * Se descubrió el mismo día en que el fundador publicaba en el foro un mensaje que
   * afirma lo contrario («la aportación mensual y el objetivo no salen de mi servidor»).
   * Cualquiera que hubiera comparado las dos cosas habría encontrado la contradicción.
   *
   * `llms.txt` es lo que los motores de IA leen y repiten: una frase falsa ahí no la lee
   * una persona, la propaga un tercero. Por eso entra en el mismo test que vigila el
   * payload, y no en uno aparte.
   */
  it('llms.txt describe el payload real y no el de antes del recorte', () => {
    const llms = readFileSync('src/app/llms.txt/route.ts', 'utf8')
    expect(
      llms,
      'llms.txt afirma que la aportación y el objetivo llegan al modelo; route.ts solo pasa yearsToFire',
    ).not.toMatch(/de su patrimonio total, su aportación mensual y su objetivo/)
    expect(llms, 'debe decir explícitamente que esos datos no salen del servidor').toMatch(
      /NO salen del servidor/,
    )
  })
})
