'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Sparkles } from 'lucide-react'

const quickTags = [
  { label: 'SSC CGL 2026', href: '/latest-jobs/ssc-cgl-recruitment-2026' },
  { label: 'UPSC Mains Result', href: '/results/upsc-civil-services-mains-result-2026' },
  { label: 'RRB NTPC 11,558 Posts', href: '/latest-jobs/railway-rrb-ntpc-recruitment-2026' },
  { label: 'SSC MTS Admit Card', href: '/admit-cards/ssc-mts-havaldar-admit-card-2026' },
  { label: 'TCS NQT 2026', href: '/private-jobs/tcs-nqt-off-campus-hiring-2026' },
]

export function HeroSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={handleSearch}
        className="flex items-center overflow-hidden rounded-xl border-2 border-black bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all focus-within:ring-4 focus-within:ring-black/10"
      >
        <div className="pl-3 pr-2 text-zinc-400">
          <Search size={20} />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Sarkari Jobs, Results, Admit Cards, Private Jobs (e.g. SSC, UPSC, Railway, TCS)..."
          className="flex-1 bg-transparent px-2 py-2.5 text-sm font-medium text-black outline-none placeholder:text-zinc-400 sm:text-base"
          aria-label="Search JobSetu"
          autoComplete="off"
        />
        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 sm:px-6 sm:text-base"
        >
          Search
        </button>
      </form>

      {/* Popular Quick Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 font-semibold text-zinc-500">
          <Sparkles size={13} className="text-black" />
          Popular Now:
        </span>
        {quickTags.map((tag) => (
          <Link
            key={tag.href}
            href={tag.href}
            className="rounded-full border border-zinc-300 bg-white px-3 py-1 font-medium text-zinc-800 transition-all hover:border-black hover:bg-black hover:text-white"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
