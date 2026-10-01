import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { type Exam } from '@jobsetu/types'

interface EnrichedExam extends Exam {
  eligibility?:    string
  nextExamWindow?: string
  patternSummary?: string
  badgeLabel?:     string
}

interface Props {
  exams: EnrichedExam[]
}

export function TopExams({ exams }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {exams.map((exam, idx) => (
        <div
          key={`${exam.id ?? exam.slug}-${idx}`}
          className="job-card group flex flex-col justify-between p-5"
        >
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-md bg-[#254E58] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                {exam.badgeLabel ?? exam.category?.replace('_', ' ') ?? 'EXAM'}
              </span>
              <a
                href={exam.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                title={`Official ${exam.name} Portal`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#6E6658] hover:text-[#254E58]"
              >
                <span>Official Site</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <Link href={`/top-exams/${exam.slug}`}>
              <h3 className="text-base font-bold text-[#112D32] group-hover:text-[#254E58] group-hover:underline">
                {exam.name}
              </h3>
            </Link>

            <p className="mt-1 text-xs font-medium text-[#6E6658]">{exam.conductedBy}</p>

            {exam.eligibility && (
              <p className="mt-2 line-clamp-2 text-xs text-[#4F4A41]">
                🎓 {exam.eligibility}
              </p>
            )}

            {exam.nextExamWindow && (
              <p className="mt-2.5 rounded-lg bg-[#e8f2f2] border border-[#88BDBC] px-2.5 py-1.5 text-xs font-semibold text-[#112D32]">
                📌 {exam.nextExamWindow}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#d1dfe0] pt-3 text-xs">
            <span className="text-[#6E6658] font-medium truncate max-w-[60%]">
              {exam.frequency ?? 'Annual Exam'}
            </span>
            <Link
              href={`/top-exams/${exam.slug}`}
              className="inline-flex items-center gap-1 font-bold text-[#254E58] hover:text-[#112D32] hover:underline"
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
