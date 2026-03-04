import { sequelize } from './database.js';
import { config } from './config.js';

const PAGE_DEFINITIONS = [
  {
    name: 'site-settings',
    label: 'Site Settings',
    icon: 'Settings',
    kind: 'site-settings',
  },
  {
    name: 'homepage',
    label: 'Homepage',
    icon: 'Home',
    kind: 'json-column',
    column: 'home_page',
  },
  {
    name: 'about-page',
    label: 'About Page',
    icon: 'User',
    kind: 'about-page-record',
  },
  {
    name: 'blog-page',
    label: 'Blog Page',
    icon: 'Book',
    kind: 'json-column',
    column: 'blog_page',
  },
  {
    name: 'pricing-page',
    label: 'Pricing Page',
    icon: 'CreditCard',
    kind: 'json-column',
    column: 'pricing_page',
  },
  {
    name: 'faq-page',
    label: 'FAQ Page',
    icon: 'HelpCircle',
    kind: 'json-column',
    column: 'faq_page',
  },
  {
    name: 'meeting-rooms-page',
    label: 'Meeting Rooms Page',
    icon: 'Users',
    kind: 'json-column',
    column: 'meeting_rooms_page',
  },
  {
    name: 'virtual-office-page',
    label: 'Virtual Office Page',
    icon: 'Briefcase',
    kind: 'json-column',
    column: 'virtual_office_page',
  },
  {
    name: 'contact-page',
    label: 'Contact Page',
    icon: 'Phone',
    kind: 'json-column',
    column: 'contact_page',
  },
  {
    name: 'privacy-policy-page',
    label: 'Privacy Policy Page',
    icon: 'Shield',
    kind: 'legal-page',
    table: 'privacy_policy_pages',
  },
  {
    name: 'terms-page',
    label: 'Terms Page',
    icon: 'FileText',
    kind: 'legal-page',
    table: 'terms_pages',
  },
];

const PAGE_DEFINITION_MAP = Object.fromEntries(
  PAGE_DEFINITIONS.map((definition) => [definition.name, definition]),
);

const ASSET_ORIGIN = config.publicOrigin;

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function parseJsonValue(value) {
  if (value === null || value === undefined || value === '') {
    return {};
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
}

function normalizeForSave(value) {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeForSave(item));
  }

  if (isObject(value)) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== '__tempId')
        .map(([key, nestedValue]) => [key, normalizeForSave(nestedValue)]),
    );
  }

  return value;
}

function hasMeaningfulValue(value) {
  if (Array.isArray(value)) {
    return value.some((item) => hasMeaningfulValue(item));
  }

  if (isObject(value)) {
    return Object.entries(value)
      .filter(([key]) => !['id', '__tempId'].includes(key))
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

function mapRowToSiteSettings(row) {
  return {
    siteName: row.site_name ?? '',
    tagline: row.tagline ?? '',
    contactEmail: row.contact_email ?? '',
    contactPhone: row.contact_phone ?? '',
    address: row.address ?? '',
    defaultSeoTitle: row.default_seo_title ?? '',
    defaultSeoDescription: row.default_seo_description ?? '',
  };
}

function mapNavigationRow(row, links) {
  return {
    id: row?.id ?? null,
    ctaLabel: row?.cta_label ?? '',
    ctaPath: row?.cta_path ?? '',
    links,
  };
}

function mapFooterRow(row, serviceLinks, aboutLinks, legalLinks) {
  return {
    id: row?.id ?? null,
    description: row?.description ?? '',
    contactTitle: row?.contact_title ?? '',
    copyright: row?.copyright ?? '',
    serviceLinks,
    aboutLinks,
    legalLinks,
  };
}

function mapSocialLinkRow(row) {
  return {
    id: row.id,
    label: row.label ?? '',
    href: row.href ?? '',
    icon: row.icon ?? 'Facebook',
  };
}

function mapSiteLinkRow(row) {
  return {
    id: row.id,
    name: row.name ?? '',
    path: row.path ?? '',
  };
}

function mapLegalSectionRow(row) {
  return {
    id: row.id,
    title: row.title ?? '',
    body: row.body ?? '',
  };
}

function mapFeatureItemRow(row) {
  return {
    id: row.id,
    icon: row.icon ?? '',
    title: row.title ?? '',
    description: row.description ?? '',
  };
}

function mapAmenityItemRow(row) {
  return {
    id: row.id,
    icon: row.icon ?? '',
    title: row.title ?? '',
    description: row.description ?? '',
  };
}

function mapTextItemRow(row) {
  return {
    id: row.id,
    text: row.text ?? '',
  };
}

function toAbsoluteFileUrl(value) {
  if (typeof value !== 'string' || !value.length) {
    return '';
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return `${ASSET_ORIGIN}${value}`;
}

function toRelativeFileUrl(value) {
  if (typeof value !== 'string' || !value.length) {
    return '';
  }

  try {
    const url = new URL(value);
    if (url.origin === ASSET_ORIGIN) {
      return url.pathname;
    }
  } catch {
    return value.startsWith('/') ? value : value;
  }

  return value;
}

async function selectRows(query, replacements, transaction) {
  const [rows] = await sequelize.query(query, {
    replacements,
    transaction,
  });

  return rows;
}

async function selectOne(query, replacements, transaction) {
  const rows = await selectRows(query, replacements, transaction);

  return rows[0] ?? null;
}

async function getVersionedRows(table, transaction) {
  const rows = await selectRows(
    `SELECT * FROM ${table} ORDER BY updated_at DESC, id DESC`,
    {},
    transaction,
  );

  const draftRow = rows.find((row) => !row.published_at) ?? null;
  const pivot = draftRow?.document_id ?? rows[0]?.document_id ?? null;
  const scopedRows = pivot
    ? rows.filter((row) => row.document_id === pivot)
    : rows;
  const publishedRow = scopedRows.find((row) => Boolean(row.published_at)) ?? null;

  return {
    draftRow,
    publishedRow,
  };
}

async function getSiteSettingsVersions(transaction) {
  return getVersionedRows('site_settings', transaction);
}

async function getPageVersions(table, transaction) {
  return getVersionedRows(table, transaction);
}

async function getLinkRows(linkTable, parentId, field, transaction) {
  return selectRows(
    `SELECT * FROM ${linkTable} WHERE entity_id = :parentId AND field = :field ORDER BY \`order\` ASC, id ASC`,
    { parentId, field },
    transaction,
  );
}

async function getSiteLinkItems(linkTable, parentId, field, transaction) {
  const links = await getLinkRows(linkTable, parentId, field, transaction);

  if (!links.length) {
    return [];
  }

  const ids = links.map((link) => link.cmp_id);
  const rows = await selectRows(
    'SELECT * FROM components_common_site_links WHERE id IN (:ids)',
    { ids },
    transaction,
  );
  const rowMap = new Map(rows.map((row) => [row.id, row]));

  return links
    .map((link) => rowMap.get(link.cmp_id))
    .filter(Boolean)
    .map(mapSiteLinkRow);
}

async function getSocialLinks(parentId, transaction) {
  const links = await getLinkRows('site_settings_cmps', parentId, 'socialLinks', transaction);

  if (!links.length) {
    return [];
  }

  const ids = links.map((link) => link.cmp_id);
  const rows = await selectRows(
    'SELECT * FROM components_common_social_links WHERE id IN (:ids)',
    { ids },
    transaction,
  );
  const rowMap = new Map(rows.map((row) => [row.id, row]));

  return links
    .map((link) => rowMap.get(link.cmp_id))
    .filter(Boolean)
    .map(mapSocialLinkRow);
}

async function getNavigation(parentId, transaction) {
  const link = await selectOne(
    'SELECT * FROM site_settings_cmps WHERE entity_id = :parentId AND field = :field ORDER BY id DESC LIMIT 1',
    { parentId, field: 'navigation' },
    transaction,
  );

  if (!link) {
    return mapNavigationRow(null, []);
  }

  const row = await selectOne(
    'SELECT * FROM components_site_navigations WHERE id = :id',
    { id: link.cmp_id },
    transaction,
  );
  const links = await getSiteLinkItems('components_site_navigations_cmps', link.cmp_id, 'links', transaction);

  return mapNavigationRow(row, links);
}

async function getFooter(parentId, transaction) {
  const link = await selectOne(
    'SELECT * FROM site_settings_cmps WHERE entity_id = :parentId AND field = :field ORDER BY id DESC LIMIT 1',
    { parentId, field: 'footer' },
    transaction,
  );

  if (!link) {
    return mapFooterRow(null, [], [], []);
  }

  const row = await selectOne(
    'SELECT * FROM components_site_footers WHERE id = :id',
    { id: link.cmp_id },
    transaction,
  );

  const serviceLinks = await getSiteLinkItems('components_site_footers_cmps', link.cmp_id, 'serviceLinks', transaction);
  const aboutLinks = await getSiteLinkItems('components_site_footers_cmps', link.cmp_id, 'aboutLinks', transaction);
  const legalLinks = await getSiteLinkItems('components_site_footers_cmps', link.cmp_id, 'legalLinks', transaction);

  return mapFooterRow(row, serviceLinks, aboutLinks, legalLinks);
}

async function getLegalSections(table, recordId, transaction) {
  const links = await getLinkRows(`${table}_cmps`, recordId, 'sections', transaction);

  if (!links.length) {
    return [];
  }

  const ids = links.map((link) => link.cmp_id);
  const rows = await selectRows(
    'SELECT * FROM components_common_legal_sections WHERE id IN (:ids)',
    { ids },
    transaction,
  );
  const rowMap = new Map(rows.map((row) => [row.id, row]));

  return links
    .map((link) => rowMap.get(link.cmp_id))
    .filter(Boolean)
    .map(mapLegalSectionRow);
}

async function getAboutPageComponents(recordId, field, componentTable, mapper, transaction) {
  const links = await getLinkRows('about_pages_cmps', recordId, field, transaction);

  if (!links.length) {
    return [];
  }

  const ids = links.map((link) => link.cmp_id);
  const rows = await selectRows(
    `SELECT * FROM ${componentTable} WHERE id IN (:ids)`,
    { ids },
    transaction,
  );
  const rowMap = new Map(rows.map((row) => [row.id, row]));

  return links
    .map((link) => rowMap.get(link.cmp_id))
    .filter(Boolean)
    .map(mapper);
}

async function getAboutPageMedia(recordId, field, transaction) {
  const relation = await selectOne(
    `SELECT * FROM files_related_mph
     WHERE related_id = :recordId AND related_type = :relatedType AND field = :field
     ORDER BY \`order\` ASC, id ASC
     LIMIT 1`,
    {
      recordId,
      relatedType: 'api::about-page.about-page',
      field,
    },
    transaction,
  );

  if (!relation?.file_id) {
    return '';
  }

  const file = await selectOne(
    'SELECT * FROM files WHERE id = :id',
    { id: relation.file_id },
    transaction,
  );

  return file?.url ? toAbsoluteFileUrl(file.url) : '';
}

async function loadAboutPageFromRecord(record, transaction) {
  if (!record) {
    return {};
  }

  const [storyParagraphs, whyChooseItems, amenities, heroBackgroundImage, storyImage, amenitiesImage] = await Promise.all([
    getAboutPageComponents(record.id, 'storyParagraphs', 'components_common_text_items', mapTextItemRow, transaction),
    getAboutPageComponents(record.id, 'whyChooseItems', 'components_common_feature_items', mapFeatureItemRow, transaction),
    getAboutPageComponents(record.id, 'amenities', 'components_common_amenity_items', mapAmenityItemRow, transaction),
    getAboutPageMedia(record.id, 'heroBackgroundImage', transaction),
    getAboutPageMedia(record.id, 'storyImage', transaction),
    getAboutPageMedia(record.id, 'amenitiesImage', transaction),
  ]);

  return {
    heroTitle: record.hero_title ?? '',
    heroSubtitle: record.hero_subtitle ?? '',
    heroBackgroundImage,
    storyTitle: record.story_title ?? '',
    storyParagraphs,
    storyImage,
    whyChooseTitle: record.why_choose_title ?? '',
    whyChooseItems,
    amenitiesTitle: record.amenities_title ?? '',
    amenitiesImage,
    amenities,
  };
}

async function findFileIdForMediaValue(value, transaction) {
  const normalized = toRelativeFileUrl(value);

  if (!normalized) {
    return null;
  }

  const file = await selectOne(
    'SELECT id FROM files WHERE url = :url OR url = :rawUrl LIMIT 1',
    { url: normalized, rawUrl: value },
    transaction,
  );

  return file?.id ?? null;
}

async function syncAboutPageComponentField({
  recordId,
  field,
  componentTable,
  componentType,
  columns,
  items,
  transaction,
}) {
  const existingLinks = await getLinkRows('about_pages_cmps', recordId, field, transaction);
  const existingIds = existingLinks.map((link) => link.cmp_id);

  await sequelize.query(
    'DELETE FROM about_pages_cmps WHERE entity_id = :recordId AND field = :field',
    {
      replacements: { recordId, field },
      transaction,
    },
  );

  if (existingIds.length) {
    await sequelize.query(
      `DELETE FROM ${componentTable} WHERE id IN (:ids)`,
      {
        replacements: { ids: existingIds },
        transaction,
      },
    );
  }

  const normalizedItems = (items ?? []).map((item) => normalizeForSave(item));

  for (const [index, item] of normalizedItems.entries()) {
    const replacements = {};
    columns.forEach((column) => {
      replacements[column] = item[column] ?? null;
    });

    const [insertId, metadata] = await sequelize.query(
      `INSERT INTO ${componentTable} (${columns.join(', ')}) VALUES (${columns.map((column) => `:${column}`).join(', ')})`,
      {
        replacements,
        transaction,
      },
    );

    const cmpId = typeof insertId === 'number' ? insertId : metadata?.insertId ?? null;

    if (!cmpId) {
      continue;
    }

    await sequelize.query(
      `INSERT INTO about_pages_cmps (entity_id, cmp_id, component_type, field, \`order\`)
       VALUES (:recordId, :cmpId, :componentType, :field, :order)`,
      {
        replacements: {
          recordId,
          cmpId,
          componentType,
          field,
          order: index + 1,
        },
        transaction,
      },
    );
  }
}

async function syncAboutPageMediaField(recordId, field, value, transaction) {
  await sequelize.query(
    `DELETE FROM files_related_mph
     WHERE related_id = :recordId AND related_type = :relatedType AND field = :field`,
    {
      replacements: {
        recordId,
        relatedType: 'api::about-page.about-page',
        field,
      },
      transaction,
    },
  );

  const fileId = await findFileIdForMediaValue(value, transaction);

  if (!fileId) {
    return;
  }

  await sequelize.query(
    `INSERT INTO files_related_mph (file_id, related_id, related_type, field, \`order\`)
     VALUES (:fileId, :recordId, :relatedType, :field, 1)`,
    {
      replacements: {
        fileId,
        recordId,
        relatedType: 'api::about-page.about-page',
        field,
      },
      transaction,
    },
  );
}

async function saveAboutPageToRecord(record, content, transaction) {
  if (!record) {
    throw new Error('About Page record was not found in the live database.');
  }

  const nextContent = normalizeForSave(content);

  await sequelize.query(
    `UPDATE about_pages
     SET
       hero_title = :heroTitle,
       hero_subtitle = :heroSubtitle,
       story_title = :storyTitle,
       why_choose_title = :whyChooseTitle,
       amenities_title = :amenitiesTitle,
       updated_at = NOW(6)
     WHERE id = :id`,
    {
      replacements: {
        id: record.id,
        heroTitle: nextContent.heroTitle ?? '',
        heroSubtitle: nextContent.heroSubtitle ?? '',
        storyTitle: nextContent.storyTitle ?? '',
        whyChooseTitle: nextContent.whyChooseTitle ?? '',
        amenitiesTitle: nextContent.amenitiesTitle ?? '',
      },
      transaction,
    },
  );

  await syncAboutPageComponentField({
    recordId: record.id,
    field: 'storyParagraphs',
    componentTable: 'components_common_text_items',
    componentType: 'common.text-item',
    columns: ['text'],
    items: nextContent.storyParagraphs ?? [],
    transaction,
  });

  await syncAboutPageComponentField({
    recordId: record.id,
    field: 'whyChooseItems',
    componentTable: 'components_common_feature_items',
    componentType: 'common.feature-item',
    columns: ['icon', 'title', 'description'],
    items: nextContent.whyChooseItems ?? [],
    transaction,
  });

  await syncAboutPageComponentField({
    recordId: record.id,
    field: 'amenities',
    componentTable: 'components_common_amenity_items',
    componentType: 'common.amenity-item',
    columns: ['icon', 'title', 'description'],
    items: nextContent.amenities ?? [],
    transaction,
  });

  await syncAboutPageMediaField(record.id, 'heroBackgroundImage', nextContent.heroBackgroundImage, transaction);
  await syncAboutPageMediaField(record.id, 'storyImage', nextContent.storyImage, transaction);
  await syncAboutPageMediaField(record.id, 'amenitiesImage', nextContent.amenitiesImage, transaction);
}

async function saveAboutPage(content) {
  return sequelize.transaction(async (transaction) => {
    const { draftRow } = await getPageVersions('about_pages', transaction);
    await saveAboutPageToRecord(draftRow, content, transaction);
    return loadAboutPageFromRecord(draftRow, transaction);
  });
}

async function publishAboutPage(content) {
  return sequelize.transaction(async (transaction) => {
    const { draftRow } = await getPageVersions('about_pages', transaction);
    const publishedRow = await ensurePublishedPageRow('about_pages', transaction);
    if (draftRow) {
      await saveAboutPageToRecord(draftRow, content, transaction);
    }
    await saveAboutPageToRecord(publishedRow, content, transaction);
    await sequelize.query(
      'UPDATE about_pages SET published_at = NOW(6), updated_at = NOW(6) WHERE id = :id',
      {
        replacements: { id: publishedRow.id },
        transaction,
      },
    );

    return loadAboutPageFromRecord(
      await selectOne('SELECT * FROM about_pages WHERE id = :id', { id: publishedRow.id }, transaction),
      transaction,
    );
  });
}

async function unpublishAboutPage() {
  return sequelize.transaction(async (transaction) => {
    const { draftRow, publishedRow } = await getPageVersions('about_pages', transaction);

    if (!publishedRow) {
      return {
        draftData: draftRow ? await loadAboutPageFromRecord(draftRow, transaction) : {},
        publishedData: null,
      };
    }

    await sequelize.query('DELETE FROM about_pages_cmps WHERE entity_id = :entityId', {
      replacements: { entityId: publishedRow.id },
      transaction,
    });
    await sequelize.query(
      `DELETE FROM files_related_mph
       WHERE related_id = :recordId AND related_type = :relatedType`,
      {
        replacements: {
          recordId: publishedRow.id,
          relatedType: 'api::about-page.about-page',
        },
        transaction,
      },
    );

    if (draftRow) {
      await sequelize.query('DELETE FROM about_pages WHERE id = :id', {
        replacements: { id: publishedRow.id },
        transaction,
      });

      return {
        draftData: await loadAboutPageFromRecord(draftRow, transaction),
        publishedData: null,
      };
    }

    await sequelize.query(
      'UPDATE about_pages SET published_at = NULL, updated_at = NOW(6) WHERE id = :id',
      {
        replacements: { id: publishedRow.id },
        transaction,
      },
    );

    return {
      draftData: await loadAboutPageFromRecord(publishedRow, transaction),
      publishedData: null,
    };
  });
}

async function syncRepeatableLinks({
  parentId,
  parentLinkTable,
  field,
  componentTable,
  componentColumns,
  items,
  transaction,
}) {
  const existingLinks = await getLinkRows(parentLinkTable, parentId, field, transaction);
  const existingIds = new Set(existingLinks.map((link) => link.cmp_id));
  const nextIds = [];

  for (const [index, rawItem] of items.entries()) {
    const item = normalizeForSave(rawItem);
    const itemId = Number(item.id) || null;
    const replacements = {};

    componentColumns.forEach((column) => {
      replacements[column] = item[column] ?? null;
    });

    let nextId = itemId && existingIds.has(itemId) ? itemId : null;

    if (nextId) {
      const assignments = componentColumns.map((column) => `${column} = :${column}`).join(', ');
      await sequelize.query(
        `UPDATE ${componentTable} SET ${assignments} WHERE id = :id`,
        {
          replacements: { ...replacements, id: nextId },
          transaction,
        },
      );
    } else {
      const columns = componentColumns.join(', ');
      const values = componentColumns.map((column) => `:${column}`).join(', ');
      const [insertId, metadata] = await sequelize.query(
        `INSERT INTO ${componentTable} (${columns}) VALUES (${values})`,
        {
          replacements,
          transaction,
        },
      );
      nextId = typeof insertId === 'number' ? insertId : null;
      if (!nextId && typeof metadata !== 'number') {
        nextId = metadata?.insertId ?? null;
      }
    }

    if (!nextId) {
      continue;
    }

    nextIds.push(nextId);

    await sequelize.query(
      `INSERT INTO ${parentLinkTable} (entity_id, cmp_id, component_type, field, \`order\`) VALUES (:parentId, :cmpId, :componentType, :field, :order)`,
      {
        replacements: {
          parentId,
          cmpId: nextId,
          componentType:
            componentTable === 'components_common_site_links'
              ? 'common.site-link'
              : componentTable === 'components_common_social_links'
                ? 'common.social-link'
                : 'common.legal-section',
          field,
          order: index + 1,
        },
        transaction,
      },
    );
  }

  await sequelize.query(
    `DELETE FROM ${parentLinkTable} WHERE entity_id = :parentId AND field = :field AND cmp_id NOT IN (:nextIds)`,
    {
      replacements: {
        parentId,
        field,
        nextIds: nextIds.length ? nextIds : [0],
      },
      transaction,
    },
  );
}

async function upsertSingleLink({
  parentId,
  parentLinkTable,
  field,
  componentTable,
  componentColumns,
  content,
  transaction,
}) {
  const existingLink = await selectOne(
    `SELECT * FROM ${parentLinkTable} WHERE entity_id = :parentId AND field = :field ORDER BY id DESC LIMIT 1`,
    { parentId, field },
    transaction,
  );
  const replacements = {};

  componentColumns.forEach((column) => {
    replacements[column] = content[column] ?? null;
  });

  let componentId = existingLink?.cmp_id ?? null;

  if (componentId) {
    const assignments = componentColumns.map((column) => `${column} = :${column}`).join(', ');
    await sequelize.query(
      `UPDATE ${componentTable} SET ${assignments} WHERE id = :id`,
      {
        replacements: { ...replacements, id: componentId },
        transaction,
      },
    );
  } else {
    const columns = componentColumns.join(', ');
    const values = componentColumns.map((column) => `:${column}`).join(', ');
    const [insertId, metadata] = await sequelize.query(
      `INSERT INTO ${componentTable} (${columns}) VALUES (${values})`,
      {
        replacements,
        transaction,
      },
    );
    componentId = typeof insertId === 'number' ? insertId : null;
    if (!componentId && typeof metadata !== 'number') {
      componentId = metadata?.insertId ?? null;
    }
  }

  if (!componentId) {
    return null;
  }

  await sequelize.query(
    `DELETE FROM ${parentLinkTable} WHERE entity_id = :parentId AND field = :field`,
    {
      replacements: { parentId, field },
      transaction,
    },
  );

  await sequelize.query(
    `INSERT INTO ${parentLinkTable} (entity_id, cmp_id, component_type, field, \`order\`) VALUES (:parentId, :cmpId, :componentType, :field, :order)`,
    {
      replacements: {
        parentId,
        cmpId: componentId,
        componentType:
          componentTable === 'components_site_navigations' ? 'site.navigation' : 'site.footer',
        field,
        order: field === 'navigation' ? 1 : null,
      },
      transaction,
    },
  );

  return componentId;
}

async function loadSiteSettingsPageFromRecord(record, transaction) {
  if (!record) {
    return {};
  }

  const [navigation, footer, socialLinks] = await Promise.all([
    getNavigation(record.id, transaction),
    getFooter(record.id, transaction),
    getSocialLinks(record.id, transaction),
  ]);

  return {
    ...mapRowToSiteSettings(record),
    navigation,
    footer,
    socialLinks,
  };
}

async function saveSiteSettingsPageToRecord(record, content, transaction) {
  if (!record) {
    throw new Error('Site settings record was not found in the copied database.');
  }

  const nextContent = normalizeForSave(content);

  await sequelize.query(
    `UPDATE site_settings
    SET
      site_name = :siteName,
      tagline = :tagline,
      contact_email = :contactEmail,
      contact_phone = :contactPhone,
      address = :address,
      default_seo_title = :defaultSeoTitle,
      default_seo_description = :defaultSeoDescription,
      updated_at = NOW(6)
    WHERE id = :id`,
    {
      replacements: {
        id: record.id,
        siteName: nextContent.siteName ?? '',
        tagline: nextContent.tagline ?? '',
        contactEmail: nextContent.contactEmail ?? '',
        contactPhone: nextContent.contactPhone ?? '',
        address: nextContent.address ?? '',
        defaultSeoTitle: nextContent.defaultSeoTitle ?? '',
        defaultSeoDescription: nextContent.defaultSeoDescription ?? '',
      },
      transaction,
    },
  );

  const navigationId = await upsertSingleLink({
    parentId: record.id,
    parentLinkTable: 'site_settings_cmps',
    field: 'navigation',
    componentTable: 'components_site_navigations',
    componentColumns: ['cta_label', 'cta_path'],
    content: {
      cta_label: nextContent.navigation?.ctaLabel ?? '',
      cta_path: nextContent.navigation?.ctaPath ?? '',
    },
    transaction,
  });

  if (navigationId) {
    await sequelize.query(
      'DELETE FROM components_site_navigations_cmps WHERE entity_id = :entityId',
      {
        replacements: { entityId: navigationId },
        transaction,
      },
    );

    await syncRepeatableLinks({
      parentId: navigationId,
      parentLinkTable: 'components_site_navigations_cmps',
      field: 'links',
      componentTable: 'components_common_site_links',
      componentColumns: ['name', 'path'],
      items: nextContent.navigation?.links ?? [],
      transaction,
    });
  }

  const footerId = await upsertSingleLink({
    parentId: record.id,
    parentLinkTable: 'site_settings_cmps',
    field: 'footer',
    componentTable: 'components_site_footers',
    componentColumns: ['description', 'contact_title', 'copyright'],
    content: {
      description: nextContent.footer?.description ?? '',
      contact_title: nextContent.footer?.contactTitle ?? '',
      copyright: nextContent.footer?.copyright ?? '',
    },
    transaction,
  });

  if (footerId) {
    await sequelize.query(
      'DELETE FROM components_site_footers_cmps WHERE entity_id = :entityId',
      {
        replacements: { entityId: footerId },
        transaction,
      },
    );

    await syncRepeatableLinks({
      parentId: footerId,
      parentLinkTable: 'components_site_footers_cmps',
      field: 'serviceLinks',
      componentTable: 'components_common_site_links',
      componentColumns: ['name', 'path'],
      items: nextContent.footer?.serviceLinks ?? [],
      transaction,
    });

    await syncRepeatableLinks({
      parentId: footerId,
      parentLinkTable: 'components_site_footers_cmps',
      field: 'aboutLinks',
      componentTable: 'components_common_site_links',
      componentColumns: ['name', 'path'],
      items: nextContent.footer?.aboutLinks ?? [],
      transaction,
    });

    await syncRepeatableLinks({
      parentId: footerId,
      parentLinkTable: 'components_site_footers_cmps',
      field: 'legalLinks',
      componentTable: 'components_common_site_links',
      componentColumns: ['name', 'path'],
      items: nextContent.footer?.legalLinks ?? [],
      transaction,
    });
  }

  await sequelize.query(
    'DELETE FROM site_settings_cmps WHERE entity_id = :entityId AND field = :field',
    {
      replacements: { entityId: record.id, field: 'socialLinks' },
      transaction,
    },
  );

  await syncRepeatableLinks({
    parentId: record.id,
    parentLinkTable: 'site_settings_cmps',
    field: 'socialLinks',
    componentTable: 'components_common_social_links',
    componentColumns: ['label', 'href', 'icon'],
    items: nextContent.socialLinks ?? [],
    transaction,
  });
}

async function ensurePublishedSiteSettingsRow(transaction) {
  const { draftRow, publishedRow } = await getSiteSettingsVersions(transaction);

  if (!draftRow) {
    throw new Error('Site settings draft record was not found in the copied database.');
  }

  if (publishedRow) {
    return publishedRow;
  }

  const [insertId, metadata] = await sequelize.query(
    `INSERT INTO site_settings (document_id, created_at, updated_at, published_at)
     VALUES (:documentId, NOW(6), NOW(6), NOW(6))`,
    {
      replacements: {
        documentId: draftRow.document_id,
      },
      transaction,
    },
  );

  const publishedId = typeof insertId === 'number' ? insertId : metadata?.insertId ?? null;
  return selectOne('SELECT * FROM site_settings WHERE id = :id', { id: publishedId }, transaction);
}

async function saveSiteSettingsPage(content) {
  return sequelize.transaction(async (transaction) => {
    const { draftRow } = await getSiteSettingsVersions(transaction);
    await saveSiteSettingsPageToRecord(draftRow, content, transaction);
    return loadSiteSettingsPageFromRecord(draftRow, transaction);
  });
}

async function publishSiteSettingsPage(content) {
  return sequelize.transaction(async (transaction) => {
    const { draftRow } = await getSiteSettingsVersions(transaction);
    const publishedRow = await ensurePublishedSiteSettingsRow(transaction);
    if (draftRow) {
      await saveSiteSettingsPageToRecord(draftRow, content, transaction);
    }
    await saveSiteSettingsPageToRecord(publishedRow, content, transaction);
    await sequelize.query(
      'UPDATE site_settings SET published_at = NOW(6), updated_at = NOW(6) WHERE id = :id',
      {
        replacements: { id: publishedRow.id },
        transaction,
      },
    );
    return loadSiteSettingsPageFromRecord(
      await selectOne('SELECT * FROM site_settings WHERE id = :id', { id: publishedRow.id }, transaction),
      transaction,
    );
  });
}

async function loadJsonPageFromRecord(record, column) {
  if (!record) {
    return {};
  }

  return parseJsonValue(record[column]);
}

async function loadPublishedJsonPageFromRecord(record, column) {
  if (!record || record[column] == null || record[column] === '') {
    return null;
  }

  return parseJsonValue(record[column]);
}

async function saveJsonPage(column, content) {
  return sequelize.transaction(async (transaction) => {
    const { draftRow } = await getSiteSettingsVersions(transaction);

    if (!draftRow) {
      throw new Error('Site settings record was not found in the copied database.');
    }

    await sequelize.query(
      `UPDATE site_settings SET ${column} = :content, updated_at = NOW(6) WHERE id = :id`,
      {
        replacements: {
          id: draftRow.id,
          content: JSON.stringify(normalizeForSave(content)),
        },
        transaction,
      },
    );

    return loadJsonPageFromRecord(draftRow, column);
  });
}

async function ensurePublishedPageRow(table, transaction) {
  const { draftRow, publishedRow } = await getPageVersions(table, transaction);

  if (!draftRow) {
    throw new Error(`No draft record found for ${table}.`);
  }

  if (publishedRow) {
    return publishedRow;
  }

  const [insertId, metadata] = await sequelize.query(
    `INSERT INTO ${table} (document_id, created_at, updated_at, published_at)
     VALUES (:documentId, NOW(6), NOW(6), NOW(6))`,
    {
      replacements: { documentId: draftRow.document_id },
      transaction,
    },
  );
  const publishedId = typeof insertId === 'number' ? insertId : metadata?.insertId ?? null;
  return selectOne(`SELECT * FROM ${table} WHERE id = :id`, { id: publishedId }, transaction);
}

async function loadLegalPageFromRecord(table, record, transaction) {
  if (!record) {
    return {};
  }

  return {
    heroTitle: record.hero_title ?? '',
    heroSubtitle: record.hero_subtitle ?? '',
    effectiveDateLabel: record.effective_date_label ?? '',
    effectiveDateValue: record.effective_date_value ?? '',
    introText: record.intro_text ?? '',
    sections: await getLegalSections(table, record.id, transaction),
    contactTitle: record.contact_title ?? '',
    contactBody: record.contact_body ?? '',
    contactButtonLabel: record.contact_button_label ?? '',
  };
}

async function saveLegalPageToRecord(table, record, content, transaction) {
  if (!record) {
    throw new Error(`No record found for ${table} in the copied database.`);
  }

  const nextContent = normalizeForSave(content);

  await sequelize.query(
    `UPDATE ${table}
    SET
      hero_title = :heroTitle,
      hero_subtitle = :heroSubtitle,
      effective_date_label = :effectiveDateLabel,
      effective_date_value = :effectiveDateValue,
      intro_text = :introText,
      contact_title = :contactTitle,
      contact_body = :contactBody,
      contact_button_label = :contactButtonLabel,
      updated_at = NOW(6)
    WHERE id = :id`,
    {
      replacements: {
        id: record.id,
        heroTitle: nextContent.heroTitle ?? '',
        heroSubtitle: nextContent.heroSubtitle ?? '',
        effectiveDateLabel: nextContent.effectiveDateLabel ?? '',
        effectiveDateValue: nextContent.effectiveDateValue ?? '',
        introText: nextContent.introText ?? '',
        contactTitle: nextContent.contactTitle ?? '',
        contactBody: nextContent.contactBody ?? '',
        contactButtonLabel: nextContent.contactButtonLabel ?? '',
      },
      transaction,
    },
  );

  await sequelize.query(
    `DELETE FROM ${table}_cmps WHERE entity_id = :entityId AND field = :field`,
    {
      replacements: { entityId: record.id, field: 'sections' },
      transaction,
    },
  );

  await syncRepeatableLinks({
    parentId: record.id,
    parentLinkTable: `${table}_cmps`,
    field: 'sections',
    componentTable: 'components_common_legal_sections',
    componentColumns: ['title', 'body'],
    items: nextContent.sections ?? [],
    transaction,
  });
}

async function saveLegalPage(table, content) {
  return sequelize.transaction(async (transaction) => {
    const { draftRow } = await getPageVersions(table, transaction);
    await saveLegalPageToRecord(table, draftRow, content, transaction);
    return loadLegalPageFromRecord(table, draftRow, transaction);
  });
}

async function publishLegalPage(table, content) {
  return sequelize.transaction(async (transaction) => {
    const { draftRow } = await getPageVersions(table, transaction);
    const publishedRow = await ensurePublishedPageRow(table, transaction);
    if (draftRow) {
      await saveLegalPageToRecord(table, draftRow, content, transaction);
    }
    await saveLegalPageToRecord(table, publishedRow, content, transaction);
    await sequelize.query(
      `UPDATE ${table} SET published_at = NOW(6), updated_at = NOW(6) WHERE id = :id`,
      {
        replacements: { id: publishedRow.id },
        transaction,
      },
    );
    return loadLegalPageFromRecord(
      table,
      await selectOne(`SELECT * FROM ${table} WHERE id = :id`, { id: publishedRow.id }, transaction),
      transaction,
    );
  });
}

async function publishJsonPage(column, content) {
  return sequelize.transaction(async (transaction) => {
    const { draftRow } = await getSiteSettingsVersions(transaction);
    if (draftRow) {
      await sequelize.query(
        `UPDATE site_settings SET ${column} = :content, updated_at = NOW(6) WHERE id = :id`,
        {
          replacements: {
            id: draftRow.id,
            content: JSON.stringify(normalizeForSave(content)),
          },
          transaction,
        },
      );
    }

    const publishedRow = await ensurePublishedSiteSettingsRow(transaction);
    await sequelize.query(
      `UPDATE site_settings SET ${column} = :content, updated_at = NOW(6), published_at = NOW(6) WHERE id = :id`,
      {
        replacements: {
          id: publishedRow.id,
          content: JSON.stringify(normalizeForSave(content)),
        },
        transaction,
      },
    );

    return loadJsonPageFromRecord(publishedRow, column);
  });
}

async function unpublishSiteSettingsPage() {
  return sequelize.transaction(async (transaction) => {
    const { draftRow, publishedRow } = await getSiteSettingsVersions(transaction);

    if (!publishedRow) {
      return {
        draftData: await loadSiteSettingsPageFromRecord(draftRow, transaction),
        publishedData: null,
      };
    }

    const navigationLinks = await selectRows(
      'SELECT * FROM site_settings_cmps WHERE entity_id = :entityId AND field = :field',
      { entityId: publishedRow.id, field: 'navigation' },
      transaction,
    );
    const footerLinks = await selectRows(
      'SELECT * FROM site_settings_cmps WHERE entity_id = :entityId AND field = :field',
      { entityId: publishedRow.id, field: 'footer' },
      transaction,
    );
    const socialLinks = await selectRows(
      'SELECT * FROM site_settings_cmps WHERE entity_id = :entityId AND field = :field',
      { entityId: publishedRow.id, field: 'socialLinks' },
      transaction,
    );

    await sequelize.query(
      `UPDATE site_settings
      SET
        site_name = '',
        tagline = '',
        contact_email = '',
        contact_phone = '',
        address = '',
        default_seo_title = '',
        default_seo_description = '',
        updated_at = NOW(6)
      WHERE id = :id`,
      {
        replacements: { id: publishedRow.id },
        transaction,
      },
    );

    await sequelize.query(
      'DELETE FROM site_settings_cmps WHERE entity_id = :entityId AND field IN (:fields)',
      {
        replacements: {
          entityId: publishedRow.id,
          fields: ['navigation', 'footer', 'socialLinks'],
        },
        transaction,
      },
    );

    if (navigationLinks.length) {
      const ids = navigationLinks.map((link) => link.cmp_id);
      await sequelize.query('DELETE FROM components_site_navigations_cmps WHERE entity_id IN (:ids)', {
        replacements: { ids },
        transaction,
      });
      await sequelize.query('DELETE FROM components_site_navigations WHERE id IN (:ids)', {
        replacements: { ids },
        transaction,
      });
    }

    if (footerLinks.length) {
      const ids = footerLinks.map((link) => link.cmp_id);
      await sequelize.query('DELETE FROM components_site_footers_cmps WHERE entity_id IN (:ids)', {
        replacements: { ids },
        transaction,
      });
      await sequelize.query('DELETE FROM components_site_footers WHERE id IN (:ids)', {
        replacements: { ids },
        transaction,
      });
    }

    if (socialLinks.length) {
      const ids = socialLinks.map((link) => link.cmp_id);
      await sequelize.query('DELETE FROM components_common_social_links WHERE id IN (:ids)', {
        replacements: { ids },
        transaction,
      });
    }

    const draftData = await loadSiteSettingsPageFromRecord(draftRow, transaction);
    return {
      draftData,
      publishedData: null,
    };
  });
}

async function unpublishJsonPage(column) {
  return sequelize.transaction(async (transaction) => {
    const { draftRow, publishedRow } = await getSiteSettingsVersions(transaction);
    if (publishedRow) {
      await sequelize.query(
        `UPDATE site_settings SET ${column} = NULL, updated_at = NOW(6) WHERE id = :id`,
        {
          replacements: { id: publishedRow.id },
          transaction,
        },
      );
    }

    return {
      draftData: await loadJsonPageFromRecord(draftRow, column),
      publishedData: null,
    };
  });
}

async function unpublishLegalPage(table) {
  return sequelize.transaction(async (transaction) => {
    const { draftRow, publishedRow } = await getPageVersions(table, transaction);

    if (!publishedRow) {
      return {
        draftData: draftRow ? await loadLegalPageFromRecord(table, draftRow, transaction) : {},
        publishedData: null,
      };
    }

    if (draftRow) {
      await sequelize.query(`DELETE FROM ${table}_cmps WHERE entity_id = :entityId`, {
        replacements: { entityId: publishedRow.id },
        transaction,
      });
      await sequelize.query(`DELETE FROM ${table} WHERE id = :id`, {
        replacements: { id: publishedRow.id },
        transaction,
      });
    } else {
      await sequelize.query(
        `UPDATE ${table} SET published_at = NULL, updated_at = NOW(6) WHERE id = :id`,
        {
          replacements: { id: publishedRow.id },
          transaction,
        },
      );
    }

    const nextDraftRow = draftRow ?? await selectOne(`SELECT * FROM ${table} WHERE id = :id`, { id: publishedRow.id }, transaction);

    return {
      draftData: nextDraftRow ? await loadLegalPageFromRecord(table, nextDraftRow, transaction) : {},
      publishedData: null,
    };
  });
}

async function loadContentPageState(definition) {
  if (definition.kind === 'site-settings') {
    const { draftRow, publishedRow } = await getSiteSettingsVersions();
    const draftData = await loadSiteSettingsPageFromRecord(draftRow);
    const rawPublishedData = publishedRow ? await loadSiteSettingsPageFromRecord(publishedRow) : null;
    return {
      draftData,
      publishedData: rawPublishedData && hasMeaningfulValue(rawPublishedData) ? rawPublishedData : null,
    };
  }

  if (definition.kind === 'json-column') {
    const { draftRow, publishedRow } = await getSiteSettingsVersions();
    return {
      draftData: await loadJsonPageFromRecord(draftRow, definition.column),
      publishedData: await loadPublishedJsonPageFromRecord(publishedRow, definition.column),
    };
  }

  if (definition.kind === 'about-page-record') {
    const { draftRow, publishedRow } = await getPageVersions('about_pages');
    return {
      draftData: await loadAboutPageFromRecord(draftRow),
      publishedData: publishedRow ? await loadAboutPageFromRecord(publishedRow) : null,
    };
  }

  const { draftRow, publishedRow } = await getPageVersions(definition.table);
  return {
    draftData: await loadLegalPageFromRecord(definition.table, draftRow),
    publishedData: publishedRow ? await loadLegalPageFromRecord(definition.table, publishedRow) : null,
  };
}

export function getContentPageDefinitions() {
  return PAGE_DEFINITIONS;
}

export async function getContentPagePublicData(pageName, status = 'published') {
  const definition = PAGE_DEFINITION_MAP[pageName];

  if (!definition) {
    throw new Error(`Unknown content page: ${pageName}`);
  }

  const state = await loadContentPageState(definition);
  return status === 'draft' ? state.draftData : (state.publishedData ?? state.draftData);
}

export async function handleContentPage(pageName, request) {
  const definition = PAGE_DEFINITION_MAP[pageName];

  if (!definition) {
    throw new Error(`Unknown content page: ${pageName}`);
  }

  const method = request.method?.toLowerCase?.() ?? 'get';
  const intent = request.payload?.intent ?? 'save';

  if (method === 'post') {
    const content = request.payload?.content ?? request.payload ?? {};
    let state;

    if (definition.kind === 'site-settings') {
      if (intent === 'publish') {
        await publishSiteSettingsPage(content);
      } else if (intent === 'unpublish') {
        state = await unpublishSiteSettingsPage();
      } else {
        await saveSiteSettingsPage(content);
      }
    } else if (definition.kind === 'json-column') {
      if (intent === 'publish') {
        await publishJsonPage(definition.column, content);
      } else if (intent === 'unpublish') {
        state = await unpublishJsonPage(definition.column);
      } else {
        await saveJsonPage(definition.column, content);
      }
    } else if (definition.kind === 'about-page-record') {
      if (intent === 'publish') {
        await publishAboutPage(content);
      } else if (intent === 'unpublish') {
        state = await unpublishAboutPage();
      } else {
        await saveAboutPage(content);
      }
    } else {
      if (intent === 'publish') {
        await publishLegalPage(definition.table, content);
      } else if (intent === 'unpublish') {
        state = await unpublishLegalPage(definition.table);
      } else {
        await saveLegalPage(definition.table, content);
      }
    }

    const nextState = state ?? await loadContentPageState(definition);

    return {
      ok: true,
      label: definition.label,
      data: nextState.draftData,
      draftData: nextState.draftData,
      publishedData: nextState.publishedData,
      hasPublished: Boolean(nextState.publishedData),
      notice: {
        message:
          intent === 'publish'
            ? `${definition.label} published to the live content database.`
            : intent === 'unpublish'
              ? `${definition.label} unpublished in the live content database.`
              : `${definition.label} saved to the live content database.`,
        type: 'success',
      },
    };
  }
  const { draftData, publishedData } = await loadContentPageState(definition);

  return {
    ok: true,
    label: definition.label,
    data: draftData,
    draftData,
    publishedData,
    hasPublished: Boolean(publishedData),
  };
}
