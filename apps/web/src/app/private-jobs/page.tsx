import type { Metadata } from 'next'
import { Category } from '@jobsetu/types'
import { getPortalItems } from '@/lib/data'
import { PortalListView } from '@/components/jobs/PortalListView'

export const metadata: Metadata = {
  title: 'Private & MNC Jobs 2026 — Off-Campus Drives for Freshers & Graduates',
  description:
    'Find verified Private Sector & MNC Off-Campus Hiring Drives (TCS, Infosys, Accenture, HDFC Bank & more) with direct company career portal links.',
}

export const revalidate = 120

export default async function PrivateJobsPage() {
  const items = await getPortalItems(Category.PRIVATE_JOB, 50)

  return (
    <PortalListView
      title="Private & MNC Jobs 2026"
      subtitle="Verified Off-Campus Drives, IT & Banking Fresher Hiring, and Corporate Careers with 100% free direct official company application links."
      badgeText="Private Sector"
      items={items}
      basePath="/private-jobs"
    />
  )
}
