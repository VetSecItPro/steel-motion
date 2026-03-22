import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, setAdminSession } from '@/lib/admin-auth';
import { ratelimit } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  // SECURITY: Rate limit login attempts to prevent brute force
  const clientIp = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  const { success } = await ratelimit.limit(`admin-login:${clientIp}`);
  if (!success) {
    console.warn(JSON.stringify({ event: 'admin_login_rate_limit', ip: clientIp, timestamp: new Date().toISOString() }));
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      { status: 429, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const { password } = await request.json();

    if (!password || !verifyAdminPassword(password)) {
      console.warn(JSON.stringify({ event: 'admin_login_failed', ip: clientIp, timestamp: new Date().toISOString() }));
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    await setAdminSession();

    return NextResponse.json(
      { success: true },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
