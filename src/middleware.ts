import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// SECURITY: CSP without nonce — using 'unsafe-inline' for script-src
// Note: Nonce-based CSP (FIX-001/002) was removed because the nonce was never
// passed to Next.js scripts, causing all inline scripts to be blocked (blank page).
// To re-enable nonce-based CSP, you must also update layout.tsx to read the nonce
// from headers() and pass it to Script components via the nonce prop.

export function middleware(request: NextRequest) {
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
