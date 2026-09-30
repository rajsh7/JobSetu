import Link from 'next/link'
import { ExternalLink, ArrowLeft, Calendar, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react'
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

  return (
    <>
      <Header />
      <main className="py-8 sm:py-12">
        <div className="container-main max-w-4xl">
          {/* Back Breadcrumb */}
          <Link
            href={backHref}
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-zinc-600 hover:text-black"
          >
            <ArrowLeft size={16} />
            <span>Back to {backLabel}</span>
          </Link>

          {/* Main Sarkari-Style Structured Sheet */}
          <article className="overflow-hidden rounded-2xl border-2 border-black bg-white shadow-sm">
            {/* Top Banner */}
            <div className="border-b-2 border-black bg-black p-6 text-white sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
                <Building2 size={14} />
                <span>{item.organization}</span>
                {item.state && (
                  <>
                    <span>•</span>
                    <span>{item.state}</span>
                  </>
                )}
              </div>

              <h1 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
                {item.title}
              </h1>

              {item.shortInfo && (
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{item.shortInfo}</p>
              )}
            </div>

            {/* 2-Column Sarkari Table: Important Dates & Application Fee */}
            <div className="grid grid-cols-1 divide-y-2 divide-black border-b-2 border-black md:grid-cols-2 md:divide-x-2 md:divide-y-0">
              {/* Important Dates */}
              <div className="p-6">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-black">
                  <Calendar size={18} />
                  <span>Important Dates</span>
                </h2>
                <ul className="space-y-2 text-sm">
                  {item.applicationBegin && (
                    <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-600">Application Begin:</span>
                      <strong className="text-black">{item.applicationBegin}</strong>
                    </li>
                  )}
                  {item.lastDate && (
                    <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-600">Last Date to Apply:</span>
                      <strong className="text-rose-600">
                        {new Date(item.lastDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </strong>
                    </li>
                  )}
                  {item.feeLastDate && (
                    <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-600">Fee Payment Last Date:</span>
                      <strong className="text-black">{item.feeLastDate}</strong>
                    </li>
                  )}
                  {item.examDateText && (
                    <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-600">Exam Date:</span>
                      <strong className="text-sky-700">{item.examDateText}</strong>
                    </li>
                  )}
                  {item.admitCardDateText && (
                    <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-600">Admit Card Status:</span>
                      <strong className="text-emerald-700">{item.admitCardDateText}</strong>
                    </li>
                  )}
                  {item.resultDateText && (
                    <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-600">Result Declared:</span>
                      <strong className="text-rose-600">{item.resultDateText}</strong>
                    </li>
                  )}
                </ul>
              </div>

              {/* Application Fee & Age Limit */}
              <div className="p-6">
                <h2 className="mb-3 text-lg font-extrabold text-black">
                  Application Fee &amp; Age Limit
                </h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                    <span className="text-zinc-600">General / OBC / EWS:</span>
                    <strong className="text-black">{item.feeGeneral ?? 'As per Official Notice'}</strong>
                  </li>
                  {item.feeScSt && (
                    <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-600">SC / ST / PwBD:</span>
                      <strong className="text-black">{item.feeScSt}</strong>
                    </li>
                  )}
                  {item.feeFemale && (
                    <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-600">Female Candidates:</span>
                      <strong className="text-black">{item.feeFemale}</strong>
                    </li>
                  )}
                  {(item.ageLimitMin || item.ageLimitMax) && (
                    <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-600">Age Limit:</span>
                      <strong className="text-black">
                        {item.ageLimitMin ?? 18} – {item.ageLimitMax ?? 35} Years
                        {item.ageAsOn ? ` (as on ${item.ageAsOn})` : ''}
                      </strong>
                    </li>
                  )}
                  {item.postCount && (
                    <li className="flex justify-between border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-600">Total Vacancies:</span>
                      <strong className="text-emerald-700">
                        {item.postCount.toLocaleString('en-IN')} Posts
                      </strong>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Vacancy & Eligibility Breakdown Table */}
            {item.vacancyBreakdown && item.vacancyBreakdown.length > 0 && (
              <div className="border-b-2 border-black p-6">
                <h2 className="mb-4 text-lg font-extrabold text-black">
                  Vacancy Details &amp; Eligibility Criteria
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-zinc-300 text-left text-sm">
                    <thead>
                      <tr className="bg-zinc-100 text-black">
                        <th className="border border-zinc-300 px-4 py-2.5 font-bold">Post Name</th>
                        <th className="border border-zinc-300 px-4 py-2.5 font-bold">Total Posts</th>
                        <th className="border border-zinc-300 px-4 py-2.5 font-bold">Eligibility / Qualification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.vacancyBreakdown.map((row, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50">
                          <td className="border border-zinc-300 px-4 py-3 font-semibold text-black">
                            {row.postName}
                          </td>
                          <td className="border border-zinc-300 px-4 py-3 font-bold text-emerald-700">
                            {row.totalPost}
                          </td>
                          <td className="border border-zinc-300 px-4 py-3 text-zinc-700">
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
              <div className="border-b-2 border-black p-6">
                <h2 className="mb-3 text-lg font-extrabold text-black">Selection Process</h2>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {item.selectionProcess.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm font-medium text-zinc-800"
                    >
                      <CheckCircle2 size={16} className="shrink-0 text-black" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Direct Official Redirect Links Table */}
            <div className="bg-zinc-50 p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-black">
                  Direct Official Portal Links
                </h2>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck size={15} />
                  Verified Official Redirects
                </span>
              </div>

              <div className="divide-y divide-zinc-200 overflow-hidden rounded-xl border-2 border-black bg-white">
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center"
                  >
                    <span className="font-bold text-black">{link.label}</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link.highlight ? 'btn-primary text-sm' : 'btn-outline text-sm'}
                    >
                      <span>Click Here (Official Site)</span>
                      <ExternalLink size={15} />
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
