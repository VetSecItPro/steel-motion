'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft, Phone, Mail, Calendar, MessageSquare, FileText, RotateCw,
  Plus, Building, DollarSign, Clock, Send, Receipt,
} from 'lucide-react';

type Activity = {
  id: string;
  type: string;
  description: string;
  date: string;
};

type Proposal = {
  id: string;
  title: string;
  total: number;
  status: string;
  sent_at: string | null;
  created_at: string;
};

type Deal = {
  id: string;
  title: string;
  stage: string;
  value: number;
  invoice_id: string | null;
  created_at: string;
  proposals: Proposal[];
};

type Lead = {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  phone: string | null;
  source: string;
  status: string;
  estimated_value: number;
  notes: string | null;
  contact_inquiry_id: string | null;
  created_at: string;
  updated_at: string;
  activities: Activity[];
  deals: Deal[];
};

const statusOptions = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'inactive'];
const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700',
  proposal: 'bg-orange-100 text-orange-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
  inactive: 'bg-gray-100 text-gray-500',
};

const activityIcons: Record<string, typeof Phone> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: MessageSquare,
  proposal: FileText,
  'follow-up': RotateCw,
};

const dealStageColors: Record<string, string> = {
  inquiry: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  proposal: 'bg-purple-100 text-purple-700',
  negotiation: 'bg-orange-100 text-orange-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
};

const proposalStatusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export default function LeadDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [showActivity, setShowActivity] = useState(false);
  const [showDeal, setShowDeal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Activity form
  const [activityForm, setActivityForm] = useState({ type: 'note', description: '' });

  // Deal form
  const [dealForm, setDealForm] = useState({ title: '', value: '', stage: 'inquiry' });

  const fetchLead = useCallback(async () => {
    const res = await fetch(`/api/leads/${id}`, { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      setLead(data.lead);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  async function handleStatusChange(newStatus: string) {
    if (!lead) return;
    setSaving(true);
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
    setSaving(false);
  }

  async function handleLogActivity(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ lead_id: id, ...activityForm }),
    });
    if (res.ok) {
      setActivityForm({ type: 'note', description: '' });
      setShowActivity(false);
      fetchLead();
    }
    setSaving(false);
  }

  async function handleCreateDeal(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        lead_id: id,
        title: dealForm.title,
        value: dealForm.value ? Math.round(parseFloat(dealForm.value) * 100) : 0,
        stage: dealForm.stage,
      }),
    });
    if (res.ok) {
      setDealForm({ title: '', value: '', stage: 'inquiry' });
      setShowDeal(false);
      fetchLead();
    }
    setSaving(false);
  }

  async function handleConvertToInvoice(deal: Deal) {
    if (!lead) return;

    // First create/find client
    const clientRes = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: lead.name,
        email: lead.email || '',
        company: lead.company || '',
        phone: lead.phone || '',
      }),
    });

    if (!clientRes.ok) return;
    const { client } = await clientRes.json();

    // Create invoice from deal proposals or deal value
    const proposals = deal.proposals.filter(p => p.status === 'accepted' || p.status === 'sent');
    let items;

    if (proposals.length > 0) {
      // Use the latest proposal's items
      const proposalRes = await fetch(`/api/proposals/${proposals[0].id}`, { credentials: 'include' });
      if (proposalRes.ok) {
        const { proposal } = await proposalRes.json();
        items = proposal.items;
      }
    }

    if (!items || items.length === 0) {
      items = [{ description: deal.title, quantity: 1, unit_amount: deal.value }];
    }

    const invoiceRes = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        client_id: client.id,
        items,
        payment_terms: 'net_30',
      }),
    });

    if (invoiceRes.ok) {
      const { invoice } = await invoiceRes.json();
      // Link invoice to deal
      await fetch(`/api/deals/${deal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ invoice_id: invoice.id }),
      });
      router.push(`/admin/invoices/${invoice.id}`);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-sm-text-secondary">Loading lead...</div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-20">
        <p className="text-sm-text-muted">Lead not found</p>
        <Link href="/admin/leads" className="text-sm text-sm-accent-primary hover:underline mt-2 inline-block">
          Back to leads
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="w-8 h-8 rounded-lg bg-sm-surface-secondary flex items-center justify-center hover:bg-sm-border-default transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-sm-text-muted" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-sm-text-primary">{lead.name}</h1>
            {lead.company && (
              <div className="flex items-center gap-1 mt-0.5">
                <Building className="w-3 h-3 text-sm-text-muted" />
                <span className="text-sm text-sm-text-secondary">{lead.company}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={lead.status}
            onChange={e => handleStatusChange(e.target.value)}
            disabled={saving}
            className={`rounded-lg border-0 text-xs font-medium px-3 py-1.5 cursor-pointer ${statusColors[lead.status] || 'bg-gray-100'}`}
            aria-label="Lead status"
          >
            {statusOptions.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Contact info + actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-sm-text-primary">Contact Info</h2>
            {lead.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sm-text-muted" />
                <a href={`mailto:${lead.email}`} className="text-sm text-sm-accent-primary hover:underline">{lead.email}</a>
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sm-text-muted" />
                <a href={`tel:${lead.phone}`} className="text-sm text-sm-text-primary">{lead.phone}</a>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sm-text-muted" />
              <span className="text-sm text-sm-text-secondary">Added {formatDate(lead.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-sm-text-muted" />
              <span className="text-sm text-sm-text-secondary">
                Est. value: {lead.estimated_value > 0 ? formatCents(lead.estimated_value) : 'Not set'}
              </span>
            </div>
            <div className="text-xs text-sm-text-muted capitalize">Source: {lead.source.replace('_', ' ')}</div>
            {lead.notes && (
              <div className="pt-2 border-t border-sm-border-default">
                <p className="text-sm text-sm-text-secondary whitespace-pre-wrap">{lead.notes}</p>
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5 space-y-2">
            <h2 className="text-sm font-semibold text-sm-text-primary mb-3">Actions</h2>
            <button
              onClick={() => { setShowActivity(true); setShowDeal(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sm-text-secondary hover:bg-sm-surface-secondary transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Log Activity
            </button>
            <button
              onClick={() => { setShowDeal(true); setShowActivity(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sm-text-secondary hover:bg-sm-surface-secondary transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Deal
            </button>
            {lead.deals.length > 0 && (
              <Link
                href={`/admin/proposals/new?lead_id=${lead.id}&deal_id=${lead.deals[0].id}`}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sm-text-secondary hover:bg-sm-surface-secondary transition-colors"
              >
                <FileText className="w-4 h-4" />
                Create Proposal
              </Link>
            )}
          </div>
        </div>

        {/* Right column — timeline + deals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Log activity form */}
          {showActivity && (
            <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
              <h2 className="text-sm font-semibold text-sm-text-primary mb-3">Log Activity</h2>
              <form onSubmit={handleLogActivity} className="space-y-3">
                <div className="flex gap-3">
                  <select
                    value={activityForm.type}
                    onChange={e => setActivityForm(f => ({ ...f, type: e.target.value }))}
                    className="rounded-lg border border-sm-border-default bg-sm-surface-primary text-sm-text-primary px-3 py-2 text-sm"
                    aria-label="Activity type"
                  >
                    <option value="call">Call</option>
                    <option value="email">Email</option>
                    <option value="meeting">Meeting</option>
                    <option value="note">Note</option>
                    <option value="follow-up">Follow-up</option>
                  </select>
                  <Input
                    value={activityForm.description}
                    onChange={e => setActivityForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="What happened?"
                    required
                    className="flex-1 bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setShowActivity(false)} className="text-sm text-sm-text-secondary">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving} className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white">
                    {saving ? 'Saving...' : 'Log'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Create deal form */}
          {showDeal && (
            <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
              <h2 className="text-sm font-semibold text-sm-text-primary mb-3">Create Deal</h2>
              <form onSubmit={handleCreateDeal} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input
                    value={dealForm.title}
                    onChange={e => setDealForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Deal title"
                    required
                    className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={dealForm.value}
                    onChange={e => setDealForm(f => ({ ...f, value: e.target.value }))}
                    placeholder="Value ($)"
                    className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                  />
                  <select
                    value={dealForm.stage}
                    onChange={e => setDealForm(f => ({ ...f, stage: e.target.value }))}
                    className="rounded-lg border border-sm-border-default bg-sm-surface-primary text-sm-text-primary px-3 py-2 text-sm"
                    aria-label="Deal stage"
                  >
                    <option value="inquiry">Inquiry</option>
                    <option value="contacted">Contacted</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setShowDeal(false)} className="text-sm text-sm-text-secondary">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving} className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white">
                    {saving ? 'Creating...' : 'Create'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Deals */}
          {lead.deals.length > 0 && (
            <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
              <h2 className="text-sm font-semibold text-sm-text-primary mb-4">Deals</h2>
              <div className="space-y-3">
                {lead.deals.map(deal => (
                  <div key={deal.id} className="border border-sm-border-default rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-sm-text-primary">{deal.title}</span>
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${dealStageColors[deal.stage]}`}>
                          {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-sm-text-primary">
                        {deal.value > 0 ? formatCents(deal.value) : '—'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <Link
                        href={`/admin/proposals/new?lead_id=${lead.id}&deal_id=${deal.id}`}
                        className="text-xs text-sm-accent-primary hover:underline flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Create Proposal
                      </Link>
                      {deal.stage === 'won' && !deal.invoice_id && (
                        <button
                          onClick={() => handleConvertToInvoice(deal)}
                          className="text-xs text-green-600 hover:underline flex items-center gap-1"
                        >
                          <Receipt className="w-3 h-3" />
                          Convert to Invoice
                        </button>
                      )}
                      {deal.invoice_id && (
                        <Link
                          href={`/admin/invoices/${deal.invoice_id}`}
                          className="text-xs text-sm-accent-primary hover:underline flex items-center gap-1"
                        >
                          <Receipt className="w-3 h-3" />
                          View Invoice
                        </Link>
                      )}
                    </div>

                    {/* Proposals under this deal */}
                    {deal.proposals.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-sm-border-default space-y-2">
                        <p className="text-xs font-medium text-sm-text-muted">Proposals</p>
                        {deal.proposals.map(proposal => (
                          <div key={proposal.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-sm-text-primary">{proposal.title}</span>
                              <span className={`px-1.5 py-0.5 rounded text-xs ${proposalStatusColors[proposal.status]}`}>
                                {proposal.status}
                              </span>
                            </div>
                            <span className="text-sm-text-secondary">{formatCents(proposal.total)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity timeline */}
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
            <h2 className="text-sm font-semibold text-sm-text-primary mb-4">Activity Timeline</h2>
            {lead.activities.length === 0 ? (
              <p className="text-sm text-sm-text-muted text-center py-6">No activity logged yet</p>
            ) : (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-sm-border-default" />
                <div className="space-y-4">
                  {lead.activities.map(activity => {
                    const Icon = activityIcons[activity.type] || MessageSquare;
                    return (
                      <div key={activity.id} className="flex gap-4 relative">
                        <div className="w-8 h-8 rounded-full bg-sm-surface-secondary border-2 border-sm-border-default flex items-center justify-center z-10">
                          <Icon className="w-3.5 h-3.5 text-sm-text-muted" />
                        </div>
                        <div className="flex-1 pb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-sm-text-primary capitalize">{activity.type.replace('-', ' ')}</span>
                            <span className="text-xs text-sm-text-muted">{formatDateTime(activity.date)}</span>
                          </div>
                          <p className="text-sm text-sm-text-secondary mt-0.5">{activity.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
