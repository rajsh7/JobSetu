import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://jobsetu.in'),
  title: {
    default: 'JobSetu — Your Bridge to a Brighter Career | Sarkari Results, Jobs, Admit Cards',
    template: '%s | JobSetu',
  },
  description:
    "JobSetu is India's fastest student career portal for Sarkari Results, Latest Government Jobs, Admit Cards, Private Jobs, and Top Exams (UPSC, SSC, IBPS, Railways, State PSC). Direct official links — no login required.",
  keywords: [
    'jobsetu',
    'sarkari result',
    'sarkari job',
    'sarkari naukri',
    'admit card',
    'govt jobs',
    'government jobs india',
    'private jobs for freshers',
    'ssc jobs',
    'upsc',
    'ibps',
    'railway jobs',
    'latest government jobs 2026',
    'exam results 2026',
  ],
  authors: [{ name: 'JobSetu Team' }],
  creator: 'JobSetu',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://jobsetu.in',
    siteName: 'JobSetu',
    title: 'JobSetu — Your Bridge to a Brighter Career',
    description:
      "India's fastest student portal for Sarkari Results, Govt Jobs, Admit Cards, Private Jobs & Top Exams.",
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
      "India's fastest student portal for Sarkari Results, Govt Jobs, Admit Cards, Private Jobs & Top Exams.",
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
