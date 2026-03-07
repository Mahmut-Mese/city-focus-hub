import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from './config.js';
import { getContentPagePublicData } from './content-pages.js';
import { getCollectionPublicData } from './collection-pages.js';

const PAGE_NAMES = [
  'site-setting',
  'homepage',
  'about-page',
  'blog-page',
  'pricing-page',
  'faq-page',
  'meeting-rooms-page',
  'virtual-office-page',
  'contact-page',
  'privacy-policy-page',
  'terms-page',
];

const COLLECTION_NAMES = [
  'blog-posts',
  'faq-items',
  'pricing-plans',
  'meeting-rooms',
];

function toMediaObject(value) {
  if (typeof value !== 'string' || !value.length) {
    return null;
  }

  return { url: value };
}

function normalizePageData(pageName, data) {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (pageName === 'about-page') {
    return {
      ...data,
      heroBackgroundImage: toMediaObject(data.heroBackgroundImage),
      storyImage: toMediaObject(data.storyImage),
      amenitiesImage: toMediaObject(data.amenitiesImage),
    };
  }

  return data;
}

async function writeSnapshotFile(directory, name, payload) {
  const filePath = path.join(directory, `${name}.json`);
  await writeFile(filePath, JSON.stringify(payload, null, 2));
  return filePath;
}

export async function exportPublishedSnapshots() {
  const outputDirectory = config.staticSnapshots.directory;
  await mkdir(outputDirectory, { recursive: true });

  const writtenFiles = [];

  for (const pageName of PAGE_NAMES) {
    const sourceName = pageName === 'site-setting' ? 'site-settings' : pageName;
    const data = await getContentPagePublicData(sourceName, 'published');
    writtenFiles.push(
      await writeSnapshotFile(outputDirectory, pageName, {
        data: normalizePageData(pageName, data),
      }),
    );
  }

  for (const collectionName of COLLECTION_NAMES) {
    const data = await getCollectionPublicData(collectionName, {
      status: 'published',
    });
    writtenFiles.push(
      await writeSnapshotFile(outputDirectory, collectionName, {
        data,
      }),
    );
  }

  writtenFiles.push(
    await writeSnapshotFile(outputDirectory, '_meta', {
      generatedAt: new Date().toISOString(),
      pages: PAGE_NAMES,
      collections: COLLECTION_NAMES,
    }),
  );

  return {
    directory: outputDirectory,
    files: writtenFiles,
  };
}
