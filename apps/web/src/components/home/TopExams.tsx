import Link from 'next/link'
import { type Exam } from '@jobsetu/types'

const examColors: Record<string, string> = {
  UPSC: 'border-l-4 border-l-red-500',
  SSC: 'border-l-4 border-l-blue-500',
  BANKING: 'border-l-4 border-l-green-500',
  RAILWAY: 'border-l-4 border-l-orange-500',
  STATE_PSC: 'border-l-4 border-l-purple-500',
  DEFENCE: 'border-l-4 border-l-slate-500',
  TEACHING: 'border-l-4 border-l-yellow-500',
  POLICE: 'border-l-4 border-l-cyan-500',
  OTHER: 'border-l-4 border-l-gray-400',
}

interface Props {
  exams: Exam[]
}

export function TopExams({ exams }: Props) {
  if (!exams.length) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {['UPSC', 'SSC', 'IBPS', 'Railway', 'State PSC', 'Defence', 'Teaching', 'Police'].map((name) => (
          <div key={name} className={`job-card p-4 ${examColors['OTHER']}`}>
            <p className="font-semibold text-sm text-slate-700">{name}</p>
            <p className="text-xs text-slate-400 mt-1">Coming soon</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {exams.map((exam) => (
        <Link
          key={exam.id}
          href={`/top-exams/${exam.slug}`}
          className={`job-card block p-4 hover:no-underline ${examColors[exam.category] ?? examColors['OTHER']}`}
        >
          <p className="font-semibold text-sm text-slate-700 group-hover:text-brand-blue">
            {exam.name}
          </p>
          <p className="text-xs text-slate-500 mt-1">{exam.conductedBy}</p>
          {exam.frequency && (
            <p className="mt-2 text-xs text-brand-orange font-medium">{exam.frequency}</p>
          )}
        </Link>
      ))}
    </div>
  )
}
