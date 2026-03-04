#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const os = require('os');
const ts = require('typescript');
const mime = require('mime-types');
const { compileStrapi, createStrapi } = require('@strapi/strapi');

const APP_DIR = path.resolve(__dirname, '..');
const ROOT_DIR = path.resolve(APP_DIR, '..');
const MOCK_DATA_PATH = path.join(ROOT_DIR, 'src', 'data', 'mockData.ts');
const SITE_CONTENT_PATH = path.join(ROOT_DIR, 'src', 'data', 'siteContent.ts');

function loadTsModule(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019,
      esModuleInterop: true,
    },
    fileName: filePath,
  });

  const module = { exports: {} };
  const sandbox = {
    module,
    exports: module.exports,
    require,
    __dirname: path.dirname(filePath),
    __filename: filePath,
    process,
    console,
  };

  vm.runInNewContext(transpiled.outputText, sandbox, { filename: filePath });

  return module.exports;
}

function toSlug(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function fileNameFromUrl(url, fallbackBaseName, contentType) {
  const parsedUrl = new URL(String(url));
  const pathname = parsedUrl.pathname || '';
  const rawExt = path.extname(pathname);
  const normalizedExt = rawExt && rawExt.length <= 5 ? rawExt : '';
  const derivedExt = normalizedExt || `.${mime.extension(contentType || 'image/jpeg') || 'jpg'}`;
  return `${toSlug(fallbackBaseName) || 'image'}${derivedExt}`;
}

function toStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function toTextItemArray(value) {
  return toStringArray(value).map((text) => ({ text }));
}

function toSiteLinkArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    name: String(item?.name || ''),
    path: String(item?.path || '/'),
  }));
}

function toSocialLinkArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    label: String(item?.label || ''),
    href: String(item?.href || '#'),
    icon: String(item?.icon || 'Facebook'),
  }));
}

function toIconTextArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    icon: String(item?.icon || 'Clock'),
    text: String(item?.text || ''),
  }));
}

function toFeatureItemArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    icon: String(item?.icon || 'LayoutGrid'),
    title: String(item?.title || ''),
    description: String(item?.description || ''),
  }));
}

function toServiceItemArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    title: String(item?.title || ''),
    description: String(item?.description || ''),
    link: String(item?.link || '/'),
  }));
}

function toTestimonialArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    name: String(item?.name || ''),
    role: String(item?.role || ''),
    content: String(item?.content || ''),
  }));
}

function toImageItemArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    alt: String(item?.alt || ''),
  }));
}

function toAmenityItemArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    icon: String(item?.icon || 'Wifi'),
    title: String(item?.title || ''),
    description: String(item?.description || ''),
  }));
}

function toFaqEntryArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    question: String(item?.question || ''),
    answer: String(item?.answer || ''),
  }));
}

function toComparisonRowArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    feature: String(item?.feature || ''),
    values: Array.isArray(item?.values)
      ? item.values.map((entry) => {
          if (typeof entry === 'string') {
            const normalized = entry.toLowerCase();
            if (normalized === 'true' || normalized === 'false') {
              return {
                valueType: 'boolean',
                booleanValue: normalized === 'true',
              };
            }

            return {
              valueType: 'text',
              textValue: entry,
            };
          }

          return {
            valueType: String(entry?.valueType || 'text') === 'boolean' ? 'boolean' : 'text',
            booleanValue: Boolean(entry?.booleanValue),
            textValue: String(entry?.textValue || ''),
          };
        })
      : [],
  }));
}

function toWorkspaceItemArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => ({
    title: String(item?.title || ''),
    category: String(item?.category || ''),
    link: String(item?.link || '/'),
  }));
}

function toContactForm(value) {
  return {
    title: String(value?.title || ''),
    description: String(value?.description || ''),
    submitLabel: String(value?.submitLabel || ''),
    namePlaceholder: String(value?.namePlaceholder || ''),
    emailPlaceholder: String(value?.emailPlaceholder || ''),
    phonePlaceholder: String(value?.phonePlaceholder || ''),
    subjectPlaceholder: String(value?.subjectPlaceholder || ''),
    messagePlaceholder: String(value?.messagePlaceholder || ''),
  };
}

function buildBlogMarkdown(post) {
  const title = String(post.title || 'A workspace that matches your day').trim();
  const excerpt = String(post.excerpt || 'Flexible work is not just a trend, it is a system.').trim();

  return [
    excerpt,
    '',
    '## The habits that make work feel effortless',
    '',
    '- Start with a 15-minute planning ritual',
    '- Protect 90-minute focus blocks',
    '- Use meeting rooms for context switching',
    '- End the day with a quick reset',
    '',
    `${title} works best when your space supports the way you actually work.`,
  ].join('\n');
}

function safeDate(value) {
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
}

async function listDocumentIds(strapi, uid, status) {
  const rows = await strapi.documents(uid).findMany({
    status,
    fields: ['documentId'],
    pagination: {
      page: 1,
      pageSize: 1000,
    },
  });

  return rows
    .map((row) => row.documentId)
    .filter(Boolean);
}

async function clearCollection(strapi, uid) {
  const draftIds = await listDocumentIds(strapi, uid, 'draft');
  const publishedIds = await listDocumentIds(strapi, uid, 'published');
  const allIds = [...new Set([...draftIds, ...publishedIds])];

  for (const documentId of allIds) {
    await strapi.documents(uid).delete({ documentId });
  }

  return allIds.length;
}

async function upsertSingle(strapi, uid, data) {
  const draft = await strapi.documents(uid).findFirst({ status: 'draft' });
  const published = draft ? null : await strapi.documents(uid).findFirst({ status: 'published' });
  const documentId = draft?.documentId || published?.documentId;

  if (documentId) {
    await strapi.documents(uid).update({
      documentId,
      data,
      status: 'published',
    });
    return 'updated';
  }

  await strapi.documents(uid).create({
    data,
    status: 'published',
  });
  return 'created';
}

async function findUploadByName(strapi, name) {
  return strapi.db.query('plugin::upload.file').findOne({
    where: { name },
  });
}

async function uploadRemoteImage(strapi, url, fallbackBaseName, alternativeText, mediaCache) {
  if (!url) {
    return null;
  }

  if (mediaCache.has(url)) {
    return mediaCache.get(url);
  }

  let tmpFilePath;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`download failed with ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const filename = fileNameFromUrl(url, fallbackBaseName, contentType);
    const existing = await findUploadByName(strapi, filename);

    if (existing?.id) {
      mediaCache.set(url, existing.id);
      return existing.id;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    tmpFilePath = path.join(os.tmpdir(), `${Date.now()}-${filename}`);
    fs.writeFileSync(tmpFilePath, buffer);

    const uploadedFiles = await strapi.plugin('upload').service('upload').upload({
      data: {
        fileInfo: {
          name: filename,
          alternativeText: alternativeText || fallbackBaseName,
        },
      },
      files: {
        filepath: tmpFilePath,
        originalFilename: filename,
        mimetype: contentType,
        size: buffer.length,
      },
    });

    const uploadedId = uploadedFiles?.[0]?.id || null;
    mediaCache.set(url, uploadedId);
    return uploadedId;
  } catch (error) {
    console.warn(`Skipping image upload for ${url}: ${error.message}`);
    mediaCache.set(url, null);
    return null;
  } finally {
    if (tmpFilePath && fs.existsSync(tmpFilePath)) {
      fs.unlinkSync(tmpFilePath);
    }
  }
}

async function run() {
  if (!fs.existsSync(MOCK_DATA_PATH)) {
    throw new Error(`mockData.ts not found at ${MOCK_DATA_PATH}`);
  }

  const {
    blogPosts = [],
    faqItems = [],
    pricingPlans = [],
    meetingRoomPlans = [],
    meetingRooms = [],
  } = loadTsModule(MOCK_DATA_PATH);
  const {
    defaultPrivacyPolicyContent,
    defaultSiteSettingsContent,
    defaultTermsContent,
  } = loadTsModule(SITE_CONTENT_PATH);

  const context = await compileStrapi({ appDir: APP_DIR });
  const strapi = createStrapi(context);

  await strapi.load();

  const mediaCache = new Map();

  const deletedBlogPosts = await clearCollection(strapi, 'api::blog-post.blog-post');
  const deletedFaqItems = await clearCollection(strapi, 'api::faq-item.faq-item');
  const deletedPricingPlans = await clearCollection(strapi, 'api::pricing-plan.pricing-plan');
  const deletedMeetingRooms = await clearCollection(strapi, 'api::meeting-room.meeting-room');

  let createdBlogPosts = 0;
  let aboutPageAction = 'created';
  let blogPageAction = 'created';
  let contactPageAction = 'created';
  let createdFaqItems = 0;
  let faqPageAction = 'created';
  let homepageAction = 'created';
  let createdPricingPlans = 0;
  let meetingRoomsPageAction = 'created';
  let pricingPageAction = 'created';
  let privacyPolicyPageAction = 'created';
  let termsPageAction = 'created';
  let virtualOfficePageAction = 'created';
  let createdMeetingRooms = 0;

  for (const [index, post] of blogPosts.entries()) {
    const slug = post.id ? toSlug(post.id) : toSlug(post.title || `post-${index + 1}`);
    const coverImage = await uploadRemoteImage(
      strapi,
      post.image || '',
      `blog-post-${slug}-cover`,
      post.title || `Blog Post ${index + 1}`,
      mediaCache,
    );
    const contentImages = await Promise.all([
      uploadRemoteImage(
        strapi,
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900',
        `blog-post-${slug}-content-1`,
        `${post.title || `Blog Post ${index + 1}`} content image 1`,
        mediaCache,
      ),
      uploadRemoteImage(
        strapi,
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900',
        `blog-post-${slug}-content-2`,
        `${post.title || `Blog Post ${index + 1}`} content image 2`,
        mediaCache,
      ),
    ]);

    await strapi.documents('api::blog-post.blog-post').create({
      status: 'published',
      data: {
        title: post.title || `Blog Post ${index + 1}`,
        slug,
        excerpt: post.excerpt || '',
        content: buildBlogMarkdown(post),
        contentImages: contentImages.filter(Boolean),
        contentImageUrls: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900',
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900',
        ],
        proTipTitle: 'Pro tip',
        proTipText:
          'Pick one “default” seat for deep work. The consistency makes it easier to enter flow even on busy days.',
        category: post.category || 'General',
        publishedDate: safeDate(post.date),
        readTime: post.readTime || '5 min read',
        author: post.author || 'CoworkingHub Team',
        tags: toTextItemArray(post.tags),
        featured: index === 0,
        coverImage,
        coverImageUrl: post.image || '',
      },
    });
    createdBlogPosts += 1;
  }

  for (const [index, item] of faqItems.entries()) {
    await strapi.documents('api::faq-item.faq-item').create({
      status: 'published',
      data: {
        question: item.question || `FAQ ${index + 1}`,
        answer: item.answer || '',
        sortOrder: index + 1,
        isFeatured: index < 4,
      },
    });
    createdFaqItems += 1;
  }

  const normalizedPlans = [
    ...pricingPlans.map((plan, index) => ({
      ...plan,
      planType: 'coworking',
      sortOrder: index + 1,
    })),
    ...meetingRoomPlans.map((plan, index) => ({
      ...plan,
      planType: 'meeting-room',
      sortOrder: index + 1,
    })),
  ];

  for (const plan of normalizedPlans) {
    const slug = plan.id ? toSlug(plan.id) : toSlug(plan.name || `${plan.planType}-${plan.sortOrder}`);
    await strapi.documents('api::pricing-plan.pricing-plan').create({
      status: 'published',
      data: {
        name: plan.name || `Plan ${plan.sortOrder}`,
        slug,
        planType: plan.planType,
        price: Number(plan.price || 0),
        period: plan.period || 'month',
        description: plan.description || '',
        features: toTextItemArray(plan.features),
        isPopular: Boolean(plan.isPopular),
        sortOrder: plan.sortOrder,
      },
    });
    createdPricingPlans += 1;
  }

  for (const [index, room] of meetingRooms.entries()) {
    const slug = room.id ? toSlug(room.id) : toSlug(room.name || `room-${index + 1}`);
    const roomImage = await uploadRemoteImage(
      strapi,
      room.image || '',
      `meeting-room-${slug}`,
      room.name || `Meeting Room ${index + 1}`,
      mediaCache,
    );

    await strapi.documents('api::meeting-room.meeting-room').create({
      status: 'published',
      data: {
        name: room.name || `Room ${index + 1}`,
        slug,
        description: room.description || '',
        capacity: Number(room.capacity || 0),
        features: toTextItemArray(room.features),
        badges: toTextItemArray(room.badges),
        sortOrder: index + 1,
        isFeatured: index === 0,
        image: roomImage,
        imageUrl: room.image || '',
      },
    });
    createdMeetingRooms += 1;
  }

  const homepageHeroBackgroundImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.homePage.hero.backgroundImage,
    'homepage-hero-background',
    defaultSiteSettingsContent.homePage.hero.title,
    mediaCache,
  );
  const homepageServices = await Promise.all(
    defaultSiteSettingsContent.homePage.services.map(async (item, index) => ({
      title: item.title,
      description: item.description,
      image: await uploadRemoteImage(
        strapi,
        item.image || '',
        `homepage-service-${index + 1}`,
        item.title || `Homepage service ${index + 1}`,
        mediaCache,
      ),
      link: item.link,
    })),
  );
  const homepageAboutHighlightImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.homePage.aboutHighlight.image,
    'homepage-about-highlight',
    defaultSiteSettingsContent.homePage.aboutHighlight.title,
    mediaCache,
  );
  const homepageGalleryImages = await Promise.all(
    defaultSiteSettingsContent.homePage.galleryImages.map(async (item, index) => ({
      image: await uploadRemoteImage(
        strapi,
        item.image || '',
        `homepage-gallery-${index + 1}`,
        item.alt || `Homepage gallery image ${index + 1}`,
        mediaCache,
      ),
      alt: item.alt,
    })),
  );

  homepageAction = await upsertSingle(strapi, 'api::homepage.homepage', {
    hero: {
      title: defaultSiteSettingsContent.homePage.hero.title,
      subtitle: defaultSiteSettingsContent.homePage.hero.subtitle,
      backgroundImage: homepageHeroBackgroundImage,
      primaryCtaLabel: defaultSiteSettingsContent.homePage.hero.primaryCtaLabel,
      primaryCtaPath: defaultSiteSettingsContent.homePage.hero.primaryCtaPath,
      secondaryCtaLabel: defaultSiteSettingsContent.homePage.hero.secondaryCtaLabel,
    },
    featureChips: toIconTextArray(defaultSiteSettingsContent.homePage.featureChips),
    servicesEyebrow: defaultSiteSettingsContent.homePage.servicesEyebrow,
    servicesKicker: defaultSiteSettingsContent.homePage.servicesKicker,
    services: homepageServices,
    aboutHighlight: {
      eyebrow: defaultSiteSettingsContent.homePage.aboutHighlight.eyebrow,
      title: defaultSiteSettingsContent.homePage.aboutHighlight.title,
      description: defaultSiteSettingsContent.homePage.aboutHighlight.description,
      benefits: toTextItemArray(defaultSiteSettingsContent.homePage.aboutHighlight.benefits),
      image: homepageAboutHighlightImage,
      primaryCtaLabel: defaultSiteSettingsContent.homePage.aboutHighlight.primaryCtaLabel,
      primaryCtaPath: defaultSiteSettingsContent.homePage.aboutHighlight.primaryCtaPath,
      secondaryCtaLabel: defaultSiteSettingsContent.homePage.aboutHighlight.secondaryCtaLabel,
      secondaryCtaPath: defaultSiteSettingsContent.homePage.aboutHighlight.secondaryCtaPath,
    },
    whyChooseEyebrow: defaultSiteSettingsContent.homePage.whyChooseEyebrow,
    whyChooseKicker: defaultSiteSettingsContent.homePage.whyChooseKicker,
    whyChooseTitle: defaultSiteSettingsContent.homePage.whyChooseTitle,
    whyChooseItems: toFeatureItemArray(defaultSiteSettingsContent.homePage.whyChooseItems),
    testimonialsEyebrow: defaultSiteSettingsContent.homePage.testimonialsEyebrow,
    testimonialsKicker: defaultSiteSettingsContent.homePage.testimonialsKicker,
    testimonialsTitle: defaultSiteSettingsContent.homePage.testimonialsTitle,
    testimonials: toTestimonialArray(defaultSiteSettingsContent.homePage.testimonials),
    galleryEyebrow: defaultSiteSettingsContent.homePage.galleryEyebrow,
    galleryKicker: defaultSiteSettingsContent.homePage.galleryKicker,
    galleryTitle: defaultSiteSettingsContent.homePage.galleryTitle,
    galleryImages: homepageGalleryImages,
    contactForm: {
      title: defaultSiteSettingsContent.homePage.contactForm.title,
      description: defaultSiteSettingsContent.homePage.contactForm.description || '',
      submitLabel: defaultSiteSettingsContent.homePage.contactForm.submitLabel,
      namePlaceholder: defaultSiteSettingsContent.homePage.contactForm.namePlaceholder,
      emailPlaceholder: defaultSiteSettingsContent.homePage.contactForm.emailPlaceholder || '',
      subjectPlaceholder: defaultSiteSettingsContent.homePage.contactForm.subjectPlaceholder || '',
      messagePlaceholder: defaultSiteSettingsContent.homePage.contactForm.messagePlaceholder,
    },
    visitUsTitle: defaultSiteSettingsContent.homePage.visitUsTitle,
    addressLabel: defaultSiteSettingsContent.homePage.addressLabel,
    emailLabel: defaultSiteSettingsContent.homePage.emailLabel,
    phoneLabel: defaultSiteSettingsContent.homePage.phoneLabel,
    openHoursLabel: defaultSiteSettingsContent.homePage.openHoursLabel,
    weekdayHours: defaultSiteSettingsContent.homePage.weekdayHours,
    weekendHours: defaultSiteSettingsContent.homePage.weekendHours,
    mapButtonLabel: defaultSiteSettingsContent.homePage.mapButtonLabel,
  });

  const aboutHeroBackgroundImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.aboutPage.heroBackgroundImage,
    'about-page-hero-background',
    defaultSiteSettingsContent.aboutPage.heroTitle,
    mediaCache,
  );
  const aboutStoryImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.aboutPage.storyImage,
    'about-page-story',
    defaultSiteSettingsContent.aboutPage.storyTitle,
    mediaCache,
  );
  const aboutAmenitiesImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.aboutPage.amenitiesImage,
    'about-page-amenities',
    defaultSiteSettingsContent.aboutPage.amenitiesTitle,
    mediaCache,
  );

  aboutPageAction = await upsertSingle(strapi, 'api::about-page.about-page', {
    heroTitle: defaultSiteSettingsContent.aboutPage.heroTitle,
    heroSubtitle: defaultSiteSettingsContent.aboutPage.heroSubtitle,
    heroBackgroundImage: aboutHeroBackgroundImage,
    storyTitle: defaultSiteSettingsContent.aboutPage.storyTitle,
    storyParagraphs: toTextItemArray(defaultSiteSettingsContent.aboutPage.storyParagraphs),
    storyImage: aboutStoryImage,
    whyChooseTitle: defaultSiteSettingsContent.aboutPage.whyChooseTitle,
    whyChooseItems: toFeatureItemArray(defaultSiteSettingsContent.aboutPage.whyChooseItems),
    amenitiesTitle: defaultSiteSettingsContent.aboutPage.amenitiesTitle,
    amenitiesImage: aboutAmenitiesImage,
    amenities: toAmenityItemArray(defaultSiteSettingsContent.aboutPage.amenities),
  });

  const blogHeroBackgroundImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.blogPage.heroBackgroundImage,
    'blog-page-hero-background',
    defaultSiteSettingsContent.blogPage.heroTitle,
    mediaCache,
  );
  const blogRelatedWorkspaces = await Promise.all(
    defaultSiteSettingsContent.blogPage.relatedWorkspaces.map(async (item, index) => ({
      title: item.title,
      category: item.category,
      link: item.link,
      image: await uploadRemoteImage(
        strapi,
        item.image || '',
        `blog-related-workspace-${index + 1}`,
        item.title || `Related workspace ${index + 1}`,
        mediaCache,
      ),
    })),
  );

  blogPageAction = await upsertSingle(strapi, 'api::blog-page.blog-page', {
    heroTitle: defaultSiteSettingsContent.blogPage.heroTitle,
    heroSubtitle: defaultSiteSettingsContent.blogPage.heroSubtitle,
    heroBackgroundImage: blogHeroBackgroundImage,
    searchPlaceholder: defaultSiteSettingsContent.blogPage.searchPlaceholder,
    quickSearchTitle: defaultSiteSettingsContent.blogPage.quickSearchTitle,
    recentPostsTitle: defaultSiteSettingsContent.blogPage.recentPostsTitle,
    categoriesTitle: defaultSiteSettingsContent.blogPage.categoriesTitle,
    popularTagsTitle: defaultSiteSettingsContent.blogPage.popularTagsTitle,
    noResultsText: defaultSiteSettingsContent.blogPage.noResultsText,
    detailBackLabel: defaultSiteSettingsContent.blogPage.detailBackLabel,
    detailSearchTitle: defaultSiteSettingsContent.blogPage.detailSearchTitle,
    detailSearchButtonLabel: defaultSiteSettingsContent.blogPage.detailSearchButtonLabel,
    detailRecentPostsTitle: defaultSiteSettingsContent.blogPage.detailRecentPostsTitle,
    detailPopularTagsTitle: defaultSiteSettingsContent.blogPage.detailPopularTagsTitle,
    detailRelatedWorkspacesTitle: defaultSiteSettingsContent.blogPage.detailRelatedWorkspacesTitle,
    detailCommentForm: toContactForm(defaultSiteSettingsContent.blogPage.detailCommentForm),
    relatedWorkspaces: blogRelatedWorkspaces,
  });

  const pricingHeroBackgroundImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.pricingPage.heroBackgroundImage,
    'pricing-page-hero-background',
    defaultSiteSettingsContent.pricingPage.heroTitle,
    mediaCache,
  );

  pricingPageAction = await upsertSingle(strapi, 'api::pricing-page.pricing-page', {
    heroTitle: defaultSiteSettingsContent.pricingPage.heroTitle,
    heroSubtitle: defaultSiteSettingsContent.pricingPage.heroSubtitle,
    heroBackgroundImage: pricingHeroBackgroundImage,
    comparisonTitle: defaultSiteSettingsContent.pricingPage.comparisonTitle,
    comparisonColumns: toTextItemArray(defaultSiteSettingsContent.pricingPage.comparisonColumns),
    comparisonRows: toComparisonRowArray(defaultSiteSettingsContent.pricingPage.comparisonRows),
    faqTitle: defaultSiteSettingsContent.pricingPage.faqTitle,
    faqSubtitle: defaultSiteSettingsContent.pricingPage.faqSubtitle,
    faqItems: toFaqEntryArray(defaultSiteSettingsContent.pricingPage.faqItems),
    purchaseButtonLabel: defaultSiteSettingsContent.pricingPage.purchaseButtonLabel,
    recommendedLabel: defaultSiteSettingsContent.pricingPage.recommendedLabel,
    featureListTitle: defaultSiteSettingsContent.pricingPage.featureListTitle,
    featureListSubtitle: defaultSiteSettingsContent.pricingPage.featureListSubtitle,
  });

  const faqHeroBackgroundImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.faqPage.heroBackgroundImage,
    'faq-page-hero-background',
    defaultSiteSettingsContent.faqPage.heroTitle,
    mediaCache,
  );

  faqPageAction = await upsertSingle(strapi, 'api::faq-page.faq-page', {
    heroTitle: defaultSiteSettingsContent.faqPage.heroTitle,
    heroSubtitle: defaultSiteSettingsContent.faqPage.heroSubtitle,
    heroBackgroundImage: faqHeroBackgroundImage,
    eyebrow: defaultSiteSettingsContent.faqPage.eyebrow,
    title: defaultSiteSettingsContent.faqPage.title,
    description: defaultSiteSettingsContent.faqPage.description,
    searchPlaceholder: defaultSiteSettingsContent.faqPage.searchPlaceholder,
    noResultsText: defaultSiteSettingsContent.faqPage.noResultsText,
    ctaTitle: defaultSiteSettingsContent.faqPage.ctaTitle,
    ctaDescription: defaultSiteSettingsContent.faqPage.ctaDescription,
    ctaButtonLabel: defaultSiteSettingsContent.faqPage.ctaButtonLabel,
  });

  const meetingRoomsHeroBackgroundImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.meetingRoomsPage.heroBackgroundImage,
    'meeting-rooms-page-hero-background',
    defaultSiteSettingsContent.meetingRoomsPage.heroTitle,
    mediaCache,
  );

  meetingRoomsPageAction = await upsertSingle(strapi, 'api::meeting-rooms-page.meeting-rooms-page', {
    heroTitle: defaultSiteSettingsContent.meetingRoomsPage.heroTitle,
    heroSubtitle: defaultSiteSettingsContent.meetingRoomsPage.heroSubtitle,
    heroBackgroundImage: meetingRoomsHeroBackgroundImage,
    roomsTitle: defaultSiteSettingsContent.meetingRoomsPage.roomsTitle,
    roomsSubtitle: defaultSiteSettingsContent.meetingRoomsPage.roomsSubtitle,
    amenitiesTitle: defaultSiteSettingsContent.meetingRoomsPage.amenitiesTitle,
    amenitiesSubtitle: defaultSiteSettingsContent.meetingRoomsPage.amenitiesSubtitle,
    amenities: toAmenityItemArray(defaultSiteSettingsContent.meetingRoomsPage.amenities),
    plansTitle: defaultSiteSettingsContent.meetingRoomsPage.plansTitle,
    plansSubtitle: defaultSiteSettingsContent.meetingRoomsPage.plansSubtitle,
    readMoreLabel: defaultSiteSettingsContent.meetingRoomsPage.readMoreLabel,
    bookNowLabel: defaultSiteSettingsContent.meetingRoomsPage.bookNowLabel,
    getStartedLabel: defaultSiteSettingsContent.meetingRoomsPage.getStartedLabel,
    popularLabel: defaultSiteSettingsContent.meetingRoomsPage.popularLabel,
  });

  const virtualOfficeHeroBackgroundImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.virtualOfficePage.heroBackgroundImage,
    'virtual-office-page-hero-background',
    defaultSiteSettingsContent.virtualOfficePage.heroTitle,
    mediaCache,
  );
  const virtualOfficeFeaturedImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.virtualOfficePage.featuredImage,
    'virtual-office-page-featured',
    defaultSiteSettingsContent.virtualOfficePage.overviewTitle,
    mediaCache,
  );
  const virtualOfficeGalleryImages = await Promise.all(
    defaultSiteSettingsContent.virtualOfficePage.galleryImages.map(async (item, index) => ({
      image: await uploadRemoteImage(
        strapi,
        item.image || '',
        `virtual-office-gallery-${index + 1}`,
        item.alt || `Virtual office gallery image ${index + 1}`,
        mediaCache,
      ),
      alt: item.alt,
    })),
  );

  virtualOfficePageAction = await upsertSingle(strapi, 'api::virtual-office-page.virtual-office-page', {
    heroTitle: defaultSiteSettingsContent.virtualOfficePage.heroTitle,
    heroSubtitle: defaultSiteSettingsContent.virtualOfficePage.heroSubtitle,
    heroBackgroundImage: virtualOfficeHeroBackgroundImage,
    featuredImage: virtualOfficeFeaturedImage,
    overviewTitle: defaultSiteSettingsContent.virtualOfficePage.overviewTitle,
    overviewText: defaultSiteSettingsContent.virtualOfficePage.overviewText,
    challengeTitle: defaultSiteSettingsContent.virtualOfficePage.challengeTitle,
    challengeIntro: defaultSiteSettingsContent.virtualOfficePage.challengeIntro,
    challengeItems: toTextItemArray(defaultSiteSettingsContent.virtualOfficePage.challengeItems),
    resultTitle: defaultSiteSettingsContent.virtualOfficePage.resultTitle,
    resultText: defaultSiteSettingsContent.virtualOfficePage.resultText,
    galleryImages: virtualOfficeGalleryImages,
    projectInfoTitle: defaultSiteSettingsContent.virtualOfficePage.projectInfoTitle,
    projectDateLabel: defaultSiteSettingsContent.virtualOfficePage.projectDateLabel,
    projectDateValue: defaultSiteSettingsContent.virtualOfficePage.projectDateValue,
    projectCategoryLabel: defaultSiteSettingsContent.virtualOfficePage.projectCategoryLabel,
    projectCategoryValue: defaultSiteSettingsContent.virtualOfficePage.projectCategoryValue,
    projectWebsiteLabel: defaultSiteSettingsContent.virtualOfficePage.projectWebsiteLabel,
    projectWebsiteValue: defaultSiteSettingsContent.virtualOfficePage.projectWebsiteValue,
    ctaTitle: defaultSiteSettingsContent.virtualOfficePage.ctaTitle,
    ctaDescription: defaultSiteSettingsContent.virtualOfficePage.ctaDescription,
    ctaButtonLabel: defaultSiteSettingsContent.virtualOfficePage.ctaButtonLabel,
    contactForm: toContactForm(defaultSiteSettingsContent.virtualOfficePage.contactForm),
  });

  const contactHeroBackgroundImage = await uploadRemoteImage(
    strapi,
    defaultSiteSettingsContent.contactPage.heroBackgroundImage,
    'contact-page-hero-background',
    defaultSiteSettingsContent.contactPage.heroTitle,
    mediaCache,
  );

  contactPageAction = await upsertSingle(strapi, 'api::contact-page.contact-page', {
    heroTitle: defaultSiteSettingsContent.contactPage.heroTitle,
    heroSubtitle: defaultSiteSettingsContent.contactPage.heroSubtitle,
    heroBackgroundImage: contactHeroBackgroundImage,
    introEyebrow: defaultSiteSettingsContent.contactPage.introEyebrow,
    introTitle: defaultSiteSettingsContent.contactPage.introTitle,
    addressCardTitle: defaultSiteSettingsContent.contactPage.addressCardTitle,
    emailCardTitle: defaultSiteSettingsContent.contactPage.emailCardTitle,
    phoneCardTitle: defaultSiteSettingsContent.contactPage.phoneCardTitle,
    form: toContactForm(defaultSiteSettingsContent.contactPage.form),
    mapTitle: defaultSiteSettingsContent.contactPage.mapTitle,
    mapDescription: defaultSiteSettingsContent.contactPage.mapDescription,
  });

  privacyPolicyPageAction = await upsertSingle(strapi, 'api::privacy-policy-page.privacy-policy-page', {
    heroTitle: defaultPrivacyPolicyContent.heroTitle,
    heroSubtitle: defaultPrivacyPolicyContent.heroSubtitle,
    effectiveDateLabel: defaultPrivacyPolicyContent.effectiveDateLabel,
    effectiveDateValue: defaultPrivacyPolicyContent.effectiveDateValue,
    introText: defaultPrivacyPolicyContent.introText,
    sections: defaultPrivacyPolicyContent.sections.map((section) => ({
      title: section.title,
      body: section.body,
    })),
    contactTitle: defaultPrivacyPolicyContent.contactTitle,
    contactBody: defaultPrivacyPolicyContent.contactBody,
    contactButtonLabel: defaultPrivacyPolicyContent.contactButtonLabel,
  });

  termsPageAction = await upsertSingle(strapi, 'api::terms-page.terms-page', {
    heroTitle: defaultTermsContent.heroTitle,
    heroSubtitle: defaultTermsContent.heroSubtitle,
    effectiveDateLabel: defaultTermsContent.effectiveDateLabel,
    effectiveDateValue: defaultTermsContent.effectiveDateValue,
    introText: defaultTermsContent.introText,
    sections: defaultTermsContent.sections.map((section) => ({
      title: section.title,
      body: section.body,
    })),
    contactTitle: defaultTermsContent.contactTitle,
    contactBody: defaultTermsContent.contactBody,
    contactButtonLabel: defaultTermsContent.contactButtonLabel,
  });

  const siteSettingsAction = await upsertSingle(strapi, 'api::site-setting.site-setting', {
    siteName: defaultSiteSettingsContent.siteName,
    tagline: defaultSiteSettingsContent.tagline,
    contactEmail: defaultSiteSettingsContent.contactEmail,
    contactPhone: defaultSiteSettingsContent.contactPhone,
    address: defaultSiteSettingsContent.address,
    socialLinks: toSocialLinkArray(defaultSiteSettingsContent.socialLinks),
    navigation: {
      links: toSiteLinkArray(defaultSiteSettingsContent.navigation.links),
      ctaLabel: defaultSiteSettingsContent.navigation.ctaLabel,
      ctaPath: defaultSiteSettingsContent.navigation.ctaPath,
    },
    footer: {
      description: defaultSiteSettingsContent.footer.description,
      serviceLinks: toSiteLinkArray(defaultSiteSettingsContent.footer.serviceLinks),
      aboutLinks: toSiteLinkArray(defaultSiteSettingsContent.footer.aboutLinks),
      contactTitle: defaultSiteSettingsContent.footer.contactTitle,
      copyright: defaultSiteSettingsContent.footer.copyright,
      legalLinks: toSiteLinkArray(defaultSiteSettingsContent.footer.legalLinks),
    },
    homePage: defaultSiteSettingsContent.homePage,
    aboutPage: defaultSiteSettingsContent.aboutPage,
    blogPage: defaultSiteSettingsContent.blogPage,
    pricingPage: defaultSiteSettingsContent.pricingPage,
    faqPage: defaultSiteSettingsContent.faqPage,
    meetingRoomsPage: defaultSiteSettingsContent.meetingRoomsPage,
    virtualOfficePage: defaultSiteSettingsContent.virtualOfficePage,
    contactPage: defaultSiteSettingsContent.contactPage,
    defaultSeoTitle: defaultSiteSettingsContent.siteName,
    defaultSeoDescription: 'Flexible coworking, meeting rooms, and virtual office services.',
    homeHeroImage: homepageHeroBackgroundImage,
    blogHeroImage: blogHeroBackgroundImage,
    pricingHeroImage: pricingHeroBackgroundImage,
    meetingRoomsHeroImage: meetingRoomsHeroBackgroundImage,
    faqHeroImage: faqHeroBackgroundImage,
  });

  console.log('Seed complete');
  console.log(`- Blog posts: ${createdBlogPosts} (deleted ${deletedBlogPosts})`);
  console.log(`- FAQ items: ${createdFaqItems} (deleted ${deletedFaqItems})`);
  console.log(`- About page: ${aboutPageAction}`);
  console.log(`- Blog page: ${blogPageAction}`);
  console.log(`- Contact page: ${contactPageAction}`);
  console.log(`- FAQ page: ${faqPageAction}`);
  console.log(`- Homepage: ${homepageAction}`);
  console.log(`- Meeting rooms page: ${meetingRoomsPageAction}`);
  console.log(`- Pricing plans: ${createdPricingPlans} (deleted ${deletedPricingPlans})`);
  console.log(`- Pricing page: ${pricingPageAction}`);
  console.log(`- Privacy policy page: ${privacyPolicyPageAction}`);
  console.log(`- Meeting rooms: ${createdMeetingRooms} (deleted ${deletedMeetingRooms})`);
  console.log(`- Terms page: ${termsPageAction}`);
  console.log(`- Virtual office page: ${virtualOfficePageAction}`);
  console.log(`- Site settings: ${siteSettingsAction}`);
}

run()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed');
    console.error(error);
    process.exit(1);
  });
