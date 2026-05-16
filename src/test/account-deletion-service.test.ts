import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { randomUUID } from 'node:crypto';

type AccountDeletionStatus = {
  id: number;
  userId: number;
  status: string;
  scheduledDeletionAt?: string | Date | null;
};

type AccountDeletionServiceModule = {
  getAccountDeletionStatus(userId: number): Promise<AccountDeletionStatus | null>;
  requestAccountDeletion(input: { userId: number; reason?: string }): Promise<AccountDeletionStatus>;
  cancelAccountDeletionRequest(input: { userId: number; reason?: string }): Promise<AccountDeletionStatus>;
  markAccountDeletionCompleted(input: { requestId: number; userId: number; reason?: string }): Promise<AccountDeletionStatus>;
};

type SqlModule = {
  execute(query: string, replacements?: Record<string, unknown>): Promise<unknown>;
  queryOne<T extends Record<string, unknown>>(query: string, replacements?: Record<string, unknown>): Promise<T>;
};

type DbModule = { sequelize?: { close(): Promise<void> } };

function randomUserId(): number {
  return Math.floor(900000000 + Math.random() * 50000000);
}

describe('account-deletion-service', () => {
  let service: AccountDeletionServiceModule;
  let sql: SqlModule;
  let db: DbModule;
  const userIds: number[] = [];
  const sessionIds: string[] = [];
  const pushTokens: string[] = [];

  beforeAll(async () => {
    service = await import('../../adminjs/src/account-deletion-service.js') as unknown as AccountDeletionServiceModule;
    sql = await import('../../adminjs/src/services/sql.js') as unknown as SqlModule;
    db = await import('../../adminjs/src/database.js') as unknown as DbModule;
  });

  afterEach(async () => {
    for (const token of pushTokens) {
      await sql.execute('DELETE FROM mobile_push_tokens WHERE token = :token', { token });
    }
    for (const sessionId of sessionIds) {
      await sql.execute('DELETE FROM mobile_refresh_tokens WHERE session_id = :sessionId', { sessionId });
      await sql.execute('DELETE FROM mobile_sessions WHERE session_id = :sessionId', { sessionId });
    }
    for (const userId of userIds) {
      await sql.execute('DELETE FROM account_deletion_requests WHERE user_id = :userId', { userId });
    }
    pushTokens.length = 0;
    sessionIds.length = 0;
    userIds.length = 0;
  });

  afterAll(async () => {
    if (db?.sequelize) await db.sequelize.close();
  });

  it('creates a 30-day requested row and returns active requests idempotently', async () => {
    const userId = randomUserId();
    userIds.push(userId);

    const first = await service.requestAccountDeletion({ userId, reason: 'leaving' });
    const second = await service.requestAccountDeletion({ userId, reason: 'second reason ignored while active' });

    expect(first.status).toBe('requested');
    expect(second.id).toBe(first.id);

    const row = await sql.queryOne<{ requested_at: Date; scheduled_deletion_at: Date }>(
      'SELECT requested_at, scheduled_deletion_at FROM account_deletion_requests WHERE id = :id LIMIT 1',
      { id: first.id },
    );
    const deltaMs = new Date(row.scheduled_deletion_at).getTime() - new Date(row.requested_at).getTime();
    expect(deltaMs).toBeGreaterThan(29 * 24 * 60 * 60 * 1000);
    expect(deltaMs).toBeLessThan(31 * 24 * 60 * 60 * 1000);
  });

  it('cancels a requested row and status lookup returns cancelled', async () => {
    const userId = randomUserId();
    userIds.push(userId);
    const created = await service.requestAccountDeletion({ userId, reason: 'test' });

    const cancelled = await service.cancelAccountDeletionRequest({ userId, reason: 'changed mind' });
    const status = await service.getAccountDeletionStatus(userId);

    expect(cancelled.id).toBe(created.id);
    expect(cancelled.status).toBe('cancelled');
    expect(status?.status).toBe('cancelled');
  });

  it('marks completed and revokes active mobile sessions, refresh tokens, and push tokens', async () => {
    const userId = randomUserId();
    const sessionId = randomUUID();
    const pushToken = `ExpoPushToken[${randomUUID()}]`;
    userIds.push(userId);
    sessionIds.push(sessionId);
    pushTokens.push(pushToken);

    await sql.execute(
      `INSERT INTO mobile_sessions
        (user_id, session_id, status, created_at, updated_at)
       VALUES (:userId, :sessionId, 'active', :now, :now)`,
      { userId, sessionId, now: new Date() },
    );
    await sql.execute(
      `INSERT INTO mobile_refresh_tokens
        (session_id, token_hash, family_id, status, expires_at, created_at)
       VALUES (:sessionId, :tokenHash, :familyId, 'active', :expiresAt, :now)`,
      { sessionId, tokenHash: 'a'.repeat(64), familyId: randomUUID(), expiresAt: new Date(Date.now() + 86400000), now: new Date() },
    );
    await sql.execute(
      `INSERT INTO mobile_push_tokens
        (user_id, token, platform, status, created_at, updated_at)
       VALUES (:userId, :token, 'ios', 'active', :now, :now)`,
      { userId, token: pushToken, now: new Date() },
    );

    const request = await service.requestAccountDeletion({ userId, reason: 'test' });
    const completed = await service.markAccountDeletionCompleted({ requestId: request.id, userId, reason: 'test completion' });

    expect(completed.status).toBe('completed');
    const session = await sql.queryOne<{ status: string }>('SELECT status FROM mobile_sessions WHERE session_id = :sessionId', { sessionId });
    const refresh = await sql.queryOne<{ status: string }>('SELECT status FROM mobile_refresh_tokens WHERE session_id = :sessionId', { sessionId });
    const push = await sql.queryOne<{ status: string }>('SELECT status FROM mobile_push_tokens WHERE token = :token', { token: pushToken });
    expect(session.status).toBe('revoked');
    expect(refresh.status).toBe('revoked');
    expect(push.status).toBe('revoked');
  });
});
