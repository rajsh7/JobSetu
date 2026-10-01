import Link from 'next/link'
import { ExternalLink, Calendar, Building2, ArrowUpRight, MapPin, GraduationCap, ArrowLeft } from 'lucide-react'
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
      <main className="py-6 sm:py-8 bg-white min-h-[calc(100dvh-180px)]">
        <div className="container-main max-w-5xl px-3 sm:px-6">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0A9FFC] hover:underline"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          {/* Plain Simple Text Page Header (No background cards) */}
          <div className="mb-6 border-b border-slate-200 pb-4">
            <span className="inline-block rounded-md bg-sky-50 border border-sky-200 px-2.5 py-0.5 text-xs font-bold text-[#0284c7]">
              {badgeText}
            </span>
            <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">{title}</h1>
            <p className="mt-1 text-sm text-slate-600">
              {subtitle}
            </p>
          </div>

          {/* Plain Simple Text Listing (Flat divider rows, no background cards) */}
          <div className="divide-y divide-slate-200">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-3.5 hover:bg-sky-50/40 px-1 sm:px-2 transition-colors flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-700">
                      <Building2 size={13} className="text-[#0A9FFC]" />
                      {item.organization}
                    </span>
                    {item.state && (
                      <span className="inline-flex items-center gap-0.5 text-slate-500 font-medium">
                        • <MapPin size={11} /> {item.state}
                      </span>
                    )}
                    {item.postCount && (
                      <span className="rounded bg-sky-50 px-1.5 py-0.2 text-[11px] font-bold text-[#0284c7]">
                        {item.postCount.toLocaleString('en-IN')} Posts
                      </span>
                    )}
                  </div>

                  <Link href={`${basePath}/${item.slug}`} className="block">
                    <h2 className="text-base font-bold text-slate-900 hover:text-[#0A9FFC] transition-colors leading-snug">
                      {item.title}
                    </h2>
                  </Link>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    {item.qualification && (
                      <span className="inline-flex items-center gap-1">
                        <GraduationCap size={13} className="text-[#0A9FFC]" />
                        <strong className="text-slate-700">Eligibility:</strong>
                        <span>{item.qualification}</span>
                      </span>
                    )}
                    {item.lastDate && item.category !== Category.RESULT && (() => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      const isExpired = !item.isUpcoming && new Date(item.lastDate) < today
                      return isExpired ? (
                        <span className="font-bold text-slate-700 bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-[11px]">
                          Form Closed: {new Date(item.lastDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      ) : (
                        <span className="font-semibold text-rose-600">
                          Last Date: {new Date(item.lastDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      )
                    })()}
                    {item.resultDateText && (
                      <span className="font-semibold text-emerald-600">
                        Declared: {item.resultDateText}
                      </span>
                    )}
                    {item.examDateText && (
                      <span className="font-semibold text-[#0284c7]">
                        Exam Date: {item.examDateText}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`${basePath}/${item.slug}`}
                    className="btn-outline text-xs py-1.5 px-3 font-bold"
                  >
                    <span>Details</span>
                    <ArrowUpRight size={12} />
                  </Link>
                  <a
                    href={item.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-1.5 px-3.5 font-bold"
                  >
                    <span>Official Link</span>
                    <ExternalLink size={12} />
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
