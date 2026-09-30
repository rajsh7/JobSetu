import type { Metadata } from 'next'
import { getTopExamsList, getPrivateExamsList } from '@/lib/data'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TopExams } from '@/components/home/TopExams'

export const metadata: Metadata = {
  title: 'Top Government Exams & Top Private Placement Exams in India 2026',
  description:
    'Explore Top Government Exams (UPSC, SSC, IBPS, Railway RRB, State PSC, Defence, Teaching) and Top Private Placement Exams (TCS NQT, eLitmus pH, AMCAT, CoCubes) with eligibility, exam pattern, and official links.',
}

export const revalidate = 3600

export default async function TopExamsPage() {
  const [govtExams, privateExams] = await Promise.all([
    getTopExamsList(),
    getPrivateExamsList(),
  ])

  return (
    <>
      <Header />
      <main className="py-10">
        <div className="container-main space-y-12">
          {/* Page Header */}
          <div className="rounded-2xl border-2 border-black bg-white p-6 sm:p-8">
            <span className="inline-block rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Complete Exam Directory
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-black sm:text-4xl">
              Top Government &amp; Private Exams in India
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-zinc-600 sm:text-base">
              Compare eligibility, exam frequency, selection patterns, and direct official websites
              for both Central/State Government Exams and Corporate Placement Tests.
            </p>
          </div>

          {/* Section 1: Top Government Exams */}
          <section id="govt-exams" className="scroll-mt-24">
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Central &amp; State Sector
              </span>
              <h2 className="mt-0.5 text-2xl font-extrabold text-black sm:text-3xl">
                Top Government Competitive Exams
              </h2>
            </div>
            <TopExams exams={govtExams} />
          </section>

          {/* Section 2: Top Private & Corporate Placement Exams */}
          <section id="private-exams" className="scroll-mt-24">
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                IT, Product &amp; Corporate Hiring
              </span>
              <h2 className="mt-0.5 text-2xl font-extrabold text-black sm:text-3xl">
                Top Private &amp; Corporate Placement Exams
              </h2>
            </div>
            <TopExams exams={privateExams} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
