import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { ratelimit } from '@/lib/rate-limiter';
import { supabaseAdmin } from '@/lib/supabase';
import DOMPurify from 'isomorphic-dompurify';

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, company, message, fax } = body;

    // Honeypot check
    if (fax) {
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate input lengths
    if (name.length > 100 || email.length > 254 || (company && company.length > 100) || message.length > 2000) {
      return NextResponse.json(
        { error: 'One or more fields exceed maximum length' },
        { status: 400 }
      );
    }

    // Sanitize user input
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedCompany = company ? DOMPurify.sanitize(company) : '';
    const sanitizedMessage = DOMPurify.sanitize(message);

    // Send email via Resend
    let emailSent = false;
    let resendId: string | undefined;

    if (process.env.RESEND_API_KEY) {
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

      if (!error && data?.id) {
        emailSent = true;
        resendId = data.id;
      } else if (error) {
        console.error('Resend error:', error);
      }
    }

    // Store in Supabase
    if (supabaseAdmin) {
      const { error: dbError } = await supabaseAdmin
        .from('sm_contact_inquiries')
        .insert({
          name: sanitizedName,
          email: sanitizedEmail,
          company: sanitizedCompany || null,
          message: sanitizedMessage,
          email_sent: emailSent,
          resend_id: resendId || null,
          ip_address: ip,
        });

      if (dbError) {
        console.error('Supabase insert error:', dbError);
      }
    }

    // If neither email nor DB worked, return error
    if (!emailSent && !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Unable to process your message. Please contact us directly at contact@steelmotionllc.com' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: resendId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
