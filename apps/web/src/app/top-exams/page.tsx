import type { Metadata } from 'next'
import { getTopExamsList } from '@/lib/data'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TopExams } from '@/components/home/TopExams'

export const metadata: Metadata = {
  title: 'Top Competitive Exams in India — UPSC, SSC, IBPS, Railway, State PSC',
  description:
    'Explore top government & competitive exams in India (UPSC CSE, SSC CGL/CHSL/MTS, IBPS/SBI Banking, Railway RRB, State PSC, Defence, Teaching & Police) with eligibility, exam pattern, and official portal links.',
}

export const revalidate = 3600

export default async function TopExamsPage() {
  const exams = await getTopExamsList()

  return (
    <>
      <Header />
      <main className="py-10">
        <div className="container-main">
          <div className="mb-8 rounded-2xl border-2 border-black bg-white p-6 sm:p-8">
            <span className="inline-block rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Career Pathways
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-black sm:text-4xl">
              Top Competitive Exams in India
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-zinc-600 sm:text-base">
              Understand eligibility, selection stages, annual schedules, and official websites for
              India&apos;s biggest government exams.
            </p>
          </div>

          <TopExams exams={exams} />
        </div>
      </main>
      <Footer />
    </>
  )
}
