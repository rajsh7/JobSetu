import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white text-slate-600">
      <div className="w-full pl-[5px] pr-[30px] py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="JobSetu — Your Bridge to a Brighter Career"
                width={160}
                height={60}
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-slate-500 leading-relaxed">
              <strong className="text-slate-800">JobSetu</strong> — <em>Your Bridge to a Brighter Career</em>. India&apos;s
              cleanest, fastest student portal for Sarkari Results, Government Job Notifications,
              Admit Cards, Private Sector Jobs, and Top Competitive Exams.
            </p>
          </div>

          {/* Portal Sections */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
              Portal Sections
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/latest-jobs" className="text-slate-600 hover:text-[#0A9FFC] hover:underline">
                  Latest Sarkari Jobs
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-slate-600 hover:text-[#0A9FFC] hover:underline">
                  Sarkari Exam Results
                </Link>
              </li>
              <li>
                <Link href="/admit-cards" className="text-slate-600 hover:text-[#0A9FFC] hover:underline">
                  Admit Cards / Hall Tickets
                </Link>
              </li>
              <li>
                <Link href="/private-jobs" className="text-slate-600 hover:text-[#0A9FFC] hover:underline">
                  Private &amp; MNC Jobs
                </Link>
              </li>
              <li>
                <Link href="/top-exams" className="text-slate-600 hover:text-[#0A9FFC] hover:underline">
                  Top Competitive Exams
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Exams */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
              Top Exams
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/top-exams/upsc" className="text-slate-600 hover:text-[#0A9FFC] hover:underline">
                  UPSC CSE (IAS / IPS)
                </Link>
              </li>
              <li>
                <Link href="/top-exams/ssc" className="text-slate-600 hover:text-[#0A9FFC] hover:underline">
                  SSC (CGL, CHSL, MTS)
                </Link>
              </li>
              <li>
                <Link href="/top-exams/ibps" className="text-slate-600 hover:text-[#0A9FFC] hover:underline">
                  IBPS &amp; SBI Banking
                </Link>
              </li>
              <li>
                <Link href="/top-exams/railway" className="text-slate-600 hover:text-[#0A9FFC] hover:underline">
                  Indian Railways (RRB)
                </Link>
              </li>
              <li>
                <Link href="/top-exams/state-psc" className="text-slate-600 hover:text-[#0A9FFC] hover:underline">
                  State PSC Exams
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Portals Quick Redirects */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
              Official Portals
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://ssc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0A9FFC] hover:underline"
                >
                  <span>SSC Official (ssc.gov.in)</span>
                  <ExternalLink size={12} className="text-[#0A9FFC]" />
                </a>
              </li>
              <li>
                <a
                  href="https://upsc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0A9FFC] hover:underline"
                >
                  <span>UPSC Official (upsc.gov.in)</span>
                  <ExternalLink size={12} className="text-[#0A9FFC]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ibps.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0A9FFC] hover:underline"
                >
                  <span>IBPS Official (ibps.in)</span>
                  <ExternalLink size={12} className="text-[#0A9FFC]" />
                </a>
              </li>
              <li>
                <a
                  href="https://indianrailways.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0A9FFC] hover:underline"
                >
                  <span>Indian Railways</span>
                  <ExternalLink size={12} className="text-[#0A9FFC]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          <p className="font-medium text-slate-500">
            © {year} JobSetu — Your Bridge to a Brighter Career. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
