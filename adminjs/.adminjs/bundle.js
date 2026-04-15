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
    navigation: null,
    sidebarSection: null,
    sidebarHref: '/admin/pages/meeting-rooms'
  }, {
    table: 'pricing_plans',
    label: 'Pricing Plans',
    sidebarLabel: 'Pricing Plan',
    navigation: null,
    sidebarSection: null,
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
    sidebarSection: 'customers',
    sidebarHref: '/admin/pages/memberships',
    listProperties: ['id', 'user_id', 'plan_id', 'status', 'stripe_subscription_id', 'updated_at'],
    filterProperties: ['id', 'user_id', 'plan_id', 'status', 'stripe_subscription_id'],
    readOnly: false
  }, {
    table: 'membership_plans',
    label: 'Coworking Plans (DB)',
    sidebarLabel: 'Coworking Plans',
    navigation: 'Collections',
    sidebarSection: 'collections',
    sidebarHref: '/admin/pages/db-membership-plans',
    listProperties: ['id', 'name', 'slug', 'monthly_price_minor', 'currency', 'active', 'updated_at'],
    filterProperties: ['id', 'name', 'slug', 'currency', 'active'],
    readOnly: false
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
    label: 'Meeting Rooms (DB)',
    sidebarLabel: 'Meeting Rooms (DB)',
    navigation: 'Collections',
    sidebarSection: 'collections',
    sidebarHref: '/admin/pages/db-meeting-rooms',
    listProperties: ['id', 'name', 'slug', 'type', 'hourly_rate_minor', 'active', 'updated_at'],
    filterProperties: ['id', 'name', 'slug', 'type', 'active'],
    readOnly: false
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
  const BOOLEAN_FIELD_PATTERN = /^(featured|isFeatured|isPopular|active|cancelAtPeriodEnd)$/i;
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
      return Object.keys(value).sort().filter(key => !['updatedAt', 'publishedAt'].includes(key)).reduce((accumulator, key) => {
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
    if (typeof currentValue === 'number' && nextRawValue === '') {
      return '';
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
    isCreateMode,
    onCancelMembership,
    cancellingMembership
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
    }, "Delete"))) : null, definition.name === 'memberships' && !isCreateMode && onCancelMembership ? (() => {
      const cancelableStatuses = new Set(['active', 'trialing', 'past_due', 'unpaid']);
      const currentStatus = String(record?.status || '');
      const canCancel = cancelableStatuses.has(currentStatus);
      return /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-side-card"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-side-card__head"
      }, "Membership"), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-side-card__body"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-side-note",
        style: {
          marginBottom: '10px'
        }
      }, "Cancel this membership immediately via Stripe. The member will receive a cancellation email."), /*#__PURE__*/React__default.default.createElement("button", {
        className: "admin-side-button--secondary",
        type: "button",
        style: {
          borderColor: '#d02b20',
          color: '#d02b20'
        },
        disabled: !canCancel || cancellingMembership || saving,
        onClick: onCancelMembership
      }, cancellingMembership ? 'Cancelling...' : 'Cancel Membership'), !canCancel ? /*#__PURE__*/React__default.default.createElement("div", {
        style: {
          marginTop: '6px',
          color: '#8e8ea9',
          fontSize: '.75rem'
        }
      }, "Membership is already ", currentStatus || 'not active', ".") : null));
    })() : null)))));
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
    const [cancellingMembership, setCancellingMembership] = React.useState(false);
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
    const handleCancelMembership = async () => {
      if (!record?.id) {
        return;
      }
      setCancellingMembership(true);
      setError('');
      try {
        const payload = await requestPage(pageName, {
          method: 'POST',
          body: {
            intent: 'cancelMembership',
            recordId: record.id
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
      } catch (requestError) {
        setError(requestError.message);
        addNotice({
          message: requestError.message,
          type: 'error'
        });
      } finally {
        setCancellingMembership(false);
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
      isCreateMode: isNew,
      onCancelMembership: pageName === 'memberships' ? handleCancelMembership : undefined,
      cancellingMembership: cancellingMembership
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvcmVzb3VyY2UtZGVmaW5pdGlvbnMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbk1hbmFnZXIuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3IuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5LmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL0FjY291bnRTZXR0aW5ncy5qc3giLCIuLi9zcmMvY29tcG9uZW50cy9SZWZ1bmRSZXF1ZXN0cy5qc3giLCIuLi9zcmMvY29tcG9uZW50cy9TaWRlYmFyLmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL0xvZ2luLmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL1RvcEJhci5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQURNSU5fUkVTT1VSQ0VfREVGSU5JVElPTlMgPSBbXG4gIHtcbiAgICB0YWJsZTogJ2Jsb2dfcG9zdHMnLFxuICAgIGxhYmVsOiAnQmxvZyBQb3N0cycsXG4gICAgc2lkZWJhckxhYmVsOiAnQmxvZyBQb3N0JyxcbiAgICBuYXZpZ2F0aW9uOiAnQ29sbGVjdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnY29sbGVjdGlvbnMnLFxuICAgIHNpZGViYXJIcmVmOiAnL2FkbWluL3BhZ2VzL2Jsb2ctcG9zdHMnLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdmYXFfaXRlbXMnLFxuICAgIGxhYmVsOiAnRkFRIEl0ZW1zJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdGQVEgSXRlbScsXG4gICAgbmF2aWdhdGlvbjogJ0NvbGxlY3Rpb25zJyxcbiAgICBzaWRlYmFyU2VjdGlvbjogJ2NvbGxlY3Rpb25zJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9mYXEtaXRlbXMnLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdtZWV0aW5nX3Jvb21zJyxcbiAgICBsYWJlbDogJ01lZXRpbmcgUm9vbXMnLFxuICAgIHNpZGViYXJMYWJlbDogJ01lZXRpbmcgUm9vbScsXG4gICAgbmF2aWdhdGlvbjogbnVsbCxcbiAgICBzaWRlYmFyU2VjdGlvbjogbnVsbCxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9tZWV0aW5nLXJvb21zJyxcbiAgfSxcbiAge1xuICAgIHRhYmxlOiAncHJpY2luZ19wbGFucycsXG4gICAgbGFiZWw6ICdQcmljaW5nIFBsYW5zJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdQcmljaW5nIFBsYW4nLFxuICAgIG5hdmlnYXRpb246IG51bGwsXG4gICAgc2lkZWJhclNlY3Rpb246IG51bGwsXG4gICAgc2lkZWJhckhyZWY6ICcvYWRtaW4vcGFnZXMvcHJpY2luZy1wbGFucycsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ2ZpbGVzJyxcbiAgICBsYWJlbDogJ01lZGlhIExpYnJhcnknLFxuICAgIHNpZGViYXJMYWJlbDogJ01lZGlhIExpYnJhcnknLFxuICAgIG5hdmlnYXRpb246ICdNZWRpYScsXG4gICAgc2lkZWJhclNlY3Rpb246IG51bGwsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ21lbWJlcl91c2VycycsXG4gICAgbGFiZWw6ICdDdXN0b21lcnMnLFxuICAgIHNpZGViYXJMYWJlbDogJ0N1c3RvbWVycycsXG4gICAgbmF2aWdhdGlvbjogJ09wZXJhdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnY3VzdG9tZXJzJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9jdXN0b21lcnMnLFxuICAgIGhpZGRlbkNvbHVtbnM6IFsncGFzc3dvcmRfaGFzaCddLFxuICAgIGxpc3RQcm9wZXJ0aWVzOiBbJ2lkJywgJ25hbWUnLCAnZW1haWwnLCAnYWNjZXNzX3N0YXR1cycsICdjcmVhdGVkX2F0J10sXG4gICAgZmlsdGVyUHJvcGVydGllczogWydpZCcsICduYW1lJywgJ2VtYWlsJywgJ2FjY2Vzc19zdGF0dXMnXSxcbiAgICByZWFkT25seTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIHRhYmxlOiAnbWVtYmVyc2hpcHMnLFxuICAgIGxhYmVsOiAnTWVtYmVyc2hpcHMnLFxuICAgIHNpZGViYXJMYWJlbDogJ01lbWJlcnNoaXBzJyxcbiAgICBuYXZpZ2F0aW9uOiAnT3BlcmF0aW9ucycsXG4gICAgc2lkZWJhclNlY3Rpb246ICdjdXN0b21lcnMnLFxuICAgIHNpZGViYXJIcmVmOiAnL2FkbWluL3BhZ2VzL21lbWJlcnNoaXBzJyxcbiAgICBsaXN0UHJvcGVydGllczogWydpZCcsICd1c2VyX2lkJywgJ3BsYW5faWQnLCAnc3RhdHVzJywgJ3N0cmlwZV9zdWJzY3JpcHRpb25faWQnLCAndXBkYXRlZF9hdCddLFxuICAgIGZpbHRlclByb3BlcnRpZXM6IFsnaWQnLCAndXNlcl9pZCcsICdwbGFuX2lkJywgJ3N0YXR1cycsICdzdHJpcGVfc3Vic2NyaXB0aW9uX2lkJ10sXG4gICAgcmVhZE9ubHk6IGZhbHNlLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdtZW1iZXJzaGlwX3BsYW5zJyxcbiAgICBsYWJlbDogJ0Nvd29ya2luZyBQbGFucyAoREIpJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdDb3dvcmtpbmcgUGxhbnMnLFxuICAgIG5hdmlnYXRpb246ICdDb2xsZWN0aW9ucycsXG4gICAgc2lkZWJhclNlY3Rpb246ICdjb2xsZWN0aW9ucycsXG4gICAgc2lkZWJhckhyZWY6ICcvYWRtaW4vcGFnZXMvZGItbWVtYmVyc2hpcC1wbGFucycsXG4gICAgbGlzdFByb3BlcnRpZXM6IFsnaWQnLCAnbmFtZScsICdzbHVnJywgJ21vbnRobHlfcHJpY2VfbWlub3InLCAnY3VycmVuY3knLCAnYWN0aXZlJywgJ3VwZGF0ZWRfYXQnXSxcbiAgICBmaWx0ZXJQcm9wZXJ0aWVzOiBbJ2lkJywgJ25hbWUnLCAnc2x1ZycsICdjdXJyZW5jeScsICdhY3RpdmUnXSxcbiAgICByZWFkT25seTogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ2Jvb2tpbmdzJyxcbiAgICBsYWJlbDogJ09yZGVycycsXG4gICAgc2lkZWJhckxhYmVsOiAnT3JkZXJzJyxcbiAgICBuYXZpZ2F0aW9uOiAnT3BlcmF0aW9ucycsXG4gICAgc2lkZWJhclNlY3Rpb246ICdvcmRlcnMnLFxuICAgIHNpZGViYXJIcmVmOiAnL2FkbWluL3BhZ2VzL29yZGVycycsXG4gICAgbGlzdFByb3BlcnRpZXM6IFsnaWQnLCAndXNlcl9pZCcsICdyZXNvdXJjZV9pZCcsICdzdGF0dXMnLCAncmVmdW5kX3JlcXVlc3Rfc3RhdHVzJywgJ3N0YXJ0X2F0JywgJ3RvdGFsX21pbm9yJywgJ3VwZGF0ZWRfYXQnXSxcbiAgICBmaWx0ZXJQcm9wZXJ0aWVzOiBbJ2lkJywgJ3VzZXJfaWQnLCAncmVzb3VyY2VfaWQnLCAnc3RhdHVzJywgJ3JlZnVuZF9yZXF1ZXN0X3N0YXR1cycsICdzdGFydF9hdCcsICdzdHJpcGVfcGF5bWVudF9zdGF0dXMnXSxcbiAgICByZWFkT25seTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIHRhYmxlOiAncmVzb3VyY2VzJyxcbiAgICBsYWJlbDogJ01lZXRpbmcgUm9vbXMgKERCKScsXG4gICAgc2lkZWJhckxhYmVsOiAnTWVldGluZyBSb29tcyAoREIpJyxcbiAgICBuYXZpZ2F0aW9uOiAnQ29sbGVjdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnY29sbGVjdGlvbnMnLFxuICAgIHNpZGViYXJIcmVmOiAnL2FkbWluL3BhZ2VzL2RiLW1lZXRpbmctcm9vbXMnLFxuICAgIGxpc3RQcm9wZXJ0aWVzOiBbJ2lkJywgJ25hbWUnLCAnc2x1ZycsICd0eXBlJywgJ2hvdXJseV9yYXRlX21pbm9yJywgJ2FjdGl2ZScsICd1cGRhdGVkX2F0J10sXG4gICAgZmlsdGVyUHJvcGVydGllczogWydpZCcsICduYW1lJywgJ3NsdWcnLCAndHlwZScsICdhY3RpdmUnXSxcbiAgICByZWFkT25seTogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICB0YWJsZTogJ2ludm9pY2VzJyxcbiAgICBsYWJlbDogJ0ludm9pY2VzJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdJbnZvaWNlcycsXG4gICAgbmF2aWdhdGlvbjogJ09wZXJhdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnb3JkZXJzJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9pbnZvaWNlcycsXG4gICAgbGlzdFByb3BlcnRpZXM6IFsnaWQnLCAndXNlcl9pZCcsICdtZW1iZXJzaGlwX2lkJywgJ2Jvb2tpbmdfaWQnLCAnc3RhdHVzJywgJ3RvdGFsX21pbm9yJywgJ3BhaWRfYXQnXSxcbiAgICBmaWx0ZXJQcm9wZXJ0aWVzOiBbJ2lkJywgJ3VzZXJfaWQnLCAnbWVtYmVyc2hpcF9pZCcsICdib29raW5nX2lkJywgJ3N0YXR1cycsICdzdHJpcGVfaW52b2ljZV9pZCddLFxuICAgIHJlYWRPbmx5OiB0cnVlLFxuICB9LFxuICB7XG4gICAgdGFibGU6ICdjb250YWN0X3N1Ym1pc3Npb25zJyxcbiAgICBsYWJlbDogJ01lc3NhZ2VzJyxcbiAgICBzaWRlYmFyTGFiZWw6ICdNZXNzYWdlcycsXG4gICAgbmF2aWdhdGlvbjogJ09wZXJhdGlvbnMnLFxuICAgIHNpZGViYXJTZWN0aW9uOiAnY3VzdG9tZXJzJyxcbiAgICBzaWRlYmFySHJlZjogJy9hZG1pbi9wYWdlcy9tZXNzYWdlcycsXG4gICAgbGlzdFByb3BlcnRpZXM6IFsnaWQnLCAnbmFtZScsICdlbWFpbCcsICdzb3VyY2VfcGFnZScsICdjcmVhdGVkX2F0J10sXG4gICAgZmlsdGVyUHJvcGVydGllczogWydpZCcsICduYW1lJywgJ2VtYWlsJywgJ3NvdXJjZV9wYWdlJ10sXG4gICAgcmVhZE9ubHk6IHRydWUsXG4gIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBZG1pblJlc291cmNlSHJlZihyZXNvdXJjZUlkKSB7XG4gIHJldHVybiBgL2FkbWluL3Jlc291cmNlcy8ke3Jlc291cmNlSWR9L2FjdGlvbnMvbGlzdGA7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQURNSU5fUkVTT1VSQ0VfREVGSU5JVElPTlMsIGJ1aWxkQWRtaW5SZXNvdXJjZUhyZWYgfSBmcm9tICcuLi9yZXNvdXJjZS1kZWZpbml0aW9ucy5qcyc7XG5cbmNvbnN0IFBSSU1BUllfUEFHRVMgPSBbXG4gIHsgbGFiZWw6ICdIb21lcGFnZScsIGhyZWY6ICcvYWRtaW4vcGFnZXMvaG9tZXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdBYm91dCBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9hYm91dC1wYWdlJyB9LFxuICB7IGxhYmVsOiAnUHJpY2luZyBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9wcmljaW5nLXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdDb250YWN0IFBhZ2UnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2NvbnRhY3QtcGFnZScgfSxcbl07XG5cbmNvbnN0IENPTExFQ1RJT05TID0gW1xuICB7IGxhYmVsOiAnQmxvZyBQb3N0cycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvYmxvZy1wb3N0cycgfSxcbiAgeyBsYWJlbDogJ0ZBUSBJdGVtcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvZmFxLWl0ZW1zJyB9LFxuICB7IGxhYmVsOiAnTWVldGluZyBSb29tcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvbWVldGluZy1yb29tcycgfSxcbiAgeyBsYWJlbDogJ1ByaWNpbmcgUGxhbnMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL3ByaWNpbmctcGxhbnMnIH0sXG5dO1xuXG5jb25zdCBDVVNUT01FUl9RVUlDS19PUkRFUiA9IFtcbiAgJ21lbWJlcl91c2VycycsXG4gICdjb250YWN0X3N1Ym1pc3Npb25zJyxcbl07XG5cbmNvbnN0IE9SREVSX1FVSUNLX09SREVSID0gW1xuICAnYm9va2luZ3MnLFxuICAnaW52b2ljZXMnLFxuXTtcblxuY29uc3QgQ1VTVE9NRVJTID0gQ1VTVE9NRVJfUVVJQ0tfT1JERVJcbiAgLm1hcCgocmVzb3VyY2VJZCkgPT4gQURNSU5fUkVTT1VSQ0VfREVGSU5JVElPTlMuZmluZCgoZGVmaW5pdGlvbikgPT4gZGVmaW5pdGlvbi50YWJsZSA9PT0gcmVzb3VyY2VJZCkpXG4gIC5maWx0ZXIoQm9vbGVhbilcbiAgLm1hcCgoZGVmaW5pdGlvbikgPT4gKHtcbiAgICBsYWJlbDogZGVmaW5pdGlvbi5zaWRlYmFyTGFiZWwgfHwgZGVmaW5pdGlvbi5sYWJlbCxcbiAgICBocmVmOiBkZWZpbml0aW9uLnNpZGViYXJIcmVmIHx8IGJ1aWxkQWRtaW5SZXNvdXJjZUhyZWYoZGVmaW5pdGlvbi50YWJsZSksXG4gIH0pKTtcblxuY29uc3QgT1JERVJTID0gT1JERVJfUVVJQ0tfT1JERVJcbiAgLm1hcCgocmVzb3VyY2VJZCkgPT4gQURNSU5fUkVTT1VSQ0VfREVGSU5JVElPTlMuZmluZCgoZGVmaW5pdGlvbikgPT4gZGVmaW5pdGlvbi50YWJsZSA9PT0gcmVzb3VyY2VJZCkpXG4gIC5maWx0ZXIoQm9vbGVhbilcbiAgLm1hcCgoZGVmaW5pdGlvbikgPT4gKHtcbiAgICBsYWJlbDogZGVmaW5pdGlvbi5zaWRlYmFyTGFiZWwgfHwgZGVmaW5pdGlvbi5sYWJlbCxcbiAgICBocmVmOiBkZWZpbml0aW9uLnNpZGViYXJIcmVmIHx8IGJ1aWxkQWRtaW5SZXNvdXJjZUhyZWYoZGVmaW5pdGlvbi50YWJsZSksXG4gIH0pKTtcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLWRhc2hib2FyZCB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDQwcHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pbm5lciB7XG4gIG1heC13aWR0aDogMTI0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZXllYnJvdyB7XG4gIG1hcmdpbjogMCAwIDRweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19zdWJ0aXRsZSB7XG4gIG1hcmdpbjogMTBweCAwIDI4cHg7XG4gIG1heC13aWR0aDogNzgwcHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2dyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxLjFmcikgbWlubWF4KDAsIDAuOWZyKTtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fY2FyZC1oZWFkIHtcbiAgcGFkZGluZzogMTZweCAyMHB4IDEycHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2NhcmQtYm9keSB7XG4gIHBhZGRpbmc6IDhweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9faXRlbS1jb3B5IHtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLW1ldGEge1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGNvbG9yOiAjNjY2Njg3O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLWFycm93IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbm90aWNlIHtcbiAgcGFkZGluZzogMjBweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbm90aWNlLXRpdGxlIHtcbiAgbWFyZ2luOiAwIDAgOHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX25vdGljZS1jb3B5IHtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEycHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2Uge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLW5hbWUge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtZW1haWwsXG4uYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLW1ldGEge1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1ib2R5IHtcbiAgbWFyZ2luOiAxMHB4IDAgMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbWVzc2FnZS1hY3Rpb25zIHtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2J1dHRvbiB7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkOWQ4ZTY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogNnB4IDEwcHg7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2J1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2J1dHRvbi0tZGFuZ2VyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmZkM2M3O1xuICBjb2xvcjogI2M3MmUzYTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fYnV0dG9uLS1kYW5nZXI6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZmZmNWYyO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19idXR0b246ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAwLjU7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2RldGFpbCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBwYWRkaW5nLXRvcDogMTJweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZGV0YWlsLWhlYWRpbmcge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMS4xMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19kZXRhaWwtYm9keSB7XG4gIG1hcmdpbjogMTBweCAwIDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19kZXRhaWwtYWN0aW9ucyB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIGdhcDogOHB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19lcnJvciB7XG4gIGNvbG9yOiAjYzcyZTNhO1xuICBtYXJnaW46IDEwcHggMCAwO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19lbXB0eSB7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLWRhc2hib2FyZCB7XG4gICAgcGFkZGluZzogMjBweCAxNnB4IDQ4cHg7XG4gIH1cblxuICAuYWRtaW4tZGFzaGJvYXJkX19ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuYDtcblxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG5mdW5jdGlvbiBmb3JtYXRTdWJtaXNzaW9uRGF0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCgnZW4tR0InLCB7XG4gICAgZGF0ZVN0eWxlOiAnbWVkaXVtJyxcbiAgICB0aW1lU3R5bGU6ICdzaG9ydCcsXG4gIH0pLmZvcm1hdChkYXRlKTtcbn1cblxuZnVuY3Rpb24gdHJpbU1lc3NhZ2UobWVzc2FnZSkge1xuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKG1lc3NhZ2UgPz8gJycpLnRyaW0oKTtcblxuICBpZiAobm9ybWFsaXplZC5sZW5ndGggPD0gMTgwKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG4gIH1cblxuICByZXR1cm4gYCR7bm9ybWFsaXplZC5zbGljZSgwLCAxNzcpLnRyaW1FbmQoKX0uLi5gO1xufVxuXG5mdW5jdGlvbiBjb2VyY2VKc29uKHJlc3BvbnNlVGV4dCkge1xuICBpZiAoIXJlc3BvbnNlVGV4dCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEFkbWluSnNvbih1cmwsIG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgIC4uLm9wdGlvbnMsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIC4uLihvcHRpb25zLmhlYWRlcnMgfHwge30pLFxuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3BvbnNlVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgY29uc3QgcGF5bG9hZCA9IGNvZXJjZUpzb24ocmVzcG9uc2VUZXh0KTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHBheWxvYWQ/LmVycm9yIHx8IHBheWxvYWQ/Lm1lc3NhZ2UgfHwgcmVzcG9uc2VUZXh0IHx8IGBSZXF1ZXN0IGZhaWxlZCAoJHtyZXNwb25zZS5zdGF0dXN9KS5gO1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVBZG1pblN1Ym1pc3Npb25QYXlsb2FkKHJlc3BvbnNlKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5kYXRhKSA/IHJlc3BvbnNlLmRhdGEgOiBbXTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplU3VibWlzc2lvblJlY29yZChyZWNvcmQpIHtcbiAgY29uc3QgcGFyYW1zID0gcmVjb3JkID8/IHt9O1xuXG4gIHJldHVybiB7XG4gICAgaWQ6IE51bWJlcihwYXJhbXMuaWQpLFxuICAgIG5hbWU6IFN0cmluZyhwYXJhbXMubmFtZSA/PyAnJyksXG4gICAgZW1haWw6IFN0cmluZyhwYXJhbXMuZW1haWwgPz8gJycpLFxuICAgIHBob25lOiBTdHJpbmcocGFyYW1zLnBob25lID8/ICcnKSxcbiAgICBtZXNzYWdlOiBTdHJpbmcocGFyYW1zLm1lc3NhZ2UgPz8gJycpLFxuICAgIHNvdXJjZVBhZ2U6IFN0cmluZyhwYXJhbXMuc291cmNlUGFnZSA/PyBwYXJhbXMuc291cmNlX3BhZ2UgPz8gJycpLFxuICAgIGNyZWF0ZWRBdDogcGFyYW1zLmNyZWF0ZWRBdCA/PyBwYXJhbXMuY3JlYXRlZF9hdCA/PyBudWxsLFxuICB9O1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVSZXNvdXJjZVN1Ym1pc3Npb25QYXlsb2FkKHJlc3BvbnNlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShyZXNwb25zZT8ucmVjb3JkcykpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2UucmVjb3Jkc1xuICAgIC5tYXAoKHJlY29yZCkgPT4gbm9ybWFsaXplU3VibWlzc2lvblJlY29yZChyZWNvcmQ/LnBhcmFtcyA/PyB7fSkpXG4gICAgLmZpbHRlcigoc3VibWlzc2lvbikgPT4gTnVtYmVyLmlzRmluaXRlKHN1Ym1pc3Npb24uaWQpKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplUmVzb3VyY2VSZWNvcmRQYXlsb2FkKHJlc3BvbnNlKSB7XG4gIGlmICghcmVzcG9uc2U/LnJlY29yZD8ucGFyYW1zKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplU3VibWlzc2lvblJlY29yZChyZXNwb25zZS5yZWNvcmQucGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVjZW50U3VibWlzc2lvbnMocHJvcHMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHM/LnJlY2VudFN1Ym1pc3Npb25zKSkge1xuICAgIHJldHVybiBwcm9wcy5yZWNlbnRTdWJtaXNzaW9ucztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzPy5kYXRhPy5yZWNlbnRTdWJtaXNzaW9ucykpIHtcbiAgICByZXR1cm4gcHJvcHMuZGF0YS5yZWNlbnRTdWJtaXNzaW9ucztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzPy5yZWNlbnRNZXNzYWdlcykpIHtcbiAgICByZXR1cm4gcHJvcHMucmVjZW50TWVzc2FnZXM7XG4gIH1cblxuICByZXR1cm4gW107XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTdWJtaXNzaW9uUGF5bG9hZChzb3VyY2UpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5yZWNlbnRTdWJtaXNzaW9ucykpIHtcbiAgICByZXR1cm4gc291cmNlLnJlY2VudFN1Ym1pc3Npb25zO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5kYXRhPy5yZWNlbnRTdWJtaXNzaW9ucykpIHtcbiAgICByZXR1cm4gc291cmNlLmRhdGEucmVjZW50U3VibWlzc2lvbnM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2U/LnBheWxvYWQ/LnJlY2VudFN1Ym1pc3Npb25zKSkge1xuICAgIHJldHVybiBzb3VyY2UucGF5bG9hZC5yZWNlbnRTdWJtaXNzaW9ucztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZT8uYm9keT8ucmVjZW50U3VibWlzc2lvbnMpKSB7XG4gICAgcmV0dXJuIHNvdXJjZS5ib2R5LnJlY2VudFN1Ym1pc3Npb25zO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5yZXN1bHQ/LnJlY2VudFN1Ym1pc3Npb25zKSkge1xuICAgIHJldHVybiBzb3VyY2UucmVzdWx0LnJlY2VudFN1Ym1pc3Npb25zO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5yZWNlbnRNZXNzYWdlcykpIHtcbiAgICByZXR1cm4gc291cmNlLnJlY2VudE1lc3NhZ2VzO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlPy5kYXRhPy5yZWNlbnRNZXNzYWdlcykpIHtcbiAgICByZXR1cm4gc291cmNlLmRhdGEucmVjZW50TWVzc2FnZXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2U/LmRhdGE/Lml0ZW1zKSkge1xuICAgIHJldHVybiBzb3VyY2UuZGF0YS5pdGVtcztcbiAgfVxuXG4gIHJldHVybiBbXTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplRGFzaGJvYXJkUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgY29uc3QgcGF5bG9hZCA9IHJlc3BvbnNlPy5kYXRhID8/IHJlc3BvbnNlO1xuICByZXR1cm4gcmVzb2x2ZVN1Ym1pc3Npb25QYXlsb2FkKHBheWxvYWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaERhc2hib2FyZE1lc3NhZ2VzKCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL2Rhc2hib2FyZCcsIHtcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSk7XG5cbiAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgaWYgKCFyZXNwb25zZS5vayB8fCAhdGV4dCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGxvYWQgZGFzaGJvYXJkIG1lc3NhZ2VzICgke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rhc2hib2FyZCBBUEkgcmV0dXJuZWQgYSBub24tSlNPTiByZXNwb25zZS4nKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEFkbWluTWVzc2FnZXMobGltaXQgPSA1MCkge1xuICBjb25zdCBzYWZlTGltaXQgPSBOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKGxpbWl0KSkgPyBOdW1iZXIobGltaXQpIDogNTA7XG4gIGNvbnN0IG5vcm1hbGl6ZUN1c3RvbVJlc3BvbnNlID0gKHJlc3BvbnNlKSA9PiBub3JtYWxpemVBZG1pblN1Ym1pc3Npb25QYXlsb2FkKHJlc3BvbnNlKTtcblxuICB0cnkge1xuICAgIGNvbnN0IGN1c3RvbVBheWxvYWQgPSBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9jb250YWN0LXN1Ym1pc3Npb25zP2xpbWl0PSR7c2FmZUxpbWl0fWApO1xuICAgIGNvbnN0IGN1c3RvbVN1Ym1pc3Npb25zID0gbm9ybWFsaXplQ3VzdG9tUmVzcG9uc2UoY3VzdG9tUGF5bG9hZCk7XG5cbiAgICBpZiAoY3VzdG9tU3VibWlzc2lvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY3VzdG9tU3VibWlzc2lvbnM7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUud2FybignQ3VzdG9tIGNvbnRhY3Qgc3VibWlzc2lvbnMgZW5kcG9pbnQgdW5hdmFpbGFibGU6JywgZXJyb3I/Lm1lc3NhZ2UgfHwgZXJyb3IpO1xuICB9XG5cbiAgY29uc3QgcmVzb3VyY2VQYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oYC9hZG1pbi9hcGkvcmVzb3VyY2VzL2NvbnRhY3Rfc3VibWlzc2lvbnMvYWN0aW9ucy9saXN0P3BhZ2U9MSZwZXJQYWdlPSR7c2FmZUxpbWl0fWApO1xuICByZXR1cm4gbm9ybWFsaXplUmVzb3VyY2VTdWJtaXNzaW9uUGF5bG9hZChyZXNvdXJjZVBheWxvYWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZWxldGVBZG1pblN1Ym1pc3Npb24oaWQpIHtcbiAgY29uc3QgcGFyc2VkSWQgPSBOdW1iZXIoaWQpO1xuXG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHBhcnNlZElkKSB8fCBwYXJzZWRJZCA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN1Ym1pc3Npb24gaWQuJyk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGN1c3RvbVBheWxvYWQgPSBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9jb250YWN0LXN1Ym1pc3Npb25zLyR7cGFyc2VkSWR9YCwgeyBtZXRob2Q6ICdERUxFVEUnIH0pO1xuXG4gICAgaWYgKGN1c3RvbVBheWxvYWQ/Lm9rKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGN1c3RvbVBheWxvYWQ/LmVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoY3VzdG9tUGF5bG9hZC5lcnJvcik7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBmYWxsYmFjayB0byBBZG1pbkpTIHJlc291cmNlIGVuZHBvaW50XG4gIH1cblxuICBjb25zdCByZXNvdXJjZVBheWxvYWQgPSBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9yZXNvdXJjZXMvY29udGFjdF9zdWJtaXNzaW9ucy9yZWNvcmRzLyR7cGFyc2VkSWR9L2RlbGV0ZWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICB9KTtcblxuICBpZiAocmVzb3VyY2VQYXlsb2FkPy5yZWNvcmQ/LmJhc2VFcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSByZXNvdXJjZVBheWxvYWQucmVjb3JkLmJhc2VFcnJvcj8ubWVzc2FnZSB8fCAnVW5hYmxlIHRvIGRlbGV0ZSBzdWJtaXNzaW9uLic7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG5cbiAgaWYgKHJlc291cmNlUGF5bG9hZD8ubm90aWNlPy50eXBlID09PSAnZXJyb3InKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHJlc291cmNlUGF5bG9hZC5ub3RpY2U/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byBkZWxldGUgc3VibWlzc2lvbi4nKTtcbiAgfVxuXG4gIHJldHVybjtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hBZG1pblN1Ym1pc3Npb25CeUlkKGlkKSB7XG4gIGNvbnN0IHBhcnNlZElkID0gTnVtYmVyKGlkKTtcblxuICBpZiAoIU51bWJlci5pc0Zpbml0ZShwYXJzZWRJZCkgfHwgcGFyc2VkSWQgPD0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjdXN0b21QYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oYC9hZG1pbi9hcGkvY29udGFjdC1zdWJtaXNzaW9ucy8ke3BhcnNlZElkfWApO1xuICAgIGNvbnN0IGN1c3RvbVN1Ym1pc3Npb24gPSBub3JtYWxpemVTdWJtaXNzaW9uUmVjb3JkKGN1c3RvbVBheWxvYWQ/LmRhdGE/LnJlY29yZCA/PyBjdXN0b21QYXlsb2FkPy5yZWNvcmQgPz8gY3VzdG9tUGF5bG9hZCk7XG5cbiAgICBpZiAoY3VzdG9tU3VibWlzc2lvbi5pZCA+IDApIHtcbiAgICAgIHJldHVybiBjdXN0b21TdWJtaXNzaW9uO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLndhcm4oJ1VuYWJsZSB0byBsb2FkIG1lc3NhZ2UgZnJvbSBjdXN0b20gZW5kcG9pbnQ6JywgZXJyb3I/Lm1lc3NhZ2UgfHwgZXJyb3IpO1xuICB9XG5cbiAgY29uc3QgcmVzb3VyY2VQYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oYC9hZG1pbi9hcGkvcmVzb3VyY2VzL2NvbnRhY3Rfc3VibWlzc2lvbnMvcmVjb3Jkcy8ke3BhcnNlZElkfS9zaG93YCk7XG4gIHJldHVybiBub3JtYWxpemVSZXNvdXJjZVJlY29yZFBheWxvYWQocmVzb3VyY2VQYXlsb2FkKTtcbn1cblxuZnVuY3Rpb24gU2hvcnRjdXRMaXN0KHsgdGl0bGUsIGl0ZW1zLCBuYXZpZ2F0ZSwgbWV0YSB9KSB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZC1oZWFkXCI+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtdGl0bGVcIj57dGl0bGV9PC9oMj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtYm9keVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fbGlzdFwiPlxuICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAga2V5PXtpdGVtLmhyZWZ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9faXRlbVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShpdGVtLmhyZWYpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9faXRlbS1jb3B5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW0tbGFiZWxcIj57aXRlbS5sYWJlbH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9faXRlbS1tZXRhXCI+e21ldGF9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW0tYXJyb3dcIj7ihpI8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59XG5cbmZ1bmN0aW9uIE1lc3NhZ2VzQ2FyZCh7XG4gIHN1Ym1pc3Npb25zLFxuICBzZWxlY3RlZFN1Ym1pc3Npb24sXG4gIG9uT3BlbixcbiAgb25EZWxldGUsXG4gIGRlbGV0aW5nSWQsXG4gIG9wZXJhdGlvbkVycm9yLFxufSkge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtaGVhZFwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlXCI+Q3VzdG9tZXIgTWVzc2FnZXM8L2gyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZC1ib2R5XCI+XG4gICAgICAgIHtzdWJtaXNzaW9ucy5sZW5ndGggPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2VzXCI+XG4gICAgICAgICAgICB7c3VibWlzc2lvbnMubWFwKChzdWJtaXNzaW9uKSA9PiAoXG4gICAgICAgICAgICAgIDxhcnRpY2xlIGtleT17c3VibWlzc2lvbi5pZH0gY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtaGVhZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtbmFtZVwiPntzdWJtaXNzaW9uLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLWVtYWlsXCI+e3N1Ym1pc3Npb24uZW1haWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtzdWJtaXNzaW9uLnBob25lID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLW1ldGFcIj57c3VibWlzc2lvbi5waG9uZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLW1ldGFcIj5cbiAgICAgICAgICAgICAgICAgICAge3N1Ym1pc3Npb24uc291cmNlUGFnZX1cbiAgICAgICAgICAgICAgICAgICAge2Zvcm1hdFN1Ym1pc3Npb25EYXRlKHN1Ym1pc3Npb24uY3JlYXRlZEF0KSA/IGAgwrcgJHtmb3JtYXRTdWJtaXNzaW9uRGF0ZShzdWJtaXNzaW9uLmNyZWF0ZWRBdCl9YCA6ICcnfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19tZXNzYWdlLWJvZHlcIj57dHJpbU1lc3NhZ2Uoc3VibWlzc2lvbi5tZXNzYWdlKX08L3A+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX21lc3NhZ2UtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19idXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk9wZW4oc3VibWlzc2lvbil9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIE9wZW5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19idXR0b24gYWRtaW4tZGFzaGJvYXJkX19idXR0b24tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uRGVsZXRlKHN1Ym1pc3Npb24pfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGVsZXRpbmdJZCA9PT0gc3VibWlzc2lvbi5pZH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2RlbGV0aW5nSWQgPT09IHN1Ym1pc3Npb24uaWQgPyAnRGVsZXRpbmfigKYnIDogJ0RlbGV0ZSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICB7c2VsZWN0ZWRTdWJtaXNzaW9uID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZGV0YWlsXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZGV0YWlsLWhlYWRpbmdcIj5TZWxlY3RlZCBtZXNzYWdlPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2RldGFpbC1ib2R5XCI+e3NlbGVjdGVkU3VibWlzc2lvbi5tZXNzYWdlfTwvcD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZGV0YWlsLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25PcGVuKG51bGwpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBDbG9zZVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2J1dHRvbiBhZG1pbi1kYXNoYm9hcmRfX2J1dHRvbi0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25EZWxldGUoc2VsZWN0ZWRTdWJtaXNzaW9uKX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2RlbGV0aW5nSWQgPT09IHNlbGVjdGVkU3VibWlzc2lvbi5pZH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2RlbGV0aW5nSWQgPT09IHNlbGVjdGVkU3VibWlzc2lvbi5pZCA/ICdEZWxldGluZ+KApicgOiAnRGVsZXRlJ31cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19lbXB0eVwiPk5vIGN1c3RvbWVyIG1lc3NhZ2VzIHlldC48L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge29wZXJhdGlvbkVycm9yID8gPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2Vycm9yXCI+e29wZXJhdGlvbkVycm9yfTwvZGl2PiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERhc2hib2FyZChwcm9wcykge1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IFtkYXNoYm9hcmRTdWJtaXNzaW9ucywgc2V0RGFzaGJvYXJkU3VibWlzc2lvbnNdID0gdXNlU3RhdGUoZ2V0UmVjZW50U3VibWlzc2lvbnMocHJvcHMpKTtcbiAgY29uc3QgW3NlbGVjdGVkU3VibWlzc2lvbiwgc2V0U2VsZWN0ZWRTdWJtaXNzaW9uXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZGVsZXRpbmdJZCwgc2V0RGVsZXRpbmdJZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW29wZXJhdGlvbkVycm9yLCBzZXRPcGVyYXRpb25FcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBpbml0aWFsU3VibWlzc2lvbnMgPSBnZXRSZWNlbnRTdWJtaXNzaW9ucyhwcm9wcyk7XG5cbiAgICBpZiAoaW5pdGlhbFN1Ym1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgc2V0RGFzaGJvYXJkU3VibWlzc2lvbnMoaW5pdGlhbFN1Ym1pc3Npb25zKTtcbiAgICB9XG4gIH0sIFtwcm9wc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzQWN0aXZlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWREYXNoYm9hcmREYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgYXNzaWduU3VibWlzc2lvbnMgPSAobmV4dFN1Ym1pc3Npb25zKSA9PiB7XG4gICAgICAgIGlmICghaXNBY3RpdmUgfHwgIUFycmF5LmlzQXJyYXkobmV4dFN1Ym1pc3Npb25zKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldERhc2hib2FyZFN1Ym1pc3Npb25zKG5leHRTdWJtaXNzaW9ucyk7XG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXNoYm9hcmRSZXNwb25zZSA9IGF3YWl0IGFwaS5nZXREYXNoYm9hcmQoKTtcbiAgICAgICAgY29uc3QgZGFzaGJvYXJkU3VibWlzc2lvbnMgPSBub3JtYWxpemVEYXNoYm9hcmRSZXNwb25zZShkYXNoYm9hcmRSZXNwb25zZSk7XG5cbiAgICAgICAgaWYgKGRhc2hib2FyZFN1Ym1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgICAgIGFzc2lnblN1Ym1pc3Npb25zKGRhc2hib2FyZFN1Ym1pc3Npb25zKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmYWxsYmFja1N1Ym1pc3Npb25zID0gYXdhaXQgZmV0Y2hBZG1pbk1lc3NhZ2VzKCk7XG4gICAgICAgIGlmIChmYWxsYmFja1N1Ym1pc3Npb25zLmxlbmd0aCkge1xuICAgICAgICAgIGFzc2lnblN1Ym1pc3Npb25zKGZhbGxiYWNrU3VibWlzc2lvbnMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhc2hib2FyZE9ubHlQYXlsb2FkID0gYXdhaXQgZmV0Y2hEYXNoYm9hcmRNZXNzYWdlcygpO1xuICAgICAgICBjb25zdCBkYXNoYm9hcmRPbmx5U3VibWlzc2lvbnMgPSBub3JtYWxpemVEYXNoYm9hcmRSZXNwb25zZShkYXNoYm9hcmRPbmx5UGF5bG9hZCk7XG4gICAgICAgIGFzc2lnblN1Ym1pc3Npb25zKGRhc2hib2FyZE9ubHlTdWJtaXNzaW9ucyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBmYWxsYmFja1BheWxvYWQgPSBhd2FpdCBmZXRjaERhc2hib2FyZE1lc3NhZ2VzKCk7XG4gICAgICAgICAgY29uc3QgZmFsbGJhY2tTdWJtaXNzaW9ucyA9IG5vcm1hbGl6ZURhc2hib2FyZFJlc3BvbnNlKGZhbGxiYWNrUGF5bG9hZCk7XG4gICAgICAgICAgYXNzaWduU3VibWlzc2lvbnMoZmFsbGJhY2tTdWJtaXNzaW9ucyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGNhdGNoIChmYWxsYmFja0Vycm9yKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gbG9hZCBkYXNoYm9hcmQgbWVzc2FnZXM6JywgZXJyb3I/Lm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgICAgIGlmIChmYWxsYmFja0Vycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0Rhc2hib2FyZCBmYWxsYmFjayBhbHNvIGZhaWxlZDonLCBmYWxsYmFja0Vycm9yPy5tZXNzYWdlIHx8IGZhbGxiYWNrRXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkRGFzaGJvYXJkRGF0YSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzQWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHN1Ym1pc3Npb25zID0gZGFzaGJvYXJkU3VibWlzc2lvbnM7XG5cbiAgY29uc3QgaGFuZGxlT3BlblN1Ym1pc3Npb24gPSBhc3luYyAoc3VibWlzc2lvbikgPT4ge1xuICAgIHNldE9wZXJhdGlvbkVycm9yKCcnKTtcbiAgICBzZXRTZWxlY3RlZFN1Ym1pc3Npb24oc3VibWlzc2lvbik7XG5cbiAgICBpZiAoIXN1Ym1pc3Npb24/LmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGZyZXNoU3VibWlzc2lvbiA9IGF3YWl0IGZldGNoQWRtaW5TdWJtaXNzaW9uQnlJZChzdWJtaXNzaW9uLmlkKTtcblxuICAgICAgaWYgKGZyZXNoU3VibWlzc2lvbikge1xuICAgICAgICBzZXRTZWxlY3RlZFN1Ym1pc3Npb24oZnJlc2hTdWJtaXNzaW9uKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0T3BlcmF0aW9uRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byBvcGVuIHNlbGVjdGVkIG1lc3NhZ2UuJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZVN1Ym1pc3Npb24gPSBhc3luYyAoc3VibWlzc2lvbikgPT4ge1xuICAgIGlmICghc3VibWlzc2lvbj8uaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRJZCA9IE51bWJlcihzdWJtaXNzaW9uLmlkKTtcblxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHRhcmdldElkKSB8fCB0YXJnZXRJZCA8PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0RGVsZXRpbmdJZCh0YXJnZXRJZCk7XG4gICAgc2V0T3BlcmF0aW9uRXJyb3IoJycpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRlbGV0ZUFkbWluU3VibWlzc2lvbih0YXJnZXRJZCk7XG4gICAgICBzZXREYXNoYm9hcmRTdWJtaXNzaW9ucygocHJldmlvdXMpID0+IHByZXZpb3VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gdGFyZ2V0SWQpKTtcblxuICAgICAgc2V0U2VsZWN0ZWRTdWJtaXNzaW9uKChwcmV2aW91cykgPT4gKHByZXZpb3VzPy5pZCA9PT0gdGFyZ2V0SWQgPyBudWxsIDogcHJldmlvdXMpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0T3BlcmF0aW9uRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byBkZWxldGUgc3VibWlzc2lvbi4nKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0RGVsZXRpbmdJZChudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pbm5lclwiPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fZXllYnJvd1wiPkhvbWU8L3A+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fdGl0bGVcIj5Db250ZW50IE1hbmFnZXI8L2gxPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fc3VidGl0bGVcIj5cbiAgICAgICAgICAgIFVzZSB0aGUgc2hvcnRjdXRzIGJlbG93IHRvIGp1bXAgaW50byBzaXRlIGNvbnRlbnQsIGN1c3RvbWVycywgb3JkZXJzLCBiaWxsaW5nLCBhbmQgaW5jb21pbmcgbWVzc2FnZXMuXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2dyaWRcIj5cbiAgICAgICAgICAgIDxTaG9ydGN1dExpc3RcbiAgICAgICAgICAgICAgdGl0bGU9XCJTaW5nbGUgVHlwZXNcIlxuICAgICAgICAgICAgICBpdGVtcz17UFJJTUFSWV9QQUdFU31cbiAgICAgICAgICAgICAgbmF2aWdhdGU9e25hdmlnYXRlfVxuICAgICAgICAgICAgICBtZXRhPVwiRWRpdCBzdHJ1Y3R1cmVkIHBhZ2UgY29udGVudFwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8U2hvcnRjdXRMaXN0XG4gICAgICAgICAgICAgIHRpdGxlPVwiQ3VzdG9tZXJzXCJcbiAgICAgICAgICAgICAgaXRlbXM9e0NVU1RPTUVSU31cbiAgICAgICAgICAgICAgbmF2aWdhdGU9e25hdmlnYXRlfVxuICAgICAgICAgICAgICBtZXRhPVwiUmV2aWV3IGN1c3RvbWVycyBhbmQgaW5jb21pbmcgbWVzc2FnZXNcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPFNob3J0Y3V0TGlzdFxuICAgICAgICAgICAgICB0aXRsZT1cIk9yZGVyc1wiXG4gICAgICAgICAgICAgIGl0ZW1zPXtPUkRFUlN9XG4gICAgICAgICAgICAgIG5hdmlnYXRlPXtuYXZpZ2F0ZX1cbiAgICAgICAgICAgICAgbWV0YT1cIlJldmlldyBvcmRlcnMgYW5kIGludm9pY2VzXCJcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxTaG9ydGN1dExpc3RcbiAgICAgICAgICAgICAgdGl0bGU9XCJDb2xsZWN0aW9uc1wiXG4gICAgICAgICAgICAgIGl0ZW1zPXtDT0xMRUNUSU9OU31cbiAgICAgICAgICAgICAgbmF2aWdhdGU9e25hdmlnYXRlfVxuICAgICAgICAgICAgICBtZXRhPVwiTWFuYWdlIHJlcGVhdGFibGUgY29udGVudFwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8TWVzc2FnZXNDYXJkXG4gICAgICAgICAgICAgIHN1Ym1pc3Npb25zPXtzdWJtaXNzaW9uc31cbiAgICAgICAgICAgICAgc2VsZWN0ZWRTdWJtaXNzaW9uPXtzZWxlY3RlZFN1Ym1pc3Npb259XG4gICAgICAgICAgICAgIG9uT3Blbj17aGFuZGxlT3BlblN1Ym1pc3Npb259XG4gICAgICAgICAgICAgIG9uRGVsZXRlPXtoYW5kbGVEZWxldGVTdWJtaXNzaW9ufVxuICAgICAgICAgICAgICBkZWxldGluZ0lkPXtkZWxldGluZ0lkfVxuICAgICAgICAgICAgICBvcGVyYXRpb25FcnJvcj17b3BlcmF0aW9uRXJyb3J9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZSwgdXNlUGFyYW1zIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IExvYWRlciwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IE1VTFRJTElORV9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fG1lc3NhZ2V8Ym9keXxzdWJ0aXRsZXxleGNlcnB0fGludHJvfGhvdXJzfGFkZHJlc3N8dGV4dHxwYXJhZ3JhcGh8b3ZlcnZpZXd8Y2hhbGxlbmdlfHJlc3VsdHxhbnN3ZXJ8bm90ZXMpL2k7XG5jb25zdCBJTUFHRV9GSUVMRF9QQVRURVJOID0gLyhpbWFnZXxjb3ZlckltYWdlfGNvbnRlbnRJbWFnZXMpL2k7XG5jb25zdCBCT09MRUFOX0ZJRUxEX1BBVFRFUk4gPSAvXihmZWF0dXJlZHxpc0ZlYXR1cmVkfGlzUG9wdWxhcnxhY3RpdmV8Y2FuY2VsQXRQZXJpb2RFbmQpJC9pO1xuY29uc3QgRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fGFuc3dlcnxleGNlcnB0fGNvbnRlbnRJbWFnZXN8Y292ZXJJbWFnZXxpbWFnZXxmZWF0dXJlc3xiYWRnZXN8dGFncykkL2k7XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5hZG1pbi1lZGl0b3Ige1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAzMnB4IDQwcHggNjRweCA0MHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cbi5hZG1pbi1lZGl0b3JfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiAxMjQwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuLmFkbWluLWJhY2sge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IC44NzVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbn1cbi5hZG1pbi1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG4uYWRtaW4tbWV0YSB7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLXRpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmFkbWluLXN0YXR1cyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIC43NXJlbTtcbiAgbWFyZ2luLXRvcDogMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2M2ZjBjMjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZWZmZmVkO1xuICBjb2xvcjogIzJmNjg0NjtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbi5hZG1pbi1rZWJhYiB7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cbi5hZG1pbi10YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWFlZjtcbn1cbi5hZG1pbi10YWIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDAgMCAxMnB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tdGFiLS1hY3RpdmUgeyBjb2xvcjogIzQ5NDVmZjsgfVxuLmFkbWluLXRhYi0tYWN0aXZlOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7IHJpZ2h0OiAwOyBib3R0b206IC0xcHg7XG4gIGhlaWdodDogMnB4O1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xufVxuLmFkbWluLWxheW91dCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsMWZyKSAyMzJweDtcbiAgZ2FwOiAxNnB4O1xuICBhbGlnbi1pdGVtczogc3RhcnQ7XG59XG4uYWRtaW4tbWFpbi1jYXJkLC5hZG1pbi1zaWRlLWNhcmQsLmFkbWluLWxpc3QtY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMzMsMzMsNTIsLjA2KTtcbn1cbi5hZG1pbi1tYWluLWNhcmQgeyBwYWRkaW5nOiAyNHB4OyB9XG4uYWRtaW4tc2lkZS1jYXJkICsgLmFkbWluLXNpZGUtY2FyZCB7IG1hcmdpbi10b3A6IDEycHg7IH1cbi5hZG1pbi1zaWRlLWNhcmRfX2hlYWQge1xuICBwYWRkaW5nOiAxNHB4IDE2cHggOHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uYWRtaW4tc2lkZS1jYXJkX19ib2R5IHsgcGFkZGluZzogMCAxMnB4IDEycHg7IH1cbi5hZG1pbi1zaWRlLW5vdGUge1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbiwuYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeSB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogLjgxMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4tc2lkZS1idXR0b24ge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDk0NWZmO1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG4uYWRtaW4tc2lkZS1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeTpkaXNhYmxlZCxcbi5hZG1pbi1wcmltYXJ5OmRpc2FibGVkLFxuLmFkbWluLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIGJvcmRlci1jb2xvcjogI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgKyA4cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDIyMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsMzMsNTIsLjEyKTtcbiAgcGFkZGluZzogOHB4IDA7XG4gIHotaW5kZXg6IDQwO1xufVxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xufVxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvbiB7XG4gIHdpZHRoOiAxOHB4O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uLS1tZW51IHtcbiAgd2lkdGg6IDJyZW07XG4gIGZsZXg6IDAgMCAycmVtO1xufVxuLmFkbWluLXNlY3Rpb24gKyAuYWRtaW4tc2VjdGlvbiB7IG1hcmdpbi10b3A6IDIwcHg7IH1cbi5hZG1pbi1maWVsZC1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMixtaW5tYXgoMCwxZnIpKTtcbiAgZ2FwOiAyMHB4IDI0cHg7XG59XG4uYWRtaW4tZmllbGQtLWZ1bGwgeyBncmlkLWNvbHVtbjogMSAvIC0xOyB9XG4uYWRtaW4tcHJvZmlsZS1jYXJkIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogNnB4IDZweCAwO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9faGVhZCB7XG4gIHBhZGRpbmc6IDAgMCAxMnB4O1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9faWRlbnRpdHkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIG1pbi13aWR0aDogMDtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX2F2YXRhciB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDUycHg7XG4gIGhlaWdodDogNTJweDtcbiAgZmxleDogMCAwIDUycHg7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM0OTQ1ZmYgMCUsICM3Yjc5ZmYgMTAwJSk7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBmb250LXNpemU6IC45NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA4ZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19oZWFkLWNvcHkge1xuICBtaW4td2lkdGg6IDA7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX190aXRsZS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX2V5ZWJyb3cge1xuICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIGNvbG9yOiAjN2M3Yzk4O1xuICBmb250LXNpemU6IC43MnJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAuMTJlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiBjbGFtcCgxLjQ1cmVtLCAyLjJ2dywgMnJlbSk7XG4gIGxpbmUtaGVpZ2h0OiAxLjAyO1xuICBsZXR0ZXItc3BhY2luZzogLS4wNGVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fYm9keSB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKTtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDAgMCA2cHg7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19ib2R5LS1jdXN0b21lciB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIG1pbm1heCgwLCAxZnIpKTtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX3JvdyB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAxMHB4IDEycHggNnB4O1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9faXRlbSB7XG4gIG1pbi13aWR0aDogMDtcbiAgcGFkZGluZzogMTBweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODIpO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9faXRlbS0tZnVsbCB7XG4gIGdyaWQtY29sdW1uOiAxIC8gLTE7XG59XG4uYWRtaW4tcHJvZmlsZS1jYXJkX19sYWJlbCB7XG4gIGNvbG9yOiAjN2M3Yzk4O1xuICBmb250LXNpemU6IC43MnJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAuMTJlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xuICBsaW5lLWhlaWdodDogMS40NTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlLS1tdXRlZCB7XG4gIGNvbG9yOiAjOGU4ZWE5O1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fdmFsdWUtLW1vbm8ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogLjI0cmVtIC42MnJlbTtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoNzMsIDY5LCAyNTUsIDAuMDgpO1xuICBjb2xvcjogIzRiNDdiZTtcbiAgZm9udC1mYW1pbHk6IHVpLW1vbm9zcGFjZSwgU0ZNb25vLVJlZ3VsYXIsIE1lbmxvLCBNb25hY28sIENvbnNvbGFzLCBcIkxpYmVyYXRpb24gTW9ub1wiLCBtb25vc3BhY2U7XG4gIGZvbnQtc2l6ZTogLjgycmVtO1xuICBsaW5lLWhlaWdodDogMS4xcmVtO1xufVxuLmFkbWluLXByb2ZpbGUtY2FyZF9fdmFsdWUtLW11bHRpbGluZSB7XG4gIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcbn1cbi5hZG1pbi1wcm9maWxlLWNhcmRfX3RleHRib3gge1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgcGFkZGluZzogLjg3NXJlbSAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udDogaW5oZXJpdDtcbiAgbGluZS1oZWlnaHQ6IDEuNTU7XG4gIHJlc2l6ZTogbm9uZTtcbn1cbi5hZG1pbi1yZXBseS1wYW5lbCB7XG4gIG1heC13aWR0aDogNjYwcHg7XG4gIG1hcmdpbi10b3A6IDEycHg7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlYWVhZWY7XG4gIHBhZGRpbmc6IDE4cHggMjBweDtcbn1cbi5hZG1pbi1yZXBseS1wYW5lbF9fdGl0bGUge1xuICBtYXJnaW46IDAgMCA2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tcmVwbHktcGFuZWxfX25vdGUge1xuICBtYXJnaW46IDAgMCAxNHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS41O1xufVxuLmFkbWluLXJlcGx5LXBhbmVsX19oaXN0b3J5IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuLmFkbWluLXJlcGx5LXBhbmVsX19pdGVtIHtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuLmFkbWluLXJlcGx5LXBhbmVsX19tZXRhIHtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc4cmVtO1xuICBsaW5lLWhlaWdodDogMS4zO1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG59XG4uYWRtaW4tcmVwbHktcGFuZWxfX3N1YmplY3Qge1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAuOTVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tcmVwbHktcGFuZWxfX2JvZHkge1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC45cmVtO1xuICBsaW5lLWhlaWdodDogMS42O1xuICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XG59XG4uYWRtaW4tcmVwbHktcGFuZWxfX2Zvcm0ge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDEycHg7XG59XG4uYWRtaW4tcmVwbHktcGFuZWxfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuLmFkbWluLWxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMnB4O1xuICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbi5hZG1pbi1sYWJlbF9fcmVxdWlyZWQgeyBjb2xvcjogI2QwMmIyMDsgfVxuLmFkbWluLWlucHV0LC5hZG1pbi10ZXh0YXJlYSwuYWRtaW4tc2VhcmNoLWlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHBhZGRpbmc6IC42MjVyZW0gLjg3NXJlbTtcbiAgZm9udC1zaXplOiAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgb3V0bGluZTogbm9uZTtcbn1cbi5hZG1pbi1pbnB1dCB7IG1pbi1oZWlnaHQ6IDIuNXJlbTsgfVxuLmFkbWluLXRleHRhcmVhIHsgbWluLWhlaWdodDogNS43NXJlbTsgcmVzaXplOiB2ZXJ0aWNhbDsgfVxuLmFkbWluLWlucHV0OmZvY3VzLC5hZG1pbi10ZXh0YXJlYTpmb2N1cywuYWRtaW4tc2VhcmNoLWlucHV0OmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjNDk0NWZmO1xuICBib3gtc2hhZG93OiAwIDAgMCAxcHggIzQ5NDVmZjtcbn1cbi5hZG1pbi1pbnB1dDpkaXNhYmxlZCxcbi5hZG1pbi10ZXh0YXJlYTpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLXJlcGVhdGFibGUge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZzogMTJweCAxNnB4IDEwcHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xufVxuLmFkbWluLXJlcGVhdGFibGVfX3RpdGxlIHsgZm9udC1zaXplOiAuNzVyZW07IGZvbnQtd2VpZ2h0OiA2MDA7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19jb3VudCB7IGNvbG9yOiAjOGU4ZWE5OyBmb250LXNpemU6IC43NXJlbTsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2l0ZW0gKyAuYWRtaW4tcmVwZWF0YWJsZV9faXRlbSB7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1OyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyIHN1bW1hcnkgeyBiYWNrZ3JvdW5kOiAjZjBmMGZmOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeSB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5Ojotd2Via2l0LWRldGFpbHMtbWFya2VyIHsgZGlzcGxheTogbm9uZTsgfVxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnktbGVmdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19idWxsZXQge1xuICB3aWR0aDogMjBweDsgaGVpZ2h0OiAyMHB4O1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogI2YwZjBmNTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAuNjI1cmVtO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX25hbWUgeyBmb250LXNpemU6IC44NzVyZW07IGZvbnQtd2VpZ2h0OiA2MDA7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAxMHB4O1xuICBjb2xvcjogIzhlOGVhOTtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbiB7XG4gIGJvcmRlcjogMDsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGNvbG9yOiBpbmhlcml0OyBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGUge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBncmFiO1xuICBwYWRkaW5nOiAwIDJweDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMTtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZTphY3RpdmUgeyBjdXJzb3I6IGdyYWJiaW5nOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGU6ZGlzYWJsZWQge1xuICBjb2xvcjogI2M0YzRkMjtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQ6ZGlzYWJsZWQge1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19ib2R5IHsgcGFkZGluZzogMTZweDsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2FkZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAuODc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19pbWFnZS1wcmV2aWV3IHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19pbWFnZS1wcmV2aWV3IC5hZG1pbi1tZWRpYV9fdGh1bWIge1xuICBtYXgtd2lkdGg6IDI4MHB4O1xuICBtYXgtaGVpZ2h0OiAxODBweDtcbn1cbi5hZG1pbi10b2dnbGUge1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZzogLjYyNXJlbSAuODc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG4uYWRtaW4tZmllbGQtLWJvb2xlYW4gLmFkbWluLXRvZ2dsZSB7XG4gIHdpZHRoOiBhdXRvO1xuICBtaW4td2lkdGg6IDE4MHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIGdhcDogMTBweDtcbn1cbi5hZG1pbi10b2dnbGU6aGFzKGlucHV0OmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xufVxuLmFkbWluLW1lZGlhIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuLmFkbWluLW1lZGlhX19jYW52YXMge1xuICBtaW4taGVpZ2h0OiAxNDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZiO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMTZweDtcbn1cbi5hZG1pbi1tZWRpYV9fc3RhY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbn1cbi5hZG1pbi1tZWRpYV9fdGh1bWIge1xuICBtYXgtd2lkdGg6IDI0MHB4O1xuICBtYXgtaGVpZ2h0OiAxNDBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG59XG4uYWRtaW4tbWVkaWFfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDRweDtcbn1cbi5hZG1pbi1tZWRpYV9fYWN0aW9uIHtcbiAgd2lkdGg6IDJyZW07IGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuLmFkbWluLW1lZGlhX19hY3Rpb246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1tZWRpYV9fZmlsZW5hbWUgeyBjb2xvcjogIzY2NjY4NzsgZm9udC1zaXplOiAuNzVyZW07IH1cbi5hZG1pbi1tZWRpYV9fc291cmNlIHsgbWFyZ2luLXRvcDogMTBweDsgfVxuLmFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG59XG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b24ge1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tbWVkaWFfX2Vycm9yIHtcbiAgY29sb3I6ICNkMDJiMjA7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG59XG4uYWRtaW4tbGlzdC10b29sYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDE2cHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG4uYWRtaW4tbGlzdC1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxMnB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmFkbWluLXNlYXJjaC13cmFwIHsgd2lkdGg6IDI4MHB4OyB9XG4uYWRtaW4tbGlzdC1tZXRhIHtcbiAgbWFyZ2luOiAxMnB4IDAgMzJweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xufVxuLmFkbWluLXRvb2xiYXItY2x1c3RlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmFkbWluLXRvb2xiYXItYnV0dG9uIHtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBwYWRkaW5nOiAwIDFyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi10b29sYmFyLWJ1dHRvbi0taWNvbiB7XG4gIHdpZHRoOiAyLjVyZW07XG4gIHBhZGRpbmc6IDA7XG59XG4uYWRtaW4tdG9vbGJhci1idXR0b24tLWFjdGl2ZSB7XG4gIGJvcmRlci1jb2xvcjogIzQ5NDVmZjtcbiAgY29sb3I6ICM0OTQ1ZmY7XG59XG4uYWRtaW4tdG9vbGJhci1zZWFyY2gge1xuICB3aWR0aDogMjgwcHg7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAwIDAuODc1cmVtO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuLmFkbWluLWxpc3QtcG9wb3ZlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgKyA4cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDMyMHB4O1xuICBtYXgtaGVpZ2h0OiA0MjBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywzMyw1MiwuMTIpO1xuICBwYWRkaW5nOiAxNnB4O1xuICB6LWluZGV4OiAyMDtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX2hlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX3RpdGxlIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fcmVzZXQge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fZ3JvdXAgKyAuYWRtaW4tbGlzdC1wb3BvdmVyX19ncm91cCB7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19zZWxlY3Qge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX2NoZWNrIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiA4cHggMDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX2NoZWNrIGlucHV0IHtcbiAgd2lkdGg6IDEuMjVyZW07XG4gIGhlaWdodDogMS4yNXJlbTtcbn1cbi5hZG1pbi1saXN0LWNhcmRfX2hlYWQge1xuICBwYWRkaW5nOiAxNnB4IDIwcHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG4uYWRtaW4tbGlzdC10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xufVxuLmFkbWluLWxpc3QtdGFibGUgdGgge1xuICBwYWRkaW5nOiAxMHB4IDE2cHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHRkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmNTtcbiAgZm9udC1zaXplOiAuODc1cmVtO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnUtY2VsbCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDQ0cHg7XG59XG4uYWRtaW4tbGlzdC1yb3ctbWVudS10cmlnZ2VyIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IGNhbGMoMTAwJSAtIDZweCk7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMjIwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywzMyw1MiwuMTIpO1xuICBwYWRkaW5nOiA4cHggMDtcbiAgei1pbmRleDogMjQ7XG59XG4uYWRtaW4tbGlzdC1yb3ctbWVudV9faXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG4uYWRtaW4tbGlzdC1yb3ctbWVudV9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG4uYWRtaW4tbGlzdC1yb3ctbWVudV9faXRlbS0tZGFuZ2VyIHtcbiAgY29sb3I6ICNkMDJiMjA7XG59XG4uYWRtaW4tbGlzdC1yb3ctbWVudV9faWNvbiB7XG4gIHdpZHRoOiAxOHB4O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmFkbWluLWxpc3QtdGFibGUgdGggYnV0dG9uIHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tbGlzdC10YWJsZSB0ciB7IGN1cnNvcjogcG9pbnRlcjsgfVxuLmFkbWluLWxpc3QtdGFibGUgdHI6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZmFmYWZiOyB9XG4uYWRtaW4tbGlzdC1zdGF0dXMge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogMS43NXJlbTtcbiAgcGFkZGluZzogMCAuNjI1cmVtO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogI2VmZmZlZDtcbiAgY29sb3I6ICMyZjY4NDY7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLmFkbWluLWxpc3Qtc3RhdHVzLS1tYW51YWwge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDczLCA2OSwgMjU1LCAwLjEyKTtcbiAgY29sb3I6ICM0OTQ1ZmY7XG59XG4uYWRtaW4tcHJpbWFyeSB7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAgLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXNlY29uZGFyeSB7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAgLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLWxpc3QtYm9vbGVhbiB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDFyZW07XG4gIGhlaWdodDogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGZvbnQtc2l6ZTogMC42MjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tbGlzdC1ib29sZWFuLS15ZXMge1xuICBiYWNrZ3JvdW5kOiAjMmY2ODQ2O1xuICBjb2xvcjogI2ZmZjtcbn1cbi5hZG1pbi1saXN0LWJvb2xlYW4tLW5vIHtcbiAgYmFja2dyb3VuZDogI2QwMmIyMDtcbiAgY29sb3I6ICNmZmY7XG59XG5AbWVkaWEgKG1heC13aWR0aDogMTE4MHB4KSB7XG4gIC5hZG1pbi1sYXlvdXQgeyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjsgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1lZGl0b3IgeyBwYWRkaW5nOiAyMHB4IDE2cHggNDhweDsgfVxuICAuYWRtaW4tZmllbGQtZ3JpZCB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyB9XG4gIC5hZG1pbi1wcm9maWxlLWNhcmQge1xuICAgIHBhZGRpbmc6IDRweCA0cHggMDtcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICB9XG4gIC5hZG1pbi1wcm9maWxlLWNhcmRfX2hlYWQgeyBwYWRkaW5nLWJvdHRvbTogMTBweDsgfVxuICAuYWRtaW4tcHJvZmlsZS1jYXJkX19pZGVudGl0eSB7IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyB9XG4gIC5hZG1pbi1wcm9maWxlLWNhcmRfX2F2YXRhciB7XG4gICAgd2lkdGg6IDQ4cHg7XG4gICAgaGVpZ2h0OiA0OHB4O1xuICAgIGZsZXgtYmFzaXM6IDQ4cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgICBmb250LXNpemU6IC45cmVtO1xuICB9XG4gIC5hZG1pbi1wcm9maWxlLWNhcmRfX2JvZHksXG4gIC5hZG1pbi1wcm9maWxlLWNhcmRfX2JvZHktLWN1c3RvbWVyIHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IGdhcDogMTBweDsgfVxuICAuYWRtaW4tbGlzdC10b29sYmFyIHsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IHN0cmV0Y2g7IH1cbiAgLmFkbWluLXNlYXJjaC13cmFwIHsgd2lkdGg6IDEwMCU7IH1cbn1cbmA7XG5cbmZ1bmN0aW9uIHRvTGFiZWwobmFtZSkge1xuICByZXR1cm4gbmFtZVxuICAgIC5yZXBsYWNlKC8oW2EtejAtOV0pKFtBLVpdKS9nLCAnJDEgJDInKVxuICAgIC5yZXBsYWNlKC9bXy1dKy9nLCAnICcpXG4gICAgLnJlcGxhY2UoL1xcYmZhcVxcYi9naSwgJ0ZBUScpXG4gICAgLnJlcGxhY2UoL14uLywgKHYpID0+IHYudG9VcHBlckNhc2UoKSk7XG59XG5cbmZ1bmN0aW9uIGNsb25lVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gZ2V0RW1wdHlJdGVtKHNhbXBsZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShzYW1wbGUpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKHNhbXBsZSAmJiB0eXBlb2Ygc2FtcGxlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICBPYmplY3Qua2V5cyhzYW1wbGUpXG4gICAgICAgIC5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgIGlmIChbJ2lkJywgJ2RvY3VtZW50SWQnLCAnc3RhdHVzJywgJ3VwZGF0ZWRBdCcsICdwdWJsaXNoZWRBdCddLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBba2V5LCBzYW1wbGVba2V5XSA/PyBudWxsXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gW2tleSwgZ2V0RW1wdHlJdGVtKHNhbXBsZVtrZXldKV07XG4gICAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBpZiAodHlwZW9mIHNhbXBsZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzYW1wbGUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIHRvQ29tcGFyYWJsZVZhbHVlKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5tYXAoKGl0ZW0pID0+IHRvQ29tcGFyYWJsZVZhbHVlKGl0ZW0pKTtcbiAgfVxuXG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKVxuICAgICAgLnNvcnQoKVxuICAgICAgLmZpbHRlcigoa2V5KSA9PiAhWyd1cGRhdGVkQXQnLCAncHVibGlzaGVkQXQnXS5pbmNsdWRlcyhrZXkpKVxuICAgICAgLnJlZHVjZSgoYWNjdW11bGF0b3IsIGtleSkgPT4ge1xuICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gdG9Db21wYXJhYmxlVmFsdWUodmFsdWVba2V5XSk7XG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaGFzTWVhbmluZ2Z1bFZhbHVlKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5zb21lKChpdGVtKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModmFsdWUpXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4gIVsnaWQnLCAnZG9jdW1lbnRJZCcsICd1cGRhdGVkQXQnLCAncHVibGlzaGVkQXQnLCAnc3RhdHVzJ10uaW5jbHVkZXMoa2V5KSlcbiAgICAgIC5zb21lKChbLCBuZXN0ZWRWYWx1ZV0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShuZXN0ZWRWYWx1ZSkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZSAhPSBudWxsO1xufVxuXG5mdW5jdGlvbiBidWlsZEFkbWluUGF0aChwYXRobmFtZSwgcGFyYW1zKSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBPYmplY3QuZW50cmllcyhwYXJhbXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgc2VhcmNoUGFyYW1zLnNldChrZXksIFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgcmV0dXJuIGAke3BhdGhuYW1lfSR7cXVlcnlTdHJpbmcgPyBgPyR7cXVlcnlTdHJpbmd9YCA6ICcnfWA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGlzcGxheWVkRmllbGRzKHZhbHVlKSB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUgPz8gJycpXG4gICAgLnNwbGl0KCcsJylcbiAgICAubWFwKChmaWVsZCkgPT4gZmllbGQudHJpbSgpKVxuICAgIC5maWx0ZXIoQm9vbGVhbik7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSW5wdXRWYWx1ZShuZXh0UmF3VmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGN1cnJlbnRWYWx1ZSA9PT0gJ251bWJlcicgJiYgbmV4dFJhd1ZhbHVlID09PSAnJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gbmV4dFJhd1ZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0pIHtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgaWYgKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIFN0cmluZyhpdGVtLnRleHQgPz8gJycpO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBnZXRNZWRpYURpc3BsYXlOYW1lKHZhbHVlLCBmYWxsYmFjayA9ICdVcGxvYWRlZCBpbWFnZScpIHtcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlID8/ICcnKS50cmltKCk7XG5cbiAgaWYgKCFyYXcpIHtcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkID0gcmF3LnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcbiAgY29uc3QgcGFydHMgPSBub3JtYWxpemVkLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMV0gfHwgZmFsbGJhY2s7XG59XG5cbmZ1bmN0aW9uIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sIG5leHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG5leHRWYWx1ZTtcbiAgfVxuXG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5pdGVtLFxuICAgICAgdGV4dDogbmV4dFZhbHVlLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyB0ZXh0OiBuZXh0VmFsdWUgfTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZU1lZGlhUHJldmlld1VybCh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xuXG4gIGlmICghbm9ybWFsaXplZCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmICgvXmh0dHBzPzpcXC9cXC8vaS50ZXN0KG5vcm1hbGl6ZWQpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG4gIH1cblxuICBpZiAobm9ybWFsaXplZC5zdGFydHNXaXRoKCcvLycpKSB7XG4gICAgcmV0dXJuIGBodHRwczoke25vcm1hbGl6ZWR9YDtcbiAgfVxuXG4gIGlmIChub3JtYWxpemVkLnN0YXJ0c1dpdGgoJy91cGxvYWRzLycpIHx8IG5vcm1hbGl6ZWQuc3RhcnRzV2l0aCgnL2FkbWluLWFzc2V0cy8nKSkge1xuICAgIHJldHVybiBgaHR0cDovL2xvY2FsaG9zdDozMDAxJHtub3JtYWxpemVkfWA7XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplZDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXRQYXRoKHZhbHVlLCBwYXRoLCBuZXh0VmFsdWUpIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXh0VmFsdWU7XG4gIH1cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gdXBkYXRlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRWYWx1ZSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoKSB7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmZpbHRlcigoXywgaW5kZXgpID0+IGluZGV4ICE9PSBwYXRoWzBdKSA6IHZhbHVlO1xuICB9XG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IHJlbW92ZUF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0KTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRBdFBhdGgodmFsdWUsIHBhdGgsIG5leHRJdGVtKSB7XG4gIGlmICghcGF0aC5sZW5ndGgpIHtcbiAgICByZXR1cm4gWy4uLihBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW10pLCBuZXh0SXRlbV07XG4gIH1cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gYXBwZW5kQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRJdGVtKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoLCBvZmZzZXQpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gcGF0aFswXTtcbiAgICBjb25zdCBuZXh0SW5kZXggPSBpbmRleCArIG9mZnNldDtcblxuICAgIGlmIChuZXh0SW5kZXggPCAwIHx8IG5leHRJbmRleCA+PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9uZSA9IFsuLi52YWx1ZV07XG4gICAgY29uc3QgW21vdmVkXSA9IGNsb25lLnNwbGljZShpbmRleCwgMSk7XG4gICAgY2xvbmUuc3BsaWNlKG5leHRJbmRleCwgMCwgbW92ZWQpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IG1vdmVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgb2Zmc2V0KTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5VGl0bGUoZGVmaW5pdGlvbiwgcmVjb3JkKSB7XG4gIGlmICghcmVjb3JkKSB7XG4gICAgcmV0dXJuIGRlZmluaXRpb24ubGFiZWw7XG4gIH1cbiAgcmV0dXJuIHJlY29yZFtkZWZpbml0aW9uLnRpdGxlRmllbGRdIHx8IGRlZmluaXRpb24ubGFiZWw7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdE1vbmV5VmFsdWUodmFsdWUsIGN1cnJlbmN5KSB7XG4gIGNvbnN0IGFtb3VudCA9IE51bWJlcih2YWx1ZSA/PyAwKTtcbiAgY29uc3Qgc2FmZUN1cnJlbmN5ID0gU3RyaW5nKGN1cnJlbmN5IHx8ICdHQlAnKS50b1VwcGVyQ2FzZSgpO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tR0InLCB7XG4gICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgIGN1cnJlbmN5OiBzYWZlQ3VycmVuY3ksXG4gICAgfSkuZm9ybWF0KGFtb3VudCAvIDEwMCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBgJHtzYWZlQ3VycmVuY3l9ICR7KGFtb3VudCAvIDEwMCkudG9GaXhlZCgyKX1gO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFByb2ZpbGVEaXNwbGF5VmFsdWUoZGVmaW5pdGlvbiwgZmllbGQsIHJhd1ZhbHVlLCByZWNvcmQpIHtcbiAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gdHlwZW9mIHJhd1ZhbHVlID09PSAnc3RyaW5nJyA/IHJhd1ZhbHVlLnRyaW0oKSA6IHJhd1ZhbHVlO1xuXG4gIGlmIChub3JtYWxpemVkVmFsdWUgPT09ICcnIHx8IG5vcm1hbGl6ZWRWYWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuICdOb3Qgc2V0JztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGRlZmluaXRpb24/Lm1vbmV5RmllbGRzKSAmJiBkZWZpbml0aW9uLm1vbmV5RmllbGRzLmluY2x1ZGVzKGZpZWxkKSkge1xuICAgIHJldHVybiBmb3JtYXRNb25leVZhbHVlKHJhd1ZhbHVlLCByZWNvcmQ/LmN1cnJlbmN5KTtcbiAgfVxuXG4gIGlmIChcbiAgICB0eXBlb2YgcmF3VmFsdWUgPT09ICdzdHJpbmcnXG4gICAgJiYgL14oc3RhdHVzfC4qU3RhdHVzfGJvb2tpbmdUeXBlfHJlc291cmNlVHlwZXxhY2Nlc3NTdGF0dXMpJC9pLnRlc3QoZmllbGQpXG4gICkge1xuICAgIHJldHVybiByYXdWYWx1ZVxuICAgICAgLnJlcGxhY2UoL1tfLV0rL2csICcgJylcbiAgICAgIC5yZXBsYWNlKC9cXGJcXHcvZywgKGxldHRlcikgPT4gbGV0dGVyLnRvVXBwZXJDYXNlKCkpO1xuICB9XG5cbiAgcmV0dXJuIFN0cmluZyhyYXdWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGlzQmxvZ0Rpc2FibGVkRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpIHtcbiAgcmV0dXJuIGRlZmluaXRpb24/Lm5hbWUgPT09ICdibG9nLXBvc3RzJyAmJiBmaWVsZCA9PT0gJ2ZlYXR1cmVkJztcbn1cblxuZnVuY3Rpb24gaXNGYXFEaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIHJldHVybiBkZWZpbml0aW9uPy5uYW1lID09PSAnZmFxLWl0ZW1zJyAmJiBmaWVsZCA9PT0gJ2lzRmVhdHVyZWQnO1xufVxuXG5mdW5jdGlvbiBpc01lZXRpbmdSb29tRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZCkge1xuICByZXR1cm4gZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ21lZXRpbmctcm9vbXMnICYmIGZpZWxkID09PSAnaXNGZWF0dXJlZCc7XG59XG5cbmZ1bmN0aW9uIGlzVmlzaWJpbGl0eVRvZ2dsZUZpZWxkKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIHJldHVybiBpc0Jsb2dEaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKVxuICAgIHx8IGlzRmFxRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZClcbiAgICB8fCBpc01lZXRpbmdSb29tRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZCk7XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkRGlzcGxheUxhYmVsKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIGlmIChpc1Zpc2liaWxpdHlUb2dnbGVGaWVsZChkZWZpbml0aW9uLCBmaWVsZCkpIHtcbiAgICByZXR1cm4gJ1Zpc2liaWxpdHknO1xuICB9XG5cbiAgcmV0dXJuIHRvTGFiZWwoZmllbGQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0UGFnZShwYWdlTmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSA/PyB7fSk7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYC9hZG1pbi9hcGkvcGFnZXMvJHtwYWdlTmFtZX0ke3F1ZXJ5U3RyaW5nID8gYD8ke3F1ZXJ5U3RyaW5nfWAgOiAnJ31gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QgPz8gJ0dFVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IG9wdGlvbnMuYm9keSA/IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYm9keSkgOiB1bmRlZmluZWQsXG4gICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICB9LFxuICApO1xuXG4gIGNvbnN0IHJlc3BvbnNlVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgbGV0IHBheWxvYWQgPSBudWxsO1xuXG4gIHRyeSB7XG4gICAgcGF5bG9hZCA9IHJlc3BvbnNlVGV4dCA/IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KSA6IHt9O1xuICB9IGNhdGNoIHtcbiAgICBwYXlsb2FkID0gbnVsbDtcbiAgfVxuXG4gIGlmICghcmVzcG9uc2Uub2sgfHwgIXBheWxvYWQpIHtcbiAgICBjb25zdCB0cmltbWVkVGV4dCA9IHJlc3BvbnNlVGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBpc0h0bWwgPSB0cmltbWVkVGV4dC5zdGFydHNXaXRoKCc8IWRvY3R5cGUnKSB8fCB0cmltbWVkVGV4dC5zdGFydHNXaXRoKCc8aHRtbCcpO1xuICAgIGNvbnN0IHJlZGlyZWN0ZWRUb0xvZ2luID0gcmVzcG9uc2UucmVkaXJlY3RlZCAmJiByZXNwb25zZS51cmwuaW5jbHVkZXMoJy9hZG1pbi9sb2dpbicpO1xuICAgIGNvbnN0IGlzQXV0aEVycm9yID0gcmVzcG9uc2Uuc3RhdHVzID09PSA0MDEgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSA0MDMgfHwgcmVkaXJlY3RlZFRvTG9naW47XG5cbiAgICBpZiAoaXNBdXRoRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91ciBhZG1pbiBzZXNzaW9uIGV4cGlyZWQuIFJlZnJlc2ggYW5kIHNpZ24gaW4gYWdhaW4uJyk7XG4gICAgfVxuXG4gICAgaWYgKHBheWxvYWQ/Lm1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGlmIChwYXlsb2FkPy5lcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQuZXJyb3IpO1xuICAgIH1cblxuICAgIGlmIChpc0h0bWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2VydmVyIHJldHVybmVkIGFuIEhUTUwgZXJyb3IgcGFnZSAoJHtyZXNwb25zZS5zdGF0dXMgfHwgJ3Vua25vd24nfSkuIENoZWNrIGJhY2tlbmQgbG9ncy5gKTtcbiAgICB9XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlcXVlc3QgZmFpbGVkICgke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcignUmVxdWVzdCBmYWlsZWQuJyk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkQWRtaW5JbWFnZShmaWxlKSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvbWVkaWEvdXBsb2FkJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvciB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgfVxuXG4gIGNvbnN0IHVwbG9hZGVkVXJsID0gcGF5bG9hZD8udXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnJlbGF0aXZlVXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnVybDtcblxuICBpZiAoIXVwbG9hZGVkVXJsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgc3VjY2VlZGVkIGJ1dCByZXR1cm5lZCBubyBVUkwuJyk7XG4gIH1cblxuICByZXR1cm4gdXBsb2FkZWRVcmw7XG59XG5cbmNvbnN0IE1FRElBX1BJQ0tFUl9FVkVOVCA9ICdhZG1pbmpzLW1lZGlhLXNlbGVjdCc7XG5cbmZ1bmN0aW9uIGNob29zZUFkbWluTGlicmFyeUltYWdlKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGlja2VyV2luZG93ID0gd2luZG93Lm9wZW4oXG4gICAgICAnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnk/cGlja2VyPTEnLFxuICAgICAgJ2FkbWluLW1lZGlhLWxpYnJhcnktcGlja2VyJyxcbiAgICAgICdwb3B1cD15ZXMsd2lkdGg9MTQ0MCxoZWlnaHQ9OTAwLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMnLFxuICAgICk7XG5cbiAgICBpZiAoIXBpY2tlcldpbmRvdykge1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcignTWVkaWEgbGlicmFyeSBwb3B1cCB3YXMgYmxvY2tlZC4nKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGNsb3NlV2F0Y2hlcik7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgZXZlbnQuc291cmNlICE9PSBwaWNrZXJXaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuZGF0YT8udHlwZSAhPT0gTUVESUFfUElDS0VSX0VWRU5UKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgY2xlYW51cCgpO1xuICAgICAgcmVzb2x2ZSh0eXBlb2YgZXZlbnQuZGF0YS51cmwgPT09ICdzdHJpbmcnID8gZXZlbnQuZGF0YS51cmwgOiAnJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsb3NlV2F0Y2hlciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAocGlja2VyV2luZG93LmNsb3NlZCAmJiAhZmluaXNoZWQpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgIH1cbiAgICB9LCA1MDApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIE1lZGlhRmllbGQoeyBsYWJlbCwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IHVybHMgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXS5maWx0ZXIoQm9vbGVhbik7XG4gIGNvbnN0IGZpbGVJbnB1dFJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW3VwbG9hZGluZywgc2V0VXBsb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3VwbG9hZEVycm9yLCBzZXRVcGxvYWRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fY2FudmFzXCI+XG4gICAgICAgICAge3VybHMubGVuZ3RoID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc3RhY2tcIj5cbiAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdGh1bWJcIiBzcmM9e3VybHNbMF19IGFsdD17bGFiZWx9IC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4odXJsc1swXSwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyl9PuKGlzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHBhdGgsIEFycmF5LmlzQXJyYXkodmFsdWUpID8gW10gOiAnJyl9PuKclTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fZmlsZW5hbWVcIj57Z2V0TWVkaWFEaXNwbGF5TmFtZSh1cmxzWzBdKX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2Pk5vIG1lZGlhIHNlbGVjdGVkLjwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2VcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVXJsID0gYXdhaXQgY2hvb3NlQWRtaW5MaWJyYXJ5SW1hZ2UoKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZFVybCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBbLi4udmFsdWUsIHNlbGVjdGVkVXJsXSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBzZWxlY3RlZFVybCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gY2hvb3NlIGltYWdlIGZyb20gbWVkaWEgbGlicmFyeS4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIENob29zZSBmcm9tIG1lZGlhIGxpYnJhcnlcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxuICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICBtdWx0aXBsZT17QXJyYXkuaXNBcnJheSh2YWx1ZSl9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17YXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5maWxlcyA/PyBbXSk7XG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmxzID0gW107XG4gICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmwgPSBhd2FpdCB1cGxvYWRBZG1pbkltYWdlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB1cGxvYWRlZFVybHMucHVzaCh1cGxvYWRlZFVybCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBbLi4udmFsdWUsIC4uLnVwbG9hZGVkVXJsc10pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UocGF0aCwgdXBsb2FkZWRVcmxzWzBdIHx8ICcnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dXBsb2FkRXJyb3IgPyA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lcnJvclwiPnt1cGxvYWRFcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBQcmltaXRpdmVGaWVsZCh7IGRlZmluaXRpb24sIGZpZWxkLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSBnZXRGaWVsZERpc3BsYXlMYWJlbChkZWZpbml0aW9uLCBmaWVsZCk7XG4gIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBBcnJheS5pc0FycmF5KGRlZmluaXRpb24/LnNlbGVjdEZpZWxkcz8uW2ZpZWxkXSkgPyBkZWZpbml0aW9uLnNlbGVjdEZpZWxkc1tmaWVsZF0gOiBudWxsO1xuICBjb25zdCBpbnB1dFR5cGUgPSBkZWZpbml0aW9uPy5pbnB1dFR5cGVzPy5bZmllbGRdIHx8ICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gJ251bWJlcicgOiAndGV4dCcpO1xuXG4gIGlmIChJTUFHRV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpKSB7XG4gICAgcmV0dXJuIDxNZWRpYUZpZWxkIGxhYmVsPXtsYWJlbH0gdmFsdWU9e3ZhbHVlfSBwYXRoPXtwYXRofSBvbkNoYW5nZT17b25DaGFuZ2V9IGRpc2FibGVkPXtkaXNhYmxlZH0gLz47XG4gIH1cblxuICBpZiAoQk9PTEVBTl9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpKSB7XG4gICAgY29uc3QgaXNEaXNhYmxlZEZpZWxkID0gaXNWaXNpYmlsaXR5VG9nZ2xlRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWJvb2xlYW5cIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+e2xhYmVsfTwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tdG9nZ2xlXCI+XG4gICAgICAgICAgPHNwYW4+e2lzRGlzYWJsZWRGaWVsZCA/ICdIaWRlIG9uIHdlYnNpdGUnIDogKHZhbHVlID8gJ0FjdGl2ZScgOiAnRGlzYWJsZWQnKX08L3NwYW4+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e0Jvb2xlYW4odmFsdWUpfSBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIGV2ZW50LnRhcmdldC5jaGVja2VkKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgY2xhc3NOYW1lID0gRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpID8gJ2FkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsJyA6ICdhZG1pbi1maWVsZCc7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICB7bGFiZWx9XG4gICAgICAgIHtmaWVsZCAhPT0gJ3NvcnRPcmRlcicgJiYgIUJPT0xFQU5fRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSA/IDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsX19yZXF1aXJlZFwiPio8L3NwYW4+IDogbnVsbH1cbiAgICAgIDwvbGFiZWw+XG4gICAgICB7c2VsZWN0T3B0aW9ucyA/IChcbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWUgPz8gJyd9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgID5cbiAgICAgICAgICB7c2VsZWN0T3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdGlvbi52YWx1ZX0gdmFsdWU9e29wdGlvbi52YWx1ZX0+e29wdGlvbi5sYWJlbH08L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICApIDogTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkgPyAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXRleHRhcmVhXCJcbiAgICAgICAgICB2YWx1ZT17dmFsdWUgPz8gJyd9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1pbnB1dFwiXG4gICAgICAgICAgdHlwZT17aW5wdXRUeXBlfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZSA/PyAnJ31cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgcGFyc2VJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSwgdmFsdWUpKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFByb2ZpbGVJbmZvQ2FyZCh7IGRlZmluaXRpb24sIHJlY29yZCB9KSB7XG4gIGNvbnN0IGluZm9DYXJkRmllbGRzID0gQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmluZm9DYXJkRmllbGRzKSA/IGRlZmluaXRpb24uaW5mb0NhcmRGaWVsZHMgOiBbXTtcbiAgY29uc3QgaW5mb0NhcmRCbG9ja0ZpZWxkcyA9IEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5pbmZvQ2FyZEJsb2NrRmllbGRzKSA/IGRlZmluaXRpb24uaW5mb0NhcmRCbG9ja0ZpZWxkcyA6IFtdO1xuICBjb25zdCBvcHRpb25hbEluZm9DYXJkRmllbGRzID0gbmV3IFNldChBcnJheS5pc0FycmF5KGRlZmluaXRpb24ub3B0aW9uYWxJbmZvQ2FyZEZpZWxkcykgPyBkZWZpbml0aW9uLm9wdGlvbmFsSW5mb0NhcmRGaWVsZHMgOiBbXSk7XG4gIGNvbnN0IG9wdGlvbmFsSW5mb0NhcmRCbG9ja0ZpZWxkcyA9IG5ldyBTZXQoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLm9wdGlvbmFsSW5mb0NhcmRCbG9ja0ZpZWxkcykgPyBkZWZpbml0aW9uLm9wdGlvbmFsSW5mb0NhcmRCbG9ja0ZpZWxkcyA6IFtdKTtcbiAgY29uc3QgdGl0bGVGaWVsZCA9IGRlZmluaXRpb24uaW5mb0NhcmRUaXRsZUZpZWxkIHx8IGRlZmluaXRpb24udGl0bGVGaWVsZDtcbiAgY29uc3QgcmF3VGl0bGUgPSByZWNvcmQ/Llt0aXRsZUZpZWxkXTtcbiAgY29uc3QgY2FyZFRpdGxlID0gcmF3VGl0bGUgPT0gbnVsbCB8fCBTdHJpbmcocmF3VGl0bGUpLnRyaW0oKSA9PT0gJydcbiAgICA/IGRlZmluaXRpb24ubGFiZWxcbiAgICA6IFN0cmluZyhyYXdUaXRsZSk7XG4gIGNvbnN0IGNhcmRNZXRhTGFiZWwgPSBkZWZpbml0aW9uLm1ldGFMYWJlbCB8fCBkZWZpbml0aW9uLmxhYmVsIHx8ICdSZWNvcmQnO1xuICBjb25zdCBjYXJkRXllYnJvdyA9IGNhcmRNZXRhTGFiZWwuZW5kc1dpdGgoJ3MnKSA/IGNhcmRNZXRhTGFiZWwuc2xpY2UoMCwgLTEpIDogY2FyZE1ldGFMYWJlbDtcbiAgY29uc3QgdGl0bGVUb2tlbnMgPSBjYXJkVGl0bGVcbiAgICAuc3BsaXQoL1xccysvKVxuICAgIC5tYXAoKHRva2VuKSA9PiB0b2tlbi50cmltKCkpXG4gICAgLmZpbHRlcihCb29sZWFuKTtcbiAgY29uc3QgYXZhdGFyTGFiZWwgPSB0aXRsZVRva2Vucy5zbGljZSgwLCAyKS5tYXAoKHRva2VuKSA9PiB0b2tlblswXSkuam9pbignJykudG9VcHBlckNhc2UoKSB8fCAnSUQnO1xuICBjb25zdCBtYW51YWxUYWcgPSB0eXBlb2YgcmVjb3JkPy5tYW51YWxUYWcgPT09ICdzdHJpbmcnID8gcmVjb3JkLm1hbnVhbFRhZy50cmltKCkgOiAnJztcbiAgY29uc3QgaXNQcm9maWxlU3VtbWFyeUxheW91dCA9IGRlZmluaXRpb24/Lm5hbWUgPT09ICdjdXN0b21lcnMnXG4gICAgfHwgZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ21lc3NhZ2VzJ1xuICAgIHx8IGRlZmluaXRpb24/Lm5hbWUgPT09ICdvcmRlcnMnXG4gICAgfHwgZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ2ludm9pY2VzJ1xuICAgIHx8IGRlZmluaXRpb24/Lm5hbWUgPT09ICdyZWZ1bmRzJztcbiAgY29uc3Qgc3VtbWFyeUZpZWxkcyA9IGluZm9DYXJkRmllbGRzLmZpbHRlcigoZmllbGQpID0+IGZpZWxkICE9PSAnbWFudWFsVGFnJyAmJiAhaW5mb0NhcmRCbG9ja0ZpZWxkcy5pbmNsdWRlcyhmaWVsZCkpO1xuXG4gIGlmICghaW5mb0NhcmRGaWVsZHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLXNlY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcHJvZmlsZS1jYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcHJvZmlsZS1jYXJkX19oZWFkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX2lkZW50aXR5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fYXZhdGFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e2F2YXRhckxhYmVsfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX2hlYWQtY29weVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fZXllYnJvd1wiPntjYXJkRXllYnJvd308L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX3RpdGxlLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX3RpdGxlXCI+e2NhcmRUaXRsZX08L2gyPlxuICAgICAgICAgICAgICAgIHttYW51YWxUYWcgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXN0YXR1cyBhZG1pbi1saXN0LXN0YXR1cy0tbWFudWFsXCI+e21hbnVhbFRhZ308L3NwYW4+IDogbnVsbH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWRtaW4tcHJvZmlsZS1jYXJkX19ib2R5JHtpc1Byb2ZpbGVTdW1tYXJ5TGF5b3V0ID8gJyBhZG1pbi1wcm9maWxlLWNhcmRfX2JvZHktLWN1c3RvbWVyJyA6ICcnfWB9PlxuICAgICAgICAgIHtzdW1tYXJ5RmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZ2V0RmllbGREaXNwbGF5TGFiZWwoZGVmaW5pdGlvbiwgZmllbGQpO1xuICAgICAgICAgICAgY29uc3QgZGlzcGxheVZhbHVlID0gZm9ybWF0UHJvZmlsZURpc3BsYXlWYWx1ZShkZWZpbml0aW9uLCBmaWVsZCwgcmVjb3JkPy5bZmllbGRdLCByZWNvcmQpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWVDbGFzc05hbWVzID0gWydhZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlJ107XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25hbEluZm9DYXJkRmllbGRzLmhhcyhmaWVsZCkgJiYgZGlzcGxheVZhbHVlID09PSAnTm90IHNldCcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkaXNwbGF5VmFsdWUgPT09ICdOb3Qgc2V0Jykge1xuICAgICAgICAgICAgICB2YWx1ZUNsYXNzTmFtZXMucHVzaCgnYWRtaW4tcHJvZmlsZS1jYXJkX192YWx1ZS0tbXV0ZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpZWxkID09PSAnaWQnIHx8IGZpZWxkLmVuZHNXaXRoKCdJZCcpKSB7XG4gICAgICAgICAgICAgIHZhbHVlQ2xhc3NOYW1lcy5wdXNoKCdhZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlLS1tb25vJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGlzcGxheVZhbHVlID09PSAnc3RyaW5nJyAmJiBkaXNwbGF5VmFsdWUuaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICAgICAgICAgIHZhbHVlQ2xhc3NOYW1lcy5wdXNoKCdhZG1pbi1wcm9maWxlLWNhcmRfX3ZhbHVlLS1tdWx0aWxpbmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17ZmllbGR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcHJvZmlsZS1jYXJkX19pdGVtJHtGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkgPyAnIGFkbWluLXByb2ZpbGUtY2FyZF9faXRlbS0tZnVsbCcgOiAnJ31gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1wcm9maWxlLWNhcmRfX2xhYmVsXCI+e2xhYmVsfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt2YWx1ZUNsYXNzTmFtZXMuam9pbignICcpfT57ZGlzcGxheVZhbHVlfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aW5mb0NhcmRCbG9ja0ZpZWxkcy5tYXAoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGlzcGxheVZhbHVlID0gZm9ybWF0UHJvZmlsZURpc3BsYXlWYWx1ZShkZWZpbml0aW9uLCBmaWVsZCwgcmVjb3JkPy5bZmllbGRdLCByZWNvcmQpO1xuICAgICAgICAgIGlmIChvcHRpb25hbEluZm9DYXJkQmxvY2tGaWVsZHMuaGFzKGZpZWxkKSAmJiBkaXNwbGF5VmFsdWUgPT09ICdOb3Qgc2V0Jykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17ZmllbGR9IGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fcm93XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcHJvZmlsZS1jYXJkX19sYWJlbFwiPntnZXRGaWVsZERpc3BsYXlMYWJlbChkZWZpbml0aW9uLCBmaWVsZCl9PC9kaXY+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXByb2ZpbGUtY2FyZF9fdGV4dGJveFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXlWYWx1ZX1cbiAgICAgICAgICAgICAgICByb3dzPXtNYXRoLm1heCg0LCBNYXRoLm1pbigxMCwgU3RyaW5nKGRpc3BsYXlWYWx1ZSkuc3BsaXQoJ1xcbicpLmxlbmd0aCArIDEpKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTWVzc2FnZVJlcGx5UGFuZWwoeyByZXBsaWVzLCByZXBseURyYWZ0LCBvblJlcGx5Q2hhbmdlLCBvblNlbmRSZXBseSwgc2VuZGluZ1JlcGx5IH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJhZG1pbi1zZWN0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGx5LXBhbmVsXCI+XG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9fdGl0bGVcIj5SZXBseSB0byBDdXN0b21lcjwvaDM+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLXJlcGx5LXBhbmVsX19ub3RlXCI+U2VuZCBhbiBlbWFpbCByZXNwb25zZSBkaXJlY3RseSBmcm9tIHRoaXMgbWVzc2FnZSBkZXRhaWwgcGFnZS48L3A+XG5cbiAgICAgICAge3JlcGxpZXMubGVuZ3RoID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwbHktcGFuZWxfX2hpc3RvcnlcIj5cbiAgICAgICAgICAgIHtyZXBsaWVzLm1hcCgocmVwbHkpID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e3JlcGx5LmlkfSBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9faXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwbHktcGFuZWxfX21ldGFcIj57cmVwbHkuY3JlYXRlZEF0fSDigKIge3JlcGx5LmFkbWluRW1haWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9fc3ViamVjdFwiPntyZXBseS5zdWJqZWN0fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwbHktcGFuZWxfX2JvZHlcIj57cmVwbHkuYm9keX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9fZm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGRcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlJlcGx5IFN1YmplY3Q8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17cmVwbHlEcmFmdC5zdWJqZWN0fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvblJlcGx5Q2hhbmdlKCdzdWJqZWN0JywgZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+UmVwbHkgTWVzc2FnZTwvbGFiZWw+XG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tdGV4dGFyZWFcIlxuICAgICAgICAgICAgICB2YWx1ZT17cmVwbHlEcmFmdC5ib2R5fVxuICAgICAgICAgICAgICByb3dzPXs4fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvblJlcGx5Q2hhbmdlKCdib2R5JywgZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBseS1wYW5lbF9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uU2VuZFJlcGx5fSBkaXNhYmxlZD17c2VuZGluZ1JlcGx5fT5cbiAgICAgICAgICAgICAge3NlbmRpbmdSZXBseSA/ICdTZW5kaW5nLi4uJyA6ICdTZW5kIFJlcGx5J31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQXJyYXlGaWVsZCh7IGZpZWxkLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IGxhYmVsID0gdG9MYWJlbChmaWVsZCk7XG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdO1xuICBjb25zdCBpc0ltYWdlQXJyYXkgPSBJTUFHRV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpO1xuICBjb25zdCBbZHJhZ0luZGV4LCBzZXREcmFnSW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtkcmFnT3ZlckluZGV4LCBzZXREcmFnT3ZlckluZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbdXBsb2FkaW5nSW5kZXgsIHNldFVwbG9hZGluZ0luZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbdXBsb2FkRXJyb3IsIHNldFVwbG9hZEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgZmlsZUlucHV0UmVmcyA9IHVzZVJlZih7fSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX190aXRsZVwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fY291bnRcIj57aXRlbXMubGVuZ3RofSBlbnRyaWVzPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxkZXRhaWxzXG4gICAgICAgICAgICBrZXk9e2Ake2ZpZWxkfS0ke2luZGV4fWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yZXBlYXRhYmxlX19pdGVtJHtkcmFnT3ZlckluZGV4ID09PSBpbmRleCA/ICcgYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyJyA6ICcnfWB9XG4gICAgICAgICAgICBvcGVuPXtpbmRleCA9PT0gMH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaWYgKGRyYWdPdmVySW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyb3A9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gaW5kZXggLSBkcmFnSW5kZXg7XG4gICAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgICAgICAgICAgICBvbk1vdmVJdGVtKFsuLi5wYXRoLCBkcmFnSW5kZXhdLCBvZmZzZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldERyYWdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChudWxsKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyYWdMZWF2ZT17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19idWxsZXRcIj7ilrw8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fbmFtZVwiPlxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheVxuICAgICAgICAgICAgICAgICAgICA/IGBJbWFnZSAke2luZGV4ICsgMX1gXG4gICAgICAgICAgICAgICAgICAgIDogKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyA/IGl0ZW0gfHwgYCR7bGFiZWx9ICR7aW5kZXggKyAxfWAgOiBpdGVtPy50ZXh0IHx8IGAke2xhYmVsfSAke2luZGV4ICsgMX1gKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtKFsuLi5wYXRoLCBpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIPCfl5FcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZT17IWRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEcmFnIHRvIHJlb3JkZXJcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyhpbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDii67ii65cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3N1bW1hcnk+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheSA/IG51bGwgOiA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWwgPT09ICdUYWdzJyA/ICdUZXh0JyA6IGxhYmVsLnNsaWNlKDAsIC0xKSB8fCBsYWJlbH08L2xhYmVsPn1cbiAgICAgICAgICAgICAgICAgIHtpc0ltYWdlQXJyYXkgPyBudWxsIDogKFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5wYXRoLCBpbmRleF0sIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sIGV2ZW50LnRhcmdldC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheSAmJiByZXNvbHZlTWVkaWFQcmV2aWV3VXJsKGdldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSkpID8gKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2NhbnZhcyBhZG1pbi1yZXBlYXRhYmxlX19pbWFnZS1wcmV2aWV3XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX190aHVtYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17cmVzb2x2ZU1lZGlhUHJldmlld1VybChnZXRSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0pKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtgJHtsYWJlbH0gJHtpbmRleCArIDF9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnNcIiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbihyZXNvbHZlTWVkaWFQcmV2aWV3VXJsKGdldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSkpLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAg4oaXXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKFsuLi5wYXRoLCBpbmRleF0sIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sICcnKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIOKclVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICB7aXNJbWFnZUFycmF5ID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHVwbG9hZGluZ0luZGV4ID09PSBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZnMuY3VycmVudFtpbmRleF0/LmNsaWNrKCl9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3VwbG9hZGluZ0luZGV4ID09PSBpbmRleCA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCB1cGxvYWRpbmdJbmRleCA9PT0gaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgoaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRVcmwgPSBhd2FpdCBjaG9vc2VBZG1pbkxpYnJhcnlJbWFnZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShbLi4ucGF0aCwgaW5kZXhdLCB3aXRoUmVwZWF0YWJsZUl0ZW1WYWx1ZShpdGVtLCBzZWxlY3RlZFVybCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcihlcnJvcj8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGNob29zZSBpbWFnZSBmcm9tIG1lZGlhIGxpYnJhcnkuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3VwbG9hZGluZ0luZGV4ID09PSBpbmRleCA/ICdDaG9vc2luZy4uLicgOiAnQ2hvb3NlIGZyb20gbWVkaWEgbGlicmFyeSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9eyhlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucHV0UmVmcy5jdXJyZW50W2luZGV4XSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZpbGVJbnB1dFJlZnMuY3VycmVudFtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2FzeW5jIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgoaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmwgPSBhd2FpdCB1cGxvYWRBZG1pbkltYWdlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKFsuLi5wYXRoLCBpbmRleF0sIHdpdGhSZXBlYXRhYmxlSXRlbVZhbHVlKGl0ZW0sIHVwbG9hZGVkVXJsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nSW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICkpfVxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FkZFwiIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2xpY2s9eygpID0+IG9uQWRkSXRlbShwYXRoLCB7IHRleHQ6ICcnIH0pfT5cbiAgICAgICAgICArIEFkZCBhbiBlbnRyeVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAge3VwbG9hZEVycm9yID8gPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fZXJyb3JcIiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNnB4IDE0cHgnIH19Pnt1cGxvYWRFcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEZpZWxkUmVuZGVyZXIoeyBkZWZpbml0aW9uLCBmaWVsZCwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBvbkFkZEl0ZW0sIG9uUmVtb3ZlSXRlbSwgb25Nb3ZlSXRlbSwgZGlzYWJsZWQgfSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gPEFycmF5RmllbGQgZmllbGQ9e2ZpZWxkfSB2YWx1ZT17dmFsdWV9IHBhdGg9e3BhdGh9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gb25BZGRJdGVtPXtvbkFkZEl0ZW19IG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfSBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfSBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+O1xuICB9XG4gIHJldHVybiA8UHJpbWl0aXZlRmllbGQgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn0gZmllbGQ9e2ZpZWxkfSB2YWx1ZT17dmFsdWV9IHBhdGg9e3BhdGh9IG9uQ2hhbmdlPXtvbkNoYW5nZX0gZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTGlzdENlbGwoZmllbGQsIHZhbHVlKSB7XG4gIGlmIChmaWVsZCA9PT0gJ21hbnVhbFRhZycpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1zdGF0dXMgYWRtaW4tbGlzdC1zdGF0dXMtLW1hbnVhbFwiPnt2YWx1ZX08L3NwYW4+XG4gICAgICA6IG51bGw7XG4gIH1cblxuICBpZiAoZmllbGQgPT09ICdzdGF0dXMnKSB7XG4gICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtc3RhdHVzXCI+e3ZhbHVlfTwvc3Bhbj47XG4gIH1cblxuICBpZiAoKGZpZWxkID09PSAnZmVhdHVyZWQnIHx8IGZpZWxkID09PSAnaXNGZWF0dXJlZCcgfHwgZmllbGQgPT09ICdpc1BvcHVsYXInKSAmJiAodmFsdWUgPT09ICdZZXMnIHx8IHZhbHVlID09PSAnTm8nKSkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2BhZG1pbi1saXN0LWJvb2xlYW4gJHt2YWx1ZSA9PT0gJ1llcycgPyAnYWRtaW4tbGlzdC1ib29sZWFuLS15ZXMnIDogJ2FkbWluLWxpc3QtYm9vbGVhbi0tbm8nfWB9PlxuICAgICAgICB7dmFsdWUgPT09ICdZZXMnID8gJ+KckycgOiAn4pyVJ31cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBMaXN0Vmlldyh7XG4gIGRlZmluaXRpb24sXG4gIHJlY29yZHMsXG4gIGNvbnRyb2xzLFxuICBzZWFyY2gsXG4gIGxvYWRpbmcsXG4gIG9uU2VhcmNoLFxuICBvbk9wZW5SZWNvcmQsXG4gIG9uQ3JlYXRlLFxuICBvblNldFNvcnQsXG4gIG9uU2V0RmlsdGVyLFxuICBvblJlc2V0RmlsdGVycyxcbiAgb25Ub2dnbGVEaXNwbGF5ZWRGaWVsZCxcbiAgb25SZXNldERpc3BsYXllZEZpZWxkcyxcbiAgb25EdXBsaWNhdGVSZWNvcmQsXG4gIG9uRGVsZXRlUmVjb3JkLFxufSkge1xuICBjb25zdCBbc2hvd1NlYXJjaCwgc2V0U2hvd1NlYXJjaF0gPSB1c2VTdGF0ZShCb29sZWFuKHNlYXJjaCkpO1xuICBjb25zdCBbZmlsdGVyc09wZW4sIHNldEZpbHRlcnNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dEaXNwbGF5ZWQsIHNldFNob3dEaXNwbGF5ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VhcmNoVmFsdWUsIHNldFNlYXJjaFZhbHVlXSA9IHVzZVN0YXRlKHNlYXJjaCk7XG4gIGNvbnN0IFtvcGVuTWVudUlkLCBzZXRPcGVuTWVudUlkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBtZW51UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0U2VhcmNoVmFsdWUoc2VhcmNoKTtcbiAgfSwgW3NlYXJjaF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChzZWFyY2hWYWx1ZSAhPT0gc2VhcmNoKSB7XG4gICAgICAgIG9uU2VhcmNoKHNlYXJjaFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCAyNTApO1xuXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH0sIFtvblNlYXJjaCwgc2VhcmNoLCBzZWFyY2hWYWx1ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChtZW51UmVmLmN1cnJlbnQgJiYgIW1lbnVSZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHNldE9wZW5NZW51SWQobnVsbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZGlzcGxheWVkQ29sdW1ucyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gY29udHJvbHMuYXZhaWxhYmxlRmllbGRzLmZpbHRlcigoZmllbGQpID0+IGNvbnRyb2xzLmRpc3BsYXllZEZpZWxkcy5pbmNsdWRlcyhmaWVsZC5maWVsZCkpLFxuICAgIFtjb250cm9scy5hdmFpbGFibGVGaWVsZHMsIGNvbnRyb2xzLmRpc3BsYXllZEZpZWxkc10sXG4gICk7XG4gIGNvbnN0IHNob3dDcmVhdGUgPSBkZWZpbml0aW9uLmFsbG93Q3JlYXRlICE9PSBmYWxzZTtcbiAgY29uc3QgaGFzRmlsdGVycyA9IEJvb2xlYW4oY29udHJvbHMuZmlsdGVycz8ubGVuZ3RoKTtcbiAgY29uc3QgYWxsb3dEdXBsaWNhdGUgPSBkZWZpbml0aW9uLmFsbG93RHVwbGljYXRlICE9PSBmYWxzZTtcbiAgY29uc3QgYWxsb3dEZWxldGUgPSBkZWZpbml0aW9uLmFsbG93RGVsZXRlICE9PSBmYWxzZTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZWRpdG9yXCI+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JfX2lubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4taGVhZGVyXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWV0YVwiPntkZWZpbml0aW9uLm1ldGFMYWJlbCB8fCAnQ29sbGVjdGlvbiBUeXBlJ308L2Rpdj5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi10aXRsZVwiPntkZWZpbml0aW9uLmxhYmVsfTwvaDE+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LWFjdGlvbnNcIj5cbiAgICAgICAgICAgIHtzaG93Q3JlYXRlID8gPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQ3JlYXRlfT4rIENyZWF0ZSBuZXcgZW50cnk8L2J1dHRvbj4gOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtbWV0YVwiPntyZWNvcmRzLmxlbmd0aH0gZW50cmllcyBmb3VuZDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC10b29sYmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10b29sYmFyLWNsdXN0ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tdG9vbGJhci1idXR0b24gYWRtaW4tdG9vbGJhci1idXR0b24tLWljb24ke3Nob3dTZWFyY2ggPyAnIGFkbWluLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dTZWFyY2goKGN1cnJlbnQpID0+ICFjdXJyZW50KX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg8J+UjVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB7c2hvd1NlYXJjaCA/IChcbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tdG9vbGJhci1zZWFyY2hcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hWYWx1ZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hWYWx1ZShldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2hhc0ZpbHRlcnMgPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi10b29sYmFyLWJ1dHRvbiR7ZmlsdGVyc09wZW4gPyAnIGFkbWluLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRGaWx0ZXJzT3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgc2V0U2hvd0Rpc3BsYXllZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIEZpbHRlcnNcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIHtoYXNGaWx0ZXJzICYmIGZpbHRlcnNPcGVuID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3ZlclwiIHN0eWxlPXt7IGxlZnQ6IHNob3dTZWFyY2ggPyAzMzIgOiA1MiwgcmlnaHQ6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3RpdGxlXCI+RmlsdGVyczwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3Jlc2V0XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uUmVzZXRGaWx0ZXJzfT5SZXNldDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtjb250cm9scy5maWx0ZXJzLm1hcCgoZmlsdGVyKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZmlsdGVyLmZpZWxkfSBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX2dyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX2xhYmVsXCI+e2ZpbHRlci5sYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19zZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb250cm9scy5hY3RpdmVGaWx0ZXJzW2ZpbHRlci5maWVsZF0gPz8gJyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25TZXRGaWx0ZXIoZmlsdGVyLmZpZWxkLCBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPkFsbDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXIub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdGlvbn0gdmFsdWU9e29wdGlvbn0+e29wdGlvbn08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10b29sYmFyLWNsdXN0ZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXRvb2xiYXItYnV0dG9uIGFkbWluLXRvb2xiYXItYnV0dG9uLS1pY29uJHtzaG93RGlzcGxheWVkID8gJyBhZG1pbi10b29sYmFyLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0U2hvd0Rpc3BsYXllZCgoY3VycmVudCkgPT4gIWN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgc2V0RmlsdGVyc09wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICDimplcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIHtzaG93RGlzcGxheWVkID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fdGl0bGVcIj5EaXNwbGF5ZWQgZmllbGRzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3Jlc2V0XCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblJlc2V0RGlzcGxheWVkRmllbGRzfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgUmVzZXRcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtjb250cm9scy5hdmFpbGFibGVGaWVsZHMubWFwKChmaWVsZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwga2V5PXtmaWVsZC5maWVsZH0gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19jaGVja1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbnRyb2xzLmRpc3BsYXllZEZpZWxkcy5pbmNsdWRlcyhmaWVsZC5maWVsZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvblRvZ2dsZURpc3BsYXllZEZpZWxkKGZpZWxkLmZpZWxkLCBldmVudC50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZmllbGQubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtY2FyZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1jYXJkX19oZWFkXCI+XG4gICAgICAgICAgICA8c3Ryb25nPntkZWZpbml0aW9uLmxhYmVsfTwvc3Ryb25nPlxuICAgICAgICAgICAgPHNwYW4+e2xvYWRpbmcgPyAnTG9hZGluZy4uLicgOiBgJHtyZWNvcmRzLmxlbmd0aH0gZW50cmllc2B9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXRhYmxlXCI+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICB7ZGlzcGxheWVkQ29sdW1ucy5tYXAoKGNvbHVtbikgPT4gKFxuICAgICAgICAgICAgICAgICAgPHRoIGtleT17Y29sdW1uLmZpZWxkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25TZXRTb3J0KGNvbHVtbi5maWVsZCl9PlxuICAgICAgICAgICAgICAgICAgICAgIHtjb2x1bW4ubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAge2NvbnRyb2xzLnNvcnRCeSA9PT0gY29sdW1uLmZpZWxkID8gYCAke2NvbnRyb2xzLnNvcnRPcmRlciA9PT0gJ2FzYycgPyAn4oaRJyA6ICfihpMnfWAgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDx0aCAvPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3JlY29yZHMubWFwKChyZWNvcmQpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtyZWNvcmQuZG9jdW1lbnRJZH0gb25DbGljaz17KCkgPT4gb25PcGVuUmVjb3JkKHJlY29yZC5pZCl9PlxuICAgICAgICAgICAgICAgICAge2Rpc3BsYXllZENvbHVtbnMubWFwKChjb2x1bW4pID0+IChcbiAgICAgICAgICAgICAgICAgICAgPHRkIGtleT17YCR7cmVjb3JkLmRvY3VtZW50SWR9LSR7Y29sdW1uLmZpZWxkfWB9PntyZW5kZXJMaXN0Q2VsbChjb2x1bW4uZmllbGQsIHJlY29yZC5jb2x1bW5zW2NvbHVtbi5maWVsZF0pfTwvdGQ+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51LWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnUtdHJpZ2dlclwiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldE9wZW5NZW51SWQoKGN1cnJlbnQpID0+IChjdXJyZW50ID09PSByZWNvcmQuaWQgPyBudWxsIDogcmVjb3JkLmlkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIOKAplxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge29wZW5NZW51SWQgPT09IHJlY29yZC5pZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9e21lbnVSZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pdGVtXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25PcGVuUmVjb3JkKHJlY29yZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudV9faWNvblwiPuKcjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2RlZmluaXRpb24ucmVhZE9ubHkgPyAnVmlldycgOiAnRWRpdCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YWxsb3dEdXBsaWNhdGUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudV9faXRlbVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkR1cGxpY2F0ZVJlY29yZChyZWNvcmQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pY29uXCI+4qeJPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkR1cGxpY2F0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHthbGxvd0RlbGV0ZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pdGVtIGFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW0tLWRhbmdlclwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZVJlY29yZChyZWNvcmQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pY29uXCI+8J+XkTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5EZWxldGUgZW50cnk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEVkaXRWaWV3KHsgZGVmaW5pdGlvbiwgcmVjb3JkLCBwdWJsaXNoZWRSZWNvcmQsIGFjdGl2ZVRhYiwgb25Td2l0Y2hUYWIsIHNhdmluZywgZXJyb3IsIG9uQmFjaywgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBvblNhdmUsIG9uUHVibGlzaCwgb25EZWxldGUsIG9uRGlzY2FyZENoYW5nZXMsIG9uVW5wdWJsaXNoLCBjYW5TYXZlLCBjYW5QdWJsaXNoLCBjYW5EaXNjYXJkLCBjYW5VbnB1Ymxpc2gsIHJlcGx5RHJhZnQsIG9uUmVwbHlDaGFuZ2UsIG9uU2VuZFJlcGx5LCBzZW5kaW5nUmVwbHksIGlzQ3JlYXRlTW9kZSwgb25DYW5jZWxNZW1iZXJzaGlwLCBjYW5jZWxsaW5nTWVtYmVyc2hpcCB9KSB7XG4gIGNvbnN0IGRpc3BsYXllZFJlY29yZCA9IGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkUmVjb3JkID8gcHVibGlzaGVkUmVjb3JkIDogcmVjb3JkO1xuICBjb25zdCBpc1B1Ymxpc2hlZFZpZXcgPSBhY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnICYmIHB1Ymxpc2hlZFJlY29yZDtcbiAgY29uc3QgaXNNYW51YWxFbnRyeSA9IGRpc3BsYXllZFJlY29yZD8uZW50cnlTb3VyY2UgPT09ICdtYW51YWwnIHx8IGRpc3BsYXllZFJlY29yZD8ubWFudWFsVGFnID09PSAnTWFudWFsJztcbiAgY29uc3Qgc3VwcG9ydHNFZGl0aW5nID0gaXNDcmVhdGVNb2RlIHx8IGlzTWFudWFsRW50cnkgfHwgIWRlZmluaXRpb24ucmVhZE9ubHk7XG4gIGNvbnN0IHNob3dWZXJzaW9uVGFicyA9IHN1cHBvcnRzRWRpdGluZyAmJiBkZWZpbml0aW9uLnNob3dWZXJzaW9uVGFicyAhPT0gZmFsc2U7XG4gIGNvbnN0IGFsbG93UHVibGlzaCA9IHN1cHBvcnRzRWRpdGluZyAmJiBkZWZpbml0aW9uLmFsbG93UHVibGlzaCAhPT0gZmFsc2U7XG4gIGNvbnN0IGFsbG93U2F2ZSA9IHN1cHBvcnRzRWRpdGluZyAmJiBkZWZpbml0aW9uLmFsbG93U2F2ZSAhPT0gZmFsc2U7XG4gIGNvbnN0IGFsbG93RGVsZXRlID0gZGVmaW5pdGlvbi5hbGxvd0RlbGV0ZSAhPT0gZmFsc2U7XG4gIGNvbnN0IGVkaXRhYmxlRmllbGRzID0gaXNDcmVhdGVNb2RlXG4gICAgPyAoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmNyZWF0ZUZpZWxkcykgPyBkZWZpbml0aW9uLmNyZWF0ZUZpZWxkcyA6IFtdKVxuICAgIDogaXNNYW51YWxFbnRyeVxuICAgICAgPyAoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLm1hbnVhbEVkaXRhYmxlRmllbGRzKSA/IGRlZmluaXRpb24ubWFudWFsRWRpdGFibGVGaWVsZHMgOiAoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmVkaXRhYmxlRmllbGRzKSA/IGRlZmluaXRpb24uZWRpdGFibGVGaWVsZHMgOiBbXSkpXG4gICAgICA6IChBcnJheS5pc0FycmF5KGRlZmluaXRpb24uZWRpdGFibGVGaWVsZHMpID8gZGVmaW5pdGlvbi5lZGl0YWJsZUZpZWxkcyA6IFtdKTtcbiAgY29uc3QgaW5mb0NhcmRGaWVsZHMgPSAhaXNDcmVhdGVNb2RlICYmIEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5pbmZvQ2FyZEZpZWxkcykgPyBkZWZpbml0aW9uLmluZm9DYXJkRmllbGRzIDogW107XG4gIGNvbnN0IGluZm9DYXJkQmxvY2tGaWVsZHMgPSAhaXNDcmVhdGVNb2RlICYmIEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5pbmZvQ2FyZEJsb2NrRmllbGRzKSA/IGRlZmluaXRpb24uaW5mb0NhcmRCbG9ja0ZpZWxkcyA6IFtdO1xuICBjb25zdCBoaWRkZW5DYXJkRmllbGRzID0gbmV3IFNldChcbiAgICBbLi4uaW5mb0NhcmRGaWVsZHMsIC4uLmluZm9DYXJkQmxvY2tGaWVsZHNdLmZpbHRlcigoZmllbGQpID0+ICFlZGl0YWJsZUZpZWxkcy5pbmNsdWRlcyhmaWVsZCkpLFxuICApO1xuICBjb25zdCBzaG93U3RhbmRhbG9uZUhlYWRlciA9IGluZm9DYXJkRmllbGRzLmxlbmd0aCA9PT0gMCAmJiBpbmZvQ2FyZEJsb2NrRmllbGRzLmxlbmd0aCA9PT0gMDtcbiAgY29uc3QgYWN0aXZlTGF5b3V0ID0gaXNDcmVhdGVNb2RlXG4gICAgPyAoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmNyZWF0ZUxheW91dCkgPyBkZWZpbml0aW9uLmNyZWF0ZUxheW91dCA6IGRlZmluaXRpb24uZWRpdExheW91dClcbiAgICA6IGlzTWFudWFsRW50cnkgJiYgQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLm1hbnVhbEVkaXRMYXlvdXQpXG4gICAgICA/IGRlZmluaXRpb24ubWFudWFsRWRpdExheW91dFxuICAgICAgOiBkZWZpbml0aW9uLmVkaXRMYXlvdXQ7XG4gIGNvbnN0IFttZW51T3Blbiwgc2V0TWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBtZW51UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtZW51T3Blbikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKG1lbnVSZWYuY3VycmVudCAmJiAhbWVudVJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICB9O1xuICB9LCBbbWVudU9wZW5dKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZWRpdG9yXCI+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JfX2lubmVyXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tYmFja1wiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkJhY2t9PuKGkCBCYWNrPC9idXR0b24+XG5cbiAgICAgICAge3Nob3dTdGFuZGFsb25lSGVhZGVyID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4taGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1ldGFcIj57ZGVmaW5pdGlvbi5tZXRhTGFiZWwgfHwgJ0NvbGxlY3Rpb24gVHlwZSd9PC9kaXY+XG4gICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi10aXRsZVwiPntnZXREaXNwbGF5VGl0bGUoZGVmaW5pdGlvbiwgZGlzcGxheWVkUmVjb3JkKX08L2gxPlxuICAgICAgICAgICAgICB7ZGlzcGxheWVkUmVjb3JkLnN0YXR1cyA/IDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc3RhdHVzXCI+e2Rpc3BsYXllZFJlY29yZC5zdGF0dXN9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7c2hvd1ZlcnNpb25UYWJzID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tdGFic1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BhZG1pbi10YWIke2FjdGl2ZVRhYiA9PT0gJ2RyYWZ0JyA/ICcgYWRtaW4tdGFiLS1hY3RpdmUnIDogJyd9YH0gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uU3dpdGNoVGFiKCdkcmFmdCcpfT5EUkFGVDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BhZG1pbi10YWIke2FjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgPyAnIGFkbWluLXRhYi0tYWN0aXZlJyA6ICcnfWB9IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBwdWJsaXNoZWRSZWNvcmQgJiYgb25Td2l0Y2hUYWIoJ3B1Ymxpc2hlZCcpfT5QVUJMSVNIRUQ8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAge2Vycm9yID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiPntlcnJvcn08L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxheW91dFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWFpbi1jYXJkXCI+XG4gICAgICAgICAgICA8UHJvZmlsZUluZm9DYXJkIGRlZmluaXRpb249e2RlZmluaXRpb259IHJlY29yZD17ZGlzcGxheWVkUmVjb3JkfSAvPlxuICAgICAgICAgICAge2RlZmluaXRpb24ubmFtZSA9PT0gJ21lc3NhZ2VzJyA/IChcbiAgICAgICAgICAgICAgPE1lc3NhZ2VSZXBseVBhbmVsXG4gICAgICAgICAgICAgICAgcmVwbGllcz17QXJyYXkuaXNBcnJheShkaXNwbGF5ZWRSZWNvcmQ/LnJlcGxpZXMpID8gZGlzcGxheWVkUmVjb3JkLnJlcGxpZXMgOiBbXX1cbiAgICAgICAgICAgICAgICByZXBseURyYWZ0PXtyZXBseURyYWZ0fVxuICAgICAgICAgICAgICAgIG9uUmVwbHlDaGFuZ2U9e29uUmVwbHlDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb25TZW5kUmVwbHk9e29uU2VuZFJlcGx5fVxuICAgICAgICAgICAgICAgIHNlbmRpbmdSZXBseT17c2VuZGluZ1JlcGx5fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICB7YWN0aXZlTGF5b3V0Lm1hcCgocm93LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2aXNpYmxlRmllbGRzID0gcm93LmZpbHRlcigoZmllbGQpID0+ICFoaWRkZW5DYXJkRmllbGRzLmhhcyhmaWVsZCkpO1xuXG4gICAgICAgICAgICAgIGlmICghdmlzaWJsZUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Byb3ctJHtpbmRleH1gfSBjbGFzc05hbWU9XCJhZG1pbi1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkLWdyaWRcIj5cbiAgICAgICAgICAgICAgICAgICAge3Zpc2libGVGaWVsZHMubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkRGlzYWJsZWQgPSBpc1B1Ymxpc2hlZFZpZXdcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICFzdXBwb3J0c0VkaXRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IChlZGl0YWJsZUZpZWxkcy5sZW5ndGggPiAwICYmICFlZGl0YWJsZUZpZWxkcy5pbmNsdWRlcyhmaWVsZCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb249e2RlZmluaXRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZmllbGR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkPXtmaWVsZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXllZFJlY29yZFtmaWVsZF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg9e1tmaWVsZF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25BZGRJdGVtPXtvbkFkZEl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZmllbGREaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGFzaWRlPlxuICAgICAgICAgICAgeyFzdXBwb3J0c0VkaXRpbmcgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2hlYWRcIj5FbnRyeTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtbm90ZVwiPlJlYWQtb25seSByZWNvcmQuPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2hlYWRcIj5FbnRyeTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAge2FsbG93UHVibGlzaCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uUHVibGlzaH0gZGlzYWJsZWQ9eyFjYW5QdWJsaXNofT5QdWJsaXNoPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeSBhZG1pbi1zaWRlLWJ1dHRvbi0tbWVudVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRNZW51T3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpfT7igKY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge21lbnVPcGVuID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXttZW51UmVmfSBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbnB1Ymxpc2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5VbnB1Ymxpc2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2ljb25cIj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5wdWJsaXNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSBhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRpc2NhcmRDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuRGlzY2FyZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvblwiPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaXNjYXJkIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge2FsbG93U2F2ZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvblNhdmV9IGRpc2FibGVkPXshY2FuU2F2ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NhdmluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApIDogYWxsb3dTYXZlID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25TYXZlfSBkaXNhYmxlZD17IWNhblNhdmV9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3NhdmluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUnfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1ub3RlXCI+Tm8gZWRpdGFibGUgYWN0aW9ucyBmb3IgdGhpcyByZWNvcmQuPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHthbGxvd0RlbGV0ZSA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19oZWFkXCI+QWN0aW9uczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9fYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkRlbGV0ZX0gZGlzYWJsZWQ9e2lzUHVibGlzaGVkVmlld30+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICAgICAgICB7ZGVmaW5pdGlvbi5uYW1lID09PSAnbWVtYmVyc2hpcHMnICYmICFpc0NyZWF0ZU1vZGUgJiYgb25DYW5jZWxNZW1iZXJzaGlwID8gKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbGFibGVTdGF0dXNlcyA9IG5ldyBTZXQoWydhY3RpdmUnLCAndHJpYWxpbmcnLCAncGFzdF9kdWUnLCAndW5wYWlkJ10pO1xuICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFN0YXR1cyA9IFN0cmluZyhyZWNvcmQ/LnN0YXR1cyB8fCAnJyk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjYW5DYW5jZWwgPSBjYW5jZWxhYmxlU3RhdHVzZXMuaGFzKGN1cnJlbnRTdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9faGVhZFwiPk1lbWJlcnNoaXA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9fYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLW5vdGVcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsIHRoaXMgbWVtYmVyc2hpcCBpbW1lZGlhdGVseSB2aWEgU3RyaXBlLiBUaGUgbWVtYmVyIHdpbGwgcmVjZWl2ZSBhIGNhbmNlbGxhdGlvbiBlbWFpbC5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJvcmRlckNvbG9yOiAnI2QwMmIyMCcsIGNvbG9yOiAnI2QwMmIyMCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5DYW5jZWwgfHwgY2FuY2VsbGluZ01lbWJlcnNoaXAgfHwgc2F2aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNhbmNlbE1lbWJlcnNoaXB9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjYW5jZWxsaW5nTWVtYmVyc2hpcCA/ICdDYW5jZWxsaW5nLi4uJyA6ICdDYW5jZWwgTWVtYmVyc2hpcCd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHshY2FuQ2FuY2VsID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIGNvbG9yOiAnIzhlOGVhOScsIGZvbnRTaXplOiAnLjc1cmVtJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZW1iZXJzaGlwIGlzIGFscmVhZHkge2N1cnJlbnRTdGF0dXMgfHwgJ25vdCBhY3RpdmUnfS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pKCkgOiBudWxsfVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9hc2lkZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29sbGVjdGlvbk1hbmFnZXIoKSB7XG4gIGNvbnN0IHsgcGFnZU5hbWUgfSA9IHVzZVBhcmFtcygpO1xuICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgYWRkTm90aWNlID0gdXNlTm90aWNlKCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbbGlzdExvYWRpbmcsIHNldExpc3RMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NhdmluZywgc2V0U2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2NhbmNlbGxpbmdNZW1iZXJzaGlwLCBzZXRDYW5jZWxsaW5nTWVtYmVyc2hpcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkZWZpbml0aW9uLCBzZXREZWZpbml0aW9uXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtjb250cm9scywgc2V0Q29udHJvbHNdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtyZWNvcmQsIHNldFJlY29yZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW29yaWdpbmFsUmVjb3JkLCBzZXRPcmlnaW5hbFJlY29yZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3B1Ymxpc2hlZFJlY29yZCwgc2V0UHVibGlzaGVkUmVjb3JkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2RyYWZ0Jyk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbcmVwbHlEcmFmdCwgc2V0UmVwbHlEcmFmdF0gPSB1c2VTdGF0ZSh7IHN1YmplY3Q6ICcnLCBib2R5OiAnJyB9KTtcbiAgY29uc3QgW3NlbmRpbmdSZXBseSwgc2V0U2VuZGluZ1JlcGx5XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBxdWVyeSA9IHVzZU1lbW8oKCkgPT4gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpLCBbbG9jYXRpb24uc2VhcmNoXSk7XG4gIGNvbnN0IHJlY29yZElkID0gcXVlcnkuZ2V0KCdyZWNvcmRJZCcpO1xuICBjb25zdCBpc05ldyA9IHF1ZXJ5LmdldCgnbmV3JykgPT09ICcxJztcbiAgY29uc3Qgc2VhcmNoID0gcXVlcnkuZ2V0KCdzZWFyY2gnKSB8fCAnJztcbiAgY29uc3Qgc3RhdHVzID0gcXVlcnkuZ2V0KCdzdGF0dXMnKSB8fCAnJztcbiAgY29uc3QgY2F0ZWdvcnkgPSBxdWVyeS5nZXQoJ2NhdGVnb3J5JykgfHwgJyc7XG4gIGNvbnN0IHBsYW5UeXBlID0gcXVlcnkuZ2V0KCdwbGFuVHlwZScpIHx8ICcnO1xuICBjb25zdCBmZWF0dXJlZCA9IHF1ZXJ5LmdldCgnZmVhdHVyZWQnKSB8fCAnJztcbiAgY29uc3QgaXNGZWF0dXJlZCA9IHF1ZXJ5LmdldCgnaXNGZWF0dXJlZCcpIHx8ICcnO1xuICBjb25zdCBpc1BvcHVsYXIgPSBxdWVyeS5nZXQoJ2lzUG9wdWxhcicpIHx8ICcnO1xuICBjb25zdCBzb3J0QnkgPSBxdWVyeS5nZXQoJ3NvcnRCeScpIHx8ICcnO1xuICBjb25zdCBzb3J0T3JkZXIgPSBxdWVyeS5nZXQoJ3NvcnRPcmRlcicpIHx8ICcnO1xuICBjb25zdCBkaXNwbGF5ZWRGaWVsZHMgPSBwYXJzZURpc3BsYXllZEZpZWxkcyhxdWVyeS5nZXQoJ2Rpc3BsYXllZEZpZWxkcycpKTtcbiAgY29uc3QgaXNNYW51YWxFZGl0YWJsZVJlY29yZCA9IHJlY29yZD8uZW50cnlTb3VyY2UgPT09ICdtYW51YWwnIHx8IHB1Ymxpc2hlZFJlY29yZD8uZW50cnlTb3VyY2UgPT09ICdtYW51YWwnO1xuICBjb25zdCBjYW5FZGl0Q3VycmVudFJlY29yZCA9IEJvb2xlYW4oZGVmaW5pdGlvbikgJiYgKCFkZWZpbml0aW9uLnJlYWRPbmx5IHx8IGlzTmV3IHx8IGlzTWFudWFsRWRpdGFibGVSZWNvcmQpO1xuXG4gIGNvbnN0IG1vZGUgPSB1c2VNZW1vKCgpID0+IChyZWNvcmRJZCB8fCBpc05ldyA/ICdlZGl0JyA6ICdsaXN0JyksIFtyZWNvcmRJZCwgaXNOZXddKTtcbiAgY29uc3QgaXNEaXJ0eSA9IHVzZU1lbW8oXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUocmVjb3JkKSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKG9yaWdpbmFsUmVjb3JkKSksXG4gICAgW3JlY29yZCwgb3JpZ2luYWxSZWNvcmRdLFxuICApO1xuICBjb25zdCBoYXNEcmFmdENvbnRlbnQgPSB1c2VNZW1vKCgpID0+IGhhc01lYW5pbmdmdWxWYWx1ZShyZWNvcmQpLCBbcmVjb3JkXSk7XG4gIGNvbnN0IGhhc1VucHVibGlzaGVkQ2hhbmdlcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUocmVjb3JkKSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKHB1Ymxpc2hlZFJlY29yZCkpLFxuICAgIFtyZWNvcmQsIHB1Ymxpc2hlZFJlY29yZF0sXG4gICk7XG4gIGNvbnN0IHNob3dWZXJzaW9uVGFicyA9IGRlZmluaXRpb24/LnNob3dWZXJzaW9uVGFicyAhPT0gZmFsc2U7XG4gIGNvbnN0IGNhblNhdmUgPSBjYW5FZGl0Q3VycmVudFJlY29yZCAmJiBtb2RlID09PSAnZWRpdCcgJiYgIXNhdmluZyAmJiAoIXNob3dWZXJzaW9uVGFicyB8fCBhY3RpdmVUYWIgIT09ICdwdWJsaXNoZWQnKSAmJiBpc0RpcnR5O1xuICBjb25zdCBjYW5QdWJsaXNoID0gY2FuRWRpdEN1cnJlbnRSZWNvcmQgJiYgbW9kZSA9PT0gJ2VkaXQnICYmICFzYXZpbmcgJiYgc2hvd1ZlcnNpb25UYWJzICYmIGFjdGl2ZVRhYiAhPT0gJ3B1Ymxpc2hlZCcgJiYgKHB1Ymxpc2hlZFJlY29yZCA/IGhhc1VucHVibGlzaGVkQ2hhbmdlcyA6IGhhc0RyYWZ0Q29udGVudCk7XG4gIGNvbnN0IGNhbkRpc2NhcmQgPSBjYW5FZGl0Q3VycmVudFJlY29yZCAmJiBtb2RlID09PSAnZWRpdCcgJiYgIXNhdmluZyAmJiBhY3RpdmVUYWIgIT09ICdwdWJsaXNoZWQnICYmIGhhc0RyYWZ0Q29udGVudDtcbiAgY29uc3QgY2FuVW5wdWJsaXNoID0gY2FuRWRpdEN1cnJlbnRSZWNvcmQgJiYgbW9kZSA9PT0gJ2VkaXQnICYmICFzYXZpbmcgJiYgQm9vbGVhbihwdWJsaXNoZWRSZWNvcmQpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGFjdGl2ZSA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc2hvdWxkQmxvY2sgPSBtb2RlID09PSAnZWRpdCcgfHwgIWRlZmluaXRpb247XG4gICAgICBpZiAoc2hvdWxkQmxvY2spIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldExpc3RMb2FkaW5nKHRydWUpO1xuICAgICAgfVxuICAgICAgc2V0RXJyb3IoJycpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RQYWdlKHBhZ2VOYW1lLCB7XG4gICAgICAgICAgcXVlcnk6IG1vZGUgPT09ICdlZGl0J1xuICAgICAgICAgICAgPyAocmVjb3JkSWQgPyB7IHJlY29yZElkIH0gOiB7IG5ldzogJzEnIH0pXG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgc2VhcmNoLFxuICAgICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICAgICAgICBwbGFuVHlwZSxcbiAgICAgICAgICAgICAgZmVhdHVyZWQsXG4gICAgICAgICAgICAgIGlzRmVhdHVyZWQsXG4gICAgICAgICAgICAgIGlzUG9wdWxhcixcbiAgICAgICAgICAgICAgc29ydEJ5LFxuICAgICAgICAgICAgICBzb3J0T3JkZXIsXG4gICAgICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGlzcGxheWVkRmllbGRzLmpvaW4oJywnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RGVmaW5pdGlvbihwYXlsb2FkLmRlZmluaXRpb24pO1xuICAgICAgICBzZXRSZWNvcmRzKHBheWxvYWQucmVjb3JkcyA/PyBbXSk7XG4gICAgICAgIHNldENvbnRyb2xzKHBheWxvYWQuY29udHJvbHMgPz8gbnVsbCk7XG4gICAgICAgIGNvbnN0IG5leHREcmFmdFJlY29yZCA9IHBheWxvYWQuZHJhZnRSZWNvcmQgPyBjbG9uZVZhbHVlKHBheWxvYWQuZHJhZnRSZWNvcmQpIDogbnVsbDtcbiAgICAgICAgc2V0UmVjb3JkKG5leHREcmFmdFJlY29yZCk7XG4gICAgICAgIHNldE9yaWdpbmFsUmVjb3JkKG5leHREcmFmdFJlY29yZCA/IGNsb25lVmFsdWUobmV4dERyYWZ0UmVjb3JkKSA6IG51bGwpO1xuICAgICAgICBzZXRQdWJsaXNoZWRSZWNvcmQocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQgPyBjbG9uZVZhbHVlKHBheWxvYWQucHVibGlzaGVkUmVjb3JkKSA6IG51bGwpO1xuICAgICAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgICAgIHNldFJlcGx5RHJhZnQoKGN1cnJlbnQpID0+IChcbiAgICAgICAgICBwYWdlTmFtZSA9PT0gJ21lc3NhZ2VzJyAmJiBuZXh0RHJhZnRSZWNvcmRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHN1YmplY3Q6IGN1cnJlbnQuc3ViamVjdCB8fCBgUmU6IFlvdXIgbWVzc2FnZSB0byBUaGUgTGVhZGVuaGFsbCBXb3Jrc2AsXG4gICAgICAgICAgICAgICAgYm9keTogY3VycmVudC5ib2R5LFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IGN1cnJlbnRcbiAgICAgICAgKSk7XG4gICAgICB9IGNhdGNoIChsb2FkRXJyb3IpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0RXJyb3IobG9hZEVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIHNldExpc3RMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkKCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFttb2RlLCBwYWdlTmFtZSwgcmVjb3JkSWQsIGlzTmV3LCBzZWFyY2gsIHN0YXR1cywgY2F0ZWdvcnksIHBsYW5UeXBlLCBmZWF0dXJlZCwgaXNGZWF0dXJlZCwgaXNQb3B1bGFyLCBzb3J0QnksIHNvcnRPcmRlciwgZGlzcGxheWVkRmllbGRzLmpvaW4oJywnKV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHBhZ2VOYW1lICE9PSAnbWVzc2FnZXMnIHx8ICFyZWNvcmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRSZXBseURyYWZ0KChjdXJyZW50KSA9PiAoe1xuICAgICAgc3ViamVjdDogY3VycmVudC5zdWJqZWN0IHx8ICdSZTogWW91ciBtZXNzYWdlIHRvIFRoZSBMZWFkZW5oYWxsIFdvcmtzJyxcbiAgICAgIGJvZHk6IGN1cnJlbnQuYm9keSxcbiAgICB9KSk7XG4gIH0sIFtwYWdlTmFtZSwgcmVjb3JkXSk7XG5cbiAgY29uc3QgdXBkYXRlTGlzdFF1ZXJ5ID0gKHBhdGNoKSA9PiB7XG4gICAgY29uc3QgbmV4dFBhcmFtcyA9IHtcbiAgICAgIHNlYXJjaCxcbiAgICAgIHN0YXR1cyxcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgcGxhblR5cGUsXG4gICAgICBmZWF0dXJlZCxcbiAgICAgIGlzRmVhdHVyZWQsXG4gICAgICBpc1BvcHVsYXIsXG4gICAgICBzb3J0QnksXG4gICAgICBzb3J0T3JkZXIsXG4gICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRpc3BsYXllZEZpZWxkcy5qb2luKCcsJyksXG4gICAgICAuLi5wYXRjaCxcbiAgICB9O1xuXG4gICAgbmF2aWdhdGUoYnVpbGRBZG1pblBhdGgobG9jYXRpb24ucGF0aG5hbWUsIG5leHRQYXJhbXMpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAocGF0aCwgbmV4dFZhbHVlKSA9PiB7XG4gICAgc2V0UmVjb3JkKChjdXJyZW50KSA9PiB1cGRhdGVBdFBhdGgoY3VycmVudCwgcGF0aCwgbmV4dFZhbHVlKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkSXRlbSA9IChwYXRoLCBuZXh0SXRlbSkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gYXBwZW5kQXRQYXRoKGN1cnJlbnQsIHBhdGgsIG5leHRJdGVtKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlSXRlbSA9IChwYXRoKSA9PiB7XG4gICAgc2V0UmVjb3JkKChjdXJyZW50KSA9PiByZW1vdmVBdFBhdGgoY3VycmVudCwgcGF0aCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdmVJdGVtID0gKHBhdGgsIG9mZnNldCkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gbW92ZUF0UGF0aChjdXJyZW50LCBwYXRoLCBvZmZzZXQpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlSW50ZW50ID0gYXN5bmMgKGludGVudCkgPT4ge1xuICAgIGlmICghcmVjb3JkIHx8ICFjYW5FZGl0Q3VycmVudFJlY29yZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGludGVudCxcbiAgICAgICAgICByZWNvcmRJZDogcmVjb3JkLmlkID8/IG51bGwsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIG5ldzogaXNOZXcgPyAnMScgOiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgaWYgKHBheWxvYWQuZHJhZnRSZWNvcmQpIHtcbiAgICAgICAgY29uc3QgbmV4dERyYWZ0UmVjb3JkID0gY2xvbmVWYWx1ZShwYXlsb2FkLmRyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0UmVjb3JkKG5leHREcmFmdFJlY29yZCk7XG4gICAgICAgIHNldE9yaWdpbmFsUmVjb3JkKGNsb25lVmFsdWUobmV4dERyYWZ0UmVjb3JkKSk7XG4gICAgICB9XG4gICAgICBzZXRQdWJsaXNoZWRSZWNvcmQocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQgPyBjbG9uZVZhbHVlKHBheWxvYWQucHVibGlzaGVkUmVjb3JkKSA6IG51bGwpO1xuICAgICAgaWYgKGludGVudCA9PT0gJ3VucHVibGlzaCcpIHtcbiAgICAgICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlY29yZElkICYmIHBheWxvYWQuZHJhZnRSZWNvcmQ/LmlkKSB7XG4gICAgICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IHJlY29yZElkOiBwYXlsb2FkLmRyYWZ0UmVjb3JkLmlkIH0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBheWxvYWQubm90aWNlKSB7XG4gICAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHBheWxvYWQubm90aWNlLm1lc3NhZ2UsIHR5cGU6IHBheWxvYWQubm90aWNlLnR5cGUgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXlsb2FkLmRlbGV0ZWQpIHtcbiAgICAgICAgbmF2aWdhdGUoYC9hZG1pbi9wYWdlcy8ke3BhZ2VOYW1lfWApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKHJlcXVlc3RFcnJvcikge1xuICAgICAgc2V0RXJyb3IocmVxdWVzdEVycm9yLm1lc3NhZ2UpO1xuICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcmVxdWVzdEVycm9yLm1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURpc2NhcmRDaGFuZ2VzID0gKCkgPT4ge1xuICAgIHNldFJlY29yZChnZXRFbXB0eUl0ZW0ocmVjb3JkKSk7XG4gICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNyZWF0ZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoZGVmaW5pdGlvbj8uYWxsb3dDcmVhdGUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IG5ldzogMSB9KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTGlzdEFjdGlvbiA9IGFzeW5jIChpbnRlbnQsIHRhcmdldFJlY29yZElkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGludGVudCxcbiAgICAgICAgICByZWNvcmRJZDogdGFyZ2V0UmVjb3JkSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcGF5bG9hZC5ub3RpY2U/Lm1lc3NhZ2UgPz8gYCR7ZGVmaW5pdGlvbi5sYWJlbH0gdXBkYXRlZC5gLCB0eXBlOiBwYXlsb2FkLm5vdGljZT8udHlwZSA/PyAnc3VjY2VzcycgfSk7XG5cbiAgICAgIGlmIChpbnRlbnQgPT09ICdkdXBsaWNhdGUnICYmIHBheWxvYWQuZHJhZnRSZWNvcmQ/LmlkKSB7XG4gICAgICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IHJlY29yZElkOiBwYXlsb2FkLmRyYWZ0UmVjb3JkLmlkIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW50ZW50ID09PSAnZGVsZXRlJykge1xuICAgICAgICBzZXRSZWNvcmRzKChjdXJyZW50KSA9PiBjdXJyZW50LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gdGFyZ2V0UmVjb3JkSWQpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChyZXF1ZXN0RXJyb3IpIHtcbiAgICAgIHNldEVycm9yKHJlcXVlc3RFcnJvci5tZXNzYWdlKTtcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHJlcXVlc3RFcnJvci5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXBseUNoYW5nZSA9IChmaWVsZCwgdmFsdWUpID0+IHtcbiAgICBzZXRSZXBseURyYWZ0KChjdXJyZW50KSA9PiAoe1xuICAgICAgLi4uY3VycmVudCxcbiAgICAgIFtmaWVsZF06IHZhbHVlLFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZW5kUmVwbHkgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKHBhZ2VOYW1lICE9PSAnbWVzc2FnZXMnIHx8ICFyZWNvcmRJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFNlbmRpbmdSZXBseSh0cnVlKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGludGVudDogJ3NlbmRSZXBseScsXG4gICAgICAgICAgcmVjb3JkSWQsXG4gICAgICAgICAgcmVwbHk6IHJlcGx5RHJhZnQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgaWYgKHBheWxvYWQuZHJhZnRSZWNvcmQpIHtcbiAgICAgICAgY29uc3QgbmV4dERyYWZ0UmVjb3JkID0gY2xvbmVWYWx1ZShwYXlsb2FkLmRyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0UmVjb3JkKG5leHREcmFmdFJlY29yZCk7XG4gICAgICAgIHNldE9yaWdpbmFsUmVjb3JkKGNsb25lVmFsdWUobmV4dERyYWZ0UmVjb3JkKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXlsb2FkLm5vdGljZSkge1xuICAgICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiBwYXlsb2FkLm5vdGljZS5tZXNzYWdlLCB0eXBlOiBwYXlsb2FkLm5vdGljZS50eXBlIH0pO1xuICAgICAgfVxuXG4gICAgICBzZXRSZXBseURyYWZ0KHtcbiAgICAgICAgc3ViamVjdDogcmVwbHlEcmFmdC5zdWJqZWN0IHx8ICdSZTogWW91ciBtZXNzYWdlIHRvIFRoZSBMZWFkZW5oYWxsIFdvcmtzJyxcbiAgICAgICAgYm9keTogJycsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChyZXF1ZXN0RXJyb3IpIHtcbiAgICAgIHNldEVycm9yKHJlcXVlc3RFcnJvci5tZXNzYWdlKTtcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHJlcXVlc3RFcnJvci5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTZW5kaW5nUmVwbHkoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDYW5jZWxNZW1iZXJzaGlwID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghcmVjb3JkPy5pZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldENhbmNlbGxpbmdNZW1iZXJzaGlwKHRydWUpO1xuICAgIHNldEVycm9yKCcnKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RQYWdlKHBhZ2VOYW1lLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgaW50ZW50OiAnY2FuY2VsTWVtYmVyc2hpcCcsXG4gICAgICAgICAgcmVjb3JkSWQ6IHJlY29yZC5pZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocGF5bG9hZC5kcmFmdFJlY29yZCkge1xuICAgICAgICBjb25zdCBuZXh0RHJhZnRSZWNvcmQgPSBjbG9uZVZhbHVlKHBheWxvYWQuZHJhZnRSZWNvcmQpO1xuICAgICAgICBzZXRSZWNvcmQobmV4dERyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0T3JpZ2luYWxSZWNvcmQoY2xvbmVWYWx1ZShuZXh0RHJhZnRSZWNvcmQpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBheWxvYWQubm90aWNlKSB7XG4gICAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHBheWxvYWQubm90aWNlLm1lc3NhZ2UsIHR5cGU6IHBheWxvYWQubm90aWNlLnR5cGUgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAocmVxdWVzdEVycm9yKSB7XG4gICAgICBzZXRFcnJvcihyZXF1ZXN0RXJyb3IubWVzc2FnZSk7XG4gICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiByZXF1ZXN0RXJyb3IubWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0Q2FuY2VsbGluZ01lbWJlcnNoaXAoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICByZXR1cm4gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiPkNvbGxlY3Rpb24gZGVmaW5pdGlvbiBtaXNzaW5nLjwvTWVzc2FnZUJveD47XG4gIH1cblxuICBpZiAobW9kZSA9PT0gJ2xpc3QnKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMaXN0Vmlld1xuICAgICAgICBkZWZpbml0aW9uPXtkZWZpbml0aW9ufVxuICAgICAgICByZWNvcmRzPXtyZWNvcmRzfVxuICAgICAgICBjb250cm9scz17Y29udHJvbHMgPz8ge1xuICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGVmaW5pdGlvbi5saXN0Q29sdW1ucy5tYXAoKGNvbHVtbikgPT4gY29sdW1uLmZpZWxkKSxcbiAgICAgICAgICBhdmFpbGFibGVGaWVsZHM6IGRlZmluaXRpb24ubGlzdENvbHVtbnMsXG4gICAgICAgICAgZmlsdGVyczogW10sXG4gICAgICAgICAgYWN0aXZlRmlsdGVyczoge30sXG4gICAgICAgICAgc29ydEJ5OiAnJyxcbiAgICAgICAgICBzb3J0T3JkZXI6ICdkZXNjJyxcbiAgICAgICAgfX1cbiAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgIGxvYWRpbmc9e2xpc3RMb2FkaW5nfVxuICAgICAgICBvblNlYXJjaD17KG5leHRTZWFyY2gpID0+IHVwZGF0ZUxpc3RRdWVyeSh7IHNlYXJjaDogbmV4dFNlYXJjaCB9KX1cbiAgICAgICAgb25PcGVuUmVjb3JkPXsobmV4dFJlY29yZElkKSA9PiBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyByZWNvcmRJZDogbmV4dFJlY29yZElkIH0pKX1cbiAgICAgICAgb25DcmVhdGU9e2hhbmRsZUNyZWF0ZX1cbiAgICAgICAgb25TZXRTb3J0PXsoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXh0T3JkZXIgPSBjb250cm9scz8uc29ydEJ5ID09PSBmaWVsZCAmJiBjb250cm9scz8uc29ydE9yZGVyID09PSAnYXNjJyA/ICdkZXNjJyA6ICdhc2MnO1xuICAgICAgICAgIHVwZGF0ZUxpc3RRdWVyeSh7IHNvcnRCeTogZmllbGQsIHNvcnRPcmRlcjogbmV4dE9yZGVyIH0pO1xuICAgICAgICB9fVxuICAgICAgICBvblNldEZpbHRlcj17KGZpZWxkLCB2YWx1ZSkgPT4gdXBkYXRlTGlzdFF1ZXJ5KHsgW2ZpZWxkXTogdmFsdWUgfSl9XG4gICAgICAgIG9uUmVzZXRGaWx0ZXJzPXsoKSA9PiB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgIHN0YXR1czogJycsXG4gICAgICAgICAgY2F0ZWdvcnk6ICcnLFxuICAgICAgICAgIHBsYW5UeXBlOiAnJyxcbiAgICAgICAgICBmZWF0dXJlZDogJycsXG4gICAgICAgICAgaXNGZWF0dXJlZDogJycsXG4gICAgICAgICAgaXNQb3B1bGFyOiAnJyxcbiAgICAgICAgfSl9XG4gICAgICAgIG9uVG9nZ2xlRGlzcGxheWVkRmllbGQ9eyhmaWVsZCwgY2hlY2tlZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5leHRGaWVsZHMgPSBjaGVja2VkXG4gICAgICAgICAgICA/IFsuLi5uZXcgU2V0KFsuLi4oY29udHJvbHM/LmRpc3BsYXllZEZpZWxkcyA/PyBbXSksIGZpZWxkXSldXG4gICAgICAgICAgICA6IChjb250cm9scz8uZGlzcGxheWVkRmllbGRzID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGZpZWxkKTtcblxuICAgICAgICAgIHVwZGF0ZUxpc3RRdWVyeSh7XG4gICAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IG5leHRGaWVsZHMuam9pbignLCcpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9fVxuICAgICAgICBvblJlc2V0RGlzcGxheWVkRmllbGRzPXsoKSA9PiB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGVmaW5pdGlvbi5saXN0Q29sdW1ucy5tYXAoKGNvbHVtbikgPT4gY29sdW1uLmZpZWxkKS5qb2luKCcsJyksXG4gICAgICAgIH0pfVxuICAgICAgICBvbkR1cGxpY2F0ZVJlY29yZD17KHRhcmdldFJlY29yZElkKSA9PiBoYW5kbGVMaXN0QWN0aW9uKCdkdXBsaWNhdGUnLCB0YXJnZXRSZWNvcmRJZCl9XG4gICAgICAgIG9uRGVsZXRlUmVjb3JkPXsodGFyZ2V0UmVjb3JkSWQpID0+IGhhbmRsZUxpc3RBY3Rpb24oJ2RlbGV0ZScsIHRhcmdldFJlY29yZElkKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGlmICghcmVjb3JkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgICA8RWRpdFZpZXdcbiAgICAgICAgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn1cbiAgICAgICAgcmVjb3JkPXtyZWNvcmR9XG4gICAgICBwdWJsaXNoZWRSZWNvcmQ9e3B1Ymxpc2hlZFJlY29yZH1cbiAgICAgIGFjdGl2ZVRhYj17YWN0aXZlVGFifVxuICAgICAgb25Td2l0Y2hUYWI9e3NldEFjdGl2ZVRhYn1cbiAgICAgIHNhdmluZz17c2F2aW5nfVxuICAgICAgZXJyb3I9e2Vycm9yfVxuICAgICAgb25CYWNrPXsoKSA9PiBuYXZpZ2F0ZShgL2FkbWluL3BhZ2VzLyR7cGFnZU5hbWV9YCl9XG4gICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgb25BZGRJdGVtPXtoYW5kbGVBZGRJdGVtfVxuICAgICAgb25SZW1vdmVJdGVtPXtoYW5kbGVSZW1vdmVJdGVtfVxuICAgICAgb25Nb3ZlSXRlbT17aGFuZGxlTW92ZUl0ZW19XG4gICAgICBvblNhdmU9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ3NhdmUnKX1cbiAgICAgIG9uUHVibGlzaD17KCkgPT4gaGFuZGxlU2F2ZUludGVudCgncHVibGlzaCcpfVxuICAgICAgb25EZWxldGU9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ2RlbGV0ZScpfVxuICAgICAgICBvbkRpc2NhcmRDaGFuZ2VzPXtoYW5kbGVEaXNjYXJkQ2hhbmdlc31cbiAgICAgICAgb25VbnB1Ymxpc2g9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ3VucHVibGlzaCcpfVxuICAgICAgICBjYW5TYXZlPXtjYW5TYXZlfVxuICAgICAgICBjYW5QdWJsaXNoPXtjYW5QdWJsaXNofVxuICAgICAgICBjYW5EaXNjYXJkPXtjYW5EaXNjYXJkfVxuICAgICAgICBjYW5VbnB1Ymxpc2g9e2NhblVucHVibGlzaH1cbiAgICAgICAgcmVwbHlEcmFmdD17cmVwbHlEcmFmdH1cbiAgICAgICAgb25SZXBseUNoYW5nZT17aGFuZGxlUmVwbHlDaGFuZ2V9XG4gICAgICAgIG9uU2VuZFJlcGx5PXtoYW5kbGVTZW5kUmVwbHl9XG4gICAgICAgIHNlbmRpbmdSZXBseT17c2VuZGluZ1JlcGx5fVxuICAgICAgICBpc0NyZWF0ZU1vZGU9e2lzTmV3fVxuICAgICAgICBvbkNhbmNlbE1lbWJlcnNoaXA9e3BhZ2VOYW1lID09PSAnbWVtYmVyc2hpcHMnID8gaGFuZGxlQ2FuY2VsTWVtYmVyc2hpcCA6IHVuZGVmaW5lZH1cbiAgICAgICAgY2FuY2VsbGluZ01lbWJlcnNoaXA9e2NhbmNlbGxpbmdNZW1iZXJzaGlwfVxuICAgICAgLz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IExvYWRlciwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbmNvbnN0IE1VTFRJTElORV9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fG1lc3NhZ2V8Ym9keXxzdWJ0aXRsZXxleGNlcnB0fGludHJvfGhvdXJzfGFkZHJlc3N8dGV4dHxwYXJhZ3JhcGh8b3ZlcnZpZXd8Y2hhbGxlbmdlfHJlc3VsdCkvaTtcbmNvbnN0IElNQUdFX0ZJRUxEX1BBVFRFUk4gPSAvKGltYWdlfGJhY2tncm91bmR8bG9nb3x0aHVtYm5haWx8ZmVhdHVyZWQpL2k7XG5jb25zdCBQQVRIX0ZJRUxEX1BBVFRFUk4gPSAvKF5wYXRoJHxQYXRoJCkvO1xuY29uc3QgRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fG1lc3NhZ2V8Ym9keXxzdWJ0aXRsZXxleGNlcnB0fGludHJvfG92ZXJ2aWV3fGNoYWxsZW5nZXxyZXN1bHR8YmFja2dyb3VuZHxpbWFnZXxnYWxsZXJ5fHNlY3Rpb25zfHRlc3RpbW9uaWFsc3xzZXJ2aWNlc3x3aHlDaG9vc2VJdGVtc3xmZWF0dXJlQ2hpcHN8c29jaWFsTGlua3N8ZmFxSXRlbXN8Y29tcGFyaXNvblJvd3N8Y29tcGFyaXNvbkNvbHVtbnN8c3RvcnlQYXJhZ3JhcGhzfHJlbGF0ZWRXb3Jrc3BhY2VzfGNoYWxsZW5nZUl0ZW1zfGFtZW5pdGllc3xuYXZpZ2F0aW9ufGZvb3Rlcnxmb3JtKS9pO1xuY29uc3QgUkVRVUlSRURfRklFTERfUEFUVEVSTiA9IC8oaGVyb1RpdGxlfGhlcm9TdWJ0aXRsZXxzdG9yeVRpdGxlfHdoeUNob29zZVRpdGxlfGFtZW5pdGllc1RpdGxlfHRpdGxlKSQvaTtcbmNvbnN0IFJPVVRFX09QVElPTlMgPSBbXG4gIHsgdmFsdWU6ICcvJywgbGFiZWw6ICdIb21lJyB9LFxuICB7IHZhbHVlOiAnL3ByaWNpbmcnLCBsYWJlbDogJ1ByaWNpbmcnIH0sXG4gIHsgdmFsdWU6ICcvbWVldGluZy1yb29tcycsIGxhYmVsOiAnTWVldGluZyBSb29tcycgfSxcbiAgeyB2YWx1ZTogJy92aXJ0dWFsLW9mZmljZScsIGxhYmVsOiAnVmlydHVhbCBPZmZpY2UnIH0sXG4gIHsgdmFsdWU6ICcvYWJvdXQnLCBsYWJlbDogJ0Fib3V0JyB9LFxuICB7IHZhbHVlOiAnL2NvbnRhY3QnLCBsYWJlbDogJ0NvbnRhY3QnIH0sXG4gIHsgdmFsdWU6ICcvZmFxJywgbGFiZWw6ICdGQVEnIH0sXG4gIHsgdmFsdWU6ICcvYmxvZycsIGxhYmVsOiAnQmxvZycgfSxcbiAgeyB2YWx1ZTogJy9wcml2YWN5JywgbGFiZWw6ICdQcml2YWN5IFBvbGljeScgfSxcbiAgeyB2YWx1ZTogJy90ZXJtcycsIGxhYmVsOiAnVGVybXMnIH0sXG4gIHsgdmFsdWU6ICcvZGFzaGJvYXJkJywgbGFiZWw6ICdEYXNoYm9hcmQnIH0sXG5dO1xuXG5jb25zdCBQQUdFX0xBWU9VVFMgPSB7XG4gICdzaXRlLXNldHRpbmdzJzogW1xuICAgIHsgZmllbGRzOiBbJ3NpdGVOYW1lJywgJ3RhZ2xpbmUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RFbWFpbCcsICdjb250YWN0UGhvbmUnLCAnYWRkcmVzcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnZGVmYXVsdFNlb1RpdGxlJywgJ2RlZmF1bHRTZW9EZXNjcmlwdGlvbiddIH0sXG4gICAgeyBmaWVsZHM6IFsnbmF2aWdhdGlvbiddIH0sXG4gICAgeyBmaWVsZHM6IFsnZm9vdGVyJ10gfSxcbiAgICB7IGZpZWxkczogWydzb2NpYWxMaW5rcyddIH0sXG4gIF0sXG4gIGhvbWVwYWdlOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVybycsICdmZWF0dXJlQ2hpcHMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlcnZpY2VzRXllYnJvdycsICdzZXJ2aWNlc0tpY2tlcicsICdzZXJ2aWNlcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnYWJvdXRIaWdobGlnaHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3doeUNob29zZUV5ZWJyb3cnLCAnd2h5Q2hvb3NlS2lja2VyJywgJ3doeUNob29zZVRpdGxlJywgJ3doeUNob29zZUl0ZW1zJ10gfSxcbiAgICB7IGZpZWxkczogWyd0ZXN0aW1vbmlhbHNFeWVicm93JywgJ3Rlc3RpbW9uaWFsc0tpY2tlcicsICd0ZXN0aW1vbmlhbHNUaXRsZScsICd0ZXN0aW1vbmlhbHMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2dhbGxlcnlFeWVicm93JywgJ2dhbGxlcnlLaWNrZXInLCAnZ2FsbGVyeVRpdGxlJywgJ2dhbGxlcnlJbWFnZXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RGb3JtJ10gfSxcbiAgICB7IGZpZWxkczogWyd2aXNpdFVzVGl0bGUnLCAnYWRkcmVzc0xhYmVsJywgJ2VtYWlsTGFiZWwnLCAncGhvbmVMYWJlbCcsICdvcGVuSG91cnNMYWJlbCcsICd3ZWVrZGF5SG91cnMnLCAnd2Vla2VuZEhvdXJzJywgJ21hcEJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbiAgJ2Fib3V0LXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydzdG9yeVRpdGxlJywgJ3N0b3J5UGFyYWdyYXBocycsICdzdG9yeUltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWyd3aHlDaG9vc2VUaXRsZScsICd3aHlDaG9vc2VJdGVtcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnYW1lbml0aWVzVGl0bGUnLCAnYW1lbml0aWVzSW1hZ2UnLCAnYW1lbml0aWVzJ10gfSxcbiAgXSxcbiAgJ2Jsb2ctcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlYXJjaFBsYWNlaG9sZGVyJywgJ3F1aWNrU2VhcmNoVGl0bGUnLCAncmVjZW50UG9zdHNUaXRsZScsICdjYXRlZ29yaWVzVGl0bGUnLCAncG9wdWxhclRhZ3NUaXRsZScsICdub1Jlc3VsdHNUZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydkZXRhaWxCYWNrTGFiZWwnLCAnZGV0YWlsU2VhcmNoVGl0bGUnLCAnZGV0YWlsU2VhcmNoQnV0dG9uTGFiZWwnLCAnZGV0YWlsUG9wdWxhclRhZ3NUaXRsZScsICdkZXRhaWxSZWNlbnRQb3N0c1RpdGxlJywgJ2RldGFpbFJlbGF0ZWRXb3Jrc3BhY2VzVGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2RldGFpbENvbW1lbnRGb3JtJ10gfSxcbiAgICB7IGZpZWxkczogWydyZWxhdGVkV29ya3NwYWNlcyddIH0sXG4gIF0sXG4gICdwcmljaW5nLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydjb21wYXJpc29uVGl0bGUnLCAnZmVhdHVyZUxpc3RUaXRsZScsICdmZWF0dXJlTGlzdFN1YnRpdGxlJywgJ2NvbXBhcmlzb25Db2x1bW5zJywgJ2NvbXBhcmlzb25Sb3dzJywgJ3JlY29tbWVuZGVkTGFiZWwnLCAncHVyY2hhc2VCdXR0b25MYWJlbCddIH0sXG4gICAgeyBmaWVsZHM6IFsnZmFxVGl0bGUnLCAnZmFxU3VidGl0bGUnLCAnZmFxSXRlbXMnXSB9LFxuICBdLFxuICAnZmFxLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnZXllYnJvdycsICdoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnLCAndGl0bGUnLCAnZGVzY3JpcHRpb24nXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlYXJjaFBsYWNlaG9sZGVyJywgJ25vUmVzdWx0c1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2N0YVRpdGxlJywgJ2N0YURlc2NyaXB0aW9uJywgJ2N0YUJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbiAgJ21lZXRpbmctcm9vbXMtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Jvb21zVGl0bGUnLCAncm9vbXNTdWJ0aXRsZScsICdib29rTm93TGFiZWwnLCAncmVhZE1vcmVMYWJlbCcsICdwb3B1bGFyTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3BsYW5zVGl0bGUnLCAncGxhbnNTdWJ0aXRsZScsICdnZXRTdGFydGVkTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2FtZW5pdGllc1RpdGxlJywgJ2FtZW5pdGllc1N1YnRpdGxlJywgJ2FtZW5pdGllcyddIH0sXG4gIF0sXG4gICd2aXJ0dWFsLW9mZmljZS1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnb3ZlcnZpZXdUaXRsZScsICdvdmVydmlld1RleHQnLCAnZmVhdHVyZWRJbWFnZScsICdnYWxsZXJ5SW1hZ2VzJ10gfSxcbiAgICB7IGZpZWxkczogWydjaGFsbGVuZ2VUaXRsZScsICdjaGFsbGVuZ2VJbnRybycsICdjaGFsbGVuZ2VJdGVtcyddIH0sXG4gICAgeyBmaWVsZHM6IFsncmVzdWx0VGl0bGUnLCAncmVzdWx0VGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnY3RhVGl0bGUnLCAnY3RhRGVzY3JpcHRpb24nLCAnY3RhQnV0dG9uTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Byb2plY3RJbmZvVGl0bGUnLCAncHJvamVjdERhdGVMYWJlbCcsICdwcm9qZWN0RGF0ZVZhbHVlJywgJ3Byb2plY3RXZWJzaXRlTGFiZWwnLCAncHJvamVjdFdlYnNpdGVWYWx1ZScsICdwcm9qZWN0Q2F0ZWdvcnlMYWJlbCcsICdwcm9qZWN0Q2F0ZWdvcnlWYWx1ZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdEZvcm0nXSB9LFxuICBdLFxuICAnY29udGFjdC1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnaW50cm9FeWVicm93JywgJ2ludHJvVGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2FkZHJlc3NDYXJkVGl0bGUnLCAncGhvbmVDYXJkVGl0bGUnLCAnZW1haWxDYXJkVGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2Zvcm0nXSB9LFxuICAgIHsgZmllbGRzOiBbJ21hcFRpdGxlJywgJ21hcERlc2NyaXB0aW9uJ10gfSxcbiAgXSxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnZWZmZWN0aXZlRGF0ZUxhYmVsJywgJ2VmZmVjdGl2ZURhdGVWYWx1ZScsICdpbnRyb1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlY3Rpb25zJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0VGl0bGUnLCAnY29udGFjdEJvZHknLCAnY29udGFjdEJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbiAgJ3Rlcm1zLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnZWZmZWN0aXZlRGF0ZUxhYmVsJywgJ2VmZmVjdGl2ZURhdGVWYWx1ZScsICdpbnRyb1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlY3Rpb25zJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0VGl0bGUnLCAnY29udGFjdEJvZHknLCAnY29udGFjdEJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbn07XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5hZG1pbi1lZGl0b3Ige1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAzMnB4IDQwcHggNjRweCA0MHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLWVkaXRvcl9faW5uZXIge1xuICBtYXgtd2lkdGg6IDEyNDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5hZG1pbi1iYWNrIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbn1cblxuLmFkbWluLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLmFkbWluLW1ldGEge1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xuICBjb2xvcjogIzY2NjY4NztcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4uYWRtaW4tdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMi4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tc3RhdHVzIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgbWFyZ2luLXRvcDogMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2M2ZjBjMjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZWZmZmVkO1xuICBjb2xvcjogIzJmNjg0NjtcbiAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYWRtaW4ta2ViYWIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi10YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWFlZjtcbn1cblxuLmFkbWluLXRhYiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMCAwIDEycHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi10YWItLWFjdGl2ZSB7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tdGFiLS1hY3RpdmU6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogLTFweDtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxZnIpIDIzMnB4O1xuICBnYXA6IDE2cHg7XG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcbn1cblxuLmFkbWluLW1haW4tY2FyZCxcbi5hZG1pbi1zaWRlLWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xufVxuXG4uYWRtaW4tbWFpbi1jYXJkIHtcbiAgcGFkZGluZzogMjRweDtcbn1cblxuLmFkbWluLXNlY3Rpb24gKyAuYWRtaW4tc2VjdGlvbiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5hZG1pbi1maWVsZC1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xuICBnYXA6IDIwcHggMjRweDtcbn1cblxuLmFkbWluLWZpZWxkIHtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uYWRtaW4tZmllbGQtLWZ1bGwge1xuICBncmlkLWNvbHVtbjogMSAvIC0xO1xufVxuXG4uYWRtaW4tbGFiZWwge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAycHg7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5hZG1pbi1sYWJlbF9fcmVxdWlyZWQge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cblxuLmFkbWluLWlucHV0LFxuLmFkbWluLXRleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmFkbWluLWlucHV0IHtcbiAgbWluLWhlaWdodDogMi41cmVtO1xufVxuXG4uYWRtaW4taW5wdXQ6Zm9jdXMsXG4uYWRtaW4tdGV4dGFyZWE6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDFweCAjNDk0NWZmO1xufVxuXG4uYWRtaW4taW5wdXQ6ZGlzYWJsZWQsXG4uYWRtaW4tdGV4dGFyZWE6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLXRleHRhcmVhIHtcbiAgbWluLWhlaWdodDogNS43NXJlbTtcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcbn1cblxuLmFkbWluLW1lZGlhIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDE0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX2VtcHR5IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWFfX3N0YWNrIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fdGh1bWIge1xuICBtYXgtd2lkdGg6IDI0MHB4O1xuICBtYXgtaGVpZ2h0OiAxNDBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuLmFkbWluLW1lZGlhX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fYWN0aW9uIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tbWVkaWFfX2FjdGlvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uYWRtaW4tbWVkaWFfX2ZpbGVuYW1lIHtcbiAgbWF4LXdpZHRoOiAyODBweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uYWRtaW4tbWVkaWFfX3NvdXJjZSB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b24ge1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLW1lZGlhX19lcnJvciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xufVxuXG4uYWRtaW4tb2JqZWN0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tb2JqZWN0X190aXRsZSB7XG4gIG1hcmdpbjogMCAwIDEycHg7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHggMTBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fY291bnQge1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbSArIC5hZG1pbi1yZXBlYXRhYmxlX19pdGVtIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtLS1kcmFnLW92ZXIgc3VtbWFyeSB7XG4gIGJhY2tncm91bmQ6ICNmMGYwZmY7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtW29wZW5dIHN1bW1hcnkge1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZiO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeSB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnk6Oi13ZWJraXQtZGV0YWlscy1tYXJrZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeS1sZWZ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19idWxsZXQge1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogI2YwZjBmNTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjYyNXJlbTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX25hbWUge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbiB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZSB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IGdyYWI7XG4gIHBhZGRpbmc6IDAgMnB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGU6YWN0aXZlIHtcbiAgY3Vyc29yOiBncmFiYmluZztcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmRpc2FibGVkIHtcbiAgY29sb3I6ICNjNGM0ZDI7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQ6ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQ6ZGlzYWJsZWQge1xuICBjb2xvcjogIzhlOGVhOTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2JvZHkge1xuICBwYWRkaW5nOiAxNnB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1zd2l0Y2gge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xufVxuXG4uYWRtaW4tc3dpdGNoIGlucHV0IHtcbiAgYWNjZW50LWNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tc3dpdGNoOmhhcyhpbnB1dDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLXNpZGUtY2FyZCArIC5hZG1pbi1zaWRlLWNhcmQge1xuICBtYXJnaW4tdG9wOiAxMnB4O1xufVxuXG4uYWRtaW4tc2lkZS1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1zaWRlLWNhcmRfX2JvZHkge1xuICBwYWRkaW5nOiAwIDEycHggMTJweDtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLFxuLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLS1tZW51IHtcbiAgd2lkdGg6IDJyZW07XG4gIGZsZXg6IDAgMCAycmVtO1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgKyA4cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDIyMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4xMik7XG4gIHBhZGRpbmc6IDhweCAwO1xuICB6LWluZGV4OiA0MDtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXIge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxMTgwcHgpIHtcbiAgLmFkbWluLWxheW91dCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1lZGl0b3Ige1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0OHB4O1xuICB9XG5cbiAgLmFkbWluLWZpZWxkLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5gO1xuXG5mdW5jdGlvbiB0b0xhYmVsKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVcbiAgICAucmVwbGFjZSgvKFthLXowLTldKShbQS1aXSkvZywgJyQxICQyJylcbiAgICAucmVwbGFjZSgvW18tXSsvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXGJzZW9cXGIvZ2ksICdTRU8nKVxuICAgIC5yZXBsYWNlKC9cXGJjdGFcXGIvZ2ksICdDVEEnKVxuICAgIC5yZXBsYWNlKC9cXGJmYXFcXGIvZ2ksICdGQVEnKVxuICAgIC5yZXBsYWNlKC9cXGJpZFxcYi9naSwgJ0lEJylcbiAgICAucmVwbGFjZSgvXFxidXJsXFxiL2dpLCAnVVJMJylcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgLnRyaW0oKVxuICAgIC5yZXBsYWNlKC9eLi8sICh2YWx1ZSkgPT4gdmFsdWUudG9VcHBlckNhc2UoKSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkTGFiZWwoZmllbGRLZXkpIHtcbiAgaWYgKGZpZWxkS2V5ID09PSAncGF0aCcpIHtcbiAgICByZXR1cm4gJ0Rlc3RpbmF0aW9uJztcbiAgfVxuXG4gIGlmIChmaWVsZEtleS5lbmRzV2l0aCgnUGF0aCcpKSB7XG4gICAgcmV0dXJuIHRvTGFiZWwoZmllbGRLZXkucmVwbGFjZSgvUGF0aCQvLCAnRGVzdGluYXRpb24nKSk7XG4gIH1cblxuICByZXR1cm4gdG9MYWJlbChmaWVsZEtleSk7XG59XG5cbmZ1bmN0aW9uIGdldFBhdGhPcHRpb25zKGN1cnJlbnRWYWx1ZSkge1xuICBjb25zdCBvcHRpb25zID0gWy4uLlJPVVRFX09QVElPTlNdO1xuXG4gIGlmIChjdXJyZW50VmFsdWUgJiYgIW9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IGN1cnJlbnRWYWx1ZSkpIHtcbiAgICBvcHRpb25zLnVuc2hpZnQoe1xuICAgICAgdmFsdWU6IGN1cnJlbnRWYWx1ZSxcbiAgICAgIGxhYmVsOiAnQ3VycmVudCBkZXN0aW5hdGlvbicsXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gY2xvbmVWYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xufVxuXG5mdW5jdGlvbiB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKChpdGVtKSA9PiB0b0NvbXBhcmFibGVWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpXG4gICAgICAuc29ydCgpXG4gICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gJ19fdGVtcElkJylcbiAgICAgIC5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBrZXkpID0+IHtcbiAgICAgICAgYWNjdW11bGF0b3Jba2V5XSA9IHRvQ29tcGFyYWJsZVZhbHVlKHZhbHVlW2tleV0pO1xuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9LCB7fSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGhhc01lYW5pbmdmdWxWYWx1ZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUuc29tZSgoaXRlbSkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKGl0ZW0pKTtcbiAgfVxuXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh2YWx1ZSlcbiAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09ICdfX3RlbXBJZCcpXG4gICAgICAuc29tZSgoWywgbmVzdGVkVmFsdWVdKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUobmVzdGVkVmFsdWUpKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdmFsdWUgIT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVuYW1lKHVybCkge1xuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHBhdGhuYW1lID0gbmV3IFVSTCh1cmwpLnBhdGhuYW1lO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aG5hbWUuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICByZXR1cm4gZmlsZW5hbWUgfHwgdXJsO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KCcvJykucG9wKCkgfHwgdXJsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEVtcHR5SXRlbShzYW1wbGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2FtcGxlKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmIChzYW1wbGUgJiYgdHlwZW9mIHNhbXBsZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgT2JqZWN0LmtleXMoc2FtcGxlKVxuICAgICAgICAuZmlsdGVyKChrZXkpID0+IGtleSAhPT0gJ2lkJylcbiAgICAgICAgLm1hcCgoa2V5KSA9PiBba2V5LCBnZXRFbXB0eUl0ZW0oc2FtcGxlW2tleV0pXSksXG4gICAgKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2FtcGxlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHNhbXBsZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXRQYXRoKHZhbHVlLCBwYXRoLCBuZXh0VmFsdWUpIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXh0VmFsdWU7XG4gIH1cblxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSB1cGRhdGVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgbmV4dFZhbHVlKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBdFBhdGgodmFsdWUsIHBhdGgpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZS5maWx0ZXIoKF8sIGluZGV4KSA9PiBpbmRleCAhPT0gcGF0aFswXSk7XG4gIH1cblxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSByZW1vdmVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kQXRQYXRoKHZhbHVlLCBwYXRoLCBuZXh0SXRlbSkge1xuICBpZiAoIXBhdGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFsuLi4oQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdKSwgbmV4dEl0ZW1dO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gYXBwZW5kQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRJdGVtKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoLCBvZmZzZXQpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gcGF0aFswXTtcbiAgICBjb25zdCBuZXh0SW5kZXggPSBpbmRleCArIG9mZnNldDtcblxuICAgIGlmIChuZXh0SW5kZXggPCAwIHx8IG5leHRJbmRleCA+PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9uZSA9IFsuLi52YWx1ZV07XG4gICAgY29uc3QgW21vdmVkXSA9IGNsb25lLnNwbGljZShpbmRleCwgMSk7XG4gICAgY2xvbmUuc3BsaWNlKG5leHRJbmRleCwgMCwgbW92ZWQpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IG1vdmVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgb2Zmc2V0KTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBwYXJzZUlucHV0VmFsdWUobmV4dFJhd1ZhbHVlLCBjdXJyZW50VmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBjdXJyZW50VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKG5leHRSYXdWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0UmF3VmFsdWUpO1xuICAgIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkKSA/IGN1cnJlbnRWYWx1ZSA6IHBhcnNlZDtcbiAgfVxuXG4gIHJldHVybiBuZXh0UmF3VmFsdWU7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVNZWRpYVByZXZpZXdVcmwodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xuXG4gIGlmICghdHJpbW1lZCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmICgvXmh0dHBzPzpcXC9cXC8vaS50ZXN0KHRyaW1tZWQpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnZGF0YTppbWFnZS8nKSkge1xuICAgIHJldHVybiB0cmltbWVkO1xuICB9XG5cbiAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgcmV0dXJuIHRyaW1tZWQ7XG4gIH1cblxuICByZXR1cm4gYC8ke3RyaW1tZWQucmVwbGFjZSgvXlxcLj9cXC8vLCAnJyl9YDtcbn1cblxuZnVuY3Rpb24gdG9BZG1pbkVycm9yTWVzc2FnZShlcnJvciwgZmFsbGJhY2spIHtcbiAgY29uc3QgcmVzcG9uc2VEYXRhID0gZXJyb3I/LnJlc3BvbnNlPy5kYXRhO1xuXG4gIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhPy5tZXNzYWdlID09PSAnc3RyaW5nJyAmJiByZXNwb25zZURhdGEubWVzc2FnZS50cmltKCkpIHtcbiAgICByZXR1cm4gcmVzcG9uc2VEYXRhLm1lc3NhZ2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YT8uZXJyb3IgPT09ICdzdHJpbmcnICYmIHJlc3BvbnNlRGF0YS5lcnJvci50cmltKCkpIHtcbiAgICByZXR1cm4gcmVzcG9uc2VEYXRhLmVycm9yO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlcnJvcj8ubWVzc2FnZSA9PT0gJ3N0cmluZycgJiYgZXJyb3IubWVzc2FnZS50cmltKCkpIHtcbiAgICByZXR1cm4gZXJyb3IubWVzc2FnZTtcbiAgfVxuXG4gIHJldHVybiBmYWxsYmFjaztcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkQWRtaW5JbWFnZShmaWxlKSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvbWVkaWEvdXBsb2FkJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvciB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgfVxuXG4gIGNvbnN0IHVwbG9hZGVkVXJsID0gcGF5bG9hZD8udXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnJlbGF0aXZlVXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnVybDtcblxuICBpZiAoIXVwbG9hZGVkVXJsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgc3VjY2VlZGVkIGJ1dCByZXR1cm5lZCBubyBVUkwuJyk7XG4gIH1cblxuICByZXR1cm4gdXBsb2FkZWRVcmw7XG59XG5cbmNvbnN0IE1FRElBX1BJQ0tFUl9FVkVOVCA9ICdhZG1pbmpzLW1lZGlhLXNlbGVjdCc7XG5cbmZ1bmN0aW9uIGNob29zZUFkbWluTGlicmFyeUltYWdlKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGlja2VyV2luZG93ID0gd2luZG93Lm9wZW4oXG4gICAgICAnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnk/cGlja2VyPTEnLFxuICAgICAgJ2FkbWluLW1lZGlhLWxpYnJhcnktcGlja2VyJyxcbiAgICAgICdwb3B1cD15ZXMsd2lkdGg9MTQ0MCxoZWlnaHQ9OTAwLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMnLFxuICAgICk7XG5cbiAgICBpZiAoIXBpY2tlcldpbmRvdykge1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcignTWVkaWEgbGlicmFyeSBwb3B1cCB3YXMgYmxvY2tlZC4nKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGNsb3NlV2F0Y2hlcik7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZU1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgZXZlbnQuc291cmNlICE9PSBwaWNrZXJXaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuZGF0YT8udHlwZSAhPT0gTUVESUFfUElDS0VSX0VWRU5UKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgY2xlYW51cCgpO1xuICAgICAgcmVzb2x2ZSh0eXBlb2YgZXZlbnQuZGF0YS51cmwgPT09ICdzdHJpbmcnID8gZXZlbnQuZGF0YS51cmwgOiAnJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNsb3NlV2F0Y2hlciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAocGlja2VyV2luZG93LmNsb3NlZCAmJiAhZmluaXNoZWQpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgIH1cbiAgICB9LCA1MDApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzUmVxdWlyZWRGaWVsZChmaWVsZEtleSkge1xuICByZXR1cm4gUkVRVUlSRURfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkS2V5KTtcbn1cblxuZnVuY3Rpb24gZmllbGRDbGFzc05hbWUoZmllbGRLZXksIHZhbHVlKSB7XG4gIHJldHVybiBGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSkgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbidcbiAgICA/ICdhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbCdcbiAgICA6ICdhZG1pbi1maWVsZCc7XG59XG5cbmZ1bmN0aW9uIGlzSGlkZGVuRWRpdG9yRmllbGQoZmllbGRLZXkpIHtcbiAgcmV0dXJuIFN0cmluZyhmaWVsZEtleSkudG9Mb3dlckNhc2UoKSA9PT0gJ2ljb24nO1xufVxuXG5mdW5jdGlvbiBnZXRJdGVtVGl0bGUoaXRlbSwgZmFsbGJhY2tMYWJlbCwgaW5kZXgpIHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGl0ZW0pKSB7XG4gICAgcmV0dXJuIGAke2ZhbGxiYWNrTGFiZWx9ICR7aW5kZXggKyAxfWA7XG4gIH1cblxuICBjb25zdCBwcmVmZXJyZWQgPSBbXG4gICAgaXRlbS50aXRsZSxcbiAgICBpdGVtLm5hbWUsXG4gICAgaXRlbS5sYWJlbCxcbiAgICBpdGVtLnF1ZXN0aW9uLFxuICAgIGl0ZW0uZmVhdHVyZSxcbiAgICBpdGVtLnBhdGgsXG4gICAgaXRlbS5ocmVmLFxuICAgIGl0ZW0uYWx0LFxuICBdLmZpbmQoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRyaW0oKSk7XG5cbiAgcmV0dXJuIHByZWZlcnJlZCB8fCBgJHtmYWxsYmFja0xhYmVsfSAke2luZGV4ICsgMX1gO1xufVxuXG5mdW5jdGlvbiBidWlsZFNlY3Rpb25zKHBhZ2VOYW1lLCBjb250ZW50KSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhjb250ZW50ID8/IHt9KTtcbiAgY29uc3QgbGF5b3V0ID0gUEFHRV9MQVlPVVRTW3BhZ2VOYW1lXTtcblxuICBpZiAoIWxheW91dCkge1xuICAgIHJldHVybiBbeyBlbnRyaWVzIH1dO1xuICB9XG5cbiAgY29uc3QgdXNlZCA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgc2VjdGlvbnMgPSBsYXlvdXRcbiAgICAubWFwKChzZWN0aW9uKSA9PiB7XG4gICAgICBjb25zdCBzZWN0aW9uRW50cmllcyA9IHNlY3Rpb24uZmllbGRzXG4gICAgICAgIC5maWx0ZXIoKGZpZWxkKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29udGVudCA/PyB7fSwgZmllbGQpKVxuICAgICAgICAubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIHVzZWQuYWRkKGZpZWxkKTtcbiAgICAgICAgICByZXR1cm4gW2ZpZWxkLCBjb250ZW50W2ZpZWxkXV07XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4geyAuLi5zZWN0aW9uLCBlbnRyaWVzOiBzZWN0aW9uRW50cmllcyB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigoc2VjdGlvbikgPT4gc2VjdGlvbi5lbnRyaWVzLmxlbmd0aCA+IDApO1xuXG4gIGNvbnN0IGV4dHJhRW50cmllcyA9IGVudHJpZXMuZmlsdGVyKChbZmllbGRLZXldKSA9PiAhdXNlZC5oYXMoZmllbGRLZXkpKTtcblxuICBpZiAoZXh0cmFFbnRyaWVzLmxlbmd0aCkge1xuICAgIHNlY3Rpb25zLnB1c2goeyBlbnRyaWVzOiBleHRyYUVudHJpZXMgfSk7XG4gIH1cblxuICByZXR1cm4gc2VjdGlvbnM7XG59XG5cbmZ1bmN0aW9uIFByaW1pdGl2ZUZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBsYWJlbCA9IGdldEZpZWxkTGFiZWwoZmllbGRLZXkpO1xuICBjb25zdCBpbnB1dFZhbHVlID0gdmFsdWUgPz8gJyc7XG4gIGNvbnN0IHJlcXVpcmVkID0gaXNSZXF1aXJlZEZpZWxkKGZpZWxkS2V5KTtcbiAgY29uc3QgaXNJbWFnZUZpZWxkID0gdHlwZW9mIGlucHV0VmFsdWUgPT09ICdzdHJpbmcnICYmIElNQUdFX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSk7XG4gIGNvbnN0IGlzUGF0aEZpZWxkID0gdHlwZW9mIGlucHV0VmFsdWUgPT09ICdzdHJpbmcnICYmIFBBVEhfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkS2V5KTtcbiAgY29uc3QgcHJldmlld1VybCA9IGlzSW1hZ2VGaWVsZCA/IHJlc29sdmVNZWRpYVByZXZpZXdVcmwoaW5wdXRWYWx1ZSkgOiAnJztcbiAgY29uc3Qgc2hvd1ByZXZpZXcgPSBCb29sZWFuKHByZXZpZXdVcmwpO1xuICBjb25zdCBmaWxlSW5wdXRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRpbmcsIHNldFVwbG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1cGxvYWRFcnJvciwgc2V0VXBsb2FkRXJyb3JdID0gdXNlU3RhdGUoJycpO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZmllbGRDbGFzc05hbWUoZmllbGRLZXksIHZhbHVlKX0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICB7cmVxdWlyZWQgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbF9fcmVxdWlyZWRcIj4qPC9zcGFuPiA6IG51bGx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc3dpdGNoXCI+XG4gICAgICAgICAgPHNwYW4+e3ZhbHVlID8gJ0VuYWJsZWQnIDogJ0Rpc2FibGVkJ308L3NwYW4+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgY2hlY2tlZD17dmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBldmVudC50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKGlzSW1hZ2VGaWVsZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICB7cmVxdWlyZWQgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbF9fcmVxdWlyZWRcIj4qPC9zcGFuPiA6IG51bGx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19jYW52YXNcIj5cbiAgICAgICAgICAgIHtzaG93UHJldmlldyA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc3RhY2tcIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX190aHVtYlwiIHNyYz17cHJldmlld1VybH0gYWx0PXtsYWJlbH0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbihwcmV2aWV3VXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4oaXXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHBhdGgsICcnKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4pyVXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19maWxlbmFtZVwiPntnZXRGaWxlbmFtZShpbnB1dFZhbHVlKX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lbXB0eVwiPlVwbG9hZCBhbiBpbWFnZSB0byBhdHRhY2ggbWVkaWEuPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHVwbG9hZGluZ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcignJyk7XG5cbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVXJsID0gYXdhaXQgY2hvb3NlQWRtaW5MaWJyYXJ5SW1hZ2UoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBzZWxlY3RlZFVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gY2hvb3NlIGltYWdlIGZyb20gbWVkaWEgbGlicmFyeS4nKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQ2hvb3NlIGZyb20gbWVkaWEgbGlicmFyeVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgcmVmPXtmaWxlSW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXthc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlcz8uWzBdO1xuICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWRGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGxvYWRlZFVybCA9IGF3YWl0IHVwbG9hZEFkbWluSW1hZ2Uoc2VsZWN0ZWRGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UocGF0aCwgdXBsb2FkZWRVcmwpO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt1cGxvYWRFcnJvciA/IDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2Vycm9yXCI+e3VwbG9hZEVycm9yfTwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2ZpZWxkQ2xhc3NOYW1lKGZpZWxkS2V5LCB2YWx1ZSl9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgICAge3JlcXVpcmVkID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgPC9sYWJlbD5cbiAgICAgIHtpc1BhdGhGaWVsZCA/IChcbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgZGVzdGluYXRpb248L29wdGlvbj5cbiAgICAgICAgICB7Z2V0UGF0aE9wdGlvbnMoaW5wdXRWYWx1ZSkubWFwKChvcHRpb24pID0+IChcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHRpb24udmFsdWUgfHwgJ2VtcHR5J30gdmFsdWU9e29wdGlvbi52YWx1ZX0+XG4gICAgICAgICAgICAgIHtvcHRpb24ubGFiZWx9XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICApIDogTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSkgPyAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXRleHRhcmVhXCJcbiAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgcGFyc2VJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSwgdmFsdWUpKX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICB0eXBlPXt0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gJ251bWJlcicgOiAndGV4dCd9XG4gICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBPYmplY3RGaWVsZCh7IGZpZWxkS2V5LCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyh2YWx1ZSA/PyB7fSkuZmlsdGVyKChbbmVzdGVkS2V5XSkgPT4gbmVzdGVkS2V5ICE9PSAnaWQnICYmICFpc0hpZGRlbkVkaXRvckZpZWxkKG5lc3RlZEtleSkpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1vYmplY3RcIj5cbiAgICAgICAgPGg0IGNsYXNzTmFtZT1cImFkbWluLW9iamVjdF9fdGl0bGVcIj57dG9MYWJlbChmaWVsZEtleSl9PC9oND5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAge2VudHJpZXMubWFwKChbbmVzdGVkS2V5LCBuZXN0ZWRWYWx1ZV0pID0+IChcbiAgICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICAgIGtleT17YCR7ZmllbGRLZXl9LSR7bmVzdGVkS2V5fWB9XG4gICAgICAgICAgICAgIGZpZWxkS2V5PXtuZXN0ZWRLZXl9XG4gICAgICAgICAgICAgIHZhbHVlPXtuZXN0ZWRWYWx1ZX1cbiAgICAgICAgICAgICAgcGF0aD17Wy4uLnBhdGgsIG5lc3RlZEtleV19XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgb25BZGRJdGVtPXtvbkFkZEl0ZW19XG4gICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBBcnJheUZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSB0b0xhYmVsKGZpZWxkS2V5KTtcbiAgY29uc3Qgc2FtcGxlID0gdmFsdWVbMF0gPz8gJyc7XG4gIGNvbnN0IFtkcmFnSW5kZXgsIHNldERyYWdJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2RyYWdPdmVySW5kZXgsIHNldERyYWdPdmVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX190aXRsZVwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fY291bnRcIj57dmFsdWUubGVuZ3RofSBlbnRyeXt2YWx1ZS5sZW5ndGggPT09IDEgPyAnJyA6ICdpZXMnfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7dmFsdWUubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxkZXRhaWxzXG4gICAgICAgICAgICBrZXk9e2Ake2ZpZWxkS2V5fS0ke2luZGV4fWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yZXBlYXRhYmxlX19pdGVtJHtkcmFnT3ZlckluZGV4ID09PSBpbmRleCA/ICcgYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyJyA6ICcnfWB9XG4gICAgICAgICAgICBvcGVuPXtpbmRleCA9PT0gMH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaWYgKGRyYWdPdmVySW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyb3A9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gaW5kZXggLSBkcmFnSW5kZXg7XG4gICAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgICAgICAgICAgICBvbk1vdmVJdGVtKFsuLi5wYXRoLCBkcmFnSW5kZXhdLCBvZmZzZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldERyYWdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChudWxsKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyYWdMZWF2ZT17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19idWxsZXRcIj7ilrw8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fbmFtZVwiPntnZXRJdGVtVGl0bGUoaXRlbSwgbGFiZWwsIGluZGV4KX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtKFsuLi5wYXRoLCBpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIPCfl5FcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZT17IWRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEcmFnIHRvIHJlb3JkZXJcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyhpbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDii67ii65cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3N1bW1hcnk+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgICAge2lzUGxhaW5PYmplY3QoaXRlbSkgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoW25lc3RlZEtleV0pID0+IG5lc3RlZEtleSAhPT0gJ2lkJyAmJiAhaXNIaWRkZW5FZGl0b3JGaWVsZChuZXN0ZWRLZXkpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKChbbmVzdGVkS2V5LCBuZXN0ZWRWYWx1ZV0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8RmllbGRSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtgJHtmaWVsZEtleX0tJHtpbmRleH0tJHtuZXN0ZWRLZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkS2V5PXtuZXN0ZWRLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmVzdGVkVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoPXtbLi4ucGF0aCwgaW5kZXgsIG5lc3RlZEtleV19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFkZEl0ZW09e29uQWRkSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3ZlSXRlbT17b25Nb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8UHJpbWl0aXZlRmllbGRcbiAgICAgICAgICAgICAgICAgIGZpZWxkS2V5PXtgJHtmaWVsZEtleX0tJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW19XG4gICAgICAgICAgICAgICAgICBwYXRoPXtbLi4ucGF0aCwgaW5kZXhdfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICkpfVxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19hZGRcIlxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkFkZEl0ZW0ocGF0aCwgZ2V0RW1wdHlJdGVtKHNhbXBsZSkpfVxuICAgICAgICA+XG4gICAgICAgICAgKyBBZGQgYW4gZW50cnlcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRmllbGRSZW5kZXJlcihwcm9wcykge1xuICBjb25zdCB7IHZhbHVlIH0gPSBwcm9wcztcblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gPEFycmF5RmllbGQgey4uLnByb3BzfSAvPjtcbiAgfVxuXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiA8T2JqZWN0RmllbGQgey4uLnByb3BzfSAvPjtcbiAgfVxuXG4gIHJldHVybiA8UHJpbWl0aXZlRmllbGQgey4uLnByb3BzfSAvPjtcbn1cblxuZnVuY3Rpb24gRm9ybVNlY3Rpb24oeyBlbnRyaWVzLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNlY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQtZ3JpZFwiPlxuICAgICAgICB7ZW50cmllcy5tYXAoKFtmaWVsZEtleSwgdmFsdWVdKSA9PiAoXG4gICAgICAgICAgaXNIaWRkZW5FZGl0b3JGaWVsZChmaWVsZEtleSkgPyBudWxsIDogKFxuICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICBrZXk9e2ZpZWxkS2V5fVxuICAgICAgICAgICAgZmllbGRLZXk9e2ZpZWxkS2V5fVxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgcGF0aD17W2ZpZWxkS2V5XX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgIG9uQWRkSXRlbT17b25BZGRJdGVtfVxuICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19XG4gICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgKVxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb250ZW50UGFnZUVkaXRvcigpIHtcbiAgY29uc3QgeyBwYWdlTmFtZSB9ID0gdXNlUGFyYW1zKCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFnZUxhYmVsLCBzZXRQYWdlTGFiZWxdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbY29udGVudCwgc2V0Q29udGVudF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtvcmlnaW5hbENvbnRlbnQsIHNldE9yaWdpbmFsQ29udGVudF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtwdWJsaXNoZWRDb250ZW50LCBzZXRQdWJsaXNoZWRDb250ZW50XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2RyYWZ0Jyk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbWVudU9wZW4sIHNldE1lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgYWRkTm90aWNlID0gdXNlTm90aWNlKCk7XG4gIGNvbnN0IG1lbnVSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgY29uc3QgZGlzcGxheWVkQ29udGVudCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkQ29udGVudCA/IHB1Ymxpc2hlZENvbnRlbnQgOiBjb250ZW50KSxcbiAgICBbYWN0aXZlVGFiLCBjb250ZW50LCBwdWJsaXNoZWRDb250ZW50XSxcbiAgKTtcbiAgY29uc3QgaXNQdWJsaXNoZWRWaWV3ID0gYWN0aXZlVGFiID09PSAncHVibGlzaGVkJyAmJiBwdWJsaXNoZWRDb250ZW50O1xuICBjb25zdCBpc0RpcnR5ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShjb250ZW50KSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKG9yaWdpbmFsQ29udGVudCkpLFxuICAgIFtjb250ZW50LCBvcmlnaW5hbENvbnRlbnRdLFxuICApO1xuICBjb25zdCBoYXNEcmFmdENvbnRlbnQgPSB1c2VNZW1vKCgpID0+IGhhc01lYW5pbmdmdWxWYWx1ZShjb250ZW50KSwgW2NvbnRlbnRdKTtcbiAgY29uc3QgaGFzVW5wdWJsaXNoZWRDaGFuZ2VzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShjb250ZW50KSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKHB1Ymxpc2hlZENvbnRlbnQpKSxcbiAgICBbY29udGVudCwgcHVibGlzaGVkQ29udGVudF0sXG4gICk7XG4gIGNvbnN0IGNhblNhdmUgPSAhaXNQdWJsaXNoZWRWaWV3ICYmICFzYXZpbmcgJiYgaXNEaXJ0eTtcbiAgY29uc3QgY2FuUHVibGlzaCA9ICFpc1B1Ymxpc2hlZFZpZXcgJiYgIXNhdmluZyAmJiAocHVibGlzaGVkQ29udGVudCA/IGhhc1VucHVibGlzaGVkQ2hhbmdlcyA6IGhhc0RyYWZ0Q29udGVudCk7XG4gIGNvbnN0IGNhbkRpc2NhcmQgPSAhc2F2aW5nICYmICFpc1B1Ymxpc2hlZFZpZXcgJiYgaGFzRHJhZnRDb250ZW50O1xuICBjb25zdCBjYW5VbnB1Ymxpc2ggPSAhc2F2aW5nICYmIEJvb2xlYW4ocHVibGlzaGVkQ29udGVudCk7XG4gIGNvbnN0IHNlY3Rpb25zID0gdXNlTWVtbygoKSA9PiBidWlsZFNlY3Rpb25zKHBhZ2VOYW1lLCBkaXNwbGF5ZWRDb250ZW50KSwgW3BhZ2VOYW1lLCBkaXNwbGF5ZWRDb250ZW50XSk7XG4gIGNvbnN0IGVudHJ5VGl0bGUgPSB1c2VNZW1vKCgpID0+IChcbiAgICBkaXNwbGF5ZWRDb250ZW50Py5oZXJvVGl0bGVcbiAgICB8fCBkaXNwbGF5ZWRDb250ZW50Py50aXRsZVxuICAgIHx8IGRpc3BsYXllZENvbnRlbnQ/LnNpdGVOYW1lXG4gICAgfHwgcGFnZUxhYmVsXG4gICksIFtkaXNwbGF5ZWRDb250ZW50LCBwYWdlTGFiZWxdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc01vdW50ZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgbG9hZFBhZ2UgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3IoJycpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXRQYWdlKHsgcGFnZU5hbWUgfSk7XG5cbiAgICAgICAgaWYgKCFpc01vdW50ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0RHJhZnRDb250ZW50ID0gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLmRyYWZ0RGF0YSA/PyByZXNwb25zZS5kYXRhLmRhdGEgPz8ge30pO1xuICAgICAgICBzZXRDb250ZW50KG5leHREcmFmdENvbnRlbnQpO1xuICAgICAgICBzZXRPcmlnaW5hbENvbnRlbnQoY2xvbmVWYWx1ZShuZXh0RHJhZnRDb250ZW50KSk7XG4gICAgICAgIHNldFB1Ymxpc2hlZENvbnRlbnQocmVzcG9uc2UuZGF0YS5wdWJsaXNoZWREYXRhID8gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLnB1Ymxpc2hlZERhdGEpIDogbnVsbCk7XG4gICAgICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgICBzZXRQYWdlTGFiZWwocmVzcG9uc2UuZGF0YS5sYWJlbCA/PyB0b0xhYmVsKHBhZ2VOYW1lKSk7XG4gICAgICB9IGNhdGNoIChsb2FkRXJyb3IpIHtcbiAgICAgICAgaWYgKCFpc01vdW50ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvcih0b0FkbWluRXJyb3JNZXNzYWdlKGxvYWRFcnJvciwgJ0ZhaWxlZCB0byBsb2FkIHRoaXMgY29udGVudCBwYWdlLicpKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChpc01vdW50ZWQpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkUGFnZSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzTW91bnRlZCA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFtwYWdlTmFtZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtZW51T3Blbikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKG1lbnVSZWYuY3VycmVudCAmJiAhbWVudVJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICB9O1xuICB9LCBbbWVudU9wZW5dKTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAocGF0aCwgbmV4dFZhbHVlKSA9PiB7XG4gICAgc2V0Q29udGVudCgoY3VycmVudFZhbHVlKSA9PiB1cGRhdGVBdFBhdGgoY3VycmVudFZhbHVlLCBwYXRoLCBuZXh0VmFsdWUpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRJdGVtID0gKHBhdGgsIG5leHRJdGVtKSA9PiB7XG4gICAgc2V0Q29udGVudCgoY3VycmVudFZhbHVlKSA9PiBhcHBlbmRBdFBhdGgoY3VycmVudFZhbHVlLCBwYXRoLCBuZXh0SXRlbSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZUl0ZW0gPSAocGF0aCkgPT4ge1xuICAgIHNldENvbnRlbnQoKGN1cnJlbnRWYWx1ZSkgPT4gcmVtb3ZlQXRQYXRoKGN1cnJlbnRWYWx1ZSwgcGF0aCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdmVJdGVtID0gKHBhdGgsIG9mZnNldCkgPT4ge1xuICAgIHNldENvbnRlbnQoKGN1cnJlbnRWYWx1ZSkgPT4gbW92ZUF0UGF0aChjdXJyZW50VmFsdWUsIHBhdGgsIG9mZnNldCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhdmUgPSBhc3luYyAoaW50ZW50ID0gJ3NhdmUnKSA9PiB7XG4gICAgc2V0U2F2aW5nKHRydWUpO1xuICAgIHNldEVycm9yKCcnKTtcbiAgICBzZXRNZW51T3BlbihmYWxzZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0UGFnZSh7XG4gICAgICAgIHBhZ2VOYW1lLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgZGF0YTogeyBjb250ZW50LCBpbnRlbnQgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBuZXh0RHJhZnRDb250ZW50ID0gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLmRyYWZ0RGF0YSA/PyByZXNwb25zZS5kYXRhLmRhdGEgPz8ge30pO1xuICAgICAgc2V0Q29udGVudChuZXh0RHJhZnRDb250ZW50KTtcbiAgICAgIHNldE9yaWdpbmFsQ29udGVudChjbG9uZVZhbHVlKG5leHREcmFmdENvbnRlbnQpKTtcbiAgICAgIHNldFB1Ymxpc2hlZENvbnRlbnQocmVzcG9uc2UuZGF0YS5wdWJsaXNoZWREYXRhID8gY2xvbmVWYWx1ZShyZXNwb25zZS5kYXRhLnB1Ymxpc2hlZERhdGEpIDogbnVsbCk7XG4gICAgICBpZiAoaW50ZW50ID09PSAndW5wdWJsaXNoJykge1xuICAgICAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgICB9XG4gICAgICBhZGROb3RpY2Uoe1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5kYXRhLm5vdGljZT8ubWVzc2FnZSA/PyBgJHtwYWdlTGFiZWx9IHNhdmVkLmAsXG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKHNhdmVFcnJvcikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHRvQWRtaW5FcnJvck1lc3NhZ2Uoc2F2ZUVycm9yLCAnRmFpbGVkIHRvIHNhdmUgdGhpcyBjb250ZW50IHBhZ2UuJyk7XG4gICAgICBzZXRFcnJvcihtZXNzYWdlKTtcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURpc2NhcmRDaGFuZ2VzID0gKCkgPT4ge1xuICAgIHNldENvbnRlbnQoZ2V0RW1wdHlJdGVtKGNvbnRlbnQpKTtcbiAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICB9O1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvcl9faW5uZXJcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWJhY2tcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gd2luZG93Lmhpc3RvcnkuYmFjaygpfT5cbiAgICAgICAgICAgIOKGkCBCYWNrXG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZXRhXCI+U2luZ2xlIFR5cGU8L2Rpdj5cbiAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLXRpdGxlXCI+e2VudHJ5VGl0bGV9PC9oMT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc3RhdHVzXCI+e3B1Ymxpc2hlZENvbnRlbnQgPyAnUHVibGlzaGVkJyA6ICdEcmFmdCd9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXRhYnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgYWRtaW4tdGFiJHthY3RpdmVUYWIgPT09ICdkcmFmdCcgPyAnIGFkbWluLXRhYi0tYWN0aXZlJyA6ICcnfWB9IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyl9PlxuICAgICAgICAgICAgICBEUkFGVFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXRhYiR7YWN0aXZlVGFiID09PSAncHVibGlzaGVkJyA/ICcgYWRtaW4tdGFiLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHB1Ymxpc2hlZENvbnRlbnQgJiYgc2V0QWN0aXZlVGFiKCdwdWJsaXNoZWQnKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUFVCTElTSEVEXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxheW91dFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tYWluLWNhcmRcIj5cbiAgICAgICAgICAgICAge3NlY3Rpb25zLm1hcCgoc2VjdGlvbiwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8Rm9ybVNlY3Rpb25cbiAgICAgICAgICAgICAgICAgIGtleT17YHNlY3Rpb24tJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgZW50cmllcz17c2VjdGlvbi5lbnRyaWVzfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIG9uQWRkSXRlbT17aGFuZGxlQWRkSXRlbX1cbiAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17aGFuZGxlUmVtb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgIG9uTW92ZUl0ZW09e2hhbmRsZU1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzUHVibGlzaGVkVmlld31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YXNpZGU+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2hlYWRcIj5FbnRyeTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2F2ZSgncHVibGlzaCcpfSBkaXNhYmxlZD17IWNhblB1Ymxpc2h9PlxuICAgICAgICAgICAgICAgICAgICAgIFB1Ymxpc2hcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IGFkbWluLXNpZGUtYnV0dG9uLS1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRNZW51T3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAg4oCmXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICB7bWVudU9wZW4gPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9e21lbnVSZWZ9IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSBhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2F2ZSgndW5wdWJsaXNoJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuVW5wdWJsaXNofVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uXCI+w5c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFVucHVibGlzaFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURpc2NhcmRDaGFuZ2VzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhbkRpc2NhcmR9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2ljb25cIj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgRGlzY2FyZCBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2F2ZSgnc2F2ZScpfSBkaXNhYmxlZD17IWNhblNhdmV9PlxuICAgICAgICAgICAgICAgICAgICB7c2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvYXNpZGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBMb2FkZXIsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgTUVESUFfUElDS0VSX0VWRU5UID0gJ2FkbWluanMtbWVkaWEtc2VsZWN0JztcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLW1lZGlhLXBhZ2Uge1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAyOHB4IDQwcHggNDhweCA0MHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiAxODYwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdG9wIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyOHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogM3JlbTtcbiAgbGluZS1oZWlnaHQ6IDMuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uLFxuLmFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeSxcbi5hZG1pbi1tZWRpYS1wYWdlX19pY29uLWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwIDFyZW07XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDk0NWZmO1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgcGFkZGluZzogMCAxLjI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyOHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhci1sZWZ0LFxuLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItcmlnaHQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zcXVhcmUsXG4uYWRtaW4tbWVkaWEtcGFnZV9faWNvbi1idXR0b24ge1xuICB3aWR0aDogMi41cmVtO1xuICBoZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3NlbGVjdCxcbi5hZG1pbi1tZWRpYS1wYWdlX19zZWFyY2gge1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHBhZGRpbmc6IDAgMXJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fc2VhcmNoIHtcbiAgbWluLXdpZHRoOiAyODBweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3NlbGVjdCB7XG4gIG1pbi13aWR0aDogMjY4cHg7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zZWN0aW9uLXRpdGxlIHtcbiAgbWFyZ2luOiAwIDAgMThweDtcbiAgZm9udC1zaXplOiAycmVtO1xuICBsaW5lLWhlaWdodDogMi41cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fY291bnQge1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLW1lZGlhLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgzMjBweCwgMWZyKSk7XG4gIGdhcDogMjRweDtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkOmhvdmVyIHtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDgpO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fcHJldmlldyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLWhlaWdodDogMjU2cHg7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGJhY2tncm91bmQ6XG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KSxcbiAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmNmY2ZjkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2Y2ZjZmOSA3NSUsICNmNmY2ZjkpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAsIDEycHggMTJweDtcbiAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19jaGVja2JveCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxNnB4O1xuICBsZWZ0OiAxNnB4O1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYzBjMGNmO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45Mik7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19pbWFnZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDIyNHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19ib2R5IHtcbiAgcGFkZGluZzogMTRweCAxOHB4IDE2cHg7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX190aXRsZS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX3RpdGxlIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX3R5cGUge1xuICBmbGV4OiAwIDAgYXV0bztcbiAgbWluLWhlaWdodDogMnJlbTtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fbWV0YSB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fYmFjayB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxZnIpIDM2MHB4O1xuICBnYXA6IDI0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX3ByZXZpZXcsXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fcHJldmlldyB7XG4gIHBhZGRpbmc6IDI0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDYyMHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6XG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KSxcbiAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmNmY2ZjkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2Y2ZjZmOSA3NSUsICNmNmY2ZjkpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAsIDEycHggMTJweDtcbiAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2ltYWdlIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiA1ODBweDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fc2lkZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTZweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keSB7XG4gIHBhZGRpbmc6IDAgMTZweCAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZCArIC5hZG1pbi1tZWRpYS1kZXRhaWxfX2ZpZWxkIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9faW5wdXQsXG4uYWRtaW4tbWVkaWEtZGV0YWlsX190ZXh0YXJlYSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fdGV4dGFyZWEge1xuICBtaW4taGVpZ2h0OiA2cmVtO1xuICByZXNpemU6IG5vbmU7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtbGlzdCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTJweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleSB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlIHtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDEwODBweCkge1xuICAuYWRtaW4tbWVkaWEtZGV0YWlsX19sYXlvdXQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAuYWRtaW4tbWVkaWEtcGFnZSB7XG4gICAgcGFkZGluZzogMjBweCAxNnB4IDQwcHggNzJweDtcbiAgfVxuXG4gIC5hZG1pbi1tZWRpYS1wYWdlX190b3AsXG4gIC5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICB9XG5cbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItbGVmdCxcbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItcmlnaHQsXG4gIC5hZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zIHtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gIH1cblxuICAuYWRtaW4tbWVkaWEtcGFnZV9fc2VhcmNoLFxuICAuYWRtaW4tbWVkaWEtcGFnZV9fc2VsZWN0IHtcbiAgICBtaW4td2lkdGg6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIGJ1aWxkUGFnZVBhdGgocGF0aG5hbWUsIHBhcmFtcykge1xuICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgT2JqZWN0LmVudHJpZXMocGFyYW1zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgIHNlYXJjaFBhcmFtcy5zZXQoa2V5LCBTdHJpbmcodmFsdWUpKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gIHJldHVybiBgJHtwYXRobmFtZX0ke3F1ZXJ5U3RyaW5nID8gYD8ke3F1ZXJ5U3RyaW5nfWAgOiAnJ31gO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0TWVkaWEocXVlcnkgPSB7fSkge1xuICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FkbWluL2FwaS9wYWdlcy9tZWRpYS1saWJyYXJ5JHtzZWFyY2hQYXJhbXMudG9TdHJpbmcoKSA/IGA/JHtzZWFyY2hQYXJhbXMudG9TdHJpbmcoKX1gIDogJyd9YCwge1xuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcbiAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQubWVzc2FnZSA/PyAnRmFpbGVkIHRvIGxvYWQgbWVkaWEuJyk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkQWRtaW5JbWFnZShmaWxlKSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvbWVkaWEvdXBsb2FkJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvciB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5mdW5jdGlvbiBBc3NldENhcmQoeyBpdGVtLCBvbk9wZW4sIHBpY2tlck1vZGUgfSkge1xuICByZXR1cm4gKFxuICAgIDxhcnRpY2xlIGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRcIiBvbkNsaWNrPXsoKSA9PiBvbk9wZW4oaXRlbSl9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19wcmV2aWV3XCI+XG4gICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9faW1hZ2VcIiBzcmM9e2l0ZW0udGh1bWJuYWlsVXJsIHx8IGl0ZW0udXJsfSBhbHQ9e2l0ZW0uYWx0ZXJuYXRpdmVUZXh0IHx8IGl0ZW0ubmFtZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19ib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fdGl0bGUtcm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX190aXRsZVwiPntpdGVtLm5hbWV9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX190eXBlXCI+e2l0ZW0ubWltZS5zdGFydHNXaXRoKCdpbWFnZS8nKSA/ICdJTUFHRScgOiBpdGVtLmV4dC5yZXBsYWNlKCcuJywgJycpLnRvVXBwZXJDYXNlKCl9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX21ldGFcIj5cbiAgICAgICAgICB7aXRlbS5leHQucmVwbGFjZSgnLicsICcnKS50b1VwcGVyQ2FzZSgpfSAtIHtpdGVtLndpZHRofcOXe2l0ZW0uaGVpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3BpY2tlck1vZGUgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19tZXRhXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiA4LCBjb2xvcjogJyM0OTQ1ZmYnLCBmb250V2VpZ2h0OiA3MDAgfX0+XG4gICAgICAgICAgICBVc2UgdGhpcyBhc3NldFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRGV0YWlsVmlldyh7IGl0ZW0sIG9uQmFjaywgb25TZWxlY3QsIHBpY2tlck1vZGUgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fYmFja1wiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkJhY2t9PlxuICAgICAgICDihpAgQmFja1xuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdG9wXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAyNCB9fT5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3RpdGxlXCIgc3R5bGU9e3sgZm9udFNpemU6ICcyLjI1cmVtJywgbGluZUhlaWdodDogJzIuNzVyZW0nIH19PntpdGVtLm5hbWV9PC9oMT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zXCI+XG4gICAgICAgICAge3BpY2tlck1vZGUgPyAoXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdChpdGVtKX0+XG4gICAgICAgICAgICAgIFVzZSB0aGlzIGFzc2V0XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbihpdGVtLnVybCwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyl9PlxuICAgICAgICAgICAgT3BlbiBhc3NldFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbGF5b3V0XCI+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fcHJldmlld1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYW52YXNcIj5cbiAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19pbWFnZVwiIHNyYz17aXRlbS51cmx9IGFsdD17aXRlbS5hbHRlcm5hdGl2ZVRleHQgfHwgaXRlbS5uYW1lfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgPGFzaWRlIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fc2lkZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1oZWFkXCI+RGV0YWlsczwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19sYWJlbFwiPkZpbGUgbmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9faW5wdXRcIiB2YWx1ZT17aXRlbS5uYW1lIHx8ICcnfSBkaXNhYmxlZCByZWFkT25seSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2ZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbGFiZWxcIj5BbHRlcm5hdGl2ZSB0ZXh0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19pbnB1dFwiIHZhbHVlPXtpdGVtLmFsdGVybmF0aXZlVGV4dCB8fCAnJ30gZGlzYWJsZWQgcmVhZE9ubHkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2xhYmVsXCI+Q2FwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fdGV4dGFyZWFcIiB2YWx1ZT17aXRlbS5jYXB0aW9uIHx8ICcnfSBkaXNhYmxlZCByZWFkT25seSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWhlYWRcIj5NZXRhZGF0YTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1saXN0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPkRpbWVuc2lvbnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS53aWR0aH0gw5cge2l0ZW0uaGVpZ2h0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+U2l6ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLnNpemVMYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPlR5cGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5taW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+UHJvdmlkZXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5wcm92aWRlciB8fCAnbG9jYWwnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+Rm9sZGVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0uZm9sZGVyUGF0aCB8fCAnLyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5VcGRhdGVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0udXBkYXRlZEF0TGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5DcmVhdGVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0uY3JlYXRlZEF0TGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5Eb2N1bWVudCBJRDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLmRvY3VtZW50SWR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2FzaWRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1lZGlhTGlicmFyeSgpIHtcbiAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IHF1ZXJ5ID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCksIFtsb2NhdGlvbi5zZWFyY2hdKTtcbiAgY29uc3Qgc2VhcmNoID0gcXVlcnkuZ2V0KCdzZWFyY2gnKSB8fCAnJztcbiAgY29uc3QgZmlsZUlkID0gcXVlcnkuZ2V0KCdmaWxlSWQnKSB8fCAnJztcbiAgY29uc3QgcGlja2VyTW9kZSA9IHF1ZXJ5LmdldCgncGlja2VyJykgPT09ICcxJztcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2NvdW50LCBzZXRDb3VudF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2l0ZW0sIHNldEl0ZW1dID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRpbmcsIHNldFVwbG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYWN0aXZlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3IoJycpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVxdWVzdE1lZGlhKGZpbGVJZCA/IHsgZmlsZUlkIH0gOiB7IHNlYXJjaCB9KTtcblxuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEl0ZW1zKHBheWxvYWQuaXRlbXMgPz8gW10pO1xuICAgICAgICBzZXRDb3VudChwYXlsb2FkLmNvdW50ID8/IDApO1xuICAgICAgICBzZXRJdGVtKHBheWxvYWQuaXRlbSA/PyBudWxsKTtcbiAgICAgIH0gY2F0Y2ggKGxvYWRFcnJvcikge1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yKGxvYWRFcnJvci5tZXNzYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW2ZpbGVJZCwgc2VhcmNoXSk7XG5cbiAgY29uc3Qgb3Blbkxpc3QgPSAobmV4dFNlYXJjaCA9IHNlYXJjaCkgPT4ge1xuICAgIG5hdmlnYXRlKGJ1aWxkUGFnZVBhdGgoJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5Jywge1xuICAgICAgLi4uKG5leHRTZWFyY2ggPyB7IHNlYXJjaDogbmV4dFNlYXJjaCB9IDoge30pLFxuICAgICAgLi4uKHBpY2tlck1vZGUgPyB7IHBpY2tlcjogMSB9IDoge30pLFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBzZWxlY3RBc3NldCA9IChzZWxlY3RlZEl0ZW0pID0+IHtcbiAgICBpZiAoIXBpY2tlck1vZGUpIHtcbiAgICAgIG5hdmlnYXRlKGJ1aWxkUGFnZVBhdGgoJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5JywgeyBmaWxlSWQ6IHNlbGVjdGVkSXRlbS5pZCB9KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5vcGVuZXIpIHtcbiAgICAgIHdpbmRvdy5vcGVuZXIucG9zdE1lc3NhZ2UoXG4gICAgICAgIHsgdHlwZTogTUVESUFfUElDS0VSX0VWRU5ULCB1cmw6IHNlbGVjdGVkSXRlbS5yZWxhdGl2ZVVybCB8fCBzZWxlY3RlZEl0ZW0udXJsIHx8ICcnIH0sXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICApO1xuICAgIH1cblxuICAgIHdpbmRvdy5jbG9zZSgpO1xuICB9O1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19pbm5lclwiPlxuICAgICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICB7ZmlsZUlkICYmIGl0ZW0gPyAoXG4gICAgICAgICAgICA8RGV0YWlsVmlldyBpdGVtPXtpdGVtfSBvbkJhY2s9eygpID0+IG9wZW5MaXN0KCl9IG9uU2VsZWN0PXtzZWxlY3RBc3NldH0gcGlja2VyTW9kZT17cGlja2VyTW9kZX0gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b3BcIj5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdGl0bGVcIj57cGlja2VyTW9kZSA/ICdDaG9vc2UgTWVkaWEnIDogJ01lZGlhIExpYnJhcnknfTwvaDE+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dXBsb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnR5cGUgPSAnZmlsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYWNjZXB0ID0gJ2ltYWdlLyonO1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0Lm11bHRpcGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5vbmNoYW5nZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShpbnB1dC5maWxlcyA/PyBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEVycm9yKCcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdXBsb2FkQWRtaW5JbWFnZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZnJlc2hlZFBheWxvYWQgPSBhd2FpdCByZXF1ZXN0TWVkaWEoc2VhcmNoID8geyBzZWFyY2ggfSA6IHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXRlbXMocmVmcmVzaGVkUGF5bG9hZC5pdGVtcyA/PyBbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvdW50KHJlZnJlc2hlZFBheWxvYWQuY291bnQgPz8gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICh1cGxvYWRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcih1cGxvYWRFcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7dXBsb2FkaW5nID8gJ1VwbG9hZGluZy4uLicgOiAnKyBBZGQgbmV3IGFzc2V0cyd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b29sYmFyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fc2VsZWN0XCIgZGVmYXVsdFZhbHVlPVwicmVjZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZWNlbnRcIj5Nb3N0IHJlY2VudCB1cGxvYWRzPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPkZpbHRlcnM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19zZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvcGVuTGlzdChldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBhc3NldHNcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3NlY3Rpb24tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICBBc3NldHMgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fY291bnRcIj4oe2NvdW50fSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1ncmlkXCI+XG4gICAgICAgICAgICAgICAge2l0ZW1zLm1hcCgobWVkaWFJdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8QXNzZXRDYXJkXG4gICAgICAgICAgICAgICAgICAgIGtleT17bWVkaWFJdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgICBpdGVtPXttZWRpYUl0ZW19XG4gICAgICAgICAgICAgICAgICAgIHBpY2tlck1vZGU9e3BpY2tlck1vZGV9XG4gICAgICAgICAgICAgICAgICAgIG9uT3Blbj17cGlja2VyTW9kZSA/IHNlbGVjdEFzc2V0IDogKG5leHRJdGVtKSA9PiBuYXZpZ2F0ZShidWlsZFBhZ2VQYXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScsIHsgZmlsZUlkOiBuZXh0SXRlbS5pZCB9KSl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExvYWRlciwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tYWNjb3VudC1wYWdlIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMzJweCA0MHB4IDY0cHggNDBweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1hY2NvdW50LXBhZ2VfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiA3NjBweDtcbn1cblxuLmFkbWluLWFjY291bnQtcGFnZV9fZXllYnJvdyB7XG4gIG1hcmdpbjogMCAwIDRweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG59XG5cbi5hZG1pbi1hY2NvdW50LXBhZ2VfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tYWNjb3VudC1wYWdlX19zdWJ0aXRsZSB7XG4gIG1hcmdpbjogMTBweCAwIDI4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG59XG5cbi5hZG1pbi1hY2NvdW50LWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xuICBwYWRkaW5nOiAyNHB4O1xufVxuXG4uYWRtaW4tYWNjb3VudC1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICBnYXA6IDE2cHg7XG59XG5cbi5hZG1pbi1hY2NvdW50LWZpZWxkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5hZG1pbi1hY2NvdW50LWZpZWxkLS1mdWxsIHtcbiAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcbn1cblxuLmFkbWluLWFjY291bnQtbGFiZWwge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmFkbWluLWFjY291bnQtaW5wdXQge1xuICBtaW4taGVpZ2h0OiAyLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwIDAuODc1cmVtO1xuICBmb250LXNpemU6IDAuOTM3NXJlbTtcbn1cblxuLmFkbWluLWFjY291bnQtaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1hY2NvdW50LWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luLXRvcDogMjRweDtcbn1cblxuLmFkbWluLWFjY291bnQtaGludCB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLmFkbWluLWFjY291bnQtYnV0dG9uLFxuLmFkbWluLWFjY291bnQtYnV0dG9uLS1wcmltYXJ5LFxuLmFkbWluLWFjY291bnQtYnV0dG9uLS1naG9zdCB7XG4gIG1pbi1oZWlnaHQ6IDIuNzVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAwLjkzNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDAgMXJlbTtcbn1cblxuLmFkbWluLWFjY291bnQtYnV0dG9uIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1hY2NvdW50LWJ1dHRvbi0tcHJpbWFyeSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0OTQ1ZmY7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tYWNjb3VudC1idXR0b24tLWdob3N0IHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIHBhZGRpbmc6IDA7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAuYWRtaW4tYWNjb3VudC1wYWdlIHtcbiAgICBwYWRkaW5nOiAyMHB4IDE2cHggNDhweDtcbiAgfVxuXG4gIC5hZG1pbi1hY2NvdW50LWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5gO1xuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0QWNjb3VudChtZXRob2QgPSAnR0VUJywgcGF5bG9hZCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL3BhZ2VzL2FjY291bnQnLCB7XG4gICAgbWV0aG9kLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgIGhlYWRlcnM6IHBheWxvYWQgPyB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSA6IHVuZGVmaW5lZCxcbiAgICBib2R5OiBwYXlsb2FkID8gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkgOiB1bmRlZmluZWQsXG4gIH0pO1xuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihkYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGRhdGUgYWNjb3VudC4nKTtcbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBY2NvdW50U2V0dGluZ3MoKSB7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc3VibWl0dGluZywgc2V0U3VibWl0dGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtlbWFpbCwgc2V0RW1haWxdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbY3VycmVudFBhc3N3b3JkLCBzZXRDdXJyZW50UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3UGFzc3dvcmQsIHNldE5ld1Bhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2NvbmZpcm1QYXNzd29yZCwgc2V0Q29uZmlybVBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBhY3RpdmUgPSB0cnVlO1xuXG4gICAgcmVxdWVzdEFjY291bnQoKVxuICAgICAgLnRoZW4oKHBheWxvYWQpID0+IHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFbWFpbChwYXlsb2FkLmVtYWlsIHx8ICcnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGxvYWRFcnJvcikgPT4ge1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yKGxvYWRFcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9uU3VibWl0ID0gYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgc2V0U3VjY2VzcygnJyk7XG5cbiAgICBpZiAoIWN1cnJlbnRQYXNzd29yZCkge1xuICAgICAgc2V0RXJyb3IoJ0N1cnJlbnQgcGFzc3dvcmQgaXMgcmVxdWlyZWQuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5ld1Bhc3N3b3JkICYmIG5ld1Bhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpIHtcbiAgICAgIHNldEVycm9yKCdOZXcgcGFzc3dvcmQgY29uZmlybWF0aW9uIGRvZXMgbm90IG1hdGNoLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFN1Ym1pdHRpbmcodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RBY2NvdW50KCdQT1NUJywge1xuICAgICAgICBlbWFpbCxcbiAgICAgICAgY3VycmVudFBhc3N3b3JkLFxuICAgICAgICBuZXdQYXNzd29yZCxcbiAgICAgIH0pO1xuXG4gICAgICBzZXRTdWNjZXNzKHBheWxvYWQubWVzc2FnZSB8fCAnQWNjb3VudCB1cGRhdGVkLiBTaWduIGluIGFnYWluLicpO1xuICAgICAgc2V0Q3VycmVudFBhc3N3b3JkKCcnKTtcbiAgICAgIHNldE5ld1Bhc3N3b3JkKCcnKTtcbiAgICAgIHNldENvbmZpcm1QYXNzd29yZCgnJyk7XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbignL2FkbWluL2xvZ291dCcpO1xuICAgICAgfSwgOTAwKTtcbiAgICB9IGNhdGNoIChzdWJtaXRFcnJvcikge1xuICAgICAgc2V0RXJyb3Ioc3VibWl0RXJyb3IubWVzc2FnZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFN1Ym1pdHRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LXBhZ2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LXBhZ2VfX2lubmVyXCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1wYWdlX19leWVicm93XCI+QWNjb3VudDwvcD5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1wYWdlX190aXRsZVwiPkFjY291bnQgc2V0dGluZ3M8L2gxPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtcGFnZV9fc3VidGl0bGVcIj5cbiAgICAgICAgICAgIFVwZGF0ZSB0aGUgYWRtaW4gZW1haWwgYWRkcmVzcyBvciBwYXNzd29yZCB1c2VkIHRvIHNpZ24gaW4uXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAge2Vycm9yID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiIG1iPVwibGdcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG4gICAgICAgICAge3N1Y2Nlc3MgPyA8TWVzc2FnZUJveCB2YXJpYW50PVwic3VjY2Vzc1wiIG1iPVwibGdcIj57c3VjY2Vzc308L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtY2FyZFwiIG9uU3VibWl0PXtvblN1Ym1pdH0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtZ3JpZFwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1maWVsZCBhZG1pbi1hY2NvdW50LWZpZWxkLS1mdWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1sYWJlbFwiPkVtYWlsPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0RW1haWwoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWZpZWxkIGFkbWluLWFjY291bnQtZmllbGQtLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWxhYmVsXCI+Q3VycmVudCBwYXNzd29yZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjdXJyZW50UGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRDdXJyZW50UGFzc3dvcmQoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImN1cnJlbnQtcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWxhYmVsXCI+TmV3IHBhc3N3b3JkPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1Bhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0TmV3UGFzc3dvcmQoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtbGFiZWxcIj5Db25maXJtIG5ldyBwYXNzd29yZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maXJtUGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRDb25maXJtUGFzc3dvcmQoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFjY291bnQtaGludFwiPlxuICAgICAgICAgICAgICAgIFNhdmluZyBhY2NvdW50IGNoYW5nZXMgc2lnbnMgdGhlIGN1cnJlbnQgc2Vzc2lvbiBvdXQuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAxMiwgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tYWNjb3VudC1idXR0b24tLWdob3N0XCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gd2luZG93LmxvY2F0aW9uLmFzc2lnbignL2FkbWluL2xvZ291dCcpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFNpZ24gb3V0XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1hY2NvdW50LWJ1dHRvbi0tcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD17c3VibWl0dGluZ30+XG4gICAgICAgICAgICAgICAgICB7c3VibWl0dGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgYWNjb3VudCd9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5yZWZ1bmQtcGFnZSB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDQwcHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiAxMjQwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2V5ZWJyb3cge1xuICBtYXJnaW46IDAgMCA0cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xufVxuXG4ucmVmdW5kLXBhZ2VfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4ucmVmdW5kLXBhZ2VfX3N1YnRpdGxlIHtcbiAgbWFyZ2luOiAxMHB4IDAgMjhweDtcbiAgbWF4LXdpZHRoOiA3ODBweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuLnJlZnVuZC1wYWdlX190YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAwO1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2RjZGNlNDtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbn1cblxuLnJlZnVuZC1wYWdlX190YWIge1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgbWFyZ2luLWJvdHRvbTogLTJweDtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMsIGJvcmRlci1jb2xvciAwLjE1cztcbn1cblxuLnJlZnVuZC1wYWdlX190YWI6aG92ZXIge1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLnJlZnVuZC1wYWdlX190YWItLWFjdGl2ZSB7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBib3JkZXItYm90dG9tLWNvbG9yOiAjNDk0NWZmO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2JhZGdlIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtaW4td2lkdGg6IDE4cHg7XG4gIGhlaWdodDogMThweDtcbiAgcGFkZGluZzogMCA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgZm9udC1zaXplOiAwLjY4NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZDogI2M3MmUzYTtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLnJlZnVuZC1wYWdlX19iYWRnZS0tbXV0ZWQge1xuICBiYWNrZ3JvdW5kOiAjOGU4ZWE5O1xufVxuXG4ucmVmdW5kLXBhZ2VfX3RhYmxlLXdyYXAge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIG92ZXJmbG93LXg6IGF1dG87XG59XG5cbi5yZWZ1bmQtcGFnZV9fdGFibGUge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuLnJlZnVuZC1wYWdlX190YWJsZSB0aCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzY2NjY4NztcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYWViZjA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5yZWZ1bmQtcGFnZV9fdGFibGUgdGQge1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLnJlZnVuZC1wYWdlX190YWJsZSB0cjpsYXN0LWNoaWxkIHRkIHtcbiAgYm9yZGVyLWJvdHRvbTogMDtcbn1cblxuLnJlZnVuZC1wYWdlX190YWJsZSB0cjpob3ZlciB0ZCB7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG59XG5cbi5yZWZ1bmQtcGFnZV9fbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5yZWZ1bmQtcGFnZV9fZW1haWwge1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGNvbG9yOiAjNjY2Njg3O1xufVxuXG4ucmVmdW5kLXBhZ2VfX2Ftb3VudCB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzI4MDQ4O1xufVxuXG4ucmVmdW5kLXBhZ2VfX3N0YXR1cy1iYWRnZSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAzcHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLnJlZnVuZC1wYWdlX19zdGF0dXMtYmFkZ2UtLXBlbmRpbmcge1xuICBiYWNrZ3JvdW5kOiAjZmVmM2NkO1xuICBjb2xvcjogIzg1NjQwNDtcbn1cblxuLnJlZnVuZC1wYWdlX19zdGF0dXMtYmFkZ2UtLWFwcHJvdmVkIHtcbiAgYmFja2dyb3VuZDogI2Q0ZWRkYTtcbiAgY29sb3I6ICMxNTU3MjQ7XG59XG5cbi5yZWZ1bmQtcGFnZV9fc3RhdHVzLWJhZGdlLS1yZWplY3RlZCB7XG4gIGJhY2tncm91bmQ6ICNmOGQ3ZGE7XG4gIGNvbG9yOiAjNzIxYzI0O1xufVxuXG4ucmVmdW5kLXBhZ2VfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDZweDtcbn1cblxuLnJlZnVuZC1wYWdlX19idG4ge1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDlkOGU2O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2J0bjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5yZWZ1bmQtcGFnZV9fYnRuOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC41O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2J0bi0tYXBwcm92ZSB7XG4gIGJvcmRlci1jb2xvcjogI2MzZTZjYjtcbiAgY29sb3I6ICMxZTdhMzM7XG59XG5cbi5yZWZ1bmQtcGFnZV9fYnRuLS1hcHByb3ZlOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2YwZmFmMztcbn1cblxuLnJlZnVuZC1wYWdlX19idG4tLXJlamVjdCB7XG4gIGJvcmRlci1jb2xvcjogI2ZmZDNjNztcbiAgY29sb3I6ICNjNzJlM2E7XG59XG5cbi5yZWZ1bmQtcGFnZV9fYnRuLS1yZWplY3Q6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZmZmNWYyO1xufVxuXG4ucmVmdW5kLXBhZ2VfX2VtcHR5IHtcbiAgcGFkZGluZzogNDBweCAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuOTM3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuLnJlZnVuZC1wYWdlX19lcnJvciB7XG4gIGNvbG9yOiAjYzcyZTNhO1xuICBtYXJnaW46IDEycHggMCAwO1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG59XG5cbi5yZWZ1bmQtcGFnZV9fc3VjY2VzcyB7XG4gIGNvbG9yOiAjMzI4MDQ4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5yZWZ1bmQtcGFnZV9fbG9hZGluZyB7XG4gIHBhZGRpbmc6IDQwcHggMjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5yZWZ1bmQtcGFnZSB7XG4gICAgcGFkZGluZzogMjBweCAxNnB4IDQ4cHg7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIGNvZXJjZUpzb24ocmVzcG9uc2VUZXh0KSB7XG4gIGlmICghcmVzcG9uc2VUZXh0KSByZXR1cm4gbnVsbDtcbiAgdHJ5IHsgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTsgfSBjYXRjaCB7IHJldHVybiBudWxsOyB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQWRtaW5Kc29uKHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgLi4ub3B0aW9ucyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIC4uLihvcHRpb25zLmhlYWRlcnMgfHwge30pIH0sXG4gIH0pO1xuICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gIGNvbnN0IHBheWxvYWQgPSBjb2VyY2VKc29uKHJlc3BvbnNlVGV4dCk7XG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCBtZXNzYWdlID0gcGF5bG9hZD8uZXJyb3IgfHwgcGF5bG9hZD8ubWVzc2FnZSB8fCByZXNwb25zZVRleHQgfHwgYFJlcXVlc3QgZmFpbGVkICgke3Jlc3BvbnNlLnN0YXR1c30pLmA7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRCb29raW5nRGF0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gJy0nO1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICBpZiAoTnVtYmVyLmlzTmFOKGRhdGUuZ2V0VGltZSgpKSkgcmV0dXJuICctJztcbiAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1HQicsIHtcbiAgICB3ZWVrZGF5OiAnc2hvcnQnLFxuICAgIGRheTogJ251bWVyaWMnLFxuICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgbWludXRlOiAnMi1kaWdpdCcsXG4gIH0pLmZvcm1hdChkYXRlKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0Q3VycmVuY3koYW1vdW50TWlub3IsIGN1cnJlbmN5ID0gJ2dicCcpIHtcbiAgY29uc3QgdmFsdWUgPSBOdW1iZXIoYW1vdW50TWlub3IgfHwgMCkgLyAxMDA7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tR0InLCB7XG4gICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgIGN1cnJlbmN5OiBTdHJpbmcoY3VycmVuY3kgfHwgJ2dicCcpLnRvVXBwZXJDYXNlKCksXG4gICAgfSkuZm9ybWF0KHZhbHVlKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGBcXHUwMEEzJHt2YWx1ZS50b0ZpeGVkKDIpfWA7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZUFnbyh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gJy0nO1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICBpZiAoTnVtYmVyLmlzTmFOKGRhdGUuZ2V0VGltZSgpKSkgcmV0dXJuICctJztcbiAgY29uc3QgZGlmZiA9IERhdGUubm93KCkgLSBkYXRlLmdldFRpbWUoKTtcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoZGlmZiAvIDYwXzAwMCk7XG4gIGlmIChtaW51dGVzIDwgMSkgcmV0dXJuICdqdXN0IG5vdyc7XG4gIGlmIChtaW51dGVzIDwgNjApIHJldHVybiBgJHttaW51dGVzfW0gYWdvYDtcbiAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgLyA2MCk7XG4gIGlmIChob3VycyA8IDI0KSByZXR1cm4gYCR7aG91cnN9aCBhZ29gO1xuICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihob3VycyAvIDI0KTtcbiAgaWYgKGRheXMgPCAzMCkgcmV0dXJuIGAke2RheXN9ZCBhZ29gO1xuICByZXR1cm4gZm9ybWF0Qm9va2luZ0RhdGUodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZWZ1bmRSZXF1ZXN0cygpIHtcbiAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IHVzZVN0YXRlKCdwZW5kaW5nJyk7XG4gIGNvbnN0IFtwZW5kaW5nUmVxdWVzdHMsIHNldFBlbmRpbmdSZXF1ZXN0c10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtwcm9jZXNzZWRSZXF1ZXN0cywgc2V0UHJvY2Vzc2VkUmVxdWVzdHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3Byb2Nlc3NpbmdJZCwgc2V0UHJvY2Vzc2luZ0lkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3N1Y2Nlc3NNYXAsIHNldFN1Y2Nlc3NNYXBdID0gdXNlU3RhdGUoe30pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzQWN0aXZlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgW3BlbmRpbmdQYXlsb2FkLCBwcm9jZXNzZWRQYXlsb2FkXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICBmZXRjaEFkbWluSnNvbignL2FkbWluL2FwaS9hZG1pbi9ib29raW5ncy9yZWZ1bmQtcmVxdWVzdHMnKSxcbiAgICAgICAgICBmZXRjaEFkbWluSnNvbignL2FkbWluL2FwaS9hZG1pbi9ib29raW5ncy9yZWZ1bmQtcmVxdWVzdHM/c3RhdHVzPXByb2Nlc3NlZCcpLFxuICAgICAgICBdKTtcbiAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgc2V0UGVuZGluZ1JlcXVlc3RzKEFycmF5LmlzQXJyYXkocGVuZGluZ1BheWxvYWQ/LmRhdGEpID8gcGVuZGluZ1BheWxvYWQuZGF0YSA6IFtdKTtcbiAgICAgICAgICBzZXRQcm9jZXNzZWRSZXF1ZXN0cyhBcnJheS5pc0FycmF5KHByb2Nlc3NlZFBheWxvYWQ/LmRhdGEpID8gcHJvY2Vzc2VkUGF5bG9hZC5kYXRhIDogW10pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gcHJvY2Vzc2VkIGVuZHBvaW50IG1heSBub3QgZXhpc3QgeWV0LCBqdXN0IGxvYWQgcGVuZGluZ1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHBlbmRpbmdQYXlsb2FkID0gYXdhaXQgZmV0Y2hBZG1pbkpzb24oJy9hZG1pbi9hcGkvYWRtaW4vYm9va2luZ3MvcmVmdW5kLXJlcXVlc3RzJyk7XG4gICAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgICBzZXRQZW5kaW5nUmVxdWVzdHMoQXJyYXkuaXNBcnJheShwZW5kaW5nUGF5bG9hZD8uZGF0YSkgPyBwZW5kaW5nUGF5bG9hZC5kYXRhIDogW10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoaW5uZXJFcnIpIHtcbiAgICAgICAgICBpZiAoaXNBY3RpdmUpIHNldEVycm9yKGlubmVyRXJyPy5tZXNzYWdlIHx8ICdVbmFibGUgdG8gbG9hZCByZWZ1bmQgcmVxdWVzdHMuJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChpc0FjdGl2ZSkgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWQoKTtcbiAgICByZXR1cm4gKCkgPT4geyBpc0FjdGl2ZSA9IGZhbHNlOyB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlQXBwcm92ZSA9IGFzeW5jIChyZXF1ZXN0KSA9PiB7XG4gICAgaWYgKCFyZXF1ZXN0Py5pZCkgcmV0dXJuO1xuICAgIGNvbnN0IHRhcmdldElkID0gTnVtYmVyKHJlcXVlc3QuaWQpO1xuICAgIHNldFByb2Nlc3NpbmdJZCh0YXJnZXRJZCk7XG4gICAgc2V0RXJyb3IoJycpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZldGNoQWRtaW5Kc29uKGAvYWRtaW4vYXBpL2FkbWluL2Jvb2tpbmdzLyR7dGFyZ2V0SWR9L2FwcHJvdmUtcmVmdW5kYCwgeyBtZXRob2Q6ICdQT1NUJyB9KTtcbiAgICAgIHNldFN1Y2Nlc3NNYXAoKHByZXYpID0+ICh7IC4uLnByZXYsIFt0YXJnZXRJZF06ICdhcHByb3ZlZCcgfSkpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNldFBlbmRpbmdSZXF1ZXN0cygocHJldikgPT4gcHJldi5maWx0ZXIoKHIpID0+IHIuaWQgIT09IHRhcmdldElkKSk7XG4gICAgICAgIHNldFByb2Nlc3NlZFJlcXVlc3RzKChwcmV2KSA9PiBbeyAuLi5yZXF1ZXN0LCByZWZ1bmRSZXF1ZXN0U3RhdHVzOiAnYXBwcm92ZWQnIH0sIC4uLnByZXZdKTtcbiAgICAgICAgc2V0U3VjY2Vzc01hcCgocHJldikgPT4geyBjb25zdCBuZXh0ID0geyAuLi5wcmV2IH07IGRlbGV0ZSBuZXh0W3RhcmdldElkXTsgcmV0dXJuIG5leHQ7IH0pO1xuICAgICAgfSwgMTIwMCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcihlcnI/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byBhcHByb3ZlIHJlZnVuZC4nKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UHJvY2Vzc2luZ0lkKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZWplY3QgPSBhc3luYyAocmVxdWVzdCkgPT4ge1xuICAgIGlmICghcmVxdWVzdD8uaWQpIHJldHVybjtcbiAgICBjb25zdCB0YXJnZXRJZCA9IE51bWJlcihyZXF1ZXN0LmlkKTtcbiAgICBzZXRQcm9jZXNzaW5nSWQodGFyZ2V0SWQpO1xuICAgIHNldEVycm9yKCcnKTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBmZXRjaEFkbWluSnNvbihgL2FkbWluL2FwaS9hZG1pbi9ib29raW5ncy8ke3RhcmdldElkfS9yZWplY3QtcmVmdW5kYCwgeyBtZXRob2Q6ICdQT1NUJyB9KTtcbiAgICAgIHNldFN1Y2Nlc3NNYXAoKHByZXYpID0+ICh7IC4uLnByZXYsIFt0YXJnZXRJZF06ICdyZWplY3RlZCcgfSkpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNldFBlbmRpbmdSZXF1ZXN0cygocHJldikgPT4gcHJldi5maWx0ZXIoKHIpID0+IHIuaWQgIT09IHRhcmdldElkKSk7XG4gICAgICAgIHNldFByb2Nlc3NlZFJlcXVlc3RzKChwcmV2KSA9PiBbeyAuLi5yZXF1ZXN0LCByZWZ1bmRSZXF1ZXN0U3RhdHVzOiAncmVqZWN0ZWQnIH0sIC4uLnByZXZdKTtcbiAgICAgICAgc2V0U3VjY2Vzc01hcCgocHJldikgPT4geyBjb25zdCBuZXh0ID0geyAuLi5wcmV2IH07IGRlbGV0ZSBuZXh0W3RhcmdldElkXTsgcmV0dXJuIG5leHQ7IH0pO1xuICAgICAgfSwgMTIwMCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcihlcnI/Lm1lc3NhZ2UgfHwgJ1VuYWJsZSB0byByZWplY3QgcmVmdW5kIHJlcXVlc3QuJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFByb2Nlc3NpbmdJZChudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWN0aXZlTGlzdCA9IHRhYiA9PT0gJ3BlbmRpbmcnID8gcGVuZGluZ1JlcXVlc3RzIDogcHJvY2Vzc2VkUmVxdWVzdHM7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9faW5uZXJcIj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9fZXllYnJvd1wiPk9wZXJhdGlvbnM8L3A+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX190aXRsZVwiPlJlZnVuZCBSZXF1ZXN0czwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VfX3N1YnRpdGxlXCI+XG4gICAgICAgICAgICBSZXZpZXcgYW5kIG1hbmFnZSByZWZ1bmQgcmVxdWVzdHMgZnJvbSBtZW1iZXJzIGZvciBtZWV0aW5nIHJvb20gYm9va2luZ3MgYW5kIG1lbWJlcnNoaXBzLlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VfX3RhYnNcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlZnVuZC1wYWdlX190YWIke3RhYiA9PT0gJ3BlbmRpbmcnID8gJyByZWZ1bmQtcGFnZV9fdGFiLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGFiKCdwZW5kaW5nJyl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFBlbmRpbmdcbiAgICAgICAgICAgICAge3BlbmRpbmdSZXF1ZXN0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9fYmFkZ2VcIj57cGVuZGluZ1JlcXVlc3RzLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlZnVuZC1wYWdlX190YWIke3RhYiA9PT0gJ3Byb2Nlc3NlZCcgPyAnIHJlZnVuZC1wYWdlX190YWItLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ3Byb2Nlc3NlZCcpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQcm9jZXNzZWRcbiAgICAgICAgICAgICAge3Byb2Nlc3NlZFJlcXVlc3RzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19iYWRnZSByZWZ1bmQtcGFnZV9fYmFkZ2UtLW11dGVkXCI+e3Byb2Nlc3NlZFJlcXVlc3RzLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtsb2FkaW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9fbG9hZGluZ1wiPkxvYWRpbmcgcmVmdW5kIHJlcXVlc3RzLi4uPC9kaXY+XG4gICAgICAgICAgKSA6IGFjdGl2ZUxpc3QubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9fdGFibGUtd3JhcFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19lbXB0eVwiPlxuICAgICAgICAgICAgICAgIHt0YWIgPT09ICdwZW5kaW5nJyA/ICdObyBwZW5kaW5nIHJlZnVuZCByZXF1ZXN0cy4nIDogJ05vIHByb2Nlc3NlZCByZWZ1bmQgcmVxdWVzdHMgeWV0Lid9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VfX3RhYmxlLXdyYXBcIj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX190YWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoPiM8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+Q3VzdG9tZXI8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+UmVzb3VyY2U8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+Qm9va2luZyBkYXRlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPkFtb3VudDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5SZXF1ZXN0ZWQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICB7dGFiID09PSAncHJvY2Vzc2VkJyAmJiA8dGg+U3RhdHVzPC90aD59XG4gICAgICAgICAgICAgICAgICAgIHt0YWIgPT09ICdwZW5kaW5nJyAmJiA8dGg+QWN0aW9uczwvdGg+fVxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVMaXN0Lm1hcCgocmVxdWVzdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtyZXF1ZXN0LmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3JlcXVlc3QuaWR9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19uYW1lXCI+e3JlcXVlc3QudXNlck5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19lbWFpbFwiPntyZXF1ZXN0LnVzZXJFbWFpbH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD57cmVxdWVzdC5yZXNvdXJjZU5hbWUgfHwgJy0nfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPntmb3JtYXRCb29raW5nRGF0ZShyZXF1ZXN0LnN0YXJ0QXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VfX2Ftb3VudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0Q3VycmVuY3kocmVxdWVzdC50b3RhbE1pbm9yLCByZXF1ZXN0LmN1cnJlbmN5KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD57Zm9ybWF0VGltZUFnbyhyZXF1ZXN0LnJlZnVuZFJlcXVlc3RlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIHt0YWIgPT09ICdwcm9jZXNzZWQnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcmVmdW5kLXBhZ2VfX3N0YXR1cy1iYWRnZSByZWZ1bmQtcGFnZV9fc3RhdHVzLWJhZGdlLS0ke3JlcXVlc3QucmVmdW5kUmVxdWVzdFN0YXR1cyB8fCAncGVuZGluZyd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlcXVlc3QucmVmdW5kUmVxdWVzdFN0YXR1cyA9PT0gJ2FwcHJvdmVkJyA/ICdBcHByb3ZlZCcgOiByZXF1ZXN0LnJlZnVuZFJlcXVlc3RTdGF0dXMgPT09ICdyZWplY3RlZCcgPyAnUmVqZWN0ZWQnIDogcmVxdWVzdC5yZWZ1bmRSZXF1ZXN0U3RhdHVzIHx8ICctJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIHt0YWIgPT09ICdwZW5kaW5nJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzdWNjZXNzTWFwW3JlcXVlc3QuaWRdID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19zdWNjZXNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3VjY2Vzc01hcFtyZXF1ZXN0LmlkXSA9PT0gJ2FwcHJvdmVkJyA/ICfinJMgQXBwcm92ZWQnIDogJ+KclSBSZWplY3RlZCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVmdW5kLXBhZ2VfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19idG4gcmVmdW5kLXBhZ2VfX2J0bi0tYXBwcm92ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUFwcHJvdmUocmVxdWVzdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtwcm9jZXNzaW5nSWQgPT09IHJlcXVlc3QuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9jZXNzaW5nSWQgPT09IHJlcXVlc3QuaWQgPyAnUHJvY2Vzc2luZy4uLicgOiAn4pyTIEFwcHJvdmUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWZ1bmQtcGFnZV9fYnRuIHJlZnVuZC1wYWdlX19idG4tLXJlamVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlamVjdChyZXF1ZXN0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Byb2Nlc3NpbmdJZCA9PT0gcmVxdWVzdC5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb2Nlc3NpbmdJZCA9PT0gcmVxdWVzdC5pZCA/ICdQcm9jZXNzaW5nLi4uJyA6ICfinJUgUmVqZWN0J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7ZXJyb3IgPyA8ZGl2IGNsYXNzTmFtZT1cInJlZnVuZC1wYWdlX19lcnJvclwiPntlcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IEFETUlOX1JFU09VUkNFX0RFRklOSVRJT05TLCBidWlsZEFkbWluUmVzb3VyY2VIcmVmIH0gZnJvbSAnLi4vcmVzb3VyY2UtZGVmaW5pdGlvbnMuanMnO1xuXG5jb25zdCBSRUZVTkRfUkVRVUVTVFNfSFJFRiA9ICcvYWRtaW4vcGFnZXMvcmVmdW5kLXJlcXVlc3RzJztcblxuY29uc3QgQ09OVEVOVF9QQUdFX09SREVSID0gW1xuICAnc2l0ZS1zZXR0aW5ncycsXG4gICdob21lcGFnZScsXG4gICdhYm91dC1wYWdlJyxcbiAgJ2Jsb2ctcGFnZScsXG4gICdwcmljaW5nLXBhZ2UnLFxuICAnZmFxLXBhZ2UnLFxuICAnbWVldGluZy1yb29tcy1wYWdlJyxcbiAgJ3ZpcnR1YWwtb2ZmaWNlLXBhZ2UnLFxuICAnY29udGFjdC1wYWdlJyxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnLFxuICAndGVybXMtcGFnZScsXG5dO1xuXG5jb25zdCBDT05URU5UX1BBR0VfTEFCRUxTID0ge1xuICAnc2l0ZS1zZXR0aW5ncyc6ICdTaXRlIFNldHRpbmcnLFxuICAnaG9tZXBhZ2UnOiAnSG9tZXBhZ2UnLFxuICAnYWJvdXQtcGFnZSc6ICdBYm91dCBQYWdlJyxcbiAgJ2Jsb2ctcGFnZSc6ICdCbG9nIFBhZ2UnLFxuICAncHJpY2luZy1wYWdlJzogJ1ByaWNpbmcgUGFnZScsXG4gICdmYXEtcGFnZSc6ICdGQVEgUGFnZScsXG4gICdtZWV0aW5nLXJvb21zLXBhZ2UnOiAnTWVldGluZyBSb29tcyBQYWdlJyxcbiAgJ3ZpcnR1YWwtb2ZmaWNlLXBhZ2UnOiAnVmlydHVhbCBPZmZpY2UgUGFnZScsXG4gICdjb250YWN0LXBhZ2UnOiAnQ29udGFjdCBQYWdlJyxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnOiAnUHJpdmFjeSBQb2xpY3kgUGFnZScsXG4gICd0ZXJtcy1wYWdlJzogJ1Rlcm1zIFBhZ2UnLFxufTtcblxuY29uc3QgU0lERUJBUl9XSURUSCA9IDMwNDtcbmNvbnN0IFJBSUxfV0lEVEggPSA0ODtcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLXNpZGViYXItc2hlbGwgfiBbZGF0YS1jc3M9XCJhcHAtY29udGVudFwiXSB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmctbGVmdDogJHtTSURFQkFSX1dJRFRIfXB4O1xuICB0cmFuc2l0aW9uOiBwYWRkaW5nLWxlZnQgMC4ycyBlYXNlO1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbC5hZG1pbi1zaWRlYmFyLXNoZWxsLS1yYWlsLW9ubHkgfiBbZGF0YS1jc3M9XCJhcHAtY29udGVudFwiXSB7XG4gIHBhZGRpbmctbGVmdDogJHtSQUlMX1dJRFRIfXB4O1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDAgYXV0byAwIDA7XG4gIHdpZHRoOiAke1NJREVCQVJfV0lEVEh9cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYWViZjA7XG4gIHotaW5kZXg6IDUwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2U7XG59XG5cbi5hZG1pbi1zaWRlYmFyLXNoZWxsLS1yYWlsLW9ubHkge1xuICB3aWR0aDogJHtSQUlMX1dJRFRIfXB4O1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke1NJREVCQVJfV0lEVEh9cHgpO1xufVxuXG4uYWRtaW4tc2lkZWJhci1yYWlsIHtcbiAgd2lkdGg6IDQ4cHg7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYWViZjA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEycHggMDtcbiAgZ2FwOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tc2lkZWJhci1sb2dvIHtcbiAgd2lkdGg6IDI4cHg7XG4gIGhlaWdodDogMjhweDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xufVxuXG4uYWRtaW4tcmFpbC1idXR0b24ge1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2YwZWJmZjtcbiAgY29sb3I6ICM3Yjc5ZmY7XG59XG5cbi5hZG1pbi1yYWlsLWJ1dHRvbiBzdmcge1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiAxNnB4O1xuICBzdHJva2U6IGN1cnJlbnRDb2xvcjtcbiAgZmlsbDogbm9uZTtcbiAgc3Ryb2tlLXdpZHRoOiAxLjg7XG4gIHN0cm9rZS1saW5lY2FwOiByb3VuZDtcbiAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcbn1cblxuLmFkbWluLXJhaWwtc3BhY2VyIHtcbiAgZmxleDogMTtcbn1cblxuLmFkbWluLWF2YXRhciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmFkbWluLWF2YXRhcl9fYnV0dG9uIHtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tYXZhdGFyX19tZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA0MnB4O1xuICBib3R0b206IDA7XG4gIG1pbi13aWR0aDogMTU2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywgMzMsIDUyLCAwLjE2KTtcbiAgcGFkZGluZzogNnB4O1xuICB6LWluZGV4OiA5MDtcbn1cblxuLmFkbWluLWF2YXRhcl9fbWVudSBidXR0b24ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcGFkZGluZzogOHB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1hdmF0YXJfX21lbnUgYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLXNpZGViYXItcGFuZWwge1xuICB3aWR0aDogMjU2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi13aWR0aDogMDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmFkbWluLXNpZGViYXItaGVhZGVyIHtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWJmMDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLXNpZGViYXItYm9keSB7XG4gIHBhZGRpbmc6IDE0cHggOHB4IDE4cHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5hZG1pbi1zZWFyY2gge1xuICBwYWRkaW5nOiAwIDhweCAxMnB4O1xufVxuXG4uYWRtaW4tc2VhcmNoIGlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LXNpemU6IDAuNzVyZW07XG59XG5cbi5hZG1pbi1zZWFyY2ggaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1ncm91cCB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5hZG1pbi1ncm91cF9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZzogMCAxMHB4IDhweDtcbn1cblxuLmFkbWluLWdyb3VwX19sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC42ODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG5cbi5hZG1pbi1ncm91cF9fY291bnQge1xuICBtaW4td2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgcGFkZGluZzogMCA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjY4NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tbmF2LWxpbmsge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA3cHggMTBweDtcbiAgbWFyZ2luOiAxcHggMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmFkbWluLW5hdi1saW5rOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQ6ICNmMGViZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tbmF2LWxpbmtfX3RleHQge1xuICBtaW4td2lkdGg6IDA7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjM3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5hZG1pbi1uYXYtbGlua19faWNvbiB7XG4gIHdpZHRoOiAxMnB4O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLXNpZGViYXItc2hlbGwgfiBbZGF0YS1jc3M9XCJhcHAtY29udGVudFwiXSB7XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICB9XG5cbiAgLmFkbWluLXNpZGViYXItc2hlbGwge1xuICAgIGJveC1zaGFkb3c6IDAgMThweCA0OHB4IHJnYmEoMzMsIDMzLCA1MiwgMC4xMik7XG4gIH1cblxuICAuYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7U0lERUJBUl9XSURUSH1weCk7XG4gIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDk2MXB4KSB7XG4gIC5hZG1pbi1zaWRlYmFyLXNoZWxsLFxuICAuYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIGl0ZW1NYXRjaGVzU2VhcmNoKGxhYmVsLCBzZWFyY2gpIHtcbiAgaWYgKCFzZWFyY2gpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBsYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRTaWRlYmFyUmVzb3VyY2VJdGVtcyhzZWN0aW9uLCBwYXRobmFtZSwgc2VhcmNoKSB7XG4gIHJldHVybiBBRE1JTl9SRVNPVVJDRV9ERUZJTklUSU9OU1xuICAgIC5maWx0ZXIoKGRlZmluaXRpb24pID0+IGRlZmluaXRpb24uc2lkZWJhclNlY3Rpb24gPT09IHNlY3Rpb24pXG4gICAgLm1hcCgoZGVmaW5pdGlvbikgPT4ge1xuICAgICAgY29uc3QgcmVzb3VyY2VQYXRoUHJlZml4ID0gYC9hZG1pbi9yZXNvdXJjZXMvJHtkZWZpbml0aW9uLnRhYmxlfWA7XG4gICAgICBjb25zdCBocmVmID0gZGVmaW5pdGlvbi5zaWRlYmFySHJlZiB8fCBidWlsZEFkbWluUmVzb3VyY2VIcmVmKGRlZmluaXRpb24udGFibGUpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRQcmVmaXhlcyA9IFtocmVmLCByZXNvdXJjZVBhdGhQcmVmaXhdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogZGVmaW5pdGlvbi50YWJsZSxcbiAgICAgICAgbGFiZWw6IGRlZmluaXRpb24uc2lkZWJhckxhYmVsIHx8IGRlZmluaXRpb24ubGFiZWwsXG4gICAgICAgIGhyZWYsXG4gICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZFByZWZpeGVzLnNvbWUoKHByZWZpeCkgPT4gcGF0aG5hbWUuc3RhcnRzV2l0aChwcmVmaXgpKSxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChyZXNvdXJjZSkgPT4gaXRlbU1hdGNoZXNTZWFyY2gocmVzb3VyY2UubGFiZWwsIHNlYXJjaCkpO1xufVxuXG5mdW5jdGlvbiBSYWlsSWNvbih7IGNoaWxkcmVuIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L3N2Zz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gSG9tZUljb24oKSB7XG4gIHJldHVybiAoXG4gICAgPFJhaWxJY29uPlxuICAgICAgPHBhdGggZD1cIk00LjUgMTAuNSAxMiA0bDcuNSA2LjVcIiAvPlxuICAgICAgPHBhdGggZD1cIk02LjUgOS41VjE5aDExVjkuNVwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTEwIDE5di01aDR2NVwiIC8+XG4gICAgPC9SYWlsSWNvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gUGVuY2lsSWNvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8UmFpbEljb24+XG4gICAgICA8cGF0aCBkPVwibTMuNSAyMC41IDQuMjUtMSA5Ljc1LTkuNzUtMy4yNS0zLjI1TDQuNSAxNi4yNWwtMSA0LjI1WlwiIC8+XG4gICAgICA8cGF0aCBkPVwibTEzLjUgNi41IDMuMjUgMy4yNVwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTcuNSAxOS41aDEzXCIgLz5cbiAgICA8L1JhaWxJY29uPlxuICApO1xufVxuXG5mdW5jdGlvbiBNZWRpYUljb24oKSB7XG4gIHJldHVybiAoXG4gICAgPFJhaWxJY29uPlxuICAgICAgPHJlY3QgeD1cIjMuNVwiIHk9XCI1LjVcIiB3aWR0aD1cIjE3XCIgaGVpZ2h0PVwiMTNcIiByeD1cIjJcIiAvPlxuICAgICAgPGNpcmNsZSBjeD1cIjguNVwiIGN5PVwiMTBcIiByPVwiMS41XCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJtNS41IDE2IDQtNCAzIDMgMi0yIDQgM1wiIC8+XG4gICAgPC9SYWlsSWNvbj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2lkZWJhcih7IGlzVmlzaWJsZSB9KSB7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBwYWdlcyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUucGFnZXMpO1xuICBjb25zdCBzZXNzaW9uID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5zZXNzaW9uKTtcbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW21lbnVPcGVuLCBzZXRNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwZW5kaW5nUmVmdW5kQ291bnQsIHNldFBlbmRpbmdSZWZ1bmRDb3VudF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgYXZhdGFyUmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IHBhZ2VJdGVtcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gQ09OVEVOVF9QQUdFX09SREVSXG4gICAgICAubWFwKChwYWdlTmFtZSkgPT4gcGFnZXMuZmluZCgocGFnZSkgPT4gcGFnZS5uYW1lID09PSBwYWdlTmFtZSkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAubWFwKChwYWdlKSA9PiAoe1xuICAgICAgICBpZDogcGFnZS5uYW1lLFxuICAgICAgICBsYWJlbDogQ09OVEVOVF9QQUdFX0xBQkVMU1twYWdlLm5hbWVdID8/IHBhZ2UubmFtZSxcbiAgICAgICAgaHJlZjogYC9hZG1pbi9wYWdlcy8ke3BhZ2UubmFtZX1gLFxuICAgICAgICBzZWxlY3RlZDogbG9jYXRpb24ucGF0aG5hbWUuc3RhcnRzV2l0aChgL2FkbWluL3BhZ2VzLyR7cGFnZS5uYW1lfWApLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChwYWdlKSA9PiBpdGVtTWF0Y2hlc1NlYXJjaChwYWdlLmxhYmVsLCBzZWFyY2gpKSxcbiAgICBbbG9jYXRpb24ucGF0aG5hbWUsIHBhZ2VzLCBzZWFyY2hdLFxuICApO1xuXG4gIGNvbnN0IGNvbGxlY3Rpb25JdGVtcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gYnVpbGRTaWRlYmFyUmVzb3VyY2VJdGVtcygnY29sbGVjdGlvbnMnLCBsb2NhdGlvbi5wYXRobmFtZSwgc2VhcmNoKSxcbiAgICBbbG9jYXRpb24ucGF0aG5hbWUsIHNlYXJjaF0sXG4gICk7XG5cbiAgY29uc3Qgb3BlcmF0aW9uSXRlbXMgPSB1c2VNZW1vKFxuICAgICgpID0+IGJ1aWxkU2lkZWJhclJlc291cmNlSXRlbXMoJ29yZGVycycsIGxvY2F0aW9uLnBhdGhuYW1lLCBzZWFyY2gpLFxuICAgIFtsb2NhdGlvbi5wYXRobmFtZSwgc2VhcmNoXSxcbiAgKTtcblxuICBjb25zdCBjdXN0b21lckl0ZW1zID0gdXNlTWVtbyhcbiAgICAoKSA9PiBidWlsZFNpZGViYXJSZXNvdXJjZUl0ZW1zKCdjdXN0b21lcnMnLCBsb2NhdGlvbi5wYXRobmFtZSwgc2VhcmNoKSxcbiAgICBbbG9jYXRpb24ucGF0aG5hbWUsIHNlYXJjaF0sXG4gICk7XG5cbiAgY29uc3QgcmVmdW5kUmVxdWVzdHNWaXNpYmxlID0gdXNlTWVtbyhcbiAgICAoKSA9PiBpdGVtTWF0Y2hlc1NlYXJjaCgnUmVmdW5kIFJlcXVlc3RzJywgc2VhcmNoKSxcbiAgICBbc2VhcmNoXSxcbiAgKTtcblxuICBjb25zdCBpc1JlZnVuZFJlcXVlc3RzU2VsZWN0ZWQgPSBsb2NhdGlvbi5wYXRobmFtZS5zdGFydHNXaXRoKFJFRlVORF9SRVFVRVNUU19IUkVGKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc0FjdGl2ZSA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkQ291bnQgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL2FkbWluL2Jvb2tpbmdzL3JlZnVuZC1yZXF1ZXN0cycsIHsgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHJldHVybjtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgaWYgKGlzQWN0aXZlICYmIEFycmF5LmlzQXJyYXkocGF5bG9hZD8uZGF0YSkpIHtcbiAgICAgICAgICBzZXRQZW5kaW5nUmVmdW5kQ291bnQocGF5bG9hZC5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZENvdW50KCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChsb2FkQ291bnQsIDMwXzAwMCk7XG4gICAgcmV0dXJuICgpID0+IHsgaXNBY3RpdmUgPSBmYWxzZTsgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7IH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBpbml0aWFsID0gKHNlc3Npb24/LmVtYWlsPy5bMF0gPz8gJ0MnKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBpc0Rhc2hib2FyZCA9IGxvY2F0aW9uLnBhdGhuYW1lID09PSAnL2FkbWluJyB8fCBsb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9hZG1pbi8nO1xuICBjb25zdCBpc01lZGlhID0gbG9jYXRpb24ucGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnknKTtcbiAgY29uc3Qgc2hvd1BhbmVsID0gIWlzTWVkaWE7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW1lbnVPcGVuKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZU91dHNpZGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKCFhdmF0YXJSZWYuY3VycmVudD8uY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZU91dHNpZGVDbGljayk7XG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZU91dHNpZGVDbGljayk7XG4gIH0sIFttZW51T3Blbl0pO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGFkbWluLXNpZGViYXItc2hlbGwke3Nob3dQYW5lbCA/ICcnIDogJyBhZG1pbi1zaWRlYmFyLXNoZWxsLS1yYWlsLW9ubHknfSR7aXNWaXNpYmxlID8gJycgOiAnIGFkbWluLXNpZGViYXItc2hlbGwtLWhpZGRlbid9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZWJhci1yYWlsXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZWJhci1sb2dvXCJcbiAgICAgICAgICAgIHNyYz1cIi9hZG1pbi1hc3NldHMvY2xpZW50LW1hcmsuc3ZnXCJcbiAgICAgICAgICAgIGFsdD1cIlRoZSBMZWFkZW5oYWxsIFdvcmtzXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXJhaWwtYnV0dG9uJHtpc0Rhc2hib2FyZCA/ICcgYWRtaW4tcmFpbC1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnL2FkbWluJyl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEhvbWVJY29uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcmFpbC1idXR0b24keyFpc0Rhc2hib2FyZCAmJiAhaXNNZWRpYSA/ICcgYWRtaW4tcmFpbC1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnL2FkbWluL3BhZ2VzL3NpdGUtc2V0dGluZ3MnKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UGVuY2lsSWNvbiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXJhaWwtYnV0dG9uJHtpc01lZGlhID8gJyBhZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNZWRpYUljb24gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJhaWwtc3BhY2VyXCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWF2YXRhclwiIHJlZj17YXZhdGFyUmVmfT5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tYXZhdGFyX19idXR0b25cIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TWVudU9wZW4oKGN1cnJlbnQpID0+ICFjdXJyZW50KX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2luaXRpYWx9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHttZW51T3BlbiA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hdmF0YXJfX21lbnVcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZSgnL2FkbWluL3BhZ2VzL2FjY291bnQnKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgQWNjb3VudFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJy9hZG1pbi9sb2dvdXQnKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgU2lnbiBvdXRcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge3Nob3dQYW5lbCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLXBhbmVsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLWhlYWRlclwiPkNvbnRlbnQgTWFuYWdlcjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZWJhci1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2xhYmVsXCI+Q29sbGVjdGlvbiBUeXBlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fY291bnRcIj57Y29sbGVjdGlvbkl0ZW1zLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7Y29sbGVjdGlvbkl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLW5hdi1saW5rJHtpdGVtLnNlbGVjdGVkID8gJyBhZG1pbi1uYXYtbGluay0tc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1uYXYtbGlua19fdGV4dFwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2xhYmVsXCI+Q3VzdG9tZXJzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19jb3VudFwiPntjdXN0b21lckl0ZW1zLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7Y3VzdG9tZXJJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1uYXYtbGluayR7aXRlbS5zZWxlY3RlZCA/ICcgYWRtaW4tbmF2LWxpbmstLXNlbGVjdGVkJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKGl0ZW0uaHJlZil9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbmF2LWxpbmtfX3RleHRcIj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9faGVhZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19sYWJlbFwiPk9yZGVyczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fY291bnRcIj57b3BlcmF0aW9uSXRlbXMubGVuZ3RoICsgKHJlZnVuZFJlcXVlc3RzVmlzaWJsZSA/IDEgOiAwKX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7b3BlcmF0aW9uSXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tbmF2LWxpbmske2l0ZW0uc2VsZWN0ZWQgPyAnIGFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCcgOiAnJ31gfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShpdGVtLmhyZWYpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW5hdi1saW5rX190ZXh0XCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge3JlZnVuZFJlcXVlc3RzVmlzaWJsZSAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tbmF2LWxpbmske2lzUmVmdW5kUmVxdWVzdHNTZWxlY3RlZCA/ICcgYWRtaW4tbmF2LWxpbmstLXNlbGVjdGVkJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKFJFRlVORF9SRVFVRVNUU19IUkVGKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1uYXYtbGlua19fdGV4dFwiPlJlZnVuZCBSZXF1ZXN0czwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtwZW5kaW5nUmVmdW5kQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbmF2LWxpbmtfX2ljb25cIiBzdHlsZT17eyB3aWR0aDogJ2F1dG8nLCBmb250U2l6ZTogJzAuNjg3NXJlbScsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6ICcjYzcyZTNhJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICB7cGVuZGluZ1JlZnVuZENvdW50fVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9faGVhZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19sYWJlbFwiPlNpbmdsZSBUeXBlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fY291bnRcIj57cGFnZUl0ZW1zLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7cGFnZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLW5hdi1saW5rJHtpdGVtLnNlbGVjdGVkID8gJyBhZG1pbi1uYXYtbGluay0tc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1uYXYtbGlua19fdGV4dFwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgRm9ybUdyb3VwLFxuICBIMixcbiAgSW5wdXQsXG4gIExhYmVsLFxuICBNZXNzYWdlQm94LFxuICBUZXh0LFxufSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTG9naW4oKSB7XG4gIGNvbnN0IHByb3BzID0gd2luZG93Ll9fQVBQX1NUQVRFX18gPz8ge307XG4gIGNvbnN0IGJyYW5kaW5nID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5icmFuZGluZyk7XG4gIGNvbnN0IG1lc3NhZ2UgPSBwcm9wcy5lcnJvck1lc3NhZ2U7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94XG4gICAgICB2YXJpYW50PVwiZ3JleVwiXG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxuICAgICAgcD1cInhsXCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmNGVmZTggMCUsICNlOGRjY2YgNDUlLCAjZDljNGFiIDEwMCUpJyxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPEJveFxuICAgICAgICBiZz1cIndoaXRlXCJcbiAgICAgICAgd2lkdGg9e1snMTAwJScsICcxMDAlJywgJzk2MHB4J119XG4gICAgICAgIG1pbkhlaWdodD1cIjU2MHB4XCJcbiAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcbiAgICAgICAgYm9yZGVyUmFkaXVzPVwieGxcIlxuICAgICAgICBvdmVyZmxvdz1cImhpZGRlblwiXG4gICAgICA+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICB3aWR0aD17WycwJywgJzAnLCAnNDQlJ119XG4gICAgICAgICAgZGlzcGxheT17Wydub25lJywgJ25vbmUnLCAnZmxleCddfVxuICAgICAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxuICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiXG4gICAgICAgICAgcD1cInh4bFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGYwZjBmIDAlLCAjMWYxZjFmIDEwMCUpJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2Y1ZjFlYScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxCb3g+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi9hZG1pbi1hc3NldHMvbG9nby5zdmdcIlxuICAgICAgICAgICAgICBhbHQ9e2JyYW5kaW5nLmNvbXBhbnlOYW1lfVxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogNzIsIGhlaWdodDogNzIsIG9iamVjdEZpdDogJ2NvbnRhaW4nLCBtYXJnaW5Cb3R0b206IDI0IH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEgyIGNvbG9yPVwid2hpdGVcIiBtYXJnaW5Cb3R0b209XCJsZ1wiPkNsaWVudCBDb250ZW50IFBvcnRhbDwvSDI+XG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk0MFwiPlxuICAgICAgICAgICAgICBNYW5hZ2UgdGhlIHNhbWUgY2xpZW50LWZhY2luZyBjb250ZW50IHN1cmZhY2UgdXNlZCBieSB0aGUgbGl2ZSBzaXRlLlxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTUwXCI+VGhlIExlYWRlbmhhbGwgV29ya3M8L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBhcz1cImZvcm1cIlxuICAgICAgICAgIGFjdGlvbj17cHJvcHMuYWN0aW9ufVxuICAgICAgICAgIG1ldGhvZD1cIlBPU1RcIlxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIHA9XCJ4eGxcIlxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IG1iPVwieHhsXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi9hZG1pbi1hc3NldHMvbG9nby5zdmdcIlxuICAgICAgICAgICAgICBhbHQ9e2JyYW5kaW5nLmNvbXBhbnlOYW1lfVxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogNjQsIGhlaWdodDogNjQsIG9iamVjdEZpdDogJ2NvbnRhaW4nLCBtYXJnaW5Cb3R0b206IDIwIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEgyIG1hcmdpbj1cIjBcIj5TaWduIGluPC9IMj5cbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCI+Q2xpZW50IGVkaXRvciBhY2Nlc3MgZm9yIFRoZSBMZWFkZW5oYWxsIFdvcmtzLjwvVGV4dD5cbiAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgIHttZXNzYWdlID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiIG1iPVwibGdcIj57bWVzc2FnZX08L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+RW1haWw8L0xhYmVsPlxuICAgICAgICAgICAgPElucHV0IG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiY2xpZW50QGxlYWRlbmhhbGx3b3Jrcy5jb21cIiAvPlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5QYXNzd29yZDwvTGFiZWw+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBwYXNzd29yZFwiXG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImN1cnJlbnQtcGFzc3dvcmRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgIDxCb3ggbXQ9XCJ4bFwiPlxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIHNpemU9XCJsZ1wiPkxvZyBpbjwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9wQmFyKCkge1xuICByZXR1cm4gbnVsbDtcbn1cbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZFxuaW1wb3J0IENvbGxlY3Rpb25NYW5hZ2VyIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25NYW5hZ2VyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db2xsZWN0aW9uTWFuYWdlciA9IENvbGxlY3Rpb25NYW5hZ2VyXG5pbXBvcnQgQ29udGVudFBhZ2VFZGl0b3IgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3InXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbnRlbnRQYWdlRWRpdG9yID0gQ29udGVudFBhZ2VFZGl0b3JcbmltcG9ydCBNZWRpYUxpYnJhcnkgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5NZWRpYUxpYnJhcnkgPSBNZWRpYUxpYnJhcnlcbmltcG9ydCBBY2NvdW50U2V0dGluZ3MgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQWNjb3VudFNldHRpbmdzJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5BY2NvdW50U2V0dGluZ3MgPSBBY2NvdW50U2V0dGluZ3NcbmltcG9ydCBSZWZ1bmRSZXF1ZXN0cyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9SZWZ1bmRSZXF1ZXN0cydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUmVmdW5kUmVxdWVzdHMgPSBSZWZ1bmRSZXF1ZXN0c1xuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvU2lkZWJhcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuU2lkZWJhciA9IFNpZGViYXJcbmltcG9ydCBMb2dpbiBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Mb2dpbidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTG9naW4gPSBMb2dpblxuaW1wb3J0IFRvcEJhciBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Ub3BCYXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlRvcEJhciA9IFRvcEJhciJdLCJuYW1lcyI6WyJBRE1JTl9SRVNPVVJDRV9ERUZJTklUSU9OUyIsInRhYmxlIiwibGFiZWwiLCJzaWRlYmFyTGFiZWwiLCJuYXZpZ2F0aW9uIiwic2lkZWJhclNlY3Rpb24iLCJzaWRlYmFySHJlZiIsImhpZGRlbkNvbHVtbnMiLCJsaXN0UHJvcGVydGllcyIsImZpbHRlclByb3BlcnRpZXMiLCJyZWFkT25seSIsImJ1aWxkQWRtaW5SZXNvdXJjZUhyZWYiLCJyZXNvdXJjZUlkIiwiUFJJTUFSWV9QQUdFUyIsImhyZWYiLCJDT0xMRUNUSU9OUyIsIkNVU1RPTUVSX1FVSUNLX09SREVSIiwiT1JERVJfUVVJQ0tfT1JERVIiLCJDVVNUT01FUlMiLCJtYXAiLCJmaW5kIiwiZGVmaW5pdGlvbiIsImZpbHRlciIsIkJvb2xlYW4iLCJPUkRFUlMiLCJTVFlMRVMiLCJhcGkiLCJBcGlDbGllbnQiLCJmb3JtYXRTdWJtaXNzaW9uRGF0ZSIsInZhbHVlIiwiZGF0ZSIsIkRhdGUiLCJOdW1iZXIiLCJpc05hTiIsImdldFRpbWUiLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJkYXRlU3R5bGUiLCJ0aW1lU3R5bGUiLCJmb3JtYXQiLCJ0cmltTWVzc2FnZSIsIm1lc3NhZ2UiLCJub3JtYWxpemVkIiwiU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsInNsaWNlIiwidHJpbUVuZCIsImNvZXJjZUpzb24iLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJmZXRjaEFkbWluSnNvbiIsInVybCIsIm9wdGlvbnMiLCJyZXNwb25zZSIsImZldGNoIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwidGV4dCIsInBheWxvYWQiLCJvayIsImVycm9yIiwic3RhdHVzIiwiRXJyb3IiLCJub3JtYWxpemVBZG1pblN1Ym1pc3Npb25QYXlsb2FkIiwiQXJyYXkiLCJpc0FycmF5IiwiZGF0YSIsIm5vcm1hbGl6ZVN1Ym1pc3Npb25SZWNvcmQiLCJyZWNvcmQiLCJwYXJhbXMiLCJpZCIsIm5hbWUiLCJlbWFpbCIsInBob25lIiwic291cmNlUGFnZSIsInNvdXJjZV9wYWdlIiwiY3JlYXRlZEF0IiwiY3JlYXRlZF9hdCIsIm5vcm1hbGl6ZVJlc291cmNlU3VibWlzc2lvblBheWxvYWQiLCJyZWNvcmRzIiwic3VibWlzc2lvbiIsImlzRmluaXRlIiwibm9ybWFsaXplUmVzb3VyY2VSZWNvcmRQYXlsb2FkIiwiZ2V0UmVjZW50U3VibWlzc2lvbnMiLCJwcm9wcyIsInJlY2VudFN1Ym1pc3Npb25zIiwicmVjZW50TWVzc2FnZXMiLCJyZXNvbHZlU3VibWlzc2lvblBheWxvYWQiLCJzb3VyY2UiLCJib2R5IiwicmVzdWx0IiwiaXRlbXMiLCJub3JtYWxpemVEYXNoYm9hcmRSZXNwb25zZSIsImZldGNoRGFzaGJvYXJkTWVzc2FnZXMiLCJmZXRjaEFkbWluTWVzc2FnZXMiLCJsaW1pdCIsInNhZmVMaW1pdCIsIm5vcm1hbGl6ZUN1c3RvbVJlc3BvbnNlIiwiY3VzdG9tUGF5bG9hZCIsImN1c3RvbVN1Ym1pc3Npb25zIiwiY29uc29sZSIsIndhcm4iLCJyZXNvdXJjZVBheWxvYWQiLCJkZWxldGVBZG1pblN1Ym1pc3Npb24iLCJwYXJzZWRJZCIsIm1ldGhvZCIsIkFjY2VwdCIsImJhc2VFcnJvciIsIm5vdGljZSIsInR5cGUiLCJmZXRjaEFkbWluU3VibWlzc2lvbkJ5SWQiLCJjdXN0b21TdWJtaXNzaW9uIiwiU2hvcnRjdXRMaXN0IiwidGl0bGUiLCJuYXZpZ2F0ZSIsIm1ldGEiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpdGVtIiwia2V5Iiwib25DbGljayIsIk1lc3NhZ2VzQ2FyZCIsInN1Ym1pc3Npb25zIiwic2VsZWN0ZWRTdWJtaXNzaW9uIiwib25PcGVuIiwib25EZWxldGUiLCJkZWxldGluZ0lkIiwib3BlcmF0aW9uRXJyb3IiLCJkaXNhYmxlZCIsIkRhc2hib2FyZCIsInVzZU5hdmlnYXRlIiwiZGFzaGJvYXJkU3VibWlzc2lvbnMiLCJzZXREYXNoYm9hcmRTdWJtaXNzaW9ucyIsInVzZVN0YXRlIiwic2V0U2VsZWN0ZWRTdWJtaXNzaW9uIiwic2V0RGVsZXRpbmdJZCIsInNldE9wZXJhdGlvbkVycm9yIiwidXNlRWZmZWN0IiwiaW5pdGlhbFN1Ym1pc3Npb25zIiwiaXNBY3RpdmUiLCJsb2FkRGFzaGJvYXJkRGF0YSIsImFzc2lnblN1Ym1pc3Npb25zIiwibmV4dFN1Ym1pc3Npb25zIiwiZGFzaGJvYXJkUmVzcG9uc2UiLCJnZXREYXNoYm9hcmQiLCJmYWxsYmFja1N1Ym1pc3Npb25zIiwiZGFzaGJvYXJkT25seVBheWxvYWQiLCJkYXNoYm9hcmRPbmx5U3VibWlzc2lvbnMiLCJmYWxsYmFja1BheWxvYWQiLCJmYWxsYmFja0Vycm9yIiwiaGFuZGxlT3BlblN1Ym1pc3Npb24iLCJmcmVzaFN1Ym1pc3Npb24iLCJoYW5kbGVEZWxldGVTdWJtaXNzaW9uIiwidGFyZ2V0SWQiLCJwcmV2aW91cyIsIkZyYWdtZW50IiwiTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4iLCJJTUFHRV9GSUVMRF9QQVRURVJOIiwiQk9PTEVBTl9GSUVMRF9QQVRURVJOIiwiRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOIiwidG9MYWJlbCIsInJlcGxhY2UiLCJ2IiwidG9VcHBlckNhc2UiLCJjbG9uZVZhbHVlIiwic3RyaW5naWZ5IiwiZ2V0RW1wdHlJdGVtIiwic2FtcGxlIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJrZXlzIiwiaW5jbHVkZXMiLCJ0b0NvbXBhcmFibGVWYWx1ZSIsInNvcnQiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImhhc01lYW5pbmdmdWxWYWx1ZSIsInNvbWUiLCJlbnRyaWVzIiwibmVzdGVkVmFsdWUiLCJidWlsZEFkbWluUGF0aCIsInBhdGhuYW1lIiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiZm9yRWFjaCIsInVuZGVmaW5lZCIsInNldCIsInF1ZXJ5U3RyaW5nIiwidG9TdHJpbmciLCJwYXJzZURpc3BsYXllZEZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJwYXJzZUlucHV0VmFsdWUiLCJuZXh0UmF3VmFsdWUiLCJjdXJyZW50VmFsdWUiLCJnZXRSZXBlYXRhYmxlSXRlbVZhbHVlIiwiZ2V0TWVkaWFEaXNwbGF5TmFtZSIsImZhbGxiYWNrIiwicmF3IiwicGFydHMiLCJ3aXRoUmVwZWF0YWJsZUl0ZW1WYWx1ZSIsIm5leHRWYWx1ZSIsInJlc29sdmVNZWRpYVByZXZpZXdVcmwiLCJ0ZXN0Iiwic3RhcnRzV2l0aCIsInVwZGF0ZUF0UGF0aCIsInBhdGgiLCJzZWdtZW50IiwicmVzdCIsImNsb25lIiwicmVtb3ZlQXRQYXRoIiwiXyIsImluZGV4IiwiYXBwZW5kQXRQYXRoIiwibmV4dEl0ZW0iLCJtb3ZlQXRQYXRoIiwib2Zmc2V0IiwibmV4dEluZGV4IiwibW92ZWQiLCJzcGxpY2UiLCJnZXREaXNwbGF5VGl0bGUiLCJ0aXRsZUZpZWxkIiwiZm9ybWF0TW9uZXlWYWx1ZSIsImN1cnJlbmN5IiwiYW1vdW50Iiwic2FmZUN1cnJlbmN5IiwiTnVtYmVyRm9ybWF0Iiwic3R5bGUiLCJ0b0ZpeGVkIiwiZm9ybWF0UHJvZmlsZURpc3BsYXlWYWx1ZSIsInJhd1ZhbHVlIiwibm9ybWFsaXplZFZhbHVlIiwibW9uZXlGaWVsZHMiLCJsZXR0ZXIiLCJpc0Jsb2dEaXNhYmxlZEZpZWxkIiwiaXNGYXFEaXNhYmxlZEZpZWxkIiwiaXNNZWV0aW5nUm9vbURpc2FibGVkRmllbGQiLCJpc1Zpc2liaWxpdHlUb2dnbGVGaWVsZCIsImdldEZpZWxkRGlzcGxheUxhYmVsIiwicmVxdWVzdFBhZ2UiLCJwYWdlTmFtZSIsInF1ZXJ5IiwidHJpbW1lZFRleHQiLCJ0b0xvd2VyQ2FzZSIsImlzSHRtbCIsInJlZGlyZWN0ZWRUb0xvZ2luIiwicmVkaXJlY3RlZCIsImlzQXV0aEVycm9yIiwidXBsb2FkQWRtaW5JbWFnZSIsImZpbGUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwianNvbiIsImNhdGNoIiwidXBsb2FkZWRVcmwiLCJyZWxhdGl2ZVVybCIsIk1FRElBX1BJQ0tFUl9FVkVOVCIsImNob29zZUFkbWluTGlicmFyeUltYWdlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3aW5kb3ciLCJwaWNrZXJXaW5kb3ciLCJvcGVuIiwiZmluaXNoZWQiLCJjbGVhbnVwIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZU1lc3NhZ2UiLCJjbGVhckludGVydmFsIiwiY2xvc2VXYXRjaGVyIiwiZXZlbnQiLCJvcmlnaW4iLCJsb2NhdGlvbiIsInNldEludGVydmFsIiwiY2xvc2VkIiwiYWRkRXZlbnRMaXN0ZW5lciIsIk1lZGlhRmllbGQiLCJvbkNoYW5nZSIsInVybHMiLCJmaWxlSW5wdXRSZWYiLCJ1c2VSZWYiLCJ1cGxvYWRpbmciLCJzZXRVcGxvYWRpbmciLCJ1cGxvYWRFcnJvciIsInNldFVwbG9hZEVycm9yIiwic3JjIiwiYWx0IiwiY3VycmVudCIsImNsaWNrIiwic2VsZWN0ZWRVcmwiLCJyZWYiLCJhY2NlcHQiLCJtdWx0aXBsZSIsImRpc3BsYXkiLCJmaWxlcyIsImZyb20iLCJ0YXJnZXQiLCJ1cGxvYWRlZFVybHMiLCJwdXNoIiwiUHJpbWl0aXZlRmllbGQiLCJzZWxlY3RPcHRpb25zIiwic2VsZWN0RmllbGRzIiwiaW5wdXRUeXBlIiwiaW5wdXRUeXBlcyIsImlzRGlzYWJsZWRGaWVsZCIsImNoZWNrZWQiLCJvcHRpb24iLCJQcm9maWxlSW5mb0NhcmQiLCJpbmZvQ2FyZEZpZWxkcyIsImluZm9DYXJkQmxvY2tGaWVsZHMiLCJvcHRpb25hbEluZm9DYXJkRmllbGRzIiwiU2V0Iiwib3B0aW9uYWxJbmZvQ2FyZEJsb2NrRmllbGRzIiwiaW5mb0NhcmRUaXRsZUZpZWxkIiwicmF3VGl0bGUiLCJjYXJkVGl0bGUiLCJjYXJkTWV0YUxhYmVsIiwibWV0YUxhYmVsIiwiY2FyZEV5ZWJyb3ciLCJlbmRzV2l0aCIsInRpdGxlVG9rZW5zIiwidG9rZW4iLCJhdmF0YXJMYWJlbCIsImpvaW4iLCJtYW51YWxUYWciLCJpc1Byb2ZpbGVTdW1tYXJ5TGF5b3V0Iiwic3VtbWFyeUZpZWxkcyIsImRpc3BsYXlWYWx1ZSIsInZhbHVlQ2xhc3NOYW1lcyIsImhhcyIsInJvd3MiLCJNYXRoIiwibWF4IiwibWluIiwiTWVzc2FnZVJlcGx5UGFuZWwiLCJyZXBsaWVzIiwicmVwbHlEcmFmdCIsIm9uUmVwbHlDaGFuZ2UiLCJvblNlbmRSZXBseSIsInNlbmRpbmdSZXBseSIsInJlcGx5IiwiYWRtaW5FbWFpbCIsInN1YmplY3QiLCJBcnJheUZpZWxkIiwib25BZGRJdGVtIiwib25SZW1vdmVJdGVtIiwib25Nb3ZlSXRlbSIsImlzSW1hZ2VBcnJheSIsImRyYWdJbmRleCIsInNldERyYWdJbmRleCIsImRyYWdPdmVySW5kZXgiLCJzZXREcmFnT3ZlckluZGV4IiwidXBsb2FkaW5nSW5kZXgiLCJzZXRVcGxvYWRpbmdJbmRleCIsImZpbGVJbnB1dFJlZnMiLCJvbkRyYWdPdmVyIiwicHJldmVudERlZmF1bHQiLCJvbkRyb3AiLCJvbkRyYWdMZWF2ZSIsInN0b3BQcm9wYWdhdGlvbiIsImRyYWdnYWJsZSIsIm9uRHJhZ1N0YXJ0IiwiZGF0YVRyYW5zZmVyIiwiZWZmZWN0QWxsb3dlZCIsInNldERhdGEiLCJvbkRyYWdFbmQiLCJtYXJnaW5Ub3AiLCJlbGVtZW50IiwicGFkZGluZyIsIkZpZWxkUmVuZGVyZXIiLCJyZW5kZXJMaXN0Q2VsbCIsIkxpc3RWaWV3IiwiY29udHJvbHMiLCJzZWFyY2giLCJsb2FkaW5nIiwib25TZWFyY2giLCJvbk9wZW5SZWNvcmQiLCJvbkNyZWF0ZSIsIm9uU2V0U29ydCIsIm9uU2V0RmlsdGVyIiwib25SZXNldEZpbHRlcnMiLCJvblRvZ2dsZURpc3BsYXllZEZpZWxkIiwib25SZXNldERpc3BsYXllZEZpZWxkcyIsIm9uRHVwbGljYXRlUmVjb3JkIiwib25EZWxldGVSZWNvcmQiLCJzaG93U2VhcmNoIiwic2V0U2hvd1NlYXJjaCIsImZpbHRlcnNPcGVuIiwic2V0RmlsdGVyc09wZW4iLCJzaG93RGlzcGxheWVkIiwic2V0U2hvd0Rpc3BsYXllZCIsInNlYXJjaFZhbHVlIiwic2V0U2VhcmNoVmFsdWUiLCJvcGVuTWVudUlkIiwic2V0T3Blbk1lbnVJZCIsIm1lbnVSZWYiLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImhhbmRsZVBvaW50ZXJEb3duIiwiY29udGFpbnMiLCJkb2N1bWVudCIsImRpc3BsYXllZENvbHVtbnMiLCJ1c2VNZW1vIiwiYXZhaWxhYmxlRmllbGRzIiwiZGlzcGxheWVkRmllbGRzIiwic2hvd0NyZWF0ZSIsImFsbG93Q3JlYXRlIiwiaGFzRmlsdGVycyIsImZpbHRlcnMiLCJhbGxvd0R1cGxpY2F0ZSIsImFsbG93RGVsZXRlIiwicGxhY2Vob2xkZXIiLCJhdXRvRm9jdXMiLCJsZWZ0IiwicmlnaHQiLCJhY3RpdmVGaWx0ZXJzIiwiY29sdW1uIiwic29ydEJ5Iiwic29ydE9yZGVyIiwiZG9jdW1lbnRJZCIsImNvbHVtbnMiLCJFZGl0VmlldyIsInB1Ymxpc2hlZFJlY29yZCIsImFjdGl2ZVRhYiIsIm9uU3dpdGNoVGFiIiwic2F2aW5nIiwib25CYWNrIiwib25TYXZlIiwib25QdWJsaXNoIiwib25EaXNjYXJkQ2hhbmdlcyIsIm9uVW5wdWJsaXNoIiwiY2FuU2F2ZSIsImNhblB1Ymxpc2giLCJjYW5EaXNjYXJkIiwiY2FuVW5wdWJsaXNoIiwiaXNDcmVhdGVNb2RlIiwib25DYW5jZWxNZW1iZXJzaGlwIiwiY2FuY2VsbGluZ01lbWJlcnNoaXAiLCJkaXNwbGF5ZWRSZWNvcmQiLCJpc1B1Ymxpc2hlZFZpZXciLCJpc01hbnVhbEVudHJ5IiwiZW50cnlTb3VyY2UiLCJzdXBwb3J0c0VkaXRpbmciLCJzaG93VmVyc2lvblRhYnMiLCJhbGxvd1B1Ymxpc2giLCJhbGxvd1NhdmUiLCJlZGl0YWJsZUZpZWxkcyIsImNyZWF0ZUZpZWxkcyIsIm1hbnVhbEVkaXRhYmxlRmllbGRzIiwiaGlkZGVuQ2FyZEZpZWxkcyIsInNob3dTdGFuZGFsb25lSGVhZGVyIiwiYWN0aXZlTGF5b3V0IiwiY3JlYXRlTGF5b3V0IiwiZWRpdExheW91dCIsIm1hbnVhbEVkaXRMYXlvdXQiLCJtZW51T3BlbiIsInNldE1lbnVPcGVuIiwiTWVzc2FnZUJveCIsInZhcmlhbnQiLCJyb3ciLCJ2aXNpYmxlRmllbGRzIiwiZmllbGREaXNhYmxlZCIsImNhbmNlbGFibGVTdGF0dXNlcyIsImN1cnJlbnRTdGF0dXMiLCJjYW5DYW5jZWwiLCJtYXJnaW5Cb3R0b20iLCJib3JkZXJDb2xvciIsImNvbG9yIiwiZm9udFNpemUiLCJDb2xsZWN0aW9uTWFuYWdlciIsInVzZVBhcmFtcyIsInVzZUxvY2F0aW9uIiwiYWRkTm90aWNlIiwidXNlTm90aWNlIiwic2V0TG9hZGluZyIsImxpc3RMb2FkaW5nIiwic2V0TGlzdExvYWRpbmciLCJzZXRTYXZpbmciLCJzZXRDYW5jZWxsaW5nTWVtYmVyc2hpcCIsInNldERlZmluaXRpb24iLCJzZXRSZWNvcmRzIiwic2V0Q29udHJvbHMiLCJzZXRSZWNvcmQiLCJvcmlnaW5hbFJlY29yZCIsInNldE9yaWdpbmFsUmVjb3JkIiwic2V0UHVibGlzaGVkUmVjb3JkIiwic2V0QWN0aXZlVGFiIiwic2V0RXJyb3IiLCJzZXRSZXBseURyYWZ0Iiwic2V0U2VuZGluZ1JlcGx5IiwicmVjb3JkSWQiLCJnZXQiLCJpc05ldyIsImNhdGVnb3J5IiwicGxhblR5cGUiLCJmZWF0dXJlZCIsImlzRmVhdHVyZWQiLCJpc1BvcHVsYXIiLCJpc01hbnVhbEVkaXRhYmxlUmVjb3JkIiwiY2FuRWRpdEN1cnJlbnRSZWNvcmQiLCJtb2RlIiwiaXNEaXJ0eSIsImhhc0RyYWZ0Q29udGVudCIsImhhc1VucHVibGlzaGVkQ2hhbmdlcyIsImFjdGl2ZSIsImxvYWQiLCJzaG91bGRCbG9jayIsIm5ldyIsIm5leHREcmFmdFJlY29yZCIsImRyYWZ0UmVjb3JkIiwibG9hZEVycm9yIiwidXBkYXRlTGlzdFF1ZXJ5IiwicGF0Y2giLCJuZXh0UGFyYW1zIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlQWRkSXRlbSIsImhhbmRsZVJlbW92ZUl0ZW0iLCJoYW5kbGVNb3ZlSXRlbSIsImhhbmRsZVNhdmVJbnRlbnQiLCJpbnRlbnQiLCJkZWxldGVkIiwicmVxdWVzdEVycm9yIiwiaGFuZGxlRGlzY2FyZENoYW5nZXMiLCJoYW5kbGVDcmVhdGUiLCJoYW5kbGVMaXN0QWN0aW9uIiwidGFyZ2V0UmVjb3JkSWQiLCJoYW5kbGVSZXBseUNoYW5nZSIsImhhbmRsZVNlbmRSZXBseSIsImhhbmRsZUNhbmNlbE1lbWJlcnNoaXAiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJoZWlnaHQiLCJMb2FkZXIiLCJsaXN0Q29sdW1ucyIsIm5leHRTZWFyY2giLCJuZXh0UmVjb3JkSWQiLCJuZXh0T3JkZXIiLCJuZXh0RmllbGRzIiwiUEFUSF9GSUVMRF9QQVRURVJOIiwiUkVRVUlSRURfRklFTERfUEFUVEVSTiIsIlJPVVRFX09QVElPTlMiLCJQQUdFX0xBWU9VVFMiLCJmaWVsZHMiLCJob21lcGFnZSIsImdldEZpZWxkTGFiZWwiLCJmaWVsZEtleSIsImdldFBhdGhPcHRpb25zIiwidW5zaGlmdCIsImlzUGxhaW5PYmplY3QiLCJnZXRGaWxlbmFtZSIsIlVSTCIsImZpbGVuYW1lIiwicG9wIiwicGFyc2VkIiwidHJpbW1lZCIsInRvQWRtaW5FcnJvck1lc3NhZ2UiLCJyZXNwb25zZURhdGEiLCJpc1JlcXVpcmVkRmllbGQiLCJmaWVsZENsYXNzTmFtZSIsImlzSGlkZGVuRWRpdG9yRmllbGQiLCJnZXRJdGVtVGl0bGUiLCJmYWxsYmFja0xhYmVsIiwicHJlZmVycmVkIiwicXVlc3Rpb24iLCJmZWF0dXJlIiwiYnVpbGRTZWN0aW9ucyIsImNvbnRlbnQiLCJsYXlvdXQiLCJ1c2VkIiwic2VjdGlvbnMiLCJzZWN0aW9uIiwic2VjdGlvbkVudHJpZXMiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJhZGQiLCJleHRyYUVudHJpZXMiLCJpbnB1dFZhbHVlIiwicmVxdWlyZWQiLCJpc0ltYWdlRmllbGQiLCJpc1BhdGhGaWVsZCIsInByZXZpZXdVcmwiLCJzaG93UHJldmlldyIsInNlbGVjdGVkRmlsZSIsIk9iamVjdEZpZWxkIiwibmVzdGVkS2V5IiwiRm9ybVNlY3Rpb24iLCJDb250ZW50UGFnZUVkaXRvciIsInBhZ2VMYWJlbCIsInNldFBhZ2VMYWJlbCIsInNldENvbnRlbnQiLCJvcmlnaW5hbENvbnRlbnQiLCJzZXRPcmlnaW5hbENvbnRlbnQiLCJwdWJsaXNoZWRDb250ZW50Iiwic2V0UHVibGlzaGVkQ29udGVudCIsImRpc3BsYXllZENvbnRlbnQiLCJlbnRyeVRpdGxlIiwiaGVyb1RpdGxlIiwic2l0ZU5hbWUiLCJpc01vdW50ZWQiLCJsb2FkUGFnZSIsImdldFBhZ2UiLCJuZXh0RHJhZnRDb250ZW50IiwiZHJhZnREYXRhIiwicHVibGlzaGVkRGF0YSIsImhhbmRsZVNhdmUiLCJzYXZlRXJyb3IiLCJoaXN0b3J5IiwiYmFjayIsImJ1aWxkUGFnZVBhdGgiLCJyZXF1ZXN0TWVkaWEiLCJBc3NldENhcmQiLCJwaWNrZXJNb2RlIiwidGh1bWJuYWlsVXJsIiwiYWx0ZXJuYXRpdmVUZXh0IiwibWltZSIsImV4dCIsIndpZHRoIiwiZm9udFdlaWdodCIsIkRldGFpbFZpZXciLCJvblNlbGVjdCIsImxpbmVIZWlnaHQiLCJjYXB0aW9uIiwic2l6ZUxhYmVsIiwicHJvdmlkZXIiLCJmb2xkZXJQYXRoIiwidXBkYXRlZEF0TGFiZWwiLCJjcmVhdGVkQXRMYWJlbCIsIk1lZGlhTGlicmFyeSIsImZpbGVJZCIsInNldEl0ZW1zIiwiY291bnQiLCJzZXRDb3VudCIsInNldEl0ZW0iLCJvcGVuTGlzdCIsInBpY2tlciIsInNlbGVjdEFzc2V0Iiwic2VsZWN0ZWRJdGVtIiwib3BlbmVyIiwicG9zdE1lc3NhZ2UiLCJjbG9zZSIsImlucHV0Iiwib25jaGFuZ2UiLCJyZWZyZXNoZWRQYXlsb2FkIiwiZGVmYXVsdFZhbHVlIiwibWVkaWFJdGVtIiwicmVxdWVzdEFjY291bnQiLCJBY2NvdW50U2V0dGluZ3MiLCJzdWJtaXR0aW5nIiwic2V0U3VibWl0dGluZyIsInN1Y2Nlc3MiLCJzZXRTdWNjZXNzIiwic2V0RW1haWwiLCJjdXJyZW50UGFzc3dvcmQiLCJzZXRDdXJyZW50UGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsInNldE5ld1Bhc3N3b3JkIiwiY29uZmlybVBhc3N3b3JkIiwic2V0Q29uZmlybVBhc3N3b3JkIiwidGhlbiIsImZpbmFsbHkiLCJvblN1Ym1pdCIsImFzc2lnbiIsInN1Ym1pdEVycm9yIiwibWIiLCJhdXRvQ29tcGxldGUiLCJnYXAiLCJmb3JtYXRCb29raW5nRGF0ZSIsIndlZWtkYXkiLCJkYXkiLCJtb250aCIsInllYXIiLCJob3VyIiwibWludXRlIiwiZm9ybWF0Q3VycmVuY3kiLCJhbW91bnRNaW5vciIsImZvcm1hdFRpbWVBZ28iLCJkaWZmIiwibm93IiwibWludXRlcyIsImZsb29yIiwiaG91cnMiLCJkYXlzIiwiUmVmdW5kUmVxdWVzdHMiLCJ0YWIiLCJzZXRUYWIiLCJwZW5kaW5nUmVxdWVzdHMiLCJzZXRQZW5kaW5nUmVxdWVzdHMiLCJwcm9jZXNzZWRSZXF1ZXN0cyIsInNldFByb2Nlc3NlZFJlcXVlc3RzIiwicHJvY2Vzc2luZ0lkIiwic2V0UHJvY2Vzc2luZ0lkIiwic3VjY2Vzc01hcCIsInNldFN1Y2Nlc3NNYXAiLCJwZW5kaW5nUGF5bG9hZCIsInByb2Nlc3NlZFBheWxvYWQiLCJhbGwiLCJlcnIiLCJpbm5lckVyciIsImhhbmRsZUFwcHJvdmUiLCJyZXF1ZXN0IiwicHJldiIsInIiLCJyZWZ1bmRSZXF1ZXN0U3RhdHVzIiwibmV4dCIsImhhbmRsZVJlamVjdCIsImFjdGl2ZUxpc3QiLCJ1c2VyTmFtZSIsInVzZXJFbWFpbCIsInJlc291cmNlTmFtZSIsInN0YXJ0QXQiLCJ0b3RhbE1pbm9yIiwicmVmdW5kUmVxdWVzdGVkQXQiLCJSRUZVTkRfUkVRVUVTVFNfSFJFRiIsIkNPTlRFTlRfUEFHRV9PUkRFUiIsIkNPTlRFTlRfUEFHRV9MQUJFTFMiLCJTSURFQkFSX1dJRFRIIiwiUkFJTF9XSURUSCIsIml0ZW1NYXRjaGVzU2VhcmNoIiwiYnVpbGRTaWRlYmFyUmVzb3VyY2VJdGVtcyIsInJlc291cmNlUGF0aFByZWZpeCIsInNlbGVjdGVkUHJlZml4ZXMiLCJzZWxlY3RlZCIsInByZWZpeCIsInJlc291cmNlIiwiUmFpbEljb24iLCJjaGlsZHJlbiIsInZpZXdCb3giLCJIb21lSWNvbiIsImQiLCJQZW5jaWxJY29uIiwiTWVkaWFJY29uIiwieCIsInkiLCJyeCIsImN4IiwiY3kiLCJTaWRlYmFyIiwiaXNWaXNpYmxlIiwicGFnZXMiLCJ1c2VTZWxlY3RvciIsInN0YXRlIiwic2Vzc2lvbiIsInNldFNlYXJjaCIsInBlbmRpbmdSZWZ1bmRDb3VudCIsInNldFBlbmRpbmdSZWZ1bmRDb3VudCIsImF2YXRhclJlZiIsInBhZ2VJdGVtcyIsInBhZ2UiLCJjb2xsZWN0aW9uSXRlbXMiLCJvcGVyYXRpb25JdGVtcyIsImN1c3RvbWVySXRlbXMiLCJyZWZ1bmRSZXF1ZXN0c1Zpc2libGUiLCJpc1JlZnVuZFJlcXVlc3RzU2VsZWN0ZWQiLCJsb2FkQ291bnQiLCJpbnRlcnZhbCIsImluaXRpYWwiLCJpc0Rhc2hib2FyZCIsImlzTWVkaWEiLCJzaG93UGFuZWwiLCJoYW5kbGVPdXRzaWRlQ2xpY2siLCJMb2dpbiIsIl9fQVBQX1NUQVRFX18iLCJicmFuZGluZyIsImVycm9yTWVzc2FnZSIsIkJveCIsInAiLCJiYWNrZ3JvdW5kIiwiYmciLCJtaW5IZWlnaHQiLCJib3hTaGFkb3ciLCJib3JkZXJSYWRpdXMiLCJvdmVyZmxvdyIsImZsZXhEaXJlY3Rpb24iLCJjb21wYW55TmFtZSIsIm9iamVjdEZpdCIsIkgyIiwiVGV4dCIsImFzIiwiYWN0aW9uIiwiZmxleEdyb3ciLCJtYXJnaW4iLCJGb3JtR3JvdXAiLCJMYWJlbCIsIklucHV0IiwibXQiLCJCdXR0b24iLCJzaXplIiwiVG9wQmFyIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBQU8sTUFBTUEsMEJBQTBCLEdBQUcsQ0FDeEM7RUFDRUMsRUFBQUEsS0FBSyxFQUFFLFlBQVk7RUFDbkJDLEVBQUFBLEtBQUssRUFBRSxZQUFZO0VBQ25CQyxFQUFBQSxZQUFZLEVBQUUsV0FBVztFQUN6QkMsRUFBQUEsVUFBVSxFQUFFLGFBQWE7RUFDekJDLEVBQUFBLGNBQWMsRUFBRSxhQUFhO0VBQzdCQyxFQUFBQSxXQUFXLEVBQUU7RUFDZixDQUFDLEVBQ0Q7RUFDRUwsRUFBQUEsS0FBSyxFQUFFLFdBQVc7RUFDbEJDLEVBQUFBLEtBQUssRUFBRSxXQUFXO0VBQ2xCQyxFQUFBQSxZQUFZLEVBQUUsVUFBVTtFQUN4QkMsRUFBQUEsVUFBVSxFQUFFLGFBQWE7RUFDekJDLEVBQUFBLGNBQWMsRUFBRSxhQUFhO0VBQzdCQyxFQUFBQSxXQUFXLEVBQUU7RUFDZixDQUFDLEVBQ0Q7RUFDRUwsRUFBQUEsS0FBSyxFQUFFLGVBQWU7RUFDdEJDLEVBQUFBLEtBQUssRUFBRSxlQUFlO0VBQ3RCQyxFQUFBQSxZQUFZLEVBQUUsY0FBYztFQUM1QkMsRUFBQUEsVUFBVSxFQUFFLElBQUk7RUFDaEJDLEVBQUFBLGNBQWMsRUFBRSxJQUFJO0VBQ3BCQyxFQUFBQSxXQUFXLEVBQUU7RUFD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QU0sR0FBRztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7RUFFRCxTQUFTMEksT0FBT0EsQ0FBQzFGLElBQUksRUFBRTtFQUNyQixFQUFBLE9BQU9BLElBQUksQ0FD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0VBRUQsU0FBU3VCLFVBQVVBLENBQUNDLFlBQVksRUFBRTtFQUNoQyxFQUFBLElBQUksQ0FBQ0EsWUFBWSxFQUFFLE9BQU8sSUFBSTtJQUM5QixJQUFJO0VBQUUsSUFBQSxPQUFPQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0YsWUFBWSxDQUFDO0VBQUUsRUFBQSxDQUFDLENBQUMs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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBQSxFQUE2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
