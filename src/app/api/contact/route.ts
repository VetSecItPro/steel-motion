import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { ratelimit } from '@/lib/rate-limiter';
import { supabaseAdmin } from '@/lib/supabase';
import DOMPurify from 'isomorphic-dompurify';
import { contactFormSchema } from '@/lib/validations/contact';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
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
        { message: 'Email sent successfully' },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Server-side Zod validation
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message || 'Invalid input';
      return NextResponse.json(
        { error: firstError },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const { name, email, company, message } = result.data;

    // Sanitize user input
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedCompany = company ? DOMPurify.sanitize(company) : '';
    const sanitizedMessage = DOMPurify.sanitize(message);

    // Run email + DB insert in parallel
    const emailPromise = process.env.RESEND_API_KEY
      ? (async () => {
          const resend = new Resend(process.env.RESEND_API_KEY);
          const { data, error } = await resend.emails.send({
            from: 'Steel Motion Contact Form <noreply@steelmotionllc.com>',
            to: ['contact@steelmotionllc.com'],
            subject: `[Contact] ${sanitizedName}${sanitizedCompany ? ` - ${sanitizedCompany}` : ''}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0F1B2D; border-bottom: 2px solid #0D6E6E; padding-bottom: 10px;">
                  New Contact Form Submission
                </h2>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #0F1B2D;">Contact Details</h3>
                  <p><strong>Name:</strong> ${sanitizedName}</p>
                  <p><strong>Email:</strong> ${sanitizedEmail}</p>
                  <p><strong>Company:</strong> ${sanitizedCompany || 'Not provided'}</p>
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
                  Sent via the contact form at steelmotionllc.com
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
          const { error: dbError } = await supabaseAdmin
            .from('sm_contact_inquiries')
            .insert({
              name: sanitizedName,
              email: sanitizedEmail,
              company: sanitizedCompany || null,
              message: sanitizedMessage,
              email_sent: false, // updated below if needed
              ip_address: ip,
            });

          if (dbError) {
            console.error('Supabase insert error:', dbError.message);
            return { inserted: false };
          }
          return { inserted: true };
        })()
      : Promise.resolve({ inserted: false });

    const [emailResult, dbResult] = await Promise.allSettled([emailPromise, dbPromise]);

    const emailSent = emailResult.status === 'fulfilled' && emailResult.value.sent;
    const dbInserted = dbResult.status === 'fulfilled' && dbResult.value.inserted;

    // Update DB record with email status if both succeeded
    if (emailSent && dbInserted && supabaseAdmin) {
      const resendId = emailResult.status === 'fulfilled' ? emailResult.value.id : undefined;
      await supabaseAdmin
        .from('sm_contact_inquiries')
        .update({ email_sent: true, resend_id: resendId || null })
        .eq('email', sanitizedEmail)
        .order('created_at', { ascending: false })
        .limit(1);
    }

    // If neither email nor DB worked, return error
    if (!emailSent && !dbInserted) {
      return NextResponse.json(
        { error: 'Unable to process your message. Please contact us directly at contact@steelmotionllc.com' },
        { status: 503, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if (!dbInserted && supabaseAdmin) {
      console.error('ALERT: Contact form DB insert failed but email sent for:', sanitizedEmail);
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error processing contact form:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
