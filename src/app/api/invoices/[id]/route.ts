import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';

type RouteParams = { params: Promise<{ id: string }> };

// GET single invoice (public for client portal, detailed for admin)
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { data, error } = await supabaseAdmin
    .from('sm_invoices')
    .select(`
      *,
      client:sm_clients(id, name, email, company, phone, address_line1, address_line2, city, state, zip),
      items:sm_invoice_items(*)
    `)
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  // Sort items by sort_order
  if (data.items) {
    data.items.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
  }

  return NextResponse.json({ invoice: data }, {
    headers: { 'Cache-Control': 'private, no-store' },
  });
}

// PATCH update invoice (admin only)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { items, ...invoiceFields } = body;

    // Update invoice fields
    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
    const allowedFields = ['status', 'payment_terms', 'notes', 'due_date', 'client_id'];
    for (const field of allowedFields) {
      if (field in invoiceFields) {
        updateData[field] = invoiceFields[field];
      }
    }

    // If items are provided, recalculate totals
    if (items && Array.isArray(items)) {
      const subtotal = items.reduce((sum: number, item: { quantity: number; unit_amount: number }) => {
        return sum + (item.quantity * item.unit_amount);
      }, 0);
      updateData.subtotal = subtotal;
      updateData.total = subtotal; // No tax for now

      // Delete existing items and insert new ones
      await supabaseAdmin.from('sm_invoice_items').delete().eq('invoice_id', id);

      const lineItems = items.map((item: {
        description: string;
        quantity: number;
        unit_amount: number;
        service_template_id?: string;
      }, index: number) => ({
        invoice_id: id,
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
        return NextResponse.json({ error: itemsError.message }, { status: 500 });
      }
    }

    const { error: updateError } = await supabaseAdmin
      .from('sm_invoices')
      .update(updateData)
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Fetch updated invoice
    const { data: updated } = await supabaseAdmin
      .from('sm_invoices')
      .select(`
        *,
        client:sm_clients(id, name, email, company),
        items:sm_invoice_items(*)
      `)
      .eq('id', id)
      .single();

    return NextResponse.json({ invoice: updated });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// DELETE invoice (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  // Delete items first (foreign key)
  await supabaseAdmin.from('sm_invoice_items').delete().eq('invoice_id', id);

  const { error } = await supabaseAdmin
    .from('sm_invoices')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
