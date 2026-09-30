import path from 'node:path'
import { defineConfig } from 'prisma/config'

// Prisma 7 requires the DATABASE_URL to be configured here,
// not in schema.prisma (breaking change from Prisma 6 → 7)
export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, 'prisma/schema.prisma'),
  migrate: {
    async adapter() {
      const { PrismaPg } = await import('@prisma/adapter-pg')
      const databaseUrl = process.env['DATABASE_URL']
      if (!databaseUrl) {
        throw new Error('DATABASE_URL environment variable is required')
      }
      return new PrismaPg({ connectionString: databaseUrl })
    },
  },
})
