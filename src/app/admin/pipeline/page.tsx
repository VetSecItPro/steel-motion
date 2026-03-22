'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { DollarSign, GripVertical, Plus } from 'lucide-react';

type Deal = {
  id: string;
  title: string;
  stage: string;
  value: number;
  notes: string | null;
  updated_at: string;
  lead: { id: string; name: string; email: string | null; company: string | null; phone: string | null } | null;
};

const stages = [
  { key: 'inquiry', label: 'Inquiry', color: 'border-blue-400' },
  { key: 'contacted', label: 'Contacted', color: 'border-yellow-400' },
  { key: 'proposal', label: 'Proposal', color: 'border-purple-400' },
  { key: 'negotiation', label: 'Negotiation', color: 'border-orange-400' },
  { key: 'won', label: 'Won', color: 'border-green-400' },
  { key: 'lost', label: 'Lost', color: 'border-red-400' },
];

function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    const res = await fetch('/api/deals', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      setDeals(data.deals || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  async function handleDrop(dealId: string, newStage: string) {
    // Optimistic update
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: newStage } : d));

    const res = await fetch(`/api/deals/${dealId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ stage: newStage }),
    });

    if (!res.ok) {
      // Revert on failure
      fetchDeals();
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-sm-text-secondary">Loading pipeline...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-sm-text-primary">Pipeline</h1>
          <p className="text-sm text-sm-text-muted mt-1">Drag deals between stages</p>
        </div>
        <Link
          href="/admin/leads"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sm-accent-primary text-white text-sm font-medium hover:bg-sm-accent-primary-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Lead
        </Link>
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {stages.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage.key);
          const stageValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={stage.key}
              className={`flex-shrink-0 w-72 bg-sm-surface-secondary rounded-xl border-t-4 ${stage.color}`}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                const dealId = e.dataTransfer.getData('text/plain');
                if (dealId) handleDrop(dealId, stage.key);
                setDraggingId(null);
              }}
            >
              {/* Stage header */}
              <div className="p-4 border-b border-sm-border-default">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-sm-text-primary">{stage.label}</h3>
                  <span className="text-xs bg-sm-surface-elevated text-sm-text-muted px-2 py-0.5 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
                {stageValue > 0 && (
                  <p className="text-xs text-sm-text-muted mt-1 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {formatCents(stageValue)}
                  </p>
                )}
              </div>

              {/* Deal cards */}
              <div className="p-3 space-y-2 min-h-[200px]">
                {stageDeals.map(deal => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={e => {
                      e.dataTransfer.setData('text/plain', deal.id);
                      setDraggingId(deal.id);
                    }}
                    onDragEnd={() => setDraggingId(null)}
                    className={`bg-sm-surface-elevated border border-sm-border-default rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all ${
                      draggingId === deal.id ? 'opacity-50 scale-95' : 'hover:shadow-[var(--sm-shadow-md)]'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-4 h-4 text-sm-text-muted mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sm-text-primary truncate">{deal.title}</p>
                        {deal.lead && (
                          <Link
                            href={`/admin/leads/${deal.lead.id}`}
                            className="text-xs text-sm-accent-primary hover:underline"
                            onClick={e => e.stopPropagation()}
                          >
                            {deal.lead.name}
                            {deal.lead.company && ` — ${deal.lead.company}`}
                          </Link>
                        )}
                        {deal.value > 0 && (
                          <p className="text-xs font-medium text-sm-text-primary mt-1">
                            {formatCents(deal.value)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
