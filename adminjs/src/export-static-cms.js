import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { getContentPagePublicData } from './content-pages.js';
import { getCollectionPublicData } from './collection-pages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const legacyOutputDirectory = path.join(__dirname, '..', '..', 'public', 'cms');

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

async function writeSnapshotFileToDirectories(directories, name, payload) {
  const writtenFiles = [];

  for (const directory of directories) {
    await mkdir(directory, { recursive: true });
    writtenFiles.push(await writeSnapshotFile(directory, name, payload));
  }

  return writtenFiles;
}

export async function exportPublishedSnapshots() {
  const outputDirectory = config.staticSnapshots.directory;
  const directories = Array.from(new Set([outputDirectory, legacyOutputDirectory]));

  const writtenFiles = [];

  for (const pageName of PAGE_NAMES) {
    const sourceName = pageName === 'site-setting' ? 'site-settings' : pageName;
    const data = await getContentPagePublicData(sourceName, 'published');
    writtenFiles.push(
      ...await writeSnapshotFileToDirectories(directories, pageName, {
        data: normalizePageData(pageName, data),
      }),
    );
  }

  for (const collectionName of COLLECTION_NAMES) {
    const data = await getCollectionPublicData(collectionName, {
      status: 'published',
    });
    writtenFiles.push(
      ...await writeSnapshotFileToDirectories(directories, collectionName, {
        data,
      }),
    );
  }

  writtenFiles.push(
    ...await writeSnapshotFileToDirectories(directories, '_meta', {
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
