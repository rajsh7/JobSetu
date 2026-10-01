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
  MapPin,
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
  admitCards?: DetailedPortalItem[]
  exams?: ExamItem[]
}

interface SpecificationOption {
  id: string
  label: string
  icon: typeof Briefcase
  keyword?: string
}

interface HighlightItem {
  title: string
  posts: string
  url: string
  color: string
  borderColor: string
}

// 8 Top Highlights specified by user
const TOP_HIGHLIGHTS: HighlightItem[] = [
  {
    title: 'BPSC School Teacher Form',
    posts: '33,320 Posts',
    url: 'https://sarkariresult.com.cm/bpsc-school-teacher-tre-4-0-2026/',
    color: 'text-rose-600 hover:text-rose-700',
    borderColor: 'border-rose-200 hover:border-rose-400 bg-rose-50/40',
  },
  {
    title: 'Daily 5 Min Meditation & Crack Exams',
    posts: 'Mind Focus Video',
    url: 'https://www.youtube.com/watch?v=gwQ7uPPWKx4',
    color: 'text-amber-700 hover:text-amber-800',
    borderColor: 'border-amber-200 hover:border-amber-400 bg-amber-50/40',
  },
  {
    title: 'UPESSC PGT Teacher Form',
    posts: '2,607 Posts',
    url: 'https://sarkariresult.com.cm/up-pgt-teacher-2026/',
    color: 'text-blue-600 hover:text-blue-700',
    borderColor: 'border-blue-200 hover:border-blue-400 bg-blue-50/40',
  },
  {
    title: 'Rajasthan Safai Karmchari',
    posts: '24,752 Posts',
    url: 'https://sarkariresult.com.cm/rajasthan-safai-karmchari-2026/',
    color: 'text-emerald-600 hover:text-emerald-700',
    borderColor: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/40',
  },
  {
    title: 'UPESSC Assistant Teacher Form',
    posts: '12,405 Posts',
    url: 'https://sarkariresult.com.cm/upessc-prt-assistant-teacher-2026/',
    color: 'text-purple-600 hover:text-purple-700',
    borderColor: 'border-purple-200 hover:border-purple-400 bg-purple-50/40',
  },
  {
    title: 'SSC CHSL Online Form',
    posts: '2,536 Posts',
    url: 'https://sarkariresult.com.cm/ssc-chsl-sep-2026/',
    color: 'text-sky-600 hover:text-sky-700',
    borderColor: 'border-sky-200 hover:border-sky-400 bg-sky-50/40',
  },
  {
    title: 'RRB NTPC UG Level Form',
    posts: '1,688 Posts',
    url: 'https://sarkariresult.com.cm/rrb-ntpc-inter-level-07-2026/',
    color: 'text-teal-600 hover:text-teal-700',
    borderColor: 'border-teal-200 hover:border-teal-400 bg-teal-50/40',
  },
  {
    title: 'RRB NTPC Graduate Level Form',
    posts: '3,477 Posts',
    url: 'https://sarkariresult.com.cm/rrb-ntpc-graduate-level-06-2026/',
    color: 'text-indigo-600 hover:text-indigo-700',
    borderColor: 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/40',
  },
]

interface StateOption {
  id: string
  label: string
  keyword?: string
}

const STATE_OPTIONS: StateOption[] = [
  { id: 'all',         label: 'All India / States' },
  { id: 'up',          label: 'Uttar Pradesh',  keyword: 'uttar pradesh' },
  { id: 'bihar',       label: 'Bihar',          keyword: 'bihar' },
  { id: 'rajasthan',   label: 'Rajasthan',      keyword: 'rajasthan' },
  { id: 'delhi',       label: 'Delhi / NCR',    keyword: 'delhi' },
  { id: 'mp',          label: 'Madhya Pradesh', keyword: 'madhya pradesh' },
  { id: 'haryana',     label: 'Haryana',        keyword: 'haryana' },
  { id: 'maharashtra', label: 'Maharashtra',    keyword: 'maharashtra' },
  { id: 'other',       label: 'Other States' },
]

function matchesState(job: DetailedPortalItem, stateId: string): boolean {
  if (stateId === 'all') return true
  const stateOpt = STATE_OPTIONS.find((s) => s.id === stateId)
  if (!stateOpt) return true

  const text = `${job.state || ''} ${job.title} ${job.organization}`.toLowerCase()

  if (stateId === 'other') {
    const mainKeywords = ['uttar pradesh', 'bihar', 'rajasthan', 'delhi', 'madhya pradesh', 'haryana', 'maharashtra']
    return !mainKeywords.some((k) => text.includes(k))
  }

  const keyword = stateOpt.keyword
  if (!keyword) return true
  return text.includes(keyword)
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

export function GovtJobsSingleRowSection({ jobs, results = [], admitCards = [] }: Props) {
  const [selectedSpec, setSelectedSpec] = useState<string>('all')
  const [selectedState, setSelectedState] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Categorize jobs matching specification and state
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

      if (selectedState !== 'all') {
        if (!matchesState(job, selectedState)) return false
      }

      return true
    })
  }, [jobs, selectedSpec, selectedState])

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

  // Count jobs per state
  const stateCounts = useMemo(() => {
    const map: Record<string, number> = { all: jobs.filter((j) => !j.isUpcoming).length }
    for (const st of STATE_OPTIONS) {
      if (st.id === 'all') continue
      map[st.id] = jobs.filter((job) => {
        if (job.isUpcoming) return false
        return matchesState(job, st.id)
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
      {/* ── TOP TRENDING HIGHLIGHTS GRID (Above the 4 columns) ── */}
      <div className="mb-4 sm:mb-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-2.5">
          {TOP_HIGHLIGHTS.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center text-center p-2 sm:p-2.5 rounded-lg border transition-all hover:shadow-xs group cursor-pointer ${item.borderColor}`}
            >
              <span className={`text-xs sm:text-[13px] font-extrabold line-clamp-1 group-hover:underline ${item.color}`}>
                {item.title}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-0.5">
                {item.posts}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Centered Layout: Categories on Left + Center Vacancies + Right Columns */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-3.5 xl:gap-5 w-full">

        {/* ── COLUMN 1 (LEFT): Compact Category Navigation & State/City Filter (No background cards) ── */}
        <aside className="w-full lg:w-[175px] xl:w-[185px] shrink-0">
          <div className="sticky top-20 lg:top-24 pt-0.5 z-10 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
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

            {/* ── STATE / CITY FILTER ── */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <MapPin size={12} className="text-purple-600" />
                  State / City
                </h2>
                {selectedState !== 'all' && (
                  <button
                    onClick={() => {
                      setSelectedState('all')
                      setCurrentPage(1)
                    }}
                    className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible lg:pb-0">
                {STATE_OPTIONS.map((st) => {
                  const isActive = selectedState === st.id
                  const count = stateCounts[st.id] ?? 0

                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        setSelectedState(st.id)
                        setCurrentPage(1)
                      }}
                      className={`flex shrink-0 items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold transition-all lg:w-full cursor-pointer ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-xs font-bold'
                          : 'text-slate-700 hover:bg-purple-50 hover:text-purple-700 bg-slate-50/70 lg:bg-transparent'
                      }`}
                    >
                      <span className="truncate">{st.label}</span>
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

          </div>
        </aside>

        {/* ── COLUMN 2 (MIDDLE): Shrunk Compact Stream for Latest Govt Vacancies ── */}
        <div className="w-full lg:max-w-[560px] xl:max-w-[620px] 2xl:max-w-[660px] flex-1 min-w-0 space-y-1">
          {/* Subtle Category Header (NO JOBS RESULT EXAMS text tabs) */}
          <div id="vacancies-stream-top" className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5 scroll-mt-28">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="h-3 w-1 rounded-full bg-[#0A9FFC]" />
                <span>
                  {selectedSpec === 'all'
                    ? 'Latest Govt Vacancies'
                    : `${SPECIFICATIONS.find((s) => s.id === selectedSpec)?.label || selectedSpec} Jobs`}
                </span>
              </h2>
              {selectedState !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5">
                  <span>📍 {STATE_OPTIONS.find((s) => s.id === selectedState)?.label}</span>
                  <button
                    onClick={() => {
                      setSelectedState('all')
                      setCurrentPage(1)
                    }}
                    className="hover:text-purple-950 font-black cursor-pointer ml-0.5"
                    title="Clear State Filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#0A9FFC] shrink-0">
              {filteredJobs.length.toLocaleString('en-IN')} Active
            </span>
          </div>

          {/* Jobs List (Shrunk & Compact, Violet Titles) */}
          <div>
              {paginatedJobs.length === 0 ? (
                <div className="py-10 text-center text-slate-500 text-xs">
                  <p className="font-bold text-slate-700">No active vacancies found for this filter combination.</p>
                  <button
                    onClick={() => {
                      setSelectedSpec('all')
                      setSelectedState('all')
                      setCurrentPage(1)
                    }}
                    className="mt-2 text-[#0A9FFC] font-bold hover:underline cursor-pointer"
                  >
                    Reset All Filters →
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

          {/* ── RIGHT COLUMN 1: RESULTS & ADMIT CARDS ── */}
          <aside className="w-full sm:w-[220px] lg:w-[215px] xl:w-[235px] shrink-0 pt-0.5">
            <div className="sticky top-20 lg:top-24 z-10 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
              {/* Results Header */}
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
                {results.slice(0, 10).map((item) => (
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

              {/* View All Results Link */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/results"
                  className="block text-center text-xs font-bold text-[#0A9FFC] hover:underline py-1"
                >
                  View All Results ({results.length}) →
                </Link>
              </div>

              {/* ── ADMIT CARDS SECTION (Directly below Results) ── */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <GraduationCap size={13} className="text-sky-600" />
                    <span>Admit Cards</span>
                  </h2>
                  <Link href="/admit-cards" className="text-[11px] font-bold text-sky-700 hover:underline">
                    {admitCards.length.toLocaleString('en-IN')} Total
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {admitCards.slice(0, 10).map((card) => (
                    <div key={card.id} className="py-2 hover:bg-sky-50/40 px-1 transition-colors">
                      <div className="flex items-center justify-between gap-1 text-[11px]">
                        <span className="font-bold text-slate-500 truncate max-w-[145px]">
                          {card.organization}
                        </span>
                        <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded">
                          Available
                        </span>
                      </div>

                      <Link
                        href={`/admit-cards/${card.slug}`}
                        className="block text-xs font-bold leading-snug mt-0.5 line-clamp-2 job-title-violet"
                      >
                        {card.title}
                      </Link>

                      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="text-[10px] text-slate-400">
                          {card.examDateText || 'Hall Ticket'}
                        </span>
                        <Link
                          href={`/admit-cards/${card.slug}`}
                          className="font-bold text-[#0A9FFC] hover:underline flex items-center gap-0.5 text-[10px]"
                        >
                          <span>Download</span>
                          <ArrowUpRight size={10} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Admit Cards Link */}
                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href="/admit-cards"
                    className="block text-center text-xs font-bold text-[#0A9FFC] hover:underline py-1"
                  >
                    View All Admit Cards ({admitCards.length}) →
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN 2: UPCOMING JOBS ── */}
          <aside className="w-full sm:w-[220px] lg:w-[215px] xl:w-[235px] shrink-0 pt-0.5">
            <div className="sticky top-20 lg:top-24 z-10 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
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
