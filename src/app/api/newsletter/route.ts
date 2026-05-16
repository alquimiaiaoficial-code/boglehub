import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const BodySchema = z.object({
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = BodySchema.parse(await req.json())

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      // For MVP without Resend configured, just log and accept
      console.log('Newsletter signup (no Resend):', body.email)
      return NextResponse.json({ success: true })
    }

    // Send notification to founder
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@boglehub.app',
        to: 'alquimiaia.oficial@gmail.com',
        subject: `[BogleHub] Nuevo signup: ${body.email}`,
        text: `Nueva suscripción al newsletter: ${body.email}\n\nFecha: ${new Date().toISOString()}`,
      }),
    })

    if (!res.ok) {
      console.error('Resend error:', await res.text())
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Error' }, { status: 400 })
  }
}
