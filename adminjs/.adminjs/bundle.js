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
  function Dashboard() {
    const navigate = reactRouter.useNavigate();
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$4), /*#__PURE__*/React__default.default.createElement("div", {
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
    }, "This AdminJS workspace is the active content source for the frontend and backend."))), /*#__PURE__*/React__default.default.createElement(ShortcutList, {
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
.admin-toggle {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .625rem .875rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
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
    }, urls[0].split('/').pop())) : /*#__PURE__*/React__default.default.createElement("div", null, "No media selected.")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__source"
    }, Array.isArray(value) ? /*#__PURE__*/React__default.default.createElement("textarea", {
      className: "admin-textarea",
      value: value.join('\n'),
      disabled: disabled || uploading,
      onChange: event => onChange(path, event.target.value.split('\n').map(item => item.trim()).filter(Boolean)),
      placeholder: "One image URL per line"
    }) : /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-input",
      value: value ?? '',
      disabled: disabled || uploading,
      onChange: event => onChange(path, event.target.value),
      placeholder: "https://..."
    }), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media__source-actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media__upload-button",
      type: "button",
      disabled: disabled || uploading,
      onClick: () => fileInputRef.current?.click()
    }, uploading ? 'Uploading...' : 'Upload from computer'), /*#__PURE__*/React__default.default.createElement("input", {
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
        className: "admin-field admin-field--full"
      }, /*#__PURE__*/React__default.default.createElement("label", {
        className: "admin-label"
      }, label), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-toggle"
      }, /*#__PURE__*/React__default.default.createElement("span", null, value ? 'Enabled' : 'Disabled'), /*#__PURE__*/React__default.default.createElement("input", {
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
    }, typeof item === 'string' ? item || `${label} ${index + 1}` : item?.text || `${label} ${index + 1}`)), /*#__PURE__*/React__default.default.createElement("div", {
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
    }, /*#__PURE__*/React__default.default.createElement("label", {
      className: "admin-label"
    }, label === 'Tags' ? 'Text' : label.slice(0, -1) || label), /*#__PURE__*/React__default.default.createElement("input", {
      className: "admin-input",
      value: typeof item === 'string' ? item : item?.text ?? '',
      disabled: disabled,
      onChange: event => onChange([...path, index], {
        text: event.target.value
      })
    })))))), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-repeatable__add",
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
    }, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$3), /*#__PURE__*/React__default.default.createElement("div", {
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
    }, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$3), /*#__PURE__*/React__default.default.createElement("div", {
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
    }, publishedRecord ? 'Published' : displayedRecord.status || 'Draft')), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-kebab",
      type: "button"
    }, "\u2026")), /*#__PURE__*/React__default.default.createElement("div", {
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
  const FULL_WIDTH_FIELD_PATTERN = /(description|content|message|body|subtitle|excerpt|intro|overview|challenge|result|background|image|gallery|sections|testimonials|services|whyChooseItems|featureChips|socialLinks|faqItems|comparisonRows|comparisonColumns|storyParagraphs|relatedWorkspaces|challengeItems|amenities|navigation|footer|form)/i;
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
  const STYLES$2 = `
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
  function isRequiredField(fieldKey) {
    return REQUIRED_FIELD_PATTERN.test(fieldKey);
  }
  function fieldClassName(fieldKey, value) {
    return FULL_WIDTH_FIELD_PATTERN.test(fieldKey) || typeof value === 'boolean' ? 'admin-field admin-field--full' : 'admin-field';
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
        onClick: () => {
          const nextValue = window.prompt(`Update ${label} URL`, inputValue);
          if (nextValue !== null) {
            onChange(path, nextValue);
          }
        }
      }, "\u270E"), /*#__PURE__*/React__default.default.createElement("button", {
        className: "admin-media__action",
        type: "button",
        disabled: disabled,
        onClick: () => onChange(path, '')
      }, "\u2715")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__filename"
      }, getFilename(inputValue))) : /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__empty"
      }, "Paste an image URL below to attach media.")), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__source"
      }, /*#__PURE__*/React__default.default.createElement("input", {
        className: "admin-input",
        type: "text",
        value: inputValue,
        disabled: disabled || uploading,
        onChange: event => onChange(path, event.target.value),
        placeholder: "https://..."
      }), /*#__PURE__*/React__default.default.createElement("div", {
        className: "admin-media__source-actions"
      }, /*#__PURE__*/React__default.default.createElement("button", {
        className: "admin-media__upload-button",
        type: "button",
        disabled: disabled || uploading,
        onClick: () => fileInputRef.current?.click()
      }, uploading ? 'Uploading...' : 'Upload from computer'), /*#__PURE__*/React__default.default.createElement("input", {
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
    }, "*") : null), MULTILINE_FIELD_PATTERN.test(fieldKey) ? /*#__PURE__*/React__default.default.createElement("textarea", {
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
    const entries = Object.entries(value ?? {}).filter(([nestedKey]) => nestedKey !== 'id');
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
    }, Object.entries(item).filter(([nestedKey]) => nestedKey !== 'id').map(([nestedKey, nestedValue]) => /*#__PURE__*/React__default.default.createElement(FieldRenderer, {
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
    }, entries.map(([fieldKey, value]) => /*#__PURE__*/React__default.default.createElement(FieldRenderer, {
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
    const canSave = !isPublishedView && !saving && isDirty;
    const canPublish = !isPublishedView && !saving && (publishedContent ? isDirty : hasDraftContent);
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
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("style", null, STYLES$2), /*#__PURE__*/React__default.default.createElement("div", {
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
    }, publishedContent ? 'Published' : 'Draft')), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-kebab",
      type: "button"
    }, "\u2026")), /*#__PURE__*/React__default.default.createElement("div", {
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

  const STYLES$1 = `
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
    onOpen
  }) {
    return /*#__PURE__*/React__default.default.createElement("article", {
      className: "admin-asset-card",
      onClick: () => onOpen(item.id)
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-asset-card__preview"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-asset-card__checkbox"
    }), /*#__PURE__*/React__default.default.createElement("img", {
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
    }, item.ext.replace('.', '').toUpperCase(), " - ", item.width, "\xD7", item.height)));
  }
  function DetailView({
    item,
    onBack
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
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media-page__button",
      type: "button",
      onClick: () => navigator.clipboard?.writeText(item.url || '')
    }, "Copy URL"), /*#__PURE__*/React__default.default.createElement("button", {
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
      className: "admin-media-page"
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__inner"
    }, error ? /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      variant: "danger"
    }, error) : null, fileId && item ? /*#__PURE__*/React__default.default.createElement(DetailView, {
      item: item,
      onBack: () => openList()
    }) : /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__top"
    }, /*#__PURE__*/React__default.default.createElement("h1", {
      className: "admin-media-page__title"
    }, "Media Library"), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__actions"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media-page__button",
      type: "button"
    }, "+ Add new folder"), /*#__PURE__*/React__default.default.createElement("button", {
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
    }, /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__square"
    }), /*#__PURE__*/React__default.default.createElement("select", {
      className: "admin-media-page__select",
      defaultValue: "recent"
    }, /*#__PURE__*/React__default.default.createElement("option", {
      value: "recent"
    }, "Most recent uploads")), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media-page__button",
      type: "button"
    }, "Filters")), /*#__PURE__*/React__default.default.createElement("div", {
      className: "admin-media-page__toolbar-right"
    }, /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media-page__icon-button",
      type: "button"
    }, "\u2699"), /*#__PURE__*/React__default.default.createElement("button", {
      className: "admin-media-page__icon-button",
      type: "button"
    }, "\u2630"), /*#__PURE__*/React__default.default.createElement("input", {
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
      className: "admin-avatar"
    }, initial)), showPanel ? /*#__PURE__*/React__default.default.createElement("div", {
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
  AdminJS.UserComponents.Sidebar = Sidebar;
  AdminJS.UserComponents.Login = Login;
  AdminJS.UserComponents.TopBar = TopBar;

})(React, ReactRouter, AdminJSDesignSystem, AdminJS, ReactRedux);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbk1hbmFnZXIuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3IuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5LmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL1NpZGViYXIuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvTG9naW4uanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvVG9wQmFyLmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cbmNvbnN0IFBSSU1BUllfUEFHRVMgPSBbXG4gIHsgbGFiZWw6ICdIb21lcGFnZScsIGhyZWY6ICcvYWRtaW4vcGFnZXMvaG9tZXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdBYm91dCBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9hYm91dC1wYWdlJyB9LFxuICB7IGxhYmVsOiAnUHJpY2luZyBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9wcmljaW5nLXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdDb250YWN0IFBhZ2UnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2NvbnRhY3QtcGFnZScgfSxcbl07XG5cbmNvbnN0IENPTExFQ1RJT05TID0gW1xuICB7IGxhYmVsOiAnQmxvZyBQb3N0cycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvYmxvZy1wb3N0cycgfSxcbiAgeyBsYWJlbDogJ0ZBUSBJdGVtcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvZmFxLWl0ZW1zJyB9LFxuICB7IGxhYmVsOiAnTWVldGluZyBSb29tcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvbWVldGluZy1yb29tcycgfSxcbiAgeyBsYWJlbDogJ1ByaWNpbmcgUGxhbnMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL3ByaWNpbmctcGxhbnMnIH0sXG5dO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tZGFzaGJvYXJkIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMzJweCA0MHB4IDY0cHggMzQ0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pbm5lciB7XG4gIG1heC13aWR0aDogMTI0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZXllYnJvdyB7XG4gIG1hcmdpbjogMCAwIDRweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19zdWJ0aXRsZSB7XG4gIG1hcmdpbjogMTBweCAwIDI4cHg7XG4gIG1heC13aWR0aDogNzgwcHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2dyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxLjFmcikgbWlubWF4KDAsIDAuOWZyKTtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fY2FyZC1oZWFkIHtcbiAgcGFkZGluZzogMTZweCAyMHB4IDEycHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2NhcmQtYm9keSB7XG4gIHBhZGRpbmc6IDhweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9faXRlbS1jb3B5IHtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLW1ldGEge1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGNvbG9yOiAjNjY2Njg3O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLWFycm93IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbm90aWNlIHtcbiAgcGFkZGluZzogMjBweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbm90aWNlLXRpdGxlIHtcbiAgbWFyZ2luOiAwIDAgOHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX25vdGljZS1jb3B5IHtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1kYXNoYm9hcmQge1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0OHB4O1xuICB9XG5cbiAgLmFkbWluLWRhc2hib2FyZF9fZ3JpZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIFNob3J0Y3V0TGlzdCh7IHRpdGxlLCBpdGVtcywgbmF2aWdhdGUsIG1ldGEgfSkge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtaGVhZFwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlXCI+e3RpdGxlfTwvaDI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2xpc3RcIj5cbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17aXRlbS5ocmVmfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW1cIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW0tY29weVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pdGVtLWxhYmVsXCI+e2l0ZW0ubGFiZWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW0tbWV0YVwiPnttZXRhfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pdGVtLWFycm93XCI+4oaSPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXNoYm9hcmQoKSB7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2lubmVyXCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19leWVicm93XCI+SG9tZTwvcD5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX190aXRsZVwiPkNvbnRlbnQgTWFuYWdlcjwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19zdWJ0aXRsZVwiPlxuICAgICAgICAgICAgVXNlIHRoZSBzaG9ydGN1dHMgYmVsb3cgdG8ganVtcCBpbnRvIHNpbmdsZSBwYWdlcyBhbmQgY29sbGVjdGlvbiBjb250ZW50IGZvciB0aGUgbGl2ZSBzaXRlLlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19ncmlkXCI+XG4gICAgICAgICAgICA8U2hvcnRjdXRMaXN0XG4gICAgICAgICAgICAgIHRpdGxlPVwiU2luZ2xlIFR5cGVzXCJcbiAgICAgICAgICAgICAgaXRlbXM9e1BSSU1BUllfUEFHRVN9XG4gICAgICAgICAgICAgIG5hdmlnYXRlPXtuYXZpZ2F0ZX1cbiAgICAgICAgICAgICAgbWV0YT1cIkVkaXQgc3RydWN0dXJlZCBwYWdlIGNvbnRlbnRcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLWhlYWRcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlXCI+V29ya3NwYWNlPC9oMj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19ub3RpY2VcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19ub3RpY2UtdGl0bGVcIj5Qcm9kdWN0aW9uIGNvbnRlbnQgd29ya3NwYWNlPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX25vdGljZS1jb3B5XCI+XG4gICAgICAgICAgICAgICAgICBUaGlzIEFkbWluSlMgd29ya3NwYWNlIGlzIHRoZSBhY3RpdmUgY29udGVudCBzb3VyY2UgZm9yIHRoZSBmcm9udGVuZCBhbmQgYmFja2VuZC5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgICAgICA8U2hvcnRjdXRMaXN0XG4gICAgICAgICAgICAgIHRpdGxlPVwiQ29sbGVjdGlvbnNcIlxuICAgICAgICAgICAgICBpdGVtcz17Q09MTEVDVElPTlN9XG4gICAgICAgICAgICAgIG5hdmlnYXRlPXtuYXZpZ2F0ZX1cbiAgICAgICAgICAgICAgbWV0YT1cIk1hbmFnZSByZXBlYXRhYmxlIGNvbnRlbnRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiwgdXNlTmF2aWdhdGUsIHVzZVBhcmFtcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBMb2FkZXIsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBNVUxUSUxJTkVfRklFTERfUEFUVEVSTiA9IC8oZGVzY3JpcHRpb258Y29udGVudHxtZXNzYWdlfGJvZHl8c3VidGl0bGV8ZXhjZXJwdHxpbnRyb3xob3Vyc3xhZGRyZXNzfHRleHR8cGFyYWdyYXBofG92ZXJ2aWV3fGNoYWxsZW5nZXxyZXN1bHR8YW5zd2VyKS9pO1xuY29uc3QgSU1BR0VfRklFTERfUEFUVEVSTiA9IC8oaW1hZ2V8Y292ZXJJbWFnZXxjb250ZW50SW1hZ2VzKS9pO1xuY29uc3QgQk9PTEVBTl9GSUVMRF9QQVRURVJOID0gL14oZmVhdHVyZWR8aXNGZWF0dXJlZHxpc1BvcHVsYXIpJC9pO1xuY29uc3QgRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fGFuc3dlcnxleGNlcnB0fGNvbnRlbnRJbWFnZXN8Y292ZXJJbWFnZXxpbWFnZXxmZWF0dXJlc3xiYWRnZXN8dGFncykkL2k7XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5hZG1pbi1lZGl0b3Ige1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAzMnB4IDQwcHggNjRweCAzNDRweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG4uYWRtaW4tZWRpdG9yX19pbm5lciB7XG4gIG1heC13aWR0aDogMTI0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cbi5hZG1pbi1iYWNrIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAuODc1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XG59XG4uYWRtaW4taGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuLmFkbWluLW1ldGEge1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi10aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAyLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMi43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi1zdGF0dXMge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogMnJlbTtcbiAgcGFkZGluZzogMCAuNzVyZW07XG4gIG1hcmdpbi10b3A6IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjNmYwYzI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2VmZmZlZDtcbiAgY29sb3I6ICMyZjY4NDY7XG4gIGZvbnQtc2l6ZTogLjgxMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4ta2ViYWIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG4uYWRtaW4tdGFicyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYWVhZWY7XG59XG4uYWRtaW4tdGFiIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAwIDAgMTJweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmFkbWluLXRhYi0tYWN0aXZlIHsgY29sb3I6ICM0OTQ1ZmY7IH1cbi5hZG1pbi10YWItLWFjdGl2ZTo6YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwOyByaWdodDogMDsgYm90dG9tOiAtMXB4O1xuICBoZWlnaHQ6IDJweDtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbn1cbi5hZG1pbi1sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLDFmcikgMjMycHg7XG4gIGdhcDogMTZweDtcbiAgYWxpZ24taXRlbXM6IHN0YXJ0O1xufVxuLmFkbWluLW1haW4tY2FyZCwuYWRtaW4tc2lkZS1jYXJkLC5hZG1pbi1saXN0LWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLDMzLDUyLC4wNik7XG59XG4uYWRtaW4tbWFpbi1jYXJkIHsgcGFkZGluZzogMjRweDsgfVxuLmFkbWluLXNpZGUtY2FyZCArIC5hZG1pbi1zaWRlLWNhcmQgeyBtYXJnaW4tdG9wOiAxMnB4OyB9XG4uYWRtaW4tc2lkZS1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLXNpZGUtY2FyZF9fYm9keSB7IHBhZGRpbmc6IDAgMTJweCAxMnB4OyB9XG4uYWRtaW4tc2lkZS1idXR0b24tcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uLC5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0OTQ1ZmY7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5OmRpc2FibGVkLFxuLmFkbWluLXByaW1hcnk6ZGlzYWJsZWQsXG4uYWRtaW4tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IGNhbGMoMTAwJSArIDhweCk7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMjIwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywzMyw1MiwuMTIpO1xuICBwYWRkaW5nOiA4cHggMDtcbiAgei1pbmRleDogNDA7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyIHtcbiAgY29sb3I6ICNkMDJiMjA7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbTpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uYWRtaW4tc2lkZS1idXR0b24tLW1lbnUge1xuICB3aWR0aDogMnJlbTtcbiAgZmxleDogMCAwIDJyZW07XG59XG4uYWRtaW4tc2VjdGlvbiArIC5hZG1pbi1zZWN0aW9uIHsgbWFyZ2luLXRvcDogMjBweDsgfVxuLmFkbWluLWZpZWxkLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLG1pbm1heCgwLDFmcikpO1xuICBnYXA6IDIwcHggMjRweDtcbn1cbi5hZG1pbi1maWVsZC0tZnVsbCB7IGdyaWQtY29sdW1uOiAxIC8gLTE7IH1cbi5hZG1pbi1sYWJlbCB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDJweDtcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4tbGFiZWxfX3JlcXVpcmVkIHsgY29sb3I6ICNkMDJiMjA7IH1cbi5hZG1pbi1pbnB1dCwuYWRtaW4tdGV4dGFyZWEsLmFkbWluLXNlYXJjaC1pbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAuNjI1cmVtIC44NzVyZW07XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIG91dGxpbmU6IG5vbmU7XG59XG4uYWRtaW4taW5wdXQgeyBtaW4taGVpZ2h0OiAyLjVyZW07IH1cbi5hZG1pbi10ZXh0YXJlYSB7IG1pbi1oZWlnaHQ6IDUuNzVyZW07IHJlc2l6ZTogdmVydGljYWw7IH1cbi5hZG1pbi1pbnB1dDpmb2N1cywuYWRtaW4tdGV4dGFyZWE6Zm9jdXMsLmFkbWluLXNlYXJjaC1pbnB1dDpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogIzQ5NDVmZjtcbiAgYm94LXNoYWRvdzogMCAwIDAgMXB4ICM0OTQ1ZmY7XG59XG4uYWRtaW4taW5wdXQ6ZGlzYWJsZWQsXG4uYWRtaW4tdGV4dGFyZWE6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2hlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDEycHggMTZweCAxMHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmNTtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX190aXRsZSB7IGZvbnQtc2l6ZTogLjc1cmVtOyBmb250LXdlaWdodDogNjAwOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fY291bnQgeyBjb2xvcjogIzhlOGVhOTsgZm9udC1zaXplOiAuNzVyZW07IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtICsgLmFkbWluLXJlcGVhdGFibGVfX2l0ZW0geyBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmNTsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2l0ZW0tLWRyYWctb3ZlciBzdW1tYXJ5IHsgYmFja2dyb3VuZDogI2YwZjBmZjsgfVxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnkge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeTo6LXdlYmtpdC1kZXRhaWxzLW1hcmtlciB7IGRpc3BsYXk6IG5vbmU7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fYnVsbGV0IHtcbiAgd2lkdGg6IDIwcHg7IGhlaWdodDogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjU7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogLjYyNXJlbTtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19uYW1lIHsgZm9udC1zaXplOiAuODc1cmVtOyBmb250LXdlaWdodDogNjAwOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTBweDtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b24ge1xuICBib3JkZXI6IDA7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBjb2xvcjogaW5oZXJpdDsgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlIHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogZ3JhYjtcbiAgcGFkZGluZzogMCAycHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGU6YWN0aXZlIHsgY3Vyc29yOiBncmFiYmluZzsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmRpc2FibGVkIHtcbiAgY29sb3I6ICNjNGM0ZDI7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkOmRpc2FibGVkIHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fYm9keSB7IHBhZGRpbmc6IDE2cHg7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmNTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tdG9nZ2xlIHtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IC42MjVyZW0gLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuLmFkbWluLXRvZ2dsZTpoYXMoaW5wdXQ6ZGlzYWJsZWQpIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG4uYWRtaW4tbWVkaWEge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG4uYWRtaW4tbWVkaWFfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDE0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuLmFkbWluLW1lZGlhX19zdGFjayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xufVxuLmFkbWluLW1lZGlhX190aHVtYiB7XG4gIG1heC13aWR0aDogMjQwcHg7XG4gIG1heC1oZWlnaHQ6IDE0MHB4O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5hZG1pbi1tZWRpYV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogNHB4O1xufVxuLmFkbWluLW1lZGlhX19hY3Rpb24ge1xuICB3aWR0aDogMnJlbTsgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG4uYWRtaW4tbWVkaWFfX2FjdGlvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLW1lZGlhX19maWxlbmFtZSB7IGNvbG9yOiAjNjY2Njg3OyBmb250LXNpemU6IC43NXJlbTsgfVxuLmFkbWluLW1lZGlhX19zb3VyY2UgeyBtYXJnaW4tdG9wOiAxMHB4OyB9XG4uYWRtaW4tbWVkaWFfX3NvdXJjZS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbn1cbi5hZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvbiB7XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1tZWRpYV9fZXJyb3Ige1xuICBjb2xvcjogI2QwMmIyMDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbn1cbi5hZG1pbi1saXN0LXRvb2xiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cbi5hZG1pbi1saXN0LWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEycHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uYWRtaW4tc2VhcmNoLXdyYXAgeyB3aWR0aDogMjgwcHg7IH1cbi5hZG1pbi1saXN0LW1ldGEge1xuICBtYXJnaW46IDEycHggMCAzMnB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG4uYWRtaW4tdG9vbGJhci1jbHVzdGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uYWRtaW4tdG9vbGJhci1idXR0b24ge1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIHBhZGRpbmc6IDAgMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXRvb2xiYXItYnV0dG9uLS1pY29uIHtcbiAgd2lkdGg6IDIuNXJlbTtcbiAgcGFkZGluZzogMDtcbn1cbi5hZG1pbi10b29sYmFyLWJ1dHRvbi0tYWN0aXZlIHtcbiAgYm9yZGVyLWNvbG9yOiAjNDk0NWZmO1xuICBjb2xvcjogIzQ5NDVmZjtcbn1cbi5hZG1pbi10b29sYmFyLXNlYXJjaCB7XG4gIHdpZHRoOiAyODBweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAgMC44NzVyZW07XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IGNhbGMoMTAwJSArIDhweCk7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMzIwcHg7XG4gIG1heC1oZWlnaHQ6IDQyMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDEycHggMzJweCByZ2JhKDMzLDMzLDUyLC4xMik7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIHotaW5kZXg6IDIwO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNHB4O1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fdGl0bGUge1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19yZXNldCB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19ncm91cCArIC5hZG1pbi1saXN0LXBvcG92ZXJfX2dyb3VwIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX2xhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX3NlbGVjdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fY2hlY2sge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDhweCAwO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fY2hlY2sgaW5wdXQge1xuICB3aWR0aDogMS4yNXJlbTtcbiAgaGVpZ2h0OiAxLjI1cmVtO1xufVxuLmFkbWluLWxpc3QtY2FyZF9faGVhZCB7XG4gIHBhZGRpbmc6IDE2cHggMjBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG59XG4uYWRtaW4tbGlzdC10YWJsZSB0aCB7XG4gIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLWxpc3QtdGFibGUgdGQge1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBmb250LXNpemU6IC44NzVyZW07XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG4uYWRtaW4tbGlzdC1yb3ctbWVudS1jZWxsIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNDRweDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51LXRyaWdnZXIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogY2FsYygxMDAlIC0gNnB4KTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAyMjBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDEycHggMzJweCByZ2JhKDMzLDMzLDUyLC4xMik7XG4gIHBhZGRpbmc6IDhweCAwO1xuICB6LWluZGV4OiAyNDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pdGVtOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pdGVtLS1kYW5nZXIge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uYWRtaW4tbGlzdC10YWJsZSB0aCBidXR0b24ge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAwO1xuICBjb2xvcjogaW5oZXJpdDtcbiAgZm9udDogaW5oZXJpdDtcbiAgdGV4dC10cmFuc2Zvcm06IGluaGVyaXQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHRyIHsgY3Vyc29yOiBwb2ludGVyOyB9XG4uYWRtaW4tbGlzdC10YWJsZSB0cjpob3ZlciB7IGJhY2tncm91bmQ6ICNmYWZhZmI7IH1cbi5hZG1pbi1saXN0LXN0YXR1cyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAxLjc1cmVtO1xuICBwYWRkaW5nOiAwIC42MjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBiYWNrZ3JvdW5kOiAjZWZmZmVkO1xuICBjb2xvcjogIzJmNjg0NjtcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4tcHJpbWFyeSB7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAgLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXNlY29uZGFyeSB7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAgLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLWxpc3QtYm9vbGVhbiB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDFyZW07XG4gIGhlaWdodDogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGZvbnQtc2l6ZTogMC42MjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWRtaW4tbGlzdC1ib29sZWFuLS15ZXMge1xuICBiYWNrZ3JvdW5kOiAjMmY2ODQ2O1xuICBjb2xvcjogI2ZmZjtcbn1cbi5hZG1pbi1saXN0LWJvb2xlYW4tLW5vIHtcbiAgYmFja2dyb3VuZDogI2QwMmIyMDtcbiAgY29sb3I6ICNmZmY7XG59XG5AbWVkaWEgKG1heC13aWR0aDogMTE4MHB4KSB7XG4gIC5hZG1pbi1sYXlvdXQgeyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjsgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1lZGl0b3IgeyBwYWRkaW5nOiAyMHB4IDE2cHggNDhweDsgfVxuICAuYWRtaW4tZmllbGQtZ3JpZCB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyB9XG4gIC5hZG1pbi1saXN0LXRvb2xiYXIgeyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBhbGlnbi1pdGVtczogc3RyZXRjaDsgfVxuICAuYWRtaW4tc2VhcmNoLXdyYXAgeyB3aWR0aDogMTAwJTsgfVxufVxuYDtcblxuZnVuY3Rpb24gdG9MYWJlbChuYW1lKSB7XG4gIHJldHVybiBuYW1lXG4gICAgLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csICckMSAkMicpXG4gICAgLnJlcGxhY2UoL1tfLV0rL2csICcgJylcbiAgICAucmVwbGFjZSgvXFxiZmFxXFxiL2dpLCAnRkFRJylcbiAgICAucmVwbGFjZSgvXi4vLCAodikgPT4gdi50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gY2xvbmVWYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xufVxuXG5mdW5jdGlvbiBnZXRFbXB0eUl0ZW0oc2FtcGxlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNhbXBsZSkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoc2FtcGxlICYmIHR5cGVvZiBzYW1wbGUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIE9iamVjdC5rZXlzKHNhbXBsZSlcbiAgICAgICAgLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgaWYgKFsnaWQnLCAnZG9jdW1lbnRJZCcsICdzdGF0dXMnLCAndXBkYXRlZEF0JywgJ3B1Ymxpc2hlZEF0J10uaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIFtrZXksIHNhbXBsZVtrZXldID8/IG51bGxdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBba2V5LCBnZXRFbXB0eUl0ZW0oc2FtcGxlW2tleV0pXTtcbiAgICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2FtcGxlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHNhbXBsZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gdG9Db21wYXJhYmxlVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoaXRlbSkgPT4gdG9Db21wYXJhYmxlVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpXG4gICAgICAuc29ydCgpXG4gICAgICAuZmlsdGVyKChrZXkpID0+ICFbJ3VwZGF0ZWRBdCcsICdwdWJsaXNoZWRBdCcsICdzdGF0dXMnXS5pbmNsdWRlcyhrZXkpKVxuICAgICAgLnJlZHVjZSgoYWNjdW11bGF0b3IsIGtleSkgPT4ge1xuICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gdG9Db21wYXJhYmxlVmFsdWUodmFsdWVba2V5XSk7XG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaGFzTWVhbmluZ2Z1bFZhbHVlKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5zb21lKChpdGVtKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModmFsdWUpXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4gIVsnaWQnLCAnZG9jdW1lbnRJZCcsICd1cGRhdGVkQXQnLCAncHVibGlzaGVkQXQnLCAnc3RhdHVzJ10uaW5jbHVkZXMoa2V5KSlcbiAgICAgIC5zb21lKChbLCBuZXN0ZWRWYWx1ZV0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShuZXN0ZWRWYWx1ZSkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZSAhPSBudWxsO1xufVxuXG5mdW5jdGlvbiBidWlsZEFkbWluUGF0aChwYXRobmFtZSwgcGFyYW1zKSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBPYmplY3QuZW50cmllcyhwYXJhbXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgc2VhcmNoUGFyYW1zLnNldChrZXksIFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgcmV0dXJuIGAke3BhdGhuYW1lfSR7cXVlcnlTdHJpbmcgPyBgPyR7cXVlcnlTdHJpbmd9YCA6ICcnfWA7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGlzcGxheWVkRmllbGRzKHZhbHVlKSB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUgPz8gJycpXG4gICAgLnNwbGl0KCcsJylcbiAgICAubWFwKChmaWVsZCkgPT4gZmllbGQudHJpbSgpKVxuICAgIC5maWx0ZXIoQm9vbGVhbik7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSW5wdXRWYWx1ZShuZXh0UmF3VmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGN1cnJlbnRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAobmV4dFJhd1ZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0UmF3VmFsdWUpO1xuICAgIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkKSA/IGN1cnJlbnRWYWx1ZSA6IHBhcnNlZDtcbiAgfVxuICByZXR1cm4gbmV4dFJhd1ZhbHVlO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdFBhdGgodmFsdWUsIHBhdGgsIG5leHRWYWx1ZSkge1xuICBpZiAoIXBhdGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5leHRWYWx1ZTtcbiAgfVxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSB1cGRhdGVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgbmV4dFZhbHVlKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBdFBhdGgodmFsdWUsIHBhdGgpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUuZmlsdGVyKChfLCBpbmRleCkgPT4gaW5kZXggIT09IHBhdGhbMF0pIDogdmFsdWU7XG4gIH1cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gcmVtb3ZlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEF0UGF0aCh2YWx1ZSwgcGF0aCwgbmV4dEl0ZW0pIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBbLi4uKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSksIG5leHRJdGVtXTtcbiAgfVxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSBhcHBlbmRBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgbmV4dEl0ZW0pO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIG1vdmVBdFBhdGgodmFsdWUsIHBhdGgsIG9mZnNldCkge1xuICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSBwYXRoWzBdO1xuICAgIGNvbnN0IG5leHRJbmRleCA9IGluZGV4ICsgb2Zmc2V0O1xuXG4gICAgaWYgKG5leHRJbmRleCA8IDAgfHwgbmV4dEluZGV4ID49IHZhbHVlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNsb25lID0gWy4uLnZhbHVlXTtcbiAgICBjb25zdCBbbW92ZWRdID0gY2xvbmUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBjbG9uZS5zcGxpY2UobmV4dEluZGV4LCAwLCBtb3ZlZCk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gbW92ZUF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0LCBvZmZzZXQpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlUaXRsZShkZWZpbml0aW9uLCByZWNvcmQpIHtcbiAgaWYgKCFyZWNvcmQpIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvbi5sYWJlbDtcbiAgfVxuICByZXR1cm4gcmVjb3JkW2RlZmluaXRpb24udGl0bGVGaWVsZF0gfHwgZGVmaW5pdGlvbi5sYWJlbDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFBhZ2UocGFnZU5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKG9wdGlvbnMucXVlcnkgPz8ge30pO1xuICBjb25zdCBxdWVyeVN0cmluZyA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGAvYWRtaW4vYXBpL3BhZ2VzLyR7cGFnZU5hbWV9JHtxdWVyeVN0cmluZyA/IGA/JHtxdWVyeVN0cmluZ31gIDogJyd9YCxcbiAgICB7XG4gICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kID8/ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IG9wdGlvbnMuYm9keSA/IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYm9keSkgOiB1bmRlZmluZWQsXG4gICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICB9LFxuICApO1xuXG4gIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLm1lc3NhZ2UgPz8gJ1JlcXVlc3QgZmFpbGVkJyk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkQWRtaW5JbWFnZShmaWxlKSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hZG1pbi9hcGkvbWVkaWEvdXBsb2FkJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICB9KTtcblxuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvciB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgfVxuXG4gIGNvbnN0IHVwbG9hZGVkVXJsID0gcGF5bG9hZD8udXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnJlbGF0aXZlVXJsIHx8IHBheWxvYWQ/Lml0ZW0/LnVybDtcblxuICBpZiAoIXVwbG9hZGVkVXJsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgc3VjY2VlZGVkIGJ1dCByZXR1cm5lZCBubyBVUkwuJyk7XG4gIH1cblxuICByZXR1cm4gdXBsb2FkZWRVcmw7XG59XG5cbmZ1bmN0aW9uIE1lZGlhRmllbGQoeyBsYWJlbCwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBkaXNhYmxlZCB9KSB7XG4gIGNvbnN0IHVybHMgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXS5maWx0ZXIoQm9vbGVhbik7XG4gIGNvbnN0IGZpbGVJbnB1dFJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW3VwbG9hZGluZywgc2V0VXBsb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3VwbG9hZEVycm9yLCBzZXRVcGxvYWRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fY2FudmFzXCI+XG4gICAgICAgICAge3VybHMubGVuZ3RoID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc3RhY2tcIj5cbiAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdGh1bWJcIiBzcmM9e3VybHNbMF19IGFsdD17bGFiZWx9IC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4odXJsc1swXSwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyl9PuKGlzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHBhdGgsIEFycmF5LmlzQXJyYXkodmFsdWUpID8gW10gOiAnJyl9PuKclTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fZmlsZW5hbWVcIj57dXJsc1swXS5zcGxpdCgnLycpLnBvcCgpfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXY+Tm8gbWVkaWEgc2VsZWN0ZWQuPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZVwiPlxuICAgICAgICAgIHtBcnJheS5pc0FycmF5KHZhbHVlKSA/IChcbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi10ZXh0YXJlYVwiXG4gICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZS5qb2luKCdcXG4nKX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHVwbG9hZGluZ31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgZXZlbnQudGFyZ2V0LnZhbHVlLnNwbGl0KCdcXG4nKS5tYXAoKGl0ZW0pID0+IGl0ZW0udHJpbSgpKS5maWx0ZXIoQm9vbGVhbikpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk9uZSBpbWFnZSBVUkwgcGVyIGxpbmVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlID8/ICcnfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImh0dHBzOi8vLi4uXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvblwiXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxuICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICBtdWx0aXBsZT17QXJyYXkuaXNBcnJheSh2YWx1ZSl9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17YXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5maWxlcyA/PyBbXSk7XG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmxzID0gW107XG4gICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmwgPSBhd2FpdCB1cGxvYWRBZG1pbkltYWdlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB1cGxvYWRlZFVybHMucHVzaCh1cGxvYWRlZFVybCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCBbLi4udmFsdWUsIC4uLnVwbG9hZGVkVXJsc10pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UocGF0aCwgdXBsb2FkZWRVcmxzWzBdIHx8ICcnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7dXBsb2FkRXJyb3IgPyA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lcnJvclwiPnt1cGxvYWRFcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBQcmltaXRpdmVGaWVsZCh7IGZpZWxkLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSB0b0xhYmVsKGZpZWxkKTtcblxuICBpZiAoSU1BR0VfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSkge1xuICAgIHJldHVybiA8TWVkaWFGaWVsZCBsYWJlbD17bGFiZWx9IHZhbHVlPXt2YWx1ZX0gcGF0aD17cGF0aH0gb25DaGFuZ2U9e29uQ2hhbmdlfSBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+O1xuICB9XG5cbiAgaWYgKEJPT0xFQU5fRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXRvZ2dsZVwiPlxuICAgICAgICAgIDxzcGFuPnt2YWx1ZSA/ICdFbmFibGVkJyA6ICdEaXNhYmxlZCd9PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtCb29sZWFuKHZhbHVlKX0gZGlzYWJsZWQ9e2Rpc2FibGVkfSBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBldmVudC50YXJnZXQuY2hlY2tlZCl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IEZVTExfV0lEVEhfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSA/ICdhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbCcgOiAnYWRtaW4tZmllbGQnO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj5cbiAgICAgICAge2xhYmVsfVxuICAgICAgICB7ZmllbGQgIT09ICdzb3J0T3JkZXInICYmICFCT09MRUFOX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbF9fcmVxdWlyZWRcIj4qPC9zcGFuPiA6IG51bGx9XG4gICAgICA8L2xhYmVsPlxuICAgICAge01VTFRJTElORV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpID8gKFxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi10ZXh0YXJlYVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlID8/ICcnfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBwYXJzZUlucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlLCB2YWx1ZSkpfVxuICAgICAgICAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4taW5wdXRcIlxuICAgICAgICAgIHR5cGU9e3R5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyAnbnVtYmVyJyA6ICd0ZXh0J31cbiAgICAgICAgICB2YWx1ZT17dmFsdWUgPz8gJyd9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBBcnJheUZpZWxkKHsgZmllbGQsIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSB0b0xhYmVsKGZpZWxkKTtcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW107XG4gIGNvbnN0IFtkcmFnSW5kZXgsIHNldERyYWdJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2RyYWdPdmVySW5kZXgsIHNldERyYWdPdmVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX190aXRsZVwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fY291bnRcIj57aXRlbXMubGVuZ3RofSBlbnRyaWVzPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7aXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxkZXRhaWxzXG4gICAgICAgICAgICBrZXk9e2Ake2ZpZWxkfS0ke2luZGV4fWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yZXBlYXRhYmxlX19pdGVtJHtkcmFnT3ZlckluZGV4ID09PSBpbmRleCA/ICcgYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyJyA6ICcnfWB9XG4gICAgICAgICAgICBvcGVuPXtpbmRleCA9PT0gMH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaWYgKGRyYWdPdmVySW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyb3A9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gaW5kZXggLSBkcmFnSW5kZXg7XG4gICAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgICAgICAgICAgICBvbk1vdmVJdGVtKFsuLi5wYXRoLCBkcmFnSW5kZXhdLCBvZmZzZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldERyYWdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChudWxsKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyYWdMZWF2ZT17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19idWxsZXRcIj7ilrw8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fbmFtZVwiPnt0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgPyBpdGVtIHx8IGAke2xhYmVsfSAke2luZGV4ICsgMX1gIDogaXRlbT8udGV4dCB8fCBgJHtsYWJlbH0gJHtpbmRleCArIDF9YH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtKFsuLi5wYXRoLCBpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIPCfl5FcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZT17IWRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEcmFnIHRvIHJlb3JkZXJcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyhpbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDii67ii65cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3N1bW1hcnk+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+e2xhYmVsID09PSAnVGFncycgPyAnVGV4dCcgOiBsYWJlbC5zbGljZSgwLCAtMSkgfHwgbGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgPyBpdGVtIDogaXRlbT8udGV4dCA/PyAnJ31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShbLi4ucGF0aCwgaW5kZXhdLCB7IHRleHQ6IGV2ZW50LnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICApKX1cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19hZGRcIiB0eXBlPVwiYnV0dG9uXCIgZGlzYWJsZWQ9e2Rpc2FibGVkfSBvbkNsaWNrPXsoKSA9PiBvbkFkZEl0ZW0ocGF0aCwgeyB0ZXh0OiAnJyB9KX0+XG4gICAgICAgICAgKyBBZGQgYW4gZW50cnlcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRmllbGRSZW5kZXJlcih7IGZpZWxkLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiA8QXJyYXlGaWVsZCBmaWVsZD17ZmllbGR9IHZhbHVlPXt2YWx1ZX0gcGF0aD17cGF0aH0gb25DaGFuZ2U9e29uQ2hhbmdlfSBvbkFkZEl0ZW09e29uQWRkSXRlbX0gb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19IG9uTW92ZUl0ZW09e29uTW92ZUl0ZW19IGRpc2FibGVkPXtkaXNhYmxlZH0gLz47XG4gIH1cbiAgcmV0dXJuIDxQcmltaXRpdmVGaWVsZCBmaWVsZD17ZmllbGR9IHZhbHVlPXt2YWx1ZX0gcGF0aD17cGF0aH0gb25DaGFuZ2U9e29uQ2hhbmdlfSBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+O1xufVxuXG5mdW5jdGlvbiByZW5kZXJMaXN0Q2VsbChmaWVsZCwgdmFsdWUpIHtcbiAgaWYgKGZpZWxkID09PSAnc3RhdHVzJykge1xuICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXN0YXR1c1wiPnt2YWx1ZX08L3NwYW4+O1xuICB9XG5cbiAgaWYgKChmaWVsZCA9PT0gJ2ZlYXR1cmVkJyB8fCBmaWVsZCA9PT0gJ2lzRmVhdHVyZWQnIHx8IGZpZWxkID09PSAnaXNQb3B1bGFyJykgJiYgKHZhbHVlID09PSAnWWVzJyB8fCB2YWx1ZSA9PT0gJ05vJykpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgYWRtaW4tbGlzdC1ib29sZWFuICR7dmFsdWUgPT09ICdZZXMnID8gJ2FkbWluLWxpc3QtYm9vbGVhbi0teWVzJyA6ICdhZG1pbi1saXN0LWJvb2xlYW4tLW5vJ31gfT5cbiAgICAgICAge3ZhbHVlID09PSAnWWVzJyA/ICfinJMnIDogJ+KclSd9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gTGlzdFZpZXcoe1xuICBkZWZpbml0aW9uLFxuICByZWNvcmRzLFxuICBjb250cm9scyxcbiAgc2VhcmNoLFxuICBsb2FkaW5nLFxuICBvblNlYXJjaCxcbiAgb25PcGVuUmVjb3JkLFxuICBvbkNyZWF0ZSxcbiAgb25TZXRTb3J0LFxuICBvblNldEZpbHRlcixcbiAgb25SZXNldEZpbHRlcnMsXG4gIG9uVG9nZ2xlRGlzcGxheWVkRmllbGQsXG4gIG9uUmVzZXREaXNwbGF5ZWRGaWVsZHMsXG4gIG9uRHVwbGljYXRlUmVjb3JkLFxuICBvbkRlbGV0ZVJlY29yZCxcbn0pIHtcbiAgY29uc3QgW3Nob3dTZWFyY2gsIHNldFNob3dTZWFyY2hdID0gdXNlU3RhdGUoQm9vbGVhbihzZWFyY2gpKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93RGlzcGxheWVkLCBzZXRTaG93RGlzcGxheWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NlYXJjaFZhbHVlLCBzZXRTZWFyY2hWYWx1ZV0gPSB1c2VTdGF0ZShzZWFyY2gpO1xuICBjb25zdCBbb3Blbk1lbnVJZCwgc2V0T3Blbk1lbnVJZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgbWVudVJlZiA9IHVzZVJlZihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFNlYXJjaFZhbHVlKHNlYXJjaCk7XG4gIH0sIFtzZWFyY2hdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoc2VhcmNoVmFsdWUgIT09IHNlYXJjaCkge1xuICAgICAgICBvblNlYXJjaChzZWFyY2hWYWx1ZSk7XG4gICAgICB9XG4gICAgfSwgMjUwKTtcblxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICB9LCBbb25TZWFyY2gsIHNlYXJjaCwgc2VhcmNoVmFsdWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAobWVudVJlZi5jdXJyZW50ICYmICFtZW51UmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICBzZXRPcGVuTWVudUlkKG51bGwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGRpc3BsYXllZENvbHVtbnMgPSB1c2VNZW1vKFxuICAgICgpID0+IGNvbnRyb2xzLmF2YWlsYWJsZUZpZWxkcy5maWx0ZXIoKGZpZWxkKSA9PiBjb250cm9scy5kaXNwbGF5ZWRGaWVsZHMuaW5jbHVkZXMoZmllbGQuZmllbGQpKSxcbiAgICBbY29udHJvbHMuYXZhaWxhYmxlRmllbGRzLCBjb250cm9scy5kaXNwbGF5ZWRGaWVsZHNdLFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JcIj5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvcl9faW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1oZWFkZXJcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZXRhXCI+Q29sbGVjdGlvbiBUeXBlPC9kaXY+XG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tdGl0bGVcIj57ZGVmaW5pdGlvbi5sYWJlbH08L2gxPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25DcmVhdGV9PisgQ3JlYXRlIG5ldyBlbnRyeTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtbWV0YVwiPntyZWNvcmRzLmxlbmd0aH0gZW50cmllcyBmb3VuZDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC10b29sYmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10b29sYmFyLWNsdXN0ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tdG9vbGJhci1idXR0b24gYWRtaW4tdG9vbGJhci1idXR0b24tLWljb24ke3Nob3dTZWFyY2ggPyAnIGFkbWluLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dTZWFyY2goKGN1cnJlbnQpID0+ICFjdXJyZW50KX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg8J+UjVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB7c2hvd1NlYXJjaCA/IChcbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tdG9vbGJhci1zZWFyY2hcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hWYWx1ZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hWYWx1ZShldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi10b29sYmFyLWJ1dHRvbiR7c2hvd0ZpbHRlcnMgPyAnIGFkbWluLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRTaG93RmlsdGVycygoY3VycmVudCkgPT4gIWN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIHNldFNob3dEaXNwbGF5ZWQoZmFsc2UpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBGaWx0ZXJzXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHtzaG93RmlsdGVycyA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJcIiBzdHlsZT17eyBsZWZ0OiBzaG93U2VhcmNoID8gMzMyIDogNTIsIHJpZ2h0OiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX190aXRsZVwiPkZpbHRlcnM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19yZXNldFwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvblJlc2V0RmlsdGVyc30+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7Y29udHJvbHMuZmlsdGVycy5tYXAoKGZpbHRlcikgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2ZpbHRlci5maWVsZH0gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19sYWJlbFwiPntmaWx0ZXIubGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fc2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29udHJvbHMuYWN0aXZlRmlsdGVyc1tmaWx0ZXIuZmllbGRdID8/ICcnfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uU2V0RmlsdGVyKGZpbHRlci5maWVsZCwgZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5BbGw8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyLm9wdGlvbnMubWFwKChvcHRpb24pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHRpb259IHZhbHVlPXtvcHRpb259PntvcHRpb259PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LWFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tdG9vbGJhci1jbHVzdGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi10b29sYmFyLWJ1dHRvbiBhZG1pbi10b29sYmFyLWJ1dHRvbi0taWNvbiR7c2hvd0Rpc3BsYXllZCA/ICcgYWRtaW4tdG9vbGJhci1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFNob3dEaXNwbGF5ZWQoKGN1cnJlbnQpID0+ICFjdXJyZW50KTtcbiAgICAgICAgICAgICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAg4pqZXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICB7c2hvd0Rpc3BsYXllZCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3ZlclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX2hlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3RpdGxlXCI+RGlzcGxheWVkIGZpZWxkczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19yZXNldFwiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25SZXNldERpc3BsYXllZEZpZWxkc31cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIFJlc2V0XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7Y29udHJvbHMuYXZhaWxhYmxlRmllbGRzLm1hcCgoZmllbGQpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGtleT17ZmllbGQuZmllbGR9IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fY2hlY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtjb250cm9scy5kaXNwbGF5ZWRGaWVsZHMuaW5jbHVkZXMoZmllbGQuZmllbGQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25Ub2dnbGVEaXNwbGF5ZWRGaWVsZChmaWVsZC5maWVsZCwgZXZlbnQudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2ZpZWxkLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LWNhcmRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtY2FyZF9faGVhZFwiPlxuICAgICAgICAgICAgPHN0cm9uZz57ZGVmaW5pdGlvbi5sYWJlbH08L3N0cm9uZz5cbiAgICAgICAgICAgIDxzcGFuPntsb2FkaW5nID8gJ0xvYWRpbmcuLi4nIDogYCR7cmVjb3Jkcy5sZW5ndGh9IGVudHJpZXNgfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC10YWJsZVwiPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2Rpc3BsYXllZENvbHVtbnMubWFwKChjb2x1bW4pID0+IChcbiAgICAgICAgICAgICAgICAgIDx0aCBrZXk9e2NvbHVtbi5maWVsZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uU2V0U29ydChjb2x1bW4uZmllbGQpfT5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29sdW1uLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgIHtjb250cm9scy5zb3J0QnkgPT09IGNvbHVtbi5maWVsZCA/IGAgJHtjb250cm9scy5zb3J0T3JkZXIgPT09ICdhc2MnID8gJ+KGkScgOiAn4oaTJ31gIDogJyd9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8dGggLz5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyZWNvcmRzLm1hcCgocmVjb3JkKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cmVjb3JkLmRvY3VtZW50SWR9IG9uQ2xpY2s9eygpID0+IG9uT3BlblJlY29yZChyZWNvcmQuaWQpfT5cbiAgICAgICAgICAgICAgICAgIHtkaXNwbGF5ZWRDb2x1bW5zLm1hcCgoY29sdW1uKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBrZXk9e2Ake3JlY29yZC5kb2N1bWVudElkfS0ke2NvbHVtbi5maWVsZH1gfT57cmVuZGVyTGlzdENlbGwoY29sdW1uLmZpZWxkLCByZWNvcmQuY29sdW1uc1tjb2x1bW4uZmllbGRdKX08L3RkPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudS1jZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51LXRyaWdnZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRPcGVuTWVudUlkKChjdXJyZW50KSA9PiAoY3VycmVudCA9PT0gcmVjb3JkLmlkID8gbnVsbCA6IHJlY29yZC5pZCkpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICDigKZcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIHtvcGVuTWVudUlkID09PSByZWNvcmQuaWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXttZW51UmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudV9faXRlbVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldE9wZW5NZW51SWQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uT3BlblJlY29yZChyZWNvcmQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVfX2ljb25cIj7inI48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkVkaXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudV9faXRlbVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldE9wZW5NZW51SWQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHVwbGljYXRlUmVjb3JkKHJlY29yZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudV9faWNvblwiPuKniTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RHVwbGljYXRlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW0gYWRtaW4tbGlzdC1yb3ctbWVudV9faXRlbS0tZGFuZ2VyXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25EZWxldGVSZWNvcmQocmVjb3JkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pY29uXCI+8J+XkTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RGVsZXRlIGVudHJ5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEVkaXRWaWV3KHsgZGVmaW5pdGlvbiwgcmVjb3JkLCBwdWJsaXNoZWRSZWNvcmQsIGFjdGl2ZVRhYiwgb25Td2l0Y2hUYWIsIHNhdmluZywgZXJyb3IsIG9uQmFjaywgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBvblNhdmUsIG9uUHVibGlzaCwgb25EZWxldGUsIG9uRGlzY2FyZENoYW5nZXMsIG9uVW5wdWJsaXNoLCBjYW5TYXZlLCBjYW5QdWJsaXNoLCBjYW5EaXNjYXJkLCBjYW5VbnB1Ymxpc2ggfSkge1xuICBjb25zdCBkaXNwbGF5ZWRSZWNvcmQgPSBhY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnICYmIHB1Ymxpc2hlZFJlY29yZCA/IHB1Ymxpc2hlZFJlY29yZCA6IHJlY29yZDtcbiAgY29uc3QgaXNQdWJsaXNoZWRWaWV3ID0gYWN0aXZlVGFiID09PSAncHVibGlzaGVkJyAmJiBwdWJsaXNoZWRSZWNvcmQ7XG4gIGNvbnN0IFttZW51T3Blbiwgc2V0TWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBtZW51UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtZW51T3Blbikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKG1lbnVSZWYuY3VycmVudCAmJiAhbWVudVJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICB9O1xuICB9LCBbbWVudU9wZW5dKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZWRpdG9yXCI+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JfX2lubmVyXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tYmFja1wiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkJhY2t9PuKGkCBCYWNrPC9idXR0b24+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1oZWFkZXJcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZXRhXCI+Q29sbGVjdGlvbiBUeXBlPC9kaXY+XG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tdGl0bGVcIj57Z2V0RGlzcGxheVRpdGxlKGRlZmluaXRpb24sIGRpc3BsYXllZFJlY29yZCl9PC9oMT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc3RhdHVzXCI+e3B1Ymxpc2hlZFJlY29yZCA/ICdQdWJsaXNoZWQnIDogKGRpc3BsYXllZFJlY29yZC5zdGF0dXMgfHwgJ0RyYWZ0Jyl9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1rZWJhYlwiIHR5cGU9XCJidXR0b25cIj7igKY8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10YWJzXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BhZG1pbi10YWIke2FjdGl2ZVRhYiA9PT0gJ2RyYWZ0JyA/ICcgYWRtaW4tdGFiLS1hY3RpdmUnIDogJyd9YH0gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uU3dpdGNoVGFiKCdkcmFmdCcpfT5EUkFGVDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgYWRtaW4tdGFiJHthY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnID8gJyBhZG1pbi10YWItLWFjdGl2ZScgOiAnJ31gfSB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gcHVibGlzaGVkUmVjb3JkICYmIG9uU3dpdGNoVGFiKCdwdWJsaXNoZWQnKX0+UFVCTElTSEVEPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1sYXlvdXRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1haW4tY2FyZFwiPlxuICAgICAgICAgICAge2RlZmluaXRpb24uZWRpdExheW91dC5tYXAoKHJvdywgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Byb3ctJHtpbmRleH1gfSBjbGFzc05hbWU9XCJhZG1pbi1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgICB7cm93Lm1hcCgoZmllbGQpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkUmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2ZpZWxkfVxuICAgICAgICAgICAgICAgICAgICAgIGZpZWxkPXtmaWVsZH1cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZGlzcGxheWVkUmVjb3JkW2ZpZWxkXX1cbiAgICAgICAgICAgICAgICAgICAgICBwYXRoPXtbZmllbGRdfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkFkZEl0ZW09e29uQWRkSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZUl0ZW09e29uUmVtb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1B1Ymxpc2hlZFZpZXd9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxhc2lkZT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19oZWFkXCI+RW50cnk8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uUHVibGlzaH0gZGlzYWJsZWQ9eyFjYW5QdWJsaXNofT5QdWJsaXNoPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkgYWRtaW4tc2lkZS1idXR0b24tLW1lbnVcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gc2V0TWVudU9wZW4oKGN1cnJlbnQpID0+ICFjdXJyZW50KX0+4oCmPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICB7bWVudU9wZW4gPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXttZW51UmVmfSBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSBhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbnB1Ymxpc2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhblVucHVibGlzaH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uXCI+w5c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICBVbnB1Ymxpc2hcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtIGFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRpc2NhcmRDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5EaXNjYXJkfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2ljb25cIj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIERpc2NhcmQgY2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25TYXZlfSBkaXNhYmxlZD17IWNhblNhdmV9PlxuICAgICAgICAgICAgICAgICAge3NhdmluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUnfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9faGVhZFwiPkFjdGlvbnM8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25EZWxldGV9IGRpc2FibGVkPXtpc1B1Ymxpc2hlZFZpZXd9PkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvYXNpZGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbGxlY3Rpb25NYW5hZ2VyKCkge1xuICBjb25zdCB7IHBhZ2VOYW1lIH0gPSB1c2VQYXJhbXMoKTtcbiAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2xpc3RMb2FkaW5nLCBzZXRMaXN0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkZWZpbml0aW9uLCBzZXREZWZpbml0aW9uXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtjb250cm9scywgc2V0Q29udHJvbHNdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtyZWNvcmQsIHNldFJlY29yZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW29yaWdpbmFsUmVjb3JkLCBzZXRPcmlnaW5hbFJlY29yZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3B1Ymxpc2hlZFJlY29yZCwgc2V0UHVibGlzaGVkUmVjb3JkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2RyYWZ0Jyk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuXG4gIGNvbnN0IHF1ZXJ5ID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCksIFtsb2NhdGlvbi5zZWFyY2hdKTtcbiAgY29uc3QgcmVjb3JkSWQgPSBxdWVyeS5nZXQoJ3JlY29yZElkJyk7XG4gIGNvbnN0IGlzTmV3ID0gcXVlcnkuZ2V0KCduZXcnKSA9PT0gJzEnO1xuICBjb25zdCBzZWFyY2ggPSBxdWVyeS5nZXQoJ3NlYXJjaCcpIHx8ICcnO1xuICBjb25zdCBzdGF0dXMgPSBxdWVyeS5nZXQoJ3N0YXR1cycpIHx8ICcnO1xuICBjb25zdCBjYXRlZ29yeSA9IHF1ZXJ5LmdldCgnY2F0ZWdvcnknKSB8fCAnJztcbiAgY29uc3QgcGxhblR5cGUgPSBxdWVyeS5nZXQoJ3BsYW5UeXBlJykgfHwgJyc7XG4gIGNvbnN0IGZlYXR1cmVkID0gcXVlcnkuZ2V0KCdmZWF0dXJlZCcpIHx8ICcnO1xuICBjb25zdCBpc0ZlYXR1cmVkID0gcXVlcnkuZ2V0KCdpc0ZlYXR1cmVkJykgfHwgJyc7XG4gIGNvbnN0IGlzUG9wdWxhciA9IHF1ZXJ5LmdldCgnaXNQb3B1bGFyJykgfHwgJyc7XG4gIGNvbnN0IHNvcnRCeSA9IHF1ZXJ5LmdldCgnc29ydEJ5JykgfHwgJyc7XG4gIGNvbnN0IHNvcnRPcmRlciA9IHF1ZXJ5LmdldCgnc29ydE9yZGVyJykgfHwgJyc7XG4gIGNvbnN0IGRpc3BsYXllZEZpZWxkcyA9IHBhcnNlRGlzcGxheWVkRmllbGRzKHF1ZXJ5LmdldCgnZGlzcGxheWVkRmllbGRzJykpO1xuXG4gIGNvbnN0IG1vZGUgPSB1c2VNZW1vKCgpID0+IChyZWNvcmRJZCB8fCBpc05ldyA/ICdlZGl0JyA6ICdsaXN0JyksIFtyZWNvcmRJZCwgaXNOZXddKTtcbiAgY29uc3QgaXNEaXJ0eSA9IHVzZU1lbW8oXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUocmVjb3JkKSkgIT09IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKG9yaWdpbmFsUmVjb3JkKSksXG4gICAgW3JlY29yZCwgb3JpZ2luYWxSZWNvcmRdLFxuICApO1xuICBjb25zdCBoYXNEcmFmdENvbnRlbnQgPSB1c2VNZW1vKCgpID0+IGhhc01lYW5pbmdmdWxWYWx1ZShyZWNvcmQpLCBbcmVjb3JkXSk7XG4gIGNvbnN0IGNhblNhdmUgPSBtb2RlID09PSAnZWRpdCcgJiYgIXNhdmluZyAmJiBhY3RpdmVUYWIgIT09ICdwdWJsaXNoZWQnICYmIGlzRGlydHk7XG4gIGNvbnN0IGNhblB1Ymxpc2ggPSBtb2RlID09PSAnZWRpdCcgJiYgIXNhdmluZyAmJiBhY3RpdmVUYWIgIT09ICdwdWJsaXNoZWQnICYmIChwdWJsaXNoZWRSZWNvcmQgPyBpc0RpcnR5IDogaGFzRHJhZnRDb250ZW50KTtcbiAgY29uc3QgY2FuRGlzY2FyZCA9IG1vZGUgPT09ICdlZGl0JyAmJiAhc2F2aW5nICYmIGFjdGl2ZVRhYiAhPT0gJ3B1Ymxpc2hlZCcgJiYgaGFzRHJhZnRDb250ZW50O1xuICBjb25zdCBjYW5VbnB1Ymxpc2ggPSBtb2RlID09PSAnZWRpdCcgJiYgIXNhdmluZyAmJiBCb29sZWFuKHB1Ymxpc2hlZFJlY29yZCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYWN0aXZlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBzaG91bGRCbG9jayA9IG1vZGUgPT09ICdlZGl0JyB8fCAhZGVmaW5pdGlvbjtcbiAgICAgIGlmIChzaG91bGRCbG9jaykge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0TGlzdExvYWRpbmcodHJ1ZSk7XG4gICAgICB9XG4gICAgICBzZXRFcnJvcignJyk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVxdWVzdFBhZ2UocGFnZU5hbWUsIHtcbiAgICAgICAgICBxdWVyeTogbW9kZSA9PT0gJ2VkaXQnXG4gICAgICAgICAgICA/IChyZWNvcmRJZCA/IHsgcmVjb3JkSWQgfSA6IHsgbmV3OiAnMScgfSlcbiAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICBzZWFyY2gsXG4gICAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgICAgICAgIHBsYW5UeXBlLFxuICAgICAgICAgICAgICBmZWF0dXJlZCxcbiAgICAgICAgICAgICAgaXNGZWF0dXJlZCxcbiAgICAgICAgICAgICAgaXNQb3B1bGFyLFxuICAgICAgICAgICAgICBzb3J0QnksXG4gICAgICAgICAgICAgIHNvcnRPcmRlcixcbiAgICAgICAgICAgICAgZGlzcGxheWVkRmllbGRzOiBkaXNwbGF5ZWRGaWVsZHMuam9pbignLCcpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXREZWZpbml0aW9uKHBheWxvYWQuZGVmaW5pdGlvbik7XG4gICAgICAgIHNldFJlY29yZHMocGF5bG9hZC5yZWNvcmRzID8/IFtdKTtcbiAgICAgICAgc2V0Q29udHJvbHMocGF5bG9hZC5jb250cm9scyA/PyBudWxsKTtcbiAgICAgICAgY29uc3QgbmV4dERyYWZ0UmVjb3JkID0gcGF5bG9hZC5kcmFmdFJlY29yZCA/IGNsb25lVmFsdWUocGF5bG9hZC5kcmFmdFJlY29yZCkgOiBudWxsO1xuICAgICAgICBzZXRSZWNvcmQobmV4dERyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0T3JpZ2luYWxSZWNvcmQobmV4dERyYWZ0UmVjb3JkID8gY2xvbmVWYWx1ZShuZXh0RHJhZnRSZWNvcmQpIDogbnVsbCk7XG4gICAgICAgIHNldFB1Ymxpc2hlZFJlY29yZChwYXlsb2FkLnB1Ymxpc2hlZFJlY29yZCA/IGNsb25lVmFsdWUocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQpIDogbnVsbCk7XG4gICAgICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgICAgIH0gY2F0Y2ggKGxvYWRFcnJvcikge1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRFcnJvcihsb2FkRXJyb3IubWVzc2FnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgc2V0TGlzdExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWQoKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW21vZGUsIHBhZ2VOYW1lLCByZWNvcmRJZCwgaXNOZXcsIHNlYXJjaCwgc3RhdHVzLCBjYXRlZ29yeSwgcGxhblR5cGUsIGZlYXR1cmVkLCBpc0ZlYXR1cmVkLCBpc1BvcHVsYXIsIHNvcnRCeSwgc29ydE9yZGVyLCBkaXNwbGF5ZWRGaWVsZHMuam9pbignLCcpXSk7XG5cbiAgY29uc3QgdXBkYXRlTGlzdFF1ZXJ5ID0gKHBhdGNoKSA9PiB7XG4gICAgY29uc3QgbmV4dFBhcmFtcyA9IHtcbiAgICAgIHNlYXJjaCxcbiAgICAgIHN0YXR1cyxcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgcGxhblR5cGUsXG4gICAgICBmZWF0dXJlZCxcbiAgICAgIGlzRmVhdHVyZWQsXG4gICAgICBpc1BvcHVsYXIsXG4gICAgICBzb3J0QnksXG4gICAgICBzb3J0T3JkZXIsXG4gICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRpc3BsYXllZEZpZWxkcy5qb2luKCcsJyksXG4gICAgICAuLi5wYXRjaCxcbiAgICB9O1xuXG4gICAgbmF2aWdhdGUoYnVpbGRBZG1pblBhdGgobG9jYXRpb24ucGF0aG5hbWUsIG5leHRQYXJhbXMpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAocGF0aCwgbmV4dFZhbHVlKSA9PiB7XG4gICAgc2V0UmVjb3JkKChjdXJyZW50KSA9PiB1cGRhdGVBdFBhdGgoY3VycmVudCwgcGF0aCwgbmV4dFZhbHVlKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkSXRlbSA9IChwYXRoLCBuZXh0SXRlbSkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gYXBwZW5kQXRQYXRoKGN1cnJlbnQsIHBhdGgsIG5leHRJdGVtKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlSXRlbSA9IChwYXRoKSA9PiB7XG4gICAgc2V0UmVjb3JkKChjdXJyZW50KSA9PiByZW1vdmVBdFBhdGgoY3VycmVudCwgcGF0aCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdmVJdGVtID0gKHBhdGgsIG9mZnNldCkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gbW92ZUF0UGF0aChjdXJyZW50LCBwYXRoLCBvZmZzZXQpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlSW50ZW50ID0gYXN5bmMgKGludGVudCkgPT4ge1xuICAgIGlmICghcmVjb3JkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0U2F2aW5nKHRydWUpO1xuICAgIHNldEVycm9yKCcnKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RQYWdlKHBhZ2VOYW1lLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgaW50ZW50LFxuICAgICAgICAgIHJlY29yZElkOiByZWNvcmQuaWQgPz8gbnVsbCxcbiAgICAgICAgICByZWNvcmQsXG4gICAgICAgICAgbmV3OiBpc05ldyA/ICcxJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocGF5bG9hZC5kcmFmdFJlY29yZCkge1xuICAgICAgICBjb25zdCBuZXh0RHJhZnRSZWNvcmQgPSBjbG9uZVZhbHVlKHBheWxvYWQuZHJhZnRSZWNvcmQpO1xuICAgICAgICBzZXRSZWNvcmQobmV4dERyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0T3JpZ2luYWxSZWNvcmQoY2xvbmVWYWx1ZShuZXh0RHJhZnRSZWNvcmQpKTtcbiAgICAgIH1cbiAgICAgIHNldFB1Ymxpc2hlZFJlY29yZChwYXlsb2FkLnB1Ymxpc2hlZFJlY29yZCA/IGNsb25lVmFsdWUocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQpIDogbnVsbCk7XG4gICAgICBpZiAoaW50ZW50ID09PSAndW5wdWJsaXNoJykge1xuICAgICAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcmVjb3JkSWQgJiYgcGF5bG9hZC5kcmFmdFJlY29yZD8uaWQpIHtcbiAgICAgICAgbmF2aWdhdGUoYnVpbGRBZG1pblBhdGgobG9jYXRpb24ucGF0aG5hbWUsIHsgcmVjb3JkSWQ6IHBheWxvYWQuZHJhZnRSZWNvcmQuaWQgfSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGF5bG9hZC5ub3RpY2UpIHtcbiAgICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcGF5bG9hZC5ub3RpY2UubWVzc2FnZSwgdHlwZTogcGF5bG9hZC5ub3RpY2UudHlwZSB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBheWxvYWQuZGVsZXRlZCkge1xuICAgICAgICBuYXZpZ2F0ZShgL2FkbWluL3BhZ2VzLyR7cGFnZU5hbWV9YCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAocmVxdWVzdEVycm9yKSB7XG4gICAgICBzZXRFcnJvcihyZXF1ZXN0RXJyb3IubWVzc2FnZSk7XG4gICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiByZXF1ZXN0RXJyb3IubWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0U2F2aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGlzY2FyZENoYW5nZXMgPSAoKSA9PiB7XG4gICAgc2V0UmVjb3JkKGdldEVtcHR5SXRlbShyZWNvcmQpKTtcbiAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ3JlYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IG5ldzogMSB9KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTGlzdEFjdGlvbiA9IGFzeW5jIChpbnRlbnQsIHRhcmdldFJlY29yZElkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGludGVudCxcbiAgICAgICAgICByZWNvcmRJZDogdGFyZ2V0UmVjb3JkSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcGF5bG9hZC5ub3RpY2U/Lm1lc3NhZ2UgPz8gYCR7ZGVmaW5pdGlvbi5sYWJlbH0gdXBkYXRlZC5gLCB0eXBlOiBwYXlsb2FkLm5vdGljZT8udHlwZSA/PyAnc3VjY2VzcycgfSk7XG5cbiAgICAgIGlmIChpbnRlbnQgPT09ICdkdXBsaWNhdGUnICYmIHBheWxvYWQuZHJhZnRSZWNvcmQ/LmlkKSB7XG4gICAgICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IHJlY29yZElkOiBwYXlsb2FkLmRyYWZ0UmVjb3JkLmlkIH0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW50ZW50ID09PSAnZGVsZXRlJykge1xuICAgICAgICBzZXRSZWNvcmRzKChjdXJyZW50KSA9PiBjdXJyZW50LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gdGFyZ2V0UmVjb3JkSWQpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChyZXF1ZXN0RXJyb3IpIHtcbiAgICAgIHNldEVycm9yKHJlcXVlc3RFcnJvci5tZXNzYWdlKTtcbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHJlcXVlc3RFcnJvci5tZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgIH1cbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICByZXR1cm4gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiPkNvbGxlY3Rpb24gZGVmaW5pdGlvbiBtaXNzaW5nLjwvTWVzc2FnZUJveD47XG4gIH1cblxuICBpZiAobW9kZSA9PT0gJ2xpc3QnKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMaXN0Vmlld1xuICAgICAgICBkZWZpbml0aW9uPXtkZWZpbml0aW9ufVxuICAgICAgICByZWNvcmRzPXtyZWNvcmRzfVxuICAgICAgICBjb250cm9scz17Y29udHJvbHMgPz8ge1xuICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGVmaW5pdGlvbi5saXN0Q29sdW1ucy5tYXAoKGNvbHVtbikgPT4gY29sdW1uLmZpZWxkKSxcbiAgICAgICAgICBhdmFpbGFibGVGaWVsZHM6IGRlZmluaXRpb24ubGlzdENvbHVtbnMsXG4gICAgICAgICAgZmlsdGVyczogW10sXG4gICAgICAgICAgYWN0aXZlRmlsdGVyczoge30sXG4gICAgICAgICAgc29ydEJ5OiAnJyxcbiAgICAgICAgICBzb3J0T3JkZXI6ICdkZXNjJyxcbiAgICAgICAgfX1cbiAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgIGxvYWRpbmc9e2xpc3RMb2FkaW5nfVxuICAgICAgICBvblNlYXJjaD17KG5leHRTZWFyY2gpID0+IHVwZGF0ZUxpc3RRdWVyeSh7IHNlYXJjaDogbmV4dFNlYXJjaCB9KX1cbiAgICAgICAgb25PcGVuUmVjb3JkPXsobmV4dFJlY29yZElkKSA9PiBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyByZWNvcmRJZDogbmV4dFJlY29yZElkIH0pKX1cbiAgICAgICAgb25DcmVhdGU9e2hhbmRsZUNyZWF0ZX1cbiAgICAgICAgb25TZXRTb3J0PXsoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXh0T3JkZXIgPSBjb250cm9scz8uc29ydEJ5ID09PSBmaWVsZCAmJiBjb250cm9scz8uc29ydE9yZGVyID09PSAnYXNjJyA/ICdkZXNjJyA6ICdhc2MnO1xuICAgICAgICAgIHVwZGF0ZUxpc3RRdWVyeSh7IHNvcnRCeTogZmllbGQsIHNvcnRPcmRlcjogbmV4dE9yZGVyIH0pO1xuICAgICAgICB9fVxuICAgICAgICBvblNldEZpbHRlcj17KGZpZWxkLCB2YWx1ZSkgPT4gdXBkYXRlTGlzdFF1ZXJ5KHsgW2ZpZWxkXTogdmFsdWUgfSl9XG4gICAgICAgIG9uUmVzZXRGaWx0ZXJzPXsoKSA9PiB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgIHN0YXR1czogJycsXG4gICAgICAgICAgY2F0ZWdvcnk6ICcnLFxuICAgICAgICAgIHBsYW5UeXBlOiAnJyxcbiAgICAgICAgICBmZWF0dXJlZDogJycsXG4gICAgICAgICAgaXNGZWF0dXJlZDogJycsXG4gICAgICAgICAgaXNQb3B1bGFyOiAnJyxcbiAgICAgICAgfSl9XG4gICAgICAgIG9uVG9nZ2xlRGlzcGxheWVkRmllbGQ9eyhmaWVsZCwgY2hlY2tlZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5leHRGaWVsZHMgPSBjaGVja2VkXG4gICAgICAgICAgICA/IFsuLi5uZXcgU2V0KFsuLi4oY29udHJvbHM/LmRpc3BsYXllZEZpZWxkcyA/PyBbXSksIGZpZWxkXSldXG4gICAgICAgICAgICA6IChjb250cm9scz8uZGlzcGxheWVkRmllbGRzID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGZpZWxkKTtcblxuICAgICAgICAgIHVwZGF0ZUxpc3RRdWVyeSh7XG4gICAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IG5leHRGaWVsZHMuam9pbignLCcpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9fVxuICAgICAgICBvblJlc2V0RGlzcGxheWVkRmllbGRzPXsoKSA9PiB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGVmaW5pdGlvbi5saXN0Q29sdW1ucy5tYXAoKGNvbHVtbikgPT4gY29sdW1uLmZpZWxkKS5qb2luKCcsJyksXG4gICAgICAgIH0pfVxuICAgICAgICBvbkR1cGxpY2F0ZVJlY29yZD17KHRhcmdldFJlY29yZElkKSA9PiBoYW5kbGVMaXN0QWN0aW9uKCdkdXBsaWNhdGUnLCB0YXJnZXRSZWNvcmRJZCl9XG4gICAgICAgIG9uRGVsZXRlUmVjb3JkPXsodGFyZ2V0UmVjb3JkSWQpID0+IGhhbmRsZUxpc3RBY3Rpb24oJ2RlbGV0ZScsIHRhcmdldFJlY29yZElkKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGlmICghcmVjb3JkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgPExvYWRlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEVkaXRWaWV3XG4gICAgICBkZWZpbml0aW9uPXtkZWZpbml0aW9ufVxuICAgICAgcmVjb3JkPXtyZWNvcmR9XG4gICAgICBwdWJsaXNoZWRSZWNvcmQ9e3B1Ymxpc2hlZFJlY29yZH1cbiAgICAgIGFjdGl2ZVRhYj17YWN0aXZlVGFifVxuICAgICAgb25Td2l0Y2hUYWI9e3NldEFjdGl2ZVRhYn1cbiAgICAgIHNhdmluZz17c2F2aW5nfVxuICAgICAgZXJyb3I9e2Vycm9yfVxuICAgICAgb25CYWNrPXsoKSA9PiBuYXZpZ2F0ZShgL2FkbWluL3BhZ2VzLyR7cGFnZU5hbWV9YCl9XG4gICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgb25BZGRJdGVtPXtoYW5kbGVBZGRJdGVtfVxuICAgICAgb25SZW1vdmVJdGVtPXtoYW5kbGVSZW1vdmVJdGVtfVxuICAgICAgb25Nb3ZlSXRlbT17aGFuZGxlTW92ZUl0ZW19XG4gICAgICBvblNhdmU9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ3NhdmUnKX1cbiAgICAgIG9uUHVibGlzaD17KCkgPT4gaGFuZGxlU2F2ZUludGVudCgncHVibGlzaCcpfVxuICAgICAgb25EZWxldGU9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ2RlbGV0ZScpfVxuICAgICAgb25EaXNjYXJkQ2hhbmdlcz17aGFuZGxlRGlzY2FyZENoYW5nZXN9XG4gICAgICBvblVucHVibGlzaD17KCkgPT4gaGFuZGxlU2F2ZUludGVudCgndW5wdWJsaXNoJyl9XG4gICAgICBjYW5TYXZlPXtjYW5TYXZlfVxuICAgICAgY2FuUHVibGlzaD17Y2FuUHVibGlzaH1cbiAgICAgIGNhbkRpc2NhcmQ9e2NhbkRpc2NhcmR9XG4gICAgICBjYW5VbnB1Ymxpc2g9e2NhblVucHVibGlzaH1cbiAgICAvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVBhcmFtcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgTG9hZGVyLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuY29uc3QgTVVMVElMSU5FX0ZJRUxEX1BBVFRFUk4gPSAvKGRlc2NyaXB0aW9ufGNvbnRlbnR8bWVzc2FnZXxib2R5fHN1YnRpdGxlfGV4Y2VycHR8aW50cm98aG91cnN8YWRkcmVzc3x0ZXh0fHBhcmFncmFwaHxvdmVydmlld3xjaGFsbGVuZ2V8cmVzdWx0KS9pO1xuY29uc3QgSU1BR0VfRklFTERfUEFUVEVSTiA9IC8oaW1hZ2V8YmFja2dyb3VuZHxsb2dvfHRodW1ibmFpbHxmZWF0dXJlZCkvaTtcbmNvbnN0IEZVTExfV0lEVEhfRklFTERfUEFUVEVSTiA9IC8oZGVzY3JpcHRpb258Y29udGVudHxtZXNzYWdlfGJvZHl8c3VidGl0bGV8ZXhjZXJwdHxpbnRyb3xvdmVydmlld3xjaGFsbGVuZ2V8cmVzdWx0fGJhY2tncm91bmR8aW1hZ2V8Z2FsbGVyeXxzZWN0aW9uc3x0ZXN0aW1vbmlhbHN8c2VydmljZXN8d2h5Q2hvb3NlSXRlbXN8ZmVhdHVyZUNoaXBzfHNvY2lhbExpbmtzfGZhcUl0ZW1zfGNvbXBhcmlzb25Sb3dzfGNvbXBhcmlzb25Db2x1bW5zfHN0b3J5UGFyYWdyYXBoc3xyZWxhdGVkV29ya3NwYWNlc3xjaGFsbGVuZ2VJdGVtc3xhbWVuaXRpZXN8bmF2aWdhdGlvbnxmb290ZXJ8Zm9ybSkvaTtcbmNvbnN0IFJFUVVJUkVEX0ZJRUxEX1BBVFRFUk4gPSAvKGhlcm9UaXRsZXxoZXJvU3VidGl0bGV8c3RvcnlUaXRsZXx3aHlDaG9vc2VUaXRsZXxhbWVuaXRpZXNUaXRsZXx0aXRsZSkkL2k7XG5cbmNvbnN0IFBBR0VfTEFZT1VUUyA9IHtcbiAgJ3NpdGUtc2V0dGluZ3MnOiBbXG4gICAgeyBmaWVsZHM6IFsnc2l0ZU5hbWUnLCAndGFnbGluZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdEVtYWlsJywgJ2NvbnRhY3RQaG9uZScsICdhZGRyZXNzJ10gfSxcbiAgICB7IGZpZWxkczogWydkZWZhdWx0U2VvVGl0bGUnLCAnZGVmYXVsdFNlb0Rlc2NyaXB0aW9uJ10gfSxcbiAgICB7IGZpZWxkczogWyduYXZpZ2F0aW9uJ10gfSxcbiAgICB7IGZpZWxkczogWydmb290ZXInXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NvY2lhbExpbmtzJ10gfSxcbiAgXSxcbiAgaG9tZXBhZ2U6IFtcbiAgICB7IGZpZWxkczogWydoZXJvJywgJ2ZlYXR1cmVDaGlwcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnc2VydmljZXNFeWVicm93JywgJ3NlcnZpY2VzS2lja2VyJywgJ3NlcnZpY2VzJ10gfSxcbiAgICB7IGZpZWxkczogWydhYm91dEhpZ2hsaWdodCddIH0sXG4gICAgeyBmaWVsZHM6IFsnd2h5Q2hvb3NlRXllYnJvdycsICd3aHlDaG9vc2VLaWNrZXInLCAnd2h5Q2hvb3NlVGl0bGUnLCAnd2h5Q2hvb3NlSXRlbXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Rlc3RpbW9uaWFsc0V5ZWJyb3cnLCAndGVzdGltb25pYWxzS2lja2VyJywgJ3Rlc3RpbW9uaWFsc1RpdGxlJywgJ3Rlc3RpbW9uaWFscyddIH0sXG4gICAgeyBmaWVsZHM6IFsnZ2FsbGVyeUV5ZWJyb3cnLCAnZ2FsbGVyeUtpY2tlcicsICdnYWxsZXJ5VGl0bGUnLCAnZ2FsbGVyeUltYWdlcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdEZvcm0nXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Zpc2l0VXNUaXRsZScsICdhZGRyZXNzTGFiZWwnLCAnZW1haWxMYWJlbCcsICdwaG9uZUxhYmVsJywgJ29wZW5Ib3Vyc0xhYmVsJywgJ3dlZWtkYXlIb3VycycsICd3ZWVrZW5kSG91cnMnLCAnbWFwQnV0dG9uTGFiZWwnXSB9LFxuICBdLFxuICAnYWJvdXQtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3N0b3J5VGl0bGUnLCAnc3RvcnlQYXJhZ3JhcGhzJywgJ3N0b3J5SW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3doeUNob29zZVRpdGxlJywgJ3doeUNob29zZUl0ZW1zJ10gfSxcbiAgICB7IGZpZWxkczogWydhbWVuaXRpZXNUaXRsZScsICdhbWVuaXRpZXNJbWFnZScsICdhbWVuaXRpZXMnXSB9LFxuICBdLFxuICAnYmxvZy1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnc2VhcmNoUGxhY2Vob2xkZXInLCAncXVpY2tTZWFyY2hUaXRsZScsICdyZWNlbnRQb3N0c1RpdGxlJywgJ2NhdGVnb3JpZXNUaXRsZScsICdwb3B1bGFyVGFnc1RpdGxlJywgJ25vUmVzdWx0c1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2RldGFpbEJhY2tMYWJlbCcsICdkZXRhaWxTZWFyY2hUaXRsZScsICdkZXRhaWxTZWFyY2hCdXR0b25MYWJlbCcsICdkZXRhaWxQb3B1bGFyVGFnc1RpdGxlJywgJ2RldGFpbFJlY2VudFBvc3RzVGl0bGUnLCAnZGV0YWlsUmVsYXRlZFdvcmtzcGFjZXNUaXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnZGV0YWlsQ29tbWVudEZvcm0nXSB9LFxuICAgIHsgZmllbGRzOiBbJ3JlbGF0ZWRXb3Jrc3BhY2VzJ10gfSxcbiAgXSxcbiAgJ3ByaWNpbmctcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbXBhcmlzb25UaXRsZScsICdmZWF0dXJlTGlzdFRpdGxlJywgJ2ZlYXR1cmVMaXN0U3VidGl0bGUnLCAnY29tcGFyaXNvbkNvbHVtbnMnLCAnY29tcGFyaXNvblJvd3MnLCAncmVjb21tZW5kZWRMYWJlbCcsICdwdXJjaGFzZUJ1dHRvbkxhYmVsJ10gfSxcbiAgICB7IGZpZWxkczogWydmYXFUaXRsZScsICdmYXFTdWJ0aXRsZScsICdmYXFJdGVtcyddIH0sXG4gIF0sXG4gICdmYXEtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydleWVicm93JywgJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZScsICd0aXRsZScsICdkZXNjcmlwdGlvbiddIH0sXG4gICAgeyBmaWVsZHM6IFsnc2VhcmNoUGxhY2Vob2xkZXInLCAnbm9SZXN1bHRzVGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnY3RhVGl0bGUnLCAnY3RhRGVzY3JpcHRpb24nLCAnY3RhQnV0dG9uTGFiZWwnXSB9LFxuICBdLFxuICAnbWVldGluZy1yb29tcy1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsncm9vbXNUaXRsZScsICdyb29tc1N1YnRpdGxlJywgJ2Jvb2tOb3dMYWJlbCcsICdyZWFkTW9yZUxhYmVsJywgJ3BvcHVsYXJMYWJlbCddIH0sXG4gICAgeyBmaWVsZHM6IFsncGxhbnNUaXRsZScsICdwbGFuc1N1YnRpdGxlJywgJ2dldFN0YXJ0ZWRMYWJlbCddIH0sXG4gICAgeyBmaWVsZHM6IFsnYW1lbml0aWVzVGl0bGUnLCAnYW1lbml0aWVzU3VidGl0bGUnLCAnYW1lbml0aWVzJ10gfSxcbiAgXSxcbiAgJ3ZpcnR1YWwtb2ZmaWNlLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydvdmVydmlld1RpdGxlJywgJ292ZXJ2aWV3VGV4dCcsICdmZWF0dXJlZEltYWdlJywgJ2dhbGxlcnlJbWFnZXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NoYWxsZW5nZVRpdGxlJywgJ2NoYWxsZW5nZUludHJvJywgJ2NoYWxsZW5nZUl0ZW1zJ10gfSxcbiAgICB7IGZpZWxkczogWydyZXN1bHRUaXRsZScsICdyZXN1bHRUZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydjdGFUaXRsZScsICdjdGFEZXNjcmlwdGlvbicsICdjdGFCdXR0b25MYWJlbCddIH0sXG4gICAgeyBmaWVsZHM6IFsncHJvamVjdEluZm9UaXRsZScsICdwcm9qZWN0RGF0ZUxhYmVsJywgJ3Byb2plY3REYXRlVmFsdWUnLCAncHJvamVjdFdlYnNpdGVMYWJlbCcsICdwcm9qZWN0V2Vic2l0ZVZhbHVlJywgJ3Byb2plY3RDYXRlZ29yeUxhYmVsJywgJ3Byb2plY3RDYXRlZ29yeVZhbHVlJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0Rm9ybSddIH0sXG4gIF0sXG4gICdjb250YWN0LXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydpbnRyb0V5ZWJyb3cnLCAnaW50cm9UaXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnYWRkcmVzc0NhcmRUaXRsZScsICdwaG9uZUNhcmRUaXRsZScsICdlbWFpbENhcmRUaXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnZm9ybSddIH0sXG4gICAgeyBmaWVsZHM6IFsnbWFwVGl0bGUnLCAnbWFwRGVzY3JpcHRpb24nXSB9LFxuICBdLFxuICAncHJpdmFjeS1wb2xpY3ktcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJ10gfSxcbiAgICB7IGZpZWxkczogWydlZmZlY3RpdmVEYXRlTGFiZWwnLCAnZWZmZWN0aXZlRGF0ZVZhbHVlJywgJ2ludHJvVGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnc2VjdGlvbnMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RUaXRsZScsICdjb250YWN0Qm9keScsICdjb250YWN0QnV0dG9uTGFiZWwnXSB9LFxuICBdLFxuICAndGVybXMtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJ10gfSxcbiAgICB7IGZpZWxkczogWydlZmZlY3RpdmVEYXRlTGFiZWwnLCAnZWZmZWN0aXZlRGF0ZVZhbHVlJywgJ2ludHJvVGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnc2VjdGlvbnMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RUaXRsZScsICdjb250YWN0Qm9keScsICdjb250YWN0QnV0dG9uTGFiZWwnXSB9LFxuICBdLFxufTtcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLWVkaXRvciB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDMycHggNDBweCA2NHB4IDM0NHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLWVkaXRvcl9faW5uZXIge1xuICBtYXgtd2lkdGg6IDEyNDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5hZG1pbi1iYWNrIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbn1cblxuLmFkbWluLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLmFkbWluLW1ldGEge1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xuICBjb2xvcjogIzY2NjY4NztcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4uYWRtaW4tdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMi4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tc3RhdHVzIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgbWFyZ2luLXRvcDogMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2M2ZjBjMjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZWZmZmVkO1xuICBjb2xvcjogIzJmNjg0NjtcbiAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYWRtaW4ta2ViYWIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi10YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWFlZjtcbn1cblxuLmFkbWluLXRhYiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMCAwIDEycHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi10YWItLWFjdGl2ZSB7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tdGFiLS1hY3RpdmU6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogLTFweDtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxZnIpIDIzMnB4O1xuICBnYXA6IDE2cHg7XG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcbn1cblxuLmFkbWluLW1haW4tY2FyZCxcbi5hZG1pbi1zaWRlLWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xufVxuXG4uYWRtaW4tbWFpbi1jYXJkIHtcbiAgcGFkZGluZzogMjRweDtcbn1cblxuLmFkbWluLXNlY3Rpb24gKyAuYWRtaW4tc2VjdGlvbiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5hZG1pbi1maWVsZC1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xuICBnYXA6IDIwcHggMjRweDtcbn1cblxuLmFkbWluLWZpZWxkIHtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uYWRtaW4tZmllbGQtLWZ1bGwge1xuICBncmlkLWNvbHVtbjogMSAvIC0xO1xufVxuXG4uYWRtaW4tbGFiZWwge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAycHg7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5hZG1pbi1sYWJlbF9fcmVxdWlyZWQge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cblxuLmFkbWluLWlucHV0LFxuLmFkbWluLXRleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmFkbWluLWlucHV0IHtcbiAgbWluLWhlaWdodDogMi41cmVtO1xufVxuXG4uYWRtaW4taW5wdXQ6Zm9jdXMsXG4uYWRtaW4tdGV4dGFyZWE6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDFweCAjNDk0NWZmO1xufVxuXG4uYWRtaW4taW5wdXQ6ZGlzYWJsZWQsXG4uYWRtaW4tdGV4dGFyZWE6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLXRleHRhcmVhIHtcbiAgbWluLWhlaWdodDogNS43NXJlbTtcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcbn1cblxuLmFkbWluLW1lZGlhIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX2NhbnZhcyB7XG4gIG1pbi1oZWlnaHQ6IDE0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX2VtcHR5IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWFfX3N0YWNrIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fdGh1bWIge1xuICBtYXgtd2lkdGg6IDI0MHB4O1xuICBtYXgtaGVpZ2h0OiAxNDBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuLmFkbWluLW1lZGlhX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fYWN0aW9uIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tbWVkaWFfX2FjdGlvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uYWRtaW4tbWVkaWFfX2ZpbGVuYW1lIHtcbiAgbWF4LXdpZHRoOiAyODBweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uYWRtaW4tbWVkaWFfX3NvdXJjZSB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b24ge1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLW1lZGlhX19lcnJvciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xufVxuXG4uYWRtaW4tb2JqZWN0IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uYWRtaW4tb2JqZWN0X190aXRsZSB7XG4gIG1hcmdpbjogMCAwIDEycHg7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHggMTBweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fY291bnQge1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbSArIC5hZG1pbi1yZXBlYXRhYmxlX19pdGVtIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtLS1kcmFnLW92ZXIgc3VtbWFyeSB7XG4gIGJhY2tncm91bmQ6ICNmMGYwZmY7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtW29wZW5dIHN1bW1hcnkge1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZiO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeSB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnk6Oi13ZWJraXQtZGV0YWlscy1tYXJrZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeS1sZWZ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19idWxsZXQge1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogI2YwZjBmNTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjYyNXJlbTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX25hbWUge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbiB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZSB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IGdyYWI7XG4gIHBhZGRpbmc6IDAgMnB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGU6YWN0aXZlIHtcbiAgY3Vyc29yOiBncmFiYmluZztcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmRpc2FibGVkIHtcbiAgY29sb3I6ICNjNGM0ZDI7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQ6ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQ6ZGlzYWJsZWQge1xuICBjb2xvcjogIzhlOGVhOTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2JvZHkge1xuICBwYWRkaW5nOiAxNnB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1zd2l0Y2gge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAuNjI1cmVtIDAuODc1cmVtO1xufVxuXG4uYWRtaW4tc3dpdGNoIGlucHV0IHtcbiAgYWNjZW50LWNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tc3dpdGNoOmhhcyhpbnB1dDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4Nztcbn1cblxuLmFkbWluLXNpZGUtY2FyZCArIC5hZG1pbi1zaWRlLWNhcmQge1xuICBtYXJnaW4tdG9wOiAxMnB4O1xufVxuXG4uYWRtaW4tc2lkZS1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5hZG1pbi1zaWRlLWNhcmRfX2JvZHkge1xuICBwYWRkaW5nOiAwIDEycHggMTJweDtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLFxuLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbn1cblxuLmFkbWluLXNpZGUtYnV0dG9uLS1tZW51IHtcbiAgd2lkdGg6IDJyZW07XG4gIGZsZXg6IDAgMCAycmVtO1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgKyA4cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDIyMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4xMik7XG4gIHBhZGRpbmc6IDhweCAwO1xuICB6LWluZGV4OiA0MDtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXIge1xuICBjb2xvcjogI2QwMmIyMDtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxMTgwcHgpIHtcbiAgLmFkbWluLWxheW91dCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1lZGl0b3Ige1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0OHB4O1xuICB9XG5cbiAgLmFkbWluLWZpZWxkLWdyaWQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5gO1xuXG5mdW5jdGlvbiB0b0xhYmVsKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVcbiAgICAucmVwbGFjZSgvKFthLXowLTldKShbQS1aXSkvZywgJyQxICQyJylcbiAgICAucmVwbGFjZSgvW18tXSsvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXGJzZW9cXGIvZ2ksICdTRU8nKVxuICAgIC5yZXBsYWNlKC9cXGJjdGFcXGIvZ2ksICdDVEEnKVxuICAgIC5yZXBsYWNlKC9cXGJmYXFcXGIvZ2ksICdGQVEnKVxuICAgIC5yZXBsYWNlKC9cXGJpZFxcYi9naSwgJ0lEJylcbiAgICAucmVwbGFjZSgvXFxidXJsXFxiL2dpLCAnVVJMJylcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgLnRyaW0oKVxuICAgIC5yZXBsYWNlKC9eLi8sICh2YWx1ZSkgPT4gdmFsdWUudG9VcHBlckNhc2UoKSk7XG59XG5cbmZ1bmN0aW9uIGNsb25lVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gdG9Db21wYXJhYmxlVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoaXRlbSkgPT4gdG9Db21wYXJhYmxlVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKVxuICAgICAgLnNvcnQoKVxuICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09ICdfX3RlbXBJZCcpXG4gICAgICAucmVkdWNlKChhY2N1bXVsYXRvciwga2V5KSA9PiB7XG4gICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZVtrZXldKTtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBoYXNNZWFuaW5nZnVsVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNvbWUoKGl0ZW0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModmFsdWUpXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4ga2V5ICE9PSAnX190ZW1wSWQnKVxuICAgICAgLnNvbWUoKFssIG5lc3RlZFZhbHVlXSkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKG5lc3RlZFZhbHVlKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlICE9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlbmFtZSh1cmwpIHtcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRobmFtZSA9IG5ldyBVUkwodXJsKS5wYXRobmFtZTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGhuYW1lLnNwbGl0KCcvJykucG9wKCk7XG4gICAgcmV0dXJuIGZpbGVuYW1lIHx8IHVybDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVybC5zcGxpdCgnLycpLnBvcCgpIHx8IHVybDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFbXB0eUl0ZW0oc2FtcGxlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNhbXBsZSkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoc2FtcGxlICYmIHR5cGVvZiBzYW1wbGUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIE9iamVjdC5rZXlzKHNhbXBsZSlcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09ICdpZCcpXG4gICAgICAgIC5tYXAoKGtleSkgPT4gW2tleSwgZ2V0RW1wdHlJdGVtKHNhbXBsZVtrZXldKV0pLFxuICAgICk7XG4gIH1cblxuICBpZiAodHlwZW9mIHNhbXBsZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzYW1wbGUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0UGF0aCh2YWx1ZSwgcGF0aCwgbmV4dFZhbHVlKSB7XG4gIGlmICghcGF0aC5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV4dFZhbHVlO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gdXBkYXRlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRWYWx1ZSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoKSB7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUuZmlsdGVyKChfLCBpbmRleCkgPT4gaW5kZXggIT09IHBhdGhbMF0pO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gcmVtb3ZlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEF0UGF0aCh2YWx1ZSwgcGF0aCwgbmV4dEl0ZW0pIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBbLi4uKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSksIG5leHRJdGVtXTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IGFwcGVuZEF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0LCBuZXh0SXRlbSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gbW92ZUF0UGF0aCh2YWx1ZSwgcGF0aCwgb2Zmc2V0KSB7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IHBhdGhbMF07XG4gICAgY29uc3QgbmV4dEluZGV4ID0gaW5kZXggKyBvZmZzZXQ7XG5cbiAgICBpZiAobmV4dEluZGV4IDwgMCB8fCBuZXh0SW5kZXggPj0gdmFsdWUubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgY2xvbmUgPSBbLi4udmFsdWVdO1xuICAgIGNvbnN0IFttb3ZlZF0gPSBjbG9uZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGNsb25lLnNwbGljZShuZXh0SW5kZXgsIDAsIG1vdmVkKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSBtb3ZlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG9mZnNldCk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gcGFyc2VJbnB1dFZhbHVlKG5leHRSYXdWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIGlmIChuZXh0UmF3VmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobmV4dFJhd1ZhbHVlKTtcbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZCkgPyBjdXJyZW50VmFsdWUgOiBwYXJzZWQ7XG4gIH1cblxuICByZXR1cm4gbmV4dFJhd1ZhbHVlO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTWVkaWFQcmV2aWV3VXJsKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3QgdHJpbW1lZCA9IHZhbHVlLnRyaW0oKTtcblxuICBpZiAoIXRyaW1tZWQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoL15odHRwcz86XFwvXFwvL2kudGVzdCh0cmltbWVkKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2UvJykpIHtcbiAgICByZXR1cm4gdHJpbW1lZDtcbiAgfVxuXG4gIGlmICh0cmltbWVkLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgIHJldHVybiB0cmltbWVkO1xuICB9XG5cbiAgcmV0dXJuIGAvJHt0cmltbWVkLnJlcGxhY2UoL15cXC4/XFwvLywgJycpfWA7XG59XG5cbmZ1bmN0aW9uIHRvQWRtaW5FcnJvck1lc3NhZ2UoZXJyb3IsIGZhbGxiYWNrKSB7XG4gIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGVycm9yPy5yZXNwb25zZT8uZGF0YTtcblxuICBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YT8ubWVzc2FnZSA9PT0gJ3N0cmluZycgJiYgcmVzcG9uc2VEYXRhLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlRGF0YS5tZXNzYWdlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZXNwb25zZURhdGE/LmVycm9yID09PSAnc3RyaW5nJyAmJiByZXNwb25zZURhdGEuZXJyb3IudHJpbSgpKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlRGF0YS5lcnJvcjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXJyb3I/Lm1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIGVycm9yLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgcmV0dXJuIGVycm9yLm1lc3NhZ2U7XG4gIH1cblxuICByZXR1cm4gZmFsbGJhY2s7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwbG9hZEFkbWluSW1hZ2UoZmlsZSkge1xuICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL21lZGlhL3VwbG9hZCcsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBmb3JtRGF0YSxcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSk7XG5cbiAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQuZXJyb3IgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gIH1cblxuICBjb25zdCB1cGxvYWRlZFVybCA9IHBheWxvYWQ/LnVybCB8fCBwYXlsb2FkPy5pdGVtPy5yZWxhdGl2ZVVybCB8fCBwYXlsb2FkPy5pdGVtPy51cmw7XG5cbiAgaWYgKCF1cGxvYWRlZFVybCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVXBsb2FkIHN1Y2NlZWRlZCBidXQgcmV0dXJuZWQgbm8gVVJMLicpO1xuICB9XG5cbiAgcmV0dXJuIHVwbG9hZGVkVXJsO1xufVxuXG5mdW5jdGlvbiBpc1JlcXVpcmVkRmllbGQoZmllbGRLZXkpIHtcbiAgcmV0dXJuIFJFUVVJUkVEX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSk7XG59XG5cbmZ1bmN0aW9uIGZpZWxkQ2xhc3NOYW1lKGZpZWxkS2V5LCB2YWx1ZSkge1xuICByZXR1cm4gRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGRLZXkpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXG4gICAgPyAnYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGwnXG4gICAgOiAnYWRtaW4tZmllbGQnO1xufVxuXG5mdW5jdGlvbiBnZXRJdGVtVGl0bGUoaXRlbSwgZmFsbGJhY2tMYWJlbCwgaW5kZXgpIHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGl0ZW0pKSB7XG4gICAgcmV0dXJuIGAke2ZhbGxiYWNrTGFiZWx9ICR7aW5kZXggKyAxfWA7XG4gIH1cblxuICBjb25zdCBwcmVmZXJyZWQgPSBbXG4gICAgaXRlbS50aXRsZSxcbiAgICBpdGVtLm5hbWUsXG4gICAgaXRlbS5sYWJlbCxcbiAgICBpdGVtLnF1ZXN0aW9uLFxuICAgIGl0ZW0uZmVhdHVyZSxcbiAgICBpdGVtLnBhdGgsXG4gICAgaXRlbS5ocmVmLFxuICAgIGl0ZW0uYWx0LFxuICBdLmZpbmQoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRyaW0oKSk7XG5cbiAgcmV0dXJuIHByZWZlcnJlZCB8fCBgJHtmYWxsYmFja0xhYmVsfSAke2luZGV4ICsgMX1gO1xufVxuXG5mdW5jdGlvbiBidWlsZFNlY3Rpb25zKHBhZ2VOYW1lLCBjb250ZW50KSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhjb250ZW50ID8/IHt9KTtcbiAgY29uc3QgbGF5b3V0ID0gUEFHRV9MQVlPVVRTW3BhZ2VOYW1lXTtcblxuICBpZiAoIWxheW91dCkge1xuICAgIHJldHVybiBbeyBlbnRyaWVzIH1dO1xuICB9XG5cbiAgY29uc3QgdXNlZCA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgc2VjdGlvbnMgPSBsYXlvdXRcbiAgICAubWFwKChzZWN0aW9uKSA9PiB7XG4gICAgICBjb25zdCBzZWN0aW9uRW50cmllcyA9IHNlY3Rpb24uZmllbGRzXG4gICAgICAgIC5maWx0ZXIoKGZpZWxkKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29udGVudCA/PyB7fSwgZmllbGQpKVxuICAgICAgICAubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIHVzZWQuYWRkKGZpZWxkKTtcbiAgICAgICAgICByZXR1cm4gW2ZpZWxkLCBjb250ZW50W2ZpZWxkXV07XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4geyAuLi5zZWN0aW9uLCBlbnRyaWVzOiBzZWN0aW9uRW50cmllcyB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigoc2VjdGlvbikgPT4gc2VjdGlvbi5lbnRyaWVzLmxlbmd0aCA+IDApO1xuXG4gIGNvbnN0IGV4dHJhRW50cmllcyA9IGVudHJpZXMuZmlsdGVyKChbZmllbGRLZXldKSA9PiAhdXNlZC5oYXMoZmllbGRLZXkpKTtcblxuICBpZiAoZXh0cmFFbnRyaWVzLmxlbmd0aCkge1xuICAgIHNlY3Rpb25zLnB1c2goeyBlbnRyaWVzOiBleHRyYUVudHJpZXMgfSk7XG4gIH1cblxuICByZXR1cm4gc2VjdGlvbnM7XG59XG5cbmZ1bmN0aW9uIFByaW1pdGl2ZUZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBsYWJlbCA9IHRvTGFiZWwoZmllbGRLZXkpO1xuICBjb25zdCBpbnB1dFZhbHVlID0gdmFsdWUgPz8gJyc7XG4gIGNvbnN0IHJlcXVpcmVkID0gaXNSZXF1aXJlZEZpZWxkKGZpZWxkS2V5KTtcbiAgY29uc3QgaXNJbWFnZUZpZWxkID0gdHlwZW9mIGlucHV0VmFsdWUgPT09ICdzdHJpbmcnICYmIElNQUdFX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSk7XG4gIGNvbnN0IHByZXZpZXdVcmwgPSBpc0ltYWdlRmllbGQgPyByZXNvbHZlTWVkaWFQcmV2aWV3VXJsKGlucHV0VmFsdWUpIDogJyc7XG4gIGNvbnN0IHNob3dQcmV2aWV3ID0gQm9vbGVhbihwcmV2aWV3VXJsKTtcbiAgY29uc3QgZmlsZUlucHV0UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbdXBsb2FkaW5nLCBzZXRVcGxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdXBsb2FkRXJyb3IsIHNldFVwbG9hZEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2ZpZWxkQ2xhc3NOYW1lKGZpZWxkS2V5LCB2YWx1ZSl9PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAge3JlcXVpcmVkID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXN3aXRjaFwiPlxuICAgICAgICAgIDxzcGFuPnt2YWx1ZSA/ICdFbmFibGVkJyA6ICdEaXNhYmxlZCd9PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgZXZlbnQudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChpc0ltYWdlRmllbGQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAge3JlcXVpcmVkID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fY2FudmFzXCI+XG4gICAgICAgICAgICB7c2hvd1ByZXZpZXcgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3N0YWNrXCI+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fdGh1bWJcIiBzcmM9e3ByZXZpZXdVcmx9IGFsdD17bGFiZWx9IC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4ocHJldmlld1VybCwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIOKGl1xuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gd2luZG93LnByb21wdChgVXBkYXRlICR7bGFiZWx9IFVSTGAsIGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0VmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHBhdGgsIG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICDinI5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2UocGF0aCwgJycpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICDinJVcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2ZpbGVuYW1lXCI+e2dldEZpbGVuYW1lKGlucHV0VmFsdWUpfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2VtcHR5XCI+UGFzdGUgYW4gaW1hZ2UgVVJMIGJlbG93IHRvIGF0dGFjaCBtZWRpYS48L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc291cmNlXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4taW5wdXRcIlxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtpbnB1dFZhbHVlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImh0dHBzOi8vLi4uXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b25cIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCB1cGxvYWRpbmd9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZmlsZUlucHV0UmVmLmN1cnJlbnQ/LmNsaWNrKCl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dXBsb2FkaW5nID8gJ1VwbG9hZGluZy4uLicgOiAnVXBsb2FkIGZyb20gY29tcHV0ZXInfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgcmVmPXtmaWxlSW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXthc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRmlsZSA9IGV2ZW50LnRhcmdldC5maWxlcz8uWzBdO1xuICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWRGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGxvYWRlZFVybCA9IGF3YWl0IHVwbG9hZEFkbWluSW1hZ2Uoc2VsZWN0ZWRGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UocGF0aCwgdXBsb2FkZWRVcmwpO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt1cGxvYWRFcnJvciA/IDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2Vycm9yXCI+e3VwbG9hZEVycm9yfTwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2ZpZWxkQ2xhc3NOYW1lKGZpZWxkS2V5LCB2YWx1ZSl9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgICAge3JlcXVpcmVkID8gPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxfX3JlcXVpcmVkXCI+Kjwvc3Bhbj4gOiBudWxsfVxuICAgICAgPC9sYWJlbD5cbiAgICAgIHtNVUxUSUxJTkVfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkS2V5KSA/IChcbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tdGV4dGFyZWFcIlxuICAgICAgICAgIHZhbHVlPXtpbnB1dFZhbHVlfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBwYXJzZUlucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlLCB2YWx1ZSkpfVxuICAgICAgICAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4taW5wdXRcIlxuICAgICAgICAgIHR5cGU9e3R5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyAnbnVtYmVyJyA6ICd0ZXh0J31cbiAgICAgICAgICB2YWx1ZT17aW5wdXRWYWx1ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UocGF0aCwgcGFyc2VJbnB1dFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSwgdmFsdWUpKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIE9iamVjdEZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHZhbHVlID8/IHt9KS5maWx0ZXIoKFtuZXN0ZWRLZXldKSA9PiBuZXN0ZWRLZXkgIT09ICdpZCcpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1vYmplY3RcIj5cbiAgICAgICAgPGg0IGNsYXNzTmFtZT1cImFkbWluLW9iamVjdF9fdGl0bGVcIj57dG9MYWJlbChmaWVsZEtleSl9PC9oND5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAge2VudHJpZXMubWFwKChbbmVzdGVkS2V5LCBuZXN0ZWRWYWx1ZV0pID0+IChcbiAgICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICAgIGtleT17YCR7ZmllbGRLZXl9LSR7bmVzdGVkS2V5fWB9XG4gICAgICAgICAgICAgIGZpZWxkS2V5PXtuZXN0ZWRLZXl9XG4gICAgICAgICAgICAgIHZhbHVlPXtuZXN0ZWRWYWx1ZX1cbiAgICAgICAgICAgICAgcGF0aD17Wy4uLnBhdGgsIG5lc3RlZEtleV19XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgb25BZGRJdGVtPXtvbkFkZEl0ZW19XG4gICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBBcnJheUZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSB0b0xhYmVsKGZpZWxkS2V5KTtcbiAgY29uc3Qgc2FtcGxlID0gdmFsdWVbMF0gPz8gJyc7XG4gIGNvbnN0IFtkcmFnSW5kZXgsIHNldERyYWdJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2RyYWdPdmVySW5kZXgsIHNldERyYWdPdmVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2hlYWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX190aXRsZVwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fY291bnRcIj57dmFsdWUubGVuZ3RofSBlbnRyeXt2YWx1ZS5sZW5ndGggPT09IDEgPyAnJyA6ICdpZXMnfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7dmFsdWUubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxkZXRhaWxzXG4gICAgICAgICAgICBrZXk9e2Ake2ZpZWxkS2V5fS0ke2luZGV4fWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yZXBlYXRhYmxlX19pdGVtJHtkcmFnT3ZlckluZGV4ID09PSBpbmRleCA/ICcgYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyJyA6ICcnfWB9XG4gICAgICAgICAgICBvcGVuPXtpbmRleCA9PT0gMH1cbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaWYgKGRyYWdPdmVySW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyb3A9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQgfHwgZHJhZ0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gaW5kZXggLSBkcmFnSW5kZXg7XG4gICAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgICAgICAgICAgICBvbk1vdmVJdGVtKFsuLi5wYXRoLCBkcmFnSW5kZXhdLCBvZmZzZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldERyYWdJbmRleChudWxsKTtcbiAgICAgICAgICAgICAgc2V0RHJhZ092ZXJJbmRleChudWxsKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRyYWdMZWF2ZT17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19idWxsZXRcIj7ilrw8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fbmFtZVwiPntnZXRJdGVtVGl0bGUoaXRlbSwgbGFiZWwsIGluZGV4KX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19pY29uLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtKFsuLi5wYXRoLCBpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIPCfl5FcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZT17IWRpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEcmFnIHRvIHJlb3JkZXJcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyhpbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICDii67ii65cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3N1bW1hcnk+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2JvZHlcIj5cbiAgICAgICAgICAgICAge2lzUGxhaW5PYmplY3QoaXRlbSkgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoW25lc3RlZEtleV0pID0+IG5lc3RlZEtleSAhPT0gJ2lkJylcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoW25lc3RlZEtleSwgbmVzdGVkVmFsdWVdKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPEZpZWxkUmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YCR7ZmllbGRLZXl9LSR7aW5kZXh9LSR7bmVzdGVkS2V5fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEtleT17bmVzdGVkS2V5fVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25lc3RlZFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aD17Wy4uLnBhdGgsIGluZGV4LCBuZXN0ZWRLZXldfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25BZGRJdGVtPXtvbkFkZEl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZUl0ZW09e29uUmVtb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW92ZUl0ZW09e29uTW92ZUl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPFByaW1pdGl2ZUZpZWxkXG4gICAgICAgICAgICAgICAgICBmaWVsZEtleT17YCR7ZmllbGRLZXl9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtfVxuICAgICAgICAgICAgICAgICAgcGF0aD17Wy4uLnBhdGgsIGluZGV4XX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICApKX1cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fYWRkXCJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25BZGRJdGVtKHBhdGgsIGdldEVtcHR5SXRlbShzYW1wbGUpKX1cbiAgICAgICAgPlxuICAgICAgICAgICsgQWRkIGFuIGVudHJ5XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEZpZWxkUmVuZGVyZXIocHJvcHMpIHtcbiAgY29uc3QgeyB2YWx1ZSB9ID0gcHJvcHM7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIDxBcnJheUZpZWxkIHsuLi5wcm9wc30gLz47XG4gIH1cblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gPE9iamVjdEZpZWxkIHsuLi5wcm9wc30gLz47XG4gIH1cblxuICByZXR1cm4gPFByaW1pdGl2ZUZpZWxkIHsuLi5wcm9wc30gLz47XG59XG5cbmZ1bmN0aW9uIEZvcm1TZWN0aW9uKHsgZW50cmllcywgb25DaGFuZ2UsIG9uQWRkSXRlbSwgb25SZW1vdmVJdGVtLCBvbk1vdmVJdGVtLCBkaXNhYmxlZCB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zZWN0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkLWdyaWRcIj5cbiAgICAgICAge2VudHJpZXMubWFwKChbZmllbGRLZXksIHZhbHVlXSkgPT4gKFxuICAgICAgICAgIDxGaWVsZFJlbmRlcmVyXG4gICAgICAgICAgICBrZXk9e2ZpZWxkS2V5fVxuICAgICAgICAgICAgZmllbGRLZXk9e2ZpZWxkS2V5fVxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgcGF0aD17W2ZpZWxkS2V5XX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgIG9uQWRkSXRlbT17b25BZGRJdGVtfVxuICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19XG4gICAgICAgICAgICBvbk1vdmVJdGVtPXtvbk1vdmVJdGVtfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIC8+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbnRlbnRQYWdlRWRpdG9yKCkge1xuICBjb25zdCB7IHBhZ2VOYW1lIH0gPSB1c2VQYXJhbXMoKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYWdlTGFiZWwsIHNldFBhZ2VMYWJlbF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtjb250ZW50LCBzZXRDb250ZW50XSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW29yaWdpbmFsQ29udGVudCwgc2V0T3JpZ2luYWxDb250ZW50XSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3B1Ymxpc2hlZENvbnRlbnQsIHNldFB1Ymxpc2hlZENvbnRlbnRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZSgnZHJhZnQnKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFttZW51T3Blbiwgc2V0TWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBhZGROb3RpY2UgPSB1c2VOb3RpY2UoKTtcbiAgY29uc3QgbWVudVJlZiA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCBkaXNwbGF5ZWRDb250ZW50ID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoYWN0aXZlVGFiID09PSAncHVibGlzaGVkJyAmJiBwdWJsaXNoZWRDb250ZW50ID8gcHVibGlzaGVkQ29udGVudCA6IGNvbnRlbnQpLFxuICAgIFthY3RpdmVUYWIsIGNvbnRlbnQsIHB1Ymxpc2hlZENvbnRlbnRdLFxuICApO1xuICBjb25zdCBpc1B1Ymxpc2hlZFZpZXcgPSBhY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnICYmIHB1Ymxpc2hlZENvbnRlbnQ7XG4gIGNvbnN0IGlzRGlydHkgPSB1c2VNZW1vKFxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KHRvQ29tcGFyYWJsZVZhbHVlKGNvbnRlbnQpKSAhPT0gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUob3JpZ2luYWxDb250ZW50KSksXG4gICAgW2NvbnRlbnQsIG9yaWdpbmFsQ29udGVudF0sXG4gICk7XG4gIGNvbnN0IGhhc0RyYWZ0Q29udGVudCA9IHVzZU1lbW8oKCkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKGNvbnRlbnQpLCBbY29udGVudF0pO1xuICBjb25zdCBjYW5TYXZlID0gIWlzUHVibGlzaGVkVmlldyAmJiAhc2F2aW5nICYmIGlzRGlydHk7XG4gIGNvbnN0IGNhblB1Ymxpc2ggPSAhaXNQdWJsaXNoZWRWaWV3ICYmICFzYXZpbmcgJiYgKHB1Ymxpc2hlZENvbnRlbnQgPyBpc0RpcnR5IDogaGFzRHJhZnRDb250ZW50KTtcbiAgY29uc3QgY2FuRGlzY2FyZCA9ICFzYXZpbmcgJiYgIWlzUHVibGlzaGVkVmlldyAmJiBoYXNEcmFmdENvbnRlbnQ7XG4gIGNvbnN0IGNhblVucHVibGlzaCA9ICFzYXZpbmcgJiYgQm9vbGVhbihwdWJsaXNoZWRDb250ZW50KTtcbiAgY29uc3Qgc2VjdGlvbnMgPSB1c2VNZW1vKCgpID0+IGJ1aWxkU2VjdGlvbnMocGFnZU5hbWUsIGRpc3BsYXllZENvbnRlbnQpLCBbcGFnZU5hbWUsIGRpc3BsYXllZENvbnRlbnRdKTtcbiAgY29uc3QgZW50cnlUaXRsZSA9IHVzZU1lbW8oKCkgPT4gKFxuICAgIGRpc3BsYXllZENvbnRlbnQ/Lmhlcm9UaXRsZVxuICAgIHx8IGRpc3BsYXllZENvbnRlbnQ/LnRpdGxlXG4gICAgfHwgZGlzcGxheWVkQ29udGVudD8uc2l0ZU5hbWVcbiAgICB8fCBwYWdlTGFiZWxcbiAgKSwgW2Rpc3BsYXllZENvbnRlbnQsIHBhZ2VMYWJlbF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzTW91bnRlZCA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkUGFnZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvcignJyk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldFBhZ2UoeyBwYWdlTmFtZSB9KTtcblxuICAgICAgICBpZiAoIWlzTW91bnRlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHREcmFmdENvbnRlbnQgPSBjbG9uZVZhbHVlKHJlc3BvbnNlLmRhdGEuZHJhZnREYXRhID8/IHJlc3BvbnNlLmRhdGEuZGF0YSA/PyB7fSk7XG4gICAgICAgIHNldENvbnRlbnQobmV4dERyYWZ0Q29udGVudCk7XG4gICAgICAgIHNldE9yaWdpbmFsQ29udGVudChjbG9uZVZhbHVlKG5leHREcmFmdENvbnRlbnQpKTtcbiAgICAgICAgc2V0UHVibGlzaGVkQ29udGVudChyZXNwb25zZS5kYXRhLnB1Ymxpc2hlZERhdGEgPyBjbG9uZVZhbHVlKHJlc3BvbnNlLmRhdGEucHVibGlzaGVkRGF0YSkgOiBudWxsKTtcbiAgICAgICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgIHNldFBhZ2VMYWJlbChyZXNwb25zZS5kYXRhLmxhYmVsID8/IHRvTGFiZWwocGFnZU5hbWUpKTtcbiAgICAgIH0gY2F0Y2ggKGxvYWRFcnJvcikge1xuICAgICAgICBpZiAoIWlzTW91bnRlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yKHRvQWRtaW5FcnJvck1lc3NhZ2UobG9hZEVycm9yLCAnRmFpbGVkIHRvIGxvYWQgdGhpcyBjb250ZW50IHBhZ2UuJykpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGlzTW91bnRlZCkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWRQYWdlKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNNb3VudGVkID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW3BhZ2VOYW1lXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW1lbnVPcGVuKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAobWVudVJlZi5jdXJyZW50ICYmICFtZW51UmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIH07XG4gIH0sIFttZW51T3Blbl0pO1xuXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChwYXRoLCBuZXh0VmFsdWUpID0+IHtcbiAgICBzZXRDb250ZW50KChjdXJyZW50VmFsdWUpID0+IHVwZGF0ZUF0UGF0aChjdXJyZW50VmFsdWUsIHBhdGgsIG5leHRWYWx1ZSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZEl0ZW0gPSAocGF0aCwgbmV4dEl0ZW0pID0+IHtcbiAgICBzZXRDb250ZW50KChjdXJyZW50VmFsdWUpID0+IGFwcGVuZEF0UGF0aChjdXJyZW50VmFsdWUsIHBhdGgsIG5leHRJdGVtKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlSXRlbSA9IChwYXRoKSA9PiB7XG4gICAgc2V0Q29udGVudCgoY3VycmVudFZhbHVlKSA9PiByZW1vdmVBdFBhdGgoY3VycmVudFZhbHVlLCBwYXRoKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW92ZUl0ZW0gPSAocGF0aCwgb2Zmc2V0KSA9PiB7XG4gICAgc2V0Q29udGVudCgoY3VycmVudFZhbHVlKSA9PiBtb3ZlQXRQYXRoKGN1cnJlbnRWYWx1ZSwgcGF0aCwgb2Zmc2V0KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZSA9IGFzeW5jIChpbnRlbnQgPSAnc2F2ZScpID0+IHtcbiAgICBzZXRTYXZpbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3IoJycpO1xuICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXRQYWdlKHtcbiAgICAgICAgcGFnZU5hbWUsXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICBkYXRhOiB7IGNvbnRlbnQsIGludGVudCB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG5leHREcmFmdENvbnRlbnQgPSBjbG9uZVZhbHVlKHJlc3BvbnNlLmRhdGEuZHJhZnREYXRhID8/IHJlc3BvbnNlLmRhdGEuZGF0YSA/PyB7fSk7XG4gICAgICBzZXRDb250ZW50KG5leHREcmFmdENvbnRlbnQpO1xuICAgICAgc2V0T3JpZ2luYWxDb250ZW50KGNsb25lVmFsdWUobmV4dERyYWZ0Q29udGVudCkpO1xuICAgICAgc2V0UHVibGlzaGVkQ29udGVudChyZXNwb25zZS5kYXRhLnB1Ymxpc2hlZERhdGEgPyBjbG9uZVZhbHVlKHJlc3BvbnNlLmRhdGEucHVibGlzaGVkRGF0YSkgOiBudWxsKTtcbiAgICAgIGlmIChpbnRlbnQgPT09ICd1bnB1Ymxpc2gnKSB7XG4gICAgICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgICAgIH1cbiAgICAgIGFkZE5vdGljZSh7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGEubm90aWNlPy5tZXNzYWdlID8/IGAke3BhZ2VMYWJlbH0gc2F2ZWQuYCxcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoc2F2ZUVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gdG9BZG1pbkVycm9yTWVzc2FnZShzYXZlRXJyb3IsICdGYWlsZWQgdG8gc2F2ZSB0aGlzIGNvbnRlbnQgcGFnZS4nKTtcbiAgICAgIHNldEVycm9yKG1lc3NhZ2UpO1xuICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0U2F2aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGlzY2FyZENoYW5nZXMgPSAoKSA9PiB7XG4gICAgc2V0Q29udGVudChnZXRFbXB0eUl0ZW0oY29udGVudCkpO1xuICAgIHNldEFjdGl2ZVRhYignZHJhZnQnKTtcbiAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGhlaWdodDogJzEwMCUnIH19PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZWRpdG9yXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZWRpdG9yX19pbm5lclwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tYmFja1wiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB3aW5kb3cuaGlzdG9yeS5iYWNrKCl9PlxuICAgICAgICAgICAg4oaQIEJhY2tcbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4taGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1ldGFcIj5TaW5nbGUgVHlwZTwvZGl2PlxuICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tdGl0bGVcIj57ZW50cnlUaXRsZX08L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zdGF0dXNcIj57cHVibGlzaGVkQ29udGVudCA/ICdQdWJsaXNoZWQnIDogJ0RyYWZ0J308L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1rZWJhYlwiIHR5cGU9XCJidXR0b25cIj7igKY8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tdGFic1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BhZG1pbi10YWIke2FjdGl2ZVRhYiA9PT0gJ2RyYWZ0JyA/ICcgYWRtaW4tdGFiLS1hY3RpdmUnIDogJyd9YH0gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignZHJhZnQnKX0+XG4gICAgICAgICAgICAgIERSQUZUXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tdGFiJHthY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnID8gJyBhZG1pbi10YWItLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcHVibGlzaGVkQ29udGVudCAmJiBzZXRBY3RpdmVUYWIoJ3B1Ymxpc2hlZCcpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQVUJMSVNIRURcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAge2Vycm9yID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiPntlcnJvcn08L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGF5b3V0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1haW4tY2FyZFwiPlxuICAgICAgICAgICAgICB7c2VjdGlvbnMubWFwKChzZWN0aW9uLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDxGb3JtU2VjdGlvblxuICAgICAgICAgICAgICAgICAga2V5PXtgc2VjdGlvbi0ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICBlbnRyaWVzPXtzZWN0aW9uLmVudHJpZXN9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgb25BZGRJdGVtPXtoYW5kbGVBZGRJdGVtfVxuICAgICAgICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtoYW5kbGVSZW1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgb25Nb3ZlSXRlbT17aGFuZGxlTW92ZUl0ZW19XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNQdWJsaXNoZWRWaWV3fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxhc2lkZT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9faGVhZFwiPkVudHJ5PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tcm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTYXZlKCdwdWJsaXNoJyl9IGRpc2FibGVkPXshY2FuUHVibGlzaH0+XG4gICAgICAgICAgICAgICAgICAgICAgUHVibGlzaFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkgYWRtaW4tc2lkZS1idXR0b24tLW1lbnVcIlxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE1lbnVPcGVuKChjdXJyZW50KSA9PiAhY3VycmVudCl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICDigKZcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIHttZW51T3BlbiA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJlZj17bWVudVJlZn0gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtIGFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTYXZlKCd1bnB1Ymxpc2gnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5VbnB1Ymxpc2h9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2ljb25cIj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgVW5wdWJsaXNoXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSBhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtLS1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRGlzY2FyZENoYW5nZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuRGlzY2FyZH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvblwiPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBEaXNjYXJkIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTYXZlKCdzYXZlJyl9IGRpc2FibGVkPXshY2FuU2F2ZX0+XG4gICAgICAgICAgICAgICAgICAgIHtzYXZpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlJ31cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9hc2lkZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24sIHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IExvYWRlciwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tbWVkaWEtcGFnZSB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDI4cHggNDBweCA0OHB4IDg4cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9faW5uZXIge1xuICBtYXgtd2lkdGg6IDE4NjBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX190b3Age1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDI4cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX190aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAzcmVtO1xuICBsaW5lLWhlaWdodDogMy41cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19idXR0b24sXG4uYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uLS1wcmltYXJ5LFxuLmFkbWluLW1lZGlhLXBhZ2VfX2ljb24tYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIHBhZGRpbmc6IDAgMXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbi0tcHJpbWFyeSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0OTQ1ZmY7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBwYWRkaW5nOiAwIDEuMjVyZW07XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDI4cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLWxlZnQsXG4uYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhci1yaWdodCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3NxdWFyZSxcbi5hZG1pbi1tZWRpYS1wYWdlX19pY29uLWJ1dHRvbiB7XG4gIHdpZHRoOiAyLjVyZW07XG4gIGhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzY2NjY4NztcbiAgZGlzcGxheTogZ3JpZDtcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fc2VsZWN0LFxuLmFkbWluLW1lZGlhLXBhZ2VfX3NlYXJjaCB7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgcGFkZGluZzogMCAxcmVtO1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zZWFyY2gge1xuICBtaW4td2lkdGg6IDI4MHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fc2VsZWN0IHtcbiAgbWluLXdpZHRoOiAyNjhweDtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3NlY3Rpb24tdGl0bGUge1xuICBtYXJnaW46IDAgMCAxOHB4O1xuICBmb250LXNpemU6IDJyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19jb3VudCB7XG4gIGNvbG9yOiAjNjY2Njg3O1xufVxuXG4uYWRtaW4tbWVkaWEtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZmlsbCwgbWlubWF4KDMyMHB4LCAxZnIpKTtcbiAgZ2FwOiAyNHB4O1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4wNik7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmQ6aG92ZXIge1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4wOCk7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19wcmV2aWV3IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtaW4taGVpZ2h0OiAyNTZweDtcbiAgcGFkZGluZzogMTZweDtcbiAgYmFja2dyb3VuZDpcbiAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmNmY2ZjkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2Y2ZjZmOSA3NSUsICNmNmY2ZjkpLFxuICAgIGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2Y2ZjZmOSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZjZmNmY5IDc1JSwgI2Y2ZjZmOSk7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgMCwgMTJweCAxMnB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX2NoZWNrYm94IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDE2cHg7XG4gIGxlZnQ6IDE2cHg7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjMGMwY2Y7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkyKTtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX2ltYWdlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMjI0cHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX2JvZHkge1xuICBwYWRkaW5nOiAxNHB4IDE4cHggMTZweDtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX3RpdGxlLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fdGl0bGUge1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG92ZXJmbG93LXdyYXA6IGFueXdoZXJlO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fdHlwZSB7XG4gIGZsZXg6IDAgMCBhdXRvO1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX19tZXRhIHtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19iYWNrIHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbi1ib3R0b206IDE4cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2xheW91dCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsIDFmcikgMzYwcHg7XG4gIGdhcDogMjRweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fcHJldmlldyxcbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLCAzMywgNTIsIDAuMDYpO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19wcmV2aWV3IHtcbiAgcGFkZGluZzogMjRweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fY2FudmFzIHtcbiAgbWluLWhlaWdodDogNjIwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDpcbiAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmNmY2ZjkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDc1JSwgI2Y2ZjZmOSA3NSUsICNmNmY2ZjkpLFxuICAgIGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2Y2ZjZmOSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZjZmNmY5IDc1JSwgI2Y2ZjZmOSk7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IDAgMCwgMTJweCAxMnB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9faW1hZ2Uge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDU4MHB4O1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19zaWRlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWhlYWQge1xuICBwYWRkaW5nOiAxNHB4IDE2cHggOHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1ib2R5IHtcbiAgcGFkZGluZzogMCAxNnB4IDE2cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2ZpZWxkICsgLmFkbWluLW1lZGlhLWRldGFpbF9fZmllbGQge1xuICBtYXJnaW4tdG9wOiAxNnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjNjY2Njg3O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19pbnB1dCxcbi5hZG1pbi1tZWRpYS1kZXRhaWxfX3RleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgcGFkZGluZzogMC42MjVyZW0gMC44NzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX190ZXh0YXJlYSB7XG4gIG1pbi1oZWlnaHQ6IDZyZW07XG4gIHJlc2l6ZTogbm9uZTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1saXN0IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5IHtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWUge1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIG92ZXJmbG93LXdyYXA6IGFueXdoZXJlO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMTA4MHB4KSB7XG4gIC5hZG1pbi1tZWRpYS1kZXRhaWxfX2xheW91dCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1tZWRpYS1wYWdlIHtcbiAgICBwYWRkaW5nOiAyMHB4IDE2cHggNDBweCA3MnB4O1xuICB9XG5cbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3RvcCxcbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIH1cblxuICAuYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhci1sZWZ0LFxuICAuYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhci1yaWdodCxcbiAgLmFkbWluLW1lZGlhLXBhZ2VfX2FjdGlvbnMge1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgfVxuXG4gIC5hZG1pbi1tZWRpYS1wYWdlX19zZWFyY2gsXG4gIC5hZG1pbi1tZWRpYS1wYWdlX19zZWxlY3Qge1xuICAgIG1pbi13aWR0aDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuYDtcblxuZnVuY3Rpb24gYnVpbGRQYWdlUGF0aChwYXRobmFtZSwgcGFyYW1zKSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBPYmplY3QuZW50cmllcyhwYXJhbXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJykge1xuICAgICAgc2VhcmNoUGFyYW1zLnNldChrZXksIFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgcmV0dXJuIGAke3BhdGhuYW1lfSR7cXVlcnlTdHJpbmcgPyBgPyR7cXVlcnlTdHJpbmd9YCA6ICcnfWA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RNZWRpYShxdWVyeSA9IHt9KSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocXVlcnkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYWRtaW4vYXBpL3BhZ2VzL21lZGlhLWxpYnJhcnkke3NlYXJjaFBhcmFtcy50b1N0cmluZygpID8gYD8ke3NlYXJjaFBhcmFtcy50b1N0cmluZygpfWAgOiAnJ31gLCB7XG4gICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gIH0pO1xuICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5tZXNzYWdlID8/ICdGYWlsZWQgdG8gbG9hZCBtZWRpYS4nKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGxvYWRBZG1pbkltYWdlKGZpbGUpIHtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FkbWluL2FwaS9tZWRpYS91cGxvYWQnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogZm9ybURhdGEsXG4gICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gIH0pO1xuXG4gIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLmVycm9yIHx8ICdGYWlsZWQgdG8gdXBsb2FkIGltYWdlLicpO1xuICB9XG5cbiAgcmV0dXJuIHBheWxvYWQ7XG59XG5cbmZ1bmN0aW9uIEFzc2V0Q2FyZCh7IGl0ZW0sIG9uT3BlbiB9KSB7XG4gIHJldHVybiAoXG4gICAgPGFydGljbGUgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZFwiIG9uQ2xpY2s9eygpID0+IG9uT3BlbihpdGVtLmlkKX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX3ByZXZpZXdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19jaGVja2JveFwiIC8+XG4gICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9faW1hZ2VcIiBzcmM9e2l0ZW0udGh1bWJuYWlsVXJsIHx8IGl0ZW0udXJsfSBhbHQ9e2l0ZW0uYWx0ZXJuYXRpdmVUZXh0IHx8IGl0ZW0ubmFtZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19ib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fdGl0bGUtcm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX190aXRsZVwiPntpdGVtLm5hbWV9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX190eXBlXCI+e2l0ZW0ubWltZS5zdGFydHNXaXRoKCdpbWFnZS8nKSA/ICdJTUFHRScgOiBpdGVtLmV4dC5yZXBsYWNlKCcuJywgJycpLnRvVXBwZXJDYXNlKCl9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX21ldGFcIj5cbiAgICAgICAgICB7aXRlbS5leHQucmVwbGFjZSgnLicsICcnKS50b1VwcGVyQ2FzZSgpfSAtIHtpdGVtLndpZHRofcOXe2l0ZW0uaGVpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRGV0YWlsVmlldyh7IGl0ZW0sIG9uQmFjayB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19iYWNrXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQmFja30+XG4gICAgICAgIOKGkCBCYWNrXG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b3BcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDI0IH19PlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdGl0bGVcIiBzdHlsZT17eyBmb250U2l6ZTogJzIuMjVyZW0nLCBsaW5lSGVpZ2h0OiAnMi43NXJlbScgfX0+e2l0ZW0ubmFtZX08L2gxPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2FjdGlvbnNcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvblwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0b3IuY2xpcGJvYXJkPy53cml0ZVRleHQoaXRlbS51cmwgfHwgJycpfT5cbiAgICAgICAgICAgIENvcHkgVVJMXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4oaXRlbS51cmwsICdfYmxhbmsnLCAnbm9vcGVuZXIsbm9yZWZlcnJlcicpfT5cbiAgICAgICAgICAgIE9wZW4gYXNzZXRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2xheW91dFwiPlxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX3ByZXZpZXdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FudmFzXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9faW1hZ2VcIiBzcmM9e2l0ZW0udXJsfSBhbHQ9e2l0ZW0uYWx0ZXJuYXRpdmVUZXh0IHx8IGl0ZW0ubmFtZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIDxhc2lkZSBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX3NpZGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FyZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtaGVhZFwiPkRldGFpbHM8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2ZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbGFiZWxcIj5GaWxlIG5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2lucHV0XCIgdmFsdWU9e2l0ZW0ubmFtZSB8fCAnJ30gZGlzYWJsZWQgcmVhZE9ubHkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2xhYmVsXCI+QWx0ZXJuYXRpdmUgdGV4dDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9faW5wdXRcIiB2YWx1ZT17aXRlbS5hbHRlcm5hdGl2ZVRleHQgfHwgJyd9IGRpc2FibGVkIHJlYWRPbmx5IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19sYWJlbFwiPkNhcHRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX3RleHRhcmVhXCIgdmFsdWU9e2l0ZW0uY2FwdGlvbiB8fCAnJ30gZGlzYWJsZWQgcmVhZE9ubHkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1oZWFkXCI+TWV0YWRhdGE8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtbGlzdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5EaW1lbnNpb25zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0ud2lkdGh9IMOXIHtpdGVtLmhlaWdodH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPlNpemU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5zaXplTGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5UeXBlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0ubWltZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPlByb3ZpZGVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0ucHJvdmlkZXIgfHwgJ2xvY2FsJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPkZvbGRlcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLmZvbGRlclBhdGggfHwgJy8nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+VXBkYXRlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLnVwZGF0ZWRBdExhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+Q3JlYXRlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLmNyZWF0ZWRBdExhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+RG9jdW1lbnQgSUQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5kb2N1bWVudElkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hc2lkZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNZWRpYUxpYnJhcnkoKSB7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICBjb25zdCBxdWVyeSA9IHVzZU1lbW8oKCkgPT4gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpLCBbbG9jYXRpb24uc2VhcmNoXSk7XG4gIGNvbnN0IHNlYXJjaCA9IHF1ZXJ5LmdldCgnc2VhcmNoJykgfHwgJyc7XG4gIGNvbnN0IGZpbGVJZCA9IHF1ZXJ5LmdldCgnZmlsZUlkJykgfHwgJyc7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtjb3VudCwgc2V0Q291bnRdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtpdGVtLCBzZXRJdGVtXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbdXBsb2FkaW5nLCBzZXRVcGxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGFjdGl2ZSA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yKCcnKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RNZWRpYShmaWxlSWQgPyB7IGZpbGVJZCB9IDogeyBzZWFyY2ggfSk7XG5cbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRJdGVtcyhwYXlsb2FkLml0ZW1zID8/IFtdKTtcbiAgICAgICAgc2V0Q291bnQocGF5bG9hZC5jb3VudCA/PyAwKTtcbiAgICAgICAgc2V0SXRlbShwYXlsb2FkLml0ZW0gPz8gbnVsbCk7XG4gICAgICB9IGNhdGNoIChsb2FkRXJyb3IpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvcihsb2FkRXJyb3IubWVzc2FnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFtmaWxlSWQsIHNlYXJjaF0pO1xuXG4gIGNvbnN0IG9wZW5MaXN0ID0gKG5leHRTZWFyY2ggPSBzZWFyY2gpID0+IHtcbiAgICBuYXZpZ2F0ZShidWlsZFBhZ2VQYXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScsIG5leHRTZWFyY2ggPyB7IHNlYXJjaDogbmV4dFNlYXJjaCB9IDoge30pKTtcbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9faW5uZXJcIj5cbiAgICAgICAgICB7ZXJyb3IgPyA8TWVzc2FnZUJveCB2YXJpYW50PVwiZGFuZ2VyXCI+e2Vycm9yfTwvTWVzc2FnZUJveD4gOiBudWxsfVxuXG4gICAgICAgICAge2ZpbGVJZCAmJiBpdGVtID8gKFxuICAgICAgICAgICAgPERldGFpbFZpZXcgaXRlbT17aXRlbX0gb25CYWNrPXsoKSA9PiBvcGVuTGlzdCgpfSAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3RvcFwiPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190aXRsZVwiPk1lZGlhIExpYnJhcnk8L2gxPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+KyBBZGQgbmV3IGZvbGRlcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3VwbG9hZGluZ31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC50eXBlID0gJ2ZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmFjY2VwdCA9ICdpbWFnZS8qJztcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5tdWx0aXBsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQub25jaGFuZ2UgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oaW5wdXQuZmlsZXMgPz8gW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRFcnJvcignJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHVwbG9hZEFkbWluSW1hZ2UoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZyZXNoZWRQYXlsb2FkID0gYXdhaXQgcmVxdWVzdE1lZGlhKHNlYXJjaCA/IHsgc2VhcmNoIH0gOiB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEl0ZW1zKHJlZnJlc2hlZFBheWxvYWQuaXRlbXMgPz8gW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb3VudChyZWZyZXNoZWRQYXlsb2FkLmNvdW50ID8/IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAodXBsb2FkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IodXBsb2FkRXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJysgQWRkIG5ldyBhc3NldHMnfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhci1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3NxdWFyZVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3NlbGVjdFwiIGRlZmF1bHRWYWx1ZT1cInJlY2VudFwiPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmVjZW50XCI+TW9zdCByZWNlbnQgdXBsb2Fkczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvblwiIHR5cGU9XCJidXR0b25cIj5GaWx0ZXJzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2ljb24tYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPuKamTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19pY29uLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIj7imLA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19zZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvcGVuTGlzdChldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBhc3NldHNcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3NlY3Rpb24tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICBBc3NldHMgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fY291bnRcIj4oe2NvdW50fSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1ncmlkXCI+XG4gICAgICAgICAgICAgICAge2l0ZW1zLm1hcCgobWVkaWFJdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8QXNzZXRDYXJkIGtleT17bWVkaWFJdGVtLmlkfSBpdGVtPXttZWRpYUl0ZW19IG9uT3Blbj17KG5leHRJZCkgPT4gbmF2aWdhdGUoYnVpbGRQYWdlUGF0aCgnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnknLCB7IGZpbGVJZDogbmV4dElkIH0pKX0gLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24sIHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5jb25zdCBDT05URU5UX1BBR0VfT1JERVIgPSBbXG4gICdzaXRlLXNldHRpbmdzJyxcbiAgJ2hvbWVwYWdlJyxcbiAgJ2Fib3V0LXBhZ2UnLFxuICAnYmxvZy1wYWdlJyxcbiAgJ3ByaWNpbmctcGFnZScsXG4gICdmYXEtcGFnZScsXG4gICdtZWV0aW5nLXJvb21zLXBhZ2UnLFxuICAndmlydHVhbC1vZmZpY2UtcGFnZScsXG4gICdjb250YWN0LXBhZ2UnLFxuICAncHJpdmFjeS1wb2xpY3ktcGFnZScsXG4gICd0ZXJtcy1wYWdlJyxcbl07XG5cbmNvbnN0IENPTlRFTlRfUEFHRV9MQUJFTFMgPSB7XG4gICdzaXRlLXNldHRpbmdzJzogJ1NpdGUgU2V0dGluZycsXG4gICdob21lcGFnZSc6ICdIb21lcGFnZScsXG4gICdhYm91dC1wYWdlJzogJ0Fib3V0IFBhZ2UnLFxuICAnYmxvZy1wYWdlJzogJ0Jsb2cgUGFnZScsXG4gICdwcmljaW5nLXBhZ2UnOiAnUHJpY2luZyBQYWdlJyxcbiAgJ2ZhcS1wYWdlJzogJ0ZBUSBQYWdlJyxcbiAgJ21lZXRpbmctcm9vbXMtcGFnZSc6ICdNZWV0aW5nIFJvb21zIFBhZ2UnLFxuICAndmlydHVhbC1vZmZpY2UtcGFnZSc6ICdWaXJ0dWFsIE9mZmljZSBQYWdlJyxcbiAgJ2NvbnRhY3QtcGFnZSc6ICdDb250YWN0IFBhZ2UnLFxuICAncHJpdmFjeS1wb2xpY3ktcGFnZSc6ICdQcml2YWN5IFBvbGljeSBQYWdlJyxcbiAgJ3Rlcm1zLXBhZ2UnOiAnVGVybXMgUGFnZScsXG59O1xuXG5jb25zdCBSRVNPVVJDRV9MQUJFTFMgPSB7XG4gICdibG9nLXBvc3RzJzogJ0Jsb2cgUG9zdCcsXG4gICdmYXEtaXRlbXMnOiAnRkFRIEl0ZW0nLFxuICAnbWVldGluZy1yb29tcyc6ICdNZWV0aW5nIFJvb20nLFxuICAncHJpY2luZy1wbGFucyc6ICdQcmljaW5nIFBsYW4nLFxufTtcblxuY29uc3QgU0lERUJBUl9XSURUSCA9IDMwNDtcbmNvbnN0IFJBSUxfV0lEVEggPSA0ODtcblxuY29uc3QgU1RZTEVTID0gYFxuLmFkbWluLXNpZGViYXItc2hlbGwge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGluc2V0OiAwIGF1dG8gMCAwO1xuICB3aWR0aDogJHtTSURFQkFSX1dJRFRIfXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWFlYmYwO1xuICB6LWluZGV4OiA1MDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlO1xufVxuXG4uYWRtaW4tc2lkZWJhci1zaGVsbC0tcmFpbC1vbmx5IHtcbiAgd2lkdGg6ICR7UkFJTF9XSURUSH1weDtcbn1cblxuLmFkbWluLXNpZGViYXItc2hlbGwtLWhpZGRlbiB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtTSURFQkFSX1dJRFRIfXB4KTtcbn1cblxuLmFkbWluLXNpZGViYXItcmFpbCB7XG4gIHdpZHRoOiA0OHB4O1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWFlYmYwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxMnB4IDA7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmFkbWluLXNpZGViYXItbG9nbyB7XG4gIHdpZHRoOiAyOHB4O1xuICBoZWlnaHQ6IDI4cHg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIG1hcmdpbi1ib3R0b206IDJweDtcbn1cblxuLmFkbWluLXJhaWwtYnV0dG9uIHtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZGlzcGxheTogZ3JpZDtcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tcmFpbC1idXR0b24tLWFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICNmMGViZmY7XG4gIGNvbG9yOiAjN2I3OWZmO1xufVxuXG4uYWRtaW4tcmFpbC1idXR0b24gc3ZnIHtcbiAgd2lkdGg6IDE2cHg7XG4gIGhlaWdodDogMTZweDtcbiAgc3Ryb2tlOiBjdXJyZW50Q29sb3I7XG4gIGZpbGw6IG5vbmU7XG4gIHN0cm9rZS13aWR0aDogMS44O1xuICBzdHJva2UtbGluZWNhcDogcm91bmQ7XG4gIHN0cm9rZS1saW5lam9pbjogcm91bmQ7XG59XG5cbi5hZG1pbi1yYWlsLXNwYWNlciB7XG4gIGZsZXg6IDE7XG59XG5cbi5hZG1pbi1hdmF0YXIge1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiAzMHB4O1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFkbWluLXNpZGViYXItcGFuZWwge1xuICB3aWR0aDogMjU2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi13aWR0aDogMDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmFkbWluLXNpZGViYXItaGVhZGVyIHtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VhZWJmMDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLXNpZGViYXItYm9keSB7XG4gIHBhZGRpbmc6IDE0cHggOHB4IDE4cHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5hZG1pbi1zZWFyY2gge1xuICBwYWRkaW5nOiAwIDhweCAxMnB4O1xufVxuXG4uYWRtaW4tc2VhcmNoIGlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LXNpemU6IDAuNzVyZW07XG59XG5cbi5hZG1pbi1zZWFyY2ggaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG59XG5cbi5hZG1pbi1ncm91cCB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5hZG1pbi1ncm91cF9faGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZzogMCAxMHB4IDhweDtcbn1cblxuLmFkbWluLWdyb3VwX19sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC42ODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG5cbi5hZG1pbi1ncm91cF9fY291bnQge1xuICBtaW4td2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgcGFkZGluZzogMCA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjY4NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tbmF2LWxpbmsge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA3cHggMTBweDtcbiAgbWFyZ2luOiAxcHggMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmFkbWluLW5hdi1saW5rOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQ6ICNmMGViZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tbmF2LWxpbmtfX3RleHQge1xuICBtaW4td2lkdGg6IDA7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjM3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5hZG1pbi1uYXYtbGlua19faWNvbiB7XG4gIHdpZHRoOiAxMnB4O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLXNpZGViYXItc2hlbGwge1xuICAgIGJveC1zaGFkb3c6IDAgMThweCA0OHB4IHJnYmEoMzMsIDMzLCA1MiwgMC4xMik7XG4gIH1cblxuICAuYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7U0lERUJBUl9XSURUSH1weCk7XG4gIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDk2MXB4KSB7XG4gIC5hZG1pbi1zaWRlYmFyLXNoZWxsLFxuICAuYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIGl0ZW1NYXRjaGVzU2VhcmNoKGxhYmVsLCBzZWFyY2gpIHtcbiAgaWYgKCFzZWFyY2gpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBsYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gUmFpbEljb24oeyBjaGlsZHJlbiB9KSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9zdmc+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEhvbWVJY29uKCkge1xuICByZXR1cm4gKFxuICAgIDxSYWlsSWNvbj5cbiAgICAgIDxwYXRoIGQ9XCJNNC41IDEwLjUgMTIgNGw3LjUgNi41XCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNNi41IDkuNVYxOWgxMVY5LjVcIiAvPlxuICAgICAgPHBhdGggZD1cIk0xMCAxOXYtNWg0djVcIiAvPlxuICAgIDwvUmFpbEljb24+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFBlbmNpbEljb24oKSB7XG4gIHJldHVybiAoXG4gICAgPFJhaWxJY29uPlxuICAgICAgPHBhdGggZD1cIm0zLjUgMjAuNSA0LjI1LTEgOS43NS05Ljc1LTMuMjUtMy4yNUw0LjUgMTYuMjVsLTEgNC4yNVpcIiAvPlxuICAgICAgPHBhdGggZD1cIm0xMy41IDYuNSAzLjI1IDMuMjVcIiAvPlxuICAgICAgPHBhdGggZD1cIk03LjUgMTkuNWgxM1wiIC8+XG4gICAgPC9SYWlsSWNvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTWVkaWFJY29uKCkge1xuICByZXR1cm4gKFxuICAgIDxSYWlsSWNvbj5cbiAgICAgIDxyZWN0IHg9XCIzLjVcIiB5PVwiNS41XCIgd2lkdGg9XCIxN1wiIGhlaWdodD1cIjEzXCIgcng9XCIyXCIgLz5cbiAgICAgIDxjaXJjbGUgY3g9XCI4LjVcIiBjeT1cIjEwXCIgcj1cIjEuNVwiIC8+XG4gICAgICA8cGF0aCBkPVwibTUuNSAxNiA0LTQgMyAzIDItMiA0IDNcIiAvPlxuICAgIDwvUmFpbEljb24+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNpZGViYXIoeyBpc1Zpc2libGUgfSkge1xuICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgcGFnZXMgPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLnBhZ2VzKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUuc2Vzc2lvbik7XG4gIGNvbnN0IFtzZWFyY2gsIHNldFNlYXJjaF0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgY29uc3QgcGFnZUl0ZW1zID0gdXNlTWVtbyhcbiAgICAoKSA9PiBDT05URU5UX1BBR0VfT1JERVJcbiAgICAgIC5tYXAoKHBhZ2VOYW1lKSA9PiBwYWdlcy5maW5kKChwYWdlKSA9PiBwYWdlLm5hbWUgPT09IHBhZ2VOYW1lKSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5tYXAoKHBhZ2UpID0+ICh7XG4gICAgICAgIGlkOiBwYWdlLm5hbWUsXG4gICAgICAgIGxhYmVsOiBDT05URU5UX1BBR0VfTEFCRUxTW3BhZ2UubmFtZV0gPz8gcGFnZS5uYW1lLFxuICAgICAgICBocmVmOiBgL2FkbWluL3BhZ2VzLyR7cGFnZS5uYW1lfWAsXG4gICAgICAgIHNlbGVjdGVkOiBsb2NhdGlvbi5wYXRobmFtZS5zdGFydHNXaXRoKGAvYWRtaW4vcGFnZXMvJHtwYWdlLm5hbWV9YCksXG4gICAgICB9KSlcbiAgICAgIC5maWx0ZXIoKHBhZ2UpID0+IGl0ZW1NYXRjaGVzU2VhcmNoKHBhZ2UubGFiZWwsIHNlYXJjaCkpLFxuICAgIFtsb2NhdGlvbi5wYXRobmFtZSwgcGFnZXMsIHNlYXJjaF0sXG4gICk7XG5cbiAgY29uc3QgY29sbGVjdGlvbkl0ZW1zID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoW1xuICAgICAgeyBpZDogJ2Jsb2ctcG9zdHMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2Jsb2ctcG9zdHMnIH0sXG4gICAgICB7IGlkOiAnZmFxLWl0ZW1zJywgaHJlZjogJy9hZG1pbi9wYWdlcy9mYXEtaXRlbXMnIH0sXG4gICAgICB7IGlkOiAnbWVldGluZy1yb29tcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvbWVldGluZy1yb29tcycgfSxcbiAgICAgIHsgaWQ6ICdwcmljaW5nLXBsYW5zJywgaHJlZjogJy9hZG1pbi9wYWdlcy9wcmljaW5nLXBsYW5zJyB9LFxuICAgIF0pXG4gICAgICAubWFwKChyZXNvdXJjZSkgPT4gKHtcbiAgICAgICAgaWQ6IHJlc291cmNlLmlkLFxuICAgICAgICBsYWJlbDogUkVTT1VSQ0VfTEFCRUxTW3Jlc291cmNlLmlkXSA/PyByZXNvdXJjZS5pZCxcbiAgICAgICAgaHJlZjogcmVzb3VyY2UuaHJlZixcbiAgICAgICAgc2VsZWN0ZWQ6IGxvY2F0aW9uLnBhdGhuYW1lLnN0YXJ0c1dpdGgocmVzb3VyY2UuaHJlZiksXG4gICAgICB9KSlcbiAgICAgIC5maWx0ZXIoKHJlc291cmNlKSA9PiBpdGVtTWF0Y2hlc1NlYXJjaChyZXNvdXJjZS5sYWJlbCwgc2VhcmNoKSksXG4gICAgW2xvY2F0aW9uLnBhdGhuYW1lLCBzZWFyY2hdLFxuICApO1xuXG4gIGNvbnN0IGluaXRpYWwgPSAoc2Vzc2lvbj8uZW1haWw/LlswXSA/PyAnQycpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGlzRGFzaGJvYXJkID0gbG9jYXRpb24ucGF0aG5hbWUgPT09ICcvYWRtaW4nIHx8IGxvY2F0aW9uLnBhdGhuYW1lID09PSAnL2FkbWluLyc7XG4gIGNvbnN0IGlzTWVkaWEgPSBsb2NhdGlvbi5wYXRobmFtZS5zdGFydHNXaXRoKCcvYWRtaW4vcGFnZXMvbWVkaWEtbGlicmFyeScpO1xuICBjb25zdCBzaG93UGFuZWwgPSAhaXNNZWRpYTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BhZG1pbi1zaWRlYmFyLXNoZWxsJHtzaG93UGFuZWwgPyAnJyA6ICcgYWRtaW4tc2lkZWJhci1zaGVsbC0tcmFpbC1vbmx5J30ke2lzVmlzaWJsZSA/ICcnIDogJyBhZG1pbi1zaWRlYmFyLXNoZWxsLS1oaWRkZW4nfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGViYXItcmFpbFwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGViYXItbG9nb1wiXG4gICAgICAgICAgICBzcmM9XCIvYWRtaW4tYXNzZXRzL2NsaWVudC1tYXJrLnN2Z1wiXG4gICAgICAgICAgICBhbHQ9XCJUaGUgTGVhZGVuaGFsbCBXb3Jrc1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yYWlsLWJ1dHRvbiR7aXNEYXNoYm9hcmQgPyAnIGFkbWluLXJhaWwtYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoJy9hZG1pbicpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxIb21lSWNvbiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXJhaWwtYnV0dG9uJHshaXNEYXNoYm9hcmQgJiYgIWlzTWVkaWEgPyAnIGFkbWluLXJhaWwtYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoJy9hZG1pbi9wYWdlcy9zaXRlLXNldHRpbmdzJyl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFBlbmNpbEljb24gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yYWlsLWJ1dHRvbiR7aXNNZWRpYSA/ICcgYWRtaW4tcmFpbC1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnknKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TWVkaWFJY29uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yYWlsLXNwYWNlclwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hdmF0YXJcIj57aW5pdGlhbH08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge3Nob3dQYW5lbCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLXBhbmVsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLWhlYWRlclwiPkNvbnRlbnQgTWFuYWdlcjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZWJhci1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2xhYmVsXCI+Q29sbGVjdGlvbiBUeXBlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fY291bnRcIj57Y29sbGVjdGlvbkl0ZW1zLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7Y29sbGVjdGlvbkl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLW5hdi1saW5rJHtpdGVtLnNlbGVjdGVkID8gJyBhZG1pbi1uYXYtbGluay0tc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1uYXYtbGlua19fdGV4dFwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19oZWFkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2xhYmVsXCI+U2luZ2xlIFR5cGVzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19jb3VudFwiPntwYWdlSXRlbXMubGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtwYWdlSXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tbmF2LWxpbmske2l0ZW0uc2VsZWN0ZWQgPyAnIGFkbWluLW5hdi1saW5rLS1zZWxlY3RlZCcgOiAnJ31gfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZShpdGVtLmhyZWYpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW5hdi1saW5rX190ZXh0XCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7XG4gIEJveCxcbiAgQnV0dG9uLFxuICBGb3JtR3JvdXAsXG4gIEgyLFxuICBJbnB1dCxcbiAgTGFiZWwsXG4gIE1lc3NhZ2VCb3gsXG4gIFRleHQsXG59IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMb2dpbigpIHtcbiAgY29uc3QgcHJvcHMgPSB3aW5kb3cuX19BUFBfU1RBVEVfXyA/PyB7fTtcbiAgY29uc3QgYnJhbmRpbmcgPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLmJyYW5kaW5nKTtcbiAgY29uc3QgbWVzc2FnZSA9IHByb3BzLmVycm9yTWVzc2FnZTtcblxuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIHZhcmlhbnQ9XCJncmV5XCJcbiAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXG4gICAgICBwPVwieGxcIlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgYmFja2dyb3VuZDpcbiAgICAgICAgICAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y0ZWZlOCAwJSwgI2U4ZGNjZiA0NSUsICNkOWM0YWIgMTAwJSknLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8Qm94XG4gICAgICAgIGJnPVwid2hpdGVcIlxuICAgICAgICB3aWR0aD17WycxMDAlJywgJzEwMCUnLCAnOTYwcHgnXX1cbiAgICAgICAgbWluSGVpZ2h0PVwiNTYwcHhcIlxuICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgIGJveFNoYWRvdz1cImNhcmRcIlxuICAgICAgICBib3JkZXJSYWRpdXM9XCJ4bFwiXG4gICAgICAgIG92ZXJmbG93PVwiaGlkZGVuXCJcbiAgICAgID5cbiAgICAgICAgPEJveFxuICAgICAgICAgIHdpZHRoPXtbJzAnLCAnMCcsICc0NCUnXX1cbiAgICAgICAgICBkaXNwbGF5PXtbJ25vbmUnLCAnbm9uZScsICdmbGV4J119XG4gICAgICAgICAgZmxleERpcmVjdGlvbj1cImNvbHVtblwiXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCJcbiAgICAgICAgICBwPVwieHhsXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsICMwZjBmMGYgMCUsICMxZjFmMWYgMTAwJSknLFxuICAgICAgICAgICAgY29sb3I6ICcjZjVmMWVhJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPEJveD5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiL2FkbWluLWFzc2V0cy9sb2dvLnN2Z1wiXG4gICAgICAgICAgICAgIGFsdD17YnJhbmRpbmcuY29tcGFueU5hbWV9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiA3MiwgaGVpZ2h0OiA3Miwgb2JqZWN0Rml0OiAnY29udGFpbicsIG1hcmdpbkJvdHRvbTogMjQgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8SDIgY29sb3I9XCJ3aGl0ZVwiIG1hcmdpbkJvdHRvbT1cImxnXCI+Q2xpZW50IENvbnRlbnQgUG9ydGFsPC9IMj5cbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTQwXCI+XG4gICAgICAgICAgICAgIE1hbmFnZSB0aGUgc2FtZSBjbGllbnQtZmFjaW5nIGNvbnRlbnQgc3VyZmFjZSB1c2VkIGJ5IHRoZSBsaXZlIHNpdGUuXG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NTBcIj5UaGUgTGVhZGVuaGFsbCBXb3JrczwvVGV4dD5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPEJveFxuICAgICAgICAgIGFzPVwiZm9ybVwiXG4gICAgICAgICAgYWN0aW9uPXtwcm9wcy5hY3Rpb259XG4gICAgICAgICAgbWV0aG9kPVwiUE9TVFwiXG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgcD1cInh4bFwiXG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxuICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxCb3ggbWI9XCJ4eGxcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiL2FkbWluLWFzc2V0cy9sb2dvLnN2Z1wiXG4gICAgICAgICAgICAgIGFsdD17YnJhbmRpbmcuY29tcGFueU5hbWV9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiA2NCwgaGVpZ2h0OiA2NCwgb2JqZWN0Rml0OiAnY29udGFpbicsIG1hcmdpbkJvdHRvbTogMjAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8SDIgbWFyZ2luPVwiMFwiPlNpZ24gaW48L0gyPlxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIj5DbGllbnQgZWRpdG9yIGFjY2VzcyBmb3IgVGhlIExlYWRlbmhhbGwgV29ya3MuPC9UZXh0PlxuICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAge21lc3NhZ2UgPyA8TWVzc2FnZUJveCB2YXJpYW50PVwiZGFuZ2VyXCIgbWI9XCJsZ1wiPnttZXNzYWdlfTwvTWVzc2FnZUJveD4gOiBudWxsfVxuXG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5FbWFpbDwvTGFiZWw+XG4gICAgICAgICAgICA8SW5wdXQgbmFtZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCJjbGllbnRAbGVhZGVuaGFsbHdvcmtzLmNvbVwiIC8+XG4gICAgICAgICAgPC9Gb3JtR3JvdXA+XG5cbiAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgPExhYmVsIHJlcXVpcmVkPlBhc3N3b3JkPC9MYWJlbD5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwiY3VycmVudC1wYXNzd29yZFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgICAgPEJveCBtdD1cInhsXCI+XG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgc2l6ZT1cImxnXCI+TG9nIGluPC9CdXR0b24+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUb3BCYXIoKSB7XG4gIHJldHVybiBudWxsO1xufVxuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0Rhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGFzaGJvYXJkID0gRGFzaGJvYXJkXG5pbXBvcnQgQ29sbGVjdGlvbk1hbmFnZXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbk1hbmFnZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbGxlY3Rpb25NYW5hZ2VyID0gQ29sbGVjdGlvbk1hbmFnZXJcbmltcG9ydCBDb250ZW50UGFnZUVkaXRvciBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Db250ZW50UGFnZUVkaXRvcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29udGVudFBhZ2VFZGl0b3IgPSBDb250ZW50UGFnZUVkaXRvclxuaW1wb3J0IE1lZGlhTGlicmFyeSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9NZWRpYUxpYnJhcnknXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLk1lZGlhTGlicmFyeSA9IE1lZGlhTGlicmFyeVxuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvU2lkZWJhcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuU2lkZWJhciA9IFNpZGViYXJcbmltcG9ydCBMb2dpbiBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Mb2dpbidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTG9naW4gPSBMb2dpblxuaW1wb3J0IFRvcEJhciBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9Ub3BCYXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlRvcEJhciA9IFRvcEJhciJdLCJuYW1lcyI6WyJQUklNQVJZX1BBR0VTIiwibGFiZWwiLCJocmVmIiwiQ09MTEVDVElPTlMiLCJTVFlMRVMiLCJTaG9ydGN1dExpc3QiLCJ0aXRsZSIsIml0ZW1zIiwibmF2aWdhdGUiLCJtZXRhIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwibWFwIiwiaXRlbSIsImtleSIsInR5cGUiLCJvbkNsaWNrIiwiRGFzaGJvYXJkIiwidXNlTmF2aWdhdGUiLCJGcmFnbWVudCIsIk1VTFRJTElORV9GSUVMRF9QQVRURVJOIiwiSU1BR0VfRklFTERfUEFUVEVSTiIsIkJPT0xFQU5fRklFTERfUEFUVEVSTiIsIkZVTExfV0lEVEhfRklFTERfUEFUVEVSTiIsInRvTGFiZWwiLCJuYW1lIiwicmVwbGFjZSIsInYiLCJ0b1VwcGVyQ2FzZSIsImNsb25lVmFsdWUiLCJ2YWx1ZSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImdldEVtcHR5SXRlbSIsInNhbXBsZSIsIkFycmF5IiwiaXNBcnJheSIsIk9iamVjdCIsImZyb21FbnRyaWVzIiwia2V5cyIsImluY2x1ZGVzIiwidG9Db21wYXJhYmxlVmFsdWUiLCJzb3J0IiwiZmlsdGVyIiwicmVkdWNlIiwiYWNjdW11bGF0b3IiLCJoYXNNZWFuaW5nZnVsVmFsdWUiLCJzb21lIiwiZW50cmllcyIsIm5lc3RlZFZhbHVlIiwidHJpbSIsImxlbmd0aCIsImJ1aWxkQWRtaW5QYXRoIiwicGF0aG5hbWUiLCJwYXJhbXMiLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJmb3JFYWNoIiwidW5kZWZpbmVkIiwic2V0IiwiU3RyaW5nIiwicXVlcnlTdHJpbmciLCJ0b1N0cmluZyIsInBhcnNlRGlzcGxheWVkRmllbGRzIiwic3BsaXQiLCJmaWVsZCIsIkJvb2xlYW4iLCJwYXJzZUlucHV0VmFsdWUiLCJuZXh0UmF3VmFsdWUiLCJjdXJyZW50VmFsdWUiLCJwYXJzZWQiLCJOdW1iZXIiLCJpc05hTiIsInVwZGF0ZUF0UGF0aCIsInBhdGgiLCJuZXh0VmFsdWUiLCJzZWdtZW50IiwicmVzdCIsImNsb25lIiwicmVtb3ZlQXRQYXRoIiwiXyIsImluZGV4IiwiYXBwZW5kQXRQYXRoIiwibmV4dEl0ZW0iLCJtb3ZlQXRQYXRoIiwib2Zmc2V0IiwibmV4dEluZGV4IiwibW92ZWQiLCJzcGxpY2UiLCJnZXREaXNwbGF5VGl0bGUiLCJkZWZpbml0aW9uIiwicmVjb3JkIiwidGl0bGVGaWVsZCIsInJlcXVlc3RQYWdlIiwicGFnZU5hbWUiLCJvcHRpb25zIiwicXVlcnkiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJjcmVkZW50aWFscyIsInBheWxvYWQiLCJqc29uIiwib2siLCJFcnJvciIsIm1lc3NhZ2UiLCJ1cGxvYWRBZG1pbkltYWdlIiwiZmlsZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJjYXRjaCIsImVycm9yIiwidXBsb2FkZWRVcmwiLCJ1cmwiLCJyZWxhdGl2ZVVybCIsIk1lZGlhRmllbGQiLCJvbkNoYW5nZSIsImRpc2FibGVkIiwidXJscyIsImZpbGVJbnB1dFJlZiIsInVzZVJlZiIsInVwbG9hZGluZyIsInNldFVwbG9hZGluZyIsInVzZVN0YXRlIiwidXBsb2FkRXJyb3IiLCJzZXRVcGxvYWRFcnJvciIsInNyYyIsImFsdCIsIndpbmRvdyIsIm9wZW4iLCJwb3AiLCJqb2luIiwiZXZlbnQiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsImN1cnJlbnQiLCJjbGljayIsInJlZiIsImFjY2VwdCIsIm11bHRpcGxlIiwic3R5bGUiLCJkaXNwbGF5IiwiZmlsZXMiLCJmcm9tIiwidXBsb2FkZWRVcmxzIiwicHVzaCIsIlByaW1pdGl2ZUZpZWxkIiwidGVzdCIsImNoZWNrZWQiLCJBcnJheUZpZWxkIiwib25BZGRJdGVtIiwib25SZW1vdmVJdGVtIiwib25Nb3ZlSXRlbSIsImRyYWdJbmRleCIsInNldERyYWdJbmRleCIsImRyYWdPdmVySW5kZXgiLCJzZXREcmFnT3ZlckluZGV4Iiwib25EcmFnT3ZlciIsInByZXZlbnREZWZhdWx0Iiwib25Ecm9wIiwib25EcmFnTGVhdmUiLCJ0ZXh0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZHJhZ2dhYmxlIiwib25EcmFnU3RhcnQiLCJkYXRhVHJhbnNmZXIiLCJlZmZlY3RBbGxvd2VkIiwic2V0RGF0YSIsIm9uRHJhZ0VuZCIsInNsaWNlIiwiRmllbGRSZW5kZXJlciIsInJlbmRlckxpc3RDZWxsIiwiTGlzdFZpZXciLCJyZWNvcmRzIiwiY29udHJvbHMiLCJzZWFyY2giLCJsb2FkaW5nIiwib25TZWFyY2giLCJvbk9wZW5SZWNvcmQiLCJvbkNyZWF0ZSIsIm9uU2V0U29ydCIsIm9uU2V0RmlsdGVyIiwib25SZXNldEZpbHRlcnMiLCJvblRvZ2dsZURpc3BsYXllZEZpZWxkIiwib25SZXNldERpc3BsYXllZEZpZWxkcyIsIm9uRHVwbGljYXRlUmVjb3JkIiwib25EZWxldGVSZWNvcmQiLCJzaG93U2VhcmNoIiwic2V0U2hvd1NlYXJjaCIsInNob3dGaWx0ZXJzIiwic2V0U2hvd0ZpbHRlcnMiLCJzaG93RGlzcGxheWVkIiwic2V0U2hvd0Rpc3BsYXllZCIsInNlYXJjaFZhbHVlIiwic2V0U2VhcmNoVmFsdWUiLCJvcGVuTWVudUlkIiwic2V0T3Blbk1lbnVJZCIsIm1lbnVSZWYiLCJ1c2VFZmZlY3QiLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImhhbmRsZVBvaW50ZXJEb3duIiwiY29udGFpbnMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGlzcGxheWVkQ29sdW1ucyIsInVzZU1lbW8iLCJhdmFpbGFibGVGaWVsZHMiLCJkaXNwbGF5ZWRGaWVsZHMiLCJhdXRvRm9jdXMiLCJsZWZ0IiwicmlnaHQiLCJmaWx0ZXJzIiwiYWN0aXZlRmlsdGVycyIsIm9wdGlvbiIsImNvbHVtbiIsInNvcnRCeSIsInNvcnRPcmRlciIsImRvY3VtZW50SWQiLCJpZCIsImNvbHVtbnMiLCJFZGl0VmlldyIsInB1Ymxpc2hlZFJlY29yZCIsImFjdGl2ZVRhYiIsIm9uU3dpdGNoVGFiIiwic2F2aW5nIiwib25CYWNrIiwib25TYXZlIiwib25QdWJsaXNoIiwib25EZWxldGUiLCJvbkRpc2NhcmRDaGFuZ2VzIiwib25VbnB1Ymxpc2giLCJjYW5TYXZlIiwiY2FuUHVibGlzaCIsImNhbkRpc2NhcmQiLCJjYW5VbnB1Ymxpc2giLCJkaXNwbGF5ZWRSZWNvcmQiLCJpc1B1Ymxpc2hlZFZpZXciLCJtZW51T3BlbiIsInNldE1lbnVPcGVuIiwic3RhdHVzIiwiTWVzc2FnZUJveCIsInZhcmlhbnQiLCJlZGl0TGF5b3V0Iiwicm93IiwiQ29sbGVjdGlvbk1hbmFnZXIiLCJ1c2VQYXJhbXMiLCJsb2NhdGlvbiIsInVzZUxvY2F0aW9uIiwiYWRkTm90aWNlIiwidXNlTm90aWNlIiwic2V0TG9hZGluZyIsImxpc3RMb2FkaW5nIiwic2V0TGlzdExvYWRpbmciLCJzZXRTYXZpbmciLCJzZXREZWZpbml0aW9uIiwic2V0UmVjb3JkcyIsInNldENvbnRyb2xzIiwic2V0UmVjb3JkIiwib3JpZ2luYWxSZWNvcmQiLCJzZXRPcmlnaW5hbFJlY29yZCIsInNldFB1Ymxpc2hlZFJlY29yZCIsInNldEFjdGl2ZVRhYiIsInNldEVycm9yIiwicmVjb3JkSWQiLCJnZXQiLCJpc05ldyIsImNhdGVnb3J5IiwicGxhblR5cGUiLCJmZWF0dXJlZCIsImlzRmVhdHVyZWQiLCJpc1BvcHVsYXIiLCJtb2RlIiwiaXNEaXJ0eSIsImhhc0RyYWZ0Q29udGVudCIsImFjdGl2ZSIsImxvYWQiLCJzaG91bGRCbG9jayIsIm5ldyIsIm5leHREcmFmdFJlY29yZCIsImRyYWZ0UmVjb3JkIiwibG9hZEVycm9yIiwidXBkYXRlTGlzdFF1ZXJ5IiwicGF0Y2giLCJuZXh0UGFyYW1zIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlQWRkSXRlbSIsImhhbmRsZVJlbW92ZUl0ZW0iLCJoYW5kbGVNb3ZlSXRlbSIsImhhbmRsZVNhdmVJbnRlbnQiLCJpbnRlbnQiLCJub3RpY2UiLCJkZWxldGVkIiwicmVxdWVzdEVycm9yIiwiaGFuZGxlRGlzY2FyZENoYW5nZXMiLCJoYW5kbGVDcmVhdGUiLCJoYW5kbGVMaXN0QWN0aW9uIiwidGFyZ2V0UmVjb3JkSWQiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJoZWlnaHQiLCJMb2FkZXIiLCJsaXN0Q29sdW1ucyIsIm5leHRTZWFyY2giLCJuZXh0UmVjb3JkSWQiLCJuZXh0T3JkZXIiLCJuZXh0RmllbGRzIiwiU2V0IiwiYXBpIiwiQXBpQ2xpZW50IiwiUkVRVUlSRURfRklFTERfUEFUVEVSTiIsIlBBR0VfTEFZT1VUUyIsImZpZWxkcyIsImhvbWVwYWdlIiwiaXNQbGFpbk9iamVjdCIsImdldEZpbGVuYW1lIiwiVVJMIiwiZmlsZW5hbWUiLCJyZXNvbHZlTWVkaWFQcmV2aWV3VXJsIiwidHJpbW1lZCIsInN0YXJ0c1dpdGgiLCJ0b0FkbWluRXJyb3JNZXNzYWdlIiwiZmFsbGJhY2siLCJyZXNwb25zZURhdGEiLCJkYXRhIiwiaXNSZXF1aXJlZEZpZWxkIiwiZmllbGRLZXkiLCJmaWVsZENsYXNzTmFtZSIsImdldEl0ZW1UaXRsZSIsImZhbGxiYWNrTGFiZWwiLCJwcmVmZXJyZWQiLCJxdWVzdGlvbiIsImZlYXR1cmUiLCJmaW5kIiwiYnVpbGRTZWN0aW9ucyIsImNvbnRlbnQiLCJsYXlvdXQiLCJ1c2VkIiwic2VjdGlvbnMiLCJzZWN0aW9uIiwic2VjdGlvbkVudHJpZXMiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJhZGQiLCJleHRyYUVudHJpZXMiLCJoYXMiLCJpbnB1dFZhbHVlIiwicmVxdWlyZWQiLCJpc0ltYWdlRmllbGQiLCJwcmV2aWV3VXJsIiwic2hvd1ByZXZpZXciLCJwcm9tcHQiLCJzZWxlY3RlZEZpbGUiLCJPYmplY3RGaWVsZCIsIm5lc3RlZEtleSIsInByb3BzIiwiRm9ybVNlY3Rpb24iLCJDb250ZW50UGFnZUVkaXRvciIsInBhZ2VMYWJlbCIsInNldFBhZ2VMYWJlbCIsInNldENvbnRlbnQiLCJvcmlnaW5hbENvbnRlbnQiLCJzZXRPcmlnaW5hbENvbnRlbnQiLCJwdWJsaXNoZWRDb250ZW50Iiwic2V0UHVibGlzaGVkQ29udGVudCIsImRpc3BsYXllZENvbnRlbnQiLCJlbnRyeVRpdGxlIiwiaGVyb1RpdGxlIiwic2l0ZU5hbWUiLCJpc01vdW50ZWQiLCJsb2FkUGFnZSIsImdldFBhZ2UiLCJuZXh0RHJhZnRDb250ZW50IiwiZHJhZnREYXRhIiwicHVibGlzaGVkRGF0YSIsImhhbmRsZVNhdmUiLCJzYXZlRXJyb3IiLCJoaXN0b3J5IiwiYmFjayIsImJ1aWxkUGFnZVBhdGgiLCJyZXF1ZXN0TWVkaWEiLCJBc3NldENhcmQiLCJvbk9wZW4iLCJ0aHVtYm5haWxVcmwiLCJhbHRlcm5hdGl2ZVRleHQiLCJtaW1lIiwiZXh0Iiwid2lkdGgiLCJEZXRhaWxWaWV3IiwibWFyZ2luQm90dG9tIiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwibmF2aWdhdG9yIiwiY2xpcGJvYXJkIiwid3JpdGVUZXh0IiwicmVhZE9ubHkiLCJjYXB0aW9uIiwic2l6ZUxhYmVsIiwicHJvdmlkZXIiLCJmb2xkZXJQYXRoIiwidXBkYXRlZEF0TGFiZWwiLCJjcmVhdGVkQXRMYWJlbCIsIk1lZGlhTGlicmFyeSIsImZpbGVJZCIsInNldEl0ZW1zIiwiY291bnQiLCJzZXRDb3VudCIsInNldEl0ZW0iLCJvcGVuTGlzdCIsImlucHV0Iiwib25jaGFuZ2UiLCJyZWZyZXNoZWRQYXlsb2FkIiwiZGVmYXVsdFZhbHVlIiwibWVkaWFJdGVtIiwibmV4dElkIiwiQ09OVEVOVF9QQUdFX09SREVSIiwiQ09OVEVOVF9QQUdFX0xBQkVMUyIsIlJFU09VUkNFX0xBQkVMUyIsIlNJREVCQVJfV0lEVEgiLCJSQUlMX1dJRFRIIiwiaXRlbU1hdGNoZXNTZWFyY2giLCJ0b0xvd2VyQ2FzZSIsIlJhaWxJY29uIiwiY2hpbGRyZW4iLCJ2aWV3Qm94IiwiSG9tZUljb24iLCJkIiwiUGVuY2lsSWNvbiIsIk1lZGlhSWNvbiIsIngiLCJ5IiwicngiLCJjeCIsImN5IiwiciIsIlNpZGViYXIiLCJpc1Zpc2libGUiLCJwYWdlcyIsInVzZVNlbGVjdG9yIiwic3RhdGUiLCJzZXNzaW9uIiwic2V0U2VhcmNoIiwicGFnZUl0ZW1zIiwicGFnZSIsInNlbGVjdGVkIiwiY29sbGVjdGlvbkl0ZW1zIiwicmVzb3VyY2UiLCJpbml0aWFsIiwiZW1haWwiLCJpc0Rhc2hib2FyZCIsImlzTWVkaWEiLCJzaG93UGFuZWwiLCJMb2dpbiIsIl9fQVBQX1NUQVRFX18iLCJicmFuZGluZyIsImVycm9yTWVzc2FnZSIsIkJveCIsInAiLCJiYWNrZ3JvdW5kIiwiYmciLCJtaW5IZWlnaHQiLCJib3hTaGFkb3ciLCJib3JkZXJSYWRpdXMiLCJvdmVyZmxvdyIsImZsZXhEaXJlY3Rpb24iLCJjb2xvciIsImNvbXBhbnlOYW1lIiwib2JqZWN0Rml0IiwiSDIiLCJUZXh0IiwiYXMiLCJhY3Rpb24iLCJmbGV4R3JvdyIsIm1iIiwibWFyZ2luIiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJJbnB1dCIsImF1dG9Db21wbGV0ZSIsIm10IiwiQnV0dG9uIiwic2l6ZSIsIlRvcEJhciIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUdBLE1BQU1BLGFBQWEsR0FBRyxDQUNwQjtFQUFFQyxFQUFBQSxLQUFLLEVBQUUsVUFBVTtFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBd0IsQ0FBQyxFQUNwRDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsWUFBWTtFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBMEIsQ0FBQyxFQUN4RDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsY0FBYztFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBNEIsQ0FBQyxFQUM1RDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsY0FBYztFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBNEIsQ0FBQyxDQUM3RDtFQUVELE1BQU1DLFdBQVcsR0FBRyxDQUNsQjtFQUFFRixFQUFBQSxLQUFLLEVBQUUsWUFBWTtFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBMEIsQ0FBQyxFQUN4RDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsV0FBVztFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBeUIsQ0FBQyxFQUN0RDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsZUFBZTtFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBNkIsQ0FBQyxFQUM5RDtFQUFFRCxFQUFBQSxLQUFLLEVBQUUsZUFBZTtFQUFFQyxFQUFBQSxJQUFJLEVBQUU7RUFBNkIsQ0FBQyxDQUMvRDtFQUVELE1BQU1FLFFBQU0sR0FBRztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztFQUVELFNBQVNxQixTQUFPQSxDQUFDQyxJQUFJLEVBQUU7RUFDckIsRUFBQSxPQUFPQSxJQUFJLENBQ1JDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FDdENBLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztFQUVELFNBQVNxQixPQUFPQSxDQUFDQyxJQUFJLEVBQUU7RUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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
