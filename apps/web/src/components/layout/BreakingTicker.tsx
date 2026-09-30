'use client'

import { type LatestUpdate } from '@jobsetu/types'
import { Megaphone } from 'lucide-react'

interface Props {
  jobs: LatestUpdate[]
}

export function BreakingTicker({ jobs }: Props) {
  if (!jobs.length) return null

  return (
    <div className="flex items-center gap-0 overflow-hidden bg-brand-orange text-white text-sm">
      {/* Label */}
      <div className="flex shrink-0 items-center gap-1.5 bg-red-600 px-3 py-2 font-semibold">
        <Megaphone size={14} />
        <span>LATEST</span>
      </div>

      {/* Scrolling text */}
      <div className="relative flex-1 overflow-hidden py-2">
        <div
          className="flex animate-ticker gap-8 whitespace-nowrap"
          style={{ animation: 'ticker 30s linear infinite' }}
        >
          {[...jobs, ...jobs].map((job, i) => (
            <a
              key={`${job.id}-${i}`}
              href={`/latest-jobs/${job.slug}`}
              className="hover:underline"
            >
              📌 {job.title}
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
