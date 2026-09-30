import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ShieldCheck, Zap, ExternalLink } from 'lucide-react'
import { Category } from '@jobsetu/types'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BreakingTicker } from '@/components/layout/BreakingTicker'
import { HeroSearch } from '@/components/home/HeroSearch'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { SarkariBoard } from '@/components/home/SarkariBoard'
import { LatestUpdates } from '@/components/home/LatestUpdates'
import { TopExams } from '@/components/home/TopExams'
import { PortalJsonLd } from '@/components/seo/PortalJsonLd'
import { getPortalItems, getTopExamsList, getPrivateExamsList } from '@/lib/data'

export const revalidate = 120 // ISR: revalidate homepage every 2 minutes

export default async function HomePage() {
  const [allItems, topGovtExams, topPrivateExams] = await Promise.all([
    getPortalItems(undefined, 50),
    getTopExamsList(),
    getPrivateExamsList(),
  ])

  const govtJobs = allItems.filter((item) => item.category === Category.GOVT_JOB)
  const results = allItems.filter((item) => item.category === Category.RESULT)
  const admitCards = allItems.filter((item) => item.category === Category.ADMIT_CARD)
  const privateJobs = allItems.filter((item) => item.category === Category.PRIVATE_JOB)

  return (
    <>
      <PortalJsonLd />
      <Header />

      {/* Live Trending Ticker */}
      <BreakingTicker jobs={allItems.slice(0, 6)} />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-200 bg-white py-10 sm:py-14">
          <div className="container-main relative z-10 text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3.5 py-1 text-xs font-semibold text-zinc-800">
              <Image
                src="/favicon.png"
                alt="JobSetu Icon"
                width={18}
                height={18}
                className="rounded-xs object-contain"
              />
              <span>jobsetu.dpdns.org • Student Career Portal • Zero Login Required</span>
            </div>

            <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-black sm:text-5xl">
              Your Bridge to a{' '}
              <span className="underline decoration-black decoration-4 underline-offset-4">
                Brighter Career
              </span>
            </h1>

            <p className="mx-auto mt-3 mb-7 max-w-2xl text-sm font-medium text-zinc-600 sm:text-lg">
              Category-wise <strong>Top Govt Jobs</strong>, <strong>Top Govt Exams</strong>,{' '}
              <strong>Private MNC Jobs</strong>, <strong>Private Placement Exams</strong>,{' '}
              <strong>Sarkari Results</strong> &amp; <strong>Admit Cards</strong> — with direct
              official links.
            </p>

            <HeroSearch />

            {/* Trust Highlights */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-zinc-600">
              <span className="inline-flex items-center gap-1.5">
                <Zap size={14} className="text-black" />
                Fastest Official Notifications
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-black" />
                No Login / No Signup
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ExternalLink size={14} className="text-black" />
                Direct Official Govt &amp; MNC Redirects
              </span>
            </div>
          </div>
        </section>

        {/* 6 Category Quick Navigation Cards */}
        <section className="py-8">
          <div className="container-main">
            <CategoryGrid />
          </div>
        </section>

        {/* Category 1: Top Govt Jobs, Sarkari Results & Admit Cards Board */}
        <section id="govt-jobs" className="pb-12 scroll-mt-20">
          <div className="container-main">
            <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Category 01 • Central &amp; State Sarkari Portal
                </span>
                <h2 className="mt-0.5 text-2xl font-extrabold text-black sm:text-3xl">
                  Top Government Jobs, Sarkari Results &amp; Admit Cards
                </h2>
              </div>
              <Link
                href="/latest-jobs"
                className="btn-outline text-xs sm:text-sm py-2 px-3.5 self-start sm:self-auto"
              >
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

        {/* Category 2: Top Government Exams (Category-Wise) */}
        <section id="govt-exams" className="border-t border-zinc-200 bg-white py-12 scroll-mt-20">
          <div className="container-main">
            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Category 02 • UPSC • SSC • Banking • Railways • Defence • State PSC
                </span>
                <h2 className="mt-0.5 text-2xl font-extrabold text-black sm:text-3xl">
                  Top Government Exams in India (Category-Wise)
                </h2>
              </div>
              <Link
                href="/top-exams#govt-exams"
                className="btn-outline text-xs sm:text-sm py-2 px-3.5 self-start sm:self-auto"
              >
                <span>Explore All Govt Exams</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <TopExams exams={topGovtExams} />
          </div>
        </section>

        {/* Category 3: Top Private & MNC Jobs */}
        <section id="private-jobs" className="border-t border-zinc-200 py-12 scroll-mt-20">
          <div className="container-main">
            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-violet-700">
                  Category 03 • IT, Software, Banking &amp; Corporate Hiring
                </span>
                <h2 className="mt-0.5 text-2xl font-extrabold text-black sm:text-3xl">
                  Top Private &amp; MNC Jobs for Freshers
                </h2>
              </div>
              <Link
                href="/private-jobs"
                className="btn-outline text-xs sm:text-sm py-2 px-3.5 self-start sm:self-auto"
              >
                <span>All Private Jobs</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <LatestUpdates jobs={privateJobs.slice(0, 4)} />
          </div>
        </section>

        {/* Category 4: Top Private & Corporate Placement Exams */}
        <section id="private-exams" className="border-t border-zinc-200 bg-white py-12 scroll-mt-20">
          <div className="container-main">
            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Category 04 • National Qualifier &amp; Employability Tests
                </span>
                <h2 className="mt-0.5 text-2xl font-extrabold text-black sm:text-3xl">
                  Top Private &amp; Corporate Placement Exams
                </h2>
                <p className="mt-1 text-sm font-medium text-zinc-600">
                  Score once in these national private placement exams and get interviewed directly by
                  1,500+ IT &amp; corporate companies.
                </p>
              </div>
              <Link
                href="/top-exams#private-exams"
                className="btn-outline text-xs sm:text-sm py-2 px-3.5 self-start sm:self-auto"
              >
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
