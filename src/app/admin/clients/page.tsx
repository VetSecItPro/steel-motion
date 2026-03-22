'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Building2, Mail, Phone } from 'lucide-react';

type Client = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  address_line1: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  notes: string | null;
  created_at: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '',
    address_line1: '', city: '', state: '', zip: '',
  });
  const [saving, setSaving] = useState(false);

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch('/api/clients', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ name: '', email: '', company: '', phone: '', address_line1: '', city: '', state: '', zip: '' });
        fetchClients();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create client');
      }
    } catch {
      alert('Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-sm-text-primary">Clients</h1>
          <p className="text-sm text-sm-text-secondary mt-1">
            {clients.length} client{clients.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white"
          aria-expanded={showForm}
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Client'}
        </Button>
      </div>

      {/* New client form */}
      {showForm && (
        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-6 mb-6">
          <h2 className="text-base font-semibold text-sm-text-primary mb-4">New Client</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="client-name" className="block text-xs font-medium text-sm-text-secondary mb-1">Name *</label>
                <Input
                  id="client-name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  autoComplete="name"
                  className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                />
              </div>
              <div>
                <label htmlFor="client-email" className="block text-xs font-medium text-sm-text-secondary mb-1">Email *</label>
                <Input
                  id="client-email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  autoComplete="email"
                  className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                />
              </div>
              <div>
                <label htmlFor="client-company" className="block text-xs font-medium text-sm-text-secondary mb-1">Company</label>
                <Input
                  id="client-company"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Inc."
                  autoComplete="organization"
                  className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                />
              </div>
              <div>
                <label htmlFor="client-phone" className="block text-xs font-medium text-sm-text-secondary mb-1">Phone</label>
                <Input
                  id="client-phone"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                  className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="client-address" className="block text-xs font-medium text-sm-text-secondary mb-1">Address</label>
                <Input
                  id="client-address"
                  value={formData.address_line1}
                  onChange={e => setFormData({ ...formData, address_line1: e.target.value })}
                  placeholder="123 Main St"
                  autoComplete="street-address"
                  className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                />
              </div>
              <div>
                <label htmlFor="client-city" className="block text-xs font-medium text-sm-text-secondary mb-1">City</label>
                <Input
                  id="client-city"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Dallas"
                  autoComplete="address-level2"
                  className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="client-state" className="block text-xs font-medium text-sm-text-secondary mb-1">State</label>
                  <Input
                    id="client-state"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    placeholder="TX"
                    autoComplete="address-level1"
                    className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                  />
                </div>
                <div>
                  <label htmlFor="client-zip" className="block text-xs font-medium text-sm-text-secondary mb-1">ZIP</label>
                  <Input
                    id="client-zip"
                    value={formData.zip}
                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                    placeholder="75001"
                    autoComplete="postal-code"
                    className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={saving}
                className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white"
              >
                {saving ? 'Creating...' : 'Create Client'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Client list */}
      <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm-text-muted">Loading clients...</div>
        ) : clients.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-sm-surface-secondary mx-auto flex items-center justify-center mb-3">
              <Building2 className="w-6 h-6 text-sm-text-muted" />
            </div>
            <p className="text-sm-text-secondary">No clients yet</p>
          </div>
        ) : (
          <div className="divide-y divide-sm-border-default">
            {clients.map(client => (
              <div key={client.id} className="p-4 sm:p-5 hover:bg-sm-surface-secondary/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-medium text-sm-text-primary">{client.name}</h3>
                      {client.company && (
                        <Badge variant="outline" className="text-xs border-sm-border-default text-sm-text-secondary">
                          {client.company}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1.5 text-xs text-sm-text-muted">
                        <Mail className="w-3 h-3" />
                        {client.email}
                      </span>
                      {client.phone && (
                        <span className="flex items-center gap-1.5 text-xs text-sm-text-muted">
                          <Phone className="w-3 h-3" />
                          {client.phone}
                        </span>
                      )}
                    </div>
                    {client.city && client.state && (
                      <p className="text-xs text-sm-text-muted mt-1">{client.city}, {client.state}</p>
                    )}
                  </div>
                  <span className="text-xs text-sm-text-muted whitespace-nowrap">
                    {new Date(client.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
