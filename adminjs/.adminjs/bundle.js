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
    listProperties: ['id', 'user_id', 'resource_id', 'status', 'refund_request_status', 'start_at', 'total_minor', 'updated_at'],
    filterProperties: ['id', 'user_id', 'resource_id', 'status', 'refund_request_status', 'start_at', 'stripe_payment_status'],
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
  const STYLES$6 = `
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
  function coerceJson$1(responseText) {
    if (!responseText) {
      return null;
    }
    try {
      return JSON.parse(responseText);
    } catch {
      return null;
    }
  }
  async function fetchAdminJson$1(url, options = {}) {
    const response = await fetch(url, {
      credentials: 'same-origin',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    const responseText = await response.text();
    const payload = coerceJson$1(responseText);
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
      const customPayload = await fetchAdminJson$1(`/admin/api/contact-submissions?limit=${safeLimit}`);
      const customSubmissions = normalizeCustomResponse(customPayload);
      if (customSubmissions.length) {
        return customSubmissions;
      }
    } catch (error) {
      console.warn('Custom contact submissions endpoint unavailable:', error?.message || error);
    }
    const resourcePayload = await fetchAdminJson$1(`/admin/api/resources/contact_submissions/actions/list?page=1&perPage=${safeLimit}`);
    return normalizeResourceSubmissionPayload(resourcePayload);
  }
  async function deleteAdminSubmission(id) {
    const parsedId = Number(id);
    if (!Number.isFinite(parsedId) || parsedId <= 0) {
      throw new Error('Invalid submission id.');
    }
    try {
      const customPayload = await fetchAdminJson$1(`/admin/api/contact-submissions/${parsedId}`, {
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
    const resourcePayload = await fetchAdminJson$1(`/admin/api/resources/contact_submissions/records/${parsedId}/delete`, {
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
      const customPayload = await fetchAdminJson$1(`/admin/api/contact-submissions/${parsedId}`);
      const customSubmission = normalizeSubmissionRecord(customPayload?.data?.record ?? customPayload?.record ?? customPayload);
      if (customSubmission.id > 0) {
        return customSubmission;
      }
    } catch (error) {
      console.warn('Unable to load message from custom endpoint:', error?.message || error);
    }
    const resourcePayload = await fetchAdminJson$1(`/admin/api/resources/contact_submissions/records/${parsedId}/show`);
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
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$6), /*#__PURE__*/React__default.default.createElement("div", {
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
  const STYLES$5 = `
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
    }, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$5), /*#__PURE__*/React__default.default.createElement("div", {
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
    }, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$5), /*#__PURE__*/React__default.default.createElement("div", {
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
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$4), /*#__PURE__*/React__default.default.createElement("div", {
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
  const STYLES$3 = `
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
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$3), /*#__PURE__*/React__default.default.createElement("div", {
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

  const STYLES$2 = `
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
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$2), /*#__PURE__*/React__default.default.createElement("div", {
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

  const STYLES$1 = `
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
      minute: '2-digit'
    }).format(date);
  }
  function formatCurrency(amountMinor, currency = 'gbp') {
    const value = Number(amountMinor || 0) / 100;
    try {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: String(currency || 'gbp').toUpperCase()
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
  function RefundRequests() {
    const [tab, setTab] = React.useState('pending');
    const [pendingRequests, setPendingRequests] = React.useState([]);
    const [processedRequests, setProcessedRequests] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [processingId, setProcessingId] = React.useState(null);
    const [error, setError] = React.useState('');
    const [successMap, setSuccessMap] = React.useState({});
    React.useEffect(() => {
      let isActive = true;
      const load = async () => {
        setLoading(true);
        try {
          const [pendingPayload, processedPayload] = await Promise.all([fetchAdminJson('/admin/api/admin/bookings/refund-requests'), fetchAdminJson('/admin/api/admin/bookings/refund-requests?status=processed')]);
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
      return () => {
        isActive = false;
      };
    }, []);
    const handleApprove = async request => {
      if (!request?.id) return;
      const targetId = Number(request.id);
      setProcessingId(targetId);
      setError('');
      try {
        await fetchAdminJson(`/admin/api/admin/bookings/${targetId}/approve-refund`, {
          method: 'POST'
        });
        setSuccessMap(prev => ({
          ...prev,
          [targetId]: 'approved'
        }));
        setTimeout(() => {
          setPendingRequests(prev => prev.filter(r => r.id !== targetId));
          setProcessedRequests(prev => [{
            ...request,
            refundRequestStatus: 'approved'
          }, ...prev]);
          setSuccessMap(prev => {
            const next = {
              ...prev
            };
            delete next[targetId];
            return next;
          });
        }, 1200);
      } catch (err) {
        setError(err?.message || 'Unable to approve refund.');
      } finally {
        setProcessingId(null);
      }
    };
    const handleReject = async request => {
      if (!request?.id) return;
      const targetId = Number(request.id);
      setProcessingId(targetId);
      setError('');
      try {
        await fetchAdminJson(`/admin/api/admin/bookings/${targetId}/reject-refund`, {
          method: 'POST'
        });
        setSuccessMap(prev => ({
          ...prev,
          [targetId]: 'rejected'
        }));
        setTimeout(() => {
          setPendingRequests(prev => prev.filter(r => r.id !== targetId));
          setProcessedRequests(prev => [{
            ...request,
            refundRequestStatus: 'rejected'
          }, ...prev]);
          setSuccessMap(prev => {
            const next = {
              ...prev
            };
            delete next[targetId];
            return next;
          });
        }, 1200);
      } catch (err) {
        setError(err?.message || 'Unable to reject refund request.');
      } finally {
        setProcessingId(null);
      }
    };
    const activeList = tab === 'pending' ? pendingRequests : processedRequests;
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$1), /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page__inner"
    }, /*#__PURE__*/React__default.default.createElement("p", {
      className: "refund-page__eyebrow"
    }, "Operations"), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "refund-page__title"
    }, "Refund Requests"), /*#__PURE__*/React__default.default.createElement("p", {
      className: "refund-page__subtitle"
    }, "Review and manage refund requests from members for meeting room bookings and memberships."), /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page__tabs"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      className: `refund-page__tab${tab === 'pending' ? ' refund-page__tab--active' : ''}`,
      onClick: () => setTab('pending')
    }, "Pending", pendingRequests.length > 0 && /*#__PURE__*/React__default.default.createElement("span", {
      className: "refund-page__badge"
    }, pendingRequests.length)), /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      className: `refund-page__tab${tab === 'processed' ? ' refund-page__tab--active' : ''}`,
      onClick: () => setTab('processed')
    }, "Processed", processedRequests.length > 0 && /*#__PURE__*/React__default.default.createElement("span", {
      className: "refund-page__badge refund-page__badge--muted"
    }, processedRequests.length))), loading ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page__loading"
    }, "Loading refund requests...") : activeList.length === 0 ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page__table-wrap"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page__empty"
    }, tab === 'pending' ? 'No pending refund requests.' : 'No processed refund requests yet.')) : /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page__table-wrap"
    }, /*#__PURE__*/React__default.default.createElement("table", {
      className: "refund-page__table"
    }, /*#__PURE__*/React__default.default.createElement("thead", null, /*#__PURE__*/React__default.default.createElement("tr", null, /*#__PURE__*/React__default.default.createElement("th", null, "#"), /*#__PURE__*/React__default.default.createElement("th", null, "Customer"), /*#__PURE__*/React__default.default.createElement("th", null, "Resource"), /*#__PURE__*/React__default.default.createElement("th", null, "Booking date"), /*#__PURE__*/React__default.default.createElement("th", null, "Amount"), /*#__PURE__*/React__default.default.createElement("th", null, "Requested"), tab === 'processed' && /*#__PURE__*/React__default.default.createElement("th", null, "Status"), tab === 'pending' && /*#__PURE__*/React__default.default.createElement("th", null, "Actions"))), /*#__PURE__*/React__default.default.createElement("tbody", null, activeList.map(request => /*#__PURE__*/React__default.default.createElement("tr", {
      key: request.id
    }, /*#__PURE__*/React__default.default.createElement("td", null, request.id), /*#__PURE__*/React__default.default.createElement("td", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page__name"
    }, request.userName), /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page__email"
    }, request.userEmail)), /*#__PURE__*/React__default.default.createElement("td", null, request.resourceName || '-'), /*#__PURE__*/React__default.default.createElement("td", null, formatBookingDate(request.startAt)), /*#__PURE__*/React__default.default.createElement("td", null, /*#__PURE__*/React__default.default.createElement("span", {
      className: "refund-page__amount"
    }, formatCurrency(request.totalMinor, request.currency))), /*#__PURE__*/React__default.default.createElement("td", null, formatTimeAgo(request.refundRequestedAt)), tab === 'processed' && /*#__PURE__*/React__default.default.createElement("td", null, /*#__PURE__*/React__default.default.createElement("span", {
      className: `refund-page__status-badge refund-page__status-badge--${request.refundRequestStatus || 'pending'}`
    }, request.refundRequestStatus === 'approved' ? 'Approved' : request.refundRequestStatus === 'rejected' ? 'Rejected' : request.refundRequestStatus || '-')), tab === 'pending' && /*#__PURE__*/React__default.default.createElement("td", null, successMap[request.id] ? /*#__PURE__*/React__default.default.createElement("span", {
      className: "refund-page__success"
    }, successMap[request.id] === 'approved' ? '✓ Approved' : '✕ Rejected') : /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      className: "refund-page__btn refund-page__btn--approve",
      onClick: () => handleApprove(request),
      disabled: processingId === request.id
    }, processingId === request.id ? 'Processing...' : '✓ Approve'), /*#__PURE__*/React__default.default.createElement("button", {
      type: "button",
      className: "refund-page__btn refund-page__btn--reject",
      onClick: () => handleReject(request),
      disabled: processingId === request.id
    }, processingId === request.id ? 'Processing...' : '✕ Reject')))))))), error ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "refund-page__error"
    }, error) : null)));
  }

  const REFUND_REQUESTS_HREF = '/admin/pages/refund-requests';
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
    const [pendingRefundCount, setPendingRefundCount] = React.useState(0);
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
    const refundRequestsVisible = React.useMemo(() => itemMatchesSearch('Refund Requests', search), [search]);
    const isRefundRequestsSelected = location.pathname.startsWith(REFUND_REQUESTS_HREF);
    React.useEffect(() => {
      let isActive = true;
      const loadCount = async () => {
        try {
          const response = await fetch('/admin/api/admin/bookings/refund-requests', {
            credentials: 'same-origin'
          });
          if (!response.ok) return;
          const payload = await response.json();
          if (isActive && Array.isArray(payload?.data)) {
            setPendingRefundCount(payload.data.length);
          }
        } catch {
          // ignore
        }
      };
      loadCount();
      const interval = setInterval(loadCount, 30_000);
      return () => {
        isActive = false;
        clearInterval(interval);
      };
    }, []);
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
    }, operationItems.length + (refundRequestsVisible ? 1 : 0))), operationItems.map(item => /*#__PURE__*/React__default.default.createElement("button", {
      key: item.id,
      className: `admin-nav-link${item.selected ? ' admin-nav-link--selected' : ''}`,
      type: "button",
      onClick: () => navigate(item.href)
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-nav-link__text"
    }, item.label))), refundRequestsVisible && /*#__PURE__*/React__default.default.createElement("button", {
      className: `admin-nav-link${isRefundRequestsSelected ? ' admin-nav-link--selected' : ''}`,
      type: "button",
      onClick: () => navigate(REFUND_REQUESTS_HREF)
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-nav-link__text"
    }, "Refund Requests"), pendingRefundCount > 0 && /*#__PURE__*/React__default.default.createElement("span", {
      className: "admin-nav-link__icon",
      style: {
        width: 'auto',
        fontSize: '0.6875rem',
        fontWeight: 700,
        color: '#c72e3a'
      }
    }, pendingRefundCount))), /*#__PURE__*/React__default.default.createElement("div", {
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
  AdminJS.UserComponents.RefundRequests = RefundRequests;
  AdminJS.UserComponents.Sidebar = Sidebar;
  AdminJS.UserComponents.Login = Login;
  AdminJS.UserComponents.TopBar = TopBar;

})(React, ReactRouter, AdminJS, AdminJSDesignSystem, ReactRedux);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvcmVzb3VyY2UtZGVmaW5pdGlvbnMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbk1hbmFnZXIuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3IuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5LmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL0FjY291bnRTZXR0aW5ncy5qc3giLCIuLi9zcmMvY29tcG9uZW50cy9SZWZ1bmRSZXF1ZXN0cy5qc3giLCIuLi9zcmMvY29tcG9uZW50cy9TaWRlYmFyLmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL0xvZ2luLmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL1RvcEJhci5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQURNSU5fUkVTT1VSQ0VfREVGSU5JVElPTlMgPSBbXG4gIHtcbiAgICB0YWJsZTogJ2Jsb2dfcG9zdHMnLFxuICAgIGxhYmVsOiAnQmxvZyBQb3N0cycsXG4gICAgc2lkZWJhckxhYmVsOiAnQmxvZyBQb3N0JyxcbiAgICBuYXZpZ2F0aW9uOiAnQ29sbGVjdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnY29sbGVjdGlvbnMnLFxuICAgIHNpZGViYXJIcmVmOiAnL2FkbWluL3BhZ2VzL2Jsb2ctcG9zdHMnLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdmYXFfaXRlbXMnLFxuICAgIGxhYmVsOiAnRkFRIEl0ZW1zJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdGQVEgSXRlbScsXG4gICAgbmF2aWdhdGlvbjogJ0NvbGxlY3Rpb25zJyxcbiAgICBzaWRlYmFyU2VjdGlvbjogJ2NvbGxlY3Rpb25zJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9mYXEtaXRlbXMnLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdtZWV0aW5nX3Jvb21zJyxcbiAgICBsYWJlbDogJ01lZXRpbmcgUm9vbXMnLFxuICAgIHNpZGViYXJMYWJlbDogJ01lZXRpbmcgUm9vbScsXG4gICAgbmF2aWdhdGlvbjogJ0NvbGxlY3Rpb25zJyxcbiAgICBzaWRlYmFyU2VjdGlvbjogJ2NvbGxlY3Rpb25zJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9tZWV0aW5nLXJvb21zJyxcbiAgfSxcbiAge1xuICAgIHRhYmxlOiAncHJpY2luZ19wbGFucycsXG4gICAgbGFiZWw6ICdQcmljaW5nIFBsYW5zJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdQcmljaW5nIFBsYW4nLFxuICAgIG5hdmlnYXRpb246ICdDb2xsZWN0aW9ucycsXG4gICAgc2lkZWJhclNlY3Rpb246ICdjb2xsZWN0aW9ucycsXG4gICAgc2lkZWJhckhyZWY6ICcvYWRtaW4vcGFnZXMvcHJpY2luZy1wbGFucycsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ2ZpbGVzJyxcbiAgICBsYWJlbDogJ01lZGlhIExpYnJhcnknLFxuICAgIHNpZGViYXJMYWJlbDogJ01lZGlhIExpYnJhcnknLFxuICAgIG5hdmlnYXRpb246ICdNZWRpYScsXG4gICAgc2lkZWJhclNlY3Rpb246IG51bGwsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ21lbWJlcl91c2VycycsXG4gICAgbGFiZWw6ICdDdXN0b21lcnMnLFxuICAgIHNpZGViYXJMYWJlbDogJ0N1c3RvbWVycycsXG4gICAgbmF2aWdhdGlvbjogJ09wZXJhdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnY3VzdG9tZXJzJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9jdXN0b21lcnMnLFxuICAgIGhpZGRlbkNvbHVtbnM6IFsncGFzc3dvcmRfaGFzaCddLFxuICAgIGxpc3RQcm9wZXJ0aWVzOiBbJ2lkJywgJ25hbWUnLCAnZW1haWwnLCAnYWNjZXNzX3N0YXR1cycsICdjcmVhdGVkX2F0J10sXG4gICAgZmlsdGVyUHJvcGVydGllczogWydpZCcsICduYW1lJywgJ2VtYWlsJywgJ2FjY2Vzc19zdGF0dXMnXSxcbiAgICByZWFkT25seTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIHRhYmxlOiAnbWVtYmVyc2hpcHMnLFxuICAgIGxhYmVsOiAnTWVtYmVyc2hpcHMnLFxuICAgIHNpZGViYXJMYWJlbDogJ01lbWJlcnNoaXBzJyxcbiAgICBuYXZpZ2F0aW9uOiAnT3BlcmF0aW9ucycsXG4gICAgc2lkZWJhclNlY3Rpb246IG51bGwsXG4gICAgbGlzdFByb3BlcnRpZXM6IFsnaWQnLCAndXNlcl9pZCcsICdwbGFuX2lkJywgJ3N0YXR1cycsICdzdHJpcGVfc3Vic2NyaXB0aW9uX2lkJywgJ3VwZGF0ZWRfYXQnXSxcbiAgICBmaWx0ZXJQcm9wZXJ0aWVzOiBbJ2lkJywgJ3VzZXJfaWQnLCAncGxhbl9pZCcsICdzdGF0dXMnLCAnc3RyaXBlX3N1YnNjcmlwdGlvbl9pZCddLFxuICAgIHJlYWRPbmx5OiB0cnVlLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdtZW1iZXJzaGlwX3BsYW5zJyxcbiAgICBsYWJlbDogJ01lbWJlcnNoaXAgUGxhbnMnLFxuICAgIHNpZGViYXJMYWJlbDogJ01lbWJlcnNoaXAgUGxhbnMnLFxuICAgIG5hdmlnYXRpb246ICdPcGVyYXRpb25zJyxcbiAgICBzaWRlYmFyU2VjdGlvbjogbnVsbCxcbiAgICBsaXN0UHJvcGVydGllczogWydpZCcsICduYW1lJywgJ3NsdWcnLCAnbW9udGhseV9wcmljZV9taW5vcicsICdjdXJyZW5jeScsICdhY3RpdmUnLCAndXBkYXRlZF9hdCddLFxuICAgIGZpbHRlclByb3BlcnRpZXM6IFsnaWQnLCAnbmFtZScsICdzbHVnJywgJ2N1cnJlbmN5JywgJ2FjdGl2ZSddLFxuICAgIHJlYWRPbmx5OiB0cnVlLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdib29raW5ncycsXG4gICAgbGFiZWw6ICdPcmRlcnMnLFxuICAgIHNpZGViYXJMYWJlbDogJ09yZGVycycsXG4gICAgbmF2aWdhdGlvbjogJ09wZXJhdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnb3JkZXJzJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9vcmRlcnMnLFxuICAgIGxpc3RQcm9wZXJ0aWVzOiBbJ2lkJywgJ3VzZXJfaWQnLCAncmVzb3VyY2VfaWQnLCAnc3RhdHVzJywgJ3JlZnVuZF9yZXF1ZXN0X3N0YXR1cycsICdzdGFydF9hdCcsICd0b3RhbF9taW5vcicsICd1cGRhdGVkX2F0J10sXG4gICAgZmlsdGVyUHJvcGVydGllczogWydpZCcsICd1c2VyX2lkJywgJ3Jlc291cmNlX2lkJywgJ3N0YXR1cycsICdyZWZ1bmRfcmVxdWVzdF9zdGF0dXMnLCAnc3RhcnRfYXQnLCAnc3RyaXBlX3BheW1lbnRfc3RhdHVzJ10sXG4gICAgcmVhZE9ubHk6IHRydWUsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ3Jlc291cmNlcycsXG4gICAgbGFiZWw6ICdCb29rYWJsZSBSZXNvdXJjZXMnLFxuICAgIHNpZGViYXJMYWJlbDogJ0Jvb2thYmxlIFJlc291cmNlcycsXG4gICAgbmF2aWdhdGlvbjogJ09wZXJhdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiBudWxsLFxuICAgIGxpc3RQcm9wZXJ0aWVzOiBbJ2lkJywgJ25hbWUnLCAnc2x1ZycsICd0eXBlJywgJ2hvdXJseV9yYXRlX21pbm9yJywgJ2FjdGl2ZScsICd1cGRhdGVkX2F0J10sXG4gICAgZmlsdGVyUHJvcGVydGllczogWydpZCcsICduYW1lJywgJ3NsdWcnLCAndHlwZScsICdhY3RpdmUnXSxcbiAgICByZWFkT25seTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIHRhYmxlOiAnaW52b2ljZXMnLFxuICAgIGxhYmVsOiAnSW52b2ljZXMnLFxuICAgIHNpZGViYXJMYWJlbDogJ0ludm9pY2VzJyxcbiAgICBuYXZpZ2F0aW9uOiAnT3BlcmF0aW9ucycsXG4gICAgc2lkZWJhclNlY3Rpb246ICdvcmRlcnMnLFxuICAgIHNpZGViYXJIcmVmOiAnL2FkbWluL3BhZ2VzL2ludm9pY2VzJyxcbiAgICBsaXN0UHJvcGVydGllczogWydpZCcsICd1c2VyX2lkJywgJ21lbWJlcnNoaXBfaWQnLCAnYm9va2luZ19pZCcsICdzdGF0dXMnLCAndG90YWxfbWlub3InLCAncGFpZF9hdCddLFxuICAgIGZpbHRlclByb3BlcnRpZXM6IFsnaWQnLCAndXNlcl9pZCcsICdtZW1iZXJzaGlwX2lkJywgJ2Jvb2tpbmdfaWQnLCAnc3RhdHVzJywgJ3N0cmlwZV9pbnZvaWNlX2lkJ10sXG4gICAgcmVhZE9ubHk6IHRydWUsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ2NvbnRhY3Rfc3VibWlzc2lvbnMnLFxuICAgIGxhYmVsOiAnTWVzc2FnZXMnLFxuICAgIHNpZGViYXJMYWJlbDogJ01lc3NhZ2VzJyxcbiAgICBuYXZpZ2F0aW9uOiAnT3BlcmF0aW9ucycsXG4gICAgc2lkZWJhclNlY3Rpb246ICdjdXN0b21lcnMnLFxuICAgIHNpZGViYXJIcmVmOiAnL2FkbWluL3BhZ2VzL21lc3NhZ2VzJyxcbiAgICBsaXN0UHJvcGVydGllczogWydpZCcsICduYW1lJywgJ2VtYWlsJywgJ3NvdXJjZV9wYWdlJywgJ2NyZWF0ZWRfYXQnXSxcbiAgICBmaWx0ZXJQcm9wZXJ0aWVzOiBbJ2lkJywgJ25hbWUnLCAnZW1haWwnLCAnc291cmNlX3BhZ2UnXSxcbiAgICByZWFkT25seTogdHJ1ZSxcbiAgfSxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEFkbWluUmVzb3VyY2VIcmVmKHJlc291cmNlSWQpIHtcbiAgcmV0dXJuIGAvYWRtaW4vcmVzb3VyY2VzLyR7cmVzb3VyY2VJZH0vYWN0aW9ucy9saXN0YDtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBBRE1JTl9SRVNPVVJDRV9ERUZJTklUSU9OUywgYnVpbGRBZG1pblJlc291cmNlSHJlZiB9IGZyb20gJy4uL3Jlc291cmNlLWRlZmluaXRpb25zLmpzJztcblxuY29uc3QgUFJJTUFSWV9QQUdFUyA9IFtcbiAgeyBsYWJlbDogJ0hvbWVwYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9ob21lcGFnZScgfSxcbiAgeyBsYWJlbDogJ0Fib3V0IFBhZ2UnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2Fib3V0LXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdQcmljaW5nIFBhZ2UnLCBocmVmOiAnL2FkbWluL3BhZ2VzL3ByaWNpbmctcGFnZScgfSxcbiAgeyBsYWJlbDogJ0NvbnRhY3QgUGFnZScsIGhyZWY6ICcvYWRtaW4vcGFnZXMvY29udGFjdC1wYWdlJyB9LFxuXTtcblxuY29uc3QgQ09MTEVDVElPTlMgPSBbXG4gIHsgbGFiZWw6ICdCbG9nIFBvc3RzJywgaHJlZjogJy9hZG1pbi9wYWdlcy9ibG9nLXBvc3RzJyB9LFxuICB7IGxhYmVsOiAnRkFRIEl0ZW1zJywgaHJlZjogJy9hZG1pbi9wYWdlcy9mYXEtaXRlbXMnIH0sXG4gIHsgbGFiZWw6ICdNZWV0aW5nIFJvb21zJywgaHJlZjogJy9hZG1pbi9wYWdlcy9tZWV0aW5nLXJvb21zJyB9LFxuICB7IGxhYmVsOiAnUHJpY2luZyBQbGFucycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvcHJpY2luZy1wbGFucycgfSxcbl07XG5cbmNvbnN0IENVU1RPTUVSX1FVSUNLX09SREVSID0gW1xuICAnbWVtYmVyX3VzZXJzJyxcbiAgJ2NvbnRhY3Rfc3VibWlzc2lvbnMnLFxuXTtcblxuY29uc3QgT1JERVJfUVVJQ0tfT1JERVIgPSBbXG4gICdib29raW5ncycsXG4gICdpbnZvaWNlcycsXG5dO1xuXG5jb25zdCBDVVNUT01FUlMgPSBDVVNUT01FUl9RVUlDS19PUkRFUlxuICAubWFwKChyZXNvdXJjZUlkKSA9PiBBRE1JTl9SRVNPVVJDRV9ERUZJTklUSU9OUy5maW5kKChkZWZpbml0aW9uKSA9PiBkZWZpbml0aW9uLnRhYmxlID09PSByZXNvdXJjZUlkKSlcbiAgLmZpbHRlcihCb29sZWFuKVxuICAubWFwKChkZWZpbml0aW9uKSA9PiAoe1xuICAgIGxhYmVsOiBkZWZpbml0aW9uLnNpZGViYXJMYWJlbCB8fCBkZWZpbml0aW9uLmxhYmVsLFxuICAgIGhyZWY6IGRlZmluaXRpb24uc2lkZWJhckhyZWYgfHwgYnVpbGRBZG1pblJlc291cmNlSHJlZihkZWZpbml0aW9uLnRhYmxlKSxcbiAgfSkpO1xuXG5jb25zdCBPUkRFUlMgPSBPUkRFUl9RVUlDS19PUkRFUlxuICAubWFwKChyZXNvdXJjZUlkKSA9PiBBRE1JTl9SRVNPVVJDRV9ERUZJTklUSU9OUy5maW5kKChkZWZpbml0aW9uKSA9PiBkZWZpbml0aW9uLnRhYmxlID09PSByZXNvdXJjZUlkKSlcbiAgLmZpbHRlcihCb29sZWFuKVxuICAubWFwKChkZWZpbml0aW9uKSA9PiAoe1xuICAgIGxhYmVsOiBkZWZpbml0aW9uLnNpZGViYXJMYWJlbCB8fCBkZWZpbml0aW9uLmxhYmVsLFxuICAgIGhyZWY6IGRlZmluaXRpb24uc2lkZWJhckhyZWYgfHwgYnVpbGRBZG1pblJlc291cmNlSHJlZihkZWZpbml0aW9uLnRhYmxlKSxcbiAgfSkpO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tZGFzaGJvYXJkIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMzJweCA0MHB4IDY0cHggNDBweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiAxMjQwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19leWVicm93IHtcbiAgbWFyZ2luOiAwIDAgNHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMi4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX3N1YnRpdGxlIHtcbiAgbWFyZ2luOiAxMHB4IDAgMjhweDtcbiAgbWF4LXdpZHRoOiA3ODBweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsIDEuMWZyKSBtaW5tYXgoMCwgMC45ZnIpO1xuICBnYXA6IDE2cHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2NhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19jYXJkLWhlYWQge1xuICBwYWRkaW5nOiAxNnB4IDIwcHggMTJweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2NhcmQtdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fY2FyZC1ib2R5IHtcbiAgcGFkZGluZzogOHB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9faXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2l0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLWNvcHkge1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2l0ZW0tbGFiZWwge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2l0ZW0tbWV0YSB7XG4gIG1hcmdpbi10b3A6IDJweDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2l0ZW0tYXJyb3cge1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19ub3RpY2Uge1xuICBwYWRkaW5nOiAyMHB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19ub3RpY2UtdGl0bGUge1xuICBtYXJnaW46IDAgMCA4cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbm90aWNlLWNvcHkge1xuICBtYXJnaW46IDA7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTJweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLWhlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtbmFtZSB7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1lbWFpbCxcbi5hZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtbWV0YSB7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGNvbG9yOiAjNjY2Njg3O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLWJvZHkge1xuICBtYXJnaW46IDEwcHggMCAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLWFjdGlvbnMge1xuICBtYXJnaW4tdG9wOiAxMnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDhweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fYnV0dG9uIHtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2Q5ZDhlNjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiA2cHggMTBweDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fYnV0dG9uLS1kYW5nZXIge1xuICBib3JkZXItY29sb3I6ICNmZmQzYzc7XG4gIGNvbG9yOiAjYzcyZTNhO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19idXR0b24tLWRhbmdlcjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmZmY1ZjI7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2J1dHRvbjpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZGV0YWlsIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIHBhZGRpbmctdG9wOiAxMnB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19kZXRhaWwtaGVhZGluZyB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2RldGFpbC1ib2R5IHtcbiAgbWFyZ2luOiAxMHB4IDAgMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2RldGFpbC1hY3Rpb25zIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgZ2FwOiA4cHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2Vycm9yIHtcbiAgY29sb3I6ICNjNzJlM2E7XG4gIG1hcmdpbjogMTBweCAwIDA7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2VtcHR5IHtcbiAgcGFkZGluZzogMjBweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAuYWRtaW4tZGFzaGJvYXJkIHtcbiAgICBwYWRkaW5nOiAyMHB4IDE2cHggNDhweDtcbiAgfVxuXG4gIC5hZG1pbi1kYXNoYm9hcmRfX2dyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5gO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbmZ1bmN0aW9uIGZvcm1hdFN1Ym1pc3Npb25EYXRlKHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuXG4gIGlmIChOdW1iZXIuaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1HQicsIHtcbiAgICBkYXRlU3R5bGU6ICdtZWRpdW0nLFxuICAgIHRpbWVTdHlsZTogJ3Nob3J0JyxcbiAgfSkuZm9ybWF0KGRhdGUpO1xufVxuXG5mdW5jdGlvbiB0cmltTWVzc2FnZShtZXNzYWdlKSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSA/PyAnJykudHJpbSgpO1xuXG4gIGlmIChub3JtYWxpemVkLmxlbmd0aCA8PSAxODApIHtcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbiAgfVxuXG4gIHJldHVybiBgJHtub3JtYWxpemVkLnNsaWNlKDAsIDE3NykudHJpbUVuZCgpfS4uLmA7XG59XG5cbmZ1bmN0aW9uIGNvZXJjZUpzb24ocmVzcG9uc2VUZXh0KSB7XG4gIGlmICghcmVzcG9uc2VUZXh0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQWRtaW5Kc29uKHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgLi4ub3B0aW9ucyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgLi4uKG9wdGlvbnMuaGVhZGVycyB8fCB7fSksXG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgcmVzcG9uc2VUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICBjb25zdCBwYXlsb2FkID0gY29lcmNlSnNvbihyZXNwb25zZVRleHQpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCBtZXNzYWdlID0gcGF5bG9hZD8uZXJyb3IgfHwgcGF5bG9hZD8ubWVzc2FnZSB8fCByZXNwb25zZVRleHQgfHwgYFJlcXVlc3QgZmFpbGVkICgke3Jlc3BvbnNlLnN0YXR1c30pLmA7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG5cbiAgcmV0dXJuIHBheWxvYWQ7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUFkbWluU3VibWlzc2lvblBheWxvYWQocmVzcG9uc2UpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkocmVzcG9uc2U/LmRhdGEpID8gcmVzcG9uc2UuZGF0YSA6IFtdO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVTdWJtaXNzaW9uUmVjb3JkKHJlY29yZCkge1xuICBjb25zdCBwYXJhbXMgPSByZWNvcmQgPz8ge307XG5cbiAgcmV0dXJuIHtcbiAgICBpZDogTnVtYmVyKHBhcmFtcy5pZCksXG4gICAgbmFtZTogU3RyaW5nKHBhcmFtcy5uYW1lID8/ICcnKSxcbiAgICBlbWFpbDogU3RyaW5nKHBhcmFtcy5lbWFpbCA/PyAnJyksXG4gICAgcGhvbmU6IFN0cmluZyhwYXJhbXMucGhvbmUgPz8gJycpLFxuICAgIG1lc3NhZ2U6IFN0cmluZyhwYXJhbXMubWVzc2FnZSA/PyAnJyksXG4gICAgc291cmNlUGFnZTogU3RyaW5nKHBhcmFtcy5zb3VyY2VQYWdlID8/IHBhcmFtcy5zb3VyY2VfcGFnZSA/PyAnJyksXG4gICAgY3JlYXRlZEF0OiBwYXJhbXMuY3JlYXRlZEF0ID8/IHBhcmFtcy5jcmVhdGVkX2F0ID8/IG51bGwsXG4gIH07XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVJlc291cmNlU3VibWlzc2lvblBheWxvYWQocmVzcG9uc2UpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5yZWNvcmRzKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiByZXNwb25zZS5yZWNvcmRzXG4gICAgLm1hcCgocmVjb3JkKSA9PiBub3JtYWxpemVTdWJtaXNzaW9uUmVjb3JkKHJlY29yZD8ucGFyYW1zID8/IHt9KSlcbiAgICAuZmlsdGVyKChzdWJtaXNzaW9uKSA9PiBOdW1iZXIuaXNGaW5pdGUoc3VibWlzc2lvbi5pZCkpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVSZXNvdXJjZVJlY29yZFBheWxvYWQocmVzcG9uc2UpIHtcbiAgaWYgKCFyZXNwb25zZT8ucmVjb3JkPy5wYXJhbXMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVTdWJtaXNzaW9uUmVjb3JkKHJlc3BvbnNlLnJlY29yZC5wYXJhbXMpO1xufVxuXG5mdW5jdGlvbiBnZXRSZWNlbnRTdWJtaXNzaW9ucyhwcm9wcykge1xuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wcz8ucmVjZW50U3VibWlzc2lvbnMpKSB7XG4gICAgcmV0dXJuIHByb3BzLnJlY2VudFN1Ym1pc3Npb25zO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHM/LmRhdGE/LnJlY2VudFN1Ym1pc3Npb25zKSkge1xuICAgIHJldHVybiBwcm9wcy5kYXRhLnJlY2VudFN1Ym1pc3Npb25zO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHM/LnJlY2VudE1lc3NhZ2VzKSkge1xuICAgIHJldHVybiBwcm9wcy5yZWNlbnRNZXNzYWdlcztcbiAgfVxuXG4gIHJldHVybiBbXTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVN1Ym1pc3Npb25QYXlsb2FkKHNvdXJjZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2U/LnJlY2VudFN1Ym1pc3Npb25zKSkge1xuICAgIHJldHVybiBzb3VyY2UucmVjZW50U3VibWlzc2lvbnM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2U/LmRhdGE/LnJlY2VudFN1Ym1pc3Npb25zKSkge1xuICAgIHJldHVybiBzb3VyY2UuZGF0YS5yZWNlbnRTdWJtaXNzaW9ucztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZT8ucGF5bG9hZD8ucmVjZW50U3VibWlzc2lvbnMpKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5wYXlsb2FkLnJlY2VudFN1Ym1pc3Npb25zO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5ib2R5Py5yZWNlbnRTdWJtaXNzaW9ucykpIHtcbiAgICByZXR1cm4gc291cmNlLmJvZHkucmVjZW50U3VibWlzc2lvbnM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2U/LnJlc3VsdD8ucmVjZW50U3VibWlzc2lvbnMpKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5yZXN1bHQucmVjZW50U3VibWlzc2lvbnM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2U/LnJlY2VudE1lc3NhZ2VzKSkge1xuICAgIHJldHVybiBzb3VyY2UucmVjZW50TWVzc2FnZXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2U/LmRhdGE/LnJlY2VudE1lc3NhZ2VzKSkge1xuICAgIHJldHVybiBzb3VyY2UuZGF0YS5yZWNlbnRNZXNzYWdlcztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZT8uZGF0YT8uaXRlbXMpKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5kYXRhLml0ZW1zO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVEYXNoYm9hcmRSZXNwb25zZShyZXNwb25zZSkge1xuICBjb25zdCBwYXlsb2FkID0gcmVzcG9uc2U/LmRhdGEgPz8gcmVzcG9uc2U7XG4gIHJldHVybiByZXNvbHZlU3VibWlzc2lvblBheWxvYWQocGF5bG9hZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoRGFzaGJvYXJkTWVzc2FnZXMoKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvZGFzaGJvYXJkJywge1xuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICBpZiAoIXJlc3BvbnNlLm9rIHx8ICF0ZXh0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gbG9hZCBkYXNoYm9hcmQgbWVzc2FnZXMgKCR7cmVzcG9uc2Uuc3RhdHVzfSkuYCk7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHRleHQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignRGFzaGJvYXJkIEFQSSByZXR1cm5lZCBhIG5vbi1KU09OIHJlc3BvbnNlLicpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQWRtaW5NZXNzYWdlcyhsaW1pdCA9IDUwKSB7XG4gIGNvbnN0IHNhZmVMaW1pdCA9IE51bWJlci5pc0Zpbml0ZShOdW1iZXIobGltaXQpKSA/IE51bWJlcihsaW1pdCkgOiA1MDtcbiAgY29uc3Qgbm9ybWFsaXplQ3VzdG9tUmVzcG9uc2UgPSAocmVzcG9uc2UpID0+IG5vcm1hbGl6ZUFkbWluU3VibWlzc2lvblBheWxvYWQocmVzcG9uc2UpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgY3VzdG9tUGF5bG9hZCA9IGF3YWl0IGZldGNoQWRtaW5Kc29uKGAvYWRtaW4vYXBpL2NvbnRhY3Qtc3VibWlzc2lvbnM/bGltaXQ9JHtzYWZlTGltaXR9YCk7XG4gICAgY29uc3QgY3VzdG9tU3VibWlzc2lvbnMgPSBub3JtYWxpemVDdXN0b21SZXNwb25zZShjdXN0b21QYXlsb2FkKTtcblxuICAgIGlmIChjdXN0b21TdWJtaXNzaW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBjdXN0b21TdWJtaXNzaW9ucztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS53YXJuKCdDdXN0b20gY29udGFjdCBzdWJtaXNzaW9ucyBlbmRwb2ludCB1bmF2YWlsYWJsZTonLCBlcnJvcj8ubWVzc2FnZSB8fCBlcnJvcik7XG4gIH1cblxuICBjb25zdCByZXNvdXJjZVBheWxvYWQgPSBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9yZXNvdXJjZXMvY29udGFjdF9zdWJtaXNzaW9ucy9hY3Rpb25zL2xpc3Q/cGFnZT0xJnBlclBhZ2U9JHtzYWZlTGltaXR9YCk7XG4gIHJldHVybiBub3JtYWxpemVSZXNvdXJjZVN1Ym1pc3Npb25QYXlsb2FkKHJlc291cmNlUGF5bG9hZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUFkbWluU3VibWlzc2lvbihpZCkge1xuICBjb25zdCBwYXJzZWRJZCA9IE51bWJlcihpZCk7XG5cbiAgaWYgKCFOdW1iZXIuaXNGaW5pdGUocGFyc2VkSWQpIHx8IHBhcnNlZElkIDw9IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3VibWlzc2lvbiBpZC4nKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgY3VzdG9tUGF5bG9hZCA9IGF3YWl0IGZldGNoQWRtaW5Kc29uKGAvYWRtaW4vYXBpL2NvbnRhY3Qtc3VibWlzc2lvbnMvJHtwYXJzZWRJZH1gLCB7IG1ldGhvZDogJ0RFTEVURScgfSk7XG5cbiAgICBpZiAoY3VzdG9tUGF5bG9hZD8ub2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tUGF5bG9hZD8uZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihjdXN0b21QYXlsb2FkLmVycm9yKTtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIGZhbGxiYWNrIHRvIEFkbWluSlMgcmVzb3VyY2UgZW5kcG9pbnRcbiAgfVxuXG4gIGNvbnN0IHJlc291cmNlUGF5bG9hZCA9IGF3YWl0IGZldGNoQWRtaW5Kc29uKGAvYWRtaW4vYXBpL3Jlc291cmNlcy9jb250YWN0X3N1Ym1pc3Npb25zL3JlY29yZHMvJHtwYXJzZWRJZH0vZGVsZXRlYCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gIH0pO1xuXG4gIGlmIChyZXNvdXJjZVBheWxvYWQ/LnJlY29yZD8uYmFzZUVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHJlc291cmNlUGF5bG9hZC5yZWNvcmQuYmFzZUVycm9yPy5tZXNzYWdlIHx8ICdVbmFibGUgdG8gZGVsZXRlIHN1Ym1pc3Npb24uJztcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICBpZiAocmVzb3VyY2VQYXlsb2FkPy5ub3RpY2U/LnR5cGUgPT09ICdlcnJvcicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocmVzb3VyY2VQYXlsb2FkLm5vdGljZT8ubWVzc2FnZSB8fCAnVW5hYmxlIHRvIGRlbGV0ZSBzdWJtaXNzaW9uLicpO1xuICB9XG5cbiAgcmV0dXJuO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEFkbWluU3VibWlzc2lvbkJ5SWQoaWQpIHtcbiAgY29uc3QgcGFyc2VkSWQgPSBOdW1iZXIoaWQpO1xuXG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHBhcnNlZElkKSB8fCBwYXJzZWRJZCA8PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGN1c3RvbVBheWxvYWQgPSBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9jb250YWN0LXN1Ym1pc3Npb25zLyR7cGFyc2VkSWR9YCk7XG4gICAgY29uc3QgY3VzdG9tU3VibWlzc2lvbiA9IG5vcm1hbGl6ZVN1Ym1pc3Npb25SZWNvcmQoY3VzdG9tUGF5bG9hZD8uZGF0YT8ucmVjb3JkID8/IGN1c3RvbVBheWxvYWQ/LnJlY29yZCA/PyBjdXN0b21QYXlsb2FkKTtcblxuICAgIGlmIChjdXN0b21TdWJtaXNzaW9uLmlkID4gMCkge1xuICAgICAgcmV0dXJuIGN1c3RvbVN1Ym1pc3Npb247XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUud2FybignVW5hYmxlIHRvIGxvYWQgbWVzc2FnZSBmcm9tIGN1c3RvbSBlbmRwb2ludDonLCBlcnJvcj8ubWVzc2FnZSB8fCBlcnJvcik7XG4gIH1cblxuICBjb25zdCByZXNvdXJjZVBheWxvYWQgPSBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9yZXNvdXJjZXMvY29udGFjdF9zdWJtaXNzaW9ucy9yZWNvcmRzLyR7cGFyc2VkSWR9L3Nob3dgKTtcbiAgcmV0dXJuIG5vcm1hbGl6ZVJlc291cmNlUmVjb3JkUGF5bG9hZChyZXNvdXJjZVBheWxvYWQpO1xufVxuXG5mdW5jdGlvbiBTaG9ydGN1dExpc3QoeyB0aXRsZSwgaXRlbXMsIG5hdmlnYXRlLCBtZXRhIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLWhlYWRcIj5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZC10aXRsZVwiPnt0aXRsZX08L2gyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZC1ib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19saXN0XCI+XG4gICAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBrZXk9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pdGVtXCJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKGl0ZW0uaHJlZil9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pdGVtLWNvcHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9faXRlbS1sYWJlbFwiPntpdGVtLmxhYmVsfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pdGVtLW1ldGFcIj57bWV0YX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9faXRlbS1hcnJvd1wiPuKGkjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTWVzc2FnZXNDYXJkKHtcbiAgc3VibWlzc2lvbnMsXG4gIHNlbGVjdGVkU3VibWlzc2lvbixcbiAgb25PcGVuLFxuICBvbkRlbGV0ZSxcbiAgZGVsZXRpbmdJZCxcbiAgb3BlcmF0aW9uRXJyb3IsXG59KSB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZC1oZWFkXCI+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtdGl0bGVcIj5DdXN0b21lciBNZXNzYWdlczwvaDI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLWJvZHlcIj5cbiAgICAgICAge3N1Ym1pc3Npb25zLmxlbmd0aCA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbWVzc2FnZXNcIj5cbiAgICAgICAgICAgIHtzdWJtaXNzaW9ucy5tYXAoKHN1Ym1pc3Npb24pID0+IChcbiAgICAgICAgICAgICAgPGFydGljbGUga2V5PXtzdWJtaXNzaW9uLmlkfSBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1oZWFkXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1uYW1lXCI+e3N1Ym1pc3Npb24ubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtZW1haWxcIj57c3VibWlzc2lvbi5lbWFpbH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3N1Ym1pc3Npb24ucGhvbmUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtbWV0YVwiPntzdWJtaXNzaW9uLnBob25lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtbWV0YVwiPlxuICAgICAgICAgICAgICAgICAgICB7c3VibWlzc2lvbi5zb3VyY2VQYWdlfVxuICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0U3VibWlzc2lvbkRhdGUoc3VibWlzc2lvbi5jcmVhdGVkQXQpID8gYCDCtyAke2Zvcm1hdFN1Ym1pc3Npb25EYXRlKHN1Ym1pc3Npb24uY3JlYXRlZEF0KX1gIDogJyd9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtYm9keVwiPnt0cmltTWVzc2FnZShzdWJtaXNzaW9uLm1lc3NhZ2UpfTwvcD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2J1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uT3BlbihzdWJtaXNzaW9uKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgT3BlblxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2J1dHRvbiBhZG1pbi1kYXNoYm9hcmRfX2J1dHRvbi0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25EZWxldGUoc3VibWlzc2lvbil9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkZWxldGluZ0lkID09PSBzdWJtaXNzaW9uLmlkfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7ZGVsZXRpbmdJZCA9PT0gc3VibWlzc2lvbi5pZCA/ICdEZWxldGluZ+KApicgOiAnRGVsZXRlJ31cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICAgIHtzZWxlY3RlZFN1Ym1pc3Npb24gPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19kZXRhaWxcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19kZXRhaWwtaGVhZGluZ1wiPlNlbGVjdGVkIG1lc3NhZ2U8L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZGV0YWlsLWJvZHlcIj57c2VsZWN0ZWRTdWJtaXNzaW9uLm1lc3NhZ2V9PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19kZXRhaWwtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19idXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk9wZW4obnVsbCl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIENsb3NlXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fYnV0dG9uIGFkbWluLWRhc2hib2FyZF9fYnV0dG9uLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkRlbGV0ZShzZWxlY3RlZFN1Ym1pc3Npb24pfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGVsZXRpbmdJZCA9PT0gc2VsZWN0ZWRTdWJtaXNzaW9uLmlkfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7ZGVsZXRpbmdJZCA9PT0gc2VsZWN0ZWRTdWJtaXNzaW9uLmlkID8gJ0RlbGV0aW5n4oCmJyA6ICdEZWxldGUnfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2VtcHR5XCI+Tm8gY3VzdG9tZXIgbWVzc2FnZXMgeWV0LjwvZGl2PlxuICAgICAgICApfVxuICAgICAgICB7b3BlcmF0aW9uRXJyb3IgPyA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZXJyb3JcIj57b3BlcmF0aW9uRXJyb3J9PC9kaXY+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGFzaGJvYXJkKHByb3BzKSB7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgW2Rhc2hib2FyZFN1Ym1pc3Npb25zLCBzZXREYXNoYm9hcmRTdWJtaXNzaW9uc10gPSB1c2VTdGF0ZShnZXRSZWNlbnRTdWJtaXNzaW9ucyhwcm9wcykpO1xuICBjb25zdCBbc2VsZWN0ZWRTdWJtaXNzaW9uLCBzZXRTZWxlY3RlZFN1Ym1pc3Npb25dID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtkZWxldGluZ0lkLCBzZXREZWxldGluZ0lkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbb3BlcmF0aW9uRXJyb3IsIHNldE9wZXJhdGlvbkVycm9yXSA9IHVzZVN0YXRlKCcnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxTdWJtaXNzaW9ucyA9IGdldFJlY2VudFN1Ym1pc3Npb25zKHByb3BzKTtcblxuICAgIGlmIChpbml0aWFsU3VibWlzc2lvbnMubGVuZ3RoKSB7XG4gICAgICBzZXREYXNoYm9hcmRTdWJtaXNzaW9ucyhpbml0aWFsU3VibWlzc2lvbnMpO1xuICAgIH1cbiAgfSwgW3Byb3BzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgY29uc3QgbG9hZERhc2hib2FyZERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBhc3NpZ25TdWJtaXNzaW9ucyA9IChuZXh0U3VibWlzc2lvbnMpID0+IHtcbiAgICAgICAgaWYgKCFpc0FjdGl2ZSB8fCAhQXJyYXkuaXNBcnJheShuZXh0U3VibWlzc2lvbnMpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RGFzaGJvYXJkU3VibWlzc2lvbnMobmV4dFN1Ym1pc3Npb25zKTtcbiAgICAgIH07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhc2hib2FyZFJlc3BvbnNlID0gYXdhaXQgYXBpLmdldERhc2hib2FyZCgpO1xuICAgICAgICBjb25zdCBkYXNoYm9hcmRTdWJtaXNzaW9ucyA9IG5vcm1hbGl6ZURhc2hib2FyZFJlc3BvbnNlKGRhc2hib2FyZFJlc3BvbnNlKTtcblxuICAgICAgICBpZiAoZGFzaGJvYXJkU3VibWlzc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgYXNzaWduU3VibWlzc2lvbnMoZGFzaGJvYXJkU3VibWlzc2lvbnMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZhbGxiYWNrU3VibWlzc2lvbnMgPSBhd2FpdCBmZXRjaEFkbWluTWVzc2FnZXMoKTtcbiAgICAgICAgaWYgKGZhbGxiYWNrU3VibWlzc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgYXNzaWduU3VibWlzc2lvbnMoZmFsbGJhY2tTdWJtaXNzaW9ucyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGFzaGJvYXJkT25seVBheWxvYWQgPSBhd2FpdCBmZXRjaERhc2hib2FyZE1lc3NhZ2VzKCk7XG4gICAgICAgIGNvbnN0IGRhc2hib2FyZE9ubHlTdWJtaXNzaW9ucyA9IG5vcm1hbGl6ZURhc2hib2FyZFJlc3BvbnNlKGRhc2hib2FyZE9ubHlQYXlsb2FkKTtcbiAgICAgICAgYXNzaWduU3VibWlzc2lvbnMoZGFzaGJvYXJkT25seVN1Ym1pc3Npb25zKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGZhbGxiYWNrUGF5bG9hZCA9IGF3YWl0IGZldGNoRGFzaGJvYXJkTWVzc2FnZXMoKTtcbiAgICAgICAgICBjb25zdCBmYWxsYmFja1N1Ym1pc3Npb25zID0gbm9ybWFsaXplRGFzaGJvYXJkUmVzcG9uc2UoZmFsbGJhY2tQYXlsb2FkKTtcbiAgICAgICAgICBhc3NpZ25TdWJtaXNzaW9ucyhmYWxsYmFja1N1Ym1pc3Npb25zKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gY2F0Y2ggKGZhbGxiYWNrRXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1VuYWJsZSB0byBsb2FkIGRhc2hib2FyZCBtZXNzYWdlczonLCBlcnJvcj8ubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgICAgaWYgKGZhbGxiYWNrRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGFzaGJvYXJkIGZhbGxiYWNrIGFsc28gZmFpbGVkOicsIGZhbGxiYWNrRXJyb3I/Lm1lc3NhZ2UgfHwgZmFsbGJhY2tFcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWREYXNoYm9hcmREYXRhKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc3VibWlzc2lvbnMgPSBkYXNoYm9hcmRTdWJtaXNzaW9ucztcblxuICBjb25zdCBoYW5kbGVPcGVuU3VibWlzc2lvbiA9IGFzeW5jIChzdWJtaXNzaW9uKSA9PiB7XG4gICAgc2V0T3BlcmF0aW9uRXJyb3IoJycpO1xuICAgIHNldFNlbGVjdGVkU3VibWlzc2lvbihzdWJtaXNzaW9uKTtcblxuICAgIGlmICghc3VibWlzc2lvbj8uaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZnJlc2hTdWJtaXNzaW9uID0gYXdhaXQgZmV0Y2hBZG1pblN1Ym1pc3Npb25CeUlkKHN1Ym1pc3Npb24uaWQpO1xuXG4gICAgICBpZiAoZnJlc2hTdWJtaXNzaW9uKSB7XG4gICAgICAgIHNldFNlbGVjdGVkU3VibWlzc2lvbihmcmVzaFN1Ym1pc3Npb24pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBzZXRPcGVyYXRpb25FcnJvcihlcnJvcj8ubWVzc2FnZSB8fCAnVW5hYmxlIHRvIG9wZW4gc2VsZWN0ZWQgbWVzc2FnZS4nKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlU3VibWlzc2lvbiA9IGFzeW5jIChzdWJtaXNzaW9uKSA9PiB7XG4gICAgaWYgKCFzdWJtaXNzaW9uPy5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldElkID0gTnVtYmVyKHN1Ym1pc3Npb24uaWQpO1xuXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUodGFyZ2V0SWQpIHx8IHRhcmdldElkIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXREZWxldGluZ0lkKHRhcmdldElkKTtcbiAgICBzZXRPcGVyYXRpb25FcnJvcignJyk7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZGVsZXRlQWRtaW5TdWJtaXNzaW9uKHRhcmdldElkKTtcbiAgICAgIHNldERhc2hib2FyZFN1Ym1pc3Npb25zKChwcmV2aW91cykgPT4gcHJldmlvdXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlkICE9PSB0YXJnZXRJZCkpO1xuXG4gICAgICBzZXRTZWxlY3RlZFN1Ym1pc3Npb24oKHByZXZpb3VzKSA9PiAocHJldmlvdXM/LmlkID09PSB0YXJnZXRJZCA/IG51bGwgOiBwcmV2aW91cykpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBzZXRPcGVyYXRpb25FcnJvcihlcnJvcj8ubWVzc2FnZSB8fCAnVW5hYmxlIHRvIGRlbGV0ZSBzdWJtaXNzaW9uLicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXREZWxldGluZ0lkKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2lubmVyXCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19leWVicm93XCI+SG9tZTwvcD5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX190aXRsZVwiPkNvbnRlbnQgTWFuYWdlcjwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19zdWJ0aXRsZVwiPlxuICAgICAgICAgICAgVXNlIHRoZSBzaG9ydGN1dHMgYmVsb3cgdG8ganVtcCBpbnRvIHNpdGUgY29udGVudCwgY3VzdG9tZXJzLCBvcmRlcnMsIGJpbGxpbmcsIGFuZCBpbmNvbWluZyBtZXNzYWdlcy5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZ3JpZFwiPlxuICAgICAgICAgICAgPFNob3J0Y3V0TGlzdFxuICAgICAgICAgICAgICB0aXRsZT1cIlNpbmdsZSBUeXBlc1wiXG4gICAgICAgICAgICAgIGl0ZW1zPXtQUklNQVJZX1BBR0VTfVxuICAgICAgICAgICAgICBuYXZpZ2F0ZT17bmF2aWdhdGV9XG4gICAgICAgICAgICAgIG1ldGE9XCJFZGl0IHN0cnVjdHVyZWQgcGFnZSBjb250ZW50XCJcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxTaG9ydGN1dExpc3RcbiAgICAgICAgICAgICAgdGl0bGU9XCJDdXN0b21lcnNcIlxuICAgICAgICAgICAgICBpdGVtcz17Q1VTVE9NRVJTfVxuICAgICAgICAgICAgICBuYXZpZ2F0ZT17bmF2aWdhdGV9XG4gICAgICAgICAgICAgIG1ldGE9XCJSZXZpZXcgY3VzdG9tZXJzIGFuZCBpbmNvbWluZyBtZXNzYWdlc1wiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8U2hvcnRjdXRMaXN0XG4gICAgICAgICAgICAgIHRpdGxlPVwiT3JkZXJzXCJcbiAgICAgICAgICAgICAgaXRlbXM9e09SREVSU31cbiAgICAgICAgICAgICAgbmF2aWdhdGU9e25hdmlnYXRlfVxuICAgICAgICAgICAgICBtZXRhPVwiUmV2aWV3IG9yZGVycyBhbmQgaW52b2ljZXNcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPFNob3J0Y3V0TGlzdFxuICAgICAgICAgICAgICB0aXRsZT1cIkNvbGxlY3Rpb25zXCJcbiAgICAgICAgICAgICAgaXRlbXM9e0NPTExFQ1RJT05TfVxuICAgICAgICAgICAgICBuYXZpZ2F0ZT17bmF2aWdhdGV9XG4gICAgICAgICAgICAgIG1ldGE9XCJNYW5hZ2UgcmVwZWF0YWJsZSBjb250ZW50XCJcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxNZXNzYWdlc0NhcmRcbiAgICAgICAgICAgICAgc3VibWlzc2lvbnM9e3N1Ym1pc3Npb25zfVxuICAgICAgICAgICAgICBzZWxlY3RlZFN1Ym1pc3Npb249e3NlbGVjdGVkU3VibWlzc2lvbn1cbiAgICAgICAgICAgICAgb25PcGVuPXtoYW5kbGVPcGVuU3VibWlzc2lvbn1cbiAgICAgICAgICAgICAgb25EZWxldGU9e2hhbmRsZURlbGV0ZVN1Ym1pc3Npb259XG4gICAgICAgICAgICAgIGRlbGV0aW5nSWQ9e2RlbGV0aW5nSWR9XG4gICAgICAgICAgICAgIG9wZXJhdGlvbkVycm9yPXtvcGVyYXRpb25FcnJvcn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24sIHVzZU5hdmlnYXRlLCB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgTG9hZGVyLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcblxuY29uc3QgTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4gPSAvKGRlc2NyaXB0aW9ufGNvbnRlbnR8bWVzc2FnZXxib2R5fHN1YnRpdGxlfGV4Y2VycHR8aW50cm98aG91cnN8YWRkcmVzc3x0ZXh0fHBhcmFncmFwaHxvdmVydmlld3xjaGFsbGVuZ2V8cmVzdWx0fGFuc3dlcnxub3RlcykvaTtcbmNvbnN0IElNQUdFX0ZJRUxEX1BBVFRFUk4gPSAvKGltYWdlfGNvdmVySW1hZ2V8Y29udGVudEltYWdlcykvaTtcbmNvbnN0IEJPT0xFQU5fRklFTERfUEFUVEVSTiA9IC9eKGZlYXR1cmVkfGlzRmVhdHVyZWR8aXNQb3B1bGFyKSQvaTtcbmNvbnN0IEZVTExfV0lEVEhfRklFTERfUEFUVEVSTiA9IC8oZGVzY3JpcHRpb258Y29udGVudHxhbnN3ZXJ8ZXhjZXJwdHxjb250ZW50SW1hZ2VzfGNvdmVySW1hZ2V8aW1hZ2V8ZmVhdHVyZXN8YmFkZ2VzfHRhZ3MpJC9pO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tZWRpdG9yIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMzJweCA0MHB4IDY0cHggNDBweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG4uYWRtaW4tZWRpdG9yX19pbm5lciB7XG4gIG1heC13aWR0aDogMTI0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cbi5hZG1pbi1iYWNrIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAuODc1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XG59XG4uYWRtaW4taGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuLmFkbWluLW1ldGEge1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi10aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAyLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMi43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi1zdGF0dXMge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogMnJlbTtcbiAgcGFkZGluZzogMCAuNzVyZW07XG4gIG1hcmdpbi10b3A6IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjNmYwYzI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2VmZmZlZDtcbiAgY29sb3I6ICMyZjY4NDY7XG4gIGZvbnQtc2l6ZTogLjgxMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4ta2ViYWIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG4uYWRtaW4tdGFicyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYWVhZWY7XG59XG4uYWRtaW4tdGFiIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAwIDAgMTJweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmFkbWluLXRhYi0tYWN0aXZlIHsgY29sb3I6ICM0OTQ1ZmY7IH1cbi5hZG1pbi10YWItLWFjdGl2ZTo6YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwOyByaWdodDogMDsgYm90dG9tOiAtMXB4O1xuICBoZWlnaHQ6IDJweDtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbn1cbi5hZG1pbi1sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLDFmcikgMjMycHg7XG4gIGdhcDogMTZweDtcbiAgYWxpZ24taXRlbXM6IHN0YXJ0O1xufVxuLmFkbWluLW1haW4tY2FyZCwuYWRtaW4tc2lkZS1jYXJkLC5hZG1pbi1saXN0LWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLDMzLDUyLC4wNik7XG59XG4uYWRtaW4tbWFpbi1jYXJkIHsgcGFkZGluZzogMjRweDsgfVxuLmFkbWluLXNpZGUtY2FyZCArIC5hZG1pbi1zaWRlLWNhcmQgeyBtYXJnaW4tdG9wOiAxMnB4OyB9XG4uYWRtaW4tc2lkZS1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLXNpZGUtY2FyZF9fYm9keSB7IHBhZGRpbmc6IDAgMTJweCAxMnB4OyB9XG4uYWRtaW4tc2lkZS1ub3RlIHtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbi1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uYWRtaW4tc2lkZS1idXR0b24sLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IC44MTI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uOmRpc2FibGVkLFxuLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnk6ZGlzYWJsZWQsXG4uYWRtaW4tcHJpbWFyeTpkaXNhYmxlZCxcbi5hZG1pbi1zZWNvbmRhcnk6ZGlzYWJsZWQge1xuICBib3JkZXItY29sb3I6ICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogY2FsYygxMDAlICsgOHB4KTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAyMjBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDEycHggMzJweCByZ2JhKDMzLDMzLDUyLC4xMik7XG4gIHBhZGRpbmc6IDhweCAwO1xuICB6LWluZGV4OiA0MDtcbn1cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXIge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2ljb24ge1xuICB3aWR0aDogMThweDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbi0tbWVudSB7XG4gIHdpZHRoOiAycmVtO1xuICBmbGV4OiAwIDAgMnJlbTtcbn1cbi5hZG1pbi1zZWN0aW9uICsgLmFkbWluLXNlY3Rpb24geyBtYXJnaW4tdG9wOiAyMHB4OyB9XG4uYWRtaW4tZmllbGQtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsbWlubWF4KDAsMWZyKSk7XG4gIGdhcDogMjBweCAyNHB4O1xufVxuLmFkbWluLWZpZWxkLS1mdWxsIHsgZ3JpZC1jb2x1bW46IDEgLyAtMTsgfVxuLmFkbWluLXByb2ZpbGUtY2FyZCB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDZweCA2cHggMDtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX2hlYWQge1xuICBwYWRkaW5nOiAwIDAgMTJweDtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX2lkZW50aXR5IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBtaW4td2lkdGg6IDA7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19hdmF0YXIge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiA1MnB4O1xuICBoZWlnaHQ6IDUycHg7XG4gIGZsZXg6IDAgMCA1MnB4O1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNDk0NWZmIDAlLCAjN2I3OWZmIDEwMCUpO1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgZm9udC1zaXplOiAuOTVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogMC4wOGVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9faGVhZC1jb3B5IHtcbiAgbWluLXdpZHRoOiAwO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fdGl0bGUtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19leWVicm93IHtcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBjb2xvcjogIzdjN2M5ODtcbiAgZm9udC1zaXplOiAuNzJyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogLjEyZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX190aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMS40NXJlbSwgMi4ydncsIDJyZW0pO1xuICBsaW5lLWhlaWdodDogMS4wMjtcbiAgbGV0dGVyLXNwYWNpbmc6IC0uMDRlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX2JvZHkge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW5tYXgoMCwgMWZyKSk7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiAwIDAgNnB4O1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fYm9keS0tY3VzdG9tZXIge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCBtaW5tYXgoMCwgMWZyKSk7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19yb3cge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMTBweCAxMnB4IDZweDtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX2l0ZW0ge1xuICBtaW4td2lkdGg6IDA7XG4gIHBhZGRpbmc6IDEwcHggMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgyKTtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX2l0ZW0tLWZ1bGwge1xuICBncmlkLWNvbHVtbjogMSAvIC0xO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fbGFiZWwge1xuICBjb2xvcjogIzdjN2M5ODtcbiAgZm9udC1zaXplOiAuNzJyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogLjEyZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX192YWx1ZSB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNDU7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX192YWx1ZS0tbXV0ZWQge1xuICBjb2xvcjogIzhlOGVhOTtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlLS1tb25vIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IC4yNHJlbSAuNjJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDczLCA2OSwgMjU1LCAwLjA4KTtcbiAgY29sb3I6ICM0YjQ3YmU7XG4gIGZvbnQtZmFtaWx5OiB1aS1tb25vc3BhY2UsIFNGTW9uby1SZWd1bGFyLCBNZW5sbywgTW9uYWNvLCBDb25zb2xhcywgXCJMaWJlcmF0aW9uIE1vbm9cIiwgbW9ub3NwYWNlO1xuICBmb250LXNpemU6IC44MnJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMXJlbTtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlLS1tdWx0aWxpbmUge1xuICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX190ZXh0Ym94IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIHBhZGRpbmc6IC44NzVyZW0gMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIGxpbmUtaGVpZ2h0OiAxLjU1O1xuICByZXNpemU6IG5vbmU7XG59XG4uYWRtaW4tcmVwbHktcGFuZWwge1xuICBtYXgtd2lkdGg6IDY2MHB4O1xuICBtYXJnaW4tdG9wOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWFlYWVmO1xuICBwYWRkaW5nOiAxOHB4IDIwcHg7XG59XG4uYWRtaW4tcmVwbHktcGFuZWxfX3RpdGxlIHtcbiAgbWFyZ2luOiAwIDAgNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS40O1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmFkbWluLXJlcGx5LXBhbmVsX19ub3RlIHtcbiAgbWFyZ2luOiAwIDAgMTRweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cbi5hZG1pbi1yZXBseS1wYW5lbF9faGlzdG9yeSB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cbi5hZG1pbi1yZXBseS1wYW5lbF9faXRlbSB7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cbi5hZG1pbi1yZXBseS1wYW5lbF9fbWV0YSB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43OHJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMztcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuLmFkbWluLXJlcGx5LXBhbmVsX19zdWJqZWN0IHtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogLjk1cmVtO1xuICBsaW5lLWhlaWdodDogMS40O1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmFkbWluLXJlcGx5LXBhbmVsX19ib2R5IHtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuOXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xufVxuLmFkbWluLXJlcGx5LXBhbmVsX19mb3JtIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiAxMnB4O1xufVxuLmFkbWluLXJlcGx5LXBhbmVsX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cbi5hZG1pbi1sYWJlbCB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDJweDtcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4tbGFiZWxfX3JlcXVpcmVkIHsgY29sb3I6ICNkMDJiMjA7IH1cbi5hZG1pbi1pbnB1dCwuYWRtaW4tdGV4dGFyZWEsLmFkbWluLXNlYXJjaC1pbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAuNjI1cmVtIC44NzVyZW07XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIG91dGxpbmU6IG5vbmU7XG59XG4uYWRtaW4taW5wdXQgeyBtaW4taGVpZ2h0OiAyLjVyZW07IH1cbi5hZG1pbi10ZXh0YXJlYSB7IG1pbi1oZWlnaHQ6IDUuNzVyZW07IHJlc2l6ZTogdmVydGljYWw7IH1cbi5hZG1pbi1pbnB1dDpmb2N1cywuYWRtaW4tdGV4dGFyZWE6Zm9jdXMsLmFkbWluLXNlYXJjaC1pbnB1dDpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogIzQ5NDVmZjtcbiAgYm94LXNoYWRvdzogMCAwIDAgMXB4ICM0OTQ1ZmY7XG59XG4uYWRtaW4taW5wdXQ6ZGlzYWJsZWQsXG4uYWRtaW4tdGV4dGFyZWE6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2hlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDEycHggMTZweCAxMHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmNTtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX190aXRsZSB7IGZvbnQtc2l6ZTogLjc1cmVtOyBmb250LXdlaWdodDogNjAwOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fY291bnQgeyBjb2xvcjogIzhlOGVhOTsgZm9udC1zaXplOiAuNzVyZW07IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtICsgLmFkbWluLXJlcGVhdGFibGVfX2l0ZW0geyBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmNTsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2l0ZW0tLWRyYWctb3ZlciBzdW1tYXJ5IHsgYmFja2dyb3VuZDogI2YwZjBmZjsgfVxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnkge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeTo6LXdlYmtpdC1kZXRhaWxzLW1hcmtlciB7IGRpc3BsYXk6IG5vbmU7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fYnVsbGV0IHtcbiAgd2lkdGg6IDIwcHg7IGhlaWdodDogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjU7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogLjYyNXJlbTtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19uYW1lIHsgZm9udC1zaXplOiAuODc1cmVtOyBmb250LXdlaWdodDogNjAwOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTBweDtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b24ge1xuICBib3JkZXI6IDA7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBjb2xvcjogaW5oZXJpdDsgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlIHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogZ3JhYjtcbiAgcGFkZGluZzogMCAycHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGU6YWN0aXZlIHsgY3Vyc29yOiBncmFiYmluZzsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmRpc2FibGVkIHtcbiAgY29sb3I6ICNjNGM0ZDI7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkOmRpc2FibGVkIHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fYm9keSB7IHBhZGRpbmc6IDE2cHg7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmNTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faW1hZ2UtcHJldmlldyB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faW1hZ2UtcHJldmlldyAuYWRtaW4tbWVkaWFfX3RodW1iIHtcbiAgbWF4LXdpZHRoOiAyODBweDtcbiAgbWF4LWhlaWdodDogMTgwcHg7XG59XG4uYWRtaW4tdG9nZ2xlIHtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IC42MjVyZW0gLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuLmFkbWluLWZpZWxkLS1ib29sZWFuIC5hZG1pbi10b2dnbGUge1xuICB3aWR0aDogYXV0bztcbiAgbWluLXdpZHRoOiAxODBweDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBnYXA6IDEwcHg7XG59XG4uYWRtaW4tdG9nZ2xlOmhhcyhpbnB1dDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4Nztcbn1cbi5hZG1pbi1tZWRpYSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgcGFkZGluZzogMTZweDtcbn1cbi5hZG1pbi1tZWRpYV9fY2FudmFzIHtcbiAgbWluLWhlaWdodDogMTQwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZhZmFmYjtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG4uYWRtaW4tbWVkaWFfX3N0YWNrIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG4uYWRtaW4tbWVkaWFfX3RodW1iIHtcbiAgbWF4LXdpZHRoOiAyNDBweDtcbiAgbWF4LWhlaWdodDogMTQwcHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xufVxuLmFkbWluLW1lZGlhX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA0cHg7XG59XG4uYWRtaW4tbWVkaWFfX2FjdGlvbiB7XG4gIHdpZHRoOiAycmVtOyBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cbi5hZG1pbi1tZWRpYV9fYWN0aW9uOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tbWVkaWFfX2ZpbGVuYW1lIHsgY29sb3I6ICM2NjY2ODc7IGZvbnQtc2l6ZTogLjc1cmVtOyB9XG4uYWRtaW4tbWVkaWFfX3NvdXJjZSB7IG1hcmdpbi10b3A6IDEwcHg7IH1cbi5hZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuLmFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uIHtcbiAgbWluLWhlaWdodDogMnJlbTtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLW1lZGlhX19lcnJvciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xufVxuLmFkbWluLWxpc3QtdG9vbGJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxNnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuLmFkbWluLWxpc3QtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTJweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5hZG1pbi1zZWFyY2gtd3JhcCB7IHdpZHRoOiAyODBweDsgfVxuLmFkbWluLWxpc3QtbWV0YSB7XG4gIG1hcmdpbjogMTJweCAwIDMycHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cbi5hZG1pbi10b29sYmFyLWNsdXN0ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5hZG1pbi10b29sYmFyLWJ1dHRvbiB7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgcGFkZGluZzogMCAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tdG9vbGJhci1idXR0b24tLWljb24ge1xuICB3aWR0aDogMi41cmVtO1xuICBwYWRkaW5nOiAwO1xufVxuLmFkbWluLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUge1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuLmFkbWluLXRvb2xiYXItc2VhcmNoIHtcbiAgd2lkdGg6IDI4MHB4O1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMCAwLjg3NXJlbTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogY2FsYygxMDAlICsgOHB4KTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAzMjBweDtcbiAgbWF4LWhlaWdodDogNDIwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsMzMsNTIsLjEyKTtcbiAgcGFkZGluZzogMTZweDtcbiAgei1pbmRleDogMjA7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX3Jlc2V0IHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX2dyb3VwICsgLmFkbWluLWxpc3QtcG9wb3Zlcl9fZ3JvdXAge1xuICBtYXJnaW4tdG9wOiAxNnB4O1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19jaGVjayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogOHB4IDA7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19jaGVjayBpbnB1dCB7XG4gIHdpZHRoOiAxLjI1cmVtO1xuICBoZWlnaHQ6IDEuMjVyZW07XG59XG4uYWRtaW4tbGlzdC1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTZweCAyMHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmNTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuLmFkbWluLWxpc3QtdGFibGUge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHRoIHtcbiAgcGFkZGluZzogMTBweCAxNnB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uYWRtaW4tbGlzdC10YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51LWNlbGwge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA0NHB4O1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnUtdHJpZ2dlciB7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBmb250LXNpemU6IDEuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tbGlzdC1yb3ctbWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgLSA2cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDIyMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsMzMsNTIsLjEyKTtcbiAgcGFkZGluZzogOHB4IDA7XG4gIHotaW5kZXg6IDI0O1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW0tLWRhbmdlciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnVfX2ljb24ge1xuICB3aWR0aDogMThweDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHRoIGJ1dHRvbiB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDA7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBmb250OiBpbmhlcml0O1xuICB0ZXh0LXRyYW5zZm9ybTogaW5oZXJpdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLWxpc3QtdGFibGUgdHIgeyBjdXJzb3I6IHBvaW50ZXI7IH1cbi5hZG1pbi1saXN0LXRhYmxlIHRyOmhvdmVyIHsgYmFja2dyb3VuZDogI2ZhZmFmYjsgfVxuLmFkbWluLWxpc3Qtc3RhdHVzIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDEuNzVyZW07XG4gIHBhZGRpbmc6IDAgLjYyNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6ICNlZmZmZWQ7XG4gIGNvbG9yOiAjMmY2ODQ2O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbi5hZG1pbi1saXN0LXN0YXR1cy0tbWFudWFsIHtcbiAgYmFja2dyb3VuZDogcmdiYSg3MywgNjksIDI1NSwgMC4xMik7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuLmFkbWluLXByaW1hcnkge1xuICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xuICBwYWRkaW5nOiAwIC44NzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0OTQ1ZmY7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjZmZmO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogLjgxMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1zZWNvbmRhcnkge1xuICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xuICBwYWRkaW5nOiAwIC44NzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogLjgxMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1saXN0LWJvb2xlYW4ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxcmVtO1xuICBoZWlnaHQ6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBmb250LXNpemU6IDAuNjI1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmFkbWluLWxpc3QtYm9vbGVhbi0teWVzIHtcbiAgYmFja2dyb3VuZDogIzJmNjg0NjtcbiAgY29sb3I6ICNmZmY7XG59XG4uYWRtaW4tbGlzdC1ib29sZWFuLS1ubyB7XG4gIGJhY2tncm91bmQ6ICNkMDJiMjA7XG4gIGNvbG9yOiAjZmZmO1xufVxuQG1lZGlhIChtYXgtd2lkdGg6IDExODBweCkge1xuICAuYWRtaW4tbGF5b3V0IHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAuYWRtaW4tZWRpdG9yIHsgcGFkZGluZzogMjBweCAxNnB4IDQ4cHg7IH1cbiAgLmFkbWluLWZpZWxkLWdyaWQgeyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjsgfVxuICAuYWRtaW4tcHJvZmlsZS1jYXJkIHtcbiAgICBwYWRkaW5nOiA0cHggNHB4IDA7XG4gICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgfVxuICAuYWRtaW4tcHJvZmlsZS1jYXJkX19oZWFkIHsgcGFkZGluZy1ib3R0b206IDEwcHg7IH1cbiAgLmFkbWluLXByb2ZpbGUtY2FyZF9faWRlbnRpdHkgeyBhbGlnbi1pdGVtczogZmxleC1zdGFydDsgfVxuICAuYWRtaW4tcHJvZmlsZS1jYXJkX19hdmF0YXIge1xuICAgIHdpZHRoOiA0OHB4O1xuICAgIGhlaWdodDogNDhweDtcbiAgICBmbGV4LWJhc2lzOiA0OHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gICAgZm9udC1zaXplOiAuOXJlbTtcbiAgfVxuICAuYWRtaW4tcHJvZmlsZS1jYXJkX19ib2R5LFxuICAuYWRtaW4tcHJvZmlsZS1jYXJkX19ib2R5LS1jdXN0b21lciB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyBnYXA6IDEwcHg7IH1cbiAgLmFkbWluLWxpc3QtdG9vbGJhciB7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBzdHJldGNoOyB9XG4gIC5hZG1pbi1zZWFyY2gtd3JhcCB7IHdpZHRoOiAxMDAlOyB9XG59XG5gO1xuXG5mdW5jdGlvbiB0b0xhYmVsKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVcbiAgICAucmVwbGFjZSgvKFthLXowLTldKShbQS1aXSkvZywgJyQxICQyJylcbiAgICAucmVwbGFjZSgvW18tXSsvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXGJmYXFcXGIvZ2ksICdGQVEnKVxuICAgIC5yZXBsYWNlKC9eLi8sICh2KSA9PiB2LnRvVXBwZXJDYXNlKCkpO1xufVxuXG5mdW5jdGlvbiBjbG9uZVZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG59XG5cbmZ1bmN0aW9uIGdldEVtcHR5SXRlbShzYW1wbGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2FtcGxlKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmIChzYW1wbGUgJiYgdHlwZW9mIHNhbXBsZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgT2JqZWN0LmtleXMoc2FtcGxlKVxuICAgICAgICAubWFwKChrZXkpID0+IHtcbiAgICAgICAgICBpZiAoWydpZCcsICdkb2N1bWVudElkJywgJ3N0YXR1cycsICd1cGRhdGVkQXQnLCAncHVibGlzaGVkQXQnXS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gW2tleSwgc2FtcGxlW2tleV0gPz8gbnVsbF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIFtrZXksIGdldEVtcHR5SXRlbShzYW1wbGVba2V5XSldO1xuICAgICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzYW1wbGUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2FtcGxlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKChpdGVtKSA9PiB0b0NvbXBhcmFibGVWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSlcbiAgICAgIC5zb3J0KClcbiAgICAgIC5maWx0ZXIoKGtleSkgPT4gIVsndXBkYXRlZEF0JywgJ3B1Ymxpc2hlZEF0JywgJ3N0YXR1cyddLmluY2x1ZGVzKGtleSkpXG4gICAgICAucmVkdWNlKChhY2N1bXVsYXRvciwga2V5KSA9PiB7XG4gICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZVtrZXldKTtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBoYXNNZWFuaW5nZnVsVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNvbWUoKGl0ZW0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh2YWx1ZSlcbiAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiAhWydpZCcsICdkb2N1bWVudElkJywgJ3VwZGF0ZWRBdCcsICdwdWJsaXNoZWRBdCcsICdzdGF0dXMnXS5pbmNsdWRlcyhrZXkpKVxuICAgICAgLnNvbWUoKFssIG5lc3RlZFZhbHVlXSkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKG5lc3RlZFZhbHVlKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlICE9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWRtaW5QYXRoKHBhdGhuYW1lLCBwYXJhbXMpIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIE9iamVjdC5lbnRyaWVzKHBhcmFtcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICBzZWFyY2hQYXJhbXMuc2V0KGtleSwgU3RyaW5nKHZhbHVlKSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBxdWVyeVN0cmluZyA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxdWVyeVN0cmluZyA/IGA/JHtxdWVyeVN0cmluZ31gIDogJyd9YDtcbn1cblxuZnVuY3Rpb24gcGFyc2VEaXNwbGF5ZWRGaWVsZHModmFsdWUpIHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSA/PyAnJylcbiAgICAuc3BsaXQoJywnKVxuICAgIC5tYXAoKGZpZWxkKSA9PiBmaWVsZC50cmltKCkpXG4gICAgLmZpbHRlcihCb29sZWFuKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VJbnB1dFZhbHVlKG5leHRSYXdWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIGlmIChuZXh0UmF3VmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRSYXdWYWx1ZSk7XG4gICAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQpID8gY3VycmVudFZhbHVlIDogcGFyc2VkO1xuICB9XG4gIHJldHVybiBuZXh0UmF3VmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cblxuICBpZiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gU3RyaW5nKGl0ZW0udGV4dCA/PyAnJyk7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIGdldE1lZGlhRGlzcGxheU5hbWUodmFsdWUsIGZhbGxiYWNrID0gJ1VwbG9hZGVkIGltYWdlJykge1xuICBjb25zdCByYXcgPSBTdHJpbmcodmFsdWUgPz8gJycpLnRyaW0oKTtcblxuICBpZiAoIXJhdykge1xuICAgIHJldHVybiBmYWxsYmFjaztcbiAgfVxuXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSByYXcuc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICBjb25zdCBwYXJ0cyA9IG5vcm1hbGl6ZWQuc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbik7XG4gIHJldHVybiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSB8fCBmYWxsYmFjaztcbn1cblxuZnVuY3Rpb24gd2l0aFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSwgbmV4dFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV4dFZhbHVlO1xuICB9XG5cbiAgaWYgKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLml0ZW0sXG4gICAgICB0ZXh0OiBuZXh0VmFsdWUsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7IHRleHQ6IG5leHRWYWx1ZSB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTWVkaWFQcmV2aWV3VXJsKHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XG5cbiAgaWYgKCFub3JtYWxpemVkKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKC9eaHR0cHM/OlxcL1xcLy9pLnRlc3Qobm9ybWFsaXplZCkpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbiAgfVxuXG4gIGlmIChub3JtYWxpemVkLnN0YXJ0c1dpdGgoJy8vJykpIHtcbiAgICByZXR1cm4gYGh0dHBzOiR7bm9ybWFsaXplZH1gO1xuICB9XG5cbiAgaWYgKG5vcm1hbGl6ZWQuc3RhcnRzV2l0aCgnL3VwbG9hZHMvJykgfHwgbm9ybWFsaXplZC5zdGFydHNXaXRoKCcvYWRtaW4tYXNzZXRzLycpKSB7XG4gICAgcmV0dXJuIGBodHRwOi8vbG9jYWxob3N0OjMwMDEke25vcm1hbGl6ZWR9YDtcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVkO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdFBhdGgodmFsdWUsIHBhdGgsIG5leHRWYWx1ZSkge1xuICBpZiAoIXBhdGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5leHRWYWx1ZTtcbiAgfVxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSB1cGRhdGVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgbmV4dFZhbHVlKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBdFBhdGgodmFsdWUsIHBhdGgpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUuZmlsdGVyKChfLCBpbmRleCkgPT4gaW5kZXggIT09IHBhdGhbMF0pIDogdmFsdWU7XG4gIH1cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gcmVtb3ZlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEF0UGF0aCh2YWx1ZSwgcGF0aCwgbmV4dEl0ZW0pIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBbLi4uKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSksIG5leHRJdGVtXTtcbiAgfVxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSBhcHBlbmRBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgbmV4dEl0ZW0pO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIG1vdmVBdFBhdGgodmFsdWUsIHBhdGgsIG9mZnNldCkge1xuICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSBwYXRoWzBdO1xuICAgIGNvbnN0IG5leHRJbmRleCA9IGluZGV4ICsgb2Zmc2V0O1xuXG4gICAgaWYgKG5leHRJbmRleCA8IDAgfHwgbmV4dEluZGV4ID49IHZhbHVlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNsb25lID0gWy4uLnZhbHVlXTtcbiAgICBjb25zdCBbbW92ZWRdID0gY2xvbmUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBjbG9uZS5zcGxpY2UobmV4dEluZGV4LCAwLCBtb3ZlZCk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gbW92ZUF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0LCBvZmZzZXQpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlUaXRsZShkZWZpbml0aW9uLCByZWNvcmQpIHtcbiAgaWYgKCFyZWNvcmQpIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvbi5sYWJlbDtcbiAgfVxuICByZXR1cm4gcmVjb3JkW2RlZmluaXRpb24udGl0bGVGaWVsZF0gfHwgZGVmaW5pdGlvbi5sYWJlbDtcbn1cblxuZnVuY3Rpb24gZm9ybWF0TW9uZXlWYWx1ZSh2YWx1ZSwgY3VycmVuY3kpIHtcbiAgY29uc3QgYW1vdW50ID0gTnVtYmVyKHZhbHVlID8/IDApO1xuICBjb25zdCBzYWZlQ3VycmVuY3kgPSBTdHJpbmcoY3VycmVuY3kgfHwgJ0dCUCcpLnRvVXBwZXJDYXNlKCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1HQicsIHtcbiAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgICAgY3VycmVuY3k6IHNhZmVDdXJyZW5jeSxcbiAgICB9KS5mb3JtYXQoYW1vdW50IC8gMTAwKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGAke3NhZmVDdXJyZW5jeX0gJHsoYW1vdW50IC8gMTAwKS50b0ZpeGVkKDIpfWA7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0UHJvZmlsZURpc3BsYXlWYWx1ZShkZWZpbml0aW9uLCBmaWVsZCwgcmF3VmFsdWUsIHJlY29yZCkge1xuICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSB0eXBlb2YgcmF3VmFsdWUgPT09ICdzdHJpbmcnID8gcmF3VmFsdWUudHJpbSgpIDogcmF3VmFsdWU7XG5cbiAgaWYgKG5vcm1hbGl6ZWRWYWx1ZSA9PT0gJycgfHwgbm9ybWFsaXplZFZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gJ05vdCBzZXQnO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbj8ubW9uZXlGaWVsZHMpICYmIGRlZmluaXRpb24ubW9uZXlGaWVsZHMuaW5jbHVkZXMoZmllbGQpKSB7XG4gICAgcmV0dXJuIGZvcm1hdE1vbmV5VmFsdWUocmF3VmFsdWUsIHJlY29yZD8uY3VycmVuY3kpO1xuICB9XG5cbiAgaWYgKFxuICAgIHR5cGVvZiByYXdWYWx1ZSA9PT0gJ3N0cmluZydcbiAgICAmJiAvXihzdGF0dXN8LipTdGF0dXN8Ym9va2luZ1R5cGV8cmVzb3VyY2VUeXBlfGFjY2Vzc1N0YXR1cykkL2kudGVzdChmaWVsZClcbiAgKSB7XG4gICAgcmV0dXJuIHJhd1ZhbHVlXG4gICAgICAucmVwbGFjZSgvW18tXSsvZywgJyAnKVxuICAgICAgLnJlcGxhY2UoL1xcYlxcdy9nLCAobGV0dGVyKSA9PiBsZXR0ZXIudG9VcHBlckNhc2UoKSk7XG4gIH1cblxuICByZXR1cm4gU3RyaW5nKHJhd1ZhbHVlKTtcbn1cblxuZnVuY3Rpb24gaXNCbG9nRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZCkge1xuICByZXR1cm4gZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ2Jsb2ctcG9zdHMnICYmIGZpZWxkID09PSAnZmVhdHVyZWQnO1xufVxuXG5mdW5jdGlvbiBpc0ZhcURpc2FibGVkRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpIHtcbiAgcmV0dXJuIGRlZmluaXRpb24/Lm5hbWUgPT09ICdmYXEtaXRlbXMnICYmIGZpZWxkID09PSAnaXNGZWF0dXJlZCc7XG59XG5cbmZ1bmN0aW9uIGlzTWVldGluZ1Jvb21EaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIHJldHVybiBkZWZpbml0aW9uPy5uYW1lID09PSAnbWVldGluZy1yb29tcycgJiYgZmllbGQgPT09ICdpc0ZlYXR1cmVkJztcbn1cblxuZnVuY3Rpb24gaXNWaXNpYmlsaXR5VG9nZ2xlRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpIHtcbiAgcmV0dXJuIGlzQmxvZ0Rpc2FibGVkRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpXG4gICAgfHwgaXNGYXFEaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKVxuICAgIHx8IGlzTWVldGluZ1Jvb21EaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmllbGREaXNwbGF5TGFiZWwoZGVmaW5pdGlvbiwgZmllbGQpIHtcbiAgaWYgKGlzVmlzaWJpbGl0eVRvZ2dsZUZpZWxkKGRlZmluaXRpb24sIGZpZWxkKSkge1xuICAgIHJldHVybiAnVmlzaWJpbGl0eSc7XG4gIH1cblxuICByZXR1cm4gdG9MYWJlbChmaWVsZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RQYWdlKHBhZ2VOYW1lLCBvcHRpb25zID0ge30pIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhvcHRpb25zLnF1ZXJ5ID8/IHt9KTtcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgL2FkbWluL2FwaS9wYWdlcy8ke3BhZ2VOYW1lfSR7cXVlcnlTdHJpbmcgPyBgPyR7cXVlcnlTdHJpbmd9YCA6ICcnfWAsXG4gICAge1xuICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCA/PyAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogb3B0aW9ucy5ib2R5ID8gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5ib2R5KSA6IHVuZGVmaW5lZCxcbiAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgIH0sXG4gICk7XG5cbiAgY29uc3QgcmVzcG9uc2VUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICBsZXQgcGF5bG9hZCA9IG51bGw7XG5cbiAgdHJ5IHtcbiAgICBwYXlsb2FkID0gcmVzcG9uc2VUZXh0ID8gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpIDoge307XG4gIH0gY2F0Y2gge1xuICAgIHBheWxvYWQgPSBudWxsO1xuICB9XG5cbiAgaWYgKCFyZXNwb25zZS5vayB8fCAhcGF5bG9hZCkge1xuICAgIGNvbnN0IHRyaW1tZWRUZXh0ID0gcmVzcG9uc2VUZXh0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGlzSHRtbCA9IHRyaW1tZWRUZXh0LnN0YXJ0c1dpdGgoJzwhZG9jdHlwZScpIHx8IHRyaW1tZWRUZXh0LnN0YXJ0c1dpdGgoJzxodG1sJyk7XG4gICAgY29uc3QgcmVkaXJlY3RlZFRvTG9naW4gPSByZXNwb25zZS5yZWRpcmVjdGVkICYmIHJlc3BvbnNlLnVybC5pbmNsdWRlcygnL2FkbWluL2xvZ2luJyk7XG4gICAgY29uc3QgaXNBdXRoRXJyb3IgPSByZXNwb25zZS5zdGF0dXMgPT09IDQwMSB8fCByZXNwb25zZS5zdGF0dXMgPT09IDQwMyB8fCByZWRpcmVjdGVkVG9Mb2dpbjtcblxuICAgIGlmIChpc0F1dGhFcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3VyIGFkbWluIHNlc3Npb24gZXhwaXJlZC4gUmVmcmVzaCBhbmQgc2lnbiBpbiBhZ2Fpbi4nKTtcbiAgICB9XG5cbiAgICBpZiAocGF5bG9hZD8ubWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaWYgKHBheWxvYWQ/LmVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvcik7XG4gICAgfVxuXG4gICAgaWYgKGlzSHRtbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgcmV0dXJuZWQgYW4gSFRNTCBlcnJvciBwYWdlICgke3Jlc3BvbnNlLnN0YXR1cyB8fCAndW5rbm93bid9KS4gQ2hlY2sgYmFja2VuZCBsb2dzLmApO1xuICAgIH1cblxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWVzdCBmYWlsZWQgKCR7cmVzcG9uc2Uuc3RhdHVzfSkuYCk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1ZXN0IGZhaWxlZC4nKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGxvYWRBZG1pbkltYWdlKGZpbGUpIHtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FkbWluL2FwaS9tZWRpYS91cGxvYWQnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogZm9ybURhdGEsXG4gICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gIH0pO1xuXG4gIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLmVycm9yIHx8ICdGYWlsZWQgdG8gdXBsb2FkIGltYWdlLicpO1xuICB9XG5cbiAgY29uc3QgdXBsb2FkZWRVcmwgPSBwYXlsb2FkPy51cmwgfHwgcGF5bG9hZD8uaXRlbT8ucmVsYXRpdmVVcmwgfHwgcGF5bG9hZD8uaXRlbT8udXJsO1xuXG4gIGlmICghdXBsb2FkZWRVcmwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwbG9hZCBzdWNjZWVkZWQgYnV0IHJldHVybmVkIG5vIFVSTC4nKTtcbiAgfVxuXG4gIHJldHVybiB1cGxvYWRlZFVybDtcbn1cblxuY29uc3QgTUVESUFfUElDS0VSX0VWRU5UID0gJ2FkbWluanMtbWVkaWEtc2VsZWN0JztcblxuZnVuY3Rpb24gY2hvb3NlQWRtaW5MaWJyYXJ5SW1hZ2UoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXNvbHZlKCcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwaWNrZXJXaW5kb3cgPSB3aW5kb3cub3BlbihcbiAgICAgICcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeT9waWNrZXI9MScsXG4gICAgICAnYWRtaW4tbWVkaWEtbGlicmFyeS1waWNrZXInLFxuICAgICAgJ3BvcHVwPXllcyx3aWR0aD0xNDQwLGhlaWdodD05MDAscmVzaXphYmxlPXllcyxzY3JvbGxiYXJzPXllcycsXG4gICAgKTtcblxuICAgIGlmICghcGlja2VyV2luZG93KSB7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdNZWRpYSBsaWJyYXJ5IHBvcHVwIHdhcyBibG9ja2VkLicpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZmluaXNoZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2UpO1xuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoY2xvc2VXYXRjaGVyKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTWVzc2FnZSA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiAhPT0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiB8fCBldmVudC5zb3VyY2UgIT09IHBpY2tlcldpbmRvdykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5kYXRhPy50eXBlICE9PSBNRURJQV9QSUNLRVJfRVZFTlQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICBjbGVhbnVwKCk7XG4gICAgICByZXNvbHZlKHR5cGVvZiBldmVudC5kYXRhLnVybCA9PT0gJ3N0cmluZycgPyBldmVudC5kYXRhLnVybCA6ICcnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xvc2VXYXRjaGVyID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChwaWNrZXJXaW5kb3cuY2xvc2VkICYmICFmaW5pc2hlZCkge1xuICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIHJlc29sdmUoJycpO1xuICAgICAgfVxuICAgIH0sIDUwMCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2UpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gTWVkaWFGaWVsZCh7IGxhYmVsLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgdXJscyA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdLmZpbHRlcihCb29sZWFuKTtcbiAgY29uc3QgZmlsZUlucHV0UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbdXBsb2FkaW5nLCBzZXRVcGxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdXBsb2FkRXJyb3IsIHNldFVwbG9hZEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGxcIj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19jYW52YXNcIj5cbiAgICAgICAgICB7dXJscy5sZW5ndGggPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zdGFja1wiPlxuICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX190aHVtYlwiIHNyYz17dXJsc1swXX0gYWx0PXtsYWJlbH0gLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3Blbih1cmxzWzBdLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX0+4oaXPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uXCIgdHlwZT1cImJ1dHRvblwiIGRpc2FibGVkPXtkaXNhYmxlZH0gb25DbGljaz17KCkgPT4gb25DaGFuZ2UocGF0aCwgQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbXSA6ICcnKX0+4pyVPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19maWxlbmFtZVwiPntnZXRNZWRpYURpc3BsYXlOYW1lKHVybHNbMF0pfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXY+Tm8gbWVkaWEgc2VsZWN0ZWQuPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZS1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCB1cGxvYWRpbmd9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dXBsb2FkaW5nID8gJ1VwbG9hZGluZy4uLicgOiAnVXBsb2FkIGZyb20gY29tcHV0ZXInfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCB1cGxvYWRpbmd9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2FzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcignJyk7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRVcmwgPSBhd2FpdCBjaG9vc2VBZG1pbkxpYnJhcnlJbWFnZSgpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHBhdGgsIFsuLi52YWx1ZSwgc2VsZWN0ZWRVcmxdKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHBhdGgsIHNlbGVjdGVkVXJsKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBjaG9vc2UgaW1hZ2UgZnJvbSBtZWRpYSBsaWJyYXJ5LicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQ2hvb3NlIGZyb20gbWVkaWEgbGlicmFyeVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgcmVmPXtmaWxlSW5wdXRSZWZ9XG4gICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgICAgICAgIG11bHRpcGxlPXtBcnJheS5pc0FycmF5KHZhbHVlKX1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXthc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LmZpbGVzID8/IFtdKTtcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSAnJztcblxuICAgICAgICAgICAgICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyh0cnVlKTtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB1cGxvYWRlZFVybHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGxvYWRlZFVybCA9IGF3YWl0IHVwbG9hZEFkbWluSW1hZ2UoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHVwbG9hZGVkVXJscy5wdXNoKHVwbG9hZGVkVXJsKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHBhdGgsIFsuLi52YWx1ZSwgLi4udXBsb2FkZWRVcmxzXSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCB1cGxvYWRlZFVybHNbMF0gfHwgJycpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcihlcnJvcj8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt1cGxvYWRFcnJvciA/IDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2Vycm9yXCI+e3VwbG9hZEVycm9yfTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFByaW1pdGl2ZUZpZWxkKHsgZGVmaW5pdGlvbiwgZmllbGQsIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBsYWJlbCA9IGdldEZpZWxkRGlzcGxheUxhYmVsKGRlZmluaXRpb24sIGZpZWxkKTtcbiAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbj8uc2VsZWN0RmllbGRzPy5bZmllbGRdKSA/IGRlZmluaXRpb24uc2VsZWN0RmllbGRzW2ZpZWxkXSA6IG51bGw7XG4gIGNvbnN0IGlucHV0VHlwZSA9IGRlZmluaXRpb24/LmlucHV0VHlwZXM/LltmaWVsZF0gfHwgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyAnbnVtYmVyJyA6ICd0ZXh0Jyk7XG5cbiAgaWYgKElNQUdFX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkpIHtcbiAgICByZXR1cm4gPE1lZGlhRmllbGQgbGFiZWw9e2xhYmVsfSB2YWx1ZT17dmFsdWV9IHBhdGg9e3BhdGh9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPjtcbiAgfVxuXG4gIGlmIChCT09MRUFOX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkpIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkRmllbGQgPSBpc1Zpc2liaWxpdHlUb2dnbGVGaWVsZChkZWZpbml0aW9uLCBmaWVsZCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tYm9vbGVhblwiPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10b2dnbGVcIj5cbiAgICAgICAgICA8c3Bhbj57aXNEaXNhYmxlZEZpZWxkID8gJ0hpZGUgb24gd2Vic2l0ZScgOiAodmFsdWUgPyAnQWN0aXZlJyA6ICdEaXNhYmxlZCcpfTwvc3Bhbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17Qm9vbGVhbih2YWx1ZSl9IGRpc2FibGVkPXtkaXNhYmxlZH0gb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgZXZlbnQudGFyZ2V0LmNoZWNrZWQpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb25zdCBjbGFzc05hbWUgPSBGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkgPyAnYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGwnIDogJ2FkbWluLWZpZWxkJztcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgICAge2ZpZWxkICE9PSAnc29ydE9yZGVyJyAmJiAhQk9PTEVBTl9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgPC9sYWJlbD5cbiAgICAgIHtzZWxlY3RPcHRpb25zID8gKFxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4taW5wdXRcIlxuICAgICAgICAgIHZhbHVlPXt2YWx1ZSA/PyAnJ31cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgcGFyc2VJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSwgdmFsdWUpKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtzZWxlY3RPcHRpb25zLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnZhbHVlfSB2YWx1ZT17b3B0aW9uLnZhbHVlfT57b3B0aW9uLmxhYmVsfTwvb3B0aW9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgICkgOiBNVUxUSUxJTkVfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSA/IChcbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tdGV4dGFyZWFcIlxuICAgICAgICAgIHZhbHVlPXt2YWx1ZSA/PyAnJ31cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgcGFyc2VJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSwgdmFsdWUpKX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICB0eXBlPXtpbnB1dFR5cGV9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlID8/ICcnfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBwYXJzZUlucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlLCB2YWx1ZSkpfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gUHJvZmlsZUluZm9DYXJkKHsgZGVmaW5pdGlvbiwgcmVjb3JkIH0pIHtcbiAgY29uc3QgaW5mb0NhcmRGaWVsZHMgPSBBcnJheS5pc0FycmF5KGRlZmluaXRpb24uaW5mb0NhcmRGaWVsZHMpID8gZGVmaW5pdGlvbi5pbmZvQ2FyZEZpZWxkcyA6IFtdO1xuICBjb25zdCBpbmZvQ2FyZEJsb2NrRmllbGRzID0gQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmluZm9DYXJkQmxvY2tGaWVsZHMpID8gZGVmaW5pdGlvbi5pbmZvQ2FyZEJsb2NrRmllbGRzIDogW107XG4gIGNvbnN0IG9wdGlvbmFsSW5mb0NhcmRGaWVsZHMgPSBuZXcgU2V0KEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5vcHRpb25hbEluZm9DYXJkRmllbGRzKSA/IGRlZmluaXRpb24ub3B0aW9uYWxJbmZvQ2FyZEZpZWxkcyA6IFtdKTtcbiAgY29uc3Qgb3B0aW9uYWxJbmZvQ2FyZEJsb2NrRmllbGRzID0gbmV3IFNldChBcnJheS5pc0FycmF5KGRlZmluaXRpb24ub3B0aW9uYWxJbmZvQ2FyZEJsb2NrRmllbGRzKSA/IGRlZmluaXRpb24ub3B0aW9uYWxJbmZvQ2FyZEJsb2NrRmllbGRzIDogW10pO1xuICBjb25zdCB0aXRsZUZpZWxkID0gZGVmaW5pdGlvbi5pbmZvQ2FyZFRpdGxlRmllbGQgfHwgZGVmaW5pdGlvbi50aXRsZUZpZWxkO1xuICBjb25zdCByYXdUaXRsZSA9IHJlY29yZD8uW3RpdGxlRmllbGRdO1xuICBjb25zdCBjYXJkVGl0bGUgPSByYXdUaXRsZSA9PSBudWxsIHx8IFN0cmluZyhyYXdUaXRsZSkudHJpbSgpID09PSAnJ1xuICAgID8gZGVmaW5pdGlvbi5sYWJlbFxuICAgIDogU3RyaW5nKHJhd1RpdGxlKTtcbiAgY29uc3QgY2FyZE1ldGFMYWJlbCA9IGRlZmluaXRpb24ubWV0YUxhYmVsIHx8IGRlZmluaXRpb24ubGFiZWwgfHwgJ1JlY29yZCc7XG4gIGNvbnN0IGNhcmRFeWVicm93ID0gY2FyZE1ldGFMYWJlbC5lbmRzV2l0aCgncycpID8gY2FyZE1ldGFMYWJlbC5zbGljZSgwLCAtMSkgOiBjYXJkTWV0YUxhYmVsO1xuICBjb25zdCB0aXRsZVRva2VucyA9IGNhcmRUaXRsZVxuICAgIC5zcGxpdCgvXFxzKy8pXG4gICAgLm1hcCgodG9rZW4pID0+IHRva2VuLnRyaW0oKSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pO1xuICBjb25zdCBhdmF0YXJMYWJlbCA9IHRpdGxlVG9rZW5zLnNsaWNlKDAsIDIpLm1hcCgodG9rZW4pID0+IHRva2VuWzBdKS5qb2luKCcnKS50b1VwcGVyQ2FzZSgpIHx8ICdJRCc7XG4gIGNvbnN0IG1hbnVhbFRhZyA9IHR5cGVvZiByZWNvcmQ/Lm1hbnVhbFRhZyA9PT0gJ3N0cmluZycgPyByZWNvcmQubWFudWFsVGFnLnRyaW0oKSA6ICcnO1xuICBjb25zdCBpc1Byb2ZpbGVTdW1tYXJ5TGF5b3V0ID0gZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ2N1c3RvbWVycydcbiAgICB8fCBkZWZpbml0aW9uPy5uYW1lID09PSAnbWVzc2FnZXMnXG4gICAgfHwgZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ29yZGVycydcbiAgICB8fCBkZWZpbml0aW9uPy5uYW1lID09PSAnaW52b2ljZXMnXG4gICAgfHwgZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ3JlZnVuZHMnO1xuICBjb25zdCBzdW1tYXJ5RmllbGRzID0gaW5mb0NhcmRGaWVsZHMuZmlsdGVyKChmaWVsZCkgPT4gZmllbGQgIT09ICdtYW51YWxUYWcnICYmICFpbmZvQ2FyZEJsb2NrRmllbGRzLmluY2x1ZGVzKGZpZWxkKSk7XG5cbiAgaWYgKCFpbmZvQ2FyZEZpZWxkcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYWRtaW4tc2VjdGlvblwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX2hlYWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9faWRlbnRpdHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcHJvZmlsZS1jYXJkX19hdmF0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57YXZhdGFyTGFiZWx9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9faGVhZC1jb3B5XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcHJvZmlsZS1jYXJkX19leWVicm93XCI+e2NhcmRFeWVicm93fTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fdGl0bGUtcm93XCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fdGl0bGVcIj57Y2FyZFRpdGxlfTwvaDI+XG4gICAgICAgICAgICAgICAge21hbnVhbFRhZyA/IDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtc3RhdHVzIGFkbWluLWxpc3Qtc3RhdHVzLS1tYW51YWxcIj57bWFudWFsVGFnfTwvc3Bhbj4gOiBudWxsfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhZG1pbi1wcm9maWxlLWNhcmRfX2JvZHkke2lzUHJvZmlsZVN1bW1hcnlMYXlvdXQgPyAnIGFkbWluLXByb2ZpbGUtY2FyZF9fYm9keS0tY3VzdG9tZXInIDogJyd9YH0+XG4gICAgICAgICAge3N1bW1hcnlGaWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBnZXRGaWVsZERpc3BsYXlMYWJlbChkZWZpbml0aW9uLCBmaWVsZCk7XG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSBmb3JtYXRQcm9maWxlRGlzcGxheVZhbHVlKGRlZmluaXRpb24sIGZpZWxkLCByZWNvcmQ/LltmaWVsZF0sIHJlY29yZCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZUNsYXNzTmFtZXMgPSBbJ2FkbWluLXByb2ZpbGUtY2FyZF9fdmFsdWUnXTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbmFsSW5mb0NhcmRGaWVsZHMuaGFzKGZpZWxkKSAmJiBkaXNwbGF5VmFsdWUgPT09ICdOb3Qgc2V0Jykge1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRpc3BsYXlWYWx1ZSA9PT0gJ05vdCBzZXQnKSB7XG4gICAgICAgICAgICAgIHZhbHVlQ2xhc3NOYW1lcy5wdXNoKCdhZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlLS1tdXRlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmllbGQgPT09ICdpZCcgfHwgZmllbGQuZW5kc1dpdGgoJ0lkJykpIHtcbiAgICAgICAgICAgICAgdmFsdWVDbGFzc05hbWVzLnB1c2goJ2FkbWluLXByb2ZpbGUtY2FyZF9fdmFsdWUtLW1vbm8nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkaXNwbGF5VmFsdWUgPT09ICdzdHJpbmcnICYmIGRpc3BsYXlWYWx1ZS5pbmNsdWRlcygnXFxuJykpIHtcbiAgICAgICAgICAgICAgdmFsdWVDbGFzc05hbWVzLnB1c2goJ2FkbWluLXByb2ZpbGUtY2FyZF9fdmFsdWUtLW11bHRpbGluZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtmaWVsZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1wcm9maWxlLWNhcmRfX2l0ZW0ke0ZVTExfV0lEVEhfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSA/ICcgYWRtaW4tcHJvZmlsZS1jYXJkX19pdGVtLS1mdWxsJyA6ICcnfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fbGFiZWxcIj57bGFiZWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3ZhbHVlQ2xhc3NOYW1lcy5qb2luKCcgJyl9PntkaXNwbGF5VmFsdWV9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtpbmZvQ2FyZEJsb2NrRmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSBmb3JtYXRQcm9maWxlRGlzcGxheVZhbHVlKGRlZmluaXRpb24sIGZpZWxkLCByZWNvcmQ/LltmaWVsZF0sIHJlY29yZCk7XG4gICAgICAgICAgaWYgKG9wdGlvbmFsSW5mb0NhcmRCbG9ja0ZpZWxkcy5oYXMoZmllbGQpICYmIGRpc3BsYXlWYWx1ZSA9PT0gJ05vdCBzZXQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtmaWVsZH0gY2xhc3NOYW1lPVwiYWRtaW4tcHJvZmlsZS1jYXJkX19yb3dcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX2xhYmVsXCI+e2dldEZpZWxkRGlzcGxheUxhYmVsKGRlZmluaXRpb24sIGZpZWxkKX08L2Rpdj5cbiAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tcHJvZmlsZS1jYXJkX190ZXh0Ym94XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZGlzcGxheVZhbHVlfVxuICAgICAgICAgICAgICAgIHJvd3M9e01hdGgubWF4KDQsIE1hdGgubWluKDEwLCBTdHJpbmcoZGlzcGxheVZhbHVlKS5zcGxpdCgnXFxuJykubGVuZ3RoICsgMSkpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuXG5mdW5jdGlvbiBNZXNzYWdlUmVwbHlQYW5lbCh7IHJlcGxpZXMsIHJlcGx5RHJhZnQsIG9uUmVwbHlDaGFuZ2UsIG9uU2VuZFJlcGx5LCBzZW5kaW5nUmVwbHkgfSkge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLXNlY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwbHktcGFuZWxcIj5cbiAgICAgICAgPGgzIGNsYXNzTmFtZT1cImFkbWluLXJlcGx5LXBhbmVsX190aXRsZVwiPlJlcGx5IHRvIEN1c3RvbWVyPC9oMz5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tcmVwbHktcGFuZWxfX25vdGVcIj5TZW5kIGFuIGVtYWlsIHJlc3BvbnNlIGRpcmVjdGx5IGZyb20gdGhpcyBtZXNzYWdlIGRldGFpbCBwYWdlLjwvcD5cblxuICAgICAgICB7cmVwbGllcy5sZW5ndGggPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9faGlzdG9yeVwiPlxuICAgICAgICAgICAge3JlcGxpZXMubWFwKChyZXBseSkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17cmVwbHkuaWR9IGNsYXNzTmFtZT1cImFkbWluLXJlcGx5LXBhbmVsX19pdGVtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9fbWV0YVwiPntyZXBseS5jcmVhdGVkQXR9IOKAoiB7cmVwbHkuYWRtaW5FbWFpbH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGx5LXBhbmVsX19zdWJqZWN0XCI+e3JlcGx5LnN1YmplY3R9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9fYm9keVwiPntyZXBseS5ib2R5fTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGx5LXBhbmVsX19mb3JtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZFwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+UmVwbHkgU3ViamVjdDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4taW5wdXRcIlxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtyZXBseURyYWZ0LnN1YmplY3R9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uUmVwbHlDaGFuZ2UoJ3N1YmplY3QnLCBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj5SZXBseSBNZXNzYWdlPC9sYWJlbD5cbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi10ZXh0YXJlYVwiXG4gICAgICAgICAgICAgIHZhbHVlPXtyZXBseURyYWZ0LmJvZHl9XG4gICAgICAgICAgICAgIHJvd3M9ezh9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uUmVwbHlDaGFuZ2UoJ2JvZHknLCBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGx5LXBhbmVsX19hY3Rpb25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25TZW5kUmVwbHl9IGRpc2FibGVkPXtzZW5kaW5nUmVwbHl9PlxuICAgICAgICAgICAgICB7c2VuZGluZ1JlcGx5ID8gJ1NlbmRpbmcuLi4nIDogJ1NlbmQgUmVwbHknfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuXG5mdW5jdGlvbiBBcnJheUZpZWxkKHsgZmllbGQsIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSB0b0xhYmVsKGZpZWxkKTtcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW107XG4gIGNvbnN0IGlzSW1hZ2VBcnJheSA9IElNQUdFX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCk7XG4gIGNvbnN0IFtkcmFnSW5kZXgsIHNldERyYWdJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2RyYWdPdmVySW5kZXgsIHNldERyYWdPdmVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRpbmdJbmRleCwgc2V0VXBsb2FkaW5nSW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRFcnJvciwgc2V0VXBsb2FkRXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBmaWxlSW5wdXRSZWZzID0gdXNlUmVmKHt9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGxcIj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9faGVhZFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3RpdGxlXCI+e2xhYmVsfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19jb3VudFwiPntpdGVtcy5sZW5ndGh9IGVudHJpZXM8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgPGRldGFpbHNcbiAgICAgICAgICAgIGtleT17YCR7ZmllbGR9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXJlcGVhdGFibGVfX2l0ZW0ke2RyYWdPdmVySW5kZXggPT09IGluZGV4ID8gJyBhZG1pbi1yZXBlYXRhYmxlX19pdGVtLS1kcmFnLW92ZXInIDogJyd9YH1cbiAgICAgICAgICAgIG9wZW49e2luZGV4ID09PSAwfVxuICAgICAgICAgICAgb25EcmFnT3Zlcj17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkaXNhYmxlZCB8fCBkcmFnSW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkaXNhYmxlZCB8fCBkcmFnSW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBpbmRleCAtIGRyYWdJbmRleDtcbiAgICAgICAgICAgICAgaWYgKG9mZnNldCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIG9uTW92ZUl0ZW0oWy4uLnBhdGgsIGRyYWdJbmRleF0sIG9mZnNldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkcmFnT3ZlckluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHN1bW1hcnkgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnktbGVmdFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2J1bGxldFwiPuKWvDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19uYW1lXCI+XG4gICAgICAgICAgICAgICAgICB7aXNJbWFnZUFycmF5XG4gICAgICAgICAgICAgICAgICAgID8gYEltYWdlICR7aW5kZXggKyAxfWBcbiAgICAgICAgICAgICAgICAgICAgOiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnID8gaXRlbSB8fCBgJHtsYWJlbH0gJHtpbmRleCArIDF9YCA6IGl0ZW0/LnRleHQgfHwgYCR7bGFiZWx9ICR7aW5kZXggKyAxfWApfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2ljb24tYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBvblJlbW92ZUl0ZW0oWy4uLnBhdGgsIGluZGV4XSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRlbGV0ZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAg8J+XkVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlPXshZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIkRyYWcgdG8gcmVvcmRlclwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgU3RyaW5nKGluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIHNldERyYWdJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIOKLruKLrlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc3VtbWFyeT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkLWdyaWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICB7aXNJbWFnZUFycmF5ID8gbnVsbCA6IDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPntsYWJlbCA9PT0gJ1RhZ3MnID8gJ1RleHQnIDogbGFiZWwuc2xpY2UoMCwgLTEpIHx8IGxhYmVsfTwvbGFiZWw+fVxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheSA/IG51bGwgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Z2V0UmVwZWF0YWJsZUl0ZW1WYWx1ZShpdGVtKX1cbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UoWy4uLnBhdGgsIGluZGV4XSwgd2l0aFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSwgZXZlbnQudGFyZ2V0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7aXNJbWFnZUFycmF5ICYmIHJlc29sdmVNZWRpYVByZXZpZXdVcmwoZ2V0UmVwZWF0YWJsZUl0ZW1WYWx1ZShpdGVtKSkgPyAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fY2FudmFzIGFkbWluLXJlcGVhdGFibGVfX2ltYWdlLXByZXZpZXdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3RodW1iXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtyZXNvbHZlTWVkaWFQcmV2aWV3VXJsKGdldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2Ake2xhYmVsfSAke2luZGV4ICsgMX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9uc1wiIHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHdpbmRvdy5vcGVuKHJlc29sdmVNZWRpYVByZXZpZXdVcmwoZ2V0UmVwZWF0YWJsZUl0ZW1WYWx1ZShpdGVtKSksICdfYmxhbmsnLCAnbm9vcGVuZXIsbm9yZWZlcnJlcicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICDihpdcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2UoWy4uLnBhdGgsIGluZGV4XSwgd2l0aFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSwgJycpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAg4pyVXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIHtpc0ltYWdlQXJyYXkgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZS1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nSW5kZXggPT09IGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZmlsZUlucHV0UmVmcy5jdXJyZW50W2luZGV4XT8uY2xpY2soKX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dXBsb2FkaW5nSW5kZXggPT09IGluZGV4ID8gJ1VwbG9hZGluZy4uLicgOiAnVXBsb2FkIGZyb20gY29tcHV0ZXInfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHVwbG9hZGluZ0luZGV4ID09PSBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmdJbmRleChpbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFVybCA9IGF3YWl0IGNob29zZUFkbWluTGlicmFyeUltYWdlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5wYXRoLCBpbmRleF0sIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sIHNlbGVjdGVkVXJsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gY2hvb3NlIGltYWdlIGZyb20gbWVkaWEgbGlicmFyeS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dXBsb2FkaW5nSW5kZXggPT09IGluZGV4ID8gJ0Nob29zaW5nLi4uJyA6ICdDaG9vc2UgZnJvbSBtZWRpYSBsaWJyYXJ5J31cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17KGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wdXRSZWZzLmN1cnJlbnRbaW5kZXhdID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZmlsZUlucHV0UmVmcy5jdXJyZW50W2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17YXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXM/LlswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmdJbmRleChpbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGxvYWRlZFVybCA9IGF3YWl0IHVwbG9hZEFkbWluSW1hZ2UoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UoWy4uLnBhdGgsIGluZGV4XSwgd2l0aFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSwgdXBsb2FkZWRVcmwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcihlcnJvcj8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgKSl9XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fYWRkXCIgdHlwZT1cImJ1dHRvblwiIGRpc2FibGVkPXtkaXNhYmxlZH0gb25DbGljaz17KCkgPT4gb25BZGRJdGVtKHBhdGgsIHsgdGV4dDogJycgfSl9PlxuICAgICAgICAgICsgQWRkIGFuIGVudHJ5XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICB7dXBsb2FkRXJyb3IgPyA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lcnJvclwiIHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE2cHggMTRweCcgfX0+e3VwbG9hZEVycm9yfTwvZGl2PiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRmllbGRSZW5kZXJlcih7IGRlZmluaXRpb24sIGZpZWxkLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiA8QXJyYXlGaWVsZCBmaWVsZD17ZmllbGR9IHZhbHVlPXt2YWx1ZX0gcGF0aD17cGF0aH0gb25DaGFuZ2U9e29uQ2hhbmdlfSBvbkFkZEl0ZW09e29uQWRkSXRlbX0gb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19IG9uTW92ZUl0ZW09e29uTW92ZUl0ZW19IGRpc2FibGVkPXtkaXNhYmxlZH0gLz47XG4gIH1cbiAgcmV0dXJuIDxQcmltaXRpdmVGaWVsZCBkZWZpbml0aW9uPXtkZWZpbml0aW9ufSBmaWVsZD17ZmllbGR9IHZhbHVlPXt2YWx1ZX0gcGF0aD17cGF0aH0gb25DaGFuZ2U9e29uQ2hhbmdlfSBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+O1xufVxuXG5mdW5jdGlvbiByZW5kZXJMaXN0Q2VsbChmaWVsZCwgdmFsdWUpIHtcbiAgaWYgKGZpZWxkID09PSAnbWFudWFsVGFnJykge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXN0YXR1cyBhZG1pbi1saXN0LXN0YXR1cy0tbWFudWFsXCI+e3ZhbHVlfTwvc3Bhbj5cbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIGlmIChmaWVsZCA9PT0gJ3N0YXR1cycpIHtcbiAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1zdGF0dXNcIj57dmFsdWV9PC9zcGFuPjtcbiAgfVxuXG4gIGlmICgoZmllbGQgPT09ICdmZWF0dXJlZCcgfHwgZmllbGQgPT09ICdpc0ZlYXR1cmVkJyB8fCBmaWVsZCA9PT0gJ2lzUG9wdWxhcicpICYmICh2YWx1ZSA9PT0gJ1llcycgfHwgdmFsdWUgPT09ICdObycpKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGFkbWluLWxpc3QtYm9vbGVhbiAke3ZhbHVlID09PSAnWWVzJyA/ICdhZG1pbi1saXN0LWJvb2xlYW4tLXllcycgOiAnYWRtaW4tbGlzdC1ib29sZWFuLS1ubyd9YH0+XG4gICAgICAgIHt2YWx1ZSA9PT0gJ1llcycgPyAn4pyTJyA6ICfinJUnfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIExpc3RWaWV3KHtcbiAgZGVmaW5pdGlvbixcbiAgcmVjb3JkcyxcbiAgY29udHJvbHMsXG4gIHNlYXJjaCxcbiAgbG9hZGluZyxcbiAgb25TZWFyY2gsXG4gIG9uT3BlblJlY29yZCxcbiAgb25DcmVhdGUsXG4gIG9uU2V0U29ydCxcbiAgb25TZXRGaWx0ZXIsXG4gIG9uUmVzZXRGaWx0ZXJzLFxuICBvblRvZ2dsZURpc3BsYXllZEZpZWxkLFxuICBvblJlc2V0RGlzcGxheWVkRmllbGRzLFxuICBvbkR1cGxpY2F0ZVJlY29yZCxcbiAgb25EZWxldGVSZWNvcmQsXG59KSB7XG4gIGNvbnN0IFtzaG93U2VhcmNoLCBzZXRTaG93U2VhcmNoXSA9IHVzZVN0YXRlKEJvb2xlYW4oc2VhcmNoKSk7XG4gIGNvbnN0IFtmaWx0ZXJzT3Blbiwgc2V0RmlsdGVyc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0Rpc3BsYXllZCwgc2V0U2hvd0Rpc3BsYXllZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWFyY2hWYWx1ZSwgc2V0U2VhcmNoVmFsdWVdID0gdXNlU3RhdGUoc2VhcmNoKTtcbiAgY29uc3QgW29wZW5NZW51SWQsIHNldE9wZW5NZW51SWRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IG1lbnVSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRTZWFyY2hWYWx1ZShzZWFyY2gpO1xuICB9LCBbc2VhcmNoXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHNlYXJjaFZhbHVlICE9PSBzZWFyY2gpIHtcbiAgICAgICAgb25TZWFyY2goc2VhcmNoVmFsdWUpO1xuICAgICAgfVxuICAgIH0sIDI1MCk7XG5cbiAgICByZXR1cm4gKCkgPT4gd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgfSwgW29uU2VhcmNoLCBzZWFyY2gsIHNlYXJjaFZhbHVlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKG1lbnVSZWYuY3VycmVudCAmJiAhbWVudVJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBkaXNwbGF5ZWRDb2x1bW5zID0gdXNlTWVtbyhcbiAgICAoKSA9PiBjb250cm9scy5hdmFpbGFibGVGaWVsZHMuZmlsdGVyKChmaWVsZCkgPT4gY29udHJvbHMuZGlzcGxheWVkRmllbGRzLmluY2x1ZGVzKGZpZWxkLmZpZWxkKSksXG4gICAgW2NvbnRyb2xzLmF2YWlsYWJsZUZpZWxkcywgY29udHJvbHMuZGlzcGxheWVkRmllbGRzXSxcbiAgKTtcbiAgY29uc3Qgc2hvd0NyZWF0ZSA9IGRlZmluaXRpb24uYWxsb3dDcmVhdGUgIT09IGZhbHNlO1xuICBjb25zdCBoYXNGaWx0ZXJzID0gQm9vbGVhbihjb250cm9scy5maWx0ZXJzPy5sZW5ndGgpO1xuICBjb25zdCBhbGxvd0R1cGxpY2F0ZSA9IGRlZmluaXRpb24uYWxsb3dEdXBsaWNhdGUgIT09IGZhbHNlO1xuICBjb25zdCBhbGxvd0RlbGV0ZSA9IGRlZmluaXRpb24uYWxsb3dEZWxldGUgIT09IGZhbHNlO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JcIj5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvcl9faW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1oZWFkZXJcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZXRhXCI+e2RlZmluaXRpb24ubWV0YUxhYmVsIHx8ICdDb2xsZWN0aW9uIFR5cGUnfTwvZGl2PlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLXRpdGxlXCI+e2RlZmluaXRpb24ubGFiZWx9PC9oMT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAge3Nob3dDcmVhdGUgPyA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25DcmVhdGV9PisgQ3JlYXRlIG5ldyBlbnRyeTwvYnV0dG9uPiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1tZXRhXCI+e3JlY29yZHMubGVuZ3RofSBlbnRyaWVzIGZvdW5kPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXRvb2xiYXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXRvb2xiYXItY2x1c3RlclwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi10b29sYmFyLWJ1dHRvbiBhZG1pbi10b29sYmFyLWJ1dHRvbi0taWNvbiR7c2hvd1NlYXJjaCA/ICcgYWRtaW4tdG9vbGJhci1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1NlYXJjaCgoY3VycmVudCkgPT4gIWN1cnJlbnQpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICDwn5SNXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHtzaG93U2VhcmNoID8gKFxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi10b29sYmFyLXNlYXJjaFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFZhbHVlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFNlYXJjaFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgIGF1dG9Gb2N1c1xuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICB7aGFzRmlsdGVycyA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXRvb2xiYXItYnV0dG9uJHtmaWx0ZXJzT3BlbiA/ICcgYWRtaW4tdG9vbGJhci1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldEZpbHRlcnNPcGVuKChjdXJyZW50KSA9PiAhY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICBzZXRTaG93RGlzcGxheWVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgRmlsdGVyc1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2hhc0ZpbHRlcnMgJiYgZmlsdGVyc09wZW4gPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyXCIgc3R5bGU9e3sgbGVmdDogc2hvd1NlYXJjaCA/IDMzMiA6IDUyLCByaWdodDogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fdGl0bGVcIj5GaWx0ZXJzPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fcmVzZXRcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25SZXNldEZpbHRlcnN9PlJlc2V0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge2NvbnRyb2xzLmZpbHRlcnMubWFwKChmaWx0ZXIpID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtmaWx0ZXIuZmllbGR9IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fbGFiZWxcIj57ZmlsdGVyLmxhYmVsfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3NlbGVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbnRyb2xzLmFjdGl2ZUZpbHRlcnNbZmlsdGVyLmZpZWxkXSA/PyAnJ31cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvblNldEZpbHRlcihmaWx0ZXIuZmllbGQsIGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+QWxsPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAge2ZpbHRlci5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9ufSB2YWx1ZT17b3B0aW9ufT57b3B0aW9ufTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXRvb2xiYXItY2x1c3RlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tdG9vbGJhci1idXR0b24gYWRtaW4tdG9vbGJhci1idXR0b24tLWljb24ke3Nob3dEaXNwbGF5ZWQgPyAnIGFkbWluLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRTaG93RGlzcGxheWVkKChjdXJyZW50KSA9PiAhY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICBzZXRGaWx0ZXJzT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOKamVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAge3Nob3dEaXNwbGF5ZWQgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX190aXRsZVwiPkRpc3BsYXllZCBmaWVsZHM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fcmVzZXRcIlxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uUmVzZXREaXNwbGF5ZWRGaWVsZHN9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBSZXNldFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAge2NvbnRyb2xzLmF2YWlsYWJsZUZpZWxkcy5tYXAoKGZpZWxkKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBrZXk9e2ZpZWxkLmZpZWxkfSBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX2NoZWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y29udHJvbHMuZGlzcGxheWVkRmllbGRzLmluY2x1ZGVzKGZpZWxkLmZpZWxkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uVG9nZ2xlRGlzcGxheWVkRmllbGQoZmllbGQuZmllbGQsIGV2ZW50LnRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntmaWVsZC5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1jYXJkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LWNhcmRfX2hlYWRcIj5cbiAgICAgICAgICAgIDxzdHJvbmc+e2RlZmluaXRpb24ubGFiZWx9PC9zdHJvbmc+XG4gICAgICAgICAgICA8c3Bhbj57bG9hZGluZyA/ICdMb2FkaW5nLi4uJyA6IGAke3JlY29yZHMubGVuZ3RofSBlbnRyaWVzYH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtdGFibGVcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIHtkaXNwbGF5ZWRDb2x1bW5zLm1hcCgoY29sdW1uKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8dGgga2V5PXtjb2x1bW4uZmllbGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvblNldFNvcnQoY29sdW1uLmZpZWxkKX0+XG4gICAgICAgICAgICAgICAgICAgICAge2NvbHVtbi5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICB7Y29udHJvbHMuc29ydEJ5ID09PSBjb2x1bW4uZmllbGQgPyBgICR7Y29udHJvbHMuc29ydE9yZGVyID09PSAnYXNjJyA/ICfihpEnIDogJ+KGkyd9YCA6ICcnfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPHRoIC8+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7cmVjb3Jkcy5tYXAoKHJlY29yZCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3JlY29yZC5kb2N1bWVudElkfSBvbkNsaWNrPXsoKSA9PiBvbk9wZW5SZWNvcmQocmVjb3JkLmlkKX0+XG4gICAgICAgICAgICAgICAgICB7ZGlzcGxheWVkQ29sdW1ucy5tYXAoKGNvbHVtbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXtgJHtyZWNvcmQuZG9jdW1lbnRJZH0tJHtjb2x1bW4uZmllbGR9YH0+e3JlbmRlckxpc3RDZWxsKGNvbHVtbi5maWVsZCwgcmVjb3JkLmNvbHVtbnNbY29sdW1uLmZpZWxkXSl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnUtY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudS10cmlnZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZCgoY3VycmVudCkgPT4gKGN1cnJlbnQgPT09IHJlY29yZC5pZCA/IG51bGwgOiByZWNvcmQuaWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAg4oCmXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICB7b3Blbk1lbnVJZCA9PT0gcmVjb3JkLmlkID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17bWVudVJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBldmVudC5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW1cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRPcGVuTWVudUlkKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbk9wZW5SZWNvcmQocmVjb3JkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pY29uXCI+4pyOPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZGVmaW5pdGlvbi5yZWFkT25seSA/ICdWaWV3JyA6ICdFZGl0J308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHthbGxvd0R1cGxpY2F0ZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pdGVtXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRPcGVuTWVudUlkKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHVwbGljYXRlUmVjb3JkKHJlY29yZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVfX2ljb25cIj7ip4k8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RHVwbGljYXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAge2FsbG93RGVsZXRlID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW0gYWRtaW4tbGlzdC1yb3ctbWVudV9faXRlbS0tZGFuZ2VyXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRPcGVuTWVudUlkKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlUmVjb3JkKHJlY29yZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVfX2ljb25cIj7wn5eRPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRlbGV0ZSBlbnRyeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRWRpdFZpZXcoeyBkZWZpbml0aW9uLCByZWNvcmQsIHB1Ymxpc2hlZFJlY29yZCwgYWN0aXZlVGFiLCBvblN3aXRjaFRhYiwgc2F2aW5nLCBlcnJvciwgb25CYWNrLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIG9uU2F2ZSwgb25QdWJsaXNoLCBvbkRlbGV0ZSwgb25EaXNjYXJkQ2hhbmdlcywgb25VbnB1Ymxpc2gsIGNhblNhdmUsIGNhblB1Ymxpc2gsIGNhbkRpc2NhcmQsIGNhblVucHVibGlzaCwgcmVwbHlEcmFmdCwgb25SZXBseUNoYW5nZSwgb25TZW5kUmVwbHksIHNlbmRpbmdSZXBseSwgaXNDcmVhdGVNb2RlIH0pIHtcbiAgY29uc3QgZGlzcGxheWVkUmVjb3JkID0gYWN0aXZlVGFiID09PSAncHVibGlzaGVkJyAmJiBwdWJsaXNoZWRSZWNvcmQgPyBwdWJsaXNoZWRSZWNvcmQgOiByZWNvcmQ7XG4gIGNvbnN0IGlzUHVibGlzaGVkVmlldyA9IGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkUmVjb3JkO1xuICBjb25zdCBpc01hbnVhbEVudHJ5ID0gZGlzcGxheWVkUmVjb3JkPy5lbnRyeVNvdXJjZSA9PT0gJ21hbnVhbCcgfHwgZGlzcGxheWVkUmVjb3JkPy5tYW51YWxUYWcgPT09ICdNYW51YWwnO1xuICBjb25zdCBzdXBwb3J0c0VkaXRpbmcgPSBpc0NyZWF0ZU1vZGUgfHwgaXNNYW51YWxFbnRyeSB8fCAhZGVmaW5pdGlvbi5yZWFkT25seTtcbiAgY29uc3Qgc2hvd1ZlcnNpb25UYWJzID0gc3VwcG9ydHNFZGl0aW5nICYmIGRlZmluaXRpb24uc2hvd1ZlcnNpb25UYWJzICE9PSBmYWxzZTtcbiAgY29uc3QgYWxsb3dQdWJsaXNoID0gc3VwcG9ydHNFZGl0aW5nICYmIGRlZmluaXRpb24uYWxsb3dQdWJsaXNoICE9PSBmYWxzZTtcbiAgY29uc3QgYWxsb3dTYXZlID0gc3VwcG9ydHNFZGl0aW5nICYmIGRlZmluaXRpb24uYWxsb3dTYXZlICE9PSBmYWxzZTtcbiAgY29uc3QgYWxsb3dEZWxldGUgPSBkZWZpbml0aW9uLmFsbG93RGVsZXRlICE9PSBmYWxzZTtcbiAgY29uc3QgZWRpdGFibGVGaWVsZHMgPSBpc0NyZWF0ZU1vZGVcbiAgICA/IChBcnJheS5pc0FycmF5KGRlZmluaXRpb24uY3JlYXRlRmllbGRzKSA/IGRlZmluaXRpb24uY3JlYXRlRmllbGRzIDogW10pXG4gICAgOiBpc01hbnVhbEVudHJ5XG4gICAgICA/IChBcnJheS5pc0FycmF5KGRlZmluaXRpb24ubWFudWFsRWRpdGFibGVGaWVsZHMpID8gZGVmaW5pdGlvbi5tYW51YWxFZGl0YWJsZUZpZWxkcyA6IChBcnJheS5pc0FycmF5KGRlZmluaXRpb24uZWRpdGFibGVGaWVsZHMpID8gZGVmaW5pdGlvbi5lZGl0YWJsZUZpZWxkcyA6IFtdKSlcbiAgICAgIDogKEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5lZGl0YWJsZUZpZWxkcykgPyBkZWZpbml0aW9uLmVkaXRhYmxlRmllbGRzIDogW10pO1xuICBjb25zdCBpbmZvQ2FyZEZpZWxkcyA9ICFpc0NyZWF0ZU1vZGUgJiYgQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmluZm9DYXJkRmllbGRzKSA/IGRlZmluaXRpb24uaW5mb0NhcmRGaWVsZHMgOiBbXTtcbiAgY29uc3QgaW5mb0NhcmRCbG9ja0ZpZWxkcyA9ICFpc0NyZWF0ZU1vZGUgJiYgQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmluZm9DYXJkQmxvY2tGaWVsZHMpID8gZGVmaW5pdGlvbi5pbmZvQ2FyZEJsb2NrRmllbGRzIDogW107XG4gIGNvbnN0IGhpZGRlbkNhcmRGaWVsZHMgPSBuZXcgU2V0KFxuICAgIFsuLi5pbmZvQ2FyZEZpZWxkcywgLi4uaW5mb0NhcmRCbG9ja0ZpZWxkc10uZmlsdGVyKChmaWVsZCkgPT4gIWVkaXRhYmxlRmllbGRzLmluY2x1ZGVzKGZpZWxkKSksXG4gICk7XG4gIGNvbnN0IHNob3dTdGFuZGFsb25lSGVhZGVyID0gaW5mb0NhcmRGaWVsZHMubGVuZ3RoID09PSAwICYmIGluZm9DYXJkQmxvY2tGaWVsZHMubGVuZ3RoID09PSAwO1xuICBjb25zdCBhY3RpdmVMYXlvdXQgPSBpc0NyZWF0ZU1vZGVcbiAgICA/IChBcnJheS5pc0FycmF5KGRlZmluaXRpb24uY3JlYXRlTGF5b3V0KSA/IGRlZmluaXRpb24uY3JlYXRlTGF5b3V0IDogZGVmaW5pdGlvbi5lZGl0TGF5b3V0KVxuICAgIDogaXNNYW51YWxFbnRyeSAmJiBBcnJheS5pc0FycmF5KGRlZmluaXRpb24ubWFudWFsRWRpdExheW91dClcbiAgICAgID8gZGVmaW5pdGlvbi5tYW51YWxFZGl0TGF5b3V0XG4gICAgICA6IGRlZmluaXRpb24uZWRpdExheW91dDtcbiAgY29uc3QgW21lbnVPcGVuLCBzZXRNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IG1lbnVSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW1lbnVPcGVuKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAobWVudVJlZi5jdXJyZW50ICYmICFtZW51UmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIH07XG4gIH0sIFttZW51T3Blbl0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JcIj5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvcl9faW5uZXJcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1iYWNrXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQmFja30+4oaQIEJhY2s8L2J1dHRvbj5cblxuICAgICAgICB7c2hvd1N0YW5kYWxvbmVIZWFkZXIgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWV0YVwiPntkZWZpbml0aW9uLm1ldGFMYWJlbCB8fCAnQ29sbGVjdGlvbiBUeXBlJ308L2Rpdj5cbiAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLXRpdGxlXCI+e2dldERpc3BsYXlUaXRsZShkZWZpbml0aW9uLCBkaXNwbGF5ZWRSZWNvcmQpfTwvaDE+XG4gICAgICAgICAgICAgIHtkaXNwbGF5ZWRSZWNvcmQuc3RhdHVzID8gPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zdGF0dXNcIj57ZGlzcGxheWVkUmVjb3JkLnN0YXR1c308L2Rpdj4gOiBudWxsfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHtzaG93VmVyc2lvblRhYnMgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10YWJzXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YGFkbWluLXRhYiR7YWN0aXZlVGFiID09PSAnZHJhZnQnID8gJyBhZG1pbi10YWItLWFjdGl2ZScgOiAnJ31gfSB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25Td2l0Y2hUYWIoJ2RyYWZ0Jyl9PkRSQUZUPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YGFkbWluLXRhYiR7YWN0aXZlVGFiID09PSAncHVibGlzaGVkJyA/ICcgYWRtaW4tdGFiLS1hY3RpdmUnIDogJyd9YH0gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHB1Ymxpc2hlZFJlY29yZCAmJiBvblN3aXRjaFRhYigncHVibGlzaGVkJyl9PlBVQkxJU0hFRDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7ZXJyb3IgPyA8TWVzc2FnZUJveCB2YXJpYW50PVwiZGFuZ2VyXCI+e2Vycm9yfTwvTWVzc2FnZUJveD4gOiBudWxsfVxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGF5b3V0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tYWluLWNhcmRcIj5cbiAgICAgICAgICAgIDxQcm9maWxlSW5mb0NhcmQgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn0gcmVjb3JkPXtkaXNwbGF5ZWRSZWNvcmR9IC8+XG4gICAgICAgICAgICB7ZGVmaW5pdGlvbi5uYW1lID09PSAnbWVzc2FnZXMnID8gKFxuICAgICAgICAgICAgICA8TWVzc2FnZVJlcGx5UGFuZWxcbiAgICAgICAgICAgICAgICByZXBsaWVzPXtBcnJheS5pc0FycmF5KGRpc3BsYXllZFJlY29yZD8ucmVwbGllcykgPyBkaXNwbGF5ZWRSZWNvcmQucmVwbGllcyA6IFtdfVxuICAgICAgICAgICAgICAgIHJlcGx5RHJhZnQ9e3JlcGx5RHJhZnR9XG4gICAgICAgICAgICAgICAgb25SZXBseUNoYW5nZT17b25SZXBseUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvblNlbmRSZXBseT17b25TZW5kUmVwbHl9XG4gICAgICAgICAgICAgICAgc2VuZGluZ1JlcGx5PXtzZW5kaW5nUmVwbHl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIHthY3RpdmVMYXlvdXQubWFwKChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZpc2libGVGaWVsZHMgPSByb3cuZmlsdGVyKChmaWVsZCkgPT4gIWhpZGRlbkNhcmRGaWVsZHMuaGFzKGZpZWxkKSk7XG5cbiAgICAgICAgICAgICAgaWYgKCF2aXNpYmxlRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17YHJvdy0ke2luZGV4fWB9IGNsYXNzTmFtZT1cImFkbWluLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQtZ3JpZFwiPlxuICAgICAgICAgICAgICAgICAgICB7dmlzaWJsZUZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGREaXNhYmxlZCA9IGlzUHVibGlzaGVkVmlld1xuICAgICAgICAgICAgICAgICAgICAgICAgfHwgIXN1cHBvcnRzRWRpdGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGVkaXRhYmxlRmllbGRzLmxlbmd0aCA+IDAgJiYgIWVkaXRhYmxlRmllbGRzLmluY2x1ZGVzKGZpZWxkKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkUmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtmaWVsZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ9e2ZpZWxkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZGlzcGxheWVkUmVjb3JkW2ZpZWxkXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aD17W2ZpZWxkXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkFkZEl0ZW09e29uQWRkSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW92ZUl0ZW09e29uTW92ZUl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtmaWVsZERpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YXNpZGU+XG4gICAgICAgICAgICB7IXN1cHBvcnRzRWRpdGluZyA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9faGVhZFwiPkVudHJ5PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1ub3RlXCI+UmVhZC1vbmx5IHJlY29yZC48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9faGVhZFwiPkVudHJ5PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9fYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICB7YWxsb3dQdWJsaXNoID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25QdWJsaXNofSBkaXNhYmxlZD17IWNhblB1Ymxpc2h9PlB1Ymxpc2g8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IGFkbWluLXNpZGUtYnV0dG9uLS1tZW51XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHNldE1lbnVPcGVuKChjdXJyZW50KSA9PiAhY3VycmVudCl9PuKApjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVudU9wZW4gPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9e21lbnVSZWZ9IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSBhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVucHVibGlzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhblVucHVibGlzaH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvblwiPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbnB1Ymxpc2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtIGFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGlzY2FyZENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5EaXNjYXJkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uXCI+w5c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpc2NhcmQgY2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YWxsb3dTYXZlID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uU2F2ZX0gZGlzYWJsZWQ9eyFjYW5TYXZlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICkgOiBhbGxvd1NhdmUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvblNhdmV9IGRpc2FibGVkPXshY2FuU2F2ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLW5vdGVcIj5ObyBlZGl0YWJsZSBhY3Rpb25zIGZvciB0aGlzIHJlY29yZC48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge2FsbG93RGVsZXRlID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2hlYWRcIj5BY3Rpb25zPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uRGVsZXRlfSBkaXNhYmxlZD17aXNQdWJsaXNoZWRWaWV3fT5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvYXNpZGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbGxlY3Rpb25NYW5hZ2VyKCkge1xuICBjb25zdCB7IHBhZ2VOYW1lIH0gPSB1c2VQYXJhbXMoKTtcbiAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2xpc3RMb2FkaW5nLCBzZXRMaXN0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkZWZpbml0aW9uLCBzZXREZWZpbml0aW9uXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtjb250cm9scywgc2V0Q29udHJvbHNdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtyZWNvcmQsIHNldFJlY29yZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW29yaWdpbmFsUmVjb3JkLCBzZXRPcmlnaW5hbFJlY29yZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3B1Ymxpc2hlZFJlY29yZCwgc2V0UHVibGlzaGVkUmVjb3JkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2RyYWZ0Jyk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbcmVwbHlEcmFmdCwgc2V0UmVwbHlEcmFmdF0gPSB1c2VTdGF0ZSh7IHN1YmplY3Q6ICcnLCBib2R5OiAnJyB9KTtcbiAgY29uc3QgW3NlbmRpbmdSZXBseSwgc2V0U2VuZGluZ1JlcGx5XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBxdWVyeSA9IHVzZU1lbW8oKCkgPT4gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpLCBbbG9jYXRpb24uc2VhcmNoXSk7XG4gIGNvbnN0IHJlY29yZElkID0gcXVlcnkuZ2V0KCdyZWNvcmRJZCcpO1xuICBjb25zdCBpc05ldyA9IHF1ZXJ5LmdldCgnbmV3JykgPT09ICcxJztcbiAgY29uc3Qgc2VhcmNoID0gcXVlcnkuZ2V0KCdzZWFyY2gnKSB8fCAnJztcbiAgY29uc3Qgc3RhdHVzID0gcXVlcnkuZ2V0KCdzdGF0dXMnKSB8fCAnJztcbiAgY29uc3QgY2F0ZWdvcnkgPSBxdWVyeS5nZXQoJ2NhdGVnb3J5JykgfHwgJyc7XG4gIGNvbnN0IHBsYW5UeXBlID0gcXVlcnkuZ2V0KCdwbGFuVHlwZScpIHx8ICcnO1xuICBjb25zdCBmZWF0dXJlZCA9IHF1ZXJ5LmdldCgnZmVhdHVyZWQnKSB8fCAnJztcbiAgY29uc3QgaXNGZWF0dXJlZCA9IHF1ZXJ5LmdldCgnaXNGZWF0dXJlZCcpIHx8ICcnO1xuICBjb25zdCBpc1BvcHVsYXIgPSBxdWVyeS5nZXQoJ2lzUG9wdWxhcicpIHx8ICcnO1xuICBjb25zdCBzb3J0QnkgPSBxdWVyeS5nZXQoJ3NvcnRCeScpIHx8ICcnO1xuICBjb25zdCBzb3J0T3JkZXIgPSBxdWVyeS5nZXQoJ3NvcnRPcmRlcicpIHx8ICcnO1xuICBjb25zdCBkaXNwbGF5ZWRGaWVsZHMgPSBwYXJzZURpc3BsYXllZEZpZWxkcyhxdWVyeS5nZXQoJ2Rpc3BsYXllZEZpZWxkcycpKTtcbiAgY29uc3QgaXNNYW51YWxFZGl0YWJsZVJlY29yZCA9IHJlY29yZD8uZW50cnlTb3VyY2UgPT09ICdtYW51YWwnIHx8IHB1Ymxpc2hlZFJlY29yZD8uZW50cnlTb3VyY2UgPT09ICdtYW51YWwnO1xuICBjb25zdCBjYW5FZGl0Q3VycmVudFJlY29yZCA9IEJvb2xlYW4oZGVmaW5pdGlvbikgJiYgKCFkZWZpbml0aW9uLnJlYWRPbmx5IHx8IGlzTmV3IHx8IGlzTWFudWFsRWRpdGFibGVSZWNvcmQpO1xuXG4gIGNvbnN0IG1vZGUgPSB1c2VNZW1vKCgpID0+IChyZWNvcmRJZCB8fCBpc05ldyA/ICdlZGl0JyA6ICdsaXN0JyksIFtyZWNvcmRJZCwgaXNOZXddKTtcbiAgY29uc3QgaXNEaXJ0eSA9IHVzZU1lbW8oXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUocmVjb3JkKSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKG9yaWdpbmFsUmVjb3JkKSksXG4gICAgW3JlY29yZCwgb3JpZ2luYWxSZWNvcmRdLFxuICApO1xuICBjb25zdCBoYXNEcmFmdENvbnRlbnQgPSB1c2VNZW1vKCgpID0+IGhhc01lYW5pbmdmdWxWYWx1ZShyZWNvcmQpLCBbcmVjb3JkXSk7XG4gIGNvbnN0IGhhc1VucHVibGlzaGVkQ2hhbmdlcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUocmVjb3JkKSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKHB1Ymxpc2hlZFJlY29yZCkpLFxuICAgIFtyZWNvcmQsIHB1Ymxpc2hlZFJlY29yZF0sXG4gICk7XG4gIGNvbnN0IHNob3dWZXJzaW9uVGFicyA9IGRlZmluaXRpb24/LnNob3dWZXJzaW9uVGFicyAhPT0gZmFsc2U7XG4gIGNvbnN0IGNhblNhdmUgPSBjYW5FZGl0Q3VycmVudFJlY29yZCAmJiBtb2RlID09PSAnZWRpdCcgJiYgIXNhdmluZyAmJiAoIXNob3dWZXJzaW9uVGFicyB8fCBhY3RpdmVUYWIgIT09ICdwdWJsaXNoZWQnKSAmJiBpc0RpcnR5O1xuICBjb25zdCBjYW5QdWJsaXNoID0gY2FuRWRpdEN1cnJlbnRSZWNvcmQgJiYgbW9kZSA9PT0gJ2VkaXQnICYmICFzYXZpbmcgJiYgc2hvd1ZlcnNpb25UYWJzICYmIGFjdGl2ZVRhYiAhPT0gJ3B1Ymxpc2hlZCcgJiYgKHB1Ymxpc2hlZFJlY29yZCA/IGhhc1VucHVibGlzaGVkQ2hhbmdlcyA6IGhhc0RyYWZ0Q29udGVudCk7XG4gIGNvbnN0IGNhbkRpc2NhcmQgPSBjYW5FZGl0Q3VycmVudFJlY29yZCAmJiBtb2RlID09PSAnZWRpdCcgJiYgIXNhdmluZyAmJiBhY3RpdmVUYWIgIT09ICdwdWJsaXNoZWQnICYmIGhhc0RyYWZ0Q29udGVudDtcbiAgY29uc3QgY2FuVW5wdWJsaXNoID0gY2FuRWRpdEN1cnJlbnRSZWNvcmQgJiYgbW9kZSA9PT0gJ2VkaXQnICYmICFzYXZpbmcgJiYgQm9vbGVhbihwdWJsaXNoZWRSZWNvcmQpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGFjdGl2ZSA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc2hvdWxkQmxvY2sgPSBtb2RlID09PSAnZWRpdCcgfHwgIWRlZmluaXRpb247XG4gICAgICBpZiAoc2hvdWxkQmxvY2spIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldExpc3RMb2FkaW5nKHRydWUpO1xuICAgICAgfVxuICAgICAgc2V0RXJyb3IoJycpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RQYWdlKHBhZ2VOYW1lLCB7XG4gICAgICAgICAgcXVlcnk6IG1vZGUgPT09ICdlZGl0J1xuICAgICAgICAgICAgPyAocmVjb3JkSWQgPyB7IHJlY29yZElkIH0gOiB7IG5ldzogJzEnIH0pXG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgc2VhcmNoLFxuICAgICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICAgICAgICBwbGFuVHlwZSxcbiAgICAgICAgICAgICAgZmVhdHVyZWQsXG4gICAgICAgICAgICAgIGlzRmVhdHVyZWQsXG4gICAgICAgICAgICAgIGlzUG9wdWxhcixcbiAgICAgICAgICAgICAgc29ydEJ5LFxuICAgICAgICAgICAgICBzb3J0T3JkZXIsXG4gICAgICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGlzcGxheWVkRmllbGRzLmpvaW4oJywnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RGVmaW5pdGlvbihwYXlsb2FkLmRlZmluaXRpb24pO1xuICAgICAgICBzZXRSZWNvcmRzKHBheWxvYWQucmVjb3JkcyA/PyBbXSk7XG4gICAgICAgIHNldENvbnRyb2xzKHBheWxvYWQuY29udHJvbHMgPz8gbnVsbCk7XG4gICAgICAgIGNvbnN0IG5leHREcmFmdFJlY29yZCA9IHBheWxvYWQuZHJhZnRSZWNvcmQgPyBjbG9uZVZhbHVlKHBheWxvYWQuZHJhZnRSZWNvcmQpIDogbnVsbDtcbiAgICAgICAgc2V0UmVjb3JkKG5leHREcmFmdFJlY29yZCk7XG4gICAgICAgIHNldE9yaWdpbmFsUmVjb3JkKG5leHREcmFmdFJlY29yZCA/IGNsb25lVmFsdWUobmV4dERyYWZ0UmVjb3JkKSA6IG51bGwpO1xuICAgICAgICBzZXRQdWJsaXNoZWRSZWNvcmQocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQgPyBjbG9uZVZhbHVlKHBheWxvYWQucHVibGlzaGVkUmVjb3JkKSA6IG51bGwpO1xuICAgICAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgICAgIHNldFJlcGx5RHJhZnQoKGN1cnJlbnQpID0+IChcbiAgICAgICAgICBwYWdlTmFtZSA9PT0gJ21lc3NhZ2VzJyAmJiBuZXh0RHJhZnRSZWNvcmRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHN1YmplY3Q6IGN1cnJlbnQuc3ViamVjdCB8fCBgUmU6IFlvdXIgbWVzc2FnZSB0byBUaGUgTGVhZGVuaGFsbCBXb3Jrc2AsXG4gICAgICAgICAgICAgICAgYm9keTogY3VycmVudC5ib2R5LFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IGN1cnJlbnRcbiAgICAgICAgKSk7XG4gICAgICB9IGNhdGNoIChsb2FkRXJyb3IpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0RXJyb3IobG9hZEVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIHNldExpc3RMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkKCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFttb2RlLCBwYWdlTmFtZSwgcmVjb3JkSWQsIGlzTmV3LCBzZWFyY2gsIHN0YXR1cywgY2F0ZWdvcnksIHBsYW5UeXBlLCBmZWF0dXJlZCwgaXNGZWF0dXJlZCwgaXNQb3B1bGFyLCBzb3J0QnksIHNvcnRPcmRlciwgZGlzcGxheWVkRmllbGRzLmpvaW4oJywnKV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHBhZ2VOYW1lICE9PSAnbWVzc2FnZXMnIHx8ICFyZWNvcmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRSZXBseURyYWZ0KChjdXJyZW50KSA9PiAoe1xuICAgICAgc3ViamVjdDogY3VycmVudC5zdWJqZWN0IHx8ICdSZTogWW91ciBtZXNzYWdlIHRvIFRoZSBMZWFkZW5oYWxsIFdvcmtzJyxcbiAgICAgIGJvZHk6IGN1cnJlbnQuYm9keSxcbiAgICB9KSk7XG4gIH0sIFtwYWdlTmFtZSwgcmVjb3JkXSk7XG5cbiAgY29uc3QgdXBkYXRlTGlzdFF1ZXJ5ID0gKHBhdGNoKSA9PiB7XG4gICAgY29uc3QgbmV4dFBhcmFtcyA9IHtcbiAgICAgIHNlYXJjaCxcbiAgICAgIHN0YXR1cyxcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgcGxhblR5cGUsXG4gICAgICBmZWF0dXJlZCxcbiAgICAgIGlzRmVhdHVyZWQsXG4gICAgICBpc1BvcHVsYXIsXG4gICAgICBzb3J0QnksXG4gICAgICBzb3J0T3JkZXIsXG4gICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRpc3BsYXllZEZpZWxkcy5qb2luKCcsJyksXG4gICAgICAuLi5wYXRjaCxcbiAgICB9O1xuXG4gICAgbmF2aWdhdGUoYnVpbGRBZG1pblBhdGgobG9jYXRpb24ucGF0aG5hbWUsIG5leHRQYXJhbXMpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAocGF0aCwgbmV4dFZhbHVlKSA9PiB7XG4gICAgc2V0UmVjb3JkKChjdXJyZW50KSA9PiB1cGRhdGVBdFBhdGgoY3VycmVudCwgcGF0aCwgbmV4dFZhbHVlKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkSXRlbSA9IChwYXRoLCBuZXh0SXRlbSkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gYXBwZW5kQXRQYXRoKGN1cnJlbnQsIHBhdGgsIG5leHRJdGVtKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlSXRlbSA9IChwYXRoKSA9PiB7XG4gICAgc2V0UmVjb3JkKChjdXJyZW50KSA9PiByZW1vdmVBdFBhdGgoY3VycmVudCwgcGF0aCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdmVJdGVtID0gKHBhdGgsIG9mZnNldCkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gbW92ZUF0UGF0aChjdXJyZW50LCBwYXRoLCBvZmZzZXQpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlSW50ZW50ID0gYXN5bmMgKGludGVudCkgPT4ge1xuICAgIGlmICghcmVjb3JkIHx8ICFjYW5FZGl0Q3VycmVudFJlY29yZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGludGVudCxcbiAgICAgICAgICByZWNvcmRJZDogcmVjb3JkLmlkID8/IG51bGwsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIG5ldzogaXNOZXcgPyAnMScgOiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgaWYgKHBheWxvYWQuZHJhZnRSZWNvcmQpIHtcbiAgICAgICAgY29uc3QgbmV4dERyYWZ0UmVjb3JkID0gY2xvbmVWYWx1ZShwYXlsb2FkLmRyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0UmVjb3JkKG5leHREcmFmdFJlY29yZCk7XG4gICAgICAgIHNldE9yaWdpbmFsUmVjb3JkKGNsb25lVmFsdWUobmV4dERyYWZ0UmVjb3JkKSk7XG4gICAgICB9XG4gICAgICBzZXRQdWJsaXNoZWRSZWNvcmQocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQgPyBjbG9uZVZhbHVlKHBheWxvYWQucHVibGlzaGVkUmVjb3JkKSA6IG51bGwpO1xuICAgICAgaWYgKGludGVudCA9PT0gJ3VucHVibGlzaCcpIHtcbiAgICAgICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlY29yZElkICYmIHBheWxvYWQuZHJhZnRSZWNvcmQ/LmlkKSB7XG4gICAgICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IHJlY29yZElkOiBwYXlsb2FkLmRyYWZ0UmVjb3JkLmlkIH0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBheWxvYWQubm90aWNlKSB7XG4gICAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHBheWxvYWQubm90aWNlLm1lc3NhZ2UsIHR5cGU6IHBheWxvYWQubm90aWNlLnR5cGUgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXlsb2FkLmRlbGV0ZWQpIHtcbiAgICAgICAgbmF2aWdhdGUoYC9hZG1pbi9wYWdlcy8ke3BhZ2VOYW1lfWApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKHJlcXVlc3RFcnJvcikge1xuICAgICAgc2V0RXJyb3IocmVxdWVzdEVycm9yLm1lc3NhZ2UpO1xuICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcmVxdWVzdEVycm9yLm1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURpc2NhcmRDaGFuZ2VzID0gKCkgPT4ge1xuICAgIHNldFJlY29yZChnZXRFbXB0eUl0ZW0ocmVjb3JkKSk7XG4gICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNyZWF0ZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoZGVmaW5pdGlvbj8uYWxsb3dDcmVhdGUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IG5ldzogMSB9KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTGlzdEFjdGlvbiA9IGFzeW5jIChpbnRlbnQsIHRhcmdldFJlY29yZElkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGludGVudCxcbiAgICAgICAgICByZWNvcmRJZDogdGFyZ2V0UmVjb3JkSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcGF5bG9hZC5ub3RpY2U/Lm1lc3NhZ2UgPz8gYCR7ZGVmaW5pdGlvbi5sYWJlbH0gdXBkYXRlZC5gLCB0eXBlOiBwYXlsb2FkLm5vdGljZT8udHlwZSA/PyAnc3VjY2VzcycgfSk7XG5cbiAgICAgIGlmIChpbnRlbnQgPT09ICdkdXBsaWNhdGUnICYmIHBheWxvYWQuZHJhZnRSZWNvcmQ/LmlkKSB7XG4gICAgICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IHJlY29yZElkOiBwYXlsb2FkLmRyYWZ0UmVjb3JkLmlkIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW50ZW50ID09PSAnZGVsZXRlJykge1xuICAgICAgICBzZXRSZWNvcmRzKChjdXJyZW50KSA9PiBjdXJyZW50LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gdGFyZ2V0UmVjb3JkSWQpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChyZXF1ZXN0RXJyb3IpIHtcbiAgICAgIHNldEVycm9yKHJlcXVlc3RFcnJvci5tZXNzYWdlKTtcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHJlcXVlc3RFcnJvci5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXBseUNoYW5nZSA9IChmaWVsZCwgdmFsdWUpID0+IHtcbiAgICBzZXRSZXBseURyYWZ0KChjdXJyZW50KSA9PiAoe1xuICAgICAgLi4uY3VycmVudCxcbiAgICAgIFtmaWVsZF06IHZhbHVlLFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZW5kUmVwbHkgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKHBhZ2VOYW1lICE9PSAnbWVzc2FnZXMnIHx8ICFyZWNvcmRJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFNlbmRpbmdSZXBseSh0cnVlKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGludGVudDogJ3NlbmRSZXBseScsXG4gICAgICAgICAgcmVjb3JkSWQsXG4gICAgICAgICAgcmVwbHk6IHJlcGx5RHJhZnQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgaWYgKHBheWxvYWQuZHJhZnRSZWNvcmQpIHtcbiAgICAgICAgY29uc3QgbmV4dERyYWZ0UmVjb3JkID0gY2xvbmVWYWx1ZShwYXlsb2FkLmRyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0UmVjb3JkKG5leHREcmFmdFJlY29yZCk7XG4gICAgICAgIHNldE9yaWdpbmFsUmVjb3JkKGNsb25lVmFsdWUobmV4dERyYWZ0UmVjb3JkKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXlsb2FkLm5vdGljZSkge1xuICAgICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiBwYXlsb2FkLm5vdGljZS5tZXNzYWdlLCB0eXBlOiBwYXlsb2FkLm5vdGljZS50eXBlIH0pO1xuICAgICAgfVxuXG4gICAgICBzZXRSZXBseURyYWZ0KHtcbiAgICAgICAgc3ViamVjdDogcmVwbHlEcmFmdC5zdWJqZWN0IHx8ICdSZTogWW91ciBtZXNzYWdlIHRvIFRoZSBMZWFkZW5oYWxsIFdvcmtzJyxcbiAgICAgICAgYm9keTogJycsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChyZXF1ZXN0RXJyb3IpIHtcbiAgICAgIHNldEVycm9yKHJlcXVlc3RFcnJvci5tZXNzYWdlKTtcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHJlcXVlc3RFcnJvci5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTZW5kaW5nUmVwbHkoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICByZXR1cm4gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiPkNvbGxlY3Rpb24gZGVmaW5pdGlvbiBtaXNzaW5nLjwvTWVzc2FnZUJveD47XG4gIH1cblxuICBpZiAobW9kZSA9PT0gJ2xpc3QnKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMaXN0Vmlld1xuICAgICAgICBkZWZpbml0aW9uPXtkZWZpbml0aW9ufVxuICAgICAgICByZWNvcmRzPXtyZWNvcmRzfVxuICAgICAgICBjb250cm9scz17Y29udHJvbHMgPz8ge1xuICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGVmaW5pdGlvbi5saXN0Q29sdW1ucy5tYXAoKGNvbHVtbikgPT4gY29sdW1uLmZpZWxkKSxcbiAgICAgICAgICBhdmFpbGFibGVGaWVsZHM6IGRlZmluaXRpb24ubGlzdENvbHVtbnMsXG4gICAgICAgICAgZmlsdGVyczogW10sXG4gICAgICAgICAgYWN0aXZlRmlsdGVyczoge30sXG4gICAgICAgICAgc29ydEJ5OiAnJyxcbiAgICAgICAgICBzb3J0T3JkZXI6ICdkZXNjJyxcbiAgICAgICAgfX1cbiAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgIGxvYWRpbmc9e2xpc3RMb2FkaW5nfVxuICAgICAgICBvblNlYXJjaD17KG5leHRTZWFyY2gpID0+IHVwZGF0ZUxpc3RRdWVyeSh7IHNlYXJjaDogbmV4dFNlYXJjaCB9KX1cbiAgICAgICAgb25PcGVuUmVjb3JkPXsobmV4dFJlY29yZElkKSA9PiBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyByZWNvcmRJZDogbmV4dFJlY29yZElkIH0pKX1cbiAgICAgICAgb25DcmVhdGU9e2hhbmRsZUNyZWF0ZX1cbiAgICAgICAgb25TZXRTb3J0PXsoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXh0T3JkZXIgPSBjb250cm9scz8uc29ydEJ5ID09PSBmaWVsZCAmJiBjb250cm9scz8uc29ydE9yZGVyID09PSAnYXNjJyA/ICdkZXNjJyA6ICdhc2MnO1xuICAgICAgICAgIHVwZGF0ZUxpc3RRdWVyeSh7IHNvcnRCeTogZmllbGQsIHNvcnRPcmRlcjogbmV4dE9yZGVyIH0pO1xuICAgICAgICB9fVxuICAgICAgICBvblNldEZpbHRlcj17KGZpZWxkLCB2YWx1ZSkgPT4gdXBkYXRlTGlzdFF1ZXJ5KHsgW2ZpZWxkXTogdmFsdWUgfSl9XG4gICAgICAgIG9uUmVzZXRGaWx0ZXJzPXsoKSA9PiB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgIHN0YXR1czogJycsXG4gICAgICAgICAgY2F0ZWdvcnk6ICcnLFxuICAgICAgICAgIHBsYW5UeXBlOiAnJyxcbiAgICAgICAgICBmZWF0dXJlZDogJycsXG4gICAgICAgICAgaXNGZWF0dXJlZDogJycsXG4gICAgICAgICAgaXNQb3B1bGFyOiAnJyxcbiAgICAgICAgfSl9XG4gICAgICAgIG9uVG9nZ2xlRGlzcGxheWVkRmllbGQ9eyhmaWVsZCwgY2hlY2tlZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5leHRGaWVsZHMgPSBjaGVja2VkXG4gICAgICAgICAgICA/IFsuLi5uZXcgU2V0KFsuLi4oY29udHJvbHM/LmRpc3BsYXllZEZpZWxkcyA/PyBbXSksIGZpZWxkXSldXG4gICAgICAgICAgICA6IChjb250cm9scz8uZGlzcGxheWVkRmllbGRzID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGZpZWxkKTtcblxuICAgICAgICAgIHVwZGF0ZUxpc3RRdWVyeSh7XG4gICAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IG5leHRGaWVsZHMuam9pbignLCcpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9fVxuICAgICAgICBvblJlc2V0RGlzcGxheWVkRmllbGRzPXsoKSA9PiB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGVmaW5pdGlvbi5saXN0Q29sdW1ucy5tYXAoKGNvbHVtbikgPT4gY29sdW1uLmZpZWxkKS5qb2luKCcsJyksXG4gICAgICAgIH0pfVxuICAgICAgICBvbkR1cGxpY2F0ZVJlY29yZD17KHRhcmdldFJlY29yZElkKSA9PiBoYW5kbGVMaXN0QWN0aW9uKCdkdXBsaWNhdGUnLCB0YXJnZXRSZWNvcmRJZCl9XG4gICAgICAgIG9uRGVsZXRlUmVjb3JkPXsodGFyZ2V0UmVjb3JkSWQpID0+IGhhbmRsZUxpc3RBY3Rpb24oJ2RlbGV0ZScsIHRhcmdldFJlY29yZElkKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGlmICghcmVjb3JkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgICA8RWRpdFZpZXdcbiAgICAgICAgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn1cbiAgICAgICAgcmVjb3JkPXtyZWNvcmR9XG4gICAgICBwdWJsaXNoZWRSZWNvcmQ9e3B1Ymxpc2hlZFJlY29yZH1cbiAgICAgIGFjdGl2ZVRhYj17YWN0aXZlVGFifVxuICAgICAgb25Td2l0Y2hUYWI9e3NldEFjdGl2ZVRhYn1cbiAgICAgIHNhdmluZz17c2F2aW5nfVxuICAgICAgZXJyb3I9e2Vycm9yfVxuICAgICAgb25CYWNrPXsoKSA9PiBuYXZpZ2F0ZShgL2FkbWluL3BhZ2VzLyR7cGFnZU5hbWV9YCl9XG4gICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgb25BZGRJdGVtPXtoYW5kbGVBZGRJdGVtfVxuICAgICAgb25SZW1vdmVJdGVtPXtoYW5kbGVSZW1vdmVJdGVtfVxuICAgICAgb25Nb3ZlSXRlbT17aGFuZGxlTW92ZUl0ZW19XG4gICAgICBvblNhdmU9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ3NhdmUnKX1cbiAgICAgIG9uUHVibGlzaD17KCkgPT4gaGFuZGxlU2F2ZUludGVudCgncHVibGlzaCcpfVxuICAgICAgb25EZWxldGU9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ2RlbGV0ZScpfVxuICAgICAgICBvbkRpc2NhcmRDaGFuZ2VzPXtoYW5kbGVEaXNjYXJkQ2hhbmdlc31cbiAgICAgICAgb25VbnB1Ymxpc2g9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ3VucHVibGlzaCcpfVxuICAgICAgICBjYW5TYXZlPXtjYW5TYXZlfVxuICAgICAgICBjYW5QdWJsaXNoPXtjYW5QdWJsaXNofVxuICAgICAgICBjYW5EaXNjYXJkPXtjYW5EaXNjYXJkfVxuICAgICAgICBjYW5VbnB1Ymxpc2g9e2NhblVucHVibGlzaH1cbiAgICAgICAgcmVwbHlEcmFmdD17cmVwbHlEcmFmdH1cbiAgICAgICAgb25SZXBseUNoYW5nZT17aGFuZGxlUmVwbHlDaGFuZ2V9XG4gICAgICAgIG9uU2VuZFJlcGx5PXtoYW5kbGVTZW5kUmVwbHl9XG4gICAgICAgIHNlbmRpbmdSZXBseT17c2VuZGluZ1JlcGx5fVxuICAgICAgICBpc0NyZWF0ZU1vZGU9e2lzTmV3fVxuICAgICAgLz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IExvYWRlciwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbmNvbnN0IE1VTFRJTElORV9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fG1lc3NhZ2V8Ym9keXxzdWJ0aXRsZXxleGNlcnB0fGludHJvfGhvdXJzfGFkZHJlc3N8dGV4dHxwYXJhZ3JhcGh8b3ZlcnZpZXd8Y2hhbGxlbmdlfHJlc3VsdCkvaTtcbmNvbnN0IElNQUdFX0ZJRUxEX1BBVFRFUk4gPSAvKGltYWdlfGJhY2tncm91bmR8bG9nb3x0aHVtYm5haWx8ZmVhdHVyZWQpL2k7XG5jb25zdCBQQVRIX0ZJRUxEX1BBVFRFUk4gPSAvKF5wYXRoJHxQYXRoJCkvO1xuY29uc3QgRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fG1lc3NhZ2V8Ym9keXxzdWJ0aXRsZXxleGNlcnB0fGludHJvfG92ZXJ2aWV3fGNoYWxsZW5nZXxyZXN1bHR8YmFja2dyb3VuZHxpbWFnZXxnYWxsZXJ5fHNlY3Rpb25zfHRlc3RpbW9uaWFsc3xzZXJ2aWNlc3x3aHlDaG9vc2VJdGVtc3xmZWF0dXJlQ2hpcHN8c29jaWFsTGlua3N8ZmFxSXRlbXN8Y29tcGFyaXNvblJvd3N8Y29tcGFyaXNvbkNvbHVtbnN8c3RvcnlQYXJhZ3JhcGhzfHJlbGF0ZWRXb3Jrc3BhY2VzfGNoYWxsZW5nZUl0ZW1zfGFtZW5pdGllc3xuYXZpZ2F0aW9ufGZvb3Rlcnxmb3JtKS9pO1xuY29uc3QgUkVRVUlSRURfRklFTERfUEFUVEVSTiA9IC8oaGVyb1RpdGxlfGhlcm9TdWJ0aXRsZXxzdG9yeVRpdGxlfHdoeUNob29zZVRpdGxlfGFtZW5pdGllc1RpdGxlfHRpdGxlKSQvaTtcbmNvbnN0IFJPVVRFX09QVElPTlMgPSBbXG4gIHsgdmFsdWU6ICcvJywgbGFiZWw6ICdIb21lJyB9LFxuICB7IHZhbHVlOiAnL3ByaWNpbmcnLCBsYWJlbDogJ1ByaWNpbmcnIH0sXG4gIHsgdmFsdWU6ICcvbWVldGluZy1yb29tcycsIGxhYmVsOiAnTWVldGluZyBSb29tcycgfSxcbiAgeyB2YWx1ZTogJy92aXJ0dWFsLW9mZmljZScsIGxhYmVsOiAnVmlydHVhbCBPZmZpY2UnIH0sXG4gIHsgdmFsdWU6ICcvYWJvdXQnLCBsYWJlbDogJ0Fib3V0JyB9LFxuICB7IHZhbHVlOiAnL2NvbnRhY3QnLCBsYWJlbDogJ0NvbnRhY3QnIH0sXG4gIHsgdmFsdWU6ICcvZmFxJywgbGFiZWw6ICdGQVEnIH0sXG4gIHsgdmFsdWU6ICcvYmxvZycsIGxhYmVsOiAnQmxvZycgfSxcbiAgeyB2YWx1ZTogJy9wcml2YWN5JywgbGFiZWw6ICdQcml2YWN5IFBvbGljeScgfSxcbiAgeyB2YWx1ZTogJy90ZXJtcycsIGxhYmVsOiAnVGVybXMnIH0sXG4gIHsgdmFsdWU6ICcvZGFzaGJvYXJkJywgbGFiZWw6ICdEYXNoYm9hcmQnIH0sXG5dO1xuXG5jb25zdCBQQUdFX0xBWU9VVFMgPSB7XG4gICdzaXRlLXNldHRpbmdzJzogW1xuICAgIHsgZmllbGRzOiBbJ3NpdGVOYW1lJywgJ3RhZ2xpbmUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RFbWFpbCcsICdjb250YWN0UGhvbmUnLCAnYWRkcmVzcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnZGVmYXVsdFNlb1RpdGxlJywgJ2RlZmF1bHRTZW9EZXNjcmlwdGlvbiddIH0sXG4gICAgeyBmaWVsZHM6IFsnbmF2aWdhdGlvbiddIH0sXG4gICAgeyBmaWVsZHM6IFsnZm9vdGVyJ10gfSxcbiAgICB7IGZpZWxkczogWydzb2NpYWxMaW5rcyddIH0sXG4gIF0sXG4gIGhvbWVwYWdlOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVybycsICdmZWF0dXJlQ2hpcHMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlcnZpY2VzRXllYnJvdycsICdzZXJ2aWNlc0tpY2tlcicsICdzZXJ2aWNlcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnYWJvdXRIaWdobGlnaHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3doeUNob29zZUV5ZWJyb3cnLCAnd2h5Q2hvb3NlS2lja2VyJywgJ3doeUNob29zZVRpdGxlJywgJ3doeUNob29zZUl0ZW1zJ10gfSxcbiAgICB7IGZpZWxkczogWyd0ZXN0aW1vbmlhbHNFeWVicm93JywgJ3Rlc3RpbW9uaWFsc0tpY2tlcicsICd0ZXN0aW1vbmlhbHNUaXRsZScsICd0ZXN0aW1vbmlhbHMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2dhbGxlcnlFeWVicm93JywgJ2dhbGxlcnlLaWNrZXInLCAnZ2FsbGVyeVRpdGxlJywgJ2dhbGxlcnlJbWFnZXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RGb3JtJ10gfSxcbiAgICB7IGZpZWxkczogWyd2aXNpdFVzVGl0bGUnLCAnYWRkcmVzc0xhYmVsJywgJ2VtYWlsTGFiZWwnLCAncGhvbmVMYWJlbCcsICdvcGVuSG91cnNMYWJlbCcsICd3ZWVrZGF5SG91cnMnLCAnd2Vla2VuZEhvdXJzJywgJ21hcEJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbiAgJ2Fib3V0LXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydzdG9yeVRpdGxlJywgJ3N0b3J5UGFyYWdyYXBocycsICdzdG9yeUltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWyd3aHlDaG9vc2VUaXRsZScsICd3aHlDaG9vc2VJdGVtcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnYW1lbml0aWVzVGl0bGUnLCAnYW1lbml0aWVzSW1hZ2UnLCAnYW1lbml0aWVzJ10gfSxcbiAgXSxcbiAgJ2Jsb2ctcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlYXJjaFBsYWNlaG9sZGVyJywgJ3F1aWNrU2VhcmNoVGl0bGUnLCAncmVjZW50UG9zdHNUaXRsZScsICdjYXRlZ29yaWVzVGl0bGUnLCAncG9wdWxhclRhZ3NUaXRsZScsICdub1Jlc3VsdHNUZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydkZXRhaWxCYWNrTGFiZWwnLCAnZGV0YWlsU2VhcmNoVGl0bGUnLCAnZGV0YWlsU2VhcmNoQnV0dG9uTGFiZWwnLCAnZGV0YWlsUG9wdWxhclRhZ3NUaXRsZScsICdkZXRhaWxSZWNlbnRQb3N0c1RpdGxlJywgJ2RldGFpbFJlbGF0ZWRXb3Jrc3BhY2VzVGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2RldGFpbENvbW1lbnRGb3JtJ10gfSxcbiAgICB7IGZpZWxkczogWydyZWxhdGVkV29ya3NwYWNlcyddIH0sXG4gIF0sXG4gICdwcmljaW5nLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydjb21wYXJpc29uVGl0bGUnLCAnZmVhdHVyZUxpc3RUaXRsZScsICdmZWF0dXJlTGlzdFN1YnRpdGxlJywgJ2NvbXBhcmlzb25Db2x1bW5zJywgJ2NvbXBhcmlzb25Sb3dzJywgJ3JlY29tbWVuZGVkTGFiZWwnLCAncHVyY2hhc2VCdXR0b25MYWJlbCddIH0sXG4gICAgeyBmaWVsZHM6IFsnZmFxVGl0bGUnLCAnZmFxU3VidGl0bGUnLCAnZmFxSXRlbXMnXSB9LFxuICBdLFxuICAnZmFxLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnZXllYnJvdycsICdoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnLCAndGl0bGUnLCAnZGVzY3JpcHRpb24nXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlYXJjaFBsYWNlaG9sZGVyJywgJ25vUmVzdWx0c1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2N0YVRpdGxlJywgJ2N0YURlc2NyaXB0aW9uJywgJ2N0YUJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbiAgJ21lZXRpbmctcm9vbXMtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Jvb21zVGl0bGUnLCAncm9vbXNTdWJ0aXRsZScsICdib29rTm93TGFiZWwnLCAncmVhZE1vcmVMYWJlbCcsICdwb3B1bGFyTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3BsYW5zVGl0bGUnLCAncGxhbnNTdWJ0aXRsZScsICdnZXRTdGFydGVkTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2FtZW5pdGllc1RpdGxlJywgJ2FtZW5pdGllc1N1YnRpdGxlJywgJ2FtZW5pdGllcyddIH0sXG4gIF0sXG4gICd2aXJ0dWFsLW9mZmljZS1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnb3ZlcnZpZXdUaXRsZScsICdvdmVydmlld1RleHQnLCAnZmVhdHVyZWRJbWFnZScsICdnYWxsZXJ5SW1hZ2VzJ10gfSxcbiAgICB7IGZpZWxkczogWydjaGFsbGVuZ2VUaXRsZScsICdjaGFsbGVuZ2VJbnRybycsICdjaGFsbGVuZ2VJdGVtcyddIH0sXG4gICAgeyBmaWVsZHM6IFsncmVzdWx0VGl0bGUnLCAncmVzdWx0VGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnY3RhVGl0bGUnLCAnY3RhRGVzY3JpcHRpb24nLCAnY3RhQnV0dG9uTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Byb2plY3RJbmZvVGl0bGUnLCAncHJvamVjdERhdGVMYWJlbCcsICdwcm9qZWN0RGF0ZVZhbHVlJywgJ3Byb2plY3RXZWJzaXRlTGFiZWwnLCAncHJvamVjdFdlYnNpdGVWYWx1ZScsICdwcm9qZWN0Q2F0ZWdvcnlMYWJlbCcsICdwcm9qZWN0Q2F0ZWdvcnlWYWx1ZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdEZvcm0nXSB9LFxuICBdLFxuICAnY29udGFjdC1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnaW50cm9FeWVicm93JywgJ2ludHJvVGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2FkZHJlc3NDYXJkVGl0bGUnLCAncGhvbmVDYXJkVGl0bGUnLCAnZW1haWxDYXJkVGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2Zvcm0nXSB9LFxuICAgIHsgZmllbGRzOiBbJ21hcFRpdGxlJywgJ21hcERlc2NyaXB0aW9uJ10gfSxcbiAgXSxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnZWZmZWN0aXZlRGF0ZUxhYmVsJywgJ2VmZmVjdGl2ZURhdGVWYWx1ZScsICdpbnRyb1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlY3Rpb25zJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0VGl0bGUnLCAnY29udGFjdEJvZHknLCAnY29udGFjdEJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbiAgJ3Rlcm1zLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnZWZmZWN0aXZlRGF0ZUxhYmVsJywgJ2VmZmVjdGl2ZURhdGVWYWx1ZScsICdpbnRyb1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlY3Rpb25zJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0VGl0bGUnLCAnY29udGFjdEJvZHknLCAnY29udGFjdEJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbn07XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5hZG1pbi1lZGl0b3Ige1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAzMnB4IDQwcHggNjRweCA0MHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLWVkaXRvcl9faW5uZXIge1xuICBtYXgtd2lkdGg6IDEyNDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5hZG1pbi1iYWNrIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbn1cblxuLmFkbWluLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLmFkbWluLW1ldGEge1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xuICBjb2xvcjogIzY2NjY4NztcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4uYWRtaW4tdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMi4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tc3RhdHVzIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgbWFyZ2luLXRvcDogMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2M2ZjBjMjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZWZmZmVkO1xuICBjb2xvcjogIzJmNjg0NjtcbiAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYWRtaW4ta2ViYWIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi10YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWFlZjtcbn1cblxuLmFkbWluLXRhYiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMCAwIDEycHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi10YWItLWFjdGl2ZSB7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tdGFiLS1hY3RpdmU6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogLTFweDtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxZnIpIDIzMnB4O1xuICBnYXA6IDE2cHg7XG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcbn1cblxuLmFkbWluLW1haW4tY2FyZCxcbi5hZG1pbi1zaWRlLWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xufVxuXG4uYWRtaW4tbWFpbi1jYXJkIHtcbiAgcGFkZGluZzogMjRweDtcbn1cblxuLmFkbWluLXNlY3Rpb24gKyAuYWRtaW4tc2VjdGlvbiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5hZG1pbi1maWVsZC1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xuICBnYXA6IDIwcHggMjRweDtcbn1cblxuLmFkbWluLWZpZWxkIHtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uYWRtaW4tZmllbGQtLWZ1bGwge1xuICBncmlkLWNvbHVtbjogMSAvIC0xO1xufVxuXG4uYWRtaW4tbGFiZWwge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAycHg7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5hZG1pbi1sYWJlbF9fcmVxdWlyZWQge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cblxuLmFkbWluLWlucHV0LFxuLmFkbWluLXRleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmFkbWluLWlucHV0IHtcbiAgbWluLWhlaWdodDogMi41cmVtO1xufVxuXG4uYWRtaW4taW5wdXQ6Zm9jdXMsXG4uYWRtaW4tdGV4dGFyZWE6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDFweCAjNDk0NWZmO1xufVxuXG4uYWRtaW4taW5wdXQ6ZGlzYWJsZWQsXG4uYWRtaW4tdGV4dGFyZWE6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLXRleHRhcmVhIHtcbiAgbWluLWhlaWdodDogNS43NXJlbTtcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcbn1cblxuLmFkbWluLW1lZGlhIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDE0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX2VtcHR5IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWFfX3N0YWNrIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fdGh1bWIge1xuICBtYXgtd2lkdGg6IDI0MHB4O1xuICBtYXgtaGVpZ2h0OiAxNDBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuLmFkbWluLW1lZGlhX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fYWN0aW9uIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tbWVkaWFfX2FjdGlvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uYWRtaW4tbWVkaWFfX2ZpbGVuYW1lIHtcbiAgbWF4LXdpZHRoOiAyODBweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uYWRtaW4tbWVkaWFfX3NvdXJjZSB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b24ge1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLW1lZGlhX19lcnJvciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xufVxuXG4uYWRtaW4tb2JqZWN0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tb2JqZWN0X190aXRsZSB7XG4gIG1hcmdpbjogMCAwIDEycHg7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHggMTBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fY291bnQge1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbSArIC5hZG1pbi1yZXBlYXRhYmxlX19pdGVtIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtLS1kcmFnLW92ZXIgc3VtbWFyeSB7XG4gIGJhY2tncm91bmQ6ICNmMGYwZmY7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtW29wZW5dIHN1bW1hcnkge1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZiO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeSB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnk6Oi13ZWJraXQtZGV0YWlscy1tYXJrZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeS1sZWZ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19idWxsZXQge1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogI2YwZjBmNTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjYyNXJlbTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX25hbWUge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbiB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZSB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IGdyYWI7XG4gIHBhZGRpbmc6IDAgMnB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGU6YWN0aXZlIHtcbiAgY3Vyc29yOiBncmFiYmluZztcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmRpc2FibGVkIHtcbiAgY29sb3I6ICNjNGM0ZDI7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQ6ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQ6ZGlzYWJsZWQge1xuICBjb2xvcjogIzhlOGVhOTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2JvZHkge1xuICBwYWRkaW5nOiAxNnB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1zd2l0Y2gge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xufVxuXG4uYWRtaW4tc3dpdGNoIGlucHV0IHtcbiAgYWNjZW50LWNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tc3dpdGNoOmhhcyhpbnB1dDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLXNpZGUtY2FyZCArIC5hZG1pbi1zaWRlLWNhcmQge1xuICBtYXJnaW4tdG9wOiAxMnB4O1xufVxuXG4uYWRtaW4tc2lkZS1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1zaWRlLWNhcmRfX2JvZHkge1xuICBwYWRkaW5nOiAwIDEycHggMTJweDtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLFxuLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLS1tZW51IHtcbiAgd2lkdGg6IDJyZW07XG4gIGZsZXg6IDAgMCAycmVtO1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgKyA4cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDIyMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4xMik7XG4gIHBhZGRpbmc6IDhweCAwO1xuICB6LWluZGV4OiA0MDtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXIge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxMTgwcHgpIHtcbiAgLmFkbWluLWxheW91dCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1lZGl0b3Ige1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0OHB4O1xuICB9XG5cbiAgLmFkbWluLWZpZWxkLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5gO1xuXG5mdW5jdGlvbiB0b0xhYmVsKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVcbiAgICAucmVwbGFjZSgvKFthLXowLTldKShbQS1aXSkvZywgJyQxICQyJylcbiAgICAucmVwbGFjZSgvW18tXSsvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXGJzZW9cXGIvZ2ksICdTRU8nKVxuICAgIC5yZXBsYWNlKC9cXGJjdGFcXGIvZ2ksICdDVEEnKVxuICAgIC5yZXBsYWNlKC9cXGJmYXFcXGIvZ2ksICdGQVEnKVxuICAgIC5yZXBsYWNlKC9cXGJpZFxcYi9naSwgJ0lEJylcbiAgICAucmVwbGFjZSgvXFxidXJsXFxiL2dpLCAnVVJMJylcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgLnRyaW0oKVxuICAgIC5yZXBsYWNlKC9eLi8sICh2YWx1ZSkgPT4gdmFsdWUudG9VcHBlckNhc2UoKSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkTGFiZWwoZmllbGRLZXkpIHtcbiAgaWYgKGZpZWxkS2V5ID09PSAncGF0aCcpIHtcbiAgICByZXR1cm4gJ0Rlc3RpbmF0aW9uJztcbiAgfVxuXG4gIGlmIChmaWVsZEtleS5lbmRzV2l0aCgnUGF0aCcpKSB7XG4gICAgcmV0dXJuIHRvTGFiZWwoZmllbGRLZXkucmVwbGFjZSgvUGF0aCQvLCAnRGVzdGluYXRpb24nKSk7XG4gIH1cblxuICByZXR1cm4gdG9MYWJlbChmaWVsZEtleSk7XG59XG5cbmZ1bmN0aW9uIGdldFBhdGhPcHRpb25zKGN1cnJlbnRWYWx1ZSkge1xuICBjb25zdCBvcHRpb25zID0gWy4uLlJPVVRFX09QVElPTlNdO1xuXG4gIGlmIChjdXJyZW50VmFsdWUgJiYgIW9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IGN1cnJlbnRWYWx1ZSkpIHtcbiAgICBvcHRpb25zLnVuc2hpZnQoe1xuICAgICAgdmFsdWU6IGN1cnJlbnRWYWx1ZSxcbiAgICAgIGxhYmVsOiAnQ3VycmVudCBkZXN0aW5hdGlvbicsXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gY2xvbmVWYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xufVxuXG5mdW5jdGlvbiB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKChpdGVtKSA9PiB0b0NvbXBhcmFibGVWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpXG4gICAgICAuc29ydCgpXG4gICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gJ19fdGVtcElkJylcbiAgICAgIC5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBrZXkpID0+IHtcbiAgICAgICAgYWNjdW11bGF0b3Jba2V5XSA9IHRvQ29tcGFyYWJsZVZhbHVlKHZhbHVlW2tleV0pO1xuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9LCB7fSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGhhc01lYW5pbmdmdWxWYWx1ZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUuc29tZSgoaXRlbSkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKGl0ZW0pKTtcbiAgfVxuXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh2YWx1ZSlcbiAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09ICdfX3RlbXBJZCcpXG4gICAgICAuc29tZSgoWywgbmVzdGVkVmFsdWVdKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUobmVzdGVkVmFsdWUpKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdmFsdWUgIT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVuYW1lKHVybCkge1xuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhuYW1lID0gbmV3IFVSTCh1cmwpLnBhdGhuYW1lO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aG5hbWUuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICByZXR1cm4gZmlsZW5hbWUgfHwgdXJsO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KCcvJykucG9wKCkgfHwgdXJsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEVtcHR5SXRlbShzYW1wbGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2FtcGxlKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmIChzYW1wbGUgJiYgdHlwZW9mIHNhbXBsZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgT2JqZWN0LmtleXMoc2FtcGxlKVxuICAgICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gJ2lkJylcbiAgICAgICAgLm1hcCgoa2V5KSA9PiBba2V5LCBnZXRFbXB0eUl0ZW0oc2FtcGxlW2tleV0pXSksXG4gICAgKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2FtcGxlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHNhbXBsZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXRQYXRoKHZhbHVlLCBwYXRoLCBuZXh0VmFsdWUpIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXh0VmFsdWU7XG4gIH1cblxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSB1cGRhdGVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgbmV4dFZhbHVlKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBdFBhdGgodmFsdWUsIHBhdGgpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZS5maWx0ZXIoKF8sIGluZGV4KSA9PiBpbmRleCAhPT0gcGF0aFswXSk7XG4gIH1cblxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSByZW1vdmVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kQXRQYXRoKHZhbHVlLCBwYXRoLCBuZXh0SXRlbSkge1xuICBpZiAoIXBhdGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFsuLi4oQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdKSwgbmV4dEl0ZW1dO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gYXBwZW5kQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRJdGVtKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoLCBvZmZzZXQpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gcGF0aFswXTtcbiAgICBjb25zdCBuZXh0SW5kZXggPSBpbmRleCArIG9mZnNldDtcblxuICAgIGlmIChuZXh0SW5kZXggPCAwIHx8IG5leHRJbmRleCA+PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9uZSA9IFsuLi52YWx1ZV07XG4gICAgY29uc3QgW21vdmVkXSA9IGNsb25lLnNwbGljZShpbmRleCwgMSk7XG4gICAgY2xvbmUuc3BsaWNlKG5leHRJbmRleCwgMCwgbW92ZWQpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IG1vdmVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgb2Zmc2V0KTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBwYXJzZUlucHV0VmFsdWUobmV4dFJhd1ZhbHVlLCBjdXJyZW50VmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBjdXJyZW50VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKG5leHRSYXdWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0UmF3VmFsdWUpO1xuICAgIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkKSA/IGN1cnJlbnRWYWx1ZSA6IHBhcnNlZDtcbiAgfVxuXG4gIHJldHVybiBuZXh0UmF3VmFsdWU7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVNZWRpYVByZXZpZXdVcmwodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xuXG4gIGlmICghdHJpbW1lZCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmICgvXmh0dHBzPzpcXC9cXC8vaS50ZXN0KHRyaW1tZWQpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnZGF0YTppbWFnZS8nKSkge1xuICAgIHJldHVybiB0cmltbWVkO1xuICB9XG5cbiAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgcmV0dXJuIHRyaW1tZWQ7XG4gIH1cblxuICByZXR1cm4gYC8ke3RyaW1tZWQucmVwbGFjZSgvXlxcLj9cXC8vLCAnJyl9YDtcbn1cblxuZnVuY3Rpb24gdG9BZG1pbkVycm9yTWVzc2FnZShlcnJvciwgZmFsbGJhY2spIHtcbiAgY29uc3QgcmVzcG9uc2VEYXRhID0gZXJyb3I/LnJlc3BvbnNlPy5kYXRhO1xuXG4gIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhPy5tZXNzYWdlID09PSAnc3RyaW5nJyAmJiByZXNwb25zZURhdGEubWVzc2FnZS50cmltKCkpIHtcbiAgICByZXR1cm4gcmVzcG9uc2VEYXRhLm1lc3NhZ2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YT8uZXJyb3IgPT09ICdzdHJpbmcnICYmIHJlc3BvbnNlRGF0YS5lcnJvci50cmltKCkpIHtcbiAgICByZXR1cm4gcmVzcG9uc2VEYXRhLmVycm9yO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlcnJvcj8ubWVzc2FnZSA9PT0gJ3N0cmluZycgJiYgZXJyb3IubWVzc2FnZS50cmltKCkpIHtcbiAgICByZXR1cm4gZXJyb3IubWVzc2FnZTtcbiAgfVxuXG4gIHJldHVybiBmYWxsYmFjaztcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkQWRtaW5JbWFnZShmaWxlKSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvbWVkaWEvdXBsb2FkJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvciB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgfVxuXG4gIGNvbnN0IHVwbG9hZGVkVXJsID0gcGF5bG9hZD8udXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnJlbGF0aXZlVXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnVybDtcblxuICBpZiAoIXVwbG9hZGVkVXJsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgc3VjY2VlZGVkIGJ1dCByZXR1cm5lZCBubyBVUkwuJyk7XG4gIH1cblxuICByZXR1cm4gdXBsb2FkZWRVcmw7XG59XG5cbmNvbnN0IE1FRElBX1BJQ0tFUl9FVkVOVCA9ICdhZG1pbmpzLW1lZGlhLXNlbGVjdCc7XG5cbmZ1bmN0aW9uIGNob29zZUFkbWluTGlicmFyeUltYWdlKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGlja2VyV2luZG93ID0gd2luZG93Lm9wZW4oXG4gICAgICAnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnk/cGlja2VyPTEnLFxuICAgICAgJ2FkbWluLW1lZGlhLWxpYnJhcnktcGlja2VyJyxcbiAgICAgICdwb3B1cD15ZXMsd2lkdGg9MTQ0MCxoZWlnaHQ9OTAwLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMnLFxuICAgICk7XG5cbiAgICBpZiAoIXBpY2tlcldpbmRvdykge1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcignTWVkaWEgbGlicmFyeSBwb3B1cCB3YXMgYmxvY2tlZC4nKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGNsb3NlV2F0Y2hlcik7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgZXZlbnQuc291cmNlICE9PSBwaWNrZXJXaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuZGF0YT8udHlwZSAhPT0gTUVESUFfUElDS0VSX0VWRU5UKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgY2xlYW51cCgpO1xuICAgICAgcmVzb2x2ZSh0eXBlb2YgZXZlbnQuZGF0YS51cmwgPT09ICdzdHJpbmcnID8gZXZlbnQuZGF0YS51cmwgOiAnJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsb3NlV2F0Y2hlciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAocGlja2VyV2luZG93LmNsb3NlZCAmJiAhZmluaXNoZWQpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgIH1cbiAgICB9LCA1MDApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzUmVxdWlyZWRGaWVsZChmaWVsZEtleSkge1xuICByZXR1cm4gUkVRVUlSRURfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkS2V5KTtcbn1cblxuZnVuY3Rpb24gZmllbGRDbGFzc05hbWUoZmllbGRLZXksIHZhbHVlKSB7XG4gIHJldHVybiBGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSkgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbidcbiAgICA/ICdhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbCdcbiAgICA6ICdhZG1pbi1maWVsZCc7XG59XG5cbmZ1bmN0aW9uIGlzSGlkZGVuRWRpdG9yRmllbGQoZmllbGRLZXkpIHtcbiAgcmV0dXJuIFN0cmluZyhmaWVsZEtleSkudG9Mb3dlckNhc2UoKSA9PT0gJ2ljb24nO1xufVxuXG5mdW5jdGlvbiBnZXRJdGVtVGl0bGUoaXRlbSwgZmFsbGJhY2tMYWJlbCwgaW5kZXgpIHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGl0ZW0pKSB7XG4gICAgcmV0dXJuIGAke2ZhbGxiYWNrTGFiZWx9ICR7aW5kZXggKyAxfWA7XG4gIH1cblxuICBjb25zdCBwcmVmZXJyZWQgPSBbXG4gICAgaXRlbS50aXRsZSxcbiAgICBpdGVtLm5hbWUsXG4gICAgaXRlbS5sYWJlbCxcbiAgICBpdGVtLnF1ZXN0aW9uLFxuICAgIGl0ZW0uZmVhdHVyZSxcbiAgICBpdGVtLnBhdGgsXG4gICAgaXRlbS5ocmVmLFxuICAgIGl0ZW0uYWx0LFxuICBdLmZpbmQoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRyaW0oKSk7XG5cbiAgcmV0dXJuIHByZWZlcnJlZCB8fCBgJHtmYWxsYmFja0xhYmVsfSAke2luZGV4ICsgMX1gO1xufVxuXG5mdW5jdGlvbiBidWlsZFNlY3Rpb25zKHBhZ2VOYW1lLCBjb250ZW50KSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhjb250ZW50ID8/IHt9KTtcbiAgY29uc3QgbGF5b3V0ID0gUEFHRV9MQVlPVVRTW3BhZ2VOYW1lXTtcblxuICBpZiAoIWxheW91dCkge1xuICAgIHJldHVybiBbeyBlbnRyaWVzIH1dO1xuICB9XG5cbiAgY29uc3QgdXNlZCA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgc2VjdGlvbnMgPSBsYXlvdXRcbiAgICAubWFwKChzZWN0aW9uKSA9PiB7XG4gICAgICBjb25zdCBzZWN0aW9uRW50cmllcyA9IHNlY3Rpb24uZmllbGRzXG4gICAgICAgIC5maWx0ZXIoKGZpZWxkKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29udGVudCA/PyB7fSwgZmllbGQpKVxuICAgICAgICAubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIHVzZWQuYWRkKGZpZWxkKTtcbiAgICAgICAgICByZXR1cm4gW2ZpZWxkLCBjb250ZW50W2ZpZWxkXV07XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4geyAuLi5zZWN0aW9uLCBlbnRyaWVzOiBzZWN0aW9uRW50cmllcyB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigoc2VjdGlvbikgPT4gc2VjdGlvbi5lbnRyaWVzLmxlbmd0aCA+IDApO1xuXG4gIGNvbnN0IGV4dHJhRW50cmllcyA9IGVudHJpZXMuZmlsdGVyKChbZmllbGRLZXldKSA9PiAhdXNlZC5oYXMoZmllbGRLZXkpKTtcblxuICBpZiAoZXh0cmFFbnRyaWVzLmxlbmd0aCkge1xuICAgIHNlY3Rpb25zLnB1c2goeyBlbnRyaWVzOiBleHRyYUVudHJpZXMgfSk7XG4gIH1cblxuICByZXR1cm4gc2VjdGlvbnM7XG59XG5cbmZ1bmN0aW9uIFByaW1pdGl2ZUZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBsYWJlbCA9IGdldEZpZWxkTGFiZWwoZmllbGRLZXkpO1xuICBjb25zdCBpbnB1dFZhbHVlID0gdmFsdWUgPz8gJyc7XG4gIGNvbnN0IHJlcXVpcmVkID0gaXNSZXF1aXJlZEZpZWxkKGZpZWxkS2V5KTtcbiAgY29uc3QgaXNJbWFnZUZpZWxkID0gdHlwZW9mIGlucHV0VmFsdWUgPT09ICdzdHJpbmcnICYmIElNQUdFX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSk7XG4gIGNvbnN0IGlzUGF0aEZpZWxkID0gdHlwZW9mIGlucHV0VmFsdWUgPT09ICdzdHJpbmcnICYmIFBBVEhfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkS2V5KTtcbiAgY29uc3QgcHJldmlld1VybCA9IGlzSW1hZ2VGaWVsZCA/IHJlc29sdmVNZWRpYVByZXZpZXdVcmwoaW5wdXRWYWx1ZSkgOiAnJztcbiAgY29uc3Qgc2hvd1ByZXZpZXcgPSBCb29sZWFuKHByZXZpZXdVcmwpO1xuICBjb25zdCBmaWxlSW5wdXRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRpbmcsIHNldFVwbG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1cGxvYWRFcnJvciwgc2V0VXBsb2FkRXJyb3JdID0gdXNlU3RhdGUoJycpO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZmllbGRDbGFzc05hbWUoZmllbGRLZXksIHZhbHVlKX0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICB7cmVxdWlyZWQgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbF9fcmVxdWlyZWRcIj4qPC9zcGFuPiA6IG51bGx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc3dpdGNoXCI+XG4gICAgICAgICAgPHNwYW4+e3ZhbHVlID8gJ0VuYWJsZWQnIDogJ0Rpc2FibGVkJ308L3NwYW4+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgY2hlY2tlZD17dmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBldmVudC50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKGlzSW1hZ2VGaWVsZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICB7cmVxdWlyZWQgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbF9fcmVxdWlyZWRcIj4qPC9zcGFuPiA6IG51bGx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19jYW52YXNcIj5cbiAgICAgICAgICAgIHtzaG93UHJldmlldyA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc3RhY2tcIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX190aHVtYlwiIHNyYz17cHJldmlld1VybH0gYWx0PXtsYWJlbH0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbihwcmV2aWV3VXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4oaXXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHBhdGgsICcnKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4pyVXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19maWxlbmFtZVwiPntnZXRGaWxlbmFtZShpbnB1dFZhbHVlKX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lbXB0eVwiPlVwbG9hZCBhbiBpbWFnZSB0byBhdHRhY2ggbWVkaWEuPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHVwbG9hZGluZ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcignJyk7XG5cbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVXJsID0gYXdhaXQgY2hvb3NlQWRtaW5MaWJyYXJ5SW1hZ2UoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBzZWxlY3RlZFVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gY2hvb3NlIGltYWdlIGZyb20gbWVkaWEgbGlicmFyeS4nKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQ2hvb3NlIGZyb20gbWVkaWEgbGlicmFyeVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgcmVmPXtmaWxlSW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXthc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlcz8uWzBdO1xuICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWRGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGxvYWRlZFVybCA9IGF3YWl0IHVwbG9hZEFkbWluSW1hZ2Uoc2VsZWN0ZWRGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UocGF0aCwgdXBsb2FkZWRVcmwpO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt1cGxvYWRFcnJvciA/IDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2Vycm9yXCI+e3VwbG9hZEVycm9yfTwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2ZpZWxkQ2xhc3NOYW1lKGZpZWxkS2V5LCB2YWx1ZSl9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgICAge3JlcXVpcmVkID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgPC9sYWJlbD5cbiAgICAgIHtpc1BhdGhGaWVsZCA/IChcbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgZGVzdGluYXRpb248L29wdGlvbj5cbiAgICAgICAgICB7Z2V0UGF0aE9wdGlvbnMoaW5wdXRWYWx1ZSkubWFwKChvcHRpb24pID0+IChcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHRpb24udmFsdWUgfHwgJ2VtcHR5J30gdmFsdWU9e29wdGlvbi52YWx1ZX0+XG4gICAgICAgICAgICAgIHtvcHRpb24ubGFiZWx9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICApIDogTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSkgPyAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXRleHRhcmVhXCJcbiAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgcGFyc2VJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSwgdmFsdWUpKX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICB0eXBlPXt0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gJ251bWJlcicgOiAndGV4dCd9XG4gICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBPYmplY3RGaWVsZCh7IGZpZWxkS2V5LCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyh2YWx1ZSA/PyB7fSkuZmlsdGVyKChbbmVzdGVkS2V5XSkgPT4gbmVzdGVkS2V5ICE9PSAnaWQnICYmICFpc0hpZGRlbkVkaXRvckZpZWxkKG5lc3RlZEtleSkpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1vYmplY3RcIj5cbiAgICAgICAgPGg0IGNsYXNzTmFtZT1cImFkbWluLW9iamVjdF9fdGl0bGVcIj57dG9MYWJlbChmaWVsZEtleSl9PC9oND5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAge2VudHJpZXMubWFwKChbbmVzdGVkS2V5LCBuZXN0ZWRWYWx1ZV0pID0+IChcbiAgICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICAgIGtleT17YCR7ZmllbGRLZXl9LSR7bmVzdGVkS2V5fWB9XG4gICAgICAgICAgICAgIGZpZWxkS2V5PXtuZXN0ZWRLZXl9XG4gICAgICAgICAgICAgIHZhbHVlPXtuZXN0ZWRWYWx1ZX1cbiAgICAgICAgICAgICAgcGF0aD17Wy4uLnBhdGgsIG5lc3RlZEtleV19XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgb25BZGRJdGVtPXtvbkFkZEl0ZW19XG4gICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBBcnJheUZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSB0b0xhYmVsKGZpZWxkS2V5KTtcbiAgY29uc3Qgc2FtcGxlID0gdmFsdWVbMF0gPz8gJyc7XG4gIGNvbnN0IFtkcmFnSW5kZXgsIHNldERyYWdJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2RyYWdPdmVySW5kZXgsIHNldERyYWdPdmVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX190aXRsZVwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fY291bnRcIj57dmFsdWUubGVuZ3RofSBlbnRyeXt2YWx1ZS5sZW5ndGggPT09IDEgPyAnJyA6ICdpZXMnfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7dmFsdWUubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxkZXRhaWxzXG4gICAgICAgICAgICBrZXk9e2Ake2ZpZWxkS2V5fS0ke2luZGV4fWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yZXBlYXRhYmxlX19pdGVtJHtkcmFnT3ZlckluZGV4ID09PSBpbmRleCA/ICcgYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyJyA6ICcnfWB9XG4gICAgICAgICAgICBvcGVuPXtpbmRleCA9PT0gMH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaWYgKGRyYWdPdmVySW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyb3A9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gaW5kZXggLSBkcmFnSW5kZXg7XG4gICAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgICAgICAgICAgICBvbk1vdmVJdGVtKFsuLi5wYXRoLCBkcmFnSW5kZXhdLCBvZmZzZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldERyYWdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChudWxsKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyYWdMZWF2ZT17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19idWxsZXRcIj7ilrw8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fbmFtZVwiPntnZXRJdGVtVGl0bGUoaXRlbSwgbGFiZWwsIGluZGV4KX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtKFsuLi5wYXRoLCBpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIPCfl5FcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZT17IWRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEcmFnIHRvIHJlb3JkZXJcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyhpbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDii67ii65cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3N1bW1hcnk+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgICAge2lzUGxhaW5PYmplY3QoaXRlbSkgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoW25lc3RlZEtleV0pID0+IG5lc3RlZEtleSAhPT0gJ2lkJyAmJiAhaXNIaWRkZW5FZGl0b3JGaWVsZChuZXN0ZWRLZXkpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKChbbmVzdGVkS2V5LCBuZXN0ZWRWYWx1ZV0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8RmllbGRSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtgJHtmaWVsZEtleX0tJHtpbmRleH0tJHtuZXN0ZWRLZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkS2V5PXtuZXN0ZWRLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmVzdGVkVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoPXtbLi4ucGF0aCwgaW5kZXgsIG5lc3RlZEtleV19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFkZEl0ZW09e29uQWRkSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3ZlSXRlbT17b25Nb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8UHJpbWl0aXZlRmllbGRcbiAgICAgICAgICAgICAgICAgIGZpZWxkS2V5PXtgJHtmaWVsZEtleX0tJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW19XG4gICAgICAgICAgICAgICAgICBwYXRoPXtbLi4ucGF0aCwgaW5kZXhdfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICkpfVxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19hZGRcIlxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkFkZEl0ZW0ocGF0aCwgZ2V0RW1wdHlJdGVtKHNhbXBsZSkpfVxuICAgICAgICA+XG4gICAgICAgICAgKyBBZGQgYW4gZW50cnlcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRmllbGRSZW5kZXJlcihwcm9wcykge1xuICBjb25zdCB7IHZhbHVlIH0gPSBwcm9wcztcblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gPEFycmF5RmllbGQgey4uLnByb3BzfSAvPjtcbiAgfVxuXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiA8T2JqZWN0RmllbGQgey4uLnByb3BzfSAvPjtcbiAgfVxuXG4gIHJldHVybiA8UHJpbWl0aXZlRmllbGQgey4uLnByb3BzfSAvPjtcbn1cblxuZnVuY3Rpb24gRm9ybVNlY3Rpb24oeyBlbnRyaWVzLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNlY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQtZ3JpZFwiPlxuICAgICAgICB7ZW50cmllcy5tYXAoKFtmaWVsZEtleSwgdmFsdWVdKSA9PiAoXG4gICAgICAgICAgaXNIaWRkZW5FZGl0b3JGaWVsZChmaWVsZEtleSkgPyBudWxsIDogKFxuICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICBrZXk9e2ZpZWxkS2V5fVxuICAgICAgICAgICAgZmllbGRLZXk9e2ZpZWxkS2V5fVxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgcGF0aD17W2ZpZWxkS2V5XX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgIG9uQWRkSXRlbT17b25BZGRJdGVtfVxuICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19XG4gICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgKVxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb250ZW50UGFnZUVkaXRvcigpIHtcbiAgY29uc3QgeyBwYWdlTmFtZSB9ID0gdXNlUGFyYW1zKCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZUxhYmVsLCBzZXRQYWdlTGFiZWxdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbY29udGVudCwgc2V0Q29udGVudF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtvcmlnaW5hbENvbnRlbnQsIHNldE9yaWdpbmFsQ29udGVudF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtwdWJsaXNoZWRDb250ZW50LCBzZXRQdWJsaXNoZWRDb250ZW50XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2RyYWZ0Jyk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbWVudU9wZW4sIHNldE1lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgYWRkTm90aWNlID0gdXNlTm90aWNlKCk7XG4gIGNvbnN0IG1lbnVSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgY29uc3QgZGlzcGxheWVkQ29udGVudCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkQ29udGVudCA/IHB1Ymxpc2hlZENvbnRlbnQgOiBjb250ZW50KSxcbiAgICBbYWN0aXZlVGFiLCBjb250ZW50LCBwdWJsaXNoZWRDb250ZW50XSxcbiAgKTtcbiAgY29uc3QgaXNQdWJsaXNoZWRWaWV3ID0gYWN0aXZlVGFiID09PSAncHVibGlzaGVkJyAmJiBwdWJsaXNoZWRDb250ZW50O1xuICBjb25zdCBpc0RpcnR5ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShjb250ZW50KSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKG9yaWdpbmFsQ29udGVudCkpLFxuICAgIFtjb250ZW50LCBvcmlnaW5hbENvbnRlbnRdLFxuICApO1xuICBjb25zdCBoYXNEcmFmdENvbnRlbnQgPSB1c2VNZW1vKCgpID0+IGhhc01lYW5pbmdmdWxWYWx1ZShjb250ZW50KSwgW2NvbnRlbnRdKTtcbiAgY29uc3QgaGFzVW5wdWJsaXNoZWRDaGFuZ2VzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShjb250ZW50KSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKHB1Ymxpc2hlZENvbnRlbnQpKSxcbiAgICBbY29udGVudCwgcHVibGlzaGVkQ29udGVudF0sXG4gICk7XG4gIGNvbnN0IGNhblNhdmUgPSAhaXNQdWJsaXNoZWRWaWV3ICYmICFzYXZpbmcgJiYgaXNEaXJ0eTtcbiAgY29uc3QgY2FuUHVibGlzaCA9ICFpc1B1Ymxpc2hlZFZpZXcgJiYgIXNhdmluZyAmJiAocHVibGlzaGVkQ29udGVudCA/IGhhc1VucHVibGlzaGVkQ2hhbmdlcyA6IGhhc0RyYWZ0Q29udGVudCk7XG4gIGNvbnN0IGNhbkRpc2NhcmQgPSAhc2F2aW5nICYmICFpc1B1Ymxpc2hlZFZpZXcgJiYgaGFzRHJhZnRDb250ZW50O1xuICBjb25zdCBjYW5VbnB1Ymxpc2ggPSAhc2F2aW5nICYmIEJvb2xlYW4ocHVibGlzaGVkQ29udGVudCk7XG4gIGNvbnN0IHNlY3Rpb25zID0gdXNlTWVtbygoKSA9PiBidWlsZFNlY3Rpb25zKHBhZ2VOYW1lLCBkaXNwbGF5ZWRDb250ZW50KSwgW3BhZ2VOYW1lLCBkaXNwbGF5ZWRDb250ZW50XSk7XG4gIGNvbnN0IGVudHJ5VGl0bGUgPSB1c2VNZW1vKCgpID0+IChcbiAgICBkaXNwbGF5ZWRDb250ZW50Py5oZXJvVGl0bGVcbiAgICB8fCBkaXNwbGF5ZWRDb250ZW50Py50aXRsZVxuICAgIHx8IGRpc3BsYXllZENvbnRlbnQ/LnNpdGVOYW1lXG4gICAgfHwgcGFnZUxhYmVsXG4gICksIFtkaXNwbGF5ZWRDb250ZW50LCBwYWdlTGFiZWxdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgbG9hZFBhZ2UgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3IoJycpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXRQYWdlKHsgcGFnZU5hbWUgfSk7XG5cbiAgICAgICAgaWYgKCFpc01vdW50ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0RHJhZnRDb250ZW50ID0gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLmRyYWZ0RGF0YSA/PyByZXNwb25zZS5kYXRhLmRhdGEgPz8ge30pO1xuICAgICAgICBzZXRDb250ZW50KG5leHREcmFmdENvbnRlbnQpO1xuICAgICAgICBzZXRPcmlnaW5hbENvbnRlbnQoY2xvbmVWYWx1ZShuZXh0RHJhZnRDb250ZW50KSk7XG4gICAgICAgIHNldFB1Ymxpc2hlZENvbnRlbnQocmVzcG9uc2UuZGF0YS5wdWJsaXNoZWREYXRhID8gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLnB1Ymxpc2hlZERhdGEpIDogbnVsbCk7XG4gICAgICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgICBzZXRQYWdlTGFiZWwocmVzcG9uc2UuZGF0YS5sYWJlbCA/PyB0b0xhYmVsKHBhZ2VOYW1lKSk7XG4gICAgICB9IGNhdGNoIChsb2FkRXJyb3IpIHtcbiAgICAgICAgaWYgKCFpc01vdW50ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvcih0b0FkbWluRXJyb3JNZXNzYWdlKGxvYWRFcnJvciwgJ0ZhaWxlZCB0byBsb2FkIHRoaXMgY29udGVudCBwYWdlLicpKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChpc01vdW50ZWQpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkUGFnZSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzTW91bnRlZCA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFtwYWdlTmFtZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtZW51T3Blbikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKG1lbnVSZWYuY3VycmVudCAmJiAhbWVudVJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICB9O1xuICB9LCBbbWVudU9wZW5dKTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAocGF0aCwgbmV4dFZhbHVlKSA9PiB7XG4gICAgc2V0Q29udGVudCgoY3VycmVudFZhbHVlKSA9PiB1cGRhdGVBdFBhdGgoY3VycmVudFZhbHVlLCBwYXRoLCBuZXh0VmFsdWUpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRJdGVtID0gKHBhdGgsIG5leHRJdGVtKSA9PiB7XG4gICAgc2V0Q29udGVudCgoY3VycmVudFZhbHVlKSA9PiBhcHBlbmRBdFBhdGgoY3VycmVudFZhbHVlLCBwYXRoLCBuZXh0SXRlbSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZUl0ZW0gPSAocGF0aCkgPT4ge1xuICAgIHNldENvbnRlbnQoKGN1cnJlbnRWYWx1ZSkgPT4gcmVtb3ZlQXRQYXRoKGN1cnJlbnRWYWx1ZSwgcGF0aCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdmVJdGVtID0gKHBhdGgsIG9mZnNldCkgPT4ge1xuICAgIHNldENvbnRlbnQoKGN1cnJlbnRWYWx1ZSkgPT4gbW92ZUF0UGF0aChjdXJyZW50VmFsdWUsIHBhdGgsIG9mZnNldCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhdmUgPSBhc3luYyAoaW50ZW50ID0gJ3NhdmUnKSA9PiB7XG4gICAgc2V0U2F2aW5nKHRydWUpO1xuICAgIHNldEVycm9yKCcnKTtcbiAgICBzZXRNZW51T3BlbihmYWxzZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0UGFnZSh7XG4gICAgICAgIHBhZ2VOYW1lLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgZGF0YTogeyBjb250ZW50LCBpbnRlbnQgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBuZXh0RHJhZnRDb250ZW50ID0gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLmRyYWZ0RGF0YSA/PyByZXNwb25zZS5kYXRhLmRhdGEgPz8ge30pO1xuICAgICAgc2V0Q29udGVudChuZXh0RHJhZnRDb250ZW50KTtcbiAgICAgIHNldE9yaWdpbmFsQ29udGVudChjbG9uZVZhbHVlKG5leHREcmFmdENvbnRlbnQpKTtcbiAgICAgIHNldFB1Ymxpc2hlZENvbnRlbnQocmVzcG9uc2UuZGF0YS5wdWJsaXNoZWREYXRhID8gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLnB1Ymxpc2hlZERhdGEpIDogbnVsbCk7XG4gICAgICBpZiAoaW50ZW50ID09PSAndW5wdWJsaXNoJykge1xuICAgICAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgICB9XG4gICAgICBhZGROb3RpY2Uoe1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5kYXRhLm5vdGljZT8ubWVzc2FnZSA/PyBgJHtwYWdlTGFiZWx9IHNhdmVkLmAsXG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKHNhdmVFcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHRvQWRtaW5FcnJvck1lc3NhZ2Uoc2F2ZUVycm9yLCAnRmFpbGVkIHRvIHNhdmUgdGhpcyBjb250ZW50IHBhZ2UuJyk7XG4gICAgICBzZXRFcnJvcihtZXNzYWdlKTtcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURpc2NhcmRDaGFuZ2VzID0gKCkgPT4ge1xuICAgIHNldENvbnRlbnQoZ2V0RW1wdHlJdGVtKGNvbnRlbnQpKTtcbiAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICB9O1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvcl9faW5uZXJcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWJhY2tcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gd2luZG93Lmhpc3RvcnkuYmFjaygpfT5cbiAgICAgICAgICAgIOKGkCBCYWNrXG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZXRhXCI+U2luZ2xlIFR5cGU8L2Rpdj5cbiAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLXRpdGxlXCI+e2VudHJ5VGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc3RhdHVzXCI+e3B1Ymxpc2hlZENvbnRlbnQgPyAnUHVibGlzaGVkJyA6ICdEcmFmdCd9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXRhYnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgYWRtaW4tdGFiJHthY3RpdmVUYWIgPT09ICdkcmFmdCcgPyAnIGFkbWluLXRhYi0tYWN0aXZlJyA6ICcnfWB9IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyl9PlxuICAgICAgICAgICAgICBEUkFGVFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXRhYiR7YWN0aXZlVGFiID09PSAncHVibGlzaGVkJyA/ICcgYWRtaW4tdGFiLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHB1Ymxpc2hlZENvbnRlbnQgJiYgc2V0QWN0aXZlVGFiKCdwdWJsaXNoZWQnKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUFVCTElTSEVEXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxheW91dFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tYWluLWNhcmRcIj5cbiAgICAgICAgICAgICAge3NlY3Rpb25zLm1hcCgoc2VjdGlvbiwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8Rm9ybVNlY3Rpb25cbiAgICAgICAgICAgICAgICAgIGtleT17YHNlY3Rpb24tJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgZW50cmllcz17c2VjdGlvbi5lbnRyaWVzfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIG9uQWRkSXRlbT17aGFuZGxlQWRkSXRlbX1cbiAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17aGFuZGxlUmVtb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgIG9uTW92ZUl0ZW09e2hhbmRsZU1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzUHVibGlzaGVkVmlld31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YXNpZGU+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2hlYWRcIj5FbnRyeTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2F2ZSgncHVibGlzaCcpfSBkaXNhYmxlZD17IWNhblB1Ymxpc2h9PlxuICAgICAgICAgICAgICAgICAgICAgIFB1Ymxpc2hcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IGFkbWluLXNpZGUtYnV0dG9uLS1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRNZW51T3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAg4oCmXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICB7bWVudU9wZW4gPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9e21lbnVSZWZ9IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSBhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2F2ZSgndW5wdWJsaXNoJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuVW5wdWJsaXNofVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uXCI+w5c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFVucHVibGlzaFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURpc2NhcmRDaGFuZ2VzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhbkRpc2NhcmR9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2ljb25cIj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgRGlzY2FyZCBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2F2ZSgnc2F2ZScpfSBkaXNhYmxlZD17IWNhblNhdmV9PlxuICAgICAgICAgICAgICAgICAgICB7c2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvYXNpZGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBMb2FkZXIsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgTUVESUFfUElDS0VSX0VWRU5UID0gJ2FkbWluanMtbWVkaWEtc2VsZWN0JztcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLW1lZGlhLXBhZ2Uge1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAyOHB4IDQwcHggNDhweCA0MHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiAxODYwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdG9wIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyOHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogM3JlbTtcbiAgbGluZS1oZWlnaHQ6IDMuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uLFxuLmFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeSxcbi5hZG1pbi1tZWRpYS1wYWdlX19pY29uLWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwIDFyZW07XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDk0NWZmO1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgcGFkZGluZzogMCAxLjI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyOHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhci1sZWZ0LFxuLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItcmlnaHQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zcXVhcmUsXG4uYWRtaW4tbWVkaWEtcGFnZV9faWNvbi1idXR0b24ge1xuICB3aWR0aDogMi41cmVtO1xuICBoZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3NlbGVjdCxcbi5hZG1pbi1tZWRpYS1wYWdlX19zZWFyY2gge1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHBhZGRpbmc6IDAgMXJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fc2VhcmNoIHtcbiAgbWluLXdpZHRoOiAyODBweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3NlbGVjdCB7XG4gIG1pbi13aWR0aDogMjY4cHg7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zZWN0aW9uLXRpdGxlIHtcbiAgbWFyZ2luOiAwIDAgMThweDtcbiAgZm9udC1zaXplOiAycmVtO1xuICBsaW5lLWhlaWdodDogMi41cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fY291bnQge1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLW1lZGlhLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgzMjBweCwgMWZyKSk7XG4gIGdhcDogMjRweDtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkOmhvdmVyIHtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDgpO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fcHJldmlldyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLWhlaWdodDogMjU2cHg7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGJhY2tncm91bmQ6XG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KSxcbiAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmNmY2ZjkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2Y2ZjZmOSA3NSUsICNmNmY2ZjkpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAsIDEycHggMTJweDtcbiAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19jaGVja2JveCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxNnB4O1xuICBsZWZ0OiAxNnB4O1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYzBjMGNmO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45Mik7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19pbWFnZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDIyNHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19ib2R5IHtcbiAgcGFkZGluZzogMTRweCAxOHB4IDE2cHg7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX190aXRsZS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX3RpdGxlIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX3R5cGUge1xuICBmbGV4OiAwIDAgYXV0bztcbiAgbWluLWhlaWdodDogMnJlbTtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fbWV0YSB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fYmFjayB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxZnIpIDM2MHB4O1xuICBnYXA6IDI0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX3ByZXZpZXcsXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fcHJldmlldyB7XG4gIHBhZGRpbmc6IDI0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDYyMHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6XG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KSxcbiAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmNmY2ZjkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2Y2ZjZmOSA3NSUsICNmNmY2ZjkpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAsIDEycHggMTJweDtcbiAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2ltYWdlIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiA1ODBweDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fc2lkZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTZweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keSB7XG4gIHBhZGRpbmc6IDAgMTZweCAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZCArIC5hZG1pbi1tZWRpYS1kZXRhaWxfX2ZpZWxkIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9faW5wdXQsXG4uYWRtaW4tbWVkaWEtZGV0YWlsX190ZXh0YXJlYSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fdGV4dGFyZWEge1xuICBtaW4taGVpZ2h0OiA2cmVtO1xuICByZXNpemU6IG5vbmU7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtbGlzdCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTJweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleSB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlIHtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDEwODBweCkge1xuICAuYWRtaW4tbWVkaWEtZGV0YWlsX19sYXlvdXQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAuYWRtaW4tbWVkaWEtcGFnZSB7XG4gICAgcGFkZGluZzogMjBweCAxNnB4IDQwcHggNzJweDtcbiAgfVxuXG4gIC5hZG1pbi1tZWRpYS1wYWdlX190b3AsXG4gIC5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICB9XG5cbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItbGVmdCxcbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItcmlnaHQsXG4gIC5hZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zIHtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gIH1cblxuICAuYWRtaW4tbWVkaWEtcGFnZV9fc2VhcmNoLFxuICAuYWRtaW4tbWVkaWEtcGFnZV9fc2VsZWN0IHtcbiAgICBtaW4td2lkdGg6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIGJ1aWxkUGFnZVBhdGgocGF0aG5hbWUsIHBhcmFtcykge1xuICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgT2JqZWN0LmVudHJpZXMocGFyYW1zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgIHNlYXJjaFBhcmFtcy5zZXQoa2V5LCBTdHJpbmcodmFsdWUpKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gIHJldHVybiBgJHtwYXRobmFtZX0ke3F1ZXJ5U3RyaW5nID8gYD8ke3F1ZXJ5U3RyaW5nfWAgOiAnJ31gO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0TWVkaWEocXVlcnkgPSB7fSkge1xuICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FkbWluL2FwaS9wYWdlcy9tZWRpYS1saWJyYXJ5JHtzZWFyY2hQYXJhbXMudG9TdHJpbmcoKSA/IGA/JHtzZWFyY2hQYXJhbXMudG9TdHJpbmcoKX1gIDogJyd9YCwge1xuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcbiAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQubWVzc2FnZSA/PyAnRmFpbGVkIHRvIGxvYWQgbWVkaWEuJyk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkQWRtaW5JbWFnZShmaWxlKSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvbWVkaWEvdXBsb2FkJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvciB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5mdW5jdGlvbiBBc3NldENhcmQoeyBpdGVtLCBvbk9wZW4sIHBpY2tlck1vZGUgfSkge1xuICByZXR1cm4gKFxuICAgIDxhcnRpY2xlIGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRcIiBvbkNsaWNrPXsoKSA9PiBvbk9wZW4oaXRlbSl9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19wcmV2aWV3XCI+XG4gICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9faW1hZ2VcIiBzcmM9e2l0ZW0udGh1bWJuYWlsVXJsIHx8IGl0ZW0udXJsfSBhbHQ9e2l0ZW0uYWx0ZXJuYXRpdmVUZXh0IHx8IGl0ZW0ubmFtZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19ib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fdGl0bGUtcm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX190aXRsZVwiPntpdGVtLm5hbWV9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX190eXBlXCI+e2l0ZW0ubWltZS5zdGFydHNXaXRoKCdpbWFnZS8nKSA/ICdJTUFHRScgOiBpdGVtLmV4dC5yZXBsYWNlKCcuJywgJycpLnRvVXBwZXJDYXNlKCl9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX21ldGFcIj5cbiAgICAgICAgICB7aXRlbS5leHQucmVwbGFjZSgnLicsICcnKS50b1VwcGVyQ2FzZSgpfSAtIHtpdGVtLndpZHRofcOXe2l0ZW0uaGVpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3BpY2tlck1vZGUgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19tZXRhXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiA4LCBjb2xvcjogJyM0OTQ1ZmYnLCBmb250V2VpZ2h0OiA3MDAgfX0+XG4gICAgICAgICAgICBVc2UgdGhpcyBhc3NldFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRGV0YWlsVmlldyh7IGl0ZW0sIG9uQmFjaywgb25TZWxlY3QsIHBpY2tlck1vZGUgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fYmFja1wiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkJhY2t9PlxuICAgICAgICDihpAgQmFja1xuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdG9wXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAyNCB9fT5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3RpdGxlXCIgc3R5bGU9e3sgZm9udFNpemU6ICcyLjI1cmVtJywgbGluZUhlaWdodDogJzIuNzVyZW0nIH19PntpdGVtLm5hbWV9PC9oMT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zXCI+XG4gICAgICAgICAge3BpY2tlck1vZGUgPyAoXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdChpdGVtKX0+XG4gICAgICAgICAgICAgIFVzZSB0aGlzIGFzc2V0XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbihpdGVtLnVybCwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyl9PlxuICAgICAgICAgICAgT3BlbiBhc3NldFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbGF5b3V0XCI+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fcHJldmlld1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYW52YXNcIj5cbiAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19pbWFnZVwiIHNyYz17aXRlbS51cmx9IGFsdD17aXRlbS5hbHRlcm5hdGl2ZVRleHQgfHwgaXRlbS5uYW1lfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgPGFzaWRlIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fc2lkZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1oZWFkXCI+RGV0YWlsczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19sYWJlbFwiPkZpbGUgbmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9faW5wdXRcIiB2YWx1ZT17aXRlbS5uYW1lIHx8ICcnfSBkaXNhYmxlZCByZWFkT25seSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2ZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbGFiZWxcIj5BbHRlcm5hdGl2ZSB0ZXh0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19pbnB1dFwiIHZhbHVlPXtpdGVtLmFsdGVybmF0aXZlVGV4dCB8fCAnJ30gZGlzYWJsZWQgcmVhZE9ubHkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2xhYmVsXCI+Q2FwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fdGV4dGFyZWFcIiB2YWx1ZT17aXRlbS5jYXB0aW9uIHx8ICcnfSBkaXNhYmxlZCByZWFkT25seSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWhlYWRcIj5NZXRhZGF0YTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1saXN0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPkRpbWVuc2lvbnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS53aWR0aH0gw5cge2l0ZW0uaGVpZ2h0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+U2l6ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLnNpemVMYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPlR5cGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5taW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+UHJvdmlkZXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5wcm92aWRlciB8fCAnbG9jYWwnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+Rm9sZGVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0uZm9sZGVyUGF0aCB8fCAnLyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5VcGRhdGVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0udXBkYXRlZEF0TGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5DcmVhdGVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0uY3JlYXRlZEF0TGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5Eb2N1bWVudCBJRDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLmRvY3VtZW50SWR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2FzaWRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1lZGlhTGlicmFyeSgpIHtcbiAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IHF1ZXJ5ID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCksIFtsb2NhdGlvbi5zZWFyY2hdKTtcbiAgY29uc3Qgc2VhcmNoID0gcXVlcnkuZ2V0KCdzZWFyY2gnKSB8fCAnJztcbiAgY29uc3QgZmlsZUlkID0gcXVlcnkuZ2V0KCdmaWxlSWQnKSB8fCAnJztcbiAgY29uc3QgcGlja2VyTW9kZSA9IHF1ZXJ5LmdldCgncGlja2VyJykgPT09ICcxJztcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2NvdW50LCBzZXRDb3VudF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2l0ZW0sIHNldEl0ZW1dID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRpbmcsIHNldFVwbG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYWN0aXZlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3IoJycpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVxdWVzdE1lZGlhKGZpbGVJZCA/IHsgZmlsZUlkIH0gOiB7IHNlYXJjaCB9KTtcblxuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEl0ZW1zKHBheWxvYWQuaXRlbXMgPz8gW10pO1xuICAgICAgICBzZXRDb3VudChwYXlsb2FkLmNvdW50ID8/IDApO1xuICAgICAgICBzZXRJdGVtKHBheWxvYWQuaXRlbSA/PyBudWxsKTtcbiAgICAgIH0gY2F0Y2ggKGxvYWRFcnJvcikge1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yKGxvYWRFcnJvci5tZXNzYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW2ZpbGVJZCwgc2VhcmNoXSk7XG5cbiAgY29uc3Qgb3Blbkxpc3QgPSAobmV4dFNlYXJjaCA9IHNlYXJjaCkgPT4ge1xuICAgIG5hdmlnYXRlKGJ1aWxkUGFnZVBhdGgoJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5Jywge1xuICAgICAgLi4uKG5leHRTZWFyY2ggPyB7IHNlYXJjaDogbmV4dFNlYXJjaCB9IDoge30pLFxuICAgICAgLi4uKHBpY2tlck1vZGUgPyB7IHBpY2tlcjogMSB9IDoge30pLFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBzZWxlY3RBc3NldCA9IChzZWxlY3RlZEl0ZW0pID0+IHtcbiAgICBpZiAoIXBpY2tlck1vZGUpIHtcbiAgICAgIG5hdmlnYXRlKGJ1aWxkUGFnZVBhdGgoJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5JywgeyBmaWxlSWQ6IHNlbGVjdGVkSXRlbS5pZCB9KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5vcGVuZXIpIHtcbiAgICAgIHdpbmRvdy5vcGVuZXIucG9zdE1lc3NhZ2UoXG4gICAgICAgIHsgdHlwZTogTUVESUFfUElDS0VSX0VWRU5ULCB1cmw6IHNlbGVjdGVkSXRlbS5yZWxhdGl2ZVVybCB8fCBzZWxlY3RlZEl0ZW0udXJsIHx8ICcnIH0sXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHdpbmRvdy5jbG9zZSgpO1xuICB9O1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19pbm5lclwiPlxuICAgICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICB7ZmlsZUlkICYmIGl0ZW0gPyAoXG4gICAgICAgICAgICA8RGV0YWlsVmlldyBpdGVtPXtpdGVtfSBvbkJhY2s9eygpID0+IG9wZW5MaXN0KCl9IG9uU2VsZWN0PXtzZWxlY3RBc3NldH0gcGlja2VyTW9kZT17cGlja2VyTW9kZX0gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b3BcIj5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdGl0bGVcIj57cGlja2VyTW9kZSA/ICdDaG9vc2UgTWVkaWEnIDogJ01lZGlhIExpYnJhcnknfTwvaDE+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dXBsb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnR5cGUgPSAnZmlsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYWNjZXB0ID0gJ2ltYWdlLyonO1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0Lm11bHRpcGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5vbmNoYW5nZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShpbnB1dC5maWxlcyA/PyBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdXBsb2FkQWRtaW5JbWFnZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZnJlc2hlZFBheWxvYWQgPSBhd2FpdCByZXF1ZXN0TWVkaWEoc2VhcmNoID8geyBzZWFyY2ggfSA6IHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXRlbXMocmVmcmVzaGVkUGF5bG9hZC5pdGVtcyA/PyBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvdW50KHJlZnJlc2hlZFBheWxvYWQuY291bnQgPz8gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICh1cGxvYWRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcih1cGxvYWRFcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7dXBsb2FkaW5nID8gJ1VwbG9hZGluZy4uLicgOiAnKyBBZGQgbmV3IGFzc2V0cyd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b29sYmFyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fc2VsZWN0XCIgZGVmYXVsdFZhbHVlPVwicmVjZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZWNlbnRcIj5Nb3N0IHJlY2VudCB1cGxvYWRzPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPkZpbHRlcnM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19zZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvcGVuTGlzdChldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBhc3NldHNcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3NlY3Rpb24tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICBBc3NldHMgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fY291bnRcIj4oe2NvdW50fSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1ncmlkXCI+XG4gICAgICAgICAgICAgICAge2l0ZW1zLm1hcCgobWVkaWFJdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8QXNzZXRDYXJkXG4gICAgICAgICAgICAgICAgICAgIGtleT17bWVkaWFJdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgICBpdGVtPXttZWRpYUl0ZW19XG4gICAgICAgICAgICAgICAgICAgIHBpY2tlck1vZGU9e3BpY2tlck1vZGV9XG4gICAgICAgICAgICAgICAgICAgIG9uT3Blbj17cGlja2VyTW9kZSA/IHNlbGVjdEFzc2V0IDogKG5leHRJdGVtKSA9PiBuYXZpZ2F0ZShidWlsZFBhZ2VQYXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScsIHsgZmlsZUlkOiBuZXh0SXRlbS5pZCB9KSl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExvYWRlciwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tYWNjb3VudC1wYWdlIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMzJweCA0MHB4IDY0cHggNDBweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1hY2NvdW50LXBhZ2VfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiA3NjBweDtcbn1cblxuLmFkbWluLWFjY291bnQtcGFnZV9fZXllYnJvdyB7XG4gIG1hcmdpbjogMCAwIDRweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG59XG5cbi5hZG1pbi1hY2NvdW50LXBhZ2VfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tYWNjb3VudC1wYWdlX19zdWJ0aXRsZSB7XG4gIG1hcmdpbjogMTBweCAwIDI4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG59XG5cbi5hZG1pbi1hY2NvdW50LWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xuICBwYWRkaW5nOiAyNHB4O1xufVxuXG4uYWRtaW4tYWNjb3VudC1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICBnYXA6IDE2cHg7XG59XG5cbi5hZG1pbi1hY2NvdW50LWZpZWxkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5hZG1pbi1hY2NvdW50LWZpZWxkLS1mdWxsIHtcbiAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcbn1cblxuLmFkbWluLWFjY291bnQtbGFiZWwge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmFkbWluLWFjY291bnQtaW5wdXQge1xuICBtaW4taGVpZ2h0OiAyLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwIDAuODc1cmVtO1xuICBmb250LXNpemU6IDAuOTM3NXJlbTtcbn1cblxuLmFkbWluLWFjY291bnQtaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1hY2NvdW50LWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luLXRvcDogMjRweDtcbn1cblxuLmFkbWluLWFjY291bnQtaGludCB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLmFkbWluLWFjY291bnQtYnV0dG9uLFxuLmFkbWluLWFjY291bnQtYnV0dG9uLS1wcmltYXJ5LFxuLmFkbWluLWFjY291bnQtYnV0dG9uLS1naG9zdCB7XG4gIG1pbi1oZWlnaHQ6IDIuNzVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAwLjkzNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDAgMXJlbTtcbn1cblxuLmFkbWluLWFjY291bnQtYnV0dG9uIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1hY2NvdW50LWJ1dHRvbi0tcHJpbWFyeSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0OTQ1ZmY7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tYWNjb3VudC1idXR0b24tLWdob3N0IHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIHBhZGRpbmc6IDA7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAuYWRtaW4tYWNjb3VudC1wYWdlIHtcbiAgICBwYWRkaW5nOiAyMHB4IDE2cHggNDhweDtcbiAgfVxuXG4gIC5hZG1pbi1hY2NvdW50LWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5gO1xuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0QWNjb3VudChtZXRob2QgPSAnR0VUJywgcGF5bG9hZCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL3BhZ2VzL2FjY291bnQnLCB7XG4gICAgbWV0aG9kLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgIGhlYWRlcnM6IHBheWxvYWQgPyB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSA6IHVuZGVmaW5lZCxcbiAgICBib2R5OiBwYXlsb2FkID8gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkgOiB1bmRlZmluZWQsXG4gIH0pO1xuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihkYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGRhdGUgYWNjb3VudC4nKTtcbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBY2NvdW50U2V0dGluZ3MoKSB7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc3VibWl0dGluZywgc2V0U3VibWl0dGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtlbWFpbCwgc2V0RW1haWxdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbY3VycmVudFBhc3N3b3JkLCBzZXRDdXJyZW50UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3UGFzc3dvcmQsIHNldE5ld1Bhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2NvbmZpcm1QYXNzd29yZCwgc2V0Q29uZmlybVBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBhY3RpdmUgPSB0cnVlO1xuXG4gICAgcmVxdWVzdEFjY291bnQoKVxuICAgICAgLnRoZW4oKHBheWxvYWQpID0+IHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFbWFpbChwYXlsb2FkLmVtYWlsIHx8ICcnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGxvYWRFcnJvcikgPT4ge1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yKGxvYWRFcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uU3VibWl0ID0gYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgc2V0U3VjY2VzcygnJyk7XG5cbiAgICBpZiAoIWN1cnJlbnRQYXNzd29yZCkge1xuICAgICAgc2V0RXJyb3IoJ0N1cnJlbnQgcGFzc3dvcmQgaXMgcmVxdWlyZWQuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5ld1Bhc3N3b3JkICYmIG5ld1Bhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpIHtcbiAgICAgIHNldEVycm9yKCdOZXcgcGFzc3dvcmQgY29uZmlybWF0aW9uIGRvZXMgbm90IG1hdGNoLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFN1Ym1pdHRpbmcodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RBY2NvdW50KCdQT1NUJywge1xuICAgICAgICBlbWFpbCxcbiAgICAgICAgY3VycmVudFBhc3N3b3JkLFxuICAgICAgICBuZXdQYXNzd29yZCxcbiAgICAgIH0pO1xuXG4gICAgICBzZXRTdWNjZXNzKHBheWxvYWQubWVzc2FnZSB8fCAnQWNjb3VudCB1cGRhdGVkLiBTaWduIGluIGFnYWluLicpO1xuICAgICAgc2V0Q3VycmVudFBhc3N3b3JkKCcnKTtcbiAgICAgIHNldE5ld1Bhc3N3b3JkKCcnKTtcbiAgICAgIHNldENvbmZpcm1QYXNzd29yZCgnJyk7XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbignL2FkbWluL2xvZ291dCcpO1xuICAgICAgfSwgOTAwKTtcbiAgICB9IGNhdGNoIChzdWJtaXRFcnJvcikge1xuICAgICAgc2V0RXJyb3Ioc3VibWl0RXJyb3IubWVzc2FnZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFN1Ym1pdHRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LXBhZ2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LXBhZ2VfX2lubmVyXCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1wYWdlX19leWVicm93XCI+QWNjb3VudDwvcD5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1wYWdlX190aXRsZVwiPkFjY291bnQgc2V0dGluZ3M8L2gxPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtcGFnZV9fc3VidGl0bGVcIj5cbiAgICAgICAgICAgIFVwZGF0ZSB0aGUgYWRtaW4gZW1haWwgYWRkcmVzcyBvciBwYXNzd29yZCB1c2VkIHRvIHNpZ24gaW4uXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAge2Vycm9yID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiIG1iPVwibGdcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG4gICAgICAgICAge3N1Y2Nlc3MgPyA8TWVzc2FnZUJveCB2YXJpYW50PVwic3VjY2Vzc1wiIG1iPVwibGdcIj57c3VjY2Vzc308L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtY2FyZFwiIG9uU3VibWl0PXtvblN1Ym1pdH0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtZ3JpZFwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1maWVsZCBhZG1pbi1hY2NvdW50LWZpZWxkLS1mdWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1sYWJlbFwiPkVtYWlsPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0RW1haWwoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWZpZWxkIGFkbWluLWFjY291bnQtZmllbGQtLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWxhYmVsXCI+Q3VycmVudCBwYXNzd29yZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjdXJyZW50UGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRDdXJyZW50UGFzc3dvcmQoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImN1cnJlbnQtcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWxhYmVsXCI+TmV3IHBhc3N3b3JkPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1Bhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0TmV3UGFzc3dvcmQoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtbGFiZWxcIj5Db25maXJtIG5ldyBwYXNzd29yZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maXJtUGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRDb25maXJtUGFzc3dvcmQoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtaGludFwiPlxuICAgICAgICAgICAgICAgIFNhdmluZyBhY2NvdW50IGNoYW5nZXMgc2lnbnMgdGhlIGN1cnJlbnQgc2Vzc2lvbiBvdXQuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAxMiwgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1idXR0b24tLWdob3N0XCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gd2luZG93LmxvY2F0aW9uLmFzc2lnbignL2FkbWluL2xvZ291dCcpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFNpZ24gb3V0XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWJ1dHRvbi0tcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD17c3VibWl0dGluZ30+XG4gICAgICAgICAgICAgICAgICB7c3VibWl0dGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgYWNjb3VudCd9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5yZWZ1bmQtcGFnZSB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDQwcHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiAxMjQwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2V5ZWJyb3cge1xuICBtYXJnaW46IDAgMCA0cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xufVxuXG4ucmVmdW5kLXBhZ2VfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4ucmVmdW5kLXBhZ2VfX3N1YnRpdGxlIHtcbiAgbWFyZ2luOiAxMHB4IDAgMjhweDtcbiAgbWF4LXdpZHRoOiA3ODBweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuLnJlZnVuZC1wYWdlX190YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAwO1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2RjZGNlNDtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbn1cblxuLnJlZnVuZC1wYWdlX190YWIge1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgbWFyZ2luLWJvdHRvbTogLTJweDtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMsIGJvcmRlci1jb2xvciAwLjE1cztcbn1cblxuLnJlZnVuZC1wYWdlX190YWI6aG92ZXIge1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLnJlZnVuZC1wYWdlX190YWItLWFjdGl2ZSB7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBib3JkZXItYm90dG9tLWNvbG9yOiAjNDk0NWZmO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2JhZGdlIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtaW4td2lkdGg6IDE4cHg7XG4gIGhlaWdodDogMThweDtcbiAgcGFkZGluZzogMCA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgZm9udC1zaXplOiAwLjY4NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZDogI2M3MmUzYTtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLnJlZnVuZC1wYWdlX19iYWRnZS0tbXV0ZWQge1xuICBiYWNrZ3JvdW5kOiAjOGU4ZWE5O1xufVxuXG4ucmVmdW5kLXBhZ2VfX3RhYmxlLXdyYXAge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIG92ZXJmbG93LXg6IGF1dG87XG59XG5cbi5yZWZ1bmQtcGFnZV9fdGFibGUge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuLnJlZnVuZC1wYWdlX190YWJsZSB0aCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzY2NjY4NztcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYWViZjA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5yZWZ1bmQtcGFnZV9fdGFibGUgdGQge1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLnJlZnVuZC1wYWdlX190YWJsZSB0cjpsYXN0LWNoaWxkIHRkIHtcbiAgYm9yZGVyLWJvdHRvbTogMDtcbn1cblxuLnJlZnVuZC1wYWdlX190YWJsZSB0cjpob3ZlciB0ZCB7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG59XG5cbi5yZWZ1bmQtcGFnZV9fbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5yZWZ1bmQtcGFnZV9fZW1haWwge1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGNvbG9yOiAjNjY2Njg3O1xufVxuXG4ucmVmdW5kLXBhZ2VfX2Ftb3VudCB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzI4MDQ4O1xufVxuXG4ucmVmdW5kLXBhZ2VfX3N0YXR1cy1iYWRnZSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAzcHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLnJlZnVuZC1wYWdlX19zdGF0dXMtYmFkZ2UtLXBlbmRpbmcge1xuICBiYWNrZ3JvdW5kOiAjZmVmM2NkO1xuICBjb2xvcjogIzg1NjQwNDtcbn1cblxuLnJlZnVuZC1wYWdlX19zdGF0dXMtYmFkZ2UtLWFwcHJvdmVkIHtcbiAgYmFja2dyb3VuZDogI2Q0ZWRkYTtcbiAgY29sb3I6ICMxNTU3MjQ7XG59XG5cbi5yZWZ1bmQtcGFnZV9fc3RhdHVzLWJhZGdlLS1yZWplY3RlZCB7XG4gIGJhY2tncm91bmQ6ICNmOGQ3ZGE7XG4gIGNvbG9yOiAjNzIxYzI0O1xufVxuXG4ucmVmdW5kLXBhZ2VfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDZweDtcbn1cblxuLnJlZnVuZC1wYWdlX19idG4ge1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDlkOGU2O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2J0bjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5yZWZ1bmQtcGFnZV9fYnRuOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC41O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2J0bi0tYXBwcm92ZSB7XG4gIGJvcmRlci1jb2xvcjogI2MzZTZjYjtcbiAgY29sb3I6ICMxZTdhMzM7XG59XG5cbi5yZWZ1bmQtcGFnZV9fYnRuLS1hcHByb3ZlOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2YwZmFmMztcbn1cblxuLnJlZnVuZC1wYWdlX19idG4tLXJlamVjdCB7XG4gIGJvcmRlci1jb2xvcjogI2ZmZDNjNztcbiAgY29sb3I6ICNjNzJlM2E7XG59XG5cbi5yZWZ1bmQtcGFnZV9fYnRuLS1yZWplY3Q6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZmZmNWYyO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2VtcHR5IHtcbiAgcGFkZGluZzogNDBweCAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuOTM3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuLnJlZnVuZC1wYWdlX19lcnJvciB7XG4gIGNvbG9yOiAjYzcyZTNhO1xuICBtYXJnaW46IDEycHggMCAwO1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG59XG5cbi5yZWZ1bmQtcGFnZV9fc3VjY2VzcyB7XG4gIGNvbG9yOiAjMzI4MDQ4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5yZWZ1bmQtcGFnZV9fbG9hZGluZyB7XG4gIHBhZGRpbmc6IDQwcHggMjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5yZWZ1bmQtcGFnZSB7XG4gICAgcGFkZGluZzogMjBweCAxNnB4IDQ4cHg7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIGNvZXJjZUpzb24ocmVzcG9uc2VUZXh0KSB7XG4gIGlmICghcmVzcG9uc2VUZXh0KSByZXR1cm4gbnVsbDtcbiAgdHJ5IHsgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTsgfSBjYXRjaCB7IHJldHVybiBudWxsOyB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQWRtaW5Kc29uKHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgLi4ub3B0aW9ucyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIC4uLihvcHRpb25zLmhlYWRlcnMgfHwge30pIH0sXG4gIH0pO1xuICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gIGNvbnN0IHBheWxvYWQgPSBjb2VyY2VKc29uKHJlc3BvbnNlVGV4dCk7XG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCBtZXNzYWdlID0gcGF5bG9hZD8uZXJyb3IgfHwgcGF5bG9hZD8ubWVzc2FnZSB8fCByZXNwb25zZVRleHQgfHwgYFJlcXVlc3QgZmFpbGVkICgke3Jlc3BvbnNlLnN0YXR1c30pLmA7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRCb29raW5nRGF0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gJy0nO1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICBpZiAoTnVtYmVyLmlzTmFOKGRhdGUuZ2V0VGltZSgpKSkgcmV0dXJuICctJztcbiAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1HQicsIHtcbiAgICB3ZWVrZGF5OiAnc2hvcnQnLFxuICAgIGRheTogJ251bWVyaWMnLFxuICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgbWludXRlOiAnMi1kaWdpdCcsXG4gIH0pLmZvcm1hdChkYXRlKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0Q3VycmVuY3koYW1vdW50TWlub3IsIGN1cnJlbmN5ID0gJ2dicCcpIHtcbiAgY29uc3QgdmFsdWUgPSBOdW1iZXIoYW1vdW50TWlub3IgfHwgMCkgLyAxMDA7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tR0InLCB7XG4gICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgIGN1cnJlbmN5OiBTdHJpbmcoY3VycmVuY3kgfHwgJ2dicCcpLnRvVXBwZXJDYXNlKCksXG4gICAgfSkuZm9ybWF0KHZhbHVlKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGBcXHUwMEEzJHt2YWx1ZS50b0ZpeGVkKDIpfWA7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZUFnbyh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gJy0nO1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICBpZiAoTnVtYmVyLmlzTmFOKGRhdGUuZ2V0VGltZSgpKSkgcmV0dXJuICctJztcbiAgY29uc3QgZGlmZiA9IERhdGUubm93KCkgLSBkYXRlLmdldFRpbWUoKTtcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoZGlmZiAvIDYwXzAwMCk7XG4gIGlmIChtaW51dGVzIDwgMSkgcmV0dXJuICdqdXN0IG5vdyc7XG4gIGlmIChtaW51dGVzIDwgNjApIHJldHVybiBgJHttaW51dGVzfW0gYWdvYDtcbiAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgLyA2MCk7XG4gIGlmIChob3VycyA8IDI0KSByZXR1cm4gYCR7aG91cnN9aCBhZ29gO1xuICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihob3VycyAvIDI0KTtcbiAgaWYgKGRheXMgPCAzMCkgcmV0dXJuIGAke2RheXN9ZCBhZ29gO1xuICByZXR1cm4gZm9ybWF0Qm9va2luZ0RhdGUodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZWZ1bmRSZXF1ZXN0cygpIHtcbiAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IHVzZVN0YXRlKCdwZW5kaW5nJyk7XG4gIGNvbnN0IFtwZW5kaW5nUmVxdWVzdHMsIHNldFBlbmRpbmdSZXF1ZXN0c10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtwcm9jZXNzZWRSZXF1ZXN0cywgc2V0UHJvY2Vzc2VkUmVxdWVzdHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3Byb2Nlc3NpbmdJZCwgc2V0UHJvY2Vzc2luZ0lkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3N1Y2Nlc3NNYXAsIHNldFN1Y2Nlc3NNYXBdID0gdXNlU3RhdGUoe30pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzQWN0aXZlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgW3BlbmRpbmdQYXlsb2FkLCBwcm9jZXNzZWRQYXlsb2FkXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICBmZXRjaEFkbWluSnNvbignL2FkbWluL2FwaS9hZG1pbi9ib29raW5ncy9yZWZ1bmQtcmVxdWVzdHMnKSxcbiAgICAgICAgICBmZXRjaEFkbWluSnNvbignL2FkbWluL2FwaS9hZG1pbi9ib29raW5ncy9yZWZ1bmQtcmVxdWVzdHM/c3RhdHVzPXByb2Nlc3NlZCcpLFxuICAgICAgICBdKTtcbiAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgc2V0UGVuZGluZ1JlcXVlc3RzKEFycmF5LmlzQXJyYXkocGVuZGluZ1BheWxvYWQ/LmRhdGEpID8gcGVuZGluZ1BheWxvYWQuZGF0YSA6IFtdKTtcbiAgICAgICAgICBzZXRQcm9jZXNzZWRSZXF1ZXN0cyhBcnJheS5pc0FycmF5KHByb2Nlc3NlZFBheWxvYWQ/LmRhdGEpID8gcHJvY2Vzc2VkUGF5bG9hZC5kYXRhIDogW10pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gcHJvY2Vzc2VkIGVuZHBvaW50IG1heSBub3QgZXhpc3QgeWV0LCBqdXN0IGxvYWQgcGVuZGluZ1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHBlbmRpbmdQYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oJy9hZG1pbi9hcGkvYWRtaW4vYm9va2luZ3MvcmVmdW5kLXJlcXVlc3RzJyk7XG4gICAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgICBzZXRQZW5kaW5nUmVxdWVzdHMoQXJyYXkuaXNBcnJheShwZW5kaW5nUGF5bG9hZD8uZGF0YSkgPyBwZW5kaW5nUGF5bG9hZC5kYXRhIDogW10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoaW5uZXJFcnIpIHtcbiAgICAgICAgICBpZiAoaXNBY3RpdmUpIHNldEVycm9yKGlubmVyRXJyPy5tZXNzYWdlIHx8ICdVbmFibGUgdG8gbG9hZCByZWZ1bmQgcmVxdWVzdHMuJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChpc0FjdGl2ZSkgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWQoKTtcbiAgICByZXR1cm4gKCkgPT4geyBpc0FjdGl2ZSA9IGZhbHNlOyB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlQXBwcm92ZSA9IGFzeW5jIChyZXF1ZXN0KSA9PiB7XG4gICAgaWYgKCFyZXF1ZXN0Py5pZCkgcmV0dXJuO1xuICAgIGNvbnN0IHRhcmdldElkID0gTnVtYmVyKHJlcXVlc3QuaWQpO1xuICAgIHNldFByb2Nlc3NpbmdJZCh0YXJnZXRJZCk7XG4gICAgc2V0RXJyb3IoJycpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZldGNoQWRtaW5Kc29uKGAvYWRtaW4vYXBpL2FkbWluL2Jvb2tpbmdzLyR7dGFyZ2V0SWR9L2FwcHJvdmUtcmVmdW5kYCwgeyBtZXRob2Q6ICdQT1NUJyB9KTtcbiAgICAgIHNldFN1Y2Nlc3NNYXAoKHByZXYpID0+ICh7IC4uLnByZXYsIFt0YXJnZXRJZF06ICdhcHByb3ZlZCcgfSkpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNldFBlbmRpbmdSZXF1ZXN0cygocHJldikgPT4gcHJldi5maWx0ZXIoKHIpID0+IHIuaWQgIT09IHRhcmdldElkKSk7XG4gICAgICAgIHNldFByb2Nlc3NlZFJlcXVlc3RzKChwcmV2KSA9PiBbeyAuLi5yZXF1ZXN0LCByZWZ1bmRSZXF1ZXN0U3RhdHVzOiAnYXBwcm92ZWQnIH0sIC4uLnByZXZdKTtcbiAgICAgICAgc2V0U3VjY2Vzc01hcCgocHJldikgPT4geyBjb25zdCBuZXh0ID0geyAuLi5wcmV2IH07IGRlbGV0ZSBuZXh0W3RhcmdldElkXTsgcmV0dXJuIG5leHQ7IH0pO1xuICAgICAgfSwgMTIwMCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcihlcnI/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byBhcHByb3ZlIHJlZnVuZC4nKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UHJvY2Vzc2luZ0lkKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZWplY3QgPSBhc3luYyAocmVxdWVzdCkgPT4ge1xuICAgIGlmICghcmVxdWVzdD8uaWQpIHJldHVybjtcbiAgICBjb25zdCB0YXJnZXRJZCA9IE51bWJlcihyZXF1ZXN0LmlkKTtcbiAgICBzZXRQcm9jZXNzaW5nSWQodGFyZ2V0SWQpO1xuICAgIHNldEVycm9yKCcnKTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9hZG1pbi9ib29raW5ncy8ke3RhcmdldElkfS9yZWplY3QtcmVmdW5kYCwgeyBtZXRob2Q6ICdQT1NUJyB9KTtcbiAgICAgIHNldFN1Y2Nlc3NNYXAoKHByZXYpID0+ICh7IC4uLnByZXYsIFt0YXJnZXRJZF06ICdyZWplY3RlZCcgfSkpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNldFBlbmRpbmdSZXF1ZXN0cygocHJldikgPT4gcHJldi5maWx0ZXIoKHIpID0+IHIuaWQgIT09IHRhcmdldElkKSk7XG4gICAgICAgIHNldFByb2Nlc3NlZFJlcXVlc3RzKChwcmV2KSA9PiBbeyAuLi5yZXF1ZXN0LCByZWZ1bmRSZXF1ZXN0U3RhdHVzOiAncmVqZWN0ZWQnIH0sIC4uLnByZXZdKTtcbiAgICAgICAgc2V0U3VjY2Vzc01hcCgocHJldikgPT4geyBjb25zdCBuZXh0ID0geyAuLi5wcmV2IH07IGRlbGV0ZSBuZXh0W3RhcmdldElkXTsgcmV0dXJuIG5leHQ7IH0pO1xuICAgICAgfSwgMTIwMCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcihlcnI/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byByZWplY3QgcmVmdW5kIHJlcXVlc3QuJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFByb2Nlc3NpbmdJZChudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWN0aXZlTGlzdCA9IHRhYiA9PT0gJ3BlbmRpbmcnID8gcGVuZGluZ1JlcXVlc3RzIDogcHJvY2Vzc2VkUmVxdWVzdHM7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9faW5uZXJcIj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9fZXllYnJvd1wiPk9wZXJhdGlvbnM8L3A+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX190aXRsZVwiPlJlZnVuZCBSZXF1ZXN0czwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VfX3N1YnRpdGxlXCI+XG4gICAgICAgICAgICBSZXZpZXcgYW5kIG1hbmFnZSByZWZ1bmQgcmVxdWVzdHMgZnJvbSBtZW1iZXJzIGZvciBtZWV0aW5nIHJvb20gYm9va2luZ3MgYW5kIG1lbWJlcnNoaXBzLlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VfX3RhYnNcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlZnVuZC1wYWdlX190YWIke3RhYiA9PT0gJ3BlbmRpbmcnID8gJyByZWZ1bmQtcGFnZV9fdGFiLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGFiKCdwZW5kaW5nJyl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFBlbmRpbmdcbiAgICAgICAgICAgICAge3BlbmRpbmdSZXF1ZXN0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9fYmFkZ2VcIj57cGVuZGluZ1JlcXVlc3RzLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlZnVuZC1wYWdlX190YWIke3RhYiA9PT0gJ3Byb2Nlc3NlZCcgPyAnIHJlZnVuZC1wYWdlX190YWItLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ3Byb2Nlc3NlZCcpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQcm9jZXNzZWRcbiAgICAgICAgICAgICAge3Byb2Nlc3NlZFJlcXVlc3RzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19iYWRnZSByZWZ1bmQtcGFnZV9fYmFkZ2UtLW11dGVkXCI+e3Byb2Nlc3NlZFJlcXVlc3RzLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtsb2FkaW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9fbG9hZGluZ1wiPkxvYWRpbmcgcmVmdW5kIHJlcXVlc3RzLi4uPC9kaXY+XG4gICAgICAgICAgKSA6IGFjdGl2ZUxpc3QubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9fdGFibGUtd3JhcFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19lbXB0eVwiPlxuICAgICAgICAgICAgICAgIHt0YWIgPT09ICdwZW5kaW5nJyA/ICdObyBwZW5kaW5nIHJlZnVuZCByZXF1ZXN0cy4nIDogJ05vIHByb2Nlc3NlZCByZWZ1bmQgcmVxdWVzdHMgeWV0Lid9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VfX3RhYmxlLXdyYXBcIj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX190YWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPiM8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+Q3VzdG9tZXI8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+UmVzb3VyY2U8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+Qm9va2luZyBkYXRlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPkFtb3VudDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5SZXF1ZXN0ZWQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICB7dGFiID09PSAncHJvY2Vzc2VkJyAmJiA8dGg+U3RhdHVzPC90aD59XG4gICAgICAgICAgICAgICAgICAgIHt0YWIgPT09ICdwZW5kaW5nJyAmJiA8dGg+QWN0aW9uczwvdGg+fVxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVMaXN0Lm1hcCgocmVxdWVzdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtyZXF1ZXN0LmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3JlcXVlc3QuaWR9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19uYW1lXCI+e3JlcXVlc3QudXNlck5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19lbWFpbFwiPntyZXF1ZXN0LnVzZXJFbWFpbH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD57cmVxdWVzdC5yZXNvdXJjZU5hbWUgfHwgJy0nfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPntmb3JtYXRCb29raW5nRGF0ZShyZXF1ZXN0LnN0YXJ0QXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VfX2Ftb3VudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0Q3VycmVuY3kocmVxdWVzdC50b3RhbE1pbm9yLCByZXF1ZXN0LmN1cnJlbmN5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD57Zm9ybWF0VGltZUFnbyhyZXF1ZXN0LnJlZnVuZFJlcXVlc3RlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIHt0YWIgPT09ICdwcm9jZXNzZWQnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcmVmdW5kLXBhZ2VfX3N0YXR1cy1iYWRnZSByZWZ1bmQtcGFnZV9fc3RhdHVzLWJhZGdlLS0ke3JlcXVlc3QucmVmdW5kUmVxdWVzdFN0YXR1cyB8fCAncGVuZGluZyd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlcXVlc3QucmVmdW5kUmVxdWVzdFN0YXR1cyA9PT0gJ2FwcHJvdmVkJyA/ICdBcHByb3ZlZCcgOiByZXF1ZXN0LnJlZnVuZFJlcXVlc3RTdGF0dXMgPT09ICdyZWplY3RlZCcgPyAnUmVqZWN0ZWQnIDogcmVxdWVzdC5yZWZ1bmRSZXF1ZXN0U3RhdHVzIHx8ICctJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIHt0YWIgPT09ICdwZW5kaW5nJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzdWNjZXNzTWFwW3JlcXVlc3QuaWRdID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19zdWNjZXNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3VjY2Vzc01hcFtyZXF1ZXN0LmlkXSA9PT0gJ2FwcHJvdmVkJyA/ICfinJMgQXBwcm92ZWQnIDogJ+KclSBSZWplY3RlZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19idG4gcmVmdW5kLXBhZ2VfX2J0bi0tYXBwcm92ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUFwcHJvdmUocmVxdWVzdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtwcm9jZXNzaW5nSWQgPT09IHJlcXVlc3QuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9jZXNzaW5nSWQgPT09IHJlcXVlc3QuaWQgPyAnUHJvY2Vzc2luZy4uLicgOiAn4pyTIEFwcHJvdmUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9fYnRuIHJlZnVuZC1wYWdlX19idG4tLXJlamVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlamVjdChyZXF1ZXN0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Byb2Nlc3NpbmdJZCA9PT0gcmVxdWVzdC5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb2Nlc3NpbmdJZCA9PT0gcmVxdWVzdC5pZCA/ICdQcm9jZXNzaW5nLi4uJyA6ICfinJUgUmVqZWN0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7ZXJyb3IgPyA8ZGl2IGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19lcnJvclwiPntlcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IEFETUlOX1JFU09VUkNFX0RFRklOSVRJT05TLCBidWlsZEFkbWluUmVzb3VyY2VIcmVmIH0gZnJvbSAnLi4vcmVzb3VyY2UtZGVmaW5pdGlvbnMuanMnO1xuXG5jb25zdCBSRUZVTkRfUkVRVUVTVFNfSFJFRiA9ICcvYWRtaW4vcGFnZXMvcmVmdW5kLXJlcXVlc3RzJztcblxuY29uc3QgQ09OVEVOVF9QQUdFX09SREVSID0gW1xuICAnc2l0ZS1zZXR0aW5ncycsXG4gICdob21lcGFnZScsXG4gICdhYm91dC1wYWdlJyxcbiAgJ2Jsb2ctcGFnZScsXG4gICdwcmljaW5nLXBhZ2UnLFxuICAnZmFxLXBhZ2UnLFxuICAnbWVldGluZy1yb29tcy1wYWdlJyxcbiAgJ3ZpcnR1YWwtb2ZmaWNlLXBhZ2UnLFxuICAnY29udGFjdC1wYWdlJyxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnLFxuICAndGVybXMtcGFnZScsXG5dO1xuXG5jb25zdCBDT05URU5UX1BBR0VfTEFCRUxTID0ge1xuICAnc2l0ZS1zZXR0aW5ncyc6ICdTaXRlIFNldHRpbmcnLFxuICAnaG9tZXBhZ2UnOiAnSG9tZXBhZ2UnLFxuICAnYWJvdXQtcGFnZSc6ICdBYm91dCBQYWdlJyxcbiAgJ2Jsb2ctcGFnZSc6ICdCbG9nIFBhZ2UnLFxuICAncHJpY2luZy1wYWdlJzogJ1ByaWNpbmcgUGFnZScsXG4gICdmYXEtcGFnZSc6ICdGQVEgUGFnZScsXG4gICdtZWV0aW5nLXJvb21zLXBhZ2UnOiAnTWVldGluZyBSb29tcyBQYWdlJyxcbiAgJ3ZpcnR1YWwtb2ZmaWNlLXBhZ2UnOiAnVmlydHVhbCBPZmZpY2UgUGFnZScsXG4gICdjb250YWN0LXBhZ2UnOiAnQ29udGFjdCBQYWdlJyxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnOiAnUHJpdmFjeSBQb2xpY3kgUGFnZScsXG4gICd0ZXJtcy1wYWdlJzogJ1Rlcm1zIFBhZ2UnLFxufTtcblxuY29uc3QgU0lERUJBUl9XSURUSCA9IDMwNDtcbmNvbnN0IFJBSUxfV0lEVEggPSA0ODtcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLXNpZGViYXItc2hlbGwgfiBbZGF0YS1jc3M9XCJhcHAtY29udGVudFwiXSB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmctbGVmdDogJHtTSURFQkFSX1dJRFRIfXB4O1xuICB0cmFuc2l0aW9uOiBwYWRkaW5nLWxlZnQgMC4ycyBlYXNlO1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbC5hZG1pbi1zaWRlYmFyLXNoZWxsLS1yYWlsLW9ubHkgfiBbZGF0YS1jc3M9XCJhcHAtY29udGVudFwiXSB7XG4gIHBhZGRpbmctbGVmdDogJHtSQUlMX1dJRFRIfXB4O1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDAgYXV0byAwIDA7XG4gIHdpZHRoOiAke1NJREVCQVJfV0lEVEh9cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYWViZjA7XG4gIHotaW5kZXg6IDUwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2U7XG59XG5cbi5hZG1pbi1zaWRlYmFyLXNoZWxsLS1yYWlsLW9ubHkge1xuICB3aWR0aDogJHtSQUlMX1dJRFRIfXB4O1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke1NJREVCQVJfV0lEVEh9cHgpO1xufVxuXG4uYWRtaW4tc2lkZWJhci1yYWlsIHtcbiAgd2lkdGg6IDQ4cHg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYWViZjA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEycHggMDtcbiAgZ2FwOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tc2lkZWJhci1sb2dvIHtcbiAgd2lkdGg6IDI4cHg7XG4gIGhlaWdodDogMjhweDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xufVxuXG4uYWRtaW4tcmFpbC1idXR0b24ge1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2YwZWJmZjtcbiAgY29sb3I6ICM3Yjc5ZmY7XG59XG5cbi5hZG1pbi1yYWlsLWJ1dHRvbiBzdmcge1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiAxNnB4O1xuICBzdHJva2U6IGN1cnJlbnRDb2xvcjtcbiAgZmlsbDogbm9uZTtcbiAgc3Ryb2tlLXdpZHRoOiAxLjg7XG4gIHN0cm9rZS1saW5lY2FwOiByb3VuZDtcbiAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcbn1cblxuLmFkbWluLXJhaWwtc3BhY2VyIHtcbiAgZmxleDogMTtcbn1cblxuLmFkbWluLWF2YXRhciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmFkbWluLWF2YXRhcl9fYnV0dG9uIHtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tYXZhdGFyX19tZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA0MnB4O1xuICBib3R0b206IDA7XG4gIG1pbi13aWR0aDogMTU2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywgMzMsIDUyLCAwLjE2KTtcbiAgcGFkZGluZzogNnB4O1xuICB6LWluZGV4OiA5MDtcbn1cblxuLmFkbWluLWF2YXRhcl9fbWVudSBidXR0b24ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZzogOHB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1hdmF0YXJfX21lbnUgYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLXNpZGViYXItcGFuZWwge1xuICB3aWR0aDogMjU2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi13aWR0aDogMDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmFkbWluLXNpZGViYXItaGVhZGVyIHtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWJmMDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLXNpZGViYXItYm9keSB7XG4gIHBhZGRpbmc6IDE0cHggOHB4IDE4cHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5hZG1pbi1zZWFyY2gge1xuICBwYWRkaW5nOiAwIDhweCAxMnB4O1xufVxuXG4uYWRtaW4tc2VhcmNoIGlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LXNpemU6IDAuNzVyZW07XG59XG5cbi5hZG1pbi1zZWFyY2ggaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1ncm91cCB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5hZG1pbi1ncm91cF9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZzogMCAxMHB4IDhweDtcbn1cblxuLmFkbWluLWdyb3VwX19sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC42ODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG5cbi5hZG1pbi1ncm91cF9fY291bnQge1xuICBtaW4td2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgcGFkZGluZzogMCA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjY4NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tbmF2LWxpbmsge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA3cHggMTBweDtcbiAgbWFyZ2luOiAxcHggMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmFkbWluLW5hdi1saW5rOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQ6ICNmMGViZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tbmF2LWxpbmtfX3RleHQge1xuICBtaW4td2lkdGg6IDA7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjM3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5hZG1pbi1uYXYtbGlua19faWNvbiB7XG4gIHdpZHRoOiAxMnB4O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLXNpZGViYXItc2hlbGwgfiBbZGF0YS1jc3M9XCJhcHAtY29udGVudFwiXSB7XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICB9XG5cbiAgLmFkbWluLXNpZGViYXItc2hlbGwge1xuICAgIGJveC1zaGFkb3c6IDAgMThweCA0OHB4IHJnYmEoMzMsIDMzLCA1MiwgMC4xMik7XG4gIH1cblxuICAuYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7U0lERUJBUl9XSURUSH1weCk7XG4gIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDk2MXB4KSB7XG4gIC5hZG1pbi1zaWRlYmFyLXNoZWxsLFxuICAuYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIGl0ZW1NYXRjaGVzU2VhcmNoKGxhYmVsLCBzZWFyY2gpIHtcbiAgaWYgKCFzZWFyY2gpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBsYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRTaWRlYmFyUmVzb3VyY2VJdGVtcyhzZWN0aW9uLCBwYXRobmFtZSwgc2VhcmNoKSB7XG4gIHJldHVybiBBRE1JTl9SRVNPVVJDRV9ERUZJTklUSU9OU1xuICAgIC5maWx0ZXIoKGRlZmluaXRpb24pID0+IGRlZmluaXRpb24uc2lkZWJhclNlY3Rpb24gPT09IHNlY3Rpb24pXG4gICAgLm1hcCgoZGVmaW5pdGlvbikgPT4ge1xuICAgICAgY29uc3QgcmVzb3VyY2VQYXRoUHJlZml4ID0gYC9hZG1pbi9yZXNvdXJjZXMvJHtkZWZpbml0aW9uLnRhYmxlfWA7XG4gICAgICBjb25zdCBocmVmID0gZGVmaW5pdGlvbi5zaWRlYmFySHJlZiB8fCBidWlsZEFkbWluUmVzb3VyY2VIcmVmKGRlZmluaXRpb24udGFibGUpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRQcmVmaXhlcyA9IFtocmVmLCByZXNvdXJjZVBhdGhQcmVmaXhdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogZGVmaW5pdGlvbi50YWJsZSxcbiAgICAgICAgbGFiZWw6IGRlZmluaXRpb24uc2lkZWJhckxhYmVsIHx8IGRlZmluaXRpb24ubGFiZWwsXG4gICAgICAgIGhyZWYsXG4gICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZFByZWZpeGVzLnNvbWUoKHByZWZpeCkgPT4gcGF0aG5hbWUuc3RhcnRzV2l0aChwcmVmaXgpKSxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChyZXNvdXJjZSkgPT4gaXRlbU1hdGNoZXNTZWFyY2gocmVzb3VyY2UubGFiZWwsIHNlYXJjaCkpO1xufVxuXG5mdW5jdGlvbiBSYWlsSWNvbih7IGNoaWxkcmVuIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L3N2Zz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gSG9tZUljb24oKSB7XG4gIHJldHVybiAoXG4gICAgPFJhaWxJY29uPlxuICAgICAgPHBhdGggZD1cIk00LjUgMTAuNSAxMiA0bDcuNSA2LjVcIiAvPlxuICAgICAgPHBhdGggZD1cIk02LjUgOS41VjE5aDExVjkuNVwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTEwIDE5di01aDR2NVwiIC8+XG4gICAgPC9SYWlsSWNvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gUGVuY2lsSWNvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8UmFpbEljb24+XG4gICAgICA8cGF0aCBkPVwibTMuNSAyMC41IDQuMjUtMSA5Ljc1LTkuNzUtMy4yNS0zLjI1TDQuNSAxNi4yNWwtMSA0LjI1WlwiIC8+XG4gICAgICA8cGF0aCBkPVwibTEzLjUgNi41IDMuMjUgMy4yNVwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTcuNSAxOS41aDEzXCIgLz5cbiAgICA8L1JhaWxJY29uPlxuICApO1xufVxuXG5mdW5jdGlvbiBNZWRpYUljb24oKSB7XG4gIHJldHVybiAoXG4gICAgPFJhaWxJY29uPlxuICAgICAgPHJlY3QgeD1cIjMuNVwiIHk9XCI1LjVcIiB3aWR0aD1cIjE3XCIgaGVpZ2h0PVwiMTNcIiByeD1cIjJcIiAvPlxuICAgICAgPGNpcmNsZSBjeD1cIjguNVwiIGN5PVwiMTBcIiByPVwiMS41XCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJtNS41IDE2IDQtNCAzIDMgMi0yIDQgM1wiIC8+XG4gICAgPC9SYWlsSWNvbj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2lkZWJhcih7IGlzVmlzaWJsZSB9KSB7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBwYWdlcyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUucGFnZXMpO1xuICBjb25zdCBzZXNzaW9uID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5zZXNzaW9uKTtcbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW21lbnVPcGVuLCBzZXRNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwZW5kaW5nUmVmdW5kQ291bnQsIHNldFBlbmRpbmdSZWZ1bmRDb3VudF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgYXZhdGFyUmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IHBhZ2VJdGVtcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gQ09OVEVOVF9QQUdFX09SREVSXG4gICAgICAubWFwKChwYWdlTmFtZSkgPT4gcGFnZXMuZmluZCgocGFnZSkgPT4gcGFnZS5uYW1lID09PSBwYWdlTmFtZSkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAubWFwKChwYWdlKSA9PiAoe1xuICAgICAgICBpZDogcGFnZS5uYW1lLFxuICAgICAgICBsYWJlbDogQ09OVEVOVF9QQUdFX0xBQkVMU1twYWdlLm5hbWVdID8/IHBhZ2UubmFtZSxcbiAgICAgICAgaHJlZjogYC9hZG1pbi9wYWdlcy8ke3BhZ2UubmFtZX1gLFxuICAgICAgICBzZWxlY3RlZDogbG9jYXRpb24ucGF0aG5hbWUuc3RhcnRzV2l0aChgL2FkbWluL3BhZ2VzLyR7cGFnZS5uYW1lfWApLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChwYWdlKSA9PiBpdGVtTWF0Y2hlc1NlYXJjaChwYWdlLmxhYmVsLCBzZWFyY2gpKSxcbiAgICBbbG9jYXRpb24ucGF0aG5hbWUsIHBhZ2VzLCBzZWFyY2hdLFxuICApO1xuXG4gIGNvbnN0IGNvbGxlY3Rpb25JdGVtcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gYnVpbGRTaWRlYmFyUmVzb3VyY2VJdGVtcygnY29sbGVjdGlvbnMnLCBsb2NhdGlvbi5wYXRobmFtZSwgc2VhcmNoKSxcbiAgICBbbG9jYXRpb24ucGF0aG5hbWUsIHNlYXJjaF0sXG4gICk7XG5cbiAgY29uc3Qgb3BlcmF0aW9uSXRlbXMgPSB1c2VNZW1vKFxuICAgICgpID0+IGJ1aWxkU2lkZWJhclJlc291cmNlSXRlbXMoJ29yZGVycycsIGxvY2F0aW9uLnBhdGhuYW1lLCBzZWFyY2gpLFxuICAgIFtsb2NhdGlvbi5wYXRobmFtZSwgc2VhcmNoXSxcbiAgKTtcblxuICBjb25zdCBjdXN0b21lckl0ZW1zID0gdXNlTWVtbyhcbiAgICAoKSA9PiBidWlsZFNpZGViYXJSZXNvdXJjZUl0ZW1zKCdjdXN0b21lcnMnLCBsb2NhdGlvbi5wYXRobmFtZSwgc2VhcmNoKSxcbiAgICBbbG9jYXRpb24ucGF0aG5hbWUsIHNlYXJjaF0sXG4gICk7XG5cbiAgY29uc3QgcmVmdW5kUmVxdWVzdHNWaXNpYmxlID0gdXNlTWVtbyhcbiAgICAoKSA9PiBpdGVtTWF0Y2hlc1NlYXJjaCgnUmVmdW5kIFJlcXVlc3RzJywgc2VhcmNoKSxcbiAgICBbc2VhcmNoXSxcbiAgKTtcblxuICBjb25zdCBpc1JlZnVuZFJlcXVlc3RzU2VsZWN0ZWQgPSBsb2NhdGlvbi5wYXRobmFtZS5zdGFydHNXaXRoKFJFRlVORF9SRVFVRVNUU19IUkVGKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc0FjdGl2ZSA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkQ291bnQgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL2FkbWluL2Jvb2tpbmdzL3JlZnVuZC1yZXF1ZXN0cycsIHsgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHJldHVybjtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgaWYgKGlzQWN0aXZlICYmIEFycmF5LmlzQXJyYXkocGF5bG9hZD8uZGF0YSkpIHtcbiAgICAgICAgICBzZXRQZW5kaW5nUmVmdW5kQ291bnQocGF5bG9hZC5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZENvdW50KCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChsb2FkQ291bnQsIDMwXzAwMCk7XG4gICAgcmV0dXJuICgpID0+IHsgaXNBY3RpdmUgPSBmYWxzZTsgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7IH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBpbml0aWFsID0gKHNlc3Npb24/LmVtYWlsPy5bMF0gPz8gJ0MnKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBpc0Rhc2hib2FyZCA9IGxvY2F0aW9uLnBhdGhuYW1lID09PSAnL2FkbWluJyB8fCBsb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9hZG1pbi8nO1xuICBjb25zdCBpc01lZGlhID0gbG9jYXRpb24ucGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnknKTtcbiAgY29uc3Qgc2hvd1BhbmVsID0gIWlzTWVkaWE7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW1lbnVPcGVuKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZU91dHNpZGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKCFhdmF0YXJSZWYuY3VycmVudD8uY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZU91dHNpZGVDbGljayk7XG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZU91dHNpZGVDbGljayk7XG4gIH0sIFttZW51T3Blbl0pO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGFkbWluLXNpZGViYXItc2hlbGwke3Nob3dQYW5lbCA/ICcnIDogJyBhZG1pbi1zaWRlYmFyLXNoZWxsLS1yYWlsLW9ubHknfSR7aXNWaXNpYmxlID8gJycgOiAnIGFkbWluLXNpZGViYXItc2hlbGwtLWhpZGRlbid9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZWJhci1yYWlsXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZWJhci1sb2dvXCJcbiAgICAgICAgICAgIHNyYz1cIi9hZG1pbi1hc3NldHMvY2xpZW50LW1hcmsuc3ZnXCJcbiAgICAgICAgICAgIGFsdD1cIlRoZSBMZWFkZW5oYWxsIFdvcmtzXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXJhaWwtYnV0dG9uJHtpc0Rhc2hib2FyZCA/ICcgYWRtaW4tcmFpbC1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnL2FkbWluJyl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEhvbWVJY29uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcmFpbC1idXR0b24keyFpc0Rhc2hib2FyZCAmJiAhaXNNZWRpYSA/ICcgYWRtaW4tcmFpbC1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnL2FkbWluL3BhZ2VzL3NpdGUtc2V0dGluZ3MnKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UGVuY2lsSWNvbiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXJhaWwtYnV0dG9uJHtpc01lZGlhID8gJyBhZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNZWRpYUljb24gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJhaWwtc3BhY2VyXCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWF2YXRhclwiIHJlZj17YXZhdGFyUmVmfT5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tYXZhdGFyX19idXR0b25cIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TWVudU9wZW4oKGN1cnJlbnQpID0+ICFjdXJyZW50KX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2luaXRpYWx9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHttZW51T3BlbiA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hdmF0YXJfX21lbnVcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZSgnL2FkbWluL3BhZ2VzL2FjY291bnQnKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgQWNjb3VudFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJy9hZG1pbi9sb2dvdXQnKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgU2lnbiBvdXRcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge3Nob3dQYW5lbCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLXBhbmVsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLWhlYWRlclwiPkNvbnRlbnQgTWFuYWdlcjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZWJhci1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2xhYmVsXCI+Q29sbGVjdGlvbiBUeXBlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fY291bnRcIj57Y29sbGVjdGlvbkl0ZW1zLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7Y29sbGVjdGlvbkl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLW5hdi1saW5rJHtpdGVtLnNlbGVjdGVkID8gJyBhZG1pbi1uYXYtbGluay0tc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1uYXYtbGlua19fdGV4dFwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2xhYmVsXCI+Q3VzdG9tZXJzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19jb3VudFwiPntjdXN0b21lckl0ZW1zLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7Y3VzdG9tZXJJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1uYXYtbGluayR7aXRlbS5zZWxlY3RlZCA/ICcgYWRtaW4tbmF2LWxpbmstLXNlbGVjdGVkJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKGl0ZW0uaHJlZil9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbmF2LWxpbmtfX3RleHRcIj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9faGVhZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19sYWJlbFwiPk9yZGVyczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fY291bnRcIj57b3BlcmF0aW9uSXRlbXMubGVuZ3RoICsgKHJlZnVuZFJlcXVlc3RzVmlzaWJsZSA/IDEgOiAwKX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7b3BlcmF0aW9uSXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tbmF2LWxpbmske2l0ZW0uc2VsZWN0ZWQgPyAnIGFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCcgOiAnJ31gfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShpdGVtLmhyZWYpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW5hdi1saW5rX190ZXh0XCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge3JlZnVuZFJlcXVlc3RzVmlzaWJsZSAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tbmF2LWxpbmske2lzUmVmdW5kUmVxdWVzdHNTZWxlY3RlZCA/ICcgYWRtaW4tbmF2LWxpbmstLXNlbGVjdGVkJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFJFRlVORF9SRVFVRVNUU19IUkVGKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1uYXYtbGlua19fdGV4dFwiPlJlZnVuZCBSZXF1ZXN0czwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtwZW5kaW5nUmVmdW5kQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbmF2LWxpbmtfX2ljb25cIiBzdHlsZT17eyB3aWR0aDogJ2F1dG8nLCBmb250U2l6ZTogJzAuNjg3NXJlbScsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6ICcjYzcyZTNhJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICB7cGVuZGluZ1JlZnVuZENvdW50fVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9faGVhZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19sYWJlbFwiPlNpbmdsZSBUeXBlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fY291bnRcIj57cGFnZUl0ZW1zLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7cGFnZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLW5hdi1saW5rJHtpdGVtLnNlbGVjdGVkID8gJyBhZG1pbi1uYXYtbGluay0tc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1uYXYtbGlua19fdGV4dFwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgRm9ybUdyb3VwLFxuICBIMixcbiAgSW5wdXQsXG4gIExhYmVsLFxuICBNZXNzYWdlQm94LFxuICBUZXh0LFxufSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTG9naW4oKSB7XG4gIGNvbnN0IHByb3BzID0gd2luZG93Ll9fQVBQX1NUQVRFX18gPz8ge307XG4gIGNvbnN0IGJyYW5kaW5nID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5icmFuZGluZyk7XG4gIGNvbnN0IG1lc3NhZ2UgPSBwcm9wcy5lcnJvck1lc3NhZ2U7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94XG4gICAgICB2YXJpYW50PVwiZ3JleVwiXG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxuICAgICAgcD1cInhsXCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmNGVmZTggMCUsICNlOGRjY2YgNDUlLCAjZDljNGFiIDEwMCUpJyxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPEJveFxuICAgICAgICBiZz1cIndoaXRlXCJcbiAgICAgICAgd2lkdGg9e1snMTAwJScsICcxMDAlJywgJzk2MHB4J119XG4gICAgICAgIG1pbkhlaWdodD1cIjU2MHB4XCJcbiAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcbiAgICAgICAgYm9yZGVyUmFkaXVzPVwieGxcIlxuICAgICAgICBvdmVyZmxvdz1cImhpZGRlblwiXG4gICAgICA+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICB3aWR0aD17WycwJywgJzAnLCAnNDQlJ119XG4gICAgICAgICAgZGlzcGxheT17Wydub25lJywgJ25vbmUnLCAnZmxleCddfVxuICAgICAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxuICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiXG4gICAgICAgICAgcD1cInh4bFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGYwZjBmIDAlLCAjMWYxZjFmIDEwMCUpJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2Y1ZjFlYScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxCb3g+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi9hZG1pbi1hc3NldHMvbG9nby5zdmdcIlxuICAgICAgICAgICAgICBhbHQ9e2JyYW5kaW5nLmNvbXBhbnlOYW1lfVxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogNzIsIGhlaWdodDogNzIsIG9iamVjdEZpdDogJ2NvbnRhaW4nLCBtYXJnaW5Cb3R0b206IDI0IH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEgyIGNvbG9yPVwid2hpdGVcIiBtYXJnaW5Cb3R0b209XCJsZ1wiPkNsaWVudCBDb250ZW50IFBvcnRhbDwvSDI+XG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk0MFwiPlxuICAgICAgICAgICAgICBNYW5hZ2UgdGhlIHNhbWUgY2xpZW50LWZhY2luZyBjb250ZW50IHN1cmZhY2UgdXNlZCBieSB0aGUgbGl2ZSBzaXRlLlxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTUwXCI+VGhlIExlYWRlbmhhbGwgV29ya3M8L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBhcz1cImZvcm1cIlxuICAgICAgICAgIGFjdGlvbj17cHJvcHMuYWN0aW9ufVxuICAgICAgICAgIG1ldGhvZD1cIlBPU1RcIlxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIHA9XCJ4eGxcIlxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IG1iPVwieHhsXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi9hZG1pbi1hc3NldHMvbG9nby5zdmdcIlxuICAgICAgICAgICAgICBhbHQ9e2JyYW5kaW5nLmNvbXBhbnlOYW1lfVxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogNjQsIGhlaWdodDogNjQsIG9iamVjdEZpdDogJ2NvbnRhaW4nLCBtYXJnaW5Cb3R0b206IDIwIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEgyIG1hcmdpbj1cIjBcIj5TaWduIGluPC9IMj5cbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCI+Q2xpZW50IGVkaXRvciBhY2Nlc3MgZm9yIFRoZSBMZWFkZW5oYWxsIFdvcmtzLjwvVGV4dD5cbiAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgIHttZXNzYWdlID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiIG1iPVwibGdcIj57bWVzc2FnZX08L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+RW1haWw8L0xhYmVsPlxuICAgICAgICAgICAgPElucHV0IG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiY2xpZW50QGxlYWRlbmhhbGx3b3Jrcy5jb21cIiAvPlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5QYXNzd29yZDwvTGFiZWw+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBwYXNzd29yZFwiXG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImN1cnJlbnQtcGFzc3dvcmRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgIDxCb3ggbXQ9XCJ4bFwiPlxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIHNpemU9XCJsZ1wiPkxvZyBpbjwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9wQmFyKCkge1xuICByZXR1cm4gbnVsbDtcbn1cbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZFxuaW1wb3J0IENvbGxlY3Rpb25NYW5hZ2VyIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25NYW5hZ2VyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db2xsZWN0aW9uTWFuYWdlciA9IENvbGxlY3Rpb25NYW5hZ2VyXG5pbXBvcnQgQ29udGVudFBhZ2VFZGl0b3IgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3InXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbnRlbnRQYWdlRWRpdG9yID0gQ29udGVudFBhZ2VFZGl0b3JcbmltcG9ydCBNZWRpYUxpYnJhcnkgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5NZWRpYUxpYnJhcnkgPSBNZWRpYUxpYnJhcnlcbmltcG9ydCBBY2NvdW50U2V0dGluZ3MgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQWNjb3VudFNldHRpbmdzJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5BY2NvdW50U2V0dGluZ3MgPSBBY2NvdW50U2V0dGluZ3NcbmltcG9ydCBSZWZ1bmRSZXF1ZXN0cyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9SZWZ1bmRSZXF1ZXN0cydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUmVmdW5kUmVxdWVzdHMgPSBSZWZ1bmRSZXF1ZXN0c1xuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvU2lkZWJhcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuU2lkZWJhciA9IFNpZGViYXJcbmltcG9ydCBMb2dpbiBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Mb2dpbidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTG9naW4gPSBMb2dpblxuaW1wb3J0IFRvcEJhciBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Ub3BCYXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlRvcEJhciA9IFRvcEJhciJdLCJuYW1lcyI6WyJBRE1JTl9SRVNPVVJDRV9ERUZJTklUSU9OUyIsInRhYmxlIiwibGFiZWwiLCJzaWRlYmFyTGFiZWwiLCJuYXZpZ2F0aW9uIiwic2lkZWJhclNlY3Rpb24iLCJzaWRlYmFySHJlZiIsImhpZGRlbkNvbHVtbnMiLCJsaXN0UHJvcGVydGllcyIsImZpbHRlclByb3BlcnRpZXMiLCJyZWFkT25seSIsImJ1aWxkQWRtaW5SZXNvdXJjZUhyZWYiLCJyZXNvdXJjZUlkIiwiUFJJTUFSWV9QQUdFUyIsImhyZWYiLCJDT0xMRUNUSU9OUyIsIkNVU1RPTUVSX1FVSUNLX09SREVSIiwiT1JERVJfUVVJQ0tfT1JERVIiLCJDVVNUT01FUlMiLCJtYXAiLCJmaW5kIiwiZGVmaW5pdGlvbiIsImZpbHRlciIsIkJvb2xlYW4iLCJPUkRFUlMiLCJTVFlMRVMiLCJhcGkiLCJBcGlDbGllbnQiLCJmb3JtYXRTdWJtaXNzaW9uRGF0ZSIsInZhbHVlIiwiZGF0ZSIsIkRhdGUiLCJOdW1iZXIiLCJpc05hTiIsImdldFRpbWUiLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJkYXRlU3R5bGUiLCJ0aW1lU3R5bGUiLCJmb3JtYXQiLCJ0cmltTWVzc2FnZSIsIm1lc3NhZ2UiLCJub3JtYWxpemVkIiwiU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsInNsaWNlIiwidHJpbUVuZCIsImNvZXJjZUpzb24iLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJmZXRjaEFkbWluSnNvbiIsInVybCIsIm9wdGlvbnMiLCJyZXNwb25zZSIsImZldGNoIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwidGV4dCIsInBheWxvYWQiLCJvayIsImVycm9yIiwic3RhdHVzIiwiRXJyb3IiLCJub3JtYWxpemVBZG1pblN1Ym1pc3Npb25QYXlsb2FkIiwiQXJyYXkiLCJpc0FycmF5IiwiZGF0YSIsIm5vcm1hbGl6ZVN1Ym1pc3Npb25SZWNvcmQiLCJyZWNvcmQiLCJwYXJhbXMiLCJpZCIsIm5hbWUiLCJlbWFpbCIsInBob25lIiwic291cmNlUGFnZSIsInNvdXJjZV9wYWdlIiwiY3JlYXRlZEF0IiwiY3JlYXRlZF9hdCIsIm5vcm1hbGl6ZVJlc291cmNlU3VibWlzc2lvblBheWxvYWQiLCJyZWNvcmRzIiwic3VibWlzc2lvbiIsImlzRmluaXRlIiwibm9ybWFsaXplUmVzb3VyY2VSZWNvcmRQYXlsb2FkIiwiZ2V0UmVjZW50U3VibWlzc2lvbnMiLCJwcm9wcyIsInJlY2VudFN1Ym1pc3Npb25zIiwicmVjZW50TWVzc2FnZXMiLCJyZXNvbHZlU3VibWlzc2lvblBheWxvYWQiLCJzb3VyY2UiLCJib2R5IiwicmVzdWx0IiwiaXRlbXMiLCJub3JtYWxpemVEYXNoYm9hcmRSZXNwb25zZSIsImZldGNoRGFzaGJvYXJkTWVzc2FnZXMiLCJmZXRjaEFkbWluTWVzc2FnZXMiLCJsaW1pdCIsInNhZmVMaW1pdCIsIm5vcm1hbGl6ZUN1c3RvbVJlc3BvbnNlIiwiY3VzdG9tUGF5bG9hZCIsImN1c3RvbVN1Ym1pc3Npb25zIiwiY29uc29sZSIsIndhcm4iLCJyZXNvdXJjZVBheWxvYWQiLCJkZWxldGVBZG1pblN1Ym1pc3Npb24iLCJwYXJzZWRJZCIsIm1ldGhvZCIsIkFjY2VwdCIsImJhc2VFcnJvciIsIm5vdGljZSIsInR5cGUiLCJmZXRjaEFkbWluU3VibWlzc2lvbkJ5SWQiLCJjdXN0b21TdWJtaXNzaW9uIiwiU2hvcnRjdXRMaXN0IiwidGl0bGUiLCJuYXZpZ2F0ZSIsIm1ldGEiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpdGVtIiwia2V5Iiwib25DbGljayIsIk1lc3NhZ2VzQ2FyZCIsInN1Ym1pc3Npb25zIiwic2VsZWN0ZWRTdWJtaXNzaW9uIiwib25PcGVuIiwib25EZWxldGUiLCJkZWxldGluZ0lkIiwib3BlcmF0aW9uRXJyb3IiLCJkaXNhYmxlZCIsIkRhc2hib2FyZCIsInVzZU5hdmlnYXRlIiwiZGFzaGJvYXJkU3VibWlzc2lvbnMiLCJzZXREYXNoYm9hcmRTdWJtaXNzaW9ucyIsInVzZVN0YXRlIiwic2V0U2VsZWN0ZWRTdWJtaXNzaW9uIiwic2V0RGVsZXRpbmdJZCIsInNldE9wZXJhdGlvbkVycm9yIiwidXNlRWZmZWN0IiwiaW5pdGlhbFN1Ym1pc3Npb25zIiwiaXNBY3RpdmUiLCJsb2FkRGFzaGJvYXJkRGF0YSIsImFzc2lnblN1Ym1pc3Npb25zIiwibmV4dFN1Ym1pc3Npb25zIiwiZGFzaGJvYXJkUmVzcG9uc2UiLCJnZXREYXNoYm9hcmQiLCJmYWxsYmFja1N1Ym1pc3Npb25zIiwiZGFzaGJvYXJkT25seVBheWxvYWQiLCJkYXNoYm9hcmRPbmx5U3VibWlzc2lvbnMiLCJmYWxsYmFja1BheWxvYWQiLCJmYWxsYmFja0Vycm9yIiwiaGFuZGxlT3BlblN1Ym1pc3Npb24iLCJmcmVzaFN1Ym1pc3Npb24iLCJoYW5kbGVEZWxldGVTdWJtaXNzaW9uIiwidGFyZ2V0SWQiLCJwcmV2aW91cyIsIkZyYWdtZW50IiwiTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4iLCJJTUFHRV9GSUVMRF9QQVRURVJOIiwiQk9PTEVBTl9GSUVMRF9QQVRURVJOIiwiRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOIiwidG9MYWJlbCIsInJlcGxhY2UiLCJ2IiwidG9VcHBlckNhc2UiLCJjbG9uZVZhbHVlIiwic3RyaW5naWZ5IiwiZ2V0RW1wdHlJdGVtIiwic2FtcGxlIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJrZXlzIiwiaW5jbHVkZXMiLCJ0b0NvbXBhcmFibGVWYWx1ZSIsInNvcnQiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImhhc01lYW5pbmdmdWxWYWx1ZSIsInNvbWUiLCJlbnRyaWVzIiwibmVzdGVkVmFsdWUiLCJidWlsZEFkbWluUGF0aCIsInBhdGhuYW1lIiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiZm9yRWFjaCIsInVuZGVmaW5lZCIsInNldCIsInF1ZXJ5U3RyaW5nIiwidG9TdHJpbmciLCJwYXJzZURpc3BsYXllZEZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJwYXJzZUlucHV0VmFsdWUiLCJuZXh0UmF3VmFsdWUiLCJjdXJyZW50VmFsdWUiLCJwYXJzZWQiLCJnZXRSZXBlYXRhYmxlSXRlbVZhbHVlIiwiZ2V0TWVkaWFEaXNwbGF5TmFtZSIsImZhbGxiYWNrIiwicmF3IiwicGFydHMiLCJ3aXRoUmVwZWF0YWJsZUl0ZW1WYWx1ZSIsIm5leHRWYWx1ZSIsInJlc29sdmVNZWRpYVByZXZpZXdVcmwiLCJ0ZXN0Iiwic3RhcnRzV2l0aCIsInVwZGF0ZUF0UGF0aCIsInBhdGgiLCJzZWdtZW50IiwicmVzdCIsImNsb25lIiwicmVtb3ZlQXRQYXRoIiwiXyIsImluZGV4IiwiYXBwZW5kQXRQYXRoIiwibmV4dEl0ZW0iLCJtb3ZlQXRQYXRoIiwib2Zmc2V0IiwibmV4dEluZGV4IiwibW92ZWQiLCJzcGxpY2UiLCJnZXREaXNwbGF5VGl0bGUiLCJ0aXRsZUZpZWxkIiwiZm9ybWF0TW9uZXlWYWx1ZSIsImN1cnJlbmN5IiwiYW1vdW50Iiwic2FmZUN1cnJlbmN5IiwiTnVtYmVyRm9ybWF0Iiwic3R5bGUiLCJ0b0ZpeGVkIiwiZm9ybWF0UHJvZmlsZURpc3BsYXlWYWx1ZSIsInJhd1ZhbHVlIiwibm9ybWFsaXplZFZhbHVlIiwibW9uZXlGaWVsZHMiLCJsZXR0ZXIiLCJpc0Jsb2dEaXNhYmxlZEZpZWxkIiwiaXNGYXFEaXNhYmxlZEZpZWxkIiwiaXNNZWV0aW5nUm9vbURpc2FibGVkRmllbGQiLCJpc1Zpc2liaWxpdHlUb2dnbGVGaWVsZCIsImdldEZpZWxkRGlzcGxheUxhYmVsIiwicmVxdWVzdFBhZ2UiLCJwYWdlTmFtZSIsInF1ZXJ5IiwidHJpbW1lZFRleHQiLCJ0b0xvd2VyQ2FzZSIsImlzSHRtbCIsInJlZGlyZWN0ZWRUb0xvZ2luIiwicmVkaXJlY3RlZCIsImlzQXV0aEVycm9yIiwidXBsb2FkQWRtaW5JbWFnZSIsImZpbGUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwianNvbiIsImNhdGNoIiwidXBsb2FkZWRVcmwiLCJyZWxhdGl2ZVVybCIsIk1FRElBX1BJQ0tFUl9FVkVOVCIsImNob29zZUFkbWluTGlicmFyeUltYWdlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3aW5kb3ciLCJwaWNrZXJXaW5kb3ciLCJvcGVuIiwiZmluaXNoZWQiLCJjbGVhbnVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1lc3NhZ2UiLCJjbGVhckludGVydmFsIiwiY2xvc2VXYXRjaGVyIiwiZXZlbnQiLCJvcmlnaW4iLCJsb2NhdGlvbiIsInNldEludGVydmFsIiwiY2xvc2VkIiwiYWRkRXZlbnRMaXN0ZW5lciIsIk1lZGlhRmllbGQiLCJvbkNoYW5nZSIsInVybHMiLCJmaWxlSW5wdXRSZWYiLCJ1c2VSZWYiLCJ1cGxvYWRpbmciLCJzZXRVcGxvYWRpbmciLCJ1cGxvYWRFcnJvciIsInNldFVwbG9hZEVycm9yIiwic3JjIiwiYWx0IiwiY3VycmVudCIsImNsaWNrIiwic2VsZWN0ZWRVcmwiLCJyZWYiLCJhY2NlcHQiLCJtdWx0aXBsZSIsImRpc3BsYXkiLCJmaWxlcyIsImZyb20iLCJ0YXJnZXQiLCJ1cGxvYWRlZFVybHMiLCJwdXNoIiwiUHJpbWl0aXZlRmllbGQiLCJzZWxlY3RPcHRpb25zIiwic2VsZWN0RmllbGRzIiwiaW5wdXRUeXBlIiwiaW5wdXRUeXBlcyIsImlzRGlzYWJsZWRGaWVsZCIsImNoZWNrZWQiLCJvcHRpb24iLCJQcm9maWxlSW5mb0NhcmQiLCJpbmZvQ2FyZEZpZWxkcyIsImluZm9DYXJkQmxvY2tGaWVsZHMiLCJvcHRpb25hbEluZm9DYXJkRmllbGRzIiwiU2V0Iiwib3B0aW9uYWxJbmZvQ2FyZEJsb2NrRmllbGRzIiwiaW5mb0NhcmRUaXRsZUZpZWxkIiwicmF3VGl0bGUiLCJjYXJkVGl0bGUiLCJjYXJkTWV0YUxhYmVsIiwibWV0YUxhYmVsIiwiY2FyZEV5ZWJyb3ciLCJlbmRzV2l0aCIsInRpdGxlVG9rZW5zIiwidG9rZW4iLCJhdmF0YXJMYWJlbCIsImpvaW4iLCJtYW51YWxUYWciLCJpc1Byb2ZpbGVTdW1tYXJ5TGF5b3V0Iiwic3VtbWFyeUZpZWxkcyIsImRpc3BsYXlWYWx1ZSIsInZhbHVlQ2xhc3NOYW1lcyIsImhhcyIsInJvd3MiLCJNYXRoIiwibWF4IiwibWluIiwiTWVzc2FnZVJlcGx5UGFuZWwiLCJyZXBsaWVzIiwicmVwbHlEcmFmdCIsIm9uUmVwbHlDaGFuZ2UiLCJvblNlbmRSZXBseSIsInNlbmRpbmdSZXBseSIsInJlcGx5IiwiYWRtaW5FbWFpbCIsInN1YmplY3QiLCJBcnJheUZpZWxkIiwib25BZGRJdGVtIiwib25SZW1vdmVJdGVtIiwib25Nb3ZlSXRlbSIsImlzSW1hZ2VBcnJheSIsImRyYWdJbmRleCIsInNldERyYWdJbmRleCIsImRyYWdPdmVySW5kZXgiLCJzZXREcmFnT3ZlckluZGV4IiwidXBsb2FkaW5nSW5kZXgiLCJzZXRVcGxvYWRpbmdJbmRleCIsImZpbGVJbnB1dFJlZnMiLCJvbkRyYWdPdmVyIiwicHJldmVudERlZmF1bHQiLCJvbkRyb3AiLCJvbkRyYWdMZWF2ZSIsInN0b3BQcm9wYWdhdGlvbiIsImRyYWdnYWJsZSIsIm9uRHJhZ1N0YXJ0IiwiZGF0YVRyYW5zZmVyIiwiZWZmZWN0QWxsb3dlZCIsInNldERhdGEiLCJvbkRyYWdFbmQiLCJtYXJnaW5Ub3AiLCJlbGVtZW50IiwicGFkZGluZyIsIkZpZWxkUmVuZGVyZXIiLCJyZW5kZXJMaXN0Q2VsbCIsIkxpc3RWaWV3IiwiY29udHJvbHMiLCJzZWFyY2giLCJsb2FkaW5nIiwib25TZWFyY2giLCJvbk9wZW5SZWNvcmQiLCJvbkNyZWF0ZSIsIm9uU2V0U29ydCIsIm9uU2V0RmlsdGVyIiwib25SZXNldEZpbHRlcnMiLCJvblRvZ2dsZURpc3BsYXllZEZpZWxkIiwib25SZXNldERpc3BsYXllZEZpZWxkcyIsIm9uRHVwbGljYXRlUmVjb3JkIiwib25EZWxldGVSZWNvcmQiLCJzaG93U2VhcmNoIiwic2V0U2hvd1NlYXJjaCIsImZpbHRlcnNPcGVuIiwic2V0RmlsdGVyc09wZW4iLCJzaG93RGlzcGxheWVkIiwic2V0U2hvd0Rpc3BsYXllZCIsInNlYXJjaFZhbHVlIiwic2V0U2VhcmNoVmFsdWUiLCJvcGVuTWVudUlkIiwic2V0T3Blbk1lbnVJZCIsIm1lbnVSZWYiLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImhhbmRsZVBvaW50ZXJEb3duIiwiY29udGFpbnMiLCJkb2N1bWVudCIsImRpc3BsYXllZENvbHVtbnMiLCJ1c2VNZW1vIiwiYXZhaWxhYmxlRmllbGRzIiwiZGlzcGxheWVkRmllbGRzIiwic2hvd0NyZWF0ZSIsImFsbG93Q3JlYXRlIiwiaGFzRmlsdGVycyIsImZpbHRlcnMiLCJhbGxvd0R1cGxpY2F0ZSIsImFsbG93RGVsZXRlIiwicGxhY2Vob2xkZXIiLCJhdXRvRm9jdXMiLCJsZWZ0IiwicmlnaHQiLCJhY3RpdmVGaWx0ZXJzIiwiY29sdW1uIiwic29ydEJ5Iiwic29ydE9yZGVyIiwiZG9jdW1lbnRJZCIsImNvbHVtbnMiLCJFZGl0VmlldyIsInB1Ymxpc2hlZFJlY29yZCIsImFjdGl2ZVRhYiIsIm9uU3dpdGNoVGFiIiwic2F2aW5nIiwib25CYWNrIiwib25TYXZlIiwib25QdWJsaXNoIiwib25EaXNjYXJkQ2hhbmdlcyIsIm9uVW5wdWJsaXNoIiwiY2FuU2F2ZSIsImNhblB1Ymxpc2giLCJjYW5EaXNjYXJkIiwiY2FuVW5wdWJsaXNoIiwiaXNDcmVhdGVNb2RlIiwiZGlzcGxheWVkUmVjb3JkIiwiaXNQdWJsaXNoZWRWaWV3IiwiaXNNYW51YWxFbnRyeSIsImVudHJ5U291cmNlIiwic3VwcG9ydHNFZGl0aW5nIiwic2hvd1ZlcnNpb25UYWJzIiwiYWxsb3dQdWJsaXNoIiwiYWxsb3dTYXZlIiwiZWRpdGFibGVGaWVsZHMiLCJjcmVhdGVGaWVsZHMiLCJtYW51YWxFZGl0YWJsZUZpZWxkcyIsImhpZGRlbkNhcmRGaWVsZHMiLCJzaG93U3RhbmRhbG9uZUhlYWRlciIsImFjdGl2ZUxheW91dCIsImNyZWF0ZUxheW91dCIsImVkaXRMYXlvdXQiLCJtYW51YWxFZGl0TGF5b3V0IiwibWVudU9wZW4iLCJzZXRNZW51T3BlbiIsIk1lc3NhZ2VCb3giLCJ2YXJpYW50Iiwicm93IiwidmlzaWJsZUZpZWxkcyIsImZpZWxkRGlzYWJsZWQiLCJDb2xsZWN0aW9uTWFuYWdlciIsInVzZVBhcmFtcyIsInVzZUxvY2F0aW9uIiwiYWRkTm90aWNlIiwidXNlTm90aWNlIiwic2V0TG9hZGluZyIsImxpc3RMb2FkaW5nIiwic2V0TGlzdExvYWRpbmciLCJzZXRTYXZpbmciLCJzZXREZWZpbml0aW9uIiwic2V0UmVjb3JkcyIsInNldENvbnRyb2xzIiwic2V0UmVjb3JkIiwib3JpZ2luYWxSZWNvcmQiLCJzZXRPcmlnaW5hbFJlY29yZCIsInNldFB1Ymxpc2hlZFJlY29yZCIsInNldEFjdGl2ZVRhYiIsInNldEVycm9yIiwic2V0UmVwbHlEcmFmdCIsInNldFNlbmRpbmdSZXBseSIsInJlY29yZElkIiwiZ2V0IiwiaXNOZXciLCJjYXRlZ29yeSIsInBsYW5UeXBlIiwiZmVhdHVyZWQiLCJpc0ZlYXR1cmVkIiwiaXNQb3B1bGFyIiwiaXNNYW51YWxFZGl0YWJsZVJlY29yZCIsImNhbkVkaXRDdXJyZW50UmVjb3JkIiwibW9kZSIsImlzRGlydHkiLCJoYXNEcmFmdENvbnRlbnQiLCJoYXNVbnB1Ymxpc2hlZENoYW5nZXMiLCJhY3RpdmUiLCJsb2FkIiwic2hvdWxkQmxvY2siLCJuZXciLCJuZXh0RHJhZnRSZWNvcmQiLCJkcmFmdFJlY29yZCIsImxvYWRFcnJvciIsInVwZGF0ZUxpc3RRdWVyeSIsInBhdGNoIiwibmV4dFBhcmFtcyIsImhhbmRsZUNoYW5nZSIsImhhbmRsZUFkZEl0ZW0iLCJoYW5kbGVSZW1vdmVJdGVtIiwiaGFuZGxlTW92ZUl0ZW0iLCJoYW5kbGVTYXZlSW50ZW50IiwiaW50ZW50IiwiZGVsZXRlZCIsInJlcXVlc3RFcnJvciIsImhhbmRsZURpc2NhcmRDaGFuZ2VzIiwiaGFuZGxlQ3JlYXRlIiwiaGFuZGxlTGlzdEFjdGlvbiIsInRhcmdldFJlY29yZElkIiwiaGFuZGxlUmVwbHlDaGFuZ2UiLCJoYW5kbGVTZW5kUmVwbHkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJoZWlnaHQiLCJMb2FkZXIiLCJsaXN0Q29sdW1ucyIsIm5leHRTZWFyY2giLCJuZXh0UmVjb3JkSWQiLCJuZXh0T3JkZXIiLCJuZXh0RmllbGRzIiwiUEFUSF9GSUVMRF9QQVRURVJOIiwiUkVRVUlSRURfRklFTERfUEFUVEVSTiIsIlJPVVRFX09QVElPTlMiLCJQQUdFX0xBWU9VVFMiLCJmaWVsZHMiLCJob21lcGFnZSIsImdldEZpZWxkTGFiZWwiLCJmaWVsZEtleSIsImdldFBhdGhPcHRpb25zIiwidW5zaGlmdCIsImlzUGxhaW5PYmplY3QiLCJnZXRGaWxlbmFtZSIsIlVSTCIsImZpbGVuYW1lIiwicG9wIiwidHJpbW1lZCIsInRvQWRtaW5FcnJvck1lc3NhZ2UiLCJyZXNwb25zZURhdGEiLCJpc1JlcXVpcmVkRmllbGQiLCJmaWVsZENsYXNzTmFtZSIsImlzSGlkZGVuRWRpdG9yRmllbGQiLCJnZXRJdGVtVGl0bGUiLCJmYWxsYmFja0xhYmVsIiwicHJlZmVycmVkIiwicXVlc3Rpb24iLCJmZWF0dXJlIiwiYnVpbGRTZWN0aW9ucyIsImNvbnRlbnQiLCJsYXlvdXQiLCJ1c2VkIiwic2VjdGlvbnMiLCJzZWN0aW9uIiwic2VjdGlvbkVudHJpZXMiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJhZGQiLCJleHRyYUVudHJpZXMiLCJpbnB1dFZhbHVlIiwicmVxdWlyZWQiLCJpc0ltYWdlRmllbGQiLCJpc1BhdGhGaWVsZCIsInByZXZpZXdVcmwiLCJzaG93UHJldmlldyIsInNlbGVjdGVkRmlsZSIsIk9iamVjdEZpZWxkIiwibmVzdGVkS2V5IiwiRm9ybVNlY3Rpb24iLCJDb250ZW50UGFnZUVkaXRvciIsInBhZ2VMYWJlbCIsInNldFBhZ2VMYWJlbCIsInNldENvbnRlbnQiLCJvcmlnaW5hbENvbnRlbnQiLCJzZXRPcmlnaW5hbENvbnRlbnQiLCJwdWJsaXNoZWRDb250ZW50Iiwic2V0UHVibGlzaGVkQ29udGVudCIsImRpc3BsYXllZENvbnRlbnQiLCJlbnRyeVRpdGxlIiwiaGVyb1RpdGxlIiwic2l0ZU5hbWUiLCJpc01vdW50ZWQiLCJsb2FkUGFnZSIsImdldFBhZ2UiLCJuZXh0RHJhZnRDb250ZW50IiwiZHJhZnREYXRhIiwicHVibGlzaGVkRGF0YSIsImhhbmRsZVNhdmUiLCJzYXZlRXJyb3IiLCJoaXN0b3J5IiwiYmFjayIsImJ1aWxkUGFnZVBhdGgiLCJyZXF1ZXN0TWVkaWEiLCJBc3NldENhcmQiLCJwaWNrZXJNb2RlIiwidGh1bWJuYWlsVXJsIiwiYWx0ZXJuYXRpdmVUZXh0IiwibWltZSIsImV4dCIsIndpZHRoIiwiY29sb3IiLCJmb250V2VpZ2h0IiwiRGV0YWlsVmlldyIsIm9uU2VsZWN0IiwibWFyZ2luQm90dG9tIiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwiY2FwdGlvbiIsInNpemVMYWJlbCIsInByb3ZpZGVyIiwiZm9sZGVyUGF0aCIsInVwZGF0ZWRBdExhYmVsIiwiY3JlYXRlZEF0TGFiZWwiLCJNZWRpYUxpYnJhcnkiLCJmaWxlSWQiLCJzZXRJdGVtcyIsImNvdW50Iiwic2V0Q291bnQiLCJzZXRJdGVtIiwib3Blbkxpc3QiLCJwaWNrZXIiLCJzZWxlY3RBc3NldCIsInNlbGVjdGVkSXRlbSIsIm9wZW5lciIsInBvc3RNZXNzYWdlIiwiY2xvc2UiLCJpbnB1dCIsIm9uY2hhbmdlIiwicmVmcmVzaGVkUGF5bG9hZCIsImRlZmF1bHRWYWx1ZSIsIm1lZGlhSXRlbSIsInJlcXVlc3RBY2NvdW50IiwiQWNjb3VudFNldHRpbmdzIiwic3VibWl0dGluZyIsInNldFN1Ym1pdHRpbmciLCJzdWNjZXNzIiwic2V0U3VjY2VzcyIsInNldEVtYWlsIiwiY3VycmVudFBhc3N3b3JkIiwic2V0Q3VycmVudFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJzZXROZXdQYXNzd29yZCIsImNvbmZpcm1QYXNzd29yZCIsInNldENvbmZpcm1QYXNzd29yZCIsInRoZW4iLCJmaW5hbGx5Iiwib25TdWJtaXQiLCJhc3NpZ24iLCJzdWJtaXRFcnJvciIsIm1iIiwiYXV0b0NvbXBsZXRlIiwiZ2FwIiwiZm9ybWF0Qm9va2luZ0RhdGUiLCJ3ZWVrZGF5IiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwiaG91ciIsIm1pbnV0ZSIsImZvcm1hdEN1cnJlbmN5IiwiYW1vdW50TWlub3IiLCJmb3JtYXRUaW1lQWdvIiwiZGlmZiIsIm5vdyIsIm1pbnV0ZXMiLCJmbG9vciIsImhvdXJzIiwiZGF5cyIsIlJlZnVuZFJlcXVlc3RzIiwidGFiIiwic2V0VGFiIiwicGVuZGluZ1JlcXVlc3RzIiwic2V0UGVuZGluZ1JlcXVlc3RzIiwicHJvY2Vzc2VkUmVxdWVzdHMiLCJzZXRQcm9jZXNzZWRSZXF1ZXN0cyIsInByb2Nlc3NpbmdJZCIsInNldFByb2Nlc3NpbmdJZCIsInN1Y2Nlc3NNYXAiLCJzZXRTdWNjZXNzTWFwIiwicGVuZGluZ1BheWxvYWQiLCJwcm9jZXNzZWRQYXlsb2FkIiwiYWxsIiwiZXJyIiwiaW5uZXJFcnIiLCJoYW5kbGVBcHByb3ZlIiwicmVxdWVzdCIsInByZXYiLCJyIiwicmVmdW5kUmVxdWVzdFN0YXR1cyIsIm5leHQiLCJoYW5kbGVSZWplY3QiLCJhY3RpdmVMaXN0IiwidXNlck5hbWUiLCJ1c2VyRW1haWwiLCJyZXNvdXJjZU5hbWUiLCJzdGFydEF0IiwidG90YWxNaW5vciIsInJlZnVuZFJlcXVlc3RlZEF0IiwiUkVGVU5EX1JFUVVFU1RTX0hSRUYiLCJDT05URU5UX1BBR0VfT1JERVIiLCJDT05URU5UX1BBR0VfTEFCRUxTIiwiU0lERUJBUl9XSURUSCIsIlJBSUxfV0lEVEgiLCJpdGVtTWF0Y2hlc1NlYXJjaCIsImJ1aWxkU2lkZWJhclJlc291cmNlSXRlbXMiLCJyZXNvdXJjZVBhdGhQcmVmaXgiLCJzZWxlY3RlZFByZWZpeGVzIiwic2VsZWN0ZWQiLCJwcmVmaXgiLCJyZXNvdXJjZSIsIlJhaWxJY29uIiwiY2hpbGRyZW4iLCJ2aWV3Qm94IiwiSG9tZUljb24iLCJkIiwiUGVuY2lsSWNvbiIsIk1lZGlhSWNvbiIsIngiLCJ5IiwicngiLCJjeCIsImN5IiwiU2lkZWJhciIsImlzVmlzaWJsZSIsInBhZ2VzIiwidXNlU2VsZWN0b3IiLCJzdGF0ZSIsInNlc3Npb24iLCJzZXRTZWFyY2giLCJwZW5kaW5nUmVmdW5kQ291bnQiLCJzZXRQZW5kaW5nUmVmdW5kQ291bnQiLCJhdmF0YXJSZWYiLCJwYWdlSXRlbXMiLCJwYWdlIiwiY29sbGVjdGlvbkl0ZW1zIiwib3BlcmF0aW9uSXRlbXMiLCJjdXN0b21lckl0ZW1zIiwicmVmdW5kUmVxdWVzdHNWaXNpYmxlIiwiaXNSZWZ1bmRSZXF1ZXN0c1NlbGVjdGVkIiwibG9hZENvdW50IiwiaW50ZXJ2YWwiLCJpbml0aWFsIiwiaXNEYXNoYm9hcmQiLCJpc01lZGlhIiwic2hvd1BhbmVsIiwiaGFuZGxlT3V0c2lkZUNsaWNrIiwiTG9naW4iLCJfX0FQUF9TVEFURV9fIiwiYnJhbmRpbmciLCJlcnJvck1lc3NhZ2UiLCJCb3giLCJwIiwiYmFja2dyb3VuZCIsImJnIiwibWluSGVpZ2h0IiwiYm94U2hhZG93IiwiYm9yZGVyUmFkaXVzIiwib3ZlcmZsb3ciLCJmbGV4RGlyZWN0aW9uIiwiY29tcGFueU5hbWUiLCJvYmplY3RGaXQiLCJIMiIsIlRleHQiLCJhcyIsImFjdGlvbiIsImZsZXhHcm93IiwibWFyZ2luIiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJJbnB1dCIsIm10IiwiQnV0dG9uIiwic2l6ZSIsIlRvcEJhciIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUFPLE1BQU1BLDBCQUEwQixHQUFHLENBQ3hDO0VBQ0VDLEVBQUFBLEtBQUssRUFBRSxZQUFZ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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztFQUVELE1BQU1DLEtBQUcsR0FBRyxJQUFJQyxpQkFBUyxFQUFFO0VBRTNCLFNBQVNDLG9CQUFvQkEsQ0FBQ0MsS0FBSyxFQUFFO0lBQ25DLElBQUksQ0FBQ0EsS0FBSyxFQUFFO0VBQ1YsSUFBQSxPQUFPLEVBQUU7RUFDWCxFQUFBO0VBRUEsRUFBQSxNQUFNQyxJQUFJLEdBQUcsSUFBSUMsSUFBSSxDQUFDRixLQUFLLENBQUM7SUFFNUIsSUFBSUcsTUFBTSxDQUFDQyxLQUFLLENBQUNILElBQUksQ0FBQ0ksT0FBTyxF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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0VBRUQsU0FBUzBJLE9BQU9BLENBQUMxRixJQUFJLEVBQUU7RUFDckIsRUFBQSxPQUFPQSxJQUFJLENBQ1IyRixPQUFPLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQ3RDQSxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUN0QkEsT0FBTyxDQUFD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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7RUFFRCxTQUFTdUIsVUFBVUEsQ0FBQ0MsWUFBWSxFQUFFO0VBQ2hDLEVBQUEsSUFBSSxDQUFDQSxZQUFZLEVBQUUsT0FBTyxJQUFJO0lBQzlCLElBQUk7RUFBRSxJQUFBLE9BQU9DLElBQUksQ0FBQ0MsS0FBSyxDQUFDRixZQUFZLENBQUM7RUFBRSxFQUFBLENBQUMsQ0FBQyxNQUFNO0VBQUUsSUFBQSxPQUFPLElBQUk7RUFBRSxFQUFBO0VBQ2hFO0VBRUEsZUFBZUcsY0FBY0EsQ0FBQ0MsR0FBRyxFQUFFQyxPQUFPLEdBQUcsRUFBRSxFQUFFO0VBQy9DLEVBQUEsTUFBTUMsUUFBUSxHQUFHLE1BQU1D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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFBLEVBQTZCQSxhQUFhLENBQUE7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0VBRUQsU0FBU0UsaUJBQWlCQSxDQUFDenNCLEtBQUssRUFBRXdYLE1BQU0sRUFBRTtJQUN4QyxJQUFJLENB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
