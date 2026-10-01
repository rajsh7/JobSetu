// ─── Enums ──────────────────────────────────────────────────────────────────

export enum Category {
  GOVT_JOB = 'GOVT_JOB',
  PRIVATE_JOB = 'PRIVATE_JOB',
  ADMIT_CARD = 'ADMIT_CARD',
  RESULT = 'RESULT',
  EXAM = 'EXAM',
  ANSWER_KEY = 'ANSWER_KEY',
  SYLLABUS = 'SYLLABUS',
  ADMISSION = 'ADMISSION',
  DOCUMENT = 'DOCUMENT',
}

export enum ExamCategory {
  UPSC = 'UPSC',
  SSC = 'SSC',
  BANKING = 'BANKING',
  RAILWAY = 'RAILWAY',
  STATE_PSC = 'STATE_PSC',
  DEFENCE = 'DEFENCE',
  TEACHING = 'TEACHING',
  POLICE = 'POLICE',
  OTHER = 'OTHER',
}

// ─── Core Types ───────────────────────────────────────────────────────────────

export interface Job {
  id: string
  title: string
  slug: string
  category: Category
  organization: string
  postCount?: number
  qualification?: string
  lastDate?: string // ISO date string
  officialLink: string
  state?: string
  examName?: string
  description?: string
  isActive: boolean
  isFeatured: boolean
  views: number
  createdAt: string
  updatedAt: string
  tags?: Tag[]
}

export interface Result {
  id: string
  title: string
  slug: string
  examName: string
  organization: string
  resultDate?: string
  officialLink: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AdmitCard {
  id: string
  title: string
  slug: string
  examName: string
  organization: string
  examDate?: string
  downloadLink: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Exam {
  id: string
  name: string
  slug: string
  category: ExamCategory
  conductedBy: string
  frequency?: string
  officialSite: string
  description?: string
  isTop: boolean
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface LatestUpdate {
  id: string
  title: string
  slug: string
  category: Category
  createdAt: string
  organization: string
}

// ─── Query Types ──────────────────────────────────────────────────────────────

export interface JobsQuery {
  page?: number
  limit?: number
  category?: Category
  state?: string
  search?: string
  featured?: boolean
}

export interface SearchResult {
  jobs: Job[]
  results: Result[]
  admitCards: AdmitCard[]
  exams: Exam[]
  total: number
}
