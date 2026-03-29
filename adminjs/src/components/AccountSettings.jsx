import React, { useEffect, useState } from 'react';
import { Loader, MessageBox } from '@adminjs/design-system';

const STYLES = `
.admin-account-page {
  min-height: 100%;
  padding: 32px 40px 64px 40px;
  background: #f6f6f9;
  color: #32324d;
}

.admin-account-page__inner {
  max-width: 760px;
}

.admin-account-page__eyebrow {
  margin: 0 0 4px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.admin-account-page__title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
}

.admin-account-page__subtitle {
  margin: 10px 0 28px;
  color: #666687;
  font-size: 1rem;
  line-height: 1.5rem;
}

.admin-account-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
  padding: 24px;
}

.admin-account-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.admin-account-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-account-field--full {
  grid-column: 1 / -1;
}

.admin-account-label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
}

.admin-account-input {
  min-height: 2.75rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  padding: 0 0.875rem;
  font-size: 0.9375rem;
}

.admin-account-input:focus {
  outline: none;
  border-color: #4945ff;
}

.admin-account-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
}

.admin-account-hint {
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-account-button,
.admin-account-button--primary,
.admin-account-button--ghost {
  min-height: 2.75rem;
  border-radius: 4px;
  font-size: 0.9375rem;
  line-height: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0 1rem;
}

.admin-account-button {
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #32324d;
}

.admin-account-button--primary {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #ffffff;
}

.admin-account-button--ghost {
  border: 0;
  background: transparent;
  color: #4945ff;
  padding: 0;
}

@media (max-width: 960px) {
  .admin-account-page {
    padding: 20px 16px 48px;
  }

  .admin-account-grid {
    grid-template-columns: 1fr;
  }
}
`;

async function requestAccount(method = 'GET', payload) {
  const response = await fetch('/admin/api/pages/account', {
    method,
    credentials: 'same-origin',
    headers: payload ? { 'Content-Type': 'application/json' } : undefined,
    body: payload ? JSON.stringify(payload) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update account.');
  }

  return data;
}

export default function AccountSettings() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    let active = true;

    requestAccount()
      .then((payload) => {
        if (!active) {
          return;
        }

        setEmail(payload.email || '');
      })
      .catch((loadError) => {
        if (!active) {
          return;
        }

        setError(loadError.message);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword) {
      setError('Current password is required.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError('New password confirmation does not match.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = await requestAccount('POST', {
        email,
        currentPassword,
        newPassword,
      });

      setSuccess(payload.message || 'Account updated. Sign in again.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      window.setTimeout(() => {
        window.location.assign('/admin/logout');
      }, 900);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="admin-account-page">
        <div className="admin-account-page__inner">
          <p className="admin-account-page__eyebrow">Account</p>
          <h1 className="admin-account-page__title">Account settings</h1>
          <p className="admin-account-page__subtitle">
            Update the admin email address or password used to sign in.
          </p>

          {error ? <MessageBox variant="danger" mb="lg">{error}</MessageBox> : null}
          {success ? <MessageBox variant="success" mb="lg">{success}</MessageBox> : null}

          <form className="admin-account-card" onSubmit={onSubmit}>
            <div className="admin-account-grid">
              <label className="admin-account-field admin-account-field--full">
                <span className="admin-account-label">Email</span>
                <input
                  className="admin-account-input"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </label>

              <label className="admin-account-field admin-account-field--full">
                <span className="admin-account-label">Current password</span>
                <input
                  className="admin-account-input"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </label>

              <label className="admin-account-field">
                <span className="admin-account-label">New password</span>
                <input
                  className="admin-account-input"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </label>

              <label className="admin-account-field">
                <span className="admin-account-label">Confirm new password</span>
                <input
                  className="admin-account-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </label>
            </div>

            <div className="admin-account-actions">
              <div className="admin-account-hint">
                Saving account changes signs the current session out.
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button
                  className="admin-account-button--ghost"
                  type="button"
                  onClick={() => window.location.assign('/admin/logout')}
                >
                  Sign out
                </button>
                <button className="admin-account-button--primary" type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save account'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
