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
  Users,
  MapPin,
  Flame,
} from 'lucide-react'
import { type DetailedPortalItem } from '@/lib/data'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface Props {
  item: DetailedPortalItem
  backHref?: string
  backLabel?: string
}

export function PortalDetailView({ item }: Props) {
  const links = item.importantLinks ?? [
    { label: 'Go to Official Portal / Apply Online', url: item.officialLink, highlight: true },
  ]

  const isPast = !item.isUpcoming && item.lastDate && new Date(item.lastDate) < new Date('2026-10-01')

  return (
    <>
      <Header />
      <main className="py-6 sm:py-8 bg-white min-h-[calc(100dvh-180px)]">
        <div className="container-main max-w-4xl px-3 sm:px-6">
          {/* Back to Home Page Link (Redirects to /) */}
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0A9FFC] hover:underline"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          {/* Plain Simple Text Document Layout (No Background Cards) */}
          <div className="space-y-6">

            {/* Document Header */}
            <div className="border-b border-slate-200 pb-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                <span className="flex items-center gap-1 text-[#0284c7]">
                  <Building2 size={14} />
                  <span>{item.organization}</span>
                </span>
                {item.specification && (
                  <span className="rounded bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-[#0284c7]">
                    {item.specification}
                  </span>
                )}
                {item.state && (
                  <span className="text-slate-500 font-semibold">• 📍 {item.state}</span>
                )}
              </div>

              <h1 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                {item.title}
              </h1>

              {/* Status and Info Badges */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                {item.isUpcoming ? (
                  <span className="inline-flex items-center gap-1 rounded bg-amber-50 text-amber-800 font-bold px-2.5 py-0.5 text-xs">
                    <Clock size={12} />
                    Upcoming Recruitment 2026-27
                  </span>
                ) : isPast ? (
                  <span className="inline-flex items-center gap-1 rounded bg-slate-100 text-slate-600 font-semibold px-2.5 py-0.5 text-xs">
                    Form Closed / Past Archive
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 text-xs">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Notification — Apply Now
                  </span>
                )}

                {item.postCount && (
                  <span className="inline-flex items-center gap-1 rounded bg-sky-50 text-[#0284c7] font-bold px-2.5 py-0.5 text-xs">
                    <Users size={12} />
                    {item.postCount.toLocaleString('en-IN')} Total Posts
                  </span>
                )}
              </div>

              {item.shortInfo && (
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.shortInfo}</p>
              )}
            </div>

            {/* ── EDUCATIONAL QUALIFICATION & ELIGIBILITY (Plain Simple Text) ── */}
            <div className="border-b border-slate-200 pb-5">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 mb-3">
                <GraduationCap size={20} className="text-[#0A9FFC]" />
                <span>Educational Qualification &amp; Eligibility Criteria</span>
              </h2>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Prescribed Educational Qualification:
                  </span>
                  <p className="mt-1 text-base font-bold text-slate-900 leading-relaxed">
                    {item.qualification || item.eligibility || 'Check official notification for detailed qualification criteria.'}
                  </p>
                </div>

                {item.eligibility && item.eligibility !== item.qualification && (
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Additional Eligibility Details:
                    </span>
                    <p className="mt-1 text-slate-700 leading-relaxed">
                      {item.eligibility}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600">
                  {item.postCount && (
                    <span><strong>Total Vacancies:</strong> {item.postCount.toLocaleString('en-IN')} Posts</span>
                  )}
                  {(item.ageLimitMin || item.ageLimitMax) && (
                    <span><strong>Age Limit:</strong> {item.ageLimitMin ?? 18} to {item.ageLimitMax ?? 35} Years</span>
                  )}
                  {item.ageAsOn && (
                    <span>(as on {item.ageAsOn})</span>
                  )}
                </div>
              </div>
            </div>

            {/* Important Dates & Application Fee Table (Plain Flat Table) */}
            <div className="border-b border-slate-200 pb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Important Dates */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-[#0A9FFC]" />
                    <span>Important Dates</span>
                  </h3>
                  <table className="w-full text-xs sm:text-sm">
                    <tbody>
                      {item.applicationBegin && (
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 text-slate-500">Application Begin:</td>
                          <td className="py-1.5 font-bold text-slate-900 text-right">{item.applicationBegin}</td>
                        </tr>
                      )}
                      {item.lastDate && (
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 text-slate-500">Last Date to Apply:</td>
                          <td className="py-1.5 font-extrabold text-rose-600 text-right">
                            {new Date(item.lastDate).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                      )}
                      {item.feeLastDate && (
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 text-slate-500">Fee Payment Last Date:</td>
                          <td className="py-1.5 font-bold text-slate-900 text-right">{item.feeLastDate}</td>
                        </tr>
                      )}
                      {item.examDateText && (
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 text-slate-500">Exam Date:</td>
                          <td className="py-1.5 font-bold text-[#0284c7] text-right">{item.examDateText}</td>
                        </tr>
                      )}
                      {item.admitCardDateText && (
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 text-slate-500">Admit Card:</td>
                          <td className="py-1.5 font-bold text-slate-800 text-right">{item.admitCardDateText}</td>
                        </tr>
                      )}
                      {item.resultDateText && (
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 text-slate-500">Result Status:</td>
                          <td className="py-1.5 font-bold text-emerald-600 text-right">{item.resultDateText}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Application Fee */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-3">
                    Application Fee
                  </h3>
                  <table className="w-full text-xs sm:text-sm">
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-1.5 text-slate-500">General / OBC / EWS:</td>
                        <td className="py-1.5 font-bold text-slate-900 text-right">{item.feeGeneral ?? 'As per Notice'}</td>
                      </tr>
                      {item.feeScSt && (
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 text-slate-500">SC / ST / PwBD:</td>
                          <td className="py-1.5 font-bold text-slate-900 text-right">{item.feeScSt}</td>
                        </tr>
                      )}
                      {item.feeFemale && (
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 text-slate-500">Female Candidates:</td>
                          <td className="py-1.5 font-bold text-slate-900 text-right">{item.feeFemale}</td>
                        </tr>
                      )}
                      {(item.ageLimitMin || item.ageLimitMax) && (
                        <tr className="border-b border-slate-100">
                          <td className="py-1.5 text-slate-500">Age Limit:</td>
                          <td className="py-1.5 font-bold text-slate-900 text-right">
                            {item.ageLimitMin ?? 18} – {item.ageLimitMax ?? 35} Years
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Post-wise Breakdown (if available) */}
            {item.vacancyBreakdown && item.vacancyBreakdown.length > 0 && (
              <div className="border-b border-slate-200 pb-5">
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  Post-wise Vacancy &amp; Qualification Details
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-300 text-slate-800">
                        <th className="py-2 pr-3 font-bold">Post Name</th>
                        <th className="py-2 pr-3 font-bold">Posts</th>
                        <th className="py-2 font-bold">Eligibility / Qualification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.vacancyBreakdown.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100">
                          <td className="py-2 pr-3 font-semibold text-slate-900">{row.postName}</td>
                          <td className="py-2 pr-3 font-bold text-[#0284c7]">{row.totalPost}</td>
                          <td className="py-2 text-slate-600">{row.eligibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Direct Official Links */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">
                  Direct Official Links
                </h3>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck size={14} />
                  100% Official Links
                </span>
              </div>

              <div className="space-y-2">
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-slate-100"
                  >
                    <span className="text-sm font-bold text-slate-800">{link.label}</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs py-1.5 px-3.5 font-bold"
                    >
                      <span>Click Here (Official Website)</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
