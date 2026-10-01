import type { Metadata } from 'next'
import { searchPortal } from '@/lib/data'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSearch } from '@/components/home/HeroSearch'
import { LatestUpdates } from '@/components/home/LatestUpdates'
import { TopExams } from '@/components/home/TopExams'

export const metadata: Metadata = {
  title: 'Search Sarkari Jobs, Results, Admit Cards & Exams',
  description: 'Search across all Sarkari Jobs, Exam Results, Admit Cards, Private Jobs, and Top Exams on JobSetu.',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams
  const { items, exams } = await searchPortal(q)

  return (
    <>
      <Header />
      <main className="py-10 bg-[#f4f8f8] min-h-[calc(100dvh-112px)]">
        <div className="container-main">
          <div className="mb-8 rounded-2xl border-2 border-[#254E58] bg-white p-6 text-center shadow-sm sm:p-8">
            <h1 className="mb-4 text-2xl font-extrabold text-[#112D32] sm:text-3xl">
              {q ? `Search Results for "${q}"` : 'Search JobSetu Portal'}
            </h1>
            <HeroSearch />
          </div>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-extrabold text-[#112D32]">
              Matching Jobs, Results &amp; Admit Cards ({items.length})
            </h2>
            <LatestUpdates jobs={items} />
          </section>

          {exams.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-extrabold text-[#112D32]">
                Matching Top Exams ({exams.length})
              </h2>
              <TopExams exams={exams} />
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
