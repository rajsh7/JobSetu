import Link from 'next/link'
import { Calendar, ArrowUpRight } from 'lucide-react'
import { type Job, Category } from '@jobsetu/types'
import { formatDistanceToNow } from '@/lib/utils'

const categoryBadge: Record<Category, string> = {
  [Category.GOVT_JOB]: 'badge-govt',
  [Category.PRIVATE_JOB]: 'badge-private',
  [Category.ADMIT_CARD]: 'badge-admit',
  [Category.RESULT]: 'badge-result',
  [Category.EXAM]: 'badge-admit',
  [Category.ANSWER_KEY]: 'badge-govt',
  [Category.SYLLABUS]: 'badge-govt',
}

const categoryLabel: Record<Category, string> = {
  [Category.GOVT_JOB]: 'Govt Job',
  [Category.PRIVATE_JOB]: 'Private',
  [Category.ADMIT_CARD]: 'Admit Card',
  [Category.RESULT]: 'Result',
  [Category.EXAM]: 'Exam',
  [Category.ANSWER_KEY]: 'Answer Key',
  [Category.SYLLABUS]: 'Syllabus',
}

interface Props {
  jobs: Job[]
}

export function LatestUpdates({ jobs }: Props) {
  if (!jobs.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-slate-500">
        No updates found. Check back soon!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/latest-jobs/${job.slug}`}
          className="job-card group block p-4 hover:no-underline"
        >
          {/* Category Badge */}
          <div className="mb-2 flex items-center justify-between">
            <span className={categoryBadge[job.category]}>
              {categoryLabel[job.category]}
            </span>
            <ArrowUpRight
              size={16}
              className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-blue"
            />
          </div>

          {/* Title */}
          <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-brand-blue">
            {job.title}
          </h3>

          {/* Org */}
          <p className="mb-3 text-xs text-slate-500">{job.organization}</p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            {job.lastDate && (
              <span className="flex items-center gap-1 text-red-500 font-medium">
                <Calendar size={12} />
                Last: {new Date(job.lastDate).toLocaleDateString('en-IN')}
              </span>
            )}
            {job.postCount && (
              <span className="font-medium text-green-600">{job.postCount} Posts</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
