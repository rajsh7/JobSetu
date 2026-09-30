import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jobsetu.in'),
  title: {
    default: 'JobSetu — Your Bridge to a Better Career | Sarkari Jobs, Results, Admit Cards',
    template: '%s | JobSetu',
  },
  description:
    'JobSetu is India\'s fastest career portal for Sarkari Jobs, Government Exam Results, Admit Cards, Private Jobs, and Top Exams like UPSC, SSC, IBPS, Railways. Find your dream job today.',
  keywords: [
    'sarkari result', 'sarkari job', 'sarkari naukri', 'admit card', 'govt jobs',
    'government jobs india', 'ssc jobs', 'upsc', 'ibps', 'railway jobs',
    'latest government jobs 2026', 'exam results 2026',
  ],
  authors: [{ name: 'JobSetu Team' }],
  creator: 'JobSetu',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://jobsetu.in',
    siteName: 'JobSetu',
    title: 'JobSetu — Your Bridge to a Better Career',
    description: 'India\'s fastest portal for Sarkari Jobs, Results, Admit Cards & Private Jobs.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JobSetu — Your Bridge to a Better Career',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JobSetu — Your Bridge to a Better Career',
    description: 'India\'s fastest portal for Sarkari Jobs, Results, Admit Cards & Private Jobs.',
    images: ['/og-image.png'],
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
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        {/* Google AdSense — add your publisher ID here when approved */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossOrigin="anonymous" /> */}
      </head>
      <body className="min-h-screen bg-slate-50 font-body antialiased">
        {children}
      </body>
    </html>
  )
}
