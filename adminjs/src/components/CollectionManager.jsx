import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Loader, MessageBox } from '@adminjs/design-system';
import { useNotice } from 'adminjs';

const MULTILINE_FIELD_PATTERN = /(description|content|message|body|subtitle|excerpt|intro|hours|address|text|paragraph|overview|challenge|result|answer)/i;
const IMAGE_FIELD_PATTERN = /(image|coverImage|contentImages)/i;
const BOOLEAN_FIELD_PATTERN = /^(featured|isFeatured|isPopular)$/i;
const FULL_WIDTH_FIELD_PATTERN = /(description|content|answer|excerpt|contentImages|coverImage|image|features|badges|tags)$/i;

const STYLES = `
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
  const clone = Array.isArray(value) ? [...value] : { ...value };
  clone[segment] = moveAtPath(value?.[segment], rest, offset);
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

async function uploadAdminImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/admin/api/media/upload', {
    method: 'POST',
    body: formData,
    credentials: 'same-origin',
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

function MediaField({ label, value, path, onChange, disabled }) {
  const urls = Array.isArray(value) ? value : [value].filter(Boolean);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  return (
    <div className="admin-field admin-field--full">
      <label className="admin-label">{label}</label>
      <div className="admin-media">
        <div className="admin-media__canvas">
          {urls.length ? (
            <div className="admin-media__stack">
              <img className="admin-media__thumb" src={urls[0]} alt={label} />
              <div className="admin-media__actions">
                <button className="admin-media__action" type="button" onClick={() => window.open(urls[0], '_blank', 'noopener,noreferrer')}>↗</button>
                <button className="admin-media__action" type="button" disabled={disabled} onClick={() => onChange(path, Array.isArray(value) ? [] : '')}>✕</button>
              </div>
              <div className="admin-media__filename">{urls[0].split('/').pop()}</div>
            </div>
          ) : (
            <div>No media selected.</div>
          )}
        </div>
        <div className="admin-media__source">
          {Array.isArray(value) ? (
            <textarea
              className="admin-textarea"
              value={value.join('\n')}
              disabled={disabled || uploading}
              onChange={(event) => onChange(path, event.target.value.split('\n').map((item) => item.trim()).filter(Boolean))}
              placeholder="One image URL per line"
            />
          ) : (
            <input
              className="admin-input"
              value={value ?? ''}
              disabled={disabled || uploading}
              onChange={(event) => onChange(path, event.target.value)}
              placeholder="https://..."
            />
          )}
          <div className="admin-media__source-actions">
            <button
              className="admin-media__upload-button"
              type="button"
              disabled={disabled || uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? 'Uploading...' : 'Upload from computer'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple={Array.isArray(value)}
              style={{ display: 'none' }}
              onChange={async (event) => {
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
                    const uploadedUrl = await uploadAdminImage(file);
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
              }}
            />
          </div>
          {uploadError ? <div className="admin-media__error">{uploadError}</div> : null}
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
      <div className="admin-field admin-field--full">
        <label className="admin-label">{label}</label>
        <div className="admin-toggle">
          <span>{value ? 'Enabled' : 'Disabled'}</span>
          <input type="checkbox" checked={Boolean(value)} disabled={disabled} onChange={(event) => onChange(path, event.target.checked)} />
        </div>
      </div>
    );
  }

  const className = FULL_WIDTH_FIELD_PATTERN.test(field) ? 'admin-field admin-field--full' : 'admin-field';

  return (
    <div className={className}>
      <label className="admin-label">
        {label}
        {field !== 'sortOrder' && !BOOLEAN_FIELD_PATTERN.test(field) ? <span className="admin-label__required">*</span> : null}
      </label>
      {MULTILINE_FIELD_PATTERN.test(field) ? (
        <textarea
          className="admin-textarea"
          value={value ?? ''}
          disabled={disabled}
          onChange={(event) => onChange(path, parseInputValue(event.target.value, value))}
        />
      ) : (
        <input
          className="admin-input"
          type={typeof value === 'number' ? 'number' : 'text'}
          value={value ?? ''}
          disabled={disabled}
          onChange={(event) => onChange(path, parseInputValue(event.target.value, value))}
        />
      )}
    </div>
  );
}

function ArrayField({ field, value, path, onChange, onAddItem, onRemoveItem, onMoveItem, disabled }) {
  const label = toLabel(field);
  const items = Array.isArray(value) ? value : [];
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  return (
    <div className="admin-field admin-field--full">
      <label className="admin-label">{label}</label>
      <div className="admin-repeatable">
        <div className="admin-repeatable__head">
          <div>
            <div className="admin-repeatable__title">{label}</div>
            <div className="admin-repeatable__count">{items.length} entries</div>
          </div>
        </div>
        {items.map((item, index) => (
          <details
            key={`${field}-${index}`}
            className={`admin-repeatable__item${dragOverIndex === index ? ' admin-repeatable__item--drag-over' : ''}`}
            open={index === 0}
            onDragOver={(event) => {
              if (disabled || dragIndex === null) {
                return;
              }

              event.preventDefault();
              if (dragOverIndex !== index) {
                setDragOverIndex(index);
              }
            }}
            onDrop={(event) => {
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
            }}
            onDragLeave={() => {
              if (dragOverIndex === index) {
                setDragOverIndex(null);
              }
            }}
          >
            <summary className="admin-repeatable__summary">
              <div className="admin-repeatable__summary-left">
                <span className="admin-repeatable__bullet">▼</span>
                <span className="admin-repeatable__name">{typeof item === 'string' ? item || `${label} ${index + 1}` : item?.text || `${label} ${index + 1}`}</span>
              </div>
              <div className="admin-repeatable__actions">
                <button
                  className="admin-repeatable__icon-button"
                  type="button"
                  disabled={disabled}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onRemoveItem([...path, index]);
                  }}
                  aria-label="Delete"
                >
                  🗑
                </button>
                <button
                  className="admin-repeatable__drag-handle"
                  type="button"
                  draggable={!disabled}
                  disabled={disabled}
                  title="Drag to reorder"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onDragStart={(event) => {
                    if (disabled) {
                      return;
                    }

                    event.stopPropagation();
                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('text/plain', String(index));
                    setDragIndex(index);
                    setDragOverIndex(index);
                  }}
                  onDragEnd={() => {
                    setDragIndex(null);
                    setDragOverIndex(null);
                  }}
                >
                  ⋮⋮
                </button>
              </div>
            </summary>
            <div className="admin-repeatable__body">
              <div className="admin-field-grid">
                <div className="admin-field admin-field--full">
                  <label className="admin-label">{label === 'Tags' ? 'Text' : label.slice(0, -1) || label}</label>
                  <input
                    className="admin-input"
                    value={typeof item === 'string' ? item : item?.text ?? ''}
                    disabled={disabled}
                    onChange={(event) => onChange([...path, index], { text: event.target.value })}
                  />
                </div>
              </div>
            </div>
          </details>
        ))}
        <button className="admin-repeatable__add" type="button" disabled={disabled} onClick={() => onAddItem(path, { text: '' })}>
          + Add an entry
        </button>
      </div>
    </div>
  );
}

function FieldRenderer({ field, value, path, onChange, onAddItem, onRemoveItem, onMoveItem, disabled }) {
  if (Array.isArray(value)) {
    return <ArrayField field={field} value={value} path={path} onChange={onChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} onMoveItem={onMoveItem} disabled={disabled} />;
  }
  return <PrimitiveField field={field} value={value} path={path} onChange={onChange} disabled={disabled} />;
}

function renderListCell(field, value) {
  if (field === 'status') {
    return <span className="admin-list-status">{value}</span>;
  }

  if ((field === 'featured' || field === 'isFeatured' || field === 'isPopular') && (value === 'Yes' || value === 'No')) {
    return (
      <span className={`admin-list-boolean ${value === 'Yes' ? 'admin-list-boolean--yes' : 'admin-list-boolean--no'}`}>
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
    <div className="admin-editor">
      <style>{STYLES}</style>
      <div className="admin-editor__inner">
        <div className="admin-header">
          <div>
            <div className="admin-meta">Collection Type</div>
            <h1 className="admin-title">{definition.label}</h1>
          </div>
          <div className="admin-list-actions">
            <button className="admin-primary" type="button" onClick={onCreate}>+ Create new entry</button>
          </div>
        </div>

        <div className="admin-list-meta">{records.length} entries found</div>

        <div className="admin-list-toolbar">
          <div className="admin-toolbar-cluster">
            <button
              className={`admin-toolbar-button admin-toolbar-button--icon${showSearch ? ' admin-toolbar-button--active' : ''}`}
              type="button"
              onClick={() => setShowSearch((current) => !current)}
            >
              🔍
            </button>
            {showSearch ? (
              <input
                className="admin-toolbar-search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search"
                autoFocus
              />
            ) : null}
            <button
              className={`admin-toolbar-button${showFilters ? ' admin-toolbar-button--active' : ''}`}
              type="button"
              onClick={() => {
                setShowFilters((current) => !current);
                setShowDisplayed(false);
              }}
            >
              Filters
            </button>
            {showFilters ? (
              <div className="admin-list-popover" style={{ left: showSearch ? 332 : 52, right: 'auto' }}>
                <div className="admin-list-popover__head">
                  <div className="admin-list-popover__title">Filters</div>
                  <button className="admin-list-popover__reset" type="button" onClick={onResetFilters}>Reset</button>
                </div>
                {controls.filters.map((filter) => (
                  <div key={filter.field} className="admin-list-popover__group">
                    <label className="admin-list-popover__label">{filter.label}</label>
                    <select
                      className="admin-list-popover__select"
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
          <div className="admin-list-actions">
            <div className="admin-toolbar-cluster">
              <button
                className={`admin-toolbar-button admin-toolbar-button--icon${showDisplayed ? ' admin-toolbar-button--active' : ''}`}
                type="button"
                onClick={() => {
                  setShowDisplayed((current) => !current);
                  setShowFilters(false);
                }}
              >
                ⚙
              </button>
              {showDisplayed ? (
                <div className="admin-list-popover">
                  <div className="admin-list-popover__head">
                    <div className="admin-list-popover__title">Displayed fields</div>
                    <button
                      className="admin-list-popover__reset"
                      type="button"
                      onClick={onResetDisplayedFields}
                    >
                      Reset
                    </button>
                  </div>
                  {controls.availableFields.map((field) => (
                    <label key={field.field} className="admin-list-popover__check">
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

        <section className="admin-list-card">
          <div className="admin-list-card__head">
            <strong>{definition.label}</strong>
            <span>{loading ? 'Loading...' : `${records.length} entries`}</span>
          </div>
          <table className="admin-list-table">
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
                  <td className="admin-list-row-menu-cell">
                    <button
                      className="admin-list-row-menu-trigger"
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
                        className="admin-list-row-menu"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button className="admin-list-row-menu__item" type="button" onClick={() => {
                          setOpenMenuId(null);
                          onOpenRecord(record.id);
                        }}>
                          <span className="admin-list-row-menu__icon">✎</span>
                          <span>Edit</span>
                        </button>
                        <button className="admin-list-row-menu__item" type="button" onClick={() => {
                          setOpenMenuId(null);
                          onDuplicateRecord(record.id);
                        }}>
                          <span className="admin-list-row-menu__icon">⧉</span>
                          <span>Duplicate</span>
                        </button>
                        <button className="admin-list-row-menu__item admin-list-row-menu__item--danger" type="button" onClick={() => {
                          setOpenMenuId(null);
                          onDeleteRecord(record.id);
                        }}>
                          <span className="admin-list-row-menu__icon">🗑</span>
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

function EditView({ definition, record, publishedRecord, activeTab, onSwitchTab, saving, error, onBack, onChange, onAddItem, onRemoveItem, onMoveItem, onSave, onPublish, onDelete, onDiscardChanges, onUnpublish, canSave, canPublish, canDiscard, canUnpublish }) {
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
    <div className="admin-editor">
      <style>{STYLES}</style>
      <div className="admin-editor__inner">
        <button className="admin-back" type="button" onClick={onBack}>← Back</button>

        <div className="admin-header">
          <div>
            <div className="admin-meta">Collection Type</div>
            <h1 className="admin-title">{getDisplayTitle(definition, displayedRecord)}</h1>
            <div className="admin-status">{publishedRecord ? 'Published' : (displayedRecord.status || 'Draft')}</div>
          </div>
          <button className="admin-kebab" type="button">…</button>
        </div>

        <div className="admin-tabs">
          <button className={`admin-tab${activeTab === 'draft' ? ' admin-tab--active' : ''}`} type="button" onClick={() => onSwitchTab('draft')}>DRAFT</button>
          <button className={`admin-tab${activeTab === 'published' ? ' admin-tab--active' : ''}`} type="button" onClick={() => publishedRecord && onSwitchTab('published')}>PUBLISHED</button>
        </div>

        {error ? <MessageBox variant="danger">{error}</MessageBox> : null}

        <div className="admin-layout">
          <div className="admin-main-card">
            {definition.editLayout.map((row, index) => (
              <div key={`row-${index}`} className="admin-section">
                <div className="admin-field-grid">
                  {row.map((field) => (
                    <FieldRenderer
                      key={field}
                      field={field}
                      value={displayedRecord[field]}
                      path={[field]}
                      onChange={onChange}
                      onAddItem={onAddItem}
                      onRemoveItem={onRemoveItem}
                      onMoveItem={onMoveItem}
                      disabled={isPublishedView}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside>
            <div className="admin-side-card">
              <div className="admin-side-card__head">Entry</div>
              <div className="admin-side-card__body">
                <div className="admin-side-button-row">
                  <button className="admin-side-button--secondary" type="button" onClick={onPublish} disabled={!canPublish}>Publish</button>
                  <button className="admin-side-button--secondary admin-side-button--menu" type="button" onClick={() => setMenuOpen((current) => !current)}>…</button>
                  {menuOpen ? (
                    <div ref={menuRef} className="admin-side-action-menu">
                      <button
                        className="admin-side-action-menu__item admin-side-action-menu__item--danger"
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onUnpublish();
                        }}
                        disabled={!canUnpublish}
                      >
                        <span className="admin-side-action-menu__icon">×</span>
                        Unpublish
                      </button>
                      <button
                        className="admin-side-action-menu__item admin-side-action-menu__item--danger"
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          onDiscardChanges();
                        }}
                        disabled={!canDiscard}
                      >
                        <span className="admin-side-action-menu__icon">×</span>
                        Discard changes
                      </button>
                    </div>
                  ) : null}
                </div>
                <button className="admin-side-button" type="button" onClick={onSave} disabled={!canSave}>
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>

            <div className="admin-side-card">
              <div className="admin-side-card__head">Actions</div>
              <div className="admin-side-card__body">
                <button className="admin-side-button--secondary" type="button" onClick={onDelete} disabled={isPublishedView}>Delete</button>
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

  const handleMoveItem = (path, offset) => {
    setRecord((current) => moveAtPath(current, path, offset));
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
      onMoveItem={handleMoveItem}
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
