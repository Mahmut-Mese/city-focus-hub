import { randomUUID } from 'node:crypto';
import { execute, queryAll, queryOne } from './sql.js';

function toInvoice(row) {
  if (!row) {
    return null;
  }

  return {
    id: Number(row.id),
    stripeInvoiceId: row.stripe_invoice_id || null,
    stripePaymentIntentId: row.stripe_payment_intent_id || null,
    invoiceNumber: row.invoice_number || null,
    status: row.status,
    description: row.description || '',
    currency: row.currency || 'gbp',
    subtotalMinor: Number(row.subtotal_minor || 0),
    taxMinor: Number(row.tax_minor || 0),
    totalMinor: Number(row.total_minor || 0),
    hostedInvoiceUrl: row.hosted_invoice_url || null,
    invoicePdf: row.invoice_pdf || null,
    paidAt: row.paid_at || null,
    createdAt: row.created_at || null,
  };
}

export async function listUserInvoices(userId) {
  const rows = await queryAll(
    'SELECT * FROM invoices WHERE user_id = :userId ORDER BY COALESCE(paid_at, created_at) DESC, id DESC',
    { userId },
  );

  return rows.map(toInvoice);
}

export async function createLocalInvoice({
  userId,
  membershipId = null,
  bookingId = null,
  stripeInvoiceId = null,
  stripePaymentIntentId = null,
  invoiceNumber = null,
  status = 'paid',
  description = '',
  currency = 'gbp',
  subtotalMinor = 0,
  taxMinor = 0,
  totalMinor = 0,
  hostedInvoiceUrl = null,
  invoicePdf = null,
  paidAt = null,
}) {
  const now = new Date();
  await execute(
    `INSERT INTO invoices
      (document_id, user_id, membership_id, booking_id, stripe_invoice_id, stripe_payment_intent_id, invoice_number, status, description, currency, subtotal_minor, tax_minor, total_minor, hosted_invoice_url, invoice_pdf, paid_at, created_at, updated_at)
     VALUES
      (:documentId, :userId, :membershipId, :bookingId, :stripeInvoiceId, :stripePaymentIntentId, :invoiceNumber, :status, :description, :currency, :subtotalMinor, :taxMinor, :totalMinor, :hostedInvoiceUrl, :invoicePdf, :paidAt, :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      userId,
      membershipId,
      bookingId,
      stripeInvoiceId,
      stripePaymentIntentId,
      invoiceNumber,
      status,
      description,
      currency,
      subtotalMinor,
      taxMinor,
      totalMinor,
      hostedInvoiceUrl,
      invoicePdf,
      paidAt,
      createdAt: now,
      updatedAt: now,
    },
  );
}

export async function upsertStripeInvoice({
  userId,
  membershipId = null,
  bookingId = null,
  stripeInvoiceId,
  stripePaymentIntentId = null,
  invoiceNumber = null,
  status = 'open',
  description = '',
  currency = 'gbp',
  subtotalMinor = 0,
  taxMinor = 0,
  totalMinor = 0,
  hostedInvoiceUrl = null,
  invoicePdf = null,
  paidAt = null,
}) {
  const existingInvoice = stripeInvoiceId
    ? await queryOne('SELECT id FROM invoices WHERE stripe_invoice_id = :stripeInvoiceId LIMIT 1', { stripeInvoiceId })
    : null;

  const now = new Date();

  if (existingInvoice) {
    await execute(
      `UPDATE invoices
          SET user_id = :userId,
              membership_id = :membershipId,
              booking_id = :bookingId,
              stripe_payment_intent_id = :stripePaymentIntentId,
              invoice_number = :invoiceNumber,
              status = :status,
              description = :description,
              currency = :currency,
              subtotal_minor = :subtotalMinor,
              tax_minor = :taxMinor,
              total_minor = :totalMinor,
              hosted_invoice_url = :hostedInvoiceUrl,
              invoice_pdf = :invoicePdf,
              paid_at = :paidAt,
              updated_at = :updatedAt
        WHERE id = :invoiceId`,
      {
        invoiceId: existingInvoice.id,
        userId,
        membershipId,
        bookingId,
        stripePaymentIntentId,
        invoiceNumber,
        status,
        description,
        currency,
        subtotalMinor,
        taxMinor,
        totalMinor,
        hostedInvoiceUrl,
        invoicePdf,
        paidAt,
        updatedAt: now,
      },
    );
    return;
  }

  await createLocalInvoice({
    userId,
    membershipId,
    bookingId,
    stripeInvoiceId,
    stripePaymentIntentId,
    invoiceNumber,
    status,
    description,
    currency,
    subtotalMinor,
    taxMinor,
    totalMinor,
    hostedInvoiceUrl,
    invoicePdf,
    paidAt,
  });
}
