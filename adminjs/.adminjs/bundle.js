(function (React, reactRouter, adminjs, designSystem, reactRedux) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const PRIMARY_PAGES = [{
    label: 'Homepage',
    href: '/admin/pages/homepage'
  }, {
    label: 'About Page',
    href: '/admin/pages/about-page'
  }, {
    label: 'Pricing Page',
    href: '/admin/pages/pricing-page'
  }, {
    label: 'Contact Page',
    href: '/admin/pages/contact-page'
  }];
  const COLLECTIONS = [{
    label: 'Blog Posts',
    href: '/admin/pages/blog-posts'
  }, {
    label: 'FAQ Items',
    href: '/admin/pages/faq-items'
  }, {
    label: 'Meeting Rooms',
    href: '/admin/pages/meeting-rooms'
  }, {
    label: 'Pricing Plans',
    href: '/admin/pages/pricing-plans'
  }];
  const STYLES$5 = `
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
  const api$1 = new adminjs.ApiClient();
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
      timeStyle: 'short'
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
        ...(options.headers || {})
      }
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
      createdAt: params.createdAt ?? params.created_at ?? null
    };
  }
  function normalizeResourceSubmissionPayload(response) {
    if (!Array.isArray(response?.records)) {
      return [];
    }
    return response.records.map(record => normalizeSubmissionRecord(record?.params ?? {})).filter(submission => Number.isFinite(submission.id));
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
      credentials: 'same-origin'
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
    const normalizeCustomResponse = response => normalizeAdminSubmissionPayload(response);
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
      const customPayload = await fetchAdminJson(`/admin/api/contact-submissions/${parsedId}`, {
        method: 'DELETE'
      });
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
        Accept: 'application/json'
      }
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
  function ShortcutList({
    title,
    items,
    navigate,
    meta
  }) {
    return /*#__PURE__*/React__default.default.createElement("section", {
      className: "admin-dashboard__card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__card-head"
    }, /*#__PURE__*/React__default.default.createElement("h2", {
      className: "admin-dashboard__card-title"
    }, title)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__card-body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__list"
    }, items.map(item => /*#__PURE__*/React__default.default.createElement("button", {
      key: item.href,
      className: "admin-dashboard__item",
      type: "button",
      onClick: () => navigate(item.href)
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__item-copy"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__item-label"
    }, item.label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__item-meta"
    }, meta)), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-dashboard__item-arrow"
    }, "\u2192"))))));
  }
  function MessagesCard({
    submissions,
    selectedSubmission,
    onOpen,
    onDelete,
    deletingId,
    operationError
  }) {
    return /*#__PURE__*/React__default.default.createElement("section", {
      className: "admin-dashboard__card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__card-head"
    }, /*#__PURE__*/React__default.default.createElement("h2", {
      className: "admin-dashboard__card-title"
    }, "Customer Messages")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__card-body"
    }, submissions.length ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__messages"
    }, submissions.map(submission => /*#__PURE__*/React__default.default.createElement("article", {
      key: submission.id,
      className: "admin-dashboard__message"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__message-head"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__message-name"
    }, submission.name), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__message-email"
    }, submission.email), submission.phone ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__message-meta"
    }, submission.phone) : null), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__message-meta"
    }, submission.sourcePage, formatSubmissionDate(submission.createdAt) ? ` · ${formatSubmissionDate(submission.createdAt)}` : '')), /*#__PURE__*/React__default.default.createElement("p", {
      className: "admin-dashboard__message-body"
    }, trimMessage(submission.message)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__message-actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      className: "admin-dashboard__button",
      onClick: () => onOpen(submission)
    }, "Open"), /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      className: "admin-dashboard__button admin-dashboard__button--danger",
      onClick: () => onDelete(submission),
      disabled: deletingId === submission.id
    }, deletingId === submission.id ? 'Deleting…' : 'Delete')))), selectedSubmission ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__detail"
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      className: "admin-dashboard__detail-heading"
    }, "Selected message"), /*#__PURE__*/React__default.default.createElement("p", {
      className: "admin-dashboard__detail-body"
    }, selectedSubmission.message), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__detail-actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      className: "admin-dashboard__button",
      onClick: () => onOpen(null)
    }, "Close"), /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      className: "admin-dashboard__button admin-dashboard__button--danger",
      onClick: () => onDelete(selectedSubmission),
      disabled: deletingId === selectedSubmission.id
    }, deletingId === selectedSubmission.id ? 'Deleting…' : 'Delete'))) : null) : /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__empty"
    }, "No customer messages yet."), operationError ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__error"
    }, operationError) : null));
  }
  function Dashboard(props) {
    const navigate = reactRouter.useNavigate();
    const [dashboardSubmissions, setDashboardSubmissions] = React.useState(getRecentSubmissions(props));
    const [selectedSubmission, setSelectedSubmission] = React.useState(null);
    const [deletingId, setDeletingId] = React.useState(null);
    const [operationError, setOperationError] = React.useState('');
    React.useEffect(() => {
      const initialSubmissions = getRecentSubmissions(props);
      if (initialSubmissions.length) {
        setDashboardSubmissions(initialSubmissions);
      }
    }, [props]);
    React.useEffect(() => {
      let isActive = true;
      const loadDashboardData = async () => {
        const assignSubmissions = nextSubmissions => {
          if (!isActive || !Array.isArray(nextSubmissions)) {
            return;
          }
          setDashboardSubmissions(nextSubmissions);
        };
        try {
          const dashboardResponse = await api$1.getDashboard();
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
    const handleOpenSubmission = async submission => {
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
    const handleDeleteSubmission = async submission => {
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
        setDashboardSubmissions(previous => previous.filter(item => item.id !== targetId));
        setSelectedSubmission(previous => previous?.id === targetId ? null : previous);
      } catch (error) {
        setOperationError(error?.message || 'Unable to delete submission.');
      } finally {
        setDeletingId(null);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$5), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__inner"
    }, /*#__PURE__*/React__default.default.createElement("p", {
      className: "admin-dashboard__eyebrow"
    }, "Home"), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "admin-dashboard__title"
    }, "Content Manager"), /*#__PURE__*/React__default.default.createElement("p", {
      className: "admin-dashboard__subtitle"
    }, "Use the shortcuts below to jump into single pages and collection content for the live site."), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__grid"
    }, /*#__PURE__*/React__default.default.createElement(ShortcutList, {
      title: "Single Types",
      items: PRIMARY_PAGES,
      navigate: navigate,
      meta: "Edit structured page content"
    }), /*#__PURE__*/React__default.default.createElement("section", {
      className: "admin-dashboard__card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__card-head"
    }, /*#__PURE__*/React__default.default.createElement("h2", {
      className: "admin-dashboard__card-title"
    }, "Workspace")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__notice"
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      className: "admin-dashboard__notice-title"
    }, "Production content workspace"), /*#__PURE__*/React__default.default.createElement("p", {
      className: "admin-dashboard__notice-copy"
    }, "client@leadenhallworks.com"))), /*#__PURE__*/React__default.default.createElement(ShortcutList, {
      title: "Collections",
      items: COLLECTIONS,
      navigate: navigate,
      meta: "Manage repeatable content"
    }), /*#__PURE__*/React__default.default.createElement(MessagesCard, {
      submissions: submissions,
      selectedSubmission: selectedSubmission,
      onOpen: handleOpenSubmission,
      onDelete: handleDeleteSubmission,
      deletingId: deletingId,
      operationError: operationError
    })))));
  }

  const MULTILINE_FIELD_PATTERN$1 = /(description|content|message|body|subtitle|excerpt|intro|hours|address|text|paragraph|overview|challenge|result|answer)/i;
  const IMAGE_FIELD_PATTERN$1 = /(image|coverImage|contentImages)/i;
  const BOOLEAN_FIELD_PATTERN = /^(featured|isFeatured|isPopular)$/i;
  const FULL_WIDTH_FIELD_PATTERN$1 = /(description|content|answer|excerpt|contentImages|coverImage|image|features|badges|tags)$/i;
  const STYLES$4 = `
.admin-editor {
  min-height: 100%;
  padding: 32px 40px 64px 344px;
  background: #f6f6f9;
  color: #32324d;
}
.admin-editor__inner {
  max-width: 1240px;
  margin: 0 auto;
}
.admin-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: .875rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 14px;
}
.admin-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 12px;
}
.admin-meta {
  margin-bottom: 4px;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.admin-title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
}
.admin-status {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0 .75rem;
  margin-top: 14px;
  border: 1px solid #c6f0c2;
  border-radius: 4px;
  background: #efffed;
  color: #2f6846;
  font-size: .8125rem;
  font-weight: 600;
}
.admin-kebab {
  width: 2rem;
  height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
}
.admin-tabs {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eaeaef;
}
.admin-tab {
  position: relative;
  border: 0;
  background: transparent;
  padding: 0 0 12px;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
}
.admin-tab--active { color: #4945ff; }
.admin-tab--active::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -1px;
  height: 2px;
  background: #4945ff;
}
.admin-layout {
  display: grid;
  grid-template-columns: minmax(0,1fr) 232px;
  gap: 16px;
  align-items: start;
}
.admin-main-card,.admin-side-card,.admin-list-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(33,33,52,.06);
}
.admin-main-card { padding: 24px; }
.admin-side-card + .admin-side-card { margin-top: 12px; }
.admin-side-card__head {
  padding: 14px 16px 8px;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.admin-side-card__body { padding: 0 12px 12px; }
.admin-side-button-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  position: relative;
}
.admin-side-button,.admin-side-button--secondary {
  width: 100%;
  min-height: 2.25rem;
  border-radius: 4px;
  font-size: .8125rem;
  font-weight: 600;
}
.admin-side-button {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #fff;
}
.admin-side-button--secondary {
  border: 1px solid #dcdce4;
  background: #fff;
  color: #32324d;
}
.admin-side-button:disabled,
.admin-side-button--secondary:disabled,
.admin-primary:disabled,
.admin-secondary:disabled {
  border-color: #dcdce4;
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}
.admin-side-action-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(33,33,52,.12);
  padding: 8px 0;
  z-index: 40;
}
.admin-side-action-menu__item {
  width: 100%;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #32324d;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  text-align: left;
}
.admin-side-action-menu__item:hover {
  background: #f6f6f9;
}
.admin-side-action-menu__item--danger {
  color: #d02b20;
}
.admin-side-action-menu__item:disabled {
  background: transparent;
  color: #8e8ea9;
  cursor: not-allowed;
}
.admin-side-action-menu__icon {
  width: 18px;
  color: inherit;
  text-align: center;
}
.admin-side-button--menu {
  width: 2rem;
  flex: 0 0 2rem;
}
.admin-section + .admin-section { margin-top: 20px; }
.admin-field-grid {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 20px 24px;
}
.admin-field--full { grid-column: 1 / -1; }
.admin-label {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 6px;
  color: #32324d;
  font-size: .75rem;
  font-weight: 600;
}
.admin-label__required { color: #d02b20; }
.admin-input,.admin-textarea,.admin-search-input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  color: #32324d;
  padding: .625rem .875rem;
  font-size: .875rem;
  line-height: 1.25rem;
  outline: none;
}
.admin-input { min-height: 2.5rem; }
.admin-textarea { min-height: 5.75rem; resize: vertical; }
.admin-input:focus,.admin-textarea:focus,.admin-search-input:focus {
  border-color: #4945ff;
  box-shadow: 0 0 0 1px #4945ff;
}
.admin-input:disabled,
.admin-textarea:disabled {
  background: #f6f6f9;
  color: #666687;
  cursor: not-allowed;
}
.admin-repeatable {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}
.admin-repeatable__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 10px;
  border-bottom: 1px solid #f0f0f5;
}
.admin-repeatable__title { font-size: .75rem; font-weight: 600; }
.admin-repeatable__count { color: #8e8ea9; font-size: .75rem; }
.admin-repeatable__item + .admin-repeatable__item { border-top: 1px solid #f0f0f5; }
.admin-repeatable__item--drag-over summary { background: #f0f0ff; }
.admin-repeatable__summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
}
.admin-repeatable__summary::-webkit-details-marker { display: none; }
.admin-repeatable__summary-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.admin-repeatable__bullet {
  width: 20px; height: 20px;
  border-radius: 999px;
  background: #f0f0f5;
  color: #666687;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: .625rem;
}
.admin-repeatable__name { font-size: .875rem; font-weight: 600; }
.admin-repeatable__actions {
  display: flex; align-items: center; gap: 10px;
  color: #8e8ea9;
}
.admin-repeatable__icon-button {
  border: 0; background: transparent; color: inherit; cursor: pointer;
}
.admin-repeatable__drag-handle {
  border: 0;
  background: transparent;
  color: #8e8ea9;
  cursor: grab;
  padding: 0 2px;
  font-size: 1rem;
  line-height: 1;
}
.admin-repeatable__drag-handle:active { cursor: grabbing; }
.admin-repeatable__drag-handle:disabled {
  color: #c4c4d2;
  cursor: not-allowed;
}
.admin-repeatable__icon-button:disabled,
.admin-repeatable__add:disabled {
  color: #8e8ea9;
  cursor: not-allowed;
}
.admin-repeatable__body { padding: 16px; }
.admin-repeatable__add {
  width: 100%;
  border: 0;
  border-top: 1px solid #f0f0f5;
  background: #fff;
  color: #4945ff;
  font-size: .875rem;
  font-weight: 600;
  padding: 14px 16px;
  cursor: pointer;
}
.admin-repeatable__image-preview {
  margin-top: 10px;
}
.admin-repeatable__image-preview .admin-media__thumb {
  max-width: 280px;
  max-height: 180px;
}
.admin-toggle {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .625rem .875rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
}
.admin-field--boolean .admin-toggle {
  width: auto;
  min-width: 180px;
  justify-content: flex-start;
  gap: 10px;
}
.admin-toggle:has(input:disabled) {
  background: #f6f6f9;
  color: #666687;
}
.admin-media {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  padding: 16px;
}
.admin-media__canvas {
  min-height: 140px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fafafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.admin-media__stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.admin-media__thumb {
  max-width: 240px;
  max-height: 140px;
  object-fit: cover;
}
.admin-media__actions {
  display: flex;
  gap: 4px;
}
.admin-media__action {
  width: 2rem; height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
}
.admin-media__action:disabled {
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}
.admin-media__filename { color: #666687; font-size: .75rem; }
.admin-media__source { margin-top: 10px; }
.admin-media__source-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
.admin-media__upload-button {
  min-height: 2rem;
  padding: 0 0.75rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  color: #32324d;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.admin-media__upload-button:disabled {
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}
.admin-media__error {
  color: #d02b20;
  font-size: 0.75rem;
  line-height: 1rem;
}
.admin-list-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}
.admin-list-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}
.admin-search-wrap { width: 280px; }
.admin-list-meta {
  margin: 12px 0 32px;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.admin-toolbar-cluster {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}
.admin-toolbar-button {
  min-height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  color: #32324d;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}
.admin-toolbar-button--icon {
  width: 2.5rem;
  padding: 0;
}
.admin-toolbar-button--active {
  border-color: #4945ff;
  color: #4945ff;
}
.admin-toolbar-search {
  width: 280px;
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  padding: 0 0.875rem;
  font-size: 0.875rem;
}
.admin-list-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  max-height: 420px;
  overflow: auto;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(33,33,52,.12);
  padding: 16px;
  z-index: 20;
}
.admin-list-popover__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}
.admin-list-popover__title {
  font-size: 1rem;
  font-weight: 700;
}
.admin-list-popover__reset {
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
}
.admin-list-popover__group + .admin-list-popover__group {
  margin-top: 16px;
}
.admin-list-popover__label {
  display: block;
  margin-bottom: 8px;
  color: #666687;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.admin-list-popover__select {
  width: 100%;
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  padding: 0 0.75rem;
  font-size: 0.875rem;
}
.admin-list-popover__check {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: 0.875rem;
}
.admin-list-popover__check input {
  width: 1.25rem;
  height: 1.25rem;
}
.admin-list-card__head {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.admin-list-table {
  width: 100%;
  border-collapse: collapse;
}
.admin-list-table th {
  padding: 10px 16px;
  text-align: left;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.admin-list-table td {
  padding: 14px 16px;
  border-top: 1px solid #f0f0f5;
  font-size: .875rem;
  vertical-align: middle;
}
.admin-list-row-menu-cell {
  position: relative;
  width: 44px;
}
.admin-list-row-menu-trigger {
  width: 2rem;
  height: 2rem;
  border: 0;
  background: transparent;
  color: #8e8ea9;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}
.admin-list-row-menu {
  position: absolute;
  top: calc(100% - 6px);
  right: 0;
  width: 220px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(33,33,52,.12);
  padding: 8px 0;
  z-index: 24;
}
.admin-list-row-menu__item {
  width: 100%;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #32324d;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  text-align: left;
}
.admin-list-row-menu__item:hover {
  background: #f6f6f9;
}
.admin-list-row-menu__item--danger {
  color: #d02b20;
}
.admin-list-row-menu__icon {
  width: 18px;
  color: inherit;
  text-align: center;
}
.admin-list-table th button {
  border: 0;
  background: transparent;
  padding: 0;
  color: inherit;
  font: inherit;
  text-transform: inherit;
  cursor: pointer;
}
.admin-list-table tr { cursor: pointer; }
.admin-list-table tr:hover { background: #fafafb; }
.admin-list-status {
  display: inline-flex;
  align-items: center;
  min-height: 1.75rem;
  padding: 0 .625rem;
  border-radius: 999px;
  background: #efffed;
  color: #2f6846;
  font-size: .75rem;
  font-weight: 600;
}
.admin-primary {
  min-height: 2.25rem;
  padding: 0 .875rem;
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #fff;
  border-radius: 4px;
  font-size: .8125rem;
  font-weight: 600;
  cursor: pointer;
}
.admin-secondary {
  min-height: 2.25rem;
  padding: 0 .875rem;
  border: 1px solid #dcdce4;
  background: #fff;
  color: #32324d;
  border-radius: 4px;
  font-size: .8125rem;
  font-weight: 600;
  cursor: pointer;
}
.admin-list-boolean {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  font-size: 0.625rem;
  font-weight: 700;
}
.admin-list-boolean--yes {
  background: #2f6846;
  color: #fff;
}
.admin-list-boolean--no {
  background: #d02b20;
  color: #fff;
}
@media (max-width: 1180px) {
  .admin-layout { grid-template-columns: 1fr; }
}
@media (max-width: 960px) {
  .admin-editor { padding: 20px 16px 48px; }
  .admin-field-grid { grid-template-columns: 1fr; }
  .admin-list-toolbar { flex-direction: column; align-items: stretch; }
  .admin-search-wrap { width: 100%; }
}
`;
  function toLabel$1(name) {
    return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/\bfaq\b/gi, 'FAQ').replace(/^./, v => v.toUpperCase());
  }
  function cloneValue$1(value) {
    return JSON.parse(JSON.stringify(value));
  }
  function getEmptyItem$1(sample) {
    if (Array.isArray(sample)) {
      return [];
    }
    if (sample && typeof sample === 'object') {
      return Object.fromEntries(Object.keys(sample).map(key => {
        if (['id', 'documentId', 'status', 'updatedAt', 'publishedAt'].includes(key)) {
          return [key, sample[key] ?? null];
        }
        return [key, getEmptyItem$1(sample[key])];
      }));
    }
    if (typeof sample === 'boolean') {
      return false;
    }
    if (typeof sample === 'number') {
      return 0;
    }
    return '';
  }
  function toComparableValue$1(value) {
    if (Array.isArray(value)) {
      return value.map(item => toComparableValue$1(item));
    }
    if (value && typeof value === 'object') {
      return Object.keys(value).sort().filter(key => !['updatedAt', 'publishedAt', 'status'].includes(key)).reduce((accumulator, key) => {
        accumulator[key] = toComparableValue$1(value[key]);
        return accumulator;
      }, {});
    }
    return value;
  }
  function hasMeaningfulValue$1(value) {
    if (Array.isArray(value)) {
      return value.some(item => hasMeaningfulValue$1(item));
    }
    if (value && typeof value === 'object') {
      return Object.entries(value).filter(([key]) => !['id', 'documentId', 'updatedAt', 'publishedAt', 'status'].includes(key)).some(([, nestedValue]) => hasMeaningfulValue$1(nestedValue));
    }
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    if (typeof value === 'number') {
      return value !== 0;
    }
    if (typeof value === 'boolean') {
      return value;
    }
    return value != null;
  }
  function buildAdminPath(pathname, params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.set(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    return `${pathname}${queryString ? `?${queryString}` : ''}`;
  }
  function parseDisplayedFields(value) {
    return String(value ?? '').split(',').map(field => field.trim()).filter(Boolean);
  }
  function parseInputValue$1(nextRawValue, currentValue) {
    if (typeof currentValue === 'number') {
      if (nextRawValue === '') {
        return 0;
      }
      const parsed = Number(nextRawValue);
      return Number.isNaN(parsed) ? currentValue : parsed;
    }
    return nextRawValue;
  }
  function getRepeatableItemValue(item) {
    if (typeof item === 'string') {
      return item;
    }
    if (item && typeof item === 'object') {
      return String(item.text ?? '');
    }
    return '';
  }
  function getMediaDisplayName(value, fallback = 'Uploaded image') {
    const raw = String(value ?? '').trim();
    if (!raw) {
      return fallback;
    }
    const normalized = raw.split('?')[0].split('#')[0];
    const parts = normalized.split('/').filter(Boolean);
    return parts[parts.length - 1] || fallback;
  }
  function withRepeatableItemValue(item, nextValue) {
    if (typeof item === 'string') {
      return nextValue;
    }
    if (item && typeof item === 'object') {
      return {
        ...item,
        text: nextValue
      };
    }
    return {
      text: nextValue
    };
  }
  function resolveMediaPreviewUrl$1(value) {
    if (!value) {
      return '';
    }
    const normalized = String(value).trim();
    if (!normalized) {
      return '';
    }
    if (/^https?:\/\//i.test(normalized)) {
      return normalized;
    }
    if (normalized.startsWith('//')) {
      return `https:${normalized}`;
    }
    if (normalized.startsWith('/uploads/') || normalized.startsWith('/admin-assets/')) {
      return `http://localhost:3001${normalized}`;
    }
    return normalized;
  }
  function updateAtPath$1(value, path, nextValue) {
    if (!path.length) {
      return nextValue;
    }
    const [segment, ...rest] = path;
    const clone = Array.isArray(value) ? [...value] : {
      ...value
    };
    clone[segment] = updateAtPath$1(value?.[segment], rest, nextValue);
    return clone;
  }
  function removeAtPath$1(value, path) {
    if (path.length === 1) {
      return Array.isArray(value) ? value.filter((_, index) => index !== path[0]) : value;
    }
    const [segment, ...rest] = path;
    const clone = Array.isArray(value) ? [...value] : {
      ...value
    };
    clone[segment] = removeAtPath$1(value?.[segment], rest);
    return clone;
  }
  function appendAtPath$1(value, path, nextItem) {
    if (!path.length) {
      return [...(Array.isArray(value) ? value : []), nextItem];
    }
    const [segment, ...rest] = path;
    const clone = Array.isArray(value) ? [...value] : {
      ...value
    };
    clone[segment] = appendAtPath$1(value?.[segment], rest, nextItem);
    return clone;
  }
  function moveAtPath$1(value, path, offset) {
    if (path.length === 1) {
      if (!Array.isArray(value)) {
        return value;
      }
      const index = path[0];
      const nextIndex = index + offset;
      if (nextIndex < 0 || nextIndex >= value.length) {
        return value;
      }
      const clone = [...value];
      const [moved] = clone.splice(index, 1);
      clone.splice(nextIndex, 0, moved);
      return clone;
    }
    const [segment, ...rest] = path;
    const clone = Array.isArray(value) ? [...value] : {
      ...value
    };
    clone[segment] = moveAtPath$1(value?.[segment], rest, offset);
    return clone;
  }
  function getDisplayTitle(definition, record) {
    if (!record) {
      return definition.label;
    }
    return record[definition.titleField] || definition.label;
  }
  function isBlogDisabledField(definition, field) {
    return definition?.name === 'blog-posts' && field === 'featured';
  }
  function isFaqDisabledField(definition, field) {
    return definition?.name === 'faq-items' && field === 'isFeatured';
  }
  function isMeetingRoomDisabledField(definition, field) {
    return definition?.name === 'meeting-rooms' && field === 'isFeatured';
  }
  function isVisibilityToggleField(definition, field) {
    return isBlogDisabledField(definition, field) || isFaqDisabledField(definition, field) || isMeetingRoomDisabledField(definition, field);
  }
  function getFieldDisplayLabel(definition, field) {
    if (isVisibilityToggleField(definition, field)) {
      return 'Visibility';
    }
    return toLabel$1(field);
  }
  async function requestPage(pageName, options = {}) {
    const searchParams = new URLSearchParams(options.query ?? {});
    const queryString = searchParams.toString();
    const response = await fetch(`/admin/api/pages/${pageName}${queryString ? `?${queryString}` : ''}`, {
      method: options.method ?? 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'same-origin'
    });
    const responseText = await response.text();
    let payload = null;
    try {
      payload = responseText ? JSON.parse(responseText) : {};
    } catch {
      payload = null;
    }
    if (!response.ok || !payload) {
      const trimmedText = responseText.trim().toLowerCase();
      const isHtml = trimmedText.startsWith('<!doctype') || trimmedText.startsWith('<html');
      const redirectedToLogin = response.redirected && response.url.includes('/admin/login');
      const isAuthError = response.status === 401 || response.status === 403 || redirectedToLogin;
      if (isAuthError) {
        throw new Error('Your admin session expired. Refresh and sign in again.');
      }
      if (payload?.message) {
        throw new Error(payload.message);
      }
      if (payload?.error) {
        throw new Error(payload.error);
      }
      if (isHtml) {
        throw new Error(`Server returned an HTML error page (${response.status || 'unknown'}). Check backend logs.`);
      }
      if (response.status) {
        throw new Error(`Request failed (${response.status}).`);
      }
      throw new Error('Request failed.');
    }
    return payload;
  }
  async function uploadAdminImage$2(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/admin/api/media/upload', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || 'Failed to upload image.');
    }
    const uploadedUrl = payload?.url || payload?.item?.relativeUrl || payload?.item?.url;
    if (!uploadedUrl) {
      throw new Error('Upload succeeded but returned no URL.');
    }
    return uploadedUrl;
  }
  const MEDIA_PICKER_EVENT$2 = 'adminjs-media-select';
  function chooseAdminLibraryImage$1() {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve('');
        return;
      }
      const pickerWindow = window.open('/admin/pages/media-library?picker=1', 'admin-media-library-picker', 'popup=yes,width=1440,height=900,resizable=yes,scrollbars=yes');
      if (!pickerWindow) {
        reject(new Error('Media library popup was blocked.'));
        return;
      }
      let finished = false;
      const cleanup = () => {
        window.removeEventListener('message', handleMessage);
        window.clearInterval(closeWatcher);
      };
      const handleMessage = event => {
        if (event.origin !== window.location.origin || event.source !== pickerWindow) {
          return;
        }
        if (event.data?.type !== MEDIA_PICKER_EVENT$2) {
          return;
        }
        finished = true;
        cleanup();
        resolve(typeof event.data.url === 'string' ? event.data.url : '');
      };
      const closeWatcher = window.setInterval(() => {
        if (pickerWindow.closed && !finished) {
          cleanup();
          resolve('');
        }
      }, 500);
      window.addEventListener('message', handleMessage);
    });
  }
  function MediaField({
    label,
    value,
    path,
    onChange,
    disabled
  }) {
    const urls = Array.isArray(value) ? value : [value].filter(Boolean);
    const fileInputRef = React.useRef(null);
    const [uploading, setUploading] = React.useState(false);
    const [uploadError, setUploadError] = React.useState('');
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field admin-field--full"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-label"
    }, label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__canvas"
    }, urls.length ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__stack"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      className: "admin-media__thumb",
      src: urls[0],
      alt: label
    }), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media__action",
      type: "button",
      onClick: () => window.open(urls[0], '_blank', 'noopener,noreferrer')
    }, "\u2197"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media__action",
      type: "button",
      disabled: disabled,
      onClick: () => onChange(path, Array.isArray(value) ? [] : '')
    }, "\u2715")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__filename"
    }, getMediaDisplayName(urls[0]))) : /*#__PURE__*/React__default.default.createElement("div", null, "No media selected.")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__source"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__source-actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media__upload-button",
      type: "button",
      disabled: disabled || uploading,
      onClick: () => fileInputRef.current?.click()
    }, uploading ? 'Uploading...' : 'Upload from computer'), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media__upload-button",
      type: "button",
      disabled: disabled || uploading,
      onClick: async () => {
        setUploadError('');
        try {
          const selectedUrl = await chooseAdminLibraryImage$1();
          if (!selectedUrl) {
            return;
          }
          if (Array.isArray(value)) {
            onChange(path, [...value, selectedUrl]);
          } else {
            onChange(path, selectedUrl);
          }
        } catch (error) {
          setUploadError(error?.message || 'Failed to choose image from media library.');
        }
      }
    }, "Choose from media library"), /*#__PURE__*/React__default.default.createElement("input", {
      ref: fileInputRef,
      type: "file",
      accept: "image/*",
      multiple: Array.isArray(value),
      style: {
        display: 'none'
      },
      onChange: async event => {
        const files = Array.from(event.target.files ?? []);
        event.target.value = '';
        if (!files.length) {
          return;
        }
        setUploadError('');
        setUploading(true);
        try {
          const uploadedUrls = [];
          for (const file of files) {
            const uploadedUrl = await uploadAdminImage$2(file);
            uploadedUrls.push(uploadedUrl);
          }
          if (Array.isArray(value)) {
            onChange(path, [...value, ...uploadedUrls]);
          } else {
            onChange(path, uploadedUrls[0] || '');
          }
        } catch (error) {
          setUploadError(error?.message || 'Failed to upload image.');
        } finally {
          setUploading(false);
        }
      }
    })), uploadError ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__error"
    }, uploadError) : null)));
  }
  function PrimitiveField$1({
    definition,
    field,
    value,
    path,
    onChange,
    disabled
  }) {
    const label = getFieldDisplayLabel(definition, field);
    if (IMAGE_FIELD_PATTERN$1.test(field)) {
      return /*#__PURE__*/React__default.default.createElement(MediaField, {
        label: label,
        value: value,
        path: path,
        onChange: onChange,
        disabled: disabled
      });
    }
    if (BOOLEAN_FIELD_PATTERN.test(field)) {
      const isDisabledField = isVisibilityToggleField(definition, field);
      return /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-field admin-field--boolean"
      }, /*#__PURE__*/React__default.default.createElement("label", {
        className: "admin-label"
      }, label), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-toggle"
      }, /*#__PURE__*/React__default.default.createElement("span", null, isDisabledField ? 'Hide on website' : value ? 'Active' : 'Disabled'), /*#__PURE__*/React__default.default.createElement("input", {
        type: "checkbox",
        checked: Boolean(value),
        disabled: disabled,
        onChange: event => onChange(path, event.target.checked)
      })));
    }
    const className = FULL_WIDTH_FIELD_PATTERN$1.test(field) ? 'admin-field admin-field--full' : 'admin-field';
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: className
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-label"
    }, label, field !== 'sortOrder' && !BOOLEAN_FIELD_PATTERN.test(field) ? /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-label__required"
    }, "*") : null), MULTILINE_FIELD_PATTERN$1.test(field) ? /*#__PURE__*/React__default.default.createElement("textarea", {
      className: "admin-textarea",
      value: value ?? '',
      disabled: disabled,
      onChange: event => onChange(path, parseInputValue$1(event.target.value, value))
    }) : /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-input",
      type: typeof value === 'number' ? 'number' : 'text',
      value: value ?? '',
      disabled: disabled,
      onChange: event => onChange(path, parseInputValue$1(event.target.value, value))
    }));
  }
  function ArrayField$1({
    field,
    value,
    path,
    onChange,
    onAddItem,
    onRemoveItem,
    onMoveItem,
    disabled
  }) {
    const label = toLabel$1(field);
    const items = Array.isArray(value) ? value : [];
    const isImageArray = IMAGE_FIELD_PATTERN$1.test(field);
    const [dragIndex, setDragIndex] = React.useState(null);
    const [dragOverIndex, setDragOverIndex] = React.useState(null);
    const [uploadingIndex, setUploadingIndex] = React.useState(null);
    const [uploadError, setUploadError] = React.useState('');
    const fileInputRefs = React.useRef({});
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field admin-field--full"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-label"
    }, label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__head"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__title"
    }, label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__count"
    }, items.length, " entries"))), items.map((item, index) => /*#__PURE__*/React__default.default.createElement("details", {
      key: `${field}-${index}`,
      className: `admin-repeatable__item${dragOverIndex === index ? ' admin-repeatable__item--drag-over' : ''}`,
      open: index === 0,
      onDragOver: event => {
        if (disabled || dragIndex === null) {
          return;
        }
        event.preventDefault();
        if (dragOverIndex !== index) {
          setDragOverIndex(index);
        }
      },
      onDrop: event => {
        if (disabled || dragIndex === null) {
          return;
        }
        event.preventDefault();
        const offset = index - dragIndex;
        if (offset !== 0) {
          onMoveItem([...path, dragIndex], offset);
        }
        setDragIndex(null);
        setDragOverIndex(null);
      },
      onDragLeave: () => {
        if (dragOverIndex === index) {
          setDragOverIndex(null);
        }
      }
    }, /*#__PURE__*/React__default.default.createElement("summary", {
      className: "admin-repeatable__summary"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__summary-left"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-repeatable__bullet"
    }, "\u25BC"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-repeatable__name"
    }, isImageArray ? `Image ${index + 1}` : typeof item === 'string' ? item || `${label} ${index + 1}` : item?.text || `${label} ${index + 1}`)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-repeatable__icon-button",
      type: "button",
      disabled: disabled,
      onClick: event => {
        event.preventDefault();
        event.stopPropagation();
        onRemoveItem([...path, index]);
      },
      "aria-label": "Delete"
    }, "\uD83D\uDDD1"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-repeatable__drag-handle",
      type: "button",
      draggable: !disabled,
      disabled: disabled,
      title: "Drag to reorder",
      onClick: event => {
        event.preventDefault();
        event.stopPropagation();
      },
      onDragStart: event => {
        if (disabled) {
          return;
        }
        event.stopPropagation();
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', String(index));
        setDragIndex(index);
        setDragOverIndex(index);
      },
      onDragEnd: () => {
        setDragIndex(null);
        setDragOverIndex(null);
      }
    }, "\u22EE\u22EE"))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field-grid"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field admin-field--full"
    }, isImageArray ? null : /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-label"
    }, label === 'Tags' ? 'Text' : label.slice(0, -1) || label), isImageArray ? null : /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-input",
      value: getRepeatableItemValue(item),
      disabled: disabled,
      onChange: event => {
        onChange([...path, index], withRepeatableItemValue(item, event.target.value));
      }
    }), isImageArray && resolveMediaPreviewUrl$1(getRepeatableItemValue(item)) ? /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__canvas admin-repeatable__image-preview"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      className: "admin-media__thumb",
      src: resolveMediaPreviewUrl$1(getRepeatableItemValue(item)),
      alt: `${label} ${index + 1}`
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__source-actions",
      style: {
        marginTop: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media__action",
      type: "button",
      onClick: () => window.open(resolveMediaPreviewUrl$1(getRepeatableItemValue(item)), '_blank', 'noopener,noreferrer')
    }, "\u2197"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media__action",
      type: "button",
      disabled: disabled,
      onClick: () => onChange([...path, index], withRepeatableItemValue(item, ''))
    }, "\u2715"))) : null, isImageArray ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__source-actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media__upload-button",
      type: "button",
      disabled: disabled || uploadingIndex === index,
      onClick: () => fileInputRefs.current[index]?.click()
    }, uploadingIndex === index ? 'Uploading...' : 'Upload from computer'), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media__upload-button",
      type: "button",
      disabled: disabled || uploadingIndex === index,
      onClick: async () => {
        setUploadError('');
        setUploadingIndex(index);
        try {
          const selectedUrl = await chooseAdminLibraryImage$1();
          if (selectedUrl) {
            onChange([...path, index], withRepeatableItemValue(item, selectedUrl));
          }
        } catch (error) {
          setUploadError(error?.message || 'Failed to choose image from media library.');
        } finally {
          setUploadingIndex(null);
        }
      }
    }, uploadingIndex === index ? 'Choosing...' : 'Choose from media library'), /*#__PURE__*/React__default.default.createElement("input", {
      ref: element => {
        if (element) {
          fileInputRefs.current[index] = element;
        } else {
          delete fileInputRefs.current[index];
        }
      },
      type: "file",
      accept: "image/*",
      style: {
        display: 'none'
      },
      onChange: async event => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) {
          return;
        }
        setUploadError('');
        setUploadingIndex(index);
        try {
          const uploadedUrl = await uploadAdminImage$2(file);
          onChange([...path, index], withRepeatableItemValue(item, uploadedUrl));
        } catch (error) {
          setUploadError(error?.message || 'Failed to upload image.');
        } finally {
          setUploadingIndex(null);
        }
      }
    })) : null))))), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-repeatable__add",
      type: "button",
      disabled: disabled,
      onClick: () => onAddItem(path, {
        text: ''
      })
    }, "+ Add an entry"), uploadError ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__error",
      style: {
        padding: '10px 16px 14px'
      }
    }, uploadError) : null));
  }
  function FieldRenderer$1({
    definition,
    field,
    value,
    path,
    onChange,
    onAddItem,
    onRemoveItem,
    onMoveItem,
    disabled
  }) {
    if (Array.isArray(value)) {
      return /*#__PURE__*/React__default.default.createElement(ArrayField$1, {
        field: field,
        value: value,
        path: path,
        onChange: onChange,
        onAddItem: onAddItem,
        onRemoveItem: onRemoveItem,
        onMoveItem: onMoveItem,
        disabled: disabled
      });
    }
    return /*#__PURE__*/React__default.default.createElement(PrimitiveField$1, {
      definition: definition,
      field: field,
      value: value,
      path: path,
      onChange: onChange,
      disabled: disabled
    });
  }
  function renderListCell(field, value) {
    if (field === 'status') {
      return /*#__PURE__*/React__default.default.createElement("span", {
        className: "admin-list-status"
      }, value);
    }
    if ((field === 'featured' || field === 'isFeatured' || field === 'isPopular') && (value === 'Yes' || value === 'No')) {
      return /*#__PURE__*/React__default.default.createElement("span", {
        className: `admin-list-boolean ${value === 'Yes' ? 'admin-list-boolean--yes' : 'admin-list-boolean--no'}`
      }, value === 'Yes' ? '✓' : '✕');
    }
    return value;
  }
  function ListView({
    definition,
    records,
    controls,
    search,
    loading,
    onSearch,
    onOpenRecord,
    onCreate,
    onSetSort,
    onSetFilter,
    onResetFilters,
    onToggleDisplayedField,
    onResetDisplayedFields,
    onDuplicateRecord,
    onDeleteRecord
  }) {
    const [showSearch, setShowSearch] = React.useState(Boolean(search));
    const [showFilters, setShowFilters] = React.useState(false);
    const [showDisplayed, setShowDisplayed] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState(search);
    const [openMenuId, setOpenMenuId] = React.useState(null);
    const menuRef = React.useRef(null);
    React.useEffect(() => {
      setSearchValue(search);
    }, [search]);
    React.useEffect(() => {
      const timeout = window.setTimeout(() => {
        if (searchValue !== search) {
          onSearch(searchValue);
        }
      }, 250);
      return () => window.clearTimeout(timeout);
    }, [onSearch, search, searchValue]);
    React.useEffect(() => {
      const handlePointerDown = event => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setOpenMenuId(null);
        }
      };
      document.addEventListener('mousedown', handlePointerDown);
      return () => document.removeEventListener('mousedown', handlePointerDown);
    }, []);
    const displayedColumns = React.useMemo(() => controls.availableFields.filter(field => controls.displayedFields.includes(field.field)), [controls.availableFields, controls.displayedFields]);
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-editor"
    }, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$4), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-editor__inner"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-header"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-meta"
    }, "Collection Type"), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "admin-title"
    }, definition.label)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-primary",
      type: "button",
      onClick: onCreate
    }, "+ Create new entry"))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-meta"
    }, records.length, " entries found"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-toolbar"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-toolbar-cluster"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-toolbar-button admin-toolbar-button--icon${showSearch ? ' admin-toolbar-button--active' : ''}`,
      type: "button",
      onClick: () => setShowSearch(current => !current)
    }, "\uD83D\uDD0D"), showSearch ? /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-toolbar-search",
      value: searchValue,
      onChange: event => setSearchValue(event.target.value),
      placeholder: "Search",
      autoFocus: true
    }) : null, /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-toolbar-button${showFilters ? ' admin-toolbar-button--active' : ''}`,
      type: "button",
      onClick: () => {
        setShowFilters(current => !current);
        setShowDisplayed(false);
      }
    }, "Filters"), showFilters ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-popover",
      style: {
        left: showSearch ? 332 : 52,
        right: 'auto'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-popover__head"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-popover__title"
    }, "Filters"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-list-popover__reset",
      type: "button",
      onClick: onResetFilters
    }, "Reset")), controls.filters.map(filter => /*#__PURE__*/React__default.default.createElement("div", {
      key: filter.field,
      className: "admin-list-popover__group"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-list-popover__label"
    }, filter.label), /*#__PURE__*/React__default.default.createElement("select", {
      className: "admin-list-popover__select",
      value: controls.activeFilters[filter.field] ?? '',
      onChange: event => onSetFilter(filter.field, event.target.value)
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "All"), filter.options.map(option => /*#__PURE__*/React__default.default.createElement("option", {
      key: option,
      value: option
    }, option)))))) : null), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-actions"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-toolbar-cluster"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-toolbar-button admin-toolbar-button--icon${showDisplayed ? ' admin-toolbar-button--active' : ''}`,
      type: "button",
      onClick: () => {
        setShowDisplayed(current => !current);
        setShowFilters(false);
      }
    }, "\u2699"), showDisplayed ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-popover"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-popover__head"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-popover__title"
    }, "Displayed fields"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-list-popover__reset",
      type: "button",
      onClick: onResetDisplayedFields
    }, "Reset")), controls.availableFields.map(field => /*#__PURE__*/React__default.default.createElement("label", {
      key: field.field,
      className: "admin-list-popover__check"
    }, /*#__PURE__*/React__default.default.createElement("input", {
      type: "checkbox",
      checked: controls.displayedFields.includes(field.field),
      onChange: event => onToggleDisplayedField(field.field, event.target.checked)
    }), /*#__PURE__*/React__default.default.createElement("span", null, field.label)))) : null))), /*#__PURE__*/React__default.default.createElement("section", {
      className: "admin-list-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-card__head"
    }, /*#__PURE__*/React__default.default.createElement("strong", null, definition.label), /*#__PURE__*/React__default.default.createElement("span", null, loading ? 'Loading...' : `${records.length} entries`)), /*#__PURE__*/React__default.default.createElement("table", {
      className: "admin-list-table"
    }, /*#__PURE__*/React__default.default.createElement("thead", null, /*#__PURE__*/React__default.default.createElement("tr", null, displayedColumns.map(column => /*#__PURE__*/React__default.default.createElement("th", {
      key: column.field
    }, /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      onClick: () => onSetSort(column.field)
    }, column.label, controls.sortBy === column.field ? ` ${controls.sortOrder === 'asc' ? '↑' : '↓'}` : ''))), /*#__PURE__*/React__default.default.createElement("th", null))), /*#__PURE__*/React__default.default.createElement("tbody", null, records.map(record => /*#__PURE__*/React__default.default.createElement("tr", {
      key: record.documentId,
      onClick: () => onOpenRecord(record.id)
    }, displayedColumns.map(column => /*#__PURE__*/React__default.default.createElement("td", {
      key: `${record.documentId}-${column.field}`
    }, renderListCell(column.field, record.columns[column.field]))), /*#__PURE__*/React__default.default.createElement("td", {
      className: "admin-list-row-menu-cell"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-list-row-menu-trigger",
      type: "button",
      onClick: event => {
        event.stopPropagation();
        setOpenMenuId(current => current === record.id ? null : record.id);
      }
    }, "\u2026"), openMenuId === record.id ? /*#__PURE__*/React__default.default.createElement("div", {
      ref: menuRef,
      className: "admin-list-row-menu",
      onClick: event => event.stopPropagation()
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-list-row-menu__item",
      type: "button",
      onClick: () => {
        setOpenMenuId(null);
        onOpenRecord(record.id);
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-list-row-menu__icon"
    }, "\u270E"), /*#__PURE__*/React__default.default.createElement("span", null, "Edit")), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-list-row-menu__item",
      type: "button",
      onClick: () => {
        setOpenMenuId(null);
        onDuplicateRecord(record.id);
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-list-row-menu__icon"
    }, "\u29C9"), /*#__PURE__*/React__default.default.createElement("span", null, "Duplicate")), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-list-row-menu__item admin-list-row-menu__item--danger",
      type: "button",
      onClick: () => {
        setOpenMenuId(null);
        onDeleteRecord(record.id);
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-list-row-menu__icon"
    }, "\uD83D\uDDD1"), /*#__PURE__*/React__default.default.createElement("span", null, "Delete entry"))) : null))))))));
  }
  function EditView({
    definition,
    record,
    publishedRecord,
    activeTab,
    onSwitchTab,
    saving,
    error,
    onBack,
    onChange,
    onAddItem,
    onRemoveItem,
    onMoveItem,
    onSave,
    onPublish,
    onDelete,
    onDiscardChanges,
    onUnpublish,
    canSave,
    canPublish,
    canDiscard,
    canUnpublish
  }) {
    const displayedRecord = activeTab === 'published' && publishedRecord ? publishedRecord : record;
    const isPublishedView = activeTab === 'published' && publishedRecord;
    const [menuOpen, setMenuOpen] = React.useState(false);
    const menuRef = React.useRef(null);
    React.useEffect(() => {
      if (!menuOpen) {
        return undefined;
      }
      const handlePointerDown = event => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handlePointerDown);
      return () => {
        document.removeEventListener('mousedown', handlePointerDown);
      };
    }, [menuOpen]);
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-editor"
    }, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$4), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-editor__inner"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-back",
      type: "button",
      onClick: onBack
    }, "\u2190 Back"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-header"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-meta"
    }, "Collection Type"), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "admin-title"
    }, getDisplayTitle(definition, displayedRecord)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-status"
    }, publishedRecord ? 'Published' : displayedRecord.status || 'Draft'))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-tabs"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-tab${activeTab === 'draft' ? ' admin-tab--active' : ''}`,
      type: "button",
      onClick: () => onSwitchTab('draft')
    }, "DRAFT"), /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-tab${activeTab === 'published' ? ' admin-tab--active' : ''}`,
      type: "button",
      onClick: () => publishedRecord && onSwitchTab('published')
    }, "PUBLISHED")), error ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "danger"
    }, error) : null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-layout"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-main-card"
    }, definition.editLayout.map((row, index) => /*#__PURE__*/React__default.default.createElement("div", {
      key: `row-${index}`,
      className: "admin-section"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field-grid"
    }, row.map(field => /*#__PURE__*/React__default.default.createElement(FieldRenderer$1, {
      definition: definition,
      key: field,
      field: field,
      value: displayedRecord[field],
      path: [field],
      onChange: onChange,
      onAddItem: onAddItem,
      onRemoveItem: onRemoveItem,
      onMoveItem: onMoveItem,
      disabled: isPublishedView
    })))))), /*#__PURE__*/React__default.default.createElement("aside", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card__head"
    }, "Entry"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card__body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-button-row"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-button--secondary",
      type: "button",
      onClick: onPublish,
      disabled: !canPublish
    }, "Publish"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-button--secondary admin-side-button--menu",
      type: "button",
      onClick: () => setMenuOpen(current => !current)
    }, "\u2026"), menuOpen ? /*#__PURE__*/React__default.default.createElement("div", {
      ref: menuRef,
      className: "admin-side-action-menu"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-action-menu__item admin-side-action-menu__item--danger",
      type: "button",
      onClick: () => {
        setMenuOpen(false);
        onUnpublish();
      },
      disabled: !canUnpublish
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-side-action-menu__icon"
    }, "\xD7"), "Unpublish"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-action-menu__item admin-side-action-menu__item--danger",
      type: "button",
      onClick: () => {
        setMenuOpen(false);
        onDiscardChanges();
      },
      disabled: !canDiscard
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-side-action-menu__icon"
    }, "\xD7"), "Discard changes")) : null), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-button",
      type: "button",
      onClick: onSave,
      disabled: !canSave
    }, saving ? 'Saving...' : 'Save'))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card__head"
    }, "Actions"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card__body"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-button--secondary",
      type: "button",
      onClick: onDelete,
      disabled: isPublishedView
    }, "Delete")))))));
  }
  function CollectionManager() {
    const {
      pageName
    } = reactRouter.useParams();
    const location = reactRouter.useLocation();
    const navigate = reactRouter.useNavigate();
    const addNotice = adminjs.useNotice();
    const [loading, setLoading] = React.useState(true);
    const [listLoading, setListLoading] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [definition, setDefinition] = React.useState(null);
    const [records, setRecords] = React.useState([]);
    const [controls, setControls] = React.useState(null);
    const [record, setRecord] = React.useState(null);
    const [originalRecord, setOriginalRecord] = React.useState(null);
    const [publishedRecord, setPublishedRecord] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('draft');
    const [error, setError] = React.useState('');
    const query = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
    const recordId = query.get('recordId');
    const isNew = query.get('new') === '1';
    const search = query.get('search') || '';
    const status = query.get('status') || '';
    const category = query.get('category') || '';
    const planType = query.get('planType') || '';
    const featured = query.get('featured') || '';
    const isFeatured = query.get('isFeatured') || '';
    const isPopular = query.get('isPopular') || '';
    const sortBy = query.get('sortBy') || '';
    const sortOrder = query.get('sortOrder') || '';
    const displayedFields = parseDisplayedFields(query.get('displayedFields'));
    const mode = React.useMemo(() => recordId || isNew ? 'edit' : 'list', [recordId, isNew]);
    const isDirty = React.useMemo(() => JSON.stringify(toComparableValue$1(record)) !== JSON.stringify(toComparableValue$1(originalRecord)), [record, originalRecord]);
    const hasDraftContent = React.useMemo(() => hasMeaningfulValue$1(record), [record]);
    const hasUnpublishedChanges = React.useMemo(() => JSON.stringify(toComparableValue$1(record)) !== JSON.stringify(toComparableValue$1(publishedRecord)), [record, publishedRecord]);
    const canSave = mode === 'edit' && !saving && activeTab !== 'published' && isDirty;
    const canPublish = mode === 'edit' && !saving && activeTab !== 'published' && (publishedRecord ? hasUnpublishedChanges : hasDraftContent);
    const canDiscard = mode === 'edit' && !saving && activeTab !== 'published' && hasDraftContent;
    const canUnpublish = mode === 'edit' && !saving && Boolean(publishedRecord);
    React.useEffect(() => {
      let active = true;
      const load = async () => {
        const shouldBlock = mode === 'edit' || !definition;
        if (shouldBlock) {
          setLoading(true);
        } else {
          setListLoading(true);
        }
        setError('');
        try {
          const payload = await requestPage(pageName, {
            query: mode === 'edit' ? recordId ? {
              recordId
            } : {
              new: '1'
            } : {
              search,
              status,
              category,
              planType,
              featured,
              isFeatured,
              isPopular,
              sortBy,
              sortOrder,
              displayedFields: displayedFields.join(',')
            }
          });
          if (!active) {
            return;
          }
          setDefinition(payload.definition);
          setRecords(payload.records ?? []);
          setControls(payload.controls ?? null);
          const nextDraftRecord = payload.draftRecord ? cloneValue$1(payload.draftRecord) : null;
          setRecord(nextDraftRecord);
          setOriginalRecord(nextDraftRecord ? cloneValue$1(nextDraftRecord) : null);
          setPublishedRecord(payload.publishedRecord ? cloneValue$1(payload.publishedRecord) : null);
          setActiveTab('draft');
        } catch (loadError) {
          if (!active) {
            return;
          }
          setError(loadError.message);
        } finally {
          if (active) {
            setLoading(false);
            setListLoading(false);
          }
        }
      };
      load();
      return () => {
        active = false;
      };
    }, [mode, pageName, recordId, isNew, search, status, category, planType, featured, isFeatured, isPopular, sortBy, sortOrder, displayedFields.join(',')]);
    const updateListQuery = patch => {
      const nextParams = {
        search,
        status,
        category,
        planType,
        featured,
        isFeatured,
        isPopular,
        sortBy,
        sortOrder,
        displayedFields: displayedFields.join(','),
        ...patch
      };
      navigate(buildAdminPath(location.pathname, nextParams));
    };
    const handleChange = (path, nextValue) => {
      setRecord(current => updateAtPath$1(current, path, nextValue));
    };
    const handleAddItem = (path, nextItem) => {
      setRecord(current => appendAtPath$1(current, path, nextItem));
    };
    const handleRemoveItem = path => {
      setRecord(current => removeAtPath$1(current, path));
    };
    const handleMoveItem = (path, offset) => {
      setRecord(current => moveAtPath$1(current, path, offset));
    };
    const handleSaveIntent = async intent => {
      if (!record) {
        return;
      }
      setSaving(true);
      setError('');
      try {
        const payload = await requestPage(pageName, {
          method: 'POST',
          body: {
            intent,
            recordId: record.id ?? null,
            record,
            new: isNew ? '1' : undefined
          }
        });
        if (payload.draftRecord) {
          const nextDraftRecord = cloneValue$1(payload.draftRecord);
          setRecord(nextDraftRecord);
          setOriginalRecord(cloneValue$1(nextDraftRecord));
        }
        setPublishedRecord(payload.publishedRecord ? cloneValue$1(payload.publishedRecord) : null);
        if (intent === 'unpublish') {
          setActiveTab('draft');
        }
        if (!recordId && payload.draftRecord?.id) {
          navigate(buildAdminPath(location.pathname, {
            recordId: payload.draftRecord.id
          }));
        }
        if (payload.notice) {
          addNotice({
            message: payload.notice.message,
            type: payload.notice.type
          });
        }
        if (payload.deleted) {
          navigate(`/admin/pages/${pageName}`);
        }
      } catch (requestError) {
        setError(requestError.message);
        addNotice({
          message: requestError.message,
          type: 'error'
        });
      } finally {
        setSaving(false);
      }
    };
    const handleDiscardChanges = () => {
      setRecord(getEmptyItem$1(record));
      setActiveTab('draft');
    };
    const handleCreate = async () => {
      navigate(buildAdminPath(location.pathname, {
        new: 1
      }));
    };
    const handleListAction = async (intent, targetRecordId) => {
      try {
        const payload = await requestPage(pageName, {
          method: 'POST',
          body: {
            intent,
            recordId: targetRecordId
          }
        });
        addNotice({
          message: payload.notice?.message ?? `${definition.label} updated.`,
          type: payload.notice?.type ?? 'success'
        });
        if (intent === 'duplicate' && payload.draftRecord?.id) {
          navigate(buildAdminPath(location.pathname, {
            recordId: payload.draftRecord.id
          }));
          return;
        }
        if (intent === 'delete') {
          setRecords(current => current.filter(item => item.id !== targetRecordId));
        }
      } catch (requestError) {
        setError(requestError.message);
        addNotice({
          message: requestError.message,
          type: 'error'
        });
      }
    };
    if (loading) {
      return /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null));
    }
    if (!definition) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        variant: "danger"
      }, "Collection definition missing.");
    }
    if (mode === 'list') {
      return /*#__PURE__*/React__default.default.createElement(ListView, {
        definition: definition,
        records: records,
        controls: controls ?? {
          displayedFields: definition.listColumns.map(column => column.field),
          availableFields: definition.listColumns,
          filters: [],
          activeFilters: {},
          sortBy: '',
          sortOrder: 'desc'
        },
        search: search,
        loading: listLoading,
        onSearch: nextSearch => updateListQuery({
          search: nextSearch
        }),
        onOpenRecord: nextRecordId => navigate(buildAdminPath(location.pathname, {
          recordId: nextRecordId
        })),
        onCreate: handleCreate,
        onSetSort: field => {
          const nextOrder = controls?.sortBy === field && controls?.sortOrder === 'asc' ? 'desc' : 'asc';
          updateListQuery({
            sortBy: field,
            sortOrder: nextOrder
          });
        },
        onSetFilter: (field, value) => updateListQuery({
          [field]: value
        }),
        onResetFilters: () => updateListQuery({
          status: '',
          category: '',
          planType: '',
          featured: '',
          isFeatured: '',
          isPopular: ''
        }),
        onToggleDisplayedField: (field, checked) => {
          const nextFields = checked ? [...new Set([...(controls?.displayedFields ?? []), field])] : (controls?.displayedFields ?? []).filter(item => item !== field);
          updateListQuery({
            displayedFields: nextFields.join(',')
          });
        },
        onResetDisplayedFields: () => updateListQuery({
          displayedFields: definition.listColumns.map(column => column.field).join(',')
        }),
        onDuplicateRecord: targetRecordId => handleListAction('duplicate', targetRecordId),
        onDeleteRecord: targetRecordId => handleListAction('delete', targetRecordId)
      });
    }
    if (!record) {
      return /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null));
    }
    return /*#__PURE__*/React__default.default.createElement(EditView, {
      definition: definition,
      record: record,
      publishedRecord: publishedRecord,
      activeTab: activeTab,
      onSwitchTab: setActiveTab,
      saving: saving,
      error: error,
      onBack: () => navigate(`/admin/pages/${pageName}`),
      onChange: handleChange,
      onAddItem: handleAddItem,
      onRemoveItem: handleRemoveItem,
      onMoveItem: handleMoveItem,
      onSave: () => handleSaveIntent('save'),
      onPublish: () => handleSaveIntent('publish'),
      onDelete: () => handleSaveIntent('delete'),
      onDiscardChanges: handleDiscardChanges,
      onUnpublish: () => handleSaveIntent('unpublish'),
      canSave: canSave,
      canPublish: canPublish,
      canDiscard: canDiscard,
      canUnpublish: canUnpublish
    });
  }

  const api = new adminjs.ApiClient();
  const MULTILINE_FIELD_PATTERN = /(description|content|message|body|subtitle|excerpt|intro|hours|address|text|paragraph|overview|challenge|result)/i;
  const IMAGE_FIELD_PATTERN = /(image|background|logo|thumbnail|featured)/i;
  const PATH_FIELD_PATTERN = /(^path$|Path$)/;
  const FULL_WIDTH_FIELD_PATTERN = /(description|content|message|body|subtitle|excerpt|intro|overview|challenge|result|background|image|gallery|sections|testimonials|services|whyChooseItems|featureChips|socialLinks|faqItems|comparisonRows|comparisonColumns|storyParagraphs|relatedWorkspaces|challengeItems|amenities|navigation|footer|form)/i;
  const REQUIRED_FIELD_PATTERN = /(heroTitle|heroSubtitle|storyTitle|whyChooseTitle|amenitiesTitle|title)$/i;
  const ROUTE_OPTIONS = [{
    value: '/',
    label: 'Home'
  }, {
    value: '/pricing',
    label: 'Pricing'
  }, {
    value: '/meeting-rooms',
    label: 'Meeting Rooms'
  }, {
    value: '/virtual-office',
    label: 'Virtual Office'
  }, {
    value: '/about',
    label: 'About'
  }, {
    value: '/contact',
    label: 'Contact'
  }, {
    value: '/faq',
    label: 'FAQ'
  }, {
    value: '/blog',
    label: 'Blog'
  }, {
    value: '/privacy',
    label: 'Privacy Policy'
  }, {
    value: '/terms',
    label: 'Terms'
  }, {
    value: '/dashboard',
    label: 'Dashboard'
  }];
  const PAGE_LAYOUTS = {
    'site-settings': [{
      fields: ['siteName', 'tagline']
    }, {
      fields: ['contactEmail', 'contactPhone', 'address']
    }, {
      fields: ['defaultSeoTitle', 'defaultSeoDescription']
    }, {
      fields: ['navigation']
    }, {
      fields: ['footer']
    }, {
      fields: ['socialLinks']
    }],
    homepage: [{
      fields: ['hero', 'featureChips']
    }, {
      fields: ['servicesEyebrow', 'servicesKicker', 'services']
    }, {
      fields: ['aboutHighlight']
    }, {
      fields: ['whyChooseEyebrow', 'whyChooseKicker', 'whyChooseTitle', 'whyChooseItems']
    }, {
      fields: ['testimonialsEyebrow', 'testimonialsKicker', 'testimonialsTitle', 'testimonials']
    }, {
      fields: ['galleryEyebrow', 'galleryKicker', 'galleryTitle', 'galleryImages']
    }, {
      fields: ['contactForm']
    }, {
      fields: ['visitUsTitle', 'addressLabel', 'emailLabel', 'phoneLabel', 'openHoursLabel', 'weekdayHours', 'weekendHours', 'mapButtonLabel']
    }],
    'about-page': [{
      fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage']
    }, {
      fields: ['storyTitle', 'storyParagraphs', 'storyImage']
    }, {
      fields: ['whyChooseTitle', 'whyChooseItems']
    }, {
      fields: ['amenitiesTitle', 'amenitiesImage', 'amenities']
    }],
    'blog-page': [{
      fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage']
    }, {
      fields: ['searchPlaceholder', 'quickSearchTitle', 'recentPostsTitle', 'categoriesTitle', 'popularTagsTitle', 'noResultsText']
    }, {
      fields: ['detailBackLabel', 'detailSearchTitle', 'detailSearchButtonLabel', 'detailPopularTagsTitle', 'detailRecentPostsTitle', 'detailRelatedWorkspacesTitle']
    }, {
      fields: ['detailCommentForm']
    }, {
      fields: ['relatedWorkspaces']
    }],
    'pricing-page': [{
      fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage']
    }, {
      fields: ['comparisonTitle', 'featureListTitle', 'featureListSubtitle', 'comparisonColumns', 'comparisonRows', 'recommendedLabel', 'purchaseButtonLabel']
    }, {
      fields: ['faqTitle', 'faqSubtitle', 'faqItems']
    }],
    'faq-page': [{
      fields: ['eyebrow', 'heroTitle', 'heroSubtitle', 'heroBackgroundImage', 'title', 'description']
    }, {
      fields: ['searchPlaceholder', 'noResultsText']
    }, {
      fields: ['ctaTitle', 'ctaDescription', 'ctaButtonLabel']
    }],
    'meeting-rooms-page': [{
      fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage']
    }, {
      fields: ['roomsTitle', 'roomsSubtitle', 'bookNowLabel', 'readMoreLabel', 'popularLabel']
    }, {
      fields: ['plansTitle', 'plansSubtitle', 'getStartedLabel']
    }, {
      fields: ['amenitiesTitle', 'amenitiesSubtitle', 'amenities']
    }],
    'virtual-office-page': [{
      fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage']
    }, {
      fields: ['overviewTitle', 'overviewText', 'featuredImage', 'galleryImages']
    }, {
      fields: ['challengeTitle', 'challengeIntro', 'challengeItems']
    }, {
      fields: ['resultTitle', 'resultText']
    }, {
      fields: ['ctaTitle', 'ctaDescription', 'ctaButtonLabel']
    }, {
      fields: ['projectInfoTitle', 'projectDateLabel', 'projectDateValue', 'projectWebsiteLabel', 'projectWebsiteValue', 'projectCategoryLabel', 'projectCategoryValue']
    }, {
      fields: ['contactForm']
    }],
    'contact-page': [{
      fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage']
    }, {
      fields: ['introEyebrow', 'introTitle']
    }, {
      fields: ['addressCardTitle', 'phoneCardTitle', 'emailCardTitle']
    }, {
      fields: ['form']
    }, {
      fields: ['mapTitle', 'mapDescription']
    }],
    'privacy-policy-page': [{
      fields: ['heroTitle', 'heroSubtitle']
    }, {
      fields: ['effectiveDateLabel', 'effectiveDateValue', 'introText']
    }, {
      fields: ['sections']
    }, {
      fields: ['contactTitle', 'contactBody', 'contactButtonLabel']
    }],
    'terms-page': [{
      fields: ['heroTitle', 'heroSubtitle']
    }, {
      fields: ['effectiveDateLabel', 'effectiveDateValue', 'introText']
    }, {
      fields: ['sections']
    }, {
      fields: ['contactTitle', 'contactBody', 'contactButtonLabel']
    }]
  };
  const STYLES$3 = `
.admin-editor {
  min-height: 100%;
  padding: 32px 40px 64px 344px;
  background: #f6f6f9;
  color: #32324d;
}

.admin-editor__inner {
  max-width: 1240px;
  margin: 0 auto;
}

.admin-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 14px;
}

.admin-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 12px;
}

.admin-meta {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #666687;
  margin-bottom: 4px;
}

.admin-title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
  color: #32324d;
}

.admin-status {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0 0.75rem;
  margin-top: 14px;
  border: 1px solid #c6f0c2;
  border-radius: 4px;
  background: #efffed;
  color: #2f6846;
  font-size: 0.8125rem;
  line-height: 1rem;
  font-weight: 600;
}

.admin-kebab {
  width: 2rem;
  height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #666687;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.admin-tabs {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eaeaef;
}

.admin-tab {
  position: relative;
  border: 0;
  background: transparent;
  padding: 0 0 12px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  cursor: pointer;
}

.admin-tab--active {
  color: #4945ff;
}

.admin-tab--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: #4945ff;
}

.admin-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 232px;
  gap: 16px;
  align-items: start;
}

.admin-main-card,
.admin-side-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
}

.admin-main-card {
  padding: 24px;
}

.admin-section + .admin-section {
  margin-top: 20px;
}

.admin-field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 24px;
}

.admin-field {
  min-width: 0;
}

.admin-field--full {
  grid-column: 1 / -1;
}

.admin-label {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 6px;
  color: #32324d;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
}

.admin-label__required {
  color: #d02b20;
}

.admin-input,
.admin-textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
}

.admin-input {
  min-height: 2.5rem;
}

.admin-input:focus,
.admin-textarea:focus {
  border-color: #4945ff;
  box-shadow: 0 0 0 1px #4945ff;
}

.admin-input:disabled,
.admin-textarea:disabled {
  background: #f6f6f9;
  color: #666687;
  cursor: not-allowed;
}

.admin-textarea {
  min-height: 5.75rem;
  resize: vertical;
}

.admin-media {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  padding: 16px;
}

.admin-media__canvas {
  min-height: 140px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fafafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.admin-media__empty {
  color: #8e8ea9;
  font-size: 0.8125rem;
}

.admin-media__stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.admin-media__thumb {
  max-width: 240px;
  max-height: 140px;
  object-fit: cover;
  border-radius: 2px;
}

.admin-media__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.admin-media__action {
  width: 2rem;
  height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #666687;
  cursor: pointer;
}

.admin-media__action:disabled {
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}

.admin-media__filename {
  max-width: 280px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-media__source {
  margin-top: 10px;
}

.admin-media__source-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.admin-media__upload-button {
  min-height: 2rem;
  padding: 0 0.75rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.admin-media__upload-button:disabled {
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}

.admin-media__error {
  color: #d02b20;
  font-size: 0.75rem;
  line-height: 1rem;
}

.admin-object {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  padding: 16px;
}

.admin-object__title {
  margin: 0 0 12px;
  font-size: 0.8125rem;
  line-height: 1rem;
  font-weight: 700;
  color: #666687;
  text-transform: uppercase;
}

.admin-repeatable {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  overflow: hidden;
  background: #ffffff;
}

.admin-repeatable__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px 10px;
  border-bottom: 1px solid #f0f0f5;
}

.admin-repeatable__title {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  color: #32324d;
}

.admin-repeatable__count {
  color: #8e8ea9;
  font-size: 0.75rem;
}

.admin-repeatable__item + .admin-repeatable__item {
  border-top: 1px solid #f0f0f5;
}

.admin-repeatable__item--drag-over summary {
  background: #f0f0ff;
}

.admin-repeatable__item[open] summary {
  background: #fafafb;
}

.admin-repeatable__summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
}

.admin-repeatable__summary::-webkit-details-marker {
  display: none;
}

.admin-repeatable__summary-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.admin-repeatable__bullet {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: #f0f0f5;
  color: #666687;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
}

.admin-repeatable__name {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: #32324d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-repeatable__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #8e8ea9;
  font-size: 0.875rem;
}

.admin-repeatable__icon-button {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  padding: 0;
}

.admin-repeatable__drag-handle {
  border: 0;
  background: transparent;
  color: #8e8ea9;
  cursor: grab;
  padding: 0 2px;
  font-size: 1rem;
  line-height: 1;
}

.admin-repeatable__drag-handle:active {
  cursor: grabbing;
}

.admin-repeatable__drag-handle:disabled {
  color: #c4c4d2;
  cursor: not-allowed;
}

.admin-repeatable__icon-button:disabled,
.admin-repeatable__add:disabled,
.admin-side-button:disabled,
.admin-side-button--secondary:disabled {
  cursor: not-allowed;
  opacity: 1;
}

.admin-repeatable__icon-button:disabled,
.admin-repeatable__add:disabled {
  color: #8e8ea9;
}

.admin-repeatable__body {
  padding: 16px;
  background: #ffffff;
}

.admin-repeatable__add {
  width: 100%;
  border: 0;
  border-top: 1px solid #f0f0f5;
  background: #ffffff;
  color: #4945ff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  padding: 14px 16px;
  cursor: pointer;
}

.admin-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  padding: 0.625rem 0.875rem;
}

.admin-switch input {
  accent-color: #4945ff;
}

.admin-switch:has(input:disabled) {
  background: #f6f6f9;
  color: #666687;
}

.admin-side-card + .admin-side-card {
  margin-top: 12px;
}

.admin-side-card__head {
  padding: 14px 16px 8px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
}

.admin-side-card__body {
  padding: 0 12px 12px;
}

.admin-side-button-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  position: relative;
}

.admin-side-button,
.admin-side-button--secondary {
  width: 100%;
  min-height: 2.25rem;
  border-radius: 4px;
  font-size: 0.8125rem;
  line-height: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.admin-side-button {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #ffffff;
}

.admin-side-button--secondary {
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #32324d;
}

.admin-side-button:disabled,
.admin-side-button--secondary:disabled {
  border-color: #dcdce4;
  background: #f6f6f9;
  color: #8e8ea9;
}

.admin-side-button--menu {
  width: 2rem;
  flex: 0 0 2rem;
}

.admin-side-action-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(33, 33, 52, 0.12);
  padding: 8px 0;
  z-index: 40;
}

.admin-side-action-menu__item {
  width: 100%;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #32324d;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  text-align: left;
}

.admin-side-action-menu__item:hover {
  background: #f6f6f9;
}

.admin-side-action-menu__item--danger {
  color: #d02b20;
}

.admin-side-action-menu__item:disabled {
  background: transparent;
  color: #8e8ea9;
  cursor: not-allowed;
}

.admin-side-action-menu__icon {
  width: 18px;
  color: inherit;
  text-align: center;
}

@media (max-width: 1180px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 960px) {
  .admin-editor {
    padding: 20px 16px 48px;
  }

  .admin-field-grid {
    grid-template-columns: 1fr;
  }
}
`;
  function toLabel(name) {
    return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/\bseo\b/gi, 'SEO').replace(/\bcta\b/gi, 'CTA').replace(/\bfaq\b/gi, 'FAQ').replace(/\bid\b/gi, 'ID').replace(/\burl\b/gi, 'URL').replace(/\s+/g, ' ').trim().replace(/^./, value => value.toUpperCase());
  }
  function getFieldLabel(fieldKey) {
    if (fieldKey === 'path') {
      return 'Destination';
    }
    if (fieldKey.endsWith('Path')) {
      return toLabel(fieldKey.replace(/Path$/, 'Destination'));
    }
    return toLabel(fieldKey);
  }
  function getPathOptions(currentValue) {
    const options = [...ROUTE_OPTIONS];
    if (currentValue && !options.some(option => option.value === currentValue)) {
      options.unshift({
        value: currentValue,
        label: 'Current destination'
      });
    }
    return options;
  }
  function cloneValue(value) {
    return JSON.parse(JSON.stringify(value));
  }
  function toComparableValue(value) {
    if (Array.isArray(value)) {
      return value.map(item => toComparableValue(item));
    }
    if (isPlainObject(value)) {
      return Object.keys(value).sort().filter(key => key !== '__tempId').reduce((accumulator, key) => {
        accumulator[key] = toComparableValue(value[key]);
        return accumulator;
      }, {});
    }
    return value;
  }
  function hasMeaningfulValue(value) {
    if (Array.isArray(value)) {
      return value.some(item => hasMeaningfulValue(item));
    }
    if (isPlainObject(value)) {
      return Object.entries(value).filter(([key]) => key !== '__tempId').some(([, nestedValue]) => hasMeaningfulValue(nestedValue));
    }
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    if (typeof value === 'number') {
      return value !== 0;
    }
    if (typeof value === 'boolean') {
      return value;
    }
    return value != null;
  }
  function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  function getFilename(url) {
    if (typeof url !== 'string') {
      return '';
    }
    try {
      const pathname = new URL(url).pathname;
      const filename = pathname.split('/').pop();
      return filename || url;
    } catch {
      return url.split('/').pop() || url;
    }
  }
  function getEmptyItem(sample) {
    if (Array.isArray(sample)) {
      return [];
    }
    if (sample && typeof sample === 'object') {
      return Object.fromEntries(Object.keys(sample).filter(key => key !== 'id').map(key => [key, getEmptyItem(sample[key])]));
    }
    if (typeof sample === 'boolean') {
      return false;
    }
    if (typeof sample === 'number') {
      return 0;
    }
    return '';
  }
  function updateAtPath(value, path, nextValue) {
    if (!path.length) {
      return nextValue;
    }
    const [segment, ...rest] = path;
    const clone = Array.isArray(value) ? [...value] : {
      ...value
    };
    clone[segment] = updateAtPath(value?.[segment], rest, nextValue);
    return clone;
  }
  function removeAtPath(value, path) {
    if (path.length === 1) {
      if (!Array.isArray(value)) {
        return value;
      }
      return value.filter((_, index) => index !== path[0]);
    }
    const [segment, ...rest] = path;
    const clone = Array.isArray(value) ? [...value] : {
      ...value
    };
    clone[segment] = removeAtPath(value?.[segment], rest);
    return clone;
  }
  function appendAtPath(value, path, nextItem) {
    if (!path.length) {
      return [...(Array.isArray(value) ? value : []), nextItem];
    }
    const [segment, ...rest] = path;
    const clone = Array.isArray(value) ? [...value] : {
      ...value
    };
    clone[segment] = appendAtPath(value?.[segment], rest, nextItem);
    return clone;
  }
  function moveAtPath(value, path, offset) {
    if (path.length === 1) {
      if (!Array.isArray(value)) {
        return value;
      }
      const index = path[0];
      const nextIndex = index + offset;
      if (nextIndex < 0 || nextIndex >= value.length) {
        return value;
      }
      const clone = [...value];
      const [moved] = clone.splice(index, 1);
      clone.splice(nextIndex, 0, moved);
      return clone;
    }
    const [segment, ...rest] = path;
    const clone = Array.isArray(value) ? [...value] : {
      ...value
    };
    clone[segment] = moveAtPath(value?.[segment], rest, offset);
    return clone;
  }
  function parseInputValue(nextRawValue, currentValue) {
    if (typeof currentValue === 'number') {
      if (nextRawValue === '') {
        return 0;
      }
      const parsed = Number(nextRawValue);
      return Number.isNaN(parsed) ? currentValue : parsed;
    }
    return nextRawValue;
  }
  function resolveMediaPreviewUrl(value) {
    if (typeof value !== 'string') {
      return '';
    }
    const trimmed = value.trim();
    if (!trimmed) {
      return '';
    }
    if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('data:image/')) {
      return trimmed;
    }
    if (trimmed.startsWith('/')) {
      return trimmed;
    }
    return `/${trimmed.replace(/^\.?\//, '')}`;
  }
  function toAdminErrorMessage(error, fallback) {
    const responseData = error?.response?.data;
    if (typeof responseData?.message === 'string' && responseData.message.trim()) {
      return responseData.message;
    }
    if (typeof responseData?.error === 'string' && responseData.error.trim()) {
      return responseData.error;
    }
    if (typeof error?.message === 'string' && error.message.trim()) {
      return error.message;
    }
    return fallback;
  }
  async function uploadAdminImage$1(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/admin/api/media/upload', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || 'Failed to upload image.');
    }
    const uploadedUrl = payload?.url || payload?.item?.relativeUrl || payload?.item?.url;
    if (!uploadedUrl) {
      throw new Error('Upload succeeded but returned no URL.');
    }
    return uploadedUrl;
  }
  const MEDIA_PICKER_EVENT$1 = 'adminjs-media-select';
  function chooseAdminLibraryImage() {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve('');
        return;
      }
      const pickerWindow = window.open('/admin/pages/media-library?picker=1', 'admin-media-library-picker', 'popup=yes,width=1440,height=900,resizable=yes,scrollbars=yes');
      if (!pickerWindow) {
        reject(new Error('Media library popup was blocked.'));
        return;
      }
      let finished = false;
      const cleanup = () => {
        window.removeEventListener('message', handleMessage);
        window.clearInterval(closeWatcher);
      };
      const handleMessage = event => {
        if (event.origin !== window.location.origin || event.source !== pickerWindow) {
          return;
        }
        if (event.data?.type !== MEDIA_PICKER_EVENT$1) {
          return;
        }
        finished = true;
        cleanup();
        resolve(typeof event.data.url === 'string' ? event.data.url : '');
      };
      const closeWatcher = window.setInterval(() => {
        if (pickerWindow.closed && !finished) {
          cleanup();
          resolve('');
        }
      }, 500);
      window.addEventListener('message', handleMessage);
    });
  }
  function isRequiredField(fieldKey) {
    return REQUIRED_FIELD_PATTERN.test(fieldKey);
  }
  function fieldClassName(fieldKey, value) {
    return FULL_WIDTH_FIELD_PATTERN.test(fieldKey) || typeof value === 'boolean' ? 'admin-field admin-field--full' : 'admin-field';
  }
  function isHiddenEditorField(fieldKey) {
    return String(fieldKey).toLowerCase() === 'icon';
  }
  function getItemTitle(item, fallbackLabel, index) {
    if (!isPlainObject(item)) {
      return `${fallbackLabel} ${index + 1}`;
    }
    const preferred = [item.title, item.name, item.label, item.question, item.feature, item.path, item.href, item.alt].find(value => typeof value === 'string' && value.trim());
    return preferred || `${fallbackLabel} ${index + 1}`;
  }
  function buildSections(pageName, content) {
    const entries = Object.entries(content ?? {});
    const layout = PAGE_LAYOUTS[pageName];
    if (!layout) {
      return [{
        entries
      }];
    }
    const used = new Set();
    const sections = layout.map(section => {
      const sectionEntries = section.fields.filter(field => Object.prototype.hasOwnProperty.call(content ?? {}, field)).map(field => {
        used.add(field);
        return [field, content[field]];
      });
      return {
        ...section,
        entries: sectionEntries
      };
    }).filter(section => section.entries.length > 0);
    const extraEntries = entries.filter(([fieldKey]) => !used.has(fieldKey));
    if (extraEntries.length) {
      sections.push({
        entries: extraEntries
      });
    }
    return sections;
  }
  function PrimitiveField({
    fieldKey,
    value,
    path,
    onChange,
    disabled
  }) {
    const label = getFieldLabel(fieldKey);
    const inputValue = value ?? '';
    const required = isRequiredField(fieldKey);
    const isImageField = typeof inputValue === 'string' && IMAGE_FIELD_PATTERN.test(fieldKey);
    const isPathField = typeof inputValue === 'string' && PATH_FIELD_PATTERN.test(fieldKey);
    const previewUrl = isImageField ? resolveMediaPreviewUrl(inputValue) : '';
    const showPreview = Boolean(previewUrl);
    const fileInputRef = React.useRef(null);
    const [uploading, setUploading] = React.useState(false);
    const [uploadError, setUploadError] = React.useState('');
    if (typeof value === 'boolean') {
      return /*#__PURE__*/React__default.default.createElement("div", {
        className: fieldClassName(fieldKey, value)
      }, /*#__PURE__*/React__default.default.createElement("label", {
        className: "admin-label"
      }, label, required ? /*#__PURE__*/React__default.default.createElement("span", {
        className: "admin-label__required"
      }, "*") : null), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-switch"
      }, /*#__PURE__*/React__default.default.createElement("span", null, value ? 'Enabled' : 'Disabled'), /*#__PURE__*/React__default.default.createElement("input", {
        type: "checkbox",
        checked: value,
        disabled: disabled,
        onChange: event => onChange(path, event.target.checked)
      })));
    }
    if (isImageField) {
      return /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-field admin-field--full"
      }, /*#__PURE__*/React__default.default.createElement("label", {
        className: "admin-label"
      }, label, required ? /*#__PURE__*/React__default.default.createElement("span", {
        className: "admin-label__required"
      }, "*") : null), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__canvas"
      }, showPreview ? /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__stack"
      }, /*#__PURE__*/React__default.default.createElement("img", {
        className: "admin-media__thumb",
        src: previewUrl,
        alt: label
      }), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__actions"
      }, /*#__PURE__*/React__default.default.createElement("button", {
        className: "admin-media__action",
        type: "button",
        disabled: disabled,
        onClick: () => window.open(previewUrl, '_blank', 'noopener,noreferrer')
      }, "\u2197"), /*#__PURE__*/React__default.default.createElement("button", {
        className: "admin-media__action",
        type: "button",
        disabled: disabled,
        onClick: () => onChange(path, '')
      }, "\u2715")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__filename"
      }, getFilename(inputValue))) : /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__empty"
      }, "Upload an image to attach media.")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__source"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__source-actions"
      }, /*#__PURE__*/React__default.default.createElement("button", {
        className: "admin-media__upload-button",
        type: "button",
        disabled: disabled || uploading,
        onClick: () => fileInputRef.current?.click()
      }, uploading ? 'Uploading...' : 'Upload from computer'), /*#__PURE__*/React__default.default.createElement("button", {
        className: "admin-media__upload-button",
        type: "button",
        disabled: disabled || uploading,
        onClick: async () => {
          setUploadError('');
          try {
            const selectedUrl = await chooseAdminLibraryImage();
            if (selectedUrl) {
              onChange(path, selectedUrl);
            }
          } catch (error) {
            setUploadError(error?.message || 'Failed to choose image from media library.');
          }
        }
      }, "Choose from media library"), /*#__PURE__*/React__default.default.createElement("input", {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        style: {
          display: 'none'
        },
        onChange: async event => {
          const selectedFile = event.target.files?.[0];
          event.target.value = '';
          if (!selectedFile) {
            return;
          }
          setUploadError('');
          setUploading(true);
          try {
            const uploadedUrl = await uploadAdminImage$1(selectedFile);
            onChange(path, uploadedUrl);
          } catch (error) {
            setUploadError(error?.message || 'Failed to upload image.');
          } finally {
            setUploading(false);
          }
        }
      })), uploadError ? /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__error"
      }, uploadError) : null)));
    }
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: fieldClassName(fieldKey, value)
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-label"
    }, label, required ? /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-label__required"
    }, "*") : null), isPathField ? /*#__PURE__*/React__default.default.createElement("select", {
      className: "admin-input",
      value: inputValue,
      disabled: disabled,
      onChange: event => onChange(path, event.target.value)
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "Select destination"), getPathOptions(inputValue).map(option => /*#__PURE__*/React__default.default.createElement("option", {
      key: option.value || 'empty',
      value: option.value
    }, option.label))) : MULTILINE_FIELD_PATTERN.test(fieldKey) ? /*#__PURE__*/React__default.default.createElement("textarea", {
      className: "admin-textarea",
      value: inputValue,
      disabled: disabled,
      onChange: event => onChange(path, parseInputValue(event.target.value, value))
    }) : /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-input",
      type: typeof value === 'number' ? 'number' : 'text',
      value: inputValue,
      disabled: disabled,
      onChange: event => onChange(path, parseInputValue(event.target.value, value))
    }));
  }
  function ObjectField({
    fieldKey,
    value,
    path,
    onChange,
    onAddItem,
    onRemoveItem,
    onMoveItem,
    disabled
  }) {
    const entries = Object.entries(value ?? {}).filter(([nestedKey]) => nestedKey !== 'id' && !isHiddenEditorField(nestedKey));
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field admin-field--full"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-object"
    }, /*#__PURE__*/React__default.default.createElement("h4", {
      className: "admin-object__title"
    }, toLabel(fieldKey)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field-grid"
    }, entries.map(([nestedKey, nestedValue]) => /*#__PURE__*/React__default.default.createElement(FieldRenderer, {
      key: `${fieldKey}-${nestedKey}`,
      fieldKey: nestedKey,
      value: nestedValue,
      path: [...path, nestedKey],
      onChange: onChange,
      onAddItem: onAddItem,
      onRemoveItem: onRemoveItem,
      onMoveItem: onMoveItem,
      disabled: disabled
    })))));
  }
  function ArrayField({
    fieldKey,
    value,
    path,
    onChange,
    onAddItem,
    onRemoveItem,
    onMoveItem,
    disabled
  }) {
    const label = toLabel(fieldKey);
    const sample = value[0] ?? '';
    const [dragIndex, setDragIndex] = React.useState(null);
    const [dragOverIndex, setDragOverIndex] = React.useState(null);
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field admin-field--full"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-label"
    }, label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__head"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__title"
    }, label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__count"
    }, value.length, " entry", value.length === 1 ? '' : 'ies'))), value.map((item, index) => /*#__PURE__*/React__default.default.createElement("details", {
      key: `${fieldKey}-${index}`,
      className: `admin-repeatable__item${dragOverIndex === index ? ' admin-repeatable__item--drag-over' : ''}`,
      open: index === 0,
      onDragOver: event => {
        if (disabled || dragIndex === null) {
          return;
        }
        event.preventDefault();
        if (dragOverIndex !== index) {
          setDragOverIndex(index);
        }
      },
      onDrop: event => {
        if (disabled || dragIndex === null) {
          return;
        }
        event.preventDefault();
        const offset = index - dragIndex;
        if (offset !== 0) {
          onMoveItem([...path, dragIndex], offset);
        }
        setDragIndex(null);
        setDragOverIndex(null);
      },
      onDragLeave: () => {
        if (dragOverIndex === index) {
          setDragOverIndex(null);
        }
      }
    }, /*#__PURE__*/React__default.default.createElement("summary", {
      className: "admin-repeatable__summary"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__summary-left"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-repeatable__bullet"
    }, "\u25BC"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-repeatable__name"
    }, getItemTitle(item, label, index))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-repeatable__icon-button",
      type: "button",
      disabled: disabled,
      onClick: event => {
        event.preventDefault();
        event.stopPropagation();
        onRemoveItem([...path, index]);
      },
      "aria-label": "Delete"
    }, "\uD83D\uDDD1"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-repeatable__drag-handle",
      type: "button",
      draggable: !disabled,
      disabled: disabled,
      title: "Drag to reorder",
      onClick: event => {
        event.preventDefault();
        event.stopPropagation();
      },
      onDragStart: event => {
        if (disabled) {
          return;
        }
        event.stopPropagation();
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', String(index));
        setDragIndex(index);
        setDragOverIndex(index);
      },
      onDragEnd: () => {
        setDragIndex(null);
        setDragOverIndex(null);
      }
    }, "\u22EE\u22EE"))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-repeatable__body"
    }, isPlainObject(item) ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field-grid"
    }, Object.entries(item).filter(([nestedKey]) => nestedKey !== 'id' && !isHiddenEditorField(nestedKey)).map(([nestedKey, nestedValue]) => /*#__PURE__*/React__default.default.createElement(FieldRenderer, {
      key: `${fieldKey}-${index}-${nestedKey}`,
      fieldKey: nestedKey,
      value: nestedValue,
      path: [...path, index, nestedKey],
      onChange: onChange,
      onAddItem: onAddItem,
      onRemoveItem: onRemoveItem,
      onMoveItem: onMoveItem,
      disabled: disabled
    }))) : /*#__PURE__*/React__default.default.createElement(PrimitiveField, {
      fieldKey: `${fieldKey}-${index}`,
      value: item,
      path: [...path, index],
      onChange: onChange,
      disabled: disabled
    })))), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-repeatable__add",
      type: "button",
      disabled: disabled,
      onClick: () => onAddItem(path, getEmptyItem(sample))
    }, "+ Add an entry")));
  }
  function FieldRenderer(props) {
    const {
      value
    } = props;
    if (Array.isArray(value)) {
      return /*#__PURE__*/React__default.default.createElement(ArrayField, props);
    }
    if (isPlainObject(value)) {
      return /*#__PURE__*/React__default.default.createElement(ObjectField, props);
    }
    return /*#__PURE__*/React__default.default.createElement(PrimitiveField, props);
  }
  function FormSection({
    entries,
    onChange,
    onAddItem,
    onRemoveItem,
    onMoveItem,
    disabled
  }) {
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-section"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field-grid"
    }, entries.map(([fieldKey, value]) => isHiddenEditorField(fieldKey) ? null : /*#__PURE__*/React__default.default.createElement(FieldRenderer, {
      key: fieldKey,
      fieldKey: fieldKey,
      value: value,
      path: [fieldKey],
      onChange: onChange,
      onAddItem: onAddItem,
      onRemoveItem: onRemoveItem,
      onMoveItem: onMoveItem,
      disabled: disabled
    }))));
  }
  function ContentPageEditor() {
    const {
      pageName
    } = reactRouter.useParams();
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [pageLabel, setPageLabel] = React.useState('');
    const [content, setContent] = React.useState({});
    const [originalContent, setOriginalContent] = React.useState({});
    const [publishedContent, setPublishedContent] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('draft');
    const [error, setError] = React.useState('');
    const [menuOpen, setMenuOpen] = React.useState(false);
    const addNotice = adminjs.useNotice();
    const menuRef = React.useRef(null);
    const displayedContent = React.useMemo(() => activeTab === 'published' && publishedContent ? publishedContent : content, [activeTab, content, publishedContent]);
    const isPublishedView = activeTab === 'published' && publishedContent;
    const isDirty = React.useMemo(() => JSON.stringify(toComparableValue(content)) !== JSON.stringify(toComparableValue(originalContent)), [content, originalContent]);
    const hasDraftContent = React.useMemo(() => hasMeaningfulValue(content), [content]);
    const hasUnpublishedChanges = React.useMemo(() => JSON.stringify(toComparableValue(content)) !== JSON.stringify(toComparableValue(publishedContent)), [content, publishedContent]);
    const canSave = !isPublishedView && !saving && isDirty;
    const canPublish = !isPublishedView && !saving && (publishedContent ? hasUnpublishedChanges : hasDraftContent);
    const canDiscard = !saving && !isPublishedView && hasDraftContent;
    const canUnpublish = !saving && Boolean(publishedContent);
    const sections = React.useMemo(() => buildSections(pageName, displayedContent), [pageName, displayedContent]);
    const entryTitle = React.useMemo(() => displayedContent?.heroTitle || displayedContent?.title || displayedContent?.siteName || pageLabel, [displayedContent, pageLabel]);
    React.useEffect(() => {
      let isMounted = true;
      const loadPage = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await api.getPage({
            pageName
          });
          if (!isMounted) {
            return;
          }
          const nextDraftContent = cloneValue(response.data.draftData ?? response.data.data ?? {});
          setContent(nextDraftContent);
          setOriginalContent(cloneValue(nextDraftContent));
          setPublishedContent(response.data.publishedData ? cloneValue(response.data.publishedData) : null);
          setActiveTab('draft');
          setMenuOpen(false);
          setPageLabel(response.data.label ?? toLabel(pageName));
        } catch (loadError) {
          if (!isMounted) {
            return;
          }
          setError(toAdminErrorMessage(loadError, 'Failed to load this content page.'));
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
      loadPage();
      return () => {
        isMounted = false;
      };
    }, [pageName]);
    React.useEffect(() => {
      if (!menuOpen) {
        return undefined;
      }
      const handlePointerDown = event => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handlePointerDown);
      return () => {
        document.removeEventListener('mousedown', handlePointerDown);
      };
    }, [menuOpen]);
    const handleChange = (path, nextValue) => {
      setContent(currentValue => updateAtPath(currentValue, path, nextValue));
    };
    const handleAddItem = (path, nextItem) => {
      setContent(currentValue => appendAtPath(currentValue, path, nextItem));
    };
    const handleRemoveItem = path => {
      setContent(currentValue => removeAtPath(currentValue, path));
    };
    const handleMoveItem = (path, offset) => {
      setContent(currentValue => moveAtPath(currentValue, path, offset));
    };
    const handleSave = async (intent = 'save') => {
      setSaving(true);
      setError('');
      setMenuOpen(false);
      try {
        const response = await api.getPage({
          pageName,
          method: 'post',
          data: {
            content,
            intent
          }
        });
        const nextDraftContent = cloneValue(response.data.draftData ?? response.data.data ?? {});
        setContent(nextDraftContent);
        setOriginalContent(cloneValue(nextDraftContent));
        setPublishedContent(response.data.publishedData ? cloneValue(response.data.publishedData) : null);
        if (intent === 'unpublish') {
          setActiveTab('draft');
        }
        addNotice({
          message: response.data.notice?.message ?? `${pageLabel} saved.`,
          type: 'success'
        });
      } catch (saveError) {
        const message = toAdminErrorMessage(saveError, 'Failed to save this content page.');
        setError(message);
        addNotice({
          message,
          type: 'error'
        });
      } finally {
        setSaving(false);
      }
    };
    const handleDiscardChanges = () => {
      setContent(getEmptyItem(content));
      setActiveTab('draft');
      setMenuOpen(false);
    };
    if (loading) {
      return /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null));
    }
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$3), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-editor"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-editor__inner"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-back",
      type: "button",
      onClick: () => window.history.back()
    }, "\u2190 Back"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-header"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-meta"
    }, "Single Type"), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "admin-title"
    }, entryTitle), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-status"
    }, publishedContent ? 'Published' : 'Draft'))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-tabs"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-tab${activeTab === 'draft' ? ' admin-tab--active' : ''}`,
      type: "button",
      onClick: () => setActiveTab('draft')
    }, "DRAFT"), /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-tab${activeTab === 'published' ? ' admin-tab--active' : ''}`,
      type: "button",
      onClick: () => publishedContent && setActiveTab('published')
    }, "PUBLISHED")), error ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "danger"
    }, error) : null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-layout"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-main-card"
    }, sections.map((section, index) => /*#__PURE__*/React__default.default.createElement(FormSection, {
      key: `section-${index}`,
      entries: section.entries,
      onChange: handleChange,
      onAddItem: handleAddItem,
      onRemoveItem: handleRemoveItem,
      onMoveItem: handleMoveItem,
      disabled: isPublishedView
    }))), /*#__PURE__*/React__default.default.createElement("aside", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card__head"
    }, "Entry"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card__body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-button-row"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-button--secondary",
      type: "button",
      onClick: () => handleSave('publish'),
      disabled: !canPublish
    }, "Publish"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-button--secondary admin-side-button--menu",
      type: "button",
      onClick: () => setMenuOpen(current => !current)
    }, "\u2026"), menuOpen ? /*#__PURE__*/React__default.default.createElement("div", {
      ref: menuRef,
      className: "admin-side-action-menu"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-action-menu__item admin-side-action-menu__item--danger",
      type: "button",
      onClick: () => handleSave('unpublish'),
      disabled: !canUnpublish
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-side-action-menu__icon"
    }, "\xD7"), "Unpublish"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-action-menu__item admin-side-action-menu__item--danger",
      type: "button",
      onClick: handleDiscardChanges,
      disabled: !canDiscard
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-side-action-menu__icon"
    }, "\xD7"), "Discard changes")) : null), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-button",
      type: "button",
      onClick: () => handleSave('save'),
      disabled: !canSave
    }, saving ? 'Saving...' : 'Save'))))))));
  }

  const MEDIA_PICKER_EVENT = 'adminjs-media-select';
  const STYLES$2 = `
.admin-media-page {
  min-height: 100%;
  padding: 28px 40px 48px 88px;
  background: #f6f6f9;
  color: #32324d;
}

.admin-media-page__inner {
  max-width: 1860px;
  margin: 0 auto;
}

.admin-media-page__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.admin-media-page__title {
  margin: 0;
  font-size: 3rem;
  line-height: 3.5rem;
  font-weight: 700;
  color: #32324d;
}

.admin-media-page__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-media-page__button,
.admin-media-page__button--primary,
.admin-media-page__icon-button {
  border-radius: 4px;
  min-height: 2.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  cursor: pointer;
}

.admin-media-page__button {
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #32324d;
  padding: 0 1rem;
}

.admin-media-page__button--primary {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #ffffff;
  padding: 0 1.25rem;
}

.admin-media-page__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.admin-media-page__toolbar-left,
.admin-media-page__toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-media-page__square,
.admin-media-page__icon-button {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #666687;
  display: grid;
  place-items: center;
  border-radius: 4px;
}

.admin-media-page__select,
.admin-media-page__search {
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  padding: 0 1rem;
  font-size: 1rem;
}

.admin-media-page__search {
  min-width: 280px;
}

.admin-media-page__select {
  min-width: 268px;
  appearance: none;
}

.admin-media-page__section-title {
  margin: 0 0 18px;
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 700;
}

.admin-media-page__count {
  color: #666687;
}

.admin-media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.admin-asset-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
  cursor: pointer;
}

.admin-asset-card:hover {
  box-shadow: 0 4px 12px rgba(33, 33, 52, 0.08);
}

.admin-asset-card__preview {
  position: relative;
  min-height: 256px;
  padding: 16px;
  background:
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9),
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9);
  background-position: 0 0, 12px 12px;
  background-size: 24px 24px;
}

.admin-asset-card__checkbox {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 24px;
  height: 24px;
  border: 1px solid #c0c0cf;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.92);
}

.admin-asset-card__image {
  width: 100%;
  height: 224px;
  object-fit: cover;
  display: block;
}

.admin-asset-card__body {
  padding: 14px 18px 16px;
}

.admin-asset-card__title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}

.admin-asset-card__title {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.admin-asset-card__type {
  flex: 0 0 auto;
  min-height: 2rem;
  padding: 0 0.75rem;
  border-radius: 4px;
  background: #f6f6f9;
  color: #666687;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  line-height: 1rem;
  font-weight: 700;
}

.admin-asset-card__meta {
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-media-detail__back {
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 18px;
}

.admin-media-detail__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 24px;
}

.admin-media-detail__preview,
.admin-media-detail__card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
}

.admin-media-detail__preview {
  padding: 24px;
}

.admin-media-detail__canvas {
  min-height: 620px;
  display: grid;
  place-items: center;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background:
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9),
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9);
  background-position: 0 0, 12px 12px;
  background-size: 24px 24px;
}

.admin-media-detail__image {
  max-width: 100%;
  max-height: 580px;
  object-fit: contain;
}

.admin-media-detail__side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.admin-media-detail__card-head {
  padding: 14px 16px 8px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
}

.admin-media-detail__card-body {
  padding: 0 16px 16px;
}

.admin-media-detail__field + .admin-media-detail__field {
  margin-top: 16px;
}

.admin-media-detail__label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: #666687;
}

.admin-media-detail__input,
.admin-media-detail__textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 2.5rem;
  padding: 0.625rem 0.875rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #f6f6f9;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-media-detail__textarea {
  min-height: 6rem;
  resize: none;
}

.admin-media-detail__meta-list {
  display: grid;
  gap: 12px;
}

.admin-media-detail__meta-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-media-detail__meta-key {
  color: #666687;
  font-weight: 600;
}

.admin-media-detail__meta-value {
  color: #32324d;
  text-align: right;
  overflow-wrap: anywhere;
}

@media (max-width: 1080px) {
  .admin-media-detail__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 960px) {
  .admin-media-page {
    padding: 20px 16px 40px 72px;
  }

  .admin-media-page__top,
  .admin-media-page__toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-media-page__toolbar-left,
  .admin-media-page__toolbar-right,
  .admin-media-page__actions {
    flex-wrap: wrap;
  }

  .admin-media-page__search,
  .admin-media-page__select {
    min-width: 0;
    width: 100%;
  }
}
`;
  function buildPagePath(pathname, params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.set(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    return `${pathname}${queryString ? `?${queryString}` : ''}`;
  }
  async function requestMedia(query = {}) {
    const searchParams = new URLSearchParams(query);
    const response = await fetch(`/admin/api/pages/media-library${searchParams.toString() ? `?${searchParams.toString()}` : ''}`, {
      credentials: 'same-origin'
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.message ?? 'Failed to load media.');
    }
    return payload;
  }
  async function uploadAdminImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/admin/api/media/upload', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || 'Failed to upload image.');
    }
    return payload;
  }
  function AssetCard({
    item,
    onOpen,
    pickerMode
  }) {
    return /*#__PURE__*/React__default.default.createElement("article", {
      className: "admin-asset-card",
      onClick: () => onOpen(item)
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-asset-card__preview"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      className: "admin-asset-card__image",
      src: item.thumbnailUrl || item.url,
      alt: item.alternativeText || item.name
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-asset-card__body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-asset-card__title-row"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-asset-card__title"
    }, item.name), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-asset-card__type"
    }, item.mime.startsWith('image/') ? 'IMAGE' : item.ext.replace('.', '').toUpperCase())), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-asset-card__meta"
    }, item.ext.replace('.', '').toUpperCase(), " - ", item.width, "\xD7", item.height), pickerMode ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-asset-card__meta",
      style: {
        marginTop: 8,
        color: '#4945ff',
        fontWeight: 700
      }
    }, "Use this asset") : null));
  }
  function DetailView({
    item,
    onBack,
    onSelect,
    pickerMode
  }) {
    return /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media-detail__back",
      type: "button",
      onClick: onBack
    }, "\u2190 Back"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__top",
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React__default.default.createElement("h1", {
      className: "admin-media-page__title",
      style: {
        fontSize: '2.25rem',
        lineHeight: '2.75rem'
      }
    }, item.name), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__actions"
    }, pickerMode ? /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media-page__button--primary",
      type: "button",
      onClick: () => onSelect(item)
    }, "Use this asset") : null, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media-page__button--primary",
      type: "button",
      onClick: () => window.open(item.url, '_blank', 'noopener,noreferrer')
    }, "Open asset"))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__layout"
    }, /*#__PURE__*/React__default.default.createElement("section", {
      className: "admin-media-detail__preview"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__canvas"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      className: "admin-media-detail__image",
      src: item.url,
      alt: item.alternativeText || item.name
    }))), /*#__PURE__*/React__default.default.createElement("aside", {
      className: "admin-media-detail__side"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__card-head"
    }, "Details"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__card-body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__field"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-media-detail__label"
    }, "File name"), /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-media-detail__input",
      value: item.name || '',
      disabled: true,
      readOnly: true
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__field"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-media-detail__label"
    }, "Alternative text"), /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-media-detail__input",
      value: item.alternativeText || '',
      disabled: true,
      readOnly: true
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__field"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-media-detail__label"
    }, "Caption"), /*#__PURE__*/React__default.default.createElement("textarea", {
      className: "admin-media-detail__textarea",
      value: item.caption || '',
      disabled: true,
      readOnly: true
    })))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__card-head"
    }, "Metadata"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__card-body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__meta-list"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-key"
    }, "Dimensions"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-value"
    }, item.width, " \xD7 ", item.height)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-key"
    }, "Size"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-value"
    }, item.sizeLabel)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-key"
    }, "Type"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-value"
    }, item.mime)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-key"
    }, "Provider"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-value"
    }, item.provider || 'local')), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-key"
    }, "Folder"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-value"
    }, item.folderPath || '/')), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-key"
    }, "Updated"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-value"
    }, item.updatedAtLabel)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-key"
    }, "Created"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-value"
    }, item.createdAtLabel)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-key"
    }, "Document ID"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-detail__meta-value"
    }, item.documentId))))))));
  }
  function MediaLibrary() {
    const location = reactRouter.useLocation();
    const navigate = reactRouter.useNavigate();
    const query = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
    const search = query.get('search') || '';
    const fileId = query.get('fileId') || '';
    const pickerMode = query.get('picker') === '1';
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [items, setItems] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [item, setItem] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    React.useEffect(() => {
      let active = true;
      const load = async () => {
        setLoading(true);
        setError('');
        try {
          const payload = await requestMedia(fileId ? {
            fileId
          } : {
            search
          });
          if (!active) {
            return;
          }
          setItems(payload.items ?? []);
          setCount(payload.count ?? 0);
          setItem(payload.item ?? null);
        } catch (loadError) {
          if (!active) {
            return;
          }
          setError(loadError.message);
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      };
      load();
      return () => {
        active = false;
      };
    }, [fileId, search]);
    const openList = (nextSearch = search) => {
      navigate(buildPagePath('/admin/pages/media-library', {
        ...(nextSearch ? {
          search: nextSearch
        } : {}),
        ...(pickerMode ? {
          picker: 1
        } : {})
      }));
    };
    const selectAsset = selectedItem => {
      if (!pickerMode) {
        navigate(buildPagePath('/admin/pages/media-library', {
          fileId: selectedItem.id
        }));
        return;
      }
      if (window.opener) {
        window.opener.postMessage({
          type: MEDIA_PICKER_EVENT,
          url: selectedItem.relativeUrl || selectedItem.url || ''
        }, window.location.origin);
      }
      window.close();
    };
    if (loading) {
      return /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null));
    }
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$2), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__inner"
    }, error ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "danger"
    }, error) : null, fileId && item ? /*#__PURE__*/React__default.default.createElement(DetailView, {
      item: item,
      onBack: () => openList(),
      onSelect: selectAsset,
      pickerMode: pickerMode
    }) : /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__top"
    }, /*#__PURE__*/React__default.default.createElement("h1", {
      className: "admin-media-page__title"
    }, pickerMode ? 'Choose Media' : 'Media Library'), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media-page__button--primary",
      type: "button",
      disabled: uploading,
      onClick: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = async () => {
          const files = Array.from(input.files ?? []);
          if (!files.length) {
            return;
          }
          setUploading(true);
          setError('');
          try {
            for (const file of files) {
              await uploadAdminImage(file);
            }
            const refreshedPayload = await requestMedia(search ? {
              search
            } : {});
            setItems(refreshedPayload.items ?? []);
            setCount(refreshedPayload.count ?? 0);
          } catch (uploadError) {
            setError(uploadError.message);
          } finally {
            setUploading(false);
          }
        };
        input.click();
      }
    }, uploading ? 'Uploading...' : '+ Add new assets'))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__toolbar"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__toolbar-left"
    }, /*#__PURE__*/React__default.default.createElement("select", {
      className: "admin-media-page__select",
      defaultValue: "recent"
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "recent"
    }, "Most recent uploads")), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media-page__button",
      type: "button"
    }, "Filters")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__toolbar-right"
    }, /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-media-page__search",
      value: search,
      onChange: event => openList(event.target.value),
      placeholder: "Search assets"
    }))), /*#__PURE__*/React__default.default.createElement("h2", {
      className: "admin-media-page__section-title"
    }, "Assets ", /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-media-page__count"
    }, "(", count, ")")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-grid"
    }, items.map(mediaItem => /*#__PURE__*/React__default.default.createElement(AssetCard, {
      key: mediaItem.id,
      item: mediaItem,
      pickerMode: pickerMode,
      onOpen: pickerMode ? selectAsset : nextItem => navigate(buildPagePath('/admin/pages/media-library', {
        fileId: nextItem.id
      }))
    })))))));
  }

  const STYLES$1 = `
.admin-account-page {
  min-height: 100%;
  padding: 32px 40px 64px 344px;
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
      headers: payload ? {
        'Content-Type': 'application/json'
      } : undefined,
      body: payload ? JSON.stringify(payload) : undefined
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update account.');
    }
    return data;
  }
  function AccountSettings() {
    const [loading, setLoading] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    React.useEffect(() => {
      let active = true;
      requestAccount().then(payload => {
        if (!active) {
          return;
        }
        setEmail(payload.email || '');
      }).catch(loadError => {
        if (!active) {
          return;
        }
        setError(loadError.message);
      }).finally(() => {
        if (active) {
          setLoading(false);
        }
      });
      return () => {
        active = false;
      };
    }, []);
    const onSubmit = async event => {
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
          newPassword
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
      return /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null));
    }
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$1), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-account-page"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-account-page__inner"
    }, /*#__PURE__*/React__default.default.createElement("p", {
      className: "admin-account-page__eyebrow"
    }, "Account"), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "admin-account-page__title"
    }, "Account settings"), /*#__PURE__*/React__default.default.createElement("p", {
      className: "admin-account-page__subtitle"
    }, "Update the admin email address or password used to sign in."), error ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "danger",
      mb: "lg"
    }, error) : null, success ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "success",
      mb: "lg"
    }, success) : null, /*#__PURE__*/React__default.default.createElement("form", {
      className: "admin-account-card",
      onSubmit: onSubmit
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-account-grid"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-account-field admin-account-field--full"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-account-label"
    }, "Email"), /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-account-input",
      type: "email",
      value: email,
      onChange: event => setEmail(event.target.value),
      autoComplete: "email"
    })), /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-account-field admin-account-field--full"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-account-label"
    }, "Current password"), /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-account-input",
      type: "password",
      value: currentPassword,
      onChange: event => setCurrentPassword(event.target.value),
      autoComplete: "current-password"
    })), /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-account-field"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-account-label"
    }, "New password"), /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-account-input",
      type: "password",
      value: newPassword,
      onChange: event => setNewPassword(event.target.value),
      autoComplete: "new-password"
    })), /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-account-field"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-account-label"
    }, "Confirm new password"), /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-account-input",
      type: "password",
      value: confirmPassword,
      onChange: event => setConfirmPassword(event.target.value),
      autoComplete: "new-password"
    }))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-account-actions"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-account-hint"
    }, "Saving account changes signs the current session out."), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-account-button--ghost",
      type: "button",
      onClick: () => window.location.assign('/admin/logout')
    }, "Sign out"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-account-button--primary",
      type: "submit",
      disabled: submitting
    }, submitting ? 'Saving...' : 'Save account')))))));
  }

  const CONTENT_PAGE_ORDER = ['site-settings', 'homepage', 'about-page', 'blog-page', 'pricing-page', 'faq-page', 'meeting-rooms-page', 'virtual-office-page', 'contact-page', 'privacy-policy-page', 'terms-page'];
  const CONTENT_PAGE_LABELS = {
    'site-settings': 'Site Setting',
    'homepage': 'Homepage',
    'about-page': 'About Page',
    'blog-page': 'Blog Page',
    'pricing-page': 'Pricing Page',
    'faq-page': 'FAQ Page',
    'meeting-rooms-page': 'Meeting Rooms Page',
    'virtual-office-page': 'Virtual Office Page',
    'contact-page': 'Contact Page',
    'privacy-policy-page': 'Privacy Policy Page',
    'terms-page': 'Terms Page'
  };
  const RESOURCE_LABELS = {
    'blog-posts': 'Blog Post',
    'faq-items': 'FAQ Item',
    'meeting-rooms': 'Meeting Room',
    'pricing-plans': 'Pricing Plan'
  };
  const SIDEBAR_WIDTH = 304;
  const RAIL_WIDTH = 48;
  const STYLES = `
.admin-sidebar-shell {
  position: fixed;
  inset: 0 auto 0 0;
  width: ${SIDEBAR_WIDTH}px;
  display: flex;
  background: #ffffff;
  border-right: 1px solid #eaebf0;
  z-index: 50;
  transform: translateX(0);
  transition: transform 0.2s ease;
}

.admin-sidebar-shell--rail-only {
  width: ${RAIL_WIDTH}px;
}

.admin-sidebar-shell--hidden {
  transform: translateX(-${SIDEBAR_WIDTH}px);
}

.admin-sidebar-rail {
  width: 48px;
  border-right: 1px solid #eaebf0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 10px;
  background: #ffffff;
}

.admin-sidebar-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
  margin-bottom: 2px;
}

.admin-rail-button {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #666687;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.admin-rail-button--active {
  background: #f0ebff;
  color: #7b79ff;
}

.admin-rail-button svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.admin-rail-spacer {
  flex: 1;
}

.admin-avatar {
  position: relative;
}

.admin-avatar__button {
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 999px;
  background: #4945ff;
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.admin-avatar__menu {
  position: absolute;
  left: 42px;
  bottom: 0;
  min-width: 156px;
  border: 1px solid #dcdce4;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(33, 33, 52, 0.16);
  padding: 6px;
  z-index: 90;
}

.admin-avatar__menu button {
  width: 100%;
  border: 0;
  background: transparent;
  text-align: left;
  padding: 8px 10px;
  border-radius: 6px;
  color: #32324d;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-avatar__menu button:hover {
  background: #f6f6f9;
}

.admin-sidebar-panel {
  width: 256px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #ffffff;
}

.admin-sidebar-header {
  padding: 14px 16px;
  border-bottom: 1px solid #eaebf0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: #32324d;
}

.admin-sidebar-body {
  padding: 14px 8px 18px;
  overflow-y: auto;
}

.admin-search {
  padding: 0 8px 12px;
}

.admin-search input {
  width: 100%;
  min-height: 2.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  box-sizing: border-box;
  font-size: 0.75rem;
}

.admin-search input:focus {
  outline: none;
  border-color: #4945ff;
}

.admin-group {
  margin-top: 10px;
}

.admin-group__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 8px;
}

.admin-group__label {
  font-size: 0.6875rem;
  line-height: 1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #8e8ea9;
}

.admin-group__count {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 6px;
  background: #f6f6f9;
  color: #666687;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  line-height: 1rem;
  font-weight: 700;
}

.admin-nav-link {
  width: 100%;
  border: 0;
  background: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 10px;
  margin: 1px 0;
  color: #32324d;
  cursor: pointer;
  text-align: left;
}

.admin-nav-link:hover {
  background: #f6f6f9;
}

.admin-nav-link--selected {
  background: #f0ebff;
  color: #4945ff;
}

.admin-nav-link__text {
  min-width: 0;
  font-size: 0.875rem;
  line-height: 1.375rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-nav-link__icon {
  width: 12px;
  color: #8e8ea9;
  font-size: 10px;
}

@media (max-width: 960px) {
  .admin-sidebar-shell {
    box-shadow: 0 18px 48px rgba(33, 33, 52, 0.12);
  }

  .admin-sidebar-shell--hidden {
    transform: translateX(-${SIDEBAR_WIDTH}px);
  }
}

@media (min-width: 961px) {
  .admin-sidebar-shell,
  .admin-sidebar-shell--hidden {
    transform: translateX(0);
  }
}
`;
  function itemMatchesSearch(label, search) {
    if (!search) {
      return true;
    }
    return label.toLowerCase().includes(search.toLowerCase());
  }
  function RailIcon({
    children
  }) {
    return /*#__PURE__*/React__default.default.createElement("svg", {
      viewBox: "0 0 24 24",
      "aria-hidden": "true"
    }, children);
  }
  function HomeIcon() {
    return /*#__PURE__*/React__default.default.createElement(RailIcon, null, /*#__PURE__*/React__default.default.createElement("path", {
      d: "M4.5 10.5 12 4l7.5 6.5"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "M6.5 9.5V19h11V9.5"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "M10 19v-5h4v5"
    }));
  }
  function PencilIcon() {
    return /*#__PURE__*/React__default.default.createElement(RailIcon, null, /*#__PURE__*/React__default.default.createElement("path", {
      d: "m3.5 20.5 4.25-1 9.75-9.75-3.25-3.25L4.5 16.25l-1 4.25Z"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "m13.5 6.5 3.25 3.25"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "M7.5 19.5h13"
    }));
  }
  function MediaIcon() {
    return /*#__PURE__*/React__default.default.createElement(RailIcon, null, /*#__PURE__*/React__default.default.createElement("rect", {
      x: "3.5",
      y: "5.5",
      width: "17",
      height: "13",
      rx: "2"
    }), /*#__PURE__*/React__default.default.createElement("circle", {
      cx: "8.5",
      cy: "10",
      r: "1.5"
    }), /*#__PURE__*/React__default.default.createElement("path", {
      d: "m5.5 16 4-4 3 3 2-2 4 3"
    }));
  }
  function Sidebar({
    isVisible
  }) {
    const location = reactRouter.useLocation();
    const navigate = reactRouter.useNavigate();
    const pages = reactRedux.useSelector(state => state.pages);
    const session = reactRedux.useSelector(state => state.session);
    const [search, setSearch] = React.useState('');
    const [menuOpen, setMenuOpen] = React.useState(false);
    const avatarRef = React.useRef(null);
    const pageItems = React.useMemo(() => CONTENT_PAGE_ORDER.map(pageName => pages.find(page => page.name === pageName)).filter(Boolean).map(page => ({
      id: page.name,
      label: CONTENT_PAGE_LABELS[page.name] ?? page.name,
      href: `/admin/pages/${page.name}`,
      selected: location.pathname.startsWith(`/admin/pages/${page.name}`)
    })).filter(page => itemMatchesSearch(page.label, search)), [location.pathname, pages, search]);
    const collectionItems = React.useMemo(() => [{
      id: 'blog-posts',
      href: '/admin/pages/blog-posts'
    }, {
      id: 'faq-items',
      href: '/admin/pages/faq-items'
    }, {
      id: 'meeting-rooms',
      href: '/admin/pages/meeting-rooms'
    }, {
      id: 'pricing-plans',
      href: '/admin/pages/pricing-plans'
    }].map(resource => ({
      id: resource.id,
      label: RESOURCE_LABELS[resource.id] ?? resource.id,
      href: resource.href,
      selected: location.pathname.startsWith(resource.href)
    })).filter(resource => itemMatchesSearch(resource.label, search)), [location.pathname, search]);
    const initial = (session?.email?.[0] ?? 'C').toUpperCase();
    const isDashboard = location.pathname === '/admin' || location.pathname === '/admin/';
    const isMedia = location.pathname.startsWith('/admin/pages/media-library');
    const showPanel = !isMedia;
    React.useEffect(() => {
      if (!menuOpen) {
        return undefined;
      }
      const handleOutsideClick = event => {
        if (!avatarRef.current?.contains(event.target)) {
          setMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [menuOpen]);
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES), /*#__PURE__*/React__default.default.createElement("div", {
      className: `admin-sidebar-shell${showPanel ? '' : ' admin-sidebar-shell--rail-only'}${isVisible ? '' : ' admin-sidebar-shell--hidden'}`
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-sidebar-rail"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      className: "admin-sidebar-logo",
      src: "/admin-assets/client-mark.svg",
      alt: "The Leadenhall Works"
    }), /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-rail-button${isDashboard ? ' admin-rail-button--active' : ''}`,
      type: "button",
      onClick: () => navigate('/admin')
    }, /*#__PURE__*/React__default.default.createElement(HomeIcon, null)), /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-rail-button${!isDashboard && !isMedia ? ' admin-rail-button--active' : ''}`,
      type: "button",
      onClick: () => navigate('/admin/pages/site-settings')
    }, /*#__PURE__*/React__default.default.createElement(PencilIcon, null)), /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-rail-button${isMedia ? ' admin-rail-button--active' : ''}`,
      type: "button",
      onClick: () => navigate('/admin/pages/media-library')
    }, /*#__PURE__*/React__default.default.createElement(MediaIcon, null)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-rail-spacer"
    }), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-avatar",
      ref: avatarRef
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-avatar__button",
      type: "button",
      onClick: () => setMenuOpen(current => !current)
    }, initial), menuOpen ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-avatar__menu"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      onClick: () => {
        setMenuOpen(false);
        navigate('/admin/pages/account');
      }
    }, "Account"), /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      onClick: () => {
        setMenuOpen(false);
        window.location.assign('/admin/logout');
      }
    }, "Sign out")) : null)), showPanel ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-sidebar-panel"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-sidebar-header"
    }, "Content Manager"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-sidebar-body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-search"
    }, /*#__PURE__*/React__default.default.createElement("input", {
      type: "text",
      placeholder: "Search",
      value: search,
      onChange: event => setSearch(event.target.value)
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-group"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-group__head"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-group__label"
    }, "Collection Types"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-group__count"
    }, collectionItems.length)), collectionItems.map(item => /*#__PURE__*/React__default.default.createElement("button", {
      key: item.id,
      className: `admin-nav-link${item.selected ? ' admin-nav-link--selected' : ''}`,
      type: "button",
      onClick: () => navigate(item.href)
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-nav-link__text"
    }, item.label)))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-group"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-group__head"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-group__label"
    }, "Single Types"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-group__count"
    }, pageItems.length)), pageItems.map(item => /*#__PURE__*/React__default.default.createElement("button", {
      key: item.id,
      className: `admin-nav-link${item.selected ? ' admin-nav-link--selected' : ''}`,
      type: "button",
      onClick: () => navigate(item.href)
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-nav-link__text"
    }, item.label)))))) : null));
  }

  function Login() {
    const props = window.__APP_STATE__ ?? {};
    const branding = reactRedux.useSelector(state => state.branding);
    const message = props.errorMessage;
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "grey",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: "xl",
      style: {
        background: 'linear-gradient(135deg, #f4efe8 0%, #e8dccf 45%, #d9c4ab 100%)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      bg: "white",
      width: ['100%', '100%', '960px'],
      minHeight: "560px",
      display: "flex",
      boxShadow: "card",
      borderRadius: "xl",
      overflow: "hidden"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: ['0', '0', '44%'],
      display: ['none', 'none', 'flex'],
      flexDirection: "column",
      justifyContent: "space-between",
      p: "xxl",
      style: {
        background: 'linear-gradient(180deg, #0f0f0f 0%, #1f1f1f 100%)',
        color: '#f5f1ea'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement("img", {
      src: "/admin-assets/logo.svg",
      alt: branding.companyName,
      style: {
        width: 72,
        height: 72,
        objectFit: 'contain',
        marginBottom: 24
      }
    }), /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
      color: "white",
      marginBottom: "lg"
    }, "Client Content Portal"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      color: "grey40"
    }, "Manage the same client-facing content surface used by the live site.")), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      color: "grey50"
    }, "The Leadenhall Works")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      action: props.action,
      method: "POST",
      flexGrow: 1,
      p: "xxl",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xxl"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      src: "/admin-assets/logo.svg",
      alt: branding.companyName,
      style: {
        width: 64,
        height: 64,
        objectFit: 'contain',
        marginBottom: 20
      }
    }), /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
      margin: "0"
    }, "Sign in"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      color: "grey60"
    }, "Client editor access for The Leadenhall Works.")), message ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "danger",
      mb: "lg"
    }, message) : null, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Email"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      name: "email",
      placeholder: "client@leadenhallworks.com"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "password",
      name: "password",
      placeholder: "Enter password",
      autoComplete: "current-password"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      size: "lg"
    }, "Log in")))));
  }

  function TopBar() {
    return null;
  }

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.CollectionManager = CollectionManager;
  AdminJS.UserComponents.ContentPageEditor = ContentPageEditor;
  AdminJS.UserComponents.MediaLibrary = MediaLibrary;
  AdminJS.UserComponents.AccountSettings = AccountSettings;
  AdminJS.UserComponents.Sidebar = Sidebar;
  AdminJS.UserComponents.Login = Login;
  AdminJS.UserComponents.TopBar = TopBar;

})(React, ReactRouter, AdminJS, AdminJSDesignSystem, ReactRedux);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbk1hbmFnZXIuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3IuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5LmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL0FjY291bnRTZXR0aW5ncy5qc3giLCIuLi9zcmMvY29tcG9uZW50cy9TaWRlYmFyLmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL0xvZ2luLmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL1RvcEJhci5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBQUklNQVJZX1BBR0VTID0gW1xuICB7IGxhYmVsOiAnSG9tZXBhZ2UnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2hvbWVwYWdlJyB9LFxuICB7IGxhYmVsOiAnQWJvdXQgUGFnZScsIGhyZWY6ICcvYWRtaW4vcGFnZXMvYWJvdXQtcGFnZScgfSxcbiAgeyBsYWJlbDogJ1ByaWNpbmcgUGFnZScsIGhyZWY6ICcvYWRtaW4vcGFnZXMvcHJpY2luZy1wYWdlJyB9LFxuICB7IGxhYmVsOiAnQ29udGFjdCBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9jb250YWN0LXBhZ2UnIH0sXG5dO1xuXG5jb25zdCBDT0xMRUNUSU9OUyA9IFtcbiAgeyBsYWJlbDogJ0Jsb2cgUG9zdHMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2Jsb2ctcG9zdHMnIH0sXG4gIHsgbGFiZWw6ICdGQVEgSXRlbXMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2ZhcS1pdGVtcycgfSxcbiAgeyBsYWJlbDogJ01lZXRpbmcgUm9vbXMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL21lZXRpbmctcm9vbXMnIH0sXG4gIHsgbGFiZWw6ICdQcmljaW5nIFBsYW5zJywgaHJlZjogJy9hZG1pbi9wYWdlcy9wcmljaW5nLXBsYW5zJyB9LFxuXTtcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLWRhc2hib2FyZCB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDM0NHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9faW5uZXIge1xuICBtYXgtd2lkdGg6IDEyNDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2V5ZWJyb3cge1xuICBtYXJnaW46IDAgMCA0cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX190aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAyLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMi43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fc3VidGl0bGUge1xuICBtYXJnaW46IDEwcHggMCAyOHB4O1xuICBtYXgtd2lkdGg6IDc4MHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwgMS4xZnIpIG1pbm1heCgwLCAwLjlmcik7XG4gIGdhcDogMTZweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4wNik7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2NhcmQtaGVhZCB7XG4gIHBhZGRpbmc6IDE2cHggMjBweCAxMnB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmNTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fY2FyZC10aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19jYXJkLWJvZHkge1xuICBwYWRkaW5nOiA4cHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2xpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2l0ZW0tY29weSB7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9faXRlbS1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9faXRlbS1tZXRhIHtcbiAgbWFyZ2luLXRvcDogMnB4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLWRhc2hib2FyZF9faXRlbS1hcnJvdyB7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX25vdGljZSB7XG4gIHBhZGRpbmc6IDIwcHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX25vdGljZS10aXRsZSB7XG4gIG1hcmdpbjogMCAwIDhweDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19ub3RpY2UtY29weSB7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2VzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2YwZjBmNTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtaGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1uYW1lIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLWVtYWlsLFxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1tZXRhIHtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtYm9keSB7XG4gIG1hcmdpbjogMTBweCAwIDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtYWN0aW9ucyB7XG4gIG1hcmdpbi10b3A6IDEycHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogOHB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19idXR0b24ge1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDlkOGU2O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDZweCAxMHB4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19idXR0b24tLWRhbmdlciB7XG4gIGJvcmRlci1jb2xvcjogI2ZmZDNjNztcbiAgY29sb3I6ICNjNzJlM2E7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2J1dHRvbi0tZGFuZ2VyOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2ZmZjVmMjtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fYnV0dG9uOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC41O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19kZXRhaWwge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmNTtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgcGFkZGluZy10b3A6IDEycHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2RldGFpbC1oZWFkaW5nIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMTI1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZGV0YWlsLWJvZHkge1xuICBtYXJnaW46IDEwcHggMCAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZGV0YWlsLWFjdGlvbnMge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBnYXA6IDhweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZXJyb3Ige1xuICBjb2xvcjogI2M3MmUzYTtcbiAgbWFyZ2luOiAxMHB4IDAgMDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZW1wdHkge1xuICBwYWRkaW5nOiAyMHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1kYXNoYm9hcmQge1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0OHB4O1xuICB9XG5cbiAgLmFkbWluLWRhc2hib2FyZF9fZ3JpZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cbmA7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuZnVuY3Rpb24gZm9ybWF0U3VibWlzc2lvbkRhdGUodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG5cbiAgaWYgKE51bWJlci5pc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2VuLUdCJywge1xuICAgIGRhdGVTdHlsZTogJ21lZGl1bScsXG4gICAgdGltZVN0eWxlOiAnc2hvcnQnLFxuICB9KS5mb3JtYXQoZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHRyaW1NZXNzYWdlKG1lc3NhZ2UpIHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyhtZXNzYWdlID8/ICcnKS50cmltKCk7XG5cbiAgaWYgKG5vcm1hbGl6ZWQubGVuZ3RoIDw9IDE4MCkge1xuICAgIHJldHVybiBub3JtYWxpemVkO1xuICB9XG5cbiAgcmV0dXJuIGAke25vcm1hbGl6ZWQuc2xpY2UoMCwgMTc3KS50cmltRW5kKCl9Li4uYDtcbn1cblxuZnVuY3Rpb24gY29lcmNlSnNvbihyZXNwb25zZVRleHQpIHtcbiAgaWYgKCFyZXNwb25zZVRleHQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hBZG1pbkpzb24odXJsLCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAuLi5vcHRpb25zLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAuLi4ob3B0aW9ucy5oZWFkZXJzIHx8IHt9KSxcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gIGNvbnN0IHBheWxvYWQgPSBjb2VyY2VKc29uKHJlc3BvbnNlVGV4dCk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBwYXlsb2FkPy5lcnJvciB8fCBwYXlsb2FkPy5tZXNzYWdlIHx8IHJlc3BvbnNlVGV4dCB8fCBgUmVxdWVzdCBmYWlsZWQgKCR7cmVzcG9uc2Uuc3RhdHVzfSkuYDtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplQWRtaW5TdWJtaXNzaW9uUGF5bG9hZChyZXNwb25zZSkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uZGF0YSkgPyByZXNwb25zZS5kYXRhIDogW107XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVN1Ym1pc3Npb25SZWNvcmQocmVjb3JkKSB7XG4gIGNvbnN0IHBhcmFtcyA9IHJlY29yZCA/PyB7fTtcblxuICByZXR1cm4ge1xuICAgIGlkOiBOdW1iZXIocGFyYW1zLmlkKSxcbiAgICBuYW1lOiBTdHJpbmcocGFyYW1zLm5hbWUgPz8gJycpLFxuICAgIGVtYWlsOiBTdHJpbmcocGFyYW1zLmVtYWlsID8/ICcnKSxcbiAgICBwaG9uZTogU3RyaW5nKHBhcmFtcy5waG9uZSA/PyAnJyksXG4gICAgbWVzc2FnZTogU3RyaW5nKHBhcmFtcy5tZXNzYWdlID8/ICcnKSxcbiAgICBzb3VyY2VQYWdlOiBTdHJpbmcocGFyYW1zLnNvdXJjZVBhZ2UgPz8gcGFyYW1zLnNvdXJjZV9wYWdlID8/ICcnKSxcbiAgICBjcmVhdGVkQXQ6IHBhcmFtcy5jcmVhdGVkQXQgPz8gcGFyYW1zLmNyZWF0ZWRfYXQgPz8gbnVsbCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplUmVzb3VyY2VTdWJtaXNzaW9uUGF5bG9hZChyZXNwb25zZSkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkocmVzcG9uc2U/LnJlY29yZHMpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIHJlc3BvbnNlLnJlY29yZHNcbiAgICAubWFwKChyZWNvcmQpID0+IG5vcm1hbGl6ZVN1Ym1pc3Npb25SZWNvcmQocmVjb3JkPy5wYXJhbXMgPz8ge30pKVxuICAgIC5maWx0ZXIoKHN1Ym1pc3Npb24pID0+IE51bWJlci5pc0Zpbml0ZShzdWJtaXNzaW9uLmlkKSk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVJlc291cmNlUmVjb3JkUGF5bG9hZChyZXNwb25zZSkge1xuICBpZiAoIXJlc3BvbnNlPy5yZWNvcmQ/LnBhcmFtcykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZVN1Ym1pc3Npb25SZWNvcmQocmVzcG9uc2UucmVjb3JkLnBhcmFtcyk7XG59XG5cbmZ1bmN0aW9uIGdldFJlY2VudFN1Ym1pc3Npb25zKHByb3BzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzPy5yZWNlbnRTdWJtaXNzaW9ucykpIHtcbiAgICByZXR1cm4gcHJvcHMucmVjZW50U3VibWlzc2lvbnM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wcz8uZGF0YT8ucmVjZW50U3VibWlzc2lvbnMpKSB7XG4gICAgcmV0dXJuIHByb3BzLmRhdGEucmVjZW50U3VibWlzc2lvbnM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wcz8ucmVjZW50TWVzc2FnZXMpKSB7XG4gICAgcmV0dXJuIHByb3BzLnJlY2VudE1lc3NhZ2VzO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU3VibWlzc2lvblBheWxvYWQoc291cmNlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZT8ucmVjZW50U3VibWlzc2lvbnMpKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5yZWNlbnRTdWJtaXNzaW9ucztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZT8uZGF0YT8ucmVjZW50U3VibWlzc2lvbnMpKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5kYXRhLnJlY2VudFN1Ym1pc3Npb25zO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5wYXlsb2FkPy5yZWNlbnRTdWJtaXNzaW9ucykpIHtcbiAgICByZXR1cm4gc291cmNlLnBheWxvYWQucmVjZW50U3VibWlzc2lvbnM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2U/LmJvZHk/LnJlY2VudFN1Ym1pc3Npb25zKSkge1xuICAgIHJldHVybiBzb3VyY2UuYm9keS5yZWNlbnRTdWJtaXNzaW9ucztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZT8ucmVzdWx0Py5yZWNlbnRTdWJtaXNzaW9ucykpIHtcbiAgICByZXR1cm4gc291cmNlLnJlc3VsdC5yZWNlbnRTdWJtaXNzaW9ucztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZT8ucmVjZW50TWVzc2FnZXMpKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5yZWNlbnRNZXNzYWdlcztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZT8uZGF0YT8ucmVjZW50TWVzc2FnZXMpKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5kYXRhLnJlY2VudE1lc3NhZ2VzO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5kYXRhPy5pdGVtcykpIHtcbiAgICByZXR1cm4gc291cmNlLmRhdGEuaXRlbXM7XG4gIH1cblxuICByZXR1cm4gW107XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZURhc2hib2FyZFJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gIGNvbnN0IHBheWxvYWQgPSByZXNwb25zZT8uZGF0YSA/PyByZXNwb25zZTtcbiAgcmV0dXJuIHJlc29sdmVTdWJtaXNzaW9uUGF5bG9hZChwYXlsb2FkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXNoYm9hcmRNZXNzYWdlcygpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FkbWluL2FwaS9kYXNoYm9hcmQnLCB7XG4gICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gIH0pO1xuXG4gIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gIGlmICghcmVzcG9uc2Uub2sgfHwgIXRleHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBsb2FkIGRhc2hib2FyZCBtZXNzYWdlcyAoJHtyZXNwb25zZS5zdGF0dXN9KS5gKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEYXNoYm9hcmQgQVBJIHJldHVybmVkIGEgbm9uLUpTT04gcmVzcG9uc2UuJyk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hBZG1pbk1lc3NhZ2VzKGxpbWl0ID0gNTApIHtcbiAgY29uc3Qgc2FmZUxpbWl0ID0gTnVtYmVyLmlzRmluaXRlKE51bWJlcihsaW1pdCkpID8gTnVtYmVyKGxpbWl0KSA6IDUwO1xuICBjb25zdCBub3JtYWxpemVDdXN0b21SZXNwb25zZSA9IChyZXNwb25zZSkgPT4gbm9ybWFsaXplQWRtaW5TdWJtaXNzaW9uUGF5bG9hZChyZXNwb25zZSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjdXN0b21QYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oYC9hZG1pbi9hcGkvY29udGFjdC1zdWJtaXNzaW9ucz9saW1pdD0ke3NhZmVMaW1pdH1gKTtcbiAgICBjb25zdCBjdXN0b21TdWJtaXNzaW9ucyA9IG5vcm1hbGl6ZUN1c3RvbVJlc3BvbnNlKGN1c3RvbVBheWxvYWQpO1xuXG4gICAgaWYgKGN1c3RvbVN1Ym1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGN1c3RvbVN1Ym1pc3Npb25zO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLndhcm4oJ0N1c3RvbSBjb250YWN0IHN1Ym1pc3Npb25zIGVuZHBvaW50IHVuYXZhaWxhYmxlOicsIGVycm9yPy5tZXNzYWdlIHx8IGVycm9yKTtcbiAgfVxuXG4gIGNvbnN0IHJlc291cmNlUGF5bG9hZCA9IGF3YWl0IGZldGNoQWRtaW5Kc29uKGAvYWRtaW4vYXBpL3Jlc291cmNlcy9jb250YWN0X3N1Ym1pc3Npb25zL2FjdGlvbnMvbGlzdD9wYWdlPTEmcGVyUGFnZT0ke3NhZmVMaW1pdH1gKTtcbiAgcmV0dXJuIG5vcm1hbGl6ZVJlc291cmNlU3VibWlzc2lvblBheWxvYWQocmVzb3VyY2VQYXlsb2FkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlQWRtaW5TdWJtaXNzaW9uKGlkKSB7XG4gIGNvbnN0IHBhcnNlZElkID0gTnVtYmVyKGlkKTtcblxuICBpZiAoIU51bWJlci5pc0Zpbml0ZShwYXJzZWRJZCkgfHwgcGFyc2VkSWQgPD0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdWJtaXNzaW9uIGlkLicpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjdXN0b21QYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oYC9hZG1pbi9hcGkvY29udGFjdC1zdWJtaXNzaW9ucy8ke3BhcnNlZElkfWAsIHsgbWV0aG9kOiAnREVMRVRFJyB9KTtcblxuICAgIGlmIChjdXN0b21QYXlsb2FkPy5vaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjdXN0b21QYXlsb2FkPy5lcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGN1c3RvbVBheWxvYWQuZXJyb3IpO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gZmFsbGJhY2sgdG8gQWRtaW5KUyByZXNvdXJjZSBlbmRwb2ludFxuICB9XG5cbiAgY29uc3QgcmVzb3VyY2VQYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oYC9hZG1pbi9hcGkvcmVzb3VyY2VzL2NvbnRhY3Rfc3VibWlzc2lvbnMvcmVjb3Jkcy8ke3BhcnNlZElkfS9kZWxldGVgLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgfSk7XG5cbiAgaWYgKHJlc291cmNlUGF5bG9hZD8ucmVjb3JkPy5iYXNlRXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gcmVzb3VyY2VQYXlsb2FkLnJlY29yZC5iYXNlRXJyb3I/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byBkZWxldGUgc3VibWlzc2lvbi4nO1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuXG4gIGlmIChyZXNvdXJjZVBheWxvYWQ/Lm5vdGljZT8udHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIHRocm93IG5ldyBFcnJvcihyZXNvdXJjZVBheWxvYWQubm90aWNlPy5tZXNzYWdlIHx8ICdVbmFibGUgdG8gZGVsZXRlIHN1Ym1pc3Npb24uJyk7XG4gIH1cblxuICByZXR1cm47XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQWRtaW5TdWJtaXNzaW9uQnlJZChpZCkge1xuICBjb25zdCBwYXJzZWRJZCA9IE51bWJlcihpZCk7XG5cbiAgaWYgKCFOdW1iZXIuaXNGaW5pdGUocGFyc2VkSWQpIHx8IHBhcnNlZElkIDw9IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgY3VzdG9tUGF5bG9hZCA9IGF3YWl0IGZldGNoQWRtaW5Kc29uKGAvYWRtaW4vYXBpL2NvbnRhY3Qtc3VibWlzc2lvbnMvJHtwYXJzZWRJZH1gKTtcbiAgICBjb25zdCBjdXN0b21TdWJtaXNzaW9uID0gbm9ybWFsaXplU3VibWlzc2lvblJlY29yZChjdXN0b21QYXlsb2FkPy5kYXRhPy5yZWNvcmQgPz8gY3VzdG9tUGF5bG9hZD8ucmVjb3JkID8/IGN1c3RvbVBheWxvYWQpO1xuXG4gICAgaWYgKGN1c3RvbVN1Ym1pc3Npb24uaWQgPiAwKSB7XG4gICAgICByZXR1cm4gY3VzdG9tU3VibWlzc2lvbjtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gbG9hZCBtZXNzYWdlIGZyb20gY3VzdG9tIGVuZHBvaW50OicsIGVycm9yPy5tZXNzYWdlIHx8IGVycm9yKTtcbiAgfVxuXG4gIGNvbnN0IHJlc291cmNlUGF5bG9hZCA9IGF3YWl0IGZldGNoQWRtaW5Kc29uKGAvYWRtaW4vYXBpL3Jlc291cmNlcy9jb250YWN0X3N1Ym1pc3Npb25zL3JlY29yZHMvJHtwYXJzZWRJZH0vc2hvd2ApO1xuICByZXR1cm4gbm9ybWFsaXplUmVzb3VyY2VSZWNvcmRQYXlsb2FkKHJlc291cmNlUGF5bG9hZCk7XG59XG5cbmZ1bmN0aW9uIFNob3J0Y3V0TGlzdCh7IHRpdGxlLCBpdGVtcywgbmF2aWdhdGUsIG1ldGEgfSkge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtaGVhZFwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlXCI+e3RpdGxlfTwvaDI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2xpc3RcIj5cbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17aXRlbS5ocmVmfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW1cIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW0tY29weVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pdGVtLWxhYmVsXCI+e2l0ZW0ubGFiZWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW0tbWV0YVwiPnttZXRhfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pdGVtLWFycm93XCI+4oaSPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuXG5mdW5jdGlvbiBNZXNzYWdlc0NhcmQoe1xuICBzdWJtaXNzaW9ucyxcbiAgc2VsZWN0ZWRTdWJtaXNzaW9uLFxuICBvbk9wZW4sXG4gIG9uRGVsZXRlLFxuICBkZWxldGluZ0lkLFxuICBvcGVyYXRpb25FcnJvcixcbn0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLWhlYWRcIj5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZC10aXRsZVwiPkN1c3RvbWVyIE1lc3NhZ2VzPC9oMj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtYm9keVwiPlxuICAgICAgICB7c3VibWlzc2lvbnMubGVuZ3RoID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlc1wiPlxuICAgICAgICAgICAge3N1Ym1pc3Npb25zLm1hcCgoc3VibWlzc2lvbikgPT4gKFxuICAgICAgICAgICAgICA8YXJ0aWNsZSBrZXk9e3N1Ym1pc3Npb24uaWR9IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLWhlYWRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLW5hbWVcIj57c3VibWlzc2lvbi5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1lbWFpbFwiPntzdWJtaXNzaW9uLmVtYWlsfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c3VibWlzc2lvbi5waG9uZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1tZXRhXCI+e3N1Ym1pc3Npb24ucGhvbmV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1tZXRhXCI+XG4gICAgICAgICAgICAgICAgICAgIHtzdWJtaXNzaW9uLnNvdXJjZVBhZ2V9XG4gICAgICAgICAgICAgICAgICAgIHtmb3JtYXRTdWJtaXNzaW9uRGF0ZShzdWJtaXNzaW9uLmNyZWF0ZWRBdCkgPyBgIMK3ICR7Zm9ybWF0U3VibWlzc2lvbkRhdGUoc3VibWlzc2lvbi5jcmVhdGVkQXQpfWAgOiAnJ31cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1ib2R5XCI+e3RyaW1NZXNzYWdlKHN1Ym1pc3Npb24ubWVzc2FnZSl9PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25PcGVuKHN1Ym1pc3Npb24pfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBPcGVuXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fYnV0dG9uIGFkbWluLWRhc2hib2FyZF9fYnV0dG9uLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkRlbGV0ZShzdWJtaXNzaW9uKX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2RlbGV0aW5nSWQgPT09IHN1Ym1pc3Npb24uaWR9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtkZWxldGluZ0lkID09PSBzdWJtaXNzaW9uLmlkID8gJ0RlbGV0aW5n4oCmJyA6ICdEZWxldGUnfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAge3NlbGVjdGVkU3VibWlzc2lvbiA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2RldGFpbFwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2RldGFpbC1oZWFkaW5nXCI+U2VsZWN0ZWQgbWVzc2FnZTwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19kZXRhaWwtYm9keVwiPntzZWxlY3RlZFN1Ym1pc3Npb24ubWVzc2FnZX08L3A+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2RldGFpbC1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2J1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uT3BlbihudWxsKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQ2xvc2VcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19idXR0b24gYWRtaW4tZGFzaGJvYXJkX19idXR0b24tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uRGVsZXRlKHNlbGVjdGVkU3VibWlzc2lvbil9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkZWxldGluZ0lkID09PSBzZWxlY3RlZFN1Ym1pc3Npb24uaWR9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtkZWxldGluZ0lkID09PSBzZWxlY3RlZFN1Ym1pc3Npb24uaWQgPyAnRGVsZXRpbmfigKYnIDogJ0RlbGV0ZSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZW1wdHlcIj5ObyBjdXN0b21lciBtZXNzYWdlcyB5ZXQuPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIHtvcGVyYXRpb25FcnJvciA/IDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19lcnJvclwiPntvcGVyYXRpb25FcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXNoYm9hcmQocHJvcHMpIHtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBbZGFzaGJvYXJkU3VibWlzc2lvbnMsIHNldERhc2hib2FyZFN1Ym1pc3Npb25zXSA9IHVzZVN0YXRlKGdldFJlY2VudFN1Ym1pc3Npb25zKHByb3BzKSk7XG4gIGNvbnN0IFtzZWxlY3RlZFN1Ym1pc3Npb24sIHNldFNlbGVjdGVkU3VibWlzc2lvbl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2RlbGV0aW5nSWQsIHNldERlbGV0aW5nSWRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtvcGVyYXRpb25FcnJvciwgc2V0T3BlcmF0aW9uRXJyb3JdID0gdXNlU3RhdGUoJycpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbFN1Ym1pc3Npb25zID0gZ2V0UmVjZW50U3VibWlzc2lvbnMocHJvcHMpO1xuXG4gICAgaWYgKGluaXRpYWxTdWJtaXNzaW9ucy5sZW5ndGgpIHtcbiAgICAgIHNldERhc2hib2FyZFN1Ym1pc3Npb25zKGluaXRpYWxTdWJtaXNzaW9ucyk7XG4gICAgfVxuICB9LCBbcHJvcHNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc0FjdGl2ZSA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkRGFzaGJvYXJkRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGFzc2lnblN1Ym1pc3Npb25zID0gKG5leHRTdWJtaXNzaW9ucykgPT4ge1xuICAgICAgICBpZiAoIWlzQWN0aXZlIHx8ICFBcnJheS5pc0FycmF5KG5leHRTdWJtaXNzaW9ucykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXREYXNoYm9hcmRTdWJtaXNzaW9ucyhuZXh0U3VibWlzc2lvbnMpO1xuICAgICAgfTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGFzaGJvYXJkUmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0RGFzaGJvYXJkKCk7XG4gICAgICAgIGNvbnN0IGRhc2hib2FyZFN1Ym1pc3Npb25zID0gbm9ybWFsaXplRGFzaGJvYXJkUmVzcG9uc2UoZGFzaGJvYXJkUmVzcG9uc2UpO1xuXG4gICAgICAgIGlmIChkYXNoYm9hcmRTdWJtaXNzaW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBhc3NpZ25TdWJtaXNzaW9ucyhkYXNoYm9hcmRTdWJtaXNzaW9ucyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmFsbGJhY2tTdWJtaXNzaW9ucyA9IGF3YWl0IGZldGNoQWRtaW5NZXNzYWdlcygpO1xuICAgICAgICBpZiAoZmFsbGJhY2tTdWJtaXNzaW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBhc3NpZ25TdWJtaXNzaW9ucyhmYWxsYmFja1N1Ym1pc3Npb25zKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXNoYm9hcmRPbmx5UGF5bG9hZCA9IGF3YWl0IGZldGNoRGFzaGJvYXJkTWVzc2FnZXMoKTtcbiAgICAgICAgY29uc3QgZGFzaGJvYXJkT25seVN1Ym1pc3Npb25zID0gbm9ybWFsaXplRGFzaGJvYXJkUmVzcG9uc2UoZGFzaGJvYXJkT25seVBheWxvYWQpO1xuICAgICAgICBhc3NpZ25TdWJtaXNzaW9ucyhkYXNoYm9hcmRPbmx5U3VibWlzc2lvbnMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZmFsbGJhY2tQYXlsb2FkID0gYXdhaXQgZmV0Y2hEYXNoYm9hcmRNZXNzYWdlcygpO1xuICAgICAgICAgIGNvbnN0IGZhbGxiYWNrU3VibWlzc2lvbnMgPSBub3JtYWxpemVEYXNoYm9hcmRSZXNwb25zZShmYWxsYmFja1BheWxvYWQpO1xuICAgICAgICAgIGFzc2lnblN1Ym1pc3Npb25zKGZhbGxiYWNrU3VibWlzc2lvbnMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBjYXRjaCAoZmFsbGJhY2tFcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUud2FybignVW5hYmxlIHRvIGxvYWQgZGFzaGJvYXJkIG1lc3NhZ2VzOicsIGVycm9yPy5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgICAgICBpZiAoZmFsbGJhY2tFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEYXNoYm9hcmQgZmFsbGJhY2sgYWxzbyBmYWlsZWQ6JywgZmFsbGJhY2tFcnJvcj8ubWVzc2FnZSB8fCBmYWxsYmFja0Vycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZERhc2hib2FyZERhdGEoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0FjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBzdWJtaXNzaW9ucyA9IGRhc2hib2FyZFN1Ym1pc3Npb25zO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5TdWJtaXNzaW9uID0gYXN5bmMgKHN1Ym1pc3Npb24pID0+IHtcbiAgICBzZXRPcGVyYXRpb25FcnJvcignJyk7XG4gICAgc2V0U2VsZWN0ZWRTdWJtaXNzaW9uKHN1Ym1pc3Npb24pO1xuXG4gICAgaWYgKCFzdWJtaXNzaW9uPy5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBmcmVzaFN1Ym1pc3Npb24gPSBhd2FpdCBmZXRjaEFkbWluU3VibWlzc2lvbkJ5SWQoc3VibWlzc2lvbi5pZCk7XG5cbiAgICAgIGlmIChmcmVzaFN1Ym1pc3Npb24pIHtcbiAgICAgICAgc2V0U2VsZWN0ZWRTdWJtaXNzaW9uKGZyZXNoU3VibWlzc2lvbik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldE9wZXJhdGlvbkVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdVbmFibGUgdG8gb3BlbiBzZWxlY3RlZCBtZXNzYWdlLicpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVEZWxldGVTdWJtaXNzaW9uID0gYXN5bmMgKHN1Ym1pc3Npb24pID0+IHtcbiAgICBpZiAoIXN1Ym1pc3Npb24/LmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0SWQgPSBOdW1iZXIoc3VibWlzc2lvbi5pZCk7XG5cbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh0YXJnZXRJZCkgfHwgdGFyZ2V0SWQgPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldERlbGV0aW5nSWQodGFyZ2V0SWQpO1xuICAgIHNldE9wZXJhdGlvbkVycm9yKCcnKTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkZWxldGVBZG1pblN1Ym1pc3Npb24odGFyZ2V0SWQpO1xuICAgICAgc2V0RGFzaGJvYXJkU3VibWlzc2lvbnMoKHByZXZpb3VzKSA9PiBwcmV2aW91cy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IHRhcmdldElkKSk7XG5cbiAgICAgIHNldFNlbGVjdGVkU3VibWlzc2lvbigocHJldmlvdXMpID0+IChwcmV2aW91cz8uaWQgPT09IHRhcmdldElkID8gbnVsbCA6IHByZXZpb3VzKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldE9wZXJhdGlvbkVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdVbmFibGUgdG8gZGVsZXRlIHN1Ym1pc3Npb24uJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldERlbGV0aW5nSWQobnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9faW5uZXJcIj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2V5ZWJyb3dcIj5Ib21lPC9wPlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX3RpdGxlXCI+Q29udGVudCBNYW5hZ2VyPC9oMT5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX3N1YnRpdGxlXCI+XG4gICAgICAgICAgICBVc2UgdGhlIHNob3J0Y3V0cyBiZWxvdyB0byBqdW1wIGludG8gc2luZ2xlIHBhZ2VzIGFuZCBjb2xsZWN0aW9uIGNvbnRlbnQgZm9yIHRoZSBsaXZlIHNpdGUuXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2dyaWRcIj5cbiAgICAgICAgICAgIDxTaG9ydGN1dExpc3RcbiAgICAgICAgICAgICAgdGl0bGU9XCJTaW5nbGUgVHlwZXNcIlxuICAgICAgICAgICAgICBpdGVtcz17UFJJTUFSWV9QQUdFU31cbiAgICAgICAgICAgICAgbmF2aWdhdGU9e25hdmlnYXRlfVxuICAgICAgICAgICAgICBtZXRhPVwiRWRpdCBzdHJ1Y3R1cmVkIHBhZ2UgY29udGVudFwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtaGVhZFwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtdGl0bGVcIj5Xb3Jrc3BhY2U8L2gyPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX25vdGljZVwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX25vdGljZS10aXRsZVwiPlByb2R1Y3Rpb24gY29udGVudCB3b3Jrc3BhY2U8L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbm90aWNlLWNvcHlcIj5cbiAgICAgICAgICAgICAgICAgIGNsaWVudEBsZWFkZW5oYWxsd29ya3MuY29tXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgPFNob3J0Y3V0TGlzdFxuICAgICAgICAgICAgICB0aXRsZT1cIkNvbGxlY3Rpb25zXCJcbiAgICAgICAgICAgICAgaXRlbXM9e0NPTExFQ1RJT05TfVxuICAgICAgICAgICAgICBuYXZpZ2F0ZT17bmF2aWdhdGV9XG4gICAgICAgICAgICAgIG1ldGE9XCJNYW5hZ2UgcmVwZWF0YWJsZSBjb250ZW50XCJcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxNZXNzYWdlc0NhcmRcbiAgICAgICAgICAgICAgc3VibWlzc2lvbnM9e3N1Ym1pc3Npb25zfVxuICAgICAgICAgICAgICBzZWxlY3RlZFN1Ym1pc3Npb249e3NlbGVjdGVkU3VibWlzc2lvbn1cbiAgICAgICAgICAgICAgb25PcGVuPXtoYW5kbGVPcGVuU3VibWlzc2lvbn1cbiAgICAgICAgICAgICAgb25EZWxldGU9e2hhbmRsZURlbGV0ZVN1Ym1pc3Npb259XG4gICAgICAgICAgICAgIGRlbGV0aW5nSWQ9e2RlbGV0aW5nSWR9XG4gICAgICAgICAgICAgIG9wZXJhdGlvbkVycm9yPXtvcGVyYXRpb25FcnJvcn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24sIHVzZU5hdmlnYXRlLCB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgTG9hZGVyLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcblxuY29uc3QgTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4gPSAvKGRlc2NyaXB0aW9ufGNvbnRlbnR8bWVzc2FnZXxib2R5fHN1YnRpdGxlfGV4Y2VycHR8aW50cm98aG91cnN8YWRkcmVzc3x0ZXh0fHBhcmFncmFwaHxvdmVydmlld3xjaGFsbGVuZ2V8cmVzdWx0fGFuc3dlcikvaTtcbmNvbnN0IElNQUdFX0ZJRUxEX1BBVFRFUk4gPSAvKGltYWdlfGNvdmVySW1hZ2V8Y29udGVudEltYWdlcykvaTtcbmNvbnN0IEJPT0xFQU5fRklFTERfUEFUVEVSTiA9IC9eKGZlYXR1cmVkfGlzRmVhdHVyZWR8aXNQb3B1bGFyKSQvaTtcbmNvbnN0IEZVTExfV0lEVEhfRklFTERfUEFUVEVSTiA9IC8oZGVzY3JpcHRpb258Y29udGVudHxhbnN3ZXJ8ZXhjZXJwdHxjb250ZW50SW1hZ2VzfGNvdmVySW1hZ2V8aW1hZ2V8ZmVhdHVyZXN8YmFkZ2VzfHRhZ3MpJC9pO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tZWRpdG9yIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMzJweCA0MHB4IDY0cHggMzQ0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuLmFkbWluLWVkaXRvcl9faW5uZXIge1xuICBtYXgtd2lkdGg6IDEyNDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG4uYWRtaW4tYmFjayB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxNHB4O1xufVxuLmFkbWluLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cbi5hZG1pbi1tZXRhIHtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uYWRtaW4tdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMi4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tc3RhdHVzIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgLjc1cmVtO1xuICBtYXJnaW4tdG9wOiAxNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYzZmMGMyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNlZmZmZWQ7XG4gIGNvbG9yOiAjMmY2ODQ2O1xuICBmb250LXNpemU6IC44MTI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLmFkbWluLWtlYmFiIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuLmFkbWluLXRhYnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWFlYWVmO1xufVxuLmFkbWluLXRhYiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMCAwIDEycHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi10YWItLWFjdGl2ZSB7IGNvbG9yOiAjNDk0NWZmOyB9XG4uYWRtaW4tdGFiLS1hY3RpdmU6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDsgcmlnaHQ6IDA7IGJvdHRvbTogLTFweDtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG59XG4uYWRtaW4tbGF5b3V0IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwxZnIpIDIzMnB4O1xuICBnYXA6IDE2cHg7XG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcbn1cbi5hZG1pbi1tYWluLWNhcmQsLmFkbWluLXNpZGUtY2FyZCwuYWRtaW4tbGlzdC1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywzMyw1MiwuMDYpO1xufVxuLmFkbWluLW1haW4tY2FyZCB7IHBhZGRpbmc6IDI0cHg7IH1cbi5hZG1pbi1zaWRlLWNhcmQgKyAuYWRtaW4tc2lkZS1jYXJkIHsgbWFyZ2luLXRvcDogMTJweDsgfVxuLmFkbWluLXNpZGUtY2FyZF9faGVhZCB7XG4gIHBhZGRpbmc6IDE0cHggMTZweCA4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi1zaWRlLWNhcmRfX2JvZHkgeyBwYWRkaW5nOiAwIDEycHggMTJweDsgfVxuLmFkbWluLXNpZGUtYnV0dG9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbiwuYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeSB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogLjgxMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4tc2lkZS1idXR0b24ge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDk0NWZmO1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG4uYWRtaW4tc2lkZS1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeTpkaXNhYmxlZCxcbi5hZG1pbi1wcmltYXJ5OmRpc2FibGVkLFxuLmFkbWluLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIGJvcmRlci1jb2xvcjogI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgKyA4cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDIyMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsMzMsNTIsLjEyKTtcbiAgcGFkZGluZzogOHB4IDA7XG4gIHotaW5kZXg6IDQwO1xufVxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xufVxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvbiB7XG4gIHdpZHRoOiAxOHB4O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uLS1tZW51IHtcbiAgd2lkdGg6IDJyZW07XG4gIGZsZXg6IDAgMCAycmVtO1xufVxuLmFkbWluLXNlY3Rpb24gKyAuYWRtaW4tc2VjdGlvbiB7IG1hcmdpbi10b3A6IDIwcHg7IH1cbi5hZG1pbi1maWVsZC1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMixtaW5tYXgoMCwxZnIpKTtcbiAgZ2FwOiAyMHB4IDI0cHg7XG59XG4uYWRtaW4tZmllbGQtLWZ1bGwgeyBncmlkLWNvbHVtbjogMSAvIC0xOyB9XG4uYWRtaW4tbGFiZWwge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAycHg7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLmFkbWluLWxhYmVsX19yZXF1aXJlZCB7IGNvbG9yOiAjZDAyYjIwOyB9XG4uYWRtaW4taW5wdXQsLmFkbWluLXRleHRhcmVhLC5hZG1pbi1zZWFyY2gtaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgcGFkZGluZzogLjYyNXJlbSAuODc1cmVtO1xuICBmb250LXNpemU6IC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBvdXRsaW5lOiBub25lO1xufVxuLmFkbWluLWlucHV0IHsgbWluLWhlaWdodDogMi41cmVtOyB9XG4uYWRtaW4tdGV4dGFyZWEgeyBtaW4taGVpZ2h0OiA1Ljc1cmVtOyByZXNpemU6IHZlcnRpY2FsOyB9XG4uYWRtaW4taW5wdXQ6Zm9jdXMsLmFkbWluLXRleHRhcmVhOmZvY3VzLC5hZG1pbi1zZWFyY2gtaW5wdXQ6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDFweCAjNDk0NWZmO1xufVxuLmFkbWluLWlucHV0OmRpc2FibGVkLFxuLmFkbWluLXRleHRhcmVhOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tcmVwZWF0YWJsZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAxMnB4IDE2cHggMTBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fdGl0bGUgeyBmb250LXNpemU6IC43NXJlbTsgZm9udC13ZWlnaHQ6IDYwMDsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2NvdW50IHsgY29sb3I6ICM4ZThlYTk7IGZvbnQtc2l6ZTogLjc1cmVtOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbSArIC5hZG1pbi1yZXBlYXRhYmxlX19pdGVtIHsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtLS1kcmFnLW92ZXIgc3VtbWFyeSB7IGJhY2tncm91bmQ6ICNmMGYwZmY7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5IHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnk6Oi13ZWJraXQtZGV0YWlscy1tYXJrZXIgeyBkaXNwbGF5OiBub25lOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeS1sZWZ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2J1bGxldCB7XG4gIHdpZHRoOiAyMHB4OyBoZWlnaHQ6IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBiYWNrZ3JvdW5kOiAjZjBmMGY1O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IC42MjVyZW07XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fbmFtZSB7IGZvbnQtc2l6ZTogLjg3NXJlbTsgZm9udC13ZWlnaHQ6IDYwMDsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDEwcHg7XG4gIGNvbG9yOiAjOGU4ZWE5O1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2ljb24tYnV0dG9uIHtcbiAgYm9yZGVyOiAwOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgY29sb3I6IGluaGVyaXQ7IGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZSB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IGdyYWI7XG4gIHBhZGRpbmc6IDAgMnB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmFjdGl2ZSB7IGN1cnNvcjogZ3JhYmJpbmc7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZTpkaXNhYmxlZCB7XG4gIGNvbG9yOiAjYzRjNGQyO1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2ljb24tYnV0dG9uOmRpc2FibGVkLFxuLmFkbWluLXJlcGVhdGFibGVfX2FkZDpkaXNhYmxlZCB7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2JvZHkgeyBwYWRkaW5nOiAxNnB4OyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IC44NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2ltYWdlLXByZXZpZXcge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2ltYWdlLXByZXZpZXcgLmFkbWluLW1lZGlhX190aHVtYiB7XG4gIG1heC13aWR0aDogMjgwcHg7XG4gIG1heC1oZWlnaHQ6IDE4MHB4O1xufVxuLmFkbWluLXRvZ2dsZSB7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAuNjI1cmVtIC44NzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cbi5hZG1pbi1maWVsZC0tYm9vbGVhbiAuYWRtaW4tdG9nZ2xlIHtcbiAgd2lkdGg6IGF1dG87XG4gIG1pbi13aWR0aDogMTgwcHg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgZ2FwOiAxMHB4O1xufVxuLmFkbWluLXRvZ2dsZTpoYXMoaW5wdXQ6ZGlzYWJsZWQpIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG4uYWRtaW4tbWVkaWEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG4uYWRtaW4tbWVkaWFfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDE0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuLmFkbWluLW1lZGlhX19zdGFjayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xufVxuLmFkbWluLW1lZGlhX190aHVtYiB7XG4gIG1heC13aWR0aDogMjQwcHg7XG4gIG1heC1oZWlnaHQ6IDE0MHB4O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5hZG1pbi1tZWRpYV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogNHB4O1xufVxuLmFkbWluLW1lZGlhX19hY3Rpb24ge1xuICB3aWR0aDogMnJlbTsgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG4uYWRtaW4tbWVkaWFfX2FjdGlvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLW1lZGlhX19maWxlbmFtZSB7IGNvbG9yOiAjNjY2Njg3OyBmb250LXNpemU6IC43NXJlbTsgfVxuLmFkbWluLW1lZGlhX19zb3VyY2UgeyBtYXJnaW4tdG9wOiAxMHB4OyB9XG4uYWRtaW4tbWVkaWFfX3NvdXJjZS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbn1cbi5hZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvbiB7XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1tZWRpYV9fZXJyb3Ige1xuICBjb2xvcjogI2QwMmIyMDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbn1cbi5hZG1pbi1saXN0LXRvb2xiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cbi5hZG1pbi1saXN0LWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEycHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uYWRtaW4tc2VhcmNoLXdyYXAgeyB3aWR0aDogMjgwcHg7IH1cbi5hZG1pbi1saXN0LW1ldGEge1xuICBtYXJnaW46IDEycHggMCAzMnB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG4uYWRtaW4tdG9vbGJhci1jbHVzdGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uYWRtaW4tdG9vbGJhci1idXR0b24ge1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIHBhZGRpbmc6IDAgMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXRvb2xiYXItYnV0dG9uLS1pY29uIHtcbiAgd2lkdGg6IDIuNXJlbTtcbiAgcGFkZGluZzogMDtcbn1cbi5hZG1pbi10b29sYmFyLWJ1dHRvbi0tYWN0aXZlIHtcbiAgYm9yZGVyLWNvbG9yOiAjNDk0NWZmO1xuICBjb2xvcjogIzQ5NDVmZjtcbn1cbi5hZG1pbi10b29sYmFyLXNlYXJjaCB7XG4gIHdpZHRoOiAyODBweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAgMC44NzVyZW07XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IGNhbGMoMTAwJSArIDhweCk7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMzIwcHg7XG4gIG1heC1oZWlnaHQ6IDQyMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDEycHggMzJweCByZ2JhKDMzLDMzLDUyLC4xMik7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIHotaW5kZXg6IDIwO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNHB4O1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fdGl0bGUge1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19yZXNldCB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19ncm91cCArIC5hZG1pbi1saXN0LXBvcG92ZXJfX2dyb3VwIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX2xhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX3NlbGVjdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fY2hlY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDhweCAwO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fY2hlY2sgaW5wdXQge1xuICB3aWR0aDogMS4yNXJlbTtcbiAgaGVpZ2h0OiAxLjI1cmVtO1xufVxuLmFkbWluLWxpc3QtY2FyZF9faGVhZCB7XG4gIHBhZGRpbmc6IDE2cHggMjBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG59XG4uYWRtaW4tbGlzdC10YWJsZSB0aCB7XG4gIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLWxpc3QtdGFibGUgdGQge1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBmb250LXNpemU6IC44NzVyZW07XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG4uYWRtaW4tbGlzdC1yb3ctbWVudS1jZWxsIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNDRweDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51LXRyaWdnZXIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogY2FsYygxMDAlIC0gNnB4KTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAyMjBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDEycHggMzJweCByZ2JhKDMzLDMzLDUyLC4xMik7XG4gIHBhZGRpbmc6IDhweCAwO1xuICB6LWluZGV4OiAyNDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pdGVtOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pdGVtLS1kYW5nZXIge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uYWRtaW4tbGlzdC10YWJsZSB0aCBidXR0b24ge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAwO1xuICBjb2xvcjogaW5oZXJpdDtcbiAgZm9udDogaW5oZXJpdDtcbiAgdGV4dC10cmFuc2Zvcm06IGluaGVyaXQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHRyIHsgY3Vyc29yOiBwb2ludGVyOyB9XG4uYWRtaW4tbGlzdC10YWJsZSB0cjpob3ZlciB7IGJhY2tncm91bmQ6ICNmYWZhZmI7IH1cbi5hZG1pbi1saXN0LXN0YXR1cyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAxLjc1cmVtO1xuICBwYWRkaW5nOiAwIC42MjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBiYWNrZ3JvdW5kOiAjZWZmZmVkO1xuICBjb2xvcjogIzJmNjg0NjtcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4tcHJpbWFyeSB7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAgLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXNlY29uZGFyeSB7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAgLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLWxpc3QtYm9vbGVhbiB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDFyZW07XG4gIGhlaWdodDogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGZvbnQtc2l6ZTogMC42MjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tbGlzdC1ib29sZWFuLS15ZXMge1xuICBiYWNrZ3JvdW5kOiAjMmY2ODQ2O1xuICBjb2xvcjogI2ZmZjtcbn1cbi5hZG1pbi1saXN0LWJvb2xlYW4tLW5vIHtcbiAgYmFja2dyb3VuZDogI2QwMmIyMDtcbiAgY29sb3I6ICNmZmY7XG59XG5AbWVkaWEgKG1heC13aWR0aDogMTE4MHB4KSB7XG4gIC5hZG1pbi1sYXlvdXQgeyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjsgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1lZGl0b3IgeyBwYWRkaW5nOiAyMHB4IDE2cHggNDhweDsgfVxuICAuYWRtaW4tZmllbGQtZ3JpZCB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyB9XG4gIC5hZG1pbi1saXN0LXRvb2xiYXIgeyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBhbGlnbi1pdGVtczogc3RyZXRjaDsgfVxuICAuYWRtaW4tc2VhcmNoLXdyYXAgeyB3aWR0aDogMTAwJTsgfVxufVxuYDtcblxuZnVuY3Rpb24gdG9MYWJlbChuYW1lKSB7XG4gIHJldHVybiBuYW1lXG4gICAgLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csICckMSAkMicpXG4gICAgLnJlcGxhY2UoL1tfLV0rL2csICcgJylcbiAgICAucmVwbGFjZSgvXFxiZmFxXFxiL2dpLCAnRkFRJylcbiAgICAucmVwbGFjZSgvXi4vLCAodikgPT4gdi50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gY2xvbmVWYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xufVxuXG5mdW5jdGlvbiBnZXRFbXB0eUl0ZW0oc2FtcGxlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNhbXBsZSkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoc2FtcGxlICYmIHR5cGVvZiBzYW1wbGUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIE9iamVjdC5rZXlzKHNhbXBsZSlcbiAgICAgICAgLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgaWYgKFsnaWQnLCAnZG9jdW1lbnRJZCcsICdzdGF0dXMnLCAndXBkYXRlZEF0JywgJ3B1Ymxpc2hlZEF0J10uaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIFtrZXksIHNhbXBsZVtrZXldID8/IG51bGxdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBba2V5LCBnZXRFbXB0eUl0ZW0oc2FtcGxlW2tleV0pXTtcbiAgICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2FtcGxlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHNhbXBsZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gdG9Db21wYXJhYmxlVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoaXRlbSkgPT4gdG9Db21wYXJhYmxlVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpXG4gICAgICAuc29ydCgpXG4gICAgICAuZmlsdGVyKChrZXkpID0+ICFbJ3VwZGF0ZWRBdCcsICdwdWJsaXNoZWRBdCcsICdzdGF0dXMnXS5pbmNsdWRlcyhrZXkpKVxuICAgICAgLnJlZHVjZSgoYWNjdW11bGF0b3IsIGtleSkgPT4ge1xuICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gdG9Db21wYXJhYmxlVmFsdWUodmFsdWVba2V5XSk7XG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaGFzTWVhbmluZ2Z1bFZhbHVlKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5zb21lKChpdGVtKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModmFsdWUpXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4gIVsnaWQnLCAnZG9jdW1lbnRJZCcsICd1cGRhdGVkQXQnLCAncHVibGlzaGVkQXQnLCAnc3RhdHVzJ10uaW5jbHVkZXMoa2V5KSlcbiAgICAgIC5zb21lKChbLCBuZXN0ZWRWYWx1ZV0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShuZXN0ZWRWYWx1ZSkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZSAhPSBudWxsO1xufVxuXG5mdW5jdGlvbiBidWlsZEFkbWluUGF0aChwYXRobmFtZSwgcGFyYW1zKSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBPYmplY3QuZW50cmllcyhwYXJhbXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgc2VhcmNoUGFyYW1zLnNldChrZXksIFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgcmV0dXJuIGAke3BhdGhuYW1lfSR7cXVlcnlTdHJpbmcgPyBgPyR7cXVlcnlTdHJpbmd9YCA6ICcnfWA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGlzcGxheWVkRmllbGRzKHZhbHVlKSB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUgPz8gJycpXG4gICAgLnNwbGl0KCcsJylcbiAgICAubWFwKChmaWVsZCkgPT4gZmllbGQudHJpbSgpKVxuICAgIC5maWx0ZXIoQm9vbGVhbik7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSW5wdXRWYWx1ZShuZXh0UmF3VmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGN1cnJlbnRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAobmV4dFJhd1ZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0UmF3VmFsdWUpO1xuICAgIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkKSA/IGN1cnJlbnRWYWx1ZSA6IHBhcnNlZDtcbiAgfVxuICByZXR1cm4gbmV4dFJhd1ZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0pIHtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgaWYgKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIFN0cmluZyhpdGVtLnRleHQgPz8gJycpO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBnZXRNZWRpYURpc3BsYXlOYW1lKHZhbHVlLCBmYWxsYmFjayA9ICdVcGxvYWRlZCBpbWFnZScpIHtcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlID8/ICcnKS50cmltKCk7XG5cbiAgaWYgKCFyYXcpIHtcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkID0gcmF3LnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcbiAgY29uc3QgcGFydHMgPSBub3JtYWxpemVkLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMV0gfHwgZmFsbGJhY2s7XG59XG5cbmZ1bmN0aW9uIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sIG5leHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG5leHRWYWx1ZTtcbiAgfVxuXG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5pdGVtLFxuICAgICAgdGV4dDogbmV4dFZhbHVlLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyB0ZXh0OiBuZXh0VmFsdWUgfTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZU1lZGlhUHJldmlld1VybCh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuXG4gIGlmICghbm9ybWFsaXplZCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmICgvXmh0dHBzPzpcXC9cXC8vaS50ZXN0KG5vcm1hbGl6ZWQpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG4gIH1cblxuICBpZiAobm9ybWFsaXplZC5zdGFydHNXaXRoKCcvLycpKSB7XG4gICAgcmV0dXJuIGBodHRwczoke25vcm1hbGl6ZWR9YDtcbiAgfVxuXG4gIGlmIChub3JtYWxpemVkLnN0YXJ0c1dpdGgoJy91cGxvYWRzLycpIHx8IG5vcm1hbGl6ZWQuc3RhcnRzV2l0aCgnL2FkbWluLWFzc2V0cy8nKSkge1xuICAgIHJldHVybiBgaHR0cDovL2xvY2FsaG9zdDozMDAxJHtub3JtYWxpemVkfWA7XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplZDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXRQYXRoKHZhbHVlLCBwYXRoLCBuZXh0VmFsdWUpIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXh0VmFsdWU7XG4gIH1cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gdXBkYXRlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRWYWx1ZSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoKSB7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmZpbHRlcigoXywgaW5kZXgpID0+IGluZGV4ICE9PSBwYXRoWzBdKSA6IHZhbHVlO1xuICB9XG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IHJlbW92ZUF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0KTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRBdFBhdGgodmFsdWUsIHBhdGgsIG5leHRJdGVtKSB7XG4gIGlmICghcGF0aC5sZW5ndGgpIHtcbiAgICByZXR1cm4gWy4uLihBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW10pLCBuZXh0SXRlbV07XG4gIH1cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gYXBwZW5kQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRJdGVtKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoLCBvZmZzZXQpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gcGF0aFswXTtcbiAgICBjb25zdCBuZXh0SW5kZXggPSBpbmRleCArIG9mZnNldDtcblxuICAgIGlmIChuZXh0SW5kZXggPCAwIHx8IG5leHRJbmRleCA+PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9uZSA9IFsuLi52YWx1ZV07XG4gICAgY29uc3QgW21vdmVkXSA9IGNsb25lLnNwbGljZShpbmRleCwgMSk7XG4gICAgY2xvbmUuc3BsaWNlKG5leHRJbmRleCwgMCwgbW92ZWQpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IG1vdmVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgb2Zmc2V0KTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5VGl0bGUoZGVmaW5pdGlvbiwgcmVjb3JkKSB7XG4gIGlmICghcmVjb3JkKSB7XG4gICAgcmV0dXJuIGRlZmluaXRpb24ubGFiZWw7XG4gIH1cbiAgcmV0dXJuIHJlY29yZFtkZWZpbml0aW9uLnRpdGxlRmllbGRdIHx8IGRlZmluaXRpb24ubGFiZWw7XG59XG5cbmZ1bmN0aW9uIGlzQmxvZ0Rpc2FibGVkRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpIHtcbiAgcmV0dXJuIGRlZmluaXRpb24/Lm5hbWUgPT09ICdibG9nLXBvc3RzJyAmJiBmaWVsZCA9PT0gJ2ZlYXR1cmVkJztcbn1cblxuZnVuY3Rpb24gaXNGYXFEaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIHJldHVybiBkZWZpbml0aW9uPy5uYW1lID09PSAnZmFxLWl0ZW1zJyAmJiBmaWVsZCA9PT0gJ2lzRmVhdHVyZWQnO1xufVxuXG5mdW5jdGlvbiBpc01lZXRpbmdSb29tRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZCkge1xuICByZXR1cm4gZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ21lZXRpbmctcm9vbXMnICYmIGZpZWxkID09PSAnaXNGZWF0dXJlZCc7XG59XG5cbmZ1bmN0aW9uIGlzVmlzaWJpbGl0eVRvZ2dsZUZpZWxkKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIHJldHVybiBpc0Jsb2dEaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKVxuICAgIHx8IGlzRmFxRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZClcbiAgICB8fCBpc01lZXRpbmdSb29tRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZCk7XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkRGlzcGxheUxhYmVsKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIGlmIChpc1Zpc2liaWxpdHlUb2dnbGVGaWVsZChkZWZpbml0aW9uLCBmaWVsZCkpIHtcbiAgICByZXR1cm4gJ1Zpc2liaWxpdHknO1xuICB9XG5cbiAgcmV0dXJuIHRvTGFiZWwoZmllbGQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0UGFnZShwYWdlTmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSA/PyB7fSk7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYC9hZG1pbi9hcGkvcGFnZXMvJHtwYWdlTmFtZX0ke3F1ZXJ5U3RyaW5nID8gYD8ke3F1ZXJ5U3RyaW5nfWAgOiAnJ31gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QgPz8gJ0dFVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IG9wdGlvbnMuYm9keSA/IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYm9keSkgOiB1bmRlZmluZWQsXG4gICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICB9LFxuICApO1xuXG4gIGNvbnN0IHJlc3BvbnNlVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgbGV0IHBheWxvYWQgPSBudWxsO1xuXG4gIHRyeSB7XG4gICAgcGF5bG9hZCA9IHJlc3BvbnNlVGV4dCA/IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KSA6IHt9O1xuICB9IGNhdGNoIHtcbiAgICBwYXlsb2FkID0gbnVsbDtcbiAgfVxuXG4gIGlmICghcmVzcG9uc2Uub2sgfHwgIXBheWxvYWQpIHtcbiAgICBjb25zdCB0cmltbWVkVGV4dCA9IHJlc3BvbnNlVGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBpc0h0bWwgPSB0cmltbWVkVGV4dC5zdGFydHNXaXRoKCc8IWRvY3R5cGUnKSB8fCB0cmltbWVkVGV4dC5zdGFydHNXaXRoKCc8aHRtbCcpO1xuICAgIGNvbnN0IHJlZGlyZWN0ZWRUb0xvZ2luID0gcmVzcG9uc2UucmVkaXJlY3RlZCAmJiByZXNwb25zZS51cmwuaW5jbHVkZXMoJy9hZG1pbi9sb2dpbicpO1xuICAgIGNvbnN0IGlzQXV0aEVycm9yID0gcmVzcG9uc2Uuc3RhdHVzID09PSA0MDEgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSA0MDMgfHwgcmVkaXJlY3RlZFRvTG9naW47XG5cbiAgICBpZiAoaXNBdXRoRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91ciBhZG1pbiBzZXNzaW9uIGV4cGlyZWQuIFJlZnJlc2ggYW5kIHNpZ24gaW4gYWdhaW4uJyk7XG4gICAgfVxuXG4gICAgaWYgKHBheWxvYWQ/Lm1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGlmIChwYXlsb2FkPy5lcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQuZXJyb3IpO1xuICAgIH1cblxuICAgIGlmIChpc0h0bWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2VydmVyIHJldHVybmVkIGFuIEhUTUwgZXJyb3IgcGFnZSAoJHtyZXNwb25zZS5zdGF0dXMgfHwgJ3Vua25vd24nfSkuIENoZWNrIGJhY2tlbmQgbG9ncy5gKTtcbiAgICB9XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlcXVlc3QgZmFpbGVkICgke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcignUmVxdWVzdCBmYWlsZWQuJyk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkQWRtaW5JbWFnZShmaWxlKSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvbWVkaWEvdXBsb2FkJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvciB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgfVxuXG4gIGNvbnN0IHVwbG9hZGVkVXJsID0gcGF5bG9hZD8udXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnJlbGF0aXZlVXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnVybDtcblxuICBpZiAoIXVwbG9hZGVkVXJsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgc3VjY2VlZGVkIGJ1dCByZXR1cm5lZCBubyBVUkwuJyk7XG4gIH1cblxuICByZXR1cm4gdXBsb2FkZWRVcmw7XG59XG5cbmNvbnN0IE1FRElBX1BJQ0tFUl9FVkVOVCA9ICdhZG1pbmpzLW1lZGlhLXNlbGVjdCc7XG5cbmZ1bmN0aW9uIGNob29zZUFkbWluTGlicmFyeUltYWdlKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGlja2VyV2luZG93ID0gd2luZG93Lm9wZW4oXG4gICAgICAnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnk/cGlja2VyPTEnLFxuICAgICAgJ2FkbWluLW1lZGlhLWxpYnJhcnktcGlja2VyJyxcbiAgICAgICdwb3B1cD15ZXMsd2lkdGg9MTQ0MCxoZWlnaHQ9OTAwLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMnLFxuICAgICk7XG5cbiAgICBpZiAoIXBpY2tlcldpbmRvdykge1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcignTWVkaWEgbGlicmFyeSBwb3B1cCB3YXMgYmxvY2tlZC4nKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGNsb3NlV2F0Y2hlcik7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgZXZlbnQuc291cmNlICE9PSBwaWNrZXJXaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuZGF0YT8udHlwZSAhPT0gTUVESUFfUElDS0VSX0VWRU5UKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgY2xlYW51cCgpO1xuICAgICAgcmVzb2x2ZSh0eXBlb2YgZXZlbnQuZGF0YS51cmwgPT09ICdzdHJpbmcnID8gZXZlbnQuZGF0YS51cmwgOiAnJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsb3NlV2F0Y2hlciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAocGlja2VyV2luZG93LmNsb3NlZCAmJiAhZmluaXNoZWQpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgIH1cbiAgICB9LCA1MDApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIE1lZGlhRmllbGQoeyBsYWJlbCwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IHVybHMgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXS5maWx0ZXIoQm9vbGVhbik7XG4gIGNvbnN0IGZpbGVJbnB1dFJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW3VwbG9hZGluZywgc2V0VXBsb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3VwbG9hZEVycm9yLCBzZXRVcGxvYWRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fY2FudmFzXCI+XG4gICAgICAgICAge3VybHMubGVuZ3RoID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc3RhY2tcIj5cbiAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdGh1bWJcIiBzcmM9e3VybHNbMF19IGFsdD17bGFiZWx9IC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4odXJsc1swXSwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyl9PuKGlzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHBhdGgsIEFycmF5LmlzQXJyYXkodmFsdWUpID8gW10gOiAnJyl9PuKclTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fZmlsZW5hbWVcIj57Z2V0TWVkaWFEaXNwbGF5TmFtZSh1cmxzWzBdKX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2Pk5vIG1lZGlhIHNlbGVjdGVkLjwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2VcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVXJsID0gYXdhaXQgY2hvb3NlQWRtaW5MaWJyYXJ5SW1hZ2UoKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZFVybCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBbLi4udmFsdWUsIHNlbGVjdGVkVXJsXSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBzZWxlY3RlZFVybCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gY2hvb3NlIGltYWdlIGZyb20gbWVkaWEgbGlicmFyeS4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIENob29zZSBmcm9tIG1lZGlhIGxpYnJhcnlcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxuICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICBtdWx0aXBsZT17QXJyYXkuaXNBcnJheSh2YWx1ZSl9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17YXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5maWxlcyA/PyBbXSk7XG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmxzID0gW107XG4gICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmwgPSBhd2FpdCB1cGxvYWRBZG1pbkltYWdlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB1cGxvYWRlZFVybHMucHVzaCh1cGxvYWRlZFVybCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBbLi4udmFsdWUsIC4uLnVwbG9hZGVkVXJsc10pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UocGF0aCwgdXBsb2FkZWRVcmxzWzBdIHx8ICcnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dXBsb2FkRXJyb3IgPyA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lcnJvclwiPnt1cGxvYWRFcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBQcmltaXRpdmVGaWVsZCh7IGRlZmluaXRpb24sIGZpZWxkLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSBnZXRGaWVsZERpc3BsYXlMYWJlbChkZWZpbml0aW9uLCBmaWVsZCk7XG5cbiAgaWYgKElNQUdFX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkpIHtcbiAgICByZXR1cm4gPE1lZGlhRmllbGQgbGFiZWw9e2xhYmVsfSB2YWx1ZT17dmFsdWV9IHBhdGg9e3BhdGh9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPjtcbiAgfVxuXG4gIGlmIChCT09MRUFOX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkpIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkRmllbGQgPSBpc1Zpc2liaWxpdHlUb2dnbGVGaWVsZChkZWZpbml0aW9uLCBmaWVsZCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tYm9vbGVhblwiPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10b2dnbGVcIj5cbiAgICAgICAgICA8c3Bhbj57aXNEaXNhYmxlZEZpZWxkID8gJ0hpZGUgb24gd2Vic2l0ZScgOiAodmFsdWUgPyAnQWN0aXZlJyA6ICdEaXNhYmxlZCcpfTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17Qm9vbGVhbih2YWx1ZSl9IGRpc2FibGVkPXtkaXNhYmxlZH0gb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgZXZlbnQudGFyZ2V0LmNoZWNrZWQpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb25zdCBjbGFzc05hbWUgPSBGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkgPyAnYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGwnIDogJ2FkbWluLWZpZWxkJztcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgICAge2ZpZWxkICE9PSAnc29ydE9yZGVyJyAmJiAhQk9PTEVBTl9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgPC9sYWJlbD5cbiAgICAgIHtNVUxUSUxJTkVfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSA/IChcbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tdGV4dGFyZWFcIlxuICAgICAgICAgIHZhbHVlPXt2YWx1ZSA/PyAnJ31cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgcGFyc2VJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSwgdmFsdWUpKX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICB0eXBlPXt0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gJ251bWJlcicgOiAndGV4dCd9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlID8/ICcnfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBwYXJzZUlucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlLCB2YWx1ZSkpfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQXJyYXlGaWVsZCh7IGZpZWxkLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IGxhYmVsID0gdG9MYWJlbChmaWVsZCk7XG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdO1xuICBjb25zdCBpc0ltYWdlQXJyYXkgPSBJTUFHRV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpO1xuICBjb25zdCBbZHJhZ0luZGV4LCBzZXREcmFnSW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtkcmFnT3ZlckluZGV4LCBzZXREcmFnT3ZlckluZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbdXBsb2FkaW5nSW5kZXgsIHNldFVwbG9hZGluZ0luZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbdXBsb2FkRXJyb3IsIHNldFVwbG9hZEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgZmlsZUlucHV0UmVmcyA9IHVzZVJlZih7fSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX190aXRsZVwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fY291bnRcIj57aXRlbXMubGVuZ3RofSBlbnRyaWVzPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxkZXRhaWxzXG4gICAgICAgICAgICBrZXk9e2Ake2ZpZWxkfS0ke2luZGV4fWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yZXBlYXRhYmxlX19pdGVtJHtkcmFnT3ZlckluZGV4ID09PSBpbmRleCA/ICcgYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyJyA6ICcnfWB9XG4gICAgICAgICAgICBvcGVuPXtpbmRleCA9PT0gMH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaWYgKGRyYWdPdmVySW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyb3A9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gaW5kZXggLSBkcmFnSW5kZXg7XG4gICAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgICAgICAgICAgICBvbk1vdmVJdGVtKFsuLi5wYXRoLCBkcmFnSW5kZXhdLCBvZmZzZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldERyYWdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChudWxsKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyYWdMZWF2ZT17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19idWxsZXRcIj7ilrw8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fbmFtZVwiPlxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheVxuICAgICAgICAgICAgICAgICAgICA/IGBJbWFnZSAke2luZGV4ICsgMX1gXG4gICAgICAgICAgICAgICAgICAgIDogKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyA/IGl0ZW0gfHwgYCR7bGFiZWx9ICR7aW5kZXggKyAxfWAgOiBpdGVtPy50ZXh0IHx8IGAke2xhYmVsfSAke2luZGV4ICsgMX1gKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtKFsuLi5wYXRoLCBpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIPCfl5FcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZT17IWRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEcmFnIHRvIHJlb3JkZXJcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyhpbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDii67ii65cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3N1bW1hcnk+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheSA/IG51bGwgOiA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWwgPT09ICdUYWdzJyA/ICdUZXh0JyA6IGxhYmVsLnNsaWNlKDAsIC0xKSB8fCBsYWJlbH08L2xhYmVsPn1cbiAgICAgICAgICAgICAgICAgIHtpc0ltYWdlQXJyYXkgPyBudWxsIDogKFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5wYXRoLCBpbmRleF0sIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sIGV2ZW50LnRhcmdldC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheSAmJiByZXNvbHZlTWVkaWFQcmV2aWV3VXJsKGdldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSkpID8gKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2NhbnZhcyBhZG1pbi1yZXBlYXRhYmxlX19pbWFnZS1wcmV2aWV3XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX190aHVtYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17cmVzb2x2ZU1lZGlhUHJldmlld1VybChnZXRSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0pKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtgJHtsYWJlbH0gJHtpbmRleCArIDF9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnNcIiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbihyZXNvbHZlTWVkaWFQcmV2aWV3VXJsKGdldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSkpLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAg4oaXXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKFsuLi5wYXRoLCBpbmRleF0sIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sICcnKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIOKclVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICB7aXNJbWFnZUFycmF5ID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHVwbG9hZGluZ0luZGV4ID09PSBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZnMuY3VycmVudFtpbmRleF0/LmNsaWNrKCl9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3VwbG9hZGluZ0luZGV4ID09PSBpbmRleCA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCB1cGxvYWRpbmdJbmRleCA9PT0gaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgoaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRVcmwgPSBhd2FpdCBjaG9vc2VBZG1pbkxpYnJhcnlJbWFnZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShbLi4ucGF0aCwgaW5kZXhdLCB3aXRoUmVwZWF0YWJsZUl0ZW1WYWx1ZShpdGVtLCBzZWxlY3RlZFVybCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcihlcnJvcj8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGNob29zZSBpbWFnZSBmcm9tIG1lZGlhIGxpYnJhcnkuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3VwbG9hZGluZ0luZGV4ID09PSBpbmRleCA/ICdDaG9vc2luZy4uLicgOiAnQ2hvb3NlIGZyb20gbWVkaWEgbGlicmFyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9eyhlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucHV0UmVmcy5jdXJyZW50W2luZGV4XSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZpbGVJbnB1dFJlZnMuY3VycmVudFtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2FzeW5jIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgoaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmwgPSBhd2FpdCB1cGxvYWRBZG1pbkltYWdlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5wYXRoLCBpbmRleF0sIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sIHVwbG9hZGVkVXJsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICkpfVxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FkZFwiIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2xpY2s9eygpID0+IG9uQWRkSXRlbShwYXRoLCB7IHRleHQ6ICcnIH0pfT5cbiAgICAgICAgICArIEFkZCBhbiBlbnRyeVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAge3VwbG9hZEVycm9yID8gPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fZXJyb3JcIiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNnB4IDE0cHgnIH19Pnt1cGxvYWRFcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEZpZWxkUmVuZGVyZXIoeyBkZWZpbml0aW9uLCBmaWVsZCwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBvbkFkZEl0ZW0sIG9uUmVtb3ZlSXRlbSwgb25Nb3ZlSXRlbSwgZGlzYWJsZWQgfSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gPEFycmF5RmllbGQgZmllbGQ9e2ZpZWxkfSB2YWx1ZT17dmFsdWV9IHBhdGg9e3BhdGh9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gb25BZGRJdGVtPXtvbkFkZEl0ZW19IG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfSBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfSBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+O1xuICB9XG4gIHJldHVybiA8UHJpbWl0aXZlRmllbGQgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn0gZmllbGQ9e2ZpZWxkfSB2YWx1ZT17dmFsdWV9IHBhdGg9e3BhdGh9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTGlzdENlbGwoZmllbGQsIHZhbHVlKSB7XG4gIGlmIChmaWVsZCA9PT0gJ3N0YXR1cycpIHtcbiAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1zdGF0dXNcIj57dmFsdWV9PC9zcGFuPjtcbiAgfVxuXG4gIGlmICgoZmllbGQgPT09ICdmZWF0dXJlZCcgfHwgZmllbGQgPT09ICdpc0ZlYXR1cmVkJyB8fCBmaWVsZCA9PT0gJ2lzUG9wdWxhcicpICYmICh2YWx1ZSA9PT0gJ1llcycgfHwgdmFsdWUgPT09ICdObycpKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGFkbWluLWxpc3QtYm9vbGVhbiAke3ZhbHVlID09PSAnWWVzJyA/ICdhZG1pbi1saXN0LWJvb2xlYW4tLXllcycgOiAnYWRtaW4tbGlzdC1ib29sZWFuLS1ubyd9YH0+XG4gICAgICAgIHt2YWx1ZSA9PT0gJ1llcycgPyAn4pyTJyA6ICfinJUnfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIExpc3RWaWV3KHtcbiAgZGVmaW5pdGlvbixcbiAgcmVjb3JkcyxcbiAgY29udHJvbHMsXG4gIHNlYXJjaCxcbiAgbG9hZGluZyxcbiAgb25TZWFyY2gsXG4gIG9uT3BlblJlY29yZCxcbiAgb25DcmVhdGUsXG4gIG9uU2V0U29ydCxcbiAgb25TZXRGaWx0ZXIsXG4gIG9uUmVzZXRGaWx0ZXJzLFxuICBvblRvZ2dsZURpc3BsYXllZEZpZWxkLFxuICBvblJlc2V0RGlzcGxheWVkRmllbGRzLFxuICBvbkR1cGxpY2F0ZVJlY29yZCxcbiAgb25EZWxldGVSZWNvcmQsXG59KSB7XG4gIGNvbnN0IFtzaG93U2VhcmNoLCBzZXRTaG93U2VhcmNoXSA9IHVzZVN0YXRlKEJvb2xlYW4oc2VhcmNoKSk7XG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0Rpc3BsYXllZCwgc2V0U2hvd0Rpc3BsYXllZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWFyY2hWYWx1ZSwgc2V0U2VhcmNoVmFsdWVdID0gdXNlU3RhdGUoc2VhcmNoKTtcbiAgY29uc3QgW29wZW5NZW51SWQsIHNldE9wZW5NZW51SWRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IG1lbnVSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRTZWFyY2hWYWx1ZShzZWFyY2gpO1xuICB9LCBbc2VhcmNoXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHNlYXJjaFZhbHVlICE9PSBzZWFyY2gpIHtcbiAgICAgICAgb25TZWFyY2goc2VhcmNoVmFsdWUpO1xuICAgICAgfVxuICAgIH0sIDI1MCk7XG5cbiAgICByZXR1cm4gKCkgPT4gd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgfSwgW29uU2VhcmNoLCBzZWFyY2gsIHNlYXJjaFZhbHVlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKG1lbnVSZWYuY3VycmVudCAmJiAhbWVudVJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBkaXNwbGF5ZWRDb2x1bW5zID0gdXNlTWVtbyhcbiAgICAoKSA9PiBjb250cm9scy5hdmFpbGFibGVGaWVsZHMuZmlsdGVyKChmaWVsZCkgPT4gY29udHJvbHMuZGlzcGxheWVkRmllbGRzLmluY2x1ZGVzKGZpZWxkLmZpZWxkKSksXG4gICAgW2NvbnRyb2xzLmF2YWlsYWJsZUZpZWxkcywgY29udHJvbHMuZGlzcGxheWVkRmllbGRzXSxcbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZWRpdG9yXCI+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JfX2lubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4taGVhZGVyXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWV0YVwiPkNvbGxlY3Rpb24gVHlwZTwvZGl2PlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLXRpdGxlXCI+e2RlZmluaXRpb24ubGFiZWx9PC9oMT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQ3JlYXRlfT4rIENyZWF0ZSBuZXcgZW50cnk8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LW1ldGFcIj57cmVjb3Jkcy5sZW5ndGh9IGVudHJpZXMgZm91bmQ8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtdG9vbGJhclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tdG9vbGJhci1jbHVzdGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXRvb2xiYXItYnV0dG9uIGFkbWluLXRvb2xiYXItYnV0dG9uLS1pY29uJHtzaG93U2VhcmNoID8gJyBhZG1pbi10b29sYmFyLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93U2VhcmNoKChjdXJyZW50KSA9PiAhY3VycmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIPCflI1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge3Nob3dTZWFyY2ggPyAoXG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXRvb2xiYXItc2VhcmNoXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoVmFsdWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoVmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgYXV0b0ZvY3VzXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tdG9vbGJhci1idXR0b24ke3Nob3dGaWx0ZXJzID8gJyBhZG1pbi10b29sYmFyLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0U2hvd0ZpbHRlcnMoKGN1cnJlbnQpID0+ICFjdXJyZW50KTtcbiAgICAgICAgICAgICAgICBzZXRTaG93RGlzcGxheWVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgRmlsdGVyc1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB7c2hvd0ZpbHRlcnMgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyXCIgc3R5bGU9e3sgbGVmdDogc2hvd1NlYXJjaCA/IDMzMiA6IDUyLCByaWdodDogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fdGl0bGVcIj5GaWx0ZXJzPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fcmVzZXRcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25SZXNldEZpbHRlcnN9PlJlc2V0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge2NvbnRyb2xzLmZpbHRlcnMubWFwKChmaWx0ZXIpID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtmaWx0ZXIuZmllbGR9IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fbGFiZWxcIj57ZmlsdGVyLmxhYmVsfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3NlbGVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbnRyb2xzLmFjdGl2ZUZpbHRlcnNbZmlsdGVyLmZpZWxkXSA/PyAnJ31cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvblNldEZpbHRlcihmaWx0ZXIuZmllbGQsIGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+QWxsPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAge2ZpbHRlci5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9ufSB2YWx1ZT17b3B0aW9ufT57b3B0aW9ufTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXRvb2xiYXItY2x1c3RlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tdG9vbGJhci1idXR0b24gYWRtaW4tdG9vbGJhci1idXR0b24tLWljb24ke3Nob3dEaXNwbGF5ZWQgPyAnIGFkbWluLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRTaG93RGlzcGxheWVkKChjdXJyZW50KSA9PiAhY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOKamVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAge3Nob3dEaXNwbGF5ZWQgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX190aXRsZVwiPkRpc3BsYXllZCBmaWVsZHM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fcmVzZXRcIlxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uUmVzZXREaXNwbGF5ZWRGaWVsZHN9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBSZXNldFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAge2NvbnRyb2xzLmF2YWlsYWJsZUZpZWxkcy5tYXAoKGZpZWxkKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBrZXk9e2ZpZWxkLmZpZWxkfSBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX2NoZWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y29udHJvbHMuZGlzcGxheWVkRmllbGRzLmluY2x1ZGVzKGZpZWxkLmZpZWxkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uVG9nZ2xlRGlzcGxheWVkRmllbGQoZmllbGQuZmllbGQsIGV2ZW50LnRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntmaWVsZC5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1jYXJkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LWNhcmRfX2hlYWRcIj5cbiAgICAgICAgICAgIDxzdHJvbmc+e2RlZmluaXRpb24ubGFiZWx9PC9zdHJvbmc+XG4gICAgICAgICAgICA8c3Bhbj57bG9hZGluZyA/ICdMb2FkaW5nLi4uJyA6IGAke3JlY29yZHMubGVuZ3RofSBlbnRyaWVzYH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtdGFibGVcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIHtkaXNwbGF5ZWRDb2x1bW5zLm1hcCgoY29sdW1uKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8dGgga2V5PXtjb2x1bW4uZmllbGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvblNldFNvcnQoY29sdW1uLmZpZWxkKX0+XG4gICAgICAgICAgICAgICAgICAgICAge2NvbHVtbi5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICB7Y29udHJvbHMuc29ydEJ5ID09PSBjb2x1bW4uZmllbGQgPyBgICR7Y29udHJvbHMuc29ydE9yZGVyID09PSAnYXNjJyA/ICfihpEnIDogJ+KGkyd9YCA6ICcnfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPHRoIC8+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7cmVjb3Jkcy5tYXAoKHJlY29yZCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3JlY29yZC5kb2N1bWVudElkfSBvbkNsaWNrPXsoKSA9PiBvbk9wZW5SZWNvcmQocmVjb3JkLmlkKX0+XG4gICAgICAgICAgICAgICAgICB7ZGlzcGxheWVkQ29sdW1ucy5tYXAoKGNvbHVtbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXtgJHtyZWNvcmQuZG9jdW1lbnRJZH0tJHtjb2x1bW4uZmllbGR9YH0+e3JlbmRlckxpc3RDZWxsKGNvbHVtbi5maWVsZCwgcmVjb3JkLmNvbHVtbnNbY29sdW1uLmZpZWxkXSl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnUtY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudS10cmlnZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZCgoY3VycmVudCkgPT4gKGN1cnJlbnQgPT09IHJlY29yZC5pZCA/IG51bGwgOiByZWNvcmQuaWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAg4oCmXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICB7b3Blbk1lbnVJZCA9PT0gcmVjb3JkLmlkID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17bWVudVJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBldmVudC5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW1cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRPcGVuTWVudUlkKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbk9wZW5SZWNvcmQocmVjb3JkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pY29uXCI+4pyOPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5FZGl0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW1cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRPcGVuTWVudUlkKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkR1cGxpY2F0ZVJlY29yZChyZWNvcmQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVfX2ljb25cIj7ip4k8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkR1cGxpY2F0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pdGVtIGFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW0tLWRhbmdlclwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldE9wZW5NZW51SWQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlUmVjb3JkKHJlY29yZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudV9faWNvblwiPvCfl5E8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRlbGV0ZSBlbnRyeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBFZGl0Vmlldyh7IGRlZmluaXRpb24sIHJlY29yZCwgcHVibGlzaGVkUmVjb3JkLCBhY3RpdmVUYWIsIG9uU3dpdGNoVGFiLCBzYXZpbmcsIGVycm9yLCBvbkJhY2ssIG9uQ2hhbmdlLCBvbkFkZEl0ZW0sIG9uUmVtb3ZlSXRlbSwgb25Nb3ZlSXRlbSwgb25TYXZlLCBvblB1Ymxpc2gsIG9uRGVsZXRlLCBvbkRpc2NhcmRDaGFuZ2VzLCBvblVucHVibGlzaCwgY2FuU2F2ZSwgY2FuUHVibGlzaCwgY2FuRGlzY2FyZCwgY2FuVW5wdWJsaXNoIH0pIHtcbiAgY29uc3QgZGlzcGxheWVkUmVjb3JkID0gYWN0aXZlVGFiID09PSAncHVibGlzaGVkJyAmJiBwdWJsaXNoZWRSZWNvcmQgPyBwdWJsaXNoZWRSZWNvcmQgOiByZWNvcmQ7XG4gIGNvbnN0IGlzUHVibGlzaGVkVmlldyA9IGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkUmVjb3JkO1xuICBjb25zdCBbbWVudU9wZW4sIHNldE1lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgbWVudVJlZiA9IHVzZVJlZihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbWVudU9wZW4pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChtZW51UmVmLmN1cnJlbnQgJiYgIW1lbnVSZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgfTtcbiAgfSwgW21lbnVPcGVuXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvclwiPlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZWRpdG9yX19pbm5lclwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWJhY2tcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25CYWNrfT7ihpAgQmFjazwvYnV0dG9uPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4taGVhZGVyXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWV0YVwiPkNvbGxlY3Rpb24gVHlwZTwvZGl2PlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLXRpdGxlXCI+e2dldERpc3BsYXlUaXRsZShkZWZpbml0aW9uLCBkaXNwbGF5ZWRSZWNvcmQpfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXN0YXR1c1wiPntwdWJsaXNoZWRSZWNvcmQgPyAnUHVibGlzaGVkJyA6IChkaXNwbGF5ZWRSZWNvcmQuc3RhdHVzIHx8ICdEcmFmdCcpfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXRhYnNcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YGFkbWluLXRhYiR7YWN0aXZlVGFiID09PSAnZHJhZnQnID8gJyBhZG1pbi10YWItLWFjdGl2ZScgOiAnJ31gfSB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25Td2l0Y2hUYWIoJ2RyYWZ0Jyl9PkRSQUZUPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BhZG1pbi10YWIke2FjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgPyAnIGFkbWluLXRhYi0tYWN0aXZlJyA6ICcnfWB9IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBwdWJsaXNoZWRSZWNvcmQgJiYgb25Td2l0Y2hUYWIoJ3B1Ymxpc2hlZCcpfT5QVUJMSVNIRUQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge2Vycm9yID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiPntlcnJvcn08L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxheW91dFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWFpbi1jYXJkXCI+XG4gICAgICAgICAgICB7ZGVmaW5pdGlvbi5lZGl0TGF5b3V0Lm1hcCgocm93LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YHJvdy0ke2luZGV4fWB9IGNsYXNzTmFtZT1cImFkbWluLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkLWdyaWRcIj5cbiAgICAgICAgICAgICAgICAgIHtyb3cubWFwKChmaWVsZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8RmllbGRSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb249e2RlZmluaXRpb259XG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtmaWVsZH1cbiAgICAgICAgICAgICAgICAgICAgICBmaWVsZD17ZmllbGR9XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXllZFJlY29yZFtmaWVsZF19XG4gICAgICAgICAgICAgICAgICAgICAgcGF0aD17W2ZpZWxkXX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgb25BZGRJdGVtPXtvbkFkZEl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3ZlSXRlbT17b25Nb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNQdWJsaXNoZWRWaWV3fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YXNpZGU+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9faGVhZFwiPkVudHJ5PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi1yb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvblB1Ymxpc2h9IGRpc2FibGVkPXshY2FuUHVibGlzaH0+UHVibGlzaDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IGFkbWluLXNpZGUtYnV0dG9uLS1tZW51XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHNldE1lbnVPcGVuKChjdXJyZW50KSA9PiAhY3VycmVudCl9PuKApjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAge21lbnVPcGVuID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17bWVudVJlZn0gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5wdWJsaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5VbnB1Ymxpc2h9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvblwiPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgVW5wdWJsaXNoXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSBhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25EaXNjYXJkQ2hhbmdlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuRGlzY2FyZH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uXCI+w5c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICBEaXNjYXJkIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uU2F2ZX0gZGlzYWJsZWQ9eyFjYW5TYXZlfT5cbiAgICAgICAgICAgICAgICAgIHtzYXZpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlJ31cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2hlYWRcIj5BY3Rpb25zPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uRGVsZXRlfSBkaXNhYmxlZD17aXNQdWJsaXNoZWRWaWV3fT5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2FzaWRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb2xsZWN0aW9uTWFuYWdlcigpIHtcbiAgY29uc3QgeyBwYWdlTmFtZSB9ID0gdXNlUGFyYW1zKCk7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBhZGROb3RpY2UgPSB1c2VOb3RpY2UoKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtsaXN0TG9hZGluZywgc2V0TGlzdExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZGVmaW5pdGlvbiwgc2V0RGVmaW5pdGlvbl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3JlY29yZHMsIHNldFJlY29yZHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbY29udHJvbHMsIHNldENvbnRyb2xzXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbcmVjb3JkLCBzZXRSZWNvcmRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtvcmlnaW5hbFJlY29yZCwgc2V0T3JpZ2luYWxSZWNvcmRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtwdWJsaXNoZWRSZWNvcmQsIHNldFB1Ymxpc2hlZFJlY29yZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCdkcmFmdCcpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCBxdWVyeSA9IHVzZU1lbW8oKCkgPT4gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpLCBbbG9jYXRpb24uc2VhcmNoXSk7XG4gIGNvbnN0IHJlY29yZElkID0gcXVlcnkuZ2V0KCdyZWNvcmRJZCcpO1xuICBjb25zdCBpc05ldyA9IHF1ZXJ5LmdldCgnbmV3JykgPT09ICcxJztcbiAgY29uc3Qgc2VhcmNoID0gcXVlcnkuZ2V0KCdzZWFyY2gnKSB8fCAnJztcbiAgY29uc3Qgc3RhdHVzID0gcXVlcnkuZ2V0KCdzdGF0dXMnKSB8fCAnJztcbiAgY29uc3QgY2F0ZWdvcnkgPSBxdWVyeS5nZXQoJ2NhdGVnb3J5JykgfHwgJyc7XG4gIGNvbnN0IHBsYW5UeXBlID0gcXVlcnkuZ2V0KCdwbGFuVHlwZScpIHx8ICcnO1xuICBjb25zdCBmZWF0dXJlZCA9IHF1ZXJ5LmdldCgnZmVhdHVyZWQnKSB8fCAnJztcbiAgY29uc3QgaXNGZWF0dXJlZCA9IHF1ZXJ5LmdldCgnaXNGZWF0dXJlZCcpIHx8ICcnO1xuICBjb25zdCBpc1BvcHVsYXIgPSBxdWVyeS5nZXQoJ2lzUG9wdWxhcicpIHx8ICcnO1xuICBjb25zdCBzb3J0QnkgPSBxdWVyeS5nZXQoJ3NvcnRCeScpIHx8ICcnO1xuICBjb25zdCBzb3J0T3JkZXIgPSBxdWVyeS5nZXQoJ3NvcnRPcmRlcicpIHx8ICcnO1xuICBjb25zdCBkaXNwbGF5ZWRGaWVsZHMgPSBwYXJzZURpc3BsYXllZEZpZWxkcyhxdWVyeS5nZXQoJ2Rpc3BsYXllZEZpZWxkcycpKTtcblxuICBjb25zdCBtb2RlID0gdXNlTWVtbygoKSA9PiAocmVjb3JkSWQgfHwgaXNOZXcgPyAnZWRpdCcgOiAnbGlzdCcpLCBbcmVjb3JkSWQsIGlzTmV3XSk7XG4gIGNvbnN0IGlzRGlydHkgPSB1c2VNZW1vKFxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKHJlY29yZCkpICE9PSBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShvcmlnaW5hbFJlY29yZCkpLFxuICAgIFtyZWNvcmQsIG9yaWdpbmFsUmVjb3JkXSxcbiAgKTtcbiAgY29uc3QgaGFzRHJhZnRDb250ZW50ID0gdXNlTWVtbygoKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUocmVjb3JkKSwgW3JlY29yZF0pO1xuICBjb25zdCBoYXNVbnB1Ymxpc2hlZENoYW5nZXMgPSB1c2VNZW1vKFxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKHJlY29yZCkpICE9PSBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShwdWJsaXNoZWRSZWNvcmQpKSxcbiAgICBbcmVjb3JkLCBwdWJsaXNoZWRSZWNvcmRdLFxuICApO1xuICBjb25zdCBjYW5TYXZlID0gbW9kZSA9PT0gJ2VkaXQnICYmICFzYXZpbmcgJiYgYWN0aXZlVGFiICE9PSAncHVibGlzaGVkJyAmJiBpc0RpcnR5O1xuICBjb25zdCBjYW5QdWJsaXNoID0gbW9kZSA9PT0gJ2VkaXQnICYmICFzYXZpbmcgJiYgYWN0aXZlVGFiICE9PSAncHVibGlzaGVkJyAmJiAocHVibGlzaGVkUmVjb3JkID8gaGFzVW5wdWJsaXNoZWRDaGFuZ2VzIDogaGFzRHJhZnRDb250ZW50KTtcbiAgY29uc3QgY2FuRGlzY2FyZCA9IG1vZGUgPT09ICdlZGl0JyAmJiAhc2F2aW5nICYmIGFjdGl2ZVRhYiAhPT0gJ3B1Ymxpc2hlZCcgJiYgaGFzRHJhZnRDb250ZW50O1xuICBjb25zdCBjYW5VbnB1Ymxpc2ggPSBtb2RlID09PSAnZWRpdCcgJiYgIXNhdmluZyAmJiBCb29sZWFuKHB1Ymxpc2hlZFJlY29yZCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYWN0aXZlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBzaG91bGRCbG9jayA9IG1vZGUgPT09ICdlZGl0JyB8fCAhZGVmaW5pdGlvbjtcbiAgICAgIGlmIChzaG91bGRCbG9jaykge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0TGlzdExvYWRpbmcodHJ1ZSk7XG4gICAgICB9XG4gICAgICBzZXRFcnJvcignJyk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVxdWVzdFBhZ2UocGFnZU5hbWUsIHtcbiAgICAgICAgICBxdWVyeTogbW9kZSA9PT0gJ2VkaXQnXG4gICAgICAgICAgICA/IChyZWNvcmRJZCA/IHsgcmVjb3JkSWQgfSA6IHsgbmV3OiAnMScgfSlcbiAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICBzZWFyY2gsXG4gICAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgICAgICAgIHBsYW5UeXBlLFxuICAgICAgICAgICAgICBmZWF0dXJlZCxcbiAgICAgICAgICAgICAgaXNGZWF0dXJlZCxcbiAgICAgICAgICAgICAgaXNQb3B1bGFyLFxuICAgICAgICAgICAgICBzb3J0QnksXG4gICAgICAgICAgICAgIHNvcnRPcmRlcixcbiAgICAgICAgICAgICAgZGlzcGxheWVkRmllbGRzOiBkaXNwbGF5ZWRGaWVsZHMuam9pbignLCcpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXREZWZpbml0aW9uKHBheWxvYWQuZGVmaW5pdGlvbik7XG4gICAgICAgIHNldFJlY29yZHMocGF5bG9hZC5yZWNvcmRzID8/IFtdKTtcbiAgICAgICAgc2V0Q29udHJvbHMocGF5bG9hZC5jb250cm9scyA/PyBudWxsKTtcbiAgICAgICAgY29uc3QgbmV4dERyYWZ0UmVjb3JkID0gcGF5bG9hZC5kcmFmdFJlY29yZCA/IGNsb25lVmFsdWUocGF5bG9hZC5kcmFmdFJlY29yZCkgOiBudWxsO1xuICAgICAgICBzZXRSZWNvcmQobmV4dERyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0T3JpZ2luYWxSZWNvcmQobmV4dERyYWZ0UmVjb3JkID8gY2xvbmVWYWx1ZShuZXh0RHJhZnRSZWNvcmQpIDogbnVsbCk7XG4gICAgICAgIHNldFB1Ymxpc2hlZFJlY29yZChwYXlsb2FkLnB1Ymxpc2hlZFJlY29yZCA/IGNsb25lVmFsdWUocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQpIDogbnVsbCk7XG4gICAgICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgICAgIH0gY2F0Y2ggKGxvYWRFcnJvcikge1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRFcnJvcihsb2FkRXJyb3IubWVzc2FnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgc2V0TGlzdExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWQoKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW21vZGUsIHBhZ2VOYW1lLCByZWNvcmRJZCwgaXNOZXcsIHNlYXJjaCwgc3RhdHVzLCBjYXRlZ29yeSwgcGxhblR5cGUsIGZlYXR1cmVkLCBpc0ZlYXR1cmVkLCBpc1BvcHVsYXIsIHNvcnRCeSwgc29ydE9yZGVyLCBkaXNwbGF5ZWRGaWVsZHMuam9pbignLCcpXSk7XG5cbiAgY29uc3QgdXBkYXRlTGlzdFF1ZXJ5ID0gKHBhdGNoKSA9PiB7XG4gICAgY29uc3QgbmV4dFBhcmFtcyA9IHtcbiAgICAgIHNlYXJjaCxcbiAgICAgIHN0YXR1cyxcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgcGxhblR5cGUsXG4gICAgICBmZWF0dXJlZCxcbiAgICAgIGlzRmVhdHVyZWQsXG4gICAgICBpc1BvcHVsYXIsXG4gICAgICBzb3J0QnksXG4gICAgICBzb3J0T3JkZXIsXG4gICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRpc3BsYXllZEZpZWxkcy5qb2luKCcsJyksXG4gICAgICAuLi5wYXRjaCxcbiAgICB9O1xuXG4gICAgbmF2aWdhdGUoYnVpbGRBZG1pblBhdGgobG9jYXRpb24ucGF0aG5hbWUsIG5leHRQYXJhbXMpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAocGF0aCwgbmV4dFZhbHVlKSA9PiB7XG4gICAgc2V0UmVjb3JkKChjdXJyZW50KSA9PiB1cGRhdGVBdFBhdGgoY3VycmVudCwgcGF0aCwgbmV4dFZhbHVlKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkSXRlbSA9IChwYXRoLCBuZXh0SXRlbSkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gYXBwZW5kQXRQYXRoKGN1cnJlbnQsIHBhdGgsIG5leHRJdGVtKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlSXRlbSA9IChwYXRoKSA9PiB7XG4gICAgc2V0UmVjb3JkKChjdXJyZW50KSA9PiByZW1vdmVBdFBhdGgoY3VycmVudCwgcGF0aCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdmVJdGVtID0gKHBhdGgsIG9mZnNldCkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gbW92ZUF0UGF0aChjdXJyZW50LCBwYXRoLCBvZmZzZXQpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlSW50ZW50ID0gYXN5bmMgKGludGVudCkgPT4ge1xuICAgIGlmICghcmVjb3JkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0U2F2aW5nKHRydWUpO1xuICAgIHNldEVycm9yKCcnKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RQYWdlKHBhZ2VOYW1lLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgaW50ZW50LFxuICAgICAgICAgIHJlY29yZElkOiByZWNvcmQuaWQgPz8gbnVsbCxcbiAgICAgICAgICByZWNvcmQsXG4gICAgICAgICAgbmV3OiBpc05ldyA/ICcxJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocGF5bG9hZC5kcmFmdFJlY29yZCkge1xuICAgICAgICBjb25zdCBuZXh0RHJhZnRSZWNvcmQgPSBjbG9uZVZhbHVlKHBheWxvYWQuZHJhZnRSZWNvcmQpO1xuICAgICAgICBzZXRSZWNvcmQobmV4dERyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0T3JpZ2luYWxSZWNvcmQoY2xvbmVWYWx1ZShuZXh0RHJhZnRSZWNvcmQpKTtcbiAgICAgIH1cbiAgICAgIHNldFB1Ymxpc2hlZFJlY29yZChwYXlsb2FkLnB1Ymxpc2hlZFJlY29yZCA/IGNsb25lVmFsdWUocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQpIDogbnVsbCk7XG4gICAgICBpZiAoaW50ZW50ID09PSAndW5wdWJsaXNoJykge1xuICAgICAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcmVjb3JkSWQgJiYgcGF5bG9hZC5kcmFmdFJlY29yZD8uaWQpIHtcbiAgICAgICAgbmF2aWdhdGUoYnVpbGRBZG1pblBhdGgobG9jYXRpb24ucGF0aG5hbWUsIHsgcmVjb3JkSWQ6IHBheWxvYWQuZHJhZnRSZWNvcmQuaWQgfSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGF5bG9hZC5ub3RpY2UpIHtcbiAgICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcGF5bG9hZC5ub3RpY2UubWVzc2FnZSwgdHlwZTogcGF5bG9hZC5ub3RpY2UudHlwZSB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBheWxvYWQuZGVsZXRlZCkge1xuICAgICAgICBuYXZpZ2F0ZShgL2FkbWluL3BhZ2VzLyR7cGFnZU5hbWV9YCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAocmVxdWVzdEVycm9yKSB7XG4gICAgICBzZXRFcnJvcihyZXF1ZXN0RXJyb3IubWVzc2FnZSk7XG4gICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiByZXF1ZXN0RXJyb3IubWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0U2F2aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGlzY2FyZENoYW5nZXMgPSAoKSA9PiB7XG4gICAgc2V0UmVjb3JkKGdldEVtcHR5SXRlbShyZWNvcmQpKTtcbiAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ3JlYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IG5ldzogMSB9KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTGlzdEFjdGlvbiA9IGFzeW5jIChpbnRlbnQsIHRhcmdldFJlY29yZElkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGludGVudCxcbiAgICAgICAgICByZWNvcmRJZDogdGFyZ2V0UmVjb3JkSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcGF5bG9hZC5ub3RpY2U/Lm1lc3NhZ2UgPz8gYCR7ZGVmaW5pdGlvbi5sYWJlbH0gdXBkYXRlZC5gLCB0eXBlOiBwYXlsb2FkLm5vdGljZT8udHlwZSA/PyAnc3VjY2VzcycgfSk7XG5cbiAgICAgIGlmIChpbnRlbnQgPT09ICdkdXBsaWNhdGUnICYmIHBheWxvYWQuZHJhZnRSZWNvcmQ/LmlkKSB7XG4gICAgICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IHJlY29yZElkOiBwYXlsb2FkLmRyYWZ0UmVjb3JkLmlkIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW50ZW50ID09PSAnZGVsZXRlJykge1xuICAgICAgICBzZXRSZWNvcmRzKChjdXJyZW50KSA9PiBjdXJyZW50LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gdGFyZ2V0UmVjb3JkSWQpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChyZXF1ZXN0RXJyb3IpIHtcbiAgICAgIHNldEVycm9yKHJlcXVlc3RFcnJvci5tZXNzYWdlKTtcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHJlcXVlc3RFcnJvci5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgIH1cbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICByZXR1cm4gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiPkNvbGxlY3Rpb24gZGVmaW5pdGlvbiBtaXNzaW5nLjwvTWVzc2FnZUJveD47XG4gIH1cblxuICBpZiAobW9kZSA9PT0gJ2xpc3QnKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMaXN0Vmlld1xuICAgICAgICBkZWZpbml0aW9uPXtkZWZpbml0aW9ufVxuICAgICAgICByZWNvcmRzPXtyZWNvcmRzfVxuICAgICAgICBjb250cm9scz17Y29udHJvbHMgPz8ge1xuICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGVmaW5pdGlvbi5saXN0Q29sdW1ucy5tYXAoKGNvbHVtbikgPT4gY29sdW1uLmZpZWxkKSxcbiAgICAgICAgICBhdmFpbGFibGVGaWVsZHM6IGRlZmluaXRpb24ubGlzdENvbHVtbnMsXG4gICAgICAgICAgZmlsdGVyczogW10sXG4gICAgICAgICAgYWN0aXZlRmlsdGVyczoge30sXG4gICAgICAgICAgc29ydEJ5OiAnJyxcbiAgICAgICAgICBzb3J0T3JkZXI6ICdkZXNjJyxcbiAgICAgICAgfX1cbiAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgIGxvYWRpbmc9e2xpc3RMb2FkaW5nfVxuICAgICAgICBvblNlYXJjaD17KG5leHRTZWFyY2gpID0+IHVwZGF0ZUxpc3RRdWVyeSh7IHNlYXJjaDogbmV4dFNlYXJjaCB9KX1cbiAgICAgICAgb25PcGVuUmVjb3JkPXsobmV4dFJlY29yZElkKSA9PiBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyByZWNvcmRJZDogbmV4dFJlY29yZElkIH0pKX1cbiAgICAgICAgb25DcmVhdGU9e2hhbmRsZUNyZWF0ZX1cbiAgICAgICAgb25TZXRTb3J0PXsoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXh0T3JkZXIgPSBjb250cm9scz8uc29ydEJ5ID09PSBmaWVsZCAmJiBjb250cm9scz8uc29ydE9yZGVyID09PSAnYXNjJyA/ICdkZXNjJyA6ICdhc2MnO1xuICAgICAgICAgIHVwZGF0ZUxpc3RRdWVyeSh7IHNvcnRCeTogZmllbGQsIHNvcnRPcmRlcjogbmV4dE9yZGVyIH0pO1xuICAgICAgICB9fVxuICAgICAgICBvblNldEZpbHRlcj17KGZpZWxkLCB2YWx1ZSkgPT4gdXBkYXRlTGlzdFF1ZXJ5KHsgW2ZpZWxkXTogdmFsdWUgfSl9XG4gICAgICAgIG9uUmVzZXRGaWx0ZXJzPXsoKSA9PiB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgIHN0YXR1czogJycsXG4gICAgICAgICAgY2F0ZWdvcnk6ICcnLFxuICAgICAgICAgIHBsYW5UeXBlOiAnJyxcbiAgICAgICAgICBmZWF0dXJlZDogJycsXG4gICAgICAgICAgaXNGZWF0dXJlZDogJycsXG4gICAgICAgICAgaXNQb3B1bGFyOiAnJyxcbiAgICAgICAgfSl9XG4gICAgICAgIG9uVG9nZ2xlRGlzcGxheWVkRmllbGQ9eyhmaWVsZCwgY2hlY2tlZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5leHRGaWVsZHMgPSBjaGVja2VkXG4gICAgICAgICAgICA/IFsuLi5uZXcgU2V0KFsuLi4oY29udHJvbHM/LmRpc3BsYXllZEZpZWxkcyA/PyBbXSksIGZpZWxkXSldXG4gICAgICAgICAgICA6IChjb250cm9scz8uZGlzcGxheWVkRmllbGRzID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGZpZWxkKTtcblxuICAgICAgICAgIHVwZGF0ZUxpc3RRdWVyeSh7XG4gICAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IG5leHRGaWVsZHMuam9pbignLCcpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9fVxuICAgICAgICBvblJlc2V0RGlzcGxheWVkRmllbGRzPXsoKSA9PiB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGVmaW5pdGlvbi5saXN0Q29sdW1ucy5tYXAoKGNvbHVtbikgPT4gY29sdW1uLmZpZWxkKS5qb2luKCcsJyksXG4gICAgICAgIH0pfVxuICAgICAgICBvbkR1cGxpY2F0ZVJlY29yZD17KHRhcmdldFJlY29yZElkKSA9PiBoYW5kbGVMaXN0QWN0aW9uKCdkdXBsaWNhdGUnLCB0YXJnZXRSZWNvcmRJZCl9XG4gICAgICAgIG9uRGVsZXRlUmVjb3JkPXsodGFyZ2V0UmVjb3JkSWQpID0+IGhhbmRsZUxpc3RBY3Rpb24oJ2RlbGV0ZScsIHRhcmdldFJlY29yZElkKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGlmICghcmVjb3JkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEVkaXRWaWV3XG4gICAgICBkZWZpbml0aW9uPXtkZWZpbml0aW9ufVxuICAgICAgcmVjb3JkPXtyZWNvcmR9XG4gICAgICBwdWJsaXNoZWRSZWNvcmQ9e3B1Ymxpc2hlZFJlY29yZH1cbiAgICAgIGFjdGl2ZVRhYj17YWN0aXZlVGFifVxuICAgICAgb25Td2l0Y2hUYWI9e3NldEFjdGl2ZVRhYn1cbiAgICAgIHNhdmluZz17c2F2aW5nfVxuICAgICAgZXJyb3I9e2Vycm9yfVxuICAgICAgb25CYWNrPXsoKSA9PiBuYXZpZ2F0ZShgL2FkbWluL3BhZ2VzLyR7cGFnZU5hbWV9YCl9XG4gICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgb25BZGRJdGVtPXtoYW5kbGVBZGRJdGVtfVxuICAgICAgb25SZW1vdmVJdGVtPXtoYW5kbGVSZW1vdmVJdGVtfVxuICAgICAgb25Nb3ZlSXRlbT17aGFuZGxlTW92ZUl0ZW19XG4gICAgICBvblNhdmU9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ3NhdmUnKX1cbiAgICAgIG9uUHVibGlzaD17KCkgPT4gaGFuZGxlU2F2ZUludGVudCgncHVibGlzaCcpfVxuICAgICAgb25EZWxldGU9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ2RlbGV0ZScpfVxuICAgICAgb25EaXNjYXJkQ2hhbmdlcz17aGFuZGxlRGlzY2FyZENoYW5nZXN9XG4gICAgICBvblVucHVibGlzaD17KCkgPT4gaGFuZGxlU2F2ZUludGVudCgndW5wdWJsaXNoJyl9XG4gICAgICBjYW5TYXZlPXtjYW5TYXZlfVxuICAgICAgY2FuUHVibGlzaD17Y2FuUHVibGlzaH1cbiAgICAgIGNhbkRpc2NhcmQ9e2NhbkRpc2NhcmR9XG4gICAgICBjYW5VbnB1Ymxpc2g9e2NhblVucHVibGlzaH1cbiAgICAvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVBhcmFtcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgTG9hZGVyLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuY29uc3QgTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4gPSAvKGRlc2NyaXB0aW9ufGNvbnRlbnR8bWVzc2FnZXxib2R5fHN1YnRpdGxlfGV4Y2VycHR8aW50cm98aG91cnN8YWRkcmVzc3x0ZXh0fHBhcmFncmFwaHxvdmVydmlld3xjaGFsbGVuZ2V8cmVzdWx0KS9pO1xuY29uc3QgSU1BR0VfRklFTERfUEFUVEVSTiA9IC8oaW1hZ2V8YmFja2dyb3VuZHxsb2dvfHRodW1ibmFpbHxmZWF0dXJlZCkvaTtcbmNvbnN0IFBBVEhfRklFTERfUEFUVEVSTiA9IC8oXnBhdGgkfFBhdGgkKS87XG5jb25zdCBGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4gPSAvKGRlc2NyaXB0aW9ufGNvbnRlbnR8bWVzc2FnZXxib2R5fHN1YnRpdGxlfGV4Y2VycHR8aW50cm98b3ZlcnZpZXd8Y2hhbGxlbmdlfHJlc3VsdHxiYWNrZ3JvdW5kfGltYWdlfGdhbGxlcnl8c2VjdGlvbnN8dGVzdGltb25pYWxzfHNlcnZpY2VzfHdoeUNob29zZUl0ZW1zfGZlYXR1cmVDaGlwc3xzb2NpYWxMaW5rc3xmYXFJdGVtc3xjb21wYXJpc29uUm93c3xjb21wYXJpc29uQ29sdW1uc3xzdG9yeVBhcmFncmFwaHN8cmVsYXRlZFdvcmtzcGFjZXN8Y2hhbGxlbmdlSXRlbXN8YW1lbml0aWVzfG5hdmlnYXRpb258Zm9vdGVyfGZvcm0pL2k7XG5jb25zdCBSRVFVSVJFRF9GSUVMRF9QQVRURVJOID0gLyhoZXJvVGl0bGV8aGVyb1N1YnRpdGxlfHN0b3J5VGl0bGV8d2h5Q2hvb3NlVGl0bGV8YW1lbml0aWVzVGl0bGV8dGl0bGUpJC9pO1xuY29uc3QgUk9VVEVfT1BUSU9OUyA9IFtcbiAgeyB2YWx1ZTogJy8nLCBsYWJlbDogJ0hvbWUnIH0sXG4gIHsgdmFsdWU6ICcvcHJpY2luZycsIGxhYmVsOiAnUHJpY2luZycgfSxcbiAgeyB2YWx1ZTogJy9tZWV0aW5nLXJvb21zJywgbGFiZWw6ICdNZWV0aW5nIFJvb21zJyB9LFxuICB7IHZhbHVlOiAnL3ZpcnR1YWwtb2ZmaWNlJywgbGFiZWw6ICdWaXJ0dWFsIE9mZmljZScgfSxcbiAgeyB2YWx1ZTogJy9hYm91dCcsIGxhYmVsOiAnQWJvdXQnIH0sXG4gIHsgdmFsdWU6ICcvY29udGFjdCcsIGxhYmVsOiAnQ29udGFjdCcgfSxcbiAgeyB2YWx1ZTogJy9mYXEnLCBsYWJlbDogJ0ZBUScgfSxcbiAgeyB2YWx1ZTogJy9ibG9nJywgbGFiZWw6ICdCbG9nJyB9LFxuICB7IHZhbHVlOiAnL3ByaXZhY3knLCBsYWJlbDogJ1ByaXZhY3kgUG9saWN5JyB9LFxuICB7IHZhbHVlOiAnL3Rlcm1zJywgbGFiZWw6ICdUZXJtcycgfSxcbiAgeyB2YWx1ZTogJy9kYXNoYm9hcmQnLCBsYWJlbDogJ0Rhc2hib2FyZCcgfSxcbl07XG5cbmNvbnN0IFBBR0VfTEFZT1VUUyA9IHtcbiAgJ3NpdGUtc2V0dGluZ3MnOiBbXG4gICAgeyBmaWVsZHM6IFsnc2l0ZU5hbWUnLCAndGFnbGluZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdEVtYWlsJywgJ2NvbnRhY3RQaG9uZScsICdhZGRyZXNzJ10gfSxcbiAgICB7IGZpZWxkczogWydkZWZhdWx0U2VvVGl0bGUnLCAnZGVmYXVsdFNlb0Rlc2NyaXB0aW9uJ10gfSxcbiAgICB7IGZpZWxkczogWyduYXZpZ2F0aW9uJ10gfSxcbiAgICB7IGZpZWxkczogWydmb290ZXInXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NvY2lhbExpbmtzJ10gfSxcbiAgXSxcbiAgaG9tZXBhZ2U6IFtcbiAgICB7IGZpZWxkczogWydoZXJvJywgJ2ZlYXR1cmVDaGlwcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnc2VydmljZXNFeWVicm93JywgJ3NlcnZpY2VzS2lja2VyJywgJ3NlcnZpY2VzJ10gfSxcbiAgICB7IGZpZWxkczogWydhYm91dEhpZ2hsaWdodCddIH0sXG4gICAgeyBmaWVsZHM6IFsnd2h5Q2hvb3NlRXllYnJvdycsICd3aHlDaG9vc2VLaWNrZXInLCAnd2h5Q2hvb3NlVGl0bGUnLCAnd2h5Q2hvb3NlSXRlbXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Rlc3RpbW9uaWFsc0V5ZWJyb3cnLCAndGVzdGltb25pYWxzS2lja2VyJywgJ3Rlc3RpbW9uaWFsc1RpdGxlJywgJ3Rlc3RpbW9uaWFscyddIH0sXG4gICAgeyBmaWVsZHM6IFsnZ2FsbGVyeUV5ZWJyb3cnLCAnZ2FsbGVyeUtpY2tlcicsICdnYWxsZXJ5VGl0bGUnLCAnZ2FsbGVyeUltYWdlcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdEZvcm0nXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Zpc2l0VXNUaXRsZScsICdhZGRyZXNzTGFiZWwnLCAnZW1haWxMYWJlbCcsICdwaG9uZUxhYmVsJywgJ29wZW5Ib3Vyc0xhYmVsJywgJ3dlZWtkYXlIb3VycycsICd3ZWVrZW5kSG91cnMnLCAnbWFwQnV0dG9uTGFiZWwnXSB9LFxuICBdLFxuICAnYWJvdXQtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3N0b3J5VGl0bGUnLCAnc3RvcnlQYXJhZ3JhcGhzJywgJ3N0b3J5SW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3doeUNob29zZVRpdGxlJywgJ3doeUNob29zZUl0ZW1zJ10gfSxcbiAgICB7IGZpZWxkczogWydhbWVuaXRpZXNUaXRsZScsICdhbWVuaXRpZXNJbWFnZScsICdhbWVuaXRpZXMnXSB9LFxuICBdLFxuICAnYmxvZy1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnc2VhcmNoUGxhY2Vob2xkZXInLCAncXVpY2tTZWFyY2hUaXRsZScsICdyZWNlbnRQb3N0c1RpdGxlJywgJ2NhdGVnb3JpZXNUaXRsZScsICdwb3B1bGFyVGFnc1RpdGxlJywgJ25vUmVzdWx0c1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2RldGFpbEJhY2tMYWJlbCcsICdkZXRhaWxTZWFyY2hUaXRsZScsICdkZXRhaWxTZWFyY2hCdXR0b25MYWJlbCcsICdkZXRhaWxQb3B1bGFyVGFnc1RpdGxlJywgJ2RldGFpbFJlY2VudFBvc3RzVGl0bGUnLCAnZGV0YWlsUmVsYXRlZFdvcmtzcGFjZXNUaXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnZGV0YWlsQ29tbWVudEZvcm0nXSB9LFxuICAgIHsgZmllbGRzOiBbJ3JlbGF0ZWRXb3Jrc3BhY2VzJ10gfSxcbiAgXSxcbiAgJ3ByaWNpbmctcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbXBhcmlzb25UaXRsZScsICdmZWF0dXJlTGlzdFRpdGxlJywgJ2ZlYXR1cmVMaXN0U3VidGl0bGUnLCAnY29tcGFyaXNvbkNvbHVtbnMnLCAnY29tcGFyaXNvblJvd3MnLCAncmVjb21tZW5kZWRMYWJlbCcsICdwdXJjaGFzZUJ1dHRvbkxhYmVsJ10gfSxcbiAgICB7IGZpZWxkczogWydmYXFUaXRsZScsICdmYXFTdWJ0aXRsZScsICdmYXFJdGVtcyddIH0sXG4gIF0sXG4gICdmYXEtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydleWVicm93JywgJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZScsICd0aXRsZScsICdkZXNjcmlwdGlvbiddIH0sXG4gICAgeyBmaWVsZHM6IFsnc2VhcmNoUGxhY2Vob2xkZXInLCAnbm9SZXN1bHRzVGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnY3RhVGl0bGUnLCAnY3RhRGVzY3JpcHRpb24nLCAnY3RhQnV0dG9uTGFiZWwnXSB9LFxuICBdLFxuICAnbWVldGluZy1yb29tcy1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsncm9vbXNUaXRsZScsICdyb29tc1N1YnRpdGxlJywgJ2Jvb2tOb3dMYWJlbCcsICdyZWFkTW9yZUxhYmVsJywgJ3BvcHVsYXJMYWJlbCddIH0sXG4gICAgeyBmaWVsZHM6IFsncGxhbnNUaXRsZScsICdwbGFuc1N1YnRpdGxlJywgJ2dldFN0YXJ0ZWRMYWJlbCddIH0sXG4gICAgeyBmaWVsZHM6IFsnYW1lbml0aWVzVGl0bGUnLCAnYW1lbml0aWVzU3VidGl0bGUnLCAnYW1lbml0aWVzJ10gfSxcbiAgXSxcbiAgJ3ZpcnR1YWwtb2ZmaWNlLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydvdmVydmlld1RpdGxlJywgJ292ZXJ2aWV3VGV4dCcsICdmZWF0dXJlZEltYWdlJywgJ2dhbGxlcnlJbWFnZXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NoYWxsZW5nZVRpdGxlJywgJ2NoYWxsZW5nZUludHJvJywgJ2NoYWxsZW5nZUl0ZW1zJ10gfSxcbiAgICB7IGZpZWxkczogWydyZXN1bHRUaXRsZScsICdyZXN1bHRUZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydjdGFUaXRsZScsICdjdGFEZXNjcmlwdGlvbicsICdjdGFCdXR0b25MYWJlbCddIH0sXG4gICAgeyBmaWVsZHM6IFsncHJvamVjdEluZm9UaXRsZScsICdwcm9qZWN0RGF0ZUxhYmVsJywgJ3Byb2plY3REYXRlVmFsdWUnLCAncHJvamVjdFdlYnNpdGVMYWJlbCcsICdwcm9qZWN0V2Vic2l0ZVZhbHVlJywgJ3Byb2plY3RDYXRlZ29yeUxhYmVsJywgJ3Byb2plY3RDYXRlZ29yeVZhbHVlJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0Rm9ybSddIH0sXG4gIF0sXG4gICdjb250YWN0LXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydpbnRyb0V5ZWJyb3cnLCAnaW50cm9UaXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnYWRkcmVzc0NhcmRUaXRsZScsICdwaG9uZUNhcmRUaXRsZScsICdlbWFpbENhcmRUaXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnZm9ybSddIH0sXG4gICAgeyBmaWVsZHM6IFsnbWFwVGl0bGUnLCAnbWFwRGVzY3JpcHRpb24nXSB9LFxuICBdLFxuICAncHJpdmFjeS1wb2xpY3ktcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJ10gfSxcbiAgICB7IGZpZWxkczogWydlZmZlY3RpdmVEYXRlTGFiZWwnLCAnZWZmZWN0aXZlRGF0ZVZhbHVlJywgJ2ludHJvVGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnc2VjdGlvbnMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RUaXRsZScsICdjb250YWN0Qm9keScsICdjb250YWN0QnV0dG9uTGFiZWwnXSB9LFxuICBdLFxuICAndGVybXMtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJ10gfSxcbiAgICB7IGZpZWxkczogWydlZmZlY3RpdmVEYXRlTGFiZWwnLCAnZWZmZWN0aXZlRGF0ZVZhbHVlJywgJ2ludHJvVGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnc2VjdGlvbnMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RUaXRsZScsICdjb250YWN0Qm9keScsICdjb250YWN0QnV0dG9uTGFiZWwnXSB9LFxuICBdLFxufTtcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLWVkaXRvciB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDM0NHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLWVkaXRvcl9faW5uZXIge1xuICBtYXgtd2lkdGg6IDEyNDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5hZG1pbi1iYWNrIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbn1cblxuLmFkbWluLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLmFkbWluLW1ldGEge1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xuICBjb2xvcjogIzY2NjY4NztcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4uYWRtaW4tdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMi4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tc3RhdHVzIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgbWFyZ2luLXRvcDogMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2M2ZjBjMjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZWZmZmVkO1xuICBjb2xvcjogIzJmNjg0NjtcbiAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYWRtaW4ta2ViYWIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi10YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWFlZjtcbn1cblxuLmFkbWluLXRhYiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMCAwIDEycHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi10YWItLWFjdGl2ZSB7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tdGFiLS1hY3RpdmU6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogLTFweDtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxZnIpIDIzMnB4O1xuICBnYXA6IDE2cHg7XG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcbn1cblxuLmFkbWluLW1haW4tY2FyZCxcbi5hZG1pbi1zaWRlLWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xufVxuXG4uYWRtaW4tbWFpbi1jYXJkIHtcbiAgcGFkZGluZzogMjRweDtcbn1cblxuLmFkbWluLXNlY3Rpb24gKyAuYWRtaW4tc2VjdGlvbiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5hZG1pbi1maWVsZC1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xuICBnYXA6IDIwcHggMjRweDtcbn1cblxuLmFkbWluLWZpZWxkIHtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uYWRtaW4tZmllbGQtLWZ1bGwge1xuICBncmlkLWNvbHVtbjogMSAvIC0xO1xufVxuXG4uYWRtaW4tbGFiZWwge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAycHg7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5hZG1pbi1sYWJlbF9fcmVxdWlyZWQge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cblxuLmFkbWluLWlucHV0LFxuLmFkbWluLXRleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmFkbWluLWlucHV0IHtcbiAgbWluLWhlaWdodDogMi41cmVtO1xufVxuXG4uYWRtaW4taW5wdXQ6Zm9jdXMsXG4uYWRtaW4tdGV4dGFyZWE6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDFweCAjNDk0NWZmO1xufVxuXG4uYWRtaW4taW5wdXQ6ZGlzYWJsZWQsXG4uYWRtaW4tdGV4dGFyZWE6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLXRleHRhcmVhIHtcbiAgbWluLWhlaWdodDogNS43NXJlbTtcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcbn1cblxuLmFkbWluLW1lZGlhIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDE0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX2VtcHR5IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWFfX3N0YWNrIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fdGh1bWIge1xuICBtYXgtd2lkdGg6IDI0MHB4O1xuICBtYXgtaGVpZ2h0OiAxNDBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuLmFkbWluLW1lZGlhX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fYWN0aW9uIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tbWVkaWFfX2FjdGlvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uYWRtaW4tbWVkaWFfX2ZpbGVuYW1lIHtcbiAgbWF4LXdpZHRoOiAyODBweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uYWRtaW4tbWVkaWFfX3NvdXJjZSB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b24ge1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLW1lZGlhX19lcnJvciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xufVxuXG4uYWRtaW4tb2JqZWN0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tb2JqZWN0X190aXRsZSB7XG4gIG1hcmdpbjogMCAwIDEycHg7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHggMTBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fY291bnQge1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbSArIC5hZG1pbi1yZXBlYXRhYmxlX19pdGVtIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtLS1kcmFnLW92ZXIgc3VtbWFyeSB7XG4gIGJhY2tncm91bmQ6ICNmMGYwZmY7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtW29wZW5dIHN1bW1hcnkge1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZiO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeSB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnk6Oi13ZWJraXQtZGV0YWlscy1tYXJrZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeS1sZWZ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19idWxsZXQge1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogI2YwZjBmNTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjYyNXJlbTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX25hbWUge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbiB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZSB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IGdyYWI7XG4gIHBhZGRpbmc6IDAgMnB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGU6YWN0aXZlIHtcbiAgY3Vyc29yOiBncmFiYmluZztcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmRpc2FibGVkIHtcbiAgY29sb3I6ICNjNGM0ZDI7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQ6ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQ6ZGlzYWJsZWQge1xuICBjb2xvcjogIzhlOGVhOTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2JvZHkge1xuICBwYWRkaW5nOiAxNnB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1zd2l0Y2gge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xufVxuXG4uYWRtaW4tc3dpdGNoIGlucHV0IHtcbiAgYWNjZW50LWNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tc3dpdGNoOmhhcyhpbnB1dDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLXNpZGUtY2FyZCArIC5hZG1pbi1zaWRlLWNhcmQge1xuICBtYXJnaW4tdG9wOiAxMnB4O1xufVxuXG4uYWRtaW4tc2lkZS1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1zaWRlLWNhcmRfX2JvZHkge1xuICBwYWRkaW5nOiAwIDEycHggMTJweDtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLFxuLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLS1tZW51IHtcbiAgd2lkdGg6IDJyZW07XG4gIGZsZXg6IDAgMCAycmVtO1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgKyA4cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDIyMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4xMik7XG4gIHBhZGRpbmc6IDhweCAwO1xuICB6LWluZGV4OiA0MDtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXIge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxMTgwcHgpIHtcbiAgLmFkbWluLWxheW91dCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1lZGl0b3Ige1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0OHB4O1xuICB9XG5cbiAgLmFkbWluLWZpZWxkLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5gO1xuXG5mdW5jdGlvbiB0b0xhYmVsKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVcbiAgICAucmVwbGFjZSgvKFthLXowLTldKShbQS1aXSkvZywgJyQxICQyJylcbiAgICAucmVwbGFjZSgvW18tXSsvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXGJzZW9cXGIvZ2ksICdTRU8nKVxuICAgIC5yZXBsYWNlKC9cXGJjdGFcXGIvZ2ksICdDVEEnKVxuICAgIC5yZXBsYWNlKC9cXGJmYXFcXGIvZ2ksICdGQVEnKVxuICAgIC5yZXBsYWNlKC9cXGJpZFxcYi9naSwgJ0lEJylcbiAgICAucmVwbGFjZSgvXFxidXJsXFxiL2dpLCAnVVJMJylcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgLnRyaW0oKVxuICAgIC5yZXBsYWNlKC9eLi8sICh2YWx1ZSkgPT4gdmFsdWUudG9VcHBlckNhc2UoKSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkTGFiZWwoZmllbGRLZXkpIHtcbiAgaWYgKGZpZWxkS2V5ID09PSAncGF0aCcpIHtcbiAgICByZXR1cm4gJ0Rlc3RpbmF0aW9uJztcbiAgfVxuXG4gIGlmIChmaWVsZEtleS5lbmRzV2l0aCgnUGF0aCcpKSB7XG4gICAgcmV0dXJuIHRvTGFiZWwoZmllbGRLZXkucmVwbGFjZSgvUGF0aCQvLCAnRGVzdGluYXRpb24nKSk7XG4gIH1cblxuICByZXR1cm4gdG9MYWJlbChmaWVsZEtleSk7XG59XG5cbmZ1bmN0aW9uIGdldFBhdGhPcHRpb25zKGN1cnJlbnRWYWx1ZSkge1xuICBjb25zdCBvcHRpb25zID0gWy4uLlJPVVRFX09QVElPTlNdO1xuXG4gIGlmIChjdXJyZW50VmFsdWUgJiYgIW9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IGN1cnJlbnRWYWx1ZSkpIHtcbiAgICBvcHRpb25zLnVuc2hpZnQoe1xuICAgICAgdmFsdWU6IGN1cnJlbnRWYWx1ZSxcbiAgICAgIGxhYmVsOiAnQ3VycmVudCBkZXN0aW5hdGlvbicsXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gY2xvbmVWYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xufVxuXG5mdW5jdGlvbiB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKChpdGVtKSA9PiB0b0NvbXBhcmFibGVWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpXG4gICAgICAuc29ydCgpXG4gICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gJ19fdGVtcElkJylcbiAgICAgIC5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBrZXkpID0+IHtcbiAgICAgICAgYWNjdW11bGF0b3Jba2V5XSA9IHRvQ29tcGFyYWJsZVZhbHVlKHZhbHVlW2tleV0pO1xuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9LCB7fSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGhhc01lYW5pbmdmdWxWYWx1ZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUuc29tZSgoaXRlbSkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKGl0ZW0pKTtcbiAgfVxuXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh2YWx1ZSlcbiAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09ICdfX3RlbXBJZCcpXG4gICAgICAuc29tZSgoWywgbmVzdGVkVmFsdWVdKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUobmVzdGVkVmFsdWUpKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdmFsdWUgIT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVuYW1lKHVybCkge1xuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhuYW1lID0gbmV3IFVSTCh1cmwpLnBhdGhuYW1lO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aG5hbWUuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICByZXR1cm4gZmlsZW5hbWUgfHwgdXJsO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KCcvJykucG9wKCkgfHwgdXJsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEVtcHR5SXRlbShzYW1wbGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2FtcGxlKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmIChzYW1wbGUgJiYgdHlwZW9mIHNhbXBsZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgT2JqZWN0LmtleXMoc2FtcGxlKVxuICAgICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gJ2lkJylcbiAgICAgICAgLm1hcCgoa2V5KSA9PiBba2V5LCBnZXRFbXB0eUl0ZW0oc2FtcGxlW2tleV0pXSksXG4gICAgKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2FtcGxlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHNhbXBsZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXRQYXRoKHZhbHVlLCBwYXRoLCBuZXh0VmFsdWUpIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXh0VmFsdWU7XG4gIH1cblxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSB1cGRhdGVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgbmV4dFZhbHVlKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBdFBhdGgodmFsdWUsIHBhdGgpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZS5maWx0ZXIoKF8sIGluZGV4KSA9PiBpbmRleCAhPT0gcGF0aFswXSk7XG4gIH1cblxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSByZW1vdmVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kQXRQYXRoKHZhbHVlLCBwYXRoLCBuZXh0SXRlbSkge1xuICBpZiAoIXBhdGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFsuLi4oQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdKSwgbmV4dEl0ZW1dO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gYXBwZW5kQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRJdGVtKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoLCBvZmZzZXQpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gcGF0aFswXTtcbiAgICBjb25zdCBuZXh0SW5kZXggPSBpbmRleCArIG9mZnNldDtcblxuICAgIGlmIChuZXh0SW5kZXggPCAwIHx8IG5leHRJbmRleCA+PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9uZSA9IFsuLi52YWx1ZV07XG4gICAgY29uc3QgW21vdmVkXSA9IGNsb25lLnNwbGljZShpbmRleCwgMSk7XG4gICAgY2xvbmUuc3BsaWNlKG5leHRJbmRleCwgMCwgbW92ZWQpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IG1vdmVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgb2Zmc2V0KTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBwYXJzZUlucHV0VmFsdWUobmV4dFJhd1ZhbHVlLCBjdXJyZW50VmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBjdXJyZW50VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKG5leHRSYXdWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0UmF3VmFsdWUpO1xuICAgIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkKSA/IGN1cnJlbnRWYWx1ZSA6IHBhcnNlZDtcbiAgfVxuXG4gIHJldHVybiBuZXh0UmF3VmFsdWU7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVNZWRpYVByZXZpZXdVcmwodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xuXG4gIGlmICghdHJpbW1lZCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmICgvXmh0dHBzPzpcXC9cXC8vaS50ZXN0KHRyaW1tZWQpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnZGF0YTppbWFnZS8nKSkge1xuICAgIHJldHVybiB0cmltbWVkO1xuICB9XG5cbiAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgcmV0dXJuIHRyaW1tZWQ7XG4gIH1cblxuICByZXR1cm4gYC8ke3RyaW1tZWQucmVwbGFjZSgvXlxcLj9cXC8vLCAnJyl9YDtcbn1cblxuZnVuY3Rpb24gdG9BZG1pbkVycm9yTWVzc2FnZShlcnJvciwgZmFsbGJhY2spIHtcbiAgY29uc3QgcmVzcG9uc2VEYXRhID0gZXJyb3I/LnJlc3BvbnNlPy5kYXRhO1xuXG4gIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhPy5tZXNzYWdlID09PSAnc3RyaW5nJyAmJiByZXNwb25zZURhdGEubWVzc2FnZS50cmltKCkpIHtcbiAgICByZXR1cm4gcmVzcG9uc2VEYXRhLm1lc3NhZ2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YT8uZXJyb3IgPT09ICdzdHJpbmcnICYmIHJlc3BvbnNlRGF0YS5lcnJvci50cmltKCkpIHtcbiAgICByZXR1cm4gcmVzcG9uc2VEYXRhLmVycm9yO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlcnJvcj8ubWVzc2FnZSA9PT0gJ3N0cmluZycgJiYgZXJyb3IubWVzc2FnZS50cmltKCkpIHtcbiAgICByZXR1cm4gZXJyb3IubWVzc2FnZTtcbiAgfVxuXG4gIHJldHVybiBmYWxsYmFjaztcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkQWRtaW5JbWFnZShmaWxlKSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvbWVkaWEvdXBsb2FkJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvciB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgfVxuXG4gIGNvbnN0IHVwbG9hZGVkVXJsID0gcGF5bG9hZD8udXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnJlbGF0aXZlVXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnVybDtcblxuICBpZiAoIXVwbG9hZGVkVXJsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgc3VjY2VlZGVkIGJ1dCByZXR1cm5lZCBubyBVUkwuJyk7XG4gIH1cblxuICByZXR1cm4gdXBsb2FkZWRVcmw7XG59XG5cbmNvbnN0IE1FRElBX1BJQ0tFUl9FVkVOVCA9ICdhZG1pbmpzLW1lZGlhLXNlbGVjdCc7XG5cbmZ1bmN0aW9uIGNob29zZUFkbWluTGlicmFyeUltYWdlKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGlja2VyV2luZG93ID0gd2luZG93Lm9wZW4oXG4gICAgICAnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnk/cGlja2VyPTEnLFxuICAgICAgJ2FkbWluLW1lZGlhLWxpYnJhcnktcGlja2VyJyxcbiAgICAgICdwb3B1cD15ZXMsd2lkdGg9MTQ0MCxoZWlnaHQ9OTAwLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMnLFxuICAgICk7XG5cbiAgICBpZiAoIXBpY2tlcldpbmRvdykge1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcignTWVkaWEgbGlicmFyeSBwb3B1cCB3YXMgYmxvY2tlZC4nKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGNsb3NlV2F0Y2hlcik7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgZXZlbnQuc291cmNlICE9PSBwaWNrZXJXaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuZGF0YT8udHlwZSAhPT0gTUVESUFfUElDS0VSX0VWRU5UKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgY2xlYW51cCgpO1xuICAgICAgcmVzb2x2ZSh0eXBlb2YgZXZlbnQuZGF0YS51cmwgPT09ICdzdHJpbmcnID8gZXZlbnQuZGF0YS51cmwgOiAnJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsb3NlV2F0Y2hlciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAocGlja2VyV2luZG93LmNsb3NlZCAmJiAhZmluaXNoZWQpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgIH1cbiAgICB9LCA1MDApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzUmVxdWlyZWRGaWVsZChmaWVsZEtleSkge1xuICByZXR1cm4gUkVRVUlSRURfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkS2V5KTtcbn1cblxuZnVuY3Rpb24gZmllbGRDbGFzc05hbWUoZmllbGRLZXksIHZhbHVlKSB7XG4gIHJldHVybiBGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSkgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbidcbiAgICA/ICdhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbCdcbiAgICA6ICdhZG1pbi1maWVsZCc7XG59XG5cbmZ1bmN0aW9uIGlzSGlkZGVuRWRpdG9yRmllbGQoZmllbGRLZXkpIHtcbiAgcmV0dXJuIFN0cmluZyhmaWVsZEtleSkudG9Mb3dlckNhc2UoKSA9PT0gJ2ljb24nO1xufVxuXG5mdW5jdGlvbiBnZXRJdGVtVGl0bGUoaXRlbSwgZmFsbGJhY2tMYWJlbCwgaW5kZXgpIHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGl0ZW0pKSB7XG4gICAgcmV0dXJuIGAke2ZhbGxiYWNrTGFiZWx9ICR7aW5kZXggKyAxfWA7XG4gIH1cblxuICBjb25zdCBwcmVmZXJyZWQgPSBbXG4gICAgaXRlbS50aXRsZSxcbiAgICBpdGVtLm5hbWUsXG4gICAgaXRlbS5sYWJlbCxcbiAgICBpdGVtLnF1ZXN0aW9uLFxuICAgIGl0ZW0uZmVhdHVyZSxcbiAgICBpdGVtLnBhdGgsXG4gICAgaXRlbS5ocmVmLFxuICAgIGl0ZW0uYWx0LFxuICBdLmZpbmQoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRyaW0oKSk7XG5cbiAgcmV0dXJuIHByZWZlcnJlZCB8fCBgJHtmYWxsYmFja0xhYmVsfSAke2luZGV4ICsgMX1gO1xufVxuXG5mdW5jdGlvbiBidWlsZFNlY3Rpb25zKHBhZ2VOYW1lLCBjb250ZW50KSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhjb250ZW50ID8/IHt9KTtcbiAgY29uc3QgbGF5b3V0ID0gUEFHRV9MQVlPVVRTW3BhZ2VOYW1lXTtcblxuICBpZiAoIWxheW91dCkge1xuICAgIHJldHVybiBbeyBlbnRyaWVzIH1dO1xuICB9XG5cbiAgY29uc3QgdXNlZCA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgc2VjdGlvbnMgPSBsYXlvdXRcbiAgICAubWFwKChzZWN0aW9uKSA9PiB7XG4gICAgICBjb25zdCBzZWN0aW9uRW50cmllcyA9IHNlY3Rpb24uZmllbGRzXG4gICAgICAgIC5maWx0ZXIoKGZpZWxkKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29udGVudCA/PyB7fSwgZmllbGQpKVxuICAgICAgICAubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIHVzZWQuYWRkKGZpZWxkKTtcbiAgICAgICAgICByZXR1cm4gW2ZpZWxkLCBjb250ZW50W2ZpZWxkXV07XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4geyAuLi5zZWN0aW9uLCBlbnRyaWVzOiBzZWN0aW9uRW50cmllcyB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigoc2VjdGlvbikgPT4gc2VjdGlvbi5lbnRyaWVzLmxlbmd0aCA+IDApO1xuXG4gIGNvbnN0IGV4dHJhRW50cmllcyA9IGVudHJpZXMuZmlsdGVyKChbZmllbGRLZXldKSA9PiAhdXNlZC5oYXMoZmllbGRLZXkpKTtcblxuICBpZiAoZXh0cmFFbnRyaWVzLmxlbmd0aCkge1xuICAgIHNlY3Rpb25zLnB1c2goeyBlbnRyaWVzOiBleHRyYUVudHJpZXMgfSk7XG4gIH1cblxuICByZXR1cm4gc2VjdGlvbnM7XG59XG5cbmZ1bmN0aW9uIFByaW1pdGl2ZUZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBsYWJlbCA9IGdldEZpZWxkTGFiZWwoZmllbGRLZXkpO1xuICBjb25zdCBpbnB1dFZhbHVlID0gdmFsdWUgPz8gJyc7XG4gIGNvbnN0IHJlcXVpcmVkID0gaXNSZXF1aXJlZEZpZWxkKGZpZWxkS2V5KTtcbiAgY29uc3QgaXNJbWFnZUZpZWxkID0gdHlwZW9mIGlucHV0VmFsdWUgPT09ICdzdHJpbmcnICYmIElNQUdFX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSk7XG4gIGNvbnN0IGlzUGF0aEZpZWxkID0gdHlwZW9mIGlucHV0VmFsdWUgPT09ICdzdHJpbmcnICYmIFBBVEhfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkS2V5KTtcbiAgY29uc3QgcHJldmlld1VybCA9IGlzSW1hZ2VGaWVsZCA/IHJlc29sdmVNZWRpYVByZXZpZXdVcmwoaW5wdXRWYWx1ZSkgOiAnJztcbiAgY29uc3Qgc2hvd1ByZXZpZXcgPSBCb29sZWFuKHByZXZpZXdVcmwpO1xuICBjb25zdCBmaWxlSW5wdXRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRpbmcsIHNldFVwbG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1cGxvYWRFcnJvciwgc2V0VXBsb2FkRXJyb3JdID0gdXNlU3RhdGUoJycpO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZmllbGRDbGFzc05hbWUoZmllbGRLZXksIHZhbHVlKX0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICB7cmVxdWlyZWQgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbF9fcmVxdWlyZWRcIj4qPC9zcGFuPiA6IG51bGx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc3dpdGNoXCI+XG4gICAgICAgICAgPHNwYW4+e3ZhbHVlID8gJ0VuYWJsZWQnIDogJ0Rpc2FibGVkJ308L3NwYW4+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgY2hlY2tlZD17dmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBldmVudC50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKGlzSW1hZ2VGaWVsZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICB7cmVxdWlyZWQgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbF9fcmVxdWlyZWRcIj4qPC9zcGFuPiA6IG51bGx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19jYW52YXNcIj5cbiAgICAgICAgICAgIHtzaG93UHJldmlldyA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc3RhY2tcIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX190aHVtYlwiIHNyYz17cHJldmlld1VybH0gYWx0PXtsYWJlbH0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbihwcmV2aWV3VXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4oaXXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHBhdGgsICcnKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4pyVXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19maWxlbmFtZVwiPntnZXRGaWxlbmFtZShpbnB1dFZhbHVlKX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lbXB0eVwiPlVwbG9hZCBhbiBpbWFnZSB0byBhdHRhY2ggbWVkaWEuPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHVwbG9hZGluZ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcignJyk7XG5cbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVXJsID0gYXdhaXQgY2hvb3NlQWRtaW5MaWJyYXJ5SW1hZ2UoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBzZWxlY3RlZFVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gY2hvb3NlIGltYWdlIGZyb20gbWVkaWEgbGlicmFyeS4nKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQ2hvb3NlIGZyb20gbWVkaWEgbGlicmFyeVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgcmVmPXtmaWxlSW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXthc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlcz8uWzBdO1xuICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWRGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGxvYWRlZFVybCA9IGF3YWl0IHVwbG9hZEFkbWluSW1hZ2Uoc2VsZWN0ZWRGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UocGF0aCwgdXBsb2FkZWRVcmwpO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt1cGxvYWRFcnJvciA/IDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2Vycm9yXCI+e3VwbG9hZEVycm9yfTwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2ZpZWxkQ2xhc3NOYW1lKGZpZWxkS2V5LCB2YWx1ZSl9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgICAge3JlcXVpcmVkID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgPC9sYWJlbD5cbiAgICAgIHtpc1BhdGhGaWVsZCA/IChcbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgZGVzdGluYXRpb248L29wdGlvbj5cbiAgICAgICAgICB7Z2V0UGF0aE9wdGlvbnMoaW5wdXRWYWx1ZSkubWFwKChvcHRpb24pID0+IChcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHRpb24udmFsdWUgfHwgJ2VtcHR5J30gdmFsdWU9e29wdGlvbi52YWx1ZX0+XG4gICAgICAgICAgICAgIHtvcHRpb24ubGFiZWx9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICApIDogTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSkgPyAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXRleHRhcmVhXCJcbiAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgcGFyc2VJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSwgdmFsdWUpKX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICB0eXBlPXt0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gJ251bWJlcicgOiAndGV4dCd9XG4gICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBPYmplY3RGaWVsZCh7IGZpZWxkS2V5LCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyh2YWx1ZSA/PyB7fSkuZmlsdGVyKChbbmVzdGVkS2V5XSkgPT4gbmVzdGVkS2V5ICE9PSAnaWQnICYmICFpc0hpZGRlbkVkaXRvckZpZWxkKG5lc3RlZEtleSkpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1vYmplY3RcIj5cbiAgICAgICAgPGg0IGNsYXNzTmFtZT1cImFkbWluLW9iamVjdF9fdGl0bGVcIj57dG9MYWJlbChmaWVsZEtleSl9PC9oND5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAge2VudHJpZXMubWFwKChbbmVzdGVkS2V5LCBuZXN0ZWRWYWx1ZV0pID0+IChcbiAgICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICAgIGtleT17YCR7ZmllbGRLZXl9LSR7bmVzdGVkS2V5fWB9XG4gICAgICAgICAgICAgIGZpZWxkS2V5PXtuZXN0ZWRLZXl9XG4gICAgICAgICAgICAgIHZhbHVlPXtuZXN0ZWRWYWx1ZX1cbiAgICAgICAgICAgICAgcGF0aD17Wy4uLnBhdGgsIG5lc3RlZEtleV19XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgb25BZGRJdGVtPXtvbkFkZEl0ZW19XG4gICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBBcnJheUZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSB0b0xhYmVsKGZpZWxkS2V5KTtcbiAgY29uc3Qgc2FtcGxlID0gdmFsdWVbMF0gPz8gJyc7XG4gIGNvbnN0IFtkcmFnSW5kZXgsIHNldERyYWdJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2RyYWdPdmVySW5kZXgsIHNldERyYWdPdmVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX190aXRsZVwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fY291bnRcIj57dmFsdWUubGVuZ3RofSBlbnRyeXt2YWx1ZS5sZW5ndGggPT09IDEgPyAnJyA6ICdpZXMnfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7dmFsdWUubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxkZXRhaWxzXG4gICAgICAgICAgICBrZXk9e2Ake2ZpZWxkS2V5fS0ke2luZGV4fWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yZXBlYXRhYmxlX19pdGVtJHtkcmFnT3ZlckluZGV4ID09PSBpbmRleCA/ICcgYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyJyA6ICcnfWB9XG4gICAgICAgICAgICBvcGVuPXtpbmRleCA9PT0gMH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaWYgKGRyYWdPdmVySW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyb3A9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gaW5kZXggLSBkcmFnSW5kZXg7XG4gICAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgICAgICAgICAgICBvbk1vdmVJdGVtKFsuLi5wYXRoLCBkcmFnSW5kZXhdLCBvZmZzZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldERyYWdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChudWxsKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyYWdMZWF2ZT17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19idWxsZXRcIj7ilrw8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fbmFtZVwiPntnZXRJdGVtVGl0bGUoaXRlbSwgbGFiZWwsIGluZGV4KX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtKFsuLi5wYXRoLCBpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIPCfl5FcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZT17IWRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEcmFnIHRvIHJlb3JkZXJcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyhpbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDii67ii65cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3N1bW1hcnk+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgICAge2lzUGxhaW5PYmplY3QoaXRlbSkgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoW25lc3RlZEtleV0pID0+IG5lc3RlZEtleSAhPT0gJ2lkJyAmJiAhaXNIaWRkZW5FZGl0b3JGaWVsZChuZXN0ZWRLZXkpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKChbbmVzdGVkS2V5LCBuZXN0ZWRWYWx1ZV0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8RmllbGRSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtgJHtmaWVsZEtleX0tJHtpbmRleH0tJHtuZXN0ZWRLZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkS2V5PXtuZXN0ZWRLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmVzdGVkVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoPXtbLi4ucGF0aCwgaW5kZXgsIG5lc3RlZEtleV19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFkZEl0ZW09e29uQWRkSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3ZlSXRlbT17b25Nb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8UHJpbWl0aXZlRmllbGRcbiAgICAgICAgICAgICAgICAgIGZpZWxkS2V5PXtgJHtmaWVsZEtleX0tJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW19XG4gICAgICAgICAgICAgICAgICBwYXRoPXtbLi4ucGF0aCwgaW5kZXhdfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICkpfVxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19hZGRcIlxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkFkZEl0ZW0ocGF0aCwgZ2V0RW1wdHlJdGVtKHNhbXBsZSkpfVxuICAgICAgICA+XG4gICAgICAgICAgKyBBZGQgYW4gZW50cnlcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRmllbGRSZW5kZXJlcihwcm9wcykge1xuICBjb25zdCB7IHZhbHVlIH0gPSBwcm9wcztcblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gPEFycmF5RmllbGQgey4uLnByb3BzfSAvPjtcbiAgfVxuXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiA8T2JqZWN0RmllbGQgey4uLnByb3BzfSAvPjtcbiAgfVxuXG4gIHJldHVybiA8UHJpbWl0aXZlRmllbGQgey4uLnByb3BzfSAvPjtcbn1cblxuZnVuY3Rpb24gRm9ybVNlY3Rpb24oeyBlbnRyaWVzLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNlY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQtZ3JpZFwiPlxuICAgICAgICB7ZW50cmllcy5tYXAoKFtmaWVsZEtleSwgdmFsdWVdKSA9PiAoXG4gICAgICAgICAgaXNIaWRkZW5FZGl0b3JGaWVsZChmaWVsZEtleSkgPyBudWxsIDogKFxuICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICBrZXk9e2ZpZWxkS2V5fVxuICAgICAgICAgICAgZmllbGRLZXk9e2ZpZWxkS2V5fVxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgcGF0aD17W2ZpZWxkS2V5XX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgIG9uQWRkSXRlbT17b25BZGRJdGVtfVxuICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19XG4gICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgKVxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb250ZW50UGFnZUVkaXRvcigpIHtcbiAgY29uc3QgeyBwYWdlTmFtZSB9ID0gdXNlUGFyYW1zKCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZUxhYmVsLCBzZXRQYWdlTGFiZWxdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbY29udGVudCwgc2V0Q29udGVudF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtvcmlnaW5hbENvbnRlbnQsIHNldE9yaWdpbmFsQ29udGVudF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtwdWJsaXNoZWRDb250ZW50LCBzZXRQdWJsaXNoZWRDb250ZW50XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2RyYWZ0Jyk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbWVudU9wZW4sIHNldE1lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgYWRkTm90aWNlID0gdXNlTm90aWNlKCk7XG4gIGNvbnN0IG1lbnVSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgY29uc3QgZGlzcGxheWVkQ29udGVudCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkQ29udGVudCA/IHB1Ymxpc2hlZENvbnRlbnQgOiBjb250ZW50KSxcbiAgICBbYWN0aXZlVGFiLCBjb250ZW50LCBwdWJsaXNoZWRDb250ZW50XSxcbiAgKTtcbiAgY29uc3QgaXNQdWJsaXNoZWRWaWV3ID0gYWN0aXZlVGFiID09PSAncHVibGlzaGVkJyAmJiBwdWJsaXNoZWRDb250ZW50O1xuICBjb25zdCBpc0RpcnR5ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShjb250ZW50KSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKG9yaWdpbmFsQ29udGVudCkpLFxuICAgIFtjb250ZW50LCBvcmlnaW5hbENvbnRlbnRdLFxuICApO1xuICBjb25zdCBoYXNEcmFmdENvbnRlbnQgPSB1c2VNZW1vKCgpID0+IGhhc01lYW5pbmdmdWxWYWx1ZShjb250ZW50KSwgW2NvbnRlbnRdKTtcbiAgY29uc3QgaGFzVW5wdWJsaXNoZWRDaGFuZ2VzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShjb250ZW50KSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKHB1Ymxpc2hlZENvbnRlbnQpKSxcbiAgICBbY29udGVudCwgcHVibGlzaGVkQ29udGVudF0sXG4gICk7XG4gIGNvbnN0IGNhblNhdmUgPSAhaXNQdWJsaXNoZWRWaWV3ICYmICFzYXZpbmcgJiYgaXNEaXJ0eTtcbiAgY29uc3QgY2FuUHVibGlzaCA9ICFpc1B1Ymxpc2hlZFZpZXcgJiYgIXNhdmluZyAmJiAocHVibGlzaGVkQ29udGVudCA/IGhhc1VucHVibGlzaGVkQ2hhbmdlcyA6IGhhc0RyYWZ0Q29udGVudCk7XG4gIGNvbnN0IGNhbkRpc2NhcmQgPSAhc2F2aW5nICYmICFpc1B1Ymxpc2hlZFZpZXcgJiYgaGFzRHJhZnRDb250ZW50O1xuICBjb25zdCBjYW5VbnB1Ymxpc2ggPSAhc2F2aW5nICYmIEJvb2xlYW4ocHVibGlzaGVkQ29udGVudCk7XG4gIGNvbnN0IHNlY3Rpb25zID0gdXNlTWVtbygoKSA9PiBidWlsZFNlY3Rpb25zKHBhZ2VOYW1lLCBkaXNwbGF5ZWRDb250ZW50KSwgW3BhZ2VOYW1lLCBkaXNwbGF5ZWRDb250ZW50XSk7XG4gIGNvbnN0IGVudHJ5VGl0bGUgPSB1c2VNZW1vKCgpID0+IChcbiAgICBkaXNwbGF5ZWRDb250ZW50Py5oZXJvVGl0bGVcbiAgICB8fCBkaXNwbGF5ZWRDb250ZW50Py50aXRsZVxuICAgIHx8IGRpc3BsYXllZENvbnRlbnQ/LnNpdGVOYW1lXG4gICAgfHwgcGFnZUxhYmVsXG4gICksIFtkaXNwbGF5ZWRDb250ZW50LCBwYWdlTGFiZWxdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgbG9hZFBhZ2UgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3IoJycpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXRQYWdlKHsgcGFnZU5hbWUgfSk7XG5cbiAgICAgICAgaWYgKCFpc01vdW50ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0RHJhZnRDb250ZW50ID0gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLmRyYWZ0RGF0YSA/PyByZXNwb25zZS5kYXRhLmRhdGEgPz8ge30pO1xuICAgICAgICBzZXRDb250ZW50KG5leHREcmFmdENvbnRlbnQpO1xuICAgICAgICBzZXRPcmlnaW5hbENvbnRlbnQoY2xvbmVWYWx1ZShuZXh0RHJhZnRDb250ZW50KSk7XG4gICAgICAgIHNldFB1Ymxpc2hlZENvbnRlbnQocmVzcG9uc2UuZGF0YS5wdWJsaXNoZWREYXRhID8gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLnB1Ymxpc2hlZERhdGEpIDogbnVsbCk7XG4gICAgICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgICBzZXRQYWdlTGFiZWwocmVzcG9uc2UuZGF0YS5sYWJlbCA/PyB0b0xhYmVsKHBhZ2VOYW1lKSk7XG4gICAgICB9IGNhdGNoIChsb2FkRXJyb3IpIHtcbiAgICAgICAgaWYgKCFpc01vdW50ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvcih0b0FkbWluRXJyb3JNZXNzYWdlKGxvYWRFcnJvciwgJ0ZhaWxlZCB0byBsb2FkIHRoaXMgY29udGVudCBwYWdlLicpKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChpc01vdW50ZWQpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkUGFnZSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzTW91bnRlZCA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFtwYWdlTmFtZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtZW51T3Blbikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKG1lbnVSZWYuY3VycmVudCAmJiAhbWVudVJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICB9O1xuICB9LCBbbWVudU9wZW5dKTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAocGF0aCwgbmV4dFZhbHVlKSA9PiB7XG4gICAgc2V0Q29udGVudCgoY3VycmVudFZhbHVlKSA9PiB1cGRhdGVBdFBhdGgoY3VycmVudFZhbHVlLCBwYXRoLCBuZXh0VmFsdWUpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRJdGVtID0gKHBhdGgsIG5leHRJdGVtKSA9PiB7XG4gICAgc2V0Q29udGVudCgoY3VycmVudFZhbHVlKSA9PiBhcHBlbmRBdFBhdGgoY3VycmVudFZhbHVlLCBwYXRoLCBuZXh0SXRlbSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZUl0ZW0gPSAocGF0aCkgPT4ge1xuICAgIHNldENvbnRlbnQoKGN1cnJlbnRWYWx1ZSkgPT4gcmVtb3ZlQXRQYXRoKGN1cnJlbnRWYWx1ZSwgcGF0aCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdmVJdGVtID0gKHBhdGgsIG9mZnNldCkgPT4ge1xuICAgIHNldENvbnRlbnQoKGN1cnJlbnRWYWx1ZSkgPT4gbW92ZUF0UGF0aChjdXJyZW50VmFsdWUsIHBhdGgsIG9mZnNldCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhdmUgPSBhc3luYyAoaW50ZW50ID0gJ3NhdmUnKSA9PiB7XG4gICAgc2V0U2F2aW5nKHRydWUpO1xuICAgIHNldEVycm9yKCcnKTtcbiAgICBzZXRNZW51T3BlbihmYWxzZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0UGFnZSh7XG4gICAgICAgIHBhZ2VOYW1lLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgZGF0YTogeyBjb250ZW50LCBpbnRlbnQgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBuZXh0RHJhZnRDb250ZW50ID0gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLmRyYWZ0RGF0YSA/PyByZXNwb25zZS5kYXRhLmRhdGEgPz8ge30pO1xuICAgICAgc2V0Q29udGVudChuZXh0RHJhZnRDb250ZW50KTtcbiAgICAgIHNldE9yaWdpbmFsQ29udGVudChjbG9uZVZhbHVlKG5leHREcmFmdENvbnRlbnQpKTtcbiAgICAgIHNldFB1Ymxpc2hlZENvbnRlbnQocmVzcG9uc2UuZGF0YS5wdWJsaXNoZWREYXRhID8gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLnB1Ymxpc2hlZERhdGEpIDogbnVsbCk7XG4gICAgICBpZiAoaW50ZW50ID09PSAndW5wdWJsaXNoJykge1xuICAgICAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgICB9XG4gICAgICBhZGROb3RpY2Uoe1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5kYXRhLm5vdGljZT8ubWVzc2FnZSA/PyBgJHtwYWdlTGFiZWx9IHNhdmVkLmAsXG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKHNhdmVFcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHRvQWRtaW5FcnJvck1lc3NhZ2Uoc2F2ZUVycm9yLCAnRmFpbGVkIHRvIHNhdmUgdGhpcyBjb250ZW50IHBhZ2UuJyk7XG4gICAgICBzZXRFcnJvcihtZXNzYWdlKTtcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURpc2NhcmRDaGFuZ2VzID0gKCkgPT4ge1xuICAgIHNldENvbnRlbnQoZ2V0RW1wdHlJdGVtKGNvbnRlbnQpKTtcbiAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICB9O1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvcl9faW5uZXJcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWJhY2tcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gd2luZG93Lmhpc3RvcnkuYmFjaygpfT5cbiAgICAgICAgICAgIOKGkCBCYWNrXG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZXRhXCI+U2luZ2xlIFR5cGU8L2Rpdj5cbiAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLXRpdGxlXCI+e2VudHJ5VGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc3RhdHVzXCI+e3B1Ymxpc2hlZENvbnRlbnQgPyAnUHVibGlzaGVkJyA6ICdEcmFmdCd9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXRhYnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgYWRtaW4tdGFiJHthY3RpdmVUYWIgPT09ICdkcmFmdCcgPyAnIGFkbWluLXRhYi0tYWN0aXZlJyA6ICcnfWB9IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyl9PlxuICAgICAgICAgICAgICBEUkFGVFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXRhYiR7YWN0aXZlVGFiID09PSAncHVibGlzaGVkJyA/ICcgYWRtaW4tdGFiLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHB1Ymxpc2hlZENvbnRlbnQgJiYgc2V0QWN0aXZlVGFiKCdwdWJsaXNoZWQnKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUFVCTElTSEVEXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxheW91dFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tYWluLWNhcmRcIj5cbiAgICAgICAgICAgICAge3NlY3Rpb25zLm1hcCgoc2VjdGlvbiwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8Rm9ybVNlY3Rpb25cbiAgICAgICAgICAgICAgICAgIGtleT17YHNlY3Rpb24tJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgZW50cmllcz17c2VjdGlvbi5lbnRyaWVzfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIG9uQWRkSXRlbT17aGFuZGxlQWRkSXRlbX1cbiAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17aGFuZGxlUmVtb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgIG9uTW92ZUl0ZW09e2hhbmRsZU1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzUHVibGlzaGVkVmlld31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YXNpZGU+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2hlYWRcIj5FbnRyeTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2F2ZSgncHVibGlzaCcpfSBkaXNhYmxlZD17IWNhblB1Ymxpc2h9PlxuICAgICAgICAgICAgICAgICAgICAgIFB1Ymxpc2hcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IGFkbWluLXNpZGUtYnV0dG9uLS1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRNZW51T3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAg4oCmXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICB7bWVudU9wZW4gPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9e21lbnVSZWZ9IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSBhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2F2ZSgndW5wdWJsaXNoJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuVW5wdWJsaXNofVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uXCI+w5c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFVucHVibGlzaFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURpc2NhcmRDaGFuZ2VzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhbkRpc2NhcmR9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2ljb25cIj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgRGlzY2FyZCBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2F2ZSgnc2F2ZScpfSBkaXNhYmxlZD17IWNhblNhdmV9PlxuICAgICAgICAgICAgICAgICAgICB7c2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvYXNpZGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBMb2FkZXIsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgTUVESUFfUElDS0VSX0VWRU5UID0gJ2FkbWluanMtbWVkaWEtc2VsZWN0JztcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLW1lZGlhLXBhZ2Uge1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAyOHB4IDQwcHggNDhweCA4OHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiAxODYwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdG9wIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyOHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogM3JlbTtcbiAgbGluZS1oZWlnaHQ6IDMuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uLFxuLmFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeSxcbi5hZG1pbi1tZWRpYS1wYWdlX19pY29uLWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwIDFyZW07XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDk0NWZmO1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgcGFkZGluZzogMCAxLjI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyOHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhci1sZWZ0LFxuLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItcmlnaHQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zcXVhcmUsXG4uYWRtaW4tbWVkaWEtcGFnZV9faWNvbi1idXR0b24ge1xuICB3aWR0aDogMi41cmVtO1xuICBoZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3NlbGVjdCxcbi5hZG1pbi1tZWRpYS1wYWdlX19zZWFyY2gge1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHBhZGRpbmc6IDAgMXJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fc2VhcmNoIHtcbiAgbWluLXdpZHRoOiAyODBweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3NlbGVjdCB7XG4gIG1pbi13aWR0aDogMjY4cHg7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zZWN0aW9uLXRpdGxlIHtcbiAgbWFyZ2luOiAwIDAgMThweDtcbiAgZm9udC1zaXplOiAycmVtO1xuICBsaW5lLWhlaWdodDogMi41cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fY291bnQge1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLW1lZGlhLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgzMjBweCwgMWZyKSk7XG4gIGdhcDogMjRweDtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkOmhvdmVyIHtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDgpO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fcHJldmlldyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLWhlaWdodDogMjU2cHg7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGJhY2tncm91bmQ6XG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KSxcbiAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmNmY2ZjkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2Y2ZjZmOSA3NSUsICNmNmY2ZjkpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAsIDEycHggMTJweDtcbiAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19jaGVja2JveCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxNnB4O1xuICBsZWZ0OiAxNnB4O1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYzBjMGNmO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45Mik7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19pbWFnZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDIyNHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19ib2R5IHtcbiAgcGFkZGluZzogMTRweCAxOHB4IDE2cHg7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX190aXRsZS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX3RpdGxlIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX3R5cGUge1xuICBmbGV4OiAwIDAgYXV0bztcbiAgbWluLWhlaWdodDogMnJlbTtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fbWV0YSB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fYmFjayB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxZnIpIDM2MHB4O1xuICBnYXA6IDI0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX3ByZXZpZXcsXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fcHJldmlldyB7XG4gIHBhZGRpbmc6IDI0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDYyMHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6XG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KSxcbiAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmNmY2ZjkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2Y2ZjZmOSA3NSUsICNmNmY2ZjkpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAsIDEycHggMTJweDtcbiAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2ltYWdlIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiA1ODBweDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fc2lkZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTZweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keSB7XG4gIHBhZGRpbmc6IDAgMTZweCAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZCArIC5hZG1pbi1tZWRpYS1kZXRhaWxfX2ZpZWxkIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9faW5wdXQsXG4uYWRtaW4tbWVkaWEtZGV0YWlsX190ZXh0YXJlYSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fdGV4dGFyZWEge1xuICBtaW4taGVpZ2h0OiA2cmVtO1xuICByZXNpemU6IG5vbmU7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtbGlzdCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTJweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleSB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlIHtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDEwODBweCkge1xuICAuYWRtaW4tbWVkaWEtZGV0YWlsX19sYXlvdXQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAuYWRtaW4tbWVkaWEtcGFnZSB7XG4gICAgcGFkZGluZzogMjBweCAxNnB4IDQwcHggNzJweDtcbiAgfVxuXG4gIC5hZG1pbi1tZWRpYS1wYWdlX190b3AsXG4gIC5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICB9XG5cbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItbGVmdCxcbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItcmlnaHQsXG4gIC5hZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zIHtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gIH1cblxuICAuYWRtaW4tbWVkaWEtcGFnZV9fc2VhcmNoLFxuICAuYWRtaW4tbWVkaWEtcGFnZV9fc2VsZWN0IHtcbiAgICBtaW4td2lkdGg6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIGJ1aWxkUGFnZVBhdGgocGF0aG5hbWUsIHBhcmFtcykge1xuICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgT2JqZWN0LmVudHJpZXMocGFyYW1zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgIHNlYXJjaFBhcmFtcy5zZXQoa2V5LCBTdHJpbmcodmFsdWUpKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gIHJldHVybiBgJHtwYXRobmFtZX0ke3F1ZXJ5U3RyaW5nID8gYD8ke3F1ZXJ5U3RyaW5nfWAgOiAnJ31gO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0TWVkaWEocXVlcnkgPSB7fSkge1xuICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FkbWluL2FwaS9wYWdlcy9tZWRpYS1saWJyYXJ5JHtzZWFyY2hQYXJhbXMudG9TdHJpbmcoKSA/IGA/JHtzZWFyY2hQYXJhbXMudG9TdHJpbmcoKX1gIDogJyd9YCwge1xuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcbiAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQubWVzc2FnZSA/PyAnRmFpbGVkIHRvIGxvYWQgbWVkaWEuJyk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkQWRtaW5JbWFnZShmaWxlKSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvbWVkaWEvdXBsb2FkJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvciB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5mdW5jdGlvbiBBc3NldENhcmQoeyBpdGVtLCBvbk9wZW4sIHBpY2tlck1vZGUgfSkge1xuICByZXR1cm4gKFxuICAgIDxhcnRpY2xlIGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRcIiBvbkNsaWNrPXsoKSA9PiBvbk9wZW4oaXRlbSl9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19wcmV2aWV3XCI+XG4gICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9faW1hZ2VcIiBzcmM9e2l0ZW0udGh1bWJuYWlsVXJsIHx8IGl0ZW0udXJsfSBhbHQ9e2l0ZW0uYWx0ZXJuYXRpdmVUZXh0IHx8IGl0ZW0ubmFtZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19ib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fdGl0bGUtcm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX190aXRsZVwiPntpdGVtLm5hbWV9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX190eXBlXCI+e2l0ZW0ubWltZS5zdGFydHNXaXRoKCdpbWFnZS8nKSA/ICdJTUFHRScgOiBpdGVtLmV4dC5yZXBsYWNlKCcuJywgJycpLnRvVXBwZXJDYXNlKCl9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX21ldGFcIj5cbiAgICAgICAgICB7aXRlbS5leHQucmVwbGFjZSgnLicsICcnKS50b1VwcGVyQ2FzZSgpfSAtIHtpdGVtLndpZHRofcOXe2l0ZW0uaGVpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3BpY2tlck1vZGUgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19tZXRhXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiA4LCBjb2xvcjogJyM0OTQ1ZmYnLCBmb250V2VpZ2h0OiA3MDAgfX0+XG4gICAgICAgICAgICBVc2UgdGhpcyBhc3NldFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRGV0YWlsVmlldyh7IGl0ZW0sIG9uQmFjaywgb25TZWxlY3QsIHBpY2tlck1vZGUgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fYmFja1wiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkJhY2t9PlxuICAgICAgICDihpAgQmFja1xuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdG9wXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAyNCB9fT5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3RpdGxlXCIgc3R5bGU9e3sgZm9udFNpemU6ICcyLjI1cmVtJywgbGluZUhlaWdodDogJzIuNzVyZW0nIH19PntpdGVtLm5hbWV9PC9oMT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zXCI+XG4gICAgICAgICAge3BpY2tlck1vZGUgPyAoXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdChpdGVtKX0+XG4gICAgICAgICAgICAgIFVzZSB0aGlzIGFzc2V0XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbihpdGVtLnVybCwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyl9PlxuICAgICAgICAgICAgT3BlbiBhc3NldFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbGF5b3V0XCI+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fcHJldmlld1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYW52YXNcIj5cbiAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19pbWFnZVwiIHNyYz17aXRlbS51cmx9IGFsdD17aXRlbS5hbHRlcm5hdGl2ZVRleHQgfHwgaXRlbS5uYW1lfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgPGFzaWRlIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fc2lkZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1oZWFkXCI+RGV0YWlsczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19sYWJlbFwiPkZpbGUgbmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9faW5wdXRcIiB2YWx1ZT17aXRlbS5uYW1lIHx8ICcnfSBkaXNhYmxlZCByZWFkT25seSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2ZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbGFiZWxcIj5BbHRlcm5hdGl2ZSB0ZXh0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19pbnB1dFwiIHZhbHVlPXtpdGVtLmFsdGVybmF0aXZlVGV4dCB8fCAnJ30gZGlzYWJsZWQgcmVhZE9ubHkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2xhYmVsXCI+Q2FwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fdGV4dGFyZWFcIiB2YWx1ZT17aXRlbS5jYXB0aW9uIHx8ICcnfSBkaXNhYmxlZCByZWFkT25seSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWhlYWRcIj5NZXRhZGF0YTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1saXN0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPkRpbWVuc2lvbnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS53aWR0aH0gw5cge2l0ZW0uaGVpZ2h0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+U2l6ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLnNpemVMYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPlR5cGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5taW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+UHJvdmlkZXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5wcm92aWRlciB8fCAnbG9jYWwnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+Rm9sZGVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0uZm9sZGVyUGF0aCB8fCAnLyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5VcGRhdGVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0udXBkYXRlZEF0TGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5DcmVhdGVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0uY3JlYXRlZEF0TGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5Eb2N1bWVudCBJRDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLmRvY3VtZW50SWR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2FzaWRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1lZGlhTGlicmFyeSgpIHtcbiAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IHF1ZXJ5ID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCksIFtsb2NhdGlvbi5zZWFyY2hdKTtcbiAgY29uc3Qgc2VhcmNoID0gcXVlcnkuZ2V0KCdzZWFyY2gnKSB8fCAnJztcbiAgY29uc3QgZmlsZUlkID0gcXVlcnkuZ2V0KCdmaWxlSWQnKSB8fCAnJztcbiAgY29uc3QgcGlja2VyTW9kZSA9IHF1ZXJ5LmdldCgncGlja2VyJykgPT09ICcxJztcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2NvdW50LCBzZXRDb3VudF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2l0ZW0sIHNldEl0ZW1dID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRpbmcsIHNldFVwbG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYWN0aXZlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3IoJycpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVxdWVzdE1lZGlhKGZpbGVJZCA/IHsgZmlsZUlkIH0gOiB7IHNlYXJjaCB9KTtcblxuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEl0ZW1zKHBheWxvYWQuaXRlbXMgPz8gW10pO1xuICAgICAgICBzZXRDb3VudChwYXlsb2FkLmNvdW50ID8/IDApO1xuICAgICAgICBzZXRJdGVtKHBheWxvYWQuaXRlbSA/PyBudWxsKTtcbiAgICAgIH0gY2F0Y2ggKGxvYWRFcnJvcikge1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yKGxvYWRFcnJvci5tZXNzYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW2ZpbGVJZCwgc2VhcmNoXSk7XG5cbiAgY29uc3Qgb3Blbkxpc3QgPSAobmV4dFNlYXJjaCA9IHNlYXJjaCkgPT4ge1xuICAgIG5hdmlnYXRlKGJ1aWxkUGFnZVBhdGgoJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5Jywge1xuICAgICAgLi4uKG5leHRTZWFyY2ggPyB7IHNlYXJjaDogbmV4dFNlYXJjaCB9IDoge30pLFxuICAgICAgLi4uKHBpY2tlck1vZGUgPyB7IHBpY2tlcjogMSB9IDoge30pLFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBzZWxlY3RBc3NldCA9IChzZWxlY3RlZEl0ZW0pID0+IHtcbiAgICBpZiAoIXBpY2tlck1vZGUpIHtcbiAgICAgIG5hdmlnYXRlKGJ1aWxkUGFnZVBhdGgoJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5JywgeyBmaWxlSWQ6IHNlbGVjdGVkSXRlbS5pZCB9KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5vcGVuZXIpIHtcbiAgICAgIHdpbmRvdy5vcGVuZXIucG9zdE1lc3NhZ2UoXG4gICAgICAgIHsgdHlwZTogTUVESUFfUElDS0VSX0VWRU5ULCB1cmw6IHNlbGVjdGVkSXRlbS5yZWxhdGl2ZVVybCB8fCBzZWxlY3RlZEl0ZW0udXJsIHx8ICcnIH0sXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHdpbmRvdy5jbG9zZSgpO1xuICB9O1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19pbm5lclwiPlxuICAgICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICB7ZmlsZUlkICYmIGl0ZW0gPyAoXG4gICAgICAgICAgICA8RGV0YWlsVmlldyBpdGVtPXtpdGVtfSBvbkJhY2s9eygpID0+IG9wZW5MaXN0KCl9IG9uU2VsZWN0PXtzZWxlY3RBc3NldH0gcGlja2VyTW9kZT17cGlja2VyTW9kZX0gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b3BcIj5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdGl0bGVcIj57cGlja2VyTW9kZSA/ICdDaG9vc2UgTWVkaWEnIDogJ01lZGlhIExpYnJhcnknfTwvaDE+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dXBsb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnR5cGUgPSAnZmlsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYWNjZXB0ID0gJ2ltYWdlLyonO1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0Lm11bHRpcGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5vbmNoYW5nZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShpbnB1dC5maWxlcyA/PyBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdXBsb2FkQWRtaW5JbWFnZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZnJlc2hlZFBheWxvYWQgPSBhd2FpdCByZXF1ZXN0TWVkaWEoc2VhcmNoID8geyBzZWFyY2ggfSA6IHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXRlbXMocmVmcmVzaGVkUGF5bG9hZC5pdGVtcyA/PyBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvdW50KHJlZnJlc2hlZFBheWxvYWQuY291bnQgPz8gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICh1cGxvYWRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcih1cGxvYWRFcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7dXBsb2FkaW5nID8gJ1VwbG9hZGluZy4uLicgOiAnKyBBZGQgbmV3IGFzc2V0cyd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b29sYmFyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fc2VsZWN0XCIgZGVmYXVsdFZhbHVlPVwicmVjZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZWNlbnRcIj5Nb3N0IHJlY2VudCB1cGxvYWRzPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPkZpbHRlcnM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19zZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvcGVuTGlzdChldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBhc3NldHNcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3NlY3Rpb24tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICBBc3NldHMgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fY291bnRcIj4oe2NvdW50fSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1ncmlkXCI+XG4gICAgICAgICAgICAgICAge2l0ZW1zLm1hcCgobWVkaWFJdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8QXNzZXRDYXJkXG4gICAgICAgICAgICAgICAgICAgIGtleT17bWVkaWFJdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgICBpdGVtPXttZWRpYUl0ZW19XG4gICAgICAgICAgICAgICAgICAgIHBpY2tlck1vZGU9e3BpY2tlck1vZGV9XG4gICAgICAgICAgICAgICAgICAgIG9uT3Blbj17cGlja2VyTW9kZSA/IHNlbGVjdEFzc2V0IDogKG5leHRJdGVtKSA9PiBuYXZpZ2F0ZShidWlsZFBhZ2VQYXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScsIHsgZmlsZUlkOiBuZXh0SXRlbS5pZCB9KSl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExvYWRlciwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tYWNjb3VudC1wYWdlIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMzJweCA0MHB4IDY0cHggMzQ0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tYWNjb3VudC1wYWdlX19pbm5lciB7XG4gIG1heC13aWR0aDogNzYwcHg7XG59XG5cbi5hZG1pbi1hY2NvdW50LXBhZ2VfX2V5ZWJyb3cge1xuICBtYXJnaW46IDAgMCA0cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xufVxuXG4uYWRtaW4tYWNjb3VudC1wYWdlX190aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAyLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMi43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFkbWluLWFjY291bnQtcGFnZV9fc3VidGl0bGUge1xuICBtYXJnaW46IDEwcHggMCAyOHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xufVxuXG4uYWRtaW4tYWNjb3VudC1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbiAgcGFkZGluZzogMjRweDtcbn1cblxuLmFkbWluLWFjY291bnQtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uYWRtaW4tYWNjb3VudC1maWVsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogOHB4O1xufVxuXG4uYWRtaW4tYWNjb3VudC1maWVsZC0tZnVsbCB7XG4gIGdyaWQtY29sdW1uOiAxIC8gLTE7XG59XG5cbi5hZG1pbi1hY2NvdW50LWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5hZG1pbi1hY2NvdW50LWlucHV0IHtcbiAgbWluLWhlaWdodDogMi43NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgcGFkZGluZzogMCAwLjg3NXJlbTtcbiAgZm9udC1zaXplOiAwLjkzNzVyZW07XG59XG5cbi5hZG1pbi1hY2NvdW50LWlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLWNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tYWNjb3VudC1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi10b3A6IDI0cHg7XG59XG5cbi5hZG1pbi1hY2NvdW50LWhpbnQge1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1hY2NvdW50LWJ1dHRvbixcbi5hZG1pbi1hY2NvdW50LWJ1dHRvbi0tcHJpbWFyeSxcbi5hZG1pbi1hY2NvdW50LWJ1dHRvbi0tZ2hvc3Qge1xuICBtaW4taGVpZ2h0OiAyLjc1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMC45Mzc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwIDFyZW07XG59XG5cbi5hZG1pbi1hY2NvdW50LWJ1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tYWNjb3VudC1idXR0b24tLXByaW1hcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDk0NWZmO1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cblxuLmFkbWluLWFjY291bnQtYnV0dG9uLS1naG9zdCB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBwYWRkaW5nOiAwO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLWFjY291bnQtcGFnZSB7XG4gICAgcGFkZGluZzogMjBweCAxNnB4IDQ4cHg7XG4gIH1cblxuICAuYWRtaW4tYWNjb3VudC1ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuYDtcblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdEFjY291bnQobWV0aG9kID0gJ0dFVCcsIHBheWxvYWQpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FkbWluL2FwaS9wYWdlcy9hY2NvdW50Jywge1xuICAgIG1ldGhvZCxcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICBoZWFkZXJzOiBwYXlsb2FkID8geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0gOiB1bmRlZmluZWQsXG4gICAgYm9keTogcGF5bG9hZCA/IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpIDogdW5kZWZpbmVkLFxuICB9KTtcblxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBkYXRlIGFjY291bnQuJyk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWNjb3VudFNldHRpbmdzKCkge1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3N1Ym1pdHRpbmcsIHNldFN1Ym1pdHRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2N1cnJlbnRQYXNzd29yZCwgc2V0Q3VycmVudFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW25ld1Bhc3N3b3JkLCBzZXROZXdQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtjb25maXJtUGFzc3dvcmQsIHNldENvbmZpcm1QYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYWN0aXZlID0gdHJ1ZTtcblxuICAgIHJlcXVlc3RBY2NvdW50KClcbiAgICAgIC50aGVuKChwYXlsb2FkKSA9PiB7XG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RW1haWwocGF5bG9hZC5lbWFpbCB8fCAnJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChsb2FkRXJyb3IpID0+IHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvcihsb2FkRXJyb3IubWVzc2FnZSk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBvblN1Ym1pdCA9IGFzeW5jIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0RXJyb3IoJycpO1xuICAgIHNldFN1Y2Nlc3MoJycpO1xuXG4gICAgaWYgKCFjdXJyZW50UGFzc3dvcmQpIHtcbiAgICAgIHNldEVycm9yKCdDdXJyZW50IHBhc3N3b3JkIGlzIHJlcXVpcmVkLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChuZXdQYXNzd29yZCAmJiBuZXdQYXNzd29yZCAhPT0gY29uZmlybVBhc3N3b3JkKSB7XG4gICAgICBzZXRFcnJvcignTmV3IHBhc3N3b3JkIGNvbmZpcm1hdGlvbiBkb2VzIG5vdCBtYXRjaC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRTdWJtaXR0aW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0QWNjb3VudCgnUE9TVCcsIHtcbiAgICAgICAgZW1haWwsXG4gICAgICAgIGN1cnJlbnRQYXNzd29yZCxcbiAgICAgICAgbmV3UGFzc3dvcmQsXG4gICAgICB9KTtcblxuICAgICAgc2V0U3VjY2VzcyhwYXlsb2FkLm1lc3NhZ2UgfHwgJ0FjY291bnQgdXBkYXRlZC4gU2lnbiBpbiBhZ2Fpbi4nKTtcbiAgICAgIHNldEN1cnJlbnRQYXNzd29yZCgnJyk7XG4gICAgICBzZXROZXdQYXNzd29yZCgnJyk7XG4gICAgICBzZXRDb25maXJtUGFzc3dvcmQoJycpO1xuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJy9hZG1pbi9sb2dvdXQnKTtcbiAgICAgIH0sIDkwMCk7XG4gICAgfSBjYXRjaCAoc3VibWl0RXJyb3IpIHtcbiAgICAgIHNldEVycm9yKHN1Ym1pdEVycm9yLm1lc3NhZ2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGhlaWdodDogJzEwMCUnIH19PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1wYWdlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1wYWdlX19pbm5lclwiPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtcGFnZV9fZXllYnJvd1wiPkFjY291bnQ8L3A+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtcGFnZV9fdGl0bGVcIj5BY2NvdW50IHNldHRpbmdzPC9oMT5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LXBhZ2VfX3N1YnRpdGxlXCI+XG4gICAgICAgICAgICBVcGRhdGUgdGhlIGFkbWluIGVtYWlsIGFkZHJlc3Mgb3IgcGFzc3dvcmQgdXNlZCB0byBzaWduIGluLlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIiBtYj1cImxnXCI+e2Vycm9yfTwvTWVzc2FnZUJveD4gOiBudWxsfVxuICAgICAgICAgIHtzdWNjZXNzID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cInN1Y2Nlc3NcIiBtYj1cImxnXCI+e3N1Y2Nlc3N9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWNhcmRcIiBvblN1Ym1pdD17b25TdWJtaXR9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWdyaWRcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtZmllbGQgYWRtaW4tYWNjb3VudC1maWVsZC0tZnVsbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtbGFiZWxcIj5FbWFpbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldEVtYWlsKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1maWVsZCBhZG1pbi1hY2NvdW50LWZpZWxkLS1mdWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1sYWJlbFwiPkN1cnJlbnQgcGFzc3dvcmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWlucHV0XCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VycmVudFBhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0Q3VycmVudFBhc3N3b3JkKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJjdXJyZW50LXBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1sYWJlbFwiPk5ldyBwYXNzd29yZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdQYXNzd29yZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldE5ld1Bhc3N3b3JkKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJuZXctcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWxhYmVsXCI+Q29uZmlybSBuZXcgcGFzc3dvcmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWlucHV0XCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlybVBhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0Q29uZmlybVBhc3N3b3JkKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJuZXctcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWhpbnRcIj5cbiAgICAgICAgICAgICAgICBTYXZpbmcgYWNjb3VudCBjaGFuZ2VzIHNpZ25zIHRoZSBjdXJyZW50IHNlc3Npb24gb3V0LlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogMTIsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtYnV0dG9uLS1naG9zdFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJy9hZG1pbi9sb2dvdXQnKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBTaWduIG91dFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1idXR0b24tLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e3N1Ym1pdHRpbmd9PlxuICAgICAgICAgICAgICAgICAge3N1Ym1pdHRpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlIGFjY291bnQnfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiwgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNvbnN0IENPTlRFTlRfUEFHRV9PUkRFUiA9IFtcbiAgJ3NpdGUtc2V0dGluZ3MnLFxuICAnaG9tZXBhZ2UnLFxuICAnYWJvdXQtcGFnZScsXG4gICdibG9nLXBhZ2UnLFxuICAncHJpY2luZy1wYWdlJyxcbiAgJ2ZhcS1wYWdlJyxcbiAgJ21lZXRpbmctcm9vbXMtcGFnZScsXG4gICd2aXJ0dWFsLW9mZmljZS1wYWdlJyxcbiAgJ2NvbnRhY3QtcGFnZScsXG4gICdwcml2YWN5LXBvbGljeS1wYWdlJyxcbiAgJ3Rlcm1zLXBhZ2UnLFxuXTtcblxuY29uc3QgQ09OVEVOVF9QQUdFX0xBQkVMUyA9IHtcbiAgJ3NpdGUtc2V0dGluZ3MnOiAnU2l0ZSBTZXR0aW5nJyxcbiAgJ2hvbWVwYWdlJzogJ0hvbWVwYWdlJyxcbiAgJ2Fib3V0LXBhZ2UnOiAnQWJvdXQgUGFnZScsXG4gICdibG9nLXBhZ2UnOiAnQmxvZyBQYWdlJyxcbiAgJ3ByaWNpbmctcGFnZSc6ICdQcmljaW5nIFBhZ2UnLFxuICAnZmFxLXBhZ2UnOiAnRkFRIFBhZ2UnLFxuICAnbWVldGluZy1yb29tcy1wYWdlJzogJ01lZXRpbmcgUm9vbXMgUGFnZScsXG4gICd2aXJ0dWFsLW9mZmljZS1wYWdlJzogJ1ZpcnR1YWwgT2ZmaWNlIFBhZ2UnLFxuICAnY29udGFjdC1wYWdlJzogJ0NvbnRhY3QgUGFnZScsXG4gICdwcml2YWN5LXBvbGljeS1wYWdlJzogJ1ByaXZhY3kgUG9saWN5IFBhZ2UnLFxuICAndGVybXMtcGFnZSc6ICdUZXJtcyBQYWdlJyxcbn07XG5cbmNvbnN0IFJFU09VUkNFX0xBQkVMUyA9IHtcbiAgJ2Jsb2ctcG9zdHMnOiAnQmxvZyBQb3N0JyxcbiAgJ2ZhcS1pdGVtcyc6ICdGQVEgSXRlbScsXG4gICdtZWV0aW5nLXJvb21zJzogJ01lZXRpbmcgUm9vbScsXG4gICdwcmljaW5nLXBsYW5zJzogJ1ByaWNpbmcgUGxhbicsXG59O1xuXG5jb25zdCBTSURFQkFSX1dJRFRIID0gMzA0O1xuY29uc3QgUkFJTF9XSURUSCA9IDQ4O1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tc2lkZWJhci1zaGVsbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDAgYXV0byAwIDA7XG4gIHdpZHRoOiAke1NJREVCQVJfV0lEVEh9cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYWViZjA7XG4gIHotaW5kZXg6IDUwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2U7XG59XG5cbi5hZG1pbi1zaWRlYmFyLXNoZWxsLS1yYWlsLW9ubHkge1xuICB3aWR0aDogJHtSQUlMX1dJRFRIfXB4O1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke1NJREVCQVJfV0lEVEh9cHgpO1xufVxuXG4uYWRtaW4tc2lkZWJhci1yYWlsIHtcbiAgd2lkdGg6IDQ4cHg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYWViZjA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEycHggMDtcbiAgZ2FwOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tc2lkZWJhci1sb2dvIHtcbiAgd2lkdGg6IDI4cHg7XG4gIGhlaWdodDogMjhweDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xufVxuXG4uYWRtaW4tcmFpbC1idXR0b24ge1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2YwZWJmZjtcbiAgY29sb3I6ICM3Yjc5ZmY7XG59XG5cbi5hZG1pbi1yYWlsLWJ1dHRvbiBzdmcge1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiAxNnB4O1xuICBzdHJva2U6IGN1cnJlbnRDb2xvcjtcbiAgZmlsbDogbm9uZTtcbiAgc3Ryb2tlLXdpZHRoOiAxLjg7XG4gIHN0cm9rZS1saW5lY2FwOiByb3VuZDtcbiAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcbn1cblxuLmFkbWluLXJhaWwtc3BhY2VyIHtcbiAgZmxleDogMTtcbn1cblxuLmFkbWluLWF2YXRhciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmFkbWluLWF2YXRhcl9fYnV0dG9uIHtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tYXZhdGFyX19tZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA0MnB4O1xuICBib3R0b206IDA7XG4gIG1pbi13aWR0aDogMTU2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywgMzMsIDUyLCAwLjE2KTtcbiAgcGFkZGluZzogNnB4O1xuICB6LWluZGV4OiA5MDtcbn1cblxuLmFkbWluLWF2YXRhcl9fbWVudSBidXR0b24ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZzogOHB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1hdmF0YXJfX21lbnUgYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLXNpZGViYXItcGFuZWwge1xuICB3aWR0aDogMjU2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi13aWR0aDogMDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmFkbWluLXNpZGViYXItaGVhZGVyIHtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWJmMDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLXNpZGViYXItYm9keSB7XG4gIHBhZGRpbmc6IDE0cHggOHB4IDE4cHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5hZG1pbi1zZWFyY2gge1xuICBwYWRkaW5nOiAwIDhweCAxMnB4O1xufVxuXG4uYWRtaW4tc2VhcmNoIGlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LXNpemU6IDAuNzVyZW07XG59XG5cbi5hZG1pbi1zZWFyY2ggaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1ncm91cCB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5hZG1pbi1ncm91cF9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZzogMCAxMHB4IDhweDtcbn1cblxuLmFkbWluLWdyb3VwX19sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC42ODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG5cbi5hZG1pbi1ncm91cF9fY291bnQge1xuICBtaW4td2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgcGFkZGluZzogMCA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjY4NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tbmF2LWxpbmsge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA3cHggMTBweDtcbiAgbWFyZ2luOiAxcHggMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmFkbWluLW5hdi1saW5rOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQ6ICNmMGViZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tbmF2LWxpbmtfX3RleHQge1xuICBtaW4td2lkdGg6IDA7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjM3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5hZG1pbi1uYXYtbGlua19faWNvbiB7XG4gIHdpZHRoOiAxMnB4O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLXNpZGViYXItc2hlbGwge1xuICAgIGJveC1zaGFkb3c6IDAgMThweCA0OHB4IHJnYmEoMzMsIDMzLCA1MiwgMC4xMik7XG4gIH1cblxuICAuYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7U0lERUJBUl9XSURUSH1weCk7XG4gIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDk2MXB4KSB7XG4gIC5hZG1pbi1zaWRlYmFyLXNoZWxsLFxuICAuYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIGl0ZW1NYXRjaGVzU2VhcmNoKGxhYmVsLCBzZWFyY2gpIHtcbiAgaWYgKCFzZWFyY2gpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBsYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gUmFpbEljb24oeyBjaGlsZHJlbiB9KSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9zdmc+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEhvbWVJY29uKCkge1xuICByZXR1cm4gKFxuICAgIDxSYWlsSWNvbj5cbiAgICAgIDxwYXRoIGQ9XCJNNC41IDEwLjUgMTIgNGw3LjUgNi41XCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNNi41IDkuNVYxOWgxMVY5LjVcIiAvPlxuICAgICAgPHBhdGggZD1cIk0xMCAxOXYtNWg0djVcIiAvPlxuICAgIDwvUmFpbEljb24+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFBlbmNpbEljb24oKSB7XG4gIHJldHVybiAoXG4gICAgPFJhaWxJY29uPlxuICAgICAgPHBhdGggZD1cIm0zLjUgMjAuNSA0LjI1LTEgOS43NS05Ljc1LTMuMjUtMy4yNUw0LjUgMTYuMjVsLTEgNC4yNVpcIiAvPlxuICAgICAgPHBhdGggZD1cIm0xMy41IDYuNSAzLjI1IDMuMjVcIiAvPlxuICAgICAgPHBhdGggZD1cIk03LjUgMTkuNWgxM1wiIC8+XG4gICAgPC9SYWlsSWNvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTWVkaWFJY29uKCkge1xuICByZXR1cm4gKFxuICAgIDxSYWlsSWNvbj5cbiAgICAgIDxyZWN0IHg9XCIzLjVcIiB5PVwiNS41XCIgd2lkdGg9XCIxN1wiIGhlaWdodD1cIjEzXCIgcng9XCIyXCIgLz5cbiAgICAgIDxjaXJjbGUgY3g9XCI4LjVcIiBjeT1cIjEwXCIgcj1cIjEuNVwiIC8+XG4gICAgICA8cGF0aCBkPVwibTUuNSAxNiA0LTQgMyAzIDItMiA0IDNcIiAvPlxuICAgIDwvUmFpbEljb24+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNpZGViYXIoeyBpc1Zpc2libGUgfSkge1xuICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgcGFnZXMgPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLnBhZ2VzKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUuc2Vzc2lvbik7XG4gIGNvbnN0IFtzZWFyY2gsIHNldFNlYXJjaF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFttZW51T3Blbiwgc2V0TWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBhdmF0YXJSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgY29uc3QgcGFnZUl0ZW1zID0gdXNlTWVtbyhcbiAgICAoKSA9PiBDT05URU5UX1BBR0VfT1JERVJcbiAgICAgIC5tYXAoKHBhZ2VOYW1lKSA9PiBwYWdlcy5maW5kKChwYWdlKSA9PiBwYWdlLm5hbWUgPT09IHBhZ2VOYW1lKSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5tYXAoKHBhZ2UpID0+ICh7XG4gICAgICAgIGlkOiBwYWdlLm5hbWUsXG4gICAgICAgIGxhYmVsOiBDT05URU5UX1BBR0VfTEFCRUxTW3BhZ2UubmFtZV0gPz8gcGFnZS5uYW1lLFxuICAgICAgICBocmVmOiBgL2FkbWluL3BhZ2VzLyR7cGFnZS5uYW1lfWAsXG4gICAgICAgIHNlbGVjdGVkOiBsb2NhdGlvbi5wYXRobmFtZS5zdGFydHNXaXRoKGAvYWRtaW4vcGFnZXMvJHtwYWdlLm5hbWV9YCksXG4gICAgICB9KSlcbiAgICAgIC5maWx0ZXIoKHBhZ2UpID0+IGl0ZW1NYXRjaGVzU2VhcmNoKHBhZ2UubGFiZWwsIHNlYXJjaCkpLFxuICAgIFtsb2NhdGlvbi5wYXRobmFtZSwgcGFnZXMsIHNlYXJjaF0sXG4gICk7XG5cbiAgY29uc3QgY29sbGVjdGlvbkl0ZW1zID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoW1xuICAgICAgeyBpZDogJ2Jsb2ctcG9zdHMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2Jsb2ctcG9zdHMnIH0sXG4gICAgICB7IGlkOiAnZmFxLWl0ZW1zJywgaHJlZjogJy9hZG1pbi9wYWdlcy9mYXEtaXRlbXMnIH0sXG4gICAgICB7IGlkOiAnbWVldGluZy1yb29tcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvbWVldGluZy1yb29tcycgfSxcbiAgICAgIHsgaWQ6ICdwcmljaW5nLXBsYW5zJywgaHJlZjogJy9hZG1pbi9wYWdlcy9wcmljaW5nLXBsYW5zJyB9LFxuICAgIF0pXG4gICAgICAubWFwKChyZXNvdXJjZSkgPT4gKHtcbiAgICAgICAgaWQ6IHJlc291cmNlLmlkLFxuICAgICAgICBsYWJlbDogUkVTT1VSQ0VfTEFCRUxTW3Jlc291cmNlLmlkXSA/PyByZXNvdXJjZS5pZCxcbiAgICAgICAgaHJlZjogcmVzb3VyY2UuaHJlZixcbiAgICAgICAgc2VsZWN0ZWQ6IGxvY2F0aW9uLnBhdGhuYW1lLnN0YXJ0c1dpdGgocmVzb3VyY2UuaHJlZiksXG4gICAgICB9KSlcbiAgICAgIC5maWx0ZXIoKHJlc291cmNlKSA9PiBpdGVtTWF0Y2hlc1NlYXJjaChyZXNvdXJjZS5sYWJlbCwgc2VhcmNoKSksXG4gICAgW2xvY2F0aW9uLnBhdGhuYW1lLCBzZWFyY2hdLFxuICApO1xuXG4gIGNvbnN0IGluaXRpYWwgPSAoc2Vzc2lvbj8uZW1haWw/LlswXSA/PyAnQycpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGlzRGFzaGJvYXJkID0gbG9jYXRpb24ucGF0aG5hbWUgPT09ICcvYWRtaW4nIHx8IGxvY2F0aW9uLnBhdGhuYW1lID09PSAnL2FkbWluLyc7XG4gIGNvbnN0IGlzTWVkaWEgPSBsb2NhdGlvbi5wYXRobmFtZS5zdGFydHNXaXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScpO1xuICBjb25zdCBzaG93UGFuZWwgPSAhaXNNZWRpYTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbWVudU9wZW4pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWF2YXRhclJlZi5jdXJyZW50Py5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlT3V0c2lkZUNsaWNrKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlT3V0c2lkZUNsaWNrKTtcbiAgfSwgW21lbnVPcGVuXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWRtaW4tc2lkZWJhci1zaGVsbCR7c2hvd1BhbmVsID8gJycgOiAnIGFkbWluLXNpZGViYXItc2hlbGwtLXJhaWwtb25seSd9JHtpc1Zpc2libGUgPyAnJyA6ICcgYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuJ31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLXJhaWxcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLWxvZ29cIlxuICAgICAgICAgICAgc3JjPVwiL2FkbWluLWFzc2V0cy9jbGllbnQtbWFyay5zdmdcIlxuICAgICAgICAgICAgYWx0PVwiVGhlIExlYWRlbmhhbGwgV29ya3NcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcmFpbC1idXR0b24ke2lzRGFzaGJvYXJkID8gJyBhZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKCcvYWRtaW4nKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8SG9tZUljb24gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yYWlsLWJ1dHRvbiR7IWlzRGFzaGJvYXJkICYmICFpc01lZGlhID8gJyBhZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKCcvYWRtaW4vcGFnZXMvc2l0ZS1zZXR0aW5ncycpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQZW5jaWxJY29uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcmFpbC1idXR0b24ke2lzTWVkaWEgPyAnIGFkbWluLXJhaWwtYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5Jyl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE1lZGlhSWNvbiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmFpbC1zcGFjZXJcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXZhdGFyXCIgcmVmPXthdmF0YXJSZWZ9PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1hdmF0YXJfX2J1dHRvblwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRNZW51T3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aW5pdGlhbH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge21lbnVPcGVuID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWF2YXRhcl9fbWVudVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKCcvYWRtaW4vcGFnZXMvYWNjb3VudCcpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBBY2NvdW50XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbignL2FkbWluL2xvZ291dCcpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBTaWduIG91dFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7c2hvd1BhbmVsID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGViYXItcGFuZWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGViYXItaGVhZGVyXCI+Q29udGVudCBNYW5hZ2VyPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLWJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2VhcmNoXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2goZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fbGFiZWxcIj5Db2xsZWN0aW9uIFR5cGVzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19jb3VudFwiPntjb2xsZWN0aW9uSXRlbXMubGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtjb2xsZWN0aW9uSXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tbmF2LWxpbmske2l0ZW0uc2VsZWN0ZWQgPyAnIGFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCcgOiAnJ31gfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShpdGVtLmhyZWYpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW5hdi1saW5rX190ZXh0XCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fbGFiZWxcIj5TaW5nbGUgVHlwZXM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2NvdW50XCI+e3BhZ2VJdGVtcy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge3BhZ2VJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1uYXYtbGluayR7aXRlbS5zZWxlY3RlZCA/ICcgYWRtaW4tbmF2LWxpbmstLXNlbGVjdGVkJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKGl0ZW0uaHJlZil9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbmF2LWxpbmtfX3RleHRcIj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIEZvcm1Hcm91cCxcbiAgSDIsXG4gIElucHV0LFxuICBMYWJlbCxcbiAgTWVzc2FnZUJveCxcbiAgVGV4dCxcbn0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExvZ2luKCkge1xuICBjb25zdCBwcm9wcyA9IHdpbmRvdy5fX0FQUF9TVEFURV9fID8/IHt9O1xuICBjb25zdCBicmFuZGluZyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUuYnJhbmRpbmcpO1xuICBjb25zdCBtZXNzYWdlID0gcHJvcHMuZXJyb3JNZXNzYWdlO1xuXG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgdmFyaWFudD1cImdyZXlcIlxuICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcbiAgICAgIHA9XCJ4bFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjRlZmU4IDAlLCAjZThkY2NmIDQ1JSwgI2Q5YzRhYiAxMDAlKScsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxCb3hcbiAgICAgICAgYmc9XCJ3aGl0ZVwiXG4gICAgICAgIHdpZHRoPXtbJzEwMCUnLCAnMTAwJScsICc5NjBweCddfVxuICAgICAgICBtaW5IZWlnaHQ9XCI1NjBweFwiXG4gICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgYm94U2hhZG93PVwiY2FyZFwiXG4gICAgICAgIGJvcmRlclJhZGl1cz1cInhsXCJcbiAgICAgICAgb3ZlcmZsb3c9XCJoaWRkZW5cIlxuICAgICAgPlxuICAgICAgICA8Qm94XG4gICAgICAgICAgd2lkdGg9e1snMCcsICcwJywgJzQ0JSddfVxuICAgICAgICAgIGRpc3BsYXk9e1snbm9uZScsICdub25lJywgJ2ZsZXgnXX1cbiAgICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIlxuICAgICAgICAgIHA9XCJ4eGxcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBmMGYwZiAwJSwgIzFmMWYxZiAxMDAlKScsXG4gICAgICAgICAgICBjb2xvcjogJyNmNWYxZWEnLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIvYWRtaW4tYXNzZXRzL2xvZ28uc3ZnXCJcbiAgICAgICAgICAgICAgYWx0PXticmFuZGluZy5jb21wYW55TmFtZX1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IDcyLCBoZWlnaHQ6IDcyLCBvYmplY3RGaXQ6ICdjb250YWluJywgbWFyZ2luQm90dG9tOiAyNCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxIMiBjb2xvcj1cIndoaXRlXCIgbWFyZ2luQm90dG9tPVwibGdcIj5DbGllbnQgQ29udGVudCBQb3J0YWw8L0gyPlxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NDBcIj5cbiAgICAgICAgICAgICAgTWFuYWdlIHRoZSBzYW1lIGNsaWVudC1mYWNpbmcgY29udGVudCBzdXJmYWNlIHVzZWQgYnkgdGhlIGxpdmUgc2l0ZS5cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk1MFwiPlRoZSBMZWFkZW5oYWxsIFdvcmtzPC9UZXh0PlxuICAgICAgICA8L0JveD5cblxuICAgICAgICA8Qm94XG4gICAgICAgICAgYXM9XCJmb3JtXCJcbiAgICAgICAgICBhY3Rpb249e3Byb3BzLmFjdGlvbn1cbiAgICAgICAgICBtZXRob2Q9XCJQT1NUXCJcbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICBwPVwieHhsXCJcbiAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgICAgZmxleERpcmVjdGlvbj1cImNvbHVtblwiXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgPEJveCBtYj1cInh4bFwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIvYWRtaW4tYXNzZXRzL2xvZ28uc3ZnXCJcbiAgICAgICAgICAgICAgYWx0PXticmFuZGluZy5jb21wYW55TmFtZX1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IDY0LCBoZWlnaHQ6IDY0LCBvYmplY3RGaXQ6ICdjb250YWluJywgbWFyZ2luQm90dG9tOiAyMCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxIMiBtYXJnaW49XCIwXCI+U2lnbiBpbjwvSDI+XG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk2MFwiPkNsaWVudCBlZGl0b3IgYWNjZXNzIGZvciBUaGUgTGVhZGVuaGFsbCBXb3Jrcy48L1RleHQ+XG4gICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICB7bWVzc2FnZSA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIiBtYj1cImxnXCI+e21lc3NhZ2V9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgPExhYmVsIHJlcXVpcmVkPkVtYWlsPC9MYWJlbD5cbiAgICAgICAgICAgIDxJbnB1dCBuYW1lPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cImNsaWVudEBsZWFkZW5oYWxsd29ya3MuY29tXCIgLz5cbiAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+UGFzc3dvcmQ8L0xhYmVsPlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgcGFzc3dvcmRcIlxuICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJjdXJyZW50LXBhc3N3b3JkXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICA8Qm94IG10PVwieGxcIj5cbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBzaXplPVwibGdcIj5Mb2cgaW48L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRvcEJhcigpIHtcbiAgcmV0dXJuIG51bGw7XG59XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBDb2xsZWN0aW9uTWFuYWdlciBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uTWFuYWdlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29sbGVjdGlvbk1hbmFnZXIgPSBDb2xsZWN0aW9uTWFuYWdlclxuaW1wb3J0IENvbnRlbnRQYWdlRWRpdG9yIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0NvbnRlbnRQYWdlRWRpdG9yJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db250ZW50UGFnZUVkaXRvciA9IENvbnRlbnRQYWdlRWRpdG9yXG5pbXBvcnQgTWVkaWFMaWJyYXJ5IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL01lZGlhTGlicmFyeSdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTWVkaWFMaWJyYXJ5ID0gTWVkaWFMaWJyYXJ5XG5pbXBvcnQgQWNjb3VudFNldHRpbmdzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0FjY291bnRTZXR0aW5ncydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQWNjb3VudFNldHRpbmdzID0gQWNjb3VudFNldHRpbmdzXG5pbXBvcnQgU2lkZWJhciBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9TaWRlYmFyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TaWRlYmFyID0gU2lkZWJhclxuaW1wb3J0IExvZ2luIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0xvZ2luJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Mb2dpbiA9IExvZ2luXG5pbXBvcnQgVG9wQmFyIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL1RvcEJhcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVG9wQmFyID0gVG9wQmFyIl0sIm5hbWVzIjpbIlBSSU1BUllfUEFHRVMiLCJsYWJlbCIsImhyZWYiLCJDT0xMRUNUSU9OUyIsIlNUWUxFUyIsImFwaSIsIkFwaUNsaWVudCIsImZvcm1hdFN1Ym1pc3Npb25EYXRlIiwidmFsdWUiLCJkYXRlIiwiRGF0ZSIsIk51bWJlciIsImlzTmFOIiwiZ2V0VGltZSIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsImRhdGVTdHlsZSIsInRpbWVTdHlsZSIsImZvcm1hdCIsInRyaW1NZXNzYWdlIiwibWVzc2FnZSIsIm5vcm1hbGl6ZWQiLCJTdHJpbmciLCJ0cmltIiwibGVuZ3RoIiwic2xpY2UiLCJ0cmltRW5kIiwiY29lcmNlSnNvbiIsInJlc3BvbnNlVGV4dCIsIkpTT04iLCJwYXJzZSIsImZldGNoQWRtaW5Kc29uIiwidXJsIiwib3B0aW9ucyIsInJlc3BvbnNlIiwiZmV0Y2giLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJ0ZXh0IiwicGF5bG9hZCIsIm9rIiwiZXJyb3IiLCJzdGF0dXMiLCJFcnJvciIsIm5vcm1hbGl6ZUFkbWluU3VibWlzc2lvblBheWxvYWQiLCJBcnJheSIsImlzQXJyYXkiLCJkYXRhIiwibm9ybWFsaXplU3VibWlzc2lvblJlY29yZCIsInJlY29yZCIsInBhcmFtcyIsImlkIiwibmFtZSIsImVtYWlsIiwicGhvbmUiLCJzb3VyY2VQYWdlIiwic291cmNlX3BhZ2UiLCJjcmVhdGVkQXQiLCJjcmVhdGVkX2F0Iiwibm9ybWFsaXplUmVzb3VyY2VTdWJtaXNzaW9uUGF5bG9hZCIsInJlY29yZHMiLCJtYXAiLCJmaWx0ZXIiLCJzdWJtaXNzaW9uIiwiaXNGaW5pdGUiLCJub3JtYWxpemVSZXNvdXJjZVJlY29yZFBheWxvYWQiLCJnZXRSZWNlbnRTdWJtaXNzaW9ucyIsInByb3BzIiwicmVjZW50U3VibWlzc2lvbnMiLCJyZWNlbnRNZXNzYWdlcyIsInJlc29sdmVTdWJtaXNzaW9uUGF5bG9hZCIsInNvdXJjZSIsImJvZHkiLCJyZXN1bHQiLCJpdGVtcyIsIm5vcm1hbGl6ZURhc2hib2FyZFJlc3BvbnNlIiwiZmV0Y2hEYXNoYm9hcmRNZXNzYWdlcyIsImZldGNoQWRtaW5NZXNzYWdlcyIsImxpbWl0Iiwic2FmZUxpbWl0Iiwibm9ybWFsaXplQ3VzdG9tUmVzcG9uc2UiLCJjdXN0b21QYXlsb2FkIiwiY3VzdG9tU3VibWlzc2lvbnMiLCJjb25zb2xlIiwid2FybiIsInJlc291cmNlUGF5bG9hZCIsImRlbGV0ZUFkbWluU3VibWlzc2lvbiIsInBhcnNlZElkIiwibWV0aG9kIiwiQWNjZXB0IiwiYmFzZUVycm9yIiwibm90aWNlIiwidHlwZSIsImZldGNoQWRtaW5TdWJtaXNzaW9uQnlJZCIsImN1c3RvbVN1Ym1pc3Npb24iLCJTaG9ydGN1dExpc3QiLCJ0aXRsZSIsIm5hdmlnYXRlIiwibWV0YSIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsIml0ZW0iLCJrZXkiLCJvbkNsaWNrIiwiTWVzc2FnZXNDYXJkIiwic3VibWlzc2lvbnMiLCJzZWxlY3RlZFN1Ym1pc3Npb24iLCJvbk9wZW4iLCJvbkRlbGV0ZSIsImRlbGV0aW5nSWQiLCJvcGVyYXRpb25FcnJvciIsImRpc2FibGVkIiwiRGFzaGJvYXJkIiwidXNlTmF2aWdhdGUiLCJkYXNoYm9hcmRTdWJtaXNzaW9ucyIsInNldERhc2hib2FyZFN1Ym1pc3Npb25zIiwidXNlU3RhdGUiLCJzZXRTZWxlY3RlZFN1Ym1pc3Npb24iLCJzZXREZWxldGluZ0lkIiwic2V0T3BlcmF0aW9uRXJyb3IiLCJ1c2VFZmZlY3QiLCJpbml0aWFsU3VibWlzc2lvbnMiLCJpc0FjdGl2ZSIsImxvYWREYXNoYm9hcmREYXRhIiwiYXNzaWduU3VibWlzc2lvbnMiLCJuZXh0U3VibWlzc2lvbnMiLCJkYXNoYm9hcmRSZXNwb25zZSIsImdldERhc2hib2FyZCIsImZhbGxiYWNrU3VibWlzc2lvbnMiLCJkYXNoYm9hcmRPbmx5UGF5bG9hZCIsImRhc2hib2FyZE9ubHlTdWJtaXNzaW9ucyIsImZhbGxiYWNrUGF5bG9hZCIsImZhbGxiYWNrRXJyb3IiLCJoYW5kbGVPcGVuU3VibWlzc2lvbiIsImZyZXNoU3VibWlzc2lvbiIsImhhbmRsZURlbGV0ZVN1Ym1pc3Npb24iLCJ0YXJnZXRJZCIsInByZXZpb3VzIiwiRnJhZ21lbnQiLCJNVUxUSUxJTkVfRklFTERfUEFUVEVSTiIsIklNQUdFX0ZJRUxEX1BBVFRFUk4iLCJCT09MRUFOX0ZJRUxEX1BBVFRFUk4iLCJGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4iLCJ0b0xhYmVsIiwicmVwbGFjZSIsInYiLCJ0b1VwcGVyQ2FzZSIsImNsb25lVmFsdWUiLCJzdHJpbmdpZnkiLCJnZXRFbXB0eUl0ZW0iLCJzYW1wbGUiLCJPYmplY3QiLCJmcm9tRW50cmllcyIsImtleXMiLCJpbmNsdWRlcyIsInRvQ29tcGFyYWJsZVZhbHVlIiwic29ydCIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiaGFzTWVhbmluZ2Z1bFZhbHVlIiwic29tZSIsImVudHJpZXMiLCJuZXN0ZWRWYWx1ZSIsImJ1aWxkQWRtaW5QYXRoIiwicGF0aG5hbWUiLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJmb3JFYWNoIiwidW5kZWZpbmVkIiwic2V0IiwicXVlcnlTdHJpbmciLCJ0b1N0cmluZyIsInBhcnNlRGlzcGxheWVkRmllbGRzIiwic3BsaXQiLCJmaWVsZCIsIkJvb2xlYW4iLCJwYXJzZUlucHV0VmFsdWUiLCJuZXh0UmF3VmFsdWUiLCJjdXJyZW50VmFsdWUiLCJwYXJzZWQiLCJnZXRSZXBlYXRhYmxlSXRlbVZhbHVlIiwiZ2V0TWVkaWFEaXNwbGF5TmFtZSIsImZhbGxiYWNrIiwicmF3IiwicGFydHMiLCJ3aXRoUmVwZWF0YWJsZUl0ZW1WYWx1ZSIsIm5leHRWYWx1ZSIsInJlc29sdmVNZWRpYVByZXZpZXdVcmwiLCJ0ZXN0Iiwic3RhcnRzV2l0aCIsInVwZGF0ZUF0UGF0aCIsInBhdGgiLCJzZWdtZW50IiwicmVzdCIsImNsb25lIiwicmVtb3ZlQXRQYXRoIiwiXyIsImluZGV4IiwiYXBwZW5kQXRQYXRoIiwibmV4dEl0ZW0iLCJtb3ZlQXRQYXRoIiwib2Zmc2V0IiwibmV4dEluZGV4IiwibW92ZWQiLCJzcGxpY2UiLCJnZXREaXNwbGF5VGl0bGUiLCJkZWZpbml0aW9uIiwidGl0bGVGaWVsZCIsImlzQmxvZ0Rpc2FibGVkRmllbGQiLCJpc0ZhcURpc2FibGVkRmllbGQiLCJpc01lZXRpbmdSb29tRGlzYWJsZWRGaWVsZCIsImlzVmlzaWJpbGl0eVRvZ2dsZUZpZWxkIiwiZ2V0RmllbGREaXNwbGF5TGFiZWwiLCJyZXF1ZXN0UGFnZSIsInBhZ2VOYW1lIiwicXVlcnkiLCJ0cmltbWVkVGV4dCIsInRvTG93ZXJDYXNlIiwiaXNIdG1sIiwicmVkaXJlY3RlZFRvTG9naW4iLCJyZWRpcmVjdGVkIiwiaXNBdXRoRXJyb3IiLCJ1cGxvYWRBZG1pbkltYWdlIiwiZmlsZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJqc29uIiwiY2F0Y2giLCJ1cGxvYWRlZFVybCIsInJlbGF0aXZlVXJsIiwiTUVESUFfUElDS0VSX0VWRU5UIiwiY2hvb3NlQWRtaW5MaWJyYXJ5SW1hZ2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndpbmRvdyIsInBpY2tlcldpbmRvdyIsIm9wZW4iLCJmaW5pc2hlZCIsImNsZWFudXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlTWVzc2FnZSIsImNsZWFySW50ZXJ2YWwiLCJjbG9zZVdhdGNoZXIiLCJldmVudCIsIm9yaWdpbiIsImxvY2F0aW9uIiwic2V0SW50ZXJ2YWwiLCJjbG9zZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiTWVkaWFGaWVsZCIsIm9uQ2hhbmdlIiwidXJscyIsImZpbGVJbnB1dFJlZiIsInVzZVJlZiIsInVwbG9hZGluZyIsInNldFVwbG9hZGluZyIsInVwbG9hZEVycm9yIiwic2V0VXBsb2FkRXJyb3IiLCJzcmMiLCJhbHQiLCJjdXJyZW50IiwiY2xpY2siLCJzZWxlY3RlZFVybCIsInJlZiIsImFjY2VwdCIsIm11bHRpcGxlIiwic3R5bGUiLCJkaXNwbGF5IiwiZmlsZXMiLCJmcm9tIiwidGFyZ2V0IiwidXBsb2FkZWRVcmxzIiwicHVzaCIsIlByaW1pdGl2ZUZpZWxkIiwiaXNEaXNhYmxlZEZpZWxkIiwiY2hlY2tlZCIsIkFycmF5RmllbGQiLCJvbkFkZEl0ZW0iLCJvblJlbW92ZUl0ZW0iLCJvbk1vdmVJdGVtIiwiaXNJbWFnZUFycmF5IiwiZHJhZ0luZGV4Iiwic2V0RHJhZ0luZGV4IiwiZHJhZ092ZXJJbmRleCIsInNldERyYWdPdmVySW5kZXgiLCJ1cGxvYWRpbmdJbmRleCIsInNldFVwbG9hZGluZ0luZGV4IiwiZmlsZUlucHV0UmVmcyIsIm9uRHJhZ092ZXIiLCJwcmV2ZW50RGVmYXVsdCIsIm9uRHJvcCIsIm9uRHJhZ0xlYXZlIiwic3RvcFByb3BhZ2F0aW9uIiwiZHJhZ2dhYmxlIiwib25EcmFnU3RhcnQiLCJkYXRhVHJhbnNmZXIiLCJlZmZlY3RBbGxvd2VkIiwic2V0RGF0YSIsIm9uRHJhZ0VuZCIsIm1hcmdpblRvcCIsImVsZW1lbnQiLCJwYWRkaW5nIiwiRmllbGRSZW5kZXJlciIsInJlbmRlckxpc3RDZWxsIiwiTGlzdFZpZXciLCJjb250cm9scyIsInNlYXJjaCIsImxvYWRpbmciLCJvblNlYXJjaCIsIm9uT3BlblJlY29yZCIsIm9uQ3JlYXRlIiwib25TZXRTb3J0Iiwib25TZXRGaWx0ZXIiLCJvblJlc2V0RmlsdGVycyIsIm9uVG9nZ2xlRGlzcGxheWVkRmllbGQiLCJvblJlc2V0RGlzcGxheWVkRmllbGRzIiwib25EdXBsaWNhdGVSZWNvcmQiLCJvbkRlbGV0ZVJlY29yZCIsInNob3dTZWFyY2giLCJzZXRTaG93U2VhcmNoIiwic2hvd0ZpbHRlcnMiLCJzZXRTaG93RmlsdGVycyIsInNob3dEaXNwbGF5ZWQiLCJzZXRTaG93RGlzcGxheWVkIiwic2VhcmNoVmFsdWUiLCJzZXRTZWFyY2hWYWx1ZSIsIm9wZW5NZW51SWQiLCJzZXRPcGVuTWVudUlkIiwibWVudVJlZiIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiaGFuZGxlUG9pbnRlckRvd24iLCJjb250YWlucyIsImRvY3VtZW50IiwiZGlzcGxheWVkQ29sdW1ucyIsInVzZU1lbW8iLCJhdmFpbGFibGVGaWVsZHMiLCJkaXNwbGF5ZWRGaWVsZHMiLCJwbGFjZWhvbGRlciIsImF1dG9Gb2N1cyIsImxlZnQiLCJyaWdodCIsImZpbHRlcnMiLCJhY3RpdmVGaWx0ZXJzIiwib3B0aW9uIiwiY29sdW1uIiwic29ydEJ5Iiwic29ydE9yZGVyIiwiZG9jdW1lbnRJZCIsImNvbHVtbnMiLCJFZGl0VmlldyIsInB1Ymxpc2hlZFJlY29yZCIsImFjdGl2ZVRhYiIsIm9uU3dpdGNoVGFiIiwic2F2aW5nIiwib25CYWNrIiwib25TYXZlIiwib25QdWJsaXNoIiwib25EaXNjYXJkQ2hhbmdlcyIsIm9uVW5wdWJsaXNoIiwiY2FuU2F2ZSIsImNhblB1Ymxpc2giLCJjYW5EaXNjYXJkIiwiY2FuVW5wdWJsaXNoIiwiZGlzcGxheWVkUmVjb3JkIiwiaXNQdWJsaXNoZWRWaWV3IiwibWVudU9wZW4iLCJzZXRNZW51T3BlbiIsIk1lc3NhZ2VCb3giLCJ2YXJpYW50IiwiZWRpdExheW91dCIsInJvdyIsIkNvbGxlY3Rpb25NYW5hZ2VyIiwidXNlUGFyYW1zIiwidXNlTG9jYXRpb24iLCJhZGROb3RpY2UiLCJ1c2VOb3RpY2UiLCJzZXRMb2FkaW5nIiwibGlzdExvYWRpbmciLCJzZXRMaXN0TG9hZGluZyIsInNldFNhdmluZyIsInNldERlZmluaXRpb24iLCJzZXRSZWNvcmRzIiwic2V0Q29udHJvbHMiLCJzZXRSZWNvcmQiLCJvcmlnaW5hbFJlY29yZCIsInNldE9yaWdpbmFsUmVjb3JkIiwic2V0UHVibGlzaGVkUmVjb3JkIiwic2V0QWN0aXZlVGFiIiwic2V0RXJyb3IiLCJyZWNvcmRJZCIsImdldCIsImlzTmV3IiwiY2F0ZWdvcnkiLCJwbGFuVHlwZSIsImZlYXR1cmVkIiwiaXNGZWF0dXJlZCIsImlzUG9wdWxhciIsIm1vZGUiLCJpc0RpcnR5IiwiaGFzRHJhZnRDb250ZW50IiwiaGFzVW5wdWJsaXNoZWRDaGFuZ2VzIiwiYWN0aXZlIiwibG9hZCIsInNob3VsZEJsb2NrIiwibmV3Iiwiam9pbiIsIm5leHREcmFmdFJlY29yZCIsImRyYWZ0UmVjb3JkIiwibG9hZEVycm9yIiwidXBkYXRlTGlzdFF1ZXJ5IiwicGF0Y2giLCJuZXh0UGFyYW1zIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlQWRkSXRlbSIsImhhbmRsZVJlbW92ZUl0ZW0iLCJoYW5kbGVNb3ZlSXRlbSIsImhhbmRsZVNhdmVJbnRlbnQiLCJpbnRlbnQiLCJkZWxldGVkIiwicmVxdWVzdEVycm9yIiwiaGFuZGxlRGlzY2FyZENoYW5nZXMiLCJoYW5kbGVDcmVhdGUiLCJoYW5kbGVMaXN0QWN0aW9uIiwidGFyZ2V0UmVjb3JkSWQiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJoZWlnaHQiLCJMb2FkZXIiLCJsaXN0Q29sdW1ucyIsIm5leHRTZWFyY2giLCJuZXh0UmVjb3JkSWQiLCJuZXh0T3JkZXIiLCJuZXh0RmllbGRzIiwiU2V0IiwiUEFUSF9GSUVMRF9QQVRURVJOIiwiUkVRVUlSRURfRklFTERfUEFUVEVSTiIsIlJPVVRFX09QVElPTlMiLCJQQUdFX0xBWU9VVFMiLCJmaWVsZHMiLCJob21lcGFnZSIsImdldEZpZWxkTGFiZWwiLCJmaWVsZEtleSIsImVuZHNXaXRoIiwiZ2V0UGF0aE9wdGlvbnMiLCJ1bnNoaWZ0IiwiaXNQbGFpbk9iamVjdCIsImdldEZpbGVuYW1lIiwiVVJMIiwiZmlsZW5hbWUiLCJwb3AiLCJ0cmltbWVkIiwidG9BZG1pbkVycm9yTWVzc2FnZSIsInJlc3BvbnNlRGF0YSIsImlzUmVxdWlyZWRGaWVsZCIsImZpZWxkQ2xhc3NOYW1lIiwiaXNIaWRkZW5FZGl0b3JGaWVsZCIsImdldEl0ZW1UaXRsZSIsImZhbGxiYWNrTGFiZWwiLCJwcmVmZXJyZWQiLCJxdWVzdGlvbiIsImZlYXR1cmUiLCJmaW5kIiwiYnVpbGRTZWN0aW9ucyIsImNvbnRlbnQiLCJsYXlvdXQiLCJ1c2VkIiwic2VjdGlvbnMiLCJzZWN0aW9uIiwic2VjdGlvbkVudHJpZXMiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJhZGQiLCJleHRyYUVudHJpZXMiLCJoYXMiLCJpbnB1dFZhbHVlIiwicmVxdWlyZWQiLCJpc0ltYWdlRmllbGQiLCJpc1BhdGhGaWVsZCIsInByZXZpZXdVcmwiLCJzaG93UHJldmlldyIsInNlbGVjdGVkRmlsZSIsIk9iamVjdEZpZWxkIiwibmVzdGVkS2V5IiwiRm9ybVNlY3Rpb24iLCJDb250ZW50UGFnZUVkaXRvciIsInBhZ2VMYWJlbCIsInNldFBhZ2VMYWJlbCIsInNldENvbnRlbnQiLCJvcmlnaW5hbENvbnRlbnQiLCJzZXRPcmlnaW5hbENvbnRlbnQiLCJwdWJsaXNoZWRDb250ZW50Iiwic2V0UHVibGlzaGVkQ29udGVudCIsImRpc3BsYXllZENvbnRlbnQiLCJlbnRyeVRpdGxlIiwiaGVyb1RpdGxlIiwic2l0ZU5hbWUiLCJpc01vdW50ZWQiLCJsb2FkUGFnZSIsImdldFBhZ2UiLCJuZXh0RHJhZnRDb250ZW50IiwiZHJhZnREYXRhIiwicHVibGlzaGVkRGF0YSIsImhhbmRsZVNhdmUiLCJzYXZlRXJyb3IiLCJoaXN0b3J5IiwiYmFjayIsImJ1aWxkUGFnZVBhdGgiLCJyZXF1ZXN0TWVkaWEiLCJBc3NldENhcmQiLCJwaWNrZXJNb2RlIiwidGh1bWJuYWlsVXJsIiwiYWx0ZXJuYXRpdmVUZXh0IiwibWltZSIsImV4dCIsIndpZHRoIiwiY29sb3IiLCJmb250V2VpZ2h0IiwiRGV0YWlsVmlldyIsIm9uU2VsZWN0IiwibWFyZ2luQm90dG9tIiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwicmVhZE9ubHkiLCJjYXB0aW9uIiwic2l6ZUxhYmVsIiwicHJvdmlkZXIiLCJmb2xkZXJQYXRoIiwidXBkYXRlZEF0TGFiZWwiLCJjcmVhdGVkQXRMYWJlbCIsIk1lZGlhTGlicmFyeSIsImZpbGVJZCIsInNldEl0ZW1zIiwiY291bnQiLCJzZXRDb3VudCIsInNldEl0ZW0iLCJvcGVuTGlzdCIsInBpY2tlciIsInNlbGVjdEFzc2V0Iiwic2VsZWN0ZWRJdGVtIiwib3BlbmVyIiwicG9zdE1lc3NhZ2UiLCJjbG9zZSIsImlucHV0Iiwib25jaGFuZ2UiLCJyZWZyZXNoZWRQYXlsb2FkIiwiZGVmYXVsdFZhbHVlIiwibWVkaWFJdGVtIiwicmVxdWVzdEFjY291bnQiLCJBY2NvdW50U2V0dGluZ3MiLCJzdWJtaXR0aW5nIiwic2V0U3VibWl0dGluZyIsInN1Y2Nlc3MiLCJzZXRTdWNjZXNzIiwic2V0RW1haWwiLCJjdXJyZW50UGFzc3dvcmQiLCJzZXRDdXJyZW50UGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsInNldE5ld1Bhc3N3b3JkIiwiY29uZmlybVBhc3N3b3JkIiwic2V0Q29uZmlybVBhc3N3b3JkIiwidGhlbiIsImZpbmFsbHkiLCJvblN1Ym1pdCIsImFzc2lnbiIsInN1Ym1pdEVycm9yIiwibWIiLCJhdXRvQ29tcGxldGUiLCJnYXAiLCJDT05URU5UX1BBR0VfT1JERVIiLCJDT05URU5UX1BBR0VfTEFCRUxTIiwiUkVTT1VSQ0VfTEFCRUxTIiwiU0lERUJBUl9XSURUSCIsIlJBSUxfV0lEVEgiLCJpdGVtTWF0Y2hlc1NlYXJjaCIsIlJhaWxJY29uIiwiY2hpbGRyZW4iLCJ2aWV3Qm94IiwiSG9tZUljb24iLCJkIiwiUGVuY2lsSWNvbiIsIk1lZGlhSWNvbiIsIngiLCJ5IiwicngiLCJjeCIsImN5IiwiciIsIlNpZGViYXIiLCJpc1Zpc2libGUiLCJwYWdlcyIsInVzZVNlbGVjdG9yIiwic3RhdGUiLCJzZXNzaW9uIiwic2V0U2VhcmNoIiwiYXZhdGFyUmVmIiwicGFnZUl0ZW1zIiwicGFnZSIsInNlbGVjdGVkIiwiY29sbGVjdGlvbkl0ZW1zIiwicmVzb3VyY2UiLCJpbml0aWFsIiwiaXNEYXNoYm9hcmQiLCJpc01lZGlhIiwic2hvd1BhbmVsIiwiaGFuZGxlT3V0c2lkZUNsaWNrIiwiTG9naW4iLCJfX0FQUF9TVEFURV9fIiwiYnJhbmRpbmciLCJlcnJvck1lc3NhZ2UiLCJCb3giLCJwIiwiYmFja2dyb3VuZCIsImJnIiwibWluSGVpZ2h0IiwiYm94U2hhZG93IiwiYm9yZGVyUmFkaXVzIiwib3ZlcmZsb3ciLCJmbGV4RGlyZWN0aW9uIiwiY29tcGFueU5hbWUiLCJvYmplY3RGaXQiLCJIMiIsIlRleHQiLCJhcyIsImFjdGlvbiIsImZsZXhHcm93IiwibWFyZ2luIiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJJbnB1dCIsIm10IiwiQnV0dG9uIiwic2l6ZSIsIlRvcEJhciIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUlBLE1BQU1BLGFBQWEsR0FBRyxDQUNwQjtFQUFFQyxFQUFBQSxLQUFLLEVBQUUsVUFBVTtFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBd0IsQ0FBQyxFQUNwRDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsWUFBWTtFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBMEIsQ0FBQyxFQUN4RDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsY0FBYztFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBNEIsQ0FBQyxFQUM1RDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsY0FBYztFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBNEIsQ0FBQyxDQUM3RDtFQUVELE1BQU1DLFdBQVcsR0FBRyxDQUNsQjtFQUFFRixFQUFBQSxLQUFLLEVBQUUsWUFBWTtFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBMEIsQ0FBQyxFQUN4RDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsV0FBVztFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBeUIsQ0FBQyxFQUN0RDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsZUFBZTtFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBNkIsQ0FBQyxFQUM5RDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsZUFBZTtFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBNkIsQ0FBQyxDQUMvRDtFQUVELE1BQU1FLFFBQU0sR0FBRztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0VBRUQsTUFBTUMsS0FBRyxHQUFHLElBQUlDLGlCQUFTLEVBQUU7RUFFM0IsU0FBU0Msb0JBQW9CQSxDQUFDQyxLQUFLLEVBQUU7SUFDbkMsSUFBSSxDQUFDQSxLQUFLLEVBQUU7RUFDVixJQUFBLE9BQU8sRUFBRTtFQUNYLEVBQUE7RUFFQSxFQUFBLE1BQU1DLElBQUksR0FBRyxJQUFJQyxJQUFJLENBQUNGLEtBQUssQ0FBQztJQUU1QixJQUFJRyxNQUFNLENBQUNDLEtBQUssQ0FBQ0gsSUFBSSxDQUFDSSxPQUFPLEVBQUUsQ0FBQyxFQUFFO0VBQ2hDLElBQUEsT0FBTyxFQUFFO0VBQ1gsRUFBQTtFQUVBLEVBQUEsT0FBTyxJQUFJQyxJQUFJLENBQUNDLGNBQWMsQ0FBQyxPQUFPLEVB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0VBRUQsU0FBUzRJLFNBQU9BLENBQUM1RixJQUFJLEVBQUU7RUFDckIsRUFBQSxPQUFPQSxJQUFJLENBQ1I2RixPQUFPLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQ3RDQSxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUN0QkEsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FDM0JBLE9BQU8sQ0FBQyxJQUFJLEVBQUdDLENBQUMsSUFBS0EsQ0FBQyxDQUFDQyxXQUFXLEVBQUUsQ0FBQztFQUMxQztFQUVBLFNBQVNDLFlBQVVBLENBQUM1SSxLQUFLLEVBQUU7SUFDekIsT0FBT3FCLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUN3SCxTQUFTLENBQUM3SSxLQUFLLENBQUMsQ0FBQztFQUMxQztFQUVBLFNBQVM4SSxjQUFZQSxDQUFDQyxNQUFNLEVBQUU7RUFDNUIsRUFBQSxJQUFJMUcsS0FBSyxDQUFDQyxPQUFPLENBQUN5RyxNQUFNLENBQUMsRUFBRTtFQUN6QixJQUFBLE9BQU8sRUFBRTtFQUNYLEVBQUE7RUFFQSxFQUFBLElBQUlBLE1BQU0sSUFBSSxPQUFPQSxNQUFNLEtBQUssUUFBUSxFQUFFO0VBQ3hDLElBQUEsT0FBT0MsTUFBTSxDQUFDQyxXQUFXLENBQ3ZCRCxNQUFNLENBQUNFLElBQUksQ0FBQ0gsTUFBTSxDQUFDLENBQ2hCMUYsR0FBRyxDQUFFMEMsR0FBRyxJQUFLO0VBQ1osTUFBQSxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDb0QsUUFBUSxDQUFDcEQsR0FBRyxDQUFDLEVBQUU7VUFDNUUsT0FBTyxDQUFDQSxHQUFHLEVBQUVnRCxNQUFNLENBQUNoRCxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7RUFDbkMsTUFBQTtRQUVBLE9BQU8sQ0FBQ0EsR0FBRyxFQUFFK0MsY0FBWSxDQUFDQyxNQUFNLENBQUNoRCxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3pDLElBQUEsQ0FBQyxDQUNMLENBQUM7RUFDSCxFQUFBO0VBRUEsRUFBQSxJQUFJLE9BQU9nRCxNQUFNLEtBQUssU0FBUyxFQUFFO0VBQy9CLElBQUEsT0FBTyxLQUFLO0VBQ2QsRUFBQTtFQUVBLEVBQUEsSUFBSSxPQUFPQSxNQUFNLEtBQUssUUFBUSxFQUFFO0VBQzlCLElBQUEsT0FBTyxDQUFDO0VBQ1YsRUFBQTtFQUVBLEVBQUEsT0FBTyxFQUFFO0VBQ1g7RUFFQSxTQUFTSyxtQkFBaUJBLENBQUNwSixLQUFLLEVBQUU7RUFDaEMsRUFBQSxJQUFJcUMsS0FBSyxDQUFDQyxPQUFPLENBQUN0QyxLQUFLLENBQUMsRUFBRTtNQUN4QixPQUFPQSxLQUFLLENBQUNxRCxHQUFHLENBQUV5QyxJQUFJLElBQUtzRCxtQkFBaUIsQ0FBQ3RELElBQUksQ0FBQyxDQUFDO0VBQ3JELEVBQUE7RUFFQSxFQUFBLElBQUk5RixLQUFLLElBQUksT0FBT0EsS0FBSyxLQUFLLFFBQVEsRUFBRTtFQUN0QyxJQUFBLE9BQU9nSixNQUFNLENBQUNFLElBQUksQ0FBQ2xKLEtBQUssQ0FBQyxDQUN0QnFKLElBQUksRUFBRSxDQUNOL0YsTUFBTSxDQUFFeUMsR0FBRyxJQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDb0QsUUFBUSxDQUFDcEQsR0FBRyxDQUFDLENBQUMsQ0FDdEV1RCxNQUFNLENBQUMsQ0FBQ0MsV0FBVyxFQUFFeEQsR0FBRyxLQUFLO1FBQzVCd0QsV0FBVyxDQUFDeEQsR0FBRyxDQUFDLEdBQUdxRCxtQkFBaUIsQ0FBQ3BKLEtBQUssQ0FBQytGLEdBQUcsQ0FBQyxDQUFDO0VBQ2hELE1BQUEsT0FBT3dELFdBQVc7TUFDcEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQztFQUNWLEVBQUE7RUFFQSxFQUFBLE9BQU92SixLQUFLO0VBQ2Q7RUFFQSxTQUFTd0osb0JBQWtCQSxDQUFDeEosS0FBSyxFQUFFO0VBQ2pDLEVBQUEsSUFBSXFDLEtBQUssQ0FBQ0MsT0FBTyxDQUFDdEMsS0FBSyxDQUFDLEVBQUU7TUFDeEIsT0FBT0EsS0FBSyxDQUFDeUosSUFBSSxDQUFFM0QsSUFBSSxJQUFLMEQsb0JBQWtCLENBQUMxRCxJQUFJLENBQUMsQ0FBQztFQUN2RCxFQUFBO0VBRUEsRUFBQSxJQUFJOUYsS0FBSyxJQUFJLE9BQU9BLEtBQUssS0FBSyxRQUFRLEVBQUU7TUFDdEMsT0FBT2dKLE1BQU0sQ0FBQ1UsT0FBTyxDQUFDMUosS0FBSyxDQUFDLENBQ3pCc0QsTUFBTSxDQUFDLENBQUMsQ0FBQ3lDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUNvRCxRQUFRLENBQUNwRCxHQUFHLENBQUMsQ0FBQyxDQUM1RjBELElBQUksQ0FBQyxDQUFDLEdBQUdFLFdBQVcsQ0FBQyxLQUFLSCxvQkFBa0IsQ0FBQ0csV0FBVyxDQUFDLENBQUM7RUFDL0QsRUFBQTtFQUVBLEVBQUEsSUFBSSxPQUFPM0osS0FBSyxLQUFLLFFBQVEsRUFBRTtNQUM3QixPQUFPQSxLQUFLLENBQUNlLElBQUksRUFBRSxDQUFDQyxNQUFNLEdBQUcsQ0FBQztFQUNoQyxFQUFBO0VBRUEsRUFBQSxJQUFJLE9BQU9oQixLQUFLLEtBQUssUUFBUSxFQUFFO01BQzdCLE9BQU9BLEtBQUssS0FBSyxDQUFDO0VBQ3BCLEVBQUE7RUFFQSxFQUFBLElBQUksT0FBT0EsS0FBSyxLQUFLLFNBQVMsRUFBRTtFQUM5QixJQUFBLE9BQU9BLEtBQUs7RUFDZCxFQUFBO0lBRUEsT0FBT0EsS0FBSyxJQUFJLElBQUk7RUFDdEI7RUFFQSxTQUFTNEosY0FBY0EsQ0FBQ0MsUUFBUSxFQUFFbkgsTUFBTSxFQUFFO0VBQ3hDLEVBQUEsTUFBTW9ILFlBQVksR0FBRyxJQUFJQyxlQUFlLEVBQUU7RUFFMUNmLEVBQUFBLE1BQU0sQ0FBQ1UsT0FBTyxDQUFDaEgsTUFBTSxDQUFDLENBQUNzSCxPQUFPLENBQUMsQ0FBQyxDQUFDakUsR0FBRyxFQUFFL0YsS0FBSyxDQUFDLEtBQUs7TUFDL0MsSUFBSUEsS0FBSyxLQUFLLElBQUksSUFBSUEsS0FBSyxLQUFLaUssU0FBUyxJQUFJakssS0FBSyxLQUFLLEVBQUUsRUFBRTtRQUN6RDhKLFlBQVksQ0FBQ0ksR0FBRyxDQUFDbkUsR0FBRyxFQUFFakYsTUFBTSxDQUFDZCxLQUFLLENBQUMsQ0FBQztFQUN0QyxJQUFBO0VBQ0YsRUFBQSxDQUFDLENBQUM7RUFFRixFQUFBLE1BQU1tSyxXQUFXLEdBQUdMLFlBQVksQ0FBQ00sUUFBUSxFQUFFO0lBQzNDLE9BQU8sQ0FBQSxFQUFHUCxRQUFRLENBQUEsRUFBR00sV0FBVyxHQUFHLElBQUlBLFdBQVcsQ0FBQSxDQUFFLEdBQUcsRUFBRSxDQUFBLENBQUU7RUFDN0Q7RUFFQSxTQUFTRSxvQkFBb0JBLENBQUNySyxLQUFLLEVBQUU7SUFDbkMsT0FBT2MsTUFBTSxDQUFDZCxLQUFLLElBQUksRUFBRSxDQUFDLENBQ3ZCc0ssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNWakgsR0FBRyxDQUFFa0gsS0FBSyxJQUFLQSxLQUFLLENBQUN4SixJQUFJLEVBQUUsQ0FBQyxDQUM1QnVDLE1BQU0sQ0FBQ2tILE9BQU8sQ0FBQztFQUNwQjtFQUVBLFNBQVNDLGlCQUFlQSxDQUFDQyxZQUFZLEVBQUVDLFlBQVksRUFBRTtFQUNuRCxFQUFBLElBQUksT0FBT0EsWUFBWSxLQUFLLFFBQVEsRUFBRTtNQUNwQyxJQUFJRCxZQUFZLEtBQUssRUFBRSxFQUFFO0VBQ3ZCLE1BQUEsT0FBTyxDQUFDO0VBQ1YsSUFBQTtFQUNBLElBQUEsTUFBTUUsTUFBTSxHQUFHekssTUFBTSxDQUFDdUssWUFBWSxDQUFDO01BQ25DLE9BQU92SyxNQUFNLENBQUNDLEtBQUssQ0FBQ3dLLE1BQU0sQ0FBQyxHQUFHRCxZQUFZLEdBQUdDLE1BQU07RUFDckQsRUFBQTtFQUNBLEVBQUEsT0FBT0YsWUFBWTtFQUNyQjtFQUVBLFNBQVNHLHNCQUFzQkEsQ0FBQy9FLElBQUksRUFBRTtFQUNwQyxFQUFBLElBQUksT0FBT0EsSUFBSSxLQUFLLFFBQVEsRUFBRTtFQUM1QixJQUFBLE9BQU9BLElBQUk7RUFDYixFQUFBO0VBRUEsRUFBQSxJQUFJQSxJQUFJLElBQUksT0FBT0EsSUFBSSxLQUFLLFFBQVEsRUFBRTtFQUNwQyxJQUFBLE9BQU9oRixNQUFNLENBQUNnRixJQUFJLENBQUNoRSxJQUFJLElBQUksRUFBRSxDQUFDO0VBQ2hDLEVBQUE7RUFFQSxFQUFBLE9BQU8sRUFBRTtFQUNYO0VBRUEsU0FBU2dKLG1CQUFtQkEsQ0FBQzlLLEtBQUssRUFBRStLLFFBQVEsR0FBRyxnQkFBZ0IsRUFBRTtJQUMvRCxNQUFNQyxHQUFHLEdBQUdsSyxNQUFNLENBQUNkLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQ2UsSUFBSSxFQUFFO0lBRXRDLElBQUksQ0FBQ2lLLEdBQUcsRUFBRTtFQUNSLElBQUEsT0FBT0QsUUFBUTtFQUNqQixFQUFBO0VBRUEsRUFBQSxNQUFNbEssVUFBVSxHQUFHbUssR0FBRyxDQUFDVixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEQsRUFBQSxNQUFNVyxLQUFLLEdBQUdwSyxVQUFVLENBQUN5SixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUNoSCxNQUFNLENBQUNrSCxPQUFPLENBQUM7SUFDbkQsT0FBT1MsS0FBSyxDQUFDQSxLQUFLLENBQUNqSyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUkrSixRQUFRO0VBQzVDO0VBRUEsU0FBU0csdUJBQXVCQSxDQUFDcEYsSUFBSSxFQUFFcUYsU0FBUyxFQUFFO0VBQ2hELEVBQUEsSUFBSSxPQUFPckYsSUFBSSxLQUFLLFFBQVEsRUFBRTtFQUM1QixJQUFBLE9BQU9xRixTQUFTO0VBQ2xCLEVBQUE7RUFFQSxFQUFBLElBQUlyRixJQUFJLElBQUksT0FBT0EsSUFBSSxLQUFLLFFBQVEsRUFBRTtNQUNwQyxPQUFPO0VBQ0wsTUFBQSxHQUFHQSxJQUFJO0VBQ1BoRSxNQUFBQSxJQUFJLEVBQUVxSjtPQUNQO0VBQ0gsRUFBQTtJQUVBLE9BQU87RUFBRXJKLElBQUFBLElBQUksRUFBRXFKO0tBQVc7RUFDNUI7RUFFQSxTQUFTQyx3QkFBc0JBLENBQUNwTCxLQUFLLEVBQUU7SUFDckMsSUFBSSxDQUFDQSxLQUFLLEVBQUU7RUFDVixJQUFBLE9BQU8sRUFBRTtFQUNYLEVBQUE7SUFFQSxNQUFNYSxVQUFVLEdBQUdDLE1BQU0sQ0FBQ2QsS0FBSyxDQUFDLENBQUNlLElBQUksRUFBRTtJQUV2QyxJQUFJLENBQUNGLFVBQVUsRUFBRTtFQUNmLElBQUEsT0FBTyxFQUFFO0VBQ1gsRUFBQTtFQUVBLEVBQUEsSUFBSSxlQUFlLENBQUN3SyxJQUFJLENBQUN4SyxVQUFVLENBQUMsRUFBRTtFQUNwQyxJQUFBLE9BQU9BLFVBQVU7RUFDbkIsRUFBQTtFQUVBLEVBQUEsSUFBSUEsVUFBVSxDQUFDeUssVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO01BQy9CLE9BQU8sQ0FBQSxNQUFBLEVBQVN6SyxVQUFVLENBQUEsQ0FBRTtFQUM5QixFQUFBO0VBRUEsRUFBQSxJQUFJQSxVQUFVLENBQUN5SyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUl6SyxVQUFVLENBQUN5SyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtNQUNqRixPQUFPLENBQUEscUJBQUEsRUFBd0J6SyxVQUFVLENBQUEsQ0FBRTtFQUM3QyxFQUFBO0VBRUEsRUFBQSxPQUFPQSxVQUFVO0VBQ25CO0VBRUEsU0FBUzBLLGNBQVlBLENBQUN2TCxLQUFLLEVBQUV3TCxJQUFJLEVBQUVMLFNBQVMsRUFBRTtFQUM1QyxFQUFBLElBQUksQ0FBQ0ssSUFBSSxDQUFDeEssTUFBTSxFQUFFO0VBQ2hCLElBQUEsT0FBT21LLFNBQVM7RUFDbEIsRUFBQTtFQUNBLEVBQUEsTUFBTSxDQUFDTSxPQUFPLEVBQUUsR0FBR0MsSUFBSSxDQUFDLEdBQUdGLElBQUk7RUFDL0IsRUFBQSxNQUFNRyxLQUFLLEdBQUd0SixLQUFLLENBQUNDLE9BQU8sQ0FBQ3RDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBR0EsS0FBSyxDQUFDLEdBQUc7TUFBRSxHQUFHQTtLQUFPO0VBQzlEMkwsRUFBQUEsS0FBSyxDQUFDRixPQUFPLENBQUMsR0FBR0YsY0FBWSxDQUFDdkwsS0FBSyxHQUFHeUwsT0FBTyxDQUFDLEVBQUVDLElBQUksRUFBRVAsU0FBUyxDQUFDO0VBQ2hFLEVBQUEsT0FBT1EsS0FBSztFQUNkO0VBRUEsU0FBU0MsY0FBWUEsQ0FBQzVMLEtBQUssRUFBRXdMLElBQUksRUFBRTtFQUNqQyxFQUFBLElBQUlBLElBQUksQ0FBQ3hLLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDckIsT0FBT3FCLEtBQUssQ0FBQ0MsT0FBTyxDQUFDdEMsS0FBSyxDQUFDLEdBQUdBLEtBQUssQ0FBQ3NELE1BQU0sQ0FBQyxDQUFDdUksQ0FBQyxFQUFFQyxLQUFLLEtBQUtBLEtBQUssS0FBS04sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUd4TCxLQUFLO0VBQ3JGLEVBQUE7RUFDQSxFQUFBLE1BQU0sQ0FBQ3lMLE9BQU8sRUFBRSxHQUFHQyxJQUFJLENBQUMsR0FBR0YsSUFBSTtFQUMvQixFQUFBLE1BQU1HLEtBQUssR0FBR3RKLEtBQUssQ0FBQ0MsT0FBTyxDQUFDdEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHQSxLQUFLLENBQUMsR0FBRztNQUFFLEdBQUdBO0tBQU87RUFDOUQyTCxFQUFBQSxLQUFLLENBQUNGLE9BQU8sQ0FBQyxHQUFHRyxjQUFZLENBQUM1TCxLQUFLLEdBQUd5TCxPQUFPLENBQUMsRUFBRUMsSUFBSSxDQUFDO0VBQ3JELEVBQUEsT0FBT0MsS0FBSztFQUNkO0VBRUEsU0FBU0ksY0FBWUEsQ0FBQy9MLEtBQUssRUFBRXdMLElBQUksRUFBRVEsUUFBUSxFQUFFO0VBQzNDLEVBQUEsSUFBSSxDQUFDUixJQUFJLENBQUN4SyxNQUFNLEVBQUU7RUFDaEIsSUFBQSxPQUFPLENBQUMsSUFBSXFCLEtBQUssQ0FBQ0MsT0FBTyxDQUFDdEMsS0FBSyxDQUFDLEdBQUdBLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRWdNLFFBQVEsQ0FBQztFQUMzRCxFQUFBO0VBQ0EsRUFBQSxNQUFNLENBQUNQLE9BQU8sRUFBRSxHQUFHQyxJQUFJLENBQUMsR0FBR0YsSUFBSTtFQUMvQixFQUFBLE1BQU1HLEtBQUssR0FBR3RKLEtBQUssQ0FBQ0MsT0FBTyxDQUFDdEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHQSxLQUFLLENBQUMsR0FBRztNQUFFLEdBQUdBO0tBQU87RUFDOUQyTCxFQUFBQSxLQUFLLENBQUNGLE9BQU8sQ0FBQyxHQUFHTSxjQUFZLENBQUMvTCxLQUFLLEdBQUd5TCxPQUFPLENBQUMsRUFBRUMsSUFBSSxFQUFFTSxRQUFRLENBQUM7RUFDL0QsRUFBQSxPQUFPTCxLQUFLO0VBQ2Q7RUFFQSxTQUFTTSxZQUFVQSxDQUFDak0sS0FBSyxFQUFFd0wsSUFBSSxFQUFFVSxNQUFNLEVBQUU7RUFDdkMsRUFBQSxJQUFJVixJQUFJLENBQUN4SyxNQUFNLEtBQUssQ0FBQyxFQUFFO0VBQ3JCLElBQUEsSUFBSSxDQUFDcUIsS0FBSyxDQUFDQyxPQUFPLENBQUN0QyxLQUFLLENBQUMsRUFBRTtFQUN6QixNQUFBLE9BQU9BLEtBQUs7RUFDZCxJQUFBO0VBRUEsSUFBQSxNQUFNOEwsS0FBSyxHQUFHTixJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ3JCLElBQUEsTUFBTVcsU0FBUyxHQUFHTCxLQUFLLEdBQUdJLE1BQU07TUFFaEMsSUFBSUMsU0FBUyxHQUFHLENBQUMsSUFBSUEsU0FBUyxJQUFJbk0sS0FBSyxDQUFDZ0IsTUFBTSxFQUFFO0VBQzlDLE1BQUEsT0FBT2hCLEtBQUs7RUFDZCxJQUFBO0VBRUEsSUFBQSxNQUFNMkwsS0FBSyxHQUFHLENBQUMsR0FBRzNMLEtBQUssQ0FBQztNQUN4QixNQUFNLENBQUNvTSxLQUFLLENBQUMsR0FBR1QsS0FBSyxDQUFDVSxNQUFNLENBQUNQLEtBQUssRUFBRSxDQUFDLENBQUM7TUFDdENILEtBQUssQ0FBQ1UsTUFBTSxDQUFDRixTQUFTLEVBQUUsQ0FBQyxFQUFFQyxLQUFLLENBQUM7RUFDakMsSUFBQSxPQUFPVCxLQUFLO0VBQ2QsRUFBQTtFQUVBLEVBQUEsTUFBTSxDQUFDRixPQUFPLEVBQUUsR0FBR0MsSUFBSSxDQUFDLEdBQUdGLElBQUk7RUFDL0IsRUFBQSxNQUFNRyxLQUFLLEdBQUd0SixLQUFLLENBQUNDLE9BQU8sQ0FBQ3RDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBR0EsS0FBSyxDQUFDLEdBQUc7TUFBRSxHQUFHQTtLQUFPO0VBQzlEMkwsRUFBQUEsS0FBSyxDQUFDRixPQUFPLENBQUMsR0FBR1EsWUFBVSxDQUFDak0sS0FBSyxHQUFHeUwsT0FBTyxDQUFDLEVBQUVDLElBQUksRUFBRVEsTUFBTSxDQUFDO0VBQzNELEVBQUEsT0FBT1AsS0FBSztFQUNkO0VBRUEsU0FBU1csZUFBZUEsQ0FBQ0MsVUFBVSxFQUFFOUosTUFBTSxFQUFFO0lBQzNDLElBQUksQ0FBQ0EsTUFBTSxFQUFFO01BQ1gsT0FBTzhKLFVBQVUsQ0FBQzlNLEtBQUs7RUFDekIsRUFBQTtJQUNBLE9BQU9nRCxNQUFNLENBQUM4SixVQUFVLENBQUNDLFVBQVUsQ0FBQyxJQUFJRCxVQUFVLENBQUM5TSxLQUFLO0VBQzFEO0VBRUEsU0FBU2dOLG1CQUFtQkEsQ0FBQ0YsVUFBVSxFQUFFaEMsS0FBSyxFQUFFO0lBQzlDLE9BQU9nQyxVQUFVLEVBQUUzSixJQUFJLEtBQUssWUFBWSxJQUFJMkgsS0FBSyxLQUFLLFVBQVU7RUFDbEU7RUFFQSxTQUFTbUMsa0JBQWtCQSxDQUFDSCxVQUFVLEVBQUVoQyxLQUFLLEVBQUU7SUFDN0MsT0FBT2dDLFVBQVUsRUFBRTNKLElBQUksS0FBSyxXQUFXLElBQUkySCxLQUFLLEtBQUssWUFBWTtFQUNuRTtFQUVBLFNBQVNvQywwQkFBMEJBLENBQUNKLFVBQVUsRUFBRWhDLEtBQUssRUFBRTtJQUNyRCxPQUFPZ0MsVUFBVSxFQUFFM0osSUFBSSxLQUFLLGVBQWUsSUFBSTJILEtBQUssS0FBSyxZQUFZO0VBQ3ZFO0VBRUEsU0FBU3FDLHVCQUF1QkEsQ0FBQ0wsVUFBVSxFQUFFaEMsS0FBSyxFQUFFO0VBQ2xELEVBQUEsT0FBT2tDLG1CQUFtQixDQUFDRixVQUFVLEVBQUVoQyxLQUFLLENBQUMsSUFDeENtQyxrQkFBa0IsQ0FBQ0gsVUFBVSxFQUFFaEMsS0FBSyxDQUFDLElBQ3JDb0MsMEJBQTBCLENBQUNKLFVBQVUsRUFBRWhDLEtBQUssQ0FBQztFQUNwRDtFQUVBLFNBQVNzQyxvQkFBb0JBLENBQUNOLFVBQVUsRUFBRWhDLEtBQUssRUFBRTtFQUMvQyxFQUFBLElBQUlxQyx1QkFBdUIsQ0FBQ0wsVUFBVSxFQUFFaEMsS0FBSyxDQUFDLEVBQUU7RUFDOUMsSUFBQSxPQUFPLFlBQVk7RUFDckIsRUFBQTtJQUVBLE9BQU8vQixTQUFPLENBQUMrQixLQUFLLENBQUM7RUFDdkI7RUFFQSxlQUFldUMsV0FBV0EsQ0FBQ0MsUUFBUSxFQUFFdEwsT0FBTyxHQUFHLEVBQUUsRUFBRTtJQUNqRCxNQUFNcUksWUFBWSxHQUFHLElBQUlDLGVBQWUsQ0FBQ3RJLE9BQU8sQ0FBQ3VMLEtBQUssSUFBSSxFQUFFLENBQUM7RUFDN0QsRUFBQSxNQUFNN0MsV0FBVyxHQUFHTCxZQUFZLENBQUNNLFFBQVEsRUFBRTtFQUMzQyxFQUFBLE1BQU0xSSxRQUFRLEdBQUcsTUFBTUMsS0FBSyxDQUMxQixvQkFBb0JvTCxRQUFRLENBQUEsRUFBRzVDLFdBQVcsR0FBRyxJQUFJQSxXQUFXLENBQUEsQ0FBRSxHQUFHLEVBQUUsRUFBRSxFQUNyRTtFQUNFbkYsSUFBQUEsTUFBTSxFQUFFdkQsT0FBTyxDQUFDdUQsTUFBTSxJQUFJLEtBQUs7RUFDL0JuRCxJQUFBQSxPQUFPLEVBQUU7RUFDUG9ELE1BQUFBLE1BQU0sRUFBRSxrQkFBa0I7RUFDMUIsTUFBQSxjQUFjLEVBQUU7T0FDakI7RUFDRGpCLElBQUFBLElBQUksRUFBRXZDLE9BQU8sQ0FBQ3VDLElBQUksR0FBRzNDLElBQUksQ0FBQ3dILFNBQVMsQ0FBQ3BILE9BQU8sQ0FBQ3VDLElBQUksQ0FBQyxHQUFHaUcsU0FBUztFQUM3RHJJLElBQUFBLFdBQVcsRUFBRTtFQUNmLEdBQ0YsQ0FBQztFQUVELEVBQUEsTUFBTVIsWUFBWSxHQUFHLE1BQU1NLFFBQVEsQ0FBQ0ksSUFBSSxFQUFFO0lBQzFDLElBQUlDLE9BQU8sR0FBRyxJQUFJO0lBRWxCLElBQUk7TUFDRkEsT0FBTyxHQUFHWCxZQUFZLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRixZQUFZLENBQUMsR0FBRyxFQUFFO0VBQ3hELEVBQUEsQ0FBQyxDQUFDLE1BQU07RUFDTlcsSUFBQUEsT0FBTyxHQUFHLElBQUk7RUFDaEIsRUFBQTtFQUVBLEVBQUEsSUFBSSxDQUFDTCxRQUFRLENBQUNNLEVBQUUsSUFBSSxDQUFDRCxPQUFPLEVBQUU7TUFDNUIsTUFBTWtMLFdBQVcsR0FBRzdMLFlBQVksQ0FBQ0wsSUFBSSxFQUFFLENBQUNtTSxXQUFXLEVBQUU7RUFDckQsSUFBQSxNQUFNQyxNQUFNLEdBQUdGLFdBQVcsQ0FBQzNCLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSTJCLFdBQVcsQ0FBQzNCLFVBQVUsQ0FBQyxPQUFPLENBQUM7RUFDckYsSUFBQSxNQUFNOEIsaUJBQWlCLEdBQUcxTCxRQUFRLENBQUMyTCxVQUFVLElBQUkzTCxRQUFRLENBQUNGLEdBQUcsQ0FBQzJILFFBQVEsQ0FBQyxjQUFjLENBQUM7RUFDdEYsSUFBQSxNQUFNbUUsV0FBVyxHQUFHNUwsUUFBUSxDQUFDUSxNQUFNLEtBQUssR0FBRyxJQUFJUixRQUFRLENBQUNRLE1BQU0sS0FBSyxHQUFHLElBQUlrTCxpQkFBaUI7RUFFM0YsSUFBQSxJQUFJRSxXQUFXLEVBQUU7RUFDZixNQUFBLE1BQU0sSUFBSW5MLEtBQUssQ0FBQyx3REFBd0QsQ0FBQztFQUMzRSxJQUFBO01BRUEsSUFBSUosT0FBTyxFQUFFbkIsT0FBTyxFQUFFO0VBQ3BCLE1BQUEsTUFBTSxJQUFJdUIsS0FBSyxDQUFDSixPQUFPLENBQUNuQixPQUFPLENBQUM7RUFDbEMsSUFBQTtNQUVBLElBQUltQixPQUFPLEVBQUVFLEtBQUssRUFBRTtFQUNsQixNQUFBLE1BQU0sSUFBSUUsS0FBSyxDQUFDSixPQUFPLENBQUNFLEtBQUssQ0FBQztFQUNoQyxJQUFBO0VBRUEsSUFBQSxJQUFJa0wsTUFBTSxFQUFFO1FBQ1YsTUFBTSxJQUFJaEwsS0FBSyxDQUFDLENBQUEsb0NBQUEsRUFBdUNULFFBQVEsQ0FBQ1EsTUFBTSxJQUFJLFNBQVMsQ0FBQSxzQkFBQSxDQUF3QixDQUFDO0VBQzlHLElBQUE7TUFFQSxJQUFJUixRQUFRLENBQUNRLE1BQU0sRUFBRTtRQUNuQixNQUFNLElBQUlDLEtBQUssQ0FBQyxDQUFBLGdCQUFBLEVBQW1CVCxRQUFRLENBQUNRLE1BQU0sSUFBSSxDQUFDO0VBQ3pELElBQUE7RUFFQSxJQUFBLE1BQU0sSUFBSUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO0VBQ3BDLEVBQUE7RUFFQSxFQUFBLE9BQU9KLE9BQU87RUFDaEI7RUFFQSxlQUFld0wsa0JBQWdCQSxDQUFDQyxJQUFJLEVBQUU7RUFDcEMsRUFBQSxNQUFNQyxRQUFRLEdBQUcsSUFBSUMsUUFBUSxFQUFFO0VBQy9CRCxFQUFBQSxRQUFRLENBQUNFLE1BQU0sQ0FBQyxNQUFNLEVBQUVILElBQUksQ0FBQztFQUU3QixFQUFBLE1BQU05TCxRQUFRLEdBQUcsTUFBTUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFO0VBQ3REcUQsSUFBQUEsTUFBTSxFQUFFLE1BQU07RUFDZGhCLElBQUFBLElBQUksRUFBRXlKLFFBQVE7RUFDZDdMLElBQUFBLFdBQVcsRUFBRTtFQUNmLEdBQUMsQ0FBQztFQUVGLEVBQUEsTUFBTUcsT0FBTyxHQUFHLE1BQU1MLFFBQVEsQ0FBQ2tNLElBQUksRUFBRSxDQUFDQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztFQUV2RCxFQUFBLElBQUksQ0FBQ25NLFFBQVEsQ0FBQ00sRUFBRSxFQUFFO01BQ2hCLE1BQU0sSUFBSUcsS0FBSyxDQUFDSixPQUFPLENBQUNFLEtBQUssSUFBSSx5QkFBeUIsQ0FBQztFQUM3RCxFQUFBO0VBRUEsRUFBQSxNQUFNNkwsV0FBVyxHQUFHL0wsT0FBTyxFQUFFUCxHQUFHLElBQUlPLE9BQU8sRUFBRStELElBQUksRUFBRWlJLFdBQVcsSUFBSWhNLE9BQU8sRUFBRStELElBQUksRUFBRXRFLEdBQUc7SUFFcEYsSUFBSSxDQUFDc00sV0FBVyxFQUFFO0VBQ2hCLElBQUEsTUFBTSxJQUFJM0wsS0FBSyxDQUFDLHVDQUF1QyxDQUFDO0VBQzFELEVBQUE7RUFFQSxFQUFBLE9BQU8yTCxXQUFXO0VBQ3BCO0VBRUEsTUFBTUUsb0JBQWtCLEdBQUcsc0JBQXNCO0VBRWpELFNBQVNDLHlCQUF1QkEsR0FBRztFQUNqQyxFQUFBLE9BQU8sSUFBSUMsT0FBTyxDQUFDLENBQUNDLE9BQU8sRUFBRUMsTUFBTSxLQUFLO0VBQ3RDLElBQUEsSUFBSSxPQUFPQyxNQUFNLEtBQUssV0FBVyxFQUFFO1FBQ2pDRixPQUFPLENBQUMsRUFBRSxDQUFDO0VBQ1gsTUFBQTtFQUNGLElBQUE7TUFFQSxNQUFNRyxZQUFZLEdBQUdELE1BQU0sQ0FBQ0UsSUFBSSxDQUM5QixxQ0FBcUMsRUFDckMsNEJBQTRCLEVBQzVCLDhEQUNGLENBQUM7TUFFRCxJQUFJLENBQUNELFlBQVksRUFBRTtFQUNqQkYsTUFBQUEsTUFBTSxDQUFDLElBQUlqTSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztFQUNyRCxNQUFBO0VBQ0YsSUFBQTtNQUVBLElBQUlxTSxRQUFRLEdBQUcsS0FBSztNQUVwQixNQUFNQyxPQUFPLEdBQUdBLE1BQU07RUFDcEJKLE1BQUFBLE1BQU0sQ0FBQ0ssbUJBQW1CLENBQUMsU0FBUyxFQUFFQyxhQUFhLENBQUM7RUFDcEROLE1BQUFBLE1BQU0sQ0FBQ08sYUFBYSxDQUFDQyxZQUFZLENBQUM7TUFDcEMsQ0FBQztNQUVELE1BQU1GLGFBQWEsR0FBSUcsS0FBSyxJQUFLO0VBQy9CLE1BQUEsSUFBSUEsS0FBSyxDQUFDQyxNQUFNLEtBQUtWLE1BQU0sQ0FBQ1csUUFBUSxDQUFDRCxNQUFNLElBQUlELEtBQUssQ0FBQy9LLE1BQU0sS0FBS3VLLFlBQVksRUFBRTtFQUM1RSxRQUFBO0VBQ0YsTUFBQTtFQUVBLE1BQUEsSUFBSVEsS0FBSyxDQUFDdk0sSUFBSSxFQUFFNkMsSUFBSSxLQUFLNEksb0JBQWtCLEVBQUU7RUFDM0MsUUFBQTtFQUNGLE1BQUE7RUFFQVEsTUFBQUEsUUFBUSxHQUFHLElBQUk7RUFDZkMsTUFBQUEsT0FBTyxFQUFFO0VBQ1ROLE1BQUFBLE9BQU8sQ0FBQyxPQUFPVyxLQUFLLENBQUN2TSxJQUFJLENBQUNmLEdBQUcsS0FBSyxRQUFRLEdBQUdzTixLQUFLLENBQUN2TSxJQUFJLENBQUNmLEdBQUcsR0FBRyxFQUFFLENBQUM7TUFDbkUsQ0FBQztFQUVELElBQUEsTUFBTXFOLFlBQVksR0FBR1IsTUFBTSxDQUFDWSxXQUFXLENBQUMsTUFBTTtFQUM1QyxNQUFBLElBQUlYLFlBQVksQ0FBQ1ksTUFBTSxJQUFJLENBQUNWLFFBQVEsRUFBRTtFQUNwQ0MsUUFBQUEsT0FBTyxFQUFFO1VBQ1ROLE9BQU8sQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFBO01BQ0YsQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUVQRSxJQUFBQSxNQUFNLENBQUNjLGdCQUFnQixDQUFDLFNBQVMsRUFBRVIsYUFBYSxDQUFDO0VBQ25ELEVBQUEsQ0FBQyxDQUFDO0VBQ0o7RUFFQSxTQUFTUyxVQUFVQSxDQUFDO0lBQUUzUCxLQUFLO0lBQUVPLEtBQUs7SUFBRXdMLElBQUk7SUFBRTZELFFBQVE7RUFBRTdJLEVBQUFBO0VBQVMsQ0FBQyxFQUFFO0VBQzlELEVBQUEsTUFBTThJLElBQUksR0FBR2pOLEtBQUssQ0FBQ0MsT0FBTyxDQUFDdEMsS0FBSyxDQUFDLEdBQUdBLEtBQUssR0FBRyxDQUFDQSxLQUFLLENBQUMsQ0FBQ3NELE1BQU0sQ0FBQ2tILE9BQU8sQ0FBQztFQUNuRSxFQUFBLE1BQU0rRSxZQUFZLEdBQUdDLFlBQU0sQ0FBQyxJQUFJLENBQUM7SUFDakMsTUFBTSxDQUFDQyxTQUFTLEVBQUVDLFlBQVksQ0FBQyxHQUFHN0ksY0FBUSxDQUFDLEtBQUssQ0FBQztJQUNqRCxNQUFNLENBQUM4SSxXQUFXLEVBQUVDLGNBQWMsQ0FBQyxHQUFHL0ksY0FBUSxDQUFDLEVBQUUsQ0FBQztJQUVsRCxvQkFDRWxCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQStCLGVBQzVDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQU9DLElBQUFBLFNBQVMsRUFBQztFQUFhLEdBQUEsRUFBRXBHLEtBQWEsQ0FBQyxlQUM5Q2tHLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQWEsZUFDMUJGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0VBQXFCLEdBQUEsRUFDakN5SixJQUFJLENBQUN0TyxNQUFNLGdCQUNWMkUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBb0IsZUFDakNGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDLG9CQUFvQjtFQUFDZ0ssSUFBQUEsR0FBRyxFQUFFUCxJQUFJLENBQUMsQ0FBQyxDQUFFO0VBQUNRLElBQUFBLEdBQUcsRUFBRXJRO0VBQU0sR0FBRSxDQUFDLGVBQ2hFa0csc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBc0IsZUFDbkNGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFBUUMsSUFBQUEsU0FBUyxFQUFDLHFCQUFxQjtFQUFDVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUFDWSxJQUFBQSxPQUFPLEVBQUVBLE1BQU1xSSxNQUFNLENBQUNFLElBQUksQ0FBQ2UsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxxQkFBcUI7RUFBRSxHQUFBLEVBQUMsUUFBUyxDQUFDLGVBQ3RJM0osc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRQyxJQUFBQSxTQUFTLEVBQUMscUJBQXFCO0VBQUNULElBQUFBLElBQUksRUFBQyxRQUFRO0VBQUNvQixJQUFBQSxRQUFRLEVBQUVBLFFBQVM7RUFBQ1IsSUFBQUEsT0FBTyxFQUFFQSxNQUFNcUosUUFBUSxDQUFDN0QsSUFBSSxFQUFFbkosS0FBSyxDQUFDQyxPQUFPLENBQUN0QyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtFQUFFLEdBQUEsRUFBQyxRQUFTLENBQy9JLENBQUMsZUFDTjJGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQXVCLEVBQUVpRixtQkFBbUIsQ0FBQ3dFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBTyxDQUN2RSxDQUFDLGdCQUVOM0osc0JBQUEsQ0FBQUMsYUFBQSxjQUFLLG9CQUF1QixDQUUzQixDQUFDLGVBQ05ELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQXFCLGVBQ2xDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUE2QixlQUMxQ0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFQyxJQUFBQSxTQUFTLEVBQUMsNEJBQTRCO0VBQ3RDVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtNQUNib0IsUUFBUSxFQUFFQSxRQUFRLElBQUlpSixTQUFVO01BQ2hDekosT0FBTyxFQUFFQSxNQUFNdUosWUFBWSxDQUFDUSxPQUFPLEVBQUVDLEtBQUs7S0FBRyxFQUU1Q1AsU0FBUyxHQUFHLGNBQWMsR0FBRyxzQkFDeEIsQ0FBQyxlQUNUOUosc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFQyxJQUFBQSxTQUFTLEVBQUMsNEJBQTRCO0VBQ3RDVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtNQUNib0IsUUFBUSxFQUFFQSxRQUFRLElBQUlpSixTQUFVO01BQ2hDekosT0FBTyxFQUFFLFlBQVk7UUFDbkI0SixjQUFjLENBQUMsRUFBRSxDQUFDO1FBRWxCLElBQUk7RUFDRixRQUFBLE1BQU1LLFdBQVcsR0FBRyxNQUFNaEMseUJBQXVCLEVBQUU7VUFFbkQsSUFBSSxDQUFDZ0MsV0FBVyxFQUFFO0VBQ2hCLFVBQUE7RUFDRixRQUFBO0VBRUEsUUFBQSxJQUFJNU4sS0FBSyxDQUFDQyxPQUFPLENBQUN0QyxLQUFLLENBQUMsRUFBRTtZQUN4QnFQLFFBQVEsQ0FBQzdELElBQUksRUFBRSxDQUFDLEdBQUd4TCxLQUFLLEVBQUVpUSxXQUFXLENBQUMsQ0FBQztFQUN6QyxRQUFBLENBQUMsTUFBTTtFQUNMWixVQUFBQSxRQUFRLENBQUM3RCxJQUFJLEVBQUV5RSxXQUFXLENBQUM7RUFDN0IsUUFBQTtRQUNGLENBQUMsQ0FBQyxPQUFPaE8sS0FBSyxFQUFFO0VBQ2QyTixRQUFBQSxjQUFjLENBQUMzTixLQUFLLEVBQUVyQixPQUFPLElBQUksNENBQTRDLENBQUM7RUFDaEYsTUFBQTtFQUNGLElBQUE7RUFBRSxHQUFBLEVBQ0gsMkJBRU8sQ0FBQyxlQUNUK0Usc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtFQUNFc0ssSUFBQUEsR0FBRyxFQUFFWCxZQUFhO0VBQ2xCbkssSUFBQUEsSUFBSSxFQUFDLE1BQU07RUFDWCtLLElBQUFBLE1BQU0sRUFBQyxTQUFTO0VBQ2hCQyxJQUFBQSxRQUFRLEVBQUUvTixLQUFLLENBQUNDLE9BQU8sQ0FBQ3RDLEtBQUssQ0FBRTtFQUMvQnFRLElBQUFBLEtBQUssRUFBRTtFQUFFQyxNQUFBQSxPQUFPLEVBQUU7T0FBUztNQUMzQmpCLFFBQVEsRUFBRSxNQUFPUCxLQUFLLElBQUs7RUFDekIsTUFBQSxNQUFNeUIsS0FBSyxHQUFHbE8sS0FBSyxDQUFDbU8sSUFBSSxDQUFDMUIsS0FBSyxDQUFDMkIsTUFBTSxDQUFDRixLQUFLLElBQUksRUFBRSxDQUFDO0VBQ2xEekIsTUFBQUEsS0FBSyxDQUFDMkIsTUFBTSxDQUFDelEsS0FBSyxHQUFHLEVBQUU7RUFFdkIsTUFBQSxJQUFJLENBQUN1USxLQUFLLENBQUN2UCxNQUFNLEVBQUU7RUFDakIsUUFBQTtFQUNGLE1BQUE7UUFFQTRPLGNBQWMsQ0FBQyxFQUFFLENBQUM7UUFDbEJGLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFFbEIsSUFBSTtVQUNGLE1BQU1nQixZQUFZLEdBQUcsRUFBRTtFQUN2QixRQUFBLEtBQUssTUFBTWxELElBQUksSUFBSStDLEtBQUssRUFBRTtFQUN4QixVQUFBLE1BQU16QyxXQUFXLEdBQUcsTUFBTVAsa0JBQWdCLENBQUNDLElBQUksQ0FBQztFQUNoRGtELFVBQUFBLFlBQVksQ0FBQ0MsSUFBSSxDQUFDN0MsV0FBVyxDQUFDO0VBQ2hDLFFBQUE7RUFFQSxRQUFBLElBQUl6TCxLQUFLLENBQUNDLE9BQU8sQ0FBQ3RDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCcVAsUUFBUSxDQUFDN0QsSUFBSSxFQUFFLENBQUMsR0FBR3hMLEtBQUssRUFBRSxHQUFHMFEsWUFBWSxDQUFDLENBQUM7RUFDN0MsUUFBQSxDQUFDLE1BQU07WUFDTHJCLFFBQVEsQ0FBQzdELElBQUksRUFBRWtGLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7RUFDdkMsUUFBQTtRQUNGLENBQUMsQ0FBQyxPQUFPek8sS0FBSyxFQUFFO0VBQ2QyTixRQUFBQSxjQUFjLENBQUMzTixLQUFLLEVBQUVyQixPQUFPLElBQUkseUJBQXlCLENBQUM7RUFDN0QsTUFBQSxDQUFDLFNBQVM7VUFDUjhPLFlBQVksQ0FBQyxLQUFLLENBQUM7RUFDckIsTUFBQTtFQUNGLElBQUE7RUFBRSxHQUNILENBQ0UsQ0FBQyxFQUNMQyxXQUFXLGdCQUFHaEssc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7RUFBb0IsR0FBQSxFQUFFOEosV0FBaUIsQ0FBQyxHQUFHLElBQ3RFLENBQ0YsQ0FDRixDQUFDO0VBRVY7RUFFQSxTQUFTaUIsZ0JBQWNBLENBQUM7SUFBRXJFLFVBQVU7SUFBRWhDLEtBQUs7SUFBRXZLLEtBQUs7SUFBRXdMLElBQUk7SUFBRTZELFFBQVE7RUFBRTdJLEVBQUFBO0VBQVMsQ0FBQyxFQUFFO0VBQzlFLEVBQUEsTUFBTS9HLEtBQUssR0FBR29OLG9CQUFvQixDQUFDTixVQUFVLEVBQUVoQyxLQUFLLENBQUM7RUFFckQsRUFBQSxJQUFJbEMscUJBQW1CLENBQUNnRCxJQUFJLENBQUNkLEtBQUssQ0FBQyxFQUFFO0VBQ25DLElBQUEsb0JBQU81RSxzQkFBQSxDQUFBQyxhQUFBLENBQUN3SixVQUFVLEVBQUE7RUFBQzNQLE1BQUFBLEtBQUssRUFBRUEsS0FBTTtFQUFDTyxNQUFBQSxLQUFLLEVBQUVBLEtBQU07RUFBQ3dMLE1BQUFBLElBQUksRUFBRUEsSUFBSztFQUFDNkQsTUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQUM3SSxNQUFBQSxRQUFRLEVBQUVBO0VBQVMsS0FBRSxDQUFDO0VBQ3ZHLEVBQUE7RUFFQSxFQUFBLElBQUk4QixxQkFBcUIsQ0FBQytDLElBQUksQ0FBQ2QsS0FBSyxDQUFDLEVBQUU7RUFDckMsSUFBQSxNQUFNc0csZUFBZSxHQUFHakUsdUJBQXVCLENBQUNMLFVBQVUsRUFBRWhDLEtBQUssQ0FBQztNQUVsRSxvQkFDRTVFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsTUFBQUEsU0FBUyxFQUFDO09BQWtDLGVBQy9DRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQU9DLE1BQUFBLFNBQVMsRUFBQztFQUFhLEtBQUEsRUFBRXBHLEtBQWEsQ0FBQyxlQUM5Q2tHLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsTUFBQUEsU0FBUyxFQUFDO0VBQWMsS0FBQSxlQUMzQkYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQU9pTCxlQUFlLEdBQUcsaUJBQWlCLEdBQUk3USxLQUFLLEdBQUcsUUFBUSxHQUFHLFVBQWtCLENBQUMsZUFDcEYyRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQU9SLE1BQUFBLElBQUksRUFBQyxVQUFVO0VBQUMwTCxNQUFBQSxPQUFPLEVBQUV0RyxPQUFPLENBQUN4SyxLQUFLLENBQUU7RUFBQ3dHLE1BQUFBLFFBQVEsRUFBRUEsUUFBUztRQUFDNkksUUFBUSxFQUFHUCxLQUFLLElBQUtPLFFBQVEsQ0FBQzdELElBQUksRUFBRXNELEtBQUssQ0FBQzJCLE1BQU0sQ0FBQ0ssT0FBTztPQUFJLENBQzdILENBQ0YsQ0FBQztFQUVWLEVBQUE7SUFFQSxNQUFNakwsU0FBUyxHQUFHMEMsMEJBQXdCLENBQUM4QyxJQUFJLENBQUNkLEtBQUssQ0FBQyxHQUFHLCtCQUErQixHQUFHLGFBQWE7SUFFeEcsb0JBQ0U1RSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBRUE7S0FBVSxlQUN4QkYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtFQUFPQyxJQUFBQSxTQUFTLEVBQUM7RUFBYSxHQUFBLEVBQzNCcEcsS0FBSyxFQUNMOEssS0FBSyxLQUFLLFdBQVcsSUFBSSxDQUFDakMscUJBQXFCLENBQUMrQyxJQUFJLENBQUNkLEtBQUssQ0FBQyxnQkFBRzVFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTUMsSUFBQUEsU0FBUyxFQUFDO0VBQXVCLEdBQUEsRUFBQyxHQUFPLENBQUMsR0FBRyxJQUM3RyxDQUFDLEVBQ1B1Qyx5QkFBdUIsQ0FBQ2lELElBQUksQ0FBQ2QsS0FBSyxDQUFDLGdCQUNsQzVFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxVQUFBLEVBQUE7RUFDRUMsSUFBQUEsU0FBUyxFQUFDLGdCQUFnQjtNQUMxQjdGLEtBQUssRUFBRUEsS0FBSyxJQUFJLEVBQUc7RUFDbkJ3RyxJQUFBQSxRQUFRLEVBQUVBLFFBQVM7RUFDbkI2SSxJQUFBQSxRQUFRLEVBQUdQLEtBQUssSUFBS08sUUFBUSxDQUFDN0QsSUFBSSxFQUFFZixpQkFBZSxDQUFDcUUsS0FBSyxDQUFDMkIsTUFBTSxDQUFDelEsS0FBSyxFQUFFQSxLQUFLLENBQUM7RUFBRSxHQUNqRixDQUFDLGdCQUVGMkYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtFQUNFQyxJQUFBQSxTQUFTLEVBQUMsYUFBYTtNQUN2QlQsSUFBSSxFQUFFLE9BQU9wRixLQUFLLEtBQUssUUFBUSxHQUFHLFFBQVEsR0FBRyxNQUFPO01BQ3BEQSxLQUFLLEVBQUVBLEtBQUssSUFBSSxFQUFHO0VBQ25Cd0csSUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQ25CNkksSUFBQUEsUUFBUSxFQUFHUCxLQUFLLElBQUtPLFFBQVEsQ0FBQzdELElBQUksRUFBRWYsaUJBQWUsQ0FBQ3FFLEtBQUssQ0FBQzJCLE1BQU0sQ0FBQ3pRLEtBQUssRUFBRUEsS0FBSyxDQUFDO0VBQUUsR0FDakYsQ0FFQSxDQUFDO0VBRVY7RUFFQSxTQUFTK1EsWUFBVUEsQ0FBQztJQUFFeEcsS0FBSztJQUFFdkssS0FBSztJQUFFd0wsSUFBSTtJQUFFNkQsUUFBUTtJQUFFMkIsU0FBUztJQUFFQyxZQUFZO0lBQUVDLFVBQVU7RUFBRTFLLEVBQUFBO0VBQVMsQ0FBQyxFQUFFO0VBQ25HLEVBQUEsTUFBTS9HLEtBQUssR0FBRytJLFNBQU8sQ0FBQytCLEtBQUssQ0FBQztJQUM1QixNQUFNckcsS0FBSyxHQUFHN0IsS0FBSyxDQUFDQyxPQUFPLENBQUN0QyxLQUFLLENBQUMsR0FBR0EsS0FBSyxHQUFHLEVBQUU7RUFDL0MsRUFBQSxNQUFNbVIsWUFBWSxHQUFHOUkscUJBQW1CLENBQUNnRCxJQUFJLENBQUNkLEtBQUssQ0FBQztJQUNwRCxNQUFNLENBQUM2RyxTQUFTLEVBQUVDLFlBQVksQ0FBQyxHQUFHeEssY0FBUSxDQUFDLElBQUksQ0FBQztJQUNoRCxNQUFNLENBQUN5SyxhQUFhLEVBQUVDLGdCQUFnQixDQUFDLEdBQUcxSyxjQUFRLENBQUMsSUFBSSxDQUFDO0lBQ3hELE1BQU0sQ0FBQzJLLGNBQWMsRUFBRUMsaUJBQWlCLENBQUMsR0FBRzVLLGNBQVEsQ0FBQyxJQUFJLENBQUM7SUFDMUQsTUFBTSxDQUFDOEksV0FBVyxFQUFFQyxjQUFjLENBQUMsR0FBRy9JLGNBQVEsQ0FBQyxFQUFFLENBQUM7RUFDbEQsRUFBQSxNQUFNNkssYUFBYSxHQUFHbEMsWUFBTSxDQUFDLEVBQUUsQ0FBQztJQUVoQyxvQkFDRTdKLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQStCLGVBQzVDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQU9DLElBQUFBLFNBQVMsRUFBQztFQUFhLEdBQUEsRUFBRXBHLEtBQWEsQ0FBQyxlQUM5Q2tHLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQWtCLGVBQy9CRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztFQUF3QixHQUFBLGVBQ3JDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBLElBQUEsZUFDRUQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7RUFBeUIsR0FBQSxFQUFFcEcsS0FBVyxDQUFDLGVBQ3REa0csc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBeUIsRUFBRTNCLEtBQUssQ0FBQ2xELE1BQU0sRUFBQyxVQUFhLENBQ2pFLENBQ0YsQ0FBQyxFQUNMa0QsS0FBSyxDQUFDYixHQUFHLENBQUMsQ0FBQ3lDLElBQUksRUFBRWdHLEtBQUssa0JBQ3JCbkcsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFNBQUEsRUFBQTtFQUNFRyxJQUFBQSxHQUFHLEVBQUUsQ0FBQSxFQUFHd0UsS0FBSyxDQUFBLENBQUEsRUFBSXVCLEtBQUssQ0FBQSxDQUFHO01BQ3pCakcsU0FBUyxFQUFFLHlCQUF5QnlMLGFBQWEsS0FBS3hGLEtBQUssR0FBRyxvQ0FBb0MsR0FBRyxFQUFFLENBQUEsQ0FBRztNQUMxR3lDLElBQUksRUFBRXpDLEtBQUssS0FBSyxDQUFFO01BQ2xCNkYsVUFBVSxFQUFHN0MsS0FBSyxJQUFLO0VBQ3JCLE1BQUEsSUFBSXRJLFFBQVEsSUFBSTRLLFNBQVMsS0FBSyxJQUFJLEVBQUU7RUFDbEMsUUFBQTtFQUNGLE1BQUE7UUFFQXRDLEtBQUssQ0FBQzhDLGNBQWMsRUFBRTtRQUN0QixJQUFJTixhQUFhLEtBQUt4RixLQUFLLEVBQUU7VUFDM0J5RixnQkFBZ0IsQ0FBQ3pGLEtBQUssQ0FBQztFQUN6QixNQUFBO01BQ0YsQ0FBRTtNQUNGK0YsTUFBTSxFQUFHL0MsS0FBSyxJQUFLO0VBQ2pCLE1BQUEsSUFBSXRJLFFBQVEsSUFBSTRLLFNBQVMsS0FBSyxJQUFJLEVBQUU7RUFDbEMsUUFBQTtFQUNGLE1BQUE7UUFFQXRDLEtBQUssQ0FBQzhDLGNBQWMsRUFBRTtFQUN0QixNQUFBLE1BQU0xRixNQUFNLEdBQUdKLEtBQUssR0FBR3NGLFNBQVM7UUFDaEMsSUFBSWxGLE1BQU0sS0FBSyxDQUFDLEVBQUU7VUFDaEJnRixVQUFVLENBQUMsQ0FBQyxHQUFHMUYsSUFBSSxFQUFFNEYsU0FBUyxDQUFDLEVBQUVsRixNQUFNLENBQUM7RUFDMUMsTUFBQTtRQUNBbUYsWUFBWSxDQUFDLElBQUksQ0FBQztRQUNsQkUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO01BQ3hCLENBQUU7TUFDRk8sV0FBVyxFQUFFQSxNQUFNO1FBQ2pCLElBQUlSLGFBQWEsS0FBS3hGLEtBQUssRUFBRTtVQUMzQnlGLGdCQUFnQixDQUFDLElBQUksQ0FBQztFQUN4QixNQUFBO0VBQ0YsSUFBQTtLQUFFLGVBRUY1TCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsU0FBQSxFQUFBO0VBQVNDLElBQUFBLFNBQVMsRUFBQztLQUEyQixlQUM1Q0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBZ0MsZUFDN0NGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTUMsSUFBQUEsU0FBUyxFQUFDO0VBQTBCLEdBQUEsRUFBQyxRQUFPLENBQUMsZUFDbkRGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTUMsSUFBQUEsU0FBUyxFQUFDO0VBQXdCLEdBQUEsRUFDckNzTCxZQUFZLEdBQ1QsQ0FBQSxNQUFBLEVBQVNyRixLQUFLLEdBQUcsQ0FBQyxDQUFBLENBQUUsR0FDbkIsT0FBT2hHLElBQUksS0FBSyxRQUFRLEdBQUdBLElBQUksSUFBSSxDQUFBLEVBQUdyRyxLQUFLLENBQUEsQ0FBQSxFQUFJcU0sS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHaEcsSUFBSSxFQUFFaEUsSUFBSSxJQUFJLEdBQUdyQyxLQUFLLENBQUEsQ0FBQSxFQUFJcU0sS0FBSyxHQUFHLENBQUMsQ0FBQSxDQUNqRyxDQUNILENBQUMsZUFDTm5HLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQTJCLGVBQ3hDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VDLElBQUFBLFNBQVMsRUFBQywrQkFBK0I7RUFDekNULElBQUFBLElBQUksRUFBQyxRQUFRO0VBQ2JvQixJQUFBQSxRQUFRLEVBQUVBLFFBQVM7TUFDbkJSLE9BQU8sRUFBRzhJLEtBQUssSUFBSztRQUNsQkEsS0FBSyxDQUFDOEMsY0FBYyxFQUFFO1FBQ3RCOUMsS0FBSyxDQUFDaUQsZUFBZSxFQUFFO0VBQ3ZCZCxNQUFBQSxZQUFZLENBQUMsQ0FBQyxHQUFHekYsSUFBSSxFQUFFTSxLQUFLLENBQUMsQ0FBQztNQUNoQyxDQUFFO01BQ0YsWUFBQSxFQUFXO0VBQVEsR0FBQSxFQUNwQixjQUVPLENBQUMsZUFDVG5HLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFDRUMsSUFBQUEsU0FBUyxFQUFDLCtCQUErQjtFQUN6Q1QsSUFBQUEsSUFBSSxFQUFDLFFBQVE7TUFDYjRNLFNBQVMsRUFBRSxDQUFDeEwsUUFBUztFQUNyQkEsSUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQ25CaEIsSUFBQUEsS0FBSyxFQUFDLGlCQUFpQjtNQUN2QlEsT0FBTyxFQUFHOEksS0FBSyxJQUFLO1FBQ2xCQSxLQUFLLENBQUM4QyxjQUFjLEVBQUU7UUFDdEI5QyxLQUFLLENBQUNpRCxlQUFlLEVBQUU7TUFDekIsQ0FBRTtNQUNGRSxXQUFXLEVBQUduRCxLQUFLLElBQUs7RUFDdEIsTUFBQSxJQUFJdEksUUFBUSxFQUFFO0VBQ1osUUFBQTtFQUNGLE1BQUE7UUFFQXNJLEtBQUssQ0FBQ2lELGVBQWUsRUFBRTtFQUN2QmpELE1BQUFBLEtBQUssQ0FBQ29ELFlBQVksQ0FBQ0MsYUFBYSxHQUFHLE1BQU07UUFDekNyRCxLQUFLLENBQUNvRCxZQUFZLENBQUNFLE9BQU8sQ0FBQyxZQUFZLEVBQUV0UixNQUFNLENBQUNnTCxLQUFLLENBQUMsQ0FBQztRQUN2RHVGLFlBQVksQ0FBQ3ZGLEtBQUssQ0FBQztRQUNuQnlGLGdCQUFnQixDQUFDekYsS0FBSyxDQUFDO01BQ3pCLENBQUU7TUFDRnVHLFNBQVMsRUFBRUEsTUFBTTtRQUNmaEIsWUFBWSxDQUFDLElBQUksQ0FBQztRQUNsQkUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO0VBQ3hCLElBQUE7RUFBRSxHQUFBLEVBQ0gsY0FFTyxDQUNMLENBQ0UsQ0FBQyxlQUNWNUwsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBd0IsZUFDckNGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQWtCLGVBQy9CRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztFQUErQixHQUFBLEVBQzNDc0wsWUFBWSxHQUFHLElBQUksZ0JBQUd4TCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQU9DLElBQUFBLFNBQVMsRUFBQztLQUFhLEVBQUVwRyxLQUFLLEtBQUssTUFBTSxHQUFHLE1BQU0sR0FBR0EsS0FBSyxDQUFDd0IsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSXhCLEtBQWEsQ0FBQyxFQUN0SDBSLFlBQVksR0FBRyxJQUFJLGdCQUNsQnhMLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxPQUFBLEVBQUE7RUFDRUMsSUFBQUEsU0FBUyxFQUFDLGFBQWE7RUFDdkI3RixJQUFBQSxLQUFLLEVBQUU2SyxzQkFBc0IsQ0FBQy9FLElBQUksQ0FBRTtFQUNwQ1UsSUFBQUEsUUFBUSxFQUFFQSxRQUFTO01BQ25CNkksUUFBUSxFQUFHUCxLQUFLLElBQUs7RUFDbkJPLE1BQUFBLFFBQVEsQ0FBQyxDQUFDLEdBQUc3RCxJQUFJLEVBQUVNLEtBQUssQ0FBQyxFQUFFWix1QkFBdUIsQ0FBQ3BGLElBQUksRUFBRWdKLEtBQUssQ0FBQzJCLE1BQU0sQ0FBQ3pRLEtBQUssQ0FBQyxDQUFDO0VBQy9FLElBQUE7S0FDRCxDQUNGLEVBQ0FtUixZQUFZLElBQUkvRix3QkFBc0IsQ0FBQ1Asc0JBQXNCLENBQUMvRSxJQUFJLENBQUMsQ0FBQyxnQkFDbkVILHNCQUFBLENBQUFDLGFBQUEsQ0FBQUQsc0JBQUEsQ0FBQXdDLFFBQUEsRUFBQSxJQUFBLGVBQ0V4QyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFxRCxlQUNsRUYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFQyxJQUFBQSxTQUFTLEVBQUMsb0JBQW9CO0VBQzlCZ0ssSUFBQUEsR0FBRyxFQUFFekUsd0JBQXNCLENBQUNQLHNCQUFzQixDQUFDL0UsSUFBSSxDQUFDLENBQUU7RUFDMURnSyxJQUFBQSxHQUFHLEVBQUUsQ0FBQSxFQUFHclEsS0FBSyxDQUFBLENBQUEsRUFBSXFNLEtBQUssR0FBRyxDQUFDLENBQUE7RUFBRyxHQUM5QixDQUNFLENBQUMsZUFDTm5HLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDLDZCQUE2QjtFQUFDd0ssSUFBQUEsS0FBSyxFQUFFO0VBQUVpQyxNQUFBQSxTQUFTLEVBQUU7RUFBTztLQUFFLGVBQ3hFM00sc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFQyxJQUFBQSxTQUFTLEVBQUMscUJBQXFCO0VBQy9CVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiWSxJQUFBQSxPQUFPLEVBQUVBLE1BQU1xSSxNQUFNLENBQUNFLElBQUksQ0FBQ25ELHdCQUFzQixDQUFDUCxzQkFBc0IsQ0FBQy9FLElBQUksQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLHFCQUFxQjtFQUFFLEdBQUEsRUFDbkgsUUFFTyxDQUFDLGVBQ1RILHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFDRUMsSUFBQUEsU0FBUyxFQUFDLHFCQUFxQjtFQUMvQlQsSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYm9CLElBQUFBLFFBQVEsRUFBRUEsUUFBUztFQUNuQlIsSUFBQUEsT0FBTyxFQUFFQSxNQUFNcUosUUFBUSxDQUFDLENBQUMsR0FBRzdELElBQUksRUFBRU0sS0FBSyxDQUFDLEVBQUVaLHVCQUF1QixDQUFDcEYsSUFBSSxFQUFFLEVBQUUsQ0FBQztLQUFFLEVBQzlFLFFBRU8sQ0FDTCxDQUNMLENBQUMsR0FDRCxJQUFJLEVBQ1BxTCxZQUFZLGdCQUNYeEwsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBNkIsZUFDMUNGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFDRUMsSUFBQUEsU0FBUyxFQUFDLDRCQUE0QjtFQUN0Q1QsSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYm9CLElBQUFBLFFBQVEsRUFBRUEsUUFBUSxJQUFJZ0wsY0FBYyxLQUFLMUYsS0FBTTtNQUMvQzlGLE9BQU8sRUFBRUEsTUFBTTBMLGFBQWEsQ0FBQzNCLE9BQU8sQ0FBQ2pFLEtBQUssQ0FBQyxFQUFFa0UsS0FBSztLQUFHLEVBRXBEd0IsY0FBYyxLQUFLMUYsS0FBSyxHQUFHLGNBQWMsR0FBRyxzQkFDdkMsQ0FBQyxlQUNUbkcsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFQyxJQUFBQSxTQUFTLEVBQUMsNEJBQTRCO0VBQ3RDVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNib0IsSUFBQUEsUUFBUSxFQUFFQSxRQUFRLElBQUlnTCxjQUFjLEtBQUsxRixLQUFNO01BQy9DOUYsT0FBTyxFQUFFLFlBQVk7UUFDbkI0SixjQUFjLENBQUMsRUFBRSxDQUFDO1FBQ2xCNkIsaUJBQWlCLENBQUMzRixLQUFLLENBQUM7UUFFeEIsSUFBSTtFQUNGLFFBQUEsTUFBTW1FLFdBQVcsR0FBRyxNQUFNaEMseUJBQXVCLEVBQUU7RUFFbkQsUUFBQSxJQUFJZ0MsV0FBVyxFQUFFO0VBQ2ZaLFVBQUFBLFFBQVEsQ0FBQyxDQUFDLEdBQUc3RCxJQUFJLEVBQUVNLEtBQUssQ0FBQyxFQUFFWix1QkFBdUIsQ0FBQ3BGLElBQUksRUFBRW1LLFdBQVcsQ0FBQyxDQUFDO0VBQ3hFLFFBQUE7UUFDRixDQUFDLENBQUMsT0FBT2hPLEtBQUssRUFBRTtFQUNkMk4sUUFBQUEsY0FBYyxDQUFDM04sS0FBSyxFQUFFckIsT0FBTyxJQUFJLDRDQUE0QyxDQUFDO0VBQ2hGLE1BQUEsQ0FBQyxTQUFTO1VBQ1I2USxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7RUFDekIsTUFBQTtFQUNGLElBQUE7S0FBRSxFQUVERCxjQUFjLEtBQUsxRixLQUFLLEdBQUcsYUFBYSxHQUFHLDJCQUN0QyxDQUFDLGVBQ1RuRyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO01BQ0VzSyxHQUFHLEVBQUdxQyxPQUFPLElBQUs7RUFDaEIsTUFBQSxJQUFJQSxPQUFPLEVBQUU7RUFDWGIsUUFBQUEsYUFBYSxDQUFDM0IsT0FBTyxDQUFDakUsS0FBSyxDQUFDLEdBQUd5RyxPQUFPO0VBQ3hDLE1BQUEsQ0FBQyxNQUFNO0VBQ0wsUUFBQSxPQUFPYixhQUFhLENBQUMzQixPQUFPLENBQUNqRSxLQUFLLENBQUM7RUFDckMsTUFBQTtNQUNGLENBQUU7RUFDRjFHLElBQUFBLElBQUksRUFBQyxNQUFNO0VBQ1grSyxJQUFBQSxNQUFNLEVBQUMsU0FBUztFQUNoQkUsSUFBQUEsS0FBSyxFQUFFO0VBQUVDLE1BQUFBLE9BQU8sRUFBRTtPQUFTO01BQzNCakIsUUFBUSxFQUFFLE1BQU9QLEtBQUssSUFBSztRQUN6QixNQUFNdEIsSUFBSSxHQUFHc0IsS0FBSyxDQUFDMkIsTUFBTSxDQUFDRixLQUFLLEdBQUcsQ0FBQyxDQUFDO0VBQ3BDekIsTUFBQUEsS0FBSyxDQUFDMkIsTUFBTSxDQUFDelEsS0FBSyxHQUFHLEVBQUU7UUFFdkIsSUFBSSxDQUFDd04sSUFBSSxFQUFFO0VBQ1QsUUFBQTtFQUNGLE1BQUE7UUFFQW9DLGNBQWMsQ0FBQyxFQUFFLENBQUM7UUFDbEI2QixpQkFBaUIsQ0FBQzNGLEtBQUssQ0FBQztRQUV4QixJQUFJO0VBQ0YsUUFBQSxNQUFNZ0MsV0FBVyxHQUFHLE1BQU1QLGtCQUFnQixDQUFDQyxJQUFJLENBQUM7RUFDaEQ2QixRQUFBQSxRQUFRLENBQUMsQ0FBQyxHQUFHN0QsSUFBSSxFQUFFTSxLQUFLLENBQUMsRUFBRVosdUJBQXVCLENBQUNwRixJQUFJLEVBQUVnSSxXQUFXLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsT0FBTzdMLEtBQUssRUFBRTtFQUNkMk4sUUFBQUEsY0FBYyxDQUFDM04sS0FBSyxFQUFFckIsT0FBTyxJQUFJLHlCQUF5QixDQUFDO0VBQzdELE1BQUEsQ0FBQyxTQUFTO1VBQ1I2USxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7RUFDekIsTUFBQTtFQUNGLElBQUE7RUFBRSxHQUNILENBQ0UsQ0FBQyxHQUNKLElBQ0QsQ0FDRixDQUNGLENBQ0UsQ0FDVixDQUFDLGVBQ0Y5TCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQVFDLElBQUFBLFNBQVMsRUFBQyx1QkFBdUI7RUFBQ1QsSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFBQ29CLElBQUFBLFFBQVEsRUFBRUEsUUFBUztFQUFDUixJQUFBQSxPQUFPLEVBQUVBLE1BQU1nTCxTQUFTLENBQUN4RixJQUFJLEVBQUU7RUFBRTFKLE1BQUFBLElBQUksRUFBRTtPQUFJO0VBQUUsR0FBQSxFQUFDLGdCQUVsSCxDQUFDLEVBQ1I2TixXQUFXLGdCQUFHaEssc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUMsb0JBQW9CO0VBQUN3SyxJQUFBQSxLQUFLLEVBQUU7RUFBRW1DLE1BQUFBLE9BQU8sRUFBRTtFQUFpQjtFQUFFLEdBQUEsRUFBRTdDLFdBQWlCLENBQUMsR0FBRyxJQUM1RyxDQUNGLENBQUM7RUFFVjtFQUVBLFNBQVM4QyxlQUFhQSxDQUFDO0lBQUVsRyxVQUFVO0lBQUVoQyxLQUFLO0lBQUV2SyxLQUFLO0lBQUV3TCxJQUFJO0lBQUU2RCxRQUFRO0lBQUUyQixTQUFTO0lBQUVDLFlBQVk7SUFBRUMsVUFBVTtFQUFFMUssRUFBQUE7RUFBUyxDQUFDLEVBQUU7RUFDbEgsRUFBQSxJQUFJbkUsS0FBSyxDQUFDQyxPQUFPLENBQUN0QyxLQUFLLENBQUMsRUFBRTtFQUN4QixJQUFBLG9CQUFPMkYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDbUwsWUFBVSxFQUFBO0VBQUN4RyxNQUFBQSxLQUFLLEVBQUVBLEtBQU07RUFBQ3ZLLE1BQUFBLEtBQUssRUFBRUEsS0FBTTtFQUFDd0wsTUFBQUEsSUFBSSxFQUFFQSxJQUFLO0VBQUM2RCxNQUFBQSxRQUFRLEVBQUVBLFFBQVM7RUFBQzJCLE1BQUFBLFNBQVMsRUFBRUEsU0FBVTtFQUFDQyxNQUFBQSxZQUFZLEVBQUVBLFlBQWE7RUFBQ0MsTUFBQUEsVUFBVSxFQUFFQSxVQUFXO0VBQUMxSyxNQUFBQSxRQUFRLEVBQUVBO0VBQVMsS0FBRSxDQUFDO0VBQ2pMLEVBQUE7RUFDQSxFQUFBLG9CQUFPYixzQkFBQSxDQUFBQyxhQUFBLENBQUNnTCxnQkFBYyxFQUFBO0VBQUNyRSxJQUFBQSxVQUFVLEVBQUVBLFVBQVc7RUFBQ2hDLElBQUFBLEtBQUssRUFBRUEsS0FBTTtFQUFDdkssSUFBQUEsS0FBSyxFQUFFQSxLQUFNO0VBQUN3TCxJQUFBQSxJQUFJLEVBQUVBLElBQUs7RUFBQzZELElBQUFBLFFBQVEsRUFBRUEsUUFBUztFQUFDN0ksSUFBQUEsUUFBUSxFQUFFQTtFQUFTLEdBQUUsQ0FBQztFQUNuSTtFQUVBLFNBQVNrTSxjQUFjQSxDQUFDbkksS0FBSyxFQUFFdkssS0FBSyxFQUFFO0lBQ3BDLElBQUl1SyxLQUFLLEtBQUssUUFBUSxFQUFFO01BQ3RCLG9CQUFPNUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNQyxNQUFBQSxTQUFTLEVBQUM7RUFBbUIsS0FBQSxFQUFFN0YsS0FBWSxDQUFDO0VBQzNELEVBQUE7SUFFQSxJQUFJLENBQUN1SyxLQUFLLEtBQUssVUFBVSxJQUFJQSxLQUFLLEtBQUssWUFBWSxJQUFJQSxLQUFLLEtBQUssV0FBVyxNQUFNdkssS0FBSyxLQUFLLEtBQUssSUFBSUEsS0FBSyxLQUFLLElBQUksQ0FBQyxFQUFFO01BQ3BILG9CQUNFMkYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtRQUFNQyxTQUFTLEVBQUUsc0JBQXNCN0YsS0FBSyxLQUFLLEtBQUssR0FBRyx5QkFBeUIsR0FBRyx3QkFBd0IsQ0FBQTtFQUFHLEtBQUEsRUFDN0dBLEtBQUssS0FBSyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQ3JCLENBQUM7RUFFWCxFQUFBO0VBRUEsRUFBQSxPQUFPQSxLQUFLO0VBQ2Q7RUFFQSxTQUFTMlMsUUFBUUEsQ0FBQztJQUNoQnBHLFVBQVU7SUFDVm5KLE9BQU87SUFDUHdQLFFBQVE7SUFDUkMsTUFBTTtJQUNOQyxPQUFPO0lBQ1BDLFFBQVE7SUFDUkMsWUFBWTtJQUNaQyxRQUFRO0lBQ1JDLFNBQVM7SUFDVEMsV0FBVztJQUNYQyxjQUFjO0lBQ2RDLHNCQUFzQjtJQUN0QkMsc0JBQXNCO0lBQ3RCQyxpQkFBaUI7RUFDakJDLEVBQUFBO0VBQ0YsQ0FBQyxFQUFFO0VBQ0QsRUFBQSxNQUFNLENBQUNDLFVBQVUsRUFBRUMsYUFBYSxDQUFDLEdBQUc3TSxjQUFRLENBQUMyRCxPQUFPLENBQUNxSSxNQUFNLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUNjLFdBQVcsRUFBRUMsY0FBYyxDQUFDLEdBQUcvTSxjQUFRLENBQUMsS0FBSyxDQUFDO0lBQ3JELE1BQU0sQ0FBQ2dOLGFBQWEsRUFBRUMsZ0JBQWdCLENBQUMsR0FBR2pOLGNBQVEsQ0FBQyxLQUFLLENBQUM7SUFDekQsTUFBTSxDQUFDa04sV0FBVyxFQUFFQyxjQUFjLENBQUMsR0FBR25OLGNBQVEsQ0FBQ2dNLE1BQU0sQ0FBQztJQUN0RCxNQUFNLENBQUNvQixVQUFVLEVBQUVDLGFBQWEsQ0FBQyxHQUFHck4sY0FBUSxDQUFDLElBQUksQ0FBQztFQUNsRCxFQUFBLE1BQU1zTixPQUFPLEdBQUczRSxZQUFNLENBQUMsSUFBSSxDQUFDO0VBRTVCdkksRUFBQUEsZUFBUyxDQUFDLE1BQU07TUFDZCtNLGNBQWMsQ0FBQ25CLE1BQU0sQ0FBQztFQUN4QixFQUFBLENBQUMsRUFBRSxDQUFDQSxNQUFNLENBQUMsQ0FBQztFQUVaNUwsRUFBQUEsZUFBUyxDQUFDLE1BQU07RUFDZCxJQUFBLE1BQU1tTixPQUFPLEdBQUcvRixNQUFNLENBQUNnRyxVQUFVLENBQUMsTUFBTTtRQUN0QyxJQUFJTixXQUFXLEtBQUtsQixNQUFNLEVBQUU7VUFDMUJFLFFBQVEsQ0FBQ2dCLFdBQVcsQ0FBQztFQUN2QixNQUFBO01BQ0YsQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUVQLElBQUEsT0FBTyxNQUFNMUYsTUFBTSxDQUFDaUcsWUFBWSxDQUFDRixPQUFPLENBQUM7SUFDM0MsQ0FBQyxFQUFFLENBQUNyQixRQUFRLEVBQUVGLE1BQU0sRUFBRWtCLFdBQVcsQ0FBQyxDQUFDO0VBRW5DOU0sRUFBQUEsZUFBUyxDQUFDLE1BQU07TUFDZCxNQUFNc04saUJBQWlCLEdBQUl6RixLQUFLLElBQUs7RUFDbkMsTUFBQSxJQUFJcUYsT0FBTyxDQUFDcEUsT0FBTyxJQUFJLENBQUNvRSxPQUFPLENBQUNwRSxPQUFPLENBQUN5RSxRQUFRLENBQUMxRixLQUFLLENBQUMyQixNQUFNLENBQUMsRUFBRTtVQUM5RHlELGFBQWEsQ0FBQyxJQUFJLENBQUM7RUFDckIsTUFBQTtNQUNGLENBQUM7RUFFRE8sSUFBQUEsUUFBUSxDQUFDdEYsZ0JBQWdCLENBQUMsV0FBVyxFQUFFb0YsaUJBQWlCLENBQUM7TUFDekQsT0FBTyxNQUFNRSxRQUFRLENBQUMvRixtQkFBbUIsQ0FBQyxXQUFXLEVBQUU2RixpQkFBaUIsQ0FBQztJQUMzRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0VBRU4sRUFBQSxNQUFNRyxnQkFBZ0IsR0FBR0MsYUFBTyxDQUM5QixNQUFNL0IsUUFBUSxDQUFDZ0MsZUFBZSxDQUFDdFIsTUFBTSxDQUFFaUgsS0FBSyxJQUFLcUksUUFBUSxDQUFDaUMsZUFBZSxDQUFDMUwsUUFBUSxDQUFDb0IsS0FBSyxDQUFDQSxLQUFLLENBQUMsQ0FBQyxFQUNoRyxDQUFDcUksUUFBUSxDQUFDZ0MsZUFBZSxFQUFFaEMsUUFBUSxDQUFDaUMsZUFBZSxDQUNyRCxDQUFDO0lBRUQsb0JBQ0VsUCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFjLGVBQzNCRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFBUWhHLFFBQWMsQ0FBQyxlQUN2QitGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQXFCLGVBQ2xDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztFQUFjLEdBQUEsZUFDM0JGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxlQUNFRCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztFQUFZLEdBQUEsRUFBQyxpQkFBb0IsQ0FBQyxlQUNqREYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLElBQUEsRUFBQTtFQUFJQyxJQUFBQSxTQUFTLEVBQUM7S0FBYSxFQUFFMEcsVUFBVSxDQUFDOU0sS0FBVSxDQUMvQyxDQUFDLGVBQ05rRyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFvQixlQUNqQ0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRQyxJQUFBQSxTQUFTLEVBQUMsZUFBZTtFQUFDVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUFDWSxJQUFBQSxPQUFPLEVBQUVpTjtFQUFTLEdBQUEsRUFBQyxvQkFBMEIsQ0FDMUYsQ0FDRixDQUFDLGVBRU50TixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFpQixFQUFFekMsT0FBTyxDQUFDcEMsTUFBTSxFQUFDLGdCQUFtQixDQUFDLGVBRXJFMkUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBb0IsZUFDakNGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQXVCLGVBQ3BDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VDLElBQUFBLFNBQVMsRUFBRSxDQUFBLCtDQUFBLEVBQWtENE4sVUFBVSxHQUFHLCtCQUErQixHQUFHLEVBQUUsQ0FBQSxDQUFHO0VBQ2pIck8sSUFBQUEsSUFBSSxFQUFDLFFBQVE7TUFDYlksT0FBTyxFQUFFQSxNQUFNME4sYUFBYSxDQUFFM0QsT0FBTyxJQUFLLENBQUNBLE9BQU87RUFBRSxHQUFBLEVBQ3JELGNBRU8sQ0FBQyxFQUNSMEQsVUFBVSxnQkFDVDlOLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxPQUFBLEVBQUE7RUFDRUMsSUFBQUEsU0FBUyxFQUFDLHNCQUFzQjtFQUNoQzdGLElBQUFBLEtBQUssRUFBRStULFdBQVk7TUFDbkIxRSxRQUFRLEVBQUdQLEtBQUssSUFBS2tGLGNBQWMsQ0FBQ2xGLEtBQUssQ0FBQzJCLE1BQU0sQ0FBQ3pRLEtBQUssQ0FBRTtFQUN4RDhVLElBQUFBLFdBQVcsRUFBQyxRQUFRO01BQ3BCQyxTQUFTLEVBQUE7RUFBQSxHQUNWLENBQUMsR0FDQSxJQUFJLGVBQ1JwUCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VDLElBQUFBLFNBQVMsRUFBRSxDQUFBLG9CQUFBLEVBQXVCOE4sV0FBVyxHQUFHLCtCQUErQixHQUFHLEVBQUUsQ0FBQSxDQUFHO0VBQ3ZGdk8sSUFBQUEsSUFBSSxFQUFDLFFBQVE7TUFDYlksT0FBTyxFQUFFQSxNQUFNO0VBQ2I0TixNQUFBQSxjQUFjLENBQUU3RCxPQUFPLElBQUssQ0FBQ0EsT0FBTyxDQUFDO1FBQ3JDK0QsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO0VBQ3pCLElBQUE7RUFBRSxHQUFBLEVBQ0gsU0FFTyxDQUFDLEVBQ1JILFdBQVcsZ0JBQ1ZoTyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQyxvQkFBb0I7RUFBQ3dLLElBQUFBLEtBQUssRUFBRTtFQUFFMkUsTUFBQUEsSUFBSSxFQUFFdkIsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFO0VBQUV3QixNQUFBQSxLQUFLLEVBQUU7RUFBTztLQUFFLGVBQ3hGdFAsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBMEIsZUFDdkNGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0VBQTJCLEdBQUEsRUFBQyxTQUFZLENBQUMsZUFDeERGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFBUUMsSUFBQUEsU0FBUyxFQUFDLDJCQUEyQjtFQUFDVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUFDWSxJQUFBQSxPQUFPLEVBQUVvTjtFQUFlLEdBQUEsRUFBQyxPQUFhLENBQy9GLENBQUMsRUFDTFIsUUFBUSxDQUFDc0MsT0FBTyxDQUFDN1IsR0FBRyxDQUFFQyxNQUFNLGlCQUMzQnFDLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7TUFBS0csR0FBRyxFQUFFekMsTUFBTSxDQUFDaUgsS0FBTTtFQUFDMUUsSUFBQUEsU0FBUyxFQUFDO0tBQTJCLGVBQzNERixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQU9DLElBQUFBLFNBQVMsRUFBQztFQUEyQixHQUFBLEVBQUV2QyxNQUFNLENBQUM3RCxLQUFhLENBQUMsZUFDbkVrRyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VDLElBQUFBLFNBQVMsRUFBQyw0QkFBNEI7TUFDdEM3RixLQUFLLEVBQUU0UyxRQUFRLENBQUN1QyxhQUFhLENBQUM3UixNQUFNLENBQUNpSCxLQUFLLENBQUMsSUFBSSxFQUFHO0VBQ2xEOEUsSUFBQUEsUUFBUSxFQUFHUCxLQUFLLElBQUtxRSxXQUFXLENBQUM3UCxNQUFNLENBQUNpSCxLQUFLLEVBQUV1RSxLQUFLLENBQUMyQixNQUFNLENBQUN6USxLQUFLO0tBQUUsZUFFbkUyRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQVE1RixJQUFBQSxLQUFLLEVBQUM7RUFBRSxHQUFBLEVBQUMsS0FBVyxDQUFDLEVBQzVCc0QsTUFBTSxDQUFDN0IsT0FBTyxDQUFDNEIsR0FBRyxDQUFFK1IsTUFBTSxpQkFDekJ6UCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQVFHLElBQUFBLEdBQUcsRUFBRXFQLE1BQU87RUFBQ3BWLElBQUFBLEtBQUssRUFBRW9WO0VBQU8sR0FBQSxFQUFFQSxNQUFlLENBQ3JELENBQ0ssQ0FDTCxDQUNOLENBQ0UsQ0FBQyxHQUNKLElBQ0QsQ0FBQyxlQUNOelAsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBb0IsZUFDakNGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQXVCLGVBQ3BDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VDLElBQUFBLFNBQVMsRUFBRSxDQUFBLCtDQUFBLEVBQWtEZ08sYUFBYSxHQUFHLCtCQUErQixHQUFHLEVBQUUsQ0FBQSxDQUFHO0VBQ3BIek8sSUFBQUEsSUFBSSxFQUFDLFFBQVE7TUFDYlksT0FBTyxFQUFFQSxNQUFNO0VBQ2I4TixNQUFBQSxnQkFBZ0IsQ0FBRS9ELE9BQU8sSUFBSyxDQUFDQSxPQUFPLENBQUM7UUFDdkM2RCxjQUFjLENBQUMsS0FBSyxDQUFDO0VBQ3ZCLElBQUE7RUFBRSxHQUFBLEVBQ0gsUUFFTyxDQUFDLEVBQ1JDLGFBQWEsZ0JBQ1psTyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFvQixlQUNqQ0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBMEIsZUFDdkNGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0VBQTJCLEdBQUEsRUFBQyxrQkFBcUIsQ0FBQyxlQUNqRUYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFQyxJQUFBQSxTQUFTLEVBQUMsMkJBQTJCO0VBQ3JDVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiWSxJQUFBQSxPQUFPLEVBQUVzTjtFQUF1QixHQUFBLEVBQ2pDLE9BRU8sQ0FDTCxDQUFDLEVBQ0xWLFFBQVEsQ0FBQ2dDLGVBQWUsQ0FBQ3ZSLEdBQUcsQ0FBRWtILEtBQUssaUJBQ2xDNUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtNQUFPRyxHQUFHLEVBQUV3RSxLQUFLLENBQUNBLEtBQU07RUFBQzFFLElBQUFBLFNBQVMsRUFBQztLQUEyQixlQUM1REYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtFQUNFUixJQUFBQSxJQUFJLEVBQUMsVUFBVTtNQUNmMEwsT0FBTyxFQUFFOEIsUUFBUSxDQUFDaUMsZUFBZSxDQUFDMUwsUUFBUSxDQUFDb0IsS0FBSyxDQUFDQSxLQUFLLENBQUU7RUFDeEQ4RSxJQUFBQSxRQUFRLEVBQUdQLEtBQUssSUFBS3VFLHNCQUFzQixDQUFDOUksS0FBSyxDQUFDQSxLQUFLLEVBQUV1RSxLQUFLLENBQUMyQixNQUFNLENBQUNLLE9BQU87S0FDOUUsQ0FBQyxlQUNGbkwsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQU8yRSxLQUFLLENBQUM5SyxLQUFZLENBQ3BCLENBQ1IsQ0FDRSxDQUFDLEdBQ0osSUFDRCxDQUNGLENBQ0YsQ0FBQyxlQUVOa0csc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFNBQUEsRUFBQTtFQUFTQyxJQUFBQSxTQUFTLEVBQUM7S0FBaUIsZUFDbENGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQXVCLGVBQ3BDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBLElBQUEsRUFBUzJHLFVBQVUsQ0FBQzlNLEtBQWMsQ0FBQyxlQUNuQ2tHLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxFQUFPa04sT0FBTyxHQUFHLFlBQVksR0FBRyxDQUFBLEVBQUcxUCxPQUFPLENBQUNwQyxNQUFNLENBQUEsUUFBQSxDQUFpQixDQUMvRCxDQUFDLGVBQ04yRSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQU9DLElBQUFBLFNBQVMsRUFBQztFQUFrQixHQUFBLGVBQ2pDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsZUFDRUQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLElBQUEsRUFBQSxJQUFBLEVBQ0c4TyxnQkFBZ0IsQ0FBQ3JSLEdBQUcsQ0FBRWdTLE1BQU0saUJBQzNCMVAsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLElBQUEsRUFBQTtNQUFJRyxHQUFHLEVBQUVzUCxNQUFNLENBQUM5SztLQUFNLGVBQ3BCNUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRUixJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUFDWSxJQUFBQSxPQUFPLEVBQUVBLE1BQU1rTixTQUFTLENBQUNtQyxNQUFNLENBQUM5SyxLQUFLO0tBQUUsRUFDMUQ4SyxNQUFNLENBQUM1VixLQUFLLEVBQ1ptVCxRQUFRLENBQUMwQyxNQUFNLEtBQUtELE1BQU0sQ0FBQzlLLEtBQUssR0FBRyxDQUFBLENBQUEsRUFBSXFJLFFBQVEsQ0FBQzJDLFNBQVMsS0FBSyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQSxDQUFFLEdBQUcsRUFDL0UsQ0FDTixDQUNMLENBQUMsZUFDRjVQLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBSyxDQUNILENBQ0MsQ0FBQyxlQUNSRCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFDR3hDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFFWixNQUFNLGlCQUNsQmtELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxJQUFBLEVBQUE7TUFBSUcsR0FBRyxFQUFFdEQsTUFBTSxDQUFDK1MsVUFBVztFQUFDeFAsSUFBQUEsT0FBTyxFQUFFQSxNQUFNZ04sWUFBWSxDQUFDdlEsTUFBTSxDQUFDRSxFQUFFO0tBQUUsRUFDaEUrUixnQkFBZ0IsQ0FBQ3JSLEdBQUcsQ0FBRWdTLE1BQU0saUJBQzNCMVAsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLElBQUEsRUFBQTtNQUFJRyxHQUFHLEVBQUUsR0FBR3RELE1BQU0sQ0FBQytTLFVBQVUsQ0FBQSxDQUFBLEVBQUlILE1BQU0sQ0FBQzlLLEtBQUssQ0FBQTtLQUFHLEVBQUVtSSxjQUFjLENBQUMyQyxNQUFNLENBQUM5SyxLQUFLLEVBQUU5SCxNQUFNLENBQUNnVCxPQUFPLENBQUNKLE1BQU0sQ0FBQzlLLEtBQUssQ0FBQyxDQUFNLENBQ2xILENBQUMsZUFDRjVFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxJQUFBLEVBQUE7RUFBSUMsSUFBQUEsU0FBUyxFQUFDO0tBQTBCLGVBQ3RDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VDLElBQUFBLFNBQVMsRUFBQyw2QkFBNkI7RUFDdkNULElBQUFBLElBQUksRUFBQyxRQUFRO01BQ2JZLE9BQU8sRUFBRzhJLEtBQUssSUFBSztRQUNsQkEsS0FBSyxDQUFDaUQsZUFBZSxFQUFFO0VBQ3ZCbUMsTUFBQUEsYUFBYSxDQUFFbkUsT0FBTyxJQUFNQSxPQUFPLEtBQUt0TixNQUFNLENBQUNFLEVBQUUsR0FBRyxJQUFJLEdBQUdGLE1BQU0sQ0FBQ0UsRUFBRyxDQUFDO0VBQ3hFLElBQUE7S0FBRSxFQUNILFFBRU8sQ0FBQyxFQUNSc1IsVUFBVSxLQUFLeFIsTUFBTSxDQUFDRSxFQUFFLGdCQUN2QmdELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFDRXNLLElBQUFBLEdBQUcsRUFBRWlFLE9BQVE7RUFDYnRPLElBQUFBLFNBQVMsRUFBQyxxQkFBcUI7RUFDL0JHLElBQUFBLE9BQU8sRUFBRzhJLEtBQUssSUFBS0EsS0FBSyxDQUFDaUQsZUFBZTtLQUFHLGVBRTVDcE0sc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRQyxJQUFBQSxTQUFTLEVBQUMsMkJBQTJCO0VBQUNULElBQUFBLElBQUksRUFBQyxRQUFRO01BQUNZLE9BQU8sRUFBRUEsTUFBTTtRQUN6RWtPLGFBQWEsQ0FBQyxJQUFJLENBQUM7RUFDbkJsQixNQUFBQSxZQUFZLENBQUN2USxNQUFNLENBQUNFLEVBQUUsQ0FBQztFQUN6QixJQUFBO0tBQUUsZUFDQWdELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTUMsSUFBQUEsU0FBUyxFQUFDO0VBQTJCLEdBQUEsRUFBQyxRQUFPLENBQUMsZUFDcERGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxFQUFNLE1BQVUsQ0FDVixDQUFDLGVBQ1RELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFBUUMsSUFBQUEsU0FBUyxFQUFDLDJCQUEyQjtFQUFDVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtNQUFDWSxPQUFPLEVBQUVBLE1BQU07UUFDekVrTyxhQUFhLENBQUMsSUFBSSxDQUFDO0VBQ25CWCxNQUFBQSxpQkFBaUIsQ0FBQzlRLE1BQU0sQ0FBQ0UsRUFBRSxDQUFDO0VBQzlCLElBQUE7S0FBRSxlQUNBZ0Qsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNQyxJQUFBQSxTQUFTLEVBQUM7RUFBMkIsR0FBQSxFQUFDLFFBQU8sQ0FBQyxlQUNwREYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQU0sV0FBZSxDQUNmLENBQUMsZUFDVEQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRQyxJQUFBQSxTQUFTLEVBQUMsNkRBQTZEO0VBQUNULElBQUFBLElBQUksRUFBQyxRQUFRO01BQUNZLE9BQU8sRUFBRUEsTUFBTTtRQUMzR2tPLGFBQWEsQ0FBQyxJQUFJLENBQUM7RUFDbkJWLE1BQUFBLGNBQWMsQ0FBQy9RLE1BQU0sQ0FBQ0UsRUFBRSxDQUFDO0VBQzNCLElBQUE7S0FBRSxlQUNBZ0Qsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNQyxJQUFBQSxTQUFTLEVBQUM7S0FBMkIsRUFBQyxjQUFRLENBQUMsZUFDckRGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxFQUFNLGNBQWtCLENBQ2xCLENBQ0wsQ0FBQyxHQUNKLElBQ0YsQ0FDRixDQUNMLENBQ0ksQ0FDRixDQUNBLENBQ04sQ0FDRixDQUFDO0VBRVY7RUFFQSxTQUFTOFAsUUFBUUEsQ0FBQztJQUFFbkosVUFBVTtJQUFFOUosTUFBTTtJQUFFa1QsZUFBZTtJQUFFQyxTQUFTO0lBQUVDLFdBQVc7SUFBRUMsTUFBTTtJQUFFN1QsS0FBSztJQUFFOFQsTUFBTTtJQUFFMUcsUUFBUTtJQUFFMkIsU0FBUztJQUFFQyxZQUFZO0lBQUVDLFVBQVU7SUFBRThFLE1BQU07SUFBRUMsU0FBUztJQUFFNVAsUUFBUTtJQUFFNlAsZ0JBQWdCO0lBQUVDLFdBQVc7SUFBRUMsT0FBTztJQUFFQyxVQUFVO0lBQUVDLFVBQVU7RUFBRUMsRUFBQUE7RUFBYSxDQUFDLEVBQUU7SUFDbFEsTUFBTUMsZUFBZSxHQUFHWixTQUFTLEtBQUssV0FBVyxJQUFJRCxlQUFlLEdBQUdBLGVBQWUsR0FBR2xULE1BQU07RUFDL0YsRUFBQSxNQUFNZ1UsZUFBZSxHQUFHYixTQUFTLEtBQUssV0FBVyxJQUFJRCxlQUFlO0lBQ3BFLE1BQU0sQ0FBQ2UsUUFBUSxFQUFFQyxXQUFXLENBQUMsR0FBRzlQLGNBQVEsQ0FBQyxLQUFLLENBQUM7RUFDL0MsRUFBQSxNQUFNc04sT0FBTyxHQUFHM0UsWUFBTSxDQUFDLElBQUksQ0FBQztFQUU1QnZJLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO01BQ2QsSUFBSSxDQUFDeVAsUUFBUSxFQUFFO0VBQ2IsTUFBQSxPQUFPek0sU0FBUztFQUNsQixJQUFBO01BRUEsTUFBTXNLLGlCQUFpQixHQUFJekYsS0FBSyxJQUFLO0VBQ25DLE1BQUEsSUFBSXFGLE9BQU8sQ0FBQ3BFLE9BQU8sSUFBSSxDQUFDb0UsT0FBTyxDQUFDcEUsT0FBTyxDQUFDeUUsUUFBUSxDQUFDMUYsS0FBSyxDQUFDMkIsTUFBTSxDQUFDLEVBQUU7VUFDOURrRyxXQUFXLENBQUMsS0FBSyxDQUFDO0VBQ3BCLE1BQUE7TUFDRixDQUFDO0VBRURsQyxJQUFBQSxRQUFRLENBQUN0RixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUVvRixpQkFBaUIsQ0FBQztFQUN6RCxJQUFBLE9BQU8sTUFBTTtFQUNYRSxNQUFBQSxRQUFRLENBQUMvRixtQkFBbUIsQ0FBQyxXQUFXLEVBQUU2RixpQkFBaUIsQ0FBQztNQUM5RCxDQUFDO0VBQ0gsRUFBQSxDQUFDLEVBQUUsQ0FBQ21DLFFBQVEsQ0FBQyxDQUFDO0lBRWQsb0JBQ0UvUSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFjLGVBQzNCRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFBUWhHLFFBQWMsQ0FBQyxlQUN2QitGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQXFCLGVBQ2xDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQVFDLElBQUFBLFNBQVMsRUFBQyxZQUFZO0VBQUNULElBQUFBLElBQUksRUFBQyxRQUFRO0VBQUNZLElBQUFBLE9BQU8sRUFBRStQO0VBQU8sR0FBQSxFQUFDLGFBQWMsQ0FBQyxlQUU3RXBRLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0VBQWMsR0FBQSxlQUMzQkYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLGVBQ0VELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0VBQVksR0FBQSxFQUFDLGlCQUFvQixDQUFDLGVBQ2pERixzQkFBQSxDQUFBQyxhQUFBLENBQUEsSUFBQSxFQUFBO0VBQUlDLElBQUFBLFNBQVMsRUFBQztLQUFhLEVBQUV5RyxlQUFlLENBQUNDLFVBQVUsRUFBRWlLLGVBQWUsQ0FBTSxDQUFDLGVBQy9FN1Esc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7RUFBYyxHQUFBLEVBQUU4UCxlQUFlLEdBQUcsV0FBVyxHQUFJYSxlQUFlLENBQUN0VSxNQUFNLElBQUksT0FBYyxDQUNyRyxDQUNGLENBQUMsZUFFTnlELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQVksZUFDekJGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7TUFBUUMsU0FBUyxFQUFFLFlBQVkrUCxTQUFTLEtBQUssT0FBTyxHQUFHLG9CQUFvQixHQUFHLEVBQUUsQ0FBQSxDQUFHO0VBQUN4USxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUFDWSxJQUFBQSxPQUFPLEVBQUVBLE1BQU02UCxXQUFXLENBQUMsT0FBTztFQUFFLEdBQUEsRUFBQyxPQUFhLENBQUMsZUFDckpsUSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO01BQVFDLFNBQVMsRUFBRSxZQUFZK1AsU0FBUyxLQUFLLFdBQVcsR0FBRyxvQkFBb0IsR0FBRyxFQUFFLENBQUEsQ0FBRztFQUFDeFEsSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFBQ1ksSUFBQUEsT0FBTyxFQUFFQSxNQUFNMlAsZUFBZSxJQUFJRSxXQUFXLENBQUMsV0FBVztLQUFFLEVBQUMsV0FBaUIsQ0FDaEwsQ0FBQyxFQUVMNVQsS0FBSyxnQkFBRzBELHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2dSLHVCQUFVLEVBQUE7RUFBQ0MsSUFBQUEsT0FBTyxFQUFDO0VBQVEsR0FBQSxFQUFFNVUsS0FBa0IsQ0FBQyxHQUFHLElBQUksZUFFakUwRCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFjLGVBQzNCRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztFQUFpQixHQUFBLEVBQzdCMEcsVUFBVSxDQUFDdUssVUFBVSxDQUFDelQsR0FBRyxDQUFDLENBQUMwVCxHQUFHLEVBQUVqTCxLQUFLLGtCQUNwQ25HLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7TUFBS0csR0FBRyxFQUFFLENBQUEsSUFBQSxFQUFPK0YsS0FBSyxDQUFBLENBQUc7RUFBQ2pHLElBQUFBLFNBQVMsRUFBQztLQUFlLGVBQ2pERixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFrQixFQUM5QmtSLEdBQUcsQ0FBQzFULEdBQUcsQ0FBRWtILEtBQUssaUJBQ2I1RSxzQkFBQSxDQUFBQyxhQUFBLENBQUM2TSxlQUFhLEVBQUE7RUFDWmxHLElBQUFBLFVBQVUsRUFBRUEsVUFBVztFQUN2QnhHLElBQUFBLEdBQUcsRUFBRXdFLEtBQU07RUFDWEEsSUFBQUEsS0FBSyxFQUFFQSxLQUFNO0VBQ2J2SyxJQUFBQSxLQUFLLEVBQUV3VyxlQUFlLENBQUNqTSxLQUFLLENBQUU7TUFDOUJpQixJQUFJLEVBQUUsQ0FBQ2pCLEtBQUssQ0FBRTtFQUNkOEUsSUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQ25CMkIsSUFBQUEsU0FBUyxFQUFFQSxTQUFVO0VBQ3JCQyxJQUFBQSxZQUFZLEVBQUVBLFlBQWE7RUFDM0JDLElBQUFBLFVBQVUsRUFBRUEsVUFBVztFQUN2QjFLLElBQUFBLFFBQVEsRUFBRWlRO0VBQWdCLEdBQzNCLENBQ0YsQ0FDRSxDQUNGLENBQ04sQ0FDRSxDQUFDLGVBRU45USxzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsZUFDRUQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBaUIsZUFDOUJGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0VBQXVCLEdBQUEsRUFBQyxPQUFVLENBQUMsZUFDbERGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQXVCLGVBQ3BDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUF1QixlQUNwQ0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRQyxJQUFBQSxTQUFTLEVBQUMsOEJBQThCO0VBQUNULElBQUFBLElBQUksRUFBQyxRQUFRO0VBQUNZLElBQUFBLE9BQU8sRUFBRWlRLFNBQVU7RUFBQ3pQLElBQUFBLFFBQVEsRUFBRSxDQUFDNlA7RUFBVyxHQUFBLEVBQUMsU0FBZSxDQUFDLGVBQzFIMVEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRQyxJQUFBQSxTQUFTLEVBQUMsc0RBQXNEO0VBQUNULElBQUFBLElBQUksRUFBQyxRQUFRO01BQUNZLE9BQU8sRUFBRUEsTUFBTTJRLFdBQVcsQ0FBRTVHLE9BQU8sSUFBSyxDQUFDQSxPQUFPO0VBQUUsR0FBQSxFQUFDLFFBQVMsQ0FBQyxFQUNuSjJHLFFBQVEsZ0JBQ1AvUSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtzSyxJQUFBQSxHQUFHLEVBQUVpRSxPQUFRO0VBQUN0TyxJQUFBQSxTQUFTLEVBQUM7S0FBd0IsZUFDbkRGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFDRUMsSUFBQUEsU0FBUyxFQUFDLG1FQUFtRTtFQUM3RVQsSUFBQUEsSUFBSSxFQUFDLFFBQVE7TUFDYlksT0FBTyxFQUFFQSxNQUFNO1FBQ2IyUSxXQUFXLENBQUMsS0FBSyxDQUFDO0VBQ2xCUixNQUFBQSxXQUFXLEVBQUU7TUFDZixDQUFFO0VBQ0YzUCxJQUFBQSxRQUFRLEVBQUUsQ0FBQytQO0tBQWEsZUFFeEI1USxzQkFBQSxDQUFBQyxhQUFBLENBQUEsTUFBQSxFQUFBO0VBQU1DLElBQUFBLFNBQVMsRUFBQztFQUE4QixHQUFBLEVBQUMsTUFBTyxDQUFDLEVBQUEsV0FFakQsQ0FBQyxlQUNURixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VDLElBQUFBLFNBQVMsRUFBQyxtRUFBbUU7RUFDN0VULElBQUFBLElBQUksRUFBQyxRQUFRO01BQ2JZLE9BQU8sRUFBRUEsTUFBTTtRQUNiMlEsV0FBVyxDQUFDLEtBQUssQ0FBQztFQUNsQlQsTUFBQUEsZ0JBQWdCLEVBQUU7TUFDcEIsQ0FBRTtFQUNGMVAsSUFBQUEsUUFBUSxFQUFFLENBQUM4UDtLQUFXLGVBRXRCM1Esc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNQyxJQUFBQSxTQUFTLEVBQUM7S0FBOEIsRUFBQyxNQUFPLENBQUMsRUFBQSxpQkFFakQsQ0FDTCxDQUFDLEdBQ0osSUFDRCxDQUFDLGVBQ05GLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFBUUMsSUFBQUEsU0FBUyxFQUFDLG1CQUFtQjtFQUFDVCxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUFDWSxJQUFBQSxPQUFPLEVBQUVnUSxNQUFPO0VBQUN4UCxJQUFBQSxRQUFRLEVBQUUsQ0FBQzRQO0tBQVEsRUFDckZOLE1BQU0sR0FBRyxXQUFXLEdBQUcsTUFDbEIsQ0FDTCxDQUNGLENBQUMsZUFFTm5RLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQWlCLGVBQzlCRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztFQUF1QixHQUFBLEVBQUMsU0FBWSxDQUFDLGVBQ3BERixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUF1QixlQUNwQ0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRQyxJQUFBQSxTQUFTLEVBQUMsOEJBQThCO0VBQUNULElBQUFBLElBQUksRUFBQyxRQUFRO0VBQUNZLElBQUFBLE9BQU8sRUFBRUssUUFBUztFQUFDRyxJQUFBQSxRQUFRLEVBQUVpUTtFQUFnQixHQUFBLEVBQUMsUUFBYyxDQUN4SCxDQUNGLENBQ0EsQ0FDSixDQUNGLENBQ0YsQ0FBQztFQUVWO0VBRWUsU0FBU08saUJBQWlCQSxHQUFHO0lBQzFDLE1BQU07RUFBRWpLLElBQUFBO0tBQVUsR0FBR2tLLHFCQUFTLEVBQUU7RUFDaEMsRUFBQSxNQUFNakksUUFBUSxHQUFHa0ksdUJBQVcsRUFBRTtFQUM5QixFQUFBLE1BQU16UixRQUFRLEdBQUdpQix1QkFBVyxFQUFFO0VBQzlCLEVBQUEsTUFBTXlRLFNBQVMsR0FBR0MsaUJBQVMsRUFBRTtJQUM3QixNQUFNLENBQUN0RSxPQUFPLEVBQUV1RSxVQUFVLENBQUMsR0FBR3hRLGNBQVEsQ0FBQyxJQUFJLENBQUM7SUFDNUMsTUFBTSxDQUFDeVEsV0FBVyxFQUFFQyxjQUFjLENBQUMsR0FBRzFRLGNBQVEsQ0FBQyxLQUFLLENBQUM7SUFDckQsTUFBTSxDQUFDaVAsTUFBTSxFQUFFMEIsU0FBUyxDQUFDLEdBQUczUSxjQUFRLENBQUMsS0FBSyxDQUFDO0lBQzNDLE1BQU0sQ0FBQzBGLFVBQVUsRUFBRWtMLGFBQWEsQ0FBQyxHQUFHNVEsY0FBUSxDQUFDLElBQUksQ0FBQztJQUNsRCxNQUFNLENBQUN6RCxPQUFPLEVBQUVzVSxVQUFVLENBQUMsR0FBRzdRLGNBQVEsQ0FBQyxFQUFFLENBQUM7SUFDMUMsTUFBTSxDQUFDK0wsUUFBUSxFQUFFK0UsV0FBVyxDQUFDLEdBQUc5USxjQUFRLENBQUMsSUFBSSxDQUFDO0lBQzlDLE1BQU0sQ0FBQ3BFLE1BQU0sRUFBRW1WLFNBQVMsQ0FBQyxHQUFHL1EsY0FBUSxDQUFDLElBQUksQ0FBQztJQUMxQyxNQUFNLENBQUNnUixjQUFjLEVBQUVDLGlCQUFpQixDQUFDLEdBQUdqUixjQUFRLENBQUMsSUFBSSxDQUFDO0lBQzFELE1BQU0sQ0FBQzhPLGVBQWUsRUFBRW9DLGtCQUFrQixDQUFDLEdBQUdsUixjQUFRLENBQUMsSUFBSSxDQUFDO0lBQzVELE1BQU0sQ0FBQytPLFNBQVMsRUFBRW9DLFlBQVksQ0FBQyxHQUFHblIsY0FBUSxDQUFDLE9BQU8sQ0FBQztJQUNuRCxNQUFNLENBQUM1RSxLQUFLLEVBQUVnVyxRQUFRLENBQUMsR0FBR3BSLGNBQVEsQ0FBQyxFQUFFLENBQUM7RUFFdEMsRUFBQSxNQUFNbUcsS0FBSyxHQUFHMkgsYUFBTyxDQUFDLE1BQU0sSUFBSTVLLGVBQWUsQ0FBQ2lGLFFBQVEsQ0FBQzZELE1BQU0sQ0FBQyxFQUFFLENBQUM3RCxRQUFRLENBQUM2RCxNQUFNLENBQUMsQ0FBQztFQUNwRixFQUFBLE1BQU1xRixRQUFRLEdBQUdsTCxLQUFLLENBQUNtTCxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ3RDLE1BQU1DLEtBQUssR0FBR3BMLEtBQUssQ0FBQ21MLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHO0lBQ3RDLE1BQU10RixNQUFNLEdBQUc3RixLQUFLLENBQUNtTCxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtJQUN4QyxNQUFNalcsTUFBTSxHQUFHOEssS0FBSyxDQUFDbUwsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7SUFDeEMsTUFBTUUsUUFBUSxHQUFHckwsS0FBSyxDQUFDbUwsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7SUFDNUMsTUFBTUcsUUFBUSxHQUFHdEwsS0FBSyxDQUFDbUwsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7SUFDNUMsTUFBTUksUUFBUSxHQUFHdkwsS0FBSyxDQUFDbUwsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7SUFDNUMsTUFBTUssVUFBVSxHQUFHeEwsS0FBSyxDQUFDbUwsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7SUFDaEQsTUFBTU0sU0FBUyxHQUFHekwsS0FBSyxDQUFDbUwsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7SUFDOUMsTUFBTTdDLE1BQU0sR0FBR3RJLEtBQUssQ0FBQ21MLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO0lBQ3hDLE1BQU01QyxTQUFTLEdBQUd2SSxLQUFLLENBQUNtTCxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtJQUM5QyxNQUFNdEQsZUFBZSxHQUFHeEssb0JBQW9CLENBQUMyQyxLQUFLLENBQUNtTCxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztFQUUxRSxFQUFBLE1BQU1PLElBQUksR0FBRy9ELGFBQU8sQ0FBQyxNQUFPdUQsUUFBUSxJQUFJRSxLQUFLLEdBQUcsTUFBTSxHQUFHLE1BQU8sRUFBRSxDQUFDRixRQUFRLEVBQUVFLEtBQUssQ0FBQyxDQUFDO0VBQ3BGLEVBQUEsTUFBTU8sT0FBTyxHQUFHaEUsYUFBTyxDQUNyQixNQUFNdFQsSUFBSSxDQUFDd0gsU0FBUyxDQUFDTyxtQkFBaUIsQ0FBQzNHLE1BQU0sQ0FBQyxDQUFDLEtBQUtwQixJQUFJLENBQUN3SCxTQUFTLENBQUNPLG1CQUFpQixDQUFDeU8sY0FBYyxDQUFDLENBQUMsRUFDckcsQ0FBQ3BWLE1BQU0sRUFBRW9WLGNBQWMsQ0FDekIsQ0FBQztFQUNELEVBQUEsTUFBTWUsZUFBZSxHQUFHakUsYUFBTyxDQUFDLE1BQU1uTCxvQkFBa0IsQ0FBQy9HLE1BQU0sQ0FBQyxFQUFFLENBQUNBLE1BQU0sQ0FBQyxDQUFDO0VBQzNFLEVBQUEsTUFBTW9XLHFCQUFxQixHQUFHbEUsYUFBTyxDQUNuQyxNQUFNdFQsSUFBSSxDQUFDd0gsU0FBUyxDQUFDTyxtQkFBaUIsQ0FBQzNHLE1BQU0sQ0FBQyxDQUFDLEtBQUtwQixJQUFJLENBQUN3SCxTQUFTLENBQUNPLG1CQUFpQixDQUFDdU0sZUFBZSxDQUFDLENBQUMsRUFDdEcsQ0FBQ2xULE1BQU0sRUFBRWtULGVBQWUsQ0FDMUIsQ0FBQztFQUNELEVBQUEsTUFBTVMsT0FBTyxHQUFHc0MsSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDNUMsTUFBTSxJQUFJRixTQUFTLEtBQUssV0FBVyxJQUFJK0MsT0FBTztFQUNsRixFQUFBLE1BQU10QyxVQUFVLEdBQUdxQyxJQUFJLEtBQUssTUFBTSxJQUFJLENBQUM1QyxNQUFNLElBQUlGLFNBQVMsS0FBSyxXQUFXLEtBQUtELGVBQWUsR0FBR2tELHFCQUFxQixHQUFHRCxlQUFlLENBQUM7RUFDekksRUFBQSxNQUFNdEMsVUFBVSxHQUFHb0MsSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDNUMsTUFBTSxJQUFJRixTQUFTLEtBQUssV0FBVyxJQUFJZ0QsZUFBZTtFQUM3RixFQUFBLE1BQU1yQyxZQUFZLEdBQUdtQyxJQUFJLEtBQUssTUFBTSxJQUFJLENBQUM1QyxNQUFNLElBQUl0TCxPQUFPLENBQUNtTCxlQUFlLENBQUM7RUFFM0UxTyxFQUFBQSxlQUFTLENBQUMsTUFBTTtNQUNkLElBQUk2UixNQUFNLEdBQUcsSUFBSTtFQUVqQixJQUFBLE1BQU1DLElBQUksR0FBRyxZQUFZO0VBQ3ZCLE1BQUEsTUFBTUMsV0FBVyxHQUFHTixJQUFJLEtBQUssTUFBTSxJQUFJLENBQUNuTSxVQUFVO0VBQ2xELE1BQUEsSUFBSXlNLFdBQVcsRUFBRTtVQUNmM0IsVUFBVSxDQUFDLElBQUksQ0FBQztFQUNsQixNQUFBLENBQUMsTUFBTTtVQUNMRSxjQUFjLENBQUMsSUFBSSxDQUFDO0VBQ3RCLE1BQUE7UUFDQVUsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUNaLElBQUk7RUFDRixRQUFBLE1BQU1sVyxPQUFPLEdBQUcsTUFBTStLLFdBQVcsQ0FBQ0MsUUFBUSxFQUFFO0VBQzFDQyxVQUFBQSxLQUFLLEVBQUUwTCxJQUFJLEtBQUssTUFBTSxHQUNqQlIsUUFBUSxHQUFHO0VBQUVBLFlBQUFBO0VBQVMsV0FBQyxHQUFHO0VBQUVlLFlBQUFBLEdBQUcsRUFBRTtFQUFJLFdBQUMsR0FDdkM7Y0FDQXBHLE1BQU07Y0FDTjNRLE1BQU07Y0FDTm1XLFFBQVE7Y0FDUkMsUUFBUTtjQUNSQyxRQUFRO2NBQ1JDLFVBQVU7Y0FDVkMsU0FBUztjQUNUbkQsTUFBTTtjQUNOQyxTQUFTO0VBQ1RWLFlBQUFBLGVBQWUsRUFBRUEsZUFBZSxDQUFDcUUsSUFBSSxDQUFDLEdBQUc7RUFDM0M7RUFDSixTQUFDLENBQUM7VUFFRixJQUFJLENBQUNKLE1BQU0sRUFBRTtFQUNYLFVBQUE7RUFDRixRQUFBO0VBRUFyQixRQUFBQSxhQUFhLENBQUMxVixPQUFPLENBQUN3SyxVQUFVLENBQUM7RUFDakNtTCxRQUFBQSxVQUFVLENBQUMzVixPQUFPLENBQUNxQixPQUFPLElBQUksRUFBRSxDQUFDO0VBQ2pDdVUsUUFBQUEsV0FBVyxDQUFDNVYsT0FBTyxDQUFDNlEsUUFBUSxJQUFJLElBQUksQ0FBQztFQUNyQyxRQUFBLE1BQU11RyxlQUFlLEdBQUdwWCxPQUFPLENBQUNxWCxXQUFXLEdBQUd4USxZQUFVLENBQUM3RyxPQUFPLENBQUNxWCxXQUFXLENBQUMsR0FBRyxJQUFJO1VBQ3BGeEIsU0FBUyxDQUFDdUIsZUFBZSxDQUFDO1VBQzFCckIsaUJBQWlCLENBQUNxQixlQUFlLEdBQUd2USxZQUFVLENBQUN1USxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUM7RUFDdkVwQixRQUFBQSxrQkFBa0IsQ0FBQ2hXLE9BQU8sQ0FBQzRULGVBQWUsR0FBRy9NLFlBQVUsQ0FBQzdHLE9BQU8sQ0FBQzRULGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQztVQUN4RnFDLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDdkIsQ0FBQyxDQUFDLE9BQU9xQixTQUFTLEVBQUU7VUFDbEIsSUFBSSxDQUFDUCxNQUFNLEVBQUU7RUFDWCxVQUFBO0VBQ0YsUUFBQTtFQUNBYixRQUFBQSxRQUFRLENBQUNvQixTQUFTLENBQUN6WSxPQUFPLENBQUM7RUFDN0IsTUFBQSxDQUFDLFNBQVM7RUFDUixRQUFBLElBQUlrWSxNQUFNLEVBQUU7WUFDVnpCLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDakJFLGNBQWMsQ0FBQyxLQUFLLENBQUM7RUFDdkIsUUFBQTtFQUNGLE1BQUE7TUFDRixDQUFDO0VBRUR3QixJQUFBQSxJQUFJLEVBQUU7RUFDTixJQUFBLE9BQU8sTUFBTTtFQUNYRCxNQUFBQSxNQUFNLEdBQUcsS0FBSztNQUNoQixDQUFDO0VBQ0gsRUFBQSxDQUFDLEVBQUUsQ0FBQ0osSUFBSSxFQUFFM0wsUUFBUSxFQUFFbUwsUUFBUSxFQUFFRSxLQUFLLEVBQUV2RixNQUFNLEVBQUUzUSxNQUFNLEVBQUVtVyxRQUFRLEVBQUVDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxVQUFVLEVBQUVDLFNBQVMsRUFBRW5ELE1BQU0sRUFBRUMsU0FBUyxFQUFFVixlQUFlLENBQUNxRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUV4SixNQUFNSSxlQUFlLEdBQUlDLEtBQUssSUFBSztFQUNqQyxJQUFBLE1BQU1DLFVBQVUsR0FBRztRQUNqQjNHLE1BQU07UUFDTjNRLE1BQU07UUFDTm1XLFFBQVE7UUFDUkMsUUFBUTtRQUNSQyxRQUFRO1FBQ1JDLFVBQVU7UUFDVkMsU0FBUztRQUNUbkQsTUFBTTtRQUNOQyxTQUFTO0VBQ1RWLE1BQUFBLGVBQWUsRUFBRUEsZUFBZSxDQUFDcUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUMxQyxHQUFHSztPQUNKO01BRUQ5VCxRQUFRLENBQUNtRSxjQUFjLENBQUNvRixRQUFRLENBQUNuRixRQUFRLEVBQUUyUCxVQUFVLENBQUMsQ0FBQztJQUN6RCxDQUFDO0VBRUQsRUFBQSxNQUFNQyxZQUFZLEdBQUdBLENBQUNqTyxJQUFJLEVBQUVMLFNBQVMsS0FBSztNQUN4Q3lNLFNBQVMsQ0FBRTdILE9BQU8sSUFBS3hFLGNBQVksQ0FBQ3dFLE9BQU8sRUFBRXZFLElBQUksRUFBRUwsU0FBUyxDQUFDLENBQUM7SUFDaEUsQ0FBQztFQUVELEVBQUEsTUFBTXVPLGFBQWEsR0FBR0EsQ0FBQ2xPLElBQUksRUFBRVEsUUFBUSxLQUFLO01BQ3hDNEwsU0FBUyxDQUFFN0gsT0FBTyxJQUFLaEUsY0FBWSxDQUFDZ0UsT0FBTyxFQUFFdkUsSUFBSSxFQUFFUSxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsTUFBTTJOLGdCQUFnQixHQUFJbk8sSUFBSSxJQUFLO01BQ2pDb00sU0FBUyxDQUFFN0gsT0FBTyxJQUFLbkUsY0FBWSxDQUFDbUUsT0FBTyxFQUFFdkUsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztFQUVELEVBQUEsTUFBTW9PLGNBQWMsR0FBR0EsQ0FBQ3BPLElBQUksRUFBRVUsTUFBTSxLQUFLO01BQ3ZDMEwsU0FBUyxDQUFFN0gsT0FBTyxJQUFLOUQsWUFBVSxDQUFDOEQsT0FBTyxFQUFFdkUsSUFBSSxFQUFFVSxNQUFNLENBQUMsQ0FBQztJQUMzRCxDQUFDO0VBRUQsRUFBQSxNQUFNMk4sZ0JBQWdCLEdBQUcsTUFBT0MsTUFBTSxJQUFLO01BQ3pDLElBQUksQ0FBQ3JYLE1BQU0sRUFBRTtFQUNYLE1BQUE7RUFDRixJQUFBO01BRUErVSxTQUFTLENBQUMsSUFBSSxDQUFDO01BQ2ZTLFFBQVEsQ0FBQyxFQUFFLENBQUM7TUFDWixJQUFJO0VBQ0YsTUFBQSxNQUFNbFcsT0FBTyxHQUFHLE1BQU0rSyxXQUFXLENBQUNDLFFBQVEsRUFBRTtFQUMxQy9ILFFBQUFBLE1BQU0sRUFBRSxNQUFNO0VBQ2RoQixRQUFBQSxJQUFJLEVBQUU7WUFDSjhWLE1BQU07RUFDTjVCLFVBQUFBLFFBQVEsRUFBRXpWLE1BQU0sQ0FBQ0UsRUFBRSxJQUFJLElBQUk7WUFDM0JGLE1BQU07RUFDTndXLFVBQUFBLEdBQUcsRUFBRWIsS0FBSyxHQUFHLEdBQUcsR0FBR25PO0VBQ3JCO0VBQ0YsT0FBQyxDQUFDO1FBRUYsSUFBSWxJLE9BQU8sQ0FBQ3FYLFdBQVcsRUFBRTtFQUN2QixRQUFBLE1BQU1ELGVBQWUsR0FBR3ZRLFlBQVUsQ0FBQzdHLE9BQU8sQ0FBQ3FYLFdBQVcsQ0FBQztVQUN2RHhCLFNBQVMsQ0FBQ3VCLGVBQWUsQ0FBQztFQUMxQnJCLFFBQUFBLGlCQUFpQixDQUFDbFAsWUFBVSxDQUFDdVEsZUFBZSxDQUFDLENBQUM7RUFDaEQsTUFBQTtFQUNBcEIsTUFBQUEsa0JBQWtCLENBQUNoVyxPQUFPLENBQUM0VCxlQUFlLEdBQUcvTSxZQUFVLENBQUM3RyxPQUFPLENBQUM0VCxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDeEYsSUFBSW1FLE1BQU0sS0FBSyxXQUFXLEVBQUU7VUFDMUI5QixZQUFZLENBQUMsT0FBTyxDQUFDO0VBQ3ZCLE1BQUE7UUFFQSxJQUFJLENBQUNFLFFBQVEsSUFBSW5XLE9BQU8sQ0FBQ3FYLFdBQVcsRUFBRXpXLEVBQUUsRUFBRTtFQUN4QzhDLFFBQUFBLFFBQVEsQ0FBQ21FLGNBQWMsQ0FBQ29GLFFBQVEsQ0FBQ25GLFFBQVEsRUFBRTtFQUFFcU8sVUFBQUEsUUFBUSxFQUFFblcsT0FBTyxDQUFDcVgsV0FBVyxDQUFDelc7RUFBRyxTQUFDLENBQUMsQ0FBQztFQUNuRixNQUFBO1FBRUEsSUFBSVosT0FBTyxDQUFDb0QsTUFBTSxFQUFFO0VBQ2xCZ1MsUUFBQUEsU0FBUyxDQUFDO0VBQUV2VyxVQUFBQSxPQUFPLEVBQUVtQixPQUFPLENBQUNvRCxNQUFNLENBQUN2RSxPQUFPO0VBQUV3RSxVQUFBQSxJQUFJLEVBQUVyRCxPQUFPLENBQUNvRCxNQUFNLENBQUNDO0VBQUssU0FBQyxDQUFDO0VBQzNFLE1BQUE7UUFFQSxJQUFJckQsT0FBTyxDQUFDZ1ksT0FBTyxFQUFFO0VBQ25CdFUsUUFBQUEsUUFBUSxDQUFDLENBQUEsYUFBQSxFQUFnQnNILFFBQVEsQ0FBQSxDQUFFLENBQUM7RUFDdEMsTUFBQTtNQUNGLENBQUMsQ0FBQyxPQUFPaU4sWUFBWSxFQUFFO0VBQ3JCL0IsTUFBQUEsUUFBUSxDQUFDK0IsWUFBWSxDQUFDcFosT0FBTyxDQUFDO0VBQzlCdVcsTUFBQUEsU0FBUyxDQUFDO1VBQUV2VyxPQUFPLEVBQUVvWixZQUFZLENBQUNwWixPQUFPO0VBQUV3RSxRQUFBQSxJQUFJLEVBQUU7RUFBUSxPQUFDLENBQUM7RUFDN0QsSUFBQSxDQUFDLFNBQVM7UUFDUm9TLFNBQVMsQ0FBQyxLQUFLLENBQUM7RUFDbEIsSUFBQTtJQUNGLENBQUM7SUFFRCxNQUFNeUMsb0JBQW9CLEdBQUdBLE1BQU07RUFDakNyQyxJQUFBQSxTQUFTLENBQUM5TyxjQUFZLENBQUNyRyxNQUFNLENBQUMsQ0FBQztNQUMvQnVWLFlBQVksQ0FBQyxPQUFPLENBQUM7SUFDdkIsQ0FBQztFQUVELEVBQUEsTUFBTWtDLFlBQVksR0FBRyxZQUFZO0VBQy9CelUsSUFBQUEsUUFBUSxDQUFDbUUsY0FBYyxDQUFDb0YsUUFBUSxDQUFDbkYsUUFBUSxFQUFFO0VBQUVvUCxNQUFBQSxHQUFHLEVBQUU7RUFBRSxLQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0VBRUQsRUFBQSxNQUFNa0IsZ0JBQWdCLEdBQUcsT0FBT0wsTUFBTSxFQUFFTSxjQUFjLEtBQUs7TUFDekQsSUFBSTtFQUNGLE1BQUEsTUFBTXJZLE9BQU8sR0FBRyxNQUFNK0ssV0FBVyxDQUFDQyxRQUFRLEVBQUU7RUFDMUMvSCxRQUFBQSxNQUFNLEVBQUUsTUFBTTtFQUNkaEIsUUFBQUEsSUFBSSxFQUFFO1lBQ0o4VixNQUFNO0VBQ041QixVQUFBQSxRQUFRLEVBQUVrQztFQUNaO0VBQ0YsT0FBQyxDQUFDO0VBRUZqRCxNQUFBQSxTQUFTLENBQUM7VUFBRXZXLE9BQU8sRUFBRW1CLE9BQU8sQ0FBQ29ELE1BQU0sRUFBRXZFLE9BQU8sSUFBSSxDQUFBLEVBQUcyTCxVQUFVLENBQUM5TSxLQUFLLENBQUEsU0FBQSxDQUFXO0VBQUUyRixRQUFBQSxJQUFJLEVBQUVyRCxPQUFPLENBQUNvRCxNQUFNLEVBQUVDLElBQUksSUFBSTtFQUFVLE9BQUMsQ0FBQztRQUUxSCxJQUFJMFUsTUFBTSxLQUFLLFdBQVcsSUFBSS9YLE9BQU8sQ0FBQ3FYLFdBQVcsRUFBRXpXLEVBQUUsRUFBRTtFQUNyRDhDLFFBQUFBLFFBQVEsQ0FBQ21FLGNBQWMsQ0FBQ29GLFFBQVEsQ0FBQ25GLFFBQVEsRUFBRTtFQUFFcU8sVUFBQUEsUUFBUSxFQUFFblcsT0FBTyxDQUFDcVgsV0FBVyxDQUFDelc7RUFBRyxTQUFDLENBQUMsQ0FBQztFQUNqRixRQUFBO0VBQ0YsTUFBQTtRQUVBLElBQUltWCxNQUFNLEtBQUssUUFBUSxFQUFFO0VBQ3ZCcEMsUUFBQUEsVUFBVSxDQUFFM0gsT0FBTyxJQUFLQSxPQUFPLENBQUN6TSxNQUFNLENBQUV3QyxJQUFJLElBQUtBLElBQUksQ0FBQ25ELEVBQUUsS0FBS3lYLGNBQWMsQ0FBQyxDQUFDO0VBQy9FLE1BQUE7TUFDRixDQUFDLENBQUMsT0FBT0osWUFBWSxFQUFFO0VBQ3JCL0IsTUFBQUEsUUFBUSxDQUFDK0IsWUFBWSxDQUFDcFosT0FBTyxDQUFDO0VBQzlCdVcsTUFBQUEsU0FBUyxDQUFDO1VBQUV2VyxPQUFPLEVBQUVvWixZQUFZLENBQUNwWixPQUFPO0VBQUV3RSxRQUFBQSxJQUFJLEVBQUU7RUFBUSxPQUFDLENBQUM7RUFDN0QsSUFBQTtJQUNGLENBQUM7RUFFRCxFQUFBLElBQUkwTixPQUFPLEVBQUU7TUFDWCxvQkFDRW5OLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3lLLE1BQUFBLEtBQUssRUFBRTtFQUFFQyxRQUFBQSxPQUFPLEVBQUUsTUFBTTtFQUFFK0osUUFBQUEsY0FBYyxFQUFFLFFBQVE7RUFBRUMsUUFBQUEsVUFBVSxFQUFFLFFBQVE7RUFBRUMsUUFBQUEsTUFBTSxFQUFFO0VBQU87RUFBRSxLQUFBLGVBQzlGNVUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNFUsbUJBQU0sRUFBQSxJQUFFLENBQ04sQ0FBQztFQUVWLEVBQUE7SUFFQSxJQUFJLENBQUNqTyxVQUFVLEVBQUU7RUFDZixJQUFBLG9CQUFPNUcsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDZ1IsdUJBQVUsRUFBQTtFQUFDQyxNQUFBQSxPQUFPLEVBQUM7RUFBUSxLQUFBLEVBQUMsZ0NBQTBDLENBQUM7RUFDakYsRUFBQTtJQUVBLElBQUk2QixJQUFJLEtBQUssTUFBTSxFQUFFO0VBQ25CLElBQUEsb0JBQ0UvUyxzQkFBQSxDQUFBQyxhQUFBLENBQUMrTSxRQUFRLEVBQUE7RUFDUHBHLE1BQUFBLFVBQVUsRUFBRUEsVUFBVztFQUN2Qm5KLE1BQUFBLE9BQU8sRUFBRUEsT0FBUTtRQUNqQndQLFFBQVEsRUFBRUEsUUFBUSxJQUFJO0VBQ3BCaUMsUUFBQUEsZUFBZSxFQUFFdEksVUFBVSxDQUFDa08sV0FBVyxDQUFDcFgsR0FBRyxDQUFFZ1MsTUFBTSxJQUFLQSxNQUFNLENBQUM5SyxLQUFLLENBQUM7VUFDckVxSyxlQUFlLEVBQUVySSxVQUFVLENBQUNrTyxXQUFXO0VBQ3ZDdkYsUUFBQUEsT0FBTyxFQUFFLEVBQUU7VUFDWEMsYUFBYSxFQUFFLEVBQUU7RUFDakJHLFFBQUFBLE1BQU0sRUFBRSxFQUFFO0VBQ1ZDLFFBQUFBLFNBQVMsRUFBRTtTQUNYO0VBQ0YxQyxNQUFBQSxNQUFNLEVBQUVBLE1BQU87RUFDZkMsTUFBQUEsT0FBTyxFQUFFd0UsV0FBWTtFQUNyQnZFLE1BQUFBLFFBQVEsRUFBRzJILFVBQVUsSUFBS3BCLGVBQWUsQ0FBQztFQUFFekcsUUFBQUEsTUFBTSxFQUFFNkg7RUFBVyxPQUFDLENBQUU7UUFDbEUxSCxZQUFZLEVBQUcySCxZQUFZLElBQUtsVixRQUFRLENBQUNtRSxjQUFjLENBQUNvRixRQUFRLENBQUNuRixRQUFRLEVBQUU7RUFBRXFPLFFBQUFBLFFBQVEsRUFBRXlDO0VBQWEsT0FBQyxDQUFDLENBQUU7RUFDeEcxSCxNQUFBQSxRQUFRLEVBQUVpSCxZQUFhO1FBQ3ZCaEgsU0FBUyxFQUFHM0ksS0FBSyxJQUFLO0VBQ3BCLFFBQUEsTUFBTXFRLFNBQVMsR0FBR2hJLFFBQVEsRUFBRTBDLE1BQU0sS0FBSy9LLEtBQUssSUFBSXFJLFFBQVEsRUFBRTJDLFNBQVMsS0FBSyxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUs7RUFDOUYrRCxRQUFBQSxlQUFlLENBQUM7RUFBRWhFLFVBQUFBLE1BQU0sRUFBRS9LLEtBQUs7RUFBRWdMLFVBQUFBLFNBQVMsRUFBRXFGO0VBQVUsU0FBQyxDQUFDO1FBQzFELENBQUU7RUFDRnpILE1BQUFBLFdBQVcsRUFBRUEsQ0FBQzVJLEtBQUssRUFBRXZLLEtBQUssS0FBS3NaLGVBQWUsQ0FBQztFQUFFLFFBQUEsQ0FBQy9PLEtBQUssR0FBR3ZLO0VBQU0sT0FBQyxDQUFFO0VBQ25Fb1QsTUFBQUEsY0FBYyxFQUFFQSxNQUFNa0csZUFBZSxDQUFDO0VBQ3BDcFgsUUFBQUEsTUFBTSxFQUFFLEVBQUU7RUFDVm1XLFFBQUFBLFFBQVEsRUFBRSxFQUFFO0VBQ1pDLFFBQUFBLFFBQVEsRUFBRSxFQUFFO0VBQ1pDLFFBQUFBLFFBQVEsRUFBRSxFQUFFO0VBQ1pDLFFBQUFBLFVBQVUsRUFBRSxFQUFFO0VBQ2RDLFFBQUFBLFNBQVMsRUFBRTtFQUNiLE9BQUMsQ0FBRTtFQUNIcEYsTUFBQUEsc0JBQXNCLEVBQUVBLENBQUM5SSxLQUFLLEVBQUV1RyxPQUFPLEtBQUs7RUFDMUMsUUFBQSxNQUFNK0osVUFBVSxHQUFHL0osT0FBTyxHQUN0QixDQUFDLEdBQUcsSUFBSWdLLEdBQUcsQ0FBQyxDQUFDLElBQUlsSSxRQUFRLEVBQUVpQyxlQUFlLElBQUksRUFBRSxDQUFDLEVBQUV0SyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQzNELENBQUNxSSxRQUFRLEVBQUVpQyxlQUFlLElBQUksRUFBRSxFQUFFdlIsTUFBTSxDQUFFd0MsSUFBSSxJQUFLQSxJQUFJLEtBQUt5RSxLQUFLLENBQUM7RUFFdEUrTyxRQUFBQSxlQUFlLENBQUM7RUFDZHpFLFVBQUFBLGVBQWUsRUFBRWdHLFVBQVUsQ0FBQzNCLElBQUksQ0FBQyxHQUFHO0VBQ3RDLFNBQUMsQ0FBQztRQUNKLENBQUU7RUFDRjVGLE1BQUFBLHNCQUFzQixFQUFFQSxNQUFNZ0csZUFBZSxDQUFDO0VBQzVDekUsUUFBQUEsZUFBZSxFQUFFdEksVUFBVSxDQUFDa08sV0FBVyxDQUFDcFgsR0FBRyxDQUFFZ1MsTUFBTSxJQUFLQSxNQUFNLENBQUM5SyxLQUFLLENBQUMsQ0FBQzJPLElBQUksQ0FBQyxHQUFHO0VBQ2hGLE9BQUMsQ0FBRTtRQUNIM0YsaUJBQWlCLEVBQUc2RyxjQUFjLElBQUtELGdCQUFnQixDQUFDLFdBQVcsRUFBRUMsY0FBYyxDQUFFO0VBQ3JGNUcsTUFBQUEsY0FBYyxFQUFHNEcsY0FBYyxJQUFLRCxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUVDLGNBQWM7RUFBRSxLQUNoRixDQUFDO0VBRU4sRUFBQTtJQUVBLElBQUksQ0FBQzNYLE1BQU0sRUFBRTtNQUNYLG9CQUNFa0Qsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLeUssTUFBQUEsS0FBSyxFQUFFO0VBQUVDLFFBQUFBLE9BQU8sRUFBRSxNQUFNO0VBQUUrSixRQUFBQSxjQUFjLEVBQUUsUUFBUTtFQUFFQyxRQUFBQSxVQUFVLEVBQUUsUUFBUTtFQUFFQyxRQUFBQSxNQUFNLEVBQUU7RUFBTztFQUFFLEtBQUEsZUFDOUY1VSxzQkFBQSxDQUFBQyxhQUFBLENBQUM0VSxtQkFBTSxFQUFBLElBQUUsQ0FDTixDQUFDO0VBRVYsRUFBQTtFQUVBLEVBQUEsb0JBQ0U3VSxzQkFBQSxDQUFBQyxhQUFBLENBQUM4UCxRQUFRLEVBQUE7RUFDUG5KLElBQUFBLFVBQVUsRUFBRUEsVUFBVztFQUN2QjlKLElBQUFBLE1BQU0sRUFBRUEsTUFBTztFQUNma1QsSUFBQUEsZUFBZSxFQUFFQSxlQUFnQjtFQUNqQ0MsSUFBQUEsU0FBUyxFQUFFQSxTQUFVO0VBQ3JCQyxJQUFBQSxXQUFXLEVBQUVtQyxZQUFhO0VBQzFCbEMsSUFBQUEsTUFBTSxFQUFFQSxNQUFPO0VBQ2Y3VCxJQUFBQSxLQUFLLEVBQUVBLEtBQU07TUFDYjhULE1BQU0sRUFBRUEsTUFBTXRRLFFBQVEsQ0FBQyxDQUFBLGFBQUEsRUFBZ0JzSCxRQUFRLEVBQUUsQ0FBRTtFQUNuRHNDLElBQUFBLFFBQVEsRUFBRW9LLFlBQWE7RUFDdkJ6SSxJQUFBQSxTQUFTLEVBQUUwSSxhQUFjO0VBQ3pCekksSUFBQUEsWUFBWSxFQUFFMEksZ0JBQWlCO0VBQy9CekksSUFBQUEsVUFBVSxFQUFFMEksY0FBZTtFQUMzQjVELElBQUFBLE1BQU0sRUFBRUEsTUFBTTZELGdCQUFnQixDQUFDLE1BQU0sQ0FBRTtFQUN2QzVELElBQUFBLFNBQVMsRUFBRUEsTUFBTTRELGdCQUFnQixDQUFDLFNBQVMsQ0FBRTtFQUM3Q3hULElBQUFBLFFBQVEsRUFBRUEsTUFBTXdULGdCQUFnQixDQUFDLFFBQVEsQ0FBRTtFQUMzQzNELElBQUFBLGdCQUFnQixFQUFFK0Qsb0JBQXFCO0VBQ3ZDOUQsSUFBQUEsV0FBVyxFQUFFQSxNQUFNMEQsZ0JBQWdCLENBQUMsV0FBVyxDQUFFO0VBQ2pEekQsSUFBQUEsT0FBTyxFQUFFQSxPQUFRO0VBQ2pCQyxJQUFBQSxVQUFVLEVBQUVBLFVBQVc7RUFDdkJDLElBQUFBLFVBQVUsRUFBRUEsVUFBVztFQUN2QkMsSUFBQUEsWUFBWSxFQUFFQTtFQUFhLEdBQzVCLENBQUM7RUFFTjs7RUNqbkVBLE1BQU0xVyxHQUFHLEdBQUcsSUFBSUMsaUJBQVMsRUFBRTtFQUUzQixNQUFNc0ksdUJBQXVCLEdBQUcsbUhBQW1IO0VBQ25KLE1BQU1DLG1CQUFtQixHQUFHLDZDQUE2QztFQUN6RSxNQUFNMFMsa0JBQWtCLEdBQUcsZ0JBQWdCO0VBQzNDLE1BQU14Uyx3QkFBd0IsR0FBRyxrVEFBa1Q7RUFDblYsTUFBTXlTLHNCQUFzQixHQUFHLDJFQUEyRTtFQUMxRyxNQUFNQyxhQUFhLEdBQUcsQ0FDcEI7RUFBRWpiLEVBQUFBLEtBQUssRUFBRSxHQUFHO0VBQUVQLEVBQUFBLEtBQUssRUFBRTtFQUFPLENBQUMsRUFDN0I7RUFBRU8sRUFBQUEsS0FBSyxFQUFFLFVBQVU7RUFBRVAsRUFBQUEsS0FBSyxFQUFFO0VBQVUsQ0FBQyxFQUN2QztFQUFFTyxFQUFBQSxLQUFLLEVBQUUsZ0JBQWdCO0VBQUVQLEVBQUFBLEtBQUssRUFBRTtFQUFnQixDQUFDLEVBQ25EO0VBQUVPLEVBQUFBLEtBQUssRUFBRSxpQkFBaUI7RUFBRVAsRUFBQUEsS0FBSyxFQUFFO0VBQWlCLENBQUMsRUFDckQ7RUFBRU8sRUFBQUEsS0FBSyxFQUFFLFFBQVE7RUFBRVAsRUFBQUEsS0FBSyxFQUFFO0VBQVEsQ0FBQyxFQUNuQztFQUFFTyxFQUFBQSxLQUFLLEVBQUUsVUFBVTtFQUFFUCxFQUFBQSxLQUFLLEVBQUU7RUFBVSxDQUFDLEVBQ3ZDO0VBQUVPLEVBQUFBLEtBQUssRUFBRSxNQUFNO0VBQUVQLEVBQUFBLEtBQUssRUFBRTtFQUFNLENBQUMsRUFDL0I7RUFBRU8sRUFBQUEsS0FBSyxFQUFFLE9BQU87RUFBRVAsRUFBQUEsS0FBSyxFQUFFO0VBQU8sQ0FBQyxFQUNqQztFQUFFTyxFQUFBQSxLQUFLLEVBQUUsVUFBVTtFQUFFUCxFQUFBQSxLQUFLLEVBQUU7RUFBaUIsQ0FBQyxFQUM5QztFQUFFTyxFQUFBQSxLQUFLLEVBQUUsUUFBUTtFQUFFUCxFQUFBQSxLQUFLLEVBQUU7RUFBUSxDQUFDLEVBQ25DO0VBQUVPLEVBQUFBLEtBQUssRUFBRSxZQUFZO0VBQUVQLEVBQUFBLEtBQUssRUFBRTtFQUFZLENBQUMsQ0FDNUM7RUFFRCxNQUFNeWIsWUFBWSxHQUFHO0VBQ25CLEVBQUEsZUFBZSxFQUFFLENBQ2Y7RUFBRUMsSUFBQUEsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVM7RUFBRSxHQUFDLEVBQ25DO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUUsU0FBUztFQUFFLEdBQUMsRUFDdkQ7RUFBRUEsSUFBQUEsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsdUJBQXVCO0VBQUUsR0FBQyxFQUN4RDtNQUFFQSxNQUFNLEVBQUUsQ0FBQyxZQUFZO0VBQUUsR0FBQyxFQUMxQjtNQUFFQSxNQUFNLEVBQUUsQ0FBQyxRQUFRO0VBQUUsR0FBQyxFQUN0QjtNQUFFQSxNQUFNLEVBQUUsQ0FBQyxhQUFhO0VBQUUsR0FBQyxDQUM1QjtFQUNEQyxFQUFBQSxRQUFRLEVBQUUsQ0FDUjtFQUFFRCxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsY0FBYztFQUFFLEdBQUMsRUFDcEM7RUFBRUEsSUFBQUEsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVTtFQUFFLEdBQUMsRUFDN0Q7TUFBRUEsTUFBTSxFQUFFLENBQUMsZ0JBQWdCO0VBQUUsR0FBQyxFQUM5QjtNQUFFQSxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0I7RUFBRSxHQUFDLEVBQ3ZGO01BQUVBLE1BQU0sRUFBRSxDQUFDLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLGNBQWM7RUFBRSxHQUFDLEVBQzlGO01BQUVBLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsZUFBZTtFQUFFLEdBQUMsRUFDaEY7TUFBRUEsTUFBTSxFQUFFLENBQUMsYUFBYTtFQUFFLEdBQUMsRUFDM0I7RUFBRUEsSUFBQUEsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCO0VBQUUsR0FBQyxDQUM3STtFQUNELEVBQUEsWUFBWSxFQUFFLENBQ1o7RUFBRUEsSUFBQUEsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxxQkFBcUI7RUFBRSxHQUFDLEVBQ2hFO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxZQUFZO0VBQUUsR0FBQyxFQUMzRDtFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0I7RUFBRSxHQUFDLEVBQ2hEO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFdBQVc7RUFBRSxHQUFDLENBQzlEO0VBQ0QsRUFBQSxXQUFXLEVBQUUsQ0FDWDtFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsY0FBYyxFQUFFLHFCQUFxQjtFQUFFLEdBQUMsRUFDaEU7RUFBRUEsSUFBQUEsTUFBTSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsZUFBZTtFQUFFLEdBQUMsRUFDakk7RUFBRUEsSUFBQUEsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUseUJBQXlCLEVBQUUsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsOEJBQThCO0VBQUUsR0FBQyxFQUNuSztNQUFFQSxNQUFNLEVBQUUsQ0FBQyxtQkFBbUI7RUFBRSxHQUFDLEVBQ2pDO01BQUVBLE1BQU0sRUFBRSxDQUFDLG1CQUFtQjtFQUFFLEdBQUMsQ0FDbEM7RUFDRCxFQUFBLGNBQWMsRUFBRSxDQUNkO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUscUJBQXFCO0VBQUUsR0FBQyxFQUNoRTtFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxxQkFBcUI7RUFBRSxHQUFDLEVBQzVKO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVTtFQUFFLEdBQUMsQ0FDcEQ7RUFDRCxFQUFBLFVBQVUsRUFBRSxDQUNWO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxhQUFhO0VBQUUsR0FBQyxFQUNuRztFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxlQUFlO0VBQUUsR0FBQyxFQUNsRDtFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCO0VBQUUsR0FBQyxDQUM3RDtFQUNELEVBQUEsb0JBQW9CLEVBQUUsQ0FDcEI7RUFBRUEsSUFBQUEsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxxQkFBcUI7RUFBRSxHQUFDLEVBQ2hFO01BQUVBLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxjQUFjO0VBQUUsR0FBQyxFQUM1RjtFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLGlCQUFpQjtFQUFFLEdBQUMsRUFDOUQ7RUFBRUEsSUFBQUEsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsV0FBVztFQUFFLEdBQUMsQ0FDakU7RUFDRCxFQUFBLHFCQUFxQixFQUFFLENBQ3JCO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUscUJBQXFCO0VBQUUsR0FBQyxFQUNoRTtNQUFFQSxNQUFNLEVBQUUsQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlO0VBQUUsR0FBQyxFQUMvRTtFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0I7RUFBRSxHQUFDLEVBQ2xFO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZO0VBQUUsR0FBQyxFQUN6QztFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCO0VBQUUsR0FBQyxFQUM1RDtFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0I7RUFBRSxHQUFDLEVBQ3RLO01BQUVBLE1BQU0sRUFBRSxDQUFDLGFBQWE7RUFBRSxHQUFDLENBQzVCO0VBQ0QsRUFBQSxjQUFjLEVBQUUsQ0FDZDtFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsY0FBYyxFQUFFLHFCQUFxQjtFQUFFLEdBQUMsRUFDaEU7RUFBRUEsSUFBQUEsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFLFlBQVk7RUFBRSxHQUFDLEVBQzFDO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQjtFQUFFLEdBQUMsRUFDcEU7TUFBRUEsTUFBTSxFQUFFLENBQUMsTUFBTTtFQUFFLEdBQUMsRUFDcEI7RUFBRUEsSUFBQUEsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLGdCQUFnQjtFQUFFLEdBQUMsQ0FDM0M7RUFDRCxFQUFBLHFCQUFxQixFQUFFLENBQ3JCO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxjQUFjO0VBQUUsR0FBQyxFQUN6QztFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxXQUFXO0VBQUUsR0FBQyxFQUNyRTtNQUFFQSxNQUFNLEVBQUUsQ0FBQyxVQUFVO0VBQUUsR0FBQyxFQUN4QjtFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLG9CQUFvQjtFQUFFLEdBQUMsQ0FDbEU7RUFDRCxFQUFBLFlBQVksRUFBRSxDQUNaO0VBQUVBLElBQUFBLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxjQUFjO0VBQUUsR0FBQyxFQUN6QztFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxXQUFXO0VBQUUsR0FBQyxFQUNyRTtNQUFFQSxNQUFNLEVBQUUsQ0FBQyxVQUFVO0VBQUUsR0FBQyxFQUN4QjtFQUFFQSxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLG9CQUFvQjtLQUFHO0VBRXJFLENBQUM7RUFFRCxNQUFNdmIsUUFBTSxHQUFHO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0VBRUQsU0FBUzRJLE9BQU9BLENBQUM1RixJQUFJLEVBQUU7RUFDckIsRUFBQSxPQUFPQSxJQUFJLENBQ1I2RixPQUFPLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQ3RDQSxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUN0QkEsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLENB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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
