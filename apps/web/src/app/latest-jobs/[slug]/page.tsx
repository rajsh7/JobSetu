import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPortalItemBySlug } from '@/lib/data'
import { PortalDetailView } from '@/components/jobs/PortalDetailView'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getPortalItemBySlug(slug)
  if (!item) return { title: 'Notification Not Found' }

  return {
    title: item.title,
    description: item.shortInfo ?? `${item.title} by ${item.organization}. Check eligibility, important dates, and official apply link on JobSetu.`,
  }
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params
  const item = await getPortalItemBySlug(slug)
  if (!item) notFound()

  return (
    <PortalDetailView
      item={item}
      backHref="/latest-jobs"
      backLabel="Latest Sarkari Jobs"
    />
  )
}
