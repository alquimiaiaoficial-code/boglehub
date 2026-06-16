# -*- coding: utf-8 -*-
"""
Genera el lead magnet de BogleHub:
  "Tu primera cartera indexada en España, paso a paso" (PDF)

Salida: public/guia-primera-cartera-indexada.pdf

Regenerar cuando cambien datos (tramos IRPF, TER, etc.):
  python scripts/lead-magnet/generar_guia.py

Datos verificados a junio 2026:
  - VWCE (Vanguard FTSE All-World Acc): ISIN IE00BK5BQT80, TER 0,19%
  - Tramos IRPF del ahorro 2026: 19/21/23/27/30
  - Fondos indexados: traspaso sin tributar; ETF: no
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
)

OUT = os.path.join(os.path.dirname(__file__), "..", "..", "public",
                   "guia-primera-cartera-indexada.pdf")
OUT = os.path.abspath(OUT)

# Paleta BogleHub
INK = HexColor("#0a0a0a")
MUTED = HexColor("#52525b")
SUBTLE = HexColor("#a1a1aa")
GREEN = HexColor("#059669")
GREEN_BRIGHT = HexColor("#10b981")
NAVY = HexColor("#0b1220")
LINE = HexColor("#e4e4e7")
BG_SOFT = HexColor("#f4f4f5")

W, H = A4

# ----------------------------------------------------------------------------
# Estilos
# ----------------------------------------------------------------------------
def st(name, **kw):
    base = dict(fontName="Helvetica", fontSize=10.5, leading=15.5,
                textColor=INK, alignment=TA_LEFT, spaceAfter=8)
    base.update(kw)
    return ParagraphStyle(name, **base)

S_KICKER = st("kicker", fontName="Helvetica-Bold", fontSize=9.5,
              textColor=GREEN, spaceAfter=4)
S_H1 = st("h1", fontName="Helvetica-Bold", fontSize=19, leading=23,
          spaceBefore=2, spaceAfter=10)
S_H2 = st("h2", fontName="Helvetica-Bold", fontSize=12.5, leading=16,
          spaceBefore=10, spaceAfter=5)
S_BODY = st("body")
S_BULLET = st("bullet", leftIndent=12, bulletIndent=2, spaceAfter=5)
S_NOTE = st("note", fontSize=9.5, leading=14, textColor=MUTED)
S_BOX = st("box", fontSize=10, leading=14.5, textColor=INK)
S_SMALL = st("small", fontSize=8.5, leading=12.5, textColor=SUBTLE)

def bullet(text):
    return Paragraph(text, S_BULLET, bulletText="•")

def box(flow_text, title=None):
    """Caja destacada con fondo suave y borde verde a la izquierda."""
    rows = []
    if title:
        rows.append([Paragraph(f"<b>{title}</b>", S_BOX)])
    rows.append([Paragraph(flow_text, S_BOX)])
    t = Table(rows, colWidths=[W - 50 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_SOFT),
        ("LINEBEFORE", (0, 0), (0, -1), 2.5, GREEN),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return t

def data_table(headers, rows, widths):
    cells = [[Paragraph(f"<b>{h}</b>", S_NOTE) for h in headers]]
    for r in rows:
        cells.append([Paragraph(c, S_NOTE) for c in r])
    t = Table(cells, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, BG_SOFT]),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    # El header debe ir en blanco: reconstruimos la primera fila con estilo claro
    hdr_style = ParagraphStyle("hdr", parent=S_NOTE, textColor=white,
                               fontName="Helvetica-Bold")
    t._cellvalues[0] = [Paragraph(h, hdr_style) for h in headers]
    return t

def step_heading(num, title):
    return [
        Paragraph(f"PASO {num}", S_KICKER),
        Paragraph(title, S_H1),
    ]

# ----------------------------------------------------------------------------
# Portada y pie de página
# ----------------------------------------------------------------------------
def draw_cover(c, doc):
    c.saveState()
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    # Marca
    c.setFillColor(GREEN_BRIGHT)
    c.roundRect(25 * mm, H - 52 * mm, 16 * mm, 16 * mm, 3 * mm, stroke=0, fill=1)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(33 * mm, H - 47.5 * mm, "B")
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(45 * mm, H - 44 * mm, "BogleHub")
    c.setFillColor(HexColor("#94a3b8"))
    c.setFont("Helvetica", 11)
    c.drawString(45 * mm, H - 50 * mm, "Invertir con cabeza, sin humo")
    # Título
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 34)
    c.drawString(25 * mm, H - 110 * mm, "Tu primera cartera")
    c.drawString(25 * mm, H - 124 * mm, "indexada en España,")
    c.setFillColor(GREEN_BRIGHT)
    c.drawString(25 * mm, H - 138 * mm, "paso a paso")
    # Subtítulo
    c.setFillColor(HexColor("#cbd5e1"))
    c.setFont("Helvetica", 13)
    c.drawString(25 * mm, H - 156 * mm, "De cero a tu primera aportación automática:")
    c.drawString(25 * mm, H - 163 * mm, "cartera, bróker, fiscalidad y los errores que evitar.")
    # Píldoras
    c.setFont("Helvetica-Bold", 10)
    pills = ["6 pasos", "Fiscalidad 2026", "Checklist final", "Sin humo"]
    x = 25 * mm
    for p in pills:
        wpx = c.stringWidth(p, "Helvetica-Bold", 10) + 12 * mm
        c.setFillColor(HexColor("#16263d"))
        c.roundRect(x, H - 182 * mm, wpx, 9 * mm, 4.5 * mm, stroke=0, fill=1)
        c.setFillColor(GREEN_BRIGHT)
        c.drawCentredString(x + wpx / 2, H - 179 * mm, p)
        x += wpx + 4 * mm
    # Pie de portada
    c.setFillColor(HexColor("#64748b"))
    c.setFont("Helvetica", 10)
    c.drawString(25 * mm, 28 * mm, "boglehub.com")
    c.drawString(25 * mm, 22 * mm, "Edición 2026 · Información educativa, no asesoramiento financiero")
    c.restoreState()

def draw_footer(c, doc):
    c.saveState()
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(25 * mm, 18 * mm, W - 25 * mm, 18 * mm)
    c.setFillColor(SUBTLE)
    c.setFont("Helvetica", 8)
    c.drawString(25 * mm, 12.5 * mm,
                 "boglehub.com · Tu primera cartera indexada en España · Educativo, no asesoramiento")
    c.drawRightString(W - 25 * mm, 12.5 * mm, f"{doc.page - 1}")
    c.restoreState()

# ----------------------------------------------------------------------------
# Contenido
# ----------------------------------------------------------------------------
story = [PageBreak()]
P = story.append

# --- Bienvenida -------------------------------------------------------------
P(Paragraph("ANTES DE EMPEZAR", S_KICKER))
P(Paragraph("Qué vas a conseguir con esta guía", S_H1))
P(Paragraph(
    "Al terminar tendrás tu primera cartera indexada funcionando: sabrás qué "
    "comprar, dónde comprarlo, cómo automatizar tus aportaciones y cómo no "
    "estropearlo después, que es donde se pierde más dinero. Todo adaptado a "
    "España: fiscalidad, brókers disponibles y productos UCITS.", S_BODY))
P(Paragraph(
    "La filosofía detrás es la de John Bogle, fundador de Vanguard: no intentes "
    "ganar al mercado, cómpralo entero a bajo coste y deja que el interés "
    "compuesto trabaje años. Aburrido a corto plazo. Muy eficaz a largo.", S_BODY))
P(box(
    "Esta guía es información educativa, no asesoramiento financiero. No conoce "
    "tu situación personal y no sustituye a un asesor. Invertir conlleva riesgo: "
    "puedes recuperar menos de lo invertido. Las rentabilidades pasadas no "
    "garantizan rentabilidades futuras.", "Léelo una vez y sigamos"))
P(Spacer(1, 6))
P(Paragraph("Lo que necesitas para seguirla", S_H2))
P(bullet("Unos 60-90 minutos en total, repartidos como quieras."))
P(bullet("Tu DNI y un móvil (para abrir cuenta en un bróker)."))
P(bullet("Una cantidad para empezar. Vale desde 50-100 € al mes: la constancia importa más que la cifra."))
P(PageBreak())

# --- Paso 0 -----------------------------------------------------------------
for el in step_heading(0, "Antes de invertir un euro"):
    P(el)
P(Paragraph(
    "Invertir es lo último de la lista, no lo primero. Tres condiciones antes "
    "de empezar; si te falta alguna, resuélvela primero y la cartera puede esperar:", S_BODY))
P(Paragraph("1. Fondo de emergencia", S_H2))
P(Paragraph(
    "Entre 3 y 6 meses de tus gastos, en una cuenta o fondo monetario, separado "
    "del dinero del día a día. Es lo que evita que tengas que vender tus fondos "
    "en plena caída porque se rompió el coche. Sin colchón, cualquier imprevisto "
    "te obliga a deshacer la inversión en el peor momento.", S_BODY))
P(Paragraph("2. Cero deudas caras", S_H2))
P(Paragraph(
    "Si pagas un 18% por una tarjeta revolving o un préstamo al consumo, "
    "amortizarlo es la mejor inversión que existe: rentabilidad garantizada del "
    "18%. Ningún índice promete eso. La hipoteca a tipo razonable es otra "
    "historia y puede convivir con la cartera.", S_BODY))
P(Paragraph("3. Horizonte de verdad", S_H2))
P(Paragraph(
    "El dinero que metas en renta variable debe poder quedarse ahí 10 años o "
    "más. La bolsa cae con frecuencia un 10-20% y, de vez en cuando, un 30-50%. "
    "Si vas a necesitar ese dinero en 2-3 años (entrada de un piso, máster), no "
    "lo inviertas en bolsa.", S_BODY))
P(box(
    "Regla rápida: dinero para antes de 5 años, fuera de la bolsa. Dinero para "
    "dentro de 10 o más, ahí es donde la cartera indexada brilla."))
P(PageBreak())

# --- Paso 1 -----------------------------------------------------------------
for el in step_heading(1, "Entiende qué vas a comprar"):
    P(el)
P(Paragraph(
    "Un <b>índice</b> es una lista de empresas con una regla. El MSCI World son "
    "unas 1.500 empresas de países desarrollados; el FTSE All-World, unas 3.700 "
    "de todo el mundo, emergentes incluidos. Un <b>fondo indexado</b> o un "
    "<b>ETF</b> indexado simplemente compra todas las empresas de esa lista por "
    "ti. Con una sola compra eres dueño de un trocito de medio mundo.", S_BODY))
P(Paragraph(
    "Fondo indexado y ETF compran lo mismo; cambia el envoltorio. Y en España "
    "el envoltorio tiene una consecuencia fiscal importante:", S_BODY))
P(data_table(
    ["", "Fondo indexado", "ETF"],
    [
        ["Cómo se compra", "Participaciones, una vez al día (valor liquidativo)", "Como una acción, en tiempo real en bolsa"],
        ["Traspasos", "<b>Sin tributar</b>: puedes mover de un fondo a otro sin pasar por Hacienda", "No hay traspaso: vender tributa por la ganancia"],
        ["Aportaciones pequeñas", "Cómodas y sin coste por operación en muchos comercializadores", "Depende del bróker (algunos, compra gratis)"],
        ["Coste anual (TER)", "Desde ~0,05-0,30% en indexados", "Desde ~0,03-0,25% en indexados"],
    ],
    [32 * mm, 64 * mm, 64 * mm]))
P(Spacer(1, 6))
P(box(
    "La ventaja española del fondo: el <b>traspaso sin tributar</b>. Si en el "
    "futuro quieres cambiar de fondo o rebalancear, lo haces sin pagar impuestos "
    "por el camino. Con ETF, cada venta tributa. Para quien empieza y va a "
    "aportar cada mes, el fondo indexado suele ser el camino más simple; el ETF "
    "compensa por costes algo menores y oferta más amplia si eso te pesa más.",
    "La decisión fondo vs ETF, en una frase"))
P(PageBreak())

# --- Paso 2 -----------------------------------------------------------------
for el in step_heading(2, "Elige tu cartera (simple gana)"):
    P(el)
P(Paragraph(
    "No necesitas diez fondos. Necesitas uno o tres, bien elegidos, y años de "
    "constancia. Dos opciones probadas:", S_BODY))
P(Paragraph("Opción A: un solo fondo de todo el mundo", S_H2))
P(Paragraph(
    "Un único producto que compra el mundo entero, desarrollados y emergentes. "
    "El ejemplo más conocido en ETF es el Vanguard FTSE All-World (ticker VWCE, "
    "ISIN IE00BK5BQT80, TER 0,19%): unas 3.700 empresas en una sola compra. En "
    "fondo indexado, las gestoras grandes (Vanguard, Amundi, Fidelity) ofrecen "
    "equivalentes globales con TER entre 0,05% y 0,25%. Máxima sencillez: una "
    "aportación al mes y listo.", S_BODY))
P(Paragraph("Opción B: la cartera de tres fondos (estilo Boglehead)", S_H2))
P(Paragraph(
    "Separas el mundo desarrollado, los emergentes y la renta fija. Controlas "
    "los pesos y rebalanceas tú. Es la cartera clásica de la comunidad Boglehead:", S_BODY))
P(data_table(
    ["Pieza", "Qué es", "Peso orientativo"],
    [
        ["RV desarrollados (MSCI World)", "~1.500 empresas de EE. UU., Europa, Japón...", "55-70%"],
        ["RV emergentes (MSCI EM)", "China, India, Brasil, Taiwán...", "5-15%"],
        ["Renta fija global (cubierta a EUR)", "Bonos de gobiernos y empresas, el amortiguador", "20-40%"],
    ],
    [52 * mm, 68 * mm, 40 * mm]))
P(Spacer(1, 6))
P(Paragraph(
    "¿Cuánta renta fija? Una referencia honesta: cuanto peor lleves ver tu "
    "cartera caer un 30-40%, más renta fija. Una regla clásica de partida es "
    "tener en renta fija aproximadamente tu edad menos 20-30, y ajustarla a tu "
    "estómago real, no al que crees tener en un buen año.", S_BODY))
P(box(
    "El error silencioso: comprar varios fondos que parecen distintos y son lo "
    "mismo. Un MSCI World + un S&amp;P 500 + un Nasdaq se solapan muchísimo: las "
    "mismas grandes tecnológicas americanas tres veces. Más fondos no es más "
    "diversificación. Antes de añadir un producto, pregúntate qué te aporta que "
    "no tengas ya.", "Cuidado con el solapamiento"))
P(PageBreak())

# --- Paso 3 -----------------------------------------------------------------
for el in step_heading(3, "Elige dónde comprar"):
    P(el)
P(Paragraph(
    "El bróker o comercializador es la tienda. No hay uno mejor en absoluto: "
    "depende de si quieres fondos o ETF, de cuánto aportas y de cada cuánto. "
    "Los criterios que importan, por orden:", S_BODY))
P(bullet("<b>Que tenga el producto que elegiste</b> en el Paso 2 (no todos ofrecen fondos indexados baratos, ni todos los ETF)."))
P(bullet("<b>Coste por operar</b>: comisión de compra y de custodia. Aportando 100-300 € al mes, una comisión fija de 2 € por compra es un 0,7-2% de peaje cada mes."))
P(bullet("<b>Traspasos de fondos</b>: si vas a fondos indexados, que permita traspasar (la ventaja fiscal española)."))
P(bullet("<b>Regulación y respaldo</b>: entidad regulada en la UE, con los fondos de garantía que correspondan."))
P(bullet("<b>Automatización</b>: poder programar la aportación mensual sin tocar nada."))
P(Paragraph(
    "En España, los nombres que más suenan para empezar: MyInvestor (fondos "
    "indexados con traspaso y también ETF), Trade Republic (planes de inversión "
    "en ETF sin comisión de compra), DEGIRO y XTB (ETF con costes bajos), "
    "Indexa Capital o Finizens si prefieres que un roboadvisor lo haga todo por "
    "una comisión extra (~0,5-0,8% al año, todo incluido).", S_BODY))
P(box(
    "En boglehub.com/calculadora/comparar-brokers tienes un comparador gratuito "
    "que calcula cuánto te cuesta cada bróker al año con TU patrón de "
    "aportaciones exacto. Dos minutos y sales de dudas con un número, no con "
    "opiniones.", "Hazlo con números"))
P(PageBreak())

# --- Paso 4 -----------------------------------------------------------------
for el in step_heading(4, "Primera compra y piloto automático"):
    P(el)
P(Paragraph(
    "Abre la cuenta (DNI, unos minutos, algún día de espera por verificación), "
    "transfiere tu primera cantidad y compra tu fondo o ETF del Paso 2. La "
    "primera compra impone; hazla pequeña si eso te ayuda a empezar.", S_BODY))
P(Paragraph("Después, automatiza. Esto es lo importante:", S_H2))
P(Paragraph(
    "Programa una aportación periódica mensual (lo que en inglés llaman DCA, "
    "comprar cada mes la misma cantidad pase lo que pase). La automatización no "
    "es comodidad: es protección contra ti mismo. Elimina la tentación de "
    "esperar al momento perfecto, que estadísticamente no sabes encontrar (nadie "
    "sabe).", S_BODY))
P(box(
    "100 € al mes con una rentabilidad media del 7% anual no son 36.000 € al "
    "cabo de 30 años: son más de 120.000 €. La mayor parte no la pusiste tú, la "
    "puso el interés compuesto. Por eso empezar pronto importa más que empezar "
    "con mucho. Puedes ver tu proyección año a año en "
    "boglehub.com/calculadora/interes-compuesto.", "El número que lo cambia todo"))
P(Paragraph(
    "¿Y si tengo un buen pellizco ahorrado, lo meto de golpe o poco a poco? "
    "Estadísticamente, invertirlo de una vez ha ganado más veces que repartirlo "
    "(el mercado sube más años de los que baja). Emocionalmente, repartirlo en "
    "6-12 meses duele menos si cae justo después. Las dos opciones son "
    "razonables; elegir una y cumplirla es lo que importa.", S_BODY))
P(PageBreak())

# --- Paso 5 -----------------------------------------------------------------
for el in step_heading(5, "Mantener (el paso donde se gana o se pierde)"):
    P(el)
P(Paragraph(
    "La cartera ya está hecha. A partir de aquí, tu trabajo es no estropearla. "
    "Suena fácil; es lo más difícil de toda la guía.", S_BODY))
P(Paragraph("La regla de oro: no toques", S_H2))
P(Paragraph(
    "No mires la cartera cada día. No vendas porque \"viene una recesión\". No "
    "cambies de fondo porque otro subió más este año. Cada una de esas "
    "decisiones es, en promedio, dinero perdido. El plan se escribió en un "
    "momento de calma precisamente para no decidir en momentos de pánico.", S_BODY))
P(Paragraph("Rebalancea una vez al año (si llevas la opción B)", S_H2))
P(Paragraph(
    "Una vez al año (elige una fecha fija, tu cumpleaños por ejemplo), mira los "
    "pesos. Si la renta variable se fue del 70% al 78%, vuelve a tu reparto "
    "objetivo: con fondos indexados puedes hacerlo por traspaso sin tributar, o "
    "simplemente dirigiendo las nuevas aportaciones a lo que quedó corto. Con la "
    "opción A (un solo fondo global de RV más, quizá, un monetario), apenas hay "
    "nada que rebalancear.", S_BODY))
P(Paragraph("Cuando caiga un 30% (porque caerá)", S_H2))
P(Paragraph(
    "En algún momento de los próximos años verás tu cartera un 30% o más en "
    "rojo. No es un fallo del plan: es el peaje conocido de la renta variable, y "
    "la razón por la que renta más que el depósito. El plan ya lo contaba. Tu "
    "única tarea ese día es seguir con la aportación automática de ese mes, que "
    "además comprará barato.", S_BODY))
P(box(
    "Escríbete hoy una nota para tu yo del futuro: \"Sabía que esto pasaría. El "
    "plan lo contaba. No vendas.\" Y guárdala junto a la cartera. Funciona mejor "
    "de lo que parece.", "Tu contrato contigo"))
P(PageBreak())

# --- Fiscalidad -------------------------------------------------------------
P(Paragraph("LO ESENCIAL", S_KICKER))
P(Paragraph("Fiscalidad en España (2026), sin dolor", S_H1))
P(Paragraph(
    "Mientras no vendas, no tributas (los fondos de acumulación y los ETF de "
    "acumulación reinvierten los dividendos dentro, sin pasar por tu IRPF). "
    "Cuando vendas con ganancia, la ganancia (no todo lo que sacas) va a la "
    "base del ahorro:", S_BODY))
P(data_table(
    ["Ganancia (base del ahorro)", "Tipo 2026"],
    [
        ["Hasta 6.000 €", "19%"],
        ["6.000 a 50.000 €", "21%"],
        ["50.000 a 200.000 €", "23%"],
        ["200.000 a 300.000 €", "27%"],
        ["Más de 300.000 €", "30%"],
    ],
    [90 * mm, 40 * mm]))
P(Spacer(1, 6))
P(bullet("<b>Traspasos de fondos</b>: mover dinero entre fondos de inversión no tributa. Es la gran ventaja fiscal del inversor español y no existe para los ETF."))
P(bullet("<b>FIFO</b>: si vendes una parte, Hacienda considera que vendes las participaciones más antiguas primero."))
P(bullet("<b>Compensación</b>: las pérdidas se compensan con ganancias (y hasta 4 años siguientes). Vender con pérdida no siempre es mala noticia fiscal."))
P(bullet("Los dividendos de fondos/ETF de distribución tributan cada año en esos mismos tramos. Para acumular a largo plazo, la clase de acumulación suele ser más cómoda y eficiente."))
P(box(
    "¿Vas a vender y quieres saber cuánto se lleva Hacienda exactamente? En "
    "boglehub.com/calculadora/irpf-venta-fondos lo ves con desglose por tramos "
    "en un minuto.", "Calculadora de IRPF"))
P(PageBreak())

# --- Errores ----------------------------------------------------------------
P(Paragraph("PARA NO TROPEZAR", S_KICKER))
P(Paragraph("Los 7 errores que más cuestan", S_H1))
P(bullet("<b>1. Esperar el momento perfecto.</b> El tiempo en el mercado gana al market timing. Empezar con 50 € hoy vale más que empezar con 5.000 \"cuando baje\"."))
P(bullet("<b>2. Vender en la caída.</b> El mayor destructor de rentabilidad real. La caída es el peaje, no la avería."))
P(bullet("<b>3. Coleccionar fondos que se solapan.</b> World + S&amp;P 500 + Nasdaq no es diversificar: es comprar lo mismo tres veces."))
P(bullet("<b>4. Ignorar las comisiones.</b> Un 1,5% anual de más se come, a 30 años, en torno a un tercio de tu resultado final. El coste es de lo poco que controlas al 100%."))
P(bullet("<b>5. Perseguir al ganador de ayer.</b> Cambiarse al fondo que más subió el año pasado es la receta clásica para comprar caro."))
P(bullet("<b>6. Confundir ahorro e inversión.</b> El fondo de emergencia no va en bolsa. El dinero de la entrada del piso tampoco."))
P(bullet("<b>7. No empezar nunca.</b> La parálisis por análisis tiene un coste compuesto enorme. Tu cartera no tiene que ser perfecta; tiene que existir."))
P(Spacer(1, 8))
P(Paragraph("Tu checklist final", S_H1))
P(bullet("Tengo fondo de emergencia de 3-6 meses fuera de la bolsa."))
P(bullet("No tengo deudas caras (o ya tienen plan de amortización)."))
P(bullet("Este dinero puede quedarse invertido 10+ años."))
P(bullet("He elegido cartera: 1 fondo global o 3 fondos con pesos."))
P(bullet("Sé si voy en fondo indexado (traspasable) o ETF, y por qué."))
P(bullet("He comparado brókers con números, no con opiniones."))
P(bullet("Mi aportación mensual está AUTOMATIZADA."))
P(bullet("Tengo fecha anual de revisión (y solo una)."))
P(bullet("He escrito mi nota de \"no vendas\" para la próxima caída."))
P(bullet("Sé que la ganancia tributa al vender (19-30%) y que los traspasos de fondos no."))
P(PageBreak())

# --- Cierre -----------------------------------------------------------------
P(Paragraph("SIGUIENTE NIVEL", S_KICKER))
P(Paragraph("Herramientas gratis para acompañarte", S_H1))
P(Paragraph(
    "Todo lo de esta guía lo puedes poner a prueba con las herramientas "
    "gratuitas de BogleHub. Sin registro y sin que tus datos salgan de tu "
    "navegador:", S_BODY))
P(bullet("<b>Analizador de cartera</b> (boglehub.com/analyzer): pega tus posiciones y te dice si estás diversificado, qué pagas de verdad en comisiones y dónde se solapan tus fondos."))
P(bullet("<b>Comparador de brókers</b> (boglehub.com/calculadora/comparar-brokers): tu coste anual real en cada bróker, con tu patrón de aportaciones."))
P(bullet("<b>Interés compuesto</b> (boglehub.com/calculadora/interes-compuesto): tu proyección año a año."))
P(bullet("<b>FIRE Monte Carlo</b> (boglehub.com/calculadora/fire-monte-carlo): cuándo podrías dejar de trabajar, con probabilidades de verdad y no con una cifra de fantasía."))
P(bullet("<b>IRPF al vender</b> (boglehub.com/calculadora/irpf-venta-fondos): lo que se lleva Hacienda, por tramos."))
P(bullet("<b>68 fichas de ETF, glosario y blog</b>: para cuando quieras profundizar en algo concreto."))
P(Spacer(1, 8))
P(box(
    "Si esta guía te ha servido, el siguiente paso es simple: abre la cuenta, "
    "programa la primera aportación y déjala trabajar. Dentro de diez años, el "
    "tú de hoy será la persona a la que darás las gracias.", "Y ahora, hazlo"))
P(Spacer(1, 14))
P(Paragraph(
    "BogleHub · boglehub.com · Edición 2026<br/>"
    "Documento educativo y gratuito. No es asesoramiento financiero ni una "
    "recomendación personalizada de inversión; no conoce tu situación y no "
    "sustituye el criterio de un profesional. Invertir conlleva riesgos, "
    "incluida la pérdida del capital. Rentabilidades pasadas no garantizan "
    "rentabilidades futuras. Datos fiscales y de producto verificados a junio "
    "de 2026; verifica siempre los datos vigentes antes de decidir.", S_SMALL))

# ----------------------------------------------------------------------------
doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    leftMargin=25 * mm, rightMargin=25 * mm,
    topMargin=22 * mm, bottomMargin=24 * mm,
    title="Tu primera cartera indexada en España, paso a paso",
    author="BogleHub",
    subject="Guía paso a paso para crear tu primera cartera indexada en España",
)
doc.build(story, onFirstPage=draw_cover, onLaterPages=draw_footer)
print("OK ->", OUT)
