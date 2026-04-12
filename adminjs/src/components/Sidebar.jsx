import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { ADMIN_RESOURCE_DEFINITIONS, buildAdminResourceHref } from '../resource-definitions.js';

const REFUND_REQUESTS_HREF = '/admin/pages/refund-requests';

const CONTENT_PAGE_ORDER = [
  'site-settings',
  'homepage',
  'about-page',
  'blog-page',
  'pricing-page',
  'faq-page',
  'meeting-rooms-page',
  'virtual-office-page',
  'contact-page',
  'privacy-policy-page',
  'terms-page',
];

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
  'terms-page': 'Terms Page',
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
  return ADMIN_RESOURCE_DEFINITIONS
    .filter((definition) => definition.sidebarSection === section)
    .map((definition) => {
      const resourcePathPrefix = `/admin/resources/${definition.table}`;
      const href = definition.sidebarHref || buildAdminResourceHref(definition.table);
      const selectedPrefixes = [href, resourcePathPrefix];

      return {
        id: definition.table,
        label: definition.sidebarLabel || definition.label,
        href,
        selected: selectedPrefixes.some((prefix) => pathname.startsWith(prefix)),
      };
    })
    .filter((resource) => itemMatchesSearch(resource.label, search));
}

function RailIcon({ children }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

function HomeIcon() {
  return (
    <RailIcon>
      <path d="M4.5 10.5 12 4l7.5 6.5" />
      <path d="M6.5 9.5V19h11V9.5" />
      <path d="M10 19v-5h4v5" />
    </RailIcon>
  );
}

function PencilIcon() {
  return (
    <RailIcon>
      <path d="m3.5 20.5 4.25-1 9.75-9.75-3.25-3.25L4.5 16.25l-1 4.25Z" />
      <path d="m13.5 6.5 3.25 3.25" />
      <path d="M7.5 19.5h13" />
    </RailIcon>
  );
}

function MediaIcon() {
  return (
    <RailIcon>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="m5.5 16 4-4 3 3 2-2 4 3" />
    </RailIcon>
  );
}

export default function Sidebar({ isVisible }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pages = useSelector((state) => state.pages);
  const session = useSelector((state) => state.session);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingRefundCount, setPendingRefundCount] = useState(0);
  const avatarRef = useRef(null);

  const pageItems = useMemo(
    () => CONTENT_PAGE_ORDER
      .map((pageName) => pages.find((page) => page.name === pageName))
      .filter(Boolean)
      .map((page) => ({
        id: page.name,
        label: CONTENT_PAGE_LABELS[page.name] ?? page.name,
        href: `/admin/pages/${page.name}`,
        selected: location.pathname.startsWith(`/admin/pages/${page.name}`),
      }))
      .filter((page) => itemMatchesSearch(page.label, search)),
    [location.pathname, pages, search],
  );

  const collectionItems = useMemo(
    () => buildSidebarResourceItems('collections', location.pathname, search),
    [location.pathname, search],
  );

  const operationItems = useMemo(
    () => buildSidebarResourceItems('orders', location.pathname, search),
    [location.pathname, search],
  );

  const customerItems = useMemo(
    () => buildSidebarResourceItems('customers', location.pathname, search),
    [location.pathname, search],
  );

  const refundRequestsVisible = useMemo(
    () => itemMatchesSearch('Refund Requests', search),
    [search],
  );

  const isRefundRequestsSelected = location.pathname.startsWith(REFUND_REQUESTS_HREF);

  useEffect(() => {
    let isActive = true;

    const loadCount = async () => {
      try {
        const response = await fetch('/admin/api/admin/bookings/refund-requests', { credentials: 'same-origin' });
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
    return () => { isActive = false; clearInterval(interval); };
  }, []);

  const initial = (session?.email?.[0] ?? 'C').toUpperCase();
  const isDashboard = location.pathname === '/admin' || location.pathname === '/admin/';
  const isMedia = location.pathname.startsWith('/admin/pages/media-library');
  const showPanel = !isMedia;

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (!avatarRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuOpen]);

  return (
    <>
      <style>{STYLES}</style>
      <div className={`admin-sidebar-shell${showPanel ? '' : ' admin-sidebar-shell--rail-only'}${isVisible ? '' : ' admin-sidebar-shell--hidden'}`}>
        <div className="admin-sidebar-rail">
          <img
            className="admin-sidebar-logo"
            src="/admin-assets/client-mark.svg"
            alt="The Leadenhall Works"
          />
          <button
            className={`admin-rail-button${isDashboard ? ' admin-rail-button--active' : ''}`}
            type="button"
            onClick={() => navigate('/admin')}
          >
            <HomeIcon />
          </button>
          <button
            className={`admin-rail-button${!isDashboard && !isMedia ? ' admin-rail-button--active' : ''}`}
            type="button"
            onClick={() => navigate('/admin/pages/site-settings')}
          >
            <PencilIcon />
          </button>
          <button
            className={`admin-rail-button${isMedia ? ' admin-rail-button--active' : ''}`}
            type="button"
            onClick={() => navigate('/admin/pages/media-library')}
          >
            <MediaIcon />
          </button>
          <div className="admin-rail-spacer" />
          <div className="admin-avatar" ref={avatarRef}>
            <button
              className="admin-avatar__button"
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
            >
              {initial}
            </button>
            {menuOpen ? (
              <div className="admin-avatar__menu">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/admin/pages/account');
                  }}
                >
                  Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.assign('/admin/logout');
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {showPanel ? (
        <div className="admin-sidebar-panel">
          <div className="admin-sidebar-header">Content Manager</div>
          <div className="admin-sidebar-body">
            <div className="admin-search">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="admin-group">
              <div className="admin-group__head">
                <span className="admin-group__label">Collection Types</span>
                <span className="admin-group__count">{collectionItems.length}</span>
              </div>
              {collectionItems.map((item) => (
                <button
                  key={item.id}
                  className={`admin-nav-link${item.selected ? ' admin-nav-link--selected' : ''}`}
                  type="button"
                  onClick={() => navigate(item.href)}
                >
                  <span className="admin-nav-link__text">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="admin-group">
              <div className="admin-group__head">
                <span className="admin-group__label">Customers</span>
                <span className="admin-group__count">{customerItems.length}</span>
              </div>
              {customerItems.map((item) => (
                <button
                  key={item.id}
                  className={`admin-nav-link${item.selected ? ' admin-nav-link--selected' : ''}`}
                  type="button"
                  onClick={() => navigate(item.href)}
                >
                  <span className="admin-nav-link__text">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="admin-group">
              <div className="admin-group__head">
                <span className="admin-group__label">Orders</span>
                <span className="admin-group__count">{operationItems.length + (refundRequestsVisible ? 1 : 0)}</span>
              </div>
              {operationItems.map((item) => (
                <button
                  key={item.id}
                  className={`admin-nav-link${item.selected ? ' admin-nav-link--selected' : ''}`}
                  type="button"
                  onClick={() => navigate(item.href)}
                >
                  <span className="admin-nav-link__text">{item.label}</span>
                </button>
              ))}
              {refundRequestsVisible && (
                <button
                  className={`admin-nav-link${isRefundRequestsSelected ? ' admin-nav-link--selected' : ''}`}
                  type="button"
                  onClick={() => navigate(REFUND_REQUESTS_HREF)}
                >
                  <span className="admin-nav-link__text">Refund Requests</span>
                  {pendingRefundCount > 0 && (
                    <span className="admin-nav-link__icon" style={{ width: 'auto', fontSize: '0.6875rem', fontWeight: 700, color: '#c72e3a' }}>
                      {pendingRefundCount}
                    </span>
                  )}
                </button>
              )}
            </div>

            <div className="admin-group">
              <div className="admin-group__head">
                <span className="admin-group__label">Single Types</span>
                <span className="admin-group__count">{pageItems.length}</span>
              </div>
              {pageItems.map((item) => (
                <button
                  key={item.id}
                  className={`admin-nav-link${item.selected ? ' admin-nav-link--selected' : ''}`}
                  type="button"
                  onClick={() => navigate(item.href)}
                >
                  <span className="admin-nav-link__text">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        ) : null}
      </div>
    </>
  );
}
