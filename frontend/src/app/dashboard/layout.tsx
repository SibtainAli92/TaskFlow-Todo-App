'use client';

import { useAuth } from '../../lib/auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { DashboardLayout as DashboardLayoutComponent } from '../../components/layout/DashboardLayout';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/auth/login');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Redirect handled by useEffect
  }

  return (
    <DashboardLayoutComponent
      user={{
        name: session.user?.name || session.user?.email?.split('@')[0] || 'User',
        email: session.user?.email || '',
      }}
    >
      {children}
    </DashboardLayoutComponent>
  );
}