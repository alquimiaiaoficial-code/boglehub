import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { welcomeEmail } from '@/lib/welcome-email'

const BodySchema = z.object({
  email: z.string().email(),
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
  let email: string
  try {
    const body = BodySchema.parse(await req.json())
    email = body.email.trim().toLowerCase()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Email no válido' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const from = process.env.RESEND_FROM ?? 'BogleHub <onboarding@resend.dev>'

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
        body: JSON.stringify({ email, unsubscribed: false }),
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
