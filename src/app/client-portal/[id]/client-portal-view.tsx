'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle2, CreditCard, Clock, FileText } from 'lucide-react';

type Props = {
  invoiceId: string;
  invoiceNumber: string;
  status: string;
  createdDate: string;
  dueDate: string | null;
  paymentTerms: string;
  clientName: string;
  clientCompany: string | null;
  clientAddress: {
    line1: string | null;
    line2: string | null;
    city: string | null;
    state: string | null;
  };
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    unitAmount: string;
    total: string;
  }>;
  subtotal: string;
  taxAmount: string | null;
  total: string;
  notes: string | null;
  paidDate: string | null;
  paymentSuccess: boolean;
};

export default function ClientPortalView({
  invoiceId,
  invoiceNumber,
  status,
  createdDate,
  dueDate,
  paymentTerms,
  clientName,
  clientCompany,
  clientAddress,
  items,
  subtotal,
  taxAmount,
  total,
  notes,
  paidDate,
  paymentSuccess,
}: Props) {
  const [paying, setPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  async function handlePay() {
    setPaying(true);
    setPaymentError(null);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/checkout`, {
        method: 'POST',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
          return;
        }
      }
      setPaymentError('Unable to initiate payment. Please try again.');
    } catch {
      setPaymentError('Something went wrong. Please try again.');
    } finally {
      setPaying(false);
    }
  }

  const isPaid = status === 'paid';
  const isCancelled = status === 'cancelled';

  return (
    <div className="min-h-screen bg-sm-surface-primary">
      {/* Header bar */}
      <header className="bg-sm-surface-inverse">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/steel-motion-hero-logo.svg"
              alt="Steel Motion LLC"
              width={40}
              height={40}
              sizes="160px"
              className="rounded"
            />
            <div>
              <h1 className="text-lg font-semibold text-sm-text-inverse">Steel Motion LLC</h1>
              <p className="text-xs text-sm-text-inverse-muted">AI Automation & Custom Software</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-sm-text-inverse-muted" />
            <span className="text-sm font-medium text-sm-text-inverse">{invoiceNumber}</span>
          </div>
        </div>
      </header>

      {/* Payment success banner */}
      {paymentSuccess && (
        <div className="bg-sm-status-success-light border-b border-sm-status-success/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-sm-status-success flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-sm-status-success">Payment received</p>
              <p className="text-xs text-sm-status-success/80">Thank you for your payment. A receipt has been sent to your email.</p>
            </div>
          </div>
        </div>
      )}

      {/* Cancelled banner */}
      {isCancelled && (
        <div className="bg-sm-surface-secondary border-b border-sm-border-default">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-sm-text-muted/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-sm-text-muted font-bold">X</span>
            </div>
            <p className="text-sm text-sm-text-muted">This invoice has been cancelled.</p>
          </div>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12" id="main-content">
        {/* Invoice meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xs font-semibold text-sm-text-muted uppercase tracking-wider mb-2">Bill To</h2>
            <div className="text-sm text-sm-text-primary space-y-0.5">
              <p className="font-medium text-base">{clientName}</p>
              {clientCompany && <p className="text-sm-text-secondary">{clientCompany}</p>}
              {clientAddress.line1 && (
                <div className="text-sm-text-secondary mt-1">
                  <p>{clientAddress.line1}</p>
                  {clientAddress.line2 && <p>{clientAddress.line2}</p>}
                  {(clientAddress.city || clientAddress.state) && (
                    <p>{[clientAddress.city, clientAddress.state].filter(Boolean).join(', ')}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="sm:text-right">
            <div className="space-y-2">
              <div>
                <span className="text-xs text-sm-text-muted block">Invoice Date</span>
                <span className="text-sm text-sm-text-primary">{createdDate}</span>
              </div>
              <div>
                <span className="text-xs text-sm-text-muted block">Payment Terms</span>
                <span className="text-sm text-sm-text-primary">{paymentTerms}</span>
              </div>
              {dueDate && (
                <div>
                  <span className="text-xs text-sm-text-muted block">Due Date</span>
                  <span className="text-sm text-sm-text-primary font-medium">{dueDate}</span>
                </div>
              )}
              <div>
                <span className="text-xs text-sm-text-muted block">Status</span>
                <StatusIndicator status={status} />
              </div>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sm-border-default bg-sm-surface-secondary/50">
                <th className="text-left text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-5 py-3.5">Description</th>
                <th className="text-center text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3.5 hidden sm:table-cell">Qty</th>
                <th className="text-right text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-4 py-3.5 hidden sm:table-cell">Rate</th>
                <th className="text-right text-xs font-semibold text-sm-text-secondary uppercase tracking-wider px-5 py-3.5">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sm-border-default">
              {items.map(item => (
                <tr key={item.id}>
                  <td className="px-5 py-4">
                    <p className="text-sm text-sm-text-primary">{item.description}</p>
                    <p className="text-xs text-sm-text-muted sm:hidden mt-0.5">
                      {item.quantity} x {item.unitAmount}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-sm text-sm-text-secondary text-center hidden sm:table-cell">{item.quantity}</td>
                  <td className="px-4 py-4 text-sm text-sm-text-secondary text-right hidden sm:table-cell">{item.unitAmount}</td>
                  <td className="px-5 py-4 text-sm font-medium text-sm-text-primary text-right">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="border-t border-sm-border-default bg-sm-surface-secondary/30 px-5 py-4">
            <div className="flex justify-end">
              <div className="w-full max-w-[240px] space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-sm-text-secondary">Subtotal</span>
                  <span className="text-sm-text-primary">{subtotal}</span>
                </div>
                {taxAmount && (
                  <div className="flex justify-between text-sm">
                    <span className="text-sm-text-secondary">Tax</span>
                    <span className="text-sm-text-primary">{taxAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-sm-border-default">
                  <span className="text-sm-text-primary">Total</span>
                  <span className="text-sm-accent-primary">{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-5 mb-8">
            <h3 className="text-xs font-semibold text-sm-text-muted uppercase tracking-wider mb-2">Notes</h3>
            <p className="text-sm text-sm-text-secondary whitespace-pre-wrap leading-relaxed">{notes}</p>
          </div>
        )}

        {/* Payment section */}
        {!isPaid && !isCancelled && (
          <div className="bg-sm-surface-elevated border-2 border-sm-accent-primary/20 rounded-xl p-6 sm:p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-sm-accent-primary-light mx-auto flex items-center justify-center mb-4">
              <CreditCard className="w-7 h-7 text-sm-accent-primary" />
            </div>
            <h3 className="text-lg font-semibold text-sm-text-primary mb-1">
              Amount Due: {total}
            </h3>
            {dueDate && (
              <p className="text-sm text-sm-text-secondary mb-6 flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4" />
                Due by {dueDate}
              </p>
            )}
            <Button
              onClick={handlePay}
              disabled={paying}
              className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white px-10 py-3 text-base h-auto"
              size="lg"
            >
              {paying ? 'Redirecting...' : 'Pay Now'}
            </Button>
            <p className="text-xs text-sm-text-muted mt-4">
              Secure payment powered by Stripe
            </p>
            {paymentError && (
              <div className="mt-4 bg-sm-status-error/10 border border-sm-status-error/20 rounded-lg px-4 py-3 text-sm text-sm-status-error">
                {paymentError}
              </div>
            )}
          </div>
        )}

        {/* Paid confirmation */}
        {isPaid && (
          <div className="bg-sm-status-success-light border border-sm-status-success/20 rounded-xl p-6 sm:p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-sm-status-success/10 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-sm-status-success" />
            </div>
            <h3 className="text-lg font-semibold text-sm-status-success mb-1">
              Payment Received
            </h3>
            <p className="text-sm text-sm-status-success/80">
              {paidDate ? `Paid on ${paidDate}` : 'Thank you for your payment.'}
            </p>
            <p className="text-sm text-sm-text-secondary mt-2">
              Amount paid: {total}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-sm-border-default bg-sm-surface-elevated mt-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/steel-motion-hero-logo.svg"
              alt="Steel Motion LLC"
              width={24}
              height={24}
              sizes="24px"
              className="rounded opacity-60"
            />
            <span className="text-xs text-sm-text-muted">Steel Motion LLC</span>
          </div>
          <div className="text-xs text-sm-text-muted text-center sm:text-right">
            <a href="mailto:contact@steelmotionllc.com" className="hover:text-sm-accent-primary transition-colors">
              contact@steelmotionllc.com
            </a>
            <span className="mx-2">&bull;</span>
            <a href="https://steelmotionllc.com" className="hover:text-sm-accent-primary transition-colors">
              steelmotionllc.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  const config: Record<string, { color: string; label: string }> = {
    sent: { color: 'bg-sm-status-info', label: 'Sent' },
    viewed: { color: 'bg-sm-status-warning', label: 'Viewed' },
    paid: { color: 'bg-sm-status-success', label: 'Paid' },
    overdue: { color: 'bg-sm-status-error', label: 'Overdue' },
    cancelled: { color: 'bg-sm-text-muted', label: 'Cancelled' },
  };

  const { color, label } = config[status] || { color: 'bg-sm-text-muted', label: status };

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-sm text-sm-text-primary font-medium">{label}</span>
    </span>
  );
}
