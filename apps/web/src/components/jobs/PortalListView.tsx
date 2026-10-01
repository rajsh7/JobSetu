import Link from 'next/link'
import { ExternalLink, Calendar, Building2, ArrowUpRight, MapPin, GraduationCap } from 'lucide-react'
import { Category } from '@jobsetu/types'
import { type DetailedPortalItem } from '@/lib/data'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface Props {
  title: string
  subtitle: string
  badgeText: string
  items: DetailedPortalItem[]
  basePath: string
}

export function PortalListView({ title, subtitle, badgeText, items, basePath }: Props) {
  return (
    <>
      <Header />
      <main className="py-10 bg-[#f4f8f8]">
        <div className="container-main">
          {/* Page Header */}
          <div className="mb-8 rounded-2xl border-2 border-[#254E58] bg-white p-6 shadow-sm sm:p-8">
            <span className="inline-block rounded-full bg-[#254E58] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {badgeText}
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-[#112D32] sm:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-[#6E6658] sm:text-base">
              {subtitle}
            </p>
          </div>

          {/* Listing Table / Cards */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="job-card flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#6E6658]">
                      <Building2 size={13} className="text-[#88BDBC]" />
                      {item.organization}
                    </span>
                    {item.state && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f2f2] px-2.5 py-0.5 text-xs font-semibold text-[#254E58]">
                        <MapPin size={11} />
                        {item.state}
                      </span>
                    )}
                    {item.postCount && (
                      <span className="rounded-full bg-[#e8f2f2] border border-[#88BDBC] px-2.5 py-0.5 text-xs font-bold text-[#254E58]">
                        {item.postCount.toLocaleString('en-IN')} Posts
                      </span>
                    )}
                  </div>

                  <Link href={`${basePath}/${item.slug}`} className="block">
                    <h2 className="text-lg font-bold text-[#112D32] hover:text-[#254E58] hover:underline sm:text-xl">
                      {item.title}
                    </h2>
                  </Link>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#4F4A41]">
                    {item.qualification && (
                      <span className="inline-flex items-center gap-1">
                        <GraduationCap size={14} className="text-[#88BDBC]" />
                        {item.qualification}
                      </span>
                    )}
                    {item.lastDate && item.category !== Category.RESULT && (
                      <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                        <Calendar size={13} />
                        Last Date: {new Date(item.lastDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                    {item.resultDateText && (
                      <span className="font-semibold text-rose-600">
                        Declared: {item.resultDateText}
                      </span>
                    )}
                    {item.examDateText && (
                      <span className="font-semibold text-[#254E58]">
                        Exam Date: {item.examDateText}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons: Details + Direct Official Redirect */}
                <div className="flex shrink-0 flex-wrap items-center gap-2.5">
                  <Link
                    href={`${basePath}/${item.slug}`}
                    className="btn-outline text-xs sm:text-sm py-2 px-4"
                  >
                    <span>Full Details</span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <a
                    href={item.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs sm:text-sm py-2 px-4"
                  >
                    <span>Official Link</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
