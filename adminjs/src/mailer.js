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
    return {
      ok: false,
      reason: String(error?.message ?? error),
    };
  }

  return { ok: true };
}
