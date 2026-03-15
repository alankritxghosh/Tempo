type RateLimitEntry = { count: number; resetAt: number }

export function createRateLimit(maxRequests: number, windowMs: number) {
  const map = new Map<string, RateLimitEntry>()

  return function checkRateLimit(userId: string): boolean {
    const now = Date.now()
    const entry = map.get(userId)
    if (!entry || now > entry.resetAt) {
      map.set(userId, { count: 1, resetAt: now + windowMs })
      return true
    }
    if (entry.count >= maxRequests) return false
    entry.count++
    return true
  }
}
