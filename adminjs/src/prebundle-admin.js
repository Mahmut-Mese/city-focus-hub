import './load-env.js';
import { createAdmin } from './admin.js';
import { ensureContentDatabase } from './bootstrap-content.js';
import { sequelize } from './database.js';
import { buildResources } from './models.js';

async function main() {
  await sequelize.authenticate();
  await ensureContentDatabase();

  const { resources } = await buildResources();
  const admin = createAdmin(resources);

  await admin.initialize();
  await sequelize.close();

  console.log('AdminJS custom components bundled.');
}

main().catch(async (error) => {
  console.error('Failed to prebundle AdminJS components', error);

  try {
    await sequelize.close();
  } catch {
    // Ignore cleanup errors when startup already failed.
  }

  process.exit(1);
});
