import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { ApiClient, useNotice } from 'adminjs';
import { Loader, MessageBox } from '@adminjs/design-system';

const api = new ApiClient();

const MULTILINE_FIELD_PATTERN = /(description|content|message|body|subtitle|excerpt|intro|hours|address|text|paragraph|overview|challenge|result)/i;
const IMAGE_FIELD_PATTERN = /(image|background|logo|thumbnail|featured)/i;
const PATH_FIELD_PATTERN = /(^path$|Path$)/;
const FULL_WIDTH_FIELD_PATTERN = /(description|content|message|body|subtitle|excerpt|intro|overview|challenge|result|background|image|gallery|sections|testimonials|services|whyChooseItems|featureChips|socialLinks|faqItems|comparisonRows|comparisonColumns|storyParagraphs|relatedWorkspaces|challengeItems|amenities|navigation|footer|form)/i;
const REQUIRED_FIELD_PATTERN = /(heroTitle|heroSubtitle|storyTitle|whyChooseTitle|amenitiesTitle|title)$/i;
const ROUTE_OPTIONS = [
  { value: '/', label: 'Home' },
  { value: '/pricing', label: 'Pricing' },
  { value: '/meeting-rooms', label: 'Meeting Rooms' },
  { value: '/virtual-office', label: 'Virtual Office' },
  { value: '/about', label: 'About' },
  { value: '/contact', label: 'Contact' },
  { value: '/faq', label: 'FAQ' },
  { value: '/blog', label: 'Blog' },
  { value: '/privacy', label: 'Privacy Policy' },
  { value: '/terms', label: 'Terms' },
  { value: '/dashboard', label: 'Dashboard' },
];

const PAGE_LAYOUTS = {
  'site-settings': [
    { fields: ['siteName', 'tagline'] },
    { fields: ['contactEmail', 'contactPhone', 'address'] },
    { fields: ['defaultSeoTitle', 'defaultSeoDescription'] },
    { fields: ['navigation'] },
    { fields: ['footer'] },
    { fields: ['socialLinks'] },
  ],
  homepage: [
    { fields: ['hero', 'featureChips'] },
    { fields: ['servicesEyebrow', 'servicesKicker', 'services'] },
    { fields: ['aboutHighlight'] },
    { fields: ['whyChooseEyebrow', 'whyChooseKicker', 'whyChooseTitle', 'whyChooseItems'] },
    { fields: ['testimonialsEyebrow', 'testimonialsKicker', 'testimonialsTitle', 'testimonials'] },
    { fields: ['galleryEyebrow', 'galleryKicker', 'galleryTitle', 'galleryImages'] },
    { fields: ['contactForm'] },
    { fields: ['visitUsTitle', 'addressLabel', 'emailLabel', 'phoneLabel', 'openHoursLabel', 'weekdayHours', 'weekendHours', 'mapButtonLabel'] },
  ],
  'about-page': [
    { fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage'] },
    { fields: ['storyTitle', 'storyParagraphs', 'storyImage'] },
    { fields: ['whyChooseTitle', 'whyChooseItems'] },
    { fields: ['amenitiesTitle', 'amenitiesImage', 'amenities'] },
  ],
  'blog-page': [
    { fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage'] },
    { fields: ['searchPlaceholder', 'quickSearchTitle', 'recentPostsTitle', 'categoriesTitle', 'popularTagsTitle', 'noResultsText'] },
    { fields: ['detailBackLabel', 'detailSearchTitle', 'detailSearchButtonLabel', 'detailPopularTagsTitle', 'detailRecentPostsTitle', 'detailRelatedWorkspacesTitle'] },
    { fields: ['detailCommentForm'] },
    { fields: ['relatedWorkspaces'] },
  ],
  'pricing-page': [
    { fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage'] },
    { fields: ['comparisonTitle', 'featureListTitle', 'featureListSubtitle', 'comparisonColumns', 'comparisonRows', 'recommendedLabel', 'purchaseButtonLabel'] },
    { fields: ['faqTitle', 'faqSubtitle', 'faqItems'] },
  ],
  'faq-page': [
    { fields: ['eyebrow', 'heroTitle', 'heroSubtitle', 'heroBackgroundImage', 'title', 'description'] },
    { fields: ['searchPlaceholder', 'noResultsText'] },
    { fields: ['ctaTitle', 'ctaDescription', 'ctaButtonLabel'] },
  ],
  'meeting-rooms-page': [
    { fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage'] },
    { fields: ['roomsTitle', 'roomsSubtitle', 'bookNowLabel', 'readMoreLabel', 'popularLabel'] },
    { fields: ['plansTitle', 'plansSubtitle', 'getStartedLabel'] },
    { fields: ['amenitiesTitle', 'amenitiesSubtitle', 'amenities'] },
  ],
  'virtual-office-page': [
    { fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage'] },
    { fields: ['overviewTitle', 'overviewText', 'featuredImage', 'galleryImages'] },
    { fields: ['challengeTitle', 'challengeIntro', 'challengeItems'] },
    { fields: ['resultTitle', 'resultText'] },
    { fields: ['ctaTitle', 'ctaDescription', 'ctaButtonLabel'] },
    { fields: ['projectInfoTitle', 'projectDateLabel', 'projectDateValue', 'projectWebsiteLabel', 'projectWebsiteValue', 'projectCategoryLabel', 'projectCategoryValue'] },
    { fields: ['contactForm'] },
  ],
  'contact-page': [
    { fields: ['heroTitle', 'heroSubtitle', 'heroBackgroundImage'] },
    { fields: ['introEyebrow', 'introTitle'] },
    { fields: ['addressCardTitle', 'phoneCardTitle', 'emailCardTitle'] },
    { fields: ['form'] },
    { fields: ['mapTitle', 'mapDescription'] },
  ],
  'privacy-policy-page': [
    { fields: ['heroTitle', 'heroSubtitle'] },
    { fields: ['effectiveDateLabel', 'effectiveDateValue', 'introText'] },
    { fields: ['sections'] },
    { fields: ['contactTitle', 'contactBody', 'contactButtonLabel'] },
  ],
  'terms-page': [
    { fields: ['heroTitle', 'heroSubtitle'] },
    { fields: ['effectiveDateLabel', 'effectiveDateValue', 'introText'] },
    { fields: ['sections'] },
    { fields: ['contactTitle', 'contactBody', 'contactButtonLabel'] },
  ],
};

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
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\bseo\b/gi, 'SEO')
    .replace(/\bcta\b/gi, 'CTA')
    .replace(/\bfaq\b/gi, 'FAQ')
    .replace(/\bid\b/gi, 'ID')
    .replace(/\burl\b/gi, 'URL')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (value) => value.toUpperCase());
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

  if (currentValue && !options.some((option) => option.value === currentValue)) {
    options.unshift({
      value: currentValue,
      label: 'Current destination',
    });
  }

  return options;
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function toComparableValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => toComparableValue(item));
  }

  if (isPlainObject(value)) {
    return Object.keys(value)
      .sort()
      .filter((key) => key !== '__tempId')
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

  if (isPlainObject(value)) {
    return Object.entries(value)
      .filter(([key]) => key !== '__tempId')
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
    return Object.fromEntries(
      Object.keys(sample)
        .filter((key) => key !== 'id')
        .map((key) => [key, getEmptyItem(sample[key])]),
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
    if (!Array.isArray(value)) {
      return value;
    }

    return value.filter((_, index) => index !== path[0]);
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

const MEDIA_PICKER_EVENT = 'adminjs-media-select';

function chooseAdminLibraryImage() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve('');
      return;
    }

    const pickerWindow = window.open(
      '/admin/pages/media-library?picker=1',
      'admin-media-library-picker',
      'popup=yes,width=1440,height=900,resizable=yes,scrollbars=yes',
    );

    if (!pickerWindow) {
      reject(new Error('Media library popup was blocked.'));
      return;
    }

    let finished = false;

    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
      window.clearInterval(closeWatcher);
    };

    const handleMessage = (event) => {
      if (event.origin !== window.location.origin || event.source !== pickerWindow) {
        return;
      }

      if (event.data?.type !== MEDIA_PICKER_EVENT) {
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
  return FULL_WIDTH_FIELD_PATTERN.test(fieldKey) || typeof value === 'boolean'
    ? 'admin-field admin-field--full'
    : 'admin-field';
}

function isHiddenEditorField(fieldKey) {
  return String(fieldKey).toLowerCase() === 'icon';
}

function getItemTitle(item, fallbackLabel, index) {
  if (!isPlainObject(item)) {
    return `${fallbackLabel} ${index + 1}`;
  }

  const preferred = [
    item.title,
    item.name,
    item.label,
    item.question,
    item.feature,
    item.path,
    item.href,
    item.alt,
  ].find((value) => typeof value === 'string' && value.trim());

  return preferred || `${fallbackLabel} ${index + 1}`;
}

function buildSections(pageName, content) {
  const entries = Object.entries(content ?? {});
  const layout = PAGE_LAYOUTS[pageName];

  if (!layout) {
    return [{ entries }];
  }

  const used = new Set();
  const sections = layout
    .map((section) => {
      const sectionEntries = section.fields
        .filter((field) => Object.prototype.hasOwnProperty.call(content ?? {}, field))
        .map((field) => {
          used.add(field);
          return [field, content[field]];
        });

      return { ...section, entries: sectionEntries };
    })
    .filter((section) => section.entries.length > 0);

  const extraEntries = entries.filter(([fieldKey]) => !used.has(fieldKey));

  if (extraEntries.length) {
    sections.push({ entries: extraEntries });
  }

  return sections;
}

function PrimitiveField({ fieldKey, value, path, onChange, disabled }) {
  const label = getFieldLabel(fieldKey);
  const inputValue = value ?? '';
  const required = isRequiredField(fieldKey);
  const isImageField = typeof inputValue === 'string' && IMAGE_FIELD_PATTERN.test(fieldKey);
  const isPathField = typeof inputValue === 'string' && PATH_FIELD_PATTERN.test(fieldKey);
  const previewUrl = isImageField ? resolveMediaPreviewUrl(inputValue) : '';
  const showPreview = Boolean(previewUrl);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  if (typeof value === 'boolean') {
    return (
      <div className={fieldClassName(fieldKey, value)}>
        <label className="admin-label">
          {label}
          {required ? <span className="admin-label__required">*</span> : null}
        </label>
        <div className="admin-switch">
          <span>{value ? 'Enabled' : 'Disabled'}</span>
          <input
            type="checkbox"
            checked={value}
            disabled={disabled}
            onChange={(event) => onChange(path, event.target.checked)}
          />
        </div>
      </div>
    );
  }

  if (isImageField) {
    return (
      <div className="admin-field admin-field--full">
        <label className="admin-label">
          {label}
          {required ? <span className="admin-label__required">*</span> : null}
        </label>
        <div className="admin-media">
          <div className="admin-media__canvas">
            {showPreview ? (
              <div className="admin-media__stack">
                <img className="admin-media__thumb" src={previewUrl} alt={label} />
                <div className="admin-media__actions">
                  <button
                    className="admin-media__action"
                    type="button"
                    disabled={disabled}
                    onClick={() => window.open(previewUrl, '_blank', 'noopener,noreferrer')}
                  >
                    ↗
                  </button>
                  <button
                    className="admin-media__action"
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(path, '')}
                  >
                    ✕
                  </button>
                </div>
                <div className="admin-media__filename">{getFilename(inputValue)}</div>
              </div>
            ) : (
              <div className="admin-media__empty">Upload an image to attach media.</div>
            )}
          </div>
          <div className="admin-media__source">
            <div className="admin-media__source-actions">
              <button
                className="admin-media__upload-button"
                type="button"
                disabled={disabled || uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? 'Uploading...' : 'Upload from computer'}
              </button>
              <button
                className="admin-media__upload-button"
                type="button"
                disabled={disabled || uploading}
                onClick={async () => {
                  setUploadError('');

                  try {
                    const selectedUrl = await chooseAdminLibraryImage();

                    if (selectedUrl) {
                      onChange(path, selectedUrl);
                    }
                  } catch (error) {
                    setUploadError(error?.message || 'Failed to choose image from media library.');
                  }
                }}
              >
                Choose from media library
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={async (event) => {
                  const selectedFile = event.target.files?.[0];
                  event.target.value = '';

                  if (!selectedFile) {
                    return;
                  }

                  setUploadError('');
                  setUploading(true);

                  try {
                    const uploadedUrl = await uploadAdminImage(selectedFile);
                    onChange(path, uploadedUrl);
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

  return (
    <div className={fieldClassName(fieldKey, value)}>
      <label className="admin-label">
        {label}
        {required ? <span className="admin-label__required">*</span> : null}
      </label>
      {isPathField ? (
        <select
          className="admin-input"
          value={inputValue}
          disabled={disabled}
          onChange={(event) => onChange(path, event.target.value)}
        >
          <option value="">Select destination</option>
          {getPathOptions(inputValue).map((option) => (
            <option key={option.value || 'empty'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : MULTILINE_FIELD_PATTERN.test(fieldKey) ? (
        <textarea
          className="admin-textarea"
          value={inputValue}
          disabled={disabled}
          onChange={(event) => onChange(path, parseInputValue(event.target.value, value))}
        />
      ) : (
        <input
          className="admin-input"
          type={typeof value === 'number' ? 'number' : 'text'}
          value={inputValue}
          disabled={disabled}
          onChange={(event) => onChange(path, parseInputValue(event.target.value, value))}
        />
      )}
    </div>
  );
}

function ObjectField({ fieldKey, value, path, onChange, onAddItem, onRemoveItem, onMoveItem, disabled }) {
  const entries = Object.entries(value ?? {}).filter(([nestedKey]) => nestedKey !== 'id' && !isHiddenEditorField(nestedKey));

  return (
    <div className="admin-field admin-field--full">
      <div className="admin-object">
        <h4 className="admin-object__title">{toLabel(fieldKey)}</h4>
        <div className="admin-field-grid">
          {entries.map(([nestedKey, nestedValue]) => (
            <FieldRenderer
              key={`${fieldKey}-${nestedKey}`}
              fieldKey={nestedKey}
              value={nestedValue}
              path={[...path, nestedKey]}
              onChange={onChange}
              onAddItem={onAddItem}
              onRemoveItem={onRemoveItem}
              onMoveItem={onMoveItem}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArrayField({ fieldKey, value, path, onChange, onAddItem, onRemoveItem, onMoveItem, disabled }) {
  const label = toLabel(fieldKey);
  const sample = value[0] ?? '';
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  return (
    <div className="admin-field admin-field--full">
      <label className="admin-label">{label}</label>
      <div className="admin-repeatable">
        <div className="admin-repeatable__head">
          <div>
            <div className="admin-repeatable__title">{label}</div>
            <div className="admin-repeatable__count">{value.length} entry{value.length === 1 ? '' : 'ies'}</div>
          </div>
        </div>

        {value.map((item, index) => (
          <details
            key={`${fieldKey}-${index}`}
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
                <span className="admin-repeatable__name">{getItemTitle(item, label, index)}</span>
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
              {isPlainObject(item) ? (
                <div className="admin-field-grid">
                  {Object.entries(item)
                    .filter(([nestedKey]) => nestedKey !== 'id' && !isHiddenEditorField(nestedKey))
                    .map(([nestedKey, nestedValue]) => (
                      <FieldRenderer
                        key={`${fieldKey}-${index}-${nestedKey}`}
                        fieldKey={nestedKey}
                        value={nestedValue}
                        path={[...path, index, nestedKey]}
                        onChange={onChange}
                        onAddItem={onAddItem}
                        onRemoveItem={onRemoveItem}
                        onMoveItem={onMoveItem}
                        disabled={disabled}
                      />
                    ))}
                </div>
              ) : (
                <PrimitiveField
                  fieldKey={`${fieldKey}-${index}`}
                  value={item}
                  path={[...path, index]}
                  onChange={onChange}
                  disabled={disabled}
                />
              )}
            </div>
          </details>
        ))}

        <button
          className="admin-repeatable__add"
          type="button"
          disabled={disabled}
          onClick={() => onAddItem(path, getEmptyItem(sample))}
        >
          + Add an entry
        </button>
      </div>
    </div>
  );
}

function FieldRenderer(props) {
  const { value } = props;

  if (Array.isArray(value)) {
    return <ArrayField {...props} />;
  }

  if (isPlainObject(value)) {
    return <ObjectField {...props} />;
  }

  return <PrimitiveField {...props} />;
}

function FormSection({ entries, onChange, onAddItem, onRemoveItem, onMoveItem, disabled }) {
  return (
    <div className="admin-section">
      <div className="admin-field-grid">
        {entries.map(([fieldKey, value]) => (
          isHiddenEditorField(fieldKey) ? null : (
          <FieldRenderer
            key={fieldKey}
            fieldKey={fieldKey}
            value={value}
            path={[fieldKey]}
            onChange={onChange}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            onMoveItem={onMoveItem}
            disabled={disabled}
          />
          )
        ))}
      </div>
    </div>
  );
}

export default function ContentPageEditor() {
  const { pageName } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageLabel, setPageLabel] = useState('');
  const [content, setContent] = useState({});
  const [originalContent, setOriginalContent] = useState({});
  const [publishedContent, setPublishedContent] = useState(null);
  const [activeTab, setActiveTab] = useState('draft');
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const addNotice = useNotice();
  const menuRef = useRef(null);

  const displayedContent = useMemo(
    () => (activeTab === 'published' && publishedContent ? publishedContent : content),
    [activeTab, content, publishedContent],
  );
  const isPublishedView = activeTab === 'published' && publishedContent;
  const isDirty = useMemo(
    () => JSON.stringify(toComparableValue(content)) !== JSON.stringify(toComparableValue(originalContent)),
    [content, originalContent],
  );
  const hasDraftContent = useMemo(() => hasMeaningfulValue(content), [content]);
  const hasUnpublishedChanges = useMemo(
    () => JSON.stringify(toComparableValue(content)) !== JSON.stringify(toComparableValue(publishedContent)),
    [content, publishedContent],
  );
  const canSave = !isPublishedView && !saving && isDirty;
  const canPublish = !isPublishedView && !saving && (publishedContent ? hasUnpublishedChanges : hasDraftContent);
  const canDiscard = !saving && !isPublishedView && hasDraftContent;
  const canUnpublish = !saving && Boolean(publishedContent);
  const sections = useMemo(() => buildSections(pageName, displayedContent), [pageName, displayedContent]);
  const entryTitle = useMemo(() => (
    displayedContent?.heroTitle
    || displayedContent?.title
    || displayedContent?.siteName
    || pageLabel
  ), [displayedContent, pageLabel]);

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.getPage({ pageName });

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

  const handleChange = (path, nextValue) => {
    setContent((currentValue) => updateAtPath(currentValue, path, nextValue));
  };

  const handleAddItem = (path, nextItem) => {
    setContent((currentValue) => appendAtPath(currentValue, path, nextItem));
  };

  const handleRemoveItem = (path) => {
    setContent((currentValue) => removeAtPath(currentValue, path));
  };

  const handleMoveItem = (path, offset) => {
    setContent((currentValue) => moveAtPath(currentValue, path, offset));
  };

  const handleSave = async (intent = 'save') => {
    setSaving(true);
    setError('');
    setMenuOpen(false);

    try {
      const response = await api.getPage({
        pageName,
        method: 'post',
        data: { content, intent },
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
        type: 'success',
      });
    } catch (saveError) {
      const message = toAdminErrorMessage(saveError, 'Failed to save this content page.');
      setError(message);
      addNotice({ message, type: 'error' });
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
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="admin-editor">
        <div className="admin-editor__inner">
          <button className="admin-back" type="button" onClick={() => window.history.back()}>
            ← Back
          </button>

          <div className="admin-header">
            <div>
              <div className="admin-meta">Single Type</div>
              <h1 className="admin-title">{entryTitle}</h1>
            <div className="admin-status">{publishedContent ? 'Published' : 'Draft'}</div>
          </div>
          </div>

          <div className="admin-tabs">
            <button className={`admin-tab${activeTab === 'draft' ? ' admin-tab--active' : ''}`} type="button" onClick={() => setActiveTab('draft')}>
              DRAFT
            </button>
            <button
              className={`admin-tab${activeTab === 'published' ? ' admin-tab--active' : ''}`}
              type="button"
              onClick={() => publishedContent && setActiveTab('published')}
            >
              PUBLISHED
            </button>
          </div>

          {error ? <MessageBox variant="danger">{error}</MessageBox> : null}

          <div className="admin-layout">
            <div className="admin-main-card">
              {sections.map((section, index) => (
                <FormSection
                  key={`section-${index}`}
                  entries={section.entries}
                  onChange={handleChange}
                  onAddItem={handleAddItem}
                  onRemoveItem={handleRemoveItem}
                  onMoveItem={handleMoveItem}
                  disabled={isPublishedView}
                />
              ))}
            </div>

            <aside>
              <div className="admin-side-card">
                <div className="admin-side-card__head">Entry</div>
                <div className="admin-side-card__body">
                  <div className="admin-side-button-row">
                    <button className="admin-side-button--secondary" type="button" onClick={() => handleSave('publish')} disabled={!canPublish}>
                      Publish
                    </button>
                    <button
                      className="admin-side-button--secondary admin-side-button--menu"
                      type="button"
                      onClick={() => setMenuOpen((current) => !current)}
                    >
                      …
                    </button>
                    {menuOpen ? (
                      <div ref={menuRef} className="admin-side-action-menu">
                        <button
                          className="admin-side-action-menu__item admin-side-action-menu__item--danger"
                          type="button"
                          onClick={() => handleSave('unpublish')}
                          disabled={!canUnpublish}
                        >
                          <span className="admin-side-action-menu__icon">×</span>
                          Unpublish
                        </button>
                        <button
                          className="admin-side-action-menu__item admin-side-action-menu__item--danger"
                          type="button"
                          onClick={handleDiscardChanges}
                          disabled={!canDiscard}
                        >
                          <span className="admin-side-action-menu__icon">×</span>
                          Discard changes
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <button className="admin-side-button" type="button" onClick={() => handleSave('save')} disabled={!canSave}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
