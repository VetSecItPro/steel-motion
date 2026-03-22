'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, Trash2, Send } from 'lucide-react';

type ServiceTemplate = {
  id: string;
  name: string;
  description: string;
  default_amount: number;
  unit: string;
};

type Lead = {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
};

type Deal = {
  id: string;
  title: string;
  stage: string;
  value: number;
  lead: Lead | null;
};

type LineItem = {
  description: string;
  quantity: number;
  unit_amount: string;
  service_template_id: string | null;
};

function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function ProposalFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dealIdParam = searchParams.get('deal_id');
  const leadIdParam = searchParams.get('lead_id');

  const [templates, setTemplates] = useState<ServiceTemplate[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);

  const [title, setTitle] = useState('');
  const [dealId, setDealId] = useState(dealIdParam || '');
  const [leadId, setLeadId] = useState(leadIdParam || '');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<LineItem[]>([
    { description: '', quantity: 1, unit_amount: '', service_template_id: null },
  ]);

  useEffect(() => {
    async function fetchData() {
      const [templatesRes, dealsRes] = await Promise.all([
        fetch('/api/service-templates', { credentials: 'include' }),
        fetch('/api/deals', { credentials: 'include' }),
      ]);

      if (templatesRes.ok) {
        const t = await templatesRes.json();
        setTemplates(t.templates || []);
      }
      if (dealsRes.ok) {
        const d = await dealsRes.json();
        setDeals(d.deals || []);

        // Auto-set title from deal
        if (dealIdParam) {
          const deal = (d.deals || []).find((deal: Deal) => deal.id === dealIdParam);
          if (deal) {
            setTitle(`Proposal: ${deal.title}`);
            if (deal.lead) setLeadId(deal.lead.id);
          }
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [dealIdParam]);

  function addItem() {
    setItems(prev => [...prev, { description: '', quantity: 1, unit_amount: '', service_template_id: null }]);
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  function updateItem(index: number, updates: Partial<LineItem>) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, ...updates } : item));
  }

  function addFromTemplate(template: ServiceTemplate) {
    setItems(prev => [
      ...prev,
      {
        description: `${template.name}: ${template.description}`,
        quantity: 1,
        unit_amount: (template.default_amount / 100).toFixed(2),
        service_template_id: template.id,
      },
    ]);
  }

  function calculateTotal(): number {
    return items.reduce((sum, item) => {
      const amount = parseFloat(item.unit_amount) || 0;
      return sum + (item.quantity * Math.round(amount * 100));
    }, 0);
  }

  async function handleSave(send: boolean = false) {
    if (send) {
      setSending(true);
    } else {
      setSaving(true);
    }

    try {
      const proposalItems = items
        .filter(item => item.description)
        .map(item => ({
          description: item.description,
          quantity: item.quantity,
          unit_amount: Math.round((parseFloat(item.unit_amount) || 0) * 100),
        }));

      const total = proposalItems.reduce((sum, item) => sum + (item.quantity * item.unit_amount), 0);

      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          deal_id: dealId,
          lead_id: leadId,
          title,
          items: proposalItems,
          total,
          notes: notes || null,
        }),
      });

      if (res.ok) {
        const { proposal } = await res.json();

        if (send) {
          await fetch(`/api/proposals/${proposal.id}/send`, {
            method: 'POST',
            credentials: 'include',
          });
        }

        router.push(`/admin/leads/${leadId}`);
      }
    } finally {
      setSaving(false);
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-sm-text-secondary">Loading...</div>
      </div>
    );
  }

  const selectedDeal = deals.find(d => d.id === dealId);
  const total = calculateTotal();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={leadId ? `/admin/leads/${leadId}` : '/admin/pipeline'}
          className="w-8 h-8 rounded-lg bg-sm-surface-secondary flex items-center justify-center hover:bg-sm-border-default transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-sm-text-muted" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-sm-text-primary">New Proposal</h1>
          {selectedDeal?.lead && (
            <p className="text-sm text-sm-text-muted">For {selectedDeal.lead.name}{selectedDeal.lead.company ? ` — ${selectedDeal.lead.company}` : ''}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5 space-y-4">
            <div>
              <label htmlFor="proposal-title" className="block text-sm text-sm-text-secondary mb-1">Title *</label>
              <Input
                id="proposal-title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., AI Automation Package"
                required
                className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
              />
            </div>

            {!dealIdParam && (
              <div>
                <label htmlFor="proposal-deal" className="block text-sm text-sm-text-secondary mb-1">Deal *</label>
                <select
                  id="proposal-deal"
                  value={dealId}
                  onChange={e => {
                    setDealId(e.target.value);
                    const deal = deals.find(d => d.id === e.target.value);
                    if (deal?.lead) setLeadId(deal.lead.id);
                  }}
                  className="w-full rounded-lg border border-sm-border-default bg-sm-surface-primary text-sm-text-primary px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select a deal...</option>
                  {deals.filter(d => !['won', 'lost'].includes(d.stage)).map(deal => (
                    <option key={deal.id} value={deal.id}>
                      {deal.title} — {deal.lead?.name || 'Unknown'}
                      {deal.value > 0 ? ` (${formatCents(deal.value)})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Line items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-sm-text-secondary">Line Items</label>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-xs text-sm-accent-primary hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Item
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Input
                        value={item.description}
                        onChange={e => updateItem(i, { description: e.target.value })}
                        placeholder="Description"
                        className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                      />
                    </div>
                    <div className="w-20">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => updateItem(i, { quantity: parseInt(e.target.value) || 1 })}
                        placeholder="Qty"
                        className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                      />
                    </div>
                    <div className="w-28">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.unit_amount}
                        onChange={e => updateItem(i, { unit_amount: e.target.value })}
                        placeholder="Price ($)"
                        className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                      />
                    </div>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(i)}
                        className="w-8 h-10 flex items-center justify-center text-sm-text-muted hover:text-sm-status-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="proposal-notes" className="block text-sm text-sm-text-secondary mb-1">Notes</label>
              <textarea
                id="proposal-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="Additional notes for the client..."
                className="w-full rounded-lg border border-sm-border-default bg-sm-surface-primary text-sm-text-primary px-3 py-2 text-sm resize-none"
              />
            </div>
          </div>

          {/* Total + actions */}
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-semibold text-sm-text-primary">Total</span>
              <span className="text-xl font-semibold text-sm-accent-primary">{formatCents(total)}</span>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => handleSave(false)}
                disabled={saving || sending || !title || !dealId}
                variant="outline"
                className="flex-1 border-sm-border-default text-sm-text-primary"
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                onClick={() => handleSave(true)}
                disabled={saving || sending || !title || !dealId}
                className="flex-1 bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white"
              >
                <Send className="w-4 h-4" />
                {sending ? 'Sending...' : 'Save & Send'}
              </Button>
            </div>
          </div>
        </div>

        {/* Service templates sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
            <h2 className="text-sm font-semibold text-sm-text-primary mb-3">Service Templates</h2>
            <p className="text-xs text-sm-text-muted mb-4">Click to add to proposal</p>
            {templates.length === 0 ? (
              <p className="text-sm text-sm-text-muted text-center py-4">No templates available</p>
            ) : (
              <div className="space-y-2">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => addFromTemplate(template)}
                    className="w-full text-left p-3 rounded-lg border border-sm-border-default hover:bg-sm-surface-secondary transition-colors"
                  >
                    <p className="text-sm font-medium text-sm-text-primary">{template.name}</p>
                    <p className="text-xs text-sm-text-muted mt-0.5 line-clamp-2">{template.description}</p>
                    <p className="text-xs font-medium text-sm-accent-primary mt-1">
                      {formatCents(template.default_amount)} / {template.unit}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewProposalPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-sm-text-secondary">Loading...</div>
      </div>
    }>
      <ProposalFormContent />
    </Suspense>
  );
}
