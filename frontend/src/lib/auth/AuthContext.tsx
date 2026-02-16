'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../api/client';

// Use local Next.js API routes to avoid cross-origin cookie issues
const API_BASE_URL = '';

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
}

interface Session {
  id: string;
  expiresAt: string;
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to update session and token together
  const updateSession = (newUser: User | null, newSession: Session | null) => {
    setUser(newUser);
    setSession(newSession);

    // Immediately update API client token
    if (newSession?.accessToken) {
      console.log('[AUTH CONTEXT] Setting API client token');
      apiClient.setAuthToken(newSession.accessToken);
    } else {
      console.log('[AUTH CONTEXT] Clearing API client token');
      apiClient.setAuthToken(null);
    }
  };

  const refreshSession = async () => {
    console.log('[AUTH CONTEXT] Refreshing session...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/use-session`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[AUTH CONTEXT] Session data:', { hasUser: !!data.user, hasSession: !!data.session });

        if (data.user && data.session) {
          updateSession(data.user, data.session);
          console.log('[AUTH CONTEXT] Session refreshed successfully');
        } else {
          updateSession(null, null);
          console.log('[AUTH CONTEXT] No valid session');
        }
      } else {
        updateSession(null, null);
      }
    } catch (error) {
      console.error('[AUTH CONTEXT] Session refresh error:', error);
      updateSession(null, null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    console.log('[AUTH CONTEXT] Sign in attempt...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('[AUTH CONTEXT] Sign in failed:', data);
        return { error: data.detail || data.error || 'Login failed' };
      }

      console.log('[AUTH CONTEXT] Sign in successful, setting session...');
      updateSession(data.user, data.session);

      // Wait a bit for cookie to be set
      await new Promise(resolve => setTimeout(resolve, 100));

      return {};
    } catch (error) {
      console.error('[AUTH CONTEXT] Sign in error:', error);
      return { error: 'Network error occurred' };
    }
  };

  const signUp = async (email: string, password: string, name?: string): Promise<{ error?: string }> => {
    console.log('[AUTH CONTEXT] Sign up attempt...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('[AUTH CONTEXT] Sign up failed:', data);
        return { error: data.detail || data.error || 'Registration failed' };
      }

      console.log('[AUTH CONTEXT] Sign up successful, setting session...');
      updateSession(data.user, data.session);

      // Wait a bit for cookie to be set
      await new Promise(resolve => setTimeout(resolve, 100));

      return {};
    } catch (error) {
      console.error('[AUTH CONTEXT] Sign up error:', error);
      return { error: 'Network error occurred' };
    }
  };

  const signOut = async () => {
    console.log('[AUTH CONTEXT] Signing out...');

    try {
      // Clear state first
      updateSession(null, null);

      // Call backend to clear cookie
      await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:8001'}/api/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('[AUTH CONTEXT] Sign out error:', error);
    }

    // Manually clear all cookies
    document.cookie = 'better-auth.session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'better-auth.session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost';

    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();

    // Force hard redirect (replace instead of href to prevent back button)
    window.location.replace('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
