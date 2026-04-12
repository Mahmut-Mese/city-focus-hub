import React, { useEffect, useState } from 'react';

const STYLES = `
.refund-page {
  min-height: 100%;
  padding: 32px 40px 64px 40px;
  background: #f6f6f9;
  color: #32324d;
}

.refund-page__inner {
  max-width: 1240px;
  margin: 0 auto;
}

.refund-page__eyebrow {
  margin: 0 0 4px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.refund-page__title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
}

.refund-page__subtitle {
  margin: 10px 0 28px;
  max-width: 780px;
  color: #666687;
  font-size: 1rem;
  line-height: 1.5rem;
}

.refund-page__tabs {
  display: flex;
  gap: 0;
  border-bottom: 2px solid #dcdce4;
  margin-bottom: 24px;
}

.refund-page__tab {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #666687;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: color 0.15s, border-color 0.15s;
}

.refund-page__tab:hover {
  color: #32324d;
}

.refund-page__tab--active {
  color: #4945ff;
  border-bottom-color: #4945ff;
}

.refund-page__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background: #c72e3a;
  margin-left: 6px;
  vertical-align: middle;
}

.refund-page__badge--muted {
  background: #8e8ea9;
}

.refund-page__table-wrap {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  overflow-x: auto;
}

.refund-page__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.refund-page__table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #666687;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border-bottom: 1px solid #eaebf0;
  white-space: nowrap;
}

.refund-page__table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f5;
  color: #32324d;
  vertical-align: middle;
}

.refund-page__table tr:last-child td {
  border-bottom: 0;
}

.refund-page__table tr:hover td {
  background: #fafafa;
}

.refund-page__name {
  font-weight: 600;
}

.refund-page__email {
  font-size: 0.75rem;
  color: #666687;
}

.refund-page__amount {
  font-weight: 700;
  color: #328048;
}

.refund-page__status-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25rem;
}

.refund-page__status-badge--pending {
  background: #fef3cd;
  color: #856404;
}

.refund-page__status-badge--approved {
  background: #d4edda;
  color: #155724;
}

.refund-page__status-badge--rejected {
  background: #f8d7da;
  color: #721c24;
}

.refund-page__actions {
  display: flex;
  gap: 6px;
}

.refund-page__btn {
  appearance: none;
  border: 1px solid #d9d8e6;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  color: #32324d;
  background: #fff;
  cursor: pointer;
  white-space: nowrap;
}

.refund-page__btn:hover {
  background: #f6f6f9;
}

.refund-page__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refund-page__btn--approve {
  border-color: #c3e6cb;
  color: #1e7a33;
}

.refund-page__btn--approve:hover {
  background: #f0faf3;
}

.refund-page__btn--reject {
  border-color: #ffd3c7;
  color: #c72e3a;
}

.refund-page__btn--reject:hover {
  background: #fff5f2;
}

.refund-page__empty {
  padding: 40px 20px;
  text-align: center;
  color: #666687;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.refund-page__error {
  color: #c72e3a;
  margin: 12px 0 0;
  font-size: 0.8125rem;
  line-height: 1rem;
}

.refund-page__success {
  color: #328048;
  font-size: 0.75rem;
  font-weight: 600;
}

.refund-page__loading {
  padding: 40px 20px;
  text-align: center;
  color: #8e8ea9;
  font-size: 0.875rem;
}

@media (max-width: 960px) {
  .refund-page {
    padding: 20px 16px 48px;
  }
}
`;

function coerceJson(responseText) {
  if (!responseText) return null;
  try { return JSON.parse(responseText); } catch { return null; }
}

async function fetchAdminJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const responseText = await response.text();
  const payload = coerceJson(responseText);
  if (!response.ok) {
    const message = payload?.error || payload?.message || responseText || `Request failed (${response.status}).`;
    throw new Error(message);
  }
  return payload;
}

function formatBookingDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function formatCurrency(amountMinor, currency = 'gbp') {
  const value = Number(amountMinor || 0) / 100;
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: String(currency || 'gbp').toUpperCase(),
    }).format(value);
  } catch {
    return `\u00A3${value.toFixed(2)}`;
  }
}

function formatTimeAgo(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatBookingDate(value);
}

export default function RefundRequests() {
  const [tab, setTab] = useState('pending');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [processedRequests, setProcessedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState('');
  const [successMap, setSuccessMap] = useState({});

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setLoading(true);
      try {
        const [pendingPayload, processedPayload] = await Promise.all([
          fetchAdminJson('/admin/api/admin/bookings/refund-requests'),
          fetchAdminJson('/admin/api/admin/bookings/refund-requests?status=processed'),
        ]);
        if (isActive) {
          setPendingRequests(Array.isArray(pendingPayload?.data) ? pendingPayload.data : []);
          setProcessedRequests(Array.isArray(processedPayload?.data) ? processedPayload.data : []);
        }
      } catch (err) {
        // processed endpoint may not exist yet, just load pending
        try {
          const pendingPayload = await fetchAdminJson('/admin/api/admin/bookings/refund-requests');
          if (isActive) {
            setPendingRequests(Array.isArray(pendingPayload?.data) ? pendingPayload.data : []);
          }
        } catch (innerErr) {
          if (isActive) setError(innerErr?.message || 'Unable to load refund requests.');
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    load();
    return () => { isActive = false; };
  }, []);

  const handleApprove = async (request) => {
    if (!request?.id) return;
    const targetId = Number(request.id);
    setProcessingId(targetId);
    setError('');

    try {
      await fetchAdminJson(`/admin/api/admin/bookings/${targetId}/approve-refund`, { method: 'POST' });
      setSuccessMap((prev) => ({ ...prev, [targetId]: 'approved' }));
      setTimeout(() => {
        setPendingRequests((prev) => prev.filter((r) => r.id !== targetId));
        setProcessedRequests((prev) => [{ ...request, refundRequestStatus: 'approved' }, ...prev]);
        setSuccessMap((prev) => { const next = { ...prev }; delete next[targetId]; return next; });
      }, 1200);
    } catch (err) {
      setError(err?.message || 'Unable to approve refund.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (request) => {
    if (!request?.id) return;
    const targetId = Number(request.id);
    setProcessingId(targetId);
    setError('');

    try {
      await fetchAdminJson(`/admin/api/admin/bookings/${targetId}/reject-refund`, { method: 'POST' });
      setSuccessMap((prev) => ({ ...prev, [targetId]: 'rejected' }));
      setTimeout(() => {
        setPendingRequests((prev) => prev.filter((r) => r.id !== targetId));
        setProcessedRequests((prev) => [{ ...request, refundRequestStatus: 'rejected' }, ...prev]);
        setSuccessMap((prev) => { const next = { ...prev }; delete next[targetId]; return next; });
      }, 1200);
    } catch (err) {
      setError(err?.message || 'Unable to reject refund request.');
    } finally {
      setProcessingId(null);
    }
  };

  const activeList = tab === 'pending' ? pendingRequests : processedRequests;

  return (
    <>
      <style>{STYLES}</style>
      <div className="refund-page">
        <div className="refund-page__inner">
          <p className="refund-page__eyebrow">Operations</p>
          <h1 className="refund-page__title">Refund Requests</h1>
          <p className="refund-page__subtitle">
            Review and manage refund requests from members for meeting room bookings and memberships.
          </p>

          <div className="refund-page__tabs">
            <button
              type="button"
              className={`refund-page__tab${tab === 'pending' ? ' refund-page__tab--active' : ''}`}
              onClick={() => setTab('pending')}
            >
              Pending
              {pendingRequests.length > 0 && (
                <span className="refund-page__badge">{pendingRequests.length}</span>
              )}
            </button>
            <button
              type="button"
              className={`refund-page__tab${tab === 'processed' ? ' refund-page__tab--active' : ''}`}
              onClick={() => setTab('processed')}
            >
              Processed
              {processedRequests.length > 0 && (
                <span className="refund-page__badge refund-page__badge--muted">{processedRequests.length}</span>
              )}
            </button>
          </div>

          {loading ? (
            <div className="refund-page__loading">Loading refund requests...</div>
          ) : activeList.length === 0 ? (
            <div className="refund-page__table-wrap">
              <div className="refund-page__empty">
                {tab === 'pending' ? 'No pending refund requests.' : 'No processed refund requests yet.'}
              </div>
            </div>
          ) : (
            <div className="refund-page__table-wrap">
              <table className="refund-page__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Resource</th>
                    <th>Booking date</th>
                    <th>Amount</th>
                    <th>Requested</th>
                    {tab === 'processed' && <th>Status</th>}
                    {tab === 'pending' && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {activeList.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>
                        <div className="refund-page__name">{request.userName}</div>
                        <div className="refund-page__email">{request.userEmail}</div>
                      </td>
                      <td>{request.resourceName || '-'}</td>
                      <td>{formatBookingDate(request.startAt)}</td>
                      <td>
                        <span className="refund-page__amount">
                          {formatCurrency(request.totalMinor, request.currency)}
                        </span>
                      </td>
                      <td>{formatTimeAgo(request.refundRequestedAt)}</td>
                      {tab === 'processed' && (
                        <td>
                          <span className={`refund-page__status-badge refund-page__status-badge--${request.refundRequestStatus || 'pending'}`}>
                            {request.refundRequestStatus === 'approved' ? 'Approved' : request.refundRequestStatus === 'rejected' ? 'Rejected' : request.refundRequestStatus || '-'}
                          </span>
                        </td>
                      )}
                      {tab === 'pending' && (
                        <td>
                          {successMap[request.id] ? (
                            <span className="refund-page__success">
                              {successMap[request.id] === 'approved' ? '✓ Approved' : '✕ Rejected'}
                            </span>
                          ) : (
                            <div className="refund-page__actions">
                              <button
                                type="button"
                                className="refund-page__btn refund-page__btn--approve"
                                onClick={() => handleApprove(request)}
                                disabled={processingId === request.id}
                              >
                                {processingId === request.id ? 'Processing...' : '✓ Approve'}
                              </button>
                              <button
                                type="button"
                                className="refund-page__btn refund-page__btn--reject"
                                onClick={() => handleReject(request)}
                                disabled={processingId === request.id}
                              >
                                {processingId === request.id ? 'Processing...' : '✕ Reject'}
                              </button>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {error ? <div className="refund-page__error">{error}</div> : null}
        </div>
      </div>
    </>
  );
}
