'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useAuth } from '@/lib/auth/AuthContext';
import { Moon, Sun, Menu, Sparkles, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const Header = ({ onMenuClick, showMenuButton = false }: HeaderProps) => {
  // Safely access theme context - it might not be available during SSG
  let theme = 'light';
  let toggleTheme = () => {};

  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (error) {
    // Theme context not available (e.g., during SSG)
    // Use default values
  }

  // Access auth context
  const { user, session, signOut, isLoading } = useAuth();

  // Debug logs
  React.useEffect(() => {
    console.log('[HEADER] Auth state:', {
      hasUser: !!user,
      hasSession: !!session,
      isLoading,
      userEmail: user?.email
    });
  }, [user, session, isLoading]);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary-200/50 dark:border-primary-800/50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo and Menu Button */}
          <div className="flex items-center gap-4">
            {showMenuButton && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-xl hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-100 dark:hover:from-primary-950 dark:hover:to-primary-900 transition-all duration-200 transform hover:scale-110"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
              </button>
            )}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-600 via-purple-600 to-accent-600 flex items-center justify-center shadow-lg shadow-primary-500/50 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Sparkles className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent">
                TaskFlow
              </span>
            </Link>
          </div>

          {/* Right: Navigation and Theme Toggle */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/features"
                className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:scale-105 transform"
              >
                Features
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:scale-105 transform"
              >
                About
              </Link>
            </nav>

            {/* Enhanced Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-950 dark:to-accent-950 hover:shadow-lg transition-all duration-200 transform hover:scale-110 hover:rotate-12 border border-primary-200 dark:border-primary-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              ) : (
                <Sun className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              )}
            </button>

            {/* Auth Buttons - Conditional based on user state */}
            <div className="hidden sm:flex items-center gap-2">
              {isLoading ? (
                // Loading state
                <div className="flex items-center gap-2">
                  <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                </div>
              ) : user && session ? (
                // Logged in state - show user profile and logout
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 border border-primary-200 dark:border-primary-800">
                    <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {user.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="hover:bg-gradient-to-br hover:from-error-50 hover:to-error-100 dark:hover:from-error-950 dark:hover:to-error-900 hover:text-error-600 dark:hover:text-error-400"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                // Logged out state - show login/signup buttons
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-100 dark:hover:from-primary-950 dark:hover:to-primary-900">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="primary" size="sm" className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
