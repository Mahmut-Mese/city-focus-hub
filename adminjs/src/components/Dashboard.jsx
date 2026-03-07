import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiClient } from 'adminjs';

const PRIMARY_PAGES = [
  { label: 'Homepage', href: '/admin/pages/homepage' },
  { label: 'About Page', href: '/admin/pages/about-page' },
  { label: 'Pricing Page', href: '/admin/pages/pricing-page' },
  { label: 'Contact Page', href: '/admin/pages/contact-page' },
];

const COLLECTIONS = [
  { label: 'Blog Posts', href: '/admin/pages/blog-posts' },
  { label: 'FAQ Items', href: '/admin/pages/faq-items' },
  { label: 'Meeting Rooms', href: '/admin/pages/meeting-rooms' },
  { label: 'Pricing Plans', href: '/admin/pages/pricing-plans' },
];

const STYLES = `
.admin-dashboard {
  min-height: 100%;
  padding: 32px 40px 64px 344px;
  background: #f6f6f9;
  color: #32324d;
}

.admin-dashboard__inner {
  max-width: 1240px;
  margin: 0 auto;
}

.admin-dashboard__eyebrow {
  margin: 0 0 4px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.admin-dashboard__title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
}

.admin-dashboard__subtitle {
  margin: 10px 0 28px;
  max-width: 780px;
  color: #666687;
  font-size: 1rem;
  line-height: 1.5rem;
}

.admin-dashboard__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 16px;
}

.admin-dashboard__card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
}

.admin-dashboard__card-head {
  padding: 16px 20px 12px;
  border-bottom: 1px solid #f0f0f5;
}

.admin-dashboard__card-title {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  color: #32324d;
}

.admin-dashboard__card-body {
  padding: 8px;
}

.admin-dashboard__list {
  display: flex;
  flex-direction: column;
}

.admin-dashboard__item {
  width: 100%;
  border: 0;
  background: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  text-align: left;
}

.admin-dashboard__item:hover {
  background: #f6f6f9;
}

.admin-dashboard__item-copy {
  min-width: 0;
}

.admin-dashboard__item-label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: #32324d;
}

.admin-dashboard__item-meta {
  margin-top: 2px;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #666687;
}

.admin-dashboard__item-arrow {
  color: #8e8ea9;
  font-size: 1rem;
}

.admin-dashboard__notice {
  padding: 20px;
}

.admin-dashboard__notice-title {
  margin: 0 0 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
}

.admin-dashboard__notice-copy {
  margin: 0;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.admin-dashboard__messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.admin-dashboard__message {
  border: 1px solid #f0f0f5;
  border-radius: 4px;
  padding: 14px 16px;
}

.admin-dashboard__message-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.admin-dashboard__message-name {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  color: #32324d;
}

.admin-dashboard__message-email,
.admin-dashboard__message-meta {
  font-size: 0.75rem;
  line-height: 1rem;
  color: #666687;
}

.admin-dashboard__message-body {
  margin: 10px 0 0;
  color: #32324d;
  font-size: 0.875rem;
  line-height: 1.5rem;
  white-space: pre-wrap;
}

.admin-dashboard__message-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.admin-dashboard__button {
  appearance: none;
  border: 1px solid #d9d8e6;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #32324d;
  background: #fff;
  cursor: pointer;
}

.admin-dashboard__button:hover {
  background: #f6f6f9;
}

.admin-dashboard__button--danger {
  border-color: #ffd3c7;
  color: #c72e3a;
}

.admin-dashboard__button--danger:hover {
  background: #fff5f2;
}

.admin-dashboard__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.admin-dashboard__detail {
  border-top: 1px solid #f0f0f5;
  margin-top: 10px;
  padding-top: 12px;
}

.admin-dashboard__detail-heading {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.125rem;
  font-weight: 700;
  color: #32324d;
}

.admin-dashboard__detail-body {
  margin: 10px 0 0;
  color: #32324d;
  font-size: 0.8125rem;
  line-height: 1.5rem;
  white-space: pre-wrap;
}

.admin-dashboard__detail-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.admin-dashboard__error {
  color: #c72e3a;
  margin: 10px 0 0;
  font-size: 0.75rem;
  line-height: 1rem;
}

.admin-dashboard__empty {
  padding: 20px;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.5rem;
}

@media (max-width: 960px) {
  .admin-dashboard {
    padding: 20px 16px 48px;
  }

  .admin-dashboard__grid {
    grid-template-columns: 1fr;
  }
}
`;

const api = new ApiClient();

function formatSubmissionDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function trimMessage(message) {
  const normalized = String(message ?? '').trim();

  if (normalized.length <= 180) {
    return normalized;
  }

  return `${normalized.slice(0, 177).trimEnd()}...`;
}

function coerceJson(responseText) {
  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return null;
  }
}

async function fetchAdminJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const responseText = await response.text();
  const payload = coerceJson(responseText);

  if (!response.ok) {
    const message = payload?.error || payload?.message || responseText || `Request failed (${response.status}).`;
    throw new Error(message);
  }

  return payload;
}

function normalizeAdminSubmissionPayload(response) {
  return Array.isArray(response?.data) ? response.data : [];
}

function normalizeSubmissionRecord(record) {
  const params = record ?? {};

  return {
    id: Number(params.id),
    name: String(params.name ?? ''),
    email: String(params.email ?? ''),
    phone: String(params.phone ?? ''),
    message: String(params.message ?? ''),
    sourcePage: String(params.sourcePage ?? params.source_page ?? ''),
    createdAt: params.createdAt ?? params.created_at ?? null,
  };
}

function normalizeResourceSubmissionPayload(response) {
  if (!Array.isArray(response?.records)) {
    return [];
  }

  return response.records
    .map((record) => normalizeSubmissionRecord(record?.params ?? {}))
    .filter((submission) => Number.isFinite(submission.id));
}

function normalizeResourceRecordPayload(response) {
  if (!response?.record?.params) {
    return null;
  }

  return normalizeSubmissionRecord(response.record.params);
}

function getRecentSubmissions(props) {
  if (Array.isArray(props?.recentSubmissions)) {
    return props.recentSubmissions;
  }

  if (Array.isArray(props?.data?.recentSubmissions)) {
    return props.data.recentSubmissions;
  }

  if (Array.isArray(props?.recentMessages)) {
    return props.recentMessages;
  }

  return [];
}

function resolveSubmissionPayload(source) {
  if (Array.isArray(source?.recentSubmissions)) {
    return source.recentSubmissions;
  }

  if (Array.isArray(source?.data?.recentSubmissions)) {
    return source.data.recentSubmissions;
  }

  if (Array.isArray(source?.payload?.recentSubmissions)) {
    return source.payload.recentSubmissions;
  }

  if (Array.isArray(source?.body?.recentSubmissions)) {
    return source.body.recentSubmissions;
  }

  if (Array.isArray(source?.result?.recentSubmissions)) {
    return source.result.recentSubmissions;
  }

  if (Array.isArray(source?.recentMessages)) {
    return source.recentMessages;
  }

  if (Array.isArray(source?.data?.recentMessages)) {
    return source.data.recentMessages;
  }

  if (Array.isArray(source?.data?.items)) {
    return source.data.items;
  }

  return [];
}

function normalizeDashboardResponse(response) {
  const payload = response?.data ?? response;
  return resolveSubmissionPayload(payload);
}

async function fetchDashboardMessages() {
  const response = await fetch('/admin/api/dashboard', {
    credentials: 'same-origin',
  });

  const text = await response.text();
  if (!response.ok || !text) {
    throw new Error(`Unable to load dashboard messages (${response.status}).`);
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error('Dashboard API returned a non-JSON response.');
  }
}

async function fetchAdminMessages(limit = 50) {
  const safeLimit = Number.isFinite(Number(limit)) ? Number(limit) : 50;
  const normalizeCustomResponse = (response) => normalizeAdminSubmissionPayload(response);

  try {
    const customPayload = await fetchAdminJson(`/admin/api/contact-submissions?limit=${safeLimit}`);
    const customSubmissions = normalizeCustomResponse(customPayload);

    if (customSubmissions.length) {
      return customSubmissions;
    }
  } catch (error) {
    console.warn('Custom contact submissions endpoint unavailable:', error?.message || error);
  }

  const resourcePayload = await fetchAdminJson(`/admin/api/resources/contact_submissions/actions/list?page=1&perPage=${safeLimit}`);
  return normalizeResourceSubmissionPayload(resourcePayload);
}

async function deleteAdminSubmission(id) {
  const parsedId = Number(id);

  if (!Number.isFinite(parsedId) || parsedId <= 0) {
    throw new Error('Invalid submission id.');
  }

  try {
    const customPayload = await fetchAdminJson(`/admin/api/contact-submissions/${parsedId}`, { method: 'DELETE' });

    if (customPayload?.ok) {
      return;
    }

    if (customPayload?.error) {
      throw new Error(customPayload.error);
    }
  } catch {
    // fallback to AdminJS resource endpoint
  }

  const resourcePayload = await fetchAdminJson(`/admin/api/resources/contact_submissions/records/${parsedId}/delete`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });

  if (resourcePayload?.record?.baseError) {
    const message = resourcePayload.record.baseError?.message || 'Unable to delete submission.';
    throw new Error(message);
  }

  if (resourcePayload?.notice?.type === 'error') {
    throw new Error(resourcePayload.notice?.message || 'Unable to delete submission.');
  }

  return;
}

async function fetchAdminSubmissionById(id) {
  const parsedId = Number(id);

  if (!Number.isFinite(parsedId) || parsedId <= 0) {
    return null;
  }

  try {
    const customPayload = await fetchAdminJson(`/admin/api/contact-submissions/${parsedId}`);
    const customSubmission = normalizeSubmissionRecord(customPayload?.data?.record ?? customPayload?.record ?? customPayload);

    if (customSubmission.id > 0) {
      return customSubmission;
    }
  } catch (error) {
    console.warn('Unable to load message from custom endpoint:', error?.message || error);
  }

  const resourcePayload = await fetchAdminJson(`/admin/api/resources/contact_submissions/records/${parsedId}/show`);
  return normalizeResourceRecordPayload(resourcePayload);
}

function ShortcutList({ title, items, navigate, meta }) {
  return (
    <section className="admin-dashboard__card">
      <div className="admin-dashboard__card-head">
        <h2 className="admin-dashboard__card-title">{title}</h2>
      </div>
      <div className="admin-dashboard__card-body">
        <div className="admin-dashboard__list">
          {items.map((item) => (
            <button
              key={item.href}
              className="admin-dashboard__item"
              type="button"
              onClick={() => navigate(item.href)}
            >
              <div className="admin-dashboard__item-copy">
                <div className="admin-dashboard__item-label">{item.label}</div>
                <div className="admin-dashboard__item-meta">{meta}</div>
              </div>
              <span className="admin-dashboard__item-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function MessagesCard({
  submissions,
  selectedSubmission,
  onOpen,
  onDelete,
  deletingId,
  operationError,
}) {
  return (
    <section className="admin-dashboard__card">
      <div className="admin-dashboard__card-head">
        <h2 className="admin-dashboard__card-title">Customer Messages</h2>
      </div>
      <div className="admin-dashboard__card-body">
        {submissions.length ? (
          <div className="admin-dashboard__messages">
            {submissions.map((submission) => (
              <article key={submission.id} className="admin-dashboard__message">
                <div className="admin-dashboard__message-head">
                  <div>
                    <div className="admin-dashboard__message-name">{submission.name}</div>
                    <div className="admin-dashboard__message-email">{submission.email}</div>
                    {submission.phone ? (
                      <div className="admin-dashboard__message-meta">{submission.phone}</div>
                    ) : null}
                  </div>
                  <div className="admin-dashboard__message-meta">
                    {submission.sourcePage}
                    {formatSubmissionDate(submission.createdAt) ? ` · ${formatSubmissionDate(submission.createdAt)}` : ''}
                  </div>
                </div>
                <p className="admin-dashboard__message-body">{trimMessage(submission.message)}</p>
                <div className="admin-dashboard__message-actions">
                  <button
                    type="button"
                    className="admin-dashboard__button"
                    onClick={() => onOpen(submission)}
                  >
                    Open
                  </button>
                  <button
                    type="button"
                    className="admin-dashboard__button admin-dashboard__button--danger"
                    onClick={() => onDelete(submission)}
                    disabled={deletingId === submission.id}
                  >
                    {deletingId === submission.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </article>
            ))}
            {selectedSubmission ? (
              <div className="admin-dashboard__detail">
                <h3 className="admin-dashboard__detail-heading">Selected message</h3>
                <p className="admin-dashboard__detail-body">{selectedSubmission.message}</p>
                <div className="admin-dashboard__detail-actions">
                  <button
                    type="button"
                    className="admin-dashboard__button"
                    onClick={() => onOpen(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="admin-dashboard__button admin-dashboard__button--danger"
                    onClick={() => onDelete(selectedSubmission)}
                    disabled={deletingId === selectedSubmission.id}
                  >
                    {deletingId === selectedSubmission.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="admin-dashboard__empty">No customer messages yet.</div>
        )}
        {operationError ? <div className="admin-dashboard__error">{operationError}</div> : null}
      </div>
    </section>
  );
}

export default function Dashboard(props) {
  const navigate = useNavigate();
  const [dashboardSubmissions, setDashboardSubmissions] = useState(getRecentSubmissions(props));
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [operationError, setOperationError] = useState('');

  useEffect(() => {
    const initialSubmissions = getRecentSubmissions(props);

    if (initialSubmissions.length) {
      setDashboardSubmissions(initialSubmissions);
    }
  }, [props]);

  useEffect(() => {
    let isActive = true;

    const loadDashboardData = async () => {
      const assignSubmissions = (nextSubmissions) => {
        if (!isActive || !Array.isArray(nextSubmissions)) {
          return;
        }

        setDashboardSubmissions(nextSubmissions);
      };

      try {
        const dashboardResponse = await api.getDashboard();
        const dashboardSubmissions = normalizeDashboardResponse(dashboardResponse);

        if (dashboardSubmissions.length) {
          assignSubmissions(dashboardSubmissions);
          return;
        }

        const fallbackSubmissions = await fetchAdminMessages();
        if (fallbackSubmissions.length) {
          assignSubmissions(fallbackSubmissions);
          return;
        }

        const dashboardOnlyPayload = await fetchDashboardMessages();
        const dashboardOnlySubmissions = normalizeDashboardResponse(dashboardOnlyPayload);
        assignSubmissions(dashboardOnlySubmissions);
      } catch (error) {
        if (!isActive) {
          return;
        }

        try {
          const fallbackPayload = await fetchDashboardMessages();
          const fallbackSubmissions = normalizeDashboardResponse(fallbackPayload);
          assignSubmissions(fallbackSubmissions);
          return;
        } catch (fallbackError) {
          console.warn('Unable to load dashboard messages:', error?.message || error);
          if (fallbackError) {
            console.warn('Dashboard fallback also failed:', fallbackError?.message || fallbackError);
          }
        }
      }
    };

    loadDashboardData();

    return () => {
      isActive = false;
    };
  }, []);

  const submissions = dashboardSubmissions;

  const handleOpenSubmission = async (submission) => {
    setOperationError('');
    setSelectedSubmission(submission);

    if (!submission?.id) {
      return;
    }

    try {
      const freshSubmission = await fetchAdminSubmissionById(submission.id);

      if (freshSubmission) {
        setSelectedSubmission(freshSubmission);
      }
    } catch (error) {
      setOperationError(error?.message || 'Unable to open selected message.');
    }
  };

  const handleDeleteSubmission = async (submission) => {
    if (!submission?.id) {
      return;
    }

    const targetId = Number(submission.id);

    if (!Number.isFinite(targetId) || targetId <= 0) {
      return;
    }

    setDeletingId(targetId);
    setOperationError('');

    try {
      await deleteAdminSubmission(targetId);
      setDashboardSubmissions((previous) => previous.filter((item) => item.id !== targetId));

      setSelectedSubmission((previous) => (previous?.id === targetId ? null : previous));
    } catch (error) {
      setOperationError(error?.message || 'Unable to delete submission.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="admin-dashboard">
        <div className="admin-dashboard__inner">
          <p className="admin-dashboard__eyebrow">Home</p>
          <h1 className="admin-dashboard__title">Content Manager</h1>
          <p className="admin-dashboard__subtitle">
            Use the shortcuts below to jump into single pages and collection content for the live site.
          </p>

          <div className="admin-dashboard__grid">
            <ShortcutList
              title="Single Types"
              items={PRIMARY_PAGES}
              navigate={navigate}
              meta="Edit structured page content"
            />

            <section className="admin-dashboard__card">
              <div className="admin-dashboard__card-head">
                <h2 className="admin-dashboard__card-title">Workspace</h2>
              </div>
              <div className="admin-dashboard__notice">
                <h3 className="admin-dashboard__notice-title">Production content workspace</h3>
                <p className="admin-dashboard__notice-copy">
                  client@leadenhallworks.com
                </p>
              </div>
            </section>

            <ShortcutList
              title="Collections"
              items={COLLECTIONS}
              navigate={navigate}
              meta="Manage repeatable content"
            />

            <MessagesCard
              submissions={submissions}
              selectedSubmission={selectedSubmission}
              onOpen={handleOpenSubmission}
              onDelete={handleDeleteSubmission}
              deletingId={deletingId}
              operationError={operationError}
            />
          </div>
        </div>
      </div>
    </>
  );
}
