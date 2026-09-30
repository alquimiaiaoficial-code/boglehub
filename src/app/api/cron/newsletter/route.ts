import { NextRequest, NextResponse } from 'next/server'
import { NUMEROS_NEWSLETTER } from '@/data/newsletter'
import {
  horaMadrid,
  nombreBroadcast,
  numeroDeLaFecha,
  renderNumero,
  tocaEnviar,
} from '@/lib/newsletter-email'

const RESEND_API = 'https://api.resend.com'

/** Única dirección a la que puede ir una prueba. Fija a propósito: la ruta no acepta destinatarios de fuera. */
const PRUEBA_A = 'boglehub@gmail.com'

/**
 * Envío semanal de la newsletter. Lo dispara el cron de Vercel (vercel.json) cada martes.
 *
 * - Autenticación: Vercel manda `Authorization: Bearer <CRON_SECRET>`. Sin CRON_SECRET no hace nada.
 * - Solo envía el martes entre las 8 y las 10 de Madrid y solo el número con la fecha de hoy (`tocaEnviar`,
 *   `numeroDeLaFecha`).
 * - Idempotente: antes de crear el broadcast mira en Resend si ya hay uno con el mismo nombre
 *   (`boglehub-n<numero>`). Si está enviado o programado, no hace nada; si se quedó en borrador
 *   (falló el envío la otra vez), envía ese.
 * - `?prueba=1&numero=N`: manda el número N como correo suelto SOLO a boglehub@gmail.com, sin
 *   tocar la audiencia, y devuelve cuántos suscriptores hay.
 * - `?simular=1&fecha=AAAA-MM-DD`: dice qué haría ese martes, sin enviar.
 */
export async function GET(req: NextRequest) {
  const secreto = process.env.CRON_SECRET
  if (!secreto) {
    return NextResponse.json({ error: 'CRON_SECRET no configurado' }, { status: 503 })
  }
  if (req.headers.get('authorization') !== `Bearer ${secreto}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const segmento = process.env.RESEND_SEGMENT_ID ?? process.env.RESEND_AUDIENCE_ID
  const from = process.env.RESEND_FROM
  const replyTo = process.env.RESEND_REPLY_TO
  if (!apiKey || !segmento || !from) {
    return NextResponse.json(
      { error: 'Faltan variables de Resend (RESEND_API_KEY, RESEND_AUDIENCE_ID, RESEND_FROM)' },
      { status: 503 },
    )
  }
  const headers = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }

  const params = req.nextUrl.searchParams
  if (params.get('prueba') === '1') {
    const n = NUMEROS_NEWSLETTER.find((x) => x.numero === Number(params.get('numero')))
    if (!n) return NextResponse.json({ error: 'No existe ese número' }, { status: 404 })
    const mail = renderNumero(n, 'https://boglehub.com')
    const res = await fetch(`${RESEND_API}/emails`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from,
        to: PRUEBA_A,
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject: `[Prueba] ${mail.subject}`,
        html: mail.html,
        text: mail.text,
      }),
    })
    return NextResponse.json({
      prueba: true,
      numero: n.numero,
      enviado: res.ok,
      detalle: res.ok ? undefined : await res.text(),
      dominioRemitente: from.split('@')[1]?.replace('>', ''),
      suscriptores: await contarSuscriptores(segmento, headers),
    })
  }

  // `?simular=1&fecha=AAAA-MM-DD`: recorre el camino del martes (número de esa fecha y consulta
  // de broadcasts en Resend) y dice qué haría, sin enviar nada.
  const simular = params.get('simular') === '1'
  const ahora = simular ? { fecha: params.get('fecha') ?? '', diaSemana: 2, hora: 8 } : horaMadrid(new Date())
  if (!tocaEnviar(ahora)) {
    return NextResponse.json({ enviado: false, motivo: 'no es martes entre las 8 y las 10 en Madrid', ahora })
  }
  const n = numeroDeLaFecha(NUMEROS_NEWSLETTER, ahora.fecha)
  if (!n) {
    console.warn('[newsletter] no hay número para', ahora.fecha)
    return NextResponse.json({ enviado: false, motivo: `no hay número para ${ahora.fecha}` })
  }
  const nombre = nombreBroadcast(n)

  const lista = await fetch(`${RESEND_API}/broadcasts?limit=100`, { headers })
  if (!lista.ok) {
    // Sin poder comprobar si ya salió, no se envía: un día sin correo es mejor que uno repetido.
    console.error('[newsletter] no se pudo listar broadcasts:', await lista.text())
    return NextResponse.json({ enviado: false, motivo: 'no se pudo comprobar si ya salió' }, { status: 502 })
  }
  const previos = ((await lista.json()).data ?? []) as { id: string; name: string | null; status: string }[]
  const previo = previos.find((b) => b.name === nombre)
  if (previo && previo.status !== 'draft') {
    return NextResponse.json({ enviado: false, motivo: `${nombre} ya está ${previo.status}` })
  }

  if (simular) {
    return NextResponse.json({
      simulacion: true,
      numero: n.numero,
      nombre,
      broadcastsEnResend: previos.length,
      haria: previo ? 'enviar el borrador que ya existe' : 'crear el broadcast y enviarlo',
    })
  }

  let res: Response
  if (previo) {
    res = await fetch(`${RESEND_API}/broadcasts/${previo.id}/send`, { method: 'POST', headers })
  } else {
    const mail = renderNumero(n)
    res = await fetch(`${RESEND_API}/broadcasts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        segment_id: segmento,
        from,
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        name: nombre,
        send: true,
      }),
    })
  }
  if (!res.ok) {
    const detalle = await res.text()
    console.error('[newsletter] envío falló:', detalle)
    return NextResponse.json({ enviado: false, numero: n.numero, detalle }, { status: 502 })
  }
  console.log('[newsletter] enviado', nombre)
  return NextResponse.json({ enviado: true, numero: n.numero, nombre })
}

async function contarSuscriptores(
  segmento: string,
  headers: Record<string, string>,
): Promise<number | null> {
  try {
    const res = await fetch(`${RESEND_API}/audiences/${segmento}/contacts`, { headers })
    if (!res.ok) return null
    const datos = ((await res.json()).data ?? []) as { unsubscribed?: boolean }[]
    return datos.filter((c) => !c.unsubscribed).length
  } catch {
    return null
  }
}
