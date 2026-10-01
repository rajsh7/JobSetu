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
    <header className="sticky top-0 z-50 border-b border-[#d1dfe0] bg-white/95 backdrop-blur-md">
      <div className="container-main flex items-center justify-between py-3">

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
              className="relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[15px] font-medium text-[#4F4A41] transition-all hover:bg-[#e8f2f2] hover:text-[#112D32]"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="rounded bg-[#254E58] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
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
            className="flex items-center gap-2 rounded-lg border border-[#d1dfe0] bg-[#f4f8f8] px-3.5 py-2 text-sm font-medium text-[#4F4A41] transition-all hover:border-[#254E58] hover:bg-white hover:text-[#112D32]"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search Portal...</span>
          </Link>

          <Link
            href="/top-exams"
            className="hidden items-center gap-1 rounded-lg bg-[#254E58] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#112D32] sm:inline-flex"
          >
            <span>Explore Exams</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Mobile Pill Bar */}
      <nav className="border-t border-[#e8f2f2] bg-[#f4f8f8]/80 lg:hidden">
        <div className="container-main flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-[#d1dfe0] bg-white px-3.5 py-1 text-xs font-semibold text-[#254E58] shadow-2xs transition-colors hover:border-[#254E58] hover:bg-[#254E58] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
