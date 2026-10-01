import type { MetadataRoute } from 'next'
import { Category } from '@jobsetu/types'
import { getPortalItems, getTopExamsList } from '@/lib/data'

const BASE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://jobsetu.dpdns.org'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allItems, exams] = await Promise.all([
    getPortalItems(undefined, 200),
    getTopExamsList(),
  ])

  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`,             lastModified: now, changeFrequency: 'hourly',  priority: 1.0 },
    { url: `${BASE_URL}/latest-jobs`, lastModified: now, changeFrequency: 'hourly',  priority: 0.95 },
    { url: `${BASE_URL}/results`,     lastModified: now, changeFrequency: 'hourly',  priority: 0.92 },
    { url: `${BASE_URL}/admit-cards`, lastModified: now, changeFrequency: 'hourly',  priority: 0.92 },
    { url: `${BASE_URL}/private-jobs`,lastModified: now, changeFrequency: 'daily',   priority: 0.88 },
    { url: `${BASE_URL}/top-exams`,   lastModified: now, changeFrequency: 'daily',   priority: 0.88 },
    { url: `${BASE_URL}/search`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.70 },
  ]

  const itemRoutes: MetadataRoute.Sitemap = allItems.map((item) => {
    let section = 'latest-jobs'
    if (item.category === Category.RESULT)      section = 'results'
    else if (item.category === Category.ADMIT_CARD)  section = 'admit-cards'
    else if (item.category === Category.PRIVATE_JOB) section = 'private-jobs'

    return {
      url: `${BASE_URL}/${section}/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'daily',
      priority: 0.80,
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
