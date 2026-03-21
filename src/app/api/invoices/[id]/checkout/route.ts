import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getStripe } from '@/lib/stripe';

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  // Fetch invoice with items
  const { data: invoice, error } = await supabaseAdmin
    .from('sm_invoices')
    .select(`
      *,
      client:sm_clients(id, name, email),
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

  if (invoice.status === 'cancelled') {
    return NextResponse.json({ error: 'Invoice has been cancelled' }, { status: 400 });
  }

  const client = invoice.client as { id: string; name: string; email: string };
  const items = invoice.items as Array<{ description: string; quantity: number; unit_amount: number }>;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://steelmotionllc.com';

  // Create Stripe Checkout session
  const session = await getStripe().checkout.sessions.create({
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

  // Update checkout session ID
  await supabaseAdmin
    .from('sm_invoices')
    .update({
      stripe_checkout_session_id: session.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  return NextResponse.json({ checkout_url: session.url });
}
