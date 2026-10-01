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
  const admitCards = allItems.filter((i) => i.category === Category.ADMIT_CARD)
  const answerKeys = allItems.filter((i) => i.category === Category.ANSWER_KEY)
  const syllabuses = allItems.filter((i) => i.category === Category.SYLLABUS)
  const admissions = allItems.filter((i) => i.category === Category.ADMISSION)
  const documents = allItems.filter((i) => i.category === Category.DOCUMENT)

  return (
    <>
      <PortalJsonLd />
      <Header />
      <BreakingTicker jobs={govtJobs.slice(0, 10)} />

      {/* ── ONLY 1 MAIN SECTION — Natural height without internal scrollbars ── */}
      <main className="min-h-[calc(100dvh-180px)] bg-white pt-5 pb-14 px-2 sm:px-3 lg:px-4 xl:px-5 w-full flex justify-center">
        <GovtJobsSingleRowSection
          jobs={govtJobs}
          results={results}
          admitCards={admitCards}
          answerKeys={answerKeys}
          syllabuses={syllabuses}
          admissions={admissions}
          documents={documents}
        />
      </main>

      <Footer />
    </>
  )
}
