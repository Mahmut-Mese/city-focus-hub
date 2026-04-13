import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/lib/member-api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [error]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }

    if (!newPassword.trim()) {
      setError('New password is required.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword(token, newPassword);
      setIsSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <section className="min-h-screen bg-[#f6f5f2] py-12 flex items-center">
        <div className="container-custom">
          <div className="mx-auto max-w-md rounded-[36px] border border-black/10 bg-white p-8 shadow-[0_16px_48px_rgba(15,23,42,0.06)]">
            <h1 className="text-2xl font-semibold tracking-tight text-black">Invalid Reset Link</h1>
            <p className="mt-3 text-sm text-black/50">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <a
              href="/auth"
              className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90"
            >
              Go to login
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f6f5f2] py-12 flex items-center">
      <div className="container-custom">
        <div className="mx-auto max-w-md rounded-[36px] border border-black/10 bg-white p-8 shadow-[0_16px_48px_rgba(15,23,42,0.06)]">
          {isSuccess ? (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-black">Password reset successful</h1>
              <p className="mt-3 text-sm text-black/50">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <a
                href="/auth"
                className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90"
              >
                Sign in
              </a>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-black">Set a new password</h1>
              <p className="mt-2 text-sm text-black/50">
                Enter your new password below.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="reset-new-password">New password</Label>
                  <Input
                    id="reset-new-password"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="h-12 rounded-2xl border-black/10 bg-[#fbfaf8]"
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reset-confirm-password">Confirm password</Label>
                  <Input
                    id="reset-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="h-12 rounded-2xl border-black/10 bg-[#fbfaf8]"
                    placeholder="Re-enter your new password"
                    autoComplete="new-password"
                  />
                </div>

                {error ? (
                  <div ref={errorRef} role="alert" aria-live="assertive" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-full bg-black text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60"
                >
                  {isSubmitting ? 'Resetting...' : 'Reset password'}
                </Button>

                <a
                  href="/auth"
                  className="block w-full text-center text-sm text-black/50 hover:text-black underline underline-offset-2"
                >
                  Back to login
                </a>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
