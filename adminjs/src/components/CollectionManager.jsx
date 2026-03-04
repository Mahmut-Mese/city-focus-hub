import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Loader, MessageBox } from '@adminjs/design-system';
import { useNotice } from 'adminjs';

const MULTILINE_FIELD_PATTERN = /(description|content|message|body|subtitle|excerpt|intro|hours|address|text|paragraph|overview|challenge|result|answer)/i;
const IMAGE_FIELD_PATTERN = /(image|coverImage|contentImages)/i;
const BOOLEAN_FIELD_PATTERN = /^(featured|isFeatured|isPopular)$/i;
const FULL_WIDTH_FIELD_PATTERN = /(description|content|answer|excerpt|contentImages|coverImage|image|features|badges|tags)$/i;

const STYLES = `
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

function toLabel(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\bfaq\b/gi, 'FAQ')
    .replace(/^./, (v) => v.toUpperCase());
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function getEmptyItem(sample) {
  if (Array.isArray(sample)) {
    return [];
  }

  if (sample && typeof sample === 'object') {
    return Object.fromEntries(
      Object.keys(sample)
        .map((key) => {
          if (['id', 'documentId', 'status', 'updatedAt', 'publishedAt'].includes(key)) {
            return [key, sample[key] ?? null];
          }

          return [key, getEmptyItem(sample[key])];
        }),
    );
  }

  if (typeof sample === 'boolean') {
    return false;
  }

  if (typeof sample === 'number') {
    return 0;
  }

  return '';
}

function toComparableValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => toComparableValue(item));
  }

  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .filter((key) => !['updatedAt', 'publishedAt', 'status'].includes(key))
      .reduce((accumulator, key) => {
        accumulator[key] = toComparableValue(value[key]);
        return accumulator;
      }, {});
  }

  return value;
}

function hasMeaningfulValue(value) {
  if (Array.isArray(value)) {
    return value.some((item) => hasMeaningfulValue(item));
  }

  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([key]) => !['id', 'documentId', 'updatedAt', 'publishedAt', 'status'].includes(key))
      .some(([, nestedValue]) => hasMeaningfulValue(nestedValue));
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
  return String(value ?? '')
    .split(',')
    .map((field) => field.trim())
    .filter(Boolean);
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

function updateAtPath(value, path, nextValue) {
  if (!path.length) {
    return nextValue;
  }
  const [segment, ...rest] = path;
  const clone = Array.isArray(value) ? [...value] : { ...value };
  clone[segment] = updateAtPath(value?.[segment], rest, nextValue);
  return clone;
}

function removeAtPath(value, path) {
  if (path.length === 1) {
    return Array.isArray(value) ? value.filter((_, index) => index !== path[0]) : value;
  }
  const [segment, ...rest] = path;
  const clone = Array.isArray(value) ? [...value] : { ...value };
  clone[segment] = removeAtPath(value?.[segment], rest);
  return clone;
}

function appendAtPath(value, path, nextItem) {
  if (!path.length) {
    return [...(Array.isArray(value) ? value : []), nextItem];
  }
  const [segment, ...rest] = path;
  const clone = Array.isArray(value) ? [...value] : { ...value };
  clone[segment] = appendAtPath(value?.[segment], rest, nextItem);
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
  const response = await fetch(
    `/admin/api/pages/${pageName}${queryString ? `?${queryString}` : ''}`,
    {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'same-origin',
    },
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message ?? 'Request failed');
  }

  return payload;
}

function MediaField({ label, value, path, onChange, disabled }) {
  const urls = Array.isArray(value) ? value : [value].filter(Boolean);

  return (
    <div className="strapi-field strapi-field--full">
      <label className="strapi-label">{label}</label>
      <div className="strapi-media">
        <div className="strapi-media__canvas">
          {urls.length ? (
            <div className="strapi-media__stack">
              <img className="strapi-media__thumb" src={urls[0]} alt={label} />
              <div className="strapi-media__actions">
                <button className="strapi-media__action" type="button" onClick={() => window.open(urls[0], '_blank', 'noopener,noreferrer')}>↗</button>
                <button className="strapi-media__action" type="button" disabled={disabled} onClick={() => onChange(path, Array.isArray(value) ? [] : '')}>✕</button>
              </div>
              <div className="strapi-media__filename">{urls[0].split('/').pop()}</div>
            </div>
          ) : (
            <div>No media selected.</div>
          )}
        </div>
        <div className="strapi-media__source">
          {Array.isArray(value) ? (
            <textarea
              className="strapi-textarea"
              value={value.join('\n')}
              disabled={disabled}
              onChange={(event) => onChange(path, event.target.value.split('\n').map((item) => item.trim()).filter(Boolean))}
              placeholder="One image URL per line"
            />
          ) : (
            <input
              className="strapi-input"
              value={value ?? ''}
              disabled={disabled}
              onChange={(event) => onChange(path, event.target.value)}
              placeholder="https://..."
            />
          )}
        </div>
      </div>
    </div>
  );
}

function PrimitiveField({ field, value, path, onChange, disabled }) {
  const label = toLabel(field);

  if (IMAGE_FIELD_PATTERN.test(field)) {
    return <MediaField label={label} value={value} path={path} onChange={onChange} disabled={disabled} />;
  }

  if (BOOLEAN_FIELD_PATTERN.test(field)) {
    return (
      <div className="strapi-field strapi-field--full">
        <label className="strapi-label">{label}</label>
        <div className="strapi-toggle">
          <span>{value ? 'Enabled' : 'Disabled'}</span>
          <input type="checkbox" checked={Boolean(value)} disabled={disabled} onChange={(event) => onChange(path, event.target.checked)} />
        </div>
      </div>
    );
  }

  const className = FULL_WIDTH_FIELD_PATTERN.test(field) ? 'strapi-field strapi-field--full' : 'strapi-field';

  return (
    <div className={className}>
      <label className="strapi-label">
        {label}
        {field !== 'sortOrder' && !BOOLEAN_FIELD_PATTERN.test(field) ? <span className="strapi-label__required">*</span> : null}
      </label>
      {MULTILINE_FIELD_PATTERN.test(field) ? (
        <textarea
          className="strapi-textarea"
          value={value ?? ''}
          disabled={disabled}
          onChange={(event) => onChange(path, parseInputValue(event.target.value, value))}
        />
      ) : (
        <input
          className="strapi-input"
          type={typeof value === 'number' ? 'number' : 'text'}
          value={value ?? ''}
          disabled={disabled}
          onChange={(event) => onChange(path, parseInputValue(event.target.value, value))}
        />
      )}
    </div>
  );
}

function ArrayField({ field, value, path, onChange, onAddItem, onRemoveItem, disabled }) {
  const label = toLabel(field);
  const items = Array.isArray(value) ? value : [];

  return (
    <div className="strapi-field strapi-field--full">
      <label className="strapi-label">{label}</label>
      <div className="strapi-repeatable">
        <div className="strapi-repeatable__head">
          <div>
            <div className="strapi-repeatable__title">{label}</div>
            <div className="strapi-repeatable__count">{items.length} entries</div>
          </div>
        </div>
        {items.map((item, index) => (
          <details key={`${field}-${index}`} className="strapi-repeatable__item" open={index === 0}>
            <summary className="strapi-repeatable__summary">
              <div className="strapi-repeatable__summary-left">
                <span className="strapi-repeatable__bullet">▼</span>
                <span className="strapi-repeatable__name">{typeof item === 'string' ? item || `${label} ${index + 1}` : item?.text || `${label} ${index + 1}`}</span>
              </div>
              <div className="strapi-repeatable__actions">
                <button
                  className="strapi-repeatable__icon-button"
                  type="button"
                  disabled={disabled}
                  onClick={(event) => {
                    event.preventDefault();
                    onRemoveItem([...path, index]);
                  }}
                >
                  🗑
                </button>
                <span>⋮⋮</span>
              </div>
            </summary>
            <div className="strapi-repeatable__body">
              <div className="strapi-field-grid">
                <div className="strapi-field strapi-field--full">
                  <label className="strapi-label">{label === 'Tags' ? 'Text' : label.slice(0, -1) || label}</label>
                  <input
                    className="strapi-input"
                    value={typeof item === 'string' ? item : item?.text ?? ''}
                    disabled={disabled}
                    onChange={(event) => onChange([...path, index], { text: event.target.value })}
                  />
                </div>
              </div>
            </div>
          </details>
        ))}
        <button className="strapi-repeatable__add" type="button" disabled={disabled} onClick={() => onAddItem(path, { text: '' })}>
          + Add an entry
        </button>
      </div>
    </div>
  );
}

function FieldRenderer({ field, value, path, onChange, onAddItem, onRemoveItem, disabled }) {
  if (Array.isArray(value)) {
    return <ArrayField field={field} value={value} path={path} onChange={onChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} disabled={disabled} />;
  }
  return <PrimitiveField field={field} value={value} path={path} onChange={onChange} disabled={disabled} />;
}

function renderListCell(field, value) {
  if (field === 'status') {
    return <span className="strapi-list-status">{value}</span>;
  }

  if ((field === 'featured' || field === 'isFeatured' || field === 'isPopular') && (value === 'Yes' || value === 'No')) {
    return (
      <span className={`strapi-list-boolean ${value === 'Yes' ? 'strapi-list-boolean--yes' : 'strapi-list-boolean--no'}`}>
        {value === 'Yes' ? '✓' : '✕'}
      </span>
    );
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
  onDeleteRecord,
}) {
  const [showSearch, setShowSearch] = useState(Boolean(search));
  const [showFilters, setShowFilters] = useState(false);
  const [showDisplayed, setShowDisplayed] = useState(false);
  const [searchValue, setSearchValue] = useState(search);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (searchValue !== search) {
        onSearch(searchValue);
      }
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [onSearch, search, searchValue]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const displayedColumns = useMemo(
    () => controls.availableFields.filter((field) => controls.displayedFields.includes(field.field)),
    [controls.availableFields, controls.displayedFields],
  );

  return (
    <div className="strapi-editor">
      <style>{STYLES}</style>
      <div className="strapi-editor__inner">
        <div className="strapi-header">
          <div>
            <div className="strapi-meta">Collection Type</div>
            <h1 className="strapi-title">{definition.label}</h1>
          </div>
          <div className="strapi-list-actions">
            <button className="strapi-primary" type="button" onClick={onCreate}>+ Create new entry</button>
          </div>
        </div>

        <div className="strapi-list-meta">{records.length} entries found</div>

        <div className="strapi-list-toolbar">
          <div className="strapi-toolbar-cluster">
            <button
              className={`strapi-toolbar-button strapi-toolbar-button--icon${showSearch ? ' strapi-toolbar-button--active' : ''}`}
              type="button"
              onClick={() => setShowSearch((current) => !current)}
            >
              🔍
            </button>
            {showSearch ? (
              <input
                className="strapi-toolbar-search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search"
                autoFocus
              />
            ) : null}
            <button
              className={`strapi-toolbar-button${showFilters ? ' strapi-toolbar-button--active' : ''}`}
              type="button"
              onClick={() => {
                setShowFilters((current) => !current);
                setShowDisplayed(false);
              }}
            >
              Filters
            </button>
            {showFilters ? (
              <div className="strapi-list-popover" style={{ left: showSearch ? 332 : 52, right: 'auto' }}>
                <div className="strapi-list-popover__head">
                  <div className="strapi-list-popover__title">Filters</div>
                  <button className="strapi-list-popover__reset" type="button" onClick={onResetFilters}>Reset</button>
                </div>
                {controls.filters.map((filter) => (
                  <div key={filter.field} className="strapi-list-popover__group">
                    <label className="strapi-list-popover__label">{filter.label}</label>
                    <select
                      className="strapi-list-popover__select"
                      value={controls.activeFilters[filter.field] ?? ''}
                      onChange={(event) => onSetFilter(filter.field, event.target.value)}
                    >
                      <option value="">All</option>
                      {filter.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="strapi-list-actions">
            <div className="strapi-toolbar-cluster">
              <button
                className={`strapi-toolbar-button strapi-toolbar-button--icon${showDisplayed ? ' strapi-toolbar-button--active' : ''}`}
                type="button"
                onClick={() => {
                  setShowDisplayed((current) => !current);
                  setShowFilters(false);
                }}
              >
                ⚙
              </button>
              {showDisplayed ? (
                <div className="strapi-list-popover">
                  <div className="strapi-list-popover__head">
                    <div className="strapi-list-popover__title">Displayed fields</div>
                    <button
                      className="strapi-list-popover__reset"
                      type="button"
                      onClick={onResetDisplayedFields}
                    >
                      Reset
                    </button>
                  </div>
                  {controls.availableFields.map((field) => (
                    <label key={field.field} className="strapi-list-popover__check">
                      <input
                        type="checkbox"
                        checked={controls.displayedFields.includes(field.field)}
                        onChange={(event) => onToggleDisplayedField(field.field, event.target.checked)}
                      />
                      <span>{field.label}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <section className="strapi-list-card">
          <div className="strapi-list-card__head">
            <strong>{definition.label}</strong>
            <span>{loading ? 'Loading...' : `${records.length} entries`}</span>
          </div>
          <table className="strapi-list-table">
            <thead>
              <tr>
                {displayedColumns.map((column) => (
                  <th key={column.field}>
                    <button type="button" onClick={() => onSetSort(column.field)}>
                      {column.label}
                      {controls.sortBy === column.field ? ` ${controls.sortOrder === 'asc' ? '↑' : '↓'}` : ''}
                    </button>
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.documentId} onClick={() => onOpenRecord(record.id)}>
                  {displayedColumns.map((column) => (
                    <td key={`${record.documentId}-${column.field}`}>{renderListCell(column.field, record.columns[column.field])}</td>
                  ))}
                  <td className="strapi-list-row-menu-cell">
                    <button
                      className="strapi-list-row-menu-trigger"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenMenuId((current) => (current === record.id ? null : record.id));
                      }}
                    >
                      …
                    </button>
                    {openMenuId === record.id ? (
                      <div
                        ref={menuRef}
                        className="strapi-list-row-menu"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button className="strapi-list-row-menu__item" type="button" onClick={() => {
                          setOpenMenuId(null);
                          onOpenRecord(record.id);
                        }}>
                          <span className="strapi-list-row-menu__icon">✎</span>
                          <span>Edit</span>
                        </button>
                        <button className="strapi-list-row-menu__item" type="button" onClick={() => {
                          setOpenMenuId(null);
                          onDuplicateRecord(record.id);
                        }}>
                          <span className="strapi-list-row-menu__icon">⧉</span>
                          <span>Duplicate</span>
                        </button>
                        <button className="strapi-list-row-menu__item strapi-list-row-menu__item--danger" type="button" onClick={() => {
                          setOpenMenuId(null);
                          onDeleteRecord(record.id);
                        }}>
                          <span className="strapi-list-row-menu__icon">🗑</span>
                          <span>Delete entry</span>
                        </button>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

function EditView({ definition, record, publishedRecord, activeTab, onSwitchTab, saving, error, onBack, onChange, onAddItem, onRemoveItem, onSave, onPublish, onDelete, onDiscardChanges, onUnpublish, canSave, canPublish, canDiscard, canUnpublish }) {
  const displayedRecord = activeTab === 'published' && publishedRecord ? publishedRecord : record;
  const isPublishedView = activeTab === 'published' && publishedRecord;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [menuOpen]);

  return (
    <div className="strapi-editor">
      <style>{STYLES}</style>
      <div className="strapi-editor__inner">
        <button className="strapi-back" type="button" onClick={onBack}>← Back</button>

        <div className="strapi-header">
          <div>
            <div className="strapi-meta">Collection Type</div>
            <h1 className="strapi-title">{getDisplayTitle(definition, displayedRecord)}</h1>
            <div className="strapi-status">{publishedRecord ? 'Published' : (displayedRecord.status || 'Draft')}</div>
          </div>
          <button className="strapi-kebab" type="button">…</button>
        </div>

        <div className="strapi-tabs">
          <button className={`strapi-tab${activeTab === 'draft' ? ' strapi-tab--active' : ''}`} type="button" onClick={() => onSwitchTab('draft')}>DRAFT</button>
          <button className={`strapi-tab${activeTab === 'published' ? ' strapi-tab--active' : ''}`} type="button" onClick={() => publishedRecord && onSwitchTab('published')}>PUBLISHED</button>
        </div>

        {error ? <MessageBox variant="danger">{error}</MessageBox> : null}

        <div className="strapi-layout">
          <div className="strapi-main-card">
            {definition.editLayout.map((row, index) => (
              <div key={`row-${index}`} className="strapi-section">
                <div className="strapi-field-grid">
                  {row.map((field) => (
                    <FieldRenderer
                      key={field}
                      field={field}
                      value={displayedRecord[field]}
                      path={[field]}
                      onChange={onChange}
                      onAddItem={onAddItem}
                      onRemoveItem={onRemoveItem}
                      disabled={isPublishedView}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside>
            <div className="strapi-side-card">
              <div className="strapi-side-card__head">Entry</div>
              <div className="strapi-side-card__body">
                <div className="strapi-side-button-row">
                  <button className="strapi-side-button--secondary" type="button" onClick={onPublish} disabled={!canPublish}>Publish</button>
                  <button className="strapi-side-button--secondary strapi-side-button--menu" type="button" onClick={() => setMenuOpen((current) => !current)}>…</button>
                  {menuOpen ? (
                    <div ref={menuRef} className="strapi-side-action-menu">
                      <button
                        className="strapi-side-action-menu__item strapi-side-action-menu__item--danger"
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onUnpublish();
                        }}
                        disabled={!canUnpublish}
                      >
                        <span className="strapi-side-action-menu__icon">×</span>
                        Unpublish
                      </button>
                      <button
                        className="strapi-side-action-menu__item strapi-side-action-menu__item--danger"
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onDiscardChanges();
                        }}
                        disabled={!canDiscard}
                      >
                        <span className="strapi-side-action-menu__icon">×</span>
                        Discard changes
                      </button>
                    </div>
                  ) : null}
                </div>
                <button className="strapi-side-button" type="button" onClick={onSave} disabled={!canSave}>
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>

            <div className="strapi-side-card">
              <div className="strapi-side-card__head">Actions</div>
              <div className="strapi-side-card__body">
                <button className="strapi-side-button--secondary" type="button" onClick={onDelete} disabled={isPublishedView}>Delete</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function CollectionManager() {
  const { pageName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const addNotice = useNotice();
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [definition, setDefinition] = useState(null);
  const [records, setRecords] = useState([]);
  const [controls, setControls] = useState(null);
  const [record, setRecord] = useState(null);
  const [originalRecord, setOriginalRecord] = useState(null);
  const [publishedRecord, setPublishedRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('draft');
  const [error, setError] = useState('');

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
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

  const mode = useMemo(() => (recordId || isNew ? 'edit' : 'list'), [recordId, isNew]);
  const isDirty = useMemo(
    () => JSON.stringify(toComparableValue(record)) !== JSON.stringify(toComparableValue(originalRecord)),
    [record, originalRecord],
  );
  const hasDraftContent = useMemo(() => hasMeaningfulValue(record), [record]);
  const canSave = mode === 'edit' && !saving && activeTab !== 'published' && isDirty;
  const canPublish = mode === 'edit' && !saving && activeTab !== 'published' && (publishedRecord ? isDirty : hasDraftContent);
  const canDiscard = mode === 'edit' && !saving && activeTab !== 'published' && hasDraftContent;
  const canUnpublish = mode === 'edit' && !saving && Boolean(publishedRecord);

  useEffect(() => {
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
          query: mode === 'edit'
            ? (recordId ? { recordId } : { new: '1' })
            : {
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
            },
        });

        if (!active) {
          return;
        }

        setDefinition(payload.definition);
        setRecords(payload.records ?? []);
        setControls(payload.controls ?? null);
        const nextDraftRecord = payload.draftRecord ? cloneValue(payload.draftRecord) : null;
        setRecord(nextDraftRecord);
        setOriginalRecord(nextDraftRecord ? cloneValue(nextDraftRecord) : null);
        setPublishedRecord(payload.publishedRecord ? cloneValue(payload.publishedRecord) : null);
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

  const updateListQuery = (patch) => {
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
      ...patch,
    };

    navigate(buildAdminPath(location.pathname, nextParams));
  };

  const handleChange = (path, nextValue) => {
    setRecord((current) => updateAtPath(current, path, nextValue));
  };

  const handleAddItem = (path, nextItem) => {
    setRecord((current) => appendAtPath(current, path, nextItem));
  };

  const handleRemoveItem = (path) => {
    setRecord((current) => removeAtPath(current, path));
  };

  const handleSaveIntent = async (intent) => {
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
          new: isNew ? '1' : undefined,
        },
      });

      if (payload.draftRecord) {
        const nextDraftRecord = cloneValue(payload.draftRecord);
        setRecord(nextDraftRecord);
        setOriginalRecord(cloneValue(nextDraftRecord));
      }
      setPublishedRecord(payload.publishedRecord ? cloneValue(payload.publishedRecord) : null);
      if (intent === 'unpublish') {
        setActiveTab('draft');
      }

      if (!recordId && payload.draftRecord?.id) {
        navigate(buildAdminPath(location.pathname, { recordId: payload.draftRecord.id }));
      }

      if (payload.notice) {
        addNotice({ message: payload.notice.message, type: payload.notice.type });
      }

      if (payload.deleted) {
        navigate(`/admin/pages/${pageName}`);
      }
    } catch (requestError) {
      setError(requestError.message);
      addNotice({ message: requestError.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    setRecord(getEmptyItem(record));
    setActiveTab('draft');
  };

  const handleCreate = async () => {
    navigate(buildAdminPath(location.pathname, { new: 1 }));
  };

  const handleListAction = async (intent, targetRecordId) => {
    try {
      const payload = await requestPage(pageName, {
        method: 'POST',
        body: {
          intent,
          recordId: targetRecordId,
        },
      });

      addNotice({ message: payload.notice?.message ?? `${definition.label} updated.`, type: payload.notice?.type ?? 'success' });

      if (intent === 'duplicate' && payload.draftRecord?.id) {
        navigate(buildAdminPath(location.pathname, { recordId: payload.draftRecord.id }));
        return;
      }

      if (intent === 'delete') {
        setRecords((current) => current.filter((item) => item.id !== targetRecordId));
      }
    } catch (requestError) {
      setError(requestError.message);
      addNotice({ message: requestError.message, type: 'error' });
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader />
      </div>
    );
  }

  if (!definition) {
    return <MessageBox variant="danger">Collection definition missing.</MessageBox>;
  }

  if (mode === 'list') {
    return (
      <ListView
        definition={definition}
        records={records}
        controls={controls ?? {
          displayedFields: definition.listColumns.map((column) => column.field),
          availableFields: definition.listColumns,
          filters: [],
          activeFilters: {},
          sortBy: '',
          sortOrder: 'desc',
        }}
        search={search}
        loading={listLoading}
        onSearch={(nextSearch) => updateListQuery({ search: nextSearch })}
        onOpenRecord={(nextRecordId) => navigate(buildAdminPath(location.pathname, { recordId: nextRecordId }))}
        onCreate={handleCreate}
        onSetSort={(field) => {
          const nextOrder = controls?.sortBy === field && controls?.sortOrder === 'asc' ? 'desc' : 'asc';
          updateListQuery({ sortBy: field, sortOrder: nextOrder });
        }}
        onSetFilter={(field, value) => updateListQuery({ [field]: value })}
        onResetFilters={() => updateListQuery({
          status: '',
          category: '',
          planType: '',
          featured: '',
          isFeatured: '',
          isPopular: '',
        })}
        onToggleDisplayedField={(field, checked) => {
          const nextFields = checked
            ? [...new Set([...(controls?.displayedFields ?? []), field])]
            : (controls?.displayedFields ?? []).filter((item) => item !== field);

          updateListQuery({
            displayedFields: nextFields.join(','),
          });
        }}
        onResetDisplayedFields={() => updateListQuery({
          displayedFields: definition.listColumns.map((column) => column.field).join(','),
        })}
        onDuplicateRecord={(targetRecordId) => handleListAction('duplicate', targetRecordId)}
        onDeleteRecord={(targetRecordId) => handleListAction('delete', targetRecordId)}
      />
    );
  }

  if (!record) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader />
      </div>
    );
  }

  return (
    <EditView
      definition={definition}
      record={record}
      publishedRecord={publishedRecord}
      activeTab={activeTab}
      onSwitchTab={setActiveTab}
      saving={saving}
      error={error}
      onBack={() => navigate(`/admin/pages/${pageName}`)}
      onChange={handleChange}
      onAddItem={handleAddItem}
      onRemoveItem={handleRemoveItem}
      onSave={() => handleSaveIntent('save')}
      onPublish={() => handleSaveIntent('publish')}
      onDelete={() => handleSaveIntent('delete')}
      onDiscardChanges={handleDiscardChanges}
      onUnpublish={() => handleSaveIntent('unpublish')}
      canSave={canSave}
      canPublish={canPublish}
      canDiscard={canDiscard}
      canUnpublish={canUnpublish}
    />
  );
}
