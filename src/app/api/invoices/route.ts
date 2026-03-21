import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';
import { generateInvoiceNumber, calculateDueDate } from '@/lib/invoice-helpers';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { data, error } = await supabaseAdmin
    .from('sm_invoices')
    .select(`
      *,
      client:sm_clients(id, name, email, company)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ invoices: data });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { client_id, items, payment_terms, notes } = body;

    if (!client_id || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Client and at least one line item are required' },
        { status: 400 }
      );
    }

    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber();

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: { quantity: number; unit_amount: number }) => {
      return sum + (item.quantity * item.unit_amount);
    }, 0);

    const total = subtotal; // No tax for now

    // Calculate due date
    const terms = payment_terms || 'due_on_receipt';
    const dueDate = calculateDueDate(terms);

    // Insert invoice
    const { data: invoice, error: invoiceError } = await supabaseAdmin
      .from('sm_invoices')
      .insert({
        invoice_number: invoiceNumber,
        client_id,
        status: 'draft',
        subtotal,
        tax_amount: 0,
        total,
        currency: 'usd',
        due_date: dueDate,
        payment_terms: terms,
        notes: notes || null,
      })
      .select()
      .single();

    if (invoiceError) {
      return NextResponse.json({ error: invoiceError.message }, { status: 500 });
    }

    // Insert line items
    const lineItems = items.map((item: {
      description: string;
      quantity: number;
      unit_amount: number;
      service_template_id?: string;
    }, index: number) => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unit_amount: item.unit_amount,
      total: item.quantity * item.unit_amount,
      sort_order: index,
      service_template_id: item.service_template_id || null,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from('sm_invoice_items')
      .insert(lineItems);

    if (itemsError) {
      // Rollback: delete the invoice if items fail
      await supabaseAdmin.from('sm_invoices').delete().eq('id', invoice.id);
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }

    // Fetch complete invoice with items
    const { data: completeInvoice } = await supabaseAdmin
      .from('sm_invoices')
      .select(`
        *,
        client:sm_clients(id, name, email, company),
        items:sm_invoice_items(*)
      `)
      .eq('id', invoice.id)
      .single();

    return NextResponse.json({ invoice: completeInvoice }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
