import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// SECURITY: Nonce-based CSP — FIX-001/002 (replaces unsafe-inline for script-src)
// This middleware generates a cryptographically secure nonce for each request
// and applies it to the Content Security Policy header.

export function middleware(request: NextRequest) {
  // Generate cryptographically secure random nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Build Content Security Policy with nonce
  // Note: 'unsafe-inline' is kept as a fallback for browsers that don't support nonces (CSP Level 2)
  // When nonce is present and supported, 'unsafe-inline' is ignored (CSP spec behavior)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'unsafe-inline' *.youtube.com *.twitter.com;
    child-src *.youtube.com *.google.com *.twitter.com;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src 'self' blob: data: cdn.sanity.io images.unsplash.com placehold.co;
    media-src 'none';
    connect-src 'self' https://*.sanity.io https://*.supabase.co https://*.upstash.io https://*.vercel-insights.com https://*.vercel-analytics.com;
    font-src 'self' data:;
  `.replace(/\s{2,}/g, ' ').trim();

  // Create response with CSP header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CSP header on response
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
