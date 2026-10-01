import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'

const BASE_URL = 'https://boglehub.com'

/**
 * Cuenta de Ahorro e Inversión Financia Europa (Real Decreto-ley 26/2026, BOE del 30-sep-2026,
 * BOE-A-2026-20266). Todo lo que dice esta página está leído en el texto del BOE el 30-sep:
 * art. 95 ter de la Ley del IRPF (nuevo) y título XI de la Ley 6/2023 (arts. 341 a 356), más la
 * disposición adicional segunda del RDL (registro de la CNMV en cuatro meses). El 1-oct se leyeron
 * además la modalidad Reinversión (disposiciones adicionales 65.ª y 66.ª de la Ley del IRPF y décima
 * de la Ley 6/2023) y el SIALPFE (disposición adicional 26.ª de la Ley del IRPF).
 *
 * Los pesos de Reino Unido y Suiza en el MSCI Europe salen de la ficha del índice de MSCI a
 * 31-ago-2026 (msci-europe-index-eur-net.pdf): 22,38 % y 14,29 %.
 *
 * El Congreso NO convalidó el RDL el 2-oct-2026: quedó derogado y la página se queda como lectura
 * de lo que decía el texto publicado.
 */
const FECHA = '30 de septiembre de 2026'
const FECHA_ISO = '2026-09-30'
/** Última revisión de la página (el resultado de la convalidación). FECHA sigue siendo la lectura del BOE. */
const REVISION = '2 de octubre de 2026'
const REVISION_ISO = '2026-10-02'
const URL_BOE = 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20266'
const URL_MSCI = 'https://www.msci.com/documents/10199/255599/msci-europe-index-eur-net.pdf'

const FAQ = [
  {
    q: '¿Qué es la Cuenta de Ahorro e Inversión Financia Europa?',
    a: 'Era una cuenta de valores con una subcuenta de efectivo, creada por el Real Decreto-ley 26/2026, de 29 de septiembre (BOE del 30 de septiembre de 2026). El Congreso no lo convalidó el 2 de octubre de 2026 y quedó derogado. Mientras el dinero sigue dentro, las ganancias de comprar y vender no tributan. Se tributa al sacar dinero, y la parte de la ganancia que corresponde a aportaciones con más de cinco años tiene una exención: el 100 % hasta 10.000 € en total por persona y el 20 % de lo que pase de ahí.',
  },
  {
    q: '¿Cuánto se puede meter?',
    a: 'Hasta 150.000 € de aportaciones pendientes de recuperar, es decir, lo aportado menos lo ya retirado. Las ganancias que se quedan dentro no cuentan para ese límite. Solo se aportan en dinero y cada persona puede tener una sola cuenta de la modalidad general. Aparte cabe una de la modalidad Reinversión, que solo admite el dinero de vender ciertas viviendas a organismos públicos.',
  },
  {
    q: '¿Se puede abrir ya?',
    a: 'No. El Congreso no convalidó el real decreto-ley el 2 de octubre de 2026, así que quedó derogado y la cuenta no llegó a existir. Ningún fondo ni ETF llegó a ser elegible.',
  },
  {
    q: '¿Un ETF del MSCI World podría entrar?',
    a: 'Por su composición, no. La norma pide que al menos el 70 % de la cartera esté en el Espacio Económico Europeo y que al menos el 35 % sea renta variable del EEE. En el MSCI World Europa pesa en torno al 16 % y Estados Unidos en torno al 70 %.',
  },
  {
    q: '¿Y uno del MSCI Europe?',
    a: 'Probablemente tampoco, aunque suene europeo. Reino Unido y Suiza no son del Espacio Económico Europeo, y en el MSCI Europe pesan un 22,38 % y un 14,29 % según la ficha de MSCI a 31 de agosto de 2026. Juntos son un 36,67 %, así que el resto se queda en torno al 63 %, por debajo del 70 % que exige la norma. Los índices de la zona euro, como el MSCI EMU, sí cumplirían los porcentajes.',
  },
  {
    q: '¿Los dividendos también quedan libres de impuestos?',
    a: 'No. Los dividendos y los intereses no entran en el régimen: se abonan en la cuenta corriente vinculada y tributan como siempre, en el año en que se cobran.',
  },
]

export const metadata: Metadata = {
  title: 'Cuenta europea de inversión (Financia Europa): qué decía el decreto que no se convalidó',
  description: `El Congreso no convalidó el Real Decreto-ley 26/2026 el 2 de octubre de 2026, así que la Cuenta de Ahorro e Inversión Financia Europa no llegó a existir. Qué decía el texto del BOE: límite de 150.000 €, exención tras cinco años y requisitos de los fondos y ETF. Actualizado el ${REVISION}.`,
  alternates: { canonical: '/cuenta-europea-de-inversion' },
}

function Fuente({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} rel="noopener" target="_blank" className="text-brand-400 hover:text-brand-300 hover:underline">
      {children}
    </a>
  )
}

export default function CuentaEuropeaPage() {
  return (
    <>
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Cuenta europea de inversión', url: `${BASE_URL}/cuenta-europea-de-inversion` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: 'Cuenta de Ahorro e Inversión Financia Europa: qué decía el decreto que no se convalidó',
          description: 'Lectura del Real Decreto-ley 26/2026 en el BOE: límites, fiscalidad con un ejemplo y requisitos de los fondos y ETF. El Congreso no lo convalidó el 2 de octubre de 2026.',
          url: `${BASE_URL}/cuenta-europea-de-inversion`,
          datePublished: FECHA_ISO,
          dateModified: REVISION_ISO,
          articleSection: 'Fiscalidad',
          keywords: ['cuenta europea de inversión', 'Cuenta de Ahorro e Inversión Financia Europa', 'Real Decreto-ley 26/2026', 'CAIFE'],
        }}
      />
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ }} />
      <Header />
      <main className="bg-bg min-h-screen">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10 text-fg-muted leading-relaxed">
          <nav className="text-sm text-fg-subtle mb-6">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Cuenta europea de inversión</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Cuenta europea de inversión: qué decía el decreto que no se convalidó
            </h1>
            <p className="mt-3">
              Su nombre oficial era <strong className="text-fg">Cuenta de Ahorro e Inversión Financia Europa</strong>.
              La creaba el <Fuente href={URL_BOE}>Real Decreto-ley 26/2026, de 29 de septiembre</Fuente>, publicado
              en el BOE el 30 de septiembre de 2026. Todo lo de esta página está leído en ese texto;
              te decimos el artículo de cada cosa para que lo compruebes. Última revisión: <strong className="text-fg">{REVISION}</strong>.
            </p>
            <p className="mt-3 rounded-lg border border-border bg-surface/50 px-4 py-3 text-sm">
              <strong className="text-fg">La cuenta no existe.</strong> El Congreso no convalidó el real
              decreto-ley el 2 de octubre de 2026, y un real decreto-ley que no se convalida queda derogado
              (art. 86 de la Constitución). Lo que sigue es lo que decía el texto publicado en el BOE,
              escrito en presente porque así lo escribe la norma.
            </p>
          </header>

          <section className="mb-10" aria-labelledby="que-es">
            <h2 id="que-es" className="text-xl font-semibold text-fg mb-3">Qué es y cuáles son sus límites</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Una cuenta de valores más una subcuenta de efectivo en euros, abierta en un banco o una empresa de servicios de inversión (arts. 341 a 344 de la Ley 6/2023, que añade el RDL).</li>
              <li><strong className="text-fg">Una sola cuenta por persona</strong>, a su nombre y sin poder cederla (art. 341.1).</li>
              <li>Aparte existe la <strong className="text-fg">modalidad Reinversión</strong>, compatible con la general. Solo admite el dinero de vender a un organismo público de vivienda social una vivienda que llevaba dos años vacía, hasta 800.000 € en total y con hasta 8.000 € de efectivo dentro, y tiene la exención del 20 % pero no la de los primeros 10.000 € (disposiciones adicionales 65.ª y 66.ª de la Ley del IRPF y décima de la Ley 6/2023).</li>
              <li><strong className="text-fg">Hasta 150.000 €</strong> de aportaciones pendientes de recuperar: lo aportado menos lo ya retirado. Solo se aporta en dinero (art. 350 y art. 95 ter.1.f de la Ley del IRPF).</li>
              <li>El efectivo dentro de la cuenta no puede pasar de <strong className="text-fg">1.500 €</strong>. Si una venta lo supera, hay tres meses para reinvertir o sacar el exceso; si no, cuenta como retirada (art. 344.4).</li>
              <li>Se puede trasladar entera a otra entidad <strong className="text-fg">una vez por año natural</strong>, en un plazo máximo de diez días hábiles, sin que cuente como retirada ni se pierda la antigüedad (art. 347).</li>
              <li>No se permiten préstamos para invertir ni derivados; solo comprar, vender, suscribir y reembolsar (arts. 346 y 348.2).</li>
            </ul>
          </section>

          <section className="mb-10" aria-labelledby="fiscalidad">
            <h2 id="fiscalidad" className="text-xl font-semibold text-fg mb-3">Cómo tributa</h2>
            <p className="mb-3">
              Lo regula el nuevo artículo 95 ter de la Ley del IRPF. Tres ideas:
            </p>
            <ul className="space-y-2 list-disc pl-5 mb-4">
              <li><strong className="text-fg">Vender dentro no tributa.</strong> Las ganancias y pérdidas de las ventas se quedan fuera de la declaración hasta que sacas dinero de la cuenta (apartado 3).</li>
              <li><strong className="text-fg">Al sacar dinero se calcula la ganancia de la cuenta entera</strong>, en proporción a lo que retiras: valor de la cuenta menos aportaciones pendientes de recuperar. Se entiende que lo primero que recuperas es lo más antiguo que aportaste (apartados 3 y 4).</li>
              <li><strong className="text-fg">Exención tras cinco años.</strong> De la ganancia que corresponde a aportaciones con más de cinco años dentro, queda exento el 100 % hasta 10.000 € en total por persona (no por año) y el 20 % de lo que pase de ahí (apartado 4).</li>
            </ul>
            <p className="mb-3">
              Los <strong className="text-fg">dividendos e intereses no entran</strong>: se ingresan en tu cuenta
              corriente vinculada y tributan el año en que se cobran, como siempre (apartado 7 y art. 344.7).
              Si una retirada parcial da pérdida, no se declara en ese momento: se resta de las ganancias de
              retiradas posteriores (apartado 3.c).
            </p>

            <h3 className="text-lg font-semibold text-fg mt-6 mb-2">Un ejemplo hecho a mano</h3>
            <p className="mb-3">
              Supuesto inventado para ver el mecanismo, no una previsión: una persona aporta 20.000 € en
              una sola vez, los deja más de cinco años y la cuenta vale 32.000 € cuando la vacía entera.
              No tiene más ganancias ese año.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-3">
              <table className="w-full text-sm">
                <thead className="bg-surface">
                  <tr className="text-left text-xs uppercase tracking-wide text-fg-muted">
                    <th className="px-4 py-3">Paso</th>
                    <th className="px-4 py-3">Dentro de la cuenta</th>
                    <th className="px-4 py-3">Mismo fondo o ETF fuera</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-4 py-3">Ganancia</td><td className="px-4 py-3 text-fg">12.000 €</td><td className="px-4 py-3 text-fg">12.000 €</td></tr>
                  <tr><td className="px-4 py-3">Exenta al 100 %</td><td className="px-4 py-3 text-fg">10.000 €</td><td className="px-4 py-3">0 €</td></tr>
                  <tr><td className="px-4 py-3">Exenta al 20 % (de los 2.000 € restantes)</td><td className="px-4 py-3 text-fg">400 €</td><td className="px-4 py-3">0 €</td></tr>
                  <tr><td className="px-4 py-3">Base del ahorro</td><td className="px-4 py-3 text-fg">1.600 €</td><td className="px-4 py-3 text-fg">12.000 €</td></tr>
                  <tr><td className="px-4 py-3">Impuesto</td><td className="px-4 py-3 text-fg font-semibold">304 € (1.600 × 19 %)</td><td className="px-4 py-3 text-fg font-semibold">2.400 € (6.000 × 19 % + 6.000 × 21 %)</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm">
              Tipos: escala del ahorro de 2026, 19 % hasta 6.000 € y 21 % de 6.000 a 50.000 € (arts. 66 y 76
              de la Ley del IRPF). La exención de 10.000 € es para toda la vida de la cuenta: quien ya la
              haya usado en una retirada anterior solo tiene la parte que le quede. La diferencia con un
              fondo de inversión normal no está en aplazar el impuesto, que un fondo ya aplaza con los
              traspasos, sino en la exención y en poder cambiar de ETF o de acción sin tributar. Dentro de
              la cuenta no se aplica el régimen de traspasos, porque no hace falta (apartado 6).
            </p>
          </section>

          <section className="mb-10" aria-labelledby="requisitos">
            <h2 id="requisitos" className="text-xl font-semibold text-fg mb-3">Qué se puede meter dentro</h2>
            <p className="mb-3">Solo dos tipos de activo (art. 348):</p>
            <ul className="space-y-2 list-disc pl-5 mb-4">
              <li><strong className="text-fg">Acciones</strong> cotizadas de empresas con sede en un país del Espacio Económico Europeo (la UE más Noruega, Islandia y Liechtenstein). Quedan fuera las SOCIMI.</li>
              <li><strong className="text-fg">Fondos y ETF</strong> inscritos en el Registro de IIC Elegibles de la CNMV. Quedan fuera las SICAV reguladas en la Ley 35/2003, que son las españolas; el artículo no habla de los fondos extranjeros con forma de SICAV.</li>
            </ul>
            <p className="mb-3">Para inscribirse, el fondo o ETF tiene que acreditar según su folleto (arts. 352, 355 y 356):</p>
            <ul className="space-y-2 list-disc pl-5 mb-4">
              <li>al menos el <strong className="text-fg">70 %</strong> de la cartera en activos del EEE;</li>
              <li>al menos el <strong className="text-fg">50 %</strong> en renta variable;</li>
              <li>al menos el <strong className="text-fg">35 %</strong> en renta variable del EEE;</li>
              <li>no invertir en SOCIMI, fondos inmobiliarios ni SICAV, salvo que estén en el índice que replica;</li>
              <li>decirlo en el folleto y firmar una declaración responsable. Los fondos y ETF de otros países del EEE, como los irlandeses o luxemburgueses, pueden pedirlo si se comercializan en España (art. 353.3).</li>
            </ul>
            <p className="text-sm">
              No es lo mismo que el <strong className="text-fg">Seguro Individual de Ahorro a Largo Plazo Financia Europa</strong> (SIALPFE),
              que crea el mismo decreto. Es un seguro de vida, no esta cuenta: admite primas de hasta 10.000 € al año
              y puede llevar renta fija del EEE con calificación mínima BBB, que en la cuenta no entra
              (disposición adicional 26.ª de la Ley del IRPF).
            </p>
          </section>

          <section className="mb-10" aria-labelledby="catalogo">
            <h2 id="catalogo" className="text-xl font-semibold text-fg mb-3">Qué fondos y ETF de nuestro catálogo cumplirían los porcentajes</h2>
            <p className="mb-3">
              Lo que sigue compara la composición de cada índice con los porcentajes de la norma. No dice
              que un producto vaya a ser elegible: eso depende de que su gestora lo pida, cambie el folleto
              y la CNMV lo inscriba. Tampoco es una recomendación.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-3">
              <table className="w-full text-sm">
                <thead className="bg-surface">
                  <tr className="text-left text-xs uppercase tracking-wide text-fg-muted">
                    <th className="px-4 py-3">Índice</th>
                    <th className="px-4 py-3">Productos del catálogo</th>
                    <th className="px-4 py-3">¿Cumple por composición?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border align-top">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-fg">MSCI EMU (zona euro)</td>
                    <td className="px-4 py-3">
                      <Link href="/fondo/vanguard-eurozone-stock-index" className="text-brand-400 hover:underline">Vanguard Eurozone Stock Index</Link> (0,12 %),{' '}
                      <Link href="/fondo/ishares-emu-index" className="text-brand-400 hover:underline">iShares EMU Index</Link> (0,15 %, clase institucional),{' '}
                      <Link href="/fondo/pictet-euroland-index" className="text-brand-400 hover:underline">Pictet-Euroland Index</Link> (0,46 %)
                    </td>
                    <td className="px-4 py-3 text-fg">Sí. Todas sus empresas son de países del euro, que son del EEE, y es 100 % renta variable.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-fg">MSCI Europe y FTSE Developed Europe</td>
                    <td className="px-4 py-3">ETF IMEU, SMEA y VEUR; fondos de iShares, Fidelity, Vanguard, Amundi y Pictet sobre el MSCI Europe</td>
                    <td className="px-4 py-3">Probablemente no. En el MSCI Europe, Reino Unido pesa 22,38 % y Suiza 14,29 % (<Fuente href={URL_MSCI}>ficha de MSCI</Fuente>, 31-ago-2026); ninguno es del EEE, así que el resto se queda en torno al 63 %. El FTSE Developed Europe también incluye los dos países; no hemos medido su peso.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-fg">MSCI World, FTSE All-World, S&amp;P 500, emergentes</td>
                    <td className="px-4 py-3">VWCE, IWDA, CSPX, EIMI y el resto de globales</td>
                    <td className="px-4 py-3">No. En el MSCI World Europa entera pesa en torno al 16 % y Estados Unidos en torno al 70 %.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-fg">Deuda pública de la zona euro</td>
                    <td className="px-4 py-3">VGEA, VETY, IBGX y los fondos de bonos del euro</td>
                    <td className="px-4 py-3">No. Son del EEE, pero no llegan al 50 % de renta variable que pide la norma.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm">
              Una consecuencia que conviene tener clara: la cuenta está pensada para renta variable
              europea, no para una cartera indexada global. Una cartera de un solo fondo mundial no
              cumpliría los porcentajes.
            </p>
          </section>

          <section className="mb-10" aria-labelledby="falta">
            <h2 id="falta" className="text-xl font-semibold text-fg mb-3">Qué pasó en el Congreso</h2>
            <p>
              El Congreso votó la convalidación el 2 de octubre de 2026 y no salió adelante. Un real
              decreto-ley tiene que convalidarse en los 30 días siguientes a su promulgación; si no, queda
              derogado (art. 86 de la Constitución). Con él decaen la cuenta, su fiscalidad y el registro
              de fondos elegibles que iba a crear la CNMV.
            </p>
          </section>

          <section className="mb-10" aria-labelledby="faq">
            <h2 id="faq" className="text-xl font-semibold text-fg mb-3">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold text-fg">{f.q}</h3>
                  <p className="mt-1">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="text-xs text-fg-subtle">
            Fuente: <Fuente href={URL_BOE}>BOE-A-2026-20266</Fuente>, leído el {FECHA}. BogleHub explica
            cómo funciona la norma; no decide por nadie si le conviene. Para tu caso concreto, un asesor
            fiscal o financiero registrado.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
