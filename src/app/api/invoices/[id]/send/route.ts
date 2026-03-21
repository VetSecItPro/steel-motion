import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';
import { stripe } from '@/lib/stripe';
import { Resend } from 'resend';
import { formatCents } from '@/lib/invoice-helpers';

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  // Fetch invoice with client info and items
  const { data: invoice, error } = await supabaseAdmin
    .from('sm_invoices')
    .select(`
      *,
      client:sm_clients(id, name, email, company),
      items:sm_invoice_items(*)
    `)
    .eq('id', id)
    .single();

  if (error || !invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  if (invoice.status === 'paid') {
    return NextResponse.json({ error: 'Invoice is already paid' }, { status: 400 });
  }

  const client = invoice.client as { id: string; name: string; email: string; company: string | null };
  const items = invoice.items as Array<{ description: string; quantity: number; unit_amount: number; total: number }>;

  // Create Stripe Checkout session
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://steelmotionllc.com';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.description,
        },
        unit_amount: item.unit_amount,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${baseUrl}/client-portal/${id}?payment=success`,
    cancel_url: `${baseUrl}/client-portal/${id}?payment=cancelled`,
    customer_email: client.email,
    metadata: {
      invoice_id: id,
      invoice_number: invoice.invoice_number,
    },
  });

  // Update invoice status to sent
  await supabaseAdmin
    .from('sm_invoices')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString(),
      stripe_checkout_session_id: session.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  // Send email via Resend
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const portalUrl = `${baseUrl}/client-portal/${id}`;
    const dueDateFormatted = invoice.due_date
      ? new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : 'Due on Receipt';

    const itemRowsHtml = items.map(item => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; color: #0F1B2D;">${item.description}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; text-align: center; color: #475569;">${item.quantity}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; text-align: right; color: #475569;">${formatCents(item.unit_amount)}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; text-align: right; color: #0F1B2D; font-weight: 500;">${formatCents(item.total)}</td>
      </tr>
    `).join('');

    await resend.emails.send({
      from: 'Steel Motion LLC <invoices@steelmotionllc.com>',
      to: [client.email],
      subject: `Invoice ${invoice.invoice_number} from Steel Motion LLC`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #FFFFFF;">
          <div style="background: #0B1A2B; padding: 32px; text-align: center;">
            <h1 style="color: #F1F5F9; font-size: 24px; margin: 0; font-weight: 600;">Steel Motion LLC</h1>
            <p style="color: #94A3B8; font-size: 14px; margin: 8px 0 0;">AI Automation & Custom Software</p>
          </div>

          <div style="padding: 40px 32px;">
            <p style="color: #0F1B2D; font-size: 16px; margin: 0 0 8px;">Hello ${client.name},</p>
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
              Please find your invoice below. Click the button to view the full invoice and make a payment.
            </p>

            <div style="background: #F8FAFB; border: 1px solid #E2E8F0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="color: #475569; font-size: 13px; padding-bottom: 8px;">Invoice Number</td>
                  <td style="color: #0F1B2D; font-size: 13px; font-weight: 600; text-align: right; padding-bottom: 8px;">${invoice.invoice_number}</td>
                </tr>
                <tr>
                  <td style="color: #475569; font-size: 13px; padding-bottom: 8px;">Due Date</td>
                  <td style="color: #0F1B2D; font-size: 13px; font-weight: 600; text-align: right; padding-bottom: 8px;">${dueDateFormatted}</td>
                </tr>
                <tr>
                  <td style="color: #475569; font-size: 13px;">Total Amount</td>
                  <td style="color: #0D6E6E; font-size: 20px; font-weight: 700; text-align: right;">${formatCents(invoice.total)}</td>
                </tr>
              </table>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <thead>
                <tr style="background: #F0F4F7;">
                  <th style="padding: 10px 16px; text-align: left; font-size: 12px; color: #475569; font-weight: 600; text-transform: uppercase;">Description</th>
                  <th style="padding: 10px 16px; text-align: center; font-size: 12px; color: #475569; font-weight: 600; text-transform: uppercase;">Qty</th>
                  <th style="padding: 10px 16px; text-align: right; font-size: 12px; color: #475569; font-weight: 600; text-transform: uppercase;">Rate</th>
                  <th style="padding: 10px 16px; text-align: right; font-size: 12px; color: #475569; font-weight: 600; text-transform: uppercase;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemRowsHtml}
              </tbody>
            </table>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${portalUrl}" style="display: inline-block; background: #0D6E6E; color: #FFFFFF; padding: 14px 40px; border-radius: 9999px; text-decoration: none; font-size: 15px; font-weight: 600;">
                View Invoice & Pay
              </a>
            </div>

            <p style="color: #94A3B8; font-size: 13px; text-align: center; line-height: 1.5;">
              If you have any questions about this invoice, please contact us at
              <a href="mailto:contact@steelmotionllc.com" style="color: #0D6E6E;">contact@steelmotionllc.com</a>
            </p>
          </div>

          <div style="background: #F0F4F7; padding: 20px 32px; text-align: center; border-top: 1px solid #E2E8F0;">
            <p style="color: #94A3B8; font-size: 12px; margin: 0;">
              Steel Motion LLC &bull; Veteran-Owned &bull; Texas
            </p>
          </div>
        </div>
      `,
    });
  }

  return NextResponse.json({
    success: true,
    checkout_url: session.url,
    invoice_number: invoice.invoice_number,
  });
}
