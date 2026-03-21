'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, ExternalLink, Trash2, Copy, Check } from 'lucide-react';

type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unit_amount: number;
  total: number;
  sort_order: number;
};

type InvoiceDetail = {
  id: string;
  invoice_number: string;
  status: string;
  subtotal: number;
  tax_amount: number;
  total: number;
  currency: string;
  due_date: string | null;
  payment_terms: string | null;
  notes: string | null;
  sent_at: string | null;
  paid_at: string | null;
  viewed_at: string | null;
  created_at: string;
  client: {
    id: string;
    name: string;
    email: string;
    company: string | null;
    phone: string | null;
    address_line1: string | null;
    address_line2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
  } | null;
  items: InvoiceItem[];
};

function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function getPaymentTermsLabel(terms: string | null): string {
  switch (terms) {
    case 'net_15': return 'Net 15';
    case 'net_30': return 'Net 30';
    case 'due_on_receipt':
    default: return 'Due on Receipt';
  }
}

function getStatusBadge(status: string, dueDate: string | null) {
  const isOverdue = dueDate && new Date(dueDate) < new Date() && status !== 'paid' && status !== 'cancelled' && status !== 'draft';

  if (isOverdue) {
    return <Badge className="bg-sm-status-error/10 text-sm-status-error border-sm-status-error/20 hover:bg-sm-status-error/10">Overdue</Badge>;
  }

  const styles: Record<string, string> = {
    draft: 'bg-sm-text-muted/10 text-sm-text-muted border-sm-text-muted/20 hover:bg-sm-text-muted/10',
    sent: 'bg-sm-status-info/10 text-sm-status-info border-sm-status-info/20 hover:bg-sm-status-info/10',
    viewed: 'bg-sm-status-warning/10 text-sm-status-warning border-sm-status-warning/20 hover:bg-sm-status-warning/10',
    paid: 'bg-sm-status-success/10 text-sm-status-success border-sm-status-success/20 hover:bg-sm-status-success/10',
    cancelled: 'bg-sm-text-muted/10 text-sm-text-muted border-sm-text-muted/20 hover:bg-sm-text-muted/10',
  };

  return (
    <Badge className={styles[status] || styles.draft}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchInvoice = useCallback(async () => {
    try {
      const res = await fetch(`/api/invoices/${id}`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setInvoice(data.invoice);
      }
    } catch (err) {
      console.error('Failed to fetch invoice:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  async function handleSend() {
    if (!confirm('Send this invoice to the client?')) return;
    try {
      const res = await fetch(`/api/invoices/${id}/send`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        fetchInvoice();
      } else {
        alert('Failed to send invoice');
      }
    } catch {
      alert('Something went wrong');
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this invoice? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/invoices/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        router.push('/admin/invoices');
      }
    } catch {
      alert('Something went wrong');
    }
  }

  async function handleCancel() {
    if (!confirm('Cancel this invoice?')) return;
    try {
      const res = await fetch(`/api/invoices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'cancelled' }),
      });
      if (res.ok) {
        fetchInvoice();
      }
    } catch {
      alert('Something went wrong');
    }
  }

  function copyPortalLink() {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/client-portal/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return <div className="p-12 text-center text-sm-text-muted">Loading...</div>;
  }

  if (!invoice) {
    return <div className="p-12 text-center text-sm-text-secondary">Invoice not found</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/admin/invoices')}
            className="text-sm-text-secondary hover:text-sm-text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-sm-text-primary">{invoice.invoice_number}</h1>
              {getStatusBadge(invoice.status, invoice.due_date)}
            </div>
            <p className="text-sm text-sm-text-secondary mt-0.5">
              Created {formatDate(invoice.created_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={copyPortalLink}
            className="border-sm-border-default text-sm-text-secondary hover:text-sm-text-primary"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          <Link href={`/client-portal/${id}`} target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="border-sm-border-default text-sm-text-secondary hover:text-sm-text-primary"
            >
              <ExternalLink className="w-4 h-4" />
              View Portal
            </Button>
          </Link>
          {invoice.status === 'draft' && (
            <Button
              size="sm"
              onClick={handleSend}
              className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white"
            >
              <Send className="w-4 h-4" />
              Send Invoice
            </Button>
          )}
          {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="border-sm-status-error/30 text-sm-status-error hover:bg-sm-status-error-light"
            >
              Cancel Invoice
            </Button>
          )}
          {(invoice.status === 'draft' || invoice.status === 'cancelled') && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-9 w-9 text-sm-status-error hover:text-sm-status-error"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client info */}
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-6">
            <h2 className="text-sm font-semibold text-sm-text-secondary uppercase tracking-wider mb-3">Bill To</h2>
            {invoice.client && (
              <div className="text-sm text-sm-text-primary space-y-0.5">
                <p className="font-medium">{invoice.client.name}</p>
                {invoice.client.company && <p className="text-sm-text-secondary">{invoice.client.company}</p>}
                <p className="text-sm-text-secondary">{invoice.client.email}</p>
                {invoice.client.phone && <p className="text-sm-text-secondary">{invoice.client.phone}</p>}
                {invoice.client.address_line1 && (
                  <div className="mt-2 text-sm-text-secondary">
                    <p>{invoice.client.address_line1}</p>
                    {invoice.client.address_line2 && <p>{invoice.client.address_line2}</p>}
                    <p>
                      {[invoice.client.city, invoice.client.state, invoice.client.zip].filter(Boolean).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Line items */}
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sm-border-default bg-sm-surface-secondary/50">
                  <th className="text-left text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-6 py-3">Description</th>
                  <th className="text-center text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3">Qty</th>
                  <th className="text-right text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3">Rate</th>
                  <th className="text-right text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-6 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sm-border-default">
                {invoice.items.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 text-sm text-sm-text-primary">{item.description}</td>
                    <td className="px-4 py-4 text-sm text-sm-text-secondary text-center">{item.quantity}</td>
                    <td className="px-4 py-4 text-sm text-sm-text-secondary text-right">{formatCents(item.unit_amount)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-sm-text-primary text-right">{formatCents(item.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-sm-border-default bg-sm-surface-secondary/30">
                  <td colSpan={3} className="px-6 py-3 text-sm font-medium text-sm-text-secondary text-right">Subtotal</td>
                  <td className="px-6 py-3 text-sm font-medium text-sm-text-primary text-right">{formatCents(invoice.subtotal)}</td>
                </tr>
                {invoice.tax_amount > 0 && (
                  <tr className="bg-sm-surface-secondary/30">
                    <td colSpan={3} className="px-6 py-3 text-sm font-medium text-sm-text-secondary text-right">Tax</td>
                    <td className="px-6 py-3 text-sm font-medium text-sm-text-primary text-right">{formatCents(invoice.tax_amount)}</td>
                  </tr>
                )}
                <tr className="bg-sm-surface-secondary/50">
                  <td colSpan={3} className="px-6 py-4 text-base font-semibold text-sm-text-primary text-right">Total</td>
                  <td className="px-6 py-4 text-base font-semibold text-sm-accent-primary text-right">{formatCents(invoice.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-6">
              <h2 className="text-sm font-semibold text-sm-text-secondary uppercase tracking-wider mb-2">Notes</h2>
              <p className="text-sm text-sm-text-primary whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-6">
            <h2 className="text-sm font-semibold text-sm-text-secondary uppercase tracking-wider mb-4">Summary</h2>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-sm-text-secondary">Amount</dt>
                <dd className="text-sm font-semibold text-sm-text-primary">{formatCents(invoice.total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-sm-text-secondary">Payment Terms</dt>
                <dd className="text-sm text-sm-text-primary">{getPaymentTermsLabel(invoice.payment_terms)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-sm-text-secondary">Due Date</dt>
                <dd className="text-sm text-sm-text-primary">{formatDate(invoice.due_date)}</dd>
              </div>
            </dl>
          </div>

          {/* Activity */}
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-6">
            <h2 className="text-sm font-semibold text-sm-text-secondary uppercase tracking-wider mb-4">Activity</h2>
            <div className="space-y-3">
              <ActivityItem label="Created" date={invoice.created_at} />
              <ActivityItem label="Sent" date={invoice.sent_at} />
              <ActivityItem label="Viewed by Client" date={invoice.viewed_at} />
              <ActivityItem label="Paid" date={invoice.paid_at} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ label, date }: { label: string; date: string | null }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${date ? 'bg-sm-status-success' : 'bg-sm-border-default'}`} />
      <div className="flex-1">
        <p className={`text-sm ${date ? 'text-sm-text-primary' : 'text-sm-text-muted'}`}>{label}</p>
        {date && (
          <p className="text-xs text-sm-text-muted">
            {new Date(date).toLocaleString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric',
              hour: 'numeric', minute: '2-digit',
            })}
          </p>
        )}
      </div>
    </div>
  );
}
