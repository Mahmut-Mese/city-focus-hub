import { queryAll, queryOne } from './sql.js';

function toResource(row) {
  let metadata = {};
  if (row.metadata) {
    if (typeof row.metadata === 'string') {
      try {
        metadata = JSON.parse(row.metadata);
      } catch {
        console.error('[resources-service] Failed to parse metadata JSON for resource id:', row.id);
      }
    } else {
      metadata = row.metadata;
    }
  }

  return {
    id: Number(row.id),
    slug: String(row.slug),
    type: String(row.type),
    name: String(row.name),
    description: row.description || '',
    capacity: Number(row.capacity || 1),
    hourlyRateMinor: Number(row.hourly_rate_minor || 0),
    active: Boolean(row.active),
    metadata,
  };
}

export async function listResources(type) {
  const rows = await queryAll(
    `SELECT * FROM resources
      WHERE active = 1
        AND (:type = '' OR type = :type)
      ORDER BY type ASC, name ASC`,
    { type: String(type || '') },
  );

  return rows.map(toResource);
}

export async function getResourceById(resourceId) {
  const row = await queryOne('SELECT * FROM resources WHERE id = :resourceId LIMIT 1', { resourceId });
  return row ? toResource(row) : null;
}
