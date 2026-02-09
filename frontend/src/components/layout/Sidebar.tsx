'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/providers/ThemeProvider';
import {
  LayoutDashboard,
  CheckSquare,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const Sidebar = ({ isOpen = true, onClose, user }: SidebarProps) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-neutral-900
          border-r border-neutral-200 dark:border-neutral-800
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                TodoApp
              </span>
            </Link>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* User Profile */}
          {user && (
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${active
                      ? 'bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 font-medium'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }
                  `}
                  onClick={onClose}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-1">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-4 py-3 rounded-lg w-full
                text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800
                transition-colors"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5" />
                  <span>Light Mode</span>
                </>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                // Handle logout
                window.location.href = '/login';
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg w-full
                text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950
                transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
