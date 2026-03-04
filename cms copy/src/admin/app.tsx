import type { StrapiApp } from '@strapi/strapi/admin';
import { Flex, Tooltip } from '@strapi/design-system';
import { CheckCircle, CrossCircle } from '@strapi/icons';
import clientMark from './assets/client-mark.svg';
import { PricingPlanMeetingRoomVisibility } from './components/PricingPlanMeetingRoomVisibility';

const LIST_VIEW_HEADER_PREFIX = 'STRAPI_LIST_VIEW_DISPLAYED_HEADERS:';
const LIST_VIEW_SETTINGS_PREFIX = 'STRAPI_LIST_VIEW_SETTINGS:';
const INJECT_COLUMN_IN_TABLE = 'Admin/CM/pages/ListView/inject-column-in-table';
const ADMIN_TWEAKS_OBSERVER_KEY = '__clientFriendlyAdminTweaksObserver';
const LIST_VIEW_SETTINGS_PATCH_KEY = '__clientFriendlyListViewSettingsPatch';
const CLIENT_ROLE_STATUS_KEY = '__clientFriendlyClientRoleStatus';
const CLIENT_ROLE_REQUEST_KEY = '__clientFriendlyClientRoleRequest';
const CLIENT_ROLE_TOKEN_KEY = '__clientFriendlyClientRoleToken';
const JWT_STORAGE_KEY = 'jwtToken';
const CLIENT_ROLE_CODE = 'client-editor';
const CLIENT_ROLE_BODY_CLASS = 'client-editor-admin';
const CLIENT_ROLE_STYLE_ID = 'client-editor-admin-restrictions';
const CLIENT_DASHBOARD_LAYOUT_STATUS_KEY = '__clientFriendlyClientDashboardLayoutStatus';
const CLIENT_DASHBOARD_LAYOUT_REQUEST_KEY = '__clientFriendlyClientDashboardLayoutRequest';
const CLIENT_DASHBOARD_ALLOWED_WIDGET_UIDS = [
  'plugin::content-manager.last-edited-entries',
  'plugin::content-manager.last-published-entries',
] as const;
const FEATURED_HEADER_NAMES = ['isFeatured', 'featured'];
const FEATURED_LIST_MODELS = {
  'api::faq-item.faq-item': 'isFeatured',
  'api::meeting-room.meeting-room': 'isFeatured',
  'api::blog-post.blog-post': 'featured',
} as const;

function updateSavedListViews(
  transform: (model: string, headers: string[]) => string[],
) {
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);

    if (!key || !key.startsWith(LIST_VIEW_HEADER_PREFIX)) {
      continue;
    }

    const model = key.slice(LIST_VIEW_HEADER_PREFIX.length).split(':')[0];
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      continue;
    }

    try {
      const parsedValue = JSON.parse(rawValue);

      if (!Array.isArray(parsedValue)) {
        continue;
      }

      const normalizedHeaders = parsedValue.filter((value): value is string => typeof value === 'string');
      const nextHeaders = transform(model, normalizedHeaders);

      if (JSON.stringify(nextHeaders) === JSON.stringify(normalizedHeaders)) {
        continue;
      }

      window.localStorage.setItem(key, JSON.stringify(nextHeaders));
    } catch {
      // Ignore malformed local state and let Strapi recreate it.
    }
  }
}

function ensureFeaturedColumnInSavedListViews() {
  updateSavedListViews((model, headers) => {
    const featuredFieldName = FEATURED_LIST_MODELS[model as keyof typeof FEATURED_LIST_MODELS];

    if (!featuredFieldName || headers.includes(featuredFieldName)) {
      return headers;
    }

    return [...headers, featuredFieldName];
  });
}

function removeSlugFromSavedListViews() {
  updateSavedListViews((_model, headers) => headers.filter((header) => header !== 'slug'));
}

function removeUnusedFaqCategoryFromSavedListViews() {
  updateSavedListViews((model, headers) => (
    model === 'api::faq-item.faq-item'
      ? headers.filter((header) => header !== 'category')
      : headers
  ));
}

function isBooleanClearButton(button: HTMLButtonElement) {
  if (button.textContent?.trim() !== 'Clear') {
    return false;
  }

  let current: HTMLElement | null = button.parentElement;
  let depth = 0;

  while (current && depth < 6) {
    if (current.querySelector('input[type="checkbox"][name]')) {
      return true;
    }

    current = current.parentElement;
    depth += 1;
  }

  return false;
}

function syncBooleanFieldClearButtons() {
  const buttons = Array.from(document.querySelectorAll('button'));

  buttons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    if (isBooleanClearButton(button)) {
      button.style.display = 'none';
    }
  });
}

function syncGuidedTourMenuItems() {
  const interactiveElements = Array.from(
    document.querySelectorAll('button, a, [role="menuitem"]'),
  );

  interactiveElements.forEach((element) => {
    if (!(element instanceof HTMLElement)) {
      return;
    }

    if (element.textContent?.trim() !== 'Guided tour') {
      return;
    }

    const container = element.closest('[role="menuitem"], li, a, button, div');

    if (container instanceof HTMLElement) {
      container.style.display = 'none';
      return;
    }

    element.style.display = 'none';
  });
}

function hideGuidedTourContainer(startElement: HTMLElement) {
  let current: HTMLElement | null = startElement;
  let depth = 0;

  while (current && depth < 10) {
    const text = current.textContent ?? '';

    if (text.includes('Guided tour') && text.includes('Reset guided tour')) {
      current.style.display = 'none';
      return;
    }

    current = current.parentElement;
    depth += 1;
  }
}

function syncGuidedTourSettingsSection() {
  const buttons = Array.from(document.querySelectorAll('button'));
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

  buttons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    if (button.textContent?.trim() !== 'Reset guided tour') {
      return;
    }

    hideGuidedTourContainer(button);
  });

  headings.forEach((heading) => {
    if (!(heading instanceof HTMLElement)) {
      return;
    }

    if (heading.textContent?.trim() !== 'Guided tour') {
      return;
    }

    hideGuidedTourContainer(heading);
  });
}

function getAdminBasePath() {
  const pathname = window.location.pathname;
  const adminIndex = pathname.indexOf('/admin');

  if (adminIndex >= 0) {
    return pathname.slice(0, adminIndex + '/admin'.length);
  }

  return '/admin';
}

function getCookieValue(name: string) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));

  return match ? decodeURIComponent(match[1]) : null;
}

function getStoredAdminToken() {
  const fromLocalStorage = window.localStorage.getItem(JWT_STORAGE_KEY);

  if (fromLocalStorage) {
    try {
      const parsedValue = JSON.parse(fromLocalStorage);

      if (typeof parsedValue === 'string' && parsedValue) {
        return parsedValue;
      }
    } catch {
      if (fromLocalStorage) {
        return fromLocalStorage;
      }
    }
  }

  return getCookieValue(JWT_STORAGE_KEY);
}

function isRestrictedClientNavigationHref(href: string) {
  return href.includes('/settings')
    || href.endsWith('settings')
    || href.includes('/plugins/cloud')
    || href.endsWith('plugins/cloud')
    || href === 'plugins/cloud';
}

async function resolveIsClientEditor() {
  const globalWindow = window as Window & {
    [CLIENT_ROLE_STATUS_KEY]?: boolean;
    [CLIENT_ROLE_REQUEST_KEY]?: Promise<boolean>;
    [CLIENT_ROLE_TOKEN_KEY]?: string | null;
  };
  const token = getStoredAdminToken();

  if (globalWindow[CLIENT_ROLE_TOKEN_KEY] !== token) {
    globalWindow[CLIENT_ROLE_TOKEN_KEY] = token;
    delete globalWindow[CLIENT_ROLE_STATUS_KEY];
    delete globalWindow[CLIENT_ROLE_REQUEST_KEY];
  }

  if (typeof globalWindow[CLIENT_ROLE_STATUS_KEY] === 'boolean') {
    return globalWindow[CLIENT_ROLE_STATUS_KEY] as boolean;
  }

  if (globalWindow[CLIENT_ROLE_REQUEST_KEY]) {
    return globalWindow[CLIENT_ROLE_REQUEST_KEY] as Promise<boolean>;
  }

  if (!token) {
    globalWindow[CLIENT_ROLE_STATUS_KEY] = false;
    return false;
  }

  const request = window.fetch(`${getAdminBasePath()}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (!response.ok) {
      return false;
    }

    const payload = await response.json() as {
      data?: {
        roles?: Array<{ code?: string }>;
      };
    };
    const isClientEditor = Boolean(
      payload.data?.roles?.some((role) => role.code === CLIENT_ROLE_CODE),
    );

    globalWindow[CLIENT_ROLE_STATUS_KEY] = isClientEditor;
    return isClientEditor;
  }).catch(() => false).finally(() => {
    delete globalWindow[CLIENT_ROLE_REQUEST_KEY];
  });

  globalWindow[CLIENT_ROLE_REQUEST_KEY] = request;
  return request;
}

function ensureClientRestrictionStyles() {
  if (document.getElementById(CLIENT_ROLE_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = CLIENT_ROLE_STYLE_ID;
  style.textContent = `
    body.${CLIENT_ROLE_BODY_CLASS} li:has(> a[href*="/settings"]),
    body.${CLIENT_ROLE_BODY_CLASS} li:has(> a[href$="settings"]),
    body.${CLIENT_ROLE_BODY_CLASS} li:has(> a[href*="/plugins/cloud"]),
    body.${CLIENT_ROLE_BODY_CLASS} li:has(> a[href$="plugins/cloud"]),
    body.${CLIENT_ROLE_BODY_CLASS} a[href*="/settings"],
    body.${CLIENT_ROLE_BODY_CLASS} a[href$="settings"],
    body.${CLIENT_ROLE_BODY_CLASS} a[href*="/plugins/cloud"],
    body.${CLIENT_ROLE_BODY_CLASS} a[href$="plugins/cloud"] {
      display: none !important;
    }

    body.${CLIENT_ROLE_BODY_CLASS} [data-strapi-widget-id] button {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

function hideRestrictedClientNavigation() {
  document.body.classList.add(CLIENT_ROLE_BODY_CLASS);

  if (
    !window.location.pathname.includes('/settings')
    && !window.location.pathname.includes('/plugins/cloud')
  ) {
    return;
  }

  window.location.replace(`${getAdminBasePath()}/`);
}

function showRestrictedClientNavigationForNonClient() {
  document.body.classList.remove(CLIENT_ROLE_BODY_CLASS);
}

function isAdminHomepagePath() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '');
  const normalizedBasePath = getAdminBasePath().replace(/\/+$/, '');

  return normalizedPath === normalizedBasePath;
}

function hasExpectedClientDashboardLayout(data: unknown) {
  if (!data || typeof data !== 'object' || !('widgets' in data)) {
    return false;
  }

  const widgets = Array.isArray((data as { widgets?: unknown[] }).widgets)
    ? (data as { widgets: unknown[] }).widgets
    : [];

  if (widgets.length !== CLIENT_DASHBOARD_ALLOWED_WIDGET_UIDS.length) {
    return false;
  }

  return CLIENT_DASHBOARD_ALLOWED_WIDGET_UIDS.every((uid, index) => {
    const widget = widgets[index];

    if (!widget || typeof widget !== 'object' || !('uid' in widget)) {
      return false;
    }

    return (widget as { uid?: string }).uid === uid;
  });
}

async function syncClientDashboardLayout() {
  const globalWindow = window as Window & {
    [CLIENT_DASHBOARD_LAYOUT_STATUS_KEY]?: string;
    [CLIENT_DASHBOARD_LAYOUT_REQUEST_KEY]?: Promise<void>;
  };
  const token = getStoredAdminToken();

  if (!token || !isAdminHomepagePath()) {
    return;
  }

  const syncKey = `${token}:${CLIENT_DASHBOARD_ALLOWED_WIDGET_UIDS.join(',')}`;

  if (globalWindow[CLIENT_DASHBOARD_LAYOUT_STATUS_KEY] === syncKey) {
    return;
  }

  if (globalWindow[CLIENT_DASHBOARD_LAYOUT_REQUEST_KEY]) {
    return globalWindow[CLIENT_DASHBOARD_LAYOUT_REQUEST_KEY];
  }

  const desiredLayout = {
    widgets: CLIENT_DASHBOARD_ALLOWED_WIDGET_UIDS.map((uid) => ({
      uid,
      width: 6,
    })),
  };

  const request = window.fetch(`${getAdminBasePath()}/homepage/layout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (!response.ok) {
      return;
    }

    const payload = await response.json() as { data?: unknown };

    if (hasExpectedClientDashboardLayout(payload.data)) {
      globalWindow[CLIENT_DASHBOARD_LAYOUT_STATUS_KEY] = syncKey;
      return;
    }

    const updateResponse = await window.fetch(`${getAdminBasePath()}/homepage/layout`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(desiredLayout),
    });

    if (updateResponse.ok) {
      globalWindow[CLIENT_DASHBOARD_LAYOUT_STATUS_KEY] = syncKey;
    }
  }).catch(() => undefined).finally(() => {
    delete globalWindow[CLIENT_DASHBOARD_LAYOUT_REQUEST_KEY];
  });

  globalWindow[CLIENT_DASHBOARD_LAYOUT_REQUEST_KEY] = request;
  return request;
}

function syncClientOnlyAdminRestrictions() {
  void resolveIsClientEditor().then((isClientEditor) => {
    if (isClientEditor) {
      hideRestrictedClientNavigation();
      void syncClientDashboardLayout();
      return;
    }

    showRestrictedClientNavigationForNonClient();
  });
}

function installClientFriendlyAdminTweaks() {
  const globalWindow = window as Window & {
    [ADMIN_TWEAKS_OBSERVER_KEY]?: MutationObserver;
  };

  if (globalWindow[ADMIN_TWEAKS_OBSERVER_KEY]) {
    return;
  }

  ensureClientRestrictionStyles();

  let frameId = 0;
  const scheduleSync = () => {
    window.cancelAnimationFrame(frameId);
    frameId = window.requestAnimationFrame(() => {
      syncBooleanFieldClearButtons();
      syncGuidedTourMenuItems();
      syncGuidedTourSettingsSection();
      syncClientOnlyAdminRestrictions();
    });
  };

  const observer = new MutationObserver(() => {
    scheduleSync();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  globalWindow[ADMIN_TWEAKS_OBSERVER_KEY] = observer;
  scheduleSync();
}

function stripFiltersFromSavedListViewSettings(rawValue: string) {
  let parsedValue: Record<string, unknown>;

  try {
    parsedValue = JSON.parse(rawValue) as Record<string, unknown>;
  } catch {
    return rawValue;
  }

  if (!('filters' in parsedValue)) {
    return rawValue;
  }

  const { filters: _filters, ...nextValue } = parsedValue;
  return JSON.stringify(nextValue);
}

function installListViewSettingsPersistencePatch() {
  const globalWindow = window as Window & {
    [LIST_VIEW_SETTINGS_PATCH_KEY]?: boolean;
  };

  if (globalWindow[LIST_VIEW_SETTINGS_PATCH_KEY]) {
    return;
  }

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);

    if (!key || !key.startsWith(LIST_VIEW_SETTINGS_PREFIX)) {
      continue;
    }

    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      continue;
    }

    const nextValue = stripFiltersFromSavedListViewSettings(rawValue);

    if (nextValue === rawValue) {
      continue;
    }

    if (nextValue === '{}') {
      window.localStorage.removeItem(key);
      continue;
    }

    window.localStorage.setItem(key, nextValue);
  }

  const originalSetItem = window.localStorage.setItem.bind(window.localStorage);

  window.localStorage.setItem = ((key: string, value: string) => {
    if (!key.startsWith(LIST_VIEW_SETTINGS_PREFIX)) {
      originalSetItem(key, value);
      return;
    }

    const nextValue = stripFiltersFromSavedListViewSettings(value);

    if (nextValue === '{}') {
      window.localStorage.removeItem(key);
      return;
    }

    originalSetItem(key, nextValue);
  }) as Storage['setItem'];

  globalWindow[LIST_VIEW_SETTINGS_PATCH_KEY] = true;
}

export default {
  config: {
    auth: {
      logo: clientMark,
    },
    locales: ['en'],
    menu: {
      logo: clientMark,
    },
    tutorials: false,
    notifications: {
      releases: false,
    },
  },
  bootstrap(app: Pick<StrapiApp, 'registerHook'>) {
    installClientFriendlyAdminTweaks();
    installListViewSettingsPersistencePatch();

    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: 'pricing-plan-meeting-room-visibility',
      Component: PricingPlanMeetingRoomVisibility,
    });

    removeUnusedFaqCategoryFromSavedListViews();
    removeSlugFromSavedListViews();
    ensureFeaturedColumnInSavedListViews();

    app.registerHook(INJECT_COLUMN_IN_TABLE, ({ displayedHeaders }) => ({
      displayedHeaders: displayedHeaders.map((header: Record<string, unknown>) => {
        if (!FEATURED_HEADER_NAMES.includes(String(header.name))) {
          return header;
        }

        return {
          ...header,
          cellFormatter: (row: Record<string, unknown>, currentHeader: Record<string, unknown>) => {
            const value = row[String(currentHeader.name)];
            const isEnabled = value === true;
            const Icon = isEnabled ? CheckCircle : CrossCircle;
            const iconColor = isEnabled ? 'success600' : 'danger600';
            const tooltipLabel = isEnabled ? 'Enabled' : 'Disabled';

            return (
              <Tooltip label={tooltipLabel}>
                <Flex justifyContent="center">
                  <Icon fill={iconColor} width="1rem" height="1rem" />
                </Flex>
              </Tooltip>
            );
          },
        };
      }),
    }));
  },
};
