import { Category } from '@jobsetu/types'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BreakingTicker } from '@/components/layout/BreakingTicker'
import { GovtJobsSingleRowSection } from '@/components/home/GovtJobsSingleRowSection'
import { PortalJsonLd } from '@/components/seo/PortalJsonLd'
import { getPortalItems } from '@/lib/data'

export const revalidate = 120

export default async function HomePage() {
  const allItems = await getPortalItems(undefined, 2000)
  const govtJobs = allItems.filter((i) => i.category === Category.GOVT_JOB)
  const results = allItems.filter((i) => i.category === Category.RESULT)

  return (
    <>
      <PortalJsonLd />
      <Header />
      <BreakingTicker jobs={govtJobs.slice(0, 10)} />

      {/* ── ONLY 1 MAIN SECTION — Centered Layout with clearance from navbar ── */}
      <main className="min-h-[calc(100dvh-180px)] bg-white pt-5 pb-14 px-3 sm:px-4 lg:px-6 w-full flex justify-center">
        <GovtJobsSingleRowSection jobs={govtJobs} results={results} />
      </main>

      <Footer />
    </>
  )
}
