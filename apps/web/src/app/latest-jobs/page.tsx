import type { Metadata } from 'next'
import { Category } from '@jobsetu/types'
import { getPortalItems } from '@/lib/data'
import { PortalListView } from '@/components/jobs/PortalListView'

export const metadata: Metadata = {
  title: 'Latest Sarkari Jobs 2026 — Central & State Govt Job Notifications',
  description:
    'Browse all latest Central and State Government Job Notifications (Sarkari Naukri 2026) with eligibility, vacancy counts, important dates, and direct official apply links.',
}

export const revalidate = 120

export default async function LatestJobsPage() {
  const items = await getPortalItems(Category.GOVT_JOB, 50)

  return (
    <PortalListView
      title="Latest Sarkari Jobs 2026"
      subtitle="All active Central & State Government recruitment notifications with eligibility, important dates, and direct official apply links."
      badgeText="Sarkari Naukri"
      items={items}
      basePath="/latest-jobs"
    />
  )
}
