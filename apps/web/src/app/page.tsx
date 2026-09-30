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
import { getPortalItems, getTopExamsList } from '@/lib/data'

export const revalidate = 120 // ISR: revalidate homepage every 2 minutes

export default async function HomePage() {
  const [allItems, topExams] = await Promise.all([
    getPortalItems(undefined, 50),
    getTopExamsList(),
  ])

  const govtJobs = allItems.filter((item) => item.category === Category.GOVT_JOB)
  const results = allItems.filter((item) => item.category === Category.RESULT)
  const admitCards = allItems.filter((item) => item.category === Category.ADMIT_CARD)
  const privateJobs = allItems.filter((item) => item.category === Category.PRIVATE_JOB)

  return (
    <>
      <Header />

      {/* Live Trending Ticker */}
      <BreakingTicker jobs={allItems.slice(0, 6)} />

      <main>
        {/* Hero Section — Matched to JobSetu Logo & Jost Typography */}
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
              <span>India&apos;s Student-First Career Aggregator • No Login Required</span>
            </div>

            <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-black sm:text-5xl">
              Your Bridge to a{' '}
              <span className="underline decoration-black decoration-4 underline-offset-4">
                Brighter Career
              </span>
            </h1>

            <p className="mx-auto mt-3 mb-7 max-w-2xl text-sm font-medium text-zinc-600 sm:text-lg">
              Instant access to <strong>Sarkari Results</strong>, <strong>Sarkari Jobs</strong>,{' '}
              <strong>Admit Cards</strong>, <strong>Private Jobs</strong> &amp;{' '}
              <strong>Top Exams</strong> — with direct 1-click official portal redirects.
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
                Zero Login / Zero Spam
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ExternalLink size={14} className="text-black" />
                Verified Official Govt &amp; MNC Links
              </span>
            </div>
          </div>
        </section>

        {/* 5 Core Category Cards */}
        <section className="py-8">
          <div className="container-main">
            <CategoryGrid />
          </div>
        </section>

        {/* 3-Column Sarkari Result Board (Jobs | Results | Admit Cards) */}
        <section className="pb-10">
          <div className="container-main">
            <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-extrabold text-black sm:text-3xl">
                  Live Sarkari Board
                </h2>
                <p className="text-sm font-medium text-zinc-600">
                  Click any notification for full eligibility &amp; dates, or click the external icon
                  to jump straight to the official website.
                </p>
              </div>
            </div>

            <SarkariBoard
              govtJobs={govtJobs.slice(0, 5)}
              results={results.slice(0, 5)}
              admitCards={admitCards.slice(0, 5)}
            />
          </div>
        </section>

        {/* Private & MNC Jobs Section */}
        <section className="border-t border-zinc-200 bg-white py-10">
          <div className="container-main">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Corporate &amp; Off-Campus Drives
                </span>
                <h2 className="mt-0.5 text-2xl font-extrabold text-black sm:text-3xl">
                  Private &amp; MNC Jobs for Freshers
                </h2>
              </div>
              <Link
                href="/private-jobs"
                className="btn-outline text-xs sm:text-sm py-2 px-3.5"
              >
                <span>All Private Jobs</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <LatestUpdates jobs={privateJobs.slice(0, 4)} />
          </div>
        </section>

        {/* Top Competitive Exams Section */}
        <section className="border-t border-zinc-200 py-10">
          <div className="container-main">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Explore Career Pathways
                </span>
                <h2 className="mt-0.5 text-2xl font-extrabold text-black sm:text-3xl">
                  Top Exams in India
                </h2>
              </div>
              <Link
                href="/top-exams"
                className="btn-outline text-xs sm:text-sm py-2 px-3.5"
              >
                <span>View All Exams</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <TopExams exams={topExams} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
