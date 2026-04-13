import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { forgotPassword } from '@/lib/member-api';

type AuthMode = 'login' | 'register' | 'forgot';

export default function Auth() {
  const location = useLocation();
  const { user, isReady, login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const errorRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to error when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [error]);

  const redirectTarget = ((location.state as { from?: Location } | null)?.from?.pathname || '/dashboard');

  // #125: Move redirect out of render body — side effects must run in useEffect
  useEffect(() => {
    if (isReady && user) {
      window.location.href = redirectTarget;
    }
  }, [isReady, user, redirectTarget]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f5f2]">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f5f2]">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    if (mode === 'forgot') {
      setIsSubmitting(true);
      try {
        await forgotPassword(email);
        setForgotSent(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to send reset link.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (!password.trim()) {
      setError('Password is required.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('Full name is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = mode === 'login'
        ? await login({ email, password })
        : await register({ name, email, password });

      if (!result.ok) {
        setError(result.error || 'Unable to continue.');
        return;
      }

      // #130: Clear sensitive form state before redirect
      setName('');
      setEmail('');
      setPassword('');
      setError('');
      window.location.href = redirectTarget;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f6f5f2] py-12 flex items-center">
      <div className="container-custom">
        <div className="mx-auto grid max-w-5xl gap-8 rounded-[36px] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(15,23,42,0.06)] lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div className="rounded-[30px] bg-black p-8 text-white">
            <p className="text-sm uppercase tracking-[0.16em] text-white/60">Member access</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Access your coworking dashboard
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-white/70">
              Sign in to manage bookings, billing, invoices, and your workspace profile. New here? Create an account and the dashboard becomes available immediately.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Open your member dashboard after sign in',
                'Create a frontend-only account in seconds',
                'Log out from the navbar or dashboard at any time',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">+</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] bg-[#fbfaf8] p-6 sm:p-8">
            {/* P1-69: ARIA tab semantics for login/register switcher */}
            <div role="tablist" aria-label="Authentication mode" className="inline-flex rounded-full border border-black/10 bg-white p-1">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login' || mode === 'forgot'}
                aria-controls="auth-form-panel"
                id="tab-login"
                onClick={() => {
                  setMode('login');
                  setError('');
                  setForgotSent(false);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  mode === 'login' || mode === 'forgot' ? 'bg-black text-white' : 'text-black/60 hover:text-black'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'register'}
                aria-controls="auth-form-panel"
                id="tab-register"
                onClick={() => {
                  setMode('register');
                  setError('');
                  setForgotSent(false);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  mode === 'register' ? 'bg-black text-white' : 'text-black/60 hover:text-black'
                }`}
              >
                Register
              </button>
            </div>

            <div id="auth-form-panel" role="tabpanel" aria-labelledby={mode === 'register' ? 'tab-register' : 'tab-login'} className="mt-6">
              <h2 className="text-3xl font-semibold tracking-tight text-black">
                {mode === 'forgot'
                  ? 'Reset your password'
                  : mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="mt-2 text-sm text-black/50">
                {mode === 'forgot'
                  ? "Enter your email address and we'll send you a link to reset your password."
                  : mode === 'login'
                    ? 'Use your member credentials to continue.'
                    : 'Register a new frontend account to access the membership dashboard.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {mode === 'forgot' && forgotSent ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-800">
                  <p className="font-medium">Check your email</p>
                  <p className="mt-1 text-green-700">If an account exists with that email, we've sent a password reset link. Please check your inbox and spam folder.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setForgotSent(false);
                      setEmail('');
                      setError('');
                    }}
                    className="mt-3 text-sm font-medium text-black underline underline-offset-2 hover:text-black/70"
                  >
                    Back to login
                  </button>
                </div>
              ) : (
                <>
                  {mode === 'register' ? (
                    <div className="space-y-2">
                      <Label htmlFor="auth-name">Full name</Label>
                      <Input
                        id="auth-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="h-12 rounded-2xl border-black/10 bg-white"
                        placeholder="John Smith"
                      />
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <Label htmlFor="auth-email">Email</Label>
                    <Input
                      id="auth-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-12 rounded-2xl border-black/10 bg-white"
                      placeholder="john@example.com"
                    />
                  </div>

                  {mode !== 'forgot' ? (
                    <div className="space-y-2">
                      <Label htmlFor="auth-password">Password</Label>
                      <Input
                        id="auth-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="h-12 rounded-2xl border-black/10 bg-white"
                        placeholder="Enter your password"
                      />
                      {mode === 'login' ? (
                        <button
                          type="button"
                          onClick={() => {
                            setMode('forgot');
                            setError('');
                          }}
                          className="text-sm text-black/50 hover:text-black underline underline-offset-2"
                        >
                          Forgot password?
                        </button>
                      ) : null}
                    </div>
                  ) : null}

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
                    {isSubmitting
                      ? 'Please wait...'
                      : mode === 'forgot'
                        ? 'Send reset link'
                        : mode === 'login' ? 'Login to dashboard' : 'Create account'}
                  </Button>

                  {mode === 'forgot' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setError('');
                      }}
                      className="block w-full text-center text-sm text-black/50 hover:text-black underline underline-offset-2"
                    >
                      Back to login
                    </button>
                  ) : null}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
