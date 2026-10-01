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

  return (
    <>
      <PortalJsonLd />
      <Header />
      <BreakingTicker jobs={govtJobs.slice(0, 10)} />

      {/* ── ONLY 1 MAIN SECTION — Clean 3-Column Layout with pl-[5px] and pr-[30px] ── */}
      <main className="min-h-[calc(100dvh-180px)] bg-white py-3 pl-[5px] pr-[30px] w-full">
        <GovtJobsSingleRowSection jobs={govtJobs} />
      </main>

      <Footer />
    </>
  )
}
