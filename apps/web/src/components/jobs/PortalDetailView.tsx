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
      <main className="py-8 sm:py-12 bg-[#f4f8f8]">
        <div className="container-main max-w-4xl">
          {/* Back Breadcrumb */}
          <Link
            href={backHref}
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#6E6658] hover:text-[#254E58]"
          >
            <ArrowLeft size={16} />
            <span>Back to {backLabel}</span>
          </Link>

          {/* Main Structured Sheet */}
          <article className="overflow-hidden rounded-2xl border-2 border-[#254E58] bg-white shadow-sm">
            {/* Top Banner */}
            <div className="border-b-2 border-[#254E58] bg-[#112D32] p-6 text-white sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#88BDBC]">
                <Building2 size={14} />
                <span>{item.organization}</span>
                {item.state && (
                  <>
                    <span>•</span>
                    <span>{item.state}</span>
                  </>
                )}
              </div>

              <h1 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                {item.title}
              </h1>

              {item.shortInfo && (
                <p className="mt-3 text-sm text-[#88BDBC]/90 leading-relaxed">{item.shortInfo}</p>
              )}
            </div>

            {/* 2-Column Table: Important Dates & Application Fee */}
            <div className="grid grid-cols-1 divide-y-2 divide-[#254E58] border-b-2 border-[#254E58] md:grid-cols-2 md:divide-x-2 md:divide-y-0">
              {/* Important Dates */}
              <div className="p-6">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-[#112D32]">
                  <Calendar size={18} className="text-[#254E58]" />
                  <span>Important Dates</span>
                </h2>
                <ul className="space-y-2 text-sm">
                  {item.applicationBegin && (
                    <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                      <span className="text-[#6E6658]">Application Begin:</span>
                      <strong className="text-[#112D32]">{item.applicationBegin}</strong>
                    </li>
                  )}
                  {item.lastDate && (
                    <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                      <span className="text-[#6E6658]">Last Date to Apply:</span>
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
                    <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                      <span className="text-[#6E6658]">Fee Payment Last Date:</span>
                      <strong className="text-[#112D32]">{item.feeLastDate}</strong>
                    </li>
                  )}
                  {item.examDateText && (
                    <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                      <span className="text-[#6E6658]">Exam Date:</span>
                      <strong className="text-[#254E58]">{item.examDateText}</strong>
                    </li>
                  )}
                  {item.admitCardDateText && (
                    <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                      <span className="text-[#6E6658]">Admit Card Status:</span>
                      <strong className="text-[#254E58]">{item.admitCardDateText}</strong>
                    </li>
                  )}
                  {item.resultDateText && (
                    <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                      <span className="text-[#6E6658]">Result Declared:</span>
                      <strong className="text-rose-600">{item.resultDateText}</strong>
                    </li>
                  )}
                </ul>
              </div>

              {/* Application Fee & Age Limit */}
              <div className="p-6">
                <h2 className="mb-3 text-lg font-extrabold text-[#112D32]">
                  Application Fee &amp; Age Limit
                </h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                    <span className="text-[#6E6658]">General / OBC / EWS:</span>
                    <strong className="text-[#112D32]">{item.feeGeneral ?? 'As per Official Notice'}</strong>
                  </li>
                  {item.feeScSt && (
                    <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                      <span className="text-[#6E6658]">SC / ST / PwBD:</span>
                      <strong className="text-[#112D32]">{item.feeScSt}</strong>
                    </li>
                  )}
                  {item.feeFemale && (
                    <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                      <span className="text-[#6E6658]">Female Candidates:</span>
                      <strong className="text-[#112D32]">{item.feeFemale}</strong>
                    </li>
                  )}
                  {(item.ageLimitMin || item.ageLimitMax) && (
                    <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                      <span className="text-[#6E6658]">Age Limit:</span>
                      <strong className="text-[#112D32]">
                        {item.ageLimitMin ?? 18} – {item.ageLimitMax ?? 35} Years
                        {item.ageAsOn ? ` (as on ${item.ageAsOn})` : ''}
                      </strong>
                    </li>
                  )}
                  {item.postCount && (
                    <li className="flex justify-between border-b border-[#e8f2f2] pb-1.5">
                      <span className="text-[#6E6658]">Total Vacancies:</span>
                      <strong className="text-[#254E58]">
                        {item.postCount.toLocaleString('en-IN')} Posts
                      </strong>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Vacancy & Eligibility Breakdown Table */}
            {item.vacancyBreakdown && item.vacancyBreakdown.length > 0 && (
              <div className="border-b-2 border-[#254E58] p-6">
                <h2 className="mb-4 text-lg font-extrabold text-[#112D32]">
                  Vacancy Details &amp; Eligibility Criteria
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-[#d1dfe0] text-left text-sm">
                    <thead>
                      <tr className="bg-[#e8f2f2] text-[#112D32]">
                        <th className="border border-[#d1dfe0] px-4 py-2.5 font-bold">Post Name</th>
                        <th className="border border-[#d1dfe0] px-4 py-2.5 font-bold">Total Posts</th>
                        <th className="border border-[#d1dfe0] px-4 py-2.5 font-bold">Eligibility / Qualification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.vacancyBreakdown.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#f4f8f8]">
                          <td className="border border-[#d1dfe0] px-4 py-3 font-semibold text-[#112D32]">
                            {row.postName}
                          </td>
                          <td className="border border-[#d1dfe0] px-4 py-3 font-bold text-[#254E58]">
                            {row.totalPost}
                          </td>
                          <td className="border border-[#d1dfe0] px-4 py-3 text-[#4F4A41]">
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
              <div className="border-b-2 border-[#254E58] p-6">
                <h2 className="mb-3 text-lg font-extrabold text-[#112D32]">Selection Process</h2>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {item.selectionProcess.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-[#d1dfe0] bg-[#f4f8f8] px-3.5 py-2 text-sm font-medium text-[#112D32]"
                    >
                      <CheckCircle2 size={16} className="shrink-0 text-[#254E58]" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Direct Official Redirect Links Table */}
            <div className="bg-[#f4f8f8] p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[#112D32]">
                  Direct Official Portal Links
                </h2>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#254E58]">
                  <ShieldCheck size={15} />
                  Verified Official Redirects
                </span>
              </div>

              <div className="divide-y divide-[#d1dfe0] overflow-hidden rounded-xl border-2 border-[#254E58] bg-white">
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center"
                  >
                    <span className="font-bold text-[#112D32]">{link.label}</span>
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
