import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, ExternalLink } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white text-zinc-700">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <div className="relative h-14 w-52 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="JobSetu — Your Bridge to a Brighter Career"
                  fill
                  sizes="220px"
                  className="object-cover object-center scale-[1.35]"
                />
              </div>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-zinc-600 leading-relaxed">
              <strong>JobSetu</strong> — <em>Your Bridge to a Brighter Career</em>. India&apos;s
              cleanest, fastest student portal for Sarkari Results, Government Job Notifications,
              Admit Cards, Private Sector Jobs, and Top Competitive Exams.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-medium text-zinc-800">
              <ShieldCheck size={15} className="text-emerald-600" />
              <span>100% Free • No Login Required • Direct Official Links</span>
            </div>
          </div>

          {/* Portal Sections */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-black">
              Portal Sections
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/latest-jobs" className="hover:text-black hover:underline">
                  Latest Sarkari Jobs
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-black hover:underline">
                  Sarkari Exam Results
                </Link>
              </li>
              <li>
                <Link href="/admit-cards" className="hover:text-black hover:underline">
                  Admit Cards / Hall Tickets
                </Link>
              </li>
              <li>
                <Link href="/private-jobs" className="hover:text-black hover:underline">
                  Private &amp; MNC Jobs
                </Link>
              </li>
              <li>
                <Link href="/top-exams" className="hover:text-black hover:underline">
                  Top Competitive Exams
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Exams */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-black">
              Top Exams
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/top-exams/upsc" className="hover:text-black hover:underline">
                  UPSC CSE (IAS / IPS)
                </Link>
              </li>
              <li>
                <Link href="/top-exams/ssc" className="hover:text-black hover:underline">
                  SSC (CGL, CHSL, MTS)
                </Link>
              </li>
              <li>
                <Link href="/top-exams/ibps" className="hover:text-black hover:underline">
                  IBPS &amp; SBI Banking
                </Link>
              </li>
              <li>
                <Link href="/top-exams/railway" className="hover:text-black hover:underline">
                  Indian Railways (RRB)
                </Link>
              </li>
              <li>
                <Link href="/top-exams/state-psc" className="hover:text-black hover:underline">
                  State PSC Exams
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Portals Quick Redirects */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-black">
              Official Portals
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://ssc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-black hover:underline"
                >
                  <span>SSC Official (ssc.gov.in)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://upsc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-black hover:underline"
                >
                  <span>UPSC Official (upsc.gov.in)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ibps.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-black hover:underline"
                >
                  <span>IBPS Official (ibps.in)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://indianrailways.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-black hover:underline"
                >
                  <span>Indian Railways</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500">
          <p className="font-medium text-zinc-700">
            © {year} JobSetu — Your Bridge to a Brighter Career. All Rights Reserved.
          </p>
          <p className="mt-1.5 max-w-3xl mx-auto">
            Disclaimer: JobSetu is an independent career information portal for students and job
            seekers. We do not require any login/signup and do not collect personal user data. All
            &ldquo;Apply Online&rdquo;, &ldquo;Download Result&rdquo;, and &ldquo;Admit Card&rdquo;
            buttons redirect directly to the respective official government or employer websites.
          </p>
        </div>
      </div>
    </footer>
  )
}
