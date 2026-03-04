import React from 'react';
import { useNavigate } from 'react-router';

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

@media (max-width: 960px) {
  .admin-dashboard {
    padding: 20px 16px 48px;
  }

  .admin-dashboard__grid {
    grid-template-columns: 1fr;
  }
}
`;

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

export default function Dashboard() {
  const navigate = useNavigate();

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
                  This AdminJS workspace is the active content source for the frontend and backend.
                </p>
              </div>
            </section>

            <ShortcutList
              title="Collections"
              items={COLLECTIONS}
              navigate={navigate}
              meta="Manage repeatable content"
            />
          </div>
        </div>
      </div>
    </>
  );
}
