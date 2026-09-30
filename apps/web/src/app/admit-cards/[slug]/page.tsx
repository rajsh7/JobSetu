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
  if (!item) return { title: 'Admit Card Not Found' }

  return {
    title: item.title,
    description: item.shortInfo ?? `Download ${item.title} from ${item.organization} official portal via JobSetu.`,
  }
}

export default async function AdmitCardDetailPage({ params }: PageProps) {
  const { slug } = await params
  const item = await getPortalItemBySlug(slug)
  if (!item) notFound()

  return (
    <PortalDetailView
      item={item}
      backHref="/admit-cards"
      backLabel="Admit Cards"
    />
  )
}
