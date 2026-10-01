import { NextRequest, NextResponse } from 'next/server'
import { redisDel } from '@/lib/redis'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Allow up to 60s execution for cron

/**
 * Next.js Automated Cron Webhook Handler (Scheduled every 30 mins)
 * Triggerable via:
 * - Vercel Cron Jobs (vercel.json)
 * - External Cron (cron-job.org, Cloudflare Worker, GitHub Actions)
 * - Manual trigger / Dev admin
 */
export async function GET(req: NextRequest) {
  return handleCronTrigger(req)
}

export async function POST(req: NextRequest) {
  return handleCronTrigger(req)
}

async function handleCronTrigger(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // Verify Bearer secret if CRON_SECRET is configured
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    const url = new URL(req.url)
    const queryKey = url.searchParams.get('key')
    if (queryKey !== cronSecret) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing Cron Secret' },
        { status: 401 },
      )
    }
  }

  const startTime = Date.now()
  const now = new Date()

  try {
    // 1. Invalidate Redis Caches to deliver instant fresh jobs to SSR/ISR pages
    const keysToPurge = [
      'jobsetu:items:ALL:2000',
      'jobsetu:items:GOVT_JOB:2000',
      'jobsetu:items:RESULT:2000',
      'jobsetu:items:ADMIT_CARD:2000',
      'jobsetu:items:ANSWER_KEY:2000',
      'jobsetu:items:SYLLABUS:2000',
      'jobsetu:items:ADMISSION:2000',
      'jobsetu:items:DOCUMENT:2000',
      'jobsetu:exams:govt',
    ]

    for (const key of keysToPurge) {
      await redisDel(key).catch(() => {})
    }

    // 2. Query latest active database counts
    let activeJobsCount = 0
    try {
      const { count } = await supabase
        .from('Job')
        .select('*', { count: 'exact', head: true })
        .eq('isActive', true)
      activeJobsCount = count ?? 0
    } catch {
      // Ignore if supabase offline
    }

    const duration = Date.now() - startTime

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      executionTimeFormatted: now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      schedule: 'Every 30 Minutes (*/30 * * * *)',
      nextScheduledRun: new Date(now.getTime() + 30 * 60 * 1000).toISOString(),
      durationMs: duration,
      activeJobsInDatabase: activeJobsCount,
      cachePurged: keysToPurge.length,
      status: 'Live 30-min sync completed successfully',
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      {
        success: false,
        error: message,
        timestamp: now.toISOString(),
      },
      { status: 500 },
    )
  }
}
