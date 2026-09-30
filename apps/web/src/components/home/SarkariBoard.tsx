import Link from 'next/link'
import { ArrowUpRight, ExternalLink, Calendar, Briefcase, FileCheck2, IdCard } from 'lucide-react'
import { type DetailedPortalItem } from '@/lib/data'

interface Props {
  govtJobs: DetailedPortalItem[]
  results: DetailedPortalItem[]
  admitCards: DetailedPortalItem[]
}

export function SarkariBoard({ govtJobs, results, admitCards }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Column 1: Latest Sarkari Jobs */}
      <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-black bg-white shadow-xs">
        <div className="flex items-center justify-between bg-black px-5 py-3.5 text-white">
          <div className="flex items-center gap-2">
            <Briefcase size={18} />
            <h2 className="text-lg font-bold tracking-tight">Latest Sarkari Jobs</h2>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            Active Forms
          </span>
        </div>

        <ul className="divide-y divide-zinc-200 flex-1">
          {govtJobs.map((job) => (
            <li key={job.id} className="group p-4 transition-colors hover:bg-zinc-50">
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/latest-jobs/${job.slug}`}
                  className="text-sm font-bold text-zinc-900 group-hover:text-black group-hover:underline leading-snug"
                >
                  {job.title}
                </Link>
                <a
                  href={job.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Direct Official Website"
                  className="shrink-0 rounded-md border border-zinc-200 p-1.5 text-zinc-500 transition-colors hover:border-black hover:bg-black hover:text-white"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span className="font-medium text-zinc-700">{job.organization}</span>
                {job.postCount && (
                  <span className="rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700 border border-emerald-200">
                    {job.postCount.toLocaleString('en-IN')} Posts
                  </span>
                )}
                {job.lastDate && (
                  <span className="inline-flex items-center gap-1 font-medium text-rose-600">
                    <Calendar size={11} />
                    Last: {new Date(job.lastDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-zinc-200 bg-zinc-50 p-3 text-center">
          <Link
            href="/latest-jobs"
            className="inline-flex items-center gap-1 text-sm font-bold text-black hover:underline"
          >
            <span>View All Sarkari Jobs</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Column 2: Sarkari Exam Results */}
      <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-black bg-white shadow-xs">
        <div className="flex items-center justify-between bg-black px-5 py-3.5 text-white">
          <div className="flex items-center gap-2">
            <FileCheck2 size={18} />
            <h2 className="text-lg font-bold tracking-tight">Sarkari Results</h2>
          </div>
          <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-semibold text-rose-300 border border-rose-500/30">
            Declared
          </span>
        </div>

        <ul className="divide-y divide-zinc-200 flex-1">
          {results.map((res) => (
            <li key={res.id} className="group p-4 transition-colors hover:bg-zinc-50">
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/results/${res.slug}`}
                  className="text-sm font-bold text-zinc-900 group-hover:text-black group-hover:underline leading-snug"
                >
                  {res.title}
                </Link>
                <a
                  href={res.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Direct Official Result Portal"
                  className="shrink-0 rounded-md border border-zinc-200 p-1.5 text-zinc-500 transition-colors hover:border-black hover:bg-black hover:text-white"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span className="font-medium text-zinc-700">{res.organization}</span>
                <span className="rounded bg-rose-50 px-2 py-0.5 font-semibold text-rose-700 border border-rose-200">
                  {res.resultDateText ?? 'Result Out'}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-zinc-200 bg-zinc-50 p-3 text-center">
          <Link
            href="/results"
            className="inline-flex items-center gap-1 text-sm font-bold text-black hover:underline"
          >
            <span>View All Exam Results</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Column 3: Admit Cards */}
      <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-black bg-white shadow-xs">
        <div className="flex items-center justify-between bg-black px-5 py-3.5 text-white">
          <div className="flex items-center gap-2">
            <IdCard size={18} />
            <h2 className="text-lg font-bold tracking-tight">Admit Cards</h2>
          </div>
          <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-semibold text-sky-300 border border-sky-500/30">
            Hall Tickets
          </span>
        </div>

        <ul className="divide-y divide-zinc-200 flex-1">
          {admitCards.map((card) => (
            <li key={card.id} className="group p-4 transition-colors hover:bg-zinc-50">
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/admit-cards/${card.slug}`}
                  className="text-sm font-bold text-zinc-900 group-hover:text-black group-hover:underline leading-snug"
                >
                  {card.title}
                </Link>
                <a
                  href={card.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Direct Official Admit Card Download"
                  className="shrink-0 rounded-md border border-zinc-200 p-1.5 text-zinc-500 transition-colors hover:border-black hover:bg-black hover:text-white"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span className="font-medium text-zinc-700">{card.organization}</span>
                <span className="rounded bg-sky-50 px-2 py-0.5 font-semibold text-sky-700 border border-sky-200">
                  {card.admitCardDateText ?? 'Download Open'}
                </span>
                {card.examDateText && (
                  <span className="text-zinc-600 font-medium">Exam: {card.examDateText}</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-zinc-200 bg-zinc-50 p-3 text-center">
          <Link
            href="/admit-cards"
            className="inline-flex items-center gap-1 text-sm font-bold text-black hover:underline"
          >
            <span>View All Admit Cards</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
