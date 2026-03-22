'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, X } from 'lucide-react';

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
  created_at: string;
};

const statusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  proposal: 'Proposal',
  won: 'Won',
  lost: 'Lost',
  inactive: 'Inactive',
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700',
  proposal: 'bg-orange-100 text-orange-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
  inactive: 'bg-gray-100 text-gray-500',
};

function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '', source: 'manual', estimated_value: '',
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const res = await fetch('/api/leads', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      setLeads(data.leads || []);
    }
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...form,
          estimated_value: form.estimated_value ? Math.round(parseFloat(form.estimated_value) * 100) : 0,
        }),
      });
      if (res.ok) {
        setShowCreate(false);
        setForm({ name: '', email: '', company: '', phone: '', source: 'manual', estimated_value: '' });
        fetchLeads();
      }
    } finally {
      setCreating(false);
    }
  }

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    return l.name.toLowerCase().includes(q) ||
      (l.email && l.email.toLowerCase().includes(q)) ||
      (l.company && l.company.toLowerCase().includes(q));
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-sm-text-secondary">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-sm-text-primary">Leads</h1>
          <p className="text-sm text-sm-text-muted mt-1">{leads.length} total</p>
        </div>
        <Button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white"
        >
          {showCreate ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showCreate ? 'Cancel' : 'New Lead'}
        </Button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5">
          <h2 className="text-base font-semibold text-sm-text-primary mb-4">New Lead</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-name" className="block text-sm text-sm-text-secondary mb-1">Name *</label>
              <Input
                id="lead-name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
                className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
              />
            </div>
            <div>
              <label htmlFor="lead-email" className="block text-sm text-sm-text-secondary mb-1">Email</label>
              <Input
                id="lead-email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
              />
            </div>
            <div>
              <label htmlFor="lead-company" className="block text-sm text-sm-text-secondary mb-1">Company</label>
              <Input
                id="lead-company"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
              />
            </div>
            <div>
              <label htmlFor="lead-phone" className="block text-sm text-sm-text-secondary mb-1">Phone</label>
              <Input
                id="lead-phone"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
              />
            </div>
            <div>
              <label htmlFor="lead-source" className="block text-sm text-sm-text-secondary mb-1">Source</label>
              <select
                id="lead-source"
                value={form.source}
                onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
                className="w-full rounded-lg border border-sm-border-default bg-sm-surface-primary text-sm-text-primary px-3 py-2 text-sm"
              >
                <option value="manual">Manual</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="cold_outreach">Cold Outreach</option>
              </select>
            </div>
            <div>
              <label htmlFor="lead-value" className="block text-sm text-sm-text-secondary mb-1">Estimated Value ($)</label>
              <Input
                id="lead-value"
                type="number"
                step="0.01"
                min="0"
                value={form.estimated_value}
                onChange={e => setForm(f => ({ ...f, estimated_value: e.target.value }))}
                className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                placeholder="0.00"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <Button
                type="submit"
                disabled={creating || !form.name}
                className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white"
              >
                {creating ? 'Creating...' : 'Create Lead'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sm-text-muted" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search leads..."
          className="pl-10 bg-sm-surface-elevated border-sm-border-default text-sm-text-primary"
        />
      </div>

      {/* Leads table */}
      <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sm-border-default bg-sm-surface-secondary">
                <th className="text-left text-xs font-medium text-sm-text-muted px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium text-sm-text-muted px-4 py-3 hidden sm:table-cell">Company</th>
                <th className="text-left text-xs font-medium text-sm-text-muted px-4 py-3 hidden md:table-cell">Source</th>
                <th className="text-left text-xs font-medium text-sm-text-muted px-4 py-3">Status</th>
                <th className="text-right text-xs font-medium text-sm-text-muted px-4 py-3 hidden sm:table-cell">Value</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-sm text-sm-text-muted py-8">
                    {search ? 'No leads match your search' : 'No leads yet'}
                  </td>
                </tr>
              ) : (
                filtered.map(lead => (
                  <tr key={lead.id} className="border-b border-sm-border-default last:border-0 hover:bg-sm-surface-secondary transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="text-sm font-medium text-sm-accent-primary hover:underline">
                        {lead.name}
                      </Link>
                      {lead.email && <p className="text-xs text-sm-text-muted">{lead.email}</p>}
                    </td>
                    <td className="px-4 py-3 text-sm text-sm-text-secondary hidden sm:table-cell">{lead.company || '—'}</td>
                    <td className="px-4 py-3 text-sm text-sm-text-secondary capitalize hidden md:table-cell">{lead.source.replace('_', ' ')}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${statusColors[lead.status] || 'bg-gray-100 text-gray-500'}`}>
                        {statusLabels[lead.status] || lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-sm-text-primary text-right hidden sm:table-cell">
                      {lead.estimated_value > 0 ? formatCents(lead.estimated_value) : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
