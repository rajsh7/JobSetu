import Link from 'next/link'
import Image from 'next/image'
import { Search, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { label: 'Sarkari Jobs', href: '/latest-jobs', badge: 'NEW' },
  { label: 'Results',      href: '/results' },
  { label: 'Admit Cards',  href: '/admit-cards' },
  { label: 'Private Jobs', href: '/private-jobs' },
  { label: 'Top Exams',   href: '/top-exams' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="w-full pl-[5px] pr-[30px] flex items-center justify-between py-2.5">

        {/* Logo */}
        <Link href="/" className="group flex items-center">
          <Image
            src="/logo.png"
            alt="JobSetu — Your Bridge to a Brighter Career"
            width={160}
            height={60}
            priority
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[15px] font-medium text-slate-700 transition-all hover:bg-[#f0f9ff] hover:text-[#0A9FFC]"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="rounded bg-[#0A9FFC] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/search"
            aria-label="Search Jobs, Results & Admit Cards"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700 transition-all hover:border-[#0A9FFC] hover:bg-white hover:text-[#0A9FFC]"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search Portal...</span>
          </Link>

          <Link
            href="/top-exams"
            className="hidden items-center gap-1 rounded-lg bg-[#0A9FFC] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#008be3] sm:inline-flex"
          >
            <span>Explore Exams</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Mobile Pill Bar */}
      <nav className="border-t border-slate-100 bg-slate-50/80 lg:hidden">
        <div className="w-full pl-[5px] pr-[30px] flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:border-[#0A9FFC] hover:bg-[#0A9FFC] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
