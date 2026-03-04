import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { ApiClient, useNotice } from 'adminjs';
import { Loader, MessageBox } from '@adminjs/design-system';

const api = new ApiClient();

const MULTILINE_FIELD_PATTERN = /(description|content|message|body|subtitle|excerpt|intro|hours|address|text|paragraph|overview|challenge|result)/i;
const IMAGE_FIELD_PATTERN = /(image|background|logo|thumbnail|featured)/i;
const FULL_WIDTH_FIELD_PATTERN = /(description|content|message|body|subtitle|excerpt|intro|overview|challenge|result|background|image|gallery|sections|testimonials|services|whyChooseItems|featureChips|socialLinks|faqItems|comparisonRows|comparisonColumns|storyParagraphs|relatedWorkspaces|challengeItems|amenities|navigation|footer|form)/i;
const IMAGE_URL_PATTERN = /^https?:\/\/.+/i;
const REQUIRED_FIELD_PATTERN = /(heroTitle|heroSubtitle|storyTitle|whyChooseTitle|amenitiesTitle|title)$/i;

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
  'terms-page': '/terms',
};

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
  return FULL_WIDTH_FIELD_PATTERN.test(fieldKey) || typeof value === 'boolean'
    ? 'strapi-field strapi-field--full'
    : 'strapi-field';
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
  const label = toLabel(fieldKey);
  const inputValue = value ?? '';
  const required = isRequiredField(fieldKey);
  const isImageField = typeof inputValue === 'string' && IMAGE_FIELD_PATTERN.test(fieldKey);
  const showPreview = isImageField && IMAGE_URL_PATTERN.test(inputValue);

  if (typeof value === 'boolean') {
    return (
      <div className={fieldClassName(fieldKey, value)}>
        <label className="strapi-label">
          {label}
          {required ? <span className="strapi-label__required">*</span> : null}
        </label>
        <div className="strapi-switch">
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
      <div className="strapi-field strapi-field--full">
        <label className="strapi-label">
          {label}
          {required ? <span className="strapi-label__required">*</span> : null}
        </label>
        <div className="strapi-media">
          <div className="strapi-media__canvas">
            {showPreview ? (
              <div className="strapi-media__stack">
                <img className="strapi-media__thumb" src={inputValue} alt={label} />
                <div className="strapi-media__actions">
                  <button
                    className="strapi-media__action"
                    type="button"
                    disabled={disabled}
                    onClick={() => window.open(inputValue, '_blank', 'noopener,noreferrer')}
                  >
                    ↗
                  </button>
                  <button
                    className="strapi-media__action"
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      const nextValue = window.prompt(`Update ${label} URL`, inputValue);
                      if (nextValue !== null) {
                        onChange(path, nextValue);
                      }
                    }}
                  >
                    ✎
                  </button>
                  <button
                    className="strapi-media__action"
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(path, '')}
                  >
                    ✕
                  </button>
                </div>
                <div className="strapi-media__filename">{getFilename(inputValue)}</div>
              </div>
            ) : (
              <div className="strapi-media__empty">Paste an image URL below to attach media.</div>
            )}
          </div>
          <div className="strapi-media__source">
            <input
              className="strapi-input"
              type="text"
              value={inputValue}
              disabled={disabled}
              onChange={(event) => onChange(path, event.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={fieldClassName(fieldKey, value)}>
      <label className="strapi-label">
        {label}
        {required ? <span className="strapi-label__required">*</span> : null}
      </label>
      {MULTILINE_FIELD_PATTERN.test(fieldKey) ? (
        <textarea
          className="strapi-textarea"
          value={inputValue}
          disabled={disabled}
          onChange={(event) => onChange(path, parseInputValue(event.target.value, value))}
        />
      ) : (
        <input
          className="strapi-input"
          type={typeof value === 'number' ? 'number' : 'text'}
          value={inputValue}
          disabled={disabled}
          onChange={(event) => onChange(path, parseInputValue(event.target.value, value))}
        />
      )}
    </div>
  );
}

function ObjectField({ fieldKey, value, path, onChange, onAddItem, onRemoveItem, disabled }) {
  const entries = Object.entries(value ?? {}).filter(([nestedKey]) => nestedKey !== 'id');

  return (
    <div className="strapi-field strapi-field--full">
      <div className="strapi-object">
        <h4 className="strapi-object__title">{toLabel(fieldKey)}</h4>
        <div className="strapi-field-grid">
          {entries.map(([nestedKey, nestedValue]) => (
            <FieldRenderer
              key={`${fieldKey}-${nestedKey}`}
              fieldKey={nestedKey}
              value={nestedValue}
              path={[...path, nestedKey]}
              onChange={onChange}
              onAddItem={onAddItem}
              onRemoveItem={onRemoveItem}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArrayField({ fieldKey, value, path, onChange, onAddItem, onRemoveItem, disabled }) {
  const label = toLabel(fieldKey);
  const sample = value[0] ?? '';

  return (
    <div className="strapi-field strapi-field--full">
      <label className="strapi-label">{label}</label>
      <div className="strapi-repeatable">
        <div className="strapi-repeatable__head">
          <div>
            <div className="strapi-repeatable__title">{label}</div>
            <div className="strapi-repeatable__count">{value.length} entry{value.length === 1 ? '' : 'ies'}</div>
          </div>
        </div>

        {value.map((item, index) => (
          <details key={`${fieldKey}-${index}`} className="strapi-repeatable__item" open={index === 0}>
            <summary className="strapi-repeatable__summary">
              <div className="strapi-repeatable__summary-left">
                <span className="strapi-repeatable__bullet">▼</span>
                <span className="strapi-repeatable__name">{getItemTitle(item, label, index)}</span>
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
              {isPlainObject(item) ? (
                <div className="strapi-field-grid">
                  {Object.entries(item)
                    .filter(([nestedKey]) => nestedKey !== 'id')
                    .map(([nestedKey, nestedValue]) => (
                      <FieldRenderer
                        key={`${fieldKey}-${index}-${nestedKey}`}
                        fieldKey={nestedKey}
                        value={nestedValue}
                        path={[...path, index, nestedKey]}
                        onChange={onChange}
                        onAddItem={onAddItem}
                        onRemoveItem={onRemoveItem}
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
          className="strapi-repeatable__add"
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

function FormSection({ entries, onChange, onAddItem, onRemoveItem, disabled }) {
  return (
    <div className="strapi-section">
      <div className="strapi-field-grid">
        {entries.map(([fieldKey, value]) => (
          <FieldRenderer
            key={fieldKey}
            fieldKey={fieldKey}
            value={value}
            path={[fieldKey]}
            onChange={onChange}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            disabled={disabled}
          />
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
  const canSave = !isPublishedView && !saving && isDirty;
  const canPublish = !isPublishedView && !saving && (publishedContent ? isDirty : hasDraftContent);
  const canDiscard = !saving && !isPublishedView && hasDraftContent;
  const canUnpublish = !saving && Boolean(publishedContent);
  const sections = useMemo(() => buildSections(pageName, displayedContent), [pageName, displayedContent]);
  const previewUrl = PREVIEW_PATHS[pageName] ? `http://localhost:8080${PREVIEW_PATHS[pageName]}` : null;
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
      const message = saveError?.response?.data?.message ?? 'Failed to save this content page.';
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
      <div className="strapi-editor">
        <div className="strapi-editor__inner">
          <button className="strapi-back" type="button" onClick={() => window.history.back()}>
            ← Back
          </button>

          <div className="strapi-header">
            <div>
              <div className="strapi-meta">Single Type</div>
              <h1 className="strapi-title">{entryTitle}</h1>
            <div className="strapi-status">{publishedContent ? 'Published' : 'Draft'}</div>
          </div>

            <button className="strapi-kebab" type="button">…</button>
          </div>

          <div className="strapi-tabs">
            <button className={`strapi-tab${activeTab === 'draft' ? ' strapi-tab--active' : ''}`} type="button" onClick={() => setActiveTab('draft')}>
              DRAFT
            </button>
            <button
              className={`strapi-tab${activeTab === 'published' ? ' strapi-tab--active' : ''}`}
              type="button"
              onClick={() => publishedContent && setActiveTab('published')}
            >
              PUBLISHED
            </button>
          </div>

          {error ? <MessageBox variant="danger">{error}</MessageBox> : null}

          <div className="strapi-layout">
            <div className="strapi-main-card">
              {sections.map((section, index) => (
                <FormSection
                  key={`section-${index}`}
                  entries={section.entries}
                  onChange={handleChange}
                  onAddItem={handleAddItem}
                  onRemoveItem={handleRemoveItem}
                  disabled={isPublishedView}
                />
              ))}
            </div>

            <aside>
              <div className="strapi-side-card">
                <div className="strapi-side-card__head">Entry</div>
                <div className="strapi-side-card__body">
                  <div className="strapi-side-button-row">
                    <button className="strapi-side-button--secondary" type="button" onClick={() => handleSave('publish')} disabled={!canPublish}>
                      Publish
                    </button>
                    <button
                      className="strapi-side-button--secondary strapi-side-button--menu"
                      type="button"
                      onClick={() => setMenuOpen((current) => !current)}
                    >
                      …
                    </button>
                    {menuOpen ? (
                      <div ref={menuRef} className="strapi-side-action-menu">
                        <button
                          className="strapi-side-action-menu__item strapi-side-action-menu__item--danger"
                          type="button"
                          onClick={() => handleSave('unpublish')}
                          disabled={!canUnpublish}
                        >
                          <span className="strapi-side-action-menu__icon">×</span>
                          Unpublish
                        </button>
                        <button
                          className="strapi-side-action-menu__item strapi-side-action-menu__item--danger"
                          type="button"
                          onClick={handleDiscardChanges}
                          disabled={!canDiscard}
                        >
                          <span className="strapi-side-action-menu__icon">×</span>
                          Discard changes
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <button className="strapi-side-button" type="button" onClick={() => handleSave('save')} disabled={!canSave}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>

              <div className="strapi-side-card">
                <div className="strapi-side-card__head">Preview</div>
                <div className="strapi-side-card__body">
                  <button
                    className="strapi-side-button--secondary strapi-side-button--preview"
                    type="button"
                    onClick={() => previewUrl && window.open(previewUrl, '_blank', 'noopener,noreferrer')}
                    disabled={!previewUrl}
                  >
                    Open preview
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
