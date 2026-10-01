import { Controller, Get, Post, HttpCode, HttpStatus } from '@nestjs/common'
import { CronService } from './cron.service'

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  /**
   * GET /api/cron/status
   * Returns current cron health, next run time (30 mins schedule), and ingestion metrics.
   */
  @Get('status')
  getStatus() {
    const stats = this.cronService.getStats()
    return {
      status: 'OK',
      schedule: 'Every 30 minutes (*/30 * * * *)',
      nextScheduledRun: stats.nextRunAt,
      lastRunTime: stats.lastRunAt,
      cycleState: stats.status,
      totalCompletedCycles: stats.totalCyclesCompleted,
      lastDuration: `${stats.lastDurationMs}ms`,
      lastIngestionMetrics: stats.lastIngestedCounts,
      recentActivityLogs: stats.recentLogs,
    }
  }

  /**
   * POST /api/cron/trigger
   * Manually trigger a 30-minute sync cycle on-demand.
   */
  @Post('trigger')
  @HttpCode(HttpStatus.OK)
  async triggerManualSync() {
    const result = await this.cronService.triggerManualSync()
    return {
      message: '30-Minute Sarkari Updates Ingestion Triggered Successfully',
      summary: result.lastIngestedCounts,
      durationMs: result.lastDurationMs,
      nextScheduledRun: result.nextRunAt,
    }
  }

  /**
   * GET /api/cron/trigger
   * Convenience route for GET webhooks / ping monitors.
   */
  @Get('trigger')
  async triggerGetSync() {
    return this.triggerManualSync()
  }
}
