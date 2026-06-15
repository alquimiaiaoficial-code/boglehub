import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { getAllEtfs } from '@/lib/etf-database'
import { GLOSSARY_TERMS } from '@/data/glossary'
import { BLOG_ARTICLES } from '@/data/blog-articles'

/**
 * Guarda contra el bug recurrente "48 términos cuando ya hay 72": los archivos
 * estáticos public/.well-known/openapi.json y ai-plugin.json llevan conteos
 * hardcodeados en sus descripciones (los leen LLMs/agentes directo). Cada vez
 * que SEO o GEO amplía glosario / blog / catálogo, esos números se desfasan.
 * Este test afirma que los conteos escritos == longitudes reales de los datos.
 * (llms.txt ya es dinámico y tiene su propio test.)
 */
const root = process.cwd()
const openapi = readFileSync(resolve(root, 'public/.well-known/openapi.json'), 'utf8')
const aiPlugin = readFileSync(resolve(root, 'public/.well-known/ai-plugin.json'), 'utf8')

const nEtfs = getAllEtfs().length
const nGlossary = GLOSSARY_TERMS.length
const nArticles = BLOG_ARTICLES.length

/** Extrae el primer número que precede a `re` o falla con un mensaje claro. */
function countIn(text: string, re: RegExp): number {
  const m = text.match(re)
  if (!m) throw new Error(`No se encontró el patrón ${re} en el archivo .well-known`)
  return Number(m[1])
}

describe('.well-known sincronizado con los datos reales', () => {
  it('openapi.json: los conteos coinciden con las longitudes de datos', () => {
    expect(countIn(openapi, /(\d+) ETFs UCITS/)).toBe(nEtfs)
    expect(countIn(openapi, /(\d+) términos del glosario/)).toBe(nGlossary)
    expect(countIn(openapi, /(\d+) artículos del blog/)).toBe(nArticles)
  })

  it('ai-plugin.json: los conteos coinciden con las longitudes de datos', () => {
    expect(countIn(aiPlugin, /(\d+) ETFs UCITS/)).toBe(nEtfs)
    expect(countIn(aiPlugin, /(\d+) términos financieros/)).toBe(nGlossary)
    expect(countIn(aiPlugin, /(\d+) artículos de blog/)).toBe(nArticles)
  })

  it('no reaparece el viejo "48 términos" en los archivos públicos', () => {
    expect(openapi).not.toContain('48 términos')
    expect(aiPlugin).not.toContain('48 términos')
  })
})
