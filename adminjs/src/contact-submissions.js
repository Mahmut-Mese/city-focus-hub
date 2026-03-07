import { sequelize } from './database.js';

function normalizeSubmission(row) {
  const createdAt = row.created_at instanceof Date ? row.created_at : new Date(row.created_at);

  return {
    id: Number(row.id),
    name: row.name ?? '',
    email: row.email ?? '',
    phone: row.phone ?? '',
    message: row.message ?? '',
    sourcePage: row.source_page ?? 'contact',
    createdAt: Number.isNaN(createdAt.getTime()) ? null : createdAt.toISOString(),
  };
}

export async function getRecentContactSubmissions(limit = 8) {
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(50, Number(limit))) : 8;
  const [rows] = await sequelize.query(
    `SELECT id, name, email, phone, message, source_page, created_at
     FROM contact_submissions
     ORDER BY created_at DESC, id DESC
     LIMIT :limit`,
    {
      replacements: { limit: safeLimit },
    },
  );

  return Array.isArray(rows) ? rows.map(normalizeSubmission) : [];
}

function safeInteger(value, defaultValue) {
  const parsed = Number.parseInt(value, 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue;
}

export async function getContactSubmissionById(id) {
  const safeId = safeInteger(id, 0);

  if (!safeId) {
    return null;
  }

  const [rows] = await sequelize.query(
    `SELECT id, name, email, phone, message, source_page, created_at
     FROM contact_submissions
     WHERE id = :id`,
    {
      replacements: { id: safeId },
    },
  );

  if (!Array.isArray(rows) || rows.length === 0) {
    return null;
  }

  return normalizeSubmission(rows[0]);
}

export async function deleteContactSubmissionById(id) {
  const safeId = safeInteger(id, 0);

  if (!safeId) {
    return 0;
  }

  const [result] = await sequelize.query(
    `DELETE FROM contact_submissions WHERE id = :id`,
    {
      replacements: { id: safeId },
    },
  );

  const affectedRows = result?.affectedRows ?? 0;

  return Number.isFinite(affectedRows) ? affectedRows : 0;
}
