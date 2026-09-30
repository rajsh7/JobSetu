import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { CacheModule } from '@nestjs/cache-manager'
import { PrismaModule } from './prisma/prisma.module'
import { JobsModule } from './jobs/jobs.module'
import { ResultsModule } from './results/results.module'
import { AdmitCardsModule } from './admit-cards/admit-cards.module'
import { ExamsModule } from './exams/exams.module'
import { SearchModule } from './search/search.module'
import { AuthModule } from './auth/auth.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    // ─── Config ────────────────────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // ─── Rate Limiting — 100 requests per 60 seconds per IP ────────────────
    ThrottlerModule.forRoot({
      throttlers: [
        { name: 'short', ttl: 1000, limit: 10 },   // 10 req/sec
        { name: 'medium', ttl: 60000, limit: 100 }, // 100 req/min
      ],
    }),

    // ─── Redis Cache ────────────────────────────────────────────────────────
    CacheModule.register({
      isGlobal: true,
      ttl: 300, // 5 minutes default
    }),

    // ─── Feature Modules ────────────────────────────────────────────────────
    PrismaModule,
    JobsModule,
    ResultsModule,
    AdmitCardsModule,
    ExamsModule,
    SearchModule,
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
