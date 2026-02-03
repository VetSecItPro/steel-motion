import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

/**
 * On-demand revalidation endpoint for Sanity webhooks.
 *
 * Configure a Sanity webhook to POST here when content changes.
 * This calls revalidatePath to bust the ISR cache for /articles pages.
 *
 * Auth: Bearer token via REVALIDATION_SECRET env var.
 */

export const maxDuration = 10

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.REVALIDATION_SECRET
  if (!secret) return false
  const authHeader = request.headers.get('authorization')
  return authHeader === `Bearer ${secret}`
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    success: true,
    message: 'Revalidation endpoint is healthy',
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const slug = body?.slug?.current as string | undefined

    // Revalidate the articles listing page
    revalidatePath('/articles')

    // If a specific slug was provided (from Sanity webhook payload), revalidate that post
    if (slug) {
      revalidatePath(`/articles/${slug}`)
    }

    return NextResponse.json({
      success: true,
      revalidated: slug ? ['/articles', `/articles/${slug}`] : ['/articles'],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { success: false, error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}
