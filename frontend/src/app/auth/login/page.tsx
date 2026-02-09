'use client';

import { useState } from 'react';
import { signIn } from '../../../lib/auth/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent } from '../../../components/ui/card';
import { AlertCircle, LogIn, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      // Using Better Auth's signIn function
      const result = await signIn('email', {
        email,
        password,
        callbackURL: '/dashboard' // Redirect to dashboard after successful login
      });

      if (result?.error) {
        // Handle error object that might contain detail, status, etc.
        if (typeof result.error === 'string') {
          setError(result.error);
        } else if (result.error && typeof result.error === 'object' && 'detail' in result.error) {
          setError((result.error as { detail?: string }).detail || 'Login failed');
        } else if (result.error && typeof result.error === 'object') {
          setError(JSON.stringify(result.error));
        } else {
          setError('Login failed');
        }
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-400/30 to-primary-600/30 dark:from-primary-600/20 dark:to-primary-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-400/30 to-accent-600/30 dark:from-accent-600/20 dark:to-accent-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Enhanced Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary-600 via-purple-600 to-accent-600 flex items-center justify-center shadow-xl shadow-primary-500/50 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Sparkles className="text-white h-7 w-7" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 mb-2">
            Welcome Back
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Enhanced Login Card */}
        <Card variant="gradient" className="shadow-2xl border-2 border-primary-200/50 dark:border-primary-800/50">
          <CardContent className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-error-50 to-error-100/50 dark:from-error-950/50 dark:to-error-900/30 border-2 border-error-200 dark:border-error-800 rounded-xl shadow-lg">
                  <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-error-700 dark:text-error-300">{error}</p>
                </div>
              )}

              <div className="space-y-5">
                <Input
                  label="Email address"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-white dark:bg-neutral-900 border-2 focus:border-primary-500 dark:focus:border-primary-400"
                />
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-white dark:bg-neutral-900 border-2 focus:border-primary-500 dark:focus:border-primary-400"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="/auth/forgot-password"
                    className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105"
                isLoading={loading}
              >
                {!loading && <LogIn className="h-5 w-5 mr-2" />}
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Enhanced Sign up link */}
        <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Don't have an account?{' '}
          <Link
            href="/auth/register"
            className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all hover:underline"
          >
            Sign up for free →
          </Link>
        </p>
      </div>
    </div>
  );
}
