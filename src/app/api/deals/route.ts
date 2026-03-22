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
  const stage = searchParams.get('stage');
  const leadId = searchParams.get('lead_id');

  let query = supabaseAdmin
    .from('sm_deals')
    .select(`
      *,
      lead:sm_leads(id, name, email, company, phone)
    `)
    .order('updated_at', { ascending: false });

  if (stage) {
    query = query.eq('stage', stage);
  }
  if (leadId) {
    query = query.eq('lead_id', leadId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ deals: data }, {
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
    const { lead_id, title, stage, value, notes } = body;

    if (!lead_id || !title) {
      return NextResponse.json(
        { error: 'lead_id and title are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('sm_deals')
      .insert({
        lead_id,
        title,
        stage: stage || 'inquiry',
        value: value || 0,
        notes: notes || null,
      })
      .select(`
        *,
        lead:sm_leads(id, name, email, company, phone)
      `)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ deal: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
