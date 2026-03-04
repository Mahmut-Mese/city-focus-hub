import nodemailer from 'nodemailer';
import { config } from './config.js';

let transporterPromise = null;

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

export async function sendContactSubmissionEmail(submission) {
  const transporter = await getTransporter();

  if (!transporter) {
    throw new Error('Email notifications are not configured. Set SMTP_HOST and related mail settings in adminjs/.env.');
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

  await transporter.sendMail({
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
  });
}
