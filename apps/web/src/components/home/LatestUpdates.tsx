import Link from 'next/link'
import { Calendar, ArrowUpRight, ExternalLink, Building2 } from 'lucide-react'
import { type DetailedPortalItem } from '@/lib/data'
import { Category } from '@jobsetu/types'

const categoryBadge: Record<Category, string> = {
  [Category.GOVT_JOB]: 'badge-govt',
  [Category.PRIVATE_JOB]: 'badge-private',
  [Category.ADMIT_CARD]: 'badge-admit',
  [Category.RESULT]: 'badge-result',
  [Category.EXAM]: 'badge-exam',
  [Category.ANSWER_KEY]: 'badge-govt',
  [Category.SYLLABUS]: 'badge-govt',
}

const categoryLabel: Record<Category, string> = {
  [Category.GOVT_JOB]: 'Sarkari Job',
  [Category.PRIVATE_JOB]: 'Private / MNC',
  [Category.ADMIT_CARD]: 'Admit Card',
  [Category.RESULT]: 'Result',
  [Category.EXAM]: 'Exam',
  [Category.ANSWER_KEY]: 'Answer Key',
  [Category.SYLLABUS]: 'Syllabus',
}

function getDetailHref(item: DetailedPortalItem) {
  switch (item.category) {
    case Category.RESULT:
      return `/results/${item.slug}`
    case Category.ADMIT_CARD:
      return `/admit-cards/${item.slug}`
    case Category.PRIVATE_JOB:
      return `/private-jobs/${item.slug}`
    default:
      return `/latest-jobs/${item.slug}`
  }
}

interface Props {
  jobs: DetailedPortalItem[]
}

export function LatestUpdates({ jobs }: Props) {
  if (!jobs.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 py-12 text-center text-zinc-500">
        No updates found. Check back soon!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {jobs.map((job) => (
        <div key={job.id} className="job-card group flex flex-col justify-between p-5">
          <div>
            {/* Category Badge & External Link */}
            <div className="mb-3 flex items-center justify-between">
              <span className={categoryBadge[job.category]}>{categoryLabel[job.category]}</span>
              <a
                href={job.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Official Link"
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-black"
              >
                <span>Official</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Title */}
            <Link href={getDetailHref(job)} className="block">
              <h3 className="mb-2 line-clamp-2 text-[15px] font-bold text-zinc-900 group-hover:text-black group-hover:underline">
                {job.title}
              </h3>
            </Link>

            {/* Organization */}
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-zinc-600">
              <Building2 size={13} className="shrink-0 text-zinc-400" />
              <span className="truncate">{job.organization}</span>
            </p>

            {/* Qualification */}
            {job.qualification && (
              <p className="mb-3 line-clamp-1 text-xs text-zinc-500">
                🎓 {job.qualification}
              </p>
            )}
          </div>

          {/* Card Footer */}
          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs">
            {job.lastDate ? (
              <span className="flex items-center gap-1 font-semibold text-rose-600">
                <Calendar size={12} />
                Last: {new Date(job.lastDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </span>
            ) : (
              <span className="font-medium text-zinc-500">{job.state ?? 'All India'}</span>
            )}

            <Link
              href={getDetailHref(job)}
              className="inline-flex items-center gap-1 font-bold text-black hover:underline"
            >
              <span>View Details</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
