// Render y calendario de la newsletter semanal (los números viven en `src/data/newsletter.ts`).
// Funciones puras para poder probarlas sin red: la ruta del cron solo las orquesta.

import type { NumeroNewsletter } from '@/data/newsletter'
import type { EmailContent } from '@/lib/welcome-email'

/** Marcador que Resend sustituye en cada broadcast por el enlace de baja de ese contacto. */
export const MARCA_BAJA = '{{{RESEND_UNSUBSCRIBE_URL}}}'

/** Hora de Madrid a la que sale la newsletter. El cron de Vercel va en UTC y no sabe de cambios de hora. */
export const HORA_ENVIO_MADRID = 8

export interface HoraMadrid {
  /** AAAA-MM-DD */
  fecha: string
  /** 0 = domingo … 2 = martes */
  diaSemana: number
  hora: number
}

const DIAS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

export function horaMadrid(instante: Date): HoraMadrid {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      hourCycle: 'h23',
      weekday: 'short',
    })
      .formatToParts(instante)
      .map((p) => [p.type, p.value]),
  )
  return {
    fecha: `${partes.year}-${partes.month}-${partes.day}`,
    diaSemana: DIAS[partes.weekday],
    hora: Number(partes.hour),
  }
}

/**
 * ¿Toca enviar ahora? El martes entre las 08:00 y las 09:59 de Madrid.
 *
 * vercel.json lleva dos entradas (06:00 y 07:00 UTC) para cubrir el horario de verano y el de
 * invierno sin tocar nada el 25-oct. En el plan Hobby Vercel dispara el cron en cualquier minuto
 * de la hora indicada, no en el exacto, y la entrega es «best effort»: aceptar dos horas hace que,
 * en verano, la segunda entrada recoja el envío si la primera se pierde. Si las dos llegan, la
 * segunda encuentra el broadcast ya enviado y no hace nada (idempotencia por nombre).
 */
export function tocaEnviar(h: HoraMadrid): boolean {
  return h.diaSemana === 2 && (h.hora === HORA_ENVIO_MADRID || h.hora === HORA_ENVIO_MADRID + 1)
}

/** El número de esa fecha exacta, o ninguno. Nunca uno de otra fecha. */
export function numeroDeLaFecha(
  numeros: readonly NumeroNewsletter[],
  fecha: string,
): NumeroNewsletter | undefined {
  return numeros.find((n) => n.fecha === fecha)
}

/** Nombre del broadcast en Resend; es la llave de la idempotencia. */
export function nombreBroadcast(n: NumeroNewsletter): string {
  return `boglehub-n${n.numero}`
}

function escapar(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const ENLACE = /\[([^\]]+)\]\((https:\/\/boglehub\.com[^)\s]*)\)/g

function parrafoHtml(p: string): string {
  // Se escapa primero y se convierten después los enlaces: el texto del enlace ya va escapado y
  // la URL solo puede ser de boglehub.com (la regex no acepta otra).
  return escapar(p).replace(
    ENLACE,
    (_, texto: string, url: string) =>
      `<a href="${url}" style="color:#059669;font-weight:600;text-decoration:underline;">${texto}</a>`,
  )
}

function parrafoTexto(p: string): string {
  return p.replace(ENLACE, (_, texto: string, url: string) => `${texto} (${url})`)
}

/**
 * HTML y texto del número. `enlaceBaja` es el marcador de Resend en el envío real; en la prueba
 * a boglehub@gmail.com (correo suelto, no broadcast) Resend no lo sustituiría y se pasa otro.
 */
export function renderNumero(n: NumeroNewsletter, enlaceBaja: string = MARCA_BAJA): EmailContent {
  const cuerpoHtml = n.parrafos
    .map(
      (p) =>
        `<p style="margin:0 0 16px 0;font-size:15px;line-height:1.65;color:#3f3f46;">${parrafoHtml(p)}</p>`,
    )
    .join('\n')

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapar(n.asunto)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;">
<div style="display:none;max-height:0;overflow:hidden;">${escapar(n.preencabezado)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#ffffff;border-radius:14px;border:1px solid #e4e4e7;">
<tr><td style="padding:32px 32px 8px 32px;">
<div style="font-size:20px;font-weight:700;color:#0a0a0a;letter-spacing:-0.02em;margin:0 0 20px 0;">BogleHub</div>
${cuerpoHtml}
<p style="margin:0 0 24px 0;font-size:15px;line-height:1.65;color:#3f3f46;">BogleHub</p>
</td></tr>
<tr><td style="padding:0 32px 28px 32px;border-top:1px solid #e4e4e7;">
<p style="margin:18px 0 0 0;font-size:12px;line-height:1.6;color:#a1a1aa;">
Recibes este correo porque te suscribiste en boglehub.com. Información educativa, no asesoramiento financiero.
<a href="${enlaceBaja}" style="color:#a1a1aa;text-decoration:underline;">Darte de baja</a>.
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`

  const text = `${n.parrafos.map(parrafoTexto).join('\n\n')}

BogleHub

--
Recibes este correo porque te suscribiste en boglehub.com. Información educativa, no asesoramiento financiero.
Darte de baja: ${enlaceBaja}
`

  return { subject: n.asunto, html, text }
}
