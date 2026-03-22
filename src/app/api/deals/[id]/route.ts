import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from('sm_deals')
    .select(`
      *,
      lead:sm_leads(id, name, email, company, phone),
      proposals:sm_proposals(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ deal: data }, {
    headers: { 'Cache-Control': 'private, no-store' },
  });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const allowedFields = ['title', 'stage', 'value', 'notes', 'closed_at', 'invoice_id'];
    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (field in body) {
        updates[field] = body[field];
      }
    }

    // Auto-set closed_at when stage becomes won or lost
    if (updates.stage === 'won' || updates.stage === 'lost') {
      updates.closed_at = updates.closed_at || new Date().toISOString();
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('sm_deals')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        lead:sm_leads(id, name, email, company, phone)
      `)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ deal: data });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
