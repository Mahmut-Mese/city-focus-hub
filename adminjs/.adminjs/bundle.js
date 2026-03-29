(function (React, reactRouter, adminjs, designSystem, reactRedux) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const ADMIN_RESOURCE_DEFINITIONS = [{
    table: 'blog_posts',
    label: 'Blog Posts',
    sidebarLabel: 'Blog Post',
    navigation: 'Collections',
    sidebarSection: 'collections',
    sidebarHref: '/admin/pages/blog-posts'
  }, {
    table: 'faq_items',
    label: 'FAQ Items',
    sidebarLabel: 'FAQ Item',
    navigation: 'Collections',
    sidebarSection: 'collections',
    sidebarHref: '/admin/pages/faq-items'
  }, {
    table: 'meeting_rooms',
    label: 'Meeting Rooms',
    sidebarLabel: 'Meeting Room',
    navigation: 'Collections',
    sidebarSection: 'collections',
    sidebarHref: '/admin/pages/meeting-rooms'
  }, {
    table: 'pricing_plans',
    label: 'Pricing Plans',
    sidebarLabel: 'Pricing Plan',
    navigation: 'Collections',
    sidebarSection: 'collections',
    sidebarHref: '/admin/pages/pricing-plans'
  }, {
    table: 'files',
    label: 'Media Library',
    sidebarLabel: 'Media Library',
    navigation: 'Media',
    sidebarSection: null
  }, {
    table: 'member_users',
    label: 'Customers',
    sidebarLabel: 'Customers',
    navigation: 'Operations',
    sidebarSection: 'customers',
    sidebarHref: '/admin/pages/customers',
    hiddenColumns: ['password_hash'],
    listProperties: ['id', 'name', 'email', 'access_status', 'created_at'],
    filterProperties: ['id', 'name', 'email', 'access_status'],
    readOnly: true
  }, {
    table: 'memberships',
    label: 'Memberships',
    sidebarLabel: 'Memberships',
    navigation: 'Operations',
    sidebarSection: null,
    listProperties: ['id', 'user_id', 'plan_id', 'status', 'stripe_subscription_id', 'updated_at'],
    filterProperties: ['id', 'user_id', 'plan_id', 'status', 'stripe_subscription_id'],
    readOnly: true
  }, {
    table: 'membership_plans',
    label: 'Membership Plans',
    sidebarLabel: 'Membership Plans',
    navigation: 'Operations',
    sidebarSection: null,
    listProperties: ['id', 'name', 'slug', 'monthly_price_minor', 'currency', 'active', 'updated_at'],
    filterProperties: ['id', 'name', 'slug', 'currency', 'active'],
    readOnly: true
  }, {
    table: 'bookings',
    label: 'Orders',
    sidebarLabel: 'Orders',
    navigation: 'Operations',
    sidebarSection: 'orders',
    sidebarHref: '/admin/pages/orders',
    listProperties: ['id', 'user_id', 'resource_id', 'status', 'start_at', 'total_minor', 'updated_at'],
    filterProperties: ['id', 'user_id', 'resource_id', 'status', 'start_at', 'stripe_payment_status'],
    readOnly: true
  }, {
    table: 'resources',
    label: 'Bookable Resources',
    sidebarLabel: 'Bookable Resources',
    navigation: 'Operations',
    sidebarSection: null,
    listProperties: ['id', 'name', 'slug', 'type', 'hourly_rate_minor', 'active', 'updated_at'],
    filterProperties: ['id', 'name', 'slug', 'type', 'active'],
    readOnly: true
  }, {
    table: 'invoices',
    label: 'Invoices',
    sidebarLabel: 'Invoices',
    navigation: 'Operations',
    sidebarSection: 'orders',
    sidebarHref: '/admin/pages/invoices',
    listProperties: ['id', 'user_id', 'membership_id', 'booking_id', 'status', 'total_minor', 'paid_at'],
    filterProperties: ['id', 'user_id', 'membership_id', 'booking_id', 'status', 'stripe_invoice_id'],
    readOnly: true
  }, {
    table: 'contact_submissions',
    label: 'Messages',
    sidebarLabel: 'Messages',
    navigation: 'Operations',
    sidebarSection: 'customers',
    sidebarHref: '/admin/pages/messages',
    listProperties: ['id', 'name', 'email', 'source_page', 'created_at'],
    filterProperties: ['id', 'name', 'email', 'source_page'],
    readOnly: true
  }];
  function buildAdminResourceHref(resourceId) {
    return `/admin/resources/${resourceId}/actions/list`;
  }

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
  const CUSTOMER_QUICK_ORDER = ['member_users', 'contact_submissions'];
  const ORDER_QUICK_ORDER = ['bookings', 'invoices'];
  const CUSTOMERS = CUSTOMER_QUICK_ORDER.map(resourceId => ADMIN_RESOURCE_DEFINITIONS.find(definition => definition.table === resourceId)).filter(Boolean).map(definition => ({
    label: definition.sidebarLabel || definition.label,
    href: definition.sidebarHref || buildAdminResourceHref(definition.table)
  }));
  const ORDERS = ORDER_QUICK_ORDER.map(resourceId => ADMIN_RESOURCE_DEFINITIONS.find(definition => definition.table === resourceId)).filter(Boolean).map(definition => ({
    label: definition.sidebarLabel || definition.label,
    href: definition.sidebarHref || buildAdminResourceHref(definition.table)
  }));
  const STYLES$5 = `
.admin-dashboard {
  min-height: 100%;
  padding: 32px 40px 64px 40px;
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
    }, "Use the shortcuts below to jump into site content, customers, orders, billing, and incoming messages."), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-dashboard__grid"
    }, /*#__PURE__*/React__default.default.createElement(ShortcutList, {
      title: "Single Types",
      items: PRIMARY_PAGES,
      navigate: navigate,
      meta: "Edit structured page content"
    }), /*#__PURE__*/React__default.default.createElement(ShortcutList, {
      title: "Customers",
      items: CUSTOMERS,
      navigate: navigate,
      meta: "Review customers and incoming messages"
    }), /*#__PURE__*/React__default.default.createElement(ShortcutList, {
      title: "Orders",
      items: ORDERS,
      navigate: navigate,
      meta: "Review orders and invoices"
    }), /*#__PURE__*/React__default.default.createElement(ShortcutList, {
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

  const MULTILINE_FIELD_PATTERN$1 = /(description|content|message|body|subtitle|excerpt|intro|hours|address|text|paragraph|overview|challenge|result|answer|notes)/i;
  const IMAGE_FIELD_PATTERN$1 = /(image|coverImage|contentImages)/i;
  const BOOLEAN_FIELD_PATTERN = /^(featured|isFeatured|isPopular)$/i;
  const FULL_WIDTH_FIELD_PATTERN$1 = /(description|content|answer|excerpt|contentImages|coverImage|image|features|badges|tags)$/i;
  const STYLES$4 = `
.admin-editor {
  min-height: 100%;
  padding: 32px 40px 64px 40px;
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
.admin-side-note {
  color: #666687;
  font-size: .875rem;
  line-height: 1.5rem;
}
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
.admin-profile-card {
  max-width: 100%;
  border-radius: 20px;
  background: transparent;
  padding: 6px 6px 0;
}
.admin-profile-card__head {
  padding: 0 0 12px;
}
.admin-profile-card__identity {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.admin-profile-card__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  flex: 0 0 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, #4945ff 0%, #7b79ff 100%);
  color: #ffffff;
  font-size: .95rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.admin-profile-card__head-copy {
  min-width: 0;
}
.admin-profile-card__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.admin-profile-card__eyebrow {
  margin-bottom: 6px;
  color: #7c7c98;
  font-size: .72rem;
  line-height: 1rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.admin-profile-card__title {
  margin: 0;
  color: #32324d;
  font-size: clamp(1.45rem, 2.2vw, 2rem);
  line-height: 1.02;
  letter-spacing: -.04em;
  font-weight: 700;
}
.admin-profile-card__body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 0 0 6px;
}
.admin-profile-card__body--customer {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.admin-profile-card__row {
  width: 100%;
  padding: 10px 12px 6px;
}
.admin-profile-card__item {
  min-width: 0;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.82);
}
.admin-profile-card__item--full {
  grid-column: 1 / -1;
}
.admin-profile-card__label {
  color: #7c7c98;
  font-size: .72rem;
  line-height: 1rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.admin-profile-card__value {
  margin-top: 10px;
  color: #32324d;
  font-size: 1.1rem;
  line-height: 1.45;
  font-weight: 600;
  word-break: break-word;
}
.admin-profile-card__value--muted {
  color: #8e8ea9;
}
.admin-profile-card__value--mono {
  display: inline-flex;
  align-items: center;
  padding: .24rem .62rem;
  border-radius: 999px;
  background: rgba(73, 69, 255, 0.08);
  color: #4b47be;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: .82rem;
  line-height: 1.1rem;
}
.admin-profile-card__value--multiline {
  white-space: pre-line;
}
.admin-profile-card__textbox {
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  padding: .875rem 1rem;
  border: 1px solid #dcdce4;
  border-radius: 12px;
  background: #f6f6f9;
  color: #666687;
  font: inherit;
  line-height: 1.55;
  resize: none;
}
.admin-reply-panel {
  max-width: 660px;
  margin-top: 12px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #eaeaef;
  padding: 18px 20px;
}
.admin-reply-panel__title {
  margin: 0 0 6px;
  color: #32324d;
  font-size: 1rem;
  line-height: 1.4;
  font-weight: 700;
}
.admin-reply-panel__note {
  margin: 0 0 14px;
  color: #666687;
  font-size: .875rem;
  line-height: 1.5;
}
.admin-reply-panel__history {
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
}
.admin-reply-panel__item {
  padding: 14px 16px;
  border-radius: 14px;
  background: #f6f6f9;
}
.admin-reply-panel__meta {
  color: #666687;
  font-size: .78rem;
  line-height: 1.3;
  margin-bottom: 8px;
}
.admin-reply-panel__subject {
  color: #32324d;
  font-size: .95rem;
  line-height: 1.4;
  font-weight: 700;
}
.admin-reply-panel__body {
  margin-top: 8px;
  color: #666687;
  font-size: .9rem;
  line-height: 1.6;
  white-space: pre-line;
}
.admin-reply-panel__form {
  display: grid;
  gap: 12px;
}
.admin-reply-panel__actions {
  display: flex;
  justify-content: flex-end;
}
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
.admin-list-status--manual {
  background: rgba(73, 69, 255, 0.12);
  color: #4945ff;
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
  .admin-profile-card {
    padding: 4px 4px 0;
    border-radius: 16px;
  }
  .admin-profile-card__head { padding-bottom: 10px; }
  .admin-profile-card__identity { align-items: flex-start; }
  .admin-profile-card__avatar {
    width: 48px;
    height: 48px;
    flex-basis: 48px;
    border-radius: 14px;
    font-size: .9rem;
  }
  .admin-profile-card__body,
  .admin-profile-card__body--customer { grid-template-columns: 1fr; gap: 10px; }
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
  function formatMoneyValue(value, currency) {
    const amount = Number(value ?? 0);
    const safeCurrency = String(currency || 'GBP').toUpperCase();
    try {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: safeCurrency
      }).format(amount / 100);
    } catch {
      return `${safeCurrency} ${(amount / 100).toFixed(2)}`;
    }
  }
  function formatProfileDisplayValue(definition, field, rawValue, record) {
    const normalizedValue = typeof rawValue === 'string' ? rawValue.trim() : rawValue;
    if (normalizedValue === '' || normalizedValue == null) {
      return 'Not set';
    }
    if (Array.isArray(definition?.moneyFields) && definition.moneyFields.includes(field)) {
      return formatMoneyValue(rawValue, record?.currency);
    }
    if (typeof rawValue === 'string' && /^(status|.*Status|bookingType|resourceType|accessStatus)$/i.test(field)) {
      return rawValue.replace(/[_-]+/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
    }
    return String(rawValue);
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
    const selectOptions = Array.isArray(definition?.selectFields?.[field]) ? definition.selectFields[field] : null;
    const inputType = definition?.inputTypes?.[field] || (typeof value === 'number' ? 'number' : 'text');
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
    }, "*") : null), selectOptions ? /*#__PURE__*/React__default.default.createElement("select", {
      className: "admin-input",
      value: value ?? '',
      disabled: disabled,
      onChange: event => onChange(path, parseInputValue$1(event.target.value, value))
    }, selectOptions.map(option => /*#__PURE__*/React__default.default.createElement("option", {
      key: option.value,
      value: option.value
    }, option.label))) : MULTILINE_FIELD_PATTERN$1.test(field) ? /*#__PURE__*/React__default.default.createElement("textarea", {
      className: "admin-textarea",
      value: value ?? '',
      disabled: disabled,
      onChange: event => onChange(path, parseInputValue$1(event.target.value, value))
    }) : /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-input",
      type: inputType,
      value: value ?? '',
      disabled: disabled,
      onChange: event => onChange(path, parseInputValue$1(event.target.value, value))
    }));
  }
  function ProfileInfoCard({
    definition,
    record
  }) {
    const infoCardFields = Array.isArray(definition.infoCardFields) ? definition.infoCardFields : [];
    const infoCardBlockFields = Array.isArray(definition.infoCardBlockFields) ? definition.infoCardBlockFields : [];
    const optionalInfoCardFields = new Set(Array.isArray(definition.optionalInfoCardFields) ? definition.optionalInfoCardFields : []);
    const optionalInfoCardBlockFields = new Set(Array.isArray(definition.optionalInfoCardBlockFields) ? definition.optionalInfoCardBlockFields : []);
    const titleField = definition.infoCardTitleField || definition.titleField;
    const rawTitle = record?.[titleField];
    const cardTitle = rawTitle == null || String(rawTitle).trim() === '' ? definition.label : String(rawTitle);
    const cardMetaLabel = definition.metaLabel || definition.label || 'Record';
    const cardEyebrow = cardMetaLabel.endsWith('s') ? cardMetaLabel.slice(0, -1) : cardMetaLabel;
    const titleTokens = cardTitle.split(/\s+/).map(token => token.trim()).filter(Boolean);
    const avatarLabel = titleTokens.slice(0, 2).map(token => token[0]).join('').toUpperCase() || 'ID';
    const manualTag = typeof record?.manualTag === 'string' ? record.manualTag.trim() : '';
    const isProfileSummaryLayout = definition?.name === 'customers' || definition?.name === 'messages' || definition?.name === 'orders' || definition?.name === 'invoices' || definition?.name === 'refunds';
    const summaryFields = infoCardFields.filter(field => field !== 'manualTag' && !infoCardBlockFields.includes(field));
    if (!infoCardFields.length) {
      return null;
    }
    return /*#__PURE__*/React__default.default.createElement("section", {
      className: "admin-section"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-profile-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-profile-card__head"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-profile-card__identity"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-profile-card__avatar",
      "aria-hidden": "true"
    }, avatarLabel), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-profile-card__head-copy"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-profile-card__eyebrow"
    }, cardEyebrow), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-profile-card__title-row"
    }, /*#__PURE__*/React__default.default.createElement("h2", {
      className: "admin-profile-card__title"
    }, cardTitle), manualTag ? /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-list-status admin-list-status--manual"
    }, manualTag) : null)))), /*#__PURE__*/React__default.default.createElement("div", {
      className: `admin-profile-card__body${isProfileSummaryLayout ? ' admin-profile-card__body--customer' : ''}`
    }, summaryFields.map(field => {
      const label = getFieldDisplayLabel(definition, field);
      const displayValue = formatProfileDisplayValue(definition, field, record?.[field], record);
      const valueClassNames = ['admin-profile-card__value'];
      if (optionalInfoCardFields.has(field) && displayValue === 'Not set') {
        return null;
      }
      if (displayValue === 'Not set') {
        valueClassNames.push('admin-profile-card__value--muted');
      }
      if (field === 'id' || field.endsWith('Id')) {
        valueClassNames.push('admin-profile-card__value--mono');
      }
      if (typeof displayValue === 'string' && displayValue.includes('\n')) {
        valueClassNames.push('admin-profile-card__value--multiline');
      }
      return /*#__PURE__*/React__default.default.createElement("div", {
        key: field,
        className: `admin-profile-card__item${FULL_WIDTH_FIELD_PATTERN$1.test(field) ? ' admin-profile-card__item--full' : ''}`
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-profile-card__label"
      }, label), /*#__PURE__*/React__default.default.createElement("div", {
        className: valueClassNames.join(' ')
      }, displayValue));
    })), infoCardBlockFields.map(field => {
      const displayValue = formatProfileDisplayValue(definition, field, record?.[field], record);
      if (optionalInfoCardBlockFields.has(field) && displayValue === 'Not set') {
        return null;
      }
      return /*#__PURE__*/React__default.default.createElement("div", {
        key: field,
        className: "admin-profile-card__row"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-profile-card__label"
      }, getFieldDisplayLabel(definition, field)), /*#__PURE__*/React__default.default.createElement("textarea", {
        className: "admin-profile-card__textbox",
        value: displayValue,
        rows: Math.max(4, Math.min(10, String(displayValue).split('\n').length + 1)),
        disabled: true,
        readOnly: true
      }));
    })));
  }
  function MessageReplyPanel({
    replies,
    replyDraft,
    onReplyChange,
    onSendReply,
    sendingReply
  }) {
    return /*#__PURE__*/React__default.default.createElement("section", {
      className: "admin-section"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-reply-panel"
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      className: "admin-reply-panel__title"
    }, "Reply to Customer"), /*#__PURE__*/React__default.default.createElement("p", {
      className: "admin-reply-panel__note"
    }, "Send an email response directly from this message detail page."), replies.length ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-reply-panel__history"
    }, replies.map(reply => /*#__PURE__*/React__default.default.createElement("div", {
      key: reply.id,
      className: "admin-reply-panel__item"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-reply-panel__meta"
    }, reply.createdAt, " \u2022 ", reply.adminEmail), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-reply-panel__subject"
    }, reply.subject), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-reply-panel__body"
    }, reply.body)))) : null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-reply-panel__form"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-label"
    }, "Reply Subject"), /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-input",
      type: "text",
      value: replyDraft.subject,
      onChange: event => onReplyChange('subject', event.target.value)
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-field admin-field--full"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-label"
    }, "Reply Message"), /*#__PURE__*/React__default.default.createElement("textarea", {
      className: "admin-textarea",
      value: replyDraft.body,
      rows: 8,
      onChange: event => onReplyChange('body', event.target.value)
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-reply-panel__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-primary",
      type: "button",
      onClick: onSendReply,
      disabled: sendingReply
    }, sendingReply ? 'Sending...' : 'Send Reply')))));
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
    if (field === 'manualTag') {
      return value ? /*#__PURE__*/React__default.default.createElement("span", {
        className: "admin-list-status admin-list-status--manual"
      }, value) : null;
    }
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
    const [filtersOpen, setFiltersOpen] = React.useState(false);
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
    const showCreate = definition.allowCreate !== false;
    const hasFilters = Boolean(controls.filters?.length);
    const allowDuplicate = definition.allowDuplicate !== false;
    const allowDelete = definition.allowDelete !== false;
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-editor"
    }, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$4), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-editor__inner"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-header"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-meta"
    }, definition.metaLabel || 'Collection Type'), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "admin-title"
    }, definition.label)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-list-actions"
    }, showCreate ? /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-primary",
      type: "button",
      onClick: onCreate
    }, "+ Create new entry") : null)), /*#__PURE__*/React__default.default.createElement("div", {
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
    }) : null, hasFilters ? /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-toolbar-button${filtersOpen ? ' admin-toolbar-button--active' : ''}`,
      type: "button",
      onClick: () => {
        setFiltersOpen(current => !current);
        setShowDisplayed(false);
      }
    }, "Filters") : null, hasFilters && filtersOpen ? /*#__PURE__*/React__default.default.createElement("div", {
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
        setFiltersOpen(false);
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
    }, "\u270E"), /*#__PURE__*/React__default.default.createElement("span", null, definition.readOnly ? 'View' : 'Edit')), allowDuplicate ? /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-list-row-menu__item",
      type: "button",
      onClick: () => {
        setOpenMenuId(null);
        onDuplicateRecord(record.id);
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-list-row-menu__icon"
    }, "\u29C9"), /*#__PURE__*/React__default.default.createElement("span", null, "Duplicate")) : null, allowDelete ? /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-list-row-menu__item admin-list-row-menu__item--danger",
      type: "button",
      onClick: () => {
        setOpenMenuId(null);
        onDeleteRecord(record.id);
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-list-row-menu__icon"
    }, "\uD83D\uDDD1"), /*#__PURE__*/React__default.default.createElement("span", null, "Delete entry")) : null) : null))))))));
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
    canUnpublish,
    replyDraft,
    onReplyChange,
    onSendReply,
    sendingReply,
    isCreateMode
  }) {
    const displayedRecord = activeTab === 'published' && publishedRecord ? publishedRecord : record;
    const isPublishedView = activeTab === 'published' && publishedRecord;
    const isManualEntry = displayedRecord?.entrySource === 'manual' || displayedRecord?.manualTag === 'Manual';
    const supportsEditing = isCreateMode || isManualEntry || !definition.readOnly;
    const showVersionTabs = supportsEditing && definition.showVersionTabs !== false;
    const allowPublish = supportsEditing && definition.allowPublish !== false;
    const allowSave = supportsEditing && definition.allowSave !== false;
    const allowDelete = definition.allowDelete !== false;
    const editableFields = isCreateMode ? Array.isArray(definition.createFields) ? definition.createFields : [] : isManualEntry ? Array.isArray(definition.manualEditableFields) ? definition.manualEditableFields : Array.isArray(definition.editableFields) ? definition.editableFields : [] : Array.isArray(definition.editableFields) ? definition.editableFields : [];
    const infoCardFields = !isCreateMode && Array.isArray(definition.infoCardFields) ? definition.infoCardFields : [];
    const infoCardBlockFields = !isCreateMode && Array.isArray(definition.infoCardBlockFields) ? definition.infoCardBlockFields : [];
    const hiddenCardFields = new Set([...infoCardFields, ...infoCardBlockFields].filter(field => !editableFields.includes(field)));
    const showStandaloneHeader = infoCardFields.length === 0 && infoCardBlockFields.length === 0;
    const activeLayout = isCreateMode ? Array.isArray(definition.createLayout) ? definition.createLayout : definition.editLayout : isManualEntry && Array.isArray(definition.manualEditLayout) ? definition.manualEditLayout : definition.editLayout;
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
    }, "\u2190 Back"), showStandaloneHeader ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-header"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-meta"
    }, definition.metaLabel || 'Collection Type'), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "admin-title"
    }, getDisplayTitle(definition, displayedRecord)), displayedRecord.status ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-status"
    }, displayedRecord.status) : null)) : null, showVersionTabs ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-tabs"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-tab${activeTab === 'draft' ? ' admin-tab--active' : ''}`,
      type: "button",
      onClick: () => onSwitchTab('draft')
    }, "DRAFT"), /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-tab${activeTab === 'published' ? ' admin-tab--active' : ''}`,
      type: "button",
      onClick: () => publishedRecord && onSwitchTab('published')
    }, "PUBLISHED")) : null, error ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "danger"
    }, error) : null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-layout"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-main-card"
    }, /*#__PURE__*/React__default.default.createElement(ProfileInfoCard, {
      definition: definition,
      record: displayedRecord
    }), definition.name === 'messages' ? /*#__PURE__*/React__default.default.createElement(MessageReplyPanel, {
      replies: Array.isArray(displayedRecord?.replies) ? displayedRecord.replies : [],
      replyDraft: replyDraft,
      onReplyChange: onReplyChange,
      onSendReply: onSendReply,
      sendingReply: sendingReply
    }) : null, activeLayout.map((row, index) => {
      const visibleFields = row.filter(field => !hiddenCardFields.has(field));
      if (!visibleFields.length) {
        return null;
      }
      return /*#__PURE__*/React__default.default.createElement("div", {
        key: `row-${index}`,
        className: "admin-section"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-field-grid"
      }, visibleFields.map(field => {
        const fieldDisabled = isPublishedView || !supportsEditing || editableFields.length > 0 && !editableFields.includes(field);
        return /*#__PURE__*/React__default.default.createElement(FieldRenderer$1, {
          definition: definition,
          key: field,
          field: field,
          value: displayedRecord[field],
          path: [field],
          onChange: onChange,
          onAddItem: onAddItem,
          onRemoveItem: onRemoveItem,
          onMoveItem: onMoveItem,
          disabled: fieldDisabled
        });
      })));
    })), /*#__PURE__*/React__default.default.createElement("aside", null, !supportsEditing ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card__head"
    }, "Entry"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card__body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-note"
    }, "Read-only record."))) : /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card__head"
    }, "Entry"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-card__body"
    }, allowPublish ? /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("div", {
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
    }, "\xD7"), "Discard changes")) : null), allowSave ? /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-button",
      type: "button",
      onClick: onSave,
      disabled: !canSave
    }, saving ? 'Saving...' : 'Save') : null) : allowSave ? /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-side-button",
      type: "button",
      onClick: onSave,
      disabled: !canSave
    }, saving ? 'Saving...' : 'Save') : /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-side-note"
    }, "No editable actions for this record."))), allowDelete ? /*#__PURE__*/React__default.default.createElement("div", {
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
    }, "Delete"))) : null)))));
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
    const [replyDraft, setReplyDraft] = React.useState({
      subject: '',
      body: ''
    });
    const [sendingReply, setSendingReply] = React.useState(false);
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
    const isManualEditableRecord = record?.entrySource === 'manual' || publishedRecord?.entrySource === 'manual';
    const canEditCurrentRecord = Boolean(definition) && (!definition.readOnly || isNew || isManualEditableRecord);
    const mode = React.useMemo(() => recordId || isNew ? 'edit' : 'list', [recordId, isNew]);
    const isDirty = React.useMemo(() => JSON.stringify(toComparableValue$1(record)) !== JSON.stringify(toComparableValue$1(originalRecord)), [record, originalRecord]);
    const hasDraftContent = React.useMemo(() => hasMeaningfulValue$1(record), [record]);
    const hasUnpublishedChanges = React.useMemo(() => JSON.stringify(toComparableValue$1(record)) !== JSON.stringify(toComparableValue$1(publishedRecord)), [record, publishedRecord]);
    const showVersionTabs = definition?.showVersionTabs !== false;
    const canSave = canEditCurrentRecord && mode === 'edit' && !saving && (!showVersionTabs || activeTab !== 'published') && isDirty;
    const canPublish = canEditCurrentRecord && mode === 'edit' && !saving && showVersionTabs && activeTab !== 'published' && (publishedRecord ? hasUnpublishedChanges : hasDraftContent);
    const canDiscard = canEditCurrentRecord && mode === 'edit' && !saving && activeTab !== 'published' && hasDraftContent;
    const canUnpublish = canEditCurrentRecord && mode === 'edit' && !saving && Boolean(publishedRecord);
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
          setReplyDraft(current => pageName === 'messages' && nextDraftRecord ? {
            subject: current.subject || `Re: Your message to The Leadenhall Works`,
            body: current.body
          } : current);
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
    React.useEffect(() => {
      if (pageName !== 'messages' || !record) {
        return;
      }
      setReplyDraft(current => ({
        subject: current.subject || 'Re: Your message to The Leadenhall Works',
        body: current.body
      }));
    }, [pageName, record]);
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
      if (!record || !canEditCurrentRecord) {
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
      if (definition?.allowCreate === false) {
        return;
      }
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
    const handleReplyChange = (field, value) => {
      setReplyDraft(current => ({
        ...current,
        [field]: value
      }));
    };
    const handleSendReply = async () => {
      if (pageName !== 'messages' || !recordId) {
        return;
      }
      setSendingReply(true);
      setError('');
      try {
        const payload = await requestPage(pageName, {
          method: 'POST',
          body: {
            intent: 'sendReply',
            recordId,
            reply: replyDraft
          }
        });
        if (payload.draftRecord) {
          const nextDraftRecord = cloneValue$1(payload.draftRecord);
          setRecord(nextDraftRecord);
          setOriginalRecord(cloneValue$1(nextDraftRecord));
        }
        if (payload.notice) {
          addNotice({
            message: payload.notice.message,
            type: payload.notice.type
          });
        }
        setReplyDraft({
          subject: replyDraft.subject || 'Re: Your message to The Leadenhall Works',
          body: ''
        });
      } catch (requestError) {
        setError(requestError.message);
        addNotice({
          message: requestError.message,
          type: 'error'
        });
      } finally {
        setSendingReply(false);
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
      canUnpublish: canUnpublish,
      replyDraft: replyDraft,
      onReplyChange: handleReplyChange,
      onSendReply: handleSendReply,
      sendingReply: sendingReply,
      isCreateMode: isNew
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
  padding: 32px 40px 64px 40px;
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
  padding: 28px 40px 48px 40px;
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
  const SIDEBAR_WIDTH = 304;
  const RAIL_WIDTH = 48;
  const STYLES = `
.admin-sidebar-shell ~ [data-css="app-content"] {
  box-sizing: border-box;
  padding-left: ${SIDEBAR_WIDTH}px;
  transition: padding-left 0.2s ease;
}

.admin-sidebar-shell.admin-sidebar-shell--rail-only ~ [data-css="app-content"] {
  padding-left: ${RAIL_WIDTH}px;
}

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
  .admin-sidebar-shell ~ [data-css="app-content"] {
    padding-left: 0;
  }

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
  function buildSidebarResourceItems(section, pathname, search) {
    return ADMIN_RESOURCE_DEFINITIONS.filter(definition => definition.sidebarSection === section).map(definition => {
      const resourcePathPrefix = `/admin/resources/${definition.table}`;
      const href = definition.sidebarHref || buildAdminResourceHref(definition.table);
      const selectedPrefixes = [href, resourcePathPrefix];
      return {
        id: definition.table,
        label: definition.sidebarLabel || definition.label,
        href,
        selected: selectedPrefixes.some(prefix => pathname.startsWith(prefix))
      };
    }).filter(resource => itemMatchesSearch(resource.label, search));
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
    const collectionItems = React.useMemo(() => buildSidebarResourceItems('collections', location.pathname, search), [location.pathname, search]);
    const operationItems = React.useMemo(() => buildSidebarResourceItems('orders', location.pathname, search), [location.pathname, search]);
    const customerItems = React.useMemo(() => buildSidebarResourceItems('customers', location.pathname, search), [location.pathname, search]);
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
    }, "Customers"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-group__count"
    }, customerItems.length)), customerItems.map(item => /*#__PURE__*/React__default.default.createElement("button", {
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
    }, "Orders"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-group__count"
    }, operationItems.length)), operationItems.map(item => /*#__PURE__*/React__default.default.createElement("button", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvcmVzb3VyY2UtZGVmaW5pdGlvbnMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbk1hbmFnZXIuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3IuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5LmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL0FjY291bnRTZXR0aW5ncy5qc3giLCIuLi9zcmMvY29tcG9uZW50cy9TaWRlYmFyLmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL0xvZ2luLmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL1RvcEJhci5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQURNSU5fUkVTT1VSQ0VfREVGSU5JVElPTlMgPSBbXG4gIHtcbiAgICB0YWJsZTogJ2Jsb2dfcG9zdHMnLFxuICAgIGxhYmVsOiAnQmxvZyBQb3N0cycsXG4gICAgc2lkZWJhckxhYmVsOiAnQmxvZyBQb3N0JyxcbiAgICBuYXZpZ2F0aW9uOiAnQ29sbGVjdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnY29sbGVjdGlvbnMnLFxuICAgIHNpZGViYXJIcmVmOiAnL2FkbWluL3BhZ2VzL2Jsb2ctcG9zdHMnLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdmYXFfaXRlbXMnLFxuICAgIGxhYmVsOiAnRkFRIEl0ZW1zJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdGQVEgSXRlbScsXG4gICAgbmF2aWdhdGlvbjogJ0NvbGxlY3Rpb25zJyxcbiAgICBzaWRlYmFyU2VjdGlvbjogJ2NvbGxlY3Rpb25zJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9mYXEtaXRlbXMnLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdtZWV0aW5nX3Jvb21zJyxcbiAgICBsYWJlbDogJ01lZXRpbmcgUm9vbXMnLFxuICAgIHNpZGViYXJMYWJlbDogJ01lZXRpbmcgUm9vbScsXG4gICAgbmF2aWdhdGlvbjogJ0NvbGxlY3Rpb25zJyxcbiAgICBzaWRlYmFyU2VjdGlvbjogJ2NvbGxlY3Rpb25zJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9tZWV0aW5nLXJvb21zJyxcbiAgfSxcbiAge1xuICAgIHRhYmxlOiAncHJpY2luZ19wbGFucycsXG4gICAgbGFiZWw6ICdQcmljaW5nIFBsYW5zJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdQcmljaW5nIFBsYW4nLFxuICAgIG5hdmlnYXRpb246ICdDb2xsZWN0aW9ucycsXG4gICAgc2lkZWJhclNlY3Rpb246ICdjb2xsZWN0aW9ucycsXG4gICAgc2lkZWJhckhyZWY6ICcvYWRtaW4vcGFnZXMvcHJpY2luZy1wbGFucycsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ2ZpbGVzJyxcbiAgICBsYWJlbDogJ01lZGlhIExpYnJhcnknLFxuICAgIHNpZGViYXJMYWJlbDogJ01lZGlhIExpYnJhcnknLFxuICAgIG5hdmlnYXRpb246ICdNZWRpYScsXG4gICAgc2lkZWJhclNlY3Rpb246IG51bGwsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ21lbWJlcl91c2VycycsXG4gICAgbGFiZWw6ICdDdXN0b21lcnMnLFxuICAgIHNpZGViYXJMYWJlbDogJ0N1c3RvbWVycycsXG4gICAgbmF2aWdhdGlvbjogJ09wZXJhdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnY3VzdG9tZXJzJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9jdXN0b21lcnMnLFxuICAgIGhpZGRlbkNvbHVtbnM6IFsncGFzc3dvcmRfaGFzaCddLFxuICAgIGxpc3RQcm9wZXJ0aWVzOiBbJ2lkJywgJ25hbWUnLCAnZW1haWwnLCAnYWNjZXNzX3N0YXR1cycsICdjcmVhdGVkX2F0J10sXG4gICAgZmlsdGVyUHJvcGVydGllczogWydpZCcsICduYW1lJywgJ2VtYWlsJywgJ2FjY2Vzc19zdGF0dXMnXSxcbiAgICByZWFkT25seTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIHRhYmxlOiAnbWVtYmVyc2hpcHMnLFxuICAgIGxhYmVsOiAnTWVtYmVyc2hpcHMnLFxuICAgIHNpZGViYXJMYWJlbDogJ01lbWJlcnNoaXBzJyxcbiAgICBuYXZpZ2F0aW9uOiAnT3BlcmF0aW9ucycsXG4gICAgc2lkZWJhclNlY3Rpb246IG51bGwsXG4gICAgbGlzdFByb3BlcnRpZXM6IFsnaWQnLCAndXNlcl9pZCcsICdwbGFuX2lkJywgJ3N0YXR1cycsICdzdHJpcGVfc3Vic2NyaXB0aW9uX2lkJywgJ3VwZGF0ZWRfYXQnXSxcbiAgICBmaWx0ZXJQcm9wZXJ0aWVzOiBbJ2lkJywgJ3VzZXJfaWQnLCAncGxhbl9pZCcsICdzdGF0dXMnLCAnc3RyaXBlX3N1YnNjcmlwdGlvbl9pZCddLFxuICAgIHJlYWRPbmx5OiB0cnVlLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdtZW1iZXJzaGlwX3BsYW5zJyxcbiAgICBsYWJlbDogJ01lbWJlcnNoaXAgUGxhbnMnLFxuICAgIHNpZGViYXJMYWJlbDogJ01lbWJlcnNoaXAgUGxhbnMnLFxuICAgIG5hdmlnYXRpb246ICdPcGVyYXRpb25zJyxcbiAgICBzaWRlYmFyU2VjdGlvbjogbnVsbCxcbiAgICBsaXN0UHJvcGVydGllczogWydpZCcsICduYW1lJywgJ3NsdWcnLCAnbW9udGhseV9wcmljZV9taW5vcicsICdjdXJyZW5jeScsICdhY3RpdmUnLCAndXBkYXRlZF9hdCddLFxuICAgIGZpbHRlclByb3BlcnRpZXM6IFsnaWQnLCAnbmFtZScsICdzbHVnJywgJ2N1cnJlbmN5JywgJ2FjdGl2ZSddLFxuICAgIHJlYWRPbmx5OiB0cnVlLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdib29raW5ncycsXG4gICAgbGFiZWw6ICdPcmRlcnMnLFxuICAgIHNpZGViYXJMYWJlbDogJ09yZGVycycsXG4gICAgbmF2aWdhdGlvbjogJ09wZXJhdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnb3JkZXJzJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9vcmRlcnMnLFxuICAgIGxpc3RQcm9wZXJ0aWVzOiBbJ2lkJywgJ3VzZXJfaWQnLCAncmVzb3VyY2VfaWQnLCAnc3RhdHVzJywgJ3N0YXJ0X2F0JywgJ3RvdGFsX21pbm9yJywgJ3VwZGF0ZWRfYXQnXSxcbiAgICBmaWx0ZXJQcm9wZXJ0aWVzOiBbJ2lkJywgJ3VzZXJfaWQnLCAncmVzb3VyY2VfaWQnLCAnc3RhdHVzJywgJ3N0YXJ0X2F0JywgJ3N0cmlwZV9wYXltZW50X3N0YXR1cyddLFxuICAgIHJlYWRPbmx5OiB0cnVlLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdyZXNvdXJjZXMnLFxuICAgIGxhYmVsOiAnQm9va2FibGUgUmVzb3VyY2VzJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdCb29rYWJsZSBSZXNvdXJjZXMnLFxuICAgIG5hdmlnYXRpb246ICdPcGVyYXRpb25zJyxcbiAgICBzaWRlYmFyU2VjdGlvbjogbnVsbCxcbiAgICBsaXN0UHJvcGVydGllczogWydpZCcsICduYW1lJywgJ3NsdWcnLCAndHlwZScsICdob3VybHlfcmF0ZV9taW5vcicsICdhY3RpdmUnLCAndXBkYXRlZF9hdCddLFxuICAgIGZpbHRlclByb3BlcnRpZXM6IFsnaWQnLCAnbmFtZScsICdzbHVnJywgJ3R5cGUnLCAnYWN0aXZlJ10sXG4gICAgcmVhZE9ubHk6IHRydWUsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ2ludm9pY2VzJyxcbiAgICBsYWJlbDogJ0ludm9pY2VzJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdJbnZvaWNlcycsXG4gICAgbmF2aWdhdGlvbjogJ09wZXJhdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnb3JkZXJzJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9pbnZvaWNlcycsXG4gICAgbGlzdFByb3BlcnRpZXM6IFsnaWQnLCAndXNlcl9pZCcsICdtZW1iZXJzaGlwX2lkJywgJ2Jvb2tpbmdfaWQnLCAnc3RhdHVzJywgJ3RvdGFsX21pbm9yJywgJ3BhaWRfYXQnXSxcbiAgICBmaWx0ZXJQcm9wZXJ0aWVzOiBbJ2lkJywgJ3VzZXJfaWQnLCAnbWVtYmVyc2hpcF9pZCcsICdib29raW5nX2lkJywgJ3N0YXR1cycsICdzdHJpcGVfaW52b2ljZV9pZCddLFxuICAgIHJlYWRPbmx5OiB0cnVlLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdjb250YWN0X3N1Ym1pc3Npb25zJyxcbiAgICBsYWJlbDogJ01lc3NhZ2VzJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdNZXNzYWdlcycsXG4gICAgbmF2aWdhdGlvbjogJ09wZXJhdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnY3VzdG9tZXJzJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9tZXNzYWdlcycsXG4gICAgbGlzdFByb3BlcnRpZXM6IFsnaWQnLCAnbmFtZScsICdlbWFpbCcsICdzb3VyY2VfcGFnZScsICdjcmVhdGVkX2F0J10sXG4gICAgZmlsdGVyUHJvcGVydGllczogWydpZCcsICduYW1lJywgJ2VtYWlsJywgJ3NvdXJjZV9wYWdlJ10sXG4gICAgcmVhZE9ubHk6IHRydWUsXG4gIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBZG1pblJlc291cmNlSHJlZihyZXNvdXJjZUlkKSB7XG4gIHJldHVybiBgL2FkbWluL3Jlc291cmNlcy8ke3Jlc291cmNlSWR9L2FjdGlvbnMvbGlzdGA7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQURNSU5fUkVTT1VSQ0VfREVGSU5JVElPTlMsIGJ1aWxkQWRtaW5SZXNvdXJjZUhyZWYgfSBmcm9tICcuLi9yZXNvdXJjZS1kZWZpbml0aW9ucy5qcyc7XG5cbmNvbnN0IFBSSU1BUllfUEFHRVMgPSBbXG4gIHsgbGFiZWw6ICdIb21lcGFnZScsIGhyZWY6ICcvYWRtaW4vcGFnZXMvaG9tZXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdBYm91dCBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9hYm91dC1wYWdlJyB9LFxuICB7IGxhYmVsOiAnUHJpY2luZyBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9wcmljaW5nLXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdDb250YWN0IFBhZ2UnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2NvbnRhY3QtcGFnZScgfSxcbl07XG5cbmNvbnN0IENPTExFQ1RJT05TID0gW1xuICB7IGxhYmVsOiAnQmxvZyBQb3N0cycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvYmxvZy1wb3N0cycgfSxcbiAgeyBsYWJlbDogJ0ZBUSBJdGVtcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvZmFxLWl0ZW1zJyB9LFxuICB7IGxhYmVsOiAnTWVldGluZyBSb29tcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvbWVldGluZy1yb29tcycgfSxcbiAgeyBsYWJlbDogJ1ByaWNpbmcgUGxhbnMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL3ByaWNpbmctcGxhbnMnIH0sXG5dO1xuXG5jb25zdCBDVVNUT01FUl9RVUlDS19PUkRFUiA9IFtcbiAgJ21lbWJlcl91c2VycycsXG4gICdjb250YWN0X3N1Ym1pc3Npb25zJyxcbl07XG5cbmNvbnN0IE9SREVSX1FVSUNLX09SREVSID0gW1xuICAnYm9va2luZ3MnLFxuICAnaW52b2ljZXMnLFxuXTtcblxuY29uc3QgQ1VTVE9NRVJTID0gQ1VTVE9NRVJfUVVJQ0tfT1JERVJcbiAgLm1hcCgocmVzb3VyY2VJZCkgPT4gQURNSU5fUkVTT1VSQ0VfREVGSU5JVElPTlMuZmluZCgoZGVmaW5pdGlvbikgPT4gZGVmaW5pdGlvbi50YWJsZSA9PT0gcmVzb3VyY2VJZCkpXG4gIC5maWx0ZXIoQm9vbGVhbilcbiAgLm1hcCgoZGVmaW5pdGlvbikgPT4gKHtcbiAgICBsYWJlbDogZGVmaW5pdGlvbi5zaWRlYmFyTGFiZWwgfHwgZGVmaW5pdGlvbi5sYWJlbCxcbiAgICBocmVmOiBkZWZpbml0aW9uLnNpZGViYXJIcmVmIHx8IGJ1aWxkQWRtaW5SZXNvdXJjZUhyZWYoZGVmaW5pdGlvbi50YWJsZSksXG4gIH0pKTtcblxuY29uc3QgT1JERVJTID0gT1JERVJfUVVJQ0tfT1JERVJcbiAgLm1hcCgocmVzb3VyY2VJZCkgPT4gQURNSU5fUkVTT1VSQ0VfREVGSU5JVElPTlMuZmluZCgoZGVmaW5pdGlvbikgPT4gZGVmaW5pdGlvbi50YWJsZSA9PT0gcmVzb3VyY2VJZCkpXG4gIC5maWx0ZXIoQm9vbGVhbilcbiAgLm1hcCgoZGVmaW5pdGlvbikgPT4gKHtcbiAgICBsYWJlbDogZGVmaW5pdGlvbi5zaWRlYmFyTGFiZWwgfHwgZGVmaW5pdGlvbi5sYWJlbCxcbiAgICBocmVmOiBkZWZpbml0aW9uLnNpZGViYXJIcmVmIHx8IGJ1aWxkQWRtaW5SZXNvdXJjZUhyZWYoZGVmaW5pdGlvbi50YWJsZSksXG4gIH0pKTtcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLWRhc2hib2FyZCB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDQwcHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pbm5lciB7XG4gIG1heC13aWR0aDogMTI0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZXllYnJvdyB7XG4gIG1hcmdpbjogMCAwIDRweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19zdWJ0aXRsZSB7XG4gIG1hcmdpbjogMTBweCAwIDI4cHg7XG4gIG1heC13aWR0aDogNzgwcHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2dyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxLjFmcikgbWlubWF4KDAsIDAuOWZyKTtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fY2FyZC1oZWFkIHtcbiAgcGFkZGluZzogMTZweCAyMHB4IDEycHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2NhcmQtYm9keSB7XG4gIHBhZGRpbmc6IDhweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9faXRlbS1jb3B5IHtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLW1ldGEge1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGNvbG9yOiAjNjY2Njg3O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLWFycm93IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbm90aWNlIHtcbiAgcGFkZGluZzogMjBweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbm90aWNlLXRpdGxlIHtcbiAgbWFyZ2luOiAwIDAgOHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX25vdGljZS1jb3B5IHtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEycHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2Uge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLW5hbWUge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtZW1haWwsXG4uYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLW1ldGEge1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1ib2R5IHtcbiAgbWFyZ2luOiAxMHB4IDAgMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1hY3Rpb25zIHtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2J1dHRvbiB7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkOWQ4ZTY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogNnB4IDEwcHg7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2J1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2J1dHRvbi0tZGFuZ2VyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmZkM2M3O1xuICBjb2xvcjogI2M3MmUzYTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fYnV0dG9uLS1kYW5nZXI6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZmZmNWYyO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19idXR0b246ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAwLjU7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2RldGFpbCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBwYWRkaW5nLXRvcDogMTJweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZGV0YWlsLWhlYWRpbmcge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMS4xMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19kZXRhaWwtYm9keSB7XG4gIG1hcmdpbjogMTBweCAwIDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19kZXRhaWwtYWN0aW9ucyB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIGdhcDogOHB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19lcnJvciB7XG4gIGNvbG9yOiAjYzcyZTNhO1xuICBtYXJnaW46IDEwcHggMCAwO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19lbXB0eSB7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLWRhc2hib2FyZCB7XG4gICAgcGFkZGluZzogMjBweCAxNnB4IDQ4cHg7XG4gIH1cblxuICAuYWRtaW4tZGFzaGJvYXJkX19ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuYDtcblxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG5mdW5jdGlvbiBmb3JtYXRTdWJtaXNzaW9uRGF0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCgnZW4tR0InLCB7XG4gICAgZGF0ZVN0eWxlOiAnbWVkaXVtJyxcbiAgICB0aW1lU3R5bGU6ICdzaG9ydCcsXG4gIH0pLmZvcm1hdChkYXRlKTtcbn1cblxuZnVuY3Rpb24gdHJpbU1lc3NhZ2UobWVzc2FnZSkge1xuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKG1lc3NhZ2UgPz8gJycpLnRyaW0oKTtcblxuICBpZiAobm9ybWFsaXplZC5sZW5ndGggPD0gMTgwKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG4gIH1cblxuICByZXR1cm4gYCR7bm9ybWFsaXplZC5zbGljZSgwLCAxNzcpLnRyaW1FbmQoKX0uLi5gO1xufVxuXG5mdW5jdGlvbiBjb2VyY2VKc29uKHJlc3BvbnNlVGV4dCkge1xuICBpZiAoIXJlc3BvbnNlVGV4dCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEFkbWluSnNvbih1cmwsIG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgIC4uLm9wdGlvbnMsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIC4uLihvcHRpb25zLmhlYWRlcnMgfHwge30pLFxuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3BvbnNlVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgY29uc3QgcGF5bG9hZCA9IGNvZXJjZUpzb24ocmVzcG9uc2VUZXh0KTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHBheWxvYWQ/LmVycm9yIHx8IHBheWxvYWQ/Lm1lc3NhZ2UgfHwgcmVzcG9uc2VUZXh0IHx8IGBSZXF1ZXN0IGZhaWxlZCAoJHtyZXNwb25zZS5zdGF0dXN9KS5gO1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVBZG1pblN1Ym1pc3Npb25QYXlsb2FkKHJlc3BvbnNlKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5kYXRhKSA/IHJlc3BvbnNlLmRhdGEgOiBbXTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplU3VibWlzc2lvblJlY29yZChyZWNvcmQpIHtcbiAgY29uc3QgcGFyYW1zID0gcmVjb3JkID8/IHt9O1xuXG4gIHJldHVybiB7XG4gICAgaWQ6IE51bWJlcihwYXJhbXMuaWQpLFxuICAgIG5hbWU6IFN0cmluZyhwYXJhbXMubmFtZSA/PyAnJyksXG4gICAgZW1haWw6IFN0cmluZyhwYXJhbXMuZW1haWwgPz8gJycpLFxuICAgIHBob25lOiBTdHJpbmcocGFyYW1zLnBob25lID8/ICcnKSxcbiAgICBtZXNzYWdlOiBTdHJpbmcocGFyYW1zLm1lc3NhZ2UgPz8gJycpLFxuICAgIHNvdXJjZVBhZ2U6IFN0cmluZyhwYXJhbXMuc291cmNlUGFnZSA/PyBwYXJhbXMuc291cmNlX3BhZ2UgPz8gJycpLFxuICAgIGNyZWF0ZWRBdDogcGFyYW1zLmNyZWF0ZWRBdCA/PyBwYXJhbXMuY3JlYXRlZF9hdCA/PyBudWxsLFxuICB9O1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVSZXNvdXJjZVN1Ym1pc3Npb25QYXlsb2FkKHJlc3BvbnNlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShyZXNwb25zZT8ucmVjb3JkcykpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2UucmVjb3Jkc1xuICAgIC5tYXAoKHJlY29yZCkgPT4gbm9ybWFsaXplU3VibWlzc2lvblJlY29yZChyZWNvcmQ/LnBhcmFtcyA/PyB7fSkpXG4gICAgLmZpbHRlcigoc3VibWlzc2lvbikgPT4gTnVtYmVyLmlzRmluaXRlKHN1Ym1pc3Npb24uaWQpKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplUmVzb3VyY2VSZWNvcmRQYXlsb2FkKHJlc3BvbnNlKSB7XG4gIGlmICghcmVzcG9uc2U/LnJlY29yZD8ucGFyYW1zKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplU3VibWlzc2lvblJlY29yZChyZXNwb25zZS5yZWNvcmQucGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVjZW50U3VibWlzc2lvbnMocHJvcHMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHM/LnJlY2VudFN1Ym1pc3Npb25zKSkge1xuICAgIHJldHVybiBwcm9wcy5yZWNlbnRTdWJtaXNzaW9ucztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzPy5kYXRhPy5yZWNlbnRTdWJtaXNzaW9ucykpIHtcbiAgICByZXR1cm4gcHJvcHMuZGF0YS5yZWNlbnRTdWJtaXNzaW9ucztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzPy5yZWNlbnRNZXNzYWdlcykpIHtcbiAgICByZXR1cm4gcHJvcHMucmVjZW50TWVzc2FnZXM7XG4gIH1cblxuICByZXR1cm4gW107XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTdWJtaXNzaW9uUGF5bG9hZChzb3VyY2UpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5yZWNlbnRTdWJtaXNzaW9ucykpIHtcbiAgICByZXR1cm4gc291cmNlLnJlY2VudFN1Ym1pc3Npb25zO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5kYXRhPy5yZWNlbnRTdWJtaXNzaW9ucykpIHtcbiAgICByZXR1cm4gc291cmNlLmRhdGEucmVjZW50U3VibWlzc2lvbnM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2U/LnBheWxvYWQ/LnJlY2VudFN1Ym1pc3Npb25zKSkge1xuICAgIHJldHVybiBzb3VyY2UucGF5bG9hZC5yZWNlbnRTdWJtaXNzaW9ucztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZT8uYm9keT8ucmVjZW50U3VibWlzc2lvbnMpKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5ib2R5LnJlY2VudFN1Ym1pc3Npb25zO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5yZXN1bHQ/LnJlY2VudFN1Ym1pc3Npb25zKSkge1xuICAgIHJldHVybiBzb3VyY2UucmVzdWx0LnJlY2VudFN1Ym1pc3Npb25zO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5yZWNlbnRNZXNzYWdlcykpIHtcbiAgICByZXR1cm4gc291cmNlLnJlY2VudE1lc3NhZ2VzO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5kYXRhPy5yZWNlbnRNZXNzYWdlcykpIHtcbiAgICByZXR1cm4gc291cmNlLmRhdGEucmVjZW50TWVzc2FnZXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2U/LmRhdGE/Lml0ZW1zKSkge1xuICAgIHJldHVybiBzb3VyY2UuZGF0YS5pdGVtcztcbiAgfVxuXG4gIHJldHVybiBbXTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplRGFzaGJvYXJkUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgY29uc3QgcGF5bG9hZCA9IHJlc3BvbnNlPy5kYXRhID8/IHJlc3BvbnNlO1xuICByZXR1cm4gcmVzb2x2ZVN1Ym1pc3Npb25QYXlsb2FkKHBheWxvYWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaERhc2hib2FyZE1lc3NhZ2VzKCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL2Rhc2hib2FyZCcsIHtcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSk7XG5cbiAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgaWYgKCFyZXNwb25zZS5vayB8fCAhdGV4dCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGxvYWQgZGFzaGJvYXJkIG1lc3NhZ2VzICgke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rhc2hib2FyZCBBUEkgcmV0dXJuZWQgYSBub24tSlNPTiByZXNwb25zZS4nKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEFkbWluTWVzc2FnZXMobGltaXQgPSA1MCkge1xuICBjb25zdCBzYWZlTGltaXQgPSBOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKGxpbWl0KSkgPyBOdW1iZXIobGltaXQpIDogNTA7XG4gIGNvbnN0IG5vcm1hbGl6ZUN1c3RvbVJlc3BvbnNlID0gKHJlc3BvbnNlKSA9PiBub3JtYWxpemVBZG1pblN1Ym1pc3Npb25QYXlsb2FkKHJlc3BvbnNlKTtcblxuICB0cnkge1xuICAgIGNvbnN0IGN1c3RvbVBheWxvYWQgPSBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9jb250YWN0LXN1Ym1pc3Npb25zP2xpbWl0PSR7c2FmZUxpbWl0fWApO1xuICAgIGNvbnN0IGN1c3RvbVN1Ym1pc3Npb25zID0gbm9ybWFsaXplQ3VzdG9tUmVzcG9uc2UoY3VzdG9tUGF5bG9hZCk7XG5cbiAgICBpZiAoY3VzdG9tU3VibWlzc2lvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY3VzdG9tU3VibWlzc2lvbnM7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUud2FybignQ3VzdG9tIGNvbnRhY3Qgc3VibWlzc2lvbnMgZW5kcG9pbnQgdW5hdmFpbGFibGU6JywgZXJyb3I/Lm1lc3NhZ2UgfHwgZXJyb3IpO1xuICB9XG5cbiAgY29uc3QgcmVzb3VyY2VQYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oYC9hZG1pbi9hcGkvcmVzb3VyY2VzL2NvbnRhY3Rfc3VibWlzc2lvbnMvYWN0aW9ucy9saXN0P3BhZ2U9MSZwZXJQYWdlPSR7c2FmZUxpbWl0fWApO1xuICByZXR1cm4gbm9ybWFsaXplUmVzb3VyY2VTdWJtaXNzaW9uUGF5bG9hZChyZXNvdXJjZVBheWxvYWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZWxldGVBZG1pblN1Ym1pc3Npb24oaWQpIHtcbiAgY29uc3QgcGFyc2VkSWQgPSBOdW1iZXIoaWQpO1xuXG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHBhcnNlZElkKSB8fCBwYXJzZWRJZCA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN1Ym1pc3Npb24gaWQuJyk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGN1c3RvbVBheWxvYWQgPSBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9jb250YWN0LXN1Ym1pc3Npb25zLyR7cGFyc2VkSWR9YCwgeyBtZXRob2Q6ICdERUxFVEUnIH0pO1xuXG4gICAgaWYgKGN1c3RvbVBheWxvYWQ/Lm9rKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGN1c3RvbVBheWxvYWQ/LmVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoY3VzdG9tUGF5bG9hZC5lcnJvcik7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBmYWxsYmFjayB0byBBZG1pbkpTIHJlc291cmNlIGVuZHBvaW50XG4gIH1cblxuICBjb25zdCByZXNvdXJjZVBheWxvYWQgPSBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9yZXNvdXJjZXMvY29udGFjdF9zdWJtaXNzaW9ucy9yZWNvcmRzLyR7cGFyc2VkSWR9L2RlbGV0ZWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICB9KTtcblxuICBpZiAocmVzb3VyY2VQYXlsb2FkPy5yZWNvcmQ/LmJhc2VFcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSByZXNvdXJjZVBheWxvYWQucmVjb3JkLmJhc2VFcnJvcj8ubWVzc2FnZSB8fCAnVW5hYmxlIHRvIGRlbGV0ZSBzdWJtaXNzaW9uLic7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG5cbiAgaWYgKHJlc291cmNlUGF5bG9hZD8ubm90aWNlPy50eXBlID09PSAnZXJyb3InKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHJlc291cmNlUGF5bG9hZC5ub3RpY2U/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byBkZWxldGUgc3VibWlzc2lvbi4nKTtcbiAgfVxuXG4gIHJldHVybjtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hBZG1pblN1Ym1pc3Npb25CeUlkKGlkKSB7XG4gIGNvbnN0IHBhcnNlZElkID0gTnVtYmVyKGlkKTtcblxuICBpZiAoIU51bWJlci5pc0Zpbml0ZShwYXJzZWRJZCkgfHwgcGFyc2VkSWQgPD0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjdXN0b21QYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oYC9hZG1pbi9hcGkvY29udGFjdC1zdWJtaXNzaW9ucy8ke3BhcnNlZElkfWApO1xuICAgIGNvbnN0IGN1c3RvbVN1Ym1pc3Npb24gPSBub3JtYWxpemVTdWJtaXNzaW9uUmVjb3JkKGN1c3RvbVBheWxvYWQ/LmRhdGE/LnJlY29yZCA/PyBjdXN0b21QYXlsb2FkPy5yZWNvcmQgPz8gY3VzdG9tUGF5bG9hZCk7XG5cbiAgICBpZiAoY3VzdG9tU3VibWlzc2lvbi5pZCA+IDApIHtcbiAgICAgIHJldHVybiBjdXN0b21TdWJtaXNzaW9uO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLndhcm4oJ1VuYWJsZSB0byBsb2FkIG1lc3NhZ2UgZnJvbSBjdXN0b20gZW5kcG9pbnQ6JywgZXJyb3I/Lm1lc3NhZ2UgfHwgZXJyb3IpO1xuICB9XG5cbiAgY29uc3QgcmVzb3VyY2VQYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oYC9hZG1pbi9hcGkvcmVzb3VyY2VzL2NvbnRhY3Rfc3VibWlzc2lvbnMvcmVjb3Jkcy8ke3BhcnNlZElkfS9zaG93YCk7XG4gIHJldHVybiBub3JtYWxpemVSZXNvdXJjZVJlY29yZFBheWxvYWQocmVzb3VyY2VQYXlsb2FkKTtcbn1cblxuZnVuY3Rpb24gU2hvcnRjdXRMaXN0KHsgdGl0bGUsIGl0ZW1zLCBuYXZpZ2F0ZSwgbWV0YSB9KSB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZC1oZWFkXCI+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtdGl0bGVcIj57dGl0bGV9PC9oMj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtYm9keVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbGlzdFwiPlxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAga2V5PXtpdGVtLmhyZWZ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9faXRlbVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShpdGVtLmhyZWYpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9faXRlbS1jb3B5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW0tbGFiZWxcIj57aXRlbS5sYWJlbH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9faXRlbS1tZXRhXCI+e21ldGF9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW0tYXJyb3dcIj7ihpI8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59XG5cbmZ1bmN0aW9uIE1lc3NhZ2VzQ2FyZCh7XG4gIHN1Ym1pc3Npb25zLFxuICBzZWxlY3RlZFN1Ym1pc3Npb24sXG4gIG9uT3BlbixcbiAgb25EZWxldGUsXG4gIGRlbGV0aW5nSWQsXG4gIG9wZXJhdGlvbkVycm9yLFxufSkge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtaGVhZFwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlXCI+Q3VzdG9tZXIgTWVzc2FnZXM8L2gyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZC1ib2R5XCI+XG4gICAgICAgIHtzdWJtaXNzaW9ucy5sZW5ndGggPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2VzXCI+XG4gICAgICAgICAgICB7c3VibWlzc2lvbnMubWFwKChzdWJtaXNzaW9uKSA9PiAoXG4gICAgICAgICAgICAgIDxhcnRpY2xlIGtleT17c3VibWlzc2lvbi5pZH0gY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtaGVhZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtbmFtZVwiPntzdWJtaXNzaW9uLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLWVtYWlsXCI+e3N1Ym1pc3Npb24uZW1haWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtzdWJtaXNzaW9uLnBob25lID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLW1ldGFcIj57c3VibWlzc2lvbi5waG9uZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLW1ldGFcIj5cbiAgICAgICAgICAgICAgICAgICAge3N1Ym1pc3Npb24uc291cmNlUGFnZX1cbiAgICAgICAgICAgICAgICAgICAge2Zvcm1hdFN1Ym1pc3Npb25EYXRlKHN1Ym1pc3Npb24uY3JlYXRlZEF0KSA/IGAgwrcgJHtmb3JtYXRTdWJtaXNzaW9uRGF0ZShzdWJtaXNzaW9uLmNyZWF0ZWRBdCl9YCA6ICcnfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLWJvZHlcIj57dHJpbU1lc3NhZ2Uoc3VibWlzc2lvbi5tZXNzYWdlKX08L3A+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19idXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk9wZW4oc3VibWlzc2lvbil9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIE9wZW5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19idXR0b24gYWRtaW4tZGFzaGJvYXJkX19idXR0b24tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uRGVsZXRlKHN1Ym1pc3Npb24pfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGVsZXRpbmdJZCA9PT0gc3VibWlzc2lvbi5pZH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2RlbGV0aW5nSWQgPT09IHN1Ym1pc3Npb24uaWQgPyAnRGVsZXRpbmfigKYnIDogJ0RlbGV0ZSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICB7c2VsZWN0ZWRTdWJtaXNzaW9uID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZGV0YWlsXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZGV0YWlsLWhlYWRpbmdcIj5TZWxlY3RlZCBtZXNzYWdlPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2RldGFpbC1ib2R5XCI+e3NlbGVjdGVkU3VibWlzc2lvbi5tZXNzYWdlfTwvcD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZGV0YWlsLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25PcGVuKG51bGwpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBDbG9zZVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2J1dHRvbiBhZG1pbi1kYXNoYm9hcmRfX2J1dHRvbi0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25EZWxldGUoc2VsZWN0ZWRTdWJtaXNzaW9uKX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2RlbGV0aW5nSWQgPT09IHNlbGVjdGVkU3VibWlzc2lvbi5pZH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2RlbGV0aW5nSWQgPT09IHNlbGVjdGVkU3VibWlzc2lvbi5pZCA/ICdEZWxldGluZ+KApicgOiAnRGVsZXRlJ31cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19lbXB0eVwiPk5vIGN1c3RvbWVyIG1lc3NhZ2VzIHlldC48L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge29wZXJhdGlvbkVycm9yID8gPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2Vycm9yXCI+e29wZXJhdGlvbkVycm9yfTwvZGl2PiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERhc2hib2FyZChwcm9wcykge1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IFtkYXNoYm9hcmRTdWJtaXNzaW9ucywgc2V0RGFzaGJvYXJkU3VibWlzc2lvbnNdID0gdXNlU3RhdGUoZ2V0UmVjZW50U3VibWlzc2lvbnMocHJvcHMpKTtcbiAgY29uc3QgW3NlbGVjdGVkU3VibWlzc2lvbiwgc2V0U2VsZWN0ZWRTdWJtaXNzaW9uXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZGVsZXRpbmdJZCwgc2V0RGVsZXRpbmdJZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW29wZXJhdGlvbkVycm9yLCBzZXRPcGVyYXRpb25FcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBpbml0aWFsU3VibWlzc2lvbnMgPSBnZXRSZWNlbnRTdWJtaXNzaW9ucyhwcm9wcyk7XG5cbiAgICBpZiAoaW5pdGlhbFN1Ym1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgc2V0RGFzaGJvYXJkU3VibWlzc2lvbnMoaW5pdGlhbFN1Ym1pc3Npb25zKTtcbiAgICB9XG4gIH0sIFtwcm9wc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzQWN0aXZlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWREYXNoYm9hcmREYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgYXNzaWduU3VibWlzc2lvbnMgPSAobmV4dFN1Ym1pc3Npb25zKSA9PiB7XG4gICAgICAgIGlmICghaXNBY3RpdmUgfHwgIUFycmF5LmlzQXJyYXkobmV4dFN1Ym1pc3Npb25zKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldERhc2hib2FyZFN1Ym1pc3Npb25zKG5leHRTdWJtaXNzaW9ucyk7XG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXNoYm9hcmRSZXNwb25zZSA9IGF3YWl0IGFwaS5nZXREYXNoYm9hcmQoKTtcbiAgICAgICAgY29uc3QgZGFzaGJvYXJkU3VibWlzc2lvbnMgPSBub3JtYWxpemVEYXNoYm9hcmRSZXNwb25zZShkYXNoYm9hcmRSZXNwb25zZSk7XG5cbiAgICAgICAgaWYgKGRhc2hib2FyZFN1Ym1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgICAgIGFzc2lnblN1Ym1pc3Npb25zKGRhc2hib2FyZFN1Ym1pc3Npb25zKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmYWxsYmFja1N1Ym1pc3Npb25zID0gYXdhaXQgZmV0Y2hBZG1pbk1lc3NhZ2VzKCk7XG4gICAgICAgIGlmIChmYWxsYmFja1N1Ym1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgICAgIGFzc2lnblN1Ym1pc3Npb25zKGZhbGxiYWNrU3VibWlzc2lvbnMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhc2hib2FyZE9ubHlQYXlsb2FkID0gYXdhaXQgZmV0Y2hEYXNoYm9hcmRNZXNzYWdlcygpO1xuICAgICAgICBjb25zdCBkYXNoYm9hcmRPbmx5U3VibWlzc2lvbnMgPSBub3JtYWxpemVEYXNoYm9hcmRSZXNwb25zZShkYXNoYm9hcmRPbmx5UGF5bG9hZCk7XG4gICAgICAgIGFzc2lnblN1Ym1pc3Npb25zKGRhc2hib2FyZE9ubHlTdWJtaXNzaW9ucyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBmYWxsYmFja1BheWxvYWQgPSBhd2FpdCBmZXRjaERhc2hib2FyZE1lc3NhZ2VzKCk7XG4gICAgICAgICAgY29uc3QgZmFsbGJhY2tTdWJtaXNzaW9ucyA9IG5vcm1hbGl6ZURhc2hib2FyZFJlc3BvbnNlKGZhbGxiYWNrUGF5bG9hZCk7XG4gICAgICAgICAgYXNzaWduU3VibWlzc2lvbnMoZmFsbGJhY2tTdWJtaXNzaW9ucyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGNhdGNoIChmYWxsYmFja0Vycm9yKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gbG9hZCBkYXNoYm9hcmQgbWVzc2FnZXM6JywgZXJyb3I/Lm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgICAgIGlmIChmYWxsYmFja0Vycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0Rhc2hib2FyZCBmYWxsYmFjayBhbHNvIGZhaWxlZDonLCBmYWxsYmFja0Vycm9yPy5tZXNzYWdlIHx8IGZhbGxiYWNrRXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkRGFzaGJvYXJkRGF0YSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzQWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHN1Ym1pc3Npb25zID0gZGFzaGJvYXJkU3VibWlzc2lvbnM7XG5cbiAgY29uc3QgaGFuZGxlT3BlblN1Ym1pc3Npb24gPSBhc3luYyAoc3VibWlzc2lvbikgPT4ge1xuICAgIHNldE9wZXJhdGlvbkVycm9yKCcnKTtcbiAgICBzZXRTZWxlY3RlZFN1Ym1pc3Npb24oc3VibWlzc2lvbik7XG5cbiAgICBpZiAoIXN1Ym1pc3Npb24/LmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGZyZXNoU3VibWlzc2lvbiA9IGF3YWl0IGZldGNoQWRtaW5TdWJtaXNzaW9uQnlJZChzdWJtaXNzaW9uLmlkKTtcblxuICAgICAgaWYgKGZyZXNoU3VibWlzc2lvbikge1xuICAgICAgICBzZXRTZWxlY3RlZFN1Ym1pc3Npb24oZnJlc2hTdWJtaXNzaW9uKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0T3BlcmF0aW9uRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byBvcGVuIHNlbGVjdGVkIG1lc3NhZ2UuJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZVN1Ym1pc3Npb24gPSBhc3luYyAoc3VibWlzc2lvbikgPT4ge1xuICAgIGlmICghc3VibWlzc2lvbj8uaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRJZCA9IE51bWJlcihzdWJtaXNzaW9uLmlkKTtcblxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHRhcmdldElkKSB8fCB0YXJnZXRJZCA8PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0RGVsZXRpbmdJZCh0YXJnZXRJZCk7XG4gICAgc2V0T3BlcmF0aW9uRXJyb3IoJycpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRlbGV0ZUFkbWluU3VibWlzc2lvbih0YXJnZXRJZCk7XG4gICAgICBzZXREYXNoYm9hcmRTdWJtaXNzaW9ucygocHJldmlvdXMpID0+IHByZXZpb3VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gdGFyZ2V0SWQpKTtcblxuICAgICAgc2V0U2VsZWN0ZWRTdWJtaXNzaW9uKChwcmV2aW91cykgPT4gKHByZXZpb3VzPy5pZCA9PT0gdGFyZ2V0SWQgPyBudWxsIDogcHJldmlvdXMpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0T3BlcmF0aW9uRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byBkZWxldGUgc3VibWlzc2lvbi4nKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0RGVsZXRpbmdJZChudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pbm5lclwiPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZXllYnJvd1wiPkhvbWU8L3A+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fdGl0bGVcIj5Db250ZW50IE1hbmFnZXI8L2gxPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fc3VidGl0bGVcIj5cbiAgICAgICAgICAgIFVzZSB0aGUgc2hvcnRjdXRzIGJlbG93IHRvIGp1bXAgaW50byBzaXRlIGNvbnRlbnQsIGN1c3RvbWVycywgb3JkZXJzLCBiaWxsaW5nLCBhbmQgaW5jb21pbmcgbWVzc2FnZXMuXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2dyaWRcIj5cbiAgICAgICAgICAgIDxTaG9ydGN1dExpc3RcbiAgICAgICAgICAgICAgdGl0bGU9XCJTaW5nbGUgVHlwZXNcIlxuICAgICAgICAgICAgICBpdGVtcz17UFJJTUFSWV9QQUdFU31cbiAgICAgICAgICAgICAgbmF2aWdhdGU9e25hdmlnYXRlfVxuICAgICAgICAgICAgICBtZXRhPVwiRWRpdCBzdHJ1Y3R1cmVkIHBhZ2UgY29udGVudFwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8U2hvcnRjdXRMaXN0XG4gICAgICAgICAgICAgIHRpdGxlPVwiQ3VzdG9tZXJzXCJcbiAgICAgICAgICAgICAgaXRlbXM9e0NVU1RPTUVSU31cbiAgICAgICAgICAgICAgbmF2aWdhdGU9e25hdmlnYXRlfVxuICAgICAgICAgICAgICBtZXRhPVwiUmV2aWV3IGN1c3RvbWVycyBhbmQgaW5jb21pbmcgbWVzc2FnZXNcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPFNob3J0Y3V0TGlzdFxuICAgICAgICAgICAgICB0aXRsZT1cIk9yZGVyc1wiXG4gICAgICAgICAgICAgIGl0ZW1zPXtPUkRFUlN9XG4gICAgICAgICAgICAgIG5hdmlnYXRlPXtuYXZpZ2F0ZX1cbiAgICAgICAgICAgICAgbWV0YT1cIlJldmlldyBvcmRlcnMgYW5kIGludm9pY2VzXCJcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxTaG9ydGN1dExpc3RcbiAgICAgICAgICAgICAgdGl0bGU9XCJDb2xsZWN0aW9uc1wiXG4gICAgICAgICAgICAgIGl0ZW1zPXtDT0xMRUNUSU9OU31cbiAgICAgICAgICAgICAgbmF2aWdhdGU9e25hdmlnYXRlfVxuICAgICAgICAgICAgICBtZXRhPVwiTWFuYWdlIHJlcGVhdGFibGUgY29udGVudFwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8TWVzc2FnZXNDYXJkXG4gICAgICAgICAgICAgIHN1Ym1pc3Npb25zPXtzdWJtaXNzaW9uc31cbiAgICAgICAgICAgICAgc2VsZWN0ZWRTdWJtaXNzaW9uPXtzZWxlY3RlZFN1Ym1pc3Npb259XG4gICAgICAgICAgICAgIG9uT3Blbj17aGFuZGxlT3BlblN1Ym1pc3Npb259XG4gICAgICAgICAgICAgIG9uRGVsZXRlPXtoYW5kbGVEZWxldGVTdWJtaXNzaW9ufVxuICAgICAgICAgICAgICBkZWxldGluZ0lkPXtkZWxldGluZ0lkfVxuICAgICAgICAgICAgICBvcGVyYXRpb25FcnJvcj17b3BlcmF0aW9uRXJyb3J9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZSwgdXNlUGFyYW1zIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IExvYWRlciwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IE1VTFRJTElORV9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fG1lc3NhZ2V8Ym9keXxzdWJ0aXRsZXxleGNlcnB0fGludHJvfGhvdXJzfGFkZHJlc3N8dGV4dHxwYXJhZ3JhcGh8b3ZlcnZpZXd8Y2hhbGxlbmdlfHJlc3VsdHxhbnN3ZXJ8bm90ZXMpL2k7XG5jb25zdCBJTUFHRV9GSUVMRF9QQVRURVJOID0gLyhpbWFnZXxjb3ZlckltYWdlfGNvbnRlbnRJbWFnZXMpL2k7XG5jb25zdCBCT09MRUFOX0ZJRUxEX1BBVFRFUk4gPSAvXihmZWF0dXJlZHxpc0ZlYXR1cmVkfGlzUG9wdWxhcikkL2k7XG5jb25zdCBGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4gPSAvKGRlc2NyaXB0aW9ufGNvbnRlbnR8YW5zd2VyfGV4Y2VycHR8Y29udGVudEltYWdlc3xjb3ZlckltYWdlfGltYWdlfGZlYXR1cmVzfGJhZGdlc3x0YWdzKSQvaTtcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLWVkaXRvciB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDQwcHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuLmFkbWluLWVkaXRvcl9faW5uZXIge1xuICBtYXgtd2lkdGg6IDEyNDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG4uYWRtaW4tYmFjayB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxNHB4O1xufVxuLmFkbWluLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cbi5hZG1pbi1tZXRhIHtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uYWRtaW4tdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMi4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tc3RhdHVzIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgLjc1cmVtO1xuICBtYXJnaW4tdG9wOiAxNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYzZmMGMyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNlZmZmZWQ7XG4gIGNvbG9yOiAjMmY2ODQ2O1xuICBmb250LXNpemU6IC44MTI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLmFkbWluLWtlYmFiIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuLmFkbWluLXRhYnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWFlYWVmO1xufVxuLmFkbWluLXRhYiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMCAwIDEycHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi10YWItLWFjdGl2ZSB7IGNvbG9yOiAjNDk0NWZmOyB9XG4uYWRtaW4tdGFiLS1hY3RpdmU6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDsgcmlnaHQ6IDA7IGJvdHRvbTogLTFweDtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG59XG4uYWRtaW4tbGF5b3V0IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwxZnIpIDIzMnB4O1xuICBnYXA6IDE2cHg7XG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcbn1cbi5hZG1pbi1tYWluLWNhcmQsLmFkbWluLXNpZGUtY2FyZCwuYWRtaW4tbGlzdC1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywzMyw1MiwuMDYpO1xufVxuLmFkbWluLW1haW4tY2FyZCB7IHBhZGRpbmc6IDI0cHg7IH1cbi5hZG1pbi1zaWRlLWNhcmQgKyAuYWRtaW4tc2lkZS1jYXJkIHsgbWFyZ2luLXRvcDogMTJweDsgfVxuLmFkbWluLXNpZGUtY2FyZF9faGVhZCB7XG4gIHBhZGRpbmc6IDE0cHggMTZweCA4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi1zaWRlLWNhcmRfX2JvZHkgeyBwYWRkaW5nOiAwIDEycHggMTJweDsgfVxuLmFkbWluLXNpZGUtbm90ZSB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG59XG4uYWRtaW4tc2lkZS1idXR0b24tcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uLC5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0OTQ1ZmY7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5OmRpc2FibGVkLFxuLmFkbWluLXByaW1hcnk6ZGlzYWJsZWQsXG4uYWRtaW4tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IGNhbGMoMTAwJSArIDhweCk7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMjIwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywzMyw1MiwuMTIpO1xuICBwYWRkaW5nOiA4cHggMDtcbiAgei1pbmRleDogNDA7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyIHtcbiAgY29sb3I6ICNkMDJiMjA7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbTpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uYWRtaW4tc2lkZS1idXR0b24tLW1lbnUge1xuICB3aWR0aDogMnJlbTtcbiAgZmxleDogMCAwIDJyZW07XG59XG4uYWRtaW4tc2VjdGlvbiArIC5hZG1pbi1zZWN0aW9uIHsgbWFyZ2luLXRvcDogMjBweDsgfVxuLmFkbWluLWZpZWxkLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLG1pbm1heCgwLDFmcikpO1xuICBnYXA6IDIwcHggMjRweDtcbn1cbi5hZG1pbi1maWVsZC0tZnVsbCB7IGdyaWQtY29sdW1uOiAxIC8gLTE7IH1cbi5hZG1pbi1wcm9maWxlLWNhcmQge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiA2cHggNnB4IDA7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMCAwIDEycHg7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19pZGVudGl0eSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgbWluLXdpZHRoOiAwO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fYXZhdGFyIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogNTJweDtcbiAgaGVpZ2h0OiA1MnB4O1xuICBmbGV4OiAwIDAgNTJweDtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzQ5NDVmZiAwJSwgIzdiNzlmZiAxMDAlKTtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGZvbnQtc2l6ZTogLjk1cmVtO1xuICBsaW5lLWhlaWdodDogMTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDhlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX2hlYWQtY29weSB7XG4gIG1pbi13aWR0aDogMDtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX3RpdGxlLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fZXllYnJvdyB7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbiAgY29sb3I6ICM3YzdjOTg7XG4gIGZvbnQtc2l6ZTogLjcycmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IC4xMmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IGNsYW1wKDEuNDVyZW0sIDIuMnZ3LCAycmVtKTtcbiAgbGluZS1oZWlnaHQ6IDEuMDI7XG4gIGxldHRlci1zcGFjaW5nOiAtLjA0ZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19ib2R5IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogMCAwIDZweDtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX2JvZHktLWN1c3RvbWVyIHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgbWlubWF4KDAsIDFmcikpO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fcm93IHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDEwcHggMTJweCA2cHg7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19pdGVtIHtcbiAgbWluLXdpZHRoOiAwO1xuICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44Mik7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19pdGVtLS1mdWxsIHtcbiAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX2xhYmVsIHtcbiAgY29sb3I6ICM3YzdjOTg7XG4gIGZvbnQtc2l6ZTogLjcycmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IC4xMmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fdmFsdWUge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjQ1O1xuICBmb250LXdlaWdodDogNjAwO1xuICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fdmFsdWUtLW11dGVkIHtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX192YWx1ZS0tbW9ubyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAuMjRyZW0gLjYycmVtO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogcmdiYSg3MywgNjksIDI1NSwgMC4wOCk7XG4gIGNvbG9yOiAjNGI0N2JlO1xuICBmb250LWZhbWlseTogdWktbW9ub3NwYWNlLCBTRk1vbm8tUmVndWxhciwgTWVubG8sIE1vbmFjbywgQ29uc29sYXMsIFwiTGliZXJhdGlvbiBNb25vXCIsIG1vbm9zcGFjZTtcbiAgZm9udC1zaXplOiAuODJyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjFyZW07XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX192YWx1ZS0tbXVsdGlsaW5lIHtcbiAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fdGV4dGJveCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBwYWRkaW5nOiAuODc1cmVtIDFyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250OiBpbmhlcml0O1xuICBsaW5lLWhlaWdodDogMS41NTtcbiAgcmVzaXplOiBub25lO1xufVxuLmFkbWluLXJlcGx5LXBhbmVsIHtcbiAgbWF4LXdpZHRoOiA2NjBweDtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlZjtcbiAgcGFkZGluZzogMThweCAyMHB4O1xufVxuLmFkbWluLXJlcGx5LXBhbmVsX190aXRsZSB7XG4gIG1hcmdpbjogMCAwIDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi1yZXBseS1wYW5lbF9fbm90ZSB7XG4gIG1hcmdpbjogMCAwIDE0cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG59XG4uYWRtaW4tcmVwbHktcGFuZWxfX2hpc3Rvcnkge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG4uYWRtaW4tcmVwbHktcGFuZWxfX2l0ZW0ge1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG4uYWRtaW4tcmVwbHktcGFuZWxfX21ldGEge1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuNzhyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjM7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cbi5hZG1pbi1yZXBseS1wYW5lbF9fc3ViamVjdCB7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IC45NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi1yZXBseS1wYW5lbF9fYm9keSB7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjlyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjY7XG4gIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcbn1cbi5hZG1pbi1yZXBseS1wYW5lbF9fZm9ybSB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTJweDtcbn1cbi5hZG1pbi1yZXBseS1wYW5lbF9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG4uYWRtaW4tbGFiZWwge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAycHg7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLmFkbWluLWxhYmVsX19yZXF1aXJlZCB7IGNvbG9yOiAjZDAyYjIwOyB9XG4uYWRtaW4taW5wdXQsLmFkbWluLXRleHRhcmVhLC5hZG1pbi1zZWFyY2gtaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgcGFkZGluZzogLjYyNXJlbSAuODc1cmVtO1xuICBmb250LXNpemU6IC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBvdXRsaW5lOiBub25lO1xufVxuLmFkbWluLWlucHV0IHsgbWluLWhlaWdodDogMi41cmVtOyB9XG4uYWRtaW4tdGV4dGFyZWEgeyBtaW4taGVpZ2h0OiA1Ljc1cmVtOyByZXNpemU6IHZlcnRpY2FsOyB9XG4uYWRtaW4taW5wdXQ6Zm9jdXMsLmFkbWluLXRleHRhcmVhOmZvY3VzLC5hZG1pbi1zZWFyY2gtaW5wdXQ6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDFweCAjNDk0NWZmO1xufVxuLmFkbWluLWlucHV0OmRpc2FibGVkLFxuLmFkbWluLXRleHRhcmVhOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tcmVwZWF0YWJsZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAxMnB4IDE2cHggMTBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fdGl0bGUgeyBmb250LXNpemU6IC43NXJlbTsgZm9udC13ZWlnaHQ6IDYwMDsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2NvdW50IHsgY29sb3I6ICM4ZThlYTk7IGZvbnQtc2l6ZTogLjc1cmVtOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbSArIC5hZG1pbi1yZXBlYXRhYmxlX19pdGVtIHsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtLS1kcmFnLW92ZXIgc3VtbWFyeSB7IGJhY2tncm91bmQ6ICNmMGYwZmY7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5IHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnk6Oi13ZWJraXQtZGV0YWlscy1tYXJrZXIgeyBkaXNwbGF5OiBub25lOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeS1sZWZ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2J1bGxldCB7XG4gIHdpZHRoOiAyMHB4OyBoZWlnaHQ6IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBiYWNrZ3JvdW5kOiAjZjBmMGY1O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IC42MjVyZW07XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fbmFtZSB7IGZvbnQtc2l6ZTogLjg3NXJlbTsgZm9udC13ZWlnaHQ6IDYwMDsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDEwcHg7XG4gIGNvbG9yOiAjOGU4ZWE5O1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2ljb24tYnV0dG9uIHtcbiAgYm9yZGVyOiAwOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgY29sb3I6IGluaGVyaXQ7IGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZSB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IGdyYWI7XG4gIHBhZGRpbmc6IDAgMnB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmFjdGl2ZSB7IGN1cnNvcjogZ3JhYmJpbmc7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZTpkaXNhYmxlZCB7XG4gIGNvbG9yOiAjYzRjNGQyO1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2ljb24tYnV0dG9uOmRpc2FibGVkLFxuLmFkbWluLXJlcGVhdGFibGVfX2FkZDpkaXNhYmxlZCB7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2JvZHkgeyBwYWRkaW5nOiAxNnB4OyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IC44NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2ltYWdlLXByZXZpZXcge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2ltYWdlLXByZXZpZXcgLmFkbWluLW1lZGlhX190aHVtYiB7XG4gIG1heC13aWR0aDogMjgwcHg7XG4gIG1heC1oZWlnaHQ6IDE4MHB4O1xufVxuLmFkbWluLXRvZ2dsZSB7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAuNjI1cmVtIC44NzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cbi5hZG1pbi1maWVsZC0tYm9vbGVhbiAuYWRtaW4tdG9nZ2xlIHtcbiAgd2lkdGg6IGF1dG87XG4gIG1pbi13aWR0aDogMTgwcHg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgZ2FwOiAxMHB4O1xufVxuLmFkbWluLXRvZ2dsZTpoYXMoaW5wdXQ6ZGlzYWJsZWQpIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG4uYWRtaW4tbWVkaWEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG4uYWRtaW4tbWVkaWFfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDE0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuLmFkbWluLW1lZGlhX19zdGFjayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xufVxuLmFkbWluLW1lZGlhX190aHVtYiB7XG4gIG1heC13aWR0aDogMjQwcHg7XG4gIG1heC1oZWlnaHQ6IDE0MHB4O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5hZG1pbi1tZWRpYV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogNHB4O1xufVxuLmFkbWluLW1lZGlhX19hY3Rpb24ge1xuICB3aWR0aDogMnJlbTsgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG4uYWRtaW4tbWVkaWFfX2FjdGlvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLW1lZGlhX19maWxlbmFtZSB7IGNvbG9yOiAjNjY2Njg3OyBmb250LXNpemU6IC43NXJlbTsgfVxuLmFkbWluLW1lZGlhX19zb3VyY2UgeyBtYXJnaW4tdG9wOiAxMHB4OyB9XG4uYWRtaW4tbWVkaWFfX3NvdXJjZS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbn1cbi5hZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvbiB7XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1tZWRpYV9fZXJyb3Ige1xuICBjb2xvcjogI2QwMmIyMDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbn1cbi5hZG1pbi1saXN0LXRvb2xiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cbi5hZG1pbi1saXN0LWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEycHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uYWRtaW4tc2VhcmNoLXdyYXAgeyB3aWR0aDogMjgwcHg7IH1cbi5hZG1pbi1saXN0LW1ldGEge1xuICBtYXJnaW46IDEycHggMCAzMnB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG4uYWRtaW4tdG9vbGJhci1jbHVzdGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uYWRtaW4tdG9vbGJhci1idXR0b24ge1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIHBhZGRpbmc6IDAgMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXRvb2xiYXItYnV0dG9uLS1pY29uIHtcbiAgd2lkdGg6IDIuNXJlbTtcbiAgcGFkZGluZzogMDtcbn1cbi5hZG1pbi10b29sYmFyLWJ1dHRvbi0tYWN0aXZlIHtcbiAgYm9yZGVyLWNvbG9yOiAjNDk0NWZmO1xuICBjb2xvcjogIzQ5NDVmZjtcbn1cbi5hZG1pbi10b29sYmFyLXNlYXJjaCB7XG4gIHdpZHRoOiAyODBweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAgMC44NzVyZW07XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IGNhbGMoMTAwJSArIDhweCk7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMzIwcHg7XG4gIG1heC1oZWlnaHQ6IDQyMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDEycHggMzJweCByZ2JhKDMzLDMzLDUyLC4xMik7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIHotaW5kZXg6IDIwO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNHB4O1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fdGl0bGUge1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19yZXNldCB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19ncm91cCArIC5hZG1pbi1saXN0LXBvcG92ZXJfX2dyb3VwIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX2xhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX3NlbGVjdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fY2hlY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDhweCAwO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fY2hlY2sgaW5wdXQge1xuICB3aWR0aDogMS4yNXJlbTtcbiAgaGVpZ2h0OiAxLjI1cmVtO1xufVxuLmFkbWluLWxpc3QtY2FyZF9faGVhZCB7XG4gIHBhZGRpbmc6IDE2cHggMjBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG59XG4uYWRtaW4tbGlzdC10YWJsZSB0aCB7XG4gIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLWxpc3QtdGFibGUgdGQge1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBmb250LXNpemU6IC44NzVyZW07XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG4uYWRtaW4tbGlzdC1yb3ctbWVudS1jZWxsIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNDRweDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51LXRyaWdnZXIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogY2FsYygxMDAlIC0gNnB4KTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAyMjBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDEycHggMzJweCByZ2JhKDMzLDMzLDUyLC4xMik7XG4gIHBhZGRpbmc6IDhweCAwO1xuICB6LWluZGV4OiAyNDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pdGVtOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pdGVtLS1kYW5nZXIge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uYWRtaW4tbGlzdC10YWJsZSB0aCBidXR0b24ge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAwO1xuICBjb2xvcjogaW5oZXJpdDtcbiAgZm9udDogaW5oZXJpdDtcbiAgdGV4dC10cmFuc2Zvcm06IGluaGVyaXQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHRyIHsgY3Vyc29yOiBwb2ludGVyOyB9XG4uYWRtaW4tbGlzdC10YWJsZSB0cjpob3ZlciB7IGJhY2tncm91bmQ6ICNmYWZhZmI7IH1cbi5hZG1pbi1saXN0LXN0YXR1cyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAxLjc1cmVtO1xuICBwYWRkaW5nOiAwIC42MjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBiYWNrZ3JvdW5kOiAjZWZmZmVkO1xuICBjb2xvcjogIzJmNjg0NjtcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4tbGlzdC1zdGF0dXMtLW1hbnVhbCB7XG4gIGJhY2tncm91bmQ6IHJnYmEoNzMsIDY5LCAyNTUsIDAuMTIpO1xuICBjb2xvcjogIzQ5NDVmZjtcbn1cbi5hZG1pbi1wcmltYXJ5IHtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgcGFkZGluZzogMCAuODc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDk0NWZmO1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IC44MTI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tc2Vjb25kYXJ5IHtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgcGFkZGluZzogMCAuODc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IC44MTI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tbGlzdC1ib29sZWFuIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMXJlbTtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgZm9udC1zaXplOiAwLjYyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi1saXN0LWJvb2xlYW4tLXllcyB7XG4gIGJhY2tncm91bmQ6ICMyZjY4NDY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmFkbWluLWxpc3QtYm9vbGVhbi0tbm8ge1xuICBiYWNrZ3JvdW5kOiAjZDAyYjIwO1xuICBjb2xvcjogI2ZmZjtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiAxMTgwcHgpIHtcbiAgLmFkbWluLWxheW91dCB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLWVkaXRvciB7IHBhZGRpbmc6IDIwcHggMTZweCA0OHB4OyB9XG4gIC5hZG1pbi1maWVsZC1ncmlkIHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IH1cbiAgLmFkbWluLXByb2ZpbGUtY2FyZCB7XG4gICAgcGFkZGluZzogNHB4IDRweCAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIH1cbiAgLmFkbWluLXByb2ZpbGUtY2FyZF9faGVhZCB7IHBhZGRpbmctYm90dG9tOiAxMHB4OyB9XG4gIC5hZG1pbi1wcm9maWxlLWNhcmRfX2lkZW50aXR5IHsgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7IH1cbiAgLmFkbWluLXByb2ZpbGUtY2FyZF9fYXZhdGFyIHtcbiAgICB3aWR0aDogNDhweDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgZmxleC1iYXNpczogNDhweDtcbiAgICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICAgIGZvbnQtc2l6ZTogLjlyZW07XG4gIH1cbiAgLmFkbWluLXByb2ZpbGUtY2FyZF9fYm9keSxcbiAgLmFkbWluLXByb2ZpbGUtY2FyZF9fYm9keS0tY3VzdG9tZXIgeyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjsgZ2FwOiAxMHB4OyB9XG4gIC5hZG1pbi1saXN0LXRvb2xiYXIgeyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBhbGlnbi1pdGVtczogc3RyZXRjaDsgfVxuICAuYWRtaW4tc2VhcmNoLXdyYXAgeyB3aWR0aDogMTAwJTsgfVxufVxuYDtcblxuZnVuY3Rpb24gdG9MYWJlbChuYW1lKSB7XG4gIHJldHVybiBuYW1lXG4gICAgLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csICckMSAkMicpXG4gICAgLnJlcGxhY2UoL1tfLV0rL2csICcgJylcbiAgICAucmVwbGFjZSgvXFxiZmFxXFxiL2dpLCAnRkFRJylcbiAgICAucmVwbGFjZSgvXi4vLCAodikgPT4gdi50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gY2xvbmVWYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xufVxuXG5mdW5jdGlvbiBnZXRFbXB0eUl0ZW0oc2FtcGxlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNhbXBsZSkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoc2FtcGxlICYmIHR5cGVvZiBzYW1wbGUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIE9iamVjdC5rZXlzKHNhbXBsZSlcbiAgICAgICAgLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgaWYgKFsnaWQnLCAnZG9jdW1lbnRJZCcsICdzdGF0dXMnLCAndXBkYXRlZEF0JywgJ3B1Ymxpc2hlZEF0J10uaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIFtrZXksIHNhbXBsZVtrZXldID8/IG51bGxdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBba2V5LCBnZXRFbXB0eUl0ZW0oc2FtcGxlW2tleV0pXTtcbiAgICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2FtcGxlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHNhbXBsZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gdG9Db21wYXJhYmxlVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoaXRlbSkgPT4gdG9Db21wYXJhYmxlVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpXG4gICAgICAuc29ydCgpXG4gICAgICAuZmlsdGVyKChrZXkpID0+ICFbJ3VwZGF0ZWRBdCcsICdwdWJsaXNoZWRBdCcsICdzdGF0dXMnXS5pbmNsdWRlcyhrZXkpKVxuICAgICAgLnJlZHVjZSgoYWNjdW11bGF0b3IsIGtleSkgPT4ge1xuICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gdG9Db21wYXJhYmxlVmFsdWUodmFsdWVba2V5XSk7XG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaGFzTWVhbmluZ2Z1bFZhbHVlKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5zb21lKChpdGVtKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModmFsdWUpXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4gIVsnaWQnLCAnZG9jdW1lbnRJZCcsICd1cGRhdGVkQXQnLCAncHVibGlzaGVkQXQnLCAnc3RhdHVzJ10uaW5jbHVkZXMoa2V5KSlcbiAgICAgIC5zb21lKChbLCBuZXN0ZWRWYWx1ZV0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShuZXN0ZWRWYWx1ZSkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZSAhPSBudWxsO1xufVxuXG5mdW5jdGlvbiBidWlsZEFkbWluUGF0aChwYXRobmFtZSwgcGFyYW1zKSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBPYmplY3QuZW50cmllcyhwYXJhbXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgc2VhcmNoUGFyYW1zLnNldChrZXksIFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgcmV0dXJuIGAke3BhdGhuYW1lfSR7cXVlcnlTdHJpbmcgPyBgPyR7cXVlcnlTdHJpbmd9YCA6ICcnfWA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGlzcGxheWVkRmllbGRzKHZhbHVlKSB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUgPz8gJycpXG4gICAgLnNwbGl0KCcsJylcbiAgICAubWFwKChmaWVsZCkgPT4gZmllbGQudHJpbSgpKVxuICAgIC5maWx0ZXIoQm9vbGVhbik7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSW5wdXRWYWx1ZShuZXh0UmF3VmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGN1cnJlbnRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAobmV4dFJhd1ZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0UmF3VmFsdWUpO1xuICAgIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkKSA/IGN1cnJlbnRWYWx1ZSA6IHBhcnNlZDtcbiAgfVxuICByZXR1cm4gbmV4dFJhd1ZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0pIHtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgaWYgKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIFN0cmluZyhpdGVtLnRleHQgPz8gJycpO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBnZXRNZWRpYURpc3BsYXlOYW1lKHZhbHVlLCBmYWxsYmFjayA9ICdVcGxvYWRlZCBpbWFnZScpIHtcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlID8/ICcnKS50cmltKCk7XG5cbiAgaWYgKCFyYXcpIHtcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkID0gcmF3LnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcbiAgY29uc3QgcGFydHMgPSBub3JtYWxpemVkLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMV0gfHwgZmFsbGJhY2s7XG59XG5cbmZ1bmN0aW9uIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sIG5leHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG5leHRWYWx1ZTtcbiAgfVxuXG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5pdGVtLFxuICAgICAgdGV4dDogbmV4dFZhbHVlLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyB0ZXh0OiBuZXh0VmFsdWUgfTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZU1lZGlhUHJldmlld1VybCh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuXG4gIGlmICghbm9ybWFsaXplZCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmICgvXmh0dHBzPzpcXC9cXC8vaS50ZXN0KG5vcm1hbGl6ZWQpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG4gIH1cblxuICBpZiAobm9ybWFsaXplZC5zdGFydHNXaXRoKCcvLycpKSB7XG4gICAgcmV0dXJuIGBodHRwczoke25vcm1hbGl6ZWR9YDtcbiAgfVxuXG4gIGlmIChub3JtYWxpemVkLnN0YXJ0c1dpdGgoJy91cGxvYWRzLycpIHx8IG5vcm1hbGl6ZWQuc3RhcnRzV2l0aCgnL2FkbWluLWFzc2V0cy8nKSkge1xuICAgIHJldHVybiBgaHR0cDovL2xvY2FsaG9zdDozMDAxJHtub3JtYWxpemVkfWA7XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplZDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXRQYXRoKHZhbHVlLCBwYXRoLCBuZXh0VmFsdWUpIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXh0VmFsdWU7XG4gIH1cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gdXBkYXRlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRWYWx1ZSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoKSB7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmZpbHRlcigoXywgaW5kZXgpID0+IGluZGV4ICE9PSBwYXRoWzBdKSA6IHZhbHVlO1xuICB9XG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IHJlbW92ZUF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0KTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRBdFBhdGgodmFsdWUsIHBhdGgsIG5leHRJdGVtKSB7XG4gIGlmICghcGF0aC5sZW5ndGgpIHtcbiAgICByZXR1cm4gWy4uLihBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW10pLCBuZXh0SXRlbV07XG4gIH1cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gYXBwZW5kQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRJdGVtKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoLCBvZmZzZXQpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gcGF0aFswXTtcbiAgICBjb25zdCBuZXh0SW5kZXggPSBpbmRleCArIG9mZnNldDtcblxuICAgIGlmIChuZXh0SW5kZXggPCAwIHx8IG5leHRJbmRleCA+PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9uZSA9IFsuLi52YWx1ZV07XG4gICAgY29uc3QgW21vdmVkXSA9IGNsb25lLnNwbGljZShpbmRleCwgMSk7XG4gICAgY2xvbmUuc3BsaWNlKG5leHRJbmRleCwgMCwgbW92ZWQpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IG1vdmVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgb2Zmc2V0KTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5VGl0bGUoZGVmaW5pdGlvbiwgcmVjb3JkKSB7XG4gIGlmICghcmVjb3JkKSB7XG4gICAgcmV0dXJuIGRlZmluaXRpb24ubGFiZWw7XG4gIH1cbiAgcmV0dXJuIHJlY29yZFtkZWZpbml0aW9uLnRpdGxlRmllbGRdIHx8IGRlZmluaXRpb24ubGFiZWw7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdE1vbmV5VmFsdWUodmFsdWUsIGN1cnJlbmN5KSB7XG4gIGNvbnN0IGFtb3VudCA9IE51bWJlcih2YWx1ZSA/PyAwKTtcbiAgY29uc3Qgc2FmZUN1cnJlbmN5ID0gU3RyaW5nKGN1cnJlbmN5IHx8ICdHQlAnKS50b1VwcGVyQ2FzZSgpO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tR0InLCB7XG4gICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgIGN1cnJlbmN5OiBzYWZlQ3VycmVuY3ksXG4gICAgfSkuZm9ybWF0KGFtb3VudCAvIDEwMCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBgJHtzYWZlQ3VycmVuY3l9ICR7KGFtb3VudCAvIDEwMCkudG9GaXhlZCgyKX1gO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFByb2ZpbGVEaXNwbGF5VmFsdWUoZGVmaW5pdGlvbiwgZmllbGQsIHJhd1ZhbHVlLCByZWNvcmQpIHtcbiAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gdHlwZW9mIHJhd1ZhbHVlID09PSAnc3RyaW5nJyA/IHJhd1ZhbHVlLnRyaW0oKSA6IHJhd1ZhbHVlO1xuXG4gIGlmIChub3JtYWxpemVkVmFsdWUgPT09ICcnIHx8IG5vcm1hbGl6ZWRWYWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuICdOb3Qgc2V0JztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGRlZmluaXRpb24/Lm1vbmV5RmllbGRzKSAmJiBkZWZpbml0aW9uLm1vbmV5RmllbGRzLmluY2x1ZGVzKGZpZWxkKSkge1xuICAgIHJldHVybiBmb3JtYXRNb25leVZhbHVlKHJhd1ZhbHVlLCByZWNvcmQ/LmN1cnJlbmN5KTtcbiAgfVxuXG4gIGlmIChcbiAgICB0eXBlb2YgcmF3VmFsdWUgPT09ICdzdHJpbmcnXG4gICAgJiYgL14oc3RhdHVzfC4qU3RhdHVzfGJvb2tpbmdUeXBlfHJlc291cmNlVHlwZXxhY2Nlc3NTdGF0dXMpJC9pLnRlc3QoZmllbGQpXG4gICkge1xuICAgIHJldHVybiByYXdWYWx1ZVxuICAgICAgLnJlcGxhY2UoL1tfLV0rL2csICcgJylcbiAgICAgIC5yZXBsYWNlKC9cXGJcXHcvZywgKGxldHRlcikgPT4gbGV0dGVyLnRvVXBwZXJDYXNlKCkpO1xuICB9XG5cbiAgcmV0dXJuIFN0cmluZyhyYXdWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGlzQmxvZ0Rpc2FibGVkRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpIHtcbiAgcmV0dXJuIGRlZmluaXRpb24/Lm5hbWUgPT09ICdibG9nLXBvc3RzJyAmJiBmaWVsZCA9PT0gJ2ZlYXR1cmVkJztcbn1cblxuZnVuY3Rpb24gaXNGYXFEaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIHJldHVybiBkZWZpbml0aW9uPy5uYW1lID09PSAnZmFxLWl0ZW1zJyAmJiBmaWVsZCA9PT0gJ2lzRmVhdHVyZWQnO1xufVxuXG5mdW5jdGlvbiBpc01lZXRpbmdSb29tRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZCkge1xuICByZXR1cm4gZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ21lZXRpbmctcm9vbXMnICYmIGZpZWxkID09PSAnaXNGZWF0dXJlZCc7XG59XG5cbmZ1bmN0aW9uIGlzVmlzaWJpbGl0eVRvZ2dsZUZpZWxkKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIHJldHVybiBpc0Jsb2dEaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKVxuICAgIHx8IGlzRmFxRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZClcbiAgICB8fCBpc01lZXRpbmdSb29tRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZCk7XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkRGlzcGxheUxhYmVsKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIGlmIChpc1Zpc2liaWxpdHlUb2dnbGVGaWVsZChkZWZpbml0aW9uLCBmaWVsZCkpIHtcbiAgICByZXR1cm4gJ1Zpc2liaWxpdHknO1xuICB9XG5cbiAgcmV0dXJuIHRvTGFiZWwoZmllbGQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0UGFnZShwYWdlTmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSA/PyB7fSk7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYC9hZG1pbi9hcGkvcGFnZXMvJHtwYWdlTmFtZX0ke3F1ZXJ5U3RyaW5nID8gYD8ke3F1ZXJ5U3RyaW5nfWAgOiAnJ31gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QgPz8gJ0dFVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IG9wdGlvbnMuYm9keSA/IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYm9keSkgOiB1bmRlZmluZWQsXG4gICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICB9LFxuICApO1xuXG4gIGNvbnN0IHJlc3BvbnNlVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgbGV0IHBheWxvYWQgPSBudWxsO1xuXG4gIHRyeSB7XG4gICAgcGF5bG9hZCA9IHJlc3BvbnNlVGV4dCA/IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KSA6IHt9O1xuICB9IGNhdGNoIHtcbiAgICBwYXlsb2FkID0gbnVsbDtcbiAgfVxuXG4gIGlmICghcmVzcG9uc2Uub2sgfHwgIXBheWxvYWQpIHtcbiAgICBjb25zdCB0cmltbWVkVGV4dCA9IHJlc3BvbnNlVGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBpc0h0bWwgPSB0cmltbWVkVGV4dC5zdGFydHNXaXRoKCc8IWRvY3R5cGUnKSB8fCB0cmltbWVkVGV4dC5zdGFydHNXaXRoKCc8aHRtbCcpO1xuICAgIGNvbnN0IHJlZGlyZWN0ZWRUb0xvZ2luID0gcmVzcG9uc2UucmVkaXJlY3RlZCAmJiByZXNwb25zZS51cmwuaW5jbHVkZXMoJy9hZG1pbi9sb2dpbicpO1xuICAgIGNvbnN0IGlzQXV0aEVycm9yID0gcmVzcG9uc2Uuc3RhdHVzID09PSA0MDEgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSA0MDMgfHwgcmVkaXJlY3RlZFRvTG9naW47XG5cbiAgICBpZiAoaXNBdXRoRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91ciBhZG1pbiBzZXNzaW9uIGV4cGlyZWQuIFJlZnJlc2ggYW5kIHNpZ24gaW4gYWdhaW4uJyk7XG4gICAgfVxuXG4gICAgaWYgKHBheWxvYWQ/Lm1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGlmIChwYXlsb2FkPy5lcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQuZXJyb3IpO1xuICAgIH1cblxuICAgIGlmIChpc0h0bWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2VydmVyIHJldHVybmVkIGFuIEhUTUwgZXJyb3IgcGFnZSAoJHtyZXNwb25zZS5zdGF0dXMgfHwgJ3Vua25vd24nfSkuIENoZWNrIGJhY2tlbmQgbG9ncy5gKTtcbiAgICB9XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlcXVlc3QgZmFpbGVkICgke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcignUmVxdWVzdCBmYWlsZWQuJyk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkQWRtaW5JbWFnZShmaWxlKSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvbWVkaWEvdXBsb2FkJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvciB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgfVxuXG4gIGNvbnN0IHVwbG9hZGVkVXJsID0gcGF5bG9hZD8udXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnJlbGF0aXZlVXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnVybDtcblxuICBpZiAoIXVwbG9hZGVkVXJsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgc3VjY2VlZGVkIGJ1dCByZXR1cm5lZCBubyBVUkwuJyk7XG4gIH1cblxuICByZXR1cm4gdXBsb2FkZWRVcmw7XG59XG5cbmNvbnN0IE1FRElBX1BJQ0tFUl9FVkVOVCA9ICdhZG1pbmpzLW1lZGlhLXNlbGVjdCc7XG5cbmZ1bmN0aW9uIGNob29zZUFkbWluTGlicmFyeUltYWdlKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGlja2VyV2luZG93ID0gd2luZG93Lm9wZW4oXG4gICAgICAnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnk/cGlja2VyPTEnLFxuICAgICAgJ2FkbWluLW1lZGlhLWxpYnJhcnktcGlja2VyJyxcbiAgICAgICdwb3B1cD15ZXMsd2lkdGg9MTQ0MCxoZWlnaHQ9OTAwLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMnLFxuICAgICk7XG5cbiAgICBpZiAoIXBpY2tlcldpbmRvdykge1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcignTWVkaWEgbGlicmFyeSBwb3B1cCB3YXMgYmxvY2tlZC4nKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGNsb3NlV2F0Y2hlcik7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgZXZlbnQuc291cmNlICE9PSBwaWNrZXJXaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuZGF0YT8udHlwZSAhPT0gTUVESUFfUElDS0VSX0VWRU5UKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgY2xlYW51cCgpO1xuICAgICAgcmVzb2x2ZSh0eXBlb2YgZXZlbnQuZGF0YS51cmwgPT09ICdzdHJpbmcnID8gZXZlbnQuZGF0YS51cmwgOiAnJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsb3NlV2F0Y2hlciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAocGlja2VyV2luZG93LmNsb3NlZCAmJiAhZmluaXNoZWQpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgIH1cbiAgICB9LCA1MDApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIE1lZGlhRmllbGQoeyBsYWJlbCwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IHVybHMgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXS5maWx0ZXIoQm9vbGVhbik7XG4gIGNvbnN0IGZpbGVJbnB1dFJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW3VwbG9hZGluZywgc2V0VXBsb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3VwbG9hZEVycm9yLCBzZXRVcGxvYWRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fY2FudmFzXCI+XG4gICAgICAgICAge3VybHMubGVuZ3RoID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc3RhY2tcIj5cbiAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdGh1bWJcIiBzcmM9e3VybHNbMF19IGFsdD17bGFiZWx9IC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4odXJsc1swXSwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyl9PuKGlzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHBhdGgsIEFycmF5LmlzQXJyYXkodmFsdWUpID8gW10gOiAnJyl9PuKclTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fZmlsZW5hbWVcIj57Z2V0TWVkaWFEaXNwbGF5TmFtZSh1cmxzWzBdKX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2Pk5vIG1lZGlhIHNlbGVjdGVkLjwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2VcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVXJsID0gYXdhaXQgY2hvb3NlQWRtaW5MaWJyYXJ5SW1hZ2UoKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZFVybCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBbLi4udmFsdWUsIHNlbGVjdGVkVXJsXSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBzZWxlY3RlZFVybCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gY2hvb3NlIGltYWdlIGZyb20gbWVkaWEgbGlicmFyeS4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIENob29zZSBmcm9tIG1lZGlhIGxpYnJhcnlcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxuICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICBtdWx0aXBsZT17QXJyYXkuaXNBcnJheSh2YWx1ZSl9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17YXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5maWxlcyA/PyBbXSk7XG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmxzID0gW107XG4gICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmwgPSBhd2FpdCB1cGxvYWRBZG1pbkltYWdlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB1cGxvYWRlZFVybHMucHVzaCh1cGxvYWRlZFVybCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBbLi4udmFsdWUsIC4uLnVwbG9hZGVkVXJsc10pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UocGF0aCwgdXBsb2FkZWRVcmxzWzBdIHx8ICcnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dXBsb2FkRXJyb3IgPyA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lcnJvclwiPnt1cGxvYWRFcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBQcmltaXRpdmVGaWVsZCh7IGRlZmluaXRpb24sIGZpZWxkLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSBnZXRGaWVsZERpc3BsYXlMYWJlbChkZWZpbml0aW9uLCBmaWVsZCk7XG4gIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBBcnJheS5pc0FycmF5KGRlZmluaXRpb24/LnNlbGVjdEZpZWxkcz8uW2ZpZWxkXSkgPyBkZWZpbml0aW9uLnNlbGVjdEZpZWxkc1tmaWVsZF0gOiBudWxsO1xuICBjb25zdCBpbnB1dFR5cGUgPSBkZWZpbml0aW9uPy5pbnB1dFR5cGVzPy5bZmllbGRdIHx8ICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gJ251bWJlcicgOiAndGV4dCcpO1xuXG4gIGlmIChJTUFHRV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpKSB7XG4gICAgcmV0dXJuIDxNZWRpYUZpZWxkIGxhYmVsPXtsYWJlbH0gdmFsdWU9e3ZhbHVlfSBwYXRoPXtwYXRofSBvbkNoYW5nZT17b25DaGFuZ2V9IGRpc2FibGVkPXtkaXNhYmxlZH0gLz47XG4gIH1cblxuICBpZiAoQk9PTEVBTl9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpKSB7XG4gICAgY29uc3QgaXNEaXNhYmxlZEZpZWxkID0gaXNWaXNpYmlsaXR5VG9nZ2xlRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWJvb2xlYW5cIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+e2xhYmVsfTwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tdG9nZ2xlXCI+XG4gICAgICAgICAgPHNwYW4+e2lzRGlzYWJsZWRGaWVsZCA/ICdIaWRlIG9uIHdlYnNpdGUnIDogKHZhbHVlID8gJ0FjdGl2ZScgOiAnRGlzYWJsZWQnKX08L3NwYW4+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e0Jvb2xlYW4odmFsdWUpfSBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIGV2ZW50LnRhcmdldC5jaGVja2VkKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgY2xhc3NOYW1lID0gRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpID8gJ2FkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsJyA6ICdhZG1pbi1maWVsZCc7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICB7bGFiZWx9XG4gICAgICAgIHtmaWVsZCAhPT0gJ3NvcnRPcmRlcicgJiYgIUJPT0xFQU5fRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSA/IDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsX19yZXF1aXJlZFwiPio8L3NwYW4+IDogbnVsbH1cbiAgICAgIDwvbGFiZWw+XG4gICAgICB7c2VsZWN0T3B0aW9ucyA/IChcbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWUgPz8gJyd9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgID5cbiAgICAgICAgICB7c2VsZWN0T3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdGlvbi52YWx1ZX0gdmFsdWU9e29wdGlvbi52YWx1ZX0+e29wdGlvbi5sYWJlbH08L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICApIDogTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkgPyAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXRleHRhcmVhXCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWUgPz8gJyd9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1pbnB1dFwiXG4gICAgICAgICAgdHlwZT17aW5wdXRUeXBlfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZSA/PyAnJ31cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgcGFyc2VJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSwgdmFsdWUpKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFByb2ZpbGVJbmZvQ2FyZCh7IGRlZmluaXRpb24sIHJlY29yZCB9KSB7XG4gIGNvbnN0IGluZm9DYXJkRmllbGRzID0gQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmluZm9DYXJkRmllbGRzKSA/IGRlZmluaXRpb24uaW5mb0NhcmRGaWVsZHMgOiBbXTtcbiAgY29uc3QgaW5mb0NhcmRCbG9ja0ZpZWxkcyA9IEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5pbmZvQ2FyZEJsb2NrRmllbGRzKSA/IGRlZmluaXRpb24uaW5mb0NhcmRCbG9ja0ZpZWxkcyA6IFtdO1xuICBjb25zdCBvcHRpb25hbEluZm9DYXJkRmllbGRzID0gbmV3IFNldChBcnJheS5pc0FycmF5KGRlZmluaXRpb24ub3B0aW9uYWxJbmZvQ2FyZEZpZWxkcykgPyBkZWZpbml0aW9uLm9wdGlvbmFsSW5mb0NhcmRGaWVsZHMgOiBbXSk7XG4gIGNvbnN0IG9wdGlvbmFsSW5mb0NhcmRCbG9ja0ZpZWxkcyA9IG5ldyBTZXQoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLm9wdGlvbmFsSW5mb0NhcmRCbG9ja0ZpZWxkcykgPyBkZWZpbml0aW9uLm9wdGlvbmFsSW5mb0NhcmRCbG9ja0ZpZWxkcyA6IFtdKTtcbiAgY29uc3QgdGl0bGVGaWVsZCA9IGRlZmluaXRpb24uaW5mb0NhcmRUaXRsZUZpZWxkIHx8IGRlZmluaXRpb24udGl0bGVGaWVsZDtcbiAgY29uc3QgcmF3VGl0bGUgPSByZWNvcmQ/Llt0aXRsZUZpZWxkXTtcbiAgY29uc3QgY2FyZFRpdGxlID0gcmF3VGl0bGUgPT0gbnVsbCB8fCBTdHJpbmcocmF3VGl0bGUpLnRyaW0oKSA9PT0gJydcbiAgICA/IGRlZmluaXRpb24ubGFiZWxcbiAgICA6IFN0cmluZyhyYXdUaXRsZSk7XG4gIGNvbnN0IGNhcmRNZXRhTGFiZWwgPSBkZWZpbml0aW9uLm1ldGFMYWJlbCB8fCBkZWZpbml0aW9uLmxhYmVsIHx8ICdSZWNvcmQnO1xuICBjb25zdCBjYXJkRXllYnJvdyA9IGNhcmRNZXRhTGFiZWwuZW5kc1dpdGgoJ3MnKSA/IGNhcmRNZXRhTGFiZWwuc2xpY2UoMCwgLTEpIDogY2FyZE1ldGFMYWJlbDtcbiAgY29uc3QgdGl0bGVUb2tlbnMgPSBjYXJkVGl0bGVcbiAgICAuc3BsaXQoL1xccysvKVxuICAgIC5tYXAoKHRva2VuKSA9PiB0b2tlbi50cmltKCkpXG4gICAgLmZpbHRlcihCb29sZWFuKTtcbiAgY29uc3QgYXZhdGFyTGFiZWwgPSB0aXRsZVRva2Vucy5zbGljZSgwLCAyKS5tYXAoKHRva2VuKSA9PiB0b2tlblswXSkuam9pbignJykudG9VcHBlckNhc2UoKSB8fCAnSUQnO1xuICBjb25zdCBtYW51YWxUYWcgPSB0eXBlb2YgcmVjb3JkPy5tYW51YWxUYWcgPT09ICdzdHJpbmcnID8gcmVjb3JkLm1hbnVhbFRhZy50cmltKCkgOiAnJztcbiAgY29uc3QgaXNQcm9maWxlU3VtbWFyeUxheW91dCA9IGRlZmluaXRpb24/Lm5hbWUgPT09ICdjdXN0b21lcnMnXG4gICAgfHwgZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ21lc3NhZ2VzJ1xuICAgIHx8IGRlZmluaXRpb24/Lm5hbWUgPT09ICdvcmRlcnMnXG4gICAgfHwgZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ2ludm9pY2VzJ1xuICAgIHx8IGRlZmluaXRpb24/Lm5hbWUgPT09ICdyZWZ1bmRzJztcbiAgY29uc3Qgc3VtbWFyeUZpZWxkcyA9IGluZm9DYXJkRmllbGRzLmZpbHRlcigoZmllbGQpID0+IGZpZWxkICE9PSAnbWFudWFsVGFnJyAmJiAhaW5mb0NhcmRCbG9ja0ZpZWxkcy5pbmNsdWRlcyhmaWVsZCkpO1xuXG4gIGlmICghaW5mb0NhcmRGaWVsZHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLXNlY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcHJvZmlsZS1jYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcHJvZmlsZS1jYXJkX19oZWFkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX2lkZW50aXR5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fYXZhdGFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e2F2YXRhckxhYmVsfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX2hlYWQtY29weVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fZXllYnJvd1wiPntjYXJkRXllYnJvd308L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX3RpdGxlLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX3RpdGxlXCI+e2NhcmRUaXRsZX08L2gyPlxuICAgICAgICAgICAgICAgIHttYW51YWxUYWcgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXN0YXR1cyBhZG1pbi1saXN0LXN0YXR1cy0tbWFudWFsXCI+e21hbnVhbFRhZ308L3NwYW4+IDogbnVsbH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWRtaW4tcHJvZmlsZS1jYXJkX19ib2R5JHtpc1Byb2ZpbGVTdW1tYXJ5TGF5b3V0ID8gJyBhZG1pbi1wcm9maWxlLWNhcmRfX2JvZHktLWN1c3RvbWVyJyA6ICcnfWB9PlxuICAgICAgICAgIHtzdW1tYXJ5RmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZ2V0RmllbGREaXNwbGF5TGFiZWwoZGVmaW5pdGlvbiwgZmllbGQpO1xuICAgICAgICAgICAgY29uc3QgZGlzcGxheVZhbHVlID0gZm9ybWF0UHJvZmlsZURpc3BsYXlWYWx1ZShkZWZpbml0aW9uLCBmaWVsZCwgcmVjb3JkPy5bZmllbGRdLCByZWNvcmQpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWVDbGFzc05hbWVzID0gWydhZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlJ107XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25hbEluZm9DYXJkRmllbGRzLmhhcyhmaWVsZCkgJiYgZGlzcGxheVZhbHVlID09PSAnTm90IHNldCcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkaXNwbGF5VmFsdWUgPT09ICdOb3Qgc2V0Jykge1xuICAgICAgICAgICAgICB2YWx1ZUNsYXNzTmFtZXMucHVzaCgnYWRtaW4tcHJvZmlsZS1jYXJkX192YWx1ZS0tbXV0ZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpZWxkID09PSAnaWQnIHx8IGZpZWxkLmVuZHNXaXRoKCdJZCcpKSB7XG4gICAgICAgICAgICAgIHZhbHVlQ2xhc3NOYW1lcy5wdXNoKCdhZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlLS1tb25vJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGlzcGxheVZhbHVlID09PSAnc3RyaW5nJyAmJiBkaXNwbGF5VmFsdWUuaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICAgICAgICAgIHZhbHVlQ2xhc3NOYW1lcy5wdXNoKCdhZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlLS1tdWx0aWxpbmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17ZmllbGR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcHJvZmlsZS1jYXJkX19pdGVtJHtGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkgPyAnIGFkbWluLXByb2ZpbGUtY2FyZF9faXRlbS0tZnVsbCcgOiAnJ31gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX2xhYmVsXCI+e2xhYmVsfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt2YWx1ZUNsYXNzTmFtZXMuam9pbignICcpfT57ZGlzcGxheVZhbHVlfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aW5mb0NhcmRCbG9ja0ZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGlzcGxheVZhbHVlID0gZm9ybWF0UHJvZmlsZURpc3BsYXlWYWx1ZShkZWZpbml0aW9uLCBmaWVsZCwgcmVjb3JkPy5bZmllbGRdLCByZWNvcmQpO1xuICAgICAgICAgIGlmIChvcHRpb25hbEluZm9DYXJkQmxvY2tGaWVsZHMuaGFzKGZpZWxkKSAmJiBkaXNwbGF5VmFsdWUgPT09ICdOb3Qgc2V0Jykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17ZmllbGR9IGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fcm93XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcHJvZmlsZS1jYXJkX19sYWJlbFwiPntnZXRGaWVsZERpc3BsYXlMYWJlbChkZWZpbml0aW9uLCBmaWVsZCl9PC9kaXY+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fdGV4dGJveFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXlWYWx1ZX1cbiAgICAgICAgICAgICAgICByb3dzPXtNYXRoLm1heCg0LCBNYXRoLm1pbigxMCwgU3RyaW5nKGRpc3BsYXlWYWx1ZSkuc3BsaXQoJ1xcbicpLmxlbmd0aCArIDEpKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTWVzc2FnZVJlcGx5UGFuZWwoeyByZXBsaWVzLCByZXBseURyYWZ0LCBvblJlcGx5Q2hhbmdlLCBvblNlbmRSZXBseSwgc2VuZGluZ1JlcGx5IH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJhZG1pbi1zZWN0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGx5LXBhbmVsXCI+XG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9fdGl0bGVcIj5SZXBseSB0byBDdXN0b21lcjwvaDM+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLXJlcGx5LXBhbmVsX19ub3RlXCI+U2VuZCBhbiBlbWFpbCByZXNwb25zZSBkaXJlY3RseSBmcm9tIHRoaXMgbWVzc2FnZSBkZXRhaWwgcGFnZS48L3A+XG5cbiAgICAgICAge3JlcGxpZXMubGVuZ3RoID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwbHktcGFuZWxfX2hpc3RvcnlcIj5cbiAgICAgICAgICAgIHtyZXBsaWVzLm1hcCgocmVwbHkpID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e3JlcGx5LmlkfSBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9faXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwbHktcGFuZWxfX21ldGFcIj57cmVwbHkuY3JlYXRlZEF0fSDigKIge3JlcGx5LmFkbWluRW1haWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9fc3ViamVjdFwiPntyZXBseS5zdWJqZWN0fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwbHktcGFuZWxfX2JvZHlcIj57cmVwbHkuYm9keX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9fZm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGRcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlJlcGx5IFN1YmplY3Q8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17cmVwbHlEcmFmdC5zdWJqZWN0fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvblJlcGx5Q2hhbmdlKCdzdWJqZWN0JywgZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+UmVwbHkgTWVzc2FnZTwvbGFiZWw+XG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tdGV4dGFyZWFcIlxuICAgICAgICAgICAgICB2YWx1ZT17cmVwbHlEcmFmdC5ib2R5fVxuICAgICAgICAgICAgICByb3dzPXs4fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvblJlcGx5Q2hhbmdlKCdib2R5JywgZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uU2VuZFJlcGx5fSBkaXNhYmxlZD17c2VuZGluZ1JlcGx5fT5cbiAgICAgICAgICAgICAge3NlbmRpbmdSZXBseSA/ICdTZW5kaW5nLi4uJyA6ICdTZW5kIFJlcGx5J31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQXJyYXlGaWVsZCh7IGZpZWxkLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IGxhYmVsID0gdG9MYWJlbChmaWVsZCk7XG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdO1xuICBjb25zdCBpc0ltYWdlQXJyYXkgPSBJTUFHRV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpO1xuICBjb25zdCBbZHJhZ0luZGV4LCBzZXREcmFnSW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtkcmFnT3ZlckluZGV4LCBzZXREcmFnT3ZlckluZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbdXBsb2FkaW5nSW5kZXgsIHNldFVwbG9hZGluZ0luZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbdXBsb2FkRXJyb3IsIHNldFVwbG9hZEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgZmlsZUlucHV0UmVmcyA9IHVzZVJlZih7fSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX190aXRsZVwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fY291bnRcIj57aXRlbXMubGVuZ3RofSBlbnRyaWVzPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxkZXRhaWxzXG4gICAgICAgICAgICBrZXk9e2Ake2ZpZWxkfS0ke2luZGV4fWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yZXBlYXRhYmxlX19pdGVtJHtkcmFnT3ZlckluZGV4ID09PSBpbmRleCA/ICcgYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyJyA6ICcnfWB9XG4gICAgICAgICAgICBvcGVuPXtpbmRleCA9PT0gMH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaWYgKGRyYWdPdmVySW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyb3A9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gaW5kZXggLSBkcmFnSW5kZXg7XG4gICAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgICAgICAgICAgICBvbk1vdmVJdGVtKFsuLi5wYXRoLCBkcmFnSW5kZXhdLCBvZmZzZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldERyYWdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChudWxsKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyYWdMZWF2ZT17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19idWxsZXRcIj7ilrw8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fbmFtZVwiPlxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheVxuICAgICAgICAgICAgICAgICAgICA/IGBJbWFnZSAke2luZGV4ICsgMX1gXG4gICAgICAgICAgICAgICAgICAgIDogKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyA/IGl0ZW0gfHwgYCR7bGFiZWx9ICR7aW5kZXggKyAxfWAgOiBpdGVtPy50ZXh0IHx8IGAke2xhYmVsfSAke2luZGV4ICsgMX1gKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtKFsuLi5wYXRoLCBpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIPCfl5FcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZT17IWRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEcmFnIHRvIHJlb3JkZXJcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyhpbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDii67ii65cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3N1bW1hcnk+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheSA/IG51bGwgOiA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWwgPT09ICdUYWdzJyA/ICdUZXh0JyA6IGxhYmVsLnNsaWNlKDAsIC0xKSB8fCBsYWJlbH08L2xhYmVsPn1cbiAgICAgICAgICAgICAgICAgIHtpc0ltYWdlQXJyYXkgPyBudWxsIDogKFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5wYXRoLCBpbmRleF0sIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sIGV2ZW50LnRhcmdldC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheSAmJiByZXNvbHZlTWVkaWFQcmV2aWV3VXJsKGdldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSkpID8gKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2NhbnZhcyBhZG1pbi1yZXBlYXRhYmxlX19pbWFnZS1wcmV2aWV3XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX190aHVtYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17cmVzb2x2ZU1lZGlhUHJldmlld1VybChnZXRSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0pKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtgJHtsYWJlbH0gJHtpbmRleCArIDF9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnNcIiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbihyZXNvbHZlTWVkaWFQcmV2aWV3VXJsKGdldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSkpLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAg4oaXXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKFsuLi5wYXRoLCBpbmRleF0sIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sICcnKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIOKclVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICB7aXNJbWFnZUFycmF5ID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHVwbG9hZGluZ0luZGV4ID09PSBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZnMuY3VycmVudFtpbmRleF0/LmNsaWNrKCl9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3VwbG9hZGluZ0luZGV4ID09PSBpbmRleCA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCB1cGxvYWRpbmdJbmRleCA9PT0gaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgoaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRVcmwgPSBhd2FpdCBjaG9vc2VBZG1pbkxpYnJhcnlJbWFnZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShbLi4ucGF0aCwgaW5kZXhdLCB3aXRoUmVwZWF0YWJsZUl0ZW1WYWx1ZShpdGVtLCBzZWxlY3RlZFVybCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcihlcnJvcj8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGNob29zZSBpbWFnZSBmcm9tIG1lZGlhIGxpYnJhcnkuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3VwbG9hZGluZ0luZGV4ID09PSBpbmRleCA/ICdDaG9vc2luZy4uLicgOiAnQ2hvb3NlIGZyb20gbWVkaWEgbGlicmFyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9eyhlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucHV0UmVmcy5jdXJyZW50W2luZGV4XSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZpbGVJbnB1dFJlZnMuY3VycmVudFtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2FzeW5jIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgoaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmwgPSBhd2FpdCB1cGxvYWRBZG1pbkltYWdlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5wYXRoLCBpbmRleF0sIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sIHVwbG9hZGVkVXJsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICkpfVxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FkZFwiIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2xpY2s9eygpID0+IG9uQWRkSXRlbShwYXRoLCB7IHRleHQ6ICcnIH0pfT5cbiAgICAgICAgICArIEFkZCBhbiBlbnRyeVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAge3VwbG9hZEVycm9yID8gPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fZXJyb3JcIiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNnB4IDE0cHgnIH19Pnt1cGxvYWRFcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEZpZWxkUmVuZGVyZXIoeyBkZWZpbml0aW9uLCBmaWVsZCwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBvbkFkZEl0ZW0sIG9uUmVtb3ZlSXRlbSwgb25Nb3ZlSXRlbSwgZGlzYWJsZWQgfSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gPEFycmF5RmllbGQgZmllbGQ9e2ZpZWxkfSB2YWx1ZT17dmFsdWV9IHBhdGg9e3BhdGh9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gb25BZGRJdGVtPXtvbkFkZEl0ZW19IG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfSBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfSBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+O1xuICB9XG4gIHJldHVybiA8UHJpbWl0aXZlRmllbGQgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn0gZmllbGQ9e2ZpZWxkfSB2YWx1ZT17dmFsdWV9IHBhdGg9e3BhdGh9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTGlzdENlbGwoZmllbGQsIHZhbHVlKSB7XG4gIGlmIChmaWVsZCA9PT0gJ21hbnVhbFRhZycpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1zdGF0dXMgYWRtaW4tbGlzdC1zdGF0dXMtLW1hbnVhbFwiPnt2YWx1ZX08L3NwYW4+XG4gICAgICA6IG51bGw7XG4gIH1cblxuICBpZiAoZmllbGQgPT09ICdzdGF0dXMnKSB7XG4gICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtc3RhdHVzXCI+e3ZhbHVlfTwvc3Bhbj47XG4gIH1cblxuICBpZiAoKGZpZWxkID09PSAnZmVhdHVyZWQnIHx8IGZpZWxkID09PSAnaXNGZWF0dXJlZCcgfHwgZmllbGQgPT09ICdpc1BvcHVsYXInKSAmJiAodmFsdWUgPT09ICdZZXMnIHx8IHZhbHVlID09PSAnTm8nKSkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2BhZG1pbi1saXN0LWJvb2xlYW4gJHt2YWx1ZSA9PT0gJ1llcycgPyAnYWRtaW4tbGlzdC1ib29sZWFuLS15ZXMnIDogJ2FkbWluLWxpc3QtYm9vbGVhbi0tbm8nfWB9PlxuICAgICAgICB7dmFsdWUgPT09ICdZZXMnID8gJ+KckycgOiAn4pyVJ31cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBMaXN0Vmlldyh7XG4gIGRlZmluaXRpb24sXG4gIHJlY29yZHMsXG4gIGNvbnRyb2xzLFxuICBzZWFyY2gsXG4gIGxvYWRpbmcsXG4gIG9uU2VhcmNoLFxuICBvbk9wZW5SZWNvcmQsXG4gIG9uQ3JlYXRlLFxuICBvblNldFNvcnQsXG4gIG9uU2V0RmlsdGVyLFxuICBvblJlc2V0RmlsdGVycyxcbiAgb25Ub2dnbGVEaXNwbGF5ZWRGaWVsZCxcbiAgb25SZXNldERpc3BsYXllZEZpZWxkcyxcbiAgb25EdXBsaWNhdGVSZWNvcmQsXG4gIG9uRGVsZXRlUmVjb3JkLFxufSkge1xuICBjb25zdCBbc2hvd1NlYXJjaCwgc2V0U2hvd1NlYXJjaF0gPSB1c2VTdGF0ZShCb29sZWFuKHNlYXJjaCkpO1xuICBjb25zdCBbZmlsdGVyc09wZW4sIHNldEZpbHRlcnNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dEaXNwbGF5ZWQsIHNldFNob3dEaXNwbGF5ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VhcmNoVmFsdWUsIHNldFNlYXJjaFZhbHVlXSA9IHVzZVN0YXRlKHNlYXJjaCk7XG4gIGNvbnN0IFtvcGVuTWVudUlkLCBzZXRPcGVuTWVudUlkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBtZW51UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0U2VhcmNoVmFsdWUoc2VhcmNoKTtcbiAgfSwgW3NlYXJjaF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChzZWFyY2hWYWx1ZSAhPT0gc2VhcmNoKSB7XG4gICAgICAgIG9uU2VhcmNoKHNlYXJjaFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCAyNTApO1xuXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH0sIFtvblNlYXJjaCwgc2VhcmNoLCBzZWFyY2hWYWx1ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChtZW51UmVmLmN1cnJlbnQgJiYgIW1lbnVSZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHNldE9wZW5NZW51SWQobnVsbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZGlzcGxheWVkQ29sdW1ucyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gY29udHJvbHMuYXZhaWxhYmxlRmllbGRzLmZpbHRlcigoZmllbGQpID0+IGNvbnRyb2xzLmRpc3BsYXllZEZpZWxkcy5pbmNsdWRlcyhmaWVsZC5maWVsZCkpLFxuICAgIFtjb250cm9scy5hdmFpbGFibGVGaWVsZHMsIGNvbnRyb2xzLmRpc3BsYXllZEZpZWxkc10sXG4gICk7XG4gIGNvbnN0IHNob3dDcmVhdGUgPSBkZWZpbml0aW9uLmFsbG93Q3JlYXRlICE9PSBmYWxzZTtcbiAgY29uc3QgaGFzRmlsdGVycyA9IEJvb2xlYW4oY29udHJvbHMuZmlsdGVycz8ubGVuZ3RoKTtcbiAgY29uc3QgYWxsb3dEdXBsaWNhdGUgPSBkZWZpbml0aW9uLmFsbG93RHVwbGljYXRlICE9PSBmYWxzZTtcbiAgY29uc3QgYWxsb3dEZWxldGUgPSBkZWZpbml0aW9uLmFsbG93RGVsZXRlICE9PSBmYWxzZTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZWRpdG9yXCI+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JfX2lubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4taGVhZGVyXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWV0YVwiPntkZWZpbml0aW9uLm1ldGFMYWJlbCB8fCAnQ29sbGVjdGlvbiBUeXBlJ308L2Rpdj5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi10aXRsZVwiPntkZWZpbml0aW9uLmxhYmVsfTwvaDE+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LWFjdGlvbnNcIj5cbiAgICAgICAgICAgIHtzaG93Q3JlYXRlID8gPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQ3JlYXRlfT4rIENyZWF0ZSBuZXcgZW50cnk8L2J1dHRvbj4gOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtbWV0YVwiPntyZWNvcmRzLmxlbmd0aH0gZW50cmllcyBmb3VuZDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC10b29sYmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10b29sYmFyLWNsdXN0ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tdG9vbGJhci1idXR0b24gYWRtaW4tdG9vbGJhci1idXR0b24tLWljb24ke3Nob3dTZWFyY2ggPyAnIGFkbWluLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dTZWFyY2goKGN1cnJlbnQpID0+ICFjdXJyZW50KX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg8J+UjVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB7c2hvd1NlYXJjaCA/IChcbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tdG9vbGJhci1zZWFyY2hcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hWYWx1ZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hWYWx1ZShldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2hhc0ZpbHRlcnMgPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi10b29sYmFyLWJ1dHRvbiR7ZmlsdGVyc09wZW4gPyAnIGFkbWluLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRGaWx0ZXJzT3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgc2V0U2hvd0Rpc3BsYXllZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIEZpbHRlcnNcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIHtoYXNGaWx0ZXJzICYmIGZpbHRlcnNPcGVuID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3ZlclwiIHN0eWxlPXt7IGxlZnQ6IHNob3dTZWFyY2ggPyAzMzIgOiA1MiwgcmlnaHQ6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3RpdGxlXCI+RmlsdGVyczwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3Jlc2V0XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uUmVzZXRGaWx0ZXJzfT5SZXNldDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtjb250cm9scy5maWx0ZXJzLm1hcCgoZmlsdGVyKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZmlsdGVyLmZpZWxkfSBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX2dyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX2xhYmVsXCI+e2ZpbHRlci5sYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19zZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb250cm9scy5hY3RpdmVGaWx0ZXJzW2ZpbHRlci5maWVsZF0gPz8gJyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25TZXRGaWx0ZXIoZmlsdGVyLmZpZWxkLCBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPkFsbDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXIub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdGlvbn0gdmFsdWU9e29wdGlvbn0+e29wdGlvbn08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10b29sYmFyLWNsdXN0ZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXRvb2xiYXItYnV0dG9uIGFkbWluLXRvb2xiYXItYnV0dG9uLS1pY29uJHtzaG93RGlzcGxheWVkID8gJyBhZG1pbi10b29sYmFyLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0U2hvd0Rpc3BsYXllZCgoY3VycmVudCkgPT4gIWN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgc2V0RmlsdGVyc09wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICDimplcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIHtzaG93RGlzcGxheWVkID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fdGl0bGVcIj5EaXNwbGF5ZWQgZmllbGRzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3Jlc2V0XCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblJlc2V0RGlzcGxheWVkRmllbGRzfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgUmVzZXRcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtjb250cm9scy5hdmFpbGFibGVGaWVsZHMubWFwKChmaWVsZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwga2V5PXtmaWVsZC5maWVsZH0gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19jaGVja1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbnRyb2xzLmRpc3BsYXllZEZpZWxkcy5pbmNsdWRlcyhmaWVsZC5maWVsZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvblRvZ2dsZURpc3BsYXllZEZpZWxkKGZpZWxkLmZpZWxkLCBldmVudC50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZmllbGQubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtY2FyZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1jYXJkX19oZWFkXCI+XG4gICAgICAgICAgICA8c3Ryb25nPntkZWZpbml0aW9uLmxhYmVsfTwvc3Ryb25nPlxuICAgICAgICAgICAgPHNwYW4+e2xvYWRpbmcgPyAnTG9hZGluZy4uLicgOiBgJHtyZWNvcmRzLmxlbmd0aH0gZW50cmllc2B9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXRhYmxlXCI+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICB7ZGlzcGxheWVkQ29sdW1ucy5tYXAoKGNvbHVtbikgPT4gKFxuICAgICAgICAgICAgICAgICAgPHRoIGtleT17Y29sdW1uLmZpZWxkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25TZXRTb3J0KGNvbHVtbi5maWVsZCl9PlxuICAgICAgICAgICAgICAgICAgICAgIHtjb2x1bW4ubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAge2NvbnRyb2xzLnNvcnRCeSA9PT0gY29sdW1uLmZpZWxkID8gYCAke2NvbnRyb2xzLnNvcnRPcmRlciA9PT0gJ2FzYycgPyAn4oaRJyA6ICfihpMnfWAgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDx0aCAvPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3JlY29yZHMubWFwKChyZWNvcmQpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtyZWNvcmQuZG9jdW1lbnRJZH0gb25DbGljaz17KCkgPT4gb25PcGVuUmVjb3JkKHJlY29yZC5pZCl9PlxuICAgICAgICAgICAgICAgICAge2Rpc3BsYXllZENvbHVtbnMubWFwKChjb2x1bW4pID0+IChcbiAgICAgICAgICAgICAgICAgICAgPHRkIGtleT17YCR7cmVjb3JkLmRvY3VtZW50SWR9LSR7Y29sdW1uLmZpZWxkfWB9PntyZW5kZXJMaXN0Q2VsbChjb2x1bW4uZmllbGQsIHJlY29yZC5jb2x1bW5zW2NvbHVtbi5maWVsZF0pfTwvdGQ+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51LWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnUtdHJpZ2dlclwiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldE9wZW5NZW51SWQoKGN1cnJlbnQpID0+IChjdXJyZW50ID09PSByZWNvcmQuaWQgPyBudWxsIDogcmVjb3JkLmlkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIOKAplxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge29wZW5NZW51SWQgPT09IHJlY29yZC5pZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9e21lbnVSZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pdGVtXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25PcGVuUmVjb3JkKHJlY29yZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudV9faWNvblwiPuKcjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2RlZmluaXRpb24ucmVhZE9ubHkgPyAnVmlldycgOiAnRWRpdCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YWxsb3dEdXBsaWNhdGUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudV9faXRlbVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkR1cGxpY2F0ZVJlY29yZChyZWNvcmQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pY29uXCI+4qeJPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkR1cGxpY2F0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHthbGxvd0RlbGV0ZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pdGVtIGFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW0tLWRhbmdlclwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZVJlY29yZChyZWNvcmQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pY29uXCI+8J+XkTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5EZWxldGUgZW50cnk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEVkaXRWaWV3KHsgZGVmaW5pdGlvbiwgcmVjb3JkLCBwdWJsaXNoZWRSZWNvcmQsIGFjdGl2ZVRhYiwgb25Td2l0Y2hUYWIsIHNhdmluZywgZXJyb3IsIG9uQmFjaywgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBvblNhdmUsIG9uUHVibGlzaCwgb25EZWxldGUsIG9uRGlzY2FyZENoYW5nZXMsIG9uVW5wdWJsaXNoLCBjYW5TYXZlLCBjYW5QdWJsaXNoLCBjYW5EaXNjYXJkLCBjYW5VbnB1Ymxpc2gsIHJlcGx5RHJhZnQsIG9uUmVwbHlDaGFuZ2UsIG9uU2VuZFJlcGx5LCBzZW5kaW5nUmVwbHksIGlzQ3JlYXRlTW9kZSB9KSB7XG4gIGNvbnN0IGRpc3BsYXllZFJlY29yZCA9IGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkUmVjb3JkID8gcHVibGlzaGVkUmVjb3JkIDogcmVjb3JkO1xuICBjb25zdCBpc1B1Ymxpc2hlZFZpZXcgPSBhY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnICYmIHB1Ymxpc2hlZFJlY29yZDtcbiAgY29uc3QgaXNNYW51YWxFbnRyeSA9IGRpc3BsYXllZFJlY29yZD8uZW50cnlTb3VyY2UgPT09ICdtYW51YWwnIHx8IGRpc3BsYXllZFJlY29yZD8ubWFudWFsVGFnID09PSAnTWFudWFsJztcbiAgY29uc3Qgc3VwcG9ydHNFZGl0aW5nID0gaXNDcmVhdGVNb2RlIHx8IGlzTWFudWFsRW50cnkgfHwgIWRlZmluaXRpb24ucmVhZE9ubHk7XG4gIGNvbnN0IHNob3dWZXJzaW9uVGFicyA9IHN1cHBvcnRzRWRpdGluZyAmJiBkZWZpbml0aW9uLnNob3dWZXJzaW9uVGFicyAhPT0gZmFsc2U7XG4gIGNvbnN0IGFsbG93UHVibGlzaCA9IHN1cHBvcnRzRWRpdGluZyAmJiBkZWZpbml0aW9uLmFsbG93UHVibGlzaCAhPT0gZmFsc2U7XG4gIGNvbnN0IGFsbG93U2F2ZSA9IHN1cHBvcnRzRWRpdGluZyAmJiBkZWZpbml0aW9uLmFsbG93U2F2ZSAhPT0gZmFsc2U7XG4gIGNvbnN0IGFsbG93RGVsZXRlID0gZGVmaW5pdGlvbi5hbGxvd0RlbGV0ZSAhPT0gZmFsc2U7XG4gIGNvbnN0IGVkaXRhYmxlRmllbGRzID0gaXNDcmVhdGVNb2RlXG4gICAgPyAoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmNyZWF0ZUZpZWxkcykgPyBkZWZpbml0aW9uLmNyZWF0ZUZpZWxkcyA6IFtdKVxuICAgIDogaXNNYW51YWxFbnRyeVxuICAgICAgPyAoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLm1hbnVhbEVkaXRhYmxlRmllbGRzKSA/IGRlZmluaXRpb24ubWFudWFsRWRpdGFibGVGaWVsZHMgOiAoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmVkaXRhYmxlRmllbGRzKSA/IGRlZmluaXRpb24uZWRpdGFibGVGaWVsZHMgOiBbXSkpXG4gICAgICA6IChBcnJheS5pc0FycmF5KGRlZmluaXRpb24uZWRpdGFibGVGaWVsZHMpID8gZGVmaW5pdGlvbi5lZGl0YWJsZUZpZWxkcyA6IFtdKTtcbiAgY29uc3QgaW5mb0NhcmRGaWVsZHMgPSAhaXNDcmVhdGVNb2RlICYmIEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5pbmZvQ2FyZEZpZWxkcykgPyBkZWZpbml0aW9uLmluZm9DYXJkRmllbGRzIDogW107XG4gIGNvbnN0IGluZm9DYXJkQmxvY2tGaWVsZHMgPSAhaXNDcmVhdGVNb2RlICYmIEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5pbmZvQ2FyZEJsb2NrRmllbGRzKSA/IGRlZmluaXRpb24uaW5mb0NhcmRCbG9ja0ZpZWxkcyA6IFtdO1xuICBjb25zdCBoaWRkZW5DYXJkRmllbGRzID0gbmV3IFNldChcbiAgICBbLi4uaW5mb0NhcmRGaWVsZHMsIC4uLmluZm9DYXJkQmxvY2tGaWVsZHNdLmZpbHRlcigoZmllbGQpID0+ICFlZGl0YWJsZUZpZWxkcy5pbmNsdWRlcyhmaWVsZCkpLFxuICApO1xuICBjb25zdCBzaG93U3RhbmRhbG9uZUhlYWRlciA9IGluZm9DYXJkRmllbGRzLmxlbmd0aCA9PT0gMCAmJiBpbmZvQ2FyZEJsb2NrRmllbGRzLmxlbmd0aCA9PT0gMDtcbiAgY29uc3QgYWN0aXZlTGF5b3V0ID0gaXNDcmVhdGVNb2RlXG4gICAgPyAoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmNyZWF0ZUxheW91dCkgPyBkZWZpbml0aW9uLmNyZWF0ZUxheW91dCA6IGRlZmluaXRpb24uZWRpdExheW91dClcbiAgICA6IGlzTWFudWFsRW50cnkgJiYgQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLm1hbnVhbEVkaXRMYXlvdXQpXG4gICAgICA/IGRlZmluaXRpb24ubWFudWFsRWRpdExheW91dFxuICAgICAgOiBkZWZpbml0aW9uLmVkaXRMYXlvdXQ7XG4gIGNvbnN0IFttZW51T3Blbiwgc2V0TWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBtZW51UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtZW51T3Blbikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKG1lbnVSZWYuY3VycmVudCAmJiAhbWVudVJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICB9O1xuICB9LCBbbWVudU9wZW5dKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZWRpdG9yXCI+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JfX2lubmVyXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tYmFja1wiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkJhY2t9PuKGkCBCYWNrPC9idXR0b24+XG5cbiAgICAgICAge3Nob3dTdGFuZGFsb25lSGVhZGVyID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4taGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1ldGFcIj57ZGVmaW5pdGlvbi5tZXRhTGFiZWwgfHwgJ0NvbGxlY3Rpb24gVHlwZSd9PC9kaXY+XG4gICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi10aXRsZVwiPntnZXREaXNwbGF5VGl0bGUoZGVmaW5pdGlvbiwgZGlzcGxheWVkUmVjb3JkKX08L2gxPlxuICAgICAgICAgICAgICB7ZGlzcGxheWVkUmVjb3JkLnN0YXR1cyA/IDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc3RhdHVzXCI+e2Rpc3BsYXllZFJlY29yZC5zdGF0dXN9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7c2hvd1ZlcnNpb25UYWJzID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tdGFic1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BhZG1pbi10YWIke2FjdGl2ZVRhYiA9PT0gJ2RyYWZ0JyA/ICcgYWRtaW4tdGFiLS1hY3RpdmUnIDogJyd9YH0gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uU3dpdGNoVGFiKCdkcmFmdCcpfT5EUkFGVDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BhZG1pbi10YWIke2FjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgPyAnIGFkbWluLXRhYi0tYWN0aXZlJyA6ICcnfWB9IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBwdWJsaXNoZWRSZWNvcmQgJiYgb25Td2l0Y2hUYWIoJ3B1Ymxpc2hlZCcpfT5QVUJMSVNIRUQ8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAge2Vycm9yID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiPntlcnJvcn08L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxheW91dFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWFpbi1jYXJkXCI+XG4gICAgICAgICAgICA8UHJvZmlsZUluZm9DYXJkIGRlZmluaXRpb249e2RlZmluaXRpb259IHJlY29yZD17ZGlzcGxheWVkUmVjb3JkfSAvPlxuICAgICAgICAgICAge2RlZmluaXRpb24ubmFtZSA9PT0gJ21lc3NhZ2VzJyA/IChcbiAgICAgICAgICAgICAgPE1lc3NhZ2VSZXBseVBhbmVsXG4gICAgICAgICAgICAgICAgcmVwbGllcz17QXJyYXkuaXNBcnJheShkaXNwbGF5ZWRSZWNvcmQ/LnJlcGxpZXMpID8gZGlzcGxheWVkUmVjb3JkLnJlcGxpZXMgOiBbXX1cbiAgICAgICAgICAgICAgICByZXBseURyYWZ0PXtyZXBseURyYWZ0fVxuICAgICAgICAgICAgICAgIG9uUmVwbHlDaGFuZ2U9e29uUmVwbHlDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb25TZW5kUmVwbHk9e29uU2VuZFJlcGx5fVxuICAgICAgICAgICAgICAgIHNlbmRpbmdSZXBseT17c2VuZGluZ1JlcGx5fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICB7YWN0aXZlTGF5b3V0Lm1hcCgocm93LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2aXNpYmxlRmllbGRzID0gcm93LmZpbHRlcigoZmllbGQpID0+ICFoaWRkZW5DYXJkRmllbGRzLmhhcyhmaWVsZCkpO1xuXG4gICAgICAgICAgICAgIGlmICghdmlzaWJsZUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Byb3ctJHtpbmRleH1gfSBjbGFzc05hbWU9XCJhZG1pbi1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkLWdyaWRcIj5cbiAgICAgICAgICAgICAgICAgICAge3Zpc2libGVGaWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkRGlzYWJsZWQgPSBpc1B1Ymxpc2hlZFZpZXdcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICFzdXBwb3J0c0VkaXRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IChlZGl0YWJsZUZpZWxkcy5sZW5ndGggPiAwICYmICFlZGl0YWJsZUZpZWxkcy5pbmNsdWRlcyhmaWVsZCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb249e2RlZmluaXRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZmllbGR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkPXtmaWVsZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXllZFJlY29yZFtmaWVsZF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg9e1tmaWVsZF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25BZGRJdGVtPXtvbkFkZEl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZmllbGREaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGFzaWRlPlxuICAgICAgICAgICAgeyFzdXBwb3J0c0VkaXRpbmcgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2hlYWRcIj5FbnRyeTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtbm90ZVwiPlJlYWQtb25seSByZWNvcmQuPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2hlYWRcIj5FbnRyeTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAge2FsbG93UHVibGlzaCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uUHVibGlzaH0gZGlzYWJsZWQ9eyFjYW5QdWJsaXNofT5QdWJsaXNoPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeSBhZG1pbi1zaWRlLWJ1dHRvbi0tbWVudVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRNZW51T3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpfT7igKY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge21lbnVPcGVuID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXttZW51UmVmfSBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbnB1Ymxpc2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5VbnB1Ymxpc2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2ljb25cIj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5wdWJsaXNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSBhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRpc2NhcmRDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuRGlzY2FyZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvblwiPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaXNjYXJkIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge2FsbG93U2F2ZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvblNhdmV9IGRpc2FibGVkPXshY2FuU2F2ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NhdmluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApIDogYWxsb3dTYXZlID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25TYXZlfSBkaXNhYmxlZD17IWNhblNhdmV9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3NhdmluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUnfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1ub3RlXCI+Tm8gZWRpdGFibGUgYWN0aW9ucyBmb3IgdGhpcyByZWNvcmQuPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHthbGxvd0RlbGV0ZSA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19oZWFkXCI+QWN0aW9uczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9fYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkRlbGV0ZX0gZGlzYWJsZWQ9e2lzUHVibGlzaGVkVmlld30+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2FzaWRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb2xsZWN0aW9uTWFuYWdlcigpIHtcbiAgY29uc3QgeyBwYWdlTmFtZSB9ID0gdXNlUGFyYW1zKCk7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBhZGROb3RpY2UgPSB1c2VOb3RpY2UoKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtsaXN0TG9hZGluZywgc2V0TGlzdExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZGVmaW5pdGlvbiwgc2V0RGVmaW5pdGlvbl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3JlY29yZHMsIHNldFJlY29yZHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbY29udHJvbHMsIHNldENvbnRyb2xzXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbcmVjb3JkLCBzZXRSZWNvcmRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtvcmlnaW5hbFJlY29yZCwgc2V0T3JpZ2luYWxSZWNvcmRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtwdWJsaXNoZWRSZWNvcmQsIHNldFB1Ymxpc2hlZFJlY29yZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCdkcmFmdCcpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3JlcGx5RHJhZnQsIHNldFJlcGx5RHJhZnRdID0gdXNlU3RhdGUoeyBzdWJqZWN0OiAnJywgYm9keTogJycgfSk7XG4gIGNvbnN0IFtzZW5kaW5nUmVwbHksIHNldFNlbmRpbmdSZXBseV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgcXVlcnkgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKSwgW2xvY2F0aW9uLnNlYXJjaF0pO1xuICBjb25zdCByZWNvcmRJZCA9IHF1ZXJ5LmdldCgncmVjb3JkSWQnKTtcbiAgY29uc3QgaXNOZXcgPSBxdWVyeS5nZXQoJ25ldycpID09PSAnMSc7XG4gIGNvbnN0IHNlYXJjaCA9IHF1ZXJ5LmdldCgnc2VhcmNoJykgfHwgJyc7XG4gIGNvbnN0IHN0YXR1cyA9IHF1ZXJ5LmdldCgnc3RhdHVzJykgfHwgJyc7XG4gIGNvbnN0IGNhdGVnb3J5ID0gcXVlcnkuZ2V0KCdjYXRlZ29yeScpIHx8ICcnO1xuICBjb25zdCBwbGFuVHlwZSA9IHF1ZXJ5LmdldCgncGxhblR5cGUnKSB8fCAnJztcbiAgY29uc3QgZmVhdHVyZWQgPSBxdWVyeS5nZXQoJ2ZlYXR1cmVkJykgfHwgJyc7XG4gIGNvbnN0IGlzRmVhdHVyZWQgPSBxdWVyeS5nZXQoJ2lzRmVhdHVyZWQnKSB8fCAnJztcbiAgY29uc3QgaXNQb3B1bGFyID0gcXVlcnkuZ2V0KCdpc1BvcHVsYXInKSB8fCAnJztcbiAgY29uc3Qgc29ydEJ5ID0gcXVlcnkuZ2V0KCdzb3J0QnknKSB8fCAnJztcbiAgY29uc3Qgc29ydE9yZGVyID0gcXVlcnkuZ2V0KCdzb3J0T3JkZXInKSB8fCAnJztcbiAgY29uc3QgZGlzcGxheWVkRmllbGRzID0gcGFyc2VEaXNwbGF5ZWRGaWVsZHMocXVlcnkuZ2V0KCdkaXNwbGF5ZWRGaWVsZHMnKSk7XG4gIGNvbnN0IGlzTWFudWFsRWRpdGFibGVSZWNvcmQgPSByZWNvcmQ/LmVudHJ5U291cmNlID09PSAnbWFudWFsJyB8fCBwdWJsaXNoZWRSZWNvcmQ/LmVudHJ5U291cmNlID09PSAnbWFudWFsJztcbiAgY29uc3QgY2FuRWRpdEN1cnJlbnRSZWNvcmQgPSBCb29sZWFuKGRlZmluaXRpb24pICYmICghZGVmaW5pdGlvbi5yZWFkT25seSB8fCBpc05ldyB8fCBpc01hbnVhbEVkaXRhYmxlUmVjb3JkKTtcblxuICBjb25zdCBtb2RlID0gdXNlTWVtbygoKSA9PiAocmVjb3JkSWQgfHwgaXNOZXcgPyAnZWRpdCcgOiAnbGlzdCcpLCBbcmVjb3JkSWQsIGlzTmV3XSk7XG4gIGNvbnN0IGlzRGlydHkgPSB1c2VNZW1vKFxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKHJlY29yZCkpICE9PSBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShvcmlnaW5hbFJlY29yZCkpLFxuICAgIFtyZWNvcmQsIG9yaWdpbmFsUmVjb3JkXSxcbiAgKTtcbiAgY29uc3QgaGFzRHJhZnRDb250ZW50ID0gdXNlTWVtbygoKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUocmVjb3JkKSwgW3JlY29yZF0pO1xuICBjb25zdCBoYXNVbnB1Ymxpc2hlZENoYW5nZXMgPSB1c2VNZW1vKFxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKHJlY29yZCkpICE9PSBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShwdWJsaXNoZWRSZWNvcmQpKSxcbiAgICBbcmVjb3JkLCBwdWJsaXNoZWRSZWNvcmRdLFxuICApO1xuICBjb25zdCBzaG93VmVyc2lvblRhYnMgPSBkZWZpbml0aW9uPy5zaG93VmVyc2lvblRhYnMgIT09IGZhbHNlO1xuICBjb25zdCBjYW5TYXZlID0gY2FuRWRpdEN1cnJlbnRSZWNvcmQgJiYgbW9kZSA9PT0gJ2VkaXQnICYmICFzYXZpbmcgJiYgKCFzaG93VmVyc2lvblRhYnMgfHwgYWN0aXZlVGFiICE9PSAncHVibGlzaGVkJykgJiYgaXNEaXJ0eTtcbiAgY29uc3QgY2FuUHVibGlzaCA9IGNhbkVkaXRDdXJyZW50UmVjb3JkICYmIG1vZGUgPT09ICdlZGl0JyAmJiAhc2F2aW5nICYmIHNob3dWZXJzaW9uVGFicyAmJiBhY3RpdmVUYWIgIT09ICdwdWJsaXNoZWQnICYmIChwdWJsaXNoZWRSZWNvcmQgPyBoYXNVbnB1Ymxpc2hlZENoYW5nZXMgOiBoYXNEcmFmdENvbnRlbnQpO1xuICBjb25zdCBjYW5EaXNjYXJkID0gY2FuRWRpdEN1cnJlbnRSZWNvcmQgJiYgbW9kZSA9PT0gJ2VkaXQnICYmICFzYXZpbmcgJiYgYWN0aXZlVGFiICE9PSAncHVibGlzaGVkJyAmJiBoYXNEcmFmdENvbnRlbnQ7XG4gIGNvbnN0IGNhblVucHVibGlzaCA9IGNhbkVkaXRDdXJyZW50UmVjb3JkICYmIG1vZGUgPT09ICdlZGl0JyAmJiAhc2F2aW5nICYmIEJvb2xlYW4ocHVibGlzaGVkUmVjb3JkKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBhY3RpdmUgPSB0cnVlO1xuXG4gICAgY29uc3QgbG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHNob3VsZEJsb2NrID0gbW9kZSA9PT0gJ2VkaXQnIHx8ICFkZWZpbml0aW9uO1xuICAgICAgaWYgKHNob3VsZEJsb2NrKSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRMaXN0TG9hZGluZyh0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEVycm9yKCcnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICAgIHF1ZXJ5OiBtb2RlID09PSAnZWRpdCdcbiAgICAgICAgICAgID8gKHJlY29yZElkID8geyByZWNvcmRJZCB9IDogeyBuZXc6ICcxJyB9KVxuICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgIHNlYXJjaCxcbiAgICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgICAgcGxhblR5cGUsXG4gICAgICAgICAgICAgIGZlYXR1cmVkLFxuICAgICAgICAgICAgICBpc0ZlYXR1cmVkLFxuICAgICAgICAgICAgICBpc1BvcHVsYXIsXG4gICAgICAgICAgICAgIHNvcnRCeSxcbiAgICAgICAgICAgICAgc29ydE9yZGVyLFxuICAgICAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRpc3BsYXllZEZpZWxkcy5qb2luKCcsJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldERlZmluaXRpb24ocGF5bG9hZC5kZWZpbml0aW9uKTtcbiAgICAgICAgc2V0UmVjb3JkcyhwYXlsb2FkLnJlY29yZHMgPz8gW10pO1xuICAgICAgICBzZXRDb250cm9scyhwYXlsb2FkLmNvbnRyb2xzID8/IG51bGwpO1xuICAgICAgICBjb25zdCBuZXh0RHJhZnRSZWNvcmQgPSBwYXlsb2FkLmRyYWZ0UmVjb3JkID8gY2xvbmVWYWx1ZShwYXlsb2FkLmRyYWZ0UmVjb3JkKSA6IG51bGw7XG4gICAgICAgIHNldFJlY29yZChuZXh0RHJhZnRSZWNvcmQpO1xuICAgICAgICBzZXRPcmlnaW5hbFJlY29yZChuZXh0RHJhZnRSZWNvcmQgPyBjbG9uZVZhbHVlKG5leHREcmFmdFJlY29yZCkgOiBudWxsKTtcbiAgICAgICAgc2V0UHVibGlzaGVkUmVjb3JkKHBheWxvYWQucHVibGlzaGVkUmVjb3JkID8gY2xvbmVWYWx1ZShwYXlsb2FkLnB1Ymxpc2hlZFJlY29yZCkgOiBudWxsKTtcbiAgICAgICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgICAgICBzZXRSZXBseURyYWZ0KChjdXJyZW50KSA9PiAoXG4gICAgICAgICAgcGFnZU5hbWUgPT09ICdtZXNzYWdlcycgJiYgbmV4dERyYWZ0UmVjb3JkXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiBjdXJyZW50LnN1YmplY3QgfHwgYFJlOiBZb3VyIG1lc3NhZ2UgdG8gVGhlIExlYWRlbmhhbGwgV29ya3NgLFxuICAgICAgICAgICAgICAgIGJvZHk6IGN1cnJlbnQuYm9keSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBjdXJyZW50XG4gICAgICAgICkpO1xuICAgICAgfSBjYXRjaCAobG9hZEVycm9yKSB7XG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldEVycm9yKGxvYWRFcnJvci5tZXNzYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICBzZXRMaXN0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZCgpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuICB9LCBbbW9kZSwgcGFnZU5hbWUsIHJlY29yZElkLCBpc05ldywgc2VhcmNoLCBzdGF0dXMsIGNhdGVnb3J5LCBwbGFuVHlwZSwgZmVhdHVyZWQsIGlzRmVhdHVyZWQsIGlzUG9wdWxhciwgc29ydEJ5LCBzb3J0T3JkZXIsIGRpc3BsYXllZEZpZWxkcy5qb2luKCcsJyldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwYWdlTmFtZSAhPT0gJ21lc3NhZ2VzJyB8fCAhcmVjb3JkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0UmVwbHlEcmFmdCgoY3VycmVudCkgPT4gKHtcbiAgICAgIHN1YmplY3Q6IGN1cnJlbnQuc3ViamVjdCB8fCAnUmU6IFlvdXIgbWVzc2FnZSB0byBUaGUgTGVhZGVuaGFsbCBXb3JrcycsXG4gICAgICBib2R5OiBjdXJyZW50LmJvZHksXG4gICAgfSkpO1xuICB9LCBbcGFnZU5hbWUsIHJlY29yZF0pO1xuXG4gIGNvbnN0IHVwZGF0ZUxpc3RRdWVyeSA9IChwYXRjaCkgPT4ge1xuICAgIGNvbnN0IG5leHRQYXJhbXMgPSB7XG4gICAgICBzZWFyY2gsXG4gICAgICBzdGF0dXMsXG4gICAgICBjYXRlZ29yeSxcbiAgICAgIHBsYW5UeXBlLFxuICAgICAgZmVhdHVyZWQsXG4gICAgICBpc0ZlYXR1cmVkLFxuICAgICAgaXNQb3B1bGFyLFxuICAgICAgc29ydEJ5LFxuICAgICAgc29ydE9yZGVyLFxuICAgICAgZGlzcGxheWVkRmllbGRzOiBkaXNwbGF5ZWRGaWVsZHMuam9pbignLCcpLFxuICAgICAgLi4ucGF0Y2gsXG4gICAgfTtcblxuICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCBuZXh0UGFyYW1zKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKHBhdGgsIG5leHRWYWx1ZSkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gdXBkYXRlQXRQYXRoKGN1cnJlbnQsIHBhdGgsIG5leHRWYWx1ZSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZEl0ZW0gPSAocGF0aCwgbmV4dEl0ZW0pID0+IHtcbiAgICBzZXRSZWNvcmQoKGN1cnJlbnQpID0+IGFwcGVuZEF0UGF0aChjdXJyZW50LCBwYXRoLCBuZXh0SXRlbSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZUl0ZW0gPSAocGF0aCkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gcmVtb3ZlQXRQYXRoKGN1cnJlbnQsIHBhdGgpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3ZlSXRlbSA9IChwYXRoLCBvZmZzZXQpID0+IHtcbiAgICBzZXRSZWNvcmQoKGN1cnJlbnQpID0+IG1vdmVBdFBhdGgoY3VycmVudCwgcGF0aCwgb2Zmc2V0KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZUludGVudCA9IGFzeW5jIChpbnRlbnQpID0+IHtcbiAgICBpZiAoIXJlY29yZCB8fCAhY2FuRWRpdEN1cnJlbnRSZWNvcmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRTYXZpbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3IoJycpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVxdWVzdFBhZ2UocGFnZU5hbWUsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBpbnRlbnQsXG4gICAgICAgICAgcmVjb3JkSWQ6IHJlY29yZC5pZCA/PyBudWxsLFxuICAgICAgICAgIHJlY29yZCxcbiAgICAgICAgICBuZXc6IGlzTmV3ID8gJzEnIDogdW5kZWZpbmVkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChwYXlsb2FkLmRyYWZ0UmVjb3JkKSB7XG4gICAgICAgIGNvbnN0IG5leHREcmFmdFJlY29yZCA9IGNsb25lVmFsdWUocGF5bG9hZC5kcmFmdFJlY29yZCk7XG4gICAgICAgIHNldFJlY29yZChuZXh0RHJhZnRSZWNvcmQpO1xuICAgICAgICBzZXRPcmlnaW5hbFJlY29yZChjbG9uZVZhbHVlKG5leHREcmFmdFJlY29yZCkpO1xuICAgICAgfVxuICAgICAgc2V0UHVibGlzaGVkUmVjb3JkKHBheWxvYWQucHVibGlzaGVkUmVjb3JkID8gY2xvbmVWYWx1ZShwYXlsb2FkLnB1Ymxpc2hlZFJlY29yZCkgOiBudWxsKTtcbiAgICAgIGlmIChpbnRlbnQgPT09ICd1bnB1Ymxpc2gnKSB7XG4gICAgICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFyZWNvcmRJZCAmJiBwYXlsb2FkLmRyYWZ0UmVjb3JkPy5pZCkge1xuICAgICAgICBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyByZWNvcmRJZDogcGF5bG9hZC5kcmFmdFJlY29yZC5pZCB9KSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXlsb2FkLm5vdGljZSkge1xuICAgICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiBwYXlsb2FkLm5vdGljZS5tZXNzYWdlLCB0eXBlOiBwYXlsb2FkLm5vdGljZS50eXBlIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocGF5bG9hZC5kZWxldGVkKSB7XG4gICAgICAgIG5hdmlnYXRlKGAvYWRtaW4vcGFnZXMvJHtwYWdlTmFtZX1gKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChyZXF1ZXN0RXJyb3IpIHtcbiAgICAgIHNldEVycm9yKHJlcXVlc3RFcnJvci5tZXNzYWdlKTtcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHJlcXVlc3RFcnJvci5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTYXZpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVEaXNjYXJkQ2hhbmdlcyA9ICgpID0+IHtcbiAgICBzZXRSZWNvcmQoZ2V0RW1wdHlJdGVtKHJlY29yZCkpO1xuICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDcmVhdGUgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGRlZmluaXRpb24/LmFsbG93Q3JlYXRlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyBuZXc6IDEgfSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxpc3RBY3Rpb24gPSBhc3luYyAoaW50ZW50LCB0YXJnZXRSZWNvcmRJZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVxdWVzdFBhZ2UocGFnZU5hbWUsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBpbnRlbnQsXG4gICAgICAgICAgcmVjb3JkSWQ6IHRhcmdldFJlY29yZElkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHBheWxvYWQubm90aWNlPy5tZXNzYWdlID8/IGAke2RlZmluaXRpb24ubGFiZWx9IHVwZGF0ZWQuYCwgdHlwZTogcGF5bG9hZC5ub3RpY2U/LnR5cGUgPz8gJ3N1Y2Nlc3MnIH0pO1xuXG4gICAgICBpZiAoaW50ZW50ID09PSAnZHVwbGljYXRlJyAmJiBwYXlsb2FkLmRyYWZ0UmVjb3JkPy5pZCkge1xuICAgICAgICBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyByZWNvcmRJZDogcGF5bG9hZC5kcmFmdFJlY29yZC5pZCB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGludGVudCA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgc2V0UmVjb3JkcygoY3VycmVudCkgPT4gY3VycmVudC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IHRhcmdldFJlY29yZElkKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAocmVxdWVzdEVycm9yKSB7XG4gICAgICBzZXRFcnJvcihyZXF1ZXN0RXJyb3IubWVzc2FnZSk7XG4gICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiByZXF1ZXN0RXJyb3IubWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVwbHlDaGFuZ2UgPSAoZmllbGQsIHZhbHVlKSA9PiB7XG4gICAgc2V0UmVwbHlEcmFmdCgoY3VycmVudCkgPT4gKHtcbiAgICAgIC4uLmN1cnJlbnQsXG4gICAgICBbZmllbGRdOiB2YWx1ZSxcbiAgICB9KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VuZFJlcGx5ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChwYWdlTmFtZSAhPT0gJ21lc3NhZ2VzJyB8fCAhcmVjb3JkSWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRTZW5kaW5nUmVwbHkodHJ1ZSk7XG4gICAgc2V0RXJyb3IoJycpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVxdWVzdFBhZ2UocGFnZU5hbWUsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBpbnRlbnQ6ICdzZW5kUmVwbHknLFxuICAgICAgICAgIHJlY29yZElkLFxuICAgICAgICAgIHJlcGx5OiByZXBseURyYWZ0LFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChwYXlsb2FkLmRyYWZ0UmVjb3JkKSB7XG4gICAgICAgIGNvbnN0IG5leHREcmFmdFJlY29yZCA9IGNsb25lVmFsdWUocGF5bG9hZC5kcmFmdFJlY29yZCk7XG4gICAgICAgIHNldFJlY29yZChuZXh0RHJhZnRSZWNvcmQpO1xuICAgICAgICBzZXRPcmlnaW5hbFJlY29yZChjbG9uZVZhbHVlKG5leHREcmFmdFJlY29yZCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGF5bG9hZC5ub3RpY2UpIHtcbiAgICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcGF5bG9hZC5ub3RpY2UubWVzc2FnZSwgdHlwZTogcGF5bG9hZC5ub3RpY2UudHlwZSB9KTtcbiAgICAgIH1cblxuICAgICAgc2V0UmVwbHlEcmFmdCh7XG4gICAgICAgIHN1YmplY3Q6IHJlcGx5RHJhZnQuc3ViamVjdCB8fCAnUmU6IFlvdXIgbWVzc2FnZSB0byBUaGUgTGVhZGVuaGFsbCBXb3JrcycsXG4gICAgICAgIGJvZHk6ICcnLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAocmVxdWVzdEVycm9yKSB7XG4gICAgICBzZXRFcnJvcihyZXF1ZXN0RXJyb3IubWVzc2FnZSk7XG4gICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiByZXF1ZXN0RXJyb3IubWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0U2VuZGluZ1JlcGx5KGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGhlaWdodDogJzEwMCUnIH19PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgcmV0dXJuIDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj5Db2xsZWN0aW9uIGRlZmluaXRpb24gbWlzc2luZy48L01lc3NhZ2VCb3g+O1xuICB9XG5cbiAgaWYgKG1vZGUgPT09ICdsaXN0Jykge1xuICAgIHJldHVybiAoXG4gICAgICA8TGlzdFZpZXdcbiAgICAgICAgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn1cbiAgICAgICAgcmVjb3Jkcz17cmVjb3Jkc31cbiAgICAgICAgY29udHJvbHM9e2NvbnRyb2xzID8/IHtcbiAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRlZmluaXRpb24ubGlzdENvbHVtbnMubWFwKChjb2x1bW4pID0+IGNvbHVtbi5maWVsZCksXG4gICAgICAgICAgYXZhaWxhYmxlRmllbGRzOiBkZWZpbml0aW9uLmxpc3RDb2x1bW5zLFxuICAgICAgICAgIGZpbHRlcnM6IFtdLFxuICAgICAgICAgIGFjdGl2ZUZpbHRlcnM6IHt9LFxuICAgICAgICAgIHNvcnRCeTogJycsXG4gICAgICAgICAgc29ydE9yZGVyOiAnZGVzYycsXG4gICAgICAgIH19XG4gICAgICAgIHNlYXJjaD17c2VhcmNofVxuICAgICAgICBsb2FkaW5nPXtsaXN0TG9hZGluZ31cbiAgICAgICAgb25TZWFyY2g9eyhuZXh0U2VhcmNoKSA9PiB1cGRhdGVMaXN0UXVlcnkoeyBzZWFyY2g6IG5leHRTZWFyY2ggfSl9XG4gICAgICAgIG9uT3BlblJlY29yZD17KG5leHRSZWNvcmRJZCkgPT4gbmF2aWdhdGUoYnVpbGRBZG1pblBhdGgobG9jYXRpb24ucGF0aG5hbWUsIHsgcmVjb3JkSWQ6IG5leHRSZWNvcmRJZCB9KSl9XG4gICAgICAgIG9uQ3JlYXRlPXtoYW5kbGVDcmVhdGV9XG4gICAgICAgIG9uU2V0U29ydD17KGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV4dE9yZGVyID0gY29udHJvbHM/LnNvcnRCeSA9PT0gZmllbGQgJiYgY29udHJvbHM/LnNvcnRPcmRlciA9PT0gJ2FzYycgPyAnZGVzYycgOiAnYXNjJztcbiAgICAgICAgICB1cGRhdGVMaXN0UXVlcnkoeyBzb3J0Qnk6IGZpZWxkLCBzb3J0T3JkZXI6IG5leHRPcmRlciB9KTtcbiAgICAgICAgfX1cbiAgICAgICAgb25TZXRGaWx0ZXI9eyhmaWVsZCwgdmFsdWUpID0+IHVwZGF0ZUxpc3RRdWVyeSh7IFtmaWVsZF06IHZhbHVlIH0pfVxuICAgICAgICBvblJlc2V0RmlsdGVycz17KCkgPT4gdXBkYXRlTGlzdFF1ZXJ5KHtcbiAgICAgICAgICBzdGF0dXM6ICcnLFxuICAgICAgICAgIGNhdGVnb3J5OiAnJyxcbiAgICAgICAgICBwbGFuVHlwZTogJycsXG4gICAgICAgICAgZmVhdHVyZWQ6ICcnLFxuICAgICAgICAgIGlzRmVhdHVyZWQ6ICcnLFxuICAgICAgICAgIGlzUG9wdWxhcjogJycsXG4gICAgICAgIH0pfVxuICAgICAgICBvblRvZ2dsZURpc3BsYXllZEZpZWxkPXsoZmllbGQsIGNoZWNrZWQpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXh0RmllbGRzID0gY2hlY2tlZFxuICAgICAgICAgICAgPyBbLi4ubmV3IFNldChbLi4uKGNvbnRyb2xzPy5kaXNwbGF5ZWRGaWVsZHMgPz8gW10pLCBmaWVsZF0pXVxuICAgICAgICAgICAgOiAoY29udHJvbHM/LmRpc3BsYXllZEZpZWxkcyA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBmaWVsZCk7XG5cbiAgICAgICAgICB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgICAgZGlzcGxheWVkRmllbGRzOiBuZXh0RmllbGRzLmpvaW4oJywnKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfX1cbiAgICAgICAgb25SZXNldERpc3BsYXllZEZpZWxkcz17KCkgPT4gdXBkYXRlTGlzdFF1ZXJ5KHtcbiAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRlZmluaXRpb24ubGlzdENvbHVtbnMubWFwKChjb2x1bW4pID0+IGNvbHVtbi5maWVsZCkuam9pbignLCcpLFxuICAgICAgICB9KX1cbiAgICAgICAgb25EdXBsaWNhdGVSZWNvcmQ9eyh0YXJnZXRSZWNvcmRJZCkgPT4gaGFuZGxlTGlzdEFjdGlvbignZHVwbGljYXRlJywgdGFyZ2V0UmVjb3JkSWQpfVxuICAgICAgICBvbkRlbGV0ZVJlY29yZD17KHRhcmdldFJlY29yZElkKSA9PiBoYW5kbGVMaXN0QWN0aW9uKCdkZWxldGUnLCB0YXJnZXRSZWNvcmRJZCl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBpZiAoIXJlY29yZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgICAgPEVkaXRWaWV3XG4gICAgICAgIGRlZmluaXRpb249e2RlZmluaXRpb259XG4gICAgICAgIHJlY29yZD17cmVjb3JkfVxuICAgICAgcHVibGlzaGVkUmVjb3JkPXtwdWJsaXNoZWRSZWNvcmR9XG4gICAgICBhY3RpdmVUYWI9e2FjdGl2ZVRhYn1cbiAgICAgIG9uU3dpdGNoVGFiPXtzZXRBY3RpdmVUYWJ9XG4gICAgICBzYXZpbmc9e3NhdmluZ31cbiAgICAgIGVycm9yPXtlcnJvcn1cbiAgICAgIG9uQmFjaz17KCkgPT4gbmF2aWdhdGUoYC9hZG1pbi9wYWdlcy8ke3BhZ2VOYW1lfWApfVxuICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgIG9uQWRkSXRlbT17aGFuZGxlQWRkSXRlbX1cbiAgICAgIG9uUmVtb3ZlSXRlbT17aGFuZGxlUmVtb3ZlSXRlbX1cbiAgICAgIG9uTW92ZUl0ZW09e2hhbmRsZU1vdmVJdGVtfVxuICAgICAgb25TYXZlPXsoKSA9PiBoYW5kbGVTYXZlSW50ZW50KCdzYXZlJyl9XG4gICAgICBvblB1Ymxpc2g9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ3B1Ymxpc2gnKX1cbiAgICAgIG9uRGVsZXRlPXsoKSA9PiBoYW5kbGVTYXZlSW50ZW50KCdkZWxldGUnKX1cbiAgICAgICAgb25EaXNjYXJkQ2hhbmdlcz17aGFuZGxlRGlzY2FyZENoYW5nZXN9XG4gICAgICAgIG9uVW5wdWJsaXNoPXsoKSA9PiBoYW5kbGVTYXZlSW50ZW50KCd1bnB1Ymxpc2gnKX1cbiAgICAgICAgY2FuU2F2ZT17Y2FuU2F2ZX1cbiAgICAgICAgY2FuUHVibGlzaD17Y2FuUHVibGlzaH1cbiAgICAgICAgY2FuRGlzY2FyZD17Y2FuRGlzY2FyZH1cbiAgICAgICAgY2FuVW5wdWJsaXNoPXtjYW5VbnB1Ymxpc2h9XG4gICAgICAgIHJlcGx5RHJhZnQ9e3JlcGx5RHJhZnR9XG4gICAgICAgIG9uUmVwbHlDaGFuZ2U9e2hhbmRsZVJlcGx5Q2hhbmdlfVxuICAgICAgICBvblNlbmRSZXBseT17aGFuZGxlU2VuZFJlcGx5fVxuICAgICAgICBzZW5kaW5nUmVwbHk9e3NlbmRpbmdSZXBseX1cbiAgICAgICAgaXNDcmVhdGVNb2RlPXtpc05ld31cbiAgICAgIC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUGFyYW1zIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBMb2FkZXIsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG5jb25zdCBNVUxUSUxJTkVfRklFTERfUEFUVEVSTiA9IC8oZGVzY3JpcHRpb258Y29udGVudHxtZXNzYWdlfGJvZHl8c3VidGl0bGV8ZXhjZXJwdHxpbnRyb3xob3Vyc3xhZGRyZXNzfHRleHR8cGFyYWdyYXBofG92ZXJ2aWV3fGNoYWxsZW5nZXxyZXN1bHQpL2k7XG5jb25zdCBJTUFHRV9GSUVMRF9QQVRURVJOID0gLyhpbWFnZXxiYWNrZ3JvdW5kfGxvZ298dGh1bWJuYWlsfGZlYXR1cmVkKS9pO1xuY29uc3QgUEFUSF9GSUVMRF9QQVRURVJOID0gLyhecGF0aCR8UGF0aCQpLztcbmNvbnN0IEZVTExfV0lEVEhfRklFTERfUEFUVEVSTiA9IC8oZGVzY3JpcHRpb258Y29udGVudHxtZXNzYWdlfGJvZHl8c3VidGl0bGV8ZXhjZXJwdHxpbnRyb3xvdmVydmlld3xjaGFsbGVuZ2V8cmVzdWx0fGJhY2tncm91bmR8aW1hZ2V8Z2FsbGVyeXxzZWN0aW9uc3x0ZXN0aW1vbmlhbHN8c2VydmljZXN8d2h5Q2hvb3NlSXRlbXN8ZmVhdHVyZUNoaXBzfHNvY2lhbExpbmtzfGZhcUl0ZW1zfGNvbXBhcmlzb25Sb3dzfGNvbXBhcmlzb25Db2x1bW5zfHN0b3J5UGFyYWdyYXBoc3xyZWxhdGVkV29ya3NwYWNlc3xjaGFsbGVuZ2VJdGVtc3xhbWVuaXRpZXN8bmF2aWdhdGlvbnxmb290ZXJ8Zm9ybSkvaTtcbmNvbnN0IFJFUVVJUkVEX0ZJRUxEX1BBVFRFUk4gPSAvKGhlcm9UaXRsZXxoZXJvU3VidGl0bGV8c3RvcnlUaXRsZXx3aHlDaG9vc2VUaXRsZXxhbWVuaXRpZXNUaXRsZXx0aXRsZSkkL2k7XG5jb25zdCBST1VURV9PUFRJT05TID0gW1xuICB7IHZhbHVlOiAnLycsIGxhYmVsOiAnSG9tZScgfSxcbiAgeyB2YWx1ZTogJy9wcmljaW5nJywgbGFiZWw6ICdQcmljaW5nJyB9LFxuICB7IHZhbHVlOiAnL21lZXRpbmctcm9vbXMnLCBsYWJlbDogJ01lZXRpbmcgUm9vbXMnIH0sXG4gIHsgdmFsdWU6ICcvdmlydHVhbC1vZmZpY2UnLCBsYWJlbDogJ1ZpcnR1YWwgT2ZmaWNlJyB9LFxuICB7IHZhbHVlOiAnL2Fib3V0JywgbGFiZWw6ICdBYm91dCcgfSxcbiAgeyB2YWx1ZTogJy9jb250YWN0JywgbGFiZWw6ICdDb250YWN0JyB9LFxuICB7IHZhbHVlOiAnL2ZhcScsIGxhYmVsOiAnRkFRJyB9LFxuICB7IHZhbHVlOiAnL2Jsb2cnLCBsYWJlbDogJ0Jsb2cnIH0sXG4gIHsgdmFsdWU6ICcvcHJpdmFjeScsIGxhYmVsOiAnUHJpdmFjeSBQb2xpY3knIH0sXG4gIHsgdmFsdWU6ICcvdGVybXMnLCBsYWJlbDogJ1Rlcm1zJyB9LFxuICB7IHZhbHVlOiAnL2Rhc2hib2FyZCcsIGxhYmVsOiAnRGFzaGJvYXJkJyB9LFxuXTtcblxuY29uc3QgUEFHRV9MQVlPVVRTID0ge1xuICAnc2l0ZS1zZXR0aW5ncyc6IFtcbiAgICB7IGZpZWxkczogWydzaXRlTmFtZScsICd0YWdsaW5lJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0RW1haWwnLCAnY29udGFjdFBob25lJywgJ2FkZHJlc3MnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2RlZmF1bHRTZW9UaXRsZScsICdkZWZhdWx0U2VvRGVzY3JpcHRpb24nXSB9LFxuICAgIHsgZmllbGRzOiBbJ25hdmlnYXRpb24nXSB9LFxuICAgIHsgZmllbGRzOiBbJ2Zvb3RlciddIH0sXG4gICAgeyBmaWVsZHM6IFsnc29jaWFsTGlua3MnXSB9LFxuICBdLFxuICBob21lcGFnZTogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm8nLCAnZmVhdHVyZUNoaXBzJ10gfSxcbiAgICB7IGZpZWxkczogWydzZXJ2aWNlc0V5ZWJyb3cnLCAnc2VydmljZXNLaWNrZXInLCAnc2VydmljZXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2Fib3V0SGlnaGxpZ2h0J10gfSxcbiAgICB7IGZpZWxkczogWyd3aHlDaG9vc2VFeWVicm93JywgJ3doeUNob29zZUtpY2tlcicsICd3aHlDaG9vc2VUaXRsZScsICd3aHlDaG9vc2VJdGVtcyddIH0sXG4gICAgeyBmaWVsZHM6IFsndGVzdGltb25pYWxzRXllYnJvdycsICd0ZXN0aW1vbmlhbHNLaWNrZXInLCAndGVzdGltb25pYWxzVGl0bGUnLCAndGVzdGltb25pYWxzJ10gfSxcbiAgICB7IGZpZWxkczogWydnYWxsZXJ5RXllYnJvdycsICdnYWxsZXJ5S2lja2VyJywgJ2dhbGxlcnlUaXRsZScsICdnYWxsZXJ5SW1hZ2VzJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0Rm9ybSddIH0sXG4gICAgeyBmaWVsZHM6IFsndmlzaXRVc1RpdGxlJywgJ2FkZHJlc3NMYWJlbCcsICdlbWFpbExhYmVsJywgJ3Bob25lTGFiZWwnLCAnb3BlbkhvdXJzTGFiZWwnLCAnd2Vla2RheUhvdXJzJywgJ3dlZWtlbmRIb3VycycsICdtYXBCdXR0b25MYWJlbCddIH0sXG4gIF0sXG4gICdhYm91dC1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnc3RvcnlUaXRsZScsICdzdG9yeVBhcmFncmFwaHMnLCAnc3RvcnlJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnd2h5Q2hvb3NlVGl0bGUnLCAnd2h5Q2hvb3NlSXRlbXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2FtZW5pdGllc1RpdGxlJywgJ2FtZW5pdGllc0ltYWdlJywgJ2FtZW5pdGllcyddIH0sXG4gIF0sXG4gICdibG9nLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydzZWFyY2hQbGFjZWhvbGRlcicsICdxdWlja1NlYXJjaFRpdGxlJywgJ3JlY2VudFBvc3RzVGl0bGUnLCAnY2F0ZWdvcmllc1RpdGxlJywgJ3BvcHVsYXJUYWdzVGl0bGUnLCAnbm9SZXN1bHRzVGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnZGV0YWlsQmFja0xhYmVsJywgJ2RldGFpbFNlYXJjaFRpdGxlJywgJ2RldGFpbFNlYXJjaEJ1dHRvbkxhYmVsJywgJ2RldGFpbFBvcHVsYXJUYWdzVGl0bGUnLCAnZGV0YWlsUmVjZW50UG9zdHNUaXRsZScsICdkZXRhaWxSZWxhdGVkV29ya3NwYWNlc1RpdGxlJ10gfSxcbiAgICB7IGZpZWxkczogWydkZXRhaWxDb21tZW50Rm9ybSddIH0sXG4gICAgeyBmaWVsZHM6IFsncmVsYXRlZFdvcmtzcGFjZXMnXSB9LFxuICBdLFxuICAncHJpY2luZy1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29tcGFyaXNvblRpdGxlJywgJ2ZlYXR1cmVMaXN0VGl0bGUnLCAnZmVhdHVyZUxpc3RTdWJ0aXRsZScsICdjb21wYXJpc29uQ29sdW1ucycsICdjb21wYXJpc29uUm93cycsICdyZWNvbW1lbmRlZExhYmVsJywgJ3B1cmNoYXNlQnV0dG9uTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2ZhcVRpdGxlJywgJ2ZhcVN1YnRpdGxlJywgJ2ZhcUl0ZW1zJ10gfSxcbiAgXSxcbiAgJ2ZhcS1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2V5ZWJyb3cnLCAnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJywgJ3RpdGxlJywgJ2Rlc2NyaXB0aW9uJ10gfSxcbiAgICB7IGZpZWxkczogWydzZWFyY2hQbGFjZWhvbGRlcicsICdub1Jlc3VsdHNUZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydjdGFUaXRsZScsICdjdGFEZXNjcmlwdGlvbicsICdjdGFCdXR0b25MYWJlbCddIH0sXG4gIF0sXG4gICdtZWV0aW5nLXJvb21zLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydyb29tc1RpdGxlJywgJ3Jvb21zU3VidGl0bGUnLCAnYm9va05vd0xhYmVsJywgJ3JlYWRNb3JlTGFiZWwnLCAncG9wdWxhckxhYmVsJ10gfSxcbiAgICB7IGZpZWxkczogWydwbGFuc1RpdGxlJywgJ3BsYW5zU3VidGl0bGUnLCAnZ2V0U3RhcnRlZExhYmVsJ10gfSxcbiAgICB7IGZpZWxkczogWydhbWVuaXRpZXNUaXRsZScsICdhbWVuaXRpZXNTdWJ0aXRsZScsICdhbWVuaXRpZXMnXSB9LFxuICBdLFxuICAndmlydHVhbC1vZmZpY2UtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ292ZXJ2aWV3VGl0bGUnLCAnb3ZlcnZpZXdUZXh0JywgJ2ZlYXR1cmVkSW1hZ2UnLCAnZ2FsbGVyeUltYWdlcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnY2hhbGxlbmdlVGl0bGUnLCAnY2hhbGxlbmdlSW50cm8nLCAnY2hhbGxlbmdlSXRlbXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Jlc3VsdFRpdGxlJywgJ3Jlc3VsdFRleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2N0YVRpdGxlJywgJ2N0YURlc2NyaXB0aW9uJywgJ2N0YUJ1dHRvbkxhYmVsJ10gfSxcbiAgICB7IGZpZWxkczogWydwcm9qZWN0SW5mb1RpdGxlJywgJ3Byb2plY3REYXRlTGFiZWwnLCAncHJvamVjdERhdGVWYWx1ZScsICdwcm9qZWN0V2Vic2l0ZUxhYmVsJywgJ3Byb2plY3RXZWJzaXRlVmFsdWUnLCAncHJvamVjdENhdGVnb3J5TGFiZWwnLCAncHJvamVjdENhdGVnb3J5VmFsdWUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RGb3JtJ10gfSxcbiAgXSxcbiAgJ2NvbnRhY3QtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2ludHJvRXllYnJvdycsICdpbnRyb1RpdGxlJ10gfSxcbiAgICB7IGZpZWxkczogWydhZGRyZXNzQ2FyZFRpdGxlJywgJ3Bob25lQ2FyZFRpdGxlJywgJ2VtYWlsQ2FyZFRpdGxlJ10gfSxcbiAgICB7IGZpZWxkczogWydmb3JtJ10gfSxcbiAgICB7IGZpZWxkczogWydtYXBUaXRsZScsICdtYXBEZXNjcmlwdGlvbiddIH0sXG4gIF0sXG4gICdwcml2YWN5LXBvbGljeS1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2VmZmVjdGl2ZURhdGVMYWJlbCcsICdlZmZlY3RpdmVEYXRlVmFsdWUnLCAnaW50cm9UZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydzZWN0aW9ucyddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdFRpdGxlJywgJ2NvbnRhY3RCb2R5JywgJ2NvbnRhY3RCdXR0b25MYWJlbCddIH0sXG4gIF0sXG4gICd0ZXJtcy1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2VmZmVjdGl2ZURhdGVMYWJlbCcsICdlZmZlY3RpdmVEYXRlVmFsdWUnLCAnaW50cm9UZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydzZWN0aW9ucyddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdFRpdGxlJywgJ2NvbnRhY3RCb2R5JywgJ2NvbnRhY3RCdXR0b25MYWJlbCddIH0sXG4gIF0sXG59O1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tZWRpdG9yIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMzJweCA0MHB4IDY0cHggNDBweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1lZGl0b3JfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiAxMjQwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4uYWRtaW4tYmFjayB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XG59XG5cbi5hZG1pbi1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG5cbi5hZG1pbi1tZXRhIHtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cblxuLmFkbWluLXRpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLXN0YXR1cyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIG1hcmdpbi10b3A6IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjNmYwYzI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2VmZmZlZDtcbiAgY29sb3I6ICMyZjY4NDY7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmFkbWluLWtlYmFiIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tdGFicyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYWVhZWY7XG59XG5cbi5hZG1pbi10YWIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDAgMCAxMnB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tdGFiLS1hY3RpdmUge1xuICBjb2xvcjogIzQ5NDVmZjtcbn1cblxuLmFkbWluLXRhYi0tYWN0aXZlOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IC0xcHg7XG4gIGhlaWdodDogMnB4O1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tbGF5b3V0IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwgMWZyKSAyMzJweDtcbiAgZ2FwOiAxNnB4O1xuICBhbGlnbi1pdGVtczogc3RhcnQ7XG59XG5cbi5hZG1pbi1tYWluLWNhcmQsXG4uYWRtaW4tc2lkZS1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbn1cblxuLmFkbWluLW1haW4tY2FyZCB7XG4gIHBhZGRpbmc6IDI0cHg7XG59XG5cbi5hZG1pbi1zZWN0aW9uICsgLmFkbWluLXNlY3Rpb24ge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4uYWRtaW4tZmllbGQtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKTtcbiAgZ2FwOiAyMHB4IDI0cHg7XG59XG5cbi5hZG1pbi1maWVsZCB7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLmFkbWluLWZpZWxkLS1mdWxsIHtcbiAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcbn1cblxuLmFkbWluLWxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMnB4O1xuICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYWRtaW4tbGFiZWxfX3JlcXVpcmVkIHtcbiAgY29sb3I6ICNkMDJiMjA7XG59XG5cbi5hZG1pbi1pbnB1dCxcbi5hZG1pbi10ZXh0YXJlYSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwLjYyNXJlbSAwLjg3NXJlbTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5hZG1pbi1pbnB1dCB7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbn1cblxuLmFkbWluLWlucHV0OmZvY3VzLFxuLmFkbWluLXRleHRhcmVhOmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjNDk0NWZmO1xuICBib3gtc2hhZG93OiAwIDAgMCAxcHggIzQ5NDVmZjtcbn1cblxuLmFkbWluLWlucHV0OmRpc2FibGVkLFxuLmFkbWluLXRleHRhcmVhOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi10ZXh0YXJlYSB7XG4gIG1pbi1oZWlnaHQ6IDUuNzVyZW07XG4gIHJlc2l6ZTogdmVydGljYWw7XG59XG5cbi5hZG1pbi1tZWRpYSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmFkbWluLW1lZGlhX19jYW52YXMge1xuICBtaW4taGVpZ2h0OiAxNDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZiO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmFkbWluLW1lZGlhX19lbXB0eSB7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhX19zdGFjayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX3RodW1iIHtcbiAgbWF4LXdpZHRoOiAyNDBweDtcbiAgbWF4LWhlaWdodDogMTQwcHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX2FjdGlvbiB7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLW1lZGlhX19hY3Rpb246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLW1lZGlhX19maWxlbmFtZSB7XG4gIG1heC13aWR0aDogMjgwcHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLmFkbWluLW1lZGlhX19zb3VyY2Uge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX3NvdXJjZS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbn1cblxuLmFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uIHtcbiAgbWluLWhlaWdodDogMnJlbTtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1tZWRpYV9fZXJyb3Ige1xuICBjb2xvcjogI2QwMmIyMDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbn1cblxuLmFkbWluLW9iamVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmFkbWluLW9iamVjdF9fdGl0bGUge1xuICBtYXJnaW46IDAgMCAxMnB4O1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2hlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4IDEwcHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fdGl0bGUge1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2NvdW50IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2l0ZW0gKyAuYWRtaW4tcmVwZWF0YWJsZV9faXRlbSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyIHN1bW1hcnkge1xuICBiYWNrZ3JvdW5kOiAjZjBmMGZmO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbVtvcGVuXSBzdW1tYXJ5IHtcbiAgYmFja2dyb3VuZDogI2ZhZmFmYjtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnkge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5Ojotd2Via2l0LWRldGFpbHMtbWFya2VyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnktbGVmdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fYnVsbGV0IHtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjU7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMC42MjVyZW07XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19uYW1lIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b24ge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGUge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBncmFiO1xuICBwYWRkaW5nOiAwIDJweDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmFjdGl2ZSB7XG4gIGN1cnNvcjogZ3JhYmJpbmc7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZTpkaXNhYmxlZCB7XG4gIGNvbG9yOiAjYzRjNGQyO1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkOmRpc2FibGVkLFxuLmFkbWluLXNpZGUtYnV0dG9uOmRpc2FibGVkLFxuLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnk6ZGlzYWJsZWQge1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICBvcGFjaXR5OiAxO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkOmRpc2FibGVkIHtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19ib2R5IHtcbiAgcGFkZGluZzogMTZweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2FkZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tc3dpdGNoIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAwLjYyNXJlbSAwLjg3NXJlbTtcbn1cblxuLmFkbWluLXN3aXRjaCBpbnB1dCB7XG4gIGFjY2VudC1jb2xvcjogIzQ5NDVmZjtcbn1cblxuLmFkbWluLXN3aXRjaDpoYXMoaW5wdXQ6ZGlzYWJsZWQpIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG5cbi5hZG1pbi1zaWRlLWNhcmQgKyAuYWRtaW4tc2lkZS1jYXJkIHtcbiAgbWFyZ2luLXRvcDogMTJweDtcbn1cblxuLmFkbWluLXNpZGUtY2FyZF9faGVhZCB7XG4gIHBhZGRpbmc6IDE0cHggMTZweCA4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4uYWRtaW4tc2lkZS1jYXJkX19ib2R5IHtcbiAgcGFkZGluZzogMCAxMnB4IDEycHg7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbi1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbixcbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0OTQ1ZmY7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tc2lkZS1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIGJvcmRlci1jb2xvcjogI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbi0tbWVudSB7XG4gIHdpZHRoOiAycmVtO1xuICBmbGV4OiAwIDAgMnJlbTtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogY2FsYygxMDAlICsgOHB4KTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAyMjBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDEycHggMzJweCByZ2JhKDMzLCAzMywgNTIsIDAuMTIpO1xuICBwYWRkaW5nOiA4cHggMDtcbiAgei1pbmRleDogNDA7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyIHtcbiAgY29sb3I6ICNkMDJiMjA7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvbiB7XG4gIHdpZHRoOiAxOHB4O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMTE4MHB4KSB7XG4gIC5hZG1pbi1sYXlvdXQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAuYWRtaW4tZWRpdG9yIHtcbiAgICBwYWRkaW5nOiAyMHB4IDE2cHggNDhweDtcbiAgfVxuXG4gIC5hZG1pbi1maWVsZC1ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuYDtcblxuZnVuY3Rpb24gdG9MYWJlbChuYW1lKSB7XG4gIHJldHVybiBuYW1lXG4gICAgLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csICckMSAkMicpXG4gICAgLnJlcGxhY2UoL1tfLV0rL2csICcgJylcbiAgICAucmVwbGFjZSgvXFxic2VvXFxiL2dpLCAnU0VPJylcbiAgICAucmVwbGFjZSgvXFxiY3RhXFxiL2dpLCAnQ1RBJylcbiAgICAucmVwbGFjZSgvXFxiZmFxXFxiL2dpLCAnRkFRJylcbiAgICAucmVwbGFjZSgvXFxiaWRcXGIvZ2ksICdJRCcpXG4gICAgLnJlcGxhY2UoL1xcYnVybFxcYi9naSwgJ1VSTCcpXG4gICAgLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgIC50cmltKClcbiAgICAucmVwbGFjZSgvXi4vLCAodmFsdWUpID0+IHZhbHVlLnRvVXBwZXJDYXNlKCkpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWVsZExhYmVsKGZpZWxkS2V5KSB7XG4gIGlmIChmaWVsZEtleSA9PT0gJ3BhdGgnKSB7XG4gICAgcmV0dXJuICdEZXN0aW5hdGlvbic7XG4gIH1cblxuICBpZiAoZmllbGRLZXkuZW5kc1dpdGgoJ1BhdGgnKSkge1xuICAgIHJldHVybiB0b0xhYmVsKGZpZWxkS2V5LnJlcGxhY2UoL1BhdGgkLywgJ0Rlc3RpbmF0aW9uJykpO1xuICB9XG5cbiAgcmV0dXJuIHRvTGFiZWwoZmllbGRLZXkpO1xufVxuXG5mdW5jdGlvbiBnZXRQYXRoT3B0aW9ucyhjdXJyZW50VmFsdWUpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IFsuLi5ST1VURV9PUFRJT05TXTtcblxuICBpZiAoY3VycmVudFZhbHVlICYmICFvcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBjdXJyZW50VmFsdWUpKSB7XG4gICAgb3B0aW9ucy51bnNoaWZ0KHtcbiAgICAgIHZhbHVlOiBjdXJyZW50VmFsdWUsXG4gICAgICBsYWJlbDogJ0N1cnJlbnQgZGVzdGluYXRpb24nLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGNsb25lVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gdG9Db21wYXJhYmxlVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoaXRlbSkgPT4gdG9Db21wYXJhYmxlVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKVxuICAgICAgLnNvcnQoKVxuICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09ICdfX3RlbXBJZCcpXG4gICAgICAucmVkdWNlKChhY2N1bXVsYXRvciwga2V5KSA9PiB7XG4gICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZVtrZXldKTtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBoYXNNZWFuaW5nZnVsVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNvbWUoKGl0ZW0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModmFsdWUpXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4ga2V5ICE9PSAnX190ZW1wSWQnKVxuICAgICAgLnNvbWUoKFssIG5lc3RlZFZhbHVlXSkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKG5lc3RlZFZhbHVlKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlICE9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlbmFtZSh1cmwpIHtcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRobmFtZSA9IG5ldyBVUkwodXJsKS5wYXRobmFtZTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGhuYW1lLnNwbGl0KCcvJykucG9wKCk7XG4gICAgcmV0dXJuIGZpbGVuYW1lIHx8IHVybDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVybC5zcGxpdCgnLycpLnBvcCgpIHx8IHVybDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFbXB0eUl0ZW0oc2FtcGxlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNhbXBsZSkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoc2FtcGxlICYmIHR5cGVvZiBzYW1wbGUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIE9iamVjdC5rZXlzKHNhbXBsZSlcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09ICdpZCcpXG4gICAgICAgIC5tYXAoKGtleSkgPT4gW2tleSwgZ2V0RW1wdHlJdGVtKHNhbXBsZVtrZXldKV0pLFxuICAgICk7XG4gIH1cblxuICBpZiAodHlwZW9mIHNhbXBsZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzYW1wbGUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0UGF0aCh2YWx1ZSwgcGF0aCwgbmV4dFZhbHVlKSB7XG4gIGlmICghcGF0aC5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV4dFZhbHVlO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gdXBkYXRlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRWYWx1ZSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoKSB7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUuZmlsdGVyKChfLCBpbmRleCkgPT4gaW5kZXggIT09IHBhdGhbMF0pO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gcmVtb3ZlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEF0UGF0aCh2YWx1ZSwgcGF0aCwgbmV4dEl0ZW0pIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBbLi4uKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSksIG5leHRJdGVtXTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IGFwcGVuZEF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0LCBuZXh0SXRlbSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gbW92ZUF0UGF0aCh2YWx1ZSwgcGF0aCwgb2Zmc2V0KSB7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IHBhdGhbMF07XG4gICAgY29uc3QgbmV4dEluZGV4ID0gaW5kZXggKyBvZmZzZXQ7XG5cbiAgICBpZiAobmV4dEluZGV4IDwgMCB8fCBuZXh0SW5kZXggPj0gdmFsdWUubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgY2xvbmUgPSBbLi4udmFsdWVdO1xuICAgIGNvbnN0IFttb3ZlZF0gPSBjbG9uZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGNsb25lLnNwbGljZShuZXh0SW5kZXgsIDAsIG1vdmVkKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSBtb3ZlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG9mZnNldCk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gcGFyc2VJbnB1dFZhbHVlKG5leHRSYXdWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIGlmIChuZXh0UmF3VmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobmV4dFJhd1ZhbHVlKTtcbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZCkgPyBjdXJyZW50VmFsdWUgOiBwYXJzZWQ7XG4gIH1cblxuICByZXR1cm4gbmV4dFJhd1ZhbHVlO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTWVkaWFQcmV2aWV3VXJsKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3QgdHJpbW1lZCA9IHZhbHVlLnRyaW0oKTtcblxuICBpZiAoIXRyaW1tZWQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoL15odHRwcz86XFwvXFwvL2kudGVzdCh0cmltbWVkKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2UvJykpIHtcbiAgICByZXR1cm4gdHJpbW1lZDtcbiAgfVxuXG4gIGlmICh0cmltbWVkLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgIHJldHVybiB0cmltbWVkO1xuICB9XG5cbiAgcmV0dXJuIGAvJHt0cmltbWVkLnJlcGxhY2UoL15cXC4/XFwvLywgJycpfWA7XG59XG5cbmZ1bmN0aW9uIHRvQWRtaW5FcnJvck1lc3NhZ2UoZXJyb3IsIGZhbGxiYWNrKSB7XG4gIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGVycm9yPy5yZXNwb25zZT8uZGF0YTtcblxuICBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YT8ubWVzc2FnZSA9PT0gJ3N0cmluZycgJiYgcmVzcG9uc2VEYXRhLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlRGF0YS5tZXNzYWdlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZXNwb25zZURhdGE/LmVycm9yID09PSAnc3RyaW5nJyAmJiByZXNwb25zZURhdGEuZXJyb3IudHJpbSgpKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlRGF0YS5lcnJvcjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXJyb3I/Lm1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIGVycm9yLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgcmV0dXJuIGVycm9yLm1lc3NhZ2U7XG4gIH1cblxuICByZXR1cm4gZmFsbGJhY2s7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwbG9hZEFkbWluSW1hZ2UoZmlsZSkge1xuICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL21lZGlhL3VwbG9hZCcsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBmb3JtRGF0YSxcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSk7XG5cbiAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQuZXJyb3IgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gIH1cblxuICBjb25zdCB1cGxvYWRlZFVybCA9IHBheWxvYWQ/LnVybCB8fCBwYXlsb2FkPy5pdGVtPy5yZWxhdGl2ZVVybCB8fCBwYXlsb2FkPy5pdGVtPy51cmw7XG5cbiAgaWYgKCF1cGxvYWRlZFVybCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVXBsb2FkIHN1Y2NlZWRlZCBidXQgcmV0dXJuZWQgbm8gVVJMLicpO1xuICB9XG5cbiAgcmV0dXJuIHVwbG9hZGVkVXJsO1xufVxuXG5jb25zdCBNRURJQV9QSUNLRVJfRVZFTlQgPSAnYWRtaW5qcy1tZWRpYS1zZWxlY3QnO1xuXG5mdW5jdGlvbiBjaG9vc2VBZG1pbkxpYnJhcnlJbWFnZSgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJlc29sdmUoJycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBpY2tlcldpbmRvdyA9IHdpbmRvdy5vcGVuKFxuICAgICAgJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5P3BpY2tlcj0xJyxcbiAgICAgICdhZG1pbi1tZWRpYS1saWJyYXJ5LXBpY2tlcicsXG4gICAgICAncG9wdXA9eWVzLHdpZHRoPTE0NDAsaGVpZ2h0PTkwMCxyZXNpemFibGU9eWVzLHNjcm9sbGJhcnM9eWVzJyxcbiAgICApO1xuXG4gICAgaWYgKCFwaWNrZXJXaW5kb3cpIHtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoJ01lZGlhIGxpYnJhcnkgcG9wdXAgd2FzIGJsb2NrZWQuJykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmaW5pc2hlZCA9IGZhbHNlO1xuXG4gICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlTWVzc2FnZSk7XG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChjbG9zZVdhdGNoZXIpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luIHx8IGV2ZW50LnNvdXJjZSAhPT0gcGlja2VyV2luZG93KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LmRhdGE/LnR5cGUgIT09IE1FRElBX1BJQ0tFUl9FVkVOVCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgIGNsZWFudXAoKTtcbiAgICAgIHJlc29sdmUodHlwZW9mIGV2ZW50LmRhdGEudXJsID09PSAnc3RyaW5nJyA/IGV2ZW50LmRhdGEudXJsIDogJycpO1xuICAgIH07XG5cbiAgICBjb25zdCBjbG9zZVdhdGNoZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKHBpY2tlcldpbmRvdy5jbG9zZWQgJiYgIWZpbmlzaGVkKSB7XG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICB9XG4gICAgfSwgNTAwKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlTWVzc2FnZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpc1JlcXVpcmVkRmllbGQoZmllbGRLZXkpIHtcbiAgcmV0dXJuIFJFUVVJUkVEX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSk7XG59XG5cbmZ1bmN0aW9uIGZpZWxkQ2xhc3NOYW1lKGZpZWxkS2V5LCB2YWx1ZSkge1xuICByZXR1cm4gRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGRLZXkpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXG4gICAgPyAnYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGwnXG4gICAgOiAnYWRtaW4tZmllbGQnO1xufVxuXG5mdW5jdGlvbiBpc0hpZGRlbkVkaXRvckZpZWxkKGZpZWxkS2V5KSB7XG4gIHJldHVybiBTdHJpbmcoZmllbGRLZXkpLnRvTG93ZXJDYXNlKCkgPT09ICdpY29uJztcbn1cblxuZnVuY3Rpb24gZ2V0SXRlbVRpdGxlKGl0ZW0sIGZhbGxiYWNrTGFiZWwsIGluZGV4KSB7XG4gIGlmICghaXNQbGFpbk9iamVjdChpdGVtKSkge1xuICAgIHJldHVybiBgJHtmYWxsYmFja0xhYmVsfSAke2luZGV4ICsgMX1gO1xuICB9XG5cbiAgY29uc3QgcHJlZmVycmVkID0gW1xuICAgIGl0ZW0udGl0bGUsXG4gICAgaXRlbS5uYW1lLFxuICAgIGl0ZW0ubGFiZWwsXG4gICAgaXRlbS5xdWVzdGlvbixcbiAgICBpdGVtLmZlYXR1cmUsXG4gICAgaXRlbS5wYXRoLFxuICAgIGl0ZW0uaHJlZixcbiAgICBpdGVtLmFsdCxcbiAgXS5maW5kKCh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS50cmltKCkpO1xuXG4gIHJldHVybiBwcmVmZXJyZWQgfHwgYCR7ZmFsbGJhY2tMYWJlbH0gJHtpbmRleCArIDF9YDtcbn1cblxuZnVuY3Rpb24gYnVpbGRTZWN0aW9ucyhwYWdlTmFtZSwgY29udGVudCkge1xuICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoY29udGVudCA/PyB7fSk7XG4gIGNvbnN0IGxheW91dCA9IFBBR0VfTEFZT1VUU1twYWdlTmFtZV07XG5cbiAgaWYgKCFsYXlvdXQpIHtcbiAgICByZXR1cm4gW3sgZW50cmllcyB9XTtcbiAgfVxuXG4gIGNvbnN0IHVzZWQgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHNlY3Rpb25zID0gbGF5b3V0XG4gICAgLm1hcCgoc2VjdGlvbikgPT4ge1xuICAgICAgY29uc3Qgc2VjdGlvbkVudHJpZXMgPSBzZWN0aW9uLmZpZWxkc1xuICAgICAgICAuZmlsdGVyKChmaWVsZCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbnRlbnQgPz8ge30sIGZpZWxkKSlcbiAgICAgICAgLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICB1c2VkLmFkZChmaWVsZCk7XG4gICAgICAgICAgcmV0dXJuIFtmaWVsZCwgY29udGVudFtmaWVsZF1dO1xuICAgICAgICB9KTtcblxuICAgICAgcmV0dXJuIHsgLi4uc2VjdGlvbiwgZW50cmllczogc2VjdGlvbkVudHJpZXMgfTtcbiAgICB9KVxuICAgIC5maWx0ZXIoKHNlY3Rpb24pID0+IHNlY3Rpb24uZW50cmllcy5sZW5ndGggPiAwKTtcblxuICBjb25zdCBleHRyYUVudHJpZXMgPSBlbnRyaWVzLmZpbHRlcigoW2ZpZWxkS2V5XSkgPT4gIXVzZWQuaGFzKGZpZWxkS2V5KSk7XG5cbiAgaWYgKGV4dHJhRW50cmllcy5sZW5ndGgpIHtcbiAgICBzZWN0aW9ucy5wdXNoKHsgZW50cmllczogZXh0cmFFbnRyaWVzIH0pO1xuICB9XG5cbiAgcmV0dXJuIHNlY3Rpb25zO1xufVxuXG5mdW5jdGlvbiBQcmltaXRpdmVGaWVsZCh7IGZpZWxkS2V5LCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSBnZXRGaWVsZExhYmVsKGZpZWxkS2V5KTtcbiAgY29uc3QgaW5wdXRWYWx1ZSA9IHZhbHVlID8/ICcnO1xuICBjb25zdCByZXF1aXJlZCA9IGlzUmVxdWlyZWRGaWVsZChmaWVsZEtleSk7XG4gIGNvbnN0IGlzSW1hZ2VGaWVsZCA9IHR5cGVvZiBpbnB1dFZhbHVlID09PSAnc3RyaW5nJyAmJiBJTUFHRV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGRLZXkpO1xuICBjb25zdCBpc1BhdGhGaWVsZCA9IHR5cGVvZiBpbnB1dFZhbHVlID09PSAnc3RyaW5nJyAmJiBQQVRIX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSk7XG4gIGNvbnN0IHByZXZpZXdVcmwgPSBpc0ltYWdlRmllbGQgPyByZXNvbHZlTWVkaWFQcmV2aWV3VXJsKGlucHV0VmFsdWUpIDogJyc7XG4gIGNvbnN0IHNob3dQcmV2aWV3ID0gQm9vbGVhbihwcmV2aWV3VXJsKTtcbiAgY29uc3QgZmlsZUlucHV0UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbdXBsb2FkaW5nLCBzZXRVcGxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdXBsb2FkRXJyb3IsIHNldFVwbG9hZEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2ZpZWxkQ2xhc3NOYW1lKGZpZWxkS2V5LCB2YWx1ZSl9PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAge3JlcXVpcmVkID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXN3aXRjaFwiPlxuICAgICAgICAgIDxzcGFuPnt2YWx1ZSA/ICdFbmFibGVkJyA6ICdEaXNhYmxlZCd9PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgZXZlbnQudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChpc0ltYWdlRmllbGQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAge3JlcXVpcmVkID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fY2FudmFzXCI+XG4gICAgICAgICAgICB7c2hvd1ByZXZpZXcgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3N0YWNrXCI+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdGh1bWJcIiBzcmM9e3ByZXZpZXdVcmx9IGFsdD17bGFiZWx9IC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4ocHJldmlld1VybCwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIOKGl1xuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZShwYXRoLCAnJyl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIOKclVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fZmlsZW5hbWVcIj57Z2V0RmlsZW5hbWUoaW5wdXRWYWx1ZSl9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fZW1wdHlcIj5VcGxvYWQgYW4gaW1hZ2UgdG8gYXR0YWNoIG1lZGlhLjwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2VcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZS1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHVwbG9hZGluZ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt1cGxvYWRpbmcgPyAnVXBsb2FkaW5nLi4uJyA6ICdVcGxvYWQgZnJvbSBjb21wdXRlcid9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b25cIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCB1cGxvYWRpbmd9XG4gICAgICAgICAgICAgICAgb25DbGljaz17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuXG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFVybCA9IGF3YWl0IGNob29zZUFkbWluTGlicmFyeUltYWdlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UocGF0aCwgc2VsZWN0ZWRVcmwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcihlcnJvcj8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGNob29zZSBpbWFnZSBmcm9tIG1lZGlhIGxpYnJhcnkuJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIENob29zZSBmcm9tIG1lZGlhIGxpYnJhcnlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17YXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEZpbGUgPSBldmVudC50YXJnZXQuZmlsZXM/LlswXTtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyh0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmwgPSBhd2FpdCB1cGxvYWRBZG1pbkltYWdlKHNlbGVjdGVkRmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHBhdGgsIHVwbG9hZGVkVXJsKTtcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBsb2FkIGltYWdlLicpO1xuICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dXBsb2FkRXJyb3IgPyA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lcnJvclwiPnt1cGxvYWRFcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtmaWVsZENsYXNzTmFtZShmaWVsZEtleSwgdmFsdWUpfT5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICB7bGFiZWx9XG4gICAgICAgIHtyZXF1aXJlZCA/IDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsX19yZXF1aXJlZFwiPio8L3NwYW4+IDogbnVsbH1cbiAgICAgIDwvbGFiZWw+XG4gICAgICB7aXNQYXRoRmllbGQgPyAoXG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1pbnB1dFwiXG4gICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgID5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGRlc3RpbmF0aW9uPC9vcHRpb24+XG4gICAgICAgICAge2dldFBhdGhPcHRpb25zKGlucHV0VmFsdWUpLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnZhbHVlIHx8ICdlbXB0eSd9IHZhbHVlPXtvcHRpb24udmFsdWV9PlxuICAgICAgICAgICAgICB7b3B0aW9uLmxhYmVsfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgKSA6IE1VTFRJTElORV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGRLZXkpID8gKFxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi10ZXh0YXJlYVwiXG4gICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1pbnB1dFwiXG4gICAgICAgICAgdHlwZT17dHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/ICdudW1iZXInIDogJ3RleHQnfVxuICAgICAgICAgIHZhbHVlPXtpbnB1dFZhbHVlfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBwYXJzZUlucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlLCB2YWx1ZSkpfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gT2JqZWN0RmllbGQoeyBmaWVsZEtleSwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBvbkFkZEl0ZW0sIG9uUmVtb3ZlSXRlbSwgb25Nb3ZlSXRlbSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXModmFsdWUgPz8ge30pLmZpbHRlcigoW25lc3RlZEtleV0pID0+IG5lc3RlZEtleSAhPT0gJ2lkJyAmJiAhaXNIaWRkZW5FZGl0b3JGaWVsZChuZXN0ZWRLZXkpKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGxcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tb2JqZWN0XCI+XG4gICAgICAgIDxoNCBjbGFzc05hbWU9XCJhZG1pbi1vYmplY3RfX3RpdGxlXCI+e3RvTGFiZWwoZmllbGRLZXkpfTwvaDQ+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQtZ3JpZFwiPlxuICAgICAgICAgIHtlbnRyaWVzLm1hcCgoW25lc3RlZEtleSwgbmVzdGVkVmFsdWVdKSA9PiAoXG4gICAgICAgICAgICA8RmllbGRSZW5kZXJlclxuICAgICAgICAgICAgICBrZXk9e2Ake2ZpZWxkS2V5fS0ke25lc3RlZEtleX1gfVxuICAgICAgICAgICAgICBmaWVsZEtleT17bmVzdGVkS2V5fVxuICAgICAgICAgICAgICB2YWx1ZT17bmVzdGVkVmFsdWV9XG4gICAgICAgICAgICAgIHBhdGg9e1suLi5wYXRoLCBuZXN0ZWRLZXldfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgIG9uQWRkSXRlbT17b25BZGRJdGVtfVxuICAgICAgICAgICAgICBvblJlbW92ZUl0ZW09e29uUmVtb3ZlSXRlbX1cbiAgICAgICAgICAgICAgb25Nb3ZlSXRlbT17b25Nb3ZlSXRlbX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQXJyYXlGaWVsZCh7IGZpZWxkS2V5LCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IGxhYmVsID0gdG9MYWJlbChmaWVsZEtleSk7XG4gIGNvbnN0IHNhbXBsZSA9IHZhbHVlWzBdID8/ICcnO1xuICBjb25zdCBbZHJhZ0luZGV4LCBzZXREcmFnSW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtkcmFnT3ZlckluZGV4LCBzZXREcmFnT3ZlckluZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+e2xhYmVsfTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19oZWFkXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fdGl0bGVcIj57bGFiZWx9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2NvdW50XCI+e3ZhbHVlLmxlbmd0aH0gZW50cnl7dmFsdWUubGVuZ3RoID09PSAxID8gJycgOiAnaWVzJ308L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge3ZhbHVlLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICA8ZGV0YWlsc1xuICAgICAgICAgICAga2V5PXtgJHtmaWVsZEtleX0tJHtpbmRleH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcmVwZWF0YWJsZV9faXRlbSR7ZHJhZ092ZXJJbmRleCA9PT0gaW5kZXggPyAnIGFkbWluLXJlcGVhdGFibGVfX2l0ZW0tLWRyYWctb3ZlcicgOiAnJ31gfVxuICAgICAgICAgICAgb3Blbj17aW5kZXggPT09IDB9XG4gICAgICAgICAgICBvbkRyYWdPdmVyPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGRpc2FibGVkIHx8IGRyYWdJbmRleCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGlmIChkcmFnT3ZlckluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Ecm9wPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGRpc2FibGVkIHx8IGRyYWdJbmRleCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IGluZGV4IC0gZHJhZ0luZGV4O1xuICAgICAgICAgICAgICBpZiAob2Zmc2V0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgb25Nb3ZlSXRlbShbLi4ucGF0aCwgZHJhZ0luZGV4XSwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXREcmFnSW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgobnVsbCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25EcmFnTGVhdmU9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGRyYWdPdmVySW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3VtbWFyeSBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeS1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fYnVsbGV0XCI+4pa8PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX25hbWVcIj57Z2V0SXRlbVRpdGxlKGl0ZW0sIGxhYmVsLCBpbmRleCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbShbLi4ucGF0aCwgaW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiRGVsZXRlXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDwn5eRXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGVcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBkcmFnZ2FibGU9eyFkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRHJhZyB0byByZW9yZGVyXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBTdHJpbmcoaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgb25EcmFnRW5kPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldERyYWdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAg4ouu4ouuXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zdW1tYXJ5PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19ib2R5XCI+XG4gICAgICAgICAgICAgIHtpc1BsYWluT2JqZWN0KGl0ZW0pID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQtZ3JpZFwiPlxuICAgICAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKFtuZXN0ZWRLZXldKSA9PiBuZXN0ZWRLZXkgIT09ICdpZCcgJiYgIWlzSGlkZGVuRWRpdG9yRmllbGQobmVzdGVkS2V5KSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoW25lc3RlZEtleSwgbmVzdGVkVmFsdWVdKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPEZpZWxkUmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YCR7ZmllbGRLZXl9LSR7aW5kZXh9LSR7bmVzdGVkS2V5fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEtleT17bmVzdGVkS2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25lc3RlZFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aD17Wy4uLnBhdGgsIGluZGV4LCBuZXN0ZWRLZXldfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25BZGRJdGVtPXtvbkFkZEl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZUl0ZW09e29uUmVtb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW92ZUl0ZW09e29uTW92ZUl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPFByaW1pdGl2ZUZpZWxkXG4gICAgICAgICAgICAgICAgICBmaWVsZEtleT17YCR7ZmllbGRLZXl9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtfVxuICAgICAgICAgICAgICAgICAgcGF0aD17Wy4uLnBhdGgsIGluZGV4XX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICApKX1cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fYWRkXCJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25BZGRJdGVtKHBhdGgsIGdldEVtcHR5SXRlbShzYW1wbGUpKX1cbiAgICAgICAgPlxuICAgICAgICAgICsgQWRkIGFuIGVudHJ5XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEZpZWxkUmVuZGVyZXIocHJvcHMpIHtcbiAgY29uc3QgeyB2YWx1ZSB9ID0gcHJvcHM7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIDxBcnJheUZpZWxkIHsuLi5wcm9wc30gLz47XG4gIH1cblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gPE9iamVjdEZpZWxkIHsuLi5wcm9wc30gLz47XG4gIH1cblxuICByZXR1cm4gPFByaW1pdGl2ZUZpZWxkIHsuLi5wcm9wc30gLz47XG59XG5cbmZ1bmN0aW9uIEZvcm1TZWN0aW9uKHsgZW50cmllcywgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zZWN0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkLWdyaWRcIj5cbiAgICAgICAge2VudHJpZXMubWFwKChbZmllbGRLZXksIHZhbHVlXSkgPT4gKFxuICAgICAgICAgIGlzSGlkZGVuRWRpdG9yRmllbGQoZmllbGRLZXkpID8gbnVsbCA6IChcbiAgICAgICAgICA8RmllbGRSZW5kZXJlclxuICAgICAgICAgICAga2V5PXtmaWVsZEtleX1cbiAgICAgICAgICAgIGZpZWxkS2V5PXtmaWVsZEtleX1cbiAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICAgIHBhdGg9e1tmaWVsZEtleV19XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICBvbkFkZEl0ZW09e29uQWRkSXRlbX1cbiAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgb25Nb3ZlSXRlbT17b25Nb3ZlSXRlbX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIClcbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29udGVudFBhZ2VFZGl0b3IoKSB7XG4gIGNvbnN0IHsgcGFnZU5hbWUgfSA9IHVzZVBhcmFtcygpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3NhdmluZywgc2V0U2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BhZ2VMYWJlbCwgc2V0UGFnZUxhYmVsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2NvbnRlbnQsIHNldENvbnRlbnRdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbb3JpZ2luYWxDb250ZW50LCBzZXRPcmlnaW5hbENvbnRlbnRdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbcHVibGlzaGVkQ29udGVudCwgc2V0UHVibGlzaGVkQ29udGVudF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCdkcmFmdCcpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW21lbnVPcGVuLCBzZXRNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuICBjb25zdCBtZW51UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IGRpc3BsYXllZENvbnRlbnQgPSB1c2VNZW1vKFxuICAgICgpID0+IChhY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnICYmIHB1Ymxpc2hlZENvbnRlbnQgPyBwdWJsaXNoZWRDb250ZW50IDogY29udGVudCksXG4gICAgW2FjdGl2ZVRhYiwgY29udGVudCwgcHVibGlzaGVkQ29udGVudF0sXG4gICk7XG4gIGNvbnN0IGlzUHVibGlzaGVkVmlldyA9IGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkQ29udGVudDtcbiAgY29uc3QgaXNEaXJ0eSA9IHVzZU1lbW8oXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUoY29udGVudCkpICE9PSBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShvcmlnaW5hbENvbnRlbnQpKSxcbiAgICBbY29udGVudCwgb3JpZ2luYWxDb250ZW50XSxcbiAgKTtcbiAgY29uc3QgaGFzRHJhZnRDb250ZW50ID0gdXNlTWVtbygoKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUoY29udGVudCksIFtjb250ZW50XSk7XG4gIGNvbnN0IGhhc1VucHVibGlzaGVkQ2hhbmdlcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUoY29udGVudCkpICE9PSBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShwdWJsaXNoZWRDb250ZW50KSksXG4gICAgW2NvbnRlbnQsIHB1Ymxpc2hlZENvbnRlbnRdLFxuICApO1xuICBjb25zdCBjYW5TYXZlID0gIWlzUHVibGlzaGVkVmlldyAmJiAhc2F2aW5nICYmIGlzRGlydHk7XG4gIGNvbnN0IGNhblB1Ymxpc2ggPSAhaXNQdWJsaXNoZWRWaWV3ICYmICFzYXZpbmcgJiYgKHB1Ymxpc2hlZENvbnRlbnQgPyBoYXNVbnB1Ymxpc2hlZENoYW5nZXMgOiBoYXNEcmFmdENvbnRlbnQpO1xuICBjb25zdCBjYW5EaXNjYXJkID0gIXNhdmluZyAmJiAhaXNQdWJsaXNoZWRWaWV3ICYmIGhhc0RyYWZ0Q29udGVudDtcbiAgY29uc3QgY2FuVW5wdWJsaXNoID0gIXNhdmluZyAmJiBCb29sZWFuKHB1Ymxpc2hlZENvbnRlbnQpO1xuICBjb25zdCBzZWN0aW9ucyA9IHVzZU1lbW8oKCkgPT4gYnVpbGRTZWN0aW9ucyhwYWdlTmFtZSwgZGlzcGxheWVkQ29udGVudCksIFtwYWdlTmFtZSwgZGlzcGxheWVkQ29udGVudF0pO1xuICBjb25zdCBlbnRyeVRpdGxlID0gdXNlTWVtbygoKSA9PiAoXG4gICAgZGlzcGxheWVkQ29udGVudD8uaGVyb1RpdGxlXG4gICAgfHwgZGlzcGxheWVkQ29udGVudD8udGl0bGVcbiAgICB8fCBkaXNwbGF5ZWRDb250ZW50Py5zaXRlTmFtZVxuICAgIHx8IHBhZ2VMYWJlbFxuICApLCBbZGlzcGxheWVkQ29udGVudCwgcGFnZUxhYmVsXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaXNNb3VudGVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWRQYWdlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yKCcnKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0UGFnZSh7IHBhZ2VOYW1lIH0pO1xuXG4gICAgICAgIGlmICghaXNNb3VudGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dERyYWZ0Q29udGVudCA9IGNsb25lVmFsdWUocmVzcG9uc2UuZGF0YS5kcmFmdERhdGEgPz8gcmVzcG9uc2UuZGF0YS5kYXRhID8/IHt9KTtcbiAgICAgICAgc2V0Q29udGVudChuZXh0RHJhZnRDb250ZW50KTtcbiAgICAgICAgc2V0T3JpZ2luYWxDb250ZW50KGNsb25lVmFsdWUobmV4dERyYWZ0Q29udGVudCkpO1xuICAgICAgICBzZXRQdWJsaXNoZWRDb250ZW50KHJlc3BvbnNlLmRhdGEucHVibGlzaGVkRGF0YSA/IGNsb25lVmFsdWUocmVzcG9uc2UuZGF0YS5wdWJsaXNoZWREYXRhKSA6IG51bGwpO1xuICAgICAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgc2V0UGFnZUxhYmVsKHJlc3BvbnNlLmRhdGEubGFiZWwgPz8gdG9MYWJlbChwYWdlTmFtZSkpO1xuICAgICAgfSBjYXRjaCAobG9hZEVycm9yKSB7XG4gICAgICAgIGlmICghaXNNb3VudGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RXJyb3IodG9BZG1pbkVycm9yTWVzc2FnZShsb2FkRXJyb3IsICdGYWlsZWQgdG8gbG9hZCB0aGlzIGNvbnRlbnQgcGFnZS4nKSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoaXNNb3VudGVkKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZFBhZ2UoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc01vdW50ZWQgPSBmYWxzZTtcbiAgICB9O1xuICB9LCBbcGFnZU5hbWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbWVudU9wZW4pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChtZW51UmVmLmN1cnJlbnQgJiYgIW1lbnVSZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgfTtcbiAgfSwgW21lbnVPcGVuXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKHBhdGgsIG5leHRWYWx1ZSkgPT4ge1xuICAgIHNldENvbnRlbnQoKGN1cnJlbnRWYWx1ZSkgPT4gdXBkYXRlQXRQYXRoKGN1cnJlbnRWYWx1ZSwgcGF0aCwgbmV4dFZhbHVlKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkSXRlbSA9IChwYXRoLCBuZXh0SXRlbSkgPT4ge1xuICAgIHNldENvbnRlbnQoKGN1cnJlbnRWYWx1ZSkgPT4gYXBwZW5kQXRQYXRoKGN1cnJlbnRWYWx1ZSwgcGF0aCwgbmV4dEl0ZW0pKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZW1vdmVJdGVtID0gKHBhdGgpID0+IHtcbiAgICBzZXRDb250ZW50KChjdXJyZW50VmFsdWUpID0+IHJlbW92ZUF0UGF0aChjdXJyZW50VmFsdWUsIHBhdGgpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3ZlSXRlbSA9IChwYXRoLCBvZmZzZXQpID0+IHtcbiAgICBzZXRDb250ZW50KChjdXJyZW50VmFsdWUpID0+IG1vdmVBdFBhdGgoY3VycmVudFZhbHVlLCBwYXRoLCBvZmZzZXQpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlID0gYXN5bmMgKGludGVudCA9ICdzYXZlJykgPT4ge1xuICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldFBhZ2Uoe1xuICAgICAgICBwYWdlTmFtZSxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIGRhdGE6IHsgY29udGVudCwgaW50ZW50IH0sXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgbmV4dERyYWZ0Q29udGVudCA9IGNsb25lVmFsdWUocmVzcG9uc2UuZGF0YS5kcmFmdERhdGEgPz8gcmVzcG9uc2UuZGF0YS5kYXRhID8/IHt9KTtcbiAgICAgIHNldENvbnRlbnQobmV4dERyYWZ0Q29udGVudCk7XG4gICAgICBzZXRPcmlnaW5hbENvbnRlbnQoY2xvbmVWYWx1ZShuZXh0RHJhZnRDb250ZW50KSk7XG4gICAgICBzZXRQdWJsaXNoZWRDb250ZW50KHJlc3BvbnNlLmRhdGEucHVibGlzaGVkRGF0YSA/IGNsb25lVmFsdWUocmVzcG9uc2UuZGF0YS5wdWJsaXNoZWREYXRhKSA6IG51bGwpO1xuICAgICAgaWYgKGludGVudCA9PT0gJ3VucHVibGlzaCcpIHtcbiAgICAgICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgICAgfVxuICAgICAgYWRkTm90aWNlKHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuZGF0YS5ub3RpY2U/Lm1lc3NhZ2UgPz8gYCR7cGFnZUxhYmVsfSBzYXZlZC5gLFxuICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChzYXZlRXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0b0FkbWluRXJyb3JNZXNzYWdlKHNhdmVFcnJvciwgJ0ZhaWxlZCB0byBzYXZlIHRoaXMgY29udGVudCBwYWdlLicpO1xuICAgICAgc2V0RXJyb3IobWVzc2FnZSk7XG4gICAgICBhZGROb3RpY2UoeyBtZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTYXZpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVEaXNjYXJkQ2hhbmdlcyA9ICgpID0+IHtcbiAgICBzZXRDb250ZW50KGdldEVtcHR5SXRlbShjb250ZW50KSk7XG4gICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JfX2lubmVyXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1iYWNrXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHdpbmRvdy5oaXN0b3J5LmJhY2soKX0+XG4gICAgICAgICAgICDihpAgQmFja1xuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWV0YVwiPlNpbmdsZSBUeXBlPC9kaXY+XG4gICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi10aXRsZVwiPntlbnRyeVRpdGxlfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXN0YXR1c1wiPntwdWJsaXNoZWRDb250ZW50ID8gJ1B1Ymxpc2hlZCcgOiAnRHJhZnQnfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10YWJzXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YGFkbWluLXRhYiR7YWN0aXZlVGFiID09PSAnZHJhZnQnID8gJyBhZG1pbi10YWItLWFjdGl2ZScgOiAnJ31gfSB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdkcmFmdCcpfT5cbiAgICAgICAgICAgICAgRFJBRlRcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi10YWIke2FjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgPyAnIGFkbWluLXRhYi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBwdWJsaXNoZWRDb250ZW50ICYmIHNldEFjdGl2ZVRhYigncHVibGlzaGVkJyl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFBVQkxJU0hFRFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7ZXJyb3IgPyA8TWVzc2FnZUJveCB2YXJpYW50PVwiZGFuZ2VyXCI+e2Vycm9yfTwvTWVzc2FnZUJveD4gOiBudWxsfVxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1sYXlvdXRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWFpbi1jYXJkXCI+XG4gICAgICAgICAgICAgIHtzZWN0aW9ucy5tYXAoKHNlY3Rpb24sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPEZvcm1TZWN0aW9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2BzZWN0aW9uLSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgIGVudHJpZXM9e3NlY3Rpb24uZW50cmllc31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICBvbkFkZEl0ZW09e2hhbmRsZUFkZEl0ZW19XG4gICAgICAgICAgICAgICAgICBvblJlbW92ZUl0ZW09e2hhbmRsZVJlbW92ZUl0ZW19XG4gICAgICAgICAgICAgICAgICBvbk1vdmVJdGVtPXtoYW5kbGVNb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1B1Ymxpc2hlZFZpZXd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGFzaWRlPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19oZWFkXCI+RW50cnk8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9fYm9keVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNhdmUoJ3B1Ymxpc2gnKX0gZGlzYWJsZWQ9eyFjYW5QdWJsaXNofT5cbiAgICAgICAgICAgICAgICAgICAgICBQdWJsaXNoXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeSBhZG1pbi1zaWRlLWJ1dHRvbi0tbWVudVwiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TWVudU9wZW4oKGN1cnJlbnQpID0+ICFjdXJyZW50KX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIOKAplxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge21lbnVPcGVuID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXttZW51UmVmfSBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNhdmUoJ3VucHVibGlzaCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhblVucHVibGlzaH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvblwiPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBVbnB1Ymxpc2hcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtIGFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEaXNjYXJkQ2hhbmdlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5EaXNjYXJkfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uXCI+w5c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIERpc2NhcmQgY2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNhdmUoJ3NhdmUnKX0gZGlzYWJsZWQ9eyFjYW5TYXZlfT5cbiAgICAgICAgICAgICAgICAgICAge3NhdmluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUnfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2FzaWRlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiwgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgTG9hZGVyLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IE1FRElBX1BJQ0tFUl9FVkVOVCA9ICdhZG1pbmpzLW1lZGlhLXNlbGVjdCc7XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5hZG1pbi1tZWRpYS1wYWdlIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMjhweCA0MHB4IDQ4cHggNDBweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19pbm5lciB7XG4gIG1heC13aWR0aDogMTg2MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3RvcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjhweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDNyZW07XG4gIGxpbmUtaGVpZ2h0OiAzLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbixcbi5hZG1pbi1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnksXG4uYWRtaW4tbWVkaWEtcGFnZV9faWNvbi1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19idXR0b24ge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgcGFkZGluZzogMCAxcmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uLS1wcmltYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIHBhZGRpbmc6IDAgMS4yNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjhweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItbGVmdCxcbi5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLXJpZ2h0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fc3F1YXJlLFxuLmFkbWluLW1lZGlhLXBhZ2VfX2ljb24tYnV0dG9uIHtcbiAgd2lkdGg6IDIuNXJlbTtcbiAgaGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zZWxlY3QsXG4uYWRtaW4tbWVkaWEtcGFnZV9fc2VhcmNoIHtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwIDFyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3NlYXJjaCB7XG4gIG1pbi13aWR0aDogMjgwcHg7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zZWxlY3Qge1xuICBtaW4td2lkdGg6IDI2OHB4O1xuICBhcHBlYXJhbmNlOiBub25lO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fc2VjdGlvbi10aXRsZSB7XG4gIG1hcmdpbjogMCAwIDE4cHg7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2NvdW50IHtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG5cbi5hZG1pbi1tZWRpYS1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maWxsLCBtaW5tYXgoMzIwcHgsIDFmcikpO1xuICBnYXA6IDI0cHg7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZDpob3ZlciB7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgzMywgMzMsIDUyLCAwLjA4KTtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX3ByZXZpZXcge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1pbi1oZWlnaHQ6IDI1NnB4O1xuICBwYWRkaW5nOiAxNnB4O1xuICBiYWNrZ3JvdW5kOlxuICAgIGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2Y2ZjZmOSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZjZmNmY5IDc1JSwgI2Y2ZjZmOSksXG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLCAxMnB4IDEycHg7XG4gIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4O1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fY2hlY2tib3gge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTZweDtcbiAgbGVmdDogMTZweDtcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2MwYzBjZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTIpO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9faW1hZ2Uge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAyMjRweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fYm9keSB7XG4gIHBhZGRpbmc6IDE0cHggMThweCAxNnB4O1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fdGl0bGUtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX190eXBlIHtcbiAgZmxleDogMCAwIGF1dG87XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX21ldGEge1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2JhY2sge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbGF5b3V0IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwgMWZyKSAzNjBweDtcbiAgZ2FwOiAyNHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19wcmV2aWV3LFxuLmFkbWluLW1lZGlhLWRldGFpbF9fY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4wNik7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX3ByZXZpZXcge1xuICBwYWRkaW5nOiAyNHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19jYW52YXMge1xuICBtaW4taGVpZ2h0OiA2MjBweDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOlxuICAgIGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2Y2ZjZmOSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZjZmNmY5IDc1JSwgI2Y2ZjZmOSksXG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLCAxMnB4IDEycHg7XG4gIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19pbWFnZSB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogNTgwcHg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX3NpZGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDE2cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtaGVhZCB7XG4gIHBhZGRpbmc6IDE0cHggMTZweCA4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWJvZHkge1xuICBwYWRkaW5nOiAwIDE2cHggMTZweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fZmllbGQgKyAuYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZCB7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2xhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2lucHV0LFxuLmFkbWluLW1lZGlhLWRldGFpbF9fdGV4dGFyZWEge1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBwYWRkaW5nOiAwLjYyNXJlbSAwLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX3RleHRhcmVhIHtcbiAgbWluLWhlaWdodDogNnJlbTtcbiAgcmVzaXplOiBub25lO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWxpc3Qge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDEycHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXkge1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZSB7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxMDgwcHgpIHtcbiAgLmFkbWluLW1lZGlhLWRldGFpbF9fbGF5b3V0IHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLW1lZGlhLXBhZ2Uge1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0MHB4IDcycHg7XG4gIH1cblxuICAuYWRtaW4tbWVkaWEtcGFnZV9fdG9wLFxuICAuYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgfVxuXG4gIC5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLWxlZnQsXG4gIC5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLXJpZ2h0LFxuICAuYWRtaW4tbWVkaWEtcGFnZV9fYWN0aW9ucyB7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICB9XG5cbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3NlYXJjaCxcbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3NlbGVjdCB7XG4gICAgbWluLXdpZHRoOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5gO1xuXG5mdW5jdGlvbiBidWlsZFBhZ2VQYXRoKHBhdGhuYW1lLCBwYXJhbXMpIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIE9iamVjdC5lbnRyaWVzKHBhcmFtcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICBzZWFyY2hQYXJhbXMuc2V0KGtleSwgU3RyaW5nKHZhbHVlKSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBxdWVyeVN0cmluZyA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxdWVyeVN0cmluZyA/IGA/JHtxdWVyeVN0cmluZ31gIDogJyd9YDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdE1lZGlhKHF1ZXJ5ID0ge30pIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hZG1pbi9hcGkvcGFnZXMvbWVkaWEtbGlicmFyeSR7c2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkgPyBgPyR7c2VhcmNoUGFyYW1zLnRvU3RyaW5nKCl9YCA6ICcnfWAsIHtcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSk7XG4gIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLm1lc3NhZ2UgPz8gJ0ZhaWxlZCB0byBsb2FkIG1lZGlhLicpO1xuICB9XG5cbiAgcmV0dXJuIHBheWxvYWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwbG9hZEFkbWluSW1hZ2UoZmlsZSkge1xuICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL21lZGlhL3VwbG9hZCcsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBmb3JtRGF0YSxcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSk7XG5cbiAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQuZXJyb3IgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuZnVuY3Rpb24gQXNzZXRDYXJkKHsgaXRlbSwgb25PcGVuLCBwaWNrZXJNb2RlIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8YXJ0aWNsZSBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkXCIgb25DbGljaz17KCkgPT4gb25PcGVuKGl0ZW0pfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fcHJldmlld1wiPlxuICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX2ltYWdlXCIgc3JjPXtpdGVtLnRodW1ibmFpbFVybCB8fCBpdGVtLnVybH0gYWx0PXtpdGVtLmFsdGVybmF0aXZlVGV4dCB8fCBpdGVtLm5hbWV9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fYm9keVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX3RpdGxlLXJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fdGl0bGVcIj57aXRlbS5uYW1lfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fdHlwZVwiPntpdGVtLm1pbWUuc3RhcnRzV2l0aCgnaW1hZ2UvJykgPyAnSU1BR0UnIDogaXRlbS5leHQucmVwbGFjZSgnLicsICcnKS50b1VwcGVyQ2FzZSgpfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19tZXRhXCI+XG4gICAgICAgICAge2l0ZW0uZXh0LnJlcGxhY2UoJy4nLCAnJykudG9VcHBlckNhc2UoKX0gLSB7aXRlbS53aWR0aH3Dl3tpdGVtLmhlaWdodH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtwaWNrZXJNb2RlID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fbWV0YVwiIHN0eWxlPXt7IG1hcmdpblRvcDogOCwgY29sb3I6ICcjNDk0NWZmJywgZm9udFdlaWdodDogNzAwIH19PlxuICAgICAgICAgICAgVXNlIHRoaXMgYXNzZXRcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICA8L2FydGljbGU+XG4gICk7XG59XG5cbmZ1bmN0aW9uIERldGFpbFZpZXcoeyBpdGVtLCBvbkJhY2ssIG9uU2VsZWN0LCBwaWNrZXJNb2RlIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2JhY2tcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25CYWNrfT5cbiAgICAgICAg4oaQIEJhY2tcbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3RvcFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMjQgfX0+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190aXRsZVwiIHN0eWxlPXt7IGZvbnRTaXplOiAnMi4yNXJlbScsIGxpbmVIZWlnaHQ6ICcyLjc1cmVtJyB9fT57aXRlbS5uYW1lfTwvaDE+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fYWN0aW9uc1wiPlxuICAgICAgICAgIHtwaWNrZXJNb2RlID8gKFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25TZWxlY3QoaXRlbSl9PlxuICAgICAgICAgICAgICBVc2UgdGhpcyBhc3NldFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4oaXRlbS51cmwsICdfYmxhbmsnLCAnbm9vcGVuZXIsbm9yZWZlcnJlcicpfT5cbiAgICAgICAgICAgIE9wZW4gYXNzZXRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2xheW91dFwiPlxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX3ByZXZpZXdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FudmFzXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9faW1hZ2VcIiBzcmM9e2l0ZW0udXJsfSBhbHQ9e2l0ZW0uYWx0ZXJuYXRpdmVUZXh0IHx8IGl0ZW0ubmFtZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIDxhc2lkZSBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX3NpZGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FyZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtaGVhZFwiPkRldGFpbHM8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2ZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbGFiZWxcIj5GaWxlIG5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2lucHV0XCIgdmFsdWU9e2l0ZW0ubmFtZSB8fCAnJ30gZGlzYWJsZWQgcmVhZE9ubHkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2xhYmVsXCI+QWx0ZXJuYXRpdmUgdGV4dDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9faW5wdXRcIiB2YWx1ZT17aXRlbS5hbHRlcm5hdGl2ZVRleHQgfHwgJyd9IGRpc2FibGVkIHJlYWRPbmx5IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19sYWJlbFwiPkNhcHRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX3RleHRhcmVhXCIgdmFsdWU9e2l0ZW0uY2FwdGlvbiB8fCAnJ30gZGlzYWJsZWQgcmVhZE9ubHkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1oZWFkXCI+TWV0YWRhdGE8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtbGlzdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5EaW1lbnNpb25zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0ud2lkdGh9IMOXIHtpdGVtLmhlaWdodH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPlNpemU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5zaXplTGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5UeXBlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0ubWltZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPlByb3ZpZGVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0ucHJvdmlkZXIgfHwgJ2xvY2FsJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPkZvbGRlcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLmZvbGRlclBhdGggfHwgJy8nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+VXBkYXRlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLnVwZGF0ZWRBdExhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+Q3JlYXRlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLmNyZWF0ZWRBdExhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+RG9jdW1lbnQgSUQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5kb2N1bWVudElkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hc2lkZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNZWRpYUxpYnJhcnkoKSB7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBxdWVyeSA9IHVzZU1lbW8oKCkgPT4gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpLCBbbG9jYXRpb24uc2VhcmNoXSk7XG4gIGNvbnN0IHNlYXJjaCA9IHF1ZXJ5LmdldCgnc2VhcmNoJykgfHwgJyc7XG4gIGNvbnN0IGZpbGVJZCA9IHF1ZXJ5LmdldCgnZmlsZUlkJykgfHwgJyc7XG4gIGNvbnN0IHBpY2tlck1vZGUgPSBxdWVyeS5nZXQoJ3BpY2tlcicpID09PSAnMSc7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtjb3VudCwgc2V0Q291bnRdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtpdGVtLCBzZXRJdGVtXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbdXBsb2FkaW5nLCBzZXRVcGxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGFjdGl2ZSA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yKCcnKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RNZWRpYShmaWxlSWQgPyB7IGZpbGVJZCB9IDogeyBzZWFyY2ggfSk7XG5cbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRJdGVtcyhwYXlsb2FkLml0ZW1zID8/IFtdKTtcbiAgICAgICAgc2V0Q291bnQocGF5bG9hZC5jb3VudCA/PyAwKTtcbiAgICAgICAgc2V0SXRlbShwYXlsb2FkLml0ZW0gPz8gbnVsbCk7XG4gICAgICB9IGNhdGNoIChsb2FkRXJyb3IpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvcihsb2FkRXJyb3IubWVzc2FnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFtmaWxlSWQsIHNlYXJjaF0pO1xuXG4gIGNvbnN0IG9wZW5MaXN0ID0gKG5leHRTZWFyY2ggPSBzZWFyY2gpID0+IHtcbiAgICBuYXZpZ2F0ZShidWlsZFBhZ2VQYXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScsIHtcbiAgICAgIC4uLihuZXh0U2VhcmNoID8geyBzZWFyY2g6IG5leHRTZWFyY2ggfSA6IHt9KSxcbiAgICAgIC4uLihwaWNrZXJNb2RlID8geyBwaWNrZXI6IDEgfSA6IHt9KSxcbiAgICB9KSk7XG4gIH07XG5cbiAgY29uc3Qgc2VsZWN0QXNzZXQgPSAoc2VsZWN0ZWRJdGVtKSA9PiB7XG4gICAgaWYgKCFwaWNrZXJNb2RlKSB7XG4gICAgICBuYXZpZ2F0ZShidWlsZFBhZ2VQYXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScsIHsgZmlsZUlkOiBzZWxlY3RlZEl0ZW0uaWQgfSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cub3BlbmVyKSB7XG4gICAgICB3aW5kb3cub3BlbmVyLnBvc3RNZXNzYWdlKFxuICAgICAgICB7IHR5cGU6IE1FRElBX1BJQ0tFUl9FVkVOVCwgdXJsOiBzZWxlY3RlZEl0ZW0ucmVsYXRpdmVVcmwgfHwgc2VsZWN0ZWRJdGVtLnVybCB8fCAnJyB9LFxuICAgICAgICB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuY2xvc2UoKTtcbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9faW5uZXJcIj5cbiAgICAgICAgICB7ZXJyb3IgPyA8TWVzc2FnZUJveCB2YXJpYW50PVwiZGFuZ2VyXCI+e2Vycm9yfTwvTWVzc2FnZUJveD4gOiBudWxsfVxuXG4gICAgICAgICAge2ZpbGVJZCAmJiBpdGVtID8gKFxuICAgICAgICAgICAgPERldGFpbFZpZXcgaXRlbT17aXRlbX0gb25CYWNrPXsoKSA9PiBvcGVuTGlzdCgpfSBvblNlbGVjdD17c2VsZWN0QXNzZXR9IHBpY2tlck1vZGU9e3BpY2tlck1vZGV9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdG9wXCI+XG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3RpdGxlXCI+e3BpY2tlck1vZGUgPyAnQ2hvb3NlIE1lZGlhJyA6ICdNZWRpYSBMaWJyYXJ5J308L2gxPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3VwbG9hZGluZ31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC50eXBlID0gJ2ZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmFjY2VwdCA9ICdpbWFnZS8qJztcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5tdWx0aXBsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQub25jaGFuZ2UgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oaW5wdXQuZmlsZXMgPz8gW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcignJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHVwbG9hZEFkbWluSW1hZ2UoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZyZXNoZWRQYXlsb2FkID0gYXdhaXQgcmVxdWVzdE1lZGlhKHNlYXJjaCA/IHsgc2VhcmNoIH0gOiB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEl0ZW1zKHJlZnJlc2hlZFBheWxvYWQuaXRlbXMgPz8gW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb3VudChyZWZyZXNoZWRQYXlsb2FkLmNvdW50ID8/IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAodXBsb2FkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IodXBsb2FkRXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJysgQWRkIG5ldyBhc3NldHMnfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhci1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3NlbGVjdFwiIGRlZmF1bHRWYWx1ZT1cInJlY2VudFwiPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmVjZW50XCI+TW9zdCByZWNlbnQgdXBsb2Fkczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvblwiIHR5cGU9XCJidXR0b25cIj5GaWx0ZXJzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fc2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb3Blbkxpc3QoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYXNzZXRzXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19zZWN0aW9uLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgQXNzZXRzIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2NvdW50XCI+KHtjb3VudH0pPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gyPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZ3JpZFwiPlxuICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoKG1lZGlhSXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEFzc2V0Q2FyZFxuICAgICAgICAgICAgICAgICAgICBrZXk9e21lZGlhSXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgaXRlbT17bWVkaWFJdGVtfVxuICAgICAgICAgICAgICAgICAgICBwaWNrZXJNb2RlPXtwaWNrZXJNb2RlfVxuICAgICAgICAgICAgICAgICAgICBvbk9wZW49e3BpY2tlck1vZGUgPyBzZWxlY3RBc3NldCA6IChuZXh0SXRlbSkgPT4gbmF2aWdhdGUoYnVpbGRQYWdlUGF0aCgnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnknLCB7IGZpbGVJZDogbmV4dEl0ZW0uaWQgfSkpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMb2FkZXIsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLWFjY291bnQtcGFnZSB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDQwcHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tYWNjb3VudC1wYWdlX19pbm5lciB7XG4gIG1heC13aWR0aDogNzYwcHg7XG59XG5cbi5hZG1pbi1hY2NvdW50LXBhZ2VfX2V5ZWJyb3cge1xuICBtYXJnaW46IDAgMCA0cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xufVxuXG4uYWRtaW4tYWNjb3VudC1wYWdlX190aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAyLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMi43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFkbWluLWFjY291bnQtcGFnZV9fc3VidGl0bGUge1xuICBtYXJnaW46IDEwcHggMCAyOHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xufVxuXG4uYWRtaW4tYWNjb3VudC1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbiAgcGFkZGluZzogMjRweDtcbn1cblxuLmFkbWluLWFjY291bnQtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uYWRtaW4tYWNjb3VudC1maWVsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogOHB4O1xufVxuXG4uYWRtaW4tYWNjb3VudC1maWVsZC0tZnVsbCB7XG4gIGdyaWQtY29sdW1uOiAxIC8gLTE7XG59XG5cbi5hZG1pbi1hY2NvdW50LWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5hZG1pbi1hY2NvdW50LWlucHV0IHtcbiAgbWluLWhlaWdodDogMi43NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgcGFkZGluZzogMCAwLjg3NXJlbTtcbiAgZm9udC1zaXplOiAwLjkzNzVyZW07XG59XG5cbi5hZG1pbi1hY2NvdW50LWlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLWNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tYWNjb3VudC1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi10b3A6IDI0cHg7XG59XG5cbi5hZG1pbi1hY2NvdW50LWhpbnQge1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1hY2NvdW50LWJ1dHRvbixcbi5hZG1pbi1hY2NvdW50LWJ1dHRvbi0tcHJpbWFyeSxcbi5hZG1pbi1hY2NvdW50LWJ1dHRvbi0tZ2hvc3Qge1xuICBtaW4taGVpZ2h0OiAyLjc1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMC45Mzc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwIDFyZW07XG59XG5cbi5hZG1pbi1hY2NvdW50LWJ1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tYWNjb3VudC1idXR0b24tLXByaW1hcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDk0NWZmO1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cblxuLmFkbWluLWFjY291bnQtYnV0dG9uLS1naG9zdCB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBwYWRkaW5nOiAwO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLWFjY291bnQtcGFnZSB7XG4gICAgcGFkZGluZzogMjBweCAxNnB4IDQ4cHg7XG4gIH1cblxuICAuYWRtaW4tYWNjb3VudC1ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuYDtcblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdEFjY291bnQobWV0aG9kID0gJ0dFVCcsIHBheWxvYWQpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FkbWluL2FwaS9wYWdlcy9hY2NvdW50Jywge1xuICAgIG1ldGhvZCxcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICBoZWFkZXJzOiBwYXlsb2FkID8geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0gOiB1bmRlZmluZWQsXG4gICAgYm9keTogcGF5bG9hZCA/IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpIDogdW5kZWZpbmVkLFxuICB9KTtcblxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBkYXRlIGFjY291bnQuJyk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWNjb3VudFNldHRpbmdzKCkge1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3N1Ym1pdHRpbmcsIHNldFN1Ym1pdHRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2N1cnJlbnRQYXNzd29yZCwgc2V0Q3VycmVudFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW25ld1Bhc3N3b3JkLCBzZXROZXdQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtjb25maXJtUGFzc3dvcmQsIHNldENvbmZpcm1QYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYWN0aXZlID0gdHJ1ZTtcblxuICAgIHJlcXVlc3RBY2NvdW50KClcbiAgICAgIC50aGVuKChwYXlsb2FkKSA9PiB7XG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RW1haWwocGF5bG9hZC5lbWFpbCB8fCAnJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChsb2FkRXJyb3IpID0+IHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvcihsb2FkRXJyb3IubWVzc2FnZSk7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBvblN1Ym1pdCA9IGFzeW5jIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0RXJyb3IoJycpO1xuICAgIHNldFN1Y2Nlc3MoJycpO1xuXG4gICAgaWYgKCFjdXJyZW50UGFzc3dvcmQpIHtcbiAgICAgIHNldEVycm9yKCdDdXJyZW50IHBhc3N3b3JkIGlzIHJlcXVpcmVkLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChuZXdQYXNzd29yZCAmJiBuZXdQYXNzd29yZCAhPT0gY29uZmlybVBhc3N3b3JkKSB7XG4gICAgICBzZXRFcnJvcignTmV3IHBhc3N3b3JkIGNvbmZpcm1hdGlvbiBkb2VzIG5vdCBtYXRjaC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRTdWJtaXR0aW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0QWNjb3VudCgnUE9TVCcsIHtcbiAgICAgICAgZW1haWwsXG4gICAgICAgIGN1cnJlbnRQYXNzd29yZCxcbiAgICAgICAgbmV3UGFzc3dvcmQsXG4gICAgICB9KTtcblxuICAgICAgc2V0U3VjY2VzcyhwYXlsb2FkLm1lc3NhZ2UgfHwgJ0FjY291bnQgdXBkYXRlZC4gU2lnbiBpbiBhZ2Fpbi4nKTtcbiAgICAgIHNldEN1cnJlbnRQYXNzd29yZCgnJyk7XG4gICAgICBzZXROZXdQYXNzd29yZCgnJyk7XG4gICAgICBzZXRDb25maXJtUGFzc3dvcmQoJycpO1xuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJy9hZG1pbi9sb2dvdXQnKTtcbiAgICAgIH0sIDkwMCk7XG4gICAgfSBjYXRjaCAoc3VibWl0RXJyb3IpIHtcbiAgICAgIHNldEVycm9yKHN1Ym1pdEVycm9yLm1lc3NhZ2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGhlaWdodDogJzEwMCUnIH19PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1wYWdlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1wYWdlX19pbm5lclwiPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtcGFnZV9fZXllYnJvd1wiPkFjY291bnQ8L3A+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtcGFnZV9fdGl0bGVcIj5BY2NvdW50IHNldHRpbmdzPC9oMT5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LXBhZ2VfX3N1YnRpdGxlXCI+XG4gICAgICAgICAgICBVcGRhdGUgdGhlIGFkbWluIGVtYWlsIGFkZHJlc3Mgb3IgcGFzc3dvcmQgdXNlZCB0byBzaWduIGluLlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIiBtYj1cImxnXCI+e2Vycm9yfTwvTWVzc2FnZUJveD4gOiBudWxsfVxuICAgICAgICAgIHtzdWNjZXNzID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cInN1Y2Nlc3NcIiBtYj1cImxnXCI+e3N1Y2Nlc3N9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWNhcmRcIiBvblN1Ym1pdD17b25TdWJtaXR9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWdyaWRcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtZmllbGQgYWRtaW4tYWNjb3VudC1maWVsZC0tZnVsbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtbGFiZWxcIj5FbWFpbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldEVtYWlsKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1maWVsZCBhZG1pbi1hY2NvdW50LWZpZWxkLS1mdWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1sYWJlbFwiPkN1cnJlbnQgcGFzc3dvcmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWlucHV0XCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VycmVudFBhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0Q3VycmVudFBhc3N3b3JkKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJjdXJyZW50LXBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1sYWJlbFwiPk5ldyBwYXNzd29yZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdQYXNzd29yZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldE5ld1Bhc3N3b3JkKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJuZXctcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWxhYmVsXCI+Q29uZmlybSBuZXcgcGFzc3dvcmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWlucHV0XCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlybVBhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0Q29uZmlybVBhc3N3b3JkKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJuZXctcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWhpbnRcIj5cbiAgICAgICAgICAgICAgICBTYXZpbmcgYWNjb3VudCBjaGFuZ2VzIHNpZ25zIHRoZSBjdXJyZW50IHNlc3Npb24gb3V0LlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogMTIsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtYnV0dG9uLS1naG9zdFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJy9hZG1pbi9sb2dvdXQnKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBTaWduIG91dFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1idXR0b24tLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e3N1Ym1pdHRpbmd9PlxuICAgICAgICAgICAgICAgICAge3N1Ym1pdHRpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlIGFjY291bnQnfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiwgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBBRE1JTl9SRVNPVVJDRV9ERUZJTklUSU9OUywgYnVpbGRBZG1pblJlc291cmNlSHJlZiB9IGZyb20gJy4uL3Jlc291cmNlLWRlZmluaXRpb25zLmpzJztcblxuY29uc3QgQ09OVEVOVF9QQUdFX09SREVSID0gW1xuICAnc2l0ZS1zZXR0aW5ncycsXG4gICdob21lcGFnZScsXG4gICdhYm91dC1wYWdlJyxcbiAgJ2Jsb2ctcGFnZScsXG4gICdwcmljaW5nLXBhZ2UnLFxuICAnZmFxLXBhZ2UnLFxuICAnbWVldGluZy1yb29tcy1wYWdlJyxcbiAgJ3ZpcnR1YWwtb2ZmaWNlLXBhZ2UnLFxuICAnY29udGFjdC1wYWdlJyxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnLFxuICAndGVybXMtcGFnZScsXG5dO1xuXG5jb25zdCBDT05URU5UX1BBR0VfTEFCRUxTID0ge1xuICAnc2l0ZS1zZXR0aW5ncyc6ICdTaXRlIFNldHRpbmcnLFxuICAnaG9tZXBhZ2UnOiAnSG9tZXBhZ2UnLFxuICAnYWJvdXQtcGFnZSc6ICdBYm91dCBQYWdlJyxcbiAgJ2Jsb2ctcGFnZSc6ICdCbG9nIFBhZ2UnLFxuICAncHJpY2luZy1wYWdlJzogJ1ByaWNpbmcgUGFnZScsXG4gICdmYXEtcGFnZSc6ICdGQVEgUGFnZScsXG4gICdtZWV0aW5nLXJvb21zLXBhZ2UnOiAnTWVldGluZyBSb29tcyBQYWdlJyxcbiAgJ3ZpcnR1YWwtb2ZmaWNlLXBhZ2UnOiAnVmlydHVhbCBPZmZpY2UgUGFnZScsXG4gICdjb250YWN0LXBhZ2UnOiAnQ29udGFjdCBQYWdlJyxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnOiAnUHJpdmFjeSBQb2xpY3kgUGFnZScsXG4gICd0ZXJtcy1wYWdlJzogJ1Rlcm1zIFBhZ2UnLFxufTtcblxuY29uc3QgU0lERUJBUl9XSURUSCA9IDMwNDtcbmNvbnN0IFJBSUxfV0lEVEggPSA0ODtcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLXNpZGViYXItc2hlbGwgfiBbZGF0YS1jc3M9XCJhcHAtY29udGVudFwiXSB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmctbGVmdDogJHtTSURFQkFSX1dJRFRIfXB4O1xuICB0cmFuc2l0aW9uOiBwYWRkaW5nLWxlZnQgMC4ycyBlYXNlO1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbC5hZG1pbi1zaWRlYmFyLXNoZWxsLS1yYWlsLW9ubHkgfiBbZGF0YS1jc3M9XCJhcHAtY29udGVudFwiXSB7XG4gIHBhZGRpbmctbGVmdDogJHtSQUlMX1dJRFRIfXB4O1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDAgYXV0byAwIDA7XG4gIHdpZHRoOiAke1NJREVCQVJfV0lEVEh9cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYWViZjA7XG4gIHotaW5kZXg6IDUwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2U7XG59XG5cbi5hZG1pbi1zaWRlYmFyLXNoZWxsLS1yYWlsLW9ubHkge1xuICB3aWR0aDogJHtSQUlMX1dJRFRIfXB4O1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke1NJREVCQVJfV0lEVEh9cHgpO1xufVxuXG4uYWRtaW4tc2lkZWJhci1yYWlsIHtcbiAgd2lkdGg6IDQ4cHg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYWViZjA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEycHggMDtcbiAgZ2FwOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tc2lkZWJhci1sb2dvIHtcbiAgd2lkdGg6IDI4cHg7XG4gIGhlaWdodDogMjhweDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xufVxuXG4uYWRtaW4tcmFpbC1idXR0b24ge1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2YwZWJmZjtcbiAgY29sb3I6ICM3Yjc5ZmY7XG59XG5cbi5hZG1pbi1yYWlsLWJ1dHRvbiBzdmcge1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiAxNnB4O1xuICBzdHJva2U6IGN1cnJlbnRDb2xvcjtcbiAgZmlsbDogbm9uZTtcbiAgc3Ryb2tlLXdpZHRoOiAxLjg7XG4gIHN0cm9rZS1saW5lY2FwOiByb3VuZDtcbiAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcbn1cblxuLmFkbWluLXJhaWwtc3BhY2VyIHtcbiAgZmxleDogMTtcbn1cblxuLmFkbWluLWF2YXRhciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmFkbWluLWF2YXRhcl9fYnV0dG9uIHtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tYXZhdGFyX19tZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA0MnB4O1xuICBib3R0b206IDA7XG4gIG1pbi13aWR0aDogMTU2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywgMzMsIDUyLCAwLjE2KTtcbiAgcGFkZGluZzogNnB4O1xuICB6LWluZGV4OiA5MDtcbn1cblxuLmFkbWluLWF2YXRhcl9fbWVudSBidXR0b24ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZzogOHB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1hdmF0YXJfX21lbnUgYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLXNpZGViYXItcGFuZWwge1xuICB3aWR0aDogMjU2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi13aWR0aDogMDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmFkbWluLXNpZGViYXItaGVhZGVyIHtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWJmMDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLXNpZGViYXItYm9keSB7XG4gIHBhZGRpbmc6IDE0cHggOHB4IDE4cHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5hZG1pbi1zZWFyY2gge1xuICBwYWRkaW5nOiAwIDhweCAxMnB4O1xufVxuXG4uYWRtaW4tc2VhcmNoIGlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LXNpemU6IDAuNzVyZW07XG59XG5cbi5hZG1pbi1zZWFyY2ggaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1ncm91cCB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5hZG1pbi1ncm91cF9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZzogMCAxMHB4IDhweDtcbn1cblxuLmFkbWluLWdyb3VwX19sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC42ODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG5cbi5hZG1pbi1ncm91cF9fY291bnQge1xuICBtaW4td2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgcGFkZGluZzogMCA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjY4NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tbmF2LWxpbmsge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA3cHggMTBweDtcbiAgbWFyZ2luOiAxcHggMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmFkbWluLW5hdi1saW5rOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQ6ICNmMGViZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tbmF2LWxpbmtfX3RleHQge1xuICBtaW4td2lkdGg6IDA7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjM3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5hZG1pbi1uYXYtbGlua19faWNvbiB7XG4gIHdpZHRoOiAxMnB4O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLXNpZGViYXItc2hlbGwgfiBbZGF0YS1jc3M9XCJhcHAtY29udGVudFwiXSB7XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICB9XG5cbiAgLmFkbWluLXNpZGViYXItc2hlbGwge1xuICAgIGJveC1zaGFkb3c6IDAgMThweCA0OHB4IHJnYmEoMzMsIDMzLCA1MiwgMC4xMik7XG4gIH1cblxuICAuYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7U0lERUJBUl9XSURUSH1weCk7XG4gIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDk2MXB4KSB7XG4gIC5hZG1pbi1zaWRlYmFyLXNoZWxsLFxuICAuYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIGl0ZW1NYXRjaGVzU2VhcmNoKGxhYmVsLCBzZWFyY2gpIHtcbiAgaWYgKCFzZWFyY2gpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBsYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRTaWRlYmFyUmVzb3VyY2VJdGVtcyhzZWN0aW9uLCBwYXRobmFtZSwgc2VhcmNoKSB7XG4gIHJldHVybiBBRE1JTl9SRVNPVVJDRV9ERUZJTklUSU9OU1xuICAgIC5maWx0ZXIoKGRlZmluaXRpb24pID0+IGRlZmluaXRpb24uc2lkZWJhclNlY3Rpb24gPT09IHNlY3Rpb24pXG4gICAgLm1hcCgoZGVmaW5pdGlvbikgPT4ge1xuICAgICAgY29uc3QgcmVzb3VyY2VQYXRoUHJlZml4ID0gYC9hZG1pbi9yZXNvdXJjZXMvJHtkZWZpbml0aW9uLnRhYmxlfWA7XG4gICAgICBjb25zdCBocmVmID0gZGVmaW5pdGlvbi5zaWRlYmFySHJlZiB8fCBidWlsZEFkbWluUmVzb3VyY2VIcmVmKGRlZmluaXRpb24udGFibGUpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRQcmVmaXhlcyA9IFtocmVmLCByZXNvdXJjZVBhdGhQcmVmaXhdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogZGVmaW5pdGlvbi50YWJsZSxcbiAgICAgICAgbGFiZWw6IGRlZmluaXRpb24uc2lkZWJhckxhYmVsIHx8IGRlZmluaXRpb24ubGFiZWwsXG4gICAgICAgIGhyZWYsXG4gICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZFByZWZpeGVzLnNvbWUoKHByZWZpeCkgPT4gcGF0aG5hbWUuc3RhcnRzV2l0aChwcmVmaXgpKSxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChyZXNvdXJjZSkgPT4gaXRlbU1hdGNoZXNTZWFyY2gocmVzb3VyY2UubGFiZWwsIHNlYXJjaCkpO1xufVxuXG5mdW5jdGlvbiBSYWlsSWNvbih7IGNoaWxkcmVuIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L3N2Zz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gSG9tZUljb24oKSB7XG4gIHJldHVybiAoXG4gICAgPFJhaWxJY29uPlxuICAgICAgPHBhdGggZD1cIk00LjUgMTAuNSAxMiA0bDcuNSA2LjVcIiAvPlxuICAgICAgPHBhdGggZD1cIk02LjUgOS41VjE5aDExVjkuNVwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTEwIDE5di01aDR2NVwiIC8+XG4gICAgPC9SYWlsSWNvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gUGVuY2lsSWNvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8UmFpbEljb24+XG4gICAgICA8cGF0aCBkPVwibTMuNSAyMC41IDQuMjUtMSA5Ljc1LTkuNzUtMy4yNS0zLjI1TDQuNSAxNi4yNWwtMSA0LjI1WlwiIC8+XG4gICAgICA8cGF0aCBkPVwibTEzLjUgNi41IDMuMjUgMy4yNVwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTcuNSAxOS41aDEzXCIgLz5cbiAgICA8L1JhaWxJY29uPlxuICApO1xufVxuXG5mdW5jdGlvbiBNZWRpYUljb24oKSB7XG4gIHJldHVybiAoXG4gICAgPFJhaWxJY29uPlxuICAgICAgPHJlY3QgeD1cIjMuNVwiIHk9XCI1LjVcIiB3aWR0aD1cIjE3XCIgaGVpZ2h0PVwiMTNcIiByeD1cIjJcIiAvPlxuICAgICAgPGNpcmNsZSBjeD1cIjguNVwiIGN5PVwiMTBcIiByPVwiMS41XCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJtNS41IDE2IDQtNCAzIDMgMi0yIDQgM1wiIC8+XG4gICAgPC9SYWlsSWNvbj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2lkZWJhcih7IGlzVmlzaWJsZSB9KSB7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBwYWdlcyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUucGFnZXMpO1xuICBjb25zdCBzZXNzaW9uID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5zZXNzaW9uKTtcbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW21lbnVPcGVuLCBzZXRNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGF2YXRhclJlZiA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCBwYWdlSXRlbXMgPSB1c2VNZW1vKFxuICAgICgpID0+IENPTlRFTlRfUEFHRV9PUkRFUlxuICAgICAgLm1hcCgocGFnZU5hbWUpID0+IHBhZ2VzLmZpbmQoKHBhZ2UpID0+IHBhZ2UubmFtZSA9PT0gcGFnZU5hbWUpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLm1hcCgocGFnZSkgPT4gKHtcbiAgICAgICAgaWQ6IHBhZ2UubmFtZSxcbiAgICAgICAgbGFiZWw6IENPTlRFTlRfUEFHRV9MQUJFTFNbcGFnZS5uYW1lXSA/PyBwYWdlLm5hbWUsXG4gICAgICAgIGhyZWY6IGAvYWRtaW4vcGFnZXMvJHtwYWdlLm5hbWV9YCxcbiAgICAgICAgc2VsZWN0ZWQ6IGxvY2F0aW9uLnBhdGhuYW1lLnN0YXJ0c1dpdGgoYC9hZG1pbi9wYWdlcy8ke3BhZ2UubmFtZX1gKSxcbiAgICAgIH0pKVxuICAgICAgLmZpbHRlcigocGFnZSkgPT4gaXRlbU1hdGNoZXNTZWFyY2gocGFnZS5sYWJlbCwgc2VhcmNoKSksXG4gICAgW2xvY2F0aW9uLnBhdGhuYW1lLCBwYWdlcywgc2VhcmNoXSxcbiAgKTtcblxuICBjb25zdCBjb2xsZWN0aW9uSXRlbXMgPSB1c2VNZW1vKFxuICAgICgpID0+IGJ1aWxkU2lkZWJhclJlc291cmNlSXRlbXMoJ2NvbGxlY3Rpb25zJywgbG9jYXRpb24ucGF0aG5hbWUsIHNlYXJjaCksXG4gICAgW2xvY2F0aW9uLnBhdGhuYW1lLCBzZWFyY2hdLFxuICApO1xuXG4gIGNvbnN0IG9wZXJhdGlvbkl0ZW1zID0gdXNlTWVtbyhcbiAgICAoKSA9PiBidWlsZFNpZGViYXJSZXNvdXJjZUl0ZW1zKCdvcmRlcnMnLCBsb2NhdGlvbi5wYXRobmFtZSwgc2VhcmNoKSxcbiAgICBbbG9jYXRpb24ucGF0aG5hbWUsIHNlYXJjaF0sXG4gICk7XG5cbiAgY29uc3QgY3VzdG9tZXJJdGVtcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gYnVpbGRTaWRlYmFyUmVzb3VyY2VJdGVtcygnY3VzdG9tZXJzJywgbG9jYXRpb24ucGF0aG5hbWUsIHNlYXJjaCksXG4gICAgW2xvY2F0aW9uLnBhdGhuYW1lLCBzZWFyY2hdLFxuICApO1xuXG4gIGNvbnN0IGluaXRpYWwgPSAoc2Vzc2lvbj8uZW1haWw/LlswXSA/PyAnQycpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGlzRGFzaGJvYXJkID0gbG9jYXRpb24ucGF0aG5hbWUgPT09ICcvYWRtaW4nIHx8IGxvY2F0aW9uLnBhdGhuYW1lID09PSAnL2FkbWluLyc7XG4gIGNvbnN0IGlzTWVkaWEgPSBsb2NhdGlvbi5wYXRobmFtZS5zdGFydHNXaXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScpO1xuICBjb25zdCBzaG93UGFuZWwgPSAhaXNNZWRpYTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbWVudU9wZW4pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWF2YXRhclJlZi5jdXJyZW50Py5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlT3V0c2lkZUNsaWNrKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlT3V0c2lkZUNsaWNrKTtcbiAgfSwgW21lbnVPcGVuXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWRtaW4tc2lkZWJhci1zaGVsbCR7c2hvd1BhbmVsID8gJycgOiAnIGFkbWluLXNpZGViYXItc2hlbGwtLXJhaWwtb25seSd9JHtpc1Zpc2libGUgPyAnJyA6ICcgYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuJ31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLXJhaWxcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLWxvZ29cIlxuICAgICAgICAgICAgc3JjPVwiL2FkbWluLWFzc2V0cy9jbGllbnQtbWFyay5zdmdcIlxuICAgICAgICAgICAgYWx0PVwiVGhlIExlYWRlbmhhbGwgV29ya3NcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcmFpbC1idXR0b24ke2lzRGFzaGJvYXJkID8gJyBhZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKCcvYWRtaW4nKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8SG9tZUljb24gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yYWlsLWJ1dHRvbiR7IWlzRGFzaGJvYXJkICYmICFpc01lZGlhID8gJyBhZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKCcvYWRtaW4vcGFnZXMvc2l0ZS1zZXR0aW5ncycpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQZW5jaWxJY29uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcmFpbC1idXR0b24ke2lzTWVkaWEgPyAnIGFkbWluLXJhaWwtYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5Jyl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE1lZGlhSWNvbiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmFpbC1zcGFjZXJcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXZhdGFyXCIgcmVmPXthdmF0YXJSZWZ9PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1hdmF0YXJfX2J1dHRvblwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRNZW51T3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aW5pdGlhbH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge21lbnVPcGVuID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWF2YXRhcl9fbWVudVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKCcvYWRtaW4vcGFnZXMvYWNjb3VudCcpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBBY2NvdW50XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbignL2FkbWluL2xvZ291dCcpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBTaWduIG91dFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7c2hvd1BhbmVsID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGViYXItcGFuZWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGViYXItaGVhZGVyXCI+Q29udGVudCBNYW5hZ2VyPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLWJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2VhcmNoXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2goZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fbGFiZWxcIj5Db2xsZWN0aW9uIFR5cGVzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19jb3VudFwiPntjb2xsZWN0aW9uSXRlbXMubGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtjb2xsZWN0aW9uSXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tbmF2LWxpbmske2l0ZW0uc2VsZWN0ZWQgPyAnIGFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCcgOiAnJ31gfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShpdGVtLmhyZWYpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW5hdi1saW5rX190ZXh0XCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fbGFiZWxcIj5DdXN0b21lcnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2NvdW50XCI+e2N1c3RvbWVySXRlbXMubGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtjdXN0b21lckl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLW5hdi1saW5rJHtpdGVtLnNlbGVjdGVkID8gJyBhZG1pbi1uYXYtbGluay0tc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1uYXYtbGlua19fdGV4dFwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2xhYmVsXCI+T3JkZXJzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19jb3VudFwiPntvcGVyYXRpb25JdGVtcy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge29wZXJhdGlvbkl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLW5hdi1saW5rJHtpdGVtLnNlbGVjdGVkID8gJyBhZG1pbi1uYXYtbGluay0tc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1uYXYtbGlua19fdGV4dFwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2xhYmVsXCI+U2luZ2xlIFR5cGVzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19jb3VudFwiPntwYWdlSXRlbXMubGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtwYWdlSXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tbmF2LWxpbmske2l0ZW0uc2VsZWN0ZWQgPyAnIGFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCcgOiAnJ31gfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShpdGVtLmhyZWYpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW5hdi1saW5rX190ZXh0XCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQnV0dG9uLFxuICBGb3JtR3JvdXAsXG4gIEgyLFxuICBJbnB1dCxcbiAgTGFiZWwsXG4gIE1lc3NhZ2VCb3gsXG4gIFRleHQsXG59IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMb2dpbigpIHtcbiAgY29uc3QgcHJvcHMgPSB3aW5kb3cuX19BUFBfU1RBVEVfXyA/PyB7fTtcbiAgY29uc3QgYnJhbmRpbmcgPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLmJyYW5kaW5nKTtcbiAgY29uc3QgbWVzc2FnZSA9IHByb3BzLmVycm9yTWVzc2FnZTtcblxuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIHZhcmlhbnQ9XCJncmV5XCJcbiAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXG4gICAgICBwPVwieGxcIlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgYmFja2dyb3VuZDpcbiAgICAgICAgICAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y0ZWZlOCAwJSwgI2U4ZGNjZiA0NSUsICNkOWM0YWIgMTAwJSknLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8Qm94XG4gICAgICAgIGJnPVwid2hpdGVcIlxuICAgICAgICB3aWR0aD17WycxMDAlJywgJzEwMCUnLCAnOTYwcHgnXX1cbiAgICAgICAgbWluSGVpZ2h0PVwiNTYwcHhcIlxuICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxuICAgICAgICBib3JkZXJSYWRpdXM9XCJ4bFwiXG4gICAgICAgIG92ZXJmbG93PVwiaGlkZGVuXCJcbiAgICAgID5cbiAgICAgICAgPEJveFxuICAgICAgICAgIHdpZHRoPXtbJzAnLCAnMCcsICc0NCUnXX1cbiAgICAgICAgICBkaXNwbGF5PXtbJ25vbmUnLCAnbm9uZScsICdmbGV4J119XG4gICAgICAgICAgZmxleERpcmVjdGlvbj1cImNvbHVtblwiXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCJcbiAgICAgICAgICBwPVwieHhsXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsICMwZjBmMGYgMCUsICMxZjFmMWYgMTAwJSknLFxuICAgICAgICAgICAgY29sb3I6ICcjZjVmMWVhJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPEJveD5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiL2FkbWluLWFzc2V0cy9sb2dvLnN2Z1wiXG4gICAgICAgICAgICAgIGFsdD17YnJhbmRpbmcuY29tcGFueU5hbWV9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiA3MiwgaGVpZ2h0OiA3Miwgb2JqZWN0Rml0OiAnY29udGFpbicsIG1hcmdpbkJvdHRvbTogMjQgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8SDIgY29sb3I9XCJ3aGl0ZVwiIG1hcmdpbkJvdHRvbT1cImxnXCI+Q2xpZW50IENvbnRlbnQgUG9ydGFsPC9IMj5cbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTQwXCI+XG4gICAgICAgICAgICAgIE1hbmFnZSB0aGUgc2FtZSBjbGllbnQtZmFjaW5nIGNvbnRlbnQgc3VyZmFjZSB1c2VkIGJ5IHRoZSBsaXZlIHNpdGUuXG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NTBcIj5UaGUgTGVhZGVuaGFsbCBXb3JrczwvVGV4dD5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPEJveFxuICAgICAgICAgIGFzPVwiZm9ybVwiXG4gICAgICAgICAgYWN0aW9uPXtwcm9wcy5hY3Rpb259XG4gICAgICAgICAgbWV0aG9kPVwiUE9TVFwiXG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgcD1cInh4bFwiXG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxuICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxCb3ggbWI9XCJ4eGxcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiL2FkbWluLWFzc2V0cy9sb2dvLnN2Z1wiXG4gICAgICAgICAgICAgIGFsdD17YnJhbmRpbmcuY29tcGFueU5hbWV9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiA2NCwgaGVpZ2h0OiA2NCwgb2JqZWN0Rml0OiAnY29udGFpbicsIG1hcmdpbkJvdHRvbTogMjAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8SDIgbWFyZ2luPVwiMFwiPlNpZ24gaW48L0gyPlxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIj5DbGllbnQgZWRpdG9yIGFjY2VzcyBmb3IgVGhlIExlYWRlbmhhbGwgV29ya3MuPC9UZXh0PlxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAge21lc3NhZ2UgPyA8TWVzc2FnZUJveCB2YXJpYW50PVwiZGFuZ2VyXCIgbWI9XCJsZ1wiPnttZXNzYWdlfTwvTWVzc2FnZUJveD4gOiBudWxsfVxuXG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5FbWFpbDwvTGFiZWw+XG4gICAgICAgICAgICA8SW5wdXQgbmFtZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCJjbGllbnRAbGVhZGVuaGFsbHdvcmtzLmNvbVwiIC8+XG4gICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgPExhYmVsIHJlcXVpcmVkPlBhc3N3b3JkPC9MYWJlbD5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwiY3VycmVudC1wYXNzd29yZFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgICAgPEJveCBtdD1cInhsXCI+XG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgc2l6ZT1cImxnXCI+TG9nIGluPC9CdXR0b24+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUb3BCYXIoKSB7XG4gIHJldHVybiBudWxsO1xufVxuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0Rhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGFzaGJvYXJkID0gRGFzaGJvYXJkXG5pbXBvcnQgQ29sbGVjdGlvbk1hbmFnZXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbk1hbmFnZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbGxlY3Rpb25NYW5hZ2VyID0gQ29sbGVjdGlvbk1hbmFnZXJcbmltcG9ydCBDb250ZW50UGFnZUVkaXRvciBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Db250ZW50UGFnZUVkaXRvcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29udGVudFBhZ2VFZGl0b3IgPSBDb250ZW50UGFnZUVkaXRvclxuaW1wb3J0IE1lZGlhTGlicmFyeSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9NZWRpYUxpYnJhcnknXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLk1lZGlhTGlicmFyeSA9IE1lZGlhTGlicmFyeVxuaW1wb3J0IEFjY291bnRTZXR0aW5ncyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9BY2NvdW50U2V0dGluZ3MnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkFjY291bnRTZXR0aW5ncyA9IEFjY291bnRTZXR0aW5nc1xuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvU2lkZWJhcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuU2lkZWJhciA9IFNpZGViYXJcbmltcG9ydCBMb2dpbiBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Mb2dpbidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTG9naW4gPSBMb2dpblxuaW1wb3J0IFRvcEJhciBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Ub3BCYXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlRvcEJhciA9IFRvcEJhciJdLCJuYW1lcyI6WyJBRE1JTl9SRVNPVVJDRV9ERUZJTklUSU9OUyIsInRhYmxlIiwibGFiZWwiLCJzaWRlYmFyTGFiZWwiLCJuYXZpZ2F0aW9uIiwic2lkZWJhclNlY3Rpb24iLCJzaWRlYmFySHJlZiIsImhpZGRlbkNvbHVtbnMiLCJsaXN0UHJvcGVydGllcyIsImZpbHRlclByb3BlcnRpZXMiLCJyZWFkT25seSIsImJ1aWxkQWRtaW5SZXNvdXJjZUhyZWYiLCJyZXNvdXJjZUlkIiwiUFJJTUFSWV9QQUdFUyIsImhyZWYiLCJDT0xMRUNUSU9OUyIsIkNVU1RPTUVSX1FVSUNLX09SREVSIiwiT1JERVJfUVVJQ0tfT1JERVIiLCJDVVNUT01FUlMiLCJtYXAiLCJmaW5kIiwiZGVmaW5pdGlvbiIsImZpbHRlciIsIkJvb2xlYW4iLCJPUkRFUlMiLCJTVFlMRVMiLCJhcGkiLCJBcGlDbGllbnQiLCJmb3JtYXRTdWJtaXNzaW9uRGF0ZSIsInZhbHVlIiwiZGF0ZSIsIkRhdGUiLCJOdW1iZXIiLCJpc05hTiIsImdldFRpbWUiLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJkYXRlU3R5bGUiLCJ0aW1lU3R5bGUiLCJmb3JtYXQiLCJ0cmltTWVzc2FnZSIsIm1lc3NhZ2UiLCJub3JtYWxpemVkIiwiU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsInNsaWNlIiwidHJpbUVuZCIsImNvZXJjZUpzb24iLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJmZXRjaEFkbWluSnNvbiIsInVybCIsIm9wdGlvbnMiLCJyZXNwb25zZSIsImZldGNoIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwidGV4dCIsInBheWxvYWQiLCJvayIsImVycm9yIiwic3RhdHVzIiwiRXJyb3IiLCJub3JtYWxpemVBZG1pblN1Ym1pc3Npb25QYXlsb2FkIiwiQXJyYXkiLCJpc0FycmF5IiwiZGF0YSIsIm5vcm1hbGl6ZVN1Ym1pc3Npb25SZWNvcmQiLCJyZWNvcmQiLCJwYXJhbXMiLCJpZCIsIm5hbWUiLCJlbWFpbCIsInBob25lIiwic291cmNlUGFnZSIsInNvdXJjZV9wYWdlIiwiY3JlYXRlZEF0IiwiY3JlYXRlZF9hdCIsIm5vcm1hbGl6ZVJlc291cmNlU3VibWlzc2lvblBheWxvYWQiLCJyZWNvcmRzIiwic3VibWlzc2lvbiIsImlzRmluaXRlIiwibm9ybWFsaXplUmVzb3VyY2VSZWNvcmRQYXlsb2FkIiwiZ2V0UmVjZW50U3VibWlzc2lvbnMiLCJwcm9wcyIsInJlY2VudFN1Ym1pc3Npb25zIiwicmVjZW50TWVzc2FnZXMiLCJyZXNvbHZlU3VibWlzc2lvblBheWxvYWQiLCJzb3VyY2UiLCJib2R5IiwicmVzdWx0IiwiaXRlbXMiLCJub3JtYWxpemVEYXNoYm9hcmRSZXNwb25zZSIsImZldGNoRGFzaGJvYXJkTWVzc2FnZXMiLCJmZXRjaEFkbWluTWVzc2FnZXMiLCJsaW1pdCIsInNhZmVMaW1pdCIsIm5vcm1hbGl6ZUN1c3RvbVJlc3BvbnNlIiwiY3VzdG9tUGF5bG9hZCIsImN1c3RvbVN1Ym1pc3Npb25zIiwiY29uc29sZSIsIndhcm4iLCJyZXNvdXJjZVBheWxvYWQiLCJkZWxldGVBZG1pblN1Ym1pc3Npb24iLCJwYXJzZWRJZCIsIm1ldGhvZCIsIkFjY2VwdCIsImJhc2VFcnJvciIsIm5vdGljZSIsInR5cGUiLCJmZXRjaEFkbWluU3VibWlzc2lvbkJ5SWQiLCJjdXN0b21TdWJtaXNzaW9uIiwiU2hvcnRjdXRMaXN0IiwidGl0bGUiLCJuYXZpZ2F0ZSIsIm1ldGEiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpdGVtIiwia2V5Iiwib25DbGljayIsIk1lc3NhZ2VzQ2FyZCIsInN1Ym1pc3Npb25zIiwic2VsZWN0ZWRTdWJtaXNzaW9uIiwib25PcGVuIiwib25EZWxldGUiLCJkZWxldGluZ0lkIiwib3BlcmF0aW9uRXJyb3IiLCJkaXNhYmxlZCIsIkRhc2hib2FyZCIsInVzZU5hdmlnYXRlIiwiZGFzaGJvYXJkU3VibWlzc2lvbnMiLCJzZXREYXNoYm9hcmRTdWJtaXNzaW9ucyIsInVzZVN0YXRlIiwic2V0U2VsZWN0ZWRTdWJtaXNzaW9uIiwic2V0RGVsZXRpbmdJZCIsInNldE9wZXJhdGlvbkVycm9yIiwidXNlRWZmZWN0IiwiaW5pdGlhbFN1Ym1pc3Npb25zIiwiaXNBY3RpdmUiLCJsb2FkRGFzaGJvYXJkRGF0YSIsImFzc2lnblN1Ym1pc3Npb25zIiwibmV4dFN1Ym1pc3Npb25zIiwiZGFzaGJvYXJkUmVzcG9uc2UiLCJnZXREYXNoYm9hcmQiLCJmYWxsYmFja1N1Ym1pc3Npb25zIiwiZGFzaGJvYXJkT25seVBheWxvYWQiLCJkYXNoYm9hcmRPbmx5U3VibWlzc2lvbnMiLCJmYWxsYmFja1BheWxvYWQiLCJmYWxsYmFja0Vycm9yIiwiaGFuZGxlT3BlblN1Ym1pc3Npb24iLCJmcmVzaFN1Ym1pc3Npb24iLCJoYW5kbGVEZWxldGVTdWJtaXNzaW9uIiwidGFyZ2V0SWQiLCJwcmV2aW91cyIsIkZyYWdtZW50IiwiTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4iLCJJTUFHRV9GSUVMRF9QQVRURVJOIiwiQk9PTEVBTl9GSUVMRF9QQVRURVJOIiwiRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOIiwidG9MYWJlbCIsInJlcGxhY2UiLCJ2IiwidG9VcHBlckNhc2UiLCJjbG9uZVZhbHVlIiwic3RyaW5naWZ5IiwiZ2V0RW1wdHlJdGVtIiwic2FtcGxlIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJrZXlzIiwiaW5jbHVkZXMiLCJ0b0NvbXBhcmFibGVWYWx1ZSIsInNvcnQiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImhhc01lYW5pbmdmdWxWYWx1ZSIsInNvbWUiLCJlbnRyaWVzIiwibmVzdGVkVmFsdWUiLCJidWlsZEFkbWluUGF0aCIsInBhdGhuYW1lIiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiZm9yRWFjaCIsInVuZGVmaW5lZCIsInNldCIsInF1ZXJ5U3RyaW5nIiwidG9TdHJpbmciLCJwYXJzZURpc3BsYXllZEZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJwYXJzZUlucHV0VmFsdWUiLCJuZXh0UmF3VmFsdWUiLCJjdXJyZW50VmFsdWUiLCJwYXJzZWQiLCJnZXRSZXBlYXRhYmxlSXRlbVZhbHVlIiwiZ2V0TWVkaWFEaXNwbGF5TmFtZSIsImZhbGxiYWNrIiwicmF3IiwicGFydHMiLCJ3aXRoUmVwZWF0YWJsZUl0ZW1WYWx1ZSIsIm5leHRWYWx1ZSIsInJlc29sdmVNZWRpYVByZXZpZXdVcmwiLCJ0ZXN0Iiwic3RhcnRzV2l0aCIsInVwZGF0ZUF0UGF0aCIsInBhdGgiLCJzZWdtZW50IiwicmVzdCIsImNsb25lIiwicmVtb3ZlQXRQYXRoIiwiXyIsImluZGV4IiwiYXBwZW5kQXRQYXRoIiwibmV4dEl0ZW0iLCJtb3ZlQXRQYXRoIiwib2Zmc2V0IiwibmV4dEluZGV4IiwibW92ZWQiLCJzcGxpY2UiLCJnZXREaXNwbGF5VGl0bGUiLCJ0aXRsZUZpZWxkIiwiZm9ybWF0TW9uZXlWYWx1ZSIsImN1cnJlbmN5IiwiYW1vdW50Iiwic2FmZUN1cnJlbmN5IiwiTnVtYmVyRm9ybWF0Iiwic3R5bGUiLCJ0b0ZpeGVkIiwiZm9ybWF0UHJvZmlsZURpc3BsYXlWYWx1ZSIsInJhd1ZhbHVlIiwibm9ybWFsaXplZFZhbHVlIiwibW9uZXlGaWVsZHMiLCJsZXR0ZXIiLCJpc0Jsb2dEaXNhYmxlZEZpZWxkIiwiaXNGYXFEaXNhYmxlZEZpZWxkIiwiaXNNZWV0aW5nUm9vbURpc2FibGVkRmllbGQiLCJpc1Zpc2liaWxpdHlUb2dnbGVGaWVsZCIsImdldEZpZWxkRGlzcGxheUxhYmVsIiwicmVxdWVzdFBhZ2UiLCJwYWdlTmFtZSIsInF1ZXJ5IiwidHJpbW1lZFRleHQiLCJ0b0xvd2VyQ2FzZSIsImlzSHRtbCIsInJlZGlyZWN0ZWRUb0xvZ2luIiwicmVkaXJlY3RlZCIsImlzQXV0aEVycm9yIiwidXBsb2FkQWRtaW5JbWFnZSIsImZpbGUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwianNvbiIsImNhdGNoIiwidXBsb2FkZWRVcmwiLCJyZWxhdGl2ZVVybCIsIk1FRElBX1BJQ0tFUl9FVkVOVCIsImNob29zZUFkbWluTGlicmFyeUltYWdlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3aW5kb3ciLCJwaWNrZXJXaW5kb3ciLCJvcGVuIiwiZmluaXNoZWQiLCJjbGVhbnVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1lc3NhZ2UiLCJjbGVhckludGVydmFsIiwiY2xvc2VXYXRjaGVyIiwiZXZlbnQiLCJvcmlnaW4iLCJsb2NhdGlvbiIsInNldEludGVydmFsIiwiY2xvc2VkIiwiYWRkRXZlbnRMaXN0ZW5lciIsIk1lZGlhRmllbGQiLCJvbkNoYW5nZSIsInVybHMiLCJmaWxlSW5wdXRSZWYiLCJ1c2VSZWYiLCJ1cGxvYWRpbmciLCJzZXRVcGxvYWRpbmciLCJ1cGxvYWRFcnJvciIsInNldFVwbG9hZEVycm9yIiwic3JjIiwiYWx0IiwiY3VycmVudCIsImNsaWNrIiwic2VsZWN0ZWRVcmwiLCJyZWYiLCJhY2NlcHQiLCJtdWx0aXBsZSIsImRpc3BsYXkiLCJmaWxlcyIsImZyb20iLCJ0YXJnZXQiLCJ1cGxvYWRlZFVybHMiLCJwdXNoIiwiUHJpbWl0aXZlRmllbGQiLCJzZWxlY3RPcHRpb25zIiwic2VsZWN0RmllbGRzIiwiaW5wdXRUeXBlIiwiaW5wdXRUeXBlcyIsImlzRGlzYWJsZWRGaWVsZCIsImNoZWNrZWQiLCJvcHRpb24iLCJQcm9maWxlSW5mb0NhcmQiLCJpbmZvQ2FyZEZpZWxkcyIsImluZm9DYXJkQmxvY2tGaWVsZHMiLCJvcHRpb25hbEluZm9DYXJkRmllbGRzIiwiU2V0Iiwib3B0aW9uYWxJbmZvQ2FyZEJsb2NrRmllbGRzIiwiaW5mb0NhcmRUaXRsZUZpZWxkIiwicmF3VGl0bGUiLCJjYXJkVGl0bGUiLCJjYXJkTWV0YUxhYmVsIiwibWV0YUxhYmVsIiwiY2FyZEV5ZWJyb3ciLCJlbmRzV2l0aCIsInRpdGxlVG9rZW5zIiwidG9rZW4iLCJhdmF0YXJMYWJlbCIsImpvaW4iLCJtYW51YWxUYWciLCJpc1Byb2ZpbGVTdW1tYXJ5TGF5b3V0Iiwic3VtbWFyeUZpZWxkcyIsImRpc3BsYXlWYWx1ZSIsInZhbHVlQ2xhc3NOYW1lcyIsImhhcyIsInJvd3MiLCJNYXRoIiwibWF4IiwibWluIiwiTWVzc2FnZVJlcGx5UGFuZWwiLCJyZXBsaWVzIiwicmVwbHlEcmFmdCIsIm9uUmVwbHlDaGFuZ2UiLCJvblNlbmRSZXBseSIsInNlbmRpbmdSZXBseSIsInJlcGx5IiwiYWRtaW5FbWFpbCIsInN1YmplY3QiLCJBcnJheUZpZWxkIiwib25BZGRJdGVtIiwib25SZW1vdmVJdGVtIiwib25Nb3ZlSXRlbSIsImlzSW1hZ2VBcnJheSIsImRyYWdJbmRleCIsInNldERyYWdJbmRleCIsImRyYWdPdmVySW5kZXgiLCJzZXREcmFnT3ZlckluZGV4IiwidXBsb2FkaW5nSW5kZXgiLCJzZXRVcGxvYWRpbmdJbmRleCIsImZpbGVJbnB1dFJlZnMiLCJvbkRyYWdPdmVyIiwicHJldmVudERlZmF1bHQiLCJvbkRyb3AiLCJvbkRyYWdMZWF2ZSIsInN0b3BQcm9wYWdhdGlvbiIsImRyYWdnYWJsZSIsIm9uRHJhZ1N0YXJ0IiwiZGF0YVRyYW5zZmVyIiwiZWZmZWN0QWxsb3dlZCIsInNldERhdGEiLCJvbkRyYWdFbmQiLCJtYXJnaW5Ub3AiLCJlbGVtZW50IiwicGFkZGluZyIsIkZpZWxkUmVuZGVyZXIiLCJyZW5kZXJMaXN0Q2VsbCIsIkxpc3RWaWV3IiwiY29udHJvbHMiLCJzZWFyY2giLCJsb2FkaW5nIiwib25TZWFyY2giLCJvbk9wZW5SZWNvcmQiLCJvbkNyZWF0ZSIsIm9uU2V0U29ydCIsIm9uU2V0RmlsdGVyIiwib25SZXNldEZpbHRlcnMiLCJvblRvZ2dsZURpc3BsYXllZEZpZWxkIiwib25SZXNldERpc3BsYXllZEZpZWxkcyIsIm9uRHVwbGljYXRlUmVjb3JkIiwib25EZWxldGVSZWNvcmQiLCJzaG93U2VhcmNoIiwic2V0U2hvd1NlYXJjaCIsImZpbHRlcnNPcGVuIiwic2V0RmlsdGVyc09wZW4iLCJzaG93RGlzcGxheWVkIiwic2V0U2hvd0Rpc3BsYXllZCIsInNlYXJjaFZhbHVlIiwic2V0U2VhcmNoVmFsdWUiLCJvcGVuTWVudUlkIiwic2V0T3Blbk1lbnVJZCIsIm1lbnVSZWYiLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImhhbmRsZVBvaW50ZXJEb3duIiwiY29udGFpbnMiLCJkb2N1bWVudCIsImRpc3BsYXllZENvbHVtbnMiLCJ1c2VNZW1vIiwiYXZhaWxhYmxlRmllbGRzIiwiZGlzcGxheWVkRmllbGRzIiwic2hvd0NyZWF0ZSIsImFsbG93Q3JlYXRlIiwiaGFzRmlsdGVycyIsImZpbHRlcnMiLCJhbGxvd0R1cGxpY2F0ZSIsImFsbG93RGVsZXRlIiwicGxhY2Vob2xkZXIiLCJhdXRvRm9jdXMiLCJsZWZ0IiwicmlnaHQiLCJhY3RpdmVGaWx0ZXJzIiwiY29sdW1uIiwic29ydEJ5Iiwic29ydE9yZGVyIiwiZG9jdW1lbnRJZCIsImNvbHVtbnMiLCJFZGl0VmlldyIsInB1Ymxpc2hlZFJlY29yZCIsImFjdGl2ZVRhYiIsIm9uU3dpdGNoVGFiIiwic2F2aW5nIiwib25CYWNrIiwib25TYXZlIiwib25QdWJsaXNoIiwib25EaXNjYXJkQ2hhbmdlcyIsIm9uVW5wdWJsaXNoIiwiY2FuU2F2ZSIsImNhblB1Ymxpc2giLCJjYW5EaXNjYXJkIiwiY2FuVW5wdWJsaXNoIiwiaXNDcmVhdGVNb2RlIiwiZGlzcGxheWVkUmVjb3JkIiwiaXNQdWJsaXNoZWRWaWV3IiwiaXNNYW51YWxFbnRyeSIsImVudHJ5U291cmNlIiwic3VwcG9ydHNFZGl0aW5nIiwic2hvd1ZlcnNpb25UYWJzIiwiYWxsb3dQdWJsaXNoIiwiYWxsb3dTYXZlIiwiZWRpdGFibGVGaWVsZHMiLCJjcmVhdGVGaWVsZHMiLCJtYW51YWxFZGl0YWJsZUZpZWxkcyIsImhpZGRlbkNhcmRGaWVsZHMiLCJzaG93U3RhbmRhbG9uZUhlYWRlciIsImFjdGl2ZUxheW91dCIsImNyZWF0ZUxheW91dCIsImVkaXRMYXlvdXQiLCJtYW51YWxFZGl0TGF5b3V0IiwibWVudU9wZW4iLCJzZXRNZW51T3BlbiIsIk1lc3NhZ2VCb3giLCJ2YXJpYW50Iiwicm93IiwidmlzaWJsZUZpZWxkcyIsImZpZWxkRGlzYWJsZWQiLCJDb2xsZWN0aW9uTWFuYWdlciIsInVzZVBhcmFtcyIsInVzZUxvY2F0aW9uIiwiYWRkTm90aWNlIiwidXNlTm90aWNlIiwic2V0TG9hZGluZyIsImxpc3RMb2FkaW5nIiwic2V0TGlzdExvYWRpbmciLCJzZXRTYXZpbmciLCJzZXREZWZpbml0aW9uIiwic2V0UmVjb3JkcyIsInNldENvbnRyb2xzIiwic2V0UmVjb3JkIiwib3JpZ2luYWxSZWNvcmQiLCJzZXRPcmlnaW5hbFJlY29yZCIsInNldFB1Ymxpc2hlZFJlY29yZCIsInNldEFjdGl2ZVRhYiIsInNldEVycm9yIiwic2V0UmVwbHlEcmFmdCIsInNldFNlbmRpbmdSZXBseSIsInJlY29yZElkIiwiZ2V0IiwiaXNOZXciLCJjYXRlZ29yeSIsInBsYW5UeXBlIiwiZmVhdHVyZWQiLCJpc0ZlYXR1cmVkIiwiaXNQb3B1bGFyIiwiaXNNYW51YWxFZGl0YWJsZVJlY29yZCIsImNhbkVkaXRDdXJyZW50UmVjb3JkIiwibW9kZSIsImlzRGlydHkiLCJoYXNEcmFmdENvbnRlbnQiLCJoYXNVbnB1Ymxpc2hlZENoYW5nZXMiLCJhY3RpdmUiLCJsb2FkIiwic2hvdWxkQmxvY2siLCJuZXciLCJuZXh0RHJhZnRSZWNvcmQiLCJkcmFmdFJlY29yZCIsImxvYWRFcnJvciIsInVwZGF0ZUxpc3RRdWVyeSIsInBhdGNoIiwibmV4dFBhcmFtcyIsImhhbmRsZUNoYW5nZSIsImhhbmRsZUFkZEl0ZW0iLCJoYW5kbGVSZW1vdmVJdGVtIiwiaGFuZGxlTW92ZUl0ZW0iLCJoYW5kbGVTYXZlSW50ZW50IiwiaW50ZW50IiwiZGVsZXRlZCIsInJlcXVlc3RFcnJvciIsImhhbmRsZURpc2NhcmRDaGFuZ2VzIiwiaGFuZGxlQ3JlYXRlIiwiaGFuZGxlTGlzdEFjdGlvbiIsInRhcmdldFJlY29yZElkIiwiaGFuZGxlUmVwbHlDaGFuZ2UiLCJoYW5kbGVTZW5kUmVwbHkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJoZWlnaHQiLCJMb2FkZXIiLCJsaXN0Q29sdW1ucyIsIm5leHRTZWFyY2giLCJuZXh0UmVjb3JkSWQiLCJuZXh0T3JkZXIiLCJuZXh0RmllbGRzIiwiUEFUSF9GSUVMRF9QQVRURVJOIiwiUkVRVUlSRURfRklFTERfUEFUVEVSTiIsIlJPVVRFX09QVElPTlMiLCJQQUdFX0xBWU9VVFMiLCJmaWVsZHMiLCJob21lcGFnZSIsImdldEZpZWxkTGFiZWwiLCJmaWVsZEtleSIsImdldFBhdGhPcHRpb25zIiwidW5zaGlmdCIsImlzUGxhaW5PYmplY3QiLCJnZXRGaWxlbmFtZSIsIlVSTCIsImZpbGVuYW1lIiwicG9wIiwidHJpbW1lZCIsInRvQWRtaW5FcnJvck1lc3NhZ2UiLCJyZXNwb25zZURhdGEiLCJpc1JlcXVpcmVkRmllbGQiLCJmaWVsZENsYXNzTmFtZSIsImlzSGlkZGVuRWRpdG9yRmllbGQiLCJnZXRJdGVtVGl0bGUiLCJmYWxsYmFja0xhYmVsIiwicHJlZmVycmVkIiwicXVlc3Rpb24iLCJmZWF0dXJlIiwiYnVpbGRTZWN0aW9ucyIsImNvbnRlbnQiLCJsYXlvdXQiLCJ1c2VkIiwic2VjdGlvbnMiLCJzZWN0aW9uIiwic2VjdGlvbkVudHJpZXMiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJhZGQiLCJleHRyYUVudHJpZXMiLCJpbnB1dFZhbHVlIiwicmVxdWlyZWQiLCJpc0ltYWdlRmllbGQiLCJpc1BhdGhGaWVsZCIsInByZXZpZXdVcmwiLCJzaG93UHJldmlldyIsInNlbGVjdGVkRmlsZSIsIk9iamVjdEZpZWxkIiwibmVzdGVkS2V5IiwiRm9ybVNlY3Rpb24iLCJDb250ZW50UGFnZUVkaXRvciIsInBhZ2VMYWJlbCIsInNldFBhZ2VMYWJlbCIsInNldENvbnRlbnQiLCJvcmlnaW5hbENvbnRlbnQiLCJzZXRPcmlnaW5hbENvbnRlbnQiLCJwdWJsaXNoZWRDb250ZW50Iiwic2V0UHVibGlzaGVkQ29udGVudCIsImRpc3BsYXllZENvbnRlbnQiLCJlbnRyeVRpdGxlIiwiaGVyb1RpdGxlIiwic2l0ZU5hbWUiLCJpc01vdW50ZWQiLCJsb2FkUGFnZSIsImdldFBhZ2UiLCJuZXh0RHJhZnRDb250ZW50IiwiZHJhZnREYXRhIiwicHVibGlzaGVkRGF0YSIsImhhbmRsZVNhdmUiLCJzYXZlRXJyb3IiLCJoaXN0b3J5IiwiYmFjayIsImJ1aWxkUGFnZVBhdGgiLCJyZXF1ZXN0TWVkaWEiLCJBc3NldENhcmQiLCJwaWNrZXJNb2RlIiwidGh1bWJuYWlsVXJsIiwiYWx0ZXJuYXRpdmVUZXh0IiwibWltZSIsImV4dCIsIndpZHRoIiwiY29sb3IiLCJmb250V2VpZ2h0IiwiRGV0YWlsVmlldyIsIm9uU2VsZWN0IiwibWFyZ2luQm90dG9tIiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwiY2FwdGlvbiIsInNpemVMYWJlbCIsInByb3ZpZGVyIiwiZm9sZGVyUGF0aCIsInVwZGF0ZWRBdExhYmVsIiwiY3JlYXRlZEF0TGFiZWwiLCJNZWRpYUxpYnJhcnkiLCJmaWxlSWQiLCJzZXRJdGVtcyIsImNvdW50Iiwic2V0Q291bnQiLCJzZXRJdGVtIiwib3Blbkxpc3QiLCJwaWNrZXIiLCJzZWxlY3RBc3NldCIsInNlbGVjdGVkSXRlbSIsIm9wZW5lciIsInBvc3RNZXNzYWdlIiwiY2xvc2UiLCJpbnB1dCIsIm9uY2hhbmdlIiwicmVmcmVzaGVkUGF5bG9hZCIsImRlZmF1bHRWYWx1ZSIsIm1lZGlhSXRlbSIsInJlcXVlc3RBY2NvdW50IiwiQWNjb3VudFNldHRpbmdzIiwic3VibWl0dGluZyIsInNldFN1Ym1pdHRpbmciLCJzdWNjZXNzIiwic2V0U3VjY2VzcyIsInNldEVtYWlsIiwiY3VycmVudFBhc3N3b3JkIiwic2V0Q3VycmVudFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJzZXROZXdQYXNzd29yZCIsImNvbmZpcm1QYXNzd29yZCIsInNldENvbmZpcm1QYXNzd29yZCIsInRoZW4iLCJmaW5hbGx5Iiwib25TdWJtaXQiLCJhc3NpZ24iLCJzdWJtaXRFcnJvciIsIm1iIiwiYXV0b0NvbXBsZXRlIiwiZ2FwIiwiQ09OVEVOVF9QQUdFX09SREVSIiwiQ09OVEVOVF9QQUdFX0xBQkVMUyIsIlNJREVCQVJfV0lEVEgiLCJSQUlMX1dJRFRIIiwiaXRlbU1hdGNoZXNTZWFyY2giLCJidWlsZFNpZGViYXJSZXNvdXJjZUl0ZW1zIiwicmVzb3VyY2VQYXRoUHJlZml4Iiwic2VsZWN0ZWRQcmVmaXhlcyIsInNlbGVjdGVkIiwicHJlZml4IiwicmVzb3VyY2UiLCJSYWlsSWNvbiIsImNoaWxkcmVuIiwidmlld0JveCIsIkhvbWVJY29uIiwiZCIsIlBlbmNpbEljb24iLCJNZWRpYUljb24iLCJ4IiwieSIsInJ4IiwiY3giLCJjeSIsInIiLCJTaWRlYmFyIiwiaXNWaXNpYmxlIiwicGFnZXMiLCJ1c2VTZWxlY3RvciIsInN0YXRlIiwic2Vzc2lvbiIsInNldFNlYXJjaCIsImF2YXRhclJlZiIsInBhZ2VJdGVtcyIsInBhZ2UiLCJjb2xsZWN0aW9uSXRlbXMiLCJvcGVyYXRpb25JdGVtcyIsImN1c3RvbWVySXRlbXMiLCJpbml0aWFsIiwiaXNEYXNoYm9hcmQiLCJpc01lZGlhIiwic2hvd1BhbmVsIiwiaGFuZGxlT3V0c2lkZUNsaWNrIiwiTG9naW4iLCJfX0FQUF9TVEFURV9fIiwiYnJhbmRpbmciLCJlcnJvck1lc3NhZ2UiLCJCb3giLCJwIiwiYmFja2dyb3VuZCIsImJnIiwibWluSGVpZ2h0IiwiYm94U2hhZG93IiwiYm9yZGVyUmFkaXVzIiwib3ZlcmZsb3ciLCJmbGV4RGlyZWN0aW9uIiwiY29tcGFueU5hbWUiLCJvYmplY3RGaXQiLCJIMiIsIlRleHQiLCJhcyIsImFjdGlvbiIsImZsZXhHcm93IiwibWFyZ2luIiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJJbnB1dCIsIm10IiwiQnV0dG9uIiwic2l6ZSIsIlRvcEJhciIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUFPLE1BQU1BLDBCQUEwQixHQUFHLENBQ3hDO0VBQ0VDLEVBQUFBLEtBQUssRUFBRSxZQUFZO0VBQ25CQyxFQUFBQSxLQUFLLEVBQUUsWUFBWTtFQUNuQkMsRUFBQUEsWUFBWSxFQUFFLFdBQVc7RUFDekJDLEVBQUFBLFVBQVUsRUFBRSxhQUFhO0VBQ3pCQyxFQUFBQSxjQUFjLEVBQUUsYUFBYTtFQUM3QkMsRUFBQUEsV0FBVyxFQUFFO0VBQ2YsQ0FBQyxFQUNEO0VBQ0VMLEVBQUFBLEtBQUssRUFBRSxXQUFXO0VBQ2xCQyxFQUFBQSxLQUFLLEVBQUUsV0FBVztFQUNsQkMsRUFBQUEsWUFBWSxFQUFFLFVBQVU7RUFDeEJDLEVBQUFBLFVBQVUsRUFBRSxhQUFhO0VBQ3pCQyxFQUFBQSxjQUFjLEVBQUUsYUFBYTtFQUM3QkMsRUFBQUEsV0FBVyxFQUFFO0VBQ2YsQ0FBQyxFQUNEO0VBQ0VMLEVBQUFBLEtBQUssRUFBRSxlQUFlO0VBQ3RCQyxFQUFBQSxLQUFLLEVBQUUsZUFBZTtFQUN0QkMsRUFBQUEsWUFBWSxFQUFFLGNBQWM7RUFDNUJDLEVBQUFBLFVBQVUsRUFBRSxhQUFhO0VBQ3pCQyxFQUFBQSxjQUFjLEVBQUUsYUFBYTtFQUM3QkMsRUFBQUEsV0FBVyxFQUFFO0VBQ2YsQ0FBQyxFQUNEO0VBQ0VMLEVBQUFBLEtBQUssRUFBRSxlQUFlO0VBQ3RCQyxFQUFBQSxLQUFLLEVBQUUsZUFBZTtFQUN0QkMsRUFBQUEsWUFBWSxFQUFFLGNBQWM7RUFDNUJDLEVBQUFBLFVBQVUsRUFBRSxhQUFhO0VBQ3pCQyxFQUFBQSxjQUFjLEVBQUUsYUFBYTtFQUM3QkMsRUFBQUEsV0FBVyxFQUFFO0VBQ2YsQ0FBQyxFQUNEO0VBQ0VMLEVBQUFBLEtBQUssRUFBRSxPQUFPO0VBQ2RDLEVBQUFBLEtBQUssRUFBRSxl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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztFQUVELE1BQU1DLEtBQUcsR0FBRyxJQUFJQyxpQkFBUyxFQUFFO0VBRTNCLFNBQVNDLG9CQUFvQkEsQ0FBQ0MsS0FBSyxFQUFFO0lBQ25DLElBQUksQ0FBQ0Es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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztFQUVELFNBQVMwSSxTQUFPQSxDQUFDMUYsSUFBSSxFQUFFO0VBQ3JCLEVBQUEsT0FBT0EsSUFBSSxDQUNSMkYsT0FBTyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUN0Q0EsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FDdEJBLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQzNCQSxPQUFPLENBQUMsSUFBSSxFQUFHQyxDQUFDLElBQUtBLENBQUMsQ0FBQ0MsV0FBVyxFQUFFLENBQUM7RUFDMUM7RUFFQSxTQUFTQyxZQUFVQSxDQUFDMUksS0FBSyxFQUFFO0lBQ3pCLE9BQU9xQixJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFD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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7RUFFRCxTQUFTMEks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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7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
