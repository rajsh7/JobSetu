import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://jobsetu.dpdns.org'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  title: {
    default:
      'JobSetu — Sarkari Result, Top Govt Jobs,Govt Exams, Private Jobs & Private Exams 2026',
    template: '%s | JobSetu (jobsetu.dpdns.org)',
  },
  description:
    'JobSetu (jobsetu.dpdns.org) — Your Bridge to a Brighter Career. Find Latest Sarkari Results, Top Government Jobs, Top Government Exams (UPSC, SSC, IBPS, Railway, State PSC), Private MNC Jobs, Private Placement Exams (TCS NQT, eLitmus, AMCAT, CoCubes, CAT, GATE), and Admit Cards. No login required — direct official links.',
  keywords: [
    'jobsetu',
    'jobsetu.dpdns.org',
    'sarkari result',
    'sarkari result 2026',
    'sarkari job',
    'sarkari naukri',
    'sarkari exam',
    'top government jobs 2026',
    'top government exams in india',
    'private jobs for freshers 2026',
    'private exams for jobs',
    'tcs nqt 2026 apply online',
    'elitmus exam 2026',
    'amcat exam registration',
    'infosys off campus drive 2026',
    'ssc cgl 2026 notification',
    'upsc cse result 2026',
    'railway rrb ntpc 2026',
    'ibps po 2026',
    'sbi clerk 2026',
    'admit card download 2026',
    'free job alert india',
  ],
  authors: [{ name: 'JobSetu Team', url: SITE_URL }],
  creator: 'JobSetu',
  publisher: 'JobSetu',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'JobSetu',
    title: 'JobSetu — Your Bridge to a Brighter Career | Govt & Private Jobs & Exams',
    description:
      'Explore Top Govt Jobs, Top Govt Exams, Private MNC Jobs, Private Placement Exams, Sarkari Results & Admit Cards with direct official links.',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'JobSetu — Your Bridge to a Brighter Career',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JobSetu — Your Bridge to a Brighter Career',
    description:
      'Top Govt Jobs, Govt Exams, Private Jobs, Private Exams, Sarkari Results & Admit Cards on jobsetu.dpdns.org.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env['NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'] ?? '',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  )
}
