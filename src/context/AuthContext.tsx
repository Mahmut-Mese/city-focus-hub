import { createContext, useContext, useEffect, useState } from 'react';
import { loginMember, registerMember, type MemberUser } from '@/lib/member-api';

const AUTH_SESSION_KEY = 'city-focus-hub.auth.session';

export type AuthenticatedUser = {
  id: number;
  name: string;
  email: string;
  initials: string;
  accessStatus: string;
};

type AuthActionResult = {
  ok: boolean;
  error?: string;
};

type AuthContextValue = {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (payload: { email: string; password: string }) => Promise<AuthActionResult>;
  register: (payload: { name: string; email: string; password: string }) => Promise<AuthActionResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'CF';
}

function toAuthenticatedUser(account: MemberUser): AuthenticatedUser {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    initials: account.initials || getInitials(account.name),
    accessStatus: account.accessStatus || 'active',
  };
}

function readStoredSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(AUTH_SESSION_KEY);
    return rawValue ? JSON.parse(rawValue) as AuthenticatedUser : null;
  } catch {
    return null;
  }
}

function writeStoredSession(user: AuthenticatedUser | null) {
  if (typeof window === 'undefined') {
    return;
  }

  if (user) {
    window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sessionUser = readStoredSession();
    setUser(sessionUser);
    setIsReady(true);
  }, []);

  const login = async ({ email, password }: { email: string; password: string }): Promise<AuthActionResult> => {
    try {
      const memberUser = await loginMember({ email, password });
      const authenticatedUser = toAuthenticatedUser(memberUser);
      setUser(authenticatedUser);
      writeStoredSession(authenticatedUser);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : 'Email or password is incorrect.',
      };
    }
  };

  const register = async ({ name, email, password }: { name: string; email: string; password: string }): Promise<AuthActionResult> => {
    try {
      const memberUser = await registerMember({ name, email, password });
      const authenticatedUser = toAuthenticatedUser(memberUser);
      setUser(authenticatedUser);
      writeStoredSession(authenticatedUser);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to create account.',
      };
    }
  };

  const logout = () => {
    setUser(null);
    writeStoredSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isReady,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
