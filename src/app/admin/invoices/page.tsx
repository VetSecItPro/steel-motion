'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Send, Trash2, ExternalLink } from 'lucide-react';

type Invoice = {
  id: string;
  invoice_number: string;
  status: string;
  total: number;
  due_date: string | null;
  created_at: string;
  sent_at: string | null;
  paid_at: string | null;
  viewed_at: string | null;
  client: {
    id: string;
    name: string;
    email: string;
    company: string | null;
  } | null;
};

function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
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

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = useCallback(async () => {
    try {
      const res = await fetch('/api/invoices', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setInvoices(data.invoices || []);
      }
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  async function handleSend(id: string) {
    if (!confirm('Send this invoice to the client?')) return;
    try {
      const res = await fetch(`/api/invoices/${id}/send`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        fetchInvoices();
      }
    } catch (err) {
      console.error('Failed to send invoice:', err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this invoice? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/invoices/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        fetchInvoices();
      }
    } catch (err) {
      console.error('Failed to delete invoice:', err);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-sm-text-primary">Invoices</h1>
          <p className="text-sm text-sm-text-secondary mt-1">
            Manage and track client invoices
          </p>
        </div>
        <Link href="/admin/invoices/new">
          <Button className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white">
            <Plus className="w-4 h-4" />
            Create Invoice
          </Button>
        </Link>
      </div>

      <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm-text-muted">Loading invoices...</div>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center">
            <FileTextIcon />
            <p className="text-sm-text-secondary mt-2">No invoices yet</p>
            <Link href="/admin/invoices/new">
              <Button className="mt-4 bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white" size="sm">
                Create Your First Invoice
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sm-border-default bg-sm-surface-secondary/50">
                  <th className="text-left text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3">Invoice</th>
                  <th className="text-left text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3">Client</th>
                  <th className="text-left text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3">Date</th>
                  <th className="text-left text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3">Due</th>
                  <th className="text-right text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sm-border-default">
                {invoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-sm-surface-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/admin/invoices/${invoice.id}`} className="text-sm font-medium text-sm-accent-primary hover:text-sm-accent-primary-hover">
                        {invoice.invoice_number}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-sm-text-primary">{invoice.client?.name || 'Unknown'}</div>
                      <div className="text-xs text-sm-text-muted">{invoice.client?.company || invoice.client?.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-sm-text-primary">{formatCents(invoice.total)}</span>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(invoice.status, invoice.due_date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-sm-text-secondary">
                      {formatDate(invoice.created_at)}
                    </td>
                    <td className="px-4 py-3 text-sm text-sm-text-secondary">
                      {formatDate(invoice.due_date)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/invoices/${invoice.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-sm-text-secondary hover:text-sm-text-primary">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                          <Link href={`/client-portal/${invoice.id}`} target="_blank">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-sm-text-secondary hover:text-sm-text-primary">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </Link>
                        )}
                        {invoice.status === 'draft' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-sm-status-info hover:text-sm-status-info"
                            onClick={() => handleSend(invoice.id)}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
                        {(invoice.status === 'draft' || invoice.status === 'cancelled') && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-sm-status-error hover:text-sm-status-error"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function FileTextIcon() {
  return (
    <div className="w-12 h-12 rounded-full bg-sm-surface-secondary mx-auto flex items-center justify-center">
      <svg className="w-6 h-6 text-sm-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    </div>
  );
}
