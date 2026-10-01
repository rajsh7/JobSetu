import Link from 'next/link'
import { ExternalLink, ArrowUpRight, Calendar, Building2, Flame } from 'lucide-react'
import { type DetailedPortalItem } from '@/lib/data'

interface Props {
  vacancies: DetailedPortalItem[]
}

export function NewVacanciesHero({ vacancies }: Props) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Section Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#88BDBC] bg-[#e8f2f2] px-3 py-1 text-xs font-bold text-[#254E58]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="uppercase tracking-wider">New Vacancy 2026 • Active Online Forms</span>
          </div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#112D32] sm:text-3xl">
            Latest Government Job Vacancies
          </h1>
          <p className="mt-0.5 text-xs font-medium text-[#6E6658] sm:text-sm">
            Direct verified official application links to Central &amp; State government recruitment portals.
          </p>
        </div>

        <Link
          href="/latest-jobs"
          className="btn-outline self-start py-2 px-3.5 text-xs sm:self-auto sm:text-sm"
        >
          <span>All Vacancies</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Vacancies Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vacancies.slice(0, 6).map((job) => (
          <div
            key={job.id}
            className="job-card group flex flex-col justify-between p-4 sm:p-5"
          >
            <div>
              {/* Top Row: Organization + Post Count Badge */}
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#6E6658]">
                  <Building2 size={13} className="text-[#88BDBC]" />
                  <span className="truncate max-w-[170px] sm:max-w-[200px]">{job.organization}</span>
                </span>
                {job.postCount && (
                  <span className="shrink-0 rounded-full border border-[#88BDBC] bg-[#e8f2f2] px-2.5 py-0.5 text-[11px] font-bold text-[#254E58]">
                    {job.postCount.toLocaleString('en-IN')} Posts
                  </span>
                )}
              </div>

              {/* Job Title */}
              <Link href={`/latest-jobs/${job.slug}`} className="block">
                <h2 className="line-clamp-2 text-[15px] font-bold leading-snug text-[#112D32] group-hover:text-[#254E58] group-hover:underline sm:text-base">
                  {job.title}
                </h2>
              </Link>

              {/* Qualification */}
              {job.qualification && (
                <p className="mt-2 line-clamp-1 text-xs text-[#4F4A41]">
                  🎓 {job.qualification}
                </p>
              )}
            </div>

            {/* Bottom Row: Last Date & Direct Apply Action Buttons */}
            <div className="mt-4 border-t border-[#d1dfe0] pt-3">
              <div className="mb-3 flex items-center justify-between text-xs">
                {job.lastDate ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                    <Calendar size={12} />
                    Last Date: {new Date(job.lastDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                ) : (
                  <span className="font-medium text-[#6E6658]">{job.state ?? 'All India'}</span>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <Flame size={12} className="text-amber-500 fill-amber-500" />
                  Active
                </span>
              </div>

              {/* Action Buttons: Direct Apply + Details */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/latest-jobs/${job.slug}`}
                  className="btn-outline py-2 px-3 text-xs justify-center"
                >
                  <span>Details</span>
                  <ArrowUpRight size={13} />
                </Link>
                <a
                  href={job.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Direct Official Application Portal"
                  className="btn-primary py-2 px-3 text-xs justify-center font-bold"
                >
                  <span>Apply Online</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
