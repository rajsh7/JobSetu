import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-800 py-10 text-slate-300 mt-8">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-heading font-bold text-white">
              🌉 <span className="text-brand-orange">Job</span>Setu
            </Link>
            <p className="mt-2 text-sm text-slate-400">
              Your Bridge to a Better Career. India&apos;s fastest portal for Sarkari Jobs & Exams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 font-heading font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/latest-jobs" className="hover:text-white">Latest Jobs</Link></li>
              <li><Link href="/results" className="hover:text-white">Results</Link></li>
              <li><Link href="/admit-cards" className="hover:text-white">Admit Cards</Link></li>
              <li><Link href="/private-jobs" className="hover:text-white">Private Jobs</Link></li>
              <li><Link href="/top-exams" className="hover:text-white">Top Exams</Link></li>
            </ul>
          </div>

          {/* Top Exams */}
          <div>
            <h3 className="mb-3 font-heading font-semibold text-white">Top Exams</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/top-exams/upsc" className="hover:text-white">UPSC</Link></li>
              <li><Link href="/top-exams/ssc" className="hover:text-white">SSC</Link></li>
              <li><Link href="/top-exams/ibps" className="hover:text-white">IBPS Banking</Link></li>
              <li><Link href="/top-exams/railway" className="hover:text-white">Railway (RRB)</Link></li>
              <li><Link href="/top-exams/state-psc" className="hover:text-white">State PSC</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-3 font-heading font-semibold text-white">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
          <p>
            © {year} JobSetu. All rights reserved. |{' '}
            <span>
              We redirect to official government websites. We do not collect any personal data.
            </span>
          </p>
          <p className="mt-1">
            Disclaimer: JobSetu is not affiliated with any government body. Always verify from official sources.
          </p>
        </div>
      </div>
    </footer>
  )
}
