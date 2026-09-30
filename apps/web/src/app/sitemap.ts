import type { MetadataRoute } from 'next'
import { Category } from '@jobsetu/types'
import { getPortalItems, getTopExamsList } from '@/lib/data'

const BASE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://jobsetu.dpdns.org'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allItems, exams] = await Promise.all([
    getPortalItems(undefined, 100),
    getTopExamsList(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
    { url: `${BASE_URL}/latest-jobs`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/results`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/admit-cards`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/private-jobs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/top-exams`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]

  const itemRoutes: MetadataRoute.Sitemap = allItems.map((item) => {
    let section = 'latest-jobs'
    if (item.category === Category.RESULT) section = 'results'
    else if (item.category === Category.ADMIT_CARD) section = 'admit-cards'
    else if (item.category === Category.PRIVATE_JOB) section = 'private-jobs'

    return {
      url: `${BASE_URL}/${section}/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'daily',
      priority: 0.8,
    }
  })

  const examRoutes: MetadataRoute.Sitemap = exams.map((exam) => ({
    url: `${BASE_URL}/top-exams/${exam.slug}`,
    lastModified: new Date(exam.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [...staticRoutes, ...itemRoutes, ...examRoutes]
}
