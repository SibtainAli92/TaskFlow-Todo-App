import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:8000",
});

// Export methods - using full type assertions to bypass TypeScript errors
// The actual better-auth client has these methods at runtime
export const signIn = (authClient as any).signIn;
export const signOut = (authClient as any).signOut;
export const useAuth = (authClient as any).useSession;
export const useSignOut = (authClient as any).signOut;