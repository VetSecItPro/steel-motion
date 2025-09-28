import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us directly at contact@steelmotionllc.com' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, organization, veteranStatus, partnershipType, message } = body;

    // Validate required fields
    if (!name || !email || !organization || !partnershipType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Steel Motion Partnerships <partnerships@steelmotionllc.com>',
      to: ['contact@steelmotionllc.com'],
      subject: `New Partnership Inquiry from ${name} - ${organization}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F1E2C; border-bottom: 2px solid #00F2FF; padding-bottom: 10px;">
            🤝 New Partnership Inquiry
          </h2>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0F1E2C;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Veteran Status:</strong> ${veteranStatus || 'Not specified'}</p>
          </div>

          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0F1E2C;">Partnership Details</h3>
            <p><strong>Partnership Type:</strong> ${partnershipType}</p>
          </div>

          <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #0F1E2C;">Partnership Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px; font-size: 14px; color: #2e7d32;">
            <strong>🎯 Partnership Priority:</strong> This is a veteran partnership inquiry and should be prioritized according to our veteran-first commitment.
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px; font-size: 14px; color: #1565c0;">
            <strong>📧 Quick Reply:</strong> Simply reply to this email to respond directly to ${name} at ${email}
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">
          <p style="font-size: 12px; color: #6c757d; text-align: center;">
            This partnership inquiry was sent via the Steel Motion LLC veteran partnerships page at steelmotionllc.com/partnerships
          </p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send partnership inquiry' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Partnership inquiry sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing partnership inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}