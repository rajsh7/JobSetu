'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'

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
    <form onSubmit={handleSearch} className="mx-auto flex max-w-2xl items-center gap-0 rounded-xl overflow-hidden shadow-lg">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search jobs, exams, results... (e.g. SSC CGL, UPSC, RRB)"
        className="flex-1 px-4 py-3 text-slate-800 text-sm outline-none placeholder:text-slate-400"
        aria-label="Search JobSetu"
        autoComplete="off"
      />
      <button
        type="submit"
        className="flex items-center gap-2 bg-brand-orange px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        aria-label="Search"
      >
        <Search size={18} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  )
}
