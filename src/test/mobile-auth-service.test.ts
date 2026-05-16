import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { randomUUID } from 'node:crypto';

type TestUser = { id: number };
type TestSession = { sessionId: string };
type MobileAuthResult = {
  user: TestUser;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
};
type AuthServiceModule = {
  registerMobileUser(input: Record<string, unknown>): Promise<MobileAuthResult>;
  loginMobileUser(input: Record<string, unknown>): Promise<MobileAuthResult>;
  refreshMobileSession(input: { refreshToken: string; sessionId: string }): Promise<MobileAuthResult>;
  revokeMobileSession(input: { sessionId: string; reason: string }): Promise<void>;
  verifyMobileAccessToken(token: string): Promise<{ sessionId: string; user: TestUser }>;
};
type SqlModule = {
  execute(query: string, replacements?: Record<string, unknown>): Promise<unknown>;
  queryOne<T extends Record<string, unknown>>(query: string, replacements?: Record<string, unknown>): Promise<T>;
  queryAll<T extends Record<string, unknown>>(query: string, replacements?: Record<string, unknown>): Promise<T[]>;
};
type DbModule = { sequelize?: { close(): Promise<void> } };

describe('mobile-auth-service', () => {
  let authService: AuthServiceModule;
  let sql: SqlModule;
  let db: DbModule;
  let testUsers: TestUser[] = [];
  let testSessions: TestSession[] = [];

  beforeAll(async () => {
    authService = await import('../../adminjs/src/services/mobile-auth-service.js') as unknown as AuthServiceModule;
    sql = await import('../../adminjs/src/services/sql.js') as unknown as SqlModule;
    db = await import('../../adminjs/src/database.js') as unknown as DbModule;
  });

  afterEach(async () => {
    if (!sql) return;

    for (const session of testSessions) {
      await sql.execute(`DELETE FROM mobile_auth_audit_events WHERE session_id = :sessionId`, { sessionId: session.sessionId });
      await sql.execute(`DELETE FROM mobile_refresh_tokens WHERE session_id = :sessionId`, { sessionId: session.sessionId });
      await sql.execute(`DELETE FROM mobile_sessions WHERE session_id = :sessionId`, { sessionId: session.sessionId });
    }

    for (const user of testUsers) {
      await sql.execute(`DELETE FROM member_users WHERE id = :userId`, { userId: user.id });
    }

    testUsers = [];
    testSessions = [];
  });

  afterAll(async () => {
    if (db?.sequelize) {
      await db.sequelize.close();
    }
  });

  it('registerMobileUser creates user/session/tokens and verifyMobileAccessToken works', async () => {
    const email = `test-${randomUUID()}@example.com`;
    const password = `Pass-${randomUUID()}`;
    const result = await authService.registerMobileUser({
      name: 'Test User',
      email,
      password,
      deviceName: 'Test Device',
      platform: 'ios',
      ipAddress: '127.0.0.1',
      userAgent: 'test-agent',
    });

    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(result).toHaveProperty('sessionId');

    testUsers.push(result.user);
    testSessions.push({ sessionId: result.sessionId });

    const verification = await authService.verifyMobileAccessToken(result.accessToken);
    expect(verification.sessionId).toBe(result.sessionId);
    expect(verification.user.id).toBe(result.user.id);
  });

  it('loginMobileUser works for the registered credentials', async () => {
    const email = `test-${randomUUID()}@example.com`;
    const password = `Pass-${randomUUID()}`;
    const regResult = await authService.registerMobileUser({
      name: 'Test User 2',
      email,
      password,
      deviceName: 'Device',
      platform: 'android',
    });

    testUsers.push(regResult.user);
    testSessions.push({ sessionId: regResult.sessionId });

    const loginResult = await authService.loginMobileUser({
      email,
      password,
      deviceName: 'Device 2',
      platform: 'android',
    });

    expect(loginResult.user.id).toBe(regResult.user.id);
    expect(loginResult).toHaveProperty('accessToken');
    expect(loginResult).toHaveProperty('refreshToken');
    expect(loginResult.sessionId).not.toBe(regResult.sessionId);

    testSessions.push({ sessionId: loginResult.sessionId });
  });

  it('refreshMobileSession rotates refresh token, keeps sessionId stable, and old refresh token fails with reuse detection', async () => {
    const email = `test-${randomUUID()}@example.com`;
    const password = `Pass-${randomUUID()}`;
    const regResult = await authService.registerMobileUser({
      name: 'Test User 3',
      email,
      password,
    });
    testUsers.push(regResult.user);
    testSessions.push({ sessionId: regResult.sessionId });

    const refreshResult = await authService.refreshMobileSession({
      refreshToken: regResult.refreshToken,
      sessionId: regResult.sessionId,
    });

    expect(refreshResult.sessionId).toBe(regResult.sessionId);
    expect(refreshResult.refreshToken).not.toBe(regResult.refreshToken);
    expect(refreshResult.accessToken).not.toBe(regResult.accessToken);

    await expect(authService.refreshMobileSession({
      refreshToken: regResult.refreshToken,
      sessionId: regResult.sessionId,
    })).rejects.toThrow('Session compromised.');

    const session = await sql.queryOne<{ status: string }>(`SELECT status FROM mobile_sessions WHERE session_id = :sessionId`, {
      sessionId: regResult.sessionId,
    });
    expect(session.status).toBe('compromised');

    const auditEvents = await sql.queryAll<{ event_type: string }>(`SELECT event_type FROM mobile_auth_audit_events WHERE session_id = :sessionId ORDER BY created_at DESC`, {
      sessionId: regResult.sessionId,
    });
    const hasReuseEvent = auditEvents.some((event) => event.event_type === 'token_reuse_detected');
    expect(hasReuseEvent).toBe(true);
  });

  it('revokeMobileSession/logout behavior revokes a separate active session and verifyMobileAccessToken rejects afterward', async () => {
    const email = `test-${randomUUID()}@example.com`;
    const password = `Pass-${randomUUID()}`;
    const regResult = await authService.registerMobileUser({
      name: 'Test User 4',
      email,
      password,
    });
    testUsers.push(regResult.user);
    testSessions.push({ sessionId: regResult.sessionId });

    await authService.revokeMobileSession({
      sessionId: regResult.sessionId,
      reason: 'logout',
    });

    await expect(authService.verifyMobileAccessToken(regResult.accessToken)).rejects.toThrow('Invalid access token.');

    const session = await sql.queryOne<{ status: string }>(`SELECT status FROM mobile_sessions WHERE session_id = :sessionId`, {
      sessionId: regResult.sessionId,
    });
    expect(session.status).toBe('revoked');
  });
});
