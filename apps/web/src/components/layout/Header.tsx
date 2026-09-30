import Link from 'next/link'
import Image from 'next/image'
import { Search, Menu } from 'lucide-react'

const navLinks = [
  { label: '🏛️ Sarkari Jobs', href: '/latest-jobs' },
  { label: '📋 Results', href: '/results' },
  { label: '🪪 Admit Cards', href: '/admit-cards' },
  { label: '💼 Private Jobs', href: '/private-jobs' },
  { label: '🏆 Top Exams', href: '/top-exams' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-blue shadow-md">
      <div className="container-main flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-heading font-bold text-white tracking-tight">
            🌉 <span className="text-brand-orange">Job</span>Setu
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-blue-100 transition-colors hover:bg-blue-800 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Icon (mobile) + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/search" aria-label="Search" className="rounded-md p-2 text-white hover:bg-blue-800">
            <Search size={20} />
          </Link>
          <button
            aria-label="Open menu"
            className="rounded-md p-2 text-white hover:bg-blue-800"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className="border-t border-blue-800 md:hidden">
        <div className="container-main flex overflow-x-auto gap-1 py-2 pb-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full bg-blue-800 px-3 py-1 text-xs font-medium text-white whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
