import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Check if Upstash Redis is configured
const isRedisConfigured =
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN;

// Create a mock ratelimiter for when Redis is not configured
if (!isRedisConfigured && process.env.NODE_ENV === 'production') {
  console.error('CRITICAL: Rate limiting not configured — Upstash Redis env vars missing. All requests will be allowed.');
}

const mockRatelimit = {
  limit: async () => {
    // SECURITY: Fail closed when Redis unconfigured in production — FIX-013
    if (process.env.NODE_ENV === 'production') {
      console.warn('[SECURITY] Rate limiter has no Redis — failing closed')
      return { success: false, limit: 5, remaining: 0, reset: 0 }
    }
    return { success: true, limit: 5, remaining: 5, reset: 0 }
  },
};

// Create a new ratelimiter, that allows 5 requests per 10 seconds
// Per-route identifiers handled by caller (e.g., contact:ip, partnerships:ip) — FIX-025
export const ratelimit = isRedisConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "10 s"),
      analytics: true,
      prefix: "@upstash/ratelimit",
    })
  : mockRatelimit;
