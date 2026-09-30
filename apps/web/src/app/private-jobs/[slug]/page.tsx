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
  if (!item) return { title: 'Job Not Found' }

  return {
    title: item.title,
    description: item.shortInfo ?? `Apply online for ${item.title} at ${item.organization} via JobSetu.`,
  }
}

export default async function PrivateJobDetailPage({ params }: PageProps) {
  const { slug } = await params
  const item = await getPortalItemBySlug(slug)
  if (!item) notFound()

  return (
    <PortalDetailView
      item={item}
      backHref="/private-jobs"
      backLabel="Private & MNC Jobs"
    />
  )
}
