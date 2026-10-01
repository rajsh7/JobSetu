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
  Flame,
  Wrench,
  Stethoscope,
  Search,
  Archive,
  MapPin,
  Calendar,
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

const SPEC_STYLES: Record<string, { bg: string; text: string; border: string; iconColor: string }> = {
  Teaching:    { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', iconColor: 'text-emerald-600' },
  Defence:     { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   iconColor: 'text-amber-600' },
  UPSC:        { bg: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-200',  iconColor: 'text-indigo-600' },
  SSC:         { bg: 'bg-sky-50',     text: 'text-[#0284c7]',   border: 'border-sky-200',     iconColor: 'text-[#0A9FFC]' },
  Railway:     { bg: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200',    iconColor: 'text-teal-600' },
  Police:      { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200',    iconColor: 'text-rose-600' },
  Banking:     { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    iconColor: 'text-blue-600' },
  'State PSC': { bg: 'bg-purple-50',  text: 'text-purple-700',  border: 'border-purple-200',  iconColor: 'text-purple-600' },
  Engineering: { bg: 'bg-cyan-50',    text: 'text-cyan-800',    border: 'border-cyan-200',    iconColor: 'text-cyan-600' },
  Medical:     { bg: 'bg-pink-50',    text: 'text-pink-700',    border: 'border-pink-200',    iconColor: 'text-pink-600' },
}

const QUAL_FILTERS = ['All', '10th Pass', '12th Pass', 'Graduate', 'B.Tech/Engg', 'Medical']

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
        if (selectedQual === '10th Pass' && !qualText.includes('10th') && !qualText.includes('matric')) return false
        if (selectedQual === '12th Pass' && !qualText.includes('12th') && !qualText.includes('10+2') && !qualText.includes('intermediate')) return false
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

  const displayedJobs = filteredJobs.slice(0, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_STEP)
  }

  const handleShowAll = () => {
    setVisibleCount(filteredJobs.length)
  }

  return (
    <div className="w-full">
      {/* 2-Column Layout: Left Specification Sidebar + Wide Right Vacancy Stream */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 w-full">

        {/* ── LEFT SIDEBAR: Clean & Attractive Specifications ────────────── */}
        <aside className="w-full lg:w-[240px] shrink-0">
          <div className="sticky top-16 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="h-3.5 w-1 rounded-full bg-[#0A9FFC]" />
                Govt Categories
              </h2>
              <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-black text-[#0284c7]">
                {jobs.length.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Desktop: Vertical List | Mobile: Horizontal Scrollable Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible lg:pb-0">
              {SPECIFICATIONS.map((spec) => {
                const Icon = spec.icon
                const isActive = selectedSpec === spec.id
                const count = counts[spec.id] ?? 0
                const style = SPEC_STYLES[spec.id]

                return (
                  <button
                    key={spec.id}
                    onClick={() => {
                      setSelectedSpec(spec.id)
                      setVisibleCount(INITIAL_PAGE_SIZE)
                    }}
                    className={`flex shrink-0 items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all lg:w-full cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0A9FFC] to-[#0284c7] text-white shadow-xs font-bold'
                        : 'text-slate-700 hover:bg-[#f0f9ff] hover:text-[#0A9FFC] bg-slate-50 lg:bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        size={15}
                        className={isActive ? 'text-white' : style ? style.iconColor : 'text-[#0A9FFC]'}
                      />
                      <span className="truncate">{spec.label}</span>
                    </div>
                    <span
                      className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold shrink-0 ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-slate-100 text-slate-600'
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

        {/* ── RIGHT CONTENT: Single Row Vacancies Stream ─────────────────── */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Top Status Tabs + Search Bar + Qualification Pills */}
          <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs space-y-3">
            {/* Status Filter Tabs */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All Vacancies ({jobs.length.toLocaleString('en-IN')})
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('active')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'active'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active Now ({activeCount})</span>
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('upcoming')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'upcoming'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <Clock size={12} />
                  <span>Upcoming 2026-27 ({upcomingCount})</span>
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('past')
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'past'
                      ? 'bg-slate-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Archive size={12} />
                  <span>Past Archive ({pastCount.toLocaleString('en-IN')})</span>
                </button>
              </div>

              <span className="text-xs font-bold text-slate-500">
                Showing {Math.min(visibleCount, filteredJobs.length)} of {filteredJobs.length.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Live Search Input + Quick Eligibility Chips */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setVisibleCount(INITIAL_PAGE_SIZE)
                  }}
                  placeholder="Search jobs by Exam, Department, Post (e.g. SSC CGL, Railway NTPC, Constable, Bank PO, UPPSC)..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#0A9FFC] focus:bg-white transition-all"
                />
              </div>

              {/* Student Eligibility Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {QUAL_FILTERS.map((qual) => {
                  const isSelected = selectedQual === qual
                  return (
                    <button
                      key={qual}
                      onClick={() => {
                        setSelectedQual(qual)
                        setVisibleCount(INITIAL_PAGE_SIZE)
                      }}
                      className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
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

          {/* Vacancy Rows List */}
          {filteredJobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
              <p className="font-bold text-base text-slate-700">No vacancies found matching your current filter.</p>
              <button
                onClick={() => {
                  setSelectedSpec('all')
                  setStatusFilter('all')
                  setSelectedQual('All')
                  setSearchQuery('')
                }}
                className="mt-3 inline-flex items-center gap-1 rounded-xl bg-[#0A9FFC] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#008be3] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {displayedJobs.map((job) => {
                const isPast = !job.isUpcoming && job.lastDate && new Date(job.lastDate) < new Date('2026-10-01')
                const specStyle = job.specification ? SPEC_STYLES[job.specification] : null

                return (
                  <div
                    key={job.id}
                    className="group rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:border-[#0A9FFC] hover:shadow-md transition-all duration-150"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                      {/* Left: Organization + Badges + Title + Qualification */}
                      <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                        {/* Meta Tags Row */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {/* Organization with Icon */}
                          <span className="inline-flex items-center gap-1.5 font-bold text-slate-800">
                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-100 text-[#0284c7]">
                              <Building2 size={12} />
                            </span>
                            <span className="truncate max-w-[260px] sm:max-w-[340px]">{job.organization}</span>
                          </span>

                          {/* Specification Tag with Distinct Color */}
                          {job.specification && specStyle && (
                            <span className={`rounded-md border px-2 py-0.5 font-bold text-[11px] ${specStyle.bg} ${specStyle.text} ${specStyle.border}`}>
                              {job.specification}
                            </span>
                          )}

                          {/* Status Badge with Visual Indicator */}
                          {job.isUpcoming ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-300 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                              <Clock size={11} className="text-amber-700" />
                              Upcoming 2026-27
                            </span>
                          ) : isPast ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-300 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                              <Archive size={11} className="text-slate-500" />
                              Past Recruitment
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <Flame size={11} className="text-amber-500 fill-amber-500" />
                              Active Form
                            </span>
                          )}

                          {/* State Tag */}
                          {job.state && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                              <MapPin size={11} className="text-slate-400" />
                              {job.state}
                            </span>
                          )}
                        </div>

                        {/* Title (Prominent, High Readability) */}
                        <Link href={`/latest-jobs/${job.slug}`} className="block">
                          <h2 className="text-base sm:text-[17px] font-extrabold text-slate-900 group-hover:text-[#0A9FFC] transition-colors leading-snug">
                            {job.title}
                          </h2>
                        </Link>

                        {/* Eligibility & Dates Pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          {job.qualification && (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 border border-sky-200/80 px-2.5 py-1 text-xs font-medium text-slate-700">
                              <GraduationCap size={13} className="shrink-0 text-[#0A9FFC]" />
                              <strong className="text-[#0284c7] font-bold">Eligibility:</strong>
                              <span className="line-clamp-1">{job.qualification}</span>
                            </span>
                          )}
                          {job.tentativeDate && (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-200/80 px-2.5 py-1 text-xs font-semibold text-amber-800">
                              <Calendar size={12} className="text-amber-600" />
                              <span>{job.tentativeDate}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Posts Count + Last Date + Buttons */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:shrink-0 pt-2 lg:pt-0 border-t border-slate-100 lg:border-t-0">
                        {/* Posts Count Badge */}
                        {job.postCount ? (
                          <div className="rounded-xl bg-sky-50 border border-sky-200/90 px-3.5 py-1.5 text-center min-w-[85px]">
                            <span className="text-[9px] uppercase font-bold tracking-wider text-sky-600 block leading-none">
                              Vacancies
                            </span>
                            <span className="text-sm sm:text-base font-black text-[#0284c7] leading-tight block mt-0.5">
                              {job.postCount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        ) : null}

                        {/* Last Date Badge */}
                        {job.lastDate ? (
                          <div className={`rounded-xl border px-3.5 py-1.5 text-center min-w-[95px] ${
                            isPast
                              ? 'bg-slate-50 border-slate-200 text-slate-500'
                              : 'bg-rose-50 border-rose-200/90 text-rose-700'
                          }`}>
                            <span className={`text-[9px] uppercase font-bold tracking-wider block leading-none ${
                              isPast ? 'text-slate-400' : 'text-rose-600'
                            }`}>
                              {job.isUpcoming ? 'Tentative' : (isPast ? 'Form Closed' : 'Last Date')}
                            </span>
                            <span className={`text-xs sm:text-[13px] font-black leading-tight block mt-0.5 ${
                              isPast ? 'text-slate-600' : 'text-rose-700'
                            }`}>
                              {new Date(job.lastDate).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: '2-digit',
                              })}
                            </span>
                          </div>
                        ) : null}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-auto lg:ml-0">
                          <Link
                            href={`/latest-jobs/${job.slug}`}
                            className="inline-flex items-center gap-1 rounded-xl border-2 border-[#0A9FFC] bg-white px-3.5 py-2 text-xs font-bold text-[#0A9FFC] hover:bg-sky-50 transition-all cursor-pointer"
                          >
                            <span>Details</span>
                            <ArrowUpRight size={13} />
                          </Link>

                          <a
                            href={job.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Direct Official Government Application Portal"
                            className={
                              job.isUpcoming
                                ? 'inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2 px-4 transition-all shadow-xs'
                                : isPast
                                ? 'inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 px-4 transition-all'
                                : 'inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0A9FFC] to-[#0284c7] hover:from-[#008be3] hover:to-[#0369a1] text-white font-bold text-xs py-2 px-4 transition-all shadow-xs hover:shadow-md'
                            }
                          >
                            <span>{job.isUpcoming ? 'Portal' : (isPast ? 'Notice' : 'Apply Online')}</span>
                            <ExternalLink size={13} />
                          </a>
                        </div>

                      </div>

                    </div>
                  </div>
                )
              })}

              {/* Load More & Show All Controls */}
              {displayedJobs.length < filteredJobs.length && (
                <div className="pt-6 pb-8 flex items-center justify-center gap-3">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0A9FFC] to-[#0284c7] px-6 py-3 text-xs font-bold text-white shadow-xs hover:from-[#008be3] hover:to-[#0369a1] cursor-pointer"
                  >
                    Load More 40 Vacancies (Showing {displayedJobs.length} of {filteredJobs.length.toLocaleString('en-IN')})
                  </button>
                  <button
                    onClick={handleShowAll}
                    className="inline-flex items-center gap-1 rounded-xl border-2 border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:border-[#0A9FFC] hover:text-[#0A9FFC] cursor-pointer"
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
