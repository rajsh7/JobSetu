import type { Metadata } from 'next'
import { Category } from '@jobsetu/types'
import { getPortalItems } from '@/lib/data'
import { PortalListView } from '@/components/jobs/PortalListView'

export const metadata: Metadata = {
  title: 'Sarkari Results 2026 — Latest Govt Exam Results, Merit Lists & Cutoffs',
  description:
    'Check all latest Sarkari Exam Results 2026, Merit List PDFs, and Category-wise Cutoff Marks with direct links to official result portals.',
}

export const revalidate = 120

export default async function ResultsPage() {
  const items = await getPortalItems(Category.RESULT, 50)

  return (
    <PortalListView
      title="Sarkari Exam Results 2026"
      subtitle="Latest Government Exam Results, Roll-Number Wise Merit Lists, Score Cards, and Cutoff Marks with direct official download links."
      badgeText="Exam Results"
      items={items}
      basePath="/results"
    />
  )
}
