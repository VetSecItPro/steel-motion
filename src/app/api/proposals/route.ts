import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const dealId = searchParams.get('deal_id');
  const leadId = searchParams.get('lead_id');

  let query = supabaseAdmin
    .from('sm_proposals')
    .select(`
      *,
      deal:sm_deals(id, title, stage),
      lead:sm_leads(id, name, email, company)
    `)
    .order('created_at', { ascending: false });

  if (dealId) {
    query = query.eq('deal_id', dealId);
  }
  if (leadId) {
    query = query.eq('lead_id', leadId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ proposals: data }, {
    headers: { 'Cache-Control': 'private, no-store' },
  });
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
    const { deal_id, lead_id, title, items, total, notes } = body;

    if (!deal_id || !lead_id || !title || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'deal_id, lead_id, title, and items are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('sm_proposals')
      .insert({
        deal_id,
        lead_id,
        title,
        items,
        total: total || 0,
        notes: notes || null,
        status: 'draft',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ proposal: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
