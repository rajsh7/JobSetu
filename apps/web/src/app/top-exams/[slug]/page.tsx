import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ExternalLink, Calendar, GraduationCap, Layers } from 'lucide-react'
import { getExamBySlug, getPortalItems } from '@/lib/data'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LatestUpdates } from '@/components/home/LatestUpdates'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const exam = await getExamBySlug(slug)
  if (!exam) return { title: 'Exam Not Found' }

  return {
    title: `${exam.name} — Eligibility, Pattern, Dates & Official Link`,
    description: exam.description,
  }
}

export default async function ExamDetailPage({ params }: PageProps) {
  const { slug } = await params
  const exam = await getExamBySlug(slug)
  if (!exam) notFound()

  const allItems = await getPortalItems(undefined, 50)
  const relatedUpdates = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(slug.toLowerCase()) ||
      item.organization.toLowerCase().includes(slug.toLowerCase()) ||
      (item.examName?.toLowerCase().includes(slug.toLowerCase()) ?? false),
  )

  const enriched = exam as typeof exam & {
    eligibility?: string
    nextExamWindow?: string
    patternSummary?: string
  }

  return (
    <>
      <Header />
      <main className="py-8 sm:py-12">
        <div className="container-main max-w-5xl">
          <Link
            href="/top-exams"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-zinc-600 hover:text-black"
          >
            <ArrowLeft size={16} />
            <span>Back to Top Exams</span>
          </Link>

          <div className="overflow-hidden rounded-2xl border-2 border-black bg-white">
            <div className="border-b-2 border-black bg-black p-6 text-white sm:p-8">
              <span className="inline-block rounded bg-white px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-black">
                {exam.category.replace('_', ' ')}
              </span>
              <h1 className="mt-3 text-2xl font-extrabold sm:text-4xl">{exam.name}</h1>
              <p className="mt-1 text-sm font-medium text-zinc-300">
                Conducted by: <strong>{exam.conductedBy}</strong>
              </p>
              {exam.description && (
                <p className="mt-3 max-w-3xl text-sm text-zinc-300 leading-relaxed">
                  {exam.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3 sm:p-8">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <Calendar size={14} className="text-black" />
                  <span>Exam Frequency &amp; Window</span>
                </div>
                <p className="mt-2 text-sm font-bold text-black">{exam.frequency}</p>
                {enriched.nextExamWindow && (
                  <p className="mt-1 text-xs font-semibold text-emerald-700">
                    {enriched.nextExamWindow}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <GraduationCap size={14} className="text-black" />
                  <span>Eligibility Criteria</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-zinc-800">
                  {enriched.eligibility ?? 'Graduation / 12th / 10th as per post notification'}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <Layers size={14} className="text-black" />
                  <span>Selection Pattern</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-zinc-800">
                  {enriched.patternSummary ?? 'Written CBT Exam + Document Verification'}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t-2 border-black bg-zinc-50 p-6 sm:flex-row">
              <div>
                <h2 className="text-base font-extrabold text-black">
                  Official {exam.name} Commission Portal
                </h2>
                <p className="text-xs text-zinc-600">
                  Always verify latest notices, syllabus PDFs, and OTR registration on the official site.
                </p>
              </div>
              <a
                href={exam.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <span>Visit Official Website ({exam.officialSite.replace('https://', '')})</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {relatedUpdates.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-4 text-xl font-extrabold text-black sm:text-2xl">
                Latest Notifications, Results &amp; Admit Cards for {exam.name}
              </h2>
              <LatestUpdates jobs={relatedUpdates} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
