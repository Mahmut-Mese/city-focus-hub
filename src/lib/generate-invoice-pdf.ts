import { jsPDF } from 'jspdf';
import type { MemberInvoice } from './member-api';
import { defaultSiteSettingsContent } from '@/data/siteContent';

function formatCurrency(amountMinor: number, currency = 'gbp') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(Number(amountMinor || 0) / 100);
}

function formatDate(isoDate: string | null) {
  if (!isoDate) return '—';
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function downloadInvoicePdf(invoice: MemberInvoice, memberName = '') {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 20;
  const marginRight = 20;
  const contentWidth = pageWidth - marginLeft - marginRight;
  let y = 20;

  const siteName = defaultSiteSettingsContent.siteName || 'CoworkingHub';
  const siteAddress = defaultSiteSettingsContent.address || '';
  const siteEmail = defaultSiteSettingsContent.contactEmail || '';
  const sitePhone = defaultSiteSettingsContent.contactPhone || '';

  // Header: company name
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(siteName, marginLeft, y);
  y += 8;

  // Company details
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  if (siteAddress) {
    doc.text(siteAddress, marginLeft, y);
    y += 4.5;
  }
  if (siteEmail) {
    doc.text(siteEmail, marginLeft, y);
    y += 4.5;
  }
  if (sitePhone) {
    doc.text(sitePhone, marginLeft, y);
    y += 4.5;
  }

  // Invoice title on the right
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', pageWidth - marginRight, 24, { align: 'right' });

  y += 6;

  // Divider
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.4);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 10;

  // Invoice meta (left column)
  const metaLabelX = marginLeft;
  const metaValueX = marginLeft + 35;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(120, 120, 120);
  doc.text('Invoice No.', metaLabelX, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(invoice.invoiceNumber || `INV-${invoice.id}`, metaValueX, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(120, 120, 120);
  doc.text('Date', metaLabelX, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(formatDate(invoice.paidAt || invoice.createdAt), metaValueX, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(120, 120, 120);
  doc.text('Status', metaLabelX, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1), metaValueX, y);
  y += 6;

  if (memberName) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(120, 120, 120);
    doc.text('Billed to', metaLabelX, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(memberName, metaValueX, y);
    y += 6;
  }

  y += 8;

  // Table header
  const colX = {
    desc: marginLeft,
    amount: pageWidth - marginRight,
  };

  doc.setFillColor(245, 245, 242);
  doc.roundedRect(marginLeft, y - 4, contentWidth, 10, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 100, 100);
  doc.text('DESCRIPTION', colX.desc + 4, y + 2);
  doc.text('AMOUNT', colX.amount - 4, y + 2, { align: 'right' });
  y += 12;

  // Table row
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(invoice.description || 'Booking', colX.desc + 4, y);
  doc.text(formatCurrency(invoice.totalMinor, invoice.currency), colX.amount - 4, y, { align: 'right' });
  y += 10;

  // Divider
  doc.setDrawColor(230, 230, 230);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 8;

  // Subtotal / Tax / Total
  const summaryLabelX = pageWidth - marginRight - 60;
  const summaryValueX = pageWidth - marginRight - 4;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Subtotal', summaryLabelX, y);
  doc.setTextColor(0, 0, 0);
  doc.text(formatCurrency(invoice.subtotalMinor, invoice.currency), summaryValueX, y, { align: 'right' });
  y += 6;

  doc.setTextColor(100, 100, 100);
  doc.text('VAT', summaryLabelX, y);
  doc.setTextColor(0, 0, 0);
  doc.text(formatCurrency(invoice.taxMinor, invoice.currency), summaryValueX, y, { align: 'right' });
  y += 8;

  // Total row with background
  doc.setFillColor(16, 21, 63);
  doc.roundedRect(summaryLabelX - 6, y - 5, contentWidth - (summaryLabelX - marginLeft) + 6, 12, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL', summaryLabelX, y + 2);
  doc.text(formatCurrency(invoice.totalMinor, invoice.currency), summaryValueX, y + 2, { align: 'right' });
  y += 20;

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(160, 160, 160);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-GB')}`, marginLeft, y);

  if (invoice.stripePaymentIntentId) {
    doc.text(`Payment ref: ${invoice.stripePaymentIntentId}`, marginLeft, y + 4.5);
  }

  // Save
  const filename = `${(invoice.invoiceNumber || `INV-${invoice.id}`).replace(/[^a-zA-Z0-9-]/g, '_')}.pdf`;
  doc.save(filename);
}
