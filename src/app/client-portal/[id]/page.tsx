import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { formatCents } from '@/lib/invoice-helpers';
import ClientPortalView from './client-portal-view';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string }>;
};

export const dynamic = 'force-dynamic';

export default async function ClientPortalPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { payment } = await searchParams;

  if (!supabaseAdmin) {
    notFound();
  }

  // Fetch invoice
  const { data: invoice, error } = await supabaseAdmin
    .from('sm_invoices')
    .select(`
      *,
      client:sm_clients(id, name, email, company, phone, address_line1, address_line2, city, state, zip),
      items:sm_invoice_items(*)
    `)
    .eq('id', id)
    .single();

  if (error || !invoice) {
    notFound();
  }

  // Don't show draft invoices in client portal
  if (invoice.status === 'draft') {
    notFound();
  }

  // Sort items
  const items = (invoice.items as Array<{
    id: string;
    description: string;
    quantity: number;
    unit_amount: number;
    total: number;
    sort_order: number;
  }>).sort((a, b) => a.sort_order - b.sort_order);

  // Track first view
  if (!invoice.viewed_at && invoice.status === 'sent') {
    await supabaseAdmin
      .from('sm_invoices')
      .update({
        viewed_at: new Date().toISOString(),
        status: 'viewed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
  }

  // If Stripe payment just completed, check status
  const isPaid = invoice.status === 'paid' || payment === 'success';

  const client = invoice.client as {
    name: string;
    email: string;
    company: string | null;
    address_line1: string | null;
    address_line2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
  };

  const formattedItems = items.map(item => ({
    id: item.id,
    description: item.description,
    quantity: item.quantity,
    unitAmount: formatCents(item.unit_amount),
    total: formatCents(item.total),
  }));

  const dueDateFormatted = invoice.due_date
    ? new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const createdDateFormatted = new Date(invoice.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const paidDateFormatted = invoice.paid_at
    ? new Date(invoice.paid_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const paymentTermsLabel = (() => {
    switch (invoice.payment_terms) {
      case 'net_15': return 'Net 15';
      case 'net_30': return 'Net 30';
      default: return 'Due on Receipt';
    }
  })();

  return (
    <ClientPortalView
      invoiceId={id}
      invoiceNumber={invoice.invoice_number}
      status={isPaid ? 'paid' : invoice.status}
      createdDate={createdDateFormatted}
      dueDate={dueDateFormatted}
      paymentTerms={paymentTermsLabel}
      clientName={client.name}
      clientCompany={client.company}
      clientAddress={{
        line1: client.address_line1,
        line2: client.address_line2,
        city: client.city,
        state: client.state,
      }}
      items={formattedItems}
      subtotal={formatCents(invoice.subtotal)}
      taxAmount={invoice.tax_amount > 0 ? formatCents(invoice.tax_amount) : null}
      total={formatCents(invoice.total)}
      notes={invoice.notes}
      paidDate={paidDateFormatted}
      paymentSuccess={payment === 'success'}
    />
  );
}
