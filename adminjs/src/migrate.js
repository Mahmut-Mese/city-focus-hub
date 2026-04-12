/**
 * P1-65: Lightweight database migration runner.
 *
 * WHY NOT sequelize-cli:
 *   The project uses ESM ("type": "module") with plain JS — sequelize-cli does not
 *   support ESM natively and requires CommonJS config files with workarounds.
 *   This custom runner keeps the same sequelize connection and logging patterns
 *   already established in the codebase.
 *
 * HOW IT WORKS:
 *   1. Creates a `schema_migrations` table if it doesn't exist.
 *   2. Scans `adminjs/migrations/` for files matching `YYYYMMDDHHMMSS_*.js`.
 *   3. Runs each migration file's `up(sequelize)` export in order, recording it.
 *   4. Skips already-applied migrations (idempotent).
 *
 * ADDING A MIGRATION:
 *   Create `adminjs/migrations/20260410120000_your_description.js` with:
 *
 *     export async function up(sequelize) {
 *       await sequelize.query(`ALTER TABLE ...`);
 *     }
 *
 *     export async function down(sequelize) {
 *       await sequelize.query(`ALTER TABLE ... -- reverse the change`);
 *     }
 *
 * RUNNING:
 *   node adminjs/src/migrate.js            — runs pending migrations
 *   node adminjs/src/migrate.js --rollback — rolls back the last migration
 */
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readdirSync } from 'node:fs';
import { sequelize } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');
const MIGRATION_FILE_RE = /^\d{14}_[\w-]+\.js$/;

async function ensureMigrationsTable() {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      applied_at DATETIME(6) NOT NULL,
      UNIQUE KEY schema_migrations_name_unique (name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function getAppliedMigrations() {
  const [rows] = await sequelize.query(
    'SELECT name FROM schema_migrations ORDER BY name ASC',
  );
  return new Set(rows.map((r) => r.name));
}

async function recordMigration(name) {
  await sequelize.query(
    'INSERT INTO schema_migrations (name, applied_at) VALUES (:name, :appliedAt)',
    { replacements: { name, appliedAt: new Date() } },
  );
}

async function removeMigrationRecord(name) {
  await sequelize.query(
    'DELETE FROM schema_migrations WHERE name = :name',
    { replacements: { name } },
  );
}

function getMigrationFiles() {
  let files;
  try {
    files = readdirSync(MIGRATIONS_DIR);
  } catch {
    return [];
  }
  return files
    .filter((f) => MIGRATION_FILE_RE.test(f))
    .sort();
}

async function runMigrations() {
  await ensureMigrationsTable();
  const applied = await getAppliedMigrations();
  const files = getMigrationFiles();
  const pending = files.filter((f) => !applied.has(f));

  if (pending.length === 0) {
    console.log('[migrate] No pending migrations.');
    return;
  }

  for (const file of pending) {
    const filePath = pathToFileURL(path.join(MIGRATIONS_DIR, file)).href;
    console.log(`[migrate] Running: ${file}`);
    const mod = await import(filePath);
    await mod.up(sequelize);
    await recordMigration(file);
    console.log(`[migrate] Applied: ${file}`);
  }

  console.log(`[migrate] Done. Applied ${pending.length} migration(s).`);
}

async function rollbackLastMigration() {
  await ensureMigrationsTable();
  const [rows] = await sequelize.query(
    'SELECT name FROM schema_migrations ORDER BY name DESC LIMIT 1',
  );

  if (!rows.length) {
    console.log('[migrate] Nothing to roll back.');
    return;
  }

  const { name } = rows[0];
  const filePath = pathToFileURL(path.join(MIGRATIONS_DIR, name)).href;
  console.log(`[migrate] Rolling back: ${name}`);
  const mod = await import(filePath);

  if (typeof mod.down !== 'function') {
    throw new Error(`Migration ${name} does not export a down() function.`);
  }

  await mod.down(sequelize);
  await removeMigrationRecord(name);
  console.log(`[migrate] Rolled back: ${name}`);
}

// CLI entry point
const isRollback = process.argv.includes('--rollback');

try {
  if (isRollback) {
    await rollbackLastMigration();
  } else {
    await runMigrations();
  }
} catch (error) {
  console.error('[migrate] Error:', error?.message || error);
  process.exit(1);
} finally {
  await sequelize.close();
}
