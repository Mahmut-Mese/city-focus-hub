import { execFileSync } from 'node:child_process';
import process from 'node:process';

const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN || 'http://localhost:3001';
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:8081';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'client@leadenhallworks.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Client123!';
const CHROME_BIN = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const FIXED_MEDIA = {
  blogCover: 'http://localhost:3001/uploads/blog_post_building_community_workspace_cover_1bac76cf2f.jpeg',
  blogContent1: 'http://localhost:3001/uploads/blog_post_flexible_workspaces_productivity_content_1_462e221efa.jpeg',
  blogContent2: 'http://localhost:3001/uploads/blog_post_flexible_workspaces_productivity_content_2_e6b05d8a4e.jpeg',
  roomImage: 'http://localhost:3001/uploads/meeting_room_focus_room_def840eebf.jpeg',
};

const COLLECTION_CASES = [
  {
    pageName: 'blog-posts',
    label: 'blog post',
    makeCreatePayload: (marker) => ({
      title: `BLOG CRUD TITLE ${marker}`,
      slug: `blog-crud-${marker.toLowerCase()}`,
      excerpt: `BLOG CRUD EXCERPT ${marker}`,
      content: `BLOG CRUD CONTENT ${marker}`,
      contentImages: [FIXED_MEDIA.blogContent1, FIXED_MEDIA.blogContent2],
      proTipTitle: `BLOG CRUD PRO TIP ${marker}`,
      proTipText: `BLOG CRUD PRO TIP TEXT ${marker}`,
      category: `BLOG CRUD CATEGORY ${marker}`,
      publishedDate: '2026-03-04',
      readTime: `BLOG CRUD READ ${marker}`,
      author: `BLOG CRUD AUTHOR ${marker}`,
      tags: [{ text: `BLOG CRUD TAG ${marker}` }],
      featured: true,
      coverImage: FIXED_MEDIA.blogCover,
    }),
    makeUpdatePayload: (marker, current) => ({
      ...current,
      title: `BLOG CRUD TITLE ${marker}`,
      slug: current.slug,
      excerpt: `BLOG CRUD EXCERPT ${marker}`,
      content: `BLOG CRUD CONTENT ${marker}`,
      proTipTitle: `BLOG CRUD PRO TIP ${marker}`,
      proTipText: `BLOG CRUD PRO TIP TEXT ${marker}`,
      category: `BLOG CRUD CATEGORY ${marker}`,
      readTime: `BLOG CRUD READ ${marker}`,
      author: `BLOG CRUD AUTHOR ${marker}`,
      tags: [{ text: `BLOG CRUD TAG ${marker}` }],
      featured: true,
      coverImage: FIXED_MEDIA.blogCover,
      contentImages: [FIXED_MEDIA.blogContent2, FIXED_MEDIA.blogContent1],
    }),
    verifyCreate: ({ marker, slug }) => [
      {
        url: `${FRONTEND_ORIGIN}/blog?q=${encodeURIComponent(marker)}`,
        includes: [
          `BLOG CRUD TITLE ${marker}`,
          `BLOG CRUD EXCERPT ${marker}`,
        ],
      },
      {
        url: `${FRONTEND_ORIGIN}/blog/${slug}`,
        includes: [
          `BLOG CRUD TITLE ${marker}`,
          `BLOG CRUD EXCERPT ${marker}`,
          `BLOG CRUD PRO TIP ${marker}`,
          `BLOG CRUD PRO TIP TEXT ${marker}`,
          `BLOG CRUD TAG ${marker}`,
          `BLOG CRUD AUTHOR ${marker}`,
        ],
      },
    ],
    verifyUpdate: ({ marker, slug, previousMarker }) => [
      {
        url: `${FRONTEND_ORIGIN}/blog?q=${encodeURIComponent(marker)}`,
        includes: [`BLOG CRUD TITLE ${marker}`],
        excludes: [`BLOG CRUD TITLE ${previousMarker}`],
      },
      {
        url: `${FRONTEND_ORIGIN}/blog/${slug}`,
        includes: [
          `BLOG CRUD TITLE ${marker}`,
          `BLOG CRUD EXCERPT ${marker}`,
          `BLOG CRUD PRO TIP ${marker}`,
          `BLOG CRUD PRO TIP TEXT ${marker}`,
          `BLOG CRUD TAG ${marker}`,
          `BLOG CRUD AUTHOR ${marker}`,
        ],
        excludes: [
          `BLOG CRUD TITLE ${previousMarker}`,
          `BLOG CRUD EXCERPT ${previousMarker}`,
        ],
      },
    ],
    verifyDelete: ({ marker, slug }) => [
      {
        url: `${FRONTEND_ORIGIN}/blog?q=${encodeURIComponent(marker)}`,
        excludes: [`BLOG CRUD TITLE ${marker}`],
      },
      {
        url: `${ADMIN_ORIGIN}/api/blog-posts?filters[$or][0][slug][$eq]=${encodeURIComponent(slug)}&filters[$or][1][documentId][$eq]=${encodeURIComponent(slug)}`,
        raw: true,
        excludes: [`BLOG CRUD TITLE ${marker}`],
      },
    ],
  },
  {
    pageName: 'faq-items',
    label: 'faq item',
    makeCreatePayload: (marker) => ({
      question: `FAQ CRUD QUESTION ${marker}`,
      answer: `FAQ CRUD ANSWER ${marker}`,
      sortOrder: 999,
      isFeatured: true,
    }),
    makeUpdatePayload: (marker, current) => ({
      ...current,
      question: `FAQ CRUD QUESTION ${marker}`,
      answer: `FAQ CRUD ANSWER ${marker}`,
      sortOrder: current.sortOrder,
      isFeatured: true,
    }),
    verifyCreate: ({ marker }) => [
      {
        url: `${FRONTEND_ORIGIN}/faq?q=${encodeURIComponent(marker)}`,
        includes: [
          `FAQ CRUD QUESTION ${marker}`,
          `FAQ CRUD ANSWER ${marker}`,
        ],
      },
    ],
    verifyUpdate: ({ marker, previousMarker }) => [
      {
        url: `${FRONTEND_ORIGIN}/faq?q=${encodeURIComponent(marker)}`,
        includes: [
          `FAQ CRUD QUESTION ${marker}`,
          `FAQ CRUD ANSWER ${marker}`,
        ],
        excludes: [
          `FAQ CRUD QUESTION ${previousMarker}`,
          `FAQ CRUD ANSWER ${previousMarker}`,
        ],
      },
    ],
    verifyDelete: ({ marker }) => [
      {
        url: `${FRONTEND_ORIGIN}/faq?q=${encodeURIComponent(marker)}`,
        excludes: [`FAQ CRUD QUESTION ${marker}`],
      },
    ],
  },
  {
    pageName: 'meeting-rooms',
    label: 'meeting room',
    makeCreatePayload: (marker) => ({
      name: `ROOM CRUD NAME ${marker}`,
      slug: `room-crud-${marker.toLowerCase()}`,
      description: `ROOM CRUD DESCRIPTION ${marker}`,
      capacity: 42,
      sortOrder: 999,
      isFeatured: true,
      features: [{ text: `ROOM CRUD FEATURE ${marker}` }],
      badges: [{ text: `ROOM CRUD BADGE ${marker}` }],
      image: FIXED_MEDIA.roomImage,
    }),
    makeUpdatePayload: (marker, current) => ({
      ...current,
      name: `ROOM CRUD NAME ${marker}`,
      slug: current.slug,
      description: `ROOM CRUD DESCRIPTION ${marker}`,
      capacity: 64,
      sortOrder: current.sortOrder,
      isFeatured: true,
      features: [{ text: `ROOM CRUD FEATURE ${marker}` }],
      badges: [{ text: `ROOM CRUD BADGE ${marker}` }],
      image: FIXED_MEDIA.roomImage,
    }),
    verifyCreate: ({ marker }) => [
      {
        url: `${FRONTEND_ORIGIN}/meeting-rooms`,
        includes: [
          `ROOM CRUD NAME ${marker}`,
          `ROOM CRUD DESCRIPTION ${marker}`,
          `ROOM CRUD FEATURE ${marker}`,
          `ROOM CRUD BADGE ${marker}`,
        ],
      },
    ],
    verifyUpdate: ({ marker, previousMarker }) => [
      {
        url: `${FRONTEND_ORIGIN}/meeting-rooms`,
        includes: [
          `ROOM CRUD NAME ${marker}`,
          `ROOM CRUD DESCRIPTION ${marker}`,
          `ROOM CRUD FEATURE ${marker}`,
          `ROOM CRUD BADGE ${marker}`,
        ],
        excludes: [
          `ROOM CRUD NAME ${previousMarker}`,
          `ROOM CRUD DESCRIPTION ${previousMarker}`,
        ],
      },
    ],
    verifyDelete: ({ marker }) => [
      {
        url: `${FRONTEND_ORIGIN}/meeting-rooms`,
        excludes: [`ROOM CRUD NAME ${marker}`],
      },
    ],
  },
  {
    pageName: 'pricing-plans',
    label: 'pricing plan',
    variants: [
      {
        key: 'coworking',
        makeCreatePayload: (marker) => ({
          name: `PLAN CRUD NAME ${marker}`,
          slug: `plan-crud-${marker.toLowerCase()}`,
          planType: 'coworking',
          price: 321,
          period: `PLAN CRUD PERIOD ${marker}`,
          description: `PLAN CRUD DESCRIPTION ${marker}`,
          features: [{ text: `PLAN CRUD FEATURE ${marker}` }],
          isPopular: true,
          sortOrder: 999,
        }),
        makeUpdatePayload: (marker, current) => ({
          ...current,
          name: `PLAN CRUD NAME ${marker}`,
          slug: current.slug,
          planType: 'coworking',
          price: 654,
          period: `PLAN CRUD PERIOD ${marker}`,
          description: `PLAN CRUD DESCRIPTION ${marker}`,
          features: [{ text: `PLAN CRUD FEATURE ${marker}` }],
          isPopular: true,
          sortOrder: current.sortOrder,
        }),
        verifyCreate: ({ marker }) => [{
          url: `${FRONTEND_ORIGIN}/pricing`,
          includes: [
            `PLAN CRUD NAME ${marker}`,
            `PLAN CRUD DESCRIPTION ${marker}`,
            `PLAN CRUD FEATURE ${marker}`,
            `$321`,
          ],
        }],
        verifyUpdate: ({ marker, previousMarker }) => [{
          url: `${FRONTEND_ORIGIN}/pricing`,
          includes: [
            `PLAN CRUD NAME ${marker}`,
            `PLAN CRUD DESCRIPTION ${marker}`,
            `PLAN CRUD FEATURE ${marker}`,
            `$654`,
          ],
          excludes: [
            `PLAN CRUD NAME ${previousMarker}`,
            `PLAN CRUD DESCRIPTION ${previousMarker}`,
          ],
        }],
        verifyDelete: ({ marker }) => [{
          url: `${FRONTEND_ORIGIN}/pricing`,
          excludes: [`PLAN CRUD NAME ${marker}`],
        }],
      },
      {
        key: 'meeting-room',
        makeCreatePayload: (marker) => ({
          name: `ROOM PLAN CRUD NAME ${marker}`,
          slug: `room-plan-crud-${marker.toLowerCase()}`,
          planType: 'meeting-room',
          price: 777,
          period: `ROOM PLAN PERIOD ${marker}`,
          description: `ROOM PLAN DESCRIPTION ${marker}`,
          features: [{ text: `ROOM PLAN FEATURE ${marker}` }],
          isPopular: true,
          sortOrder: 999,
        }),
        makeUpdatePayload: (marker, current) => ({
          ...current,
          name: `ROOM PLAN CRUD NAME ${marker}`,
          slug: current.slug,
          planType: 'meeting-room',
          price: 888,
          period: `ROOM PLAN PERIOD ${marker}`,
          description: `ROOM PLAN DESCRIPTION ${marker}`,
          features: [{ text: `ROOM PLAN FEATURE ${marker}` }],
          isPopular: true,
          sortOrder: current.sortOrder,
        }),
        verifyCreate: ({ marker }) => [{
          url: `${FRONTEND_ORIGIN}/meeting-rooms`,
          includes: [
            `ROOM PLAN CRUD NAME ${marker}`,
            `£777`,
          ],
        }],
        verifyUpdate: ({ marker, previousMarker }) => [{
          url: `${FRONTEND_ORIGIN}/meeting-rooms`,
          includes: [
            `ROOM PLAN CRUD NAME ${marker}`,
            `£888`,
          ],
          excludes: [
            `ROOM PLAN CRUD NAME ${previousMarker}`,
          ],
        }],
        verifyDelete: ({ marker }) => [{
          url: `${FRONTEND_ORIGIN}/meeting-rooms`,
          excludes: [`ROOM PLAN CRUD NAME ${marker}`],
        }],
      },
    ],
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options, attempts = 3) {
  let lastError;
  for (let index = 0; index < attempts; index += 1) {
    try {
      return await fetch(url, options);
    } catch (error) {
      lastError = error;
      await sleep(300 * (index + 1));
    }
  }
  throw lastError;
}

async function login() {
  const body = new URLSearchParams({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
  const response = await fetch(`${ADMIN_ORIGIN}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    redirect: 'manual',
  });
  const cookie = response.headers.getSetCookie?.().map((entry) => entry.split(';', 1)[0]).join('; ');
  if (!cookie) {
    throw new Error('Failed to log in to AdminJS compare stack.');
  }
  return cookie;
}

async function requestAdminCollection(pageName, cookie, body, query = '') {
  const response = await fetchWithRetry(`${ADMIN_ORIGIN}/admin/api/pages/${pageName}${query}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Cookie: cookie,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const rawText = await response.text();
  let payload;
  try {
    payload = JSON.parse(rawText);
  } catch {
    throw new Error(`Collection request for ${pageName} returned non-JSON (${response.status}): ${rawText.slice(0, 240)}`);
  }
  if (!response.ok) {
    throw new Error(`Collection request failed for ${pageName}: ${JSON.stringify(payload)}`);
  }
  return payload;
}

function dumpDom(url) {
  return execFileSync(
    CHROME_BIN,
    ['--headless=new', '--disable-gpu', '--virtual-time-budget=12000', '--dump-dom', url],
    { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 },
  );
}

function assertDomChecks(dom, checks, context) {
  for (const expected of checks.includes ?? []) {
    if (!dom.includes(expected)) {
      throw new Error(`${context}: missing "${expected}"`);
    }
  }
  for (const unexpected of checks.excludes ?? []) {
    if (dom.includes(unexpected)) {
      throw new Error(`${context}: unexpected "${unexpected}" still present`);
    }
  }
}

async function verifyChecks(checks, context) {
  for (const check of checks) {
    const dom = check.raw
      ? await (await fetchWithRetry(check.url)).text()
      : dumpDom(check.url);
    assertDomChecks(dom, check, `${context} @ ${check.url}`);
  }
}

async function waitForFrontend() {
  await sleep(500);
}

async function runVariant(pageName, variantKey, variant, cookie) {
  const createMarker = `${variantKey.toUpperCase()}_CREATE_${Date.now()}`;
  const createPayload = variant.makeCreatePayload(createMarker);
  let recordId = null;
  let slug = createPayload.slug;

  try {
    const publishCreated = await requestAdminCollection(pageName, cookie, {
      intent: 'publish',
      recordId: null,
      record: createPayload,
    });
    recordId = publishCreated.draftRecord?.id;
    slug = publishCreated.draftRecord?.slug || slug;

    if (!recordId) {
      throw new Error(`${pageName}/${variantKey}: create-publish did not return draftRecord.id`);
    }

    await waitForFrontend();
    await verifyChecks(variant.verifyCreate({ marker: createMarker, slug }), `${pageName}/${variantKey} create`);

    const updateMarker = `${variantKey.toUpperCase()}_UPDATE_${Date.now()}`;
    const updatePayload = variant.makeUpdatePayload(updateMarker, publishCreated.draftRecord);

    const publishUpdated = await requestAdminCollection(pageName, cookie, {
      intent: 'publish',
      recordId,
      record: updatePayload,
    });
    recordId = publishUpdated.draftRecord?.id ?? recordId;
    slug = publishUpdated.draftRecord?.slug || slug;

    await waitForFrontend();
    await verifyChecks(
      variant.verifyUpdate({ marker: updateMarker, previousMarker: createMarker, slug }),
      `${pageName}/${variantKey} update`,
    );

    await requestAdminCollection(pageName, cookie, {
      intent: 'delete',
      recordId,
    });

    await waitForFrontend();
    await verifyChecks(variant.verifyDelete({ marker: updateMarker, slug }), `${pageName}/${variantKey} delete`);

    return { pageName, variantKey, ok: true };
  } catch (error) {
    if (recordId) {
      try {
        await requestAdminCollection(pageName, cookie, { intent: 'delete', recordId });
      } catch {
        // ignore cleanup failure
      }
    }
    throw error;
  }
}

async function main() {
  const cookie = await login();
  const results = [];

  for (const collection of COLLECTION_CASES) {
    const variants = collection.variants ?? [{ key: collection.pageName, ...collection }];
    for (const variant of variants) {
      console.log(`Checking ${collection.pageName}/${variant.key}...`);
      const result = await runVariant(collection.pageName, variant.key, variant, cookie);
      results.push(result);
    }
  }

  for (const result of results) {
    console.log(`${result.pageName}/${result.variantKey}: CRUD reflected`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
