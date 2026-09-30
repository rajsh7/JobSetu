import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { type Exam } from '@jobsetu/types'

interface EnrichedExam extends Exam {
  eligibility?: string
  nextExamWindow?: string
  patternSummary?: string
  badgeLabel?: string
}

interface Props {
  exams: EnrichedExam[]
}

export function TopExams({ exams }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {exams.map((exam) => (
        <div
          key={exam.id}
          className="job-card group flex flex-col justify-between p-5"
        >
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-md bg-black px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                {exam.badgeLabel ?? exam.category.replace('_', ' ')}
              </span>
              <a
                href={exam.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                title={`Official ${exam.name} Portal`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-black"
              >
                <span>Official Site</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <Link href={`/top-exams/${exam.slug}`}>
              <h3 className="text-base font-bold text-zinc-900 group-hover:text-black group-hover:underline">
                {exam.name}
              </h3>
            </Link>

            <p className="mt-1 text-xs font-medium text-zinc-500">{exam.conductedBy}</p>

            {exam.eligibility && (
              <p className="mt-2 line-clamp-2 text-xs text-zinc-600">
                🎓 {exam.eligibility}
              </p>
            )}

            {exam.nextExamWindow && (
              <p className="mt-2.5 rounded-lg bg-zinc-50 border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-800">
                📌 {exam.nextExamWindow}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs">
            <span className="text-zinc-500 font-medium truncate max-w-[60%]">
              {exam.frequency ?? 'Annual Exam'}
            </span>
            <Link
              href={`/top-exams/${exam.slug}`}
              className="inline-flex items-center gap-1 font-bold text-black hover:underline"
            >
              <span>Exam Details</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
