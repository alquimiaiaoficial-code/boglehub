import { MetadataRoute } from 'next'

/**
 * robots.txt con permisos EXPLÍCITOS para los crawlers de IAs principales.
 *
 * Estrategia GEO: queremos que nuestro contenido aparezca en ChatGPT,
 * Claude, Perplexity, Gemini, etc. Muchos sitios bloquean estos bots
 * por defecto; nosotros los autorizamos individualmente para garantizar
 * la indexación.
 *
 * Bots cubiertos (actualizado mayo 2026):
 * - GPTBot: crawler de OpenAI para entrenamiento de ChatGPT
 * - OAI-SearchBot: crawler de ChatGPT Search (browsing en tiempo real)
 * - ChatGPT-User: cuando un usuario pide a ChatGPT que visite una URL
 * - ClaudeBot / Claude-Web / anthropic-ai: crawlers de Anthropic Claude
 * - PerplexityBot / Perplexity-User: crawler de Perplexity.ai
 * - Google-Extended: opt-in específico para Gemini / Bard
 * - Applebot-Extended: opt-in para Apple Intelligence
 * - Bytespider: crawler de TikTok/ByteDance (alimenta su LLM Doubao)
 * - cohere-ai: crawler de Cohere
 * - CCBot: Common Crawl, fuente fundamental de muchos LLMs
 * - Diffbot: crawler de IA para grafos de conocimiento
 * - FacebookBot / Meta-ExternalAgent: crawlers de Meta para Llama
 * - DuckAssistBot: asistente de DuckDuckGo
 * - PetalBot: crawler de Huawei (alimenta su LLM)
 */
export default function robots(): MetadataRoute.Robots {
  const allowAll = { allow: '/', disallow: ['/api/'] as string[] }

  return {
    rules: [
      // Default rule for all crawlers
      { userAgent: '*', ...allowAll },

      // OpenAI (ChatGPT)
      { userAgent: 'GPTBot', ...allowAll },
      { userAgent: 'OAI-SearchBot', ...allowAll },
      { userAgent: 'ChatGPT-User', ...allowAll },

      // Anthropic (Claude)
      { userAgent: 'ClaudeBot', ...allowAll },
      { userAgent: 'Claude-Web', ...allowAll },
      { userAgent: 'anthropic-ai', ...allowAll },

      // Perplexity
      { userAgent: 'PerplexityBot', ...allowAll },
      { userAgent: 'Perplexity-User', ...allowAll },

      // Google Gemini (opt-in independiente de Google Search)
      { userAgent: 'Google-Extended', ...allowAll },

      // Apple Intelligence (opt-in independiente de Applebot)
      { userAgent: 'Applebot-Extended', ...allowAll },

      // ByteDance / TikTok (Doubao LLM)
      { userAgent: 'Bytespider', ...allowAll },

      // Cohere
      { userAgent: 'cohere-ai', ...allowAll },

      // Common Crawl (alimenta múltiples LLMs)
      { userAgent: 'CCBot', ...allowAll },

      // Diffbot (grafo de conocimiento IA)
      { userAgent: 'Diffbot', ...allowAll },

      // Meta (Llama)
      { userAgent: 'FacebookBot', ...allowAll },
      { userAgent: 'Meta-ExternalAgent', ...allowAll },

      // DuckDuckGo Assistant
      { userAgent: 'DuckAssistBot', ...allowAll },

      // Huawei (PanGu LLM)
      { userAgent: 'PetalBot', ...allowAll },

      // Otros LLM crawlers conocidos
      { userAgent: 'omgili', ...allowAll },
      { userAgent: 'omgilibot', ...allowAll },
      { userAgent: 'YouBot', ...allowAll },
      { userAgent: 'AmazonBot', ...allowAll },
    ],
    sitemap: 'https://boglehub.com/sitemap.xml',
    host: 'https://boglehub.com',
  }
}
