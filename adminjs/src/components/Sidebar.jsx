import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

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

const RESOURCE_LABELS = {
  'blog-posts': 'Blog Post',
  'faq-items': 'FAQ Item',
  'meeting-rooms': 'Meeting Room',
  'pricing-plans': 'Pricing Plan',
};

const SIDEBAR_WIDTH = 304;
const RAIL_WIDTH = 48;

const STYLES = `
.strapi-sidebar-shell {
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

.strapi-sidebar-shell--rail-only {
  width: ${RAIL_WIDTH}px;
}

.strapi-sidebar-shell--hidden {
  transform: translateX(-${SIDEBAR_WIDTH}px);
}

.strapi-sidebar-rail {
  width: 48px;
  border-right: 1px solid #eaebf0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 10px;
  background: #ffffff;
}

.strapi-sidebar-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
  margin-bottom: 2px;
}

.strapi-rail-button {
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

.strapi-rail-button--active {
  background: #f0ebff;
  color: #7b79ff;
}

.strapi-rail-button svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.strapi-rail-spacer {
  flex: 1;
}

.strapi-avatar {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: #4945ff;
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 700;
}

.strapi-sidebar-panel {
  width: 256px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #ffffff;
}

.strapi-sidebar-header {
  padding: 14px 16px;
  border-bottom: 1px solid #eaebf0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: #32324d;
}

.strapi-sidebar-body {
  padding: 14px 8px 18px;
  overflow-y: auto;
}

.strapi-search {
  padding: 0 8px 12px;
}

.strapi-search input {
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

.strapi-search input:focus {
  outline: none;
  border-color: #4945ff;
}

.strapi-group {
  margin-top: 10px;
}

.strapi-group__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 8px;
}

.strapi-group__label {
  font-size: 0.6875rem;
  line-height: 1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #8e8ea9;
}

.strapi-group__count {
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

.strapi-nav-link {
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

.strapi-nav-link:hover {
  background: #f6f6f9;
}

.strapi-nav-link--selected {
  background: #f0ebff;
  color: #4945ff;
}

.strapi-nav-link__text {
  min-width: 0;
  font-size: 0.875rem;
  line-height: 1.375rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.strapi-nav-link__icon {
  width: 12px;
  color: #8e8ea9;
  font-size: 10px;
}

@media (max-width: 960px) {
  .strapi-sidebar-shell {
    box-shadow: 0 18px 48px rgba(33, 33, 52, 0.12);
  }

  .strapi-sidebar-shell--hidden {
    transform: translateX(-${SIDEBAR_WIDTH}px);
  }
}

@media (min-width: 961px) {
  .strapi-sidebar-shell,
  .strapi-sidebar-shell--hidden {
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
    () => ([
      { id: 'blog-posts', href: '/admin/pages/blog-posts' },
      { id: 'faq-items', href: '/admin/pages/faq-items' },
      { id: 'meeting-rooms', href: '/admin/pages/meeting-rooms' },
      { id: 'pricing-plans', href: '/admin/pages/pricing-plans' },
    ])
      .map((resource) => ({
        id: resource.id,
        label: RESOURCE_LABELS[resource.id] ?? resource.id,
        href: resource.href,
        selected: location.pathname.startsWith(resource.href),
      }))
      .filter((resource) => itemMatchesSearch(resource.label, search)),
    [location.pathname, search],
  );

  const initial = (session?.email?.[0] ?? 'C').toUpperCase();
  const isDashboard = location.pathname === '/admin' || location.pathname === '/admin/';
  const isMedia = location.pathname.startsWith('/admin/pages/media-library');
  const showPanel = !isMedia;

  return (
    <>
      <style>{STYLES}</style>
      <div className={`strapi-sidebar-shell${showPanel ? '' : ' strapi-sidebar-shell--rail-only'}${isVisible ? '' : ' strapi-sidebar-shell--hidden'}`}>
        <div className="strapi-sidebar-rail">
          <img
            className="strapi-sidebar-logo"
            src="/admin-assets/client-mark.svg"
            alt="The Leadenhall Works"
          />
          <button
            className={`strapi-rail-button${isDashboard ? ' strapi-rail-button--active' : ''}`}
            type="button"
            onClick={() => navigate('/admin')}
          >
            <HomeIcon />
          </button>
          <button
            className={`strapi-rail-button${!isDashboard && !isMedia ? ' strapi-rail-button--active' : ''}`}
            type="button"
            onClick={() => navigate('/admin/pages/site-settings')}
          >
            <PencilIcon />
          </button>
          <button
            className={`strapi-rail-button${isMedia ? ' strapi-rail-button--active' : ''}`}
            type="button"
            onClick={() => navigate('/admin/pages/media-library')}
          >
            <MediaIcon />
          </button>
          <div className="strapi-rail-spacer" />
          <div className="strapi-avatar">{initial}</div>
        </div>

        {showPanel ? (
        <div className="strapi-sidebar-panel">
          <div className="strapi-sidebar-header">Content Manager</div>
          <div className="strapi-sidebar-body">
            <div className="strapi-search">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="strapi-group">
              <div className="strapi-group__head">
                <span className="strapi-group__label">Collection Types</span>
                <span className="strapi-group__count">{collectionItems.length}</span>
              </div>
              {collectionItems.map((item) => (
                <button
                  key={item.id}
                  className={`strapi-nav-link${item.selected ? ' strapi-nav-link--selected' : ''}`}
                  type="button"
                  onClick={() => navigate(item.href)}
                >
                  <span className="strapi-nav-link__text">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="strapi-group">
              <div className="strapi-group__head">
                <span className="strapi-group__label">Single Types</span>
                <span className="strapi-group__count">{pageItems.length}</span>
              </div>
              {pageItems.map((item) => (
                <button
                  key={item.id}
                  className={`strapi-nav-link${item.selected ? ' strapi-nav-link--selected' : ''}`}
                  type="button"
                  onClick={() => navigate(item.href)}
                >
                  <span className="strapi-nav-link__text">{item.label}</span>
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
