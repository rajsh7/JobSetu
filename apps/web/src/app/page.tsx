import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BreakingTicker } from '@/components/layout/BreakingTicker'
import { HeroSearch } from '@/components/home/HeroSearch'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { LatestUpdates } from '@/components/home/LatestUpdates'
import { TopExams } from '@/components/home/TopExams'
import { JobCardSkeleton } from '@/components/jobs/JobCardSkeleton'

export const revalidate = 120 // ISR: revalidate homepage every 2 minutes

async function getLatestJobs() {
  const res = await fetch(`${process.env.API_URL}/api/jobs/latest?limit=12`, {
    next: { revalidate: 120 },
  })
  if (!res.ok) return []
  return res.json()
}

async function getTopExams() {
  const res = await fetch(`${process.env.API_URL}/api/exams?featured=true&limit=8`, {
    next: { revalidate: 3600 }, // Exams change less often — 1 hour cache
  })
  if (!res.ok) return []
  return res.json()
}

export default async function HomePage() {
  const [latestJobs, topExams] = await Promise.all([
    getLatestJobs(),
    getTopExams(),
  ])

  return (
    <>
      <Header />

      {/* Breaking News Ticker */}
      <BreakingTicker jobs={latestJobs.slice(0, 5)} />

      <main>
        {/* Hero Section with Search */}
        <section className="bg-brand-blue py-10 text-white">
          <div className="container-main">
            <h1 className="mb-2 text-center text-3xl font-heading font-bold md:text-4xl">
              🌉 JobSetu — Your Bridge to a Better Career
            </h1>
            <p className="mb-6 text-center text-blue-200 text-sm md:text-base">
              Find Latest Sarkari Jobs, Results, Admit Cards & Private Jobs — All in One Place
            </p>
            <HeroSearch />
          </div>
        </section>

        {/* Category Quick Links */}
        <section className="py-8">
          <div className="container-main">
            <CategoryGrid />
          </div>
        </section>

        {/* Latest Updates */}
        <section className="pb-8">
          <div className="container-main">
            <h2 className="mb-4 text-xl font-heading font-bold text-slate-800 md:text-2xl">
              📋 Latest Updates
            </h2>
            <Suspense fallback={
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            }>
              <LatestUpdates jobs={latestJobs} />
            </Suspense>
          </div>
        </section>

        {/* Top Exams */}
        <section className="bg-white py-8">
          <div className="container-main">
            <h2 className="mb-4 text-xl font-heading font-bold text-slate-800 md:text-2xl">
              🏆 Top Exams
            </h2>
            <TopExams exams={topExams} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
