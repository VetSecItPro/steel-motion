import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: RouteParams) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { id } = await params;

  // Fetch proposal with lead info
  const { data: proposal, error: fetchError } = await supabaseAdmin
    .from('sm_proposals')
    .select(`
      *,
      lead:sm_leads(id, name, email, company),
      deal:sm_deals(id, title)
    `)
    .eq('id', id)
    .single();

  if (fetchError || !proposal) {
    return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
  }

  const lead = proposal.lead as { id: string; name: string; email: string; company: string | null };
  if (!lead?.email) {
    return NextResponse.json({ error: 'Lead has no email address' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
  }

  const items = proposal.items as Array<{ description: string; quantity: number; unit_amount: number }>;
  const formatCents = (cents: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${item.description}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formatCents(item.unit_amount)}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formatCents(item.quantity * item.unit_amount)}</td>
    </tr>
  `).join('');

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error: emailError } = await resend.emails.send({
    from: 'Steel Motion <noreply@steelmotionllc.com>',
    to: [lead.email],
    subject: `Proposal: ${proposal.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0F1B2D; border-bottom: 2px solid #0D6E6E; padding-bottom: 10px;">
          Proposal from Steel Motion
        </h2>
        <p>Hi ${lead.name},</p>
        <p>Thank you for your interest. Here is our proposal for <strong>${proposal.title}</strong>:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f0f4f7;">
              <th style="padding: 8px 12px; text-align: left;">Service</th>
              <th style="padding: 8px 12px; text-align: center;">Qty</th>
              <th style="padding: 8px 12px; text-align: right;">Rate</th>
              <th style="padding: 8px 12px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px 12px; text-align: right; font-weight: bold;">Total</td>
              <td style="padding: 10px 12px; text-align: right; font-weight: bold; color: #0D6E6E;">${formatCents(proposal.total)}</td>
            </tr>
          </tfoot>
        </table>
        ${proposal.notes ? `<div style="background: #f8fafb; padding: 16px; border-radius: 8px; margin: 16px 0;"><strong>Notes:</strong><p style="margin: 8px 0 0;">${proposal.notes}</p></div>` : ''}
        <p>If you have any questions or would like to move forward, please reply to this email or contact us at <a href="mailto:contact@steelmotionllc.com" style="color: #0D6E6E;">contact@steelmotionllc.com</a>.</p>
        <p>Best regards,<br>Steel Motion Team</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">
        <p style="font-size: 12px; color: #6c757d; text-align: center;">
          Steel Motion LLC &mdash; steelmotionllc.com
        </p>
      </div>
    `,
    replyTo: 'contact@steelmotionllc.com',
  });

  if (emailError) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  // Update proposal status
  await supabaseAdmin
    .from('sm_proposals')
    .update({ status: 'sent', sent_at: new Date().toISOString() })
    .eq('id', id);

  // Log activity
  await supabaseAdmin
    .from('sm_activities')
    .insert({
      lead_id: lead.id,
      type: 'proposal',
      description: `Proposal "${proposal.title}" sent to ${lead.email}`,
    });

  return NextResponse.json({ success: true });
}
