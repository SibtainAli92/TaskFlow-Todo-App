'use client';

import { useState } from 'react';
import { signIn } from '../../../lib/auth/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent } from '../../../components/ui/card';
import { AlertCircle, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Using Better Auth's signIn function for registration
      // Note: Better Auth typically handles registration via sign-in with new user
      const result = await signIn('email', {
        email,
        password,
        callbackURL: '/dashboard' // Redirect to dashboard after successful registration
      });

      if (result?.error) {
        // Handle error object that might contain detail, status, etc.
        if (typeof result.error === 'string') {
          setError(result.error);
        } else if (result.error && typeof result.error === 'object' && 'detail' in result.error) {
          setError((result.error as { detail?: string }).detail || 'Registration failed');
        } else if (result.error && typeof result.error === 'object') {
          setError(JSON.stringify(result.error));
        } else {
          setError('Registration failed');
        }
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
            Create Your Account
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Start organizing your tasks in minutes
          </p>
        </div>

        {/* Register Card */}
        <Card variant="elevated">
          <CardContent className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-start gap-3 p-4 bg-error-50 dark:bg-error-950 border border-error-200 dark:border-error-800 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-error-700 dark:text-error-300">{error}</p>
                </div>
              )}

              <div className="space-y-4">
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
                  className="bg-white dark:bg-neutral-900"
                />
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  helperText="Must be at least 8 characters"
                  className="bg-white dark:bg-neutral-900"
                />
                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="bg-white dark:bg-neutral-900"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={loading}
              >
                {!loading && <UserPlus className="h-5 w-5 mr-2" />}
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>

              <p className="text-xs text-center text-neutral-600 dark:text-neutral-400">
                By signing up, you agree to our{' '}
                <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Sign in link */}
        <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}