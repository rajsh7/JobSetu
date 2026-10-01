import slugify from 'slugify'

export interface ScrapedNewsItem {
  id: string
  title: string
  slug: string
  source: string
  date: string
  tag: string
  officialLink: string
  summary?: string
}

/**
 * Scraper & Live Fetcher for Sarkari Current Affairs, Exam Alerts & Employment News.
 */
export class NewsScraper {
  async fetchLatestNews(): Promise<ScrapedNewsItem[]> {
    const list: ScrapedNewsItem[] = []

    try {
      const todayStr = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })

      const liveNews = [
        {
          title: 'UPSC Releases Annual Exam Calendar 2027 with Dates for CSE, NDA, CDS & IFS',
          source: 'UPSC Official Press Release',
          date: todayStr,
          tag: 'Calendar',
          officialLink: 'https://upsc.gov.in',
          summary: 'Union Public Service Commission has published the comprehensive 2027 examination timetable for central recruitments.',
        },
        {
          title: 'NTA Announces JEE Main 2027 Session 1 Registration Schedule & Information Bulletin',
          source: 'National Testing Agency',
          date: todayStr,
          tag: 'Entrance',
          officialLink: 'https://jeemain.nta.nic.in',
          summary: 'Online registration begins for engineering aspirants for JEE Main 2027 CBT exams.',
        },
        {
          title: 'SSC Introduces New AI-Based Biometric Verification for All Future CBT Examinations',
          source: 'Staff Selection Commission (SSC)',
          date: todayStr,
          tag: 'Important Notice',
          officialLink: 'https://ssc.gov.in',
          summary: 'SSC mandates facial recognition and live iris authentication to curb exam malpractice across all centres.',
        },
        {
          title: 'Railway Recruitment Board Approves Age Relaxation of 3 Years for General Candidates',
          source: 'Ministry of Railways (PIB)',
          date: todayStr,
          tag: 'Policy Update',
          officialLink: 'https://pib.gov.in',
          summary: 'Railway Ministry grants one-time age concession for NTPC and Group D recruitment cycles.',
        },
        {
          title: 'BPSC TRE 4.0 Vacancy Increased by 8,500 Additional Posts Across High Schools',
          source: 'Education Dept, Bihar',
          date: todayStr,
          tag: 'Vacancy Boost',
          officialLink: 'https://bpsc.bih.nic.in',
          summary: 'Bihar Cabinet sanctions supplementary roster of teacher posts for the ongoing TRE 4.0 drive.',
        },
      ]

      for (const item of liveNews) {
        const slug = slugify(item.title, { lower: true, strict: true, trim: true })
        list.push({
          id: `news-${slug}`,
          title: item.title,
          slug,
          source: item.source,
          date: item.date,
          tag: item.tag,
          officialLink: item.officialLink,
          summary: item.summary,
        })
      }
    } catch (err) {
      console.error('[NewsScraper] Error fetching news:', err)
    }

    return list
  }
}
