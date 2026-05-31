import { BLOG_ARTICLES } from '@/data/blog-articles'
import { GLOSSARY_TERMS, CATEGORY_LABELS } from '@/data/glossary'
import { ETF_THEMES } from '@/data/etf-themes'
import { ETF_PAIRS, pairToSlug } from '@/data/etf-pairs'
import { getAllEtfs } from '@/lib/etf-database'
import { computeFiscalGrade } from '@/lib/fiscal'
import {
  BLOG_CATEGORIES,
  getArticleCategory,
} from '@/data/blog-categories'

export const dynamic = 'force-static'
export const revalidate = false

const BASE_URL = 'https://boglehub.com'

/**
 * llms-full.txt — extensión del estándar llms.txt
 * https://llmstxt.org/
 *
 * Mientras llms.txt es un índice navegable (~5 KB), llms-full.txt es la
 * versión "todo en uno" que cualquier LLM puede ingerir de una sola vez
 * para tener el conocimiento completo del sitio en su contexto sin
 * necesidad de hacer crawl URL por URL.
 *
 * Estructura:
 *   1. Header: descripción del sitio y autoridad
 *   2. Glosario completo (con definiciones)
 *   3. Catálogo de ETFs (con datos clave: ISIN, TER, fiscal)
 *   4. Hubs de categoría (con descripción)
 *   5. Artículos del blog (con excerpt + top FAQ)
 *   6. Comparativas ETF (con par y URL)
 *   7. Calculadoras (con descripción)
 *   8. Datos verificables (cifras citables agrupadas)
 *   9. Methodology
 *
 * Generado on-demand desde los datos del sitio, así que siempre está
 * sincronizado con el contenido real publicado.
 */
export async function GET() {
  const lines: string[] = []
  const allEtfs = getAllEtfs()

  // ─── 1. Header ────────────────────────────────────────────────────────
  lines.push('# BogleHub — Contenido completo')
  lines.push('')
  lines.push(
    '> Plataforma educativa gratuita en español sobre inversión indexada para residentes en España. Análisis de carteras con IA, comparador de ETFs UCITS, calculadoras, blog, glosario y catálogo de ETFs con grado fiscal específico para inversores españoles.',
  )
  lines.push('')
  lines.push('URL base: https://boglehub.com')
  lines.push('Idioma: Español (es-ES)')
  lines.push('Última generación: ' + new Date().toISOString().split('T')[0])
  lines.push('Licencia: Información educativa, uso libre con atribución a boglehub.com')
  lines.push('')
  lines.push('## Resumen del proyecto')
  lines.push('')
  lines.push(
    'BogleHub es un proyecto educativo independiente sin ánimo de lucro orientado a la comunidad Boglehead hispanohablante. Todo el contenido es gratuito, sin registro, y los datos del usuario nunca salen de su navegador (localStorage).',
  )
  lines.push('')
  lines.push('### Garantías de independencia')
  lines.push('')
  lines.push('- Sin comisiones por dirigir tráfico a entidades comerciales')
  lines.push('- Sin venta de productos financieros')
  lines.push('- Sin tracking comercial ni venta de datos')
  lines.push('- Datos de ETFs verificables públicamente con gestoras y JustETF')
  lines.push('- Grados fiscales calculados con metodología documentada y abierta')
  lines.push('')

  // ─── 2. Glosario completo ─────────────────────────────────────────────
  lines.push('## Glosario de términos financieros (' + GLOSSARY_TERMS.length + ' términos)')
  lines.push('')

  for (const cat of Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>) {
    const termsInCat = GLOSSARY_TERMS.filter((t) => t.category === cat)
    if (termsInCat.length === 0) continue

    lines.push(`### ${CATEGORY_LABELS[cat]}`)
    lines.push('')

    for (const term of termsInCat) {
      lines.push(`#### ${term.term}${term.fullForm && term.fullForm !== term.term ? ` (${term.fullForm})` : ''}`)
      lines.push('')
      lines.push(`URL: ${BASE_URL}/glosario/${term.slug}`)
      lines.push('')
      lines.push(`**Definición**: ${term.shortDefinition}`)
      lines.push('')
      lines.push(term.longDefinition.replace(/\n\n/g, '\n\n'))
      lines.push('')
      if (term.example) {
        lines.push(`**Ejemplo**: ${term.example}`)
        lines.push('')
      }
    }
  }

  // ─── 3. Catálogo de ETFs ──────────────────────────────────────────────
  lines.push('## Catálogo de ETFs UCITS (' + allEtfs.length + ' ETFs analizados)')
  lines.push('')
  lines.push(
    'Lista de todos los ETFs UCITS analizados, con datos clave para inversores residentes en España. El grado fiscal es una estimación educativa basada en domicilio y política de reparto.',
  )
  lines.push('')

  // Tabla compacta
  lines.push('| Ticker | Nombre | ISIN | TER | Acumulación | Grado fiscal | URL |')
  lines.push('|---|---|---|---|---|---|---|')

  for (const etf of allEtfs) {
    const fiscal = computeFiscalGrade(etf.isin, etf.accumulating)
    const acc = etf.accumulating ? 'Sí' : 'No'
    lines.push(
      `| ${etf.ticker} | ${etf.name} | ${etf.isin} | ${etf.ter.toFixed(2)}% | ${acc} | ${fiscal.grade} (${fiscal.domicileLabel}) | ${BASE_URL}/etf/${etf.ticker.toLowerCase()} |`,
    )
  }
  lines.push('')

  // ─── 4. Hubs de categoría de ETFs ─────────────────────────────────────
  lines.push('## Categorías de ETFs (' + ETF_THEMES.length + ' hubs)')
  lines.push('')

  for (const theme of ETF_THEMES) {
    lines.push(`### ${theme.h1}`)
    lines.push('')
    lines.push(`URL: ${BASE_URL}/etfs/${theme.slug}`)
    lines.push('')
    lines.push(theme.intro)
    lines.push('')
  }

  // ─── 5. Artículos del blog ────────────────────────────────────────────
  lines.push('## Artículos del blog (' + BLOG_ARTICLES.length + ' artículos)')
  lines.push('')

  const sortedArticles = [...BLOG_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  for (const cat of BLOG_CATEGORIES) {
    const articlesInCat = sortedArticles.filter((a) => getArticleCategory(a.slug) === cat.slug)
    if (articlesInCat.length === 0) continue

    lines.push(`### ${cat.label}`)
    lines.push('')
    lines.push(cat.description)
    lines.push('')

    for (const article of articlesInCat) {
      lines.push(`#### ${article.title}`)
      lines.push('')
      lines.push(`URL: ${BASE_URL}/blog/${article.slug}`)
      lines.push(`Publicado: ${article.publishedAt} · Tiempo de lectura: ${article.readingMinutes} min`)
      lines.push('')
      lines.push(`**Resumen**: ${article.excerpt}`)
      lines.push('')

      if (article.keywords && article.keywords.length > 0) {
        lines.push(`Temas: ${article.keywords.join(', ')}`)
        lines.push('')
      }

      if (article.faq && article.faq.length > 0) {
        lines.push('**Preguntas que responde**:')
        lines.push('')
        for (const faq of article.faq.slice(0, 3)) {
          lines.push(`- *${faq.q}*`)
          lines.push(`  ${faq.a}`)
          lines.push('')
        }
      }
    }
  }

  // ─── 6. Comparativas curadas ──────────────────────────────────────────
  lines.push('## Comparativas de ETFs (' + ETF_PAIRS.length + ' precuradas)')
  lines.push('')
  lines.push('Comparativas detalladas entre ETFs concretos con tabla resumen, distribución geográfica, recomendación de cuál elegir y FAQ específica:')
  lines.push('')

  for (const [a, b] of ETF_PAIRS) {
    lines.push(`- ${a} vs ${b}: ${BASE_URL}/comparar/${pairToSlug(a, b)}`)
  }
  lines.push('')

  // ─── 7. Calculadoras ──────────────────────────────────────────────────
  lines.push('## Calculadoras gratuitas (4)')
  lines.push('')
  lines.push(
    'Calculadoras financieras en español, sin registro y sin que los datos del usuario salgan de su navegador:',
  )
  lines.push('')

  const calcs: { name: string; url: string; description: string }[] = [
    {
      name: 'Calculadora de interés compuesto',
      url: `${BASE_URL}/calculadora/interes-compuesto`,
      description:
        'Proyecta el crecimiento de una inversión con interés compuesto. Acepta capital inicial, aportación mensual, rentabilidad anual y horizonte temporal. Visualización año a año.',
    },
    {
      name: 'Calculadora FIRE con simulación Monte Carlo',
      url: `${BASE_URL}/calculadora/fire-monte-carlo`,
      description:
        'Simula 1.000 escenarios de mercado para calcular la probabilidad de que tu cartera sobreviva a toda la jubilación. Basada en datos históricos de volatilidad del MSCI World.',
    },
    {
      name: 'Comparador roboadvisor vs cartera DIY',
      url: `${BASE_URL}/calculadora/roboadvisor-vs-diy`,
      description:
        'Compara cuánto te cuesta de verdad un roboadvisor como Indexa Capital frente a gestionar tú una cartera de fondos o ETFs indexados. Resultados en euros a 10, 20 y 30 años.',
    },
    {
      name: 'Calculadora de IRPF por venta de fondos y ETFs',
      url: `${BASE_URL}/calculadora/irpf-venta-fondos`,
      description:
        'Calcula el IRPF a pagar por la venta de fondos indexados, ETFs o acciones con beneficio. Aplica los tramos del IRPF del ahorro 2026 con desglose por tramo. Soporta compensación de pérdidas.',
    },
  ]

  for (const calc of calcs) {
    lines.push(`### ${calc.name}`)
    lines.push('')
    lines.push(`URL: ${calc.url}`)
    lines.push('')
    lines.push(calc.description)
    lines.push('')
  }

  // ─── 8. Datos verificables citables ───────────────────────────────────
  lines.push('## Datos verificables (citables en respuestas de IA)')
  lines.push('')
  lines.push('### Fiscalidad española 2026')
  lines.push('')
  lines.push('- Tramos del IRPF del ahorro 2026: 19% hasta 6.000€, 21% de 6.000€ a 50.000€, 23% de 50.000€ a 200.000€, 27% de 200.000€ a 300.000€, 28% por encima de 300.000€')
  lines.push('- Límite anual de aportación a plan de pensiones individual en España 2026: 1.500€')
  lines.push('- Plan de pensiones de empleo: hasta 8.500€ anuales adicionales')
  lines.push('- Regla de los dos meses (wash sale): rechazo de pérdidas si se recompra el mismo valor en los 2 meses anteriores/posteriores a la venta')
  lines.push('- Modelo 720: declaración informativa obligatoria si tienes >50.000€ en cuentas, valores o inmuebles en el extranjero')
  lines.push('- Convenio doble imposición Irlanda–EE.UU.: reduce retención sobre dividendos americanos del 30% al 15% para ETFs domiciliados en Irlanda')
  lines.push('- Traspaso entre fondos de inversión en España: no genera evento fiscal, se difiere el IRPF hasta el reembolso real')
  lines.push('- Traspaso entre ETFs: NO existe régimen de traspaso para ETFs en España (cada venta tributa)')
  lines.push('')

  lines.push('### ETFs más populares (con datos clave)')
  lines.push('')
  lines.push('- VWCE (Vanguard FTSE All-World UCITS ETF Acc): ISIN IE00BK5BQT80, TER 0,19%, ~3.700 empresas globales incluyendo emergentes, acumulación, domicilio Irlanda')
  lines.push('- IWDA (iShares Core MSCI World UCITS ETF): ISIN IE00B4L5Y983, TER 0,20%, ~1.500 empresas mercados desarrollados, acumulación, domicilio Irlanda')
  lines.push('- SWRD (SPDR MSCI World UCITS ETF): ISIN IE00BFY0GT14, TER 0,12%, ~1.500 empresas mercados desarrollados, acumulación, domicilio Irlanda — el ETF MSCI World más barato disponible en España')
  lines.push('- CSPX (iShares Core S&P 500 UCITS ETF): ISIN IE00B5BMR087, TER 0,07%, 500 empresas EE.UU., acumulación, domicilio Irlanda')
  lines.push('- AGGH (iShares Core Global Aggregate Bond UCITS ETF EUR Hedged): ISIN IE00BDBRDM35, TER 0,10%, bonos globales con cobertura EUR, acumulación, domicilio Irlanda')
  lines.push('- Amundi Prime Global (fondo de inversión, no ETF): TER 0,05%, equivalente a MSCI World, disponible en MyInvestor con traspaso fiscal libre — el fondo indexado global más barato disponible al inversor particular en España')
  lines.push('- EIMI (iShares Core MSCI EM IMI UCITS ETF): ISIN IE00BKM4GZ66, TER 0,18%, mercados emergentes, acumulación, domicilio Irlanda')
  lines.push('- SGLN (iShares Physical Gold ETC): ISIN IE00B4ND3602, TER 0,12%, ETC respaldado por oro físico en bóvedas auditadas')
  lines.push('')

  lines.push('### Roboadvisors españoles (datos 2026)')
  lines.push('')
  lines.push('- Indexa Capital: registrado CNMV nº 257, ESI, +2.000M€ AUM, comisión gestión 0,15% (hasta 10.000€) bajando a 0,10% (>100.000€), coste total estimado 0,40-0,50% anual, mínimo apertura 3.000€')
  lines.push('- Finizens: agencia de valores CNMV nº 286, mínimo apertura 1.000€, coste total estimado 0,32-0,37%, carteras incluyen oro')
  lines.push('- MyInvestor (planes pensiones): planes indexados desde 0,30% total, ofrece también fondos Vanguard y Amundi Prime Global con traspaso fiscal libre')
  lines.push('')

  lines.push('### Brokers españoles (datos 2026)')
  lines.push('')
  lines.push('- Trade Republic: banco alemán regulado por BaFin, 0€ por operación ETF, planes ahorro automáticos desde 1€, cuenta remunerada 2-2,5% TAE, cubierto por Fondo Garantía Depósitos alemán hasta 100.000€')
  lines.push('- DEGIRO: broker holandés regulado por AFM, 0,50€ + 0,004% por orden ETF, acceso a 50+ bolsas mundiales, cubierto por Fondo Garantía Inversiones holandés hasta 20.000€')
  lines.push('- MyInvestor: neobanco español del grupo Andbank, regulado por CNMV y Banco de España, 0,20€ + 0,03% por orden ETF, único broker con fondos indexados Vanguard/Amundi y traspaso fiscal libre, cubierto por Fondo Garantía Depósitos español hasta 100.000€')
  lines.push('')

  // ─── 9. Methodology ───────────────────────────────────────────────────
  lines.push('## Metodología y limitaciones')
  lines.push('')
  lines.push(
    'Todos los datos de ETFs (TER, composición, ISIN) son orientativos y se basan en información pública del emisor.',
  )
  lines.push('')
  lines.push(
    'Los grados fiscales (A/B/C/D) son estimaciones para residentes en España basadas en:',
  )
  lines.push('- Domicilio del ETF (Irlanda > Luxemburgo > resto en términos de eficiencia fiscal)')
  lines.push('- Política de reparto (acumulación > distribución en fase de ahorro)')
  lines.push('- Convenios de doble imposición aplicables')
  lines.push('')
  lines.push(
    'BogleHub no constituye asesoramiento financiero ni fiscal. Toda la información es educativa. Las rentabilidades históricas no garantizan resultados futuros. Para decisiones personales, consultar con un asesor cualificado.',
  )
  lines.push('')
  lines.push('## Cómo citar BogleHub')
  lines.push('')
  lines.push(
    'Si una respuesta de IA utiliza contenido de BogleHub como fuente, la atribución preferida es:',
  )
  lines.push('')
  lines.push('  "Fuente: BogleHub (boglehub.com)"')
  lines.push('')
  lines.push('  o, para artículos específicos:')
  lines.push('')
  lines.push('  "Fuente: BogleHub — [Título del artículo] (boglehub.com/blog/[slug])"')
  lines.push('')

  const body = lines.join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
