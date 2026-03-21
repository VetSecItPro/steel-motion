import { supabaseAdmin } from '@/lib/supabase';

/**
 * Generate the next invoice number in the format SM-YYYY-NNN
 * Auto-increments per year.
 */
export async function generateInvoiceNumber(): Promise<string> {
  if (!supabaseAdmin) {
    throw new Error('Supabase is not configured');
  }

  const year = new Date().getFullYear();
  const prefix = `SM-${year}-`;

  const { data, error } = await supabaseAdmin
    .from('sm_invoices')
    .select('invoice_number')
    .like('invoice_number', `${prefix}%`)
    .order('invoice_number', { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(`Failed to generate invoice number: ${error.message}`);
  }

  let nextNumber = 1;
  if (data && data.length > 0) {
    const lastNumber = data[0].invoice_number;
    const lastSeq = parseInt(lastNumber.replace(prefix, ''), 10);
    if (!isNaN(lastSeq)) {
      nextNumber = lastSeq + 1;
    }
  }

  return `${prefix}${String(nextNumber).padStart(3, '0')}`;
}

/**
 * Format cents to dollar string
 */
export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

/**
 * Calculate due date based on payment terms
 */
export function calculateDueDate(paymentTerms: string): string {
  const now = new Date();
  switch (paymentTerms) {
    case 'net_15':
      now.setDate(now.getDate() + 15);
      break;
    case 'net_30':
      now.setDate(now.getDate() + 30);
      break;
    case 'due_on_receipt':
    default:
      break;
  }
  return now.toISOString().split('T')[0];
}

/**
 * Check if an invoice is overdue
 */
export function isOverdue(dueDate: string | null, status: string): boolean {
  if (!dueDate || status === 'paid' || status === 'cancelled' || status === 'draft') {
    return false;
  }
  return new Date(dueDate) < new Date();
}
