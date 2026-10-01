'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Sparkles } from 'lucide-react'

const quickTags = [
  { label: 'SSC CGL 2026',        href: '/latest-jobs/ssc-cgl-recruitment-2026' },
  { label: 'UPSC Mains Result',   href: '/results/upsc-civil-services-mains-result-2026' },
  { label: 'RRB NTPC 11,558 Posts', href: '/latest-jobs/railway-rrb-ntpc-recruitment-2026' },
  { label: 'SSC MTS Admit Card',  href: '/admit-cards/ssc-mts-havaldar-admit-card-2026' },
  { label: 'TCS NQT 2026',        href: '/private-jobs/tcs-nqt-off-campus-hiring-2026' },
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
        className="flex items-center overflow-hidden rounded-xl border-2 border-[#254E58] bg-white p-1.5 shadow-[0_8px_30px_rgb(17,45,50,0.10)] transition-all focus-within:ring-4 focus-within:ring-[#88BDBC]/40"
      >
        <div className="pl-3 pr-2 text-[#88BDBC]">
          <Search size={20} />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Sarkari Jobs, Results, Admit Cards, Private Jobs (e.g. SSC, UPSC, Railway, TCS)..."
          className="flex-1 bg-transparent px-2 py-2.5 text-sm font-medium text-[#112D32] outline-none placeholder:text-[#6E6658] sm:text-base"
          aria-label="Search JobSetu"
          autoComplete="off"
        />
        <button
          type="submit"
          className="rounded-lg bg-[#254E58] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#112D32] sm:px-6 sm:text-base"
        >
          Search
        </button>
      </form>

      {/* Quick Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 font-semibold text-[#6E6658]">
          <Sparkles size={13} className="text-[#254E58]" />
          Popular Now:
        </span>
        {quickTags.map((tag) => (
          <Link
            key={tag.href}
            href={tag.href}
            className="rounded-full border border-[#d1dfe0] bg-white px-3 py-1 font-medium text-[#254E58] transition-all hover:border-[#254E58] hover:bg-[#254E58] hover:text-white"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
