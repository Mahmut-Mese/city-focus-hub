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
.strapi-dashboard {
  min-height: 100%;
  padding: 32px 40px 64px 344px;
  background: #f6f6f9;
  color: #32324d;
}

.strapi-dashboard__inner {
  max-width: 1240px;
  margin: 0 auto;
}

.strapi-dashboard__eyebrow {
  margin: 0 0 4px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.strapi-dashboard__title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
}

.strapi-dashboard__subtitle {
  margin: 10px 0 28px;
  max-width: 780px;
  color: #666687;
  font-size: 1rem;
  line-height: 1.5rem;
}

.strapi-dashboard__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 16px;
}

.strapi-dashboard__card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
}

.strapi-dashboard__card-head {
  padding: 16px 20px 12px;
  border-bottom: 1px solid #f0f0f5;
}

.strapi-dashboard__card-title {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  color: #32324d;
}

.strapi-dashboard__card-body {
  padding: 8px;
}

.strapi-dashboard__list {
  display: flex;
  flex-direction: column;
}

.strapi-dashboard__item {
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

.strapi-dashboard__item:hover {
  background: #f6f6f9;
}

.strapi-dashboard__item-copy {
  min-width: 0;
}

.strapi-dashboard__item-label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: #32324d;
}

.strapi-dashboard__item-meta {
  margin-top: 2px;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #666687;
}

.strapi-dashboard__item-arrow {
  color: #8e8ea9;
  font-size: 1rem;
}

.strapi-dashboard__notice {
  padding: 20px;
}

.strapi-dashboard__notice-title {
  margin: 0 0 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
}

.strapi-dashboard__notice-copy {
  margin: 0;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.5rem;
}

@media (max-width: 960px) {
  .strapi-dashboard {
    padding: 20px 16px 48px;
  }

  .strapi-dashboard__grid {
    grid-template-columns: 1fr;
  }
}
`;

function ShortcutList({ title, items, navigate, meta }) {
  return (
    <section className="strapi-dashboard__card">
      <div className="strapi-dashboard__card-head">
        <h2 className="strapi-dashboard__card-title">{title}</h2>
      </div>
      <div className="strapi-dashboard__card-body">
        <div className="strapi-dashboard__list">
          {items.map((item) => (
            <button
              key={item.href}
              className="strapi-dashboard__item"
              type="button"
              onClick={() => navigate(item.href)}
            >
              <div className="strapi-dashboard__item-copy">
                <div className="strapi-dashboard__item-label">{item.label}</div>
                <div className="strapi-dashboard__item-meta">{meta}</div>
              </div>
              <span className="strapi-dashboard__item-arrow">→</span>
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
      <div className="strapi-dashboard">
        <div className="strapi-dashboard__inner">
          <p className="strapi-dashboard__eyebrow">Home</p>
          <h1 className="strapi-dashboard__title">Content Manager</h1>
          <p className="strapi-dashboard__subtitle">
            Start from the same client-facing content areas used in Strapi. Use the shortcuts below to jump
            into single pages and collection content.
          </p>

          <div className="strapi-dashboard__grid">
            <ShortcutList
              title="Single Types"
              items={PRIMARY_PAGES}
              navigate={navigate}
              meta="Edit structured page content"
            />

            <section className="strapi-dashboard__card">
              <div className="strapi-dashboard__card-head">
                <h2 className="strapi-dashboard__card-title">Workspace</h2>
              </div>
              <div className="strapi-dashboard__notice">
                <h3 className="strapi-dashboard__notice-title">Comparison environment</h3>
                <p className="strapi-dashboard__notice-copy">
                  This AdminJS workspace is still attached to the copied comparison database. Content saved here
                  will not change the live frontend until we switch the data source.
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
