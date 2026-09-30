import Link from 'next/link'
import { Briefcase, FileCheck2, IdCard, Building2, Trophy } from 'lucide-react'

const categories = [
  {
    label: 'Sarkari Jobs',
    sublabel: 'Central & State Govt',
    href: '/latest-jobs',
    icon: Briefcase,
    badge: '50,000+ Posts',
    accent: 'group-hover:bg-black group-hover:text-white',
    dotColor: 'bg-emerald-500',
  },
  {
    label: 'Sarkari Results',
    sublabel: 'Merit Lists & Cutoffs',
    href: '/results',
    icon: FileCheck2,
    badge: 'Updated Live',
    accent: 'group-hover:bg-black group-hover:text-white',
    dotColor: 'bg-rose-500',
  },
  {
    label: 'Admit Cards',
    sublabel: 'Hall Tickets & City Slips',
    href: '/admit-cards',
    icon: IdCard,
    badge: 'Direct Download',
    accent: 'group-hover:bg-black group-hover:text-white',
    dotColor: 'bg-sky-500',
  },
  {
    label: 'Private Jobs',
    sublabel: 'IT, Banking & MNCs',
    href: '/private-jobs',
    icon: Building2,
    badge: 'Fresher Friendly',
    accent: 'group-hover:bg-black group-hover:text-white',
    dotColor: 'bg-violet-500',
  },
  {
    label: 'Top Exams',
    sublabel: 'UPSC, SSC, IBPS, RRB',
    href: '/top-exams',
    icon: Trophy,
    badge: 'Complete Guide',
    accent: 'group-hover:bg-black group-hover:text-white',
    dotColor: 'bg-amber-500',
  },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
      {categories.map((cat) => {
        const Icon = cat.icon
        return (
          <Link
            key={cat.href}
            href={cat.href}
            className="job-card group relative flex flex-col justify-between p-4 sm:p-5"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-black transition-colors ${cat.accent}`}
              >
                <Icon size={20} />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-700">
                <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor}`} />
                {cat.badge}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-bold text-black group-hover:underline sm:text-lg">
                {cat.label}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-zinc-500">{cat.sublabel}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
