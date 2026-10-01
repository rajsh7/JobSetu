import Link from 'next/link'
import { ArrowUpRight, ExternalLink, Calendar, Briefcase, FileCheck2, IdCard } from 'lucide-react'
import { type DetailedPortalItem } from '@/lib/data'

interface Props {
  govtJobs:   DetailedPortalItem[]
  results:    DetailedPortalItem[]
  admitCards: DetailedPortalItem[]
}

export function SarkariBoard({ govtJobs, results, admitCards }: Props) {
  const columns = [
    {
      title:    'Latest Sarkari Jobs',
      icon:     Briefcase,
      badge:    'Active Forms',
      badgeCls: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
      href:     '/latest-jobs',
      viewAll:  'View All Sarkari Jobs',
      items:    govtJobs,
      renderMeta: (job: DetailedPortalItem) => (
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[#6E6658]">
          <span className="font-medium text-[#4F4A41]">{job.organization}</span>
          {job.postCount && (
            <span className="rounded bg-[#e8f2f2] px-2 py-0.5 font-semibold text-[#254E58] border border-[#88BDBC]">
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
      ),
      getHref: (job: DetailedPortalItem) => `/latest-jobs/${job.slug}`,
    },
    {
      title:    'Sarkari Results',
      icon:     FileCheck2,
      badge:    'Declared',
      badgeCls: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
      href:     '/results',
      viewAll:  'View All Exam Results',
      items:    results,
      renderMeta: (res: DetailedPortalItem) => (
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[#6E6658]">
          <span className="font-medium text-[#4F4A41]">{res.organization}</span>
          <span className="rounded bg-rose-50 px-2 py-0.5 font-semibold text-rose-700 border border-rose-200">
            {res.resultDateText ?? 'Result Out'}
          </span>
        </div>
      ),
      getHref: (job: DetailedPortalItem) => `/results/${job.slug}`,
    },
    {
      title:    'Admit Cards',
      icon:     IdCard,
      badge:    'Hall Tickets',
      badgeCls: 'bg-[#88BDBC]/20 text-[#88BDBC] border border-[#88BDBC]/40',
      href:     '/admit-cards',
      viewAll:  'View All Admit Cards',
      items:    admitCards,
      renderMeta: (card: DetailedPortalItem) => (
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[#6E6658]">
          <span className="font-medium text-[#4F4A41]">{card.organization}</span>
          <span className="rounded bg-[#e8f2f2] px-2 py-0.5 font-semibold text-[#254E58] border border-[#88BDBC]">
            {card.admitCardDateText ?? 'Download Open'}
          </span>
          {card.examDateText && (
            <span className="text-[#4F4A41] font-medium">Exam: {card.examDateText}</span>
          )}
        </div>
      ),
      getHref: (job: DetailedPortalItem) => `/admit-cards/${job.slug}`,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {columns.map((col) => {
        const Icon = col.icon
        return (
          <div
            key={col.title}
            className="flex flex-col overflow-hidden rounded-2xl border-2 border-[#254E58] bg-white shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#254E58] px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Icon size={17} />
                <h2 className="text-sm font-bold tracking-tight text-white sm:text-base">{col.title}</h2>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${col.badgeCls}`}>
                {col.badge}
              </span>
            </div>

            {/* Items */}
            <ul className="flex-1 divide-y divide-[#e8f2f2]">
              {col.items.map((item) => (
                <li key={item.id} className="group px-4 py-3 transition-colors hover:bg-[#f4f8f8]">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={col.getHref(item)}
                      className="text-sm font-bold leading-snug text-[#112D32] group-hover:text-[#254E58] group-hover:underline"
                    >
                      {item.title}
                    </Link>
                    <a
                      href={item.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Official Website"
                      className="shrink-0 rounded-md border border-[#d1dfe0] p-1.5 text-[#6E6658] transition-colors hover:border-[#254E58] hover:bg-[#254E58] hover:text-white"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  {col.renderMeta(item)}
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-[#d1dfe0] bg-[#f4f8f8] px-4 py-2.5 text-center">
              <Link
                href={col.href}
                className="inline-flex items-center gap-1 text-sm font-bold text-[#254E58] hover:text-[#112D32] hover:underline"
              >
                <span>{col.viewAll}</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
