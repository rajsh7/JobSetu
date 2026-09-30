import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for catching bugs early
  reactStrictMode: true,

  // Image optimization - allow external domains for official govt logos
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.gov.in' },
      { protocol: 'https', hostname: '**.nic.in' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Turbopack is default in Next 16 dev, stable
  // experimental: {},

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },

  // Redirect bare /admin to login if needed
  async redirects() {
    return []
  },
}

export default nextConfig
