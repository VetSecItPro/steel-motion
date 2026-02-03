import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { ratelimit } from '@/lib/rate-limiter';
import { supabaseAdmin } from '@/lib/supabase';
import DOMPurify from 'isomorphic-dompurify';
import { partnershipFormSchema } from '@/lib/validations/partnership';

export const maxDuration = 30;

const partnershipTypeLabels: Record<string, string> = {
  'referral': 'Referral Partnership',
  'overflow-subcontracting': 'Overflow / Subcontracting',
  'complementary-services': 'Complementary Services',
  'product-integration': 'Product Integration',
  'veteran-network': 'Veteran Business Network',
  'other': 'Other',
};

export async function POST(request: NextRequest) {
  // SECURITY: Request body size limit — FIX-007
  const contentLength = parseInt(request.headers.get('content-length') || '0')
  if (contentLength > 10_000) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413 })
  }

  // SECURITY: Origin verification for CSRF defense — FIX-020
  const origin = request.headers.get('origin')
  const allowedOrigins = [
    'https://steelmotionllc.com',
    'https://www.steelmotionllc.com',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
  ].filter(Boolean)

  // In development, also allow localhost
  if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push('http://localhost:3000', 'http://localhost:3001')
  }

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // SECURITY: IP extraction — FIX-015. x-forwarded-for is trustworthy on Vercel (set by edge proxy)
  const clientIp = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";

  const { success } = await ratelimit.limit(`partnerships:${clientIp}`);

  if (!success) {
    // SECURITY: Security event logging — FIX-022
    console.warn(JSON.stringify({ event: 'rate_limit_hit', ip: clientIp, route: '/api/partnerships', timestamp: new Date().toISOString() }))
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const body = await request.json();

    // Honeypot check
    if (body.fax) {
      return NextResponse.json(
        { message: 'Partnership inquiry sent successfully' },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Server-side Zod validation (validates email format + partnership type enum)
    const result = partnershipFormSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message || 'Invalid input';
      return NextResponse.json(
        { error: firstError },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const { name, email, organization, partnershipType, message } = result.data;

    // Sanitize user input
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedOrganization = DOMPurify.sanitize(organization);
    const sanitizedMessage = DOMPurify.sanitize(message);

    const typeLabel = partnershipTypeLabels[partnershipType] || partnershipType;

    // Run email + DB insert in parallel
    const emailPromise = process.env.RESEND_API_KEY
      ? (async () => {
          const resend = new Resend(process.env.RESEND_API_KEY);
          const { data, error } = await resend.emails.send({
            from: 'Steel Motion Partnerships <partnerships@steelmotionllc.com>',
            to: ['contacts@steelmotionllc.com'],
            subject: `[Partnership Inquiry] ${sanitizedOrganization}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0F1B2D; border-bottom: 2px solid #0D6E6E; padding-bottom: 10px;">
                  Partnership Inquiry
                </h2>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #0F1B2D;">Contact Information</h3>
                  <p><strong>Name:</strong> ${sanitizedName}</p>
                  <p><strong>Email:</strong> ${sanitizedEmail}</p>
                  <p><strong>Organization:</strong> ${sanitizedOrganization}</p>
                </div>
                <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #0F1B2D;">Partnership Details</h3>
                  <p><strong>Type:</strong> ${typeLabel}</p>
                </div>
                <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
                  <h3 style="margin-top: 0; color: #0F1B2D;">Message</h3>
                  <p style="line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</p>
                </div>
                <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px; font-size: 14px; color: #1565c0;">
                  <strong>Quick Reply:</strong> Reply to this email to respond directly to ${sanitizedName} at ${sanitizedEmail}
                </div>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">
                <p style="font-size: 12px; color: #6c757d; text-align: center;">
                  Sent via the partnerships page at steelmotionllc.com/partnerships
                </p>
              </div>
            `,
            replyTo: sanitizedEmail,
          });

          if (error) {
            console.error('Resend error:', error instanceof Error ? error.message : 'Email send failed');
            return { sent: false, id: undefined };
          }
          return { sent: true, id: data?.id };
        })()
      : Promise.resolve({ sent: false, id: undefined });

    const dbPromise = supabaseAdmin
      ? (async () => {
          const { data: insertedRow, error: dbError } = await supabaseAdmin
            .from('sm_partnership_inquiries')
            .insert({
              name: sanitizedName,
              email: sanitizedEmail,
              organization: sanitizedOrganization,
              partnership_type: partnershipType,
              message: sanitizedMessage,
              email_sent: false,
              ip_address: clientIp,
            })
            .select('id')
            .single();

          if (dbError) {
            console.error('Supabase insert error:', dbError.message);
            return { inserted: false, rowId: undefined };
          }
          return { inserted: true, rowId: insertedRow?.id };
        })()
      : Promise.resolve({ inserted: false, rowId: undefined });

    const [emailResult, dbResult] = await Promise.allSettled([emailPromise, dbPromise]);

    const emailSent = emailResult.status === 'fulfilled' && emailResult.value.sent;
    const dbInserted = dbResult.status === 'fulfilled' && dbResult.value.inserted;

    // Update DB record with email status if both succeeded
    if (emailSent && dbInserted && supabaseAdmin) {
      const resendId = emailResult.status === 'fulfilled' ? emailResult.value.id : undefined;
      const rowId = dbResult.status === 'fulfilled' ? dbResult.value.rowId : undefined;
      if (rowId) {
        await supabaseAdmin
          .from('sm_partnership_inquiries')
          .update({ email_sent: true, resend_id: resendId || null })
          .eq('id', rowId);
      }
    }

    // If neither email nor DB worked, return error
    if (!emailSent && !dbInserted) {
      return NextResponse.json(
        { error: 'Unable to process inquiry. Please contact us directly at contacts@steelmotionllc.com' },
        { status: 503, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if (!dbInserted && supabaseAdmin) {
      console.error('ALERT: Partnership inquiry DB insert failed but email sent for:', sanitizedEmail);
    }

    return NextResponse.json(
      { message: 'Partnership inquiry sent successfully' },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error processing partnership inquiry:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
