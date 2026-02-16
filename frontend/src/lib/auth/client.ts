// Custom auth client that directly calls our FastAPI backend
// NOT using Better Auth client library since our backend is custom

const API_BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:8001";

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
  };
  session: {
    id: string;
    expiresAt: string;
    accessToken: string;
    refreshToken: string;
  };
  redirect?: string | null;
}

interface AuthError {
  error: string | { detail: string };
}

// Sign in function
export const signIn = {
  email: async (credentials: { email: string; password: string }): Promise<AuthResponse | AuthError> => {
    console.log('[AUTH] Starting sign in...', { email: credentials.email });
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: include cookies
        body: JSON.stringify(credentials),
      });

      console.log('[AUTH] Sign in response status:', response.status);
      const data = await response.json();
      console.log('[AUTH] Sign in response data:', { hasUser: !!data.user, hasSession: !!data.session });

      if (!response.ok) {
        console.error('[AUTH] Sign in failed:', data);
        return { error: data.detail || data.message || 'Login failed' };
      }

      console.log('[AUTH] Sign in successful');
      return data;
    } catch (error) {
      console.error('[AUTH] Sign in error:', error);
      return { error: 'Network error occurred' };
    }
  }
};

// Sign up function
export const signUp = {
  email: async (data: { email: string; password: string; name?: string }): Promise<AuthResponse | AuthError> => {
    console.log('[AUTH] Starting sign up...', { email: data.email });
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: include cookies
        body: JSON.stringify(data),
      });

      console.log('[AUTH] Sign up response status:', response.status);
      const responseData = await response.json();
      console.log('[AUTH] Sign up response data:', { hasUser: !!responseData.user, hasSession: !!responseData.session });

      if (!response.ok) {
        console.error('[AUTH] Sign up failed:', responseData);
        return { error: responseData.detail || responseData.message || 'Registration failed' };
      }

      console.log('[AUTH] Sign up successful');
      return responseData;
    } catch (error) {
      console.error('[AUTH] Sign up error:', error);
      return { error: 'Network error occurred' };
    }
  }
};

// Sign out function
export const signOut = async (): Promise<void> => {
  console.log('[AUTH] Signing out...');
  try {
    await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
      method: 'POST',
      credentials: 'include',
    });
    console.log('[AUTH] Sign out successful');
    // Clear local session
    window.location.href = '/auth/login';
  } catch (error) {
    console.error('[AUTH] Sign out error:', error);
    window.location.href = '/auth/login';
  }
};

// Use session hook
export const useAuth = () => {
  const [data, setData] = React.useState<{ user: any; session: any } | null>(null);
  const [isPending, setIsPending] = React.useState(true);

  React.useEffect(() => {
    const fetchSession = async () => {
      console.log('[AUTH] Fetching session...');
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/use-session`, {
          credentials: 'include',
        });
        console.log('[AUTH] Session response status:', response.status);
        const sessionData = await response.json();
        console.log('[AUTH] Session data:', { hasUser: !!sessionData.user, hasSession: !!sessionData.session });

        if (sessionData.user && sessionData.session) {
          console.log('[AUTH] Session valid, user authenticated');
          setData(sessionData);
        } else {
          console.log('[AUTH] No valid session');
          setData(null);
        }
      } catch (error) {
        console.error('[AUTH] Session fetch error:', error);
        setData(null);
      } finally {
        setIsPending(false);
        console.log('[AUTH] Session check complete');
      }
    };

    fetchSession();
  }, []);

  return { data, isPending };
};

// For compatibility
export const useSignOut = signOut;

// Import React for hooks
import React from 'react';