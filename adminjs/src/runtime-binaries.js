import { chmod } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminEsbuildBinary = path.join(__dirname, '..', 'node_modules', '@esbuild', 'linux-x64', 'bin', 'esbuild');

export async function ensureAdminRuntimeBinaries() {
  try {
    await chmod(adminEsbuildBinary, 0o755);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return;
    }

    throw error;
  }
}
