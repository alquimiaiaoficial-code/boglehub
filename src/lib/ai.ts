import Groq from 'groq-sdk'
import { AllocationBreakdown, FireProjection, Result } from '@/types/analysis'

const MODEL = 'llama-3.3-70b-versatile'

function getGroqClient() {
  return new Groq({ apiKey: process.env.GROQ_API_KEY })
}

const SYSTEM_PROMPT = `Eres un asesor educativo (NO asesor financiero) experto en inversión pasiva e indexación. Tu trabajo es analizar la cartera de un inversor Boglehead hispano y darle insights accionables en español de España, claros y honestos.

REGLAS NO NEGOCIABLES:
- NUNCA des consejo de inversión específico ("compra X", "vende Y"). Tu rol es educativo.
- Usa siempre el disclaimer: "Esto es información educativa, no asesoramiento financiero."
- Habla en español de España, tono cercano pero técnico.
- Sé concreto: cita las posiciones reales del usuario.
- Identifica riesgos: concentración geográfica, sectorial, divisas.
- Compara con benchmarks (cartera global, 60/40).
- Sugiere áreas de mejora SIN prescribir acciones concretas.
- Máximo 400 palabras, formato Markdown con headings claros.`

interface AnalyzeInput {
  allocation: AllocationBreakdown
  fire?: FireProjection
  positions: Array<{ ticker: string; valueEUR: number; weight: number }>
}

export async function generateAiNarrative(input: AnalyzeInput): Promise<Result<string>> {
  if (!process.env.GROQ_API_KEY) {
    return { ok: false, error: new Error('Falta configuración del servidor (GROQ_API_KEY)') }
  }
  try {
    const payload = JSON.stringify(input, null, 2)
    const completion = await getGroqClient().chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Analiza esta cartera y dame insights:\n\n\`\`\`json\n${payload}\n\`\`\``,
        },
      ],
      temperature: 0.5,
      max_tokens: 1500,
    })

    const text = completion.choices[0]?.message?.content
    if (!text) return { ok: false, error: new Error('Empty AI response') }
    return { ok: true, value: text }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err : new Error('AI error') }
  }
}
