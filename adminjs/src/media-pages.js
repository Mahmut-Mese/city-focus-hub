import { QueryTypes } from 'sequelize';
import { sequelize } from './database.js';
import { config } from './config.js';

const ASSET_HOST = config.publicOrigin;

function parseJson(value) {
  if (!value) {
    return null;
  }

  if (typeof value === 'object') {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function absoluteUrl(url) {
  if (!url) {
    return null;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${ASSET_HOST}${url.startsWith('/') ? url : `/${url}`}`;
}

function formatTimestamp(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date).replace(',', '');
}

function formatSize(size) {
  const numeric = Number(size ?? 0);
  if (!numeric) {
    return '0 KB';
  }

  if (numeric >= 1024) {
    return `${(numeric / 1024).toFixed(2)} MB`;
  }

  return `${numeric.toFixed(2)} KB`;
}

function buildAsset(row) {
  const formats = parseJson(row.formats);
  const thumbnailUrl = absoluteUrl(formats?.thumbnail?.url || formats?.small?.url || row.url);
  const url = absoluteUrl(row.url);

  return {
    id: row.id,
    documentId: row.document_id,
    name: row.name,
    alternativeText: row.alternative_text,
    caption: row.caption,
    width: row.width,
    height: row.height,
    ext: row.ext,
    mime: row.mime,
    provider: row.provider,
    folderPath: row.folder_path,
    size: Number(row.size ?? 0),
    sizeLabel: formatSize(row.size),
    url,
    thumbnailUrl,
    previewUrl: absoluteUrl(row.preview_url),
    updatedAt: row.updated_at,
    updatedAtLabel: formatTimestamp(row.updated_at),
    createdAtLabel: formatTimestamp(row.created_at),
  };
}

async function loadAssetRows(search = '') {
  const where = search
    ? `WHERE name LIKE :search OR alternative_text LIKE :search OR caption LIKE :search OR document_id LIKE :search`
    : '';

  return sequelize.query(
    `
      SELECT id, document_id, name, alternative_text, caption, width, height, formats, hash, ext, mime, size, url, preview_url, provider, folder_path, created_at, updated_at
      FROM files
      ${where}
      ORDER BY updated_at DESC, id DESC
    `,
    {
      replacements: search ? { search: `%${search}%` } : {},
      type: QueryTypes.SELECT,
    },
  );
}

async function loadAssetRow(id) {
  const [row] = await sequelize.query(
    `
      SELECT id, document_id, name, alternative_text, caption, width, height, formats, hash, ext, mime, size, url, preview_url, provider, folder_path, created_at, updated_at
      FROM files
      WHERE id = :id
      LIMIT 1
    `,
    {
      replacements: { id },
      type: QueryTypes.SELECT,
    },
  );

  return row ?? null;
}

export function getMediaPageDefinitions() {
  return [
    {
      name: 'media-library',
      label: 'Media Library',
    },
  ];
}

export async function handleMediaPage(_pageName, request) {
  const search = String(request.query?.search ?? '').trim();
  const fileId = Number(request.query?.fileId ?? 0) || null;
  const rows = await loadAssetRows(search);
  const items = rows.map(buildAsset);

  if (fileId) {
    const row = await loadAssetRow(fileId);

    if (!row) {
      throw new Error('Asset not found');
    }

    return {
      ok: true,
      mode: 'detail',
      count: items.length,
      items,
      item: buildAsset(row),
    };
  }

  return {
    ok: true,
    mode: 'list',
    count: items.length,
    items,
  };
}
