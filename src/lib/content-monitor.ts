import { client } from './sanity'
import { writeFile, readFile, access } from 'fs/promises'
import { join } from 'path'

interface ContentState {
  lastPostUpdate: string | null
  lastAuthorUpdate: string | null
  lastCategoryUpdate: string | null
  lastCheck: string
  changeDetected: boolean
}

const CACHE_FILE = join(process.cwd(), '.content-cache.json')

// Lightweight queries to check for content changes
const TIMESTAMP_QUERIES = {
  posts: `*[_type == "post"] | order(_updatedAt desc)[0]._updatedAt`,
  authors: `*[_type == "author"] | order(_updatedAt desc)[0]._updatedAt`,
  categories: `*[_type == "category"] | order(_updatedAt desc)[0]._updatedAt`
}

class ContentMonitor {
  private static instance: ContentMonitor
  private cachedState: ContentState | null = null

  private constructor() {}

  static getInstance(): ContentMonitor {
    if (!ContentMonitor.instance) {
      ContentMonitor.instance = new ContentMonitor()
    }
    return ContentMonitor.instance
  }

  /**
   * Get the stored content state from file cache
   */
  private async getStoredState(): Promise<ContentState> {
    if (this.cachedState) {
      return this.cachedState
    }

    try {
      await access(CACHE_FILE)
      const data = await readFile(CACHE_FILE, 'utf-8')
      this.cachedState = JSON.parse(data)
      return this.cachedState!
    } catch {
      // File doesn't exist or is invalid - create initial state
      const initialState: ContentState = {
        lastPostUpdate: null,
        lastAuthorUpdate: null,
        lastCategoryUpdate: null,
        lastCheck: new Date().toISOString(),
        changeDetected: true // First run should always revalidate
      }
      await this.saveState(initialState)
      return initialState
    }
  }

  /**
   * Save the current content state to file cache
   */
  private async saveState(state: ContentState): Promise<void> {
    try {
      await writeFile(CACHE_FILE, JSON.stringify(state, null, 2))
      this.cachedState = state
    } catch (error) {
      console.error('Failed to save content state:', error)
    }
  }

  /**
   * Check for content changes by comparing timestamps
   */
  async checkForChanges(): Promise<boolean> {
    try {
      const storedState = await this.getStoredState()

      // Fetch latest timestamps from Sanity
      const [latestPostUpdate, latestAuthorUpdate, latestCategoryUpdate] = await Promise.all([
        client.fetch<string | null>(TIMESTAMP_QUERIES.posts),
        client.fetch<string | null>(TIMESTAMP_QUERIES.authors),
        client.fetch<string | null>(TIMESTAMP_QUERIES.categories)
      ])

      // Check if any content has changed
      const hasChanges =
        storedState.lastPostUpdate !== latestPostUpdate ||
        storedState.lastAuthorUpdate !== latestAuthorUpdate ||
        storedState.lastCategoryUpdate !== latestCategoryUpdate

      // Update stored state
      const newState: ContentState = {
        lastPostUpdate: latestPostUpdate,
        lastAuthorUpdate: latestAuthorUpdate,
        lastCategoryUpdate: latestCategoryUpdate,
        lastCheck: new Date().toISOString(),
        changeDetected: hasChanges
      }

      await this.saveState(newState)

      if (hasChanges) {
        console.log('Content changes detected:', {
          posts: storedState.lastPostUpdate !== latestPostUpdate,
          authors: storedState.lastAuthorUpdate !== latestAuthorUpdate,
          categories: storedState.lastCategoryUpdate !== latestCategoryUpdate
        })
      }

      return hasChanges
    } catch (error) {
      console.error('Error checking for content changes:', error)
      // On error, assume changes to be safe
      return true
    }
  }

  /**
   * Get the time since last detected change
   */
  async getTimeSinceLastChange(): Promise<number> {
    const storedState = await this.getStoredState()

    if (!storedState.changeDetected) {
      // If no change was detected in the last check, calculate from last check time
      return Date.now() - new Date(storedState.lastCheck).getTime()
    }

    // If change was detected, return 0 (fresh change)
    return 0
  }

  /**
   * Force a change detection refresh
   */
  async forceRefresh(): Promise<void> {
    this.cachedState = null
    try {
      await access(CACHE_FILE)
      await writeFile(CACHE_FILE, '') // Clear the cache file
    } catch {
      // File doesn't exist, that's fine
    }
  }
}

export const contentMonitor = ContentMonitor.getInstance()