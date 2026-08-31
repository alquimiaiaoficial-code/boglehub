/**
 * Modelo de Groq que usan el chat y el analizador.
 *
 * Vive aquí y no en cada fichero porque estaba duplicado en dos sitios
 * (`api/chat/route.ts` y `lib/ai.ts`) y ambos apuntaban a un modelo retirado.
 * Con una sola constante, actualizar uno actualiza los dos.
 *
 * ── Historia, para que no se repita ─────────────────────────────────────────
 * Hasta el 31-ago-2026 esto era `llama-3.3-70b-versatile`. Groq anunció su
 * retirada el 17-jun-2026 y la ejecutó el **16-ago-2026**; a partir de esa fecha
 * la API devuelve 404 `model_not_found`. El chat y la narrativa del analizador
 * estuvieron **quince días caídos en producción sin que nadie se enterara**,
 * porque nada vigilaba que la IA respondiera y los avisos de Groq llegaron al
 * correo del fundador entre otros muchos.
 *
 * Lección aplicada: además de centralizar el identificador, hay un test que
 * comprueba que no se ha vuelto a colar un modelo retirado. Si Groq anuncia otra
 * retirada, se añade a la lista de abajo y el test avisa.
 */

/** Modelo en uso. Reemplazo recomendado por Groq para llama-3.3-70b-versatile. */
export const GROQ_MODEL = 'openai/gpt-oss-120b'

/**
 * Modelos que Groq ya ha retirado. Si `GROQ_MODEL` acaba en esta lista, el test
 * de `groq-model.test.ts` falla en el build en vez de fallar en producción.
 */
export const MODELOS_RETIRADOS: readonly string[] = [
  'llama-3.3-70b-versatile', // retirado el 16-ago-2026
  'meta-llama/llama-4-maverick-17b-128e-instruct', // retirado en 2026
  'moonshotai/kimi-k2-instruct-0905', // retirado en 2026
]
