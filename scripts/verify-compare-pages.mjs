import { execFileSync } from 'node:child_process';
import process from 'node:process';

const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN || 'http://localhost:3001';
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:8081';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'client@leadenhallworks.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Client123!';
const CHROME_BIN = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const PAGE_CONFIGS = [
  { pageName: 'homepage', routes: ['/'] },
  { pageName: 'about-page', routes: ['/about'] },
  { pageName: 'blog-page', routes: ['/blog', '/blog?q=verify-miss', '/blog/building-community-workspace'] },
  { pageName: 'pricing-page', routes: ['/pricing'] },
  { pageName: 'faq-page', routes: ['/faq', '/faq?q=verify-miss'] },
  { pageName: 'meeting-rooms-page', routes: ['/meeting-rooms'] },
  { pageName: 'virtual-office-page', routes: ['/virtual-office'] },
  { pageName: 'contact-page', routes: ['/contact'] },
  { pageName: 'privacy-policy-page', routes: ['/privacy'] },
  { pageName: 'terms-page', routes: ['/terms'] },
];

function shouldIgnorePath(pathKey) {
  return /(^|\.)(icon|valueType)$/.test(pathKey);
}

const PAGE_OVERRIDES = {
  'about-page': {
    heroBackgroundImage: {
      value: 'http://localhost:3001/uploads/meeting_rooms_page_hero_background_77f5a4135a.jpeg',
      marker: 'meeting_rooms_page_hero_background_77f5a4135a.jpeg',
    },
    storyImage: {
      value: 'http://localhost:3001/uploads/homepage_about_highlight_59e4d0e792.jpeg',
      marker: 'homepage_about_highlight_59e4d0e792.jpeg',
    },
    amenitiesImage: {
      value: 'http://localhost:3001/uploads/meeting_room_focus_room_def840eebf.jpeg',
      marker: 'meeting_room_focus_room_def840eebf.jpeg',
    },
  },
};

function slugify(value) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function appendQuery(urlString, key, value) {
  try {
    const url = new URL(urlString);
    url.searchParams.set(key, value);
    return url.toString();
  } catch {
    if (urlString.startsWith('/')) {
      const separator = urlString.includes('?') ? '&' : '?';
      return `${urlString}${separator}${key}=${encodeURIComponent(value)}`;
    }

    return urlString;
  }
}

function buildTestContent(pageName, value, path = [], markers = []) {
  const pathKey = path.join('.');
  const override = PAGE_OVERRIDES[pageName]?.[pathKey];

  if (Array.isArray(value)) {
    return value.map((item, index) => buildTestContent(pageName, item, [...path, String(index)], markers));
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        buildTestContent(pageName, nestedValue, [...path, key], markers),
      ]),
    );
  }

  if (typeof value === 'string') {
    if (override) {
      markers.push({ path: pathKey, marker: override.marker });
      return override.value;
    }

    const marker = `VTEST_${slugify(pageName)}_${slugify(pathKey || 'root')}`;

    if (!shouldIgnorePath(pathKey)) {
      markers.push({ path: pathKey, marker });
    }

    if (/^https?:\/\//i.test(value)) {
      return appendQuery(value, 'vt', marker);
    }

    if (value.startsWith('/')) {
      return appendQuery(value, 'vt', marker);
    }

    return marker;
  }

  if (typeof value === 'number') {
    return value + 111;
  }

  if (typeof value === 'boolean') {
    return !value;
  }

  return value;
}

async function login() {
  const body = new URLSearchParams({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });

  const response = await fetch(`${ADMIN_ORIGIN}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    redirect: 'manual',
  });

  const cookie = response.headers.getSetCookie?.()
    ?.map((entry) => entry.split(';', 1)[0])
    .join('; ');

  if (!cookie) {
    throw new Error('Failed to log in to AdminJS compare stack.');
  }

  return cookie;
}

async function fetchWithRetry(url, options, attempts = 3) {
  let lastError;

  for (let index = 0; index < attempts; index += 1) {
    try {
      return await fetch(url, options);
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 300 * (index + 1)));
    }
  }

  throw lastError;
}

async function getAdminPage(pageName, cookie) {
  const response = await fetchWithRetry(`${ADMIN_ORIGIN}/admin/api/pages/${pageName}`, {
    headers: { Cookie: cookie },
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${pageName}: ${response.status}`);
  }

  return response.json();
}

async function publishAdminPage(pageName, cookie, content) {
  const response = await fetchWithRetry(`${ADMIN_ORIGIN}/admin/api/pages/${pageName}`, {
    method: 'POST',
    headers: {
      Cookie: cookie,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, intent: 'publish' }),
  });

  const payload = await response.json();

  if (!response.ok || payload?.notice?.type === 'error') {
    throw new Error(`Failed to publish ${pageName}: ${JSON.stringify(payload)}`);
  }

  return payload;
}

function dumpDom(url) {
  return execFileSync(
    CHROME_BIN,
    [
      '--headless=new',
      '--disable-gpu',
      '--virtual-time-budget=12000',
      '--dump-dom',
      url,
    ],
    {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    },
  );
}

async function verifyPage(pageConfig, cookie) {
  const baseline = await getAdminPage(pageConfig.pageName, cookie);
  const markers = [];
  const testContent = buildTestContent(pageConfig.pageName, baseline.draftData, [], markers);

  await publishAdminPage(pageConfig.pageName, cookie, testContent);

  const combinedDom = pageConfig.routes
    .map((route) => dumpDom(`${FRONTEND_ORIGIN}${route}`))
    .join('\n');

  const missing = markers.filter(({ marker }) => !combinedDom.includes(marker));

  await publishAdminPage(pageConfig.pageName, cookie, baseline.draftData);

  return {
    pageName: pageConfig.pageName,
    checked: markers.length,
    missing,
  };
}

async function main() {
  const cookie = await login();
  const results = [];

  for (const pageConfig of PAGE_CONFIGS) {
    // eslint-disable-next-line no-console
    console.log(`Checking ${pageConfig.pageName}...`);
    const result = await verifyPage(pageConfig, cookie);
    results.push(result);
  }

  const failures = results.filter((result) => result.missing.length > 0);

  for (const result of results) {
    // eslint-disable-next-line no-console
    console.log(
      `${result.pageName}: checked ${result.checked} markers${result.missing.length ? `, missing ${result.missing.length}` : ', all reflected'}`,
    );

    if (result.missing.length) {
      for (const item of result.missing) {
        // eslint-disable-next-line no-console
        console.log(`  - ${item.path}: ${item.marker}`);
      }
    }
  }

  if (failures.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
