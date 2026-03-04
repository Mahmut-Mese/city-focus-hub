import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DataTypes } from 'sequelize';
import { sequelize } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cmsRoot = path.resolve(__dirname, '..', '..', 'cms', 'src');

const RESOURCE_DEFINITIONS = [
  {
    table: 'blog_posts',
    label: 'Blog Posts',
    navigation: 'Collections',
    schemaPath: path.join(cmsRoot, 'api', 'blog-post', 'content-types', 'blog-post', 'schema.json'),
  },
  {
    table: 'faq_items',
    label: 'FAQ Items',
    navigation: 'Collections',
    schemaPath: path.join(cmsRoot, 'api', 'faq-item', 'content-types', 'faq-item', 'schema.json'),
  },
  {
    table: 'meeting_rooms',
    label: 'Meeting Rooms',
    navigation: 'Collections',
    schemaPath: path.join(cmsRoot, 'api', 'meeting-room', 'content-types', 'meeting-room', 'schema.json'),
  },
  {
    table: 'pricing_plans',
    label: 'Pricing Plans',
    navigation: 'Collections',
    schemaPath: path.join(cmsRoot, 'api', 'pricing-plan', 'content-types', 'pricing-plan', 'schema.json'),
  },
  {
    table: 'files',
    label: 'Media Library',
    navigation: 'Media',
  },
];

const HIDDEN_PROPERTIES = [
  'created_by_id',
  'updated_by_id',
];

const EXACT_LABELS = {
  cta_button_label: 'CTA Button Label',
  default_seo_description: 'Default SEO Description',
  default_seo_title: 'Default SEO Title',
  detail_back_label: 'Detail Back Label',
  detail_popular_tags_title: 'Detail Popular Tags Title',
  detail_recent_posts_title: 'Detail Recent Posts Title',
  detail_related_workspaces_title: 'Detail Related Workspaces Title',
  detail_search_button_label: 'Detail Search Button Label',
  detail_search_title: 'Detail Search Title',
  document_id: 'Document ID',
  image_url: 'Image URL',
  is_featured: 'Featured',
  is_popular: 'Popular',
  plan_type: 'Plan Type',
  preview_url: 'Preview URL',
  pro_tip_text: 'Pro Tip Text',
  pro_tip_title: 'Pro Tip Title',
  published_at: 'Published At',
  published_date: 'Published Date',
  read_time: 'Read Time',
  search_placeholder: 'Search Placeholder',
  sort_order: 'Display Order',
  updated_at: 'Updated At',
  created_at: 'Created At',
};

const PREFERRED_TITLE_COLUMNS = [
  'site_name',
  'title',
  'name',
  'question',
  'hero_title',
  'label',
  'feature',
  'text',
  'alt',
  'slug',
  'document_id',
];

function camelToSnake(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

function toPascalCase(value) {
  return value
    .split(/[_-]+/)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join('');
}

function toClientLabel(fieldName) {
  if (EXACT_LABELS[fieldName]) {
    return EXACT_LABELS[fieldName];
  }

  return fieldName
    .split(/[_-]+/)
    .filter(Boolean)
    .map((part) => {
      const lower = part.toLowerCase();

      if (lower === 'cta') {
        return 'CTA';
      }

      if (lower === 'seo') {
        return 'SEO';
      }

      if (lower === 'faq') {
        return 'FAQ';
      }

      if (lower === 'id') {
        return 'ID';
      }

      if (lower === 'url') {
        return 'URL';
      }

      return `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`;
    })
    .join(' ');
}

function mapColumnType(columnType) {
  const normalized = columnType.toLowerCase();

  if (normalized.startsWith('tinyint(1)')) {
    return DataTypes.BOOLEAN;
  }

  if (normalized.startsWith('int unsigned')) {
    return DataTypes.INTEGER.UNSIGNED;
  }

  if (normalized.startsWith('int')) {
    return DataTypes.INTEGER;
  }

  if (normalized.startsWith('double')) {
    return DataTypes.DOUBLE;
  }

  if (normalized.startsWith('decimal')) {
    return DataTypes.DECIMAL;
  }

  if (normalized.startsWith('datetime')) {
    return DataTypes.DATE(6);
  }

  if (normalized === 'date') {
    return DataTypes.DATEONLY;
  }

  if (normalized === 'json') {
    return DataTypes.JSON;
  }

  if (normalized.includes('text')) {
    return DataTypes.TEXT('long');
  }

  return DataTypes.STRING;
}

async function readSchema(schemaPath) {
  if (!schemaPath) {
    return null;
  }

  try {
    const raw = await fs.readFile(schemaPath, 'utf8');

    return JSON.parse(raw);
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

function pickTitleColumn(columns) {
  return columns.find((column) => PREFERRED_TITLE_COLUMNS.includes(column)) || 'id';
}

function buildPropertyOptions(columns, titleColumn, hiddenColumns) {
  return Object.fromEntries(
    columns.map((column) => [
      column,
      {
        isTitle: column === titleColumn,
        isVisible: hiddenColumns.includes(column)
          ? { list: false, filter: false, show: false, edit: false }
          : undefined,
        type: column.endsWith('_at') ? 'datetime' : undefined,
      },
    ]),
  );
}

function buildTranslations(definition, columns) {
  return {
    en: {
      labels: {
        [definition.table]: definition.label,
      },
      resources: {
        [definition.table]: {
          properties: Object.fromEntries(columns.map((column) => [column, toClientLabel(column)])),
        },
      },
    },
  };
}

function buildSchemaDrivenProperties(schema, columns) {
  if (!schema) {
    return null;
  }

  const hiddenColumns = new Set(HIDDEN_PROPERTIES);
  const visibleAttributes = [];

  Object.entries(schema.attributes ?? {}).forEach(([attributeName, attribute]) => {
    const columnName = camelToSnake(attributeName);
    const isHidden = attribute.pluginOptions?.['content-manager']?.visible === false;

    if (isHidden) {
      hiddenColumns.add(columnName);
      return;
    }

    if (columns.includes(columnName)) {
      visibleAttributes.push(columnName);
    }
  });

  const listProperties = (schema.config?.layouts?.list ?? [])
    .map((attributeName) => camelToSnake(attributeName))
    .filter((columnName) => columns.includes(columnName));

  return {
    editProperties: visibleAttributes,
    listProperties,
    hiddenColumns: Array.from(hiddenColumns),
  };
}

async function defineModelForTable(definition) {
  const table = await sequelize.getQueryInterface().describeTable(definition.table);
  const schema = await readSchema(definition.schemaPath);
  const attributes = {};

  Object.entries(table).forEach(([columnName, columnDefinition]) => {
    attributes[columnName] = {
      type: mapColumnType(columnDefinition.type),
      allowNull: columnDefinition.allowNull,
      primaryKey: columnDefinition.primaryKey,
      autoIncrement: columnDefinition.autoIncrement,
    };
  });

  const model = sequelize.define(toPascalCase(definition.table), attributes, {
    tableName: definition.table,
    freezeTableName: true,
    timestamps: false,
  });

  const columns = Object.keys(attributes);
  const titleColumn = pickTitleColumn(columns);
  const schemaDriven = buildSchemaDrivenProperties(schema, columns);
  const listProperties = schemaDriven?.listProperties?.length
    ? schemaDriven.listProperties
    : ['id', titleColumn, 'updated_at'].filter((column) => columns.includes(column));
  const editProperties = schemaDriven?.editProperties?.length
    ? schemaDriven.editProperties
    : columns.filter((column) => !['id', 'created_at', 'updated_at'].includes(column));
  const hiddenColumns = schemaDriven?.hiddenColumns ?? HIDDEN_PROPERTIES;

  return {
    resource: model,
    options: {
      id: definition.table,
      navigation: {
        name: definition.navigation,
        icon: definition.navigation === 'Media' ? 'Image' : 'Document',
      },
      label: definition.label,
      titleProperty: titleColumn,
      listProperties,
      filterProperties: ['id', 'slug', 'name', 'title', 'question', 'published_at'].filter((column) => columns.includes(column)),
      editProperties,
      showProperties: columns,
      sort: {
        sortBy: columns.includes('updated_at') ? 'updated_at' : 'id',
        direction: 'desc',
      },
      properties: buildPropertyOptions(columns, titleColumn, hiddenColumns),
      translations: buildTranslations(definition, columns),
    },
  };
}

export async function buildResources() {
  const resources = await Promise.all(
    RESOURCE_DEFINITIONS.map((definition) => defineModelForTable(definition)),
  );

  return {
    resourceDefinitions: RESOURCE_DEFINITIONS,
    resources,
  };
}
