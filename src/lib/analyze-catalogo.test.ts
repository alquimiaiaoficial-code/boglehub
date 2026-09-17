import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { getEtfByTicker } from './etf-database'

/**
 * Lo que el analizador le dice a quien tiene fondos indexados.
 *
 * Contexto (11-sep-2026). `fetchPrices` devuelve error cuando no consigue NI UN precio, y
 * `route.ts` traducía eso a **«Servicio de precios temporalmente no disponible. Inténtalo
 * de nuevo en unos minutos»**, con un 503.
 *
 * La deducción era falsa. «Ningún precio» tiene dos causas y el código solo contemplaba una:
 *
 *   1. Los proveedores están caídos            -> temporal, reintentar sirve
 *   2. Ningún ticker está en el catálogo       -> permanente, reintentar NO sirve
 *
 * Y el caso 2 es justo el del nicho español: quien tiene la cartera en **fondos indexados**
 * —que se traspasan sin tributar, y por eso son media cartera de mucha gente— recibía un
 * mensaje que le decía dos mentiras seguidas: que era temporal y que reintentara.
 *
 * Se descubrió preparando el mensaje para el foro Bogleheads España, donde íbamos a
 * publicar que los fondos no se leen. Alguien lo habría probado el mismo día y habría visto
 * «temporalmente no disponible». No es solo un texto malo: es el código diciendo algo que no
 * es verdad, que es exactamente lo que llevamos toda la semana persiguiendo en la prosa.
 *
 * ⚠️ **Y la prueba que lo destapó casi no lo destapa.** DEV verificó «el analizador no
 * admite fondos» mandando un ISIN al endpoint y recibiendo un 400. El 400 era correcto por
 * la razón equivocada: `PositionSchema` limita `ticker` a 10 caracteres y un ISIN tiene 12,
 * así que moría en la validación sin mirar ningún catálogo. **El mismo 400 lo da cualquier
 * cadena de 11 caracteres.** Lo vio Verificación. La conclusión era cierta; la prueba no la
 * demostraba.
 */

describe('qué responde el analizador cuando no conoce los tickers', () => {
  const route = readFileSync('src/app/api/analyze/route.ts', 'utf8')

  /**
   * Ampliación del 11-sep, misma noche. El 422 de arriba estaba **detrás de la validación
   * que rechaza la entrada real**: `ticker` admitía 10 caracteres y un ISIN tiene 12, así
   * que quien buscaba un fondo por ISIN recibía un 400 genérico y no llegaba a ver nunca el
   * mensaje que le explicaba justo eso. Lo vio Verificación.
   *
   * Es la misma lección de esa mañana aplicada al propio arreglo: **tocar el sistema vivo no
   * verifica nada si no sabes por dónde pasa lo que tocas.** Yo había probado el camino que
   * ya funcionaba.
   */
  it('un ISIN de 12 caracteres llega al catálogo en vez de morir en la validación', () => {
    const schema = readFileSync('src/types/portfolio.ts', 'utf8')
    const m = schema.match(/ticker:\s*z\.string\(\)\.min\(1\)\.max\((\d+)\)/)
    expect(m, 'no encuentro la cota de ticker en PositionSchema').not.toBeNull()
    expect(
      Number(m![1]),
      'un ISIN son 12 caracteres: con menos, el 422 explicativo es inalcanzable para quien busca fondos',
    ).toBeGreaterThanOrEqual(12)
  })

  it('los avisos de posiciones fuera del análisis se pintan en la interfaz', () => {
    // `warnings` se producía, se tipaba y se guardaba en estado desde siempre, y no se
    // renderizaba en ningún sitio: el usuario veía un reparto sumando 100 % sin saber que
    // describía solo una parte de su cartera. Un dato correcto sin el contexto que lo hace
    // legible es lo mismo que un dato falso para quien lo lee.
    const ui = readFileSync('src/components/AnalysisResults.tsx', 'utf8')
    expect(ui).toMatch(/analysis\.warnings/)
    expect(ui).toMatch(/no incluye toda tu cartera/)
  })

  it('distingue «no conozco esos tickers» de «los proveedores están caídos»', () => {
    expect(route, 'sin esta comprobación, un catálogo que no cubre se reporta como avería nuestra').toMatch(
      /algunoConocido/,
    )
    expect(route).toMatch(/getEtfByTicker/)
  })

  it('no le dice «inténtalo de nuevo» a quien nunca va a funcionar', () => {
    // El texto de reintento solo puede vivir en la rama del proveedor caído. Si aparece en
    // la respuesta de catálogo desconocido, estamos mandando a alguien a un bucle.
    // El corte va hasta el 422 inclusive: ese es el final de la rama de catálogo. Cortar en
    // `status: 503` metía dentro el mensaje del proveedor y hacía fallar el test por su
    // propia delimitación, no por el código.
    //
    // Y volvió a pasar el 17-sep, por segunda vez y por lo mismo. Al añadir la rama que
    // rechaza una cartera formada solo por fondos no analizables apareció un `status: 422`
    // ANTES de `algunoConocido`, así que `indexOf` cogía ese y el corte salía vacío: el test
    // fallaba con el código correcto. Se busca el 422 que viene DESPUÉS del ancla, no el
    // primero del fichero.
    //
    // La lección de fondo, por si hay una tercera: delimitar un trozo de código por cadenas
    // literales es frágil por construcción. Aguanta mientras esas cadenas sean únicas, y
    // nada garantiza que sigan siéndolo. Cuando se pueda comprobar el comportamiento en vez
    // del texto —llamando al handler, como en `api/analyze/fondos-rechazados.test.ts`— eso
    // es preferible.
    const inicio = route.indexOf('algunoConocido')
    const ramaCatalogo = route.slice(inicio, route.indexOf('status: 422', inicio))
    expect(ramaCatalogo, 'la delimitación del test se ha quedado vacía').not.toBe('')
    expect(ramaCatalogo).not.toMatch(/Inténtalo de nuevo/)
    expect(ramaCatalogo).toMatch(/fondos indexados/)
  })

  it('la respuesta de catálogo no usa 503: no es una avería del servidor', () => {
    // 503 significa «vuelve luego». Que no reconozcamos un ticker no es eso, y un 503 aquí
    // además invita a los clientes automáticos a reintentar.
    expect(route).toMatch(/status: 422/)
  })

  /**
   * El hecho que sostiene el mensaje del foro, atado aquí para que no caduque en silencio:
   * si algún día el analizador lee fondos, este test falla y obliga a revisar lo que
   * dijimos en público.
   */
  it('hoy el catálogo son ETFs por ticker y no incluye fondos indexados', () => {
    expect(getEtfByTicker('VWCE'), 'VWCE debería estar en el catálogo').not.toBeNull()

    const fondos = readFileSync('src/data/index-funds.ts', 'utf8')
    const isins = [...fondos.matchAll(/isin:\s*'([^']+)'/g)].map((m) => m[1])
    expect(isins.length, 'index-funds.ts debería tener fondos').toBeGreaterThan(5)
    for (const isin of isins) {
      expect(getEtfByTicker(isin), `${isin} no debería resolverse como ETF`).toBeNull()
    }

    // Y el motivo de fondo, que es lo que de verdad hay que contar: `analysis.ts` ni
    // siquiera mira el fichero de fondos. No es que los rechace; es que no los consulta.
    const analysis = readFileSync('src/lib/analysis.ts', 'utf8')
    expect(analysis).not.toMatch(/index-funds/)
  })
})
