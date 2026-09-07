import Groq from 'groq-sdk'
import { AllocationBreakdown, Result } from '@/types/analysis'


import { GROQ_MODEL } from './groq-model'
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
- NUNCA propongas rebalancear ni cambiar pesos. Puedes DESCRIBIR el dato ("tu cartera
  tiene un 63 % en EE. UU., frente al 50 % de una cartera global") y explicar qué riesgo
  implica, pero NO prescribir el ajuste ("deberías bajarlo al 50 %", "convendría reducir
  EE. UU."). Describir una diferencia es información; proponer el ajuste es una
  recomendación, y eso no lo haces nunca.
- NUNCA propongas una cartera concreta, ni por pesos ni por productos.
- Máximo 400 palabras, formato Markdown con headings claros.`

/**
 * Lo que sale hacia el proveedor de IA. Deliberadamente MÁS ESTRECHO que lo que recibe
 * el endpoint.
 *
 * Hasta el 8-sep-2026 aquí entraba la `FireProjection` completa, y como `projectFire`
 * devuelve `{ ...input, yearsToFire }` —no resume la entrada, la devuelve entera— a Groq
 * viajaban la **aportación mensual** y el **objetivo de patrimonio** del usuario. Eso son
 * circunstancias personales (capacidad de ahorro y horizonte), y `CUMPLIMIENTO-LEGAL.md`
 * §1 se defendía precisamente diciendo que la herramienta no las conocía.
 *
 * El modelo no las necesita para comentar una cartera: le basta el resultado derivado.
 * La proyección se sigue calculando en el servidor y se sigue mostrando entera al usuario.
 *
 * ⚠️ Si alguien vuelve a ensanchar este tipo, hay que revisar §1 y los textos de privacidad
 * el mismo día. Hay tests que lo vigilan (`ai-payload.test.ts`).
 */
interface AnalyzeInput {
  allocation: AllocationBreakdown
  /** Solo el resultado derivado. NUNCA la aportación mensual ni el objetivo. */
  fire?: { yearsToFire: number }
  positions: Array<{ ticker: string; valueEUR: number; weight: number }>
}

export async function generateAiNarrative(input: AnalyzeInput): Promise<Result<string>> {
  if (!process.env.GROQ_API_KEY) {
    return { ok: false, error: new Error('Falta configuración del servidor (GROQ_API_KEY)') }
  }
  try {
    const payload = JSON.stringify(input, null, 2)
    const completion = await getGroqClient().chat.completions.create({
      model: GROQ_MODEL,
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
