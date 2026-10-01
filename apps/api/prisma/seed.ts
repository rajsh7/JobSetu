import { PrismaClient, Category, ExamCategory } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString =
  process.env['DATABASE_URL'] ??
  'postgresql://postgres:A64bdxxj%4012@db.bxeqhgoyevchvhndwnvu.supabase.co:5432/postgres'

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌉 Seeding JobSetu Supabase PostgreSQL Database...')

  // 1. Configure Supabase public read access (RLS + anon SELECT grant)
  await prisma.$executeRawUnsafe(`GRANT USAGE ON SCHEMA public TO anon, authenticated;`)
  await prisma.$executeRawUnsafe(
    `GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;`,
  )
  await prisma.$executeRawUnsafe(`ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;`)
  await prisma.$executeRawUnsafe(`ALTER TABLE "Exam" ENABLE ROW LEVEL SECURITY;`)
  await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Public read jobs" ON "Job";`)
  await prisma.$executeRawUnsafe(
    `CREATE POLICY "Public read jobs" ON "Job" FOR SELECT TO anon, authenticated USING ("isActive" = true);`,
  )
  await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Public read exams" ON "Exam";`)
  await prisma.$executeRawUnsafe(
    `CREATE POLICY "Public read exams" ON "Exam" FOR SELECT TO anon, authenticated USING (true);`,
  )

  // 2. Seed Jobs, Results, Admit Cards, and Private Jobs
  const jobsData = [
    {
      title: 'SSC Combined Graduate Level (CGL) Recruitment 2026 — Apply Online for 17,727 Posts',
      slug: 'ssc-cgl-recruitment-2026',
      category: Category.GOVT_JOB,
      organization: 'Staff Selection Commission (SSC)',
      postCount: 17727,
      qualification: "Bachelor's Degree in Any Stream from a Recognized University",
      lastDate: new Date('2026-10-28'),
      officialLink: 'https://ssc.gov.in',
      state: 'All India',
      examName: 'SSC CGL 2026',
      description:
        'Staff Selection Commission (SSC) has released the official notification for the Combined Graduate Level Examination (CGL) 2026 for 17,727 Group B and Group C posts across Central Government Ministries and Departments.',
      isFeatured: true,
      views: 148290,
    },
    {
      title: 'IBPS PO / MT XVI Recruitment 2026 — Apply Online for 5,850 Probationary Officer Posts',
      slug: 'ibps-po-mt-xvi-recruitment-2026',
      category: Category.GOVT_JOB,
      organization: 'Institute of Banking Personnel Selection (IBPS)',
      postCount: 5850,
      qualification: 'Graduation Degree in Any Discipline',
      lastDate: new Date('2026-10-21'),
      officialLink: 'https://www.ibps.in',
      state: 'All India',
      examName: 'IBPS PO 2026',
      description:
        'Institute of Banking Personnel Selection (IBPS) invites online applications for CRP PO/MT-XVI for recruitment of Probationary Officers / Management Trainees in 11 Public Sector Banks across India.',
      isFeatured: true,
      views: 94120,
    },
    {
      title: 'Railway RRB NTPC Graduate & Undergraduate Recruitment 2026 — 11,558 Posts',
      slug: 'railway-rrb-ntpc-recruitment-2026',
      category: Category.GOVT_JOB,
      organization: 'Railway Recruitment Boards (RRB)',
      postCount: 11558,
      qualification: '10+2 Intermediate OR Bachelor Degree',
      lastDate: new Date('2026-10-25'),
      officialLink: 'https://indianrailways.gov.in',
      state: 'All India',
      examName: 'RRB NTPC 2026',
      description:
        'Ministry of Railways, Railway Recruitment Boards (RRB) has published CEN 05/2026 & CEN 06/2026 for Non-Technical Popular Categories (NTPC) Graduate & Undergraduate level posts.',
      isFeatured: true,
      views: 215400,
    },
    {
      title: 'SBI Junior Associates (Clerk) Recruitment 2026 — 13,735 Posts Across India',
      slug: 'sbi-clerk-junior-associates-2026',
      category: Category.GOVT_JOB,
      organization: 'State Bank of India (SBI)',
      postCount: 13735,
      qualification: 'Graduation in Any Discipline',
      lastDate: new Date('2026-11-07'),
      officialLink: 'https://sbi.co.in/web/careers',
      state: 'All India',
      examName: 'SBI Clerk 2026',
      description:
        'State Bank of India (SBI) Central Recruitment & Promotion Department has invited online applications for 13,735 Junior Associate (Customer Support & Sales) clerical cadre vacancies.',
      isFeatured: true,
      views: 172300,
    },
    {
      title: 'UPPSC Combined State / Upper Subordinate Services (PCS) Exam 2026 — Apply Online',
      slug: 'uppsc-pcs-pre-exam-2026',
      category: Category.GOVT_JOB,
      organization: 'Uttar Pradesh Public Service Commission (UPPSC)',
      postCount: 620,
      qualification: 'Bachelor Degree in Any Stream from any Recogonised University/College in India',
      lastDate: new Date('2026-11-02'),
      officialLink: 'https://uppsc.up.nic.in',
      state: 'Uttar Pradesh',
      examName: 'UPPSC PCS 2026',
      description:
        'Uttar Pradesh Public Service Commission (UPPSC) has released notification for the Combined State / Upper Subordinate Services (PCS) Examination 2026.',
      isFeatured: false,
      views: 68900,
    },
    {
      title: 'UPSC Civil Services (IAS / IFS) Mains Result 2026 Declared — Download Roll Number PDF',
      slug: 'upsc-civil-services-mains-result-2026',
      category: Category.RESULT,
      organization: 'Union Public Service Commission (UPSC)',
      lastDate: new Date('2026-09-30'),
      officialLink: 'https://upsc.gov.in',
      state: 'All India',
      examName: 'UPSC CSE 2026',
      description:
        'Union Public Service Commission (UPSC) has declared the written result of the Civil Services (Main) Examination 2026.',
      isFeatured: true,
      views: 312000,
    },
    {
      title: 'SSC CHSL 10+2 Tier-I Result 2026 With Cutoff Marks & Merit List PDF',
      slug: 'ssc-chsl-tier-1-result-2026',
      category: Category.RESULT,
      organization: 'Staff Selection Commission (SSC)',
      lastDate: new Date('2026-09-28'),
      officialLink: 'https://ssc.gov.in',
      state: 'All India',
      examName: 'SSC CHSL 2026',
      description:
        'Staff Selection Commission (SSC) has released the Tier-I Computer Based Examination Result and Category-wise Cut-Off Marks for CHSL 2026.',
      isFeatured: true,
      views: 198400,
    },
    {
      title: 'SSC MTS & Havaldar Admit Card 2026 — Download Region-Wise Hall Ticket & Status',
      slug: 'ssc-mts-havaldar-admit-card-2026',
      category: Category.ADMIT_CARD,
      organization: 'Staff Selection Commission (SSC)',
      lastDate: new Date('2026-10-15'),
      officialLink: 'https://ssc.gov.in',
      state: 'All India',
      examName: 'SSC MTS 2026',
      description:
        'Staff Selection Commission (SSC) has released the Application Status, Exam City Intimation, and Admit Card for Multi-Tasking Staff and Havaldar Examination 2026.',
      isFeatured: true,
      views: 245000,
    },
    {
      title: 'Railway RRB Assistant Loco Pilot (ALP) CBT-II Exam City & Admit Card 2026',
      slug: 'railway-rrb-alp-cbt-2-admit-card-2026',
      category: Category.ADMIT_CARD,
      organization: 'Railway Recruitment Boards (RRB)',
      lastDate: new Date('2026-10-12'),
      officialLink: 'https://indianrailways.gov.in',
      state: 'All India',
      examName: 'RRB ALP 2026',
      description:
        'Railway Recruitment Boards (RRBs) have activated the Exam City & Date Intimation Slip and e-Call Letter (Admit Card) download link for ALP CBT-2.',
      isFeatured: true,
      views: 134500,
    },
    {
      title: 'TCS National Qualifier Test (NQT) 2026 — Off-Campus Hiring for Ninja & Digital (₹3.5 – ₹7.5 LPA)',
      slug: 'tcs-nqt-off-campus-hiring-2026',
      category: Category.PRIVATE_JOB,
      organization: 'Tata Consultancy Services (TCS)',
      postCount: 10000,
      qualification: 'B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc (2025, 2026, 2027 Batch)',
      lastDate: new Date('2026-10-30'),
      officialLink: 'https://www.tcs.com/careers',
      state: 'Pan India',
      examName: 'TCS NQT 2026',
      description:
        'Tata Consultancy Services (TCS) has announced its pan-India Off-Campus Fresher Hiring via TCS NQT for Ninja, Digital, and Prime profiles.',
      isFeatured: true,
      views: 164000,
    },
    {
      title: 'Infosys Systems Engineer & Specialist Programmer Off-Campus Drive 2026 (₹3.6 – ₹9.5 LPA)',
      slug: 'infosys-systems-engineer-hiring-2026',
      category: Category.PRIVATE_JOB,
      organization: 'Infosys Limited',
      postCount: 4500,
      qualification: 'B.E. / B.Tech / MCA / M.Sc / BCA / B.Sc (CS/IT)',
      lastDate: new Date('2026-10-24'),
      officialLink: 'https://www.infosys.com/careers/',
      state: 'Pan India',
      examName: 'Infosys Off-Campus 2026',
      description:
        'Infosys is hiring fresh engineering and computer science graduates across India for Systems Engineer (SE), Digital Specialist Engineer (DSE), and Specialist Programmer (SP) roles.',
      isFeatured: true,
      views: 118900,
    },
  ]

  for (const job of jobsData) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: job,
      create: job,
    })
  }

  // 3. Seed Top Exams
  const examsData = [
    {
      name: 'UPSC Civil Services (IAS / IPS / IFS)',
      slug: 'upsc',
      category: ExamCategory.UPSC,
      conductedBy: 'Union Public Service Commission',
      frequency: 'Annual (Prelims in May, Mains in Sept)',
      officialSite: 'https://upsc.gov.in',
      description:
        "India's premier competitive examination for recruitment to IAS, IPS, IFS, and Central Group A & B Services.",
      isTop: true,
    },
    {
      name: 'SSC CGL, CHSL, MTS & GD Constable',
      slug: 'ssc',
      category: ExamCategory.SSC,
      conductedBy: 'Staff Selection Commission (Govt. of India)',
      frequency: 'Annual Calendar across Graduate, 12th & 10th Levels',
      officialSite: 'https://ssc.gov.in',
      description:
        'Gateway to Group B and Group C posts across Central Ministries, Income Tax, Customs, CBI, and CAPF.',
      isTop: true,
    },
    {
      name: 'IBPS & SBI Banking Exams (PO / Clerk / SO / RRB)',
      slug: 'ibps',
      category: ExamCategory.BANKING,
      conductedBy: 'IBPS, State Bank of India & RBI',
      frequency: 'Multiple Recruitment Cycles Every Year',
      officialSite: 'https://www.ibps.in',
      description:
        'Fastest-Selection Public Sector Banking career track across SBI, RBI, NABARD, and 11 Nationalized Banks.',
      isTop: true,
    },
    {
      name: 'Indian Railways RRB (NTPC, ALP, Group D, JE)',
      slug: 'railway',
      category: ExamCategory.RAILWAY,
      conductedBy: 'Railway Recruitment Boards (21 Regional RRBs)',
      frequency: 'Annual Railway Recruitment Calendar',
      officialSite: 'https://indianrailways.gov.in',
      description:
        'Technical and non-technical careers in Indian Railways including Station Master, Loco Pilot, and Junior Engineer.',
      isTop: true,
    },
  ]

  for (const exam of examsData) {
    await prisma.exam.upsert({
      where: { slug: exam.slug },
      update: exam,
      create: exam,
    })
  }

  console.log('✅ Supabase PostgreSQL Database seeded & RLS policies configured!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
