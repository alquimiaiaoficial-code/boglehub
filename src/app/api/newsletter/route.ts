import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { welcomeEmail } from '@/lib/welcome-email'
import { rateLimit } from '@/lib/rate-limit'

const BodySchema = z.object({
  email: z.string().email(),
  /** Origen del alta, tomado de los UTM de la URL. Opcional: las altas directas no lo llevan. */
  source: z.string().max(60).optional(),
})

const RESEND_API = 'https://api.resend.com'

/**
 * Alta en la newsletter.
 *
 * Con Resend configurado (RESEND_API_KEY + RESEND_AUDIENCE_ID):
 *   1. Guarda el contacto en la audiencia de Resend.
 *   2. Envía el email de bienvenida.
 *
 * Sin Resend configurado se acepta el alta para no romper la UX, pero el
 * email NO se persiste. Es solo un fallback de desarrollo: en producción
 * deben estar las tres variables de entorno.
 */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 'newsletter', 5)
  if (limited) return limited

  let email: string
  let source: string | undefined
  try {
    const body = BodySchema.parse(await req.json())
    email = body.email.trim().toLowerCase()
    // Solo caracteres de UTM razonables; si llega basura, se descarta la atribución
    // en vez de rechazar el alta. Perder el origen es mucho menos malo que perder al
    // suscriptor.
    source = body.source?.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40) || undefined
  } catch {
    return NextResponse.json(
      { success: false, error: 'Email no válido' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const from = process.env.RESEND_FROM ?? 'BogleHub <onboarding@resend.dev>'
  // Las respuestas al email de bienvenida van a este buzón (p. ej. el Gmail
  // del fundador), así no hace falta montar recepción de correo en el dominio.
  const replyTo = process.env.RESEND_REPLY_TO

  if (!apiKey) {
    console.warn('[newsletter] RESEND_API_KEY ausente — alta no persistida:', email)
    return NextResponse.json({ success: true })
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  }

  // 1. Guardar el contacto en la audiencia.
  if (audienceId) {
    try {
      const res = await fetch(`${RESEND_API}/audiences/${audienceId}/contacts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email,
          unsubscribed: false,
          // Atribución duradera del origen. El evento `email_captured` de Vercel
          // Analytics ya lo registra, pero ese panel no es consultable por API y no
          // deja rastro que se pueda cruzar después con la lista de contactos: en
          // agosto de 2026 hubo que deducir de dónde venían los suscriptores por
          // coincidencia de fechas. Resend no admite metadatos libres en un contacto,
          // así que se aprovecha `last_name`, que este proyecto no usa para nada
          // (`welcomeEmail()` no personaliza con el nombre).
          //
          // El prefijo `utm:` es deliberado: si algún día se personaliza un correo
          // con el nombre, un "Hola utm:youtube" salta a la vista en la primera
          // prueba en lugar de colarse a producción.
          ...(source ? { last_name: `utm:${source}` } : {}),
        }),
      })
      if (!res.ok) {
        const detail = await res.text()
        // Un contacto que ya existe no es un fallo: ya estaba suscrito.
        if (!detail.toLowerCase().includes('already')) {
          console.error('[newsletter] alta en audiencia falló:', detail)
        }
      }
    } catch (err) {
      console.error('[newsletter] error de red al guardar contacto:', err)
    }
  } else {
    console.warn('[newsletter] RESEND_AUDIENCE_ID ausente — contacto no guardado')
  }

  // 2. Enviar el email de bienvenida.
  try {
    const mail = welcomeEmail()
    const res = await fetch(`${RESEND_API}/emails`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from,
        to: email,
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      }),
    })
    if (!res.ok) {
      console.error('[newsletter] envío de bienvenida falló:', await res.text())
    }
  } catch (err) {
    console.error('[newsletter] error de red al enviar bienvenida:', err)
  }

  return NextResponse.json({ success: true })
}
