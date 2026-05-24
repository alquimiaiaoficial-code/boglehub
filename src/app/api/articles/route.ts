import { BLOG_ARTICLES } from '@/data/blog-articles'
import {
  BLOG_CATEGORIES,
  getArticleCategory,
} from '@/data/blog-categories'

export const dynamic = 'force-static'
export const revalidate = false

const BASE_URL = 'https://boglehub.com'

/**
 * API pública: artículos del blog en JSON-LD.
 * Formato: ItemList de Article objects.
 */
export async function GET() {
  const sorted = [...BLOG_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${BASE_URL}/api/articles`,
    name: 'Artículos del blog de BogleHub sobre inversión indexada',
    description: `${sorted.length} artículos educativos sobre inversión indexada, ETFs UCITS, fiscalidad española, planes de pensiones, FIRE y carteras Boglehead.`,
    url: `${BASE_URL}/blog`,
    inLanguage: 'es-ES',
    numberOfItems: sorted.length,
    dateModified: new Date().toISOString().split('T')[0],
    license: 'Información educativa, uso libre con atribución a boglehub.com',
    publisher: {
      '@type': 'Organization',
      name: 'BogleHub',
      url: BASE_URL,
    },
    itemListElement: sorted.map((article, index) => {
      const categorySlug = getArticleCategory(article.slug)
      const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug)

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          '@id': `${BASE_URL}/blog/${article.slug}`,
          headline: article.title,
          description: article.excerpt,
          url: `${BASE_URL}/blog/${article.slug}`,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt ?? article.publishedAt,
          articleSection: category?.label ?? 'Blog',
          inLanguage: 'es-ES',
          keywords: article.keywords?.join(', '),
          author: {
            '@type': 'Organization',
            name: 'BogleHub',
            url: BASE_URL,
          },
          publisher: {
            '@type': 'Organization',
            name: 'BogleHub',
            url: BASE_URL,
          },
          isAccessibleForFree: true,
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'readingMinutes',
              value: article.readingMinutes,
            },
            {
              '@type': 'PropertyValue',
              name: 'category',
              value: categorySlug,
            },
            ...(article.faq && article.faq.length > 0
              ? [
                  {
                    '@type': 'PropertyValue',
                    name: 'faqCount',
                    value: article.faq.length,
                  },
                ]
              : []),
          ],
        },
      }
    }),
  }

  return Response.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
