import { randomUUID } from 'node:crypto';
import { QueryTypes } from 'sequelize';
import { sequelize } from './database.js';
import { handleCollectionPage } from './collection-pages.js';
import { handleContentPage } from './content-pages.js';
import {
  defaultPrivacyPolicyContent,
  defaultSiteSettingsContent,
  defaultTermsContent,
} from '../../src/data/siteContent.js';
import {
  blogPosts,
  faqItems,
  meetingRoomPlans,
  meetingRooms,
  pricingPlans,
} from '../../src/data/mockData.js';

const TABLE_DEFINITIONS = [
  `CREATE TABLE IF NOT EXISTS site_settings (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    site_name VARCHAR(255) NOT NULL DEFAULT '',
    tagline TEXT NULL,
    contact_email VARCHAR(255) NOT NULL DEFAULT '',
    contact_phone VARCHAR(255) NOT NULL DEFAULT '',
    address TEXT NULL,
    default_seo_title VARCHAR(255) NOT NULL DEFAULT '',
    default_seo_description TEXT NULL,
    home_page JSON NULL,
    blog_page JSON NULL,
    pricing_page JSON NULL,
    faq_page JSON NULL,
    meeting_rooms_page JSON NULL,
    virtual_office_page JSON NULL,
    contact_page JSON NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    published_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS site_settings_cmps (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity_id INT UNSIGNED NOT NULL,
    cmp_id INT UNSIGNED NOT NULL,
    component_type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    \`order\` INT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS components_common_social_links (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NULL,
    href TEXT NULL,
    icon VARCHAR(255) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS components_common_site_links (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NULL,
    path VARCHAR(255) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS components_site_navigations (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cta_label VARCHAR(255) NULL,
    cta_path VARCHAR(255) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS components_site_navigations_cmps (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity_id INT UNSIGNED NOT NULL,
    cmp_id INT UNSIGNED NOT NULL,
    component_type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    \`order\` INT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS components_site_footers (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description TEXT NULL,
    contact_title VARCHAR(255) NULL,
    copyright VARCHAR(255) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS components_site_footers_cmps (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity_id INT UNSIGNED NOT NULL,
    cmp_id INT UNSIGNED NOT NULL,
    component_type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    \`order\` INT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS about_pages (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    hero_title VARCHAR(255) NULL,
    hero_subtitle TEXT NULL,
    story_title VARCHAR(255) NULL,
    why_choose_title VARCHAR(255) NULL,
    amenities_title VARCHAR(255) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    published_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS about_pages_cmps (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity_id INT UNSIGNED NOT NULL,
    cmp_id INT UNSIGNED NOT NULL,
    component_type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    \`order\` INT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS components_common_text_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    text TEXT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS components_common_feature_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(255) NULL,
    title VARCHAR(255) NULL,
    description TEXT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS components_common_amenity_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(255) NULL,
    title VARCHAR(255) NULL,
    description TEXT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS privacy_policy_pages (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    hero_title VARCHAR(255) NULL,
    hero_subtitle TEXT NULL,
    effective_date_label VARCHAR(255) NULL,
    effective_date_value VARCHAR(255) NULL,
    intro_text LONGTEXT NULL,
    contact_title VARCHAR(255) NULL,
    contact_body LONGTEXT NULL,
    contact_button_label VARCHAR(255) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    published_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS privacy_policy_pages_cmps (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity_id INT UNSIGNED NOT NULL,
    cmp_id INT UNSIGNED NOT NULL,
    component_type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    \`order\` INT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS terms_pages (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    hero_title VARCHAR(255) NULL,
    hero_subtitle TEXT NULL,
    effective_date_label VARCHAR(255) NULL,
    effective_date_value VARCHAR(255) NULL,
    intro_text LONGTEXT NULL,
    contact_title VARCHAR(255) NULL,
    contact_body LONGTEXT NULL,
    contact_button_label VARCHAR(255) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    published_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS terms_pages_cmps (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity_id INT UNSIGNED NOT NULL,
    cmp_id INT UNSIGNED NOT NULL,
    component_type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    \`order\` INT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS components_common_legal_sections (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NULL,
    body LONGTEXT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS files (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NULL,
    alternative_text VARCHAR(255) NULL,
    caption TEXT NULL,
    width INT NULL,
    height INT NULL,
    formats JSON NULL,
    hash VARCHAR(255) NULL,
    ext VARCHAR(32) NULL,
    mime VARCHAR(255) NULL,
    size DECIMAL(10,2) NULL,
    url TEXT NULL,
    preview_url TEXT NULL,
    provider VARCHAR(255) NULL,
    folder_path VARCHAR(255) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS files_related_mph (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    file_id INT UNSIGNED NOT NULL,
    related_id INT UNSIGNED NOT NULL,
    related_type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    \`order\` INT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS blog_posts (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NULL,
    slug VARCHAR(255) NULL,
    excerpt TEXT NULL,
    content LONGTEXT NULL,
    content_image_urls JSON NULL,
    pro_tip_title VARCHAR(255) NULL,
    pro_tip_text LONGTEXT NULL,
    category VARCHAR(255) NULL,
    published_date DATE NULL,
    read_time VARCHAR(255) NULL,
    author VARCHAR(255) NULL,
    featured TINYINT(1) NOT NULL DEFAULT 0,
    cover_image_url TEXT NULL,
    locale VARCHAR(16) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    published_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS blog_posts_cmps (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity_id INT UNSIGNED NOT NULL,
    cmp_id INT UNSIGNED NOT NULL,
    component_type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    \`order\` INT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS faq_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    question VARCHAR(255) NULL,
    answer LONGTEXT NULL,
    sort_order INT NULL,
    is_featured TINYINT(1) NOT NULL DEFAULT 0,
    locale VARCHAR(16) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    published_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS meeting_rooms (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NULL,
    slug VARCHAR(255) NULL,
    description LONGTEXT NULL,
    capacity INT NULL,
    sort_order INT NULL,
    is_featured TINYINT(1) NOT NULL DEFAULT 0,
    image_url TEXT NULL,
    locale VARCHAR(16) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    published_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS meeting_rooms_cmps (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity_id INT UNSIGNED NOT NULL,
    cmp_id INT UNSIGNED NOT NULL,
    component_type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    \`order\` INT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS pricing_plans (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NULL,
    slug VARCHAR(255) NULL,
    plan_type VARCHAR(64) NULL,
    price DECIMAL(10,2) NULL,
    period VARCHAR(255) NULL,
    description LONGTEXT NULL,
    is_popular TINYINT(1) NOT NULL DEFAULT 0,
    sort_order INT NULL,
    locale VARCHAR(16) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    published_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS pricing_plans_cmps (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity_id INT UNSIGNED NOT NULL,
    cmp_id INT UNSIGNED NOT NULL,
    component_type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    \`order\` INT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL,
    message LONGTEXT NOT NULL,
    source_page VARCHAR(255) NOT NULL DEFAULT 'contact',
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS contact_submission_replies (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    contact_submission_id INT UNSIGNED NOT NULL,
    admin_email VARCHAR(255) NOT NULL,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body LONGTEXT NOT NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    INDEX idx_contact_submission_replies_submission_id (contact_submission_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

function slugify(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function insertRow(table, values, transaction) {
  const columns = Object.keys(values);
  const replacements = { ...values };
  const [insertId, metadata] = await sequelize.query(
    `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map((column) => `:${column}`).join(', ')})`,
    {
      replacements,
      transaction,
    },
  );

  return typeof insertId === 'number' ? insertId : metadata?.insertId ?? null;
}

async function ensureSchema() {
  for (const statement of TABLE_DEFINITIONS) {
    await sequelize.query(statement);
  }

  // #108: Ensure indexes on contact_submissions for common filter queries (email lookup, date-based listing)
  await ensureContentIndex('contact_submissions', 'contact_submissions_email_idx', '`email`');
  await ensureContentIndex('contact_submissions', 'contact_submissions_created_at_idx', '`created_at`');
}

async function ensureContentIndex(tableName, indexName, columnDefs) {
  const [rows] = await sequelize.query(
    `SELECT INDEX_NAME FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :tableName AND INDEX_NAME = :indexName LIMIT 1`,
    { replacements: { tableName, indexName } },
  );

  if (Array.isArray(rows) && rows.length > 0) {
    return;
  }

  await sequelize.query(`ALTER TABLE \`${tableName}\` ADD INDEX \`${indexName}\` (${columnDefs})`);
}

async function insertDraftRows() {
  const now = new Date();

  await sequelize.transaction(async (transaction) => {
    await insertRow('site_settings', {
      document_id: randomUUID(),
      created_at: now,
      updated_at: now,
      published_at: null,
    }, transaction);

    for (const table of ['about_pages', 'privacy_policy_pages', 'terms_pages']) {
      await insertRow(table, {
        document_id: randomUUID(),
        created_at: now,
        updated_at: now,
        published_at: null,
      }, transaction);
    }
  });
}

async function seedAboutPageMedia() {
  const urls = [
    defaultSiteSettingsContent.aboutPage.heroBackgroundImage,
    defaultSiteSettingsContent.aboutPage.storyImage,
    defaultSiteSettingsContent.aboutPage.amenitiesImage,
  ].filter(Boolean);

  for (const url of urls) {
    await insertRow('files', {
      document_id: randomUUID(),
      name: url.split('/').pop()?.split('?')[0] || 'image',
      alternative_text: '',
      caption: '',
      width: null,
      height: null,
      formats: null,
      hash: slugify(url).slice(0, 64),
      ext: '',
      mime: 'image/jpeg',
      size: 0,
      url,
      preview_url: null,
      provider: 'external',
      folder_path: '/',
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}

function mapBlogPost(post) {
  const slug = slugify(post.title || post.id);

  return {
    title: post.title,
    slug,
    excerpt: post.excerpt,
    content: post.excerpt,
    contentImages: [],
    proTipTitle: 'Key takeaway',
    proTipText: post.excerpt,
    category: post.category,
    publishedDate: post.date,
    readTime: post.readTime,
    author: post.author,
    tags: Array.isArray(post.tags) ? post.tags.map((text) => ({ text })) : [],
    featured: false,
    coverImage: post.image ?? '',
  };
}

function mapFaqItem(item, index) {
  return {
    question: item.question,
    answer: item.answer,
    sortOrder: index + 1,
    isFeatured: index < 3,
  };
}

function mapMeetingRoom(room, index) {
  return {
    name: room.name,
    slug: slugify(room.name || room.id),
    description: room.description,
    capacity: Number(room.capacity ?? 0),
    sortOrder: index + 1,
    isFeatured: index === 0,
    features: Array.isArray(room.features) ? room.features.map((text) => ({ text })) : [],
    badges: Array.isArray(room.badges) ? room.badges.map((text) => ({ text })) : [],
    image: room.image ?? '',
  };
}

function mapPricingPlan(plan, index, planType, prefix = '') {
  const name = plan.name || `${prefix}plan-${index + 1}`;
  const priceValue = Number(String(plan.price ?? 0).replace(/[^0-9.]+/g, '')) || 0;

  return {
    name,
    slug: slugify(name),
    planType,
    price: priceValue,
    period: plan.period ?? 'month',
    description: plan.description ?? `${name} access plan`,
    features: Array.isArray(plan.features) ? plan.features.map((text) => ({ text })) : [],
    isPopular: Boolean(plan.isPopular),
    sortOrder: index + 1,
  };
}

async function publishContentPage(pageName, content) {
  await handleContentPage(pageName, {
    method: 'post',
    payload: {
      intent: 'publish',
      content,
    },
  });
}

async function publishCollectionItem(pageName, record) {
  await handleCollectionPage(pageName, {
    method: 'post',
    payload: {
      intent: 'publish',
      record,
    },
  });
}

async function seedContent() {
  await seedAboutPageMedia();

  await publishContentPage('site-settings', {
    ...defaultSiteSettingsContent,
    defaultSeoTitle: defaultSiteSettingsContent.siteName,
    defaultSeoDescription: defaultSiteSettingsContent.tagline,
  });
  await publishContentPage('homepage', defaultSiteSettingsContent.homePage);
  await publishContentPage('about-page', defaultSiteSettingsContent.aboutPage);
  await publishContentPage('blog-page', defaultSiteSettingsContent.blogPage);
  await publishContentPage('pricing-page', defaultSiteSettingsContent.pricingPage);
  await publishContentPage('faq-page', defaultSiteSettingsContent.faqPage);
  await publishContentPage('meeting-rooms-page', defaultSiteSettingsContent.meetingRoomsPage);
  await publishContentPage('virtual-office-page', defaultSiteSettingsContent.virtualOfficePage);
  await publishContentPage('contact-page', defaultSiteSettingsContent.contactPage);
  await publishContentPage('privacy-policy-page', defaultPrivacyPolicyContent);
  await publishContentPage('terms-page', defaultTermsContent);

  for (const post of blogPosts) {
    await publishCollectionItem('blog-posts', mapBlogPost(post));
  }

  for (const [index, item] of faqItems.entries()) {
    await publishCollectionItem('faq-items', mapFaqItem(item, index));
  }

  for (const [index, room] of meetingRooms.entries()) {
    await publishCollectionItem('meeting-rooms', mapMeetingRoom(room, index));
  }

  for (const [index, plan] of pricingPlans.entries()) {
    await publishCollectionItem('pricing-plans', mapPricingPlan(plan, index, 'coworking'));
  }

  for (const [index, plan] of meetingRoomPlans.entries()) {
    await publishCollectionItem('pricing-plans', mapPricingPlan(plan, index + pricingPlans.length, 'meeting-room', 'meeting-room-'));
  }
}

async function hasSeedData() {
  const [siteSettingsRows, blogRows] = await Promise.all([
    sequelize.query(
      'SELECT COUNT(*) AS total FROM site_settings WHERE published_at IS NOT NULL',
      { type: QueryTypes.SELECT },
    ),
    sequelize.query(
      'SELECT COUNT(*) AS total FROM blog_posts WHERE published_at IS NOT NULL',
      { type: QueryTypes.SELECT },
    ),
  ]);

  return Number(siteSettingsRows[0]?.total ?? 0) > 0 && Number(blogRows[0]?.total ?? 0) > 0;
}

export async function ensureContentDatabase() {
  await ensureSchema();

  if (await hasSeedData()) {
    return;
  }

  await insertDraftRows();
  await seedContent();
}
