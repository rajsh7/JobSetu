import Link from 'next/link'
import { Briefcase, FileCheck2, IdCard, Building2, Trophy, Award } from 'lucide-react'

const categories = [
  {
    label: 'Top Govt Jobs',
    sublabel: 'Central & State Sarkari',
    href: '#govt-jobs',
    icon: Briefcase,
    badge: '50,000+ Posts',
    dotColor: 'bg-emerald-500',
  },
  {
    label: 'Top Govt Exams',
    sublabel: 'UPSC, SSC, IBPS, RRB',
    href: '#govt-exams',
    icon: Trophy,
    badge: '8 Categories',
    dotColor: 'bg-amber-500',
  },
  {
    label: 'Top Pvt Jobs',
    sublabel: 'MNCs, IT & Banking',
    href: '#private-jobs',
    icon: Building2,
    badge: 'Fresher Drives',
    dotColor: 'bg-violet-500',
  },
  {
    label: 'Top Pvt Exams',
    sublabel: 'TCS NQT, eLitmus, AMCAT',
    href: '#private-exams',
    icon: Award,
    badge: 'Direct Hiring',
    dotColor: 'bg-indigo-500',
  },
  {
    label: 'Sarkari Results',
    sublabel: 'Merit Lists & Cutoffs',
    href: '/results',
    icon: FileCheck2,
    badge: 'Live PDF',
    dotColor: 'bg-rose-500',
  },
  {
    label: 'Admit Cards',
    sublabel: 'Hall Tickets & Status',
    href: '/admit-cards',
    icon: IdCard,
    badge: 'Download',
    dotColor: 'bg-sky-500',
  },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-6">
      {categories.map((cat) => {
        const Icon = cat.icon
        return (
          <Link
            key={cat.label}
            href={cat.href}
            className="job-card group flex flex-col items-center gap-2 p-3 text-center sm:p-4"
          >
            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-black transition-colors group-hover:bg-black group-hover:text-white sm:h-11 sm:w-11">
              <Icon size={18} />
            </div>

            {/* Label */}
            <div>
              <p className="text-[11px] font-bold leading-tight text-black group-hover:underline sm:text-xs">
                {cat.label}
              </p>
              <p className="mt-0.5 hidden text-[10px] font-medium text-zinc-500 sm:block">
                {cat.sublabel}
              </p>
            </div>

            {/* Badge */}
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[9px] font-bold text-zinc-600 sm:text-[10px]">
              <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor}`} />
              {cat.badge}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
