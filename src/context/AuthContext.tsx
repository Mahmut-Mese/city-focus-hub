import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCurrentMemberSession,
  loginMember,
  logoutMember,
  MEMBER_AUTH_EXPIRED_EVENT,
  registerMember,
  type MemberUser,
} from '@/lib/member-api';

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;

    void getCurrentMemberSession()
      .then((sessionUser) => {
        if (!active) {
          return;
        }

        setUser(toAuthenticatedUser(sessionUser));
      })
      .catch(() => {
        if (active) {
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setIsReady(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleAuthExpired = () => {
      setUser(null);
      setIsReady(true);
    };

    window.addEventListener(MEMBER_AUTH_EXPIRED_EVENT, handleAuthExpired);

    return () => {
      window.removeEventListener(MEMBER_AUTH_EXPIRED_EVENT, handleAuthExpired);
    };
  }, []);

  const login = async ({ email, password }: { email: string; password: string }): Promise<AuthActionResult> => {
    try {
      const memberUser = await loginMember({ email, password });
      const authenticatedUser = toAuthenticatedUser(memberUser);
      setUser(authenticatedUser);
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
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to create account.',
      };
    }
  };

  const logout = () => {
    void logoutMember().catch(() => undefined);
    setUser(null);
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
