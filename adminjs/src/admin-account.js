import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { QueryTypes } from 'sequelize';
import { sequelize } from './database.js';
import { config } from './config.js';

const ADMIN_ACCOUNT_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS admin_accounts (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`;

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(String(password), salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (typeof storedHash !== 'string' || !storedHash.includes(':')) {
    return false;
  }

  const [salt, hash] = storedHash.split(':');
  const derived = scryptSync(String(password), salt, 64);
  const stored = Buffer.from(hash, 'hex');

  if (stored.length !== derived.length) {
    return false;
  }

  return timingSafeEqual(stored, derived);
}

async function getAdminAccountRecord() {
  const [row] = await sequelize.query(
    `
      SELECT id, email, password_hash
      FROM admin_accounts
      ORDER BY id ASC
      LIMIT 1
    `,
    { type: QueryTypes.SELECT },
  );

  return row ?? null;
}

export async function ensureAdminAccount() {
  await sequelize.query(ADMIN_ACCOUNT_TABLE_SQL);

  const [countRow] = await sequelize.query(
    'SELECT COUNT(*) AS count FROM admin_accounts',
    { type: QueryTypes.SELECT },
  );

  if (Number(countRow?.count || 0) > 0) {
    return;
  }

  const now = new Date();

  await sequelize.query(
    `
      INSERT INTO admin_accounts (email, password_hash, created_at, updated_at)
      VALUES (:email, :passwordHash, :createdAt, :updatedAt)
    `,
    {
      replacements: {
        email: normalizeEmail(config.auth.email),
        passwordHash: hashPassword(config.auth.password),
        createdAt: now,
        updatedAt: now,
      },
      type: QueryTypes.INSERT,
    },
  );
}

export async function authenticateAdmin(email, password) {
  await ensureAdminAccount();

  const account = await getAdminAccountRecord();

  if (!account) {
    return null;
  }

  if (normalizeEmail(email) !== normalizeEmail(account.email)) {
    return null;
  }

  if (!verifyPassword(password, account.password_hash)) {
    return null;
  }

  return { email: account.email };
}

export async function getAdminAccountProfile() {
  await ensureAdminAccount();

  const account = await getAdminAccountRecord();

  return {
    email: account?.email ?? normalizeEmail(config.auth.email),
  };
}

export async function updateAdminAccount({ currentPassword, email, newPassword }) {
  await ensureAdminAccount();

  const account = await getAdminAccountRecord();

  if (!account) {
    throw new Error('Admin account is not available.');
  }

  if (!currentPassword || !verifyPassword(currentPassword, account.password_hash)) {
    throw new Error('Current password is incorrect.');
  }

  const nextEmail = normalizeEmail(email || account.email);
  const nextPassword = String(newPassword || '');

  if (!nextEmail) {
    throw new Error('Email is required.');
  }

  if (!nextEmail.includes('@')) {
    throw new Error('Enter a valid email address.');
  }

  if (!nextPassword && nextEmail === normalizeEmail(account.email)) {
    throw new Error('No account changes to save.');
  }

  if (nextPassword && nextPassword.length < 8) {
    throw new Error('New password must be at least 8 characters.');
  }

  const now = new Date();

  await sequelize.query(
    `
      UPDATE admin_accounts
      SET email = :email,
          password_hash = :passwordHash,
          updated_at = :updatedAt
      WHERE id = :id
    `,
    {
      replacements: {
        id: account.id,
        email: nextEmail,
        passwordHash: nextPassword ? hashPassword(nextPassword) : account.password_hash,
        updatedAt: now,
      },
      type: QueryTypes.UPDATE,
    },
  );

  return {
    email: nextEmail,
  };
}
