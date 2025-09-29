import { NextResponse } from 'next/server'
import { revalidationManager } from '@/lib/revalidation-manager'

export async function GET() {
  try {
    // Get current revalidation status
    const status = await revalidationManager.getActivityStatus()

    return NextResponse.json({
      success: true,
      status: {
        hasChanges: status.hasChanges,
        timeSinceLastChange: status.timeSinceLastChange,
        timeSinceLastChangeHours: (status.timeSinceLastChange / (1000 * 60 * 60)).toFixed(2),
        nextInterval: status.nextInterval,
        nextIntervalMinutes: (status.nextInterval / 60).toFixed(1),
        reason: status.reason
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error getting revalidation status:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get revalidation status' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    // Force refresh the content monitoring cache
    await revalidationManager.forceRefresh()

    return NextResponse.json({
      success: true,
      message: 'Content monitoring cache refreshed',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error refreshing revalidation cache:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to refresh cache' },
      { status: 500 }
    )
  }
}