'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, ArrowLeft, Send, Save } from 'lucide-react';

type Client = {
  id: string;
  name: string;
  email: string;
  company: string | null;
};

type ServiceTemplate = {
  id: string;
  name: string;
  description: string;
  category: string;
  default_amount: number;
};

type LineItem = {
  description: string;
  quantity: number;
  unit_amount: number; // in cents
  service_template_id?: string;
};

function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [templates, setTemplates] = useState<ServiceTemplate[]>([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [showNewClient, setShowNewClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientCompany, setNewClientCompany] = useState('');
  const [items, setItems] = useState<LineItem[]>([
    { description: '', quantity: 1, unit_amount: 0 },
  ]);
  const [paymentTerms, setPaymentTerms] = useState('due_on_receipt');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);

  const fetchData = useCallback(async () => {
    const [clientsRes, templatesRes] = await Promise.all([
      fetch('/api/clients', { credentials: 'include' }),
      fetch('/api/service-templates', { credentials: 'include' }),
    ]);
    if (clientsRes.ok) {
      const data = await clientsRes.json();
      setClients(data.clients || []);
    }
    if (templatesRes.ok) {
      const data = await templatesRes.json();
      setTemplates(data.templates || []);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function addLineItem() {
    setItems([...items, { description: '', quantity: 1, unit_amount: 0 }]);
  }

  function removeLineItem(index: number) {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  }

  function updateLineItem(index: number, field: keyof LineItem, value: string | number) {
    const updated = [...items];
    if (field === 'unit_amount') {
      // Convert dollar input to cents
      updated[index] = { ...updated[index], [field]: Math.round(Number(value) * 100) };
    } else if (field === 'quantity') {
      updated[index] = { ...updated[index], [field]: Number(value) };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setItems(updated);
  }

  function applyTemplate(index: number, templateId: string) {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    const updated = [...items];
    updated[index] = {
      description: template.description,
      quantity: 1,
      unit_amount: template.default_amount,
      service_template_id: template.id,
    };
    setItems(updated);
  }

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_amount, 0);

  async function createClient(): Promise<string | null> {
    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: newClientName,
        email: newClientEmail,
        company: newClientCompany || null,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.client.id;
    }
    return null;
  }

  async function handleSave(send: boolean) {
    if (send) {
      setSending(true);
    } else {
      setSaving(true);
    }

    try {
      let clientId = selectedClientId;

      // Create new client if needed
      if (showNewClient) {
        if (!newClientName || !newClientEmail) {
          alert('Client name and email are required');
          return;
        }
        const newId = await createClient();
        if (!newId) {
          alert('Failed to create client');
          return;
        }
        clientId = newId;
      }

      if (!clientId) {
        alert('Please select or create a client');
        return;
      }

      // Validate items
      const validItems = items.filter(item => item.description && item.unit_amount > 0);
      if (validItems.length === 0) {
        alert('Add at least one line item with a description and amount');
        return;
      }

      // Create invoice
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          client_id: clientId,
          items: validItems,
          payment_terms: paymentTerms,
          notes,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to create invoice');
        return;
      }

      const data = await res.json();

      // If sending, call the send endpoint
      if (send && data.invoice?.id) {
        const sendRes = await fetch(`/api/invoices/${data.invoice.id}/send`, {
          method: 'POST',
          credentials: 'include',
        });
        if (!sendRes.ok) {
          alert('Invoice created but failed to send. You can send it from the invoice detail page.');
        }
      }

      router.push('/admin/invoices');
    } catch {
      alert('Something went wrong');
    } finally {
      setSaving(false);
      setSending(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-sm-text-secondary hover:text-sm-text-primary"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-sm-text-primary">New Invoice</h1>
          <p className="text-sm text-sm-text-secondary mt-0.5">Create a new client invoice</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Client Selection */}
        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-6">
          <h2 className="text-base font-semibold text-sm-text-primary mb-4">Client</h2>

          {!showNewClient ? (
            <div className="space-y-3">
              <label htmlFor="select-client" className="sr-only">Select a client</label>
              <select
                id="select-client"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full h-9 rounded-md border border-sm-border-default bg-sm-surface-primary px-3 text-sm text-sm-text-primary focus:outline-none focus:ring-2 focus:ring-sm-accent-primary/50"
              >
                <option value="">Select a client...</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name} {client.company ? `(${client.company})` : ''} - {client.email}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowNewClient(true)}
                className="text-sm text-sm-accent-primary hover:text-sm-accent-primary-hover font-medium"
              >
                + Create new client
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="new-client-name" className="block text-xs font-medium text-sm-text-secondary mb-1">Name *</label>
                  <Input
                    id="new-client-name"
                    value={newClientName}
                    onChange={e => setNewClientName(e.target.value)}
                    placeholder="John Doe"
                    autoComplete="name"
                    className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                  />
                </div>
                <div>
                  <label htmlFor="new-client-email" className="block text-xs font-medium text-sm-text-secondary mb-1">Email *</label>
                  <Input
                    id="new-client-email"
                    type="email"
                    value={newClientEmail}
                    onChange={e => setNewClientEmail(e.target.value)}
                    placeholder="john@example.com"
                    autoComplete="email"
                    className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="new-client-company" className="block text-xs font-medium text-sm-text-secondary mb-1">Company</label>
                <Input
                  id="new-client-company"
                  value={newClientCompany}
                  onChange={e => setNewClientCompany(e.target.value)}
                  placeholder="Acme Inc."
                  autoComplete="organization"
                  className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
                />
              </div>
              <button
                onClick={() => { setShowNewClient(false); setSelectedClientId(''); }}
                className="text-sm text-sm-text-muted hover:text-sm-text-secondary"
              >
                Cancel - select existing client instead
              </button>
            </div>
          )}
        </div>

        {/* Line Items */}
        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-6">
          <h2 className="text-base font-semibold text-sm-text-primary mb-4">Line Items</h2>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="border border-sm-border-default rounded-lg p-4 bg-sm-surface-primary">
                {templates.length > 0 && (
                  <div className="mb-3">
                    <label htmlFor={`template-${index}`} className="sr-only">Service template for line item {index + 1}</label>
                    <select
                      id={`template-${index}`}
                      onChange={(e) => applyTemplate(index, e.target.value)}
                      className="w-full h-8 rounded-md border border-sm-border-default bg-sm-surface-elevated px-3 text-xs text-sm-text-secondary focus:outline-none focus:ring-2 focus:ring-sm-accent-primary/50"
                      defaultValue=""
                    >
                      <option value="" disabled>Use a service template...</option>
                      {templates.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.name} - {formatCents(t.default_amount)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor={`item-desc-${index}`} className="block text-xs font-medium text-sm-text-secondary mb-1">Description</label>
                    <Input
                      id={`item-desc-${index}`}
                      value={item.description}
                      onChange={e => updateLineItem(index, 'description', e.target.value)}
                      placeholder="Service description"
                      className="bg-sm-surface-elevated border-sm-border-default text-sm-text-primary"
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label htmlFor={`item-qty-${index}`} className="block text-xs font-medium text-sm-text-secondary mb-1">Qty</label>
                    <Input
                      id={`item-qty-${index}`}
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => updateLineItem(index, 'quantity', e.target.value)}
                      className="bg-sm-surface-elevated border-sm-border-default text-sm-text-primary"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-3">
                    <label htmlFor={`item-price-${index}`} className="block text-xs font-medium text-sm-text-secondary mb-1">Unit Price ($)</label>
                    <Input
                      id={`item-price-${index}`}
                      type="number"
                      min={0}
                      step={0.01}
                      value={(item.unit_amount / 100).toFixed(2)}
                      onChange={e => updateLineItem(index, 'unit_amount', e.target.value)}
                      className="bg-sm-surface-elevated border-sm-border-default text-sm-text-primary"
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-1 flex items-end justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLineItem(index)}
                      disabled={items.length <= 1}
                      className="h-9 w-9 text-sm-status-error hover:text-sm-status-error disabled:opacity-30"
                      aria-label={`Remove line item ${index + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-right text-sm font-medium text-sm-text-secondary">
                  Line total: {formatCents(item.quantity * item.unit_amount)}
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={addLineItem}
            className="mt-3 border-sm-border-default text-sm-text-secondary hover:text-sm-text-primary"
          >
            <Plus className="w-4 h-4" />
            Add Line Item
          </Button>

          <div className="mt-4 pt-4 border-t border-sm-border-default flex justify-end">
            <div className="text-right">
              <div className="text-sm text-sm-text-secondary">Subtotal</div>
              <div className="text-xl font-semibold text-sm-text-primary">{formatCents(subtotal)}</div>
            </div>
          </div>
        </div>

        {/* Payment Terms & Notes */}
        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-6">
          <h2 className="text-base font-semibold text-sm-text-primary mb-4">Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="payment-terms" className="block text-xs font-medium text-sm-text-secondary mb-1">Payment Terms</label>
              <select
                id="payment-terms"
                value={paymentTerms}
                onChange={e => setPaymentTerms(e.target.value)}
                className="w-full h-9 rounded-md border border-sm-border-default bg-sm-surface-primary px-3 text-sm text-sm-text-primary focus:outline-none focus:ring-2 focus:ring-sm-accent-primary/50"
              >
                <option value="due_on_receipt">Due on Receipt</option>
                <option value="net_15">Net 15</option>
                <option value="net_30">Net 30</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="invoice-notes" className="block text-xs font-medium text-sm-text-secondary mb-1">Notes</label>
            <Textarea
              id="invoice-notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any additional notes for the client..."
              rows={3}
              className="bg-sm-surface-primary border-sm-border-default text-sm-text-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={saving || sending}
            className="border-sm-border-default text-sm-text-secondary hover:text-sm-text-primary"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save as Draft'}
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={saving || sending}
            className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white"
          >
            <Send className="w-4 h-4" />
            {sending ? 'Sending...' : 'Save & Send'}
          </Button>
        </div>
      </div>
    </div>
  );
}
