'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout as DashboardLayoutComponent } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../lib/auth/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, session, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    console.log('[DASHBOARD LAYOUT] Auth check:', {
      isLoading,
      hasUser: !!user,
      hasSession: !!session
    });

    if (!isLoading && (!user || !session)) {
      console.log('[DASHBOARD LAYOUT] No auth, redirecting to login...');
      router.push('/auth/login');
    }
  }, [isLoading, user, session, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if no user
  if (!user || !session) {
    return null;
  }

  return (
    <DashboardLayoutComponent
      user={{
        name: user?.name || user?.email.split('@')[0] || 'User',
        email: user?.email || '',
      }}
    >
      {children}
    </DashboardLayoutComponent>
  );
}