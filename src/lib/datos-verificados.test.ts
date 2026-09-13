import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import etfs from '@/data/etfs.json'

/**
 * Datos de terceros que caducan sin avisar.
 *
 * Contexto (13-sep-2026). El sitio publicó durante **mes y medio** que el TER de VWCE era
 * 0,19 %. Vanguard lo rebajó a **0,14 % con efecto del 28 de julio de 2026** (KIID de
 * IE00BK5BQT80 y de IE00B3RBWM25, ambos fechados ese día).
 *
 * Lo peor no es el dato: es cómo se sostuvo. El 7-sep, midiendo citación, se vio que Gemini
 * daba 0,22 % y **DEV concluyó «el nuestro es correcto; el suyo, viejo»**. Se verificó una
 * vez, se dio por zanjado, y nadie volvió a mirarlo — **que es exactamente el patrón que le
 * estábamos reprochando a Gemini con el 28 % del IRPF, con nosotros en el otro lado.**
 *
 * Lo levantó GEO el 13-sep midiendo la consulta del TER: Perplexity respondió 0,14 % «vigente
 * desde el 28 de julio de 2026», y **la fecha era demasiado específica para ignorarla**. No
 * afirmó que estuviéramos mal —no tenía la fuente que lo zanja— y pidió el KIID. Ese es el
 * comportamiento correcto: una discrepancia abierta declarada, ni error confirmado ni
 * descartado.
 *
 * ## Lo que este test puede y lo que no
 *
 * **No puede detectar que Vanguard baje el TER otra vez.** Ningún test lo puede: el dato vive
 * fuera. Lo que hace es **impedir que el sitio se contradiga a sí mismo** — que el catálogo y
 * el contenido publicado se separen, que es como sobreviven estos datos a medio corregir.
 *
 * Para lo otro no hay atajo: los datos de terceros hay que **re-verificarlos con fecha**, y
 * la única señal fiable de que uno ha caducado suele venir de fuera. Cuando un motor
 * contradiga un dato nuestro **con una fecha concreta**, eso no es ruido: es la señal.
 */

type Etf = { ticker: string; isin: string; ter: number }
const catalogo = etfs as unknown as Etf[]

/** Ficheros donde vive texto publicado. */
function ficherosDeContenido(): string[] {
  const out: string[] = []
  const anda = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name)
      if (e.isDirectory()) anda(p)
      else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) out.push(p)
    }
  }
  anda('src/data')
  anda('src/app')
  return out
}

describe('el TER de VWCE no se contradice entre el catálogo y lo publicado', () => {
  const vwce = catalogo.find((e) => e.ticker === 'VWCE')

  it('el catálogo trae el OCF del KIID vigente (0,14 %, KIID de 28-jul-2026)', () => {
    expect(vwce, 'VWCE debería estar en etfs.json').toBeDefined()
    expect(
      vwce!.ter,
      'si Vanguard ha vuelto a cambiarlo, actualiza el catálogo Y este número, y comprueba el KIID: https://fund-docs.vanguard.com/ie00bk5bqt80-en.pdf',
    ).toBe(0.14)
  })

  it('las tres clases del mismo fondo llevan el mismo OCF', () => {
    // VWCE y VWRP comparten ISIN (IE00BK5BQT80); VWRL es la de distribución
    // (IE00B3RBWM25). El aviso de Vanguard rebajó el OCF de CADA clase, y se comprobaron
    // los dos KIID por separado en vez de asumirlo.
    for (const t of ['VWCE', 'VWRP', 'VWRL']) {
      const e = catalogo.find((x) => x.ticker === t)
      if (e) expect(e.ter, `${t} debería llevar el mismo OCF que el resto de su fondo`).toBe(0.14)
    }
  })

  it('ningún texto publicado sigue diciendo que VWCE cuesta 0,19 %', () => {
    const culpables: string[] = []
    for (const f of ficherosDeContenido()) {
      const texto = readFileSync(f, 'utf8')
      for (const m of texto.matchAll(/[^.\n]{0,120}0[,.]19\s*%[^.\n]{0,120}/g)) {
        const frase = m[0]
        // Se permite nombrar el 0,19 % como valor ANTERIOR, que es información útil.
        if (/rebaj|desde el 0,19|antes|hasta julio|histór/i.test(frase)) continue
        if (/vwce|all-world|IE00BK5BQT80|IE00B3RBWM25/i.test(frase)) {
          culpables.push(`${f}: …${frase.trim().slice(0, 130)}…`)
        }
      }
    }
    expect(culpables, culpables.join('\n')).toEqual([])
  })
})
