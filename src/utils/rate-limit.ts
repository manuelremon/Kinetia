/**
 * Sliding window in-memory rate limiter for Server Actions.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter(t => now - t < CLEANUP_INTERVAL);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}, CLEANUP_INTERVAL);

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export function checkRateLimit(key: string, config: RateLimitConfig): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const entry = store.get(key) || { timestamps: [] };

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter(t => now - t < config.windowMs);

  if (entry.timestamps.length >= config.maxRequests) {
    const oldestInWindow = entry.timestamps[0];
    const retryAfterMs = config.windowMs - (now - oldestInWindow);
    return { allowed: false, retryAfterMs };
  }

  entry.timestamps.push(now);
  store.set(key, entry);
  return { allowed: true };
}
