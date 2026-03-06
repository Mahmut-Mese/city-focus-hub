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
    }, uploadingIndex === index ? 'Uploading...' : 'Upload from computer'), /*#__PURE__*/React__default.default.createElement("input", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbk1hbmFnZXIuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3IuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5LmpzeCIsIi4uL3NyYy9jb21wb25lbnRzL1NpZGViYXIuanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvTG9naW4uanN4IiwiLi4vc3JjL2NvbXBvbmVudHMvVG9wQmFyLmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cbmNvbnN0IFBSSU1BUllfUEFHRVMgPSBbXG4gIHsgbGFiZWw6ICdIb21lcGFnZScsIGhyZWY6ICcvYWRtaW4vcGFnZXMvaG9tZXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdBYm91dCBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9hYm91dC1wYWdlJyB9LFxuICB7IGxhYmVsOiAnUHJpY2luZyBQYWdlJywgaHJlZjogJy9hZG1pbi9wYWdlcy9wcmljaW5nLXBhZ2UnIH0sXG4gIHsgbGFiZWw6ICdDb250YWN0IFBhZ2UnLCBocmVmOiAnL2FkbWluL3BhZ2VzL2NvbnRhY3QtcGFnZScgfSxcbl07XG5cbmNvbnN0IENPTExFQ1RJT05TID0gW1xuICB7IGxhYmVsOiAnQmxvZyBQb3N0cycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvYmxvZy1wb3N0cycgfSxcbiAgeyBsYWJlbDogJ0ZBUSBJdGVtcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvZmFxLWl0ZW1zJyB9LFxuICB7IGxhYmVsOiAnTWVldGluZyBSb29tcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvbWVldGluZy1yb29tcycgfSxcbiAgeyBsYWJlbDogJ1ByaWNpbmcgUGxhbnMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL3ByaWNpbmctcGxhbnMnIH0sXG5dO1xuXG5jb25zdCBTVFlMRVMgPSBgXG4uYWRtaW4tZGFzaGJvYXJkIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMzJweCA0MHB4IDY0cHggMzQ0cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pbm5lciB7XG4gIG1heC13aWR0aDogMTI0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fZXllYnJvdyB7XG4gIG1hcmdpbjogMCAwIDRweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19zdWJ0aXRsZSB7XG4gIG1hcmdpbjogMTBweCAwIDI4cHg7XG4gIG1heC13aWR0aDogNzgwcHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2dyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxLjFmcikgbWlubWF4KDAsIDAuOWZyKTtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fY2FyZC1oZWFkIHtcbiAgcGFkZGluZzogMTZweCAyMHB4IDEycHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2NhcmQtYm9keSB7XG4gIHBhZGRpbmc6IDhweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9faXRlbS1jb3B5IHtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLW1ldGEge1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGNvbG9yOiAjNjY2Njg3O1xufVxuXG4uYWRtaW4tZGFzaGJvYXJkX19pdGVtLWFycm93IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbm90aWNlIHtcbiAgcGFkZGluZzogMjBweDtcbn1cblxuLmFkbWluLWRhc2hib2FyZF9fbm90aWNlLXRpdGxlIHtcbiAgbWFyZ2luOiAwIDAgOHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5hZG1pbi1kYXNoYm9hcmRfX25vdGljZS1jb3B5IHtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1kYXNoYm9hcmQge1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0OHB4O1xuICB9XG5cbiAgLmFkbWluLWRhc2hib2FyZF9fZ3JpZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cbmA7XG5cbmZ1bmN0aW9uIFNob3J0Y3V0TGlzdCh7IHRpdGxlLCBpdGVtcywgbmF2aWdhdGUsIG1ldGEgfSkge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLWRhc2hib2FyZF9fY2FyZFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2NhcmQtaGVhZFwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlXCI+e3RpdGxlfTwvaDI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2xpc3RcIj5cbiAgICAgICAgICB7aXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17aXRlbS5ocmVmfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW1cIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW0tY29weVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pdGVtLWxhYmVsXCI+e2l0ZW0ubGFiZWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2l0ZW0tbWV0YVwiPnttZXRhfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19pdGVtLWFycm93XCI+4oaSPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXNoYm9hcmQoKSB7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX2lubmVyXCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19leWVicm93XCI+SG9tZTwvcD5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX190aXRsZVwiPkNvbnRlbnQgTWFuYWdlcjwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19zdWJ0aXRsZVwiPlxuICAgICAgICAgICAgVXNlIHRoZSBzaG9ydGN1dHMgYmVsb3cgdG8ganVtcCBpbnRvIHNpbmdsZSBwYWdlcyBhbmQgY29sbGVjdGlvbiBjb250ZW50IGZvciB0aGUgbGl2ZSBzaXRlLlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19ncmlkXCI+XG4gICAgICAgICAgICA8U2hvcnRjdXRMaXN0XG4gICAgICAgICAgICAgIHRpdGxlPVwiU2luZ2xlIFR5cGVzXCJcbiAgICAgICAgICAgICAgaXRlbXM9e1BSSU1BUllfUEFHRVN9XG4gICAgICAgICAgICAgIG5hdmlnYXRlPXtuYXZpZ2F0ZX1cbiAgICAgICAgICAgICAgbWV0YT1cIkVkaXQgc3RydWN0dXJlZCBwYWdlIGNvbnRlbnRcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLWhlYWRcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19jYXJkLXRpdGxlXCI+V29ya3NwYWNlPC9oMj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19ub3RpY2VcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiYWRtaW4tZGFzaGJvYXJkX19ub3RpY2UtdGl0bGVcIj5Qcm9kdWN0aW9uIGNvbnRlbnQgd29ya3NwYWNlPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhZG1pbi1kYXNoYm9hcmRfX25vdGljZS1jb3B5XCI+XG4gICAgICAgICAgICAgICAgICBUaGlzIEFkbWluSlMgd29ya3NwYWNlIGlzIHRoZSBhY3RpdmUgY29udGVudCBzb3VyY2UgZm9yIHRoZSBmcm9udGVuZCBhbmQgYmFja2VuZC5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgICAgICA8U2hvcnRjdXRMaXN0XG4gICAgICAgICAgICAgIHRpdGxlPVwiQ29sbGVjdGlvbnNcIlxuICAgICAgICAgICAgICBpdGVtcz17Q09MTEVDVElPTlN9XG4gICAgICAgICAgICAgIG5hdmlnYXRlPXtuYXZpZ2F0ZX1cbiAgICAgICAgICAgICAgbWV0YT1cIk1hbmFnZSByZXBlYXRhYmxlIGNvbnRlbnRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiwgdXNlTmF2aWdhdGUsIHVzZVBhcmFtcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBMb2FkZXIsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBNVUxUSUxJTkVfRklFTERfUEFUVEVSTiA9IC8oZGVzY3JpcHRpb258Y29udGVudHxtZXNzYWdlfGJvZHl8c3VidGl0bGV8ZXhjZXJwdHxpbnRyb3xob3Vyc3xhZGRyZXNzfHRleHR8cGFyYWdyYXBofG92ZXJ2aWV3fGNoYWxsZW5nZXxyZXN1bHR8YW5zd2VyKS9pO1xuY29uc3QgSU1BR0VfRklFTERfUEFUVEVSTiA9IC8oaW1hZ2V8Y292ZXJJbWFnZXxjb250ZW50SW1hZ2VzKS9pO1xuY29uc3QgQk9PTEVBTl9GSUVMRF9QQVRURVJOID0gL14oZmVhdHVyZWR8aXNGZWF0dXJlZHxpc1BvcHVsYXIpJC9pO1xuY29uc3QgRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fGFuc3dlcnxleGNlcnB0fGNvbnRlbnRJbWFnZXN8Y292ZXJJbWFnZXxpbWFnZXxmZWF0dXJlc3xiYWRnZXN8dGFncykkL2k7XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5hZG1pbi1lZGl0b3Ige1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAzMnB4IDQwcHggNjRweCAzNDRweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG4uYWRtaW4tZWRpdG9yX19pbm5lciB7XG4gIG1heC13aWR0aDogMTI0MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cbi5hZG1pbi1iYWNrIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAuODc1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XG59XG4uYWRtaW4taGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAyNHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuLmFkbWluLW1ldGEge1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cbi5hZG1pbi10aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAyLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMi43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi1zdGF0dXMge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogMnJlbTtcbiAgcGFkZGluZzogMCAuNzVyZW07XG4gIG1hcmdpbi10b3A6IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjNmYwYzI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2VmZmZlZDtcbiAgY29sb3I6ICMyZjY4NDY7XG4gIGZvbnQtc2l6ZTogLjgxMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4ta2ViYWIge1xuICB3aWR0aDogMnJlbTtcbiAgaGVpZ2h0OiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG4uYWRtaW4tdGFicyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYWVhZWY7XG59XG4uYWRtaW4tdGFiIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAwIDAgMTJweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmFkbWluLXRhYi0tYWN0aXZlIHsgY29sb3I6ICM0OTQ1ZmY7IH1cbi5hZG1pbi10YWItLWFjdGl2ZTo6YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwOyByaWdodDogMDsgYm90dG9tOiAtMXB4O1xuICBoZWlnaHQ6IDJweDtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbn1cbi5hZG1pbi1sYXlvdXQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLDFmcikgMjMycHg7XG4gIGdhcDogMTZweDtcbiAgYWxpZ24taXRlbXM6IHN0YXJ0O1xufVxuLmFkbWluLW1haW4tY2FyZCwuYWRtaW4tc2lkZS1jYXJkLC5hZG1pbi1saXN0LWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDMzLDMzLDUyLC4wNik7XG59XG4uYWRtaW4tbWFpbi1jYXJkIHsgcGFkZGluZzogMjRweDsgfVxuLmFkbWluLXNpZGUtY2FyZCArIC5hZG1pbi1zaWRlLWNhcmQgeyBtYXJnaW4tdG9wOiAxMnB4OyB9XG4uYWRtaW4tc2lkZS1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTRweCAxNnB4IDhweDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGZvbnQtc2l6ZTogLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLXNpZGUtY2FyZF9fYm9keSB7IHBhZGRpbmc6IDAgMTJweCAxMnB4OyB9XG4uYWRtaW4tc2lkZS1idXR0b24tcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uLC5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAuODEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0OTQ1ZmY7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnkge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cbi5hZG1pbi1zaWRlLWJ1dHRvbjpkaXNhYmxlZCxcbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5OmRpc2FibGVkLFxuLmFkbWluLXByaW1hcnk6ZGlzYWJsZWQsXG4uYWRtaW4tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IGNhbGMoMTAwJSArIDhweCk7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMjIwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCAxMnB4IDMycHggcmdiYSgzMywzMyw1MiwuMTIpO1xuICBwYWRkaW5nOiA4cHggMDtcbiAgei1pbmRleDogNDA7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgY29sb3I6ICMzMjMyNGQ7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyIHtcbiAgY29sb3I6ICNkMDJiMjA7XG59XG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbTpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uYWRtaW4tc2lkZS1idXR0b24tLW1lbnUge1xuICB3aWR0aDogMnJlbTtcbiAgZmxleDogMCAwIDJyZW07XG59XG4uYWRtaW4tc2VjdGlvbiArIC5hZG1pbi1zZWN0aW9uIHsgbWFyZ2luLXRvcDogMjBweDsgfVxuLmFkbWluLWZpZWxkLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLG1pbm1heCgwLDFmcikpO1xuICBnYXA6IDIwcHggMjRweDtcbn1cbi5hZG1pbi1maWVsZC0tZnVsbCB7IGdyaWQtY29sdW1uOiAxIC8gLTE7IH1cbi5hZG1pbi1sYWJlbCB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDJweDtcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4uYWRtaW4tbGFiZWxfX3JlcXVpcmVkIHsgY29sb3I6ICNkMDJiMjA7IH1cbi5hZG1pbi1pbnB1dCwuYWRtaW4tdGV4dGFyZWEsLmFkbWluLXNlYXJjaC1pbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAuNjI1cmVtIC44NzVyZW07XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIG91dGxpbmU6IG5vbmU7XG59XG4uYWRtaW4taW5wdXQgeyBtaW4taGVpZ2h0OiAyLjVyZW07IH1cbi5hZG1pbi10ZXh0YXJlYSB7IG1pbi1oZWlnaHQ6IDUuNzVyZW07IHJlc2l6ZTogdmVydGljYWw7IH1cbi5hZG1pbi1pbnB1dDpmb2N1cywuYWRtaW4tdGV4dGFyZWE6Zm9jdXMsLmFkbWluLXNlYXJjaC1pbnB1dDpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogIzQ5NDVmZjtcbiAgYm94LXNoYWRvdzogMCAwIDAgMXB4ICM0OTQ1ZmY7XG59XG4uYWRtaW4taW5wdXQ6ZGlzYWJsZWQsXG4uYWRtaW4tdGV4dGFyZWE6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2hlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDEycHggMTZweCAxMHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmNTtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX190aXRsZSB7IGZvbnQtc2l6ZTogLjc1cmVtOyBmb250LXdlaWdodDogNjAwOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fY291bnQgeyBjb2xvcjogIzhlOGVhOTsgZm9udC1zaXplOiAuNzVyZW07IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19pdGVtICsgLmFkbWluLXJlcGVhdGFibGVfX2l0ZW0geyBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmNTsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2l0ZW0tLWRyYWctb3ZlciBzdW1tYXJ5IHsgYmFja2dyb3VuZDogI2YwZjBmZjsgfVxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnkge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeTo6LXdlYmtpdC1kZXRhaWxzLW1hcmtlciB7IGRpc3BsYXk6IG5vbmU7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5LWxlZnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fYnVsbGV0IHtcbiAgd2lkdGg6IDIwcHg7IGhlaWdodDogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjU7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogLjYyNXJlbTtcbn1cbi5hZG1pbi1yZXBlYXRhYmxlX19uYW1lIHsgZm9udC1zaXplOiAuODc1cmVtOyBmb250LXdlaWdodDogNjAwOyB9XG4uYWRtaW4tcmVwZWF0YWJsZV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTBweDtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b24ge1xuICBib3JkZXI6IDA7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBjb2xvcjogaW5oZXJpdDsgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlIHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogZ3JhYjtcbiAgcGFkZGluZzogMCAycHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGU6YWN0aXZlIHsgY3Vyc29yOiBncmFiYmluZzsgfVxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmRpc2FibGVkIHtcbiAgY29sb3I6ICNjNGM0ZDI7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkOmRpc2FibGVkIHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9fYm9keSB7IHBhZGRpbmc6IDE2cHg7IH1cbi5hZG1pbi1yZXBlYXRhYmxlX19hZGQge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwZjBmNTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faW1hZ2UtcHJldmlldyB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG4uYWRtaW4tcmVwZWF0YWJsZV9faW1hZ2UtcHJldmlldyAuYWRtaW4tbWVkaWFfX3RodW1iIHtcbiAgbWF4LXdpZHRoOiAyODBweDtcbiAgbWF4LWhlaWdodDogMTgwcHg7XG59XG4uYWRtaW4tdG9nZ2xlIHtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IC42MjVyZW0gLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuLmFkbWluLWZpZWxkLS1ib29sZWFuIC5hZG1pbi10b2dnbGUge1xuICB3aWR0aDogYXV0bztcbiAgbWluLXdpZHRoOiAxODBweDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBnYXA6IDEwcHg7XG59XG4uYWRtaW4tdG9nZ2xlOmhhcyhpbnB1dDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4Nztcbn1cbi5hZG1pbi1tZWRpYSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgcGFkZGluZzogMTZweDtcbn1cbi5hZG1pbi1tZWRpYV9fY2FudmFzIHtcbiAgbWluLWhlaWdodDogMTQwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZhZmFmYjtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG4uYWRtaW4tbWVkaWFfX3N0YWNrIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG4uYWRtaW4tbWVkaWFfX3RodW1iIHtcbiAgbWF4LXdpZHRoOiAyNDBweDtcbiAgbWF4LWhlaWdodDogMTQwcHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xufVxuLmFkbWluLW1lZGlhX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA0cHg7XG59XG4uYWRtaW4tbWVkaWFfX2FjdGlvbiB7XG4gIHdpZHRoOiAycmVtOyBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbn1cbi5hZG1pbi1tZWRpYV9fYWN0aW9uOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uYWRtaW4tbWVkaWFfX2ZpbGVuYW1lIHsgY29sb3I6ICM2NjY2ODc7IGZvbnQtc2l6ZTogLjc1cmVtOyB9XG4uYWRtaW4tbWVkaWFfX3NvdXJjZSB7IG1hcmdpbi10b3A6IDEwcHg7IH1cbi5hZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuLmFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uIHtcbiAgbWluLWhlaWdodDogMnJlbTtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5hZG1pbi1tZWRpYV9fdXBsb2FkLWJ1dHRvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmFkbWluLW1lZGlhX19lcnJvciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xufVxuLmFkbWluLWxpc3QtdG9vbGJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxNnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuLmFkbWluLWxpc3QtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTJweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5hZG1pbi1zZWFyY2gtd3JhcCB7IHdpZHRoOiAyODBweDsgfVxuLmFkbWluLWxpc3QtbWV0YSB7XG4gIG1hcmdpbjogMTJweCAwIDMycHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cbi5hZG1pbi10b29sYmFyLWNsdXN0ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5hZG1pbi10b29sYmFyLWJ1dHRvbiB7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgcGFkZGluZzogMCAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tdG9vbGJhci1idXR0b24tLWljb24ge1xuICB3aWR0aDogMi41cmVtO1xuICBwYWRkaW5nOiAwO1xufVxuLmFkbWluLXRvb2xiYXItYnV0dG9uLS1hY3RpdmUge1xuICBib3JkZXItY29sb3I6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjNDk0NWZmO1xufVxuLmFkbWluLXRvb2xiYXItc2VhcmNoIHtcbiAgd2lkdGg6IDI4MHB4O1xuICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMCAwLjg3NXJlbTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogY2FsYygxMDAlICsgOHB4KTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAzMjBweDtcbiAgbWF4LWhlaWdodDogNDIwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsMzMsNTIsLjEyKTtcbiAgcGFkZGluZzogMTZweDtcbiAgei1pbmRleDogMjA7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX3Jlc2V0IHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbn1cbi5hZG1pbi1saXN0LXBvcG92ZXJfX2dyb3VwICsgLmFkbWluLWxpc3QtcG9wb3Zlcl9fZ3JvdXAge1xuICBtYXJnaW4tdG9wOiAxNnB4O1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLmFkbWluLWxpc3QtcG9wb3Zlcl9fc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19jaGVjayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogOHB4IDA7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG4uYWRtaW4tbGlzdC1wb3BvdmVyX19jaGVjayBpbnB1dCB7XG4gIHdpZHRoOiAxLjI1cmVtO1xuICBoZWlnaHQ6IDEuMjVyZW07XG59XG4uYWRtaW4tbGlzdC1jYXJkX19oZWFkIHtcbiAgcGFkZGluZzogMTZweCAyMHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmNTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuLmFkbWluLWxpc3QtdGFibGUge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHRoIHtcbiAgcGFkZGluZzogMTBweCAxNnB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG4uYWRtaW4tbGlzdC10YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmMGYwZjU7XG4gIGZvbnQtc2l6ZTogLjg3NXJlbTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cbi5hZG1pbi1saXN0LXJvdy1tZW51LWNlbGwge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA0NHB4O1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnUtdHJpZ2dlciB7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBmb250LXNpemU6IDEuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tbGlzdC1yb3ctbWVudSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDEwMCUgLSA2cHgpO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDIyMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTJweCAzMnB4IHJnYmEoMzMsMzMsNTIsLjEyKTtcbiAgcGFkZGluZzogOHB4IDA7XG4gIHotaW5kZXg6IDI0O1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW0ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnVfX2l0ZW0tLWRhbmdlciB7XG4gIGNvbG9yOiAjZDAyYjIwO1xufVxuLmFkbWluLWxpc3Qtcm93LW1lbnVfX2ljb24ge1xuICB3aWR0aDogMThweDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5hZG1pbi1saXN0LXRhYmxlIHRoIGJ1dHRvbiB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDA7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBmb250OiBpbmhlcml0O1xuICB0ZXh0LXRyYW5zZm9ybTogaW5oZXJpdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmFkbWluLWxpc3QtdGFibGUgdHIgeyBjdXJzb3I6IHBvaW50ZXI7IH1cbi5hZG1pbi1saXN0LXRhYmxlIHRyOmhvdmVyIHsgYmFja2dyb3VuZDogI2ZhZmFmYjsgfVxuLmFkbWluLWxpc3Qtc3RhdHVzIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDEuNzVyZW07XG4gIHBhZGRpbmc6IDAgLjYyNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6ICNlZmZmZWQ7XG4gIGNvbG9yOiAjMmY2ODQ2O1xuICBmb250LXNpemU6IC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbi5hZG1pbi1wcmltYXJ5IHtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgcGFkZGluZzogMCAuODc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjNDk0NWZmO1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IC44MTI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tc2Vjb25kYXJ5IHtcbiAgbWluLWhlaWdodDogMi4yNXJlbTtcbiAgcGFkZGluZzogMCAuODc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IC44MTI1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYWRtaW4tbGlzdC1ib29sZWFuIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMXJlbTtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgZm9udC1zaXplOiAwLjYyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5hZG1pbi1saXN0LWJvb2xlYW4tLXllcyB7XG4gIGJhY2tncm91bmQ6ICMyZjY4NDY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmFkbWluLWxpc3QtYm9vbGVhbi0tbm8ge1xuICBiYWNrZ3JvdW5kOiAjZDAyYjIwO1xuICBjb2xvcjogI2ZmZjtcbn1cbkBtZWRpYSAobWF4LXdpZHRoOiAxMTgwcHgpIHtcbiAgLmFkbWluLWxheW91dCB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLWVkaXRvciB7IHBhZGRpbmc6IDIwcHggMTZweCA0OHB4OyB9XG4gIC5hZG1pbi1maWVsZC1ncmlkIHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IH1cbiAgLmFkbWluLWxpc3QtdG9vbGJhciB7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBzdHJldGNoOyB9XG4gIC5hZG1pbi1zZWFyY2gtd3JhcCB7IHdpZHRoOiAxMDAlOyB9XG59XG5gO1xuXG5mdW5jdGlvbiB0b0xhYmVsKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVcbiAgICAucmVwbGFjZSgvKFthLXowLTldKShbQS1aXSkvZywgJyQxICQyJylcbiAgICAucmVwbGFjZSgvW18tXSsvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXGJmYXFcXGIvZ2ksICdGQVEnKVxuICAgIC5yZXBsYWNlKC9eLi8sICh2KSA9PiB2LnRvVXBwZXJDYXNlKCkpO1xufVxuXG5mdW5jdGlvbiBjbG9uZVZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG59XG5cbmZ1bmN0aW9uIGdldEVtcHR5SXRlbShzYW1wbGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2FtcGxlKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmIChzYW1wbGUgJiYgdHlwZW9mIHNhbXBsZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgT2JqZWN0LmtleXMoc2FtcGxlKVxuICAgICAgICAubWFwKChrZXkpID0+IHtcbiAgICAgICAgICBpZiAoWydpZCcsICdkb2N1bWVudElkJywgJ3N0YXR1cycsICd1cGRhdGVkQXQnLCAncHVibGlzaGVkQXQnXS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gW2tleSwgc2FtcGxlW2tleV0gPz8gbnVsbF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIFtrZXksIGdldEVtcHR5SXRlbShzYW1wbGVba2V5XSldO1xuICAgICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzYW1wbGUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2FtcGxlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKChpdGVtKSA9PiB0b0NvbXBhcmFibGVWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSlcbiAgICAgIC5zb3J0KClcbiAgICAgIC5maWx0ZXIoKGtleSkgPT4gIVsndXBkYXRlZEF0JywgJ3B1Ymxpc2hlZEF0JywgJ3N0YXR1cyddLmluY2x1ZGVzKGtleSkpXG4gICAgICAucmVkdWNlKChhY2N1bXVsYXRvciwga2V5KSA9PiB7XG4gICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZVtrZXldKTtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBoYXNNZWFuaW5nZnVsVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNvbWUoKGl0ZW0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh2YWx1ZSlcbiAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiAhWydpZCcsICdkb2N1bWVudElkJywgJ3VwZGF0ZWRBdCcsICdwdWJsaXNoZWRBdCcsICdzdGF0dXMnXS5pbmNsdWRlcyhrZXkpKVxuICAgICAgLnNvbWUoKFssIG5lc3RlZFZhbHVlXSkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKG5lc3RlZFZhbHVlKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlICE9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWRtaW5QYXRoKHBhdGhuYW1lLCBwYXJhbXMpIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIE9iamVjdC5lbnRyaWVzKHBhcmFtcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICBzZWFyY2hQYXJhbXMuc2V0KGtleSwgU3RyaW5nKHZhbHVlKSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBxdWVyeVN0cmluZyA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxdWVyeVN0cmluZyA/IGA/JHtxdWVyeVN0cmluZ31gIDogJyd9YDtcbn1cblxuZnVuY3Rpb24gcGFyc2VEaXNwbGF5ZWRGaWVsZHModmFsdWUpIHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSA/PyAnJylcbiAgICAuc3BsaXQoJywnKVxuICAgIC5tYXAoKGZpZWxkKSA9PiBmaWVsZC50cmltKCkpXG4gICAgLmZpbHRlcihCb29sZWFuKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VJbnB1dFZhbHVlKG5leHRSYXdWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIGlmIChuZXh0UmF3VmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRSYXdWYWx1ZSk7XG4gICAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQpID8gY3VycmVudFZhbHVlIDogcGFyc2VkO1xuICB9XG4gIHJldHVybiBuZXh0UmF3VmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cblxuICBpZiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gU3RyaW5nKGl0ZW0udGV4dCA/PyAnJyk7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIGdldE1lZGlhRGlzcGxheU5hbWUodmFsdWUsIGZhbGxiYWNrID0gJ1VwbG9hZGVkIGltYWdlJykge1xuICBjb25zdCByYXcgPSBTdHJpbmcodmFsdWUgPz8gJycpLnRyaW0oKTtcblxuICBpZiAoIXJhdykge1xuICAgIHJldHVybiBmYWxsYmFjaztcbiAgfVxuXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSByYXcuc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICBjb25zdCBwYXJ0cyA9IG5vcm1hbGl6ZWQuc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbik7XG4gIHJldHVybiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSB8fCBmYWxsYmFjaztcbn1cblxuZnVuY3Rpb24gd2l0aFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSwgbmV4dFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV4dFZhbHVlO1xuICB9XG5cbiAgaWYgKGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLml0ZW0sXG4gICAgICB0ZXh0OiBuZXh0VmFsdWUsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7IHRleHQ6IG5leHRWYWx1ZSB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTWVkaWFQcmV2aWV3VXJsKHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XG5cbiAgaWYgKCFub3JtYWxpemVkKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKC9eaHR0cHM/OlxcL1xcLy9pLnRlc3Qobm9ybWFsaXplZCkpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbiAgfVxuXG4gIGlmIChub3JtYWxpemVkLnN0YXJ0c1dpdGgoJy8vJykpIHtcbiAgICByZXR1cm4gYGh0dHBzOiR7bm9ybWFsaXplZH1gO1xuICB9XG5cbiAgaWYgKG5vcm1hbGl6ZWQuc3RhcnRzV2l0aCgnL3VwbG9hZHMvJykgfHwgbm9ybWFsaXplZC5zdGFydHNXaXRoKCcvYWRtaW4tYXNzZXRzLycpKSB7XG4gICAgcmV0dXJuIGBodHRwOi8vbG9jYWxob3N0OjMwMDEke25vcm1hbGl6ZWR9YDtcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVkO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdFBhdGgodmFsdWUsIHBhdGgsIG5leHRWYWx1ZSkge1xuICBpZiAoIXBhdGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5leHRWYWx1ZTtcbiAgfVxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSB1cGRhdGVBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgbmV4dFZhbHVlKTtcbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBdFBhdGgodmFsdWUsIHBhdGgpIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUuZmlsdGVyKChfLCBpbmRleCkgPT4gaW5kZXggIT09IHBhdGhbMF0pIDogdmFsdWU7XG4gIH1cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gcmVtb3ZlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEF0UGF0aCh2YWx1ZSwgcGF0aCwgbmV4dEl0ZW0pIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBbLi4uKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSksIG5leHRJdGVtXTtcbiAgfVxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSBhcHBlbmRBdFBhdGgodmFsdWU/LltzZWdtZW50XSwgcmVzdCwgbmV4dEl0ZW0pO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIG1vdmVBdFBhdGgodmFsdWUsIHBhdGgsIG9mZnNldCkge1xuICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSBwYXRoWzBdO1xuICAgIGNvbnN0IG5leHRJbmRleCA9IGluZGV4ICsgb2Zmc2V0O1xuXG4gICAgaWYgKG5leHRJbmRleCA8IDAgfHwgbmV4dEluZGV4ID49IHZhbHVlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNsb25lID0gWy4uLnZhbHVlXTtcbiAgICBjb25zdCBbbW92ZWRdID0gY2xvbmUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBjbG9uZS5zcGxpY2UobmV4dEluZGV4LCAwLCBtb3ZlZCk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gbW92ZUF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0LCBvZmZzZXQpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlUaXRsZShkZWZpbml0aW9uLCByZWNvcmQpIHtcbiAgaWYgKCFyZWNvcmQpIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvbi5sYWJlbDtcbiAgfVxuICByZXR1cm4gcmVjb3JkW2RlZmluaXRpb24udGl0bGVGaWVsZF0gfHwgZGVmaW5pdGlvbi5sYWJlbDtcbn1cblxuZnVuY3Rpb24gaXNCbG9nRGlzYWJsZWRGaWVsZChkZWZpbml0aW9uLCBmaWVsZCkge1xuICByZXR1cm4gZGVmaW5pdGlvbj8ubmFtZSA9PT0gJ2Jsb2ctcG9zdHMnICYmIGZpZWxkID09PSAnZmVhdHVyZWQnO1xufVxuXG5mdW5jdGlvbiBpc0ZhcURpc2FibGVkRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpIHtcbiAgcmV0dXJuIGRlZmluaXRpb24/Lm5hbWUgPT09ICdmYXEtaXRlbXMnICYmIGZpZWxkID09PSAnaXNGZWF0dXJlZCc7XG59XG5cbmZ1bmN0aW9uIGlzTWVldGluZ1Jvb21EaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKSB7XG4gIHJldHVybiBkZWZpbml0aW9uPy5uYW1lID09PSAnbWVldGluZy1yb29tcycgJiYgZmllbGQgPT09ICdpc0ZlYXR1cmVkJztcbn1cblxuZnVuY3Rpb24gaXNWaXNpYmlsaXR5VG9nZ2xlRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpIHtcbiAgcmV0dXJuIGlzQmxvZ0Rpc2FibGVkRmllbGQoZGVmaW5pdGlvbiwgZmllbGQpXG4gICAgfHwgaXNGYXFEaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKVxuICAgIHx8IGlzTWVldGluZ1Jvb21EaXNhYmxlZEZpZWxkKGRlZmluaXRpb24sIGZpZWxkKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmllbGREaXNwbGF5TGFiZWwoZGVmaW5pdGlvbiwgZmllbGQpIHtcbiAgaWYgKGlzVmlzaWJpbGl0eVRvZ2dsZUZpZWxkKGRlZmluaXRpb24sIGZpZWxkKSkge1xuICAgIHJldHVybiAnVmlzaWJpbGl0eSc7XG4gIH1cblxuICByZXR1cm4gdG9MYWJlbChmaWVsZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RQYWdlKHBhZ2VOYW1lLCBvcHRpb25zID0ge30pIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhvcHRpb25zLnF1ZXJ5ID8/IHt9KTtcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgL2FkbWluL2FwaS9wYWdlcy8ke3BhZ2VOYW1lfSR7cXVlcnlTdHJpbmcgPyBgPyR7cXVlcnlTdHJpbmd9YCA6ICcnfWAsXG4gICAge1xuICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCA/PyAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogb3B0aW9ucy5ib2R5ID8gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5ib2R5KSA6IHVuZGVmaW5lZCxcbiAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgIH0sXG4gICk7XG5cbiAgY29uc3QgcmVzcG9uc2VUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICBsZXQgcGF5bG9hZCA9IG51bGw7XG5cbiAgdHJ5IHtcbiAgICBwYXlsb2FkID0gcmVzcG9uc2VUZXh0ID8gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpIDoge307XG4gIH0gY2F0Y2gge1xuICAgIHBheWxvYWQgPSBudWxsO1xuICB9XG5cbiAgaWYgKCFyZXNwb25zZS5vayB8fCAhcGF5bG9hZCkge1xuICAgIGNvbnN0IHRyaW1tZWRUZXh0ID0gcmVzcG9uc2VUZXh0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGlzSHRtbCA9IHRyaW1tZWRUZXh0LnN0YXJ0c1dpdGgoJzwhZG9jdHlwZScpIHx8IHRyaW1tZWRUZXh0LnN0YXJ0c1dpdGgoJzxodG1sJyk7XG4gICAgY29uc3QgcmVkaXJlY3RlZFRvTG9naW4gPSByZXNwb25zZS5yZWRpcmVjdGVkICYmIHJlc3BvbnNlLnVybC5pbmNsdWRlcygnL2FkbWluL2xvZ2luJyk7XG4gICAgY29uc3QgaXNBdXRoRXJyb3IgPSByZXNwb25zZS5zdGF0dXMgPT09IDQwMSB8fCByZXNwb25zZS5zdGF0dXMgPT09IDQwMyB8fCByZWRpcmVjdGVkVG9Mb2dpbjtcblxuICAgIGlmIChpc0F1dGhFcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3VyIGFkbWluIHNlc3Npb24gZXhwaXJlZC4gUmVmcmVzaCBhbmQgc2lnbiBpbiBhZ2Fpbi4nKTtcbiAgICB9XG5cbiAgICBpZiAocGF5bG9hZD8ubWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaWYgKHBheWxvYWQ/LmVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5lcnJvcik7XG4gICAgfVxuXG4gICAgaWYgKGlzSHRtbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgcmV0dXJuZWQgYW4gSFRNTCBlcnJvciBwYWdlICgke3Jlc3BvbnNlLnN0YXR1cyB8fCAndW5rbm93bid9KS4gQ2hlY2sgYmFja2VuZCBsb2dzLmApO1xuICAgIH1cblxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWVzdCBmYWlsZWQgKCR7cmVzcG9uc2Uuc3RhdHVzfSkuYCk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1ZXN0IGZhaWxlZC4nKTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGxvYWRBZG1pbkltYWdlKGZpbGUpIHtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FkbWluL2FwaS9tZWRpYS91cGxvYWQnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogZm9ybURhdGEsXG4gICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gIH0pO1xuXG4gIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLmVycm9yIHx8ICdGYWlsZWQgdG8gdXBsb2FkIGltYWdlLicpO1xuICB9XG5cbiAgY29uc3QgdXBsb2FkZWRVcmwgPSBwYXlsb2FkPy51cmwgfHwgcGF5bG9hZD8uaXRlbT8ucmVsYXRpdmVVcmwgfHwgcGF5bG9hZD8uaXRlbT8udXJsO1xuXG4gIGlmICghdXBsb2FkZWRVcmwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwbG9hZCBzdWNjZWVkZWQgYnV0IHJldHVybmVkIG5vIFVSTC4nKTtcbiAgfVxuXG4gIHJldHVybiB1cGxvYWRlZFVybDtcbn1cblxuZnVuY3Rpb24gTWVkaWFGaWVsZCh7IGxhYmVsLCB2YWx1ZSwgcGF0aCwgb25DaGFuZ2UsIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgdXJscyA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdLmZpbHRlcihCb29sZWFuKTtcbiAgY29uc3QgZmlsZUlucHV0UmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbdXBsb2FkaW5nLCBzZXRVcGxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdXBsb2FkRXJyb3IsIHNldFVwbG9hZEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGxcIj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19jYW52YXNcIj5cbiAgICAgICAgICB7dXJscy5sZW5ndGggPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zdGFja1wiPlxuICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX190aHVtYlwiIHNyYz17dXJsc1swXX0gYWx0PXtsYWJlbH0gLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3Blbih1cmxzWzBdLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX0+4oaXPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uXCIgdHlwZT1cImJ1dHRvblwiIGRpc2FibGVkPXtkaXNhYmxlZH0gb25DbGljaz17KCkgPT4gb25DaGFuZ2UocGF0aCwgQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbXSA6ICcnKX0+4pyVPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19maWxlbmFtZVwiPntnZXRNZWRpYURpc3BsYXlOYW1lKHVybHNbMF0pfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXY+Tm8gbWVkaWEgc2VsZWN0ZWQuPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZS1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCB1cGxvYWRpbmd9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dXBsb2FkaW5nID8gJ1VwbG9hZGluZy4uLicgOiAnVXBsb2FkIGZyb20gY29tcHV0ZXInfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgcmVmPXtmaWxlSW5wdXRSZWZ9XG4gICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgICAgICAgIG11bHRpcGxlPXtBcnJheS5pc0FycmF5KHZhbHVlKX1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXthc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LmZpbGVzID8/IFtdKTtcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSAnJztcblxuICAgICAgICAgICAgICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2V0VXBsb2FkRXJyb3IoJycpO1xuICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyh0cnVlKTtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB1cGxvYWRlZFVybHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGxvYWRlZFVybCA9IGF3YWl0IHVwbG9hZEFkbWluSW1hZ2UoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHVwbG9hZGVkVXJscy5wdXNoKHVwbG9hZGVkVXJsKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHBhdGgsIFsuLi52YWx1ZSwgLi4udXBsb2FkZWRVcmxzXSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShwYXRoLCB1cGxvYWRlZFVybHNbMF0gfHwgJycpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcihlcnJvcj8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4nKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt1cGxvYWRFcnJvciA/IDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2Vycm9yXCI+e3VwbG9hZEVycm9yfTwvZGl2PiA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFByaW1pdGl2ZUZpZWxkKHsgZGVmaW5pdGlvbiwgZmllbGQsIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBsYWJlbCA9IGdldEZpZWxkRGlzcGxheUxhYmVsKGRlZmluaXRpb24sIGZpZWxkKTtcblxuICBpZiAoSU1BR0VfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSkge1xuICAgIHJldHVybiA8TWVkaWFGaWVsZCBsYWJlbD17bGFiZWx9IHZhbHVlPXt2YWx1ZX0gcGF0aD17cGF0aH0gb25DaGFuZ2U9e29uQ2hhbmdlfSBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+O1xuICB9XG5cbiAgaWYgKEJPT0xFQU5fRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSkge1xuICAgIGNvbnN0IGlzRGlzYWJsZWRGaWVsZCA9IGlzVmlzaWJpbGl0eVRvZ2dsZUZpZWxkKGRlZmluaXRpb24sIGZpZWxkKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1ib29sZWFuXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXRvZ2dsZVwiPlxuICAgICAgICAgIDxzcGFuPntpc0Rpc2FibGVkRmllbGQgPyAnSGlkZSBvbiB3ZWJzaXRlJyA6ICh2YWx1ZSA/ICdBY3RpdmUnIDogJ0Rpc2FibGVkJyl9PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtCb29sZWFuKHZhbHVlKX0gZGlzYWJsZWQ9e2Rpc2FibGVkfSBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBldmVudC50YXJnZXQuY2hlY2tlZCl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IEZVTExfV0lEVEhfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkKSA/ICdhZG1pbi1maWVsZCBhZG1pbi1maWVsZC0tZnVsbCcgOiAnYWRtaW4tZmllbGQnO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbGFiZWxcIj5cbiAgICAgICAge2xhYmVsfVxuICAgICAgICB7ZmllbGQgIT09ICdzb3J0T3JkZXInICYmICFCT09MRUFOX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCkgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbF9fcmVxdWlyZWRcIj4qPC9zcGFuPiA6IG51bGx9XG4gICAgICA8L2xhYmVsPlxuICAgICAge01VTFRJTElORV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGQpID8gKFxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi10ZXh0YXJlYVwiXG4gICAgICAgICAgdmFsdWU9e3ZhbHVlID8/ICcnfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBwYXJzZUlucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlLCB2YWx1ZSkpfVxuICAgICAgICAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4taW5wdXRcIlxuICAgICAgICAgIHR5cGU9e3R5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyAnbnVtYmVyJyA6ICd0ZXh0J31cbiAgICAgICAgICB2YWx1ZT17dmFsdWUgPz8gJyd9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBBcnJheUZpZWxkKHsgZmllbGQsIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgY29uc3QgbGFiZWwgPSB0b0xhYmVsKGZpZWxkKTtcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW107XG4gIGNvbnN0IGlzSW1hZ2VBcnJheSA9IElNQUdFX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZCk7XG4gIGNvbnN0IFtkcmFnSW5kZXgsIHNldERyYWdJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2RyYWdPdmVySW5kZXgsIHNldERyYWdPdmVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRpbmdJbmRleCwgc2V0VXBsb2FkaW5nSW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRFcnJvciwgc2V0VXBsb2FkRXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBmaWxlSW5wdXRSZWZzID0gdXNlUmVmKHt9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGxcIj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9faGVhZFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3RpdGxlXCI+e2xhYmVsfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19jb3VudFwiPntpdGVtcy5sZW5ndGh9IGVudHJpZXM8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgPGRldGFpbHNcbiAgICAgICAgICAgIGtleT17YCR7ZmllbGR9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXJlcGVhdGFibGVfX2l0ZW0ke2RyYWdPdmVySW5kZXggPT09IGluZGV4ID8gJyBhZG1pbi1yZXBlYXRhYmxlX19pdGVtLS1kcmFnLW92ZXInIDogJyd9YH1cbiAgICAgICAgICAgIG9wZW49e2luZGV4ID09PSAwfVxuICAgICAgICAgICAgb25EcmFnT3Zlcj17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkaXNhYmxlZCB8fCBkcmFnSW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkaXNhYmxlZCB8fCBkcmFnSW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBpbmRleCAtIGRyYWdJbmRleDtcbiAgICAgICAgICAgICAgaWYgKG9mZnNldCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIG9uTW92ZUl0ZW0oWy4uLnBhdGgsIGRyYWdJbmRleF0sIG9mZnNldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkcmFnT3ZlckluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHN1bW1hcnkgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnktbGVmdFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2J1bGxldFwiPuKWvDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19uYW1lXCI+XG4gICAgICAgICAgICAgICAgICB7aXNJbWFnZUFycmF5XG4gICAgICAgICAgICAgICAgICAgID8gYEltYWdlICR7aW5kZXggKyAxfWBcbiAgICAgICAgICAgICAgICAgICAgOiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnID8gaXRlbSB8fCBgJHtsYWJlbH0gJHtpbmRleCArIDF9YCA6IGl0ZW0/LnRleHQgfHwgYCR7bGFiZWx9ICR7aW5kZXggKyAxfWApfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2ljb24tYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBvblJlbW92ZUl0ZW0oWy4uLnBhdGgsIGluZGV4XSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRlbGV0ZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAg8J+XkVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlPXshZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIkRyYWcgdG8gcmVvcmRlclwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgU3RyaW5nKGluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIHNldERyYWdJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIOKLruKLrlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc3VtbWFyeT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkLWdyaWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICB7aXNJbWFnZUFycmF5ID8gbnVsbCA6IDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPntsYWJlbCA9PT0gJ1RhZ3MnID8gJ1RleHQnIDogbGFiZWwuc2xpY2UoMCwgLTEpIHx8IGxhYmVsfTwvbGFiZWw+fVxuICAgICAgICAgICAgICAgICAge2lzSW1hZ2VBcnJheSA/IG51bGwgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Z2V0UmVwZWF0YWJsZUl0ZW1WYWx1ZShpdGVtKX1cbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UoWy4uLnBhdGgsIGluZGV4XSwgd2l0aFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSwgZXZlbnQudGFyZ2V0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7aXNJbWFnZUFycmF5ICYmIHJlc29sdmVNZWRpYVByZXZpZXdVcmwoZ2V0UmVwZWF0YWJsZUl0ZW1WYWx1ZShpdGVtKSkgPyAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fY2FudmFzIGFkbWluLXJlcGVhdGFibGVfX2ltYWdlLXByZXZpZXdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3RodW1iXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtyZXNvbHZlTWVkaWFQcmV2aWV3VXJsKGdldFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2Ake2xhYmVsfSAke2luZGV4ICsgMX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19zb3VyY2UtYWN0aW9uc1wiIHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHdpbmRvdy5vcGVuKHJlc29sdmVNZWRpYVByZXZpZXdVcmwoZ2V0UmVwZWF0YWJsZUl0ZW1WYWx1ZShpdGVtKSksICdfYmxhbmsnLCAnbm9vcGVuZXIsbm9yZWZlcnJlcicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICDihpdcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2UoWy4uLnBhdGgsIGluZGV4XSwgd2l0aFJlcGVhdGFibGVJdGVtVmFsdWUoaXRlbSwgJycpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAg4pyVXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIHtpc0ltYWdlQXJyYXkgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZS1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3VwbG9hZC1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nSW5kZXggPT09IGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZmlsZUlucHV0UmVmcy5jdXJyZW50W2luZGV4XT8uY2xpY2soKX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dXBsb2FkaW5nSW5kZXggPT09IGluZGV4ID8gJ1VwbG9hZGluZy4uLicgOiAnVXBsb2FkIGZyb20gY29tcHV0ZXInfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnB1dFJlZnMuY3VycmVudFtpbmRleF0gPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmaWxlSW5wdXRSZWZzLmN1cnJlbnRbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXthc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlcz8uWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVcGxvYWRFcnJvcignJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZ0luZGV4KGluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwbG9hZGVkVXJsID0gYXdhaXQgdXBsb2FkQWRtaW5JbWFnZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShbLi4ucGF0aCwgaW5kZXhdLCB3aXRoUmVwZWF0YWJsZUl0ZW1WYWx1ZShpdGVtLCB1cGxvYWRlZFVybCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBsb2FkIGltYWdlLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICApKX1cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19hZGRcIiB0eXBlPVwiYnV0dG9uXCIgZGlzYWJsZWQ9e2Rpc2FibGVkfSBvbkNsaWNrPXsoKSA9PiBvbkFkZEl0ZW0ocGF0aCwgeyB0ZXh0OiAnJyB9KX0+XG4gICAgICAgICAgKyBBZGQgYW4gZW50cnlcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIHt1cGxvYWRFcnJvciA/IDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2Vycm9yXCIgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTZweCAxNHB4JyB9fT57dXBsb2FkRXJyb3J9PC9kaXY+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBGaWVsZFJlbmRlcmVyKHsgZGVmaW5pdGlvbiwgZmllbGQsIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIDxBcnJheUZpZWxkIGZpZWxkPXtmaWVsZH0gdmFsdWU9e3ZhbHVlfSBwYXRoPXtwYXRofSBvbkNoYW5nZT17b25DaGFuZ2V9IG9uQWRkSXRlbT17b25BZGRJdGVtfSBvblJlbW92ZUl0ZW09e29uUmVtb3ZlSXRlbX0gb25Nb3ZlSXRlbT17b25Nb3ZlSXRlbX0gZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPjtcbiAgfVxuICByZXR1cm4gPFByaW1pdGl2ZUZpZWxkIGRlZmluaXRpb249e2RlZmluaXRpb259IGZpZWxkPXtmaWVsZH0gdmFsdWU9e3ZhbHVlfSBwYXRoPXtwYXRofSBvbkNoYW5nZT17b25DaGFuZ2V9IGRpc2FibGVkPXtkaXNhYmxlZH0gLz47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckxpc3RDZWxsKGZpZWxkLCB2YWx1ZSkge1xuICBpZiAoZmllbGQgPT09ICdzdGF0dXMnKSB7XG4gICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtc3RhdHVzXCI+e3ZhbHVlfTwvc3Bhbj47XG4gIH1cblxuICBpZiAoKGZpZWxkID09PSAnZmVhdHVyZWQnIHx8IGZpZWxkID09PSAnaXNGZWF0dXJlZCcgfHwgZmllbGQgPT09ICdpc1BvcHVsYXInKSAmJiAodmFsdWUgPT09ICdZZXMnIHx8IHZhbHVlID09PSAnTm8nKSkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2BhZG1pbi1saXN0LWJvb2xlYW4gJHt2YWx1ZSA9PT0gJ1llcycgPyAnYWRtaW4tbGlzdC1ib29sZWFuLS15ZXMnIDogJ2FkbWluLWxpc3QtYm9vbGVhbi0tbm8nfWB9PlxuICAgICAgICB7dmFsdWUgPT09ICdZZXMnID8gJ+KckycgOiAn4pyVJ31cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBMaXN0Vmlldyh7XG4gIGRlZmluaXRpb24sXG4gIHJlY29yZHMsXG4gIGNvbnRyb2xzLFxuICBzZWFyY2gsXG4gIGxvYWRpbmcsXG4gIG9uU2VhcmNoLFxuICBvbk9wZW5SZWNvcmQsXG4gIG9uQ3JlYXRlLFxuICBvblNldFNvcnQsXG4gIG9uU2V0RmlsdGVyLFxuICBvblJlc2V0RmlsdGVycyxcbiAgb25Ub2dnbGVEaXNwbGF5ZWRGaWVsZCxcbiAgb25SZXNldERpc3BsYXllZEZpZWxkcyxcbiAgb25EdXBsaWNhdGVSZWNvcmQsXG4gIG9uRGVsZXRlUmVjb3JkLFxufSkge1xuICBjb25zdCBbc2hvd1NlYXJjaCwgc2V0U2hvd1NlYXJjaF0gPSB1c2VTdGF0ZShCb29sZWFuKHNlYXJjaCkpO1xuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dEaXNwbGF5ZWQsIHNldFNob3dEaXNwbGF5ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VhcmNoVmFsdWUsIHNldFNlYXJjaFZhbHVlXSA9IHVzZVN0YXRlKHNlYXJjaCk7XG4gIGNvbnN0IFtvcGVuTWVudUlkLCBzZXRPcGVuTWVudUlkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBtZW51UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0U2VhcmNoVmFsdWUoc2VhcmNoKTtcbiAgfSwgW3NlYXJjaF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChzZWFyY2hWYWx1ZSAhPT0gc2VhcmNoKSB7XG4gICAgICAgIG9uU2VhcmNoKHNlYXJjaFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCAyNTApO1xuXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH0sIFtvblNlYXJjaCwgc2VhcmNoLCBzZWFyY2hWYWx1ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChtZW51UmVmLmN1cnJlbnQgJiYgIW1lbnVSZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHNldE9wZW5NZW51SWQobnVsbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZGlzcGxheWVkQ29sdW1ucyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gY29udHJvbHMuYXZhaWxhYmxlRmllbGRzLmZpbHRlcigoZmllbGQpID0+IGNvbnRyb2xzLmRpc3BsYXllZEZpZWxkcy5pbmNsdWRlcyhmaWVsZC5maWVsZCkpLFxuICAgIFtjb250cm9scy5hdmFpbGFibGVGaWVsZHMsIGNvbnRyb2xzLmRpc3BsYXllZEZpZWxkc10sXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvclwiPlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZWRpdG9yX19pbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWhlYWRlclwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1ldGFcIj5Db2xsZWN0aW9uIFR5cGU8L2Rpdj5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi10aXRsZVwiPntkZWZpbml0aW9uLmxhYmVsfTwvaDE+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LWFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkNyZWF0ZX0+KyBDcmVhdGUgbmV3IGVudHJ5PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1tZXRhXCI+e3JlY29yZHMubGVuZ3RofSBlbnRyaWVzIGZvdW5kPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXRvb2xiYXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXRvb2xiYXItY2x1c3RlclwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi10b29sYmFyLWJ1dHRvbiBhZG1pbi10b29sYmFyLWJ1dHRvbi0taWNvbiR7c2hvd1NlYXJjaCA/ICcgYWRtaW4tdG9vbGJhci1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1NlYXJjaCgoY3VycmVudCkgPT4gIWN1cnJlbnQpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICDwn5SNXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHtzaG93U2VhcmNoID8gKFxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi10b29sYmFyLXNlYXJjaFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFZhbHVlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFNlYXJjaFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgIGF1dG9Gb2N1c1xuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXRvb2xiYXItYnV0dG9uJHtzaG93RmlsdGVycyA/ICcgYWRtaW4tdG9vbGJhci1idXR0b24tLWFjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFNob3dGaWx0ZXJzKChjdXJyZW50KSA9PiAhY3VycmVudCk7XG4gICAgICAgICAgICAgICAgc2V0U2hvd0Rpc3BsYXllZChmYWxzZSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEZpbHRlcnNcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge3Nob3dGaWx0ZXJzID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3ZlclwiIHN0eWxlPXt7IGxlZnQ6IHNob3dTZWFyY2ggPyAzMzIgOiA1MiwgcmlnaHQ6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3RpdGxlXCI+RmlsdGVyczwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3Jlc2V0XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uUmVzZXRGaWx0ZXJzfT5SZXNldDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtjb250cm9scy5maWx0ZXJzLm1hcCgoZmlsdGVyKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZmlsdGVyLmZpZWxkfSBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX2dyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX2xhYmVsXCI+e2ZpbHRlci5sYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19zZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb250cm9scy5hY3RpdmVGaWx0ZXJzW2ZpbHRlci5maWVsZF0gPz8gJyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25TZXRGaWx0ZXIoZmlsdGVyLmZpZWxkLCBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPkFsbDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXIub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdGlvbn0gdmFsdWU9e29wdGlvbn0+e29wdGlvbn08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10b29sYmFyLWNsdXN0ZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXRvb2xiYXItYnV0dG9uIGFkbWluLXRvb2xiYXItYnV0dG9uLS1pY29uJHtzaG93RGlzcGxheWVkID8gJyBhZG1pbi10b29sYmFyLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0U2hvd0Rpc3BsYXllZCgoY3VycmVudCkgPT4gIWN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICDimplcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIHtzaG93RGlzcGxheWVkID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9faGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWxpc3QtcG9wb3Zlcl9fdGl0bGVcIj5EaXNwbGF5ZWQgZmllbGRzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXBvcG92ZXJfX3Jlc2V0XCJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblJlc2V0RGlzcGxheWVkRmllbGRzfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgUmVzZXRcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtjb250cm9scy5hdmFpbGFibGVGaWVsZHMubWFwKChmaWVsZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwga2V5PXtmaWVsZC5maWVsZH0gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1wb3BvdmVyX19jaGVja1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbnRyb2xzLmRpc3BsYXllZEZpZWxkcy5pbmNsdWRlcyhmaWVsZC5maWVsZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvblRvZ2dsZURpc3BsYXllZEZpZWxkKGZpZWxkLmZpZWxkLCBldmVudC50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZmllbGQubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImFkbWluLWxpc3QtY2FyZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1jYXJkX19oZWFkXCI+XG4gICAgICAgICAgICA8c3Ryb25nPntkZWZpbml0aW9uLmxhYmVsfTwvc3Ryb25nPlxuICAgICAgICAgICAgPHNwYW4+e2xvYWRpbmcgPyAnTG9hZGluZy4uLicgOiBgJHtyZWNvcmRzLmxlbmd0aH0gZW50cmllc2B9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXRhYmxlXCI+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICB7ZGlzcGxheWVkQ29sdW1ucy5tYXAoKGNvbHVtbikgPT4gKFxuICAgICAgICAgICAgICAgICAgPHRoIGtleT17Y29sdW1uLmZpZWxkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gb25TZXRTb3J0KGNvbHVtbi5maWVsZCl9PlxuICAgICAgICAgICAgICAgICAgICAgIHtjb2x1bW4ubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAge2NvbnRyb2xzLnNvcnRCeSA9PT0gY29sdW1uLmZpZWxkID8gYCAke2NvbnRyb2xzLnNvcnRPcmRlciA9PT0gJ2FzYycgPyAn4oaRJyA6ICfihpMnfWAgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDx0aCAvPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3JlY29yZHMubWFwKChyZWNvcmQpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtyZWNvcmQuZG9jdW1lbnRJZH0gb25DbGljaz17KCkgPT4gb25PcGVuUmVjb3JkKHJlY29yZC5pZCl9PlxuICAgICAgICAgICAgICAgICAge2Rpc3BsYXllZENvbHVtbnMubWFwKChjb2x1bW4pID0+IChcbiAgICAgICAgICAgICAgICAgICAgPHRkIGtleT17YCR7cmVjb3JkLmRvY3VtZW50SWR9LSR7Y29sdW1uLmZpZWxkfWB9PntyZW5kZXJMaXN0Q2VsbChjb2x1bW4uZmllbGQsIHJlY29yZC5jb2x1bW5zW2NvbHVtbi5maWVsZF0pfTwvdGQ+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51LWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnUtdHJpZ2dlclwiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE9wZW5NZW51SWQoKGN1cnJlbnQpID0+IChjdXJyZW50ID09PSByZWNvcmQuaWQgPyBudWxsIDogcmVjb3JkLmlkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIOKAplxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge29wZW5NZW51SWQgPT09IHJlY29yZC5pZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9e21lbnVSZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pdGVtXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25PcGVuUmVjb3JkKHJlY29yZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudV9faWNvblwiPuKcjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RWRpdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pdGVtXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0T3Blbk1lbnVJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25EdXBsaWNhdGVSZWNvcmQocmVjb3JkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1saXN0LXJvdy1tZW51X19pY29uXCI+4qeJPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5EdXBsaWNhdGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbGlzdC1yb3ctbWVudV9faXRlbSBhZG1pbi1saXN0LXJvdy1tZW51X19pdGVtLS1kYW5nZXJcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRPcGVuTWVudUlkKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZVJlY29yZChyZWNvcmQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxpc3Qtcm93LW1lbnVfX2ljb25cIj7wn5eRPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5EZWxldGUgZW50cnk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRWRpdFZpZXcoeyBkZWZpbml0aW9uLCByZWNvcmQsIHB1Ymxpc2hlZFJlY29yZCwgYWN0aXZlVGFiLCBvblN3aXRjaFRhYiwgc2F2aW5nLCBlcnJvciwgb25CYWNrLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIG9uU2F2ZSwgb25QdWJsaXNoLCBvbkRlbGV0ZSwgb25EaXNjYXJkQ2hhbmdlcywgb25VbnB1Ymxpc2gsIGNhblNhdmUsIGNhblB1Ymxpc2gsIGNhbkRpc2NhcmQsIGNhblVucHVibGlzaCB9KSB7XG4gIGNvbnN0IGRpc3BsYXllZFJlY29yZCA9IGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkUmVjb3JkID8gcHVibGlzaGVkUmVjb3JkIDogcmVjb3JkO1xuICBjb25zdCBpc1B1Ymxpc2hlZFZpZXcgPSBhY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnICYmIHB1Ymxpc2hlZFJlY29yZDtcbiAgY29uc3QgW21lbnVPcGVuLCBzZXRNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IG1lbnVSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW1lbnVPcGVuKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAobWVudVJlZi5jdXJyZW50ICYmICFtZW51UmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIH07XG4gIH0sIFttZW51T3Blbl0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JcIj5cbiAgICAgIDxzdHlsZT57U1RZTEVTfTwvc3R5bGU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWVkaXRvcl9faW5uZXJcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1iYWNrXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQmFja30+4oaQIEJhY2s8L2J1dHRvbj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWhlYWRlclwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1ldGFcIj5Db2xsZWN0aW9uIFR5cGU8L2Rpdj5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi10aXRsZVwiPntnZXREaXNwbGF5VGl0bGUoZGVmaW5pdGlvbiwgZGlzcGxheWVkUmVjb3JkKX08L2gxPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zdGF0dXNcIj57cHVibGlzaGVkUmVjb3JkID8gJ1B1Ymxpc2hlZCcgOiAoZGlzcGxheWVkUmVjb3JkLnN0YXR1cyB8fCAnRHJhZnQnKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10YWJzXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BhZG1pbi10YWIke2FjdGl2ZVRhYiA9PT0gJ2RyYWZ0JyA/ICcgYWRtaW4tdGFiLS1hY3RpdmUnIDogJyd9YH0gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG9uU3dpdGNoVGFiKCdkcmFmdCcpfT5EUkFGVDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgYWRtaW4tdGFiJHthY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnID8gJyBhZG1pbi10YWItLWFjdGl2ZScgOiAnJ31gfSB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gcHVibGlzaGVkUmVjb3JkICYmIG9uU3dpdGNoVGFiKCdwdWJsaXNoZWQnKX0+UFVCTElTSEVEPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHtlcnJvciA/IDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj57ZXJyb3J9PC9NZXNzYWdlQm94PiA6IG51bGx9XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1sYXlvdXRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1haW4tY2FyZFwiPlxuICAgICAgICAgICAge2RlZmluaXRpb24uZWRpdExheW91dC5tYXAoKHJvdywgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Byb3ctJHtpbmRleH1gfSBjbGFzc05hbWU9XCJhZG1pbi1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1maWVsZC1ncmlkXCI+XG4gICAgICAgICAgICAgICAgICB7cm93Lm1hcCgoZmllbGQpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkUmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uPXtkZWZpbml0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgIGtleT17ZmllbGR9XG4gICAgICAgICAgICAgICAgICAgICAgZmllbGQ9e2ZpZWxkfVxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkaXNwbGF5ZWRSZWNvcmRbZmllbGRdfVxuICAgICAgICAgICAgICAgICAgICAgIHBhdGg9e1tmaWVsZF19XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQWRkSXRlbT17b25BZGRJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgIG9uTW92ZUl0ZW09e29uTW92ZUl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzUHVibGlzaGVkVmlld31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGFzaWRlPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWNhcmRfX2hlYWRcIj5FbnRyeTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9fYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tcm93XCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25QdWJsaXNofSBkaXNhYmxlZD17IWNhblB1Ymxpc2h9PlB1Ymxpc2g8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeSBhZG1pbi1zaWRlLWJ1dHRvbi0tbWVudVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBzZXRNZW51T3BlbigoY3VycmVudCkgPT4gIWN1cnJlbnQpfT7igKY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIHttZW51T3BlbiA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiByZWY9e21lbnVSZWZ9IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtIGFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvblVucHVibGlzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuVW5wdWJsaXNofVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2ljb25cIj7Dlzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFVucHVibGlzaFxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGlzY2FyZENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhbkRpc2NhcmR9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvblwiPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgRGlzY2FyZCBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvblNhdmV9IGRpc2FibGVkPXshY2FuU2F2ZX0+XG4gICAgICAgICAgICAgICAgICB7c2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSd9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19oZWFkXCI+QWN0aW9uczwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9fYm9keVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtvbkRlbGV0ZX0gZGlzYWJsZWQ9e2lzUHVibGlzaGVkVmlld30+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9hc2lkZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29sbGVjdGlvbk1hbmFnZXIoKSB7XG4gIGNvbnN0IHsgcGFnZU5hbWUgfSA9IHVzZVBhcmFtcygpO1xuICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgYWRkTm90aWNlID0gdXNlTm90aWNlKCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbbGlzdExvYWRpbmcsIHNldExpc3RMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NhdmluZywgc2V0U2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RlZmluaXRpb24sIHNldERlZmluaXRpb25dID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtyZWNvcmRzLCBzZXRSZWNvcmRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW2NvbnRyb2xzLCBzZXRDb250cm9sc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3JlY29yZCwgc2V0UmVjb3JkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbb3JpZ2luYWxSZWNvcmQsIHNldE9yaWdpbmFsUmVjb3JkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbcHVibGlzaGVkUmVjb3JkLCBzZXRQdWJsaXNoZWRSZWNvcmRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZSgnZHJhZnQnKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgY29uc3QgcXVlcnkgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKSwgW2xvY2F0aW9uLnNlYXJjaF0pO1xuICBjb25zdCByZWNvcmRJZCA9IHF1ZXJ5LmdldCgncmVjb3JkSWQnKTtcbiAgY29uc3QgaXNOZXcgPSBxdWVyeS5nZXQoJ25ldycpID09PSAnMSc7XG4gIGNvbnN0IHNlYXJjaCA9IHF1ZXJ5LmdldCgnc2VhcmNoJykgfHwgJyc7XG4gIGNvbnN0IHN0YXR1cyA9IHF1ZXJ5LmdldCgnc3RhdHVzJykgfHwgJyc7XG4gIGNvbnN0IGNhdGVnb3J5ID0gcXVlcnkuZ2V0KCdjYXRlZ29yeScpIHx8ICcnO1xuICBjb25zdCBwbGFuVHlwZSA9IHF1ZXJ5LmdldCgncGxhblR5cGUnKSB8fCAnJztcbiAgY29uc3QgZmVhdHVyZWQgPSBxdWVyeS5nZXQoJ2ZlYXR1cmVkJykgfHwgJyc7XG4gIGNvbnN0IGlzRmVhdHVyZWQgPSBxdWVyeS5nZXQoJ2lzRmVhdHVyZWQnKSB8fCAnJztcbiAgY29uc3QgaXNQb3B1bGFyID0gcXVlcnkuZ2V0KCdpc1BvcHVsYXInKSB8fCAnJztcbiAgY29uc3Qgc29ydEJ5ID0gcXVlcnkuZ2V0KCdzb3J0QnknKSB8fCAnJztcbiAgY29uc3Qgc29ydE9yZGVyID0gcXVlcnkuZ2V0KCdzb3J0T3JkZXInKSB8fCAnJztcbiAgY29uc3QgZGlzcGxheWVkRmllbGRzID0gcGFyc2VEaXNwbGF5ZWRGaWVsZHMocXVlcnkuZ2V0KCdkaXNwbGF5ZWRGaWVsZHMnKSk7XG5cbiAgY29uc3QgbW9kZSA9IHVzZU1lbW8oKCkgPT4gKHJlY29yZElkIHx8IGlzTmV3ID8gJ2VkaXQnIDogJ2xpc3QnKSwgW3JlY29yZElkLCBpc05ld10pO1xuICBjb25zdCBpc0RpcnR5ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShyZWNvcmQpKSAhPT0gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUob3JpZ2luYWxSZWNvcmQpKSxcbiAgICBbcmVjb3JkLCBvcmlnaW5hbFJlY29yZF0sXG4gICk7XG4gIGNvbnN0IGhhc0RyYWZ0Q29udGVudCA9IHVzZU1lbW8oKCkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKHJlY29yZCksIFtyZWNvcmRdKTtcbiAgY29uc3QgaGFzVW5wdWJsaXNoZWRDaGFuZ2VzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShyZWNvcmQpKSAhPT0gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUocHVibGlzaGVkUmVjb3JkKSksXG4gICAgW3JlY29yZCwgcHVibGlzaGVkUmVjb3JkXSxcbiAgKTtcbiAgY29uc3QgY2FuU2F2ZSA9IG1vZGUgPT09ICdlZGl0JyAmJiAhc2F2aW5nICYmIGFjdGl2ZVRhYiAhPT0gJ3B1Ymxpc2hlZCcgJiYgaXNEaXJ0eTtcbiAgY29uc3QgY2FuUHVibGlzaCA9IG1vZGUgPT09ICdlZGl0JyAmJiAhc2F2aW5nICYmIGFjdGl2ZVRhYiAhPT0gJ3B1Ymxpc2hlZCcgJiYgKHB1Ymxpc2hlZFJlY29yZCA/IGhhc1VucHVibGlzaGVkQ2hhbmdlcyA6IGhhc0RyYWZ0Q29udGVudCk7XG4gIGNvbnN0IGNhbkRpc2NhcmQgPSBtb2RlID09PSAnZWRpdCcgJiYgIXNhdmluZyAmJiBhY3RpdmVUYWIgIT09ICdwdWJsaXNoZWQnICYmIGhhc0RyYWZ0Q29udGVudDtcbiAgY29uc3QgY2FuVW5wdWJsaXNoID0gbW9kZSA9PT0gJ2VkaXQnICYmICFzYXZpbmcgJiYgQm9vbGVhbihwdWJsaXNoZWRSZWNvcmQpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGFjdGl2ZSA9IHRydWU7XG5cbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc2hvdWxkQmxvY2sgPSBtb2RlID09PSAnZWRpdCcgfHwgIWRlZmluaXRpb247XG4gICAgICBpZiAoc2hvdWxkQmxvY2spIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldExpc3RMb2FkaW5nKHRydWUpO1xuICAgICAgfVxuICAgICAgc2V0RXJyb3IoJycpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RQYWdlKHBhZ2VOYW1lLCB7XG4gICAgICAgICAgcXVlcnk6IG1vZGUgPT09ICdlZGl0J1xuICAgICAgICAgICAgPyAocmVjb3JkSWQgPyB7IHJlY29yZElkIH0gOiB7IG5ldzogJzEnIH0pXG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgc2VhcmNoLFxuICAgICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICAgICAgICBwbGFuVHlwZSxcbiAgICAgICAgICAgICAgZmVhdHVyZWQsXG4gICAgICAgICAgICAgIGlzRmVhdHVyZWQsXG4gICAgICAgICAgICAgIGlzUG9wdWxhcixcbiAgICAgICAgICAgICAgc29ydEJ5LFxuICAgICAgICAgICAgICBzb3J0T3JkZXIsXG4gICAgICAgICAgICAgIGRpc3BsYXllZEZpZWxkczogZGlzcGxheWVkRmllbGRzLmpvaW4oJywnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RGVmaW5pdGlvbihwYXlsb2FkLmRlZmluaXRpb24pO1xuICAgICAgICBzZXRSZWNvcmRzKHBheWxvYWQucmVjb3JkcyA/PyBbXSk7XG4gICAgICAgIHNldENvbnRyb2xzKHBheWxvYWQuY29udHJvbHMgPz8gbnVsbCk7XG4gICAgICAgIGNvbnN0IG5leHREcmFmdFJlY29yZCA9IHBheWxvYWQuZHJhZnRSZWNvcmQgPyBjbG9uZVZhbHVlKHBheWxvYWQuZHJhZnRSZWNvcmQpIDogbnVsbDtcbiAgICAgICAgc2V0UmVjb3JkKG5leHREcmFmdFJlY29yZCk7XG4gICAgICAgIHNldE9yaWdpbmFsUmVjb3JkKG5leHREcmFmdFJlY29yZCA/IGNsb25lVmFsdWUobmV4dERyYWZ0UmVjb3JkKSA6IG51bGwpO1xuICAgICAgICBzZXRQdWJsaXNoZWRSZWNvcmQocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQgPyBjbG9uZVZhbHVlKHBheWxvYWQucHVibGlzaGVkUmVjb3JkKSA6IG51bGwpO1xuICAgICAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgICB9IGNhdGNoIChsb2FkRXJyb3IpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0RXJyb3IobG9hZEVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIHNldExpc3RMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkKCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG4gIH0sIFttb2RlLCBwYWdlTmFtZSwgcmVjb3JkSWQsIGlzTmV3LCBzZWFyY2gsIHN0YXR1cywgY2F0ZWdvcnksIHBsYW5UeXBlLCBmZWF0dXJlZCwgaXNGZWF0dXJlZCwgaXNQb3B1bGFyLCBzb3J0QnksIHNvcnRPcmRlciwgZGlzcGxheWVkRmllbGRzLmpvaW4oJywnKV0pO1xuXG4gIGNvbnN0IHVwZGF0ZUxpc3RRdWVyeSA9IChwYXRjaCkgPT4ge1xuICAgIGNvbnN0IG5leHRQYXJhbXMgPSB7XG4gICAgICBzZWFyY2gsXG4gICAgICBzdGF0dXMsXG4gICAgICBjYXRlZ29yeSxcbiAgICAgIHBsYW5UeXBlLFxuICAgICAgZmVhdHVyZWQsXG4gICAgICBpc0ZlYXR1cmVkLFxuICAgICAgaXNQb3B1bGFyLFxuICAgICAgc29ydEJ5LFxuICAgICAgc29ydE9yZGVyLFxuICAgICAgZGlzcGxheWVkRmllbGRzOiBkaXNwbGF5ZWRGaWVsZHMuam9pbignLCcpLFxuICAgICAgLi4ucGF0Y2gsXG4gICAgfTtcblxuICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCBuZXh0UGFyYW1zKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKHBhdGgsIG5leHRWYWx1ZSkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gdXBkYXRlQXRQYXRoKGN1cnJlbnQsIHBhdGgsIG5leHRWYWx1ZSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZEl0ZW0gPSAocGF0aCwgbmV4dEl0ZW0pID0+IHtcbiAgICBzZXRSZWNvcmQoKGN1cnJlbnQpID0+IGFwcGVuZEF0UGF0aChjdXJyZW50LCBwYXRoLCBuZXh0SXRlbSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZUl0ZW0gPSAocGF0aCkgPT4ge1xuICAgIHNldFJlY29yZCgoY3VycmVudCkgPT4gcmVtb3ZlQXRQYXRoKGN1cnJlbnQsIHBhdGgpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3ZlSXRlbSA9IChwYXRoLCBvZmZzZXQpID0+IHtcbiAgICBzZXRSZWNvcmQoKGN1cnJlbnQpID0+IG1vdmVBdFBhdGgoY3VycmVudCwgcGF0aCwgb2Zmc2V0KSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZUludGVudCA9IGFzeW5jIChpbnRlbnQpID0+IHtcbiAgICBpZiAoIXJlY29yZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0UGFnZShwYWdlTmFtZSwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGludGVudCxcbiAgICAgICAgICByZWNvcmRJZDogcmVjb3JkLmlkID8/IG51bGwsXG4gICAgICAgICAgcmVjb3JkLFxuICAgICAgICAgIG5ldzogaXNOZXcgPyAnMScgOiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgaWYgKHBheWxvYWQuZHJhZnRSZWNvcmQpIHtcbiAgICAgICAgY29uc3QgbmV4dERyYWZ0UmVjb3JkID0gY2xvbmVWYWx1ZShwYXlsb2FkLmRyYWZ0UmVjb3JkKTtcbiAgICAgICAgc2V0UmVjb3JkKG5leHREcmFmdFJlY29yZCk7XG4gICAgICAgIHNldE9yaWdpbmFsUmVjb3JkKGNsb25lVmFsdWUobmV4dERyYWZ0UmVjb3JkKSk7XG4gICAgICB9XG4gICAgICBzZXRQdWJsaXNoZWRSZWNvcmQocGF5bG9hZC5wdWJsaXNoZWRSZWNvcmQgPyBjbG9uZVZhbHVlKHBheWxvYWQucHVibGlzaGVkUmVjb3JkKSA6IG51bGwpO1xuICAgICAgaWYgKGludGVudCA9PT0gJ3VucHVibGlzaCcpIHtcbiAgICAgICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlY29yZElkICYmIHBheWxvYWQuZHJhZnRSZWNvcmQ/LmlkKSB7XG4gICAgICAgIG5hdmlnYXRlKGJ1aWxkQWRtaW5QYXRoKGxvY2F0aW9uLnBhdGhuYW1lLCB7IHJlY29yZElkOiBwYXlsb2FkLmRyYWZ0UmVjb3JkLmlkIH0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBheWxvYWQubm90aWNlKSB7XG4gICAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHBheWxvYWQubm90aWNlLm1lc3NhZ2UsIHR5cGU6IHBheWxvYWQubm90aWNlLnR5cGUgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXlsb2FkLmRlbGV0ZWQpIHtcbiAgICAgICAgbmF2aWdhdGUoYC9hZG1pbi9wYWdlcy8ke3BhZ2VOYW1lfWApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKHJlcXVlc3RFcnJvcikge1xuICAgICAgc2V0RXJyb3IocmVxdWVzdEVycm9yLm1lc3NhZ2UpO1xuICAgICAgYWRkTm90aWNlKHsgbWVzc2FnZTogcmVxdWVzdEVycm9yLm1lc3NhZ2UsIHR5cGU6ICdlcnJvcicgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURpc2NhcmRDaGFuZ2VzID0gKCkgPT4ge1xuICAgIHNldFJlY29yZChnZXRFbXB0eUl0ZW0ocmVjb3JkKSk7XG4gICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNyZWF0ZSA9IGFzeW5jICgpID0+IHtcbiAgICBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyBuZXc6IDEgfSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxpc3RBY3Rpb24gPSBhc3luYyAoaW50ZW50LCB0YXJnZXRSZWNvcmRJZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVxdWVzdFBhZ2UocGFnZU5hbWUsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBpbnRlbnQsXG4gICAgICAgICAgcmVjb3JkSWQ6IHRhcmdldFJlY29yZElkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGFkZE5vdGljZSh7IG1lc3NhZ2U6IHBheWxvYWQubm90aWNlPy5tZXNzYWdlID8/IGAke2RlZmluaXRpb24ubGFiZWx9IHVwZGF0ZWQuYCwgdHlwZTogcGF5bG9hZC5ub3RpY2U/LnR5cGUgPz8gJ3N1Y2Nlc3MnIH0pO1xuXG4gICAgICBpZiAoaW50ZW50ID09PSAnZHVwbGljYXRlJyAmJiBwYXlsb2FkLmRyYWZ0UmVjb3JkPy5pZCkge1xuICAgICAgICBuYXZpZ2F0ZShidWlsZEFkbWluUGF0aChsb2NhdGlvbi5wYXRobmFtZSwgeyByZWNvcmRJZDogcGF5bG9hZC5kcmFmdFJlY29yZC5pZCB9KSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGludGVudCA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgc2V0UmVjb3JkcygoY3VycmVudCkgPT4gY3VycmVudC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IHRhcmdldFJlY29yZElkKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAocmVxdWVzdEVycm9yKSB7XG4gICAgICBzZXRFcnJvcihyZXF1ZXN0RXJyb3IubWVzc2FnZSk7XG4gICAgICBhZGROb3RpY2UoeyBtZXNzYWdlOiByZXF1ZXN0RXJyb3IubWVzc2FnZSwgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGhlaWdodDogJzEwMCUnIH19PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgcmV0dXJuIDxNZXNzYWdlQm94IHZhcmlhbnQ9XCJkYW5nZXJcIj5Db2xsZWN0aW9uIGRlZmluaXRpb24gbWlzc2luZy48L01lc3NhZ2VCb3g+O1xuICB9XG5cbiAgaWYgKG1vZGUgPT09ICdsaXN0Jykge1xuICAgIHJldHVybiAoXG4gICAgICA8TGlzdFZpZXdcbiAgICAgICAgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn1cbiAgICAgICAgcmVjb3Jkcz17cmVjb3Jkc31cbiAgICAgICAgY29udHJvbHM9e2NvbnRyb2xzID8/IHtcbiAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRlZmluaXRpb24ubGlzdENvbHVtbnMubWFwKChjb2x1bW4pID0+IGNvbHVtbi5maWVsZCksXG4gICAgICAgICAgYXZhaWxhYmxlRmllbGRzOiBkZWZpbml0aW9uLmxpc3RDb2x1bW5zLFxuICAgICAgICAgIGZpbHRlcnM6IFtdLFxuICAgICAgICAgIGFjdGl2ZUZpbHRlcnM6IHt9LFxuICAgICAgICAgIHNvcnRCeTogJycsXG4gICAgICAgICAgc29ydE9yZGVyOiAnZGVzYycsXG4gICAgICAgIH19XG4gICAgICAgIHNlYXJjaD17c2VhcmNofVxuICAgICAgICBsb2FkaW5nPXtsaXN0TG9hZGluZ31cbiAgICAgICAgb25TZWFyY2g9eyhuZXh0U2VhcmNoKSA9PiB1cGRhdGVMaXN0UXVlcnkoeyBzZWFyY2g6IG5leHRTZWFyY2ggfSl9XG4gICAgICAgIG9uT3BlblJlY29yZD17KG5leHRSZWNvcmRJZCkgPT4gbmF2aWdhdGUoYnVpbGRBZG1pblBhdGgobG9jYXRpb24ucGF0aG5hbWUsIHsgcmVjb3JkSWQ6IG5leHRSZWNvcmRJZCB9KSl9XG4gICAgICAgIG9uQ3JlYXRlPXtoYW5kbGVDcmVhdGV9XG4gICAgICAgIG9uU2V0U29ydD17KGZpZWxkKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV4dE9yZGVyID0gY29udHJvbHM/LnNvcnRCeSA9PT0gZmllbGQgJiYgY29udHJvbHM/LnNvcnRPcmRlciA9PT0gJ2FzYycgPyAnZGVzYycgOiAnYXNjJztcbiAgICAgICAgICB1cGRhdGVMaXN0UXVlcnkoeyBzb3J0Qnk6IGZpZWxkLCBzb3J0T3JkZXI6IG5leHRPcmRlciB9KTtcbiAgICAgICAgfX1cbiAgICAgICAgb25TZXRGaWx0ZXI9eyhmaWVsZCwgdmFsdWUpID0+IHVwZGF0ZUxpc3RRdWVyeSh7IFtmaWVsZF06IHZhbHVlIH0pfVxuICAgICAgICBvblJlc2V0RmlsdGVycz17KCkgPT4gdXBkYXRlTGlzdFF1ZXJ5KHtcbiAgICAgICAgICBzdGF0dXM6ICcnLFxuICAgICAgICAgIGNhdGVnb3J5OiAnJyxcbiAgICAgICAgICBwbGFuVHlwZTogJycsXG4gICAgICAgICAgZmVhdHVyZWQ6ICcnLFxuICAgICAgICAgIGlzRmVhdHVyZWQ6ICcnLFxuICAgICAgICAgIGlzUG9wdWxhcjogJycsXG4gICAgICAgIH0pfVxuICAgICAgICBvblRvZ2dsZURpc3BsYXllZEZpZWxkPXsoZmllbGQsIGNoZWNrZWQpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXh0RmllbGRzID0gY2hlY2tlZFxuICAgICAgICAgICAgPyBbLi4ubmV3IFNldChbLi4uKGNvbnRyb2xzPy5kaXNwbGF5ZWRGaWVsZHMgPz8gW10pLCBmaWVsZF0pXVxuICAgICAgICAgICAgOiAoY29udHJvbHM/LmRpc3BsYXllZEZpZWxkcyA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBmaWVsZCk7XG5cbiAgICAgICAgICB1cGRhdGVMaXN0UXVlcnkoe1xuICAgICAgICAgICAgZGlzcGxheWVkRmllbGRzOiBuZXh0RmllbGRzLmpvaW4oJywnKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfX1cbiAgICAgICAgb25SZXNldERpc3BsYXllZEZpZWxkcz17KCkgPT4gdXBkYXRlTGlzdFF1ZXJ5KHtcbiAgICAgICAgICBkaXNwbGF5ZWRGaWVsZHM6IGRlZmluaXRpb24ubGlzdENvbHVtbnMubWFwKChjb2x1bW4pID0+IGNvbHVtbi5maWVsZCkuam9pbignLCcpLFxuICAgICAgICB9KX1cbiAgICAgICAgb25EdXBsaWNhdGVSZWNvcmQ9eyh0YXJnZXRSZWNvcmRJZCkgPT4gaGFuZGxlTGlzdEFjdGlvbignZHVwbGljYXRlJywgdGFyZ2V0UmVjb3JkSWQpfVxuICAgICAgICBvbkRlbGV0ZVJlY29yZD17KHRhcmdldFJlY29yZElkKSA9PiBoYW5kbGVMaXN0QWN0aW9uKCdkZWxldGUnLCB0YXJnZXRSZWNvcmRJZCl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBpZiAoIXJlY29yZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxFZGl0Vmlld1xuICAgICAgZGVmaW5pdGlvbj17ZGVmaW5pdGlvbn1cbiAgICAgIHJlY29yZD17cmVjb3JkfVxuICAgICAgcHVibGlzaGVkUmVjb3JkPXtwdWJsaXNoZWRSZWNvcmR9XG4gICAgICBhY3RpdmVUYWI9e2FjdGl2ZVRhYn1cbiAgICAgIG9uU3dpdGNoVGFiPXtzZXRBY3RpdmVUYWJ9XG4gICAgICBzYXZpbmc9e3NhdmluZ31cbiAgICAgIGVycm9yPXtlcnJvcn1cbiAgICAgIG9uQmFjaz17KCkgPT4gbmF2aWdhdGUoYC9hZG1pbi9wYWdlcy8ke3BhZ2VOYW1lfWApfVxuICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgIG9uQWRkSXRlbT17aGFuZGxlQWRkSXRlbX1cbiAgICAgIG9uUmVtb3ZlSXRlbT17aGFuZGxlUmVtb3ZlSXRlbX1cbiAgICAgIG9uTW92ZUl0ZW09e2hhbmRsZU1vdmVJdGVtfVxuICAgICAgb25TYXZlPXsoKSA9PiBoYW5kbGVTYXZlSW50ZW50KCdzYXZlJyl9XG4gICAgICBvblB1Ymxpc2g9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ3B1Ymxpc2gnKX1cbiAgICAgIG9uRGVsZXRlPXsoKSA9PiBoYW5kbGVTYXZlSW50ZW50KCdkZWxldGUnKX1cbiAgICAgIG9uRGlzY2FyZENoYW5nZXM9e2hhbmRsZURpc2NhcmRDaGFuZ2VzfVxuICAgICAgb25VbnB1Ymxpc2g9eygpID0+IGhhbmRsZVNhdmVJbnRlbnQoJ3VucHVibGlzaCcpfVxuICAgICAgY2FuU2F2ZT17Y2FuU2F2ZX1cbiAgICAgIGNhblB1Ymxpc2g9e2NhblB1Ymxpc2h9XG4gICAgICBjYW5EaXNjYXJkPXtjYW5EaXNjYXJkfVxuICAgICAgY2FuVW5wdWJsaXNoPXtjYW5VbnB1Ymxpc2h9XG4gICAgLz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IExvYWRlciwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbmNvbnN0IE1VTFRJTElORV9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fG1lc3NhZ2V8Ym9keXxzdWJ0aXRsZXxleGNlcnB0fGludHJvfGhvdXJzfGFkZHJlc3N8dGV4dHxwYXJhZ3JhcGh8b3ZlcnZpZXd8Y2hhbGxlbmdlfHJlc3VsdCkvaTtcbmNvbnN0IElNQUdFX0ZJRUxEX1BBVFRFUk4gPSAvKGltYWdlfGJhY2tncm91bmR8bG9nb3x0aHVtYm5haWx8ZmVhdHVyZWQpL2k7XG5jb25zdCBQQVRIX0ZJRUxEX1BBVFRFUk4gPSAvKF5wYXRoJHxQYXRoJCkvO1xuY29uc3QgRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOID0gLyhkZXNjcmlwdGlvbnxjb250ZW50fG1lc3NhZ2V8Ym9keXxzdWJ0aXRsZXxleGNlcnB0fGludHJvfG92ZXJ2aWV3fGNoYWxsZW5nZXxyZXN1bHR8YmFja2dyb3VuZHxpbWFnZXxnYWxsZXJ5fHNlY3Rpb25zfHRlc3RpbW9uaWFsc3xzZXJ2aWNlc3x3aHlDaG9vc2VJdGVtc3xmZWF0dXJlQ2hpcHN8c29jaWFsTGlua3N8ZmFxSXRlbXN8Y29tcGFyaXNvblJvd3N8Y29tcGFyaXNvbkNvbHVtbnN8c3RvcnlQYXJhZ3JhcGhzfHJlbGF0ZWRXb3Jrc3BhY2VzfGNoYWxsZW5nZUl0ZW1zfGFtZW5pdGllc3xuYXZpZ2F0aW9ufGZvb3Rlcnxmb3JtKS9pO1xuY29uc3QgUkVRVUlSRURfRklFTERfUEFUVEVSTiA9IC8oaGVyb1RpdGxlfGhlcm9TdWJ0aXRsZXxzdG9yeVRpdGxlfHdoeUNob29zZVRpdGxlfGFtZW5pdGllc1RpdGxlfHRpdGxlKSQvaTtcbmNvbnN0IFJPVVRFX09QVElPTlMgPSBbXG4gIHsgdmFsdWU6ICcvJywgbGFiZWw6ICdIb21lJyB9LFxuICB7IHZhbHVlOiAnL3ByaWNpbmcnLCBsYWJlbDogJ1ByaWNpbmcnIH0sXG4gIHsgdmFsdWU6ICcvbWVldGluZy1yb29tcycsIGxhYmVsOiAnTWVldGluZyBSb29tcycgfSxcbiAgeyB2YWx1ZTogJy92aXJ0dWFsLW9mZmljZScsIGxhYmVsOiAnVmlydHVhbCBPZmZpY2UnIH0sXG4gIHsgdmFsdWU6ICcvYWJvdXQnLCBsYWJlbDogJ0Fib3V0JyB9LFxuICB7IHZhbHVlOiAnL2NvbnRhY3QnLCBsYWJlbDogJ0NvbnRhY3QnIH0sXG4gIHsgdmFsdWU6ICcvZmFxJywgbGFiZWw6ICdGQVEnIH0sXG4gIHsgdmFsdWU6ICcvYmxvZycsIGxhYmVsOiAnQmxvZycgfSxcbiAgeyB2YWx1ZTogJy9wcml2YWN5JywgbGFiZWw6ICdQcml2YWN5IFBvbGljeScgfSxcbiAgeyB2YWx1ZTogJy90ZXJtcycsIGxhYmVsOiAnVGVybXMnIH0sXG4gIHsgdmFsdWU6ICcvZGFzaGJvYXJkJywgbGFiZWw6ICdEYXNoYm9hcmQnIH0sXG5dO1xuXG5jb25zdCBQQUdFX0xBWU9VVFMgPSB7XG4gICdzaXRlLXNldHRpbmdzJzogW1xuICAgIHsgZmllbGRzOiBbJ3NpdGVOYW1lJywgJ3RhZ2xpbmUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RFbWFpbCcsICdjb250YWN0UGhvbmUnLCAnYWRkcmVzcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnZGVmYXVsdFNlb1RpdGxlJywgJ2RlZmF1bHRTZW9EZXNjcmlwdGlvbiddIH0sXG4gICAgeyBmaWVsZHM6IFsnbmF2aWdhdGlvbiddIH0sXG4gICAgeyBmaWVsZHM6IFsnZm9vdGVyJ10gfSxcbiAgICB7IGZpZWxkczogWydzb2NpYWxMaW5rcyddIH0sXG4gIF0sXG4gIGhvbWVwYWdlOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVybycsICdmZWF0dXJlQ2hpcHMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlcnZpY2VzRXllYnJvdycsICdzZXJ2aWNlc0tpY2tlcicsICdzZXJ2aWNlcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnYWJvdXRIaWdobGlnaHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3doeUNob29zZUV5ZWJyb3cnLCAnd2h5Q2hvb3NlS2lja2VyJywgJ3doeUNob29zZVRpdGxlJywgJ3doeUNob29zZUl0ZW1zJ10gfSxcbiAgICB7IGZpZWxkczogWyd0ZXN0aW1vbmlhbHNFeWVicm93JywgJ3Rlc3RpbW9uaWFsc0tpY2tlcicsICd0ZXN0aW1vbmlhbHNUaXRsZScsICd0ZXN0aW1vbmlhbHMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2dhbGxlcnlFeWVicm93JywgJ2dhbGxlcnlLaWNrZXInLCAnZ2FsbGVyeVRpdGxlJywgJ2dhbGxlcnlJbWFnZXMnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2NvbnRhY3RGb3JtJ10gfSxcbiAgICB7IGZpZWxkczogWyd2aXNpdFVzVGl0bGUnLCAnYWRkcmVzc0xhYmVsJywgJ2VtYWlsTGFiZWwnLCAncGhvbmVMYWJlbCcsICdvcGVuSG91cnNMYWJlbCcsICd3ZWVrZGF5SG91cnMnLCAnd2Vla2VuZEhvdXJzJywgJ21hcEJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbiAgJ2Fib3V0LXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydzdG9yeVRpdGxlJywgJ3N0b3J5UGFyYWdyYXBocycsICdzdG9yeUltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWyd3aHlDaG9vc2VUaXRsZScsICd3aHlDaG9vc2VJdGVtcyddIH0sXG4gICAgeyBmaWVsZHM6IFsnYW1lbml0aWVzVGl0bGUnLCAnYW1lbml0aWVzSW1hZ2UnLCAnYW1lbml0aWVzJ10gfSxcbiAgXSxcbiAgJ2Jsb2ctcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlYXJjaFBsYWNlaG9sZGVyJywgJ3F1aWNrU2VhcmNoVGl0bGUnLCAncmVjZW50UG9zdHNUaXRsZScsICdjYXRlZ29yaWVzVGl0bGUnLCAncG9wdWxhclRhZ3NUaXRsZScsICdub1Jlc3VsdHNUZXh0J10gfSxcbiAgICB7IGZpZWxkczogWydkZXRhaWxCYWNrTGFiZWwnLCAnZGV0YWlsU2VhcmNoVGl0bGUnLCAnZGV0YWlsU2VhcmNoQnV0dG9uTGFiZWwnLCAnZGV0YWlsUG9wdWxhclRhZ3NUaXRsZScsICdkZXRhaWxSZWNlbnRQb3N0c1RpdGxlJywgJ2RldGFpbFJlbGF0ZWRXb3Jrc3BhY2VzVGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2RldGFpbENvbW1lbnRGb3JtJ10gfSxcbiAgICB7IGZpZWxkczogWydyZWxhdGVkV29ya3NwYWNlcyddIH0sXG4gIF0sXG4gICdwcmljaW5nLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZScsICdoZXJvQmFja2dyb3VuZEltYWdlJ10gfSxcbiAgICB7IGZpZWxkczogWydjb21wYXJpc29uVGl0bGUnLCAnZmVhdHVyZUxpc3RUaXRsZScsICdmZWF0dXJlTGlzdFN1YnRpdGxlJywgJ2NvbXBhcmlzb25Db2x1bW5zJywgJ2NvbXBhcmlzb25Sb3dzJywgJ3JlY29tbWVuZGVkTGFiZWwnLCAncHVyY2hhc2VCdXR0b25MYWJlbCddIH0sXG4gICAgeyBmaWVsZHM6IFsnZmFxVGl0bGUnLCAnZmFxU3VidGl0bGUnLCAnZmFxSXRlbXMnXSB9LFxuICBdLFxuICAnZmFxLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnZXllYnJvdycsICdoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnLCAndGl0bGUnLCAnZGVzY3JpcHRpb24nXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlYXJjaFBsYWNlaG9sZGVyJywgJ25vUmVzdWx0c1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2N0YVRpdGxlJywgJ2N0YURlc2NyaXB0aW9uJywgJ2N0YUJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbiAgJ21lZXRpbmctcm9vbXMtcGFnZSc6IFtcbiAgICB7IGZpZWxkczogWydoZXJvVGl0bGUnLCAnaGVyb1N1YnRpdGxlJywgJ2hlcm9CYWNrZ3JvdW5kSW1hZ2UnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Jvb21zVGl0bGUnLCAncm9vbXNTdWJ0aXRsZScsICdib29rTm93TGFiZWwnLCAncmVhZE1vcmVMYWJlbCcsICdwb3B1bGFyTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3BsYW5zVGl0bGUnLCAncGxhbnNTdWJ0aXRsZScsICdnZXRTdGFydGVkTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2FtZW5pdGllc1RpdGxlJywgJ2FtZW5pdGllc1N1YnRpdGxlJywgJ2FtZW5pdGllcyddIH0sXG4gIF0sXG4gICd2aXJ0dWFsLW9mZmljZS1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnb3ZlcnZpZXdUaXRsZScsICdvdmVydmlld1RleHQnLCAnZmVhdHVyZWRJbWFnZScsICdnYWxsZXJ5SW1hZ2VzJ10gfSxcbiAgICB7IGZpZWxkczogWydjaGFsbGVuZ2VUaXRsZScsICdjaGFsbGVuZ2VJbnRybycsICdjaGFsbGVuZ2VJdGVtcyddIH0sXG4gICAgeyBmaWVsZHM6IFsncmVzdWx0VGl0bGUnLCAncmVzdWx0VGV4dCddIH0sXG4gICAgeyBmaWVsZHM6IFsnY3RhVGl0bGUnLCAnY3RhRGVzY3JpcHRpb24nLCAnY3RhQnV0dG9uTGFiZWwnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3Byb2plY3RJbmZvVGl0bGUnLCAncHJvamVjdERhdGVMYWJlbCcsICdwcm9qZWN0RGF0ZVZhbHVlJywgJ3Byb2plY3RXZWJzaXRlTGFiZWwnLCAncHJvamVjdFdlYnNpdGVWYWx1ZScsICdwcm9qZWN0Q2F0ZWdvcnlMYWJlbCcsICdwcm9qZWN0Q2F0ZWdvcnlWYWx1ZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnY29udGFjdEZvcm0nXSB9LFxuICBdLFxuICAnY29udGFjdC1wYWdlJzogW1xuICAgIHsgZmllbGRzOiBbJ2hlcm9UaXRsZScsICdoZXJvU3VidGl0bGUnLCAnaGVyb0JhY2tncm91bmRJbWFnZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnaW50cm9FeWVicm93JywgJ2ludHJvVGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2FkZHJlc3NDYXJkVGl0bGUnLCAncGhvbmVDYXJkVGl0bGUnLCAnZW1haWxDYXJkVGl0bGUnXSB9LFxuICAgIHsgZmllbGRzOiBbJ2Zvcm0nXSB9LFxuICAgIHsgZmllbGRzOiBbJ21hcFRpdGxlJywgJ21hcERlc2NyaXB0aW9uJ10gfSxcbiAgXSxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnZWZmZWN0aXZlRGF0ZUxhYmVsJywgJ2VmZmVjdGl2ZURhdGVWYWx1ZScsICdpbnRyb1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlY3Rpb25zJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0VGl0bGUnLCAnY29udGFjdEJvZHknLCAnY29udGFjdEJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbiAgJ3Rlcm1zLXBhZ2UnOiBbXG4gICAgeyBmaWVsZHM6IFsnaGVyb1RpdGxlJywgJ2hlcm9TdWJ0aXRsZSddIH0sXG4gICAgeyBmaWVsZHM6IFsnZWZmZWN0aXZlRGF0ZUxhYmVsJywgJ2VmZmVjdGl2ZURhdGVWYWx1ZScsICdpbnRyb1RleHQnXSB9LFxuICAgIHsgZmllbGRzOiBbJ3NlY3Rpb25zJ10gfSxcbiAgICB7IGZpZWxkczogWydjb250YWN0VGl0bGUnLCAnY29udGFjdEJvZHknLCAnY29udGFjdEJ1dHRvbkxhYmVsJ10gfSxcbiAgXSxcbn07XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5hZG1pbi1lZGl0b3Ige1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAzMnB4IDQwcHggNjRweCAzNDRweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1lZGl0b3JfX2lubmVyIHtcbiAgbWF4LXdpZHRoOiAxMjQwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4uYWRtaW4tYmFjayB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM0OTQ1ZmY7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XG59XG5cbi5hZG1pbi1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDI0cHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG5cbi5hZG1pbi1tZXRhIHtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cblxuLmFkbWluLXRpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjc1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLXN0YXR1cyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAycmVtO1xuICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIG1hcmdpbi10b3A6IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjNmYwYzI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2VmZmZlZDtcbiAgY29sb3I6ICMyZjY4NDY7XG4gIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmFkbWluLWtlYmFiIHtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tdGFicyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYWVhZWY7XG59XG5cbi5hZG1pbi10YWIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDAgMCAxMnB4O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tdGFiLS1hY3RpdmUge1xuICBjb2xvcjogIzQ5NDVmZjtcbn1cblxuLmFkbWluLXRhYi0tYWN0aXZlOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IC0xcHg7XG4gIGhlaWdodDogMnB4O1xuICBiYWNrZ3JvdW5kOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tbGF5b3V0IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwgMWZyKSAyMzJweDtcbiAgZ2FwOiAxNnB4O1xuICBhbGlnbi1pdGVtczogc3RhcnQ7XG59XG5cbi5hZG1pbi1tYWluLWNhcmQsXG4uYWRtaW4tc2lkZS1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbn1cblxuLmFkbWluLW1haW4tY2FyZCB7XG4gIHBhZGRpbmc6IDI0cHg7XG59XG5cbi5hZG1pbi1zZWN0aW9uICsgLmFkbWluLXNlY3Rpb24ge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4uYWRtaW4tZmllbGQtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKTtcbiAgZ2FwOiAyMHB4IDI0cHg7XG59XG5cbi5hZG1pbi1maWVsZCB7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLmFkbWluLWZpZWxkLS1mdWxsIHtcbiAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcbn1cblxuLmFkbWluLWxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMnB4O1xuICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYWRtaW4tbGFiZWxfX3JlcXVpcmVkIHtcbiAgY29sb3I6ICNkMDJiMjA7XG59XG5cbi5hZG1pbi1pbnB1dCxcbi5hZG1pbi10ZXh0YXJlYSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwLjYyNXJlbSAwLjg3NXJlbTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5hZG1pbi1pbnB1dCB7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbn1cblxuLmFkbWluLWlucHV0OmZvY3VzLFxuLmFkbWluLXRleHRhcmVhOmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjNDk0NWZmO1xuICBib3gtc2hhZG93OiAwIDAgMCAxcHggIzQ5NDVmZjtcbn1cblxuLmFkbWluLWlucHV0OmRpc2FibGVkLFxuLmFkbWluLXRleHRhcmVhOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi10ZXh0YXJlYSB7XG4gIG1pbi1oZWlnaHQ6IDUuNzVyZW07XG4gIHJlc2l6ZTogdmVydGljYWw7XG59XG5cbi5hZG1pbi1tZWRpYSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmFkbWluLW1lZGlhX19jYW52YXMge1xuICBtaW4taGVpZ2h0OiAxNDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZiO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmFkbWluLW1lZGlhX19lbXB0eSB7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhX19zdGFjayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX3RodW1iIHtcbiAgbWF4LXdpZHRoOiAyNDBweDtcbiAgbWF4LWhlaWdodDogMTQwcHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG59XG5cbi5hZG1pbi1tZWRpYV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX2FjdGlvbiB7XG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDJyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLW1lZGlhX19hY3Rpb246ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmFkbWluLW1lZGlhX19maWxlbmFtZSB7XG4gIG1heC13aWR0aDogMjgwcHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLmFkbWluLW1lZGlhX19zb3VyY2Uge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4uYWRtaW4tbWVkaWFfX3NvdXJjZS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbn1cblxuLmFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uIHtcbiAgbWluLWhlaWdodDogMnJlbTtcbiAgcGFkZGluZzogMCAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5hZG1pbi1tZWRpYV9fZXJyb3Ige1xuICBjb2xvcjogI2QwMmIyMDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbn1cblxuLmFkbWluLW9iamVjdCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmFkbWluLW9iamVjdF9fdGl0bGUge1xuICBtYXJnaW46IDAgMCAxMnB4O1xuICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2hlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4IDEwcHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjBmMGY1O1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fdGl0bGUge1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMyMzI0ZDtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2NvdW50IHtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2l0ZW0gKyAuYWRtaW4tcmVwZWF0YWJsZV9faXRlbSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbS0tZHJhZy1vdmVyIHN1bW1hcnkge1xuICBiYWNrZ3JvdW5kOiAjZjBmMGZmO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faXRlbVtvcGVuXSBzdW1tYXJ5IHtcbiAgYmFja2dyb3VuZDogI2ZhZmFmYjtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnkge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19zdW1tYXJ5Ojotd2Via2l0LWRldGFpbHMtbWFya2VyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnktbGVmdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fYnVsbGV0IHtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjU7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMC42MjVyZW07XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19uYW1lIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2FjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b24ge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9fZHJhZy1oYW5kbGUge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlOGVhOTtcbiAgY3Vyc29yOiBncmFiO1xuICBwYWRkaW5nOiAwIDJweDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMTtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlOmFjdGl2ZSB7XG4gIGN1cnNvcjogZ3JhYmJpbmc7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19kcmFnLWhhbmRsZTpkaXNhYmxlZCB7XG4gIGNvbG9yOiAjYzRjNGQyO1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkOmRpc2FibGVkLFxuLmFkbWluLXNpZGUtYnV0dG9uOmRpc2FibGVkLFxuLmFkbWluLXNpZGUtYnV0dG9uLS1zZWNvbmRhcnk6ZGlzYWJsZWQge1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICBvcGFjaXR5OiAxO1xufVxuXG4uYWRtaW4tcmVwZWF0YWJsZV9faWNvbi1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tcmVwZWF0YWJsZV9fYWRkOmRpc2FibGVkIHtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG5cbi5hZG1pbi1yZXBlYXRhYmxlX19ib2R5IHtcbiAgcGFkZGluZzogMTZweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cblxuLmFkbWluLXJlcGVhdGFibGVfX2FkZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGY1O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tc3dpdGNoIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAwLjYyNXJlbSAwLjg3NXJlbTtcbn1cblxuLmFkbWluLXN3aXRjaCBpbnB1dCB7XG4gIGFjY2VudC1jb2xvcjogIzQ5NDVmZjtcbn1cblxuLmFkbWluLXN3aXRjaDpoYXMoaW5wdXQ6ZGlzYWJsZWQpIHtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG5cbi5hZG1pbi1zaWRlLWNhcmQgKyAuYWRtaW4tc2lkZS1jYXJkIHtcbiAgbWFyZ2luLXRvcDogMTJweDtcbn1cblxuLmFkbWluLXNpZGUtY2FyZF9faGVhZCB7XG4gIHBhZGRpbmc6IDE0cHggMTZweCA4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4uYWRtaW4tc2lkZS1jYXJkX19ib2R5IHtcbiAgcGFkZGluZzogMCAxMnB4IDEycHg7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbi1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbixcbi5hZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIuMjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbiB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM0OTQ1ZmY7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tc2lkZS1idXR0b246ZGlzYWJsZWQsXG4uYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIGJvcmRlci1jb2xvcjogI2RjZGNlNDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICM4ZThlYTk7XG59XG5cbi5hZG1pbi1zaWRlLWJ1dHRvbi0tbWVudSB7XG4gIHdpZHRoOiAycmVtO1xuICBmbGV4OiAwIDAgMnJlbTtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogY2FsYygxMDAlICsgOHB4KTtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAyMjBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDEycHggMzJweCByZ2JhKDMzLCAzMywgNTIsIDAuMTIpO1xuICBwYWRkaW5nOiA4cHggMDtcbiAgei1pbmRleDogNDA7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyIHtcbiAgY29sb3I6ICNkMDJiMjA7XG59XG5cbi5hZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU4ZWE5O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvbiB7XG4gIHdpZHRoOiAxOHB4O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMTE4MHB4KSB7XG4gIC5hZG1pbi1sYXlvdXQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NjBweCkge1xuICAuYWRtaW4tZWRpdG9yIHtcbiAgICBwYWRkaW5nOiAyMHB4IDE2cHggNDhweDtcbiAgfVxuXG4gIC5hZG1pbi1maWVsZC1ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuYDtcblxuZnVuY3Rpb24gdG9MYWJlbChuYW1lKSB7XG4gIHJldHVybiBuYW1lXG4gICAgLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csICckMSAkMicpXG4gICAgLnJlcGxhY2UoL1tfLV0rL2csICcgJylcbiAgICAucmVwbGFjZSgvXFxic2VvXFxiL2dpLCAnU0VPJylcbiAgICAucmVwbGFjZSgvXFxiY3RhXFxiL2dpLCAnQ1RBJylcbiAgICAucmVwbGFjZSgvXFxiZmFxXFxiL2dpLCAnRkFRJylcbiAgICAucmVwbGFjZSgvXFxiaWRcXGIvZ2ksICdJRCcpXG4gICAgLnJlcGxhY2UoL1xcYnVybFxcYi9naSwgJ1VSTCcpXG4gICAgLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgIC50cmltKClcbiAgICAucmVwbGFjZSgvXi4vLCAodmFsdWUpID0+IHZhbHVlLnRvVXBwZXJDYXNlKCkpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWVsZExhYmVsKGZpZWxkS2V5KSB7XG4gIGlmIChmaWVsZEtleSA9PT0gJ3BhdGgnKSB7XG4gICAgcmV0dXJuICdEZXN0aW5hdGlvbic7XG4gIH1cblxuICBpZiAoZmllbGRLZXkuZW5kc1dpdGgoJ1BhdGgnKSkge1xuICAgIHJldHVybiB0b0xhYmVsKGZpZWxkS2V5LnJlcGxhY2UoL1BhdGgkLywgJ0Rlc3RpbmF0aW9uJykpO1xuICB9XG5cbiAgcmV0dXJuIHRvTGFiZWwoZmllbGRLZXkpO1xufVxuXG5mdW5jdGlvbiBnZXRQYXRoT3B0aW9ucyhjdXJyZW50VmFsdWUpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IFsuLi5ST1VURV9PUFRJT05TXTtcblxuICBpZiAoY3VycmVudFZhbHVlICYmICFvcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBjdXJyZW50VmFsdWUpKSB7XG4gICAgb3B0aW9ucy51bnNoaWZ0KHtcbiAgICAgIHZhbHVlOiBjdXJyZW50VmFsdWUsXG4gICAgICBsYWJlbDogJ0N1cnJlbnQgZGVzdGluYXRpb24nLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGNsb25lVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gdG9Db21wYXJhYmxlVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoaXRlbSkgPT4gdG9Db21wYXJhYmxlVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKVxuICAgICAgLnNvcnQoKVxuICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09ICdfX3RlbXBJZCcpXG4gICAgICAucmVkdWNlKChhY2N1bXVsYXRvciwga2V5KSA9PiB7XG4gICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSB0b0NvbXBhcmFibGVWYWx1ZSh2YWx1ZVtrZXldKTtcbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBoYXNNZWFuaW5nZnVsVmFsdWUodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNvbWUoKGl0ZW0pID0+IGhhc01lYW5pbmdmdWxWYWx1ZShpdGVtKSk7XG4gIH1cblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModmFsdWUpXG4gICAgICAuZmlsdGVyKChba2V5XSkgPT4ga2V5ICE9PSAnX190ZW1wSWQnKVxuICAgICAgLnNvbWUoKFssIG5lc3RlZFZhbHVlXSkgPT4gaGFzTWVhbmluZ2Z1bFZhbHVlKG5lc3RlZFZhbHVlKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSAwO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlICE9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXRGaWxlbmFtZSh1cmwpIHtcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRobmFtZSA9IG5ldyBVUkwodXJsKS5wYXRobmFtZTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGhuYW1lLnNwbGl0KCcvJykucG9wKCk7XG4gICAgcmV0dXJuIGZpbGVuYW1lIHx8IHVybDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVybC5zcGxpdCgnLycpLnBvcCgpIHx8IHVybDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFbXB0eUl0ZW0oc2FtcGxlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNhbXBsZSkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoc2FtcGxlICYmIHR5cGVvZiBzYW1wbGUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIE9iamVjdC5rZXlzKHNhbXBsZSlcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09ICdpZCcpXG4gICAgICAgIC5tYXAoKGtleSkgPT4gW2tleSwgZ2V0RW1wdHlJdGVtKHNhbXBsZVtrZXldKV0pLFxuICAgICk7XG4gIH1cblxuICBpZiAodHlwZW9mIHNhbXBsZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzYW1wbGUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0UGF0aCh2YWx1ZSwgcGF0aCwgbmV4dFZhbHVlKSB7XG4gIGlmICghcGF0aC5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV4dFZhbHVlO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gdXBkYXRlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG5leHRWYWx1ZSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXRQYXRoKHZhbHVlLCBwYXRoKSB7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUuZmlsdGVyKChfLCBpbmRleCkgPT4gaW5kZXggIT09IHBhdGhbMF0pO1xuICB9XG5cbiAgY29uc3QgW3NlZ21lbnQsIC4uLnJlc3RdID0gcGF0aDtcbiAgY29uc3QgY2xvbmUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gIGNsb25lW3NlZ21lbnRdID0gcmVtb3ZlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QpO1xuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEF0UGF0aCh2YWx1ZSwgcGF0aCwgbmV4dEl0ZW0pIHtcbiAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgIHJldHVybiBbLi4uKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSksIG5leHRJdGVtXTtcbiAgfVxuXG4gIGNvbnN0IFtzZWdtZW50LCAuLi5yZXN0XSA9IHBhdGg7XG4gIGNvbnN0IGNsb25lID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICBjbG9uZVtzZWdtZW50XSA9IGFwcGVuZEF0UGF0aCh2YWx1ZT8uW3NlZ21lbnRdLCByZXN0LCBuZXh0SXRlbSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gbW92ZUF0UGF0aCh2YWx1ZSwgcGF0aCwgb2Zmc2V0KSB7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IHBhdGhbMF07XG4gICAgY29uc3QgbmV4dEluZGV4ID0gaW5kZXggKyBvZmZzZXQ7XG5cbiAgICBpZiAobmV4dEluZGV4IDwgMCB8fCBuZXh0SW5kZXggPj0gdmFsdWUubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgY2xvbmUgPSBbLi4udmFsdWVdO1xuICAgIGNvbnN0IFttb3ZlZF0gPSBjbG9uZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGNsb25lLnNwbGljZShuZXh0SW5kZXgsIDAsIG1vdmVkKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICBjb25zdCBbc2VnbWVudCwgLi4ucmVzdF0gPSBwYXRoO1xuICBjb25zdCBjbG9uZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gWy4uLnZhbHVlXSA6IHsgLi4udmFsdWUgfTtcbiAgY2xvbmVbc2VnbWVudF0gPSBtb3ZlQXRQYXRoKHZhbHVlPy5bc2VnbWVudF0sIHJlc3QsIG9mZnNldCk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gcGFyc2VJbnB1dFZhbHVlKG5leHRSYXdWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIGlmIChuZXh0UmF3VmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobmV4dFJhd1ZhbHVlKTtcbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZCkgPyBjdXJyZW50VmFsdWUgOiBwYXJzZWQ7XG4gIH1cblxuICByZXR1cm4gbmV4dFJhd1ZhbHVlO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTWVkaWFQcmV2aWV3VXJsKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3QgdHJpbW1lZCA9IHZhbHVlLnRyaW0oKTtcblxuICBpZiAoIXRyaW1tZWQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoL15odHRwcz86XFwvXFwvL2kudGVzdCh0cmltbWVkKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2UvJykpIHtcbiAgICByZXR1cm4gdHJpbW1lZDtcbiAgfVxuXG4gIGlmICh0cmltbWVkLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgIHJldHVybiB0cmltbWVkO1xuICB9XG5cbiAgcmV0dXJuIGAvJHt0cmltbWVkLnJlcGxhY2UoL15cXC4/XFwvLywgJycpfWA7XG59XG5cbmZ1bmN0aW9uIHRvQWRtaW5FcnJvck1lc3NhZ2UoZXJyb3IsIGZhbGxiYWNrKSB7XG4gIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGVycm9yPy5yZXNwb25zZT8uZGF0YTtcblxuICBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YT8ubWVzc2FnZSA9PT0gJ3N0cmluZycgJiYgcmVzcG9uc2VEYXRhLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlRGF0YS5tZXNzYWdlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZXNwb25zZURhdGE/LmVycm9yID09PSAnc3RyaW5nJyAmJiByZXNwb25zZURhdGEuZXJyb3IudHJpbSgpKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlRGF0YS5lcnJvcjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXJyb3I/Lm1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIGVycm9yLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgcmV0dXJuIGVycm9yLm1lc3NhZ2U7XG4gIH1cblxuICByZXR1cm4gZmFsbGJhY2s7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwbG9hZEFkbWluSW1hZ2UoZmlsZSkge1xuICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL21lZGlhL3VwbG9hZCcsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBmb3JtRGF0YSxcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSk7XG5cbiAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQuZXJyb3IgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gIH1cblxuICBjb25zdCB1cGxvYWRlZFVybCA9IHBheWxvYWQ/LnVybCB8fCBwYXlsb2FkPy5pdGVtPy5yZWxhdGl2ZVVybCB8fCBwYXlsb2FkPy5pdGVtPy51cmw7XG5cbiAgaWYgKCF1cGxvYWRlZFVybCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVXBsb2FkIHN1Y2NlZWRlZCBidXQgcmV0dXJuZWQgbm8gVVJMLicpO1xuICB9XG5cbiAgcmV0dXJuIHVwbG9hZGVkVXJsO1xufVxuXG5mdW5jdGlvbiBpc1JlcXVpcmVkRmllbGQoZmllbGRLZXkpIHtcbiAgcmV0dXJuIFJFUVVJUkVEX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSk7XG59XG5cbmZ1bmN0aW9uIGZpZWxkQ2xhc3NOYW1lKGZpZWxkS2V5LCB2YWx1ZSkge1xuICByZXR1cm4gRlVMTF9XSURUSF9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGRLZXkpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXG4gICAgPyAnYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGwnXG4gICAgOiAnYWRtaW4tZmllbGQnO1xufVxuXG5mdW5jdGlvbiBnZXRJdGVtVGl0bGUoaXRlbSwgZmFsbGJhY2tMYWJlbCwgaW5kZXgpIHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGl0ZW0pKSB7XG4gICAgcmV0dXJuIGAke2ZhbGxiYWNrTGFiZWx9ICR7aW5kZXggKyAxfWA7XG4gIH1cblxuICBjb25zdCBwcmVmZXJyZWQgPSBbXG4gICAgaXRlbS50aXRsZSxcbiAgICBpdGVtLm5hbWUsXG4gICAgaXRlbS5sYWJlbCxcbiAgICBpdGVtLnF1ZXN0aW9uLFxuICAgIGl0ZW0uZmVhdHVyZSxcbiAgICBpdGVtLnBhdGgsXG4gICAgaXRlbS5ocmVmLFxuICAgIGl0ZW0uYWx0LFxuICBdLmZpbmQoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRyaW0oKSk7XG5cbiAgcmV0dXJuIHByZWZlcnJlZCB8fCBgJHtmYWxsYmFja0xhYmVsfSAke2luZGV4ICsgMX1gO1xufVxuXG5mdW5jdGlvbiBidWlsZFNlY3Rpb25zKHBhZ2VOYW1lLCBjb250ZW50KSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhjb250ZW50ID8/IHt9KTtcbiAgY29uc3QgbGF5b3V0ID0gUEFHRV9MQVlPVVRTW3BhZ2VOYW1lXTtcblxuICBpZiAoIWxheW91dCkge1xuICAgIHJldHVybiBbeyBlbnRyaWVzIH1dO1xuICB9XG5cbiAgY29uc3QgdXNlZCA9IG5ldyBTZXQoKTtcbiAgY29uc3Qgc2VjdGlvbnMgPSBsYXlvdXRcbiAgICAubWFwKChzZWN0aW9uKSA9PiB7XG4gICAgICBjb25zdCBzZWN0aW9uRW50cmllcyA9IHNlY3Rpb24uZmllbGRzXG4gICAgICAgIC5maWx0ZXIoKGZpZWxkKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29udGVudCA/PyB7fSwgZmllbGQpKVxuICAgICAgICAubWFwKChmaWVsZCkgPT4ge1xuICAgICAgICAgIHVzZWQuYWRkKGZpZWxkKTtcbiAgICAgICAgICByZXR1cm4gW2ZpZWxkLCBjb250ZW50W2ZpZWxkXV07XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4geyAuLi5zZWN0aW9uLCBlbnRyaWVzOiBzZWN0aW9uRW50cmllcyB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigoc2VjdGlvbikgPT4gc2VjdGlvbi5lbnRyaWVzLmxlbmd0aCA+IDApO1xuXG4gIGNvbnN0IGV4dHJhRW50cmllcyA9IGVudHJpZXMuZmlsdGVyKChbZmllbGRLZXldKSA9PiAhdXNlZC5oYXMoZmllbGRLZXkpKTtcblxuICBpZiAoZXh0cmFFbnRyaWVzLmxlbmd0aCkge1xuICAgIHNlY3Rpb25zLnB1c2goeyBlbnRyaWVzOiBleHRyYUVudHJpZXMgfSk7XG4gIH1cblxuICByZXR1cm4gc2VjdGlvbnM7XG59XG5cbmZ1bmN0aW9uIFByaW1pdGl2ZUZpZWxkKHsgZmllbGRLZXksIHZhbHVlLCBwYXRoLCBvbkNoYW5nZSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBsYWJlbCA9IGdldEZpZWxkTGFiZWwoZmllbGRLZXkpO1xuICBjb25zdCBpbnB1dFZhbHVlID0gdmFsdWUgPz8gJyc7XG4gIGNvbnN0IHJlcXVpcmVkID0gaXNSZXF1aXJlZEZpZWxkKGZpZWxkS2V5KTtcbiAgY29uc3QgaXNJbWFnZUZpZWxkID0gdHlwZW9mIGlucHV0VmFsdWUgPT09ICdzdHJpbmcnICYmIElNQUdFX0ZJRUxEX1BBVFRFUk4udGVzdChmaWVsZEtleSk7XG4gIGNvbnN0IGlzUGF0aEZpZWxkID0gdHlwZW9mIGlucHV0VmFsdWUgPT09ICdzdHJpbmcnICYmIFBBVEhfRklFTERfUEFUVEVSTi50ZXN0KGZpZWxkS2V5KTtcbiAgY29uc3QgcHJldmlld1VybCA9IGlzSW1hZ2VGaWVsZCA/IHJlc29sdmVNZWRpYVByZXZpZXdVcmwoaW5wdXRWYWx1ZSkgOiAnJztcbiAgY29uc3Qgc2hvd1ByZXZpZXcgPSBCb29sZWFuKHByZXZpZXdVcmwpO1xuICBjb25zdCBmaWxlSW5wdXRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IFt1cGxvYWRpbmcsIHNldFVwbG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1cGxvYWRFcnJvciwgc2V0VXBsb2FkRXJyb3JdID0gdXNlU3RhdGUoJycpO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZmllbGRDbGFzc05hbWUoZmllbGRLZXksIHZhbHVlKX0+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICB7cmVxdWlyZWQgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbF9fcmVxdWlyZWRcIj4qPC9zcGFuPiA6IG51bGx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc3dpdGNoXCI+XG4gICAgICAgICAgPHNwYW4+e3ZhbHVlID8gJ0VuYWJsZWQnIDogJ0Rpc2FibGVkJ308L3NwYW4+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgY2hlY2tlZD17dmFsdWV9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBldmVudC50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKGlzSW1hZ2VGaWVsZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICB7cmVxdWlyZWQgPyA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbF9fcmVxdWlyZWRcIj4qPC9zcGFuPiA6IG51bGx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19jYW52YXNcIj5cbiAgICAgICAgICAgIHtzaG93UHJldmlldyA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc3RhY2tcIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX190aHVtYlwiIHNyYz17cHJldmlld1VybH0gYWx0PXtsYWJlbH0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cub3BlbihwcmV2aWV3VXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4oaXXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX2FjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKHBhdGgsICcnKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAg4pyVXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19maWxlbmFtZVwiPntnZXRGaWxlbmFtZShpbnB1dFZhbHVlKX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lbXB0eVwiPlVwbG9hZCBhbiBpbWFnZSB0byBhdHRhY2ggbWVkaWEuPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWFfX3NvdXJjZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYV9fc291cmNlLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX191cGxvYWQtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgdXBsb2FkaW5nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3VwbG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCBmcm9tIGNvbXB1dGVyJ31cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17YXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEZpbGUgPSBldmVudC50YXJnZXQuZmlsZXM/LlswXTtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKCcnKTtcbiAgICAgICAgICAgICAgICAgIHNldFVwbG9hZGluZyh0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBsb2FkZWRVcmwgPSBhd2FpdCB1cGxvYWRBZG1pbkltYWdlKHNlbGVjdGVkRmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHBhdGgsIHVwbG9hZGVkVXJsKTtcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFVwbG9hZEVycm9yKGVycm9yPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBsb2FkIGltYWdlLicpO1xuICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dXBsb2FkRXJyb3IgPyA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhX19lcnJvclwiPnt1cGxvYWRFcnJvcn08L2Rpdj4gOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtmaWVsZENsYXNzTmFtZShmaWVsZEtleSwgdmFsdWUpfT5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPlxuICAgICAgICB7bGFiZWx9XG4gICAgICAgIHtyZXF1aXJlZCA/IDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWxhYmVsX19yZXF1aXJlZFwiPio8L3NwYW4+IDogbnVsbH1cbiAgICAgIDwvbGFiZWw+XG4gICAgICB7aXNQYXRoRmllbGQgPyAoXG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1pbnB1dFwiXG4gICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgID5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGRlc3RpbmF0aW9uPC9vcHRpb24+XG4gICAgICAgICAge2dldFBhdGhPcHRpb25zKGlucHV0VmFsdWUpLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnZhbHVlIHx8ICdlbXB0eSd9IHZhbHVlPXtvcHRpb24udmFsdWV9PlxuICAgICAgICAgICAgICB7b3B0aW9uLmxhYmVsfVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgKSA6IE1VTFRJTElORV9GSUVMRF9QQVRURVJOLnRlc3QoZmllbGRLZXkpID8gKFxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi10ZXh0YXJlYVwiXG4gICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uQ2hhbmdlKHBhdGgsIHBhcnNlSW5wdXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUsIHZhbHVlKSl9XG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1pbnB1dFwiXG4gICAgICAgICAgdHlwZT17dHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/ICdudW1iZXInIDogJ3RleHQnfVxuICAgICAgICAgIHZhbHVlPXtpbnB1dFZhbHVlfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkNoYW5nZShwYXRoLCBwYXJzZUlucHV0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlLCB2YWx1ZSkpfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gT2JqZWN0RmllbGQoeyBmaWVsZEtleSwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBvbkFkZEl0ZW0sIG9uUmVtb3ZlSXRlbSwgb25Nb3ZlSXRlbSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXModmFsdWUgPz8ge30pLmZpbHRlcigoW25lc3RlZEtleV0pID0+IG5lc3RlZEtleSAhPT0gJ2lkJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkIGFkbWluLWZpZWxkLS1mdWxsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW9iamVjdFwiPlxuICAgICAgICA8aDQgY2xhc3NOYW1lPVwiYWRtaW4tb2JqZWN0X190aXRsZVwiPnt0b0xhYmVsKGZpZWxkS2V5KX08L2g0PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkLWdyaWRcIj5cbiAgICAgICAgICB7ZW50cmllcy5tYXAoKFtuZXN0ZWRLZXksIG5lc3RlZFZhbHVlXSkgPT4gKFxuICAgICAgICAgICAgPEZpZWxkUmVuZGVyZXJcbiAgICAgICAgICAgICAga2V5PXtgJHtmaWVsZEtleX0tJHtuZXN0ZWRLZXl9YH1cbiAgICAgICAgICAgICAgZmllbGRLZXk9e25lc3RlZEtleX1cbiAgICAgICAgICAgICAgdmFsdWU9e25lc3RlZFZhbHVlfVxuICAgICAgICAgICAgICBwYXRoPXtbLi4ucGF0aCwgbmVzdGVkS2V5XX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICBvbkFkZEl0ZW09e29uQWRkSXRlbX1cbiAgICAgICAgICAgICAgb25SZW1vdmVJdGVtPXtvblJlbW92ZUl0ZW19XG4gICAgICAgICAgICAgIG9uTW92ZUl0ZW09e29uTW92ZUl0ZW19XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEFycmF5RmllbGQoeyBmaWVsZEtleSwgdmFsdWUsIHBhdGgsIG9uQ2hhbmdlLCBvbkFkZEl0ZW0sIG9uUmVtb3ZlSXRlbSwgb25Nb3ZlSXRlbSwgZGlzYWJsZWQgfSkge1xuICBjb25zdCBsYWJlbCA9IHRvTGFiZWwoZmllbGRLZXkpO1xuICBjb25zdCBzYW1wbGUgPSB2YWx1ZVswXSA/PyAnJztcbiAgY29uc3QgW2RyYWdJbmRleCwgc2V0RHJhZ0luZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZHJhZ092ZXJJbmRleCwgc2V0RHJhZ092ZXJJbmRleF0gPSB1c2VTdGF0ZShudWxsKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQgYWRtaW4tZmllbGQtLWZ1bGxcIj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1sYWJlbFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9faGVhZFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3RpdGxlXCI+e2xhYmVsfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19jb3VudFwiPnt2YWx1ZS5sZW5ndGh9IGVudHJ5e3ZhbHVlLmxlbmd0aCA9PT0gMSA/ICcnIDogJ2llcyd9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHt2YWx1ZS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgPGRldGFpbHNcbiAgICAgICAgICAgIGtleT17YCR7ZmllbGRLZXl9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLXJlcGVhdGFibGVfX2l0ZW0ke2RyYWdPdmVySW5kZXggPT09IGluZGV4ID8gJyBhZG1pbi1yZXBlYXRhYmxlX19pdGVtLS1kcmFnLW92ZXInIDogJyd9YH1cbiAgICAgICAgICAgIG9wZW49e2luZGV4ID09PSAwfVxuICAgICAgICAgICAgb25EcmFnT3Zlcj17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkaXNhYmxlZCB8fCBkcmFnSW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBpZiAoZHJhZ092ZXJJbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkaXNhYmxlZCB8fCBkcmFnSW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBpbmRleCAtIGRyYWdJbmRleDtcbiAgICAgICAgICAgICAgaWYgKG9mZnNldCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIG9uTW92ZUl0ZW0oWy4uLnBhdGgsIGRyYWdJbmRleF0sIG9mZnNldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0RHJhZ0luZGV4KG51bGwpO1xuICAgICAgICAgICAgICBzZXREcmFnT3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkcmFnT3ZlckluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHN1bW1hcnkgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fc3VtbWFyeVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX3N1bW1hcnktbGVmdFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2J1bGxldFwiPuKWvDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19uYW1lXCI+e2dldEl0ZW1UaXRsZShpdGVtLCBsYWJlbCwgaW5kZXgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2ljb24tYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBvblJlbW92ZUl0ZW0oWy4uLnBhdGgsIGluZGV4XSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRlbGV0ZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAg8J+XkVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXJlcGVhdGFibGVfX2RyYWctaGFuZGxlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlPXshZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIkRyYWcgdG8gcmVvcmRlclwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgU3RyaW5nKGluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIHNldERyYWdJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXREcmFnSW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERyYWdPdmVySW5kZXgobnVsbCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIOKLruKLrlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc3VtbWFyeT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmVwZWF0YWJsZV9fYm9keVwiPlxuICAgICAgICAgICAgICB7aXNQbGFpbk9iamVjdChpdGVtKSA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWZpZWxkLWdyaWRcIj5cbiAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhpdGVtKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChbbmVzdGVkS2V5XSkgPT4gbmVzdGVkS2V5ICE9PSAnaWQnKVxuICAgICAgICAgICAgICAgICAgICAubWFwKChbbmVzdGVkS2V5LCBuZXN0ZWRWYWx1ZV0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8RmllbGRSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtgJHtmaWVsZEtleX0tJHtpbmRleH0tJHtuZXN0ZWRLZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkS2V5PXtuZXN0ZWRLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmVzdGVkVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoPXtbLi4ucGF0aCwgaW5kZXgsIG5lc3RlZEtleV19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFkZEl0ZW09e29uQWRkSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlSXRlbT17b25SZW1vdmVJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3ZlSXRlbT17b25Nb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8UHJpbWl0aXZlRmllbGRcbiAgICAgICAgICAgICAgICAgIGZpZWxkS2V5PXtgJHtmaWVsZEtleX0tJHtpbmRleH1gfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW19XG4gICAgICAgICAgICAgICAgICBwYXRoPXtbLi4ucGF0aCwgaW5kZXhdfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICkpfVxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1yZXBlYXRhYmxlX19hZGRcIlxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkFkZEl0ZW0ocGF0aCwgZ2V0RW1wdHlJdGVtKHNhbXBsZSkpfVxuICAgICAgICA+XG4gICAgICAgICAgKyBBZGQgYW4gZW50cnlcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRmllbGRSZW5kZXJlcihwcm9wcykge1xuICBjb25zdCB7IHZhbHVlIH0gPSBwcm9wcztcblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gPEFycmF5RmllbGQgey4uLnByb3BzfSAvPjtcbiAgfVxuXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiA8T2JqZWN0RmllbGQgey4uLnByb3BzfSAvPjtcbiAgfVxuXG4gIHJldHVybiA8UHJpbWl0aXZlRmllbGQgey4uLnByb3BzfSAvPjtcbn1cblxuZnVuY3Rpb24gRm9ybVNlY3Rpb24oeyBlbnRyaWVzLCBvbkNoYW5nZSwgb25BZGRJdGVtLCBvblJlbW92ZUl0ZW0sIG9uTW92ZUl0ZW0sIGRpc2FibGVkIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNlY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZmllbGQtZ3JpZFwiPlxuICAgICAgICB7ZW50cmllcy5tYXAoKFtmaWVsZEtleSwgdmFsdWVdKSA9PiAoXG4gICAgICAgICAgPEZpZWxkUmVuZGVyZXJcbiAgICAgICAgICAgIGtleT17ZmllbGRLZXl9XG4gICAgICAgICAgICBmaWVsZEtleT17ZmllbGRLZXl9XG4gICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICBwYXRoPXtbZmllbGRLZXldfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgb25BZGRJdGVtPXtvbkFkZEl0ZW19XG4gICAgICAgICAgICBvblJlbW92ZUl0ZW09e29uUmVtb3ZlSXRlbX1cbiAgICAgICAgICAgIG9uTW92ZUl0ZW09e29uTW92ZUl0ZW19XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29udGVudFBhZ2VFZGl0b3IoKSB7XG4gIGNvbnN0IHsgcGFnZU5hbWUgfSA9IHVzZVBhcmFtcygpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3NhdmluZywgc2V0U2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BhZ2VMYWJlbCwgc2V0UGFnZUxhYmVsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2NvbnRlbnQsIHNldENvbnRlbnRdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbb3JpZ2luYWxDb250ZW50LCBzZXRPcmlnaW5hbENvbnRlbnRdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbcHVibGlzaGVkQ29udGVudCwgc2V0UHVibGlzaGVkQ29udGVudF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCdkcmFmdCcpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW21lbnVPcGVuLCBzZXRNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuICBjb25zdCBtZW51UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IGRpc3BsYXllZENvbnRlbnQgPSB1c2VNZW1vKFxuICAgICgpID0+IChhY3RpdmVUYWIgPT09ICdwdWJsaXNoZWQnICYmIHB1Ymxpc2hlZENvbnRlbnQgPyBwdWJsaXNoZWRDb250ZW50IDogY29udGVudCksXG4gICAgW2FjdGl2ZVRhYiwgY29udGVudCwgcHVibGlzaGVkQ29udGVudF0sXG4gICk7XG4gIGNvbnN0IGlzUHVibGlzaGVkVmlldyA9IGFjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgJiYgcHVibGlzaGVkQ29udGVudDtcbiAgY29uc3QgaXNEaXJ0eSA9IHVzZU1lbW8oXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUoY29udGVudCkpICE9PSBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShvcmlnaW5hbENvbnRlbnQpKSxcbiAgICBbY29udGVudCwgb3JpZ2luYWxDb250ZW50XSxcbiAgKTtcbiAgY29uc3QgaGFzRHJhZnRDb250ZW50ID0gdXNlTWVtbygoKSA9PiBoYXNNZWFuaW5nZnVsVmFsdWUoY29udGVudCksIFtjb250ZW50XSk7XG4gIGNvbnN0IGhhc1VucHVibGlzaGVkQ2hhbmdlcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkodG9Db21wYXJhYmxlVmFsdWUoY29udGVudCkpICE9PSBKU09OLnN0cmluZ2lmeSh0b0NvbXBhcmFibGVWYWx1ZShwdWJsaXNoZWRDb250ZW50KSksXG4gICAgW2NvbnRlbnQsIHB1Ymxpc2hlZENvbnRlbnRdLFxuICApO1xuICBjb25zdCBjYW5TYXZlID0gIWlzUHVibGlzaGVkVmlldyAmJiAhc2F2aW5nICYmIGlzRGlydHk7XG4gIGNvbnN0IGNhblB1Ymxpc2ggPSAhaXNQdWJsaXNoZWRWaWV3ICYmICFzYXZpbmcgJiYgKHB1Ymxpc2hlZENvbnRlbnQgPyBoYXNVbnB1Ymxpc2hlZENoYW5nZXMgOiBoYXNEcmFmdENvbnRlbnQpO1xuICBjb25zdCBjYW5EaXNjYXJkID0gIXNhdmluZyAmJiAhaXNQdWJsaXNoZWRWaWV3ICYmIGhhc0RyYWZ0Q29udGVudDtcbiAgY29uc3QgY2FuVW5wdWJsaXNoID0gIXNhdmluZyAmJiBCb29sZWFuKHB1Ymxpc2hlZENvbnRlbnQpO1xuICBjb25zdCBzZWN0aW9ucyA9IHVzZU1lbW8oKCkgPT4gYnVpbGRTZWN0aW9ucyhwYWdlTmFtZSwgZGlzcGxheWVkQ29udGVudCksIFtwYWdlTmFtZSwgZGlzcGxheWVkQ29udGVudF0pO1xuICBjb25zdCBlbnRyeVRpdGxlID0gdXNlTWVtbygoKSA9PiAoXG4gICAgZGlzcGxheWVkQ29udGVudD8uaGVyb1RpdGxlXG4gICAgfHwgZGlzcGxheWVkQ29udGVudD8udGl0bGVcbiAgICB8fCBkaXNwbGF5ZWRDb250ZW50Py5zaXRlTmFtZVxuICAgIHx8IHBhZ2VMYWJlbFxuICApLCBbZGlzcGxheWVkQ29udGVudCwgcGFnZUxhYmVsXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaXNNb3VudGVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGxvYWRQYWdlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yKCcnKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0UGFnZSh7IHBhZ2VOYW1lIH0pO1xuXG4gICAgICAgIGlmICghaXNNb3VudGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dERyYWZ0Q29udGVudCA9IGNsb25lVmFsdWUocmVzcG9uc2UuZGF0YS5kcmFmdERhdGEgPz8gcmVzcG9uc2UuZGF0YS5kYXRhID8/IHt9KTtcbiAgICAgICAgc2V0Q29udGVudChuZXh0RHJhZnRDb250ZW50KTtcbiAgICAgICAgc2V0T3JpZ2luYWxDb250ZW50KGNsb25lVmFsdWUobmV4dERyYWZ0Q29udGVudCkpO1xuICAgICAgICBzZXRQdWJsaXNoZWRDb250ZW50KHJlc3BvbnNlLmRhdGEucHVibGlzaGVkRGF0YSA/IGNsb25lVmFsdWUocmVzcG9uc2UuZGF0YS5wdWJsaXNoZWREYXRhKSA6IG51bGwpO1xuICAgICAgICBzZXRBY3RpdmVUYWIoJ2RyYWZ0Jyk7XG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgc2V0UGFnZUxhYmVsKHJlc3BvbnNlLmRhdGEubGFiZWwgPz8gdG9MYWJlbChwYWdlTmFtZSkpO1xuICAgICAgfSBjYXRjaCAobG9hZEVycm9yKSB7XG4gICAgICAgIGlmICghaXNNb3VudGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RXJyb3IodG9BZG1pbkVycm9yTWVzc2FnZShsb2FkRXJyb3IsICdGYWlsZWQgdG8gbG9hZCB0aGlzIGNvbnRlbnQgcGFnZS4nKSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoaXNNb3VudGVkKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZFBhZ2UoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc01vdW50ZWQgPSBmYWxzZTtcbiAgICB9O1xuICB9LCBbcGFnZU5hbWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbWVudU9wZW4pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChtZW51UmVmLmN1cnJlbnQgJiYgIW1lbnVSZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgfTtcbiAgfSwgW21lbnVPcGVuXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKHBhdGgsIG5leHRWYWx1ZSkgPT4ge1xuICAgIHNldENvbnRlbnQoKGN1cnJlbnRWYWx1ZSkgPT4gdXBkYXRlQXRQYXRoKGN1cnJlbnRWYWx1ZSwgcGF0aCwgbmV4dFZhbHVlKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkSXRlbSA9IChwYXRoLCBuZXh0SXRlbSkgPT4ge1xuICAgIHNldENvbnRlbnQoKGN1cnJlbnRWYWx1ZSkgPT4gYXBwZW5kQXRQYXRoKGN1cnJlbnRWYWx1ZSwgcGF0aCwgbmV4dEl0ZW0pKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZW1vdmVJdGVtID0gKHBhdGgpID0+IHtcbiAgICBzZXRDb250ZW50KChjdXJyZW50VmFsdWUpID0+IHJlbW92ZUF0UGF0aChjdXJyZW50VmFsdWUsIHBhdGgpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3ZlSXRlbSA9IChwYXRoLCBvZmZzZXQpID0+IHtcbiAgICBzZXRDb250ZW50KChjdXJyZW50VmFsdWUpID0+IG1vdmVBdFBhdGgoY3VycmVudFZhbHVlLCBwYXRoLCBvZmZzZXQpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlID0gYXN5bmMgKGludGVudCA9ICdzYXZlJykgPT4ge1xuICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgc2V0TWVudU9wZW4oZmFsc2UpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldFBhZ2Uoe1xuICAgICAgICBwYWdlTmFtZSxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIGRhdGE6IHsgY29udGVudCwgaW50ZW50IH0sXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgbmV4dERyYWZ0Q29udGVudCA9IGNsb25lVmFsdWUocmVzcG9uc2UuZGF0YS5kcmFmdERhdGEgPz8gcmVzcG9uc2UuZGF0YS5kYXRhID8/IHt9KTtcbiAgICAgIHNldENvbnRlbnQobmV4dERyYWZ0Q29udGVudCk7XG4gICAgICBzZXRPcmlnaW5hbENvbnRlbnQoY2xvbmVWYWx1ZShuZXh0RHJhZnRDb250ZW50KSk7XG4gICAgICBzZXRQdWJsaXNoZWRDb250ZW50KHJlc3BvbnNlLmRhdGEucHVibGlzaGVkRGF0YSA/IGNsb25lVmFsdWUocmVzcG9uc2UuZGF0YS5wdWJsaXNoZWREYXRhKSA6IG51bGwpO1xuICAgICAgaWYgKGludGVudCA9PT0gJ3VucHVibGlzaCcpIHtcbiAgICAgICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgICAgfVxuICAgICAgYWRkTm90aWNlKHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuZGF0YS5ub3RpY2U/Lm1lc3NhZ2UgPz8gYCR7cGFnZUxhYmVsfSBzYXZlZC5gLFxuICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChzYXZlRXJyb3IpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0b0FkbWluRXJyb3JNZXNzYWdlKHNhdmVFcnJvciwgJ0ZhaWxlZCB0byBzYXZlIHRoaXMgY29udGVudCBwYWdlLicpO1xuICAgICAgc2V0RXJyb3IobWVzc2FnZSk7XG4gICAgICBhZGROb3RpY2UoeyBtZXNzYWdlLCB0eXBlOiAnZXJyb3InIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRTYXZpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVEaXNjYXJkQ2hhbmdlcyA9ICgpID0+IHtcbiAgICBzZXRDb250ZW50KGdldEVtcHR5SXRlbShjb250ZW50KSk7XG4gICAgc2V0QWN0aXZlVGFiKCdkcmFmdCcpO1xuICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGU+e1NUWUxFU308L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1lZGl0b3JfX2lubmVyXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1iYWNrXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHdpbmRvdy5oaXN0b3J5LmJhY2soKX0+XG4gICAgICAgICAgICDihpAgQmFja1xuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWV0YVwiPlNpbmdsZSBUeXBlPC9kaXY+XG4gICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi10aXRsZVwiPntlbnRyeVRpdGxlfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXN0YXR1c1wiPntwdWJsaXNoZWRDb250ZW50ID8gJ1B1Ymxpc2hlZCcgOiAnRHJhZnQnfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi10YWJzXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YGFkbWluLXRhYiR7YWN0aXZlVGFiID09PSAnZHJhZnQnID8gJyBhZG1pbi10YWItLWFjdGl2ZScgOiAnJ31gfSB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdkcmFmdCcpfT5cbiAgICAgICAgICAgICAgRFJBRlRcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi10YWIke2FjdGl2ZVRhYiA9PT0gJ3B1Ymxpc2hlZCcgPyAnIGFkbWluLXRhYi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBwdWJsaXNoZWRDb250ZW50ICYmIHNldEFjdGl2ZVRhYigncHVibGlzaGVkJyl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFBVQkxJU0hFRFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7ZXJyb3IgPyA8TWVzc2FnZUJveCB2YXJpYW50PVwiZGFuZ2VyXCI+e2Vycm9yfTwvTWVzc2FnZUJveD4gOiBudWxsfVxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1sYXlvdXRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWFpbi1jYXJkXCI+XG4gICAgICAgICAgICAgIHtzZWN0aW9ucy5tYXAoKHNlY3Rpb24sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPEZvcm1TZWN0aW9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2BzZWN0aW9uLSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgIGVudHJpZXM9e3NlY3Rpb24uZW50cmllc31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICBvbkFkZEl0ZW09e2hhbmRsZUFkZEl0ZW19XG4gICAgICAgICAgICAgICAgICBvblJlbW92ZUl0ZW09e2hhbmRsZVJlbW92ZUl0ZW19XG4gICAgICAgICAgICAgICAgICBvbk1vdmVJdGVtPXtoYW5kbGVNb3ZlSXRlbX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1B1Ymxpc2hlZFZpZXd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGFzaWRlPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1jYXJkX19oZWFkXCI+RW50cnk8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGUtY2FyZF9fYm9keVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWJ1dHRvbi0tc2Vjb25kYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNhdmUoJ3B1Ymxpc2gnKX0gZGlzYWJsZWQ9eyFjYW5QdWJsaXNofT5cbiAgICAgICAgICAgICAgICAgICAgICBQdWJsaXNoXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1idXR0b24tLXNlY29uZGFyeSBhZG1pbi1zaWRlLWJ1dHRvbi0tbWVudVwiXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TWVudU9wZW4oKGN1cnJlbnQpID0+ICFjdXJyZW50KX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIOKAplxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge21lbnVPcGVuID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcmVmPXttZW51UmVmfSBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0gYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faXRlbS0tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNhdmUoJ3VucHVibGlzaCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhblVucHVibGlzaH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tc2lkZS1hY3Rpb24tbWVudV9faWNvblwiPsOXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBVbnB1Ymxpc2hcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pdGVtIGFkbWluLXNpZGUtYWN0aW9uLW1lbnVfX2l0ZW0tLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEaXNjYXJkQ2hhbmdlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5EaXNjYXJkfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlLWFjdGlvbi1tZW51X19pY29uXCI+w5c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIERpc2NhcmQgY2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFkbWluLXNpZGUtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNhdmUoJ3NhdmUnKX0gZGlzYWJsZWQ9eyFjYW5TYXZlfT5cbiAgICAgICAgICAgICAgICAgICAge3NhdmluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUnfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2FzaWRlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VMb2NhdGlvbiwgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgTG9hZGVyLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5hZG1pbi1tZWRpYS1wYWdlIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMjhweCA0MHB4IDQ4cHggODhweDtcbiAgYmFja2dyb3VuZDogI2Y2ZjZmOTtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19pbm5lciB7XG4gIG1heC13aWR0aDogMTg2MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3RvcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjhweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3RpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDNyZW07XG4gIGxpbmUtaGVpZ2h0OiAzLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2J1dHRvbixcbi5hZG1pbi1tZWRpYS1wYWdlX19idXR0b24tLXByaW1hcnksXG4uYWRtaW4tbWVkaWEtcGFnZV9faWNvbi1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIG1pbi1oZWlnaHQ6IDIuNXJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19idXR0b24ge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgcGFkZGluZzogMCAxcmVtO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uLS1wcmltYXJ5IHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzQ5NDVmZjtcbiAgYmFja2dyb3VuZDogIzQ5NDVmZjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIHBhZGRpbmc6IDAgMS4yNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjhweDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItbGVmdCxcbi5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLXJpZ2h0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fc3F1YXJlLFxuLmFkbWluLW1lZGlhLXBhZ2VfX2ljb24tYnV0dG9uIHtcbiAgd2lkdGg6IDIuNXJlbTtcbiAgaGVpZ2h0OiAyLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zZWxlY3QsXG4uYWRtaW4tbWVkaWEtcGFnZV9fc2VhcmNoIHtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2U0O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBwYWRkaW5nOiAwIDFyZW07XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX3NlYXJjaCB7XG4gIG1pbi13aWR0aDogMjgwcHg7XG59XG5cbi5hZG1pbi1tZWRpYS1wYWdlX19zZWxlY3Qge1xuICBtaW4td2lkdGg6IDI2OHB4O1xuICBhcHBlYXJhbmNlOiBub25lO1xufVxuXG4uYWRtaW4tbWVkaWEtcGFnZV9fc2VjdGlvbi10aXRsZSB7XG4gIG1hcmdpbjogMCAwIDE4cHg7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFkbWluLW1lZGlhLXBhZ2VfX2NvdW50IHtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG5cbi5hZG1pbi1tZWRpYS1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maWxsLCBtaW5tYXgoMzIwcHgsIDFmcikpO1xuICBnYXA6IDI0cHg7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgzMywgMzMsIDUyLCAwLjA2KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZDpob3ZlciB7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgzMywgMzMsIDUyLCAwLjA4KTtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX3ByZXZpZXcge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1pbi1oZWlnaHQ6IDI1NnB4O1xuICBwYWRkaW5nOiAxNnB4O1xuICBiYWNrZ3JvdW5kOlxuICAgIGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2Y2ZjZmOSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZjZmNmY5IDc1JSwgI2Y2ZjZmOSksXG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLCAxMnB4IDEycHg7XG4gIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4O1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fY2hlY2tib3gge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTZweDtcbiAgbGVmdDogMTZweDtcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2MwYzBjZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTIpO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9faW1hZ2Uge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAyMjRweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fYm9keSB7XG4gIHBhZGRpbmc6IDE0cHggMThweCAxNnB4O1xufVxuXG4uYWRtaW4tYXNzZXQtY2FyZF9fdGl0bGUtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG59XG5cbi5hZG1pbi1hc3NldC1jYXJkX190eXBlIHtcbiAgZmxleDogMCAwIGF1dG87XG4gIG1pbi1oZWlnaHQ6IDJyZW07XG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFkbWluLWFzc2V0LWNhcmRfX21ldGEge1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2JhY2sge1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzQ5NDVmZjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbGF5b3V0IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMCwgMWZyKSAzNjBweDtcbiAgZ2FwOiAyNHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19wcmV2aWV3LFxuLmFkbWluLW1lZGlhLWRldGFpbF9fY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZTQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMzMsIDMzLCA1MiwgMC4wNik7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX3ByZXZpZXcge1xuICBwYWRkaW5nOiAyNHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19jYW52YXMge1xuICBtaW4taGVpZ2h0OiA2MjBweDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOlxuICAgIGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2Y2ZjZmOSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZjZmNmY5IDc1JSwgI2Y2ZjZmOSksXG4gICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjZmNmY5IDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNmNmY2ZjkgNzUlLCAjZjZmNmY5KTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLCAxMnB4IDEycHg7XG4gIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4O1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19pbWFnZSB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogNTgwcHg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX3NpZGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDE2cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtaGVhZCB7XG4gIHBhZGRpbmc6IDE0cHggMTZweCA4cHg7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWJvZHkge1xuICBwYWRkaW5nOiAwIDE2cHggMTZweDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fZmllbGQgKyAuYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZCB7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2xhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICM2NjY2ODc7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX2lucHV0LFxuLmFkbWluLW1lZGlhLWRldGFpbF9fdGV4dGFyZWEge1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBwYWRkaW5nOiAwLjYyNXJlbSAwLjg3NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZjZmNmY5O1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX3RleHRhcmVhIHtcbiAgbWluLWhlaWdodDogNnJlbTtcbiAgcmVzaXplOiBub25lO1xufVxuXG4uYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWxpc3Qge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDEycHg7XG59XG5cbi5hZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXkge1xuICBjb2xvcjogIzY2NjY4NztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZSB7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxMDgwcHgpIHtcbiAgLmFkbWluLW1lZGlhLWRldGFpbF9fbGF5b3V0IHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTYwcHgpIHtcbiAgLmFkbWluLW1lZGlhLXBhZ2Uge1xuICAgIHBhZGRpbmc6IDIwcHggMTZweCA0MHB4IDcycHg7XG4gIH1cblxuICAuYWRtaW4tbWVkaWEtcGFnZV9fdG9wLFxuICAuYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgfVxuXG4gIC5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLWxlZnQsXG4gIC5hZG1pbi1tZWRpYS1wYWdlX190b29sYmFyLXJpZ2h0LFxuICAuYWRtaW4tbWVkaWEtcGFnZV9fYWN0aW9ucyB7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICB9XG5cbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3NlYXJjaCxcbiAgLmFkbWluLW1lZGlhLXBhZ2VfX3NlbGVjdCB7XG4gICAgbWluLXdpZHRoOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5gO1xuXG5mdW5jdGlvbiBidWlsZFBhZ2VQYXRoKHBhdGhuYW1lLCBwYXJhbXMpIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIE9iamVjdC5lbnRyaWVzKHBhcmFtcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICBzZWFyY2hQYXJhbXMuc2V0KGtleSwgU3RyaW5nKHZhbHVlKSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBxdWVyeVN0cmluZyA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxdWVyeVN0cmluZyA/IGA/JHtxdWVyeVN0cmluZ31gIDogJyd9YDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdE1lZGlhKHF1ZXJ5ID0ge30pIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hZG1pbi9hcGkvcGFnZXMvbWVkaWEtbGlicmFyeSR7c2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkgPyBgPyR7c2VhcmNoUGFyYW1zLnRvU3RyaW5nKCl9YCA6ICcnfWAsIHtcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSk7XG4gIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLm1lc3NhZ2UgPz8gJ0ZhaWxlZCB0byBsb2FkIG1lZGlhLicpO1xuICB9XG5cbiAgcmV0dXJuIHBheWxvYWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwbG9hZEFkbWluSW1hZ2UoZmlsZSkge1xuICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYWRtaW4vYXBpL21lZGlhL3VwbG9hZCcsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBmb3JtRGF0YSxcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSk7XG5cbiAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQuZXJyb3IgfHwgJ0ZhaWxlZCB0byB1cGxvYWQgaW1hZ2UuJyk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuZnVuY3Rpb24gQXNzZXRDYXJkKHsgaXRlbSwgb25PcGVuIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8YXJ0aWNsZSBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkXCIgb25DbGljaz17KCkgPT4gb25PcGVuKGl0ZW0uaWQpfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fcHJldmlld1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX2NoZWNrYm94XCIgLz5cbiAgICAgICAgPGltZyBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX19pbWFnZVwiIHNyYz17aXRlbS50aHVtYm5haWxVcmwgfHwgaXRlbS51cmx9IGFsdD17aXRlbS5hbHRlcm5hdGl2ZVRleHQgfHwgaXRlbS5uYW1lfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX2JvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1hc3NldC1jYXJkX190aXRsZS1yb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX3RpdGxlXCI+e2l0ZW0ubmFtZX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLWFzc2V0LWNhcmRfX3R5cGVcIj57aXRlbS5taW1lLnN0YXJ0c1dpdGgoJ2ltYWdlLycpID8gJ0lNQUdFJyA6IGl0ZW0uZXh0LnJlcGxhY2UoJy4nLCAnJykudG9VcHBlckNhc2UoKX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXNzZXQtY2FyZF9fbWV0YVwiPlxuICAgICAgICAgIHtpdGVtLmV4dC5yZXBsYWNlKCcuJywgJycpLnRvVXBwZXJDYXNlKCl9IC0ge2l0ZW0ud2lkdGh9w5d7aXRlbS5oZWlnaHR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9hcnRpY2xlPlxuICApO1xufVxuXG5mdW5jdGlvbiBEZXRhaWxWaWV3KHsgaXRlbSwgb25CYWNrIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2JhY2tcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25CYWNrfT5cbiAgICAgICAg4oaQIEJhY2tcbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3RvcFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMjQgfX0+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190aXRsZVwiIHN0eWxlPXt7IGZvbnRTaXplOiAnMi4yNXJlbScsIGxpbmVIZWlnaHQ6ICcyLjc1cmVtJyB9fT57aXRlbS5uYW1lfTwvaDE+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fYWN0aW9uc1wiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uLS1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHdpbmRvdy5vcGVuKGl0ZW0udXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKX0+XG4gICAgICAgICAgICBPcGVuIGFzc2V0XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19sYXlvdXRcIj5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19wcmV2aWV3XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhbnZhc1wiPlxuICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2ltYWdlXCIgc3JjPXtpdGVtLnVybH0gYWx0PXtpdGVtLmFsdGVybmF0aXZlVGV4dCB8fCBpdGVtLm5hbWV9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19zaWRlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19jYXJkLWhlYWRcIj5EZXRhaWxzPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2xhYmVsXCI+RmlsZSBuYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19pbnB1dFwiIHZhbHVlPXtpdGVtLm5hbWUgfHwgJyd9IGRpc2FibGVkIHJlYWRPbmx5IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19sYWJlbFwiPkFsdGVybmF0aXZlIHRleHQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2lucHV0XCIgdmFsdWU9e2l0ZW0uYWx0ZXJuYXRpdmVUZXh0IHx8ICcnfSBkaXNhYmxlZCByZWFkT25seSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2ZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbGFiZWxcIj5DYXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX190ZXh0YXJlYVwiIHZhbHVlPXtpdGVtLmNhcHRpb24gfHwgJyd9IGRpc2FibGVkIHJlYWRPbmx5IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FyZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX2NhcmQtaGVhZFwiPk1ldGFkYXRhPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWxpc3RcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+RGltZW5zaW9uczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLndpZHRofSDDlyB7aXRlbS5oZWlnaHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5TaXplPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0uc2l6ZUxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEta2V5XCI+VHlwZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLm1pbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5Qcm92aWRlcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS12YWx1ZVwiPntpdGVtLnByb3ZpZGVyIHx8ICdsb2NhbCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLWRldGFpbF9fbWV0YS1rZXlcIj5Gb2xkZXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5mb2xkZXJQYXRoIHx8ICcvJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPlVwZGF0ZWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS51cGRhdGVkQXRMYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPkNyZWF0ZWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtdmFsdWVcIj57aXRlbS5jcmVhdGVkQXRMYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1kZXRhaWxfX21ldGEtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLWtleVwiPkRvY3VtZW50IElEPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZGV0YWlsX19tZXRhLXZhbHVlXCI+e2l0ZW0uZG9jdW1lbnRJZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYXNpZGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWVkaWFMaWJyYXJ5KCkge1xuICBjb25zdCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgY29uc3QgcXVlcnkgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKSwgW2xvY2F0aW9uLnNlYXJjaF0pO1xuICBjb25zdCBzZWFyY2ggPSBxdWVyeS5nZXQoJ3NlYXJjaCcpIHx8ICcnO1xuICBjb25zdCBmaWxlSWQgPSBxdWVyeS5nZXQoJ2ZpbGVJZCcpIHx8ICcnO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbY291bnQsIHNldENvdW50XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbaXRlbSwgc2V0SXRlbV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3VwbG9hZGluZywgc2V0VXBsb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBhY3RpdmUgPSB0cnVlO1xuXG4gICAgY29uc3QgbG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvcignJyk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXF1ZXN0TWVkaWEoZmlsZUlkID8geyBmaWxlSWQgfSA6IHsgc2VhcmNoIH0pO1xuXG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0SXRlbXMocGF5bG9hZC5pdGVtcyA/PyBbXSk7XG4gICAgICAgIHNldENvdW50KHBheWxvYWQuY291bnQgPz8gMCk7XG4gICAgICAgIHNldEl0ZW0ocGF5bG9hZC5pdGVtID8/IG51bGwpO1xuICAgICAgfSBjYXRjaCAobG9hZEVycm9yKSB7XG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RXJyb3IobG9hZEVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWQoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuICB9LCBbZmlsZUlkLCBzZWFyY2hdKTtcblxuICBjb25zdCBvcGVuTGlzdCA9IChuZXh0U2VhcmNoID0gc2VhcmNoKSA9PiB7XG4gICAgbmF2aWdhdGUoYnVpbGRQYWdlUGF0aCgnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnknLCBuZXh0U2VhcmNoID8geyBzZWFyY2g6IG5leHRTZWFyY2ggfSA6IHt9KSk7XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGhlaWdodDogJzEwMCUnIH19PlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2lubmVyXCI+XG4gICAgICAgICAge2Vycm9yID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiPntlcnJvcn08L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICAgIHtmaWxlSWQgJiYgaXRlbSA/IChcbiAgICAgICAgICAgIDxEZXRhaWxWaWV3IGl0ZW09e2l0ZW19IG9uQmFjaz17KCkgPT4gb3Blbkxpc3QoKX0gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX190b3BcIj5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdGl0bGVcIj5NZWRpYSBMaWJyYXJ5PC9oMT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPisgQWRkIG5ldyBmb2xkZXI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fYnV0dG9uLS1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt1cGxvYWRpbmd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQudHlwZSA9ICdmaWxlJztcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hY2NlcHQgPSAnaW1hZ2UvKic7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXQubXVsdGlwbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0Lm9uY2hhbmdlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGlucHV0LmZpbGVzID8/IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB1cGxvYWRBZG1pbkltYWdlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmcmVzaGVkUGF5bG9hZCA9IGF3YWl0IHJlcXVlc3RNZWRpYShzZWFyY2ggPyB7IHNlYXJjaCB9IDoge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJdGVtcyhyZWZyZXNoZWRQYXlsb2FkLml0ZW1zID8/IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q291bnQocmVmcmVzaGVkUGF5bG9hZC5jb3VudCA/PyAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHVwbG9hZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEVycm9yKHVwbG9hZEVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXBsb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt1cGxvYWRpbmcgPyAnVXBsb2FkaW5nLi4uJyA6ICcrIEFkZCBuZXcgYXNzZXRzJ31cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX3Rvb2xiYXItbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19zcXVhcmVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19zZWxlY3RcIiBkZWZhdWx0VmFsdWU9XCJyZWNlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJlY2VudFwiPk1vc3QgcmVjZW50IHVwbG9hZHM8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+RmlsdGVyczwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fdG9vbGJhci1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19pY29uLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIj7impk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9faWNvbi1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+4piwPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtcGFnZV9fc2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb3Blbkxpc3QoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYXNzZXRzXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJhZG1pbi1tZWRpYS1wYWdlX19zZWN0aW9uLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgQXNzZXRzIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLW1lZGlhLXBhZ2VfX2NvdW50XCI+KHtjb3VudH0pPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gyPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tbWVkaWEtZ3JpZFwiPlxuICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoKG1lZGlhSXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEFzc2V0Q2FyZCBrZXk9e21lZGlhSXRlbS5pZH0gaXRlbT17bWVkaWFJdGVtfSBvbk9wZW49eyhuZXh0SWQpID0+IG5hdmlnYXRlKGJ1aWxkUGFnZVBhdGgoJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5JywgeyBmaWxlSWQ6IG5leHRJZCB9KSl9IC8+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuY29uc3QgQ09OVEVOVF9QQUdFX09SREVSID0gW1xuICAnc2l0ZS1zZXR0aW5ncycsXG4gICdob21lcGFnZScsXG4gICdhYm91dC1wYWdlJyxcbiAgJ2Jsb2ctcGFnZScsXG4gICdwcmljaW5nLXBhZ2UnLFxuICAnZmFxLXBhZ2UnLFxuICAnbWVldGluZy1yb29tcy1wYWdlJyxcbiAgJ3ZpcnR1YWwtb2ZmaWNlLXBhZ2UnLFxuICAnY29udGFjdC1wYWdlJyxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnLFxuICAndGVybXMtcGFnZScsXG5dO1xuXG5jb25zdCBDT05URU5UX1BBR0VfTEFCRUxTID0ge1xuICAnc2l0ZS1zZXR0aW5ncyc6ICdTaXRlIFNldHRpbmcnLFxuICAnaG9tZXBhZ2UnOiAnSG9tZXBhZ2UnLFxuICAnYWJvdXQtcGFnZSc6ICdBYm91dCBQYWdlJyxcbiAgJ2Jsb2ctcGFnZSc6ICdCbG9nIFBhZ2UnLFxuICAncHJpY2luZy1wYWdlJzogJ1ByaWNpbmcgUGFnZScsXG4gICdmYXEtcGFnZSc6ICdGQVEgUGFnZScsXG4gICdtZWV0aW5nLXJvb21zLXBhZ2UnOiAnTWVldGluZyBSb29tcyBQYWdlJyxcbiAgJ3ZpcnR1YWwtb2ZmaWNlLXBhZ2UnOiAnVmlydHVhbCBPZmZpY2UgUGFnZScsXG4gICdjb250YWN0LXBhZ2UnOiAnQ29udGFjdCBQYWdlJyxcbiAgJ3ByaXZhY3ktcG9saWN5LXBhZ2UnOiAnUHJpdmFjeSBQb2xpY3kgUGFnZScsXG4gICd0ZXJtcy1wYWdlJzogJ1Rlcm1zIFBhZ2UnLFxufTtcblxuY29uc3QgUkVTT1VSQ0VfTEFCRUxTID0ge1xuICAnYmxvZy1wb3N0cyc6ICdCbG9nIFBvc3QnLFxuICAnZmFxLWl0ZW1zJzogJ0ZBUSBJdGVtJyxcbiAgJ21lZXRpbmctcm9vbXMnOiAnTWVldGluZyBSb29tJyxcbiAgJ3ByaWNpbmctcGxhbnMnOiAnUHJpY2luZyBQbGFuJyxcbn07XG5cbmNvbnN0IFNJREVCQVJfV0lEVEggPSAzMDQ7XG5jb25zdCBSQUlMX1dJRFRIID0gNDg7XG5cbmNvbnN0IFNUWUxFUyA9IGBcbi5hZG1pbi1zaWRlYmFyLXNoZWxsIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBpbnNldDogMCBhdXRvIDAgMDtcbiAgd2lkdGg6ICR7U0lERUJBUl9XSURUSH1weDtcbiAgZGlzcGxheTogZmxleDtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2VhZWJmMDtcbiAgei1pbmRleDogNTA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZTtcbn1cblxuLmFkbWluLXNpZGViYXItc2hlbGwtLXJhaWwtb25seSB7XG4gIHdpZHRoOiAke1JBSUxfV0lEVEh9cHg7XG59XG5cbi5hZG1pbi1zaWRlYmFyLXNoZWxsLS1oaWRkZW4ge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7U0lERUJBUl9XSURUSH1weCk7XG59XG5cbi5hZG1pbi1zaWRlYmFyLXJhaWwge1xuICB3aWR0aDogNDhweDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2VhZWJmMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMTJweCAwO1xuICBnYXA6IDEwcHg7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG59XG5cbi5hZG1pbi1zaWRlYmFyLWxvZ28ge1xuICB3aWR0aDogMjhweDtcbiAgaGVpZ2h0OiAyOHB4O1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICBtYXJnaW4tYm90dG9tOiAycHg7XG59XG5cbi5hZG1pbi1yYWlsLWJ1dHRvbiB7XG4gIHdpZHRoOiAzMnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM2NjY2ODc7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkbWluLXJhaWwtYnV0dG9uLS1hY3RpdmUge1xuICBiYWNrZ3JvdW5kOiAjZjBlYmZmO1xuICBjb2xvcjogIzdiNzlmZjtcbn1cblxuLmFkbWluLXJhaWwtYnV0dG9uIHN2ZyB7XG4gIHdpZHRoOiAxNnB4O1xuICBoZWlnaHQ6IDE2cHg7XG4gIHN0cm9rZTogY3VycmVudENvbG9yO1xuICBmaWxsOiBub25lO1xuICBzdHJva2Utd2lkdGg6IDEuODtcbiAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kO1xuICBzdHJva2UtbGluZWpvaW46IHJvdW5kO1xufVxuXG4uYWRtaW4tcmFpbC1zcGFjZXIge1xuICBmbGV4OiAxO1xufVxuXG4uYWRtaW4tYXZhdGFyIHtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGJhY2tncm91bmQ6ICM0OTQ1ZmY7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5hZG1pbi1zaWRlYmFyLXBhbmVsIHtcbiAgd2lkdGg6IDI1NnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG59XG5cbi5hZG1pbi1zaWRlYmFyLWhlYWRlciB7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYWViZjA7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMjMyNGQ7XG59XG5cbi5hZG1pbi1zaWRlYmFyLWJvZHkge1xuICBwYWRkaW5nOiAxNHB4IDhweCAxOHB4O1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4uYWRtaW4tc2VhcmNoIHtcbiAgcGFkZGluZzogMCA4cHggMTJweDtcbn1cblxuLmFkbWluLXNlYXJjaCBpbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAyLjI1cmVtO1xuICBwYWRkaW5nOiAwLjVyZW0gMC43NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNlNDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBjb2xvcjogIzMyMzI0ZDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xufVxuXG4uYWRtaW4tc2VhcmNoIGlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLWNvbG9yOiAjNDk0NWZmO1xufVxuXG4uYWRtaW4tZ3JvdXAge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4uYWRtaW4tZ3JvdXBfX2hlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDAgMTBweCA4cHg7XG59XG5cbi5hZG1pbi1ncm91cF9fbGFiZWwge1xuICBmb250LXNpemU6IDAuNjg3NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGNvbG9yOiAjOGU4ZWE5O1xufVxuXG4uYWRtaW4tZ3JvdXBfX2NvdW50IHtcbiAgbWluLXdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIHBhZGRpbmc6IDAgNnB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG4gIGNvbG9yOiAjNjY2Njg3O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMC42ODc1cmVtO1xuICBsaW5lLWhlaWdodDogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFkbWluLW5hdi1saW5rIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogN3B4IDEwcHg7XG4gIG1hcmdpbjogMXB4IDA7XG4gIGNvbG9yOiAjMzIzMjRkO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5hZG1pbi1uYXYtbGluazpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNmY2Zjk7XG59XG5cbi5hZG1pbi1uYXYtbGluay0tc2VsZWN0ZWQge1xuICBiYWNrZ3JvdW5kOiAjZjBlYmZmO1xuICBjb2xvcjogIzQ5NDVmZjtcbn1cblxuLmFkbWluLW5hdi1saW5rX190ZXh0IHtcbiAgbWluLXdpZHRoOiAwO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBsaW5lLWhlaWdodDogMS4zNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uYWRtaW4tbmF2LWxpbmtfX2ljb24ge1xuICB3aWR0aDogMTJweDtcbiAgY29sb3I6ICM4ZThlYTk7XG4gIGZvbnQtc2l6ZTogMTBweDtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk2MHB4KSB7XG4gIC5hZG1pbi1zaWRlYmFyLXNoZWxsIHtcbiAgICBib3gtc2hhZG93OiAwIDE4cHggNDhweCByZ2JhKDMzLCAzMywgNTIsIDAuMTIpO1xuICB9XG5cbiAgLmFkbWluLXNpZGViYXItc2hlbGwtLWhpZGRlbiB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke1NJREVCQVJfV0lEVEh9cHgpO1xuICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA5NjFweCkge1xuICAuYWRtaW4tc2lkZWJhci1zaGVsbCxcbiAgLmFkbWluLXNpZGViYXItc2hlbGwtLWhpZGRlbiB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICB9XG59XG5gO1xuXG5mdW5jdGlvbiBpdGVtTWF0Y2hlc1NlYXJjaChsYWJlbCwgc2VhcmNoKSB7XG4gIGlmICghc2VhcmNoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gbGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gudG9Mb3dlckNhc2UoKSk7XG59XG5cbmZ1bmN0aW9uIFJhaWxJY29uKHsgY2hpbGRyZW4gfSkge1xuICByZXR1cm4gKFxuICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvc3ZnPlxuICApO1xufVxuXG5mdW5jdGlvbiBIb21lSWNvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8UmFpbEljb24+XG4gICAgICA8cGF0aCBkPVwiTTQuNSAxMC41IDEyIDRsNy41IDYuNVwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTYuNSA5LjVWMTloMTFWOS41XCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNMTAgMTl2LTVoNHY1XCIgLz5cbiAgICA8L1JhaWxJY29uPlxuICApO1xufVxuXG5mdW5jdGlvbiBQZW5jaWxJY29uKCkge1xuICByZXR1cm4gKFxuICAgIDxSYWlsSWNvbj5cbiAgICAgIDxwYXRoIGQ9XCJtMy41IDIwLjUgNC4yNS0xIDkuNzUtOS43NS0zLjI1LTMuMjVMNC41IDE2LjI1bC0xIDQuMjVaXCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJtMTMuNSA2LjUgMy4yNSAzLjI1XCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNNy41IDE5LjVoMTNcIiAvPlxuICAgIDwvUmFpbEljb24+XG4gICk7XG59XG5cbmZ1bmN0aW9uIE1lZGlhSWNvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8UmFpbEljb24+XG4gICAgICA8cmVjdCB4PVwiMy41XCIgeT1cIjUuNVwiIHdpZHRoPVwiMTdcIiBoZWlnaHQ9XCIxM1wiIHJ4PVwiMlwiIC8+XG4gICAgICA8Y2lyY2xlIGN4PVwiOC41XCIgY3k9XCIxMFwiIHI9XCIxLjVcIiAvPlxuICAgICAgPHBhdGggZD1cIm01LjUgMTYgNC00IDMgMyAyLTIgNCAzXCIgLz5cbiAgICA8L1JhaWxJY29uPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaWRlYmFyKHsgaXNWaXNpYmxlIH0pIHtcbiAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IHBhZ2VzID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5wYWdlcyk7XG4gIGNvbnN0IHNlc3Npb24gPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLnNlc3Npb24pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoJycpO1xuXG4gIGNvbnN0IHBhZ2VJdGVtcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gQ09OVEVOVF9QQUdFX09SREVSXG4gICAgICAubWFwKChwYWdlTmFtZSkgPT4gcGFnZXMuZmluZCgocGFnZSkgPT4gcGFnZS5uYW1lID09PSBwYWdlTmFtZSkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAubWFwKChwYWdlKSA9PiAoe1xuICAgICAgICBpZDogcGFnZS5uYW1lLFxuICAgICAgICBsYWJlbDogQ09OVEVOVF9QQUdFX0xBQkVMU1twYWdlLm5hbWVdID8/IHBhZ2UubmFtZSxcbiAgICAgICAgaHJlZjogYC9hZG1pbi9wYWdlcy8ke3BhZ2UubmFtZX1gLFxuICAgICAgICBzZWxlY3RlZDogbG9jYXRpb24ucGF0aG5hbWUuc3RhcnRzV2l0aChgL2FkbWluL3BhZ2VzLyR7cGFnZS5uYW1lfWApLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChwYWdlKSA9PiBpdGVtTWF0Y2hlc1NlYXJjaChwYWdlLmxhYmVsLCBzZWFyY2gpKSxcbiAgICBbbG9jYXRpb24ucGF0aG5hbWUsIHBhZ2VzLCBzZWFyY2hdLFxuICApO1xuXG4gIGNvbnN0IGNvbGxlY3Rpb25JdGVtcyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKFtcbiAgICAgIHsgaWQ6ICdibG9nLXBvc3RzJywgaHJlZjogJy9hZG1pbi9wYWdlcy9ibG9nLXBvc3RzJyB9LFxuICAgICAgeyBpZDogJ2ZhcS1pdGVtcycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvZmFxLWl0ZW1zJyB9LFxuICAgICAgeyBpZDogJ21lZXRpbmctcm9vbXMnLCBocmVmOiAnL2FkbWluL3BhZ2VzL21lZXRpbmctcm9vbXMnIH0sXG4gICAgICB7IGlkOiAncHJpY2luZy1wbGFucycsIGhyZWY6ICcvYWRtaW4vcGFnZXMvcHJpY2luZy1wbGFucycgfSxcbiAgICBdKVxuICAgICAgLm1hcCgocmVzb3VyY2UpID0+ICh7XG4gICAgICAgIGlkOiByZXNvdXJjZS5pZCxcbiAgICAgICAgbGFiZWw6IFJFU09VUkNFX0xBQkVMU1tyZXNvdXJjZS5pZF0gPz8gcmVzb3VyY2UuaWQsXG4gICAgICAgIGhyZWY6IHJlc291cmNlLmhyZWYsXG4gICAgICAgIHNlbGVjdGVkOiBsb2NhdGlvbi5wYXRobmFtZS5zdGFydHNXaXRoKHJlc291cmNlLmhyZWYpLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChyZXNvdXJjZSkgPT4gaXRlbU1hdGNoZXNTZWFyY2gocmVzb3VyY2UubGFiZWwsIHNlYXJjaCkpLFxuICAgIFtsb2NhdGlvbi5wYXRobmFtZSwgc2VhcmNoXSxcbiAgKTtcblxuICBjb25zdCBpbml0aWFsID0gKHNlc3Npb24/LmVtYWlsPy5bMF0gPz8gJ0MnKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBpc0Rhc2hib2FyZCA9IGxvY2F0aW9uLnBhdGhuYW1lID09PSAnL2FkbWluJyB8fCBsb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9hZG1pbi8nO1xuICBjb25zdCBpc01lZGlhID0gbG9jYXRpb24ucGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FkbWluL3BhZ2VzL21lZGlhLWxpYnJhcnknKTtcbiAgY29uc3Qgc2hvd1BhbmVsID0gIWlzTWVkaWE7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntTVFlMRVN9PC9zdHlsZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWRtaW4tc2lkZWJhci1zaGVsbCR7c2hvd1BhbmVsID8gJycgOiAnIGFkbWluLXNpZGViYXItc2hlbGwtLXJhaWwtb25seSd9JHtpc1Zpc2libGUgPyAnJyA6ICcgYWRtaW4tc2lkZWJhci1zaGVsbC0taGlkZGVuJ31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLXJhaWxcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhZG1pbi1zaWRlYmFyLWxvZ29cIlxuICAgICAgICAgICAgc3JjPVwiL2FkbWluLWFzc2V0cy9jbGllbnQtbWFyay5zdmdcIlxuICAgICAgICAgICAgYWx0PVwiVGhlIExlYWRlbmhhbGwgV29ya3NcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcmFpbC1idXR0b24ke2lzRGFzaGJvYXJkID8gJyBhZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKCcvYWRtaW4nKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8SG9tZUljb24gLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1yYWlsLWJ1dHRvbiR7IWlzRGFzaGJvYXJkICYmICFpc01lZGlhID8gJyBhZG1pbi1yYWlsLWJ1dHRvbi0tYWN0aXZlJyA6ICcnfWB9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKCcvYWRtaW4vcGFnZXMvc2l0ZS1zZXR0aW5ncycpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQZW5jaWxJY29uIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWRtaW4tcmFpbC1idXR0b24ke2lzTWVkaWEgPyAnIGFkbWluLXJhaWwtYnV0dG9uLS1hY3RpdmUnIDogJyd9YH1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoJy9hZG1pbi9wYWdlcy9tZWRpYS1saWJyYXJ5Jyl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE1lZGlhSWNvbiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tcmFpbC1zcGFjZXJcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tYXZhdGFyXCI+e2luaXRpYWx9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHtzaG93UGFuZWwgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZWJhci1wYW5lbFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tc2lkZWJhci1oZWFkZXJcIj5Db250ZW50IE1hbmFnZXI8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkbWluLXNpZGViYXItYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9faGVhZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19sYWJlbFwiPkNvbGxlY3Rpb24gVHlwZXM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBfX2NvdW50XCI+e2NvbGxlY3Rpb25JdGVtcy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge2NvbGxlY3Rpb25JdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhZG1pbi1uYXYtbGluayR7aXRlbS5zZWxlY3RlZCA/ICcgYWRtaW4tbmF2LWxpbmstLXNlbGVjdGVkJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKGl0ZW0uaHJlZil9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWRtaW4tbmF2LWxpbmtfX3RleHRcIj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRtaW4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9faGVhZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFkbWluLWdyb3VwX19sYWJlbFwiPlNpbmdsZSBUeXBlczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1ncm91cF9fY291bnRcIj57cGFnZUl0ZW1zLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7cGFnZUl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFkbWluLW5hdi1saW5rJHtpdGVtLnNlbGVjdGVkID8gJyBhZG1pbi1uYXYtbGluay0tc2VsZWN0ZWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoaXRlbS5ocmVmKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhZG1pbi1uYXYtbGlua19fdGV4dFwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBCb3gsXG4gIEJ1dHRvbixcbiAgRm9ybUdyb3VwLFxuICBIMixcbiAgSW5wdXQsXG4gIExhYmVsLFxuICBNZXNzYWdlQm94LFxuICBUZXh0LFxufSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTG9naW4oKSB7XG4gIGNvbnN0IHByb3BzID0gd2luZG93Ll9fQVBQX1NUQVRFX18gPz8ge307XG4gIGNvbnN0IGJyYW5kaW5nID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5icmFuZGluZyk7XG4gIGNvbnN0IG1lc3NhZ2UgPSBwcm9wcy5lcnJvck1lc3NhZ2U7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94XG4gICAgICB2YXJpYW50PVwiZ3JleVwiXG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxuICAgICAgcD1cInhsXCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmNGVmZTggMCUsICNlOGRjY2YgNDUlLCAjZDljNGFiIDEwMCUpJyxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPEJveFxuICAgICAgICBiZz1cIndoaXRlXCJcbiAgICAgICAgd2lkdGg9e1snMTAwJScsICcxMDAlJywgJzk2MHB4J119XG4gICAgICAgIG1pbkhlaWdodD1cIjU2MHB4XCJcbiAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICBib3hTaGFkb3c9XCJjYXJkXCJcbiAgICAgICAgYm9yZGVyUmFkaXVzPVwieGxcIlxuICAgICAgICBvdmVyZmxvdz1cImhpZGRlblwiXG4gICAgICA+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICB3aWR0aD17WycwJywgJzAnLCAnNDQlJ119XG4gICAgICAgICAgZGlzcGxheT17Wydub25lJywgJ25vbmUnLCAnZmxleCddfVxuICAgICAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxuICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiXG4gICAgICAgICAgcD1cInh4bFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGYwZjBmIDAlLCAjMWYxZjFmIDEwMCUpJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2Y1ZjFlYScsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxCb3g+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi9hZG1pbi1hc3NldHMvbG9nby5zdmdcIlxuICAgICAgICAgICAgICBhbHQ9e2JyYW5kaW5nLmNvbXBhbnlOYW1lfVxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogNzIsIGhlaWdodDogNzIsIG9iamVjdEZpdDogJ2NvbnRhaW4nLCBtYXJnaW5Cb3R0b206IDI0IH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEgyIGNvbG9yPVwid2hpdGVcIiBtYXJnaW5Cb3R0b209XCJsZ1wiPkNsaWVudCBDb250ZW50IFBvcnRhbDwvSDI+XG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk0MFwiPlxuICAgICAgICAgICAgICBNYW5hZ2UgdGhlIHNhbWUgY2xpZW50LWZhY2luZyBjb250ZW50IHN1cmZhY2UgdXNlZCBieSB0aGUgbGl2ZSBzaXRlLlxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTUwXCI+VGhlIExlYWRlbmhhbGwgV29ya3M8L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBhcz1cImZvcm1cIlxuICAgICAgICAgIGFjdGlvbj17cHJvcHMuYWN0aW9ufVxuICAgICAgICAgIG1ldGhvZD1cIlBPU1RcIlxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIHA9XCJ4eGxcIlxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCJcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IG1iPVwieHhsXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi9hZG1pbi1hc3NldHMvbG9nby5zdmdcIlxuICAgICAgICAgICAgICBhbHQ9e2JyYW5kaW5nLmNvbXBhbnlOYW1lfVxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogNjQsIGhlaWdodDogNjQsIG9iamVjdEZpdDogJ2NvbnRhaW4nLCBtYXJnaW5Cb3R0b206IDIwIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEgyIG1hcmdpbj1cIjBcIj5TaWduIGluPC9IMj5cbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCI+Q2xpZW50IGVkaXRvciBhY2Nlc3MgZm9yIFRoZSBMZWFkZW5oYWxsIFdvcmtzLjwvVGV4dD5cbiAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgIHttZXNzYWdlID8gPE1lc3NhZ2VCb3ggdmFyaWFudD1cImRhbmdlclwiIG1iPVwibGdcIj57bWVzc2FnZX08L01lc3NhZ2VCb3g+IDogbnVsbH1cblxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+RW1haWw8L0xhYmVsPlxuICAgICAgICAgICAgPElucHV0IG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiY2xpZW50QGxlYWRlbmhhbGx3b3Jrcy5jb21cIiAvPlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuXG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5QYXNzd29yZDwvTGFiZWw+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBwYXNzd29yZFwiXG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImN1cnJlbnQtcGFzc3dvcmRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgIDxCb3ggbXQ9XCJ4bFwiPlxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIHNpemU9XCJsZ1wiPkxvZyBpbjwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9wQmFyKCkge1xuICByZXR1cm4gbnVsbDtcbn1cbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9EYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZFxuaW1wb3J0IENvbGxlY3Rpb25NYW5hZ2VyIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25NYW5hZ2VyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db2xsZWN0aW9uTWFuYWdlciA9IENvbGxlY3Rpb25NYW5hZ2VyXG5pbXBvcnQgQ29udGVudFBhZ2VFZGl0b3IgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudFBhZ2VFZGl0b3InXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbnRlbnRQYWdlRWRpdG9yID0gQ29udGVudFBhZ2VFZGl0b3JcbmltcG9ydCBNZWRpYUxpYnJhcnkgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvTWVkaWFMaWJyYXJ5J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5NZWRpYUxpYnJhcnkgPSBNZWRpYUxpYnJhcnlcbmltcG9ydCBTaWRlYmFyIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL1NpZGViYXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlNpZGViYXIgPSBTaWRlYmFyXG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvTG9naW4nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkxvZ2luID0gTG9naW5cbmltcG9ydCBUb3BCYXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvVG9wQmFyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Ub3BCYXIgPSBUb3BCYXIiXSwibmFtZXMiOlsiUFJJTUFSWV9QQUdFUyIsImxhYmVsIiwiaHJlZiIsIkNPTExFQ1RJT05TIiwiU1RZTEVTIiwiU2hvcnRjdXRMaXN0IiwidGl0bGUiLCJpdGVtcyIsIm5hdmlnYXRlIiwibWV0YSIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsIm1hcCIsIml0ZW0iLCJrZXkiLCJ0eXBlIiwib25DbGljayIsIkRhc2hib2FyZCIsInVzZU5hdmlnYXRlIiwiRnJhZ21lbnQiLCJNVUxUSUxJTkVfRklFTERfUEFUVEVSTiIsIklNQUdFX0ZJRUxEX1BBVFRFUk4iLCJCT09MRUFOX0ZJRUxEX1BBVFRFUk4iLCJGVUxMX1dJRFRIX0ZJRUxEX1BBVFRFUk4iLCJ0b0xhYmVsIiwibmFtZSIsInJlcGxhY2UiLCJ2IiwidG9VcHBlckNhc2UiLCJjbG9uZVZhbHVlIiwidmFsdWUiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJnZXRFbXB0eUl0ZW0iLCJzYW1wbGUiLCJBcnJheSIsImlzQXJyYXkiLCJPYmplY3QiLCJmcm9tRW50cmllcyIsImtleXMiLCJpbmNsdWRlcyIsInRvQ29tcGFyYWJsZVZhbHVlIiwic29ydCIsImZpbHRlciIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiaGFzTWVhbmluZ2Z1bFZhbHVlIiwic29tZSIsImVudHJpZXMiLCJuZXN0ZWRWYWx1ZSIsInRyaW0iLCJsZW5ndGgiLCJidWlsZEFkbWluUGF0aCIsInBhdGhuYW1lIiwicGFyYW1zIiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiZm9yRWFjaCIsInVuZGVmaW5lZCIsInNldCIsIlN0cmluZyIsInF1ZXJ5U3RyaW5nIiwidG9TdHJpbmciLCJwYXJzZURpc3BsYXllZEZpZWxkcyIsInNwbGl0IiwiZmllbGQiLCJCb29sZWFuIiwicGFyc2VJbnB1dFZhbHVlIiwibmV4dFJhd1ZhbHVlIiwiY3VycmVudFZhbHVlIiwicGFyc2VkIiwiTnVtYmVyIiwiaXNOYU4iLCJnZXRSZXBlYXRhYmxlSXRlbVZhbHVlIiwidGV4dCIsImdldE1lZGlhRGlzcGxheU5hbWUiLCJmYWxsYmFjayIsInJhdyIsIm5vcm1hbGl6ZWQiLCJwYXJ0cyIsIndpdGhSZXBlYXRhYmxlSXRlbVZhbHVlIiwibmV4dFZhbHVlIiwicmVzb2x2ZU1lZGlhUHJldmlld1VybCIsInRlc3QiLCJzdGFydHNXaXRoIiwidXBkYXRlQXRQYXRoIiwicGF0aCIsInNlZ21lbnQiLCJyZXN0IiwiY2xvbmUiLCJyZW1vdmVBdFBhdGgiLCJfIiwiaW5kZXgiLCJhcHBlbmRBdFBhdGgiLCJuZXh0SXRlbSIsIm1vdmVBdFBhdGgiLCJvZmZzZXQiLCJuZXh0SW5kZXgiLCJtb3ZlZCIsInNwbGljZSIsImdldERpc3BsYXlUaXRsZSIsImRlZmluaXRpb24iLCJyZWNvcmQiLCJ0aXRsZUZpZWxkIiwiaXNCbG9nRGlzYWJsZWRGaWVsZCIsImlzRmFxRGlzYWJsZWRGaWVsZCIsImlzTWVldGluZ1Jvb21EaXNhYmxlZEZpZWxkIiwiaXNWaXNpYmlsaXR5VG9nZ2xlRmllbGQiLCJnZXRGaWVsZERpc3BsYXlMYWJlbCIsInJlcXVlc3RQYWdlIiwicGFnZU5hbWUiLCJvcHRpb25zIiwicXVlcnkiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsImJvZHkiLCJjcmVkZW50aWFscyIsInJlc3BvbnNlVGV4dCIsInBheWxvYWQiLCJvayIsInRyaW1tZWRUZXh0IiwidG9Mb3dlckNhc2UiLCJpc0h0bWwiLCJyZWRpcmVjdGVkVG9Mb2dpbiIsInJlZGlyZWN0ZWQiLCJ1cmwiLCJpc0F1dGhFcnJvciIsInN0YXR1cyIsIkVycm9yIiwibWVzc2FnZSIsImVycm9yIiwidXBsb2FkQWRtaW5JbWFnZSIsImZpbGUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwianNvbiIsImNhdGNoIiwidXBsb2FkZWRVcmwiLCJyZWxhdGl2ZVVybCIsIk1lZGlhRmllbGQiLCJvbkNoYW5nZSIsImRpc2FibGVkIiwidXJscyIsImZpbGVJbnB1dFJlZiIsInVzZVJlZiIsInVwbG9hZGluZyIsInNldFVwbG9hZGluZyIsInVzZVN0YXRlIiwidXBsb2FkRXJyb3IiLCJzZXRVcGxvYWRFcnJvciIsInNyYyIsImFsdCIsIndpbmRvdyIsIm9wZW4iLCJjdXJyZW50IiwiY2xpY2siLCJyZWYiLCJhY2NlcHQiLCJtdWx0aXBsZSIsInN0eWxlIiwiZGlzcGxheSIsImV2ZW50IiwiZmlsZXMiLCJmcm9tIiwidGFyZ2V0IiwidXBsb2FkZWRVcmxzIiwicHVzaCIsIlByaW1pdGl2ZUZpZWxkIiwiaXNEaXNhYmxlZEZpZWxkIiwiY2hlY2tlZCIsIkFycmF5RmllbGQiLCJvbkFkZEl0ZW0iLCJvblJlbW92ZUl0ZW0iLCJvbk1vdmVJdGVtIiwiaXNJbWFnZUFycmF5IiwiZHJhZ0luZGV4Iiwic2V0RHJhZ0luZGV4IiwiZHJhZ092ZXJJbmRleCIsInNldERyYWdPdmVySW5kZXgiLCJ1cGxvYWRpbmdJbmRleCIsInNldFVwbG9hZGluZ0luZGV4IiwiZmlsZUlucHV0UmVmcyIsIm9uRHJhZ092ZXIiLCJwcmV2ZW50RGVmYXVsdCIsIm9uRHJvcCIsIm9uRHJhZ0xlYXZlIiwic3RvcFByb3BhZ2F0aW9uIiwiZHJhZ2dhYmxlIiwib25EcmFnU3RhcnQiLCJkYXRhVHJhbnNmZXIiLCJlZmZlY3RBbGxvd2VkIiwic2V0RGF0YSIsIm9uRHJhZ0VuZCIsInNsaWNlIiwibWFyZ2luVG9wIiwiZWxlbWVudCIsInBhZGRpbmciLCJGaWVsZFJlbmRlcmVyIiwicmVuZGVyTGlzdENlbGwiLCJMaXN0VmlldyIsInJlY29yZHMiLCJjb250cm9scyIsInNlYXJjaCIsImxvYWRpbmciLCJvblNlYXJjaCIsIm9uT3BlblJlY29yZCIsIm9uQ3JlYXRlIiwib25TZXRTb3J0Iiwib25TZXRGaWx0ZXIiLCJvblJlc2V0RmlsdGVycyIsIm9uVG9nZ2xlRGlzcGxheWVkRmllbGQiLCJvblJlc2V0RGlzcGxheWVkRmllbGRzIiwib25EdXBsaWNhdGVSZWNvcmQiLCJvbkRlbGV0ZVJlY29yZCIsInNob3dTZWFyY2giLCJzZXRTaG93U2VhcmNoIiwic2hvd0ZpbHRlcnMiLCJzZXRTaG93RmlsdGVycyIsInNob3dEaXNwbGF5ZWQiLCJzZXRTaG93RGlzcGxheWVkIiwic2VhcmNoVmFsdWUiLCJzZXRTZWFyY2hWYWx1ZSIsIm9wZW5NZW51SWQiLCJzZXRPcGVuTWVudUlkIiwibWVudVJlZiIsInVzZUVmZmVjdCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiaGFuZGxlUG9pbnRlckRvd24iLCJjb250YWlucyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaXNwbGF5ZWRDb2x1bW5zIiwidXNlTWVtbyIsImF2YWlsYWJsZUZpZWxkcyIsImRpc3BsYXllZEZpZWxkcyIsInBsYWNlaG9sZGVyIiwiYXV0b0ZvY3VzIiwibGVmdCIsInJpZ2h0IiwiZmlsdGVycyIsImFjdGl2ZUZpbHRlcnMiLCJvcHRpb24iLCJjb2x1bW4iLCJzb3J0QnkiLCJzb3J0T3JkZXIiLCJkb2N1bWVudElkIiwiaWQiLCJjb2x1bW5zIiwiRWRpdFZpZXciLCJwdWJsaXNoZWRSZWNvcmQiLCJhY3RpdmVUYWIiLCJvblN3aXRjaFRhYiIsInNhdmluZyIsIm9uQmFjayIsIm9uU2F2ZSIsIm9uUHVibGlzaCIsIm9uRGVsZXRlIiwib25EaXNjYXJkQ2hhbmdlcyIsIm9uVW5wdWJsaXNoIiwiY2FuU2F2ZSIsImNhblB1Ymxpc2giLCJjYW5EaXNjYXJkIiwiY2FuVW5wdWJsaXNoIiwiZGlzcGxheWVkUmVjb3JkIiwiaXNQdWJsaXNoZWRWaWV3IiwibWVudU9wZW4iLCJzZXRNZW51T3BlbiIsIk1lc3NhZ2VCb3giLCJ2YXJpYW50IiwiZWRpdExheW91dCIsInJvdyIsIkNvbGxlY3Rpb25NYW5hZ2VyIiwidXNlUGFyYW1zIiwibG9jYXRpb24iLCJ1c2VMb2NhdGlvbiIsImFkZE5vdGljZSIsInVzZU5vdGljZSIsInNldExvYWRpbmciLCJsaXN0TG9hZGluZyIsInNldExpc3RMb2FkaW5nIiwic2V0U2F2aW5nIiwic2V0RGVmaW5pdGlvbiIsInNldFJlY29yZHMiLCJzZXRDb250cm9scyIsInNldFJlY29yZCIsIm9yaWdpbmFsUmVjb3JkIiwic2V0T3JpZ2luYWxSZWNvcmQiLCJzZXRQdWJsaXNoZWRSZWNvcmQiLCJzZXRBY3RpdmVUYWIiLCJzZXRFcnJvciIsInJlY29yZElkIiwiZ2V0IiwiaXNOZXciLCJjYXRlZ29yeSIsInBsYW5UeXBlIiwiZmVhdHVyZWQiLCJpc0ZlYXR1cmVkIiwiaXNQb3B1bGFyIiwibW9kZSIsImlzRGlydHkiLCJoYXNEcmFmdENvbnRlbnQiLCJoYXNVbnB1Ymxpc2hlZENoYW5nZXMiLCJhY3RpdmUiLCJsb2FkIiwic2hvdWxkQmxvY2siLCJuZXciLCJqb2luIiwibmV4dERyYWZ0UmVjb3JkIiwiZHJhZnRSZWNvcmQiLCJsb2FkRXJyb3IiLCJ1cGRhdGVMaXN0UXVlcnkiLCJwYXRjaCIsIm5leHRQYXJhbXMiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVBZGRJdGVtIiwiaGFuZGxlUmVtb3ZlSXRlbSIsImhhbmRsZU1vdmVJdGVtIiwiaGFuZGxlU2F2ZUludGVudCIsImludGVudCIsIm5vdGljZSIsImRlbGV0ZWQiLCJyZXF1ZXN0RXJyb3IiLCJoYW5kbGVEaXNjYXJkQ2hhbmdlcyIsImhhbmRsZUNyZWF0ZSIsImhhbmRsZUxpc3RBY3Rpb24iLCJ0YXJnZXRSZWNvcmRJZCIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsImhlaWdodCIsIkxvYWRlciIsImxpc3RDb2x1bW5zIiwibmV4dFNlYXJjaCIsIm5leHRSZWNvcmRJZCIsIm5leHRPcmRlciIsIm5leHRGaWVsZHMiLCJTZXQiLCJhcGkiLCJBcGlDbGllbnQiLCJQQVRIX0ZJRUxEX1BBVFRFUk4iLCJSRVFVSVJFRF9GSUVMRF9QQVRURVJOIiwiUk9VVEVfT1BUSU9OUyIsIlBBR0VfTEFZT1VUUyIsImZpZWxkcyIsImhvbWVwYWdlIiwiZ2V0RmllbGRMYWJlbCIsImZpZWxkS2V5IiwiZW5kc1dpdGgiLCJnZXRQYXRoT3B0aW9ucyIsInVuc2hpZnQiLCJpc1BsYWluT2JqZWN0IiwiZ2V0RmlsZW5hbWUiLCJVUkwiLCJmaWxlbmFtZSIsInBvcCIsInRyaW1tZWQiLCJ0b0FkbWluRXJyb3JNZXNzYWdlIiwicmVzcG9uc2VEYXRhIiwiZGF0YSIsImlzUmVxdWlyZWRGaWVsZCIsImZpZWxkQ2xhc3NOYW1lIiwiZ2V0SXRlbVRpdGxlIiwiZmFsbGJhY2tMYWJlbCIsInByZWZlcnJlZCIsInF1ZXN0aW9uIiwiZmVhdHVyZSIsImZpbmQiLCJidWlsZFNlY3Rpb25zIiwiY29udGVudCIsImxheW91dCIsInVzZWQiLCJzZWN0aW9ucyIsInNlY3Rpb24iLCJzZWN0aW9uRW50cmllcyIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImFkZCIsImV4dHJhRW50cmllcyIsImhhcyIsImlucHV0VmFsdWUiLCJyZXF1aXJlZCIsImlzSW1hZ2VGaWVsZCIsImlzUGF0aEZpZWxkIiwicHJldmlld1VybCIsInNob3dQcmV2aWV3Iiwic2VsZWN0ZWRGaWxlIiwiT2JqZWN0RmllbGQiLCJuZXN0ZWRLZXkiLCJwcm9wcyIsIkZvcm1TZWN0aW9uIiwiQ29udGVudFBhZ2VFZGl0b3IiLCJwYWdlTGFiZWwiLCJzZXRQYWdlTGFiZWwiLCJzZXRDb250ZW50Iiwib3JpZ2luYWxDb250ZW50Iiwic2V0T3JpZ2luYWxDb250ZW50IiwicHVibGlzaGVkQ29udGVudCIsInNldFB1Ymxpc2hlZENvbnRlbnQiLCJkaXNwbGF5ZWRDb250ZW50IiwiZW50cnlUaXRsZSIsImhlcm9UaXRsZSIsInNpdGVOYW1lIiwiaXNNb3VudGVkIiwibG9hZFBhZ2UiLCJnZXRQYWdlIiwibmV4dERyYWZ0Q29udGVudCIsImRyYWZ0RGF0YSIsInB1Ymxpc2hlZERhdGEiLCJoYW5kbGVTYXZlIiwic2F2ZUVycm9yIiwiaGlzdG9yeSIsImJhY2siLCJidWlsZFBhZ2VQYXRoIiwicmVxdWVzdE1lZGlhIiwiQXNzZXRDYXJkIiwib25PcGVuIiwidGh1bWJuYWlsVXJsIiwiYWx0ZXJuYXRpdmVUZXh0IiwibWltZSIsImV4dCIsIndpZHRoIiwiRGV0YWlsVmlldyIsIm1hcmdpbkJvdHRvbSIsImZvbnRTaXplIiwibGluZUhlaWdodCIsInJlYWRPbmx5IiwiY2FwdGlvbiIsInNpemVMYWJlbCIsInByb3ZpZGVyIiwiZm9sZGVyUGF0aCIsInVwZGF0ZWRBdExhYmVsIiwiY3JlYXRlZEF0TGFiZWwiLCJNZWRpYUxpYnJhcnkiLCJmaWxlSWQiLCJzZXRJdGVtcyIsImNvdW50Iiwic2V0Q291bnQiLCJzZXRJdGVtIiwib3Blbkxpc3QiLCJpbnB1dCIsIm9uY2hhbmdlIiwicmVmcmVzaGVkUGF5bG9hZCIsImRlZmF1bHRWYWx1ZSIsIm1lZGlhSXRlbSIsIm5leHRJZCIsIkNPTlRFTlRfUEFHRV9PUkRFUiIsIkNPTlRFTlRfUEFHRV9MQUJFTFMiLCJSRVNPVVJDRV9MQUJFTFMiLCJTSURFQkFSX1dJRFRIIiwiUkFJTF9XSURUSCIsIml0ZW1NYXRjaGVzU2VhcmNoIiwiUmFpbEljb24iLCJjaGlsZHJlbiIsInZpZXdCb3giLCJIb21lSWNvbiIsImQiLCJQZW5jaWxJY29uIiwiTWVkaWFJY29uIiwieCIsInkiLCJyeCIsImN4IiwiY3kiLCJyIiwiU2lkZWJhciIsImlzVmlzaWJsZSIsInBhZ2VzIiwidXNlU2VsZWN0b3IiLCJzdGF0ZSIsInNlc3Npb24iLCJzZXRTZWFyY2giLCJwYWdlSXRlbXMiLCJwYWdlIiwic2VsZWN0ZWQiLCJjb2xsZWN0aW9uSXRlbXMiLCJyZXNvdXJjZSIsImluaXRpYWwiLCJlbWFpbCIsImlzRGFzaGJvYXJkIiwiaXNNZWRpYSIsInNob3dQYW5lbCIsIkxvZ2luIiwiX19BUFBfU1RBVEVfXyIsImJyYW5kaW5nIiwiZXJyb3JNZXNzYWdlIiwiQm94IiwicCIsImJhY2tncm91bmQiLCJiZyIsIm1pbkhlaWdodCIsImJveFNoYWRvdyIsImJvcmRlclJhZGl1cyIsIm92ZXJmbG93IiwiZmxleERpcmVjdGlvbiIsImNvbG9yIiwiY29tcGFueU5hbWUiLCJvYmplY3RGaXQiLCJIMiIsIlRleHQiLCJhcyIsImFjdGlvbiIsImZsZXhHcm93IiwibWIiLCJtYXJnaW4iLCJGb3JtR3JvdXAiLCJMYWJlbCIsIklucHV0IiwiYXV0b0NvbXBsZXRlIiwibXQiLCJCdXR0b24iLCJzaXplIiwiVG9wQmFyIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBR0EsTUFBTUEsYUFBYSxHQUFHLENBQ3BCO0VBQUVDLEVBQUFBLEtBQUssRUFBRSxVQUFVO0VBQUVDLEVBQUFBLElBQUksRUFBRTtFQUF3QixDQUFDLEVBQ3BEO0VBQUVELEVBQUFBLEtBQUssRUFBRSxZQUFZO0VBQUVDLEVBQUFBLElBQUksRUFBRTtFQUEwQixDQUFDLEVBQ3hEO0VBQUVELEVBQUFBLEtBQUssRUFBRSxjQUFjO0VBQUVDLEVBQUFBLElBQUksRUFBRTtFQUE0QixDQUFDLEVBQzVEO0VBQUVELEVBQUFBLEtBQUssRUFBRSxjQUFjO0VBQUVDLEVBQUFBLElBQUksRUFBRTtFQUE0QixDQUFDLENBQzdEO0VBRUQsTUFBTUMsV0FBVyxHQUFHLENBQ2xCO0VBQUVGLEVBQUFBLEtBQUssRUFBRSxZQUFZO0VBQUVDLEVBQUFBLElBQUksRUFBRTtFQUEwQixDQUFDLEVBQ3hEO0VBQUVELEVBQUFBLEtBQUssRUFBRSxXQUFXO0VBQUVDLEVBQUFBLElBQUksRUFBRTtFQUF5QixDQUFDLEVBQ3REO0VBQUVELEVBQUFBLEtBQUssRUFBRSxlQUFlO0VBQUVDLEVBQUFBLElBQUksRUFBRTtFQUE2QixDQUFDLEVBQzlEO0VBQUVELEVBQUFBLEtBQUssRUFBRSxlQUFlO0VBQUVDLEVBQUFBLElBQUksRUFBRTtFQUE2QixDQUFDLENBQy9EO0VBRUQsTUFBTUUsUUFBTSxHQUFHO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0VBRUQsU0FBU3FCLE9BQU9BLENBQUNDLElBQUksRUFBRTtFQUNyQixFQUFBLE9BQU9BLElBQUksQ0FDUkMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUN0Q0EsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FDdEJBLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQzNCQSxPQUFPLENB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztFQUVELFNBQVNpYSxhQUFhQSxDQUFDOVcsUUFBUSxFQUFFQyxNQUFNLEVBQUU7RUFDdkMsRUFBQSxNQUFNQyxZQUFZLEdBQUcsSUFBSUMsZUFBZSxFQUFFO0VBRTFDbkIsRUFBQUEsTUFBTSxDQUFDVyxPQUFPLENBQUNNLE1BQU0sQ0FBQyxDQUFDRyxPQUFPLENBQUMsQ0FBQyxDQUFDNUMsR0FBRyxFQUFFZ0IsS0FBSyxDQUFDLEtBQUs7TUFDL0MsSUFBSUEsS0FBSyxLQUFLLElBQUksSUFBSUEs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
