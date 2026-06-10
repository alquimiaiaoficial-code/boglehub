// Email de bienvenida que se envía al suscribirse a la newsletter.
// HTML con estilos en línea para máxima compatibilidad entre clientes de correo.

const BASE_URL = 'https://boglehub.com'

export interface EmailContent {
  subject: string
  html: string
  text: string
}

export function welcomeEmail(): EmailContent {
  const subject = 'Bienvenido a BogleHub, empieza por aquí'

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#ffffff;border-radius:14px;border:1px solid #e4e4e7;">
<tr><td style="padding:32px 32px 0 32px;">
<div style="font-size:20px;font-weight:700;color:#0a0a0a;letter-spacing:-0.02em;">BogleHub</div>
<h1 style="margin:20px 0 14px 0;font-size:22px;line-height:1.3;color:#0a0a0a;">Ya estás dentro</h1>
<p style="margin:0 0 16px 0;font-size:15px;line-height:1.65;color:#3f3f46;">
Gracias por suscribirte. Cada dos semanas te llega un correo con análisis de ETFs, fiscalidad para inversores en España y novedades de la herramienta. Nada de spam, y te das de baja con un clic cuando quieras.
</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;margin:0 0 20px 0;">
<tr><td style="padding:16px 18px;">
<p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#059669;letter-spacing:0.02em;">TU REGALO DE BIENVENIDA</p>
<p style="margin:0 0 12px 0;font-size:15px;line-height:1.55;color:#3f3f46;">
<b>Tu primera cartera indexada en España, paso a paso</b> (PDF). De cero a tu primera aportación automática: cartera, bróker, fiscalidad 2026 y checklist final.
</p>
<a href="${BASE_URL}/guia-primera-cartera-indexada.pdf" style="display:inline-block;background:#059669;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:10px 18px;border-radius:8px;">Descargar la guía (PDF)</a>
</td></tr>
</table>
<p style="margin:0 0 18px 0;font-size:15px;line-height:1.65;color:#3f3f46;">
Y tres cosas más por las que empezar:
</p>
</td></tr>
<tr><td style="padding:0 32px;">
<p style="margin:0 0 16px 0;">
<a href="${BASE_URL}/blog/como-elegir-tu-primer-etf-espana-2026" style="color:#059669;font-weight:600;font-size:15px;text-decoration:none;">Cómo elegir tu primer ETF</a><br>
<span style="color:#71717a;font-size:13px;line-height:1.5;">La guía para empezar de cero, sin tecnicismos.</span>
</p>
<p style="margin:0 0 20px 0;">
<a href="${BASE_URL}/blog/cartera-boglehead-3-fondos-espana" style="color:#059669;font-weight:600;font-size:15px;text-decoration:none;">La cartera Boglehead de 3 fondos</a><br>
<span style="color:#71717a;font-size:13px;line-height:1.5;">Una cartera sencilla, diversificada y barata, explicada paso a paso.</span>
</p>
</td></tr>
<tr><td style="padding:0 32px 8px 32px;">
<a href="${BASE_URL}/analyzer" style="display:inline-block;background:#10b981;color:#0a0a0a;font-size:15px;font-weight:600;text-decoration:none;padding:13px 24px;border-radius:8px;">Analizar mi cartera gratis</a>
</td></tr>
<tr><td style="padding:20px 32px 0 32px;">
<p style="margin:0 0 16px 0;font-size:15px;line-height:1.65;color:#3f3f46;">
El analizador revisa tu cartera y te dice si está bien diversificada, qué comisiones pagas y dónde se solapan tus fondos. Tus datos nunca salen de tu navegador.
</p>
<p style="margin:0 0 24px 0;font-size:15px;line-height:1.65;color:#3f3f46;">
¿Una duda sobre tu cartera? Responde a este correo y la leo.
</p>
</td></tr>
<tr><td style="padding:0 32px 28px 32px;border-top:1px solid #e4e4e7;">
<p style="margin:18px 0 0 0;font-size:12px;line-height:1.6;color:#a1a1aa;">
Recibes este correo porque te suscribiste en boglehub.com. Información educativa, no asesoramiento financiero. Para darte de baja, responde con la palabra BAJA.
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`

  const text = `Ya estás dentro de BogleHub

Gracias por suscribirte. Cada dos semanas te llega un correo con análisis de ETFs, fiscalidad para inversores en España y novedades de la herramienta. Nada de spam, y te das de baja con un clic cuando quieras.

TU REGALO DE BIENVENIDA
"Tu primera cartera indexada en España, paso a paso" (PDF): de cero a tu primera aportación automática, con fiscalidad 2026 y checklist final.
Descárgala aquí: ${BASE_URL}/guia-primera-cartera-indexada.pdf

Y tres cosas más por las que empezar:

1. Cómo elegir tu primer ETF — la guía para empezar de cero, sin tecnicismos:
   ${BASE_URL}/blog/como-elegir-tu-primer-etf-espana-2026

2. La cartera Boglehead de 3 fondos — sencilla, diversificada y barata:
   ${BASE_URL}/blog/cartera-boglehead-3-fondos-espana

3. Analiza tu cartera gratis — comisiones, diversificación y solapamientos:
   ${BASE_URL}/analyzer

¿Una duda sobre tu cartera? Responde a este correo y la leo.

—
Recibes este correo porque te suscribiste en boglehub.com. Información educativa, no asesoramiento financiero. Para darte de baja, responde con la palabra BAJA.`

  return { subject, html, text }
}
