import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: path.join(__dirname, 'prisma/schema.prisma'),
  datasource: {
    url:
      process.env['DATABASE_URL'] ??
      'postgresql://postgres:A64bdxxj%4012@db.bxeqhgoyevchvhndwnvu.supabase.co:5432/postgres',
  },
})
