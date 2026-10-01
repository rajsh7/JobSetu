import Link from 'next/link'
import { type DetailedPortalItem } from '@/lib/data'
import { Category } from '@jobsetu/types'

interface Props {
  jobs: DetailedPortalItem[]
}

function getCategoryPath(cat: Category, slug: string) {
  switch (cat) {
    case Category.RESULT:     return `/results/${slug}`
    case Category.ADMIT_CARD: return `/admit-cards/${slug}`
    case Category.PRIVATE_JOB: return `/private-jobs/${slug}`
    default:                  return `/latest-jobs/${slug}`
  }
}

export function BreakingTicker({ jobs }: Props) {
  if (!jobs.length) return null

  const items = [...jobs, ...jobs]

  return (
    <div className="overflow-hidden border-b border-slate-800 bg-[#0f172a] text-white text-sm">
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0f172a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0f172a] to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap py-2 gap-8 pl-[5px] pr-[30px]">
          {items.map((job, idx) => (
            <Link
              key={`${job.id ?? job.slug}-${idx}`}
              href={getCategoryPath(job.category, job.slug)}
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-slate-300 transition-colors hover:text-[#0A9FFC] hover:underline sm:text-sm"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A9FFC]" />
              <span>{job.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
