import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import { execute, queryOne } from './sql.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, originalHash] = String(storedHash || '').split(':');

  if (!salt || !originalHash) {
    return false;
  }

  const candidateHash = scryptSync(password, salt, 64);
  const originalHashBuffer = Buffer.from(originalHash, 'hex');

  if (candidateHash.length !== originalHashBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidateHash, originalHashBuffer);
}

function toUserRecord(row) {
  if (!row) {
    return null;
  }

  return {
    id: Number(row.id),
    name: String(row.name),
    email: String(row.email),
    phone: row.phone || '',
    location: row.location || '',
    initials: String(row.name)
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || 'CF',
    stripeCustomerId: row.stripe_customer_id || null,
    entrySource: row.entry_source || 'system',
    accessStatus: row.access_status || 'active',
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

async function revokeMemberSessions(userId) {
  await execute(
    `DELETE FROM member_sessions
      WHERE JSON_UNQUOTE(JSON_EXTRACT(data, '$.memberUserId')) = :userId`,
    {
      userId: String(userId),
    },
  );
}

export async function findUserById(userId) {
  const row = await queryOne('SELECT * FROM member_users WHERE id = :userId LIMIT 1', { userId });
  return toUserRecord(row);
}

export async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  const row = await queryOne('SELECT * FROM member_users WHERE email = :email LIMIT 1', { email: normalizedEmail });
  return row ? { raw: row, user: toUserRecord(row) } : null;
}

export async function registerUser({ name, email, password, entrySource = 'system' }) {
  const normalizedName = String(name || '').trim();
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = String(password || '').trim();
  const normalizedEntrySource = String(entrySource || 'system').trim().toLowerCase() || 'system';

  if (!normalizedName) {
    throw new Error('Name is required.');
  }

  if (!normalizedEmail) {
    throw new Error('Email is required.');
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw new Error('Email is invalid.');
  }

  if (!normalizedPassword) {
    throw new Error('Password is required.');
  }

  if (normalizedPassword.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
  }

  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser) {
    throw new Error('An account with this email already exists.');
  }

  const now = new Date();
  await execute(
    `INSERT INTO member_users
      (document_id, name, email, password_hash, entry_source, access_status, created_at, updated_at)
     VALUES
      (:documentId, :name, :email, :passwordHash, :entrySource, 'active', :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      name: normalizedName,
      email: normalizedEmail,
      passwordHash: hashPassword(normalizedPassword),
      entrySource: normalizedEntrySource,
      createdAt: now,
      updatedAt: now,
    },
  );

  const createdUser = await findUserByEmail(normalizedEmail);
  return createdUser?.user || null;
}

export async function authenticateUser({ email, password }) {
  const existingUser = await findUserByEmail(email);
  const normalizedPassword = String(password || '').trim();

  if (!existingUser || !verifyPassword(normalizedPassword, existingUser.raw.password_hash)) {
    throw new Error('Email or password is incorrect.');
  }

  if (existingUser.user.accessStatus === 'suspended') {
    throw new Error('Your account is suspended. Please contact support.');
  }

  return existingUser.user;
}

export async function createOrGetGuestUser({ name, email }) {
  const normalizedName = String(name || '').trim();
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedName) {
    throw new Error('Guest name is required.');
  }

  if (!normalizedEmail) {
    throw new Error('Guest email is required.');
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw new Error('Guest email is invalid.');
  }

  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser?.user) {
    if (existingUser.user.accessStatus !== 'guest') {
      throw new Error('An account already exists with this email. Please sign in to continue.');
    }

    return existingUser.user;
  }

  const guestPassword = randomUUID();
  const now = new Date();

  await execute(
    `INSERT INTO member_users
      (document_id, name, email, password_hash, access_status, created_at, updated_at)
     VALUES
      (:documentId, :name, :email, :passwordHash, 'guest', :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      name: normalizedName,
      email: normalizedEmail,
      passwordHash: hashPassword(guestPassword),
      createdAt: now,
      updatedAt: now,
    },
  );

  const createdUser = await findUserByEmail(normalizedEmail);
  return createdUser?.user || null;
}

export async function changeUserPassword({ userId, currentPassword, newPassword }) {
  const normalizedCurrentPassword = String(currentPassword || '').trim();
  const normalizedNewPassword = String(newPassword || '').trim();

  if (!normalizedCurrentPassword) {
    throw new Error('Current password is required.');
  }

  if (!normalizedNewPassword) {
    throw new Error('New password is required.');
  }

  if (normalizedNewPassword.length < 8) {
    throw new Error(`New password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
  }

  const row = await queryOne('SELECT * FROM member_users WHERE id = :userId LIMIT 1', { userId });

  if (!row) {
    throw new Error('User not found.');
  }

  if (!verifyPassword(normalizedCurrentPassword, row.password_hash)) {
    throw new Error('Current password is incorrect.');
  }

  await execute(
    `UPDATE member_users
        SET password_hash = :passwordHash,
            updated_at = :updatedAt
      WHERE id = :userId`,
    {
      userId,
      passwordHash: hashPassword(normalizedNewPassword),
      updatedAt: new Date(),
    },
  );

  // P0-16: Invalidate all existing sessions after password change
  await revokeMemberSessions(userId);

  return toUserRecord(row);
}

export async function updateUserStripeCustomerId(userId, stripeCustomerId) {
  await execute(
    `UPDATE member_users
        SET stripe_customer_id = :stripeCustomerId,
            updated_at = :updatedAt
      WHERE id = :userId`,
    {
      userId,
      stripeCustomerId,
      updatedAt: new Date(),
    },
  );
}

export async function updateUserAccessStatus(userId, accessStatus) {
  await execute(
    `UPDATE member_users
        SET access_status = :accessStatus,
            updated_at = :updatedAt
      WHERE id = :userId`,
    {
      userId,
      accessStatus,
      updatedAt: new Date(),
    },
  );

  if (accessStatus === 'suspended') {
    await revokeMemberSessions(userId);
  }
}

export async function updateUserProfile(userId, { name, email, phone }) {
  const normalizedName = String(name || '').trim();
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedName) {
    throw new Error('Name is required.');
  }

  if (!normalizedEmail) {
    throw new Error('Email is required.');
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw new Error('Email is invalid.');
  }

  const row = await queryOne('SELECT * FROM member_users WHERE id = :userId LIMIT 1', { userId });

  if (!row) {
    throw new Error('User not found.');
  }

  // Check if another user already has this email
  if (normalizedEmail !== normalizeEmail(row.email)) {
    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }
  }

  await execute(
    `UPDATE member_users
        SET name = :name,
            email = :email,
            phone = :phone,
            updated_at = :updatedAt
      WHERE id = :userId`,
    {
      userId,
      name: normalizedName,
      email: normalizedEmail,
      phone: String(phone || '').trim(),
      updatedAt: new Date(),
    },
  );

  return toUserRecord({ ...row, name: normalizedName, email: normalizedEmail, phone: String(phone || '').trim(), updated_at: new Date() });
}
