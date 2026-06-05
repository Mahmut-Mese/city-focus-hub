import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Platform } from 'react-native';
import { createApiClient } from '../api/client';
import { getStoredSession, storeSession, clearStoredSession } from './secure-storage';
import { loginMobile, registerMobile, logoutMobile, refreshMobileSession, getMobileSession, MobileMember } from '../api/mobile-auth-api';
import { registerDeviceForPushNotifications, unregisterDevicePushToken } from '../notifications/push-registration';
import { getApiBaseUrl } from '../config/api';

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type AuthContextValue = {
  user: MobileMember | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  register(input: RegisterInput): Promise<void>;
  logout(): Promise<void>;
  refreshSession(): Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

async function refreshStoredSession(): Promise<string | null> {
  const session = await getStoredSession();
  if (!session.refreshToken || !session.sessionId) return null;

  try {
    const bareClient = createApiClient({ baseUrl: getApiBaseUrl() });
    const res = await refreshMobileSession(bareClient, {
      refreshToken: session.refreshToken,
      sessionId: session.sessionId
    });

    await storeSession({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      sessionId: res.sessionId,
    });
    return res.accessToken;
  } catch {
    await clearStoredSession();
    return null;
  }
}

async function registerPushBestEffort(): Promise<void> {
  try {
    await registerDeviceForPushNotifications();
  } catch {
    // Push registration must never block auth flows.
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<MobileMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiClient = useMemo(() => {
    return createApiClient({
      baseUrl: getApiBaseUrl(),
      getAccessToken: async () => {
        const session = await getStoredSession();
        return session.accessToken;
      },
      refreshAccessToken: refreshStoredSession,
      onAuthExpired: async () => {
        await clearStoredSession();
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const session = await getStoredSession();
        let hasToken = !!session.accessToken;

        if (hasToken) {
          try {
            const res = await getMobileSession(apiClient);
            if (mounted) {
              setUser(res.user);
              void registerPushBestEffort();
            }
            return;
          } catch {
            hasToken = false;
          }
        }

        const currentSession = await getStoredSession();
        if (!hasToken && currentSession.refreshToken && currentSession.sessionId) {
          const newAccess = await refreshStoredSession();
          if (newAccess) {
            try {
              const res = await getMobileSession(apiClient);
            if (mounted) {
              setUser(res.user);
              void registerPushBestEffort();
            }
              return;
            } catch {
              // Failed retry
            }
          }
        }

        // Exhausted options, clear everything
        await clearStoredSession();
        if (mounted) setUser(null);
      } catch {
        await clearStoredSession();
        if (mounted) setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, [apiClient]);

  const login = async (email: string, password: string) => {
    const res = await loginMobile(apiClient, {
      email,
      password,
      deviceName: Platform.OS,
      platform: Platform.OS as 'ios' | 'android'
    });

    await storeSession({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      sessionId: res.sessionId
    });
    setUser(res.user);
    void registerPushBestEffort();
  };

  const register = async (input: RegisterInput) => {
    const res = await registerMobile(apiClient, {
      ...input,
      deviceName: Platform.OS,
      platform: Platform.OS as 'ios' | 'android'
    });

    await storeSession({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      sessionId: res.sessionId
    });
    setUser(res.user);
    void registerPushBestEffort();
  };

  const logout = async () => {
    try {
      const session = await getStoredSession();
      if (session.refreshToken || session.sessionId) {
        await logoutMobile(apiClient, {
          refreshToken: session.refreshToken || undefined,
          sessionId: session.sessionId || undefined
        });
      }
    } catch {
      // Best effort
    } finally {
      try {
        await unregisterDevicePushToken({ apiClient });
      } catch {
        // Best effort
      }
      await clearStoredSession();
      setUser(null);
    }
  };

  const refreshSession = async () => {
    const token = await refreshStoredSession();
    if (!token) {
      await clearStoredSession();
      setUser(null);
      throw new Error('Authentication failed');
    }

    try {
      const res = await getMobileSession(apiClient);
      setUser(res.user);
      void registerPushBestEffort();
    } catch {
      await clearStoredSession();
      setUser(null);
      throw new Error('Authentication failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}
