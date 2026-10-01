'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, X, Loader2, Briefcase, Award, GraduationCap, ArrowRight } from 'lucide-react'
import { Category } from '@jobsetu/types'
import { type DetailedPortalItem } from '@/lib/data'

interface SearchData {
  items: DetailedPortalItem[]
  exams: Array<{
    id: string
    name: string
    slug: string
    conductedBy?: string
  }>
}

export function ExpandableNavbarSearch() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchData | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus()
    }
  }, [isExpanded])

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Esc key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsExpanded(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Debounced search query
  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed || trimmed.length < 2) {
      setResults(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data)
        }
      } catch (err) {
        console.error('Search fetch error:', err)
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => clearTimeout(timer)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsExpanded(false)
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleItemClick = () => {
    setIsExpanded(false)
    setQuery('')
    setResults(null)
  }

  const jobsList = results?.items?.filter((i) => i.category === Category.GOVT_JOB || i.category === Category.PRIVATE_JOB) ?? []
  const resultsList = results?.items?.filter((i) => i.category === Category.RESULT) ?? []
  const examsList = results?.exams ?? []

  return (
    <div ref={containerRef} className="relative z-50">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div
          className={`flex items-center rounded-xl border transition-all duration-200 ${
            isExpanded
              ? 'w-[280px] sm:w-[380px] md:w-[440px] border-[#0A9FFC] bg-white shadow-md ring-2 ring-sky-100'
              : 'w-[160px] sm:w-[200px] border-slate-200 bg-slate-50/80 hover:border-slate-300 hover:bg-white'
          }`}
        >
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="pl-3 pr-1 text-slate-400 hover:text-[#0A9FFC] cursor-pointer"
            aria-label="Search"
          >
            <Search size={15} />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => setIsExpanded(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isExpanded ? 'Search all jobs, results, exams (e.g. UPSC, SSC, RRB)...' : 'Search portal...'}
            className="w-full bg-transparent py-2 pl-2 pr-2 text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />

          {loading ? (
            <div className="pr-3 text-slate-400">
              <Loader2 size={14} className="animate-spin text-[#0A9FFC]" />
            </div>
          ) : query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              className="pr-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      </form>

      {/* Live Search Dropdown Popup */}
      {isExpanded && query.trim().length >= 2 && results && (
        <div className="absolute right-0 top-full mt-2 w-[320px] sm:w-[440px] md:w-[500px] rounded-xl border border-slate-200 bg-white shadow-xl max-h-[460px] overflow-y-auto no-scrollbar p-3 space-y-3">
          
          {/* Section: Matching Govt Jobs */}
          {jobsList.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 mb-1.5">
                <Briefcase size={12} className="text-[#0A9FFC]" />
                <span>Jobs ({jobsList.length})</span>
              </div>
              <div className="divide-y divide-slate-100">
                {jobsList.slice(0, 5).map((job) => (
                  <Link
                    key={job.id}
                    href={`/latest-jobs/${job.slug}`}
                    onClick={handleItemClick}
                    className="block py-2 px-1 hover:bg-sky-50/50 rounded-lg transition-colors group"
                  >
                    <p className="text-xs font-bold text-[#7c3aed] group-hover:underline line-clamp-1">
                      {job.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                      <span className="font-semibold text-slate-700">{job.organization}</span>
                      {job.postCount && <span>• {job.postCount.toLocaleString('en-IN')} Posts</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section: Matching Results */}
          {resultsList.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 mb-1.5">
                <Award size={12} className="text-emerald-600" />
                <span>Results ({resultsList.length})</span>
              </div>
              <div className="divide-y divide-slate-100">
                {resultsList.slice(0, 4).map((res) => (
                  <Link
                    key={res.id}
                    href={`/results/${res.slug}`}
                    onClick={handleItemClick}
                    className="block py-2 px-1 hover:bg-emerald-50/50 rounded-lg transition-colors group"
                  >
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-1">
                      {res.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                      <span className="font-semibold">{res.organization}</span>
                      {res.resultDateText && <span className="text-emerald-600 font-semibold">• Declared: {res.resultDateText}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section: Matching Top Exams */}
          {examsList.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 mb-1.5">
                <GraduationCap size={12} className="text-amber-600" />
                <span>Top Exams ({examsList.length})</span>
              </div>
              <div className="divide-y divide-slate-100">
                {examsList.slice(0, 4).map((ex) => (
                  <Link
                    key={ex.id}
                    href={`/top-exams/${ex.slug}`}
                    onClick={handleItemClick}
                    className="block py-2 px-1 hover:bg-amber-50/50 rounded-lg transition-colors group"
                  >
                    <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700 line-clamp-1">
                      {ex.name}
                    </p>
                    {ex.conductedBy && (
                      <p className="text-[10px] text-slate-500 mt-0.5">By {ex.conductedBy}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {jobsList.length === 0 && resultsList.length === 0 && examsList.length === 0 && (
            <div className="py-6 text-center text-slate-500 text-xs">
              <p>No results found for &ldquo;{query}&rdquo;.</p>
              <button
                type="submit"
                onClick={handleSubmit}
                className="mt-2 text-[#0A9FFC] font-bold hover:underline"
              >
                Search all archives →
              </button>
            </div>
          )}

          {/* Footer View All Link */}
          {(jobsList.length > 0 || resultsList.length > 0 || examsList.length > 0) && (
            <div className="border-t border-slate-100 pt-2 text-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0A9FFC] hover:underline cursor-pointer"
              >
                <span>View all search results for &ldquo;{query}&rdquo;</span>
                <ArrowRight size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
