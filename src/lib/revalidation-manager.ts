import { contentMonitor } from './content-monitor'

// Revalidation intervals in seconds
const REVALIDATION_INTERVALS = {
  IMMEDIATE: 60,        // 1 minute - when changes detected
  SHORT: 300,          // 5 minutes - recent activity
  MEDIUM: 1800,        // 30 minutes - some activity
  LONG: 3600,          // 1 hour - less activity
  MAXIMUM: 14400       // 4 hours - no activity
} as const

interface RevalidationResult {
  revalidate: number
  reason: string
  hasChanges: boolean
}

class RevalidationManager {
  private static instance: RevalidationManager

  private constructor() {}

  static getInstance(): RevalidationManager {
    if (!RevalidationManager.instance) {
      RevalidationManager.instance = new RevalidationManager()
    }
    return RevalidationManager.instance
  }

  /**
   * Determine the appropriate revalidation interval based on content activity
   */
  async getRevalidationInterval(): Promise<RevalidationResult> {
    try {
      // Check for content changes
      const hasChanges = await contentMonitor.checkForChanges()

      if (hasChanges) {
        // Content changed - use immediate revalidation
        return {
          revalidate: REVALIDATION_INTERVALS.IMMEDIATE,
          reason: 'Content changes detected',
          hasChanges: true
        }
      }

      // No changes detected - determine interval based on time since last change
      const timeSinceLastChange = await contentMonitor.getTimeSinceLastChange()
      const hoursSinceChange = timeSinceLastChange / (1000 * 60 * 60)

      let interval: number
      let reason: string

      if (hoursSinceChange < 2) {
        // Recent activity (within 2 hours) - check frequently
        interval = REVALIDATION_INTERVALS.SHORT
        reason = `Recent activity (${hoursSinceChange.toFixed(1)}h ago)`
      } else if (hoursSinceChange < 6) {
        // Some activity (2-6 hours) - moderate checking
        interval = REVALIDATION_INTERVALS.MEDIUM
        reason = `Some activity (${hoursSinceChange.toFixed(1)}h ago)`
      } else if (hoursSinceChange < 24) {
        // Less activity (6-24 hours) - less frequent checking
        interval = REVALIDATION_INTERVALS.LONG
        reason = `Less activity (${hoursSinceChange.toFixed(1)}h ago)`
      } else {
        // No activity (24+ hours) - minimal checking
        interval = REVALIDATION_INTERVALS.MAXIMUM
        reason = `No recent activity (${Math.floor(hoursSinceChange)}h ago)`
      }

      return {
        revalidate: interval,
        reason,
        hasChanges: false
      }
    } catch (error) {
      console.error('Error determining revalidation interval:', error)
      // On error, use safe default
      return {
        revalidate: REVALIDATION_INTERVALS.SHORT,
        reason: 'Error occurred - using safe default',
        hasChanges: false
      }
    }
  }

  /**
   * Get revalidation interval for blog listing pages
   */
  async getBlogRevalidation(): Promise<number> {
    const result = await this.getRevalidationInterval()

    // Log the revalidation decision for monitoring
    console.log(`Blog revalidation: ${result.revalidate}s (${result.reason})`)

    return result.revalidate
  }

  /**
   * Get revalidation interval for individual blog post pages
   */
  async getPostRevalidation(): Promise<number> {
    const result = await this.getRevalidationInterval()

    // Individual posts can have slightly longer intervals when no changes
    const adjustedInterval = result.hasChanges
      ? result.revalidate
      : Math.min(result.revalidate * 1.5, REVALIDATION_INTERVALS.MAXIMUM)

    console.log(`Post revalidation: ${Math.floor(adjustedInterval)}s (${result.reason})`)

    return Math.floor(adjustedInterval)
  }

  /**
   * Force refresh content monitoring (useful for testing)
   */
  async forceRefresh(): Promise<void> {
    await contentMonitor.forceRefresh()
  }

  /**
   * Get current content activity status
   */
  async getActivityStatus(): Promise<{
    hasChanges: boolean
    timeSinceLastChange: number
    nextInterval: number
    reason: string
  }> {
    const hasChanges = await contentMonitor.checkForChanges()
    const timeSinceLastChange = await contentMonitor.getTimeSinceLastChange()
    const result = await this.getRevalidationInterval()

    return {
      hasChanges,
      timeSinceLastChange,
      nextInterval: result.revalidate,
      reason: result.reason
    }
  }
}

export const revalidationManager = RevalidationManager.getInstance()