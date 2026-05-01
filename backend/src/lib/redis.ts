import { Redis } from '@upstash/redis'

let client: Redis | null = null

export function getRedis(): Redis {
  if (!client) {
    client = new Redis({
      url:   process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    })
    console.log('[Redis] Client initialized')
  }
  return client
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try { return await getRedis().get<T>(key) }
  catch (e) { console.error('[Redis] GET error:', e); return null }
}

export async function cacheSet(key: string, value: unknown, ttlSeconds: number): Promise<void> {
  try { await getRedis().set(key, value, { ex: ttlSeconds }) }
  catch (e) { console.error('[Redis] SET error:', e) }
}

export async function cacheDel(...keys: string[]): Promise<void> {
  try { if (keys.length) await getRedis().del(...keys) }
  catch (e) { console.error('[Redis] DEL error:', e) }
}

export async function cacheDelPattern(pattern: string): Promise<void> {
  try {
    const keys = await getRedis().keys(pattern)
    if (keys.length) await getRedis().del(...keys)
  } catch (e) { console.error('[Redis] DEL pattern error:', e) }
}
