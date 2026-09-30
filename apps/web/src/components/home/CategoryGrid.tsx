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
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((cat) => {
        const Icon = cat.icon
        return (
          <Link
            key={cat.label}
            href={cat.href}
            className="job-card group relative flex flex-col justify-between p-4"
          >
            <div className="flex items-center justify-between gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-black transition-colors group-hover:bg-black group-hover:text-white">
                <Icon size={19} />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-bold text-zinc-700">
                <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor}`} />
                {cat.badge}
              </span>
            </div>

            <div className="mt-3.5">
              <h3 className="text-[15px] font-bold text-black group-hover:underline">
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
