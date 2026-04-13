import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import { execute, queryAll, queryOne } from './sql.js';

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

// ──────────────────────────────────────────────
// #148: Password reset flow
// ──────────────────────────────────────────────

const PASSWORD_RESET_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

/**
 * Creates a password reset token for the given email.
 * Returns the raw (unhashed) token to include in the reset URL.
 * The DB stores a hashed version so a database leak doesn't expose valid tokens.
 * Returns null if the email doesn't exist (caller should still return 200 to prevent enumeration).
 */
export async function createPasswordResetToken(email) {
  const normalizedEmail = normalizeEmail(email);
  const result = await findUserByEmail(normalizedEmail);

  if (!result) {
    return null;
  }

  const rawToken = randomBytes(32).toString('hex');
  const tokenHash = hashPassword(rawToken); // reuse salt:hash format
  const expiresAt = new Date(Date.now() + PASSWORD_RESET_EXPIRY_MS);

  await execute(
    `UPDATE member_users
        SET password_reset_token = :tokenHash,
            password_reset_expires_at = :expiresAt,
            updated_at = :updatedAt
      WHERE id = :userId`,
    {
      tokenHash,
      expiresAt,
      updatedAt: new Date(),
      userId: result.user.id,
    },
  );

  return { token: rawToken, user: result.user };
}

/**
 * Validates a reset token and sets the new password.
 * On success, revokes all sessions and clears the token.
 * Throws on invalid/expired token or validation errors.
 */
export async function resetPasswordWithToken(token, newPassword) {
  const normalizedPassword = String(newPassword || '').trim();

  if (!token) {
    throw new Error('Reset token is required.');
  }

  if (!normalizedPassword) {
    throw new Error('New password is required.');
  }

  if (normalizedPassword.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
  }

  // Find all users with a non-null reset token (there should be at most one matching)
  // We can't query by token directly because it's hashed, so we scan non-null tokens
  const rows = await queryAll(
    `SELECT id, password_reset_token, password_reset_expires_at
       FROM member_users
      WHERE password_reset_token IS NOT NULL
        AND password_reset_expires_at > :now`,
    { now: new Date() },
  );

  let matchedUserId = null;

  for (const row of rows) {
    if (verifyPassword(token, row.password_reset_token)) {
      matchedUserId = Number(row.id);
      break;
    }
  }

  if (!matchedUserId) {
    throw new Error('Invalid or expired reset link. Please request a new one.');
  }

  await execute(
    `UPDATE member_users
        SET password_hash = :passwordHash,
            password_reset_token = NULL,
            password_reset_expires_at = NULL,
            updated_at = :updatedAt
      WHERE id = :userId`,
    {
      passwordHash: hashPassword(normalizedPassword),
      updatedAt: new Date(),
      userId: matchedUserId,
    },
  );

  // Revoke all sessions for this user
  await revokeMemberSessions(matchedUserId);

  return { userId: matchedUserId };
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
