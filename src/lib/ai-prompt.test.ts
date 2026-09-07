import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

/**
 * Lo que el sitio afirma que el modelo NO hace tiene que estar escrito en el prompt.
 *
 * El 7-sep-2026 `llms.txt` iba a publicar «el analizador no recomienda comprar, vender ni
 * rebalancear». DEV lo respaldó con un grep: `rebalance` no aparecía en `api/analyze/`.
 * Verificación lo tumbó con el argumento que da origen a este fichero:
 *
 *   «Que `rebalance` no esté en el código prueba que no hay una función de rebalanceo.
 *    No prueba nada sobre lo que el modelo escribe.»
 *
 * Y tenía razón: el prompt prohibía «compra X / vende Y» pero NO decía nada de rebalancear,
 * mientras ordenaba «sugiere áreas de mejora» e «identifica riesgos de concentración». A un
 * modelo con una cartera concentrada delante, eso le sale como «convendría reducir EE. UU.»,
 * que es proponer un rebalanceo.
 *
 * La solución no fue borrar la frase: fue añadir la regla al prompt para que la frase fuera
 * verdad. Estos tests atan las dos mitades, porque el riesgo es que alguien «limpie» el
 * prompt y deje publicada una promesa que ya no se sostiene.
 *
 * ⚠️ Esto NO garantiza la salida —un modelo no es determinista—, garantiza que la
 * instrucción existe. Por eso `llms.txt` dice expresamente que son reglas del system
 * prompt y no una función del código.
 */
describe('el system prompt sostiene lo que llms.txt promete', () => {
  const prompt = readFileSync('src/lib/ai.ts', 'utf8')
  const llms = readFileSync('src/app/llms.txt/route.ts', 'utf8')

  it('prohíbe explícitamente comprar y vender', () => {
    expect(prompt).toMatch(/NUNCA des consejo de inversión específico/)
  })

  it('prohíbe explícitamente rebalancear y cambiar pesos', () => {
    expect(
      prompt,
      'llms.txt promete que no propone rebalancear: si la regla sale del prompt, la promesa es falsa'
    ).toMatch(/NUNCA propongas rebalancear/)
  })

  it('prohíbe explícitamente proponer carteras concretas', () => {
    expect(prompt).toMatch(/NUNCA propongas una cartera concreta/)
  })

  it('llms.txt declara que la garantía viene del prompt, no del código', () => {
    // El matiz importa: entre lo que auditamos y lo que el usuario lee hay un modelo
    // no determinista. Presentarlo como garantía estructural sería exagerar.
    expect(llms).toMatch(/reglas explícitas del system prompt/)
  })

  it('si llms.txt promete «no rebalancear», el prompt tiene que decirlo', () => {
    if (/no propone rebalancear|ni rebalancear/i.test(llms)) {
      expect(prompt).toMatch(/rebalancear/)
    }
  })
})
