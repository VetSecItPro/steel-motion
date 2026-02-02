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
  limit: async () => ({ success: true, limit: 5, remaining: 5, reset: 0 }),
};

// Create a new ratelimiter, that allows 5 requests per 10 seconds
export const ratelimit = isRedisConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "10 s"),
      analytics: true,
      prefix: "@upstash/ratelimit",
    })
  : mockRatelimit;