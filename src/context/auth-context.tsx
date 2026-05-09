"use client";

import Cookies from "js-cookie";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AUTH_COOKIE_NAME } from "@/lib/constants";
import * as authApi from "@/api/auth";
import type { AuthUserData } from "@/types/api";

type AuthContextValue = {
  user: AuthUserData | null;
  loading: boolean;
  clearError: () => void;
  setSession: (token: string, user: AuthUserData) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): string | undefined {
  return Cookies.get(AUTH_COOKIE_NAME);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUserData | null>(null);
  const [loading, setLoading] = useState(true);

  const clearError = useCallback(() => {}, []);

  const setSession = useCallback((token: string, next: AuthUserData) => {
    Cookies.set(AUTH_COOKIE_NAME, token, {
      path: "/",
      sameSite: "lax",
      expires: 7,
    });
    setUser(next);
  }, []);

  const logout = useCallback(async () => {
    try {
      if (readSession()) await authApi.logoutRequest();
    } catch {
      /* still clear client session */
    } finally {
      Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const token = readSession();
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const me = await authApi.getMe();
      setUser(me);
    } catch {
      Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = readSession();
      if (!token) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const me = await authApi.getMe();
        if (!cancelled) setUser(me);
      } catch {
        Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      clearError,
      setSession,
      logout,
      refreshUser,
    }),
    [user, loading, clearError, setSession, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
