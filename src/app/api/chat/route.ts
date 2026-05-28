import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'

const MODEL = 'llama-3.3-70b-versatile'

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
      return new Response('Error de configuración del servidor', { status: 500 })
    }

    const body = BodySchema.parse(await req.json())

    const groq = new Groq({ apiKey })
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...body.messages,
    ]

    const stream = await groq.chat.completions.create({
      model: MODEL,
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
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return new Response(message, { status: 400 })
  }
}
