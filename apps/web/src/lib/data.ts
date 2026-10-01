import { Category, ExamCategory, type Job, type Exam } from '@jobsetu/types'
import { supabase } from './supabase'
import { redisGet, redisSet } from './redis'
import { EXTENDED_GOVT_JOBS } from './catalog-data'

export interface DetailedPortalItem extends Job {
  shortInfo?: string
  applicationBegin?: string
  feeLastDate?: string
  examDateText?: string
  admitCardDateText?: string
  resultDateText?: string
  ageLimitMin?: number
  ageLimitMax?: number
  ageAsOn?: string
  feeGeneral?: string
  feeScSt?: string
  feeFemale?: string
  paymentMode?: string
  selectionProcess?: string[]
  importantLinks?: {
    label: string
    url: string
    highlight?: boolean
  }[]
  vacancyBreakdown?: {
    postName: string
    totalPost: string
    eligibility: string
  }[]
  specification?: string
  isUpcoming?: boolean
  tentativeDate?: string
  eligibility?: string
}

// ─── Realistic 2026 Indian Sarkari & Career Portal Seed Data ─────────────────
export const SEED_ITEMS: DetailedPortalItem[] = [
  // ─── SARKARI JOBS (GOVT_JOB) ───────────────────────────────────────────────
  {
    id: 'job-ssc-cgl-2026',
    title: 'SSC Combined Graduate Level (CGL) Recruitment 2026 — Apply Online for 17,727 Posts',
    slug: 'ssc-cgl-recruitment-2026',
    category: Category.GOVT_JOB,
    organization: 'Staff Selection Commission (SSC)',
    postCount: 17727,
    qualification: "Bachelor's Degree in Any Stream from a Recognized University",
    lastDate: '2026-10-28',
    officialLink: 'https://ssc.gov.in',
    state: 'All India',
    examName: 'SSC CGL 2026',
    isActive: true,
    isFeatured: true,
    views: 148290,
    createdAt: '2026-09-28T10:00:00Z',
    updatedAt: '2026-09-30T08:00:00Z',
    shortInfo:
      'Staff Selection Commission (SSC) has released the official notification for the Combined Graduate Level Examination (CGL) 2026 for 17,727 Group B and Group C posts across Central Government Ministries and Departments.',
    applicationBegin: '24 Sept 2026',
    feeLastDate: '29 Oct 2026',
    examDateText: 'December 2026 (Tier-I)',
    ageLimitMin: 18,
    ageLimitMax: 32,
    ageAsOn: '01/08/2026',
    feeGeneral: '₹100/-',
    feeScSt: '₹0/- (Nil)',
    feeFemale: '₹0/- (Exempted)',
    paymentMode: 'BHIM UPI, Net Banking, Visa/MasterCard/RuPay Debit Card',
    selectionProcess: [
      'Tier-I: Computer Based Examination (Objective)',
      'Tier-II: Computer Based Examination + DEST',
      'Document Verification by User Department',
      'Medical Fitness Examination',
    ],
    vacancyBreakdown: [
      {
        postName: 'Assistant Section Officer (ASO) — CSS / MEA / Railways',
        totalPost: '4,120',
        eligibility: "Bachelor's Degree in Any Stream from any Recognized University in India.",
      },
      {
        postName: 'Inspector of Income Tax (CBDT) & Inspector (CGST & Central Excise)',
        totalPost: '6,450',
        eligibility: "Bachelor's Degree in Any Stream + Physical Standards for Excise Inspector.",
      },
      {
        postName: 'Auditor (CAG / CGDA) & Tax Assistant (CBDT / CBIC)',
        totalPost: '7,157',
        eligibility: "Bachelor's Degree in Any Stream from a Recognized University.",
      },
    ],
    importantLinks: [
      { label: 'Apply Online (One-Time Registration & Form)', url: 'https://ssc.gov.in', highlight: true },
      { label: 'Download Official Notification PDF', url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/' },
      { label: 'Official SSC Website', url: 'https://ssc.gov.in' },
    ],
  },
  {
    id: 'job-ibps-po-2026',
    title: 'IBPS PO / MT XVI Recruitment 2026 — Apply Online for 5,850 Probationary Officer Posts',
    slug: 'ibps-po-mt-xvi-recruitment-2026',
    category: Category.GOVT_JOB,
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    postCount: 5850,
    qualification: "Graduation Degree in Any Discipline",
    lastDate: '2026-10-21',
    officialLink: 'https://www.ibps.in',
    state: 'All India',
    examName: 'IBPS PO 2026',
    isActive: true,
    isFeatured: true,
    views: 94120,
    createdAt: '2026-09-27T11:30:00Z',
    updatedAt: '2026-09-30T09:00:00Z',
    shortInfo:
      'Institute of Banking Personnel Selection (IBPS) invites online applications for CRP PO/MT-XVI for recruitment of Probationary Officers / Management Trainees in 11 Public Sector Banks across India.',
    applicationBegin: '01 Oct 2026',
    feeLastDate: '21 Oct 2026',
    examDateText: '19 & 20 Nov 2026 (Prelims)',
    ageLimitMin: 20,
    ageLimitMax: 30,
    ageAsOn: '01/10/2026',
    feeGeneral: '₹850/-',
    feeScSt: '₹175/-',
    feeFemale: '₹850/- (General/OBC)',
    paymentMode: 'Online via UPI, Debit Card, Credit Card, Net Banking',
    selectionProcess: [
      'Preliminary Examination (100 Marks — 1 Hour)',
      'Main Examination (200 Marks Objective + 25 Marks Descriptive)',
      'Personal Interview conducted by Participating Banks',
    ],
    vacancyBreakdown: [
      {
        postName: 'Probationary Officer / Management Trainee (CRP PO/MT-XVI)',
        totalPost: '5,850',
        eligibility: 'Bachelor Degree in Any Stream from a Recognized University + Basic Computer Literacy.',
      },
    ],
    importantLinks: [
      { label: 'Apply Online (Registration & Login)', url: 'https://www.ibps.in', highlight: true },
      { label: 'Download Official Notification PDF', url: 'https://www.ibps.in' },
      { label: 'Official IBPS Portal', url: 'https://www.ibps.in' },
    ],
  },
  {
    id: 'job-rrb-ntpc-2026',
    title: 'Railway RRB NTPC Graduate & Undergraduate Recruitment 2026 — 11,558 Posts',
    slug: 'railway-rrb-ntpc-recruitment-2026',
    category: Category.GOVT_JOB,
    organization: 'Railway Recruitment Boards (RRB)',
    postCount: 11558,
    qualification: '10+2 Intermediate OR Bachelor Degree',
    lastDate: '2026-10-25',
    officialLink: 'https://indianrailways.gov.in',
    state: 'All India',
    examName: 'RRB NTPC 2026',
    isActive: true,
    isFeatured: true,
    views: 215400,
    createdAt: '2026-09-26T09:00:00Z',
    updatedAt: '2026-09-30T07:00:00Z',
    shortInfo:
      'Ministry of Railways, Railway Recruitment Boards (RRB) has published CEN 05/2026 & CEN 06/2026 for Non-Technical Popular Categories (NTPC) Graduate & Undergraduate level posts including Station Master, Goods Train Manager, and Junior Clerk.',
    applicationBegin: '20 Sept 2026',
    feeLastDate: '25 Oct 2026',
    examDateText: 'Jan 2027 (CBT-1)',
    ageLimitMin: 18,
    ageLimitMax: 36,
    ageAsOn: '01/01/2027',
    feeGeneral: '₹500/- (₹400 Refunded after CBT-1)',
    feeScSt: '₹250/- (100% Refunded after CBT-1)',
    feeFemale: '₹250/- (100% Refunded after CBT-1)',
    paymentMode: 'Online UPI, SBI Net Banking, Debit/Credit Card',
    selectionProcess: [
      '1st Stage Computer Based Test (CBT-1)',
      '2nd Stage Computer Based Test (CBT-2)',
      'Computer Based Aptitude Test (CBAT) / Typing Skill Test',
      'Document Verification & Medical Examination',
    ],
    vacancyBreakdown: [
      {
        postName: 'Graduate Posts (Chief Commercial Cum Ticket Supervisor, Station Master, Goods Train Manager)',
        totalPost: '8,113',
        eligibility: "Bachelor's Degree in Any Stream from any Recognized University.",
      },
      {
        postName: 'Undergraduate Posts (Commercial Cum Ticket Clerk, Accounts Clerk Cum Typist, Junior Clerk)',
        totalPost: '3,445',
        eligibility: '10+2 (Intermediate) Exam Passed with minimum 50% marks.',
      },
    ],
    importantLinks: [
      { label: 'Apply Online (RRB Apply Portal)', url: 'https://www.rrbapply.gov.in', highlight: true },
      { label: 'Official Indian Railways Portal', url: 'https://indianrailways.gov.in' },
    ],
  },
  {
    id: 'job-uppsc-pcs-2026',
    title: 'UPPSC Combined State / Upper Subordinate Services (PCS) Exam 2026 — Apply Online',
    slug: 'uppsc-pcs-pre-exam-2026',
    category: Category.GOVT_JOB,
    organization: 'Uttar Pradesh Public Service Commission (UPPSC)',
    postCount: 620,
    qualification: 'Bachelor Degree in Any Stream + OTR Required',
    lastDate: '2026-11-02',
    officialLink: 'https://uppsc.up.nic.in',
    state: 'Uttar Pradesh',
    examName: 'UPPSC PCS 2026',
    isActive: true,
    isFeatured: false,
    views: 68900,
    createdAt: '2026-09-25T14:00:00Z',
    updatedAt: '2026-09-29T12:00:00Z',
    shortInfo:
      'Uttar Pradesh Public Service Commission (UPPSC) has released notification for the Combined State / Upper Subordinate Services (PCS) Examination 2026 for SDM, DSP, BDO, ARTO, and other prestigious state civil service posts.',
    applicationBegin: '25 Sept 2026',
    feeLastDate: '02 Nov 2026',
    examDateText: 'December 2026',
    ageLimitMin: 21,
    ageLimitMax: 40,
    ageAsOn: '01/07/2026',
    feeGeneral: '₹125/-',
    feeScSt: '₹65/-',
    feeFemale: 'As per Category',
    paymentMode: 'SBI MOPS Net Banking, UPI, Debit Card',
    importantLinks: [
      { label: 'Apply Online via OTR (UPPSC Portal)', url: 'https://uppsc.up.nic.in', highlight: true },
      { label: 'Official UPPSC Website', url: 'https://uppsc.up.nic.in' },
    ],
  },
  {
    id: 'job-sbi-clerk-2026',
    title: 'SBI Junior Associates (Clerk) Recruitment 2026 — 13,735 Posts Across India',
    slug: 'sbi-clerk-junior-associates-2026',
    category: Category.GOVT_JOB,
    organization: 'State Bank of India (SBI)',
    postCount: 13735,
    qualification: 'Graduation in Any Discipline',
    lastDate: '2026-11-07',
    officialLink: 'https://sbi.co.in/web/careers',
    state: 'All India',
    examName: 'SBI Clerk 2026',
    isActive: true,
    isFeatured: true,
    views: 172300,
    createdAt: '2026-09-29T08:30:00Z',
    updatedAt: '2026-09-30T10:00:00Z',
    shortInfo:
      'State Bank of India (SBI) Central Recruitment & Promotion Department has invited online applications for 13,735 Junior Associate (Customer Support & Sales) clerical cadre vacancies across all circles.',
    applicationBegin: '29 Sept 2026',
    feeLastDate: '07 Nov 2026',
    examDateText: 'January 2027',
    ageLimitMin: 20,
    ageLimitMax: 28,
    ageAsOn: '01/04/2026',
    feeGeneral: '₹750/-',
    feeScSt: '₹0/- (Nil)',
    feeFemale: '₹750/- (Gen/OBC/EWS)',
    paymentMode: 'UPI, Net Banking, Debit/Credit Card',
    importantLinks: [
      { label: 'Apply Online (SBI Careers)', url: 'https://sbi.co.in/web/careers', highlight: true },
      { label: 'Official SBI Careers Page', url: 'https://sbi.co.in/web/careers' },
    ],
  },
  {
    id: 'job-canara-bank-apprentice-2026',
    title: 'Canara Bank Graduate Apprentice Recruitment 2026 — Apply Online for 3,500 Posts',
    slug: 'canara-bank-apprentice-recruitment-2026',
    category: Category.GOVT_JOB,
    organization: 'Canara Bank (A Govt. of India Undertaking)',
    postCount: 3500,
    qualification: 'Bachelor Degree in Any Stream from Recognized University',
    lastDate: '2026-10-17',
    officialLink: 'https://canarabank.com/pages/recruitment',
    state: 'All India',
    examName: 'Canara Bank Apprentice 2026',
    isActive: true,
    isFeatured: true,
    views: 89400,
    createdAt: '2026-09-28T09:00:00Z',
    updatedAt: '2026-09-30T10:00:00Z',
    shortInfo:
      'Canara Bank invites online applications for engagement of 3,500 Graduate Apprentices under the Apprentices Act, 1961 for FY 2026-27 across various states and union territories of India.',
    applicationBegin: '21 Sept 2026',
    feeLastDate: '17 Oct 2026',
    examDateText: 'November 2026 (Merit / Test)',
    ageLimitMin: 20,
    ageLimitMax: 28,
    ageAsOn: '01/09/2026',
    feeGeneral: '₹500/-',
    feeScSt: '₹0/- (Nil)',
    feeFemale: '₹500/-',
    paymentMode: 'Online Payment Gateway (Debit/Credit/UPI)',
    selectionProcess: [
      'Shortlisting based on Graduation marks merit',
      'Local Language Proficiency Test',
      'Document Verification & Medical Checkup',
    ],
    importantLinks: [
      { label: 'Apply Online (Canara Bank Recruitment Portal)', url: 'https://canarabank.com/pages/recruitment', highlight: true },
      { label: 'Download Official Notification PDF', url: 'https://canarabank.com' },
      { label: 'Official Canara Bank Website', url: 'https://canarabank.com' },
    ],
  },
  {
    id: 'job-mp-police-constable-2026',
    title: 'MP Police Constable & ASI Recruitment 2026 — Apply Online for 7,500 Posts',
    slug: 'mp-police-constable-recruitment-2026',
    category: Category.GOVT_JOB,
    organization: 'MP Employees Selection Board (MPESB)',
    postCount: 7500,
    qualification: '10th / 12th Pass from Recognized Board',
    lastDate: '2026-10-06',
    officialLink: 'https://esb.mp.gov.in',
    state: 'Madhya Pradesh',
    examName: 'MP Police Constable 2026',
    isActive: true,
    isFeatured: true,
    views: 124300,
    createdAt: '2026-09-26T12:00:00Z',
    updatedAt: '2026-09-30T11:00:00Z',
    shortInfo:
      'Madhya Pradesh Employees Selection Board (MPESB / Vyapam) has published official notification for recruitment of 7,500 Constables (GD & Special Armed Force) in MP Police Department.',
    applicationBegin: '15 Sept 2026',
    feeLastDate: '06 Oct 2026',
    examDateText: 'November 2026',
    ageLimitMin: 18,
    ageLimitMax: 33,
    ageAsOn: '01/01/2026',
    feeGeneral: '₹500/-',
    feeScSt: '₹250/- (SC/ST/OBC of MP)',
    paymentMode: 'MP Online Kiosk or Net Banking / UPI',
    importantLinks: [
      { label: 'Apply Online (MPESB Official Portal)', url: 'https://esb.mp.gov.in', highlight: true },
      { label: 'Download Rule Book / Notification PDF', url: 'https://esb.mp.gov.in' },
      { label: 'Official MPESB Website', url: 'https://esb.mp.gov.in' },
    ],
  },
  {
    id: 'job-ssc-chsl-2026',
    title: 'SSC CHSL (10+2) Recruitment 2026 — Apply Online for 2,536 LDC, JSA & DEO Posts',
    slug: 'ssc-chsl-10-2-recruitment-2026',
    category: Category.GOVT_JOB,
    organization: 'Staff Selection Commission (SSC)',
    postCount: 2536,
    qualification: '12th (Intermediate) Exam Passed from Recognized Board',
    lastDate: '2026-10-18',
    officialLink: 'https://ssc.gov.in',
    state: 'All India',
    examName: 'SSC CHSL 2026',
    isActive: true,
    isFeatured: true,
    views: 156000,
    createdAt: '2026-09-27T08:00:00Z',
    updatedAt: '2026-09-30T14:00:00Z',
    shortInfo:
      'Staff Selection Commission (SSC) has invited online applications for Combined Higher Secondary Level (10+2) Examination 2026 for Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO) vacancies.',
    applicationBegin: '20 Sept 2026',
    feeLastDate: '18 Oct 2026',
    examDateText: 'November-December 2026 (Tier-I)',
    ageLimitMin: 18,
    ageLimitMax: 27,
    ageAsOn: '01/08/2026',
    feeGeneral: '₹100/-',
    feeScSt: '₹0/- (Exempted)',
    feeFemale: '₹0/- (Exempted)',
    importantLinks: [
      { label: 'Apply Online (SSC OTR Portal)', url: 'https://ssc.gov.in', highlight: true },
      { label: 'Download CHSL Notification PDF', url: 'https://ssc.gov.in' },
      { label: 'Official SSC Portal', url: 'https://ssc.gov.in' },
    ],
    specification: 'SSC',
  },
  {
    id: 'job-ctet-teaching-2026',
    title: 'CBSE Central Teacher Eligibility Test (CTET) 2026 — Online Application Form',
    slug: 'cbse-ctet-dec-2026-online-form',
    category: Category.GOVT_JOB,
    specification: 'Teaching',
    organization: 'Central Board of Secondary Education (CBSE)',
    postCount: 22000,
    qualification: 'B.Ed / D.El.Ed / BTC / Senior Secondary with 50% Marks',
    lastDate: '2026-10-31',
    officialLink: 'https://ctet.nic.in',
    state: 'All India',
    examName: 'CTET 2026',
    isActive: true,
    isFeatured: true,
    views: 184500,
    createdAt: '2026-09-25T10:00:00Z',
    updatedAt: '2026-09-30T15:00:00Z',
    shortInfo:
      'Central Board of Secondary Education (CBSE) has released notification for Central Teacher Eligibility Test (CTET) 2026 for Paper-I (Class 1-5) and Paper-II (Class 6-8) Teachers in KVS, NVS, Central Schools.',
    applicationBegin: '17 Sept 2026',
    feeLastDate: '31 Oct 2026',
    examDateText: '01 December 2026',
    feeGeneral: '₹1000/- (Single Paper) / ₹1200/- (Both)',
    feeScSt: '₹500/- (Single) / ₹600/- (Both)',
    importantLinks: [
      { label: 'Apply Online (CTET Official Portal)', url: 'https://ctet.nic.in', highlight: true },
      { label: 'Download Information Bulletin PDF', url: 'https://ctet.nic.in' },
    ],
  },
  {
    id: 'job-army-defence-2026',
    title: 'Indian Army 10+2 TES 53 & CDS II Recruitment 2026 — Apply Online for 460 Posts',
    slug: 'indian-army-tes-cds-recruitment-2026',
    category: Category.GOVT_JOB,
    specification: 'Defence',
    organization: 'Indian Armed Forces (Army, Navy, Air Force)',
    postCount: 460,
    qualification: '10+2 PCM (Min 60% Marks) + JEE Mains 2026 / Graduation',
    lastDate: '2026-10-25',
    officialLink: 'https://joinindianarmy.nic.in',
    state: 'All India',
    examName: 'Indian Army TES 53 / CDS',
    isActive: true,
    isFeatured: true,
    views: 139000,
    createdAt: '2026-09-24T11:00:00Z',
    updatedAt: '2026-09-30T13:00:00Z',
    shortInfo:
      'Indian Armed Forces invites applications for Technical Entry Scheme (TES-53 Course) for 10+2 candidates and Combined Defence Services (CDS) for permanent and short service commissions as Commissioned Officers.',
    applicationBegin: '20 Sept 2026',
    feeLastDate: '25 Oct 2026',
    examDateText: 'SSB Interview: Jan-Feb 2027',
    ageLimitMin: 16,
    ageLimitMax: 24,
    feeGeneral: '₹0/- (No Application Fee)',
    importantLinks: [
      { label: 'Apply Online (Join Indian Army Portal)', url: 'https://joinindianarmy.nic.in', highlight: true },
      { label: 'Official Defence Recruitment Portal', url: 'https://joinindianarmy.nic.in' },
    ],
  },
  {
    id: 'job-upsc-ese-2026',
    title: 'UPSC Engineering Services (ESE) & Combined Geo-Scientist 2026 — 457 Posts',
    slug: 'upsc-ese-engineering-services-2026',
    category: Category.GOVT_JOB,
    specification: 'UPSC',
    organization: 'Union Public Service Commission (UPSC)',
    postCount: 457,
    qualification: 'Degree in Engineering (Civil, Mechanical, Electrical, E&T) / M.Sc',
    lastDate: '2026-10-22',
    officialLink: 'https://upsconline.nic.in',
    state: 'All India',
    examName: 'UPSC ESE 2026',
    isActive: true,
    isFeatured: true,
    views: 112000,
    createdAt: '2026-09-23T08:00:00Z',
    updatedAt: '2026-09-30T10:00:00Z',
    shortInfo:
      'Union Public Service Commission (UPSC) has announced notification for Engineering Services Examination (ESE 2026) for recruitment of Group A and B engineers in Railways, CPWD, MES, and CWS.',
    applicationBegin: '18 Sept 2026',
    feeLastDate: '22 Oct 2026',
    examDateText: '09 February 2027 (Prelims)',
    ageLimitMin: 21,
    ageLimitMax: 30,
    feeGeneral: '₹200/-',
    feeScSt: '₹0/- (Nil)',
    feeFemale: '₹0/- (Exempted)',
    importantLinks: [
      { label: 'Apply Online (UPSC OTR Portal)', url: 'https://upsconline.nic.in', highlight: true },
      { label: 'Download ESE Notification PDF', url: 'https://upsc.gov.in' },
    ],
  },
  {
    id: 'job-delhi-police-si-2026',
    title: 'Delhi Police & Central Armed Police Forces (CAPF) SI Recruitment 2026 — 4,187 Posts',
    slug: 'delhi-police-capf-si-recruitment-2026',
    category: Category.GOVT_JOB,
    specification: 'Police',
    organization: 'Staff Selection Commission (SSC) / Delhi Police',
    postCount: 4187,
    qualification: 'Bachelor Degree in Any Stream from Recognized University + LMV License',
    lastDate: '2026-11-05',
    officialLink: 'https://ssc.gov.in',
    state: 'All India',
    examName: 'SSC CPO SI 2026',
    isActive: true,
    isFeatured: true,
    views: 165000,
    createdAt: '2026-09-26T14:00:00Z',
    updatedAt: '2026-09-30T16:00:00Z',
    shortInfo:
      'Staff Selection Commission has released notification for Sub-Inspector in Delhi Police and Central Armed Police Forces (BSF, CISF, CRPF, ITBP, SSB) Examination 2026 for 4,187 vacancies.',
    applicationBegin: '27 Sept 2026',
    feeLastDate: '05 Nov 2026',
    examDateText: 'December 2026 (Paper-I)',
    ageLimitMin: 20,
    ageLimitMax: 25,
    feeGeneral: '₹100/-',
    feeScSt: '₹0/- (Exempted)',
    feeFemale: '₹0/- (Exempted)',
    importantLinks: [
      { label: 'Apply Online (SSC Portal)', url: 'https://ssc.gov.in', highlight: true },
      { label: 'Download CPO SI Notification PDF', url: 'https://ssc.gov.in' },
    ],
  },

  // ─── UPCOMING GOVERNMENT JOBS (2026 - 2027 OFFICIAL CALENDARS) ─────────────
  {
    id: 'job-ssc-gd-constable-2027',
    title: 'SSC Constable GD in CAPFs, SSF & Rifleman (Assam Rifles) 2027 — 39,481 Posts',
    slug: 'ssc-gd-constable-recruitment-2027',
    category: Category.GOVT_JOB,
    specification: 'Police',
    organization: 'Staff Selection Commission (SSC)',
    postCount: 39481,
    qualification: '10th (Matriculation) Exam Passed from Recognized Board',
    lastDate: '2026-12-31',
    officialLink: 'https://ssc.gov.in',
    state: 'All India',
    examName: 'SSC GD 2027',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Nov 2026',
    isFeatured: true,
    views: 420000,
    createdAt: '2026-09-30T10:00:00Z',
    updatedAt: '2026-10-01T08:00:00Z',
    shortInfo:
      'Staff Selection Commission has announced the upcoming Constable (GD) examination in BSF, CISF, CRPF, SSB, ITBP, AR, and SSF for nearly 40,000 vacancies as per the official SSC 2026-2027 Exam Calendar.',
    examDateText: 'Jan – Feb 2027 (CBT)',
    feeGeneral: '₹100/-',
    feeScSt: '₹0/- (Exempted)',
    importantLinks: [
      { label: 'SSC Official Examination Calendar', url: 'https://ssc.gov.in', highlight: true },
      { label: 'Official SSC Portal', url: 'https://ssc.gov.in' },
    ],
  },
  {
    id: 'job-rrb-alp-2026-27',
    title: 'Railway RRB Assistant Loco Pilot (ALP) CEN 01/2026-27 — 18,799 Posts',
    slug: 'railway-rrb-alp-recruitment-2026-27',
    category: Category.GOVT_JOB,
    specification: 'Railway',
    organization: 'Railway Recruitment Boards (RRB)',
    postCount: 18799,
    qualification: '10th Pass + ITI / Diploma in Engineering (Mech/Elec/Auto/Electronics)',
    lastDate: '2026-11-30',
    officialLink: 'https://www.rrbapply.gov.in',
    state: 'All India',
    examName: 'RRB ALP 2026-27',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Annual Cycle 2026-27',
    isFeatured: true,
    views: 380000,
    createdAt: '2026-09-30T11:00:00Z',
    updatedAt: '2026-10-01T09:00:00Z',
    shortInfo:
      'Ministry of Railways, Railway Recruitment Boards (RRBs) conducting the mega Assistant Loco Pilot (ALP) recruitment cycle across all 21 railway zones for 18,799 posts.',
    examDateText: 'November 2026 (CBT-1)',
    importantLinks: [
      { label: 'RRB Apply Online Portal', url: 'https://www.rrbapply.gov.in', highlight: true },
      { label: 'Indian Railways Portal', url: 'https://indianrailways.gov.in' },
    ],
  },
  {
    id: 'job-rrb-group-d-2026-27',
    title: 'Railway RRB Group D (Level-1 Track Maintainer & Pointsman) 2026-27 — 1,03,769 Posts',
    slug: 'railway-rrb-group-d-recruitment-2026-27',
    category: Category.GOVT_JOB,
    specification: 'Railway',
    organization: 'Railway Recruitment Boards (RRB)',
    postCount: 103769,
    qualification: '10th Pass OR National Apprenticeship Certificate (NAC) / ITI',
    lastDate: '2027-01-15',
    officialLink: 'https://www.rrbapply.gov.in',
    state: 'All India',
    examName: 'RRB Group D 2026-27',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Dec 2026',
    isFeatured: true,
    views: 650000,
    createdAt: '2026-09-30T12:00:00Z',
    updatedAt: '2026-10-01T10:00:00Z',
    shortInfo:
      'Indian Railways has slated the next mega Group D (Level-1) CEN notification for over 1 lakh vacancies in track maintenance, electrical, mechanical, and signaling departments as per the Railway Annual Recruitment Calendar.',
    importantLinks: [
      { label: 'RRB Centralized Portal', url: 'https://www.rrbapply.gov.in', highlight: true },
    ],
  },
  {
    id: 'job-rrb-technician-2026-27',
    title: 'Railway RRB Technician Grade I Signal & Grade III Recruitment 2026-27 — 14,298 Posts',
    slug: 'railway-rrb-technician-recruitment-2026-27',
    category: Category.GOVT_JOB,
    specification: 'Railway',
    organization: 'Railway Recruitment Boards (RRB)',
    postCount: 14298,
    qualification: 'Matriculation + ITI / NCVT or B.Sc / Diploma in Engineering',
    lastDate: '2027-01-30',
    officialLink: 'https://www.rrbapply.gov.in',
    state: 'All India',
    examName: 'RRB Technician 2026-27',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Jan 2027',
    isFeatured: true,
    views: 290000,
    createdAt: '2026-09-30T13:00:00Z',
    updatedAt: '2026-10-01T10:30:00Z',
    shortInfo:
      'Railway Recruitment Boards scheduled the CEN for Technician Grade I Signal & Technician Grade III across zonal workshops and production units.',
    importantLinks: [
      { label: 'RRB Application Portal', url: 'https://www.rrbapply.gov.in', highlight: true },
    ],
  },
  {
    id: 'job-upsc-cse-2027',
    title: 'UPSC Civil Services (IAS / IPS / IFS) Examination 2027 — 1,105 Posts Expected',
    slug: 'upsc-civil-services-ias-ips-exam-2027',
    category: Category.GOVT_JOB,
    specification: 'UPSC',
    organization: 'Union Public Service Commission (UPSC)',
    postCount: 1105,
    qualification: 'Bachelor Degree in Any Stream from Recognized University',
    lastDate: '2027-03-05',
    officialLink: 'https://upsconline.nic.in',
    state: 'All India',
    examName: 'UPSC CSE 2027',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Feb 2027',
    isFeatured: true,
    views: 520000,
    createdAt: '2026-09-30T14:00:00Z',
    updatedAt: '2026-10-01T11:00:00Z',
    shortInfo:
      'Union Public Service Commission (UPSC) Annual Calendar has scheduled the Civil Services (Preliminary) Examination 2027 with notification release in February 2027.',
    examDateText: '23 May 2027 (Prelims)',
    importantLinks: [
      { label: 'UPSC Annual Calendar 2027 PDF', url: 'https://upsc.gov.in', highlight: true },
      { label: 'UPSC Online OTR Portal', url: 'https://upsconline.nic.in' },
    ],
  },
  {
    id: 'job-upsc-nda-1-2027',
    title: 'UPSC National Defence Academy & Naval Academy Exam (I) 2027 — 400 Posts',
    slug: 'upsc-nda-na-exam-1-2027',
    category: Category.GOVT_JOB,
    specification: 'Defence',
    organization: 'Union Public Service Commission (UPSC) / Armed Forces',
    postCount: 400,
    qualification: '10+2 Passed / Appearing with Physics, Chemistry & Maths',
    lastDate: '2027-01-09',
    officialLink: 'https://upsconline.nic.in',
    state: 'All India',
    examName: 'UPSC NDA (I) 2027',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Dec 2026',
    isFeatured: true,
    views: 240000,
    createdAt: '2026-09-30T15:00:00Z',
    updatedAt: '2026-10-01T11:30:00Z',
    shortInfo:
      'UPSC NDA-I 2027 notification for admission to Army, Navy, and Air Force wings of National Defence Academy for 155th Course and 117th Indian Naval Academy Course (INAC).',
    examDateText: 'April 2027',
    importantLinks: [
      { label: 'UPSC OTR Portal', url: 'https://upsconline.nic.in', highlight: true },
    ],
  },
  {
    id: 'job-sbi-po-2026-27',
    title: 'SBI Probationary Officer (PO) Recruitment 2026-27 — 2,000 Posts',
    slug: 'sbi-po-recruitment-2026-27',
    category: Category.GOVT_JOB,
    specification: 'Banking',
    organization: 'State Bank of India (SBI)',
    postCount: 2000,
    qualification: 'Graduation in Any Discipline from a Recognized University',
    lastDate: '2026-12-15',
    officialLink: 'https://sbi.co.in/web/careers',
    state: 'All India',
    examName: 'SBI PO 2026-27',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Nov 2026',
    isFeatured: true,
    views: 310000,
    createdAt: '2026-09-30T16:00:00Z',
    updatedAt: '2026-10-01T12:00:00Z',
    shortInfo:
      'State Bank of India is releasing the official notification for recruitment of Probationary Officers (PO) for 2,000 vacancies across SBI administrative circles.',
    importantLinks: [
      { label: 'SBI Careers Portal', url: 'https://sbi.co.in/web/careers', highlight: true },
    ],
  },
  {
    id: 'job-ibps-clerk-xv-2026-27',
    title: 'IBPS Clerk XV Recruitment 2026-27 — 6,128 Posts in 11 Public Sector Banks',
    slug: 'ibps-clerk-xv-recruitment-2026-27',
    category: Category.GOVT_JOB,
    specification: 'Banking',
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    postCount: 6128,
    qualification: 'Graduation in Any Discipline + Proficiency in Local Language',
    lastDate: '2027-01-20',
    officialLink: 'https://www.ibps.in',
    state: 'All India',
    examName: 'IBPS Clerk XV',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Dec 2026',
    isFeatured: true,
    views: 280000,
    createdAt: '2026-09-30T17:00:00Z',
    updatedAt: '2026-10-01T12:30:00Z',
    shortInfo:
      'IBPS Clerk XV recruitment for Customer Service Associates (Clerical Cadre) in participating banks including Bank of Baroda, Canara Bank, PNB, and Union Bank.',
    importantLinks: [
      { label: 'IBPS Official Portal', url: 'https://www.ibps.in', highlight: true },
    ],
  },
  {
    id: 'job-kvs-teaching-2026-27',
    title: 'KVS Kendriya Vidyalaya PRT, TGT & PGT Recruitment 2026-27 — 13,404 Posts',
    slug: 'kvs-teaching-prt-tgt-pgt-recruitment-2026-27',
    category: Category.GOVT_JOB,
    specification: 'Teaching',
    organization: 'Kendriya Vidyalaya Sangathan (KVS)',
    postCount: 13404,
    qualification: '12th/D.El.Ed (PRT) / B.Ed + CTET Qualified (TGT) / Post Graduation + B.Ed (PGT)',
    lastDate: '2027-02-15',
    officialLink: 'https://kvsangathan.nic.in',
    state: 'All India',
    examName: 'KVS Direct Recruitment 2026-27',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Jan 2027',
    isFeatured: true,
    views: 340000,
    createdAt: '2026-09-30T18:00:00Z',
    updatedAt: '2026-10-01T13:00:00Z',
    shortInfo:
      'Kendriya Vidyalaya Sangathan (KVS) upcoming recruitment drive for 13,404 Primary Teachers (PRT), Trained Graduate Teachers (TGT), and Post Graduate Teachers (PGT).',
    importantLinks: [
      { label: 'KVS Official Portal', url: 'https://kvsangathan.nic.in', highlight: true },
    ],
  },
  {
    id: 'job-nvs-teaching-2026-27',
    title: 'NVS Navodaya Vidyalaya Samiti Teachers & Staff Recruitment 2026-27 — 7,500 Posts',
    slug: 'nvs-navodaya-teachers-recruitment-2026-27',
    category: Category.GOVT_JOB,
    specification: 'Teaching',
    organization: 'Navodaya Vidyalaya Samiti (NVS)',
    postCount: 7500,
    qualification: 'Graduation / Post Graduation + B.Ed & CTET Qualified',
    lastDate: '2027-01-25',
    officialLink: 'https://navodaya.gov.in',
    state: 'All India',
    examName: 'NVS Recruitment 2026-27',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Dec 2026',
    isFeatured: true,
    views: 210000,
    createdAt: '2026-09-30T19:00:00Z',
    updatedAt: '2026-10-01T13:30:00Z',
    shortInfo:
      'Navodaya Vidyalaya Samiti (NVS) upcoming drive for TGT, PGT, Miscellaneous category teachers and non-teaching personnel in residential Jawahar Navodaya Vidyalayas.',
    importantLinks: [
      { label: 'NVS Official Website', url: 'https://navodaya.gov.in', highlight: true },
    ],
  },
  {
    id: 'job-ssc-mts-2026-27',
    title: 'SSC Multi-Tasking Staff (MTS) & Havaldar (CBIC/CBN) 2026-27 — 9,583 Posts',
    slug: 'ssc-mts-havaldar-recruitment-2026-27',
    category: Category.GOVT_JOB,
    specification: 'SSC',
    organization: 'Staff Selection Commission (SSC)',
    postCount: 9583,
    qualification: '10th (Matriculation) Exam Passed from Recognized Board',
    lastDate: '2026-12-20',
    officialLink: 'https://ssc.gov.in',
    state: 'All India',
    examName: 'SSC MTS 2026-27',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Nov 2026',
    isFeatured: true,
    views: 275000,
    createdAt: '2026-09-30T20:00:00Z',
    updatedAt: '2026-10-01T14:00:00Z',
    shortInfo:
      'SSC upcoming cycle for Multi-Tasking (Non-Technical) Staff in Central Govt Ministries and Havaldar in Central Board of Indirect Taxes & Customs (CBIC) and Central Bureau of Narcotics (CBN).',
    importantLinks: [
      { label: 'SSC Official Portal', url: 'https://ssc.gov.in', highlight: true },
    ],
  },
  {
    id: 'job-up-police-constable-2026-27',
    title: 'UP Police Constable & Fireman Re-Exam & Recruitment 2026-27 — 60,244 Posts',
    slug: 'up-police-constable-recruitment-2026-27',
    category: Category.GOVT_JOB,
    specification: 'Police',
    organization: 'UP Police Recruitment & Promotion Board (UPPRPB)',
    postCount: 60244,
    qualification: '10+2 (Intermediate) Passed from Any Recognized Board',
    lastDate: '2026-11-20',
    officialLink: 'https://uppbpb.gov.in',
    state: 'Uttar Pradesh',
    examName: 'UP Police Constable 2026-27',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Exam: Nov 2026',
    isFeatured: true,
    views: 780000,
    createdAt: '2026-09-30T21:00:00Z',
    updatedAt: '2026-10-01T14:30:00Z',
    shortInfo:
      'Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) historic recruitment for 60,244 Civil Police Constables across Uttar Pradesh.',
    importantLinks: [
      { label: 'UPPRPB Official Portal', url: 'https://uppbpb.gov.in', highlight: true },
    ],
  },
  {
    id: 'job-bpsc-71st-cce-2026-27',
    title: 'BPSC 71st Combined Competitive Examination (CCE) 2026-27 — 1,950 Posts',
    slug: 'bpsc-71st-cce-prelims-exam-2026-27',
    category: Category.GOVT_JOB,
    specification: 'State PSC',
    organization: 'Bihar Public Service Commission (BPSC)',
    postCount: 1950,
    qualification: 'Bachelor Degree in Any Stream from a Recognized University',
    lastDate: '2027-01-10',
    officialLink: 'https://www.bpsc.bih.nic.in',
    state: 'Bihar',
    examName: 'BPSC 71st CCE',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Dec 2026',
    isFeatured: true,
    views: 320000,
    createdAt: '2026-09-30T22:00:00Z',
    updatedAt: '2026-10-01T15:00:00Z',
    shortInfo:
      'Bihar Public Service Commission (BPSC) 71st CCE for Deputy Collector, DSP, Revenue Officer, Block Panchayati Raj Officer, and other state administrative officers.',
    importantLinks: [
      { label: 'BPSC Official Website', url: 'https://www.bpsc.bih.nic.in', highlight: true },
    ],
  },
  {
    id: 'job-iaf-afcat-1-2027',
    title: 'Indian Air Force AFCAT (01/2027) Flying & Ground Duty Technical/Non-Technical — 317 Posts',
    slug: 'iaf-afcat-01-2027-recruitment',
    category: Category.GOVT_JOB,
    specification: 'Defence',
    organization: 'Indian Air Force (IAF)',
    postCount: 317,
    qualification: '10+2 with 50% in Maths & Physics + Graduation / B.E. / B.Tech (Min 60%)',
    lastDate: '2027-01-05',
    officialLink: 'https://afcat.cdac.in',
    state: 'All India',
    examName: 'IAF AFCAT 01/2027',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Dec 2026',
    isFeatured: true,
    views: 195000,
    createdAt: '2026-09-30T23:00:00Z',
    updatedAt: '2026-10-01T15:30:00Z',
    shortInfo:
      'Air Force Common Admission Test (AFCAT 01/2027) for grant of Short Service Commission (SSC) in Flying and Ground Duty (Technical and Non-Technical) branches.',
    importantLinks: [
      { label: 'IAF AFCAT CDAC Portal', url: 'https://afcat.cdac.in', highlight: true },
    ],
  },
  {
    id: 'job-navy-agniveer-ssr-2026-27',
    title: 'Indian Navy Agniveer (SSR & MR) 01/2027 Batch — 4,000 Posts',
    slug: 'indian-navy-agniveer-ssr-mr-01-2027',
    category: Category.GOVT_JOB,
    specification: 'Defence',
    organization: 'Indian Navy',
    postCount: 4000,
    qualification: '10+2 with Maths & Physics (SSR) / 10th Pass (MR)',
    lastDate: '2026-12-15',
    officialLink: 'https://www.joinindiannavy.gov.in',
    state: 'All India',
    examName: 'Indian Navy Agniveer 01/2027',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Nov 2026',
    isFeatured: true,
    views: 260000,
    createdAt: '2026-10-01T00:00:00Z',
    updatedAt: '2026-10-01T16:00:00Z',
    shortInfo:
      'Indian Navy invites applications from unmarried male and female candidates for enrolment as Agniveer (SSR) and Agniveer (MR) for 01/2027 batch.',
    importantLinks: [
      { label: 'Join Indian Navy Official Portal', url: 'https://www.joinindiannavy.gov.in', highlight: true },
    ],
  },
  {
    id: 'job-aiims-norcet-7-2026-27',
    title: 'AIIMS Nursing Officer Recruitment Common Eligibility Test (NORCET 7) 2026-27 — 3,200 Posts',
    slug: 'aiims-norcet-7-nursing-officer-2026-27',
    category: Category.GOVT_JOB,
    specification: 'Medical',
    organization: 'All India Institute of Medical Sciences (AIIMS New Delhi)',
    postCount: 3200,
    qualification: 'B.Sc (Hons.) Nursing / B.Sc Nursing OR Diploma in GNM + 2 Years Hospital Experience',
    lastDate: '2026-10-28',
    officialLink: 'https://aiimsexams.ac.in',
    state: 'All India',
    examName: 'AIIMS NORCET 7',
    isActive: true,
    isUpcoming: false,
    isFeatured: true,
    views: 175000,
    createdAt: '2026-09-28T14:00:00Z',
    updatedAt: '2026-10-01T16:30:00Z',
    shortInfo:
      'AIIMS New Delhi conducts NORCET-7 for recruitment of Nursing Officer (Group B) posts across AIIMS New Delhi and all other participating AIIMS across India.',
    importantLinks: [
      { label: 'AIIMS Exams Official Portal', url: 'https://aiimsexams.ac.in', highlight: true },
    ],
  },
  {
    id: 'job-isro-scientist-engineer-2026-27',
    title: 'ISRO ICRB Scientist / Engineer (SC) Recruitment 2026-27 — 303 Posts',
    slug: 'isro-scientist-engineer-sc-recruitment-2026-27',
    category: Category.GOVT_JOB,
    specification: 'Engineering',
    organization: 'Indian Space Research Organisation (ISRO)',
    postCount: 303,
    qualification: 'B.E / B.Tech in Civil, Electrical, Mechanical, Electronics, Computer Science with Min 65% Marks',
    lastDate: '2027-02-28',
    officialLink: 'https://www.isro.gov.in',
    state: 'All India',
    examName: 'ISRO ICRB 2026-27',
    isActive: true,
    isUpcoming: true,
    tentativeDate: 'Notification: Jan 2027',
    isFeatured: true,
    views: 185000,
    createdAt: '2026-10-01T01:00:00Z',
    updatedAt: '2026-10-01T17:00:00Z',
    shortInfo:
      'ISRO Centralised Recruitment Board (ICRB) announces recruitment of Scientist/Engineer SC in Level 10 of Pay Matrix across VSSC, URSC, SDSC SHAR, and LPSC.',
    importantLinks: [
      { label: 'ISRO Careers Official Website', url: 'https://www.isro.gov.in/Careers.html', highlight: true },
    ],
  },

  // ─── SARKARI RESULTS (RESULT) ──────────────────────────────────────────────
  {
    id: 'res-upsc-cse-mains-2026',
    title: 'UPSC Civil Services (IAS / IFS) Mains Result 2026 Declared — Download Roll Number PDF',
    slug: 'upsc-civil-services-mains-result-2026',
    category: Category.RESULT,
    organization: 'Union Public Service Commission (UPSC)',
    lastDate: '2026-09-30',
    officialLink: 'https://upsc.gov.in',
    state: 'All India',
    examName: 'UPSC CSE 2026',
    isActive: true,
    isFeatured: true,
    views: 312000,
    createdAt: '2026-09-30T06:00:00Z',
    updatedAt: '2026-09-30T06:30:00Z',
    resultDateText: '30 Sept 2026',
    shortInfo:
      'Union Public Service Commission (UPSC) has declared the written result of the Civil Services (Main) Examination 2026. Candidates who qualified are eligible for the Personality Test (Interview) at Dholpur House, New Delhi.',
    importantLinks: [
      { label: 'Download UPSC CSE Mains Result PDF (Roll No. Wise)', url: 'https://upsc.gov.in/exams-related-info/written-result', highlight: true },
      { label: 'Download UPSC CSE Mains Result PDF (With Name)', url: 'https://upsc.gov.in' },
      { label: 'Official UPSC Website', url: 'https://upsc.gov.in' },
    ],
  },
  {
    id: 'res-ssc-chsl-tier1-2026',
    title: 'SSC CHSL 10+2 Tier-I Result 2026 With Cutoff Marks & Merit List PDF',
    slug: 'ssc-chsl-tier-1-result-2026',
    category: Category.RESULT,
    organization: 'Staff Selection Commission (SSC)',
    lastDate: '2026-09-28',
    officialLink: 'https://ssc.gov.in',
    state: 'All India',
    examName: 'SSC CHSL 2026',
    isActive: true,
    isFeatured: true,
    views: 198400,
    createdAt: '2026-09-28T16:00:00Z',
    updatedAt: '2026-09-29T10:00:00Z',
    resultDateText: '28 Sept 2026',
    shortInfo:
      'Staff Selection Commission (SSC) has released the Tier-I Computer Based Examination Result and Category-wise Cut-Off Marks for Combined Higher Secondary (10+2) Level Examination 2026.',
    importantLinks: [
      { label: 'Download SSC CHSL Tier-I Result List-1 (LDC/JSA)', url: 'https://ssc.gov.in', highlight: true },
      { label: 'Download Cutoff Notice PDF', url: 'https://ssc.gov.in' },
      { label: 'Official SSC Portal', url: 'https://ssc.gov.in' },
    ],
  },
  {
    id: 'res-ibps-rrb-clerk-2026',
    title: 'IBPS RRB Office Assistant (Clerk) XV Prelims Result & Score Card 2026',
    slug: 'ibps-rrb-clerk-prelims-result-2026',
    category: Category.RESULT,
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    lastDate: '2026-09-27',
    officialLink: 'https://www.ibps.in',
    state: 'All India',
    examName: 'IBPS RRB XV 2026',
    isActive: true,
    isFeatured: false,
    views: 88300,
    createdAt: '2026-09-27T15:00:00Z',
    updatedAt: '2026-09-28T09:00:00Z',
    resultDateText: '27 Sept 2026',
    shortInfo:
      'IBPS has published the Preliminary Examination Result Status and Score Card for CRP RRB-XV Office Assistants (Multipurpose). Qualified candidates will appear in the Main Examination.',
    importantLinks: [
      { label: 'Check IBPS RRB Clerk Prelims Result / Score Card', url: 'https://www.ibps.in', highlight: true },
      { label: 'Official IBPS Website', url: 'https://www.ibps.in' },
    ],
  },
  {
    id: 'res-bpsc-71st-pre-2026',
    title: 'BPSC 71st Combined Preliminary Competitive Exam Result 2026 — Out Now',
    slug: 'bpsc-71st-prelims-result-2026',
    category: Category.RESULT,
    organization: 'Bihar Public Service Commission (BPSC)',
    lastDate: '2026-09-26',
    officialLink: 'https://www.bpsc.bih.nic.in',
    state: 'Bihar',
    examName: 'BPSC 71st CCE',
    isActive: true,
    isFeatured: false,
    views: 74200,
    createdAt: '2026-09-26T18:00:00Z',
    updatedAt: '2026-09-27T08:00:00Z',
    resultDateText: '26 Sept 2026',
    shortInfo:
      'Bihar Public Service Commission (BPSC) has released the result and category-wise cutoff marks for the Integrated 71st Combined (Preliminary) Competitive Examination.',
    importantLinks: [
      { label: 'Download BPSC 71st Prelims Result PDF', url: 'https://www.bpsc.bih.nic.in', highlight: true },
      { label: 'Official BPSC Portal', url: 'https://www.bpsc.bih.nic.in' },
    ],
  },

  // ─── ADMIT CARDS (ADMIT_CARD) ──────────────────────────────────────────────
  {
    id: 'admit-ssc-mts-2026',
    title: 'SSC MTS & Havaldar Admit Card 2026 — Download Region-Wise Hall Ticket & Status',
    slug: 'ssc-mts-havaldar-admit-card-2026',
    category: Category.ADMIT_CARD,
    organization: 'Staff Selection Commission (SSC)',
    lastDate: '2026-10-15',
    officialLink: 'https://ssc.gov.in',
    state: 'All India',
    examName: 'SSC MTS 2026',
    isActive: true,
    isFeatured: true,
    views: 245000,
    createdAt: '2026-09-29T12:00:00Z',
    updatedAt: '2026-09-30T09:00:00Z',
    admitCardDateText: 'Available Now',
    examDateText: '05 Oct – 12 Nov 2026',
    shortInfo:
      'Staff Selection Commission (SSC) has released the Application Status, Exam City Intimation, and Admit Card for Multi-Tasking (Non-Technical) Staff and Havaldar (CBIC & CBN) Examination 2026 across all 9 SSC regions (NR, CR, ER, WR, SR, KKR, MPR, NWR, NER).',
    importantLinks: [
      { label: 'Download SSC MTS Admit Card (Candidate Login)', url: 'https://ssc.gov.in', highlight: true },
      { label: 'Check Exam City & Application Status', url: 'https://ssc.gov.in' },
      { label: 'Official SSC Website', url: 'https://ssc.gov.in' },
    ],
  },
  {
    id: 'admit-rrb-alp-cbt2-2026',
    title: 'Railway RRB Assistant Loco Pilot (ALP) CBT-II Exam City & Admit Card 2026',
    slug: 'railway-rrb-alp-cbt-2-admit-card-2026',
    category: Category.ADMIT_CARD,
    organization: 'Railway Recruitment Boards (RRB)',
    lastDate: '2026-10-12',
    officialLink: 'https://indianrailways.gov.in',
    state: 'All India',
    examName: 'RRB ALP 2026',
    isActive: true,
    isFeatured: true,
    views: 134500,
    createdAt: '2026-09-28T09:00:00Z',
    updatedAt: '2026-09-29T11:00:00Z',
    admitCardDateText: 'Available Now',
    examDateText: '12 & 13 Oct 2026',
    shortInfo:
      'Railway Recruitment Boards (RRBs) have activated the Exam City & Date Intimation Slip and e-Call Letter (Admit Card) download link for Assistant Loco Pilot (ALP) Second Stage Computer Based Test (CBT-2).',
    importantLinks: [
      { label: 'Download RRB ALP e-Call Letter (Admit Card)', url: 'https://www.rrbapply.gov.in', highlight: true },
      { label: 'Check Exam City & Free Travel Pass (SC/ST)', url: 'https://indianrailways.gov.in' },
    ],
  },
  {
    id: 'admit-up-police-si-2026',
    title: 'UP Police Sub-Inspector (SI) Written Exam Admit Card & District Intimation 2026',
    slug: 'up-police-si-admit-card-2026',
    category: Category.ADMIT_CARD,
    organization: 'UP Police Recruitment & Promotion Board (UPPRPB)',
    lastDate: '2026-10-18',
    officialLink: 'https://uppbpb.gov.in',
    state: 'Uttar Pradesh',
    examName: 'UP Police SI 2026',
    isActive: true,
    isFeatured: false,
    views: 112000,
    createdAt: '2026-09-27T10:00:00Z',
    updatedAt: '2026-09-28T10:00:00Z',
    admitCardDateText: 'Available Now',
    examDateText: '18 & 19 Oct 2026',
    shortInfo:
      'Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB), Lucknow has released the Exam District Intimation Slip and Hall Ticket for Sub Inspector (Civil Police) Recruitment 2026.',
    importantLinks: [
      { label: 'Download UP Police SI Admit Card', url: 'https://uppbpb.gov.in', highlight: true },
      { label: 'Official UPPRPB Website', url: 'https://uppbpb.gov.in' },
    ],
  },
  {
    id: 'admit-ctet-dec-2026',
    title: 'CBSE CTET Pre-Admit Card / Exam City Slip 2026 — Paper I & II',
    slug: 'cbse-ctet-admit-card-2026',
    category: Category.ADMIT_CARD,
    organization: 'Central Board of Secondary Education (CBSE)',
    lastDate: '2026-10-20',
    officialLink: 'https://ctet.nic.in',
    state: 'All India',
    examName: 'CTET 2026',
    isActive: true,
    isFeatured: false,
    views: 92400,
    createdAt: '2026-09-26T11:00:00Z',
    updatedAt: '2026-09-27T14:00:00Z',
    admitCardDateText: 'City Slip Out',
    examDateText: '25 Oct 2026',
    shortInfo:
      'Central Board of Secondary Education (CBSE) has released the Advance City Intimation and Admit Card for Central Teacher Eligibility Test (CTET) 2026.',
    importantLinks: [
      { label: 'Download CTET Admit Card / City Slip', url: 'https://ctet.nic.in', highlight: true },
      { label: 'Official CTET Website', url: 'https://ctet.nic.in' },
    ],
  },

  // ─── PRIVATE JOBS (PRIVATE_JOB) ────────────────────────────────────────────
  {
    id: 'priv-tcs-nqt-2026',
    title: 'TCS National Qualifier Test (NQT) 2026 — Off-Campus Hiring for Ninja & Digital (₹3.5 – ₹7.5 LPA)',
    slug: 'tcs-nqt-off-campus-hiring-2026',
    category: Category.PRIVATE_JOB,
    organization: 'Tata Consultancy Services (TCS)',
    postCount: 10000,
    qualification: 'B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc (2025, 2026, 2027 Batch)',
    lastDate: '2026-10-30',
    officialLink: 'https://www.tcs.com/careers',
    state: 'Pan India (Bengaluru, Pune, Hyderabad, Noida, Chennai)',
    examName: 'TCS NQT 2026',
    isActive: true,
    isFeatured: true,
    views: 164000,
    createdAt: '2026-09-29T10:00:00Z',
    updatedAt: '2026-09-30T10:00:00Z',
    feeGeneral: '₹0/- (Free Registration on TCS NextStep)',
    feeScSt: '₹0/-',
    feeFemale: '₹0/-',
    shortInfo:
      'Tata Consultancy Services (TCS) has announced its pan-India Off-Campus Fresher Hiring via TCS NQT for Ninja (₹3.36 LPA), Digital (₹7.0 LPA), and Prime (₹9.0 – ₹11.5 LPA) profiles. No registration fee is charged by TCS.',
    selectionProcess: [
      'Part A: Foundation Section (Numerical, Verbal, Reasoning Ability)',
      'Part B: Advanced Quantitative & Advanced Coding (for Digital & Prime)',
      'Technical + Managerial + HR Interview Round',
    ],
    importantLinks: [
      { label: 'Apply Online on TCS NextStep Portal', url: 'https://nextstep.tcs.com', highlight: true },
      { label: 'TCS Official Careers Page', url: 'https://www.tcs.com/careers' },
    ],
  },
  {
    id: 'priv-infosys-se-2026',
    title: 'Infosys Systems Engineer & Specialist Programmer Off-Campus Drive 2026 (₹3.6 – ₹9.5 LPA)',
    slug: 'infosys-systems-engineer-hiring-2026',
    category: Category.PRIVATE_JOB,
    organization: 'Infosys Limited',
    postCount: 4500,
    qualification: 'B.E. / B.Tech / MCA / M.Sc / BCA / B.Sc (CS/IT)',
    lastDate: '2026-10-24',
    officialLink: 'https://www.infosys.com/careers/',
    state: 'Pan India (Mysuru Training + Major Tech Hubs)',
    examName: 'Infosys Off-Campus 2026',
    isActive: true,
    isFeatured: true,
    views: 118900,
    createdAt: '2026-09-28T13:00:00Z',
    updatedAt: '2026-09-29T15:00:00Z',
    feeGeneral: '₹0/- (Free Official Application)',
    shortInfo:
      'Infosys is hiring fresh engineering and computer science graduates across India for Systems Engineer (SE), Digital Specialist Engineer (DSE), and Specialist Programmer (SP) roles.',
    importantLinks: [
      { label: 'Apply Online on Infosys Launchpad / Careers', url: 'https://www.infosys.com/careers/', highlight: true },
    ],
  },
  {
    id: 'priv-accenture-ase-2026',
    title: 'Accenture Associate Software Engineer (ASE) Recruitment 2026 — ₹4.5 to ₹6.5 LPA',
    slug: 'accenture-associate-software-engineer-2026',
    category: Category.PRIVATE_JOB,
    organization: 'Accenture India',
    postCount: 3200,
    qualification: 'Any Graduate (B.E/B.Tech/BCA/B.Sc/B.Com/BBA — 2025/2026)',
    lastDate: '2026-11-05',
    officialLink: 'https://www.accenture.com/in-en/careers',
    state: 'Bengaluru, Hyderabad, Gurugram, Mumbai, Pune, Chennai',
    examName: 'Accenture ASE 2026',
    isActive: true,
    isFeatured: false,
    views: 91200,
    createdAt: '2026-09-27T09:00:00Z',
    updatedAt: '2026-09-28T12:00:00Z',
    feeGeneral: '₹0/- (No Application Fee)',
    shortInfo:
      'Accenture in India invites applications from fresh graduates for Packaged App Development Associate (ASE) and Advanced App Engineering Associate roles.',
    importantLinks: [
      { label: 'Apply Online on Accenture India Careers', url: 'https://www.accenture.com/in-en/careers', highlight: true },
    ],
  },
  {
    id: 'priv-hdfc-future-bankers-2026',
    title: 'HDFC Bank Relationship Manager & Operations Executive Hiring 2026 — Freshers & Experienced',
    slug: 'hdfc-bank-relationship-manager-hiring-2026',
    category: Category.PRIVATE_JOB,
    organization: 'HDFC Bank Ltd.',
    postCount: 2500,
    qualification: 'Any Graduate / MBA / PGDM with 50%+ Marks',
    lastDate: '2026-11-10',
    officialLink: 'https://www.hdfcbank.com/personal/about-us/careers',
    state: 'All India (Branch & Corporate Offices)',
    examName: 'HDFC Bank Careers 2026',
    isActive: true,
    isFeatured: false,
    views: 64300,
    createdAt: '2026-09-26T14:00:00Z',
    updatedAt: '2026-09-27T11:00:00Z',
    feeGeneral: '₹0/- (Direct Career Portal Apply)',
    shortInfo:
      'HDFC Bank is recruiting graduates across India for Retail Branch Banking, Personal Banker, and Operations Executive roles.',
    importantLinks: [
      { label: 'Apply Online on HDFC Bank Official Careers', url: 'https://www.hdfcbank.com/personal/about-us/careers', highlight: true },
    ],
  },
]

export const SEED_EXAMS: (Exam & { eligibility?: string; nextExamWindow?: string; patternSummary?: string })[] = [
  {
    id: 'exam-upsc-cse',
    name: 'UPSC Civil Services (IAS / IPS / IFS)',
    slug: 'upsc',
    category: ExamCategory.UPSC,
    conductedBy: 'Union Public Service Commission',
    frequency: 'Annual (Prelims in May, Mains in Sept)',
    officialSite: 'https://upsc.gov.in',
    description:
      "India's premier competitive examination for recruitment to the Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), and 20+ Central Group A & B Services.",
    eligibility: "Bachelor's Degree in any discipline; Age 21–32 years (relaxation for OBC/SC/ST).",
    nextExamWindow: 'Prelims: May 2027 | Mains: Sept 2026 Result Out',
    patternSummary: 'Stage 1: Prelims (GS + CSAT) → Stage 2: Mains (9 Descriptive Papers, 1750 Marks) → Stage 3: Personality Test (275 Marks)',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
  {
    id: 'exam-ssc-cgl',
    name: 'SSC CGL, CHSL, MTS & GD Constable',
    slug: 'ssc',
    category: ExamCategory.SSC,
    conductedBy: 'Staff Selection Commission (Govt. of India)',
    frequency: 'Annual Calendar across Graduate, 12th & 10th Levels',
    officialSite: 'https://ssc.gov.in',
    description:
      'Gateway to Group B and Group C posts across Central Ministries, Income Tax, Customs, CBI, NIA, CAG, and Central Armed Police Forces (CAPF).',
    eligibility: '10th Pass (MTS/GD), 12th Pass (CHSL), or Graduate (CGL/CPO).',
    nextExamWindow: 'SSC CGL 2026 Form Active | SSC MTS Admit Card Out',
    patternSummary: 'Tier-I Qualifying CBT → Tier-II Merit CBT + Skill/Typing Test',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
  {
    id: 'exam-ibps-sbi',
    name: 'IBPS & SBI Banking Exams (PO / Clerk / SO / RRB)',
    slug: 'ibps',
    category: ExamCategory.BANKING,
    conductedBy: 'IBPS, State Bank of India & RBI',
    frequency: 'Multiple Recruitment Cycles Every Year',
    officialSite: 'https://www.ibps.in',
    description:
      'Fastest-Selection Government/Public Sector Career track with fixed exam-to-joining timelines (6–8 months) across SBI, RBI, NABARD, and 11 Nationalized Banks.',
    eligibility: 'Graduation in any stream (Age 20–28 for Clerk, 20–30 for PO).',
    nextExamWindow: 'IBPS PO XVI & SBI Clerk 2026 Registrations Open',
    patternSummary: 'Prelims CBT (Speed Test) → Mains CBT + Descriptive (for PO) → Interview (for PO/SO)',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
  {
    id: 'exam-railway-rrb',
    name: 'Indian Railways RRB (NTPC, ALP, Group D, JE)',
    slug: 'railway',
    category: ExamCategory.RAILWAY,
    conductedBy: 'Railway Recruitment Boards (21 Regional RRBs)',
    frequency: 'Annual Railway Recruitment Calendar',
    officialSite: 'https://indianrailways.gov.in',
    description:
      'Largest employer in India offering technical and non-technical careers including Station Master, Loco Pilot, Junior Engineer, Technician, and Track Maintainer.',
    eligibility: '10th + ITI (ALP/Tech), 12th / Graduate (NTPC), Diploma/B.Tech (JE).',
    nextExamWindow: 'RRB NTPC (11,558 Posts) Open | RRB ALP CBT-2 Admit Card Out',
    patternSummary: 'CBT-1 → CBT-2 → CBAT/Typing Skill Test → Document Verification & Medical',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
  {
    id: 'exam-state-psc',
    name: 'State PSC Exams (UPPSC, BPSC, MPSC, RPSC, MPPSC)',
    slug: 'state-psc',
    category: ExamCategory.STATE_PSC,
    conductedBy: 'State Public Service Commissions',
    frequency: 'Annual State Civil Service Notifications',
    officialSite: 'https://uppsc.up.nic.in',
    description:
      'State-level administrative and police services recruiting SDM, Deputy SP, Tehsildar, BDO, and Commercial Tax Officers across Indian states.',
    eligibility: "Bachelor's Degree in any stream; Age 21–40 years (varies by State).",
    nextExamWindow: 'UPPSC PCS 2026 Active | BPSC 71st Prelims Result Declared',
    patternSummary: 'Prelims (Objective GS + CSAT) → Mains (Written) → Personal Interview',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
  {
    id: 'exam-defence',
    name: 'Defence Exams (NDA, CDS, AFCAT & Agniveer)',
    slug: 'defence',
    category: ExamCategory.DEFENCE,
    conductedBy: 'UPSC, Indian Army, Navy & Air Force',
    frequency: 'Twice Yearly (NDA I & II, CDS I & II, AFCAT I & II)',
    officialSite: 'https://joinindianarmy.nic.in',
    description:
      'Commissioned Officer and Agniveer entries into the Indian Army, Indian Navy, and Indian Air Force through NDA, IMA, INA, AFA, and OTA.',
    eligibility: '12th Pass (NDA / Agniveer) or Graduation (CDS / AFCAT).',
    nextExamWindow: 'NDA & CDS I 2027 Notification in December 2026',
    patternSummary: 'Written Exam → 5-Day SSB Interview (Intelligence, Psychology, GTO, Conference) → Medical',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
  {
    id: 'exam-teaching',
    name: 'Teaching Exams (CTET, UGC NET, KVS, DSSSB, NVS)',
    slug: 'teaching',
    category: ExamCategory.TEACHING,
    conductedBy: 'CBSE, NTA, KVS & State Education Boards',
    frequency: 'Twice Yearly (CTET & UGC NET)',
    officialSite: 'https://ctet.nic.in',
    description:
      'Central and State eligibility tests and direct recruitment exams for Primary Teachers (PRT), Trained Graduate Teachers (TGT), Post Graduate Teachers (PGT), and Assistant Professors.',
    eligibility: 'D.El.Ed / B.Ed + Graduation (CTET/KVS) or Master Degree (UGC NET).',
    nextExamWindow: 'CTET 2026 City Slip & Admit Card Available',
    patternSummary: 'Paper-I (Classes 1–5) & Paper-II (Classes 6–8) Objective CBT/OMR',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
  {
    id: 'exam-police',
    name: 'Police & CAPF (SSC CPO, Delhi Police, State SI & Constable)',
    slug: 'police',
    category: ExamCategory.POLICE,
    conductedBy: 'SSC & State Police Recruitment Boards',
    frequency: 'Annual State & Central Drives',
    officialSite: 'https://uppbpb.gov.in',
    description:
      'Uniformed service opportunities as Sub-Inspector (SI) and Constable in Delhi Police, CRPF, BSF, CISF, ITBP, SSB, and State Police Forces.',
    eligibility: '12th Pass (Constable) or Graduation (Sub-Inspector) + Physical Efficiency Test (PET/PST).',
    nextExamWindow: 'UP Police SI Exam on 18–19 Oct 2026',
    patternSummary: 'Written Exam → Physical Standard & Efficiency Test (PST/PET) → Medical Exam',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
]

export const SEED_PRIVATE_EXAMS: (Exam & { eligibility?: string; nextExamWindow?: string; patternSummary?: string; badgeLabel?: string })[] = [
  {
    id: 'pexam-tcs-nqt',
    name: 'TCS NQT (National Qualifier Test) — IT & Corporate Hiring',
    slug: 'tcs-nqt',
    category: ExamCategory.OTHER,
    badgeLabel: 'IT / MNC Placement',
    conductedBy: 'TCS iON & Tata Consultancy Services',
    frequency: 'Quarterly Exams (Score Valid for 2 Years)',
    officialSite: 'https://www.tcsion.com/hub/national-qualifier-test/',
    description:
      'India’s largest gateway exam for fresher hiring across TCS (Ninja ₹3.36 LPA, Digital ₹7.0 LPA, Prime ₹9–11.5 LPA) and 1,500+ partner IT & corporate employers.',
    eligibility: 'Pre-final & Final Year UG/PG Students (B.E/B.Tech/MCA/M.Sc/BCA/B.Sc/B.Com).',
    nextExamWindow: 'October & November 2026 Batch Registrations Active',
    patternSummary: 'Foundation Section (Numerical, Verbal, Reasoning) + Advanced Coding Section',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
  {
    id: 'pexam-elitmus-ph',
    name: 'eLitmus pH Test (Hiring Potential Assessment)',
    slug: 'elitmus',
    category: ExamCategory.OTHER,
    badgeLabel: 'Product Companies',
    conductedBy: 'eLitmus Evaluation Pvt. Ltd.',
    frequency: 'Every Weekend Across Major Indian Cities',
    officialSite: 'https://www.elitmus.com',
    description:
      'Premier national assessment used by top product-based & high-package tech companies ( ₹6 LPA – ₹18 LPA) to shortlist fresh engineering graduates.',
    eligibility: 'B.E. / B.Tech / MCA / M.E. / M.Tech / M.Sc (CS/IT).',
    nextExamWindow: 'Weekly Offline & Proctored Test Slots Open',
    patternSummary: 'Quantitative Aptitude, Logical Problem Solving & Verbal Ability (Percentile Scoring)',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
  {
    id: 'pexam-amcat',
    name: 'AMCAT (SHL Aspiring Minds Computer Adaptive Test)',
    slug: 'amcat',
    category: ExamCategory.OTHER,
    badgeLabel: 'MNC & BFSI Jobs',
    conductedBy: 'SHL India (Aspiring Minds)',
    frequency: 'On-Demand Slot Booking Year-Round',
    officialSite: 'https://www.myamcat.com',
    description:
      'Adaptive employability assessment accepted by 700+ MNCs, startups, and private banks (Cognizant, Mindtree, Axis Bank, Deloitte, Flipkart) for entry-level roles.',
    eligibility: 'Final Year & Passed-Out Graduates across Engineering, Management & Arts/Commerce.',
    nextExamWindow: 'Book Slot Anytime (Home / Center Based)',
    patternSummary: 'English, Quantitative Ability, Logical Ability + Domain Specific Modules (Automata Coding / Finance)',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
  {
    id: 'pexam-cocubes',
    name: 'CoCubes (Aon) National Placement Assessment',
    slug: 'cocubes',
    category: ExamCategory.OTHER,
    badgeLabel: 'Campus & Off-Campus',
    conductedBy: 'Aon Assessment Solutions (CoCubes)',
    frequency: 'Multiple Drives Throughout Academic Year',
    officialSite: 'https://www.aon.com',
    description:
      'Standardized pre-hire test connecting engineering and MBA students with 450+ corporate recruiters across IT services, core engineering, and consulting.',
    eligibility: 'B.E. / B.Tech / MBA / MCA students.',
    nextExamWindow: '2026–2027 Placement Season Active',
    patternSummary: 'Aptitude, Psychometric, Computer Fundamentals, Wet/Coding & Domain Test',
    isTop: true,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-30T00:00:00Z',
  },
]

// ─── Data Access Layer (Upstash Redis → Supabase PostgreSQL → Seed Enrichment) ─

export const ALL_CATALOG_ITEMS: DetailedPortalItem[] = [...SEED_ITEMS, ...EXTENDED_GOVT_JOBS]

export async function getPortalItems(category?: Category, limit = 2000): Promise<DetailedPortalItem[]> {
  const cacheKey = `jobsetu:items:${category ?? 'ALL'}:${limit}`
  const cached = await redisGet<DetailedPortalItem[]>(cacheKey)
  if (cached && cached.length > 50) return cached

  let result = category ? ALL_CATALOG_ITEMS.filter((i) => i.category === category) : ALL_CATALOG_ITEMS

  try {
    const { data, error } = await supabase
      .from('Job')
      .select('*')
      .eq('isActive', true)
      .order('createdAt', { ascending: false })
      .limit(limit)

    if (!error && data && data.length > 0) {
      const dbSlugs = new Set(data.map((r: Record<string, unknown>) => String(r['slug'])))
      const dbMapped = data.map((row: Record<string, unknown>) => {
        const slug = String(row['slug'])
        const match = ALL_CATALOG_ITEMS.find((s) => s.slug === slug)
        return {
          ...match,
          ...row,
          category: (row['category'] as Category) ?? match?.category ?? Category.GOVT_JOB,
        } as DetailedPortalItem
      })
      const remaining = result.filter((i) => !dbSlugs.has(i.slug))
      result = [...dbMapped, ...remaining]
      if (category) {
        result = result.filter((i) => i.category === category)
      }
    }
  } catch {
    // Fallback to catalog
  }

  const finalItems = result.slice(0, limit)
  await redisSet(cacheKey, finalItems, 300)
  return finalItems
}

export async function getPortalItemBySlug(slug: string): Promise<DetailedPortalItem | null> {
  const cacheKey = `jobsetu:item:${slug}`
  const cached = await redisGet<DetailedPortalItem>(cacheKey)
  if (cached) return cached

  const match = ALL_CATALOG_ITEMS.find((item) => item.slug === slug)

  try {
    const { data, error } = await supabase
      .from('Job')
      .select('*')
      .eq('slug', slug)
      .single()

    if (!error && data) {
      const row = data as Record<string, unknown>
      const item: DetailedPortalItem = {
        ...match,
        ...row,
        category: (row['category'] as Category) ?? match?.category ?? Category.GOVT_JOB,
      } as DetailedPortalItem
      await redisSet(cacheKey, item, 600)
      return item
    }
  } catch {
    // Fallback
  }

  if (match) {
    await redisSet(cacheKey, match, 600)
  }
  return match ?? null
}

export async function getTopExamsList() {
  const cacheKey = 'jobsetu:exams:govt'
  const cached = await redisGet<typeof SEED_EXAMS>(cacheKey)
  if (cached && cached.length > 0) return cached

  await redisSet(cacheKey, SEED_EXAMS, 600)
  return SEED_EXAMS
}

export async function getPrivateExamsList() {
  return SEED_PRIVATE_EXAMS
}

export async function getExamBySlug(slug: string) {
  const [govtExams, privateExams] = await Promise.all([
    getTopExamsList(),
    getPrivateExamsList(),
  ])
  return [...govtExams, ...privateExams].find((exam) => exam.slug === slug) ?? null
}

export async function searchPortal(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) {
    return {
      items: SEED_ITEMS.slice(0, 8),
      exams: [...SEED_EXAMS.slice(0, 4), ...SEED_PRIVATE_EXAMS.slice(0, 4)],
    }
  }

  const allItems = await getPortalItems(undefined, 100)
  const matchedItems = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.organization.toLowerCase().includes(q) ||
      (item.examName?.toLowerCase().includes(q) ?? false) ||
      (item.state?.toLowerCase().includes(q) ?? false) ||
      (item.qualification?.toLowerCase().includes(q) ?? false),
  )

  const [govtExams, privateExams] = await Promise.all([
    getTopExamsList(),
    getPrivateExamsList(),
  ])
  const allExams = [...govtExams, ...privateExams]
  const matchedExams = allExams.filter(
    (exam) =>
      exam.name.toLowerCase().includes(q) ||
      exam.conductedBy.toLowerCase().includes(q) ||
      exam.category.toLowerCase().includes(q) ||
      (exam.description?.toLowerCase().includes(q) ?? false),
  )

  return { items: matchedItems, exams: matchedExams }
}
