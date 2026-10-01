'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ExternalLink,
  ArrowUpRight,
  Building2,
  GraduationCap,
  Briefcase,
  BookOpen,
  Shield,
  Award,
  Landmark,
  Train,
  BadgeAlert,
  Compass,
  Clock,
  Wrench,
  Stethoscope,
  Calendar,
} from 'lucide-react'
import { type DetailedPortalItem } from '@/lib/data'

interface ExamItem {
  id: string
  name: string
  slug: string
  conductedBy?: string
  frequency?: string
  eligibility?: string
  nextExamWindow?: string
}

interface Props {
  jobs: DetailedPortalItem[]
  results?: DetailedPortalItem[]
  exams?: ExamItem[]
}

interface SpecificationOption {
  id: string
  label: string
  icon: typeof Briefcase
  keyword?: string
}

const SPECIFICATIONS: SpecificationOption[] = [
  { id: 'all',         label: 'All Govt Jobs',         icon: Briefcase },
  { id: 'Teaching',    label: 'Teaching',              icon: BookOpen,    keyword: 'teach' },
  { id: 'Defence',     label: 'Defence',               icon: Shield,      keyword: 'defen' },
  { id: 'UPSC',        label: 'UPSC',                  icon: Award,       keyword: 'upsc' },
  { id: 'SSC',         label: 'SSC',                   icon: Landmark,    keyword: 'ssc' },
  { id: 'Railway',     label: 'Railway',               icon: Train,       keyword: 'rail' },
  { id: 'Police',      label: 'Police & Paramilitary', icon: BadgeAlert,  keyword: 'police' },
  { id: 'Banking',     label: 'Banking & Finance',     icon: Landmark,    keyword: 'bank' },
  { id: 'State PSC',   label: 'State PSC',             icon: Compass,     keyword: 'psc' },
  { id: 'Engineering', label: 'Engineering & PSU',     icon: Wrench,      keyword: 'engineer' },
  { id: 'Medical',     label: 'Medical & Nursing',     icon: Stethoscope, keyword: 'medic' },
]

const SPEC_STYLES: Record<string, { bg: string; text: string }> = {
  Teaching:    { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  Defence:     { bg: 'bg-amber-50',   text: 'text-amber-800' },
  UPSC:        { bg: 'bg-indigo-50',  text: 'text-indigo-700' },
  SSC:         { bg: 'bg-sky-50',     text: 'text-[#0284c7]' },
  Railway:     { bg: 'bg-teal-50',    text: 'text-teal-700' },
  Police:      { bg: 'bg-rose-50',    text: 'text-rose-700' },
  Banking:     { bg: 'bg-blue-50',    text: 'text-blue-700' },
  'State PSC': { bg: 'bg-purple-50',  text: 'text-purple-700' },
  Engineering: { bg: 'bg-cyan-50',    text: 'text-cyan-800' },
  Medical:     { bg: 'bg-pink-50',    text: 'text-pink-700' },
}

const INITIAL_PAGE_SIZE = 40
const PAGE_STEP = 40

export function GovtJobsSingleRowSection({ jobs, results = [], exams = [] }: Props) {
  // 3 Primary Tabs as requested: Jobs | Results | Exams
  const [activeMainTab, setActiveMainTab] = useState<'jobs' | 'results' | 'exams'>('jobs')
  const [selectedSpec, setSelectedSpec] = useState<string>('all')
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE)

  // Categorize jobs matching specification
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Don't show upcoming in this center feed because upcoming jobs are in the right sidebar
      if (job.isUpcoming) return false

      if (selectedSpec !== 'all') {
        const directMatch = job.specification && job.specification.toLowerCase() === selectedSpec.toLowerCase()
        if (!directMatch) {
          const spec = SPECIFICATIONS.find((s) => s.id === selectedSpec)
          if (!spec?.keyword) return false
          const text = `${job.title} ${job.organization} ${job.examName ?? ''}`.toLowerCase()
          if (!text.includes(spec.keyword)) return false
        }
      }

      return true
    })
  }, [jobs, selectedSpec])

  // Count jobs per specification
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: jobs.filter((j) => !j.isUpcoming).length }
    for (const spec of SPECIFICATIONS) {
      if (spec.id === 'all') continue
      map[spec.id] = jobs.filter((job) => {
        if (job.isUpcoming) return false
        if (job.specification && job.specification.toLowerCase() === spec.id.toLowerCase()) {
          return true
        }
        if (spec.keyword) {
          const text = `${job.title} ${job.organization} ${job.examName ?? ''}`.toLowerCase()
          return text.includes(spec.keyword)
        }
        return false
      }).length
    }
    return map
  }, [jobs])

  // Dedicated list of upcoming jobs for the right-side section
  const upcomingJobs = useMemo(() => {
    return jobs.filter((j) => j.isUpcoming).slice(0, 15)
  }, [jobs])

  const upcomingCount = useMemo(() => jobs.filter((j) => j.isUpcoming).length, [jobs])

  const displayedJobs = filteredJobs.slice(0, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_STEP)
  }

  const handleShowAll = () => {
    setVisibleCount(filteredJobs.length)
  }

  return (
    <div className="w-full">
      {/* 3-Column Layout: Left Spec Sidebar + Shrunk Middle Stream + Right Upcoming Jobs */}
      <div className="flex flex-col lg:flex-row gap-3.5 xl:gap-5 w-full">

        {/* ── COLUMN 1 (LEFT): Compact Category Navigation (No background cards) ── */}
        <aside className="w-full lg:w-[175px] xl:w-[185px] shrink-0">
          <div className="sticky top-16 pt-0.5">
            <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="h-3 w-1 rounded-full bg-[#0A9FFC]" />
                Categories
              </h2>
              <span className="text-[11px] font-bold text-[#0A9FFC]">
                {jobs.length.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Desktop: Compact Vertical List | Mobile: Horizontal Scrollable Chips */}
            <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible lg:pb-0">
              {SPECIFICATIONS.map((spec) => {
                const Icon = spec.icon
                const isActive = selectedSpec === spec.id
                const count = counts[spec.id] ?? 0

                return (
                  <button
                    key={spec.id}
                    onClick={() => {
                      setSelectedSpec(spec.id)
                      setActiveMainTab('jobs')
                      setVisibleCount(INITIAL_PAGE_SIZE)
                    }}
                    className={`flex shrink-0 items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold transition-all lg:w-full cursor-pointer ${
                      isActive && activeMainTab === 'jobs'
                        ? 'bg-[#0A9FFC] text-white shadow-xs font-bold'
                        : 'text-slate-700 hover:bg-sky-50 hover:text-[#0A9FFC] bg-slate-50/70 lg:bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Icon
                        size={13}
                        className={isActive && activeMainTab === 'jobs' ? 'text-white' : 'text-[#0A9FFC] shrink-0'}
                      />
                      <span className="truncate">{spec.label}</span>
                    </div>
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold shrink-0 ${
                        isActive && activeMainTab === 'jobs'
                          ? 'bg-white/25 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {count.toLocaleString('en-IN')}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* ── COLUMN 2 (MIDDLE): Shrunk Compact Stream with 3 Main Tabs: Jobs, Results, Exams ── */}
        <div className="w-full lg:max-w-[680px] xl:max-w-[740px] flex-1 min-w-0 space-y-1">
          {/* Top 3 Primary Tabs with Increased Text & Particular Margins (NO search bar) */}
          <div className="flex items-center border-b border-slate-200 pb-2 mb-2 gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                setActiveMainTab('jobs')
                setVisibleCount(INITIAL_PAGE_SIZE)
              }}
              className={`text-base sm:text-lg font-black transition-all cursor-pointer relative pb-1 mr-2 ${
                activeMainTab === 'jobs'
                  ? 'text-[#0A9FFC] border-b-2 border-[#0A9FFC] -mb-[9px]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Jobs ({jobs.length.toLocaleString('en-IN')})
            </button>

            <button
              onClick={() => {
                setActiveMainTab('results')
                setVisibleCount(INITIAL_PAGE_SIZE)
              }}
              className={`text-base sm:text-lg font-black transition-all cursor-pointer relative pb-1 mr-2 ${
                activeMainTab === 'results'
                  ? 'text-[#0A9FFC] border-b-2 border-[#0A9FFC] -mb-[9px]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Results ({results.length.toLocaleString('en-IN')})
            </button>

            <button
              onClick={() => {
                setActiveMainTab('exams')
                setVisibleCount(INITIAL_PAGE_SIZE)
              }}
              className={`text-base sm:text-lg font-black transition-all cursor-pointer relative pb-1 mr-2 ${
                activeMainTab === 'exams'
                  ? 'text-[#0A9FFC] border-b-2 border-[#0A9FFC] -mb-[9px]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Exams ({exams.length.toLocaleString('en-IN')})
            </button>
          </div>

          {/* ── TAB 1: JOBS STREAM (Shrunk & Compact, Violet Titles) ── */}
          {activeMainTab === 'jobs' && (
            <div>
              {displayedJobs.length === 0 ? (
                <div className="py-10 text-center text-slate-500 text-xs">
                  <p className="font-bold text-slate-700">No active vacancies found for this category.</p>
                  <button
                    onClick={() => setSelectedSpec('all')}
                    className="mt-2 text-[#0A9FFC] font-bold hover:underline cursor-pointer"
                  >
                    View All Jobs →
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {displayedJobs.map((job) => {
                    const isPast = job.lastDate && new Date(job.lastDate) < new Date('2026-10-01')
                    const specStyle = job.specification ? SPEC_STYLES[job.specification] : null

                    return (
                      <div
                        key={job.id}
                        className="hover:bg-sky-50/40 py-2 sm:py-2.5 px-1 sm:px-1.5 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">

                          {/* Left Block: Org + Category + Title in VIOLET + Qualification */}
                          <div className="flex-1 min-w-0 space-y-0.5">
                            {/* Meta Tags Line */}
                            <div className="flex flex-wrap items-center gap-1.5 text-xs">
                              {/* Organization */}
                              <span className="font-bold text-slate-800 flex items-center gap-1">
                                <Building2 size={12} className="text-[#0A9FFC] shrink-0" />
                                <span className="truncate max-w-[190px] sm:max-w-[240px]">{job.organization}</span>
                              </span>

                              {/* Specification Tag */}
                              {job.specification && (
                                <span className={`rounded px-1.5 py-0.2 font-bold text-[10px] ${specStyle?.bg ?? 'bg-sky-50'} ${specStyle?.text ?? 'text-sky-700'}`}>
                                  {job.specification}
                                </span>
                              )}

                              {/* Status */}
                              {isPast ? (
                                <span className="rounded bg-slate-100 text-slate-500 font-semibold px-1.5 py-0.2 text-[10px]">
                                  Past Archive
                                </span>
                              ) : (
                                <span className="rounded bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 text-[10px] inline-flex items-center gap-1">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  Active
                                </span>
                              )}

                              {/* State */}
                              {job.state && (
                                <span className="text-slate-400 text-[11px]">• {job.state}</span>
                              )}
                            </div>

                            {/* Title in VIOLET (Stays Violet on hover and selection) */}
                            <Link href={`/latest-jobs/${job.slug}`} className="block job-title-violet">
                              <h2 className="text-sm sm:text-[14.5px] font-bold text-[#7c3aed] leading-snug">
                                {job.title}
                              </h2>
                            </Link>

                            {/* Qualification Pill */}
                            {job.qualification && (
                              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 pt-0.5">
                                <span className="inline-flex items-center gap-1 text-[#0284c7] font-bold">
                                  <GraduationCap size={13} className="text-[#0A9FFC] shrink-0" />
                                  Eligibility:
                                </span>
                                <span className="text-slate-600 line-clamp-1">{job.qualification}</span>
                                {job.tentativeDate && (
                                  <span className="font-semibold text-amber-700 text-[11px] ml-1">
                                    📌 {job.tentativeDate}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Right Block: Posts + Last Date + Buttons (Compact, close-knit) */}
                          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-start sm:self-center pt-1 sm:pt-0">
                            {/* Posts */}
                            {job.postCount ? (
                              <div className="text-left sm:text-right min-w-[55px]">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Posts</span>
                                <span className="text-xs sm:text-sm font-extrabold text-[#0284c7] leading-tight">
                                  {job.postCount.toLocaleString('en-IN')}
                                </span>
                              </div>
                            ) : null}

                            {/* Last Date */}
                            {job.lastDate ? (
                              <div className="text-left sm:text-right min-w-[65px]">
                                <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">
                                  {isPast ? 'Closed' : 'Last Date'}
                                </span>
                                <span className={`text-xs font-bold leading-tight ${isPast ? 'text-slate-400' : 'text-rose-600'}`}>
                                  {new Date(job.lastDate).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: '2-digit',
                                  })}
                                </span>
                              </div>
                            ) : null}

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1">
                              <Link
                                href={`/latest-jobs/${job.slug}`}
                                className="btn-outline text-xs py-1 px-2 font-bold"
                              >
                                <span>Details</span>
                                <ArrowUpRight size={11} />
                              </Link>

                              <a
                                href={job.officialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Direct Official Government Application Portal"
                                className={
                                  isPast
                                    ? 'inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-1 px-2.5 transition-all'
                                    : 'btn-primary text-xs py-1 px-2.5 font-bold'
                                }
                              >
                                <span>{isPast ? 'Notice' : 'Apply'}</span>
                                <ExternalLink size={11} />
                              </a>
                            </div>

                          </div>

                        </div>
                      </div>
                    )
                  })}

                  {/* Load More Controls */}
                  {displayedJobs.length < filteredJobs.length && (
                    <div className="pt-4 pb-6 flex items-center justify-center gap-2.5">
                      <button
                        onClick={handleLoadMore}
                        className="btn-primary text-xs py-2 px-5 font-bold cursor-pointer"
                      >
                        Load More ({displayedJobs.length} of {filteredJobs.length.toLocaleString('en-IN')})
                      </button>
                      <button
                        onClick={handleShowAll}
                        className="btn-outline text-xs py-2 px-4 font-bold cursor-pointer"
                      >
                        Show All ({filteredJobs.length.toLocaleString('en-IN')})
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── TAB 2: RESULTS STREAM (Violet Titles, Flat Rows) ── */}
          {activeMainTab === 'results' && (
            <div className="divide-y divide-slate-100">
              {results.length === 0 ? (
                <div className="py-10 text-center text-slate-500 text-xs">
                  <p>No results found currently.</p>
                </div>
              ) : (
                results.map((res) => (
                  <div key={res.id} className="hover:bg-emerald-50/40 py-2 sm:py-2.5 px-1 sm:px-1.5 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <span className="text-xs font-bold text-slate-700 block">
                          {res.organization}
                        </span>
                        <Link href={`/results/${res.slug}`} className="block job-title-violet">
                          <h2 className="text-sm sm:text-[14.5px] font-bold text-[#7c3aed] leading-snug">
                            {res.title}
                          </h2>
                        </Link>
                        {res.resultDateText && (
                          <span className="text-xs font-semibold text-emerald-600 block">
                            Declared: {res.resultDateText}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Link
                          href={`/results/${res.slug}`}
                          className="btn-outline text-xs py-1 px-2.5 font-bold"
                        >
                          <span>Details</span>
                          <ArrowUpRight size={11} />
                        </Link>
                        <a
                          href={res.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs py-1 px-2.5 font-bold"
                        >
                          <span>Download PDF</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── TAB 3: EXAMS STREAM (Violet Titles, Flat Rows) ── */}
          {activeMainTab === 'exams' && (
            <div className="divide-y divide-slate-100">
              {exams.length === 0 ? (
                <div className="py-10 text-center text-slate-500 text-xs">
                  <p>No exams available.</p>
                </div>
              ) : (
                exams.map((ex) => (
                  <div key={ex.id} className="hover:bg-amber-50/40 py-2 sm:py-2.5 px-1 sm:px-1.5 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5 flex-1 min-w-0">
                        {ex.conductedBy && (
                          <span className="text-xs font-bold text-slate-700 block">
                            {ex.conductedBy}
                          </span>
                        )}
                        <Link href={`/top-exams/${ex.slug}`} className="block job-title-violet">
                          <h2 className="text-sm sm:text-[14.5px] font-bold text-[#7c3aed] leading-snug">
                            {ex.name}
                          </h2>
                        </Link>
                        {ex.nextExamWindow && (
                          <span className="text-xs font-semibold text-amber-700 block">
                            📌 {ex.nextExamWindow}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Link
                          href={`/top-exams/${ex.slug}`}
                          className="btn-outline text-xs py-1 px-2.5 font-bold"
                        >
                          <span>Details</span>
                          <ArrowUpRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* ── COLUMN 3 (RIGHT): UPCOMING JOBS (No background cards) ───────────── */}
        <aside className="w-full lg:w-[250px] xl:w-[270px] shrink-0 pt-0.5">
          <div className="sticky top-16">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Clock size={13} className="text-amber-600" />
                <span>Upcoming Jobs</span>
              </h2>
              <span className="text-[11px] font-bold text-amber-700">
                {upcomingCount} Total
              </span>
            </div>

            {/* Upcoming Jobs List (Plain Text, Flat Dividers, Violet Titles) */}
            <div className="divide-y divide-slate-100">
              {upcomingJobs.map((item) => (
                <div key={item.id} className="py-2 hover:bg-amber-50/40 px-1 transition-colors">
                  <div className="flex items-center justify-between gap-1 text-[11px]">
                    <span className="font-bold text-slate-500 truncate max-w-[160px]">
                      {item.organization}
                    </span>
                    {item.postCount && (
                      <span className="text-[10px] font-black text-[#0284c7]">
                        {item.postCount.toLocaleString('en-IN')} Posts
                      </span>
                    )}
                  </div>

                  {/* Title in VIOLET */}
                  <Link
                    href={`/latest-jobs/${item.slug}`}
                    className="block text-xs font-bold leading-snug mt-0.5 line-clamp-2 job-title-violet"
                  >
                    {item.title}
                  </Link>

                  {/* Date & Quick Action */}
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-amber-700">
                      📌 {item.tentativeDate || 'Expected 2026-27'}
                    </span>
                    <Link
                      href={`/latest-jobs/${item.slug}`}
                      className="font-bold text-[#0A9FFC] hover:underline flex items-center gap-0.5 text-[10px]"
                    >
                      <span>Details</span>
                      <ArrowUpRight size={10} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}
