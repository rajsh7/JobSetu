const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://jobsetu.dpdns.org'

export function PortalJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'JobSetu',
        alternateName: 'JobSetu — Your Bridge to a Brighter Career',
        description:
          'India student career portal for Sarkari Results, Top Government Jobs, Government Exams, Private MNC Jobs, Private Placement Exams & Admit Cards.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'JobSetu',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
