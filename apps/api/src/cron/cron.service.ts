import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { PrismaService } from '../prisma/prisma.service'
import { JobsScraper } from './scrapers/jobs.scraper'
import { ResultsScraper } from './scrapers/results.scraper'
import { AdmitCardsScraper } from './scrapers/admit-cards.scraper'
import { NewsScraper } from './scrapers/news.scraper'
import { SecondarySectionsScraper } from './scrapers/other.scraper'

export interface CronSyncStats {
  lastRunAt: string | null
  nextRunAt: string | null
  status: 'IDLE' | 'RUNNING' | 'SUCCESS' | 'ERROR'
  totalCyclesCompleted: number
  lastDurationMs: number
  lastIngestedCounts: {
    jobs: number
    results: number
    admitCards: number
    answerKeys: number
    admissions: number
    syllabuses: number
    news: number
  }
  recentLogs: string[]
}

@Injectable()
export class CronService implements OnModuleInit {
  private readonly logger = new Logger(CronService.name)
  private readonly jobsScraper = new JobsScraper()
  private readonly resultsScraper = new ResultsScraper()
  private readonly admitCardsScraper = new AdmitCardsScraper()
  private readonly newsScraper = new NewsScraper()
  private readonly secondaryScraper = new SecondarySectionsScraper()

  private isSyncing = false
  private stats: CronSyncStats = {
    lastRunAt: null,
    nextRunAt: null,
    status: 'IDLE',
    totalCyclesCompleted: 0,
    lastDurationMs: 0,
    lastIngestedCounts: {
      jobs: 0,
      results: 0,
      admitCards: 0,
      answerKeys: 0,
      admissions: 0,
      syllabuses: 0,
      news: 0,
    },
    recentLogs: [],
  }

  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  /**
   * Run initial sync on backend startup.
   */
  async onModuleInit() {
    this.logger.log('🚀 JobSetu Automated Cron Engine initialized — Scheduled to run every 30 minutes')
    // Run an initial quick sync in background so data is warm immediately
    setTimeout(() => {
      this.runSyncPipeline().catch((err) => {
        this.logger.error('Startup sync cycle failed:', err)
      })
    }, 3000)
  }

  /**
   * 30-MINUTE CRON JOB: Runs at minute :00 and :30 of every hour.
   * Standard Cron Expression: "0 * /30 * * * *" or CronExpression.EVERY_30_MINUTES
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCronEvery30Minutes() {
    this.logger.log('⏰ [30-Min Cron Trigger] Executing scheduled Sarkari updates ingestion cycle...')
    await this.runSyncPipeline()
  }

  /**
   * Core Ingestion Pipeline: Scrapes, Upserts to PostgreSQL (Prisma), & Flushes Cache.
   */
  async runSyncPipeline(): Promise<CronSyncStats> {
    if (this.isSyncing) {
      this.logger.warn('⚠️ Sync pipeline is already active, skipping overlapping trigger.')
      return this.stats
    }

    this.isSyncing = true
    const startTime = Date.now()
    const now = new Date()
    this.stats.status = 'RUNNING'
    this.stats.lastRunAt = now.toISOString()
    this.stats.nextRunAt = new Date(now.getTime() + 30 * 60 * 1000).toISOString()
    this.logActivity(`[START] Ingestion cycle started at ${now.toLocaleTimeString('en-IN')}`)

    try {
      // 1. Fetch from all live scrapers concurrently
      const [jobs, results, admitCards, news, answerKeys, admissions, syllabuses] = await Promise.all([
        this.jobsScraper.fetchLatestJobs(),
        this.resultsScraper.fetchLatestResults(),
        this.admitCardsScraper.fetchLatestAdmitCards(),
        this.newsScraper.fetchLatestNews(),
        this.secondaryScraper.fetchAnswerKeys(),
        this.secondaryScraper.fetchAdmissions(),
        this.secondaryScraper.fetchSyllabuses(),
      ])

      let ingestedJobs = 0
      let ingestedResults = 0
      let ingestedAdmitCards = 0

      // 2. Upsert Jobs to Database
      for (const j of jobs) {
        try {
          await this.prisma.job.upsert({
            where: { slug: j.slug },
            update: {
              title: j.title,
              organization: j.organization,
              postCount: j.postCount,
              qualification: j.qualification,
              lastDate: j.lastDate ? new Date(j.lastDate) : null,
              officialLink: j.officialLink,
              state: j.state,
              examName: j.examName,
              description: j.description,
              isActive: true,
              updatedAt: new Date(),
            },
            create: {
              title: j.title,
              slug: j.slug,
              category: j.category,
              organization: j.organization,
              postCount: j.postCount,
              qualification: j.qualification,
              lastDate: j.lastDate ? new Date(j.lastDate) : null,
              officialLink: j.officialLink,
              state: j.state,
              examName: j.examName,
              description: j.description,
              isActive: true,
            },
          })
          ingestedJobs++
        } catch {
          // Continue on individual record error
        }
      }

      // 3. Upsert Results to Database
      for (const r of results) {
        try {
          await this.prisma.result.upsert({
            where: { slug: r.slug },
            update: {
              title: r.title,
              organization: r.organization,
              examName: r.examName,
              resultDate: r.resultDate ? new Date(r.resultDate) : null,
              officialLink: r.officialLink,
              description: r.description,
              updatedAt: new Date(),
            },
            create: {
              title: r.title,
              slug: r.slug,
              organization: r.organization,
              examName: r.examName,
              resultDate: r.resultDate ? new Date(r.resultDate) : null,
              officialLink: r.officialLink,
              description: r.description,
              isActive: true,
            },
          })
          ingestedResults++
        } catch {
          // Continue
        }
      }

      // 4. Upsert Admit Cards to Database
      for (const a of admitCards) {
        try {
          await this.prisma.admitCard.upsert({
            where: { slug: a.slug },
            update: {
              title: a.title,
              organization: a.organization,
              examName: a.examName,
              downloadLink: a.downloadLink,
              description: a.description,
              updatedAt: new Date(),
            },
            create: {
              title: a.title,
              slug: a.slug,
              organization: a.organization,
              examName: a.examName,
              downloadLink: a.downloadLink,
              description: a.description,
              isActive: true,
            },
          })
          ingestedAdmitCards++
        } catch {
          // Continue
        }
      }

      // 5. Invalidate / Warm Redis Cache
      try {
        const cacheObj = this.cache as unknown as { reset?: () => Promise<void>; clear?: () => Promise<void> }
        if (typeof cacheObj.reset === 'function') {
          await cacheObj.reset()
        } else if (typeof cacheObj.clear === 'function') {
          await cacheObj.clear()
        }
        this.logActivity('✓ Cache flushed to deliver live updates to frontend')
      } catch {
        // Soft fail cache reset
      }

      const duration = Date.now() - startTime
      this.stats.status = 'SUCCESS'
      this.stats.totalCyclesCompleted++
      this.stats.lastDurationMs = duration
      this.stats.lastIngestedCounts = {
        jobs: ingestedJobs,
        results: ingestedResults,
        admitCards: ingestedAdmitCards,
        answerKeys: answerKeys.length,
        admissions: admissions.length,
        syllabuses: syllabuses.length,
        news: news.length,
      }

      const summary = `✓ [SUCCESS] Ingested ${ingestedJobs} Jobs, ${ingestedResults} Results, ${ingestedAdmitCards} Admit Cards, ${news.length} News in ${duration}ms`
      this.logger.log(summary)
      this.logActivity(summary)

      return this.stats
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      this.stats.status = 'ERROR'
      this.logger.error(`❌ [ERROR] Ingestion cycle failed: ${errorMsg}`)
      this.logActivity(`❌ [ERROR] ${errorMsg}`)
      return this.stats
    } finally {
      this.isSyncing = false
    }
  }

  /**
   * Manual Trigger method.
   */
  async triggerManualSync() {
    this.logger.log('⚡ Manual sync requested via API trigger')
    return this.runSyncPipeline()
  }

  /**
   * Returns current stats and health status of the Cron engine.
   */
  getStats(): CronSyncStats {
    return this.stats
  }

  private logActivity(msg: string) {
    const time = new Date().toLocaleTimeString('en-IN')
    this.stats.recentLogs.unshift(`[${time}] ${msg}`)
    if (this.stats.recentLogs.length > 25) {
      this.stats.recentLogs.pop()
    }
  }
}
