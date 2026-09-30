import Link from 'next/link'
import { type DetailedPortalItem } from '@/lib/data'
import { Category } from '@jobsetu/types'
import { Flame } from 'lucide-react'

interface Props {
  jobs: DetailedPortalItem[]
}

function getCategoryPath(cat: Category, slug: string) {
  switch (cat) {
    case Category.RESULT:
      return `/results/${slug}`
    case Category.ADMIT_CARD:
      return `/admit-cards/${slug}`
    case Category.PRIVATE_JOB:
      return `/private-jobs/${slug}`
    default:
      return `/latest-jobs/${slug}`
  }
}

export function BreakingTicker({ jobs }: Props) {
  if (!jobs.length) return null

  return (
    <div className="border-b border-zinc-800 bg-[#09090B] text-white text-sm">
      <div className="container-main flex items-center gap-3 overflow-hidden py-2">
        {/* Badge */}
        <div className="flex shrink-0 items-center gap-1.5 rounded bg-white px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-black">
          <Flame size={13} className="fill-black" />
          <span>Trending</span>
        </div>

        {/* Ticker Links */}
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-0.5 text-xs sm:text-sm no-scrollbar">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={getCategoryPath(job.category, job.slug)}
              className="inline-flex items-center gap-1.5 font-medium text-zinc-200 transition-colors hover:text-white hover:underline"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span>{job.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
