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
  const leadId = searchParams.get('lead_id');
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  let query = supabaseAdmin
    .from('sm_activities')
    .select(`
      *,
      lead:sm_leads(id, name, company)
    `)
    .order('date', { ascending: false })
    .limit(limit);

  if (leadId) {
    query = query.eq('lead_id', leadId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ activities: data }, {
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
    const { lead_id, type, description, date } = body;

    if (!lead_id || !type || !description) {
      return NextResponse.json(
        { error: 'lead_id, type, and description are required' },
        { status: 400 }
      );
    }

    const validTypes = ['call', 'email', 'meeting', 'note', 'proposal', 'follow-up'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('sm_activities')
      .insert({
        lead_id,
        type,
        description,
        date: date || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ activity: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
