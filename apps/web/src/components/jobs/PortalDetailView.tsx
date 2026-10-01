import Link from 'next/link'
import {
  ExternalLink,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Building2,
  CheckCircle2,
  GraduationCap,
  Clock,
  Briefcase,
  Users,
  MapPin,
  Flame,
} from 'lucide-react'
import { type DetailedPortalItem } from '@/lib/data'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface Props {
  item: DetailedPortalItem
  backHref: string
  backLabel: string
}

export function PortalDetailView({ item, backHref, backLabel }: Props) {
  const links = item.importantLinks ?? [
    { label: 'Go to Official Portal / Apply Online', url: item.officialLink, highlight: true },
  ]

  const isPast = !item.isUpcoming && item.lastDate && new Date(item.lastDate) < new Date('2026-10-01')

  return (
    <>
      <Header />
      <main className="py-6 sm:py-10 bg-[#f8fafc]">
        <div className="container-main max-w-4xl">
          {/* Back Breadcrumb */}
          <Link
            href={backHref}
            className="mb-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#0A9FFC] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to {backLabel}</span>
          </Link>

          {/* Main Structured Sheet */}
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Top Banner */}
            <div className="border-b border-slate-200 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 text-white sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-sky-500/20 text-[#0A9FFC]">
                  <Building2 size={13} />
                </span>
                <span>{item.organization}</span>
                {item.specification && (
                  <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                    {item.specification}
                  </span>
                )}
                {item.state && (
                  <span className="text-slate-400 font-semibold">• 📍 {item.state}</span>
                )}
              </div>

              <h1 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-white">
                {item.title}
              </h1>

              {/* Status and Posts Highlight */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                {item.isUpcoming ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-400/40 px-3 py-1 font-bold text-amber-300">
                    <Clock size={12} />
                    Upcoming Recruitment 2026-27
                  </span>
                ) : isPast ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-700 px-3 py-1 font-semibold text-slate-300">
                    Form Closed / Past Archive
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 font-bold text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <Flame size={12} className="text-amber-400 fill-amber-400" />
                    Active Notification — Apply Now
                  </span>
                )}

                {item.postCount && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/20 border border-sky-400/40 px-3 py-1 font-bold text-sky-200">
                    <Users size={12} />
                    {item.postCount.toLocaleString('en-IN')} Total Posts
                  </span>
                )}
              </div>

              {item.shortInfo && (
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">{item.shortInfo}</p>
              )}
            </div>

            {/* ── EDUCATIONAL QUALIFICATION & ELIGIBILITY (Requested by User) ── */}
            <div className="border-b border-slate-200 bg-sky-50/60 p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A9FFC] text-white shadow-2xs">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                    Educational Qualification &amp; Eligibility
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Required eligibility criteria for students and job seekers
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-sky-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
                {/* Primary Qualification Box */}
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0284c7] block">
                    🎓 Prescribed Educational Qualification:
                  </span>
                  <p className="mt-1 text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    {item.qualification || item.eligibility || 'Check official notification for detailed qualifications.'}
                  </p>
                </div>

                {/* Additional Eligibility Details if distinct */}
                {item.eligibility && item.eligibility !== item.qualification && (
                  <div className="border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                      📋 Additional Eligibility Notes:
                    </span>
                    <p className="mt-1 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                      {item.eligibility}
                    </p>
                  </div>
                )}

                {/* Quick Info Badges */}
                <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-xs">
                  {item.postCount && (
                    <span className="rounded-lg bg-sky-50 border border-sky-200 px-2.5 py-1 font-bold text-[#0284c7]">
                      👥 {item.postCount.toLocaleString('en-IN')} Vacancies
                    </span>
                  )}
                  {(item.ageLimitMin || item.ageLimitMax) && (
                    <span className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 font-bold text-amber-800">
                      🎂 Age: {item.ageLimitMin ?? 18} to {item.ageLimitMax ?? 35} Years
                    </span>
                  )}
                  {item.specification && (
                    <span className="rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 py-1 font-bold text-indigo-700">
                      🏷️ Category: {item.specification}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 2-Column Table: Important Dates & Application Fee */}
            <div className="grid grid-cols-1 divide-y border-b border-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0 divide-slate-200">
              {/* Important Dates */}
              <div className="p-5 sm:p-6">
                <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                  <Calendar size={16} className="text-[#0A9FFC]" />
                  <span>Important Dates</span>
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {item.applicationBegin && (
                    <li className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Application Begin:</span>
                      <strong className="text-slate-900">{item.applicationBegin}</strong>
                    </li>
                  )}
                  {item.lastDate && (
                    <li className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Last Date to Apply:</span>
                      <strong className="text-rose-600 font-extrabold">
                        {new Date(item.lastDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </strong>
                    </li>
                  )}
                  {item.feeLastDate && (
                    <li className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Fee Payment Last Date:</span>
                      <strong className="text-slate-900">{item.feeLastDate}</strong>
                    </li>
                  )}
                  {item.examDateText && (
                    <li className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Exam Date:</span>
                      <strong className="text-[#0284c7]">{item.examDateText}</strong>
                    </li>
                  )}
                  {item.admitCardDateText && (
                    <li className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Admit Card:</span>
                      <strong className="text-[#0284c7]">{item.admitCardDateText}</strong>
                    </li>
                  )}
                  {item.resultDateText && (
                    <li className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Result Status:</span>
                      <strong className="text-emerald-600">{item.resultDateText}</strong>
                    </li>
                  )}
                </ul>
              </div>

              {/* Application Fee & Age Limit */}
              <div className="p-5 sm:p-6">
                <h2 className="mb-3 text-base font-bold text-slate-900">
                  Application Fee &amp; Age Limit
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">General / OBC / EWS:</span>
                    <strong className="text-slate-900">{item.feeGeneral ?? 'As per Official Notice'}</strong>
                  </li>
                  {item.feeScSt && (
                    <li className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">SC / ST / PwBD:</span>
                      <strong className="text-slate-900">{item.feeScSt}</strong>
                    </li>
                  )}
                  {item.feeFemale && (
                    <li className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Female Candidates:</span>
                      <strong className="text-slate-900">{item.feeFemale}</strong>
                    </li>
                  )}
                  {(item.ageLimitMin || item.ageLimitMax) && (
                    <li className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Age Limit:</span>
                      <strong className="text-slate-900">
                        {item.ageLimitMin ?? 18} – {item.ageLimitMax ?? 35} Years
                        {item.ageAsOn ? ` (as on ${item.ageAsOn})` : ''}
                      </strong>
                    </li>
                  )}
                  {item.postCount && (
                    <li className="flex justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Total Vacancies:</span>
                      <strong className="text-[#0284c7] font-bold">
                        {item.postCount.toLocaleString('en-IN')} Posts
                      </strong>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Vacancy Breakdown Table (if available) */}
            {item.vacancyBreakdown && item.vacancyBreakdown.length > 0 && (
              <div className="border-b border-slate-200 p-5 sm:p-6">
                <h2 className="mb-3 text-base font-bold text-slate-900">
                  Post-wise Vacancy &amp; Qualification Details
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-200 text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-800">
                        <th className="border border-slate-200 px-3 py-2 font-bold">Post Name</th>
                        <th className="border border-slate-200 px-3 py-2 font-bold">Total Posts</th>
                        <th className="border border-slate-200 px-3 py-2 font-bold">Eligibility / Qualification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.vacancyBreakdown.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="border border-slate-200 px-3 py-2 font-semibold text-slate-900">
                            {row.postName}
                          </td>
                          <td className="border border-slate-200 px-3 py-2 font-bold text-[#0284c7]">
                            {row.totalPost}
                          </td>
                          <td className="border border-slate-200 px-3 py-2 text-slate-600">
                            {row.eligibility}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Selection Process */}
            {item.selectionProcess && item.selectionProcess.length > 0 && (
              <div className="border-b border-slate-200 p-5 sm:p-6">
                <h2 className="mb-3 text-base font-bold text-slate-900">Selection Process</h2>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {item.selectionProcess.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs sm:text-sm font-medium text-slate-800"
                    >
                      <CheckCircle2 size={15} className="shrink-0 text-[#0A9FFC]" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Direct Official Redirect Links Table */}
            <div className="bg-slate-50/80 p-5 sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Direct Official Links
                </h2>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck size={13} />
                  100% Official Redirect
                </span>
              </div>

              <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between gap-2 p-3 sm:p-4 sm:flex-row sm:items-center"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{link.label}</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        link.highlight
                          ? 'btn-primary text-xs py-1.5 px-3.5 font-bold'
                          : 'btn-outline text-xs py-1.5 px-3.5 font-bold'
                      }
                    >
                      <span>Click Here (Official Portal)</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
