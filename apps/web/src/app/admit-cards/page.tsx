import type { Metadata } from 'next'
import { Category } from '@jobsetu/types'
import { getPortalItems } from '@/lib/data'
import { PortalListView } from '@/components/jobs/PortalListView'

export const metadata: Metadata = {
  title: 'Admit Cards 2026 — Download Hall Tickets & Exam City Intimation Slips',
  description:
    'Download all latest Government Exam Admit Cards, Hall Tickets, and Exam City Intimation Slips with direct official portal links on JobSetu.',
}

export const revalidate = 120

export default async function AdmitCardsPage() {
  const items = await getPortalItems(Category.ADMIT_CARD, 50)

  return (
    <PortalListView
      title="Admit Cards & Hall Tickets 2026"
      subtitle="Download official Exam Admit Cards, e-Call Letters, Application Status, and Exam City Intimation Slips directly from official portals."
      badgeText="Hall Tickets"
      items={items}
      basePath="/admit-cards"
    />
  )
}
