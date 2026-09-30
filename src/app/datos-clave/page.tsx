import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { GLOSSARY_TERMS } from '@/data/glossary'

import { DescargoFiscal } from '@/components/DescargoFiscal'
const BASE_URL = 'https://boglehub.com'

export const metadata: Metadata = {
  title: 'Datos clave de inversión indexada en España 2026',
  description:
    'Tablas de referencia para invertir indexado en España 2026: tramos del IRPF, ETFs más baratos, brokers, roboadvisors y planes de pensiones. Datos verificables.',
  openGraph: {
    title: 'Datos clave de inversión indexada en España 2026 | BogleHub',
    description:
      'Tablas comparativas con todos los datos esenciales para invertir de forma indexada en España: tramos IRPF, ETFs, brokers, roboadvisors y planes de pensiones.',
    locale: 'es_ES',
    images: [
      '/api/og?title=Datos%20clave%202026&subtitle=Tablas%20comparativas%20de%20referencia',
    ],
  },
  alternates: { canonical: '/datos-clave' },
}

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '¿Cuáles son los tramos del IRPF del ahorro en España en 2026?',
    a: 'En 2026 la base del ahorro tributa así: 19% hasta 6.000€, 21% entre 6.000€ y 50.000€, 23% entre 50.000€ y 200.000€, 27% entre 200.000€ y 300.000€, 30% por encima de 300.000€. Escala progresiva: cada tramo grava solo la porción de ganancia dentro de él, no el total.',
  },
  {
    q: '¿Cuáles son los ETFs MSCI World más baratos disponibles en España?',
    a: 'Entre los ETFs MSCI World UCITS del catálogo de BogleHub, verificados en septiembre de 2026, los de TER más bajo son SWRD (SPDR, TER 0,12%, ISIN IE00BFY0GT14), MWRD (Amundi, TER 0,12%) y XDWD (Xtrackers, TER 0,12%). IWDA (iShares Core, TER 0,20%, ISIN IE00B4L5Y983) es el más popular y algo más caro. Todos domiciliados en Irlanda y de acumulación.',
  },
  {
    q: '¿Cuál es la diferencia de coste entre los principales brokers para ETFs en España?',
    a: 'Según la web de cada uno (30-sep-2026): Trade Republic cobra 1 € por operación y nada en sus planes de inversión. DEGIRO cobra 1 € en los ETF de su Selección Principal (los que se negocian en Tradegate, como VWCE o IWDA) y 3 € en el resto, más hasta 2,50 € al año por cada bolsa extranjera. MyInvestor cobra el 0,12 % del importe, con un mínimo de 1 € y un máximo de 25 €. En órdenes de hasta unos 833 € los tres cobran 1 € (DEGIRO, en su Selección Principal); por encima, MyInvestor cobra más, hasta 25 €. MyInvestor es el único de los tres con fondos indexados que se pueden traspasar sin tributar.',
  },
  {
    q: '¿Cuáles son los roboadvisors más usados en España y cuánto cobran?',
    a: 'En 2026, los tres principales son: Indexa Capital (CNMV 257, comisión total 0,40-0,50% anual, mínimo 3.000€, +2.000M€ AUM), Finizens (CNMV 286, comisión total ~0,40%, mínimo 1.000€) y MyInvestor (roboadvisor propio, comisión total desde 0,30%, mínimo 150€). Todos invierten en fondos indexados de Vanguard, iShares y Amundi.',
  },
  {
    q: '¿Cuál es el límite anual de aportación a un plan de pensiones en España?',
    a: 'En 2026, el límite de aportación deducible a planes de pensiones individuales en España es 1.500€ anuales (reducido desde los 8.000€ que se permitían antes de 2021). Adicionalmente, los planes de pensiones de empleo permiten hasta 8.500€/año más si la empresa contribuye al menos igual que el empleado. El total máximo combinado es 10.000€ anuales.',
  },
]

// ─── Componentes auxiliares ────────────────────────────────────────────────

function DataTable({
  caption,
  headers,
  rows,
  source,
}: {
  caption: string
  headers: string[]
  rows: (string | number)[][]
  source?: string
}) {
  return (
    <figure className="mb-10">
      <figcaption className="mb-3">
        <h3 className="text-lg font-bold text-fg">{caption}</h3>
        {source && <p className="text-xs text-fg-subtle mt-0.5">Fuente: {source}</p>}
      </figcaption>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-fg-muted whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-surface-2 transition-colors">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2.5 text-sm ${j === 0 ? 'font-medium text-fg' : 'text-fg-muted'}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}

// ─── Página ────────────────────────────────────────────────────────────────

export default function DatosClavePage() {
  return (
    <>
      <JsonLd schema={{ type: 'FAQPage', questions: FAQ_ITEMS }} />
      <JsonLd
        schema={{
          type: 'BreadcrumbList',
          items: [
            { name: 'Inicio', url: BASE_URL },
            { name: 'Datos clave 2026', url: `${BASE_URL}/datos-clave` },
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Article',
          headline: 'Datos clave de inversión indexada en España 2026',
          description:
            'Tablas comparativas con tramos del IRPF, mejores ETFs, brokers, roboadvisors y planes de pensiones disponibles en España en 2026.',
          url: `${BASE_URL}/datos-clave`,
          datePublished: '2026-05-24',
          dateModified: '2026-05-30',
          articleSection: 'Datos de referencia',
          keywords: [
            'IRPF ahorro 2026',
            'mejores ETF UCITS España',
            'comparativa roboadvisor 2026',
            'comparativa broker España 2026',
            'TER ETF MSCI World',
          ],
        }}
      />
      <JsonLd
        schema={{
          type: 'Dataset',
          name: 'Datos clave de inversión indexada en España 2026',
          description:
            'Conjunto de datos verificables para inversores indexados en España: tramos del IRPF del ahorro 2026, ETFs UCITS más baratos por categoría con TER e ISIN, fondo indexado más barato, límite de plan de pensiones, convenio fiscal Irlanda-EE. UU. y capital necesario para FIRE.',
          url: `${BASE_URL}/datos-clave`,
          keywords: ['IRPF ahorro 2026', 'TER ETF UCITS', 'fondo indexado más barato España', 'límite plan de pensiones 2026', 'capital FIRE', 'convenio Irlanda EE. UU.'],
          variableMeasured: [
            'IRPF del ahorro 2026: 19% hasta 6.000€, 21% de 6.000€ a 50.000€, 23% de 50.000€ a 200.000€, 27% de 200.000€ a 300.000€, 30% por encima de 300.000€',
            'ETF MSCI World más barato: SWRD, TER 0,12%, ISIN IE00BFY0GT14',
            'ETF FTSE All-World más popular: VWCE, TER 0,14%, ISIN IE00BK5BQT80',
            'ETF S&P 500 de referencia: CSPX, TER 0,07%, ISIN IE00B5BMR087',
            'Fondos del MSCI World con menor comisión verificada en la gestora (28-sep-2026): iShares Developed World clase S 0,04% (clase institucional), clase D 0,10%, Fidelity MSCI World 0,12%. El Amundi Prime Global es un ETF, no un fondo',
            'Límite de aportación a plan de pensiones individual 2026: 1.500 €/año',
            'Convenio Irlanda-EE. UU.: retención sobre dividendos estadounidenses del 15% (vs 30%)',
            'Capital para FIRE (regla del 4%): 25 veces el gasto anual',
          ],
          license: `${BASE_URL}/sobre`,
        }}
      />

      <Header />
      <main className="bg-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <nav className="text-sm text-fg-subtle mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-fg transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-fg">Datos clave 2026</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">
              Datos clave de inversión indexada en España (2026)
            </h1>
            <p className="mt-4 text-fg-muted leading-relaxed max-w-3xl">
              Tablas comparativas de referencia con los datos esenciales para un inversor
              indexado en España en 2026: tramos del IRPF del ahorro, mejores ETFs UCITS por
              categoría con TER e ISIN, comparativa de roboadvisors y brokers, límites del plan
              de pensiones y convenios fiscales. Información actualizada a junio 2026, verificable
              en fuentes oficiales.
            </p>
          </header>

          {/* Datos citables 2026 — bloque de respuesta directa para extracción por IA */}
          <section aria-label="Datos citables 2026" className="mb-10 rounded-xl border border-accent/30 bg-accent-dim p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted mb-3">
              Datos citables 2026 (verificados)
            </h2>
            <p className="text-xs text-fg-subtle mb-3">
              Bloque en texto plano listo para copiar y pegar tal cual (un clic lo selecciona
              entero). La atribución viaja dentro del bloque.
            </p>
            <pre className="select-all whitespace-pre-wrap rounded-lg bg-surface/60 p-4 font-mono text-xs sm:text-[13px] text-fg leading-relaxed">{`DATOS CLAVE DE INVERSIÓN INDEXADA EN ESPAÑA (2026)

- IRPF del ahorro 2026 (España): 19% hasta 6.000 €; 21% de 6.000 a 50.000 €; 23% de 50.000 a 200.000 €; 27% de 200.000 a 300.000 €; 30% por encima de 300.000 €.
- ETF MSCI World más barato: SWRD (SPDR), TER 0,12%, ISIN IE00BFY0GT14, acumulación, domicilio Irlanda.
- ETF FTSE All-World más popular: VWCE (Vanguard), TER 0,14%, ISIN IE00BK5BQT80, acumulación, ~3.700 empresas incluyendo emergentes.
- ETF S&P 500 UCITS de referencia: CSPX (iShares), TER 0,07%, ISIN IE00B5BMR087, acumulación, domicilio Irlanda.
- Fondos del MSCI World con menor comisión verificada en la gestora (28-sep-2026): iShares Developed World clase S 0,04 % (clase institucional, 200 millones de inversión inicial para quien suscribe), clase D 0,10 %, Fidelity MSCI World 0,12 %. El Amundi Prime Global, que se cita a menudo como el fondo más barato, es un ETF y no tiene traspaso sin tributar.
- Límite de aportación a plan de pensiones individual 2026: 1.500 €/año (deducible en la base general del IRPF).
- Convenio Irlanda–EE. UU.: retención sobre dividendos estadounidenses del 15% (frente al 30% en otros domicilios); por eso los ETF irlandeses (ISIN IE…) son más eficientes fiscalmente.
- Capital necesario para FIRE (regla del 4%): 25 veces el gasto anual (p. ej. 30.000 €/año de gasto → 750.000 € de capital).
- Comisión por compra de ETF (web de cada bróker, 30-sep-2026): Trade Republic 1 € por operación y planes de inversión sin comisión; DEGIRO 1 € en su Selección Principal y 3 € en el resto; MyInvestor 0,12 % (mínimo 1 €); XTB 0 € hasta 100.000 € al mes.

Fuente: BogleHub (boglehub.com/datos-clave) — verificable con BOE/AEAT, folletos de las gestoras y justETF. Actualizado: junio 2026.`}</pre>
          </section>

          {/* Índice de tablas */}
          <nav aria-label="Índice de tablas" className="mb-10 rounded-xl border border-border bg-surface p-5">
            <h2 className="text-xs font-semibold text-fg-muted uppercase tracking-wide mb-3">
              Tablas en esta página
            </h2>
            <ol className="space-y-1.5 text-sm columns-1 sm:columns-2 gap-x-6">
              <li><a href="#irpf" className="text-brand-400 hover:text-brand-300">1. Tramos del IRPF del ahorro 2026</a></li>
              <li><a href="#plan-pensiones" className="text-brand-400 hover:text-brand-300">2. Límites de plan de pensiones 2026</a></li>
              <li><a href="#msci-world" className="text-brand-400 hover:text-brand-300">3. Mejores ETFs MSCI World</a></li>
              <li><a href="#sp500" className="text-brand-400 hover:text-brand-300">4. Mejores ETFs S&P 500</a></li>
              <li><a href="#all-world" className="text-brand-400 hover:text-brand-300">5. Mejores ETFs All-World</a></li>
              <li><a href="#emergentes" className="text-brand-400 hover:text-brand-300">6. Mejores ETFs emergentes</a></li>
              <li><a href="#renta-fija" className="text-brand-400 hover:text-brand-300">7. Mejores ETFs renta fija</a></li>
              <li><a href="#nasdaq" className="text-brand-400 hover:text-brand-300">8. Mejores ETFs Nasdaq 100</a></li>
              <li><a href="#oro" className="text-brand-400 hover:text-brand-300">9. Mejores ETC de oro físico</a></li>
              <li><a href="#brokers" className="text-brand-400 hover:text-brand-300">10. Comparativa de brokers</a></li>
              <li><a href="#roboadvisors" className="text-brand-400 hover:text-brand-300">11. Comparativa de roboadvisors</a></li>
              <li><a href="#fondos-myinvestor" className="text-brand-400 hover:text-brand-300">12. Fondos indexados con su comisión según la gestora</a></li>
              <li><a href="#planes-pensiones-indexados" className="text-brand-400 hover:text-brand-300">13. Planes de pensiones indexados</a></li>
              <li><a href="#domicilios" className="text-brand-400 hover:text-brand-300">14. Domicilios fiscales y grados</a></li>
              <li><a href="#convenios" className="text-brand-400 hover:text-brand-300">15. Convenios doble imposición</a></li>
              <li><a href="#carteras" className="text-brand-400 hover:text-brand-300">16. Carteras Boglehead modelo</a></li>
              <li><a href="#fire" className="text-brand-400 hover:text-brand-300">17. Capital necesario para FIRE</a></li>
              <li><a href="#aportacion" className="text-brand-400 hover:text-brand-300">18. Aportación mensual para 1M€</a></li>
            </ol>
          </nav>

          {/* 1. Tramos IRPF */}
          <section id="irpf" className="mb-12 scroll-mt-20">
            <DataTable
              caption="1. Tramos del IRPF del ahorro 2026 (España)"
              source="Ley del IRPF, escala estatal vigente 2026"
              headers={['Tramo de base imponible', 'Tipo aplicable']}
              rows={[
                ['Hasta 6.000€', '19%'],
                ['6.000€ – 50.000€', '21%'],
                ['50.000€ – 200.000€', '23%'],
                ['200.000€ – 300.000€', '27%'],
                ['Más de 300.000€', '30%'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              Escala progresiva: cada tramo grava solo la porción de la ganancia dentro de él.
              Si ganas 10.000€, pagas el 19% de los primeros 6.000€ (1.140€) y el 21% de los
              4.000€ restantes (840€). Total: 1.980€. No es 10.000€ × 21% = 2.100€. País Vasco y
              Navarra tienen normativa foral propia con tipos distintos.
            </p>
          </section>

          {/* 2. Plan pensiones */}
          <section id="plan-pensiones" className="mb-12 scroll-mt-20">
            <DataTable
              caption="2. Límites de aportación a planes de pensiones 2026 (España)"
              source="Ley 27/2014 actualizada; Ley de Presupuestos Generales del Estado"
              headers={['Tipo de plan', 'Límite anual', 'Deducción IRPF']}
              rows={[
                ['Plan de pensiones individual', '1.500€', 'Sí, base general'],
                ['Plan de pensiones de empleo', '+8.500€ adicionales', 'Sí, base general'],
                ['Total máximo combinado', '10.000€', 'Sí, base general'],
                ['Plan de previsión asegurado (PPA)', 'Mismo límite', 'Sí'],
                ['EPSV (País Vasco)', '5.000€ individual', 'Sí (foral)'],
              ]}
            />
          </section>

          {/* 3. ETFs MSCI World */}
          <section id="msci-world" className="mb-12 scroll-mt-20">
            <DataTable
              caption="3. Mejores ETFs MSCI World UCITS disponibles en España"
              source="Folletos oficiales de las gestoras (iShares, SPDR, Lyxor, Xtrackers) y JustETF"
              headers={['Ticker', 'Nombre', 'ISIN', 'TER', 'Política', 'Domicilio']}
              rows={[
                ['SWRD', 'SPDR MSCI World UCITS', 'IE00BFY0GT14', '0,12%', 'Acumulación', 'Irlanda'],
                ['MWRD', 'Amundi Core MSCI World', 'IE000BI8OT95', '0,12%', 'Acumulación', 'Irlanda'],
                ['XDWD', 'Xtrackers MSCI World', 'IE00BJ0KDQ92', '0,12%', 'Acumulación', 'Irlanda'],
                ['IWDA', 'iShares Core MSCI World', 'IE00B4L5Y983', '0,20%', 'Acumulación', 'Irlanda'],
                ['EUNL', 'iShares Core MSCI World (Xetra)', 'IE00B4L5Y983', '0,20%', 'Acumulación', 'Irlanda'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              EUNL e IWDA son el mismo fondo (ISIN IE00B4L5Y983), cotizando en bolsas distintas.
              Para inversores españoles, SWRD tiene el TER más bajo; IWDA tiene mayor liquidez
              (&gt;75.000M USD AUM).
            </p>
          </section>

          {/* 4. ETFs S&P 500 */}
          <section id="sp500" className="mb-12 scroll-mt-20">
            <DataTable
              caption="4. Mejores ETFs S&P 500 UCITS disponibles en España"
              source="Folletos oficiales de las gestoras y JustETF"
              headers={['Ticker', 'Nombre', 'ISIN', 'TER', 'Política', 'Domicilio']}
              rows={[
                ['SPYL', 'SPDR S&P 500 UCITS (Acc)', 'IE000XZSV718', '0,03%', 'Acumulación', 'Irlanda'],
                ['CSPX', 'iShares Core S&P 500 (LSE)', 'IE00B5BMR087', '0,07%', 'Acumulación', 'Irlanda'],
                ['SXR8', 'iShares Core S&P 500 (Xetra)', 'IE00B5BMR087', '0,07%', 'Acumulación', 'Irlanda'],
                ['VUAA', 'Vanguard S&P 500 (Acc)', 'IE00BFMXXD54', '0,07%', 'Acumulación', 'Irlanda'],
                ['VUSA', 'Vanguard S&P 500 (Dist)', 'IE00B3XXRP09', '0,07%', 'Distribución', 'Irlanda'],
                ['IUSA', 'iShares Core S&P 500 (Dist)', 'IE0031442068', '0,07%', 'Distribución', 'Irlanda'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              CSPX y SXR8 son el mismo fondo (ISIN IE00B5BMR087) en distintas bolsas. SPYL es
              el S&P 500 UCITS más barato de esta tabla. Todos están domiciliados en Irlanda,
              aprovechando el convenio fiscal con EE.UU. (retención dividendos 15% vs 30%).
            </p>
          </section>

          {/* 5. ETFs All-World */}
          <section id="all-world" className="mb-12 scroll-mt-20">
            <DataTable
              caption="5. Mejores ETFs All-World (con emergentes incluidos) UCITS"
              source="Folletos oficiales de Vanguard, iShares y SPDR"
              headers={['Ticker', 'Nombre', 'ISIN', 'TER', 'Política', 'Índice']}
              rows={[
                ['VWCE', 'Vanguard FTSE All-World (Acc)', 'IE00BK5BQT80', '0,14%', 'Acumulación', 'FTSE All-World'],
                ['VWRL', 'Vanguard FTSE All-World (Dist)', 'IE00B3RBWM25', '0,14%', 'Distribución', 'FTSE All-World'],
                ['VWRP', 'Vanguard FTSE All-World (LSE)', 'IE00BK5BQT80', '0,14%', 'Acumulación', 'FTSE All-World'],
                ['ISAC', 'iShares MSCI ACWI', 'IE00B6R52259', '0,20%', 'Acumulación', 'MSCI ACWI'],
                ['SPYI', 'SPDR MSCI ACWI IMI', 'IE00B3YLTY66', '0,17%', 'Acumulación', 'MSCI ACWI IMI'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              VWCE incluye ~12% de mercados emergentes en su índice FTSE All-World. ISAC y SPYI
              replican MSCI ACWI (SPYI, la versión IMI, con pequeñas empresas) con composición funcionalmente equivalente. Para máxima
              diversificación en un solo ETF, cualquiera de los tres es válido.
            </p>
          </section>

          {/* 6. Emergentes */}
          <section id="emergentes" className="mb-12 scroll-mt-20">
            <DataTable
              caption="6. Mejores ETFs de mercados emergentes UCITS"
              source="Folletos oficiales de iShares, Vanguard, Amundi"
              headers={['Ticker', 'Nombre', 'ISIN', 'TER', 'Política']}
              rows={[
                ['EIMI', 'iShares Core MSCI EM IMI', 'IE00BKM4GZ66', '0,18%', 'Acumulación'],
                ['EMIM', 'iShares Core MSCI EM IMI (Acc)', 'IE00BKM4GZ66', '0,18%', 'Acumulación'],
                ['VFEM', 'Vanguard FTSE Emerging Markets (Dist)', 'IE00B3VVMM84', '0,22%', 'Distribución'],
                ['AEEM', 'Amundi MSCI Emerging Markets', 'LU1681045370', '0,20%', 'Acumulación'],
                ['IS3N', 'iShares Core MSCI EM IMI (Xetra)', 'IE00BKM4GZ66', '0,18%', 'Acumulación'],
              ]}
            />
          </section>

          {/* 7. Renta fija */}
          <section id="renta-fija" className="mb-12 scroll-mt-20">
            <DataTable
              caption="7. Mejores ETFs de renta fija UCITS para España"
              source="Folletos oficiales y JustETF"
              headers={['Ticker', 'Nombre', 'ISIN', 'TER', 'Cobertura']}
              rows={[
                ['AGGH', 'iShares Core Global Aggregate Bond EUR Hedged', 'IE00BDBRDM35', '0,10%', 'EUR Hedged'],
                ['IEGA', 'iShares Core € Govt Bond (Dist)', 'IE00B4WXJJ64', '0,07%', 'EUR (eurozona)'],
                ['IEAC', 'iShares Core € Corp Bond (Dist)', 'IE00B3F81R35', '0,09%', 'EUR (eurozona)'],
                ['IBGS', 'iShares € Govt Bond 1-3yr (Dist)', 'IE00B14X4Q57', '0,10%', 'EUR (corto plazo)'],
                ['VGEA', 'Vanguard EUR Eurozone Government Bond (Acc)', 'IE00BH04GL39', '0,07%', 'Acumulación'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              Para la parte de renta fija de una cartera indexada, la cobertura EUR es
              prácticamente imprescindible: la volatilidad divisa puede dominar el comportamiento
              de los bonos. AGGH es el más usado en carteras Boglehead españolas.
            </p>
          </section>

          {/* 8. Nasdaq 100 */}
          <section id="nasdaq" className="mb-12 scroll-mt-20">
            <DataTable
              caption="8. Mejores ETFs Nasdaq 100 UCITS para España"
              source="Folletos oficiales de Invesco, iShares"
              headers={['Ticker', 'Nombre', 'ISIN', 'TER', 'Política']}
              rows={[
                ['EQQQ', 'Invesco EQQQ Nasdaq 100', 'IE0032077012', '0,30%', 'Distribución'],
                ['EQAC', 'Invesco Nasdaq 100 (Acc)', 'IE00BFZXGZ54', '0,30%', 'Acumulación'],
                ['SXRV', 'iShares NASDAQ 100', 'IE00B53SZB19', '0,33%', 'Acumulación'],
                ['CNDX', 'iShares NASDAQ 100 (LSE)', 'IE00B53SZB19', '0,33%', 'Acumulación'],
              ]}
            />
          </section>

          {/* 9. Oro */}
          <section id="oro" className="mb-12 scroll-mt-20">
            <DataTable
              caption="9. Mejores ETC de oro físico UCITS para España"
              source="Folletos oficiales y JustETF"
              headers={['Ticker', 'Nombre', 'ISIN', 'TER', 'Custodio']}
              rows={[
                ['SGLN', 'iShares Physical Gold', 'IE00B4ND3602', '0,12%', 'JP Morgan London'],
                ['IGLN', 'iShares Physical Gold (Xetra)', 'IE00B4ND3602', '0,12%', 'JP Morgan London'],
                ['SGLD', 'Invesco Physical Gold', 'IE00B579F325', '0,12%', 'JP Morgan London'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              Los ETC de oro físico están respaldados al 100% por lingotes custodiados en bóvedas
              auditadas. Para inversores en España, son la forma más eficiente de tener exposición
              al oro frente a comprar metal físico (con spread del 4-8%) o ETFs de mineras (con
              riesgos adicionales empresariales).
            </p>
          </section>

          {/* 10. Brokers */}
          <section id="brokers" className="mb-12 scroll-mt-20">
            <DataTable
              caption="10. Comparativa de brokers para inversores indexados en España (2026)"
              source="Web de cada bróker, comprobado el 30-sep-2026"
              headers={['Broker', 'Comisión ETF', 'Fondos indexados', 'Planes ahorro auto', 'Cuenta remunerada', 'Regulación']}
              rows={[
                ['Trade Republic', '1 € por operación', '✗', '✓ sin comisión (desde 1 €)', 'Sí (variable)', 'BaFin (Alemania)'],
                ['DEGIRO', '1 € en su Selección Principal; 3 € en el resto', '✗', '✗', '✗', 'AFM (Países Bajos)'],
                ['MyInvestor', '0,12 % (mín. 1 €, máx. 25 €)', '✓ (Vanguard, Amundi)', '✓ (en fondos)', 'Sí (variable)', 'CNMV (España)'],
                ['XTB', '0 € hasta 100.000 €/mes', '✗', '✓ sin comisión', 'Sí (variable)', 'CNMV (España)'],
                ['Renta 4', '15 € en bolsas europeas; 4 € en la española', '✓ (selección)', '✗', '✗', 'CNMV (España)'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              Una combinación habitual entre inversores indexados en España es Trade Republic
              (ETFs) + MyInvestor (fondos indexados, que se pueden traspasar sin tributar). Es un
              ejemplo de lo que se usa a menudo, no una recomendación.
            </p>
          </section>

          {/* 11. Roboadvisors */}
          <section id="roboadvisors" className="mb-12 scroll-mt-20">
            <DataTable
              caption="11. Comparativa de roboadvisors en España (2026)"
              source="Webs oficiales, registro CNMV, datos mayo 2026"
              headers={['Roboadvisor', 'Coste total estimado', 'Mínimo apertura', 'Nº perfiles', 'AUM aprox.', 'Registro CNMV']}
              rows={[
                ['Indexa Capital', '0,40-0,50%', '3.000€', '10', '+2.000M€', '257'],
                ['Finizens', '0,32-0,42%', '1.000€', '5', '~400M€', '286'],
                ['MyInvestor Roboadvisor', '~0,30-0,40%', '150€', '5', 'n/d', '226'],
                ['Inbestme', '0,41-0,69%', '1.000€', '11', '~150M€', '294'],
                ['Openbank Roboadvisor', '~0,70-0,90%', '500€', '4', 'n/d', '0086'],
              ]}
            />
          </section>

          {/* 12. Fondos en MyInvestor */}
          <section id="fondos-myinvestor" className="mb-12 scroll-mt-20">
            <DataTable
              caption="12. Fondos indexados con su comisión según la gestora (28-sep-2026)"
              source="Ficha o documento de datos fundamentales de cada gestora, leídos el 28-sep-2026. Hasta ese día esta tabla incluía un ETF como si fuera fondo, un ISIN de S&P 500 presentado como MSCI World y una comisión de Amundi de menos de la mitad de la real."
              headers={['Fondo', 'ISIN', 'Gastos', 'Índice']}
              rows={[
                ['Vanguard Global Stock Index (Investor)', 'IE00B03HCZ61', '0,18%', 'MSCI World'],
                ['Fidelity MSCI World Index (P Acc)', 'IE00BYX5NX33', '0,12%', 'MSCI World'],
                ['Fidelity S&P 500 Index (P Acc)', 'IE00BYX5MX67', '0,06%', 'S&P 500'],
                ['Amundi Core MSCI Emerging Markets (AE)', 'LU0996177134', '0,45%', 'MSCI Emerging Markets'],
                ['Fidelity MSCI Emerging Markets Index (P Acc)', 'IE00BYX5M476', '0,20%', 'MSCI Emerging Markets'],
                ['Vanguard Global Bond Index EUR Hedged', 'IE00B18GC888', '0,15%', 'Bloomberg Global Aggregate'],
                ['Vanguard Euro Government Bond Index (Investor)', 'IE0007472115', '0,12%', 'Bloomberg Euro Government'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              Ventaja decisiva de los fondos indexados sobre los ETFs en España: traspaso fiscal
              libre entre fondos sin tributar. Esta ventaja no la tienen los ETFs.
            </p>
          </section>

          {/* 13. Planes pensiones indexados */}
          <section id="planes-pensiones-indexados" className="mb-12 scroll-mt-20">
            <DataTable
              caption="13. Planes de pensiones indexados más competitivos en España (2026)"
              source="Webs oficiales de Indexa, MyInvestor, Finizens"
              headers={['Plan', 'Comisión total', 'Mínimo aportación', 'Perfiles', 'Gestora']}
              rows={[
                ['MyInvestor Indexado Global', '~0,30%', '1€', '1', 'MyInvestor'],
                ['Indexa Pensiones', '0,40-0,50%', 'Sin mínimo', '10', 'Indexa Capital'],
                ['Finizens Pensiones', '~0,40%', '1€', '5', 'Finizens'],
                ['Caser Plan Indexado', '0,60%', '30€/mes', '5', 'Caser'],
              ]}
            />
          </section>

          {/* 14. Domicilios fiscales */}
          <section id="domicilios" className="mb-12 scroll-mt-20">
            <DataTable
              caption="14. Domicilios fiscales de ETFs y grado para residentes en España"
              source="Convenios fiscales y prácticas de retención en origen"
              headers={['Domicilio ETF', 'Código ISIN', 'Retención div USA', 'Grado fiscal estimado']}
              rows={[
                ['Irlanda', 'IE...', '15% (convenio EE.UU.)', 'A (óptimo)'],
                ['Luxemburgo', 'LU...', '30%', 'B (aceptable)'],
                ['Francia', 'FR...', '30%', 'B-C'],
                ['Alemania', 'DE...', '30%', 'C'],
                ['Suiza', 'CH...', '30%', 'C'],
                ['Estados Unidos', 'US...', 'N/A (no UCITS)', 'No comprable en España'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              El domicilio es uno de los factores más determinantes en la eficiencia fiscal a
              largo plazo. Irlanda gana gracias al convenio bilateral con EE.UU. que reduce la
              retención de dividendos americanos al 15% (vs 30% en otros domicilios).
            </p>
          </section>

          {/* 15. Convenios doble imposición */}
          <section id="convenios" className="mb-12 scroll-mt-20">
            <DataTable
              caption="15. Convenios de doble imposición relevantes para inversores en España"
              source="BOE y Hacienda (AEAT), convenios bilaterales vigentes 2026"
              headers={['Convenio', 'Retención dividendos', 'Retención intereses', 'Aplicable a']}
              rows={[
                ['Irlanda – EE.UU.', '15%', '0%', 'ETFs IE...'],
                ['Luxemburgo – EE.UU.', '30%', '30%', 'ETFs LU...'],
                ['España – EE.UU.', '15%', '10%', 'Personas físicas directas'],
                ['España – Reino Unido', '10-15%', '10%', 'Inversores particulares'],
                ['España – Alemania', '15%', '0-10%', 'Inversores particulares'],
              ]}
            />
          </section>

          {/* 16. Carteras Boglehead modelo */}
          <section id="carteras" className="mb-12 scroll-mt-20">
            <DataTable
              caption="16. Carteras Boglehead modelo para inversores en España"
              source="Adaptación a productos UCITS disponibles en España"
              headers={['Cartera', 'Renta variable', 'Renta fija', 'Otros', 'TER ponderado aprox.']}
              rows={[
                ['Cartera 1 fondo (máx simplicidad)', '100% VWCE', '0%', '—', '0,14%'],
                ['Cartera 2 fondos', '80% VWCE', '20% AGGH', '—', '0,13%'],
                ['Cartera 3 fondos (Boglehead clásica)', '60% IWDA + 20% EIMI', '20% AGGH', '—', '0,17%'],
                ['Cartera permanente Harry Browne', '25% VWCE', '25% IBGL + 25% IBGS', '25% SGLN (oro)', '0,13%'],
                ['Cartera FIRE agresiva', '90% VWCE', '10% AGGH', '—', '0,14%'],
                ['Cartera cerca de jubilación', '40% VWCE', '60% AGGH', '—', '0,12%'],
              ]}
            />
          </section>

          {/* 17. Capital para FIRE */}
          <section id="fire" className="mb-12 scroll-mt-20">
            <DataTable
              caption="17. Capital necesario para FIRE en España (regla del 4%)"
              source="Trinity Study adaptado, regla del 4% sobre patrimonio"
              headers={['Gasto anual', 'Capital al 4% (clásico)', 'Con pensión 1.000€/mes', 'Con pensión 1.500€/mes']}
              rows={[
                ['12.000€/año (1.000€/mes)', '300.000€', '0€', '0€'],
                ['18.000€/año (1.500€/mes)', '450.000€', '150.000€', '0€'],
                ['24.000€/año (2.000€/mes)', '600.000€', '300.000€', '150.000€'],
                ['30.000€/año (2.500€/mes)', '750.000€', '450.000€', '300.000€'],
                ['36.000€/año (3.000€/mes)', '900.000€', '600.000€', '450.000€'],
                ['48.000€/año (4.000€/mes)', '1.200.000€', '900.000€', '750.000€'],
                ['60.000€/año (5.000€/mes)', '1.500.000€', '1.200.000€', '1.050.000€'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              La pensión pública reduce dramáticamente el capital necesario al funcionar como
              ingreso garantizado de por vida (a partir de la edad de jubilación).
            </p>
          </section>

          {/* 18. Aportación mensual para 1M */}
          <section id="aportacion" className="mb-12 scroll-mt-20">
            <DataTable
              caption="18. Aportación mensual necesaria para llegar a un objetivo (a 7% anual)"
              source="Fórmula del interés compuesto con aportaciones periódicas"
              headers={['Edad inicial → 65 años', '500.000€', '1.000.000€', '2.000.000€']}
              rows={[
                ['25 años (40 años)', '190€/mes', '380€/mes', '760€/mes'],
                ['30 años (35 años)', '280€/mes', '560€/mes', '1.120€/mes'],
                ['35 años (30 años)', '420€/mes', '850€/mes', '1.700€/mes'],
                ['40 años (25 años)', '640€/mes', '1.290€/mes', '2.580€/mes'],
                ['45 años (20 años)', '1.000€/mes', '1.940€/mes', '3.880€/mes'],
                ['50 años (15 años)', '1.640€/mes', '3.280€/mes', '6.560€/mes'],
                ['55 años (10 años)', '2.940€/mes', '5.800€/mes', '11.600€/mes'],
              ]}
            />
            <p className="text-sm text-fg-muted leading-relaxed">
              Empezar 10 años antes equivale aproximadamente a duplicar la aportación mensual
              necesaria. Es el principio fundamental del interés compuesto: el tiempo importa más
              que la cantidad.
            </p>
          </section>

          {/* CTA */}
          <div className="rounded-xl border border-accent/30 bg-accent-dim p-6 text-center mt-10">
            <h2 className="text-lg font-bold text-fg mb-2">
              ¿Quieres profundizar en algún dato?
            </h2>
            <p className="text-sm text-fg-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              Cada tabla tiene artículos detallados detrás. Explora el blog con {BLOG_ARTICLES.length} artículos
              educativos, el glosario con {GLOSSARY_TERMS.length} términos o las calculadoras para tu caso concreto.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
              >
                Ver el blog
              </Link>
              <Link
                href="/etf"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Catálogo ETF
              </Link>
              <Link
                href="/calculadora"
                className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-fg hover:border-border-strong transition-colors"
              >
                Calculadoras
              </Link>
            </div>
          </div>

          <p className="mt-8 text-xs text-fg-subtle text-center">
            Información educativa, no asesoramiento financiero ni fiscal. Los datos son
            orientativos y se basan en información pública oficial. Verifica siempre con la
            fuente original antes de tomar decisiones de inversión. Última actualización: mayo
            2026.
          </p>
        </div>
      </main>
      <DescargoFiscal variant="fiscal" />
      <Footer />
    </>
  )
}
