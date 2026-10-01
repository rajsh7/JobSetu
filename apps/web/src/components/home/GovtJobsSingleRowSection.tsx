'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ExternalLink,
  ArrowUpRight,
  Calendar,
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
  CheckCircle2,
  Clock,
  Flame,
  Wrench,
  Stethoscope,
  Search,
  Archive,
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

const INITIAL_PAGE_SIZE = 40
const PAGE_STEP = 40

export function GovtJobsSingleRowSection({ jobs }: Props) {
  const [selectedSpec, setSelectedSpec] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'past'>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE)

  // Categorize jobs matching specification, status filter & search query
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

      // 3. Search Query Filter
      if (q) {
        const text = `${job.title} ${job.organization} ${job.state ?? ''} ${job.qualification ?? ''}`.toLowerCase()
        if (!text.includes(q)) return false
      }

      return true
    })
  }, [jobs, selectedSpec, statusFilter, searchQuery])

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

  const displayedJobs = filteredJobs.slice(0, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_STEP)
  }

  const handleShowAll = () => {
    setVisibleCount(filteredJobs.length)
  }

  return (
    <div className="w-full">
      {/* 2-Column Flex Layout: Compact Left Sidebar + Wide Right Jobs List */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 w-full">

        {/* ── LEFT SIDEBAR: Clean, unboxed specifications column ─────────── */}
        <aside className="w-full lg:w-[210px] shrink-0">
          <div className="sticky top-16 pt-1">
            <div className="mb-2.5 flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="h-3 w-1 rounded-full bg-[#0A9FFC]"></span>
                Specifications
              </h2>
              <span className="text-[11px] font-bold text-[#0A9FFC]">
                {jobs.length.toLocaleString('en-IN')} Total
              </span>
            </div>

            {/* Desktop: Vertical Compact List | Mobile: Horizontal Scrollable Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible lg:pb-0">
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
                    className={`flex shrink-0 items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-all lg:w-full ${
                      isActive
                        ? 'bg-[#0A9FFC] text-white shadow-xs font-bold'
                        : 'text-slate-700 hover:bg-[#f0f9ff] hover:text-[#0A9FFC] bg-slate-50 lg:bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon size={14} className={isActive ? 'text-white' : 'text-[#0A9FFC] shrink-0'} />
                      <span className="truncate">{spec.label}</span>
                    </div>
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold shrink-0 ${
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

        {/* ── RIGHT CONTENT: Single Row Job Listings (Fills all remaining width) ─ */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Top Status Tabs & Search Bar — Clean unboxed filter row */}
          <div className="flex flex-col gap-2.5 pb-3 border-b border-slate-200">
            {/* Quick Status Tabs */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
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
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    statusFilter === 'active'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Active Now ({activeCount})</span>
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('upcoming')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    statusFilter === 'upcoming'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  <Clock size={11} />
                  <span>Upcoming 2026-27 ({upcomingCount})</span>
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('past')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
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

            {/* Quick Live Filter Input */}
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setVisibleCount(INITIAL_PAGE_SIZE)
                }}
                placeholder="Quick search across 1,000+ vacancies (e.g. CGL, Station Master, Clerk, Constable, Teacher)..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-3 text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#0A9FFC] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Job Rows (Clean Flat Horizontal Rows without background cards) */}
          {filteredJobs.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <p className="font-semibold text-base">No vacancies found matching your current filter.</p>
              <button
                onClick={() => {
                  setSelectedSpec('all')
                  setStatusFilter('all')
                  setSearchQuery('')
                }}
                className="mt-3 text-xs font-bold text-[#0A9FFC] hover:underline"
              >
                Reset All Filters →
              </button>
            </div>
          ) : (
            <div>
              {displayedJobs.map((job) => {
                const isPast = !job.isUpcoming && job.lastDate && new Date(job.lastDate) < new Date('2026-10-01')

                return (
                  <div
                    key={job.id}
                    className="border-b border-slate-100 hover:bg-[#f0f9ff]/60 py-3 sm:py-3.5 px-1 sm:px-2 transition-colors"
                  >
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">

                      {/* Left Details Block */}
                      <div className="space-y-1 flex-1 min-w-0 pr-2">
                        {/* Meta Tags: Org + Category + Status + State */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                            <Building2 size={13} className="text-[#0A9FFC] shrink-0" />
                            <span className="truncate max-w-[240px] sm:max-w-[320px]">{job.organization}</span>
                          </span>
                          {job.specification && (
                            <span className="rounded bg-[#e0f2fe] px-2 py-0.5 font-bold text-[#0284c7] text-[10px]">
                              {job.specification}
                            </span>
                          )}
                          {job.isUpcoming ? (
                            <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                              <Clock size={10} />
                              Upcoming 2026-27
                            </span>
                          ) : isPast ? (
                            <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                              <Archive size={10} />
                              Past Recruitment
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                              <Flame size={10} className="text-amber-500 fill-amber-500" />
                              Active Form
                            </span>
                          )}
                          {job.state && (
                            <span className="text-[11px] font-medium text-slate-400">
                              • {job.state}
                            </span>
                          )}
                        </div>

                        {/* Job Title Link */}
                        <Link href={`/latest-jobs/${job.slug}`} className="block">
                          <h2 className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#0A9FFC] transition-colors leading-snug">
                            {job.title}
                          </h2>
                        </Link>

                        {/* Qualification info & Tentative Date */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          {job.qualification && (
                            <span className="flex items-center gap-1 line-clamp-1">
                              <GraduationCap size={13} className="shrink-0 text-[#0A9FFC]" />
                              <span>{job.qualification}</span>
                            </span>
                          )}
                          {job.tentativeDate && (
                            <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded text-[11px]">
                              📌 {job.tentativeDate}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Block: Posts Count + Last Date + Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:shrink-0 pt-1 lg:pt-0">
                        {/* Posts */}
                        {job.postCount ? (
                          <div className="text-left sm:text-right min-w-[70px]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none">
                              Posts
                            </span>
                            <span className="text-sm font-extrabold text-[#0284c7] leading-tight">
                              {job.postCount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        ) : null}

                        {/* Last Date */}
                        {job.lastDate ? (
                          <div className="text-left sm:text-right min-w-[82px]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none">
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

                        {/* Action Buttons: Details + Direct Official Apply */}
                        <div className="flex items-center gap-1.5 ml-auto lg:ml-0">
                          <Link
                            href={`/latest-jobs/${job.slug}`}
                            className="btn-outline text-xs py-1.5 px-3 font-semibold"
                          >
                            <span>Details</span>
                            <ArrowUpRight size={12} />
                          </Link>

                          <a
                            href={job.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Direct Official Government Application Portal"
                            className={
                              job.isUpcoming
                                ? 'inline-flex items-center gap-1 rounded-lg border border-amber-600 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-1.5 px-3 transition-colors'
                                : isPast
                                ? 'inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-1.5 px-3 transition-colors'
                                : 'btn-primary text-xs py-1.5 px-3.5 font-bold shadow-none'
                            }
                          >
                            <span>{job.isUpcoming ? 'Portal' : (isPast ? 'Notice' : 'Apply Online')}</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>

                      </div>

                    </div>
                  </div>
                )
              })}

              {/* Load More & Pagination Controls */}
              {displayedJobs.length < filteredJobs.length && (
                <div className="pt-6 pb-8 flex items-center justify-center gap-3">
                  <button
                    onClick={handleLoadMore}
                    className="btn-primary text-xs py-2.5 px-6 font-bold cursor-pointer"
                  >
                    Load More 40 Vacancies (Showing {displayedJobs.length} of {filteredJobs.length.toLocaleString('en-IN')})
                  </button>
                  <button
                    onClick={handleShowAll}
                    className="btn-outline text-xs py-2.5 px-5 font-bold cursor-pointer"
                  >
                    Show All ({filteredJobs.length.toLocaleString('en-IN')})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
