import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Category } from '@jobsetu/types'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BreakingTicker } from '@/components/layout/BreakingTicker'
import { NewVacanciesHero } from '@/components/home/NewVacanciesHero'
import { SarkariBoard } from '@/components/home/SarkariBoard'
import { LatestUpdates } from '@/components/home/LatestUpdates'
import { TopExams } from '@/components/home/TopExams'
import { PortalJsonLd } from '@/components/seo/PortalJsonLd'
import { getPortalItems, getTopExamsList, getPrivateExamsList } from '@/lib/data'

export const revalidate = 120

export default async function HomePage() {
  const [allItems, topGovtExams, topPrivateExams] = await Promise.all([
    getPortalItems(undefined, 50),
    getTopExamsList(),
    getPrivateExamsList(),
  ])

  const govtJobs    = allItems.filter((i) => i.category === Category.GOVT_JOB)
  const results     = allItems.filter((i) => i.category === Category.RESULT)
  const admitCards  = allItems.filter((i) => i.category === Category.ADMIT_CARD)
  const privateJobs = allItems.filter((i) => i.category === Category.PRIVATE_JOB)

  return (
    <>
      <PortalJsonLd />
      <Header />
      <BreakingTicker jobs={allItems.slice(0, 8)} />

      <main>

        {/* ── SECTION 1: New Vacancy (Active Recruitments 2026) ───────────── */}
        <section className="flex min-h-[calc(100dvh-112px)] flex-col justify-center border-b border-[#d1dfe0] bg-white px-4 py-8 sm:px-6">
          <NewVacanciesHero vacancies={govtJobs} />
        </section>

        {/* ── SECTION 2: Top Govt Jobs, Results & Admit Cards ─────────────── */}
        <section
          id="govt-jobs"
          className="flex min-h-dvh flex-col justify-center border-b border-[#d1dfe0] bg-[#f4f8f8] px-4 py-12 scroll-mt-20 sm:px-6"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#88BDBC]">
                  Category 01 · Central &amp; State Sarkari Portal
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-[#112D32] sm:text-3xl">
                  Top Government Jobs, Results &amp; Admit Cards
                </h2>
              </div>
              <Link href="/latest-jobs" className="btn-outline self-start py-2 px-4 text-xs sm:self-auto sm:text-sm">
                <span>All Govt Jobs</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
            <SarkariBoard
              govtJobs={govtJobs.slice(0, 5)}
              results={results.slice(0, 5)}
              admitCards={admitCards.slice(0, 5)}
            />
          </div>
        </section>

        {/* ── SECTION 3: Top Government Exams ─────────────────────────────── */}
        <section
          id="govt-exams"
          className="flex min-h-dvh flex-col justify-center border-b border-[#d1dfe0] bg-white px-4 py-12 scroll-mt-20 sm:px-6"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#88BDBC]">
                  Category 02 · UPSC · SSC · Banking · Railways · Defence · State PSC
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-[#112D32] sm:text-3xl">
                  Top Government Exams in India (Category-Wise)
                </h2>
              </div>
              <Link href="/top-exams#govt-exams" className="btn-outline self-start py-2 px-4 text-xs sm:self-auto sm:text-sm">
                <span>All Govt Exams</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
            <TopExams exams={topGovtExams} />
          </div>
        </section>

        {/* ── SECTION 4: Top Private & MNC Jobs ───────────────────────────── */}
        <section
          id="private-jobs"
          className="flex min-h-dvh flex-col justify-center border-b border-[#d1dfe0] bg-[#f4f8f8] px-4 py-12 scroll-mt-20 sm:px-6"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#6E6658]">
                  Category 03 · IT, Software, Banking &amp; Corporate Hiring
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-[#112D32] sm:text-3xl">
                  Top Private &amp; MNC Jobs for Freshers
                </h2>
              </div>
              <Link href="/private-jobs" className="btn-outline self-start py-2 px-4 text-xs sm:self-auto sm:text-sm">
                <span>All Private Jobs</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
            <LatestUpdates jobs={privateJobs.slice(0, 4)} />
          </div>
        </section>

        {/* ── SECTION 5: Top Private & Corporate Placement Exams ───────────── */}
        <section
          id="private-exams"
          className="flex min-h-dvh flex-col justify-center bg-white px-4 py-12 scroll-mt-20 sm:px-6"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#6E6658]">
                  Category 04 · National Qualifier &amp; Employability Tests
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-[#112D32] sm:text-3xl">
                  Top Private &amp; Corporate Placement Exams
                </h2>
                <p className="mt-1 text-sm font-medium text-[#6E6658]">
                  Score once and get interviewed by 1,500+ IT &amp; corporate companies directly.
                </p>
              </div>
              <Link href="/top-exams#private-exams" className="btn-outline self-start py-2 px-4 text-xs sm:self-auto sm:text-sm">
                <span>All Private Exams</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
            <TopExams exams={topPrivateExams} />
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
