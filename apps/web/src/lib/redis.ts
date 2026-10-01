// ─── Upstash Redis HTTP REST Client (Official Command Array Format) ─────────

const UPSTASH_URL =
  process.env['UPSTASH_REDIS_REST_URL'] ?? 'https://improved-kit-321933.upstash.io'
const UPSTASH_TOKEN =
  process.env['UPSTASH_REDIS_REST_TOKEN'] ??
  'gQAAAAAABOmNAAIgcDEzYjMyZWM1N2IyYjY0MzM4YmI3NjkwY2ZiODI2MjM4MA'

export async function redisGet<T>(key: string): Promise<T | null> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null

  try {
    const res = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['GET', key]),
      next: { revalidate: 60 },
    })
    if (!res.ok) return null

    const json = (await res.json()) as { result?: string | null }
    if (!json.result || typeof json.result !== 'string') return null
    return JSON.parse(json.result) as T
  } catch {
    return null
  }
}

export async function redisSet(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return

  try {
    const serialized = JSON.stringify(value)
    await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', key, serialized, 'EX', ttlSeconds]),
      cache: 'no-store',
    })
  } catch {
    // Non-blocking cache write
  }
}
