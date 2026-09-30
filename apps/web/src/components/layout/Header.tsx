import Link from 'next/link'
import Image from 'next/image'
import { Search, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { label: 'Sarkari Jobs', href: '/latest-jobs', badge: 'NEW' },
  { label: 'Results', href: '/results' },
  { label: 'Admit Cards', href: '/admit-cards' },
  { label: 'Private Jobs', href: '/private-jobs' },
  { label: 'Top Exams', href: '/top-exams' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      <div className="container-main flex items-center justify-between py-3">
        {/* Official JobSetu Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative h-11 w-44 overflow-hidden sm:h-12 sm:w-48">
            <Image
              src="/logo.png"
              alt="JobSetu — Your Bridge to a Brighter Career"
              fill
              priority
              sizes="200px"
              className="object-cover object-center scale-[1.38]"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[15px] font-medium text-zinc-700 transition-all hover:bg-zinc-100 hover:text-black"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="rounded bg-black px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions: Quick Search & Direct No-Login Badge */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/search"
            aria-label="Search Jobs, Results & Admit Cards"
            className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-black hover:bg-white hover:text-black"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search Portal...</span>
          </Link>

          <Link
            href="/top-exams"
            className="hidden items-center gap-1 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-800 sm:inline-flex"
          >
            <span>Explore Exams</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Mobile Scrollable Pill Bar */}
      <nav className="border-t border-zinc-100 bg-zinc-50/80 lg:hidden">
        <div className="container-main flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-semibold text-zinc-800 shadow-2xs transition-colors hover:border-black hover:bg-black hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
