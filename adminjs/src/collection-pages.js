import { randomUUID } from 'node:crypto';
import { sequelize } from './database.js';

const COLLECTION_DEFINITIONS = [
  {
    name: 'blog-posts',
    label: 'Blog Post',
    pluralLabel: 'Blog Posts',
    icon: 'Book',
    table: 'blog_posts',
    titleField: 'title',
    kind: 'blog-posts',
    listColumns: ['title', 'category', 'publishedDate', 'featured'],
    filterFields: ['status', 'category', 'featured'],
    sortableFields: ['title', 'category', 'publishedDate', 'featured', 'updatedAt', 'status'],
    editLayout: [
      ['title'],
      ['excerpt'],
      ['content'],
      ['contentImages'],
      ['proTipTitle', 'proTipText'],
      ['category'],
      ['readTime', 'author'],
      ['tags'],
      ['featured'],
      ['coverImage'],
    ],
  },
  {
    name: 'faq-items',
    label: 'FAQ Item',
    pluralLabel: 'FAQ Items',
    icon: 'HelpCircle',
    table: 'faq_items',
    titleField: 'question',
    kind: 'faq-items',
    listColumns: ['question', 'answer', 'isFeatured'],
    filterFields: ['status', 'isFeatured'],
    sortableFields: ['question', 'sortOrder', 'isFeatured', 'updatedAt', 'status'],
    editLayout: [
      ['question'],
      ['answer'],
      ['sortOrder', 'isFeatured'],
    ],
  },
  {
    name: 'meeting-rooms',
    label: 'Meeting Room',
    pluralLabel: 'Meeting Rooms',
    icon: 'Users',
    table: 'meeting_rooms',
    titleField: 'name',
    kind: 'meeting-rooms',
    listColumns: ['name', 'capacity', 'sortOrder', 'isFeatured'],
    filterFields: ['status', 'isFeatured'],
    sortableFields: ['name', 'capacity', 'sortOrder', 'isFeatured', 'updatedAt', 'status'],
    editLayout: [
      ['name'],
      ['description'],
      ['capacity', 'sortOrder'],
      ['features'],
      ['badges'],
      ['isFeatured'],
      ['image'],
    ],
  },
  {
    name: 'pricing-plans',
    label: 'Pricing Plan',
    pluralLabel: 'Pricing Plans',
    icon: 'CreditCard',
    table: 'pricing_plans',
    titleField: 'name',
    kind: 'pricing-plans',
    listColumns: ['name', 'planType', 'price', 'isPopular'],
    filterFields: ['status', 'planType', 'isPopular'],
    sortableFields: ['name', 'planType', 'price', 'sortOrder', 'isPopular', 'updatedAt', 'status'],
    editLayout: [
      ['name'],
      ['planType', 'price'],
      ['period', 'sortOrder'],
      ['description'],
      ['features'],
      ['isPopular'],
    ],
  },
];

const COLLECTION_MAP = Object.fromEntries(
  COLLECTION_DEFINITIONS.map((definition) => [definition.name, definition]),
);

function toLabel(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\bseo\b/gi, 'SEO')
    .replace(/\bcta\b/gi, 'CTA')
    .replace(/\bfaq\b/gi, 'FAQ')
    .replace(/^./, (value) => value.toUpperCase());
}

function parseJson(value, fallback) {
  if (!value) {
    return fallback;
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  return value;
}

function slugify(value) {
  const normalized = String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized.slice(0, 240).replace(/-+$/g, '');
}

function getAutoSlug(definition, content) {
  const primaryValue = definition.kind === 'blog-posts'
    ? content.title
    : content.name;
  const preferredSlug = slugify(primaryValue);

  if (preferredSlug) {
    return preferredSlug;
  }

  const existingSlug = slugify(content.slug);
  if (existingSlug) {
    return existingSlug;
  }

  return slugify(`${definition.kind}-${randomUUID().slice(0, 8)}`);
}

function getCurrentPublishedDate() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function normalizePlanType(value) {
  const normalized = String(value ?? '').trim().toLowerCase();

  if (normalized.includes('meeting')) {
    return 'meeting-room';
  }

  return 'coworking';
}

function getSortTieBreakerValue(record) {
  return String(record?.title ?? record?.name ?? record?.question ?? record?.slug ?? record?.documentId ?? '').toLowerCase();
}

function normalizeReadTimeForStorage(value) {
  const raw = String(value ?? '').trim();

  if (!raw) {
    return '';
  }

  return raw.replace(/\s*read\s*$/i, '').trim();
}

function normalizeReadTimeForAdmin(value) {
  return normalizeReadTimeForStorage(value);
}

function normalizeForSave(value) {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeForSave(item));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== 'id')
        .map(([key, nestedValue]) => [key, normalizeForSave(nestedValue)]),
    );
  }

  return value;
}

function hasMeaningfulValue(value) {
  if (Array.isArray(value)) {
    return value.some((item) => hasMeaningfulValue(item));
  }

  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([key]) => !['id', 'documentId', 'status', 'updatedAt', 'publishedAt'].includes(key))
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

async function selectRows(query, replacements = {}, transaction) {
  const [rows] = await sequelize.query(query, {
    replacements,
    transaction,
  });

  return rows;
}

async function selectOne(query, replacements = {}, transaction) {
  const rows = await selectRows(query, replacements, transaction);
  return rows[0] ?? null;
}

function mapRowFromTable(definition, row) {
  if (!row) {
    return null;
  }

  switch (definition.kind) {
    case 'blog-posts':
      return {
        id: row.id,
        documentId: row.document_id,
        title: row.title ?? '',
        slug: row.slug ?? '',
        excerpt: row.excerpt ?? '',
        content: row.content ?? '',
        contentImages: parseJson(row.content_image_urls, []),
        proTipTitle: row.pro_tip_title ?? '',
        proTipText: row.pro_tip_text ?? '',
        category: row.category ?? '',
        publishedDate: row.published_date ?? '',
        readTime: normalizeReadTimeForAdmin(row.read_time),
        author: row.author ?? '',
        tags: [],
        featured: Boolean(row.featured),
        coverImage: row.cover_image_url ?? '',
        publishedAt: row.published_at,
        updatedAt: row.updated_at,
      };
    case 'faq-items':
      return {
        id: row.id,
        documentId: row.document_id,
        question: row.question ?? '',
        answer: row.answer ?? '',
        sortOrder: row.sort_order ?? 1,
        isFeatured: Boolean(row.is_featured),
        publishedAt: row.published_at,
        updatedAt: row.updated_at,
      };
    case 'meeting-rooms':
      return {
        id: row.id,
        documentId: row.document_id,
        name: row.name ?? '',
        slug: row.slug ?? '',
        description: row.description ?? '',
        capacity: row.capacity ?? 0,
        sortOrder: row.sort_order ?? 1,
        isFeatured: Boolean(row.is_featured),
        features: [],
        badges: [],
        image: row.image_url ?? '',
        publishedAt: row.published_at,
        updatedAt: row.updated_at,
      };
    case 'pricing-plans':
      return {
        id: row.id,
        documentId: row.document_id,
        name: row.name ?? '',
        slug: row.slug ?? '',
        planType: normalizePlanType(row.plan_type),
        price: row.price ?? 0,
        period: row.period ?? 'month',
        description: row.description ?? '',
        features: [],
        isPopular: Boolean(row.is_popular),
        sortOrder: row.sort_order ?? 1,
        publishedAt: row.published_at,
        updatedAt: row.updated_at,
      };
    default:
      return row;
  }
}

function isVisibilityField(definition, field) {
  return (definition?.name === 'blog-posts' && field === 'featured')
    || (definition?.name === 'faq-items' && field === 'isFeatured')
    || (definition?.name === 'meeting-rooms' && field === 'isFeatured');
}

function mapListValue(definition, field, value) {
  if (isVisibilityField(definition, field)) {
    return Boolean(value) ? 'Hidden' : 'Visible';
  }

  if (field === 'featured' || field === 'isFeatured' || field === 'isPopular') {
    return Boolean(value) ? 'Yes' : 'No';
  }

  if (field === 'publishedDate' && value) {
    return String(value);
  }

  if (typeof value === 'string' && value.length > 120) {
    return `${value.slice(0, 117)}...`;
  }

  return value ?? '';
}

function getAvailableFields(definition) {
  const flattened = definition.editLayout.flat();
  const seen = new Set();
  const ordered = ['id', ...definition.listColumns, ...flattened, 'updatedAt', 'status'];

  return ordered.filter((field) => {
    if (seen.has(field)) {
      return false;
    }
    seen.add(field);
    return true;
  });
}

function getFieldLabel(definition, field) {
  if (field === 'updatedAt') {
    return 'Updated At';
  }

  if (field === 'status') {
    return 'Status';
  }

  if (isVisibilityField(definition, field)) {
    return 'Visibility';
  }

  return toLabel(field);
}

function getFilterOptions(definition, records) {
  const filters = [];

  if (definition.filterFields.includes('status')) {
    filters.push({
      field: 'status',
      label: 'Status',
      options: ['Published', 'Draft'],
    });
  }

  if (definition.filterFields.includes('category')) {
    filters.push({
      field: 'category',
      label: 'Category',
      options: [...new Set(records.map((item) => item.raw.category).filter(Boolean))].sort(),
    });
  }

  if (definition.filterFields.includes('planType')) {
    filters.push({
      field: 'planType',
      label: 'Plan Type',
      options: [...new Set(records.map((item) => item.raw.planType).filter(Boolean))].sort(),
    });
  }

  ['featured', 'isFeatured', 'isPopular'].forEach((field) => {
    if (definition.filterFields.includes(field)) {
      filters.push({
        field,
        label: getFieldLabel(definition, field),
        options: ['Yes', 'No'],
      });
    }
  });

  return filters;
}

function pickEditableRow(rows) {
  const draftRow = rows.find((row) => !row.published_at);
  return draftRow ?? rows[0] ?? null;
}

function pickPublishedRow(rows) {
  return rows.find((row) => Boolean(row.published_at)) ?? null;
}

async function loadTextItems(linkTable, entityId, field, transaction) {
  const links = await selectRows(
    `SELECT * FROM ${linkTable} WHERE entity_id = :entityId AND field = :field ORDER BY \`order\` ASC, id ASC`,
    { entityId, field },
    transaction,
  );

  if (!links.length) {
    return [];
  }

  const ids = links.map((link) => link.cmp_id);
  const rows = await selectRows(
    'SELECT * FROM components_common_text_items WHERE id IN (:ids)',
    { ids },
    transaction,
  );
  const rowMap = new Map(rows.map((row) => [row.id, row]));

  return links
    .map((link) => rowMap.get(link.cmp_id))
    .filter(Boolean)
    .map((row) => ({
      id: row.id,
      text: row.text ?? '',
    }));
}

async function syncTextItems({ linkTable, entityId, field, items, transaction }) {
  await sequelize.query(
    `DELETE FROM ${linkTable} WHERE entity_id = :entityId AND field = :field`,
    {
      replacements: { entityId, field },
      transaction,
    },
  );

  const normalizedItems = items
    .map((item) => (typeof item === 'string' ? item : item?.text ?? ''))
    .map((text) => text.trim())
    .filter(Boolean);

  for (const [index, text] of normalizedItems.entries()) {
    const [insertId, metadata] = await sequelize.query(
      'INSERT INTO components_common_text_items (text) VALUES (:text)',
      {
        replacements: { text },
        transaction,
      },
    );

    const cmpId = getInsertId(insertId, metadata);

    if (!cmpId) {
      continue;
    }

    await sequelize.query(
      `INSERT INTO ${linkTable} (entity_id, cmp_id, component_type, field, \`order\`) VALUES (:entityId, :cmpId, 'common.text-item', :field, :order)`,
      {
        replacements: {
          entityId,
          cmpId,
          field,
          order: index + 1,
        },
        transaction,
      },
    );
  }
}

async function loadCollectionList(definition, query = {}) {
  const rows = await selectRows(
    `SELECT * FROM ${definition.table} ORDER BY updated_at DESC, id DESC`,
  );

  const groups = new Map();

  rows.forEach((row) => {
    const key = row.document_id || `row-${row.id}`;
    const current = groups.get(key) ?? [];
    current.push(row);
    groups.set(key, current);
  });

  const searchText = String(query.search ?? '').trim().toLowerCase();
  const availableFields = getAvailableFields(definition);
  const requestedDisplayedFields = String(query.displayedFields ?? '')
    .split(',')
    .map((field) => field.trim())
    .filter(Boolean);
  const displayedFields = requestedDisplayedFields.length
    ? requestedDisplayedFields.filter((field) => availableFields.includes(field))
    : definition.listColumns;
  const sortBy = definition.sortableFields.includes(query.sortBy) ? query.sortBy : 'updatedAt';
  const sortOrder = String(query.sortOrder ?? 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc';
  const activeFilters = {
    status: String(query.status ?? '').trim(),
    category: String(query.category ?? '').trim(),
    planType: String(query.planType ?? '').trim(),
    featured: String(query.featured ?? '').trim(),
    isFeatured: String(query.isFeatured ?? '').trim(),
    isPopular: String(query.isPopular ?? '').trim(),
  };

  const list = Array.from(groups.values())
    .map((groupRows) => {
      const editableRow = pickEditableRow(groupRows);
      const mapped = mapRowFromTable(definition, editableRow);
      const hasPublished = groupRows.some((row) => Boolean(row.published_at));
      const status = hasPublished ? 'Published' : 'Draft';
      const raw = {
        ...mapped,
        status,
        updatedAt: mapped.updatedAt,
      };
      const searchBlob = Object.values(raw)
        .flatMap((value) => {
          if (Array.isArray(value)) {
            return value.map((item) => (typeof item === 'object' ? JSON.stringify(item) : String(item ?? '')));
          }

          return [typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value ?? '')];
        })
        .join(' ')
        .toLowerCase();

      return {
        id: mapped.id,
        documentId: mapped.documentId || editableRow.id,
        title: mapped[definition.titleField] ?? `${definition.label} ${mapped.id}`,
        status,
        updatedAt: mapped.updatedAt,
        raw,
        searchBlob,
        columns: Object.fromEntries(
          availableFields.map((field) => [field, mapListValue(definition, field, raw[field])]),
        ),
      };
    })
    .filter((item) => !searchText || item.searchBlob.includes(searchText))
    .filter((item) => !activeFilters.status || item.status === activeFilters.status)
    .filter((item) => !activeFilters.category || String(item.raw.category ?? '') === activeFilters.category)
    .filter((item) => !activeFilters.planType || String(item.raw.planType ?? '') === activeFilters.planType)
    .filter((item) => {
      return ['featured', 'isFeatured', 'isPopular'].every((field) => {
        if (!activeFilters[field]) {
          return true;
        }

        return Boolean(item.raw[field]) === (activeFilters[field] === 'Yes');
      });
    })
    .sort((a, b) => {
      const left = a.raw[sortBy];
      const right = b.raw[sortBy];

      if (typeof left === 'number' || typeof right === 'number') {
        const numericLeft = Number(left ?? 0);
        const numericRight = Number(right ?? 0);
        return sortOrder === 'asc' ? numericLeft - numericRight : numericRight - numericLeft;
      }

      if (typeof left === 'boolean' || typeof right === 'boolean') {
        const numericLeft = Number(Boolean(left));
        const numericRight = Number(Boolean(right));
        return sortOrder === 'asc' ? numericLeft - numericRight : numericRight - numericLeft;
      }

      const stringLeft = String(left ?? '');
      const stringRight = String(right ?? '');
      return sortOrder === 'asc'
        ? stringLeft.localeCompare(stringRight)
        : stringRight.localeCompare(stringLeft);
    });

  return {
    records: list,
    controls: {
      displayedFields,
      availableFields: availableFields.map((field) => ({ field, label: getFieldLabel(definition, field) })),
      filters: getFilterOptions(definition, list),
      activeFilters,
      sortBy,
      sortOrder,
    },
  };
}

async function loadCollectionRecord(definition, recordId, transaction) {
  const seedRow = await selectOne(
    `SELECT * FROM ${definition.table} WHERE id = :id LIMIT 1`,
    { id: recordId },
    transaction,
  );

  if (!seedRow) {
    return null;
  }

  const key = seedRow.document_id || seedRow.id;
  const rows = seedRow.document_id
    ? await selectRows(
      `SELECT * FROM ${definition.table} WHERE document_id = :documentId ORDER BY updated_at DESC, id DESC`,
      { documentId: seedRow.document_id },
      transaction,
    )
    : [seedRow];

  const editableRow = pickEditableRow(rows);
  const publishedRow = pickPublishedRow(rows);

  async function hydrate(row) {
    if (!row) {
      return null;
    }

    const mapped = mapRowFromTable(definition, row);

    if (definition.kind === 'blog-posts') {
      mapped.tags = await loadTextItems('blog_posts_cmps', row.id, 'tags', transaction);
    }

    if (definition.kind === 'meeting-rooms') {
      mapped.features = await loadTextItems('meeting_rooms_cmps', row.id, 'features', transaction);
      mapped.badges = await loadTextItems('meeting_rooms_cmps', row.id, 'badges', transaction);
    }

    if (definition.kind === 'pricing-plans') {
      mapped.features = await loadTextItems('pricing_plans_cmps', row.id, 'features', transaction);
    }

    return {
      ...mapped,
      id: row.id,
      documentId: row.document_id || key,
      status: row.published_at ? 'Published' : 'Draft',
    };
  }

  return {
    draftRecord: await hydrate(editableRow),
    publishedRecord: await hydrate(publishedRow),
  };
}

function mapPayloadForTable(definition, content) {
  switch (definition.kind) {
    case 'blog-posts':
      return {
        title: content.title ?? '',
        slug: getAutoSlug(definition, content),
        excerpt: content.excerpt ?? '',
        content: content.content ?? '',
        category: content.category ?? '',
        published_date: content.publishedDate ?? '',
        read_time: normalizeReadTimeForStorage(content.readTime),
        author: content.author ?? '',
        featured: content.featured ? 1 : 0,
        cover_image_url: content.coverImage ?? '',
        content_image_urls: JSON.stringify((content.contentImages ?? []).filter(Boolean)),
        pro_tip_title: content.proTipTitle ?? '',
        pro_tip_text: content.proTipText ?? '',
      };
    case 'faq-items':
      return {
        question: content.question ?? '',
        answer: content.answer ?? '',
        sort_order: Number(content.sortOrder ?? 1),
        is_featured: content.isFeatured ? 1 : 0,
      };
    case 'meeting-rooms':
      return {
        name: content.name ?? '',
        slug: getAutoSlug(definition, content),
        description: content.description ?? '',
        capacity: Number(content.capacity ?? 0),
        sort_order: Number(content.sortOrder ?? 1),
        is_featured: content.isFeatured ? 1 : 0,
        image_url: content.image ?? '',
      };
    case 'pricing-plans':
      return {
        name: content.name ?? '',
        slug: getAutoSlug(definition, content),
        plan_type: normalizePlanType(content.planType),
        price: Number(content.price ?? 0),
        period: content.period ?? 'month',
        description: content.description ?? '',
        is_popular: content.isPopular ? 1 : 0,
        sort_order: Number(content.sortOrder ?? 1),
      };
    default:
      return {};
  }
}

function buildEmptyRecord(definition, recordId = null, documentId = null) {
  return {
    ...mapRowFromTable(definition, {
      id: recordId,
      document_id: documentId,
      published_at: null,
      updated_at: null,
    }),
    id: recordId,
    documentId,
    status: 'Draft',
    publishedAt: null,
    updatedAt: null,
  };
}

function getInsertId(primaryResult, secondaryResult) {
  if (typeof primaryResult === 'number') {
    return primaryResult;
  }

  if (typeof primaryResult?.insertId === 'number') {
    return primaryResult.insertId;
  }

  if (typeof secondaryResult === 'number') {
    return secondaryResult;
  }

  if (typeof secondaryResult?.insertId === 'number') {
    return secondaryResult.insertId;
  }

  return null;
}

async function insertCollectionDraft(definition, content, transaction) {
  const documentId = randomUUID();
  const mapped = mapPayloadForTable(definition, normalizeForSave(content));
  const columns = ['document_id', ...Object.keys(mapped), 'created_at', 'updated_at', 'locale'];
  const values = [':documentId', ...Object.keys(mapped).map((column) => `:${column}`), 'NOW(6)', 'NOW(6)', 'NULL'];
  const [insertId, metadata] = await sequelize.query(
    `INSERT INTO ${definition.table} (${columns.join(', ')}) VALUES (${values.join(', ')})`,
    {
      replacements: {
        documentId,
        ...mapped,
      },
      transaction,
    },
  );

  const recordId = getInsertId(insertId, metadata);

  if (!recordId) {
    throw new Error(`Unable to create a new ${definition.label}.`);
  }

  const nextContent = normalizeForSave(content);

  if (definition.kind === 'blog-posts') {
    await syncTextItems({
      linkTable: 'blog_posts_cmps',
      entityId: recordId,
      field: 'tags',
      items: nextContent.tags ?? [],
      transaction,
    });
  }

  if (definition.kind === 'meeting-rooms') {
    await syncTextItems({
      linkTable: 'meeting_rooms_cmps',
      entityId: recordId,
      field: 'features',
      items: nextContent.features ?? [],
      transaction,
    });
    await syncTextItems({
      linkTable: 'meeting_rooms_cmps',
      entityId: recordId,
      field: 'badges',
      items: nextContent.badges ?? [],
      transaction,
    });
  }

  if (definition.kind === 'pricing-plans') {
    await syncTextItems({
      linkTable: 'pricing_plans_cmps',
      entityId: recordId,
      field: 'features',
      items: nextContent.features ?? [],
      transaction,
    });
  }

  return { recordId, documentId };
}

async function createCollectionRecord(definition) {
  return sequelize.transaction(async (transaction) => {
    return {
      draftRecord: buildEmptyRecord(definition),
      publishedRecord: null,
    };
  });
}

async function duplicateCollectionRecord(definition, recordId) {
  return sequelize.transaction(async (transaction) => {
    const existing = await loadCollectionRecord(definition, recordId);

    if (!existing?.draftRecord) {
      throw new Error(`${definition.label} not found in the copied database.`);
    }

    const duplicated = normalizeForSave(existing.draftRecord);
    delete duplicated.id;
    delete duplicated.documentId;
    delete duplicated.status;
    delete duplicated.updatedAt;
    delete duplicated.publishedAt;

    const documentId = randomUUID();
    const mapped = mapPayloadForTable(definition, duplicated);
    const columns = ['document_id', ...Object.keys(mapped), 'created_at', 'updated_at', 'locale'];
    const values = [':documentId', ...Object.keys(mapped).map((column) => `:${column}`), 'NOW(6)', 'NOW(6)', 'NULL'];
    const [insertId, metadata] = await sequelize.query(
      `INSERT INTO ${definition.table} (${columns.join(', ')}) VALUES (${values.join(', ')})`,
      {
        replacements: {
          documentId,
          ...mapped,
        },
        transaction,
      },
    );

    const nextId = getInsertId(insertId, metadata);

    if (!nextId) {
      throw new Error(`Unable to duplicate ${definition.label}.`);
    }

    if (definition.kind === 'blog-posts') {
      await syncTextItems({
        linkTable: 'blog_posts_cmps',
        entityId: nextId,
        field: 'tags',
        items: duplicated.tags ?? [],
        transaction,
      });
    }

    if (definition.kind === 'meeting-rooms') {
      await syncTextItems({
        linkTable: 'meeting_rooms_cmps',
        entityId: nextId,
        field: 'features',
        items: duplicated.features ?? [],
        transaction,
      });
      await syncTextItems({
        linkTable: 'meeting_rooms_cmps',
        entityId: nextId,
        field: 'badges',
        items: duplicated.badges ?? [],
        transaction,
      });
    }

    if (definition.kind === 'pricing-plans') {
      await syncTextItems({
        linkTable: 'pricing_plans_cmps',
        entityId: nextId,
        field: 'features',
        items: duplicated.features ?? [],
        transaction,
      });
    }

    return {
      draftRecord: {
        ...duplicated,
        id: nextId,
        documentId,
        status: 'Draft',
        publishedAt: null,
        updatedAt: new Date().toISOString(),
      },
      publishedRecord: null,
    };
  });
}

async function saveCollectionRecord(definition, recordId, content) {
  return sequelize.transaction(async (transaction) => {
    if (!recordId) {
      if (!hasMeaningfulValue(content)) {
        throw new Error(`Add content before saving this ${definition.label.toLowerCase()}.`);
      }

      const { recordId: nextId } = await insertCollectionDraft(definition, content, transaction);
      return loadCollectionRecord(definition, nextId, transaction);
    }

    const existingRow = await selectOne(
      `SELECT * FROM ${definition.table} WHERE id = :id LIMIT 1`,
      { id: recordId },
      transaction,
    );

    if (!existingRow) {
      throw new Error(`${definition.label} not found in the copied database.`);
    }

    const nextContent = normalizeForSave(content);
    const mapped = mapPayloadForTable(definition, nextContent);
    const columns = Object.keys(mapped);
    const assignments = columns.map((column) => `${column} = :${column}`).join(', ');

    await sequelize.query(
      `UPDATE ${definition.table} SET ${assignments}, updated_at = NOW(6) WHERE id = :id`,
      {
        replacements: { id: recordId, ...mapped },
        transaction,
      },
    );

    if (definition.kind === 'blog-posts') {
      await syncTextItems({
        linkTable: 'blog_posts_cmps',
        entityId: recordId,
        field: 'tags',
        items: nextContent.tags ?? [],
        transaction,
      });
    }

    if (definition.kind === 'meeting-rooms') {
      await syncTextItems({
        linkTable: 'meeting_rooms_cmps',
        entityId: recordId,
        field: 'features',
        items: nextContent.features ?? [],
        transaction,
      });
      await syncTextItems({
        linkTable: 'meeting_rooms_cmps',
        entityId: recordId,
        field: 'badges',
        items: nextContent.badges ?? [],
        transaction,
      });
    }

    if (definition.kind === 'pricing-plans') {
      await syncTextItems({
        linkTable: 'pricing_plans_cmps',
        entityId: recordId,
        field: 'features',
        items: nextContent.features ?? [],
        transaction,
      });
    }

    return loadCollectionRecord(definition, recordId, transaction);
  });
}

async function publishCollectionRecord(definition, recordId) {
  return sequelize.transaction(async (transaction) => {
    if (!recordId) {
      throw new Error(`Cannot publish ${definition.label} without a draft record.`);
    }

    const draftRow = await selectOne(
      `SELECT * FROM ${definition.table} WHERE id = :id LIMIT 1`,
      { id: recordId },
      transaction,
    );

    if (!draftRow) {
      throw new Error(`${definition.label} not found in the copied database.`);
    }

    const publishedRow = draftRow.document_id
      ? await selectOne(
        `SELECT * FROM ${definition.table} WHERE document_id = :documentId AND published_at IS NOT NULL ORDER BY published_at DESC, id DESC LIMIT 1`,
        { documentId: draftRow.document_id },
        transaction,
      )
      : null;

    const mapped = mapPayloadForTable(definition, mapRowFromTable(definition, draftRow));
    if (definition.kind === 'blog-posts') {
      mapped.published_date = getCurrentPublishedDate();
    }
    let publishedId = publishedRow?.id ?? null;

    if (publishedId) {
      const assignments = Object.keys(mapped).map((column) => `${column} = :${column}`).join(', ');
      await sequelize.query(
        `UPDATE ${definition.table} SET ${assignments}, updated_at = NOW(6), published_at = NOW(6) WHERE id = :id`,
        {
          replacements: { id: publishedId, ...mapped },
          transaction,
        },
      );
    } else {
      const columns = ['document_id', ...Object.keys(mapped), 'created_at', 'updated_at', 'published_at'];
      const values = [':documentId', ...Object.keys(mapped).map((column) => `:${column}`), 'NOW(6)', 'NOW(6)', 'NOW(6)'];
      const [insertId, metadata] = await sequelize.query(
        `INSERT INTO ${definition.table} (${columns.join(', ')}) VALUES (${values.join(', ')})`,
        {
          replacements: {
            documentId: draftRow.document_id,
            ...mapped,
          },
          transaction,
        },
      );
      publishedId = getInsertId(insertId, metadata);
    }

    if (definition.kind === 'blog-posts') {
      const items = await loadTextItems('blog_posts_cmps', draftRow.id, 'tags', transaction);
      await syncTextItems({
        linkTable: 'blog_posts_cmps',
        entityId: publishedId,
        field: 'tags',
        items,
        transaction,
      });
    }

    if (definition.kind === 'meeting-rooms') {
      const features = await loadTextItems('meeting_rooms_cmps', draftRow.id, 'features', transaction);
      const badges = await loadTextItems('meeting_rooms_cmps', draftRow.id, 'badges', transaction);
      await syncTextItems({
        linkTable: 'meeting_rooms_cmps',
        entityId: publishedId,
        field: 'features',
        items: features,
        transaction,
      });
      await syncTextItems({
        linkTable: 'meeting_rooms_cmps',
        entityId: publishedId,
        field: 'badges',
        items: badges,
        transaction,
      });
    }

    if (definition.kind === 'pricing-plans') {
      const features = await loadTextItems('pricing_plans_cmps', draftRow.id, 'features', transaction);
      await syncTextItems({
        linkTable: 'pricing_plans_cmps',
        entityId: publishedId,
        field: 'features',
        items: features,
        transaction,
      });
    }

    return loadCollectionRecord(definition, recordId, transaction);
  });
}

async function unpublishCollectionRecord(definition, recordId) {
  return sequelize.transaction(async (transaction) => {
    const seedRow = await selectOne(
      `SELECT * FROM ${definition.table} WHERE id = :id LIMIT 1`,
      { id: recordId },
      transaction,
    );

    if (!seedRow) {
      throw new Error(`${definition.label} not found in the copied database.`);
    }

    const rows = seedRow.document_id
      ? await selectRows(
        `SELECT * FROM ${definition.table} WHERE document_id = :documentId ORDER BY updated_at DESC, id DESC`,
        { documentId: seedRow.document_id },
        transaction,
      )
      : [seedRow];

    const draftRow = pickEditableRow(rows.filter((row) => !row.published_at));
    const publishedRow = pickPublishedRow(rows);

    if (!publishedRow) {
      return loadCollectionRecord(definition, draftRow?.id ?? seedRow.id, transaction);
    }

    if (draftRow) {
      if (definition.kind === 'blog-posts') {
        await sequelize.query('DELETE FROM blog_posts_cmps WHERE entity_id = :entityId', {
          replacements: { entityId: publishedRow.id },
          transaction,
        });
      }

      if (definition.kind === 'meeting-rooms') {
        await sequelize.query('DELETE FROM meeting_rooms_cmps WHERE entity_id = :entityId', {
          replacements: { entityId: publishedRow.id },
          transaction,
        });
      }

      if (definition.kind === 'pricing-plans') {
        await sequelize.query('DELETE FROM pricing_plans_cmps WHERE entity_id = :entityId', {
          replacements: { entityId: publishedRow.id },
          transaction,
        });
      }

      await sequelize.query(`DELETE FROM ${definition.table} WHERE id = :id`, {
        replacements: { id: publishedRow.id },
        transaction,
      });

      return loadCollectionRecord(definition, draftRow.id, transaction);
    }

    await sequelize.query(
      `UPDATE ${definition.table} SET published_at = NULL, updated_at = NOW(6) WHERE id = :id`,
      {
        replacements: { id: publishedRow.id },
        transaction,
      },
    );

    return loadCollectionRecord(definition, publishedRow.id, transaction);
  });
}

async function deleteCollectionRecord(definition, recordId) {
  return sequelize.transaction(async (transaction) => {
    const seedRow = await selectOne(
      `SELECT * FROM ${definition.table} WHERE id = :id LIMIT 1`,
      { id: recordId },
      transaction,
    );

    if (!seedRow) {
      return;
    }

    const rows = seedRow.document_id
      ? await selectRows(
        `SELECT id FROM ${definition.table} WHERE document_id = :documentId`,
        { documentId: seedRow.document_id },
        transaction,
      )
      : [{ id: recordId }];

    const ids = rows.map((row) => row.id);

    if (definition.kind === 'blog-posts') {
      await sequelize.query('DELETE FROM blog_posts_cmps WHERE entity_id IN (:ids)', {
        replacements: { ids },
        transaction,
      });
    }

    if (definition.kind === 'meeting-rooms') {
      await sequelize.query('DELETE FROM meeting_rooms_cmps WHERE entity_id IN (:ids)', {
        replacements: { ids },
        transaction,
      });
    }

    if (definition.kind === 'pricing-plans') {
      await sequelize.query('DELETE FROM pricing_plans_cmps WHERE entity_id IN (:ids)', {
        replacements: { ids },
        transaction,
      });
    }

    await sequelize.query(
      `DELETE FROM ${definition.table} WHERE id IN (:ids)`,
      {
        replacements: { ids },
        transaction,
      },
    );
  });
}

export function getCollectionPageDefinitions() {
  return COLLECTION_DEFINITIONS;
}

function mapPublicCollectionRecord(definition, record) {
  if (!record) {
    return null;
  }

  switch (definition.kind) {
    case 'blog-posts':
      return {
        id: record.id,
        documentId: record.documentId,
        title: record.title,
        slug: record.slug,
        excerpt: record.excerpt,
        content: record.content,
        contentImages: (record.contentImages ?? []).map((item) => typeof item === 'string' ? item : item?.text ?? '').filter(Boolean),
        proTipTitle: record.proTipTitle,
        proTipText: record.proTipText,
        category: record.category,
        publishedDate: record.publishedDate,
        readTime: record.readTime,
        author: record.author,
        tags: (record.tags ?? []).map((item) => typeof item === 'string' ? item : item?.text ?? '').filter(Boolean),
        featured: Boolean(record.featured),
        coverImage: record.coverImage,
      };
    case 'faq-items':
      return {
        id: record.id,
        documentId: record.documentId,
        question: record.question,
        answer: record.answer,
        isFeatured: Boolean(record.isFeatured),
        sortOrder: Number(record.sortOrder ?? 1),
      };
    case 'meeting-rooms':
      return {
        id: record.id,
        documentId: record.documentId,
        name: record.name,
        slug: record.slug,
        description: record.description,
        capacity: Number(record.capacity ?? 0),
        image: record.image,
        features: (record.features ?? []).map((item) => typeof item === 'string' ? item : item?.text ?? '').filter(Boolean),
        badges: (record.badges ?? []).map((item) => typeof item === 'string' ? item : item?.text ?? '').filter(Boolean),
        isFeatured: Boolean(record.isFeatured),
        sortOrder: Number(record.sortOrder ?? 1),
      };
    case 'pricing-plans':
      return {
        id: record.id,
        documentId: record.documentId,
        name: record.name,
        slug: record.slug,
        planType: record.planType,
        price: Number(record.price ?? 0),
        period: record.period,
        description: record.description,
        features: (record.features ?? []).map((item) => typeof item === 'string' ? item : item?.text ?? '').filter(Boolean),
        isPopular: Boolean(record.isPopular),
        sortOrder: Number(record.sortOrder ?? 1),
      };
    default:
      return record;
  }
}

export async function getCollectionPublicData(pageName, options = {}) {
  const definition = COLLECTION_MAP[pageName];

  if (!definition) {
    throw new Error(`Unknown collection page: ${pageName}`);
  }

  const rows = await selectRows(
    `SELECT * FROM ${definition.table} ORDER BY updated_at DESC, id DESC`,
  );

  const groups = new Map();
  rows.forEach((row) => {
    const key = row.document_id || `row-${row.id}`;
    const current = groups.get(key) ?? [];
    current.push(row);
    groups.set(key, current);
  });

  const preferredStatus = options.status === 'draft' ? 'draft' : 'published';
  const hydrated = [];

  for (const groupRows of groups.values()) {
    const draftRow = pickEditableRow(groupRows.filter((row) => !row.published_at));
    const publishedRow = pickPublishedRow(groupRows);
    const targetRow = preferredStatus === 'draft'
      ? (draftRow ?? publishedRow)
      : (publishedRow ?? draftRow);

    if (!targetRow) {
      continue;
    }

    const loaded = await loadCollectionRecord(definition, targetRow.id);
    const targetRecord = preferredStatus === 'draft'
      ? (loaded?.draftRecord ?? loaded?.publishedRecord)
      : (loaded?.publishedRecord ?? loaded?.draftRecord);

    if (targetRecord) {
      hydrated.push(mapPublicCollectionRecord(definition, targetRecord));
    }
  }

  const slugFilter = options.slug ? String(options.slug) : '';
  const documentIdFilter = options.documentId ? String(options.documentId) : '';
  const featuredOnly = options.isFeatured === 'true';
  const planType = options.planType ? normalizePlanType(options.planType) : '';

  let filtered = hydrated.filter(Boolean);

  if (slugFilter || documentIdFilter) {
    filtered = filtered.filter((record) => {
      return (!slugFilter || String(record.slug ?? '') === slugFilter)
        || (!documentIdFilter || String(record.documentId ?? '') === documentIdFilter);
    });
  }

  if (featuredOnly) {
    filtered = filtered.filter((record) => Boolean(record.isFeatured ?? record.featured));
  }

  if (planType) {
    filtered = filtered.filter((record) => normalizePlanType(record.planType) === planType);
  }

  const sortBy = options.sortBy ? String(options.sortBy) : '';
  const sortOrder = options.sortOrder === 'asc' ? 'asc' : 'desc';

  if (sortBy) {
    filtered.sort((left, right) => {
      const leftValue = left?.[sortBy];
      const rightValue = right?.[sortBy];

      if (typeof leftValue === 'number' || typeof rightValue === 'number') {
        const diff = Number(leftValue ?? 0) - Number(rightValue ?? 0);
        if (diff !== 0) {
          return sortOrder === 'asc' ? diff : -diff;
        }

        return getSortTieBreakerValue(left).localeCompare(getSortTieBreakerValue(right));
      }

      const compared = String(leftValue ?? '').localeCompare(String(rightValue ?? ''));
      if (compared !== 0) {
        return sortOrder === 'asc' ? compared : -compared;
      }

      return getSortTieBreakerValue(left).localeCompare(getSortTieBreakerValue(right));
    });
  }

  return filtered;
}

export async function handleCollectionPage(pageName, request) {
  const definition = COLLECTION_MAP[pageName];

  if (!definition) {
    throw new Error(`Unknown collection page: ${pageName}`);
  }

  const method = String(request.method ?? 'get').toLowerCase();
  const rawRecordId = request.query?.recordId
    ?? request.params?.recordId
    ?? request.payload?.recordId
    ?? request.searchParams?.recordId
    ?? 0;
  const recordId = Number(rawRecordId) || null;
  const intent = request.payload?.intent ?? null;
  const isNew = String(request.query?.new ?? request.payload?.new ?? '').trim() === '1';

  if (process.env.NODE_ENV !== 'production') {
    console.log('[collection-page]', pageName, {
      method,
      rawRecordId,
      query: request.query,
      params: request.params,
      payloadKeys: request.payload ? Object.keys(request.payload) : null,
    });
  }

  if (method === 'post' && intent === 'create') {
    const result = await createCollectionRecord(definition);

    return {
      definition: {
        name: definition.name,
        label: definition.label,
        pluralLabel: definition.pluralLabel,
        titleField: definition.titleField,
        listColumns: definition.listColumns.map((field) => ({ field, label: getFieldLabel(definition, field) })),
        editLayout: definition.editLayout,
      },
      ...result,
      notice: {
        message: `${definition.label} created.`,
        type: 'success',
      },
    };
  }

  if (method === 'post' && intent === 'save') {
    const result = await saveCollectionRecord(definition, recordId, request.payload?.record ?? {});

    return {
      definition: {
        name: definition.name,
        label: definition.label,
        pluralLabel: definition.pluralLabel,
        titleField: definition.titleField,
        listColumns: definition.listColumns.map((field) => ({ field, label: getFieldLabel(definition, field) })),
        editLayout: definition.editLayout,
      },
      ...result,
      notice: {
        message: `${definition.label} saved.`,
        type: 'success',
      },
    };
  }

  if (method === 'post' && intent === 'publish') {
    let result;

    if (recordId) {
      const saved = await saveCollectionRecord(definition, recordId, request.payload?.record ?? {});
      result = await publishCollectionRecord(definition, saved.draftRecord?.id ?? recordId);
    } else {
      const saved = await saveCollectionRecord(definition, null, request.payload?.record ?? {});
      result = await publishCollectionRecord(definition, saved.draftRecord?.id);
    }

    return {
      definition: {
        name: definition.name,
        label: definition.label,
        pluralLabel: definition.pluralLabel,
        titleField: definition.titleField,
        listColumns: definition.listColumns.map((field) => ({ field, label: getFieldLabel(definition, field) })),
        editLayout: definition.editLayout,
      },
      ...result,
      notice: {
        message: `${definition.label} published.`,
        type: 'success',
      },
    };
  }

  if (method === 'post' && intent === 'unpublish') {
    const result = await unpublishCollectionRecord(definition, recordId);

    return {
      definition: {
        name: definition.name,
        label: definition.label,
        pluralLabel: definition.pluralLabel,
        titleField: definition.titleField,
        listColumns: definition.listColumns.map((field) => ({ field, label: getFieldLabel(definition, field) })),
        editLayout: definition.editLayout,
      },
      ...result,
      notice: {
        message: `${definition.label} unpublished.`,
        type: 'success',
      },
    };
  }

  if (method === 'post' && intent === 'duplicate') {
    const result = await duplicateCollectionRecord(definition, recordId);

    return {
      definition: {
        name: definition.name,
        label: definition.label,
        pluralLabel: definition.pluralLabel,
        titleField: definition.titleField,
        listColumns: definition.listColumns.map((field) => ({ field, label: getFieldLabel(definition, field) })),
        editLayout: definition.editLayout,
      },
      ...result,
      notice: {
        message: `${definition.label} duplicated.`,
        type: 'success',
      },
    };
  }

  if (method === 'post' && intent === 'delete') {
    await deleteCollectionRecord(definition, recordId);

    return {
      definition: {
        name: definition.name,
        label: definition.label,
        pluralLabel: definition.pluralLabel,
        titleField: definition.titleField,
        listColumns: definition.listColumns.map((field) => ({ field, label: getFieldLabel(definition, field) })),
        editLayout: definition.editLayout,
      },
      deleted: true,
      notice: {
        message: `${definition.label} deleted.`,
        type: 'success',
      },
    };
  }

  if (recordId || isNew) {
    const result = recordId
      ? await loadCollectionRecord(definition, recordId)
      : {
        draftRecord: buildEmptyRecord(definition),
        publishedRecord: null,
      };

    return {
      definition: {
        name: definition.name,
        label: definition.label,
        pluralLabel: definition.pluralLabel,
        titleField: definition.titleField,
        listColumns: definition.listColumns.map((field) => ({ field, label: getFieldLabel(definition, field) })),
        editLayout: definition.editLayout,
      },
      ...result,
    };
  }

  const listResult = await loadCollectionList(definition, request.query ?? {});

  return {
    definition: {
      name: definition.name,
      label: definition.label,
      pluralLabel: definition.pluralLabel,
      titleField: definition.titleField,
      listColumns: definition.listColumns.map((field) => ({ field, label: getFieldLabel(definition, field) })),
      editLayout: definition.editLayout,
    },
    records: listResult.records,
    controls: listResult.controls,
  };
}
