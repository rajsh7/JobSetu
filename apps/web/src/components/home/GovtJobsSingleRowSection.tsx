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
  Search,
  Archive,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { type DetailedPortalItem } from '@/lib/data'

interface Props {
  jobs: DetailedPortalItem[]
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

const QUAL_FILTERS = ['All', '10th', '12th', 'Graduate', 'B.Tech/Engg', 'Medical']

const INITIAL_PAGE_SIZE = 40
const PAGE_STEP = 40

export function GovtJobsSingleRowSection({ jobs }: Props) {
  const [selectedSpec, setSelectedSpec] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'past'>('all')
  const [selectedQual, setSelectedQual] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE)

  // Categorize jobs matching specification, status filter, qualification & search query
  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return jobs.filter((job) => {
      // 1. Status Filter
      if (statusFilter === 'active' && (job.isUpcoming || (job.lastDate && new Date(job.lastDate) < new Date('2026-10-01')))) {
        return false
      }
      if (statusFilter === 'upcoming' && !job.isUpcoming) {
        return false
      }
      if (statusFilter === 'past' && (job.isUpcoming || (job.lastDate && new Date(job.lastDate) >= new Date('2026-10-01')))) {
        return false
      }

      // 2. Specification Filter
      if (selectedSpec !== 'all') {
        const directMatch = job.specification && job.specification.toLowerCase() === selectedSpec.toLowerCase()
        if (!directMatch) {
          const spec = SPECIFICATIONS.find((s) => s.id === selectedSpec)
          if (!spec?.keyword) return false
          const text = `${job.title} ${job.organization} ${job.examName ?? ''}`.toLowerCase()
          if (!text.includes(spec.keyword)) return false
        }
      }

      // 3. Qualification Filter
      if (selectedQual !== 'All') {
        const qualText = (job.qualification ?? '').toLowerCase()
        if (selectedQual === '10th' && !qualText.includes('10th') && !qualText.includes('matric')) return false
        if (selectedQual === '12th' && !qualText.includes('12th') && !qualText.includes('10+2') && !qualText.includes('intermediate')) return false
        if (selectedQual === 'Graduate' && !qualText.includes('graduat') && !qualText.includes('degree') && !qualText.includes('bachelor')) return false
        if (selectedQual === 'B.Tech/Engg' && !qualText.includes('eng') && !qualText.includes('b.tech') && !qualText.includes('b.e') && !qualText.includes('diploma')) return false
        if (selectedQual === 'Medical' && !qualText.includes('mbbs') && !qualText.includes('nurs') && !qualText.includes('medic') && !qualText.includes('b.sc')) return false
      }

      // 4. Search Query Filter
      if (q) {
        const text = `${job.title} ${job.organization} ${job.state ?? ''} ${job.qualification ?? ''}`.toLowerCase()
        if (!text.includes(q)) return false
      }

      return true
    })
  }, [jobs, selectedSpec, statusFilter, selectedQual, searchQuery])

  // Count jobs per specification
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: jobs.length }
    for (const spec of SPECIFICATIONS) {
      if (spec.id === 'all') continue
      map[spec.id] = jobs.filter((job) => {
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

  const activeCount = useMemo(
    () => jobs.filter((j) => !j.isUpcoming && j.lastDate && new Date(j.lastDate) >= new Date('2026-10-01')).length,
    [jobs]
  )
  const upcomingCount = useMemo(() => jobs.filter((j) => j.isUpcoming).length, [jobs])
  const pastCount = useMemo(
    () => jobs.filter((j) => !j.isUpcoming && j.lastDate && new Date(j.lastDate) < new Date('2026-10-01')).length,
    [jobs]
  )

  // Dedicated list of upcoming jobs for the right-side section
  const upcomingJobs = useMemo(() => {
    return jobs.filter((j) => j.isUpcoming).slice(0, 15)
  }, [jobs])

  const displayedJobs = filteredJobs.slice(0, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_STEP)
  }

  const handleShowAll = () => {
    setVisibleCount(filteredJobs.length)
  }

  return (
    <div className="w-full">
      {/* 3-Column Layout: Left Spec Sidebar + Middle Vacancies Stream + Right Upcoming Jobs */}
      <div className="flex flex-col lg:flex-row gap-3.5 xl:gap-4 w-full">

        {/* ── LEFT SIDEBAR: Compact Category Navigation (No background cards) ── */}
        <aside className="w-full lg:w-[185px] xl:w-[195px] shrink-0">
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
                      setVisibleCount(INITIAL_PAGE_SIZE)
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

        {/* ── MIDDLE CONTENT: Single Row Vacancies Stream (No background cards) ── */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Top Status Tabs + Search Bar */}
          <div className="flex flex-col gap-2 pb-2.5 border-b border-slate-200">
            {/* Status Tabs */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({jobs.length.toLocaleString('en-IN')})
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('active')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'active'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active ({activeCount})</span>
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('upcoming')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'upcoming'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  <Clock size={11} />
                  <span>Upcoming ({upcomingCount})</span>
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('past')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'past'
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Archive size={11} />
                  <span>Past Archive ({pastCount.toLocaleString('en-IN')})</span>
                </button>
              </div>

              <span className="text-xs font-semibold text-slate-500">
                Showing {Math.min(visibleCount, filteredJobs.length)} of {filteredJobs.length.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Search Bar + Quick Eligibility Chips */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  placeholder="Search jobs by Exam, Department, Post (e.g. CGL, Constable, Railway, Bank, Teacher)..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-1.5 pl-8 pr-3 text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#0A9FFC] focus:bg-white transition-all"
                />
              </div>

              {/* Quick Eligibility Filters */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {QUAL_FILTERS.map((qual) => {
                  const isSelected = selectedQual === qual
                  return (
                    <button
                      key={qual}
                      onClick={() => {
                        setSelectedQual(qual)
                        setVisibleCount(INITIAL_PAGE_SIZE)
                      }}
                      className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0A9FFC] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {qual === 'All' ? 'All Eligibility' : qual}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Vacancy Rows (Flat, Plain Text, NO background cards, Magenta Titles) */}
          {filteredJobs.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="font-bold text-sm text-slate-700">No vacancies found matching your current filter.</p>
              <button
                onClick={() => {
                  setSelectedSpec('all')
                  setStatusFilter('all')
                  setSelectedQual('All')
                  setSearchQuery('')
                }}
                className="mt-2 text-xs font-bold text-[#0A9FFC] hover:underline cursor-pointer"
              >
                Reset All Filters →
              </button>
            </div>
          ) : (
            <div>
              {displayedJobs.map((job) => {
                const isPast = !job.isUpcoming && job.lastDate && new Date(job.lastDate) < new Date('2026-10-01')
                const specStyle = job.specification ? SPEC_STYLES[job.specification] : null

                return (
                  <div
                    key={job.id}
                    className="border-b border-slate-200/80 hover:bg-sky-50/40 py-2 sm:py-2.5 px-1 sm:px-2 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3.5">

                      {/* Left Block: Org + Category + Title in MAGENTA + Qualification */}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        {/* Meta Tags Line */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                          {/* Organization */}
                          <span className="font-bold text-slate-800 flex items-center gap-1">
                            <Building2 size={12} className="text-[#0A9FFC] shrink-0" />
                            <span className="truncate max-w-[200px] sm:max-w-[280px]">{job.organization}</span>
                          </span>

                          {/* Specification Tag */}
                          {job.specification && (
                            <span className={`rounded px-1.5 py-0.2 font-bold text-[10px] ${specStyle?.bg ?? 'bg-sky-50'} ${specStyle?.text ?? 'text-sky-700'}`}>
                              {job.specification}
                            </span>
                          )}

                          {/* Status */}
                          {job.isUpcoming ? (
                            <span className="rounded bg-amber-50 text-amber-700 font-bold px-1.5 py-0.2 text-[10px]">
                              Upcoming 2026-27
                            </span>
                          ) : isPast ? (
                            <span className="rounded bg-slate-100 text-slate-500 font-semibold px-1.5 py-0.2 text-[10px]">
                              Past Archive
                            </span>
                          ) : (
                            <span className="rounded bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 text-[10px] inline-flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Active Form
                            </span>
                          )}

                          {/* State */}
                          {job.state && (
                            <span className="text-slate-400 text-[11px]">• {job.state}</span>
                          )}
                        </div>

                        {/* Title in VIOLET Colour Text (stays violet on hover and selection) */}
                        <Link href={`/latest-jobs/${job.slug}`} className="block job-title-violet">
                          <h2 className="text-sm sm:text-[15px] font-bold text-[#7c3aed] leading-snug">
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

                      {/* Right Block: Posts + Last Date + Buttons (Close-knit, compact, no empty gap!) */}
                      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-start md:self-center pt-1 md:pt-0">
                        {/* Posts */}
                        {job.postCount ? (
                          <div className="text-left md:text-right min-w-[62px]">
                            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Posts</span>
                            <span className="text-xs sm:text-sm font-extrabold text-[#0284c7] leading-tight">
                              {job.postCount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        ) : null}

                        {/* Last Date */}
                        {job.lastDate ? (
                          <div className="text-left md:text-right min-w-[75px]">
                            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">
                              {job.isUpcoming ? 'Tentative' : (isPast ? 'Closed' : 'Last Date')}
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
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/latest-jobs/${job.slug}`}
                            className="btn-outline text-xs py-1 px-2.5 font-bold"
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
                              job.isUpcoming
                                ? 'inline-flex items-center gap-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-1 px-2.5 transition-all'
                                : isPast
                                ? 'inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-1 px-2.5 transition-all'
                                : 'btn-primary text-xs py-1 px-3 font-bold'
                            }
                          >
                            <span>{job.isUpcoming ? 'Portal' : (isPast ? 'Notice' : 'Apply')}</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>

                      </div>

                    </div>
                  </div>
                )
              })}

              {/* Load More & Show All Controls */}
              {displayedJobs.length < filteredJobs.length && (
                <div className="pt-4 pb-6 flex items-center justify-center gap-2.5">
                  <button
                    onClick={handleLoadMore}
                    className="btn-primary text-xs py-2 px-5 font-bold cursor-pointer"
                  >
                    Load More 40 Vacancies (Showing {displayedJobs.length} of {filteredJobs.length.toLocaleString('en-IN')})
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

        {/* ── RIGHT COLUMN: UPCOMING JOBS (Requested by User) ───────────── */}
        <aside className="w-full lg:w-[260px] xl:w-[280px] shrink-0 pt-0.5">
          <div className="sticky top-16">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Clock size={13} className="text-amber-600" />
                <span>Upcoming Jobs</span>
              </h2>
              <button
                onClick={() => {
                  setStatusFilter('upcoming')
                  setVisibleCount(INITIAL_PAGE_SIZE)
                }}
                className="text-[11px] font-bold text-amber-700 hover:underline cursor-pointer"
              >
                {upcomingCount} Total →
              </button>
            </div>

            {/* Upcoming Jobs List (Plain Text, Flat Dividers, No Background Cards) */}
            <div className="divide-y divide-slate-100">
              {upcomingJobs.map((item) => (
                <div key={item.id} className="py-2.5 hover:bg-amber-50/40 px-1 transition-colors">
                  <div className="flex items-center justify-between gap-1 text-[11px]">
                    <span className="font-bold text-slate-500 truncate max-w-[170px]">
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

            {/* Quick Filter to Upcoming Button */}
            <button
              onClick={() => {
                setStatusFilter('upcoming')
                setVisibleCount(INITIAL_PAGE_SIZE)
              }}
              className="mt-3 w-full py-1.5 px-3 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 text-xs font-bold text-center hover:bg-amber-100 transition-colors cursor-pointer"
            >
              View All {upcomingCount} Upcoming Vacancies →
            </button>
          </div>
        </aside>

      </div>
    </div>
  )
}
