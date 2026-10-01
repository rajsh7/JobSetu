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
  ChevronLeft,
  ChevronRight,
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

const ITEMS_PER_PAGE = 25

// Helper to generate pagination numbers: always shows 1st, 2nd, intermediate window, and last page
function getPaginationPages(current: number, total: number): (number | 'ellipsis-start' | 'ellipsis-end')[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []
  
  // Always include 1st and 2nd page
  pages.push(1)
  pages.push(2)

  if (current > 4) {
    pages.push('ellipsis-start')
  }

  // Intermediate pages around current
  const middlePages = [current - 1, current, current + 1].filter(
    (p) => p > 2 && p < total
  )

  for (const p of middlePages) {
    if (!pages.includes(p)) {
      pages.push(p)
    }
  }

  if (current < total - 3) {
    pages.push('ellipsis-end')
  }

  // Always include last page
  if (!pages.includes(total)) {
    pages.push(total)
  }

  return pages
}

export function GovtJobsSingleRowSection({ jobs, results = [] }: Props) {
  const [selectedSpec, setSelectedSpec] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)

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

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const paginatedJobs = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredJobs, safeCurrentPage])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === safeCurrentPage) return
    setCurrentPage(page)
    if (typeof window !== 'undefined') {
      const el = document.getElementById('vacancies-stream-top')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 100, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="w-full max-w-[1360px] xl:max-w-[1400px] mx-auto">
      {/* Centered Layout: Categories on Left + Center Vacancies + Right Columns */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-3.5 xl:gap-5 w-full">

        {/* ── COLUMN 1 (LEFT): Compact Category Navigation (No background cards) ── */}
        <aside className="w-full lg:w-[175px] xl:w-[185px] shrink-0">
          <div className="sticky top-20 lg:top-24 pt-0.5 z-10">
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
                      setCurrentPage(1)
                    }}
                    className={`flex shrink-0 items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold transition-all lg:w-full cursor-pointer ${
                      isActive
                        ? 'bg-[#0A9FFC] text-white shadow-xs font-bold'
                        : 'text-slate-700 hover:bg-sky-50 hover:text-[#0A9FFC] bg-slate-50/70 lg:bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Icon
                        size={13}
                        className={isActive ? 'text-white' : 'text-[#0A9FFC] shrink-0'}
                      />
                      <span className="truncate">{spec.label}</span>
                    </div>
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold shrink-0 ${
                        isActive
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

        {/* ── COLUMN 2 (MIDDLE): Shrunk Compact Stream for Latest Govt Vacancies ── */}
        <div className="w-full lg:max-w-[560px] xl:max-w-[620px] 2xl:max-w-[660px] flex-1 min-w-0 space-y-1">
          {/* Subtle Category Header (NO JOBS RESULT EXAMS text tabs) */}
          <div id="vacancies-stream-top" className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5 scroll-mt-28">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <span className="h-3 w-1 rounded-full bg-[#0A9FFC]" />
              <span>
                {selectedSpec === 'all'
                  ? 'Latest Govt Vacancies'
                  : `${SPECIFICATIONS.find((s) => s.id === selectedSpec)?.label || selectedSpec} Jobs`}
              </span>
            </h2>
            <span className="text-[11px] font-bold text-[#0A9FFC]">
              {filteredJobs.length.toLocaleString('en-IN')} Active
            </span>
          </div>

          {/* Jobs List (Shrunk & Compact, Violet Titles) */}
          <div>
              {paginatedJobs.length === 0 ? (
                <div className="py-10 text-center text-slate-500 text-xs">
                  <p className="font-bold text-slate-700">No active vacancies found for this category.</p>
                  <button
                    onClick={() => {
                      setSelectedSpec('all')
                      setCurrentPage(1)
                    }}
                    className="mt-2 text-[#0A9FFC] font-bold hover:underline cursor-pointer"
                  >
                    View All Jobs →
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {paginatedJobs.map((job) => {
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

                  {/* Numbered Pagination: 1st page, 2nd page, ... last page */}
                  {totalPages > 1 && (
                    <nav aria-label="Vacancies Pagination" className="pt-5 pb-8 border-t border-slate-100 mt-4">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        {/* Count Summary */}
                        <span className="text-xs font-semibold text-slate-500 order-2 sm:order-1">
                          Showing{' '}
                          <span className="font-bold text-slate-800">
                            {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredJobs.length)}
                          </span>{' '}
                          of <span className="font-bold text-slate-800">{filteredJobs.length.toLocaleString('en-IN')}</span> vacancies
                        </span>

                        {/* Pagination Controls */}
                        <div className="flex items-center gap-1.5 order-1 sm:order-2 flex-wrap justify-center">
                          {/* Prev Button */}
                          <button
                            onClick={() => handlePageChange(safeCurrentPage - 1)}
                            disabled={safeCurrentPage === 1}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            aria-label="Previous Page"
                          >
                            <ChevronLeft size={14} />
                            <span className="hidden sm:inline">Prev</span>
                          </button>

                          {/* Page Numbers */}
                          {getPaginationPages(safeCurrentPage, totalPages).map((p, idx) => {
                            if (p === 'ellipsis-start' || p === 'ellipsis-end') {
                              return (
                                <span key={`ellipsis-${idx}`} className="px-1 text-slate-400 font-bold select-none text-xs">
                                  …
                                </span>
                              )
                            }

                            const isCurrent = p === safeCurrentPage
                            const isFirst = p === 1
                            const isSecond = p === 2
                            const isLast = p === totalPages

                            let label = `${p}`
                            if (isFirst) label = '1st'
                            else if (isSecond) label = '2nd'
                            else if (isLast && totalPages > 2) label = `${p} (Last)`

                            return (
                              <button
                                key={p}
                                onClick={() => handlePageChange(p)}
                                className={`min-w-[34px] px-2 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                  isCurrent
                                    ? 'bg-[#0A9FFC] text-white shadow-xs font-black'
                                    : 'border border-slate-200 bg-white text-slate-700 hover:border-[#0A9FFC] hover:text-[#0A9FFC] hover:bg-sky-50/50'
                                }`}
                                aria-current={isCurrent ? 'page' : undefined}
                              >
                                {label}
                              </button>
                            )
                          })}

                          {/* Next Button */}
                          <button
                            onClick={() => handlePageChange(safeCurrentPage + 1)}
                            disabled={safeCurrentPage === totalPages}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            aria-label="Next Page"
                          >
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </nav>
                  )}
                </div>
              )}
            </div>
          </div>

        {/* ── RIGHT SIDE COLUMNS: Results & Upcoming Jobs (No Exams Column) ── */}
        <div className="flex flex-col sm:flex-row gap-3 xl:gap-4 shrink-0">

          {/* ── RIGHT COLUMN 1: RESULTS ── */}
          <aside className="w-full sm:w-[220px] lg:w-[215px] xl:w-[235px] shrink-0 pt-0.5">
            <div className="sticky top-20 lg:top-24 z-10">
              {/* Header */}
              <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Award size={13} className="text-emerald-600" />
                  <span>Results</span>
                </h2>
                <Link href="/results" className="text-[11px] font-bold text-emerald-700 hover:underline">
                  {results.length.toLocaleString('en-IN')} Total
                </Link>
              </div>

              {/* Results List */}
              <div className="divide-y divide-slate-100">
                {results.slice(0, 15).map((item) => (
                  <div key={item.id} className="py-2 hover:bg-emerald-50/40 px-1 transition-colors">
                    <div className="flex items-center justify-between gap-1 text-[11px]">
                      <span className="font-bold text-slate-500 truncate max-w-[145px]">
                        {item.organization}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                        Declared
                      </span>
                    </div>

                    <Link
                      href={`/results/${item.slug}`}
                      className="block text-xs font-bold leading-snug mt-0.5 line-clamp-2 job-title-violet"
                    >
                      {item.title}
                    </Link>

                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="text-[10px] text-slate-400">
                        {item.resultDateText || (item.lastDate ? new Date(item.lastDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Declared')}
                      </span>
                      <Link
                        href={`/results/${item.slug}`}
                        className="font-bold text-[#0A9FFC] hover:underline flex items-center gap-0.5 text-[10px]"
                      >
                        <span>Check</span>
                        <ArrowUpRight size={10} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Footer Link */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/results"
                  className="block text-center text-xs font-bold text-[#0A9FFC] hover:underline py-1"
                >
                  View All Results ({results.length}) →
                </Link>
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN 2: UPCOMING JOBS ── */}
          <aside className="w-full sm:w-[220px] lg:w-[215px] xl:w-[235px] shrink-0 pt-0.5">
            <div className="sticky top-20 lg:top-24 z-10">
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

              {/* Upcoming Jobs List */}
              <div className="divide-y divide-slate-100">
                {upcomingJobs.map((item) => (
                  <div key={item.id} className="py-2 hover:bg-amber-50/40 px-1 transition-colors">
                    <div className="flex items-center justify-between gap-1 text-[11px]">
                      <span className="font-bold text-slate-500 truncate max-w-[145px]">
                        {item.organization}
                      </span>
                      {item.postCount && (
                        <span className="text-[10px] font-black text-[#0284c7]">
                          {item.postCount.toLocaleString('en-IN')} Posts
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/latest-jobs/${item.slug}`}
                      className="block text-xs font-bold leading-snug mt-0.5 line-clamp-2 job-title-violet"
                    >
                      {item.title}
                    </Link>

                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-amber-700 text-[10px]">
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
    </div>
  )
}
