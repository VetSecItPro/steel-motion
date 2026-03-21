import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'sm_admin_session';
const ADMIN_COOKIE_VALUE = 'authenticated';

/**
 * Verify admin password against env var
 */
export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    return false;
  }
  return password === adminPassword;
}

/**
 * Check if the current request has a valid admin session cookie
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  return sessionCookie?.value === ADMIN_COOKIE_VALUE;
}

/**
 * Set the admin session cookie
 */
export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

/**
 * Clear the admin session cookie
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Verify admin password from API request headers
 */
export function verifyAdminFromHeader(request: Request): boolean {
  const authHeader = request.headers.get('x-admin-password');
  if (!authHeader) return false;
  return verifyAdminPassword(authHeader);
}

/**
 * Verify admin from cookie in API routes
 */
export function verifyAdminFromCookie(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [key, ...val] = c.trim().split('=');
      return [key, val.join('=')];
    })
  );
  return cookies[ADMIN_COOKIE_NAME] === ADMIN_COOKIE_VALUE;
}

/**
 * Check admin auth from API request (checks both cookie and header)
 */
export function isAdminRequest(request: Request): boolean {
  return verifyAdminFromCookie(request) || verifyAdminFromHeader(request);
}
