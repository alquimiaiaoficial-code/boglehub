import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'


import { GROQ_MODEL } from '@/lib/groq-model'
import { clasificarFalloDeIa } from '@/lib/fallo-ia'
const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1).max(8000),
})

const BodySchema = z.object({
  messages: z.array(MessageSchema).min(1).max(40),
})

const SYSTEM_PROMPT = `Eres un asistente educativo experto en inversión pasiva, fondos indexados (ETFs), planificación FIRE y finanzas personales. Hablas español de España con tono cercano pero técnico y riguroso.

Aunque tu especialidad es la inversión Boglehead, puedes responder cualquier pregunta del usuario con honestidad. Eres preciso, conciso y útil.

REGLAS INNEGOCIABLES:
- NUNCA des consejo financiero específico ("compra X", "vende Y"). Tu rol es educativo.
- En temas financieros, recuerda: "Esto es información educativa, no asesoramiento."
- Usa Markdown cuando ayude (listas, tablas, código, bold, etc.). El frontend lo renderiza.
- Si no estás seguro de un dato (precios, cifras concretas, leyes recientes), dilo claramente.
- No inventes datos numéricos. Si no estás seguro, di que el usuario debe verificarlo.
- Si el usuario pregunta sobre temas no financieros, respóndele con utilidad pero brevemente.
- Habla en español de España (vosotros, no ustedes; usa "tú" no "usted").
- Usa la palabra "concretamente" en lugar de "específicamente".

FORMATO:
- Headings (##) solo si la respuesta es larga (>3 párrafos)
- Listas numeradas para pasos secuenciales
- Listas con bullets para items no ordenados
- Bold con **texto** para conceptos clave
- Tablas para comparativas
- Cita fuentes cuando sea pertinente (ej. "según el Banco de España...")`

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 'chat', 20)
  if (limited) return limited

  try {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return new Response('El chat no está disponible ahora mismo. El resto del sitio funciona con normalidad.', { status: 503 })
    }

    const body = BodySchema.parse(await req.json())

    const groq = new Groq({ apiKey })
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...body.messages,
    ]

    const stream = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 2000,
      stream: true,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content
            if (content) controller.enqueue(encoder.encode(content))
          }
          controller.close()
        } catch (err) {
          console.error('Stream error:', err)
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    // El detalle técnico se registra en el servidor, no se devuelve al usuario.
    //
    // Antes se enviaba `err.message` tal cual y, cuando Groq retiró el modelo en
    // agosto de 2026, la pantalla del chat mostró durante quince días el JSON
    // crudo del proveedor con el nombre del modelo dentro. Para quien entraba,
    // eso no era un aviso: era un sitio roto.
    console.error('[chat] fallo al llamar al modelo:', err)

    const detalle = err instanceof Error ? err.message : String(err)
    // Clasificación de la causa, añadida el 8-sep-2026 tras una caída que costó
    // media hora de diagnóstico a ciegas: el chat devolvía 502 genérico y desde fuera
    // era imposible distinguir «clave rechazada» de «sin cuota» o «Groq caído». El
    // usuario ve el mismo mensaje amable en todos los casos; lo que cambia es el
    // registro del servidor y el código de estado, que son para nosotros.
    const causa = clasificarFalloDeIa(detalle)
    console.error('[chat] causa clasificada:', causa)

    const mensaje = causa === 'modelo-retirado' || causa === 'credenciales'
      ? 'El chat no está disponible ahora mismo por un problema de configuración que ya conocemos. Mientras tanto puedes usar el analizador y las calculadoras, que funcionan sin IA.'
      : 'No he podido responder ahora mismo. Vuelve a intentarlo en unos segundos; si sigue fallando, el resto del sitio funciona con normalidad.'

    // 503 = problema nuestro y conocido; 502 = el proveedor falló de forma inesperada.
    const estado = causa === 'transitorio' ? 502 : 503
    return new Response(mensaje, { status: estado })
  }
}
