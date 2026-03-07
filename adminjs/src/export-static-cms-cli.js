import { exportPublishedSnapshots } from './export-static-cms.js';
import { sequelize } from './database.js';
import { ensureContentDatabase } from './bootstrap-content.js';

async function main() {
  await sequelize.authenticate();
  await ensureContentDatabase();
  const result = await exportPublishedSnapshots();
  console.log(`Static CMS snapshots exported to ${result.directory}`);
}

main()
  .catch((error) => {
    console.error('Failed to export static CMS snapshots', error);
    process.exit(1);
  })
  .finally(async () => {
    await sequelize.close();
  });
