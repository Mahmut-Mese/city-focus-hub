(function (React, reactRouter, designSystem, adminjs, reactRedux) {
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
  const STYLES$4 = `
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
  function ShortcutList({
    title,
    items,
    navigate,
    meta
  }) {
    return /*#__PURE__*/React__default.default.createElement("section", {
      className: "strapi-dashboard__card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard__card-head"
    }, /*#__PURE__*/React__default.default.createElement("h2", {
      className: "strapi-dashboard__card-title"
    }, title)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard__card-body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard__list"
    }, items.map(item => /*#__PURE__*/React__default.default.createElement("button", {
      key: item.href,
      className: "strapi-dashboard__item",
      type: "button",
      onClick: () => navigate(item.href)
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard__item-copy"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard__item-label"
    }, item.label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard__item-meta"
    }, meta)), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-dashboard__item-arrow"
    }, "\u2192"))))));
  }
  function Dashboard() {
    const navigate = reactRouter.useNavigate();
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$4), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard__inner"
    }, /*#__PURE__*/React__default.default.createElement("p", {
      className: "strapi-dashboard__eyebrow"
    }, "Home"), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "strapi-dashboard__title"
    }, "Content Manager"), /*#__PURE__*/React__default.default.createElement("p", {
      className: "strapi-dashboard__subtitle"
    }, "Start from the same client-facing content areas used in Strapi. Use the shortcuts below to jump into single pages and collection content."), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard__grid"
    }, /*#__PURE__*/React__default.default.createElement(ShortcutList, {
      title: "Single Types",
      items: PRIMARY_PAGES,
      navigate: navigate,
      meta: "Edit structured page content"
    }), /*#__PURE__*/React__default.default.createElement("section", {
      className: "strapi-dashboard__card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard__card-head"
    }, /*#__PURE__*/React__default.default.createElement("h2", {
      className: "strapi-dashboard__card-title"
    }, "Workspace")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-dashboard__notice"
    }, /*#__PURE__*/React__default.default.createElement("h3", {
      className: "strapi-dashboard__notice-title"
    }, "Comparison environment"), /*#__PURE__*/React__default.default.createElement("p", {
      className: "strapi-dashboard__notice-copy"
    }, "This AdminJS workspace is still attached to the copied comparison database. Content saved here will not change the live frontend until we switch the data source."))), /*#__PURE__*/React__default.default.createElement(ShortcutList, {
      title: "Collections",
      items: COLLECTIONS,
      navigate: navigate,
      meta: "Manage repeatable content"
    })))));
  }

  const MULTILINE_FIELD_PATTERN$1 = /(description|content|message|body|subtitle|excerpt|intro|hours|address|text|paragraph|overview|challenge|result|answer)/i;
  const IMAGE_FIELD_PATTERN$1 = /(image|coverImage|contentImages)/i;
  const BOOLEAN_FIELD_PATTERN = /^(featured|isFeatured|isPopular)$/i;
  const FULL_WIDTH_FIELD_PATTERN$1 = /(description|content|answer|excerpt|contentImages|coverImage|image|features|badges|tags)$/i;
  const STYLES$3 = `
.strapi-editor {
  min-height: 100%;
  padding: 32px 40px 64px 344px;
  background: #f6f6f9;
  color: #32324d;
}
.strapi-editor__inner {
  max-width: 1240px;
  margin: 0 auto;
}
.strapi-back {
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
.strapi-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 12px;
}
.strapi-meta {
  margin-bottom: 4px;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.strapi-title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
}
.strapi-status {
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
.strapi-kebab {
  width: 2rem;
  height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
}
.strapi-tabs {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eaeaef;
}
.strapi-tab {
  position: relative;
  border: 0;
  background: transparent;
  padding: 0 0 12px;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
}
.strapi-tab--active { color: #4945ff; }
.strapi-tab--active::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -1px;
  height: 2px;
  background: #4945ff;
}
.strapi-layout {
  display: grid;
  grid-template-columns: minmax(0,1fr) 232px;
  gap: 16px;
  align-items: start;
}
.strapi-main-card,.strapi-side-card,.strapi-list-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(33,33,52,.06);
}
.strapi-main-card { padding: 24px; }
.strapi-side-card + .strapi-side-card { margin-top: 12px; }
.strapi-side-card__head {
  padding: 14px 16px 8px;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.strapi-side-card__body { padding: 0 12px 12px; }
.strapi-side-button-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  position: relative;
}
.strapi-side-button,.strapi-side-button--secondary {
  width: 100%;
  min-height: 2.25rem;
  border-radius: 4px;
  font-size: .8125rem;
  font-weight: 600;
}
.strapi-side-button {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #fff;
}
.strapi-side-button--secondary {
  border: 1px solid #dcdce4;
  background: #fff;
  color: #32324d;
}
.strapi-side-button:disabled,
.strapi-side-button--secondary:disabled,
.strapi-primary:disabled,
.strapi-secondary:disabled {
  border-color: #dcdce4;
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}
.strapi-side-action-menu {
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
.strapi-side-action-menu__item {
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
.strapi-side-action-menu__item:hover {
  background: #f6f6f9;
}
.strapi-side-action-menu__item--danger {
  color: #d02b20;
}
.strapi-side-action-menu__item:disabled {
  background: transparent;
  color: #8e8ea9;
  cursor: not-allowed;
}
.strapi-side-action-menu__icon {
  width: 18px;
  color: inherit;
  text-align: center;
}
.strapi-side-button--menu {
  width: 2rem;
  flex: 0 0 2rem;
}
.strapi-section + .strapi-section { margin-top: 20px; }
.strapi-field-grid {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 20px 24px;
}
.strapi-field--full { grid-column: 1 / -1; }
.strapi-label {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 6px;
  color: #32324d;
  font-size: .75rem;
  font-weight: 600;
}
.strapi-label__required { color: #d02b20; }
.strapi-input,.strapi-textarea,.strapi-search-input {
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
.strapi-input { min-height: 2.5rem; }
.strapi-textarea { min-height: 5.75rem; resize: vertical; }
.strapi-input:focus,.strapi-textarea:focus,.strapi-search-input:focus {
  border-color: #4945ff;
  box-shadow: 0 0 0 1px #4945ff;
}
.strapi-input:disabled,
.strapi-textarea:disabled {
  background: #f6f6f9;
  color: #666687;
  cursor: not-allowed;
}
.strapi-repeatable {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}
.strapi-repeatable__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 10px;
  border-bottom: 1px solid #f0f0f5;
}
.strapi-repeatable__title { font-size: .75rem; font-weight: 600; }
.strapi-repeatable__count { color: #8e8ea9; font-size: .75rem; }
.strapi-repeatable__item + .strapi-repeatable__item { border-top: 1px solid #f0f0f5; }
.strapi-repeatable__summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
}
.strapi-repeatable__summary::-webkit-details-marker { display: none; }
.strapi-repeatable__summary-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.strapi-repeatable__bullet {
  width: 20px; height: 20px;
  border-radius: 999px;
  background: #f0f0f5;
  color: #666687;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: .625rem;
}
.strapi-repeatable__name { font-size: .875rem; font-weight: 600; }
.strapi-repeatable__actions {
  display: flex; align-items: center; gap: 10px;
  color: #8e8ea9;
}
.strapi-repeatable__icon-button {
  border: 0; background: transparent; color: inherit; cursor: pointer;
}
.strapi-repeatable__icon-button:disabled,
.strapi-repeatable__add:disabled {
  color: #8e8ea9;
  cursor: not-allowed;
}
.strapi-repeatable__body { padding: 16px; }
.strapi-repeatable__add {
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
.strapi-toggle {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .625rem .875rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
}
.strapi-toggle:has(input:disabled) {
  background: #f6f6f9;
  color: #666687;
}
.strapi-media {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  padding: 16px;
}
.strapi-media__canvas {
  min-height: 140px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fafafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.strapi-media__stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.strapi-media__thumb {
  max-width: 240px;
  max-height: 140px;
  object-fit: cover;
}
.strapi-media__actions {
  display: flex;
  gap: 4px;
}
.strapi-media__action {
  width: 2rem; height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
}
.strapi-media__action:disabled {
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}
.strapi-media__filename { color: #666687; font-size: .75rem; }
.strapi-media__source { margin-top: 10px; }
.strapi-list-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}
.strapi-list-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}
.strapi-search-wrap { width: 280px; }
.strapi-list-meta {
  margin: 12px 0 32px;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.strapi-toolbar-cluster {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}
.strapi-toolbar-button {
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
.strapi-toolbar-button--icon {
  width: 2.5rem;
  padding: 0;
}
.strapi-toolbar-button--active {
  border-color: #4945ff;
  color: #4945ff;
}
.strapi-toolbar-search {
  width: 280px;
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  padding: 0 0.875rem;
  font-size: 0.875rem;
}
.strapi-list-popover {
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
.strapi-list-popover__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}
.strapi-list-popover__title {
  font-size: 1rem;
  font-weight: 700;
}
.strapi-list-popover__reset {
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
}
.strapi-list-popover__group + .strapi-list-popover__group {
  margin-top: 16px;
}
.strapi-list-popover__label {
  display: block;
  margin-bottom: 8px;
  color: #666687;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.strapi-list-popover__select {
  width: 100%;
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  padding: 0 0.75rem;
  font-size: 0.875rem;
}
.strapi-list-popover__check {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: 0.875rem;
}
.strapi-list-popover__check input {
  width: 1.25rem;
  height: 1.25rem;
}
.strapi-list-card__head {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.strapi-list-table {
  width: 100%;
  border-collapse: collapse;
}
.strapi-list-table th {
  padding: 10px 16px;
  text-align: left;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.strapi-list-table td {
  padding: 14px 16px;
  border-top: 1px solid #f0f0f5;
  font-size: .875rem;
  vertical-align: middle;
}
.strapi-list-row-menu-cell {
  position: relative;
  width: 44px;
}
.strapi-list-row-menu-trigger {
  width: 2rem;
  height: 2rem;
  border: 0;
  background: transparent;
  color: #8e8ea9;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}
.strapi-list-row-menu {
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
.strapi-list-row-menu__item {
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
.strapi-list-row-menu__item:hover {
  background: #f6f6f9;
}
.strapi-list-row-menu__item--danger {
  color: #d02b20;
}
.strapi-list-row-menu__icon {
  width: 18px;
  color: inherit;
  text-align: center;
}
.strapi-list-table th button {
  border: 0;
  background: transparent;
  padding: 0;
  color: inherit;
  font: inherit;
  text-transform: inherit;
  cursor: pointer;
}
.strapi-list-table tr { cursor: pointer; }
.strapi-list-table tr:hover { background: #fafafb; }
.strapi-list-status {
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
.strapi-primary {
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
.strapi-secondary {
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
.strapi-list-boolean {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  font-size: 0.625rem;
  font-weight: 700;
}
.strapi-list-boolean--yes {
  background: #2f6846;
  color: #fff;
}
.strapi-list-boolean--no {
  background: #d02b20;
  color: #fff;
}
@media (max-width: 1180px) {
  .strapi-layout { grid-template-columns: 1fr; }
}
@media (max-width: 960px) {
  .strapi-editor { padding: 20px 16px 48px; }
  .strapi-field-grid { grid-template-columns: 1fr; }
  .strapi-list-toolbar { flex-direction: column; align-items: stretch; }
  .strapi-search-wrap { width: 100%; }
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
  function getDisplayTitle(definition, record) {
    if (!record) {
      return definition.label;
    }
    return record[definition.titleField] || definition.label;
  }
  async function requestPage(pageName, options = {}) {
    const searchParams = new URLSearchParams(options.query ?? {});
    const queryString = searchParams.toString();
    const response = await fetch(`/admin/api/pages/${pageName}${queryString ? `?${queryString}` : ''}`, {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'same-origin'
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.message ?? 'Request failed');
    }
    return payload;
  }
  function MediaField({
    label,
    value,
    path,
    onChange,
    disabled
  }) {
    const urls = Array.isArray(value) ? value : [value].filter(Boolean);
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-field strapi-field--full"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "strapi-label"
    }, label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media__canvas"
    }, urls.length ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media__stack"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      className: "strapi-media__thumb",
      src: urls[0],
      alt: label
    }), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-media__action",
      type: "button",
      onClick: () => window.open(urls[0], '_blank', 'noopener,noreferrer')
    }, "\u2197"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-media__action",
      type: "button",
      disabled: disabled,
      onClick: () => onChange(path, Array.isArray(value) ? [] : '')
    }, "\u2715")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media__filename"
    }, urls[0].split('/').pop())) : /*#__PURE__*/React__default.default.createElement("div", null, "No media selected.")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media__source"
    }, Array.isArray(value) ? /*#__PURE__*/React__default.default.createElement("textarea", {
      className: "strapi-textarea",
      value: value.join('\n'),
      disabled: disabled,
      onChange: event => onChange(path, event.target.value.split('\n').map(item => item.trim()).filter(Boolean)),
      placeholder: "One image URL per line"
    }) : /*#__PURE__*/React__default.default.createElement("input", {
      className: "strapi-input",
      value: value ?? '',
      disabled: disabled,
      onChange: event => onChange(path, event.target.value),
      placeholder: "https://..."
    }))));
  }
  function PrimitiveField$1({
    field,
    value,
    path,
    onChange,
    disabled
  }) {
    const label = toLabel$1(field);
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
      return /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-field strapi-field--full"
      }, /*#__PURE__*/React__default.default.createElement("label", {
        className: "strapi-label"
      }, label), /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-toggle"
      }, /*#__PURE__*/React__default.default.createElement("span", null, value ? 'Enabled' : 'Disabled'), /*#__PURE__*/React__default.default.createElement("input", {
        type: "checkbox",
        checked: Boolean(value),
        disabled: disabled,
        onChange: event => onChange(path, event.target.checked)
      })));
    }
    const className = FULL_WIDTH_FIELD_PATTERN$1.test(field) ? 'strapi-field strapi-field--full' : 'strapi-field';
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: className
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "strapi-label"
    }, label, field !== 'sortOrder' && !BOOLEAN_FIELD_PATTERN.test(field) ? /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-label__required"
    }, "*") : null), MULTILINE_FIELD_PATTERN$1.test(field) ? /*#__PURE__*/React__default.default.createElement("textarea", {
      className: "strapi-textarea",
      value: value ?? '',
      disabled: disabled,
      onChange: event => onChange(path, parseInputValue$1(event.target.value, value))
    }) : /*#__PURE__*/React__default.default.createElement("input", {
      className: "strapi-input",
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
    disabled
  }) {
    const label = toLabel$1(field);
    const items = Array.isArray(value) ? value : [];
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-field strapi-field--full"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "strapi-label"
    }, label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__head"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__title"
    }, label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__count"
    }, items.length, " entries"))), items.map((item, index) => /*#__PURE__*/React__default.default.createElement("details", {
      key: `${field}-${index}`,
      className: "strapi-repeatable__item",
      open: index === 0
    }, /*#__PURE__*/React__default.default.createElement("summary", {
      className: "strapi-repeatable__summary"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__summary-left"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-repeatable__bullet"
    }, "\u25BC"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-repeatable__name"
    }, typeof item === 'string' ? item || `${label} ${index + 1}` : item?.text || `${label} ${index + 1}`)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-repeatable__icon-button",
      type: "button",
      disabled: disabled,
      onClick: event => {
        event.preventDefault();
        onRemoveItem([...path, index]);
      }
    }, "\uD83D\uDDD1"), /*#__PURE__*/React__default.default.createElement("span", null, "\u22EE\u22EE"))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-field-grid"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-field strapi-field--full"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "strapi-label"
    }, label === 'Tags' ? 'Text' : label.slice(0, -1) || label), /*#__PURE__*/React__default.default.createElement("input", {
      className: "strapi-input",
      value: typeof item === 'string' ? item : item?.text ?? '',
      disabled: disabled,
      onChange: event => onChange([...path, index], {
        text: event.target.value
      })
    })))))), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-repeatable__add",
      type: "button",
      disabled: disabled,
      onClick: () => onAddItem(path, {
        text: ''
      })
    }, "+ Add an entry")));
  }
  function FieldRenderer$1({
    field,
    value,
    path,
    onChange,
    onAddItem,
    onRemoveItem,
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
        disabled: disabled
      });
    }
    return /*#__PURE__*/React__default.default.createElement(PrimitiveField$1, {
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
        className: "strapi-list-status"
      }, value);
    }
    if ((field === 'featured' || field === 'isFeatured' || field === 'isPopular') && (value === 'Yes' || value === 'No')) {
      return /*#__PURE__*/React__default.default.createElement("span", {
        className: `strapi-list-boolean ${value === 'Yes' ? 'strapi-list-boolean--yes' : 'strapi-list-boolean--no'}`
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
      className: "strapi-editor"
    }, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$3), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-editor__inner"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-header"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-meta"
    }, "Collection Type"), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "strapi-title"
    }, definition.label)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-primary",
      type: "button",
      onClick: onCreate
    }, "+ Create new entry"))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-meta"
    }, records.length, " entries found"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-toolbar"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-toolbar-cluster"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: `strapi-toolbar-button strapi-toolbar-button--icon${showSearch ? ' strapi-toolbar-button--active' : ''}`,
      type: "button",
      onClick: () => setShowSearch(current => !current)
    }, "\uD83D\uDD0D"), showSearch ? /*#__PURE__*/React__default.default.createElement("input", {
      className: "strapi-toolbar-search",
      value: searchValue,
      onChange: event => setSearchValue(event.target.value),
      placeholder: "Search",
      autoFocus: true
    }) : null, /*#__PURE__*/React__default.default.createElement("button", {
      className: `strapi-toolbar-button${showFilters ? ' strapi-toolbar-button--active' : ''}`,
      type: "button",
      onClick: () => {
        setShowFilters(current => !current);
        setShowDisplayed(false);
      }
    }, "Filters"), showFilters ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-popover",
      style: {
        left: showSearch ? 332 : 52,
        right: 'auto'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-popover__head"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-popover__title"
    }, "Filters"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-list-popover__reset",
      type: "button",
      onClick: onResetFilters
    }, "Reset")), controls.filters.map(filter => /*#__PURE__*/React__default.default.createElement("div", {
      key: filter.field,
      className: "strapi-list-popover__group"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "strapi-list-popover__label"
    }, filter.label), /*#__PURE__*/React__default.default.createElement("select", {
      className: "strapi-list-popover__select",
      value: controls.activeFilters[filter.field] ?? '',
      onChange: event => onSetFilter(filter.field, event.target.value)
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: ""
    }, "All"), filter.options.map(option => /*#__PURE__*/React__default.default.createElement("option", {
      key: option,
      value: option
    }, option)))))) : null), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-actions"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-toolbar-cluster"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: `strapi-toolbar-button strapi-toolbar-button--icon${showDisplayed ? ' strapi-toolbar-button--active' : ''}`,
      type: "button",
      onClick: () => {
        setShowDisplayed(current => !current);
        setShowFilters(false);
      }
    }, "\u2699"), showDisplayed ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-popover"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-popover__head"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-popover__title"
    }, "Displayed fields"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-list-popover__reset",
      type: "button",
      onClick: onResetDisplayedFields
    }, "Reset")), controls.availableFields.map(field => /*#__PURE__*/React__default.default.createElement("label", {
      key: field.field,
      className: "strapi-list-popover__check"
    }, /*#__PURE__*/React__default.default.createElement("input", {
      type: "checkbox",
      checked: controls.displayedFields.includes(field.field),
      onChange: event => onToggleDisplayedField(field.field, event.target.checked)
    }), /*#__PURE__*/React__default.default.createElement("span", null, field.label)))) : null))), /*#__PURE__*/React__default.default.createElement("section", {
      className: "strapi-list-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-list-card__head"
    }, /*#__PURE__*/React__default.default.createElement("strong", null, definition.label), /*#__PURE__*/React__default.default.createElement("span", null, loading ? 'Loading...' : `${records.length} entries`)), /*#__PURE__*/React__default.default.createElement("table", {
      className: "strapi-list-table"
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
      className: "strapi-list-row-menu-cell"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-list-row-menu-trigger",
      type: "button",
      onClick: event => {
        event.stopPropagation();
        setOpenMenuId(current => current === record.id ? null : record.id);
      }
    }, "\u2026"), openMenuId === record.id ? /*#__PURE__*/React__default.default.createElement("div", {
      ref: menuRef,
      className: "strapi-list-row-menu",
      onClick: event => event.stopPropagation()
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-list-row-menu__item",
      type: "button",
      onClick: () => {
        setOpenMenuId(null);
        onOpenRecord(record.id);
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-list-row-menu__icon"
    }, "\u270E"), /*#__PURE__*/React__default.default.createElement("span", null, "Edit")), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-list-row-menu__item",
      type: "button",
      onClick: () => {
        setOpenMenuId(null);
        onDuplicateRecord(record.id);
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-list-row-menu__icon"
    }, "\u29C9"), /*#__PURE__*/React__default.default.createElement("span", null, "Duplicate")), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-list-row-menu__item strapi-list-row-menu__item--danger",
      type: "button",
      onClick: () => {
        setOpenMenuId(null);
        onDeleteRecord(record.id);
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-list-row-menu__icon"
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
      className: "strapi-editor"
    }, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$3), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-editor__inner"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-back",
      type: "button",
      onClick: onBack
    }, "\u2190 Back"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-header"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-meta"
    }, "Collection Type"), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "strapi-title"
    }, getDisplayTitle(definition, displayedRecord)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-status"
    }, publishedRecord ? 'Published' : displayedRecord.status || 'Draft')), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-kebab",
      type: "button"
    }, "\u2026")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-tabs"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: `strapi-tab${activeTab === 'draft' ? ' strapi-tab--active' : ''}`,
      type: "button",
      onClick: () => onSwitchTab('draft')
    }, "DRAFT"), /*#__PURE__*/React__default.default.createElement("button", {
      className: `strapi-tab${activeTab === 'published' ? ' strapi-tab--active' : ''}`,
      type: "button",
      onClick: () => publishedRecord && onSwitchTab('published')
    }, "PUBLISHED")), error ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "danger"
    }, error) : null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-layout"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-main-card"
    }, definition.editLayout.map((row, index) => /*#__PURE__*/React__default.default.createElement("div", {
      key: `row-${index}`,
      className: "strapi-section"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-field-grid"
    }, row.map(field => /*#__PURE__*/React__default.default.createElement(FieldRenderer$1, {
      key: field,
      field: field,
      value: displayedRecord[field],
      path: [field],
      onChange: onChange,
      onAddItem: onAddItem,
      onRemoveItem: onRemoveItem,
      disabled: isPublishedView
    })))))), /*#__PURE__*/React__default.default.createElement("aside", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card__head"
    }, "Entry"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card__body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-button-row"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-button--secondary",
      type: "button",
      onClick: onPublish,
      disabled: !canPublish
    }, "Publish"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-button--secondary strapi-side-button--menu",
      type: "button",
      onClick: () => setMenuOpen(current => !current)
    }, "\u2026"), menuOpen ? /*#__PURE__*/React__default.default.createElement("div", {
      ref: menuRef,
      className: "strapi-side-action-menu"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-action-menu__item strapi-side-action-menu__item--danger",
      type: "button",
      onClick: () => {
        setMenuOpen(false);
        onUnpublish();
      },
      disabled: !canUnpublish
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-side-action-menu__icon"
    }, "\xD7"), "Unpublish"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-action-menu__item strapi-side-action-menu__item--danger",
      type: "button",
      onClick: () => {
        setMenuOpen(false);
        onDiscardChanges();
      },
      disabled: !canDiscard
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-side-action-menu__icon"
    }, "\xD7"), "Discard changes")) : null), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-button",
      type: "button",
      onClick: onSave,
      disabled: !canSave
    }, saving ? 'Saving...' : 'Save'))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card__head"
    }, "Actions"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card__body"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-button--secondary",
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
    const canSave = mode === 'edit' && !saving && activeTab !== 'published' && isDirty;
    const canPublish = mode === 'edit' && !saving && activeTab !== 'published' && (publishedRecord ? isDirty : hasDraftContent);
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
  const FULL_WIDTH_FIELD_PATTERN = /(description|content|message|body|subtitle|excerpt|intro|overview|challenge|result|background|image|gallery|sections|testimonials|services|whyChooseItems|featureChips|socialLinks|faqItems|comparisonRows|comparisonColumns|storyParagraphs|relatedWorkspaces|challengeItems|amenities|navigation|footer|form)/i;
  const IMAGE_URL_PATTERN = /^https?:\/\/.+/i;
  const REQUIRED_FIELD_PATTERN = /(heroTitle|heroSubtitle|storyTitle|whyChooseTitle|amenitiesTitle|title)$/i;
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
  const PREVIEW_PATHS = {
    homepage: '/',
    'about-page': '/about',
    'blog-page': '/blog',
    'pricing-page': '/pricing',
    'faq-page': '/faq',
    'meeting-rooms-page': '/meeting-rooms',
    'virtual-office-page': '/virtual-office',
    'contact-page': '/contact',
    'privacy-policy-page': '/privacy-policy',
    'terms-page': '/terms'
  };
  const STYLES$2 = `
.strapi-editor {
  min-height: 100%;
  padding: 32px 40px 64px 344px;
  background: #f6f6f9;
  color: #32324d;
}

.strapi-editor__inner {
  max-width: 1240px;
  margin: 0 auto;
}

.strapi-back {
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

.strapi-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 12px;
}

.strapi-meta {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #666687;
  margin-bottom: 4px;
}

.strapi-title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
  color: #32324d;
}

.strapi-status {
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

.strapi-kebab {
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

.strapi-tabs {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eaeaef;
}

.strapi-tab {
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

.strapi-tab--active {
  color: #4945ff;
}

.strapi-tab--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: #4945ff;
}

.strapi-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 232px;
  gap: 16px;
  align-items: start;
}

.strapi-main-card,
.strapi-side-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
}

.strapi-main-card {
  padding: 24px;
}

.strapi-section + .strapi-section {
  margin-top: 20px;
}

.strapi-field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 24px;
}

.strapi-field {
  min-width: 0;
}

.strapi-field--full {
  grid-column: 1 / -1;
}

.strapi-label {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 6px;
  color: #32324d;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
}

.strapi-label__required {
  color: #d02b20;
}

.strapi-input,
.strapi-textarea {
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

.strapi-input {
  min-height: 2.5rem;
}

.strapi-input:focus,
.strapi-textarea:focus {
  border-color: #4945ff;
  box-shadow: 0 0 0 1px #4945ff;
}

.strapi-input:disabled,
.strapi-textarea:disabled {
  background: #f6f6f9;
  color: #666687;
  cursor: not-allowed;
}

.strapi-textarea {
  min-height: 5.75rem;
  resize: vertical;
}

.strapi-media {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  padding: 16px;
}

.strapi-media__canvas {
  min-height: 140px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fafafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.strapi-media__empty {
  color: #8e8ea9;
  font-size: 0.8125rem;
}

.strapi-media__stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.strapi-media__thumb {
  max-width: 240px;
  max-height: 140px;
  object-fit: cover;
  border-radius: 2px;
}

.strapi-media__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.strapi-media__action {
  width: 2rem;
  height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #666687;
  cursor: pointer;
}

.strapi-media__action:disabled {
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}

.strapi-media__filename {
  max-width: 280px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.strapi-media__source {
  margin-top: 10px;
}

.strapi-object {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  padding: 16px;
}

.strapi-object__title {
  margin: 0 0 12px;
  font-size: 0.8125rem;
  line-height: 1rem;
  font-weight: 700;
  color: #666687;
  text-transform: uppercase;
}

.strapi-repeatable {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  overflow: hidden;
  background: #ffffff;
}

.strapi-repeatable__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px 10px;
  border-bottom: 1px solid #f0f0f5;
}

.strapi-repeatable__title {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  color: #32324d;
}

.strapi-repeatable__count {
  color: #8e8ea9;
  font-size: 0.75rem;
}

.strapi-repeatable__item + .strapi-repeatable__item {
  border-top: 1px solid #f0f0f5;
}

.strapi-repeatable__item[open] summary {
  background: #fafafb;
}

.strapi-repeatable__summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
}

.strapi-repeatable__summary::-webkit-details-marker {
  display: none;
}

.strapi-repeatable__summary-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.strapi-repeatable__bullet {
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

.strapi-repeatable__name {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: #32324d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.strapi-repeatable__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #8e8ea9;
  font-size: 0.875rem;
}

.strapi-repeatable__icon-button {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  padding: 0;
}

.strapi-repeatable__icon-button:disabled,
.strapi-repeatable__add:disabled,
.strapi-side-button:disabled,
.strapi-side-button--secondary:disabled {
  cursor: not-allowed;
  opacity: 1;
}

.strapi-repeatable__icon-button:disabled,
.strapi-repeatable__add:disabled {
  color: #8e8ea9;
}

.strapi-repeatable__body {
  padding: 16px;
  background: #ffffff;
}

.strapi-repeatable__add {
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

.strapi-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  padding: 0.625rem 0.875rem;
}

.strapi-switch input {
  accent-color: #4945ff;
}

.strapi-switch:has(input:disabled) {
  background: #f6f6f9;
  color: #666687;
}

.strapi-side-card + .strapi-side-card {
  margin-top: 12px;
}

.strapi-side-card__head {
  padding: 14px 16px 8px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
}

.strapi-side-card__body {
  padding: 0 12px 12px;
}

.strapi-side-button-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  position: relative;
}

.strapi-side-button,
.strapi-side-button--secondary {
  width: 100%;
  min-height: 2.25rem;
  border-radius: 4px;
  font-size: 0.8125rem;
  line-height: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.strapi-side-button {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #ffffff;
}

.strapi-side-button--secondary {
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #32324d;
}

.strapi-side-button:disabled,
.strapi-side-button--secondary:disabled {
  border-color: #dcdce4;
  background: #f6f6f9;
  color: #8e8ea9;
}

.strapi-side-button--menu {
  width: 2rem;
  flex: 0 0 2rem;
}

.strapi-side-button--preview {
  margin-top: 4px;
}

.strapi-side-action-menu {
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

.strapi-side-action-menu__item {
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

.strapi-side-action-menu__item:hover {
  background: #f6f6f9;
}

.strapi-side-action-menu__item--danger {
  color: #d02b20;
}

.strapi-side-action-menu__item:disabled {
  background: transparent;
  color: #8e8ea9;
  cursor: not-allowed;
}

.strapi-side-action-menu__icon {
  width: 18px;
  color: inherit;
  text-align: center;
}

@media (max-width: 1180px) {
  .strapi-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 960px) {
  .strapi-editor {
    padding: 20px 16px 48px;
  }

  .strapi-field-grid {
    grid-template-columns: 1fr;
  }
}
`;
  function toLabel(name) {
    return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/\bseo\b/gi, 'SEO').replace(/\bcta\b/gi, 'CTA').replace(/\bfaq\b/gi, 'FAQ').replace(/\bid\b/gi, 'ID').replace(/\burl\b/gi, 'URL').replace(/\s+/g, ' ').trim().replace(/^./, value => value.toUpperCase());
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
  function isRequiredField(fieldKey) {
    return REQUIRED_FIELD_PATTERN.test(fieldKey);
  }
  function fieldClassName(fieldKey, value) {
    return FULL_WIDTH_FIELD_PATTERN.test(fieldKey) || typeof value === 'boolean' ? 'strapi-field strapi-field--full' : 'strapi-field';
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
    const label = toLabel(fieldKey);
    const inputValue = value ?? '';
    const required = isRequiredField(fieldKey);
    const isImageField = typeof inputValue === 'string' && IMAGE_FIELD_PATTERN.test(fieldKey);
    const showPreview = isImageField && IMAGE_URL_PATTERN.test(inputValue);
    if (typeof value === 'boolean') {
      return /*#__PURE__*/React__default.default.createElement("div", {
        className: fieldClassName(fieldKey, value)
      }, /*#__PURE__*/React__default.default.createElement("label", {
        className: "strapi-label"
      }, label, required ? /*#__PURE__*/React__default.default.createElement("span", {
        className: "strapi-label__required"
      }, "*") : null), /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-switch"
      }, /*#__PURE__*/React__default.default.createElement("span", null, value ? 'Enabled' : 'Disabled'), /*#__PURE__*/React__default.default.createElement("input", {
        type: "checkbox",
        checked: value,
        disabled: disabled,
        onChange: event => onChange(path, event.target.checked)
      })));
    }
    if (isImageField) {
      return /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-field strapi-field--full"
      }, /*#__PURE__*/React__default.default.createElement("label", {
        className: "strapi-label"
      }, label, required ? /*#__PURE__*/React__default.default.createElement("span", {
        className: "strapi-label__required"
      }, "*") : null), /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-media"
      }, /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-media__canvas"
      }, showPreview ? /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-media__stack"
      }, /*#__PURE__*/React__default.default.createElement("img", {
        className: "strapi-media__thumb",
        src: inputValue,
        alt: label
      }), /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-media__actions"
      }, /*#__PURE__*/React__default.default.createElement("button", {
        className: "strapi-media__action",
        type: "button",
        disabled: disabled,
        onClick: () => window.open(inputValue, '_blank', 'noopener,noreferrer')
      }, "\u2197"), /*#__PURE__*/React__default.default.createElement("button", {
        className: "strapi-media__action",
        type: "button",
        disabled: disabled,
        onClick: () => {
          const nextValue = window.prompt(`Update ${label} URL`, inputValue);
          if (nextValue !== null) {
            onChange(path, nextValue);
          }
        }
      }, "\u270E"), /*#__PURE__*/React__default.default.createElement("button", {
        className: "strapi-media__action",
        type: "button",
        disabled: disabled,
        onClick: () => onChange(path, '')
      }, "\u2715")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-media__filename"
      }, getFilename(inputValue))) : /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-media__empty"
      }, "Paste an image URL below to attach media.")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "strapi-media__source"
      }, /*#__PURE__*/React__default.default.createElement("input", {
        className: "strapi-input",
        type: "text",
        value: inputValue,
        disabled: disabled,
        onChange: event => onChange(path, event.target.value),
        placeholder: "https://..."
      }))));
    }
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: fieldClassName(fieldKey, value)
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "strapi-label"
    }, label, required ? /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-label__required"
    }, "*") : null), MULTILINE_FIELD_PATTERN.test(fieldKey) ? /*#__PURE__*/React__default.default.createElement("textarea", {
      className: "strapi-textarea",
      value: inputValue,
      disabled: disabled,
      onChange: event => onChange(path, parseInputValue(event.target.value, value))
    }) : /*#__PURE__*/React__default.default.createElement("input", {
      className: "strapi-input",
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
    disabled
  }) {
    const entries = Object.entries(value ?? {}).filter(([nestedKey]) => nestedKey !== 'id');
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-field strapi-field--full"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-object"
    }, /*#__PURE__*/React__default.default.createElement("h4", {
      className: "strapi-object__title"
    }, toLabel(fieldKey)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-field-grid"
    }, entries.map(([nestedKey, nestedValue]) => /*#__PURE__*/React__default.default.createElement(FieldRenderer, {
      key: `${fieldKey}-${nestedKey}`,
      fieldKey: nestedKey,
      value: nestedValue,
      path: [...path, nestedKey],
      onChange: onChange,
      onAddItem: onAddItem,
      onRemoveItem: onRemoveItem,
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
    disabled
  }) {
    const label = toLabel(fieldKey);
    const sample = value[0] ?? '';
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-field strapi-field--full"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "strapi-label"
    }, label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__head"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__title"
    }, label), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__count"
    }, value.length, " entry", value.length === 1 ? '' : 'ies'))), value.map((item, index) => /*#__PURE__*/React__default.default.createElement("details", {
      key: `${fieldKey}-${index}`,
      className: "strapi-repeatable__item",
      open: index === 0
    }, /*#__PURE__*/React__default.default.createElement("summary", {
      className: "strapi-repeatable__summary"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__summary-left"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-repeatable__bullet"
    }, "\u25BC"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-repeatable__name"
    }, getItemTitle(item, label, index))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-repeatable__icon-button",
      type: "button",
      disabled: disabled,
      onClick: event => {
        event.preventDefault();
        onRemoveItem([...path, index]);
      }
    }, "\uD83D\uDDD1"), /*#__PURE__*/React__default.default.createElement("span", null, "\u22EE\u22EE"))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-repeatable__body"
    }, isPlainObject(item) ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-field-grid"
    }, Object.entries(item).filter(([nestedKey]) => nestedKey !== 'id').map(([nestedKey, nestedValue]) => /*#__PURE__*/React__default.default.createElement(FieldRenderer, {
      key: `${fieldKey}-${index}-${nestedKey}`,
      fieldKey: nestedKey,
      value: nestedValue,
      path: [...path, index, nestedKey],
      onChange: onChange,
      onAddItem: onAddItem,
      onRemoveItem: onRemoveItem,
      disabled: disabled
    }))) : /*#__PURE__*/React__default.default.createElement(PrimitiveField, {
      fieldKey: `${fieldKey}-${index}`,
      value: item,
      path: [...path, index],
      onChange: onChange,
      disabled: disabled
    })))), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-repeatable__add",
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
    disabled
  }) {
    return /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-section"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-field-grid"
    }, entries.map(([fieldKey, value]) => /*#__PURE__*/React__default.default.createElement(FieldRenderer, {
      key: fieldKey,
      fieldKey: fieldKey,
      value: value,
      path: [fieldKey],
      onChange: onChange,
      onAddItem: onAddItem,
      onRemoveItem: onRemoveItem,
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
    const canSave = !isPublishedView && !saving && isDirty;
    const canPublish = !isPublishedView && !saving && (publishedContent ? isDirty : hasDraftContent);
    const canDiscard = !saving && !isPublishedView && hasDraftContent;
    const canUnpublish = !saving && Boolean(publishedContent);
    const sections = React.useMemo(() => buildSections(pageName, displayedContent), [pageName, displayedContent]);
    const previewUrl = PREVIEW_PATHS[pageName] ? `http://localhost:8080${PREVIEW_PATHS[pageName]}` : null;
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
          setError(loadError?.response?.data?.message ?? 'Failed to load this content page.');
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
        const message = saveError?.response?.data?.message ?? 'Failed to save this content page.';
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
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$2), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-editor"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-editor__inner"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-back",
      type: "button",
      onClick: () => window.history.back()
    }, "\u2190 Back"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-header"
    }, /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-meta"
    }, "Single Type"), /*#__PURE__*/React__default.default.createElement("h1", {
      className: "strapi-title"
    }, entryTitle), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-status"
    }, publishedContent ? 'Published' : 'Draft')), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-kebab",
      type: "button"
    }, "\u2026")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-tabs"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: `strapi-tab${activeTab === 'draft' ? ' strapi-tab--active' : ''}`,
      type: "button",
      onClick: () => setActiveTab('draft')
    }, "DRAFT"), /*#__PURE__*/React__default.default.createElement("button", {
      className: `strapi-tab${activeTab === 'published' ? ' strapi-tab--active' : ''}`,
      type: "button",
      onClick: () => publishedContent && setActiveTab('published')
    }, "PUBLISHED")), error ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "danger"
    }, error) : null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-layout"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-main-card"
    }, sections.map((section, index) => /*#__PURE__*/React__default.default.createElement(FormSection, {
      key: `section-${index}`,
      entries: section.entries,
      onChange: handleChange,
      onAddItem: handleAddItem,
      onRemoveItem: handleRemoveItem,
      disabled: isPublishedView
    }))), /*#__PURE__*/React__default.default.createElement("aside", null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card__head"
    }, "Entry"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card__body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-button-row"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-button--secondary",
      type: "button",
      onClick: () => handleSave('publish'),
      disabled: !canPublish
    }, "Publish"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-button--secondary strapi-side-button--menu",
      type: "button",
      onClick: () => setMenuOpen(current => !current)
    }, "\u2026"), menuOpen ? /*#__PURE__*/React__default.default.createElement("div", {
      ref: menuRef,
      className: "strapi-side-action-menu"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-action-menu__item strapi-side-action-menu__item--danger",
      type: "button",
      onClick: () => handleSave('unpublish'),
      disabled: !canUnpublish
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-side-action-menu__icon"
    }, "\xD7"), "Unpublish"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-action-menu__item strapi-side-action-menu__item--danger",
      type: "button",
      onClick: handleDiscardChanges,
      disabled: !canDiscard
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-side-action-menu__icon"
    }, "\xD7"), "Discard changes")) : null), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-button",
      type: "button",
      onClick: () => handleSave('save'),
      disabled: !canSave
    }, saving ? 'Saving...' : 'Save'))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card__head"
    }, "Preview"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-side-card__body"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-side-button--secondary strapi-side-button--preview",
      type: "button",
      onClick: () => previewUrl && window.open(previewUrl, '_blank', 'noopener,noreferrer'),
      disabled: !previewUrl
    }, "Open preview"))))))));
  }

  const STYLES$1 = `
.strapi-media-page {
  min-height: 100%;
  padding: 28px 40px 48px 88px;
  background: #f6f6f9;
  color: #32324d;
}

.strapi-media-page__inner {
  max-width: 1860px;
  margin: 0 auto;
}

.strapi-media-page__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.strapi-media-page__title {
  margin: 0;
  font-size: 3rem;
  line-height: 3.5rem;
  font-weight: 700;
  color: #32324d;
}

.strapi-media-page__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.strapi-media-page__button,
.strapi-media-page__button--primary,
.strapi-media-page__icon-button {
  border-radius: 4px;
  min-height: 2.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  cursor: pointer;
}

.strapi-media-page__button {
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #32324d;
  padding: 0 1rem;
}

.strapi-media-page__button--primary {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #ffffff;
  padding: 0 1.25rem;
}

.strapi-media-page__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.strapi-media-page__toolbar-left,
.strapi-media-page__toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.strapi-media-page__square,
.strapi-media-page__icon-button {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #666687;
  display: grid;
  place-items: center;
  border-radius: 4px;
}

.strapi-media-page__select,
.strapi-media-page__search {
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  padding: 0 1rem;
  font-size: 1rem;
}

.strapi-media-page__search {
  min-width: 280px;
}

.strapi-media-page__select {
  min-width: 268px;
  appearance: none;
}

.strapi-media-page__section-title {
  margin: 0 0 18px;
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 700;
}

.strapi-media-page__count {
  color: #666687;
}

.strapi-media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.strapi-asset-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
  cursor: pointer;
}

.strapi-asset-card:hover {
  box-shadow: 0 4px 12px rgba(33, 33, 52, 0.08);
}

.strapi-asset-card__preview {
  position: relative;
  min-height: 256px;
  padding: 16px;
  background:
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9),
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9);
  background-position: 0 0, 12px 12px;
  background-size: 24px 24px;
}

.strapi-asset-card__checkbox {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 24px;
  height: 24px;
  border: 1px solid #c0c0cf;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.92);
}

.strapi-asset-card__image {
  width: 100%;
  height: 224px;
  object-fit: cover;
  display: block;
}

.strapi-asset-card__body {
  padding: 14px 18px 16px;
}

.strapi-asset-card__title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}

.strapi-asset-card__title {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.strapi-asset-card__type {
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

.strapi-asset-card__meta {
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.strapi-media-detail__back {
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 18px;
}

.strapi-media-detail__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 24px;
}

.strapi-media-detail__preview,
.strapi-media-detail__card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
}

.strapi-media-detail__preview {
  padding: 24px;
}

.strapi-media-detail__canvas {
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

.strapi-media-detail__image {
  max-width: 100%;
  max-height: 580px;
  object-fit: contain;
}

.strapi-media-detail__side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.strapi-media-detail__card-head {
  padding: 14px 16px 8px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
}

.strapi-media-detail__card-body {
  padding: 0 16px 16px;
}

.strapi-media-detail__field + .strapi-media-detail__field {
  margin-top: 16px;
}

.strapi-media-detail__label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: #666687;
}

.strapi-media-detail__input,
.strapi-media-detail__textarea {
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

.strapi-media-detail__textarea {
  min-height: 6rem;
  resize: none;
}

.strapi-media-detail__meta-list {
  display: grid;
  gap: 12px;
}

.strapi-media-detail__meta-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.strapi-media-detail__meta-key {
  color: #666687;
  font-weight: 600;
}

.strapi-media-detail__meta-value {
  color: #32324d;
  text-align: right;
  overflow-wrap: anywhere;
}

@media (max-width: 1080px) {
  .strapi-media-detail__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 960px) {
  .strapi-media-page {
    padding: 20px 16px 40px 72px;
  }

  .strapi-media-page__top,
  .strapi-media-page__toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .strapi-media-page__toolbar-left,
  .strapi-media-page__toolbar-right,
  .strapi-media-page__actions {
    flex-wrap: wrap;
  }

  .strapi-media-page__search,
  .strapi-media-page__select {
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
  function AssetCard({
    item,
    onOpen
  }) {
    return /*#__PURE__*/React__default.default.createElement("article", {
      className: "strapi-asset-card",
      onClick: () => onOpen(item.id)
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-asset-card__preview"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-asset-card__checkbox"
    }), /*#__PURE__*/React__default.default.createElement("img", {
      className: "strapi-asset-card__image",
      src: item.thumbnailUrl || item.url,
      alt: item.alternativeText || item.name
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-asset-card__body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-asset-card__title-row"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-asset-card__title"
    }, item.name), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-asset-card__type"
    }, item.mime.startsWith('image/') ? 'IMAGE' : item.ext.replace('.', '').toUpperCase())), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-asset-card__meta"
    }, item.ext.replace('.', '').toUpperCase(), " - ", item.width, "\xD7", item.height)));
  }
  function DetailView({
    item,
    onBack
  }) {
    return /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-media-detail__back",
      type: "button",
      onClick: onBack
    }, "\u2190 Back"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-page__top",
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React__default.default.createElement("h1", {
      className: "strapi-media-page__title",
      style: {
        fontSize: '2.25rem',
        lineHeight: '2.75rem'
      }
    }, item.name), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-page__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-media-page__button",
      type: "button",
      onClick: () => navigator.clipboard?.writeText(item.url || '')
    }, "Copy URL"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-media-page__button--primary",
      type: "button",
      onClick: () => window.open(item.url, '_blank', 'noopener,noreferrer')
    }, "Open asset"))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__layout"
    }, /*#__PURE__*/React__default.default.createElement("section", {
      className: "strapi-media-detail__preview"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__canvas"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      className: "strapi-media-detail__image",
      src: item.url,
      alt: item.alternativeText || item.name
    }))), /*#__PURE__*/React__default.default.createElement("aside", {
      className: "strapi-media-detail__side"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__card-head"
    }, "Details"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__card-body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__field"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "strapi-media-detail__label"
    }, "File name"), /*#__PURE__*/React__default.default.createElement("input", {
      className: "strapi-media-detail__input",
      value: item.name || '',
      disabled: true,
      readOnly: true
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__field"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "strapi-media-detail__label"
    }, "Alternative text"), /*#__PURE__*/React__default.default.createElement("input", {
      className: "strapi-media-detail__input",
      value: item.alternativeText || '',
      disabled: true,
      readOnly: true
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__field"
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "strapi-media-detail__label"
    }, "Caption"), /*#__PURE__*/React__default.default.createElement("textarea", {
      className: "strapi-media-detail__textarea",
      value: item.caption || '',
      disabled: true,
      readOnly: true
    })))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__card"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__card-head"
    }, "Metadata"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__card-body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__meta-list"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-key"
    }, "Dimensions"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-value"
    }, item.width, " \xD7 ", item.height)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-key"
    }, "Size"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-value"
    }, item.sizeLabel)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-key"
    }, "Type"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-value"
    }, item.mime)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-key"
    }, "Provider"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-value"
    }, item.provider || 'local')), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-key"
    }, "Folder"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-value"
    }, item.folderPath || '/')), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-key"
    }, "Updated"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-value"
    }, item.updatedAtLabel)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-key"
    }, "Created"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-value"
    }, item.createdAtLabel)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-detail__meta-item"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-key"
    }, "Document ID"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-detail__meta-value"
    }, item.documentId))))))));
  }
  function MediaLibrary() {
    const location = reactRouter.useLocation();
    const navigate = reactRouter.useNavigate();
    const query = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
    const search = query.get('search') || '';
    const fileId = query.get('fileId') || '';
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [items, setItems] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [item, setItem] = React.useState(null);
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
      navigate(buildPagePath('/admin/pages/media-library', nextSearch ? {
        search: nextSearch
      } : {}));
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
      className: "strapi-media-page"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-page__inner"
    }, error ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "danger"
    }, error) : null, fileId && item ? /*#__PURE__*/React__default.default.createElement(DetailView, {
      item: item,
      onBack: () => openList()
    }) : /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-page__top"
    }, /*#__PURE__*/React__default.default.createElement("h1", {
      className: "strapi-media-page__title"
    }, "Media Library"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-page__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-media-page__button",
      type: "button"
    }, "+ Add new folder"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-media-page__button--primary",
      type: "button"
    }, "+ Add new assets"))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-page__toolbar"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-page__toolbar-left"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-page__square"
    }), /*#__PURE__*/React__default.default.createElement("select", {
      className: "strapi-media-page__select",
      defaultValue: "recent"
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "recent"
    }, "Most recent uploads")), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-media-page__button",
      type: "button"
    }, "Filters")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-page__toolbar-right"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-media-page__icon-button",
      type: "button"
    }, "\u2699"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "strapi-media-page__icon-button",
      type: "button"
    }, "\u2630"), /*#__PURE__*/React__default.default.createElement("input", {
      className: "strapi-media-page__search",
      value: search,
      onChange: event => openList(event.target.value),
      placeholder: "Search assets"
    }))), /*#__PURE__*/React__default.default.createElement("h2", {
      className: "strapi-media-page__section-title"
    }, "Assets ", /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-media-page__count"
    }, "(", count, ")")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-media-grid"
    }, items.map(mediaItem => /*#__PURE__*/React__default.default.createElement(AssetCard, {
      key: mediaItem.id,
      item: mediaItem,
      onOpen: nextId => navigate(buildPagePath('/admin/pages/media-library', {
        fileId: nextId
      }))
    })))))));
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
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES), /*#__PURE__*/React__default.default.createElement("div", {
      className: `strapi-sidebar-shell${showPanel ? '' : ' strapi-sidebar-shell--rail-only'}${isVisible ? '' : ' strapi-sidebar-shell--hidden'}`
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-sidebar-rail"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      className: "strapi-sidebar-logo",
      src: "/admin-assets/client-mark.svg",
      alt: "The Leadenhall Works"
    }), /*#__PURE__*/React__default.default.createElement("button", {
      className: `strapi-rail-button${isDashboard ? ' strapi-rail-button--active' : ''}`,
      type: "button",
      onClick: () => navigate('/admin')
    }, /*#__PURE__*/React__default.default.createElement(HomeIcon, null)), /*#__PURE__*/React__default.default.createElement("button", {
      className: `strapi-rail-button${!isDashboard && !isMedia ? ' strapi-rail-button--active' : ''}`,
      type: "button",
      onClick: () => navigate('/admin/pages/site-settings')
    }, /*#__PURE__*/React__default.default.createElement(PencilIcon, null)), /*#__PURE__*/React__default.default.createElement("button", {
      className: `strapi-rail-button${isMedia ? ' strapi-rail-button--active' : ''}`,
      type: "button",
      onClick: () => navigate('/admin/pages/media-library')
    }, /*#__PURE__*/React__default.default.createElement(MediaIcon, null)), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-rail-spacer"
    }), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-avatar"
    }, initial)), showPanel ? /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-sidebar-panel"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-sidebar-header"
    }, "Content Manager"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-sidebar-body"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-search"
    }, /*#__PURE__*/React__default.default.createElement("input", {
      type: "text",
      placeholder: "Search",
      value: search,
      onChange: event => setSearch(event.target.value)
    })), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-group"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-group__head"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-group__label"
    }, "Collection Types"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-group__count"
    }, collectionItems.length)), collectionItems.map(item => /*#__PURE__*/React__default.default.createElement("button", {
      key: item.id,
      className: `strapi-nav-link${item.selected ? ' strapi-nav-link--selected' : ''}`,
      type: "button",
      onClick: () => navigate(item.href)
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-nav-link__text"
    }, item.label)))), /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-group"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "strapi-group__head"
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-group__label"
    }, "Single Types"), /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-group__count"
    }, pageItems.length)), pageItems.map(item => /*#__PURE__*/React__default.default.createElement("button", {
      key: item.id,
      className: `strapi-nav-link${item.selected ? ' strapi-nav-link--selected' : ''}`,
      type: "button",
      onClick: () => navigate(item.href)
    }, /*#__PURE__*/React__default.default.createElement("span", {
      className: "strapi-nav-link__text"
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
    }, "Use the same client-facing content surface you see in Strapi, backed by the copied comparison database.")), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
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
  AdminJS.UserComponents.Sidebar = Sidebar;
  AdminJS.UserComponents.Login = Login;
  AdminJS.UserComponents.TopBar = TopBar;

})(React, ReactRouter, AdminJSDesignSystem, AdminJS, ReactRedux);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbk1hbmFnZXIuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3IuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5LmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL1NpZGViYXIuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvTG9naW4uanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvVG9wQmFyLmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cbmNvbnN0IFBSSU1BUllfUEFHRVMgPSBbXG4gIHsgbGFiZWw6ICdIb21lcGFnZScsIGhyZWY6ICcvYWRtaW4vcGFnZXMvaG9tZXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdBYm91dCBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9hYm91dC1wYWdlJyB9LFxuICB7IGxhYmVsOiAnUHJpY2luZyBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9wcmljaW5nLXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdDb250YWN0IFBhZ2UnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2NvbnRhY3QtcGFnZScgfSxcbl07XG5cbmNvbnN0IENPTExFQ1RJT05TID0gW1xuICB7IGxhYmVsOiAnQmxvZyBQb3N0cycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvYmxvZy1wb3N0cycgfSxcbiAgeyBsYWJlbDogJ0ZBUSBJdGVtcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvZmFxLWl0ZW1zJyB9LFxuICB7IGxhYmVsOiAnTWVldGluZyBSb29tcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvbWVldGluZy1yb29tcycgfSxcbiAgeyBsYWJlbDogJ1ByaWNpbmcgUGxhbnMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL3ByaWNpbmctcGxhbnMnIH0sXG5dO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uc3RyYXBpLWRhc2hib2FyZCB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDM0NHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLnN0cmFwaS1kYXNoYm9hcmRfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiAxMjQwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4uc3RyYXBpLWRhc2hib2FyZF9fZXllYnJvdyB7XG4gIG1hcmdpbjogMCAwIDRweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG59XG5cbi5zdHJhcGktZGFzaGJvYXJkX190aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAyLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMi43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLnN0cmFwaS1kYXNoYm9hcmRfX3N1YnRpdGxlIHtcbiAgbWFyZ2luOiAxMHB4IDAgMjhweDtcbiAgbWF4LXdpZHRoOiA3ODBweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuLnN0cmFwaS1kYXNoYm9hcmRfX2dyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxLjFmcikgbWlubWF4KDAsIDAuOWZyKTtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uc3RyYXBpLWRhc2hib2FyZF9fY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4wNik7XG59XG5cbi5zdHJhcGktZGFzaGJvYXJkX19jYXJkLWhlYWQge1xuICBwYWRkaW5nOiAxNnB4IDIwcHggMTJweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5zdHJhcGktZGFzaGJvYXJkX19jYXJkLXRpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5zdHJhcGktZGFzaGJvYXJkX19jYXJkLWJvZHkge1xuICBwYWRkaW5nOiA4cHg7XG59XG5cbi5zdHJhcGktZGFzaGJvYXJkX19saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLnN0cmFwaS1kYXNoYm9hcmRfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uc3RyYXBpLWRhc2hib2FyZF9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5zdHJhcGktZGFzaGJvYXJkX19pdGVtLWNvcHkge1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5zdHJhcGktZGFzaGJvYXJkX19pdGVtLWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uc3RyYXBpLWRhc2hib2FyZF9faXRlbS1tZXRhIHtcbiAgbWFyZ2luLXRvcDogMnB4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLnN0cmFwaS1kYXNoYm9hcmRfX2l0ZW0tYXJyb3cge1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uc3RyYXBpLWRhc2hib2FyZF9fbm90aWNlIHtcbiAgcGFkZGluZzogMjBweDtcbn1cblxuLnN0cmFwaS1kYXNoYm9hcmRfX25vdGljZS10aXRsZSB7XG4gIG1hcmdpbjogMCAwIDhweDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uc3RyYXBpLWRhc2hib2FyZF9fbm90aWNlLWNvcHkge1xuICBtYXJnaW46IDA7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLnN0cmFwaS1kYXNoYm9hcmQge1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0OHB4O1xuICB9XG5cbiAgLnN0cmFwaS1kYXNoYm9hcmRfX2dyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5gO1xuXG5mdW5jdGlvbiBTaG9ydGN1dExpc3QoeyB0aXRsZSwgaXRlbXMsIG5hdmlnYXRlLCBtZXRhIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzdHJhcGktZGFzaGJvYXJkX19jYXJkXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1kYXNoYm9hcmRfX2NhcmQtaGVhZFwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwic3RyYXBpLWRhc2hib2FyZF9fY2FyZC10aXRsZVwiPnt0aXRsZX08L2gyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1kYXNoYm9hcmRfX2NhcmQtYm9keVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1kYXNoYm9hcmRfX2xpc3RcIj5cbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17aXRlbS5ocmVmfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktZGFzaGJvYXJkX19pdGVtXCJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKGl0ZW0uaHJlZil9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWRhc2hib2FyZF9faXRlbS1jb3B5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZGFzaGJvYXJkX19pdGVtLWxhYmVsXCI+e2l0ZW0ubGFiZWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZGFzaGJvYXJkX19pdGVtLW1ldGFcIj57bWV0YX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0cmFwaS1kYXNoYm9hcmRfX2l0ZW0tYXJyb3dcIj7ihpI8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERhc2hib2FyZCgpIHtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1kYXNoYm9hcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZGFzaGJvYXJkX19pbm5lclwiPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN0cmFwaS1kYXNoYm9hcmRfX2V5ZWJyb3dcIj5Ib21lPC9wPlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJzdHJhcGktZGFzaGJvYXJkX190aXRsZVwiPkNvbnRlbnQgTWFuYWdlcjwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwic3RyYXBpLWRhc2hib2FyZF9fc3VidGl0bGVcIj5cbiAgICAgICAgICAgIFN0YXJ0IGZyb20gdGhlIHNhbWUgY2xpZW50LWZhY2luZyBjb250ZW50IGFyZWFzIHVzZWQgaW4gU3RyYXBpLiBVc2UgdGhlIHNob3J0Y3V0cyBiZWxvdyB0byBqdW1wXG4gICAgICAgICAgICBpbnRvIHNpbmdsZSBwYWdlcyBhbmQgY29sbGVjdGlvbiBjb250ZW50LlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWRhc2hib2FyZF9fZ3JpZFwiPlxuICAgICAgICAgICAgPFNob3J0Y3V0TGlzdFxuICAgICAgICAgICAgICB0aXRsZT1cIlNpbmdsZSBUeXBlc1wiXG4gICAgICAgICAgICAgIGl0ZW1zPXtQUklNQVJZX1BBR0VTfVxuICAgICAgICAgICAgICBuYXZpZ2F0ZT17bmF2aWdhdGV9XG4gICAgICAgICAgICAgIG1ldGE9XCJFZGl0IHN0cnVjdHVyZWQgcGFnZSBjb250ZW50XCJcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInN0cmFwaS1kYXNoYm9hcmRfX2NhcmRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZGFzaGJvYXJkX19jYXJkLWhlYWRcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwic3RyYXBpLWRhc2hib2FyZF9fY2FyZC10aXRsZVwiPldvcmtzcGFjZTwvaDI+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1kYXNoYm9hcmRfX25vdGljZVwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJzdHJhcGktZGFzaGJvYXJkX19ub3RpY2UtdGl0bGVcIj5Db21wYXJpc29uIGVudmlyb25tZW50PC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJzdHJhcGktZGFzaGJvYXJkX19ub3RpY2UtY29weVwiPlxuICAgICAgICAgICAgICAgICAgVGhpcyBBZG1pbkpTIHdvcmtzcGFjZSBpcyBzdGlsbCBhdHRhY2hlZCB0byB0aGUgY29waWVkIGNvbXBhcmlzb24gZGF0YWJhc2UuIENvbnRlbnQgc2F2ZWQgaGVyZVxuICAgICAgICAgICAgICAgICAgd2lsbCBub3QgY2hhbmdlIHRoZSBsaXZlIGZyb250ZW5kIHVudGlsIHdlIHN3aXRjaCB0aGUgZGF0YSBzb3VyY2UuXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgPFNob3J0Y3V0TGlzdFxuICAgICAgICAgICAgICB0aXRsZT1cIkNvbGxlY3Rpb25zXCJcbiAgICAgICAgICAgICAgaXRlbXM9e0NPTExFQ1RJT05TfVxuICAgICAgICAgICAgICBuYXZpZ2F0ZT17bmF2aWdhdGV9XG4gICAgICAgICAgICAgIG1ldGE9XCJNYW5hZ2UgcmVwZWF0YWJsZSBjb250ZW50XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24sIHVzZU5hdmlnYXRlLCB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgTG9hZGVyLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcblxuY29uc3QgTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4gPSAvKGRlc2NyaXB0aW9ufGNvbnRlbnR8bWVzc2FnZXxib2R5fHN1YnRpdGxlfGV4Y2VycHR8aW50cm98aG91cnN8YWRkcmVzc3x0ZXh0fHBhcmFncmFwaHxvdmVydmlld3xjaGFsbGVuZ2V8cmVzdWx0fGFuc3dlcikvaTtcbmNvbnN0IElNQUdFX0ZJRUxEX1BBVFRFUk4gPSAvKGltYWdlfGNvdmVySW1hZ2V8Y29udGVudEltYWdlcykvaTtcbmNvbnN0IEJPT0xFQU5fRklFTERfUEFUVEVSTiA9IC9eKGZlYXR1cmVkfGlzRmVhdHVyZWR8aXNQb3B1bGFyKSQvaTtcbmNvbnN0IEZVTExfV0lEVEhfRklFTERfUEFUVEVSTiA9IC8oZGVzY3JpcHRpb258Y29udGVudHxhbnN3ZXJ8ZXhjZXJwdHxjb250ZW50SW1hZ2VzfGNvdmVySW1hZ2V8aW1hZ2V8ZmVhdHVyZXN8YmFkZ2VzfHRhZ3MpJC9pO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uc3RyYXBpLWVkaXRvciB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDM0NHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cbi5zdHJhcGktZWRpdG9yX19pbm5lciB7XG4gIG1heC13aWR0aDogMTI0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cbi5zdHJhcGktYmFjayB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxNHB4O1xufVxuLnN0cmFwaS1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG4uc3RyYXBpLW1ldGEge1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5zdHJhcGktdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMi4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uc3RyYXBpLXN0YXR1cyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIC43NXJlbTtcbiAgbWFyZ2luLXRvcDogMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2M2ZjBjMjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZWZmZmVkO1xuICBjb2xvcjogIzJmNjg0NjtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbi5zdHJhcGkta2ViYWIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG4uc3RyYXBpLXRhYnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWFlYWVmO1xufVxuLnN0cmFwaS10YWIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDAgMCAxMnB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uc3RyYXBpLXRhYi0tYWN0aXZlIHsgY29sb3I6ICM0OTQ1ZmY7IH1cbi5zdHJhcGktdGFiLS1hY3RpdmU6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDsgcmlnaHQ6IDA7IGJvdHRvbTogLTFweDtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG59XG4uc3RyYXBpLWxheW91dCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsMWZyKSAyMzJweDtcbiAgZ2FwOiAxNnB4O1xuICBhbGlnbi1pdGVtczogc3RhcnQ7XG59XG4uc3RyYXBpLW1haW4tY2FyZCwuc3RyYXBpLXNpZGUtY2FyZCwuc3RyYXBpLWxpc3QtY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMzMsMzMsNTIsLjA2KTtcbn1cbi5zdHJhcGktbWFpbi1jYXJkIHsgcGFkZGluZzogMjRweDsgfVxuLnN0cmFwaS1zaWRlLWNhcmQgKyAuc3RyYXBpLXNpZGUtY2FyZCB7IG1hcmdpbi10b3A6IDEycHg7IH1cbi5zdHJhcGktc2lkZS1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLnN0cmFwaS1zaWRlLWNhcmRfX2JvZHkgeyBwYWRkaW5nOiAwIDEycHggMTJweDsgfVxuLnN0cmFwaS1zaWRlLWJ1dHRvbi1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uc3RyYXBpLXNpZGUtYnV0dG9uLC5zdHJhcGktc2lkZS1idXR0b24tLXNlY29uZGFyeSB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogLjgxMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uc3RyYXBpLXNpZGUtYnV0dG9uIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4uc3RyYXBpLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cbi5zdHJhcGktc2lkZS1idXR0b246ZGlzYWJsZWQsXG4uc3RyYXBpLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnk6ZGlzYWJsZWQsXG4uc3RyYXBpLXByaW1hcnk6ZGlzYWJsZWQsXG4uc3RyYXBpLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIGJvcmRlci1jb2xvcjogI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uc3RyYXBpLXNpZGUtYWN0aW9uLW1lbnUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogY2FsYygxMDAlICsgOHB4KTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAyMjBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDEycHggMzJweCByZ2JhKDMzLDMzLDUyLC4xMik7XG4gIHBhZGRpbmc6IDhweCAwO1xuICB6LWluZGV4OiA0MDtcbn1cbi5zdHJhcGktc2lkZS1hY3Rpb24tbWVudV9faXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG4uc3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuLnN0cmFwaS1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXIge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cbi5zdHJhcGktc2lkZS1hY3Rpb24tbWVudV9faXRlbTpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5zdHJhcGktc2lkZS1hY3Rpb24tbWVudV9faWNvbiB7XG4gIHdpZHRoOiAxOHB4O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnN0cmFwaS1zaWRlLWJ1dHRvbi0tbWVudSB7XG4gIHdpZHRoOiAycmVtO1xuICBmbGV4OiAwIDAgMnJlbTtcbn1cbi5zdHJhcGktc2VjdGlvbiArIC5zdHJhcGktc2VjdGlvbiB7IG1hcmdpbi10b3A6IDIwcHg7IH1cbi5zdHJhcGktZmllbGQtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsbWlubWF4KDAsMWZyKSk7XG4gIGdhcDogMjBweCAyNHB4O1xufVxuLnN0cmFwaS1maWVsZC0tZnVsbCB7IGdyaWQtY29sdW1uOiAxIC8gLTE7IH1cbi5zdHJhcGktbGFiZWwge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAycHg7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLnN0cmFwaS1sYWJlbF9fcmVxdWlyZWQgeyBjb2xvcjogI2QwMmIyMDsgfVxuLnN0cmFwaS1pbnB1dCwuc3RyYXBpLXRleHRhcmVhLC5zdHJhcGktc2VhcmNoLWlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHBhZGRpbmc6IC42MjVyZW0gLjg3NXJlbTtcbiAgZm9udC1zaXplOiAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgb3V0bGluZTogbm9uZTtcbn1cbi5zdHJhcGktaW5wdXQgeyBtaW4taGVpZ2h0OiAyLjVyZW07IH1cbi5zdHJhcGktdGV4dGFyZWEgeyBtaW4taGVpZ2h0OiA1Ljc1cmVtOyByZXNpemU6IHZlcnRpY2FsOyB9XG4uc3RyYXBpLWlucHV0OmZvY3VzLC5zdHJhcGktdGV4dGFyZWE6Zm9jdXMsLnN0cmFwaS1zZWFyY2gtaW5wdXQ6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDFweCAjNDk0NWZmO1xufVxuLnN0cmFwaS1pbnB1dDpkaXNhYmxlZCxcbi5zdHJhcGktdGV4dGFyZWE6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5zdHJhcGktcmVwZWF0YWJsZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cbi5zdHJhcGktcmVwZWF0YWJsZV9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZzogMTJweCAxNnB4IDEwcHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xufVxuLnN0cmFwaS1yZXBlYXRhYmxlX190aXRsZSB7IGZvbnQtc2l6ZTogLjc1cmVtOyBmb250LXdlaWdodDogNjAwOyB9XG4uc3RyYXBpLXJlcGVhdGFibGVfX2NvdW50IHsgY29sb3I6ICM4ZThlYTk7IGZvbnQtc2l6ZTogLjc1cmVtOyB9XG4uc3RyYXBpLXJlcGVhdGFibGVfX2l0ZW0gKyAuc3RyYXBpLXJlcGVhdGFibGVfX2l0ZW0geyBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmNTsgfVxuLnN0cmFwaS1yZXBlYXRhYmxlX19zdW1tYXJ5IHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLnN0cmFwaS1yZXBlYXRhYmxlX19zdW1tYXJ5Ojotd2Via2l0LWRldGFpbHMtbWFya2VyIHsgZGlzcGxheTogbm9uZTsgfVxuLnN0cmFwaS1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG59XG4uc3RyYXBpLXJlcGVhdGFibGVfX2J1bGxldCB7XG4gIHdpZHRoOiAyMHB4OyBoZWlnaHQ6IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBiYWNrZ3JvdW5kOiAjZjBmMGY1O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IC42MjVyZW07XG59XG4uc3RyYXBpLXJlcGVhdGFibGVfX25hbWUgeyBmb250LXNpemU6IC44NzVyZW07IGZvbnQtd2VpZ2h0OiA2MDA7IH1cbi5zdHJhcGktcmVwZWF0YWJsZV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTBweDtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG4uc3RyYXBpLXJlcGVhdGFibGVfX2ljb24tYnV0dG9uIHtcbiAgYm9yZGVyOiAwOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgY29sb3I6IGluaGVyaXQ7IGN1cnNvcjogcG9pbnRlcjtcbn1cbi5zdHJhcGktcmVwZWF0YWJsZV9faWNvbi1idXR0b246ZGlzYWJsZWQsXG4uc3RyYXBpLXJlcGVhdGFibGVfX2FkZDpkaXNhYmxlZCB7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLnN0cmFwaS1yZXBlYXRhYmxlX19ib2R5IHsgcGFkZGluZzogMTZweDsgfVxuLnN0cmFwaS1yZXBlYXRhYmxlX19hZGQge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmNTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uc3RyYXBpLXRvZ2dsZSB7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAuNjI1cmVtIC44NzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cbi5zdHJhcGktdG9nZ2xlOmhhcyhpbnB1dDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4Nztcbn1cbi5zdHJhcGktbWVkaWEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG4uc3RyYXBpLW1lZGlhX19jYW52YXMge1xuICBtaW4taGVpZ2h0OiAxNDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZiO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMTZweDtcbn1cbi5zdHJhcGktbWVkaWFfX3N0YWNrIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG4uc3RyYXBpLW1lZGlhX190aHVtYiB7XG4gIG1heC13aWR0aDogMjQwcHg7XG4gIG1heC1oZWlnaHQ6IDE0MHB4O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5zdHJhcGktbWVkaWFfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDRweDtcbn1cbi5zdHJhcGktbWVkaWFfX2FjdGlvbiB7XG4gIHdpZHRoOiAycmVtOyBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cbi5zdHJhcGktbWVkaWFfX2FjdGlvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLnN0cmFwaS1tZWRpYV9fZmlsZW5hbWUgeyBjb2xvcjogIzY2NjY4NzsgZm9udC1zaXplOiAuNzVyZW07IH1cbi5zdHJhcGktbWVkaWFfX3NvdXJjZSB7IG1hcmdpbi10b3A6IDEwcHg7IH1cbi5zdHJhcGktbGlzdC10b29sYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDE2cHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG4uc3RyYXBpLWxpc3QtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTJweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5zdHJhcGktc2VhcmNoLXdyYXAgeyB3aWR0aDogMjgwcHg7IH1cbi5zdHJhcGktbGlzdC1tZXRhIHtcbiAgbWFyZ2luOiAxMnB4IDAgMzJweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xufVxuLnN0cmFwaS10b29sYmFyLWNsdXN0ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5zdHJhcGktdG9vbGJhci1idXR0b24ge1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIHBhZGRpbmc6IDAgMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLnN0cmFwaS10b29sYmFyLWJ1dHRvbi0taWNvbiB7XG4gIHdpZHRoOiAyLjVyZW07XG4gIHBhZGRpbmc6IDA7XG59XG4uc3RyYXBpLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUge1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuLnN0cmFwaS10b29sYmFyLXNlYXJjaCB7XG4gIHdpZHRoOiAyODBweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAgMC44NzVyZW07XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG4uc3RyYXBpLWxpc3QtcG9wb3ZlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgKyA4cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDMyMHB4O1xuICBtYXgtaGVpZ2h0OiA0MjBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywzMyw1MiwuMTIpO1xuICBwYWRkaW5nOiAxNnB4O1xuICB6LWluZGV4OiAyMDtcbn1cbi5zdHJhcGktbGlzdC1wb3BvdmVyX19oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XG59XG4uc3RyYXBpLWxpc3QtcG9wb3Zlcl9fdGl0bGUge1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uc3RyYXBpLWxpc3QtcG9wb3Zlcl9fcmVzZXQge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xufVxuLnN0cmFwaS1saXN0LXBvcG92ZXJfX2dyb3VwICsgLnN0cmFwaS1saXN0LXBvcG92ZXJfX2dyb3VwIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cbi5zdHJhcGktbGlzdC1wb3BvdmVyX19sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uc3RyYXBpLWxpc3QtcG9wb3Zlcl9fc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG4uc3RyYXBpLWxpc3QtcG9wb3Zlcl9fY2hlY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDhweCAwO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuLnN0cmFwaS1saXN0LXBvcG92ZXJfX2NoZWNrIGlucHV0IHtcbiAgd2lkdGg6IDEuMjVyZW07XG4gIGhlaWdodDogMS4yNXJlbTtcbn1cbi5zdHJhcGktbGlzdC1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTZweCAyMHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmNTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuLnN0cmFwaS1saXN0LXRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG59XG4uc3RyYXBpLWxpc3QtdGFibGUgdGgge1xuICBwYWRkaW5nOiAxMHB4IDE2cHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5zdHJhcGktbGlzdC10YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cbi5zdHJhcGktbGlzdC1yb3ctbWVudS1jZWxsIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNDRweDtcbn1cbi5zdHJhcGktbGlzdC1yb3ctbWVudS10cmlnZ2VyIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5zdHJhcGktbGlzdC1yb3ctbWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgLSA2cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDIyMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsMzMsNTIsLjEyKTtcbiAgcGFkZGluZzogOHB4IDA7XG4gIHotaW5kZXg6IDI0O1xufVxuLnN0cmFwaS1saXN0LXJvdy1tZW51X19pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5zdHJhcGktbGlzdC1yb3ctbWVudV9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG4uc3RyYXBpLWxpc3Qtcm93LW1lbnVfX2l0ZW0tLWRhbmdlciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xufVxuLnN0cmFwaS1saXN0LXJvdy1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uc3RyYXBpLWxpc3QtdGFibGUgdGggYnV0dG9uIHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uc3RyYXBpLWxpc3QtdGFibGUgdHIgeyBjdXJzb3I6IHBvaW50ZXI7IH1cbi5zdHJhcGktbGlzdC10YWJsZSB0cjpob3ZlciB7IGJhY2tncm91bmQ6ICNmYWZhZmI7IH1cbi5zdHJhcGktbGlzdC1zdGF0dXMge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogMS43NXJlbTtcbiAgcGFkZGluZzogMCAuNjI1cmVtO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogI2VmZmZlZDtcbiAgY29sb3I6ICMyZjY4NDY7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLnN0cmFwaS1wcmltYXJ5IHtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgcGFkZGluZzogMCAuODc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDk0NWZmO1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IC44MTI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uc3RyYXBpLXNlY29uZGFyeSB7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAgLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLnN0cmFwaS1saXN0LWJvb2xlYW4ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxcmVtO1xuICBoZWlnaHQ6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBmb250LXNpemU6IDAuNjI1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLnN0cmFwaS1saXN0LWJvb2xlYW4tLXllcyB7XG4gIGJhY2tncm91bmQ6ICMyZjY4NDY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnN0cmFwaS1saXN0LWJvb2xlYW4tLW5vIHtcbiAgYmFja2dyb3VuZDogI2QwMmIyMDtcbiAgY29sb3I6ICNmZmY7XG59XG5AbWVkaWEgKG1heC13aWR0aDogMTE4MHB4KSB7XG4gIC5zdHJhcGktbGF5b3V0IHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAuc3RyYXBpLWVkaXRvciB7IHBhZGRpbmc6IDIwcHggMTZweCA0OHB4OyB9XG4gIC5zdHJhcGktZmllbGQtZ3JpZCB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyB9XG4gIC5zdHJhcGktbGlzdC10b29sYmFyIHsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IHN0cmV0Y2g7IH1cbiAgLnN0cmFwaS1zZWFyY2gtd3JhcCB7IHdpZHRoOiAxMDAlOyB9XG59XG5gO1xuXG5mdW5jdGlvbiB0b0xhYmVsKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVcbiAgICAucmVwbGFjZSgvKFthLXowLTldKShbQS1aXSkvZywgJyQxICQyJylcbiAgICAucmVwbGFjZSgvW18tXSsvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXGJmYXFcXGIvZ2ksICdGQVEnKVxuICAgIC5yZXBsYWNlKC9eLi8sICh2KSA9PiB2LnRvVXBwZXJDYXNlKCkpO1xufVxuXG5mdW5jdGlvbiBjbG9uZVZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG59XG5cbmZ1bmN0aW9uIGdldEVtcHR5SXRlbShzYW1wbGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2FtcGxlKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmIChzYW1wbGUgJiYgdHlwZW9mIHNhbXBsZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgT2JqZWN0LmtleXMoc2FtcGxlKVxuICAgICAgICAubWFwKChrZXkpID0+IHtcbiAgICAgICAgICBpZiAoWydpZCcsICdkb2N1bWVudElkJywgJ3N0YXR1cycsICd1cGRhdGVkQXQnLCAncHVibGlzaGVkQXQnXS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gW2tleSwgc2FtcGxlW2tleV0gPz8gbnVsbF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIFtrZXksIGdldEVtcHR5SXRlbShzYW1wbGVba2V5XSldO1xuICAgICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzYW1wbGUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2FtcGxlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKChpdGVtKSA9PiB0b0NvbXBhcmFibGVWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSlcbiAgICAgIC5zb3J0KClcbiAgICAgIC5maWx0ZXIoKGtleSkgPT4gIVsndXBkYXRlZEF0JywgJ3B1Ymxpc2hlZEF0JywgJ3N0YXR1cyddLmluY2x1ZGVzKGtleSkpXG4gICAgICAucmVkdWNlKChhY2N1bXVsYXRvciwga2V5KSA9PiB7XG4gICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZVtrZXldKTtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBoYXNNZWFuaW5nZnVsVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNvbWUoKGl0ZW0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh2YWx1ZSlcbiAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiAhWydpZCcsICdkb2N1bWVudElkJywgJ3VwZGF0ZWRBdCcsICdwdWJsaXNoZWRBdCcsICdzdGF0dXMnXS5pbmNsdWRlcyhrZXkpKVxuICAgICAgLnNvbWUoKFssIG5lc3RlZFZhbHVlXSkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKG5lc3RlZFZhbHVlKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlICE9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWRtaW5QYXRoKHBhdGhuYW1lLCBwYXJhbXMpIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIE9iamVjdC5lbnRyaWVzKHBhcmFtcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICBzZWFyY2hQYXJhbXMuc2V0KGtleSwgU3RyaW5nKHZhbHVlKSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBxdWVyeVN0cmluZyA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxdWVyeVN0cmluZyA/IGA/JHtxdWVyeVN0cmluZ31gIDogJyd9YDtcbn1cblxuZnVuY3Rpb24gcGFyc2VEaXNwbGF5ZWRGaWVsZHModmFsdWUpIHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSA/PyAnJylcbiAgICAuc3BsaXQoJywnKVxuICAgIC5tYXAoKGZpZWxkKSA9PiBmaWVsZC50cmltKCkpXG4gICAgLmZpbHRlcihCb29sZWFuKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VJbnB1dFZhbHVlKG5leHRSYXdWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIGlmIChuZXh0UmF3VmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRSYXdWYWx1ZSk7XG4gICAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQpID8gY3VycmVudFZhbHVlIDogcGFyc2VkO1xuICB9XG4gIHJldHVybiBuZXh0UmF3VmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0UGF0aCh2YWx1ZSwgcGF0aCwgbmV4dFZhbHVlKSB7XG4gIGlmICghcGF0aC5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV4dFZhbHVlO1xuICB9XG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IHVwZGF0ZUF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0LCBuZXh0VmFsdWUpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUF0UGF0aCh2YWx1ZSwgcGF0aCkge1xuICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5maWx0ZXIoKF8sIGluZGV4KSA9PiBpbmRleCAhPT0gcGF0aFswXSkgOiB2YWx1ZTtcbiAgfVxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSByZW1vdmVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kQXRQYXRoKHZhbHVlLCBwYXRoLCBuZXh0SXRlbSkge1xuICBpZiAoIXBhdGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFsuLi4oQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdKSwgbmV4dEl0ZW1dO1xuICB9XG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IGFwcGVuZEF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0LCBuZXh0SXRlbSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheVRpdGxlKGRlZmluaXRpb24sIHJlY29yZCkge1xuICBpZiAoIXJlY29yZCkge1xuICAgIHJldHVybiBkZWZpbml0aW9uLmxhYmVsO1xuICB9XG4gIHJldHVybiByZWNvcmRbZGVmaW5pdGlvbi50aXRsZUZpZWxkXSB8fCBkZWZpbml0aW9uLmxhYmVsO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0UGFnZShwYWdlTmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSA/PyB7fSk7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYC9hZG1pbi9hcGkvcGFnZXMvJHtwYWdlTmFtZX0ke3F1ZXJ5U3RyaW5nID8gYD8ke3F1ZXJ5U3RyaW5nfWAgOiAnJ31gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QgPz8gJ0dFVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogb3B0aW9ucy5ib2R5ID8gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5ib2R5KSA6IHVuZGVmaW5lZCxcbiAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgIH0sXG4gICk7XG5cbiAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQubWVzc2FnZSA/PyAnUmVxdWVzdCBmYWlsZWQnKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5mdW5jdGlvbiBNZWRpYUZpZWxkKHsgbGFiZWwsIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCB1cmxzID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV0uZmlsdGVyKEJvb2xlYW4pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZmllbGQgc3RyYXBpLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic3RyYXBpLWxhYmVsXCI+e2xhYmVsfTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYV9fY2FudmFzXCI+XG4gICAgICAgICAge3VybHMubGVuZ3RoID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWFfX3N0YWNrXCI+XG4gICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhX190aHVtYlwiIHNyYz17dXJsc1swXX0gYWx0PXtsYWJlbH0gLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWFfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYV9fYWN0aW9uXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHdpbmRvdy5vcGVuKHVybHNbMF0sICdfYmxhbmsnLCAnbm9vcGVuZXIsbm9yZWZlcnJlcicpfT7ihpc8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYV9fYWN0aW9uXCIgdHlwZT1cImJ1dHRvblwiIGRpc2FibGVkPXtkaXNhYmxlZH0gb25DbGljaz17KCkgPT4gb25DaGFuZ2UocGF0aCwgQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbXSA6ICcnKX0+4pyVPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYV9fZmlsZW5hbWVcIj57dXJsc1swXS5zcGxpdCgnLycpLnBvcCgpfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXY+Tm8gbWVkaWEgc2VsZWN0ZWQuPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhX19zb3VyY2VcIj5cbiAgICAgICAgICB7QXJyYXkuaXNBcnJheSh2YWx1ZSkgPyAoXG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RyYXBpLXRleHRhcmVhXCJcbiAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlLmpvaW4oJ1xcbicpfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIGV2ZW50LnRhcmdldC52YWx1ZS5zcGxpdCgnXFxuJykubWFwKChpdGVtKSA9PiBpdGVtLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJPbmUgaW1hZ2UgVVJMIHBlciBsaW5lXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktaW5wdXRcIlxuICAgICAgICAgICAgICB2YWx1ZT17dmFsdWUgPz8gJyd9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJodHRwczovLy4uLlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFByaW1pdGl2ZUZpZWxkKHsgZmllbGQsIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBsYWJlbCA9IHRvTGFiZWwoZmllbGQpO1xuXG4gIGlmIChJTUFHRV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpKSB7XG4gICAgcmV0dXJuIDxNZWRpYUZpZWxkIGxhYmVsPXtsYWJlbH0gdmFsdWU9e3ZhbHVlfSBwYXRoPXtwYXRofSBvbkNoYW5nZT17b25DaGFuZ2V9IGRpc2FibGVkPXtkaXNhYmxlZH0gLz47XG4gIH1cblxuICBpZiAoQk9PTEVBTl9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWZpZWxkIHN0cmFwaS1maWVsZC0tZnVsbFwiPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic3RyYXBpLWxhYmVsXCI+e2xhYmVsfTwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXRvZ2dsZVwiPlxuICAgICAgICAgIDxzcGFuPnt2YWx1ZSA/ICdFbmFibGVkJyA6ICdEaXNhYmxlZCd9PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtCb29sZWFuKHZhbHVlKX0gZGlzYWJsZWQ9e2Rpc2FibGVkfSBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBldmVudC50YXJnZXQuY2hlY2tlZCl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IEZVTExfV0lEVEhfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSA/ICdzdHJhcGktZmllbGQgc3RyYXBpLWZpZWxkLS1mdWxsJyA6ICdzdHJhcGktZmllbGQnO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic3RyYXBpLWxhYmVsXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgICAge2ZpZWxkICE9PSAnc29ydE9yZGVyJyAmJiAhQk9PTEVBTl9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpID8gPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLWxhYmVsX19yZXF1aXJlZFwiPio8L3NwYW4+IDogbnVsbH1cbiAgICAgIDwvbGFiZWw+XG4gICAgICB7TVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkgPyAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT1cInN0cmFwaS10ZXh0YXJlYVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlID8/ICcnfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBwYXJzZUlucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlLCB2YWx1ZSkpfVxuICAgICAgICAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwic3RyYXBpLWlucHV0XCJcbiAgICAgICAgICB0eXBlPXt0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gJ251bWJlcicgOiAndGV4dCd9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlID8/ICcnfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBwYXJzZUlucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlLCB2YWx1ZSkpfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQXJyYXlGaWVsZCh7IGZpZWxkLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IGxhYmVsID0gdG9MYWJlbChmaWVsZCk7XG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZmllbGQgc3RyYXBpLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic3RyYXBpLWxhYmVsXCI+e2xhYmVsfTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1yZXBlYXRhYmxlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXJlcGVhdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktcmVwZWF0YWJsZV9fdGl0bGVcIj57bGFiZWx9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1yZXBlYXRhYmxlX19jb3VudFwiPntpdGVtcy5sZW5ndGh9IGVudHJpZXM8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgPGRldGFpbHMga2V5PXtgJHtmaWVsZH0tJHtpbmRleH1gfSBjbGFzc05hbWU9XCJzdHJhcGktcmVwZWF0YWJsZV9faXRlbVwiIG9wZW49e2luZGV4ID09PSAwfT5cbiAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cInN0cmFwaS1yZXBlYXRhYmxlX19zdW1tYXJ5XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXJlcGVhdGFibGVfX3N1bW1hcnktbGVmdFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0cmFwaS1yZXBlYXRhYmxlX19idWxsZXRcIj7ilrw8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLXJlcGVhdGFibGVfX25hbWVcIj57dHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnID8gaXRlbSB8fCBgJHtsYWJlbH0gJHtpbmRleCArIDF9YCA6IGl0ZW0/LnRleHQgfHwgYCR7bGFiZWx9ICR7aW5kZXggKyAxfWB9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktcmVwZWF0YWJsZV9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0cmFwaS1yZXBlYXRhYmxlX19pY29uLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvblJlbW92ZUl0ZW0oWy4uLnBhdGgsIGluZGV4XSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIPCfl5FcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj7ii67ii648L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zdW1tYXJ5PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktcmVwZWF0YWJsZV9fYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZmllbGQgc3RyYXBpLWZpZWxkLS1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic3RyYXBpLWxhYmVsXCI+e2xhYmVsID09PSAnVGFncycgPyAnVGV4dCcgOiBsYWJlbC5zbGljZSgwLCAtMSkgfHwgbGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnID8gaXRlbSA6IGl0ZW0/LnRleHQgPz8gJyd9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoWy4uLnBhdGgsIGluZGV4XSwgeyB0ZXh0OiBldmVudC50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgKSl9XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RyYXBpLXJlcGVhdGFibGVfX2FkZFwiIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2xpY2s9eygpID0+IG9uQWRkSXRlbShwYXRoLCB7IHRleHQ6ICcnIH0pfT5cbiAgICAgICAgICArIEFkZCBhbiBlbnRyeVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBGaWVsZFJlbmRlcmVyKHsgZmllbGQsIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIDxBcnJheUZpZWxkIGZpZWxkPXtmaWVsZH0gdmFsdWU9e3ZhbHVlfSBwYXRoPXtwYXRofSBvbkNoYW5nZT17b25DaGFuZ2V9IG9uQWRkSXRlbT17b25BZGRJdGVtfSBvblJlbW92ZUl0ZW09e29uUmVtb3ZlSXRlbX0gZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPjtcbiAgfVxuICByZXR1cm4gPFByaW1pdGl2ZUZpZWxkIGZpZWxkPXtmaWVsZH0gdmFsdWU9e3ZhbHVlfSBwYXRoPXtwYXRofSBvbkNoYW5nZT17b25DaGFuZ2V9IGRpc2FibGVkPXtkaXNhYmxlZH0gLz47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckxpc3RDZWxsKGZpZWxkLCB2YWx1ZSkge1xuICBpZiAoZmllbGQgPT09ICdzdGF0dXMnKSB7XG4gICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cInN0cmFwaS1saXN0LXN0YXR1c1wiPnt2YWx1ZX08L3NwYW4+O1xuICB9XG5cbiAgaWYgKChmaWVsZCA9PT0gJ2ZlYXR1cmVkJyB8fCBmaWVsZCA9PT0gJ2lzRmVhdHVyZWQnIHx8IGZpZWxkID09PSAnaXNQb3B1bGFyJykgJiYgKHZhbHVlID09PSAnWWVzJyB8fCB2YWx1ZSA9PT0gJ05vJykpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgc3RyYXBpLWxpc3QtYm9vbGVhbiAke3ZhbHVlID09PSAnWWVzJyA/ICdzdHJhcGktbGlzdC1ib29sZWFuLS15ZXMnIDogJ3N0cmFwaS1saXN0LWJvb2xlYW4tLW5vJ31gfT5cbiAgICAgICAge3ZhbHVlID09PSAnWWVzJyA/ICfinJMnIDogJ+KclSd9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gTGlzdFZpZXcoe1xuICBkZWZpbml0aW9uLFxuICByZWNvcmRzLFxuICBjb250cm9scyxcbiAgc2VhcmNoLFxuICBsb2FkaW5nLFxuICBvblNlYXJjaCxcbiAgb25PcGVuUmVjb3JkLFxuICBvbkNyZWF0ZSxcbiAgb25TZXRTb3J0LFxuICBvblNldEZpbHRlcixcbiAgb25SZXNldEZpbHRlcnMsXG4gIG9uVG9nZ2xlRGlzcGxheWVkRmllbGQsXG4gIG9uUmVzZXREaXNwbGF5ZWRGaWVsZHMsXG4gIG9uRHVwbGljYXRlUmVjb3JkLFxuICBvbkRlbGV0ZVJlY29yZCxcbn0pIHtcbiAgY29uc3QgW3Nob3dTZWFyY2gsIHNldFNob3dTZWFyY2hdID0gdXNlU3RhdGUoQm9vbGVhbihzZWFyY2gpKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93RGlzcGxheWVkLCBzZXRTaG93RGlzcGxheWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NlYXJjaFZhbHVlLCBzZXRTZWFyY2hWYWx1ZV0gPSB1c2VTdGF0ZShzZWFyY2gpO1xuICBjb25zdCBbb3Blbk1lbnVJZCwgc2V0T3Blbk1lbnVJZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgbWVudVJlZiA9IHVzZVJlZihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFNlYXJjaFZhbHVlKHNlYXJjaCk7XG4gIH0sIFtzZWFyY2hdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoc2VhcmNoVmFsdWUgIT09IHNlYXJjaCkge1xuICAgICAgICBvblNlYXJjaChzZWFyY2hWYWx1ZSk7XG4gICAgICB9XG4gICAgfSwgMjUwKTtcblxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICB9LCBbb25TZWFyY2gsIHNlYXJjaCwgc2VhcmNoVmFsdWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAobWVudVJlZi5jdXJyZW50ICYmICFtZW51UmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICBzZXRPcGVuTWVudUlkKG51bGwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGRpc3BsYXllZENvbHVtbnMgPSB1c2VNZW1vKFxuICAgICgpID0+IGNvbnRyb2xzLmF2YWlsYWJsZUZpZWxkcy5maWx0ZXIoKGZpZWxkKSA9PiBjb250cm9scy5kaXNwbGF5ZWRGaWVsZHMuaW5jbHVkZXMoZmllbGQuZmllbGQpKSxcbiAgICBbY29udHJvbHMuYXZhaWxhYmxlRmllbGRzLCBjb250cm9scy5kaXNwbGF5ZWRGaWVsZHNdLFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZWRpdG9yXCI+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZWRpdG9yX19pbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1oZWFkZXJcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWV0YVwiPkNvbGxlY3Rpb24gVHlwZTwvZGl2PlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInN0cmFwaS10aXRsZVwiPntkZWZpbml0aW9uLmxhYmVsfTwvaDE+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0cmFwaS1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQ3JlYXRlfT4rIENyZWF0ZSBuZXcgZW50cnk8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1tZXRhXCI+e3JlY29yZHMubGVuZ3RofSBlbnRyaWVzIGZvdW5kPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC10b29sYmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktdG9vbGJhci1jbHVzdGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHN0cmFwaS10b29sYmFyLWJ1dHRvbiBzdHJhcGktdG9vbGJhci1idXR0b24tLWljb24ke3Nob3dTZWFyY2ggPyAnIHN0cmFwaS10b29sYmFyLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93U2VhcmNoKChjdXJyZW50KSA9PiAhY3VycmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIPCflI1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge3Nob3dTZWFyY2ggPyAoXG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0cmFwaS10b29sYmFyLXNlYXJjaFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFZhbHVlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFNlYXJjaFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgIGF1dG9Gb2N1c1xuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHN0cmFwaS10b29sYmFyLWJ1dHRvbiR7c2hvd0ZpbHRlcnMgPyAnIHN0cmFwaS10b29sYmFyLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0U2hvd0ZpbHRlcnMoKGN1cnJlbnQpID0+ICFjdXJyZW50KTtcbiAgICAgICAgICAgICAgICBzZXRTaG93RGlzcGxheWVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgRmlsdGVyc1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB7c2hvd0ZpbHRlcnMgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWxpc3QtcG9wb3ZlclwiIHN0eWxlPXt7IGxlZnQ6IHNob3dTZWFyY2ggPyAzMzIgOiA1MiwgcmlnaHQ6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1saXN0LXBvcG92ZXJfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWxpc3QtcG9wb3Zlcl9fdGl0bGVcIj5GaWx0ZXJzPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0cmFwaS1saXN0LXBvcG92ZXJfX3Jlc2V0XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uUmVzZXRGaWx0ZXJzfT5SZXNldDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtjb250cm9scy5maWx0ZXJzLm1hcCgoZmlsdGVyKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZmlsdGVyLmZpZWxkfSBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1wb3BvdmVyX19ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic3RyYXBpLWxpc3QtcG9wb3Zlcl9fbGFiZWxcIj57ZmlsdGVyLmxhYmVsfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1wb3BvdmVyX19zZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb250cm9scy5hY3RpdmVGaWx0ZXJzW2ZpbHRlci5maWVsZF0gPz8gJyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25TZXRGaWx0ZXIoZmlsdGVyLmZpZWxkLCBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPkFsbDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXIub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdGlvbn0gdmFsdWU9e29wdGlvbn0+e29wdGlvbn08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1saXN0LWFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXRvb2xiYXItY2x1c3RlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgc3RyYXBpLXRvb2xiYXItYnV0dG9uIHN0cmFwaS10b29sYmFyLWJ1dHRvbi0taWNvbiR7c2hvd0Rpc3BsYXllZCA/ICcgc3RyYXBpLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRTaG93RGlzcGxheWVkKChjdXJyZW50KSA9PiAhY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOKamVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAge3Nob3dEaXNwbGF5ZWQgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1wb3BvdmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1saXN0LXBvcG92ZXJfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1wb3BvdmVyX190aXRsZVwiPkRpc3BsYXllZCBmaWVsZHM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0cmFwaS1saXN0LXBvcG92ZXJfX3Jlc2V0XCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblJlc2V0RGlzcGxheWVkRmllbGRzfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgUmVzZXRcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtjb250cm9scy5hdmFpbGFibGVGaWVsZHMubWFwKChmaWVsZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwga2V5PXtmaWVsZC5maWVsZH0gY2xhc3NOYW1lPVwic3RyYXBpLWxpc3QtcG9wb3Zlcl9fY2hlY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtjb250cm9scy5kaXNwbGF5ZWRGaWVsZHMuaW5jbHVkZXMoZmllbGQuZmllbGQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25Ub2dnbGVEaXNwbGF5ZWRGaWVsZChmaWVsZC5maWVsZCwgZXZlbnQudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2ZpZWxkLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1jYXJkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1jYXJkX19oZWFkXCI+XG4gICAgICAgICAgICA8c3Ryb25nPntkZWZpbml0aW9uLmxhYmVsfTwvc3Ryb25nPlxuICAgICAgICAgICAgPHNwYW4+e2xvYWRpbmcgPyAnTG9hZGluZy4uLicgOiBgJHtyZWNvcmRzLmxlbmd0aH0gZW50cmllc2B9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC10YWJsZVwiPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2Rpc3BsYXllZENvbHVtbnMubWFwKChjb2x1bW4pID0+IChcbiAgICAgICAgICAgICAgICAgIDx0aCBrZXk9e2NvbHVtbi5maWVsZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uU2V0U29ydChjb2x1bW4uZmllbGQpfT5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29sdW1uLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgIHtjb250cm9scy5zb3J0QnkgPT09IGNvbHVtbi5maWVsZCA/IGAgJHtjb250cm9scy5zb3J0T3JkZXIgPT09ICdhc2MnID8gJ+KGkScgOiAn4oaTJ31gIDogJyd9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8dGggLz5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyZWNvcmRzLm1hcCgocmVjb3JkKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cmVjb3JkLmRvY3VtZW50SWR9IG9uQ2xpY2s9eygpID0+IG9uT3BlblJlY29yZChyZWNvcmQuaWQpfT5cbiAgICAgICAgICAgICAgICAgIHtkaXNwbGF5ZWRDb2x1bW5zLm1hcCgoY29sdW1uKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBrZXk9e2Ake3JlY29yZC5kb2N1bWVudElkfS0ke2NvbHVtbi5maWVsZH1gfT57cmVuZGVyTGlzdENlbGwoY29sdW1uLmZpZWxkLCByZWNvcmQuY29sdW1uc1tjb2x1bW4uZmllbGRdKX08L3RkPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwic3RyYXBpLWxpc3Qtcm93LW1lbnUtY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RyYXBpLWxpc3Qtcm93LW1lbnUtdHJpZ2dlclwiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE9wZW5NZW51SWQoKGN1cnJlbnQpID0+IChjdXJyZW50ID09PSByZWNvcmQuaWQgPyBudWxsIDogcmVjb3JkLmlkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIOKAplxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge29wZW5NZW51SWQgPT09IHJlY29yZC5pZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9e21lbnVSZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1yb3ctbWVudVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RyYXBpLWxpc3Qtcm93LW1lbnVfX2l0ZW1cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRPcGVuTWVudUlkKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbk9wZW5SZWNvcmQocmVjb3JkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1yb3ctbWVudV9faWNvblwiPuKcjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RWRpdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1yb3ctbWVudV9faXRlbVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldE9wZW5NZW51SWQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHVwbGljYXRlUmVjb3JkKHJlY29yZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLWxpc3Qtcm93LW1lbnVfX2ljb25cIj7ip4k8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkR1cGxpY2F0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1yb3ctbWVudV9faXRlbSBzdHJhcGktbGlzdC1yb3ctbWVudV9faXRlbS0tZGFuZ2VyXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25EZWxldGVSZWNvcmQocmVjb3JkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktbGlzdC1yb3ctbWVudV9faWNvblwiPvCfl5E8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRlbGV0ZSBlbnRyeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBFZGl0Vmlldyh7IGRlZmluaXRpb24sIHJlY29yZCwgcHVibGlzaGVkUmVjb3JkLCBhY3RpdmVUYWIsIG9uU3dpdGNoVGFiLCBzYXZpbmcsIGVycm9yLCBvbkJhY2ssIG9uQ2hhbmdlLCBvbkFkZEl0ZW0sIG9uUmVtb3ZlSXRlbSwgb25TYXZlLCBvblB1Ymxpc2gsIG9uRGVsZXRlLCBvbkRpc2NhcmRDaGFuZ2VzLCBvblVucHVibGlzaCwgY2FuU2F2ZSwgY2FuUHVibGlzaCwgY2FuRGlzY2FyZCwgY2FuVW5wdWJsaXNoIH0pIHtcbiAgY29uc3QgZGlzcGxheWVkUmVjb3JkID0gYWN0aXZlVGFiID09PSAncHVibGlzaGVkJyAmJiBwdWJsaXNoZWRSZWNvcmQgPyBwdWJsaXNoZWRSZWNvcmQgOiByZWNvcmQ7XG4gIGNvbnN0IGlzUHVibGlzaGVkVmlldyA9IGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkUmVjb3JkO1xuICBjb25zdCBbbWVudU9wZW4sIHNldE1lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgbWVudVJlZiA9IHVzZVJlZihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbWVudU9wZW4pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChtZW51UmVmLmN1cnJlbnQgJiYgIW1lbnVSZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgfTtcbiAgfSwgW21lbnVPcGVuXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1lZGl0b3JcIj5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1lZGl0b3JfX2lubmVyXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RyYXBpLWJhY2tcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25CYWNrfT7ihpAgQmFjazwvYnV0dG9uPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWhlYWRlclwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZXRhXCI+Q29sbGVjdGlvbiBUeXBlPC9kaXY+XG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwic3RyYXBpLXRpdGxlXCI+e2dldERpc3BsYXlUaXRsZShkZWZpbml0aW9uLCBkaXNwbGF5ZWRSZWNvcmQpfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1zdGF0dXNcIj57cHVibGlzaGVkUmVjb3JkID8gJ1B1Ymxpc2hlZCcgOiAoZGlzcGxheWVkUmVjb3JkLnN0YXR1cyB8fCAnRHJhZnQnKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0cmFwaS1rZWJhYlwiIHR5cGU9XCJidXR0b25cIj7igKY8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktdGFic1wiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgc3RyYXBpLXRhYiR7YWN0aXZlVGFiID09PSAnZHJhZnQnID8gJyBzdHJhcGktdGFiLS1hY3RpdmUnIDogJyd9YH0gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uU3dpdGNoVGFiKCdkcmFmdCcpfT5EUkFGVDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgc3RyYXBpLXRhYiR7YWN0aXZlVGFiID09PSAncHVibGlzaGVkJyA/ICcgc3RyYXBpLXRhYi0tYWN0aXZlJyA6ICcnfWB9IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBwdWJsaXNoZWRSZWNvcmQgJiYgb25Td2l0Y2hUYWIoJ3B1Ymxpc2hlZCcpfT5QVUJMSVNIRUQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge2Vycm9yID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiPntlcnJvcn08L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1sYXlvdXRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tYWluLWNhcmRcIj5cbiAgICAgICAgICAgIHtkZWZpbml0aW9uLmVkaXRMYXlvdXQubWFwKChyb3csIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgcm93LSR7aW5kZXh9YH0gY2xhc3NOYW1lPVwic3RyYXBpLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgICB7cm93Lm1hcCgoZmllbGQpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkUmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2ZpZWxkfVxuICAgICAgICAgICAgICAgICAgICAgIGZpZWxkPXtmaWVsZH1cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZGlzcGxheWVkUmVjb3JkW2ZpZWxkXX1cbiAgICAgICAgICAgICAgICAgICAgICBwYXRoPXtbZmllbGRdfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkFkZEl0ZW09e29uQWRkSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZUl0ZW09e29uUmVtb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNQdWJsaXNoZWRWaWV3fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YXNpZGU+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1zaWRlLWNhcmRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1jYXJkX19oZWFkXCI+RW50cnk8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1idXR0b24tcm93XCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0cmFwaS1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uUHVibGlzaH0gZGlzYWJsZWQ9eyFjYW5QdWJsaXNofT5QdWJsaXNoPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0cmFwaS1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHN0cmFwaS1zaWRlLWJ1dHRvbi0tbWVudVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRNZW51T3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpfT7igKY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIHttZW51T3BlbiA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9e21lbnVSZWZ9IGNsYXNzTmFtZT1cInN0cmFwaS1zaWRlLWFjdGlvbi1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gc3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvblVucHVibGlzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuVW5wdWJsaXNofVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0cmFwaS1zaWRlLWFjdGlvbi1tZW51X19pY29uXCI+w5c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICBVbnB1Ymxpc2hcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1hY3Rpb24tbWVudV9faXRlbSBzdHJhcGktc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGlzY2FyZENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhbkRpc2NhcmR9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2ljb25cIj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIERpc2NhcmQgY2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RyYXBpLXNpZGUtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uU2F2ZX0gZGlzYWJsZWQ9eyFjYW5TYXZlfT5cbiAgICAgICAgICAgICAgICAgIHtzYXZpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlJ31cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXNpZGUtY2FyZF9faGVhZFwiPkFjdGlvbnM8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1idXR0b24tLXNlY29uZGFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkRlbGV0ZX0gZGlzYWJsZWQ9e2lzUHVibGlzaGVkVmlld30+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9hc2lkZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29sbGVjdGlvbk1hbmFnZXIoKSB7XG4gIGNvbnN0IHsgcGFnZU5hbWUgfSA9IHVzZVBhcmFtcygpO1xuICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgYWRkTm90aWNlID0gdXNlTm90aWNlKCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbbGlzdExvYWRpbmcsIHNldExpc3RMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NhdmluZywgc2V0U2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RlZmluaXRpb24sIHNldERlZmluaXRpb25dID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtyZWNvcmRzLCBzZXRSZWNvcmRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2NvbnRyb2xzLCBzZXRDb250cm9sc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3JlY29yZCwgc2V0UmVjb3JkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbb3JpZ2luYWxSZWNvcmQsIHNldE9yaWdpbmFsUmVjb3JkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbcHVibGlzaGVkUmVjb3JkLCBzZXRQdWJsaXNoZWRSZWNvcmRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZSgnZHJhZnQnKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgY29uc3QgcXVlcnkgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKSwgW2xvY2F0aW9uLnNlYXJjaF0pO1xuICBjb25zdCByZWNvcmRJZCA9IHF1ZXJ5LmdldCgncmVjb3JkSWQnKTtcbiAgY29uc3QgaXNOZXcgPSBxdWVyeS5nZXQoJ25ldycpID09PSAnMSc7XG4gIGNvbnN0IHNlYXJjaCA9IHF1ZXJ5LmdldCgnc2VhcmNoJykgfHwgJyc7XG4gIGNvbnN0IHN0YXR1cyA9IHF1ZXJ5LmdldCgnc3RhdHVzJykgfHwgJyc7XG4gIGNvbnN0IGNhdGVnb3J5ID0gcXVlcnkuZ2V0KCdjYXRlZ29yeScpIHx8ICcnO1xuICBjb25zdCBwbGFuVHlwZSA9IHF1ZXJ5LmdldCgncGxhblR5cGUnKSB8fCAnJztcbiAgY29uc3QgZmVhdHVyZWQgPSBxdWVyeS5nZXQoJ2ZlYXR1cmVkJykgfHwgJyc7XG4gIGNvbnN0IGlzRmVhdHVyZWQgPSBxdWVyeS5nZXQoJ2lzRmVhdHVyZWQnKSB8fCAnJztcbiAgY29uc3QgaXNQb3B1bGFyID0gcXVlcnkuZ2V0KCdpc1BvcHVsYXInKSB8fCAnJztcbiAgY29uc3Qgc29ydEJ5ID0gcXVlcnkuZ2V0KCdzb3J0QnknKSB8fCAnJztcbiAgY29uc3Qgc29ydE9yZGVyID0gcXVlcnkuZ2V0KCdzb3J0T3JkZXInKSB8fCAnJztcbiAgY29uc3QgZGlzcGxheWVkRmllbGRzID0gcGFyc2VEaXNwbGF5ZWRGaWVsZHMocXVlcnkuZ2V0KCdkaXNwbGF5ZWRGaWVsZHMnKSk7XG5cbiAgY29uc3QgbW9kZSA9IHVzZU1lbW8oKCkgPT4gKHJlY29yZElkIHx8IGlzTmV3ID8gJ2VkaXQnIDogJ2xpc3QnKSwgW3JlY29yZElkLCBpc05ld10pO1xuICBjb25zdCBpc0RpcnR5ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShyZWNvcmQpKSAhPT0gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUob3JpZ2luYWxSZWNvcmQpKSxcbiAgICBbcmVjb3JkLCBvcmlnaW5hbFJlY29yZF0sXG4gICk7XG4gIGNvbnN0IGhhc0RyYWZ0Q29udGVudCA9IHVzZU1lbW8oKCkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKHJlY29yZCksIFtyZWNvcmRdKTtcbiAgY29uc3QgY2FuU2F2ZSA9IG1vZGUgPT09ICdlZGl0JyAmJiAhc2F2aW5nICYmIGFjdGl2ZVRhYiAhPT0gJ3B1Ymxpc2hlZCcgJiYgaXNEaXJ0eTtcbiAgY29uc3QgY2FuUHVibGlzaCA9IG1vZGUgPT09ICdlZGl0JyAmJiAhc2F2aW5nICYmIGFjdGl2ZVRhYiAhPT0gJ3B1Ymxpc2hlZCcgJiYgKHB1Ymxpc2hlZFJlY29yZCA/IGlzRGlydHkgOiBoYXNEcmFmdENvbnRlbnQpO1xuICBjb25zdCBjYW5EaXNjYXJkID0gbW9kZSA9PT0gJ2VkaXQnICYmICFzYXZpbmcgJiYgYWN0aXZlVGFiICE9PSAncHVibGlzaGVkJyAmJiBoYXNEcmFmdENvbnRlbnQ7XG4gIGNvbnN0IGNhblVucHVibGlzaCA9IG1vZGUgPT09ICdlZGl0JyAmJiAhc2F2aW5nICYmIEJvb2xlYW4ocHVibGlzaGVkUmVjb3JkKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBhY3RpdmUgPSB0cnVlO1xuXG4gICAgY29uc3QgbG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHNob3VsZEJsb2NrID0gbW9kZSA9PT0gJ2VkaXQnIHx8ICFkZWZpbml0aW9uO1xuICAgICAgaWYgKHNob3VsZEJsb2NrKSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRMaXN0TG9hZGluZyh0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNldEVycm9yKCcnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICAgIHF1ZXJ5OiBtb2RlID09PSAnZWRpdCdcbiAgICAgICAgICAgID8gKHJlY29yZElkID8geyByZWNvcmRJZCB9IDogeyBuZXc6ICcxJyB9KVxuICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgIHNlYXJjaCxcbiAgICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgICAgcGxhblR5cGUsXG4gICAgICAgICAgICAgIGZlYXR1cmVkLFxuICAgICAgICAgICAgICBpc0ZlYXR1cmVkLFxuICAgICAgICAgICAgICBpc1BvcHVsYXIsXG4gICAgICAgICAgICAgIHNvcnRCeSxcbiAgICAgICAgICAgICAgc29ydE9yZGVyLFxuICAgICAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRpc3BsYXllZEZpZWxkcy5qb2luKCcsJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldERlZmluaXRpb24ocGF5bG9hZC5kZWZpbml0aW9uKTtcbiAgICAgICAgc2V0UmVjb3JkcyhwYXlsb2FkLnJlY29yZHMgPz8gW10pO1xuICAgICAgICBzZXRDb250cm9scyhwYXlsb2FkLmNvbnRyb2xzID8/IG51bGwpO1xuICAgICAgICBjb25zdCBuZXh0RHJhZnRSZWNvcmQgPSBwYXlsb2FkLmRyYWZ0UmVjb3JkID8gY2xvbmVWYWx1ZShwYXlsb2FkLmRyYWZ0UmVjb3JkKSA6IG51bGw7XG4gICAgICAgIHNldFJlY29yZChuZXh0RHJhZnRSZWNvcmQpO1xuICAgICAgICBzZXRPcmlnaW5hbFJlY29yZChuZXh0RHJhZnRSZWNvcmQgPyBjbG9uZVZhbHVlKG5leHREcmFmdFJlY29yZCkgOiBudWxsKTtcbiAgICAgICAgc2V0UHVibGlzaGVkUmVjb3JkKHBheWxvYWQucHVibGlzaGVkUmVjb3JkID8gY2xvbmVWYWx1ZShwYXlsb2FkLnB1Ymxpc2hlZFJlY29yZCkgOiBudWxsKTtcbiAgICAgICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgICAgfSBjYXRjaCAobG9hZEVycm9yKSB7XG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldEVycm9yKGxvYWRFcnJvci5tZXNzYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICBzZXRMaXN0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZCgpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuICB9LCBbbW9kZSwgcGFnZU5hbWUsIHJlY29yZElkLCBpc05ldywgc2VhcmNoLCBzdGF0dXMsIGNhdGVnb3J5LCBwbGFuVHlwZSwgZmVhdHVyZWQsIGlzRmVhdHVyZWQsIGlzUG9wdWxhciwgc29ydEJ5LCBzb3J0T3JkZXIsIGRpc3BsYXllZEZpZWxkcy5qb2luKCcsJyldKTtcblxuICBjb25zdCB1cGRhdGVMaXN0UXVlcnkgPSAocGF0Y2gpID0+IHtcbiAgICBjb25zdCBuZXh0UGFyYW1zID0ge1xuICAgICAgc2VhcmNoLFxuICAgICAgc3RhdHVzLFxuICAgICAgY2F0ZWdvcnksXG4gICAgICBwbGFuVHlwZSxcbiAgICAgIGZlYXR1cmVkLFxuICAgICAgaXNGZWF0dXJlZCxcbiAgICAgIGlzUG9wdWxhcixcbiAgICAgIHNvcnRCeSxcbiAgICAgIHNvcnRPcmRlcixcbiAgICAgIGRpc3BsYXllZEZpZWxkczogZGlzcGxheWVkRmllbGRzLmpvaW4oJywnKSxcbiAgICAgIC4uLnBhdGNoLFxuICAgIH07XG5cbiAgICBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgbmV4dFBhcmFtcykpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChwYXRoLCBuZXh0VmFsdWUpID0+IHtcbiAgICBzZXRSZWNvcmQoKGN1cnJlbnQpID0+IHVwZGF0ZUF0UGF0aChjdXJyZW50LCBwYXRoLCBuZXh0VmFsdWUpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRJdGVtID0gKHBhdGgsIG5leHRJdGVtKSA9PiB7XG4gICAgc2V0UmVjb3JkKChjdXJyZW50KSA9PiBhcHBlbmRBdFBhdGgoY3VycmVudCwgcGF0aCwgbmV4dEl0ZW0pKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZW1vdmVJdGVtID0gKHBhdGgpID0+IHtcbiAgICBzZXRSZWNvcmQoKGN1cnJlbnQpID0+IHJlbW92ZUF0UGF0aChjdXJyZW50LCBwYXRoKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZUludGVudCA9IGFzeW5jIChpbnRlbnQpID0+IHtcbiAgICBpZiAoIXJlY29yZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGludGVudCxcbiAgICAgICAgICByZWNvcmRJZDogcmVjb3JkLmlkID8/IG51bGwsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIG5ldzogaXNOZXcgPyAnMScgOiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgaWYgKHBheWxvYWQuZHJhZnRSZWNvcmQpIHtcbiAgICAgICAgY29uc3QgbmV4dERyYWZ0UmVjb3JkID0gY2xvbmVWYWx1ZShwYXlsb2FkLmRyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0UmVjb3JkKG5leHREcmFmdFJlY29yZCk7XG4gICAgICAgIHNldE9yaWdpbmFsUmVjb3JkKGNsb25lVmFsdWUobmV4dERyYWZ0UmVjb3JkKSk7XG4gICAgICB9XG4gICAgICBzZXRQdWJsaXNoZWRSZWNvcmQocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQgPyBjbG9uZVZhbHVlKHBheWxvYWQucHVibGlzaGVkUmVjb3JkKSA6IG51bGwpO1xuICAgICAgaWYgKGludGVudCA9PT0gJ3VucHVibGlzaCcpIHtcbiAgICAgICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlY29yZElkICYmIHBheWxvYWQuZHJhZnRSZWNvcmQ/LmlkKSB7XG4gICAgICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IHJlY29yZElkOiBwYXlsb2FkLmRyYWZ0UmVjb3JkLmlkIH0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBheWxvYWQubm90aWNlKSB7XG4gICAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHBheWxvYWQubm90aWNlLm1lc3NhZ2UsIHR5cGU6IHBheWxvYWQubm90aWNlLnR5cGUgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXlsb2FkLmRlbGV0ZWQpIHtcbiAgICAgICAgbmF2aWdhdGUoYC9hZG1pbi9wYWdlcy8ke3BhZ2VOYW1lfWApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKHJlcXVlc3RFcnJvcikge1xuICAgICAgc2V0RXJyb3IocmVxdWVzdEVycm9yLm1lc3NhZ2UpO1xuICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcmVxdWVzdEVycm9yLm1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURpc2NhcmRDaGFuZ2VzID0gKCkgPT4ge1xuICAgIHNldFJlY29yZChnZXRFbXB0eUl0ZW0ocmVjb3JkKSk7XG4gICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNyZWF0ZSA9IGFzeW5jICgpID0+IHtcbiAgICBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyBuZXc6IDEgfSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxpc3RBY3Rpb24gPSBhc3luYyAoaW50ZW50LCB0YXJnZXRSZWNvcmRJZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVxdWVzdFBhZ2UocGFnZU5hbWUsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBpbnRlbnQsXG4gICAgICAgICAgcmVjb3JkSWQ6IHRhcmdldFJlY29yZElkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHBheWxvYWQubm90aWNlPy5tZXNzYWdlID8/IGAke2RlZmluaXRpb24ubGFiZWx9IHVwZGF0ZWQuYCwgdHlwZTogcGF5bG9hZC5ub3RpY2U/LnR5cGUgPz8gJ3N1Y2Nlc3MnIH0pO1xuXG4gICAgICBpZiAoaW50ZW50ID09PSAnZHVwbGljYXRlJyAmJiBwYXlsb2FkLmRyYWZ0UmVjb3JkPy5pZCkge1xuICAgICAgICBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyByZWNvcmRJZDogcGF5bG9hZC5kcmFmdFJlY29yZC5pZCB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGludGVudCA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgc2V0UmVjb3JkcygoY3VycmVudCkgPT4gY3VycmVudC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IHRhcmdldFJlY29yZElkKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAocmVxdWVzdEVycm9yKSB7XG4gICAgICBzZXRFcnJvcihyZXF1ZXN0RXJyb3IubWVzc2FnZSk7XG4gICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiByZXF1ZXN0RXJyb3IubWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGhlaWdodDogJzEwMCUnIH19PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgcmV0dXJuIDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj5Db2xsZWN0aW9uIGRlZmluaXRpb24gbWlzc2luZy48L01lc3NhZ2VCb3g+O1xuICB9XG5cbiAgaWYgKG1vZGUgPT09ICdsaXN0Jykge1xuICAgIHJldHVybiAoXG4gICAgICA8TGlzdFZpZXdcbiAgICAgICAgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn1cbiAgICAgICAgcmVjb3Jkcz17cmVjb3Jkc31cbiAgICAgICAgY29udHJvbHM9e2NvbnRyb2xzID8/IHtcbiAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRlZmluaXRpb24ubGlzdENvbHVtbnMubWFwKChjb2x1bW4pID0+IGNvbHVtbi5maWVsZCksXG4gICAgICAgICAgYXZhaWxhYmxlRmllbGRzOiBkZWZpbml0aW9uLmxpc3RDb2x1bW5zLFxuICAgICAgICAgIGZpbHRlcnM6IFtdLFxuICAgICAgICAgIGFjdGl2ZUZpbHRlcnM6IHt9LFxuICAgICAgICAgIHNvcnRCeTogJycsXG4gICAgICAgICAgc29ydE9yZGVyOiAnZGVzYycsXG4gICAgICAgIH19XG4gICAgICAgIHNlYXJjaD17c2VhcmNofVxuICAgICAgICBsb2FkaW5nPXtsaXN0TG9hZGluZ31cbiAgICAgICAgb25TZWFyY2g9eyhuZXh0U2VhcmNoKSA9PiB1cGRhdGVMaXN0UXVlcnkoeyBzZWFyY2g6IG5leHRTZWFyY2ggfSl9XG4gICAgICAgIG9uT3BlblJlY29yZD17KG5leHRSZWNvcmRJZCkgPT4gbmF2aWdhdGUoYnVpbGRBZG1pblBhdGgobG9jYXRpb24ucGF0aG5hbWUsIHsgcmVjb3JkSWQ6IG5leHRSZWNvcmRJZCB9KSl9XG4gICAgICAgIG9uQ3JlYXRlPXtoYW5kbGVDcmVhdGV9XG4gICAgICAgIG9uU2V0U29ydD17KGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV4dE9yZGVyID0gY29udHJvbHM/LnNvcnRCeSA9PT0gZmllbGQgJiYgY29udHJvbHM/LnNvcnRPcmRlciA9PT0gJ2FzYycgPyAnZGVzYycgOiAnYXNjJztcbiAgICAgICAgICB1cGRhdGVMaXN0UXVlcnkoeyBzb3J0Qnk6IGZpZWxkLCBzb3J0T3JkZXI6IG5leHRPcmRlciB9KTtcbiAgICAgICAgfX1cbiAgICAgICAgb25TZXRGaWx0ZXI9eyhmaWVsZCwgdmFsdWUpID0+IHVwZGF0ZUxpc3RRdWVyeSh7IFtmaWVsZF06IHZhbHVlIH0pfVxuICAgICAgICBvblJlc2V0RmlsdGVycz17KCkgPT4gdXBkYXRlTGlzdFF1ZXJ5KHtcbiAgICAgICAgICBzdGF0dXM6ICcnLFxuICAgICAgICAgIGNhdGVnb3J5OiAnJyxcbiAgICAgICAgICBwbGFuVHlwZTogJycsXG4gICAgICAgICAgZmVhdHVyZWQ6ICcnLFxuICAgICAgICAgIGlzRmVhdHVyZWQ6ICcnLFxuICAgICAgICAgIGlzUG9wdWxhcjogJycsXG4gICAgICAgIH0pfVxuICAgICAgICBvblRvZ2dsZURpc3BsYXllZEZpZWxkPXsoZmllbGQsIGNoZWNrZWQpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXh0RmllbGRzID0gY2hlY2tlZFxuICAgICAgICAgICAgPyBbLi4ubmV3IFNldChbLi4uKGNvbnRyb2xzPy5kaXNwbGF5ZWRGaWVsZHMgPz8gW10pLCBmaWVsZF0pXVxuICAgICAgICAgICAgOiAoY29udHJvbHM/LmRpc3BsYXllZEZpZWxkcyA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBmaWVsZCk7XG5cbiAgICAgICAgICB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgICAgZGlzcGxheWVkRmllbGRzOiBuZXh0RmllbGRzLmpvaW4oJywnKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfX1cbiAgICAgICAgb25SZXNldERpc3BsYXllZEZpZWxkcz17KCkgPT4gdXBkYXRlTGlzdFF1ZXJ5KHtcbiAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRlZmluaXRpb24ubGlzdENvbHVtbnMubWFwKChjb2x1bW4pID0+IGNvbHVtbi5maWVsZCkuam9pbignLCcpLFxuICAgICAgICB9KX1cbiAgICAgICAgb25EdXBsaWNhdGVSZWNvcmQ9eyh0YXJnZXRSZWNvcmRJZCkgPT4gaGFuZGxlTGlzdEFjdGlvbignZHVwbGljYXRlJywgdGFyZ2V0UmVjb3JkSWQpfVxuICAgICAgICBvbkRlbGV0ZVJlY29yZD17KHRhcmdldFJlY29yZElkKSA9PiBoYW5kbGVMaXN0QWN0aW9uKCdkZWxldGUnLCB0YXJnZXRSZWNvcmRJZCl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBpZiAoIXJlY29yZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxFZGl0Vmlld1xuICAgICAgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn1cbiAgICAgIHJlY29yZD17cmVjb3JkfVxuICAgICAgcHVibGlzaGVkUmVjb3JkPXtwdWJsaXNoZWRSZWNvcmR9XG4gICAgICBhY3RpdmVUYWI9e2FjdGl2ZVRhYn1cbiAgICAgIG9uU3dpdGNoVGFiPXtzZXRBY3RpdmVUYWJ9XG4gICAgICBzYXZpbmc9e3NhdmluZ31cbiAgICAgIGVycm9yPXtlcnJvcn1cbiAgICAgIG9uQmFjaz17KCkgPT4gbmF2aWdhdGUoYC9hZG1pbi9wYWdlcy8ke3BhZ2VOYW1lfWApfVxuICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgIG9uQWRkSXRlbT17aGFuZGxlQWRkSXRlbX1cbiAgICAgIG9uUmVtb3ZlSXRlbT17aGFuZGxlUmVtb3ZlSXRlbX1cbiAgICAgIG9uU2F2ZT17KCkgPT4gaGFuZGxlU2F2ZUludGVudCgnc2F2ZScpfVxuICAgICAgb25QdWJsaXNoPXsoKSA9PiBoYW5kbGVTYXZlSW50ZW50KCdwdWJsaXNoJyl9XG4gICAgICBvbkRlbGV0ZT17KCkgPT4gaGFuZGxlU2F2ZUludGVudCgnZGVsZXRlJyl9XG4gICAgICBvbkRpc2NhcmRDaGFuZ2VzPXtoYW5kbGVEaXNjYXJkQ2hhbmdlc31cbiAgICAgIG9uVW5wdWJsaXNoPXsoKSA9PiBoYW5kbGVTYXZlSW50ZW50KCd1bnB1Ymxpc2gnKX1cbiAgICAgIGNhblNhdmU9e2NhblNhdmV9XG4gICAgICBjYW5QdWJsaXNoPXtjYW5QdWJsaXNofVxuICAgICAgY2FuRGlzY2FyZD17Y2FuRGlzY2FyZH1cbiAgICAgIGNhblVucHVibGlzaD17Y2FuVW5wdWJsaXNofVxuICAgIC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUGFyYW1zIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IEFwaUNsaWVudCwgdXNlTm90aWNlIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBMb2FkZXIsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG5jb25zdCBNVUxUSUxJTkVfRklFTERfUEFUVEVSTiA9IC8oZGVzY3JpcHRpb258Y29udGVudHxtZXNzYWdlfGJvZHl8c3VidGl0bGV8ZXhjZXJwdHxpbnRyb3xob3Vyc3xhZGRyZXNzfHRleHR8cGFyYWdyYXBofG92ZXJ2aWV3fGNoYWxsZW5nZXxyZXN1bHQpL2k7XG5jb25zdCBJTUFHRV9GSUVMRF9QQVRURVJOID0gLyhpbWFnZXxiYWNrZ3JvdW5kfGxvZ298dGh1bWJuYWlsfGZlYXR1cmVkKS9pO1xuY29uc3QgRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fG1lc3NhZ2V8Ym9keXxzdWJ0aXRsZXxleGNlcnB0fGludHJvfG92ZXJ2aWV3fGNoYWxsZW5nZXxyZXN1bHR8YmFja2dyb3VuZHxpbWFnZXxnYWxsZXJ5fHNlY3Rpb25zfHRlc3RpbW9uaWFsc3xzZXJ2aWNlc3x3aHlDaG9vc2VJdGVtc3xmZWF0dXJlQ2hpcHN8c29jaWFsTGlua3N8ZmFxSXRlbXN8Y29tcGFyaXNvblJvd3N8Y29tcGFyaXNvbkNvbHVtbnN8c3RvcnlQYXJhZ3JhcGhzfHJlbGF0ZWRXb3Jrc3BhY2VzfGNoYWxsZW5nZUl0ZW1zfGFtZW5pdGllc3xuYXZpZ2F0aW9ufGZvb3Rlcnxmb3JtKS9pO1xuY29uc3QgSU1BR0VfVVJMX1BBVFRFUk4gPSAvXmh0dHBzPzpcXC9cXC8uKy9pO1xuY29uc3QgUkVRVUlSRURfRklFTERfUEFUVEVSTiA9IC8oaGVyb1RpdGxlfGhlcm9TdWJ0aXRsZXxzdG9yeVRpdGxlfHdoeUNob29zZVRpdGxlfGFtZW5pdGllc1RpdGxlfHRpdGxlKSQvaTtcblxuY29uc3QgUEFHRV9MQVlPVVRTID0ge1xuICAnc2l0ZS1zZXR0aW5ncyc6IFtcbiAgICB7IGZpZWxkczogWydzaXRlTmFtZScsICd0YWdsaW5lJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0RW1haWwnLCAnY29udGFjdFBob25lJywgJ2FkZHJlc3MnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2RlZmF1bHRTZW9UaXRsZScsICdkZWZhdWx0U2VvRGVzY3JpcHRpb24nXSB9LFxuICAgIHsgZmllbGRzOiBbJ25hdmlnYXRpb24nXSB9LFxuICAgIHsgZmllbGRzOiBbJ2Zvb3RlciddIH0sXG4gICAgeyBmaWVsZHM6IFsnc29jaWFsTGlua3MnXSB9LFxuICBdLFxuICBob21lcGFnZTogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm8nLCAnZmVhdHVyZUNoaXBzJ10gfSxcbiAgICB7IGZpZWxkczogWydzZXJ2aWNlc0V5ZWJyb3cnLCAnc2VydmljZXNLaWNrZXInLCAnc2VydmljZXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2Fib3V0SGlnaGxpZ2h0J10gfSxcbiAgICB7IGZpZWxkczogWyd3aHlDaG9vc2VFeWVicm93JywgJ3doeUNob29zZUtpY2tlcicsICd3aHlDaG9vc2VUaXRsZScsICd3aHlDaG9vc2VJdGVtcyddIH0sXG4gICAgeyBmaWVsZHM6IFsndGVzdGltb25pYWxzRXllYnJvdycsICd0ZXN0aW1vbmlhbHNLaWNrZXInLCAndGVzdGltb25pYWxzVGl0bGUnLCAndGVzdGltb25pYWxzJ10gfSxcbiAgICB7IGZpZWxkczogWydnYWxsZXJ5RXllYnJvdycsICdnYWxsZXJ5S2lja2VyJywgJ2dhbGxlcnlUaXRsZScsICdnYWxsZXJ5SW1hZ2VzJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0Rm9ybSddIH0sXG4gICAgeyBmaWVsZHM6IFsndmlzaXRVc1RpdGxlJywgJ2FkZHJlc3NMYWJlbCcsICdlbWFpbExhYmVsJywgJ3Bob25lTGFiZWwnLCAnb3BlbkhvdXJzTGFiZWwnLCAnd2Vla2RheUhvdXJzJywgJ3dlZWtlbmRIb3VycycsICdtYXBCdXR0b25MYWJlbCddIH0sXG4gIF0sXG4gICdhYm91dC1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnc3RvcnlUaXRsZScsICdzdG9yeVBhcmFncmFwaHMnLCAnc3RvcnlJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnd2h5Q2hvb3NlVGl0bGUnLCAnd2h5Q2hvb3NlSXRlbXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2FtZW5pdGllc1RpdGxlJywgJ2FtZW5pdGllc0ltYWdlJywgJ2FtZW5pdGllcyddIH0sXG4gIF0sXG4gICdibG9nLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydzZWFyY2hQbGFjZWhvbGRlcicsICdxdWlja1NlYXJjaFRpdGxlJywgJ3JlY2VudFBvc3RzVGl0bGUnLCAnY2F0ZWdvcmllc1RpdGxlJywgJ3BvcHVsYXJUYWdzVGl0bGUnLCAnbm9SZXN1bHRzVGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnZGV0YWlsQmFja0xhYmVsJywgJ2RldGFpbFNlYXJjaFRpdGxlJywgJ2RldGFpbFNlYXJjaEJ1dHRvbkxhYmVsJywgJ2RldGFpbFBvcHVsYXJUYWdzVGl0bGUnLCAnZGV0YWlsUmVjZW50UG9zdHNUaXRsZScsICdkZXRhaWxSZWxhdGVkV29ya3NwYWNlc1RpdGxlJ10gfSxcbiAgICB7IGZpZWxkczogWydkZXRhaWxDb21tZW50Rm9ybSddIH0sXG4gICAgeyBmaWVsZHM6IFsncmVsYXRlZFdvcmtzcGFjZXMnXSB9LFxuICBdLFxuICAncHJpY2luZy1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29tcGFyaXNvblRpdGxlJywgJ2ZlYXR1cmVMaXN0VGl0bGUnLCAnZmVhdHVyZUxpc3RTdWJ0aXRsZScsICdjb21wYXJpc29uQ29sdW1ucycsICdjb21wYXJpc29uUm93cycsICdyZWNvbW1lbmRlZExhYmVsJywgJ3B1cmNoYXNlQnV0dG9uTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2ZhcVRpdGxlJywgJ2ZhcVN1YnRpdGxlJywgJ2ZhcUl0ZW1zJ10gfSxcbiAgXSxcbiAgJ2ZhcS1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2V5ZWJyb3cnLCAnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJywgJ3RpdGxlJywgJ2Rlc2NyaXB0aW9uJ10gfSxcbiAgICB7IGZpZWxkczogWydzZWFyY2hQbGFjZWhvbGRlcicsICdub1Jlc3VsdHNUZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydjdGFUaXRsZScsICdjdGFEZXNjcmlwdGlvbicsICdjdGFCdXR0b25MYWJlbCddIH0sXG4gIF0sXG4gICdtZWV0aW5nLXJvb21zLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydyb29tc1RpdGxlJywgJ3Jvb21zU3VidGl0bGUnLCAnYm9va05vd0xhYmVsJywgJ3JlYWRNb3JlTGFiZWwnLCAncG9wdWxhckxhYmVsJ10gfSxcbiAgICB7IGZpZWxkczogWydwbGFuc1RpdGxlJywgJ3BsYW5zU3VidGl0bGUnLCAnZ2V0U3RhcnRlZExhYmVsJ10gfSxcbiAgICB7IGZpZWxkczogWydhbWVuaXRpZXNUaXRsZScsICdhbWVuaXRpZXNTdWJ0aXRsZScsICdhbWVuaXRpZXMnXSB9LFxuICBdLFxuICAndmlydHVhbC1vZmZpY2UtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ292ZXJ2aWV3VGl0bGUnLCAnb3ZlcnZpZXdUZXh0JywgJ2ZlYXR1cmVkSW1hZ2UnLCAnZ2FsbGVyeUltYWdlcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnY2hhbGxlbmdlVGl0bGUnLCAnY2hhbGxlbmdlSW50cm8nLCAnY2hhbGxlbmdlSXRlbXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Jlc3VsdFRpdGxlJywgJ3Jlc3VsdFRleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2N0YVRpdGxlJywgJ2N0YURlc2NyaXB0aW9uJywgJ2N0YUJ1dHRvbkxhYmVsJ10gfSxcbiAgICB7IGZpZWxkczogWydwcm9qZWN0SW5mb1RpdGxlJywgJ3Byb2plY3REYXRlTGFiZWwnLCAncHJvamVjdERhdGVWYWx1ZScsICdwcm9qZWN0V2Vic2l0ZUxhYmVsJywgJ3Byb2plY3RXZWJzaXRlVmFsdWUnLCAncHJvamVjdENhdGVnb3J5TGFiZWwnLCAncHJvamVjdENhdGVnb3J5VmFsdWUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RGb3JtJ10gfSxcbiAgXSxcbiAgJ2NvbnRhY3QtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2ludHJvRXllYnJvdycsICdpbnRyb1RpdGxlJ10gfSxcbiAgICB7IGZpZWxkczogWydhZGRyZXNzQ2FyZFRpdGxlJywgJ3Bob25lQ2FyZFRpdGxlJywgJ2VtYWlsQ2FyZFRpdGxlJ10gfSxcbiAgICB7IGZpZWxkczogWydmb3JtJ10gfSxcbiAgICB7IGZpZWxkczogWydtYXBUaXRsZScsICdtYXBEZXNjcmlwdGlvbiddIH0sXG4gIF0sXG4gICdwcml2YWN5LXBvbGljeS1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2VmZmVjdGl2ZURhdGVMYWJlbCcsICdlZmZlY3RpdmVEYXRlVmFsdWUnLCAnaW50cm9UZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydzZWN0aW9ucyddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdFRpdGxlJywgJ2NvbnRhY3RCb2R5JywgJ2NvbnRhY3RCdXR0b25MYWJlbCddIH0sXG4gIF0sXG4gICd0ZXJtcy1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2VmZmVjdGl2ZURhdGVMYWJlbCcsICdlZmZlY3RpdmVEYXRlVmFsdWUnLCAnaW50cm9UZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydzZWN0aW9ucyddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdFRpdGxlJywgJ2NvbnRhY3RCb2R5JywgJ2NvbnRhY3RCdXR0b25MYWJlbCddIH0sXG4gIF0sXG59O1xuXG5jb25zdCBQUkVWSUVXX1BBVEhTID0ge1xuICBob21lcGFnZTogJy8nLFxuICAnYWJvdXQtcGFnZSc6ICcvYWJvdXQnLFxuICAnYmxvZy1wYWdlJzogJy9ibG9nJyxcbiAgJ3ByaWNpbmctcGFnZSc6ICcvcHJpY2luZycsXG4gICdmYXEtcGFnZSc6ICcvZmFxJyxcbiAgJ21lZXRpbmctcm9vbXMtcGFnZSc6ICcvbWVldGluZy1yb29tcycsXG4gICd2aXJ0dWFsLW9mZmljZS1wYWdlJzogJy92aXJ0dWFsLW9mZmljZScsXG4gICdjb250YWN0LXBhZ2UnOiAnL2NvbnRhY3QnLFxuICAncHJpdmFjeS1wb2xpY3ktcGFnZSc6ICcvcHJpdmFjeS1wb2xpY3knLFxuICAndGVybXMtcGFnZSc6ICcvdGVybXMnLFxufTtcblxuY29uc3QgU1RZTEVTID0gYFxuLnN0cmFwaS1lZGl0b3Ige1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAzMnB4IDQwcHggNjRweCAzNDRweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5zdHJhcGktZWRpdG9yX19pbm5lciB7XG4gIG1heC13aWR0aDogMTI0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLnN0cmFwaS1iYWNrIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbn1cblxuLnN0cmFwaS1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG5cbi5zdHJhcGktbWV0YSB7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG59XG5cbi5zdHJhcGktdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMi4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uc3RyYXBpLXN0YXR1cyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIG1hcmdpbi10b3A6IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjNmYwYzI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2VmZmZlZDtcbiAgY29sb3I6ICMyZjY4NDY7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnN0cmFwaS1rZWJhYiB7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnN0cmFwaS10YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWFlZjtcbn1cblxuLnN0cmFwaS10YWIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDAgMCAxMnB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc3RyYXBpLXRhYi0tYWN0aXZlIHtcbiAgY29sb3I6ICM0OTQ1ZmY7XG59XG5cbi5zdHJhcGktdGFiLS1hY3RpdmU6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogLTFweDtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG59XG5cbi5zdHJhcGktbGF5b3V0IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwgMWZyKSAyMzJweDtcbiAgZ2FwOiAxNnB4O1xuICBhbGlnbi1pdGVtczogc3RhcnQ7XG59XG5cbi5zdHJhcGktbWFpbi1jYXJkLFxuLnN0cmFwaS1zaWRlLWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xufVxuXG4uc3RyYXBpLW1haW4tY2FyZCB7XG4gIHBhZGRpbmc6IDI0cHg7XG59XG5cbi5zdHJhcGktc2VjdGlvbiArIC5zdHJhcGktc2VjdGlvbiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5zdHJhcGktZmllbGQtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKTtcbiAgZ2FwOiAyMHB4IDI0cHg7XG59XG5cbi5zdHJhcGktZmllbGQge1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5zdHJhcGktZmllbGQtLWZ1bGwge1xuICBncmlkLWNvbHVtbjogMSAvIC0xO1xufVxuXG4uc3RyYXBpLWxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMnB4O1xuICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uc3RyYXBpLWxhYmVsX19yZXF1aXJlZCB7XG4gIGNvbG9yOiAjZDAyYjIwO1xufVxuXG4uc3RyYXBpLWlucHV0LFxuLnN0cmFwaS10ZXh0YXJlYSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwLjYyNXJlbSAwLjg3NXJlbTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5zdHJhcGktaW5wdXQge1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG59XG5cbi5zdHJhcGktaW5wdXQ6Zm9jdXMsXG4uc3RyYXBpLXRleHRhcmVhOmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjNDk0NWZmO1xuICBib3gtc2hhZG93OiAwIDAgMCAxcHggIzQ5NDVmZjtcbn1cblxuLnN0cmFwaS1pbnB1dDpkaXNhYmxlZCxcbi5zdHJhcGktdGV4dGFyZWE6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLnN0cmFwaS10ZXh0YXJlYSB7XG4gIG1pbi1oZWlnaHQ6IDUuNzVyZW07XG4gIHJlc2l6ZTogdmVydGljYWw7XG59XG5cbi5zdHJhcGktbWVkaWEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG5cbi5zdHJhcGktbWVkaWFfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDE0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uc3RyYXBpLW1lZGlhX19lbXB0eSB7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbn1cblxuLnN0cmFwaS1tZWRpYV9fc3RhY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbn1cblxuLnN0cmFwaS1tZWRpYV9fdGh1bWIge1xuICBtYXgtd2lkdGg6IDI0MHB4O1xuICBtYXgtaGVpZ2h0OiAxNDBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuLnN0cmFwaS1tZWRpYV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xufVxuXG4uc3RyYXBpLW1lZGlhX19hY3Rpb24ge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5zdHJhcGktbWVkaWFfX2FjdGlvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uc3RyYXBpLW1lZGlhX19maWxlbmFtZSB7XG4gIG1heC13aWR0aDogMjgwcHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLnN0cmFwaS1tZWRpYV9fc291cmNlIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cblxuLnN0cmFwaS1vYmplY3Qge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG5cbi5zdHJhcGktb2JqZWN0X190aXRsZSB7XG4gIG1hcmdpbjogMCAwIDEycHg7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5zdHJhcGktcmVwZWF0YWJsZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLnN0cmFwaS1yZXBlYXRhYmxlX19oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMTZweCAxMHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmNTtcbn1cblxuLnN0cmFwaS1yZXBlYXRhYmxlX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uc3RyYXBpLXJlcGVhdGFibGVfX2NvdW50IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbn1cblxuLnN0cmFwaS1yZXBlYXRhYmxlX19pdGVtICsgLnN0cmFwaS1yZXBlYXRhYmxlX19pdGVtIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5zdHJhcGktcmVwZWF0YWJsZV9faXRlbVtvcGVuXSBzdW1tYXJ5IHtcbiAgYmFja2dyb3VuZDogI2ZhZmFmYjtcbn1cblxuLnN0cmFwaS1yZXBlYXRhYmxlX19zdW1tYXJ5IHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc3RyYXBpLXJlcGVhdGFibGVfX3N1bW1hcnk6Oi13ZWJraXQtZGV0YWlscy1tYXJrZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uc3RyYXBpLXJlcGVhdGFibGVfX3N1bW1hcnktbGVmdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uc3RyYXBpLXJlcGVhdGFibGVfX2J1bGxldCB7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBiYWNrZ3JvdW5kOiAjZjBmMGY1O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IDAuNjI1cmVtO1xufVxuXG4uc3RyYXBpLXJlcGVhdGFibGVfX25hbWUge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uc3RyYXBpLXJlcGVhdGFibGVfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuXG4uc3RyYXBpLXJlcGVhdGFibGVfX2ljb24tYnV0dG9uIHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbn1cblxuLnN0cmFwaS1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbjpkaXNhYmxlZCxcbi5zdHJhcGktcmVwZWF0YWJsZV9fYWRkOmRpc2FibGVkLFxuLnN0cmFwaS1zaWRlLWJ1dHRvbjpkaXNhYmxlZCxcbi5zdHJhcGktc2lkZS1idXR0b24tLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5zdHJhcGktcmVwZWF0YWJsZV9faWNvbi1idXR0b246ZGlzYWJsZWQsXG4uc3RyYXBpLXJlcGVhdGFibGVfX2FkZDpkaXNhYmxlZCB7XG4gIGNvbG9yOiAjOGU4ZWE5O1xufVxuXG4uc3RyYXBpLXJlcGVhdGFibGVfX2JvZHkge1xuICBwYWRkaW5nOiAxNnB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uc3RyYXBpLXJlcGVhdGFibGVfX2FkZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc3RyYXBpLXN3aXRjaCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMC42MjVyZW0gMC44NzVyZW07XG59XG5cbi5zdHJhcGktc3dpdGNoIGlucHV0IHtcbiAgYWNjZW50LWNvbG9yOiAjNDk0NWZmO1xufVxuXG4uc3RyYXBpLXN3aXRjaDpoYXMoaW5wdXQ6ZGlzYWJsZWQpIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG5cbi5zdHJhcGktc2lkZS1jYXJkICsgLnN0cmFwaS1zaWRlLWNhcmQge1xuICBtYXJnaW4tdG9wOiAxMnB4O1xufVxuXG4uc3RyYXBpLXNpZGUtY2FyZF9faGVhZCB7XG4gIHBhZGRpbmc6IDE0cHggMTZweCA4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4uc3RyYXBpLXNpZGUtY2FyZF9fYm9keSB7XG4gIHBhZGRpbmc6IDAgMTJweCAxMnB4O1xufVxuXG4uc3RyYXBpLXNpZGUtYnV0dG9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnN0cmFwaS1zaWRlLWJ1dHRvbixcbi5zdHJhcGktc2lkZS1idXR0b24tLXNlY29uZGFyeSB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc3RyYXBpLXNpZGUtYnV0dG9uIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5zdHJhcGktc2lkZS1idXR0b24tLXNlY29uZGFyeSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uc3RyYXBpLXNpZGUtYnV0dG9uOmRpc2FibGVkLFxuLnN0cmFwaS1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbn1cblxuLnN0cmFwaS1zaWRlLWJ1dHRvbi0tbWVudSB7XG4gIHdpZHRoOiAycmVtO1xuICBmbGV4OiAwIDAgMnJlbTtcbn1cblxuLnN0cmFwaS1zaWRlLWJ1dHRvbi0tcHJldmlldyB7XG4gIG1hcmdpbi10b3A6IDRweDtcbn1cblxuLnN0cmFwaS1zaWRlLWFjdGlvbi1tZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IGNhbGMoMTAwJSArIDhweCk7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMjIwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywgMzMsIDUyLCAwLjEyKTtcbiAgcGFkZGluZzogOHB4IDA7XG4gIHotaW5kZXg6IDQwO1xufVxuXG4uc3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uc3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuXG4uc3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xufVxuXG4uc3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5zdHJhcGktc2lkZS1hY3Rpb24tbWVudV9faWNvbiB7XG4gIHdpZHRoOiAxOHB4O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMTE4MHB4KSB7XG4gIC5zdHJhcGktbGF5b3V0IHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLnN0cmFwaS1lZGl0b3Ige1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0OHB4O1xuICB9XG5cbiAgLnN0cmFwaS1maWVsZC1ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuYDtcblxuZnVuY3Rpb24gdG9MYWJlbChuYW1lKSB7XG4gIHJldHVybiBuYW1lXG4gICAgLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csICckMSAkMicpXG4gICAgLnJlcGxhY2UoL1tfLV0rL2csICcgJylcbiAgICAucmVwbGFjZSgvXFxic2VvXFxiL2dpLCAnU0VPJylcbiAgICAucmVwbGFjZSgvXFxiY3RhXFxiL2dpLCAnQ1RBJylcbiAgICAucmVwbGFjZSgvXFxiZmFxXFxiL2dpLCAnRkFRJylcbiAgICAucmVwbGFjZSgvXFxiaWRcXGIvZ2ksICdJRCcpXG4gICAgLnJlcGxhY2UoL1xcYnVybFxcYi9naSwgJ1VSTCcpXG4gICAgLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgIC50cmltKClcbiAgICAucmVwbGFjZSgvXi4vLCAodmFsdWUpID0+IHZhbHVlLnRvVXBwZXJDYXNlKCkpO1xufVxuXG5mdW5jdGlvbiBjbG9uZVZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG59XG5cbmZ1bmN0aW9uIHRvQ29tcGFyYWJsZVZhbHVlKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5tYXAoKGl0ZW0pID0+IHRvQ29tcGFyYWJsZVZhbHVlKGl0ZW0pKTtcbiAgfVxuXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSlcbiAgICAgIC5zb3J0KClcbiAgICAgIC5maWx0ZXIoKGtleSkgPT4ga2V5ICE9PSAnX190ZW1wSWQnKVxuICAgICAgLnJlZHVjZSgoYWNjdW11bGF0b3IsIGtleSkgPT4ge1xuICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gdG9Db21wYXJhYmxlVmFsdWUodmFsdWVba2V5XSk7XG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaGFzTWVhbmluZ2Z1bFZhbHVlKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5zb21lKChpdGVtKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHZhbHVlKVxuICAgICAgLmZpbHRlcigoW2tleV0pID0+IGtleSAhPT0gJ19fdGVtcElkJylcbiAgICAgIC5zb21lKChbLCBuZXN0ZWRWYWx1ZV0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShuZXN0ZWRWYWx1ZSkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZSAhPSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsZW5hbWUodXJsKSB7XG4gIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcGF0aG5hbWUgPSBuZXcgVVJMKHVybCkucGF0aG5hbWU7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRobmFtZS5zcGxpdCgnLycpLnBvcCgpO1xuICAgIHJldHVybiBmaWxlbmFtZSB8fCB1cmw7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1cmwuc3BsaXQoJy8nKS5wb3AoKSB8fCB1cmw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RW1wdHlJdGVtKHNhbXBsZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShzYW1wbGUpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKHNhbXBsZSAmJiB0eXBlb2Ygc2FtcGxlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICBPYmplY3Qua2V5cyhzYW1wbGUpXG4gICAgICAgIC5maWx0ZXIoKGtleSkgPT4ga2V5ICE9PSAnaWQnKVxuICAgICAgICAubWFwKChrZXkpID0+IFtrZXksIGdldEVtcHR5SXRlbShzYW1wbGVba2V5XSldKSxcbiAgICApO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzYW1wbGUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2FtcGxlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdFBhdGgodmFsdWUsIHBhdGgsIG5leHRWYWx1ZSkge1xuICBpZiAoIXBhdGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5leHRWYWx1ZTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IHVwZGF0ZUF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0LCBuZXh0VmFsdWUpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUF0UGF0aCh2YWx1ZSwgcGF0aCkge1xuICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlLmZpbHRlcigoXywgaW5kZXgpID0+IGluZGV4ICE9PSBwYXRoWzBdKTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IHJlbW92ZUF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0KTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRBdFBhdGgodmFsdWUsIHBhdGgsIG5leHRJdGVtKSB7XG4gIGlmICghcGF0aC5sZW5ndGgpIHtcbiAgICByZXR1cm4gWy4uLihBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW10pLCBuZXh0SXRlbV07XG4gIH1cblxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSBhcHBlbmRBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgbmV4dEl0ZW0pO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSW5wdXRWYWx1ZShuZXh0UmF3VmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGN1cnJlbnRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAobmV4dFJhd1ZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRSYXdWYWx1ZSk7XG4gICAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQpID8gY3VycmVudFZhbHVlIDogcGFyc2VkO1xuICB9XG5cbiAgcmV0dXJuIG5leHRSYXdWYWx1ZTtcbn1cblxuZnVuY3Rpb24gaXNSZXF1aXJlZEZpZWxkKGZpZWxkS2V5KSB7XG4gIHJldHVybiBSRVFVSVJFRF9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGRLZXkpO1xufVxuXG5mdW5jdGlvbiBmaWVsZENsYXNzTmFtZShmaWVsZEtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIEZVTExfV0lEVEhfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkS2V5KSB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJ1xuICAgID8gJ3N0cmFwaS1maWVsZCBzdHJhcGktZmllbGQtLWZ1bGwnXG4gICAgOiAnc3RyYXBpLWZpZWxkJztcbn1cblxuZnVuY3Rpb24gZ2V0SXRlbVRpdGxlKGl0ZW0sIGZhbGxiYWNrTGFiZWwsIGluZGV4KSB7XG4gIGlmICghaXNQbGFpbk9iamVjdChpdGVtKSkge1xuICAgIHJldHVybiBgJHtmYWxsYmFja0xhYmVsfSAke2luZGV4ICsgMX1gO1xuICB9XG5cbiAgY29uc3QgcHJlZmVycmVkID0gW1xuICAgIGl0ZW0udGl0bGUsXG4gICAgaXRlbS5uYW1lLFxuICAgIGl0ZW0ubGFiZWwsXG4gICAgaXRlbS5xdWVzdGlvbixcbiAgICBpdGVtLmZlYXR1cmUsXG4gICAgaXRlbS5wYXRoLFxuICAgIGl0ZW0uaHJlZixcbiAgICBpdGVtLmFsdCxcbiAgXS5maW5kKCh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS50cmltKCkpO1xuXG4gIHJldHVybiBwcmVmZXJyZWQgfHwgYCR7ZmFsbGJhY2tMYWJlbH0gJHtpbmRleCArIDF9YDtcbn1cblxuZnVuY3Rpb24gYnVpbGRTZWN0aW9ucyhwYWdlTmFtZSwgY29udGVudCkge1xuICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoY29udGVudCA/PyB7fSk7XG4gIGNvbnN0IGxheW91dCA9IFBBR0VfTEFZT1VUU1twYWdlTmFtZV07XG5cbiAgaWYgKCFsYXlvdXQpIHtcbiAgICByZXR1cm4gW3sgZW50cmllcyB9XTtcbiAgfVxuXG4gIGNvbnN0IHVzZWQgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHNlY3Rpb25zID0gbGF5b3V0XG4gICAgLm1hcCgoc2VjdGlvbikgPT4ge1xuICAgICAgY29uc3Qgc2VjdGlvbkVudHJpZXMgPSBzZWN0aW9uLmZpZWxkc1xuICAgICAgICAuZmlsdGVyKChmaWVsZCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbnRlbnQgPz8ge30sIGZpZWxkKSlcbiAgICAgICAgLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICB1c2VkLmFkZChmaWVsZCk7XG4gICAgICAgICAgcmV0dXJuIFtmaWVsZCwgY29udGVudFtmaWVsZF1dO1xuICAgICAgICB9KTtcblxuICAgICAgcmV0dXJuIHsgLi4uc2VjdGlvbiwgZW50cmllczogc2VjdGlvbkVudHJpZXMgfTtcbiAgICB9KVxuICAgIC5maWx0ZXIoKHNlY3Rpb24pID0+IHNlY3Rpb24uZW50cmllcy5sZW5ndGggPiAwKTtcblxuICBjb25zdCBleHRyYUVudHJpZXMgPSBlbnRyaWVzLmZpbHRlcigoW2ZpZWxkS2V5XSkgPT4gIXVzZWQuaGFzKGZpZWxkS2V5KSk7XG5cbiAgaWYgKGV4dHJhRW50cmllcy5sZW5ndGgpIHtcbiAgICBzZWN0aW9ucy5wdXNoKHsgZW50cmllczogZXh0cmFFbnRyaWVzIH0pO1xuICB9XG5cbiAgcmV0dXJuIHNlY3Rpb25zO1xufVxuXG5mdW5jdGlvbiBQcmltaXRpdmVGaWVsZCh7IGZpZWxkS2V5LCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSB0b0xhYmVsKGZpZWxkS2V5KTtcbiAgY29uc3QgaW5wdXRWYWx1ZSA9IHZhbHVlID8/ICcnO1xuICBjb25zdCByZXF1aXJlZCA9IGlzUmVxdWlyZWRGaWVsZChmaWVsZEtleSk7XG4gIGNvbnN0IGlzSW1hZ2VGaWVsZCA9IHR5cGVvZiBpbnB1dFZhbHVlID09PSAnc3RyaW5nJyAmJiBJTUFHRV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGRLZXkpO1xuICBjb25zdCBzaG93UHJldmlldyA9IGlzSW1hZ2VGaWVsZCAmJiBJTUFHRV9VUkxfUEFUVEVSTi50ZXN0KGlucHV0VmFsdWUpO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZmllbGRDbGFzc05hbWUoZmllbGRLZXksIHZhbHVlKX0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJzdHJhcGktbGFiZWxcIj5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAge3JlcXVpcmVkID8gPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLWxhYmVsX19yZXF1aXJlZFwiPio8L3NwYW4+IDogbnVsbH1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc3dpdGNoXCI+XG4gICAgICAgICAgPHNwYW4+e3ZhbHVlID8gJ0VuYWJsZWQnIDogJ0Rpc2FibGVkJ308L3NwYW4+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgY2hlY2tlZD17dmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBldmVudC50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKGlzSW1hZ2VGaWVsZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1maWVsZCBzdHJhcGktZmllbGQtLWZ1bGxcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInN0cmFwaS1sYWJlbFwiPlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICB7cmVxdWlyZWQgPyA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhX19jYW52YXNcIj5cbiAgICAgICAgICAgIHtzaG93UHJldmlldyA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWFfX3N0YWNrXCI+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWFfX3RodW1iXCIgc3JjPXtpbnB1dFZhbHVlfSBhbHQ9e2xhYmVsfSAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYV9fYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4oaW5wdXRWYWx1ZSwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIOKGl1xuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYV9fYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IHdpbmRvdy5wcm9tcHQoYFVwZGF0ZSAke2xhYmVsfSBVUkxgLCBpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4pyOXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhX19hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZShwYXRoLCAnJyl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIOKclVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWFfX2ZpbGVuYW1lXCI+e2dldEZpbGVuYW1lKGlucHV0VmFsdWUpfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhX19lbXB0eVwiPlBhc3RlIGFuIGltYWdlIFVSTCBiZWxvdyB0byBhdHRhY2ggbWVkaWEuPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhX19zb3VyY2VcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktaW5wdXRcIlxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtpbnB1dFZhbHVlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly8uLi5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17ZmllbGRDbGFzc05hbWUoZmllbGRLZXksIHZhbHVlKX0+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic3RyYXBpLWxhYmVsXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgICAge3JlcXVpcmVkID8gPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLWxhYmVsX19yZXF1aXJlZFwiPio8L3NwYW4+IDogbnVsbH1cbiAgICAgIDwvbGFiZWw+XG4gICAgICB7TVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSkgPyAoXG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT1cInN0cmFwaS10ZXh0YXJlYVwiXG4gICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktaW5wdXRcIlxuICAgICAgICAgIHR5cGU9e3R5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyAnbnVtYmVyJyA6ICd0ZXh0J31cbiAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgcGFyc2VJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSwgdmFsdWUpKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIE9iamVjdEZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHZhbHVlID8/IHt9KS5maWx0ZXIoKFtuZXN0ZWRLZXldKSA9PiBuZXN0ZWRLZXkgIT09ICdpZCcpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZmllbGQgc3RyYXBpLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1vYmplY3RcIj5cbiAgICAgICAgPGg0IGNsYXNzTmFtZT1cInN0cmFwaS1vYmplY3RfX3RpdGxlXCI+e3RvTGFiZWwoZmllbGRLZXkpfTwvaDQ+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWZpZWxkLWdyaWRcIj5cbiAgICAgICAgICB7ZW50cmllcy5tYXAoKFtuZXN0ZWRLZXksIG5lc3RlZFZhbHVlXSkgPT4gKFxuICAgICAgICAgICAgPEZpZWxkUmVuZGVyZXJcbiAgICAgICAgICAgICAga2V5PXtgJHtmaWVsZEtleX0tJHtuZXN0ZWRLZXl9YH1cbiAgICAgICAgICAgICAgZmllbGRLZXk9e25lc3RlZEtleX1cbiAgICAgICAgICAgICAgdmFsdWU9e25lc3RlZFZhbHVlfVxuICAgICAgICAgICAgICBwYXRoPXtbLi4ucGF0aCwgbmVzdGVkS2V5XX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICBvbkFkZEl0ZW09e29uQWRkSXRlbX1cbiAgICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEFycmF5RmllbGQoeyBmaWVsZEtleSwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBvbkFkZEl0ZW0sIG9uUmVtb3ZlSXRlbSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBsYWJlbCA9IHRvTGFiZWwoZmllbGRLZXkpO1xuICBjb25zdCBzYW1wbGUgPSB2YWx1ZVswXSA/PyAnJztcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWZpZWxkIHN0cmFwaS1maWVsZC0tZnVsbFwiPlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInN0cmFwaS1sYWJlbFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktcmVwZWF0YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1yZXBlYXRhYmxlX19oZWFkXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXJlcGVhdGFibGVfX3RpdGxlXCI+e2xhYmVsfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktcmVwZWF0YWJsZV9fY291bnRcIj57dmFsdWUubGVuZ3RofSBlbnRyeXt2YWx1ZS5sZW5ndGggPT09IDEgPyAnJyA6ICdpZXMnfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7dmFsdWUubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxkZXRhaWxzIGtleT17YCR7ZmllbGRLZXl9LSR7aW5kZXh9YH0gY2xhc3NOYW1lPVwic3RyYXBpLXJlcGVhdGFibGVfX2l0ZW1cIiBvcGVuPXtpbmRleCA9PT0gMH0+XG4gICAgICAgICAgICA8c3VtbWFyeSBjbGFzc05hbWU9XCJzdHJhcGktcmVwZWF0YWJsZV9fc3VtbWFyeVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktcmVwZWF0YWJsZV9fYnVsbGV0XCI+4pa8PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0cmFwaS1yZXBlYXRhYmxlX19uYW1lXCI+e2dldEl0ZW1UaXRsZShpdGVtLCBsYWJlbCwgaW5kZXgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXJlcGVhdGFibGVfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktcmVwZWF0YWJsZV9faWNvbi1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtKFsuLi5wYXRoLCBpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDwn5eRXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHNwYW4+4ouu4ouuPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc3VtbWFyeT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXJlcGVhdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgICAge2lzUGxhaW5PYmplY3QoaXRlbSkgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZmllbGQtZ3JpZFwiPlxuICAgICAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKFtuZXN0ZWRLZXldKSA9PiBuZXN0ZWRLZXkgIT09ICdpZCcpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKFtuZXN0ZWRLZXksIG5lc3RlZFZhbHVlXSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Ake2ZpZWxkS2V5fS0ke2luZGV4fS0ke25lc3RlZEtleX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRLZXk9e25lc3RlZEtleX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXN0ZWRWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg9e1suLi5wYXRoLCBpbmRleCwgbmVzdGVkS2V5XX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWRkSXRlbT17b25BZGRJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPFByaW1pdGl2ZUZpZWxkXG4gICAgICAgICAgICAgICAgICBmaWVsZEtleT17YCR7ZmllbGRLZXl9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtfVxuICAgICAgICAgICAgICAgICAgcGF0aD17Wy4uLnBhdGgsIGluZGV4XX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICApKX1cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwic3RyYXBpLXJlcGVhdGFibGVfX2FkZFwiXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQWRkSXRlbShwYXRoLCBnZXRFbXB0eUl0ZW0oc2FtcGxlKSl9XG4gICAgICAgID5cbiAgICAgICAgICArIEFkZCBhbiBlbnRyeVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBGaWVsZFJlbmRlcmVyKHByb3BzKSB7XG4gIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BzO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiA8QXJyYXlGaWVsZCB7Li4ucHJvcHN9IC8+O1xuICB9XG5cbiAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIDxPYmplY3RGaWVsZCB7Li4ucHJvcHN9IC8+O1xuICB9XG5cbiAgcmV0dXJuIDxQcmltaXRpdmVGaWVsZCB7Li4ucHJvcHN9IC8+O1xufVxuXG5mdW5jdGlvbiBGb3JtU2VjdGlvbih7IGVudHJpZXMsIG9uQ2hhbmdlLCBvbkFkZEl0ZW0sIG9uUmVtb3ZlSXRlbSwgZGlzYWJsZWQgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXNlY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWZpZWxkLWdyaWRcIj5cbiAgICAgICAge2VudHJpZXMubWFwKChbZmllbGRLZXksIHZhbHVlXSkgPT4gKFxuICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICBrZXk9e2ZpZWxkS2V5fVxuICAgICAgICAgICAgZmllbGRLZXk9e2ZpZWxkS2V5fVxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgcGF0aD17W2ZpZWxkS2V5XX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgIG9uQWRkSXRlbT17b25BZGRJdGVtfVxuICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29udGVudFBhZ2VFZGl0b3IoKSB7XG4gIGNvbnN0IHsgcGFnZU5hbWUgfSA9IHVzZVBhcmFtcygpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3NhdmluZywgc2V0U2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BhZ2VMYWJlbCwgc2V0UGFnZUxhYmVsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2NvbnRlbnQsIHNldENvbnRlbnRdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbb3JpZ2luYWxDb250ZW50LCBzZXRPcmlnaW5hbENvbnRlbnRdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbcHVibGlzaGVkQ29udGVudCwgc2V0UHVibGlzaGVkQ29udGVudF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCdkcmFmdCcpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW21lbnVPcGVuLCBzZXRNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuICBjb25zdCBtZW51UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IGRpc3BsYXllZENvbnRlbnQgPSB1c2VNZW1vKFxuICAgICgpID0+IChhY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnICYmIHB1Ymxpc2hlZENvbnRlbnQgPyBwdWJsaXNoZWRDb250ZW50IDogY29udGVudCksXG4gICAgW2FjdGl2ZVRhYiwgY29udGVudCwgcHVibGlzaGVkQ29udGVudF0sXG4gICk7XG4gIGNvbnN0IGlzUHVibGlzaGVkVmlldyA9IGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkQ29udGVudDtcbiAgY29uc3QgaXNEaXJ0eSA9IHVzZU1lbW8oXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUoY29udGVudCkpICE9PSBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShvcmlnaW5hbENvbnRlbnQpKSxcbiAgICBbY29udGVudCwgb3JpZ2luYWxDb250ZW50XSxcbiAgKTtcbiAgY29uc3QgaGFzRHJhZnRDb250ZW50ID0gdXNlTWVtbygoKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUoY29udGVudCksIFtjb250ZW50XSk7XG4gIGNvbnN0IGNhblNhdmUgPSAhaXNQdWJsaXNoZWRWaWV3ICYmICFzYXZpbmcgJiYgaXNEaXJ0eTtcbiAgY29uc3QgY2FuUHVibGlzaCA9ICFpc1B1Ymxpc2hlZFZpZXcgJiYgIXNhdmluZyAmJiAocHVibGlzaGVkQ29udGVudCA/IGlzRGlydHkgOiBoYXNEcmFmdENvbnRlbnQpO1xuICBjb25zdCBjYW5EaXNjYXJkID0gIXNhdmluZyAmJiAhaXNQdWJsaXNoZWRWaWV3ICYmIGhhc0RyYWZ0Q29udGVudDtcbiAgY29uc3QgY2FuVW5wdWJsaXNoID0gIXNhdmluZyAmJiBCb29sZWFuKHB1Ymxpc2hlZENvbnRlbnQpO1xuICBjb25zdCBzZWN0aW9ucyA9IHVzZU1lbW8oKCkgPT4gYnVpbGRTZWN0aW9ucyhwYWdlTmFtZSwgZGlzcGxheWVkQ29udGVudCksIFtwYWdlTmFtZSwgZGlzcGxheWVkQ29udGVudF0pO1xuICBjb25zdCBwcmV2aWV3VXJsID0gUFJFVklFV19QQVRIU1twYWdlTmFtZV0gPyBgaHR0cDovL2xvY2FsaG9zdDo4MDgwJHtQUkVWSUVXX1BBVEhTW3BhZ2VOYW1lXX1gIDogbnVsbDtcbiAgY29uc3QgZW50cnlUaXRsZSA9IHVzZU1lbW8oKCkgPT4gKFxuICAgIGRpc3BsYXllZENvbnRlbnQ/Lmhlcm9UaXRsZVxuICAgIHx8IGRpc3BsYXllZENvbnRlbnQ/LnRpdGxlXG4gICAgfHwgZGlzcGxheWVkQ29udGVudD8uc2l0ZU5hbWVcbiAgICB8fCBwYWdlTGFiZWxcbiAgKSwgW2Rpc3BsYXllZENvbnRlbnQsIHBhZ2VMYWJlbF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzTW91bnRlZCA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkUGFnZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvcignJyk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldFBhZ2UoeyBwYWdlTmFtZSB9KTtcblxuICAgICAgICBpZiAoIWlzTW91bnRlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHREcmFmdENvbnRlbnQgPSBjbG9uZVZhbHVlKHJlc3BvbnNlLmRhdGEuZHJhZnREYXRhID8/IHJlc3BvbnNlLmRhdGEuZGF0YSA/PyB7fSk7XG4gICAgICAgIHNldENvbnRlbnQobmV4dERyYWZ0Q29udGVudCk7XG4gICAgICAgIHNldE9yaWdpbmFsQ29udGVudChjbG9uZVZhbHVlKG5leHREcmFmdENvbnRlbnQpKTtcbiAgICAgICAgc2V0UHVibGlzaGVkQ29udGVudChyZXNwb25zZS5kYXRhLnB1Ymxpc2hlZERhdGEgPyBjbG9uZVZhbHVlKHJlc3BvbnNlLmRhdGEucHVibGlzaGVkRGF0YSkgOiBudWxsKTtcbiAgICAgICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgIHNldFBhZ2VMYWJlbChyZXNwb25zZS5kYXRhLmxhYmVsID8/IHRvTGFiZWwocGFnZU5hbWUpKTtcbiAgICAgIH0gY2F0Y2ggKGxvYWRFcnJvcikge1xuICAgICAgICBpZiAoIWlzTW91bnRlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yKGxvYWRFcnJvcj8ucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgPz8gJ0ZhaWxlZCB0byBsb2FkIHRoaXMgY29udGVudCBwYWdlLicpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGlzTW91bnRlZCkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWRQYWdlKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNNb3VudGVkID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW3BhZ2VOYW1lXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW1lbnVPcGVuKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAobWVudVJlZi5jdXJyZW50ICYmICFtZW51UmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIH07XG4gIH0sIFttZW51T3Blbl0pO1xuXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChwYXRoLCBuZXh0VmFsdWUpID0+IHtcbiAgICBzZXRDb250ZW50KChjdXJyZW50VmFsdWUpID0+IHVwZGF0ZUF0UGF0aChjdXJyZW50VmFsdWUsIHBhdGgsIG5leHRWYWx1ZSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZEl0ZW0gPSAocGF0aCwgbmV4dEl0ZW0pID0+IHtcbiAgICBzZXRDb250ZW50KChjdXJyZW50VmFsdWUpID0+IGFwcGVuZEF0UGF0aChjdXJyZW50VmFsdWUsIHBhdGgsIG5leHRJdGVtKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlSXRlbSA9IChwYXRoKSA9PiB7XG4gICAgc2V0Q29udGVudCgoY3VycmVudFZhbHVlKSA9PiByZW1vdmVBdFBhdGgoY3VycmVudFZhbHVlLCBwYXRoKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZSA9IGFzeW5jIChpbnRlbnQgPSAnc2F2ZScpID0+IHtcbiAgICBzZXRTYXZpbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3IoJycpO1xuICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXRQYWdlKHtcbiAgICAgICAgcGFnZU5hbWUsXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICBkYXRhOiB7IGNvbnRlbnQsIGludGVudCB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG5leHREcmFmdENvbnRlbnQgPSBjbG9uZVZhbHVlKHJlc3BvbnNlLmRhdGEuZHJhZnREYXRhID8/IHJlc3BvbnNlLmRhdGEuZGF0YSA/PyB7fSk7XG4gICAgICBzZXRDb250ZW50KG5leHREcmFmdENvbnRlbnQpO1xuICAgICAgc2V0T3JpZ2luYWxDb250ZW50KGNsb25lVmFsdWUobmV4dERyYWZ0Q29udGVudCkpO1xuICAgICAgc2V0UHVibGlzaGVkQ29udGVudChyZXNwb25zZS5kYXRhLnB1Ymxpc2hlZERhdGEgPyBjbG9uZVZhbHVlKHJlc3BvbnNlLmRhdGEucHVibGlzaGVkRGF0YSkgOiBudWxsKTtcbiAgICAgIGlmIChpbnRlbnQgPT09ICd1bnB1Ymxpc2gnKSB7XG4gICAgICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgICAgIH1cbiAgICAgIGFkZE5vdGljZSh7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGEubm90aWNlPy5tZXNzYWdlID8/IGAke3BhZ2VMYWJlbH0gc2F2ZWQuYCxcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoc2F2ZUVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gc2F2ZUVycm9yPy5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSA/PyAnRmFpbGVkIHRvIHNhdmUgdGhpcyBjb250ZW50IHBhZ2UuJztcbiAgICAgIHNldEVycm9yKG1lc3NhZ2UpO1xuICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0U2F2aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGlzY2FyZENoYW5nZXMgPSAoKSA9PiB7XG4gICAgc2V0Q29udGVudChnZXRFbXB0eUl0ZW0oY29udGVudCkpO1xuICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGhlaWdodDogJzEwMCUnIH19PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWVkaXRvclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1lZGl0b3JfX2lubmVyXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdHJhcGktYmFja1wiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB3aW5kb3cuaGlzdG9yeS5iYWNrKCl9PlxuICAgICAgICAgICAg4oaQIEJhY2tcbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWV0YVwiPlNpbmdsZSBUeXBlPC9kaXY+XG4gICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJzdHJhcGktdGl0bGVcIj57ZW50cnlUaXRsZX08L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc3RhdHVzXCI+e3B1Ymxpc2hlZENvbnRlbnQgPyAnUHVibGlzaGVkJyA6ICdEcmFmdCd9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RyYXBpLWtlYmFiXCIgdHlwZT1cImJ1dHRvblwiPuKApjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktdGFic1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BzdHJhcGktdGFiJHthY3RpdmVUYWIgPT09ICdkcmFmdCcgPyAnIHN0cmFwaS10YWItLWFjdGl2ZScgOiAnJ31gfSB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdkcmFmdCcpfT5cbiAgICAgICAgICAgICAgRFJBRlRcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BzdHJhcGktdGFiJHthY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnID8gJyBzdHJhcGktdGFiLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHB1Ymxpc2hlZENvbnRlbnQgJiYgc2V0QWN0aXZlVGFiKCdwdWJsaXNoZWQnKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUFVCTElTSEVEXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1sYXlvdXRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1haW4tY2FyZFwiPlxuICAgICAgICAgICAgICB7c2VjdGlvbnMubWFwKChzZWN0aW9uLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDxGb3JtU2VjdGlvblxuICAgICAgICAgICAgICAgICAga2V5PXtgc2VjdGlvbi0ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICBlbnRyaWVzPXtzZWN0aW9uLmVudHJpZXN9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgb25BZGRJdGVtPXtoYW5kbGVBZGRJdGVtfVxuICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtoYW5kbGVSZW1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzUHVibGlzaGVkVmlld31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YXNpZGU+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXNpZGUtY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXNpZGUtY2FyZF9faGVhZFwiPkVudHJ5PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1jYXJkX19ib2R5XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1zaWRlLWJ1dHRvbi1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1idXR0b24tLXNlY29uZGFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTYXZlKCdwdWJsaXNoJyl9IGRpc2FibGVkPXshY2FuUHVibGlzaH0+XG4gICAgICAgICAgICAgICAgICAgICAgUHVibGlzaFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0cmFwaS1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHN0cmFwaS1zaWRlLWJ1dHRvbi0tbWVudVwiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TWVudU9wZW4oKGN1cnJlbnQpID0+ICFjdXJyZW50KX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIOKAplxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge21lbnVPcGVuID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXttZW51UmVmfSBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1hY3Rpb24tbWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1hY3Rpb24tbWVudV9faXRlbSBzdHJhcGktc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNhdmUoJ3VucHVibGlzaCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhblVucHVibGlzaH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2ljb25cIj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgVW5wdWJsaXNoXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gc3RyYXBpLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEaXNjYXJkQ2hhbmdlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5EaXNjYXJkfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1hY3Rpb24tbWVudV9faWNvblwiPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBEaXNjYXJkIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gaGFuZGxlU2F2ZSgnc2F2ZScpfSBkaXNhYmxlZD17IWNhblNhdmV9PlxuICAgICAgICAgICAgICAgICAgICB7c2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1jYXJkX19oZWFkXCI+UHJldmlldzwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXNpZGUtY2FyZF9fYm9keVwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHJhcGktc2lkZS1idXR0b24tLXNlY29uZGFyeSBzdHJhcGktc2lkZS1idXR0b24tLXByZXZpZXdcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcHJldmlld1VybCAmJiB3aW5kb3cub3BlbihwcmV2aWV3VXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFwcmV2aWV3VXJsfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBPcGVuIHByZXZpZXdcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYXNpZGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBMb2FkZXIsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgU1RZTEVTID0gYFxuLnN0cmFwaS1tZWRpYS1wYWdlIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMjhweCA0MHB4IDQ4cHggODhweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5zdHJhcGktbWVkaWEtcGFnZV9faW5uZXIge1xuICBtYXgtd2lkdGg6IDE4NjBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5zdHJhcGktbWVkaWEtcGFnZV9fdG9wIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyOHB4O1xufVxuXG4uc3RyYXBpLW1lZGlhLXBhZ2VfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDNyZW07XG4gIGxpbmUtaGVpZ2h0OiAzLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uc3RyYXBpLW1lZGlhLXBhZ2VfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG59XG5cbi5zdHJhcGktbWVkaWEtcGFnZV9fYnV0dG9uLFxuLnN0cmFwaS1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnksXG4uc3RyYXBpLW1lZGlhLXBhZ2VfX2ljb24tYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc3RyYXBpLW1lZGlhLXBhZ2VfX2J1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwIDFyZW07XG59XG5cbi5zdHJhcGktbWVkaWEtcGFnZV9fYnV0dG9uLS1wcmltYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIHBhZGRpbmc6IDAgMS4yNXJlbTtcbn1cblxuLnN0cmFwaS1tZWRpYS1wYWdlX190b29sYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDI4cHg7XG59XG5cbi5zdHJhcGktbWVkaWEtcGFnZV9fdG9vbGJhci1sZWZ0LFxuLnN0cmFwaS1tZWRpYS1wYWdlX190b29sYmFyLXJpZ2h0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uc3RyYXBpLW1lZGlhLXBhZ2VfX3NxdWFyZSxcbi5zdHJhcGktbWVkaWEtcGFnZV9faWNvbi1idXR0b24ge1xuICB3aWR0aDogMi41cmVtO1xuICBoZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLnN0cmFwaS1tZWRpYS1wYWdlX19zZWxlY3QsXG4uc3RyYXBpLW1lZGlhLXBhZ2VfX3NlYXJjaCB7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgcGFkZGluZzogMCAxcmVtO1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbi5zdHJhcGktbWVkaWEtcGFnZV9fc2VhcmNoIHtcbiAgbWluLXdpZHRoOiAyODBweDtcbn1cblxuLnN0cmFwaS1tZWRpYS1wYWdlX19zZWxlY3Qge1xuICBtaW4td2lkdGg6IDI2OHB4O1xuICBhcHBlYXJhbmNlOiBub25lO1xufVxuXG4uc3RyYXBpLW1lZGlhLXBhZ2VfX3NlY3Rpb24tdGl0bGUge1xuICBtYXJnaW46IDAgMCAxOHB4O1xuICBmb250LXNpemU6IDJyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5zdHJhcGktbWVkaWEtcGFnZV9fY291bnQge1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLnN0cmFwaS1tZWRpYS1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maWxsLCBtaW5tYXgoMzIwcHgsIDFmcikpO1xuICBnYXA6IDI0cHg7XG59XG5cbi5zdHJhcGktYXNzZXQtY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4wNik7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnN0cmFwaS1hc3NldC1jYXJkOmhvdmVyIHtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDgpO1xufVxuXG4uc3RyYXBpLWFzc2V0LWNhcmRfX3ByZXZpZXcge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1pbi1oZWlnaHQ6IDI1NnB4O1xuICBwYWRkaW5nOiAxNnB4O1xuICBiYWNrZ3JvdW5kOlxuICAgIGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2Y2ZjZmOSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZjZmNmY5IDc1JSwgI2Y2ZjZmOSksXG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLCAxMnB4IDEycHg7XG4gIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4O1xufVxuXG4uc3RyYXBpLWFzc2V0LWNhcmRfX2NoZWNrYm94IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDE2cHg7XG4gIGxlZnQ6IDE2cHg7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjMGMwY2Y7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkyKTtcbn1cblxuLnN0cmFwaS1hc3NldC1jYXJkX19pbWFnZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDIyNHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5zdHJhcGktYXNzZXQtY2FyZF9fYm9keSB7XG4gIHBhZGRpbmc6IDE0cHggMThweCAxNnB4O1xufVxuXG4uc3RyYXBpLWFzc2V0LWNhcmRfX3RpdGxlLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4uc3RyYXBpLWFzc2V0LWNhcmRfX3RpdGxlIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTtcbn1cblxuLnN0cmFwaS1hc3NldC1jYXJkX190eXBlIHtcbiAgZmxleDogMCAwIGF1dG87XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLnN0cmFwaS1hc3NldC1jYXJkX19tZXRhIHtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xufVxuXG4uc3RyYXBpLW1lZGlhLWRldGFpbF9fYmFjayB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xufVxuXG4uc3RyYXBpLW1lZGlhLWRldGFpbF9fbGF5b3V0IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwgMWZyKSAzNjBweDtcbiAgZ2FwOiAyNHB4O1xufVxuXG4uc3RyYXBpLW1lZGlhLWRldGFpbF9fcHJldmlldyxcbi5zdHJhcGktbWVkaWEtZGV0YWlsX19jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbn1cblxuLnN0cmFwaS1tZWRpYS1kZXRhaWxfX3ByZXZpZXcge1xuICBwYWRkaW5nOiAyNHB4O1xufVxuXG4uc3RyYXBpLW1lZGlhLWRldGFpbF9fY2FudmFzIHtcbiAgbWluLWhlaWdodDogNjIwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDpcbiAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmNmY2ZjkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2Y2ZjZmOSA3NSUsICNmNmY2ZjkpLFxuICAgIGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2Y2ZjZmOSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZjZmNmY5IDc1JSwgI2Y2ZjZmOSk7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgMCwgMTJweCAxMnB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDtcbn1cblxuLnN0cmFwaS1tZWRpYS1kZXRhaWxfX2ltYWdlIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiA1ODBweDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cblxuLnN0cmFwaS1tZWRpYS1kZXRhaWxfX3NpZGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDE2cHg7XG59XG5cbi5zdHJhcGktbWVkaWEtZGV0YWlsX19jYXJkLWhlYWQge1xuICBwYWRkaW5nOiAxNHB4IDE2cHggOHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLnN0cmFwaS1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keSB7XG4gIHBhZGRpbmc6IDAgMTZweCAxNnB4O1xufVxuXG4uc3RyYXBpLW1lZGlhLWRldGFpbF9fZmllbGQgKyAuc3RyYXBpLW1lZGlhLWRldGFpbF9fZmllbGQge1xuICBtYXJnaW4tdG9wOiAxNnB4O1xufVxuXG4uc3RyYXBpLW1lZGlhLWRldGFpbF9fbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLnN0cmFwaS1tZWRpYS1kZXRhaWxfX2lucHV0LFxuLnN0cmFwaS1tZWRpYS1kZXRhaWxfX3RleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgcGFkZGluZzogMC42MjVyZW0gMC44NzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xufVxuXG4uc3RyYXBpLW1lZGlhLWRldGFpbF9fdGV4dGFyZWEge1xuICBtaW4taGVpZ2h0OiA2cmVtO1xuICByZXNpemU6IG5vbmU7XG59XG5cbi5zdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLWxpc3Qge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDEycHg7XG59XG5cbi5zdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5zdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLWtleSB7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uc3RyYXBpLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZSB7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxMDgwcHgpIHtcbiAgLnN0cmFwaS1tZWRpYS1kZXRhaWxfX2xheW91dCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5zdHJhcGktbWVkaWEtcGFnZSB7XG4gICAgcGFkZGluZzogMjBweCAxNnB4IDQwcHggNzJweDtcbiAgfVxuXG4gIC5zdHJhcGktbWVkaWEtcGFnZV9fdG9wLFxuICAuc3RyYXBpLW1lZGlhLXBhZ2VfX3Rvb2xiYXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIH1cblxuICAuc3RyYXBpLW1lZGlhLXBhZ2VfX3Rvb2xiYXItbGVmdCxcbiAgLnN0cmFwaS1tZWRpYS1wYWdlX190b29sYmFyLXJpZ2h0LFxuICAuc3RyYXBpLW1lZGlhLXBhZ2VfX2FjdGlvbnMge1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgfVxuXG4gIC5zdHJhcGktbWVkaWEtcGFnZV9fc2VhcmNoLFxuICAuc3RyYXBpLW1lZGlhLXBhZ2VfX3NlbGVjdCB7XG4gICAgbWluLXdpZHRoOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5gO1xuXG5mdW5jdGlvbiBidWlsZFBhZ2VQYXRoKHBhdGhuYW1lLCBwYXJhbXMpIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIE9iamVjdC5lbnRyaWVzKHBhcmFtcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICBzZWFyY2hQYXJhbXMuc2V0KGtleSwgU3RyaW5nKHZhbHVlKSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBxdWVyeVN0cmluZyA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxdWVyeVN0cmluZyA/IGA/JHtxdWVyeVN0cmluZ31gIDogJyd9YDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdE1lZGlhKHF1ZXJ5ID0ge30pIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hZG1pbi9hcGkvcGFnZXMvbWVkaWEtbGlicmFyeSR7c2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkgPyBgPyR7c2VhcmNoUGFyYW1zLnRvU3RyaW5nKCl9YCA6ICcnfWAsIHtcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSk7XG4gIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLm1lc3NhZ2UgPz8gJ0ZhaWxlZCB0byBsb2FkIG1lZGlhLicpO1xuICB9XG5cbiAgcmV0dXJuIHBheWxvYWQ7XG59XG5cbmZ1bmN0aW9uIEFzc2V0Q2FyZCh7IGl0ZW0sIG9uT3BlbiB9KSB7XG4gIHJldHVybiAoXG4gICAgPGFydGljbGUgY2xhc3NOYW1lPVwic3RyYXBpLWFzc2V0LWNhcmRcIiBvbkNsaWNrPXsoKSA9PiBvbk9wZW4oaXRlbS5pZCl9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktYXNzZXQtY2FyZF9fcHJldmlld1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1hc3NldC1jYXJkX19jaGVja2JveFwiIC8+XG4gICAgICAgIDxpbWcgY2xhc3NOYW1lPVwic3RyYXBpLWFzc2V0LWNhcmRfX2ltYWdlXCIgc3JjPXtpdGVtLnRodW1ibmFpbFVybCB8fCBpdGVtLnVybH0gYWx0PXtpdGVtLmFsdGVybmF0aXZlVGV4dCB8fCBpdGVtLm5hbWV9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWFzc2V0LWNhcmRfX2JvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktYXNzZXQtY2FyZF9fdGl0bGUtcm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktYXNzZXQtY2FyZF9fdGl0bGVcIj57aXRlbS5uYW1lfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWFzc2V0LWNhcmRfX3R5cGVcIj57aXRlbS5taW1lLnN0YXJ0c1dpdGgoJ2ltYWdlLycpID8gJ0lNQUdFJyA6IGl0ZW0uZXh0LnJlcGxhY2UoJy4nLCAnJykudG9VcHBlckNhc2UoKX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWFzc2V0LWNhcmRfX21ldGFcIj5cbiAgICAgICAgICB7aXRlbS5leHQucmVwbGFjZSgnLicsICcnKS50b1VwcGVyQ2FzZSgpfSAtIHtpdGVtLndpZHRofcOXe2l0ZW0uaGVpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRGV0YWlsVmlldyh7IGl0ZW0sIG9uQmFjayB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fYmFja1wiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkJhY2t9PlxuICAgICAgICDihpAgQmFja1xuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLXBhZ2VfX3RvcFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMjQgfX0+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtcGFnZV9fdGl0bGVcIiBzdHlsZT17eyBmb250U2l6ZTogJzIuMjVyZW0nLCBsaW5lSGVpZ2h0OiAnMi43NXJlbScgfX0+e2l0ZW0ubmFtZX08L2gxPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1wYWdlX19hY3Rpb25zXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtcGFnZV9fYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRvci5jbGlwYm9hcmQ/LndyaXRlVGV4dChpdGVtLnVybCB8fCAnJyl9PlxuICAgICAgICAgICAgQ29weSBVUkxcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4oaXRlbS51cmwsICdfYmxhbmsnLCAnbm9vcGVuZXIsbm9yZWZlcnJlcicpfT5cbiAgICAgICAgICAgIE9wZW4gYXNzZXRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19sYXlvdXRcIj5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fcHJldmlld1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fY2FudmFzXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX2ltYWdlXCIgc3JjPXtpdGVtLnVybH0gYWx0PXtpdGVtLmFsdGVybmF0aXZlVGV4dCB8fCBpdGVtLm5hbWV9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fc2lkZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fY2FyZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19jYXJkLWhlYWRcIj5EZXRhaWxzPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX2ZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX2xhYmVsXCI+RmlsZSBuYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9faW5wdXRcIiB2YWx1ZT17aXRlbS5uYW1lIHx8ICcnfSBkaXNhYmxlZCByZWFkT25seSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19sYWJlbFwiPkFsdGVybmF0aXZlIHRleHQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19pbnB1dFwiIHZhbHVlPXtpdGVtLmFsdGVybmF0aXZlVGV4dCB8fCAnJ30gZGlzYWJsZWQgcmVhZE9ubHkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fbGFiZWxcIj5DYXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fdGV4dGFyZWFcIiB2YWx1ZT17aXRlbS5jYXB0aW9uIHx8ICcnfSBkaXNhYmxlZCByZWFkT25seSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19jYXJkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX2NhcmQtaGVhZFwiPk1ldGFkYXRhPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX2NhcmQtYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX21ldGEtbGlzdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPkRpbWVuc2lvbnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0ud2lkdGh9IMOXIHtpdGVtLmhlaWdodH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+U2l6ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5zaXplTGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPlR5cGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0ubWltZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+UHJvdmlkZXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0ucHJvdmlkZXIgfHwgJ2xvY2FsJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+Rm9sZGVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLmZvbGRlclBhdGggfHwgJy8nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5VcGRhdGVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLnVwZGF0ZWRBdExhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5DcmVhdGVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLmNyZWF0ZWRBdExhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5Eb2N1bWVudCBJRDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5kb2N1bWVudElkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hc2lkZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNZWRpYUxpYnJhcnkoKSB7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBxdWVyeSA9IHVzZU1lbW8oKCkgPT4gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpLCBbbG9jYXRpb24uc2VhcmNoXSk7XG4gIGNvbnN0IHNlYXJjaCA9IHF1ZXJ5LmdldCgnc2VhcmNoJykgfHwgJyc7XG4gIGNvbnN0IGZpbGVJZCA9IHF1ZXJ5LmdldCgnZmlsZUlkJykgfHwgJyc7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtjb3VudCwgc2V0Q291bnRdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtpdGVtLCBzZXRJdGVtXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGFjdGl2ZSA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yKCcnKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RNZWRpYShmaWxlSWQgPyB7IGZpbGVJZCB9IDogeyBzZWFyY2ggfSk7XG5cbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRJdGVtcyhwYXlsb2FkLml0ZW1zID8/IFtdKTtcbiAgICAgICAgc2V0Q291bnQocGF5bG9hZC5jb3VudCA/PyAwKTtcbiAgICAgICAgc2V0SXRlbShwYXlsb2FkLml0ZW0gPz8gbnVsbCk7XG4gICAgICB9IGNhdGNoIChsb2FkRXJyb3IpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvcihsb2FkRXJyb3IubWVzc2FnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFtmaWxlSWQsIHNlYXJjaF0pO1xuXG4gIGNvbnN0IG9wZW5MaXN0ID0gKG5leHRTZWFyY2ggPSBzZWFyY2gpID0+IHtcbiAgICBuYXZpZ2F0ZShidWlsZFBhZ2VQYXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScsIG5leHRTZWFyY2ggPyB7IHNlYXJjaDogbmV4dFNlYXJjaCB9IDoge30pKTtcbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtcGFnZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1wYWdlX19pbm5lclwiPlxuICAgICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgICB7ZmlsZUlkICYmIGl0ZW0gPyAoXG4gICAgICAgICAgICA8RGV0YWlsVmlldyBpdGVtPXtpdGVtfSBvbkJhY2s9eygpID0+IG9wZW5MaXN0KCl9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLXBhZ2VfX3RvcFwiPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtcGFnZV9fdGl0bGVcIj5NZWRpYSBMaWJyYXJ5PC9oMT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1wYWdlX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1wYWdlX19idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+KyBBZGQgbmV3IGZvbGRlcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtcGFnZV9fYnV0dG9uLS1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiPisgQWRkIG5ldyBhc3NldHM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtcGFnZV9fdG9vbGJhclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLXBhZ2VfX3Rvb2xiYXItbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtcGFnZV9fc3F1YXJlXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLXBhZ2VfX3NlbGVjdFwiIGRlZmF1bHRWYWx1ZT1cInJlY2VudFwiPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmVjZW50XCI+TW9zdCByZWNlbnQgdXBsb2Fkczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0cmFwaS1tZWRpYS1wYWdlX19idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+RmlsdGVyczwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLXBhZ2VfX3Rvb2xiYXItcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLXBhZ2VfX2ljb24tYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPuKamTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdHJhcGktbWVkaWEtcGFnZV9faWNvbi1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+4piwPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLXBhZ2VfX3NlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9wZW5MaXN0KGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGFzc2V0c1wiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLXBhZ2VfX3NlY3Rpb24tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICBBc3NldHMgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLXBhZ2VfX2NvdW50XCI+KHtjb3VudH0pPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gyPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLW1lZGlhLWdyaWRcIj5cbiAgICAgICAgICAgICAgICB7aXRlbXMubWFwKChtZWRpYUl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxBc3NldENhcmQga2V5PXttZWRpYUl0ZW0uaWR9IGl0ZW09e21lZGlhSXRlbX0gb25PcGVuPXsobmV4dElkKSA9PiBuYXZpZ2F0ZShidWlsZFBhZ2VQYXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScsIHsgZmlsZUlkOiBuZXh0SWQgfSkpfSAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiwgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmNvbnN0IENPTlRFTlRfUEFHRV9PUkRFUiA9IFtcbiAgJ3NpdGUtc2V0dGluZ3MnLFxuICAnaG9tZXBhZ2UnLFxuICAnYWJvdXQtcGFnZScsXG4gICdibG9nLXBhZ2UnLFxuICAncHJpY2luZy1wYWdlJyxcbiAgJ2ZhcS1wYWdlJyxcbiAgJ21lZXRpbmctcm9vbXMtcGFnZScsXG4gICd2aXJ0dWFsLW9mZmljZS1wYWdlJyxcbiAgJ2NvbnRhY3QtcGFnZScsXG4gICdwcml2YWN5LXBvbGljeS1wYWdlJyxcbiAgJ3Rlcm1zLXBhZ2UnLFxuXTtcblxuY29uc3QgQ09OVEVOVF9QQUdFX0xBQkVMUyA9IHtcbiAgJ3NpdGUtc2V0dGluZ3MnOiAnU2l0ZSBTZXR0aW5nJyxcbiAgJ2hvbWVwYWdlJzogJ0hvbWVwYWdlJyxcbiAgJ2Fib3V0LXBhZ2UnOiAnQWJvdXQgUGFnZScsXG4gICdibG9nLXBhZ2UnOiAnQmxvZyBQYWdlJyxcbiAgJ3ByaWNpbmctcGFnZSc6ICdQcmljaW5nIFBhZ2UnLFxuICAnZmFxLXBhZ2UnOiAnRkFRIFBhZ2UnLFxuICAnbWVldGluZy1yb29tcy1wYWdlJzogJ01lZXRpbmcgUm9vbXMgUGFnZScsXG4gICd2aXJ0dWFsLW9mZmljZS1wYWdlJzogJ1ZpcnR1YWwgT2ZmaWNlIFBhZ2UnLFxuICAnY29udGFjdC1wYWdlJzogJ0NvbnRhY3QgUGFnZScsXG4gICdwcml2YWN5LXBvbGljeS1wYWdlJzogJ1ByaXZhY3kgUG9saWN5IFBhZ2UnLFxuICAndGVybXMtcGFnZSc6ICdUZXJtcyBQYWdlJyxcbn07XG5cbmNvbnN0IFJFU09VUkNFX0xBQkVMUyA9IHtcbiAgJ2Jsb2ctcG9zdHMnOiAnQmxvZyBQb3N0JyxcbiAgJ2ZhcS1pdGVtcyc6ICdGQVEgSXRlbScsXG4gICdtZWV0aW5nLXJvb21zJzogJ01lZXRpbmcgUm9vbScsXG4gICdwcmljaW5nLXBsYW5zJzogJ1ByaWNpbmcgUGxhbicsXG59O1xuXG5jb25zdCBTSURFQkFSX1dJRFRIID0gMzA0O1xuY29uc3QgUkFJTF9XSURUSCA9IDQ4O1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uc3RyYXBpLXNpZGViYXItc2hlbGwge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGluc2V0OiAwIGF1dG8gMCAwO1xuICB3aWR0aDogJHtTSURFQkFSX1dJRFRIfXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWFlYmYwO1xuICB6LWluZGV4OiA1MDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlO1xufVxuXG4uc3RyYXBpLXNpZGViYXItc2hlbGwtLXJhaWwtb25seSB7XG4gIHdpZHRoOiAke1JBSUxfV0lEVEh9cHg7XG59XG5cbi5zdHJhcGktc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke1NJREVCQVJfV0lEVEh9cHgpO1xufVxuXG4uc3RyYXBpLXNpZGViYXItcmFpbCB7XG4gIHdpZHRoOiA0OHB4O1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWFlYmYwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxMnB4IDA7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLnN0cmFwaS1zaWRlYmFyLWxvZ28ge1xuICB3aWR0aDogMjhweDtcbiAgaGVpZ2h0OiAyOHB4O1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICBtYXJnaW4tYm90dG9tOiAycHg7XG59XG5cbi5zdHJhcGktcmFpbC1idXR0b24ge1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5zdHJhcGktcmFpbC1idXR0b24tLWFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICNmMGViZmY7XG4gIGNvbG9yOiAjN2I3OWZmO1xufVxuXG4uc3RyYXBpLXJhaWwtYnV0dG9uIHN2ZyB7XG4gIHdpZHRoOiAxNnB4O1xuICBoZWlnaHQ6IDE2cHg7XG4gIHN0cm9rZTogY3VycmVudENvbG9yO1xuICBmaWxsOiBub25lO1xuICBzdHJva2Utd2lkdGg6IDEuODtcbiAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kO1xuICBzdHJva2UtbGluZWpvaW46IHJvdW5kO1xufVxuXG4uc3RyYXBpLXJhaWwtc3BhY2VyIHtcbiAgZmxleDogMTtcbn1cblxuLnN0cmFwaS1hdmF0YXIge1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiAzMHB4O1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLnN0cmFwaS1zaWRlYmFyLXBhbmVsIHtcbiAgd2lkdGg6IDI1NnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG59XG5cbi5zdHJhcGktc2lkZWJhci1oZWFkZXIge1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWFlYmYwO1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uc3RyYXBpLXNpZGViYXItYm9keSB7XG4gIHBhZGRpbmc6IDE0cHggOHB4IDE4cHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5zdHJhcGktc2VhcmNoIHtcbiAgcGFkZGluZzogMCA4cHggMTJweDtcbn1cblxuLnN0cmFwaS1zZWFyY2ggaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgcGFkZGluZzogMC41cmVtIDAuNzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbn1cblxuLnN0cmFwaS1zZWFyY2ggaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG59XG5cbi5zdHJhcGktZ3JvdXAge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4uc3RyYXBpLWdyb3VwX19oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAwIDEwcHggOHB4O1xufVxuXG4uc3RyYXBpLWdyb3VwX19sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC42ODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG5cbi5zdHJhcGktZ3JvdXBfX2NvdW50IHtcbiAgbWluLXdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIHBhZGRpbmc6IDAgNnB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMC42ODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLnN0cmFwaS1uYXYtbGluayB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDdweCAxMHB4O1xuICBtYXJnaW46IDFweCAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uc3RyYXBpLW5hdi1saW5rOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLnN0cmFwaS1uYXYtbGluay0tc2VsZWN0ZWQge1xuICBiYWNrZ3JvdW5kOiAjZjBlYmZmO1xuICBjb2xvcjogIzQ5NDVmZjtcbn1cblxuLnN0cmFwaS1uYXYtbGlua19fdGV4dCB7XG4gIG1pbi13aWR0aDogMDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMzc1cmVtO1xuICBmb250LXdlaWdodDogNTAwO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLnN0cmFwaS1uYXYtbGlua19faWNvbiB7XG4gIHdpZHRoOiAxMnB4O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLnN0cmFwaS1zaWRlYmFyLXNoZWxsIHtcbiAgICBib3gtc2hhZG93OiAwIDE4cHggNDhweCByZ2JhKDMzLCAzMywgNTIsIDAuMTIpO1xuICB9XG5cbiAgLnN0cmFwaS1zaWRlYmFyLXNoZWxsLS1oaWRkZW4ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtTSURFQkFSX1dJRFRIfXB4KTtcbiAgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogOTYxcHgpIHtcbiAgLnN0cmFwaS1zaWRlYmFyLXNoZWxsLFxuICAuc3RyYXBpLXNpZGViYXItc2hlbGwtLWhpZGRlbiB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICB9XG59XG5gO1xuXG5mdW5jdGlvbiBpdGVtTWF0Y2hlc1NlYXJjaChsYWJlbCwgc2VhcmNoKSB7XG4gIGlmICghc2VhcmNoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gbGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gudG9Mb3dlckNhc2UoKSk7XG59XG5cbmZ1bmN0aW9uIFJhaWxJY29uKHsgY2hpbGRyZW4gfSkge1xuICByZXR1cm4gKFxuICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvc3ZnPlxuICApO1xufVxuXG5mdW5jdGlvbiBIb21lSWNvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8UmFpbEljb24+XG4gICAgICA8cGF0aCBkPVwiTTQuNSAxMC41IDEyIDRsNy41IDYuNVwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTYuNSA5LjVWMTloMTFWOS41XCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNMTAgMTl2LTVoNHY1XCIgLz5cbiAgICA8L1JhaWxJY29uPlxuICApO1xufVxuXG5mdW5jdGlvbiBQZW5jaWxJY29uKCkge1xuICByZXR1cm4gKFxuICAgIDxSYWlsSWNvbj5cbiAgICAgIDxwYXRoIGQ9XCJtMy41IDIwLjUgNC4yNS0xIDkuNzUtOS43NS0zLjI1LTMuMjVMNC41IDE2LjI1bC0xIDQuMjVaXCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJtMTMuNSA2LjUgMy4yNSAzLjI1XCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNNy41IDE5LjVoMTNcIiAvPlxuICAgIDwvUmFpbEljb24+XG4gICk7XG59XG5cbmZ1bmN0aW9uIE1lZGlhSWNvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8UmFpbEljb24+XG4gICAgICA8cmVjdCB4PVwiMy41XCIgeT1cIjUuNVwiIHdpZHRoPVwiMTdcIiBoZWlnaHQ9XCIxM1wiIHJ4PVwiMlwiIC8+XG4gICAgICA8Y2lyY2xlIGN4PVwiOC41XCIgY3k9XCIxMFwiIHI9XCIxLjVcIiAvPlxuICAgICAgPHBhdGggZD1cIm01LjUgMTYgNC00IDMgMyAyLTIgNCAzXCIgLz5cbiAgICA8L1JhaWxJY29uPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaWRlYmFyKHsgaXNWaXNpYmxlIH0pIHtcbiAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IHBhZ2VzID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5wYWdlcyk7XG4gIGNvbnN0IHNlc3Npb24gPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLnNlc3Npb24pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoJycpO1xuXG4gIGNvbnN0IHBhZ2VJdGVtcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gQ09OVEVOVF9QQUdFX09SREVSXG4gICAgICAubWFwKChwYWdlTmFtZSkgPT4gcGFnZXMuZmluZCgocGFnZSkgPT4gcGFnZS5uYW1lID09PSBwYWdlTmFtZSkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAubWFwKChwYWdlKSA9PiAoe1xuICAgICAgICBpZDogcGFnZS5uYW1lLFxuICAgICAgICBsYWJlbDogQ09OVEVOVF9QQUdFX0xBQkVMU1twYWdlLm5hbWVdID8/IHBhZ2UubmFtZSxcbiAgICAgICAgaHJlZjogYC9hZG1pbi9wYWdlcy8ke3BhZ2UubmFtZX1gLFxuICAgICAgICBzZWxlY3RlZDogbG9jYXRpb24ucGF0aG5hbWUuc3RhcnRzV2l0aChgL2FkbWluL3BhZ2VzLyR7cGFnZS5uYW1lfWApLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChwYWdlKSA9PiBpdGVtTWF0Y2hlc1NlYXJjaChwYWdlLmxhYmVsLCBzZWFyY2gpKSxcbiAgICBbbG9jYXRpb24ucGF0aG5hbWUsIHBhZ2VzLCBzZWFyY2hdLFxuICApO1xuXG4gIGNvbnN0IGNvbGxlY3Rpb25JdGVtcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKFtcbiAgICAgIHsgaWQ6ICdibG9nLXBvc3RzJywgaHJlZjogJy9hZG1pbi9wYWdlcy9ibG9nLXBvc3RzJyB9LFxuICAgICAgeyBpZDogJ2ZhcS1pdGVtcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvZmFxLWl0ZW1zJyB9LFxuICAgICAgeyBpZDogJ21lZXRpbmctcm9vbXMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL21lZXRpbmctcm9vbXMnIH0sXG4gICAgICB7IGlkOiAncHJpY2luZy1wbGFucycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvcHJpY2luZy1wbGFucycgfSxcbiAgICBdKVxuICAgICAgLm1hcCgocmVzb3VyY2UpID0+ICh7XG4gICAgICAgIGlkOiByZXNvdXJjZS5pZCxcbiAgICAgICAgbGFiZWw6IFJFU09VUkNFX0xBQkVMU1tyZXNvdXJjZS5pZF0gPz8gcmVzb3VyY2UuaWQsXG4gICAgICAgIGhyZWY6IHJlc291cmNlLmhyZWYsXG4gICAgICAgIHNlbGVjdGVkOiBsb2NhdGlvbi5wYXRobmFtZS5zdGFydHNXaXRoKHJlc291cmNlLmhyZWYpLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChyZXNvdXJjZSkgPT4gaXRlbU1hdGNoZXNTZWFyY2gocmVzb3VyY2UubGFiZWwsIHNlYXJjaCkpLFxuICAgIFtsb2NhdGlvbi5wYXRobmFtZSwgc2VhcmNoXSxcbiAgKTtcblxuICBjb25zdCBpbml0aWFsID0gKHNlc3Npb24/LmVtYWlsPy5bMF0gPz8gJ0MnKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBpc0Rhc2hib2FyZCA9IGxvY2F0aW9uLnBhdGhuYW1lID09PSAnL2FkbWluJyB8fCBsb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9hZG1pbi8nO1xuICBjb25zdCBpc01lZGlhID0gbG9jYXRpb24ucGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnknKTtcbiAgY29uc3Qgc2hvd1BhbmVsID0gIWlzTWVkaWE7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc3RyYXBpLXNpZGViYXItc2hlbGwke3Nob3dQYW5lbCA/ICcnIDogJyBzdHJhcGktc2lkZWJhci1zaGVsbC0tcmFpbC1vbmx5J30ke2lzVmlzaWJsZSA/ICcnIDogJyBzdHJhcGktc2lkZWJhci1zaGVsbC0taGlkZGVuJ31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZWJhci1yYWlsXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RyYXBpLXNpZGViYXItbG9nb1wiXG4gICAgICAgICAgICBzcmM9XCIvYWRtaW4tYXNzZXRzL2NsaWVudC1tYXJrLnN2Z1wiXG4gICAgICAgICAgICBhbHQ9XCJUaGUgTGVhZGVuaGFsbCBXb3Jrc1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BzdHJhcGktcmFpbC1idXR0b24ke2lzRGFzaGJvYXJkID8gJyBzdHJhcGktcmFpbC1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnL2FkbWluJyl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEhvbWVJY29uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgc3RyYXBpLXJhaWwtYnV0dG9uJHshaXNEYXNoYm9hcmQgJiYgIWlzTWVkaWEgPyAnIHN0cmFwaS1yYWlsLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKCcvYWRtaW4vcGFnZXMvc2l0ZS1zZXR0aW5ncycpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQZW5jaWxJY29uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgc3RyYXBpLXJhaWwtYnV0dG9uJHtpc01lZGlhID8gJyBzdHJhcGktcmFpbC1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnknKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TWVkaWFJY29uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktcmFpbC1zcGFjZXJcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWF2YXRhclwiPntpbml0aWFsfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7c2hvd1BhbmVsID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1zaWRlYmFyLXBhbmVsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktc2lkZWJhci1oZWFkZXJcIj5Db250ZW50IE1hbmFnZXI8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0cmFwaS1zaWRlYmFyLWJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdHJhcGktZ3JvdXBfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktZ3JvdXBfX2xhYmVsXCI+Q29sbGVjdGlvbiBUeXBlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktZ3JvdXBfX2NvdW50XCI+e2NvbGxlY3Rpb25JdGVtcy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge2NvbGxlY3Rpb25JdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BzdHJhcGktbmF2LWxpbmske2l0ZW0uc2VsZWN0ZWQgPyAnIHN0cmFwaS1uYXYtbGluay0tc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktbmF2LWxpbmtfX3RleHRcIj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyYXBpLWdyb3VwX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RyYXBpLWdyb3VwX19sYWJlbFwiPlNpbmdsZSBUeXBlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktZ3JvdXBfX2NvdW50XCI+e3BhZ2VJdGVtcy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge3BhZ2VJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BzdHJhcGktbmF2LWxpbmske2l0ZW0uc2VsZWN0ZWQgPyAnIHN0cmFwaS1uYXYtbGluay0tc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdHJhcGktbmF2LWxpbmtfX3RleHRcIj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIEZvcm1Hcm91cCxcbiAgSDIsXG4gIElucHV0LFxuICBMYWJlbCxcbiAgTWVzc2FnZUJveCxcbiAgVGV4dCxcbn0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExvZ2luKCkge1xuICBjb25zdCBwcm9wcyA9IHdpbmRvdy5fX0FQUF9TVEFURV9fID8/IHt9O1xuICBjb25zdCBicmFuZGluZyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUuYnJhbmRpbmcpO1xuICBjb25zdCBtZXNzYWdlID0gcHJvcHMuZXJyb3JNZXNzYWdlO1xuXG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgdmFyaWFudD1cImdyZXlcIlxuICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcbiAgICAgIHA9XCJ4bFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjRlZmU4IDAlLCAjZThkY2NmIDQ1JSwgI2Q5YzRhYiAxMDAlKScsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxCb3hcbiAgICAgICAgYmc9XCJ3aGl0ZVwiXG4gICAgICAgIHdpZHRoPXtbJzEwMCUnLCAnMTAwJScsICc5NjBweCddfVxuICAgICAgICBtaW5IZWlnaHQ9XCI1NjBweFwiXG4gICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgYm94U2hhZG93PVwiY2FyZFwiXG4gICAgICAgIGJvcmRlclJhZGl1cz1cInhsXCJcbiAgICAgICAgb3ZlcmZsb3c9XCJoaWRkZW5cIlxuICAgICAgPlxuICAgICAgICA8Qm94XG4gICAgICAgICAgd2lkdGg9e1snMCcsICcwJywgJzQ0JSddfVxuICAgICAgICAgIGRpc3BsYXk9e1snbm9uZScsICdub25lJywgJ2ZsZXgnXX1cbiAgICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIlxuICAgICAgICAgIHA9XCJ4eGxcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBmMGYwZiAwJSwgIzFmMWYxZiAxMDAlKScsXG4gICAgICAgICAgICBjb2xvcjogJyNmNWYxZWEnLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIvYWRtaW4tYXNzZXRzL2xvZ28uc3ZnXCJcbiAgICAgICAgICAgICAgYWx0PXticmFuZGluZy5jb21wYW55TmFtZX1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IDcyLCBoZWlnaHQ6IDcyLCBvYmplY3RGaXQ6ICdjb250YWluJywgbWFyZ2luQm90dG9tOiAyNCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxIMiBjb2xvcj1cIndoaXRlXCIgbWFyZ2luQm90dG9tPVwibGdcIj5DbGllbnQgQ29udGVudCBQb3J0YWw8L0gyPlxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NDBcIj5cbiAgICAgICAgICAgICAgVXNlIHRoZSBzYW1lIGNsaWVudC1mYWNpbmcgY29udGVudCBzdXJmYWNlIHlvdSBzZWUgaW4gU3RyYXBpLCBiYWNrZWQgYnkgdGhlIGNvcGllZCBjb21wYXJpc29uIGRhdGFiYXNlLlxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTUwXCI+VGhlIExlYWRlbmhhbGwgV29ya3M8L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBhcz1cImZvcm1cIlxuICAgICAgICAgIGFjdGlvbj17cHJvcHMuYWN0aW9ufVxuICAgICAgICAgIG1ldGhvZD1cIlBPU1RcIlxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIHA9XCJ4eGxcIlxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IG1iPVwieHhsXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi9hZG1pbi1hc3NldHMvbG9nby5zdmdcIlxuICAgICAgICAgICAgICBhbHQ9e2JyYW5kaW5nLmNvbXBhbnlOYW1lfVxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogNjQsIGhlaWdodDogNjQsIG9iamVjdEZpdDogJ2NvbnRhaW4nLCBtYXJnaW5Cb3R0b206IDIwIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEgyIG1hcmdpbj1cIjBcIj5TaWduIGluPC9IMj5cbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCI+Q2xpZW50IGVkaXRvciBhY2Nlc3MgZm9yIFRoZSBMZWFkZW5oYWxsIFdvcmtzLjwvVGV4dD5cbiAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgIHttZXNzYWdlID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiIG1iPVwibGdcIj57bWVzc2FnZX08L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+RW1haWw8L0xhYmVsPlxuICAgICAgICAgICAgPElucHV0IG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiY2xpZW50QGxlYWRlbmhhbGx3b3Jrcy5jb21cIiAvPlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5QYXNzd29yZDwvTGFiZWw+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBwYXNzd29yZFwiXG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImN1cnJlbnQtcGFzc3dvcmRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgIDxCb3ggbXQ9XCJ4bFwiPlxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIHNpemU9XCJsZ1wiPkxvZyBpbjwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9wQmFyKCkge1xuICByZXR1cm4gbnVsbDtcbn1cbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZFxuaW1wb3J0IENvbGxlY3Rpb25NYW5hZ2VyIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25NYW5hZ2VyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db2xsZWN0aW9uTWFuYWdlciA9IENvbGxlY3Rpb25NYW5hZ2VyXG5pbXBvcnQgQ29udGVudFBhZ2VFZGl0b3IgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3InXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbnRlbnRQYWdlRWRpdG9yID0gQ29udGVudFBhZ2VFZGl0b3JcbmltcG9ydCBNZWRpYUxpYnJhcnkgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5NZWRpYUxpYnJhcnkgPSBNZWRpYUxpYnJhcnlcbmltcG9ydCBTaWRlYmFyIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL1NpZGViYXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlNpZGViYXIgPSBTaWRlYmFyXG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvTG9naW4nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkxvZ2luID0gTG9naW5cbmltcG9ydCBUb3BCYXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvVG9wQmFyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Ub3BCYXIgPSBUb3BCYXIiXSwibmFtZXMiOlsiUFJJTUFSWV9QQUdFUyIsImxhYmVsIiwiaHJlZiIsIkNPTExFQ1RJT05TIiwiU1RZTEVTIiwiU2hvcnRjdXRMaXN0IiwidGl0bGUiLCJpdGVtcyIsIm5hdmlnYXRlIiwibWV0YSIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsIm1hcCIsIml0ZW0iLCJrZXkiLCJ0eXBlIiwib25DbGljayIsIkRhc2hib2FyZCIsInVzZU5hdmlnYXRlIiwiRnJhZ21lbnQiLCJNVUxUSUxJTkVfRklFTERfUEFUVEVSTiIsIklNQUdFX0ZJRUxEX1BBVFRFUk4iLCJCT09MRUFOX0ZJRUxEX1BBVFRFUk4iLCJGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4iLCJ0b0xhYmVsIiwibmFtZSIsInJlcGxhY2UiLCJ2IiwidG9VcHBlckNhc2UiLCJjbG9uZVZhbHVlIiwidmFsdWUiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJnZXRFbXB0eUl0ZW0iLCJzYW1wbGUiLCJBcnJheSIsImlzQXJyYXkiLCJPYmplY3QiLCJmcm9tRW50cmllcyIsImtleXMiLCJpbmNsdWRlcyIsInRvQ29tcGFyYWJsZVZhbHVlIiwic29ydCIsImZpbHRlciIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiaGFzTWVhbmluZ2Z1bFZhbHVlIiwic29tZSIsImVudHJpZXMiLCJuZXN0ZWRWYWx1ZSIsInRyaW0iLCJsZW5ndGgiLCJidWlsZEFkbWluUGF0aCIsInBhdGhuYW1lIiwicGFyYW1zIiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiZm9yRWFjaCIsInVuZGVmaW5lZCIsInNldCIsIlN0cmluZyIsInF1ZXJ5U3RyaW5nIiwidG9TdHJpbmciLCJwYXJzZURpc3BsYXllZEZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJCb29sZWFuIiwicGFyc2VJbnB1dFZhbHVlIiwibmV4dFJhd1ZhbHVlIiwiY3VycmVudFZhbHVlIiwicGFyc2VkIiwiTnVtYmVyIiwiaXNOYU4iLCJ1cGRhdGVBdFBhdGgiLCJwYXRoIiwibmV4dFZhbHVlIiwic2VnbWVudCIsInJlc3QiLCJjbG9uZSIsInJlbW92ZUF0UGF0aCIsIl8iLCJpbmRleCIsImFwcGVuZEF0UGF0aCIsIm5leHRJdGVtIiwiZ2V0RGlzcGxheVRpdGxlIiwiZGVmaW5pdGlvbiIsInJlY29yZCIsInRpdGxlRmllbGQiLCJyZXF1ZXN0UGFnZSIsInBhZ2VOYW1lIiwib3B0aW9ucyIsInF1ZXJ5IiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiY3JlZGVudGlhbHMiLCJwYXlsb2FkIiwianNvbiIsIm9rIiwiRXJyb3IiLCJtZXNzYWdlIiwiTWVkaWFGaWVsZCIsIm9uQ2hhbmdlIiwiZGlzYWJsZWQiLCJ1cmxzIiwic3JjIiwiYWx0Iiwid2luZG93Iiwib3BlbiIsInBvcCIsImpvaW4iLCJldmVudCIsInRhcmdldCIsInBsYWNlaG9sZGVyIiwiUHJpbWl0aXZlRmllbGQiLCJ0ZXN0IiwiY2hlY2tlZCIsIkFycmF5RmllbGQiLCJvbkFkZEl0ZW0iLCJvblJlbW92ZUl0ZW0iLCJ0ZXh0IiwicHJldmVudERlZmF1bHQiLCJzbGljZSIsIkZpZWxkUmVuZGVyZXIiLCJyZW5kZXJMaXN0Q2VsbCIsIkxpc3RWaWV3IiwicmVjb3JkcyIsImNvbnRyb2xzIiwic2VhcmNoIiwibG9hZGluZyIsIm9uU2VhcmNoIiwib25PcGVuUmVjb3JkIiwib25DcmVhdGUiLCJvblNldFNvcnQiLCJvblNldEZpbHRlciIsIm9uUmVzZXRGaWx0ZXJzIiwib25Ub2dnbGVEaXNwbGF5ZWRGaWVsZCIsIm9uUmVzZXREaXNwbGF5ZWRGaWVsZHMiLCJvbkR1cGxpY2F0ZVJlY29yZCIsIm9uRGVsZXRlUmVjb3JkIiwic2hvd1NlYXJjaCIsInNldFNob3dTZWFyY2giLCJ1c2VTdGF0ZSIsInNob3dGaWx0ZXJzIiwic2V0U2hvd0ZpbHRlcnMiLCJzaG93RGlzcGxheWVkIiwic2V0U2hvd0Rpc3BsYXllZCIsInNlYXJjaFZhbHVlIiwic2V0U2VhcmNoVmFsdWUiLCJvcGVuTWVudUlkIiwic2V0T3Blbk1lbnVJZCIsIm1lbnVSZWYiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImhhbmRsZVBvaW50ZXJEb3duIiwiY3VycmVudCIsImNvbnRhaW5zIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRpc3BsYXllZENvbHVtbnMiLCJ1c2VNZW1vIiwiYXZhaWxhYmxlRmllbGRzIiwiZGlzcGxheWVkRmllbGRzIiwiYXV0b0ZvY3VzIiwic3R5bGUiLCJsZWZ0IiwicmlnaHQiLCJmaWx0ZXJzIiwiYWN0aXZlRmlsdGVycyIsIm9wdGlvbiIsImNvbHVtbiIsInNvcnRCeSIsInNvcnRPcmRlciIsImRvY3VtZW50SWQiLCJpZCIsImNvbHVtbnMiLCJzdG9wUHJvcGFnYXRpb24iLCJyZWYiLCJFZGl0VmlldyIsInB1Ymxpc2hlZFJlY29yZCIsImFjdGl2ZVRhYiIsIm9uU3dpdGNoVGFiIiwic2F2aW5nIiwiZXJyb3IiLCJvbkJhY2siLCJvblNhdmUiLCJvblB1Ymxpc2giLCJvbkRlbGV0ZSIsIm9uRGlzY2FyZENoYW5nZXMiLCJvblVucHVibGlzaCIsImNhblNhdmUiLCJjYW5QdWJsaXNoIiwiY2FuRGlzY2FyZCIsImNhblVucHVibGlzaCIsImRpc3BsYXllZFJlY29yZCIsImlzUHVibGlzaGVkVmlldyIsIm1lbnVPcGVuIiwic2V0TWVudU9wZW4iLCJzdGF0dXMiLCJNZXNzYWdlQm94IiwidmFyaWFudCIsImVkaXRMYXlvdXQiLCJyb3ciLCJDb2xsZWN0aW9uTWFuYWdlciIsInVzZVBhcmFtcyIsImxvY2F0aW9uIiwidXNlTG9jYXRpb24iLCJhZGROb3RpY2UiLCJ1c2VOb3RpY2UiLCJzZXRMb2FkaW5nIiwibGlzdExvYWRpbmciLCJzZXRMaXN0TG9hZGluZyIsInNldFNhdmluZyIsInNldERlZmluaXRpb24iLCJzZXRSZWNvcmRzIiwic2V0Q29udHJvbHMiLCJzZXRSZWNvcmQiLCJvcmlnaW5hbFJlY29yZCIsInNldE9yaWdpbmFsUmVjb3JkIiwic2V0UHVibGlzaGVkUmVjb3JkIiwic2V0QWN0aXZlVGFiIiwic2V0RXJyb3IiLCJyZWNvcmRJZCIsImdldCIsImlzTmV3IiwiY2F0ZWdvcnkiLCJwbGFuVHlwZSIsImZlYXR1cmVkIiwiaXNGZWF0dXJlZCIsImlzUG9wdWxhciIsIm1vZGUiLCJpc0RpcnR5IiwiaGFzRHJhZnRDb250ZW50IiwiYWN0aXZlIiwibG9hZCIsInNob3VsZEJsb2NrIiwibmV3IiwibmV4dERyYWZ0UmVjb3JkIiwiZHJhZnRSZWNvcmQiLCJsb2FkRXJyb3IiLCJ1cGRhdGVMaXN0UXVlcnkiLCJwYXRjaCIsIm5leHRQYXJhbXMiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVBZGRJdGVtIiwiaGFuZGxlUmVtb3ZlSXRlbSIsImhhbmRsZVNhdmVJbnRlbnQiLCJpbnRlbnQiLCJub3RpY2UiLCJkZWxldGVkIiwicmVxdWVzdEVycm9yIiwiaGFuZGxlRGlzY2FyZENoYW5nZXMiLCJoYW5kbGVDcmVhdGUiLCJoYW5kbGVMaXN0QWN0aW9uIiwidGFyZ2V0UmVjb3JkSWQiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwiaGVpZ2h0IiwiTG9hZGVyIiwibGlzdENvbHVtbnMiLCJuZXh0U2VhcmNoIiwibmV4dFJlY29yZElkIiwibmV4dE9yZGVyIiwibmV4dEZpZWxkcyIsIlNldCIsImFwaSIsIkFwaUNsaWVudCIsIklNQUdFX1VSTF9QQVRURVJOIiwiUkVRVUlSRURfRklFTERfUEFUVEVSTiIsIlBBR0VfTEFZT1VUUyIsImZpZWxkcyIsImhvbWVwYWdlIiwiUFJFVklFV19QQVRIUyIsImlzUGxhaW5PYmplY3QiLCJnZXRGaWxlbmFtZSIsInVybCIsIlVSTCIsImZpbGVuYW1lIiwiaXNSZXF1aXJlZEZpZWxkIiwiZmllbGRLZXkiLCJmaWVsZENsYXNzTmFtZSIsImdldEl0ZW1UaXRsZSIsImZhbGxiYWNrTGFiZWwiLCJwcmVmZXJyZWQiLCJxdWVzdGlvbiIsImZlYXR1cmUiLCJmaW5kIiwiYnVpbGRTZWN0aW9ucyIsImNvbnRlbnQiLCJsYXlvdXQiLCJ1c2VkIiwic2VjdGlvbnMiLCJzZWN0aW9uIiwic2VjdGlvbkVudHJpZXMiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJhZGQiLCJleHRyYUVudHJpZXMiLCJoYXMiLCJwdXNoIiwiaW5wdXRWYWx1ZSIsInJlcXVpcmVkIiwiaXNJbWFnZUZpZWxkIiwic2hvd1ByZXZpZXciLCJwcm9tcHQiLCJPYmplY3RGaWVsZCIsIm5lc3RlZEtleSIsInByb3BzIiwiRm9ybVNlY3Rpb24iLCJDb250ZW50UGFnZUVkaXRvciIsInBhZ2VMYWJlbCIsInNldFBhZ2VMYWJlbCIsInNldENvbnRlbnQiLCJvcmlnaW5hbENvbnRlbnQiLCJzZXRPcmlnaW5hbENvbnRlbnQiLCJwdWJsaXNoZWRDb250ZW50Iiwic2V0UHVibGlzaGVkQ29udGVudCIsImRpc3BsYXllZENvbnRlbnQiLCJwcmV2aWV3VXJsIiwiZW50cnlUaXRsZSIsImhlcm9UaXRsZSIsInNpdGVOYW1lIiwiaXNNb3VudGVkIiwibG9hZFBhZ2UiLCJnZXRQYWdlIiwibmV4dERyYWZ0Q29udGVudCIsImRhdGEiLCJkcmFmdERhdGEiLCJwdWJsaXNoZWREYXRhIiwiaGFuZGxlU2F2ZSIsInNhdmVFcnJvciIsImhpc3RvcnkiLCJiYWNrIiwiYnVpbGRQYWdlUGF0aCIsInJlcXVlc3RNZWRpYSIsIkFzc2V0Q2FyZCIsIm9uT3BlbiIsInRodW1ibmFpbFVybCIsImFsdGVybmF0aXZlVGV4dCIsIm1pbWUiLCJzdGFydHNXaXRoIiwiZXh0Iiwid2lkdGgiLCJEZXRhaWxWaWV3IiwibWFyZ2luQm90dG9tIiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwibmF2aWdhdG9yIiwiY2xpcGJvYXJkIiwid3JpdGVUZXh0IiwicmVhZE9ubHkiLCJjYXB0aW9uIiwic2l6ZUxhYmVsIiwicHJvdmlkZXIiLCJmb2xkZXJQYXRoIiwidXBkYXRlZEF0TGFiZWwiLCJjcmVhdGVkQXRMYWJlbCIsIk1lZGlhTGlicmFyeSIsImZpbGVJZCIsInNldEl0ZW1zIiwiY291bnQiLCJzZXRDb3VudCIsInNldEl0ZW0iLCJvcGVuTGlzdCIsImRlZmF1bHRWYWx1ZSIsIm1lZGlhSXRlbSIsIm5leHRJZCIsIkNPTlRFTlRfUEFHRV9PUkRFUiIsIkNPTlRFTlRfUEFHRV9MQUJFTFMiLCJSRVNPVVJDRV9MQUJFTFMiLCJTSURFQkFSX1dJRFRIIiwiUkFJTF9XSURUSCIsIml0ZW1NYXRjaGVzU2VhcmNoIiwidG9Mb3dlckNhc2UiLCJSYWlsSWNvbiIsImNoaWxkcmVuIiwidmlld0JveCIsIkhvbWVJY29uIiwiZCIsIlBlbmNpbEljb24iLCJNZWRpYUljb24iLCJ4IiwieSIsInJ4IiwiY3giLCJjeSIsInIiLCJTaWRlYmFyIiwiaXNWaXNpYmxlIiwicGFnZXMiLCJ1c2VTZWxlY3RvciIsInN0YXRlIiwic2Vzc2lvbiIsInNldFNlYXJjaCIsInBhZ2VJdGVtcyIsInBhZ2UiLCJzZWxlY3RlZCIsImNvbGxlY3Rpb25JdGVtcyIsInJlc291cmNlIiwiaW5pdGlhbCIsImVtYWlsIiwiaXNEYXNoYm9hcmQiLCJpc01lZGlhIiwic2hvd1BhbmVsIiwiTG9naW4iLCJfX0FQUF9TVEFURV9fIiwiYnJhbmRpbmciLCJlcnJvck1lc3NhZ2UiLCJCb3giLCJwIiwiYmFja2dyb3VuZCIsImJnIiwibWluSGVpZ2h0IiwiYm94U2hhZG93IiwiYm9yZGVyUmFkaXVzIiwib3ZlcmZsb3ciLCJmbGV4RGlyZWN0aW9uIiwiY29sb3IiLCJjb21wYW55TmFtZSIsIm9iamVjdEZpdCIsIkgyIiwiVGV4dCIsImFzIiwiYWN0aW9uIiwiZmxleEdyb3ciLCJtYiIsIm1hcmdpbiIsIkZvcm1Hcm91cCIsIkxhYmVsIiwiSW5wdXQiLCJhdXRvQ29tcGxldGUiLCJtdCIsIkJ1dHRvbiIsInNpemUiLCJUb3BCYXIiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFHQSxNQUFNQSxhQUFhLEdBQUcsQ0FDcEI7RUFBRUMsRUFBQUEsS0FBSyxFQUFFLFVBQVU7RUFBRUMsRUFBQUEsSUFBSSxFQUFFO0VBQXdCLENBQUMsRUFDcEQ7RUFBRUQsRUFBQUEsS0FBSyxFQUFFLFlBQVk7RUFBRUMsRUFBQUEsSUFBSSxFQUFFO0VBQTBCLENBQUMsRUFDeEQ7RUFBRUQsRUFBQUEsS0FBSyxFQUFFLGNBQWM7RUFBRUMsRUFBQUEsSUFBSSxFQUFFO0VBQTRCLENBQUMsRUFDNUQ7RUFBRUQsRUFBQUEsS0FBSyxFQUFFLGNBQWM7RUFBRUMsRUFBQUEsSUFBSSxFQUFFO0VBQTRCLENBQUMsQ0FDN0Q7RUFFRCxNQUFNQyxXQUFXLEdBQUcsQ0FDbEI7RUFBRUYsRUFBQUEsS0FBSyxFQUFFLFlBQVk7RUFBRUMsRUFBQUEsSUFBSSxFQUFFO0VBQTBCLENBQUMsRUFDeEQ7RUFBRUQsRUFBQUEsS0FBSyxFQUFFLFdBQVc7RUFBRUMsRUFBQUEsSUFBSSxFQUFFO0VBQXlCLENBQUMsRUFDdEQ7RUFBRUQsRUFBQUEsS0FBSyxFQUFFLGVBQWU7RUFBRUMsRUFBQUEsSUFBSSxFQUFFO0VBQTZCLENBQUMsRUFDOUQ7RUFBRUQsRUFBQUEsS0FBSyxFQUFFLGVBQWU7RUFBRUMsRUFBQUEsSUFBSSxFQUFFO0VBQTZCLENBQUMsQ0FDL0Q7RUFFRCxNQUFNRSxRQUFNLEdBQUc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7RUFFRCxTQUFTcUIsU0FBT0EsQ0FBQ0MsSUFBSSxFQUFFO0VBQ3JCLEVBQUEsT0FBT0EsSUFBSSxDQUNSQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQ3RDQSxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUN0QkEsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FDM0JBLE9BQU8sQ0FBQyxJQUFJLEVBQUdDLENBQUMsSUFBS0EsQ0FBQyxDQUFDQyxXQUFXLEVBQUUsQ0FBQztFQUMxQztFQUVBLFNBQVND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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztFQUVELFNBQVNxQixPQUFPQSxDQUFDQyxJQUFJLEVBQUU7RUFDckIsRUFBQSxPQUFPQSxJQUFJLENBQ1JDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FDdENBLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQ3RCQSxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUMzQkEsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FDM0JBLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQzNCQSxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUN6QkEsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FDM0JBLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQ3BCeUIsSUFBSSxFQUFFLENBQ056QixPQUFPLENBQUMsSUFBSSxFQUFHSSxLQUFLLElBQUtBLEtBQUssQ0FBQ0YsV0FBVyxFQUFFLENBQUM7RUFDbEQ7RUFFQSxTQUFTQyxVQUFVQSxDQUFDQyxLQUFLLEVBQUU7SUFDekIsT0FBT0MsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsU0FBUyxDQUFDSCxLQUFLLENBQUMsQ0FBQztFQUMxQztFQUVBLFNBQVNZLGlCQUFpQkEsQ0FBQ1osS0FBSyxFQUFFO0VBQ2hDLEVBQUEsSUFBSU0sS0FBSyxDQUFDQyxPQUFPLENBQUNQLEtBQUssQ0FBQyxFQUFFO01BQ3hCLE9BQU9BLEtBQUssQ0FBQ2xCLEdBQUcsQ0FBRUMsSUFBSSxJQUFLNkIsaUJBQWlCLENBQUM3QixJQUFJLENBQUMsQ0FBQztFQUNyRCxFQUFBO0VBRUEsRUFBQSxJQUFJNFEsYUFBYSxDQUFDM1AsS0FBSyxDQUFDLEVBQUU7TUFDeEIsT0FBT1EsTUFBTSxDQUFDRSxJQUFJLENBQUNWLEtBQUssQ0FBQyxDQUN0QmEsSUFBSSxFQUFFLENBQ05DLE1BQU0sQ0FBRTlCLEdBQUcsSUFBS0EsR0FBRyxLQUFLLFVBQVUsQ0FBQyxDQUNuQytCLE1BQU0sQ0FBQyxDQUFDQyxXQUFXLEVBQUVoQyxHQUFHLEtBQUs7UUFDNUJnQyxXQUFXLENBQUNoQyxHQUFHLENBQUMsR0FBRzRCLGlCQUFpQixDQUFDWixLQUFLLENBQUNoQixHQUFHLENBQUMsQ0FBQztFQUNoRCxNQUFBLE9BQU9nQyxXQUFXO01BQ3BCLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDVixFQUFBO0VBRUEsRUFBQSxPQUFPaEIsS0FBSztFQUNkO0VBRUEsU0FBU2lCLGtCQUFrQkEsQ0FBQ2pCLEtBQUssRUFBRTtFQUNqQyxFQUFBLElBQUlNLEtBQUssQ0FBQ0MsT0FBTyxDQUFDUCxLQUFLLENBQUMsRUFBRTtNQUN4QixPQUFPQSxLQUFLLENBQUNrQixJQUFJLENBQUVuQyxJQUFJLElBQUtrQyxrQkFBa0IsQ0FBQ2xDLElBQUksQ0FBQyxDQUFDO0VBQ3ZELEVBQUE7RUFFQSxFQUFBLElBQUk0USxhQUFhLENBQUMzUCxLQUFLLENBQUMsRUFBRTtFQUN4QixJQUFBLE9BQU9RLE1BQU0sQ0FBQ1csT0FBTyxDQUFDbkIsS0FBSyxDQUFDLENBQ3pCYyxNQUFNLENBQUMsQ0FBQyxDQUFDOUIsR0FBRyxDQUFDLEtBQUtBLEdBQUcsS0FBSyxVQUFVLENBQUMsQ0FDckNrQyxJQUFJLENBQUMsQ0FBQyxHQUFHRSxXQUFXLENBQUMsS0FBS0gsa0JBQWtCLENBQUNHLFdBQVcsQ0FBQyxDQUFDO0VBQy9ELEVBQUE7RUFFQSxFQUFBLElBQUksT0FBT3BCLEtBQUssS0FBSyxRQUFRLEVBQUU7TUFDN0IsT0FBT0EsS0FBSyxDQUFDcUIsSUFBSSxFQUFFLENBQUNDLE1BQU0sR0FBRyxDQUFDO0VBQ2hDLEVBQUE7RUFFQSxFQUFBLElBQUksT0FBT3RCLEtBQUssS0FBSyxRQUFRLEVBQUU7TUFDN0IsT0FBT0EsS0FBSyxLQUFLLENBQUM7RUFDcEIsRUFBQTtFQUVBLEVBQUEsSUFBSSxPQUFPQSxLQUFLLEtBQUssU0FBUyxFQUFFO0VBQzlCLElBQUEsT0FBT0EsS0FBSztFQUNkLEVBQUE7SUFFQSxPQUFPQSxLQUFLLElBQUksSUFBSTtFQUN0QjtFQUVBLFNBQVMyUCxhQUFhQSxDQUFDM1AsS0FBSyxFQUFFO0VBQzVCLEVBQUEsT0FBT0EsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPQSxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUNNLEtBQUssQ0FBQ0MsT0FBTyxDQUFDUCxLQUFLLENBQUM7RUFDN0U7RUFFQSxTQUFTNFAsV0FBV0EsQ0FBQ0MsR0FBRyxFQUFFO0VBQ3hCLEVBQUEsSUFBSSxPQUFPQSxHQUFHLEtBQUssUUFBUSxFQUFFO0VBQzNCLElBQUEsT0FBTyxFQUFFO0VBQ1gsRUFBQTtJQUVBLElBQUk7TUFDRixNQUFNck8sUUFBUSxHQUFHLElBQUlzTyxHQUFHLENBQUNELEdBQUcsQ0FBQyxDQUFDck8sUUFBUTtNQUN0QyxNQUFNdU8sUUFBUSxHQUFHdk8sUUFBUSxDQUFDVyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMrQyxHQUFHLEVBQUU7TUFDMUMsT0FBTzZLLFFBQVEsSUFBSUYsR0FBRztFQUN4QixFQUFBLENBQUMsQ0FBQyxNQUFNO01BQ04sT0FBT0EsR0FBRyxDQUFDMU4sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDK0MsR0FBRyxFQUFFLElBQUkySyxHQUFHO0VBQ3BDLEVBQUE7RUFDRjtFQUVBLFNBQVN6UCxZQUFZQSxDQUFDQyxNQUFNLEVBQUU7RUFDNUIsRUFBQSxJQUFJQyxLQUFLLENBQUNDLE9BQU8sQ0FBQ0YsTUFBTSxDQUFDLEVBQUU7RUFDekIsSUFBQSxPQUFPLEVBQUU7RUFDWCxFQUFBO0VBRUEsRUFBQSxJQUFJQSxNQUFNLElBQUksT0FBT0EsTUFBTSxLQUFLLFFBQVEsRUFBRTtFQUN4QyxJQUFBLE9BQU9HLE1BQU0sQ0FBQ0MsV0FBVyxDQUN2QkQsTUFBTSxDQUFDRSxJQUFJLENBQUNMLE1BQU0sQ0FBQyxDQUNoQlMsTUFBTSxDQUFFOUIsR0FBRyxJQUFLQSxHQUFHLEtBQUssSUFBSSxDQUFDLENBQzdCRixHQUFHLENBQUVFLEdBQUcsSUFBSyxDQUFDQSxHQUFHLEVBQUVvQixZQUFZLENBQUNDLE1BQU0sQ0FBQ3JCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDbEQsQ0FBQztFQUNILEVBQUE7RUFFQSxFQUFBLElBQUksT0FBT3FCLE1BQU0sS0FBSyxTQUFTLEVBQUU7RUFDL0IsSUFBQSxPQUFPLEtBQUs7RUFDZCxFQUFBO0VBRUEsRUFBQSxJQUFJLE9BQU9BLE1BQU0sS0FBSyxRQUFRLEVBQUU7RUFDOUIsSUFBQSxPQUFPLENBQUM7RUFDVixFQUFBO0VBRUEsRUFBQSxPQUFPLEVBQUU7RUFDWDtFQUVBLFNBQVN1QyxZQUFZQSxDQUFDNUMsS0FBSyxFQUFFNkMsSUFBSSxFQUFFQyxTQUFTLEVBQUU7RUFDNUMsRUFBQSxJQUFJLENBQUNELElBQUksQ0FBQ3ZCLE1BQU0sRUFBRTtFQUNoQixJQUFBLE9BQU93QixTQUFTO0VBQ2xCLEVBQUE7RUFFQSxFQUFBLE1BQU0sQ0FBQ0MsT0FBTyxFQUFFLEdBQUdDLElBQUksQ0FBQyxHQUFHSCxJQUFJO0VBQy9CLEVBQUEsTUFBTUksS0FBSyxHQUFHM0MsS0FBSyxDQUFDQyxPQUFPLENBQUNQLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBR0EsS0FBSyxDQUFDLEdBQUc7TUFBRSxHQUFHQTtLQUFPO0VBQzlEaUQsRUFBQUEsS0FBSyxDQUFDRixPQUFPLENBQUMsR0FBR0gsWUFBWSxDQUFDNUMsS0FBSyxHQUFHK0MsT0FBTyxDQUFDLEVBQUVDLElBQUksRUFBRUYsU0FBUyxDQUFDO0VBQ2hFLEVBQUEsT0FBT0csS0FBSztFQUNkO0VBRUEsU0FBU0MsWUFBWUEsQ0FBQ2xELEtBQUssRUFBRTZDLElBQUksRUFBRTtFQUNqQyxFQUFBLElBQUlBLElBQUksQ0FBQ3ZCLE1BQU0sS0FBSyxDQUFDLEVBQUU7RUFDckIsSUFBQSxJQUFJLENBQUNoQixLQUFLLENBQUNDLE9BQU8sQ0FBQ1AsS0FBSyxDQUFDLEVBQUU7RUFDekIsTUFBQSxPQUFPQSxLQUFLO0VBQ2QsSUFBQTtFQUVBLElBQUEsT0FBT0EsS0FBSyxDQUFDYyxNQUFNLENBQUMsQ0FBQ3FDLENBQUMsRUFBRUMsS0FBSyxLQUFLQSxLQUFLLEtBQUtQLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0RCxFQUFBO0VBRUEsRUFBQSxNQUFNLENBQUNFLE9BQU8sRUFBRSxHQUFHQyxJQUFJLENBQUMsR0FBR0gsSUFBSTtFQUMvQixFQUFBLE1BQU1JLEtBQUssR0FBRzNDLEtBQUssQ0FBQ0MsT0FBTyxDQUFDUCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUdBLEtBQUssQ0FBQyxHQUFHO01BQUUsR0FBR0E7S0FBTztFQUM5RGlELEVBQUFBLEtBQUssQ0FBQ0YsT0FBTyxDQUFDLEdBQUdHLFlBQVksQ0FBQ2xELEtBQUssR0FBRytDLE9BQU8sQ0FBQyxFQUFFQyxJQUFJLENBQUM7RUFDckQsRUFBQSxPQUFPQyxLQUFLO0VBQ2Q7RUFFQSxTQUFTSSxZQUFZQSxDQUFDckQsS0FBSyxFQUFFNkMsSUFBSSxFQUFFUyxRQUFRLEVBQUU7RUFDM0MsRUFBQSxJQUFJLENBQUNULElBQUksQ0FBQ3ZCLE1BQU0sRUFBRTtFQUNoQixJQUFBLE9BQU8sQ0FBQyxJQUFJaEIsS0FBSyxDQUFDQyxPQUFPLENBQUNQLEtBQUssQ0FBQyxHQUFHQSxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUVzRCxRQUFRLENBQUM7RUFDM0QsRUFBQTtFQUVBLEVBQUEsTUFBTSxDQUFDUCxPQUFPLEVBQUUsR0FBR0MsSUFBSSxDQUFDLEdBQUdILElBQUk7RUFDL0IsRUFBQSxNQUFNSSxLQUFLLEdBQUczQyxLQUFLLENBQUNDLE9BQU8sQ0FBQ1AsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHQSxLQUFLLENBQUMsR0FBRztNQUFFLEdBQUdBO0tBQU87RUFDOURpRCxFQUFBQSxLQUFLLENBQUNGLE9BQU8sQ0FBQyxHQUFHTSxZQUFZLENBQUNyRCxLQUFLLEdBQUcrQyxPQUFPLENBQUMsRUFBRUMsSUFBSSxFQUFFTSxRQUFRLENBQUM7RUFDL0QsRUFBQSxPQUFPTCxLQUFLO0VBQ2Q7RUFFQSxTQUFTWCxlQUFlQSxDQUFDQyxZQUFZLEVBQUVDLFlBQVksRUFBRTtFQUNuRCxFQUFBLElBQUksT0FBT0EsWUFBWSxLQUFLLFFBQVEsRUFBRTtNQUNwQyxJQUFJRCxZQUFZLEtBQUssRUFBRSxFQUFFO0VBQ3ZCLE1BQUEsT0FBTyxDQUFDO0VBQ1YsSUFBQTtFQUVBLElBQUEsTUFBTUUsTUFBTSxHQUFHQyxNQUFNLENBQUNILFlBQVksQ0FBQztNQUNuQyxPQUFPRyxNQUFNLENBQUNDLEtBQUssQ0FBQ0YsTUFBTSxDQUFDLEdBQUdELFlBQVksR0FBR0MsTUFBTTtFQUNyRCxFQUFBO0VBRUEsRUFBQSxPQUFPRixZQUFZO0VBQ3JCO0VBRUEsU0FBU3lOLGVBQWVBLENBQUNDLFFBQVEsRUFBRTtFQUNqQyxFQUFBLE9BQU9YLHNCQUFzQixDQUFDOUosSUFBSSxDQUFDeUssUUFBUSxDQUFDO0VBQzlDO0VBRUEsU0FBU0MsY0FBY0EsQ0FBQ0QsUUFBUSxFQUFFalEsS0FBSyxFQUFFO0VBQ3ZDLEVBQUEsT0FBT1Asd0JBQXdCLENBQUMrRixJQUFJLENBQUN5SyxRQUFRLENBQUMsSUFBSSxPQUFPalEsS0FBSyxLQUFLLFNBQVMsR0FDeEUsaUNBQWlDLEdBQ2pDLGNBQWM7RUFDcEI7RUFFQSxTQUFTbVEsWUFBWUEsQ0FBQ3BSLElBQUksRUFBRXFSLGFBQWEsRUFBRWhOLEtBQUssRUFBRTtFQUNoRCxFQUFBLElBQUksQ0FBQ3VNLGFBQWEsQ0FBQzVRLElBQUksQ0FBQyxFQUFFO0VBQ3hCLElBQUEsT0FBTyxHQUFHcVIsYUFBYSxDQUFBLENBQUEsRUFBSWhOLEtBQUssR0FBRyxDQUFDLENBQUEsQ0FBRTtFQUN4QyxFQUFBO0lBRUEsTUFBTWlOLFNBQVMsR0FBRyxDQUNoQnRSLElBQUksQ0FBQ1IsS0FBSyxFQUNWUSxJQUFJLENBQUNZLElBQUksRUFDVFosSUFBSSxDQUFDYixLQUFLLEVBQ1ZhLElBQUksQ0FBQ3VSLFFBQVEsRUFDYnZSLElBQUksQ0FBQ3dSLE9BQU8sRUFDWnhSLElBQUksQ0FBQzhELElBQUksRUFDVDlELElBQUksQ0FBQ1osSUFBSSxFQUNUWSxJQUFJLENBQUNnRyxHQUFHLENBQ1QsQ0FBQ3lMLElBQUksQ0FBRXhRLEtBQUssSUFBSyxPQUFPQSxLQUFLLEtBQUssUUFBUSxJQUFJQSxLQUFLLENBQUNxQixJQUFJLEVBQUUsQ0FBQztJQUU1RCxPQUFPZ1AsU0FBUyxJQUFJLENBQUEsRUFBR0QsYUFBYSxJQUFJaE4sS0FBSyxHQUFHLENBQUMsQ0FBQSxDQUFFO0VBQ3JEO0VBRUEsU0FBU3FOLGFBQWFBLENBQUM3TSxRQUFRLEVBQUU4TSxPQUFPLEVBQUU7SUFDeEMsTUFBTXZQLE9BQU8sR0FBR1gsTUFBTSxDQUFDVyxPQUFPLENBQUN1UCxPQUFPLElBQUksRUFBRSxDQUFDO0VBQzdDLEVBQUEsTUFBTUMsTUFBTSxHQUFHcEIsWUFBWSxDQUFDM0wsUUFBUSxDQUFDO0lBRXJDLElBQUksQ0FBQytNLE1BQU0sRUFBRTtFQUNYLElBQUEsT0FBTyxDQUFDO0VBQUV4UCxNQUFBQTtFQUFRLEtBQUMsQ0FBQztFQUN0QixFQUFBO0VBRUEsRUFBQSxNQUFNeVAsSUFBSSxHQUFHLElBQUkxQixHQUFHLEVBQUU7RUFDdEIsRUFBQSxNQUFNMkIsUUFBUSxHQUFHRixNQUFNLENBQ3BCN1IsR0FBRyxDQUFFZ1MsT0FBTyxJQUFLO0VBQ2hCLElBQUEsTUFBTUMsY0FBYyxHQUFHRCxPQUFPLENBQUN0QixNQUFNLENBQ2xDMU8sTUFBTSxDQUFFc0IsS0FBSyxJQUFLNUIsTUFBTSxDQUFDd1EsU0FBUyxDQUFDQyxjQUFjLENBQUNDLElBQUksQ0FBQ1IsT0FBTyxJQUFJLEVBQUUsRUFBRXRPLEtBQUssQ0FBQyxDQUFDLENBQzdFdEQsR0FBRyxDQUFFc0QsS0FBSyxJQUFLO0VBQ2R3TyxNQUFBQSxJQUFJLENBQUNPLEdBQUcsQ0FBQy9PLEtBQUssQ0FBQztFQUNmLE1BQUEsT0FBTyxDQUFDQSxLQUFLLEVBQUVzTyxPQUFPLENBQUN0TyxLQUFLLENBQUMsQ0FBQztFQUNoQyxJQUFBLENBQUMsQ0FBQztNQUVKLE9BQU87RUFBRSxNQUFBLEdBQUcwTyxPQUFPO0VBQUUzUCxNQUFBQSxPQUFPLEVBQUU0UDtPQUFnQjtFQUNoRCxFQUFBLENBQUMsQ0FBQyxDQUNEalEsTUFBTSxDQUFFZ1EsT0FBTyxJQUFLQSxPQUFPLENBQUMzUCxPQUFPLENBQUNHLE1BQU0sR0FBRyxDQUFDLENBQUM7RUFFbEQsRUFBQSxNQUFNOFAsWUFBWSxHQUFHalEsT0FBTyxDQUFDTCxNQUFNLENBQUMsQ0FBQyxDQUFDbVAsUUFBUSxDQUFDLEtBQUssQ0FBQ1csSUFBSSxDQUFDUyxHQUFHLENBQUNwQixRQUFRLENBQUMsQ0FBQztJQUV4RSxJQUFJbUIsWUFBWSxDQUFDOVAsTUFBTSxFQUFFO01BQ3ZCdVAsUUFBUSxDQUFDUyxJQUFJLENBQUM7RUFBRW5RLE1BQUFBLE9BQU8sRUFBRWlRO0VBQWEsS0FBQyxDQUFDO0VBQzFDLEVBQUE7RUFFQSxFQUFBLE9BQU9QLFFBQVE7RUFDakI7RUFFQSxTQUFTdEwsY0FBY0EsQ0FBQztJQUFFMEssUUFBUTtJQUFFalEsS0FBSztJQUFFNkMsSUFBSTtJQUFFOEIsUUFBUTtFQUFFQyxFQUFBQTtFQUFTLENBQUMsRUFBRTtFQUNyRSxFQUFBLE1BQU0xRyxLQUFLLEdBQUd3QixPQUFPLENBQUN1USxRQUFRLENBQUM7RUFDL0IsRUFBQSxNQUFNc0IsVUFBVSxHQUFHdlIsS0FBSyxJQUFJLEVBQUU7RUFDOUIsRUFBQSxNQUFNd1IsUUFBUSxHQUFHeEIsZUFBZSxDQUFDQyxRQUFRLENBQUM7RUFDMUMsRUFBQSxNQUFNd0IsWUFBWSxHQUFHLE9BQU9GLFVBQVUsS0FBSyxRQUFRLElBQUloUyxtQkFBbUIsQ0FBQ2lHLElBQUksQ0FBQ3lLLFFBQVEsQ0FBQztJQUN6RixNQUFNeUIsV0FBVyxHQUFHRCxZQUFZLElBQUlwQyxpQkFBaUIsQ0FBQzdKLElBQUksQ0FBQytMLFVBQVUsQ0FBQztFQUV0RSxFQUFBLElBQUksT0FBT3ZSLEtBQUssS0FBSyxTQUFTLEVBQUU7TUFDOUIsb0JBQ0VyQixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLE1BQUFBLFNBQVMsRUFBRXFSLGNBQWMsQ0FBQ0QsUUFBUSxFQUFFalEsS0FBSztPQUFFLGVBQzlDckIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtFQUFPQyxNQUFBQSxTQUFTLEVBQUM7RUFBYyxLQUFBLEVBQzVCWCxLQUFLLEVBQ0xzVCxRQUFRLGdCQUFHN1Msc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNQyxNQUFBQSxTQUFTLEVBQUM7T0FBd0IsRUFBQyxHQUFPLENBQUMsR0FBRyxJQUMzRCxDQUFDLGVBQ1JGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsTUFBQUEsU0FBUyxFQUFDO0VBQWUsS0FBQSxlQUM1QkYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQU9vQixLQUFLLEdBQUcsU0FBUyxHQUFHLFVBQWlCLENBQUMsZUFDN0NyQixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQ0VLLE1BQUFBLElBQUksRUFBQyxVQUFVO0VBQ2Z3RyxNQUFBQSxPQUFPLEVBQUV6RixLQUFNO0VBQ2Y0RSxNQUFBQSxRQUFRLEVBQUVBLFFBQVM7UUFDbkJELFFBQVEsRUFBR1MsS0FBSyxJQUFLVCxRQUFRLENBQUM5QixJQUFJLEVBQUV1QyxLQUFLLENBQUNDLE1BQU0sQ0FBQ0ksT0FBTztPQUN6RCxDQUNFLENBQ0YsQ0FBQztFQUVWLEVBQUE7RUFFQSxFQUFBLElBQUlnTSxZQUFZLEVBQUU7TUFDaEIsb0JBQ0U5UyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLE1BQUFBLFNBQVMsRUFBQztPQUFpQyxlQUM5Q0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtFQUFPQyxNQUFBQSxTQUFTLEVBQUM7RUFBYyxLQUFBLEVBQzVCWCxLQUFLLEVBQ0xzVCxRQUFRLGdCQUFHN1Msc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNQyxNQUFBQSxTQUFTLEVBQUM7T0FBd0IsRUFBQyxHQUFPLENBQUMsR0FBRyxJQUMzRCxDQUFDLGVBQ1JGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsTUFBQUEsU0FBUyxFQUFDO09BQWMsZUFDM0JGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsTUFBQUEsU0FBUyxFQUFDO0VBQXNCLEtBQUEsRUFDbEM2UyxXQUFXLGdCQUNWL1Msc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxNQUFBQSxTQUFTLEVBQUM7T0FBcUIsZUFDbENGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsTUFBQUEsU0FBUyxFQUFDLHFCQUFxQjtFQUFDaUcsTUFBQUEsR0FBRyxFQUFFeU0sVUFBVztFQUFDeE0sTUFBQUEsR0FBRyxFQUFFN0c7RUFBTSxLQUFFLENBQUMsZUFDcEVTLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsTUFBQUEsU0FBUyxFQUFDO09BQXVCLGVBQ3BDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VDLE1BQUFBLFNBQVMsRUFBQyxzQkFBc0I7RUFDaENJLE1BQUFBLElBQUksRUFBQyxRQUFRO0VBQ2IyRixNQUFBQSxRQUFRLEVBQUVBLFFBQVM7UUFDbkIxRixPQUFPLEVBQUVBLE1BQU04RixNQUFNLENBQUNDLElBQUksQ0FBQ3NNLFVBQVUsRUFBRSxRQUFRLEVBQUUscUJBQXFCO0VBQUUsS0FBQSxFQUN6RSxRQUVPLENBQUMsZUFDVDVTLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFDRUMsTUFBQUEsU0FBUyxFQUFDLHNCQUFzQjtFQUNoQ0ksTUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYjJGLE1BQUFBLFFBQVEsRUFBRUEsUUFBUztRQUNuQjFGLE9BQU8sRUFBRUEsTUFBTTtVQUNiLE1BQU00RCxTQUFTLEdBQUdrQyxNQUFNLENBQUMyTSxNQUFNLENBQUMsQ0FBQSxPQUFBLEVBQVV6VCxLQUFLLENBQUEsSUFBQSxDQUFNLEVBQUVxVCxVQUFVLENBQUM7VUFDbEUsSUFBSXpPLFNBQVMsS0FBSyxJQUFJLEVBQUU7RUFDdEI2QixVQUFBQSxRQUFRLENBQUM5QixJQUFJLEVBQUVDLFNBQVMsQ0FBQztFQUMzQixRQUFBO0VBQ0YsTUFBQTtFQUFFLEtBQUEsRUFDSCxRQUVPLENBQUMsZUFDVG5FLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFDRUMsTUFBQUEsU0FBUyxFQUFDLHNCQUFzQjtFQUNoQ0ksTUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYjJGLE1BQUFBLFFBQVEsRUFBRUEsUUFBUztFQUNuQjFGLE1BQUFBLE9BQU8sRUFBRUEsTUFBTXlGLFFBQVEsQ0FBQzlCLElBQUksRUFBRSxFQUFFO0VBQUUsS0FBQSxFQUNuQyxRQUVPLENBQ0wsQ0FBQyxlQUNObEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxNQUFBQSxTQUFTLEVBQUM7T0FBd0IsRUFBRStRLFdBQVcsQ0FBQzJCLFVBQVUsQ0FBTyxDQUNuRSxDQUFDLGdCQUVONVMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxNQUFBQSxTQUFTLEVBQUM7RUFBcUIsS0FBQSxFQUFDLDJDQUE4QyxDQUVsRixDQUFDLGVBQ05GLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsTUFBQUEsU0FBUyxFQUFDO09BQXNCLGVBQ25DRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQ0VDLE1BQUFBLFNBQVMsRUFBQyxjQUFjO0VBQ3hCSSxNQUFBQSxJQUFJLEVBQUMsTUFBTTtFQUNYZSxNQUFBQSxLQUFLLEVBQUV1UixVQUFXO0VBQ2xCM00sTUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQ25CRCxNQUFBQSxRQUFRLEVBQUdTLEtBQUssSUFBS1QsUUFBUSxDQUFDOUIsSUFBSSxFQUFFdUMsS0FBSyxDQUFDQyxNQUFNLENBQUNyRixLQUFLLENBQUU7RUFDeERzRixNQUFBQSxXQUFXLEVBQUM7T0FDYixDQUNFLENBQ0YsQ0FDRixDQUFDO0VBRVYsRUFBQTtJQUVBLG9CQUNFM0csc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUVxUixjQUFjLENBQUNELFFBQVEsRUFBRWpRLEtBQUs7S0FBRSxlQUM5Q3JCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxPQUFBLEVBQUE7RUFBT0MsSUFBQUEsU0FBUyxFQUFDO0VBQWMsR0FBQSxFQUM1QlgsS0FBSyxFQUNMc1QsUUFBUSxnQkFBRzdTLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTUMsSUFBQUEsU0FBUyxFQUFDO0VBQXdCLEdBQUEsRUFBQyxHQUFPLENBQUMsR0FBRyxJQUMzRCxDQUFDLEVBQ1BTLHVCQUF1QixDQUFDa0csSUFBSSxDQUFDeUssUUFBUSxDQUFDLGdCQUNyQ3RSLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxVQUFBLEVBQUE7RUFDRUMsSUFBQUEsU0FBUyxFQUFDLGlCQUFpQjtFQUMzQm1CLElBQUFBLEtBQUssRUFBRXVSLFVBQVc7RUFDbEIzTSxJQUFBQSxRQUFRLEVBQUVBLFFBQVM7RUFDbkJELElBQUFBLFFBQVEsRUFBR1MsS0FBSyxJQUFLVCxRQUFRLENBQUM5QixJQUFJLEVBQUVQLGVBQWUsQ0FBQzhDLEtBQUssQ0FBQ0MsTUFBTSxDQUFDckYsS0FBSyxFQUFFQSxLQUFLLENBQUM7RUFBRSxHQUNqRixDQUFDLGdCQUVGckIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE9BQUEsRUFBQTtFQUNFQyxJQUFBQSxTQUFTLEVBQUMsY0FBYztNQUN4QkksSUFBSSxFQUFFLE9BQU9lLEtBQUssS0FBSyxRQUFRLEdBQUcsUUFBUSxHQUFHLE1BQU87RUFDcERBLElBQUFBLEtBQUssRUFBRXVSLFVBQVc7RUFDbEIzTSxJQUFBQSxRQUFRLEVBQUVBLFFBQVM7RUFDbkJELElBQUFBLFFBQVEsRUFBR1MsS0FBSyxJQUFLVCxRQUFRLENBQUM5QixJQUFJLEVBQUVQLGVBQWUsQ0FBQzhDLEtBQUssQ0FBQ0MsTUFBTSxDQUFDckYsS0FBSyxFQUFFQSxLQUFLLENBQUM7RUFBRSxHQUNqRixDQUVBLENBQUM7RUFFVjtFQUVBLFNBQVM0UixXQUFXQSxDQUFDO0lBQUUzQixRQUFRO0lBQUVqUSxLQUFLO0lBQUU2QyxJQUFJO0lBQUU4QixRQUFRO0lBQUVnQixTQUFTO0lBQUVDLFlBQVk7RUFBRWhCLEVBQUFBO0VBQVMsQ0FBQyxFQUFFO0lBQzNGLE1BQU16RCxPQUFPLEdBQUdYLE1BQU0sQ0FBQ1csT0FBTyxDQUFDbkIsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDYyxNQUFNLENBQUMsQ0FBQyxDQUFDK1EsU0FBUyxDQUFDLEtBQUtBLFNBQVMsS0FBSyxJQUFJLENBQUM7SUFFdkYsb0JBQ0VsVCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFpQyxlQUM5Q0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBZSxlQUM1QkYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLElBQUEsRUFBQTtFQUFJQyxJQUFBQSxTQUFTLEVBQUM7S0FBc0IsRUFBRWEsT0FBTyxDQUFDdVEsUUFBUSxDQUFNLENBQUMsZUFDN0R0UixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztFQUFtQixHQUFBLEVBQy9Cc0MsT0FBTyxDQUFDckMsR0FBRyxDQUFDLENBQUMsQ0FBQytTLFNBQVMsRUFBRXpRLFdBQVcsQ0FBQyxrQkFDcEN6QyxzQkFBQSxDQUFBQyxhQUFBLENBQUNvSCxhQUFhLEVBQUE7RUFDWmhILElBQUFBLEdBQUcsRUFBRSxDQUFBLEVBQUdpUixRQUFRLENBQUEsQ0FBQSxFQUFJNEIsU0FBUyxDQUFBLENBQUc7RUFDaEM1QixJQUFBQSxRQUFRLEVBQUU0QixTQUFVO0VBQ3BCN1IsSUFBQUEsS0FBSyxFQUFFb0IsV0FBWTtFQUNuQnlCLElBQUFBLElBQUksRUFBRSxDQUFDLEdBQUdBLElBQUksRUFBRWdQLFNBQVMsQ0FBRTtFQUMzQmxOLElBQUFBLFFBQVEsRUFBRUEsUUFBUztFQUNuQmdCLElBQUFBLFNBQVMsRUFBRUEsU0FBVTtFQUNyQkMsSUFBQUEsWUFBWSxFQUFFQSxZQUFhO0VBQzNCaEIsSUFBQUEsUUFBUSxFQUFFQTtFQUFTLEdBQ3BCLENBQ0YsQ0FDRSxDQUNGLENBQ0YsQ0FBQztFQUVWO0VBRUEsU0FBU2MsVUFBVUEsQ0FBQztJQUFFdUssUUFBUTtJQUFFalEsS0FBSztJQUFFNkMsSUFBSTtJQUFFOEIsUUFBUTtJQUFFZ0IsU0FBUztJQUFFQyxZQUFZO0VBQUVoQixFQUFBQTtFQUFTLENBQUMsRUFBRTtFQUMxRixFQUFBLE1BQU0xRyxLQUFLLEdBQUd3QixPQUFPLENBQUN1USxRQUFRLENBQUM7RUFDL0IsRUFBQSxNQUFNNVAsTUFBTSxHQUFHTCxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtJQUU3QixvQkFDRXJCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQWlDLGVBQzlDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBO0VBQU9DLElBQUFBLFNBQVMsRUFBQztFQUFjLEdBQUEsRUFBRVgsS0FBYSxDQUFDLGVBQy9DUyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFtQixlQUNoQ0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7RUFBeUIsR0FBQSxlQUN0Q0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLGVBQ0VELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0VBQTBCLEdBQUEsRUFBRVgsS0FBVyxDQUFDLGVBQ3ZEUyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztFQUEwQixHQUFBLEVBQUVtQixLQUFLLENBQUNzQixNQUFNLEVBQUMsUUFBTSxFQUFDdEIsS0FBSyxDQUFDc0IsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBVyxDQUNqRyxDQUNGLENBQUMsRUFFTHRCLEtBQUssQ0FBQ2xCLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLEVBQUVxRSxLQUFLLGtCQUNyQnpFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxTQUFBLEVBQUE7RUFBU0ksSUFBQUEsR0FBRyxFQUFFLENBQUEsRUFBR2lSLFFBQVEsQ0FBQSxDQUFBLEVBQUk3TSxLQUFLLENBQUEsQ0FBRztFQUFDdkUsSUFBQUEsU0FBUyxFQUFDLHlCQUF5QjtNQUFDb0csSUFBSSxFQUFFN0IsS0FBSyxLQUFLO0tBQUUsZUFDMUZ6RSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsU0FBQSxFQUFBO0VBQVNDLElBQUFBLFNBQVMsRUFBQztLQUE0QixlQUM3Q0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBaUMsZUFDOUNGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTUMsSUFBQUEsU0FBUyxFQUFDO0VBQTJCLEdBQUEsRUFBQyxRQUFPLENBQUMsZUFDcERGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTUMsSUFBQUEsU0FBUyxFQUFDO0VBQXlCLEdBQUEsRUFBRXNSLFlBQVksQ0FBQ3BSLElBQUksRUFBRWIsS0FBSyxFQUFFa0YsS0FBSyxDQUFRLENBQy9FLENBQUMsZUFDTnpFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQTRCLGVBQ3pDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VDLElBQUFBLFNBQVMsRUFBQyxnQ0FBZ0M7RUFDMUNJLElBQUFBLElBQUksRUFBQyxRQUFRO0VBQ2IyRixJQUFBQSxRQUFRLEVBQUVBLFFBQVM7TUFDbkIxRixPQUFPLEVBQUdrRyxLQUFLLElBQUs7UUFDbEJBLEtBQUssQ0FBQ1UsY0FBYyxFQUFFO0VBQ3RCRixNQUFBQSxZQUFZLENBQUMsQ0FBQyxHQUFHL0MsSUFBSSxFQUFFTyxLQUFLLENBQUMsQ0FBQztFQUNoQyxJQUFBO0VBQUUsR0FBQSxFQUNILGNBRU8sQ0FBQyxlQUNUekUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQU0sY0FBUSxDQUNYLENBQ0UsQ0FBQyxlQUNWRCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztFQUF5QixHQUFBLEVBQ3JDOFEsYUFBYSxDQUFDNVEsSUFBSSxDQUFDLGdCQUNsQkosc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7RUFBbUIsR0FBQSxFQUMvQjJCLE1BQU0sQ0FBQ1csT0FBTyxDQUFDcEMsSUFBSSxDQUFDLENBQ2xCK0IsTUFBTSxDQUFDLENBQUMsQ0FBQytRLFNBQVMsQ0FBQyxLQUFLQSxTQUFTLEtBQUssSUFBSSxDQUFDLENBQzNDL1MsR0FBRyxDQUFDLENBQUMsQ0FBQytTLFNBQVMsRUFBRXpRLFdBQVcsQ0FBQyxrQkFDNUJ6QyxzQkFBQSxDQUFBQyxhQUFBLENBQUNvSCxhQUFhLEVBQUE7RUFDWmhILElBQUFBLEdBQUcsRUFBRSxDQUFBLEVBQUdpUixRQUFRLElBQUk3TSxLQUFLLENBQUEsQ0FBQSxFQUFJeU8sU0FBUyxDQUFBLENBQUc7RUFDekM1QixJQUFBQSxRQUFRLEVBQUU0QixTQUFVO0VBQ3BCN1IsSUFBQUEsS0FBSyxFQUFFb0IsV0FBWTtNQUNuQnlCLElBQUksRUFBRSxDQUFDLEdBQUdBLElBQUksRUFBRU8sS0FBSyxFQUFFeU8sU0FBUyxDQUFFO0VBQ2xDbE4sSUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQ25CZ0IsSUFBQUEsU0FBUyxFQUFFQSxTQUFVO0VBQ3JCQyxJQUFBQSxZQUFZLEVBQUVBLFlBQWE7RUFDM0JoQixJQUFBQSxRQUFRLEVBQUVBO0tBQ1gsQ0FDRixDQUNBLENBQUMsZ0JBRU5qRyxzQkFBQSxDQUFBQyxhQUFBLENBQUMyRyxjQUFjLEVBQUE7RUFDYjBLLElBQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUdBLFFBQVEsQ0FBQSxDQUFBLEVBQUk3TSxLQUFLLENBQUEsQ0FBRztFQUNqQ3BELElBQUFBLEtBQUssRUFBRWpCLElBQUs7RUFDWjhELElBQUFBLElBQUksRUFBRSxDQUFDLEdBQUdBLElBQUksRUFBRU8sS0FBSyxDQUFFO0VBQ3ZCdUIsSUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQ25CQyxJQUFBQSxRQUFRLEVBQUVBO0VBQVMsR0FDcEIsQ0FFQSxDQUNFLENBQ1YsQ0FBQyxlQUVGakcsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFQyxJQUFBQSxTQUFTLEVBQUMsd0JBQXdCO0VBQ2xDSSxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiMkYsSUFBQUEsUUFBUSxFQUFFQSxRQUFTO01BQ25CMUYsT0FBTyxFQUFFQSxNQUFNeUcsU0FBUyxDQUFDOUMsSUFBSSxFQUFFekMsWUFBWSxDQUFDQyxNQUFNLENBQUM7S0FBRSxFQUN0RCxnQkFFTyxDQUNMLENBQ0YsQ0FBQztFQUVWO0VBRUEsU0FBUzJGLGFBQWFBLENBQUM4TCxLQUFLLEVBQUU7SUFDNUIsTUFBTTtFQUFFOVIsSUFBQUE7RUFBTSxHQUFDLEdBQUc4UixLQUFLO0VBRXZCLEVBQUEsSUFBSXhSLEtBQUssQ0FBQ0MsT0FBTyxDQUFDUCxLQUFLLENBQUMsRUFBRTtFQUN4QixJQUFBLG9CQUFPckIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDOEcsVUFBVSxFQUFLb00sS0FBUSxDQUFDO0VBQ2xDLEVBQUE7RUFFQSxFQUFBLElBQUluQyxhQUFhLENBQUMzUCxLQUFLLENBQUMsRUFBRTtFQUN4QixJQUFBLG9CQUFPckIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDZ1QsV0FBVyxFQUFLRSxLQUFRLENBQUM7RUFDbkMsRUFBQTtFQUVBLEVBQUEsb0JBQU9uVCxzQkFBQSxDQUFBQyxhQUFBLENBQUMyRyxjQUFjLEVBQUt1TSxLQUFRLENBQUM7RUFDdEM7RUFFQSxTQUFTQyxXQUFXQSxDQUFDO0lBQUU1USxPQUFPO0lBQUV3RCxRQUFRO0lBQUVnQixTQUFTO0lBQUVDLFlBQVk7RUFBRWhCLEVBQUFBO0VBQVMsQ0FBQyxFQUFFO0lBQzdFLG9CQUNFakcsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBZ0IsZUFDN0JGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0VBQW1CLEdBQUEsRUFDL0JzQyxPQUFPLENBQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDbVIsUUFBUSxFQUFFalEsS0FBSyxDQUFDLGtCQUM3QnJCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ29ILGFBQWEsRUFBQTtFQUNaaEgsSUFBQUEsR0FBRyxFQUFFaVIsUUFBUztFQUNkQSxJQUFBQSxRQUFRLEVBQUVBLFFBQVM7RUFDbkJqUSxJQUFBQSxLQUFLLEVBQUVBLEtBQU07TUFDYjZDLElBQUksRUFBRSxDQUFDb04sUUFBUSxDQUFFO0VBQ2pCdEwsSUFBQUEsUUFBUSxFQUFFQSxRQUFTO0VBQ25CZ0IsSUFBQUEsU0FBUyxFQUFFQSxTQUFVO0VBQ3JCQyxJQUFBQSxZQUFZLEVBQUVBLFlBQWE7RUFDM0JoQixJQUFBQSxRQUFRLEVBQUVBO0tBQ1gsQ0FDRixDQUNFLENBQ0YsQ0FBQztFQUVWO0VBRWUsU0FBU29OLGlCQUFpQkEsR0FBRztJQUMxQyxNQUFNO0VBQUVwTyxJQUFBQTtLQUFVLEdBQUd5SCxxQkFBUyxFQUFFO0lBQ2hDLE1BQU0sQ0FBQy9FLE9BQU8sRUFBRW9GLFVBQVUsQ0FBQyxHQUFHdkUsY0FBUSxDQUFDLElBQUksQ0FBQztJQUM1QyxNQUFNLENBQUM0QyxNQUFNLEVBQUU4QixTQUFTLENBQUMsR0FBRzFFLGNBQVEsQ0FBQyxLQUFLLENBQUM7SUFDM0MsTUFBTSxDQUFDOEssU0FBUyxFQUFFQyxZQUFZLENBQUMsR0FBRy9LLGNBQVEsQ0FBQyxFQUFFLENBQUM7SUFDOUMsTUFBTSxDQUFDdUosT0FBTyxFQUFFeUIsVUFBVSxDQUFDLEdBQUdoTCxjQUFRLENBQUMsRUFBRSxDQUFDO0lBQzFDLE1BQU0sQ0FBQ2lMLGVBQWUsRUFBRUMsa0JBQWtCLENBQUMsR0FBR2xMLGNBQVEsQ0FBQyxFQUFFLENBQUM7SUFDMUQsTUFBTSxDQUFDbUwsZ0JBQWdCLEVBQUVDLG1CQUFtQixDQUFDLEdBQUdwTCxjQUFRLENBQUMsSUFBSSxDQUFDO0lBQzlELE1BQU0sQ0FBQzBDLFNBQVMsRUFBRXdDLFlBQVksQ0FBQyxHQUFHbEYsY0FBUSxDQUFDLE9BQU8sQ0FBQztJQUNuRCxNQUFNLENBQUM2QyxLQUFLLEVBQUVzQyxRQUFRLENBQUMsR0FBR25GLGNBQVEsQ0FBQyxFQUFFLENBQUM7SUFDdEMsTUFBTSxDQUFDMEQsUUFBUSxFQUFFQyxXQUFXLENBQUMsR0FBRzNELGNBQVEsQ0FBQyxLQUFLLENBQUM7RUFDL0MsRUFBQSxNQUFNcUUsU0FBUyxHQUFHQyxpQkFBUyxFQUFFO0VBQzdCLEVBQUEsTUFBTTdELE9BQU8sR0FBR0MsWUFBTSxDQUFDLElBQUksQ0FBQztJQUU1QixNQUFNMkssZ0JBQWdCLEdBQUcvSixhQUFPLENBQzlCLE1BQU9vQixTQUFTLEtBQUssV0FBVyxJQUFJeUksZ0JBQWdCLEdBQUdBLGdCQUFnQixHQUFHNUIsT0FBUSxFQUNsRixDQUFDN0csU0FBUyxFQUFFNkcsT0FBTyxFQUFFNEIsZ0JBQWdCLENBQ3ZDLENBQUM7RUFDRCxFQUFBLE1BQU0xSCxlQUFlLEdBQUdmLFNBQVMsS0FBSyxXQUFXLElBQUl5SSxnQkFBZ0I7RUFDckUsRUFBQSxNQUFNdEYsT0FBTyxHQUFHdkUsYUFBTyxDQUNyQixNQUFNeEksSUFBSSxDQUFDRSxTQUFTLENBQUNTLGlCQUFpQixDQUFDOFAsT0FBTyxDQUFDLENBQUMsS0FBS3pRLElBQUksQ0FBQ0UsU0FBUyxDQUFDUyxpQkFBaUIsQ0FBQ3dSLGVBQWUsQ0FBQyxDQUFDLEVBQ3ZHLENBQUMxQixPQUFPLEVBQUUwQixlQUFlLENBQzNCLENBQUM7RUFDRCxFQUFBLE1BQU1uRixlQUFlLEdBQUd4RSxhQUFPLENBQUMsTUFBTXhILGtCQUFrQixDQUFDeVAsT0FBTyxDQUFDLEVBQUUsQ0FBQ0EsT0FBTyxDQUFDLENBQUM7SUFDN0UsTUFBTW5HLE9BQU8sR0FBRyxDQUFDSyxlQUFlLElBQUksQ0FBQ2IsTUFBTSxJQUFJaUQsT0FBTztFQUN0RCxFQUFBLE1BQU14QyxVQUFVLEdBQUcsQ0FBQ0ksZUFBZSxJQUFJLENBQUNiLE1BQU0sS0FBS3VJLGdCQUFnQixHQUFHdEYsT0FBTyxHQUFHQyxlQUFlLENBQUM7SUFDaEcsTUFBTXhDLFVBQVUsR0FBRyxDQUFDVixNQUFNLElBQUksQ0FBQ2EsZUFBZSxJQUFJcUMsZUFBZTtJQUNqRSxNQUFNdkMsWUFBWSxHQUFHLENBQUNYLE1BQU0sSUFBSTFILE9BQU8sQ0FBQ2lRLGdCQUFnQixDQUFDO0VBQ3pELEVBQUEsTUFBTXpCLFFBQVEsR0FBR3BJLGFBQU8sQ0FBQyxNQUFNZ0ksYUFBYSxDQUFDN00sUUFBUSxFQUFFNE8sZ0JBQWdCLENBQUMsRUFBRSxDQUFDNU8sUUFBUSxFQUFFNE8sZ0JBQWdCLENBQUMsQ0FBQztFQUN2RyxFQUFBLE1BQU1DLFVBQVUsR0FBRy9DLGFBQWEsQ0FBQzlMLFFBQVEsQ0FBQyxHQUFHLENBQUEscUJBQUEsRUFBd0I4TCxhQUFhLENBQUM5TCxRQUFRLENBQUMsQ0FBQSxDQUFFLEdBQUcsSUFBSTtJQUNyRyxNQUFNOE8sVUFBVSxHQUFHakssYUFBTyxDQUFDLE1BQ3pCK0osZ0JBQWdCLEVBQUVHLFNBQVMsSUFDeEJILGdCQUFnQixFQUFFalUsS0FBSyxJQUN2QmlVLGdCQUFnQixFQUFFSSxRQUFRLElBQzFCWCxTQUNKLEVBQUUsQ0FBQ08sZ0JBQWdCLEVBQUVQLFNBQVMsQ0FBQyxDQUFDO0VBRWpDbkssRUFBQUEsZUFBUyxDQUFDLE1BQU07TUFDZCxJQUFJK0ssU0FBUyxHQUFHLElBQUk7RUFFcEIsSUFBQSxNQUFNQyxRQUFRLEdBQUcsWUFBWTtRQUMzQnBILFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDaEJZLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFFWixJQUFJO0VBQ0YsUUFBQSxNQUFNdkksUUFBUSxHQUFHLE1BQU1vTCxHQUFHLENBQUM0RCxPQUFPLENBQUM7RUFBRW5QLFVBQUFBO0VBQVMsU0FBQyxDQUFDO1VBRWhELElBQUksQ0FBQ2lQLFNBQVMsRUFBRTtFQUNkLFVBQUE7RUFDRixRQUFBO0VBRUEsUUFBQSxNQUFNRyxnQkFBZ0IsR0FBR2pULFVBQVUsQ0FBQ2dFLFFBQVEsQ0FBQ2tQLElBQUksQ0FBQ0MsU0FBUyxJQUFJblAsUUFBUSxDQUFDa1AsSUFBSSxDQUFDQSxJQUFJLElBQUksRUFBRSxDQUFDO1VBQ3hGZCxVQUFVLENBQUNhLGdCQUFnQixDQUFDO0VBQzVCWCxRQUFBQSxrQkFBa0IsQ0FBQ3RTLFVBQVUsQ0FBQ2lULGdCQUFnQixDQUFDLENBQUM7RUFDaERULFFBQUFBLG1CQUFtQixDQUFDeE8sUUFBUSxDQUFDa1AsSUFBSSxDQUFDRSxhQUFhLEdBQUdwVCxVQUFVLENBQUNnRSxRQUFRLENBQUNrUCxJQUFJLENBQUNFLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztVQUNqRzlHLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFDckJ2QixXQUFXLENBQUMsS0FBSyxDQUFDO1VBQ2xCb0gsWUFBWSxDQUFDbk8sUUFBUSxDQUFDa1AsSUFBSSxDQUFDL1UsS0FBSyxJQUFJd0IsT0FBTyxDQUFDa0UsUUFBUSxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLE9BQU80SixTQUFTLEVBQUU7VUFDbEIsSUFBSSxDQUFDcUYsU0FBUyxFQUFFO0VBQ2QsVUFBQTtFQUNGLFFBQUE7VUFFQXZHLFFBQVEsQ0FBQ2tCLFNBQVMsRUFBRXpKLFFBQVEsRUFBRWtQLElBQUksRUFBRXhPLE9BQU8sSUFBSSxtQ0FBbUMsQ0FBQztFQUNyRixNQUFBLENBQUMsU0FBUztFQUNSLFFBQUEsSUFBSW9PLFNBQVMsRUFBRTtZQUNibkgsVUFBVSxDQUFDLEtBQUssQ0FBQztFQUNuQixRQUFBO0VBQ0YsTUFBQTtNQUNGLENBQUM7RUFFRG9ILElBQUFBLFFBQVEsRUFBRTtFQUVWLElBQUEsT0FBTyxNQUFNO0VBQ1hELE1BQUFBLFNBQVMsR0FBRyxLQUFLO01BQ25CLENBQUM7RUFDSCxFQUFBLENBQUMsRUFBRSxDQUFDalAsUUFBUSxDQUFDLENBQUM7RUFFZGtFLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO01BQ2QsSUFBSSxDQUFDK0MsUUFBUSxFQUFFO0VBQ2IsTUFBQSxPQUFPaEosU0FBUztFQUNsQixJQUFBO01BRUEsTUFBTXFHLGlCQUFpQixHQUFJOUMsS0FBSyxJQUFLO0VBQ25DLE1BQUEsSUFBSXdDLE9BQU8sQ0FBQ08sT0FBTyxJQUFJLENBQUNQLE9BQU8sQ0FBQ08sT0FBTyxDQUFDQyxRQUFRLENBQUNoRCxLQUFLLENBQUNDLE1BQU0sQ0FBQyxFQUFFO1VBQzlEeUYsV0FBVyxDQUFDLEtBQUssQ0FBQztFQUNwQixNQUFBO01BQ0YsQ0FBQztFQUVEekMsSUFBQUEsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUVKLGlCQUFpQixDQUFDO0VBQ3pELElBQUEsT0FBTyxNQUFNO0VBQ1hHLE1BQUFBLFFBQVEsQ0FBQ0UsbUJBQW1CLENBQUMsV0FBVyxFQUFFTCxpQkFBaUIsQ0FBQztNQUM5RCxDQUFDO0VBQ0gsRUFBQSxDQUFDLEVBQUUsQ0FBQzJDLFFBQVEsQ0FBQyxDQUFDO0VBRWQsRUFBQSxNQUFNK0MsWUFBWSxHQUFHQSxDQUFDL0ssSUFBSSxFQUFFQyxTQUFTLEtBQUs7TUFDeENxUCxVQUFVLENBQUUzUCxZQUFZLElBQUtJLFlBQVksQ0FBQ0osWUFBWSxFQUFFSyxJQUFJLEVBQUVDLFNBQVMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7RUFFRCxFQUFBLE1BQU0rSyxhQUFhLEdBQUdBLENBQUNoTCxJQUFJLEVBQUVTLFFBQVEsS0FBSztNQUN4QzZPLFVBQVUsQ0FBRTNQLFlBQVksSUFBS2EsWUFBWSxDQUFDYixZQUFZLEVBQUVLLElBQUksRUFBRVMsUUFBUSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELE1BQU13SyxnQkFBZ0IsR0FBSWpMLElBQUksSUFBSztNQUNqQ3NQLFVBQVUsQ0FBRTNQLFlBQVksSUFBS1UsWUFBWSxDQUFDVixZQUFZLEVBQUVLLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7RUFFRCxFQUFBLE1BQU11USxVQUFVLEdBQUcsT0FBT3BGLE1BQU0sR0FBRyxNQUFNLEtBQUs7TUFDNUNuQyxTQUFTLENBQUMsSUFBSSxDQUFDO01BQ2ZTLFFBQVEsQ0FBQyxFQUFFLENBQUM7TUFDWnhCLFdBQVcsQ0FBQyxLQUFLLENBQUM7TUFFbEIsSUFBSTtFQUNGLE1BQUEsTUFBTS9HLFFBQVEsR0FBRyxNQUFNb0wsR0FBRyxDQUFDNEQsT0FBTyxDQUFDO1VBQ2pDblAsUUFBUTtFQUNSSyxRQUFBQSxNQUFNLEVBQUUsTUFBTTtFQUNkZ1AsUUFBQUEsSUFBSSxFQUFFO1lBQUV2QyxPQUFPO0VBQUUxQyxVQUFBQTtFQUFPO0VBQzFCLE9BQUMsQ0FBQztFQUVGLE1BQUEsTUFBTWdGLGdCQUFnQixHQUFHalQsVUFBVSxDQUFDZ0UsUUFBUSxDQUFDa1AsSUFBSSxDQUFDQyxTQUFTLElBQUluUCxRQUFRLENBQUNrUCxJQUFJLENBQUNBLElBQUksSUFBSSxFQUFFLENBQUM7UUFDeEZkLFVBQVUsQ0FBQ2EsZ0JBQWdCLENBQUM7RUFDNUJYLE1BQUFBLGtCQUFrQixDQUFDdFMsVUFBVSxDQUFDaVQsZ0JBQWdCLENBQUMsQ0FBQztFQUNoRFQsTUFBQUEsbUJBQW1CLENBQUN4TyxRQUFRLENBQUNrUCxJQUFJLENBQUNFLGFBQWEsR0FBR3BULFVBQVUsQ0FBQ2dFLFFBQVEsQ0FBQ2tQLElBQUksQ0FBQ0UsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2pHLElBQUluRixNQUFNLEtBQUssV0FBVyxFQUFFO1VBQzFCM0IsWUFBWSxDQUFDLE9BQU8sQ0FBQztFQUN2QixNQUFBO0VBQ0FiLE1BQUFBLFNBQVMsQ0FBQztVQUNSL0csT0FBTyxFQUFFVixRQUFRLENBQUNrUCxJQUFJLENBQUNoRixNQUFNLEVBQUV4SixPQUFPLElBQUksQ0FBQSxFQUFHd04sU0FBUyxDQUFBLE9BQUEsQ0FBUztFQUMvRGhULFFBQUFBLElBQUksRUFBRTtFQUNSLE9BQUMsQ0FBQztNQUNKLENBQUMsQ0FBQyxPQUFPb1UsU0FBUyxFQUFFO1FBQ2xCLE1BQU01TyxPQUFPLEdBQUc0TyxTQUFTLEVBQUV0UCxRQUFRLEVBQUVrUCxJQUFJLEVBQUV4TyxPQUFPLElBQUksbUNBQW1DO1FBQ3pGNkgsUUFBUSxDQUFDN0gsT0FBTyxDQUFDO0VBQ2pCK0csTUFBQUEsU0FBUyxDQUFDO1VBQUUvRyxPQUFPO0VBQUV4RixRQUFBQSxJQUFJLEVBQUU7RUFBUSxPQUFDLENBQUM7RUFDdkMsSUFBQSxDQUFDLFNBQVM7UUFDUjRNLFNBQVMsQ0FBQyxLQUFLLENBQUM7RUFDbEIsSUFBQTtJQUNGLENBQUM7SUFFRCxNQUFNdUMsb0JBQW9CLEdBQUdBLE1BQU07RUFDakMrRCxJQUFBQSxVQUFVLENBQUMvUixZQUFZLENBQUNzUSxPQUFPLENBQUMsQ0FBQztNQUNqQ3JFLFlBQVksQ0FBQyxPQUFPLENBQUM7TUFDckJ2QixXQUFXLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7RUFFRCxFQUFBLElBQUl4RSxPQUFPLEVBQUU7TUFDWCxvQkFDRTNILHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS2lLLE1BQUFBLEtBQUssRUFBRTtFQUFFMkYsUUFBQUEsT0FBTyxFQUFFLE1BQU07RUFBRUMsUUFBQUEsY0FBYyxFQUFFLFFBQVE7RUFBRUMsUUFBQUEsVUFBVSxFQUFFLFFBQVE7RUFBRUMsUUFBQUEsTUFBTSxFQUFFO0VBQU87RUFBRSxLQUFBLGVBQzlGaFEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDZ1EsbUJBQU0sRUFBQSxJQUFFLENBQ04sQ0FBQztFQUVWLEVBQUE7RUFFQSxFQUFBLG9CQUNFalEsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBRCxzQkFBQSxDQUFBVSxRQUFBLEVBQUEsSUFBQSxlQUNFVixzQkFBQSxDQUFBQyxhQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFBUVAsUUFBYyxDQUFDLGVBQ3ZCTSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFlLGVBQzVCRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFzQixlQUNuQ0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUFRQyxJQUFBQSxTQUFTLEVBQUMsYUFBYTtFQUFDSSxJQUFBQSxJQUFJLEVBQUMsUUFBUTtNQUFDQyxPQUFPLEVBQUVBLE1BQU04RixNQUFNLENBQUNzTyxPQUFPLENBQUNDLElBQUk7RUFBRyxHQUFBLEVBQUMsYUFFNUUsQ0FBQyxlQUVUNVUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7RUFBZSxHQUFBLGVBQzVCRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBLElBQUEsZUFDRUQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7RUFBYSxHQUFBLEVBQUMsYUFBZ0IsQ0FBQyxlQUM5Q0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLElBQUEsRUFBQTtFQUFJQyxJQUFBQSxTQUFTLEVBQUM7RUFBYyxHQUFBLEVBQUU2VCxVQUFlLENBQUMsZUFDaEQvVCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFlLEVBQUV5VCxnQkFBZ0IsR0FBRyxXQUFXLEdBQUcsT0FBYSxDQUMzRSxDQUFDLGVBRUozVCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQVFDLElBQUFBLFNBQVMsRUFBQyxjQUFjO0VBQUNJLElBQUFBLElBQUksRUFBQztFQUFRLEdBQUEsRUFBQyxRQUFTLENBQ3JELENBQUMsZUFFTk4sc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBYSxlQUMxQkYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtNQUFRQyxTQUFTLEVBQUUsYUFBYWdMLFNBQVMsS0FBSyxPQUFPLEdBQUcscUJBQXFCLEdBQUcsRUFBRSxDQUFBLENBQUc7RUFBQzVLLElBQUFBLElBQUksRUFBQyxRQUFRO0VBQUNDLElBQUFBLE9BQU8sRUFBRUEsTUFBTW1OLFlBQVksQ0FBQyxPQUFPO0VBQUUsR0FBQSxFQUFDLE9BRWxJLENBQUMsZUFDVDFOLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7TUFDRUMsU0FBUyxFQUFFLGFBQWFnTCxTQUFTLEtBQUssV0FBVyxHQUFHLHFCQUFxQixHQUFHLEVBQUUsQ0FBQSxDQUFHO0VBQ2pGNUssSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYkMsSUFBQUEsT0FBTyxFQUFFQSxNQUFNb1QsZ0JBQWdCLElBQUlqRyxZQUFZLENBQUMsV0FBVztLQUFFLEVBQzlELFdBRU8sQ0FDTCxDQUFDLEVBRUxyQyxLQUFLLGdCQUFHckwsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDb00sdUJBQVUsRUFBQTtFQUFDQyxJQUFBQSxPQUFPLEVBQUM7RUFBUSxHQUFBLEVBQUVqQixLQUFrQixDQUFDLEdBQUcsSUFBSSxlQUVqRXJMLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQWUsZUFDNUJGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0VBQWtCLEdBQUEsRUFDOUJnUyxRQUFRLENBQUMvUixHQUFHLENBQUMsQ0FBQ2dTLE9BQU8sRUFBRTFOLEtBQUssa0JBQzNCekUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDbVQsV0FBVyxFQUFBO01BQ1YvUyxHQUFHLEVBQUUsQ0FBQSxRQUFBLEVBQVdvRSxLQUFLLENBQUEsQ0FBRztNQUN4QmpDLE9BQU8sRUFBRTJQLE9BQU8sQ0FBQzNQLE9BQVE7RUFDekJ3RCxJQUFBQSxRQUFRLEVBQUVpSixZQUFhO0VBQ3ZCakksSUFBQUEsU0FBUyxFQUFFa0ksYUFBYztFQUN6QmpJLElBQUFBLFlBQVksRUFBRWtJLGdCQUFpQjtFQUMvQmxKLElBQUFBLFFBQVEsRUFBRWdHO0tBQ1gsQ0FDRixDQUNFLENBQUMsZUFFTmpNLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxlQUNFRCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUFrQixlQUMvQkYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7RUFBd0IsR0FBQSxFQUFDLE9BQVUsQ0FBQyxlQUNuREYsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLQyxJQUFBQSxTQUFTLEVBQUM7S0FBd0IsZUFDckNGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQXdCLGVBQ3JDRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQVFDLElBQUFBLFNBQVMsRUFBQywrQkFBK0I7RUFBQ0ksSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFBQ0MsSUFBQUEsT0FBTyxFQUFFQSxNQUFNa1UsVUFBVSxDQUFDLFNBQVMsQ0FBRTtFQUFDeE8sSUFBQUEsUUFBUSxFQUFFLENBQUM0RjtFQUFXLEdBQUEsRUFBQyxTQUVySCxDQUFDLGVBQ1Q3TCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsUUFBQSxFQUFBO0VBQ0VDLElBQUFBLFNBQVMsRUFBQyx3REFBd0Q7RUFDbEVJLElBQUFBLElBQUksRUFBQyxRQUFRO01BQ2JDLE9BQU8sRUFBRUEsTUFBTTRMLFdBQVcsQ0FBRTNDLE9BQU8sSUFBSyxDQUFDQSxPQUFPO0VBQUUsR0FBQSxFQUNuRCxRQUVPLENBQUMsRUFDUjBDLFFBQVEsZ0JBQ1BsTSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUs4SyxJQUFBQSxHQUFHLEVBQUU5QixPQUFRO0VBQUMvSSxJQUFBQSxTQUFTLEVBQUM7S0FBeUIsZUFDcERGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFDRUMsSUFBQUEsU0FBUyxFQUFDLHFFQUFxRTtFQUMvRUksSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYkMsSUFBQUEsT0FBTyxFQUFFQSxNQUFNa1UsVUFBVSxDQUFDLFdBQVcsQ0FBRTtFQUN2Q3hPLElBQUFBLFFBQVEsRUFBRSxDQUFDOEY7S0FBYSxlQUV4Qi9MLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxNQUFBLEVBQUE7RUFBTUMsSUFBQUEsU0FBUyxFQUFDO0VBQStCLEdBQUEsRUFBQyxNQUFPLENBQUMsRUFBQSxXQUVsRCxDQUFDLGVBQ1RGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFDRUMsSUFBQUEsU0FBUyxFQUFDLHFFQUFxRTtFQUMvRUksSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYkMsSUFBQUEsT0FBTyxFQUFFa1Asb0JBQXFCO0VBQzlCeEosSUFBQUEsUUFBUSxFQUFFLENBQUM2RjtLQUFXLGVBRXRCOUwsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNQyxJQUFBQSxTQUFTLEVBQUM7S0FBK0IsRUFBQyxNQUFPLENBQUMsRUFBQSxpQkFFbEQsQ0FDTCxDQUFDLEdBQ0osSUFDRCxDQUFDLGVBQ05GLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxRQUFBLEVBQUE7RUFBUUMsSUFBQUEsU0FBUyxFQUFDLG9CQUFvQjtFQUFDSSxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUFDQyxJQUFBQSxPQUFPLEVBQUVBLE1BQU1rVSxVQUFVLENBQUMsTUFBTSxDQUFFO0VBQUN4TyxJQUFBQSxRQUFRLEVBQUUsQ0FBQzJGO0tBQVEsRUFDeEdSLE1BQU0sR0FBRyxXQUFXLEdBQUcsTUFDbEIsQ0FDTCxDQUNGLENBQUMsZUFFTnBMLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsU0FBUyxFQUFDO0tBQWtCLGVBQy9CRixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztFQUF3QixHQUFBLEVBQUMsU0FBWSxDQUFDLGVBQ3JERixzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0VBQUtDLElBQUFBLFNBQVMsRUFBQztLQUF3QixlQUNyQ0Ysc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLFFBQUEsRUFBQTtFQUNFQyxJQUFBQSxTQUFTLEVBQUMsMkRBQTJEO0VBQ3JFSSxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiQyxJQUFBQSxPQUFPLEVBQUVBLE1BQU11VCxVQUFVLElBQUl6TixNQUFNLENBQUNDLElBQUksQ0FBQ3dOLFVBQVUsRUFBRSxRQUFRLEVBQUUscUJBQXFCLENBQUU7RUFDdEY3TixJQUFBQSxRQUFRLEVBQUUsQ0FBQzZOO0tBQVcsRUFDdkIsY0FFTyxDQUNMLENBQ0YsQ0FDQSxDQUNKLENBQ0YsQ0FDRixDQUNMLENBQUM7RUFFUDs7RUN6M0NBLE1BQU1wVSxRQUFNLEdBQUc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFBLEVBQTZCQSxhQUFhLENBQUE7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0VBRUQsU0FBU0UsaUJBQWlCQSxDQUFDN1gsS0FBSyxFQUFFbUksTUFBTSxFQUFFO0lBQ3hDLElBQUksQ0FBQ0EsTUFBTSxFQUFFO0VBQ1gsSUFBQSxPQUFPLElBQUk7RUFDYixFQUFBO0VBRUEsRUFBQSxPQUFP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
