import * as SecureStore from 'expo-secure-store';

export type StoredMobileSession = {
  accessToken: string | null;
  refreshToken: string | null;
  sessionId: string | null;
};

const SESSION_KEY = 'mobile_auth_session';

export async function getStoredSession(): Promise<StoredMobileSession> {
  try {
    const data = await SecureStore.getItemAsync(SESSION_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === 'object') {
        return {
          accessToken: typeof parsed.accessToken === 'string' ? parsed.accessToken : null,
          refreshToken: typeof parsed.refreshToken === 'string' ? parsed.refreshToken : null,
          sessionId: typeof parsed.sessionId === 'string' ? parsed.sessionId : null,
        };
      }
    }
  } catch {
    // Ignore error
  }
  return { accessToken: null, refreshToken: null, sessionId: null };
}

export async function storeSession(session: StoredMobileSession): Promise<void> {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
}

export async function clearStoredSession(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}
