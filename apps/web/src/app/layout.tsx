import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://jobsetu.dpdns.org'
const SITE_NAME = 'Job Setu'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },

  title: {
    default: 'Job Setu — Sarkari Result 2026, Latest Govt Jobs, Admit Cards & Private Jobs',
    template: `%s | Job Setu`,
  },

  description:
    "Job Setu (JobSetu) — India's fastest free Sarkari job portal. Get Latest Govt Jobs 2026, Sarkari Result, Admit Cards, Answer Keys, Railway Jobs, SSC, UPSC, Banking, Police, State PSC, 10th Pass Jobs, Private & MNC Jobs. No login required. Updated every 30 minutes.",

  keywords: [
    // Brand — most important
    'job setu',
    'jobsetu',
    'job setu sarkari result',
    'jobsetu portal',
    'job setu india',
    'job setu govt jobs',
    // Core Sarkari
    'sarkari result',
    'sarkari result 2026',
    'sarkari naukri',
    'sarkari job 2026',
    'sarkari exam',
    'free job alert',
    'latest govt jobs 2026',
    'government jobs india 2026',
    // Popular Exams
    'ssc cgl 2026',
    'ssc chsl 2026',
    'upsc 2026 notification',
    'rrb ntpc 2026',
    'railway jobs 2026',
    'ibps po 2026',
    'sbi clerk 2026',
    'bank jobs 2026',
    'police jobs 2026',
    'state psc 2026',
    // Results & Admit Cards
    'admit card download 2026',
    'sarkari result admit card',
    'answer key 2026',
    // 10th/12th pass
    '10th pass govt job 2026',
    'iti jobs 2026',
    '12th pass sarkari job',
    // Private
    'private jobs freshers 2026',
    'mnc jobs india 2026',
  ],

  authors: [{ name: 'Job Setu Team', url: SITE_URL }],
  creator: 'Job Setu',
  publisher: 'Job Setu',

  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Job Setu — Latest Sarkari Result, Govt Jobs & Admit Cards 2026',
    description:
      "Job Setu: India's cleanest Sarkari job portal. SSC, UPSC, Railway, Banking, Police, State PSC, 10th Pass Jobs, Admit Cards & Results. Updated every 30 mins.",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Job Setu — Your Bridge to a Brighter Career',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Job Setu — Sarkari Result, Govt Jobs & Admit Cards 2026',
    description:
      "Job Setu: India's fastest free govt job portal. SSC, UPSC, Railway, Banking, Admit Cards & Results. No login needed.",
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
    google: (process.env['NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'] ?? '')
      .replace(/^google-site-verification=/, '')
      .trim(),
  },
}

// ─── JSON-LD: Organization (Google Knowledge Panel) ───────────────────────────
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Job Setu',
  alternateName: ['JobSetu', 'jobsetu', 'job-setu'],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Job Setu is India's free Sarkari result and government job portal providing latest govt jobs, admit cards, results, answer keys, and private jobs.",
  sameAs: ['https://github.com/rajsh7/JobSetu'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    areaServed: 'IN',
    availableLanguage: ['Hindi', 'English'],
  },
}

// ─── JSON-LD: WebSite (Google Search Box / Sitelinks) ─────────────────────────
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Job Setu',
  alternateName: 'JobSetu',
  url: SITE_URL,
  description:
    "India's fastest Sarkari result and government job alert portal — SSC, UPSC, Railway, Banking, Police, State PSC, Admit Cards & Results updated every 30 minutes.",
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: ['en-IN', 'hi'],
  publisher: {
    '@type': 'Organization',
    name: 'Job Setu',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
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
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAFAFA] text-[#09090B] antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  )
}
