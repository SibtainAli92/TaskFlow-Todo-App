'use client';

import { ReactNode } from 'react';
import { DashboardLayout as DashboardLayoutComponent } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../lib/auth/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

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