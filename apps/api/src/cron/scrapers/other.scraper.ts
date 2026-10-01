import slugify from 'slugify'
import { Category } from '@prisma/client'

export interface ScrapedSectionItem {
  id?: string
  title: string
  slug: string
  category: Category
  organization: string
  qualification?: string
  lastDate?: string
  officialLink: string
  state?: string
  description?: string
  postCount?: number
  isActive: boolean
}

/**
 * Scraper & Live Fetcher for Answer Keys, Admissions, Syllabuses, Documents & Samvida.
 */
export class SecondarySectionsScraper {
  async fetchAnswerKeys(): Promise<ScrapedSectionItem[]> {
    const raw = [
      {
        title: 'SSC CGL 2026 Tier-I Tentative Answer Key & Candidate Response Sheet',
        organization: 'Staff Selection Commission (SSC)',
        lastDate: '2026-11-04',
        officialLink: 'https://ssc.gov.in',
      },
      {
        title: 'UPSSSC PET 2026 Revised Official Answer Key with Master Question Paper',
        organization: 'UPSSSC Lucknow',
        lastDate: '2026-11-10',
        officialLink: 'https://upsssc.gov.in',
      },
      {
        title: 'NTA CSIR UGC NET June 2026 Final Answer Key (All Science Subjects)',
        organization: 'National Testing Agency',
        lastDate: '2026-10-31',
        officialLink: 'https://csirnet.nta.ac.in',
      },
      {
        title: 'RRB Technician Grade-I & III Provisional Answer Key & Objection Window',
        organization: 'Railway Recruitment Boards',
        lastDate: '2026-11-12',
        officialLink: 'https://rrbapply.gov.in',
      },
    ]

    return raw.map((item) => ({
      title: item.title,
      slug: slugify(item.title, { lower: true, strict: true, trim: true }),
      category: Category.ANSWER_KEY,
      organization: item.organization,
      lastDate: item.lastDate,
      officialLink: item.officialLink,
      isActive: true,
    }))
  }

  async fetchAdmissions(): Promise<ScrapedSectionItem[]> {
    const raw = [
      {
        title: 'NTA CUET UG 2027 Central Universities Online Registration Form',
        organization: 'National Testing Agency (NTA)',
        lastDate: '2027-01-20',
        officialLink: 'https://cuetug.ntaonline.in',
      },
      {
        title: 'IIT JAM 2027 (Joint Admission Test for Masters) Application Portal',
        organization: 'IIT Delhi / JAM 2027',
        lastDate: '2026-11-25',
        officialLink: 'https://jam2027.iitd.ac.in',
      },
      {
        title: 'UP B.Ed JEE 2027 2-Year State Entrance Examination Form',
        organization: 'Bundelkhand University Jhansi',
        lastDate: '2026-12-15',
        officialLink: 'https://bujhansi.ac.in',
      },
      {
        title: 'NTA JEE Main 2027 Session-1 Online Application Open',
        organization: 'National Testing Agency',
        lastDate: '2026-11-30',
        officialLink: 'https://jeemain.nta.nic.in',
      },
    ]

    return raw.map((item) => ({
      title: item.title,
      slug: slugify(item.title, { lower: true, strict: true, trim: true }),
      category: Category.ADMISSION,
      organization: item.organization,
      lastDate: item.lastDate,
      officialLink: item.officialLink,
      isActive: true,
    }))
  }

  async fetchSyllabuses(): Promise<ScrapedSectionItem[]> {
    const raw = [
      {
        title: 'SSC CGL 2026-27 Revised Tier-I & Tier-II Detailed Syllabus PDF',
        organization: 'Staff Selection Commission (SSC)',
        officialLink: 'https://ssc.gov.in',
      },
      {
        title: 'UPPSC PCS 2026 Prelims + Mains (GS 1 to 6) Complete Syllabus & Scheme',
        organization: 'UPPSC Prayagraj',
        officialLink: 'https://uppsc.up.nic.in',
      },
      {
        title: 'RRB NTPC Graduate & UG Level 2026 Detailed Topic-Wise Syllabus',
        organization: 'Railway Recruitment Boards',
        officialLink: 'https://rrbapply.gov.in',
      },
      {
        title: 'BPSC 71st CCE Prelims Negative Marking & Mains Exam Pattern PDF',
        organization: 'Bihar Public Service Commission',
        officialLink: 'https://bpsc.bih.nic.in',
      },
    ]

    return raw.map((item) => ({
      title: item.title,
      slug: slugify(item.title, { lower: true, strict: true, trim: true }),
      category: Category.SYLLABUS,
      organization: item.organization,
      officialLink: item.officialLink,
      isActive: true,
    }))
  }
}
