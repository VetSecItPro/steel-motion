import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// SECURITY: CSP without nonce — using 'unsafe-inline' for script-src
// Note: Nonce-based CSP (FIX-001/002) was removed because the nonce was never
// passed to Next.js scripts, causing all inline scripts to be blocked (blank page).
// To re-enable nonce-based CSP, you must also update layout.tsx to read the nonce
// from headers() and pass it to Script components via the nonce prop.

// Bot blocking — return 403 before any serverless work
const BLOCKED_BOTS = [
  'GPTBot', 'ChatGPT-User', 'CCBot', 'ClaudeBot', 'anthropic-ai',
  'PerplexityBot', 'Bytespider', 'meta-externalagent', 'FacebookBot',
  'facebookexternalhit', 'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot',
  'PetalBot', 'Amazonbot', 'YouBot', 'Applebot-Extended', 'cohere-ai',
  'Google-Extended',
];

function isBlockedBot(ua: string): boolean {
  const lower = ua.toLowerCase();
  return BLOCKED_BOTS.some((bot) => lower.includes(bot.toLowerCase()));
}

export function middleware(request: NextRequest) {
  // Block aggressive bots before any processing
  const userAgent = request.headers.get('user-agent') ?? '';
  if (userAgent && isBlockedBot(userAgent)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.youtube.com *.twitter.com;
    child-src *.youtube.com *.google.com *.twitter.com;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src 'self' blob: data: images.unsplash.com placehold.co;
    media-src 'none';
    connect-src 'self' https://*.supabase.co https://*.upstash.io https://*.vercel-insights.com https://*.vercel-analytics.com;
    font-src 'self' data:;
  `.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', cspHeader);

  // PERF: Aggressive edge caching for public pages to reduce function invocations
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith('/articles/')) {
    // Blog articles — cache 1 hour, stale for 7 days
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=604800');
  } else if (pathname.startsWith('/portfolio/') || pathname.startsWith('/services/') || pathname.startsWith('/about')) {
    // Static marketing pages — cache 1 hour, stale for 1 day
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  } else if (pathname === '/' || pathname === '/partnerships') {
    // Home and partnerships — cache 5 min, stale for 1 hour
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
  }

  return response;
}

// Apply middleware to all routes except static files and API routes
// API routes have their own CORS headers set in next.config.ts
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
