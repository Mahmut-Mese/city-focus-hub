import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let transporterPromise = null;
const SIGNATURE_NAME = process.env.SIGNATURE_NAME || 'Aras AKPINAR';
const SIGNATURE_TITLE = process.env.SIGNATURE_TITLE || 'General Manager';
const SIGNATURE_COMPANY = process.env.SIGNATURE_COMPANY || 'The Leadenhall Works';
const SIGNATURE_ADDRESS = process.env.SIGNATURE_ADDRESS || 'Leadenhall Market, City of London';
const SIGNATURE_EMAIL = process.env.SIGNATURE_EMAIL || 'email@theleadenhallworks.co.uk';
const SIGNATURE_WEBSITE = process.env.SIGNATURE_WEBSITE || 'www.theleadenhallworks.co.uk';
const SIGNATURE_WEBSITE_URL = process.env.SIGNATURE_WEBSITE_URL || 'https://www.theleadenhallworks.co.uk';
const SIGNATURE_LOGO_PATH = path.join(__dirname, '..', 'public', 'logo-email.png');
const SIGNATURE_LOGO_CID = 'leadenhall-works-signature-logo';

function createTransport() {
  if (!config.mail.enabled) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: config.mail.user && config.mail.password
      ? {
          user: config.mail.user,
          pass: config.mail.password,
        }
      : undefined,
  });
}

async function getTransporter() {
  if (!config.mail.enabled) {
    return null;
  }

  if (!transporterPromise) {
    transporterPromise = Promise.resolve(createTransport());
  }

  return transporterPromise;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function withTimeout(promise, timeoutMs = 15000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email send timed out.')), timeoutMs);
    }),
  ]);
}

function buildEmailSignature() {
  return {
    text: [
      SIGNATURE_NAME,
      SIGNATURE_TITLE,
      SIGNATURE_COMPANY,
      SIGNATURE_ADDRESS,
      SIGNATURE_EMAIL,
      SIGNATURE_WEBSITE,
    ].join('\n'),
    html: `
      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <img
          src="cid:${SIGNATURE_LOGO_CID}"
          alt="${escapeHtml(SIGNATURE_COMPANY)}"
          style="display:block; width: 260px; max-width: 100%; height: auto; margin-bottom: 16px;"
        />
        <div style="font-family: Arial, sans-serif; color: #111;">
          <div style="font-size: 18px; line-height: 1.3; font-weight: 700;">${escapeHtml(SIGNATURE_NAME)}</div>
          <div style="margin-top: 4px; font-size: 15px; line-height: 1.5;">${escapeHtml(SIGNATURE_TITLE)}</div>
          <div style="font-size: 15px; line-height: 1.5; font-weight: 700;">${escapeHtml(SIGNATURE_COMPANY)}</div>
          <div style="margin-top: 14px; font-size: 14px; line-height: 1.7;">
            <div>${escapeHtml(SIGNATURE_ADDRESS)}</div>
            <div><a href="mailto:${escapeHtml(SIGNATURE_EMAIL)}" style="color:#111; text-decoration:none;">${escapeHtml(SIGNATURE_EMAIL)}</a></div>
            <div><a href="${escapeHtml(SIGNATURE_WEBSITE_URL)}" style="color:#111; text-decoration:none;">${escapeHtml(SIGNATURE_WEBSITE)}</a></div>
          </div>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: 'the-leadenhall-works-signature.png',
        path: SIGNATURE_LOGO_PATH,
        cid: SIGNATURE_LOGO_CID,
      },
    ],
  };
}

export async function sendContactSubmissionEmail(submission) {
  const transporter = await getTransporter();

  if (!transporter) {
    return {
      ok: false,
      reason: 'Email notifications are not configured. Set SMTP_HOST and related mail settings in adminjs/.env.',
    };
  }

  const subject = `New contact submission from ${submission.name}`;
  const lines = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || '-'}`,
    `Source: ${submission.sourcePage}`,
    '',
    'Message:',
    submission.message,
  ];

  try {
    await withTimeout(
      transporter.sendMail({
      from: config.mail.from,
      to: config.mail.to,
      replyTo: submission.email,
      subject,
      text: lines.join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; color: #111;">
          <h2 style="margin-bottom: 16px;">${escapeHtml(subject)}</h2>
          <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(submission.phone || '-')}</p>
          <p><strong>Source:</strong> ${escapeHtml(submission.sourcePage)}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; line-height: 1.5;">${escapeHtml(submission.message)}</div>
        </div>
      `,
      }),
    );
  } catch (error) {
    // P1-54: Log email send failures instead of silently returning
    console.error('[mailer] sendContactSubmissionEmail failed:', error?.message || error);
    return {
      ok: false,
      reason: String(error?.message ?? error),
    };
  }

  return { ok: true };
}

export async function sendContactReplyEmail({ recipientName, recipientEmail, subject, body }) {
  const transporter = await getTransporter();

  if (!transporter) {
    return {
      ok: false,
      reason: 'Email sending is not configured. Set SMTP_HOST and related mail settings in adminjs/.env.',
    };
  }

  const safeSubject = String(subject ?? '').trim();
  const safeBody = String(body ?? '').trim();

  if (!safeSubject || !safeBody) {
    return {
      ok: false,
      reason: 'Reply subject and message are required.',
    };
  }

  const greetingName = String(recipientName ?? '').trim() || 'there';
  const signature = buildEmailSignature();
  const text = `Hi ${greetingName},\n\n${safeBody}\n\nBest regards,\n\n${signature.text}`;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <p>Hi ${escapeHtml(greetingName)},</p>
      <div style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(safeBody)}</div>
      <p style="margin-top: 24px;">Best regards,</p>
      ${signature.html}
    </div>
  `;

  try {
    await withTimeout(
      transporter.sendMail({
        from: config.mail.from,
        to: recipientEmail,
        replyTo: config.mail.to || config.mail.from,
        subject: safeSubject,
        text,
        html,
        attachments: signature.attachments,
      }),
    );
  } catch (error) {
    // P1-54: Log email send failures instead of silently returning
    console.error('[mailer] sendContactReplyEmail failed:', error?.message || error);
    return {
      ok: false,
      reason: String(error?.message ?? error),
    };
  }

  return { ok: true };
}

// ──────────────────────────────────────────────────────────────────────────────
// P1-53: Transactional email templates
// These cover booking confirmation, payment receipt, membership activation,
// membership cancellation, and refund notification. All functions follow the
// same pattern: return { ok: true } on success, { ok: false, reason } on error.
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Formats a minor-unit currency amount (e.g. 1500 → £15.00).
 */
function formatCurrencyAmount(amountMinor, currency = 'gbp') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: String(currency || 'gbp').toUpperCase(),
  }).format((Number(amountMinor) || 0) / 100);
}

/**
 * Sends an admin notification copy of a transactional email.
 * Fire-and-forget — failures are logged but never propagated.
 */
async function sendAdminNotificationCopy(subject, textBody) {
  if (!config.mail.to) return;

  try {
    const transporter = await getTransporter();
    if (!transporter) return;

    await withTimeout(
      transporter.sendMail({
        from: config.mail.from,
        to: config.mail.to,
        subject: `[Admin Copy] ${subject}`,
        text: textBody,
      }),
    );
  } catch (error) {
    console.error('[mailer] sendAdminNotificationCopy failed:', error?.message || error);
  }
}

/**
 * Sends a booking confirmation email to the member after a booking is confirmed.
 * @param {{ recipientName: string, recipientEmail: string, bookingId: number|string,
 *   resourceName: string, startAt: string|Date, endAt: string|Date,
 *   totalMinor: number, currency?: string }} booking
 */
export async function sendBookingConfirmationEmail(booking) {
  const transporter = await getTransporter();

  if (!transporter) {
    return { ok: false, reason: 'Email notifications are not configured.' };
  }

  const name = String(booking.recipientName ?? '').trim() || 'Member';
  const resourceName = String(booking.resourceName ?? 'Room');
  const startAt = booking.startAt ? new Date(booking.startAt).toLocaleString('en-GB', { timeZone: 'UTC' }) : '-';
  const endAt = booking.endAt ? new Date(booking.endAt).toLocaleString('en-GB', { timeZone: 'UTC' }) : '-';
  const total = formatCurrencyAmount(booking.totalMinor, booking.currency);
  const ref = String(booking.bookingId ?? '-');

  const subject = `Booking Confirmed — ${resourceName}`;
  const signature = buildEmailSignature();

  const text = [
    `Hi ${name},`,
    '',
    'Your booking has been confirmed.',
    '',
    `Reference: #${ref}`,
    `Resource: ${resourceName}`,
    `From: ${startAt} UTC`,
    `To:   ${endAt} UTC`,
    `Total paid: ${total}`,
    '',
    'If you need to make changes, please log in to your member dashboard.',
    '',
    'Best regards,',
    '',
    signature.text,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom:16px;">Booking Confirmed — ${escapeHtml(resourceName)}</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>Your booking has been confirmed.</p>
      <table style="border-collapse:collapse; margin:16px 0;">
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Reference</td><td>#${escapeHtml(ref)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Resource</td><td>${escapeHtml(resourceName)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">From</td><td>${escapeHtml(startAt)} UTC</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">To</td><td>${escapeHtml(endAt)} UTC</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Total paid</td><td>${escapeHtml(total)}</td></tr>
      </table>
      <p>If you need to make changes, please log in to your <a href="${escapeHtml(SIGNATURE_WEBSITE_URL)}">member dashboard</a>.</p>
      <p style="margin-top:24px;">Best regards,</p>
      ${signature.html}
    </div>
  `;

  try {
    await withTimeout(
      transporter.sendMail({
        from: config.mail.from,
        to: booking.recipientEmail,
        subject,
        text,
        html,
        attachments: signature.attachments,
      }),
    );

    // Send admin notification copy
    void sendAdminNotificationCopy(subject, `Booking confirmed for ${name} (${booking.recipientEmail}).\n\nRef: #${ref}\nResource: ${resourceName}\nFrom: ${startAt} UTC\nTo: ${endAt} UTC\nTotal: ${total}`);
  } catch (error) {
    console.error('[mailer] sendBookingConfirmationEmail failed:', error?.message || error);
    return { ok: false, reason: String(error?.message ?? error) };
  }

  return { ok: true };
}

/**
 * Sends a payment receipt email to the member after a successful payment.
 * @param {{ recipientName: string, recipientEmail: string, invoiceId: string,
 *   description: string, amountMinor: number, taxMinor?: number, currency?: string,
 *   paidAt?: string|Date }} receipt
 */
export async function sendPaymentReceiptEmail(receipt) {
  const transporter = await getTransporter();

  if (!transporter) {
    return { ok: false, reason: 'Email notifications are not configured.' };
  }

  const name = String(receipt.recipientName ?? '').trim() || 'Member';
  const description = String(receipt.description ?? 'Payment');
  const amount = formatCurrencyAmount(receipt.amountMinor, receipt.currency);
  const tax = receipt.taxMinor != null ? formatCurrencyAmount(receipt.taxMinor, receipt.currency) : null;
  const paidAt = receipt.paidAt ? new Date(receipt.paidAt).toLocaleString('en-GB', { timeZone: 'UTC' }) : '-';
  const ref = String(receipt.invoiceId ?? '-');

  const subject = `Payment Receipt — ${description}`;
  const signature = buildEmailSignature();

  const taxLine = tax ? `VAT: ${tax}` : '';
  const textLines = [
    `Hi ${name},`,
    '',
    'Thank you — your payment has been received.',
    '',
    `Invoice: ${ref}`,
    `Description: ${description}`,
    `Amount: ${amount}`,
  ];
  if (taxLine) textLines.push(taxLine);
  textLines.push(`Date: ${paidAt} UTC`, '', 'Best regards,', '', signature.text);
  const text = textLines.join('\n');

  const taxRow = tax
    ? `<tr><td style="padding:4px 12px 4px 0; font-weight:bold;">VAT</td><td>${escapeHtml(tax)}</td></tr>`
    : '';
  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom:16px;">Payment Receipt</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you — your payment has been received.</p>
      <table style="border-collapse:collapse; margin:16px 0;">
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Invoice</td><td>${escapeHtml(ref)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Description</td><td>${escapeHtml(description)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Amount</td><td>${escapeHtml(amount)}</td></tr>
        ${taxRow}
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Date</td><td>${escapeHtml(paidAt)} UTC</td></tr>
      </table>
      <p style="margin-top:24px;">Best regards,</p>
      ${signature.html}
    </div>
  `;

  try {
    await withTimeout(
      transporter.sendMail({
        from: config.mail.from,
        to: receipt.recipientEmail,
        subject,
        text,
        html,
        attachments: signature.attachments,
      }),
    );
  } catch (error) {
    console.error('[mailer] sendPaymentReceiptEmail failed:', error?.message || error);
    return { ok: false, reason: String(error?.message ?? error) };
  }

  return { ok: true };
}

/**
 * Sends a membership activation email to the member.
 * @param {{ recipientName: string, recipientEmail: string,
 *   planName: string, monthlyPriceMinor: number, currency?: string,
 *   currentPeriodEnd?: string|Date }} membership
 */
export async function sendMembershipActivationEmail(membership) {
  const transporter = await getTransporter();

  if (!transporter) {
    return { ok: false, reason: 'Email notifications are not configured.' };
  }

  const name = String(membership.recipientName ?? '').trim() || 'Member';
  const planName = String(membership.planName ?? 'Membership');
  const price = formatCurrencyAmount(membership.monthlyPriceMinor, membership.currency);
  const renewsAt = membership.currentPeriodEnd
    ? new Date(membership.currentPeriodEnd).toLocaleDateString('en-GB', { timeZone: 'UTC' })
    : '-';

  const subject = `Welcome — Your ${planName} is now active`;
  const signature = buildEmailSignature();

  const text = [
    `Hi ${name},`,
    '',
    `Your ${planName} membership is now active.`,
    '',
    `Plan: ${planName}`,
    `Monthly price: ${price}/month`,
    `Next renewal: ${renewsAt}`,
    '',
    'You can manage your membership at any time from your member dashboard.',
    '',
    'Best regards,',
    '',
    signature.text,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom:16px;">Welcome — Your ${escapeHtml(planName)} is now active</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>Your <strong>${escapeHtml(planName)}</strong> membership is now active.</p>
      <table style="border-collapse:collapse; margin:16px 0;">
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Plan</td><td>${escapeHtml(planName)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Monthly price</td><td>${escapeHtml(price)}/month</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Next renewal</td><td>${escapeHtml(renewsAt)}</td></tr>
      </table>
      <p>You can manage your membership at any time from your <a href="${escapeHtml(SIGNATURE_WEBSITE_URL)}">member dashboard</a>.</p>
      <p style="margin-top:24px;">Best regards,</p>
      ${signature.html}
    </div>
  `;

  try {
    await withTimeout(
      transporter.sendMail({
        from: config.mail.from,
        to: membership.recipientEmail,
        subject,
        text,
        html,
        attachments: signature.attachments,
      }),
    );

    // Send admin notification copy
    void sendAdminNotificationCopy(subject, `New membership activated for ${name} (${membership.recipientEmail}).\n\nPlan: ${planName}\nMonthly price: ${price}/month\nNext renewal: ${renewsAt}`);
  } catch (error) {
    console.error('[mailer] sendMembershipActivationEmail failed:', error?.message || error);
    return { ok: false, reason: String(error?.message ?? error) };
  }

  return { ok: true };
}

/**
 * Sends a membership cancellation notice to the member.
 * @param {{ recipientName: string, recipientEmail: string,
 *   planName: string, accessUntil?: string|Date }} cancellation
 */
export async function sendMembershipCancellationEmail(cancellation) {
  const transporter = await getTransporter();

  if (!transporter) {
    return { ok: false, reason: 'Email notifications are not configured.' };
  }

  const name = String(cancellation.recipientName ?? '').trim() || 'Member';
  const planName = String(cancellation.planName ?? 'Membership');
  const accessUntil = cancellation.accessUntil
    ? new Date(cancellation.accessUntil).toLocaleDateString('en-GB', { timeZone: 'UTC' })
    : null;

  const subject = `Your ${planName} has been cancelled`;
  const signature = buildEmailSignature();

  const accessLine = accessUntil
    ? `Your access will remain active until ${accessUntil}.`
    : 'Your access has been deactivated.';

  const text = [
    `Hi ${name},`,
    '',
    `Your ${planName} membership has been cancelled.`,
    '',
    accessLine,
    '',
    "If this was a mistake, please contact us and we'll be happy to help.",
    '',
    'Best regards,',
    '',
    signature.text,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom:16px;">Your ${escapeHtml(planName)} has been cancelled</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>Your <strong>${escapeHtml(planName)}</strong> membership has been cancelled.</p>
      <p>${escapeHtml(accessLine)}</p>
      <p>If this was a mistake, please <a href="mailto:${escapeHtml(SIGNATURE_EMAIL)}">contact us</a> and we'll be happy to help.</p>
      <p style="margin-top:24px;">Best regards,</p>
      ${signature.html}
    </div>
  `;

  try {
    await withTimeout(
      transporter.sendMail({
        from: config.mail.from,
        to: cancellation.recipientEmail,
        subject,
        text,
        html,
        attachments: signature.attachments,
      }),
    );
  } catch (error) {
    console.error('[mailer] sendMembershipCancellationEmail failed:', error?.message || error);
    return { ok: false, reason: String(error?.message ?? error) };
  }

  return { ok: true };
}

/**
 * Sends a refund notification email to the member.
 * @param {{ recipientName: string, recipientEmail: string,
 *   amountMinor: number, currency?: string, description: string,
 *   refundedAt?: string|Date }} refund
 */
export async function sendRefundNotificationEmail(refund) {
  const transporter = await getTransporter();

  if (!transporter) {
    return { ok: false, reason: 'Email notifications are not configured.' };
  }

  const name = String(refund.recipientName ?? '').trim() || 'Member';
  const description = String(refund.description ?? 'Payment');
  const amount = formatCurrencyAmount(refund.amountMinor, refund.currency);
  const refundedAt = refund.refundedAt
    ? new Date(refund.refundedAt).toLocaleDateString('en-GB', { timeZone: 'UTC' })
    : '-';

  const subject = `Refund Processed — ${description}`;
  const signature = buildEmailSignature();

  const text = [
    `Hi ${name},`,
    '',
    `A refund of ${amount} has been processed for: ${description}.`,
    '',
    `Amount: ${amount}`,
    `Date: ${refundedAt}`,
    '',
    'Refunds typically appear on your statement within 5-10 business days.',
    '',
    'Best regards,',
    '',
    signature.text,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom:16px;">Refund Processed</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>A refund of <strong>${escapeHtml(amount)}</strong> has been processed for: <em>${escapeHtml(description)}</em>.</p>
      <table style="border-collapse:collapse; margin:16px 0;">
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Amount</td><td>${escapeHtml(amount)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Date</td><td>${escapeHtml(refundedAt)}</td></tr>
      </table>
      <p>Refunds typically appear on your statement within 5-10 business days.</p>
      <p style="margin-top:24px;">Best regards,</p>
      ${signature.html}
    </div>
  `;

  try {
    await withTimeout(
      transporter.sendMail({
        from: config.mail.from,
        to: refund.recipientEmail,
        subject,
        text,
        html,
        attachments: signature.attachments,
      }),
    );
  } catch (error) {
    console.error('[mailer] sendRefundNotificationEmail failed:', error?.message || error);
    return { ok: false, reason: String(error?.message ?? error) };
  }

  void sendAdminNotificationCopy(subject, text);

  return { ok: true };
}

/**
 * Sends a payment failure / account suspended email to the member.
 * @param {{ recipientName: string, recipientEmail: string,
 *   planName: string, currency?: string, hostedInvoiceUrl?: string }} failure
 */
export async function sendPaymentFailedEmail(failure) {
  const transporter = await getTransporter();

  if (!transporter) {
    return { ok: false, reason: 'Email notifications are not configured.' };
  }

  const name = String(failure.recipientName ?? '').trim() || 'Member';
  const planName = String(failure.planName ?? 'your membership plan');
  const invoiceUrl = failure.hostedInvoiceUrl || null;
  const subject = `Action Required — Payment failed for ${planName}`;
  const signature = buildEmailSignature();

  const invoiceLine = invoiceUrl
    ? `You can view and pay your invoice here: ${invoiceUrl}`
    : 'Please update your payment method to restore access.';

  const text = [
    `Hi ${name},`,
    '',
    `We were unable to process your payment for ${planName}.`,
    '',
    'Your account has been temporarily suspended until payment is resolved.',
    '',
    invoiceLine,
    '',
    'If you have any questions, please reply to this email and we will be happy to help.',
    '',
    'Best regards,',
    '',
    signature.text,
  ].join('\n');

  const invoiceHtml = invoiceUrl
    ? `<p><a href="${escapeHtml(invoiceUrl)}" style="color:#1a73e8;">View &amp; Pay Invoice</a></p>`
    : `<p>Please update your payment method to restore access.</p>`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom:16px; color:#c0392b;">Payment Failed</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>We were unable to process your payment for <strong>${escapeHtml(planName)}</strong>.</p>
      <p>Your account has been <strong>temporarily suspended</strong> until payment is resolved.</p>
      ${invoiceHtml}
      <p>If you have any questions, please reply to this email and we will be happy to help.</p>
      <p style="margin-top:24px;">Best regards,</p>
      ${signature.html}
    </div>
  `;

  try {
    await withTimeout(
      transporter.sendMail({
        from: config.mail.from,
        to: failure.recipientEmail,
        subject,
        text,
        html,
        attachments: signature.attachments,
      }),
    );
  } catch (error) {
    console.error('[mailer] sendPaymentFailedEmail failed:', error?.message || error);
    return { ok: false, reason: String(error?.message ?? error) };
  }

  void sendAdminNotificationCopy(subject, text);

  return { ok: true };
}

/**
 * Sent to member (+ admin copy) when they submit a refund request for a booking.
 * @param {{ recipientName: string, recipientEmail: string, resourceName: string,
 *   startAt: string|Date, amountMinor: number, currency?: string, bookingId: number }} req
 */
export async function sendRefundRequestedEmail(req) {
  const transporter = await getTransporter();
  if (!transporter) return { ok: false, reason: 'Email notifications are not configured.' };

  const name = String(req.recipientName ?? '').trim() || 'Member';
  const resource = String(req.resourceName ?? 'Room');
  const amount = formatCurrencyAmount(req.amountMinor, req.currency);
  const dateStr = req.startAt
    ? new Date(req.startAt).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    : '-';
  const subject = `Refund request received — ${resource}`;
  const signature = buildEmailSignature();

  const text = [
    `Hi ${name},`,
    '',
    `We have received your refund request for your booking of ${resource} on ${dateStr}.`,
    '',
    `Requested amount: ${amount}`,
    `Booking ID: #${req.bookingId}`,
    '',
    'Our team will review your request and process the refund shortly. You will receive a confirmation email once it has been approved.',
    '',
    'Best regards,',
    '',
    signature.text,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom:16px;">Refund Request Received</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>We have received your refund request for your booking of <strong>${escapeHtml(resource)}</strong> on <strong>${escapeHtml(dateStr)}</strong>.</p>
      <table style="border-collapse:collapse; margin:16px 0;">
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Requested amount</td><td>${escapeHtml(amount)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Booking ID</td><td>#${req.bookingId}</td></tr>
      </table>
      <p>Our team will review your request and process the refund shortly. You will receive a confirmation email once it has been approved.</p>
      <p style="margin-top:24px;">Best regards,</p>
      ${signature.html}
    </div>
  `;

  try {
    await withTimeout(transporter.sendMail({ from: config.mail.from, to: req.recipientEmail, subject, text, html, attachments: signature.attachments }));
  } catch (error) {
    console.error('[mailer] sendRefundRequestedEmail failed:', error?.message || error);
    return { ok: false, reason: String(error?.message ?? error) };
  }

  void sendAdminNotificationCopy(subject, text);
  return { ok: true };
}

/**
 * Sent to member (+ admin copy) when an admin approves and processes the refund.
 * @param {{ recipientName: string, recipientEmail: string, resourceName: string,
 *   startAt: string|Date, amountMinor: number, currency?: string, bookingId: number }} req
 */
export async function sendRefundApprovedEmail(req) {
  const transporter = await getTransporter();
  if (!transporter) return { ok: false, reason: 'Email notifications are not configured.' };

  const name = String(req.recipientName ?? '').trim() || 'Member';
  const resource = String(req.resourceName ?? 'Room');
  const amount = formatCurrencyAmount(req.amountMinor, req.currency);
  const dateStr = req.startAt
    ? new Date(req.startAt).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    : '-';
  const subject = `Refund approved — ${resource}`;
  const signature = buildEmailSignature();

  const text = [
    `Hi ${name},`,
    '',
    `Your refund of ${amount} for the booking of ${resource} on ${dateStr} has been approved and processed.`,
    '',
    `Amount: ${amount}`,
    `Booking ID: #${req.bookingId}`,
    '',
    'Refunds typically appear on your statement within 5–10 business days.',
    '',
    'Best regards,',
    '',
    signature.text,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom:16px;">Refund Approved</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>Your refund of <strong>${escapeHtml(amount)}</strong> for the booking of <strong>${escapeHtml(resource)}</strong> on <strong>${escapeHtml(dateStr)}</strong> has been <strong>approved and processed</strong>.</p>
      <table style="border-collapse:collapse; margin:16px 0;">
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Amount</td><td>${escapeHtml(amount)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Booking ID</td><td>#${req.bookingId}</td></tr>
      </table>
      <p>Refunds typically appear on your statement within 5–10 business days.</p>
      <p style="margin-top:24px;">Best regards,</p>
      ${signature.html}
    </div>
  `;

  try {
    await withTimeout(transporter.sendMail({ from: config.mail.from, to: req.recipientEmail, subject, text, html, attachments: signature.attachments }));
  } catch (error) {
    console.error('[mailer] sendRefundApprovedEmail failed:', error?.message || error);
    return { ok: false, reason: String(error?.message ?? error) };
  }

  void sendAdminNotificationCopy(subject, text);
  return { ok: true };
}

export async function sendRefundRejectedEmail(req) {
  const transporter = await getTransporter();
  if (!transporter) return { ok: false, reason: 'Email notifications are not configured.' };

  const name = String(req.recipientName ?? '').trim() || 'Member';
  const resource = String(req.resourceName ?? 'Room');
  const amount = formatCurrencyAmount(req.amountMinor, req.currency);
  const dateStr = req.startAt
    ? new Date(req.startAt).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    : '-';
  const subject = `Refund request update — ${resource}`;
  const signature = buildEmailSignature();

  const text = [
    `Hi ${name},`,
    '',
    `We have reviewed your refund request of ${amount} for the booking of ${resource} on ${dateStr}.`,
    '',
    'After careful review, we are unable to process this refund at this time. Your booking remains confirmed.',
    '',
    `Amount requested: ${amount}`,
    `Booking ID: #${req.bookingId}`,
    '',
    'If you have any questions, please do not hesitate to contact us.',
    '',
    'Best regards,',
    '',
    signature.text,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom:16px;">Refund Request Update</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>We have reviewed your refund request of <strong>${escapeHtml(amount)}</strong> for the booking of <strong>${escapeHtml(resource)}</strong> on <strong>${escapeHtml(dateStr)}</strong>.</p>
      <p>After careful review, we are <strong>unable to process this refund</strong> at this time. Your booking remains confirmed.</p>
      <table style="border-collapse:collapse; margin:16px 0;">
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Amount requested</td><td>${escapeHtml(amount)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; font-weight:bold;">Booking ID</td><td>#${req.bookingId}</td></tr>
      </table>
      <p>If you have any questions, please do not hesitate to contact us.</p>
      <p style="margin-top:24px;">Best regards,</p>
      ${signature.html}
    </div>
  `;

  try {
    await withTimeout(transporter.sendMail({ from: config.mail.from, to: req.recipientEmail, subject, text, html, attachments: signature.attachments }));
  } catch (error) {
    console.error('[mailer] sendRefundRejectedEmail failed:', error?.message || error);
    return { ok: false, reason: String(error?.message ?? error) };
  }

  void sendAdminNotificationCopy(subject, text);
  return { ok: true };
}
